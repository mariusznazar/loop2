import { backpackCap, backpackCount } from "../sim/character.js";
import { BALANCE } from "../sim/data/balance.js";
import { ITEMS, type ItemId } from "../sim/data/items.js";
import type { Body, Character, GameState } from "../sim/types.js";

const SEPARATOR = " · ";

/** One value of the body row and whether it stands in `danger` (D-39). */
export type BodyValue = { text: string; danger: boolean };

/** A temperature cut down to tenths, with a decimal comma: 36.976 as „36,9”. */
function tenths(value: number): string {
  // The body's numbers keep six decimal places, so value * 10 lies far from a whole number
  // unless the value is one tenth exactly, and the cut never falls a tenth short.
  return (Math.floor(value * 10) / 10).toFixed(1).replace(".", ",");
}

/**
 * The values of the body row: temperature cut down to tenths, satiety and health cut down to whole
 * numbers (spec Decision 3). Temperature below the threshold of chill and satiety below that of
 * hunger stand in `danger`; cut down, a shown value is below a threshold exactly when the body's
 * is. Pure.
 */
export function bodyValues(body: Body): BodyValue[] {
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
  ];
}

/**
 * The backpack's text: „Plecak {pieces}/{cap}”, then each item held with its pieces, in the
 * items' order in the data, names from the data. Pure.
 */
export function backpackText(character: Character): string {
  const head = `Plecak ${backpackCount(character.backpack)}/${backpackCap(character)}`;
  const held = (Object.keys(ITEMS) as ItemId[])
    .filter((id) => character.backpack[id] > 0)
    .map((id) => `${ITEMS[id].name} ${character.backpack[id]}`);
  return held.length > 0 ? `${head}: ${held.join(", ")}` : head;
}

export type BodyRow = {
  element: HTMLElement;
  /** Shows the given game state; call only while it holds a map run. */
  update(state: GameState): void;
};

/**
 * Builds the row of the body and the backpack under the status row. The elements are made once
 * and updated in place, as the status row's are.
 */
export function createBodyRow(): BodyRow {
  const element = document.createElement("div");
  element.className = "body-row";
  const bodyText = document.createElement("p");
  bodyText.className = "body-text";
  const values = [0, 1, 2].map(() => {
    const value = document.createElement("span");
    value.className = "body-value";
    return value;
  });
  values.forEach((value, index) => {
    if (index > 0) bodyText.append(SEPARATOR);
    bodyText.append(value);
  });
  const backpack = document.createElement("p");
  backpack.className = "backpack-text";
  element.append(bodyText, backpack);

  return {
    element,
    update(state: GameState): void {
      if (!state.run) return;
      bodyValues(state.run.body).forEach((shown, index) => {
        const value = values[index];
        if (value.textContent !== shown.text) value.textContent = shown.text;
        value.classList.toggle("danger", shown.danger);
      });
      const packed = backpackText(state.run.character);
      if (backpack.textContent !== packed) backpack.textContent = packed;
    },
  };
}
