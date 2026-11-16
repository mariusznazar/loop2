// Working copy of slice 7: composes the saved document of the state the screens are recorded in: one
// character, "Agent", with the verbs of combat in the Understanding and the branch "patrol" bought
// (as .claude/skills/loop2-play/compose-state.mjs does), stamped with a fixed save time.
//   node .runs/slice-7-executor/compose7.mjs   (worktree root, after npm run build)
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { writeFileSync } from "node:fs";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, withSaveTime } = await load("game.js");
const { discover } = await load("understanding.js");
const { buyBranch, paidPractice } = await load("skills.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");

let state = createCharacter(newGame(), "Agent").state;
const run = send(state, { mapId: "forestEdge", characterId: 1 }, 0).state.run;
const hold = (item) => ({ ...run.character.backpack, [item]: 1 });
const finished = (kind) => ({
  kind: "activityFinished",
  minute: 1,
  activity: { kind: "rule", ruleId: 1, action: kind === "gather" ? { kind, resource: "stick" } : { kind } },
});
const revealed = run.tiles
  .filter((tile) => Object.keys(tile.stock).length > 0)
  .map((tile) => ({ kind: "tileRevealed", minute: 1, at: tile.at }));
const steps = [
  [[], { ...run, body: { ...run.body, temperature: -50 } }],
  [[{ kind: "attacked", minute: 1, creature: "wolf" }], run],
  [[finished("explore"), ...revealed], run],
  [[finished("gather")], { ...run, character: { ...run.character, backpack: hold("stick") } }],
  [[finished("gather")], { ...run, character: { ...run.character, backpack: hold("berry") } }],
];
let understanding = state.understanding;
for (const [events, after] of steps)
  understanding = discover(understanding, run, after, events)?.understanding ?? understanding;
state = { ...state, understanding };
const character = state.team.characters[0];
state = { ...state, team: { ...state.team, characters: [{ ...character, skills: paidPractice(character.skills, { smallItemGathering: 160 }) }] } };
state = buyBranch(state, 1, "patrol").state;
const saved = savedGame(withSaveTime(state, 1760000800000));
if (loadSavedGame(saved) === null) throw new Error("does not load");
writeFileSync(new URL("./doc-skills.json", import.meta.url), `${JSON.stringify(saved)}\n`);
console.log("skills ok");
