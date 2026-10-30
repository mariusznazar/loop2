import { ITEMS } from "../sim/data/items.js";
import type { ItemId, Program, TripEntry, TripPlan } from "../sim/types.js";
import { createButton } from "./controls/button.js";
import { createNumberField } from "./controls/number-field.js";
import { createSelectList, setSelectOptions } from "./controls/select-list.js";
import type { Field } from "./controls/text-field.js";

/** No gameplay maximum: reality clips the requested count at the map's boundaries. */
export function tripCount(text: string): number | null {
  const count = Number(text);
  return text.trim() !== "" && Number.isInteger(count) && count >= 1
    ? count
    : null;
}

/** Items already on this list are offered solely in their own row. */
export function tripChoices(
  items: readonly ItemId[],
  list: readonly TripEntry[],
  own?: ItemId,
): ItemId[] {
  return items.filter(
    (item) => item === own || !list.some((entry) => entry.item === item),
  );
}

type Row = {
  item: ItemId;
  count: number;
  element: HTMLElement;
  select: HTMLSelectElement;
  field: Field;
  up: HTMLButtonElement;
  down: HTMLButtonElement;
  remove: HTMLButtonElement;
  invalid: boolean;
};

/** Two ordered lists, sharing the program editor's commit and display context. */
export function createTripEditor(commit: (program: Program) => void): {
  element: HTMLElement;
  update(program: Program, items: readonly ItemId[], context: string): void;
} {
  const element = document.createElement("section");
  element.className = "trip-editor";
  const heading = document.createElement("h3");
  heading.textContent = "Plan wyprawy";
  element.append(heading);
  let program: Program;
  let items: readonly ItemId[] = [];
  let context: string | null = null;
  const lists = (["take", "bring"] as const).map((side) => {
    const label = side === "take" ? "Zabierz" : "Wynieś";
    const section = document.createElement("section");
    const title = document.createElement("h4");
    title.textContent = label;
    const list = document.createElement("ol");
    list.className = "trip-list";
    const add = createButton("Dodaj przedmiot", {
      label: `${label}: dodaj przedmiot`,
    });
    section.append(title, list, add);
    element.append(section);
    const view = { side, label, list, add, rows: [] as Row[] };
    add.addEventListener("click", () => {
      const item = tripChoices(items, program.tripPlan[side])[0];
      if (item === undefined) return;
      replace(side, [...program.tripPlan[side], { item, count: 1 }]);
      view.rows.find((row) => row.item === item)?.select.focus();
    });
    return view;
  });

  function replace(side: keyof TripPlan, list: TripEntry[]): void {
    commit({ ...program, tripPlan: { ...program.tripPlan, [side]: list } });
  }

  function makeRow(view: (typeof lists)[number], entry: TripEntry): Row {
    const element = document.createElement("li");
    element.className = "trip-entry";
    const select = createSelectList(`${view.label}: przedmiot`);
    const field = createNumberField({
      label: `${view.label}: liczba`,
      min: 1,
      step: 1,
    });
    const up = createButton("↑", { label: `${view.label}: w górę` });
    const down = createButton("↓", { label: `${view.label}: w dół` });
    const remove = createButton("Usuń", {
      kind: "destructive",
      label: `${view.label}: usuń przedmiot`,
    });
    const row: Row = {
      ...entry,
      element,
      select,
      field,
      up,
      down,
      remove,
      invalid: false,
    };
    element.append(select, field.element, up, down, remove);
    select.addEventListener("change", () => {
      const chosen = select.value as ItemId;
      const old = row.item;
      row.item = chosen;
      replace(
        view.side,
        program.tripPlan[view.side].map((entry) =>
          entry.item === old ? { ...entry, item: chosen } : entry,
        ),
      );
    });
    field.input.addEventListener("change", () => {
      const count = tripCount(field.input.value);
      row.invalid = count === null;
      field.setError(row.invalid ? "Wpisz liczbę całkowitą od 1." : null);
      if (count !== null) {
        replace(
          view.side,
          program.tripPlan[view.side].map((entry) =>
            entry.item === row.item ? { ...entry, count } : entry,
          ),
        );
      }
    });
    function move(offset: number): void {
      const list = [...program.tripPlan[view.side]];
      const index = list.findIndex((entry) => entry.item === row.item);
      const other = index + offset;
      if (other < 0 || other >= list.length) return;
      [list[index], list[other]] = [list[other], list[index]];
      replace(view.side, list);
      const button = offset < 0 ? row.up : row.down;
      (button.disabled ? row.select : button).focus();
    }
    up.addEventListener("click", () => move(-1));
    down.addEventListener("click", () => move(1));
    remove.addEventListener("click", () => {
      const index = view.rows.indexOf(row);
      replace(
        view.side,
        program.tripPlan[view.side].filter((entry) => entry.item !== row.item),
      );
      (view.rows[index]?.remove ?? view.add).focus();
    });
    return row;
  }

  return {
    element,
    update(shown, offered, shownContext): void {
      program = shown;
      items = offered;
      for (const view of lists) {
        if (context !== shownContext) view.rows = [];
        const rows = program.tripPlan[view.side].map((entry) => {
          const row =
            view.rows.find((row) => row.item === entry.item) ??
            makeRow(view, entry);
          const choices = tripChoices(
            items,
            program.tripPlan[view.side],
            entry.item,
          );
          setSelectOptions(
            row.select,
            choices.map((item) => [item, ITEMS[item].name]),
          );
          row.select.value = entry.item;
          if (row.count !== entry.count) {
            row.invalid = false;
            row.field.setError(null);
          }
          if (!row.invalid) row.field.input.value = String(entry.count);
          row.count = entry.count;
          return row;
        });
        const structureChanged =
          context !== shownContext ||
          rows.length !== view.rows.length ||
          rows.some((row, i) => row !== view.rows[i]);
        view.rows = rows;
        if (structureChanged)
          view.list.replaceChildren(...rows.map((row) => row.element));
        rows.forEach((row, index) => {
          row.up.disabled = index === 0;
          row.down.disabled = index === rows.length - 1;
        });
        view.add.disabled =
          tripChoices(items, program.tripPlan[view.side]).length === 0;
      }
      context = shownContext;
    },
  };
}
