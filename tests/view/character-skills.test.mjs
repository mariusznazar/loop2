// Accepted wprawa_i_drzewa_loop2.md Q9 and Q10: exact skill, branch and run labels.
import assert from "node:assert/strict";
import { test } from "node:test";
import { createCharacter, newGame, send } from "../../dist/public/sim/game.js";
import { buyBranch } from "../../dist/public/sim/skills.js";
import {
  branchText,
  createCharacterSkills,
  practiceText,
  skillText,
} from "../../dist/public/view/character-skills.js";

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

test("run practice omits zero values and disappears when nothing accrued", () => {
  assert.equal(practiceText({}), "");
  assert.equal(practiceText({ exploration: 0 }), "");
  assert.equal(
    practiceText({ eating: 2, exploration: 1 }),
    "Wprawa w tym przejściu: Eksploracja +1 · Jedzenie +2",
  );
});

function fakeDocument() {
  return {
    createElement(tag) {
      return {
        tag,
        children: [],
        textContent: "",
        hidden: false,
        attributes: {},
        listeners: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
        addEventListener(name, listener) {
          this.listeners[name] = listener;
        },
        append(...nodes) {
          this.children.push(...nodes);
        },
      };
    },
  };
}
const descendants = (node) => [node, ...node.children.flatMap(descendants)];

test("unknown trees are hidden, purchases update existing buttons and refuse unaffordable and maximum ranks", () => {
  const saved = globalThis.document;
  globalThis.document = fakeDocument();
  try {
    let state = createCharacter(newGame(), "Ala").state;
    state = { ...state, team: { ...state.team, characters: [character(100)] } };
    const panel = createCharacterSkills(1, (branch) => {
      state = buyBranch(state, 1, branch).state;
      panel.update(state);
    });
    panel.update(state);
    assert.equal(panel.element.hidden, true);
    state = {
      ...state,
      understanding: { ...state.understanding, trees: ["exploration"] },
    };
    panel.update(state);
    assert.equal(panel.element.hidden, false);
    assert.equal(
      panel.element.children.filter(
        (child) => child.className === "skill-tree" && !child.hidden,
      ).length,
      1,
    );
    const buttons = descendants(panel.element).filter(
      (node) => node.tag === "button",
    );
    const scout = buttons.find(
      (button) => button.attributes["aria-label"] === "Kup: Zwiad",
    );
    assert.equal(scout.disabled, false);
    scout.listeners.click();
    assert.equal(scout.disabled, true);
    assert.equal(
      descendants(panel.element).find(
        (node) => node.attributes["aria-label"] === "Kup: Zwiad",
      ),
      scout,
    );
    const step = buttons.find(
      (button) => button.attributes["aria-label"] === "Kup: Wprawny krok",
    );
    assert.equal(step.disabled, true);
    panel.update(send(state, { mapId: "forest", characterId: 1 }, 1).state);
    assert.equal(scout.disabled, true);
  } finally {
    if (saved === undefined) delete globalThis.document;
    else globalThis.document = saved;
  }
});
