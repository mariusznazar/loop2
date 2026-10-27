/**
 * The shared button (D-44): the button, the destructive button and the button selected in its
 * group are one `<button>` with three looks, which `styles.css` draws from the class this module
 * sets. A button that sends a form to a server can wait for the answer (`setButtonWaiting`).
 * Nothing here runs when the module is imported.
 */

/** „plain” — the button; „destructive” — its text in `danger`; „selected” — chosen in its group. */
export type ButtonKind = "plain" | "destructive" | "selected";

export type ButtonOptions = {
  kind?: ButtonKind;
  /** The accessible name, where the visible text alone does not say what the button does. */
  label?: string;
  /** Makes the button the one that submits its form; any other button never does. */
  submit?: boolean;
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
