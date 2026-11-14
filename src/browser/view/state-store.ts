/**
 * The store of the game state, outside React (D-04, D-207, D-323): the one place that holds the
 * current game state, takes every result of the simulation, and, for an act of the player that
 * depends on the passing of time, makes the reading of the clock before the act runs. It holds the
 * clock and the saver of the game, so a moment of saving follows each change an act makes. It draws
 * nothing: the game view hears of each result and each reading through `onTaken` and `onReading`.
 * Nothing here runs when the module is imported.
 */
import type { AccountClient } from "../account-api.js";
import { mapRunEnded, withSaveTime, type GameResult } from "../sim/game.js";
import { savedGame, type SavedGame } from "../sim/saved-game.js";
import type { CharacterId, GameState, MapId, ProgramId } from "../sim/types.js";
import type { CopyAct } from "./chronicle-entries.js";
import { startClock } from "./clock.js";
import { createGameSaver, type LogoutSave } from "./game-saver.js";

/** The current game state as a saved document, with the revision the saver last saw. */
export type KeptGame = {
  readonly document: SavedGame;
  readonly revision: number;
};

/** One result the store took, with what the game view needs to draw it and to remember it. */
export type Taken = {
  /** The result of the simulation call that replaced the state. */
  readonly result: GameResult;
  /** The game state the result replaced. */
  readonly before: GameState;
  /** What an act on the copy was, for the chronicle (D-342); undefined for any other result. */
  readonly copyAct: CopyAct | undefined;
  /** Whether this result ended a manual map run that had not ended before. */
  readonly endedRun: boolean;
};

export type StateStoreOptions = {
  /** The state the game starts from. */
  readonly state: GameState;
  /** The revision of the saved game state `state` came from; 0 when the server held none. */
  readonly revision: number;
  /** The game was built from the server's save after a conflict (D-209). */
  readonly afterConflict?: boolean;
  /** The account client the saver saves through. */
  readonly client: Pick<AccountClient, "saveGame">;
  /** Another browser saved first: the page drops this game and loads the server's save. */
  onConflict(): void;
  /** The server holds a newer version: the saver has stopped for good. */
  onOutdated(): void;
  /** No session: the page keeps the current state for the same account and removes the game. */
  onSignedOut(): void;
  /** Called after each result that replaced the state, once the state is replaced. */
  onTaken(taken: Taken): void;
  /** Called after each reading of the clock, whether or not it changed the state. */
  onReading(): void;
};

/** Takes the result of an act of the player into the game; an act on the copy says what it was. */
export type Take = (result: GameResult, copyAct?: CopyAct) => void;

export type StateStore = {
  /** The one current game state. */
  get(): GameState;
  /** The real moment of the clock's latest reading, which the resurrection lines are drawn at. */
  moment(): number;
  /** Whether `halt()` was called: the store takes no result any more (D-323). */
  halted(): boolean;
  /**
   * An act of the player that depends on time: the clock makes one reading first, which may itself
   * take a result, and then `body` runs with the `take` of the act. Each result `take` replaces the
   * state with is a moment of saving (D-207).
   */
  act(body: (take: Take) => void): void;
  /** An act of the player with no reading before it: a new character and a bought branch rank. */
  actWithoutCatchUp(body: (take: Take) => void): void;
  /** Sends a character into a manual map run; the clock's reading comes first (D-207). */
  send(ids: {
    mapId: MapId;
    characterId: CharacterId;
    programId?: ProgramId;
  }): void;
  /** Puts a character into an earning loop; the clock's reading comes first (D-207). */
  startLoop(ids: {
    mapId: MapId;
    characterId: CharacterId;
    programId?: ProgramId;
  }): void;
  /** The catch-up after a load, the last step of building (D-247). */
  catchUp(): void;
  /** The current game state, real time passed first, as a document to keep in the page (D-211). */
  keep(): KeptGame;
  /** A moment of saving the page calls itself. */
  saveNow(): void;
  /** The save before logout and its outcome (D-97). */
  saveBeforeLogout(): Promise<LogoutSave>;
  /** The header line of saving (D-208). */
  readonly saveLine: HTMLElement;
  /** From now on every result is refused and the clock stops (D-323). Calling it again does nothing. */
  halt(): void;
  /** Stops the clock and the saver. */
  dispose(): void;
};

/**
 * Builds the store: the clock first, then the saver, as the game has always started them, so the
 * clock's timer is registered before the saver's. The store replaces the state only with the state a
 * simulation function returned.
 */
export function createStateStore(options: StateStoreOptions): StateStore {
  let state: GameState = options.state;
  let halted = false;

  /**
   * Takes a result into the game: the one place every result passes, the clock's readings, a send, a
   * catch-up and every act of the player alike. A result after `halt()` and one that holds the very
   * state the store holds are ignored (D-323). Returns whether the state was replaced.
   */
  function take(result: GameResult, copyAct?: CopyAct): boolean {
    if (halted || result.state === state) return false;
    const before = state;
    const endedRun =
      state.run !== null &&
      !mapRunEnded(state.run) &&
      result.state.run !== null &&
      mapRunEnded(result.state.run);
    const loopEnded = result.events.some(
      (event) => event.kind === "loopRunEnded",
    );
    state = result.state;
    options.onTaken({ result, before, copyAct, endedRun });
    // A game minute that ends the map run in a death or a completion, and a result in which a
    // loop's map run ended, however many, is one moment of saving (D-207).
    if (endedRun || loopEnded) saver.moment();
    return true;
  }

  const clock = startClock(
    {
      get: () => state,
      apply: (result) => {
        take(result);
      },
    },
    () => options.onReading(),
  );
  const saver = createGameSaver({
    client: options.client,
    read() {
      clock.flush();
      return state;
    },
    moment: () => clock.moment(),
    // The rhythm of 30 seconds is the manual map run's; loops are saved at acts, ends and hiding.
    runPasses: () =>
      state.run !== null && !mapRunEnded(state.run) && !state.paused,
    state,
    revision: options.revision,
    afterConflict: options.afterConflict ?? false,
    onConflict: () => options.onConflict(),
    onOutdated: () => options.onOutdated(),
    onSignedOut: () => options.onSignedOut(),
  });

  /** The `take` of an act of the player: a changed state is a moment of saving (D-207). */
  const takeAsAct: Take = (result, copyAct) => {
    if (take(result, copyAct)) saver.moment();
  };

  return {
    get: () => state,
    moment: () => clock.moment(),
    halted: () => halted,
    act(body) {
      clock.flush();
      body(takeAsAct);
    },
    actWithoutCatchUp(body) {
      body(takeAsAct);
    },
    send(ids) {
      const before = state;
      clock.send(ids);
      if (state !== before) saver.moment();
    },
    startLoop(ids) {
      const before = state;
      clock.startLoop(ids);
      if (state !== before) saver.moment();
    },
    catchUp: () => clock.catchUp(),
    keep(): KeptGame {
      clock.flush();
      return {
        document: savedGame(withSaveTime(state, clock.moment())),
        revision: saver.revision(),
      };
    },
    saveNow: () => saver.moment(),
    saveBeforeLogout: () => saver.saveBeforeLogout(),
    saveLine: saver.element,
    halt() {
      halted = true;
      clock.dispose();
    },
    dispose() {
      clock.dispose();
      saver.dispose();
    },
  };
}
