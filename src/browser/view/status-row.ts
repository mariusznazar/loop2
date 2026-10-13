import { ACTIONS } from '../sim/data/actions.js';
import { RESOURCES } from '../sim/data/resources.js';
import type { Activity, GameState, MapRun } from '../sim/types.js';

const WAIT_TEXT = 'Czeka — żadna reguła nie pasuje';
const PAUSED_SUFFIX = ' (pauza)';

/** What the character is doing, in the words the player reads. */
function activityText(activity: Activity): string {
  if (activity.kind === 'wait') return WAIT_TEXT;
  const action = activity.action;
  if (action.kind === 'walkTo') return `${ACTIONS.walkTo.status}: ${RESOURCES[action.resource].name}`;
  return ACTIONS[action.kind].status;
}

/** The status row's text: „Minuta {minute} · {activity}”, with „ (pauza)” while paused. Pure. */
export function statusText(run: MapRun, paused: boolean): string {
  return `Minuta ${run.minute} · ${activityText(run.current.activity)}${paused ? PAUSED_SUFFIX : ''}`;
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
 * Builds the status row: its text and the buttons „Pauza”/„Wznów”, „Restart”, „Zakończ”.
 * The elements are made once and updated in place, so a button keeps focus across clock ticks.
 */
export function createStatusRow(controls: StatusRowControls): StatusRow {
  const element = document.createElement('div');
  element.className = 'status-row';
  const text = document.createElement('p');
  text.className = 'status-text';
  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  const restartButton = document.createElement('button');
  restartButton.type = 'button';
  restartButton.textContent = 'Restart';
  const endButton = document.createElement('button');
  endButton.type = 'button';
  endButton.textContent = 'Zakończ';
  element.append(text, pauseButton, restartButton, endButton);

  pauseButton.addEventListener('click', () => controls.togglePause());
  restartButton.addEventListener('click', () => controls.restart());
  endButton.addEventListener('click', () => controls.end());

  return {
    element,
    update(state: GameState): void {
      if (!state.run) return;
      const shown = statusText(state.run, state.paused);
      if (text.textContent !== shown) text.textContent = shown;
      const label = state.paused ? 'Wznów' : 'Pauza';
      if (pauseButton.textContent !== label) pauseButton.textContent = label;
    },
  };
}
