// The measurement of task plomyk, To do 8: the measurement of task 8 (walka-w-glebi-lasu) repeated
// with the price of Płomyk in nature energy — the same program, the same preparation, seeds 1-20 on
// Las — głębiej. Run from the repository root after `npm run build`:
//   node .runs/task-cycles/plomyk/reports/measurement.mjs
// The program, the preparation and the loop are those of the task-8 script,
// `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs`; this script adds,
// for each seed, the cause of death, the nature energy in the last game minute and the count of
// picks at which the program passed over a „Zapal” rule for want of nature energy.
import { writeFileSync } from "node:fs";
import { ACTIONS } from "../../../../dist/public/sim/data/actions.js";
import { CONDITIONS } from "../../../../dist/public/sim/data/conditions.js";
import { CREATURES } from "../../../../dist/public/sim/data/creatures.js";
import { ITEMS } from "../../../../dist/public/sim/data/items.js";
import { CAMPFIRE } from "../../../../dist/public/sim/data/campfire.js";
import { MAPS } from "../../../../dist/public/sim/data/maps.js";
import {
  newGame,
  createCharacter,
  setProgram,
  advanceMinutes,
  setPaused,
} from "../../../../dist/public/sim/game.js";
import { newMapRun } from "../../../../dist/public/sim/run.js";
import {
  actionFeasible,
  conditionHolds,
} from "../../../../dist/public/sim/program.js";

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
    {
      id: 1,
      name: "Combat",
      condition: always,
      rules: [
        rule(always, { kind: "strikeWithStick" }),
        rule(always, { kind: "kick" }),
      ].map((entry, index) => ({ ...entry, id: index + 18 })),
    },
    {
      id: 2,
      name: "Existing",
      condition: always,
      rules: baseRules.map((entry, index) => ({ ...entry, id: index + 1 })),
    },
  ],
  nextGroupId: 3,
  nextRuleId: 20,
};
const understanding = {
  actions: Object.keys(ACTIONS),
  conditions: Object.keys(CONDITIONS),
  items: [...Object.keys(ITEMS), CAMPFIRE.id],
  creatures: Object.keys(CREATURES),
};

// The result before the change, as the task-8 report gives it:
// `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement-20-seeds.md`, lines
// 232-251 — seed: [result, minute].
const BEFORE = {
  1: ["died", 247],
  2: ["died", 258],
  3: ["died", 256],
  4: ["died", 202],
  5: ["died", 253],
  6: ["died", 306],
  7: ["died", 276],
  8: ["died", 223],
  9: ["died", 256],
  10: ["died", 252],
  11: ["died", 202],
  12: ["died", 243],
  13: ["died", 272],
  14: ["died", 247],
  15: ["died", 229],
  16: ["died", 247],
  17: ["died", 722],
  18: ["died", 253],
  19: ["died", 202],
  20: ["died", 249],
};

const LIGHTING = new Set(["lightCampfire", "lightItem"]);

// A control of the counting, not the measurement: with START_ENERGY set, every run starts with that
// nature energy instead of the full 100, and the results go to the console alone, no file written.
const CONTROL = process.env.START_ENERGY;

/**
 * At a pick made in the run's minute, the „Zapal” rules the program passed over for want of nature
 * energy alone: rules standing before the rule picked (or every rule, where none was picked), in a
 * group whose condition holds, whose own condition holds, and whose action is feasible with the
 * energy taken as unlimited but not with the run's energy. The program reads the run after the
 * minute's effects, which the pick leaves as they stand.
 */
function passedForEnergy(run, pickedRuleId) {
  const unlimited = { ...run, natureEnergy: Number.POSITIVE_INFINITY };
  let passed = 0;
  for (const group of program.groups) {
    if (!conditionHolds(run, map, group.condition)) continue;
    for (const each of group.rules) {
      if (each.id === pickedRuleId) return passed;
      if (
        LIGHTING.has(each.action.kind) &&
        conditionHolds(run, map, each.condition) &&
        actionFeasible(unlimited, map, each.action) &&
        !actionFeasible(run, map, each.action)
      )
        passed += 1;
    }
  }
  return passed;
}

const results = [];
for (let seed = 1; seed <= 20; seed += 1) {
  let state = newGame();
  state = { ...state, understanding, solvedMaps: ["forest"] };
  state = createCharacter(state, "Ala").state;
  state = setProgram(state, program).state;
  const run = newMapRun(map, seed, program, {
    mapId: "forestDeep",
    characterId: 1,
  });
  // Since task 12 (programy-gracza) a map run carries the copy of its program (D-164), which the
  // task-8 script, older, did not give it: the copy of program 1, holding the program set above.
  const saved = state.programs[0];
  const copy = {
    program: saved.program,
    programId: saved.id,
    deletedName: null,
    base: saved.program,
  };
  state = {
    ...state,
    run: {
      ...run.run,
      copy,
      ...(CONTROL !== undefined && { natureEnergy: Number(CONTROL) }),
    },
    lastSeed: seed,
    paused: false,
  };
  let passes = 0;
  let lightings = 0;
  let lowest = state.run.natureEnergy;
  while (
    state.run.minute < 5000 &&
    !state.run.death &&
    !state.run.completion
  ) {
    const before = state.run.minute;
    const advanced = advanceMinutes(state, 1);
    state = advanced.state;
    for (const event of advanced.events) {
      if (event.kind === "activityStarted")
        passes += passedForEnergy(
          state.run,
          event.activity.kind === "rule" ? event.activity.ruleId : null,
        );
      if (
        event.kind === "activityFinished" &&
        event.activity.kind === "rule" &&
        LIGHTING.has(event.activity.action.kind)
      )
        lightings += 1;
    }
    lowest = Math.min(lowest, state.run.natureEnergy);
    if (state.discovery) state = setPaused(state, false).state;
    if (
      state.run.minute === before &&
      !state.run.death &&
      !state.run.completion
    )
      throw new Error(`seed ${seed} made no progress at minute ${before}`);
  }
  const outcome = state.run.completion
    ? "completed"
    : state.run.death
      ? "died"
      : "limit";
  results.push({
    seed,
    before: BEFORE[seed],
    outcome,
    cause: state.run.death?.cause ?? null,
    minute: state.run.minute,
    natureEnergy: state.run.natureEnergy,
    lowestNatureEnergy: lowest,
    lightingsFinished: lightings,
    passedForEnergy: passes,
    streak: state.run.streak,
    defeatedAttacks: state.run.defeatedAttacks,
  });
}

if (CONTROL !== undefined) {
  console.log(
    results
      .map(
        (r) =>
          `${r.seed} ${r.outcome} ${r.minute} e=${r.natureEnergy} pass=${r.passedForEnergy} lit=${r.lightingsFinished}`,
      )
      .join("\n"),
  );
  process.exit(0);
}
writeFileSync(
  new URL("./measurement-20-seeds.json", import.meta.url),
  `${JSON.stringify({ program, results }, null, 2)}\n`,
);
const lines = [
  "# 20-seed measurement on Las — głębiej with the price of Płomyk in nature energy",
  "",
  "Command: `node .runs/task-cycles/plomyk/reports/measurement.mjs` (after `npm run build`), script beside this file.",
  "",
  "Program and preparation: those of the task-8 measurement, unchanged (`git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement.mjs`): the group „Combat” („Zawsze → Uderz — patyk”, „Zawsze → Kopnij”) above the 17 rules of the Las acceptance program; `newMapRun` on seeds 1-20, minute 0, standard body, full nature energy (100), empty backpack, everything of Las and the first wolf known, Las solved; every discovery pause resumed; cap 5000 minutes. No threshold applies (task plomyk, To do 8, Q9).",
  "",
  "Before: the task-8 result (`measurement-20-seeds.md` at 1933a3f, lines 232-251), without nature energy. After: this run. Energy: the nature energy in the game minute the run ended (the minute of death). Passed over: picks at which the program passed over a „Zapal” rule whose condition held and which only the lack of nature energy made infeasible, each such rule counted once per pick. Lowest: the lowest nature energy of the run. Lightings: finished „Zapal”, of a campfire or a stick.",
  "",
  `Completed after: ${results.filter((r) => r.outcome === "completed").length}/20; before: 0/20.`,
  "",
  "| Seed | Before: result, minute | After: result, minute | Cause | Energy at that minute | Passed over „Zapal” for energy | Lowest energy | Lightings | Defeated attacks |",
  "|---:|---|---|---|---:|---:|---:|---:|---:|",
];
for (const r of results)
  lines.push(
    `| ${r.seed} | ${r.before[0]}, ${r.before[1]} | ${r.outcome}, ${r.minute} | ${r.cause ?? "—"} | ${r.natureEnergy} | ${r.passedForEnergy} | ${r.lowestNatureEnergy} | ${r.lightingsFinished} | ${r.defeatedAttacks} |`,
  );
writeFileSync(
  new URL("./measurement-20-seeds.md", import.meta.url),
  `${lines.join("\n")}\n`,
);
console.log(
  results
    .map(
      (r) =>
        `${r.seed} ${r.before[1]} -> ${r.outcome} ${r.minute} e=${r.natureEnergy} pass=${r.passedForEnergy}`,
    )
    .join("\n"),
);
