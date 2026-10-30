import {
  passRealTime,
  send,
  settleDeath,
  type GameResult,
} from "../sim/game.js";
import type { CharacterId, GameState, MapId, ProgramId } from "../sim/types.js";

/** Access to the one game state the app holds; `apply` replaces it with a simulation result. */
export type GameStore = {
  get(): GameState;
  apply(result: GameResult): void;
};

export type Clock = {
  /**
   * Makes a reading now: passes the real time elapsed since the clock's previous reading to the
   * simulation and settles a death at the real date read.
   */
  flush(): void;
  /**
   * Sends a character, passing the real date of the reading it makes first to the simulation as
   * the send's real time; the program number, where given, goes to the simulation's send with it.
   */
  send(ids: {
    mapId: MapId;
    characterId: CharacterId;
    programId?: ProgramId;
  }): void;
  /**
   * Stops the clock for good: its interval is cleared, and `flush` and `send` no longer reach
   * the simulation. A game leaving the page disposes its clock, so no hidden game runs on.
   */
  dispose(): void;
};

const TICK_MS = 200;

/**
 * Starts the clock: every 200 ms it makes a reading, of `performance.now()` for the real
 * milliseconds elapsed since its previous reading, which go to `passRealTime`, and of `Date.now()`
 * for the moment `settleDeath` settles a death at. The store gets one result of each reading, the
 * events of the passing of time with the state settled, so it never holds a death unsettled, and
 * an unchanged game gives it the very state it holds. Time elapsed while the tab is hidden counts
 * too, since it is measured, not counted in ticks; a date that jumps changes no pace.
 */
export function startClock(store: GameStore): Clock {
  let previous = performance.now();
  let moment = Date.now();
  let running = true;
  const flush = (): void => {
    if (!running) return;
    const now = performance.now();
    const elapsed = now - previous;
    previous = now;
    moment = Date.now();
    const { state, events } = passRealTime(store.get(), elapsed);
    store.apply({ state: settleDeath(state, moment).state, events });
  };
  const interval = setInterval(flush, TICK_MS);
  return {
    flush,
    send(ids) {
      if (!running) return;
      flush();
      store.apply(send(store.get(), ids, moment));
    },
    dispose() {
      running = false;
      clearInterval(interval);
    },
  };
}
