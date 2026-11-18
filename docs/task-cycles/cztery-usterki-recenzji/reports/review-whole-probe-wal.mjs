// Probe: files in WAL mode (a foreign SQLite database at version 0, and a newer
// schema) given to the blocking and backup commands of the head worktree.
// Reports exit codes and whether the file or its directory changed.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const head = process.argv[2];
const scratch = process.argv[3];
const out = [];
const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 12);

function make(kind, wal, leftFrames) {
  const dir = mkdtempSync(join(scratch, `p-${kind}-`));
  const path = join(dir, "db.sqlite");
  const db = new DatabaseSync(path);
  if (wal) db.exec("PRAGMA journal_mode = WAL");
  db.exec("CREATE TABLE notes (text TEXT); INSERT INTO notes VALUES ('x')");
  if (kind === "newer") db.exec("PRAGMA user_version = 7");
  if (leftFrames) {
    // A second connection keeps frames in the WAL after the first closes.
    db.exec("PRAGMA wal_autocheckpoint = 0");
    db.exec("INSERT INTO notes VALUES ('y')");
  }
  db.close();
  return { dir, path };
}

function run(script, args, path) {
  const tmp = mkdtempSync(join(scratch, "tmp-"));
  const result = spawnSync(process.execPath, [join(head, "dist", "server", script), ...args], {
    env: { ...process.env, LOOP2_DATABASE_PATH: path, TMPDIR: tmp, TEMP: tmp, TMP: tmp },
    encoding: "buffer",
  });
  rmSync(tmp, { recursive: true, force: true });
  return { code: result.status, stderr: result.stderr.toString(), stdoutBytes: result.stdout.length };
}

for (const kind of ["foreign", "newer"]) {
  for (const wal of [false, true]) {
    for (const [script, args] of [
      ["account-block.js", ["block", "a@example.test"]],
      ["account-backup.js", ["--to-standard-output"]],
    ]) {
      const { dir, path } = make(kind, wal, false);
      const before = { hash: hash(path), names: readdirSync(dir).sort().join(",") };
      const r = run(script, args, path);
      const after = { hash: hash(path), names: readdirSync(dir).sort().join(",") };
      const check = new DatabaseSync(path, { readOnly: true });
      const mode = check.prepare("PRAGMA journal_mode").get().journal_mode;
      check.close();
      out.push(
        `${kind} wal=${wal} ${script}: exit=${r.code} stdout=${r.stdoutBytes} same-bytes=${before.hash === after.hash} names-before=[${before.names}] names-after=[${after.names}] mode=${mode} stderr=${JSON.stringify(r.stderr.trim())}`,
      );
      rmSync(dir, { recursive: true, force: true });
    }
  }
}
writeFileSync(join(scratch, "probe-wal.txt"), out.join("\n") + "\n");
console.log(out.length);
