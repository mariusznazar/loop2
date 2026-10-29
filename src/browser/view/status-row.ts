import { ACTIONS } from "../sim/data/actions.js";
import { BALANCE } from "../sim/data/balance.js";
import { CAMPFIRE } from "../sim/data/campfire.js";
import { CONDITIONS, type ConditionDef } from "../sim/data/conditions.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS, type MapDef } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import type {
  Activity,
  DeathCause,
  GameState,
  MapRun,
  Pace,
  Understanding,
} from "../sim/types.js";
import { mapRunEnded } from "../sim/game.js";
import { createButton, setButtonSelected } from "./controls/button.js";

const WAIT_TEXT = "Czeka — żadna reguła nie pasuje";
const PAUSED_SUFFIX = " (pauza)";
/** What the status row says of a map run ended in death, by its cause (D-61, D-62). */
const DEATH_TEXTS: Record<DeathCause, string> = {
  cold: "Mag zamarzł",
  hunger: "Mag umarł z głodu",
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
  return `Minuta ${run.minute} · ${activityText(run.current.activity)} · ${progress.join(" · ")}${paused ? PAUSED_SUFFIX : ""}`;
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

export type StatusRow = {
  element: HTMLElement;
  /**
   * The line of what the last game minute of a discovery revealed, in the role `discovery`; hidden
   * while the game state holds no discovery. The page places it under the status row.
   */
  discovery: HTMLElement;
  /** Shows the given game state; call only while it holds a map run. */
  update(state: GameState): void;
};

/**
 * Builds the status row: its text and the buttons „Pauza”/„Wznów”, one per pace of the data
 * (the number and „×”, the one of the state's pace selected), „Restart”, „Zakończ”; after the
 * end of the map run, in death or a completion, the pause and pace buttons are hidden, and „Restart”
 * and „Zakończ” act on the map run ended; after a completion the text element carries the class
 * `positive`, and then only. The elements are made once and updated in place, so a button keeps focus across
 * clock ticks.
 */
export function createStatusRow(controls: StatusRowControls): StatusRow {
  const element = document.createElement("div");
  element.className = "status-row";
  const text = document.createElement("p");
  text.className = "status-text";
  const discovery = document.createElement("p");
  discovery.className = "discovery-text";
  discovery.hidden = true;
  const pauseButton = createButton("");
  const paceButtons = BALANCE.paces.map((pace) => {
    const button = createButton(`${pace}×`);
    button.addEventListener("click", () => controls.setPace(pace));
    return button;
  });
  // „Restart” and „Zakończ” end the map run as it stands: destructive buttons (D-44).
  const restartButton = createButton("Restart", { kind: "destructive" });
  const endButton = createButton("Zakończ", { kind: "destructive" });
  element.append(text, pauseButton, ...paceButtons, restartButton, endButton);

  pauseButton.addEventListener("click", () => controls.togglePause());
  restartButton.addEventListener("click", () => controls.restart());
  endButton.addEventListener("click", () => controls.end());

  return {
    element,
    discovery,
    update(state: GameState): void {
      const revealed = state.discovery ? discoveryText(state.discovery) : "";
      discovery.hidden = revealed === "";
      if (discovery.textContent !== revealed) discovery.textContent = revealed;
      if (!state.run) return;
      const shown = statusText(state.run, state.paused);
      if (text.textContent !== shown) text.textContent = shown;
      text.classList.toggle("positive", state.run.completion !== null);
      const label = pauseLabel(state);
      pauseButton.hidden = label === null;
      if (label !== null && pauseButton.textContent !== label)
        pauseButton.textContent = label;
      paceButtons.forEach((button, index) => {
        button.hidden = label === null;
        setButtonSelected(button, BALANCE.paces[index] === state.pace);
      });
    },
  };
}
