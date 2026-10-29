import assert from "node:assert/strict";
import { test } from "node:test";
import {
  combatText,
  createCombatLine,
} from "../../dist/public/view/combat-line.js";

const creature = {
  creatureId: "wolf",
  attackMinute: 10,
  resolveMinute: 15,
  result: null,
};

test("before the turns, the line reads the creature health and ordered program from creature data", () => {
  assert.equal(
    combatText(creature),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.",
  );
});

test("a resolved encounter lists both actions and ends with its result", () => {
  assert.equal(
    combatText({
      ...creature,
      result: {
        characterHealth: 93,
        creatureHealth: 18,
        outcome: "creatureDefeated",
        ruleStarts: { 1: 1 },
        exchanges: [
          {
            creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
            characterAction: {
              ruleId: 1,
              action: { kind: "strikeWithStick" },
              damage: 6,
              creatureHealth: 18,
              characterHealth: 93,
            },
          },
        ],
      },
    }),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · Wilk pokonany.",
  );
});

test("the encounter paragraph stays hidden without a record and updates in place when one appears", () => {
  const saved = globalThis.document;
  globalThis.document = {
    createElement(tag) {
      return { tag, className: "", hidden: false, textContent: "" };
    },
  };
  try {
    const line = createCombatLine();
    assert.equal(line.element.tag, "p");
    assert.equal(line.element.className, "combat-line");
    assert.equal(line.element.hidden, true);
    line.update(creature);
    assert.equal(line.element.hidden, false);
    assert.equal(line.element.textContent, combatText(creature));
    line.update(null);
    assert.equal(line.element.hidden, true);
    assert.equal(line.element.textContent, "");
  } finally {
    if (saved === undefined) delete globalThis.document;
    else globalThis.document = saved;
  }
});
