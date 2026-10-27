import { randomBytes } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { release } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import {
  hashPassword,
  PASSWORD_HASH_PROFILE,
  PasswordCapacityError,
  verifyPassword,
} from "./passwords.js";

// Measures the production password profile and gate inside the image it runs in.
// Every password is synthetic and lives only in memory: this entrypoint opens no
// account database, reads no session secret and prints no password or hash.

const CONCURRENCY = 2;
const WARMUP_PER_KIND = 2;
const MEASURED_PER_KIND = 20;
const DEFAULT_DEADLINE_MS = 120_000;
const MAXIMUM_DEADLINE_MS = 600_000;

interface Options {
  cgroupDirectory: string;
  deadlineMs: number;
}

interface Timings {
  count: number;
  minMs: number;
  medianMs: number;
  maxMs: number;
}

class UsageError extends Error {}

function parseOptions(argv: string[]): Options {
  const options: Options = {
    cgroupDirectory: "/sys/fs/cgroup",
    deadlineMs: DEFAULT_DEADLINE_MS,
  };
  for (let index = 0; index < argv.length; index += 2) {
    const value = argv[index + 1];
    if (value === undefined)
      throw new UsageError(`${argv[index]} needs a value`);
    if (argv[index] === "--cgroup-directory") {
      options.cgroupDirectory = value;
    } else if (argv[index] === "--deadline-ms") {
      const deadline = /^\d+$/.test(value) ? Number(value) : NaN;
      if (
        !Number.isSafeInteger(deadline) ||
        deadline < 1 ||
        deadline > MAXIMUM_DEADLINE_MS
      )
        throw new UsageError(
          `--deadline-ms must be from 1 to ${MAXIMUM_DEADLINE_MS}`,
        );
      options.deadlineMs = deadline;
    } else {
      throw new UsageError(`unknown argument ${argv[index]}`);
    }
  }
  return options;
}

function syntheticPassword(): string {
  return randomBytes(24).toString("base64url");
}

async function cgroupValue(directory: string, name: string): Promise<string> {
  try {
    return (await readFile(join(directory, name), "utf8")).trim();
  } catch {
    throw new Error(`cgroup file ${name} is unavailable`);
  }
}

async function cgroupBytes(
  directory: string,
  name: string,
): Promise<number | "max"> {
  const value = await cgroupValue(directory, name);
  if (value === "max") return value;
  const bytes = /^\d+$/.test(value) ? Number(value) : NaN;
  if (!Number.isSafeInteger(bytes))
    throw new Error(`cgroup file ${name} holds no byte count`);
  return bytes;
}

async function cgroupEvents(directory: string): Promise<Map<string, number>> {
  const events = new Map<string, number>();
  for (const line of (await cgroupValue(directory, "memory.events")).split(
    "\n",
  )) {
    const [name, count] = line.trim().split(/\s+/);
    if (name && /^\d+$/.test(count ?? "")) events.set(name, Number(count));
  }
  if (!events.has("oom") || !events.has("oom_kill"))
    throw new Error("cgroup file memory.events names no oom or oom_kill count");
  return events;
}

async function optionalBytes(
  directory: string,
  name: string,
): Promise<number | "max" | null> {
  try {
    await readFile(join(directory, name));
  } catch {
    return null;
  }
  return cgroupBytes(directory, name);
}

function timings(samples: number[]): Timings {
  const sorted = [...samples].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 === 1
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  const rounded = (value: number) => Math.round(value * 10) / 10;
  return {
    count: sorted.length,
    minMs: rounded(sorted[0] ?? 0),
    medianMs: rounded(median ?? 0),
    maxMs: rounded(sorted[sorted.length - 1] ?? 0),
  };
}

async function capacityRefused(operation: Promise<unknown>): Promise<boolean> {
  try {
    await operation;
    return false;
  } catch (error) {
    return error instanceof PasswordCapacityError;
  }
}

// Two workers take hash and verify operations from one list, so two run at once.
async function concurrentRun(
  encoded: string,
  password: string,
  perKind: number,
): Promise<{
  hashMs: number[];
  verifyMs: number[];
  maxActive: number;
  totalMs: number;
}> {
  const work: ("hash" | "verify")[] = [];
  for (let index = 0; index < perKind; index += 1) work.push("hash", "verify");
  const hashMs: number[] = [];
  const verifyMs: number[] = [];
  let active = 0;
  let maxActive = 0;
  const started = performance.now();
  async function worker(): Promise<void> {
    for (let kind = work.shift(); kind; kind = work.shift()) {
      active += 1;
      maxActive = Math.max(maxActive, active);
      const begun = performance.now();
      try {
        if (kind === "hash") {
          await hashPassword(syntheticPassword());
          hashMs.push(performance.now() - begun);
        } else {
          if (!(await verifyPassword(encoded, password)))
            throw new Error("a correct password was rejected under load");
          verifyMs.push(performance.now() - begun);
        }
      } finally {
        active -= 1;
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return { hashMs, verifyMs, maxActive, totalMs: performance.now() - started };
}

async function measure(options: Options) {
  const directory = options.cgroupDirectory;
  const limitBytes = await cgroupBytes(directory, "memory.max");
  await cgroupEvents(directory);
  await cgroupBytes(directory, "memory.peak");

  const password = syntheticPassword();
  const encoded = await hashPassword(password);
  const correctAccepted = (await verifyPassword(encoded, password)) === true;
  const wrongRejected =
    (await verifyPassword(encoded, syntheticPassword())) === false;

  const first = hashPassword(syntheticPassword());
  const second = verifyPassword(encoded, password);
  const thirdRefused = await capacityRefused(hashPassword(syntheticPassword()));
  const admitted = await Promise.allSettled([first, second]);
  const releasedAfterwards = await Promise.allSettled([
    hashPassword(syntheticPassword()),
    verifyPassword(encoded, password),
  ]);

  const warmup = await concurrentRun(encoded, password, WARMUP_PER_KIND);
  const measured = await concurrentRun(encoded, password, MEASURED_PER_KIND);

  const events = await cgroupEvents(directory);
  const usage = process.resourceUsage();
  return {
    profile: {
      type: PASSWORD_HASH_PROFILE.type === 2 ? "argon2id" : "other",
      memoryCostKiB: PASSWORD_HASH_PROFILE.memoryCost,
      timeCost: PASSWORD_HASH_PROFILE.timeCost,
      parallelism: PASSWORD_HASH_PROFILE.parallelism,
      hashLength: PASSWORD_HASH_PROFILE.hashLength,
    },
    gate: {
      admittedTogether: admitted.filter((r) => r.status === "fulfilled").length,
      thirdRefused,
      bothAdmittedAfterRelease: releasedAfterwards.every(
        (r) => r.status === "fulfilled",
      ),
    },
    checks: { correctAccepted, wrongRejected },
    warmup: {
      hashes: warmup.hashMs.length,
      verifies: warmup.verifyMs.length,
    },
    measured: {
      concurrency: CONCURRENCY,
      maxActive: measured.maxActive,
      hashes: measured.hashMs.length,
      verifies: measured.verifyMs.length,
      hash: timings(measured.hashMs),
      verify: timings(measured.verifyMs),
      totalMs: Math.round(measured.totalMs),
    },
    memory: {
      cgroupLimitBytes: limitBytes,
      cgroupPeakBytes: await cgroupBytes(directory, "memory.peak"),
      cgroupCurrentBytes: await cgroupBytes(directory, "memory.current"),
      cgroupSwapLimitBytes: await optionalBytes(directory, "memory.swap.max"),
      oomEvents: events.get("oom"),
      oomKillEvents: events.get("oom_kill"),
      processMaxRssBytes: usage.maxRSS * 1024,
    },
  };
}

type Measurement = Awaited<ReturnType<typeof measure>>;

// The memory budget is judged by the launcher, which knows the deployment's limit.
function functionalErrors(result: Measurement): string[] {
  const errors: string[] = [];
  if (result.profile.type !== "argon2id")
    errors.push("the profile is not Argon2id");
  if (!result.checks.correctAccepted)
    errors.push("a correct password was rejected");
  if (!result.checks.wrongRejected)
    errors.push("a wrong password was accepted");
  if (result.gate.admittedTogether !== CONCURRENCY)
    errors.push("the gate did not admit two operations together");
  if (!result.gate.thirdRefused)
    errors.push("the gate did not refuse a third operation");
  if (!result.gate.bothAdmittedAfterRelease)
    errors.push("the gate did not admit two operations after release");
  if (
    result.measured.hashes < MEASURED_PER_KIND ||
    result.measured.verifies < MEASURED_PER_KIND
  )
    errors.push("fewer measured operations than required");
  if (result.measured.maxActive !== CONCURRENCY)
    errors.push("the measured operations did not run two at once");
  return errors;
}

function versions(): Record<string, string> {
  const require = createRequire(import.meta.url);
  const argon2 = require("argon2/package.json") as { version: string };
  return {
    node: process.versions.node,
    argon2: argon2.version,
    platform: `${process.platform}-${process.arch}`,
    kernel: release(),
  };
}

function finish(result: Record<string, unknown>, code: number): never {
  console.log(JSON.stringify(result));
  process.exit(code);
}

let options: Options;
try {
  options = parseOptions(process.argv.slice(2));
} catch (error) {
  finish(
    { ok: false, errors: [error instanceof Error ? error.message : "usage"] },
    2,
  );
}

const deadline = setTimeout(() => {
  finish(
    {
      ok: false,
      versions: versions(),
      errors: [`measurement exceeded ${options.deadlineMs} ms`],
    },
    1,
  );
}, options.deadlineMs);

try {
  const result = await measure(options);
  clearTimeout(deadline);
  const errors = functionalErrors(result);
  finish(
    { ok: errors.length === 0, versions: versions(), errors, ...result },
    errors.length === 0 ? 0 : 1,
  );
} catch (error) {
  clearTimeout(deadline);
  finish(
    {
      ok: false,
      versions: versions(),
      errors: [
        error instanceof Error ? error.message : "password measurement failed",
      ],
    },
    1,
  );
}
