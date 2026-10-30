import assert from "node:assert/strict";
import test from "node:test";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
  advanceMinutes,
  mapRunEnded,
  setPaused,
  settleDeath,
} from "../../dist/public/sim/game.js";
import { emptyProgram } from "../../dist/public/sim/programs.js";
import { tripCount, tripChoices } from "../../dist/public/view/trip-editor.js";
import {
  deathSettlementLine,
  solvedRunText,
  tripTexts,
  tripWarning,
} from "../../dist/public/view/trip-lines.js";
import { loadSavedGame, savedGame } from "../../dist/public/sim/saved-game.js";
import { MAPS } from "../../dist/public/sim/data/maps.js";

const entry = (item, count) => ({ item, count });
const plan = {
  take: [entry("stick", 5)],
  bring: [entry("stick", 3), entry("berry", 4)],
};
function sent(tripPlan = plan) {
  let state = createCharacter(newGame(), "Tester").state;
  state = {
    ...state,
    team: { ...state.team, chest: { pieces: { stick: 10 } } },
  };
  state = setProgram(state, { ...emptyProgram(), tripPlan }).state;
  return send(state, { mapId: "forest", characterId: 1 }, 23).state;
}

// Catches accepting an invalid draft, or excluding the current row's own item.
test("trip input rejects invalid counts and offers each list's unused items in supplied order", () => {
  // Integers beyond the safe integers, which a saved game cannot hold (D-181).
  for (const text of [
    "",
    " ",
    "0",
    "-1",
    "2.4",
    "abc",
    "Infinity",
    "9007199254740992",
    "99999999999999999999",
    "1e20",
  ])
    assert.equal(tripCount(text), null);
  assert.equal(tripCount("9007199254740991"), 9007199254740991);
  assert.equal(tripCount("12"), 12);
  assert.equal(tripCount("1000000000"), 1000000000);
  assert.deepEqual(
    tripChoices(["stick", "berry", "moss"], [entry("berry", 2)]),
    ["stick", "moss"],
  );
  assert.deepEqual(
    tripChoices(["stick", "berry", "moss"], [entry("berry", 2)], "berry"),
    ["stick", "berry", "moss"],
  );
  assert.deepEqual(tripChoices([], []), []);
});

test("preview follows frozen inventory and available chest room, even after the copy changes", () => {
  let state = sent();
  assert.deepEqual(tripTexts(state), {
    deposited: null,
    preview: "Wyniesie: patyk 3",
  });
  state = setProgram(state, {
    ...state.run.copy.program,
    tripPlan: { take: [], bring: [entry("berry", 4)] },
  }).state;
  assert.equal(tripTexts(state).preview, "Wyniesie: patyk 3");
  const crowded = {
    ...state,
    team: { ...state.team, chest: { pieces: { moss: 59 } } },
  };
  assert.equal(tripTexts(crowded).preview, "Wyniesie: patyk 1");
  const empty = sent({ take: [], bring: [] });
  assert.equal(tripTexts(empty).preview, null);
  const changed = setProgram(empty, {
    ...empty.run.copy.program,
    tripPlan: plan,
  }).state;
  assert.equal(tripTexts(changed).preview, "Wyniesie: nic");
  assert.equal(
    tripTexts({ ...state, run: { ...state.run, death: "cold" } }).preview,
    null,
  );
  assert.deepEqual(tripTexts(newGame()), { deposited: null, preview: null });
});

test("completion keeps actual deposit text while later editing cannot change it", () => {
  let state = sent();
  state = advanceMinutes(
    { ...state, run: { ...state.run, streak: 479 } },
    1,
  ).state;
  assert.deepEqual(tripTexts(state), {
    deposited: "Do skrzynki: patyk 3.",
    preview: null,
  });
  state = setProgram(state, emptyProgram()).state;
  assert.equal(tripTexts(state).deposited, "Do skrzynki: patyk 3.");
  const empty = sent({ take: [], bring: [] });
  assert.equal(
    tripTexts(
      advanceMinutes({ ...empty, run: { ...empty.run, streak: 479 } }, 1).state,
    ).deposited,
    "Do skrzynki nic nie trafiło.",
  );
});

test("map warning appears below desired load and backpack capacity, including a zero map cap", () => {
  assert.equal(tripWarning(plan, 15, MAPS.forest), null);
  assert.equal(tripWarning(plan, 3, { ...MAPS.forest, carryIn: 3 }), null);
  assert.equal(tripWarning(plan, 15, { ...MAPS.forest, carryIn: 5 }), null);
  assert.equal(
    tripWarning(plan, 15, { ...MAPS.forest, carryIn: 0 }),
    "Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej 0 sztuk.",
  );
});

const SOLVED_LINE =
  "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.";
const USED_LINE = "Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.";

/** A run on a map solved before it started, the bring list set so the preview has text. */
function solvedSent() {
  const unmarked = sent();
  return send(
    { ...unmarked, run: null, solvedMaps: ["forest"] },
    { mapId: "forest", characterId: 1 },
    23,
  ).state;
}
// The minute is set with the streak, as the load admits a streak no longer than the run.
const completed = (state) =>
  advanceMinutes(
    { ...state, run: { ...state.run, minute: 479, streak: 479 } },
    1,
  ).state;
/**
 * The state's run played on to the character's death and settled at a real moment; `readyAtMs`
 * sets when the character's resurrection is ready.
 */
function died(state, readyAtMs) {
  const characters = state.team.characters.map((character) => ({
    ...character,
    resurrectionReadyAtMs: readyAtMs,
  }));
  let dying = { ...state, team: { ...state.team, characters } };
  for (let round = 0; round < 50 && !mapRunEnded(dying.run); round += 1)
    dying = advanceMinutes(setPaused(dying, false).state, 5000).state;
  assert.ok(dying.run.death, "precondition: the run ended in a death");
  return settleDeath(dying, 1_000).state;
}

// Catches a map-run screen that leaves the player thinking a solved-map run pays, or that
// shows the solved-map line on a run that does pay; decision 8's table, the six rows.
test("the six screens of a map run give the solved-map line, the deposit, the settlement and the preview in decision 8's order of lines", () => {
  const lines = (state) => ({
    solved: solvedRunText(state),
    settlement: deathSettlementLine(state),
    ...tripTexts(state),
  });
  const none = { solved: null, settlement: null };

  // going on, unmarked run: the preview alone
  assert.deepEqual(lines(sent()), {
    ...none,
    deposited: null,
    preview: "Wyniesie: patyk 3",
  });
  // going on, marked run: the solved line, and the preview reading nothing
  assert.deepEqual(lines(solvedSent()), {
    ...none,
    solved: SOLVED_LINE,
    deposited: null,
    preview: "Wyniesie: nic",
  });
  // completion, unmarked: the deposit
  assert.deepEqual(lines(completed(sent())), {
    ...none,
    deposited: "Do skrzynki: patyk 3.",
    preview: null,
  });
  // completion, marked: the solved line, and a deposit reading nothing
  assert.deepEqual(lines(completed(solvedSent())), {
    ...none,
    solved: SOLVED_LINE,
    deposited: "Do skrzynki nic nie trafiło.",
    preview: null,
  });
  // death, unmarked: the settlement, in the role of each kind of death
  assert.deepEqual(lines(died(sent(), 0)), {
    ...none,
    settlement: { text: USED_LINE, danger: false },
    deposited: null,
    preview: null,
  });
  assert.deepEqual(lines(died(sent(), 9_000_000)), {
    ...none,
    settlement: {
      text: "Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 2.",
      danger: true,
    },
    deposited: null,
    preview: null,
  });
  // death, marked: the same settlement with the solved line
  assert.deepEqual(lines(died(solvedSent(), 0)), {
    ...none,
    solved: SOLVED_LINE,
    settlement: { text: USED_LINE, danger: false },
    deposited: null,
    preview: null,
  });
});

// Catches a screen that reads the settlement from anything but the state's own record: a death
// not yet settled draws nothing, and a loaded screen is the same screen.
test("a death not yet settled draws no settlement, and a loaded screen reads the same lines", () => {
  const unsettled = sent();
  const dying = { ...unsettled, run: { ...unsettled.run, death: "cold" } };
  assert.equal(deathSettlementLine(dying), null);
  assert.equal(deathSettlementLine(newGame()), null);
  assert.equal(solvedRunText(newGame()), null);
  for (const state of [
    died(solvedSent(), 0),
    died(sent(), 9_000_000),
    completed(solvedSent()),
    solvedSent(),
  ]) {
    const loaded = loadSavedGame(savedGame(state));
    assert.equal(loaded.ok, true, String(state.run.completion?.minute));
    assert.deepEqual(solvedRunText(loaded.state), solvedRunText(state));
    assert.deepEqual(
      deathSettlementLine(loaded.state),
      deathSettlementLine(state),
    );
    assert.deepEqual(tripTexts(loaded.state), tripTexts(state));
  }
});
