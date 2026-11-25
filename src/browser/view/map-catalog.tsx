/**
 * The catalog of the maps on the left of the screen Mapy, in React (D-325, D-331, D-134, D-149): the
 * search field above the list, the three views as tabs, and under them the regions with their
 * counters and the rows of the maps, drawn from the pure lines of `catalog-lines.ts`. Each row is a
 * link to `#/mapy/{map}` with the state circle at its left, the name, the facts of the map and the
 * icons of its attackers; the row of the picked map is marked as the picked row of the list of
 * programs is. In „Dokąd” the solved maps of a region stand folded under one row that unfolds them,
 * and in „Postęp” a map not yet opened stands as an empty place with no name.
 *
 * The view, the typed text and the regions the player unfolded are the state of this component, so
 * they live as long as the screen does and no longer. The group of the picked map is unfolded in the
 * drawing and stored nowhere (D-331). The component names no map, resource or creature: every name
 * comes from the lines. Nothing here runs when the module is imported.
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { REGIONS } from "../sim/data/maps.js";
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
import { screenAddress } from "./screen-address.js";

export type MapCatalogProps = {
  /** The maps the player has solved, from the game state. */
  solvedMaps: readonly MapId[];
  /** The map the address names, or null where none is picked. */
  selected: MapId | null;
};

/** An icon of the icon directory drawn as a mask in the colour of the text beside it (D-43). */
function IconMask({ name }: { name: string }) {
  return (
    <span
      className="icon-mask maps-catalog-icon"
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${name}.svg")` } as CSSProperties}
    />
  );
}

/** The state circle of a map: filled where the map is solved, empty where it is open (D-331). */
function StateCircle({ solved }: { solved: boolean }) {
  return (
    <span
      className="maps-catalog-state"
      role="img"
      aria-label={solved ? "Rozwiązana" : "Otwarta"}
    >
      {solved ? "●" : "○"}
    </span>
  );
}

/** Facts joined by „ · ”, each one in the role `warning` where it is a warning. */
function Facts({ facts }: { facts: readonly CatalogFact[] }) {
  return (
    <span className="maps-catalog-facts">
      {facts.map((fact, index) => (
        <span key={fact.text}>
          {index === 0 ? "" : " · "}
          <span className={fact.warning ? "maps-card-warning" : undefined}>
            {fact.text}
          </span>
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
            {`${row.spread} · `}
            <span
              className={row.renewal.warning ? "maps-card-warning" : undefined}
            >
              {row.renewal.text}
            </span>
          </span>
        </span>
      </a>
    </li>
  );
}

/** The name of the region a header of the lines stands for: the header opens with it and „ · ”. */
function regionOf(header: string): RegionName | null {
  return REGIONS.find((name) => header.startsWith(`${name} · `)) ?? null;
}

/** A region of „Dokąd”: the open maps, then the solved ones folded under one row that unfolds them. */
function DokadGroup({
  region,
  forced,
  onToggle,
}: {
  region: DokadRegion;
  /** Whether the lines hold the solved maps open whatever the player chose: a search or a pick. */
  forced: boolean;
  onToggle: (name: RegionName) => void;
}) {
  const name = regionOf(region.header);
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
                disabled={forced || name === null}
                onClick={() => {
                  if (name !== null) onToggle(name);
                }}
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
export function MapCatalog({ solvedMaps, selected }: MapCatalogProps) {
  const [view, setView] = useState<CatalogView>("dokad");
  const [query, setQuery] = useState("");
  const [unfolded, setUnfolded] = useState<readonly RegionName[]>([]);
  const lines = catalogLines({ solvedMaps, query, view, unfolded, selected });
  const searching = query.trim() !== "";
  const toggle = (name: RegionName) =>
    setUnfolded((now) =>
      now.includes(name) ? now.filter((each) => each !== name) : [...now, name],
    );
  return (
    <div className="maps-catalog">
      <ReactTextField
        label="Szukaj mapy albo zasobu"
        hint="szukaj mapy albo zasobu"
        spellCheck={false}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="maps-catalog-views tabs">
        {CATALOG_VIEWS.map((each) => (
          <ReactButton
            key={each.id}
            text={each.label}
            kind="tab"
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
            <DokadGroup
              key={region.header}
              region={region}
              forced={
                searching ||
                region.rows.some((row) => row.selected) ||
                (region.solved?.rows.some((row) => row.selected) ?? false)
              }
              onToggle={toggle}
            />
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
