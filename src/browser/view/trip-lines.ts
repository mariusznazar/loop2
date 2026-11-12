import { ITEMS } from "../sim/data/items.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { sameData } from "../sim/programs.js";
import { clippedTake, sendTake, tripEntryCut, tripLoot } from "../sim/trip.js";
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

/** The mark of a rehearsal an earning loop cannot repeat (D-251). */
export const REHEARSAL_MARK =
  "Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.";

/**
 * The mark under „Wejdź” at a map: a solved map where an item of the take list, cut by the
 * carrying capacity and the map's entry cap, is more than the chest holds, since a manual run of a
 * solved map takes from nowhere and an earning loop takes from the chest (D-251); null otherwise.
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

/**
 * The line above „Wejdź” at a character (D-329): what the send takes, from the function
 * the send takes through, „Wejdzie: patyk 6, jagoda 4”, or „Wejdzie: nic” when it takes none. The
 * chest is `null` at a solved map, which takes from nowhere (D-189). Pure.
 */
export function entersLine(
  plan: TripPlan,
  chest: Chest | null,
  capacity: number,
  map: MapDef,
): string {
  const items = itemList(sendTake(plan, chest, capacity, map));
  return items ? `Wejdzie: ${items}` : "Wejdzie: nic";
}

/**
 * The mark beside „Puść w pętlę” when the program's bring list is empty: the loop earns nothing for
 * the chest (D-326); null where the list holds an item. Pure.
 */
export function emptyLoopMark(plan: TripPlan): string | null {
  return plan.bring.length === 0 ? "Pętla nic nie zarobi do skrzynki" : null;
}

/** The items of a list as „patyk 3, jagoda 2”, the form of the trip lines and of the end window. */
export function itemList(entries: readonly TripEntry[]): string {
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
