import { ACTIONS } from "../sim/data/actions.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { CONDITIONS, type ConditionDef } from "../sim/data/conditions.js";
import { CREATURES } from "../sim/data/creatures.js";
import { ITEMS } from "../sim/data/items.js";
import { SKILLS } from "../sim/data/skills.js";
import type { GameState, MapRun, Pace, Understanding } from "../sim/types.js";
import { mapRunEnded } from "../sim/game.js";
import type { SolvingRequirement } from "../sim/run.js";

const PAUSED_SUFFIX = " (pauza)";

/**
 * The clock in the header: „Minuta {game minute}”, with „ (pauza)” after it at every pause, the stop
 * at a discovery included (D-311, D-122); after a character's death and after a completion the game
 * minute of the end with no „ (pauza)”, since time stands still and „Pauza” is gone (D-62, D-132).
 * The character's action, the cause of a death and the text of a completion are „Teraz”'s (D-334),
 * not the clock's. Pure.
 */
export function clockText(run: MapRun, paused: boolean): string {
  if (run.death) return `Minuta ${run.death.minute}`;
  if (run.completion) return `Minuta ${run.completion.minute}`;
  return `Minuta ${run.minute}${paused ? PAUSED_SUFFIX : ""}`;
}

const REQUIREMENT_NAMES = {
  streak: "Passa",
  defeatedAttacks: "Pokonane napaści",
} as const;

/**
 * The words of a requirement of the solving condition in the header: its name and its numbers,
 * „Passa {streak}/{required}” for a streak and „Pokonane napaści {count}/{required}” for beaten
 * attacks (D-133). The count is the map run's current one, so after a death of cold the streak
 * reads 0 and never the longest one (D-135). Pure.
 */
export function requirementText(requirement: SolvingRequirement): string {
  return `${REQUIREMENT_NAMES[requirement.kind]} ${requirement.count}/${requirement.required}`;
}

/**
 * The share of a requirement's count in the number required, from 0 to 1, the length of the fill
 * of its bar (D-40); a count above the number required fills the bar whole and no further. Pure.
 */
export function requirementShare(requirement: SolvingRequirement): number {
  if (requirement.required <= 0) return 1;
  return Math.min(1, Math.max(0, requirement.count / requirement.required));
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
 * The text of the band of a discovery for what a game minute revealed: „Odkryto: ” and the labels
 * of the actions and the names of the items, the campfire's included, then „ W regułach można
 * teraz sprawdzić: ” and the conditions; a part with nothing revealed is left out. Pure.
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

/** What the header's buttons ask for; the app turns each into a simulation call. */
export type StatusRowControls = {
  /** „Pauza” or „Wznów”: pauses a running map run, resumes a paused one. */
  togglePause(): void;
  /** A pace button: the player picks the pace; paused or not, the pause stays as it is. */
  setPace(pace: Pace): void;
  restart(): void;
  end(): void;
};
