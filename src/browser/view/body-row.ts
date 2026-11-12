import { backpackCap, backpackCount } from "../sim/character.js";
import {
  needNotes,
  type SatietyNote,
  type TemperatureNote,
} from "../sim/body.js";
import { BALANCE } from "../sim/data/balance.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import type { MapDef } from "../sim/data/maps.js";
import type { Body, MapRun, RunCharacter } from "../sim/types.js";

/** One value of the body row and whether it stands in `danger` (D-39). */
export type BodyValue = { text: string; danger: boolean };

/** A temperature cut down to tenths, with a decimal comma: 36.976 as „36,9”. */
function tenths(value: number): string {
  // The body's numbers keep six decimal places, so value * 10 lies far from a whole number
  // unless the value is one tenth exactly, and the cut never falls a tenth short.
  return (Math.floor(value * 10) / 10).toFixed(1).replace(".", ",");
}

/**
 * The values of the body row: temperature cut down to tenths, satiety, health and nature energy cut
 * down to whole numbers (D-57, D-178). Temperature below the threshold of chill and satiety below
 * that of hunger stand in `danger`; cut down, a shown value is below a threshold exactly when the
 * body's is. Nature energy never stands in `danger`, at 0 too: empty energy closes the spells and
 * takes no health. Pure.
 */
export function bodyValues(body: Body, natureEnergy: number): BodyValue[] {
  const rules = BALANCE.body;
  return [
    {
      text: `Temperatura ${tenths(body.temperature)} °C`,
      danger: body.temperature < rules.chilledBelow,
    },
    {
      text: `Sytość ${Math.floor(body.satiety)} %`,
      danger: body.satiety < rules.starvingBelow,
    },
    { text: `Zdrowie ${Math.floor(body.health)}`, danger: false },
    { text: `Energia natury ${Math.floor(natureEnergy)}`, danger: false },
  ];
}

/** The note under a value of the body row and whether it stands in `danger` (D-337). */
export type BodyNote = { text: string; danger: boolean };

/** A cell of the body row: its value and, under temperature and satiety, a note. */
export type BodyCell = BodyValue & { note: BodyNote | null };

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
 * The cells of the body row for a map run on `map`: the four values of `bodyValues`, with the notes
 * of `needNotes` under temperature and satiety and none under health and nature energy. They hold
 * from game minute zero and for the stopped minute after the end, whatever the Understanding holds
 * (D-337, D-125). Pure.
 */
export function bodyCells(run: MapRun, map: MapDef): BodyCell[] {
  const notes = needNotes(run, map);
  const [temperature, satiety, health, natureEnergy] = bodyValues(
    run.body,
    run.natureEnergy,
  );
  return [
    { ...temperature, note: temperatureNoteText(notes.temperature) },
    { ...satiety, note: satietyNoteText(notes.satiety) },
    { ...health, note: null },
    { ...natureEnergy, note: null },
  ];
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
