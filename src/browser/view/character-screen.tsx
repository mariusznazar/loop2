/**
 * The screen Postać (D-445, D-446, D-447, D-199, D-217, D-218, D-244, D-245, D-287): one character in
 * two areas side by side, as the columns of Mapy and Wiedza. The narrow left area holds, from the top,
 * the character's name, the line of its generation and archetype with the archetype's icon, and its
 * resurrection line; under them the frame of what the character does: its state, the line of its
 * earning loop with „Zatrzymaj”, or the line of a stopped earning loop; and under the frame the section
 * „Wyposażenie”, from the creation of the character, with the figure of the character and the tiles of
 * its gear in it (`character-gear.tsx`). The wide
 * right area holds the section „Umiejętności” once a tree is known. The page holds the screen behind one
 * boundary, `createCharacterScreen` (D-36): an element of its own for the page to place, a first render
 * that is synchronous, `update(props)` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. Its acts go to the page through `onBuy` for a
 * purchase, `onStop` for a stop, and, for the gear, `onPutOn` and `onTakeOff`:
 * putting a piece of the chest on a slot and taking the piece of a slot off (D-461). Nothing runs when the
 * module is imported.
 */
import { useRef, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ARCHETYPES } from "../sim/data/archetypes.js";
import type { GearSlot } from "../sim/data/gear.js";
import type { ItemId } from "../sim/data/items.js";
import { SKILLS, type BranchId, type SkillId } from "../sim/data/skills.js";
import { waitingPractice } from "../sim/loop.js";
import type { CharacterId, GameState } from "../sim/types.js";
import { CharacterGear } from "./character-gear.js";
import { statusLine } from "./character-status.js";
import { CharacterTrees } from "./character-trees.js";
import {
  generationLabel,
  loopLine,
  resurrectionLine,
  stoppedLoopLine,
} from "./team-lines.js";
import { ReactButton } from "./controls/react-button.js";

/** What the page gives the screen; every call of `update` gives it whole. */
export type CharacterScreenProps = {
  /** The game state the screen draws. */
  state: GameState;
  /** The real moment of the clock's last reading, at which the resurrection line is drawn. */
  nowMs: number;
  /** The character the screen shows, by its number (D-56). */
  characterId: CharacterId;
};

export type CharacterScreenOptions = {
  /** Called when the player buys a branch rank of the character. */
  onBuy: (branch: BranchId) => void;
  /** Called when the player stops the character's earning loop. */
  onStop: () => void;
  /** Called when the player picks an item of the chest for a slot of the character's gear (D-461). */
  onPutOn: (slot: GearSlot, item: ItemId) => void;
  /** Called when the player takes the piece of a slot of the character's gear off (D-461). */
  onTakeOff: (slot: GearSlot) => void;
  props: CharacterScreenProps;
};

export type CharacterScreen = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(props: CharacterScreenProps): void;
  /** Moves keyboard focus to the screen, for the page to call when „Zakończ” opens it. */
  focus(): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

type CharacterViewProps = Omit<CharacterScreenOptions, "props"> & {
  props: CharacterScreenProps;
};

/** The screen: the character's facts, frame and gear section with its figure on the left, its skills on the right. */
function CharacterView({
  onBuy,
  onStop,
  onPutOn,
  onTakeOff,
  props,
}: CharacterViewProps) {
  const { state, nowMs, characterId } = props;
  const name = useRef<HTMLHeadingElement>(null);
  const stop = useRef<HTMLButtonElement>(null);
  const character = state.team.characters.find(
    (entry) => entry.id === characterId,
  );
  if (character === undefined) return null;

  const archetype = ARCHETYPES[character.archetypeId];
  const generation = generationLabel(character.generation);
  const resurrection = resurrectionLine(state.team, nowMs);
  const status = statusLine(state, characterId);
  const loop = state.loops[characterId];
  const stoppedPractice =
    loop === undefined ? state.stoppedLoops[characterId] : undefined;

  // The trees the character's archetype may grow that the player knows (D-199).
  const predispositions = archetype.predispositions as readonly SkillId[];
  const trees = (Object.keys(SKILLS) as SkillId[]).filter(
    (id) =>
      state.understanding.trees.includes(id) && predispositions.includes(id),
  );

  return (
    <div className="character-screen">
      <div className="screen character-areas">
        <section className="screen-area character-identity">
          <div className="character-facts">
            <h2 ref={name} tabIndex={-1} className="character-screen-name">
              {character.name}
            </h2>
            <p className="character-screen-facts">
              {generation === null ? null : (
                <span className="character-screen-generation">
                  {generation}
                </span>
              )}
              <span className="character-screen-archetype">
                <span
                  className="icon-mask"
                  aria-hidden="true"
                  style={
                    {
                      "--icon": `url("/icons/${archetype.icon}.svg")`,
                    } as CSSProperties
                  }
                />
                {archetype.name}
              </span>
            </p>
            <p
              className={
                resurrection.danger
                  ? "character-screen-resurrection danger"
                  : "character-screen-resurrection"
              }
            >
              {resurrection.text}
            </p>
          </div>
          <div className="character-screen-status">
            {status === null ? null : (
              <p className="character-screen-state">{status}</p>
            )}
            {loop === undefined ? null : (
              <div className="character-screen-loop">
                <p className="character-screen-loop-line">{loopLine(loop)}</p>
                <ReactButton
                  text="Zatrzymaj"
                  kind="destructive"
                  label={`Zatrzymaj: ${character.name}`}
                  buttonRef={stop}
                  onClick={() => {
                    onStop();
                    // The stop removes the button, which then has no element to keep: the focus moves on to
                    // the character's name, while a refused stop leaves the button, and its focus, where they stand.
                    if (stop.current === null) name.current?.focus();
                  }}
                />
              </div>
            )}
            {stoppedPractice === undefined ? null : (
              <p className="character-screen-stopped">
                {stoppedLoopLine(stoppedPractice)}
              </p>
            )}
          </div>
          <CharacterGear
            character={character}
            state={state}
            inLoop={loop !== undefined}
            onPutOn={onPutOn}
            onTakeOff={onTakeOff}
          />
        </section>
        {trees.length === 0 ? null : (
          <CharacterTrees
            character={character}
            trees={trees}
            waiting={loop === undefined ? {} : waitingPractice(loop)}
            run={state.run}
            onBuy={onBuy}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. Each screen is a new root: nothing it holds
 * outlives `dispose()`. The element takes focus when the page gives it, as the screen a change of
 * screen opens, and stands outside the keyboard's order otherwise.
 */
export function createCharacterScreen(
  options: CharacterScreenOptions,
): CharacterScreen {
  const element = document.createElement("div");
  element.className = "character-screen-host";
  element.tabIndex = -1;
  const root = createRoot(element);
  let disposed = false;
  function draw(props: CharacterScreenProps): void {
    flushSync(() => {
      root.render(
        <CharacterView
          onBuy={options.onBuy}
          onStop={options.onStop}
          onPutOn={options.onPutOn}
          onTakeOff={options.onTakeOff}
          props={props}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: CharacterScreenProps): void {
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
