// Builds one game state with functions of the built simulation and prints its saved document as
// JSON: a character that has met the wolf, so the combat actions stand in the Understanding, and
// has bought the branch "Obchód". It holds no account, no session and no address and writes
// nothing to a database; the skill says how the document reaches the local game. Run it in the
// repository's root after `npm run build`.
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, withSaveTime } = await load("game.js");
const { discover } = await load("understanding.js");
const { buyBranch, paidPractice } = await load("skills.js");
const { savedGame } = await load("saved-game.js");

const CHARACTER_ID = 1;
const BRANCH = "patrol";
const POINTS = 3; // practice of its skill that pays the branch's cost; see BRANCHES

let state = createCharacter(newGame(), "Agent").state;

// The Understanding grows only through events of a map run, so take a real map run to read them
// against and keep the Understanding it yields, not the map run.
const run = send(state, { mapId: "forest", characterId: CHARACTER_ID }, 0).state
  .run;
const hold = (item) => ({ ...run.character.backpack, [item]: 1 });
const steps = [
  // [events, map run after]: each event reveals what the data says it reveals.
  [[], { ...run, body: { ...run.body, temperature: -50 } }],
  [[{ kind: "attacked", minute: 1, creature: "wolf" }], run],
  [[finished("explore"), ...revealedTiles()], run],
  [
    [finished("gather")],
    { ...run, character: { ...run.character, backpack: hold("stick") } },
  ],
  [
    [finished("gather")],
    { ...run, character: { ...run.character, backpack: hold("berry") } },
  ],
];
function revealedTiles() {
  return run.tiles
    .filter((tile) => Object.keys(tile.stock).length > 0)
    .map((tile) => ({ kind: "tileRevealed", minute: 1, at: tile.at }));
}
function finished(kind) {
  const action = kind === "gather" ? { kind, resource: "stick" } : { kind };
  return {
    kind: "activityFinished",
    minute: 1,
    activity: { kind: "rule", ruleId: 1, action },
  };
}
let understanding = state.understanding;
for (const [events, after] of steps)
  understanding =
    discover(understanding, run, after, events)?.understanding ?? understanding;
state = { ...state, understanding };

// Pay practice into the character's skills, so the points are there, then buy the branch.
const character = state.team.characters[0];
const skills = paidPractice(character.skills, { smallItemGathering: 160 });
state = {
  ...state,
  team: { ...state.team, characters: [{ ...character, skills }] },
};
state = buyBranch(state, CHARACTER_ID, BRANCH).state;

// Every saved document is stamped with the moment of its save; one stamped now leaves no time to
// pass away from the game.
const saved = savedGame(withSaveTime(state, Date.now()));
process.stdout.write(`${JSON.stringify(saved)}\n`);
