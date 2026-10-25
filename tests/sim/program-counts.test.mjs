import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";

// D-92 and D-93 (foundations/decisions.md:1619,1641): starts, not elapsed minutes,
// with independent counts attached to stable identities. Deliberately no program fixture builder.
const PROGRAM = {
  groups: [
    {
      id: 8,
      name: "Explore",
      condition: { kind: "always" },
      rules: [
        { id: 17, condition: { kind: "always" }, action: { kind: "explore" } },
      ],
    },
    {
      id: 3,
      name: "Move",
      condition: { kind: "always" },
      rules: [
        { id: 91, condition: { kind: "always" }, action: { kind: "wander" } },
      ],
    },
  ],
  nextGroupId: 9,
  nextRuleId: 92,
};
const SENT = { mapId: Object.keys(MAPS)[0], characterId: 1 };

function ready(program = PROGRAM) {
  return createCharacter(setProgram(newGame(), program).state, "Ala").state;
}

function sent(program = PROGRAM) {
  return send(ready(program), SENT, 1760000000000).state;
}

test("counts stay absent through program edits before the first send", () => {
  assert.equal(newGame().ruleCounts, null);
  assert.equal(ready().ruleCounts, null);
  assert.equal(setProgram(ready(), PROGRAM).state.ruleCounts, null);
});

test("minute zero counts once; a multi-minute action, its finish and later waits add nothing", () => {
  const program = structuredClone(PROGRAM);
  program.groups[1].condition = { kind: "satietyBelow", value: 0 };
  const start = sent(program);
  assert.deepEqual(start.ruleCounts, { 17: 1, 91: 0 });
  const before = structuredClone(start);
  const during = advanceMinutes(start, 19).state;
  assert.deepEqual(during.ruleCounts, { 17: 1, 91: 0 });
  const finished = advanceMinutes(during, 1);
  assert.equal(finished.state.run.current.activity.kind, "wait");
  assert.ok(finished.events.some((event) => event.kind === "activityFinished"));
  assert.deepEqual(finished.state.ruleCounts, { 17: 1, 91: 0 });
  assert.deepEqual(advanceMinutes(finished.state, 3).state.ruleCounts, {
    17: 1,
    91: 0,
  });
  assert.deepEqual(start, before, "counting must not mutate the input state");
});

test("an initial wait leaves every rule at zero", () => {
  const program = structuredClone(PROGRAM);
  for (const group of program.groups)
    group.condition = { kind: "satietyBelow", value: 0 };
  const start = sent(program);
  assert.equal(
    start.run.current.activity.kind,
    "wait",
    "precondition: no eligible group",
  );
  assert.deepEqual(start.ruleCounts, { 17: 0, 91: 0 });
  assert.deepEqual(advanceMinutes(start, 3).state.ruleCounts, { 17: 0, 91: 0 });
});

test("later starts count and each restart or new send resets before the minute-zero choice", () => {
  const later = advanceMinutes(sent(), 20).state;
  assert.deepEqual(later.ruleCounts, { 17: 1, 91: 1 });
  assert.deepEqual(restart(later).state.ruleCounts, { 17: 1, 91: 0 });
  const stopped = end(later).state;
  assert.deepEqual(stopped.ruleCounts, { 17: 1, 91: 1 });
  assert.deepEqual(send(stopped, SENT, 1760000123456).state.ruleCounts, {
    17: 1,
    91: 0,
  });
});

test("pause and death retain counts, including an action interrupted by death", () => {
  const start = sent();
  const paused = setPaused(start, true).state;
  assert.deepEqual(passRealTime(paused, 60000).state.ruleCounts, {
    17: 1,
    91: 0,
  });
  const dying = {
    ...start,
    run: { ...start.run, body: { temperature: 30, satiety: 0, health: 0.01 } },
  };
  const died = advanceMinutes(dying, 1);
  assert.ok(
    died.state.run.death,
    "precondition: dies before exploration finishes",
  );
  assert.equal(
    died.events.some((event) => event.kind === "activityFinished"),
    false,
  );
  assert.deepEqual(died.state.ruleCounts, { 17: 1, 91: 0 });
  assert.deepEqual(passRealTime(died.state, 60000).state.ruleCounts, {
    17: 1,
    91: 0,
  });
  assert.deepEqual(end(died.state).state.ruleCounts, { 17: 1, 91: 0 });
  assert.deepEqual(restart(died.state).state.ruleCounts, { 17: 1, 91: 0 });
});

test("identical rules count independently and keep their counts after group reorder and transfer", () => {
  const program = structuredClone(PROGRAM);
  program.groups[1].rules[0].action = { kind: "explore" };
  const start = sent(program);
  assert.deepEqual(start.ruleCounts, { 17: 1, 91: 0 });
  const reordered = { ...program, groups: [...program.groups].reverse() };
  const moved = setProgram(start, reordered).state;
  assert.deepEqual(moved.ruleCounts, { 17: 1, 91: 0 });
  assert.deepEqual(restart(moved).state.ruleCounts, { 17: 0, 91: 1 });
  const transferred = structuredClone(program);
  transferred.groups[0].rules = [];
  transferred.groups[1].rules.push(program.groups[0].rules[0]);
  transferred.groups[1].name = "Renamed";
  transferred.groups[1].condition = { kind: "satietyBelow", value: 50 };
  assert.deepEqual(setProgram(start, transferred).state.ruleCounts, {
    17: 1,
    91: 0,
  });
  const withinGroup = structuredClone(transferred);
  withinGroup.groups[1].rules.reverse();
  assert.deepEqual(
    setProgram(setProgram(start, transferred).state, withinGroup).state
      .ruleCounts,
    { 17: 1, 91: 0 },
  );
});

test("every condition/action content field resets only its edited rule, also after Stop", () => {
  const variants = [
    [
      "condition kind",
      { kind: "always" },
      { kind: "explore" },
      { kind: "awayFromCampfire" },
      { kind: "explore" },
    ],
    [
      "condition resource",
      { kind: "hereBelow", resource: "stick", value: 2 },
      { kind: "explore" },
      { kind: "hereBelow", resource: "berry", value: 2 },
      { kind: "explore" },
    ],
    [
      "condition item",
      { kind: "itemBelow", item: "stick", value: 2 },
      { kind: "explore" },
      { kind: "itemBelow", item: "berry", value: 2 },
      { kind: "explore" },
    ],
    [
      "condition number",
      { kind: "temperatureBelow", value: 36.5 },
      { kind: "explore" },
      { kind: "temperatureBelow", value: 36.6 },
      { kind: "explore" },
    ],
    [
      "action kind",
      { kind: "always" },
      { kind: "explore" },
      { kind: "always" },
      { kind: "wander" },
    ],
    [
      "action resource",
      { kind: "always" },
      { kind: "gather", resource: "stick" },
      { kind: "always" },
      { kind: "gather", resource: "berry" },
    ],
  ];
  for (const [
    label,
    condition,
    action,
    nextCondition,
    nextAction,
  ] of variants) {
    const program = structuredClone(PROGRAM);
    program.groups[0].rules[0] = { id: 17, condition, action };
    // A completed history is an explicit input to reconciliation, not an expected result
    // calculated from the implementation under test.
    const state = { ...end(sent(program)).state, ruleCounts: { 17: 4, 91: 2 } };
    const before = structuredClone(state);
    const changed = structuredClone(program);
    changed.groups[0].rules[0] = {
      id: 17,
      condition: nextCondition,
      action: nextAction,
    };
    assert.deepEqual(
      setProgram(state, changed).state.ruleCounts,
      { 17: 0, 91: 2 },
      label,
    );
    assert.deepEqual(state, before, label);
  }
});

test("canonical equivalent content preserves history despite key order, extra fields and floating rounding", () => {
  const program = structuredClone(PROGRAM);
  program.groups[0].rules[0].condition = {
    kind: "temperatureBelow",
    value: 36.6,
  };
  const state = { ...end(sent(program)).state, ruleCounts: { 17: 4, 91: 2 } };
  const equivalent = structuredClone(program);
  equivalent.groups[0].rules[0] = {
    action: { unused: true, kind: "explore" },
    condition: { value: 36.60000000000001, kind: "temperatureBelow" },
    id: 17,
  };
  assert.deepEqual(setProgram(state, equivalent).state.ruleCounts, {
    17: 4,
    91: 2,
  });
  assert.deepEqual(
    setProgram(state, structuredClone(state.program)).state.ruleCounts,
    { 17: 4, 91: 2 },
  );
});

test("deleting an active rule removes its count; adding its duplicate starts at zero and completion does not resurrect it", () => {
  const start = sent();
  const changed = structuredClone(PROGRAM);
  changed.groups[0].rules = [{ ...changed.groups[0].rules[0], id: 92 }];
  changed.nextRuleId = 93;
  const edited = setProgram(start, changed).state;
  assert.deepEqual(edited.ruleCounts, { 91: 0, 92: 0 });
  assert.equal(
    edited.run.current.activity.ruleId,
    17,
    "the already-started action is retained",
  );
  const finished = advanceMinutes(edited, 20).state;
  assert.deepEqual(finished.ruleCounts, { 91: 1, 92: 0 });
  assert.equal(
    finished.run.tiles.some((tile) => tile.revealed),
    true,
  );
});

test("editing an active rule resets it immediately and its old completion adds no count", () => {
  const start = sent();
  const changed = structuredClone(PROGRAM);
  changed.groups[0].rules[0].condition = { kind: "satietyBelow", value: 0 };
  const edited = setProgram(start, changed).state;
  assert.deepEqual(edited.ruleCounts, { 17: 0, 91: 0 });
  assert.deepEqual(advanceMinutes(edited, 20).state.ruleCounts, {
    17: 0,
    91: 1,
  });
});

test("batched, split and real-time minutes produce the same counts through later starts and death", () => {
  const start = sent();
  const batch = advanceMinutes(start, 1000).state;
  let split = start;
  for (let minute = 0; minute < 1000; minute += 1)
    split = advanceMinutes(split, 1).state;
  assert.ok(batch.run.death, "precondition: the span reaches death");
  assert.ok(
    batch.ruleCounts?.[17] > 1,
    "precondition: later exploration starts occurred",
  );
  assert.deepEqual(split.ruleCounts, batch.ruleCounts);
  assert.deepEqual(
    passRealTime(start, 1000000).state.ruleCounts,
    batch.ruleCounts,
  );
});
