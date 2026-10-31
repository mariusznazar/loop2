// The restore trial (D-220): the owner runs a decrypted backup of the account
// database in the built image of the same commit, logs in as the test account
// and checks that the saved game state came back.
//
//   <password> | node scripts/restore-trial.mjs --image <image> --database <file>
//       --marker <text> --email <address>
//
// The password comes on standard input, never as an argument. The marker is the
// name the owner gave a character or a program in the test account before the
// backup was made; it must stand in the saved game state.
//
// One container starts from the image on two fresh volumes, the database in one
// and a synthetic session key and SMTP password, made for this run, in the
// other, with the production settings of compose.yaml. It has no network, so no
// mail can leave it (a login sends none). From inside the container, with the
// headers Cloudflare's tunnel gives every request, a probe logs in through the
// server's own HTTP port and reads GET /api/saved-game; the saved game state is
// searched for the marker inside the container and never leaves it. The
// container and both volumes are removed at every end, a failure and an
// interruption included.
//
// Prints the Node.js release, the login's status, the save's revision, whether
// the marker stands in the saved game state, then PASS or FAIL. It prints no
// game text, no address and no password.
//
// Exit codes: 0 PASS; 1 FAIL, the trial ran and judged the backup; 2 refused,
// nothing was started; 3 FAIL, the trial could not run to a judgement; 4 a
// container or volume could not be removed and is named; 130 interrupted.
// Built-in modules only. The docker commands go to the daemon the docker CLI is
// set to.
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import {
  closeSync,
  openSync,
  readSync,
  statSync,
  createReadStream,
} from "node:fs";
import { pathToFileURL } from "node:url";

// The settings of compose.yaml's application service that decide how the
// database and the sessions are opened; tests/deploy/test_restore_trial.py
// compares them with that file. The mail settings are synthetic on purpose.
export const PRODUCTION_ENVIRONMENT = {
  LOOP2_DATABASE_PATH: "/app/data/accounts.sqlite",
  LOOP2_SESSION_SECRET_FILE: "/run/secrets/loop2_session_secrets",
  LOOP2_PUBLIC_ORIGIN: "https://loop2.mariusznazar.com",
  LOOP2_PROXY_MODE: "cloudflare-tunnel",
  LOOP2_MAIL_FROM: "restore-trial@mail.example.test",
  LOOP2_SMTP_HOST: "smtp.example.test",
  LOOP2_SMTP_PORT: "587",
  LOOP2_SMTP_USER: "restore-trial@mail.example.test",
  LOOP2_SMTP_PASSWORD_FILE: "/run/secrets/loop2_smtp_password",
};

export const EXIT_PASS = 0;
export const EXIT_FAIL = 1;
export const EXIT_REFUSED = 2;
export const EXIT_NOT_RUN = 3;
export const EXIT_LEFT_BEHIND = 4;
export const EXIT_INTERRUPTED = 130;

const PREFIX = "loop2-restore-trial-";
const MEMORY_LIMIT = "512m";
const NODE_UID = 1000;
const SESSION_COOKIE = "__Host-loop2.sid";
const SQLITE_HEADER = "SQLite format 3\u0000";
const COMMAND_TIMEOUT_MS = 120_000;
const COPY_TIMEOUT_MS = 900_000;
const PROBE_TIMEOUT_MS = 90_000;
const SERVE_TIMEOUT_MS = 120_000;
const OUTPUT_LIMIT = 4 * 1024 * 1024;
const REMOVE_ATTEMPTS = 3;
const USAGE =
  "usage: <password> | node scripts/restore-trial.mjs --image <image> --database <decrypted file> --marker <text> --email <address>";

export class UsageError extends Error {}
class Interrupted extends Error {}
class NotRun extends Error {}

export function parseArguments(argv) {
  const options = ["--image", "--database", "--marker", "--email"];
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index];
    if (!options.includes(name)) {
      // Never echo the word: a password given by mistake would be shown.
      throw new UsageError(
        /pass/i.test(name.split("=")[0])
          ? "the password comes on standard input, never as an argument"
          : "an unknown option or a stray argument",
      );
    }
    const value = argv[index + 1];
    if (value === undefined) throw new UsageError(`${name} needs a value`);
    if (name in values) throw new UsageError(`${name} given twice`);
    values[name] = value;
  }
  for (const name of options)
    if (!(name in values)) throw new UsageError(`${name} is required`);
  const image = values["--image"];
  const marker = values["--marker"];
  const email = values["--email"];
  if (!/^[A-Za-z0-9][A-Za-z0-9._:/@-]{0,254}$/.test(image))
    throw new UsageError("--image is not an image name or id");
  if (
    marker.trim() === "" ||
    marker.length > 200 ||
    [...marker].some((char) => char <= "\u001f" || char === "\u007f")
  )
    throw new UsageError(
      "--marker must be 1 to 200 characters of one line, not blank",
    );
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(email))
    throw new UsageError("--email is not an address");
  return {
    image,
    database: values["--database"],
    marker,
    email,
  };
}

// The file must be a decrypted SQLite database: an encrypted backup, a
// directory or an empty file has none of it.
export function checkDatabaseFile(path) {
  let size;
  let head = Buffer.alloc(16);
  try {
    const stat = statSync(path);
    if (!stat.isFile()) throw new Error();
    size = stat.size;
    const handle = openSync(path, "r");
    try {
      readSync(handle, head, 0, 16, 0);
    } finally {
      closeSync(handle);
    }
  } catch {
    throw new UsageError("--database is not a readable file");
  }
  if (size === 0 || head.toString("latin1") !== SQLITE_HEADER)
    throw new UsageError(
      "--database is not a decrypted SQLite database; decrypt the backup first",
    );
  return size;
}

// A console in UTF-8 (Windows PowerShell 5.1 under code page 65001) writes a
// byte-order mark, two when $OutputEncoding is UTF-8 too, before piped text;
// they are no part of the password.
export function cleanPassword(text) {
  const password = text.replace(/^\u{feff}+/u, "").replace(/\r?\n$/, "");
  if (password === "")
    throw new UsageError("the password on standard input is empty");
  if (password.length > 1000 || /[\r\n]/.test(password))
    throw new UsageError("the password on standard input is not one line");
  return password;
}

function readStandardInput() {
  return new Promise((resolve, reject) => {
    if (process.stdin.isTTY) {
      reject(new UsageError("the password must be piped in on standard input"));
      return;
    }
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf8")),
    );
    process.stdin.on("error", () => resolve(""));
  });
}

let interrupted = false;
const running = new Set();

function onSignal() {
  interrupted = true;
  for (const child of running) child.kill();
}

// One docker command. Resolves with the status (null when docker could not run
// or timed out), the output and the error text; never rejects. An interrupted
// trial starts no further command unless it is the cleanup's.
function docker(args, options = {}) {
  const {
    input,
    from,
    timeout = COMMAND_TIMEOUT_MS,
    cleanup = false,
  } = options;
  if (interrupted && !cleanup) throw new Interrupted();
  return new Promise((resolve) => {
    const out = [];
    const err = [];
    let size = 0;
    let settled = false;
    const finish = (status, extra = "") => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      running.delete(child);
      resolve({
        status,
        stdout: Buffer.concat(out).toString("utf8"),
        stderr: Buffer.concat(err).toString("utf8") + extra,
      });
    };
    const child = spawn("docker", args, {
      stdio: [input !== undefined || from ? "pipe" : "ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    running.add(child);
    const timer = setTimeout(() => child.kill(), timeout);
    const collect = (list) => (chunk) => {
      size += chunk.length;
      if (size <= OUTPUT_LIMIT) list.push(chunk);
    };
    child.stdout.on("data", collect(out));
    child.stderr.on("data", collect(err));
    child.on("error", () => finish(null, "docker could not be run"));
    child.on("close", (code) => finish(code));
    if (child.stdin) {
      child.stdin.on("error", () => {});
      if (from)
        createReadStream(from)
          .on("error", () => child.stdin.destroy())
          .pipe(child.stdin);
      else child.stdin.end(input);
    }
  });
}

function names(id) {
  return {
    data: `${PREFIX}data-${id}`,
    secrets: `${PREFIX}secrets-${id}`,
    setup: `${PREFIX}setup-${id}`,
    app: `${PREFIX}app-${id}`,
  };
}

// Runs as root in a throw-away container with both volumes: writes the secrets
// the application reads (made here, per run) and the database from standard
// input, then prints the number of bytes it wrote.
function setupScript() {
  const environment = PRODUCTION_ENVIRONMENT;
  return `
const fs = require('node:fs');
const crypto = require('node:crypto');
const secret = (path, text) => {
  fs.writeFileSync(path, text, { mode: 0o440, flag: 'wx' });
  fs.chownSync(path, 0, ${NODE_UID});
};
secret(${JSON.stringify(environment.LOOP2_SESSION_SECRET_FILE)},
  JSON.stringify([crypto.randomBytes(32).toString('base64url')]));
secret(${JSON.stringify(environment.LOOP2_SMTP_PASSWORD_FILE)},
  crypto.randomBytes(16).toString('hex'));
const target = ${JSON.stringify(environment.LOOP2_DATABASE_PATH)};
const out = fs.createWriteStream(target, { mode: 0o600, flags: 'wx' });
const fail = () => { process.exitCode = 1; };
out.on('error', fail);
process.stdin.on('error', fail);
out.on('finish', () => {
  fs.chownSync(target, ${NODE_UID}, ${NODE_UID});
  process.stdout.write(String(out.bytesWritten));
});
process.stdin.pipe(out);
`;
}

// Runs inside the application container by its own Node.js. SPEC is replaced by
// a JSON string holding the request; the probe prints one JSON line of numbers
// and booleans, never the saved game state.
const PROBE = String.raw`
const spec = JSON.parse(SPEC);
const base = "http://127.0.0.1:" + process.env.LOOP2_LISTEN_PORT;
const cloudflare = { "x-forwarded-proto": "https", "cf-connecting-ip": "192.0.2.10" };
const holds = (value, text) =>
  typeof value === "string" ? value.includes(text)
    : value !== null && typeof value === "object"
      ? Object.values(value).some((inner) => holds(inner, text)) : false;
(async () => {
  const result = { loginStatus: null, saveStatus: null, revision: null, markerFound: null };
  const login = await fetch(base + "/api/session", {
    method: "POST", redirect: "manual", signal: AbortSignal.timeout(60000),
    headers: { ...cloudflare, origin: spec.origin, "content-type": "application/json" },
    body: JSON.stringify({ email: spec.email, password: spec.password }),
  });
  await login.text();
  result.loginStatus = login.status;
  const pair = login.headers.getSetCookie().map((line) => line.split(";")[0])
    .find((cookie) => cookie.startsWith(spec.cookieName + "="));
  if (login.status === 200 && pair) {
    const saved = await fetch(base + "/api/saved-game", {
      redirect: "manual", signal: AbortSignal.timeout(30000),
      headers: { ...cloudflare, cookie: pair },
    });
    result.saveStatus = saved.status;
    const body = JSON.parse(await saved.text());
    if (saved.status === 200 && body.save) {
      result.revision = body.save.revision;
      result.markerFound = holds(body.save.game, spec.marker);
    }
  }
  console.log(JSON.stringify(result));
})().catch(() => { process.exitCode = 1; });
`;

const SERVING_PROBE =
  "fetch('http://127.0.0.1:' + process.env.LOOP2_LISTEN_PORT + '/').then(r => process.exit(r.status === 200 ? 0 : 1), () => process.exit(1))";

function integerOrNull(value) {
  return Number.isSafeInteger(value) ? value : null;
}

// Docker's own text, with what the owner gave removed and cut short.
function safeText(text, secrets) {
  let shown = text;
  for (const secret of secrets)
    if (secret) shown = shown.split(secret).join("[hidden]");
  shown = shown.replace(/\s+/g, " ").trim();
  return shown.length > 600 ? `${shown.slice(0, 600)}...` : shown;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Everything the trial makes, then its verdict. Throws Interrupted or NotRun;
// `facts` collects the lines printed before the verdict.
async function trial(request, password, size, ids, facts) {
  const secrets = [request.email, password, request.marker];
  const notRun = (step, answer) => {
    const detail = answer ? safeText(answer.stderr, secrets) : "";
    return new NotRun(detail ? `${step}: ${detail}` : step);
  };

  const inspected = await docker([
    "image",
    "inspect",
    "--format",
    "{{json .}}",
    request.image,
  ]);
  if (inspected.status === null) throw notRun("docker could not be run");
  let image;
  try {
    image = JSON.parse(inspected.stdout);
  } catch {
    throw notRun("the image cannot be inspected", inspected);
  }
  if (inspected.status !== 0 || typeof image?.Id !== "string")
    throw notRun("the image cannot be inspected", inspected);
  const labels = image.Config?.Labels ?? {};
  if (labels["org.opencontainers.image.title"] !== "loop2")
    throw notRun("the image is not labelled as loop2");
  const revision = labels["org.opencontainers.image.revision"];
  facts.push(
    `image revision: ${/^[0-9a-f]{7,40}$|^[\w.-]{1,64}$/.test(revision ?? "") ? revision : "unknown"}`,
  );

  for (const volume of [ids.data, ids.secrets]) {
    const created = await docker(["volume", "create", volume]);
    if (created.status !== 0)
      throw notRun("a volume could not be created", created);
  }
  const copied = await docker(
    [
      "run",
      "--rm",
      "-i",
      "--name",
      ids.setup,
      "--network",
      "none",
      "--memory",
      MEMORY_LIMIT,
      "--user",
      "0:0",
      "--entrypoint",
      "node",
      "--mount",
      `type=volume,src=${ids.data},dst=/app/data`,
      "--mount",
      `type=volume,src=${ids.secrets},dst=/run/secrets`,
      image.Id,
      "-e",
      setupScript(),
    ],
    { from: request.database, timeout: COPY_TIMEOUT_MS },
  );
  if (copied.status !== 0)
    throw notRun("the volumes could not be prepared", copied);
  if (copied.stdout.trim() !== String(size))
    throw notRun("the database was not copied whole into the volume");

  const environment = Object.entries(PRODUCTION_ENVIRONMENT).flatMap(
    ([key, value]) => ["-e", `${key}=${value}`],
  );
  const started = await docker([
    "run",
    "-d",
    "--init",
    "--name",
    ids.app,
    "--network",
    "none",
    "--memory",
    MEMORY_LIMIT,
    "--restart",
    "no",
    "--mount",
    `type=volume,src=${ids.data},dst=/app/data`,
    "--mount",
    `type=volume,src=${ids.secrets},dst=/run/secrets,readonly`,
    ...environment,
    image.Id,
  ]);
  if (started.status !== 0)
    throw notRun("the server container did not start", started);

  const deadline = Date.now() + SERVE_TIMEOUT_MS;
  for (;;) {
    const served = await docker(["exec", ids.app, "node", "-e", SERVING_PROBE]);
    if (served.status === 0) break;
    const state = await docker([
      "inspect",
      "--format",
      "{{.State.Running}} {{.State.ExitCode}}",
      ids.app,
    ]);
    if (state.stdout.startsWith("false")) {
      const logs = await docker(["logs", "--tail", "10", ids.app]);
      throw notRun(
        `the server exited with code ${state.stdout.trim().split(" ")[1]}, log: ${safeText(logs.stdout + logs.stderr, secrets)}`,
      );
    }
    if (Date.now() > deadline)
      throw notRun("the server did not answer in time");
    await sleep(1000);
  }

  const version = await docker(["exec", ids.app, "node", "--version"]);
  const release = version.stdout.trim();
  if (version.status !== 0 || !/^v\d+\.\d+\.\d+$/.test(release))
    throw notRun("the Node.js release could not be read");
  facts.unshift(`Node.js ${release}`);

  const spec = {
    email: request.email,
    password,
    marker: request.marker,
    origin: PRODUCTION_ENVIRONMENT.LOOP2_PUBLIC_ORIGIN,
    cookieName: SESSION_COOKIE,
  };
  const probe = await docker(["exec", "-i", ids.app, "node", "-"], {
    input: PROBE.replace("SPEC", () => JSON.stringify(JSON.stringify(spec))),
    timeout: PROBE_TIMEOUT_MS,
  });
  let result;
  try {
    result = JSON.parse(probe.stdout.trim().split("\n").pop());
  } catch {
    result = null;
  }
  if (
    probe.status !== 0 ||
    !result ||
    integerOrNull(result.loginStatus) === null
  )
    throw notRun("the login probe gave no answer");

  const revisionRead = integerOrNull(result.revision);
  facts.push(`login status: ${result.loginStatus}`);
  facts.push(`save revision: ${revisionRead ?? "none"}`);
  facts.push(
    `marker in the saved game state: ${result.markerFound === true ? "yes" : result.markerFound === false ? "no" : "not read"}`,
  );
  if (result.loginStatus !== 200) return "the test account could not log in";
  if (revisionRead === null) return "the account holds no saved game state";
  if (result.markerFound !== true)
    return "the marker is not in the saved game state";
  return null;
}

// Removes the containers and volumes of this run, then checks that none is
// left. Returns the names that are.
async function cleanup(ids) {
  const all = Object.values(ids);
  const present = async () => {
    const found = [];
    for (const [kind, format] of [
      ["ps", "{{.Names}}"],
      ["volume ls", "{{.Name}}"],
    ]) {
      const listing = await docker(
        [
          ...kind.split(" "),
          ...(kind === "ps" ? ["-a"] : []),
          "--filter",
          `name=${PREFIX}`,
          "--format",
          format,
        ],
        { cleanup: true },
      );
      for (const name of listing.stdout.split(/\s+/))
        if (all.includes(name)) found.push(name);
    }
    return found;
  };
  let left = [];
  for (let attempt = 0; attempt < REMOVE_ATTEMPTS; attempt += 1) {
    for (const container of [ids.app, ids.setup])
      await docker(["rm", "--force", "--volumes", container], {
        cleanup: true,
      });
    await docker(["volume", "rm", "--force", ids.data, ids.secrets], {
      cleanup: true,
    });
    left = await present();
    if (left.length === 0) return left;
    await sleep(1000);
  }
  return left;
}

export async function run(argv) {
  let request;
  let password;
  let size;
  try {
    request = parseArguments(argv);
    size = checkDatabaseFile(request.database);
    password = cleanPassword(await readStandardInput());
  } catch (error) {
    if (!(error instanceof UsageError)) throw error;
    console.error(error.message);
    console.error(USAGE);
    return EXIT_REFUSED;
  }
  for (const signal of ["SIGINT", "SIGTERM", "SIGBREAK", "SIGHUP"])
    process.on(signal, onSignal);

  const id = randomBytes(6).toString("hex");
  const ids = names(id);
  const facts = [];
  let code;
  let verdict;
  try {
    const problem = await trial(request, password, size, ids, facts);
    code = problem === null ? EXIT_PASS : EXIT_FAIL;
    verdict = problem === null ? "PASS" : `FAIL: ${problem}`;
  } catch (error) {
    if (error instanceof Interrupted) {
      code = EXIT_INTERRUPTED;
      verdict = "FAIL: interrupted";
    } else if (error instanceof NotRun) {
      code = EXIT_NOT_RUN;
      verdict = `FAIL: ${error.message}`;
    } else {
      code = EXIT_NOT_RUN;
      verdict = "FAIL: the trial stopped on an unexpected error";
    }
  }
  if (interrupted) {
    code = EXIT_INTERRUPTED;
    verdict = "FAIL: interrupted";
  }
  const left = await cleanup(ids);
  for (const line of facts) console.log(line);
  if (left.length > 0) {
    console.log(`left behind, remove by hand: ${left.join(" ")}`);
    code = EXIT_LEFT_BEHIND;
    if (verdict === "PASS")
      verdict = "FAIL: the container or a volume could not be removed";
  }
  console.log(verdict);
  return code;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exitCode = await run(process.argv.slice(2));
}
