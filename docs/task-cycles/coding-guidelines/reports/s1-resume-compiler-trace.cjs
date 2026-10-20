const { appendFileSync } = require("node:fs");
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/node_modules/typescript-compiler/bin/tsc")) {
  const { createRequire } = require("node:module");
  const compilerRequire = createRequire(process.argv[1]);
  appendFileSync(process.env.S1_TRACE_FILE, JSON.stringify({ argv: process.argv.slice(1), runtime: compilerRequire("../lib/version.cjs").version }) + "\n");
}
