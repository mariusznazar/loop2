// Scratch run of the two owner commands on crafted inputs (review of the whole change).
import { spawnSync, spawn } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const root = resolve(process.argv[2]);
const work = resolve(process.argv[3]);
const { AccountDatabase } = await import(
  "file:///" + join(root, "dist/server/database.js").replaceAll("\\", "/")
);

rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

const commands = {
  role: ["dist/server/account-role.js", "owner"],
  prev: ["dist/server/account-previous-save.js", "grant"],
};

function snapshot(dir, name) {
  const p = join(dir, name);
  return {
    bytes: existsSync(p) ? readFileSync(p).toString("base64") : null,
    names: readdirSync(dir).sort().join(","),
  };
}

function run(cmd, env) {
  const [script, action] = commands[cmd];
  const childEnv = { ...process.env };
  delete childEnv.LOOP2_DATABASE_PATH;
  Object.assign(childEnv, env);
  const r = spawnSync(process.execPath, [script, action, "Player@Example.test"], {
    cwd: root,
    env: childEnv,
    encoding: "utf8",
  });
  return { code: r.status, stdout: r.stdout, stderr: r.stderr };
}

const secretHash = "SECRET-HASH-abc123";
const secretSession = "SECRET-SESSION-xyz789";

function makeServerDb(path) {
  const db = new AccountDatabase(path);
  const account = db.createAccount("player@example.test", secretHash);
  db.saveSession(secretSession, {
    accountId: account.id,
    data: JSON.stringify({ cookie: { expires: new Date(Date.now() + 3600000).toISOString() } }),
    expiresAt: Date.now() + 3600000,
  });
  db.close();
}

const cases = [];
function add(label, prepare) {
  cases.push({ label, prepare });
}

add("empty file", (dir) => {
  const p = join(dir, "db.sqlite");
  writeFileSync(p, "");
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("no SQLite database", (dir) => {
  const p = join(dir, "db.sqlite");
  writeFileSync(p, "not an sqlite database, just text that is long enough........................................................................");
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("SQLite with no schema version", (dir) => {
  const p = join(dir, "db.sqlite");
  const raw = new DatabaseSync(p);
  raw.exec("CREATE TABLE notes (text TEXT); INSERT INTO notes VALUES ('" + secretHash + "')");
  raw.close();
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("SQLite WAL with no schema version", (dir) => {
  const p = join(dir, "db.sqlite");
  const raw = new DatabaseSync(p);
  raw.exec("PRAGMA journal_mode=WAL; CREATE TABLE notes (text TEXT)");
  raw.close();
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("damaged past first page", (dir) => {
  const p = join(dir, "db.sqlite");
  makeServerDb(p);
  const bytes = readFileSync(p);
  writeFileSync(p, Buffer.concat([bytes.subarray(0, 4096), Buffer.alloc(bytes.length - 4096, 255)]));
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("truncated header (first 50 bytes of a db)", (dir) => {
  const p = join(dir, "db.sqlite");
  makeServerDb(join(dir, "src.sqlite"));
  writeFileSync(p, readFileSync(join(dir, "src.sqlite")).subarray(0, 50));
  rmSync(join(dir, "src.sqlite"));
  for (const f of readdirSync(dir)) if (f.startsWith("src.sqlite")) rmSync(join(dir, f));
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("newer schema", (dir) => {
  const p = join(dir, "db.sqlite");
  const raw = new DatabaseSync(p);
  raw.exec("CREATE TABLE accounts (id TEXT); PRAGMA user_version = 7");
  raw.close();
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("negative schema version", (dir) => {
  const p = join(dir, "db.sqlite");
  const raw = new DatabaseSync(p);
  raw.exec("CREATE TABLE accounts (id TEXT); PRAGMA user_version = -1");
  raw.close();
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite" };
});
add("directory", (dir) => {
  mkdirSync(join(dir, "sub"));
  return { env: { LOOP2_DATABASE_PATH: join(dir, "sub") }, name: "sub-none" };
});
add("missing file", (dir) => ({ env: { LOOP2_DATABASE_PATH: join(dir, "missing.sqlite") }, name: "missing.sqlite" }));
add("unset path", () => ({ env: {}, name: "x" }));
add("empty path", () => ({ env: { LOOP2_DATABASE_PATH: "" }, name: "x" }));
add("blank path", () => ({ env: { LOOP2_DATABASE_PATH: "   " }, name: "x" }));
add(":memory:", () => ({ env: { LOOP2_DATABASE_PATH: ":memory:" }, name: "x" }));
add("valid server database (success)", (dir) => {
  const p = join(dir, "db.sqlite");
  makeServerDb(p);
  return { env: { LOOP2_DATABASE_PATH: p }, name: "db.sqlite", success: true };
});

const out = [];
let n = 0;
for (const c of cases) {
  for (const cmd of Object.keys(commands)) {
    const dir = join(work, `c${n++}`);
    mkdirSync(dir);
    const { env, name, success } = c.prepare(dir);
    const before = snapshot(dir, name);
    const r = run(cmd, env);
    const after = snapshot(dir, name);
    const all = r.stdout + r.stderr;
    const leaks = [secretHash, secretSession, dir, "malformed", "not a database"].filter((s) =>
      all.toLowerCase().includes(s.toLowerCase()),
    );
    out.push(
      [
        `## ${c.label} | ${cmd}`,
        `exit=${r.code}`,
        `stdout=${JSON.stringify(r.stdout)}`,
        `stderr=${JSON.stringify(r.stderr)}`,
        `bytesSame=${before.bytes === after.bytes} namesBefore=[${before.names}] namesAfter=[${after.names}]`,
        `leaks=${JSON.stringify(leaks)}${success ? " (success expected)" : ""}`,
        "",
      ].join("\n"),
    );
  }
}

// Busy database: another connection holds the write lock.
for (const cmd of Object.keys(commands)) {
  const dir = join(work, `busy-${cmd}`);
  mkdirSync(dir);
  const p = join(dir, "db.sqlite");
  makeServerDb(p);
  const raw = new DatabaseSync(p);
  raw.exec("BEGIN IMMEDIATE");
  const [script, action] = commands[cmd];
  const r = await new Promise((done) => {
    const child = spawn(process.execPath, [script, action, "player@example.test"], {
      cwd: root,
      env: { ...process.env, LOOP2_DATABASE_PATH: p },
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => done({ code, stdout, stderr }));
  });
  raw.exec("ROLLBACK");
  raw.close();
  out.push(`## busy | ${cmd}\nexit=${r.code}\nstdout=${JSON.stringify(r.stdout)}\nstderr=${JSON.stringify(r.stderr)}\n`);
}

writeFileSync(join(work, "..", "scratch-result.md"), out.join("\n"), "utf8");
console.log("cases", out.length);
