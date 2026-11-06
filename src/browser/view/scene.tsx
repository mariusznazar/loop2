/**
 * The scene of the world area of the screen of a map run, drawn still (D-316, D-320, D-321, D-322,
 * D-272, D-43; task scena-z-ludzikiem, To do 1, 2, 4, 6, 8, 9 and 11): over the forest of D-314 the
 * props, the campfire while one stands on the character's tile, the mage on the first frame of its
 * idle sheet and, over its head, the badge — the icon of the current action drawn as the mask of
 * `.action-icon` and under it the bar of the action's progress. It draws from what `sceneDrawing`
 * gives of the game state and holds no state of its own; its files, places and frame counts come
 * from there, the view names none. A place and a size are percentages of the frame and a frame count
 * a custom property, so the stylesheet holds no length of a sprite and the scene is right at either
 * scale. The scene is a picture: no element of it takes the keyboard or a click, it is hidden from
 * assistive technology and no text or sign stands on it (D-321, D-272, D-44). Nothing runs when the
 * module is imported.
 */
import type { CSSProperties } from "react";
import { SCENE } from "../sim/data/scene.js";
import type { GameState } from "../sim/types.js";
import { sceneDrawing } from "./scene-picture.js";
import type {
  SceneDrawing,
  SceneSprite,
  ScenePlacedSprite,
} from "./scene-picture.js";

export type SceneProps = {
  /** The game state the scene draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** The size the scene is drawn at, whole multiples of its frame. */
  width: number;
  height: number;
};

/** A part of a whole as a percentage with four decimals, which is finer than a pixel at any scale. */
function percent(part: number, whole: number): string {
  return `${Number(((part / whole) * 100).toFixed(4))}%`;
}

/** The box of a sprite placed by its left edge and the line it stands on, in percentages of the frame. */
function boxOf(sprite: ScenePlacedSprite, frame: SceneSprite): CSSProperties {
  return {
    left: percent(sprite.x, frame.width),
    top: percent(sprite.y - sprite.height, frame.height),
    width: percent(sprite.width, frame.width),
    height: percent(sprite.height, frame.height),
  };
}

/** The first frame of a sheet: its picture laid at the width of all its frames, clipped to one. */
function Sheet({
  sprite,
  className,
}: {
  sprite: SceneSprite;
  className?: string;
}) {
  return (
    <div
      className={
        className === undefined ? "scene-sheet" : `scene-sheet ${className}`
      }
      style={{ "--frames": sprite.frames } as CSSProperties}
    >
      <img src={sprite.href} alt="" draggable={false} />
    </div>
  );
}

/** The badge over the mage's head: the icon of the action in `text-strong` and the progress bar. */
function Badge({ badge }: { badge: NonNullable<SceneDrawing["badge"]> }) {
  return (
    <div className="scene-badge">
      <span
        className="action-icon"
        style={{ "--icon": `url("${badge.href}")` } as CSSProperties}
      />
      <span className="scene-badge-bar">
        <span
          className="scene-badge-fill"
          style={{ "--progress": badge.progress } as CSSProperties}
        />
      </span>
    </div>
  );
}

/**
 * The scene. The mage stands where its activity leads it; where the activity leaves it standing, the
 * clearing, since this still scene has no previous reading to keep.
 */
export function Scene({ state, width, height }: SceneProps) {
  const drawing = sceneDrawing(state);
  if (drawing === null) return null;
  const frame = drawing.background;
  const { goal } = drawing.mage;
  const mage: ScenePlacedSprite =
    goal.kind === "at"
      ? { ...drawing.mage.idle, ...goal.place }
      : { ...drawing.mage.idle, x: SCENE.clearingX, y: SCENE.groundLine };
  return (
    <div className="scene" aria-hidden="true" data-standing={drawing.standing}>
      <img
        className="scene-background"
        src={frame.href}
        alt=""
        width={width}
        height={height}
      />
      {drawing.props.map((prop) => (
        <div
          key={prop.resource}
          className="scene-prop"
          data-resource={prop.resource}
          style={boxOf(prop, frame)}
        >
          <Sheet sprite={prop} />
        </div>
      ))}
      {drawing.fire === null ? null : (
        <div
          className="scene-fire"
          data-burning={drawing.fire.burning ? "true" : "false"}
          style={boxOf(drawing.fire, frame)}
        >
          <Sheet sprite={drawing.fire} />
        </div>
      )}
      <div className="scene-mage" style={boxOf(mage, frame)}>
        <Sheet sprite={drawing.mage.idle} className="scene-mage-sprite" />
        {drawing.badge === null ? null : <Badge badge={drawing.badge} />}
      </div>
    </div>
  );
}
