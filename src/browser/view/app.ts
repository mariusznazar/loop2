import { end, newGame, restart, setPaused, type GameResult } from '../sim/game.js';
import type { GameState } from '../sim/types.js';
import { startClock, type GameStore } from './clock.js';
import { createFooter } from './footer.js';
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
  // Left column: the program panel (its editor is added by a later slice).
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

  const store: GameStore = {
    get: () => state,
    apply(result: GameResult): void {
      if (result.state === state) return;
      state = result.state;
      renderMapColumn();
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
}
