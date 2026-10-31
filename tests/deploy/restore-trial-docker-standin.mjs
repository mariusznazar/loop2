import childProcess from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { syncBuiltinESMExports } from "node:module";
import { fileURLToPath } from "node:url";

// A test-owned stand-in for the `docker` program, for the launcher's tests
// (scripts/restore-trial.mjs). One file with two roles:
//
//   node --import <this file's URL> scripts/restore-trial.mjs ...
//
// makes the launcher's `spawn` start this file in place of `docker`, on every
// platform and with no Docker installed, so the launcher runs unchanged; and
// this file, started that way, answers one docker command. It answers a trial
// that passes, and keeps the containers and volumes made so far from the calls
// it logged, so that a listing shows what was made and not removed.
//
// LOOP2_DOCKER_STANDIN is a JSON object:
//   log       the file of the calls, one JSON line each
//   fails     commands such as "volume ls" that exit 1 as if the daemon had gone
//   times     how many times each of them fails; every time when absent
//   actsFirst the failing command takes effect before it fails
//
// It proves how the launcher reacts to these answers, nothing of Docker.

const self = fileURLToPath(import.meta.url);

const image = {
  Id: "sha256:standin",
  Config: {
    Labels: {
      "org.opencontainers.image.title": "loop2",
      "org.opencontainers.image.revision": "standin",
    },
  },
};
const probeResult = {
  loginStatus: 200,
  saveStatus: 200,
  revision: 1,
  markerFound: true,
};

function loggedCalls(log) {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8")
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => JSON.parse(line));
}

// The names of a removal: its words that are no options, after the command.
function namesRemoved(call, words) {
  return call.args.slice(words).filter((word) => !word.startsWith("--"));
}

function standing(calls, made, removal, words) {
  const gone = calls
    .filter((call) => call.acted && call.command === removal)
    .flatMap((call) => namesRemoved(call, words));
  return calls
    .filter((call) => call.acted)
    .flatMap(made)
    .filter((name) => !gone.includes(name));
}

function containersMade(call) {
  if (call.command !== "run" || !call.args.includes("-d")) return [];
  return [call.args[call.args.indexOf("--name") + 1]];
}

function volumesMade(call) {
  return call.command === "volume create" ? [call.args[2]] : [];
}

async function inputSize() {
  let size = 0;
  for await (const chunk of process.stdin) size += chunk.length;
  return size;
}

async function answer(args) {
  const settings = JSON.parse(process.env.LOOP2_DOCKER_STANDIN);
  const { log, fails = [], times = Infinity, actsFirst = false } = settings;
  const command = ["image", "volume"].includes(args[0])
    ? args.slice(0, 2).join(" ")
    : args[0];
  const earlier = loggedCalls(log);
  const failedBefore = earlier.filter(
    (call) => call.command === command && call.failed,
  ).length;
  const failed = fails.includes(command) && failedBefore < times;
  const acted = !failed || actsFirst;
  appendFileSync(log, `${JSON.stringify({ command, args, failed, acted })}\n`);
  if (failed) {
    console.error("Cannot connect to the Docker daemon.");
    process.exitCode = 1;
    return;
  }
  const calls = loggedCalls(log);
  if (command === "image inspect") console.log(JSON.stringify(image));
  else if (command === "run" && !args.includes("-d"))
    console.log(String(await inputSize()));
  else if (command === "exec" && args.includes("--version"))
    console.log("v24.0.0");
  else if (command === "exec" && args.includes("-i")) {
    await inputSize();
    console.log(JSON.stringify(probeResult));
  } else if (command === "ps")
    console.log(standing(calls, containersMade, "rm", 1).join("\n"));
  else if (command === "volume ls")
    console.log(standing(calls, volumesMade, "volume rm", 2).join("\n"));
}

if (process.argv[1] === self) {
  await answer(process.argv.slice(2));
} else {
  const realSpawn = childProcess.spawn;
  childProcess.spawn = (_program, args, options) =>
    realSpawn(process.execPath, [self, ...args], options);
  syncBuiltinESMExports();
}
