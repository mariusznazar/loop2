import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { request } from "node:http";
import { once } from "node:events";
import { mkdtemp, readFile, rmdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createApp } from "../dist/server/app.js";

let server;
let port;
let temporaryDirectory;
const originalDirectory = process.cwd();
const expectedHtml = await readFile(
  new URL("../dist/public/index.html", import.meta.url),
  "utf8",
);
const expectedScript = await readFile(
  new URL("../dist/public/main.js", import.meta.url),
  "utf8",
);

before(async () => {
  temporaryDirectory = await mkdtemp(join(tmpdir(), "loop2-http-"));
  // Construct the app away from the repository to exercise its static root.
  process.chdir(temporaryDirectory);
  try {
    server = createApp().listen(0, "127.0.0.1");
    await once(server, "listening");
    port = server.address().port;
  } finally {
    process.chdir(originalDirectory);
  }
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
  if (temporaryDirectory) await rmdir(temporaryDirectory);
});

function send(path, method = "GET", headers = {}) {
  return new Promise((resolve, reject) => {
    // The path option preserves dot segments; do not replace with a URL or fetch.
    const outgoing = request(
      { hostname: "127.0.0.1", port, path, method, headers, agent: false },
      (incoming) => {
        let body = "";
        incoming.setEncoding("utf8");
        incoming.on("data", (chunk) => {
          body += chunk;
        });
        incoming.on("end", () =>
          resolve({
            status: incoming.statusCode,
            headers: incoming.headers,
            body,
          }),
        );
        incoming.on("error", reject);
      },
    );
    outgoing.on("error", reject);
    outgoing.setTimeout(5000, () =>
      outgoing.destroy(new Error("HTTP test timeout")),
    );
    outgoing.end();
  });
}

test("serves the built HTML and JavaScript from another working directory", async () => {
  const html = await send("/");
  assert.equal(html.status, 200);
  assert.match(html.headers["content-type"], /^text\/html/);
  assert.equal(html.body, expectedHtml);
  assert.match(html.body, /<script type="module" src="\/main\.js"><\/script>/);
  const script = await send("/main.js");
  assert.equal(script.status, 200);
  assert.match(
    script.headers["content-type"],
    /(?:text|application)\/javascript/,
  );
  assert.equal(script.body, expectedScript);
});

test("API keeps its JSON error across paths, methods, queries and HTML negotiation", async () => {
  for (const path of [
    "/api",
    "/api/",
    "/api/missing/nested",
    "/api/missing?view=html",
  ]) {
    for (const method of [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
      "HEAD",
    ]) {
      const response = await send(path, method, { Accept: "text/html" });
      assert.equal(response.status, 404, `${method} ${path}`);
      assert.match(response.headers["content-type"], /^application\/json/);
      if (method === "HEAD") assert.equal(response.body, "");
      else assert.deepEqual(JSON.parse(response.body), { error: "Not found" });
    }
  }
});

test("ordinary missing routes and files do not become the home page or API", async () => {
  for (const path of ["/apix", "/missing.js", "/unknown/page"]) {
    const response = await send(path);
    assert.equal(response.status, 404, path);
    assert.doesNotMatch(response.headers["content-type"], /application\/json/);
    assert.notEqual(response.body, expectedHtml);
  }
});

test("raw and encoded traversal cannot expose files outside dist/public", async () => {
  // invariant: public-file-access
  for (const path of [
    "/package.json",
    "/tsconfig.server.json",
    "/src/server/app.ts",
    "/.git/config",
    "/../package.json",
    "/../../package.json",
    "/%2e%2e/%2e%2e/package.json",
    "/..%2f..%2fpackage.json",
    "/..%5c..%5cpackage.json",
    "/%252e%252e/%252e%252e/package.json",
    "/%E0%A4%A",
  ]) {
    const response = await send(path);
    assert.ok(
      [400, 403, 404].includes(response.status),
      `${path}: ${response.status}`,
    );
    assert.doesNotMatch(
      response.body,
      /"dependencies"|"compilerOptions"|export function createApp|\[core\]/,
    );
    assert.notEqual(response.body, expectedHtml);
  }
});
