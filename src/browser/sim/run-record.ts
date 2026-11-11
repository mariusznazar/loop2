import { ACTIONS, type ActionDef, type ActionId } from "./data/actions.js";
import { ITEMS } from "./data/items.js";
import type {
  Backpack,
  ItemId,
  MapRun,
  MinuteKind,
  MinutesByAction,
  RunRecord,
} from "./types.js";

/**
 * The closed list of what a game minute of a manual map run counts to: the kinds of the data's
 * ordinary actions — those with no combat effect — then a wait and a fight.
 */
export const MINUTE_KINDS: readonly MinuteKind[] = [
  ...(Object.keys(ACTIONS) as ActionId[]).filter(
    (id) => (ACTIONS[id] as ActionDef).combat === undefined,
  ),
  "wait",
  "combat",
] as MinuteKind[];

/** Every kind of the closed list at 0 game minutes. */
function noMinutes(): MinutesByAction {
  return Object.fromEntries(
    MINUTE_KINDS.map((kind) => [kind, 0]),
  ) as MinutesByAction;
}

/**
 * The record of a map run that starts with `backpack`: no streak yet, no game minute, and the
 * entries of the backpack in the order of the data's items, those held at 1 or more.
 */
export function startRecord(backpack: Backpack): RunRecord {
  const enteredWith = (Object.keys(ITEMS) as ItemId[])
    .filter((item) => backpack[item] > 0)
    .map((item) => ({ item, count: backpack[item] }));
  return { longestStreak: 0, minutesByAction: noMinutes(), enteredWith };
}

/** The three fields of a map run that make up its record, as they stand. */
export function recordOf(run: RunRecord): RunRecord {
  return {
    longestStreak: run.longestStreak,
    minutesByAction: run.minutesByAction,
    enteredWith: run.enteredWith,
  };
}

/**
 * What the character is doing at the start of the game minute that follows `before`: a fight while
 * one goes on, else the kind of the action of its current activity, else a wait.
 */
export function minuteKind(before: MapRun): MinuteKind {
  if (before.activeCombat) return "combat";
  const activity = before.current?.activity;
  // The pick starts no combat action outside a fight, and the load refuses an activity that holds one.
  return activity?.kind === "rule"
    ? (activity.action.kind as MinuteKind)
    : "wait";
}

/**
 * The record after one game minute: `before` is the map run at the start of the minute and `after`
 * the map run at its end, the minute of a death or a completion included.
 */
export function nextRecord(
  record: RunRecord,
  before: MapRun,
  after: MapRun,
): RunRecord {
  const kind = minuteKind(before);
  return {
    longestStreak: Math.max(record.longestStreak, after.streak),
    minutesByAction: {
      ...record.minutesByAction,
      [kind]: record.minutesByAction[kind] + 1,
    },
    enteredWith: record.enteredWith,
  };
}
