import { end, newGame, restart, setPaused, setProgram, type GameResult } from '../sim/game.js';
import type { GameState } from '../sim/types.js';
import { startClock, type GameStore } from './clock.js';
import { createFooter } from './footer.js';
import { createProgramEditor } from './program-editor.js';
import { createSendPanel } from './send-panel.js';
import { createStatusRow } from './status-row.js';

/**
 * Builds the page in `root` and starts the game. This module holds the one current game state;
 * it replaces it only with the state a simulation function returned and draws only from it.
 */
export function startApp(root: HTMLElement): void {
  let state: GameState = newGame();

  const header = document.createElement('header');
  const title = document.createElement('h1');
  title.textContent = 'Loop';
  header.append(title);

  const columns = document.createElement('main');
  columns.className = 'columns';
  // Left column: the program panel, always visible.
  const programPanel = document.createElement('section');
  programPanel.className = 'program-panel';
  // Right column: the send panel without a map run; the status row and terrain panel during one.
  const mapColumn = document.createElement('section');
  mapColumn.className = 'map-column';
  const runPanel = document.createElement('div');
  runPanel.className = 'run-panel';
  // The terrain panel draws the map run (added by a later slice).
  const terrainPanel = document.createElement('div');
  terrainPanel.className = 'terrain-panel';
  columns.append(programPanel, mapColumn);

  // The editor passes each edited program to the simulation; setProgram validates and replaces it.
  // Real time elapsed before the edit is passed first, so it runs under the program it ran under.
  const programEditor = createProgramEditor(program => {
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
      // The editor updates only when the program or the run's map changes, never on a clock tick,
      // so ticking cannot take focus from its controls.
      if (state.program !== previous.program || state.run?.mapId !== previous.run?.mapId) {
        programEditor.update(state);
      }
    },
  };
  const clock = startClock(store);

  const sendPanel = createSendPanel(target => {
    if (!state.run) clock.send(target);
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
  runPanel.append(statusRow.element, terrainPanel);
  mapColumn.append(sendPanel, runPanel);

  function renderMapColumn(): void {
    sendPanel.hidden = state.run !== null;
    runPanel.hidden = state.run === null;
    statusRow.update(state);
  }

  root.append(header, columns, createFooter());
  renderMapColumn();
  programEditor.update(state);
}
