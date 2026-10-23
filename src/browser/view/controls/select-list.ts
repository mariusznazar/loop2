/**
 * The shared select list (D-44): a `<select>` that `styles.css` draws from its class. A list with
 * no positions is its empty state; it has no error state, because it offers only valid positions.
 * Nothing here runs when the module is imported.
 */

/** A position of a select list: the value the screen reads and the text the player sees. */
export type SelectOption = readonly [value: string, text: string];

/** A select list named `label` for assistive technology, holding `options` in their order. */
export function createSelectList(
  label: string,
  options: readonly SelectOption[] = [],
): HTMLSelectElement {
  const element = document.createElement("select");
  element.className = "select-list";
  element.setAttribute("aria-label", label);
  setSelectOptions(element, options);
  return element;
}

/** Replaces the positions of a select list with `options`, in their order. */
export function setSelectOptions(
  element: HTMLSelectElement,
  options: readonly SelectOption[],
): void {
  element.replaceChildren(
    ...options.map(([value, text]) => new Option(text, value)),
  );
}
