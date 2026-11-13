/**
 * The camp at the top of Siedziba (D-389, D-272, D-43, D-04): a band over the screen's panel, the width of the
 * content and the height of its picture at twice its pixels, with the campfire in the middle, the chest
 * to the right of it and, to its left, the characters that are in Siedziba, in the order of creation
 * and away from the fire. Its files, sizes and places come from `campDrawing`, the view names none. A
 * size is the picture's pixels at `PICTURE_PIXEL` times each; the stylesheet holds no length of a sprite.
 *
 * The band shows the middle of the clearing, which is as wide as the widest content, so a narrower window
 * crops it at the sides and never scales it down. The row of characters is a line of cells that wraps, in
 * a box of one line's height whose overflow is hidden: the cells that do not fit the window's half of the
 * band wrap to a line that is never seen, so what the band shows is whole characters, the first in the
 * order of creation, with no measuring of the window and no code that runs at its change.
 *
 * It moves by CSS alone, at the beat of the scene's frames and with no interval, timer or animation frame
 * of its own: the stylesheet runs the frames of the burning fire and of each character's idle sheet, and
 * leaves them on the first frame under the system's setting for reduced motion (D-316, D-317). The fire
 * stands for no campfire of the game state; it always burns.
 *
 * The camp is a picture: no element of it takes the keyboard or a click, it is hidden from assistive
 * technology and no text or sign stands on it (D-272, D-321, D-44). The names in „Drużyna” under it lead
 * to the screen Postać (D-280). Nothing runs when the module is imported.
 */
import type { CSSProperties } from "react";
import { PICTURE_PIXEL } from "../sim/data/scene.js";
import type { GameState } from "../sim/types.js";
import { campDrawing } from "./camp-picture.js";
import type { CampDrawing } from "./camp-picture.js";
import { Sheet } from "./scene.js";
import type { SceneSprite } from "./scene-picture.js";

/** The size a picture is drawn at: its own, at `PICTURE_PIXEL` times each pixel. */
function drawnSize(sprite: SceneSprite): CSSProperties {
  return {
    width: sprite.width * PICTURE_PIXEL,
    height: sprite.height * PICTURE_PIXEL,
  };
}

/** One character of the row: a cell of the row's width and the band's height, its sheet centred on it. */
function Member({
  member,
  camp,
}: {
  member: CampDrawing["members"][number];
  camp: CampDrawing;
}) {
  const { cell, lift } = camp;
  return (
    <div
      className="camp-member"
      style={{
        width: cell * PICTURE_PIXEL,
        height: camp.background.height * PICTURE_PIXEL,
      }}
    >
      <div
        className="camp-member-sprite"
        style={{
          ...drawnSize(member.idle),
          left: ((cell - member.idle.width) / 2) * PICTURE_PIXEL,
          bottom: lift.character * PICTURE_PIXEL,
        }}
      >
        <Sheet sprite={member.idle} />
      </div>
    </div>
  );
}

/** The camp of the game state: the characters in Siedziba, the fire and the chest, over the clearing. */
export function Camp({ state }: { state: GameState }) {
  const camp = campDrawing(state);
  const { background, fire, chest, members, gap, lift } = camp;
  return (
    <div
      className="camp"
      aria-hidden="true"
      style={{ height: background.height * PICTURE_PIXEL }}
    >
      <img
        className="camp-background"
        src={background.href}
        alt=""
        width={background.width * PICTURE_PIXEL}
        height={background.height * PICTURE_PIXEL}
        draggable={false}
      />
      <div className="camp-team" style={{ paddingRight: gap * PICTURE_PIXEL }}>
        {members.map((member) => (
          <Member key={member.id} member={member} camp={camp} />
        ))}
      </div>
      <div
        className="camp-fire"
        style={{ ...drawnSize(fire), marginBottom: lift.fire * PICTURE_PIXEL }}
      >
        <Sheet sprite={fire} />
      </div>
      <div className="camp-stores" style={{ paddingLeft: gap * PICTURE_PIXEL }}>
        <div
          className="camp-chest"
          style={{
            ...drawnSize(chest),
            marginBottom: lift.chest * PICTURE_PIXEL,
          }}
        >
          <Sheet sprite={chest} />
        </div>
      </div>
    </div>
  );
}
