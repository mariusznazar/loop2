/**
 * The header of the screen of a map run in React (D-311, D-130, D-132, D-62, D-188, D-122, D-44,
 * D-46; task ekran-przejscia, To do 1 and 8; task teraz-i-potem, To do 3): the character's name,
 * the map's name and after them the clock, „Pauza” or „Wznów”, the five pace buttons, „Restart”,
 * the warning of a cut trip plan and „Zakończ”, in this order. It is a component with no boundary
 * of its own: the screen of a map run renders it from the game state it was given and from the
 * controls of the header, which ask the game for each act. It imports the pure functions of the DOM
 * modules (`clockText`, `pauseLabel`, `tripWarning`) and builds no element after their pattern
 * (D-265). The program, the band and the areas are not its. Nothing runs when the module is
 * imported.
 */
import { BALANCE } from "../sim/data/balance.js";
import { MAPS } from "../sim/data/maps.js";
import type { GameState } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { clockText, pauseLabel, type StatusRowControls } from "./status-row.js";
import { tripWarning } from "./trip-lines.js";

/** What the screen gives the header; every render gives it whole. */
export type RunHeaderProps = {
  /** The game state the header draws; it draws nothing while the state holds no map run. */
  state: GameState;
  /** What the header's buttons ask for. */
  controls: StatusRowControls;
};

/**
 * The header: the name of the character of the map run, found in the team by the map run's
 * character, the name of the map from the data, then the clock, which holds the game minute and
 * nothing of the character's action (that is „Teraz”'s, D-334), and the buttons. After the end of
 * the map run, in death or a completion, the clock stands at the game minute of the end in the role
 * `text`, „Pauza” and the pace buttons are not drawn, and „Restart” and „Zakończ” stay.
 */
export function RunHeader({ state, controls }: RunHeaderProps) {
  const run = state.run;
  if (run === null) return null;
  const character = state.team.characters.find(
    (entry) => entry.id === run.character.id,
  );
  const map = MAPS[run.mapId];
  const pause = pauseLabel(state);
  const warning = tripWarning(
    run.copy.program.tripPlan,
    run.character.traits.carryingCapacity,
    map,
  );
  return (
    <div className="run-header">
      {character === undefined ? null : (
        <h2 className="run-header-name">{character.name}</h2>
      )}
      <p className="run-header-map">{map.name}</p>
      <p className="run-header-clock">{clockText(run, state.paused)}</p>
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
