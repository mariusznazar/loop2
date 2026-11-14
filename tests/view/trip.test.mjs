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
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { emptyProgram } from "../../dist/browser/sim/programs.js";
import {
  readTripCount,
  tripCount,
  tripChoices,
} from "../../dist/browser/view/trip-editor.js";
import {
  emptyLoopMark,
  entersLine,
  rehearsalMark,
  solvedRunText,
  tripTexts,
  tripWarning,
} from "../../dist/browser/view/trip-lines.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { MAPS } from "../../dist/browser/sim/data/maps.js";
import { withEdgeSolved } from "../sim/understanding-fixture.mjs";

const entry = (item, count) => ({ item, count });
const plan = {
  take: [entry("stick", 5)],
  bring: [entry("stick", 3), entry("berry", 4)],
};
function sent(tripPlan = plan) {
  let state = createCharacter(withEdgeSolved(newGame()), "Tester").state;
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
  // The number field's rule: a count is committed every time, also one equal to the count held (D-181).
  assert.deepEqual(readTripCount("12"), { value: 12, commit: true });
  assert.equal(readTripCount("0"), null);
  assert.equal(readTripCount("2.4"), null);
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
  assert.deepEqual(tripTexts(newGame()), {
    deposited: null,
    preview: null,
  });
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

const MARK =
  "Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.";

// D-251. Catches a mark measured against the take list before its cut, one shown at a map
// not yet solved, and one that stays where the chest holds exactly what the run takes.
test("the mark shows at a solved map when a take entry cut by capacity and the entry cap exceeds the chest, and only then", () => {
  const take = (...entries) => ({ take: entries, bring: [] });
  const chest = (pieces) => ({ pieces });
  // Three pieces asked, two in the chest: the mark; the same at a map not yet solved: none.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 3)),
      15,
      MAPS.forest,
      chest({ stick: 2 }),
    ),
    MARK,
  );
  assert.equal(
    rehearsalMark(
      false,
      take(entry("stick", 3)),
      15,
      MAPS.forest,
      chest({ stick: 2 }),
    ),
    null,
  );
  // Stock equal to the count, and above it: none. An item the chest lacks altogether: the mark.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 3)),
      15,
      MAPS.forest,
      chest({ stick: 3 }),
    ),
    null,
  );
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 3)),
      15,
      MAPS.forest,
      chest({ stick: 9 }),
    ),
    null,
  );
  assert.equal(
    rehearsalMark(true, take(entry("stick", 3)), 15, MAPS.forest, chest({})),
    MARK,
  );
  // The cut by the carrying capacity: 5 asked, 3 carried, 3 in the chest: none.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 5)),
      3,
      MAPS.forest,
      chest({ stick: 3 }),
    ),
    null,
  );
  // The cut by the entry cap: 5 asked, 2 let in, 2 in the chest: none.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 5)),
      15,
      { ...MAPS.forest, carryIn: 2 },
      chest({ stick: 2 }),
    ),
    null,
  );
  // The budget runs in list order: capacity 4 gives the stick 3 and the berry the one left, and
  // the chest holds no berry.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 3), entry("berry", 4)),
      4,
      MAPS.forest,
      chest({ stick: 3 }),
    ),
    MARK,
  );
  // An entry cut to nothing asks for nothing: berry 4 after a capacity spent on stick.
  assert.equal(
    rehearsalMark(
      true,
      take(entry("stick", 3), entry("berry", 4)),
      3,
      MAPS.forest,
      chest({ stick: 3 }),
    ),
    null,
  );
  // An empty list asks for nothing.
  assert.equal(rehearsalMark(true, take(), 15, MAPS.forest, chest({})), null);
});

// D-180, D-189: the line names what a send takes, which is the cut the send makes.
// Catches a line that writes the take list as asked, not as cut; a solved map that reads the chest
// where the run takes from nowhere; and an empty take that stands without „nic”.
test("the enter line gives what a send takes, cut by the chest, the capacity and the entry cap", () => {
  const take = (...entries) => ({ take: entries, bring: [] });
  const stocked = { pieces: { stick: 10, berry: 10 } };
  assert.equal(
    entersLine(
      take(entry("stick", 6), entry("berry", 4)),
      stocked,
      15,
      MAPS.forest,
    ),
    "Wejdzie: patyk 6, jagoda 4",
  );
  // The chest holds no berry: the berry is not taken, so it is not listed.
  assert.equal(
    entersLine(
      take(entry("stick", 6), entry("berry", 4)),
      { pieces: { stick: 10 } },
      15,
      MAPS.forest,
    ),
    "Wejdzie: patyk 6",
  );
  assert.equal(
    entersLine(take(entry("stick", 6)), { pieces: {} }, 15, MAPS.forest),
    "Wejdzie: nic",
  );
  // The entry cap of 3 cuts the stick to 3 and leaves the berry nothing.
  assert.equal(
    entersLine(take(entry("stick", 6), entry("berry", 4)), stocked, 15, {
      ...MAPS.forest,
      carryIn: 3,
    }),
    "Wejdzie: patyk 3",
  );
  // A solved map takes from nowhere (chest null), cut by the capacity 5: the stick 5, the berry none.
  assert.equal(
    entersLine(
      take(entry("stick", 6), entry("berry", 4)),
      null,
      5,
      MAPS.forest,
    ),
    "Wejdzie: patyk 5",
  );
  assert.equal(entersLine(take(), null, 15, MAPS.forest), "Wejdzie: nic");
});

// D-326: a program whose bring list is empty earns nothing for the chest, so the loop mark
// stands; a list with an item in it does not. Catches the mark on a non-empty list, and no mark on
// an empty one.
test("the loop mark stands when the bring list is empty, and only then", () => {
  assert.equal(
    emptyLoopMark({ take: [entry("stick", 5)], bring: [] }),
    "Pętla nic nie zarobi do skrzynki",
  );
  assert.equal(emptyLoopMark({ take: [], bring: [entry("stick", 3)] }), null);
  assert.equal(
    emptyLoopMark({ take: [entry("stick", 5)], bring: [entry("stick", 3)] }),
    null,
  );
});

const SOLVED_LINE =
  "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.";

/** A run on a map solved before it started, the bring list set so the preview has text. */
function solvedSent() {
  const unmarked = sent();
  return send(
    { ...unmarked, run: null, solvedMaps: ["forestEdge", "forest"] },
    { mapId: "forest", characterId: 1 },
    23,
  ).state;
}
// The minute is set with the streak and the record, as the load admits a streak no longer than the
// run and game minutes by action that sum to the minute: 479 minutes of waiting, a streak of 479.
const completed = (state) =>
  advanceMinutes(
    {
      ...state,
      run: {
        ...state.run,
        minute: 479,
        streak: 479,
        longestStreak: 479,
        minutesByAction: { ...state.run.minutesByAction, wait: 479 },
      },
    },
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

// Catches a map-run screen that shows the deposit or the settlement in the world area, which the
// window of the end holds (D-185, D-216, D-311), or that shows the solved-map line (D-215) on a run
// that does pay; the lines the world area reads for the six screens of a map run.
test("the six screens of a map run give the world area the solved-map line and the preview, and no deposit and no settlement", () => {
  const lines = (state) => ({
    solved: solvedRunText(state),
    preview: tripTexts(state).preview,
  });

  // going on, unmarked run: the preview alone
  assert.deepEqual(lines(sent()), {
    solved: null,
    preview: "Wyniesie: patyk 3",
  });
  // going on, marked run: the solved line, and the preview reading nothing
  assert.deepEqual(lines(solvedSent()), {
    solved: SOLVED_LINE,
    preview: "Wyniesie: nic",
  });
  // completion, unmarked: no line of the deposit in the world area
  assert.deepEqual(lines(completed(sent())), { solved: null, preview: null });
  // completion, marked: the solved line alone
  assert.deepEqual(lines(completed(solvedSent())), {
    solved: SOLVED_LINE,
    preview: null,
  });
  // death, unmarked: no line of the settlement in the world area
  assert.deepEqual(lines(died(sent(), 0)), { solved: null, preview: null });
  assert.deepEqual(lines(died(sent(), 9_000_000)), {
    solved: null,
    preview: null,
  });
  // death, marked: the solved line alone
  assert.deepEqual(lines(died(solvedSent(), 0)), {
    solved: SOLVED_LINE,
    preview: null,
  });
});

// Catches a screen that reads the settlement from anything but the state's own record: a death
// not yet settled has no settlement, and a loaded game holds the same record, which the window of the
// end reads after a load too (D-216).
test("a death not yet settled has no settlement record, and a loaded game holds the same record and the same lines", () => {
  const unsettled = sent();
  const dying = { ...unsettled, run: { ...unsettled.run, death: "cold" } };
  assert.equal(dying.run.deathSettlement, null);
  assert.equal(newGame().run, null);
  assert.equal(solvedRunText(newGame()), null);
  for (const state of [
    died(solvedSent(), 0),
    died(sent(), 9_000_000),
    completed(solvedSent()),
    solvedSent(),
  ]) {
    // D-248: every document is stamped, and the load refuses one that is not.
    const loaded = loadSavedGame(savedGame(withSaveTime(state, 9_000_000)));
    assert.equal(loaded.ok, true, String(state.run.completion?.minute));
    assert.deepEqual(solvedRunText(loaded.state), solvedRunText(state));
    assert.deepEqual(
      loaded.state.run.deathSettlement,
      state.run.deathSettlement,
    );
    assert.deepEqual(tripTexts(loaded.state), tripTexts(state));
  }
});
