import { CREATURES } from "../sim/data/creatures.js";
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

/** The maps a character can be sent to, in the data's order. Pure. */
export function sendMaps(solvedMaps?: readonly MapId[]): MapId[] {
  const maps = Object.keys(MAPS) as MapId[];
  return solvedMaps === undefined
    ? maps
    : maps.filter((mapId) => canSendMap(solvedMaps, mapId));
}

/** The map's solving condition as a sentence: „{name} — {solvingText}”, both from the map's data. Pure. */
export function solvingSentence(mapId: MapId): string {
  return `${MAPS[mapId].name} — ${MAPS[mapId].solvingText}`;
}

/** A line of a card's part that stands in a role of its own, `warning` where `warning` is true (D-327). */
export type CardLine = { text: string; warning: boolean };

/** The heading of a card: the map's name, and the solved mark and the opener's words where they hold. */
export type CardHeading = {
  name: string;
  solved: string | null;
  openedBy: string | null;
};

/** A resource of „Leży tu”: its identifier for the icon, its line, and its renewal, which stands apart. */
export type ResourceLine = {
  id: ResourceId;
  text: string;
  renewal: CardLine;
};

/** An attacker of „Czyha”: its name, health and blow, and its chance, quiet time and mean gap. */
export type AttackerLines = { head: string; odds: string };

/**
 * The heading of a card (D-327): the map's name, „rozwiązana” once the map is solved, and
 * „odsłania ją {mapa}” with the opener's name from the data where another map opens this one. Pure.
 */
export function cardHeading(map: MapDef, solved: boolean): CardHeading {
  const opener =
    map.opensAfter === undefined
      ? null
      : `odsłania ją ${MAPS[map.opensAfter as MapId].name}`;
  return {
    name: map.name,
    solved: solved ? "rozwiązana" : null,
    openedBy: opener,
  };
}

/**
 * The lines of „Teren” (D-327): the grid, the entrance, the step with a note where it stands
 * against the usual step, and the minutes without fire with the temperature, left out where the map
 * does not cool the body below the chill threshold. Pure.
 */
export function terrainLines(map: MapDef): string[] {
  const usual = usualStep(Object.values(MAPS));
  let note = "";
  if (map.stepMinutes > usual) note = " — drożej niż zwykle";
  else if (map.stepMinutes < usual) note = " — taniej niż zwykle";
  const minutes = minutesWithoutFire(map);
  return [
    `siatka ${map.width} × ${map.height}`,
    map.entrance === null ? "wejście losowe" : "wejście stałe",
    `krok ${map.stepMinutes} min${note}`,
    ...(minutes === null
      ? []
      : [`bez ognia ${minutes} min — otoczenie ${map.ambientTemperature} °C`]),
  ];
}

/**
 * The lines of „Leży tu” (D-327): each resource of the map with its identifier for its icon, its
 * tiles that hold it, its stock, and its renewal, which reads „nie odnawia się” in `warning` where
 * the resource does not renew. The view writes the renewal after the text, with ", " between. Pure.
 */
export function resourceLines(map: MapDef): ResourceLine[] {
  return map.resources.map((resource) => {
    const { holding, tiles } = expectedTiles(map, resource);
    return {
      id: resource.id,
      text: `${RESOURCES[resource.id].name} — ≈ ${holding} z ${tiles} kafelków, po ${resource.stock}`,
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

/**
 * The lines of „Czyha” (D-327, D-142): for each attacker, its creature's name, health and blow, and
 * its chance per minute, its quiet time and its mean gap in one number. Pure.
 */
export function attackerLines(map: MapDef): AttackerLines[] {
  return (map.attackers ?? []).map((attacker) => {
    const creature = CREATURES[attacker.id];
    return {
      head: `${creature.name} · ${creature.health} zdrowia · cios ${creature.strikeDamage}`,
      odds: `${percentText(attacker.chancePerMinute)} % szansy na minutę, ${attacker.cooldownMinutes} min spokoju od wejścia i po każdej walce — średnio co ≈ ${meanAttackGap(attacker)} min`,
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
