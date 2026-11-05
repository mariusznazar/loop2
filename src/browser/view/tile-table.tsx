/**
 * The table of revealed tiles in React (D-19, D-70, D-125, D-311; task ekran-przejscia, To do 3 and
 * 5): a column per resource of the map, a row per revealed tile with its stock, and a last cell with
 * the state of the campfire and the burning items standing on the tile. It stands in the right area
 * of the screen of a map run, away from the drawing, and shares the hovered tile with it: a hovered
 * row reports its tile's key through `onHover` and the row of the hovered tile is marked. The
 * hovered tile's key is the screen's, not the table's. It imports the pure `tileList` and builds no
 * element after the pattern of a DOM module (D-265). Nothing runs when the module is imported.
 */
import type { GameState } from "../sim/types.js";
import { tileKey, tileList } from "./tile-list.js";

/** What the screen gives the table; every render gives it whole. */
export type TileTableProps = {
  /** The game state the table lists; it lists nothing while the state holds no map run. */
  state: GameState;
  /** The key of the hovered tile, „col,row”, or null when none is hovered. */
  hovered: string | null;
  /** Called with the key of the row under the pointer, or null when the pointer is over no row. */
  onHover: (key: string | null) => void;
};

/** Between the texts of the campfire and the burning items of one row. */
const SEPARATOR = " · ";
/** The side of the icon in a column heading. */
const ICON_SIZE = 16;

/** The table; the listeners sit on the table, so they do not depend on its rows. */
export function TileTable({ state, hovered, onHover }: TileTableProps) {
  if (state.run === null) return null;
  const list = tileList(state);
  return (
    <table
      className="tile-list"
      onPointerOver={(event) => {
        const row =
          event.target instanceof Element
            ? event.target.closest("tbody tr[data-tile]")
            : null;
        onHover(row?.getAttribute("data-tile") ?? null);
      }}
      onPointerLeave={() => onHover(null)}
    >
      <thead>
        <tr>
          <th />
          {list.columns.map((column) => (
            <th key={column.resource} scope="col">
              <img
                src={column.href}
                alt=""
                width={ICON_SIZE}
                height={ICON_SIZE}
              />{" "}
              {column.name}
            </th>
          ))}
          {/* The column of the campfire and the burning items has no heading: each text names its thing. */}
          <th />
        </tr>
      </thead>
      <tbody>
        {list.rows.map((row) => {
          const key = tileKey(row);
          return (
            <tr
              key={key}
              data-tile={key}
              className={key === hovered ? "hovered" : undefined}
            >
              <th scope="row">{row.label}</th>
              {row.cells.map((value, index) => (
                <td key={list.columns[index].resource}>{value}</td>
              ))}
              <td className="tile-fire">{row.fire.join(SEPARATOR)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
