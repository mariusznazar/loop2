// Prints the saved document of a game with one character, "Agent", in a paused map run on forestEdge
// after <minutes> game minutes, with the body given as temperature, satiety, health, and with the
// word "fire" a burning campfire on the character's tile. Run in the repository's root after the build.
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, advanceMinutes, setPaused, withSaveTime } = await load("game.js");
const { savedGame } = await load("saved-game.js");

const [minutes, temperature, satiety, health] = process.argv.slice(2, 6).map(Number);
const fire = process.argv[6] === "fire";

let state = createCharacter(newGame(), "Agent").state;
state = send(state, { mapId: "forestEdge", characterId: 1 }, 1760000000000).state;
state = setPaused(state, false).state;
for (let guard = 0; state.run.minute < minutes && guard < 20; guard += 1) {
  state = advanceMinutes(state, minutes - state.run.minute).state;
  state = setPaused(state, false).state;
}
state = {
  ...state,
  run: {
    ...state.run,
    body: { temperature, satiety, health },
    campfires: fire ? [{ at: state.run.character.at, minutesLeft: 20 }] : state.run.campfires,
  },
};
state = setPaused(state, true).state;
process.stderr.write(`minute ${state.run.minute}\n`);
process.stdout.write(`${JSON.stringify(savedGame(withSaveTime(state, Date.now())))}\n`);
