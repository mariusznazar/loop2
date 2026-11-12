// The parts of the rows „Teraz” and „Potem” of the screen of a map run (D-334, D-335, D-291, D-292), from what `nowAndNext` names and the program of the copy. The input is
// written out by hand, so each case states the words it expects (D-73) and does not run the
// simulation; the function of the simulation has its own cases in tests/sim/rule-signs.test.mjs.
import assert from "node:assert/strict";
import { test } from "node:test";
import { NEXT_LABEL, nowRows } from "../../dist/browser/view/now-lines.js";

const ALWAYS = { kind: "always" };
const STICK = { kind: "gather", resource: "stick" };
const EXPLORE = { kind: "explore" };
const KICK = { kind: "kick" };

/**
 * A program of two groups whose rule ids do not follow their places: rule 9 is the first of the
 * second group, rule 3 the third of the first.
 */
const PROGRAM = {
  groups: [
    {
      id: 1,
      name: "Pierwsza",
      condition: ALWAYS,
      rules: [
        { id: 5, condition: ALWAYS, action: EXPLORE },
        { id: 6, condition: ALWAYS, action: KICK },
        { id: 3, condition: ALWAYS, action: EXPLORE },
      ],
    },
    {
      id: 2,
      name: "Druga",
      condition: ALWAYS,
      rules: [{ id: 9, condition: ALWAYS, action: STICK }],
    },
  ],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 3,
  nextRuleId: 10,
};

const NO_NEXT = { kind: "none" };
const NEXT_9 = { kind: "rule", ruleId: 9, action: STICK };

const nowOf = (now, next = NO_NEXT) => nowRows({ now, next }, PROGRAM).now;
const nextOf = (next, now = { kind: "wait" }) =>
  nowRows({ now, next }, PROGRAM).next;

// Catches a number counted from the rule's id and not from its place in the program, the words of the
// header („Zbiera: patyk”) in place of the words of the rule's row, a missing icon, or minutes written
// without "z" the whole.
test("Teraz names an action under way with the icon of the action, the words of the rule's row and, at the right, the rule's number as the editor numbers it and the minutes", () => {
  const row = nowOf({
    kind: "action",
    ruleId: 9,
    action: STICK,
    minutesLeft: 3,
    minutes: 5,
  });
  assert.deepEqual(row, {
    icon: "grab",
    text: "Zbierz — Patyk",
    role: "text",
    right: "reguła 2.1 · zostało 3 z 5 min",
  });
  const third = nowOf({
    kind: "action",
    ruleId: 3,
    action: EXPLORE,
    minutesLeft: 20,
    minutes: 20,
  });
  assert.equal(third.right, "reguła 1.3 · zostało 20 z 20 min");
  assert.equal(third.text, "Eksploruj");
  assert.equal(third.icon, "binoculars");
});

// Catches a number or the minutes left out of the right-hand text, or the rule that is gone from the
// copy making the whole row fail: the copy can lose the rule while its action goes on.
test("Teraz keeps the minutes of an action whose rule the copy no longer holds, and names no rule", () => {
  const row = nowOf({
    kind: "action",
    ruleId: 99,
    action: STICK,
    minutesLeft: 3,
    minutes: 5,
  });
  assert.equal(row.text, "Zbierz — Patyk");
  assert.equal(row.right, "zostało 3 z 5 min");
});

// Catches a wait with an icon, a rule or minutes beside it.
test("Teraz names a wait by the words of the game and nothing at its right", () => {
  assert.deepEqual(nowOf({ kind: "wait" }), {
    icon: null,
    text: "Czeka — żadna reguła nie pasuje",
    role: "text",
    right: null,
  });
});

// Catches an icon, a rule's number or minutes beside the fight, or the creature in the wrong case.
test("Teraz in the minutes of an attack says the fight alone, with the creature in the case of „z”", () => {
  assert.deepEqual(nowOf({ kind: "combat", creatureId: "wolf" }), {
    icon: null,
    text: "Walczy z wilkiem",
    role: "text",
    right: null,
  });
});

// Catches a cause worded alike for two deaths, or a cause in a signal role (D-334: not `danger`).
test("Teraz after a death says its cause in the role text, for each of the three causes", () => {
  const said = ["cold", "hunger", "combat"].map((cause) => {
    const row = nowOf({ kind: "death", cause });
    assert.equal(row.role, "text", cause);
    assert.equal(row.icon, null, cause);
    assert.equal(row.right, null, cause);
    return row.text;
  });
  assert.deepEqual(said, [
    "Mag zamarzł",
    "Mag umarł z głodu",
    "Mag zginął w walce",
  ]);
});

// Catches a completion text of the code and not of the map, or a completion not in `positive`.
test("Teraz after a completion says the text of the map in the role positive", () => {
  assert.deepEqual(
    nowOf({ kind: "completion", text: "Las — głębiej rozwiązany" }),
    {
      icon: null,
      text: "Las — głębiej rozwiązany",
      role: "positive",
      right: null,
    },
  );
});

// Catches a label other than „Potem”, an icon of the target in place of the action, or a number that
// does not follow the editor's.
test("Potem names the rule that wins with its icon, the words of its row and, at the right, its number", () => {
  assert.equal(NEXT_LABEL, "Potem");
  assert.deepEqual(nextOf(NEXT_9), {
    icon: "grab",
    text: "Zbierz — Patyk",
    role: "text",
    right: "reguła 2.1",
  });
  assert.deepEqual(nextOf({ kind: "rule", ruleId: 6, action: KICK }), {
    icon: "boot-kick",
    text: "Kopnij",
    role: "text",
    right: "reguła 1.2",
  });
});

// Catches the line of no winner in a role other than `warning` (D-335: not `danger`), or with an
// icon or a number.
test("Potem with no winning rule says the character will stand, in the role warning", () => {
  assert.deepEqual(nextOf(NO_NEXT), {
    icon: null,
    text: "żadna reguła nie pasuje — postać stanie",
    role: "warning",
    right: null,
  });
});

// Catches a Potem that follows Teraz, or goes empty, after an end: it is drawn from its own part.
test("Potem does not depend on what Teraz says: after a death it still names the winning rule", () => {
  const rows = nowRows(
    { now: { kind: "death", cause: "cold" }, next: NEXT_9 },
    PROGRAM,
  );
  assert.equal(rows.now.text, "Mag zamarzł");
  assert.equal(rows.next.text, "Zbierz — Patyk");
  assert.equal(rows.next.right, "reguła 2.1");
});
