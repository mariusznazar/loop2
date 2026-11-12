/**
 * The texts of the end-of-run window (D-368): what each part of
 * the window says, from the game state and the map run it holds. Pure: each function reads its
 * arguments and draws nothing, and nothing runs when the module is imported.
 */
import { ACTIONS } from "../sim/data/actions.js";
import { BALANCE } from "../sim/data/balance.js";
import { MAPS, type MapDef, type MapId } from "../sim/data/maps.js";
import { mapRunEnded } from "../sim/game.js";
import { MINUTE_KINDS } from "../sim/run-record.js";
import { solvingRequirements } from "../sim/run.js";
import type { GameMapRun, GameState, MinuteKind } from "../sim/types.js";
import { discoveryBandText } from "./discovery-band-text.js";
import { discoveryRule } from "./discovery-rule.js";
import { deathText } from "./now-lines.js";
import { ruleNumber, ruleSentence } from "./program-editor.js";
import { requirementShare, requirementText } from "./status-row.js";
import { itemList, tripTexts } from "./trip-lines.js";

/** A line of the window and the role of its text (D-39). */
export type EndLine = { text: string; role: "text-secondary" | "danger" };

/** The title of the window and the role of its text: the heading role after a death (D-334). */
export type EndTitle = { text: string; role: "text-strong" | "positive" };

/** The longest streak against the streak of the map, with the share of the bar's fill (D-135). */
export type StreakLine = {
  text: string;
  share: number;
  role: "text" | "positive";
};

/** The text of a discovery and whether its rule „Dodaj regułę z tym” can be built (D-313). */
export type DiscoveryLine = { text: string; canAdd: boolean };

/** A rule of the copy that fired in no game minute of the map run (D-93). */
export type UnfiredRule = { number: string; text: string };

/** A piece of the bar of time: its label and its share in whole percent of the counted minutes. */
export type TimeShare = { label: string; percent: number };

/** A button of the way on: the map it opens and its text (D-132, D-53). */
export type WayOnButton = { mapId: MapId; text: string };

/** The kinds of minutes the walk joins, shown together as „W drodze”. */
const ON_THE_WAY: readonly MinuteKind[] = [
  "walkTo",
  "walkToCampfire",
  "wander",
];
/** The least share, in whole percent, that gives a piece of its own in the bar of time. */
const PIECE_FLOOR_PERCENT = 8;
/** The most pieces of its own the bar of time shows; the rest stand in „reszta”. */
const MAX_PIECES = 5;

/** The title: the words of the death's cause after a death, the map's completion text after a completion; null while the map run goes on. */
export function endTitle(state: GameState): EndTitle | null {
  const run = state.run;
  if (!run || !mapRunEnded(run)) return null;
  if (run.death)
    return { text: deathText(run.death.cause), role: "text-strong" };
  return { text: MAPS[run.mapId].completionText, role: "positive" };
}

/**
 * The longest streak of the map run against the streak its map asks, in the words of the requirement
 * with „najdłuższa” before them; null where the map asks no streak. Positive where the streak is met.
 */
export function longestStreakLine(
  run: GameMapRun,
  map: MapDef,
): StreakLine | null {
  const streak = solvingRequirements(
    { ...run, streak: run.longestStreak },
    map,
  ).find((requirement) => requirement.kind === "streak");
  if (!streak) return null;
  return {
    text: `najdłuższa ${requirementText(streak).toLowerCase()}`,
    share: requirementShare(streak),
    role: streak.met ? "positive" : "text",
  };
}

/**
 * What the end gave or cost: after a completion the deposit the completion froze, after a death its
 * settlement with the resurrection; null while the map run goes on or a death is unsettled.
 */
export function endCostLine(state: GameState): EndLine | null {
  const run = state.run;
  if (!run) return null;
  if (run.death) {
    const settlement = run.deathSettlement;
    if (!settlement) return null;
    if (settlement.kind === "resurrectionUsed")
      return {
        text: `Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po ${BALANCE.resurrectionRenewalRealMinutes / 60} godzinach czasu realnego.`,
        role: "text-secondary",
      };
    return {
      text: `Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie ${settlement.generation}.`,
      role: "danger",
    };
  }
  const deposited = tripTexts(state).deposited;
  return deposited === null
    ? null
    : { text: deposited, role: "text-secondary" };
}

/**
 * The text of the discovery the state holds and whether its rule can be built; null where no
 * discovery names anything.
 */
export function discoveryLine(state: GameState): DiscoveryLine | null {
  const text = discoveryBandText(state);
  if (!text) return null;
  return { text, canAdd: discoveryRule(state) !== null };
}

/**
 * The rules of the copy's program whose count is absent or 0, in the order of the program, each with
 * its number and the sentence of its row (D-93).
 */
export function unfiredRules(state: GameState): UnfiredRule[] {
  const run = state.run;
  if (!run) return [];
  const counts = state.ruleCounts;
  const rules: UnfiredRule[] = [];
  run.copy.program.groups.forEach((group, groupIndex) => {
    group.rules.forEach((rule, ruleIndex) => {
      if ((counts?.[rule.id] ?? 0) === 0) {
        const { condition, action } = ruleSentence(rule);
        rules.push({
          number: ruleNumber(groupIndex, ruleIndex),
          text: `${condition} → ${action}`,
        });
      }
    });
  });
  return rules;
}

/** The label of a kind of minute in the bar of time. */
function labelOf(kind: MinuteKind): string {
  if (kind === "wait") return "Czeka";
  if (kind === "combat") return "Walka";
  if (ON_THE_WAY.includes(kind)) return "W drodze";
  return ACTIONS[kind].label;
}

/** A part of a whole in whole percent. */
function percentOf(part: number, whole: number): number {
  return Math.round((part * 100) / whole);
}

/**
 * The bar of time: the counted minutes by what the character did, the largest first. A label with at
 * least 8 % of the counted minutes is a piece of its own, at most five pieces; the rest, if any, stands
 * in „reszta”. Empty where no minute was counted.
 */
export function timeShares(run: GameMapRun): TimeShare[] {
  const totals = new Map<string, number>();
  for (const kind of MINUTE_KINDS) {
    const minutes = run.minutesByAction[kind];
    if (minutes === 0) continue;
    const label = labelOf(kind);
    totals.set(label, (totals.get(label) ?? 0) + minutes);
  }
  const counted = [...totals.values()].reduce(
    (sum, minutes) => sum + minutes,
    0,
  );
  if (counted === 0) return [];
  const ranked = [...totals].sort(([, a], [, b]) => b - a);
  const pieces = ranked
    .filter(([, minutes]) => minutes * 100 >= PIECE_FLOOR_PERCENT * counted)
    .slice(0, MAX_PIECES);
  const shares: TimeShare[] = pieces.map(([label, minutes]) => ({
    label,
    percent: percentOf(minutes, counted),
  }));
  const rest = counted - pieces.reduce((sum, [, minutes]) => sum + minutes, 0);
  if (rest > 0)
    shares.push({ label: "reszta", percent: percentOf(rest, counted) });
  return shares;
}

/**
 * The rows of the trip and the terrain: what the character entered with, the revealed tiles of the
 * map and the minutes on the way.
 */
export function tripRows(run: GameMapRun): string[] {
  const entered =
    run.enteredWith.length === 0
      ? "weszła z pustym plecakiem"
      : `weszła z ${itemList(run.enteredWith)}`;
  const revealed = run.tiles.filter((tile) => tile.revealed).length;
  const onTheWay = ON_THE_WAY.reduce(
    (sum, kind) => sum + run.minutesByAction[kind],
    0,
  );
  return [
    entered,
    `odsłonięto ${revealed} z ${run.tiles.length} kafelków`,
    `w drodze ${onTheWay} min`,
  ];
}

/**
 * The buttons of the way on: after a completion, one for each map whose opening map is the completed
 * one; none after a death.
 */
export function wayOnButtons(run: GameMapRun): WayOnButton[] {
  if (!run.completion) return [];
  const maps: Record<string, MapDef> = MAPS;
  return Object.entries(maps)
    .filter(([, map]) => map.opensAfter === run.mapId)
    .map(([mapId, map]) => ({
      mapId: mapId as MapId,
      text: `Otwarte: ${map.name} →`,
    }));
}
