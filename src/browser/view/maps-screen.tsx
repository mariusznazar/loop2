/**
 * The screen Mapy (D-325, D-331, D-282; `#/mapy` and `#/mapy/{map}`): two areas of their own, on the
 * left the list of the maps open to the player and on the right the card of the map the address
 * names with, under it, the section „Kto idzie”. Before a map is named the right area says to pick
 * one. The card is drawn from the map's data (D-327, D-328); under it each character of the team
 * stands with its lines and the two buttons that send it (D-329, D-243, D-244, D-251, D-287, D-326).
 *
 * The page holds the screen behind one boundary, `createMapsScreen` (D-36), as it holds the screen
 * Postać: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. The screen performs nothing itself:
 * the four acts of a character go to the page through `controls`, which turns them into the
 * simulation's calls. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import { rowProgram } from "../sim/programs.js";
import type {
  Character,
  CharacterId,
  GameState,
  MapId,
  ProgramId,
} from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactSelectList } from "./controls/react-select-list.js";
import {
  attackerLines,
  capLines,
  cardHeading,
  resourceLines,
  sendMaps,
  solvingSentence,
  terrainLines,
} from "./map-lines.js";
import { screenAddress } from "./screen-address.js";
import {
  loopLine,
  programPositions,
  resurrectionLine,
  runWaitingSentence,
} from "./team-lines.js";
import {
  emptyLoopMark,
  entersLine,
  rehearsalMark,
  tripWarning,
} from "./trip-lines.js";

/** What the page gives the screen; every call of `update` gives it whole. */
export type MapsScreenProps = {
  /** The game state the screen draws. */
  state: GameState;
  /** The real moment of the clock's last reading, at which the resurrection lines are drawn. */
  nowMs: number;
  /** The map the address names, or null under `#/mapy`. */
  mapId: MapId | null;
};

/** What the screen asks of the page; the page turns each into a call of the simulation. */
export type MapsScreenControls = {
  /** Picks the program of a character's list „Program:”, kept until the character is sent. */
  pick(characterId: CharacterId, programId: ProgramId): void;
  /** Sends a character into a manual map run on the map, with the program its list shows. */
  enter(characterId: CharacterId, mapId: MapId, programId: ProgramId): void;
  /** Puts a character into an earning loop on a solved map, with the program its list shows. */
  startLoop(characterId: CharacterId, mapId: MapId, programId: ProgramId): void;
  /** Stops a character's earning loop at once. */
  stop(characterId: CharacterId): void;
};

export type MapsScreenOptions = {
  controls: MapsScreenControls;
  props: MapsScreenProps;
};

export type MapsScreen = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(props: MapsScreenProps): void;
  /** Moves keyboard focus to the screen, for the page to call when a menu item opens it. */
  focus(): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

/** A control of a character that the keyboard's focus can be sent to once the screen is drawn. */
type FocusTarget = "stop" | "enter" | "program";

/** The elements the focus can be sent to. */
type FocusControl = HTMLButtonElement | HTMLSelectElement;

/** The control the focus is owed to, asked by the click that makes the pressed button leave or stand inactive. */
type OwedFocus = { characterId: CharacterId; target: "stop" | "enter" };

/** What a character's row gets from the screen to move focus: element refs and the asking of a move. */
type FocusPlumbing = {
  /** The ref callback of a control of a character, which the screen keeps the element by. */
  keep: <Control extends FocusControl>(
    characterId: CharacterId,
    target: FocusTarget,
  ) => (element: Control | null) => void;
  /** Records the move to owe before the page is called, so the commit of its answer makes it. */
  owe: (owed: OwedFocus) => void;
};

/** The step note of a „Teren” line, such as „ — drożej niż zwykle”, which stands in its own role. */
const STEP_NOTE = /^(.*?)( — (?:drożej|taniej) niż zwykle)$/;

/** The list of the maps open to the player, the map named marked. */
function MapList({ state, mapId }: { state: GameState; mapId: MapId | null }) {
  return (
    <ul className="maps-list-items" aria-label="Mapy">
      {sendMaps(state.solvedMaps).map((id) => (
        <li key={id}>
          <a
            className="maps-list-item"
            href={screenAddress({ kind: "map", mapId: id })}
            aria-current={id === mapId ? "page" : undefined}
          >
            {MAPS[id].name}
            {state.solvedMaps.includes(id) ? (
              <span className="maps-list-solved">rozwiązana</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** One line of a part of the card, `warning` where the lines say so. */
function CardLine({ text, warning }: { text: string; warning: boolean }) {
  return <li className={warning ? "maps-card-warning" : undefined}>{text}</li>;
}

/** The card of a map: its heading and the parts the map has (D-327). */
function MapCard({ mapId, solved }: { mapId: MapId; solved: boolean }) {
  const map = MAPS[mapId];
  const heading = cardHeading(map, solved);
  const attackers = attackerLines(map);
  const caps = capLines(map);
  return (
    <div className="maps-card">
      <div className="maps-card-heading">
        <h2 className="maps-card-name">{heading.name}</h2>
        {heading.solved === null ? null : (
          <span className="maps-card-solved">{heading.solved}</span>
        )}
        {heading.openedBy === null ? null : (
          <span className="maps-card-opened-by">{heading.openedBy}</span>
        )}
      </div>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Żąda</h3>
        <p>{solvingSentence(mapId)}</p>
      </section>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Teren</h3>
        <ul className="maps-card-lines">
          {terrainLines(map).map((line) => {
            const split = STEP_NOTE.exec(line);
            return (
              <li key={line}>
                {split === null ? (
                  line
                ) : (
                  <>
                    {split[1]}
                    <span className="maps-card-note">{split[2]}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Leży tu</h3>
        <ul className="maps-card-lines">
          {resourceLines(map).map((resource) => (
            <li key={resource.id} className="maps-card-resource">
              <img
                className="maps-card-icon"
                src={`/icons/${RESOURCES[resource.id].icon}.svg`}
                alt=""
              />
              {`${resource.text}, `}
              <span
                className={
                  resource.renewal.warning ? "maps-card-warning" : undefined
                }
              >
                {resource.renewal.text}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {attackers.length === 0 ? null : (
        <section className="maps-card-part">
          <h3 className="maps-card-part-name">Czyha</h3>
          <ul className="maps-card-lines">
            {attackers.map((attacker) => (
              <li
                key={`${attacker.head}|${attacker.odds}`}
                className="maps-card-attacker"
              >
                <p className="maps-card-attacker-head">{attacker.head}</p>
                <p className="maps-card-attacker-odds">{attacker.odds}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {caps.length === 0 ? null : (
        <section className="maps-card-part">
          <h3 className="maps-card-part-name">Odbiera</h3>
          <ul className="maps-card-lines">
            {caps.map((cap) => (
              <CardLine key={cap.text} text={cap.text} warning={cap.warning} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

type CharacterRowProps = {
  character: Character;
  mapId: MapId;
  props: MapsScreenProps;
  controls: MapsScreenControls;
  focus: FocusPlumbing;
};

/** One character of „Kto idzie”: its lines from the top, its program and the two sending buttons (D-329). */
function CharacterRow({
  character,
  mapId,
  props,
  controls,
  focus,
}: CharacterRowProps) {
  const { state, nowMs } = props;
  const id = character.id;
  const map = MAPS[mapId];
  const solved = state.solvedMaps.includes(mapId);
  const loop = Object.hasOwn(state.loops, id) ? state.loops[id] : undefined;
  const inLoop = loop !== undefined;
  const program = rowProgram(state, id);
  const positions = programPositions(state.programs, program);
  const plan = program.program.tripPlan;
  const capacity = character.traits.carryingCapacity;
  const resurrection = resurrectionLine(character, nowMs);
  const warning = tripWarning(plan, capacity, map);
  const rehearsal = rehearsalMark(
    solved,
    plan,
    capacity,
    map,
    state.team.chest,
  );
  const emptyLoop = solved ? emptyLoopMark(plan) : null;
  const run = state.run;
  return (
    <li className="maps-who-member">
      <a
        className="maps-who-name"
        href={screenAddress({ kind: "character", characterId: id })}
      >
        {character.name}
      </a>
      <p
        className={
          resurrection.danger
            ? "maps-who-resurrection danger"
            : "maps-who-resurrection"
        }
      >
        {resurrection.text}
      </p>
      {loop === undefined ? null : (
        <div className="maps-who-loop">
          <p className="maps-who-loop-line">{loopLine(loop)}</p>
          <ReactButton
            text="Zatrzymaj"
            kind="destructive"
            label={`Zatrzymaj: ${character.name}`}
            buttonRef={focus.keep(id, "stop")}
            onClick={() => {
              focus.owe({ characterId: id, target: "enter" });
              controls.stop(id);
            }}
          />
        </div>
      )}
      <div className="maps-who-program">
        <span className="maps-who-program-label">Program:</span>
        <ReactSelectList
          label={`Program: ${character.name}`}
          options={positions.options}
          value={positions.value}
          selectRef={focus.keep(id, "program")}
          onChange={(event) => controls.pick(id, Number(event.target.value))}
        />
      </div>
      <p className="maps-who-enters">
        {entersLine(plan, solved ? null : state.team.chest, capacity, map)}
      </p>
      {warning === null ? null : <p className="trip-warning">{warning}</p>}
      <div className="maps-who-actions">
        <div className="maps-who-enter">
          <ReactButton
            text="Wejdź"
            kind="main"
            label={`Wejdź: ${character.name}, mapa ${map.name}`}
            disabled={run !== null || inLoop}
            buttonRef={focus.keep(id, "enter")}
            onClick={() => controls.enter(id, mapId, program.id)}
          />
          {rehearsal === null ? null : (
            <p className="rehearsal-mark">{rehearsal}</p>
          )}
        </div>
        {solved ? (
          <div className="maps-who-loop-start">
            <ReactButton
              text="Puść w pętlę"
              label={`Puść w pętlę: ${character.name}, mapa ${map.name}`}
              disabled={run?.character.id === id || inLoop}
              onClick={() => {
                focus.owe({ characterId: id, target: "stop" });
                controls.startLoop(id, mapId, program.id);
              }}
            />
            {emptyLoop === null ? null : (
              <span className="maps-who-empty-loop">{emptyLoop}</span>
            )}
          </div>
        ) : null}
      </div>
      {run === null ? null : (
        <p className="maps-who-run-note">{runWaitingSentence(run.mapId)}</p>
      )}
    </li>
  );
}

/** The screen: the list of open maps and the right area with the card and „Kto idzie”, or the sentence to pick. */
function MapsView({
  controls,
  props,
}: {
  controls: MapsScreenControls;
  props: MapsScreenProps;
}) {
  const { state, mapId } = props;
  const elements = useRef(new Map<string, FocusControl>());
  const owed = useRef<OwedFocus | null>(null);

  // After every commit, so the move follows the commit that answers the click which asked for it:
  // the pressed button has by then turned inactive or left, and a disabled control cannot take focus.
  useLayoutEffect(() => {
    const asked = owed.current;
    owed.current = null;
    if (asked === null) return;
    const targets: FocusTarget[] =
      asked.target === "stop" ? ["stop"] : ["enter", "program"];
    for (const target of targets) {
      const element = elements.current.get(`${asked.characterId}:${target}`);
      if (element !== undefined && !element.disabled) {
        element.focus();
        return;
      }
    }
  });

  const focus: FocusPlumbing = {
    keep: (characterId, target) => (element) => {
      const key = `${characterId}:${target}`;
      if (element === null) elements.current.delete(key);
      else elements.current.set(key, element);
    },
    owe: (asked) => {
      owed.current = asked;
    },
  };

  // A map the list does not hold draws no card: sending to it is refused (D-149).
  const open =
    mapId !== null && sendMaps(state.solvedMaps).includes(mapId) ? mapId : null;
  return (
    <div className="screen maps-screen">
      <section className="screen-area maps-list-area">
        <MapList state={state} mapId={open} />
      </section>
      <section className="screen-area maps-card-area">
        {open === null ? (
          <p className="maps-card-empty">Wybierz mapę z listy.</p>
        ) : (
          <>
            <MapCard mapId={open} solved={state.solvedMaps.includes(open)} />
            <section className="maps-who">
              <h3 className="maps-who-heading">Kto idzie</h3>
              {state.team.characters.length === 0 ? (
                <p className="maps-who-empty">
                  Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.
                </p>
              ) : (
                <ul className="maps-who-list">
                  {state.team.characters.map((character) => (
                    <CharacterRow
                      key={character.id}
                      character={character}
                      mapId={open}
                      props={props}
                      controls={controls}
                      focus={focus}
                    />
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. Each screen is a new root: nothing it holds
 * outlives `dispose()`. The element takes focus when the page gives it, as the screen a change of
 * screen opens, and stands outside the keyboard's order otherwise.
 */
export function createMapsScreen(options: MapsScreenOptions): MapsScreen {
  const element = document.createElement("div");
  element.className = "maps-screen-host";
  element.tabIndex = -1;
  const root = createRoot(element);
  let disposed = false;
  function draw(props: MapsScreenProps): void {
    flushSync(() => {
      root.render(<MapsView controls={options.controls} props={props} />);
    });
  }
  draw(options.props);
  return {
    element,
    update(props: MapsScreenProps): void {
      if (!disposed) draw(props);
    },
    focus(): void {
      element.focus();
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
