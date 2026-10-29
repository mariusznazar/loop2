/** Kinds of draw; each has its own generator, derived from the map run's seed. */
export type Stream = "layout" | "wander" | "gather" | "attack";

/** A fixed distinct constant per stream: adding a stream changes no existing one. */
const STREAM_CONSTANT: Record<Stream, number> = {
  layout: 0x4c41594f,
  wander: 0x57414e44,
  gather: 0x47415448,
  attack: 0x4154544b,
};

/** MurmurHash3's 32-bit finaliser. */
function fmix32(value: number): number {
  let h = value >>> 0;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** One mulberry32 step over a uint32 state: a value in [0, 1) and the next state. */
export function nextRandom(state: number): { value: number; state: number } {
  const next = (state + 0x6d2b79f5) >>> 0;
  let t = next;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: next };
}

/** Initial state of a stream of the map run with this seed. */
export function streamState(seed: number, stream: Stream): number {
  return fmix32(seed ^ STREAM_CONSTANT[stream]);
}

/** The seed of the next send: a pure hash of the previous seed and the real time, not a draw. */
export function mixSeed(previous: number, realMs: number): number {
  const lo = realMs % 4294967296;
  const hi = Math.floor(realMs / 4294967296);
  return fmix32(previous ^ fmix32(lo ^ fmix32(hi + 0x9e3779b9)));
}
