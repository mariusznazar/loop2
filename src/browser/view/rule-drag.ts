/**
 * The drag of program rules and rule groups on the browser's own drag (D-270), as a custom Hook of
 * the list of rules: the item in hand, the place where a drop would land and the handlers of the
 * drag's start, passage, drop and leaving. It never writes the game state: a drop hands the whole
 * new program to the `commit` the list gives it. Nothing runs when the module is imported.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { DragEvent, RefObject } from "react";
import type { GroupId, Program, RuleGroup } from "../sim/types.js";
import type { MoveHint } from "./chronicle-entries.js";
import { dropGroup, dropRule } from "./program-editor.js";

/** What is being dragged: a rule by its number or a whole group. */
type Dragged = { kind: "rule"; id: number } | { kind: "group"; id: GroupId };

/** Where a drop would land: in a group before a rule or at its end, or among the groups. */
export type Landing =
  | { kind: "rule"; groupId: GroupId; beforeId?: number }
  | { kind: "group"; beforeId?: GroupId };

/** What a drag event is handled on: a rule's row or a group's section. */
export type DropTarget =
  | { over: "row"; group: RuleGroup; index: number }
  | { over: "group"; group: RuleGroup };

/** What the list gives the Hook. */
type RuleDragInput = {
  /** The program shown, from which a drop makes the new one. */
  program: Program;
  /** The root element of the list, whose page the Hook listens on for a drag that ends unseen. */
  root: RefObject<HTMLElement | null>;
  /** The element the one rule panel is drawn into, which no drag is dropped on. */
  panelHost: HTMLElement;
  /** Puts the new program into the game, with the keys the focus goes to and the move made. */
  commit: (next: Program, focus: string[], move?: MoveHint) => void;
};

/** What the Hook gives the list: the landing to draw and the handlers of the drag. */
export type RuleDrag = {
  landing: Landing | null;
  startDrag: (
    event: DragEvent<HTMLElement>,
    what: Dragged,
    shown: Element | null,
  ) => void;
  dragOver: (event: DragEvent<HTMLElement>, target: DropTarget) => void;
  drop: (event: DragEvent<HTMLElement>, target: DropTarget) => void;
  leave: (event: DragEvent<HTMLElement>) => void;
  overPanel: (event: DragEvent<HTMLElement>) => void;
  clearDrag: () => void;
};

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

/** Where the drag in hand would land with the pointer at `event` over `target`, null where nowhere. */
function landingAt(
  program: Program,
  what: Dragged | null,
  event: DragEvent<HTMLElement>,
  target: DropTarget,
): Landing | null {
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

/** The controls the focus goes to once a drop is drawn, and the move the chronicle reads. */
function afterDrop(
  what: Dragged,
  at: Landing,
): { focus: string[]; move: MoveHint } {
  return what.kind === "rule"
    ? {
        focus: [
          `rule:${what.id}:open`,
          `group:${at.kind === "rule" ? at.groupId : 0}:open`,
        ],
        move: { kind: "rule", ruleId: what.id },
      }
    : {
        focus: [`group:${what.id}:open`],
        move: { kind: "group", groupId: what.id },
      };
}

/** The drag of the list: its landing state, the item in hand and the handlers of the drag. */
export function useRuleDrag({
  program,
  root,
  panelHost,
  commit,
}: RuleDragInput): RuleDrag {
  const [landing, setLanding] = useState<Landing | null>(null);
  const dragged = useRef<Dragged | null>(null);

  const clearDrag = useCallback((): void => {
    dragged.current = null;
    setLanding(null);
  }, []);

  // A drag that ends where no handler of the list sees it, a cancelled one or one whose source left
  // the page with the edit, still takes the drop line away.
  useEffect(() => {
    const page = root.current?.ownerDocument;
    if (page === undefined) return;
    page.addEventListener("dragend", clearDrag);
    page.addEventListener("drop", clearDrag);
    return () => {
      page.removeEventListener("dragend", clearDrag);
      page.removeEventListener("drop", clearDrag);
    };
  }, [root, clearDrag]);

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

  function dragOver(event: DragEvent<HTMLElement>, target: DropTarget): void {
    const what = dragged.current;
    if (what === null) return;
    // A row lets a dragged group's event through to its group, which places it among the groups.
    if (target.over === "row" && what.kind === "group") return;
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "move";
    const at = landingAt(program, what, event, target);
    const shown =
      at !== null && droppedProgram(program, what, at) !== null ? at : null;
    setLanding((previous) => (sameLanding(previous, shown) ? previous : shown));
  }

  function drop(event: DragEvent<HTMLElement>, target: DropTarget): void {
    const what = dragged.current;
    if (what === null) return;
    if (target.over === "row" && what.kind === "group") return;
    event.preventDefault();
    event.stopPropagation();
    const at = landingAt(program, what, event, target);
    clearDrag();
    const next = at === null ? null : droppedProgram(program, what, at);
    if (next === null || at === null) return;
    const after = afterDrop(what, at);
    commit(next, after.focus, after.move);
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

  return { landing, startDrag, dragOver, drop, leave, overPanel, clearDrag };
}
