/**
 * The catalog of the maps on the left of the screen Mapy, in React (D-325, D-331, D-134, D-149): the
 * search field with its magnifying glass above the list, the three views as buttons selected in their
 * group, and under them the regions with their counters and the rows of the maps, drawn from the pure
 * lines of `catalog-lines.ts`. Each row is a link to `#/mapy/{map}` with the state circle at its left,
 * the name, the facts of the map and the icons of its attackers; the row of the picked map is marked
 * filled with a bar at its left. In „Dokąd” the solved maps of a region stand folded under one row that unfolds them,
 * and in „Postęp” a map not yet opened stands as an empty place with no name.
 *
 * The view, the typed text and the regions the player unfolded, and those whose matches of a search the
 * player folded, are the state of this component, so they live as long as the screen does and no
 * longer. The fold row always works; a picked solved map under a folded row stands above it, which the
 * lines decide, and the pick is stored nowhere (D-331). The component names no map, resource or
 * creature: every name comes from the lines. Nothing here runs when the module is imported.
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import type { RegionName } from "../sim/data/maps.js";
import type { MapId } from "../sim/types.js";
import { catalogLines } from "./catalog-lines.js";
import type {
  CatalogFact,
  CatalogMapRow,
  CatalogResourceRow,
  CatalogView,
  DokadRegion,
  PostepRegion,
  ResourceGroup,
} from "./catalog-lines.js";
import { CATALOG_VIEWS } from "./catalog-lines.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { SEARCH_ICON } from "./credits.js";
import { screenAddress } from "./screen-address.js";

export type MapCatalogProps = {
  /** The maps the player has solved, from the game state. */
  solvedMaps: readonly MapId[];
  /** The map the address names, or null where none is picked. */
  selected: MapId | null;
  /** The record of D-440 for a map, or null; the catalog asks at each draw, so a new record shows at once. */
  recordOf: (mapId: MapId) => number | null;
};

/** An icon of the icon directory drawn as a mask in the colour of the text beside it (D-43). */
function IconMask({
  name,
  className = "maps-catalog-icon",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`icon-mask ${className}`}
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${name}.svg")` } as CSSProperties}
    />
  );
}

/** The state circle of a map: filled where the map is solved, empty where it is open (D-331). */
function StateCircle({ solved }: { solved: boolean }) {
  return (
    <span
      className={solved ? "maps-catalog-state solved" : "maps-catalog-state"}
      role="img"
      aria-label={solved ? "Rozwiązana" : "Otwarta"}
    >
      {solved ? "●" : "○"}
    </span>
  );
}

/** The class of a fact by its role: `warning`, `text` where the fact says so (the record, D-440), else the facts' own. */
function factClass(fact: CatalogFact): string {
  if (fact.warning) return "maps-catalog-fact maps-card-warning";
  return fact.role === "text"
    ? "maps-catalog-fact maps-catalog-record"
    : "maps-catalog-fact";
}

/** One fact of a row; it is an element of its own so that a narrow row breaks between facts, never inside one. */
function Fact({ fact }: { fact: CatalogFact }) {
  return <span className={factClass(fact)}>{fact.text}</span>;
}

/** Facts joined by „ · ”, each one in the role `warning` where it is a warning. */
function Facts({ facts }: { facts: readonly CatalogFact[] }) {
  return (
    <span className="maps-catalog-facts">
      {facts.map((fact, index) => (
        <span key={fact.text}>
          {index === 0 ? "" : " · "}
          <Fact fact={fact} />
        </span>
      ))}
    </span>
  );
}

/** A row of a map: its state, its name and facts, and the icons of its attackers; a link to its card. */
function MapRowItem({ row }: { row: CatalogMapRow }) {
  return (
    <li>
      <a
        className="maps-list-item maps-catalog-row"
        href={screenAddress({ kind: "map", mapId: row.id })}
        aria-current={row.selected ? "page" : undefined}
      >
        <StateCircle solved={row.solved} />
        <span className="maps-catalog-main">
          <span className="maps-catalog-name">{row.name}</span>{" "}
          <Facts facts={row.facts} />
        </span>
        <span className="maps-catalog-icons">
          {row.icons.map((icon, index) => (
            <IconMask key={`${icon}|${index}`} name={icon} />
          ))}
        </span>
      </a>
    </li>
  );
}

/** A row of „Co daje”: the state and name of a map, what it holds of the resource, and its renewal. */
function ResourceRowItem({ row }: { row: CatalogResourceRow }) {
  return (
    <li>
      <a
        className="maps-list-item maps-catalog-row"
        href={screenAddress({ kind: "map", mapId: row.id })}
        aria-current={row.selected ? "page" : undefined}
      >
        <StateCircle solved={row.solved} />
        <span className="maps-catalog-main">
          <span className="maps-catalog-name">{row.name}</span>{" "}
          <span className="maps-catalog-facts">
            <Fact fact={{ text: row.spread, warning: false }} />
            {" · "}
            <Fact fact={row.renewal} />
          </span>
        </span>
      </a>
    </li>
  );
}

/** A region of „Dokąd”: the open maps, then the solved ones folded under one row that unfolds them. */
function DokadGroup({
  region,
  onToggle,
}: {
  region: DokadRegion;
  onToggle: (name: RegionName) => void;
}) {
  const { solved } = region;
  return (
    <section className="maps-catalog-region">
      <h3 className="maps-catalog-region-header">{region.header}</h3>
      <ul className="maps-list-items" aria-label={region.header}>
        {region.rows.map((row) => (
          <MapRowItem key={row.id} row={row} />
        ))}
        {solved === null ? null : (
          <>
            <li className="maps-catalog-fold">
              <ReactButton
                text={`${solved.expanded ? "▾" : "▸"} ${solved.text}`}
                expanded={solved.expanded}
                onClick={() => onToggle(region.region)}
              />
            </li>
            {solved.expanded
              ? solved.rows.map((row) => <MapRowItem key={row.id} row={row} />)
              : null}
          </>
        )}
      </ul>
    </section>
  );
}

/** A region of „Postęp”: its maps, then one empty place with no name for each map not yet opened. */
function PostepGroup({ region }: { region: PostepRegion }) {
  return (
    <section className="maps-catalog-region">
      <h3 className="maps-catalog-region-header">{region.header}</h3>
      <ul className="maps-list-items" aria-label={region.header}>
        {region.rows.map((row) => (
          <MapRowItem key={row.id} row={row} />
        ))}
        {Array.from({ length: region.empty }, (_, index) => (
          <li
            key={index}
            className="maps-catalog-empty-place"
            aria-hidden="true"
          >
            <span className="maps-catalog-empty-bar" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A group of „Co daje”: one resource with its icon, name and count, and the maps that give it. */
function ResourceGroupItem({ group }: { group: ResourceGroup }) {
  return (
    <section className="maps-catalog-region">
      <h3 className="maps-catalog-region-header">
        <IconMask name={group.icon} />
        <span className="maps-catalog-group-name">{group.name}</span>
        <span className="maps-catalog-group-count">{group.count}</span>
      </h3>
      <ul className="maps-list-items" aria-label={group.name}>
        {group.rows.map((row) => (
          <ResourceRowItem key={row.id} row={row} />
        ))}
      </ul>
    </section>
  );
}

/** The catalog: search, the three views and the list of the picked view (D-325). */
export function MapCatalog({
  solvedMaps,
  selected,
  recordOf,
}: MapCatalogProps) {
  const [view, setView] = useState<CatalogView>("dokad");
  const [query, setQuery] = useState("");
  const [unfolded, setUnfolded] = useState<readonly RegionName[]>([]);
  const [foldedInSearch, setFoldedInSearch] = useState<readonly RegionName[]>(
    [],
  );
  const lines = catalogLines({
    solvedMaps,
    query,
    view,
    unfolded,
    foldedInSearch,
    selected,
    recordOf,
  });
  // With a search typed the fold row folds and unfolds the matches, and with none the whole group; each
  // keeps its own state, so clearing the search brings back the folding the player left there.
  const toggle = (name: RegionName) =>
    (query.trim() === "" ? setUnfolded : setFoldedInSearch)((now) =>
      now.includes(name) ? now.filter((each) => each !== name) : [...now, name],
    );
  return (
    <div className="maps-catalog">
      <div className="maps-catalog-search">
        <IconMask
          name={SEARCH_ICON.icon}
          className="maps-catalog-search-icon"
        />
        <ReactTextField
          label="Szukaj mapy albo zasobu"
          hint="szukaj mapy albo zasobu"
          spellCheck={false}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="maps-catalog-views">
        {CATALOG_VIEWS.map((each) => (
          <ReactButton
            key={each.id}
            text={each.label}
            selected={view === each.id}
            onClick={() => setView(each.id)}
          />
        ))}
      </div>
      <p className="maps-catalog-counter">{lines.counter}</p>
      {lines.none === null ? null : (
        <p className="maps-catalog-none">{lines.none}</p>
      )}
      {lines.view === "dokad"
        ? lines.regions.map((region) => (
            <DokadGroup key={region.region} region={region} onToggle={toggle} />
          ))
        : null}
      {lines.view === "postep"
        ? lines.regions.map((region) => (
            <PostepGroup key={region.header} region={region} />
          ))
        : null}
      {lines.view === "coDaje"
        ? lines.groups.map((group) => (
            <ResourceGroupItem key={group.resource} group={group} />
          ))
        : null}
    </div>
  );
}
