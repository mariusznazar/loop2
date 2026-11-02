import { spawnSync } from "node:child_process";
import { copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { copySpriteFiles, copyStaticFiles } from "./static-files.mjs";

const root = new URL("../", import.meta.url);
const compiler = fileURLToPath(
  new URL("node_modules/typescript-compiler/bin/tsc", root),
);
const checkOnly = process.argv.includes("--check");

// A module left by an earlier build would be served or imported silently (D-266).
if (!checkOnly) {
  for (const directory of ["dist/public/", "dist/browser/"])
    await rm(new URL(directory, root), { recursive: true, force: true });
}

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
  await build({
    absWorkingDir: fileURLToPath(root),
    entryPoints: ["dist/browser/main.js"],
    outfile: "dist/public/main.js",
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    minify: true,
    // React's packages choose their production build by this value, which esbuild
    // sets by itself only while all of its minifying stays on.
    define: { "process.env.NODE_ENV": '"production"' },
  });
  await copyFile(
    new URL("src/browser/index.html", root),
    new URL("index.html", out),
  );
  await copyStaticFiles(root, out);
  await copySpriteFiles(root, out);
}
