import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { request } from "node:http";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const command = new URL("../../scripts/kitchen-sink.mjs", import.meta.url);
async function api() {
  assert.ok(existsSync(command), "the standalone page command must exist");
  return import(command);
}
async function fixture(t) {
  const directory = await mkdtemp(path.join(root, ".runs/kitchen-sink-test-"));
  t.after(async () => {
    assert.ok(
      path
        .relative(path.join(root, ".runs"), directory)
        .startsWith("kitchen-sink-test-"),
    );
    await rm(directory, { recursive: true, force: true });
  });
  for (const name of [
    "src/browser",
    "assets/fonts",
    "assets/icons",
    "tools/styleguide",
  ])
    await cp(path.join(root, name), path.join(directory, name), {
      recursive: true,
    });
  for (const name of ["tsconfig.browser.json", "tsconfig.styleguide.json"])
    await cp(path.join(root, name), path.join(directory, name));
  await writeFile(path.join(directory, "package.json"), '{"type":"module"}');
  return { directory, output: path.join(directory, ".runs/styleguide/public") };
}
function get(url, target = "/", method = "GET") {
  return new Promise((resolve, reject) => {
    const location = new URL(url);
    const req = request(
      {
        hostname: location.hostname,
        port: location.port,
        path: target,
        method,
        agent: false,
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            headers: res.headers,
            bytes: Buffer.concat(chunks),
          }),
        );
      },
    );
    req.on("error", reject);
    req.end();
  });
}

test("standalone build clears only its output and supplies executable modules, exact assets and inert tokens", async (t) => {
  const { buildStyleguide } = await api();
  const f = await fixture(t);
  await mkdir(f.output, { recursive: true });
  await writeFile(path.join(f.output, "stale.js"), "stale");
  await mkdir(path.join(f.directory, "dist/public"), { recursive: true });
  await writeFile(path.join(f.directory, "dist/public/keep"), "keep");
  const tokenPath = path.join(
    f.directory,
    "src/browser/view/design-tokens.json",
  );
  const data = JSON.parse(await readFile(tokenPath, "utf8"));
  data.roles.text.source =
    '</script><script>alert("metadata")</script>&\u2028\u2029';
  await writeFile(tokenPath, JSON.stringify(data));
  await buildStyleguide({ sourceRoot: f.directory });
  assert.equal(existsSync(path.join(f.output, "stale.js")), false);
  assert.equal(
    await readFile(path.join(f.directory, "dist/public/keep"), "utf8"),
    "keep",
  );
  const html = await readFile(path.join(f.output, "index.html"), "utf8");
  const embedded = html.match(
    /<script type="application\/json" id="styleguide-tokens">([^<]*)<\/script>/,
  );
  assert.ok(embedded, "metadata must remain in one inert JSON element");
  assert.deepEqual(JSON.parse(embedded[1]), data);
  assert.doesNotMatch(html, /<script>alert|STYLEGUIDE_TOKEN_DATA/);
  for (const name of [
    "tools/styleguide/main.js",
    "tools/styleguide/page.js",
    "src/browser/view/controls/index.js",
    "design-tokens.css",
    "styles.css",
    "styleguide.css",
  ])
    assert.ok(existsSync(path.join(f.output, name)), name);
  for (const name of ["Geist.woff2", "GeistMono.woff2", "OFL.txt"])
    assert.deepEqual(
      await readFile(path.join(f.output, "fonts", name)),
      await readFile(path.join(root, "assets/fonts", name)),
    );
  assert.deepEqual(
    await readFile(path.join(f.output, "icons/wood-stick.svg")),
    await readFile(path.join(root, "assets/icons/wood-stick.svg")),
  );
  assert.deepEqual(
    await readFile(path.join(f.output, "styleguide.css")),
    await readFile(path.join(root, "tools/styleguide/styles.css")),
  );
});

test("missing or duplicate data markers and invalid tokens stop the build", async (t) => {
  const { buildStyleguide } = await api();
  for (const mode of ["missing", "duplicate", "invalid"]) {
    const f = await fixture(t);
    const filename = path.join(f.directory, "tools/styleguide/index.html");
    const html = await readFile(filename, "utf8");
    if (mode === "invalid")
      await writeFile(
        path.join(f.directory, "src/browser/view/design-tokens.json"),
        "{}",
      );
    else
      await writeFile(
        filename,
        html.replace(
          "<!-- STYLEGUIDE_TOKEN_DATA -->",
          mode === "missing"
            ? ""
            : "<!-- STYLEGUIDE_TOKEN_DATA --><!-- STYLEGUIDE_TOKEN_DATA -->",
        ),
      );
    await assert.rejects(
      buildStyleguide({ sourceRoot: f.directory }),
      /marker|token|schema/i,
    );
  }
});

test("cleanup refuses a junction in or above the output without changing its target", async (t) => {
  const { buildStyleguide } = await api();
  for (const location of ["root", "ancestor", "nested"]) {
    const f = await fixture(t);
    const outside = path.join(f.directory, "outside");
    await mkdir(outside);
    await writeFile(path.join(outside, "keep"), "unchanged");
    const link =
      location === "ancestor"
        ? path.dirname(f.output)
        : location === "root"
          ? f.output
          : path.join(f.output, "nested");
    await mkdir(path.dirname(link), { recursive: true });
    await symlink(outside, link, "junction");
    await assert.rejects(
      buildStyleguide({ sourceRoot: f.directory }),
      /path|symlink|canonical/i,
    );
    assert.equal(
      await readFile(path.join(outside, "keep"), "utf8"),
      "unchanged",
    );
  }
});

test("loopback server chooses free ports and serves only decoded plain files with correct MIME", async (t) => {
  const { serveStyleguide } = await api();
  const f = await fixture(t);
  await mkdir(f.output, { recursive: true });
  for (const [name, content] of [
    ["index.html", "<!doctype html><title>local</title>"],
    ["module.js", "export const value = 1;"],
    ["style.css", "body {}"],
    ["icon.svg", "<svg/>"],
    ["font.woff2", "wOF2"],
    ["OFL.txt", "licence"],
    ["has space.txt", "space"],
  ])
    await writeFile(path.join(f.output, name), content);
  await writeFile(path.join(f.directory, "secret.txt"), "outside-root");
  const first = await serveStyleguide({ sourceRoot: f.directory });
  const second = await serveStyleguide({ sourceRoot: f.directory });
  t.after(() => Promise.all([first.close(), second.close()]));
  assert.equal(first.server.address().address, "127.0.0.1");
  assert.ok(first.server.address().port > 0);
  assert.notEqual(first.url, second.url);
  for (const [target, mime, text] of [
    ["/", "text/html", "<!doctype html>"],
    ["/module.js", "text/javascript", "export const"],
    ["/style.css", "text/css", "body"],
    ["/icon.svg", "image/svg+xml", "<svg"],
    ["/font.woff2", "font/woff2", "wOF2"],
    ["/OFL.txt", "text/plain", "licence"],
    ["/has%20space.txt?cache=1", "text/plain", "space"],
  ]) {
    const response = await get(first.url, target);
    assert.equal(response.status, 200, target);
    assert.ok(response.headers["content-type"].startsWith(mime), target);
    assert.ok(response.bytes.toString().startsWith(text), target);
  }
  assert.equal((await get(first.url, "/module.js", "HEAD")).bytes.length, 0);
  assert.equal((await get(first.url, "/", "POST")).status, 405);
  for (const target of [
    "/../secret.txt",
    "/%2e%2e/secret.txt",
    "/a/%2e%2e/%2e%2e/secret.txt",
    "/%2e%2e%2fsecret.txt",
    "/..%5csecret.txt",
    "/a\\..\\secret.txt",
    "/%00",
    "/%zz",
    "//outside/secret",
    "/C:%5csecret.txt",
    "/index.html:stream",
  ]) {
    const response = await get(first.url, target);
    assert.ok(response.status >= 400, target);
    assert.doesNotMatch(response.bytes.toString(), /outside-root/);
  }
  assert.equal((await get(first.url, "/package.json")).status, 404);
  await symlink(f.directory, path.join(f.output, "escape"), "junction");
  assert.equal((await get(first.url, "/escape/secret.txt")).status, 403);
  await first.close();
  await assert.rejects(get(first.url), /ECONNREFUSED/);
});

async function childReady(t, args, options = {}) {
  const child = spawn(process.execPath, args, {
    cwd: root,
    stdio: ["pipe", "pipe", "pipe"],
    ...options,
  });
  let output = "";
  let diagnostics = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    diagnostics += chunk;
  });
  const ended = new Promise((resolve) =>
    child.on("exit", (code, signal) => resolve({ code, signal })),
  );
  t.after(async () => {
    if (child.exitCode === null && child.signalCode === null) child.kill();
    await ended;
  });
  const url = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`No readiness URL: ${output}${diagnostics}`)),
      20000,
    );
    child.once("exit", () => {
      clearTimeout(timeout);
      reject(new Error(`Exited before ready: ${output}${diagnostics}`));
    });
    child.stdout.on("data", () => {
      const match = output.match(/http:\/\/127\.0\.0\.1:\d+\//);
      if (match) {
        clearTimeout(timeout);
        resolve(match[0]);
      }
    });
  });
  return { child, ended, url, diagnostics: () => diagnostics };
}

test("build-only completes without opening or listening; unknown flags fail", async () => {
  await api();
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(command), "--build-only"],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.doesNotMatch(result.stdout, /http:\/\/127\.0\.0\.1:/);
  assert.ok(existsSync(path.join(root, ".runs/styleguide/public/index.html")));
  const invalid = spawnSync(
    process.execPath,
    [fileURLToPath(command), "--unknown"],
    { cwd: root, encoding: "utf8" },
  );
  assert.notEqual(invalid.status, 0);
  assert.match(invalid.stderr, /Unknown/);
});

test("no-open serves until SIGINT and closes its listening socket", async (t) => {
  await api();
  const running = await childReady(t, [fileURLToPath(command), "--no-open"]);
  assert.equal((await get(running.url)).status, 200);
  // Windows has no POSIX console SIGINT via ChildProcess.kill; deliver the same
  // registered event inside a real child, keeping the listener/socket real.
  if (process.platform === "win32") {
    running.child.kill();
    await running.ended;
    const harness = `import {runStyleguide} from ${JSON.stringify(command.href)}; await runStyleguide(["--no-open"]); process.stdin.once("data",()=>process.emit("SIGINT"));`;
    const signalled = await childReady(t, [
      "--input-type=module",
      "-e",
      harness,
    ]);
    signalled.child.stdin.end("interrupt");
    assert.equal((await signalled.ended).code, 0);
    await assert.rejects(get(signalled.url), /ECONNREFUSED/);
  } else {
    running.child.kill("SIGINT");
    assert.equal((await running.ended).code, 0);
  }
  await assert.rejects(get(running.url), /ECONNREFUSED/);
});

test("a real failed launcher leaves a usable URL and server until interruption", async (t) => {
  await api();
  const harness = `import {runStyleguide} from ${JSON.stringify(command.href)}; import {spawn} from "node:child_process"; await runStyleguide([], {open: () => new Promise((resolve,reject)=>{const child=spawn(${JSON.stringify(path.join(root, ".runs/missing-launcher"))},[]); child.on("error",reject); child.on("exit",code=>code===0?resolve():reject(Error("launcher failed")));})}); process.stdin.once("data",()=>process.emit("SIGTERM"));`;
  const running = await childReady(t, ["--input-type=module", "-e", harness]);
  assert.equal((await get(running.url)).status, 200);
  running.child.stdin.end("interrupt");
  assert.equal((await running.ended).code, 0);
  assert.match(running.diagnostics(), /browser|launch/i);
  assert.ok(running.diagnostics().includes(running.url));
});
