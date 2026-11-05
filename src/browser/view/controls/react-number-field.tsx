/**
 * The shared number field in its React form (D-44, D-265): the field that `number-field.ts` builds,
 * with the same classes and attributes, so `styles.css` stays the one place of the look;
 * `tests/view/react-controls.test.mjs` keeps the two forms alike. It holds the text typed into it
 * while it has the focus, and takes a new value from its props only without the focus, so a screen
 * that redraws often leaves the typed text and the cursor in place. A number is committed on Enter
 * and on leaving the field, through the rule `readNumberField` of `program-editor.ts` gives, or with
 * `rule="trip"` through the trip count rule of `trip-editor.ts` (D-181). Nothing here runs when the
 * module is imported.
 */
import { useId, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, Ref } from "react";
import type { ConditionNumber } from "../../sim/program.js";
import { readNumberField } from "../program-editor.js";
import { tripCount } from "../trip-editor.js";

export type ReactNumberFieldProps = {
  /** The field's name for assistive technology. */
  label: string;
  /** The range and the step of the number; the commit rule reads the same range. */
  number: ConditionNumber;
  /** The number the field shows while it has no focus. */
  value: number;
  /** The message under the field in the error state; null or left out, there is none. */
  error?: string | null;
  /** Locks the field. */
  disabled?: boolean;
  /**
   * The rule of a committed number. Left out, the range rule of `readNumberField`: `onCommit` is
   * called with the number when it differs from `value`. `"trip"`: the trip count rule (D-181), a
   * safe integer from 1 up. Text that is no such count commits nothing, keeps `value` and the
   * draft in the field, and calls `onReject`; a valid count calls `onCommit` every time it is
   * committed, also when it equals `value`, so the screen can clear its message.
   */
  rule?: "trip";
  /** Under the trip rule, called when the text left in the field is no valid count. */
  onReject?: () => void;
  /** Called with the committed number, see `rule`. */
  onCommit?: (committed: number) => void;
  /** The input's element, for the screen that moves focus to it. */
  inputRef?: Ref<HTMLInputElement>;
};

/** A number field of the shared look, showing `value` and taking the text typed into it. */
export function ReactNumberField({
  label,
  number,
  value,
  error,
  disabled,
  rule,
  onReject,
  onCommit,
  inputRef,
}: ReactNumberFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  // The text shown while the field has the focus, or while a rejected trip count stays in it; null
  // otherwise.
  const [draft, setDraft] = useState<string | null>(null);
  // Whether the text was typed in this focus: leaving the field without typing commits nothing,
  // as the change event of the DOM form does.
  const typed = useRef(false);
  const failed = error !== undefined && error !== null;

  function commit(text: string): number {
    const result = readNumberField(text, value, number);
    typed.current = false;
    if (result.commit) onCommit?.(result.value);
    return result.value;
  }

  // Under the trip rule: commits a valid count, or rejects the text and keeps it in the field.
  // Returns the count committed, or null where the text was rejected.
  function commitTrip(text: string): number | null {
    typed.current = false;
    const count = tripCount(text);
    if (count === null) {
      onReject?.();
      return null;
    }
    onCommit?.(count);
    return count;
  }

  function handleFocus(): void {
    // A rejected trip count stays in the field across a focus; under the range rule the draft is
    // always null here, so the field shows the number it holds.
    setDraft((current) => current ?? String(value));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    typed.current = true;
    setDraft(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== "Enter" || !typed.current || draft === null) return;
    if (rule === "trip") {
      const count = commitTrip(draft);
      if (count !== null) setDraft(String(count));
      return;
    }
    setDraft(String(commit(draft)));
  }

  function handleBlur(): void {
    if (rule === "trip") {
      // A rejected text stays in the field; it is reported only when the player typed it.
      if (draft !== null && tripCount(draft) === null) {
        if (typed.current) onReject?.();
        typed.current = false;
        return;
      }
      if (typed.current && draft !== null) commitTrip(draft);
      setDraft(null);
      return;
    }
    if (typed.current && draft !== null) commit(draft);
    setDraft(null);
  }

  return (
    <span className={failed ? "input-field error" : "input-field"}>
      <input
        ref={inputRef}
        type="number"
        aria-label={label}
        min={number.min}
        max={number.max}
        step={number.step}
        aria-invalid={failed ? "true" : undefined}
        aria-describedby={failed ? messageId : undefined}
        disabled={disabled}
        value={draft ?? String(value)}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <span className="input-field-message" id={messageId} hidden={!failed}>
        {failed ? error : ""}
      </span>
    </span>
  );
}
