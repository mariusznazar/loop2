// Scratch probe of the reviewer: a client that hangs up in the middle of a body, and other crafted requests.
import net from "node:net";
import { randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
const root = new URL("../../../../", import.meta.url);
const { createApp } = await import(new URL("dist/server/app.js", root));
const { openAccountRuntime } = await import(new URL("dist/server/configuration.js", root));
const dir = await mkdtemp(join(tmpdir(), "loop2-review-"));
await writeFile(join(dir, "keys.json"), JSON.stringify([randomBytes(32).toString("base64url"), randomBytes(32).toString("base64url")]));
await writeFile(join(dir, "smtp"), "synthetic-smtp-password");
const runtime = await openAccountRuntime({
  LOOP2_DATABASE_PATH: join(dir, "a.sqlite"), LOOP2_SESSION_SECRET_FILE: join(dir, "keys.json"),
  LOOP2_PUBLIC_ORIGIN: "https://game.example.test:8443", LOOP2_PROXY_MODE: "cloudflare-tunnel",
  LOOP2_MAIL_FROM: "s@mail.example.test", LOOP2_SMTP_HOST: "smtp.example.test", LOOP2_SMTP_PORT: "587",
  LOOP2_SMTP_USER: "s@mail.example.test", LOOP2_SMTP_PASSWORD_FILE: join(dir, "smtp"),
});
const lines = []; const original = console.error;
console.error = (...v) => lines.push(v.map(String).join(" "));
const server = createApp(runtime).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const port = server.address().port;
const raw = (text, hangUp) => new Promise((resolve) => {
  const s = net.connect(port, "127.0.0.1", () => { s.write(text); if (hangUp) setTimeout(() => s.destroy(), 50); });
  let got = ""; s.on("data", (c) => (got += c)); s.on("error", () => {}); s.on("close", () => resolve(got.split("\r\n")[0]));
  setTimeout(() => s.destroy(), 500);
});
const head = "POST /api/session HTTP/1.1\r\nHost: x\r\nOrigin: https://game.example.test:8443\r\nContent-Type: application/json\r\nX-Forwarded-Proto: https\r\nCF-Connecting-IP: 198.51.100.1\r\n";
const cases = {
  "body cut, client gone": [head + 'Content-Length: 100\r\n\r\n{"email":"crafted@example.test"', true],
  "bad JSON": [head + 'Content-Length: 5\r\n\r\n{bad}', false],
  "unknown charset": [head.replace("application/json", "application/json; charset=utf-7") + 'Content-Length: 2\r\n\r\n{}', false],
  "bad path escape": ["GET /%E0%A4%A HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n", false],
  "api bad escape": ["GET /api/%E0%A4%A HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n", false],
};
for (const [name, [text, hangUp]] of Object.entries(cases)) {
  const answer = await raw(text, hangUp);
  await new Promise((r) => setTimeout(r, 100));
  original(`--- ${name}: ${answer || "(no answer)"}; ${lines.length} line(s)`);
  for (const l of lines) original(l);
  lines.length = 0;
}
server.closeAllConnections(); server.close(); runtime.close();
await rm(dir, { recursive: true, force: true });
