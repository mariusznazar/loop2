/**
 * The figure of a character at the top of the screen Postać (D-445, D-272, D-271, D-43): the picture a
 * character of the picture band of Siedziba stands in, the idle sheet of its archetype from
 * `SCENE_MAGES`, drawn at `PICTURE_PIXEL` as the band draws it, in the box `CHARACTER_FIGURE` gives,
 * with no clearing under it. Its file, size and box come from the game's data; the view names none, and
 * each size is the picture's pixels times `PICTURE_PIXEL`, written into the elements' styles.
 *
 * It moves by CSS alone, at the beat of the scene's frames, and stands on its first frame under the
 * system's setting for reduced motion; the rule that runs its frames stands in character-screen.css and
 * names the keyframes `scene-frames` of styles.css. It is a picture: no element of it takes the keyboard
 * or a click, it is hidden from assistive technology and no text stands on it. Nothing runs when the
 * module is imported.
 */
import type { ArchetypeId } from "../sim/data/archetypes.js";
import {
  CHARACTER_FIGURE,
  PICTURE_PIXEL,
  SCENE_MAGES,
  type ScenePicture,
} from "../sim/data/scene.js";
import { Sheet } from "./scene.js";
import type { SceneSprite } from "./scene-picture.js";

const MAGES: Record<ArchetypeId, { idle: ScenePicture }> = SCENE_MAGES;

/** The sheet a character of the archetype stands in, as the picture band takes it. Pure. */
export function figureSprite(archetypeId: ArchetypeId): SceneSprite {
  const idle = MAGES[archetypeId].idle;
  return {
    href: `/sprites/${idle.file}`,
    width: idle.width,
    height: idle.height,
    frames: idle.frames,
  };
}

/** The figure of a character of the archetype: its idle sheet centred in its box, its feet on the box's bottom edge. */
export function CharacterFigure({ archetypeId }: { archetypeId: ArchetypeId }) {
  const sprite = figureSprite(archetypeId);
  return (
    <div
      className="character-figure"
      aria-hidden="true"
      style={{
        width: CHARACTER_FIGURE.width * PICTURE_PIXEL,
        height: CHARACTER_FIGURE.height * PICTURE_PIXEL,
      }}
    >
      <div
        className="character-figure-sprite"
        style={{
          width: sprite.width * PICTURE_PIXEL,
          height: sprite.height * PICTURE_PIXEL,
          left: ((CHARACTER_FIGURE.width - sprite.width) / 2) * PICTURE_PIXEL,
          bottom: 0,
        }}
      >
        <Sheet sprite={sprite} />
      </div>
    </div>
  );
}
