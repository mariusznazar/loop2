/**
 * The body row of the screen of a map run (D-337, D-311, D-178): the four values of the body, each in
 * a cell of its own with its note under temperature and satiety, and the line of the backpack under
 * them. It draws from the map run it is given, the map's data included, and holds no state of its own.
 * The world area draws it between „Potem” and the lines below the backpack. Nothing runs when the
 * module is imported.
 */
import { MAPS } from "../sim/data/maps.js";
import type { MapRun } from "../sim/types.js";
import { backpackText, bodyCells } from "./body-row.js";

/** What the world area gives the body row: the map run on the screen, whatever its game minute. */
export type BodyRowCellsProps = {
  /** The map run whose body and character the row shows. */
  run: MapRun;
};

/** The body row: its cells, each with its value and, under temperature and satiety, its note, and the backpack. */
export function BodyRowCells({ run }: BodyRowCellsProps) {
  return (
    <div className="body-row">
      <div className="body-cells">
        {bodyCells(run, MAPS[run.mapId]).map((cell, index) => (
          <div key={index} className="body-cell">
            <span className={cell.danger ? "body-value danger" : "body-value"}>
              {cell.text}
            </span>
            {cell.note === null ? null : (
              <span
                className={cell.note.danger ? "body-note danger" : "body-note"}
              >
                {cell.note.text}
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="backpack-text">{backpackText(run.character)}</p>
    </div>
  );
}
