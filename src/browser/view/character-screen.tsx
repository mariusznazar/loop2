/**
 * The screen Postać (D-199, D-217, D-244, D-245, D-287): one character with its name, its generation,
 * its archetype, its resurrection line, the line of its earning loop with „Zatrzymaj” or the line of
 * a stopped loop, and the section „Umiejętności” once a tree is known. The page holds the screen
 * behind one boundary, `createCharacterScreen` (D-36): an element of its own for the page to place,
 * a first render that is synchronous, `update(props)` and `dispose()`. The page calls them from an
 * event handler or the continuation of an answer, never from render or an effect. The two acts of
 * the screen, a purchase and a stop, go to the page through `onBuy` and `onStop`. Nothing runs when
 * the module is imported.
 */
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { ARCHETYPES } from "../sim/data/archetypes.js";
import { MAPS } from "../sim/data/maps.js";
import {
  BRANCHES,
  SKILLS,
  type BranchId,
  type SkillId,
} from "../sim/data/skills.js";
import { branchRank, skillProgress } from "../sim/skills.js";
import type { CharacterId, GameState } from "../sim/types.js";
import { branchText, skillText } from "./character-skills.js";
import {
  generationLabel,
  loopLine,
  resurrectionLine,
  stoppedLoopLine,
} from "./headquarters.js";
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
  props: CharacterScreenProps;
};

export type CharacterScreen = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(props: CharacterScreenProps): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

type CharacterViewProps = Omit<CharacterScreenOptions, "props"> & {
  props: CharacterScreenProps;
};

/** The screen: one character, its loop or its stop, and its skills once a tree is known. */
function CharacterView({ onBuy, onStop, props }: CharacterViewProps) {
  const { state, nowMs, characterId } = props;
  const character = state.team.characters.find(
    (entry) => entry.id === characterId,
  );
  if (character === undefined) return null;

  const generation = generationLabel(character.generation);
  const resurrection = resurrectionLine(character, nowMs);
  const loop = state.loops[characterId];
  const stoppedPractice =
    loop === undefined ? state.stoppedLoops[characterId] : undefined;

  // The trees the character's archetype may grow that the player knows (D-199).
  const predispositions = ARCHETYPES[character.archetypeId]
    .predispositions as readonly SkillId[];
  const trees = (Object.keys(SKILLS) as SkillId[]).filter(
    (id) =>
      state.understanding.trees.includes(id) && predispositions.includes(id),
  );

  // While a manual map run waits or has ended, no purchase acts (D-287, D-200).
  const run = state.run;
  return (
    <section className="character-screen">
      <h2 className="character-screen-name">{character.name}</h2>
      <p className="character-screen-facts">
        {generation === null ? null : (
          <span className="character-screen-generation">{generation}</span>
        )}
        <span className="character-screen-archetype">
          {ARCHETYPES[character.archetypeId].name}
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
      {loop === undefined ? null : (
        <div className="character-screen-loop">
          <p className="character-screen-loop-line">{loopLine(loop)}</p>
          <ReactButton
            text="Zatrzymaj"
            kind="destructive"
            label={`Zatrzymaj: ${character.name}`}
            onClick={() => onStop()}
          />
        </div>
      )}
      {stoppedPractice === undefined ? null : (
        <p className="character-screen-stopped">
          {stoppedLoopLine(stoppedPractice)}
        </p>
      )}
      {trees.length === 0 ? null : (
        <section className="character-screen-skills">
          <h3>Umiejętności</h3>
          {run === null ? null : (
            <p className="character-screen-skills-note">
              {`Przejście na mapie ${MAPS[run.mapId].name} jest niezakończone. Stopnie kupisz po jego zakończeniu.`}
            </p>
          )}
          {trees.map((id) => (
            <div key={id} className="character-screen-tree">
              <p className="character-screen-tree-summary">
                {skillText(character, id)}
              </p>
              {(Object.keys(BRANCHES) as BranchId[])
                .filter((branch) => BRANCHES[branch].skill === id)
                .map((branch) => {
                  const costs: readonly number[] = BRANCHES[branch].costs;
                  const cost = costs[branchRank(character.skills, branch)];
                  const unaffordable =
                    cost === undefined ||
                    skillProgress(character.skills, id).points < cost;
                  return (
                    <div key={branch} className="character-screen-branch">
                      <span>{branchText(character, branch)}</span>
                      <ReactButton
                        text="Kup"
                        label={`Kup: ${BRANCHES[branch].name}`}
                        disabled={run !== null || unaffordable}
                        onClick={() => onBuy(branch)}
                      />
                    </div>
                  );
                })}
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. Each screen is a new root: nothing it holds
 * outlives `dispose()`.
 */
export function createCharacterScreen(
  options: CharacterScreenOptions,
): CharacterScreen {
  const element = document.createElement("div");
  element.className = "character-screen-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: CharacterScreenProps): void {
    flushSync(() => {
      root.render(
        <CharacterView
          onBuy={options.onBuy}
          onStop={options.onStop}
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
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
