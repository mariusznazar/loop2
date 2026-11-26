/**
 * The world area of the screen of a map run in React (D-311, D-19, D-70, D-147, D-185, D-186, D-201,
 * D-215, D-216, D-272, D-314, D-316, D-320 to D-322, D-334, D-335, D-337, D-349): from the top the
 * scene, the rows „Teraz” and „Potem”, the body row, each value in a
 * cell of its own with the minutes its need lasts under temperature and satiety (D-337), with the
 * backpack, the lines of a solved map, of the practice and of the preview of the bring plan between the
 * backpack and the drawing, the drawing of the game map and the line of a tile under it. Each part
 * shows and hides as its DOM module does. It draws from props: the screen gives the game state with
 * its map run in place, the events of the simulation call that returned it, which it hands to the
 * scene and to the body row, which reads a creature's blow from them (D-04, D-450), and, for the marked
 * tile, hovered or tapped, the key and its two setters, which it
 * shares with the table of revealed tiles in another area; a click on „Teraz” or „Potem” goes out through `onShowRule` (D-336). It imports the pure functions of the DOM modules and
 * keeps the classes those modules give, so the rules of the stylesheet apply (D-265). Nothing runs
 * when the module is imported.
 */
import { PICTURE_PIXEL, SCENE } from "../sim/data/scene.js";
import type { GameEvent } from "../sim/game.js";
import type { GameState, RuleId } from "../sim/types.js";
import { BodyRowCells } from "./body-row-cells.js";
import { practiceText } from "./character-skills.js";
import { NowRows } from "./now-rows.js";
import { Scene } from "./scene.js";
import { standingOf } from "./scene-picture.js";
import { TerrainDrawing } from "./terrain-drawing.js";
import { tileLine } from "./tile-list.js";
import { solvedRunText, tripTexts } from "./trip-lines.js";

/**
 * The size the scene's picture is given, 672 × 304 pixels, twice its picture of 336 × 152, the forest
 * of D-314: the larger of the scene's two sizes, the one of the computer layout (D-349). The stylesheet
 * draws it once its picture, 336 × 152, in a phone layout too narrow for the larger; both are whole
 * multiples, so every pixel of the picture stays equal in size.
 */
const SCENE_WIDTH = SCENE.background.width * PICTURE_PIXEL;
const SCENE_HEIGHT = SCENE.background.height * PICTURE_PIXEL;

/** What the screen gives the world area; every render gives it whole. */
export type WorldAreaProps = {
  /** The game state the area draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** The events of the simulation call that returned `state`, for the scene. */
  events: readonly GameEvent[];
  /** The key of the marked tile, hovered or tapped, „col,row”, or null when none is marked. */
  hovered: string | null;
  /** Called with the key of the tile under a mouse or a pen, or null when the pointer is over none. */
  onHover: (key: string | null) => void;
  /** Called with the key of the tile a finger tapped, or null for a tap on the drawing beside every tile. */
  onTap: (key: string | null) => void;
  /** Called with the number of the rule a click on „Teraz” or „Potem” names (D-336). */
  onShowRule: (ruleId: RuleId) => void;
  /** Called when the scene's effect of a discovery, a death or a completion has ended (D-322). */
  onEffectEnd: () => void;
};

/**
 * The world area. The scene is a picture drawn from the game state, with no text on it or over it
 * and nothing in it to take a click or the keyboard (D-272, D-321). It stands in a place of its own,
 * which keeps the scene's frame at the size of its picture, so every part placed in it by a
 * percentage stays where it is, and centres it and crops its sides evenly where the place is a few
 * pixels narrower than the picture (D-349). The paragraph of the last encounter
 * stands in the chronicle in the area with the tabs, not here (D-311, D-147); the deposit and the
 * settlement of a death stand in the end-of-run window, not here (D-185, D-216). A value of the body
 * row below its threshold stands in `danger`, as do „marznie” and „głoduje” under it (D-39); the other
 * notes stand in `text-secondary`. The line under the drawing gives the marked tile's numbers, hovered
 * or tapped, else the character's tile's.
 */
export function WorldArea({
  state,
  events,
  hovered,
  onHover,
  onTap,
  onShowRule,
  onEffectEnd,
}: WorldAreaProps) {
  const run = state.run;
  if (run === null) return null;
  const trip = tripTexts(state);
  const solved = solvedRunText(state);
  const practice = practiceText(run.practice, !run.solvedMapRun);
  const line = tileLine(state, hovered);
  return (
    <div className="world-area">
      <div className="scene-place">
        <Scene
          state={state}
          width={SCENE_WIDTH}
          height={SCENE_HEIGHT}
          events={events}
          onEffectEnd={onEffectEnd}
        />
      </div>
      <NowRows state={state} onShowRule={onShowRule} />
      <BodyRowCells
        run={run}
        events={events}
        pace={state.pace}
        standing={standingOf(state, run)}
      />
      {solved === null ? null : <p className="trip-result">{solved}</p>}
      {practice === "" ? null : (
        <p
          className={run.solvedMapRun ? "run-practice unpaid" : "run-practice"}
        >
          {practice}
        </p>
      )}
      {trip.preview === null ? null : (
        <p className="trip-result">{trip.preview}</p>
      )}
      <div className="world-drawing">
        <TerrainDrawing
          state={state}
          hovered={hovered}
          onHover={onHover}
          onTap={onTap}
        />
      </div>
      {line === null ? null : <p className="tile-line">{line}</p>}
    </div>
  );
}
