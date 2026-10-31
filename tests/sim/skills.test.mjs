// Expectations: accepted task wprawa_i_drzewa_loop2.md, To do and Questions 1–12.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/public/sim/data/maps.js";
import { SKILLS } from "../../dist/public/sim/data/skills.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setProgram,
} from "../../dist/public/sim/game.js";
import {
  newMapRun,
  pickActivity,
  stepMinute,
} from "../../dist/public/sim/run.js";
import { resolveCombat } from "../../dist/public/sim/combat.js";
import { actionFeasible } from "../../dist/public/sim/program.js";
import { nextRandom } from "../../dist/public/sim/random.js";
import { neighbours } from "../../dist/public/sim/hex.js";
import {
  branchRank,
  buyBranch,
  skillProgress,
} from "../../dist/public/sim/skills.js";
import { editorRepertoire } from "../../dist/public/sim/understanding.js";
import { programFromRules } from "./program-fixture.mjs";
import { fullUnderstanding } from "./understanding-fixture.mjs";

const ids = { mapId: "forest", characterId: 1 };
const empty = programFromRules();
const program = (action) =>
  programFromRules({ condition: { kind: "always" }, action });
const ranks = (skill, purchased, practice = 1000) => ({
  [skill]: { practice, ranks: purchased },
});
const base = (skills = {}) =>
  newMapRun(MAPS.forest, 1, empty, ids, undefined, skills).run;
function ready(action, skills = {}) {
  const run = base(skills);
  return {
    ...run,
    tiles: run.tiles.map((tile) => ({
      ...tile,
      revealed: true,
      stock: { stick: 12, berry: 8 },
    })),
    current: {
      activity: { kind: "rule", ruleId: 1, action },
      startMinute: 0,
      endMinute: 1,
      stepTo: null,
    },
  };
}
function landed(run) {
  return stepMinute(run, MAPS.forest, empty).run;
}
function randomBetween(low, high) {
  for (let value = 1; ; value += 1) {
    const draw = nextRandom(value).value;
    if (draw >= low && draw < high) return value;
  }
}
function headquarters() {
  const state = createCharacter(
    createCharacter(newGame(), "Ala").state,
    "Ola",
  ).state;
  return {
    ...state,
    understanding: fullUnderstanding(),
    team: {
      ...state.team,
      characters: state.team.characters.map((character) => ({
        ...character,
        skills: Object.fromEntries(
          Object.keys(SKILLS).map((id) => [id, { practice: 1000, ranks: {} }]),
        ),
      })),
    },
  };
}

test("new characters own independent zero practice and empty ranks, with level one and no points", () => {
  const state = createCharacter(
    createCharacter(newGame(), "Ala").state,
    "Ola",
  ).state;
  for (const id of Object.keys(SKILLS)) {
    assert.deepEqual(state.team.characters[0].skills[id], {
      practice: 0,
      ranks: {},
    });
    assert.notEqual(
      state.team.characters[0].skills[id],
      state.team.characters[1].skills[id],
    );
    assert.equal(skillProgress(state.team.characters[0].skills, id).level, 1);
    assert.equal(skillProgress(state.team.characters[0].skills, id).points, 0);
  }
});

test("all accepted cumulative thresholds grant exactly one point and level each, then stop", () => {
  const expected = {
    smallItemGathering: [30, 80, 160, 280, 450],
    campfireCrafting: [20, 55, 110, 190],
    flameSpell: [2, 6, 14],
    exploration: [15, 45, 100, 200],
    oneHandedCombat: [30, 90, 200],
    kicking: [20],
    dodging: [10, 30],
    eating: [15, 40, 80],
  };
  for (const [id, thresholds] of Object.entries(expected)) {
    thresholds.forEach((threshold, index) => {
      assert.equal(
        skillProgress(ranks(id, {}, threshold - 1), id).level,
        index + 1,
      );
      assert.deepEqual(skillProgress(ranks(id, {}, threshold), id), {
        level: index + 2,
        points: index + 1,
        next: thresholds[index + 1] ?? null,
      });
    });
    assert.equal(
      skillProgress(ranks(id, {}, 100000), id).points,
      thresholds.length,
    );
  }
});

test("purchases charge successive costs in one skill, cannot overspend or exceed rank, and never affect another character", () => {
  let state = headquarters();
  const input = state;
  const original = structuredClone(state);
  for (let count = 0; count < 2; count++)
    state = buyBranch(state, 1, "neatConstruction").state;
  assert.equal(
    branchRank(state.team.characters[0].skills, "neatConstruction"),
    2,
  );
  assert.equal(
    skillProgress(state.team.characters[0].skills, "campfireCrafting").points,
    1,
  );
  assert.equal(buyBranch(state, 1, "neatConstruction").state, state);
  state = buyBranch(state, 1, "carefulFeeding").state;
  assert.equal(
    skillProgress(state.team.characters[0].skills, "campfireCrafting").points,
    0,
  );
  assert.deepEqual(state.team.characters[1], original.team.characters[1]);
  let kicking = buyBranch(headquarters(), 1, "heavierKick").state;
  assert.equal(buyBranch(kicking, 1, "heavierKick").state, kicking);
  let flame = buyBranch(headquarters(), 1, "cleanFlame").state;
  assert.equal(buyBranch(flame, 1, "cleanFlame").state, flame);
  assert.deepEqual(input, original);
});

test("unknown trees, unknown characters, no skill and every retained run refuse purchase", () => {
  const state = headquarters();
  assert.equal(buyBranch(state, 99, "keenEye").state, state);
  const unknown = {
    ...state,
    understanding: { ...state.understanding, trees: [] },
  };
  assert.equal(buyBranch(unknown, 1, "keenEye").state, unknown);
  const absent = {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...state.team.characters[0], skills: {} }],
    },
  };
  assert.equal(buyBranch(absent, 1, "keenEye").state, absent);
  for (const patch of [
    {},
    { completion: { minute: 1 } },
    { death: { minute: 1, cause: "cold" } },
  ]) {
    const running = send(state, ids, 1).state;
    const held = { ...running, run: { ...running.run, ...patch } };
    assert.equal(buyBranch(held, 1, "keenEye").state, held);
  }
});

// invariant: action-duration-minimum
// Accepted Q7 and Q8: 5 - 3*2 is clamped to one minute.
test("every walking action with Długi krok rank three lasts at least one minute", () => {
  const skills = ranks("exploration", { longStep: 3 }, 200);
  const run = ready({ kind: "wander" }, skills);
  for (const action of [
    { kind: "wander" },
    { kind: "walkTo", resource: "stick" },
    { kind: "walkToCampfire" },
  ]) {
    const elsewhere = run.tiles.find(
      (tile) =>
        tile.at.q !== run.character.at.q || tile.at.r !== run.character.at.r,
    );
    const fixture = {
      ...run,
      tiles: run.tiles.map((tile) => ({
        ...tile,
        stock: tile === elsewhere ? { stick: 12 } : {},
      })),
      campfires: [{ at: elsewhere.at, minutesLeft: 0 }],
    };
    const picked = pickActivity(fixture, MAPS.forest, program(action)).run;
    assert.equal(picked.current.activity.action.kind, action.kind);
    assert.equal(picked.current.endMinute - picked.current.startMinute, 1);
  }
});

test("numeric branches shorten exploration, crafting, both spells and eating at action start", () => {
  for (const [action, skill, purchased, expected] of [
    [{ kind: "explore" }, "exploration", { practicedStep: 3 }, 11],
    [
      { kind: "craftCampfire" },
      "campfireCrafting",
      { neatConstruction: 2 },
      10,
    ],
    [{ kind: "lightCampfire" }, "flameSpell", { quickHand: 3 }, 2],
    [{ kind: "lightItem" }, "flameSpell", { quickHand: 3 }, 2],
    [{ kind: "eat" }, "eating", { quickMeal: 3 }, 2],
  ]) {
    const run = ready(action, ranks(skill, purchased));
    const fixture = {
      ...run,
      tiles: run.tiles.map((tile) => ({
        ...tile,
        revealed: action.kind !== "explore",
      })),
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, stick: 6, berry: 1 },
      },
      campfires:
        action.kind === "lightCampfire"
          ? [{ at: run.character.at, minutesLeft: 0 }]
          : [],
    };
    const picked = pickActivity(fixture, MAPS.forest, program(action)).run;
    assert.equal(picked.current.endMinute, expected);
  }
});

test("meal and walking bonuses apply to their own actions when both are bought", () => {
  // Accepted Q8: Szybki posiłek 1 shortens eating 5 - 1 = 4;
  // Długi krok 1 shortens walking 5 - 2 = 3, not both by their sum.
  const skills = {
    ...ranks("eating", { quickMeal: 1 }, 15),
    ...ranks("exploration", { longStep: 1 }, 15),
  };
  const run = base(skills);
  const fixture = {
    ...run,
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, berry: 1 },
    },
  };
  const before = structuredClone(fixture);
  for (const [kind, minutes] of [
    ["eat", 4],
    ["wander", 3],
  ]) {
    const started = pickActivity(fixture, MAPS.forest, program({ kind })).run;
    assert.equal(started.current.activity.action.kind, kind);
    assert.equal(
      started.current.endMinute - started.current.startMinute,
      minutes,
    );
  }
  assert.deepEqual(fixture, before);
});

test("send and restart take independent rank snapshots and a restart discards run practice", () => {
  const hq = buyBranch(headquarters(), 1, "patrol").state;
  const before = structuredClone(hq);
  const sent = send(hq, ids, 1).state;
  assert.notEqual(sent.run.character.skills, hq.team.characters[0].skills);
  assert.notEqual(
    sent.run.character.skills.smallItemGathering.ranks,
    hq.team.characters[0].skills.smallItemGathering.ranks,
  );
  const changed = {
    ...sent,
    team: headquarters().team,
    run: { ...sent.run, practice: { smallItemGathering: 4 } },
  };
  const restarted = restart(changed).state;
  assert.equal(branchRank(restarted.run.character.skills, "patrol"), 1);
  assert.deepEqual(restarted.run.practice, {});
  assert.deepEqual(hq, before);
});

test("practice appears at the effect minute, once for all tiles of Zwiad, and never on an already revealed tile", () => {
  const run = base(ranks("exploration", { scout: 1 }));
  const started = pickActivity(
    run,
    MAPS.forest,
    program({ kind: "explore" }),
  ).run;
  let current = started;
  for (let minute = 0; minute < 19; minute++) current = landed(current);
  assert.deepEqual(current.practice, {});
  const finished = stepMinute(current, MAPS.forest, empty);
  assert.deepEqual(finished.run.practice, { exploration: 1 });
  assert.equal(
    finished.events.filter((event) => event.kind === "tileRevealed").length,
    7,
  );
  assert.equal(
    actionFeasible(finished.run, MAPS.forest, { kind: "explore" }),
    false,
  );
});

test("gather miss grants none, an improved chance hits, and full hand respects stock and backpack limits", () => {
  const action = { kind: "gather", resource: "stick" };
  const miss = { ...ready(action), gatherRandom: randomBetween(0.71, 0.74) };
  assert.deepEqual(landed(miss).practice, {});
  const improved = {
    ...miss,
    character: {
      ...miss.character,
      skills: ranks("smallItemGathering", { keenEye: 1 }),
    },
  };
  assert.equal(landed(improved).character.backpack.stick, 1);
  for (const [stock, carried, expected] of [
    [12, 0, 2],
    [1, 0, 1],
    [12, 14, 1],
    [12, 15, 0],
    [0, 0, 0],
  ]) {
    const run = ready(action, ranks("smallItemGathering", { fullHand: 1 }));
    const fixture = {
      ...run,
      gatherRandom: randomBetween(0, 0.7),
      tiles: run.tiles.map((tile) => ({ ...tile, stock: { stick: stock } })),
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, berry: carried },
      },
    };
    const result = landed(fixture);
    assert.equal(result.character.backpack.stick, expected);
    assert.deepEqual(
      result.practice,
      expected ? { smallItemGathering: 1 } : {},
    );
  }
});

test("Obchód is guaranteed, lasts 40 minutes, takes at most 12, available stock and free space, and leaves random stream alone", () => {
  const action = { kind: "patrol", resource: "stick" };
  for (const [stock, carried, expected] of [
    [20, 0, 12],
    [3, 0, 3],
    [20, 13, 2],
    [0, 0, 0],
    [20, 15, 0],
  ]) {
    const run = ready(action, ranks("smallItemGathering", { patrol: 1 }));
    const fixture = {
      ...run,
      tiles: run.tiles.map((tile) => ({ ...tile, stock: { stick: stock } })),
      character: {
        ...run.character,
        backpack: { ...run.character.backpack, berry: carried },
      },
    };
    const result = landed(fixture);
    assert.equal(result.character.backpack.stick, expected);
    assert.equal(result.gatherRandom, run.gatherRandom);
    assert.deepEqual(
      result.practice,
      expected ? { smallItemGathering: 1 } : {},
    );
    const picked = pickActivity(fixture, MAPS.forest, program(action)).run;
    assert.equal(picked.current.activity.kind, expected ? "rule" : "wait");
    if (expected) assert.equal(picked.current.endMinute, 40);
  }
  assert.equal(actionFeasible(ready(action), MAPS.forest, action), false);
});

test("clean flame needs no stick but still costs ten energy; item lighting still needs its piece", () => {
  const action = { kind: "lightCampfire" };
  const run = ready(action, ranks("flameSpell", { cleanFlame: 1 }));
  const fixture = {
    ...run,
    natureEnergy: 10,
    body: { ...run.body, satiety: 30 },
    campfires: [{ at: run.character.at, minutesLeft: 0 }],
  };
  assert.equal(actionFeasible(fixture, MAPS.forest, action), true);
  assert.equal(
    actionFeasible({ ...fixture, natureEnergy: 9 }, MAPS.forest, action),
    false,
  );
  const result = landed(fixture);
  assert.equal(result.natureEnergy, 0);
  assert.equal(result.campfires[0].minutesLeft, 60);
  assert.equal(result.character.backpack.stick, 0);
  assert.deepEqual(result.practice, { flameSpell: 1 });
  assert.equal(
    actionFeasible(fixture, MAPS.forest, { kind: "lightItem" }),
    false,
  );
  assert.deepEqual(landed({ ...fixture, natureEnergy: 9 }).practice, {});
});

test("crafting, feeding, item lighting and eating grant one only when their effect lands, even eating at full satiety", () => {
  for (const [kind, skill, pieces] of [
    ["craftCampfire", "campfireCrafting", 6],
    ["feedCampfire", "campfireCrafting", 1],
    ["lightItem", "flameSpell", 1],
    ["eat", "eating", 1],
  ]) {
    const run = ready(
      { kind },
      ranks("campfireCrafting", { carefulFeeding: 2 }),
    );
    const fixture = {
      ...run,
      body: { ...run.body, satiety: 101 },
      character: {
        ...run.character,
        backpack: {
          ...run.character.backpack,
          [kind === "eat" ? "berry" : "stick"]: pieces,
        },
      },
      campfires:
        kind === "feedCampfire"
          ? [{ at: run.character.at, minutesLeft: 10 }]
          : [],
    };
    const result = landed(fixture);
    assert.deepEqual(result.practice, { [skill]: 1 });
    if (kind === "feedCampfire")
      assert.equal(result.campfires[0].minutesLeft, 39);
    if (kind === "eat") assert.equal(result.body.satiety, 100);
    assert.deepEqual(
      landed({ ...fixture, character: run.character }).practice,
      {},
    );
  }
});

test("combat practice counts damaging effects and effective dodges, not last or unused dodge requests", () => {
  const stick = {
    ...base(ranks("oneHandedCombat", { strongerStrike: 3 })),
    character: {
      ...base(ranks("oneHandedCombat", { strongerStrike: 3 })).character,
      backpack: { stick: 1, berry: 0, moss: 0, fiber: 0 },
    },
  };
  const hit = resolveCombat(
    stick,
    MAPS.forestDeep,
    "wolf",
    program({ kind: "strikeWithStick" }),
  );
  assert.equal(hit.exchanges[0].characterAction.damage, 12);
  assert.deepEqual(hit.practice, { oneHandedCombat: 2 });
  const kick = resolveCombat(
    base(ranks("kicking", { heavierKick: 1 }, 20)),
    MAPS.forestDeep,
    "wolf",
    program({ kind: "kick" }),
  );
  assert.equal(kick.exchanges[0].characterAction.damage, 4);
  const dodged = resolveCombat(
    base(ranks("dodging", { agileDodge: 2 }, 30)),
    MAPS.forestDeep,
    "wolf",
    program({ kind: "dodge" }),
  );
  assert.equal(dodged.characterHealth, 93);
  assert.deepEqual(dodged.practice, { dodging: 39 });
  const dead = resolveCombat(
    { ...base(), body: { temperature: 37, satiety: 100, health: 7 } },
    MAPS.forestDeep,
    "wolf",
    program({ kind: "dodge" }),
  );
  assert.deepEqual(dead.practice, {});
});

test("the combat resolution minute adds its successful strikes to the run's earlier practice", () => {
  // Accepted Q8: 6 + 3*2 = 12 damage, so two strikes defeat the 24-health wolf.
  // The two effects add to three earlier strikes, while seven gathers stay seven.
  const run = newMapRun(
    MAPS.forestDeep,
    1,
    empty,
    { ...ids, mapId: "forestDeep" },
    undefined,
    ranks("oneHandedCombat", { strongerStrike: 3 }, 200),
  ).run;
  const fixture = {
    ...run,
    minute: 4,
    practice: { smallItemGathering: 7, oneHandedCombat: 3 },
    character: {
      ...run.character,
      backpack: { ...run.character.backpack, stick: 1 },
    },
    activeCombat: { creatureId: "wolf", attackMinute: 0, resolveMinute: 5 },
  };
  const before = structuredClone(fixture);
  const result = stepMinute(
    fixture,
    MAPS.forestDeep,
    program({ kind: "strikeWithStick" }),
  );
  assert.equal(result.run.minute, 5);
  assert.equal(result.run.activeCombat, null);
  assert.equal(result.run.lastCombat.result.outcome, "creatureDefeated");
  assert.deepEqual(result.run.practice, {
    smallItemGathering: 7,
    oneHandedCombat: 5,
  });
  assert.deepEqual(fixture, before);
});

// A run that holds no mark pays even when its map has been solved since it started (To do 2, 3);
// the loop test is src/sim/skills.test.ts:470-480. A marked run pays nothing: tests/sim/trip.test.mjs.
test("completion pays this minute's practice once to the runner of a run begun before its map was solved; death and early exits pay nothing", () => {
  const sent = send(headquarters(), ids, 1).state;
  const fixture = {
    ...sent,
    solvedMaps: ["forest"],
    run: {
      ...sent.run,
      streak: 479,
      practice: { smallItemGathering: 7 },
      current: ready({ kind: "eat" }).current,
      character: {
        ...sent.run.character,
        backpack: { ...sent.run.character.backpack, berry: 1 },
      },
    },
  };
  const before = structuredClone(fixture);
  const result = advanceMinutes(fixture, 1).state;
  assert.ok(result.run.completion);
  assert.equal(
    result.team.characters[0].skills.smallItemGathering.practice,
    1007,
  );
  assert.equal(result.team.characters[0].skills.eating.practice, 1001);
  assert.equal(result.team.characters[1].skills.eating.practice, 1000);
  assert.equal(advanceMinutes(result, 100).state, result);
  assert.equal(end(result).state.team, result.team);
  for (const exited of [end(fixture).state, restart(fixture).state])
    assert.equal(
      exited.team.characters[0].skills.smallItemGathering.practice,
      1000,
    );
  const dying = {
    ...fixture,
    run: {
      ...fixture.run,
      body: { temperature: 34, satiety: 100, health: 0.1 },
    },
  };
  const dead = advanceMinutes(dying, 1).state;
  assert.ok(dead.run.death);
  assert.equal(
    dead.team.characters[0].skills.smallItemGathering.practice,
    1000,
  );
  assert.deepEqual(dead.run.practice, { smallItemGathering: 7 });
  assert.deepEqual(fixture, before);
});

test("Obchód is known with its tree but offered only in its owner's run; an unavailable rule stays and is skipped", () => {
  const hq = buyBranch(headquarters(), 1, "patrol").state;
  assert.ok(hq.understanding.actions.includes("patrol"));
  assert.equal(editorRepertoire(hq).actions.includes("patrol"), false);
  const programmed = setProgram(
    hq,
    programFromRules(
      {
        condition: { kind: "always" },
        action: { kind: "patrol", resource: "stick" },
      },
      { condition: { kind: "always" }, action: { kind: "wander" } },
    ),
  ).state;
  const owner = send(programmed, ids, 1).state;
  assert.equal(editorRepertoire(owner).actions.includes("patrol"), true);
  const other = send(programmed, { ...ids, characterId: 2 }, 1).state;
  assert.equal(editorRepertoire(other).actions.includes("patrol"), false);
  assert.equal(other.run.current.activity.ruleId, 2);
  assert.equal(other.run.copy.program.groups[0].rules[0].action.kind, "patrol");
});

test("scout discovers neighboring resources and the gathering tree with Obchód in the same paused minute", () => {
  const hq = createCharacter(newGame(), "Ala").state;
  const sent = send(hq, ids, 1).state;
  const run = base(ranks("exploration", { scout: 1 }));
  const neighbor = neighbours(run.tiles, run.character.at)[0];
  const fixture = {
    ...sent,
    run: {
      ...run,
      copy: sent.run.copy,
      current: ready({ kind: "explore" }).current,
      tiles: run.tiles.map((tile) => ({
        ...tile,
        stock: tile === neighbor ? { fiber: 1 } : { stick: 1 },
      })),
    },
  };
  const result = advanceMinutes(fixture, 10);
  assert.equal(result.state.run.minute, 1);
  assert.equal(result.state.paused, true);
  assert.deepEqual(result.state.discovery.trees, ["smallItemGathering"]);
  assert.ok(result.state.discovery.actions.includes("patrol"));
  assert.ok(result.state.understanding.items.includes("fiber"));
  assert.deepEqual(result.state.run.practice, { exploration: 1 });
});
