// Review 4 probe: run from the root of a worktree of 16e9e93e after `npm run build`:
//   node probe-review-4.mjs > probe-review-4.out.txt
import { resolveCombat } from "./dist/browser/sim/combat.js";
import { ITEMS } from "./dist/browser/sim/data/items.js";
import { MAPS } from "./dist/browser/sim/data/maps.js";
import { fitsSlot } from "./dist/browser/sim/character.js";
import {
  advanceMinutes,
  createCharacter,
  send,
  setProgram,
  withSaveTime,
} from "./dist/browser/sim/game.js";
import { combatPiece } from "./dist/browser/sim/program.js";
import { newMapRun } from "./dist/browser/sim/run.js";
import { loadSavedGame, savedGame } from "./dist/browser/sim/saved-game.js";
import { programFromRules } from "./tests/sim/program-fixture.mjs";
import {
  newKnowingGame,
  withEdgeSolved,
} from "./tests/sim/understanding-fixture.mjs";

const out = [];
const say = (label, value) => out.push(`${label}: ${JSON.stringify(value)}`);

const EMPTY_GEAR = {
  mainHand: null,
  secondHand: null,
  head: null,
  torso: null,
  legs: null,
  pocket1: null,
  pocket2: null,
  pocket3: null,
};
const NO_PIECES = { stick: 0, berry: 0, moss: 0, fiber: 0, bandage: 0 };
const BOUGHT = { tending: { practice: 60, ranks: { pressure: 1 } } };

// Probe 1: a healing item whose data name no place of the gear (as SPLINT of pressure.test.mjs).
ITEMS.splint = {
  name: "szyna",
  plural: { few: "szyny", many: "szyn" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "gathered", item: "moss" },
  healing: { health: 10 },
};
const SPLINT = { kind: "pressure", item: "splint" };
say("fitsSlot(splint, pocket1)", fitsSlot("splint", "pocket1"));
say(
  "combatPiece(splint in backpack, empty pockets)",
  combatPiece(
    { gear: EMPTY_GEAR, backpack: { ...NO_PIECES, splint: 1 } },
    SPLINT,
  ),
);
const { run } = newMapRun(
  MAPS.forest,
  1,
  programFromRules(),
  { mapId: "forest", characterId: 1 },
  undefined,
  BOUGHT,
  { ...NO_PIECES, splint: 1 },
  { ...EMPTY_GEAR },
);
const hurt = { ...run, body: { ...run.body, health: 40 } };
const fight = resolveCombat(
  hurt,
  "wolf",
  programFromRules(
    { condition: { kind: "healthBelow", value: 50 }, action: SPLINT },
    { condition: { kind: "always" }, action: { kind: "kick" } },
  ),
);
say("first turn with Ucisk — szyna", fight.exchanges[0].characterAction);
say("backpack splint after", fight.backpack.splint);
delete ITEMS.splint;

// Probe 2: a saved fight with turns of Ucisk, in a game whose characters lack the branch.
function attacked(skills) {
  const created = createCharacter(
    withEdgeSolved(newKnowingGame()),
    "Ala",
  ).state;
  const skilled = {
    ...created,
    team: {
      ...created.team,
      characters: created.team.characters.map((character) => ({
        ...character,
        skills: { ...character.skills, ...skills },
      })),
    },
  };
  const program = programFromRules(
    {
      condition: { kind: "healthBelow", value: 50 },
      action: { kind: "pressure", item: "bandage" },
    },
    { condition: { kind: "always" }, action: { kind: "kick" } },
  );
  const sent = send(
    setProgram(skilled, program).state,
    { mapId: "forest", characterId: 1 },
    1_760_000_000_000,
  ).state;
  const attack = { creatureId: "wolf", attackMinute: 0, resolveMinute: 1 };
  return {
    ...sent,
    run: {
      ...sent.run,
      body: { ...sent.run.body, health: 40 },
      character: {
        ...sent.run.character,
        backpack: { ...sent.run.character.backpack, bandage: 1 },
        gear: { ...sent.run.character.gear, pocket1: "bandage" },
      },
      current: null,
      activeCombat: attack,
      lastCombat: { ...attack, result: null },
    },
  };
}
const after = advanceMinutes(attacked(BOUGHT), 1).state;
const document = JSON.parse(
  JSON.stringify(savedGame(withSaveTime(after, 1_760_000_060_000))),
);
say(
  "turn kinds in the saved fight",
  document.game.run.lastCombat.result.exchanges.map(
    (e) => e.characterAction?.action.kind,
  ),
);
document.game.run.character.skills.tending.ranks = {};
for (const character of document.game.team.characters)
  if (character.skills.tending) character.skills.tending.ranks = {};
const loaded = loadSavedGame(document);
say("load with the branch removed: ok", loaded.ok);
if (loaded.ok)
  say(
    "loaded turn 0",
    loaded.state.run.lastCombat.result.exchanges[0].characterAction,
  );

process.stdout.write(`${out.join("\n")}\n`);
