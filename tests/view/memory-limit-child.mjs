// The growing process of tests/view/memory-limit.test.mjs. Its main thread
// never returns to the event loop, as in a failing comparison, and it stops
// itself at the stop it is given, so a limit that fails costs only that much.
import { writeSync } from "node:fs";
import { startMemoryLimit } from "./memory-limit.mjs";

const MIB = 1024 ** 2;
const limitBytes = Number(process.env.MEMORY_LIMIT_CHILD_LIMIT_MIB) * MIB;
const stopBytes = Number(process.env.MEMORY_LIMIT_CHILD_STOP_MIB) * MIB;

startMemoryLimit({ limitBytes });

// The pause holds the growth to about 100 MiB/s, slow enough that a thread
// still starting on a busy machine reads the memory before the stop.
const pause = new Int32Array(new SharedArrayBuffer(4));
const held = [];
while (process.memoryUsage.rss() < stopBytes) {
  held.push(Buffer.alloc(MIB, 1));
  Atomics.wait(pause, 0, 0, 10);
}
const reachedMiB = Math.round(process.memoryUsage.rss() / MIB);
writeSync(1, `child reached its own stop at ${reachedMiB} MiB\n`);
