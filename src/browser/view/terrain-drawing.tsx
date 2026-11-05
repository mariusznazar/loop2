/**
 * The drawing of the game map in React (D-19, D-70, D-41, D-125; task ekran-przejscia, To do 5):
 * the tiles of the map run with the icons of the resources they hold, the campfire's icon, the
 * outlines of the character and of the step's target, and the line around the hovered tile. It is a
 * picture, not a control: no click handling, hovering its only interaction, and it writes no number
 * of stock on itself (invariant `terrain-drawing-numbers`) — the numbers stand in the line under it
 * and in the table. The hovered tile's key is not the drawing's: the screen holds it and gives it
 * with its setter, so one hovered tile links the drawing, the line under it and the table standing
 * in another area. It imports the pure `terrainPicture` and `tileKey` and builds no element after
 * the pattern of a DOM module (D-265). Nothing runs when the module is imported.
 */
import type { GameState } from "../sim/types.js";
import { terrainPicture, type PictureIconPlace } from "./terrain-picture.js";
import { tileKey } from "./tile-list.js";

/** Room around the tiles for the outlines' stroke. */
const MARGIN = 4;

/** What the screen gives the drawing; every render gives it whole. */
export type TerrainDrawingProps = {
  /** The game state the drawing draws; it draws no tile while the state holds no map run. */
  state: GameState;
  /** The key of the hovered tile, „col,row”, or null when none is hovered. */
  hovered: string | null;
  /** Called with the key of the tile under the pointer, or null when the pointer is over none. */
  onHover: (key: string | null) => void;
};

function Icon({
  place,
  className,
}: {
  place: PictureIconPlace;
  className: string;
}) {
  return (
    <image
      href={place.href}
      x={place.x}
      y={place.y}
      width={place.size}
      height={place.size}
      className={className}
    />
  );
}

/**
 * The drawing: a tile for each tile of the map run, revealed ones with their icons (dimmed at a
 * stock of 0) and the campfire's icon (never dimmed, burning or extinguished), then the outlines on
 * top of every tile, and last the line around the hovered tile, so no neighbour or outline covers it.
 */
export function TerrainDrawing({
  state,
  hovered,
  onHover,
}: TerrainDrawingProps) {
  const picture = terrainPicture(state);
  const width = picture.width + 2 * MARGIN;
  const height = picture.height + 2 * MARGIN;
  const hoveredTile = picture.tiles.find((tile) => tileKey(tile) === hovered);
  return (
    <svg
      className="terrain-drawing"
      width={width}
      height={height}
      viewBox={`${-MARGIN} ${-MARGIN} ${width} ${height}`}
      onPointerOver={(event) => {
        const tile =
          event.target instanceof Element
            ? event.target.closest("[data-tile]")
            : null;
        onHover(tile?.getAttribute("data-tile") ?? null);
      }}
      onPointerLeave={() => onHover(null)}
    >
      {picture.tiles.map((tile) => {
        const key = tileKey(tile);
        const classes = ["tile"];
        if (tile.revealed) classes.push("revealed");
        if (key === hovered) classes.push("hovered");
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
