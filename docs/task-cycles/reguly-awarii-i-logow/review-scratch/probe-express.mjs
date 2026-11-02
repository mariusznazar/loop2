// Scratch probe of the reviewer: a store failure that the session library hands to `next`
// after the app's error handler has already run, or when no layer is left.
import { request } from "node:http";
import { createHmac, randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createRequire } from "node:module";
const root = new URL("../../../../", import.meta.url);
const { createApp } = await import(new URL("dist/server/app.js", root));
const { openAccountRuntime } = await import(new URL("dist/server/configuration.js", root));
const require = createRequire(new URL("package.json", root));
const session = require("express-session");

const dir = await mkdtemp(join(tmpdir(), "loop2-review-"));
const keys = [randomBytes(32).toString("base64url"), randomBytes(32).toString("base64url")];
await writeFile(join(dir, "keys.json"), JSON.stringify(keys));
await writeFile(join(dir, "smtp"), "synthetic-smtp-password");
const db = join(dir, "accounts.sqlite");
const runtime = await openAccountRuntime({
  LOOP2_DATABASE_PATH: db, LOOP2_SESSION_SECRET_FILE: join(dir, "keys.json"),
  LOOP2_PUBLIC_ORIGIN: "https://game.example.test:8443", LOOP2_PROXY_MODE: "cloudflare-tunnel",
  LOOP2_MAIL_FROM: "s@mail.example.test", LOOP2_SMTP_HOST: "smtp.example.test", LOOP2_SMTP_PORT: "587",
  LOOP2_SMTP_USER: "s@mail.example.test", LOOP2_SMTP_PASSWORD_FILE: join(dir, "smtp"),
});
const inspection = new DatabaseSync(db);
const account = runtime.database.createAccount("first@example.test", runtime.dummyHash);
const expiresAt = Date.now() + 86_400_000;
const cookie0 = new session.Cookie({ path: "/", secure: true, httpOnly: true, sameSite: "lax", maxAge: 30*86400000 });
cookie0.expires = new Date(expiresAt);
const id = "probe-session";
runtime.database.saveSession(id, { accountId: account.id, data: JSON.stringify({ cookie: cookie0, accountId: account.id }), expiresAt });
const sig = createHmac("sha256", keys[0]).update(id).digest("base64").replace(/=+$/, "");
const cookie = `__Host-loop2.sid=${encodeURIComponent(`s:${id}.${sig}`)}`;

const lines = [];
const original = console.error;
console.error = (...v) => { lines.push(v.map(String).join(" ")); };
const server = createApp(runtime).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const port = server.address().port;
const hit = (path, { method = "GET", headers = {}, body } = {}) => new Promise((resolve) => {
  const req = request({ port, path, method, headers: { "X-Forwarded-Proto": "https", "CF-Connecting-IP": "198.51.100.1", Cookie: cookie, ...headers } }, (res) => {
    let text = ""; res.on("data", (c) => (text += c)); res.on("end", () => resolve({ status: res.statusCode, text })); res.on("error", () => resolve({ status: res.statusCode, text: "(aborted)" }));
  });
  req.on("error", (e) => resolve({ status: "socket", text: e.code }));
  if (body) req.write(body);
  req.end();
});
const settle = () => new Promise((r) => setTimeout(r, 150));
const report = (name, response) => {
  original(`--- ${name}: status ${response.status}, ${lines.length} line(s) on standard error`);
  for (const line of lines) original(line.split("\n").slice(0, 2).join(" | "));
  lines.length = 0;
};
const quoted = "synthetic first@example.test";
inspection.exec(`CREATE TRIGGER refuse_renewal BEFORE UPDATE ON sessions BEGIN SELECT RAISE(ABORT, '${quoted}'); END;`);

let r = await hit("/no-such-file"); await settle(); report("A a missing file, session renewal fails", r);
r = await hit("/api/account"); await settle(); report("B control: a route answered, session renewal fails", r);
inspection.exec(`CREATE TRIGGER refuse_save BEFORE INSERT ON saved_games BEGIN SELECT RAISE(ABORT, '${quoted}'); END;`);
r = await hit("/api/saved-game", { method: "PUT", headers: { Origin: "https://game.example.test:8443", "Content-Type": "application/json" }, body: JSON.stringify({ version: 1, basedOn: 0, game: {} }) });
await settle(); report("C a route fails and the renewal fails too (one database fault)", r);
inspection.exec("DROP TRIGGER refuse_renewal; DROP TRIGGER refuse_save;");
server.closeAllConnections(); server.close();
inspection.close(); runtime.close();
await rm(dir, { recursive: true, force: true });
