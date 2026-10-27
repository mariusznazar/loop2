import { passRealTime, send, type GameResult } from "../sim/game.js";
import type { CharacterId, GameState, MapId } from "../sim/types.js";

/** Access to the one game state the app holds; `apply` replaces it with a simulation result. */
export type GameStore = {
  get(): GameState;
  apply(result: GameResult): void;
};

export type Clock = {
  /** Passes the real time elapsed since the clock's previous reading to the simulation now. */
  flush(): void;
  /** Sends a character, passing the real date to the simulation as the send's real time. */
  send(ids: { mapId: MapId; characterId: CharacterId }): void;
  /**
   * Stops the clock for good: its interval is cleared, and `flush` and `send` no longer reach
   * the simulation. A game leaving the page disposes its clock, so no hidden game runs on.
   */
  dispose(): void;
};

const TICK_MS = 200;

/**
 * Starts the clock: every 200 ms it reads `performance.now()` and passes the real milliseconds
 * elapsed since its previous reading to `passRealTime`. Time elapsed while the tab is hidden counts
 * too, since it is measured, not counted in ticks.
 */
export function startClock(store: GameStore): Clock {
  let previous = performance.now();
  let running = true;
  const flush = (): void => {
    if (!running) return;
    const now = performance.now();
    const elapsed = now - previous;
    previous = now;
    store.apply(passRealTime(store.get(), elapsed));
  };
  const interval = setInterval(flush, TICK_MS);
  return {
    flush,
    send(ids) {
      if (!running) return;
      flush();
      store.apply(send(store.get(), ids, Date.now()));
    },
    dispose() {
      running = false;
      clearInterval(interval);
    },
  };
}
