/**
 * The screen Wiedza (D-416, D-281, D-282; `#/wiedza`): under its heading two areas of their own, on
 * the left the Understanding, the actions, items and creatures the player has discovered in three
 * groups, each in the order of discovery with the newest last, and on the right the skill trees the
 * player knows, in the order of the data, each a folded row across the area that a click anywhere
 * on it opens to its branches with their descriptions, the price of every rank and, for a branch
 * whose data give a number, the line of its steps. The screen shows what the player knows and
 * changes nothing: it has no level, no progress, no „Kup” and no act of the game (D-200). A group
 * with no thing stands nowhere, and the right area stands only once a tree is known (D-199).
 *
 * The page holds the screen behind one boundary, `createKnowledgeScreen` (D-36), as it holds the
 * screen Mapy: an element of its own for the page to place, a first render that is synchronous,
 * `update(props)`, `focus()` and `dispose()`. The page calls them from an event handler or the
 * continuation of an answer, never from render or an effect. Which trees stand open is the screen's
 * own state, in the component: every entering of the screen builds it anew, so each entering starts
 * with the trees folded. Nothing runs when the module is imported.
 *
 * Classes the style rules read (`src/browser/knowledge-screen.css`): `knowledge-screen-host` the element of the
 * screen; `knowledge-screen` its root, over `knowledge-heading` and `knowledge-areas` (beside
 * `screen`); `knowledge-understanding` and `knowledge-skills` the two areas, each with a
 * `knowledge-area-head` holding `knowledge-area-name` and `knowledge-area-count`; `knowledge-group`
 * a group, with `knowledge-group-name` and `knowledge-things`, whose `knowledge-thing` holds an
 * `icon-mask` and `knowledge-thing-name`; `knowledge-trees` the list of trees, each
 * `knowledge-tree` holding its `knowledge-tree-row` — the fold, `knowledge-tree-name` and
 * `knowledge-tree-branches` — with `knowledge-branches` after it where it stands open, each branch a
 * `knowledge-branch` with `knowledge-branch-head` over `knowledge-branch-name` and
 * `knowledge-branch-steps`, `knowledge-branch-costs`, `knowledge-branch-description` and, where its
 * data give a number, `knowledge-steps`, each `knowledge-step` with `knowledge-step-name`,
 * `knowledge-step-value` and, but for the one with no step bought, `knowledge-step-price`.
 */
import { useState } from "react";
import type { CSSProperties } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { SkillId } from "../sim/data/skills.js";
import type { GameState } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import {
  knownGroups,
  knownThingCount,
  knownTrees,
  thingsCounter,
  treesCounter,
  type KnownBranch,
  type KnownTree,
} from "./knowledge-lines.js";

/** What the page gives the screen; every call of `update` gives it whole. */
export type KnowledgeScreenProps = {
  /** The game state the screen draws; only its Understanding is read. */
  state: GameState;
};

export type KnowledgeScreenOptions = {
  props: KnowledgeScreenProps;
};

export type KnowledgeScreen = {
  /** The screen with its element, for the page to place. */
  element: HTMLElement;
  /** Draws the screen anew from what the page gives. */
  update(props: KnowledgeScreenProps): void;
  /** Moves keyboard focus to the screen, for the page to call when a change of screen opens it. */
  focus(): void;
  /** Unmounts the screen and takes it out of the page. */
  dispose(): void;
};

/** The screen: the Understanding on the left, the known skill trees on the right. */
function KnowledgeView({ props }: { props: KnowledgeScreenProps }) {
  const { understanding } = props.state;
  // The trees stand open or folded by the player's clicks in this screen alone; none is open when
  // the screen is built.
  const [open, setOpen] = useState<readonly SkillId[]>([]);
  const groups = knownGroups(understanding);
  const trees = knownTrees(understanding);
  const toggle = (id: SkillId) =>
    setOpen((now) =>
      now.includes(id) ? now.filter((each) => each !== id) : [...now, id],
    );
  return (
    <div className="knowledge-screen">
      <h2 className="knowledge-heading">Wiedza</h2>
      <div className="screen knowledge-areas">
        <section className="screen-area knowledge-understanding">
          <div className="knowledge-area-head">
            <h3 className="knowledge-area-name">Zrozumienie</h3>
            <span className="knowledge-area-count">
              {thingsCounter(knownThingCount(understanding))}
            </span>
          </div>
          {groups.map((group) => (
            <section key={group.heading} className="knowledge-group">
              <h4 className="knowledge-group-name">{group.heading}</h4>
              <ul className="knowledge-things">
                {group.things.map((thing) => (
                  <li key={thing.key} className="knowledge-thing">
                    <span
                      className="icon-mask"
                      aria-hidden="true"
                      style={
                        {
                          "--icon": `url("/icons/${thing.icon}.svg")`,
                        } as CSSProperties
                      }
                    />
                    <span className="knowledge-thing-name">{thing.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
        {trees.length === 0 ? null : (
          <section className="screen-area knowledge-skills">
            <div className="knowledge-area-head">
              <h3 className="knowledge-area-name">Umiejętności</h3>
              <span className="knowledge-area-count">
                {treesCounter(trees.length)}
              </span>
            </div>
            <ul className="knowledge-trees">
              {trees.map((tree) => (
                <Tree
                  key={tree.id}
                  tree={tree}
                  isOpen={open.includes(tree.id)}
                  onToggle={() => toggle(tree.id)}
                />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

/**
 * A known tree: its row across the area — the fold, the name and „{n} gałęzi” — which a click
 * anywhere on it opens and folds, and under it, while it stands open, its branches.
 */
function Tree({
  tree,
  isOpen,
  onToggle,
}: {
  tree: KnownTree;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="knowledge-tree">
      {/* The fold is the row's one control, the one the keyboard reaches; a click anywhere on the
          row reaches the same toggle, the fold's own click included, which bubbles to it. */}
      <div className="knowledge-tree-row" onClick={onToggle}>
        <ReactButton
          text={isOpen ? "▾" : "▸"}
          label={tree.name}
          expanded={isOpen}
        />
        <span className="knowledge-tree-name">{tree.name}</span>
        <span className="knowledge-tree-branches">{tree.branches}</span>
      </div>
      {isOpen ? (
        <ul className="knowledge-branches">
          {tree.branchList.map((branch) => (
            <Branch key={branch.id} branch={branch} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/**
 * A branch of an open tree: „{nazwa} · {n} stopni” with the prices of its steps beside it, its
 * description under it and, for a branch whose data give a number, the line of its steps.
 */
function Branch({ branch }: { branch: KnownBranch }) {
  return (
    <li className="knowledge-branch">
      <div className="knowledge-branch-head">
        <span className="knowledge-branch-name">{branch.name}</span>
        {" · "}
        <span className="knowledge-branch-steps">{branch.steps}</span>
      </div>
      <span className="knowledge-branch-costs">{branch.costs}</span>
      <div className="knowledge-branch-description">{branch.description}</div>
      {branch.values === null ? null : (
        <ul className="knowledge-steps">
          <li className="knowledge-step knowledge-step-without">
            <span className="knowledge-step-name">bez gałęzi</span>{" "}
            <span className="knowledge-step-value">
              {branch.values.without}
            </span>
          </li>
          {branch.values.steps.map((step) => (
            <li key={step.numeral} className="knowledge-step">
              <span className="knowledge-step-name">{step.numeral}</span>{" "}
              <span className="knowledge-step-value">{step.value}</span>
              <span className="knowledge-step-price">{` · ${step.price}`}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * Builds the screen in an element of its own, for the page to place. The render is synchronous, so
 * the screen stands in the element when this returns. Each screen is a new root: nothing it holds
 * outlives `dispose()`. The element takes focus when the page gives it, as the screen a change of
 * screen opens, and stands outside the keyboard's order otherwise.
 */
export function createKnowledgeScreen(
  options: KnowledgeScreenOptions,
): KnowledgeScreen {
  const element = document.createElement("div");
  element.className = "knowledge-screen-host";
  element.tabIndex = -1;
  const root = createRoot(element);
  let disposed = false;
  function draw(props: KnowledgeScreenProps): void {
    flushSync(() => {
      root.render(<KnowledgeView props={props} />);
    });
  }
  draw(options.props);
  return {
    element,
    update(props: KnowledgeScreenProps): void {
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
