/**
 * The rows of sentences under the menu bar in the page's header, each a root of React of its own
 * (D-407): here the row of saving (D-208). It draws the sentence the game's saver stands for, in
 * the role `warning` with the shared `ReactFormWarning` (D-39, D-44), and the host stays hidden while
 * there is none, so the header keeps its height.
 *
 * Like the menu bar, the row is behind one boundary, `createSaveRow`: an element of its own for the
 * page to place, a first render that is synchronous, a synchronous render at each change of the
 * sentence, and `dispose()`. The saver changes its sentence only when it is created and in the
 * continuation of a save's answer, never inside the work of React, so each change may be drawn at
 * once. Nothing runs when the module is imported.
 */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ReactFormWarning } from "./controls/react-text-field.js";

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
