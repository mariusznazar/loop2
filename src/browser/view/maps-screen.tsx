/**
 * The screen Mapy (D-325, D-331, D-282; `#/mapy` and `#/mapy/{map}`): two areas of their own, on the
 * left the list of the maps open to the player and on the right the card of the map the address
 * names with, under it, the section „Kto idzie”. Before a map is named the right area says to pick
 * one. The card is drawn from the map's data (D-327, D-328); under it each character of the team
 * stands with its lines, the two buttons that send it and the button of a judging of its program, whose
 * result unfolds under it (D-329, D-243, D-244, D-287, D-326, D-439, D-440). „Puść w pętlę” judges the
 * program anew first, starts the earning loop at once where all twelve seeds are solved, and otherwise
 * stands on the result as „Puść mimo to”, whose second click starts it (D-243).
 *
 * The page holds the screen behind one boundary, `createMapsScreen` (D-36), as it holds the screen
 * Postać: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. The screen performs nothing itself:
 * the five acts of a character go to the page through `controls`, which turns them into the
 * simulation's calls. What stands of a judging after its call (the result, the waiting button, the
 * second click that waits) lives in the screen alone (D-407). Nothing runs when the module is imported.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MAPS } from "../sim/data/maps.js";
import { RESOURCES } from "../sim/data/resources.js";
import { judgingMark } from "../sim/judging-record.js";
import { rowProgram } from "../sim/programs.js";
import type {
  Character,
  CharacterId,
  GameState,
  Judging,
  MapId,
  ProgramId,
} from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactSelectList } from "./controls/react-select-list.js";
import { JudgingMarkLine, JudgingResult } from "./judging-result.js";
import {
  JUDGE_BUTTON_TEXT,
  JUDGING_WAITING_TEXT,
  LOOP_ANYWAY_TEXT,
  sameLines,
  solvedSeeds,
  unsolvedSentence,
} from "./judging-lines.js";
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
import { emptyLoopMark, entersLine, tripWarning } from "./trip-lines.js";

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
  /**
   * Puts a character into an earning loop on a solved map, with the program its list shows; the screen
   * asks for it after the judging of „Puść w pętlę” or at the second click, and it judges nothing (D-243).
   */
  startLoop(characterId: CharacterId, mapId: MapId, programId: ProgramId): void;
  /** Stops a character's earning loop at once. */
  stop(characterId: CharacterId): void;
  /**
   * Judges the program of a character's list „Program:” on the map of the card and gives the judging
   * back (D-439); the page counts the time first and remembers the judging in the game state (D-409, D-440).
   */
  judge(characterId: CharacterId, mapId: MapId, programId: ProgramId): Judging;
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
type FocusTarget = "stop" | "enter" | "program" | "judge" | "loop";

/** The elements the focus can be sent to. */
type FocusControl = HTMLButtonElement | HTMLSelectElement;

/** The control the focus is owed to, asked by the click that makes the pressed button leave or stand inactive. */
type OwedFocus = {
  characterId: CharacterId;
  target: "stop" | "enter" | "judge" | "loop";
};

/** The controls a move of focus tries, in order, by the control that was pressed. */
const OWED_TARGETS: Record<OwedFocus["target"], FocusTarget[]> = {
  stop: ["stop"],
  enter: ["enter", "program"],
  judge: ["judge"],
  loop: ["loop"],
};

/**
 * The result of a judging that stands at a character, with what it was made for. `asking` is set where the
 * result is that of the first click of „Puść w pętlę” and the earning loop waits for the second (D-243).
 * `from` is the click that made the result: only a result of the button of a judging counts as the result
 * that stands, to which a click of „Puść w pętlę” gives the same twelve rows (D-243).
 */
type ShownJudging = {
  mapId: MapId;
  programId: ProgramId;
  judging: Judging;
  asking: boolean;
  from: JudgingAct;
};

/** The click a judging answers: the button of a judging, or the first click of „Puść w pętlę” (D-243). */
type JudgingAct = "judge" | "loop";

/** What a character's row gets from the screen for the judging: what waits, what stands, and the two acts on them. */
type JudgingPlumbing = {
  /** The characters whose button waits for the result, and which button it is. */
  waiting: readonly { characterId: CharacterId; act: JudgingAct }[];
  /** The result standing at each character that has one. */
  shown: Readonly<Partial<Record<CharacterId, ShownJudging>>>;
  /**
   * Starts a judging for a click: the waiting button is drawn first, and the page is asked after the browser
   * has painted it. `standing` is the result of the button of a judging that stands at the character for that
   * program and map, where the click is the first of „Puść w pętlę”, which starts the earning loop at once on
   * the same result (D-243); a result an earlier „Puść w pętlę” left there is none.
   */
  start(
    act: JudgingAct,
    characterId: CharacterId,
    mapId: MapId,
    programId: ProgramId,
    hadFocus: boolean,
    standing?: Judging,
  ): void;
  /** Spends the wait for the second click of „Puść w pętlę”: the click starts the earning loop (D-243). */
  spend(characterId: CharacterId): void;
  /** Takes away the result standing at a character, where its list shows another program. */
  clear(characterId: CharacterId): void;
};

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
          <>
            <span className="maps-card-sep"> · </span>
            <span className="maps-card-solved">{heading.solved}</span>
          </>
        )}
        {heading.openedBy === null ? null : (
          <>
            <span className="maps-card-sep"> · </span>
            <span className="maps-card-opened-by">{heading.openedBy}</span>
          </>
        )}
      </div>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Żąda</h3>
        <p>{solvingSentence(mapId)}</p>
      </section>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Teren</h3>
        <ul className="maps-card-lines">
          {terrainLines(map).map((line) => (
            <li key={line.text}>
              {line.text}
              {line.note === null ? null : (
                <span className="maps-card-note">{line.note}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="maps-card-part">
        <h3 className="maps-card-part-name">Leży tu</h3>
        <ul className="maps-card-lines">
          {resourceLines(map).map((resource) => (
            <li key={resource.id} className="maps-card-resource">
              <span
                className="icon-mask maps-card-icon"
                aria-hidden="true"
                style={
                  {
                    "--icon": `url("/icons/${RESOURCES[resource.id].icon}.svg")`,
                  } as CSSProperties
                }
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
                <p className="maps-card-attacker-head">
                  <span
                    className="icon-mask maps-card-icon"
                    aria-hidden="true"
                    style={
                      {
                        "--icon": `url("/icons/${attacker.icon}.svg")`,
                      } as CSSProperties
                    }
                  />
                  {attacker.head}
                </p>
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
  judging: JudgingPlumbing;
};

/** One character of „Kto idzie”: its lines from the top, its program and the two sending buttons (D-329). */
function CharacterRow({
  character,
  mapId,
  props,
  controls,
  focus,
  judging,
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
  const resurrection = resurrectionLine(state.team, nowMs);
  const warning = tripWarning(plan, capacity, map);
  const emptyLoop = solved ? emptyLoopMark(plan) : null;
  const run = state.run;
  const waiting = judging.waiting.some(
    (each) => each.characterId === id && each.act === "judge",
  );
  const loopWaiting = judging.waiting.some(
    (each) => each.characterId === id && each.act === "loop",
  );
  const held = judging.shown[id];
  const shown =
    held !== undefined && held.mapId === mapId && held.programId === program.id
      ? held
      : undefined;
  const mark = judgingMark(
    state.judgings,
    { characterId: id, programId: program.id, mapId },
    state.team.chest,
  );
  const judgeText = waiting ? JUDGING_WAITING_TEXT : JUDGE_BUTTON_TEXT;
  // The first click of „Puść w pętlę” found a seed unsolved: the sentence stands over the button, which reads
  // „Puść mimo to” and starts the earning loop at its click (D-243).
  const asking = shown !== undefined && shown.asking;
  const loopText = asking ? LOOP_ANYWAY_TEXT : "Puść w pętlę";
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
          onChange={(event) => {
            judging.clear(id);
            controls.pick(id, Number(event.target.value));
          }}
        />
        {mark === null ? null : <JudgingMarkLine mark={mark} />}
      </div>
      <p className="maps-who-enters">
        {entersLine(plan, state.team.chest, capacity, map)}
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
        </div>
        <div className="maps-who-judge">
          <ReactButton
            text={JUDGE_BUTTON_TEXT}
            waitingText={waiting ? JUDGING_WAITING_TEXT : null}
            label={`${judgeText}: ${character.name}, mapa ${map.name}`}
            buttonRef={focus.keep(id, "judge")}
            onClick={(event) => {
              const button = event.currentTarget;
              judging.start(
                "judge",
                id,
                mapId,
                program.id,
                button.ownerDocument.activeElement === button,
              );
            }}
          />
        </div>
        {solved ? (
          <div className="maps-who-loop-start">
            {asking ? (
              <p className="maps-who-loop-unsolved warning">
                {unsolvedSentence(shown.judging)}
              </p>
            ) : null}
            <div className="maps-who-loop-row">
              <ReactButton
                text={loopText}
                label={`${loopText}: ${character.name}, mapa ${map.name}`}
                disabled={run?.character.id === id || inLoop || loopWaiting}
                buttonRef={focus.keep(id, "loop")}
                onClick={(event) => {
                  if (asking) {
                    focus.owe({ characterId: id, target: "stop" });
                    controls.startLoop(id, mapId, program.id);
                    // After the start: the page's store redraws other screens with `flushSync` on its
                    // way, which would commit this update, and consume the owed focus, before the
                    // screen draws „Zatrzymaj”.
                    judging.spend(id);
                    return;
                  }
                  const button = event.currentTarget;
                  judging.start(
                    "loop",
                    id,
                    mapId,
                    program.id,
                    button.ownerDocument.activeElement === button,
                    shown?.from === "judge" ? shown.judging : undefined,
                  );
                }}
              />
              {emptyLoop === null ? null : (
                <span className="maps-who-empty-loop">{emptyLoop}</span>
              )}
            </div>
          </div>
        ) : null}
      </div>
      {run === null ? null : (
        <p className="maps-who-run-note">{runWaitingSentence(run.mapId)}</p>
      )}
      {shown === undefined ? null : <JudgingResult judging={shown.judging} />}
    </li>
  );
}

/** The results that stand, without the one at a character. */
function without(
  now: JudgingPlumbing["shown"],
  characterId: CharacterId,
): JudgingPlumbing["shown"] {
  return Object.fromEntries(
    Object.entries(now).filter(([id]) => id !== String(characterId)),
  );
}

/**
 * What stands at the characters after a judging of „Puść w pętlę” that started the earning loop at once: the
 * result that stood stays where the new one gives the same twelve rows, and goes where the judging solved all
 * twelve seeds in place of one that failed (D-243).
 */
function resultKept(
  now: JudgingPlumbing["shown"],
  characterId: CharacterId,
  standing: Judging | undefined,
  judged: Judging,
): JudgingPlumbing["shown"] {
  if (standing !== undefined && sameLines(standing, judged)) return now;
  return without(now, characterId);
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
  const [waiting, setWaiting] = useState<JudgingPlumbing["waiting"]>([]);
  const [shown, setShown] = useState<JudgingPlumbing["shown"]>({});
  const [shownOn, setShownOn] = useState(mapId);
  const alive = useRef(false);

  // Another map of the list is leaving the card: no result of a judging stands past it (D-329).
  if (shownOn !== mapId) {
    setShownOn(mapId);
    setShown({});
  }

  // A judging asked for but not yet made is dropped with the screen.
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // After every commit, so the move follows the commit that answers the click which asked for it:
  // the pressed button has by then turned inactive or left, and a disabled control cannot take focus.
  useLayoutEffect(() => {
    const asked = owed.current;
    owed.current = null;
    if (asked === null) return;
    for (const target of OWED_TARGETS[asked.target]) {
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

  const judging: JudgingPlumbing = {
    waiting,
    shown,
    start: (act, characterId, judgedMap, programId, hadFocus, standing) => {
      setWaiting((now) => [...now, { characterId, act }]);
      // The button is drawn waiting before the simulation runs, which blocks the page until it has
      // counted the twelve runs: the browser gets a frame to paint the button, and the page is asked in
      // the task after it.
      const judge = () => {
        if (!alive.current) return;
        let judged: Judging | null = null;
        let starting = false;
        try {
          judged = controls.judge(characterId, judgedMap, programId);
          // The first click of „Puść w pętlę” starts the earning loop at once where the judging solves all
          // twelve seeds, or gives each of them the row of the result that stands (D-243).
          starting =
            act === "loop" &&
            (solvedSeeds(judged) === judged.results.length ||
              (standing !== undefined && sameLines(standing, judged)));
          if (starting) {
            focus.owe({ characterId, target: "stop" });
            controls.startLoop(characterId, judgedMap, programId);
          }
        } finally {
          if (hadFocus && !starting) focus.owe({ characterId, target: act });
          setWaiting((now) =>
            now.filter(
              (each) => each.characterId !== characterId || each.act !== act,
            ),
          );
          if (judged !== null) {
            const done = judged;
            setShown((now) =>
              starting
                ? resultKept(now, characterId, standing, done)
                : {
                    ...now,
                    [characterId]: {
                      mapId: judgedMap,
                      programId,
                      judging: done,
                      asking: act === "loop",
                      from: act,
                    },
                  },
            );
          }
        }
      };
      window.requestAnimationFrame(() => window.setTimeout(judge, 0));
    },
    spend: (characterId) =>
      setShown((now) => {
        const held = now[characterId];
        return held === undefined
          ? now
          : { ...now, [characterId]: { ...held, asking: false } };
      }),
    clear: (characterId) => setShown((now) => without(now, characterId)),
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
                      judging={judging}
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
