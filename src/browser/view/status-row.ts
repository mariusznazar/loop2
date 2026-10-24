import { ACTIONS } from "../sim/data/actions.js";
import { RESOURCES } from "../sim/data/resources.js";
import type { Activity, DeathCause, GameState, MapRun } from "../sim/types.js";
import { createButton } from "./controls/button.js";

const WAIT_TEXT = "Czeka — żadna reguła nie pasuje";
const PAUSED_SUFFIX = " (pauza)";
/** What the status row says of a map run ended in death, by its cause (D-54, D-55). */
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
 * The status row's text: „Minuta {minute} · {activity}”, with „ (pauza)” while paused; after the
 * character's death „Minuta {minute of death} · {cause}”, never paused. Pure.
 */
export function statusText(run: MapRun, paused: boolean): string {
  if (run.death)
    return `Minuta ${run.death.minute} · ${DEATH_TEXTS[run.death.cause]}`;
  return `Minuta ${run.minute} · ${activityText(run.current.activity)}${paused ? PAUSED_SUFFIX : ""}`;
}

/**
 * The pause button's text: „Pauza” for a running map run, „Wznów” for a paused one, and null after
 * the character's death, when time stands still and the button is gone (D-55). Pure.
 */
export function pauseLabel(state: GameState): string | null {
  if (state.run?.death) return null;
  return state.paused ? "Wznów" : "Pauza";
}

/** What the status row's buttons ask for; the app turns each into a simulation call. */
export type StatusRowControls = {
  /** „Pauza” or „Wznów”: pauses a running map run, resumes a paused one. */
  togglePause(): void;
  restart(): void;
  end(): void;
};

export type StatusRow = {
  element: HTMLElement;
  /** Shows the given game state; call only while it holds a map run. */
  update(state: GameState): void;
};

/**
 * Builds the status row: its text and the buttons „Pauza”/„Wznów”, „Restart”, „Zakończ”; after the
 * character's death the pause button is hidden, and „Restart” and „Zakończ” act on the map run
 * ended in death. The elements are made once and updated in place, so a button keeps focus across
 * clock ticks.
 */
export function createStatusRow(controls: StatusRowControls): StatusRow {
  const element = document.createElement("div");
  element.className = "status-row";
  const text = document.createElement("p");
  text.className = "status-text";
  const pauseButton = createButton("");
  // „Restart” and „Zakończ” end the map run as it stands: destructive buttons (D-44).
  const restartButton = createButton("Restart", { kind: "destructive" });
  const endButton = createButton("Zakończ", { kind: "destructive" });
  element.append(text, pauseButton, restartButton, endButton);

  pauseButton.addEventListener("click", () => controls.togglePause());
  restartButton.addEventListener("click", () => controls.restart());
  endButton.addEventListener("click", () => controls.end());

  return {
    element,
    update(state: GameState): void {
      if (!state.run) return;
      const shown = statusText(state.run, state.paused);
      if (text.textContent !== shown) text.textContent = shown;
      const label = pauseLabel(state);
      pauseButton.hidden = label === null;
      if (label !== null && pauseButton.textContent !== label)
        pauseButton.textContent = label;
    },
  };
}
