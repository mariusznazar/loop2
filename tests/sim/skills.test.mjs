// Expectations: D-191, D-193, D-194, D-197, D-198, D-374 and D-379 in foundations/decisions.md.
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { SKILLS } from "../../dist/browser/sim/data/skills.js";
import {
  advanceMinutes,
  createCharacter,
  end,
  newGame,
  restart,
  send,
  setPaused,
  setProgram,
} from "../../dist/browser/sim/game.js";
import {
  newMapRun,
  pickActivity,
  stepMinute,
} from "../../dist/browser/sim/run.js";
import { resolveCombat } from "../../dist/browser/sim/combat.js";
import { actionFeasible } from "../../dist/browser/sim/program.js";
import { nextRandom } from "../../dist/browser/sim/random.js";
import { neighbours } from "../../dist/browser/sim/hex.js";
import {
  branchRank,
  buyBranch,
  skillProgress,
} from "../../dist/browser/sim/skills.js";
import { editorRepertoire } from "../../dist/browser/sim/understanding.js";
import { programFromRules } from "./program-fixture.mjs";
import { fullUnderstanding, withEdgeSolved } from "./understanding-fixture.mjs";

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
    createCharacter(withEdgeSolved(newGame()), "Ala").state,
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
  // decision: D-191 "A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two"
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

test("all cumulative thresholds of D-379 grant exactly one point and level each, then stop", () => {
  // decision: D-191 "A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two"
  // decision: D-191 "Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before"
  // decision: D-379 "The nine character skills give a level and a point at each of these amounts of practice"
  const expected = {
    smallItemGathering: [30, 80, 160, 280, 450],
    campfireCrafting: [20, 55, 110, 190],
    flameSpell: [2, 6, 14],
    exploration: [15, 45, 100, 200],
    oneHandedCombat: [15, 40, 100, 300],
    kicking: [10, 30],
    dodging: [4, 15],
    eating: [15, 40, 80],
    tending: [10, 28, 60, 110],
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
  // decision: D-191 "A character skill has one practice counter and one curve, and what is saved of it is its practice and the ranks of branches bought, its level, free points and every effect being computed from these two"
  // decision: D-191 "Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
  kicking = buyBranch(kicking, 1, "heavierKick").state;
  assert.equal(branchRank(kicking.team.characters[0].skills, "heavierKick"), 2);
  assert.equal(buyBranch(kicking, 1, "heavierKick").state, kicking);
  let flame = buyBranch(headquarters(), 1, "cleanFlame").state;
  assert.equal(buyBranch(flame, 1, "cleanFlame").state, flame);
  assert.deepEqual(input, original);
});

test("Mocniejszy cios has four ranks at one point each, and its fifth purchase is refused", () => {
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  let state = headquarters();
  for (let count = 0; count < 4; count++)
    state = buyBranch(state, 1, "strongerStrike").state;
  assert.equal(
    branchRank(state.team.characters[0].skills, "strongerStrike"),
    4,
  );
  assert.equal(
    skillProgress(state.team.characters[0].skills, "oneHandedCombat").points,
    0,
  );
  assert.equal(buyBranch(state, 1, "strongerStrike").state, state);
});

// Catches a purchase let through while a manual map run goes on, the one wait in which the game
// still refuses it.
test("unknown trees, unknown characters, no skill and a manual map run that goes on refuse purchase", () => {
  // decision: D-200 "The player buys so also while a manual map run waits in a pause, or has ended and waits for „Restart” or „Zakończ”, and „Restart” then starts with the skills of the map run it replaces, or, after a death that took the character's practice and ranks, with what the character was left with, so not with a rank bought in that wait; while a manual map run goes on, neither paused nor ended, the game refuses a purchase"
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
  const running = send(state, ids, 1).state;
  assert.equal(running.paused, false, "precondition: the map run goes on");
  assert.equal(buyBranch(running, 1, "keenEye").state, running);
  assert.equal(
    buyBranch(running, 2, "keenEye").state,
    running,
    "another character's purchase waits too while the map run goes on",
  );
});

// Catches the old refusal kept for a map run that waits in a pause, at a discovery, or after its end
// in a death or a completion, until „Restart” or „Zakończ”.
test("a purchase is taken while a manual map run waits in a pause or has ended in a death or a completion", () => {
  // decision: D-200 "The player buys so also while a manual map run waits in a pause, or has ended and waits for „Restart” or „Zakończ”"
  const running = send(headquarters(), ids, 1).state;
  for (const [name, waiting] of [
    ["a pause", setPaused(running, true).state],
    [
      "a completion",
      { ...running, run: { ...running.run, completion: { minute: 1 } } },
    ],
    [
      "a death",
      {
        ...running,
        run: { ...running.run, death: { minute: 1, cause: "cold" } },
      },
    ],
  ]) {
    for (const id of [1, 2]) {
      const bought = buyBranch(waiting, id, "keenEye").state;
      const character = bought.team.characters.find((each) => each.id === id);
      assert.equal(
        branchRank(character.skills, "keenEye"),
        1,
        `${name}: ${id}`,
      );
      assert.equal(
        bought.run,
        waiting.run,
        `${name}: the map run stays as it was`,
      );
    }
  }
});

// Catches a rank bought in the wait that reaches the map run going on or the one „Restart” starts,
// and one that does not reach the next map run sent after „Zakończ”.
test("a rank bought while the map run waits leaves its skills as they were; „Restart” starts without it, and the next map run after „Zakończ” starts with it", () => {
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
  // decision: D-200 "The player buys so also while a manual map run waits in a pause, or has ended and waits for „Restart” or „Zakończ”, and „Restart” then starts with the skills of the map run it replaces"
  const running = send(headquarters(), ids, 1).state;
  for (const [name, waiting] of [
    ["a pause", setPaused(running, true).state],
    [
      "a completion",
      { ...running, run: { ...running.run, completion: { minute: 1 } } },
    ],
  ]) {
    const bought = buyBranch(waiting, 1, "patrol").state;
    assert.equal(
      branchRank(bought.team.characters[0].skills, "patrol"),
      1,
      name,
    );
    assert.equal(branchRank(bought.run.character.skills, "patrol"), 0, name);
    const restarted = restart(bought).state;
    assert.equal(branchRank(restarted.run.character.skills, "patrol"), 0, name);
    assert.equal(
      branchRank(restarted.team.characters[0].skills, "patrol"),
      1,
      `${name}: the character keeps the rank`,
    );
    const next = send(end(restarted).state, ids, 2).state;
    assert.equal(branchRank(next.run.character.skills, "patrol"), 1, name);
  }
});

// invariant: action-duration-minimum
// D-374: 5 - 3*2 is clamped to one minute.
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
    const picked = pickActivity(fixture, program(action)).run;
    assert.equal(picked.current.activity.action.kind, action.kind);
    assert.equal(picked.current.endMinute - picked.current.startMinute, 1);
  }
});

test("numeric branches shorten exploration, crafting, both spells and eating at action start", () => {
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
    const picked = pickActivity(fixture, program(action)).run;
    assert.equal(picked.current.endMinute, expected);
  }
});

test("meal and walking bonuses apply to their own actions when both are bought", () => {
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  // D-379: Szybki posiłek 1 shortens eating 5 - 1 = 4;
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
    const started = pickActivity(fixture, program({ kind })).run;
    assert.equal(started.current.activity.action.kind, kind);
    assert.equal(
      started.current.endMinute - started.current.startMinute,
      minutes,
    );
  }
  assert.deepEqual(fixture, before);
});

test("send and restart take independent rank snapshots and a restart discards run practice", () => {
  // decision: D-200 "The player buys a branch rank with „Kup” on the screen Postać, at a character in an earning loop too, and the rank acts from that character's next map run, the next map run of that earning loop included, while the map run going on keeps the skills of its start"
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
  // decision: D-394 "The simulation keeps `actionFeasible`, the function that tells whether an action can start now"
  // decision: D-394 "A clean-up does not remove it because the game has no caller of it"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-198 "With the bought branch „Zwiad”, exploration reveals the current tile and its neighbours together, while still requiring the current tile to be unrevealed"
  const run = base(ranks("exploration", { scout: 1 }));
  const started = pickActivity(run, program({ kind: "explore" })).run;
  let current = started;
  for (let minute = 0; minute < 19; minute++) current = landed(current);
  assert.deepEqual(current.practice, {});
  const finished = stepMinute(current, MAPS.forest, empty);
  assert.deepEqual(finished.run.practice, { exploration: 1 });
  assert.equal(
    finished.events.filter((event) => event.kind === "tileRevealed").length,
    7,
  );
  assert.equal(actionFeasible(finished.run, { kind: "explore" }), false);
});

test("gather miss grants none, an improved chance hits, and full hand respects stock and backpack limits", () => {
  // decision: D-64 "The backpack's cap counts the pieces of all items together"
  // decision: D-191 "A character skill grows by practice, which counts only its actions that ended in effect"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-197 "„Pełna garść” likewise takes no more pieces than remain on the tile or fit in the backpack"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
  // decision: D-394 "The simulation keeps `actionFeasible`, the function that tells whether an action can start now"
  // decision: D-394 "A clean-up does not remove it because the game has no caller of it"
  // decision: D-64 "The backpack's cap counts the pieces of all items together"
  // decision: D-65 "A character carries out a gathering while its backpack holds fewer pieces than its cap"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-197 "The gathering tree has the branch „Obchód”, which opens „Obchód — {zasób}”: a guaranteed batch of the chosen resource from the current tile, up to the amount in the data, the tile’s remaining stock and the backpack’s remaining capacity"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
    const picked = pickActivity(fixture, program(action)).run;
    assert.equal(picked.current.activity.kind, expected ? "rule" : "wait");
    if (expected) assert.equal(picked.current.endMinute, 40);
  }
  assert.equal(actionFeasible(ready(action), action), false);
});

test("clean flame needs no stick but still costs ten energy; item lighting still needs its piece", () => {
  // decision: D-394 "The simulation keeps `actionFeasible`, the function that tells whether an action can start now"
  // decision: D-394 "A clean-up does not remove it because the game has no caller of it"
  // decision: D-63 "With the bought branch „Czysty płomień”, „Zapal — ognisko” requires and consumes no sticks and costs the nature energy of ordinary lighting"
  // decision: D-177 "A mage carries out Płomyk while its nature energy reaches the spell's price"
  // decision: D-175 "Each spell costs the mage nature energy"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  const action = { kind: "lightCampfire" };
  const run = ready(action, ranks("flameSpell", { cleanFlame: 1 }));
  const fixture = {
    ...run,
    natureEnergy: 10,
    body: { ...run.body, satiety: 30 },
    campfires: [{ at: run.character.at, minutesLeft: 0 }],
  };
  assert.equal(actionFeasible(fixture, action), true);
  assert.equal(actionFeasible({ ...fixture, natureEnergy: 9 }, action), false);
  const result = landed(fixture);
  assert.equal(result.natureEnergy, 0);
  assert.equal(result.campfires[0].minutesLeft, 60);
  assert.equal(result.character.backpack.stick, 0);
  assert.deepEqual(result.practice, { flameSpell: 1 });
  assert.equal(actionFeasible(fixture, { kind: "lightItem" }), false);
  assert.deepEqual(landed({ ...fixture, natureEnergy: 9 }).practice, {});
});

test("crafting, feeding, item lighting and eating grant one only when their effect lands, even eating at full satiety", () => {
  // decision: D-191 "A character skill grows by practice, which counts only its actions that ended in effect"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-193 "Eating has its effect when the berry is eaten, even at full satiety"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the main hand of its gear, taken there from the backpack where the hand is empty (D-457), and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  // decision: D-144 "Another dodge refreshes that reduction, the strike consumes it with damage floored at zero"
  // decision: D-191 "A character skill grows by practice, which counts only its actions that ended in effect"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-193 "Eating has its effect when the berry is eaten, even at full satiety; a dodge has its effect when it removes some damage from an enemy strike, counted in the turn of that strike"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  const stick = {
    ...base(ranks("oneHandedCombat", { strongerStrike: 4 })),
    character: {
      ...base(ranks("oneHandedCombat", { strongerStrike: 4 })).character,
      backpack: { stick: 1, berry: 0, moss: 0, fiber: 0 },
    },
  };
  const hit = resolveCombat(
    stick,
    "wolf",
    program({ kind: "strikeWithStick" }),
  );
  assert.equal(hit.exchanges[0].characterAction.damage, 14);
  assert.deepEqual(hit.practice, { oneHandedCombat: 2 });
  const kick = resolveCombat(
    base(ranks("kicking", { heavierKick: 1 }, 20)),
    "wolf",
    program({ kind: "kick" }),
  );
  assert.equal(kick.exchanges[0].characterAction.damage, 4);
  const dodged = resolveCombat(
    base(ranks("dodging", { agileDodge: 2 }, 30)),
    "wolf",
    program({ kind: "dodge" }),
  );
  assert.equal(dodged.characterHealth, 93);
  assert.deepEqual(dodged.practice, { dodging: 39 });
  const dead = resolveCombat(
    { ...base(), body: { temperature: 37, satiety: 100, health: 7 } },
    "wolf",
    program({ kind: "dodge" }),
  );
  assert.deepEqual(dead.practice, {});
});

test("the combat resolution minute adds its successful strikes to the run's earlier practice", () => {
  // decision: D-144 "The character uses „Uderz — patyk”, which requires a stick in the main hand of its gear, taken there from the backpack where the hand is empty (D-457), and deals a base 6 damage increased by its bought branch ranks, „Kopnij”, which deals a base 3 damage increased by its bought branch ranks and needs neither an item nor a target, and „Odskocz”, which sets one pending reduction of a base 5 damage increased by its bought branch ranks for the next damaging enemy strike"
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
  // D-379: 6 + 4*2 = 14 damage, so two strikes defeat the 24-health wolf.
  // The two effects add to three earlier strikes, while seven gathers stay seven.
  const run = newMapRun(
    MAPS.forestDeep,
    1,
    empty,
    { ...ids, mapId: "forestDeep" },
    undefined,
    ranks("oneHandedCombat", { strongerStrike: 4 }, 300),
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

// A run that holds no mark pays even when its map has been solved since it started (D-194, D-214).
// A marked run pays nothing: tests/sim/trip.test.mjs.
test("completion pays this minute's practice once to the runner of a run begun before its map was solved; death and early exits pay nothing", () => {
  // decision: D-194 "A manual map run holds the practice it gathers separately by character skill and pays all of it once to the character making the run in the game minute of the completion that first solves its map, while a manual run of a solved map keeps its practice with the run"
  // decision: D-194 "A run cut short by „Restart” or „Zakończ” before completion leaves the character’s practice and bought ranks as they were"
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
  // decision: D-119 "A character's repertoire is computed from the Understanding through its archetype's predispositions and the branches the character has bought, and is never saved; an action or item of a bought branch is open only to the character that bought it"
  // decision: D-119 "That one computation is at once what the program editor offers and what the simulation lets the character carry out"
  // decision: D-120 "An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype and, for an action opened by a branch, the character has bought that branch"
  // decision: D-196 "Outside a map run the program editor offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches contribute no actions to that editor's offer"
  // decision: D-196 "During a map run, a manual map run that waits in a pause and one that has ended and waits for „Restart” or „Zakończ” included, both the copy editor and the saved-program editor of Programy use the repertoire of the map run's character, including its bought branches"
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
  // decision: D-193 "An action ending in effect adds one practice to the character skill its pair of verb and target grows, in the game minute of that effect, even if the effect includes several pieces or tiles"
  // decision: D-195 "A character skill tree with all its branches enters the Understanding in the game minute in which the player discovers the first action grown by that skill, together with any action a branch of that tree opens, and a tree whose first action the Understanding holds from the start enters with the first finished action of that skill"
  // decision: D-198 "Items on all tiles revealed in that game minute enter the Understanding together in its discovery pause"
  const hq = createCharacter(withEdgeSolved(newGame()), "Ala").state;
  const sent = send(hq, ids, 1).state;
  const run = base(ranks("exploration", { scout: 1 }));
  const neighbor = neighbours(run.tiles, run.character.at)[0];
  const fixture = {
    ...sent,
    run: {
      ...run,
      copy: sent.run.copy,
      // The fixture is a plain map run set in a game's map run: the record is the sent one's.
      longestStreak: sent.run.longestStreak,
      minutesByAction: sent.run.minutesByAction,
      enteredWith: sent.run.enteredWith,
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
  // The first finished exploration also brings the tree of Eksploracja (D-195).
  assert.deepEqual(result.state.discovery.trees, [
    "exploration",
    "smallItemGathering",
  ]);
  assert.ok(result.state.discovery.actions.includes("patrol"));
  assert.ok(result.state.understanding.items.includes("fiber"));
  assert.deepEqual(result.state.run.practice, { exploration: 1 });
});
