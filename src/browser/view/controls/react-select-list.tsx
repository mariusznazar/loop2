/**
 * The shared select list in its React form (D-44, D-265): the `<select>` that `select-list.ts`
 * builds, with the same class, attribute and positions, so `styles.css` stays the one place of the
 * look; `tests/view/react-controls.test.mjs` keeps the two forms alike. The list is controlled by
 * the screen that holds its value. Nothing here runs when the module is imported.
 */
import type { ChangeEventHandler, Ref } from "react";
import type { SelectOption } from "./select-list.js";

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
