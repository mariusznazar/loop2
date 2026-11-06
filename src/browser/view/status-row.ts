import { ACTIONS } from "../sim/data/actions.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { CONDITIONS, type ConditionDef } from "../sim/data/conditions.js";
import { CREATURES } from "../sim/data/creatures.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import { SKILLS } from "../sim/data/skills.js";
import type {
  Activity,
  CreatureId,
  DeathCause,
  GameState,
  MapRun,
  Pace,
  Understanding,
} from "../sim/types.js";
import { mapRunEnded } from "../sim/game.js";

const WAIT_TEXT = "Czeka — żadna reguła nie pasuje";
const PAUSED_SUFFIX = " (pauza)";
/** What the status row says of a map run ended in death, by its cause (D-61, D-62). */
const DEATH_TEXTS: Record<DeathCause, string> = {
  cold: "Mag zamarzł",
  hunger: "Mag umarł z głodu",
  combat: "Mag zginął w walce",
};

/**
 * What the character is doing, in the words the player reads: the action's status text from the
 * data, followed by its target's name where the action takes one.
 */
function activityText(activity: Activity): string {
  if (activity.kind === "wait") return WAIT_TEXT;
  const action = activity.action;
  const status = ACTIONS[action.kind].status;
  if ("resource" in action)
    return `${status}: ${RESOURCES[action.resource].name}`;
  return status;
}

/**
 * The status row's text: „Minuta {minute} · {activity} · Passa {streak}/{streak requirement of the
 * map}”, with „ (pauza)” at its end while paused; after the character's death „Minuta {minute of
 * death} · {cause}”, and after a completion „Minuta {minute of completion} · {completionText of the
 * map}”, both never paused. Pure.
 */
export function statusText(run: MapRun, paused: boolean): string {
  if (run.death)
    return `Minuta ${run.death.minute} · ${DEATH_TEXTS[run.death.cause]}`;
  const map: MapDef = MAPS[run.mapId];
  if (run.completion)
    return `Minuta ${run.completion.minute} · ${map.completionText}`;
  const progress = [
    map.solving.streak === undefined
      ? null
      : `Passa ${run.streak}/${map.solving.streak}`,
    map.solving.defeatedAttacks === undefined
      ? null
      : `Pokonane napaści ${run.defeatedAttacks}/${map.solving.defeatedAttacks}`,
  ].filter((part): part is string => part !== null);
  const combat =
    run.activeCombat ||
    (run.lastCombat?.result && run.lastCombat.resolveMinute === run.minute
      ? run.lastCombat
      : null);
  const activity = combat
    ? `Walczy z ${creatureAfterZ(combat.creatureId)}`
    : run.current
      ? activityText(run.current.activity)
      : WAIT_TEXT;
  return `Minuta ${run.minute} · ${activity} · ${progress.join(" · ")}${paused ? PAUSED_SUFFIX : ""}`;
}

/**
 * The pause button's text: „Pauza” for a running map run, „Wznów” for a paused one, and null after
 * the end of the map run, in death or a completion, when time stands still and the button is gone
 * (D-62). Pure.
 */
export function pauseLabel(state: GameState): string | null {
  if (state.run && mapRunEnded(state.run)) return null;
  return state.paused ? "Wznów" : "Pauza";
}

/** The name of an item or of the campfire, with a capital first letter. */
function discoveredItemName(id: Understanding["items"][number]): string {
  const name = id === CAMPFIRE.id ? CAMPFIRE.name : ITEMS[id].name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** A creature's name with a capital first letter. */
function discoveredCreatureName(
  id: Understanding["creatures"][number],
): string {
  const name = CREATURES[id].name;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function creatureAfterZ(id: CreatureId): string {
  const name = CREATURES[id].name;
  return name.endsWith("k") ? `${name.slice(0, -1)}kiem` : name;
}

/** A condition's label, followed for a condition that takes a number by „ … ” and its unit. */
function discoveredConditionText(kind: Understanding["conditions"][number]) {
  const condition: ConditionDef = CONDITIONS[kind];
  return condition.unit === undefined
    ? condition.label
    : `${condition.label} … ${condition.unit}`;
}

/** The sentence closed by a full stop, unless a unit such as „szt.” already ended it with one. */
function closed(sentence: string): string {
  return sentence.endsWith(".") ? sentence : `${sentence}.`;
}

/**
 * The line under the status row for what a game minute revealed: „Odkryto: ” and the labels of the
 * actions and the names of the items, the campfire's included, then „ W regułach można teraz
 * sprawdzić: ” and the conditions; a part with nothing revealed is left out. Pure.
 */
export function discoveryText(discovery: Understanding): string {
  const found = [
    ...discovery.actions.map((kind) => ACTIONS[kind].label),
    ...discovery.items.map(discoveredItemName),
    ...discovery.creatures.map(discoveredCreatureName),
    ...discovery.trees.map((id) => `drzewo umiejętności ${SKILLS[id].name}`),
  ];
  const checkable = discovery.conditions.map(discoveredConditionText);
  const sentences: string[] = [];
  if (found.length > 0) sentences.push(closed(`Odkryto: ${found.join(", ")}`));
  if (checkable.length > 0)
    sentences.push(
      closed(`W regułach można teraz sprawdzić: ${checkable.join(", ")}`),
    );
  return sentences.join(" ");
}

/** What the status row's buttons ask for; the app turns each into a simulation call. */
export type StatusRowControls = {
  /** „Pauza” or „Wznów”: pauses a running map run, resumes a paused one. */
  togglePause(): void;
  /** A pace button: the player picks the pace; paused or not, the pause stays as it is. */
  setPace(pace: Pace): void;
  restart(): void;
  end(): void;
};
