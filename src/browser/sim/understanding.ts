import { backpackCount } from "./character.js";
import { ACTIONS, type ActionDef } from "./data/actions.js";
import { ARCHETYPES, CREATED_ARCHETYPE } from "./data/archetypes.js";
import { BALANCE } from "./data/balance.js";
import { CAMPFIRE } from "./data/campfire.js";
import { CONDITIONS, type ConditionDef } from "./data/conditions.js";
import { CREATURES } from "./data/creatures.js";
import { ITEMS } from "./data/items.js";
import type { Revelation } from "./data/revelations.js";
import { SKILLS, type SkillId } from "./data/skills.js";
import { tileAt } from "./hex.js";
import type { GameEvent } from "./run.js";
import type {
  Action,
  Condition,
  GameState,
  ItemId,
  MapRun,
  Program,
  ProgramRule,
  Understanding,
} from "./types.js";

/** The subset of an Understanding that a character can use in a program; computed, never saved. */
export type Repertoire = Understanding;

/** The Understanding of a new game: the condition "Zawsze" alone. */
export function newUnderstanding(): Understanding {
  return { actions: [], conditions: ["always"], items: [], creatures: [] };
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
    creatures: [...understanding.creatures],
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

/** Whether two revealing events are the same event, including its named item or creature. */
function sameRevelation(
  a: Revelation,
  b: { kind: string; item?: string; creature?: string },
): boolean {
  return (
    a.kind === b.kind &&
    ("item" in a ? "item" in b && a.item === b.item : !("item" in b)) &&
    ("creature" in a
      ? "creature" in b && a.creature === b.creature
      : !("creature" in b))
  );
}

/** The first event of `kind` among the events of a minute. */
function eventOf<K extends GameEvent["kind"]>(
  events: readonly GameEvent[],
  kind: K,
): Extract<GameEvent, { kind: K }> | undefined {
  return events.find(
    (event): event is Extract<GameEvent, { kind: K }> => event.kind === kind,
  );
}

/**
 * The revealing events that happened in a game minute, read from the map run before the minute and
 * after it up to the pick, and from the events of that minute: the chill from the body after its
 * step; a finished exploration from its revealed tile and the items that tile holds; a gathering
 * from the pieces that entered the backpack; a crafting from the campfire put on the tile; a
 * lighting from the pieces it used. The effect of an action takes hold only where the character
 * lives, so in the minute of death only the body's event happens.
 */
function happened(
  before: MapRun,
  after: MapRun,
  events: readonly GameEvent[],
): Revelation[] {
  const found: Revelation[] = [];
  if (after.body.temperature < BALANCE.body.chilledBelow)
    found.push({ kind: "chilled" });
  if (after.death) return found;

  const finished = eventOf(events, "activityFinished");
  if (finished?.activity.kind !== "rule") return found;
  switch (finished.activity.action.kind) {
    case "explore": {
      found.push({ kind: "explored" });
      const revealed = eventOf(events, "tileRevealed");
      const tile = revealed && tileAt(after.tiles, revealed.at);
      for (const item of Object.keys(ITEMS) as ItemId[]) {
        if (tile && Object.hasOwn(tile.stock, item))
          found.push({ kind: "tileHolds", item });
      }
      break;
    }
    case "gather":
      for (const item of Object.keys(ITEMS) as ItemId[]) {
        if (after.character.backpack[item] > before.character.backpack[item])
          found.push({ kind: "gathered", item });
      }
      break;
    case "craftCampfire":
      if (after.campfires.length > before.campfires.length)
        found.push({ kind: "campfireCrafted" });
      break;
    case "lightCampfire":
    case "lightItem":
      if (
        backpackCount(after.character.backpack) <
        backpackCount(before.character.backpack)
      )
        found.push({ kind: "lit" });
      break;
    default:
      break;
  }
  return found;
}

/** What a game minute revealed, and the Understanding with it. */
export type Discovered = {
  /** The Understanding after the minute. */
  understanding: Understanding;
  /** What is new to the Understanding, each list in the order of its data. */
  revealed: Understanding;
  /** Whether the chill revealed something new: the first chill. */
  chill: boolean;
};

/** What the revealing events `happening` reveal that the Understanding does not hold yet. */
function newlyRevealed(
  understanding: Understanding,
  happening: readonly Revelation[],
): Understanding {
  const revealing = (revealedBy: Revelation | undefined) =>
    revealedBy !== undefined &&
    happening.some((event) => sameRevelation(event, revealedBy));
  const items: Understanding["items"] = (Object.keys(ITEMS) as ItemId[]).filter(
    (item) =>
      !understanding.items.includes(item) && revealing(ITEMS[item].revealedBy),
  );
  if (
    !understanding.items.includes(CAMPFIRE.id) &&
    revealing(CAMPFIRE.revealedBy)
  )
    items.push(CAMPFIRE.id);
  const creatures = (
    Object.keys(CREATURES) as (keyof typeof CREATURES)[]
  ).filter(
    (id) =>
      !understanding.creatures.includes(id) &&
      revealing(CREATURES[id].revealedBy),
  );
  return {
    actions: (Object.keys(ACTIONS) as Action["kind"][]).filter(
      (kind) =>
        !understanding.actions.includes(kind) &&
        revealing((ACTIONS[kind] as ActionDef).revealedBy),
    ),
    conditions: (Object.keys(CONDITIONS) as Condition["kind"][]).filter(
      (kind) =>
        !understanding.conditions.includes(kind) &&
        revealing((CONDITIONS[kind] as ConditionDef).revealedBy),
    ),
    items,
    creatures,
  };
}

function isEmpty(revealed: Understanding): boolean {
  return (
    revealed.actions.length +
      revealed.conditions.length +
      revealed.items.length +
      revealed.creatures.length ===
    0
  );
}

/**
 * What a game minute up to the pick reveals, from the map run before it, the map run after it and
 * its events, read against the revealing events of the data. What the Understanding already holds
 * reveals nothing; null where nothing is new. Inputs are not changed.
 */
export function discover(
  understanding: Understanding,
  before: MapRun,
  after: MapRun,
  events: readonly GameEvent[],
): Discovered | null {
  const happening = happened(before, after, events);
  const revealed = newlyRevealed(understanding, happening);
  if (isEmpty(revealed)) return null;
  return {
    understanding: {
      actions: [...understanding.actions, ...revealed.actions],
      conditions: [...understanding.conditions, ...revealed.conditions],
      items: [...understanding.items, ...revealed.items],
      creatures: [...understanding.creatures, ...revealed.creatures],
    },
    revealed,
    chill: !isEmpty(
      newlyRevealed(
        understanding,
        happening.filter((event) => event.kind === "chilled"),
      ),
    ),
  };
}

/**
 * The program with the rule "Zawsze → Eksploruj" appended to its first group, with the next rule
 * identity; where it has no group, with a group "Program" under "Zawsze" made for it, with the
 * next group identity. Inputs are not changed.
 */
export function withFirstChillRule(program: Program): Program {
  const rule: ProgramRule = {
    id: program.nextRuleId,
    condition: { kind: "always" },
    action: { kind: "explore" },
  };
  const [first, ...rest] = program.groups;
  if (first)
    return {
      ...program,
      groups: [{ ...first, rules: [...first.rules, rule] }, ...rest],
      nextRuleId: program.nextRuleId + 1,
    };
  return {
    groups: [
      {
        id: program.nextGroupId,
        name: "Program",
        condition: { kind: "always" },
        rules: [rule],
      },
    ],
    nextGroupId: program.nextGroupId + 1,
    nextRuleId: program.nextRuleId + 1,
  };
}
