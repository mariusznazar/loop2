import {
  passRealTime,
  send,
  settleDeath,
  type GameResult,
} from "../sim/game.js";
import { catchUp, passLoops, startLoop } from "../sim/loop.js";
import type { CharacterId, GameState, MapId, ProgramId } from "../sim/types.js";

/** Access to the one game state the app holds; `apply` replaces it with a simulation result. */
export type GameStore = {
  get(): GameState;
  apply(result: GameResult): void;
};

export type Clock = {
  /**
   * Makes a reading now: passes the real time elapsed since the clock's previous reading to the
   * simulation and settles a death at the real date read, then passes the whole minutes of the
   * earning loops since the loop clock (D-242), and hands the store one result of all of it.
   */
  flush(): void;
  /**
   * The real date, in milliseconds, of the clock's latest reading: the one it read at its start
   * until the first flush, then the one of the latest flush. The view draws the passing of real
   * time from it; the game state never holds it.
   */
  moment(): number;
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
  /**
   * Puts a character into an earning loop, passing the real date of the reading it makes first to
   * the simulation as the loop's real time; the program number, where given, goes with it.
   */
  startLoop(ids: {
    mapId: MapId;
    characterId: CharacterId;
    programId?: ProgramId;
  }): void;
  /**
   * The catch-up after a load (D-247): makes a reading of the date and passes the whole minutes
   * of the earning loops from the game state's save time to it. The manual map run is not passed,
   * and the loop clock goes on from where the catch-up leaves it.
   */
  catchUp(): void;
};

const TICK_MS = 200;

/**
 * Starts the clock: every 200 ms it makes a reading, of `performance.now()` for the real
 * milliseconds elapsed since its previous reading, which go to `passRealTime`, and of `Date.now()`
 * for the moment `settleDeath` settles a death at and for the earning loops. The clock holds the
 * loop clock, a date up to which whole loop minutes have been passed (D-242); a reading passes the
 * manual run and settles it, then the loops, and takes the loop clock's new value before it hands
 * the store the result, as a moment of saving inside `apply` reads the clock again and would
 * otherwise pass the same minutes twice. The store gets one result of each reading, the events of
 * the passing of time with the state settled, so it never holds a death unsettled, and
 * an unchanged game gives it the very state it holds. Time elapsed while the tab is hidden counts
 * too, since it is measured, not counted in ticks; a date that jumps changes no pace. After each
 * reading's result has gone to the store, `onReading` is called, so the view can draw what the
 * passing of real time changes without a game state changing; a disposed clock calls nothing.
 */
export function startClock(
  store: GameStore,
  onReading: () => void = () => undefined,
): Clock {
  let previous = performance.now();
  let moment = Date.now();
  let loopClock = moment;
  let running = true;
  const flush = (): void => {
    if (!running) return;
    const now = performance.now();
    const elapsed = now - previous;
    previous = now;
    moment = Date.now();
    const passed = passRealTime(store.get(), elapsed);
    const settled = settleDeath(passed.state, moment).state;
    const loops = passLoops(settled, loopClock, moment);
    loopClock = loops.clockMs;
    store.apply({
      state: loops.state,
      events: [...passed.events, ...loops.events],
    });
    onReading();
  };
  const interval = setInterval(flush, TICK_MS);
  return {
    flush,
    moment: () => moment,
    send(ids) {
      if (!running) return;
      flush();
      store.apply(send(store.get(), ids, moment));
    },
    startLoop(ids) {
      if (!running) return;
      flush();
      store.apply(startLoop(store.get(), ids, moment));
    },
    catchUp() {
      if (!running) return;
      moment = Date.now();
      const caught = catchUp(store.get(), moment);
      loopClock = caught.clockMs;
      store.apply({ state: caught.state, events: caught.events });
      onReading();
    },
    dispose() {
      running = false;
      clearInterval(interval);
    },
  };
}
