import { takesItem, type ItemAction } from "./action-targets.js";
import { ITEMS } from "./data/items.js";
import {
  BRANCHES,
  SKILLS,
  MINIMUM_ACTION_MINUTES,
  type BranchDef,
  type BranchEffect,
  type BranchId,
  type GrownPair,
  type SkillDef,
  type SkillId,
} from "./data/skills.js";
import type {
  Action,
  CharacterSkills,
  GameState,
  ItemId,
  Practice,
} from "./types.js";
import type { GameResult } from "./game.js";

/** New characters own only practice and purchased ranks; all other skill values are derived. */
export function newSkills(
  predispositions: readonly SkillId[],
): CharacterSkills {
  return Object.fromEntries(
    predispositions.map((skill) => [skill, { practice: 0, ranks: {} }]),
  );
}

/** An independent snapshot for a map run, including each purchased-rank record. */
export function copySkills(skills: CharacterSkills): CharacterSkills {
  return Object.fromEntries(
    Object.entries(skills).map(([id, skill]) => [
      id,
      { practice: skill.practice, ranks: { ...skill.ranks } },
    ]),
  );
}

/** Each reached threshold grants one level and one point; unused practice remains visible. */
export function skillProgress(
  skills: CharacterSkills,
  id: SkillId,
): { level: number; next: number | null; points: number } {
  const skill = skills[id];
  const practice = skill?.practice ?? 0;
  const thresholds: readonly number[] = SKILLS[id].thresholds;
  const reached = thresholds.filter(
    (threshold) => practice >= threshold,
  ).length;
  const spent = Object.entries(BRANCHES).reduce(
    (sum, [branchId, branch]) =>
      sum +
      (branch.skill === id
        ? branch.costs
            .slice(0, skill?.ranks[branchId as BranchId] ?? 0)
            .reduce((total: number, cost: number) => total + cost, 0)
        : 0),
    0,
  );
  return {
    level: reached + 1,
    next: thresholds[reached] ?? null,
    points: reached - spent,
  };
}

/** The rank in the branch's own skill, or zero for an unbought branch. */
export function branchRank(skills: CharacterSkills, id: BranchId): number {
  return skills[BRANCHES[id].skill]?.ranks[id] ?? 0;
}

/** Sum the purchased effects that apply to this action, without storing derived values. */
export function skillBonus(
  skills: CharacterSkills,
  kind: BranchEffect["kind"],
  action?: Action["kind"],
): number {
  return Object.entries(BRANCHES).reduce((sum, [id, branch]) => {
    const effect: BranchEffect = branch.effect;
    if (
      effect.kind !== kind ||
      ("actions" in effect && (!action || !effect.actions.includes(action)))
    )
      return sum;
    return (
      sum +
      branchRank(skills, id as BranchId) *
        ("amount" in effect ? effect.amount : 1)
    );
  }, 0);
}

/**
 * The health one piece of a healing item gives back to a character: the item's healing of the data
 * plus the bought healing of its tree, 5 for each rank of „Mocniejszy zwój” (D-145). An item the data
 * give no healing gives none.
 */
export function healingOf(skills: CharacterSkills, item: ItemId): number {
  const healing = ITEMS[item].healing;
  return healing ? healing.health + skillBonus(skills, "healing") : 0;
}

/** Applies the run's duration bonuses and the one-game-minute floor. */
export function actionMinutes(
  base: number,
  action: Action["kind"],
  skills: CharacterSkills,
): number {
  return Math.max(
    MINIMUM_ACTION_MINUTES,
    base - skillBonus(skills, "duration", action),
  );
}

/** An action opened by a branch requires the character's purchase. */
export function branchActionAvailable(
  skills: CharacterSkills,
  action: Action["kind"],
): boolean {
  return Object.entries(BRANCHES).every(([id, branch]) => {
    const effect: BranchEffect = branch.effect;
    return (
      effect.kind !== "action" ||
      effect.action !== action ||
      branchRank(skills, id as BranchId) > 0
    );
  });
}

/** The item an action names as its target; undefined for an action that takes no item. */
export function targetItem(action: Action): ItemId | undefined {
  return takesItem(action.kind) ? (action as ItemAction).item : undefined;
}

/**
 * Whether a pair of a character skill covers an action's verb and target: the verb is the same and
 * the pair names no item, which covers every target of its verb, or names the action's item.
 */
export function pairCovers(
  pair: GrownPair,
  action: Action["kind"],
  item?: ItemId,
): boolean {
  return (
    pair.action === action && (pair.item === undefined || pair.item === item)
  );
}

/** The character skills, in the order of the data, whose pairs cover an action's verb and target. */
export function skillsGrowing(
  action: Action["kind"],
  item?: ItemId,
): SkillId[] {
  return (Object.keys(SKILLS) as SkillId[]).filter((skill) =>
    (SKILLS[skill] as SkillDef).grownBy.some((pair) =>
      pairCovers(pair, action, item),
    ),
  );
}

/**
 * One successful effect grants one practice, regardless of pieces moved or tiles revealed, to the
 * character skill whose pair covers the action's verb and, for an action that takes an item, its
 * item.
 */
export function practiced(
  practice: Practice,
  action: Action["kind"],
  item?: ItemId,
): Practice {
  const id = skillsGrowing(action, item)[0];
  return id ? { ...practice, [id]: (practice[id] ?? 0) + 1 } : practice;
}

/** Combines successful effects without changing either input. */
export function sumPractice(left: Practice, right: Practice): Practice {
  const result = { ...left };
  for (const id of Object.keys(right) as SkillId[])
    result[id] = (result[id] ?? 0) + right[id]!;
  return result;
}

/**
 * Whether a character has no practice yet: none in any of its skills, no rank of any branch bought,
 * and none in `gathered`, the practice gathered at its earning loop.
 */
export function hasNoPractice(
  skills: CharacterSkills,
  gathered: Practice,
): boolean {
  return (
    Object.values(gathered).every((practice) => (practice ?? 0) === 0) &&
    Object.values(skills).every(
      (skill) =>
        (skill?.practice ?? 0) === 0 &&
        Object.values(skill?.ranks ?? {}).every((rank) => (rank ?? 0) === 0),
    )
  );
}

/** Pays a completed run into the character's existing skills, leaving ranks intact. */
export function paidPractice(
  skills: CharacterSkills,
  practice: Practice,
): CharacterSkills {
  return Object.fromEntries(
    Object.entries(skills).map(([id, skill]) => [
      id,
      { ...skill, practice: skill.practice + (practice[id as SkillId] ?? 0) },
    ]),
  );
}

/** Refuses purchases while a map run is in the state, unknown trees, missing skills and unaffordable ranks. */
export function buyBranch(
  state: GameState,
  characterId: number,
  branchId: BranchId,
): GameResult {
  if (state.run) return { state, events: [] };
  const branch: BranchDef | undefined = Object.hasOwn(BRANCHES, branchId)
    ? BRANCHES[branchId]
    : undefined;
  const character = state.team.characters.find(
    (entry) => entry.id === characterId,
  );
  if (
    !branch ||
    !character?.skills[branch.skill] ||
    !state.understanding.trees.includes(branch.skill)
  )
    return { state, events: [] };
  const rank = branchRank(character.skills, branchId);
  const cost = branch.costs[rank];
  if (
    cost === undefined ||
    skillProgress(character.skills, branch.skill).points < cost
  )
    return { state, events: [] };
  const skill = character.skills[branch.skill]!;
  const skills = {
    ...character.skills,
    [branch.skill]: {
      ...skill,
      ranks: { ...skill.ranks, [branchId]: rank + 1 },
    },
  };
  return {
    state: {
      ...state,
      team: {
        ...state.team,
        characters: state.team.characters.map((entry) =>
          entry === character ? { ...entry, skills } : entry,
        ),
      },
    },
    events: [],
  };
}
