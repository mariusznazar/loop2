// Probe only, not product code: does node:sqlite's backup() finish beside a
// writer in another process, and at what memory?
import { DatabaseSync, backup } from "node:sqlite";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const here = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const work = join(here, "work");
rmSync(work, { recursive: true, force: true });
mkdirSync(work);
const sizeRows = Number(process.argv[2] ?? 1000);
const deadlineMs = 20000;
const source = join(work, "accounts.sqlite");

const seed = new DatabaseSync(source);
seed.exec("PRAGMA journal_mode = WAL");
seed.exec("CREATE TABLE saves (id INTEGER PRIMARY KEY, revision INTEGER NOT NULL, game TEXT NOT NULL)");
const insert = seed.prepare("INSERT INTO saves (id, revision, game) VALUES (?, 1, ?)");
const text = "x".repeat(64 * 1024);
seed.exec("BEGIN");
for (let i = 1; i <= sizeRows; i += 1) insert.run(i, text);
seed.exec("COMMIT");
seed.close();
console.log("source bytes", statSync(source).size);

async function attempt(label, rate) {
  const stop = join(work, `stop-${label}`);
  const report = join(work, `writer-${label}.json`);
  const writer = spawn(process.execPath, [join(here, "writer.mjs"), source, stop, report], { stdio: "inherit" });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const connection = new DatabaseSync(source, { timeout: 1000 });
  const target = join(work, `copy-${label}.sqlite`);
  let steps = 0;
  let restarts = 0;
  let lastRemaining = -1;
  let peakRss = process.memoryUsage().rss;
  const sampler = setInterval(() => {
    peakRss = Math.max(peakRss, process.memoryUsage().rss);
  }, 20);
  const started = performance.now();
  let outcome;
  try {
    const finished = backup(connection, target, {
      rate,
      progress: ({ remainingPages }) => {
        steps += 1;
        if (lastRemaining >= 0 && remainingPages > lastRemaining) restarts += 1;
        lastRemaining = remainingPages;
      },
    }).then((pages) => `done, ${pages} pages`);
    const timedOut = new Promise((resolve) => setTimeout(() => resolve("NOT FINISHED by the deadline"), deadlineMs));
    outcome = await Promise.race([finished, timedOut]);
  } catch (error) {
    outcome = `failed: ${error.code ?? ""} ${error.message}`;
  }
  const elapsed = Math.round(performance.now() - started);
  clearInterval(sampler);
  writeFileSync(stop, "");
  await new Promise((resolve) => writer.on("exit", resolve));
  console.log(label, "rate", rate, "->", outcome, "| ms", elapsed, "| steps", steps, "| restarts seen", restarts, "| peak rss MiB", Math.round(peakRss / 1048576));
  console.log("  writer", readFileSync(report, "utf8"));
  if (outcome.startsWith("done")) {
    const copy = new DatabaseSync(target, { readOnly: true });
    const check = copy.prepare("PRAGMA integrity_check").get();
    const count = copy.prepare("SELECT count(*) AS n, sum(revision) AS r FROM saves").get();
    const mode = copy.prepare("PRAGMA journal_mode").get();
    copy.close();
    console.log("  copy", JSON.stringify(check), JSON.stringify(count), JSON.stringify(mode), "bytes", statSync(target).size, "wal beside it", existsSync(`${target}-wal`));
  }
  if (outcome.startsWith("NOT")) {
    console.log("  giving up on this attempt; exiting the probe so its work dir can be removed");
    process.exit(0);
  }
  connection.close();
}

await attempt("whole", 2 ** 31 - 1);
await attempt("default", 100);
