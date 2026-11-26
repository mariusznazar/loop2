// Own-work probe of Slice 4: a game whose manual map run fights with an empty main hand saves and
// loads back whole, and "Zakoncz" gives the stick of the hand back to the character.
import assert from "node:assert/strict";
import {
  advanceMinutes,
  createCharacter,
  end,
  send,
  setProgram,
  withSaveTime,
} from "../../dist/browser/sim/game.js";
import { loadSavedGame, savedGame } from "../../dist/browser/sim/saved-game.js";
import { programFromRules } from "../../tests/sim/program-fixture.mjs";
import { newKnowingGame } from "../../tests/sim/understanding-fixture.mjs";

const T0 = 1_760_000_000_000;
const STRIKE = programFromRules({
  condition: { kind: "always" },
  action: { kind: "strikeWithStick" },
});
let state = setProgram(newKnowingGame(), STRIKE).state;
state = createCharacter(state, "Ala").state;
state = {
  ...state,
  solvedMaps: ["forestEdge", "forest"],
};
state = send(state, { mapId: "forest", characterId: 1 }, T0).state;
const attack = {
  creatureId: "wolf",
  attackMinute: state.run.minute,
  resolveMinute: state.run.minute + 1,
};
state = {
  ...state,
  paused: false,
  run: {
    ...state.run,
    character: {
      ...state.run.character,
      backpack: { ...state.run.character.backpack, stick: 2 },
    },
    current: null,
    activeCombat: attack,
    lastCombat: { ...attack, result: null },
  },
};
assert.equal(state.run.character.gear.mainHand, null, "precondition");
state = advanceMinutes(state, 1).state;
const result = state.run.lastCombat.result;
assert.equal(result.outcome, "creatureDefeated");
assert.equal(result.exchanges[0].characterAction.refill, true);
assert.equal(state.run.character.gear.mainHand, "stick");
assert.equal(state.run.character.backpack.stick, 1);

const document = savedGame(withSaveTime(state, T0 + 60_000));
const loaded = loadSavedGame(JSON.parse(JSON.stringify(document)));
assert.equal(loaded.ok, true, "the game's own fight loads");
assert.deepEqual(loaded.state.run.lastCombat, state.run.lastCombat);

const ended = end(state).state;
assert.equal(ended.team.characters[0].gear.mainHand, "stick");
console.log("probe ok");
