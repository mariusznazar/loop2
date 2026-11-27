// Probe of correction 1a: an archetype without the tree of tending, laid in the data together with
// a second recipe item no skill grows, sends a character whose program starts with
// „Wytwórz — Opatrunek”. Prints what the simulation picks, what the rule panel shows, and what the
// pick of the target of „Wytwórz” offers.
import { ARCHETYPES } from "../../dist/browser/sim/data/archetypes.js";
import { ITEMS } from "../../dist/browser/sim/data/items.js";
import {
  createCharacter,
  newGame,
  ruleSigns,
  send,
  setProgram,
} from "../../dist/browser/sim/game.js";
import { knownTargets } from "../../dist/browser/view/item-target-pick.js";
import { programFromRules } from "../../tests/sim/program-fixture.mjs";
import {
  fullUnderstanding,
  withEdgeSolved,
} from "../../tests/sim/understanding-fixture.mjs";

ITEMS.board = {
  name: "deska",
  plural: { few: "deski", many: "desek" },
  icon: "first-aid-kit",
  iconTitle: "First aid kit icon",
  revealedBy: { kind: "gathered", item: "moss" },
  recipe: { uses: [{ item: "moss", count: 1 }], minutes: 5 },
};
ARCHETYPES.probeArchetype = {
  ...ARCHETYPES.elementalMage,
  predispositions: ARCHETYPES.elementalMage.predispositions.filter(
    (skill) => skill !== "tending",
  ),
};

const always = { kind: "always" };
let state = createCharacter(
  { ...withEdgeSolved(newGame()), understanding: fullUnderstanding() },
  "Ala",
).state;
state = {
  ...state,
  team: {
    ...state.team,
    characters: state.team.characters.map((c) => ({
      ...c,
      archetypeId: "probeArchetype",
    })),
    chest: { pieces: { moss: 10 } },
  },
};
const program = {
  ...programFromRules(
    { condition: always, action: { kind: "craft", item: "bandage" } },
    { condition: always, action: { kind: "craft", item: "board" } },
    { condition: always, action: { kind: "explore" } },
  ),
  tripPlan: { take: [{ item: "moss", count: 4 }], bring: [] },
};
state = setProgram(state, program).state;
console.log("offer outside a map run:", JSON.stringify(knownTargets(state, "craft")));
state = send(state, { mapId: "forest", characterId: 1 }, 1760000000000).state;
console.log("backpack moss:", state.run.character.backpack.moss);
console.log("activity:", JSON.stringify(state.run.current.activity));
const signs = ruleSigns(state);
console.log("rule signs:", JSON.stringify(signs.judgement.rules));
console.log("offer in the map run:", JSON.stringify(knownTargets(state, "craft")));
