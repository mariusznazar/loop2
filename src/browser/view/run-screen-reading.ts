/**
 * How a root of React reads the state of the screen Przejście (D-407, D-267): the screen and its
 * program panel, two roots, each read the question „Zapisać, odrzucić, wrócić?” and whether the
 * end-of-run window is shown through `useRunScreenSnapshot`, which is `useSyncExternalStore` over
 * the subscription and the snapshot of `run-screen-state.ts`. A change of that state is made by
 * an act of the store, from an event handler or the clock, and the game view moves the focus right
 * after it, so the reading draws the change at once, as `flushSync` draws it, and the question or
 * the window already stands in the document when the focus moves. Nothing runs when the module is
 * imported.
 */
import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import type { RunScreenSnapshot, RunScreenState } from "./run-screen-state.js";

/** What a root reads of the state of the screen Przejście: the subscription and the snapshot. */
export type RunScreenReading = Pick<RunScreenState, "subscribe" | "snapshot">;

/**
 * The snapshot of the state of the screen `reading` gives, drawn again, synchronously, after each
 * change of it. Called at the top level of a component, as every Hook is.
 */
export function useRunScreenSnapshot(
  reading: RunScreenReading,
): RunScreenSnapshot {
  const subscribe = useCallback(
    (changed: () => void) =>
      reading.subscribe(() => {
        flushSync(changed);
      }),
    [reading],
  );
  return useSyncExternalStore(subscribe, reading.snapshot);
}
