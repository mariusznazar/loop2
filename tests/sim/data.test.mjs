import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MAPS } from '../../dist/public/sim/data/maps.js';
import { RESOURCES } from '../../dist/public/sim/data/resources.js';
import { ACTIONS } from '../../dist/public/sim/data/actions.js';
import { CONDITIONS } from '../../dist/public/sim/data/conditions.js';
import { ARCHETYPES } from '../../dist/public/sim/data/archetypes.js';
import { BALANCE, INITIAL_SEED } from '../../dist/public/sim/data/balance.js';

test('the map Las has the size, entrance, step and resources of the task', () => {
  const forest = MAPS.forest;
  assert.equal(forest.name, 'Las');
  assert.equal(forest.width, 4);
  assert.equal(forest.height, 4);
  assert.deepEqual(forest.entrance, { col: 1, row: 1 });
  assert.equal(forest.stepMinutes, 5);
  assert.deepEqual(forest.resources, [
    { id: 'stick', density: 0.7, stock: 12, renewMinutes: 30 },
    { id: 'berry', density: 0.5, stock: 8, renewMinutes: 40 },
    { id: 'moss', density: 0.4, stock: 6, renewMinutes: 60 },
    { id: 'fiber', density: 0.4, stock: 6, renewMinutes: 60 },
  ]);
});

test('every resource of the map is defined in the resource data, with name and icon', () => {
  assert.deepEqual(Object.keys(RESOURCES), ['stick', 'berry', 'moss', 'fiber']);
  assert.deepEqual(
    Object.values(RESOURCES).map(r => [r.name, r.icon]),
    [['patyk', 'wood-stick'], ['jagoda', 'berry-bush'], ['mech', 'fern'], ['włókno', 'flax']],
  );
  for (const entry of MAPS.forest.resources) assert.ok(entry.id in RESOURCES);
});

test('actions carry their labels, status texts and the fixed explore duration', () => {
  assert.deepEqual(ACTIONS.explore, { label: 'Eksploruj', status: 'Eksploruje', minutes: 20 });
  assert.deepEqual(ACTIONS.wander, { label: 'Wędruj', status: 'Wędruje', minutes: null });
  assert.deepEqual(ACTIONS.walkTo, { label: 'Idź', status: 'Idzie po', minutes: null });
});

test('conditions carry labels and the value range of hereBelow', () => {
  assert.equal(CONDITIONS.always.label, 'Zawsze');
  assert.deepEqual(CONDITIONS.hereBelow, {
    label: 'Tu leży mniej niż', unit: 'szt.', defaultValue: 1, min: 0, max: 50, step: 1,
  });
});

test('the archetype and the pace are in data', () => {
  assert.equal(ARCHETYPES.elementalMage.name, 'Mag żywiołów');
  assert.equal(BALANCE.gameMinutesPerRealSecond, 1);
  assert.equal(BALANCE.waitMinutes, 1);
  assert.equal(INITIAL_SEED, 1);
});
