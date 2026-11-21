/**
 * The drawing of the game map in React (D-19, D-70, D-41, D-125): the tiles of the map run with the
 * icons of the resources they hold, the campfire's icon, the outlines of the character and of the
 * step's target, and the line around the marked tile. It is a picture, not a control: no click
 * handling, hovering with a mouse and tapping with a finger its only interactions, and it writes no
 * number of stock on itself (invariant `terrain-drawing-numbers`) — the numbers stand in the line
 * under it and in the table. The marked tile's key is not the drawing's: the screen holds it and
 * gives it with its setters, so one marked tile links the drawing, the line under it and the table
 * standing in another area. A pointer of the kind touch hovers nothing: it comes over a tile when
 * the finger comes down and leaves when it is lifted, which would undo a mark at the lift, so the
 * finger marks by its lift, the tap, and the mark stays until the screen takes it off. It imports the
 * pure `terrainPicture` and `tileKey` and builds no element after the pattern of a DOM module
 * (D-265). Nothing runs when the module is imported.
 */
import type { CSSProperties } from "react";
import type { GameState } from "../sim/types.js";
import { terrainPicture, type PictureIconPlace } from "./terrain-picture.js";
import { tileKey } from "./tile-list.js";

/** Room around the tiles for the outlines' stroke. */
const MARGIN = 4;

/** What the screen gives the drawing; every render gives it whole. */
export type TerrainDrawingProps = {
  /** The game state the drawing draws; it draws no tile while the state holds no map run. */
  state: GameState;
  /** The key of the marked tile, hovered or tapped, „col,row”, or null when none is marked. */
  hovered: string | null;
  /** Called with the key of the tile under a mouse or a pen, or null when the pointer is over none. */
  onHover: (key: string | null) => void;
  /** Called with the key of the tile a finger tapped, or null when the tap was on the drawing beside every tile. */
  onTap: (key: string | null) => void;
};

/** The key of the tile an event of the drawing reached, or null where it reached none. */
function tileKeyOf(target: EventTarget): string | null {
  const tile = target instanceof Element ? target.closest("[data-tile]") : null;
  return tile?.getAttribute("data-tile") ?? null;
}

/**
 * An icon of the drawing: the mask of the icon file, which takes the colour `text-strong` from the
 * styles, in the square of a foreign object, so the drawing draws an icon as the game does
 * elsewhere (D-43).
 */
function Icon({
  place,
  className,
}: {
  place: PictureIconPlace;
  className: string;
}) {
  return (
    <foreignObject
      x={place.x}
      y={place.y}
      width={place.size}
      height={place.size}
      className={className}
    >
      <div
        className="icon-mask"
        style={{ "--icon": `url("${place.href}")` } as CSSProperties}
      />
    </foreignObject>
  );
}

/**
 * The drawing: a tile for each tile of the map run, revealed ones with their icons (dimmed at a
 * stock of 0) and the campfire's icon (never dimmed, burning or extinguished), then the outlines on
 * top of every tile, and last the line around the marked tile, so no neighbour or outline covers it;
 * a marked tile not revealed gets no line.
 */
export function TerrainDrawing({
  state,
  hovered,
  onHover,
  onTap,
}: TerrainDrawingProps) {
  const picture = terrainPicture(state);
  const width = picture.width + 2 * MARGIN;
  const height = picture.height + 2 * MARGIN;
  // The line stands only at a revealed tile: it has a row in the table to be the same place as (D-41).
  const hoveredTile = picture.tiles.find(
    (tile) => tile.revealed && tileKey(tile) === hovered,
  );
  return (
    <svg
      className="terrain-drawing"
      width={width}
      height={height}
      viewBox={`${-MARGIN} ${-MARGIN} ${width} ${height}`}
      onPointerOver={(event) => {
        if (event.pointerType !== "touch") onHover(tileKeyOf(event.target));
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") onHover(null);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "touch") onTap(tileKeyOf(event.target));
      }}
    >
      {picture.tiles.map((tile) => {
        const key = tileKey(tile);
        const classes = ["tile"];
        if (tile.revealed) classes.push("revealed");
        if (tile.revealed && key === hovered) classes.push("hovered");
        return (
          <g key={key} data-tile={key} className={classes.join(" ")}>
            <polygon points={tile.points} />
            {tile.icons.map((icon) => (
              <Icon
                key={icon.resource}
                place={icon}
                className={icon.dimmed ? "icon dimmed" : "icon"}
              />
            ))}
            {tile.campfire === null ? null : (
              <Icon place={tile.campfire} className="icon" />
            )}
          </g>
        );
      })}
      {picture.tiles.map((tile) =>
        tile.outline === null ? null : (
          <polygon
            key={`outline-${tileKey(tile)}`}
            points={tile.points}
            className={`outline ${tile.outline === "character" ? "character" : "step-target"}`}
          />
        ),
      )}
      {hoveredTile === undefined ? null : (
        <polygon
          points={hoveredTile.points}
          className="outline link-highlight"
        />
      )}
    </svg>
  );
}
