/**
 * The trip plan of a program in React (D-180, D-181): the section the program panel holds between
 * the program's name and its rules. Folded, it is one line: the words „Zabierz” and „Wynieś”, each
 * position's item icon and count, or „Plan wyprawy: pusty” when both lists are empty. Unfolded,
 * each list shows its positions, each with an item select list, a count field, „↑”, „↓” and
 * „Usuń”, and „Dodaj przedmiot” below it. Every edit hands the page a whole new program through
 * `onCommit`. The folding is the component's own state, folded at the start; a click on the line
 * opens and closes it, and so does Enter on its button, which is a click there.
 *
 * The page holds the section behind `createTripPlan`, as it holds the rule panel: an element of its
 * own, `update(props)` and `dispose()`, called from an event handler or the continuation of an
 * answer, never from render or an effect. A program of another identity is a new section: the page
 * makes a new one, so a count rejected in one program's field is not shown in another's. Nothing
 * runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ITEMS } from "../sim/data/items.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { ConditionNumber } from "../sim/program.js";
import type { ItemId, Program, TripEntry, TripPlan } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactNumberField } from "./controls/react-number-field.js";
import { ReactSelectList } from "./controls/react-select-list.js";
import type { SelectOption } from "./controls/select-list.js";
import { tripChoices } from "./trip-editor.js";

type Side = keyof TripPlan;

/** The two lists in their order, with the words the player reads for each. */
const LISTS: readonly { side: Side; label: string }[] = [
  { side: "take", label: "Zabierz" },
  { side: "bring", label: "Wynieś" },
];

/** A position's count: a safe integer from 1 up (D-181). The count field commits by the trip rule. */
const COUNT: ConditionNumber = {
  defaultValue: 1,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
  step: 1,
};

const EMPTY_LINE = "Plan wyprawy: pusty";
const COUNT_MESSAGE = "Wpisz liczbę całkowitą od 1.";

export type TripPlanViewProps = {
  /** The program whose plan is shown: the saved program or the copy. */
  program: Program;
  /** The items the player has found, in the order the lists offer them (D-181). */
  items: readonly ItemId[];
  /** Called with the whole new program after each edit. */
  onCommit: (program: Program) => void;
};

/** The key of a position's count field: a list and the item the position holds. */
function rejectKey(side: Side, item: ItemId): string {
  return `${side}/${item}`;
}

/** The name of a control in the list: its side, its row or „add”, and its part. */
function slot(side: Side, row: number | "add", part: string): string {
  return `${side}/${row}/${part}`;
}

/** A copy of `keys` with `key` in it or out of it; the same set when nothing changes. */
function withKey(
  keys: ReadonlySet<string>,
  key: string,
  on: boolean,
): ReadonlySet<string> {
  if (keys.has(key) === on) return keys;
  const next = new Set(keys);
  if (on) next.add(key);
  else next.delete(key);
  return next;
}

/** The trip plan section, folded or unfolded; the page gives it the program and the items found. */
export function TripPlanView({ program, items, onCommit }: TripPlanViewProps) {
  // Folded at the start; a click on the line opens and closes the lists.
  const [open, setOpen] = useState(false);
  // The keys of the count fields whose text is no valid count: their message stands under them.
  const [rejected, setRejected] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  // The controls that take the focus after the next edit, the second one where the first is off.
  const focusNext = useRef<[string, string] | null>(null);
  const controls = useRef(
    new Map<string, HTMLButtonElement | HTMLSelectElement>(),
  );

  // An edit that moves or removes a control leaves the focus on the body unless the focus moves to
  // the control the edit leaves in its place, as a browser's disabled button would lose it.
  useLayoutEffect(() => {
    const wanted = focusNext.current;
    if (wanted === null) return;
    focusNext.current = null;
    const [first, second] = wanted;
    const element = controls.current.get(first);
    const target =
      element !== undefined && !element.disabled
        ? element
        : controls.current.get(second);
    target?.focus();
  });

  const { take, bring } = program.tripPlan;
  const empty = take.length === 0 && bring.length === 0;

  /** Registers a control under `name` for the focus; a control that leaves the page is removed. */
  function register(name: string) {
    return (element: HTMLButtonElement | HTMLSelectElement | null) => {
      if (element === null) controls.current.delete(name);
      else controls.current.set(name, element);
    };
  }

  function focusOn(first: string, second: string = first): void {
    focusNext.current = [first, second];
  }

  function commitList(side: Side, list: TripEntry[]): void {
    onCommit({ ...program, tripPlan: { ...program.tripPlan, [side]: list } });
  }

  function addItem(side: Side): void {
    const list = program.tripPlan[side];
    const item = tripChoices(items, list)[0];
    if (item === undefined) return;
    focusOn(slot(side, list.length, "select"));
    commitList(side, [...list, { item, count: 1 }]);
  }

  function chooseItem(
    side: Side,
    index: number,
    item: ItemId,
    chosen: ItemId,
  ): void {
    // The select is drawn anew for the new item, so its count field loses its message with it.
    setRejected((keys) => withKey(keys, rejectKey(side, item), false));
    focusOn(slot(side, index, "select"));
    commitList(
      side,
      program.tripPlan[side].map((entry) =>
        entry.item === item ? { ...entry, item: chosen } : entry,
      ),
    );
  }

  function changeCount(side: Side, item: ItemId, count: number): void {
    setRejected((keys) => withKey(keys, rejectKey(side, item), false));
    const list = program.tripPlan[side];
    if (!list.some((entry) => entry.item === item && entry.count !== count))
      return;
    commitList(
      side,
      list.map((entry) => (entry.item === item ? { ...entry, count } : entry)),
    );
  }

  function rejectCount(side: Side, item: ItemId): void {
    setRejected((keys) => withKey(keys, rejectKey(side, item), true));
  }

  function move(side: Side, index: number, offset: number): void {
    const list = [...program.tripPlan[side]];
    const other = index + offset;
    if (other < 0 || other >= list.length) return;
    [list[index], list[other]] = [list[other], list[index]];
    focusOn(
      slot(side, other, offset < 0 ? "up" : "down"),
      slot(side, other, "select"),
    );
    commitList(side, list);
  }

  function remove(side: Side, index: number): void {
    const list = program.tripPlan[side];
    setRejected((keys) =>
      withKey(keys, rejectKey(side, list[index].item), false),
    );
    const rest = list.filter((_, at) => at !== index);
    // The focus goes to the remove button of the row that takes this one's place, or the last row's,
    // or to the add button of the list when no row is left.
    if (rest.length === 0) focusOn(slot(side, "add", "add"));
    else focusOn(slot(side, Math.min(index, rest.length - 1), "remove"));
    commitList(side, rest);
  }

  return (
    <section className="trip-plan" aria-label="Plan wyprawy">
      <div className="trip-plan-line" onClick={() => setOpen((on) => !on)}>
        <ReactButton
          text={empty ? EMPTY_LINE : "Plan wyprawy"}
          expanded={open}
        />
        {empty
          ? null
          : LISTS.map(({ side, label }) => (
              <span className="trip-plan-side" key={side}>
                <span className="trip-plan-label">{label}</span>
                {program.tripPlan[side].map((entry) => (
                  <span className="trip-plan-position" key={entry.item}>
                    <span
                      className="icon-mask"
                      role="img"
                      aria-label={ITEMS[entry.item].name}
                      style={
                        {
                          "--icon": `url("/icons/${RESOURCES[entry.item].icon}.svg")`,
                        } as CSSProperties
                      }
                    />
                    {entry.count}
                  </span>
                ))}
              </span>
            ))}
      </div>
      {open
        ? LISTS.map(({ side, label }) => {
            const list = program.tripPlan[side];
            return (
              <section className="trip-plan-list" key={side}>
                <h4 className="trip-plan-heading">{label}</h4>
                <ol className="trip-list">
                  {list.map((entry, index) => (
                    <li className="trip-entry" key={entry.item}>
                      <ReactSelectList
                        label={`${label}: przedmiot`}
                        options={tripChoices(items, list, entry.item).map(
                          (item): SelectOption => [item, ITEMS[item].name],
                        )}
                        value={entry.item}
                        selectRef={register(slot(side, index, "select"))}
                        onChange={(event) =>
                          chooseItem(
                            side,
                            index,
                            entry.item,
                            event.target.value as ItemId,
                          )
                        }
                      />
                      <ReactNumberField
                        label={`${label}: liczba`}
                        number={COUNT}
                        value={entry.count}
                        rule="trip"
                        error={
                          rejected.has(rejectKey(side, entry.item))
                            ? COUNT_MESSAGE
                            : null
                        }
                        onReject={() => rejectCount(side, entry.item)}
                        onCommit={(count) =>
                          changeCount(side, entry.item, count)
                        }
                      />
                      <ReactButton
                        text="↑"
                        label={`${label}: w górę`}
                        disabled={index === 0}
                        buttonRef={register(slot(side, index, "up"))}
                        onClick={() => move(side, index, -1)}
                      />
                      <ReactButton
                        text="↓"
                        label={`${label}: w dół`}
                        disabled={index === list.length - 1}
                        buttonRef={register(slot(side, index, "down"))}
                        onClick={() => move(side, index, 1)}
                      />
                      <ReactButton
                        text="Usuń"
                        kind="destructive"
                        label={`${label}: usuń przedmiot`}
                        buttonRef={register(slot(side, index, "remove"))}
                        onClick={() => remove(side, index)}
                      />
                    </li>
                  ))}
                </ol>
                <ReactButton
                  text="Dodaj przedmiot"
                  label={`${label}: dodaj przedmiot`}
                  disabled={tripChoices(items, list).length === 0}
                  buttonRef={register(slot(side, "add", "add"))}
                  onClick={() => addItem(side)}
                />
              </section>
            );
          })
        : null}
    </section>
  );
}

export type TripPlanProps = Omit<TripPlanViewProps, "onCommit">;

export type TripPlanOptions = {
  /** Called with the whole new program after each edit. */
  onCommit: (program: Program) => void;
  props: TripPlanProps;
};

export type TripPlanHandle = {
  /** The section with its place, for the page to put in. */
  element: HTMLElement;
  /** Draws the section anew from what the page gives. */
  update(props: TripPlanProps): void;
  /** Unmounts the section and takes it out of the page. */
  dispose(): void;
};

/**
 * Builds the trip plan in an element of its own, for the page to place. The first render is
 * synchronous, so the section stands in the element when this returns. Each section is a new root:
 * nothing it holds outlives `dispose()`.
 */
export function createTripPlan(options: TripPlanOptions): TripPlanHandle {
  const element = document.createElement("div");
  element.className = "trip-plan-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: TripPlanProps): void {
    flushSync(() => {
      root.render(
        <TripPlanView
          program={props.program}
          items={props.items}
          onCommit={options.onCommit}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: TripPlanProps): void {
      if (!disposed) draw(props);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
