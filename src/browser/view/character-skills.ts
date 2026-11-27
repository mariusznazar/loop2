import {
  BRANCHES,
  SKILLS,
  type BranchDef,
  type BranchId,
  type SkillId,
} from "../sim/data/skills.js";
import { branchRank, paidPractice, skillProgress } from "../sim/skills.js";
import type { Character, Practice } from "../sim/types.js";

/**
 * The row of a known tree on the screen Postać (D-199), in its columns: the tree's name, „poziom
 * {p}”, the share of the bar of practice, filled by the practice against the next threshold and full
 * after the last, „{wprawa} / {próg}” or „najwyższy” after the last threshold, „{k} pkt” where points
 * wait to be spent and null where none do, and „+{n} pkt czeka w pętli” where the practice waiting in
 * the character's earning loop gives new points to spend, null where it gives none.
 */
export type TreeRow = {
  name: string;
  level: string;
  share: number;
  amount: string;
  points: string | null;
  waiting: string | null;
};

/**
 * The row of the known tree `id` of the character, with `waiting` the practice that waits in its
 * earning loop, `{}` for a character in none. Pure.
 */
export function treeRow(
  character: Character,
  id: SkillId,
  waiting: Practice,
): TreeRow {
  const progress = skillProgress(character.skills, id);
  const practice = character.skills[id]?.practice ?? 0;
  const after = skillProgress(paidPractice(character.skills, waiting), id);
  const gained = after.points - progress.points;
  return {
    name: SKILLS[id].name,
    level: `poziom ${progress.level}`,
    share: progress.next === null ? 1 : Math.min(1, practice / progress.next),
    amount:
      progress.next === null ? "najwyższy" : `${practice} / ${progress.next}`,
    points: progress.points > 0 ? `${progress.points} pkt` : null,
    waiting: gained > 0 ? `+${gained} pkt czeka w pętli` : null,
  };
}

/**
 * A number of a branch's preview as the player reads it: at most six decimals, with a decimal comma
 * and no trailing zeros, so the computer's rounding (0.15000000000000002) never shows.
 */
function previewNumber(value: number): string {
  return String(Number(value.toFixed(6))).replace(".", ",");
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
      `${previewNumber(Math.max(preview.minimum ?? -Infinity, preview.base + preview.step * level))} ${preview.unit}`;
    text += ` · teraz ${value(rank)}`;
    if (cost !== undefined) text += ` → po kupnie ${value(rank + 1)}`;
  }
  if (cost !== undefined) text += ` · cena ${cost}`;
  return text;
}

/**
 * The line of the practice of a map run (D-201): its positive gains in the order of the skills' data,
 * or an empty line before the first effect. A run that pays its practice reads „Wprawa w tym
 * przejściu: …”; a manual run of a solved map, which pays none (D-189), reads „Wprawa zebrana w tym
 * przejściu, która nie wejdzie do umiejętności: …”. Pure.
 */
export function practiceText(practice: Practice, paid: boolean): string {
  const gains = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${practice[id]}`);
  if (gains.length === 0) return "";
  const lead = paid
    ? "Wprawa w tym przejściu"
    : "Wprawa zebrana w tym przejściu, która nie wejdzie do umiejętności";
  return `${lead}: ${gains.join(" · ")}`;
}
