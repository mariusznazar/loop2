// The trace of one map run of the balance instrument: each started action with the body's numbers,
// and the deaths, completions, attacks and campfires going out, in lines a human reads. It starts the
// map run as the engine does and steps it with the game's own `stepMinute`, so the trace ends in the
// outcome the engine gives for the same seed (invariant instrument-game-agreement). Names come from the
// data where it holds them: the labels of actions, the names of resources and items, of creatures.

import { ACTIONS } from "../dist/browser/sim/data/actions.js";
import { CREATURES } from "../dist/browser/sim/data/creatures.js";
import { ITEMS } from "../dist/browser/sim/data/items.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { RESOURCES } from "../dist/browser/sim/data/resources.js";
import { programOf } from "../dist/browser/sim/game.js";
import { teamProgram } from "../dist/browser/sim/programs.js";
import { mapRunEnded, newMapRun, stepMinute } from "../dist/browser/sim/run.js";
import { takeTrip } from "../dist/browser/sim/trip.js";
import { buildSkills, makeState, prerequisitesOf } from "./engine.mjs";

/** A map run still open after this many game minutes ends as a run at the cap. */
const DEFAULT_CAP_MINUTES = 4000;

/** The line of one game minute: its number, the body, the energy, the streak, fire, pack, place and text. */
function lineOf(run, text) {
  const { body } = run;
  const fire = run.campfires.map((campfire) => campfire.minutesLeft).join("/");
  const pack = Object.entries(run.character.backpack)
    .filter(([, count]) => count > 0)
    .map(([item, count]) => `${ITEMS[item].name} ${count}`)
    .join(", ");
  const { q, r } = run.character.at;
  return [
    `${String(run.minute).padStart(4)}`,
    `T=${body.temperature.toFixed(2)}`,
    `S=${body.satiety.toFixed(0)}`,
    `H=${body.health.toFixed(1)}`,
    `E=${run.natureEnergy.toFixed(0)}`,
    `streak=${run.streak}`,
    `fire=[${fire}]`,
    `pack=[${pack}]`,
    `at=${q},${r}`,
    `:: ${text}`,
  ].join(" ");
}

/** The text of a started rule action: its label of the data and the resource it names, if any. */
function startText(activity) {
  const { action } = activity;
  const label = ACTIONS[action.kind].label;
  const resource = action.resource ? ` ${RESOURCES[action.resource].name}` : "";
  return `start ${label}${resource}`;
}

/** The text an event of the map run reads as in the trace, or null where the trace shows nothing of it. */
function textOf(event) {
  switch (event.kind) {
    case "activityStarted":
      return event.activity.kind === "rule" ? startText(event.activity) : null;
    case "characterDied":
      return `DEATH ${event.cause}`;
    case "mapRunCompleted":
      return "SOLVED";
    case "streakLost":
      return `streak lost (${event.streak}) ${event.cause}`;
    case "attacked":
      return `ATTACK ${CREATURES[event.creature].name}`;
    case "combatEnded":
      return `combat ended: ${event.outcome}`;
    case "campfireExtinguished":
      return "fire out";
    default:
      return null;
  }
}

/**
 * The trace of one map run on `seed` of `mapId` with the program, the skills and the chest given:
 * `lines` in the order of the game minutes, the `outcome` the engine names (`solved`, `death` or
 * `cap`), the `minute` the run ended at and its death's `cause`, or null. A wait of several minutes
 * is shown once, with its length.
 */
export function trace(options) {
  const {
    mapId,
    program,
    seed,
    skills = buildSkills(),
    chest = {},
    capMinutes = DEFAULT_CAP_MINUTES,
  } = options;
  const map = MAPS[mapId];
  const state = makeState({
    program,
    skills,
    chest,
    solvedMaps: prerequisitesOf(mapId),
  });
  const [character] = state.team.characters;
  const checked = teamProgram(state).program;
  const equipment = takeTrip(
    checked.tripPlan,
    state.team.chest,
    character.traits.carryingCapacity,
    map,
  );
  const reduced = programOf(state, checked, character.id, skills);
  const started = newMapRun(
    map,
    seed,
    reduced,
    { mapId, characterId: character.id },
    { ...character.traits },
    skills,
    equipment.backpack,
  );
  let run = started.run;
  const lines = [];
  let waits = 0;
  const note = (text) => lines.push(lineOf(run, text));
  const noteEvents = (events) => {
    for (const event of events) {
      if (event.kind === "activityStarted" && event.activity.kind === "wait") {
        waits += 1;
        continue;
      }
      const text = textOf(event);
      if (text === null) continue;
      if (waits > 0) {
        note(`(waited ${waits} min)`);
        waits = 0;
      }
      note(text);
    }
  };
  noteEvents(started.events);
  while (!mapRunEnded(run) && run.minute < capMinutes) {
    const stepped = stepMinute(run, map, reduced);
    run = stepped.run;
    noteEvents(stepped.events);
  }
  return {
    lines,
    outcome: run.completion ? "solved" : run.death ? "death" : "cap",
    minute: run.minute,
    cause: run.death?.cause ?? null,
  };
}
