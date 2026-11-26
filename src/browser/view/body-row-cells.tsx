/**
 * The body row of the screen of a map run (D-337, D-311, D-178, D-39, D-40, D-44): the four values of
 * the body, each in a cell of its own — its name at the left and its number at the right, under them a
 * bar, or for temperature the scale with its marker, and under the bar the note of temperature and of
 * satiety — and the line of the backpack under them. The cells of temperature, satiety and nature
 * energy are the shared button of a cell; health is no button and stands in the same parts. The cells
 * stand in two pairs, so that a row too narrow for four breaks into two rows of two (run-screen.css).
 * A click on one of those three buttons opens the explanation of its value right under the cells and
 * above the backpack, and at most one stands open (D-450); that one state is the component's own
 * (D-407). It draws from the map run it is given, the map's data included. The world area draws it
 * between „Potem” and the lines below the backpack. Nothing runs when the module is imported.
 */
import { useState, type CSSProperties } from "react";
import { MAPS } from "../sim/data/maps.js";
import type { MapRun } from "../sim/types.js";
import {
  backpackText,
  bodyExplanation,
  bodyRowCells,
  temperatureZones,
  type BodyCellId,
  type BodyMeter,
  type BodyRowCell,
} from "./body-row.js";
import {
  ReactButton,
  ValueCellParts,
  type CellBar,
  type CellFillRole,
  type CellParts,
} from "./controls/react-button.js";

/** What the world area gives the body row: the map run on the screen, whatever its game minute. */
export type BodyRowCellsProps = {
  /** The map run whose body and character the row shows. */
  run: MapRun;
};

/** The role of the fill of each value that stands on a bar: the colour of the value (D-39, D-40). */
const FILL_ROLES: Record<Exclude<BodyCellId, "temperature">, CellFillRole> = {
  satiety: "satiety-fill",
  health: "positive",
  natureEnergy: "text-strong",
};

/**
 * The scale of temperature (D-337, D-40): its three zones, each as wide as its share of the scale,
 * and the marker at the temperature now, `--share` of the way from the left end. The zone the marker
 * stands in is named `holds-marker`, for the alarm that goes with the marker.
 */
function TemperatureScale({ meter }: { meter: BodyMeter }) {
  const held = meter.kind === "scale" ? meter.zone : null;
  return (
    <span
      className="body-scale"
      style={{ "--share": meter.share / 100 } as CSSProperties}
    >
      {temperatureZones().map(({ zone, share }) => (
        <span
          key={zone}
          className={
            zone === held
              ? `body-scale-zone ${zone} holds-marker`
              : `body-scale-zone ${zone}`
          }
          style={{ "--zone-share": share } as CSSProperties}
        />
      ))}
      <span className="body-scale-marker" />
    </span>
  );
}

/** What stands under a cell's name and number: the scale of temperature, or a bar in the value's colour. */
function cellBar(id: BodyCellId, meter: BodyMeter): CellBar {
  return meter.kind === "scale" || id === "temperature"
    ? { scale: <TemperatureScale meter={meter} /> }
    : { share: meter.share / 100, fillRole: FILL_ROLES[id] };
}

/**
 * The parts of a cell as the shared control draws them, with its states as marks for run-screen.css:
 * `alarm` for a value below its threshold, `note-danger` for „marznie” and „głoduje”, and
 * `frame-warming` or `frame-cooling` for the frame of the temperature cell (D-337, D-39).
 */
function cellParts(cell: BodyRowCell): CellParts {
  const marks = [
    cell.alarm ? "alarm" : null,
    cell.note?.danger ? "note-danger" : null,
    cell.frame === "warming" || cell.frame === "cooling"
      ? `frame-${cell.frame}`
      : null,
  ].filter((mark): mark is string => mark !== null);
  return {
    name: cell.name,
    number: cell.number,
    bar: cellBar(cell.id, cell.meter),
    note: cell.note === null ? null : cell.note.text,
    marks,
  };
}

/**
 * One cell: the shared button of a cell, or for health, which is no button, the same parts in a block.
 * The button says whether its explanation stands open, and a click on it reports to the row (D-450).
 */
function BodyCell({
  cell,
  expanded,
  onToggle,
}: {
  cell: BodyRowCell;
  expanded: boolean;
  onToggle: () => void;
}) {
  const parts = cellParts(cell);
  if (cell.id === "health") {
    return (
      <div className={["value-cell-static", ...(parts.marks ?? [])].join(" ")}>
        <ValueCellParts cell={parts} />
      </div>
    );
  }
  return (
    <ReactButton
      kind="value-cell"
      cell={parts}
      expanded={expanded}
      onClick={onToggle}
    />
  );
}

/**
 * The body row: its cells in two pairs, the explanation of the value whose cell is open right under
 * them, then the line of the backpack. The one open cell is the row's state (D-450, D-407): a click on
 * the open cell closes it, a click on another cell opens that one instead.
 */
export function BodyRowCells({ run }: BodyRowCellsProps) {
  const [open, setOpen] = useState<BodyCellId | null>(null);
  const map = MAPS[run.mapId];
  const cells = bodyRowCells(run, map);
  const pairs = [cells.slice(0, 2), cells.slice(2)];
  const explanation = open === null ? null : bodyExplanation(open, map);
  const toggle = (id: BodyCellId) =>
    setOpen((current) => (current === id ? null : id));
  return (
    <div className="body-row">
      <div className="body-cells">
        {pairs.map((pair, index) => (
          <div key={index} className="body-cell-pair">
            {pair.map((cell) => (
              <BodyCell
                key={cell.id}
                cell={cell}
                expanded={open === cell.id}
                onToggle={() => toggle(cell.id)}
              />
            ))}
          </div>
        ))}
      </div>
      {explanation === null ? null : (
        <p className="body-explanation">{explanation}</p>
      )}
      <p className="backpack-text">{backpackText(run.character)}</p>
    </div>
  );
}
