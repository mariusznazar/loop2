/**
 * The shared select list, a React component (D-44, D-265): a `<select>` with its class, its
 * accessible name and its positions, which `styles.css` reads, so the stylesheet stays the one
 * place of the look; `tests/view/shared-controls.test.mjs` holds it. The list is controlled by the
 * screen that holds its value. Nothing here runs when the module is imported.
 */
import type { ChangeEventHandler, Ref } from "react";

/** A position of a select list: the value the screen reads and the text the player sees. */
export type SelectOption = readonly [value: string, text: string];

export type ReactSelectListProps = {
  /** The list's name for assistive technology. */
  label: string;
  /** The positions, in their order; left out, the list is empty. */
  options?: readonly SelectOption[];
  /** The value of the position shown; the screen that holds it changes it in `onChange`. */
  value?: string;
  /** Locks the list. */
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  /** The list's element, for the screen that moves focus to it. */
  selectRef?: Ref<HTMLSelectElement>;
};

/** A select list of the shared look, holding `options` in their order. */
export function ReactSelectList({
  label,
  options = [],
  value,
  disabled,
  onChange,
  selectRef,
}: ReactSelectListProps) {
  return (
    <select
      ref={selectRef}
      className="select-list"
      aria-label={label}
      value={value}
      disabled={disabled}
      onChange={onChange}
    >
      {options.map(([optionValue, text]) => (
        <option key={optionValue} value={optionValue}>
          {text}
        </option>
      ))}
    </select>
  );
}
