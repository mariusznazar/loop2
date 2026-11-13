/**
 * The screen Siedziba (D-282, D-51, D-54, D-246, D-217, D-218, D-244, D-245, D-184, D-330, D-389): at
 * the top, over the screen's panel, the camp, a picture of the campfire, the chest and the characters
 * that are in Siedziba (`camp.tsx`); in the panel, under its heading the report on earning loops
 * „Gdy cię nie było” or „Pętle, które stanęły” while it holds a line, with „Zamknij”; the section
 * „Drużyna” with its heading, at each character in the order of creation its name as a link to its
 * screen Postać, its generation „pokolenie {n}” from 2 up, its archetype, its resurrection line, the
 * line of its earning loop with „Zatrzymaj” or the line of a stopped loop, and the creation of a
 * character; the section „Skrzynka {n}/{cap}” with the team's chest; and, last on the screen, the
 * folded section of credits of the game's icons „Autorzy grafiki” (D-27). The screen sends nobody and
 * leads to no map: a character is sent from the card of a map on the screen Mapy, which the bar's
 * „Mapy” opens (D-53, D-330). It reads the manual map run, whose character is not in the camp.
 *
 * The page holds the screen behind one boundary, `createHeadquarters` (D-36), as it holds the
 * screen Postać: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. The screen performs nothing itself:
 * its acts go to the page through `controls`, which turns them into the simulation's calls.
 * The texts come from the pure functions of `team-lines.ts` and `away-report.ts`, and every name
 * of the game's content from the data. Nothing runs when the module is imported.
 */
import { useRef, useState } from "react";
import type { RefObject } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ARCHETYPES, CREATED_ARCHETYPE } from "../sim/data/archetypes.js";
import { BALANCE } from "../sim/data/balance.js";
import { characterName } from "../sim/game.js";
import { pieceCount } from "../sim/trip.js";
import type { Character, CharacterId, GameState, Team } from "../sim/types.js";
import {
  CHEST_FULL_TEXT,
  reportChestFull,
  reportEntries,
  reportTitle,
} from "./away-report.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { Camp } from "./camp.js";
import { CreditsSection } from "./credits-section.js";
import { screenAddress } from "./screen-address.js";
import {
  chestLines,
  generationLabel,
  loopLine,
  resurrectionLine,
  stoppedLoopLine,
} from "./team-lines.js";

/** The message under the name field when the name typed is empty once trimmed. */
export const EMPTY_NAME_MESSAGE = "Wpisz imię postaci.";

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

function characterNameOf(
  state: Pick<GameState, "team">,
  characterId: CharacterId,
): string {
  return state.team.characters.find(({ id }) => id === characterId)?.name ?? "";
}

type ReportProps = {
  state: Pick<GameState, "awayReport" | "team" | "loops">;
  onClose: () => void;
  onTake: (characterId: CharacterId) => void;
  sectionRef: RefObject<HTMLElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
};

/**
 * The section of the report on earning loops (D-246): its title, one line for each entry with the
 * loops that stopped in `danger` and „Odbierz” in `positive` at a line whose loop has practice
 * waiting, „Skrzynka jest pełna.” in `warning` where the chest is full, and one button „Zamknij”
 * that closes the whole report. The section stays in the page, hidden and empty, while the report
 * holds no line.
 */
function AwayReport({
  state,
  onClose,
  onTake,
  sectionRef,
  closeRef,
}: ReportProps) {
  const entries = reportEntries(state);
  return (
    <section
      ref={sectionRef}
      className="headquarters-section away-report"
      hidden={entries.length === 0}
    >
      {entries.length === 0 ? null : (
        <>
          <h3>{reportTitle(state.awayReport)}</h3>
          <ul className="away-report-list">
            {entries.map(({ text, danger, takeFor }, index) => (
              <li
                key={index}
                className={
                  danger ? "away-report-line danger" : "away-report-line"
                }
              >
                <span className="away-report-text">{text}</span>
                {takeFor === null ? null : (
                  <ReactButton
                    text="Odbierz"
                    kind="positive"
                    label={`Odbierz: ${characterNameOf(state, takeFor)}`}
                    onClick={() => onTake(takeFor)}
                  />
                )}
              </li>
            ))}
          </ul>
          {reportChestFull(state.team.chest) ? (
            <p className="away-report-full">{CHEST_FULL_TEXT}</p>
          ) : null}
          <ReactButton text="Zamknij" onClick={onClose} buttonRef={closeRef} />
        </>
      )}
    </section>
  );
}

type MemberProps = {
  character: Character;
  state: GameState;
  nowMs: number;
  onStop: (characterId: CharacterId) => void;
};

/** One character of the team: its lines, and „Zatrzymaj” where it is in an earning loop. */
function TeamMember({ character, state, nowMs, onStop }: MemberProps) {
  const generation = generationLabel(character.generation);
  const resurrection = resurrectionLine(character, nowMs);
  const loop = state.loops[character.id];
  const stoppedPractice =
    loop === undefined ? state.stoppedLoops[character.id] : undefined;
  return (
    <li className="team-member">
      <a
        className="team-member-name"
        href={screenAddress({ kind: "character", characterId: character.id })}
      >
        {character.name}
      </a>
      {generation === null ? null : (
        <span className="team-member-generation">{generation}</span>
      )}
      <span className="team-member-archetype">
        {ARCHETYPES[character.archetypeId].name}
      </span>
      <p
        className={
          resurrection.danger
            ? "team-member-resurrection danger"
            : "team-member-resurrection"
        }
      >
        {resurrection.text}
      </p>
      {loop === undefined ? null : (
        <>
          <p className="team-member-loop">{loopLine(loop)}</p>
          <ReactButton
            text="Zatrzymaj"
            kind="destructive"
            label={`Zatrzymaj: ${character.name}`}
            onClick={() => onStop(character.id)}
          />
        </>
      )}
      {stoppedPractice === undefined ? null : (
        <p className="team-member-stopped">
          {stoppedLoopLine(stoppedPractice)}
        </p>
      )}
    </li>
  );
}

/**
 * The creation of a character: its label, the field for the name and „Załóż”. The name lives in the
 * field itself, which the screen only reads when the player asks, so it outlives every redraw of
 * the screen with its element, its text and its focus; the button is the same element at every
 * redraw too. Enter in the field asks as „Załóż” does.
 */
function CharacterCreation({ onCreate }: { onCreate: (name: string) => void }) {
  const field = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function submit(): void {
    const input = field.current;
    if (input === null) return;
    const name = characterName(input.value);
    if (name === null) {
      setError(EMPTY_NAME_MESSAGE);
      return;
    }
    setError(null);
    input.value = "";
    onCreate(name);
  }

  return (
    <div
      className="character-creation"
      onKeyDown={(event) => {
        if (event.key === "Enter" && event.target === field.current) submit();
      }}
    >
      <span className="character-creation-label">
        {`Nowa postać: ${ARCHETYPES[CREATED_ARCHETYPE].name}`}
      </span>
      <ReactTextField
        label="Imię nowej postaci"
        hint="Imię"
        error={error}
        inputRef={field}
        onChange={() => setError(null)}
      />
      <ReactButton text="Załóż" onClick={submit} />
    </div>
  );
}

/**
 * The screen: the camp over the panel, and in the panel the report, the team with the creation of a
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
  const closeButton = useRef<HTMLButtonElement>(null);

  // „Zamknij” leaves the page with the report, and the focus goes to the heading of the section that
  // takes its place, so the next key press reaches the team's first control, not the page's body.
  function closeReport(): void {
    controls.closeReport();
    if (reportSection.current?.hidden === true) teamHeading.current?.focus();
  }

  // „Odbierz” leaves the page with the practice it paid, and the focus goes to „Zamknij” of
  // the section, so the next key press stays in the report, not in the page's body.
  function takePractice(characterId: CharacterId): void {
    controls.takePractice(characterId);
    if (!reportSection.current?.contains(document.activeElement))
      closeButton.current?.focus();
  }

  const chest = state.team.chest;
  const lines = chestLines(chest);
  return (
    <>
      <Camp state={state} />
      <div className="headquarters screen-area">
        <h2>Siedziba</h2>
        <AwayReport
          state={state}
          onClose={closeReport}
          onTake={takePractice}
          sectionRef={reportSection}
          closeRef={closeButton}
        />
        <section className="headquarters-section">
          <h3 ref={teamHeading} tabIndex={-1}>
            Drużyna
          </h3>
          {state.team.characters.length === 0 ? (
            <p className="headquarters-empty">
              Drużyna nie ma jeszcze postaci.
            </p>
          ) : (
            <ul className="team-list">
              {state.team.characters.map((character) => (
                <TeamMember
                  key={character.id}
                  character={character}
                  state={state}
                  nowMs={nowMs}
                  onStop={controls.stop}
                />
              ))}
            </ul>
          )}
          <CharacterCreation onCreate={controls.create} />
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
  loops: GameState["loops"];
  stoppedLoops: GameState["stoppedLoops"];
  awayReport: GameState["awayReport"];
  resurrection: string;
};

function drawnOf({ state, nowMs }: HeadquartersProps): Drawn {
  return {
    team: state.team,
    runCharacter: state.run?.character.id ?? null,
    loops: state.loops,
    stoppedLoops: state.stoppedLoops,
    awayReport: state.awayReport,
    resurrection: JSON.stringify(
      state.team.characters.map((character) =>
        resurrectionLine(character, nowMs),
      ),
    ),
  };
}

function sameDrawn(one: Drawn, other: Drawn): boolean {
  return (
    one.team === other.team &&
    one.runCharacter === other.runCharacter &&
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
 * reading of the clock, and a call that changes none of the parts of the state the screen reads
 * nor a line of the resurrection draws nothing, so a game minute of a map run costs the hidden
 * screen nothing. The element takes focus when the page gives it, and stands outside the keyboard's
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
