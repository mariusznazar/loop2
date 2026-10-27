import { ARCHETYPES, CREATED_ARCHETYPE } from "./data/archetypes.js";
import { SKILLS, type SkillId } from "./data/skills.js";
import type {
  Action,
  Condition,
  GameState,
  Program,
  ProgramRule,
  Understanding,
} from "./types.js";

/** The subset of an Understanding that a character can use in a program; computed, never saved. */
export type Repertoire = Understanding;

/** The Understanding of a new game: the condition "Zawsze" alone. */
export function newUnderstanding(): Understanding {
  return { actions: [], conditions: ["always"], items: [] };
}

/** Every action that some character skill grows. */
function grownBySomeSkill(): Set<Action["kind"]> {
  return new Set(Object.values(SKILLS).flatMap((skill) => skill.actions));
}

/**
 * The repertoire of an Understanding through a list of predispositions. An action of the
 * Understanding is in it where a skill among the predispositions grows it, or where no skill grows
 * it; a condition and an item are in it whatever the predispositions.
 */
export function repertoireOf(
  understanding: Understanding,
  predispositions: readonly SkillId[],
): Repertoire {
  const grown = grownBySomeSkill();
  const opened = new Set<Action["kind"]>(
    predispositions.flatMap((skill) => SKILLS[skill].actions),
  );
  return {
    actions: understanding.actions.filter(
      (kind) => opened.has(kind) || !grown.has(kind),
    ),
    conditions: [...understanding.conditions],
    items: [...understanding.items],
  };
}

/** Whether a condition, with the resource or item it names, lies in the repertoire. */
export function conditionInRepertoire(
  repertoire: Repertoire,
  condition: Condition,
): boolean {
  if (!repertoire.conditions.includes(condition.kind)) return false;
  switch (condition.kind) {
    case "hereBelow":
      return repertoire.items.includes(condition.resource);
    case "itemBelow":
      return repertoire.items.includes(condition.item);
    default:
      return true;
  }
}

/** Whether an action, with the resource it names, lies in the repertoire. */
export function actionInRepertoire(
  repertoire: Repertoire,
  action: Action,
): boolean {
  if (!repertoire.actions.includes(action.kind)) return false;
  switch (action.kind) {
    case "walkTo":
    case "gather":
      return repertoire.items.includes(action.resource);
    default:
      return true;
  }
}

/** Whether a program rule — its condition, its action and their targets — lies in the repertoire. */
export function ruleInRepertoire(
  repertoire: Repertoire,
  rule: ProgramRule,
): boolean {
  return (
    conditionInRepertoire(repertoire, rule.condition) &&
    actionInRepertoire(repertoire, rule.action)
  );
}

/**
 * The program reduced to a repertoire: the same groups and rules with their identities, less every
 * rule outside the repertoire and every group whose condition lies outside it — passed over as a
 * group whose condition does not hold.
 */
export function programInRepertoire(
  program: Program,
  repertoire: Repertoire,
): Program {
  return {
    ...program,
    groups: program.groups
      .filter((group) => conditionInRepertoire(repertoire, group.condition))
      .map((group) => ({
        ...group,
        rules: group.rules.filter((rule) => ruleInRepertoire(repertoire, rule)),
      })),
  };
}

/**
 * The repertoire of the program the editor shows: that of the archetype of the character in the map
 * run during one, otherwise of the archetype every created character takes.
 */
export function editorRepertoire(state: GameState): Repertoire {
  const runner = state.run
    ? state.team.characters.find(
        (character) => character.id === state.run?.character.id,
      )
    : undefined;
  const archetype = ARCHETYPES[runner?.archetypeId ?? CREATED_ARCHETYPE];
  return repertoireOf(state.understanding, archetype.predispositions);
}
