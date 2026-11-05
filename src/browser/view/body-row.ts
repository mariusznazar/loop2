import { backpackCap, backpackCount } from "../sim/character.js";
import { BALANCE } from "../sim/data/balance.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import type { Body, RunCharacter } from "../sim/types.js";

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
 * down to whole numbers (spec Decision 3; task plomyk, To do 6). Temperature below the threshold of
 * chill and satiety below that of hunger stand in `danger`; cut down, a shown value is below a
 * threshold exactly when the body's is. Nature energy never stands in `danger`, at 0 too: empty
 * energy closes the spells and takes no health. Pure.
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
