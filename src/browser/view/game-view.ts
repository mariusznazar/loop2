import {
  createCharacter,
  end,
  newGame,
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
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../sim/programs.js";
import type { GameState } from "../sim/types.js";
import { createBodyRow } from "./body-row.js";
import { startClock, type GameStore } from "./clock.js";
import { createHeadquarters } from "./headquarters.js";
import { createCombatLine } from "./combat-line.js";
import { createProgramPanel } from "./program-panel.js";
import { createStatusRow } from "./status-row.js";
import { createTerrainPanel } from "./terrain-panel.js";

export type GameView = {
  /** The program panel and the map column, for the page to place. */
  element: HTMLElement;
  /**
   * Ends this game in the page: its clock stops and its elements leave the page, taking their
   * event handlers with them. Calling it again does nothing.
   */
  dispose(): void;
};

/**
 * Builds a new game and starts its clock. The view holds the one current game state; it replaces
 * it only with the state a simulation function returned and draws only from it. Nothing here runs
 * when the module is imported.
 */
export function createGameView(): GameView {
  let state: GameState = newGame();

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

  // Left column: the program panel, always visible. Each of its acts goes to the simulation, which
  // checks it; real time elapsed before the act is passed first, so it runs under the program it
  // ran under.
  const programPanel = createProgramPanel({
    editCopy(program) {
      clock.flush();
      if (state.run) store.apply(setProgram(state, program));
    },
    editProgram(programId, program) {
      clock.flush();
      store.apply(editProgram(state, programId, program));
    },
    createProgram() {
      clock.flush();
      store.apply(createProgram(state));
    },
    renameProgram(programId, name) {
      clock.flush();
      store.apply(renameProgram(state, programId, name));
    },
    deleteProgram(programId) {
      clock.flush();
      store.apply(deleteProgram(state, programId));
    },
    saveCopy() {
      clock.flush();
      store.apply(saveCopyIntoProgram(state));
    },
    saveCopyAsNew(name) {
      clock.flush();
      store.apply(saveCopyAsNewProgram(state, name));
    },
    discardCopy() {
      clock.flush();
      store.apply(discardCopyChanges(state));
    },
    switchProgram(programId) {
      clock.flush();
      store.apply(switchProgram(state, programId));
    },
  });
  element.append(programPanel.element, mapColumn);

  const store: GameStore = {
    get: () => state,
    apply(result: GameResult): void {
      if (result.state === state) return;
      state = result.state;
      renderMapColumn();
      programPanel.update(state, result.events);
    },
  };
  const clock = startClock(store);

  const headquarters = createHeadquarters({
    create(name) {
      store.apply(createCharacter(state, name));
    },
    send(characterId, mapId) {
      if (!state.run) clock.send({ mapId, characterId });
    },
  });
  const statusRow = createStatusRow({
    togglePause() {
      clock.flush();
      store.apply(setPaused(state, !state.paused));
    },
    // Real time elapsed before the click is passed at the old pace.
    setPace(pace) {
      clock.flush();
      store.apply(setPace(state, pace));
    },
    restart() {
      clock.flush();
      if (state.run) store.apply(restart(state));
    },
    end() {
      clock.flush();
      if (state.run) store.apply(end(state));
    },
  });
  const bodyRow = createBodyRow();
  runPanel.append(
    statusRow.element,
    statusRow.discovery,
    combatLine.element,
    bodyRow.element,
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
    terrainPanel.update(state);
  }

  renderMapColumn();
  programPanel.update(state, []);

  return {
    element,
    dispose(): void {
      clock.dispose();
      element.remove();
    },
  };
}
