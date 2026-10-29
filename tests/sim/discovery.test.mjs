// Discovery in the game minute of a map run: what a minute reveals, the Understanding growing and
// the rule written at the first chill. Expectations come from the task "odkrywanie", the vault
// file `odkrywanie_loop2.md` (D-82): To do 1 at line 16, the table of To do 2 at lines 17-26, To
// do 6 at line 36, Questions to settle 2 at line 45 and 11 at line 76, and the minutes of the
// first chill (minute 83 at 35,008 °C, minute 84 at 34,984 °C) in Context at line 99.
import assert from "node:assert/strict";
import { test } from "node:test";
import { BALANCE } from "../../dist/public/sim/data/balance.js";
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
import { sameHex, tileAt } from "../../dist/public/sim/hex.js";
import { nextRandom } from "../../dist/public/sim/random.js";
import { stepMinute } from "../../dist/public/sim/run.js";
import { programFromRules } from "./program-fixture.mjs";

const MAP_ID = Object.keys(MAPS)[0];
// A real time whose seed lays berries and moss, but no sticks, on the entrance tile.
const REAL_MS = 1760000000003;
const EXPLORE_RULE = {
  condition: { kind: "always" },
  action: { kind: "explore" },
};

// The Understanding after the first chill, from the first row of the table of To do 2.
const CHILLED = {
  actions: ["explore", "wander"],
  conditions: ["always", "temperatureBelow"],
  items: [],
  creatures: [],
};
const NOTHING = {
  actions: [],
  conditions: ["always"],
  items: [],
  creatures: [],
};
const RESOURCES = ["stick", "berry", "moss", "fiber"];

function kinds(events) {
  return events.map((event) => event.kind);
}

function discoveries(events) {
  return events.filter((event) => event.kind === "discovered");
}

// A new game with one character sent: its program is the one empty group of a new game, or `program`.
function sentNew(program) {
  let state = newGame();
  if (program) state = setProgram(state, program).state;
  state = createCharacter(state, "Ala").state;
  return send(state, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
}

// A sent game whose Understanding is `understanding`, its map run changed by `patch(run)`.
function prepared(understanding, patch) {
  const state = { ...sentNew(), understanding };
  return { ...state, run: { ...state.run, ...patch(state.run) } };
}

function onStandingTile(run, change) {
  return run.tiles.map((tile) =>
    sameHex(tile.at, run.character.at) ? { ...tile, ...change } : tile,
  );
}

// The activity `action`, ending in the next game minute.
function ending(run, action) {
  return {
    activity: { kind: "rule", ruleId: 1, action },
    startMinute: run.minute,
    endMinute: run.minute + 1,
    stepTo: null,
  };
}

// A state of the generator whose next draw is a hit of a gathering, or a miss.
function gatherRandomOf(hit) {
  for (let state = 1; ; state += 1) {
    if (nextRandom(state).value < BALANCE.gatherChance === hit) return state;
  }
}

// The span `minutes` called again after each stop at a discovery, until the character dies: the
// stops are the game's, so a test that wants the minutes past them goes on as the player does.
function toDeath(state) {
  let current = state;
  for (let calls = 0; !current.run.death; calls += 1) {
    assert.ok(calls < 100, "the character dies");
    current = advanceMinutes(current, 3000).state;
  }
  return current;
}

function explorationRule(id) {
  return { id, condition: { kind: "always" }, action: { kind: "explore" } };
}

// Task "programy-gracza", To do 11 (D-123): the rule written at the first chill goes into the copy
// the map run carries out, into its base and into program 1, the copy's program, alike.
function assertWritten(state, program) {
  assert.deepEqual(state.run.copy.program, program, "the copy");
  assert.deepEqual(state.run.copy.base, program, "the copy's base");
  assert.deepEqual(state.programs[0].program, program, "program 1");
}

test("a new game sent with its one empty group waits until the minute of the first chill, which learns Eksploruj, Wędruj and Temperatura poniżej, writes Zawsze → Eksploruj into the group Program and starts exploring in that minute", () => {
  const before = advanceMinutes(sentNew(), 83);
  assert.equal(before.state.run.minute, 83);
  assert.equal(before.state.run.body.temperature, 35.008);
  assert.deepEqual(before.state.run.current.activity, { kind: "wait" });
  assert.deepEqual(discoveries(before.events), []);
  assert.deepEqual(before.state.understanding, NOTHING);

  const chilled = advanceMinutes(before.state, 1);
  const state = chilled.state;
  assert.equal(state.run.minute, 84);
  assert.equal(state.run.body.temperature, 34.984);
  assert.deepEqual(chilled.events, [
    { kind: "activityFinished", minute: 84, activity: { kind: "wait" } },
    {
      kind: "discovered",
      minute: 84,
      actions: ["explore", "wander"],
      conditions: ["temperatureBelow"],
      items: [],
      creatures: [],
    },
    {
      kind: "activityStarted",
      minute: 84,
      activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
      stepTo: null,
    },
  ]);
  assert.deepEqual(state.understanding, CHILLED);
  assertWritten(state, {
    groups: [
      {
        id: 1,
        name: "Program",
        condition: { kind: "always" },
        rules: [explorationRule(1)],
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 2,
    nextRuleId: 2,
  });
  assert.deepEqual(state.run.current.activity, {
    kind: "rule",
    ruleId: 1,
    action: { kind: "explore" },
  });
  assert.equal(state.run.current.startMinute, 84);
  // The rule written at the first chill starts at zero and counts the firing of that minute.
  assert.deepEqual(state.ruleCounts, { 1: 1 });
});

test("the same span of minutes, however split, reaches the same game state with the same events through the first chill", () => {
  // One minute a call, up to and including the minute of the first finished exploration, 104.
  let state = sentNew();
  const reference = [];
  while (state.run.minute < 104) {
    const result = advanceMinutes(state, 1);
    state = result.state;
    reference.push(...result.events);
  }
  // A span of 100 minutes called twice stops at the first chill, 84, and goes on to 104.
  const first = advanceMinutes(sentNew(), 100);
  const second = advanceMinutes(first.state, 100);
  assert.equal(first.state.run.minute, 84);
  assert.equal(second.state.run.minute, 104);
  assert.deepEqual(second.state, state);
  assert.deepEqual([...first.events, ...second.events], reference);
  // The first chill at minute 84 and the first finished exploration at minute 104.
  assert.deepEqual(
    discoveries(reference).map((event) => event.minute),
    [84, 104],
  );
});

test("a program with no group gets the group Program with the condition Zawsze at the first chill, holding the rule", () => {
  const empty = {
    tripPlan: { take: [], bring: [] },
    groups: [],
    nextGroupId: 1,
    nextRuleId: 1,
  };
  const state = advanceMinutes(sentNew(empty), 84).state;
  assertWritten(state, {
    groups: [
      {
        id: 1,
        name: "Program",
        condition: { kind: "always" },
        rules: [explorationRule(1)],
      },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 2,
    nextRuleId: 2,
  });
  assert.deepEqual(state.ruleCounts, { 1: 1 });
});

test("the rule is appended to the first group only, after its rules, with an identity no rule or group had", () => {
  // A rule that does not hold at the first chill, so that the new rule fires.
  const idle = {
    condition: { kind: "temperatureBelow", value: 30 },
    action: { kind: "wander" },
  };
  const program = {
    groups: [
      {
        id: 4,
        name: "Zimno",
        condition: { kind: "always" },
        rules: [{ id: 6, ...idle }],
      },
      { id: 5, name: "Reszta", condition: { kind: "always" }, rules: [] },
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 9,
    nextRuleId: 12,
  };
  const state = advanceMinutes(sentNew(program), 84).state;
  assertWritten(state, {
    groups: [
      {
        id: 4,
        name: "Zimno",
        condition: { kind: "always" },
        rules: [{ id: 6, ...idle }, explorationRule(12)],
      },
      program.groups[1],
    ],
    tripPlan: { take: [], bring: [] },
    nextGroupId: 9,
    nextRuleId: 13,
  });
  // The new rule counts its firing, the old one stays at its count.
  assert.deepEqual(state.ruleCounts, { 6: 0, 12: 1 });
});

test("a second chill and the minutes after reveal nothing and write no second rule", () => {
  const first = advanceMinutes(sentNew(), 84).state;
  const later = advanceMinutes(first, 10);
  assert.deepEqual(discoveries(later.events), []);
  // Task "programy-gracza", To do 11: neither the copy nor a program gains a second rule.
  assert.deepEqual(later.state.run.copy, first.run.copy);
  assert.deepEqual(later.state.programs, first.programs);
  assert.deepEqual(later.state.understanding, CHILLED);
});

test("a chill that reveals nothing new writes no rule", () => {
  const state = advanceMinutes(sentNew(), 83).state;
  const knowing = { ...state, understanding: CHILLED };
  const result = advanceMinutes(knowing, 1);
  assert.deepEqual(discoveries(result.events), []);
  // Task "programy-gracza", To do 11: neither the copy nor a program gains a rule.
  assert.deepEqual(result.state.run.copy, state.run.copy);
  assert.deepEqual(result.state.programs, state.programs);
  assert.deepEqual(result.state.ruleCounts, {});
});

test("the first finished exploration reveals Idź, Zbierz, Tu leży mniej niż, Zapas poniżej and the items of the tile, read from the tile", () => {
  const explored = advanceMinutes(advanceMinutes(sentNew(), 84).state, 20);
  const run = explored.state.run;
  assert.equal(run.minute, 104);
  const tile = tileAt(run.tiles, run.character.at);
  assert.equal(tile.revealed, true);
  const held = RESOURCES.filter((item) => Object.hasOwn(tile.stock, item));
  assert.ok(
    held.length > 0,
    "precondition: the explored tile holds a resource",
  );
  assert.deepEqual(discoveries(explored.events), [
    {
      kind: "discovered",
      minute: 104,
      actions: ["walkTo", "gather"],
      conditions: ["hereBelow", "itemBelow"],
      items: held,
      creatures: [],
    },
  ]);
  assert.deepEqual(kinds(explored.events.slice(-4)), [
    "activityFinished",
    "tileRevealed",
    "discovered",
    "activityStarted",
  ]);
  assert.deepEqual(explored.state.understanding, {
    actions: ["explore", "wander", "walkTo", "gather"],
    conditions: ["always", "temperatureBelow", "hereBelow", "itemBelow"],
    items: held,
    creatures: [],
  });
});

test("a later revealed tile adds its new items only, and a tile of known items reveals nothing", () => {
  const understanding = {
    actions: ["explore", "wander", "walkTo", "gather"],
    conditions: ["always", "temperatureBelow", "hereBelow", "itemBelow"],
    items: ["stick"],
    creatures: [],
  };
  const exploring = (stock) =>
    prepared(understanding, (run) => ({
      tiles: onStandingTile(run, { revealed: false, stock }),
      current: ending(run, { kind: "explore" }),
    }));
  const added = advanceMinutes(exploring({ stick: 4, moss: 2, fiber: 1 }), 1);
  assert.deepEqual(discoveries(added.events), [
    {
      kind: "discovered",
      minute: 1,
      actions: [],
      conditions: [],
      items: ["moss", "fiber"],
      creatures: [],
    },
  ]);
  assert.deepEqual(added.state.understanding.items, ["stick", "moss", "fiber"]);
  const known = advanceMinutes(exploring({ stick: 4 }), 1);
  assert.deepEqual(discoveries(known.events), []);
  assert.deepEqual(known.state.understanding, understanding);
});

// The rows of the table of To do 2 after the first two, each as the finish that the row names and
// exactly what it reveals.
const ROWS = [
  {
    name: "the first gathered stick",
    prepare: (run) => ({
      tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
      gatherRandom: gatherRandomOf(true),
      current: ending(run, { kind: "gather", resource: "stick" }),
    }),
    actions: ["craftCampfire", "lightCampfire", "lightItem"],
    conditions: [],
    items: ["campfire"],
    creatures: [],
  },
  {
    name: "the first gathered berry",
    prepare: (run) => ({
      tiles: onStandingTile(run, { revealed: true, stock: { berry: 5 } }),
      gatherRandom: gatherRandomOf(true),
      current: ending(run, { kind: "gather", resource: "berry" }),
    }),
    actions: ["eat"],
    conditions: ["satietyBelow"],
    items: [],
    creatures: [],
  },
  {
    name: "the first crafted campfire",
    prepare: (run) => ({
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, stick: 6 },
      },
      current: ending(run, { kind: "craftCampfire" }),
    }),
    actions: ["walkToCampfire"],
    conditions: ["campfireLeftBelow", "awayFromCampfire"],
    items: [],
    creatures: [],
  },
  {
    name: "the first finished Zapal of a campfire",
    prepare: (run) => ({
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, stick: 2 },
      },
      campfires: [{ at: { ...run.character.at }, minutesLeft: 0 }],
      current: ending(run, { kind: "lightCampfire" }),
    }),
    actions: ["feedCampfire"],
    // Task plomyk, To do 5 (plomyk_loop2.md:22): with „Zasil — ognisko”, in one discovery line.
    conditions: ["natureEnergyBelow"],
    items: [],
    creatures: [],
  },
  {
    name: "the first finished Zapal of a stick",
    prepare: (run) => ({
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, stick: 1 },
      },
      current: ending(run, { kind: "lightItem" }),
    }),
    actions: ["feedCampfire"],
    conditions: ["natureEnergyBelow"],
    items: [],
    creatures: [],
  },
];

for (const row of ROWS) {
  test(`${row.name} reveals exactly its row of the table, between the finish and the pick`, () => {
    const result = advanceMinutes(prepared(NOTHING, row.prepare), 1);
    assert.deepEqual(discoveries(result.events), [
      {
        kind: "discovered",
        minute: 1,
        actions: row.actions,
        conditions: row.conditions,
        items: row.items,
        creatures: [],
      },
    ]);
    assert.deepEqual(result.state.understanding, {
      actions: row.actions,
      conditions: ["always", ...row.conditions],
      items: row.items,
      creatures: [],
    });
    assert.deepEqual(kinds(result.events), [
      "activityFinished",
      "discovered",
      "activityStarted",
    ]);
  });
}

test("a gathering that misses reveals nothing", () => {
  const state = prepared(NOTHING, (run) => ({
    tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
    gatherRandom: gatherRandomOf(false),
    current: ending(run, { kind: "gather", resource: "stick" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.character.backpack.stick, 0, "it missed");
  assert.deepEqual(discoveries(result.events), []);
  assert.deepEqual(result.state.understanding, NOTHING);
});

test("a lighting that takes no hold, for want of sticks, reveals nothing", () => {
  const state = prepared(NOTHING, (run) => ({
    current: ending(run, { kind: "lightItem" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.deepEqual(discoveries(result.events), []);
  assert.deepEqual(result.state.understanding, NOTHING);
});

test("a crafting that puts no campfire on the tile, for want of sticks, reveals nothing", () => {
  const state = prepared(NOTHING, (run) => ({
    current: ending(run, { kind: "craftCampfire" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.deepEqual(result.state.run.campfires, []);
  assert.deepEqual(discoveries(result.events), []);
});

test("a known item and its actions, revealed again, reveal nothing", () => {
  const known = {
    actions: ["craftCampfire", "lightCampfire", "lightItem"],
    conditions: ["always"],
    items: ["campfire"],
    creatures: [],
  };
  const state = prepared(known, (run) => ({
    tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
    gatherRandom: gatherRandomOf(true),
    current: ending(run, { kind: "gather", resource: "stick" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.character.backpack.stick, 1, "it was gathered");
  assert.deepEqual(discoveries(result.events), []);
  assert.deepEqual(result.state.understanding, known);
});

test("a gathering ending in the minute of the character's death reveals nothing, and the same gathering without death does", () => {
  const dying = (health) =>
    prepared(CHILLED, (run) => ({
      tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
      gatherRandom: gatherRandomOf(true),
      body: { temperature: 34.9, satiety: 100, health },
      current: ending(run, { kind: "gather", resource: "stick" }),
    }));
  const control = advanceMinutes(dying(50), 1);
  assert.equal(control.state.run.character.backpack.stick, 1);
  assert.deepEqual(
    discoveries(control.events).map((event) => event.actions),
    [["craftCampfire", "lightCampfire", "lightItem"]],
  );

  const dead = advanceMinutes(dying(0.2), 1);
  assert.equal(dead.state.run.death.cause, "cold");
  assert.deepEqual(kinds(dead.events), ["characterDied"]);
  assert.deepEqual(dead.state.understanding, CHILLED);
});

test("the first chill in the minute of death still reveals what the body step reveals", () => {
  const state = prepared(NOTHING, () => ({
    body: { temperature: 34.9, satiety: 100, health: 0.2 },
  }));
  const dead = advanceMinutes(state, 1);
  assert.equal(dead.state.run.death.cause, "cold");
  assert.deepEqual(kinds(dead.events), ["characterDied", "discovered"]);
  assert.deepEqual(dead.state.understanding, CHILLED);
});

test("the Understanding stands after death, Restart and Zakończ, and stands for the next character sent", () => {
  let state = setProgram(newGame(), programFromRules(EXPLORE_RULE)).state;
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, "Bartek").state;
  state = send(state, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
  const dead = toDeath(state);
  assert.ok(dead.run.death, "the character died");
  const tile = tileAt(dead.run.tiles, dead.run.character.at);
  const held = RESOURCES.filter((item) => Object.hasOwn(tile.stock, item));
  assert.ok(
    held.length > 0,
    "precondition: the explored tile holds a resource",
  );
  const learned = {
    actions: ["explore", "wander", "walkTo", "gather"],
    conditions: ["always", "temperatureBelow", "hereBelow", "itemBelow"],
    items: held,
    creatures: [],
  };
  assert.deepEqual(dead.understanding, learned);

  const restarted = restart(dead).state;
  assert.deepEqual(restarted.understanding, learned);
  // What the first run learned is known to the run started again: it explores in minute 0.
  assert.equal(restarted.run.current.activity.action.kind, "explore");
  // The program holds the rule given and the rule written at the first chill, which is a second one.
  assert.deepEqual(restarted.ruleCounts, { 1: 1, 2: 0 });

  const ended = end(restarted).state;
  assert.deepEqual(ended.understanding, learned);
  const next = send(
    ended,
    { mapId: MAP_ID, characterId: 2 },
    REAL_MS + 1,
  ).state;
  assert.deepEqual(next.understanding, learned);
  assert.equal(next.run.minute, 0);
  assert.equal(next.run.current.activity.action.kind, "explore");
  assert.deepEqual(next.ruleCounts, { 1: 1, 2: 0 });
});

test("advancing minutes through the first chill changes neither the game state given nor its program", () => {
  const state = sentNew();
  const copy = structuredClone(state);
  advanceMinutes(state, 90);
  assert.deepEqual(state, copy);
});

// To do 2, first row: the first minute in which the body temperature is below 35,0 °C. The forest
// cools a body by 0,024 °C a minute, so these bodies end the minute at 35,0 and at 34,999 °C.
test("a body temperature of exactly 35,0 °C after the minute is not a chill, one thousandth below it is", () => {
  const cooling = (temperature) =>
    prepared(NOTHING, () => ({
      body: { temperature, satiety: 100, health: 100 },
    }));
  const exactly = advanceMinutes(cooling(35.024), 1);
  assert.equal(exactly.state.run.body.temperature, 35);
  assert.deepEqual(discoveries(exactly.events), []);
  const below = advanceMinutes(cooling(35.023), 1);
  assert.equal(below.state.run.body.temperature, 34.999);
  assert.equal(discoveries(below.events).length, 1);
});

test("what the chill reveals is exactly its row, and the condition Zawsze, which nothing reveals, is not added to an Understanding that lacks it", () => {
  const state = prepared(
    { actions: [], conditions: [], items: [], creatures: [] },
    () => ({
      body: { temperature: 34.9, satiety: 100, health: 100 },
    }),
  );
  const result = advanceMinutes(state, 1);
  assert.deepEqual(result.state.understanding, {
    actions: ["explore", "wander"],
    conditions: ["temperatureBelow"],
    items: [],
    creatures: [],
  });
});

test("a revealing event reveals what of its row is still new, though its actions outnumber or equal the new items and conditions", () => {
  // Gathering a stick: only Zapal — patyk and the campfire are new, the rest of the row is known.
  const known = {
    actions: ["craftCampfire", "lightCampfire"],
    conditions: ["always"],
    items: [],
    creatures: [],
  };
  const state = prepared(known, (run) => ({
    tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
    gatherRandom: gatherRandomOf(true),
    current: ending(run, { kind: "gather", resource: "stick" }),
  }));
  const result = advanceMinutes(state, 1);
  assert.deepEqual(discoveries(result.events), [
    {
      kind: "discovered",
      minute: 1,
      actions: ["lightItem"],
      conditions: [],
      items: ["campfire"],
      creatures: [],
    },
  ]);
});

test("a map run ended in death passes no further minute at the level of the run", () => {
  const dead = toDeath(sentNew());
  assert.ok(dead.run.death, "the character died");
  // Task "programy-gracza", To do 6: the map run carries out its copy.
  assert.deepEqual(stepMinute(dead.run, MAPS[MAP_ID], dead.run.copy.program), {
    run: dead.run,
    events: [],
  });
});

// Slice 10 (O2, O3, O4, O5; task To do 5): game time stops after the whole minute of a discovery,
// in the pause of "Pauza", and the game state holds what that minute revealed until the player
// moves on. Minute 84 is the first chill (task Context, line 99); the first exploration ends at
// minute 104.
const CHILL_REVEALED = {
  actions: ["explore", "wander"],
  conditions: ["temperatureBelow"],
  items: [],
  creatures: [],
};

test("a span of minutes of a new game sent, given 100, ends at the minute of the first chill, paused, holding what the chill revealed, and called again goes on", () => {
  const first = advanceMinutes(sentNew(), 100);
  assert.equal(first.state.run.minute, 84);
  assert.equal(first.state.paused, true);
  assert.deepEqual(first.state.discovery, CHILL_REVEALED);
  assert.deepEqual(
    discoveries(first.events).map((event) => event.minute),
    [84],
  );
  // The span goes on from there, also while paused, and ends at the next discovery.
  const second = advanceMinutes(first.state, 100);
  assert.equal(second.state.run.minute, 104);
  assert.equal(second.state.paused, true);
  assert.deepEqual(
    discoveries(second.events).map((event) => event.minute),
    [104],
  );
  assert.deepEqual(second.state.discovery, {
    actions: discoveries(second.events)[0].actions,
    conditions: discoveries(second.events)[0].conditions,
    items: discoveries(second.events)[0].items,
    creatures: [],
  });
  assert.ok(second.state.discovery.actions.includes("walkTo"));
});

test("a span that meets no discovery leaves the game unpaused and holding no discovery", () => {
  const state = advanceMinutes(sentNew(), 83).state;
  assert.equal(state.paused, false);
  assert.equal(state.discovery, null);
});

test("real time passed across the first chill ends at minute 84 paused with no carry, moves nothing more until the player goes on, and going on clears the discovery", () => {
  for (const realMs of [84500, 100000]) {
    const stopped = passRealTime(sentNew(), realMs);
    assert.equal(stopped.state.run.minute, 84, `real time ${realMs}`);
    assert.equal(stopped.state.paused, true);
    assert.equal(stopped.state.realMsCarry, 0);
    assert.deepEqual(stopped.state.discovery, CHILL_REVEALED);
    const later = passRealTime(stopped.state, 5000);
    assert.deepEqual(later.state, stopped.state);
    assert.deepEqual(later.events, []);
    const resumed = setPaused(stopped.state, false).state;
    assert.equal(resumed.paused, false);
    assert.equal(resumed.discovery, null);
    assert.equal(resumed.run.minute, 84);
    assert.equal(passRealTime(resumed, 1000).state.run.minute, 85);
  }
});

test("a pause the player sets keeps what the last minute revealed, and going on clears it", () => {
  const stopped = advanceMinutes(sentNew(), 100).state;
  const pausing = setPaused(stopped, true);
  const held = pausing.state;
  assert.deepEqual(held.discovery, CHILL_REVEALED);
  assert.deepEqual(pausing.events, []);
  const resuming = setPaused(held, false);
  assert.equal(resuming.state.discovery, null);
  assert.deepEqual(resuming.events, []);
});

test("restart, end and send clear what the last minute revealed, and a new game holds none", () => {
  assert.equal(newGame().discovery, null);
  const stopped = advanceMinutes(sentNew(), 100).state;
  assert.deepEqual(stopped.discovery, CHILL_REVEALED);
  const restarted = restart(stopped).state;
  assert.equal(restarted.discovery, null);
  assert.equal(restarted.paused, false);
  const ended = end(stopped).state;
  assert.equal(ended.discovery, null);
  assert.equal(ended.paused, false);
  const next = send(ended, { mapId: MAP_ID, characterId: 1 }, REAL_MS).state;
  assert.equal(next.discovery, null);
});

test("real time passed over a minute that gave events but no discovery keeps its carry and does not pause", () => {
  const state = prepared(NOTHING, (run) => ({
    tiles: onStandingTile(run, { revealed: true, stock: { stick: 5 } }),
    gatherRandom: gatherRandomOf(false),
    current: ending(run, { kind: "gather", resource: "stick" }),
  }));
  const result = passRealTime(state, 1500);
  assert.ok(result.events.length > 0, "precondition: the minute gave events");
  assert.deepEqual(discoveries(result.events), []);
  assert.equal(result.state.run.minute, 1);
  assert.equal(result.state.realMsCarry, 500);
  assert.equal(result.state.paused, false);
  assert.equal(result.state.discovery, null);
});
