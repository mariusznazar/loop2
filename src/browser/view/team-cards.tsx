/**
 * The cards of the section „Drużyna” of Siedziba (D-280, D-446, D-447, D-39, D-217, D-246, D-44, D-51,
 * D-52): the card of a character, a tile with its archetype's icon before its name, the dot of a
 * running earning loop, its generation and archetype, the line of what it does and the lines of the
 * report in it; and the tile „+ postać” that ends the cards and opens the field of a new name in its
 * place. The screen, `headquarters.tsx`, places them in its grid. The texts come from the pure
 * functions of `team-lines.ts`, `character-status.ts` and `away-report.ts`, and every name of the
 * game's content from the data. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ARCHETYPES, CREATED_ARCHETYPE } from "../sim/data/archetypes.js";
import { characterName } from "../sim/game.js";
import type { Character, CharacterId, GameState } from "../sim/types.js";
import { reportLinesOf } from "./away-report.js";
import { statusLine } from "./character-status.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { screenAddress } from "./screen-address.js";
import { generationLabel, loopLine, stoppedLoopLine } from "./team-lines.js";

/** The message under the name field when the name typed is empty once trimmed. */
export const EMPTY_NAME_MESSAGE = "Wpisz imię postaci.";

/** The icon of an archetype, drawn as a mask in the colour of the text beside it (D-43, D-446). */
function ArchetypeIcon({ icon }: { icon: string }) {
  return (
    <span
      className="icon-mask"
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${icon}.svg")` } as CSSProperties}
    />
  );
}

type CardProps = {
  character: Character;
  state: GameState;
  onStop: (characterId: CharacterId) => void;
  onTake: (characterId: CharacterId) => void;
};

/**
 * The card of one character. Its name is the one link of the card, to the screen Postać, and the
 * stylesheet stretches the link's area over the whole card, so the card leads there wherever it is
 * touched, while „Zatrzymaj” and „Odbierz” stand above that area as buttons of their own (D-280).
 * Once a stop or a take takes its button away, the focus goes to the name, the element of the card
 * that stays (styleguide, "Focus does not fall to the page").
 */
export function TeamCard({ character, state, onStop, onTake }: CardProps) {
  const name = useRef<HTMLAnchorElement>(null);
  const stop = useRef<HTMLButtonElement>(null);
  const take = useRef<HTMLButtonElement>(null);
  const archetype = ARCHETYPES[character.archetypeId];
  const generation = generationLabel(character.generation);
  const status = statusLine(state, character.id);
  const loop = state.loops[character.id];
  const stoppedPractice =
    loop === undefined ? state.stoppedLoops[character.id] : undefined;
  const report = reportLinesOf(state, character.id);
  return (
    <li className={loop === undefined ? "team-member" : "team-member looping"}>
      <p className="team-member-head">
        <ArchetypeIcon icon={archetype.icon} />
        <a
          ref={name}
          className="team-member-name"
          href={screenAddress({ kind: "character", characterId: character.id })}
        >
          {character.name}
        </a>
        {loop === undefined ? null : (
          <span className="team-member-dot" aria-hidden="true">
            ●
          </span>
        )}
      </p>
      <p className="team-member-facts">
        {generation === null ? null : (
          <>
            <span className="team-member-generation">{generation}</span>
            {" · "}
          </>
        )}
        <span className="team-member-archetype">{archetype.name}</span>
      </p>
      <div className="team-member-status">
        {status === null ? null : <p className="team-member-state">{status}</p>}
        {loop === undefined ? null : (
          <>
            <p className="team-member-loop">{loopLine(loop)}</p>
            <ReactButton
              text="Zatrzymaj"
              kind="destructive"
              label={`Zatrzymaj: ${character.name}`}
              buttonRef={stop}
              onClick={() => {
                onStop(character.id);
                // The stop removes the button, which then has no element to keep: the focus moves on to
                // the name, while a refused stop leaves the button, and its focus, where they stand.
                if (stop.current === null) name.current?.focus();
              }}
            />
          </>
        )}
        {stoppedPractice === undefined ? null : (
          <p className="team-member-stopped">
            {stoppedLoopLine(stoppedPractice)}
          </p>
        )}
      </div>
      {report.length === 0 ? null : (
        <ul className="team-member-report">
          {report.map(({ text, danger, takeFor }, index) => (
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
                  label={`Odbierz: ${character.name}`}
                  buttonRef={take}
                  onClick={() => {
                    onTake(takeFor);
                    // „Odbierz” leaves with the practice it paid: the focus moves on to the name.
                    if (take.current === null) name.current?.focus();
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

type CreationProps = {
  /** Whether the team holds no character: the field then stands open and cannot be closed (D-51). */
  emptyTeam: boolean;
  onCreate: (name: string) => void;
};

/**
 * The tile „+ postać” at the end of the cards: closed, the dashed shared button; a touch opens in its
 * place the line of the archetype, the field of the name, „Załóż” and, under them, „Anuluj”, and
 * moves the focus to the field. An empty team has the field open from the start, with no „Anuluj”.
 * „Załóż” with a name hands it on and closes the tile; „Anuluj” and Escape in the field close it with
 * nothing created and the field emptied; after each the focus goes to the closed „+ postać” that
 * stands in the field's place. The name lives in the field itself, which the screen reads only when
 * the player asks, and the screen is one root kept while the page lives, so the open tile and its
 * text outlive every redraw and a visit to another screen. Enter in the field asks as „Załóż” does.
 */
export function CharacterCreation({ emptyTeam, onCreate }: CreationProps) {
  const field = useRef<HTMLInputElement>(null);
  const add = useRef<HTMLButtonElement>(null);
  const focusNext = useRef<"name" | "tile" | null>(null);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = opened || emptyTeam;

  // A control that a touch takes away has no element to keep the focus: the one that stands in its
  // place takes it once the change is drawn.
  useLayoutEffect(() => {
    const next = focusNext.current;
    if (next === null) return;
    focusNext.current = null;
    (next === "name" ? field.current : add.current)?.focus();
  });

  function close(): void {
    setError(null);
    setOpened(false);
    focusNext.current = "tile";
  }

  function submit(): void {
    const input = field.current;
    if (input === null) return;
    const name = characterName(input.value);
    if (name === null) {
      setError(EMPTY_NAME_MESSAGE);
      return;
    }
    input.value = "";
    close();
    onCreate(name);
  }

  if (!open)
    return (
      <li className="team-add">
        <ReactButton
          text="+ postać"
          kind="dashed"
          buttonRef={add}
          onClick={() => {
            setOpened(true);
            focusNext.current = "name";
          }}
        />
      </li>
    );
  const archetype = ARCHETYPES[CREATED_ARCHETYPE];
  return (
    <li
      className="team-add open"
      onKeyDown={(event) => {
        if (event.target !== field.current) return;
        if (event.key === "Enter") {
          // The closed „+ postać” takes the focus at once, and the browser would press it with this
          // same key, opening the tile again: the key does its one act here.
          event.preventDefault();
          submit();
        }
        if (event.key === "Escape" && !emptyTeam) close();
      }}
    >
      <p className="team-add-archetype">
        <ArchetypeIcon icon={archetype.icon} />
        {archetype.name}
      </p>
      <ReactTextField
        label="Imię nowej postaci"
        hint="Imię"
        error={error}
        inputRef={field}
        onChange={() => setError(null)}
      />
      <ReactButton text="Załóż" onClick={submit} />
      {emptyTeam ? null : (
        <ReactButton text="Anuluj" kind="secondary" onClick={close} />
      )}
    </li>
  );
}
