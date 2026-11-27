/**
 * The screen Siedziba (D-282, D-51, D-54, D-246, D-217, D-218, D-244, D-245, D-447, D-184, D-330, D-389):
 * at the top, over the screen's panel, the picture band, a picture of the campfire, the chest and the
 * characters at the camp (`camp.tsx`); in the panel, under its heading, while the report on earning
 * loops holds a line, the row of its sentence that counts the earning loops, with „Zamknij”; the
 * section „Drużyna” with its heading, the team's resurrection line under it while the team holds a
 * character, and the grid of the cards of the characters in the order of creation, each with the
 * lines of the report in it, ended by the tile „+ postać” (`team-cards.tsx`); the section
 * „Skrzynka {n}/{cap}” with the team's chest; and, last on the screen, the folded section of credits
 * of the game's icons „Autorzy grafiki” (D-27). The screen sends nobody and leads to no map: a
 * character is sent from the card of a map on the screen Mapy, which the bar's „Mapy” opens (D-53,
 * D-330). It reads the manual map run, whose character is not in the camp and whose minute its card
 * shows.
 *
 * The page holds the screen behind one boundary, `createHeadquarters` (D-36), as it holds the
 * screen Postać: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. The screen performs nothing itself:
 * its acts go to the page through `controls`, which turns them into the simulation's calls.
 * The texts come from the pure functions of `team-lines.ts`, `character-status.ts` and
 * `away-report.ts`, and every name of the game's content from the data. Nothing runs when the module
 * is imported.
 */
import { useRef } from "react";
import type { RefObject } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { BALANCE } from "../sim/data/balance.js";
import { pieceCount } from "../sim/trip.js";
import type { CharacterId, GameState, Team } from "../sim/types.js";
import {
  CHEST_FULL_TEXT,
  reportChestFull,
  reportSummary,
} from "./away-report.js";
import { statusLine } from "./character-status.js";
import { ReactButton } from "./controls/react-button.js";
import { Camp } from "./camp.js";
import { CreditsSection } from "./credits-section.js";
import { CharacterCreation, TeamCard } from "./team-cards.js";
import { chestLines, resurrectionLine } from "./team-lines.js";

/** What the page gives the screen; every call of `update` gives it whole. */
export type HeadquartersProps = {
  /** The game state the screen draws. */
  state: GameState;
  /** The real moment of the clock's last reading, at which the resurrection lines are drawn. */
  nowMs: number;
};

/** What the screen asks of the page; the page turns each into a call of the simulation. */
export type HeadquartersControls = {
  /** Creates a character of the given name, already trimmed and not empty. */
  create: (name: string) => void;
  /** Stops a character's earning loop at once. */
  stop: (characterId: CharacterId) => void;
  /** Closes the whole report on earning loops (D-246). */
  closeReport: () => void;
  /** Takes the practice waiting at a character's earning loop with „Odbierz” (D-189). */
  takePractice: (characterId: CharacterId) => void;
};

export type HeadquartersOptions = {
  controls: HeadquartersControls;
  props: HeadquartersProps;
};

export type Headquarters = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /**
   * Draws the screen anew from what the page gives. A call whose game state and moment change
   * nothing the screen shows draws nothing.
   */
  update(props: HeadquartersProps): void;
  /** Moves keyboard focus to the screen's element. */
  focus(): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

type ReportProps = {
  state: Pick<GameState, "awayReport" | "team">;
  onClose: () => void;
  sectionRef: RefObject<HTMLElement | null>;
};

/**
 * The row of the report on earning loops above „Drużyna” (D-246): the sentence that counts the earning
 * loops, in `danger` where one stopped and in `positive` otherwise, „Skrzynka jest pełna.” in `warning`
 * where the chest is full, and one button „Zamknij” that closes the whole report; the lines of the
 * report stand in the cards of their characters. The row stays in the page, hidden and empty, while
 * the report holds no line.
 */
function AwayReport({ state, onClose, sectionRef }: ReportProps) {
  const summary = reportSummary(state);
  return (
    <section
      ref={sectionRef}
      className="headquarters-section away-report"
      hidden={summary === null}
    >
      {summary === null ? null : (
        <>
          <p
            className={
              summary.danger
                ? "away-report-summary danger"
                : "away-report-summary positive"
            }
          >
            {summary.text}
          </p>
          {reportChestFull(state.team.chest) ? (
            <p className="away-report-full">{CHEST_FULL_TEXT}</p>
          ) : null}
          <ReactButton text="Zamknij" onClick={onClose} />
        </>
      )}
    </section>
  );
}

/**
 * The screen: the picture band over the panel, and in the panel the report, the team with the creation of a
 * character, the chest, and the folded section of credits last.
 */
function HeadquartersView({
  controls,
  props,
}: {
  controls: HeadquartersControls;
  props: HeadquartersProps;
}) {
  const { state, nowMs } = props;
  const reportSection = useRef<HTMLElement>(null);
  const teamHeading = useRef<HTMLHeadingElement>(null);

  // „Zamknij” leaves the page with the report, and the focus goes to the heading of the section that
  // takes its place, so the next key press reaches the team's first control, not the page's body.
  function closeReport(): void {
    controls.closeReport();
    if (reportSection.current?.hidden === true) teamHeading.current?.focus();
  }

  const chest = state.team.chest;
  const lines = chestLines(chest);
  const characters = state.team.characters;
  const resurrection = resurrectionLine(state.team, nowMs);
  return (
    <>
      <Camp state={state} />
      <div className="headquarters screen-area">
        <h2>Siedziba</h2>
        <AwayReport
          state={state}
          onClose={closeReport}
          sectionRef={reportSection}
        />
        <section className="headquarters-section">
          <h3 ref={teamHeading} tabIndex={-1}>
            Drużyna
          </h3>
          {characters.length === 0 ? (
            <p className="headquarters-empty">
              Drużyna nie ma jeszcze postaci.
            </p>
          ) : (
            <p
              className={
                resurrection.danger
                  ? "team-resurrection danger"
                  : "team-resurrection"
              }
            >
              {resurrection.text}
            </p>
          )}
          <ul className="team-list">
            {characters.map((character) => (
              <TeamCard
                key={character.id}
                character={character}
                state={state}
                onStop={controls.stop}
                onTake={controls.takePractice}
              />
            ))}
            <CharacterCreation
              key="creation"
              emptyTeam={characters.length === 0}
              onCreate={controls.create}
            />
          </ul>
        </section>
        <section className="headquarters-section">
          <h3>{`Skrzynka ${pieceCount(chest.pieces)}/${BALANCE.chestCapacity}`}</h3>
          {lines.length === 0 ? (
            <p className="headquarters-empty">Skrzynka jest pusta.</p>
          ) : (
            <ul className="chest-list">
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          )}
        </section>
        <CreditsSection />
      </div>
    </>
  );
}

/** Everything the screen draws, as the parts of the state it reads and the lines of the moment. */
type Drawn = {
  team: Team;
  /** The character of the manual map run, going, paused or ended, or null: it is not in the camp (D-389). */
  runCharacter: CharacterId | null;
  /** The line its card shows of that map run, with its minute and its end (D-447), or null. */
  runLine: string | null;
  loops: GameState["loops"];
  stoppedLoops: GameState["stoppedLoops"];
  awayReport: GameState["awayReport"];
  resurrection: string;
};

function drawnOf({ state, nowMs }: HeadquartersProps): Drawn {
  return {
    team: state.team,
    runCharacter: state.run?.character.id ?? null,
    runLine:
      state.run === null ? null : statusLine(state, state.run.character.id),
    loops: state.loops,
    stoppedLoops: state.stoppedLoops,
    awayReport: state.awayReport,
    resurrection: JSON.stringify(resurrectionLine(state.team, nowMs)),
  };
}

function sameDrawn(one: Drawn, other: Drawn): boolean {
  return (
    one.team === other.team &&
    one.runCharacter === other.runCharacter &&
    one.runLine === other.runLine &&
    one.loops === other.loops &&
    one.stoppedLoops === other.stoppedLoops &&
    one.awayReport === other.awayReport &&
    one.resurrection === other.resurrection
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. The screen is one root for as long as the
 * page keeps it, so the field of the name and the buttons keep their elements, their text and their
 * focus at every `update`; the page calls `update` at every change of the game state and every
 * reading of the clock, and a call that changes none of the parts of the state the screen reads,
 * nor the line of the resurrection, nor the line of the manual map run its card shows, draws
 * nothing, so a reading of the clock within a game minute costs the screen nothing. The element takes focus when the page gives it, and stands outside the keyboard's
 * order otherwise.
 */
export function createHeadquarters(options: HeadquartersOptions): Headquarters {
  const element = document.createElement("div");
  element.className = "headquarters-host";
  element.tabIndex = -1;
  const root = createRoot(element);
  let disposed = false;
  let drawn: Drawn | null = null;
  function draw(props: HeadquartersProps): void {
    const next = drawnOf(props);
    if (drawn !== null && sameDrawn(drawn, next)) return;
    drawn = next;
    flushSync(() => {
      root.render(
        <HeadquartersView controls={options.controls} props={props} />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: HeadquartersProps): void {
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
