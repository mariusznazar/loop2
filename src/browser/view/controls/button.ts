/**
 * The shared button (D-44): the button, the destructive button and the button selected in its
 * group are one `<button>` with three looks, which `styles.css` draws from the class this module
 * sets. Nothing here runs when the module is imported.
 */

/** „plain” — the button; „destructive” — its text in `danger`; „selected” — chosen in its group. */
export type ButtonKind = "plain" | "destructive" | "selected";

export type ButtonOptions = {
  kind?: ButtonKind;
  /** The accessible name, where the visible text alone does not say what the button does. */
  label?: string;
};

/**
 * A button of the given kind showing `text`. It never submits a form; the screen adds its own
 * click handler and, for a button whose text changes, updates `textContent` in place so the button
 * keeps focus.
 */
export function createButton(
  text: string,
  options: ButtonOptions = {},
): HTMLButtonElement {
  const element = document.createElement("button");
  element.type = "button";
  element.className = "button";
  element.textContent = text;
  if (options.label) element.setAttribute("aria-label", options.label);
  if (options.kind === "destructive") element.classList.add("destructive");
  if (options.kind === "selected") setButtonSelected(element, true);
  return element;
}

/**
 * Marks a button of a group as the one selected in it, or unmarks it; a group calls it for each of
 * its buttons, so each says to assistive technology whether it is the selected one.
 */
export function setButtonSelected(
  element: HTMLButtonElement,
  selected: boolean,
): void {
  element.classList.toggle("selected", selected);
  element.setAttribute("aria-pressed", String(selected));
}
