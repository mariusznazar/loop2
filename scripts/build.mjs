import { spawnSync } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { copyStaticFiles } from "./static-files.mjs";

const root = new URL("../", import.meta.url);
const compiler = fileURLToPath(
  new URL("node_modules/typescript-compiler/bin/tsc", root),
);
const checkOnly = process.argv.includes("--check");

for (const config of ["tsconfig.browser.json", "tsconfig.server.json"]) {
  const result = spawnSync(
    process.execPath,
    [compiler, "-p", config, ...(checkOnly ? ["--noEmit"] : [])],
    {
      cwd: fileURLToPath(root),
      stdio: "inherit",
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!checkOnly) {
  const out = new URL("dist/public/", root);
  await mkdir(out, { recursive: true });
  await copyFile(
    new URL("src/browser/index.html", root),
    new URL("index.html", out),
  );
  await copyStaticFiles(root, out);
}
