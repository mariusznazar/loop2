/**
 * What the scene of a map run keeps from one reading to the next, and its advance from one reading to
 * the next (D-04, D-316, D-317, D-322): how it shows the mage, the events of the last simulation call it
 * has seen, the game state of its previous reading, the effect of a gathering's end and the creature's
 * effect it shows, the tint of its light and the moment in which time stands still. All of it is the
 * scene's own memory and never the game state. The scene advances its memory while it draws, from the
 * state and the events it is drawn from, and ends a walk, an effect, a return of the tint or the effect
 * of a moment where its animation runs out or is cancelled. Each of these is a pure function, which
 * returns the memory it was given where nothing changes, so that a scene drawn again on the same reading
 * changes nothing. Nothing runs when the module is imported.
 */
import { SCENE } from "../sim/data/scene.js";
import type { GameEvent } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import {
  creatureEffect,
  creaturePlace,
  momentBegins,
  sceneEffect,
  tintShown,
} from "./scene-picture.js";
import type {
  CreaturePlace,
  SceneCreatureEffect,
  SceneDrawing,
  SceneEffect,
  TintShown,
} from "./scene-picture.js";

/** The way the mage faces; its sheets face right. */
export type Facing = "right" | "left";

/**
 * How the scene shows the mage, kept from reading to reading: the left edge of its frame where it
 * stands or walks to, in the scene's pixels; where a walk started, or null while it stands; the way it
 * faces; and the number of the walk, or of the placing at a first draw or a map run started, which keys
 * the mage's element, so each starts on a new one, its badge included.
 */
export type Shown = {
  x: number;
  from: number | null;
  facing: Facing;
  walk: number;
};

/**
 * The effect the scene shows, with the number that keys its element: each new effect starts on an
 * element of its own, and the number tells the effect that has ended from a newer one.
 */
export type Effects<Kind> = { serial: number; shown: Kind | null };

/**
 * The moment in which time stands still that the scene shows, kept from reading to reading: its key,
 * and whether its effect plays. It plays only in the reading in which the moment begins; a scene drawn
 * again on the same moment, or on one that has played, stands on its last image, which is the style of
 * the elements with no animation, so that nothing but the effect is ever an animation (D-322).
 */
export type MomentShown = { key: string; playing: boolean };

/**
 * What the scene keeps from reading to reading: how it shows the mage, null until it draws a map run;
 * the events of the last simulation call it has seen, so that it tells new ones; the game state of its
 * previous reading; the effect of a gathering's end and the creature's effect it shows; the tint of its
 * light, null until it draws a map run; and the moment in which time stands still that it shows.
 */
export type SceneMemory = {
  shown: Shown | null;
  seenEvents: readonly GameEvent[];
  lastState: GameState;
  effects: Effects<SceneEffect>;
  creatureEffects: Effects<SceneCreatureEffect>;
  tint: TintShown | null;
  moment: MomentShown | null;
};

/**
 * A reading as the memory takes it: the game state, the scene's drawing of it, the events of the
 * simulation call, whether they are new to the scene and whether a map run started among them.
 */
type Reading = {
  state: GameState;
  drawing: SceneDrawing | null;
  events: readonly GameEvent[];
  fresh: boolean;
  started: boolean;
};

/** The memory of a scene before its first draw, which has seen the state and the events it is drawn from. */
export function firstMemory(
  state: GameState,
  events: readonly GameEvent[],
): SceneMemory {
  return {
    shown: null,
    seenEvents: events,
    lastState: state,
    effects: { serial: 0, shown: null },
    creatureEffects: { serial: 0, shown: null },
    tint: null,
    moment: null,
  };
}

/**
 * Where the drawing leads the mage: the place of its goal, or, where its goal is to stay, the place it
 * has reached, which `reached` gives and which is read only where the goal is to stay (D-318, D-319).
 */
export function placeOf(drawing: SceneDrawing, reached: () => number): number {
  const { goal } = drawing.mage;
  return goal.kind === "at" ? goal.place.x : reached();
}

/**
 * Where the creature that attacks stands, from the place the mage stands at; null where the drawing
 * has no creature or the scene does not show the mage yet.
 */
export function creatureStands(
  drawing: SceneDrawing | null,
  shown: Shown | null,
): CreaturePlace | null {
  return drawing === null || drawing.creature === null || shown === null
    ? null
    : creaturePlace(
        shown.x,
        drawing.mage.idle.width,
        drawing.creature.bite.width,
        drawing.background.width,
      );
}

/**
 * How the scene shows the mage after a reading: a first draw, and a map run started among new events,
 * place the mage at its place at once; and the mage turns toward the creature that attacks where it
 * stands still and keeps the way it faces after the fight (D-316).
 */
function mageAfter(shown: Shown | null, reading: Reading): Shown | null {
  const { drawing } = reading;
  let current = shown;
  if (drawing !== null && (current === null || reading.started))
    current = {
      x: placeOf(drawing, () => SCENE.clearingX),
      from: null,
      facing: current?.facing ?? "right",
      walk: (current?.walk ?? 0) + 1,
    };
  const place = creatureStands(drawing, current);
  if (
    place !== null &&
    current !== null &&
    current.from === null &&
    current.facing !== place.side
  )
    current = { ...current, facing: place.side };
  return current;
}

/**
 * The effect of a gathering's end and the creature's effect after a reading, from the previous reading
 * and the events of this one, made only where the scene goes on: an effect whose turn comes at a stop
 * is overdue and dropped (D-317). A map run started, or no map run, leaves none. Each effect stands at
 * the place the mage stands at or walks to at the previous reading, `shown`, and not at where the
 * action that starts in this reading leads it.
 */
function effectsAfter(
  memory: SceneMemory,
  reading: Reading,
  shown: Shown | null,
): Pick<SceneMemory, "effects" | "creatureEffects"> {
  const { effects, creatureEffects, lastState } = memory;
  const { state, drawing, events } = reading;
  if (drawing === null || reading.started)
    return {
      effects: effects.shown === null ? effects : { ...effects, shown: null },
      creatureEffects:
        creatureEffects.shown === null
          ? creatureEffects
          : { ...creatureEffects, shown: null },
    };
  if (
    state === lastState ||
    !reading.fresh ||
    drawing.standing !== "going" ||
    shown === null
  )
    return { effects, creatureEffects };
  const made = sceneEffect(lastState, state, events, shown.x);
  // The creature's effect of the same reading is kept apart: the minute that ends a gathering can also
  // bring the attack, and each effect belongs to its own part of the scene.
  const madeCreature = creatureEffect(
    lastState,
    state,
    events,
    shown.x,
    drawing.mage.idle.width,
    drawing.background.width,
  );
  return {
    effects:
      made === null ? effects : { serial: effects.serial + 1, shown: made },
    creatureEffects:
      madeCreature === null
        ? creatureEffects
        : { serial: creatureEffects.serial + 1, shown: madeCreature },
  };
}

/**
 * The moment in which time stands still after a reading, a discovery, a death or a completion: its
 * effect plays in the reading whose events carry it and, as the first draw of a scene has no such
 * events, not at a redraw, after a return to the screen or a load, where the scene stands on its last
 * image at once.
 */
function momentAfter(
  moment: MomentShown | null,
  reading: Reading,
): MomentShown | null {
  const { drawing } = reading;
  if (drawing === null || drawing.moment === null) return null;
  if (moment !== null && moment.key === drawing.moment.key) return moment;
  return {
    key: drawing.moment.key,
    playing: reading.fresh && momentBegins(drawing.standing, reading.events),
  };
}

/**
 * The memory after the reading of `state`, drawn as `drawing`, with the events of the simulation call
 * that returned it; the memory given where the reading changes nothing in it. The tint of the light
 * stands at once at a first draw and at a map run started, and otherwise follows the reading as
 * `tintShown` gives.
 */
export function advanceMemory(
  memory: SceneMemory,
  state: GameState,
  drawing: SceneDrawing | null,
  events: readonly GameEvent[],
): SceneMemory {
  const fresh = events !== memory.seenEvents;
  const started = fresh && events.some((e) => e.kind === "mapRunStarted");
  const reading: Reading = { state, drawing, events, fresh, started };
  const shown = mageAfter(memory.shown, reading);
  const { effects, creatureEffects } = effectsAfter(memory, reading, shown);
  const tint =
    drawing === null
      ? null
      : tintShown(memory.tint, drawing.tint, drawing.standing, started);
  const moment = momentAfter(memory.moment, reading);
  const unchanged =
    shown === memory.shown &&
    events === memory.seenEvents &&
    state === memory.lastState &&
    effects === memory.effects &&
    creatureEffects === memory.creatureEffects &&
    tint === memory.tint &&
    moment === memory.moment;
  return unchanged
    ? memory
    : {
        shown,
        seenEvents: events,
        lastState: state,
        effects,
        creatureEffects,
        tint,
        moment,
      };
}

/**
 * The memory after a walk to `place` starts from `from`, where the mage stands now, which only the
 * browser knows on the way: a mage already there stands, and any other walks there on a new element,
 * facing the way it goes.
 */
export function walkStarted(
  memory: SceneMemory,
  shown: Shown,
  place: number,
  from: number,
): SceneMemory {
  return {
    ...memory,
    shown:
      from === place
        ? { ...shown, x: place, from: null }
        : {
            ...shown,
            x: place,
            from,
            facing: place > from ? "right" : "left",
            walk: shown.walk + 1,
          },
  };
}

/**
 * The memory after the walk numbered `walk` has ended, run to its place or cancelled: the mage stands
 * at the walk's place from now on, so a scene hidden and shown again, which starts its animations anew,
 * does not walk it again from where it set out.
 */
export function walkEnded(memory: SceneMemory, walk: number): SceneMemory {
  const now = memory.shown;
  return now !== null && now.walk === walk && now.from !== null
    ? { ...memory, shown: { ...now, from: null } }
    : memory;
}

/**
 * The memory after the effect of a gathering's end numbered `serial` has ended, run out or cancelled:
 * it is dropped, so a scene hidden and shown again does not play an effect that is overdue (D-317).
 */
export function effectEnded(memory: SceneMemory, serial: number): SceneMemory {
  const now = memory.effects;
  return now.serial === serial
    ? { ...memory, effects: { ...now, shown: null } }
    : memory;
}

/** The memory after the creature's effect numbered `serial` has ended, as `effectEnded` gives. */
export function creatureEffectEnded(
  memory: SceneMemory,
  serial: number,
): SceneMemory {
  const now = memory.creatureEffects;
  return now.serial === serial
    ? { ...memory, creatureEffects: { ...now, shown: null } }
    : memory;
}

/**
 * The memory after the return to the cool tint numbered `serial` has run to its end or was cut: the
 * layer stands where it is from now on, so a scene hidden and shown again does not run it again.
 */
export function tintReturned(memory: SceneMemory, serial: number): SceneMemory {
  const now = memory.tint;
  return now !== null && now.serial === serial && now.from !== null
    ? { ...memory, tint: { ...now, from: null } }
    : memory;
}

/** The memory after the effect of the moment `moment` has ended: the scene stands on its last image. */
export function momentSettled(
  memory: SceneMemory,
  moment: MomentShown,
): SceneMemory {
  return { ...memory, moment: { ...moment, playing: false } };
}
