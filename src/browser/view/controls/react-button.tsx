/**
 * The shared button in its React form (D-44). It draws
 * the element its DOM form in `button.ts` draws, with the same classes and
 * attributes, so `styles.css` stays the one place of the look; `tests/view/react-controls.test.mjs`
 * keeps the two forms alike. Nothing here runs when the module is imported.
 */
import type { MouseEventHandler, Ref } from "react";

/** „secondary” — the secondary action; „tab” — a button of a group drawn as a tab. */
export type ReactButtonKind = "secondary" | "tab";

export type ReactButtonProps = {
  text: string;
  /** Left out, the button is the plain one or, given `selected`, the one selected in its group. */
  kind?: ReactButtonKind;
  /** The accessible name, where the visible text alone does not say what the button does. */
  label?: string;
  /** Makes the button the one that submits its form; any other button never does. */
  submit?: boolean;
  /**
   * Given, the button is one of a group and says whether it is the selected one; left out, it
   * belongs to no group and says nothing of selection.
   */
  selected?: boolean;
  /**
   * Given text, the button waits for the server: it shows this text, is disabled and says it is
   * busy, as `setButtonWaiting` does. Given null or left out, it shows `text`.
   */
  waitingText?: string | null;
  /** Locks the button with its text kept, while the screen around it waits for the server. */
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** The button's element, for the screen that moves focus to it. */
  buttonRef?: Ref<HTMLButtonElement>;
};

/** A button of the shared look: plain, secondary, selected in its group or a tab of it. */
export function ReactButton({
  text,
  kind,
  label,
  submit,
  selected,
  waitingText,
  disabled,
  onClick,
  buttonRef,
}: ReactButtonProps) {
  const waiting = waitingText !== undefined && waitingText !== null;
  return (
    <button
      ref={buttonRef}
      type={submit ? "submit" : "button"}
      className={["button", kind, selected ? "selected" : undefined]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      aria-pressed={selected === undefined ? undefined : selected}
      aria-busy={waiting ? "true" : undefined}
      disabled={waiting || disabled}
      onClick={onClick}
    >
      {waiting ? waitingText : text}
    </button>
  );
}
