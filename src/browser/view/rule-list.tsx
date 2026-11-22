/**
 * The list of a program's rule groups and rules in React (D-288, D-292, D-293, D-295, D-297). It
 * draws under the heading „sprawdzane od góry” the groups, each with a header and its rules, each
 * rule as a row read as a sentence, and it never writes the game state: each edit is a whole new
 * program handed to `onCommit`, which the page puts into the game, and a click on a row or a
 * header, or a rule just added, is a request to open the panel, handed to `onOpen`. Which groups are
 * folded comes in the props and a change goes out through `onFoldedChange`, so the list holds no
 * memory of its own about it (D-295). Rules move by „↑” and „↓”, across the border of a group too,
 * whole groups by „↑” and „↓” in their header (D-288), and rules and whole groups by their handle on
 * the browser's own drag (D-270), a drop line showing where they would land; the drag is the Hook of
 * `rule-drag.ts`. The program panel draws it as
 * `RuleListView` in its own tree. Nothing runs when the module is imported.
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
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type {
  CSSProperties,
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
import { namesItem } from "./item-target-pick.js";
import {
  actionTime,
  addGroup,
  addRule,
  countText,
  groupArrows,
  groupNumber,
  groupSummary,
  moveGroup,
  moveRule,
  removeGroup,
  removeRule,
  ruleArrows,
  ruleNumber,
  ruleSentence,
} from "./program-editor.js";
import { useRuleDrag } from "./rule-drag.js";
import type { RuleDrag } from "./rule-drag.js";

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

/** „1 reguła”, „2 reguły”, „5 reguł”: the number of a group's rules in the player's words. */
function ruleCountText(count: number): string {
  const last = count % 10;
  const tens = count % 100;
  if (count === 1) return "1 reguła";
  if (last >= 2 && last <= 4 && (tens < 12 || tens > 14))
    return `${count} reguły`;
  return `${count} reguł`;
}

/** The control that recovers focus after „Usuń” removes a rule. */
type FocusTarget =
  | { groupId: GroupId; row: number; control: "remove" }
  | { groupId: GroupId; control: "add" };

/**
 * Where focus goes after „Usuń” of the rule at `index`, given the rule count after it: the „Usuń” of
 * the row now at that position, or „Dodaj regułę” when there is none.
 */
function focusAfterRemove(
  groupId: GroupId,
  index: number,
  ruleCount: number,
): FocusTarget {
  return index < ruleCount
    ? { groupId, row: index, control: "remove" }
    : { groupId, control: "add" };
}

/** The control keys a focus may go to after `focusAfterRemove`, in the order tried. */
function keysOf(target: FocusTarget, program: Program): string[] {
  if (target.control === "add") return [`group:${target.groupId}:add`];
  const moved = program.groups.find((group) => group.id === target.groupId)
    ?.rules[target.row];
  return moved === undefined
    ? [`group:${target.groupId}:add`, `group:${target.groupId}:open`]
    : [`rule:${moved.id}:remove`, `group:${target.groupId}:open`];
}

/** Whether a key press on a row or a header itself, not on a button inside it, asks to open. */
function asksToOpen(event: KeyboardEvent<HTMLElement>): boolean {
  return (
    event.target === event.currentTarget &&
    (event.key === "Enter" || event.key === " ")
  );
}

/**
 * Whether a click reached the row or header itself or its text, its handle included, not a button in
 * it. A drag by the handle gives no click, so a click on the handle opens as the text does (D-306, D-296).
 */
function clickedBody(event: MouseEvent<HTMLElement>): boolean {
  return !(event.target instanceof Element && event.target.closest("button"));
}

/**
 * Whether a click reached the bare row or header, outside its text and its gaps, which ask for
 * themselves.
 */
function clickedBare(event: MouseEvent<HTMLElement>): boolean {
  return (
    clickedBody(event) &&
    !(
      event.target instanceof Element &&
      event.target.closest(".rule-list-body, .rule-list-gap")
    )
  );
}

/**
 * The text of a row or a header, its handle included, in an element of its own beside the buttons,
 * which a click on the text asks to open. The element takes the click itself, not the row that also
 * holds the buttons, because Chromium's touch adjustment gives a tap that lands near a button to that
 * button unless an element that takes clicks and holds no button lies under the finger, so a tap on
 * the text beside the buttons of the phone layout opens the rule and moves or deletes nothing
 * (D-396, D-306, D-296). In the computer layout the stylesheet draws the element as if its parts stood
 * in the row itself (`display: contents`); in the phone layout it is a box over the whole line of the
 * text, to its right end.
 */
function RowText({
  onOpen,
  children,
}: {
  onOpen: () => void;
  children: ReactNode;
}) {
  return (
    <span
      className="rule-list-body"
      onClick={(event) => {
        if (clickedBody(event)) onOpen();
      }}
    >
      {children}
    </span>
  );
}

/**
 * An empty element among the buttons of a row or a header that a click asks to open, for the same
 * reason as the text (`RowText`): a gap before the arrows and between two buttons, and the spacer
 * between the arrows and the other buttons, so that in the phone layout no part of the line of the
 * buttons outside a button is bare row, which Chromium's touch adjustment passes over for a near
 * button. The stylesheet draws none of them in the computer layout.
 */
function Gap({
  onOpen,
  spacer = false,
}: {
  onOpen: () => void;
  spacer?: boolean;
}) {
  return (
    <span
      className={spacer ? "rule-list-gap rule-list-spacer" : "rule-list-gap"}
      aria-hidden="true"
      onClick={onOpen}
    />
  );
}

/** The edits a row, a header or a group's actions ask of the list. */
type ListEdits = {
  move: (group: RuleGroup, index: number, offset: -1 | 1) => void;
  moveGroup: (index: number, offset: -1 | 1) => void;
  remove: (group: RuleGroup, index: number) => void;
  add: (group: RuleGroup) => void;
  toggleFold: (id: GroupId) => void;
  removeWholeGroup: (group: RuleGroup) => void;
};

/**
 * What the rows and the groups of one drawing of the list share: the props the page gave, the drag,
 * the references of the focus and of the rule panel, and the edits. It is made again at each
 * drawing, so a row reads the current program and never a stale one.
 */
type ListParts = {
  state: GameState;
  program: Program;
  counts: GameState["ruleCounts"];
  folded: readonly GroupId[];
  open: RuleListProps["open"];
  panel: ReactNode;
  signs: RuleSigns | null;
  drag: RuleDrag;
  /** The ref of a control the focus may need to reach, kept under its key while it stands. */
  track: (key: string) => (element: HTMLElement | null) => void;
  /** The ref of the place the one rule panel is moved to. */
  seatPanel: (place: HTMLElement | null) => void;
  onOpen: RuleListHandlers["onOpen"];
  edits: ListEdits;
};

/** The drop line, drawn where the drag in hand would land. */
function DropLine() {
  return (
    <div className="drop-line" aria-hidden="true">
      tu wyląduje
    </div>
  );
}

type RowProps = {
  parts: ListParts;
  group: RuleGroup;
  groupIndex: number;
  index: number;
  /** Whether the open panel stands under this row. */
  panelHere: boolean;
};

/** The row of a rule and, where the open panel stands under it, the item that holds the panel. */
function RuleRow({ parts, group, groupIndex, index, panelHere }: RowProps) {
  const { state, program, counts, open, signs, drag, track, onOpen, edits } =
    parts;
  const each = group.rules[index];
  const sentence = ruleSentence(each);
  // The time of an action whose target gives it is that of the target, and no price stands in the row.
  const time = actionTime(
    state,
    each.action.kind,
    namesItem(each.action) ? each.action.item : undefined,
  );
  const arrows = ruleArrows(program, group.id, index);
  const isOpen = open?.groupId === group.id && open.ruleId === each.id;
  const openRule = () => onOpen({ groupId: group.id, ruleId: each.id });
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
  return (
    <>
      <li
        className={`rule-list-row${isOpen ? " open" : ""}${standing}${
          judged === undefined ? "" : ` bar-${judged.bar}`
        }`}
        data-rule={each.id}
        tabIndex={0}
        aria-current={isOpen ? "true" : undefined}
        ref={track(`rule:${each.id}:open`)}
        onClick={(event) => {
          if (clickedBare(event)) openRule();
        }}
        onKeyDown={(event) => {
          if (!asksToOpen(event)) return;
          event.preventDefault();
          openRule();
        }}
        onDragOver={(event) => drag.dragOver(event, target)}
        onDrop={(event) => drag.drop(event, target)}
      >
        <RowText onOpen={openRule}>
          <span
            className="drag-handle"
            draggable
            aria-hidden="true"
            title="Przeciągnij regułę"
            onDragStart={(event) =>
              drag.startDrag(
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
            <span className="rule-count">
              {countText(counts[each.id] ?? 0)}
            </span>
          )}
        </RowText>
        <span className="rule-list-controls">
          <Gap onOpen={openRule} />
          <span className="rule-list-arrows">
            <ReactButton
              text="↑"
              label="W górę"
              disabled={!arrows.up}
              buttonRef={track(`rule:${each.id}:up`)}
              onClick={() => edits.move(group, index, -1)}
            />
            <Gap onOpen={openRule} />
            <ReactButton
              text="↓"
              label="W dół"
              disabled={!arrows.down}
              buttonRef={track(`rule:${each.id}:down`)}
              onClick={() => edits.move(group, index, 1)}
            />
          </span>
          <Gap onOpen={openRule} spacer />
          <ReactButton
            text="Usuń"
            kind="destructive"
            buttonRef={track(`rule:${each.id}:remove`)}
            onClick={() => edits.remove(group, index)}
          />
        </span>
      </li>
      {panelHere ? (
        // Not an item of the list of rules to assistive technology: the rules are counted without it.
        <li
          className="rule-list-panel"
          role="presentation"
          ref={parts.seatPanel}
        />
      ) : null}
    </>
  );
}

type GroupProps = {
  parts: ListParts;
  group: RuleGroup;
  groupIndex: number;
};

/**
 * The header of a group: its handle, name, condition and counts, the arrows that move the group one
 * place (D-288), and the buttons that fold and remove it.
 */
function GroupHeader({ parts, group, groupIndex }: GroupProps) {
  const { program, counts, folded, open, signs, drag, track, onOpen, edits } =
    parts;
  const summary = groupSummary(group, counts);
  const arrows = groupArrows(program, groupIndex);
  const isFolded = folded.includes(group.id);
  const isOpen = open?.groupId === group.id && open.ruleId === null;
  const openGroup = () => onOpen({ groupId: group.id, ruleId: null });
  const bar = signs?.judgement.groups[group.id];
  return (
    <div
      className={`rule-list-header${isOpen ? " open" : ""}${
        bar === undefined ? "" : ` bar-${bar}`
      }`}
      tabIndex={0}
      aria-current={isOpen ? "true" : undefined}
      ref={track(`group:${group.id}:open`)}
      onClick={(event) => {
        if (clickedBare(event)) openGroup();
      }}
      onKeyDown={(event) => {
        if (!asksToOpen(event)) return;
        event.preventDefault();
        openGroup();
      }}
    >
      <RowText onOpen={openGroup}>
        <span
          className="drag-handle"
          draggable
          aria-hidden="true"
          title="Przeciągnij grupę"
          onDragStart={(event) =>
            drag.startDrag(
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
          <span className="rule-list-count">{countText(summary.executed)}</span>
        )}
      </RowText>
      <span className="rule-list-controls">
        <Gap onOpen={openGroup} />
        <span className="rule-list-arrows">
          <ReactButton
            text="↑"
            label="Grupa w górę"
            disabled={!arrows.up}
            buttonRef={track(`group:${group.id}:up`)}
            onClick={() => edits.moveGroup(groupIndex, -1)}
          />
          <Gap onOpen={openGroup} />
          <ReactButton
            text="↓"
            label="Grupa w dół"
            disabled={!arrows.down}
            buttonRef={track(`group:${group.id}:down`)}
            onClick={() => edits.moveGroup(groupIndex, 1)}
          />
        </span>
        <Gap onOpen={openGroup} spacer />
        <ReactButton
          text={isFolded ? "▸" : "▾"}
          label={isFolded ? "Rozwiń grupę" : "Zwiń grupę"}
          expanded={!isFolded}
          onClick={() => edits.toggleFold(group.id)}
        />
        <Gap onOpen={openGroup} />
        <ReactButton
          text="✕"
          label="Usuń grupę"
          kind="destructive"
          buttonRef={track(`group:${group.id}:remove`)}
          onClick={() => edits.removeWholeGroup(group)}
        />
      </span>
    </div>
  );
}

/** One group: its header, the place of the panel where it stands here, its rules and its „+ reguła”. */
function GroupSection({ parts, group, groupIndex }: GroupProps) {
  const { folded, open, panel, drag, track, seatPanel, edits } = parts;
  const { landing } = drag;
  const isFolded = folded.includes(group.id);
  const target = { over: "group", group } as const;
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
    <RuleRow
      key={each.id}
      parts={parts}
      group={group}
      groupIndex={groupIndex}
      index={index}
      panelHere={panelUnderRow && open.ruleId === each.id}
    />,
  ]);
  return (
    <section
      className="rule-list-group"
      data-group={group.id}
      onDragOver={(event) => drag.dragOver(event, target)}
      onDrop={(event) => drag.drop(event, target)}
    >
      <GroupHeader parts={parts} group={group} groupIndex={groupIndex} />
      {panelOpenHere && !panelUnderRow ? (
        <div className="rule-list-panel" ref={seatPanel} />
      ) : null}
      {isFolded ? (
        lands ? (
          <DropLine />
        ) : null
      ) : (
        <>
          {group.rules.length === 0 ? (
            <p className="rule-list-empty">Pusta grupa — przepuszcza dalej.</p>
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
              onClick={() => edits.add(group)}
            />
          </div>
        </>
      )}
    </section>
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

  function commit(next: Program, focus: string[], move?: MoveHint): void {
    pendingFocus.current = focus;
    onCommit(next, move);
  }

  const drag = useRuleDrag({ program, root, panelHost, commit });

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

  function track(key: string): (element: HTMLElement | null) => void {
    return (element) => {
      if (element === null) controls.current.delete(key);
      else controls.current.set(key, element);
    };
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

  function moveGroupAt(index: number, offset: -1 | 1): void {
    const next = moveGroup(program, index, offset);
    if (next === null) return;
    const id = program.groups[index].id;
    const own = offset === 1 ? "down" : "up";
    const other = offset === 1 ? "up" : "down";
    commit(
      next,
      [`group:${id}:${own}`, `group:${id}:${other}`, `group:${id}:open`],
      { kind: "group", groupId: id },
    );
  }

  function remove(group: RuleGroup, index: number): void {
    const next = removeRule(program, group.id, index);
    if (next === null) return;
    const after =
      next.groups.find((each) => each.id === group.id)?.rules.length ?? 0;
    commit(next, keysOf(focusAfterRemove(group.id, index, after), next));
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

  const parts: ListParts = {
    state,
    program,
    counts,
    folded,
    open,
    panel,
    signs,
    drag,
    track,
    seatPanel,
    onOpen,
    edits: {
      move,
      moveGroup: moveGroupAt,
      remove,
      add,
      toggleFold,
      removeWholeGroup,
    },
  };

  // The panel is drawn where the open row or header stands, so only where that group is drawn.
  const panelSeated =
    panel !== null &&
    open !== null &&
    program.groups.some((group) => group.id === open.groupId);
  const groupLine =
    drag.landing?.kind === "group" ? drag.landing.beforeId : undefined;
  const groupLanding = drag.landing?.kind === "group";
  const children = program.groups.flatMap((group, index) => [
    groupLanding && groupLine === group.id ? (
      <div key={`line-${group.id}`}>
        <DropLine />
      </div>
    ) : null,
    <GroupSection
      key={group.id}
      parts={parts}
      group={group}
      groupIndex={index}
    />,
  ]);

  return (
    <div
      className="rule-list"
      ref={root}
      onDragLeave={drag.leave}
      onDragEnd={drag.clearDrag}
      onDragOver={drag.overPanel}
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
      {groupLanding && groupLine === undefined ? (
        <div>
          <DropLine />
        </div>
      ) : null}
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
