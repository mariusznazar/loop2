// Prints the saved document of a game with Las solved (forestDeep open), or with forestDeep solved too
// where the argument is "solved". Run in the worktree root after the build.
import { pathToFileURL } from "node:url";
import { join } from "node:path";
const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, withSaveTime } = await load("game.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");
let state = createCharacter(newGame(), "Agent").state;
const maps = process.argv[2] === "solved"
  ? ["forestEdge", "forest", "forestDeep"]
  : ["forestEdge", "forest"];
state = { ...state, solvedMaps: maps };
const saved = savedGame(withSaveTime(state, Date.now()));
const back = loadSavedGame(saved);
if (!back || back.refused) { console.error("refused", JSON.stringify(back)); process.exit(1); }
process.stdout.write(`${JSON.stringify(saved)}\n`);
