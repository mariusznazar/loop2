import { BALANCE } from "./data/balance.js";
import type { MapDef } from "./data/maps.js";
import type { Body, DeathCause, MapRun } from "./types.js";
import { warmthAt } from "./world.js";

/** Decimal places the body's numbers keep, so a threshold falls where decimal arithmetic puts it. */
const SCALE = 1e6;

/**
 * The value at six decimal places. Every number of the data has at most four, so this gives the
 * JavaScript number nearest the decimal value the data's numbers make.
 */
function decimal(value: number): number {
  return Math.round(value * SCALE) / SCALE;
}

/** The body of a character entering a map run. */
export function startingBody(): Body {
  const { startTemperature, startSatiety, startHealth } = BALANCE.body;
  return {
    temperature: startTemperature,
    satiety: startSatiety,
    health: startHealth,
  };
}

/** The nature energy of a character entering a map run: the cap, a new run and a restart alike. */
export function startingNatureEnergy(): number {
  return BALANCE.natureEnergy.max;
}

/**
 * The nature energy after the body's step of a game minute outside combat: it rises by the data's
 * regain where `satiety`, the satiety after that minute's fall, is at the well-fed threshold or
 * above, not above the cap; otherwise it stands.
 */
export function regainedNatureEnergy(energy: number, satiety: number): number {
  const rules = BALANCE.natureEnergy;
  if (satiety < rules.wellFedFrom) return energy;
  return Math.min(rules.max, decimal(energy + rules.regain));
}

/**
 * The nature energy after paying `cost` for a spell; the payment is made only with at least that
 * much energy, so the energy stays at 0 or above.
 */
export function paidNatureEnergy(energy: number, cost: number): number {
  return decimal(energy - cost);
}

/** The body after eating a piece that gives `satiety`: satiety rises, not above the starting one. */
export function eatenBody(body: Body, satiety: number): Body {
  return {
    ...body,
    satiety: Math.min(
      BALANCE.body.startSatiety,
      decimal(body.satiety + satiety),
    ),
  };
}

/**
 * One game minute of the body: the warmth of what burns on the character's tile less the cooling
 * of the map's ambient temperature, capped at the starting temperature; satiety falls, not below
 * 0; health falls for chilled and for starving, read from the values just computed, or rises where
 * neither, not above the starting health. Health at 0 or less stands at 0 and gives the cause of
 * death: cold where chilled, otherwise hunger. `lostHealth` says whether the character lost health
 * to cold or hunger in this minute, that is, was chilled or starving after the step.
 */
export function bodyMinute(
  body: Body,
  warmth: number,
  map: MapDef,
): { body: Body; death: DeathCause | null; lostHealth: boolean } {
  const rules = BALANCE.body;
  const cooling = decimal(
    rules.coolingPerDegreeBelow *
      Math.max(0, rules.startTemperature - map.ambientTemperature),
  );
  const temperature = Math.min(
    rules.startTemperature,
    decimal(body.temperature + warmth - cooling),
  );
  const satiety = Math.max(
    0,
    decimal(body.satiety - rules.satietyLossPerMinute),
  );
  const chilled = temperature < rules.chilledBelow;
  const starving = satiety < rules.starvingBelow;
  const lostHealth = chilled || starving;

  let health = body.health;
  if (chilled) health = decimal(health - rules.healthLossChilled);
  if (starving) health = decimal(health - rules.healthLossStarving);
  if (!chilled && !starving)
    health = Math.min(rules.startHealth, decimal(health + rules.healthRegain));

  if (health <= 0) {
    return {
      body: { temperature, satiety, health: 0 },
      death: chilled ? "cold" : "hunger",
      lostHealth,
    };
  }
  return { body: { temperature, satiety, health }, death: null, lostHealth };
}

/** What the note under the temperature of the body row says. */
export type TemperatureNote =
  | { kind: "chilled" }
  | { kind: "fire" }
  | { kind: "not-cooling" }
  | { kind: "minutes"; minutes: number };

/** What the note under the satiety of the body row says. */
export type SatietyNote =
  { kind: "starving" } | { kind: "minutes"; minutes: number };

/** The notes of the two needs that the body row shows. */
export type NeedNotes = { temperature: TemperatureNote; satiety: SatietyNote };

/**
 * The game minutes `body` lasts on `map` with no warmth before the game minute in which it is first
 * chilled, counted as `bodyMinute` cools it: the minutes whose end leaves it at or above the
 * threshold of chill, so a body already below it, or at it, lasts 0. Null where the map does not
 * cool the body below the threshold at all (D-333).
 */
export function minutesUntilChilled(body: Body, map: MapDef): number | null {
  let current = body;
  let minutes = 0;
  for (;;) {
    const next = bodyMinute(current, 0, map).body;
    if (next.temperature < BALANCE.body.chilledBelow) return minutes;
    // Stops where the body no longer cools, also on a value that is not a number, so it cannot loop.
    if (!(next.temperature < current.temperature)) return null;
    current = next;
    minutes += 1;
  }
}

/**
 * The game minutes the satiety of `body` lasts before the game minute in which the character first
 * starves, counted as `bodyMinute` lets satiety fall: the minutes whose end leaves it at or above
 * the threshold of hunger, so a body already starving lasts 0. Satiety falls whatever the map, and
 * `map` serves only the step.
 */
export function minutesUntilStarving(body: Body, map: MapDef): number {
  let current = body;
  let minutes = 0;
  for (;;) {
    const next = bodyMinute(current, 0, map).body;
    // Written as `>=` so that a value that is not a number stops the count instead of looping.
    if (!(next.satiety >= BALANCE.body.starvingBelow)) return minutes;
    current = next;
    minutes += 1;
  }
}

/**
 * The notes under the temperature and the satiety of the body row for a map run on `map`.
 * Temperature reads, in this order: chilled where the body is below the threshold of chill; by fire
 * where something burns on the character's tile (`warmthAt` above 0, as the body's step reads it);
 * not cooling where the map does not cool the body below the threshold; otherwise the minutes it
 * lasts. Satiety reads starving below the threshold of hunger, otherwise the minutes it lasts. The
 * minutes are whole, rounded down by the counting.
 */
export function needNotes(
  run: Pick<MapRun, "body" | "character" | "campfires" | "burningItems">,
  map: MapDef,
): NeedNotes {
  const rules = BALANCE.body;
  let temperature: TemperatureNote;
  if (run.body.temperature < rules.chilledBelow) {
    temperature = { kind: "chilled" };
  } else if (warmthAt(run, run.character.at) > 0) {
    temperature = { kind: "fire" };
  } else {
    const minutes = minutesUntilChilled(run.body, map);
    temperature =
      minutes === null ? { kind: "not-cooling" } : { kind: "minutes", minutes };
  }
  const satiety: SatietyNote =
    run.body.satiety < rules.starvingBelow
      ? { kind: "starving" }
      : { kind: "minutes", minutes: minutesUntilStarving(run.body, map) };
  return { temperature, satiety };
}
