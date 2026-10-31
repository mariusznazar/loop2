import assert from "node:assert/strict";
import { test } from "node:test";
import {
  mixSeed,
  nextRandom,
  nextSeed,
  streamState,
} from "../../dist/public/sim/random.js";

function sequence(state, count) {
  const values = [];
  for (let i = 0; i < count; i += 1) {
    const step = nextRandom(state);
    values.push(step.value);
    state = step.state;
  }
  return values;
}

test("the same state gives the same sequence", () => {
  assert.deepEqual(sequence(12345, 50), sequence(12345, 50));
});

test("values lie in [0, 1) and the state stays a uint32", () => {
  let state = 987654321;
  for (let i = 0; i < 2000; i += 1) {
    const step = nextRandom(state);
    assert.ok(step.value >= 0 && step.value < 1);
    assert.ok(
      Number.isInteger(step.state) &&
        step.state >= 0 &&
        step.state <= 0xffffffff,
    );
    state = step.state;
  }
});

test("nextRandom does not change its input and advances the state", () => {
  const step = nextRandom(7);
  assert.notEqual(step.state, 7);
  assert.deepEqual(nextRandom(7), step);
});

test("different states give different sequences", () => {
  assert.notDeepEqual(sequence(1, 10), sequence(2, 10));
});

test("streams of one seed differ", () => {
  assert.notEqual(streamState(1, "layout"), streamState(1, "wander"));
  assert.notDeepEqual(
    sequence(streamState(1, "layout"), 10),
    sequence(streamState(1, "wander"), 10),
  );
});

test("a stream state is deterministic and changes with the seed", () => {
  assert.equal(streamState(5, "layout"), streamState(5, "layout"));
  assert.notEqual(streamState(5, "layout"), streamState(6, "layout"));
  assert.ok(Number.isInteger(streamState(5, "wander")));
});

test("mixSeed is deterministic and changes with either argument", () => {
  const base = mixSeed(1, 1000);
  assert.equal(mixSeed(1, 1000), base);
  assert.notEqual(mixSeed(2, 1000), base);
  assert.notEqual(mixSeed(1, 1001), base);
  assert.ok(Number.isInteger(base) && base >= 0 && base <= 0xffffffff);
});

test("mixSeed uses the high part of a large realMs", () => {
  assert.notEqual(mixSeed(1, 5), mixSeed(1, 5 + 2 ** 32));
});

// Adding the fifth stream, for the next seed of an earning loop (spec 5), changes no stream that
// existed: these are the states the four streams gave before it was added (an independent
// computation of the same two published hash steps), so a stream of the same seed still starts
// where it did.
test("adding the fifth stream changes no state of the four streams before it", () => {
  const before = [
    [1, "layout", 615540736],
    [1, "wander", 2190006448],
    [1, "gather", 1276593949],
    [1, "attack", 3749833116],
    [12345, "layout", 3017758333],
    [12345, "wander", 4087383320],
    [12345, "gather", 301122398],
    [12345, "attack", 3224370889],
    [4294967295, "layout", 1337064981],
    [4294967295, "wander", 4169035890],
    [4294967295, "gather", 2440979857],
    [4294967295, "attack", 938460452],
  ];
  for (const [seed, stream, state] of before)
    assert.equal(streamState(seed, stream), state, `${stream} of ${seed}`);
});

test("the fifth stream starts from the seed at a state of its own, none of the other four's", () => {
  for (const seed of [1, 12345, 4294967295]) {
    const others = ["layout", "wander", "gather", "attack"].map((stream) =>
      streamState(seed, stream),
    );
    assert.ok(!others.includes(streamState(seed, "next")));
  }
});

// The expected draws are worked out by hand-checkable steps in an independent implementation of
// mulberry32 over the fmix32 state of the stream: the first draw of the fifth stream, as a uint32.
test("the next seed is the first draw of the fifth stream of the seed, as a uint32", () => {
  assert.equal(nextSeed(1), 3392212447);
  assert.equal(nextSeed(12345), 2555624278);
  assert.equal(nextSeed(4294967295), 1338111422);
});

test("the next seed is deterministic, a uint32, differs with the seed and from the seed itself", () => {
  assert.equal(nextSeed(77), nextSeed(77));
  assert.notEqual(nextSeed(77), nextSeed(78));
  for (const seed of [0, 1, 2, 4294967295, 1946377216]) {
    const next = nextSeed(seed);
    assert.ok(Number.isInteger(next) && next >= 0 && next <= 0xffffffff);
    assert.notEqual(next, seed);
  }
});
