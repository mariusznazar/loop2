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
 * between „Potem” and the lines below the backpack.
 *
 * The row moves by CSS alone (run-screen.css): a value below its threshold pulses, which goes on while
 * game time stands, and a creature's blow shakes the health cell and shows the fading „−{n} · {creature}”
 * in it, which stand where they reached while it stands and go on with it (D-337, D-450). The row
 * reads the blow from the events of the simulation call that returned the run (D-04), as the scene reads
 * its effects: a first draw, which has no new events, shows none, and it keeps nothing but the one
 * marker of the last blow, which is dropped when its animation has ended or the browser has cancelled
 * it, as it does when the screen is hidden. How game time stands comes as the scene's standing, marked on
 * the row for the stylesheet. Nothing runs when the module is imported.
 */
import { useId, useState, type CSSProperties } from "react";
import { MAPS } from "../sim/data/maps.js";
import type { GameEvent } from "../sim/game.js";
import type { MapRun, Pace } from "../sim/types.js";
import { blowMarker } from "./body-blow.js";
import type { SceneStanding } from "./scene-picture.js";
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
  /** The events of the simulation call that returned `run`, where a blow is read from (D-04). */
  events: readonly GameEvent[];
  /** The pace in force, which decides whether a blow shows (D-450). */
  pace: Pace;
  /** How the scene stands, so how game time stands: the row's motion that stands with it reads it. */
  standing: SceneStanding;
};

/** The marker of the last blow the row shows: its words and the number of the blow, which a new blow raises. */
type ShownBlow = { text: string; serial: number };

/** What the row keeps of the blows: the events it has seen, the marker it shows and the last number given. */
type BlowMemory = {
  seen: readonly GameEvent[];
  shown: ShownBlow | null;
  serial: number;
};

/**
 * The memory after a reading with `events`: the same memory where they are the ones already seen, so a
 * redraw from the same call shows nothing new, and otherwise the marker of the blow they hold, which
 * replaces the one shown, or the one shown where they hold none (D-450).
 */
function advanceBlow(
  memory: BlowMemory,
  events: readonly GameEvent[],
  run: MapRun,
  pace: Pace,
): BlowMemory {
  if (events === memory.seen) return memory;
  const marker = blowMarker(events, run.lastCombat, pace);
  if (marker === null) return { ...memory, seen: events };
  const serial = memory.serial + 1;
  return { seen: events, shown: { text: marker.text, serial }, serial };
}

/**
 * The marker's own listener for an animation the browser cancels, as it does when the screen is hidden:
 * it is over then as it is when the animation has run out, so a screen shown again does not play it from
 * its start, and, standing, show it frozen (D-450).
 */
function watchCancel(over: () => void) {
  return (text: HTMLSpanElement | null) => {
    if (text === null) return;
    text.addEventListener("animationcancel", over);
    return () => text.removeEventListener("animationcancel", over);
  };
}

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
 * The health cell, which is no button: the same parts in a block. A blow shown marks it for its shake,
 * `odd` or `even` by the number of the blow, so that a new blow changes the mark and starts the shake
 * anew in place of continuing the one before, and puts its fading text in it (D-450, run-screen.css).
 */
function HealthCell({
  parts,
  blow,
  onOver,
}: {
  parts: CellParts;
  blow: ShownBlow | null;
  onOver: (serial: number) => void;
}) {
  const over = () => {
    if (blow !== null) onOver(blow.serial);
  };
  return (
    <div
      className={["value-cell-static", ...(parts.marks ?? [])].join(" ")}
      data-blow={
        blow === null ? undefined : blow.serial % 2 === 0 ? "even" : "odd"
      }
    >
      <ValueCellParts cell={parts} />
      {blow === null ? null : (
        <span
          key={blow.serial}
          className="body-blow-text"
          ref={watchCancel(over)}
          onAnimationEnd={over}
        >
          {blow.text}
        </span>
      )}
    </div>
  );
}

/**
 * One cell: the shared button of a cell, or for health, which is no button, the same parts in a block.
 * The button says whether its explanation stands open and, while it does, names it by its id, and a
 * click on it reports to the row (D-450).
 */
function BodyCell({
  cell,
  expanded,
  explanationId,
  onToggle,
  blow,
  onBlowOver,
}: {
  cell: BodyRowCell;
  expanded: boolean;
  explanationId: string;
  onToggle: () => void;
  blow: ShownBlow | null;
  onBlowOver: (serial: number) => void;
}) {
  const parts = cellParts(cell);
  if (cell.id === "health")
    return <HealthCell parts={parts} blow={blow} onOver={onBlowOver} />;
  return (
    <ReactButton
      kind="value-cell"
      cell={parts}
      expanded={expanded}
      controls={expanded ? explanationId : undefined}
      onClick={onToggle}
    />
  );
}

/**
 * The body row: its cells in two pairs, the explanation of the value whose cell is open right under
 * them, then the line of the backpack. The one open cell is the row's state (D-450, D-407): a click on
 * the open cell closes it, a click on another cell opens that one instead.
 */
export function BodyRowCells({
  run,
  events,
  pace,
  standing,
}: BodyRowCellsProps) {
  const [open, setOpen] = useState<BodyCellId | null>(null);
  const explanationId = useId();
  // Advanced while rendering, as the props change, as the scene does: what the row keeps of the blows
  // meets the events of this reading, and the render that follows draws from what it then keeps. The
  // events of the first draw are the ones already seen, so a first draw, a reload and a load show none.
  const [kept, setKept] = useState<BlowMemory>(() => ({
    seen: events,
    shown: null,
    serial: 0,
  }));
  const blows = advanceBlow(kept, events, run, pace);
  if (blows !== kept) setKept(blows);
  const blowOver = (serial: number) =>
    setKept((now) =>
      now.shown?.serial === serial ? { ...now, shown: null } : now,
    );
  const map = MAPS[run.mapId];
  const cells = bodyRowCells(run, map);
  const pairs = [cells.slice(0, 2), cells.slice(2)];
  const explanation = open === null ? null : bodyExplanation(open, map);
  const toggle = (id: BodyCellId) =>
    setOpen((current) => (current === id ? null : id));
  return (
    <div className="body-row" data-standing={standing}>
      <div className="body-cells">
        {pairs.map((pair, index) => (
          <div key={index} className="body-cell-pair">
            {pair.map((cell) => (
              <BodyCell
                key={cell.id}
                cell={cell}
                expanded={open === cell.id}
                explanationId={explanationId}
                onToggle={() => toggle(cell.id)}
                blow={cell.id === "health" ? blows.shown : null}
                onBlowOver={blowOver}
              />
            ))}
          </div>
        ))}
      </div>
      {explanation === null ? null : (
        <p className="body-explanation" id={explanationId}>
          {explanation}
        </p>
      )}
      <p className="backpack-text">{backpackText(run.character)}</p>
    </div>
  );
}
