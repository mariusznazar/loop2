/**
 * The pick cell (D-265, D-288, D-289, D-291): one position of a pick in the rule panel, drawn as a
 * button of its group. Its name, an optional icon of an action and, when greyed, the reason it may
 * not be picked. A greyed cell is `aria-disabled`, never `disabled`, so the keyboard reaches it and
 * reads the reason, and no click on it reaches a handler. `styles.css` draws it from the classes
 * this module sets, as it draws the button. Nothing here runs when the module is imported.
 */
import { setButtonSelected } from "./button.js";

export type PickCellOptions = {
  /** The cell's name, such as „Kopnij”. */
  text: string;
  /** File name in `assets/icons` of the action's icon, without the extension; left out, no icon. */
  icon?: string;
  /** The cell is the one chosen in its group. */
  chosen?: boolean;
  /** The cell may not be picked now. */
  greyed?: boolean;
  /** Why the cell is greyed, drawn inside it; null leaves the reason out. */
  reason?: string | null;
  /** Called on a click of a cell that may be picked; a greyed cell never calls it. */
  onPick?: () => void;
};

/** The icon of an action, drawn as a mask in the colour of the text beside it (D-291, D-43). */
function iconElement(file: string): HTMLSpanElement {
  const icon = document.createElement("span");
  icon.className = "action-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.style.setProperty("--icon", `url("/icons/${file}.svg")`);
  return icon;
}

/** A pick cell of the given options: a button of a group, selected when chosen. */
export function createPickCell(options: PickCellOptions): HTMLButtonElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "button pick-cell";
  setButtonSelected(element, options.chosen ?? false);
  const greyed = options.greyed ?? false;
  if (greyed) {
    element.classList.add("greyed");
    element.setAttribute("aria-disabled", "true");
  }
  if (options.icon !== undefined) element.append(iconElement(options.icon));
  element.append(options.text);
  if (greyed && options.reason) {
    const reason = document.createElement("span");
    reason.className = "pick-cell-reason";
    reason.textContent = options.reason;
    element.append(reason);
  }
  if (!greyed && options.onPick) {
    const onPick = options.onPick;
    element.addEventListener("click", () => onPick());
  }
  return element;
}

/** Marks a cell of a group as the one chosen in it, or unmarks it, in place, as a button is. */
export function setPickCellChosen(
  element: HTMLButtonElement,
  chosen: boolean,
): void {
  setButtonSelected(element, chosen);
}
