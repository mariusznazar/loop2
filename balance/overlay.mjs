// The overlay of the balance instrument: a file that lays data on the game's tables for the time of
// one measurement. The tables are the objects the game's own modules read, imported from the built
// simulation, so a laid number reaches a map run of the engine. Nothing is written to a file: the
// game's data files are only read, and the overlay is restored in memory when the measurement ends
// (invariant instrument-game-agreement; glossary term overlay).

import { readFileSync } from "node:fs";
import { ACTIONS } from "../dist/browser/sim/data/actions.js";
import { BALANCE } from "../dist/browser/sim/data/balance.js";
import { CAMPFIRE } from "../dist/browser/sim/data/campfire.js";
import { CREATURES } from "../dist/browser/sim/data/creatures.js";
import { ITEMS } from "../dist/browser/sim/data/items.js";
import { MAPS } from "../dist/browser/sim/data/maps.js";
import { BRANCHES, SKILLS } from "../dist/browser/sim/data/skills.js";
import { TRAITS } from "../dist/browser/sim/data/traits.js";

/** The tables of the game's data an overlay may change, by the name an overlay gives them. */
export const OVERLAY_TABLES = {
  MAPS,
  BALANCE,
  ITEMS,
  CAMPFIRE,
  CREATURES,
  SKILLS,
  BRANCHES,
  ACTIONS,
  TRAITS,
};

/** The key an overlay file uses for its text: it names no table and is not laid. */
const DESCRIPTION = "description";

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Refuses an overlay the instrument cannot lay whole: a key that names no table of
 * `OVERLAY_TABLES`, or a table that is not an object. A refused overlay changes nothing.
 */
function checkOverlay(overlay) {
  if (!isPlainObject(overlay)) throw new Error("overlay: it is no object");
  for (const [name, value] of Object.entries(overlay)) {
    if (name === DESCRIPTION) {
      if (typeof value !== "string")
        throw new Error("overlay: its description is no text");
      continue;
    }
    if (!Object.hasOwn(OVERLAY_TABLES, name))
      throw new Error(`overlay: ${name} is no table the instrument changes`);
    if (!isPlainObject(value))
      throw new Error(`overlay: table ${name} is no object`);
  }
}

/**
 * Deep-merges `patch` into `target` in place: objects merge, while arrays and scalars replace what
 * stands there. A key that is a prototype's name is refused, since a file of overlays may hold any.
 */
function mergeInto(target, patch) {
  for (const [key, value] of Object.entries(patch)) {
    if (key === "__proto__") throw new Error("overlay: __proto__ is no key");
    if (isPlainObject(value) && isPlainObject(target[key]))
      mergeInto(target[key], value);
    else target[key] = structuredClone(value);
  }
}

/**
 * Makes `target` hold what `saved` holds. Objects that stand in both keep their identity, so the
 * game's modules that hold them still see the restored data; a key the overlay added is removed.
 */
function restoreInPlace(target, saved) {
  for (const key of Object.keys(target))
    if (!Object.hasOwn(saved, key)) delete target[key];
  for (const [key, value] of Object.entries(saved)) {
    if (isPlainObject(value) && isPlainObject(target[key]))
      restoreInPlace(target[key], value);
    else target[key] = value;
  }
}

/**
 * Lays an overlay on the game's tables in memory, for the time of one measurement. Gives back the
 * function that restores the tables as they stood before. The overlay is checked whole before
 * anything is laid, so a refused overlay leaves every table as it was.
 */
export function applyOverlay(overlay) {
  checkOverlay(overlay);
  const saved = {};
  for (const name of Object.keys(OVERLAY_TABLES))
    if (Object.hasOwn(overlay, name))
      saved[name] = structuredClone(OVERLAY_TABLES[name]);
  try {
    for (const name of Object.keys(saved))
      mergeInto(OVERLAY_TABLES[name], overlay[name]);
  } catch (error) {
    restoreAll(saved);
    throw error;
  }
  return () => restoreAll(saved);
}

function restoreAll(saved) {
  for (const [name, table] of Object.entries(saved))
    restoreInPlace(OVERLAY_TABLES[name], table);
}

/** Reads an overlay file, a JSON object of table names and their values, as it stands. */
export function readOverlay(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}
