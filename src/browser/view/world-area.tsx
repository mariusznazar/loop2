/**
 * The world area of the screen of a map run in React (D-311, D-19, D-70, D-147, D-185, D-186, D-201,
 * D-215, D-216, D-272, D-314, D-316, D-320 to D-322, D-334, D-335, D-337; tasks ekran-przejscia, To do 4, 5
 * and 6, scena-z-ludzikiem and teraz-i-potem, To do 1, 2 and 4 to 6, kronika-z-filtrami, To do 6): from
 * the top the scene, the rows „Teraz” and „Potem”, the lines of the
 * end of the map run — the deposit and the settlement of a death — the body row, each value in a
 * cell of its own with the minutes its need lasts under temperature and satiety (D-337), with the
 * backpack, the lines of a solved map, of the practice and of the preview of the bring plan between the
 * backpack and the drawing, the drawing of the game map and the line of a tile under it. Each part
 * shows and hides as its DOM module does. It draws from props: the screen gives the game state with
 * its map run in place, the events of the simulation call that returned it, which it hands to the
 * scene (D-04), and, for the hovered tile, the key and its setter, which it shares with the table of
 * revealed tiles in another area; a click on „Teraz” or „Potem” goes out through `onShowRule` (D-336). It imports the pure functions of the DOM modules and
 * keeps the classes those modules give, so the rules of the stylesheet apply (D-265). Nothing runs
 * when the module is imported.
 */
import { MAPS } from "../sim/data/maps.js";
import type { GameEvent } from "../sim/game.js";
import type { GameState, RuleId } from "../sim/types.js";
import { bodyCells, backpackText } from "./body-row.js";
import { practiceText } from "./character-skills.js";
import { NowRows } from "./now-rows.js";
import { Scene } from "./scene.js";
import { TerrainDrawing } from "./terrain-drawing.js";
import { tileLine } from "./tile-list.js";
import { deathSettlementLine, solvedRunText, tripTexts } from "./trip-lines.js";

/** The scene's frame, the forest of D-314, is 336 × 152 pixels, shown at a whole multiple. */
const SCENE_WIDTH = 336;
const SCENE_HEIGHT = 152;

/**
 * The scale of the scene: 1 for 336 × 152, 2 for 672 × 304. The one place the size of the scene is
 * switched; the human's choice between the two (task ekran-przejscia, question 1) changes this
 * constant alone. Committed as 2 until that choice.
 */
export const SCENE_SCALE = 2;

/** The size the scene is drawn at for a scale, whole multiples of its picture. */
export function sceneSize(scale: number): { width: number; height: number } {
  return { width: SCENE_WIDTH * scale, height: SCENE_HEIGHT * scale };
}

/** What the screen gives the world area; every render gives it whole. */
export type WorldAreaProps = {
  /** The game state the area draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** The events of the simulation call that returned `state`, for the scene. */
  events: readonly GameEvent[];
  /** The key of the hovered tile, „col,row”, or null when none is hovered. */
  hovered: string | null;
  /** Called with the key of the tile under the pointer, or null when the pointer is over none. */
  onHover: (key: string | null) => void;
  /** Called with the number of the rule a click on „Teraz” or „Potem” names (D-336). */
  onShowRule: (ruleId: RuleId) => void;
};

/**
 * The world area. The scene is a picture drawn from the game state, with no text on it or over it
 * and nothing in it to take a click or the keyboard (D-272, D-321). The paragraph of the last encounter
 * stands in the chronicle of the right area, not here (D-311, D-147). A value of the body row below its threshold stands
 * in `danger`, as do „marznie” and „głoduje” under it and the settlement of a death that took the
 * progress (D-39); the other notes stand in `text-secondary`. The line under the drawing gives the hovered tile's numbers, else the character's tile's.
 */
export function WorldArea({
  state,
  events,
  hovered,
  onHover,
  onShowRule,
}: WorldAreaProps) {
  const run = state.run;
  if (run === null) return null;
  const scene = sceneSize(SCENE_SCALE);
  const trip = tripTexts(state);
  const settlement = deathSettlementLine(state);
  const solved = solvedRunText(state);
  const practice = practiceText(run.practice);
  const line = tileLine(state, hovered);
  return (
    <div className="world-area">
      <Scene
        state={state}
        width={scene.width}
        height={scene.height}
        events={events}
      />
      <NowRows state={state} onShowRule={onShowRule} />
      {trip.deposited === null ? null : (
        <p className="trip-result">{trip.deposited}</p>
      )}
      {settlement === null ? null : (
        <p className={settlement.danger ? "trip-result danger" : "trip-result"}>
          {settlement.text}
        </p>
      )}
      <div className="body-row">
        <div className="body-cells">
          {bodyCells(run, MAPS[run.mapId]).map((cell, index) => (
            <div key={index} className="body-cell">
              <span
                className={cell.danger ? "body-value danger" : "body-value"}
              >
                {cell.text}
              </span>
              {cell.note === null ? null : (
                <span
                  className={
                    cell.note.danger ? "body-note danger" : "body-note"
                  }
                >
                  {cell.note.text}
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="backpack-text">{backpackText(run.character)}</p>
      </div>
      {solved === null ? null : <p className="trip-result">{solved}</p>}
      {practice === "" ? null : <p className="run-practice">{practice}</p>}
      {trip.preview === null ? null : (
        <p className="trip-result">{trip.preview}</p>
      )}
      <div className="world-drawing">
        <TerrainDrawing state={state} hovered={hovered} onHover={onHover} />
      </div>
      {line === null ? null : <p className="tile-line">{line}</p>}
    </div>
  );
}
