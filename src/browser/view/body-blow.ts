import { CREATURES } from "../sim/data/creatures.js";
import type { GameEvent } from "../sim/game.js";
import type { CreatureId, LastCombat, Pace } from "../sim/types.js";

/** The marker of a creature's blow over the health cell (D-450): its words and the game minute of the combat. */
export type BlowMarker = { text: string; minute: number };

/** The slowest pace at which the marker shows: the paces 1×, 2× and 4×, and none above (D-450, D-317). */
const MARKER_MAX_PACE = 4;

/** The least sum of a combat's blows that shows a marker (D-450). */
const MARKER_MIN_SUM = 2;

/**
 * The marker of a creature's blow, read from the events of one simulation call and from nothing the
 * game state held before it (D-450, D-04): one marker for a combat, „−{n} · {creature}” with {n} the
 * sum of the creature's blows in it, a killing blow included, where the sum is at least 2 and the pace
 * is 1×, 2× or 4×. A call that holds several combats gives the marker of the last one whose sum
 * shows, as a new blow replaces the marker of the one before. The creature is the one of the attack
 * the call holds before the blows; a combat whose attack came in an earlier call, as it does at the
 * paces where a call spans less than the five minutes of a combat, takes the creature of the map run's
 * last combat, `lastCombat`, which is the one just resolved. Null where no marker shows. Pure.
 */
export function blowMarker(
  events: readonly GameEvent[],
  lastCombat: Pick<LastCombat, "creatureId"> | null,
  pace: Pace,
): BlowMarker | null {
  if (pace > MARKER_MAX_PACE) return null;
  let marker: BlowMarker | null = null;
  let attacker: CreatureId | null = null;
  let sum = 0;
  let minute = 0;
  const close = () => {
    const creature = attacker ?? lastCombat?.creatureId ?? null;
    if (sum >= MARKER_MIN_SUM && creature !== null)
      marker = { text: `−${sum} · ${CREATURES[creature].name}`, minute };
    attacker = null;
    sum = 0;
  };
  for (const event of events) {
    if (event.kind === "attacked") {
      attacker = event.creature;
    } else if (event.kind === "combatExchange") {
      const blow = event.exchange.creatureAction;
      if (blow.kind === "strike") sum += blow.damage;
      minute = event.minute;
    } else if (event.kind === "combatEnded") {
      close();
    }
  }
  return marker;
}
