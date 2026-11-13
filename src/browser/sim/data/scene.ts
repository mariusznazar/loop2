import type { ArchetypeId } from "./archetypes.js";
import { BALANCE } from "./balance.js";
import type { CreatureId } from "./creatures.js";
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

/**
 * The size of one pixel of a picture of the game on the screen, in CSS pixels: every picture is drawn at
 * twice its size, the scene's 336 × 152 forest as 672 × 304 and the camp's 672 × 48 clearing as 1344 × 96,
 * so that every pixel stays equal in size and nothing shakes in motion (D-349).
 */
export const PICTURE_PIXEL = 2;

/** The scene's frame and the lines and edges its places are given by, in its pixels. */
export const SCENE = {
  /** The forest in snow of D-314, the frame's whole picture. */
  background: { file: "forest-scene.png", width: 336, height: 152, frames: 1 },
  /** The line the mage's feet and the things standing on the ground stand on. */
  groundLine: 136,
  /**
   * The middle of the mage's figure, from the left edge of its frame: the figure is columns 20 to 44 of
   * the frame's 64, so its middle is column 32. The effects stand on it.
   */
  mageMiddle: 32,
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
 * The mage's sheets, by the archetype of the character: idle, run, bend and death, each in its frame
 * size. The bend sheet is the mage of Pixel Crawler bending to the ground, made by hand from its idle
 * frame (D-271): the frames are the full bend, the half bend, the standing frame and the half bend again,
 * so that a loop of them bends and rises, and the sheet stands on its first frame, a bend, where the
 * system's setting asks for no motion. The death sheet is the pack's own death sheet of the mage: six
 * frames in which it falls and lies, the last frame the mage lying down, which is where the sheet stands
 * once it has played and wherever the scene shows the last image of a death at once (D-322).
 */
export const SCENE_MAGES = {
  elementalMage: {
    idle: { file: "mage-idle.png", width: 64, height: 64, frames: 4 },
    run: { file: "mage-run.png", width: 64, height: 64, frames: 6 },
    bend: { file: "mage-bend.png", width: 64, height: 64, frames: 4 },
    death: { file: "mage-death.png", width: 64, height: 64, frames: 6 },
  },
} as const satisfies Record<
  ArchetypeId,
  {
    idle: ScenePicture;
    run: ScenePicture;
    bend: ScenePicture;
    death: ScenePicture;
  }
>;

/**
 * The sheets of a creature that attacks, by its id: standing, running, biting and dying, each in its
 * frame size, which is common to all of them and has the creature's feet on its bottom row. The pictures
 * are the pack LPC Wolf's own side views of the wolf in the frames of the scene, facing left (D-271):
 * the idle sheet is the standing frame of its walk, the run sheet serves the creature that runs in and
 * runs off, the bite sheet loops while the creature fights and starts on the frame the idle sheet is,
 * and the death sheet is the four frames in which it falls and lies, the last frame the creature lying
 * down. A creature stands on the right of the mage, so the sheets face left and are mirrored where it
 * stands on the left.
 */
export type SceneCreatureSheets = {
  idle: ScenePicture;
  run: ScenePicture;
  bite: ScenePicture;
  death: ScenePicture;
};

/** The creatures' sheets, by the creature's id. */
export const SCENE_CREATURES = {
  wolf: {
    idle: { file: "wolf-idle.png", width: 64, height: 32, frames: 1 },
    run: { file: "wolf-run.png", width: 64, height: 32, frames: 5 },
    bite: { file: "wolf-bite.png", width: 64, height: 32, frames: 5 },
    death: { file: "wolf-death.png", width: 64, height: 32, frames: 4 },
  },
} as const satisfies Record<CreatureId, SceneCreatureSheets>;

/**
 * Where a creature stands at the mage, in the scene's pixels. The mage's figure is columns 20 to 44 of
 * its frame when it faces right and, mirrored about the frame's middle, columns 19 to 43 when it faces
 * left, and it faces the creature; the creature's frame, which its sheets fill from its nose to its tail,
 * starts `gap` pixels from the figure on the creature's side. A creature stands on the right of the mage
 * where its frame then lies inside the scene, as it does at every place the mage stands at but the
 * right edge, and on the left where it does not. The cloud of the scuffle, the dust's picture, stands
 * over the gap, its middle on the gap's middle and its bottom edge `cloudUp` pixels above the ground
 * line.
 */
export const SCENE_FIGHT = {
  mageFigure: { left: 20, right: 44 },
  gap: 2,
  cloudUp: 3,
} as const;

/**
 * The cloud of dust of a missed gathering and of a scuffle: the eight cells of smoke of the pack Smoke &
 * Fire Animated Particle [16x16] in a row, recoloured to the browns of the scene (D-271). A miss plays it
 * once, from the whole cloud to its last scraps, within the 300 ms of an effect of an ordinary event; a
 * scuffle plays it again and again at the beat of the frames for as long as the fight lasts.
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
  body: { x: SCENE.mageMiddle, up: 18 },
  feet: { x: SCENE.mageMiddle, up: 3 },
  dustSink: 2,
  /** How far above the higher of its two ends the flying icon's arc rises. */
  arc: 6,
} as const;

/**
 * The smaller flame of a burning campfire in its last minutes: its own sheet, the same four frames of
 * the same stones and logs as the full flame's, with the flame's fan cut down by hand (D-271), and the
 * minutes of burning left at or below which the fire shows it. A stick added to a burning fire gives
 * 20 minutes (the data of items), so the smaller flame says to feed the fire before it dies.
 */
export type SceneLowFlame = {
  picture: ScenePicture;
  lastMinutes: number;
};

/**
 * The campfire's sheet: burning with its frames, extinguished as the same picture without colour. A
 * burning fire shows the full flame, and `low` while it has `low.lastMinutes` minutes of burning left
 * or fewer; the extinguished fire is always the full sheet's first frame, grey.
 */
export const SCENE_FIRE = {
  picture: { file: "fire.png", width: 32, height: 32, frames: 4 },
  place: { x: 124, y: 132 },
  mageAt: 80,
  low: {
    picture: { file: "fire-small.png", width: 32, height: 32, frames: 4 },
    lastMinutes: 20,
  },
} as const satisfies SceneSpot & { low: SceneLowFlame };

/**
 * The tint of the scene's light follows the streak (D-315, D-316): from the cool tint at streak 0 to
 * the warm one, which is full only at a completion. `requiredShare` is the part of the way from the
 * cool tint to the warm one that the streak the map's solving condition asks for reaches, the rest, a
 * trace of the cool tint, staying until a completion; a streak above the required one stays there.
 */
export const SCENE_TINT = {
  requiredShare: 0.8,
} as const;

/**
 * The frost on the edges of the scene's frame follows the body's temperature (D-316): none at the
 * temperature the body starts with and the greatest at the chill, below which the body is chilled, and
 * for that long as the body stays chilled. `thickness` is the frost's greatest thickness, in the
 * scene's pixels.
 */
export const SCENE_FROST = {
  none: BALANCE.body.startTemperature,
  full: BALANCE.body.chilledBelow,
  thickness: 16,
} as const;

/** The shade of a speck of light: the name of a colour of the scene's palette, which the stylesheet reads. */
export type SceneSpeckShade = "ember" | "bronze";

/**
 * A speck of light after a completion (D-322): a square of one pixel of the scene that starts at `x`
 * and `y`, its place on the scene's grid, rises `rise` pixels in as many steps and goes out where it
 * ends, `delay` milliseconds after the effect begins.
 */
export type SceneSpeck = {
  x: number;
  y: number;
  rise: number;
  delay: number;
  shade: SceneSpeckShade;
};

/**
 * Where the three moments in which time stands still stand in the scene, in the scene's pixels (D-322).
 * At a discovery the icons of what was discovered stand each on a plaque in a row over the clearing,
 * the middle of the first row at `centreX` and the middle of its plaques on the line `y`, `perRow` to a
 * row, the next row `rowStep` higher; a plaque is 18 pixels wide, so `step` leaves 4 between two. A
 * plaque comes out of the forest from the crown of the nearer of the two tall pines, `from`, in whose
 * place the left half of a row and the right half stand. After a completion the specks of light rise
 * over the open snow of the clearing, where the ground is the snow alone and a speck stands out from it,
 * from 104 to 248 across and from 134 up to 100 high, the lowest row the forest's trunks reach; they
 * are placed on a fixed pattern, the same at every completion, so that the effect is one picture.
 */
export const SCENE_MOMENTS = {
  discovery: {
    centreX: SCENE.clearingX + SCENE.mageMiddle,
    y: 56,
    step: 22,
    perRow: 8,
    rowStep: 22,
    from: { left: { x: 120, y: 50 }, right: { x: 265, y: 50 } },
  },
  specks: [
    { x: 104, y: 112, rise: 12, delay: 0, shade: "ember" },
    { x: 110, y: 123, rise: 17, delay: 700, shade: "bronze" },
    { x: 116, y: 134, rise: 22, delay: 400, shade: "ember" },
    { x: 122, y: 122, rise: 22, delay: 100, shade: "bronze" },
    { x: 128, y: 133, rise: 13, delay: 800, shade: "ember" },
    { x: 134, y: 121, rise: 18, delay: 500, shade: "bronze" },
    { x: 140, y: 132, rise: 23, delay: 200, shade: "ember" },
    { x: 146, y: 120, rise: 20, delay: 900, shade: "bronze" },
    { x: 152, y: 131, rise: 14, delay: 600, shade: "ember" },
    { x: 158, y: 119, rise: 19, delay: 300, shade: "bronze" },
    { x: 164, y: 130, rise: 24, delay: 0, shade: "ember" },
    { x: 170, y: 118, rise: 18, delay: 700, shade: "bronze" },
    { x: 176, y: 129, rise: 15, delay: 400, shade: "ember" },
    { x: 182, y: 117, rise: 17, delay: 100, shade: "bronze" },
    { x: 188, y: 128, rise: 25, delay: 800, shade: "ember" },
    { x: 194, y: 116, rise: 16, delay: 500, shade: "bronze" },
    { x: 200, y: 127, rise: 16, delay: 200, shade: "ember" },
    { x: 206, y: 115, rise: 15, delay: 900, shade: "bronze" },
    { x: 212, y: 126, rise: 26, delay: 600, shade: "ember" },
    { x: 218, y: 114, rise: 12, delay: 300, shade: "bronze" },
    { x: 224, y: 125, rise: 17, delay: 0, shade: "ember" },
    { x: 230, y: 113, rise: 13, delay: 700, shade: "bronze" },
    { x: 236, y: 124, rise: 24, delay: 400, shade: "ember" },
    { x: 242, y: 112, rise: 12, delay: 100, shade: "bronze" },
  ],
} as const satisfies {
  discovery: {
    centreX: number;
    y: number;
    step: number;
    perRow: number;
    rowStep: number;
    from: Record<"left" | "right", { x: number; y: number }>;
  };
  specks: readonly SceneSpeck[];
};

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

/**
 * The camp at the top of Siedziba, in the pixels of its picture: a band of one picture, the snow
 * clearing, with the campfire in the middle of it, the chest to the right of the fire and, to its left,
 * the characters that are in Siedziba, standing in a row away from the fire in the order of creation
 * (D-54). The clearing is the pack Pixel Crawler's snow ground composed with its pines and saplings,
 * as the forest of the scene is (D-314), in full light and with no tint (D-315), and as wide as the
 * widest content, 1344 px at twice its pixels: a narrower band shows its middle. The chest is one still
 * picture, the rectangle 26 × 21 at 179, 75 of the pack's sheet of interior props with every pixel moved
 * unchanged, the same at every count of what it holds (D-271). The fire is
 * the burning fire of the scene (`SCENE_FIRE`), always burning, and a character stands in its idle sheet
 * (`SCENE_MAGES`), so the camp names no archetype of its own.
 *
 * A character takes `cell` pixels of the row, its frame reaching beyond the cell on both sides, where the
 * frame is transparent. The row, the fire and the chest are `gap` pixels apart. `lift` is how far above
 * the bottom edge of the band each kind of picture stands, its bottom edge: the fire and the chest a little
 * higher than the characters, as the fire of the scene stands above the mage's line (`SCENE_FIRE.place`).
 */
export const CAMP = {
  background: { file: "camp-clearing.png", width: 672, height: 48, frames: 1 },
  chest: { file: "chest.png", width: 26, height: 21, frames: 1 },
  cell: 32,
  gap: 6,
  lift: { character: 3, fire: 6, chest: 5 },
} as const satisfies {
  background: ScenePicture;
  chest: ScenePicture;
  cell: number;
  gap: number;
  lift: { character: number; fire: number; chest: number };
};
