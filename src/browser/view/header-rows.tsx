/**
 * The rows of sentences under the menu bar in the page's header, each a root of React of its own
 * (D-407): the row of saving (D-208) and the row of the failure (D-323). Each draws its sentence in
 * the role `warning` with the shared `ReactFormWarning` (D-39, D-44), and its host stays hidden while
 * it says nothing, so the header keeps its height.
 *
 * Like the menu bar, a row is behind one boundary: an element of its own for the page to place, a
 * first render that is synchronous, and `dispose()`. The row of saving, `createSaveRow`, draws the
 * sentence the game's saver stands for anew, synchronously, at each change of it; the saver changes
 * its sentence only when it is created and in the continuation of a save's answer, never inside the
 * work of React. The row of the failure, `createFailureRow`, is drawn once, when the page starts,
 * and never again: at the error the page only shows its host, which sets no state of React and
 * renders nothing, so the sentence comes whatever else React is doing and an error in the drawing of
 * another root cannot take it down. Nothing runs when the module is imported.
 */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ReactFormWarning } from "./controls/react-text-field.js";
import { FAILURE_SENTENCE } from "./last-resort.js";

export type FailureRow = {
  /** The host of the row, for the page to place under the menu bar; hidden until `show()`. */
  readonly element: HTMLElement;
  /** Shows the sentence of the failure; only removes `hidden` from the host, so it renders nothing. */
  show(): void;
  /** Unmounts the row and takes its host out of the page. */
  dispose(): void;
};

/**
 * Builds the row of the failure in an element of its own, with the class `failure-line`, hidden. The
 * sentence of `last-resort.ts` is drawn into it synchronously here, and never again.
 */
export function createFailureRow(): FailureRow {
  const element = document.createElement("div");
  element.className = "failure-line";
  element.hidden = true;
  const root = createRoot(element);
  flushSync(() => {
    root.render(<ReactFormWarning sentence={FAILURE_SENTENCE} />);
  });
  return {
    element,
    show(): void {
      element.hidden = false;
    },
    dispose(): void {
      root.unmount();
      element.remove();
    },
  };
}

export type SaveRowOptions = {
  /** The sentence of saving now, or null while there is none. */
  sentence(): string | null;
  /** Calls the listener after each change of the sentence; returns the call that stops it. */
  subscribe(listener: () => void): () => void;
};

export type SaveRow = {
  /** The host of the row, for the page to place under the menu bar; hidden while there is no sentence. */
  readonly element: HTMLElement;
  /** Stops listening, unmounts the row and takes its host out of the page. */
  dispose(): void;
};

/**
 * Builds the row of saving in an element of its own, with the class `save-line`. The render is
 * synchronous, so the sentence stands in the element when this returns.
 */
export function createSaveRow(options: SaveRowOptions): SaveRow {
  const element = document.createElement("div");
  element.className = "save-line";
  const root = createRoot(element);
  let disposed = false;
  function draw(): void {
    if (disposed) return;
    const sentence = options.sentence();
    element.hidden = sentence === null;
    flushSync(() => {
      root.render(<ReactFormWarning sentence={sentence} />);
    });
  }
  draw();
  const unsubscribe = options.subscribe(draw);
  return {
    element,
    dispose(): void {
      if (disposed) return;
      disposed = true;
      unsubscribe();
      root.unmount();
      element.remove();
    },
  };
}
