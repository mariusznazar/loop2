import { ITEMS } from "../sim/data/items.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { sameData } from "../sim/programs.js";
import { clippedTake, tripEntryCut, tripLoot } from "../sim/trip.js";
import type { Chest, GameState, TripEntry, TripPlan } from "../sim/types.js";

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

/** The mark of a rehearsal an earning loop cannot repeat (D-234). */
export const REHEARSAL_MARK =
  "Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.";

/**
 * The mark under „Wyślij” at a map: a solved map where an item of the take list, cut by the
 * carrying capacity and the map's entry cap, is more than the chest holds, since a manual run of a
 * solved map takes from nowhere and an earning loop takes from the chest (D-234); null otherwise.
 * Pure.
 */
export function rehearsalMark(
  solved: boolean,
  plan: TripPlan,
  capacity: number,
  map: MapDef,
  chest: Chest,
): string | null {
  const short =
    solved &&
    clippedTake(plan, capacity, map).some(
      ({ item, count }) => count > (chest.pieces[item] ?? 0),
    );
  return short ? REHEARSAL_MARK : null;
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

const SOLVED_RUN_TEXT =
  "Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.";

/** The line of a run on a solved map, whatever its moment; null for any other run. */
export function solvedRunText(state: GameState): string | null {
  return state.run?.solvedMapRun ? SOLVED_RUN_TEXT : null;
}

/**
 * The line of how a death was settled and whether it stands in `danger` (D-39); read from the
 * settlement alone, so null while there is none and the same after a load.
 */
export function deathSettlementLine(
  state: GameState,
): { text: string; danger: boolean } | null {
  const settlement = state.run?.deathSettlement;
  if (!settlement) return null;
  if (settlement.kind === "resurrectionUsed")
    return {
      text: "Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.",
      danger: false,
    };
  return {
    text: `Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie ${settlement.generation}.`,
    danger: true,
  };
}

export function createTripLines(): {
  deposited: HTMLElement;
  settlement: HTMLElement;
  solved: HTMLElement;
  preview: HTMLElement;
  update(state: GameState): void;
} {
  const deposited = document.createElement("p");
  const settlement = document.createElement("p");
  const solved = document.createElement("p");
  const preview = document.createElement("p");
  deposited.className =
    settlement.className =
    solved.className =
    preview.className =
      "trip-result";
  return {
    deposited,
    settlement,
    solved,
    preview,
    update(state): void {
      const text = tripTexts(state);
      deposited.hidden = text.deposited === null;
      preview.hidden = text.preview === null;
      deposited.textContent = text.deposited ?? "";
      preview.textContent = text.preview ?? "";
      const dead = deathSettlementLine(state);
      settlement.hidden = dead === null;
      settlement.textContent = dead?.text ?? "";
      settlement.classList.toggle("danger", dead?.danger ?? false);
      const solvedText = solvedRunText(state);
      solved.hidden = solvedText === null;
      solved.textContent = solvedText ?? "";
    },
  };
}
