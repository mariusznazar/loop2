import { writeFileSync } from "node:fs";
import { ACTIONS } from "../../../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../../../dist/public/sim/data/conditions.js";
import { CREATURES } from "../../../../dist/public/sim/data/creatures.js";
import { ITEMS } from "../../../../dist/public/sim/data/items.js";
import { CAMPFIRE } from "../../../../dist/public/sim/data/campfire.js";
import { MAPS } from "../../../../dist/public/sim/data/maps.js";
import { newGame, createCharacter, setProgram, advanceMinutes, setPaused } from "../../../../dist/public/sim/game.js";
import { newMapRun } from "../../../../dist/public/sim/run.js";

const map = MAPS.forestDeep;
const always = { kind: "always" };
const rule = (condition, action) => ({ condition, action });
const below = (kind, value) => ({ kind, value });
const itemBelow = (item, value) => ({ kind: "itemBelow", item, value });
const gather = (resource) => ({ kind: "gather", resource });
const walkTo = (resource) => ({ kind: "walkTo", resource });
const baseRules = [
  rule(below("satietyBelow", 35), { kind: "eat" }),
  rule(below("temperatureBelow", 36), { kind: "lightCampfire" }),
  rule(below("temperatureBelow", 36.5), { kind: "feedCampfire" }),
  rule(below("temperatureBelow", 35.2), { kind: "walkToCampfire" }),
  rule(below("campfireLeftBelow", 1), { kind: "craftCampfire" }),
  rule(itemBelow("berry", 1), gather("berry")),
  rule(itemBelow("berry", 1), walkTo("berry")),
  rule({ kind: "hereBelow", resource: "berry", value: 1 }, { kind: "explore" }),
  rule(itemBelow("berry", 1), { kind: "wander" }),
  rule(itemBelow("stick", 8), gather("stick")),
  rule(itemBelow("stick", 8), walkTo("stick")),
  rule(below("temperatureBelow", 36), { kind: "lightItem" }),
  rule(always, { kind: "explore" }),
  rule({ kind: "awayFromCampfire" }, { kind: "walkToCampfire" }),
  rule(always, gather("stick")),
  rule(always, gather("berry")),
  rule(always, { kind: "wander" }),
];
const program = {
  groups: [
    { id: 1, name: "Combat", condition: always, rules: [
      rule(always, { kind: "strikeWithStick" }),
      rule(always, { kind: "kick" }),
    ].map((entry, index) => ({ ...entry, id: index + 18 })) },
    { id: 2, name: "Existing", condition: always,
      rules: baseRules.map((entry, index) => ({ ...entry, id: index + 1 })) },
  ], nextGroupId: 3, nextRuleId: 20,
};
const understanding = {
  actions: Object.keys(ACTIONS), conditions: Object.keys(CONDITIONS),
  items: [...Object.keys(ITEMS), CAMPFIRE.id], creatures: Object.keys(CREATURES),
};
const results = [];
for (let seed = 1; seed <= 20; seed += 1) {
  let state = newGame();
  state = { ...state, understanding, solvedMaps: ["forest"] };
  state = createCharacter(state, "Ala").state;
  state = setProgram(state, program).state;
  const run = newMapRun(map, seed, program, { mapId: "forestDeep", characterId: 1 });
  state = { ...state, run: run.run, lastSeed: seed, paused: false };
  const discoveries = [];
  while (state.run.minute < 5000 && !state.run.death && !state.run.completion) {
    const before = state.run.minute;
    const advanced = advanceMinutes(state, 1);
    state = advanced.state;
    for (const event of advanced.events) if (event.kind === "discovered") discoveries.push(event.id);
    if (state.discovery) state = setPaused(state, false).state;
    if (state.run.minute === before && !state.run.death && !state.run.completion)
      throw new Error(`seed ${seed} made no progress at minute ${before}`);
  }
  const outcome = state.run.completion ? "completed" : state.run.death ? "died" : "limit";
  results.push({ seed, outcome, minute: state.run.minute, streak: state.run.streak,
    defeatedAttacks: state.run.defeatedAttacks, discoveries, resumptions: discoveries.length });
}
writeFileSync(new URL("./measurement-20-seeds.json", import.meta.url),
  `${JSON.stringify({ program, preparation: { minute: 0, body: "standard", backpack: "empty",
    understanding: "Las and first wolf fully known", solvedMaps: ["forest"] }, results }, null, 2)}\n`);
const lines = ["# 20-seed measurement", "", "Command: `node .runs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs`",
  "", "The actual fixed program (group conditions and rule order included):", "", "```json",
  JSON.stringify(program, null, 2), "```",
  "Preparation: actual `newMapRun` seeds 1-20, minute 0, standard body, empty backpack, full knowledge available after Las and first wolf, forest solved to open forestDeep. No tuning; cap 5000.",
  "", `Completed: ${results.filter((r) => r.outcome === "completed").length}/20`, "",
  "| Seed | Result | Minute | Streak | Defeated attacks | Discoveries / resumptions |", "|---:|---|---:|---:|---:|---:|"];
for (const r of results) lines.push(`| ${r.seed} | ${r.outcome} | ${r.minute} | ${r.streak} | ${r.defeatedAttacks} | ${r.discoveries.length} / ${r.resumptions} |`);
writeFileSync(new URL("./measurement-20-seeds.md", import.meta.url), `${lines.join("\n")}\n`);
