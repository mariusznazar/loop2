import { ITEMS } from "../sim/data/items.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { sameData } from "../sim/programs.js";
import { tripEntryCut, tripLoot } from "../sim/trip.js";
import type { GameState, TripEntry, TripPlan } from "../sim/types.js";

/** A map cuts the requested equipment below what the character could carry. */
export function tripWarning(
  plan: TripPlan,
  capacity: number,
  map: MapDef,
): string | null {
  return tripEntryCut(plan, capacity, map)
    ? `Plan wyprawy wejdzie przycięty: mapa wpuszcza najwyżej ${map.carryIn} sztuk.`
    : null;
}

function itemList(entries: readonly TripEntry[]): string {
  return entries
    .map(({ item, count }) => `${ITEMS[item].name} ${count}`)
    .join(", ");
}

/** A frozen completion result, or a preview of that same transfer in a continuing run. */
export function tripTexts(state: GameState): {
  deposited: string | null;
  preview: string | null;
} {
  const run = state.run;
  if (!run || run.death) return { deposited: null, preview: null };
  if (run.completion) {
    const items = itemList(run.deposited ?? []);
    return {
      deposited: items
        ? `Do skrzynki: ${items}.`
        : "Do skrzynki nic nie trafiło.",
      preview: null,
    };
  }
  const visible =
    run.bringPlan.length > 0 ||
    !sameData(run.bringPlan, run.copy.program.tripPlan.bring);
  const items = visible
    ? itemList(tripLoot(run, state.team.chest, MAPS[run.mapId]))
    : "";
  return {
    deposited: null,
    preview: visible ? `Wyniesie: ${items || "nic"}` : null,
  };
}

export function createTripLines(): {
  deposited: HTMLElement;
  preview: HTMLElement;
  update(state: GameState): void;
} {
  const deposited = document.createElement("p");
  const preview = document.createElement("p");
  deposited.className = preview.className = "trip-result";
  return {
    deposited,
    preview,
    update(state): void {
      const text = tripTexts(state);
      deposited.hidden = text.deposited === null;
      preview.hidden = text.preview === null;
      deposited.textContent = text.deposited ?? "";
      preview.textContent = text.preview ?? "";
    },
  };
}
