import { CAMP, SCENE_FIRE, SCENE_MAGES } from "../sim/data/scene.js";
import type { ScenePicture } from "../sim/data/scene.js";
import type { ArchetypeId } from "../sim/data/archetypes.js";
import type { CharacterId, GameState } from "../sim/types.js";
import type { SceneSprite } from "./scene-picture.js";

/** A character standing in the camp: its number, for the element's key, and the sheet it stands in. */
export type CampMember = {
  id: CharacterId;
  idle: SceneSprite;
};

/**
 * The camp of Siedziba as plain data for drawing (D-389): pure, no DOM, no URL built from a name. Every
 * size is in the pixels of the camp's pictures; the view draws them at `PICTURE_PIXEL` times that.
 */
export type CampDrawing = {
  /** The clearing, as wide as the widest content; a narrower band shows its middle. */
  background: SceneSprite;
  /** The campfire in the middle of the band, always burning, in the frames of its flame. */
  fire: SceneSprite;
  /** The chest, one still picture whatever it holds. */
  chest: SceneSprite;
  /**
   * The characters that are in Siedziba, in the order of creation, no more than the widest band holds;
   * a narrower band shows as many from the first as its row holds.
   */
  members: CampMember[];
  /** The pixels of the row one character takes, and of the gap between the row, the fire and the chest. */
  cell: number;
  gap: number;
  /** How far the bottom edge of each kind of picture stands above the bottom edge of the band. */
  lift: { character: number; fire: number; chest: number };
};

const MAGES: Record<ArchetypeId, { idle: ScenePicture }> = SCENE_MAGES;

function spriteOf(picture: ScenePicture): SceneSprite {
  return {
    href: `/sprites/${picture.file}`,
    width: picture.width,
    height: picture.height,
    frames: picture.frames,
  };
}

/**
 * How many characters the row at the left of the fire holds at the widest band: the clearing's
 * half, less the half of the fire and the gap, in cells. A narrower band holds fewer, which the
 * stylesheet shows by letting the cells that do not fit stand outside the band; nobody past this
 * number is ever drawn, since no band holds one.
 */
export function campCapacity(): number {
  const row =
    CAMP.background.width / 2 - SCENE_FIRE.picture.width / 2 - CAMP.gap;
  return Math.floor(row / CAMP.cell);
}

/**
 * Whether the character stands in Siedziba: it is neither the character of the manual map run, going,
 * paused or ended and waiting for „Restart” or „Zakończ”, nor a character in an earning loop. A
 * character whose earning loop was stopped has no entry in the loops and stands in Siedziba.
 */
function inSiedziba(state: GameState, id: CharacterId): boolean {
  return state.run?.character.id !== id && state.loops[id] === undefined;
}

/** The camp of the state: the characters of Siedziba in the order of creation (D-54), at most `campCapacity()`. */
export function campDrawing(state: GameState): CampDrawing {
  const members = state.team.characters
    .filter((character) => inSiedziba(state, character.id))
    .slice(0, campCapacity())
    .map((character) => ({
      id: character.id,
      idle: spriteOf(MAGES[character.archetypeId].idle),
    }));
  return {
    background: spriteOf(CAMP.background),
    fire: spriteOf(SCENE_FIRE.picture),
    chest: spriteOf(CAMP.chest),
    members,
    cell: CAMP.cell,
    gap: CAMP.gap,
    lift: CAMP.lift,
  };
}
