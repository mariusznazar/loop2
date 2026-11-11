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

/**
 * A prop and the way the bending mage faces at it: the side of the mage on which the prop lies, as
 * the mage stands at its place. The mage's figure is 25 pixels wide, columns 20 to 44 of its frame, so
 * at the sticks (frame 42) it spans 62 to 86 and the sticks 80 to 101, at the bush (frame 224) 244 to
 * 268 and the bush 252 to 280, and at the moss (frame 32) 52 to 76 and the moss 40 to 51, which lies
 * to its left.
 */
export type ScenePropSpot = SceneSpot & { mageFaces: "right" | "left" };

/** The scene's frame and the lines and edges its places are given by, in its pixels. */
export const SCENE = {
  /** The forest in snow of D-314, the frame's whole picture. */
  background: { file: "forest-scene.png", width: 336, height: 152, frames: 1 },
  /** The line the mage's feet and the things standing on the ground stand on. */
  groundLine: 136,
  /** Left edge of the mage's frame where it waits, in the middle of the clearing. */
  clearingX: 144,
  /**
   * Left edge of the mage's frame at the right edge of the frame, always the same place. The mage's
   * figure, 25 pixels wide, ends at column 44 of its frame in both sheets, so at 275 its last column
   * is 319, inside the frame of 336 with 16 pixels to spare.
   */
  rightEdgeX: 275,
} as const;

/**
 * The mage's sheets, by the archetype of the character: idle, run and bend, each in its frame size. The
 * bend sheet is the mage of Pixel Crawler bending to the ground, made by hand from its idle frame
 * (D-271): the frames are the full bend, the half bend, the standing frame and the half bend again, so
 * that a loop of them bends and rises, and the sheet stands on its first frame, a bend, where the
 * system's setting asks for no motion.
 */
export const SCENE_MAGES = {
  elementalMage: {
    idle: { file: "mage-idle.png", width: 64, height: 64, frames: 4 },
    run: { file: "mage-run.png", width: 64, height: 64, frames: 6 },
    bend: { file: "mage-bend.png", width: 64, height: 64, frames: 4 },
  },
} as const satisfies Record<
  ArchetypeId,
  { idle: ScenePicture; run: ScenePicture; bend: ScenePicture }
>;

/**
 * The cloud of dust of a missed gathering: the eight cells of smoke of the pack Smoke & Fire Animated
 * Particle [16x16] in a row, recoloured to the browns of the scene (D-271). It plays once, from the
 * whole cloud to its last scraps, within the 300 ms of an effect of an ordinary event.
 */
export const SCENE_DUST = {
  file: "dust.png",
  width: 16,
  height: 16,
  frames: 8,
} as const satisfies ScenePicture;

/**
 * Where the effects of a gathering's end stand, in the scene's pixels. Relative to the left edge of
 * the mage's frame: the point on the mage's body, above the line it stands on, where the icon of a
 * gathered resource lands (`body`), and the point of its feet where an effect starts or stands where
 * the resource has no prop (`feet`, the fibre's). The cloud of dust stands on the ground line with
 * its picture's lowest row `dustSink` pixels below it, where its smoke ends two rows above the
 * picture's bottom edge.
 */
export const SCENE_EFFECTS = {
  body: { x: 32, up: 18 },
  feet: { x: 32, up: 3 },
  dustSink: 2,
  /** How far above the higher of its two ends the flying icon's arc rises. */
  arc: 6,
} as const;

/** The campfire's sheet: burning with its frames, extinguished as the same picture without colour. */
export const SCENE_FIRE = {
  picture: { file: "fire.png", width: 32, height: 32, frames: 4 },
  place: { x: 124, y: 132 },
  mageAt: 80,
} as const satisfies SceneSpot;

/** The props of the scene, by the resource each shows; a resource with no prop has none here. */
export const SCENE_PROPS = {
  stick: {
    picture: { file: "sticks.png", width: 22, height: 13, frames: 1 },
    place: { x: 80, y: 132 },
    mageAt: 42,
    mageFaces: "right",
  },
  berry: {
    picture: { file: "berry-bush.png", width: 29, height: 27, frames: 1 },
    place: { x: 252, y: 122 },
    mageAt: 224,
    mageFaces: "right",
  },
  moss: {
    picture: { file: "moss.png", width: 12, height: 9, frames: 1 },
    place: { x: 40, y: 128 },
    mageAt: 32,
    mageFaces: "left",
  },
} as const satisfies Partial<Record<ResourceId, ScenePropSpot>>;
