// Runs the password measurement of a built loop2 image in a disposable container
// and judges it against the deployment's memory limit.
//
//   node scripts/measure-passwords.mjs --image <image id> --commit <40-hex commit> --memory 512m
//
// --memory is the deployment's limit. The container runs under 80% of it, rounded
// down to whole MiB, and passes only if the kernel never counted a hit of that
// limit or an OOM kill: then its memory stayed below 80% of the deployment's limit.
// Built-in modules only, so the server's own Node.js 20 runs it too.
//
// The docker commands go to the daemon the docker CLI is set to (DOCKER_HOST or
// its context), so the image measured is one that daemon holds. The container
// gets no network, volume, secret or environment of the application.
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { pathToFileURL } from "node:url";

// compose.yaml gives the application service mem_limit: 512m.
export const DEPLOYMENT_MEMORY_LIMIT = 512 * 1024 * 1024;
// Memory must stay below this share of the deployment's limit (spec, section 6).
export const BUDGET_FRACTION = 0.8;
export const MEASURED_PER_KIND = 20;
const ENTRYPOINT = "dist/server/measure-passwords.js";
const MIB = 1024 * 1024;
// Docker refuses a container memory limit below 6 MiB; 80% of 8 MiB rounds down to it.
const MINIMUM_MEMORY = 8 * MIB;
const COMMAND_TIMEOUT_MS = 60_000;
export const RUN_TIMEOUT_MS = 300_000;

export class UsageError extends Error {}

export function parseMemory(text) {
  const found = /^(\d+)([bkmg])?$/i.exec(text ?? "");
  if (!found) throw new UsageError("--memory must look like 512m");
  const unit = { b: 1, k: 1024, m: 1024 ** 2, g: 1024 ** 3 }[
    (found[2] ?? "b").toLowerCase()
  ];
  const bytes = Number(found[1]) * unit;
  if (!Number.isSafeInteger(bytes) || bytes < MINIMUM_MEMORY)
    throw new UsageError("--memory must be at least 8m");
  if (bytes > DEPLOYMENT_MEMORY_LIMIT)
    throw new UsageError(
      "--memory may not exceed the deployment's limit of 512m",
    );
  return bytes;
}

// The container's limit: the budget rounded down to whole MiB, which every page size
// divides, so the kernel keeps it exactly and it never exceeds the budget.
export function measurementLimit(memoryBytes) {
  return Math.floor((BUDGET_FRACTION * memoryBytes) / MIB) * MIB;
}

export function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index];
    const value = argv[index + 1];
    if (!["--image", "--commit", "--memory"].includes(name))
      throw new UsageError(`unknown argument ${name}`);
    if (value === undefined || value.startsWith("-"))
      throw new UsageError(`${name} needs a value`);
    if (name in values) throw new UsageError(`${name} given twice`);
    values[name] = value;
  }
  if (!values["--image"]) throw new UsageError("--image is required");
  if (!/^[0-9a-f]{40}$/.test(values["--commit"] ?? ""))
    throw new UsageError(
      "--commit must be 40 lowercase hexadecimal characters",
    );
  const memoryBytes = parseMemory(values["--memory"]);
  return {
    image: values["--image"],
    commit: values["--commit"],
    memoryBytes,
    limitBytes: measurementLimit(memoryBytes),
  };
}

function runDocker(args, timeout = COMMAND_TIMEOUT_MS) {
  const result = spawnSync("docker", args, {
    encoding: "utf8",
    timeout,
    maxBuffer: 4 * 1024 * 1024,
  });
  return {
    status: result.error ? null : result.status,
    stdout: result.stdout ?? "",
    stderr: result.error ? result.error.message : (result.stderr ?? ""),
  };
}

function inspected(answer) {
  if (answer.status !== 0) return null;
  try {
    const value = JSON.parse(answer.stdout);
    return Array.isArray(value) ? (value[0] ?? null) : value;
  } catch {
    return null;
  }
}

function lastJsonLine(text) {
  const lines = text.trim().split("\n").reverse();
  for (const line of lines) {
    try {
      const value = JSON.parse(line);
      if (value && typeof value === "object") return value;
    } catch {
      // Node may print warnings around the result line.
    }
  }
  return null;
}

// Each problem names a reason the measured image does not pass; none means a pass.
export function judge(request, observed) {
  const problems = [];
  const { image, container, result } = observed;
  const labels = image?.Config?.Labels ?? {};
  if (labels["org.opencontainers.image.title"] !== "loop2")
    problems.push("the image is not labelled as loop2");
  if (labels["org.opencontainers.image.revision"] !== request.commit)
    problems.push("the image's revision label is not the requested commit");
  if (!container) {
    problems.push("the measurement container could not be inspected");
  } else {
    if (container.Image !== image?.Id)
      problems.push("the container ran another image");
    if (container.HostConfig?.Memory !== request.limitBytes)
      problems.push("the container's memory limit is not the requested one");
    if (container.HostConfig?.MemorySwap !== request.limitBytes)
      problems.push("the container may use swap beyond its memory limit");
    if (container.State?.OOMKilled !== false)
      problems.push("the container was killed for lack of memory");
    if (container.RestartCount !== 0) problems.push("the container restarted");
    if (container.State?.ExitCode !== 0)
      problems.push(
        `the measurement exited with ${container.State?.ExitCode ?? "no code"}`,
      );
  }
  if (!result) {
    problems.push("the measurement printed no result");
    return problems;
  }
  for (const error of result.errors ?? []) problems.push(String(error));
  if (result.ok !== true) problems.push("the measurement reports a failure");
  // A measurement stopped early names its own reason; nothing below it was measured.
  if (result.measured === undefined) {
    problems.push("the measurement reports no measured operations");
    return problems;
  }
  if (result.profile?.type !== "argon2id")
    problems.push("the measured profile is not Argon2id");
  if (result.checks?.correctAccepted !== true)
    problems.push("a correct password was not accepted");
  if (result.checks?.wrongRejected !== true)
    problems.push("a wrong password was not rejected");
  if (
    result.gate?.admittedTogether !== 2 ||
    result.gate?.thirdRefused !== true ||
    result.gate?.bothAdmittedAfterRelease !== true
  )
    problems.push("the gate did not admit two operations and refuse a third");
  const measured = result.measured ?? {};
  if (
    !(measured.hashes >= MEASURED_PER_KIND) ||
    !(measured.verifies >= MEASURED_PER_KIND)
  )
    problems.push(
      `fewer than ${MEASURED_PER_KIND} measured hashes and verifications`,
    );
  if (measured.concurrency !== 2 || measured.maxActive !== 2)
    problems.push("the measured operations did not run two at once");
  const memory = result.memory ?? {};
  if (memory.cgroupLimitBytes !== request.limitBytes)
    problems.push("the measurement saw another memory limit");
  if (memory.cgroupSwapLimitBytes !== null && memory.cgroupSwapLimitBytes !== 0)
    problems.push("the measurement could use swap");
  // A peak, where the kernel has one, is information; the counts decide.
  if (memory.limitHitEvents !== 0)
    problems.push(
      `the container's memory reached its limit of ${request.limitBytes} bytes`,
    );
  if (memory.oomKillEvents !== 0)
    problems.push("a process of the container was killed for lack of memory");
  return problems;
}

export function measure(request, docker = runDocker) {
  const image = inspected(
    docker(["image", "inspect", "--format", "{{json .}}", request.image]),
  );
  if (!image) {
    return {
      ok: false,
      problems: ["the image cannot be inspected"],
      request,
    };
  }
  const identity = judge(request, { image, container: null, result: null })
    .filter((problem) => problem.startsWith("the image"))
    .concat(typeof image.Id === "string" ? [] : ["the image has no id"]);
  if (identity.length > 0) {
    return { ok: false, problems: identity, request, imageId: image.Id };
  }
  const name = `loop2-password-measure-${randomBytes(6).toString("hex")}`;
  const memory = String(request.limitBytes);
  let container = null;
  let output = { status: null, stdout: "", stderr: "" };
  const extra = [];
  try {
    const started = docker([
      "run",
      "--detach",
      "--name",
      name,
      "--network",
      "none",
      "--memory",
      memory,
      "--memory-swap",
      memory,
      "--restart",
      "no",
      "--read-only",
      "--cap-drop",
      "ALL",
      "--security-opt",
      "no-new-privileges",
      "--entrypoint",
      "node",
      image.Id,
      ENTRYPOINT,
    ]);
    if (started.status !== 0) {
      extra.push("the measurement container did not start");
    } else {
      const waited = docker(["wait", name], RUN_TIMEOUT_MS);
      if (waited.status !== 0) {
        docker(["kill", name]);
        extra.push(
          `the measurement did not finish within ${RUN_TIMEOUT_MS / 1000} s`,
        );
      }
      container = inspected(
        docker(["inspect", "--format", "{{json .}}", name]),
      );
      output = docker(["logs", name]);
    }
  } finally {
    docker(["rm", "--force", name]);
  }
  const result = lastJsonLine(output.stdout);
  const problems = extra.concat(judge(request, { image, container, result }));
  return {
    ok: problems.length === 0,
    problems,
    request,
    imageId: image.Id,
    container: container && {
      exitCode: container.State?.ExitCode,
      oomKilled: container.State?.OOMKilled,
      restartCount: container.RestartCount,
      memoryBytes: container.HostConfig?.Memory,
      memorySwapBytes: container.HostConfig?.MemorySwap,
    },
    result,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  let request;
  try {
    request = parseArguments(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    console.error(
      "usage: node scripts/measure-passwords.mjs --image <image id> --commit <commit> --memory 512m",
    );
    process.exit(2);
  }
  const report = measure(request);
  console.log(JSON.stringify(report, null, 2));
  console.log(report.ok ? "PASS" : `FAIL: ${report.problems.join("; ")}`);
  process.exit(report.ok ? 0 : 1);
}
