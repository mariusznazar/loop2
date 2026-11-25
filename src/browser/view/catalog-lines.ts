// The lines of the catalog of the screen Mapy, as pure functions: the regions with their counters,
// the rows of the maps with their facts, the search and the three views of one list (D-325, D-331,
// D-149, D-327). Importing the module touches no DOM, and it names no map, resource or creature:
// every identifier comes from the data it reads.
import { CREATURES } from "../sim/data/creatures.js";
import {
  MAPS,
  REGIONS,
  type MapDef,
  type MapResourceDef,
  type RegionName,
} from "../sim/data/maps.js";
import { RESOURCES, type ResourceId } from "../sim/data/resources.js";
import {
  expectedTiles,
  minutesWithoutFire,
  usualStep,
} from "../sim/map-card.js";
import type { MapId } from "../sim/types.js";
import { countedName } from "./counted-name.js";
import { sendMaps } from "./map-lines.js";

/** The three views of one list, in the order the screen shows them (D-325). */
export type CatalogView = "dokad" | "coDaje" | "postep";

export const CATALOG_VIEWS: readonly { id: CatalogView; label: string }[] = [
  { id: "dokad", label: "Dokąd" },
  { id: "coDaje", label: "Co daje" },
  { id: "postep", label: "Postęp" },
];

/** A fact of a row: its text, and whether it is a warning (the role `warning`). */
export type CatalogFact = { text: string; warning: boolean };

/** A row of a map: its state, its name, its facts in the old game's order, and its attackers' icons. */
export type CatalogMapRow = {
  id: MapId;
  name: string;
  solved: boolean;
  selected: boolean;
  /** Icon names of the creatures that attack on the map, in the data's order; empty where none does. */
  icons: string[];
  facts: CatalogFact[];
};

/** A row of „Co daje”: the tiles that hold the resource, its stock, and its renewal (D-325). */
export type CatalogResourceRow = {
  id: MapId;
  name: string;
  solved: boolean;
  selected: boolean;
  /** „≈ 8 z 25 · po 15”, without the renewal, which stands apart. */
  spread: string;
  renewal: CatalogFact;
};

/** A region of „Dokąd”: its header, its open maps, and its solved maps folded under one row. */
export type DokadRegion = {
  header: string;
  rows: CatalogMapRow[];
  solved: { text: string; expanded: boolean; rows: CatalogMapRow[] } | null;
};

/** A region of „Postęp”: its header, its maps, and one empty place without a name per map not yet opened. */
export type PostepRegion = {
  header: string;
  rows: CatalogMapRow[];
  empty: number;
};

/** A group of „Co daje”: one resource, with the open maps that give it, solved ones first. */
export type ResourceGroup = {
  resource: ResourceId;
  name: string;
  icon: string;
  count: string;
  rows: CatalogResourceRow[];
};

export type CatalogInput = {
  solvedMaps: readonly MapId[];
  /** The text typed in the search, as the player typed it. */
  query: string;
  view: CatalogView;
  /** The regions whose solved maps the player unfolded in „Dokąd”. */
  unfolded: readonly RegionName[];
  /** The picked map, or null before a pick; its region's solved maps are always unfolded. */
  selected: MapId | null;
};

/** The lines of the catalog for one view; `none` is the sentence where nothing fits the search. */
export type CatalogLines =
  | {
      view: "dokad";
      counter: string;
      regions: DokadRegion[];
      none: string | null;
    }
  | {
      view: "coDaje";
      counter: string;
      groups: ResourceGroup[];
      none: string | null;
    }
  | {
      view: "postep";
      counter: string;
      regions: PostepRegion[];
      none: string | null;
    };

/** The map data the lines read; the default is the game's data, a test may give other numbers for the same maps. */
export type CatalogData = Readonly<Record<string, MapDef>>;

type Forms = { one: string; few: string; many: string };

const SOLVED_FORMS: Forms = {
  one: "rozwiązana",
  few: "rozwiązane",
  many: "rozwiązanych",
};
const RESOURCE_FORMS: Forms = { one: "zasób", few: "zasoby", many: "zasobów" };
const MAP_FORMS: Forms = { one: "mapa", few: "mapy", many: "map" };

/** Everything one drawing of the catalog reads: the data, the open and solved maps, the search, the pick. */
type Context = {
  maps: CatalogData;
  /** Every map of the data, in the data's order. */
  all: MapId[];
  /** The step most maps of the data give (D-333). */
  usual: number;
  open: ReadonlySet<MapId>;
  solved: ReadonlySet<MapId>;
  /** The search as trimmed and lowercased; empty finds all. */
  query: string;
  /** The search as trimmed, for the sentence where nothing fits. */
  typed: string;
  selected: MapId | null;
};

/** A map's holding of one resource: the map, and its entry for the resource in the data. */
type Holding = { id: MapId; def: MapResourceDef };

const ALL_RESOURCES = Object.keys(RESOURCES) as ResourceId[];

/** A count with its noun in the form Polish gives it, as „1 mapa”, „2 mapy”, „5 map”. */
function countText(count: number, forms: Forms): string {
  return `${count} ${countedName(count, forms)}`;
}

/** The streak as whole hours, or in minutes where it is not a whole number of hours (D-325, D-327). */
function streakText(minutes: number): string {
  return minutes % 60 === 0 ? `${minutes / 60} h` : `${minutes} min`;
}

/**
 * The facts of a row in the old game's order (D-325): the demand, what the map takes, the terrain.
 * The mark „⊘” stands on the first of what the map takes only; the step is named only where it
 * differs from the usual one (D-333).
 */
function rowFacts(map: MapDef, usual: number): CatalogFact[] {
  const facts: CatalogFact[] = [];
  const { streak, defeatedAttacks } = map.solving;
  if (streak !== undefined)
    facts.push({ text: streakText(streak), warning: false });
  if (defeatedAttacks !== undefined)
    facts.push({ text: `${defeatedAttacks} do pokonania`, warning: false });
  const taken = [
    ...(map.carryIn === undefined ? [] : [`wnosisz ${map.carryIn}`]),
    ...(map.carryOut === undefined ? [] : [`wynosisz ${map.carryOut}`]),
  ];
  taken.forEach((text, index) =>
    facts.push({ text: index === 0 ? `⊘ ${text}` : text, warning: true }),
  );
  const minutes = minutesWithoutFire(map);
  if (minutes !== null)
    facts.push({ text: `bez ognia ${minutes} min`, warning: false });
  if (map.stepMinutes !== usual)
    facts.push({ text: `krok ${map.stepMinutes} min`, warning: false });
  return facts;
}

function mapRow(context: Context, id: MapId): CatalogMapRow {
  const map = context.maps[id];
  return {
    id,
    name: map.name,
    solved: context.solved.has(id),
    selected: context.selected === id,
    icons: (map.attackers ?? []).map((attacker) => CREATURES[attacker.id].icon),
    facts: rowFacts(map, context.usual),
  };
}

/** Whether the search finds a map: its name or the name of one of its resources holds the text. */
function matches(context: Context, id: MapId): boolean {
  if (context.query === "") return true;
  const map = context.maps[id];
  return (
    map.name.toLowerCase().includes(context.query) ||
    map.resources.some((resource) =>
      RESOURCES[resource.id].name.toLowerCase().includes(context.query),
    )
  );
}

/** The header of a region: its name and the solved maps over all its maps in the data (D-325). */
function regionHeader(context: Context, region: RegionName): string {
  const all = context.all.filter((id) => context.maps[id].region === region);
  const solved = all.filter((id) => context.solved.has(id)).length;
  return `${region} · ${solved} z ${all.length}`;
}

/** The shown maps of each region that has any, in the order of the regions given. */
function shownByRegion(
  context: Context,
  regions: readonly RegionName[],
  shown: readonly MapId[],
): [RegionName, MapId[]][] {
  return regions
    .map((region): [RegionName, MapId[]] => [
      region,
      shown.filter((id) => context.maps[id].region === region),
    ])
    .filter(([, maps]) => maps.length > 0);
}

function dokadRegion(
  context: Context,
  region: RegionName,
  maps: readonly MapId[],
  unfolded: readonly RegionName[],
): DokadRegion {
  const open = maps
    .filter((id) => !context.solved.has(id))
    .map((id) => mapRow(context, id));
  const solved = maps
    .filter((id) => context.solved.has(id))
    .map((id) => mapRow(context, id));
  // A search and the region of the picked map always unfold the solved maps (D-325, D-331).
  const pickedRegion =
    context.selected === null ? null : context.maps[context.selected].region;
  const expanded =
    context.query !== "" ||
    unfolded.includes(region) ||
    pickedRegion === region;
  return {
    header: regionHeader(context, region),
    rows: open,
    solved:
      solved.length === 0
        ? null
        : {
            text: countText(solved.length, SOLVED_FORMS),
            expanded,
            rows: solved,
          },
  };
}

function postepRegion(
  context: Context,
  region: RegionName,
  maps: readonly MapId[],
): PostepRegion {
  // Empty places stand for the maps not yet opened, and none stands while a search is typed.
  const notOpened = context.all.filter(
    (id) => context.maps[id].region === region && !context.open.has(id),
  ).length;
  return {
    header: regionHeader(context, region),
    rows: maps.map((id) => mapRow(context, id)),
    empty: context.query === "" ? notOpened : 0,
  };
}

/** The maps that hold each resource, over the open maps, in the data's order. */
function holdingsByResource(
  context: Context,
  open: readonly MapId[],
): Map<ResourceId, Holding[]> {
  const holdings = new Map<ResourceId, Holding[]>();
  for (const id of open)
    for (const def of context.maps[id].resources)
      holdings.set(def.id, [...(holdings.get(def.id) ?? []), { id, def }]);
  return holdings;
}

function resourceRow(
  context: Context,
  { id, def }: Holding,
): CatalogResourceRow {
  const map = context.maps[id];
  const { holding, tiles } = expectedTiles(map, def);
  return {
    id,
    name: map.name,
    solved: context.solved.has(id),
    selected: context.selected === id,
    spread: `≈ ${holding} z ${tiles} · po ${def.stock}`,
    renewal:
      def.renewMinutes === undefined
        ? { text: "nie wraca", warning: true }
        : { text: `+1 co ${def.renewMinutes} min`, warning: false },
  };
}

/**
 * The groups of „Co daje” (D-325): the resource that the fewest open maps give comes first, and
 * within a group the solved maps come first. A group whose resource's name the search holds lists
 * all its maps; otherwise only the maps whose name holds the text.
 */
function resourceGroups(
  context: Context,
  open: readonly MapId[],
): ResourceGroup[] {
  const holdings = holdingsByResource(context, open);
  return ALL_RESOURCES.map((resource) => ({
    resource,
    list: holdings.get(resource) ?? [],
  }))
    .filter((group) => group.list.length > 0)
    .sort((a, b) => a.list.length - b.list.length)
    .map(({ resource, list }): ResourceGroup => {
      const named =
        context.query === "" ||
        RESOURCES[resource].name.toLowerCase().includes(context.query);
      const found = named
        ? list
        : list.filter((holding) =>
            context.maps[holding.id].name.toLowerCase().includes(context.query),
          );
      const rows = [
        ...found.filter((holding) => context.solved.has(holding.id)),
        ...found.filter((holding) => !context.solved.has(holding.id)),
      ].map((holding) => resourceRow(context, holding));
      return {
        resource,
        name: RESOURCES[resource].name,
        icon: RESOURCES[resource].icon,
        count: countText(list.length, MAP_FORMS),
        rows,
      };
    })
    .filter((group) => group.rows.length > 0);
}

function counterText(
  context: Context,
  open: readonly MapId[],
  view: CatalogView,
): string {
  const solved = open.filter((id) => context.solved.has(id)).length;
  if (view === "dokad")
    return `${open.length} poznanych · ${countText(solved, SOLVED_FORMS)}`;
  if (view === "coDaje") {
    const reach = holdingsByResource(context, open).size;
    return `${countText(reach, RESOURCE_FORMS)} w zasięgu`;
  }
  return `${countText(solved, SOLVED_FORMS)} z ${open.length} poznanych`;
}

/**
 * The catalog's lines for one view (D-325). The maps are open where the simulation admits them
 * (D-149); the search finds the open ones; the regions are those given, in their order, and a
 * region with no shown map stands nowhere. Pure.
 */
export function catalogLines(
  input: CatalogInput,
  data: CatalogData = MAPS,
  regions: readonly RegionName[] = REGIONS,
): CatalogLines {
  const open = sendMaps(input.solvedMaps);
  const typed = input.query.trim();
  const context: Context = {
    maps: data,
    all: Object.keys(data) as MapId[],
    usual: usualStep(Object.values(data)),
    open: new Set(open),
    solved: new Set(input.solvedMaps),
    query: typed.toLowerCase(),
    typed,
    selected: input.selected,
  };
  const shown = open.filter((id) => matches(context, id));
  const byRegion = shownByRegion(context, regions, shown);
  const counter = counterText(context, open, input.view);

  if (input.view === "coDaje") {
    const groups = resourceGroups(context, open);
    return {
      view: "coDaje",
      counter,
      groups,
      none: groups.length === 0 ? `Nic nie pasuje do „${typed}”.` : null,
    };
  }
  if (input.view === "postep") {
    const out = byRegion.map(([region, maps]) =>
      postepRegion(context, region, maps),
    );
    return {
      view: "postep",
      counter,
      regions: out,
      none: out.length === 0 ? `Nic nie pasuje do „${typed}”.` : null,
    };
  }
  const out = byRegion.map(([region, maps]) =>
    dokadRegion(context, region, maps, input.unfolded),
  );
  return {
    view: "dokad",
    counter,
    regions: out,
    none: out.length === 0 ? `Nic nie pasuje do „${typed}”.` : null,
  };
}
