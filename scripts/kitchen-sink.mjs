import { spawn } from "node:child_process";
import {
  mkdir,
  readFile,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { assertPlainPath, emitStyleAssets } from "./style-assets.mjs";

const defaultRoot = fileURLToPath(new URL("../", import.meta.url));
const marker = "<!-- STYLEGUIDE_TOKEN_DATA -->";
const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
  [".txt", "text/plain; charset=utf-8"],
]);

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true, ...options });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`Process failed (${signal ?? code}): ${command}`));
    });
  });
}

async function outputPath(sourceRoot, allowMissing = false) {
  const root = path.resolve(sourceRoot);
  await assertPlainPath(root);
  if ((await realpath(root)) !== root)
    throw new Error("Expected a canonical source root");
  const output = path.resolve(root, ".runs/styleguide/public");
  // Cleanup never accepts an arbitrary destination supplied by a caller.
  if (
    path.relative(root, output) !== path.join(".runs", "styleguide", "public")
  )
    throw new Error("Unsafe standalone output path");
  await assertPlainPath(output, { allowMissing });
  return output;
}

async function inspectTree(target) {
  const stat = await assertPlainPath(target, { allowMissing: true });
  if (!stat) return;
  if (stat.isDirectory()) {
    for (const name of await readdir(target))
      await inspectTree(path.join(target, name));
  } else if (!stat.isFile() || stat.nlink !== 1)
    throw new Error(`Unsafe standalone output path: ${target}`);
}

async function plainFile(filename) {
  const stat = await assertPlainPath(filename);
  if (!stat.isFile() || stat.nlink !== 1)
    throw new Error(`Expected a plain file: ${filename}`);
  return readFile(filename);
}

/** Build only the fixed standalone directory, leaving ordinary output untouched. */
export async function buildStyleguide({
  sourceRoot = defaultRoot,
  signal,
} = {}) {
  const root = path.resolve(sourceRoot);
  const output = await outputPath(root, true);
  await inspectTree(output);
  const template = (
    await plainFile(path.join(root, "tools/styleguide/index.html"))
  ).toString("utf8");
  if (template.split(marker).length !== 2)
    throw new Error("Expected exactly one styleguide token data marker");
  signal?.throwIfAborted();
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await runProcess(
    process.execPath,
    [
      path.join(defaultRoot, "node_modules/typescript-compiler/bin/tsc"),
      "-p",
      "tsconfig.styleguide.json",
    ],
    { cwd: root, stdio: "inherit", signal },
  );
  await emitStyleAssets({ sourceRoot: root, outputDirectory: output });
  // The emitter validates the complete schema and values before metadata is used.
  const tokens = JSON.parse(
    (
      await plainFile(path.join(root, "src/browser/view/design-tokens.json"))
    ).toString("utf8"),
  );
  const escaped = JSON.stringify(tokens).replace(
    /[<>&\u2028\u2029]/g,
    (character) =>
      `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
  const embedded = `<script type="application/json" id="styleguide-tokens">${escaped}</script>`;
  await writeFile(
    path.join(output, "index.html"),
    template.replace(marker, () => embedded),
  );
  await writeFile(
    path.join(output, "styleguide.css"),
    await plainFile(path.join(root, "tools/styleguide/styles.css")),
  );
  await mkdir(path.join(output, "icons"));
  for (const name of await readdir(path.join(root, "assets/icons"))) {
    if (name.endsWith(".svg")) {
      const filename = path.join(root, "assets/icons", name);
      await writeFile(
        path.join(output, "icons", name),
        await plainFile(filename),
      );
    }
  }
  signal?.throwIfAborted();
  return output;
}

/** Serve plain files from the isolated output only; never normalize untrusted URLs. */
export async function serveStyleguide({ sourceRoot = defaultRoot } = {}) {
  const output = await outputPath(sourceRoot);
  if (!(await assertPlainPath(output)).isDirectory())
    throw new Error("Standalone output is not a directory");
  const server = createServer((request, response) => {
    async function respond() {
      response.setHeader("X-Content-Type-Options", "nosniff");
      response.setHeader("Cache-Control", "no-store");
      if (!["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
      }
      let decoded;
      try {
        decoded = decodeURIComponent((request.url ?? "").split(/[?#]/, 1)[0]);
      } catch {
        response.writeHead(400).end();
        return;
      }
      if (
        !decoded.startsWith("/") ||
        decoded.startsWith("//") ||
        /[\\\0:]/.test(decoded) ||
        decoded.split("/").includes("..")
      ) {
        response.writeHead(403).end();
        return;
      }
      const filename = path.resolve(
        output,
        decoded === "/" ? "index.html" : decoded.slice(1),
      );
      const relative = path.relative(output, filename);
      if (
        relative === ".." ||
        relative.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relative)
      ) {
        response.writeHead(403).end();
        return;
      }
      try {
        // Recheck ancestors too: a directory replaced by a link cannot expose files.
        const bytes = await plainFile(filename);
        response.writeHead(200, {
          "Content-Type":
            mime.get(path.extname(filename).toLowerCase()) ??
            "application/octet-stream",
          "Content-Length": bytes.length,
        });
        response.end(request.method === "HEAD" ? undefined : bytes);
      } catch (error) {
        const missing = ["ENOENT", "ENOTDIR"].includes(error.code);
        response.writeHead(missing ? 404 : 403).end();
      }
    }
    respond().catch(() => {
      if (!response.headersSent) response.writeHead(500);
      response.end();
    });
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const url = `http://127.0.0.1:${server.address().port}/`;
  let closing;
  const close = () => {
    closing ??= new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
    return closing;
  };
  return { server, url, close };
}

async function openBrowser(url) {
  // URL is generated from loopback and an OS-selected numeric port, never user input.
  if (process.platform === "win32")
    await runProcess("cmd.exe", ["/d", "/s", "/c", `start "" "${url}"`], {
      stdio: "ignore",
    });
  else
    await runProcess(
      process.platform === "darwin" ? "open" : "xdg-open",
      [url],
      { stdio: "ignore" },
    );
}

/** Browser launching is an optional OS boundary; a failed launch keeps serving. */
export async function runStyleguide(
  args,
  { sourceRoot = defaultRoot, open = openBrowser } = {},
) {
  if (
    args.some((argument) => !["--build-only", "--no-open"].includes(argument))
  )
    throw new Error("Unknown kitchen-sink argument");
  const controller = new AbortController();
  let preview;
  const interrupt = () => {
    controller.abort();
    if (preview)
      void preview.close().catch((error) => console.error(error.message));
  };
  const removeListeners = () => {
    process.removeListener("SIGINT", interrupt);
    process.removeListener("SIGTERM", interrupt);
  };
  process.on("SIGINT", interrupt);
  process.on("SIGTERM", interrupt);
  try {
    await buildStyleguide({ sourceRoot, signal: controller.signal });
    if (args.includes("--build-only")) {
      removeListeners();
      return;
    }
    preview = await serveStyleguide({ sourceRoot });
    preview.server.once("close", removeListeners);
    if (controller.signal.aborted) {
      await preview.close();
      return;
    }
    console.log(`Loop2 styleguide: ${preview.url}`);
    if (!args.includes("--no-open")) {
      try {
        await open(preview.url);
      } catch (error) {
        console.error(
          `Browser launch failed: ${error.message}. Open ${preview.url}`,
        );
      }
    }
    return preview;
  } catch (error) {
    removeListeners();
    if (!controller.signal.aborted) throw error;
  }
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  await runStyleguide(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
