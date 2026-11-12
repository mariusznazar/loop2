// The texts of the end-of-run window (D-368, D-132, D-133, D-135,
// D-185, D-216, D-122, D-93, D-53, D-136): the title and its role, the line of the longest streak
// against the map's streak, the line of what the end cost or gave, the discovery and whether its rule
// can be added, the rules that never fired, the shares of time, the trip rows and the buttons of the
// way on. Each case states the words it expects, written out from the decisions (D-73).
import assert from "node:assert/strict";
import { test } from "node:test";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import {
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { emptyProgram } from "../../dist/browser/sim/programs.js";
import { MINUTE_KINDS } from "../../dist/browser/sim/run-record.js";
import {
  discoveryLine,
  endCostLine,
  endTitle,
  longestStreakLine,
  timeShares,
  tripRows,
  unfiredRules,
  wayOnButtons,
} from "../../dist/browser/view/end-window-lines.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import { newKnowingGame } from "../sim/understanding-fixture.mjs";

const REAL_MS = 1760000000000;
const ALWAYS = { kind: "always" };
const rule = (action) => ({ condition: ALWAYS, action });

/** A game with a map run of the map given, sent under the rules given. */
function sent(rules, mapId = "forest") {
  const program = setProgram(
    newKnowingGame(),
    programFromRules(...rules),
  ).state;
  return send(
    createCharacter(program, "Ala").state,
    { mapId, characterId: 1 },
    REAL_MS,
  ).state;
}

const RUNNING = sent([]);

/** The same game with the fields of its map run given, such as a death or a completion. */
function withRun(state, fields) {
  return { ...state, run: { ...state.run, ...fields } };
}

/** The map run of the running game with the fields given. */
function runOf(fields) {
  return { ...RUNNING.run, ...fields };
}

/** Every kind of the closed list at 0 game minutes, with the counts given for some kinds. */
function minutes(counts) {
  return Object.fromEntries(
    MINUTE_KINDS.map((kind) => [kind, counts[kind] ?? 0]),
  );
}

// Catches a title that is the death's words in another role, or a completion that shows the cause or
// is missing from a map run that ended in a completion of another map (D-334, D-132).
test("the title after a death is the words of its cause in text-strong, after a completion the map's completion text in positive", () => {
  assert.equal(endTitle(RUNNING), null, "a running map run has no title");
  for (const [cause, text] of [
    ["cold", "Mag zamarzł"],
    ["hunger", "Mag umarł z głodu"],
    ["combat", "Mag zginął w walce"],
  ]) {
    assert.deepEqual(
      endTitle(
        withRun(RUNNING, { minute: 312, death: { minute: 312, cause } }),
      ),
      { text, role: "text-strong" },
    );
  }
  assert.deepEqual(
    endTitle(withRun(RUNNING, { minute: 480, completion: { minute: 480 } })),
    { text: "Las rozwiązany", role: "positive" },
  );
  assert.deepEqual(
    endTitle(
      withRun(RUNNING, {
        mapId: "forestDeep",
        minute: 540,
        completion: { minute: 540 },
      }),
    ),
    { text: "Las — głębiej rozwiązany", role: "positive" },
  );
});

// Catches the longest streak shown as the streak of the current run, a met requirement in another role,
// a line on a map that asks no streak, or a share that counts the longest streak against the wrong number
// (D-135, D-133). 116/480 is the example of D-135; 116 / 480 is hand-derived.
test("the longest streak line gives the longest streak against the map's streak, positive where met, and none where the map asks no streak", () => {
  assert.deepEqual(
    longestStreakLine(runOf({ longestStreak: 116 }), MAPS.forest),
    { text: "najdłuższa passa 116/480", share: 116 / 480, role: "text" },
  );
  assert.deepEqual(
    longestStreakLine(runOf({ longestStreak: 480 }), MAPS.forest),
    { text: "najdłuższa passa 480/480", share: 1, role: "positive" },
  );
  assert.deepEqual(
    longestStreakLine(runOf({ longestStreak: 120 }), MAPS.forestDeep),
    { text: "najdłuższa passa 120/540", share: 120 / 540, role: "text" },
  );
  assert.equal(
    longestStreakLine(runOf({ longestStreak: 3 }), {
      ...MAPS.forest,
      solving: { defeatedAttacks: 2 },
    }),
    null,
  );
});

// Catches a deposit line that follows the copy after the completion, or one that stands with a death
// (D-185, D-216). The deposit line keeps the text the trip lines already give, with its full stop.
test("the cost line after a completion is the deposit frozen at the completion, unchanged by later edits of the copy", () => {
  const done = withRun(RUNNING, {
    minute: 480,
    streak: 480,
    completion: { minute: 480 },
    deposited: [{ item: "stick", count: 3 }],
  });
  assert.deepEqual(endCostLine(done), {
    text: "Do skrzynki: patyk 3.",
    role: "text-secondary",
  });
  const edited = setProgram(done, emptyProgram()).state;
  assert.deepEqual(endCostLine(edited), {
    text: "Do skrzynki: patyk 3.",
    role: "text-secondary",
  });
  assert.deepEqual(
    endCostLine(
      withRun(RUNNING, {
        minute: 480,
        streak: 480,
        completion: { minute: 480 },
        deposited: [],
      }),
    ),
    { text: "Do skrzynki nic nie trafiło.", role: "text-secondary" },
  );
});

// Catches a resurrection line with another number of hours (the hours come from the balance data, 480
// real minutes, which is 8 hours), a missing generation, or a line shown while the death is unsettled
// (D-216, D-39).
test("after a death the cost line tells a used resurrection with the hours of the data in text-secondary, a missing one with the generation in danger, and nothing while the death is unsettled", () => {
  const dead = (deathSettlement) =>
    withRun(RUNNING, {
      minute: 312,
      death: { minute: 312, cause: "cold" },
      deathSettlement,
    });
  assert.deepEqual(endCostLine(dead({ kind: "resurrectionUsed" })), {
    text: "Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.",
    role: "text-secondary",
  });
  assert.deepEqual(endCostLine(dead({ kind: "progressLost", generation: 3 })), {
    text: "Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 3.",
    role: "danger",
  });
  assert.equal(endCostLine(dead(null)), null);
});

// Catches a discovery shown with no band text, a rule offered on a program with no group to hold it, or
// a discovery line standing with no discovery (D-122, D-312, D-313).
test("the discovery line gives the band text of the discovery, and says whether its rule can be added", () => {
  const discovered = {
    ...RUNNING,
    discovery: {
      trees: [],
      actions: ["explore"],
      conditions: [],
      items: [],
      creatures: [],
    },
  };
  assert.deepEqual(discoveryLine(discovered), {
    text: "Odkryto: Eksploruj.",
    canAdd: true,
  });
  assert.equal(discoveryLine(RUNNING), null);
  const noGroups = {
    ...discovered,
    run: {
      ...discovered.run,
      copy: {
        ...discovered.run.copy,
        program: { ...discovered.run.copy.program, groups: [] },
      },
    },
  };
  assert.deepEqual(discoveryLine(noGroups), {
    text: "Odkryto: Eksploruj.",
    canAdd: false,
  });
});

// Catches a rule with a count shown as never fired, a rule with a count of 0 left out, or a number that
// follows the saved program instead of the copy (D-93). The rule ids of the copy are 1, 2 and 3.
test("the rules that never fired are the rules of the copy whose count is absent or 0, each with its number and its sentence", () => {
  const state = {
    ...sent([
      rule({ kind: "explore" }),
      rule({ kind: "wander" }),
      rule({ kind: "explore" }),
    ]),
    ruleCounts: { 1: 3, 3: 0 },
  };
  assert.deepEqual(unfiredRules(state), [
    { number: "1.2", text: "Zawsze → Wędruj" },
    { number: "1.3", text: "Zawsze → Eksploruj" },
  ]);
  assert.deepEqual(
    unfiredRules({ ...state, ruleCounts: { 1: 3, 2: 1, 3: 1 } }),
    [],
  );
});

// Catches a share of time with a wrong threshold, a sixth piece or a missing „reszta”, a kind not joined
// into „W drodze”, „Czeka” or „Walka”, and a bar drawn where no minute was counted (D-93 gives the
// percentages whole). Hand-derived: 30/85 is 35 %, 20/85 is 24 %, 8/85 is 9 %, 2/85 is 2 %.
test("the shares of time join the walk kinds, wait and fight, keep at most five pieces of at least 8 %, and the rest in reszta", () => {
  assert.deepEqual(
    timeShares(
      runOf({
        minutesByAction: minutes({
          walkTo: 10,
          walkToCampfire: 5,
          wander: 5,
          wait: 15,
          combat: 10,
          gather: 30,
          explore: 8,
          eat: 2,
        }),
      }),
    ),
    [
      { label: "Zbierz", percent: 35 },
      { label: "W drodze", percent: 24 },
      { label: "Czeka", percent: 18 },
      { label: "Walka", percent: 12 },
      { label: "Eksploruj", percent: 9 },
      { label: "reszta", percent: 2 },
    ],
  );
  assert.deepEqual(
    timeShares(
      runOf({
        minutesByAction: minutes({
          gather: 20,
          explore: 16,
          eat: 15,
          craftCampfire: 14,
          lightCampfire: 13,
          feedCampfire: 12,
        }),
      }),
    ),
    [
      { label: "Zbierz", percent: 22 },
      { label: "Eksploruj", percent: 18 },
      { label: "Zjedz — jagoda", percent: 17 },
      { label: "Wytwórz — ognisko", percent: 16 },
      { label: "Zapal — ognisko", percent: 14 },
      { label: "reszta", percent: 13 },
    ],
  );
  // Exactly 8 of 100 minutes is a piece of its own; 7 of 100 is not (Catches a floor other than 8 %).
  assert.deepEqual(
    timeShares(
      runOf({
        minutesByAction: minutes({
          gather: 60,
          explore: 8,
          eat: 7,
          craftCampfire: 25,
        }),
      }),
    ),
    [
      { label: "Zbierz", percent: 60 },
      { label: "Wytwórz — ognisko", percent: 25 },
      { label: "Eksploruj", percent: 8 },
      { label: "reszta", percent: 7 },
    ],
  );
  assert.deepEqual(timeShares(runOf({ minutesByAction: minutes({}) })), []);
});

// Catches an item list in another form than the trip lines write it, the empty backpack given with items,
// a count of tiles off the map's size (4 × 4 is 16), or minutes on the way that miss one of its kinds.
test("the trip rows give what the character entered with, the revealed terrain and the minutes on the way", () => {
  const tiles = RUNNING.run.tiles.map((tile, index) => ({
    ...tile,
    revealed: index < 5,
  }));
  const run = runOf({
    enteredWith: [
      { item: "stick", count: 3 },
      { item: "berry", count: 2 },
    ],
    tiles,
    minutesByAction: minutes({
      walkTo: 4,
      walkToCampfire: 2,
      wander: 1,
      gather: 9,
    }),
  });
  assert.deepEqual(tripRows(run), [
    "weszła z patyk 3, jagoda 2",
    "odsłonięto 5 z 16 kafelków",
    "w drodze 7 min",
  ]);
  assert.deepEqual(tripRows({ ...run, enteredWith: [] }), [
    "weszła z pustym plecakiem",
    "odsłonięto 5 z 16 kafelków",
    "w drodze 7 min",
  ]);
});

// Catches a button after a death, a button for a map that the completed map does not open, or a missing
// button after the completion of Las (D-132, D-53, D-149).
test("the way-on buttons after a completion of Las name the map it opens, and none after a death or a completion of the map it opens", () => {
  assert.deepEqual(wayOnButtons(runOf({ completion: { minute: 480 } })), [
    { mapId: "forestDeep", text: "Otwarte: Las — głębiej →" },
  ]);
  assert.deepEqual(
    wayOnButtons(runOf({ mapId: "forestDeep", completion: { minute: 540 } })),
    [],
  );
  assert.deepEqual(
    wayOnButtons(runOf({ death: { minute: 312, cause: "cold" } })),
    [],
  );
});
