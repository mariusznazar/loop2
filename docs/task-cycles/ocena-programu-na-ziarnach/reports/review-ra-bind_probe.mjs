// Reviewer's probe: does a stand-in server hold its port during its hold, old shape and new?
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const head = `import { createServer } from "node:http";
const host = process.env.LOOP2_LISTEN_HOST;
const port = Number(process.env.LOOP2_LISTEN_PORT);
`;
const oldShape = `${head}createServer((q, r) => r.end("x")).listen(port, host, () => console.log("Loop: " + port));
console.log("hold");
Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000);
`;
const newShape = `${head}createServer((q, r) => r.end("x")).listen(port, host, () => {
  console.log("Loop: " + port);
  console.log("hold");
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000);
});
`;

function freePort() {
  return new Promise((resolve) => {
    const s = createServer();
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

function tryBind(port) {
  return new Promise((resolve) => {
    const s = createServer();
    s.once("error", (e) => resolve(e.code));
    s.listen(port, "127.0.0.1", () => s.close(() => resolve("bound-ok")));
  });
}

async function run(name, code) {
  const file = join(here, `${name}.mjs`);
  writeFileSync(file, code);
  const port = await freePort();
  const child = spawn(process.execPath, [file], {
    env: { ...process.env, LOOP2_LISTEN_HOST: "127.0.0.1", LOOP2_LISTEN_PORT: String(port) },
  });
  let out = "";
  await new Promise((resolve) => {
    child.stdout.on("data", (d) => {
      out += d;
      if (out.includes("hold")) resolve();
    });
  });
  await new Promise((r) => setTimeout(r, 200));
  const result = await tryBind(port);
  const lines = out.trim().split("\n").join(" | ");
  child.kill();
  return `${name}: output before the bind try [${lines}], another bind during the hold: ${result}`;
}

console.log(await run("old-shape", oldShape));
console.log(await run("new-shape", newShape));
