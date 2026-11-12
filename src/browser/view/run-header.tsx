/**
 * The header of the screen of a map run in React (D-311, D-130, D-132, D-62, D-188, D-122, D-44,
 * D-46, D-133, D-368): the character's name, the map's name and after them the clock, the bar of
 * the solving condition, „Pauza” or „Wznów”, the five pace buttons, after the end of the map run
 * „Koniec przejścia”, then „Restart”, the warning of a cut trip plan and „Zakończ”, in this order.
 * It is a component with no boundary of its own: the screen of a map run renders it from the game
 * state it was given and from the controls of the header, which ask the game for each act. It
 * imports the pure functions of the DOM modules (`clockText`, `requirementText`, `pauseLabel`,
 * `tripWarning`) and builds no element after their pattern (D-265). The program, the band and the
 * areas are not its. Nothing runs when the module is imported.
 */
import type { CSSProperties } from "react";
import { BALANCE } from "../sim/data/balance.js";
import { MAPS } from "../sim/data/maps.js";
import { solvingRequirements } from "../sim/run.js";
import { mapRunEnded } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import {
  clockText,
  pauseLabel,
  requirementShare,
  requirementText,
  type StatusRowControls,
} from "./status-row.js";
import { tripWarning } from "./trip-lines.js";

/** What the header's buttons ask for: the status row's, and the opening of the end-of-run window. */
export type RunHeaderControls = StatusRowControls & {
  /** „Koniec przejścia”: the end-of-run window opens over the screen again (D-368). */
  openWindow(): void;
};

/** What the screen gives the header; every render gives it whole. */
export type RunHeaderProps = {
  /** The game state the header draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** What the header's buttons ask for. */
  controls: RunHeaderControls;
  /**
   * Whether the end-of-run window stands over the screen. Over an ended map run the header is then
   * hidden, covered by the window, and has no „Koniec przejścia”; where the window is closed it has
   * the button. A map run that goes on has neither (D-311, D-368).
   */
  windowOpen: boolean;
};

/**
 * The header: the name of the character of the map run, found in the team by the map run's
 * character, the name of the map from the data, then the clock, which holds the game minute and
 * nothing of the character's action (that is „Teraz”'s, D-334), the bar of the solving condition
 * and the buttons. After the end of the map run, in death or a completion, the clock stands at the
 * game minute of the end in the role `text`, the bar stands too, at the stopped minute and with
 * the streak as it stands then (D-133, D-135), „Pauza” and the pace buttons are not drawn, and
 * „Restart” and „Zakończ” stay; „Koniec przejścia” stands before „Restart” while the window of the
 * end is closed, and while it stands the header is `hidden`, so that the window covers the screen
 * (D-311, D-368).
 */
export function RunHeader({ state, controls, windowOpen }: RunHeaderProps) {
  const run = state.run;
  if (run === null) return null;
  const ended = mapRunEnded(run);
  const character = state.team.characters.find(
    (entry) => entry.id === run.character.id,
  );
  const map = MAPS[run.mapId];
  const pause = pauseLabel(state);
  const requirements = solvingRequirements(run, map);
  const warning = tripWarning(
    run.copy.program.tripPlan,
    run.character.traits.carryingCapacity,
    map,
  );
  return (
    <div className="run-header" hidden={ended && windowOpen}>
      {character === undefined ? null : (
        <h2 className="run-header-name">{character.name}</h2>
      )}
      <p className="run-header-map">{map.name}</p>
      <p className="run-header-clock">{clockText(run, state.paused)}</p>
      {requirements.length === 0 ? null : (
        <div className="run-header-solving">
          {requirements.map((requirement) => (
            <div
              key={requirement.kind}
              className={
                requirement.met
                  ? "run-header-requirement positive"
                  : "run-header-requirement"
              }
            >
              <p className="run-header-requirement-text">
                {requirementText(requirement)}
              </p>
              <span className="run-header-requirement-bar">
                <span
                  className="run-header-requirement-fill"
                  style={
                    {
                      "--share": requirementShare(requirement),
                    } as CSSProperties
                  }
                />
              </span>
            </div>
          ))}
        </div>
      )}
      {pause === null ? null : (
        <ReactButton text={pause} onClick={() => controls.togglePause()} />
      )}
      {pause === null
        ? null
        : BALANCE.paces.map((pace) => (
            <ReactButton
              key={pace}
              text={`${pace}×`}
              selected={pace === state.pace}
              onClick={() => controls.setPace(pace)}
            />
          ))}
      {ended && !windowOpen ? (
        <ReactButton
          text="Koniec przejścia"
          onClick={() => controls.openWindow()}
        />
      ) : null}
      <ReactButton
        text="Restart"
        kind="destructive"
        onClick={() => controls.restart()}
      />
      {warning === null ? null : <p className="trip-warning">{warning}</p>}
      <ReactButton
        text="Zakończ"
        kind="destructive"
        onClick={() => controls.end()}
      />
    </div>
  );
}
