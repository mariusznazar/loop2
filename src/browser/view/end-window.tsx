/**
 * The end-of-run window in React (D-362, D-132, D-133, D-135, D-185, D-216, D-122, D-147, D-188,
 * D-313, D-44, D-39; task koniec-przejscia, To do 1, 2, 4 to 9): the window that opens over the
 * screen of a map run when the map run ends in a death or a completion. It is a column in a
 * `section` with `role="dialog"` named by its title: at the top the label „Koniec przejścia”, the
 * title and „✕”; in the middle the scrolling part, which answers in order what happened (the longest
 * streak as the bar of the header's requirement, then the discovery), what it cost or gave, and why
 * (the last minutes after a death only, the paragraph of the last encounter, the rules that never fired, the time, the
 * trip and the terrain), each section only where it has content; at the bottom the buttons, which
 * do not scroll. It is a component with no boundary of its own: the screen of a map run renders it
 * from the game state it was given, from the entries of „Ostatnie minuty” its chronicle memory
 * gives and from the controls that carry out each act. Every text is the one `end-window-lines.ts`
 * gives; the window adds no wording of its own. It imports pure functions only and builds no element
 * after a DOM module's pattern (D-265). Nothing runs when the module is imported.
 */
import { useEffect, useId, useRef, type CSSProperties } from "react";
import { MAPS, type MapId } from "../sim/data/maps.js";
import { mapRunEnded } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import type { ChronicleEntry } from "./chronicle-entries.js";
import { combatText } from "./combat-line.js";
import { ReactButton } from "./controls/react-button.js";
import {
  discoveryLine,
  endCostLine,
  endTitle,
  longestStreakLine,
  timeShares,
  tripRows,
  unfiredRules,
  wayOnButtons,
} from "./end-window-lines.js";
import { tripWarning } from "./trip-lines.js";

/** What the window's controls ask for; the screen turns each into its act. */
export type EndWindowControls = {
  /** „✕” and Escape: the window closes and the screen of the map run stands uncovered. */
  close(): void;
  /** „Restart”: the map run starts again with the same seed, as the „Restart” of the header does. */
  restart(): void;
  /** „Zakończ”: the map run ends and the screen goes where the „Zakończ” of the header goes. */
  end(): void;
  /** „Otwarte: {mapa} →”: ends the map run as „Zakończ” does and opens the card of the map named. */
  openMap(mapId: MapId): void;
  /** „Dodaj regułę z tym”: adds the rule of the discovery and opens its panel (D-313). */
  addRule(): void;
};

/** What the screen gives the window; every render gives it whole. */
export type EndWindowProps = {
  /** The game state the window draws; it draws nothing while the state holds no ended map run. */
  state: GameState;
  /** The entries of „Ostatnie minuty”, oldest first; the section stands only after a death and only where there are some (D-362). */
  lastMinutes: readonly ChronicleEntry[];
  controls: EndWindowControls;
};

/** The window once the map run has ended; it mounts when the window appears and takes the focus then. */
function EndWindowView({ state, lastMinutes, controls }: EndWindowProps) {
  const root = useRef<HTMLElement>(null);
  const titleId = useId();
  // The window takes the focus once, when it appears, and never again while it stands: a later draw
  // leaves the focus where the player put it. Nothing is joined that would need undoing.
  useEffect(() => {
    root.current?.focus();
  }, []);
  const run = state.run;
  const title = endTitle(state);
  if (run === null || title === null) return null;
  const map = MAPS[run.mapId];
  const streak = longestStreakLine(run, map);
  const discovery = discoveryLine(state);
  const cost = endCostLine(state);
  const unfired = unfiredRules(state);
  const shares = timeShares(run);
  const warning = tripWarning(
    run.copy.program.tripPlan,
    run.character.traits.carryingCapacity,
    map,
  );
  const paragraph = run.lastCombat === null ? null : combatText(run.lastCombat);
  return (
    <section
      ref={root}
      className="end-window"
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        controls.close();
      }}
    >
      <div className="end-window-top">
        <p className="end-window-label">Koniec przejścia</p>
        <h2
          id={titleId}
          className={
            title.role === "positive"
              ? "end-window-title positive"
              : "end-window-title"
          }
        >
          {title.text}
        </h2>
        <ReactButton
          text="✕"
          label="Zamknij okno"
          onClick={() => controls.close()}
        />
      </div>
      {/* Focusable, so that the keyboard scrolls it with no control inside to hold the focus. */}
      <div className="end-window-body" tabIndex={0}>
        {streak === null ? null : (
          <div
            className={
              streak.role === "positive"
                ? "run-header-requirement positive"
                : "run-header-requirement"
            }
          >
            <p className="run-header-requirement-text">{streak.text}</p>
            <span className="run-header-requirement-bar">
              <span
                className="run-header-requirement-fill"
                style={{ "--share": streak.share } as CSSProperties}
              />
            </span>
          </div>
        )}
        {discovery === null ? null : (
          <div className="end-window-discovery">
            <p className="end-window-discovery-text">{discovery.text}</p>
            <ReactButton
              text="Dodaj regułę z tym"
              disabled={!discovery.canAdd}
              onClick={() => controls.addRule()}
            />
          </div>
        )}
        {cost === null ? null : (
          <p
            className={
              cost.role === "danger"
                ? "end-window-cost danger"
                : "end-window-cost"
            }
          >
            {cost.text}
          </p>
        )}
        {run.death === null || lastMinutes.length === 0 ? null : (
          <section className="end-window-section">
            <h3 className="end-window-section-name">Ostatnie minuty</h3>
            <ul className="end-window-minutes">
              {lastMinutes.map((entry, index) => (
                <li key={index} className="chronicle-row">
                  <span className="chronicle-minute">{entry.minute}</span>
                  <span
                    className={
                      entry.role === "text"
                        ? "chronicle-text"
                        : `chronicle-text ${entry.role}`
                    }
                  >
                    {entry.text}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {paragraph === null ? null : (
          <section className="end-window-section">
            <p className="end-window-paragraph">{paragraph}</p>
          </section>
        )}
        {unfired.length === 0 ? null : (
          <section className="end-window-section">
            <h3 className="end-window-section-name">Nie zadziałały ani razu</h3>
            <ul className="end-window-rules">
              {unfired.map((entry) => (
                <li key={entry.number} className="end-window-rule">
                  <span className="end-window-rule-number">{entry.number}</span>
                  <span>{entry.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {shares.length === 0 ? null : (
          <section className="end-window-section">
            <h3 className="end-window-section-name">Na co poszedł czas</h3>
            <div className="end-window-time-bar">
              {shares.map((share) => (
                <span
                  key={share.label}
                  className="end-window-time-piece"
                  style={{ "--percent": share.percent } as CSSProperties}
                />
              ))}
            </div>
            <ul className="end-window-time-legend">
              {shares.map((share) => (
                <li key={share.label} className="end-window-time-item">
                  <span className="end-window-time-name">{share.label}</span>{" "}
                  <span className="end-window-time-percent">
                    {share.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="end-window-section">
          <h3 className="end-window-section-name">Wyprawa i teren</h3>
          <ul className="end-window-trip">
            {tripRows(run).map((row) => (
              <li key={row} className="end-window-trip-row">
                {row}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="end-window-buttons">
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
        {wayOnButtons(run).map((way) => (
          <ReactButton
            key={way.mapId}
            text={way.text}
            onClick={() => controls.openMap(way.mapId)}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * The window: drawn only while the state holds a map run that has ended, in death or a completion;
 * until then it draws nothing, and its view, which takes the focus, mounts when the map run ends.
 */
export function EndWindow(props: EndWindowProps) {
  const run = props.state.run;
  if (run === null || !mapRunEnded(run)) return null;
  return <EndWindowView {...props} />;
}
