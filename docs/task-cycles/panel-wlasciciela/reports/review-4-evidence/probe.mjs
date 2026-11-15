import { createHmac, randomBytes } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import session from "express-session";
import { createApp } from "../wt/dist/server/app.js";
import { openAccountRuntime } from "../wt/dist/server/configuration.js";

const origin = "https://game.example.test:8443";
const proxy = { "X-Forwarded-Proto": "https", "CF-Connecting-IP": "192.0.2.7" };
function send(port, path, { method = "GET", headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const r = request(
      { hostname: "127.0.0.1", port, path, method, headers, agent: false },
      (res) => {
        let d = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (d += c));
        res.on("end", () =>
          resolve({
            s: res.statusCode,
            b: d.slice(0, 160),
            ct: res.headers["content-type"],
            cc: res.headers["cache-control"],
          }),
        );
      },
    );
    r.on("error", reject);
    r.setTimeout(5000, () => r.destroy(new Error("timeout")));
    r.end(body);
  });
}
const dir = await mkdtemp(join(tmpdir(), "probe-"));
const keys = [randomBytes(32).toString("base64url")];
await writeFile(join(dir, "k.json"), JSON.stringify(keys));
await writeFile(join(dir, "p"), "pw");
const path = join(dir, "a.sqlite");
const runtime = await openAccountRuntime({
  LOOP2_DATABASE_PATH: path,
  LOOP2_SESSION_SECRET_FILE: join(dir, "k.json"),
  LOOP2_PUBLIC_ORIGIN: origin,
  LOOP2_PROXY_MODE: "cloudflare-tunnel",
  LOOP2_MAIL_FROM: "s@mail.example.test",
  LOOP2_SMTP_HOST: "smtp.example.test",
  LOOP2_SMTP_PORT: "587",
  LOOP2_SMTP_USER: "s@mail.example.test",
  LOOP2_SMTP_PASSWORD_FILE: join(dir, "p"),
});
const insp = new DatabaseSync(path);
const acc = {};
for (const n of ["owner", "player", "victim"])
  acc[n] = runtime.database.createAccount(`${n}@example.test`, runtime.dummyHash);
runtime.database.setAccountRole("owner@example.test", "owner");
const server = createApp({
  ...runtime,
  mailer: { send: () => Promise.resolve("sent") },
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const port = server.address().port;
function cookieFor(id, account) {
  const exp = Date.now() + 86400000;
  const c = new session.Cookie({
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 2592000000,
  });
  c.expires = new Date(exp);
  c.originalMaxAge = 2592000000;
  runtime.database.saveSession(id, {
    accountId: account.id,
    data: JSON.stringify({ accountId: account.id, cookie: c }),
    expiresAt: exp,
  });
  const sig = createHmac("sha256", keys[0])
    .update(id)
    .digest("base64")
    .replace(/=+$/, "");
  return `__Host-loop2.sid=${encodeURIComponent(`s:${id}.${sig}`)}`;
}
const oc = cookieFor("o", acc.owner);
const pc = cookieFor("p", acc.player);
const post = (p, body, cookie, extra = {}) =>
  send(port, p, {
    method: "POST",
    headers: {
      ...proxy,
      Origin: origin,
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
      ...extra,
    },
    body,
  });
const get = (p, cookie, extra = {}, method = "GET") =>
  send(port, p, {
    method,
    headers: { ...proxy, ...(cookie ? { Cookie: cookie } : {}), ...extra },
  });
const out = [];
const rec = async (label, pr) => {
  const r = await pr;
  out.push(
    `${label} => ${r.s} ${r.ct ?? ""} cc=${r.cc ?? ""} ${r.b.replace(/\s+/g, " ")}`,
  );
};
const B = "/api/owner/block";
const L = "/api/owner/accounts";
await rec("player, block, good body", post(B, '{"email":"victim@example.test"}', pc));
await rec("player, list", get(L, pc));
await rec("player, foreign origin", post(B, '{"email":"victim@example.test"}', pc, { Origin: "https://x.test" }));
await rec("owner, __proto__ body", post(B, '{"__proto__":{"email":"victim@example.test"}}', oc));
await rec("owner, duplicate keys", post(B, '{"email":"x@y","email":"victim@example.test"}', oc));
await rec("player, upper-case path", post("/API/OWNER/BLOCK", '{"email":"victim@example.test"}', pc));
await rec("player, trailing slash list", get(L + "/", pc));
await rec("player, HEAD list", get(L, pc, {}, "HEAD"));
await rec("owner, HEAD list", get(L, oc, {}, "HEAD"));
await rec("owner, OPTIONS block", get(B, oc, { Origin: origin }, "OPTIONS"));
await rec("two cookies, player first", get(L, pc + "; " + oc));
await rec("two cookies, owner first", get(L, oc + "; " + pc));
await rec("player, query string email", post(B + "?email=victim@example.test", "{}", pc));
await rec("owner, dotless-I address", post("/api/owner/unblock", JSON.stringify({ email: "VİCTIM@example.test" }), oc));
await rec("owner, charset", post("/api/owner/unblock", '{"email":"victim@example.test"}', oc, { "Content-Type": "application/json; charset=utf-8" }));
await rec("owner, jsonx", post("/api/owner/unblock", '{"email":"victim@example.test"}', oc, { "Content-Type": "application/jsonx" }));
await rec("owner, 40 KiB", post(B, JSON.stringify({ email: "a".repeat(40000) }), oc));
await rec("owner, list with foreign origin (GET)", get(L, oc, { Origin: "https://evil.test" }));
const snap = () =>
  JSON.stringify(
    insp
      .prepare("SELECT blocked,role,previous_save_allowed FROM accounts ORDER BY id")
      .all()
      .map((r) => [r.blocked, r.role, r.previous_save_allowed]),
  );
out.push("accounts before block-by-owner: " + snap());
await rec("owner self block", post(B, '{"email":"owner@example.test"}', oc));
out.push("accounts after self block: " + snap());
await rec("owner blocks victim", post(B, '{"email":"victim@example.test"}', oc));
out.push("accounts after victim block: " + snap());
runtime.database.blockAccount("owner@example.test");
await rec("blocked owner list", get(L, oc));
out.push("accounts end: " + snap());
server.closeAllConnections();
server.close();
insp.close();
runtime.close();
await rm(dir, { recursive: true, force: true });
await writeFile(new URL("../probe-out.txt", import.meta.url), out.join("\n") + "\n");
