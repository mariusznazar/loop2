/**
 * The state of the screen Przejście that the game view alone remembers, outside React (D-173, D-311,
 * D-322, D-324, D-368, D-371): the question „Zapisać, odrzucić, wrócić?”, the end-of-run window,
 * the window's wait for the scene's effect and the focus owed to a window opened before the game
 * stood in the page. All of it is a memory of the page, never of the game state or the save. The
 * module decides what stands; it calls no screen, no act of the store and no registry. What stands
 * is also read through `snapshot()`, a value that stays the same until the question or whether the
 * window is shown changes, and each such change calls the listeners of `subscribe()`, whichever
 * method or result made it (D-407). Nothing here runs when the module is imported.
 */
import { mapRunEnded } from "../sim/game.js";
import { copyHasUnsavedChanges } from "../sim/programs.js";
import type { MapId } from "../sim/types.js";
import { endEffectBegins } from "./scene-picture.js";
import type { StateStore, Taken } from "./state-store.js";

/**
 * The question of „Zakończ” or of „Otwarte: {mapa} →” (D-173): `resume` is whether „Wróć” sets the
 * map run going again, which is so when the question paused a map run that went on, and `opens` the
 * map „Otwarte: {mapa} →” asked it for, null where „Zakończ” did, since „Zapisz” and „Odrzuć” lead
 * where the button that asked leads.
 */
export type EndQuestion = {
  readonly resume: boolean;
  readonly opens: MapId | null;
};

export type RunScreenStateOptions = {
  /** What the state reads of the game: its state and whether `halt()` was called (D-323). */
  readonly game: Pick<StateStore, "get" | "halted">;
  /** Whether the system's setting asks for less motion, which leaves the scene's effects out (D-317). */
  reducedMotion(): boolean;
};

/** What stands on the screen Przejście: the question and whether the end-of-run window is shown. */
export type RunScreenSnapshot = {
  /** The question standing, or null. */
  readonly question: EndQuestion | null;
  /** Whether the end-of-run window stands over the screen, as `windowShown()` gives it. */
  readonly windowShown: boolean;
};

export type RunScreenState = {
  /** The question standing, or null. */
  question(): EndQuestion | null;
  /**
   * Whether the end-of-run window stands over the screen now: it is open, the scene's effect is not
   * awaited, the player is on the screen, no question stands and the state's map run has ended
   * (D-368, D-311).
   */
  windowShown(): boolean;
  /**
   * A result the store took. Where it ended the manual map run the window opens, and waits for the
   * scene's effect where the player is on the screen, the events carry one and the system's setting
   * leaves effects in; where no ended map run stands, the wait ends. The question goes where the copy
   * no longer holds unsaved changes (D-173, D-322).
   */
  taken(taken: Taken): void;
  /** The player comes onto the screen: the window opens where the map run has ended (D-368, D-371). */
  entered(): void;
  /**
   * The player leaves the screen: the question closes unless the game is halted, the wait for the
   * effect ends and the player is off the screen (D-324, D-283).
   */
  left(): void;
  /**
   * „Zakończ” or „Otwarte: {mapa} →” with unsaved changes: where the game is not halted and no
   * question stands, the question stands, the window closes and the wait ends. Returns the question
   * asked, null where none was (D-173).
   */
  ask(opens: MapId | null): EndQuestion | null;
  /** Closes a standing question unless the game is halted; returns whether it closed one (D-324). */
  closeQuestion(): boolean;
  /** The map run ends: the question goes, whether or not the game is halted. */
  forgetQuestion(): void;
  /**
   * „Koniec przejścia”: nothing after halt or without an ended map run; otherwise a standing question
   * closes as `closeQuestion()` closes it, the window opens and the wait ends. Returns whether a
   * question was closed, so that the entry tells the screen (D-311, D-324).
   */
  openWindow(): boolean;
  /** „✕” and Escape of the window: it closes and the wait ends; nothing after halt (D-368). */
  closeWindow(): void;
  /** The scene's effect has ended, or the scene was hidden while it ran; nothing after halt (D-322). */
  effectEnded(): void;
  /** The game stands in the game view: the focus is owed where the window shows (D-368). */
  built(): void;
  /**
   * Settles the focus owed to a window opened before the page placed the game: once the game is in
   * the page (`connected`), the first call that finds it owed ends the debt and says whether the
   * window shows, so that focus is to go to it.
   */
  takeOwedFocus(connected: boolean): boolean;
  /**
   * Calls `listener` after each change of the question or of whether the window is shown, whichever
   * method or result made it; a call that changes neither calls none. Returns the way to stop.
   */
  subscribe(listener: () => void): () => void;
  /**
   * What stands now: the same value until the question or whether the window is shown changes, so
   * that React can read it through `useSyncExternalStore`.
   */
  snapshot(): RunScreenSnapshot;
};

/** Makes the state of the screen of a map run of the game `options.game` holds. */
export function createRunScreenState(
  options: RunScreenStateOptions,
): RunScreenState {
  const { game } = options;
  let question: EndQuestion | null = null;
  /**
   * Whether the end-of-run window is open: it opens when a map run ends and at every entering of the
   * screen of an ended map run, it is open when the game is built on one, and it closes at „✕” and
   * Escape, when the question stands, and when the map run ends or starts again (D-368).
   */
  const first = game.get().run;
  let windowOpen = first !== null && mapRunEnded(first);
  /**
   * Whether the window waits for the scene's effect of the end that has just come: set at the game
   * minute of a death or a completion that the scene plays as an effect, and ended by the scene, by
   * the player's own opening or closing of the window and by any change of screen (D-322).
   */
  let effectPending = false;
  /** Whether the player is on the screen of the map run. */
  let onScreen = false;
  let focusOwed = false;

  /** Closes the question without telling the listeners; the public methods do that after it. */
  function closeQuestionNow(): boolean {
    if (game.halted() || question === null) return false;
    question = null;
    return true;
  }

  function windowShown(): boolean {
    const { run } = game.get();
    return (
      windowOpen &&
      !effectPending &&
      onScreen &&
      question === null &&
      run !== null &&
      mapRunEnded(run)
    );
  }

  const listeners = new Set<() => void>();
  let shown: RunScreenSnapshot = { question, windowShown: windowShown() };

  /** Holds `shown` to what stands now and calls the listeners where it has changed. */
  function settle(): void {
    const now = windowShown();
    if (question === shown.question && now === shown.windowShown) return;
    shown = { question, windowShown: now };
    for (const listener of [...listeners]) listener();
  }

  /** Runs a change of the state and then settles what the listeners hear of it. */
  function settled<Result>(change: () => Result): Result {
    const result = change();
    settle();
    return result;
  }

  return {
    question: () => question,
    windowShown,
    taken({ endedRun, result }) {
      settled(() => {
        const { state } = result;
        // The window opens at the game minute a map run ends, once the scene's effect of the end has
        // played where it plays one. The end and the restart of the map run leave no ended map run,
        // which is where it stands no more (D-368, D-322).
        if (endedRun) {
          windowOpen = true;
          effectPending =
            onScreen &&
            endEffectBegins(result.events) &&
            !options.reducedMotion();
        } else if (state.run === null || !mapRunEnded(state.run)) {
          effectPending = false;
        }
        // The question has no sense once the copy holds no unsaved changes; it does not come back.
        if (question !== null && !copyHasUnsavedChanges(state)) question = null;
      });
    },
    entered() {
      settled(() => {
        if (onScreen) return;
        onScreen = true;
        const { run } = game.get();
        if (run !== null && mapRunEnded(run)) windowOpen = true;
      });
    },
    left() {
      settled(() => {
        closeQuestionNow();
        effectPending = false;
        onScreen = false;
      });
    },
    ask(opens) {
      return settled(() => {
        const { run, paused } = game.get();
        if (run === null || game.halted() || question !== null) return null;
        // A map run that goes on stops as „Pauza” stops it; „Wróć” sets it going again.
        question = { resume: !mapRunEnded(run) && !paused, opens };
        // The window covers the program panel, where the question stands, so it closes and stays closed
        // after „Wróć” (D-173, D-311).
        windowOpen = false;
        effectPending = false;
        return question;
      });
    },
    closeQuestion: () => settled(closeQuestionNow),
    forgetQuestion() {
      settled(() => {
        question = null;
      });
    },
    openWindow() {
      return settled(() => {
        const { run } = game.get();
        if (game.halted() || run === null || !mapRunEnded(run)) return false;
        const closed = closeQuestionNow();
        windowOpen = true;
        effectPending = false;
        return closed;
      });
    },
    closeWindow() {
      settled(() => {
        if (game.halted()) return;
        windowOpen = false;
        effectPending = false;
      });
    },
    effectEnded() {
      settled(() => {
        if (game.halted() || !effectPending) return;
        effectPending = false;
      });
    },
    built() {
      focusOwed = windowShown();
    },
    takeOwedFocus(connected) {
      if (!focusOwed || !connected) return false;
      focusOwed = false;
      return windowShown();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    snapshot: () => shown,
  };
}
