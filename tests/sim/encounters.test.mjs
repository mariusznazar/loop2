// D-71, D-140–D-147: attacks interrupt ordinary work; turns resolve at M+5,
// with frozen needs, current rules and completion after the combat result.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  passRealTime,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/public/sim/game.js";
import { newMapRun, stepMinute } from "../../dist/public/sim/run.js";
import { nextRandom } from "../../dist/public/sim/random.js";
import { statusText } from "../../dist/public/view/status-row.js";
import { terrainPicture } from "../../dist/public/view/terrain-picture.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

const ALWAYS = { kind: "always" };
const KICK = programFromRules({ condition: ALWAYS, action: { kind: "kick" } });
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };
// This real generator state draws 0.0074537..., below the map's 0.01 chance.
const HIT = 35;
function sent(program = KICK) {
  const game = setProgram(
    createCharacter({ ...newKnowingGame(), solvedMaps: ["forest"] }, "Ala")
      .state,
    program,
  ).state;
  return send(game, { mapId: "forestDeep", characterId: 1 }, 1000).state;
}

function prepared(program = KICK) {
  const state = sent(program);
  return {
    ...state,
    run: {
      ...state.run,
      minute: 180,
      attackRandom: HIT,
      current: {
        activity: { kind: "rule", ruleId: 1, action: { kind: "explore" } },
        startMinute: 175,
        endMinute: 195,
        stepTo: null,
      },
    },
  };
}

test("an eligible attack interrupts a long exploration before it finishes", () => {
  const state = prepared();
  const result = advanceMinutes(state, 1);
  assert.ok(result.events.some((event) => event.kind === "attacked"));
  assert.equal(result.state.run.current, null);
  assert.equal(result.state.run.activeCombat.attackMinute, 181);
  assert.equal(result.state.run.activeCombat.resolveMinute, 186);
  assert.ok(!result.events.some((event) => event.kind === "tileRevealed"));
});

function fighting(program = KICK, attackMinute = 181) {
  const state = prepared(program);
  const activeCombat = {
    creatureId: "wolf",
    attackMinute,
    resolveMinute: attackMinute + 5,
  };
  return {
    ...state,
    run: {
      ...state.run,
      minute: attackMinute,
      current: null,
      activeCombat,
      lastCombat: { ...activeCombat, result: null },
    },
  };
}

test("start cooldown protects minute 180 and the first draw can attack at 181", () => {
  const state = prepared();
  state.run.minute = 179;
  const protectedMinute = advanceMinutes(state, 1);
  assert.equal(protectedMinute.state.run.attackRandom, HIT);
  assert.equal(protectedMinute.state.run.activeCombat, null);
  const eligible = advanceMinutes(protectedMinute.state, 1);
  assert.equal(eligible.state.run.activeCombat.attackMinute, 181);
  assert.equal(eligible.state.run.attackRandom, 1831565848);
});

test("cooldown starts at combat end E and protects E+180, but not E+181", () => {
  const done = advanceMinutes(fighting(), 5).state;
  assert.equal(done.run.attackCooldownStart, 186);
  const state = {
    ...done,
    run: {
      ...done.run,
      minute: 365,
      body: HEALTHY,
      attackRandom: HIT,
      current: { ...prepared().run.current, endMinute: 400 },
    },
  };
  const protectedMinute = advanceMinutes(state, 1).state;
  assert.equal(protectedMinute.run.attackRandom, HIT);
  assert.equal(protectedMinute.run.activeCombat, null);
  const eligible = advanceMinutes(protectedMinute, 1).state;
  assert.equal(eligible.run.activeCombat.attackMinute, 367);
});

test("eligible misses consume one draw even inside an unfinished activity", () => {
  const state = prepared();
  state.run.attackRandom = 0;
  assert.ok(nextRandom(0).value > 0.01, "precondition: this draw misses");
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.attackRandom, 1831565813);
  assert.equal(result.state.run.activeCombat, null);
  assert.deepEqual(result.state.run.current, state.run.current);
});

test("death, completion and a map without attackers consume no attack draw", () => {
  const dying = prepared();
  dying.run.body = { temperature: 30, satiety: 0, health: 0.1 };
  const completed = prepared();
  completed.run.streak = 539;
  completed.run.defeatedAttacks = 2;
  const ordinary = prepared();
  ordinary.run.mapId = "forest";
  for (const [name, state] of [
    ["death", dying],
    ["completion", completed],
    ["no attacker", ordinary],
  ]) {
    const result = advanceMinutes(state, 1);
    assert.equal(result.state.run.attackRandom, HIT, name);
    assert.equal(result.state.run.activeCombat, null, name);
    assert.ok(!result.events.some((event) => event.kind === "attacked"), name);
  }
  assert.equal(advanceMinutes(dying, 1).state.run.death.cause, "cold");
  const ended = advanceMinutes(completed, 1).state;
  assert.deepEqual(advanceMinutes(ended, 20).state, ended);
});

test("an action ending in attack minute lands, while an interrupted move leaves no target or later movement", () => {
  const ending = prepared();
  ending.run.current.endMinute = 181;
  const landed = advanceMinutes(ending, 1);
  assert.deepEqual(
    landed.events.map((event) => event.kind),
    ["activityFinished", "tileRevealed", "attacked"],
  );
  assert.equal(
    landed.state.run.tiles.find(
      (tile) =>
        tile.at.q === ending.run.character.at.q &&
        tile.at.r === ending.run.character.at.r,
    ).revealed,
    true,
  );
  const moving = prepared();
  const target = moving.run.tiles.find(
    (tile) => tile.at.q !== moving.run.character.at.q,
  );
  moving.run.current = {
    activity: { kind: "rule", ruleId: 1, action: { kind: "wander" } },
    startMinute: 179,
    endMinute: 184,
    stepTo: target.at,
  };
  const attacked = advanceMinutes(moving, 1).state;
  assert.equal(
    terrainPicture(attacked).tiles.filter(
      (tile) => tile.outline === "stepTarget",
    ).length,
    0,
  );
  const after = advanceMinutes(attacked, 6);
  assert.deepEqual(after.state.run.character.at, moving.run.character.at);
  assert.ok(!after.events.some((event) => event.kind === "moved"));
});

test("five combat minutes freeze needs and recovery while fire, renewal and streak advance once each", () => {
  let state = fighting(KICK, 235);
  state.run.body = { temperature: 30, satiety: 0, health: 100 };
  state.run.streak = 12;
  state.run.campfires = [{ at: state.run.character.at, minutesLeft: 10 }];
  state.run.burningItems = [
    { at: state.run.character.at, item: "stick", minutesLeft: 3 },
  ];
  state.run.tiles = state.run.tiles.map((tile) => ({
    ...tile,
    stock: { stick: 0, berry: 0 },
  }));
  for (let elapsed = 1; elapsed <= 5; elapsed++) {
    state = advanceMinutes(state, 1).state;
    assert.equal(state.run.minute, 235 + elapsed);
    assert.equal(state.run.body.temperature, 30);
    assert.equal(state.run.body.satiety, 0);
    assert.equal(state.run.body.health, elapsed === 5 ? 58 : 100);
    assert.equal(state.run.streak, 12 + elapsed);
    assert.equal(state.run.campfires[0].minutesLeft, 10 - elapsed);
    assert.equal(state.run.attackRandom, HIT);
  }
  assert.equal(state.run.burningItems.length, 0);
  assert.deepEqual(state.run.tiles[0].stock, { stick: 1, berry: 1 });
  const healthy = fighting();
  healthy.run.body.health = 50;
  assert.equal(
    advanceMinutes(healthy, 4).state.run.body.health,
    50,
    "no automatic recovery",
  );
});

test("nature energy stands through the five combat minutes and comes back after them", () => {
  // Task plomyk, Q3 and To do 4 (plomyk_loop2.md in the vault, Notes/Projects/(P) Loop/_zadania,
  // lines 21 and 36): in the minutes of combat nature energy stands, as the needs and recovery do;
  // the next ordinary minute, satiety 100 falling to 99.4, gives back 0.5.
  let state = fighting(KICK, 235);
  state.run.body = { ...HEALTHY };
  state.run.natureEnergy = 50;
  for (let elapsed = 1; elapsed <= 5; elapsed++) {
    state = advanceMinutes(state, 1).state;
    assert.equal(state.run.natureEnergy, 50, `minute ${235 + elapsed}`);
  }
  assert.equal(state.run.death, null, "precondition: the mage lives on");
  assert.equal(state.run.activeCombat, null, "precondition: combat is over");
  state = advanceMinutes(state, 1).state;
  assert.equal(state.run.minute, 241);
  assert.equal(state.run.natureEnergy, 50.5);
});

test("a lighting interrupted by an attack takes neither its sticks nor its nature energy", () => {
  // Task plomyk, To do 2 (plomyk_loop2.md, line 19). Satiety 50 falls below 60, so no energy
  // comes back meanwhile and the energy shows only a payment.
  const state = prepared();
  const at = state.run.character.at;
  state.run.body = { temperature: 37, satiety: 50, health: 100 };
  state.run.natureEnergy = 50;
  state.run.campfires = [{ at: { ...at }, minutesLeft: 0 }];
  state.run.character = {
    ...state.run.character,
    backpack: { ...state.run.character.backpack, stick: 2 },
  };
  state.run.current = {
    activity: { kind: "rule", ruleId: 1, action: { kind: "lightCampfire" } },
    startMinute: 178,
    endMinute: 183,
    stepTo: null,
  };
  const attacked = advanceMinutes(state, 1).state;
  assert.equal(attacked.run.activeCombat.attackMinute, 181, "precondition");
  const after = advanceMinutes(attacked, 5).state;
  assert.equal(after.run.minute, 186);
  assert.equal(after.run.character.backpack.stick, 2);
  assert.equal(after.run.natureEnergy, 50);
  assert.deepEqual(after.run.campfires, [{ at, minutesLeft: 0 }]);
});

test("each waiting minute M+1 through M+4 can complete without turns or an invented result", () => {
  for (const offset of [1, 2, 3, 4]) {
    const state = fighting();
    state.run.streak = 540 - offset;
    state.run.defeatedAttacks = 2;
    const result = advanceMinutes(state, 5);
    assert.deepEqual(result.state.run.completion, { minute: 181 + offset });
    assert.equal(result.state.run.lastCombat.result, null);
    assert.equal(result.state.run.activeCombat, null);
    assert.equal(result.state.run.body.health, 100);
    assert.deepEqual(result.state.ruleCounts, { 1: 0 });
    assert.deepEqual(
      result.events.map((event) => event.kind),
      ["mapRunCompleted"],
    );
  }
});

test("combat death in M+5 wins over completion and keeps the streak", () => {
  const state = fighting();
  state.run.minute = 185;
  state.run.streak = 539;
  state.run.defeatedAttacks = 2;
  state.run.body.health = 7;
  const result = advanceMinutes(state, 5);
  assert.deepEqual(result.state.run.death, { minute: 186, cause: "combat" });
  assert.equal(result.state.run.completion, null);
  assert.equal(result.state.run.streak, 540);
  assert.equal(result.state.run.defeatedAttacks, 2);
  assert.deepEqual(result.state.ruleCounts, { 1: 0 });
  assert.deepEqual(
    result.events.map((event) => event.kind),
    ["combatExchange", "combatEnded", "characterDied"],
  );
});

test("M+5 starts ordinary work immediately, counts every combat action once and still shows combat", () => {
  const program = programFromRules(
    { condition: ALWAYS, action: { kind: "kick" } },
    { condition: ALWAYS, action: { kind: "wander" } },
  );
  const state = fighting(program);
  const result = advanceMinutes(state, 5);
  assert.deepEqual(result.state.ruleCounts, { 1: 8, 2: 2 }); // one move at run start, one after combat
  assert.equal(result.state.run.current.startMinute, 186);
  assert.equal(result.state.run.current.endMinute, 191);
  assert.equal(result.events.at(-2).kind, "combatEnded");
  assert.equal(result.events.at(-1).kind, "activityStarted");
  assert.match(statusText(result.state.run, false), /Walczy/);
  const next = advanceMinutes(result.state, 1).state;
  assert.equal(next.run.body.satiety, 99.4);
  assert.doesNotMatch(statusText(next.run, false), /Walczy/);
});

test("editing during the wait preserves encounter state and resolves with the newly written program", () => {
  const state = fighting();
  state.run.character.backpack.stick = 1;
  state.run.streak = 100;
  state.run.defeatedAttacks = 1;
  const waiting = advanceMinutes(state, 2).state;
  const edited = setProgram(
    waiting,
    programFromRules({
      condition: ALWAYS,
      action: { kind: "strikeWithStick" },
    }),
  ).state;
  for (const key of [
    "activeCombat",
    "lastCombat",
    "attackRandom",
    "attackCooldownStart",
  ])
    assert.deepEqual(edited.run[key], waiting.run[key]);
  assert.equal(edited.run.streak, 0);
  assert.equal(edited.run.defeatedAttacks, 0);
  const result = advanceMinutes(edited, 3).state;
  assert.equal(result.run.body.health, 79);
  assert.equal(result.run.streak, 3);
  assert.equal(result.run.defeatedAttacks, 1);
  assert.deepEqual(result.ruleCounts, { 1: 4 });
  assert.deepEqual(
    setProgram(result, KICK).state.run.lastCombat,
    result.run.lastCombat,
  );
});

test("combat filters unavailable actions and group conditions through the current repertoire", () => {
  for (const blocked of ["action", "group"]) {
    const program = programFromRules(
      { condition: ALWAYS, action: { kind: "strikeWithStick" } },
      { condition: ALWAYS, action: { kind: "kick" } },
    );
    if (blocked === "group") {
      program.groups = [
        {
          ...program.groups[0],
          condition: { kind: "healthBelow", value: 100 },
          rules: [program.groups[0].rules[0]],
        },
        {
          id: 2,
          name: "Fallback",
          condition: ALWAYS,
          rules: [program.groups[0].rules[1]],
        },
      ];
      program.nextGroupId = 3;
    }
    const state = fighting(program);
    state.run.character.backpack.stick = 1;
    if (blocked === "action")
      state.understanding.actions = state.understanding.actions.filter(
        (kind) => kind !== "strikeWithStick",
      );
    else
      state.understanding.conditions = state.understanding.conditions.filter(
        (kind) => kind !== "healthBelow",
      );
    const result = advanceMinutes(state, 5).state;
    assert.equal(result.run.body.health, 58, blocked);
    assert.deepEqual(result.ruleCounts, { 1: 0, 2: 8 }, blocked);
    assert.deepEqual(
      result.run.copy.program,
      program,
      "unavailable rules stay in the program",
    );
  }
});

test("a creature-only discovery pauses before turns and does not write a combat rule", () => {
  const state = prepared();
  state.understanding.creatures = [];
  const result = passRealTime(state, 10000);
  assert.equal(result.state.run.minute, 181);
  assert.equal(result.state.paused, true);
  assert.deepEqual(result.state.discovery, {
    actions: [],
    conditions: [],
    items: [],
    creatures: ["wolf"],
  });
  assert.deepEqual(result.state.run.copy.program, state.run.copy.program);
  assert.equal(result.state.run.lastCombat.result, null);
  assert.deepEqual(passRealTime(result.state, 10000).state, result.state);
  const resumed = setPaused(result.state, false).state;
  assert.equal(resumed.discovery, null);
  assert.deepEqual(resumed.run.lastCombat, result.state.run.lastCombat);
});

// D-118, D-119, D-143: the first attack permanently teaches the wolf, so the
// next attack must use that very knowledge, not an independently knowing game.
// Sources: foundations/decisions.md:2008, :2032, :2575.
test("the discovered wolf stays known through another attack, restart and end", () => {
  const initial = prepared();
  initial.understanding.creatures = [];
  const discovered = advanceMinutes(initial, 1).state;
  assert.deepEqual(discovered.understanding.creatures, ["wolf"]);
  const resolved = advanceMinutes(setPaused(discovered, false).state, 5).state;
  assert.equal(resolved.run.lastCombat.result.outcome, "creatureDefeated");
  assert.deepEqual(resolved.understanding.creatures, ["wolf"]);

  // Prepare only the next eligible minute and a real hit draw. Keep the
  // knowledge and completed encounter obtained above throughout this lifecycle.
  const eligible = {
    ...resolved,
    run: {
      ...resolved.run,
      minute: resolved.run.attackCooldownStart + 180,
      attackRandom: HIT,
    },
  };
  const repeated = advanceMinutes(eligible, 1);
  assert.ok(repeated.events.some((event) => event.kind === "attacked"));
  assert.ok(!repeated.events.some((event) => event.kind === "discovered"));
  assert.equal(repeated.state.paused, false);
  assert.equal(repeated.state.discovery, null);
  assert.deepEqual(repeated.state.understanding.creatures, ["wolf"]);
  const restarted = restart(repeated.state).state;
  assert.deepEqual(restarted.understanding.creatures, ["wolf"]);
  const ended = end(restarted).state;
  assert.equal(ended.run, null);
  assert.deepEqual(ended.understanding.creatures, ["wolf"]);
});

test("an ending exploration and first wolf produce one catalog-ordered discovery", () => {
  const state = prepared();
  state.understanding = {
    actions: ["explore", "wander"],
    conditions: ["always", "temperatureBelow"],
    items: [],
    creatures: [],
  };
  state.run.current.endMinute = 181;
  state.run.tiles = state.run.tiles.map((tile) => ({
    ...tile,
    stock: { stick: 1 },
  }));
  const result = advanceMinutes(state, 10);
  assert.deepEqual(
    result.events.map((event) => event.kind),
    ["activityFinished", "tileRevealed", "attacked", "discovered"],
  );
  assert.deepEqual(result.state.discovery, {
    actions: ["walkTo", "gather", "strikeWithStick", "kick", "dodge"],
    conditions: [
      "hereBelow",
      "itemBelow",
      "healthBelow",
      "opponentHealthBelow",
    ],
    items: ["stick"],
    creatures: ["wolf"],
  });
  assert.deepEqual(result.state.run.copy.program, state.run.copy.program);
  assert.equal(result.state.paused, true);
  assert.equal(result.state.run.lastCombat.result, null);
});

test("first chill and attack in one minute keep the automatic exploration rule but never start it during combat", () => {
  const state = prepared(programFromRules());
  state.understanding = {
    actions: [],
    conditions: ["always"],
    items: [],
    creatures: [],
  };
  state.run.body.temperature = 35;
  const result = advanceMinutes(state, 10);
  assert.equal(result.state.run.copy.program.groups[0].rules.length, 1);
  assert.deepEqual(result.state.run.copy.program.groups[0].rules[0].action, {
    kind: "explore",
  });
  assert.deepEqual(result.state.ruleCounts, { 1: 0 });
  assert.equal(result.state.run.current, null);
  assert.deepEqual(result.state.discovery, {
    actions: ["explore", "wander", "strikeWithStick", "kick", "dodge"],
    conditions: ["temperatureBelow", "healthBelow", "opponentHealthBelow"],
    items: [],
    creatures: ["wolf"],
  });
  assert.equal(
    result.events.filter((event) => event.kind === "discovered").length,
    1,
  );
  assert.ok(!result.events.some((event) => event.kind === "activityStarted"));
});

test("a departed creature starts cooldown but adds no defeated attack", () => {
  const state = fighting(
    programFromRules({ condition: ALWAYS, action: { kind: "dodge" } }),
  );
  state.run.defeatedAttacks = 1;
  const result = advanceMinutes(state, 5).state;
  assert.equal(result.run.lastCombat.result.outcome, "creatureDeparted");
  assert.equal(result.run.body.health, 15);
  assert.equal(result.run.defeatedAttacks, 1);
  assert.equal(result.run.attackCooldownStart, 186);
  assert.deepEqual(result.ruleCounts, { 1: 40 });
});

test("known attacks do not pause and restart clears combat while reproducing its attack stream", () => {
  const attacked = advanceMinutes(prepared(), 1).state;
  assert.equal(attacked.paused, false);
  const restarted = restart(attacked).state;
  assert.equal(restarted.run.minute, 0);
  assert.equal(restarted.run.activeCombat, null);
  assert.equal(restarted.run.lastCombat, null);
  assert.equal(restarted.run.attackCooldownStart, 0);
  assert.equal(restarted.run.defeatedAttacks, 0);
  assert.equal(
    restarted.run.attackRandom,
    restart(restarted).state.run.attackRandom,
  );
  assert.equal(restarted.run.seed, attacked.run.seed);
  assert.deepEqual(restarted.understanding, attacked.understanding);
  assert.deepEqual(restarted.solvedMaps, attacked.solvedMaps);
});

test("stepMinute and game advancement have the same attack and combat ordering", () => {
  for (const state of [
    prepared(),
    fighting(),
    { ...fighting(), run: { ...fighting().run, minute: 185 } },
  ]) {
    const stepped = stepMinute(
      state.run,
      MAPS.forestDeep,
      state.run.copy.program,
    );
    const advanced = advanceMinutes(state, 1);
    assert.deepEqual(stepped.run, advanced.state.run);
    assert.deepEqual(stepped.events, advanced.events);
  }
});

test("two different ordinary programs on a shared seed meet their first attack in the same minute", () => {
  const map = {
    ...MAPS.forestDeep,
    ambientTemperature: 37,
    solving: { streak: 10000 },
  };
  const firstAttack = (program) => {
    let run = newMapRun(map, 42, program, {
      mapId: "forestDeep",
      characterId: 1,
    }).run;
    run = { ...run, body: { ...HEALTHY, satiety: 10000 } };
    for (let minute = 0; minute < 2000; minute++) {
      run = stepMinute(run, map, program).run;
      if (run.activeCombat) return run.activeCombat.attackMinute;
    }
    assert.fail("no first attack in the bounded fixture");
  };
  const exploring = firstAttack(
    programFromRules({ condition: ALWAYS, action: { kind: "explore" } }),
  );
  const wandering = firstAttack(
    programFromRules({ condition: ALWAYS, action: { kind: "wander" } }),
  );
  assert.ok(exploring > 180);
  assert.equal(wandering, exploring);
});

test("M+5 counts the second defeated attack before checking both map requirements", () => {
  const state = prepared();
  state.run.minute = 185;
  state.run.current = null;
  state.run.streak = 539;
  state.run.defeatedAttacks = 1;
  state.run.activeCombat = {
    creatureId: "wolf",
    attackMinute: 181,
    resolveMinute: 186,
  };
  state.run.lastCombat = { ...state.run.activeCombat, result: null };
  const result = advanceMinutes(state, 1);
  assert.equal(result.state.run.defeatedAttacks, 2);
  assert.deepEqual(result.state.run.completion, { minute: 186 });
  assert.deepEqual(result.state.solvedMaps, ["forest", "forestDeep"]);
  assert.equal(result.state.run.body.health, 58);
  assert.equal(result.state.run.activeCombat, null);
  assert.equal(result.state.run.lastCombat.result.outcome, "creatureDefeated");
});

// Invariant minute-span-split: compare the whole state and the ordered event
// prefix at every chunk boundary against single minutes, through discovery or
// an ending minute. No state field is normalized. Real-time chunks are whole
// seconds, so their carry is also directly comparable. advanceMinutes ignores
// pause by contract; stop its driver at discovery instead of silently resuming.
// Source: foundations/invariants.md:528.
function traceChunks(initial, chunks, advance = advanceMinutes) {
  let state = initial;
  const events = [];
  const records = [];
  for (const chunk of chunks) {
    const result = advance(state, chunk);
    state = result.state;
    events.push(...result.events);
    records.push({ state, events: [...events] });
    if (result.events.some((event) => event.kind === "discovered")) break;
  }
  return records;
}

const COMBAT_SPLITS = [
  {
    name: "first wolf discovery",
    creatures: [],
    streak: 0,
    defeats: 0,
    program: KICK,
    stop: 181,
    outcome: null,
  },
  {
    name: "known attack and M+5",
    creatures: ["wolf"],
    streak: 0,
    defeats: 0,
    program: KICK,
    stop: 190,
    outcome: "creatureDefeated",
  },
  {
    name: "combat death",
    creatures: ["wolf"],
    streak: 0,
    defeats: 0,
    program: programFromRules(),
    stop: 186,
    outcome: "characterDied",
  },
  // Starting at 537 yields 538 in M, 539 in M+1 and completion in M+2.
  {
    name: "completion before turns",
    creatures: ["wolf"],
    streak: 537,
    defeats: 2,
    program: KICK,
    stop: 183,
    outcome: null,
  },
  // Starting at 534 reaches 540 in M+5, when the second wolf is defeated.
  {
    name: "completion after turns",
    creatures: ["wolf"],
    streak: 534,
    defeats: 1,
    program: KICK,
    stop: 186,
    outcome: "creatureDefeated",
  },
];

for (const scenario of COMBAT_SPLITS) {
  test(`combat time splitting preserves every state and ordered event: ${scenario.name}`, () => {
    const initial = prepared(scenario.program);
    initial.understanding.creatures = scenario.creatures;
    if (scenario.creatures.length === 0) initial.run.minute = 179;
    initial.run.streak = scenario.streak;
    initial.run.defeatedAttacks = scenario.defeats;
    const reference = traceChunks(initial, Array(10).fill(1));
    const final = reference.at(-1);
    // Independent controls prevent an equal but noncombat pair from passing.
    assert.equal(final.state.run.minute, scenario.stop);
    assert.deepEqual(final.events[0], {
      kind: "attacked",
      minute: 181,
      creature: "wolf",
    });
    assert.equal(
      final.state.run.lastCombat.result?.outcome ?? null,
      scenario.outcome,
    );
    if (scenario.creatures.length === 0) {
      assert.deepEqual(
        final.events.map((event) => event.kind),
        ["attacked", "discovered"],
      );
      assert.deepEqual(final.state.understanding.creatures, ["wolf"]);
      assert.equal(final.state.paused, true);
    } else if (scenario.outcome === "characterDied") {
      assert.deepEqual(final.state.run.death, { minute: 186, cause: "combat" });
      assert.equal(final.events.at(-1).kind, "characterDied");
    } else if (scenario.defeats > 0) {
      assert.deepEqual(final.state.run.completion, { minute: scenario.stop });
      assert.equal(final.events.at(-1).kind, "mapRunCompleted");
    }
    const exchanges = final.events.filter(
      (event) => event.kind === "combatExchange",
    );
    // D-144: 24 / 3 = 8 kicks; without a reply, ceil(100 / 7) = 15 bites.
    // Source: foundations/decisions.md:2590.
    assert.equal(
      exchanges.length,
      scenario.outcome === null
        ? 0
        : scenario.outcome === "characterDied"
          ? 15
          : 8,
    );
    assert.ok(exchanges.every((event) => event.minute === 186));
    for (const chunks of [[10], [2, 3, 5], [1, 4, 1, 4]]) {
      for (const advance of [
        advanceMinutes,
        (state, minutes) => passRealTime(state, minutes * 1000),
      ]) {
        const records = traceChunks(initial, chunks, advance);
        for (const record of records) {
          const expected = reference.find(
            (entry) => entry.state.run.minute === record.state.run.minute,
          );
          assert.ok(
            expected,
            `single minutes reached ${record.state.run.minute}`,
          );
          assert.deepEqual(record, expected);
        }
        assert.deepEqual(records.at(-1), final);
      }
    }
  });
}

// Invariants map-run-repeatability and restart-seed: start with an ordinary
// public send, then replay the same real-time inputs after restart. No patched
// random state, clock, counters or body: even the initial whole states agree.
// Sources: foundations/invariants.md:165, :309; decisions.md:450 (D-22).
test("restart replays the actual attack stream and combat minute by minute", () => {
  const initial = sent();
  const reference = traceChunks(initial, Array(250).fill(1000), passRealTime);
  const final = reference.at(-1);
  const attacks = final.events.filter((event) => event.kind === "attacked");
  assert.equal(attacks.length, 1, "precondition: this seed reaches a wolf");
  assert.ok(final.events.some((event) => event.kind === "combatExchange"));
  assert.equal(final.state.run.death.cause, "combat");
  assert.equal(final.state.run.death.minute, attacks[0].minute + 5);
  const restarted = restart(final.state).state;
  assert.deepEqual(restarted, initial);
  const replay = traceChunks(restarted, Array(250).fill(1000), passRealTime);
  assert.deepEqual(replay, reference);
});
