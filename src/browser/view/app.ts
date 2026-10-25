import {
  createCharacter,
  end,
  newGame,
  restart,
  setPaused,
  setProgram,
  type GameResult,
} from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import { createBodyRow } from "./body-row.js";
import { startClock, type GameStore } from "./clock.js";
import { createFooter } from "./footer.js";
import { createHeadquarters } from "./headquarters.js";
import { createProgramEditor } from "./program-editor.js";
import { createStatusRow } from "./status-row.js";
import { createTerrainPanel } from "./terrain-panel.js";

/**
 * Builds the page in `root` and starts the game. This module holds the one current game state;
 * it replaces it only with the state a simulation function returned and draws only from it.
 */
export function startApp(root: HTMLElement): void {
  let state: GameState = newGame();

  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Loop";
  header.append(title);

  const columns = document.createElement("main");
  columns.className = "columns";
  // Left column: the program panel, always visible.
  const programPanel = document.createElement("section");
  programPanel.className = "program-panel";
  // Right column: the headquarters without a map run; during one the status row, the row of the
  // body and the backpack under it, and the terrain panel.
  const mapColumn = document.createElement("section");
  mapColumn.className = "map-column";
  const runPanel = document.createElement("div");
  runPanel.className = "run-panel";
  // The terrain panel draws the map run and lists its revealed tiles.
  const terrainPanel = createTerrainPanel();
  columns.append(programPanel, mapColumn);

  // The editor passes each edited program to the simulation; setProgram validates and replaces it.
  // Real time elapsed before the edit is passed first, so it runs under the program it ran under.
  const programEditor = createProgramEditor((program) => {
    clock.flush();
    store.apply(setProgram(state, program));
  });
  programPanel.append(programEditor.element);

  const store: GameStore = {
    get: () => state,
    apply(result: GameResult): void {
      if (result.state === state) return;
      const previous = state;
      state = result.state;
      renderMapColumn();
      // Content updates only on a program/map change. A tick or restart updates counts alone,
      // leaving partial field input and focus intact.
      if (
        state.program !== previous.program ||
        state.run?.mapId !== previous.run?.mapId
      ) {
        programEditor.update(state);
      } else {
        programEditor.updateCounts(state.ruleCounts);
      }
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
  runPanel.append(statusRow.element, bodyRow.element, terrainPanel.element);
  mapColumn.append(headquarters.element, runPanel);

  function renderMapColumn(): void {
    headquarters.element.hidden = state.run !== null;
    runPanel.hidden = state.run === null;
    headquarters.update(state);
    statusRow.update(state);
    bodyRow.update(state);
    terrainPanel.update(state);
  }

  root.append(header, columns, createFooter());
  renderMapColumn();
  programEditor.update(state);
}
