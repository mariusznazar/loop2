// Working copy of slice 6: composes the saved documents of the states the real-game comparison
// opens. Run in the worktree root after `npm run build`: node .runs/slice-6-executor/compose.mjs
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { writeFileSync } from "node:fs";

const sim = join(process.cwd(), "dist", "browser", "sim");
const load = (name) => import(pathToFileURL(join(sim, name)).href);
const { newGame, createCharacter, send, setProgram, advanceMinutes, setPaused, settleDeath, settleCompletion, withSaveTime } = await load("game.js");
const { savedGame, loadSavedGame } = await load("saved-game.js");

const rule = (condition, action) => ({ condition, action });
const ALWAYS = { kind: "always" };
const below = (kind, value) => ({ kind, value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const gather = (resource) => ({ kind: "gather", resource });
const walkTo = (resource) => ({ kind: "walkTo", resource });
const berry = "berry";
const stick = "stick";
const rules = [
  rule(below("satietyBelow", 35), { kind: "eat" }),
  rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
  rule(below("temperatureBelow", 36.5), { kind: "feedCampfire" }),
  rule(below("temperatureBelow", 35.2), { kind: "walkToCampfire" }),
  rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
  rule(itemBelow(berry, 1), gather(berry)),
  rule(itemBelow(berry, 1), walkTo(berry)),
  rule({ kind: "hereBelow", resource: berry, value: 1 }, { kind: "explore" }),
  rule(itemBelow(berry, 1), { kind: "wander" }),
  rule(itemBelow(stick, 8), gather(stick)),
  rule(itemBelow(stick, 8), walkTo(stick)),
  rule(below("temperatureBelow", 36), { kind: "lightItem" }),
  rule(ALWAYS, { kind: "explore" }),
  rule({ kind: "awayFromCampfire" }, { kind: "walkToCampfire" }),
  rule(ALWAYS, gather(stick)),
  rule(ALWAYS, gather(berry)),
  rule(ALWAYS, { kind: "wander" }),
].map((r, i) => ({ ...r, id: i + 1 }));
const program = {
  groups: [
    { id: 1, name: "Program", condition: ALWAYS, rules: rules.slice(0, 9) },
    { id: 2, name: "Reszta", condition: ALWAYS, rules: rules.slice(9) },
  ],
  tripPlan: { take: [{ item: "stick", count: 4 }, { item: "berry", count: 2 }], bring: [{ item: "berry", count: 1 }] },
  nextGroupId: 3,
  nextRuleId: rules.length + 1,
};

function start() {
  let state = createCharacter(newGame(), "Agent").state;
  state = setProgram(state, program).state;
  return send(state, { mapId: "forestEdge", characterId: 1 }, 0).state;
}
function resume(state) {
  return state.paused ? setPaused(state, false).state : state;
}
function writeDoc(name, state) {
  const saved = savedGame(withSaveTime(state, 1760000800000));
  if (loadSavedGame(saved) === null) throw new Error(`${name} does not load`);
  writeFileSync(new URL(`./doc-${name}.json`, import.meta.url), `${JSON.stringify(saved)}\n`);
  console.log(name, state.run?.minute, state.paused, !!state.discovery, JSON.stringify(state.run?.death), JSON.stringify(state.run?.completion));
}

// 1. a paused map run with no discovery held, at minute 124
let live = start();
for (let i = 0; i < 40 && live.run.minute < 124; i++) {
  live = resume(live);
  live = advanceMinutes(live, Math.min(20, 124 - live.run.minute)).state;
}
live = setPaused(live, true).state;
if (live.discovery) throw new Error("live holds a discovery");
writeDoc("live", live);

// 2. a map run paused at a discovery (the first discovery of the run)
let disc = start();
disc = advanceMinutes(disc, 20).state;
if (!disc.discovery) throw new Error("no discovery at 20");
writeDoc("discovery", disc);

// 3. the end of a run by death
let dead = start();
for (let i = 0; i < 60 && !dead.run.death; i++) {
  dead = resume(dead);
  dead = advanceMinutes(dead, 20).state;
}
dead = settleDeath(dead, 1760000800000).state;
writeDoc("death", dead);

// 4. the end of a run by a completion: the solving condition of the map is lowered to 5 minutes in
// this process alone, so the game's own functions complete the run at minute 5; the document is
// loaded by the page with the real condition (the load checks the document's shape, not the goal)
const { MAPS } = await load("data/maps.js");
MAPS.forestEdge.solving.streak = 5;
let done = start();
for (let i = 0; i < 10 && !done.run.completion; i++) {
  done = resume(done);
  done = advanceMinutes(done, 5).state;
}
done = settleCompletion(done, 1760000800000).state;
writeDoc("completion", done);
