// The labels of the skills and branches of the screen Postać (D-199) and of the practice line of a
// map run (D-201).
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import {
  branchText,
  practiceText,
  skillText,
} from "../../dist/browser/view/character-skills.js";

const character = (practice = 0, ranks = {}) => ({
  ...createCharacter(newGame(), "Ala").state.team.characters[0],
  skills: {
    exploration: { practice, ranks },
    smallItemGathering: { practice: 160, ranks: {} },
  },
});

test("a skill shows cumulative progress and available points; the last level retains total practice without a next threshold", () => {
  assert.equal(
    skillText(character(), "exploration"),
    "Eksploracja — poziom 1 · wprawa 0/15 · punkty 0",
  );
  assert.equal(
    skillText(character(45, { practicedStep: 1 }), "exploration"),
    "Eksploracja — poziom 3 · wprawa 45/100 · punkty 1",
  );
  assert.equal(
    skillText(character(999, { longStep: 3 }), "exploration"),
    "Eksploracja — poziom 5 (najwyższy) · wprawa 999 · punkty 0",
  );
});

test("numeric branch shows its current and next effect and price, while maximum keeps only current effect", () => {
  assert.equal(
    branchText(character(200, { longStep: 2 }), "longStep"),
    "Długi krok 2/3 — Krótsze przejście między polami · teraz 1 min → po kupnie 1 min · cena 2",
  );
  assert.equal(
    branchText(character(200, { longStep: 3 }), "longStep"),
    "Długi krok 3/3 — Krótsze przejście między polami · teraz 1 min",
  );
  assert.equal(
    branchText(character(), "scout"),
    "Zwiad 0/1 — Odkrywa również sąsiednie pola · cena 3",
  );
  assert.equal(
    branchText(character(100, { scout: 1 }), "scout"),
    "Zwiad 1/1 — Odkrywa również sąsiednie pola",
  );
});

test("the combat branches show their ranks from the data: Mocniejszy cios has four and Cięższy kop two, and a full branch ends at its last effect", () => {
  const skilled = (id, practice, ranks) => ({
    ...createCharacter(newGame(), "Ala").state.team.characters[0],
    skills: { [id]: { practice, ranks } },
  });
  assert.equal(
    branchText(
      skilled("oneHandedCombat", 300, { strongerStrike: 3 }),
      "strongerStrike",
    ),
    "Mocniejszy cios 3/4 — Większe obrażenia patykiem · teraz 12 obrażeń → po kupnie 14 obrażeń · cena 1",
  );
  assert.equal(
    branchText(
      skilled("oneHandedCombat", 300, { strongerStrike: 4 }),
      "strongerStrike",
    ),
    "Mocniejszy cios 4/4 — Większe obrażenia patykiem · teraz 14 obrażeń",
  );
  assert.equal(
    branchText(skilled("kicking", 30, { heavierKick: 1 }), "heavierKick"),
    "Cięższy kop 1/2 — Większe obrażenia kopnięciem · teraz 4 obrażeń → po kupnie 5 obrażeń · cena 1",
  );
  assert.equal(
    branchText(skilled("kicking", 30, { heavierKick: 2 }), "heavierKick"),
    "Cięższy kop 2/2 — Większe obrażenia kopnięciem · teraz 5 obrażeń",
  );
});

test("run practice omits zero values and disappears when nothing accrued", () => {
  assert.equal(practiceText({}), "");
  assert.equal(practiceText({ exploration: 0 }), "");
  assert.equal(
    practiceText({ eating: 2, exploration: 1 }),
    "Wprawa w tym przejściu: Eksploracja +1 · Jedzenie +2",
  );
});
