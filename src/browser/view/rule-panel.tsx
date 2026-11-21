/**
 * The rule panel of the program editor in React (D-288, D-289, D-290, D-293, D-296, D-299, D-300,
 * D-302, D-306). It stands in the rule list, under the row or header it changes, and changes one
 * program rule, or one rule group: for a rule its fields condition, number, target of the
 * condition, action and target of the action, each standing only where the rule has it; for a group
 * its name and its condition with the condition's number and target. One field at a time shows its
 * pick, a grid of pick cells in the groups and sections of the data, the others their value, so the
 * pick comes in steps (D-282). Each pick hands the page a whole new program through `onCommit`, never
 * the game state, and moves to the next field; a pick of the value held commits nothing and moves on
 * too. In a grid the arrow keys move among the cells, a greyed one included so that its reason can be
 * read, Enter picks and does nothing on a greyed cell, and only one cell of the grid is in the order
 * of Tab, so Tab leaves the grid. „✕” and Escape ask the page to close the panel through `onClose`;
 * opening another rule is the page's, by `open`. The rule list draws the panel in place, through
 * `RulePanelView`. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, RefObject } from "react";
import { ACTIONS } from "../sim/data/actions.js";
import { CONDITIONS, type ConditionDef } from "../sim/data/conditions.js";
import { conditionNumber } from "../sim/program.js";
import type {
  Action,
  Condition,
  GameState,
  GroupId,
  ItemId,
  Program,
  ResourceId,
} from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactNumberField } from "./controls/react-number-field.js";
import { ReactPickCell } from "./controls/react-pick-cell.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { itemTargetTime, namesItem } from "./item-target-pick.js";
import {
  actionFieldValue,
  actionPick,
  actionTargetPick,
  actionTime,
  conditionFields,
  conditionPick,
  conditionTargetPick,
  fieldAfter,
  groupNumber,
  offeredItems,
  offeredResources,
  readNumberField,
  renameGroup,
  ruleFields,
  ruleNumber,
  withActionItem,
  withActionKind,
  withActionResource,
  withConditionItem,
  withConditionKind,
  withConditionResource,
  withConditionValue,
  type PickCell,
  type PickSection,
  type RuleField,
} from "./program-editor.js";

/** What the panel shows: a rule, or with a null rule a rule group, opened on `field`, the condition when left out. */
export type RulePanelOpen = {
  groupId: GroupId;
  ruleId: number | null;
  field?: RuleField;
};

/** What the page gives the panel; every call of `update` gives it whole. */
export type RulePanelProps = {
  /** The game state, for what the Understanding holds, the map run and the time of an action. */
  state: GameState;
  /** The program shown: the saved program or the copy. */
  program: Program;
  /** The rule or group the panel is open on; null where it is closed, and then it draws nothing. */
  open: RulePanelOpen | null;
  /** The program shown is the copy a map run carries out, whose change sets the streak to zero. */
  copy: boolean;
};

export type RulePanelHandlers = {
  /** Called with the whole new program after each change. */
  onCommit: (program: Program) => void;
  /** Called when the player asks to close the panel, by „✕” or Escape. */
  onClose: () => void;
};

/** The words of each field above its value or its pick; the fields and their order are D-306's. */
const FIELD_LABELS: Record<RuleField, string> = {
  condition: "Warunek",
  number: "Liczba",
  conditionTarget: "Cel warunku",
  action: "Czynność",
  actionTarget: "Cel czynności",
};

/** „Zmiana zeruje passę tego przejścia.”: the panel of the copy says it, and nothing of the counts (D-302). */
const COPY_NOTE = "Zmiana zeruje passę tego przejścia.";

/**
 * Cells to a line in a field's grid: the conditions in two columns (D-290), every other pick in four.
 * `program-panel.css` draws the same numbers, the class `two-columns` naming the first.
 */
function columnsOf(field: RuleField): number {
  return field === "condition" ? 2 : 4;
}

/**
 * The cell an arrow key moves to from the cell at `at`, the cells counted through all sections of a
 * grid whose sections hold `lengths` cells and set `columns` to a line. Left and right step through
 * the cells in their order; up and down go to the line above or below, also into the next or the
 * previous section, keeping the column where that line has it. At an edge the cell stays.
 */
function cellAfterKey(
  lengths: readonly number[],
  columns: number,
  at: number,
  key: string,
): number {
  const total = lengths.reduce((sum, length) => sum + length, 0);
  if (key === "ArrowLeft") return Math.max(0, at - 1);
  if (key === "ArrowRight") return Math.min(total - 1, at + 1);
  let section = 0;
  let start = 0;
  while (at >= start + lengths[section]) {
    start += lengths[section];
    section += 1;
  }
  const offset = at - start;
  const line = Math.floor(offset / columns);
  const column = offset % columns;
  if (key === "ArrowDown") {
    if ((line + 1) * columns < lengths[section])
      return (
        start + Math.min((line + 1) * columns + column, lengths[section] - 1)
      );
    if (section + 1 >= lengths.length) return at;
    return (
      start + lengths[section] + Math.min(column, lengths[section + 1] - 1)
    );
  }
  if (key === "ArrowUp") {
    if (line > 0) return start + (line - 1) * columns + column;
    if (section === 0) return at;
    const length = lengths[section - 1];
    const last = Math.floor((length - 1) / columns) * columns;
    return start - length + Math.min(last + column, length - 1);
  }
  return at;
}

/** A pick of one field in sections, whatever the field: a target's pick is one section with no name. */
type FieldPick = PickSection<string>[];

/** The pick of `field` for a holder of `condition` and, for a rule, `action`; null where the field stands not. */
function pickOf(
  state: GameState,
  field: RuleField,
  condition: Condition,
  action: Action | null,
): FieldPick | null {
  switch (field) {
    case "condition":
      return conditionPick(state, condition);
    case "action":
      return action === null ? null : actionPick(state, action);
    case "conditionTarget":
      return asSection(conditionTargetPick(state, condition));
    case "actionTarget":
      return action === null
        ? null
        : asSection(actionTargetPick(state, action));
    case "number":
      return null;
  }
}

function asSection(cells: PickCell<ItemId>[] | null): FieldPick | null {
  return cells === null ? null : [{ name: null, cells }];
}

/** The value a field shows while its pick is closed: the name of the cell chosen. */
function chosenLabel(pick: FieldPick | null): string {
  for (const section of pick ?? [])
    for (const cell of section.cells) if (cell.chosen) return cell.label;
  return "";
}

/** The item an action names as its target, undefined for an action that names none. */
function itemOf(action: Action | null): ItemId | undefined {
  return action !== null && namesItem(action) ? action.item : undefined;
}

/**
 * The time one carrying out takes, as the grid of `field` shows it beside each cell: the time of the
 * kind at a cell of an action, the time the target gives at a cell of the target of an item verb
 * („Wytwórz”: the minutes of its recipe), and none at any other cell.
 */
function cellTimes(
  state: GameState,
  field: RuleField,
  action: Action | null,
): (value: string) => string | null {
  if (field === "action")
    return (value) => actionTime(state, value as Action["kind"]);
  if (field === "actionTarget" && action !== null && namesItem(action)) {
    const kind = action.kind;
    return (value) => itemTargetTime(state, kind, value as ItemId);
  }
  return () => null;
}

/** The cells of a grid, in the order of its sections, as the panel draws them. */
function cellsOf(grid: HTMLElement | null): HTMLElement[] {
  return grid === null
    ? []
    : [...grid.querySelectorAll<HTMLElement>(".pick-cell")];
}

/**
 * The rule or group a change addresses: its group, its place in the group (null for the group's own
 * condition), its condition and its action, null for a group.
 */
type RuleTarget = {
  groupId: GroupId;
  index: number | null;
  condition: Condition | undefined;
  action: Action | null;
};

/** The program after `value` is picked in `field` of `target`; null where it changes nothing. */
function changedProgram(
  state: GameState,
  program: Program,
  target: RuleTarget,
  field: RuleField,
  value: string,
): Program | null {
  const { groupId, index, condition, action } = target;
  switch (field) {
    case "condition":
      return withConditionKind(
        program,
        groupId,
        index,
        value as Condition["kind"],
        offeredResources(state),
        offeredItems(state),
      );
    case "conditionTarget":
      return condition?.kind === "hereBelow"
        ? withConditionResource(program, groupId, index, value as ResourceId)
        : withConditionItem(program, groupId, index, value as ItemId);
    case "action":
      return index === null
        ? null
        : withActionKind(
            program,
            groupId,
            index,
            value as Action["kind"],
            offeredResources(state),
            offeredItems(state),
          );
    case "actionTarget":
      if (index === null) return null;
      // An item verb takes an item of its own targets, any other verb a resource.
      return action !== null && namesItem(action)
        ? withActionItem(program, groupId, index, value as ItemId)
        : withActionResource(program, groupId, index, value as ResourceId);
    case "number":
      return null;
  }
}

/** The fields of the rule or group `index` of `groupId` in `next`, the program a change made. */
function fieldsOf(
  next: Program,
  groupId: GroupId,
  index: number | null,
): RuleField[] {
  const nextGroup = next.groups.find((each) => each.id === groupId);
  if (index === null)
    return nextGroup === undefined ? [] : conditionFields(nextGroup.condition);
  const nextRule = nextGroup?.rules[index];
  return nextRule === undefined ? [] : ruleFields(nextRule);
}

/** The field of a rule group's name; the name typed waits in `name` until the field loses the focus or Enter is pressed. */
function GroupNameField({
  groupName,
  name,
  setName,
  commitName,
  moveTo,
}: {
  groupName: string;
  name: string | null;
  setName: (name: string | null) => void;
  commitName: () => void;
  moveTo: (field: RuleField) => void;
}) {
  return (
    <div className="rule-panel-field">
      <span className="rule-panel-label">Nazwa grupy</span>
      <span
        className="rule-panel-name"
        onFocus={() => {
          if (name === null) setName(groupName);
        }}
        onBlur={commitName}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          commitName();
          moveTo("condition");
        }}
      >
        <ReactTextField
          label="Nazwa grupy"
          value={name ?? groupName}
          onChange={(event) => setName(event.target.value)}
        />
      </span>
    </div>
  );
}

/**
 * The grid of pick cells of the open field. The keys move the cursor among the cells and Enter picks
 * a cell that is not greyed; the cell `tabbable` is the only one in the order of Tab.
 */
function PickGrid({
  field,
  sections,
  cursor,
  tabbable,
  gridRef,
  timeOf,
  onCursor,
  onChoose,
}: {
  field: RuleField;
  sections: FieldPick;
  cursor: number | null;
  tabbable: number;
  gridRef: RefObject<HTMLDivElement | null>;
  timeOf: (value: string) => string | null;
  onCursor: (at: number | null) => void;
  onChoose: (value: string) => void;
}) {
  const flat = sections.flatMap((section) => section.cells);

  function gridKey(event: KeyboardEvent<HTMLDivElement>): void {
    const cells = cellsOf(gridRef.current);
    const at = cells.indexOf(event.target as HTMLElement);
    if (at < 0) return;
    if (event.key === "Enter") {
      event.preventDefault();
      const cell = flat[at];
      if (cell !== undefined && !cell.greyed) onChoose(cell.value);
      return;
    }
    if (!event.key.startsWith("Arrow")) return;
    event.preventDefault();
    const to = cellAfterKey(
      sections.map((section) => section.cells.length),
      columnsOf(field),
      at,
      event.key,
    );
    onCursor(to);
    cells[to]?.focus();
  }

  function gridFocus(event: FocusEvent<HTMLDivElement>): void {
    const at = cellsOf(gridRef.current).indexOf(event.target);
    if (at >= 0 && at !== cursor) onCursor(at);
  }

  let cellsBefore = 0;
  return (
    <div
      // The sections of the conditions bear no names, so a line parts them (D-290).
      className={
        field === "condition" ? "rule-panel-pick parted" : "rule-panel-pick"
      }
      role="group"
      aria-label={FIELD_LABELS[field]}
      ref={gridRef}
      onKeyDown={gridKey}
      onFocus={gridFocus}
    >
      {sections.map((section, at) => (
        <div className="rule-panel-section" key={section.name ?? at}>
          {section.name === null ? null : (
            <h4 className="rule-panel-section-name">{section.name}</h4>
          )}
          <div
            className={
              columnsOf(field) === 2
                ? "rule-panel-cells two-columns"
                : "rule-panel-cells"
            }
          >
            {section.cells.map((cell) => {
              // The cells of the grid are counted through all its sections, as `flat` counts them.
              const index = cellsBefore;
              cellsBefore += 1;
              const time = timeOf(cell.value);
              return (
                <div className="rule-panel-cell" key={cell.value}>
                  <ReactPickCell
                    text={cell.label}
                    icon={
                      field === "action"
                        ? ACTIONS[cell.value as Action["kind"]].icon
                        : undefined
                    }
                    chosen={cell.chosen}
                    greyed={cell.greyed}
                    reason={cell.reason}
                    onPick={() => onChoose(cell.value)}
                    // Only the cell the keyboard stands on is in the order of Tab, so Tab leaves the grid.
                    tabIndex={index === tabbable ? 0 : -1}
                  />
                  {time === null ? null : (
                    <span className="rule-panel-time">{time}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The number field of a condition, with the unit of its kind beside it. Enter commits the number as
 * the field reads it and moves on to `after`, also where the number stays as it was.
 */
function NumberRow({
  label,
  condition,
  active,
  after,
  moveTo,
  onCommit,
  inputRef,
}: {
  label: string;
  condition: Condition;
  active: RuleField;
  after: RuleField | null;
  moveTo: (field: RuleField) => void;
  onCommit: (value: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const number = conditionNumber(condition.kind);
  if (number === null || !("value" in condition)) return null;
  // The unit comes from the condition's data, beside the field and not in the field itself.
  const def: ConditionDef = CONDITIONS[condition.kind];
  return (
    <div className="rule-panel-field">
      <span className="rule-panel-label">{label}</span>
      <span className="rule-panel-value">
        <span
          className="rule-panel-number"
          onFocus={() => {
            if (active !== "number") moveTo("number");
          }}
          onKeyDown={(event) => {
            // The field commits a changed number on Enter itself; the panel then moves on. The key press
            // is consumed here: the focus goes to a cell of the next pick during this event, and a browser
            // would otherwise deliver the same Enter to that cell and pick it.
            if (event.key !== "Enter") return;
            event.preventDefault();
            if (after !== null) moveTo(after);
          }}
        >
          <ReactNumberField
            label={label}
            number={number}
            value={condition.value}
            rule={(text, held) => readNumberField(text, held, number)}
            onCommit={onCommit}
            inputRef={inputRef}
          />
        </span>
        {def.unit === undefined ? null : (
          <span className="rule-panel-unit">{def.unit}</span>
        )}
      </span>
    </div>
  );
}

/** What the row of one field reads from the panel; the panel hands each row its own field and these. */
type FieldRowProps = {
  state: GameState;
  field: RuleField;
  condition: Condition;
  action: Action | null;
  fields: RuleField[];
  active: RuleField;
  cursor: number | null;
  tabbable: number;
  grid: RefObject<HTMLDivElement | null>;
  numberInput: RefObject<HTMLInputElement | null>;
  moveTo: (field: RuleField) => void;
  onCursor: (at: number | null) => void;
  onChoose: (field: RuleField, value: string) => void;
  onCommitNumber: (value: number) => void;
};

/** The row of one field: its number field, its grid while it is open, or its value and a button that opens it. */
function FieldRow({
  state,
  field,
  condition,
  action,
  fields,
  active,
  cursor,
  tabbable,
  grid,
  numberInput,
  moveTo,
  onCursor,
  onChoose,
  onCommitNumber,
}: FieldRowProps) {
  const label = FIELD_LABELS[field];
  if (field === "number")
    return (
      <NumberRow
        label={label}
        condition={condition}
        active={active}
        after={fieldAfter(fields, "number")}
        moveTo={moveTo}
        onCommit={onCommitNumber}
        inputRef={numberInput}
      />
    );
  const fieldPick = pickOf(state, field, condition, action);
  if (fieldPick === null) return null;
  // The action field shows the verb with its target and its price, and the time of one carrying out.
  const shown = field === "action" && action !== null;
  const value = shown
    ? actionFieldValue(state, action)
    : chosenLabel(fieldPick);
  const time = shown ? actionTime(state, action.kind, itemOf(action)) : null;
  return (
    <div className="rule-panel-field">
      <span className="rule-panel-label">{label}</span>
      {field === active ? (
        <PickGrid
          field={field}
          sections={fieldPick}
          cursor={cursor}
          tabbable={tabbable}
          gridRef={grid}
          timeOf={cellTimes(state, field, action)}
          onCursor={onCursor}
          onChoose={(value) => onChoose(field, value)}
        />
      ) : (
        <span className="rule-panel-value">
          <ReactButton
            text={value}
            label={`${label}: ${value}`}
            onClick={() => moveTo(field)}
          />
          {time === null ? null : (
            <span className="rule-panel-time">{time}</span>
          )}
        </span>
      )}
    </div>
  );
}

type RulePanelViewProps = RulePanelHandlers & RulePanelProps;

/** The rule panel of the rule or group `open` names; nothing where none is open or it is gone. */
export function RulePanelView({
  state,
  program,
  open,
  copy,
  onCommit,
  onClose,
}: RulePanelViewProps) {
  const groupIndex =
    open === null
      ? -1
      : program.groups.findIndex((each) => each.id === open.groupId);
  const group = groupIndex < 0 ? undefined : program.groups[groupIndex];
  const ruleIndex =
    open === null || open.ruleId === null || group === undefined
      ? -1
      : group.rules.findIndex((each) => each.id === open.ruleId);
  const rule = ruleIndex < 0 ? undefined : group?.rules[ruleIndex];
  // The rule's place in its group for the edits; null addresses the group's own condition.
  const index = open?.ruleId === null ? null : ruleIndex;
  const condition = rule?.condition ?? group?.condition;
  const action = rule?.action ?? null;
  const fields: RuleField[] =
    rule !== undefined
      ? ruleFields(rule)
      : condition !== undefined
        ? conditionFields(condition)
        : [];

  // The field whose pick stands open, set anew whenever the page opens another rule, group or field. A
  // rule is named by its number alone, so a rule moved to another group keeps the field it stood on.
  const openKey =
    open === null
      ? ""
      : open.ruleId === null
        ? `group:${open.groupId}:${open.field ?? "condition"}`
        : `rule:${open.ruleId}:${open.field ?? "condition"}`;
  const requested: RuleField =
    open?.field !== undefined && fields.includes(open.field)
      ? open.field
      : "condition";
  // With it, the cell of the open grid the keyboard stands on; null until the keyboard moves there.
  const [shown, setShown] = useState<{
    key: string;
    active: RuleField;
    cursor: number | null;
  }>({ key: openKey, active: requested, cursor: null });
  const current =
    shown.key === openKey
      ? shown
      : { key: openKey, active: requested, cursor: null };
  if (shown !== current) setShown(current);
  const { active, cursor } = current;
  // The name typed into the group's name field while it has the focus; null while it has none.
  const [name, setName] = useState<string | null>(null);

  const grid = useRef<HTMLDivElement>(null);
  const numberInput = useRef<HTMLInputElement>(null);
  // The field the focus goes to once it stands drawn: the one opened, or the next after a pick.
  const pendingFocus = useRef<RuleField | null>(null);
  const focusedKey = useRef<string | null>(null);

  const pick = pickOf(state, active, condition ?? { kind: "always" }, action);
  const flat = pick?.flatMap((section) => section.cells) ?? [];
  const chosenAt = flat.findIndex((cell) => cell.chosen);
  const tabbable =
    cursor !== null && cursor < flat.length ? cursor : Math.max(0, chosenAt);

  // The focus goes into the panel when it opens, and to the next field after a pick, once that field
  // stands: the page may draw the program a pick made a moment later.
  useLayoutEffect(() => {
    if (focusedKey.current !== openKey) {
      focusedKey.current = openKey;
      pendingFocus.current = openKey === "" ? null : requested;
    }
    const wanted = pendingFocus.current;
    if (wanted === null || wanted !== active) return;
    const target =
      wanted === "number"
        ? numberInput.current
        : (cellsOf(grid.current)[tabbable] ?? null);
    if (target === null) return;
    pendingFocus.current = null;
    target.focus();
    // The number the rule holds is selected, so the digits the player types replace it instead of
    // standing beside it (a real browser keeps the old digits otherwise).
    if (wanted === "number") numberInput.current?.select();
  });

  if (open === null || group === undefined || condition === undefined)
    return null;
  if (open.ruleId !== null && rule === undefined) return null;
  const groupId = group.id;

  /** Opens `field`'s pick, or its number field, and sends the focus there. */
  function moveTo(field: RuleField): void {
    setShown({ key: openKey, active: field, cursor: null });
    pendingFocus.current = field;
  }

  function setCursor(at: number | null): void {
    setShown({ key: openKey, active, cursor: at });
  }

  /** A pick in `field`: the change goes to the page, and the panel moves to the next field. */
  function choose(field: RuleField, value: string): void {
    const next = changedProgram(
      state,
      program,
      { groupId, index, condition, action },
      field,
      value,
    );
    const following = fieldAfter(
      fieldsOf(next ?? program, groupId, index),
      field,
    );
    // After the last field the panel stays on it, the keyboard on the cell now chosen.
    if (following === null) setCursor(null);
    else moveTo(following);
    if (next !== null) onCommit(next);
  }

  function commitNumber(value: number): void {
    const next = withConditionValue(program, groupId, index, value);
    if (next !== null) onCommit(next);
  }

  function commitName(): void {
    if (name === null) return;
    setName(null);
    const next = renameGroup(program, groupId, name);
    if (next !== null) onCommit(next);
  }

  const heading =
    index === null
      ? `Grupa ${groupNumber(groupIndex)}`
      : `Reguła ${ruleNumber(groupIndex, index)}`;

  return (
    <section
      className="rule-panel"
      aria-label={heading}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        onClose();
      }}
    >
      <div className="rule-panel-top">
        <h3 className="rule-panel-heading">{heading}</h3>
        <ReactButton text="✕" label="Zamknij panel" onClick={onClose} />
      </div>
      {copy ? <p className="rule-panel-note">{COPY_NOTE}</p> : null}
      {index === null ? (
        <GroupNameField
          groupName={group.name}
          name={name}
          setName={setName}
          commitName={commitName}
          moveTo={moveTo}
        />
      ) : null}
      {fields.map((field) => (
        <FieldRow
          key={field}
          state={state}
          field={field}
          condition={condition}
          action={action}
          fields={fields}
          active={active}
          cursor={cursor}
          tabbable={tabbable}
          grid={grid}
          numberInput={numberInput}
          moveTo={moveTo}
          onCursor={setCursor}
          onChoose={choose}
          onCommitNumber={commitNumber}
        />
      ))}
    </section>
  );
}
