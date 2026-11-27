// The words of the gear on the screen of a map run (D-456 to D-458): „Teraz” and the chronicle write
// „Zakłada {rzecz}” for „Załóż”, the paragraph of an encounter writes the refill of an empty main hand
// as an element of its own before the strike, and the scene counts „Załóż” among the actions that take
// pieces out of the backpack. The input is written out by hand, so each case states the words it
// expects (D-73).
import assert from "node:assert/strict";
import { test } from "node:test";
import { ACTIONS } from "../../dist/browser/sim/data/actions.js";
import {
  createCharacter,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { combatText } from "../../dist/browser/view/combat-line.js";
import { eventEntry } from "../../dist/browser/view/chronicle-entries.js";
import { nowRows } from "../../dist/browser/view/now-lines.js";
import { sceneEffect } from "../../dist/browser/view/scene-picture.js";
import { programFromRules } from "../sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "../sim/understanding-fixture.mjs";

const ALWAYS = { kind: "always" };
const EQUIP_STICK = { kind: "equip", item: "stick" };
const EQUIP_BANDAGE = { kind: "equip", item: "bandage" };
const STICK = { kind: "gather", resource: "stick" };
const SENT = { mapId: "forest", characterId: 1 };

const PROGRAM = {
  groups: [
    {
      id: 1,
      name: "Pierwsza",
      condition: ALWAYS,
      rules: [{ id: 1, condition: ALWAYS, action: EQUIP_STICK }],
    },
  ],
};

const creature = {
  creatureId: "wolf",
  attackMinute: 10,
  resolveMinute: 15,
  result: null,
};

test("Teraz writes „Zakłada {rzecz}” for „Załóż”, the status of the action and the name of its target", () => {
  assert.equal(ACTIONS.equip.status, "Zakłada");
  const row = nowRows(
    {
      now: {
        kind: "action",
        ruleId: 1,
        action: EQUIP_STICK,
        minutesLeft: 1,
        minutes: 1,
      },
      next: { kind: "rule", ruleId: 1, action: EQUIP_BANDAGE },
    },
    PROGRAM,
  );
  assert.equal(row.now.text, "Zakłada patyk");
  assert.equal(row.now.right, "reguła 1.1 · zostało 1 z 1 min");
  assert.equal(row.now.icon, ACTIONS.equip.icon);
  // „Potem” keeps the sentence of the action: „Załóż — Opatrunek”, the target capitalized.
  assert.equal(row.next.text, "Załóż — Opatrunek");
});

test("the chronicle writes „Zakłada {rzecz}” when „Załóż” starts", () => {
  assert.deepEqual(
    eventEntry(
      {
        kind: "activityStarted",
        minute: 7,
        activity: { kind: "rule", ruleId: 1, action: EQUIP_BANDAGE },
      },
      null,
    ),
    { kind: "action", minute: 7, text: "Zakłada opatrunek", role: "text" },
  );
});

// decision: D-147 "From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: before the turns it gives the creature's starting health and program formatted from its action pairs, and after them it gives each action and its outcome in order, followed by the encounter's result"
test("a turn of „Załóż” gives „Mag zakłada {rzecz}” with no health of the creature", () => {
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
              action: EQUIP_STICK,
              refill: false,
              damage: 0,
              creatureHealth: 24,
              characterHealth: 93,
            },
          },
        ],
      },
    }),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag zakłada patyk · Wilk odszedł.",
  );
});

// decision: D-457 "An empty slot of the gear stays empty until a rule puts something on it or the character uses an action that takes a piece from that slot. That action then takes a fitting piece from the backpack into the slot itself and acts at once, with no time besides its own."
test("a strike that refilled the empty main hand reads its refill as an element before the strike", () => {
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
              refill: true,
              damage: 6,
              creatureHealth: 18,
              characterHealth: 93,
            },
          },
        ],
      },
    }),
    "Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz. Wilk gryzie: −7 · Mag bierze patyk z plecaka do ręki · Mag uderza patykiem: wilk 18/24 · Wilk pokonany.",
  );
});

// Catches a refill that leaves no line of its own in the chronicle, a line that keeps the actor the
// paragraph of the encounter gives it, a line for a turn that did not refill and one for a turn in
// which the character did nothing.
test("the chronicle writes the refill of an empty main hand as a line of its own with no actor, at the minute the turns resolve", () => {
  // decision: D-340 "The refill of an empty slot of the gear (D-457) gives one entry of its own"
  const turn = (characterAction) => ({
    kind: "combatExchange",
    minute: 15,
    exchange: {
      creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
      characterAction,
    },
  });
  const strike = (refill) => ({
    ruleId: 1,
    action: { kind: "strikeWithStick" },
    refill,
    damage: 6,
    creatureHealth: 18,
    characterHealth: 93,
  });
  assert.deepEqual(eventEntry(turn(strike(true)), null), {
    kind: "action",
    minute: 15,
    text: "Bierze patyk z plecaka do ręki",
    role: "text",
  });
  assert.equal(eventEntry(turn(strike(false)), null), null);
  assert.equal(eventEntry(turn(null), null), null);
});

// Catches a refill of an empty pocket that the chronicle words with the main hand's refill, and a
// turn of „Ucisk” with no refill that gives an entry.
test("the chronicle writes the refill of an empty pocket by „Ucisk” as a line of its own with no actor, and a turn of „Ucisk” with no refill gives none", () => {
  // decision: D-340 "The refill of an empty slot of the gear (D-457) gives one entry of its own"
  const turn = (refill) => ({
    kind: "combatExchange",
    minute: 15,
    exchange: {
      creatureAction: { kind: "strike", damage: 7, characterHealth: 93 },
      characterAction: {
        ruleId: 1,
        action: { kind: "pressure" },
        refill,
        damage: 0,
        creatureHealth: 24,
        characterHealth: 93,
      },
    },
  });
  assert.deepEqual(eventEntry(turn(true), null), {
    kind: "action",
    minute: 15,
    text: "Bierze opatrunek z plecaka do kieszeni",
    role: "text",
  });
  assert.equal(eventEntry(turn(false), null), null);
});

// decision: D-367 "The scene shows an effect of the end of a gathering, D-365 or D-366, only in a reading of a map run that goes on, drawn from a previous reading of the same map run, in which exactly one gathering ended and no action that takes pieces out of the backpack ended, and which a map run started does not accompany; it places the effect at the place the mage stands or walks to at the previous reading."
test("the end of „Załóż” in the same reading as a gathering leaves the scene no effect of the gathering", () => {
  const program = setProgram(
    withEdgeSolved(newKnowingGame()),
    programFromRules({ condition: ALWAYS, action: { kind: "explore" } }),
  ).state;
  const sentState = send(
    createCharacter(program, "Ala").state,
    SENT,
    1760000000000,
  ).state;
  const withStick = (count) => ({
    ...sentState,
    run: {
      ...sentState.run,
      character: {
        ...sentState.run.character,
        backpack: { ...sentState.run.character.backpack, stick: count },
      },
    },
  });
  const finished = (action) => ({
    kind: "activityFinished",
    minute: 10,
    activity: { kind: "rule", ruleId: 1, action },
  });
  // A gathering that hit, alone in its reading, shows its effect; with „Załóż” ending in the same
  // reading the net change of the backpack tells nothing of it, so the scene shows none.
  assert.notEqual(
    sceneEffect(withStick(0), withStick(1), [finished(STICK)], 42),
    null,
  );
  assert.equal(
    sceneEffect(
      withStick(0),
      withStick(1),
      [finished(STICK), finished(EQUIP_STICK)],
      42,
    ),
    null,
  );
});
