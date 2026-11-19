// Crafted errcode values against the built isDatabaseBusy (review of correction 1).
import { join, resolve } from "node:path";
import { writeFileSync } from "node:fs";

const root = resolve(process.argv[2]);
const out = process.argv[3];
const { isDatabaseBusy } = await import(
  "file:///" + join(root, "dist/server/database.js").replaceAll("\\", "/")
);
const values = {
  "5": 5, "261": 261, "517": 517, "773": 773, "2067": 2067, "21": 21, "262": 262,
  "-251": -251, "-5": -5, "NaN": NaN, "Infinity": Infinity, "5.5": 5.5,
  "2**32+5": 2 ** 32 + 5, "BigInt 5n": 5n, "BigInt 517n": 517n, "undefined": undefined,
  "null": null, "'5'": "5", "true": true,
};
const lines = [];
for (const [label, errcode] of Object.entries(values))
  lines.push(`${label}\t${isDatabaseBusy({ errcode })}`);
lines.push(`no errcode\t${isDatabaseBusy({ code: "SQLITE_BUSY" })}`);
lines.push(`Error with errcode getter throwing\t${(() => { try { return isDatabaseBusy({ get errcode() { throw new Error("x"); } }); } catch { return "threw"; } })()}`);
writeFileSync(out, lines.join("\n") + "\n", "utf8");
console.log(lines.length);
