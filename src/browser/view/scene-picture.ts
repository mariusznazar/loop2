import { ACTIONS } from "../sim/data/actions.js";
import type { ArchetypeId } from "../sim/data/archetypes.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { MAPS } from "../sim/data/maps.js";
import type { SolvingDef } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { ResourceId } from "../sim/data/resources.js";
import {
  SCENE,
  SCENE_DUST,
  SCENE_EFFECTS,
  SCENE_FIRE,
  SCENE_FROST,
  SCENE_MAGES,
  SCENE_MOMENTS,
  SCENE_PROPS,
  SCENE_TINT,
} from "../sim/data/scene.js";
import type {
  ScenePicture,
  ScenePropSpot,
  SceneSpeck,
  SceneSpot,
} from "../sim/data/scene.js";
import type { GameEvent } from "../sim/game.js";
import { sameHex } from "../sim/hex.js";
import type { GameMapRun, GameState, Understanding } from "../sim/types.js";

/** How the scene stands: going, stopped by the player's pause, at a discovery, after a death or after a completion. */
export type SceneStanding =
  "going" | "paused" | "discovery" | "dead" | "completed";

/** A picture as the view draws it: its URL and the size and the frames of one frame. */
export type SceneSprite = {
  href: string;
  width: number;
  height: number;
  frames: number;
};

/** A sprite placed in the scene: its left edge and the line it stands on, in the scene's pixels. */
export type ScenePlacedSprite = SceneSprite & { x: number; y: number };

/** Where the mage goes: to a place, or nowhere, where it stays as the scene had it before. */
export type MageGoal =
  { kind: "stays" } | { kind: "at"; place: { x: number; y: number } };

/** A point of the scene, in its pixels. */
export type ScenePoint = { x: number; y: number };

/** An icon of what a discovery revealed on its plaque: where the plaque stands and where it comes out of the forest. */
export type ScenePlaque = {
  href: string;
  x: number;
  y: number;
  from: ScenePoint;
};

/**
 * The moment in which time stands still that the scene shows (D-322), with the key that tells one
 * moment from the next: a discovery, a death or a completion of the map run. A discovery shows the
 * icons of what it revealed, a death the mage's fall and, after a death of cold, the cold layer over
 * the whole scene, a completion the specks of light rising over the clearing. What each moment looks
 * like when it has played is this same drawing, standing still.
 */
export type SceneMoment =
  | { kind: "discovery"; key: string; plaques: ScenePlaque[] }
  | { kind: "death"; key: string; cold: boolean }
  | { kind: "completion"; key: string; specks: readonly SceneSpeck[] };

/** The scene of the map run as plain data for drawing; pure, no DOM, no URL built from a name. */
export type SceneDrawing = {
  standing: SceneStanding;
  background: SceneSprite;
  mage: {
    idle: SceneSprite;
    run: SceneSprite;
    bend: SceneSprite;
    death: SceneSprite;
    goal: MageGoal;
    /** Whether the mage is gathering, so it bends in a loop where it stands at its place. */
    bending: boolean;
    /**
     * The way the bending mage faces, toward its prop as the data gives it; null where it does not
     * bend or where its resource has no prop, so it bends as it faces.
     */
    bendFacing: "right" | "left" | null;
  };
  /** The props, always, each with the resource it shows. */
  props: (ScenePlacedSprite & { resource: ResourceId })[];
  /**
   * The campfire on the character's tile, burning or extinguished; null where none stands. A burning
   * fire's sprite is the full flame's, or the smaller flame's in the last minutes of its burning.
   */
  fire: (ScenePlacedSprite & { burning: boolean }) | null;
  /** The badge over the mage: its icon and the progress of the action from 0 to 1; null without one. */
  badge: { href: string; progress: number } | null;
  /**
   * How far the tint of the scene's light has gone from its cool end to its warm one, from 0 to 1:
   * the streak over the one the map's condition asks for up to `SCENE_TINT.requiredShare`, and 1 only
   * at a completion.
   */
  tint: number;
  /** The thickness of the frost on the frame's edges in the scene's pixels, a whole number from 0 up. */
  frost: number;
  /** The moment in which time stands still that the scene shows; null while the map run goes on or is paused by the player. */
  moment: SceneMoment | null;
};

const STAYS: MageGoal = { kind: "stays" };
const PROPS: Partial<Record<ResourceId, ScenePropSpot>> = SCENE_PROPS;
const MAGES: Record<
  ArchetypeId,
  {
    idle: ScenePicture;
    run: ScenePicture;
    bend: ScenePicture;
    death: ScenePicture;
  }
> = SCENE_MAGES;

function spriteOf(picture: ScenePicture): SceneSprite {
  return {
    href: `/sprites/${picture.file}`,
    width: picture.width,
    height: picture.height,
    frames: picture.frames,
  };
}

function placedOf(spot: SceneSpot): ScenePlacedSprite {
  return { ...spriteOf(spot.picture), x: spot.place.x, y: spot.place.y };
}

/** The mage's place on the ground line, at the left edge given. */
function at(x: number): MageGoal {
  return { kind: "at", place: { x, y: SCENE.groundLine } };
}

/** Where the mage goes at the current activity; in combat and after an end it stays. */
function goalOf(run: GameMapRun): MageGoal {
  const { current } = run;
  if (run.death !== null || run.completion !== null || current === null)
    return STAYS;
  const { activity } = current;
  if (activity.kind === "wait") return at(SCENE.clearingX);
  const { action } = activity;
  switch (action.kind) {
    case "gather":
    case "patrol": {
      const prop = PROPS[action.resource];
      return prop === undefined ? STAYS : at(prop.mageAt);
    }
    case "craftCampfire":
    case "lightCampfire":
    case "feedCampfire":
      return at(SCENE_FIRE.mageAt);
    case "explore":
    case "wander":
    case "walkTo":
    case "walkToCampfire":
      return at(SCENE.rightEdgeX);
    case "lightItem":
    case "eat":
    case "strikeWithStick":
    case "kick":
    case "dodge":
      return STAYS;
  }
}

/** How the scene stands; the reasons ordered as the game states them, the death first. */
function standingOf(state: GameState, run: GameMapRun): SceneStanding {
  if (run.death !== null) return "dead";
  if (run.completion !== null) return "completed";
  if (state.discovery !== null) return "discovery";
  if (state.paused) return "paused";
  return "going";
}

/** The url of an icon of the game, as the badge over the mage's head takes it. */
function iconHref(icon: string): string {
  return `/icons/${icon}.svg`;
}

/**
 * The plaques of what a discovery revealed: the icon of each action and each item, the campfire's
 * included, that the data gives one, each icon once however many things share it. What has no icon in
 * the data, a condition, a creature or a skill tree, has no plaque; the band over the program names
 * it (D-122). The plaques stand in rows over the clearing, each row centred (D-322).
 */
function plaquesOf(discovery: Understanding): ScenePlaque[] {
  const icons = new Set([
    ...discovery.actions.map((kind) => iconHref(ACTIONS[kind].icon)),
    ...discovery.items.map((id) =>
      iconHref(id === CAMPFIRE.id ? CAMPFIRE.icon : RESOURCES[id].icon),
    ),
  ]);
  const { centreX, y, step, perRow, rowStep, from } = SCENE_MOMENTS.discovery;
  return [...icons].map((href, index) => {
    const row = Math.floor(index / perRow);
    const inRow = Math.min(perRow, icons.size - row * perRow);
    const x = centreX + (index - row * perRow - (inRow - 1) / 2) * step;
    return {
      href,
      x,
      y: y - row * rowStep,
      from: x < centreX ? from.left : from.right,
    };
  });
}

/**
 * The moment in which time stands still that the scene shows, from how it stands: the plaques of a
 * discovery, the fall of a dead mage with the cold layer after a death of cold, and the specks of
 * light after a completion (D-322). A death and a completion come before a discovery of the same game
 * minute, so such a minute shows the effect of the end alone.
 */
function momentOf(
  state: GameState,
  run: GameMapRun,
  standing: SceneStanding,
): SceneMoment | null {
  if (standing === "dead" && run.death !== null)
    return {
      kind: "death",
      key: `death:${run.death.minute}`,
      cold: run.death.cause === "cold",
    };
  if (standing === "completed" && run.completion !== null)
    return {
      kind: "completion",
      key: `completion:${run.completion.minute}`,
      specks: SCENE_MOMENTS.specks,
    };
  if (standing === "discovery" && state.discovery !== null)
    return {
      kind: "discovery",
      key: `discovery:${run.minute}`,
      plaques: plaquesOf(state.discovery),
    };
  return null;
}

/**
 * Whether the events of a simulation call say that the moment of a standing has just begun: the
 * discovery, the death or the completion of that call. A scene drawn again from the same state, after
 * a return to the screen, a reload or a load, has none of them and shows the last image of the moment
 * at once (D-322, D-04).
 */
export function momentBegins(
  standing: SceneStanding,
  events: readonly GameEvent[],
): boolean {
  const kind =
    standing === "discovery"
      ? "discovered"
      : standing === "dead"
        ? "characterDied"
        : standing === "completed"
          ? "mapRunCompleted"
          : null;
  return kind !== null && events.some((event) => event.kind === kind);
}

/** Whether the events of a simulation call carry the end of the map run that the scene shows as an effect, a death or a completion. */
export function endEffectBegins(events: readonly GameEvent[]): boolean {
  return momentBegins("dead", events) || momentBegins("completed", events);
}

/**
 * The badge of the current action: its icon as the rule's row shows it, and its progress, the game
 * minutes since its start with the fraction of a minute the carry holds, over its length.
 */
function badgeOf(
  state: GameState,
  run: GameMapRun,
): { href: string; progress: number } | null {
  const { current } = run;
  if (
    current === null ||
    current.activity.kind === "wait" ||
    run.death !== null ||
    run.completion !== null
  )
    return null;
  const length = current.endMinute - current.startMinute;
  const passed = run.minute - current.startMinute + state.realMsCarry / 1000;
  return {
    href: iconHref(ACTIONS[current.activity.action.kind].icon),
    progress: Math.min(1, Math.max(0, passed / length)),
  };
}

/**
 * The campfire on the character's tile, burning while it has minutes left; null without one. The
 * burning fire shows the smaller flame while its minutes left are the last ones, and the extinguished
 * fire is always the full sheet (D-316).
 */
function fireOf(
  run: GameMapRun,
): (ScenePlacedSprite & { burning: boolean }) | null {
  const campfire = run.campfires.find((c) => sameHex(c.at, run.character.at));
  if (campfire === undefined) return null;
  const burning = campfire.minutesLeft > 0;
  const low = burning && campfire.minutesLeft <= SCENE_FIRE.low.lastMinutes;
  const picture: ScenePicture = low
    ? SCENE_FIRE.low.picture
    : SCENE_FIRE.picture;
  return {
    ...spriteOf(picture),
    x: SCENE_FIRE.place.x,
    y: SCENE_FIRE.place.y,
    burning,
  };
}

/**
 * The tint of the scene's light, from 0, the cool tint, to 1, the warm one (D-315, D-316). It goes up
 * evenly with the streak to `SCENE_TINT.requiredShare` at the streak the map's solving condition asks
 * for and stays there when the streak goes on growing, and only a completion makes it 1. No map asks for
 * no streak today; the tint of one that does is for the task that adds it to settle, and until then it
 * stays at 0, the cool tint, before a completion. It is given
 * with four decimals, which is finer than a step of tone the eye tells apart.
 */
function tintOf(run: GameMapRun): number {
  if (run.completion !== null) return 1;
  const solving: SolvingDef = MAPS[run.mapId].solving;
  const required = solving.streak;
  if (required === undefined) return 0;
  const reached =
    (Math.min(run.streak, required) / required) * SCENE_TINT.requiredShare;
  return Number(reached.toFixed(4));
}

/**
 * The thickness of the frost on the frame's edges, in the scene's pixels (D-316): none at the
 * temperature the body starts at, growing evenly to its greatest at the chill and staying there below
 * it, a whole number of pixels so that it grows by squares of the scene's grid.
 */
function frostOf(run: GameMapRun): number {
  const { none, full, thickness } = SCENE_FROST;
  const cold = (none - run.body.temperature) / (none - full);
  return Math.round(Math.min(1, Math.max(0, cold)) * thickness);
}

/**
 * Whether the mage bends: it gathers, with „Zbierz” or „Obchód”, the whole action through, where the
 * badge stands too, so not while waiting, in combat or after an end of the map run.
 */
function bendingOf(run: GameMapRun): boolean {
  const { current } = run;
  if (
    current === null ||
    current.activity.kind === "wait" ||
    run.death !== null ||
    run.completion !== null
  )
    return false;
  const kind = current.activity.action.kind;
  return kind === "gather" || kind === "patrol";
}

/** The way the mage faces while it bends: toward the prop of the resource it gathers, if it has one. */
function bendFacingOf(run: GameMapRun): "right" | "left" | null {
  if (!bendingOf(run)) return null;
  const activity = run.current?.activity;
  if (activity === undefined || activity.kind !== "rule") return null;
  const { action } = activity;
  if (action.kind !== "gather" && action.kind !== "patrol") return null;
  return PROPS[action.resource]?.mageFaces ?? null;
}

/**
 * How the scene shows the tint of its light, kept from reading to reading: the tint shown, from 0 to 1;
 * the tint a return to a cooler one started from, or null while none runs; and the number that tells
 * one return, or one standing at once, from the next.
 */
export type TintShown = { shown: number; from: number | null; serial: number };

/**
 * The tint the scene shows after a reading that puts it at `target`, from the tint it showed before
 * (null at a first draw). It stands at once where the target puts it at a first draw, at the start of a
 * map run (`placed`), at a death and at a completion. While the scene goes on, a fall of the target,
 * the loss of the streak, starts a return from the tint shown, which CSS runs over 2 s, and the tint
 * follows a rise of the target and keeps a return that is running; while the scene stands still, in
 * the player's pause and at a discovery, it keeps the tint it shows, so that a fall in that time
 * starts its return where the scene goes on (D-322, D-316).
 */
export function tintShown(
  before: TintShown | null,
  target: number,
  standing: SceneStanding,
  placed: boolean,
): TintShown {
  if (before === null || placed)
    return { shown: target, from: null, serial: (before?.serial ?? 0) + 1 };
  if (standing === "paused" || standing === "discovery") return before;
  if (standing === "going") {
    if (target === before.shown) return before;
    if (target < before.shown && before.from === null)
      return { shown: target, from: before.shown, serial: before.serial + 1 };
    return { ...before, shown: target };
  }
  if (target === before.shown && before.from === null) return before;
  return { shown: target, from: null, serial: before.serial + 1 };
}

/** The scene of the state's map run; null where no map run stands. */
export function sceneDrawing(state: GameState): SceneDrawing | null {
  const run = state.run;
  if (run === null) return null;
  const character = state.team.characters.find(
    (c) => c.id === run.character.id,
  );
  if (character === undefined)
    throw new Error("the character of the map run is not in the team");
  const sheets = MAGES[character.archetypeId];
  const props = (Object.keys(PROPS) as ResourceId[]).flatMap((resource) => {
    const spot = PROPS[resource];
    return spot === undefined ? [] : [{ resource, ...placedOf(spot) }];
  });
  const standing = standingOf(state, run);
  return {
    standing,
    background: spriteOf(SCENE.background),
    mage: {
      idle: spriteOf(sheets.idle),
      run: spriteOf(sheets.run),
      bend: spriteOf(sheets.bend),
      death: spriteOf(sheets.death),
      goal: goalOf(run),
      bending: bendingOf(run),
      bendFacing: bendFacingOf(run),
    },
    props,
    fire: fireOf(run),
    badge: badgeOf(state, run),
    tint: tintOf(run),
    frost: frostOf(run),
    moment: momentOf(state, run, standing),
  };
}

/** The actions whose end takes pieces out of the backpack (crafting, lighting, feeding and eating). */
const USES_BACKPACK: ReadonlySet<string> = new Set([
  "craftCampfire",
  "lightCampfire",
  "lightItem",
  "feedCampfire",
  "eat",
]);

/**
 * The effect of the end of a gathering, an effect of an ordinary event (D-317): the icon of the
 * resource gathered flying from the prop, or from the mage's feet where the resource has none, to the
 * mage's body, or the cloud of dust of a miss, standing at the prop or at the feet.
 */
export type SceneEffect =
  | { kind: "flight"; href: string; from: ScenePoint; to: ScenePoint }
  | { kind: "dust"; sprite: ScenePlacedSprite };

/**
 * The effect the end of a gathering shows, from the game state of the previous reading, the state of
 * this one and the events the simulation returned with it (D-04), the mage standing with its frame's
 * left edge at `mageX`; null where the reading shows none. The scene has no event of a hit or a
 * miss, so the backpack tells: a gathering that put a piece of its resource into it hit, and „Zbierz”
 * that put none missed (D-66). „Obchód” never shows a miss. A reading of a map run started has no
 * previous reading of it, and a reading that carries more than one end of a gathering, as after a tab
 * left in the background, carries effects that are all overdue, so it shows none (D-317); nor does a
 * reading in which an action that takes pieces out of the backpack also ended, since the backpack's
 * net change then tells nothing of the gathering.
 */
export function sceneEffect(
  before: GameState,
  after: GameState,
  events: readonly GameEvent[],
  mageX: number,
): SceneEffect | null {
  const run = after.run;
  const was = before.run;
  if (run === null || was === null) return null;
  if (events.some((e) => e.kind === "mapRunStarted")) return null;
  if (run.character.id !== was.character.id) return null;
  const ends = events.flatMap((e) => {
    if (e.kind !== "activityFinished" || e.activity.kind !== "rule") return [];
    const { action } = e.activity;
    return action.kind === "gather" || action.kind === "patrol" ? [action] : [];
  });
  if (ends.length !== 1) return null;
  // The end of an action that takes pieces out of the backpack in the same reading leaves only a net
  // change to read, which no longer tells whether the gathering hit.
  const spent = events.some(
    (e) =>
      e.kind === "activityFinished" &&
      e.activity.kind === "rule" &&
      USES_BACKPACK.has(e.activity.action.kind),
  );
  if (spent) return null;
  const { kind, resource } = ends[0];
  const gained =
    run.character.backpack[resource] > was.character.backpack[resource];
  if (!gained && kind === "patrol") return null;
  const prop: SceneSpot | undefined = PROPS[resource];
  const feet = {
    x: mageX + SCENE_EFFECTS.feet.x,
    y: SCENE.groundLine - SCENE_EFFECTS.feet.up,
  };
  if (!gained) {
    const middle =
      prop === undefined ? feet.x : prop.place.x + prop.picture.width / 2;
    const sink = SCENE_EFFECTS.dustSink;
    return {
      kind: "dust",
      sprite: {
        ...spriteOf(SCENE_DUST),
        x: middle - SCENE_DUST.width / 2,
        y: (prop === undefined ? SCENE.groundLine : prop.place.y) + sink,
      },
    };
  }
  return {
    kind: "flight",
    href: `/icons/${RESOURCES[resource].icon}.svg`,
    from:
      prop === undefined
        ? feet
        : {
            x: prop.place.x + prop.picture.width / 2,
            y: prop.place.y - prop.picture.height / 2,
          },
    to: {
      x: mageX + SCENE_EFFECTS.body.x,
      y: SCENE.groundLine - SCENE_EFFECTS.body.up,
    },
  };
}
