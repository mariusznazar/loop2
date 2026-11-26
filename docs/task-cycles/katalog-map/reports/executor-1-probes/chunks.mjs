import { readFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
  const b = readFileSync(f);
  const types = [];
  for (let at = 8; at < b.length; ) {
    const len = b.readUInt32BE(at);
    types.push(b.toString("latin1", at + 4, at + 8));
    at += 12 + len;
  }
  console.log(f, types.join(","));
}
