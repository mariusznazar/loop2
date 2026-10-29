import { ARCHETYPES } from "../sim/data/archetypes.js";
import {
  BRANCHES,
  SKILLS,
  type BranchDef,
  type BranchId,
  type SkillId,
} from "../sim/data/skills.js";
import { branchRank, skillProgress } from "../sim/skills.js";
import type { Character, GameState, Practice } from "../sim/types.js";
import { createButton } from "./controls/button.js";

/** A known skill's level, cumulative practice and available points. Pure. */
export function skillText(character: Character, id: SkillId): string {
  const progress = skillProgress(character.skills, id);
  const practice = character.skills[id]!.practice;
  const amount =
    progress.next === null
      ? `${progress.level} (najwyższy) · wprawa ${practice}`
      : `${progress.level} · wprawa ${practice}/${progress.next}`;
  return `${SKILLS[id].name} — poziom ${amount} · punkty ${progress.points}`;
}

/** The branch's current rank and, while another is available, its preview and price. Pure. */
export function branchText(character: Character, id: BranchId): string {
  const branch: BranchDef = BRANCHES[id];
  const rank = branchRank(character.skills, id);
  const cost = branch.costs[rank];
  let text = `${branch.name} ${rank}/${branch.costs.length} — ${branch.description}`;
  if (branch.preview) {
    const preview = branch.preview;
    const value = (level: number) =>
      `${Math.max(preview.minimum ?? -Infinity, preview.base + preview.step * level)} ${preview.unit}`;
    text += ` · teraz ${value(rank)}`;
    if (cost !== undefined) text += ` → po kupnie ${value(rank + 1)}`;
  }
  if (cost !== undefined) text += ` · cena ${cost}`;
  return text;
}

/** Positive gains in catalog order, or an empty line before the first effect. Pure. */
export function practiceText(practice: Practice): string {
  const gains = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${practice[id]}`);
  return gains.length ? `Wprawa w tym przejściu: ${gains.join(" · ")}` : "";
}

/** Keeps purchase buttons in place across purchases, preserving keyboard focus. */
export function createCharacterSkills(
  characterId: number,
  buy: (id: BranchId) => void,
): { element: HTMLElement; update(state: GameState): void } {
  const element = document.createElement("section");
  element.className = "character-skills";
  const heading = document.createElement("h4");
  heading.textContent = "Umiejętności";
  element.append(heading);
  const rows = new Map<
    SkillId,
    {
      element: HTMLElement;
      heading: HTMLElement;
      branches: {
        id: BranchId;
        text: HTMLElement;
        button: HTMLButtonElement;
      }[];
    }
  >();
  for (const id of Object.keys(SKILLS) as SkillId[]) {
    const section = document.createElement("div");
    section.className = "skill-tree";
    const title = document.createElement("p");
    title.className = "skill-summary";
    section.append(title);
    const branches = (Object.keys(BRANCHES) as BranchId[])
      .filter((branch) => BRANCHES[branch].skill === id)
      .map((branchId) => {
        const row = document.createElement("div");
        row.className = "skill-branch";
        const text = document.createElement("span");
        const button = createButton("Kup", {
          label: `Kup: ${BRANCHES[branchId].name}`,
        });
        button.addEventListener("click", () => buy(branchId));
        row.append(text, button);
        section.append(row);
        return { id: branchId, text, button };
      });
    rows.set(id, { element: section, heading: title, branches });
    element.append(section);
  }
  return {
    element,
    update(state) {
      const character = state.team.characters.find(
        (entry) => entry.id === characterId,
      )!;
      const visible = state.understanding.trees.filter((id) =>
        (
          ARCHETYPES[character.archetypeId]
            .predispositions as readonly SkillId[]
        ).includes(id),
      );
      element.hidden = visible.length === 0;
      for (const [id, row] of rows) {
        row.element.hidden = !visible.includes(id);
        if (row.element.hidden) continue;
        row.heading.textContent = skillText(character, id);
        for (const branch of row.branches) {
          branch.text.textContent = branchText(character, branch.id);
          const costs: readonly number[] = BRANCHES[branch.id].costs;
          const cost = costs[branchRank(character.skills, branch.id)];
          branch.button.disabled =
            state.run !== null ||
            cost === undefined ||
            skillProgress(character.skills, id).points < cost;
        }
      }
    },
  };
}
