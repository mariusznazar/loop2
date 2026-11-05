/**
 * The list of a program's rule groups and rules in React (D-288, D-292, D-293, D-295, D-297; task
 * edytor-programu, To do 1, 2, 6 to 10). It draws under the heading „sprawdzane od góry” the groups,
 * each with a header and its rules, each rule as a row read as a sentence, and it never writes the
 * game state: each edit is a whole new program handed to `onCommit`, which the page puts into the
 * game, and a click on a row or a header, or a rule just added, is a request to open the panel,
 * handed to `onOpen`. Which groups are folded comes in the props and a change goes out through
 * `onFoldedChange`, so the list holds no memory of its own about it (D-295). Rules move by „↑” and
 * „↓”, across the border of a group too, and rules and whole groups by their handle on the browser's
 * own drag (D-270), a drop line showing where they would land. The page holds the list behind
 * `createRuleList`, as the program list does, calling it from an event handler or the continuation
 * of an answer, never from render or an effect. Nothing runs when the module is imported.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  DragEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ACTIONS } from "../sim/data/actions.js";
import type { GameState, GroupId, Program, RuleGroup } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import {
  actionTime,
  addGroup,
  addRule,
  countText,
  dropGroup,
  dropRule,
  focusAfter,
  groupNumber,
  groupSummary,
  moveRule,
  offeredActionKinds,
  removeGroup,
  removeRule,
  ruleArrows,
  ruleNumber,
  ruleSentence,
  type FocusTarget,
} from "./program-editor.js";

/** What the page gives the list; every call of `update` gives it whole. */
export type RuleListProps = {
  /** The game state, for the time of an action and for what the Understanding holds. */
  state: GameState;
  /** The program shown: the saved program or the copy. */
  program: Program;
  /** The counts beside the rules, or null where the screen shows none (D-93). */
  counts: GameState["ruleCounts"];
  /** The groups folded to their header; the list keeps no memory of this (D-295). */
  folded: readonly GroupId[];
  /** The row or the header whose panel stands open; null where none does. */
  open: { groupId: GroupId; ruleId: number | null } | null;
};

/** The row, or with a null rule the header of the group, a click or an addition asks to open. */
export type RuleListTarget = { groupId: GroupId; ruleId: number | null };

export type RuleListOptions = {
  /** Called with the whole new program after each edit. */
  onCommit: (program: Program) => void;
  /** Called when the player asks to open the panel of a row or of a group's header. */
  onOpen: (target: RuleListTarget) => void;
  /** Called with the whole list of folded groups after a fold or an unfold. */
  onFoldedChange: (folded: GroupId[]) => void;
  props: RuleListProps;
};

export type RuleList = {
  /** The list with its place, for the page to put in. */
  element: HTMLElement;
  /** Draws the list anew from what the page gives. */
  update(props: RuleListProps): void;
  /** Unmounts the list and takes it out of the page. */
  dispose(): void;
};

/** What is being dragged: a rule by its number or a whole group. */
type Dragged = { kind: "rule"; id: number } | { kind: "group"; id: GroupId };

/** Where a drop would land: in a group before a rule or at its end, or among the groups. */
type Landing =
  | { kind: "rule"; groupId: GroupId; beforeId?: number }
  | { kind: "group"; beforeId?: GroupId };

const RULE_DRAG_TYPE = "application/x-loop-rule";
const GROUP_DRAG_TYPE = "application/x-loop-group";

/** The rules of the groups as numbers, one string, to tell a changed order from the same one. */
function orderOf(program: Program): string {
  return program.groups
    .map((group) => group.rules.map((each) => each.id).join())
    .join("|");
}

/** The program a drop would make, null where it changes nothing or cannot be made. */
function droppedProgram(
  program: Program,
  dragged: Dragged,
  landing: Landing,
): Program | null {
  if (dragged.kind === "rule" && landing.kind === "rule") {
    const next = dropRule(
      program,
      dragged.id,
      landing.groupId,
      landing.beforeId,
    );
    return next !== null && orderOf(next) !== orderOf(program) ? next : null;
  }
  if (dragged.kind === "group" && landing.kind === "group")
    return dropGroup(program, dragged.id, landing.beforeId);
  return null;
}

function sameLanding(a: Landing | null, b: Landing | null): boolean {
  if (a === null || b === null) return a === b;
  if (a.kind === "rule")
    return (
      b.kind === "rule" && a.groupId === b.groupId && a.beforeId === b.beforeId
    );
  return b.kind === "group" && a.beforeId === b.beforeId;
}

/** Whether the pointer stands in the lower half of the element the event is handled on. */
function inLowerHalf(event: DragEvent<HTMLElement>): boolean {
  const box = event.currentTarget.getBoundingClientRect();
  return box.height > 0 && event.clientY > box.top + box.height / 2;
}

/** „1 reguła”, „2 reguły”, „5 reguł”: the number of a group's rules in the player's words. */
function ruleCountText(count: number): string {
  const last = count % 10;
  const tens = count % 100;
  if (count === 1) return "1 reguła";
  if (last >= 2 && last <= 4 && (tens < 12 || tens > 14))
    return `${count} reguły`;
  return `${count} reguł`;
}

/** The control keys a focus may go to after an edit of `focusAfter`'s kind, in the order tried. */
function keysOf(target: FocusTarget, program: Program): string[] {
  if (target.control === "add") return [`group:${target.groupId}:add`];
  if (!("row" in target)) return [];
  const moved = program.groups.find((group) => group.id === target.groupId)
    ?.rules[target.row];
  const control = target.control === "condition" ? "open" : target.control;
  return moved === undefined
    ? [`group:${target.groupId}:add`, `group:${target.groupId}:open`]
    : [`rule:${moved.id}:${control}`, `group:${target.groupId}:open`];
}

/** Whether a key press on a row or a header itself, not on a button inside it, asks to open. */
function asksToOpen(event: KeyboardEvent<HTMLElement>): boolean {
  return (
    event.target === event.currentTarget &&
    (event.key === "Enter" || event.key === " ")
  );
}

/** Whether a click reached the row or header itself or its text, not a button or the handle in it. */
function clickedBody(event: MouseEvent<HTMLElement>): boolean {
  return !(
    event.target instanceof Element &&
    event.target.closest("button, .drag-handle")
  );
}

type RuleListViewProps = Omit<RuleListOptions, "props"> & RuleListProps;

/** The list of groups and rules, with the drag, the fold and the edits of its rows. */
export function RuleListView({
  state,
  program,
  counts,
  folded,
  open,
  onCommit,
  onOpen,
  onFoldedChange,
}: RuleListViewProps) {
  const [landing, setLanding] = useState<Landing | null>(null);
  const dragged = useRef<Dragged | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const controls = useRef(new Map<string, HTMLElement>());
  // The keys the focus goes to once the program an edit made is drawn, in the order tried.
  const pendingFocus = useRef<string[] | null>(null);
  const canAddRule = offeredActionKinds(state).length > 0;

  // A control that holds focus and leaves (a moved rule's row, a deleted rule's button) loses it, so
  // the focus goes to the control the edit names once the new program is drawn.
  useLayoutEffect(() => {
    const keys = pendingFocus.current;
    if (keys === null) return;
    pendingFocus.current = null;
    for (const key of keys) {
      const element = controls.current.get(key);
      if (element !== undefined && !(element as HTMLButtonElement).disabled) {
        element.focus();
        return;
      }
    }
  }, [program]);

  // A drag that ends where no handler of the list sees it, a cancelled one or one whose source left
  // the page with the edit, still takes the drop line away.
  useEffect(() => {
    const page = root.current?.ownerDocument;
    if (page === undefined) return;
    const stop = (): void => {
      dragged.current = null;
      setLanding(null);
    };
    page.addEventListener("dragend", stop);
    page.addEventListener("drop", stop);
    return () => {
      page.removeEventListener("dragend", stop);
      page.removeEventListener("drop", stop);
    };
  }, []);

  /** The ref of a control the focus may need to reach, kept under its key while it stands. */
  function track(key: string): (element: HTMLElement | null) => void {
    return (element) => {
      if (element === null) controls.current.delete(key);
      else controls.current.set(key, element);
    };
  }

  function commit(next: Program, focus: string[]): void {
    pendingFocus.current = focus;
    onCommit(next);
  }

  function clearDrag(): void {
    dragged.current = null;
    setLanding(null);
  }

  function toggleFold(id: GroupId): void {
    onFoldedChange(
      folded.includes(id)
        ? folded.filter((each) => each !== id)
        : [...folded, id],
    );
  }

  const allFolded =
    program.groups.length > 0 &&
    program.groups.every((group) => folded.includes(group.id));

  function startDrag(
    event: DragEvent<HTMLElement>,
    what: Dragged,
    shown: Element | null,
  ): void {
    event.stopPropagation();
    dragged.current = what;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      what.kind === "rule" ? RULE_DRAG_TYPE : GROUP_DRAG_TYPE,
      String(what.id),
    );
    if (shown !== null && typeof event.dataTransfer.setDragImage === "function")
      event.dataTransfer.setDragImage(shown, 0, 0);
  }

  /** Where the drag in hand would land with the pointer at `event` over `target`, null where nowhere. */
  function landingAt(
    event: DragEvent<HTMLElement>,
    target:
      | { over: "row"; group: RuleGroup; index: number }
      | { over: "group"; group: RuleGroup },
  ): Landing | null {
    const what = dragged.current;
    if (what === null) return null;
    const lower = inLowerHalf(event);
    if (what.kind === "rule") {
      if (target.over === "group")
        return { kind: "rule", groupId: target.group.id };
      const next = target.group.rules[target.index + 1];
      return {
        kind: "rule",
        groupId: target.group.id,
        beforeId: lower ? next?.id : target.group.rules[target.index].id,
      };
    }
    if (target.over === "row") return null;
    const at = program.groups.findIndex((each) => each.id === target.group.id);
    return {
      kind: "group",
      beforeId: lower ? program.groups[at + 1]?.id : target.group.id,
    };
  }

  function dragOver(
    event: DragEvent<HTMLElement>,
    target: Parameters<typeof landingAt>[1],
  ): void {
    const what = dragged.current;
    if (what === null) return;
    // A row lets a dragged group's event through to its group, which places it among the groups.
    if (target.over === "row" && what.kind === "group") return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    const at = landingAt(event, target);
    const shown =
      at !== null && droppedProgram(program, what, at) !== null ? at : null;
    setLanding((previous) => (sameLanding(previous, shown) ? previous : shown));
  }

  function drop(
    event: DragEvent<HTMLElement>,
    target: Parameters<typeof landingAt>[1],
  ): void {
    const what = dragged.current;
    if (what === null) return;
    if (target.over === "row" && what.kind === "group") return;
    event.preventDefault();
    event.stopPropagation();
    const at = landingAt(event, target);
    clearDrag();
    const next = at === null ? null : droppedProgram(program, what, at);
    if (next === null || at === null) return;
    commit(
      next,
      what.kind === "rule"
        ? [
            `rule:${what.id}:open`,
            `group:${at.kind === "rule" ? at.groupId : 0}:open`,
          ]
        : [`group:${what.id}:open`],
    );
  }

  function leave(event: DragEvent<HTMLElement>): void {
    const into = event.relatedTarget;
    if (into instanceof Element && root.current?.contains(into) === true)
      return;
    setLanding(null);
  }

  function move(group: RuleGroup, index: number, offset: -1 | 1): void {
    const next = moveRule(program, group.id, index, offset);
    if (next === null) return;
    const id = group.rules[index].id;
    const own = offset === 1 ? "down" : "up";
    const other = offset === 1 ? "up" : "down";
    const into = next.groups.find((each) =>
      each.rules.some((each2) => each2.id === id),
    );
    // The control of the rule's new place: its own arrow, then the other, then its row, then the
    // header of the group it went to, which stays when that group is folded.
    commit(next, [
      `rule:${id}:${own}`,
      `rule:${id}:${other}`,
      `rule:${id}:open`,
      `group:${into?.id ?? group.id}:open`,
    ]);
  }

  function remove(group: RuleGroup, index: number): void {
    const next = removeRule(program, group.id, index);
    if (next === null) return;
    const after =
      next.groups.find((each) => each.id === group.id)?.rules.length ?? 0;
    commit(next, keysOf(focusAfter("remove", group.id, index, after), next));
  }

  function add(group: RuleGroup): void {
    const next = addRule(program, group.id);
    if (next === null) return;
    const id = program.nextRuleId;
    commit(next, [`rule:${id}:open`, `group:${group.id}:add`]);
    onOpen({ groupId: group.id, ruleId: id });
  }

  function removeWholeGroup(group: RuleGroup): void {
    const next = removeGroup(program, group.id);
    if (next === null) return;
    const at = program.groups.findIndex((each) => each.id === group.id);
    const following = next.groups[at];
    commit(
      next,
      following === undefined
        ? ["add-group"]
        : [`group:${following.id}:remove`],
    );
  }

  function addWholeGroup(): void {
    const next = addGroup(program);
    commit(next, [`group:${program.nextGroupId}:open`]);
  }

  /** The drop line, drawn where the drag in hand would land. */
  const line = (
    <div className="drop-line" aria-hidden="true">
      tu wyląduje
    </div>
  );

  function renderRule(group: RuleGroup, groupIndex: number, index: number) {
    const each = group.rules[index];
    const sentence = ruleSentence(each);
    const time = actionTime(state, each.action.kind);
    const arrows = ruleArrows(program, group.id, index);
    const isOpen = open?.groupId === group.id && open.ruleId === each.id;
    const target = { over: "row", group, index } as const;
    return (
      <li
        key={each.id}
        className={isOpen ? "rule-list-row open" : "rule-list-row"}
        data-rule={each.id}
        tabIndex={0}
        aria-current={isOpen ? "true" : undefined}
        ref={track(`rule:${each.id}:open`)}
        onClick={(event) => {
          if (clickedBody(event))
            onOpen({ groupId: group.id, ruleId: each.id });
        }}
        onKeyDown={(event) => {
          if (!asksToOpen(event)) return;
          event.preventDefault();
          onOpen({ groupId: group.id, ruleId: each.id });
        }}
        onDragOver={(event) => dragOver(event, target)}
        onDrop={(event) => drop(event, target)}
      >
        <span
          className="drag-handle"
          draggable
          aria-hidden="true"
          title="Przeciągnij regułę"
          onDragStart={(event) =>
            startDrag(
              event,
              { kind: "rule", id: each.id },
              event.currentTarget.closest("li"),
            )
          }
        >
          ⋮⋮
        </span>
        <span className="rule-number">{ruleNumber(groupIndex, index)}</span>
        <span className="rule-condition">{sentence.condition}</span>
        <span className="rule-arrow">→</span>
        <span className="rule-action">
          <span
            className="action-icon"
            aria-hidden="true"
            style={
              {
                "--icon": `url("/icons/${ACTIONS[each.action.kind].icon}.svg")`,
              } as CSSProperties
            }
          />
          {sentence.action}
        </span>
        {time === null ? null : <span className="rule-time">{time}</span>}
        {counts === null ? null : (
          <span className="rule-count">{countText(counts[each.id] ?? 0)}</span>
        )}
        <span className="rule-list-controls">
          <ReactButton
            text="↑"
            label="W górę"
            disabled={!arrows.up}
            buttonRef={track(`rule:${each.id}:up`)}
            onClick={() => move(group, index, -1)}
          />
          <ReactButton
            text="↓"
            label="W dół"
            disabled={!arrows.down}
            buttonRef={track(`rule:${each.id}:down`)}
            onClick={() => move(group, index, 1)}
          />
          <ReactButton
            text="Usuń"
            kind="destructive"
            buttonRef={track(`rule:${each.id}:remove`)}
            onClick={() => remove(group, index)}
          />
        </span>
      </li>
    );
  }

  function renderGroup(group: RuleGroup, groupIndex: number) {
    const summary = groupSummary(group, counts);
    const isFolded = folded.includes(group.id);
    const isOpen = open?.groupId === group.id && open.ruleId === null;
    const target = { over: "group", group } as const;
    const lands = landing?.kind === "rule" && landing.groupId === group.id;
    const lineAt = lands ? landing.beforeId : undefined;
    const rows = group.rules.flatMap((each, index) => [
      lands && lineAt === each.id ? (
        <li key={`line-${each.id}`} className="drop-line" aria-hidden="true">
          tu wyląduje
        </li>
      ) : null,
      renderRule(group, groupIndex, index),
    ]);
    return (
      <section
        key={group.id}
        className="rule-list-group"
        data-group={group.id}
        onDragOver={(event) => dragOver(event, target)}
        onDrop={(event) => drop(event, target)}
      >
        <div
          className={isOpen ? "rule-list-header open" : "rule-list-header"}
          tabIndex={0}
          aria-current={isOpen ? "true" : undefined}
          ref={track(`group:${group.id}:open`)}
          onClick={(event) => {
            if (clickedBody(event)) onOpen({ groupId: group.id, ruleId: null });
          }}
          onKeyDown={(event) => {
            if (!asksToOpen(event)) return;
            event.preventDefault();
            onOpen({ groupId: group.id, ruleId: null });
          }}
        >
          <span
            className="drag-handle"
            draggable
            aria-hidden="true"
            title="Przeciągnij grupę"
            onDragStart={(event) =>
              startDrag(
                event,
                { kind: "group", id: group.id },
                event.currentTarget.closest("section"),
              )
            }
          >
            ⋮⋮
          </span>
          <span className="rule-list-number">{groupNumber(groupIndex)}</span>
          <span className="rule-list-name">{summary.name}</span>
          <span className="rule-list-condition">{summary.condition}</span>
          <span className="rule-list-size">
            {ruleCountText(summary.ruleCount)}
          </span>
          {summary.executed === null ? null : (
            <span className="rule-list-count">
              {countText(summary.executed)}
            </span>
          )}
          <span className="rule-list-controls">
            <ReactButton
              text={isFolded ? "▸" : "▾"}
              label={isFolded ? "Rozwiń grupę" : "Zwiń grupę"}
              expanded={!isFolded}
              onClick={() => toggleFold(group.id)}
            />
            <ReactButton
              text="✕"
              label="Usuń grupę"
              kind="destructive"
              buttonRef={track(`group:${group.id}:remove`)}
              onClick={() => removeWholeGroup(group)}
            />
          </span>
        </div>
        {isFolded ? (
          lands ? (
            line
          ) : null
        ) : (
          <>
            {group.rules.length === 0 ? (
              <p className="rule-list-empty">
                Pusta grupa — przepuszcza dalej.
              </p>
            ) : null}
            <ol className="rule-list-rules">
              {rows}
              {lands && lineAt === undefined ? (
                <li className="drop-line" aria-hidden="true">
                  tu wyląduje
                </li>
              ) : null}
            </ol>
            <div className="rule-list-actions">
              <ReactButton
                text="+ reguła"
                disabled={!canAddRule}
                buttonRef={track(`group:${group.id}:add`)}
                onClick={() => add(group)}
              />
            </div>
          </>
        )}
      </section>
    );
  }

  const groupLine = landing?.kind === "group" ? landing.beforeId : undefined;
  const groupLanding = landing?.kind === "group";
  const children = program.groups.flatMap((group, index) => [
    groupLanding && groupLine === group.id ? (
      <div key={`line-${group.id}`}>{line}</div>
    ) : null,
    renderGroup(group, index),
  ]);

  return (
    <div
      className="rule-list"
      ref={root}
      onDragLeave={leave}
      onDragEnd={clearDrag}
    >
      <div className="rule-list-top">
        <h3 className="rule-list-heading">sprawdzane od góry</h3>
        {program.groups.length > 1 ? (
          <ReactButton
            text={allFolded ? "rozwiń wszystkie" : "zwiń wszystkie"}
            onClick={() =>
              onFoldedChange(
                allFolded ? [] : program.groups.map((group) => group.id),
              )
            }
          />
        ) : null}
      </div>
      {children}
      {groupLanding && groupLine === undefined ? <div>{line}</div> : null}
      <div className="rule-list-actions">
        <ReactButton
          text="+ dodaj grupę"
          buttonRef={track("add-group")}
          onClick={addWholeGroup}
        />
      </div>
    </div>
  );
}

/**
 * Builds the list in an element of its own, for the page to place. The render is synchronous, so the
 * list stands in the element when this returns. Each list is a new root: nothing it holds outlives
 * `dispose()`.
 */
export function createRuleList(options: RuleListOptions): RuleList {
  const element = document.createElement("div");
  element.className = "rule-list-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: RuleListProps): void {
    flushSync(() => {
      root.render(
        <RuleListView
          {...props}
          onCommit={options.onCommit}
          onOpen={options.onOpen}
          onFoldedChange={options.onFoldedChange}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: RuleListProps): void {
      if (!disposed) draw(props);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
