import { existsSync } from "node:fs";

const stop = process.argv[2];
let next = Date.now() + 500;
let sink = 0;
for (;;) {
  if (Date.now() >= next) {
    if (existsSync(stop)) break;
    next = Date.now() + 500;
  }
  sink += Math.sqrt(Math.random());
}
process.stdout.write(`${sink > 0 ? "" : "x"}`);
