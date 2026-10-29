import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceMinutes, createCharacter, end, restart, send, setPaused, setProgram } from '../../../../dist/public/sim/game.js';
import { chooseCombatRule } from '../../../../dist/public/sim/program.js';
import { MAPS } from '../../../../dist/public/sim/data/maps.js';
import { newKnowingGame } from '../../../../tests/sim/understanding-fixture.mjs';
import { programFromRules } from '../../../../tests/sim/program-fixture.mjs';

const ALWAYS = { kind: 'always' };
const KICK = programFromRules({ condition: ALWAYS, action: { kind: 'kick' } });
function prepared() {
  const game = setProgram(createCharacter({ ...newKnowingGame(), solvedMaps: ['forest'] }, 'Test').state, KICK).state;
  const state = send(game, { mapId: 'forestDeep', characterId: 1 }, 1000).state;
  return { ...state, run: { ...state.run, minute: 180, attackRandom: 35, current: {
    activity: { kind: 'rule', ruleId: 1, action: { kind: 'explore' } },
    startMinute: 175, endMinute: 195, stepTo: null,
  } } };
}

test('review probe: false combat groups and rules fall through independently', () => {
  const run = prepared().run;
  const program = { groups: [
    { id: 1, name: 'False group', condition: { kind: 'healthBelow', value: 50 }, rules: [{ id: 1, condition: ALWAYS, action: { kind: 'dodge' } }] },
    { id: 2, name: 'Fallback', condition: ALWAYS, rules: [
      { id: 2, condition: { kind: 'opponentHealthBelow', value: 10 }, action: { kind: 'dodge' } },
      { id: 3, condition: ALWAYS, action: { kind: 'kick' } },
    ] },
  ], nextGroupId: 3, nextRuleId: 4 };
  assert.equal(chooseCombatRule(run, MAPS.forestDeep, program, 93, 24).id, 3);
  assert.equal(chooseCombatRule(run, MAPS.forestDeep, program, 49, 24).id, 1);
  assert.equal(chooseCombatRule(run, MAPS.forestDeep, program, 93, 9).id, 2);
});

test('review probe: actual first discovery persists and next attack does not rediscover', () => {
  const state = prepared();
  state.understanding.creatures = [];
  const first = advanceMinutes(state, 1).state;
  assert.deepEqual(first.understanding.creatures, ['wolf']);
  assert.deepEqual(restart(first).state.understanding.creatures, ['wolf']);
  assert.deepEqual(end(first).state.understanding.creatures, ['wolf']);
  const resolved = advanceMinutes(setPaused(first, false).state, 5).state;
  assert.equal(resolved.run.body.health, 58);
  const eligible = { ...resolved, run: { ...resolved.run, minute: 366, attackRandom: 35, current: null } };
  const again = advanceMinutes(eligible, 1);
  assert.ok(again.events.some(event => event.kind === 'attacked'));
  assert.ok(!again.events.some(event => event.kind === 'discovered'));
  assert.equal(again.state.paused, false);
});

function drive(state, sizes) {
  const events = [];
  for (const size of sizes) {
    const result = advanceMinutes(state, size);
    state = result.state;
    events.push(...result.events);
    if (result.events.some(event => event.kind === 'discovered') || state.run.death || state.run.completion) break;
  }
  return { state, events };
}

test('review probe: full states and ordered events agree across combat span boundaries', () => {
  const first = prepared();
  const unknown = prepared();
  unknown.understanding.creatures = [];
  const fighting = advanceMinutes(prepared(), 1).state;
  const dies = { ...fighting, run: { ...fighting.run, body: { ...fighting.run.body, health: 1 } } };
  const early = { ...fighting, run: { ...fighting.run, streak: 538, defeatedAttacks: 2 } };
  const last = { ...fighting, run: { ...fighting.run, streak: 535, defeatedAttacks: 1 } };
  for (const [name, state] of Object.entries({ first, unknown, dies, early, last })) {
    const whole = drive(state, [10]);
    assert.deepEqual(drive(state, Array(10).fill(1)), whole, name);
    assert.deepEqual(drive(state, [2, 3, 5]), whole, name);
  }
});
