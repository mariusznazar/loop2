// Probe only, not product code: a second process that keeps committing to the
// database, as the game server does, with the server's pragmas.
import { DatabaseSync } from "node:sqlite";
import { writeFileSync } from "node:fs";

const [path, stopFile, reportFile] = process.argv.slice(2);
const db = new DatabaseSync(path, { timeout: 1000 });
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA synchronous = FULL");
const update = db.prepare("UPDATE saves SET revision = revision + 1 WHERE id = ?");
let commits = 0;
let busy = 0;
let longest = 0;
const started = performance.now();
const { existsSync } = await import("node:fs");
while (!existsSync(stopFile)) {
  const before = performance.now();
  try {
    update.run(1 + (commits % 100));
    commits += 1;
  } catch {
    busy += 1;
  }
  longest = Math.max(longest, performance.now() - before);
  await new Promise((resolve) => setTimeout(resolve, 2));
}
db.close();
writeFileSync(
  reportFile,
  JSON.stringify({ commits, busy, longestCommitMs: Math.round(longest), seconds: Math.round((performance.now() - started) / 1000) }),
);
