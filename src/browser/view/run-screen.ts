/**
 * The screen of a manual map run, Przejście (D-280, D-281): the program panel with the copy beside
 * the column of the map run — the status row, the line of discovery, the combat line, the lines of
 * the trip, the row of the body and the backpack, the practice and the terrain panel — as the game
 * view held them beside the headquarters before the screens got addresses. The screen takes its
 * map run as a parameter of `update` and reads no map run of the game state by itself (D-281):
 * it hands its parts a game state with that map run in place, their signatures as they are. The
 * parts are the modules that stay in the browser's DOM APIs (D-265); this module composes them
 * and builds no new screen after their pattern — the new layout of this screen is a later task's.
 * Nothing here runs when the module is imported.
 */
import type { GameMapRun, GameState } from "../sim/types.js";
import { createBodyRow } from "./body-row.js";
import { practiceText } from "./character-skills.js";
import { createCombatLine } from "./combat-line.js";
import { createStatusRow, type StatusRowControls } from "./status-row.js";
import { createTerrainPanel } from "./terrain-panel.js";
import { createTripLines } from "./trip-lines.js";

export type RunScreen = {
  /** The screen, for the game view to show and hide; the program panel stands first in it. */
  element: HTMLElement;
  /**
   * Shows the map run `run` of the game state `state`: the parts draw from a game state holding
   * that map run, so the one the address names is the one drawn.
   */
  update(state: GameState, run: GameMapRun): void;
  /** Moves keyboard focus to the screen, for the page to call when a send opens it. */
  focus(): void;
};

/**
 * Builds the screen once: `panel` is the program panel, which the game view moves between the
 * screens that hold it, and the status row's controls go to the game view, which turns each into a
 * simulation call. The elements are made once and updated in place, so a button keeps focus
 * across clock ticks.
 */
export function createRunScreen(
  panel: HTMLElement,
  controls: StatusRowControls,
): RunScreen {
  const element = document.createElement("section");
  element.className = "screen columns run-screen";
  element.tabIndex = -1;
  // The column of the map run: an area of its own, which a narrower layout places under the
  // program panel (D-282).
  const mapColumn = document.createElement("section");
  mapColumn.className = "map-column screen-area";
  const runPanel = document.createElement("div");
  runPanel.className = "run-panel";
  const statusRow = createStatusRow(controls);
  const combatLine = createCombatLine();
  const bodyRow = createBodyRow();
  const practice = document.createElement("p");
  practice.className = "run-practice";
  const tripLines = createTripLines();
  // The terrain panel draws the map run and lists its revealed tiles.
  const terrainPanel = createTerrainPanel();
  runPanel.append(
    statusRow.element,
    statusRow.discovery,
    combatLine.element,
    tripLines.deposited,
    tripLines.settlement,
    bodyRow.element,
    tripLines.solved,
    practice,
    tripLines.preview,
    terrainPanel.element,
  );
  mapColumn.append(runPanel);
  element.append(panel, mapColumn);

  return {
    element,
    update(state: GameState, run: GameMapRun): void {
      const shown: GameState = state.run === run ? state : { ...state, run };
      statusRow.update(shown);
      combatLine.update(run.lastCombat ?? null);
      bodyRow.update(shown);
      practice.textContent = practiceText(run.practice);
      practice.hidden = practice.textContent === "";
      tripLines.update(shown);
      terrainPanel.update(shown);
    },
    focus(): void {
      element.focus();
    },
  };
}
