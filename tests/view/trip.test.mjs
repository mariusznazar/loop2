import assert from "node:assert/strict";
import test from "node:test";
import {
  createCharacter,
  newGame,
  send,
  setProgram,
  advanceMinutes,
} from "../../dist/public/sim/game.js";
import { emptyProgram } from "../../dist/public/sim/programs.js";
import { tripCount, tripChoices } from "../../dist/public/view/trip-editor.js";
import { tripTexts, tripWarning } from "../../dist/public/view/trip-lines.js";
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
  for (const text of ["", " ", "0", "-1", "2.4", "abc", "Infinity"])
    assert.equal(tripCount(text), null);
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
