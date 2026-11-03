import {
  BRANCHES,
  SKILLS,
  type BranchDef,
  type BranchId,
  type SkillId,
} from "../sim/data/skills.js";
import { branchRank, skillProgress } from "../sim/skills.js";
import type { Character, Practice } from "../sim/types.js";

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
