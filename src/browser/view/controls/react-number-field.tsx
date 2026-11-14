/**
 * The shared number field in its React form (D-44, D-265): the field that `number-field.ts` builds,
 * with the same classes and attributes, so `styles.css` stays the one place of the look;
 * `tests/view/react-controls.test.mjs` keeps the two forms alike. It holds the text typed into it
 * while it has the focus, and takes a new value from its props only without the focus, so a screen
 * that redraws often leaves the typed text and the cursor in place. A number is committed on Enter
 * and on leaving the field, through the rule the screen that uses the field gives it (`rule`): the
 * field knows no rule of any screen, so a screen with a rule of its own adds none here (D-265).
 * Nothing here runs when the module is imported.
 */
import { useId, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent, Ref } from "react";
import type { ConditionNumber } from "../../sim/program.js";

/** What a rule makes of text that is a number it takes: the number to show, and whether to commit it. */
export type NumberReading = { value: number; commit: boolean };

/**
 * The rule of the numbers a field takes, given by the screen that uses the field. `text` is what was
 * typed and `held` the number the field shows without the focus. The rule returns the reading of the
 * text, or null where the text is no number the rule takes: nothing is committed, the field keeps
 * the text and reports it through `onReject`.
 */
export type NumberRule = (text: string, held: number) => NumberReading | null;

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
   * The rule of a committed number, from the screen. A reading with `commit` set calls `onCommit`
   * with its value; a reading without it commits nothing and the field shows its value. Text the
   * rule reads as null commits nothing, keeps the draft in the field and calls `onReject`.
   */
  rule: NumberRule;
  /** Called when the text left in the field is a text the rule reads as null, see `rule`. */
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

  // Commits what the rule reads of `text`, or rejects the text and keeps it in the field. Returns
  // the number the field then shows, or null where the text was rejected.
  function commit(text: string): number | null {
    typed.current = false;
    const reading = rule(text, value);
    if (reading === null) {
      onReject?.();
      return null;
    }
    if (reading.commit) onCommit?.(reading.value);
    return reading.value;
  }

  function handleFocus(): void {
    // A rejected text stays in the field across a focus; otherwise the draft is null here, so the
    // field shows the number it holds.
    setDraft((current) => current ?? String(value));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    typed.current = true;
    setDraft(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key !== "Enter" || !typed.current || draft === null) return;
    const shown = commit(draft);
    if (shown !== null) setDraft(String(shown));
  }

  function handleBlur(): void {
    // A rejected text stays in the field; it is reported only when the player typed it.
    if (draft !== null && rule(draft, value) === null) {
      if (typed.current) onReject?.();
      typed.current = false;
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
