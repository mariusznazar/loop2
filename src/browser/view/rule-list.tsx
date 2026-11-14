/**
 * The list of a program's rule groups and rules in React (D-288, D-292, D-293, D-295, D-297). It
 * draws under the heading „sprawdzane od góry” the groups, each with a header and its rules, each
 * rule as a row read as a sentence, and it never writes the game state: each edit is a whole new
 * program handed to `onCommit`, which the page puts into the game, and a click on a row or a
 * header, or a rule just added, is a request to open the panel, handed to `onOpen`. Which groups are
 * folded comes in the props and a change goes out through `onFoldedChange`, so the list holds no
 * memory of its own about it (D-295). Rules move by „↑” and „↓”, across the border of a group too,
 * and rules and whole groups by their handle on the browser's own drag (D-270), a drop line showing
 * where they would land. The program panel draws it as `RuleListView` in its own tree. Nothing runs
 * when the module is imported.
 *
 * Where the page hands it the rule panel (`panel`), the list draws it in place, under the row of the
 * rule it changes or under the header of the group it changes, so the player edits a rule where it
 * stands (D-288). The panel is one element that the list moves from place to place, never one built
 * again at each: a fold of the group of the open rule, or a move of the rule to another group, then
 * leaves the panel on the field the player chose and the focus where the player put it.
 *
 * Where the page gives it the signs of the copy of a map run (`signs`, from `ruleSigns` of the
 * simulation; D-308, D-309, D-310) a row stands on the background `rule-winning` when it wins now
 * and on `rule-running` when its action is being carried out and another rule wins, and every row
 * and header carries the bar of its condition and, in a row, the reason it cannot start.
 */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  DragEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ACTIONS } from "../sim/data/actions.js";
import type { RuleSigns } from "../sim/game.js";
import type { GameState, GroupId, Program, RuleGroup } from "../sim/types.js";
import type { MoveHint } from "./chronicle-entries.js";
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
  removeGroup,
  removeRule,
  ruleArrows,
  ruleNumber,
  ruleSentence,
  type FocusTarget,
} from "./program-editor.js";

/** What the page gives the list; every call of `update` gives it whole. */
export type RuleListProps = {
  /** The game state, for the time of an action. */
  state: GameState;
  /** The program shown: the saved program or the copy. */
  program: Program;
  /** The counts beside the rules, or null where the screen shows none (D-93). */
  counts: GameState["ruleCounts"];
  /** The groups folded to their header; the list keeps no memory of this (D-295). */
  folded: readonly GroupId[];
  /** The row or the header whose panel stands open; null where none does. */
  open: { groupId: GroupId; ruleId: number | null } | null;
  /**
   * The rule panel of the open row or header, for the list to draw in place (D-288): directly under
   * that row, or directly under the header of its group where the open rule is a group's own or sits
   * in a folded group, whose row is not drawn. It stands beside the row's item, never inside it, so a
   * click, a key or a drag in the panel reaches no handler of the row, and the panel is no drop
   * target: a rule dragged over it shows no drop line. Null or left out, the list draws none.
   */
  panel?: ReactNode;
  /**
   * What the rows and headers show of the condition of each rule and group: only for the copy of a
   * map run, otherwise null or left out.
   */
  signs?: RuleSigns | null;
};

/** The row, or with a null rule the header of the group, a click or an addition asks to open. */
export type RuleListTarget = { groupId: GroupId; ruleId: number | null };

export type RuleListHandlers = {
  /**
   * Called with the whole new program after each edit. An edit that moves a rule by „↑” or „↓” or a
   * rule or a group by a drop also hands which one the player moved, since the program alone cannot
   * tell it after a swap of two neighbours (the chronicle reads it); every other edit hands none.
   */
  onCommit: (program: Program, move?: MoveHint) => void;
  /** Called when the player asks to open the panel of a row or of a group's header. */
  onOpen: (target: RuleListTarget) => void;
  /** Called with the whole list of folded groups after a fold or an unfold. */
  onFoldedChange: (folded: GroupId[]) => void;
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

type RuleListViewProps = RuleListHandlers & RuleListProps;

/** The list of groups and rules, with the drag, the fold and the edits of its rows. */
export function RuleListView({
  state,
  program,
  counts,
  folded,
  open,
  panel = null,
  signs = null,
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
  // The element the one rule panel is drawn into, moved to the place of the open row or header. The
  // panel is mounted in it once, so its field and its focus outlive a change of place.
  const [panelHost] = useState(() => document.createElement("div"));
  const seatPanel = useCallback(
    (place: HTMLElement | null): void => {
      if (place !== null && panelHost.parentNode !== place)
        place.appendChild(panelHost);
    },
    [panelHost],
  );

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

  function commit(next: Program, focus: string[], move?: MoveHint): void {
    pendingFocus.current = focus;
    onCommit(next, move);
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
      what.kind === "rule"
        ? { kind: "rule", ruleId: what.id }
        : { kind: "group", groupId: what.id },
    );
  }

  function leave(event: DragEvent<HTMLElement>): void {
    const into = event.relatedTarget;
    if (into instanceof Element && root.current?.contains(into) === true)
      return;
    setLanding(null);
  }

  /** A drag over the panel: it is no drop target, so the line of a landing elsewhere goes. */
  function overPanel(event: DragEvent<HTMLElement>): void {
    if (event.target instanceof Element && panelHost.contains(event.target))
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
    commit(
      next,
      [
        `rule:${id}:${own}`,
        `rule:${id}:${other}`,
        `rule:${id}:open`,
        `group:${into?.id ?? group.id}:open`,
      ],
      { kind: "rule", ruleId: id },
    );
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

  /** The row of a rule and, where the open panel stands under it, the item that holds the panel. */
  function renderRule(
    group: RuleGroup,
    groupIndex: number,
    index: number,
    panelHere: boolean,
  ) {
    const each = group.rules[index];
    const sentence = ruleSentence(each);
    const time = actionTime(state, each.action.kind);
    const arrows = ruleArrows(program, group.id, index);
    const isOpen = open?.groupId === group.id && open.ruleId === each.id;
    const target = { over: "row", group, index } as const;
    const judged = signs?.judgement.rules[each.id];
    const standing =
      signs === null
        ? ""
        : signs.judgement.winner?.id === each.id
          ? " winning"
          : signs.running === each.id
            ? " running"
            : "";
    const row = (
      <li
        key={each.id}
        className={`rule-list-row${isOpen ? " open" : ""}${standing}${
          judged === undefined ? "" : ` bar-${judged.bar}`
        }`}
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
            className="icon-mask"
            aria-hidden="true"
            style={
              {
                "--icon": `url("/icons/${ACTIONS[each.action.kind].icon}.svg")`,
              } as CSSProperties
            }
          />
          {sentence.action}
        </span>
        {judged?.reason == null ? null : (
          <span className="rule-reason">{judged.reason}</span>
        )}
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
    return panelHere
      ? [
          row,
          // Not an item of the list of rules to assistive technology: the rules are counted without it.
          <li
            key={`panel-${each.id}`}
            className="rule-list-panel"
            role="presentation"
            ref={seatPanel}
          />,
        ]
      : [row];
  }

  function renderGroup(group: RuleGroup, groupIndex: number) {
    const summary = groupSummary(group, counts);
    const isFolded = folded.includes(group.id);
    const isOpen = open?.groupId === group.id && open.ruleId === null;
    const target = { over: "group", group } as const;
    const bar = signs?.judgement.groups[group.id];
    const lands = landing?.kind === "rule" && landing.groupId === group.id;
    const lineAt = lands ? landing.beforeId : undefined;
    // The panel stands under the open rule's row; under the header where the group's own is open, or
    // where the rule's row is not drawn because the group is folded.
    const panelOpenHere = panel !== null && open?.groupId === group.id;
    const panelUnderRow =
      panelOpenHere &&
      !isFolded &&
      group.rules.some((each) => each.id === open.ruleId);
    const rows = group.rules.flatMap((each, index) => [
      lands && lineAt === each.id ? (
        <li key={`line-${each.id}`} className="drop-line" aria-hidden="true">
          tu wyląduje
        </li>
      ) : null,
      ...renderRule(
        group,
        groupIndex,
        index,
        panelUnderRow && open.ruleId === each.id,
      ),
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
          className={`rule-list-header${isOpen ? " open" : ""}${
            bar === undefined ? "" : ` bar-${bar}`
          }`}
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
        {panelOpenHere && !panelUnderRow ? (
          <div className="rule-list-panel" ref={seatPanel} />
        ) : null}
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
                buttonRef={track(`group:${group.id}:add`)}
                onClick={() => add(group)}
              />
            </div>
          </>
        )}
      </section>
    );
  }

  // The panel is drawn where the open row or header stands, so only where that group is drawn.
  const panelSeated =
    panel !== null &&
    open !== null &&
    program.groups.some((group) => group.id === open.groupId);
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
      onDragOver={overPanel}
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
      {/* After the groups, so that the places they draw hold the host before the panel takes focus. */}
      {panelSeated ? createPortal(panel, panelHost) : null}
    </div>
  );
}
