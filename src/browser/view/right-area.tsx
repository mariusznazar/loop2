/**
 * The right area of the screen of a map run while no rule or group is open, in React (D-311, D-338,
 * D-343, D-344, D-346, D-147, D-276, D-130, D-46; task kronika-z-filtrami, To do 6, 8 and 9; spec D5,
 * D6, D7, D9): the tabs „Kronika” and „Teren” — shared buttons of the kind `tab` in a container of
 * the class `tabs` — and under the one picked either the chronicle or the table of revealed tiles.
 * The chronicle is a row of the seven filter buttons, shared buttons selected in their group as the
 * pace buttons are, and under it the list of the entries of the filter, newest first, each row the
 * game minute alone in a column and the entry's text in the role of its kind. The paragraph of the
 * last encounter stands among the entries at the place the chronicle memory keeps for it, composed
 * here from the `lastCombat` of the game state drawn, again only when that changed (D-147). The list
 * draws a window of the newest entries and grows it by a scroll near its end, so the rows drawn do not
 * grow with the chronicle, and a row is drawn again only when its own entry changed (spec D7).
 *
 * The picked tab and filter are the chronicle memory's, not the area's: a click tells the memory, and
 * the area reads the memory as an external store, so the pick outlives the area and comes back after
 * a rule panel closes (D-346). The rule panel taking the whole area is the screen's concern. Nothing
 * runs when the module is imported.
 */
import { memo, useMemo, useState, useSyncExternalStore } from "react";
import type { GameState, LastCombat } from "../sim/types.js";
import type {
  Chronicle,
  ChronicleFilter,
  ChronicleSnapshot,
  ChronicleTab,
} from "./chronicle.js";
import type { ChronicleRole } from "./chronicle-entries.js";
import { combatText } from "./combat-line.js";
import { ReactButton } from "./controls/react-button.js";
import { TileTable } from "./tile-table.js";

/** The tabs in the order they stand, with their words (D-311). */
const TABS: readonly (readonly [ChronicleTab, string])[] = [
  ["chronicle", "Kronika"],
  ["terrain", "Teren"],
];

/** The filter buttons in the order they stand, with their words (D-343). */
const FILTERS: readonly (readonly [ChronicleFilter, string])[] = [
  ["all", "Wszystko"],
  ["discovery", "Odkrycia"],
  ["action", "Czynności"],
  ["combat", "Walka"],
  ["change", "Moje zmiany"],
  ["streak", "Passa"],
  ["world", "Świat"],
];

/** The empty list's sentence (D-343). */
const EMPTY = "Nic tu jeszcze nie ma.";

/** How many of a filter's newest entries the list draws first, and by how many a scroll grows that. */
const WINDOW_SIZE = 60;

/** How near the end of the list, in pixels of scroll, a scroll grows the window (spec D7). */
const NEAR_END = 160;

/** What the screen gives the area; every render gives it whole. */
export type RightAreaProps = {
  /** The game state the area draws; the table lists its map run, the paragraph is its `lastCombat`. */
  state: GameState;
  /** The chronicle memory of the map run, which holds the entries, the tab and the filter picked. */
  chronicle: Chronicle;
  /** The key of the hovered tile, „col,row”, or null when none is hovered; the table marks its row. */
  hovered: string | null;
  /** Called with the key of the row under the pointer, or null when none is under it. */
  onHover: (key: string | null) => void;
};

type RowProps = {
  minute: number;
  text: string;
  role: ChronicleRole;
};

/** A row of the list: the minute alone in its column, the text in the role of its kind (D-343). */
const Row = memo(function Row({ minute, text, role }: RowProps) {
  return (
    <li className="chronicle-row">
      <span className="chronicle-minute">{minute}</span>
      <span
        className={
          role === "text" ? "chronicle-text" : `chronicle-text ${role}`
        }
      >
        {text}
      </span>
    </li>
  );
});

type ListProps = {
  chronicle: Chronicle;
  snapshot: ChronicleSnapshot;
  combat: LastCombat | null;
};

/**
 * The list of the filter picked. Its window is its own state, and the chronicle keys it by the
 * filter and the number of the map run, so picking a filter and the start of a map run, by a send or
 * by „Restart”, start the window anew (spec D7). The window is read from the memory only when the
 * memory, the filter or the window changed.
 */
function ChronicleList({ chronicle, snapshot, combat }: ListProps) {
  const [size, setSize] = useState(WINDOW_SIZE);
  const visible = useMemo(
    () => chronicle.window(snapshot.filter, size),
    [chronicle, snapshot, size],
  );
  const paragraph = useMemo(
    () => (combat === null ? null : combatText(combat)),
    [combat],
  );
  const rows = visible.rows.flatMap((row) => {
    if (row.kind === "entry")
      return [
        <Row
          key={row.key}
          minute={row.entry.minute}
          text={row.entry.text}
          role={row.entry.role}
        />,
      ];
    return paragraph === null
      ? []
      : [
          <Row
            key="paragraph"
            minute={row.minute}
            text={paragraph}
            role="text"
          />,
        ];
  });
  if (rows.length === 0) return <p className="chronicle-empty">{EMPTY}</p>;
  return (
    <ul
      className="chronicle-list"
      onScroll={(event) => {
        const list = event.currentTarget;
        if (
          visible.more &&
          list.scrollHeight - list.scrollTop - list.clientHeight < NEAR_END
        )
          setSize(size + WINDOW_SIZE);
      }}
    >
      {rows}
    </ul>
  );
}

/**
 * The chronicle: the filter row and the list under it. It is drawn again only when the memory, the
 * tab or filter picked or the encounter changed, not at each reading of the clock.
 */
const ChronicleView = memo(function ChronicleView({
  chronicle,
  snapshot,
  combat,
}: ListProps) {
  return (
    <div className="chronicle">
      <div className="chronicle-filters">
        {FILTERS.map(([filter, text]) => (
          <ReactButton
            key={filter}
            text={text}
            selected={snapshot.filter === filter}
            onClick={() => chronicle.pickFilter(filter)}
          />
        ))}
      </div>
      <ChronicleList
        key={`${snapshot.filter}:${snapshot.runNumber}`}
        chronicle={chronicle}
        snapshot={snapshot}
        combat={combat}
      />
    </div>
  );
});

/** The right area: the tabs, and under the one picked the chronicle or the table of revealed tiles. */
export function RightArea({
  state,
  chronicle,
  hovered,
  onHover,
}: RightAreaProps) {
  const snapshot = useSyncExternalStore(
    chronicle.subscribe,
    chronicle.snapshot,
  );
  return (
    <>
      <div className="right-tabs tabs">
        {TABS.map(([tab, text]) => (
          <ReactButton
            key={tab}
            text={text}
            kind="tab"
            selected={snapshot.tab === tab}
            onClick={() => {
              if (tab === snapshot.tab) return;
              // The table leaves, so the tile its row marked is no longer hovered.
              onHover(null);
              chronicle.pickTab(tab);
            }}
          />
        ))}
      </div>
      {snapshot.tab === "chronicle" ? (
        <ChronicleView
          chronicle={chronicle}
          snapshot={snapshot}
          combat={state.run?.lastCombat ?? null}
        />
      ) : (
        <TileTable state={state} hovered={hovered} onHover={onHover} />
      )}
    </>
  );
}
