// The local start of the game: `npm run local` builds it, then this file runs it
// on this computer over HTTPS, with a database made for this start. A browser
// opens the address printed last; `npm run local:stop` or Ctrl+C ends the start.
//
// The account server speaks plain HTTP and takes account requests only as HTTPS
// from its one public address, so this process holds two things: an HTTPS proxy
// on 127.0.0.1 at a port the system picks, and behind it the built server, in the
// same process, in `loopback-proxy` mode (D-110). One process means that a start
// killed from outside leaves no server behind it holding a port or the database.
//
// The certificate and its key are made at each start and live only in memory.
// Each start works in a directory of its own under .runs/local-start/, named by
// its process id, and removes the directories of the starts that have ended, the
// databases in them included. That path comes from this file's place alone: no
// argument and no environment value leads the removal anywhere else.
//
// Exit codes: 0 stopped, 1 the start failed or a start did not stop, 2 refused.
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { request as httpRequest } from "node:http";
import { createServer as createHttpsServer } from "node:https";
import { connect, createServer as createNetServer } from "node:net";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const USAGE = "usage: npm run local | npm run local:stop";
const HOST = "127.0.0.1";
const READY_TIMEOUT_MS = 30_000;
const STOP_TIMEOUT_MS = 10_000;
const STOP_CHECK_MS = 200;
const EXIT_FAILED = 1;
const EXIT_REFUSED = 2;

const root = fileURLToPath(new URL("../", import.meta.url));
const startsDirectory = join(root, ".runs", "local-start");
const startDirectoryName = /^(\d+)-[0-9a-f]{12}$/;
const stopFileName = "stop";

// A port of this computer where nothing answers: a message fails at once, the
// account stays unconfirmed and the registration does not wait for its deadline.
const unanswered = { host: HOST, port: "1" };

// What a proxy tells the server about a request. This proxy is the only hop, so
// whatever a browser sent under these names stops here, in any spelling Node.js
// reports as the same lower-case name.
function isProxyHeader(name) {
  return (
    name === "forwarded" ||
    name.startsWith("x-forwarded") ||
    name === "x-real-ip" ||
    name === "cf-connecting-ip"
  );
}

function upstreamHeaders(received) {
  const headers = {};
  for (const [name, value] of Object.entries(received))
    if (!isProxyHeader(name)) headers[name] = value;
  headers["x-forwarded-proto"] = "https";
  return headers;
}

// openssl from PATH, or on Windows the copy that comes with Git for Windows.
function findOpenssl() {
  const candidates = ["openssl"];
  if (process.platform === "win32") {
    try {
      const git = execFileSync("git", ["--exec-path"], { encoding: "utf8" });
      candidates.push(join(git.trim(), "..", "..", "bin", "openssl.exe"));
    } catch {
      // No Git on PATH: only the PATH candidate remains.
    }
  }
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["version"], { stdio: "ignore" });
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error("openssl was found neither on PATH nor beside Git");
}

// The key and the certificate, one after the other in one text: openssl writes
// both to its standard output, so neither ever stands in a file.
function makeCertificate() {
  return execFileSync(
    findOpenssl(),
    [
      "req",
      "-x509",
      "-nodes",
      "-newkey",
      "ec",
      "-pkeyopt",
      "ec_paramgen_curve:prime256v1",
      "-days",
      "30",
      "-subj",
      `/CN=${HOST}`,
      "-addext",
      `subjectAltName=IP:${HOST}`,
      "-keyout",
      "-",
      "-out",
      "-",
    ],
    { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
  );
}

function proxyRequest(serverPort, incoming, outgoing) {
  const upstream = httpRequest(
    {
      host: HOST,
      port: serverPort,
      method: incoming.method,
      path: incoming.url,
      headers: upstreamHeaders(incoming.headers),
    },
    (response) => {
      outgoing.writeHead(response.statusCode ?? 502, response.headers);
      response.pipe(outgoing);
    },
  );
  upstream.once("error", () => {
    if (!outgoing.headersSent) outgoing.writeHead(502);
    outgoing.end();
  });
  outgoing.once("close", () => upstream.destroy());
  incoming.pipe(upstream);
}

function listenOnFreePort(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, HOST, () => resolve(server.address().port));
  });
}

async function freePort() {
  const probe = createNetServer();
  const port = await listenOnFreePort(probe);
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

function acceptsConnections(port) {
  return new Promise((resolve) => {
    const socket = connect(port, HOST);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// The built server sets the exit code when it cannot start and goes on running
// when it can; it has nothing else to wait on here, in its own process.
async function waitForServer(port) {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (process.exitCode === undefined && Date.now() < deadline) {
    if (await acceptsConnections(port)) return true;
    await sleep(50);
  }
  return false;
}

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}

// The directories this command made, each with the process that made it. A
// directory of any other name is not this command's and stays untouched.
function startDirectories() {
  if (!existsSync(startsDirectory)) return [];
  const found = [];
  for (const entry of readdirSync(startsDirectory, { withFileTypes: true })) {
    const name = startDirectoryName.exec(entry.name);
    if (entry.isDirectory() && name)
      found.push({
        path: join(startsDirectory, entry.name),
        pid: Number(name[1]),
      });
  }
  return found;
}

function removeEndedStarts() {
  for (const { path, pid } of startDirectories()) {
    if (isRunning(pid)) continue;
    try {
      rmSync(path, { recursive: true, force: true, maxRetries: 3 });
    } catch {
      console.error(`Could not remove an earlier start's files: ${path}`);
    }
  }
}

function serverSettings(directory, origin, serverPort) {
  const sessionKeys = join(directory, "session-keys");
  const mailPassword = join(directory, "mail-password");
  writeFileSync(
    sessionKeys,
    JSON.stringify([randomBytes(32).toString("base64url")]),
    { mode: 0o600 },
  );
  writeFileSync(mailPassword, randomBytes(16).toString("hex"), { mode: 0o600 });
  return {
    LOOP2_LISTEN_HOST: HOST,
    LOOP2_LISTEN_PORT: String(serverPort),
    LOOP2_DATABASE_PATH: join(directory, "accounts.sqlite"),
    LOOP2_SESSION_SECRET_FILE: sessionKeys,
    LOOP2_PUBLIC_ORIGIN: origin,
    LOOP2_PROXY_MODE: "loopback-proxy",
    LOOP2_MAIL_FROM: "local-start@example.test",
    LOOP2_SMTP_HOST: unanswered.host,
    LOOP2_SMTP_PORT: unanswered.port,
    LOOP2_SMTP_USER: "local-start@example.test",
    LOOP2_SMTP_PASSWORD_FILE: mailPassword,
  };
}

async function start() {
  const pair = makeCertificate();
  removeEndedStarts();
  const directory = join(
    startsDirectory,
    `${process.pid}-${randomBytes(6).toString("hex")}`,
  );
  mkdirSync(directory, { recursive: true, mode: 0o700 });

  const serverPort = await freePort();
  const proxy = createHttpsServer({ key: pair, cert: pair }, (request, reply) =>
    proxyRequest(serverPort, request, reply),
  );
  const origin = `https://${HOST}:${await listenOnFreePort(proxy)}`;

  // Registered before the server's own handlers, so the process ends at once.
  for (const signal of ["SIGINT", "SIGTERM"])
    process.once(signal, () => process.exit(0));

  Object.assign(process.env, serverSettings(directory, origin, serverPort));
  await import(pathToFileURL(join(root, "dist", "server", "main.js")).href);
  if (!(await waitForServer(serverPort)))
    throw new Error("the built server did not start");

  const stopFile = join(directory, stopFileName);
  setInterval(() => {
    if (existsSync(stopFile)) process.exit(0);
  }, STOP_CHECK_MS);
  console.log(`Local game: ${origin} (Ctrl+C or npm run local:stop ends it)`);
}

async function stop() {
  const running = startDirectories().filter(({ pid }) => isRunning(pid));
  for (const { path } of running) writeFileSync(join(path, stopFileName), "");
  const deadline = Date.now() + STOP_TIMEOUT_MS;
  let left = running;
  while (left.length > 0 && Date.now() < deadline) {
    await sleep(STOP_CHECK_MS);
    left = left.filter(({ pid }) => isRunning(pid));
  }
  for (const { pid } of left)
    console.error(`The local start of process ${pid} did not stop.`);
  console.log(`Local starts stopped: ${running.length - left.length}`);
  return left.length === 0 ? 0 : EXIT_FAILED;
}

const options = process.argv.slice(2);
if (options.length > 1 || (options.length === 1 && options[0] !== "--stop")) {
  console.error(USAGE);
  process.exit(EXIT_REFUSED);
}
try {
  if (options.length === 1) process.exit(await stop());
  await start();
} catch (error) {
  console.error(`The local start failed: ${error.message}`);
  process.exit(EXIT_FAILED);
}
