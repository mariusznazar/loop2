// The arrows of a rule group in the program editor (D-288), tested without a browser. Importing the
// module must not touch the DOM. The header of a rule group draws them; its cases stand here.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  groupArrows,
  moveGroup,
} from "../../dist/browser/view/program-editor.js";

const RULE = (id) => ({
  id,
  condition: { kind: "always" },
  action: { kind: "explore" },
});

const GROUP = (id, rules) => ({
  id,
  name: `Grupa ${id}`,
  condition: { kind: "always" },
  rules,
});

const THREE = {
  groups: [GROUP(1, [RULE(1)]), GROUP(2, [RULE(2)]), GROUP(3, [RULE(3)])],
  nextGroupId: 4,
  nextRuleId: 4,
};

const order = (program) => program.groups.map((group) => group.id);

test("„↓” moves a group one place down, and the group keeps its rules and name", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  const moved = moveGroup(THREE, 0, 1);
  assert.deepEqual(order(moved), [2, 1, 3]);
  assert.deepEqual(moved.groups[1], THREE.groups[0]);
});

test("„↑” moves a group one place up, and the group keeps its rules and name", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  const moved = moveGroup(THREE, 1, -1);
  assert.deepEqual(order(moved), [2, 1, 3]);
  assert.deepEqual(moved.groups[0], THREE.groups[1]);
});

test("„↑” on the first group and „↓” on the last are off: moveGroup gives none", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  assert.equal(moveGroup(THREE, 0, -1), null);
  assert.equal(moveGroup(THREE, 2, 1), null);
});

test("a group with no rules moves one place like any other", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  const program = {
    groups: [GROUP(1, [RULE(1)]), GROUP(2, []), GROUP(3, [RULE(3)])],
    nextGroupId: 4,
    nextRuleId: 4,
  };
  assert.deepEqual(order(moveGroup(program, 1, -1)), [2, 1, 3]);
  assert.deepEqual(order(moveGroup(program, 1, 1)), [1, 3, 2]);
});

test("an index the program does not hold moves nothing", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  assert.equal(moveGroup(THREE, -1, 1), null);
  assert.equal(moveGroup(THREE, 3, -1), null);
});

test("a move leaves the program it was given as it was", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  const before = structuredClone(THREE);
  moveGroup(THREE, 0, 1);
  assert.deepEqual(THREE, before);
});

test("the first group has no „↑” and the last no „↓”; a middle group has both", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  assert.deepEqual(groupArrows(THREE, 0), { up: false, down: true });
  assert.deepEqual(groupArrows(THREE, 1), { up: true, down: true });
  assert.deepEqual(groupArrows(THREE, 2), { up: true, down: false });
});

test("the only group of a program has neither arrow", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  const one = { groups: [GROUP(1, [RULE(1)])], nextGroupId: 2, nextRuleId: 2 };
  assert.deepEqual(groupArrows(one, 0), { up: false, down: false });
});

test("a group index the program does not hold has neither arrow", () => {
  // decision: D-288 "Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle"
  assert.deepEqual(groupArrows(THREE, 3), { up: false, down: false });
  assert.deepEqual(groupArrows(THREE, -1), { up: false, down: false });
});
