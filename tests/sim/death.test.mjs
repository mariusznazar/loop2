// A character's resurrection and when it is ready, and how its death is settled, once, on the
// browser's clock. The expectations come from the task rozliczenie-przejsc, To do 8 and 10–17
// (questions Q3, Q11 and W1), which bind the tests of loop at commit cdc7c0d: a new character's
// resurrection is ready from the start (loop `sim.test.ts:2002`), a moment equal to the moment of
// readiness counts as ready (loop `death.test.ts:77`-`81`), and the lines of `src/sim/death.test.ts`
// stand beside the cases they bind.
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  passRealTime,
  restart,
  resurrectionReady,
  send,
  setPace,
  setProgram,
  settleDeath,
} from "../../dist/public/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/public/sim/saved-game.js";
import { branchRank, buyBranch } from "../../dist/public/sim/skills.js";
import { programFromRules } from "./program-fixture.mjs";
import { newKnowingGame } from "./understanding-fixture.mjs";

/** A real moment of the browser's clock, in ms. */
const T0 = 1_760_000_000_000;
/** The renewal of a resurrection, 480 real minutes (task, *Context*), in ms: 480 × 60 000. */
const RENEWAL_MS = 28_800_000;
/** The character sent, the first a game creates, to Las. */
const SENT = { mapId: "forest", characterId: 1 };
/** Far more game minutes than a character lives on a program that neither eats nor warms itself. */
const LONGER_THAN_A_LIFE = 1000;
const ALWAYS = { kind: "always" };

/** Ala, with „Obchód” bought out of the practice below, and Ola behind her in the team. */
function team() {
  let state = createCharacter(newKnowingGame(), "Ala").state;
  state = createCharacter(state, "Ola").state;
  const [ala, ola] = state.team.characters;
  const skills = {
    ...ala.skills,
    smallItemGathering: { practice: 160, ranks: {} },
    eating: { practice: 20, ranks: {} },
  };
  state = {
    ...state,
    team: {
      characters: [{ ...ala, skills }, ola],
      chest: { pieces: { stick: 5, berry: 2 } },
    },
  };
  return buyBranch(state, 1, "patrol").state;
}

/** `state` with Ala's resurrection ready from the real moment `readyAtMs` on. */
function readyFrom(state, readyAtMs) {
  const [ala, ...others] = state.team.characters;
  return {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...ala, resurrectionReadyAtMs: readyAtMs }, ...others],
    },
  };
}

/** Ala sent from `state` and moved on until she dies; the death stands unsettled. */
function died(state, realMs = T0) {
  const fallen = advanceMinutes(
    send(state, SENT, realMs).state,
    LONGER_THAN_A_LIFE,
  );
  assert.ok(fallen.state.run.death, "precondition: the character died");
  return fallen.state;
}

/** Ala's death in a game where her resurrection is ready from `readyAtMs` on. */
const fallen = (readyAtMs = 0) => died(readyFrom(team(), readyAtMs));

const ala = (state) => state.team.characters[0];

/** A character of the team with the moment of its resurrection's readiness set by hand. */
function readyAt(resurrectionReadyAtMs) {
  const { characters } = createCharacter(newGame(), "Ala").state.team;
  return { ...characters[0], resurrectionReadyAtMs };
}

// invariant: resurrection-renewal
test("a resurrection is not ready before its moment, is ready at it and stays ready after it", () => {
  const character = readyAt(1_760_000_000_000);
  assert.equal(resurrectionReady(character, 1_759_999_999_999), false);
  assert.equal(resurrectionReady(character, 1_760_000_000_000), true);
  assert.equal(resurrectionReady(character, 1_760_000_000_001), true);
});

// invariant: resurrection-renewal
test("a moment of readiness below zero is ready at every moment from zero on", () => {
  const character = readyAt(-5);
  assert.equal(resurrectionReady(character, 0), true);
  assert.equal(resurrectionReady(character, -5), true);
  assert.equal(resurrectionReady(character, -6), false);
});

test("a new character's resurrection is ready from the start, at the first moment there is", () => {
  const { characters } = createCharacter(newGame(), "Ala").state.team;
  assert.equal(characters[0].resurrectionReadyAtMs, 0);
  assert.equal(resurrectionReady(characters[0], 0), true);
  assert.equal(resurrectionReady(characters[0], 1_760_000_000_000), true);
});

test("a new character is of generation 1, and a created second one too", () => {
  const first = createCharacter(newGame(), "Ala").state;
  const both = createCharacter(first, "Ola").state;
  assert.deepEqual(
    both.team.characters.map((character) => character.generation),
    [1, 1],
  );
});

// invariant: resurrection-renewal
// To do 10; loop `death.test.ts:34`-`47`: the skills and the generation stay, the moment moves.
test("a death with a resurrection ready uses it up: ready again 8 hours after the death, and practice, ranks and generation stay", () => {
  const state = fallen();
  const before = ala(state);
  const settled = settleDeath(state, T0).state;
  assert.equal(ala(settled).resurrectionReadyAtMs, T0 + RENEWAL_MS);
  assert.deepEqual(ala(settled).skills, before.skills);
  assert.equal(branchRank(ala(settled).skills, "patrol"), 1);
  assert.equal(ala(settled).generation, 1);
  assert.deepEqual(settled.run.deathSettlement, { kind: "resurrectionUsed" });
});

// invariant: resurrection-renewal
// To do 11; loop `death.test.ts:48`-`59`: the moment stays, the generation grows, the skills go.
test("a death with no resurrection ready takes all practice and ranks, the generation grows by one and the moment stays", () => {
  const state = fallen(T0 + 1);
  const before = ala(state);
  const settled = settleDeath(state, T0).state;
  const skills = ala(settled).skills;
  assert.equal(ala(settled).resurrectionReadyAtMs, T0 + 1);
  assert.equal(ala(settled).generation, 2);
  assert.equal(skills.smallItemGathering.practice, 0);
  assert.equal(skills.eating.practice, 0);
  assert.equal(branchRank(skills, "patrol"), 0);
  // Every skill of the archetype stands, at nothing: the new character's skills, not fewer of them.
  assert.deepEqual(
    Object.keys(skills).sort(),
    Object.keys(before.skills).sort(),
  );
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "progressLost",
    generation: 2,
  });
});

// To do 11, 18: the settlement holds the number this death gave, not always the second.
test("the settlement of a later death with no resurrection ready holds the number that death gave", () => {
  const state = fallen(T0 + 1);
  const [first, ...others] = state.team.characters;
  const fourth = {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...first, generation: 4 }, ...others],
    },
  };
  const settled = settleDeath(fourth, T0).state;
  assert.equal(ala(settled).generation, 5);
  assert.deepEqual(settled.run.deathSettlement, {
    kind: "progressLost",
    generation: 5,
  });
});

// To do 11; loop `death.test.ts:61`-`75`, `:98`-`:111`: the character stays the same character.
test("a death that takes everything leaves the name, the archetype, the place in the team and the character behind it", () => {
  const state = fallen(T0 + 1);
  const before = state.team.characters;
  const after = settleDeath(state, T0).state.team.characters;
  assert.deepEqual(
    after.map((character) => character.name),
    ["Ala", "Ola"],
  );
  assert.equal(after[0].id, before[0].id);
  assert.equal(after[0].archetypeId, before[0].archetypeId);
  assert.deepEqual(after[0].traits, before[0].traits);
  assert.deepEqual(after[1], before[1]);
});

// invariant: resurrection-renewal
// To do 12; loop `death.test.ts:77`-`81`.
test("a death at the very moment of readiness uses the resurrection, and a death a millisecond before takes everything", () => {
  const at = settleDeath(fallen(T0), T0).state;
  assert.equal(at.run.deathSettlement.kind, "resurrectionUsed");
  const before = settleDeath(fallen(T0), T0 - 1).state;
  assert.equal(before.run.deathSettlement.kind, "progressLost");
});

// invariant: resurrection-renewal
// Q11, To do 13: the moment follows the clock, so the pace plays no part.
test("the renewal does not depend on the pace of the map run", () => {
  const fast = died(setPace(team(), 16).state);
  assert.equal(
    ala(settleDeath(fast, T0).state).resurrectionReadyAtMs,
    T0 + RENEWAL_MS,
  );
});

// invariant: resurrection-renewal
// To do 13: the renewal runs while the game is closed, as the state holds a moment, not a countdown.
test("a resurrection used up is ready again at its moment after a save and a load, and the next death goes by it", () => {
  const settled = settleDeath(fallen(), T0).state;
  const loaded = loadSavedGame(savedGame(end(settled).state));
  assert.equal(loaded.ok, true);
  const back = loaded.state;
  assert.equal(resurrectionReady(ala(back), T0 + RENEWAL_MS - 1), false);
  assert.equal(resurrectionReady(ala(back), T0 + RENEWAL_MS), true);

  const early = settleDeath(died(back), T0 + RENEWAL_MS - 1).state;
  assert.equal(early.run.deathSettlement.kind, "progressLost");
  assert.equal(ala(early).resurrectionReadyAtMs, T0 + RENEWAL_MS);

  const renewed = settleDeath(died(back), T0 + RENEWAL_MS).state;
  assert.equal(renewed.run.deathSettlement.kind, "resurrectionUsed");
  assert.equal(ala(renewed).resurrectionReadyAtMs, T0 + 2 * RENEWAL_MS);
});

// D-07, Q11: a clock set back is the player's own; the moment is stored as the arithmetic gives it.
test("a moment below zero settles as any other", () => {
  const state = fallen(-20_000);
  const settled = settleDeath(state, -5_000).state;
  assert.equal(ala(settled).resurrectionReadyAtMs, RENEWAL_MS - 5_000);
  assert.equal(settled.run.deathSettlement.kind, "resurrectionUsed");
});

/** Las with `state`'s run marked as a run of a solved map. */
const onSolvedMap = (state) => ({ ...state, solvedMaps: ["forest"] });

// To do 14; D-61, D-190, D-194; Q1, Q3. A death pays nothing, and the map run stays ended in death.
test("a death ends the map run, pays nothing and takes what it carried, a resurrection ready or not, on a solved map too", () => {
  for (const [name, start, kind] of [
    ["ready", team(), "resurrectionUsed"],
    ["not ready", readyFrom(team(), T0 + 1), "progressLost"],
    ["ready, solved map", onSolvedMap(team()), "resurrectionUsed"],
    [
      "not ready, solved map",
      onSolvedMap(readyFrom(team(), T0 + 1)),
      "progressLost",
    ],
  ]) {
    const state = died(start);
    const settled = settleDeath(state, T0).state;
    assert.equal(settled.run.deathSettlement.kind, kind, name);
    assert.deepEqual(settled.run.death, state.run.death, name);
    assert.equal(settled.run.deposited, null, name);
    assert.deepEqual(settled.team.chest, state.team.chest, name);
    if (kind === "resurrectionUsed")
      assert.deepEqual(ala(settled).skills, ala(state).skills, name);
    // Nothing it carried comes back: at the headquarters the chest stands as the death left it.
    assert.deepEqual(end(settled).state.team.chest, state.team.chest, name);
  }
});

/**
 * A program that explores, then walks its rounds with the branch action „Obchód” wherever sticks
 * lie, then wanders, as `tests/sim/saved-game.test.mjs` patrols.
 */
const PATROLLING = programFromRules(
  { condition: ALWAYS, action: { kind: "explore" } },
  { condition: ALWAYS, action: { kind: "patrol", resource: "stick" } },
  { condition: ALWAYS, action: { kind: "wander" } },
);

// To do 14: the practice a map run gathered goes with it.
test("the practice a dying character gathered reaches no skill, a resurrection ready or not", () => {
  const program = setProgram(team(), PATROLLING).state;
  const state = died(program);
  assert.ok(
    state.run.practice.exploration > 0,
    "precondition: the run gathered practice",
  );
  assert.deepEqual(
    ala(settleDeath(state, T0).state).skills,
    ala(program).skills,
  );
  const lost = settleDeath(died(readyFrom(program, T0 + 1)), T0).state;
  assert.equal(ala(lost).skills.exploration.practice, 0);
});

// To do 15; loop `death.test.ts:61`-`75`.
test("the programs, the chest, the Understanding and the solved maps survive every death", () => {
  for (const readyAtMs of [0, T0 + 1]) {
    const state = died(onSolvedMap(readyFrom(team(), readyAtMs)));
    const settled = settleDeath(state, T0).state;
    assert.deepEqual(settled.programs, state.programs);
    assert.deepEqual(settled.team.chest, state.team.chest);
    assert.deepEqual(settled.understanding, state.understanding);
    assert.deepEqual(settled.solvedMaps, state.solvedMaps);
  }
});

// invariant: death-settled-once
// To do 16; loop `death.test.ts:83`-`87`: a later settling, however late, is the same state.
test("a death settled is not settled again, however late", () => {
  for (const readyAtMs of [0, T0 + 1]) {
    const once = settleDeath(fallen(readyAtMs), T0).state;
    for (const later of [T0, T0 + 1, T0 + RENEWAL_MS + 1]) {
      const again = settleDeath(once, later);
      assert.equal(again.state, once);
      assert.deepEqual(again.events, []);
    }
  }
});

// invariant: death-settled-once
// To do 16; spec, decision 10: a load on the screen after a death settles nothing.
test("a settled death saved and loaded on its screen is left as it stood by a later settling", () => {
  for (const readyAtMs of [0, T0 + 1]) {
    const settled = settleDeath(fallen(readyAtMs), T0).state;
    const loaded = loadSavedGame(savedGame(settled));
    assert.equal(loaded.ok, true);
    assert.deepEqual(loaded.state, settled);
    assert.equal(
      settleDeath(loaded.state, T0 + 2 * RENEWAL_MS).state,
      loaded.state,
    );
  }
});

// Spec, decision 4: where there is nothing to settle the moment is not even looked at.
test("with nothing to settle the very state comes back, whatever the moment", () => {
  const going = send(team(), SENT, T0).state;
  const completed = {
    ...going,
    run: { ...going.run, completion: { minute: 0 } },
  };
  for (const [name, state] of [
    ["a new game", newGame()],
    ["no map run", team()],
    ["a map run going on", going],
    ["a completion", completed],
  ]) {
    for (const nowMs of [T0, Number.NaN, 1.5, undefined]) {
      const result = settleDeath(state, nowMs);
      assert.equal(result.state, state, name);
      assert.deepEqual(result.events, [], name);
    }
  }
});

// Spec, decision 4: a moment the load would refuse never enters the game state.
test("a moment that is no safe integer is refused at a death to settle", () => {
  const state = fallen();
  for (const nowMs of [
    Number.NaN,
    Infinity,
    1.5,
    2 ** 53,
    -(2 ** 53),
    "1760000000000",
    undefined,
    null,
  ])
    assert.throws(() => settleDeath(state, nowMs), RangeError, `${nowMs}`);
});

test("settling a death changes nothing passed to it", () => {
  for (const readyAtMs of [0, T0 + 1]) {
    const state = fallen(readyAtMs);
    const before = structuredClone(state);
    settleDeath(state, T0);
    assert.deepEqual(state, before);
  }
});

// Spec, decision 4: the passing of game time leaves the settling to whoever knows real time.
test("game time settles no death: a death stands unsettled after advanceMinutes and passRealTime", () => {
  const sent = send(team(), SENT, T0).state;
  for (const state of [
    advanceMinutes(sent, LONGER_THAN_A_LIFE).state,
    passRealTime(sent, LONGER_THAN_A_LIFE * 1000).state,
  ]) {
    assert.ok(state.run.death, "precondition: the character died");
    assert.equal(state.run.deathSettlement, null);
    assert.deepEqual(ala(state), ala(sent));
  }
});

test("a map run starts with no settlement", () => {
  assert.equal(send(team(), SENT, T0).state.run.deathSettlement, null);
  const settled = settleDeath(fallen(), T0).state;
  assert.equal(restart(settled).state.run.deathSettlement, null);
});

/** The kinds of the program actions a map run starts as it goes on to its end. */
function actionsStarted(state) {
  return advanceMinutes(state, LONGER_THAN_A_LIFE)
    .events.filter(
      (event) =>
        event.kind === "activityStarted" && event.activity.kind === "rule",
    )
    .map((event) => event.activity.action.kind);
}

// To do 17; D-200: the run on the screen keeps what it started with, whatever the death took.
test("a death that takes everything leaves the map run on the screen as it was", () => {
  const state = fallen(T0 + 1);
  const settled = settleDeath(state, T0).state;
  assert.deepEqual(settled.run.character.skills, state.run.character.skills);
  assert.equal(branchRank(settled.run.character.skills, "patrol"), 1);
  assert.deepEqual(settled.run.practice, state.run.practice);
});

// To do 17, spec decision 6; loop `death.test.ts:113`-`127`: what a character can do follows it, and
// what the player knows stays. Catches a „Restart” giving the run back the ranks the death took.
test("„Restart” after a death that took everything starts from the team: a branch action drops out of the run and stays in the Understanding and the copy", () => {
  const program = setProgram(team(), PATROLLING).state;
  const start = send(program, SENT, T0).state;
  assert.ok(actionsStarted(start).includes("patrol"), "precondition");
  const settled = settleDeath(died(readyFrom(program, T0 + 1)), T0).state;
  const restarted = restart(settled).state;
  assert.equal(restarted.run.seed, settled.run.seed);
  assert.equal(restarted.run.character.skills.smallItemGathering.practice, 0);
  assert.equal(branchRank(restarted.run.character.skills, "patrol"), 0);
  assert.ok(!actionsStarted(restarted).includes("patrol"));
  assert.ok(restarted.understanding.actions.includes("patrol"));
  assert.deepEqual(restarted.run.copy.program, settled.run.copy.program);
  assert.equal(
    restarted.run.copy.program.groups[0].rules[1].action.kind,
    "patrol",
  );
});

// Spec, decision 6; D-200: only a death that took everything reads the team.
test("„Restart” after a resurrection used, and of a map run going on, starts from the run it replaces", () => {
  const program = setProgram(team(), PATROLLING).state;
  const settled = settleDeath(died(program), T0).state;
  const restarted = restart(settled).state;
  assert.equal(branchRank(restarted.run.character.skills, "patrol"), 1);
  assert.ok(actionsStarted(restarted).includes("patrol"));

  const going = send(program, SENT, T0).state;
  const skills = { ...ala(going).skills, eating: { practice: 0, ranks: {} } };
  const changedTeam = {
    ...going,
    team: {
      ...going.team,
      characters: [
        { ...ala(going), skills },
        ...going.team.characters.slice(1),
      ],
    },
  };
  assert.equal(
    restart(changedTeam).state.run.character.skills.eating.practice,
    20,
  );
});

// Spec, decision 6: the character the team holds, not any first one.
test("„Restart” after a death that took everything reads the character that died", () => {
  const start = readyFrom(team(), T0 + 1);
  const [first, second] = start.team.characters;
  const secondSkilled = {
    ...second,
    resurrectionReadyAtMs: T0 + 1,
    skills: { ...second.skills, eating: { practice: 3, ranks: {} } },
  };
  const state = {
    ...start,
    team: { ...start.team, characters: [first, secondSkilled] },
  };
  const fell = advanceMinutes(
    send(state, { mapId: "forest", characterId: 2 }, T0).state,
    LONGER_THAN_A_LIFE,
  ).state;
  const settled = settleDeath(fell, T0).state;
  assert.equal(settled.team.characters[1].generation, 2);
  assert.equal(settled.team.characters[1].skills.eating.practice, 0);
  assert.equal(settled.team.characters[0].skills.eating.practice, 20);
  assert.equal(settled.team.characters[0].generation, 1);
  const restarted = restart(settled).state;
  assert.equal(restarted.run.character.id, 2);
  assert.equal(restarted.run.character.skills.eating.practice, 0);
});
