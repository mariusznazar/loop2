import type { ArchetypeId } from "./archetypes.js";
import type { ResourceId } from "./resources.js";

/** A picture in assets/sprites/: its file, the size of one frame and the frames it holds. */
export type ScenePicture = {
  /** File name in assets/sprites/, with the extension. */
  file: string;
  /** Size of one frame, in the scene's pixels. */
  width: number;
  height: number;
  /** Frames the file holds in a row from its left edge; a still picture holds one. */
  frames: number;
};

/**
 * A picture that stands in the scene, and the place the mage stands at it. The place is the
 * picture's left edge and the line it stands on, its bottom edge, in the scene's pixels.
 */
export type SceneSpot = {
  picture: ScenePicture;
  place: { x: number; y: number };
  /** Left edge of the mage's frame when the mage stands at the picture. */
  mageAt: number;
};

/** The scene's frame and the lines and edges its places are given by, in its pixels. */
export const SCENE = {
  /** The forest in snow of D-314, the frame's whole picture. */
  background: { file: "forest-scene.png", width: 336, height: 152, frames: 1 },
  /** The line the mage's feet and the things standing on the ground stand on. */
  groundLine: 136,
  /** Left edge of the mage's frame where it waits, in the middle of the clearing. */
  clearingX: 160,
  /**
   * Left edge of the mage's frame at the right edge of the frame, always the same place. The mage's
   * figure, 25 pixels wide, ends at column 44 of its frame in both sheets, so at 291 its last column
   * is the frame's last, 335; at 292 it would lie one column outside and be clipped.
   */
  rightEdgeX: 291,
} as const;

/** The mage's sheets, by the archetype of the character: idle and run, each in its frame size. */
export const SCENE_MAGES = {
  elementalMage: {
    idle: { file: "mage-idle.png", width: 64, height: 64, frames: 4 },
    run: { file: "mage-run.png", width: 64, height: 64, frames: 6 },
  },
} as const satisfies Record<
  ArchetypeId,
  { idle: ScenePicture; run: ScenePicture }
>;

/** The campfire's sheet: burning with its frames, extinguished as the same picture without colour. */
export const SCENE_FIRE = {
  picture: { file: "fire.png", width: 32, height: 32, frames: 4 },
  place: { x: 124, y: 132 },
  mageAt: 96,
} as const satisfies SceneSpot;

/** The props of the scene, by the resource each shows; a resource with no prop has none here. */
export const SCENE_PROPS = {
  stick: {
    picture: { file: "sticks.png", width: 22, height: 13, frames: 1 },
    place: { x: 80, y: 132 },
    mageAt: 58,
  },
  berry: {
    picture: { file: "berry-bush.png", width: 29, height: 27, frames: 1 },
    place: { x: 252, y: 122 },
    mageAt: 240,
  },
  moss: {
    picture: { file: "moss.png", width: 12, height: 9, frames: 1 },
    place: { x: 40, y: 128 },
    mageAt: 26,
  },
} as const satisfies Partial<Record<ResourceId, SceneSpot>>;
