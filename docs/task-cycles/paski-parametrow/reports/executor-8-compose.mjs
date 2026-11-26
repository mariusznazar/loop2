// Working script of executor 8: prints the saved document of a game whose map run on Las stands
// one game minute before the first attack of a wolf, paused, with the body given on the command line
// (temperature satiety health), so that the pulse and, after "Wznow", the blow can be seen.
import { pathToFileURL } from "node:url";
import { join } from "node:path";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, advanceMinutes, setPaused, withSaveTime } =
  await load("game.js");
const { savedGame } = await load("saved-game.js");

const [temperature, satiety, health] = process.argv.slice(2).map(Number);

const { withEdgeSolved } = await import(pathToFileURL(join(process.cwd(), "tests", "sim", "understanding-fixture.mjs")).href);
let before = null;
let found = false;
for (let ms = 1760000000000; ms < 1760000000050 && !found; ms += 1) {
  let state = createCharacter({ ...withEdgeSolved(newGame()), solvedMaps: ["forestEdge", "forest", "forestDeep", "forestPack"] }, "Agent").state;
  state = send(state, { mapId: "forestPack", characterId: 1 }, ms).state;
  state = setPaused(state, false).state;
  before = state;
  for (let minute = 0; minute < 530; minute += 1) {
    const next = advanceMinutes(before, 1);
    if (next.events.some((event) => event.kind === "attacked")) {
      found = true;
      break;
    }
    before = {
      ...next.state,
      run: {
        ...next.state.run,
        body: { temperature: 37, satiety: 100, health: 100 },
      },
    };
  }
}
if (!found) throw new Error("no attack found");
const fighting = process.argv[5] === "fight";
if (fighting) {
  const { discover } = await load("understanding.js");
  const { programFromRules } = await import(pathToFileURL(join(process.cwd(), "tests", "sim", "program-fixture.mjs")).href);
  const program = {
    ...programFromRules({ condition: { kind: "always" }, action: { kind: "strikeWithStick" } }),
    tripPlan: { take: [], bring: [] },
  };
  const attackedEvent = [{ kind: "attacked", minute: 1, creature: "wolf" }];
  const revealed = discover(before.understanding, before.run, before.run, attackedEvent);
  before = {
    ...before,
    understanding: revealed ? revealed.understanding : before.understanding,
    programs: before.programs.map((entry) => ({ ...entry, program })),
    ruleCounts: { 1: 0 },
    countsProgram: null,
    run: {
      ...before.run,
      copy: { ...before.run.copy, program, base: program },
      character: {
        ...before.run.character,
        backpack: { ...before.run.character.backpack, stick: 1 },
      },
    },
  };
}
before = {
  ...before,
  run: { ...before.run, body: { temperature, satiety, health } },
};
before = setPaused(before, true).state;
process.stderr.write(`minute ${before.run.minute}\n`);
process.stdout.write(`${JSON.stringify(savedGame(withSaveTime(before, Date.now())))}\n`);
