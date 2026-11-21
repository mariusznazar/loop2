// The rows of the trees and the labels of the branches of the screen Postać (D-199) and the practice
// line of a map run (D-201).
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame } from "../../dist/browser/sim/game.js";
import {
  branchText,
  practiceText,
  treeRow,
} from "../../dist/browser/view/character-skills.js";

const character = (practice = 0, ranks = {}) => ({
  ...createCharacter(newGame(), "Ala").state.team.characters[0],
  skills: {
    exploration: { practice, ranks },
    smallItemGathering: { practice: 160, ranks: {} },
  },
});

// Catches a row that counts its practice within the level instead of against the threshold the
// numbers name, a bar that is not full after the last threshold, and points shown at zero.
test("a tree's row gives its level, its practice against the next threshold with the bar's share, and its points only where they wait; after the last threshold a full bar and „najwyższy”", () => {
  // decision: D-199 "Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend"
  // decision: D-379 "The eight character skills give a level and a point at each of these amounts of practice"
  assert.deepEqual(treeRow(character(), "exploration", {}), {
    name: "Eksploracja",
    level: "poziom 1",
    share: 0,
    amount: "0 / 15",
    points: null,
    waiting: null,
  });
  // 45 practice reaches the thresholds 15 and 45 of Eksploracja: level 3, two points, one spent on a
  // rank of Wprawny krok, and 45 of the 100 the next threshold asks.
  assert.deepEqual(
    treeRow(character(45, { practicedStep: 1 }), "exploration", {}),
    {
      name: "Eksploracja",
      level: "poziom 3",
      share: 0.45,
      amount: "45 / 100",
      points: "1 pkt",
      waiting: null,
    },
  );
  assert.deepEqual(
    treeRow(character(999, { longStep: 3 }), "exploration", {}),
    {
      name: "Eksploracja",
      level: "poziom 5",
      share: 1,
      amount: "najwyższy",
      points: null,
      waiting: null,
    },
  );
});

// Catches a mark counted from the practice waiting alone, as if the tree stood at zero, from a level
// instead of the points it brings, and one shown where the waiting practice brings no new point.
test("„+{n} pkt czeka w pętli” stands where the practice waiting in the earning loop brings the tree new points, and nowhere where it brings none", () => {
  // decision: D-199 "Each known tree stands as a row in columns: its name, „poziom {p}”, a bar of its practice up to its next threshold with „{wprawa} / {próg}”, or after its last threshold a full bar with „najwyższy”, and „{k} pkt” only where it has points to spend; right after the name, in the role `text`, stands „+{n} pkt czeka w pętli” where the practice waiting in the character's earning loop, the practice „Odbierz” would pay at that moment, gives the tree {n} new points to spend"
  // 40 practice of Eksploracja waits at 45 / 100: 85 reaches no new threshold.
  assert.equal(
    treeRow(character(45), "exploration", { exploration: 40 }).waiting,
    null,
  );
  // 60 practice waits at 45: 105 passes the threshold 100, one new point.
  assert.equal(
    treeRow(character(45), "exploration", { exploration: 60 }).waiting,
    "+1 pkt czeka w pętli",
  );
  // 200 waits at 0: 200 passes 15, 45, 100 and 200, four new points.
  assert.equal(
    treeRow(character(0), "exploration", { exploration: 200 }).waiting,
    "+4 pkt czeka w pętli",
  );
  // Practice waiting in another tree brings this one nothing.
  assert.equal(
    treeRow(character(45), "exploration", { eating: 80 }).waiting,
    null,
  );
  // At the last level no practice brings a point.
  assert.equal(
    treeRow(character(999), "exploration", { exploration: 50 }).waiting,
    null,
  );
});

test("numeric branch shows its current and next effect and price, while maximum keeps only current effect", () => {
  // decision: D-199 "Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values"
  // decision: D-199 "A fully bought branch keeps its present value if numerical and omits the next value and price"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
  // decision: D-199 "Below an open tree each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and omit numerical before-and-after values"
  // decision: D-199 "A fully bought branch keeps its present value if numerical and omits the next value and price"
  // decision: D-379 "Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order"
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
  // decision: D-201 "Below the body row the map-run view shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run"
  // decision: D-201 "Zero-valued skills and the line at zero are absent, and the positive line remains after death and completion until „Restart” or „Zakończ”"
  assert.equal(practiceText({}, true), "");
  assert.equal(practiceText({ exploration: 0 }, true), "");
  assert.equal(
    practiceText({ eating: 2, exploration: 1 }, true),
    "Wprawa w tym przejściu: Eksploracja +1 · Jedzenie +2",
  );
});

// Catches the line of a run that pays its practice standing on a run that pays none, which reads as a
// gain beside the sentence that the run pays no practice, and a line at zero on such a run.
test("the practice of a run that pays none says what it is and that it will not enter the skills", () => {
  // decision: D-201 "On a manual run of a solved map, which pays no practice (D-189), the line reads „Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: {umiejętność} +{n} · …” in the role `text-secondary` instead"
  // decision: D-201 "Zero-valued skills and the line at zero are absent, and the positive line remains after death and completion until „Restart” or „Zakończ”"
  assert.equal(practiceText({ exploration: 0 }, false), "");
  assert.equal(
    practiceText({ eating: 2, exploration: 1 }, false),
    "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności: Eksploracja +1 · Jedzenie +2",
  );
});
