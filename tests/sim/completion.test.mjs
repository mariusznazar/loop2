// The completion of a map run: when the streak reaches the solving condition of the map, the rest of
// that game minute takes effect, no program rule is picked and the map run ends, solving its map.
// The solving condition of a map and the streak follow D-136, the last steps of a game minute D-71,
// the screen after a completion D-132, the solved map D-134 and the counts of the rules D-93; a
// completion in the game minute of a discovery is D-122. The streak of 480 is the solving condition
// of Las (D-133), a streak of 479 stands one game minute short of it.
// The renewal of the team's resurrection at a first completion of a map follows D-190, its settling D-221.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  canSendMap,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  resurrectionReady,
  send,
  setProgram,
  settleCompletion,
  settleDeath,
} from "../../dist/browser/sim/game.js";
import { sameHex } from "../../dist/browser/sim/hex.js";
import {
  meetsSolving,
  solvingRequirements,
} from "../../dist/browser/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame, withEdgeSolved } from "./understanding-fixture.mjs";

const mapId = "forest";
const SENT = { mapId, characterId: 1 };
const REAL_MS = 1760000000000;
const EXPLORING = programFromRules({
  condition: { kind: "always" },
  action: { kind: "explore" },
});
const EXPLORE = { kind: "explore" };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };

/** A game sent to Las with a program that explores; the map run stands at minute 0. */
function sent(game = withEdgeSolved(newKnowingGame())) {
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
  // decision: D-71 "Outside combat a game minute takes effect in this order"
  // decision: D-136 "A streak counts the successive game minutes in which the character loses no health to cold or hunger: a game minute with such a loss sets it to zero"
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
  assert.deepEqual(result.state.solvedMaps, ["forestEdge", mapId]);
});

test("a streak of 478 completes nothing in the next minute and the pick goes on", () => {
  // decision: D-136 "A streak counts the successive game minutes in which the character loses no health to cold or hunger: a game minute with such a loss sets it to zero"
  const state = { ...oneShort(), run: { ...oneShort().run, streak: 478 } };
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.streak, 479);
  assert.equal(result.state.run.completion, null);
  assert.deepEqual(result.state.solvedMaps, ["forestEdge"]);
  assert.ok(kinds(result.events).includes("activityStarted"));
});

test("a minute of loss from a streak of 479 does not complete", () => {
  // decision: D-136 "A streak counts the successive game minutes in which the character loses no health to cold or hunger: a game minute with such a loss sets it to zero"
  const state = withRun({
    body: { temperature: 34.99, satiety: 100, health: 100 },
    streak: 479,
  });
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.streak, 0);
  assert.equal(result.state.run.completion, null);
  assert.deepEqual(result.state.solvedMaps, ["forestEdge"]);
});

test("a new game and a new map run hold no completion and no solved map", () => {
  assert.deepEqual(newGame().solvedMaps, []);
  assert.equal(sent().run.completion, null);
});

test("a map run that has completed passes no further game minute, by span or by real time", () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run"
  const done = advanceMinutes(oneShort(), 1).state;
  const again = advanceMinutes(done, 10);
  assert.deepEqual(again.state, done);
  assert.deepEqual(again.events, []);
  const timed = passRealTime(done, 60000);
  assert.deepEqual(timed.state, done);
  assert.deepEqual(timed.events, []);
});

test("real time that ends in a completion stops there and drops the whole carry", () => {
  // decision: D-132 "After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run"
  const state = { ...oneShort(), realMsCarry: 400 };
  const result = passRealTime(state, 5600);
  assert.equal(result.state.run.minute, 1);
  assert.deepEqual(result.state.run.completion, { minute: 1 });
  assert.equal(result.state.realMsCarry, 0);
  assert.equal(result.events.at(-1).kind, "mapRunCompleted");
  assert.equal(result.state.paused, false);
});

test("the completion in the minute of a discovery leaves the state holding the discovery, not paused", () => {
  // decision: D-122 "Where the map run ends in a completion or a character's death in the game minute of a discovery, the end-of-run window (D-368) takes the place of the pause and names that discovery"
  const unknowing = {
    ...withEdgeSolved(newGame()),
    understanding: {
      actions: [],
      conditions: ["always"],
      items: [],
      trees: [],
      creatures: [],
    },
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
    trees: result.events[found].trees,
    creatures: [],
  });
  const revealed = result.events[found];
  for (const kind of ["actions", "conditions", "items"])
    for (const entry of revealed[kind])
      assert.ok(result.state.understanding[kind].includes(entry), entry);
  assert.deepEqual(result.state.solvedMaps, ["forestEdge", mapId]);
});

test("a map solved stays solved, once, through restart, end, send and a later death", () => {
  // decision: D-134 "From the first completion of a map by any of the player's characters, the list and the card on the screen Mapy show that map as „rozwiązana”"
  const solved = advanceMinutes(oneShort(), 1).state;
  assert.deepEqual(restart(solved).state.solvedMaps, ["forestEdge", mapId]);
  const ended = end(solved).state;
  assert.deepEqual(ended.solvedMaps, ["forestEdge", mapId]);
  assert.deepEqual(send(ended, SENT, REAL_MS).state.solvedMaps, [
    "forestEdge",
    mapId,
  ]);

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
  assert.deepEqual(advanceMinutes(again, 1).state.solvedMaps, [
    "forestEdge",
    mapId,
  ]);

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
  assert.deepEqual(died.solvedMaps, ["forestEdge", mapId]);
});

test("restart after a completion keeps the seed and starts with a streak of 0 and no completion", () => {
  // decision: D-132 "„Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death"
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
  // decision: D-93 "Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to"
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

test("solving requirements present in data are all required and absent ones are ignored", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  const deep = MAPS.forestDeep;
  const run = {
    ...sent().run,
    mapId: "forestDeep",
    streak: 539,
    defeatedAttacks: 1,
  };
  assert.equal(meetsSolving(run, deep), false);
  assert.equal(meetsSolving({ ...run, streak: 540 }, deep), false);
  assert.equal(meetsSolving({ ...run, defeatedAttacks: 2 }, deep), false);
  assert.equal(
    meetsSolving({ ...run, streak: 540, defeatedAttacks: 2 }, deep),
    true,
  );
  assert.equal(
    meetsSolving(
      { ...run, defeatedAttacks: 1 },
      { ...deep, solving: { defeatedAttacks: 2 } },
    ),
    false,
  );
  assert.equal(
    meetsSolving(
      { ...run, defeatedAttacks: 2 },
      { ...deep, solving: { defeatedAttacks: 2 } },
    ),
    true,
  );
  assert.equal(meetsSolving({ ...run, streak: 480 }, MAPS.forest), true);
});

test("Las gives the one requirement it has, the streak, with the count of the map run, met only at the number required", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  const run = sent().run;
  assert.deepEqual(solvingRequirements({ ...run, streak: 120 }, MAPS.forest), [
    { kind: "streak", count: 120, required: 480, met: false },
  ]);
  assert.deepEqual(solvingRequirements({ ...run, streak: 479 }, MAPS.forest), [
    { kind: "streak", count: 479, required: 480, met: false },
  ]);
  assert.deepEqual(solvingRequirements({ ...run, streak: 480 }, MAPS.forest), [
    { kind: "streak", count: 480, required: 480, met: true },
  ]);
});

test("Las - deeper gives both requirements, the streak first and the beaten attacks second, each met on its own", () => {
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  // decision: D-133 "A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`"
  const run = { ...sent().run, mapId: "forestDeep" };
  const deep = MAPS.forestDeep;
  assert.deepEqual(
    solvingRequirements({ ...run, streak: 540, defeatedAttacks: 1 }, deep),
    [
      { kind: "streak", count: 540, required: 540, met: true },
      { kind: "defeatedAttacks", count: 1, required: 2, met: false },
    ],
  );
  assert.deepEqual(
    solvingRequirements({ ...run, streak: 120, defeatedAttacks: 2 }, deep),
    [
      { kind: "streak", count: 120, required: 540, met: false },
      { kind: "defeatedAttacks", count: 2, required: 2, met: true },
    ],
  );
});

test("a requirement the data of the map leaves out is not given, and the other one stands alone", () => {
  // decision: D-18 "The game's content — game maps, items, creatures, character skills and their numbers — stands in data files"
  // decision: D-133 "During a map run the header shows a bar with numbers for the requirements present in the map's solving condition: „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten attacks, in that order when both are present"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  const run = {
    ...sent().run,
    mapId: "forestDeep",
    streak: 300,
    defeatedAttacks: 1,
  };
  assert.deepEqual(
    solvingRequirements(run, {
      ...MAPS.forestDeep,
      solving: { defeatedAttacks: 2 },
    }),
    [{ kind: "defeatedAttacks", count: 1, required: 2, met: false }],
  );
  assert.deepEqual(
    solvingRequirements(run, { ...MAPS.forestDeep, solving: { streak: 540 } }),
    [{ kind: "streak", count: 300, required: 540, met: false }],
  );
  assert.deepEqual(
    solvingRequirements(run, { ...MAPS.forestDeep, solving: {} }),
    [],
  );
});

test("the requirements of a map run that ended stand on the stopped minute: the streak 0 after a death of cold, the streak 480 after a completion", () => {
  // decision: D-133 "A requirement that is met shows its name, its numbers and the fill of its bar in the role `positive`, and the bar stands on the screen after the end of the map run too, on the state of its stopped game minute and with the streak as it stands then, such as „Passa 0/480” after a death of cold"
  const dying = withRun({
    body: { temperature: 34, satiety: 50, health: 0.7 },
    streak: 5,
  });
  const died = advanceMinutes(dying, 30).state.run;
  assert.equal(
    died.death.cause,
    "cold",
    "precondition: the map run ended in a death of cold",
  );
  assert.deepEqual(solvingRequirements(died, MAPS.forest), [
    { kind: "streak", count: 0, required: 480, met: false },
  ]);

  const solved = advanceMinutes(oneShort(), 1).state.run;
  assert.deepEqual(solvingRequirements(solved, MAPS.forest), [
    { kind: "streak", count: 480, required: 480, met: true },
  ]);
});

test("solvingRequirements changes neither the map run nor the map", () => {
  const run = {
    ...sent().run,
    mapId: "forestDeep",
    streak: 200,
    defeatedAttacks: 1,
  };
  const map = {
    ...MAPS.forestDeep,
    solving: { streak: 540, defeatedAttacks: 2 },
  };
  const runBefore = structuredClone(run);
  const mapBefore = structuredClone(map);
  const given = solvingRequirements(run, map);
  given[0].count = 999;
  assert.deepEqual(run, runBefore);
  assert.deepEqual(map, mapBefore);
});

test("a map is sendable only after each map it opens after is solved", () => {
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-388 "Las is a grid of 4 × 4 tiles"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  // decision: D-149 "The same availability determined from the game’s solved maps governs sending in the simulation, and a map that requires an unsolved opening map refuses a send"
  assert.deepEqual(canSendMap([], "forestEdge"), true);
  assert.deepEqual(canSendMap([], "forest"), false);
  assert.deepEqual(canSendMap([], "forestDeep"), false);
  assert.deepEqual(canSendMap(["forestEdge"], "forest"), true);
  assert.deepEqual(canSendMap(["forestEdge"], "forestDeep"), false);
  assert.deepEqual(canSendMap(["forestEdge", "forest"], "forestDeep"), true);
  for (const unavailable of ["forest", "forestDeep"]) {
    assert.throws(
      () =>
        send(
          createCharacter(newGame(), "Ala").state,
          { mapId: unavailable, characterId: 1 },
          REAL_MS,
        ),
      /not available/,
    );
  }
});

test("completing Skraj lasu solves it alone and opens Las, which a send then reaches", () => {
  // decision: D-397 "A new game opens the map Skraj lasu, and solving it opens Las"
  // decision: D-398 "Skraj lasu is a grid of 4 × 4 tiles with its entrance fixed at column 1, row 1"
  // decision: D-136 "The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, alone or together — and a map opens when the map its data names as its opener is solved"
  // decision: D-149 "The same availability determined from the game’s solved maps governs sending in the simulation, and a map that requires an unsolved opening map refuses a send"
  const ready = createCharacter(
    setProgram(newKnowingGame(), EXPLORING).state,
    "Ala",
  ).state;
  const edge = send(
    ready,
    { mapId: "forestEdge", characterId: 1 },
    REAL_MS,
  ).state;
  const state = {
    ...edge,
    run: {
      ...edge.run,
      body: { ...HEALTHY },
      streak: 479,
      current: endingNext(edge.run),
    },
  };
  assert.deepEqual(state.solvedMaps, []);
  const done = advanceMinutes(state, 1).state;
  assert.deepEqual(done.run.completion, { minute: 1 });
  assert.deepEqual(done.solvedMaps, ["forestEdge"]);
  const onLas = send(end(done).state, SENT, REAL_MS).state;
  assert.equal(onLas.run.mapId, "forest");
});

test("an actual program edit resets the streak and defeated attacks; cold loss keeps defeated attacks", () => {
  // decision: D-131 "Of the edits of the copy a map run carries out, an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero"
  // decision: D-131 "A map run starts with zero beaten attacks, and a game minute with health lost to cold or hunger leaves their count as it stands"
  // decision: D-136 "A streak counts the successive game minutes in which the character loses no health to cold or hunger: a game minute with such a loss sets it to zero"
  const prepared = {
    ...end(sent()).state,
    solvedMaps: ["forest"],
  };
  const deeper = send(
    prepared,
    { mapId: "forestDeep", characterId: 1 },
    REAL_MS,
  ).state;
  const progressed = {
    ...deeper,
    run: {
      ...deeper.run,
      streak: 120,
      defeatedAttacks: 1,
      body: { ...HEALTHY, temperature: 34.99 },
    },
  };
  const changed = setProgram(
    progressed,
    programFromRules({
      condition: { kind: "always" },
      action: { kind: "wander" },
    }),
  ).state;
  assert.equal(changed.run.streak, 0);
  assert.equal(changed.run.defeatedAttacks, 0);

  const lostHealth = advanceMinutes(progressed, 1).state;
  assert.equal(lostHealth.run.streak, 0);
  assert.equal(lostHealth.run.defeatedAttacks, 1);
});

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The renewal of a resurrection, 480 real minutes, in ms. */
const RENEWAL_MS = 28_800_000;

/** `game` with the team's resurrection ready from the real moment `readyAtMs` on. */
const readyFrom = (game, readyAtMs) => ({
  ...game,
  team: { ...game.team, resurrectionReadyAtMs: readyAtMs },
});

/** A map run one game minute short of completing Las, in a game whose resurrection is ready from `readyAtMs`, completed. */
function completedWith(readyAtMs, game = withEdgeSolved(newKnowingGame())) {
  return advanceMinutes(oneShort(readyFrom(game, readyAtMs)), 5).state;
}

// D-190: a first completion of a map renews a used-up resurrection of the team, and leaves a ready one.
// invariant: resurrection-renewal
test("the first completion of a map makes a used-up resurrection of the team ready at the moment of the reading", () => {
  const done = completedWith(T0 + RENEWAL_MS);
  assert.equal(
    done.run.completionSettlement,
    null,
    "game time settles nothing",
  );
  assert.equal(done.team.resurrectionReadyAtMs, T0 + RENEWAL_MS);
  const settled = settleCompletion(done, T0).state;
  assert.deepEqual(settled.run.completionSettlement, {
    kind: "resurrectionRenewed",
  });
  assert.equal(settled.team.resurrectionReadyAtMs, T0);
  assert.equal(resurrectionReady(settled.team, T0), true);
  assert.deepEqual(settled.team.characters, done.team.characters);
  assert.deepEqual(settled.solvedMaps, done.solvedMaps);
});

// D-190: a ready resurrection stays ready.
test("the first completion of a map leaves a ready resurrection as it was, ready from the moment it was, and says so", () => {
  for (const readyAtMs of [0, T0 - 1, T0, -3_000]) {
    const done = completedWith(readyAtMs);
    const settled = settleCompletion(done, T0).state;
    assert.deepEqual(
      settled.run.completionSettlement,
      { kind: "resurrectionReady" },
      `ready from ${readyAtMs}`,
    );
    assert.equal(settled.team.resurrectionReadyAtMs, readyAtMs);
  }
  const notYet = settleCompletion(completedWith(T0 + 1), T0).state;
  assert.equal(notYet.run.completionSettlement.kind, "resurrectionRenewed");
});

// D-190: once per map, for a success.
// invariant: resurrection-renewal
test("the completion of a map the account had solved before renews nothing, whatever the resurrection", () => {
  const solved = {
    ...withEdgeSolved(newKnowingGame()),
    solvedMaps: ["forestEdge", "forest"],
  };
  const done = completedWith(T0 + RENEWAL_MS, solved);
  assert.equal(done.run.solvedMapRun, true);
  assert.equal(done.run.completion.minute, 1);
  const result = settleCompletion(done, T0);
  assert.equal(result.state, done);
  assert.equal(result.state.team.resurrectionReadyAtMs, T0 + RENEWAL_MS);
});

// D-190: the second solving of one map, by a restart of its completion, renews nothing either.
test("a restart after a first completion starts a map run of a solved map, whose completion renews nothing", () => {
  // decision: D-214 "A map run restart after the completion that solved the map is such a run: it takes its equipment from nowhere and pays nothing"
  const settled = settleCompletion(completedWith(T0 + RENEWAL_MS), T0).state;
  const restarted = restart(settled).state;
  assert.equal(restarted.run.solvedMapRun, true);
  assert.equal(restarted.run.completionSettlement, null);
  const used = {
    ...restarted,
    team: { ...restarted.team, resurrectionReadyAtMs: T0 + RENEWAL_MS },
  };
  const again = advanceMinutes(
    {
      ...used,
      run: {
        ...used.run,
        body: { ...HEALTHY },
        streak: 479,
        current: endingNext(used.run),
      },
    },
    5,
  ).state;
  assert.ok(again.run.completion);
  assert.equal(settleCompletion(again, T0 + 1).state, again);
});

// D-221 in step: a completion is settled once, and a resurrection used up afterwards is not renewed by the screen standing on.
// invariant: resurrection-renewal
test("a completion settled is not settled again, even when the resurrection is used up while the screen stands", () => {
  const settled = settleCompletion(completedWith(0), T0).state;
  const used = {
    ...settled,
    team: { ...settled.team, resurrectionReadyAtMs: T0 + RENEWAL_MS },
  };
  const later = settleCompletion(used, T0 + 1);
  assert.equal(later.state, used);
  assert.deepEqual(later.events, []);
  assert.equal(later.state.run.completionSettlement.kind, "resurrectionReady");
});

// D-386: where there is nothing to settle the moment is not looked at; one to settle is a safe integer.
test("a completion to settle takes a safe integer moment, and nothing else to settle reads none", () => {
  const done = completedWith(T0 + RENEWAL_MS);
  for (const nowMs of [
    Number.NaN,
    Infinity,
    1.5,
    2 ** 53,
    -(2 ** 53),
    "1",
    undefined,
    null,
  ])
    assert.throws(() => settleCompletion(done, nowMs), RangeError, `${nowMs}`);
  const going = sent();
  const dead = advanceMinutes(
    send(
      createCharacter(withEdgeSolved(newKnowingGame()), "Ala").state,
      SENT,
      REAL_MS,
    ).state,
    1000,
  ).state;
  assert.ok(dead.run.death);
  for (const state of [newGame(), end(going).state, going, dead])
    for (const nowMs of [T0, Number.NaN, undefined]) {
      const result = settleCompletion(state, nowMs);
      assert.equal(result.state, state);
      assert.deepEqual(result.events, []);
    }
  const before = structuredClone(done);
  settleCompletion(done, T0);
  assert.deepEqual(done, before);
  // A death is the other settling: it leaves the completion's line out and the other way round.
  assert.equal(settleDeath(done, T0).state, done);
});

// D-386: a device clock set before 1970 reads below zero, and the moment is stored as it is.
test("a first completion at a moment below zero makes the used-up resurrection ready at that moment", () => {
  const settled = settleCompletion(completedWith(RENEWAL_MS), -5_000).state;
  assert.equal(settled.team.resurrectionReadyAtMs, -5_000);
  assert.equal(settled.run.completionSettlement.kind, "resurrectionRenewed");
});
