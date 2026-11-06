import { ACTIONS } from "../sim/data/actions.js";
import type { ArchetypeId } from "../sim/data/archetypes.js";
import type { ResourceId } from "../sim/data/resources.js";
import {
  SCENE,
  SCENE_FIRE,
  SCENE_MAGES,
  SCENE_PROPS,
} from "../sim/data/scene.js";
import type { ScenePicture, SceneSpot } from "../sim/data/scene.js";
import { sameHex } from "../sim/hex.js";
import type { GameMapRun, GameState } from "../sim/types.js";

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

/** The scene of the map run as plain data for drawing; pure, no DOM, no URL built from a name. */
export type SceneDrawing = {
  standing: SceneStanding;
  background: SceneSprite;
  mage: { idle: SceneSprite; run: SceneSprite; goal: MageGoal };
  /** The props, always, each with the resource it shows. */
  props: (ScenePlacedSprite & { resource: ResourceId })[];
  /** The campfire on the character's tile, burning or extinguished; null where none stands. */
  fire: (ScenePlacedSprite & { burning: boolean }) | null;
  /** The badge over the mage: its icon and the progress of the action from 0 to 1; null without one. */
  badge: { href: string; progress: number } | null;
};

const STAYS: MageGoal = { kind: "stays" };
const PROPS: Partial<Record<ResourceId, SceneSpot>> = SCENE_PROPS;
const MAGES: Record<ArchetypeId, { idle: ScenePicture; run: ScenePicture }> =
  SCENE_MAGES;

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
    href: `/icons/${ACTIONS[current.activity.action.kind].icon}.svg`,
    progress: Math.min(1, Math.max(0, passed / length)),
  };
}

/** The campfire on the character's tile, burning while it has minutes left; null without one. */
function fireOf(
  run: GameMapRun,
): (ScenePlacedSprite & { burning: boolean }) | null {
  const campfire = run.campfires.find((c) => sameHex(c.at, run.character.at));
  if (campfire === undefined) return null;
  return { ...placedOf(SCENE_FIRE), burning: campfire.minutesLeft > 0 };
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
  return {
    standing: standingOf(state, run),
    background: spriteOf(SCENE.background),
    mage: {
      idle: spriteOf(sheets.idle),
      run: spriteOf(sheets.run),
      goal: goalOf(run),
    },
    props,
    fire: fireOf(run),
    badge: badgeOf(state, run),
  };
}
