import { spawnSync } from "node:child_process";
import { copyFile, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assertPlainPath, emitStyleAssets } from "./style-assets.mjs";

const root = new URL("../", import.meta.url);
const compiler = fileURLToPath(
  new URL("node_modules/typescript-compiler/bin/tsc", root),
);
const checkOnly = process.argv.includes("--check");

if (process.argv.slice(2).some((argument) => argument !== "--check")) {
  throw new Error("Unknown build argument");
}

if (!checkOnly) {
  // Only these compiler-owned roots are cleaned, before either compiler runs.
  // Validate both whole trees first so links cannot redirect cleanup or compilation.
  const outputs = ["dist/public", "dist/server"].map((name) =>
    fileURLToPath(new URL(name, root)),
  );
  async function inspectOutput(target) {
    const stat = await assertPlainPath(target, { allowMissing: true });
    if (!stat) return;
    if (stat.isDirectory()) {
      for (const name of await readdir(target)) {
        await inspectOutput(path.join(target, name));
      }
    } else if (!stat.isFile() || stat.nlink !== 1) {
      throw new Error(`Unsafe build output path: ${target}`);
    }
  }
  for (const output of outputs) await inspectOutput(output);
  for (const output of outputs)
    await rm(output, { recursive: true, force: true });
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
  await mkdir(new URL("dist/public/", root), { recursive: true });
  await emitStyleAssets({
    outputDirectory: fileURLToPath(new URL("dist/public/", root)),
  });
  await copyFile(
    new URL("src/browser/index.html", root),
    new URL("dist/public/index.html", root),
  );
  const iconsOut = new URL("dist/public/icons/", root);
  await mkdir(iconsOut, { recursive: true });
  for (const name of await readdir(new URL("assets/icons/", root))) {
    if (name.endsWith(".svg"))
      await copyFile(
        new URL(`assets/icons/${name}`, root),
        new URL(name, iconsOut),
      );
  }
}
