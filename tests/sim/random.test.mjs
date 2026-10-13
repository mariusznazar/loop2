import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mixSeed, nextRandom, streamState } from '../../dist/public/sim/random.js';

function sequence(state, count) {
  const values = [];
  for (let i = 0; i < count; i += 1) {
    const step = nextRandom(state);
    values.push(step.value);
    state = step.state;
  }
  return values;
}

test('the same state gives the same sequence', () => {
  assert.deepEqual(sequence(12345, 50), sequence(12345, 50));
});

test('values lie in [0, 1) and the state stays a uint32', () => {
  let state = 987654321;
  for (let i = 0; i < 2000; i += 1) {
    const step = nextRandom(state);
    assert.ok(step.value >= 0 && step.value < 1);
    assert.ok(Number.isInteger(step.state) && step.state >= 0 && step.state <= 0xffffffff);
    state = step.state;
  }
});

test('nextRandom does not change its input and advances the state', () => {
  const step = nextRandom(7);
  assert.notEqual(step.state, 7);
  assert.deepEqual(nextRandom(7), step);
});

test('different states give different sequences', () => {
  assert.notDeepEqual(sequence(1, 10), sequence(2, 10));
});

test('streams of one seed differ', () => {
  assert.notEqual(streamState(1, 'layout'), streamState(1, 'wander'));
  assert.notDeepEqual(sequence(streamState(1, 'layout'), 10), sequence(streamState(1, 'wander'), 10));
});

test('a stream state is deterministic and changes with the seed', () => {
  assert.equal(streamState(5, 'layout'), streamState(5, 'layout'));
  assert.notEqual(streamState(5, 'layout'), streamState(6, 'layout'));
  assert.ok(Number.isInteger(streamState(5, 'wander')));
});

test('mixSeed is deterministic and changes with either argument', () => {
  const base = mixSeed(1, 1000);
  assert.equal(mixSeed(1, 1000), base);
  assert.notEqual(mixSeed(2, 1000), base);
  assert.notEqual(mixSeed(1, 1001), base);
  assert.ok(Number.isInteger(base) && base >= 0 && base <= 0xffffffff);
});

test('mixSeed uses the high part of a large realMs', () => {
  assert.notEqual(mixSeed(1, 5), mixSeed(1, 5 + 2 ** 32));
});
