/**
 * What makes the rule panel a window of a rule or of a rule group (D-288, D-296, D-306, D-44): the
 * heading that names the rule or the group with the name of its group, the sentence of what the
 * condition of a group does, the bar of the phone layout with „↑”, „↓” and the deletion, and the Hook
 * that keeps the rows the window lies over out of the reach of the keyboard and the mouse while it
 * stands. The window stands directly under the row or the header that opened it and lies over the
 * rows below (`program-panel.css`); the rows above it and below its lower edge stay as they are. The
 * rule panel (`rule-panel.tsx`) draws these parts. Nothing runs when the module is imported.
 */
import { type RefObject, useLayoutEffect, useRef } from "react";
import type { GroupId, Program } from "../sim/types.js";
import type { MoveHint } from "./chronicle-entries.js";
import { ReactButton } from "./controls/react-button.js";
import {
  groupArrows,
  groupNumber,
  moveGroup,
  moveRule,
  removeGroup,
  removeRule,
  ruleArrows,
  ruleNumber,
} from "./program-editor.js";

/** The sentence the window of a group holds under the group's condition (D-23). */
export const GROUP_CONDITION_SENTENCE =
  "Gdy warunek grupy nie jest spełniony, program pomija wszystkie jej reguły.";

/**
 * The heading of the window: „Grupa {n} „{nazwa}”” for a group and „Reguła {n.m} w grupie
 * „{nazwa}”” for a rule, the place of a rule `ruleIndex` and null for the group's own window. The name
 * is the one the program holds; a name of spaces alone, or none, leaves the part with the name out.
 * Pure.
 */
export function ruleWindowHeading(
  groupIndex: number,
  groupName: string,
  ruleIndex: number | null,
): string {
  const named = groupName.trim() !== "";
  if (ruleIndex === null)
    return named
      ? `Grupa ${groupNumber(groupIndex)} „${groupName}”`
      : `Grupa ${groupNumber(groupIndex)}`;
  const number = ruleNumber(groupIndex, ruleIndex);
  return named
    ? `Reguła ${number} w grupie „${groupName}”`
    : `Reguła ${number}`;
}

/** The top and the bottom of a box as the page lays it out. */
type Span = { top: number; bottom: number };

/**
 * Whether a part of the list that stands after the window in the document lies under it: its box
 * meets the window's from the top to the bottom. A part that only touches an edge does not. Pure.
 */
export function liesUnder(window: Span, part: Span): boolean {
  return part.top < window.bottom && part.bottom > window.top;
}

/** The bit of `compareDocumentPosition` that says a node stands after the one asked (`Node.DOCUMENT_POSITION_FOLLOWING`). */
const FOLLOWING = 4;

/** The parts of the list a player reaches by the keyboard or the mouse, which the window may lie over. */
const REACHABLE =
  ".rule-list-row, .rule-list-header, .rule-list-actions, .rule-list-empty";

/**
 * Keeps the rows the window `own` lies over out of the reach of the keyboard and the mouse while it
 * stands (`inert`): each part of the rule list after the window in the document whose box lies under
 * the window's. Where the window reaches below the end of the list, the list grows to hold it, so
 * nothing outside the list stands under the window. It reads the boxes after every commit and
 * whenever the window changes its size, a change of the page's width among the causes, and gives
 * every part back its reach when the window goes. A page laid out by no browser gives every box at
 * zero, and then nothing lies under the window.
 */
export function useCoverBelow(own: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const window = own.current;
    const list = window?.closest<HTMLElement>(".rule-list");
    if (window == null || list == null) return;
    const lay = (): void => {
      list.style.minHeight = "";
      const box = window.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      if (box.bottom > listBox.bottom)
        list.style.minHeight = `${box.bottom - listBox.top}px`;
      for (const part of list.querySelectorAll<HTMLElement>(REACHABLE)) {
        const after = (window.compareDocumentPosition(part) & FOLLOWING) !== 0;
        part.toggleAttribute(
          "inert",
          after && liesUnder(box, part.getBoundingClientRect()),
        );
      }
    };
    lay();
    const Observer = list.ownerDocument.defaultView?.ResizeObserver;
    const observer = Observer === undefined ? null : new Observer(lay);
    // The window alone: the list changes its own size here, and a size this callback changes would
    // call it again in the same frame, which the browser reports as an error of a loop.
    observer?.observe(window);
    return () => {
      observer?.disconnect();
      list.style.minHeight = "";
      for (const part of list.querySelectorAll(REACHABLE))
        part.removeAttribute("inert");
    };
  });
}

/** What the bar of the window changes: the program shown and the rule or group the window is open on. */
type BarProps = {
  program: Program;
  groupId: GroupId;
  /** The rule the window is open on; null for the window of the group. */
  ruleId: number | null;
  /** The window's element, which the bar reads the rule list from to give the focus after a deletion. */
  own: RefObject<HTMLElement | null>;
  onCommit: (program: Program, move?: MoveHint) => void;
};

/**
 * The element of the list that takes the focus once the rule or the group the window was open on is
 * deleted (styleguide rule "Focus does not fall to the page"): the row now in the rule's place, else
 * the row before it, else the header of its group; for a group, the header of the group now in its
 * place, else of the group before it, else „+ dodaj grupę”.
 */
function focusAfterDeletion(
  list: Element,
  next: Program,
  groupId: GroupId,
  ruleAt: number,
  groupAt: number,
  rule: boolean,
): HTMLElement | null {
  const header = (id: GroupId | undefined) =>
    id === undefined
      ? null
      : list.querySelector<HTMLElement>(
          `[data-group="${id}"] .rule-list-header`,
        );
  if (rule) {
    const rules = next.groups.find((each) => each.id === groupId)?.rules ?? [];
    const near = rules[ruleAt] ?? rules[ruleAt - 1];
    return (
      (near === undefined
        ? null
        : list.querySelector<HTMLElement>(`[data-rule="${near.id}"]`)) ??
      header(groupId)
    );
  }
  const near = next.groups[groupAt] ?? next.groups[groupAt - 1];
  return (
    header(near?.id) ??
    list.querySelector<HTMLElement>(":scope > .rule-list-actions button")
  );
}

/**
 * The bar at the bottom of the window, which the stylesheet shows in the phone layout alone, apart
 * from „✕” in the window's heading by a line: „↑” and „↓”, which move the rule or the group one place
 * as the arrows of its row or header do (D-297, D-288), and the destructive „Usuń” of a rule or
 * „Usuń z regułami” of a group, which deletes it at once (D-303, D-44). An arrow keeps the focus, or
 * gives it to the other arrow where it is off now; a deletion closes the window and gives the focus to
 * the list (`focusAfterDeletion`).
 */
export function RuleWindowBar({
  program,
  groupId,
  ruleId,
  own,
  onCommit,
}: BarProps) {
  const up = useRef<HTMLButtonElement>(null);
  const down = useRef<HTMLButtonElement>(null);
  const groupAt = program.groups.findIndex((each) => each.id === groupId);
  const group = program.groups[groupAt];
  if (group === undefined) return null;
  const ruleAt =
    ruleId === null ? -1 : group.rules.findIndex((each) => each.id === ruleId);
  if (ruleId !== null && ruleAt < 0) return null;
  const isRule = ruleId !== null;
  const arrows = isRule
    ? ruleArrows(program, groupId, ruleAt)
    : groupArrows(program, groupAt);

  function move(offset: -1 | 1): void {
    const next = isRule
      ? moveRule(program, groupId, ruleAt, offset)
      : moveGroup(program, groupAt, offset);
    if (next === null) return;
    onCommit(
      next,
      ruleId !== null ? { kind: "rule", ruleId } : { kind: "group", groupId },
    );
    // The window may stand in another place now; the arrow pressed keeps the focus where it acts.
    const [pressed, other] = offset === -1 ? [up, down] : [down, up];
    (pressed.current?.disabled === false ? pressed : other).current?.focus();
  }

  function remove(): void {
    const list = own.current?.closest(".rule-list") ?? null;
    const next = isRule
      ? removeRule(program, groupId, ruleAt)
      : removeGroup(program, groupId);
    if (next === null) return;
    onCommit(next);
    if (list !== null)
      focusAfterDeletion(list, next, groupId, ruleAt, groupAt, isRule)?.focus();
  }

  return (
    <div className="rule-panel-bar">
      <span className="rule-panel-arrows">
        <ReactButton
          text="↑"
          label={isRule ? "W górę" : "Grupa w górę"}
          disabled={!arrows.up}
          buttonRef={up}
          onClick={() => move(-1)}
        />
        <ReactButton
          text="↓"
          label={isRule ? "W dół" : "Grupa w dół"}
          disabled={!arrows.down}
          buttonRef={down}
          onClick={() => move(1)}
        />
      </span>
      <ReactButton
        text={isRule ? "Usuń" : "Usuń z regułami"}
        kind="destructive"
        onClick={remove}
      />
    </div>
  );
}
