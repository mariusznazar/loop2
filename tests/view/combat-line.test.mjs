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
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz.",
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
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · Wilk pokonany.",
  );
});

// decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
test("a turn of „Ucisk” reads „Mag uciska ranę” with the mage's health after the turn cut down to a whole number as the body row writes it, and no creature's health", () => {
  assert.equal(
    combatText({
      ...creature,
      result: {
        characterHealth: 71.1,
        creatureHealth: 24,
        outcome: "creatureDeparted",
        ruleStarts: { 1: 1 },
        exchanges: [
          {
            creatureAction: {
              kind: "strike",
              damage: 7,
              characterHealth: 71.1,
            },
            characterAction: {
              ruleId: 1,
              action: { kind: "pressure" },
              refill: false,
              damage: 0,
              creatureHealth: 24,
              characterHealth: 71.1,
            },
          },
        ],
      },
    }),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag uciska ranę: zdrowie 71/100 · Wilk odszedł.",
  );
});

test("the health after a turn of „Ucisk” that is whole, or just short of the next whole number, is cut down, never rounded up", () => {
  const text = (health) =>
    combatText({
      ...creature,
      result: {
        characterHealth: health,
        creatureHealth: 24,
        outcome: "creatureDeparted",
        ruleStarts: { 1: 1 },
        exchanges: [
          {
            creatureAction: { kind: "strike", damage: 7, characterHealth: 1 },
            characterAction: {
              ruleId: 1,
              action: { kind: "pressure" },
              refill: false,
              damage: 0,
              creatureHealth: 24,
              characterHealth: health,
            },
          },
        ],
      },
    });
  assert.match(text(100), /Mag uciska ranę: zdrowie 100\/100/);
  assert.match(text(59.95), /Mag uciska ranę: zdrowie 59\/100/);
});

// decision: D-457 "An empty slot of the gear stays empty until a rule puts something on it or the character uses an action that takes a piece from that slot. That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
test("a turn of „Ucisk” that refilled an empty pocket reads the refill of the pocket before its turn", () => {
  assert.equal(
    combatText({
      ...creature,
      result: {
        characterHealth: 93,
        creatureHealth: 24,
        outcome: "creatureDeparted",
        ruleStarts: { 1: 1 },
        exchanges: [
          {
            creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
            characterAction: {
              ruleId: 1,
              action: { kind: "pressure" },
              refill: true,
              damage: 0,
              creatureHealth: 24,
              characterHealth: 93,
            },
          },
        ],
      },
    }),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag bierze opatrunek z plecaka do kieszeni · Mag uciska ranę: zdrowie 93/100 · Wilk odszedł.",
  );
});
