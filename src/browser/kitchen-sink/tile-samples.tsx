/**
 * The group of the kitchen-sink page that shows the tiles (D-45): samples of tiles in each state,
 * drawn with the roles by the game's own stylesheet as the terrain panel draws its tiles — never a
 * drawing of the game from a game state (D-04). Like every module of the page, it stands in
 * `src/browser/kitchen-sink/`, so nothing of it is compiled into what `npm run build` writes.
 */
import type { ReactNode } from "react";
import { hexCenter, hexCorners, tileLabel } from "../sim/hex.js";
import type { Hex } from "../sim/types.js";
import { ICON_SQUARE, iconPlaces, TILE_SIZE } from "../view/terrain-picture.js";
import { ICONS, IconMask, reason, Section } from "./sample-parts.js";

/** Room around the tiles for the outlines' stroke, as in `terrain-drawing.tsx`. */
const MARGIN = 4;

/** A tile of a sample: where it stands, whether it is known, its icons and its outline. */
type SampleTile = {
  at: Hex;
  revealed: boolean;
  /** No icons, every resource's icon, or every icon with the first one depleted. */
  icons: "none" | "all" | "first-depleted";
  outline: "character" | "step-target" | "link-highlight" | null;
};

/** The tiles of a sample drawn as the terrain panel draws its tiles, under the game's classes. */
function TileDrawing({ tiles }: { tiles: readonly SampleTile[] }) {
  const corners = hexCorners(TILE_SIZE);
  const centres = tiles.map((tile) => hexCenter(tile.at, TILE_SIZE));
  const xs = centres.flatMap((c) => corners.map((k) => c.x + k.x));
  const ys = centres.flatMap((c) => corners.map((k) => c.y + k.y));
  const left = Math.min(...xs) - MARGIN;
  const top = Math.min(...ys) - MARGIN;
  const width = Math.max(...xs) - Math.min(...xs) + 2 * MARGIN;
  const height = Math.max(...ys) - Math.min(...ys) + 2 * MARGIN;
  const pointsOf = (index: number): string =>
    corners
      .map((k) => `${centres[index].x + k.x},${centres[index].y + k.y}`)
      .join(" ");
  return (
    <svg
      className="terrain-drawing"
      width={width}
      height={height}
      viewBox={`${left} ${top} ${width} ${height}`}
      aria-hidden="true"
    >
      {tiles.map((tile, index) => {
        const { x: cx, y: cy } = centres[index];
        const icons = tile.icons === "none" ? [] : ICONS;
        // The game's placement of the icons on a tile, with its tile size and icon square.
        const places = iconPlaces(
          icons.length,
          cx,
          cy,
          TILE_SIZE * ICON_SQUARE,
        );
        return (
          <g key={index} className={tile.revealed ? "tile revealed" : "tile"}>
            <polygon points={pointsOf(index)} />
            {icons.map((href, i) => (
              // As the drawing of the game draws an icon: the mask in the square of a foreign object.
              <foreignObject
                key={href}
                x={places[i].x}
                y={places[i].y}
                width={places[i].size}
                height={places[i].size}
                className={
                  tile.icons === "first-depleted" && i === 0
                    ? "icon dimmed"
                    : "icon"
                }
              >
                <IconMask href={href} tag="div" />
              </foreignObject>
            ))}
          </g>
        );
      })}
      {/* Outlines go on top of every tile, as the terrain panel draws them. */}
      {tiles.map((tile, index) =>
        tile.outline === null ? null : (
          <polygon
            key={index}
            points={pointsOf(index)}
            className={`outline ${tile.outline}`}
          />
        ),
      )}
    </svg>
  );
}

const HERE: Hex = { q: 0, r: 0 };
const EAST: Hex = { q: 1, r: 0 };

/** A row of the list of revealed tiles marked by the link highlight, as on hover in the game. */
function LinkedRow() {
  return (
    <table className="tile-list">
      <tbody>
        <tr className="hovered">
          <th scope="row">{tileLabel({ col: 0, row: 0 })}</th>
          {["12", "8", "6", "6"].slice(0, ICONS.length).map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

/** The samples of tiles, one per state the terrain panel draws, with their names on the page. */
const TILE_SAMPLES: readonly (readonly [string, ReactNode, string?])[] = [
  [
    "Kafelek nieodsłonięty",
    <TileDrawing
      key="hidden"
      tiles={[{ at: HERE, revealed: false, icons: "none", outline: null }]}
    />,
  ],
  [
    "Kafelek odsłonięty z ikonami",
    <TileDrawing
      key="revealed"
      tiles={[{ at: HERE, revealed: true, icons: "all", outline: null }]}
    />,
  ],
  [
    "Krawędź między kafelkami obu rodzajów",
    <TileDrawing
      key="edge"
      tiles={[
        { at: HERE, revealed: false, icons: "none", outline: null },
        { at: EAST, revealed: true, icons: "all", outline: null },
      ]}
    />,
  ],
  [
    "Postać",
    <TileDrawing
      key="character"
      tiles={[{ at: HERE, revealed: true, icons: "all", outline: "character" }]}
    />,
  ],
  [
    "Cel kroku na kafelku nieodsłoniętym i odsłoniętym",
    <TileDrawing
      key="step-target"
      tiles={[
        { at: HERE, revealed: false, icons: "none", outline: "step-target" },
        { at: EAST, revealed: true, icons: "all", outline: "step-target" },
      ]}
    />,
  ],
  [
    "Podświetlenie powiązania: kafelek i jego wiersz listy",
    <>
      <TileDrawing
        tiles={[
          { at: HERE, revealed: true, icons: "all", outline: "link-highlight" },
        ]}
      />
      <LinkedRow />
    </>,
  ],
  [
    "Wyczerpane: pierwsza ikona przy zapasie zero",
    <TileDrawing
      key="depleted"
      tiles={[
        { at: HERE, revealed: true, icons: "first-depleted", outline: null },
      ]}
    />,
    "W grze zbieranie zabiera zapas z kafelka; przy zapasie zero ikona przygasa.",
  ],
];

export function TilesSection() {
  return (
    <Section title="Próbki kafelków">
      <div className="tile-samples">
        {TILE_SAMPLES.map(([name, drawing, note]) => (
          <figure key={name} className="tile-sample">
            {drawing}
            <figcaption>{name}</figcaption>
            {note === undefined ? null : reason(note)}
          </figure>
        ))}
      </div>
    </Section>
  );
}
