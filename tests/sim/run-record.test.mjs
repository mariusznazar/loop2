// The record a manual map run keeps for its end (task koniec-przejscia, To do 5, 10; D-135, D-364,
// D-212): the longest streak it reached, its game minutes by what the character was doing, and what
// the character entered with. Expectations are written out by hand from the data and the decisions:
// the cooling of Las (streak.test.mjs: no loss through game minute 83, the first chilled one is 84),
// the explore duration of 20 game minutes (data/actions.ts), the 5 game minutes of a fight
// (data/balance.ts, combatMinutes; D-71), and the items in the order of data/items.ts.
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import {
  advanceMinutes,
  createCharacter,
  restart,
  send,
  setProgram,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import { startLoop } from "../../dist/browser/sim/loop.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const ALWAYS = { kind: "always" };
const REAL_MS = 1760000000000;
const EXPLORING = programFromRules({
  condition: ALWAYS,
  action: { kind: "explore" },
});
/** On this real time the wolf attacks in Las — głębiej and the kicking mage dies in that combat (saved-game.test.mjs). */
const FIGHT_MS = 1760000000008;
const FIGHTING = programFromRules(
  { condition: ALWAYS, action: { kind: "kick" } },
  { condition: ALWAYS, action: { kind: "explore" } },
  { condition: ALWAYS, action: { kind: "gather", resource: "stick" } },
  { condition: ALWAYS, action: { kind: "wander" } },
);

/** The kinds a game minute counts to: the ordinary actions of the data, a wait and a fight. */
const OTHER_KINDS = ["wait", "combat"];

/** A game with `program`, one character, sent to `mapId`; `game` is the game it starts from. */
function sentWith(
  program,
  { game = newKnowingGame(), mapId = "forest", ms } = {},
) {
  const ready = createCharacter(setProgram(game, program).state, "Ala").state;
  return send(ready, { mapId, characterId: 1 }, ms ?? REAL_MS).state;
}

/** The sent game with the chest holding `pieces` before the send. */
function sentWithChest(program, pieces, extra = {}) {
  const game = newKnowingGame();
  return sentWith(program, {
    ...extra,
    game: {
      ...game,
      ...extra.game,
      team: { ...game.team, chest: { pieces } },
    },
  });
}

/** A program of `rule` with a take list. */
function taking(take, ...rules) {
  const program = programFromRules(...rules);
  return { ...program, tripPlan: { take, bring: [] } };
}

const sum = (minutes) => Object.values(minutes).reduce((a, b) => a + b, 0);

/** The record of a map run: its three fields. */
const recordOf = (run) => ({
  longestStreak: run.longestStreak,
  minutesByAction: run.minutesByAction,
  enteredWith: run.enteredWith,
});

/** The kinds of the minutes of `minutes`, none at 0. */
const counted = (minutes) =>
  Object.fromEntries(Object.entries(minutes).filter(([, count]) => count > 0));

test("a map run starts with a longest streak of 0 and a count of 0 game minutes for every kind of the closed list, and no more than that list", () => {
  const { run } = sentWith(EXPLORING);
  assert.equal(run.longestStreak, 0);
  const ordinary = Object.entries(ACTIONS)
    .filter(([, def]) => !("combat" in def))
    .map(([kind]) => kind);
  // The list is the data's actions that are no combat actions, a wait and a fight.
  assert.deepEqual(
    Object.keys(run.minutesByAction).sort(),
    [...ordinary, ...OTHER_KINDS].sort(),
  );
  for (const kind of ["explore", "eat", "wait", "combat"])
    assert.equal(run.minutesByAction[kind], 0, kind);
  for (const kind of ["kick", "dodge", "strikeWithStick"])
    assert.equal(Object.hasOwn(run.minutesByAction, kind), false, kind);
  assert.equal(sum(run.minutesByAction), 0);
});

test("a game minute passed counts once, to the action under way at its start, a wait to the wait", () => {
  // Explore takes 20 game minutes; the tile is revealed by then, the program has no other rule,
  // so the character waits one game minute at a time.
  const { state } = advanceMinutes(sentWith(EXPLORING), 30);
  assert.equal(state.run.minute, 30);
  assert.deepEqual(counted(state.run.minutesByAction), {
    explore: 20,
    wait: 10,
  });
});

test("the game minute of a death counts like any other, and the counts sum to the map run's game minute", () => {
  // As in streak.test.mjs: the body dies in game minute 2 of an exploration that would run to 20.
  const state = sentWith(EXPLORING);
  const dying = {
    ...state,
    run: {
      ...state.run,
      body: { temperature: 34, satiety: 50, health: 0.7 },
    },
  };
  const died = advanceMinutes(dying, 30).state;
  assert.deepEqual(died.run.death, { minute: 2, cause: "cold" });
  assert.deepEqual(counted(died.run.minutesByAction), { explore: 2 });
  assert.equal(sum(died.run.minutesByAction), died.run.minute);
});

test("the game minute of a completion counts like any other, on counts the map run already holds", () => {
  // A map run of Las at game minute 479 of an unbroken streak, after 479 minutes of exploring (a
  // state made by hand: Las cannot be survived that long by a program of one rule), whose
  // exploration ends in the next game minute.
  const state = sentWith(EXPLORING);
  const { run } = state;
  const advanced = {
    ...state,
    run: {
      ...run,
      minute: 479,
      streak: 479,
      longestStreak: 479,
      body: { temperature: 37, satiety: 100, health: 100 },
      minutesByAction: { ...run.minutesByAction, explore: 479 },
      current: {
        activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
        startMinute: 479,
        endMinute: 480,
        stepTo: null,
      },
    },
  };
  const done = advanceMinutes(advanced, 5).state;
  assert.deepEqual(done.run.completion, { minute: 480 });
  assert.equal(done.run.longestStreak, 480);
  assert.deepEqual(counted(done.run.minutesByAction), { explore: 480 });
});

test("the longest streak stays after the streak falls to 0 in the cold, and the same whichever way the span is split", () => {
  // No loss through game minute 83, so the streak is 83 there; game minute 84 is chilled.
  const whole = advanceMinutes(sentWith(EXPLORING), 90).state;
  assert.equal(whole.run.streak, 0);
  assert.equal(whole.run.longestStreak, 83);
  let split = sentWith(EXPLORING);
  for (let minute = 0; minute < 90; minute += 1)
    split = advanceMinutes(split, 1).state;
  assert.deepEqual(recordOf(split.run), recordOf(whole.run));
  const halves = advanceMinutes(
    advanceMinutes(sentWith(EXPLORING), 83).state,
    7,
  );
  assert.deepEqual(recordOf(halves.state.run), recordOf(whole.run));
  assert.equal(
    advanceMinutes(sentWith(EXPLORING), 83).state.run.longestStreak,
    83,
    "the streak at its greatest is the longest",
  );
});

test("the longest streak stays after a change of the program, and grows again once the streak passes it", () => {
  const ten = advanceMinutes(sentWith(EXPLORING), 10).state;
  assert.equal(ten.run.longestStreak, 10);
  const changed = setProgram(
    ten,
    programFromRules(
      { condition: ALWAYS, action: { kind: "explore" } },
      { condition: ALWAYS, action: { kind: "wander" } },
    ),
  ).state;
  assert.equal(changed.run.streak, 0);
  assert.equal(changed.run.longestStreak, 10, "the change leaves the record");
  const three = advanceMinutes(changed, 3).state;
  assert.equal(three.run.streak, 3);
  assert.equal(three.run.longestStreak, 10);
  const more = advanceMinutes(three, 30).state;
  assert.equal(more.run.streak, 33);
  assert.equal(more.run.longestStreak, 33);
});

/** The map run of `FIGHTING` in Las — głębiej, killed in the fight, with what a watcher saw each minute. */
function fought() {
  let state = sentWith(FIGHTING, {
    game: { ...newKnowingGame(), solvedMaps: ["forest"] },
    mapId: "forestDeep",
    ms: FIGHT_MS,
  });
  const seen = { longest: 0, attackedAt: null };
  while (!state.run.death && state.run.minute < 600) {
    const result = advanceMinutes(state, 1);
    state = result.state;
    seen.longest = Math.max(seen.longest, state.run.streak);
    for (const event of result.events)
      if (event.kind === "attacked") seen.attackedAt = event.minute;
  }
  return { state, seen };
}

test("the minutes of a fight count to the fight, the minute of the attack to what the character was doing, and the last minute of a death in the fight too", () => {
  const { state, seen } = fought();
  const { run } = state;
  // Attacked at the end of game minute A; the five game minutes of the fight are A + 1 to A + 5,
  // and the character dies in the last of them (D-71).
  assert.equal(run.death.cause, "combat");
  assert.notEqual(seen.attackedAt, null, "precondition: an attack");
  assert.equal(run.death.minute, seen.attackedAt + 5);
  assert.equal(run.minutesByAction.combat, 5);
  assert.equal(sum(run.minutesByAction), run.minute);
  assert.equal(
    sum(run.minutesByAction) - run.minutesByAction.combat,
    seen.attackedAt,
    "the minute of the attack and every minute before it count to what the character was doing",
  );
  // No kick is counted: a combat action is no ordinary action, the fight is.
  assert.equal(Object.hasOwn(run.minutesByAction, "kick"), false);
  // The counts of this map run, written down from one run of it and checked by hand where the rule
  // gives a figure: the game minutes up to and including the attack, 39 + 5 + 170, make the attack
  // minute 214, and the fight adds its 5 to the death at 219.
  assert.deepEqual(counted(run.minutesByAction), {
    explore: 39,
    wander: 5,
    gather: 170,
    combat: 5,
  });
  assert.equal(seen.attackedAt, 214);
  assert.equal(run.minute, 219);
  assert.equal(run.longestStreak, 33);
  assert.equal(run.longestStreak, seen.longest);
});

test("a span split into any calls of the simulation gives the same record, a fight included", () => {
  const { state: reference } = fought();
  assert.equal(
    reference.run.minutesByAction.combat,
    5,
    "precondition: a fight",
  );
  const start = sentWith(FIGHTING, {
    game: { ...newKnowingGame(), solvedMaps: ["forest"] },
    mapId: "forestDeep",
    ms: FIGHT_MS,
  });
  const whole = advanceMinutes(start, 600).state;
  assert.deepEqual(recordOf(whole.run), recordOf(reference.run));
  for (const size of [7, 50, 213]) {
    let split = start;
    while (!split.run.death) split = advanceMinutes(split, size).state;
    assert.deepEqual(recordOf(split.run), recordOf(reference.run), `${size}`);
  }
});

test("settling the death leaves the record as it is, and so does editing the program", () => {
  const { state } = fought();
  const settled = settleDeath(state, FIGHT_MS).state;
  assert.notEqual(settled.run.deathSettlement, null);
  assert.deepEqual(recordOf(settled.run), recordOf(state.run));
  const edited = setProgram(settled, EXPLORING).state;
  assert.deepEqual(recordOf(edited.run), recordOf(state.run));
});

test("a map run entered with what the send took from the chest keeps it, in the order of the data's items, none at 0, whatever the take list's order", () => {
  // The take list names berries first; the chest holds 12 sticks and 12 berries, the backpack takes
  // 15 pieces, so 10 berries and 5 sticks. Moss is not asked for.
  const state = sentWithChest(
    taking(
      [
        { item: "berry", count: 10 },
        { item: "stick", count: 10 },
      ],
      { condition: ALWAYS, action: { kind: "explore" } },
    ),
    { stick: 12, berry: 12, moss: 3 },
  );
  assert.deepEqual(state.team.chest.pieces, { stick: 7, berry: 2, moss: 3 });
  assert.deepEqual(state.run.enteredWith, [
    { item: "stick", count: 5 },
    { item: "berry", count: 10 },
  ]);
});

test("a map run entered with an empty backpack keeps an empty list", () => {
  assert.deepEqual(sentWith(EXPLORING).run.enteredWith, []);
  // A take list the chest cannot serve takes nothing.
  const state = sentWithChest(
    taking([{ item: "stick", count: 4 }], {
      condition: ALWAYS,
      action: { kind: "explore" },
    }),
    {},
  );
  assert.deepEqual(state.run.enteredWith, []);
});

test("a map run of a solved map keeps what it took from nowhere, and the chest stays as it was", () => {
  const state = sentWithChest(
    taking([{ item: "stick", count: 4 }], {
      condition: ALWAYS,
      action: { kind: "explore" },
    }),
    {},
    { game: { solvedMaps: ["forest"] } },
  );
  assert.equal(state.run.solvedMapRun, true);
  assert.deepEqual(state.team.chest.pieces, {});
  assert.deepEqual(state.run.enteredWith, [{ item: "stick", count: 4 }]);
});

test("what the character entered with stays to the end, though the backpack empties", () => {
  const state = sentWithChest(
    taking([{ item: "berry", count: 3 }], {
      condition: ALWAYS,
      action: { kind: "eat" },
    }),
    { berry: 10 },
  );
  const later = advanceMinutes(state, 12).state;
  assert.ok(later.run.character.backpack.berry < 3, "precondition: eaten");
  assert.deepEqual(later.run.enteredWith, [{ item: "berry", count: 3 }]);
});

test("a restart binds the record anew: the entry list from the copy and the chest as they stand, the longest streak and the counts from 0", () => {
  const state = sentWithChest(
    taking([{ item: "stick", count: 4 }], {
      condition: ALWAYS,
      action: { kind: "explore" },
    }),
    { stick: 10 },
  );
  const later = advanceMinutes(state, 25).state;
  assert.equal(later.run.longestStreak, 25);
  assert.deepEqual(later.run.enteredWith, [{ item: "stick", count: 4 }]);
  // The player lowers the take list of the copy; the next start takes that many from what is left.
  const lowered = setProgram(
    later,
    taking([{ item: "stick", count: 2 }], {
      condition: ALWAYS,
      action: { kind: "explore" },
    }),
  ).state;
  assert.equal(lowered.run.longestStreak, 25);
  const again = restart(lowered).state;
  assert.deepEqual(again.run.enteredWith, [{ item: "stick", count: 2 }]);
  assert.deepEqual(again.team.chest.pieces, { stick: 4 });
  assert.equal(again.run.longestStreak, 0);
  assert.equal(sum(again.run.minutesByAction), 0);
});

test("a map run of an earning loop keeps none of the record", () => {
  const game = { ...newKnowingGame(), solvedMaps: ["forest"] };
  const ready = createCharacter(setProgram(game, EXPLORING).state, "Ala").state;
  const looping = startLoop(
    ready,
    { mapId: "forest", characterId: 1 },
    REAL_MS,
  );
  const { run } = looping.state.loops[1];
  assert.equal(run.mapId, "forest", "precondition: the loop started");
  for (const key of ["longestStreak", "minutesByAction", "enteredWith"])
    assert.equal(Object.hasOwn(run, key), false, key);
});
