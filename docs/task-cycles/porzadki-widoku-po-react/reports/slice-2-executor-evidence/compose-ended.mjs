// Working copy: a saved document whose map run ended in the character's death by cold.
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, withSaveTime, setProgram, advanceMinutes, setPaused, settleDeath } = await load("game.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");
let state = createCharacter(newGame(), "Agent").state;
const empty = {
  groups: [{ id: 1, name: "G", condition: { kind: "always" }, rules: [] }],
  tripPlan: { take: [], bring: [] },
  nextGroupId: 2,
  nextRuleId: 1,
};
state = setProgram(state, empty).state;
state = send(state, { mapId: "forestEdge", characterId: 1 }, 0).state;
for (let i = 0; i < 40 && state.run.death === null; i++) {
  if (state.paused) state = setPaused(state, false).state;
  state = advanceMinutes(state, 500).state;
}
state = settleDeath(state, Date.now()).state;
console.error("run:", state.run.minute, JSON.stringify(state.run.death), JSON.stringify(state.run.completion), state.paused);
const saved = savedGame(withSaveTime(state, Date.now()));
const back = loadSavedGame(saved);
console.error("reload:", JSON.stringify(back).slice(0, 200));
process.stdout.write(`${JSON.stringify(saved)}\n`);
