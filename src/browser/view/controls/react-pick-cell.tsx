/**
 * The pick cell, a React component (D-265). The classes and attributes it draws are what
 * `styles.css` reads, so the stylesheet stays the one place of the look;
 * `tests/view/shared-controls.test.mjs` holds its states and its click. Nothing here runs when the
 * module is imported.
 */
import type { CSSProperties, MouseEventHandler } from "react";

export type ReactPickCellProps = {
  /** The cell's name, such as „Kopnij”. */
  text: string;
  /** File name in `assets/icons` of the action's icon, without the extension; left out, no icon. */
  icon?: string;
  /** The cell is the one chosen in its group. */
  chosen?: boolean;
  /** The cell may not be picked now. */
  greyed?: boolean;
  /** Why the cell is greyed, drawn inside it; null or left out, no reason. */
  reason?: string | null;
  /** Called on a click of a cell that may be picked; a greyed cell never calls it. */
  onPick?: MouseEventHandler<HTMLButtonElement>;
  /** The cell's place in the order of Tab; left out, the button sets none. The rule panel sets it. */
  tabIndex?: number;
};

/** A pick cell of the rule panel: a button of its group, selected when chosen, greyed when not picked. */
export function ReactPickCell({
  text,
  icon,
  chosen = false,
  greyed = false,
  reason,
  onPick,
  tabIndex,
}: ReactPickCellProps) {
  return (
    <button
      type="button"
      className={[
        "button",
        "pick-cell",
        chosen ? "selected" : undefined,
        greyed ? "greyed" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={chosen}
      aria-disabled={greyed ? "true" : undefined}
      onClick={greyed ? undefined : onPick}
      tabIndex={tabIndex}
    >
      {icon !== undefined ? (
        <span
          className="icon-mask"
          aria-hidden="true"
          style={{ "--icon": `url("/icons/${icon}.svg")` } as CSSProperties}
        />
      ) : null}
      {text}
      {greyed && reason ? (
        <span className="pick-cell-reason">{reason}</span>
      ) : null}
    </button>
  );
}
