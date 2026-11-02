// Kills a test process whose memory runs away (D-268). The reading runs on a
// worker thread, because a failing comparison holds the main thread in one
// synchronous call, where no timer of its own would run, and a thread's timers
// are out of reach of the mocked timers of a case.
import { writeSync } from "node:fs";
import { isMainThread, Worker, workerData } from "node:worker_threads";

const MIB = 1024 ** 2;
// spec.md of the task logowanie-w-react, decision 9: above the 1.68 GB the whole
// Node stage peaked at, and low enough that several killed files add up safely.
const DEFAULT_LIMIT_BYTES = 2048 * MIB;
const DEFAULT_INTERVAL_MS = 100;

function limitSentence({ limitBytes, reachedBytes, file }) {
  const limitMiB = Math.round(limitBytes / MIB);
  // Upward, so a reading just past the limit never prints as the limit itself.
  const reachedMiB = Math.ceil(reachedBytes / MIB);
  return (
    `Memory limit: killed the process of ${file} at ${reachedMiB} MiB, above ` +
    `its limit of ${limitMiB} MiB; this is no flaky test and no case of the ` +
    "file will report: the likely cause is a failing comparison on a rendered " +
    "element, which Node's assert writes out whole, so look for a comparison " +
    "that takes assert from anywhere but tests/view/page-document.mjs, or " +
    "for a case that allocates without end.\n"
  );
}

function watchMemory({ limitBytes, intervalMs, file }) {
  setInterval(() => {
    const reachedBytes = process.memoryUsage.rss();
    if (reachedBytes <= limitBytes) return;
    try {
      // Straight to the descriptor: a thread's process.stderr goes through the
      // main thread, which is the one stuck.
      writeSync(2, limitSentence({ limitBytes, reachedBytes, file }));
    } finally {
      process.kill(process.pid, "SIGKILL");
    }
  }, intervalMs);
}

export function startMemoryLimit({
  limitBytes = DEFAULT_LIMIT_BYTES,
  intervalMs = DEFAULT_INTERVAL_MS,
} = {}) {
  // Read here: on a thread process.argv[1] names the thread's own script.
  const memoryLimit = { limitBytes, intervalMs, file: process.argv[1] };
  new Worker(new URL(import.meta.url), { workerData: { memoryLimit } }).unref();
}

if (!isMainThread && workerData?.memoryLimit) {
  watchMemory(workerData.memoryLimit);
}
