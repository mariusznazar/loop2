// The gear of a character at the start and the end of each map run: a manual map run's completion,
// „Zakończ” and „Restart” before it, a death settled with a use of the resurrection or with none left,
// the map runs of an earning loop with the slots the player changed merged slot by slot, „Zatrzymaj”,
// the catch-up against the open game, and a judging that takes nothing. The expectations come from
// D-183 (what each end does to the gear), D-187 (the caps clip no gear), D-190 (which death takes the
// gear), D-439 (the judging), D-452 (whose the gear is) and D-460 (the merge of an earning loop) in
// foundations/decisions.md; every gear and chest expected is written out here.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  restart,
  send,
  setPaused,
  setProgram,
  settleDeath,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { putOnPiece, takeOffPiece } from "../../dist/browser/sim/gear.js";
import { judgeAndRecord } from "../../dist/browser/sim/judging.js";
import {
  advanceLoopRun,
  catchUp,
  endLoopRun,
  passLoops,
  startLoop,
  stopLoop,
} from "../../dist/browser/sim/loop.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** One real minute in ms: 60 s × 1000, a game minute of an earning loop (D-239). */
const MIN = 60_000;
const ALA = 1;
const OLA = 2;
const FOREST = { mapId: "forest", characterId: ALA };
const EMPTY = programFromRules();
const EXPLORE = { kind: "explore" };
const HEALTHY = { temperature: 37, satiety: 100, health: 100 };
/** One game minute from a death of cold: chilled, with health the next minute takes away. */
const DYING = { temperature: 30, satiety: 100, health: 0.1 };

/** The gear of a new character: the eight slots of the data, each holding none. */
const EMPTY_GEAR = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};
const STICK_IN_HAND = { ...EMPTY_GEAR, mainHand: "stick" };
/** What a map run leaves in the gear: a stick in the hand and a bandage in the first pocket. */
const RUN_LEFT = { ...EMPTY_GEAR, mainHand: "stick", pocket1: "bandage" };
const BANDAGE_ONLY = { ...EMPTY_GEAR, pocket1: "bandage" };

/**
 * A knowing game with Ala (1) and Ola (2), the first program the empty one, Skraj lasu and Las solved,
 * all three uses of the resurrection left and the chest holding `chest`.
 */
function game(chest = {}) {
  let state = setProgram(newKnowingGame(), EMPTY).state;
  state = createCharacter(state, "Ala").state;
  state = createCharacter(state, "Ola").state;
  return {
    ...state,
    solvedMaps: ["forestEdge", "forest"],
    team: { ...state.team, chest: { pieces: { ...chest } } },
  };
}

const character = (state, id) =>
  state.team.characters.find((listed) => listed.id === id);
const ala = (state) => character(state, ALA);

/** `state` with the team's character `id` changed by `change`. */
function changing(state, id, change) {
  return {
    ...state,
    team: {
      ...state.team,
      characters: state.team.characters.map((listed) =>
        listed.id === id ? { ...listed, ...change } : listed,
      ),
    },
  };
}

/** `state` with the chest holding `pieces`. */
function withChest(state, pieces) {
  return {
    ...state,
    team: { ...state.team, chest: { pieces: { ...pieces } } },
  };
}

/** `state` with `spent` uses of the resurrection spent, the next returning at `nextMs`. */
function withUses(state, spent, nextMs) {
  return {
    ...state,
    team: {
      ...state.team,
      resurrectionUsesSpent: spent,
      resurrectionNextReturnAtMs: nextMs,
    },
  };
}

/** A real moment far beyond every moment of the cases. */
const FAR = T0 + 10_000 * MIN;
/** No use left: all three spent, the first returning far beyond the cases' moments. */
const noneLeft = (state) => withUses(state, 3, FAR);
/** One use left, the last: two spent, the next returning far beyond the cases' moments. */
const lastLeft = (state) => withUses(state, 2, FAR);

/** `state` with Ala holding one practice in each skill: practice a death with no use left takes. */
function practised(state) {
  return changing(state, ALA, {
    skills: Object.fromEntries(
      Object.entries(ala(state).skills).map(([skill, held]) => [
        skill,
        { ...held, practice: held.practice + 1 },
      ]),
    ),
  });
}

/** The explore activity of a map run, ending in the next game minute. */
function endingNext(run) {
  return {
    activity: { kind: "rule", ruleId: 1, action: EXPLORE },
    startMinute: run.minute,
    endMinute: run.minute + 1,
    stepTo: null,
  };
}

/** `run` with the gear `gear` and `backpack` added to what it carries: what the map run left. */
function leaving(run, gear, backpack = {}) {
  return {
    ...run,
    character: {
      ...run.character,
      gear: { ...gear },
      backpack: { ...run.character.backpack, ...backpack },
    },
  };
}

/** A map run one game minute from its completion: healthy, the streak at 479 of the 480 of Las. */
const completingNext = (run) => ({
  ...run,
  body: { ...HEALTHY },
  streak: 479,
  current: endingNext(run),
});

/** A map run one game minute from a death of cold. */
const dyingNext = (run) => ({ ...run, body: { ...DYING } });

// The manual map run of Ala.

/** Ala sent to Las at T0. */
const sentAla = (state) => send(state, FOREST, T0).state;

/** `state` with its manual map run changed by `change`, a function of the run. */
const manual = (state, change) => ({ ...state, run: change(state.run) });

/** The manual map run of `state` passed one game minute, to the death the cases prepare. */
function died(state) {
  const dead = advanceMinutes(state, 1).state;
  assert.ok(dead.run.death, "precondition: the character died");
  assert.equal(dead.run.deathSettlement, null, "precondition: unsettled");
  return dead;
}

// The earning loop of Ala.

/** `state` with the map run of Ala's earning loop changed by `change`, a function of the run. */
function looped(state, change) {
  const loop = state.loops[ALA];
  return {
    ...state,
    loops: { ...state.loops, [ALA]: { ...loop, run: change(loop.run) } },
  };
}

/** The earning loop of Ala passed one game minute to the end prepared, and that end taken at T0. */
function endedLoopRun(state) {
  const passed = advanceLoopRun(state, ALA, 1).state;
  assert.ok(
    passed.loops[ALA].run.death || passed.loops[ALA].run.completion,
    "precondition: the map run ended",
  );
  return endLoopRun(passed, ALA, T0).state;
}

/**
 * Ala in an earning loop of Las, her gear empty at the start, with the stick of the chest put on her
 * main hand by the player after the start, so the main hand is a slot the player changed; her map run
 * then leaves `RUN_LEFT`: a stick the strike took into the hand and a bandage in the first pocket.
 */
function playerPutStick(state) {
  const started = startLoop(withChest(state, { stick: 1 }), FOREST, T0).state;
  const put = putOnPiece(started, ALA, "mainHand", "stick");
  assert.equal(put.refusal, null, "precondition: the put on was made");
  assert.deepEqual(put.state.team.chest.pieces, {}, "precondition: chest");
  return looped(put.state, (run) => leaving(run, RUN_LEFT, { stick: 3 }));
}

test("a completion of a manual map run gives the character the gear the map run left in its game minute, beyond the bring list and an exit cap of 0", () => {
  // decision: D-183 "The gear of the character is no carried item: it stays with the character after each of these ends and comes back as it stood at the end of the map run, a piece the map run took from the backpack into the gear included, though it stands on no bring list and counts toward no exit cap, while a piece the map run put from the gear into the backpack shares the fate of the backpack."
  // decision: D-187 "The caps clip no gear: the gear of the character goes into a map run and out of it whole and counts toward neither cap."
  const original = MAPS.forest;
  MAPS.forest = { ...original, carryOut: 0 };
  try {
    for (const [label, solvedMaps] of [
      ["a solved map", ["forestEdge", "forest"]],
      ["a map solved first", ["forestEdge"]],
    ]) {
      const going = sentAla({ ...game(), solvedMaps });
      const before = manual(going, (run) =>
        completingNext(leaving(run, RUN_LEFT, { stick: 2 })),
      );
      assert.equal(before.run.completion, null, `${label}: precondition`);
      const after = advanceMinutes(before, 1).state;
      assert.ok(after.run.completion, `${label}: the map run completed`);
      assert.deepEqual(ala(after).gear, RUN_LEFT, label);
      assert.deepEqual(after.team.chest.pieces, {}, `${label}: chest`);
      assert.deepEqual(after.run.character.gear, RUN_LEFT, label);
    }
  } finally {
    MAPS.forest = original;
  }
});

test("„Zakończ” before a completion gives the character the gear the map run holds, while the backpack is lost", () => {
  // decision: D-183 "The gear of the character is no carried item: it stays with the character after each of these ends and comes back as it stood at the end of the map run, a piece the map run took from the backpack into the gear included, though it stands on no bring list and counts toward no exit cap, while a piece the map run put from the gear into the backpack shares the fate of the backpack."
  const going = changing(game({ stick: 1 }), ALA, { gear: STICK_IN_HAND });
  // The map run put the stick of the hand into the backpack and took a bandage into a pocket.
  const before = manual(sentAla(going), (run) =>
    leaving(run, BANDAGE_ONLY, { stick: 1 }),
  );
  assert.deepEqual(ala(before).gear, STICK_IN_HAND, "precondition");
  for (const [label, state] of [
    ["going", before],
    ["paused", setPaused(before, true).state],
  ]) {
    const ended = end(state).state;
    assert.equal(ended.run, null, label);
    assert.deepEqual(ala(ended).gear, BANDAGE_ONLY, label);
    assert.deepEqual(ended.team.chest.pieces, { stick: 1 }, `${label}: chest`);
  }
});

test("„Restart” before a completion gives the character the map run's gear, and the new map run starts with it", () => {
  // decision: D-452 "The gear goes with the character into every map run, a manual one and one of an earning loop, and comes back with it."
  const before = manual(sentAla(game({ stick: 4 })), (run) =>
    leaving(run, RUN_LEFT, { stick: 2 }),
  );
  const restarted = restart(before).state;
  assert.deepEqual(ala(restarted).gear, RUN_LEFT);
  assert.deepEqual(restarted.run.character.gear, RUN_LEFT);
  assert.equal(restarted.run.character.backpack.stick, 0);
  assert.deepEqual(restarted.team.chest.pieces, { stick: 4 });
});

// invariant: death-settled-once
test("a death of a manual map run gives the gear back when a use of the resurrection is left, the last one included, and takes it when none is", () => {
  // decision: D-190 "The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried."
  for (const [label, prepare, gear, kind, generation] of [
    ["practice, a use left", practised, RUN_LEFT, "resurrectionUsed", 1],
    [
      "practice, the last use",
      (state) => lastLeft(practised(state)),
      RUN_LEFT,
      "resurrectionUsed",
      1,
    ],
    [
      "practice, none left",
      (state) => noneLeft(practised(state)),
      EMPTY_GEAR,
      "progressLost",
      2,
    ],
    ["no practice, a use left", (state) => state, RUN_LEFT, "noPractice", 1],
    ["no practice, none left", noneLeft, EMPTY_GEAR, "noPractice", 1],
  ]) {
    const entered = changing(prepare(game()), ALA, { gear: STICK_IN_HAND });
    const dead = died(
      manual(sentAla(entered), (run) => dyingNext(leaving(run, RUN_LEFT))),
    );
    assert.deepEqual(ala(dead).gear, STICK_IN_HAND, `${label}: unsettled`);
    const settled = settleDeath(dead, T0).state;
    assert.equal(settled.run.deathSettlement.kind, kind, label);
    assert.deepEqual(ala(settled).gear, gear, label);
    assert.equal(ala(settled).generation, generation, `${label}: generation`);
    assert.deepEqual(settled.run.character.gear, RUN_LEFT, `${label}: run`);
    assert.equal(settleDeath(settled, T0 + 1).state, settled, `${label}: once`);
    // „Zakończ” and „Restart” after the death leave the gear as the death left it.
    assert.deepEqual(ala(end(settled).state).gear, gear, `${label}: Zakończ`);
    const restarted = restart(settled).state;
    assert.deepEqual(ala(restarted).gear, gear, `${label}: Restart`);
    assert.deepEqual(restarted.run.character.gear, gear, `${label}: new run`);
  }
});

test("a death of a character with no practice and no use left takes its gear and leaves the uses as they were", () => {
  // decision: D-190 "The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried."
  const entered = changing(noneLeft(game()), ALA, { gear: STICK_IN_HAND });
  const dead = died(manual(sentAla(entered), dyingNext));
  const settled = settleDeath(dead, T0).state;
  assert.deepEqual(ala(settled).gear, EMPTY_GEAR);
  assert.deepEqual(ala(settled).skills, ala(entered).skills);
  assert.equal(settled.team.resurrectionUsesSpent, 3);
  assert.equal(settled.team.resurrectionNextReturnAtMs, FAR);
});

test("an earning loop's map run starts with the character's gear, takes none from the chest, and the start clears the changed slots", () => {
  // decision: D-452 "The trip plan of a program holds no gear, switching the program changes none, and an earning loop does not refill it from the chest between its map runs."
  let state = changing(game({ stick: 2 }), ALA, {
    gear: STICK_IN_HAND,
    changedSlots: ["pocket1"],
  });
  state = startLoop(state, FOREST, T0).state;
  state = startLoop(state, { ...FOREST, characterId: OLA }, T0).state;
  assert.deepEqual(state.loops[ALA].run.character.gear, STICK_IN_HAND);
  assert.deepEqual(state.loops[OLA].run.character.gear, EMPTY_GEAR);
  assert.deepEqual(ala(state).changedSlots, []);
  assert.deepEqual(state.team.chest.pieces, { stick: 2 });
});

test("a completion of an earning loop's map run with no slot changed gives the character the map run's gear, and the next map run starts with it", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  const started = startLoop(
    changing(game(), ALA, { gear: STICK_IN_HAND }),
    FOREST,
    T0,
  ).state;
  const before = looped(started, (run) =>
    completingNext(leaving(run, RUN_LEFT, { stick: 3 })),
  );
  const after = endedLoopRun(before);
  assert.equal(after.loops[ALA].completed, 1, "precondition: a completion");
  assert.deepEqual(ala(after).gear, RUN_LEFT);
  assert.deepEqual(after.loops[ALA].run.character.gear, RUN_LEFT);
  assert.deepEqual(after.team.chest.pieces, {});
});

test("a completion of an earning loop's map run keeps the player's choice in a changed slot and sends the map run's piece there to the chest", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  const before = looped(playerPutStick(game()), completingNext);
  const after = endedLoopRun(before);
  assert.equal(after.loops[ALA].completed, 1, "precondition: a completion");
  assert.deepEqual(ala(after).gear, RUN_LEFT);
  assert.deepEqual(after.team.chest.pieces, { stick: 1 });
  assert.deepEqual(ala(after).changedSlots, []);
  assert.deepEqual(after.loops[ALA].run.character.gear, RUN_LEFT);
});

/**
 * Ala in an earning loop of Las with the stick in her main hand at its start, so the map run going on
 * holds that stick too, and the chest holding `chest`.
 */
function loopWithStick(state, chest = {}) {
  return startLoop(
    changing(withChest(state, chest), ALA, { gear: STICK_IN_HAND }),
    FOREST,
    T0,
  ).state;
}

test("a slot the player emptied keeps its emptiness and the map run's stick reaches the chest once, at the end, and one emptied and filled again counts as changed", () => {
  // decision: D-460 "A slot counts as changed from the first piece the player puts on it or takes off it, whether or not it holds again the item it held at the start of the map run."
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  // Two sticks in all: the one in the hand, which the map run going on holds, and one in the chest.
  const emptied = takeOffPiece(
    loopWithStick(game(), { stick: 1 }),
    ALA,
    "mainHand",
  ).state;
  assert.deepEqual(
    emptied.team.chest.pieces,
    { stick: 1 },
    "precondition: the map run's stick is not in the chest while the map run goes on",
  );
  const afterEmptied = endedLoopRun(
    looped(emptied, (run) => completingNext(leaving(run, RUN_LEFT))),
  );
  assert.deepEqual(ala(afterEmptied).gear, BANDAGE_ONLY);
  assert.deepEqual(afterEmptied.team.chest.pieces, { stick: 2 });
  const refilled = putOnPiece(emptied, ALA, "mainHand", "stick").state;
  assert.deepEqual(refilled.team.chest.pieces, {}, "precondition");
  const afterRefilled = endedLoopRun(
    looped(refilled, (run) => completingNext(leaving(run, RUN_LEFT))),
  );
  assert.deepEqual(ala(afterRefilled).gear, RUN_LEFT);
  assert.deepEqual(afterRefilled.team.chest.pieces, { stick: 1 });
});

test("a stick put on in an earning loop over the map run's stick stays in the hand, and the map run's stick reaches the chest at the end", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  // Two sticks in all: the one in the hand and one in the chest, which the player puts on.
  const exchanged = putOnPiece(
    loopWithStick(game(), { stick: 1 }),
    ALA,
    "mainHand",
    "stick",
  ).state;
  assert.deepEqual(exchanged.team.chest.pieces, {}, "precondition");
  const after = endedLoopRun(looped(exchanged, completingNext));
  assert.deepEqual(ala(after).gear, STICK_IN_HAND);
  assert.deepEqual(after.team.chest.pieces, { stick: 1 });
});

test("a death with no use left takes the map run's stick that the player took off or exchanged for the next map run, and leaves the player's own", () => {
  // decision: D-190 "The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried."
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  const takeOff = (state) => takeOffPiece(state, ALA, "mainHand").state;
  const putOn = (state) => putOnPiece(state, ALA, "mainHand", "stick").state;
  for (const [label, prepare, chest, act, gear] of [
    ["practice, taken off", practised, {}, takeOff, EMPTY_GEAR],
    ["practice, exchanged", practised, { stick: 1 }, putOn, STICK_IN_HAND],
    ["no practice, taken off", (state) => state, {}, takeOff, EMPTY_GEAR],
    [
      "no practice, exchanged",
      (state) => state,
      { stick: 1 },
      putOn,
      STICK_IN_HAND,
    ],
  ]) {
    const acted = act(loopWithStick(noneLeft(prepare(game())), chest));
    assert.deepEqual(acted.team.chest.pieces, {}, `${label}: precondition`);
    const after = endedLoopRun(looped(acted, dyingNext));
    assert.deepEqual(ala(after).gear, gear, label);
    assert.deepEqual(after.team.chest.pieces, {}, `${label}: chest`);
  }
});

/** The sticks the player owns outside a map run: those of the chest and the one in Ala's main hand. */
const ownedSticks = (state) =>
  (state.team.chest.pieces.stick ?? 0) +
  (ala(state).gear.mainHand === "stick" ? 1 : 0);

/** Every sequence of up to `length` of the player's two acts on the main hand, the empty one included. */
function actSequences(length) {
  const acts = {
    on: (state) => putOnPiece(state, ALA, "mainHand", "stick").state,
    off: (state) => takeOffPiece(state, ALA, "mainHand").state,
  };
  let sequences = [[]];
  const all = [[]];
  for (let step = 0; step < length; step += 1) {
    sequences = sequences.flatMap((sequence) =>
      Object.keys(acts).map((name) => [...sequence, name]),
    );
    all.push(...sequences);
  }
  return all.map((names) => ({
    label: names.join(" ") || "no act",
    run: (state) => names.reduce((current, name) => acts[name](current), state),
  }));
}

test("no sequence of the player's acts in an earning loop and no end of its map run makes a stick or loses one but at a death that takes the gear", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  // decision: D-190 "The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried."
  // The empty program takes nothing and its map run keeps the gear it entered with, so the sticks the
  // player owns are those of the chest and the hand, and a death that takes the gear takes the stick
  // the map run going on entered with.
  const ends = [
    ["a completion", (state) => state, completingNext, false],
    ["a death with a use left", practised, dyingNext, false],
    ["a death with none left", (s) => noneLeft(practised(s)), dyingNext, true],
    ["a death with no practice and none left", noneLeft, dyingNext, true],
  ];
  const sequences = actSequences(3);
  for (const hand of [EMPTY_GEAR, STICK_IN_HAND])
    for (const sticks of [0, 1, 2])
      for (const [end, prepare, ending, takes] of ends)
        for (const { label, run } of sequences) {
          const name = `${hand.mainHand ?? "no stick"} in the hand, ${sticks} in the chest, ${label}, ${end}`;
          const start = startLoop(
            changing(prepare(game({ stick: sticks })), ALA, { gear: hand }),
            FOREST,
            T0,
          ).state;
          const owned = ownedSticks(start);
          const entered = hand.mainHand === "stick" ? 1 : 0;
          const acted = run(start);
          const after = endedLoopRun(looped(acted, ending));
          assert.equal(ownedSticks(after), owned - (takes ? entered : 0), name);
          const stopped = stopLoop(acted, ALA).state;
          assert.equal(ownedSticks(stopped), owned, `${name}, Zatrzymaj`);
        }
});

test("the map run's piece in a changed slot is lost where the chest has no room, and goes in up to the room there is", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  const started = startLoop(
    changing(game(), ALA, { gear: STICK_IN_HAND }),
    FOREST,
    T0,
  ).state;
  // The player's choices: the stick in the hand and nothing in the first pocket; the map run leaves a
  // stick in the hand and a bandage in the pocket, two pieces for the chest of 60 pieces.
  const changed = changing(started, ALA, {
    changedSlots: ["mainHand", "pocket1"],
  });
  for (const [label, berries, pieces] of [
    ["a full chest", 60, 60],
    ["room for one", 59, 60],
    ["room for both", 58, 60],
  ]) {
    const before = looped(withChest(changed, { berry: berries }), (run) =>
      completingNext(leaving(run, RUN_LEFT)),
    );
    const after = endedLoopRun(before);
    assert.deepEqual(ala(after).gear, STICK_IN_HAND, label);
    const chest = after.team.chest.pieces;
    assert.equal(chest.berry, berries, `${label}: berries`);
    const total = Object.values(chest).reduce((sum, count) => sum + count, 0);
    assert.equal(total, pieces, `${label}: pieces in the chest`);
  }
});

test("a death in an earning loop gives the gear back merged with a use left and takes the map run's gear with none, a changed slot keeping the player's choice", () => {
  // decision: D-190 "The gear of a character, which is no part of what it carried (D-183), is taken by a death when the resurrection has no use left to spend on it, and by no other: a death that uses up the last use takes none of it, and the death of a character with no practice yet, which uses up no use, takes it when no use is left, though it takes nothing else besides what it carried."
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  for (const [label, prepare, gear, chest, goesOn] of [
    ["practice, a use left", practised, RUN_LEFT, { stick: 1 }, true],
    [
      "practice, the last use",
      (state) => lastLeft(practised(state)),
      RUN_LEFT,
      { stick: 1 },
      true,
    ],
    ["no practice, a use left", (state) => state, RUN_LEFT, { stick: 1 }, true],
    [
      "practice, none left",
      (state) => noneLeft(practised(state)),
      STICK_IN_HAND,
      {},
      false,
    ],
    ["no practice, none left", noneLeft, STICK_IN_HAND, {}, true],
  ]) {
    const before = looped(playerPutStick(prepare(game())), dyingNext);
    const after = endedLoopRun(before);
    assert.deepEqual(ala(after).gear, gear, label);
    assert.deepEqual(after.team.chest.pieces, chest, `${label}: chest`);
    assert.deepEqual(ala(after).changedSlots, [], `${label}: changed slots`);
    assert.equal(after.loops[ALA] !== undefined, goesOn, `${label}: loop`);
    if (goesOn)
      assert.deepEqual(after.loops[ALA].run.character.gear, gear, label);
  }
});

test("„Zatrzymaj” merges the map run's gear as an end does, clears the changed slots and loses the backpack", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  // decision: D-183 "The gear of the character is no carried item: it stays with the character after each of these ends and comes back as it stood at the end of the map run, a piece the map run took from the backpack into the gear included, though it stands on no bring list and counts toward no exit cap, while a piece the map run put from the gear into the backpack shares the fate of the backpack."
  const stopped = stopLoop(playerPutStick(game()), ALA).state;
  assert.equal(stopped.loops[ALA], undefined);
  assert.deepEqual(ala(stopped).gear, RUN_LEFT);
  assert.deepEqual(ala(stopped).changedSlots, []);
  assert.deepEqual(stopped.team.chest.pieces, { stick: 1 });
});

/** The open game over `minutes` whole minutes from `T0`, one call to `passLoops` for each. */
function openGame(state, minutes) {
  let current = state;
  let clock = T0;
  for (let minute = 0; minute < minutes; minute += 1) {
    const passed = passLoops(current, clock, clock + MIN);
    current = passed.state;
    clock = passed.clockMs;
  }
  return current;
}

// invariant: catch-up-state
// D-240: a relation, so no value comes from today's run.
test("the catch-up gives the same character and chest as the open game through ends that merge the gear", () => {
  // decision: D-460 "At the end of a map run of an earning loop the character's gear is merged slot by slot: a slot the player changed since that map run started keeps the player's choice, and the piece the map run left in it goes to the chest, or is lost where the chest has no room, as loot beyond the free room of the chest is; any other slot takes what the map run left."
  for (const [label, prepare, minutes, gear] of [
    ["a completion", (state) => looped(state, completingNext), 300, RUN_LEFT],
    [
      "a covered death",
      (state) => practised(looped(state, dyingNext)),
      300,
      RUN_LEFT,
    ],
    [
      "an uncovered death",
      (state) => noneLeft(practised(looped(state, dyingNext))),
      2,
      STICK_IN_HAND,
    ],
    [
      "a death with no practice and no use",
      (state) => noneLeft(looped(state, dyingNext)),
      2,
      STICK_IN_HAND,
    ],
  ]) {
    const state = withSaveTime(prepare(playerPutStick(game())), T0);
    const open = openGame(state, minutes);
    const caught = catchUp(state, T0 + minutes * MIN).state;
    assert.deepEqual(ala(caught).gear, gear, `${label}: precondition`);
    assert.deepEqual(ala(open), ala(caught), `${label}: character`);
    assert.deepEqual(open.team.chest, caught.team.chest, `${label}: chest`);
    assert.deepEqual(open.loops, caught.loops, `${label}: loops`);
  }
});

test("a judging takes nothing of the gear or the chest, at the camp, in an earning loop and beside a manual map run", () => {
  // decision: D-439 "Each of the twelve runs starts too with the gear the character has at the time of the judging, the gear the game keeps at the character outside a map run, the same for all twelve, and the judging takes nothing of it."
  const ids = { mapId: "forest", characterId: ALA, programId: 1 };
  const camp = changing(game({ stick: 2, bandage: 1 }), ALA, {
    gear: RUN_LEFT,
  });
  const inLoop = putOnPiece(
    startLoop(camp, FOREST, T0).state,
    ALA,
    "mainHand",
    "stick",
  ).state;
  assert.deepEqual(ala(inLoop).changedSlots, ["mainHand"], "precondition");
  const inManual = sentAla(camp);
  for (const [label, state] of [
    ["at the camp", camp],
    ["in an earning loop", inLoop],
    ["beside a manual map run", inManual],
  ]) {
    const before = structuredClone(state);
    const judged = judgeAndRecord(state, ids);
    assert.equal(judged.state, state, label);
    assert.deepEqual(state, before, label);
    assert.equal(judged.judging.results.length, 12, label);
  }
});
