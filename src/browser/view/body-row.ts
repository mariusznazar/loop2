import { backpackCap, backpackCount } from "../sim/character.js";
import {
  bodyMinute,
  needNotes,
  type SatietyNote,
  type TemperatureNote,
} from "../sim/body.js";
import { BALANCE } from "../sim/data/balance.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import type { MapDef } from "../sim/data/maps.js";
import type { Body, MapRun, RunCharacter } from "../sim/types.js";
import { warmthAt } from "../sim/world.js";

/**
 * A number cut down to tenths, with a decimal comma: 36.976 as „36,9”. The body row writes the
 * temperature so, and the sentence of a rule the number of a condition that takes tenths.
 */
export function tenths(value: number): string {
  // The body's numbers keep six decimal places, so value * 10 lies far from a whole number
  // unless the value is one tenth exactly, and the cut never falls a tenth short.
  return (Math.floor(value * 10) / 10).toFixed(1).replace(".", ",");
}

/**
 * A number cut down to a whole number, the way the body row writes health and nature energy: 71.1
 * as „71”. The paragraph of an encounter writes the mage's health after „Ucisk” with it too, so the
 * player reads one health in both places.
 */
export function whole(value: number): string {
  return `${Math.floor(value)}`;
}

/** The values of the body row a cell stands for. */
export type BodyCellId = "temperature" | "satiety" | "health" | "natureEnergy";

/** The name each cell of the body row carries at the left of its number. */
const NAMES: Record<BodyCellId, string> = {
  temperature: "Temperatura",
  satiety: "Sytość",
  health: "Zdrowie",
  natureEnergy: "Energia natury",
};

/**
 * The number of each cell as it is written: temperature cut down to tenths in degrees Celsius,
 * satiety in percent, health and nature energy cut down to whole numbers (D-57, D-178).
 */
function bodyNumbers(
  body: Body,
  natureEnergy: number,
): Record<BodyCellId, string> {
  return {
    temperature: `${tenths(body.temperature)} °C`,
    satiety: `${Math.floor(body.satiety)} %`,
    health: whole(body.health),
    natureEnergy: whole(natureEnergy),
  };
}

/** The note under a value of the body row and whether it stands in `danger` (D-337). */
export type BodyNote = { text: string; danger: boolean };

/**
 * The words of the note under temperature: „marznie” in `danger`, otherwise „przy ogniu”, „nie
 * stygnie” or „bez ognia {n} min” in `text-secondary` (D-337). Pure.
 */
export function temperatureNoteText(note: TemperatureNote): BodyNote {
  switch (note.kind) {
    case "chilled":
      return { text: "marznie", danger: true };
    case "fire":
      return { text: "przy ogniu", danger: false };
    case "not-cooling":
      return { text: "nie stygnie", danger: false };
    case "minutes":
      return { text: `bez ognia ${note.minutes} min`, danger: false };
  }
}

/**
 * The words of the note under satiety: „głoduje” in `danger`, otherwise „bez jedzenia {n} min” in
 * `text-secondary` (D-337). Pure.
 */
export function satietyNoteText(note: SatietyNote): BodyNote {
  return note.kind === "starving"
    ? { text: "głoduje", danger: true }
    : { text: `bez jedzenia ${note.minutes} min`, danger: false };
}

/**
 * The numbers of the look of the temperature scale and of the health alarm, in degrees and in health
 * (D-337): the scale's left end at 30 °C and its right end at 41, the start of the zone of overheating
 * at 39 °C, which the game does not know, and the health below which the number stands in red, which
 * the game does not know either. The border of the zones of chill and safety is the game's threshold of
 * chill, so the marker stands in the zone of chill exactly when the temperature is in alarm.
 */
const SCALE_FROM = 30;
const SCALE_TO = 41;
const OVERHEATING_FROM = 39;
const HEALTH_ALARM_BELOW = 35;

/** The three zones of the temperature scale, from the cold end to the hot one. */
export type TemperatureZone = "chill" | "safe" | "overheating";

/** What a cell draws under its name and number: a bar, or for temperature the scale with its marker. */
export type BodyMeter =
  | { kind: "bar"; share: number }
  | { kind: "scale"; share: number; zone: TemperatureZone };

/** What acts on the character, as the frame of the temperature cell says it (D-337). */
export type TemperatureFrame = "warming" | "cooling" | "plain";

/** A cell of the body row as it is drawn: name and number apart, meter, alarm, note and frame. */
export type BodyRowCell = {
  id: BodyCellId;
  name: string;
  number: string;
  alarm: boolean;
  meter: BodyMeter;
  note: BodyNote | null;
  frame: TemperatureFrame | null;
};

/** One zone of the temperature scale: its degrees and its share of the scale's width, in percent. */
export type ScaleZone = {
  zone: TemperatureZone;
  from: number;
  to: number;
  share: number;
};

/** `value` as a percent of the way from `from` to `to`, held between 0 and 100. */
function percent(value: number, from: number, to: number): number {
  return Math.min(100, Math.max(0, ((value - from) * 100) / (to - from)));
}

/**
 * The three zones of the temperature scale, drawn from 30 to the threshold of chill, from there to
 * 39 and from 39 to 41 °C, each with its share of the scale's width: 5 : 4 : 2 of its 11 degrees
 * with the game's threshold of 35 (D-337). Pure.
 */
export function temperatureZones(): ScaleZone[] {
  const chilledBelow = BALANCE.body.chilledBelow;
  const zones: [TemperatureZone, number, number][] = [
    ["chill", SCALE_FROM, chilledBelow],
    ["safe", chilledBelow, OVERHEATING_FROM],
    ["overheating", OVERHEATING_FROM, SCALE_TO],
  ];
  return zones.map(([zone, from, to]) => ({
    zone,
    from,
    to,
    share: percent(to - from, 0, SCALE_TO - SCALE_FROM),
  }));
}

/** The zone of the scale a temperature stands in: chill below the threshold of chill, overheating from 39 °C. */
function zoneOf(temperature: number): TemperatureZone {
  if (temperature < BALANCE.body.chilledBelow) return "chill";
  return temperature < OVERHEATING_FROM ? "safe" : "overheating";
}

/**
 * What acts on the character, for the frame of the temperature cell (D-337): warming while
 * something burns on the character's tile, whatever the temperature, otherwise cooling where the
 * map cools the body, as the body's own step reads it, and plain where it does not. Pure.
 */
function temperatureFrame(run: MapRun, map: MapDef): TemperatureFrame {
  if (warmthAt(run, run.character.at) > 0) return "warming";
  const cooled = bodyMinute(run.body, 0, map).body.temperature;
  return cooled < run.body.temperature ? "cooling" : "plain";
}

/**
 * The cells of the body row as they are drawn for a map run on `map` (D-337, D-178): for each of the
 * four values its name and its number apart, the number as `bodyNumbers` writes it, the meter under
 * them, whether the value is below its threshold, the note and, for temperature, the frame. The
 * meter of satiety is a bar from 0 to the starting satiety, that of health from 0 to the starting
 * health and that of nature energy from 0 to its cap, all from the game's data, and that of
 * temperature the scale from 30 to 41 °C with the marker's place, at the left end below 30, and the
 * zone it stands in. The alarm is temperature below the threshold of chill and satiety below that of
 * hunger, from the data, and health below 35, a number of the look alone; nature energy has none. The
 * cells hold from game minute zero and for the stopped minute after the end, whatever the
 * Understanding holds (D-125). Pure.
 */
export function bodyRowCells(run: MapRun, map: MapDef): BodyRowCell[] {
  const rules = BALANCE.body;
  const { body, natureEnergy } = run;
  const number = bodyNumbers(body, natureEnergy);
  const notes = needNotes(run, map);
  const bar = (value: number, cap: number): BodyMeter => ({
    kind: "bar",
    share: percent(value, 0, cap),
  });
  const cell = (
    id: BodyCellId,
    alarm: boolean,
    meter: BodyMeter,
    note: BodyNote | null,
    frame: TemperatureFrame | null,
  ): BodyRowCell => ({
    id,
    name: NAMES[id],
    number: number[id],
    alarm,
    meter,
    note,
    frame,
  });
  return [
    cell(
      "temperature",
      body.temperature < rules.chilledBelow,
      {
        kind: "scale",
        share: percent(body.temperature, SCALE_FROM, SCALE_TO),
        zone: zoneOf(body.temperature),
      },
      temperatureNoteText(notes.temperature),
      temperatureFrame(run, map),
    ),
    cell(
      "satiety",
      body.satiety < rules.starvingBelow,
      bar(body.satiety, rules.startSatiety),
      satietyNoteText(notes.satiety),
      null,
    ),
    cell(
      "health",
      body.health < HEALTH_ALARM_BELOW,
      bar(body.health, rules.startHealth),
      null,
      null,
    ),
    cell(
      "natureEnergy",
      false,
      bar(natureEnergy, BALANCE.natureEnergy.max),
      null,
      null,
    ),
  ];
}

/** A number of the game's data written as the player reads it: at most six decimals, a comma, no trailing zeros. */
function plain(value: number): string {
  return String(Number(value.toFixed(6))).replace(".", ",");
}

/**
 * The words of the explanation a click on a cell opens (D-450): the threshold of the value, what
 * happens to the character below it and how fast the value changes, with the numbers of the game's
 * data and, for temperature, of the map's. Null for health, whose cell is no button. Pure.
 */
export function bodyExplanation(id: BodyCellId, map: MapDef): string | null {
  const rules = BALANCE.body;
  switch (id) {
    case "temperature": {
      const cooling = Number(
        (
          rules.coolingPerDegreeBelow *
          Math.max(0, rules.startTemperature - map.ambientTemperature)
        ).toFixed(6),
      );
      const below = `Poniżej ${plain(rules.chilledBelow)} °C postać marznie — traci ${plain(rules.healthLossChilled)} zdrowia na minutę, a passa się zeruje.`;
      const ambient = `Otoczenie ${plain(map.ambientTemperature)} °C`;
      return cooling > 0
        ? `${below} ${ambient}: temperatura spada tu o ${plain(cooling)} °C na minutę, a ognisko podnosi ją o ${plain(CAMPFIRE.warmth)} °C na minutę, najwyżej do ${plain(rules.startTemperature)} °C.`
        : `${below} ${ambient}: ciało tu nie stygnie.`;
    }
    case "satiety":
      return `Poniżej ${plain(rules.starvingBelow)} % postać głoduje — traci ${plain(rules.healthLossStarving)} zdrowia na minutę, a passa się zeruje. Sytość spada o ${plain(rules.satietyLossPerMinute)} % na minutę, tak samo na każdej mapie.`;
    case "natureEnergy": {
      const energy = BALANCE.natureEnergy;
      return `Czary kosztują energię natury; pusta energia nie odbiera zdrowia, zamyka tylko czary. Energia wraca o ${plain(energy.regain)} na minutę, ale tylko przy sytości od ${plain(energy.wellFedFrom)} %, najwyżej do ${plain(energy.max)}.`;
    }
    case "health":
      return null;
  }
}

/**
 * The backpack's text: „Plecak {pieces}/{cap}”, then each item held with its pieces, in the
 * items' order in the data, names from the data. Pure.
 */
export function backpackText(character: RunCharacter): string {
  const head = `Plecak ${backpackCount(character.backpack)}/${backpackCap(character)}`;
  const held = (Object.keys(ITEMS) as ItemId[])
    .filter((id) => character.backpack[id] > 0)
    .map((id) => `${ITEMS[id].name} ${character.backpack[id]}`);
  return held.length > 0 ? `${head}: ${held.join(", ")}` : head;
}
