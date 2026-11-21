/**
 * The section „Umiejętności” of the screen Postać (D-199, D-200, D-287, D-40): the trees the player
 * knows that the character's archetype grows, in the order of the data, each a row in columns — the
 * fold, the name with „+{n} pkt czeka w pętli” after it where the practice waiting in the earning loop
 * gives new points, „poziom {p}”, the bar of practice, „{wprawa} / {próg}” or „najwyższy”, and „{k}
 * pkt” where points wait. The trees stand folded at each building of the screen; a click on a tree's
 * row, or the keyboard on its fold, a shared button that says whether the tree stands open, opens it
 * to its branches, each with its words and „Kup”. Which trees stand open is this section's own state.
 * Nothing runs when the module is imported.
 */
import { useState, type CSSProperties } from "react";
import { MAPS } from "../sim/data/maps.js";
import { BRANCHES, type BranchId, type SkillId } from "../sim/data/skills.js";
import { branchRank, skillProgress } from "../sim/skills.js";
import type { Character, MapRun, Practice } from "../sim/types.js";
import { branchText, treeRow } from "./character-skills.js";
import { ReactButton } from "./controls/react-button.js";

export type CharacterTreesProps = {
  character: Character;
  /** The known trees the character's archetype grows, in the order of the data. */
  trees: readonly SkillId[];
  /** The practice waiting in the character's earning loop, `{}` for a character in none. */
  waiting: Practice;
  /** The manual map run of the game state, which stops every purchase while it stands (D-287). */
  run: MapRun | null;
  onBuy: (branch: BranchId) => void;
};

/** The branches of an open tree, each with its words and „Kup”, which no point or a map run stops. */
function Branches({
  character,
  tree,
  run,
  onBuy,
}: {
  character: Character;
  tree: SkillId;
  run: MapRun | null;
  onBuy: (branch: BranchId) => void;
}) {
  return (
    <div className="character-branches">
      {(Object.keys(BRANCHES) as BranchId[])
        .filter((branch) => BRANCHES[branch].skill === tree)
        .map((branch) => {
          const costs: readonly number[] = BRANCHES[branch].costs;
          const cost = costs[branchRank(character.skills, branch)];
          const unaffordable =
            cost === undefined ||
            skillProgress(character.skills, tree).points < cost;
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
  );
}

/** The section „Umiejętności”, its trees folded until the player opens them. */
export function CharacterTrees({
  character,
  trees,
  waiting,
  run,
  onBuy,
}: CharacterTreesProps) {
  const [open, setOpen] = useState<readonly SkillId[]>([]);
  const toggle = (id: SkillId) =>
    setOpen((now) =>
      now.includes(id) ? now.filter((each) => each !== id) : [...now, id],
    );
  return (
    <section className="screen-area character-screen-skills">
      <h3>Umiejętności</h3>
      {run === null ? null : (
        <p className="character-screen-skills-note">
          {`Przejście na mapie ${MAPS[run.mapId].name} jest niezakończone. Stopnie kupisz po jego zakończeniu.`}
        </p>
      )}
      <ul className="character-trees">
        {trees.map((id) => {
          const row = treeRow(character, id, waiting);
          const isOpen = open.includes(id);
          return (
            <li key={id} className="character-screen-tree">
              {/* The fold is the row's one control; a click anywhere on the row reaches the same
                  toggle, the fold's own click included, which bubbles to it. */}
              <div className="character-tree-row" onClick={() => toggle(id)}>
                <ReactButton
                  text={isOpen ? "▾" : "▸"}
                  label={row.name}
                  expanded={isOpen}
                />
                <span className="character-tree-name">
                  {row.name}
                  {row.waiting === null ? null : (
                    <span className="character-tree-waiting">
                      {row.waiting}
                    </span>
                  )}
                </span>
                <span className="character-tree-level">{row.level}</span>
                <span className="character-tree-bar">
                  <span
                    className="character-tree-fill"
                    style={{ "--share": row.share } as CSSProperties}
                  />
                </span>
                <span className="character-tree-amount">{row.amount}</span>
                <span className="character-tree-points">
                  {row.points ?? ""}
                </span>
              </div>
              {isOpen ? (
                <Branches
                  character={character}
                  tree={id}
                  run={run}
                  onBuy={onBuy}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
