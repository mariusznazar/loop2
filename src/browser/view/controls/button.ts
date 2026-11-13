/**
 * The shared button (D-44): the button, the destructive button, the button selected in its group,
 * the secondary action, the tab, the main button outside a form and the button in `positive` are
 * one `<button>` of seven kinds,
 * which `styles.css` draws from the class this module sets. The button that sends a form has the
 * main look on top of its kind, which `styles.css` draws from its `type="submit"`; the kind `main`
 * gives the same look to a button that sends no form (D-274).
 * A button that sends a form to a server can wait for the answer (`setButtonWaiting`).
 * Nothing here runs when the module is imported.
 */

/**
 * „plain” — the button; „destructive” — neutral at rest, its text in `danger` under the pointer and
 * at the focus; „selected” — chosen in its group; „secondary” — an underlined text without a frame,
 * for an action that opens or leaves the state of a form and stands under it; „tab” — a button of a
 * group drawn as a tab, whose group sets which one is selected with `setButtonSelected`; „main” —
 * the main look of a button that sends no form, such as „Wejdź” at a character in the card of a
 * map, which stays of the type `button`; „positive” — the plain button with its text in `positive`
 * at rest and under the pointer, the look of „Odbierz” in the report on earning loops, which pays
 * the practice waiting.
 */
export type ButtonKind =
  | "plain"
  | "destructive"
  | "selected"
  | "secondary"
  | "tab"
  | "main"
  | "positive";

export type ButtonOptions = {
  kind?: ButtonKind;
  /** The accessible name, where the visible text alone does not say what the button does. */
  label?: string;
  /** Makes the button the one that submits its form; any other button never does. */
  submit?: boolean;
  /**
   * Given, the button opens and closes a block below it and says whether the block stands open;
   * left out, it says nothing of that.
   */
  expanded?: boolean;
};

/**
 * A button of the given kind showing `text`. Unless `submit` is set it never submits a form; the
 * screen adds its own click handler and, for a button whose text changes, updates `textContent`
 * in place so the button keeps focus.
 */
export function createButton(
  text: string,
  options: ButtonOptions = {},
): HTMLButtonElement {
  const element = document.createElement("button");
  element.type = options.submit ? "submit" : "button";
  element.className = "button";
  element.textContent = text;
  if (options.label) element.setAttribute("aria-label", options.label);
  if (options.kind === "destructive") element.classList.add("destructive");
  if (options.kind === "secondary") element.classList.add("secondary");
  if (options.kind === "tab") element.classList.add("tab");
  if (options.kind === "main") element.classList.add("main");
  if (options.kind === "positive") element.classList.add("positive");
  if (options.kind === "selected") setButtonSelected(element, true);
  if (options.expanded !== undefined)
    setButtonExpanded(element, options.expanded);
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

/**
 * Says whether the block a button opens and closes stands open, as `aria-expanded`; the state has
 * no look of its own, so the screen draws the block itself.
 */
export function setButtonExpanded(
  element: HTMLButtonElement,
  expanded: boolean,
): void {
  element.setAttribute("aria-expanded", String(expanded));
}

/** The text each waiting button showed before it began to wait. */
const restingText = new WeakMap<HTMLButtonElement, string>();

/**
 * Puts a button that sent a request to the server into the state of waiting for the answer: it is
 * disabled, so its text is drawn in `text-disabled`, and it shows `waitingText`, such as
 * „Logowanie…”. Given null, it returns the button to its own text and enables it; a button that
 * was not waiting is left as it is. The disabled button loses keyboard focus in the browser, so the
 * screen moves focus after the wait.
 */
export function setButtonWaiting(
  element: HTMLButtonElement,
  waitingText: string | null,
): void {
  if (waitingText !== null) {
    if (!restingText.has(element))
      restingText.set(element, element.textContent);
    element.textContent = waitingText;
    element.disabled = true;
    element.setAttribute("aria-busy", "true");
    return;
  }
  const resting = restingText.get(element);
  if (resting === undefined) return;
  restingText.delete(element);
  element.textContent = resting;
  element.disabled = false;
  element.removeAttribute("aria-busy");
}
