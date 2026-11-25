/**
 * The scene of the world area of the screen of a map run (D-316 to D-322, D-272, D-43, D-04): over
 * the forest of D-314 the props, the campfire while one stands on the character's tile, the mage
 * with its idle and run sheets and, over its head, the badge — the icon of the current action drawn
 * as the mask of `.icon-mask` and under it the bar of the action's progress. Its files, places and
 * frame counts come from `sceneDrawing`, the view names none. A place and a size are percentages of
 * the frame and a frame count a custom property, so the stylesheet holds no length of a sprite and
 * the scene is right at either of its two sizes, once and twice its picture (D-349). The small
 * elements, the badge and the plaques, keep sizes of their own in the stylesheet, which do not follow
 * the scale of the scene.
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
 * risk); a walk starts on a new element, which starts its animations afresh. A walk that ends, or that
 * a browser cancels because the scene is hidden, leaves the mage standing at the walk's place, so a
 * scene shown again does not walk it from where it set out. An effect, the wolf's run in and the return
 * of the tint that a browser cancels the same way are over too, so a scene shown again does not play
 * them from their start. What the scene keeps from reading to reading, and its advance from one reading
 * to the next, stand in `scene-memory.ts`.
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
 * plaque lies the layer of the tint of the scene's light, `mix-blend-mode: color`, over that the cold
 * layer after a death of cold, and over that the frost on the edges of the frame, the specks of light
 * after a completion and the plaques of a discovery; the badge over the mage's head, on its solid
 * `panel`, lies over all of them (D-315, D-316, D-320, D-322). The tint and the frost are drawn from the game state like
 * the rest: the tint and the thickness of the frost come to the stylesheet as numbers, and the
 * stylesheet takes every colour from the design tokens (D-43). A loss of the streak takes the tint back
 * to the cool one over 2 s on a new element of the layer, started where the scene goes on (D-317).
 *
 * In the three moments in which time stands still, a discovery, a death and a completion, the scene
 * shows an effect that plays once and then stands on its last image until the moment ends (D-322): the
 * icons of what was discovered come out of the forest on plaques, the
 * mage falls in the frames of its death sheet, with the cold layer over the whole scene after a death of
 * cold, and specks of light rise over the clearing. The scene tells a moment that has just begun from one
 * drawn again by the events of the simulation call (D-04), as it tells a map run started: only the reading
 * whose events carry the discovery, the death or the completion plays the effect, and a scene drawn again
 * on the same moment, after a return to the screen, a reload or a load, stands on its last image at once,
 * which is the style of the elements with no animation, as it does under the system's setting for reduced
 * motion. The effect's own animation ends in the end of the effect, and the scene tells the screen, which
 * tells the game view, so that the end-of-run window opens only after it. A scene hidden while the effect
 * runs, which a browser cancels the animations of, stands on the last image too.
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
import {
  advanceMemory,
  creatureEffectEnded,
  creatureStands,
  effectEnded,
  firstMemory,
  momentSettled,
  placeOf,
  tintReturned,
  walkEnded,
  walkStarted,
} from "./scene-memory.js";
import type { Facing, Shown } from "./scene-memory.js";
import { sceneDrawing, scuffleCloud } from "./scene-picture.js";
import type {
  CreaturePlace,
  SceneCreature,
  SceneCreatureEffect,
  SceneDrawing,
  SceneEffect,
  SceneMoment,
  SceneSprite,
  ScenePlacedSprite,
} from "./scene-picture.js";

export type SceneProps = {
  /** The game state the scene draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /**
   * The size the scene's picture is given, a whole multiple of its frame: the larger of its two sizes,
   * which the stylesheet changes to the smaller in a phone layout too narrow for it (D-349).
   */
  width: number;
  height: number;
  /**
   * The events of the simulation call that returned `state`; a map run started among them places the
   * mage at once. None where the scene is drawn again from the same call.
   */
  events?: readonly GameEvent[];
  /**
   * Called when the effect of a moment in which time stands still has ended: its last animation has run
   * out, or the scene was hidden while it ran, so that the scene stands on the moment's last image. The
   * screen tells the game view, which opens the end-of-run window only then (D-322, D-311).
   */
  onEffectEnd?: () => void;
};

/**
 * One scene pixel as a percentage of the frame's width and of its height, with six decimals, so that
 * the frost built of whole pixels keeps to the scene's grid at either size of the scene (D-349).
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
export function Sheet({
  sprite,
  className,
  momentKey,
  onAnimationEnd,
}: {
  sprite: SceneSprite;
  className?: string;
  /** The key of the moment the sheet's life animation tells the end of, where it does. */
  momentKey?: string;
  onAnimationEnd?: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={
        className === undefined ? "scene-sheet" : `scene-sheet ${className}`
      }
      data-moment-key={momentKey}
      style={{ "--frames": sprite.frames } as CSSProperties}
      onAnimationEnd={onAnimationEnd}
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
 * The icons of what a discovery revealed, each on a plaque on `panel` with a frame in `discovery`
 * (D-322), over the whole frame so that a percentage is a part of it. Each plaque stands at its place
 * over the clearing, which is its style where no animation runs, and comes out of the forest, from
 * where the data gives, when its effect plays: its layer carries it from there, and `--index` delays
 * each by its turn in the row. The container's own animation, as long as the last plaque's, tells the
 * end of the effect.
 */
function Plaques({
  moment,
  frame,
  onEnd,
}: {
  moment: Extract<SceneMoment, { kind: "discovery" }>;
  frame: SceneSprite;
  onEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      key={moment.key}
      className="scene-discovery scene-moment-part scene-moment-master"
      data-moment-key={moment.key}
      style={{ "--count": moment.plaques.length } as CSSProperties}
      onAnimationEnd={onEnd}
    >
      {moment.plaques.map((plaque, index) => (
        <div
          key={plaque.href}
          className="scene-discovery-item scene-moment-part"
          style={
            {
              "--index": index,
              "--from-x": percent(plaque.from.x - plaque.x, frame.width),
              "--from-y": percent(plaque.from.y - plaque.y, frame.height),
            } as CSSProperties
          }
        >
          <div
            className="scene-discovery-plaque"
            style={{
              left: percent(plaque.x, frame.width),
              top: percent(plaque.y, frame.height),
            }}
          >
            <span
              className="icon-mask"
              aria-hidden="true"
              style={{ "--icon": `url("${plaque.href}")` } as CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The specks of light after a completion (D-322): squares of one pixel of the scene on its grid, each
 * at its place, rising by whole pixels and going out, the last of them `--latest` milliseconds after the
 * first starts. They stand only while the effect plays; the last image has none. The container's own
 * animation tells the end of the effect.
 */
function Specks({
  moment,
  frame,
  onEnd,
}: {
  moment: Extract<SceneMoment, { kind: "completion" }>;
  frame: SceneSprite;
  onEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  const latest = Math.max(...moment.specks.map((speck) => speck.delay));
  return (
    <div
      key={moment.key}
      className="scene-specks scene-moment-part scene-moment-master"
      data-moment-key={moment.key}
      style={
        {
          "--latest": latest,
          "--pixel-x": pixel(frame.width),
          "--pixel-y": pixel(frame.height),
        } as CSSProperties
      }
      onAnimationEnd={onEnd}
    >
      {moment.specks.map((speck, index) => (
        <span
          key={index}
          className="scene-speck scene-moment-part"
          data-shade={speck.shade}
          style={
            {
              left: percent(speck.x, frame.width),
              top: percent(speck.y, frame.height),
              "--rise": speck.rise,
              "--delay": speck.delay,
            } as CSSProperties
          }
        />
      ))}
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
  effect: Extract<SceneEffect, { kind: "flight" | "dust" }>;
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

/** The way a creature faces for the side of the mage it stands on: toward the mage, its sheets facing left. */
function creatureFaces(place: CreaturePlace): Facing {
  return place.side === "right" ? "left" : "right";
}

/**
 * The creature that attacks, standing beside the mage at the place of `place`: its idle, run and bite
 * sheets one over the other, the bite sheet shown while it fights and the idle sheet while it only
 * stands. At the reading of its attack it runs in from the right edge of the frame on its run sheet
 * (`entering`), and the end of that animation tells the scene the effect is over; at every other time,
 * and under the system's setting for reduced motion, it stands at its place at once. Its sheets face
 * left, so a creature on the left of the mage is mirrored, the figure alone.
 */
function Creature({
  creature,
  place,
  frame,
  entering,
  onEnd,
}: {
  creature: SceneCreature;
  place: CreaturePlace;
  frame: SceneSprite;
  entering: boolean;
  onEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  const placed: ScenePlacedSprite = {
    ...creature.bite,
    x: place.x,
    y: SCENE.groundLine + creature.sink,
  };
  const style = {
    ...boxOf(placed, frame),
    "--from-x": percent(frame.width - place.x, creature.bite.width),
  } as CSSProperties;
  return (
    <div
      className="scene-creature"
      data-facing={creatureFaces(place)}
      data-scuffling={creature.scuffling ? "" : undefined}
      data-entering={entering ? "" : undefined}
      style={style}
      onAnimationEnd={onEnd}
    >
      <div className="scene-creature-sprite">
        <Sheet sprite={creature.idle} className="scene-creature-idle" />
        <Sheet sprite={creature.run} className="scene-creature-run" />
        <Sheet sprite={creature.bite} className="scene-creature-bite" />
      </div>
    </div>
  );
}

/**
 * The cloud of a scuffle over the gap between the creature and the mage, its frames run again and again
 * by CSS for as long as the fight lasts; it stands still under the system's setting for reduced motion
 * and does not stand while the creature is running in.
 */
function Scuffle({
  creature,
  place,
  frame,
}: {
  creature: SceneCreature;
  place: CreaturePlace;
  frame: SceneSprite;
}) {
  const cloud = scuffleCloud(place, creature.cloud);
  return (
    <div className="scene-scuffle" style={boxOf(cloud, frame)}>
      <Sheet sprite={cloud} />
    </div>
  );
}

/**
 * The effect of a combat's end: the creature that was defeated falls in the frames of its death sheet and
 * lies where it stood, the one that departs runs off to the right edge of the frame, each at the place
 * the creature stood at. Its life lasts 300 ms and ends the way the other effects' do; under the system's
 * setting for reduced motion it appears still for that time, the fallen creature lying and the running
 * one on its first frame at its place.
 */
function CreatureEffect({
  effect,
  frame,
  onEnd,
}: {
  effect: Extract<
    SceneCreatureEffect,
    { kind: "creatureDown" | "creatureOut" }
  >;
  frame: SceneSprite;
  onEnd: (event: AnimationEvent<HTMLDivElement>) => void;
}) {
  const style = {
    ...boxOf(effect.sprite, frame),
    ...(effect.kind === "creatureOut"
      ? { "--run": percent(effect.run, effect.sprite.width) }
      : {}),
  } as CSSProperties;
  return (
    <div
      className="scene-effect scene-creature-effect"
      data-kind={effect.kind === "creatureDown" ? "down" : "out"}
      data-facing={effect.faces}
      style={style}
      onAnimationEnd={onEnd}
    >
      <div className="scene-creature-sprite">
        <Sheet sprite={effect.sprite} />
      </div>
    </div>
  );
}

/**
 * The way a dead mage lies: it falls toward the middle of the frame, so that the fallen mage, whose
 * sheet reaches the full width of its frame, lies inside the picture and not past its edge or under the
 * frost on it, whichever way it faced when it died (D-322). The sheet falls to the right.
 */
function fallFacing(mageX: number, frame: SceneSprite): Facing {
  return mageX + SCENE.mageMiddle > frame.width / 2 ? "left" : "right";
}

/**
 * The box of the mage's frame where it stands or walks to, in percentages of the frame, and on a walk
 * the offset it starts from, which CSS runs to none; the carrier of the badge takes the same box.
 */
function mageBox(drawing: SceneDrawing, shown: Shown): CSSProperties {
  const { idle } = drawing.mage;
  const box = boxOf(
    { ...idle, x: shown.x, y: SCENE.groundLine },
    drawing.background,
  );
  if (shown.from === null) return box;
  return {
    ...box,
    "--walk-start": percent(shown.from - shown.x, idle.width),
  } as CSSProperties;
}

/**
 * The ground of the scene, which its memory does not touch: the picture of the forest at the size it
 * is given, which sets the size of the frame, the props and the campfire, where one stands.
 */
function Ground({
  drawing,
  width,
  height,
}: {
  drawing: SceneDrawing;
  width: number;
  height: number;
}) {
  const frame = drawing.background;
  return (
    <>
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
    </>
  );
}

/** A handler of the end of an element's own animation, which the ends of its children's animations do not reach. */
function ownEnd(
  then: (element: HTMLDivElement) => void,
): (event: AnimationEvent<HTMLDivElement>) => void {
  return (event) => {
    if (event.target === event.currentTarget) then(event.currentTarget);
  };
}

/**
 * What the scene does where the browser cancels an animation of one of its parts, as it does when the
 * scene is hidden: it ends the walk, the effect of the moment of `key`, the creature's effect or run in,
 * the effect of a gathering's end or the return of the tint, as the end of that animation would.
 */
type Cancels = {
  walk: () => void;
  moment: (key: string) => void;
  creature: () => void;
  effect: () => void;
  tint: () => void;
};

/** The scene's element's ref, which listens on it for a cancelled animation of any of its parts. */
function watchCancel(ends: Cancels) {
  return (scene: HTMLDivElement | null) => {
    if (scene === null) return;
    const cancelled = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.matches(".scene-mage[data-walking]")) ends.walk();
      else if (target.matches(".scene-moment-master"))
        ends.moment(target.getAttribute("data-moment-key") ?? "");
      else if (target.matches(".scene-creature-effect")) ends.creature();
      else if (target.matches(".scene-effect")) ends.effect();
      else if (target.matches(".scene-creature[data-entering]"))
        ends.creature();
      else if (target.matches(".scene-tint[data-returning]")) ends.tint();
    };
    scene.addEventListener("animationcancel", cancelled);
    return () => scene.removeEventListener("animationcancel", cancelled);
  };
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
 * the activity leaves it standing, it keeps the place it has reached, which on a walk under way is
 * where the walk has brought it, and at a first draw, which has none, it stands in the clearing.
 */
export function Scene({
  state,
  width,
  height,
  events = NO_EVENTS,
  onEffectEnd,
}: SceneProps) {
  const drawing = sceneDrawing(state);
  const [kept, setKept] = useState(() => firstMemory(state, events));
  const mageRef = useRef<HTMLDivElement>(null);

  // Advanced while rendering, as the props change: what the scene keeps meets the state and the events
  // of this reading, and the render that follows draws from what it then keeps (`advanceMemory`).
  const memory = advanceMemory(kept, state, drawing, events);
  if (memory !== kept) setKept(memory);
  const { shown, effects, creatureEffects, tint, moment } = memory;

  const frameWidth = drawing?.mage.idle.width ?? 0;
  // Where the mage is led: where its goal is to stay, the place its walk under way has brought it to,
  // so that it stops there and does not run on to the place of that walk (D-318, D-319).
  const next =
    drawing === null || shown === null
      ? null
      : placeOf(drawing, () => reachedX(mageRef.current, shown, frameWidth));
  // Where the creature that attacks stands, from the place the mage stands at (D-316).
  const place = creatureStands(drawing, shown);
  const pending = shown !== null && next !== shown.x ? next : null;

  // A new place starts a walk from where the mage stands now, which only the browser knows on the
  // way: the walk's offset reached is read from the element before the new walk replaces it, and the
  // render that follows, before the browser paints, starts the walk on a new element.
  useLayoutEffect(() => {
    if (pending === null || shown === null) return;
    const from = reachedX(mageRef.current, shown, frameWidth);
    setKept((now) => walkStarted(now, shown, pending, from));
  }, [pending, shown, frameWidth]);

  if (drawing === null || shown === null || tint === null) return null;
  const frame = drawing.background;
  const playing = moment?.playing === true;
  const walk = shown.walk;
  const walking = shown.from !== null;
  const mageStyle = mageBox(drawing, shown);
  // A walk, an effect or a return of the tint ends where its own animation has run out, or where the
  // scene was hidden while it ran, which cancels it, and what the scene keeps no longer plays it, so a
  // scene hidden and shown again, which starts its animations anew, does not play it again (D-317).
  const walkOver = () => setKept((now) => walkEnded(now, walk));
  const effectSerial = effects.serial;
  const effectOver = () => setKept((now) => effectEnded(now, effectSerial));
  const creatureSerial = creatureEffects.serial;
  const creatureOver = () =>
    setKept((now) => creatureEffectEnded(now, creatureSerial));
  const tintSerial = tint.serial;
  const tintOver = () => setKept((now) => tintReturned(now, tintSerial));
  // The effect of a moment has ended where its last animation has run out, or where the scene was
  // hidden while it ran, which cancels the animations: from then on the scene stands on the last image,
  // so a scene hidden and shown again does not play it afresh, and the game view is told.
  const settle = (key: string) => {
    if (moment === null || moment.key !== key || !moment.playing) return;
    setKept((now) => momentSettled(now, moment));
    onEffectEnd?.();
  };
  const momentEnded = ownEnd((element) =>
    settle(element.getAttribute("data-moment-key") ?? ""),
  );
  const effectEnd = ownEnd(effectOver);
  const creatureEnd = ownEnd(creatureOver);
  const tintStyle = {
    "--tint": tint.shown,
    ...(tint.from === null ? {} : { "--tint-start": tint.from }),
  } as CSSProperties;
  // The badge of one action is one element from reading to reading, so its bar fills on; a new action,
  // which starts at a later minute, gets one of its own, which starts empty.
  const action = state.run?.current?.startMinute;
  return (
    <div
      ref={watchCancel({
        walk: walkOver,
        moment: settle,
        creature: creatureOver,
        effect: effectOver,
        tint: tintOver,
      })}
      className="scene"
      aria-hidden="true"
      data-standing={drawing.standing}
      data-moment={drawing.moment?.kind}
      data-moment-playing={playing ? "" : undefined}
    >
      <Ground drawing={drawing} width={width} height={height} />
      {effects.shown === null || effects.shown.kind !== "dust" ? null : (
        <Effect
          key={`effect-${effectSerial}`}
          effect={effects.shown}
          frame={frame}
          onEnd={effectEnd}
        />
      )}
      {drawing.creature === null || place === null ? null : (
        <Creature
          key={`creature-${drawing.creature.key}`}
          creature={drawing.creature}
          place={place}
          frame={frame}
          entering={
            creatureEffects.shown?.kind === "creatureIn" &&
            creatureEffects.shown.key === drawing.creature.key &&
            (drawing.standing === "going" || drawing.standing === "paused")
          }
          onEnd={creatureEnd}
        />
      )}
      {creatureEffects.shown === null ||
      (creatureEffects.shown.kind !== "creatureDown" &&
        creatureEffects.shown.kind !== "creatureOut") ? null : (
        <CreatureEffect
          key={`creature-effect-${creatureSerial}`}
          effect={creatureEffects.shown}
          frame={frame}
          onEnd={creatureEnd}
        />
      )}
      <div
        key={walk}
        ref={mageRef}
        className="scene-mage"
        data-walking={walking ? "" : undefined}
        data-bending={drawing.mage.bending ? "" : undefined}
        data-bend-facing={drawing.mage.bendFacing ?? undefined}
        data-facing={
          drawing.moment?.kind === "death"
            ? fallFacing(shown.x, frame)
            : shown.facing
        }
        style={mageStyle}
        onAnimationEnd={ownEnd(walkOver)}
      >
        <div className="scene-mage-sprite">
          <Sheet sprite={drawing.mage.idle} className="scene-mage-idle" />
          <Sheet sprite={drawing.mage.run} className="scene-mage-run" />
          <Sheet sprite={drawing.mage.bend} className="scene-mage-bend" />
          <Sheet
            sprite={drawing.mage.death}
            className="scene-mage-death scene-moment-part scene-moment-master"
            momentKey={
              drawing.moment?.kind === "death" ? drawing.moment.key : undefined
            }
            onAnimationEnd={momentEnded}
          />
        </div>
      </div>
      {drawing.creature === null ||
      place === null ||
      !drawing.creature.scuffling ? null : (
        <Scuffle
          key={`scuffle-${drawing.creature.key}`}
          creature={drawing.creature}
          place={place}
          frame={frame}
        />
      )}
      {effects.shown === null || effects.shown.kind !== "flight" ? null : (
        <Effect
          key={`effect-${effectSerial}`}
          effect={effects.shown}
          frame={frame}
          onEnd={effectEnd}
        />
      )}
      <div
        key={`tint-${tintSerial}`}
        className="scene-tint"
        data-returning={tint.from === null ? undefined : ""}
        style={tintStyle}
        onAnimationEnd={ownEnd(tintOver)}
      />
      {drawing.moment?.kind === "death" && drawing.moment.cold ? (
        <div
          className="scene-chill scene-moment-part"
          style={{ "--frames": drawing.mage.death.frames } as CSSProperties}
        />
      ) : null}
      {drawing.frost === 0 ? null : (
        <Frost thickness={drawing.frost} frame={frame} />
      )}
      {drawing.moment?.kind === "completion" && playing ? (
        <Specks moment={drawing.moment} frame={frame} onEnd={momentEnded} />
      ) : null}
      {drawing.moment?.kind === "discovery" ? (
        <Plaques moment={drawing.moment} frame={frame} onEnd={momentEnded} />
      ) : null}
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
