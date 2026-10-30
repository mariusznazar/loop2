import type { AccountClient } from "../account-api.js";
import {
  createCharacter,
  end,
  mapRunEnded,
  restart,
  setPace,
  setPaused,
  setProgram,
  type GameResult,
} from "../sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  pickProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../sim/programs.js";
import { savedGame, type SavedGame } from "../sim/saved-game.js";
import type { GameState } from "../sim/types.js";
import { buyBranch } from "../sim/skills.js";
import { practiceText } from "./character-skills.js";
import { createBodyRow } from "./body-row.js";
import { startClock, type GameStore } from "./clock.js";
import { createGameSaver, type LogoutSave } from "./game-saver.js";
import { createHeadquarters } from "./headquarters.js";
import { createCombatLine } from "./combat-line.js";
import { createProgramPanel } from "./program-panel.js";
import { createStatusRow } from "./status-row.js";
import { createTerrainPanel } from "./terrain-panel.js";
import { createTripLines } from "./trip-lines.js";

export type GameViewOptions = {
  /** The account client the game's saver saves through. */
  readonly client: Pick<AccountClient, "saveGame">;
  /** The game state the game starts from: a new game, or the state a load returned. */
  readonly state: GameState;
  /** The revision of the saved game state `state` came from; 0 when the server held none. */
  readonly revision: number;
  /** The game was built from the server's save after a conflict (D-209). */
  readonly afterConflict?: boolean;
  /** Another browser saved first: the page drops this game and loads the server's save. */
  onConflict(): void;
  /** The server holds a newer version: the saver has stopped for good; the game stays. */
  onOutdated(): void;
  /** No session: the page keeps the current state for the same account and removes the game. */
  onSignedOut(): void;
};

/** The current game state as a saved document, with the revision the saver last saw. */
export type KeptGame = {
  readonly document: SavedGame;
  readonly revision: number;
};

export type GameView = {
  /** The program panel and the map column, for the page to place. */
  element: HTMLElement;
  /** The header line of saving, for the page to place under the title and „Wyloguj” (D-208). */
  saveLine: HTMLElement;
  /** A moment of saving the page calls itself: the current state goes at once. */
  saveNow(): void;
  /** The save before logout and its outcome (D-97). */
  saveBeforeLogout(): Promise<LogoutSave>;
  /** The current game state, real time passed first, as a document to keep in the page (D-211). */
  keep(): KeptGame;
  /**
   * Ends this game in the page: its clock and its saver stop and its elements leave the page,
   * taking their event handlers with them. Calling it again does nothing.
   */
  dispose(): void;
};

/**
 * Builds the game from the state it starts from and starts its clock and its saver. The view holds
 * the one current game state; it replaces it only with the state a simulation function returned
 * and draws only from it. It lands where the state says: the headquarters, a map run (a loaded one
 * that goes on comes back paused by the load) or the screen after a map run's end. Every act of the
 * player whose result changed the state, and every game minute that ends the map run in a death or
 * a completion, is a moment of saving (D-207). Nothing here runs when the module is imported.
 */
export function createGameView(options: GameViewOptions): GameView {
  let state: GameState = options.state;

  const element = document.createElement("div");
  element.className = "columns";
  // Right column: the headquarters without a map run; during one the status row, the row of the
  // body and the backpack under it, and the terrain panel.
  const mapColumn = document.createElement("section");
  mapColumn.className = "map-column";
  const runPanel = document.createElement("div");
  runPanel.className = "run-panel";
  // The terrain panel draws the map run and lists its revealed tiles.
  const terrainPanel = createTerrainPanel();
  const combatLine = createCombatLine();

  /** An act of the player: its result replaces the state, and a changed state is saved. */
  function act(result: GameResult): void {
    const before = state;
    store.apply(result);
    if (state !== before) saver.moment();
  }

  // Left column: the program panel, always visible. Each of its acts goes to the simulation, which
  // checks it; real time elapsed before the act is passed first, so it runs under the program it
  // ran under.
  const programPanel = createProgramPanel({
    editCopy(program) {
      clock.flush();
      if (state.run) act(setProgram(state, program));
    },
    editProgram(programId, program) {
      clock.flush();
      act(editProgram(state, programId, program));
    },
    createProgram() {
      clock.flush();
      act(createProgram(state));
    },
    renameProgram(programId, name) {
      clock.flush();
      act(renameProgram(state, programId, name));
    },
    deleteProgram(programId) {
      clock.flush();
      act(deleteProgram(state, programId));
    },
    saveCopy() {
      clock.flush();
      act(saveCopyIntoProgram(state));
    },
    saveCopyAsNew(name) {
      clock.flush();
      act(saveCopyAsNewProgram(state, name));
    },
    discardCopy() {
      clock.flush();
      act(discardCopyChanges(state));
    },
    switchProgram(programId) {
      clock.flush();
      act(switchProgram(state, programId));
    },
  });
  element.append(programPanel.element, mapColumn);

  const store: GameStore = {
    get: () => state,
    apply(result: GameResult): void {
      if (result.state === state) return;
      const ended =
        state.run !== null &&
        !mapRunEnded(state.run) &&
        result.state.run !== null &&
        mapRunEnded(result.state.run);
      state = result.state;
      renderMapColumn();
      programPanel.update(state, result.events);
      // A game minute that ends the map run in a death or a completion is a moment of saving.
      if (ended) saver.moment();
    },
  };
  const clock = startClock(store);
  const saver = createGameSaver({
    client: options.client,
    read() {
      clock.flush();
      return state;
    },
    state,
    revision: options.revision,
    afterConflict: options.afterConflict ?? false,
    onConflict: () => options.onConflict(),
    onOutdated: () => options.onOutdated(),
    onSignedOut: () => options.onSignedOut(),
  });

  const headquarters = createHeadquarters({
    buy(characterId, branch) {
      act(buyBranch(state, characterId, branch));
    },
    create(name) {
      act(createCharacter(state, name));
    },
    pick(characterId, programId) {
      clock.flush();
      act(pickProgram(state, characterId, programId));
    },
    send(characterId, mapId, programId) {
      if (state.run) return;
      const before = state;
      clock.send({ mapId, characterId, programId });
      if (state !== before) saver.moment();
    },
  });
  const statusRow = createStatusRow({
    togglePause() {
      clock.flush();
      act(setPaused(state, !state.paused));
    },
    // Real time elapsed before the click is passed at the old pace.
    setPace(pace) {
      clock.flush();
      act(setPace(state, pace));
    },
    restart() {
      clock.flush();
      if (state.run) act(restart(state));
    },
    end() {
      clock.flush();
      if (state.run) act(end(state));
    },
  });
  const bodyRow = createBodyRow();
  const practice = document.createElement("p");
  practice.className = "run-practice";
  const tripLines = createTripLines();
  runPanel.append(
    statusRow.element,
    statusRow.discovery,
    combatLine.element,
    tripLines.deposited,
    bodyRow.element,
    practice,
    tripLines.preview,
    terrainPanel.element,
  );
  mapColumn.append(headquarters.element, runPanel);

  function renderMapColumn(): void {
    headquarters.element.hidden = state.run !== null;
    runPanel.hidden = state.run === null;
    headquarters.update(state);
    statusRow.update(state);
    combatLine.update(state.run?.lastCombat ?? null);
    bodyRow.update(state);
    practice.textContent = practiceText(state.run?.practice ?? {});
    practice.hidden = practice.textContent === "";
    tripLines.update(state);
    terrainPanel.update(state);
  }

  renderMapColumn();
  programPanel.update(state, []);

  let disposed = false;
  return {
    element,
    saveLine: saver.element,
    saveNow: () => saver.moment(),
    saveBeforeLogout: () => saver.saveBeforeLogout(),
    keep(): KeptGame {
      clock.flush();
      return { document: savedGame(state), revision: saver.revision() };
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      clock.dispose();
      saver.dispose();
      element.remove();
      saver.element.remove();
    },
  };
}
