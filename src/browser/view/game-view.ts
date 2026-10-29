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
import { teamProgram } from "../sim/programs.js";
import type { GameState, Program } from "../sim/types.js";
import { createBodyRow } from "./body-row.js";
import { startClock, type GameStore } from "./clock.js";
import { createHeadquarters } from "./headquarters.js";
import { createCombatLine } from "./combat-line.js";
import { createProgramEditor } from "./program-editor.js";
import { createStatusRow } from "./status-row.js";
import { createTerrainPanel } from "./terrain-panel.js";

/**
 * What the program panel shows: during a map run the copy it carries out with its counts, and
 * otherwise the program `setProgram` edits outside a map run, with the counts where they stand
 * beside it.
 */
function shownProgram(state: GameState): {
  program: Program;
  counts: GameState["ruleCounts"];
} {
  if (state.run)
    return { program: state.run.copy.program, counts: state.ruleCounts };
  const edited = teamProgram(state);
  return {
    program: edited.program,
    counts: state.countsProgram === edited.id ? state.ruleCounts : null,
  };
}

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
  const combatLine = createCombatLine();
  element.append(programPanel, mapColumn);

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
      const previous = shownProgram(state);
      const previousMap = state.run?.mapId;
      const previousUnderstanding = state.understanding;
      state = result.state;
      renderMapColumn();
      // Content updates only on a change of the program shown or the map, or when the
      // Understanding changes (what the lists offer). A tick or restart updates counts alone,
      // leaving partial field input and focus intact.
      const shown = shownProgram(state);
      if (
        shown.program !== previous.program ||
        state.run?.mapId !== previousMap ||
        state.understanding !== previousUnderstanding
      ) {
        programEditor.update(state, shown.program, shown.counts);
      } else {
        programEditor.updateCounts(shown.counts);
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
  const shown = shownProgram(state);
  programEditor.update(state, shown.program, shown.counts);

  return {
    element,
    dispose(): void {
      clock.dispose();
      element.remove();
    },
  };
}
