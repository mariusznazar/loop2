import { CREATURES, type CreatureDef } from "../sim/data/creatures.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { RESOURCES, type ResourceId } from "../sim/data/resources.js";
import { canSendMap } from "../sim/game.js";
import {
  expectedTiles,
  meanAttackGap,
  minutesWithoutFire,
  usualStep,
} from "../sim/map-card.js";
import type { MapId } from "../sim/types.js";
import { withPreposition } from "./counted-name.js";

/** The maps a character can be sent to, in the data's order. Pure. */
export function sendMaps(solvedMaps?: readonly MapId[]): MapId[] {
  const maps = Object.keys(MAPS) as MapId[];
  return solvedMaps === undefined
    ? maps
    : maps.filter((mapId) => canSendMap(solvedMaps, mapId));
}

/**
 * The map's solving condition as a sentence, the solving text of the map's data alone, which the card
 * writes in its part „Żąda” under the table, since the heading of the card names the map (D-133). Pure.
 */
export function solvingSentence(mapId: MapId): string {
  return MAPS[mapId].solvingText;
}

/**
 * The one short sentence of what the map demands, written by hand in the map's data, which the card
 * shows under its heading (D-327). Pure.
 */
export function goalSentence(mapId: MapId): string {
  return MAPS[mapId].goalText;
}

/** A line of a card's part that stands in a role of its own, `warning` where `warning` is true (D-327). */
export type CardLine = { text: string; warning: boolean };

/**
 * The heading of a card: the map's name, the tag of its state — „rozwiązana” once it is solved, „otwarta”
 * before — and the opener's words where another map opens it.
 */
export type CardHeading = {
  name: string;
  state: { text: string; solved: boolean };
  openedBy: string | null;
};

/**
 * A row of a table of the card, „Żąda” or „Teren”: its label and its value, the note that stands apart
 * after the value where the row has one, and the icons of the creatures the row names, from the data.
 */
export type TableRow = {
  label: string;
  value: string;
  note: string | null;
  icons: string[];
};

/**
 * A resource of „Leży tu”: its identifier for the icon, its name, the tiles that hold it with its
 * stock, and its renewal, which stands apart.
 */
export type ResourceLine = {
  id: ResourceId;
  name: string;
  spread: string;
  renewal: CardLine;
};

/**
 * An attacker of „Czyha”: its icon file from the data, its name, health and blow, and its chance,
 * quiet time and mean gap.
 */
export type AttackerLines = {
  icon: string;
  head: string;
  odds: string;
  /** The record of D-440 as a line, set at the creature the map's data name for it where a record stands. */
  record?: string;
};

/**
 * The heading of a card (D-327): the map's name, the tag of its state — „rozwiązana” once the map is
 * solved, „otwarta” before — and „odsłania ją {mapa}” with the opener's name from the data where
 * another map opens this one. Pure.
 */
export function cardHeading(map: MapDef, solved: boolean): CardHeading {
  const opener =
    map.opensAfter === undefined
      ? null
      : `odsłania ją ${MAPS[map.opensAfter as MapId].name}`;
  return {
    name: map.name,
    state: { text: solved ? "rozwiązana" : "otwarta", solved },
    openedBy: opener,
  };
}

/** The streak as whole hours, or in minutes where it is not a whole number of hours (D-325, D-327). Pure. */
export function streakText(minutes: number): string {
  return minutes % 60 === 0 ? `${minutes / 60} h` : `${minutes} min`;
}

/**
 * The rows of the table „Żąda” (D-327): the streak the map's solving condition asks for, in hours, or in
 * minutes where it is not a whole number of hours, as in the row of the catalog, and the attacks to beat,
 * with the icons of the creatures that attack there; a requirement the condition lacks gives no row. Pure.
 */
export function demandRows(map: MapDef): TableRow[] {
  const { streak, defeatedAttacks } = map.solving;
  const rows: TableRow[] = [];
  if (streak !== undefined)
    rows.push({
      label: "passa",
      value: streakText(streak),
      note: null,
      icons: [],
    });
  if (defeatedAttacks !== undefined)
    rows.push({
      label: "do pokonania",
      value: `${defeatedAttacks}`,
      note: null,
      icons: (map.attackers ?? []).map(
        (attacker) => CREATURES[attacker.id].icon,
      ),
    });
  return rows;
}

/**
 * The rows of the table „Teren” (D-327): the grid, the entrance, the step with a note where it stands
 * against the usual step, and the minutes without fire with the temperature as their note, left out
 * where the map does not cool the body below the chill threshold. A note comes apart from the value, so
 * the view draws it in its own role. Pure.
 */
export function terrainRows(map: MapDef): TableRow[] {
  const usual = usualStep(Object.values(MAPS));
  let note: string | null = null;
  if (map.stepMinutes > usual) note = " — drożej niż zwykle";
  else if (map.stepMinutes < usual) note = " — taniej niż zwykle";
  const minutes = minutesWithoutFire(map);
  const row = (label: string, value: string, rowNote: string | null = null) =>
    ({ label, value, note: rowNote, icons: [] }) satisfies TableRow;
  return [
    row("siatka", `${map.width} × ${map.height}`),
    row("wejście", map.entrance === null ? "losowe" : "stałe"),
    row("krok", `${map.stepMinutes} min`, note),
    ...(minutes === null
      ? []
      : [
          row(
            "bez ognia",
            `${minutes} min`,
            ` — otoczenie ${map.ambientTemperature} °C`,
          ),
        ]),
  ];
}

/**
 * The lines of „Leży tu” (D-327): each resource of the map with its identifier for its icon, its name,
 * the tiles that hold it and its stock, and its renewal, which reads „nie odnawia się” in `warning`
 * where the resource does not renew. The view writes the renewal after the tiles, with " · " between.
 * Pure.
 */
export function resourceLines(map: MapDef): ResourceLine[] {
  return map.resources.map((resource) => {
    const { holding, tiles } = expectedTiles(map, resource);
    return {
      id: resource.id,
      name: RESOURCES[resource.id].name,
      spread: `≈ ${holding} z ${tiles} kafelków · po ${resource.stock}`,
      renewal:
        resource.renewMinutes === undefined
          ? { text: "nie odnawia się", warning: true }
          : { text: `+1 co ${resource.renewMinutes} min`, warning: false },
    };
  });
}

/**
 * The chance of a minute in Polish notation with at most one decimal: a fraction of 0.015 reads as
 * the percentage „1,5”, and 0.01 as „1”. Pure.
 */
function percentText(chancePerMinute: number): string {
  const tenths = Math.round(chancePerMinute * 1000);
  const whole = Math.floor(tenths / 10);
  const decimal = tenths % 10;
  return decimal === 0 ? `${whole}` : `${whole},${decimal}`;
}

/** The creature whose record the map's data show (D-440), or null where the data name none. Pure. */
export function recordCreatureOf(map: MapDef): CreatureDef | null {
  return map.recordCreature === undefined
    ? null
    : CREATURES[map.recordCreature];
}

/**
 * The record of D-440 as a line, „{creature}: {number} z {health}”, the „z” as Polish says it before the
 * health („ze 120”, „z 24”), with the name and the health from the data of the creature the map names
 * for it; null where the map names none or no record stands, so there is no line before the first
 * judging on the map. Pure.
 */
export function recordLine(map: MapDef, record: number | null): string | null {
  const creature = recordCreatureOf(map);
  if (creature === null || record === null) return null;
  return `${creature.name}: ${record} ${withPreposition(creature.health)} ${creature.health}`;
}

/**
 * The lines of „Czyha” (D-327, D-142): for each attacker, its creature's icon, name, health and blow,
 * and its chance per minute, its quiet time and its mean gap in one number; at the creature the map's data
 * name for the record, the line of the record where one stands (D-440). Pure.
 */
export function attackerLines(
  map: MapDef,
  record: number | null = null,
): AttackerLines[] {
  const line = recordLine(map, record);
  return (map.attackers ?? []).map((attacker) => {
    const creature = CREATURES[attacker.id];
    return {
      icon: creature.icon,
      head: `${creature.name} · ${creature.health} zdrowia · cios ${creature.strikeDamage}`,
      odds: `${percentText(attacker.chancePerMinute)} % szansy na minutę, ${attacker.cooldownMinutes} min spokoju od wejścia i po każdej walce — średnio co ≈ ${meanAttackGap(attacker)} min`,
      ...(line !== null && attacker.id === map.recordCreature
        ? { record: line }
        : {}),
    };
  });
}

/**
 * The lines of „Odbiera” (D-327): the entry cap and the exit cap, each on its own line in
 * `warning`; a cap the map does not set gives no line, and a zero cap counts. Pure.
 */
export function capLines(map: MapDef): CardLine[] {
  const lines: CardLine[] = [];
  if (map.carryIn !== undefined)
    lines.push({ text: `wnosisz najwyżej ${map.carryIn}`, warning: true });
  if (map.carryOut !== undefined)
    lines.push({ text: `wynosisz najwyżej ${map.carryOut}`, warning: true });
  return lines;
}
