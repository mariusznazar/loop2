// The program editor's commit rules (spec section 5, program panel; choice C12): pure functions,
// tested without a browser. Importing the module must not touch the DOM.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ACTIONS } from '../../dist/public/sim/data/actions.js';
import { ARCHETYPES } from '../../dist/public/sim/data/archetypes.js';
import { CONDITIONS } from '../../dist/public/sim/data/conditions.js';
import { MAPS } from '../../dist/public/sim/data/maps.js';
import { newGame, send, setProgram } from '../../dist/public/sim/game.js';
import {
  addRule,
  focusAfter,
  moveRule,
  offeredResources,
  readNumberField,
  removeRule,
  withActionKind,
  withActionResource,
  withConditionKind,
  withConditionResource,
  withConditionValue,
} from '../../dist/public/view/program-editor.js';

const SENT = { mapId: Object.keys(MAPS)[0], archetypeId: Object.keys(ARCHETYPES)[0] };
const LAS = ['stick', 'berry', 'moss', 'fiber'];
const ALWAYS_EXPLORE = { condition: { kind: 'always' }, action: { kind: 'explore' } };
const BELOW_WANDER = { condition: { kind: 'hereBelow', resource: 'berry', value: 4 }, action: { kind: 'wander' } };
const ALWAYS_WALK = { condition: { kind: 'always' }, action: { kind: 'walkTo', resource: 'moss' } };
const THREE = { rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK] };

/** A deep copy, to show that an edit leaves its input as it was. */
const copy = value => JSON.parse(JSON.stringify(value));

test('importing the editor touches no DOM: Node has no document and the import succeeded', () => {
  assert.equal(typeof globalThis.document, 'undefined');
  assert.equal(typeof addRule, 'function');
});

test('the number field: empty or not a number keeps the previous value and commits nothing', () => {
  for (const text of ['', '   ', 'abc', '12abc', 'Infinity', '-Infinity', 'NaN']) {
    assert.deepEqual(readNumberField(text, 7), { value: 7, commit: false }, JSON.stringify(text));
  }
});

test('the number field: a number is rounded to a whole number and committed when it differs', () => {
  assert.deepEqual(readNumberField('12', 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField(' 12 ', 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField('12.4', 1), { value: 12, commit: true });
  assert.deepEqual(readNumberField('12.5', 1), { value: 13, commit: true });
  assert.deepEqual(readNumberField('0', 1), { value: 0, commit: true });
});

test('the number field: a number is clamped to the data\'s range 0–50', () => {
  assert.equal(CONDITIONS.hereBelow.min, 0);
  assert.equal(CONDITIONS.hereBelow.max, 50);
  assert.deepEqual(readNumberField('51', 1), { value: 50, commit: true });
  assert.deepEqual(readNumberField('999', 1), { value: 50, commit: true });
  assert.deepEqual(readNumberField('-3', 1), { value: 0, commit: true });
  assert.deepEqual(readNumberField('-0.4', 1), { value: 0, commit: true });
  assert.ok(Object.is(readNumberField('-0.4', 1).value, 0), 'a rounded -0 is written back as 0');
});

test('the number field: the same value after rounding or clamping is written back but not committed', () => {
  assert.deepEqual(readNumberField('12', 12), { value: 12, commit: false });
  assert.deepEqual(readNumberField('11.6', 12), { value: 12, commit: false });
  assert.deepEqual(readNumberField('80', 50), { value: 50, commit: false });
});

test('„Dodaj regułę” appends „Zawsze → Eksploruj”', () => {
  assert.deepEqual(addRule({ rules: [] }), { rules: [ALWAYS_EXPLORE] });
  const before = copy(THREE);
  assert.deepEqual(addRule(THREE), { rules: [ALWAYS_EXPLORE, BELOW_WANDER, ALWAYS_WALK, ALWAYS_EXPLORE] });
  assert.deepEqual(THREE, before);
});

test('„Usuń” removes the rule at its position', () => {
  assert.deepEqual(removeRule(THREE, 1), { rules: [ALWAYS_EXPLORE, ALWAYS_WALK] });
  assert.deepEqual(removeRule(THREE, 2), { rules: [ALWAYS_EXPLORE, BELOW_WANDER] });
  assert.deepEqual(removeRule({ rules: [ALWAYS_WALK] }, 0), { rules: [] });
});

test('„↑” and „↓” swap a rule with its neighbour; past either end nothing is committed', () => {
  const before = copy(THREE);
  assert.deepEqual(moveRule(THREE, 1, -1), { rules: [BELOW_WANDER, ALWAYS_EXPLORE, ALWAYS_WALK] });
  assert.deepEqual(moveRule(THREE, 1, 1), { rules: [ALWAYS_EXPLORE, ALWAYS_WALK, BELOW_WANDER] });
  assert.equal(moveRule(THREE, 0, -1), null);
  assert.equal(moveRule(THREE, 2, 1), null);
  assert.deepEqual(THREE, before);
});

test('switching the condition to „Tu leży mniej niż” takes the map\'s first resource and the data\'s default N', () => {
  assert.deepEqual(withConditionKind(THREE, 0, 'hereBelow', LAS).rules[0],
    { condition: { kind: 'hereBelow', resource: 'stick', value: 1 }, action: { kind: 'explore' } });
  assert.deepEqual(withConditionKind(THREE, 0, 'hereBelow', ['moss', 'stick']).rules[0].condition,
    { kind: 'hereBelow', resource: 'moss', value: 1 });
});

test('switching the condition to „Zawsze” drops its resource and number; the same kind commits nothing', () => {
  assert.deepEqual(withConditionKind(THREE, 1, 'always', LAS).rules[1],
    { condition: { kind: 'always' }, action: { kind: 'wander' } });
  assert.equal(withConditionKind(THREE, 1, 'hereBelow', LAS), null);
  assert.equal(withConditionKind(THREE, 0, 'always', LAS), null);
});

test('switching the action to „Idź” takes the map\'s first resource; other kinds carry none', () => {
  assert.deepEqual(withActionKind(THREE, 0, 'walkTo', LAS).rules[0],
    { condition: { kind: 'always' }, action: { kind: 'walkTo', resource: 'stick' } });
  assert.deepEqual(withActionKind(THREE, 2, 'wander', LAS).rules[2].action, { kind: 'wander' });
  assert.deepEqual(withActionKind(THREE, 2, 'explore', LAS).rules[2].action, { kind: 'explore' });
  assert.equal(withActionKind(THREE, 2, 'walkTo', LAS), null);
  assert.equal(withActionKind(THREE, 0, 'explore', LAS), null);
});

test('choosing a resource or a number changes only that rule; the same choice commits nothing', () => {
  const before = copy(THREE);
  assert.deepEqual(withConditionResource(THREE, 1, 'fiber'),
    { rules: [ALWAYS_EXPLORE, { ...BELOW_WANDER, condition: { kind: 'hereBelow', resource: 'fiber', value: 4 } }, ALWAYS_WALK] });
  assert.deepEqual(withConditionValue(THREE, 1, 12).rules[1].condition, { kind: 'hereBelow', resource: 'berry', value: 12 });
  assert.deepEqual(withActionResource(THREE, 2, 'stick').rules[2].action, { kind: 'walkTo', resource: 'stick' });
  assert.equal(withConditionResource(THREE, 1, 'berry'), null);
  assert.equal(withConditionValue(THREE, 1, 4), null);
  assert.equal(withActionResource(THREE, 2, 'moss'), null);
  assert.deepEqual(THREE, before);
});

test('the resource lists offer the shown map\'s resources before sending and the run\'s map\'s during a run, in order', () => {
  const game = newGame();
  assert.deepEqual(offeredResources(game), LAS);
  const running = send(game, SENT, 1760000000000).state;
  assert.deepEqual(offeredResources(running), LAS);
});

test('focus after a structural edit: same button in the moved rule\'s row, next „Usuń” or „Dodaj regułę”, new condition', () => {
  assert.deepEqual(focusAfter('up', 2, 3), { row: 1, control: 'up' });
  assert.deepEqual(focusAfter('down', 0, 3), { row: 1, control: 'down' });
  assert.deepEqual(focusAfter('remove', 1, 2), { row: 1, control: 'remove' });
  assert.deepEqual(focusAfter('remove', 2, 2), { control: 'add' });
  assert.deepEqual(focusAfter('remove', 0, 0), { control: 'add' });
  assert.deepEqual(focusAfter('add', 3, 4), { row: 3, control: 'condition' });
});

test('every program the editor builds passes setProgram, before sending and during a run', () => {
  const resources = offeredResources(newGame());
  const conditionKinds = Object.keys(CONDITIONS);
  const actionKinds = Object.keys(ACTIONS);
  assert.deepEqual(conditionKinds, ['always', 'hereBelow']);
  assert.deepEqual(actionKinds, ['explore', 'wander', 'walkTo']);

  // Every pair of kinds, every resource in every slot, and the number at its ends and outside them.
  let program = { rules: [] };
  const built = [];
  const keep = next => {
    if (next) {
      program = next;
      built.push(next);
    }
  };
  for (const conditionKind of conditionKinds) {
    for (const actionKind of actionKinds) {
      keep(addRule(program));
      const last = program.rules.length - 1;
      keep(withConditionKind(program, last, conditionKind, resources));
      keep(withActionKind(program, last, actionKind, resources));
      for (const resource of resources) {
        if (conditionKind === 'hereBelow') keep(withConditionResource(program, last, resource));
        if (actionKind === 'walkTo') keep(withActionResource(program, last, resource));
      }
      if (conditionKind === 'hereBelow') {
        for (const text of ['0', '50', '-5', '77', '3.7', 'x']) {
          const field = readNumberField(text, program.rules[last].condition.value);
          if (field.commit) keep(withConditionValue(program, last, field.value));
        }
      }
    }
  }
  keep(moveRule(program, 0, 1));
  keep(moveRule(program, program.rules.length - 1, -1));
  keep(removeRule(program, 2));
  keep(removeRule(program, 0));
  assert.ok(built.length > 30, `only ${built.length} programs built`);

  const before = newGame();
  const during = send(newGame(), SENT, 1760000000000).state;
  for (const candidate of built) {
    for (const state of [before, during]) {
      const result = setProgram(state, candidate);
      assert.deepEqual(result.state.program, candidate);
    }
  }
});
