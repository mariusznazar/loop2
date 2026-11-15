import assert from "node:assert/strict";
import { test } from "node:test";
import { combatText } from "../../dist/browser/view/combat-line.js";

const creature = {
  creatureId: "wolf",
  attackMinute: 10,
  resolveMinute: 15,
  result: null,
};

test("before the turns, the line reads the creature health and ordered program from creature data", () => {
  // decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
  // decision: D-147 "The paragraph stands through „Wznów”, editing, a load of the saved game state and the frozen death or completion screen until another attack replaces it as the last one or „Restart” or „Zakończ” removes its map run; a completion before the turns keeps the attack description and leaves the outcome absent"
  // decision: D-148 "An attacking creature appears in the encounter's text"
  assert.equal(
    combatText(creature),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 → Odskocz; Zawsze → Uderz.",
  );
});

test("a resolved encounter lists both actions and ends with its result", () => {
  // decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
  // decision: D-148 "An attacking creature appears in the encounter's text"
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
