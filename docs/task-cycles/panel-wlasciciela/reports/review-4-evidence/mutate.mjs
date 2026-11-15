import { readFileSync, writeFileSync } from "node:fs";

const root = new URL("../wt/", import.meta.url);
const owner = new URL("src/server/owner-routes.ts", root);
const accountRoutes = new URL("src/server/account-routes.ts", root);
const database = new URL("src/server/database.ts", root);

const gate = 'if (account.role !== "owner") {';
const mutations = {
  "m1-list": [owner, gate, 'if (account.role !== "owner" && request.path !== "/api/owner/accounts") {'],
  "m2-block": [owner, gate, 'if (account.role !== "owner" && request.path !== "/api/owner/block") {'],
  "m3-unblock": [owner, gate, 'if (account.role !== "owner" && request.path !== "/api/owner/unblock") {'],
  "m4-grant": [owner, gate, 'if (account.role !== "owner" && request.path !== "/api/owner/grant-previous-save") {'],
  "m5-revoke": [owner, gate, 'if (account.role !== "owner" && request.path !== "/api/owner/revoke-previous-save") {'],
  "m6-role-once": [
    owner,
    gate,
    'if (!(seen.has(account.id) ? seen.get(account.id) : (seen.set(account.id, account.role === "owner"), account.role === "owner"))) {',
    'const seen = new Map<string, boolean>();\nfunction unknownAccount(',
    "function unknownAccount(",
  ],
  "m7-role-after-body": [
    owner,
    "router.post(path, ownerOnly(runtime), (request, response) => {",
    "router.post(path, (request, response, next) => { if (targetAddress(request.body) === undefined) { invalidRequest(response); return; } next(); }, ownerOnly(runtime), (request, response) => {",
  ],
  "m8-panel-blocks-owner": [owner, "database.blockForPanel(address)", "database.blockAccount(address)"],
  "m9-player-answers-owner": [accountRoutes, 'account.role === "owner" ? { role: account.role } : {}', 'true ? { role: "owner" } : {}'],
  "m10-list-field": [database, "email: account.email,\n          role: account.role,", "id: account.id,\n          email: account.email,\n          role: account.role,"],
};

const [name, mode] = process.argv.slice(2);
const spec = mutations[name];
if (!spec) throw new Error(`no mutation ${name}`);
const [file, from, to, extraFrom, extraTo] = spec;
if (mode === "restore") process.exit(0);
let text = readFileSync(file, "utf8");
if (!text.includes(from)) throw new Error(`pattern not found for ${name}`);
text = text.replace(from, () => to);
if (extraFrom) {
  if (!text.includes(extraTo)) throw new Error("extra anchor missing");
  text = text.replace(extraTo, () => extraFrom);
}
writeFileSync(file, text);
console.log(`applied ${name}`);
