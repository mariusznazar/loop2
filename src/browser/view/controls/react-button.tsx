/**
 * The shared button and the two sentences under a form, in their React form (D-44). Each draws
 * the element its DOM form in `button.ts` and `text-field.ts` draws, with the same classes and
 * attributes, so `styles.css` stays the one place of the look; `tests/view/react-controls.test.mjs`
 * keeps the two forms alike. Nothing here runs when the module is imported.
 */
import type { MouseEventHandler, Ref } from "react";

export type ReactButtonProps = {
  text: string;
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** The button's element, for the screen that moves focus to it. */
  buttonRef?: Ref<HTMLButtonElement>;
};

/** A button of the shared look: plain, or selected in its group. */
export function ReactButton({
  text,
  label,
  submit,
  selected,
  waitingText,
  onClick,
  buttonRef,
}: ReactButtonProps) {
  const waiting = waitingText !== undefined && waitingText !== null;
  return (
    <button
      ref={buttonRef}
      type={submit ? "submit" : "button"}
      className={selected ? "button selected" : "button"}
      aria-label={label}
      aria-pressed={selected === undefined ? undefined : selected}
      aria-busy={waiting ? "true" : undefined}
      disabled={waiting}
      onClick={onClick}
    >
      {waiting ? waitingText : text}
    </button>
  );
}

export type ReactFormSentenceProps = {
  /** The sentence to show; the element stays, hidden, while there is none. */
  sentence: string | null;
};

/**
 * The one sentence under a form that tells of a server refusal or a lost connection, announced to
 * assistive technology when it appears.
 */
export function ReactFormWarning({ sentence }: ReactFormSentenceProps) {
  return (
    <p className="form-warning" role="alert" hidden={sentence === null}>
      {sentence ?? ""}
    </p>
  );
}

/** The one sentence under a form that tells of an answer which refuses nothing. */
export function ReactFormNote({ sentence }: ReactFormSentenceProps) {
  return (
    <p className="form-note" role="status" hidden={sentence === null}>
      {sentence ?? ""}
    </p>
  );
}
