// The engine of the balance instrument: it runs the game's real simulation outside the browser. It
// imports the built simulation (dist/browser/sim) and copies no number of the game: every value
// comes from the imported functions and data. A map run is stepped with `newMapRun` and
// `stepMinute`, the functions the game itself passes a game minute with, so a seed run here ends as
// it ends in the game (invariant instrument-game-agreement).

import {
  ARCHETYPES,
  CREATED_ARCHETYPE,
} from "../dist/browser/sim/data/archetypes.js";
import { ACTIONS } from "../dist/browser/sim/data/actions.js";
import { CAMPFIRE } from "../dist/browser/sim/data/campfire.js";
import { CONDITIONS } from "../dist/browser/sim/data/conditions.js";
import { CREATURES } from "../dist/browser/sim/data/creatures.js";
import { ITEMS } from "../dist/browser/sim/data/items.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { BRANCHES, SKILLS } from "../dist/browser/sim/data/skills.js";
import {
  createCharacter,
  newGame,
  programOf,
  setProgram,
} from "../dist/browser/sim/game.js";
import { teamProgram } from "../dist/browser/sim/programs.js";
import { minuteKind } from "../dist/browser/sim/run-record.js";
import { mapRunEnded, newMapRun, stepMinute } from "../dist/browser/sim/run.js";
import { newSkills } from "../dist/browser/sim/skills.js";
import { takeTrip, tripLoot } from "../dist/browser/sim/trip.js";

/** A map run still open after this many game minutes ends as a run at the cap. */
export const DEFAULT_CAP_MINUTES = 4000;

/** How a map run stands: `solved` after its completion, `death` after its death, else `cap`, still open. */
export function outcomeOf(run) {
  return run.completion ? "solved" : run.death ? "death" : "cap";
}

/** An Understanding that holds everything the data lists, so nothing is discovered in a map run. */
export function fullUnderstanding() {
  return {
    trees: Object.keys(SKILLS),
    actions: Object.keys(ACTIONS),
    conditions: Object.keys(CONDITIONS),
    items: [...Object.keys(ITEMS), CAMPFIRE.id],
    creatures: Object.keys(CREATURES),
  };
}

/**
 * Character skills from a short description: `{ practice: { skillId: n }, ranks: { branchId: n } }`.
 * Every predisposition of the archetype of created characters is present, as in a character the
 * game creates. A rank is set as it stands, also one the points of the character would not buy.
 */
export function buildSkills(spec = {}) {
  const skills = newSkills(ARCHETYPES[CREATED_ARCHETYPE].predispositions);
  for (const [id, practice] of Object.entries(spec.practice ?? {})) {
    if (!skills[id]) throw new Error(`skills: unknown skill ${id}`);
    skills[id].practice = practice;
  }
  for (const [branchId, rank] of Object.entries(spec.ranks ?? {})) {
    const branch = BRANCHES[branchId];
    if (!branch) throw new Error(`skills: unknown branch ${branchId}`);
    skills[branch.skill].ranks[branchId] = rank;
  }
  return skills;
}

/**
 * The maps that must be solved before the game sends a character to `mapId`, the farthest back
 * first: the map that opens it, the one that opens that one, and so on.
 */
export function prerequisitesOf(mapId) {
  const chain = [];
  let next = MAPS[mapId]?.opensAfter;
  while (next !== undefined && !chain.includes(next)) {
    chain.unshift(next);
    next = MAPS[next]?.opensAfter;
  }
  return chain;
}

/**
 * A game state with one character, a full Understanding, the given program as the one the
 * character goes with, the given skills, chest and solved maps: the state every measurement starts
 * from. The skills are those of a new character where none are given.
 */
export function makeState({
  program,
  skills,
  chest = {},
  solvedMaps = [],
} = {}) {
  let state = { ...newGame(), understanding: fullUnderstanding() };
  state = createCharacter(state, "Mag").state;
  const [created] = state.team.characters;
  state = {
    ...state,
    team: {
      ...state.team,
      characters: [{ ...created, skills: skills ?? created.skills }],
      chest: { pieces: { ...chest } },
    },
    solvedMaps: [...solvedMaps],
  };
  return program ? setProgram(state, program).state : state;
}

/**
 * The map run's start: the layout of the seed, with the equipment the take list draws from the chest,
 * and the events the start gives. The engine and the trace both start a map run through it.
 */
export function startOf(state, mapId, seed, skills) {
  const map = MAPS[mapId];
  if (!map) throw new Error(`run: no map ${mapId}`);
  const [character] = state.team.characters;
  const program = teamProgram(state).program;
  const equipment = takeTrip(
    program.tripPlan,
    state.team.chest,
    character.traits.carryingCapacity,
    map,
  );
  const reduced = programOf(state, program, character.id, skills);
  const { run, events } = newMapRun(
    map,
    seed,
    reduced,
    { mapId, characterId: character.id },
    { ...character.traits },
    skills,
    equipment.backpack,
  );
  return { map, program, equipment, reduced, run, events };
}

/** What a map run shows beside its end, gathered minute by minute while it is stepped. */
function newObservation(run) {
  return {
    minutesBy: {},
    gatherMinutes: {},
    attackMinutes: [],
    longestStreak: 0,
    firstFire: null,
    firstStreakLoss: null,
    healthAtFirstFire: null,
    minHealth: run.body.health,
    combatDamage: 0,
  };
}

/** Counts the game minute that starts at `before` as the kind of what the character is doing. */
function countMinute(observation, before) {
  const kind = minuteKind(before);
  observation.minutesBy[kind] = (observation.minutesBy[kind] ?? 0) + 1;
  if (kind === "gather" || kind === "patrol") {
    const { resource } = before.current.activity.action;
    observation.gatherMinutes[resource] =
      (observation.gatherMinutes[resource] ?? 0) + 1;
  }
}

/** Takes what the game minute from `before` to `after` showed of the body, the streak, fire and fights. */
function observeMinute(observation, before, after) {
  observation.minHealth = Math.min(observation.minHealth, after.body.health);
  if (before.activeCombat && !after.activeCombat && after.lastCombat?.result)
    observation.combatDamage +=
      before.body.health - after.lastCombat.result.characterHealth;
  observation.longestStreak = Math.max(observation.longestStreak, after.streak);
  if (
    observation.firstStreakLoss === null &&
    before.streak > 0 &&
    after.streak === 0
  )
    observation.firstStreakLoss = after.minute;
  if (
    observation.firstFire === null &&
    after.campfires.some((campfire) => campfire.minutesLeft > 0)
  ) {
    observation.firstFire = after.minute;
    observation.healthAtFirstFire = after.body.health;
  }
  const attack = after.activeCombat?.attackMinute;
  if (attack !== undefined && attack !== before.activeCombat?.attackMinute)
    observation.attackMinutes.push(attack);
}

/** The pieces a solved map run brings out of its backpack, as the game deposits them in the chest. */
function lootOf(run, equipment, program, map) {
  const loot = tripLoot(
    {
      bringPlan: program.tripPlan.bring,
      character: run.character,
    },
    equipment.chest,
    map,
  );
  return Object.fromEntries(loot.map(({ item, count }) => [item, count]));
}

/**
 * One map run, to its end or to `capMinutes`: the layout from `seed`, the equipment taken from
 * `chest` by the program's take list as a send to a map not yet solved takes it. The maps that open
 * `mapId` count as solved. The Understanding is full, so nothing is discovered and no game minute
 * pauses. Gives how the map run ended, `solved`, `death` with its cause, or `cap`, and what it
 * showed on the way.
 */
export function runOnce(options) {
  const {
    mapId,
    program,
    seed,
    skills = buildSkills(),
    chest = {},
    capMinutes = DEFAULT_CAP_MINUTES,
  } = options;
  const state = makeState({
    program,
    skills,
    chest,
    solvedMaps: prerequisitesOf(mapId),
  });
  const started = startOf(state, mapId, seed, skills);
  const { map, equipment, reduced } = started;
  let run = started.run;
  const observation = newObservation(run);
  while (!mapRunEnded(run) && run.minute < capMinutes) {
    countMinute(observation, run);
    const before = run;
    run = stepMinute(run, map, reduced).run;
    observeMinute(observation, before, run);
  }
  const outcome = outcomeOf(run);
  const entrance = run.tiles.find(
    (tile) =>
      tile.at.q === started.run.character.at.q &&
      tile.at.r === started.run.character.at.r,
  );
  return {
    seed,
    outcome,
    minute: run.minute,
    cause: run.death?.cause ?? null,
    ...observation,
    attacks: observation.attackMinutes.length,
    defeatedAttacks: run.defeatedAttacks,
    health: run.body.health,
    practice: run.practice,
    taken: equipment.backpack,
    backpack: run.character.backpack,
    loot:
      outcome === "solved" ? lootOf(run, equipment, started.program, map) : {},
    entrance: { ...entrance.stock },
    tilesRevealed: run.tiles.filter((tile) => tile.revealed).length,
  };
}

/** The value at fraction `q` of the sorted list, between its neighbours where it falls between them. */
export function quantile(sorted, q) {
  if (sorted.length === 0) return null;
  const position = (sorted.length - 1) * q;
  const low = Math.floor(position);
  const high = Math.ceil(position);
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

/** The count, the extremes and the tenth, fiftieth and ninetieth percentile of the values, or null for none. */
function distribution(values) {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  return {
    n: sorted.length,
    min: sorted[0],
    p10: Math.round(quantile(sorted, 0.1)),
    median: Math.round(quantile(sorted, 0.5)),
    p90: Math.round(quantile(sorted, 0.9)),
    max: sorted[sorted.length - 1],
  };
}

/** The mean per record of each number the records hold under `read`, an absent one counting as 0. */
export function meanOf(records, read) {
  if (records.length === 0) return {};
  const sum = {};
  for (const record of records)
    for (const [key, value] of Object.entries(read(record)))
      sum[key] = (sum[key] ?? 0) + value;
  return Object.fromEntries(
    Object.entries(sum).map(([key, value]) => [
      key,
      Math.round((value / records.length) * 100) / 100,
    ]),
  );
}

/** The mean of `read` over the list, two decimals, or null for an empty list. */
export function meanNumber(list, read) {
  return list.length === 0
    ? null
    : Math.round(
        (list.reduce((sum, item) => sum + read(item), 0) / list.length) * 100,
      ) / 100;
}

/** The deaths of the results by cause, each with its count and the distribution of its minutes. */
function deathsByCause(results) {
  const minutes = {};
  for (const result of results.filter((each) => each.outcome === "death")) {
    minutes[result.cause] ??= [];
    minutes[result.cause].push(result.minute);
  }
  return Object.fromEntries(
    Object.entries(minutes).map(([cause, list]) => [
      cause,
      { n: list.length, minute: distribution(list) },
    ]),
  );
}

/** The share of all game minutes of the results spent on each kind of minute, in percent. */
function timeShare(results) {
  const total = results.reduce((sum, result) => sum + result.minute, 0);
  if (total === 0) return {};
  const mean = meanOf(results, (result) => result.minutesBy);
  return Object.fromEntries(
    Object.entries(mean).map(([kind, minutes]) => [
      kind,
      Math.round(((minutes * results.length) / total) * 1000) / 10,
    ]),
  );
}

/**
 * The summary of a list of `runOnce` results: how many ended solved, in death and at the cap, the
 * share solved in percent, the distribution of the minutes of the solved ones, the deaths by cause,
 * the minute of the first fire, and what a solved map run gathered, carried and brought out on
 * average.
 */
export function summarize(results) {
  const solved = results.filter((result) => result.outcome === "solved");
  const withFire = results.filter((result) => result.firstFire !== null);
  return {
    runs: results.length,
    solved: solved.length,
    solvedShare:
      results.length === 0
        ? null
        : Math.round((solved.length / results.length) * 1000) / 10,
    solveMinute: distribution(solved.map((result) => result.minute)),
    deaths: deathsByCause(results),
    capped: results.filter((result) => result.outcome === "cap").length,
    firstFire: distribution(withFire.map((result) => result.firstFire)),
    noFire: results.length - withFire.length,
    practicePerSolved: meanOf(solved, (result) => result.practice),
    lootPerSolved: meanOf(solved, (result) => result.loot),
    backpackAtSolve: meanOf(solved, (result) => result.backpack),
    timeShare: timeShare(results),
  };
}

/** `runOnce` for each seed of `options.seeds`, with the summary of the results. */
export function sweep(options) {
  const { seeds, ...once } = options;
  const results = seeds.map((seed) => runOnce({ ...once, seed }));
  return { summary: summarize(results), results };
}

/** The whole numbers `from` to `to`, both included. */
export function seedRange(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index);
}
