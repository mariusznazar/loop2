// The completion of a map run: when the streak reaches the solving condition of the map, the rest of
// that game minute takes effect, no program rule is picked and the map run ends, solving its map.
// Expectations come from the task "rozwiazanie-lasu", To do 5 and 7 and Questions to settle 6, 8,
// 15 and 17 (task.md lines 19-22, 42-50, 66-71, 75-77); the streak of 480 is the solving condition
// of Las (D-80), a streak of 479 stands one game minute short of it.
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
  setProgram,
} from "../../dist/public/sim/game.js";
import { sameHex } from "../../dist/public/sim/hex.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const [mapId] = Object.keys(MAPS);
const SENT = { mapId, characterId: 1 };
const REAL_MS = 1760000000000;
const EXPLORING = programFromRules({
  condition: { kind: "always" },
  action: { kind: "explore" },
});
const EXPLORE = { kind: "explore" };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };

/** A game sent to Las with a program that explores; the map run stands at minute 0. */
function sent(game = newKnowingGame()) {
  const ready = createCharacter(setProgram(game, EXPLORING).state, "Ala").state;
  return send(ready, SENT, REAL_MS).state;
}

/** The sent game with the fields of its map run replaced. */
function withRun(fields, game) {
  const state = sent(game);
  return { ...state, run: { ...state.run, ...fields } };
}

/** The explore activity of the map run, ending in the next game minute. */
function endingNext(run) {
  return {
    activity: { kind: "rule", ruleId: 1, action: EXPLORE },
    startMinute: run.minute,
    endMinute: run.minute + 1,
    stepTo: null,
  };
}

/** A healthy map run whose streak stands at 479 and whose exploration ends in the next minute. */
function oneShort(game) {
  const run = sent(game).run;
  return withRun(
    { body: { ...HEALTHY }, streak: 479, current: endingNext(run) },
    game,
  );
}

/** A tile that is not the character's, for a campfire burning away from it. */
function otherTile(run) {
  return run.tiles.find((tile) => !sameHex(tile.at, run.character.at)).at;
}

const kinds = (events) => events.map((event) => event.kind);

test("a map run with a streak of 479 completes at the end of the next game minute without a loss, with the rest of that minute taken effect and no program rule picked", () => {
  const before = oneShort();
  const at = otherTile(before.run);
  const state = {
    ...before,
    run: { ...before.run, campfires: [{ at, minutesLeft: 10 }] },
  };
  const result = advanceMinutes(state, 5);
  const run = result.state.run;
  assert.equal(run.minute, 1, "the span stops at the completion");
  assert.equal(run.streak, 480);
  assert.deepEqual(run.completion, { minute: 1 });
  assert.equal(run.death, null);
  assert.deepEqual(
    run.campfires,
    [{ at, minutesLeft: 9 }],
    "burning took its minute",
  );
  assert.deepEqual(
    run.current,
    before.run.current,
    "no program rule was picked",
  );
  assert.deepEqual(result.events, [
    {
      kind: "activityFinished",
      minute: 1,
      activity: before.run.current.activity,
    },
    { kind: "tileRevealed", minute: 1, at: before.run.character.at },
    { kind: "mapRunCompleted", minute: 1 },
  ]);
  assert.ok(!kinds(result.events).includes("activityStarted"));
  assert.equal(result.state.paused, false);
  assert.equal(result.state.discovery, null);
  assert.deepEqual(result.state.solvedMaps, [mapId]);
});

test("a streak of 478 completes nothing in the next minute and the pick goes on", () => {
  const state = { ...oneShort(), run: { ...oneShort().run, streak: 478 } };
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.streak, 479);
  assert.equal(result.state.run.completion, null);
  assert.deepEqual(result.state.solvedMaps, []);
  assert.ok(kinds(result.events).includes("activityStarted"));
});

test("a minute of loss from a streak of 479 does not complete", () => {
  const state = withRun({
    body: { temperature: 34.99, satiety: 100, health: 100 },
    streak: 479,
  });
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.streak, 0);
  assert.equal(result.state.run.completion, null);
  assert.deepEqual(result.state.solvedMaps, []);
});

test("a new game and a new map run hold no completion and no solved map", () => {
  assert.deepEqual(newGame().solvedMaps, []);
  assert.equal(sent().run.completion, null);
});

test("a map run that has completed passes no further game minute, by span or by real time", () => {
  const done = advanceMinutes(oneShort(), 1).state;
  const again = advanceMinutes(done, 10);
  assert.deepEqual(again.state, done);
  assert.deepEqual(again.events, []);
  const timed = passRealTime(done, 60000);
  assert.deepEqual(timed.state, done);
  assert.deepEqual(timed.events, []);
});

test("real time that ends in a completion stops there and drops the whole carry", () => {
  const state = { ...oneShort(), realMsCarry: 400 };
  const result = passRealTime(state, 5600);
  assert.equal(result.state.run.minute, 1);
  assert.deepEqual(result.state.run.completion, { minute: 1 });
  assert.equal(result.state.realMsCarry, 0);
  assert.equal(result.events.at(-1).kind, "mapRunCompleted");
  assert.equal(result.state.paused, false);
});

test("the completion in the minute of a discovery leaves the state holding the discovery, not paused", () => {
  const unknowing = {
    ...newGame(),
    understanding: { actions: [], conditions: ["always"], items: [] },
  };
  const result = advanceMinutes(oneShort(unknowing), 5);
  const found = result.events.findIndex((event) => event.kind === "discovered");
  const completed = result.events.findIndex(
    (event) => event.kind === "mapRunCompleted",
  );
  assert.ok(found >= 0, "precondition: the minute discovered something");
  assert.ok(completed > found, "the completion follows the discovery");
  assert.equal(result.events.length, completed + 1);
  assert.equal(result.state.run.minute, 1);
  assert.deepEqual(result.state.run.completion, { minute: 1 });
  assert.equal(result.state.paused, false);
  assert.deepEqual(result.state.discovery, {
    actions: result.events[found].actions,
    conditions: result.events[found].conditions,
    items: result.events[found].items,
  });
  const revealed = result.events[found];
  for (const kind of ["actions", "conditions", "items"])
    for (const entry of revealed[kind])
      assert.ok(result.state.understanding[kind].includes(entry), entry);
  assert.deepEqual(result.state.solvedMaps, [mapId]);
});

test("a map solved stays solved, once, through restart, end, send and a later death", () => {
  const solved = advanceMinutes(oneShort(), 1).state;
  assert.deepEqual(restart(solved).state.solvedMaps, [mapId]);
  const ended = end(solved).state;
  assert.deepEqual(ended.solvedMaps, [mapId]);
  assert.deepEqual(send(ended, SENT, REAL_MS).state.solvedMaps, [mapId]);

  // A later map run on the same map completes again and the map is listed once.
  const second = restart(solved).state;
  const again = {
    ...second,
    run: {
      ...second.run,
      body: { ...HEALTHY },
      streak: 479,
      current: endingNext(second.run),
    },
  };
  assert.deepEqual(advanceMinutes(again, 1).state.solvedMaps, [mapId]);

  // A later map run that ends in death leaves the map solved.
  const dying = {
    ...second,
    run: {
      ...second.run,
      body: { temperature: 34, satiety: 50, health: 0.7 },
      streak: 5,
    },
  };
  const died = advanceMinutes(dying, 30).state;
  assert.ok(died.run.death);
  assert.equal(died.run.completion, null);
  assert.deepEqual(died.solvedMaps, [mapId]);
});

test("restart after a completion keeps the seed and starts with a streak of 0 and no completion", () => {
  const solved = advanceMinutes(oneShort(), 1).state;
  const restarted = restart(solved);
  assert.equal(restarted.state.run.seed, solved.run.seed);
  assert.equal(restarted.state.run.minute, 0);
  assert.equal(restarted.state.run.streak, 0);
  assert.equal(restarted.state.run.completion, null);
  assert.equal(restarted.state.paused, false);
  assert.equal(restarted.events[0].kind, "mapRunEnded");
});

test("the counts of the rules stay after a completion, through end", () => {
  const state = oneShort();
  assert.deepEqual(state.ruleCounts, { 1: 1 });
  const solved = advanceMinutes(state, 1).state;
  assert.deepEqual(solved.ruleCounts, { 1: 1 });
  assert.deepEqual(end(solved).state.ruleCounts, { 1: 1 });
});

test("the program edited on a map run that has completed leaves its streak at 480", () => {
  const solved = advanceMinutes(oneShort(), 1).state;
  const edited = setProgram(
    solved,
    programFromRules(
      { condition: { kind: "always" }, action: { kind: "explore" } },
      { condition: { kind: "always" }, action: { kind: "wander" } },
    ),
  ).state;
  assert.equal(edited.run.streak, 480);
  assert.deepEqual(edited.run.completion, { minute: 1 });
});
