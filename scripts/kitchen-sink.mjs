import { spawn, spawnSync } from "node:child_process";
import { copyFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import express from "express";
import { copyStaticFiles } from "./static-files.mjs";

// Builds the kitchen-sink page into dist/kitchen-sink/ and, without --build-only, serves it on
// 127.0.0.1 at a port the system picks and opens it in the default browser (D-45). It writes
// nothing outside dist/kitchen-sink/ and serves nothing else. The build is the game's in small: the
// compiler emits the page's modules into a staging directory, and esbuild joins them into the one
// file the page loads (D-269, D-263, D-266).
const root = new URL("../", import.meta.url);
const compiler = fileURLToPath(
  new URL("node_modules/typescript-compiler/bin/tsc", root),
);
const out = new URL("dist/kitchen-sink/", root);
// Where tsconfig.kitchen-sink.json emits (its outDir); it goes before the page is served.
const staging = new URL("staging/", out);
const host = "127.0.0.1";
const buildOnly = process.argv.includes("--build-only");

await rm(out, { recursive: true, force: true });
const result = spawnSync(
  process.execPath,
  [compiler, "-p", "tsconfig.kitchen-sink.json"],
  { cwd: fileURLToPath(root), stdio: "inherit" },
);
if (result.error) {
  await rm(staging, { recursive: true, force: true });
  throw result.error;
}
if (result.status !== 0) {
  await rm(staging, { recursive: true, force: true });
  process.exit(result.status ?? 1);
}

try {
  await build({
    absWorkingDir: fileURLToPath(root),
    entryPoints: [
      fileURLToPath(new URL("kitchen-sink/kitchen-sink.js", staging)),
    ],
    outfile: fileURLToPath(new URL("kitchen-sink/kitchen-sink.js", out)),
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    minify: false,
    // A browser has no `process`; React's development build reports a misused control in the console.
    define: { "process.env.NODE_ENV": '"development"' },
  });
} finally {
  await rm(staging, { recursive: true, force: true });
}

for (const name of ["index.html", "kitchen-sink.css"])
  await copyFile(
    new URL(`src/browser/kitchen-sink/${name}`, root),
    new URL(name, out),
  );
await copyStaticFiles(root, out);

if (!buildOnly) {
  const app = express();
  app.use(express.static(fileURLToPath(out)));
  const server = app.listen(0, host);

  server.once("listening", () => {
    const url = `http://${host}:${server.address().port}/`;
    console.log(`Kitchen-sink page: ${url} (Ctrl+C stops it)`);
    openInBrowser(url);
  });

  server.once("error", (error) => {
    console.error(
      `The kitchen-sink page could not be served: ${error.message}`,
    );
    process.exitCode = 1;
  });
}

// A launch that fails is no error: the address printed above stays.
function openInBrowser(url) {
  const [command, args] =
    process.platform === "win32"
      ? ["cmd", ["/c", "start", "", url]]
      : process.platform === "darwin"
        ? ["open", [url]]
        : ["xdg-open", [url]];
  try {
    const child = spawn(command, args, { stdio: "ignore", windowsHide: true });
    child.on("error", () => {});
    child.unref();
  } catch {
    // The address stays printed for the developer to open.
  }
}
