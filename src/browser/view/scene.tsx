/**
 * The scene of the world area of the screen of a map run (D-316 to D-322, D-272, D-43, D-04): over
 * the forest of D-314 the props, the campfire while one stands on the character's tile, the mage
 * with its idle and run sheets and, over its head, the badge — the icon of the current action drawn
 * as the mask of `.icon-mask` and under it the bar of the action's progress. Its files, places and
 * frame counts come from `sceneDrawing`, the view names none. A place and a size are percentages of
 * the frame and a frame count a custom property, so the stylesheet holds no length of a sprite and
 * the scene is right at its one size.
 *
 * The scene moves by CSS alone, at a beat apart from the pace, with no interval, timer or animation
 * frame of its own (D-316, D-319): the stylesheet runs the frames of the sheets and of the burning
 * fire, the mage's walk, the switch from its run sheet to its idle sheet at the walk's end and the
 * bar's filling between the readings of the clock; it holds them all at every stop and leaves them out
 * under the system's setting for reduced motion (D-317, D-322). What CSS cannot know the scene keeps
 * from its previous reading and the events the simulation returned (D-04), never in the game state:
 * the place the mage stands at or walks to, where it starts a walk, the way it faces, and a map run
 * started, at which, as at its first draw, the mage stands at its place at once. A redraw changes no
 * element that runs an animation, so the clock's five redraws a second restart none (D-03's accepted
 * risk); a walk starts on a new element, which starts its animations afresh.
 *
 * The mage that gathers bends in a loop at its place, on a third sheet of its own that takes the idle
 * sheet's place for the whole action (D-364). The end of a gathering shows an effect of an ordinary
 * event, the icon of the resource flying to the mage or the cloud of dust of a miss, each at most
 * 300 ms: the scene tells the end and its result from the game state of its previous reading, which
 * it keeps, and the events of the call (D-04), with no field of the game state for it, and drops an
 * effect that is overdue, one whose turn comes at a stop or in a reading that carries several ends
 * (D-317, D-365, D-366, D-367).
 *
 * Over the picture of the forest, its props, its fire, the dust, the mage and the flying icon on its
 * plaque lies the layer of the tint of the scene's light, `mix-blend-mode: color`, and over that the
 * frost on the edges of the frame; the badge over the mage's head, on its solid `panel`, lies over both
 * (D-315, D-316, D-320). The tint and the frost are drawn from the game state like
 * the rest: the tint and the thickness of the frost come to the stylesheet as numbers, and the
 * stylesheet takes every colour from the design tokens (D-43). A loss of the streak takes the tint back
 * to the cool one over 2 s on a new element of the layer, started where the scene goes on (D-317).
 *
 * The scene is a picture: no element of it takes the keyboard or a click, it is hidden from assistive
 * technology and no text or sign stands on it (D-321, D-272, D-44). Nothing runs when the module is
 * imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { AnimationEvent, CSSProperties } from "react";
import type { GameEvent } from "../sim/game.js";
import { SCENE, SCENE_EFFECTS } from "../sim/data/scene.js";
import type { GameState } from "../sim/types.js";
import { sceneDrawing, sceneEffect, tintShown } from "./scene-picture.js";
import type {
  SceneDrawing,
  SceneEffect,
  SceneSprite,
  ScenePlacedSprite,
  TintShown,
} from "./scene-picture.js";

export type SceneProps = {
  /** The game state the scene draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** The size the scene is drawn at, whole multiples of its frame. */
  width: number;
  height: number;
  /**
   * The events of the simulation call that returned `state`; a map run started among them places the
   * mage at once. None where the scene is drawn again from the same call.
   */
  events?: readonly GameEvent[];
};

/** The way the mage faces; its sheets face right. */
type Facing = "right" | "left";

/**
 * How the scene shows the mage, kept from reading to reading: the left edge of its frame where it
 * stands or walks to, in the scene's pixels; where a walk started, or null while it stands; the way it
 * faces; and the number of the walk, or of the placing at a first draw or a map run started, which keys
 * the mage's element, so each starts on a new one, its badge included.
 */
type Shown = {
  x: number;
  from: number | null;
  facing: Facing;
  walk: number;
};

/**
 * The effect the scene shows, with the number that keys its element: each new effect starts on an
 * element of its own, and the number tells the effect that has ended from a newer one.
 */
type Effects = { serial: number; shown: SceneEffect | null };

/**
 * One scene pixel as a percentage of the frame's width and of its height, with six decimals, so that
 * the frost built of whole pixels keeps to the scene's grid at the scene's one size (D-349).
 */
function pixel(frame: number): string {
  return `${Number((100 / frame).toFixed(6))}%`;
}

/** Events of no simulation call, one value, so a scene drawn without events sees no new ones. */
const NO_EVENTS: readonly GameEvent[] = [];

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

/** A sheet: its picture laid at the width of all its frames, clipped to one, which CSS steps through. */
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
        className="icon-mask"
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
 * The frost on the edges of the frame: its thickness in the scene's pixels and the size of one pixel as
 * a part of the frame, which the stylesheet builds the frost of, square by square on the scene's grid.
 * The body shows the frost's fill and the rim along its inner edge, and the crystals lie in the fill.
 */
function Frost({
  thickness,
  frame,
}: {
  thickness: number;
  frame: SceneSprite;
}) {
  const style = {
    "--frost": thickness,
    "--pixel-x": pixel(frame.width),
    "--pixel-y": pixel(frame.height),
  } as CSSProperties;
  return (
    <div className="scene-frost" style={style}>
      <div className="scene-frost-rim" />
      <div className="scene-frost-body">
        <div className="scene-frost-crystals" />
      </div>
    </div>
  );
}

/**
 * The effect of a gathering's end. The icon flies in two layers, each over the whole frame so that a
 * percentage is a part of it: the outer one carries it across, the inner one up and down, and the
 * plaque stands at the place the icon lands, which is where it stands under the system's setting for
 * reduced motion, an effect appearing still. The cloud of dust stands at its place, its frames run by
 * CSS. Either ends its own life: the element's last animation tells the scene to drop it.
 */
function Effect({
  effect,
  frame,
  onEnd,
}: {
  effect: SceneEffect;
  frame: SceneSprite;
  onEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  if (effect.kind === "dust")
    return (
      <div
        className="scene-effect scene-dust"
        style={boxOf(effect.sprite, frame)}
        onAnimationEnd={onEnd}
      >
        <Sheet sprite={effect.sprite} />
      </div>
    );
  const { from, to } = effect;
  const fromY = from.y - to.y;
  const style = {
    "--from-x": percent(from.x - to.x, frame.width),
    "--from-y": percent(fromY, frame.height),
    "--peak": percent(Math.min(fromY, 0) - SCENE_EFFECTS.arc, frame.height),
  } as CSSProperties;
  return (
    <div
      className="scene-effect scene-flight"
      style={style}
      onAnimationEnd={onEnd}
    >
      <div className="scene-flight-across">
        <div className="scene-flight-rise">
          <div
            className="scene-flight-plaque"
            style={{
              left: percent(to.x, frame.width),
              top: percent(to.y, frame.height),
            }}
          >
            <span
              className="icon-mask"
              aria-hidden="true"
              style={{ "--icon": `url("${effect.href}")` } as CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Where the drawing leads the mage: the place of its goal, or `kept` where its goal is to stay. */
function placeOf(drawing: SceneDrawing, kept: number): number {
  const { goal } = drawing.mage;
  return goal.kind === "at" ? goal.place.x : kept;
}

/**
 * Where the mage stands now, in the scene's pixels: on a walk, the walk's place moved by the offset
 * CSS has reached, which the browser computes, paused or not; standing, its place. The offset is read
 * as a percentage of the mage's own frame or in pixels of its drawn width, as the browser gives it;
 * a value the browser does not give, as in a document with no animation, reads as no offset.
 */
function reachedX(
  element: HTMLElement | null,
  shown: Shown,
  frameWidth: number,
): number {
  if (shown.from === null || element === null) return shown.x;
  const view = element.ownerDocument.defaultView;
  if (view === null) return shown.x;
  const value = view.getComputedStyle(element).getPropertyValue("translate");
  const offset = Number.parseFloat(value);
  if (!Number.isFinite(offset)) return shown.x;
  if (value.trim().endsWith("%")) return shown.x + (offset / 100) * frameWidth;
  const drawn = element.offsetWidth;
  return drawn > 0 ? shown.x + (offset / drawn) * frameWidth : shown.x;
}

/**
 * The scene. The mage stands where its activity leads it and walks there from where it stands; where
 * the activity leaves it standing, it keeps the place of the previous reading, and at a first draw,
 * which has none, it stands in the clearing.
 */
export function Scene({
  state,
  width,
  height,
  events = NO_EVENTS,
}: SceneProps) {
  const drawing = sceneDrawing(state);
  const [shown, setShown] = useState<Shown | null>(null);
  const [seenEvents, setSeenEvents] = useState(events);
  const [lastState, setLastState] = useState(state);
  const [effects, setEffects] = useState<Effects>({ serial: 0, shown: null });
  const [tint, setTint] = useState<TintShown | null>(null);
  const mageRef = useRef<HTMLDivElement>(null);

  // Adjusted while rendering, as the props change: a first draw, and a map run started among new
  // events, place the mage at its place at once.
  let current = shown;
  const fresh = events !== seenEvents;
  if (fresh) setSeenEvents(events);
  const started = fresh && events.some((e) => e.kind === "mapRunStarted");
  if (drawing !== null && (current === null || started)) {
    current = {
      x: placeOf(drawing, SCENE.clearingX),
      from: null,
      facing: current?.facing ?? "right",
      walk: (current?.walk ?? 0) + 1,
    };
    setShown(current);
  }

  const frameWidth = drawing?.mage.idle.width ?? 0;
  const next =
    drawing === null || current === null ? null : placeOf(drawing, current.x);

  // The effect of a gathering's end, from the previous reading and the events of this one, made only
  // where the scene goes on: an effect whose turn comes at a stop is overdue and dropped (D-317). A
  // map run started, or no map run, leaves none.
  let effect = effects;
  if (drawing === null || started) {
    if (effect.shown !== null) {
      effect = { ...effect, shown: null };
      setEffects(effect);
    }
  } else if (state !== lastState) {
    if (fresh && drawing.standing === "going" && current !== null) {
      // The effect belongs to the mage that gathered, at the place it stands or walks to at the previous
      // reading, and not at where the action that starts in this reading leads it.
      const made = sceneEffect(lastState, state, events, current.x);
      if (made !== null) {
        effect = { serial: effect.serial + 1, shown: made };
        setEffects(effect);
      }
    }
  }
  if (state !== lastState) setLastState(state);

  // The tint of the light, from the streak and the completion of the reading: it stands at once at a
  // first draw and at a map run started, and otherwise follows the reading as `tintShown` gives.
  let lit = tint;
  if (drawing === null) {
    if (lit !== null) {
      lit = null;
      setTint(lit);
    }
  } else {
    lit = tintShown(tint, drawing.tint, drawing.standing, started);
    if (lit !== tint) setTint(lit);
  }
  const pending = current !== null && next !== current.x ? next : null;

  // A new place starts a walk from where the mage stands now, which only the browser knows on the
  // way: the walk's offset reached is read from the element before the new walk replaces it, and the
  // render that follows, before the browser paints, starts the walk on a new element.
  useLayoutEffect(() => {
    if (pending === null || shown === null) return;
    const from = reachedX(mageRef.current, shown, frameWidth);
    setShown(
      from === pending
        ? { ...shown, x: pending, from: null }
        : {
            ...shown,
            x: pending,
            from,
            facing: pending > from ? "right" : "left",
            walk: shown.walk + 1,
          },
    );
  }, [pending, shown, frameWidth]);

  if (drawing === null || current === null || lit === null) return null;
  const frame = drawing.background;
  const mage: ScenePlacedSprite = {
    ...drawing.mage.idle,
    x: current.x,
    y: SCENE.groundLine,
  };
  const walk = current.walk;
  const walking = current.from !== null;
  const mageStyle = walking
    ? ({
        ...boxOf(mage, frame),
        "--walk-start": percent((current.from ?? 0) - current.x, frameWidth),
      } as CSSProperties)
    : boxOf(mage, frame);
  // The walk has ended where CSS has run it to its place: the mage stands there from now on, so a
  // scene hidden and shown again, which starts its animations anew, does not walk it again.
  const onAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    setShown((now) =>
      now !== null && now.walk === walk && now.from !== null
        ? { ...now, from: null }
        : now,
    );
  };
  const effectEnded =
    (serial: number) => (event: AnimationEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      setEffects((now) =>
        now.serial === serial ? { ...now, shown: null } : now,
      );
    };
  // A return to the cool tint that has run to its end is over: the layer stands where it is from now
  // on, so a scene hidden and shown again, which starts its animations anew, does not run it again.
  const tintSerial = lit.serial;
  const tintReturned = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    setTint((now) =>
      now !== null && now.serial === tintSerial && now.from !== null
        ? { ...now, from: null }
        : now,
    );
  };
  const tintStyle = {
    "--tint": lit.shown,
    ...(lit.from === null ? {} : { "--tint-start": lit.from }),
  } as CSSProperties;
  // The badge of one action is one element from reading to reading, so its bar fills on; a new action,
  // which starts at a later minute, gets one of its own, which starts empty.
  const action = state.run?.current?.startMinute;
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
      {effect.shown === null || effect.shown.kind !== "dust" ? null : (
        <Effect
          key={`effect-${effect.serial}`}
          effect={effect.shown}
          frame={frame}
          onEnd={effectEnded(effect.serial)}
        />
      )}
      <div
        key={walk}
        ref={mageRef}
        className="scene-mage"
        data-walking={walking ? "" : undefined}
        data-bending={drawing.mage.bending ? "" : undefined}
        data-bend-facing={drawing.mage.bendFacing ?? undefined}
        data-facing={current.facing}
        style={mageStyle}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="scene-mage-sprite">
          <Sheet sprite={drawing.mage.idle} className="scene-mage-idle" />
          <Sheet sprite={drawing.mage.run} className="scene-mage-run" />
          <Sheet sprite={drawing.mage.bend} className="scene-mage-bend" />
        </div>
      </div>
      {effect.shown === null || effect.shown.kind !== "flight" ? null : (
        <Effect
          key={`effect-${effect.serial}`}
          effect={effect.shown}
          frame={frame}
          onEnd={effectEnded(effect.serial)}
        />
      )}
      <div
        key={`tint-${lit.serial}`}
        className="scene-tint"
        data-returning={lit.from === null ? undefined : ""}
        style={tintStyle}
        onAnimationEnd={tintReturned}
      />
      {drawing.frost === 0 ? null : (
        <Frost thickness={drawing.frost} frame={frame} />
      )}
      <div
        key={`badge-${walk}`}
        className="scene-badge-carrier"
        data-walking={walking ? "" : undefined}
        style={mageStyle}
      >
        {drawing.badge === null ? null : (
          <Badge key={action} badge={drawing.badge} />
        )}
      </div>
    </div>
  );
}
