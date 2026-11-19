/**
 * The reset control of Programy as the page and the player left it (D-402): a memory of the page
 * outside React, made by the entry of Programy for each building of the screen (D-407), never of the
 * game state or of a save. Each change makes a new state object, so the screen draws the list anew
 * only when it changed. Nothing runs when the module is imported.
 */
import type { ResetView } from "./program-list.js";
import type { StateStore } from "./state-store.js";

/** The reset control's state as the entry holds it (D-402): waiting, the sentence of a failure, and the confirmation. */
export type ResetState = {
  readonly waiting: boolean;
  readonly sentence: string | null;
  readonly confirming: boolean;
};

export type ProgramResetOptions = {
  readonly store: Pick<StateStore, "halted">;
  /** Whether the account holds the previous-save privilege (D-400); where it does not, no reset control stands. */
  readonly previousSaveAllowed: boolean;
  /** The page's act of a confirmed „Zacznij od zera” (D-402); left out, the game shows no reset control. */
  readonly onReset: (() => void) | undefined;
  /** Whether the screen was taken down; an act that comes after it changes nothing. */
  readonly disposed: () => boolean;
  /** Called after each change of the state, so that the screen draws the list anew. */
  readonly onChange: () => void;
};

export type ProgramReset = {
  /** The state of the control; a new object after each change. */
  readonly state: () => ResetState;
  /** The control as the list draws it, or none where the page gives no reset (D-402). */
  readonly view: () => ResetView | null;
  /** What the page shows of the reset after its answer: the control waits, or a sentence of failure stands. */
  readonly set: (next: { waiting: boolean; sentence: string | null }) => void;
  /**
   * „Zacznij od zera” asks for its confirmation; the click changes nothing else, and nothing shows
   * where the control is not shown (D-402).
   */
  readonly ask: () => void;
  /** The confirmation's withdraw: it closes and changes nothing (D-402). */
  readonly withdraw: () => void;
  /**
   * The confirmed reset: the control waits, and the page is told once. The game sends no save and
   * no request for the reset of its own; the page makes the request and answers it through `set`.
   */
  readonly confirm: () => void;
  /** The player left Programy: the confirmation of the reset closes (D-402). */
  readonly leave: () => void;
};

/** Makes the memory of the reset control for one building of the screen Programy. */
export function createProgramReset(options: ProgramResetOptions): ProgramReset {
  const { store, onReset } = options;
  let state: ResetState = {
    waiting: false,
    sentence: null,
    confirming: false,
  };

  /** Changes the control's state and draws the list from it. */
  function setState(next: ResetState): void {
    state = next;
    options.onChange();
  }

  function view(): ResetView | null {
    if (!options.previousSaveAllowed || onReset === undefined) return null;
    return {
      control: state.waiting ? "waiting" : "rest",
      confirming: state.confirming,
      line: state.sentence,
    };
  }

  return {
    state: () => state,
    view,
    set(next) {
      if (options.disposed()) return;
      setState({
        waiting: next.waiting,
        sentence: next.sentence,
        confirming: state.confirming,
      });
    },
    ask() {
      if (store.halted() || options.disposed() || view() === null) return;
      if (state.waiting || state.confirming) return;
      setState({ ...state, confirming: true });
    },
    withdraw() {
      if (!state.confirming) return;
      setState({ ...state, confirming: false });
    },
    confirm() {
      if (store.halted() || options.disposed() || view() === null) return;
      if (!state.confirming || state.waiting) return;
      setState({ waiting: true, sentence: null, confirming: false });
      onReset?.();
    },
    leave() {
      if (state.confirming) setState({ ...state, confirming: false });
    },
  };
}
