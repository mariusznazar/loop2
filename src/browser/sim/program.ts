import {
  backpackCap,
  backpackCount,
  fitsSlot,
  gearSlots,
} from "./character.js";
import { BALANCE } from "./data/balance.js";
import { CAMPFIRE } from "./data/campfire.js";
import { ACTIONS, type ActionDef } from "./data/actions.js";
import { CONDITIONS, type ConditionDef } from "./data/conditions.js";
import {
  GEAR_PLACES,
  GEAR_SLOTS,
  WIELDING_SLOT,
  type GearPlace,
  type GearSlot,
} from "./data/gear.js";
import { ITEMS } from "./data/items.js";
import { nearestTile, neighbours, sameHex, tileAt } from "./hex.js";
import { RESOURCES } from "./data/resources.js";
import { actionMinutes, branchActionAvailable, skillBonus } from "./skills.js";
import {
  BRANCH_NOT_BOUGHT,
  conditionInRepertoire,
  outsideReason,
  type Repertoire,
} from "./understanding.js";
import type {
  Action,
  Activity,
  Backpack,
  Campfire,
  CharacterSkills,
  Condition,
  ConditionContext,
  Gear,
  GroupId,
  Hex,
  ItemId,
  MapRun,
  Program,
  ProgramRule,
  ResourceId,
  RuleId,
  RunCharacter,
  Tile,
} from "./types.js";

/** The part of a map run the program reads: never the generator, never the current activity. */
export type RunView = Pick<
  MapRun,
  "tiles" | "character" | "campfires" | "body" | "natureEnergy"
>;

/** The nature energy an action costs, from the actions' data; 0 for an action that costs none. */
export function natureEnergyCost(action: Action): number {
  return (ACTIONS[action.kind] as ActionDef).natureEnergy ?? 0;
}

/**
 * The sticks lighting a campfire uses up: the data's count, none for a character with the bought
 * branch „Czysty płomień” (D-63).
 */
export function campfireLightCount(skills: CharacterSkills): number {
  return skillBonus(skills, "cleanFlame") > 0 ? 0 : CAMPFIRE.light.count;
}

/** What carrying out an action takes from the backpack and from the nature energy. */
export type ActionPrice = {
  /** The pieces it uses up, in the order they leave the backpack; none where it uses none. */
  pieces: { item: ItemId; count: number }[];
  /** The nature energy it takes; 0 for an action that costs none. */
  natureEnergy: number;
};

/**
 * The price of an action for a character of `skills`, as the data gives it: what crafting, lighting,
 * feeding and eating use up of the piece the data marks for that use (the same first piece the
 * reason of a rule names, D-310), and the nature energy of a spell (D-175). An action with a target
 * is priced by it, given as `item`: „Wytwórz” by the recipe's pieces of its target, „Opatrz” by one
 * piece of it (D-363, D-443); the bare verb, with no target, uses up nothing. A strike uses up
 * nothing (D-145), nor does any action of walking, gathering or combat. Pure.
 */
export function actionPrice(
  kind: Action["kind"],
  skills: CharacterSkills,
  item?: ItemId,
): ActionPrice {
  const natureEnergy = (ACTIONS[kind] as ActionDef).natureEnergy ?? 0;
  const pieces: ActionPrice["pieces"] = [];
  switch (kind) {
    case "craftCampfire":
      pieces.push(CAMPFIRE.craft);
      break;
    case "lightCampfire":
      pieces.push({
        item: CAMPFIRE.light.item,
        count: campfireLightCount(skills),
      });
      break;
    case "lightItem":
      pieces.push({ item: firstItemFor("lightable"), count: 1 });
      break;
    case "feedCampfire":
      pieces.push({ item: firstItemFor("fuel"), count: 1 });
      break;
    case "eat":
      pieces.push({ item: firstItemFor("food"), count: 1 });
      break;
    case "craft":
      if (item !== undefined)
        pieces.push(
          ...(ITEMS[item].recipe?.uses ?? []).map((use) => ({ ...use })),
        );
      break;
    case "tend":
      if (item !== undefined) pieces.push({ item, count: 1 });
      break;
    default:
      break;
  }
  return {
    pieces: pieces.filter((piece) => piece.count > 0),
    natureEnergy,
  };
}

/** The number a kind of condition takes, from the conditions' data. */
export type ConditionNumber = {
  defaultValue: number;
  min: number;
  max: number;
  /** The numbers taken lie on this step counted from `min`. */
  step: number;
};

/** The number a kind of condition takes; null for a kind that takes none. */
export function conditionNumber(
  kind: Condition["kind"],
): ConditionNumber | null {
  const def: ConditionDef = CONDITIONS[kind];
  const { defaultValue, min, max, step } = def;
  if (
    defaultValue === undefined ||
    min === undefined ||
    max === undefined ||
    step === undefined
  )
    return null;
  return { defaultValue, min, max, step };
}

/** Decimal places a step has: 1 for 0.1, 0 for 1. */
function stepPlaces(step: number): number {
  return String(step).split(".")[1]?.length ?? 0;
}

/**
 * `value` on the nearest point of the step counted from the minimum, as the decimal with as many
 * places as the step has — 36.6, never 36.60000000000001. The range is not applied.
 */
export function onStep(value: number, number: ConditionNumber): number {
  const steps = Math.round((value - number.min) / number.step);
  // `+ 0` turns a -0 into 0.
  return (
    Number(
      (number.min + steps * number.step).toFixed(stepPlaces(number.step)),
    ) + 0
  );
}

/** What an item can be used for, as items.ts marks it. */
export type ItemUse = "fuel" | "food" | "lightable";

/**
 * The item a use takes its piece from: the first item of the data, in the data's order, that the
 * data marks for that use and of which the backpack holds a piece; null where there is none. The
 * simulation chooses the piece, never the program.
 */
export function itemFor(backpack: Backpack, use: ItemUse): ItemId | null {
  const ids = Object.keys(ITEMS) as ItemId[];
  return (
    ids.find((id) => backpack[id] > 0 && ITEMS[id][use] !== undefined) ?? null
  );
}

/** Whether the backpack holds `count` pieces of `item`. */
function holds(
  backpack: Backpack,
  need: { item: ItemId; count: number },
): boolean {
  return backpack[need.item] >= need.count;
}

/** The campfire on the character's tile, burning or not; a tile holds at most one. */
function campfireHere(run: RunView): Campfire | undefined {
  return run.campfires.find((campfire) =>
    sameHex(campfire.at, run.character.at),
  );
}

function revealedHere(run: RunView): boolean {
  return tileAt(run.tiles, run.character.at)?.revealed === true;
}

/** The stock of a resource on the character's tile; an unrevealed tile counts as empty. */
function stockHere(run: RunView, resource: ResourceId): number {
  const here = tileAt(run.tiles, run.character.at);
  if (!here || !here.revealed) return 0;
  return here.stock[resource] ?? 0;
}

/**
 * Minutes of burning left to the nearest campfire by game minutes of walking, the one on the
 * character's tile included; 0 where there is none or it is extinguished.
 */
function nearestCampfireMinutes(run: RunView): number {
  const target = campfireTarget(run);
  if (!target) return 0;
  const campfire = run.campfires.find((each) =>
    sameHex(each.at, target.tile.at),
  );
  return campfire?.minutesLeft ?? 0;
}

/**
 * The places of the gear that some item of the data fits, in the order of the places (D-459): the
 * targets of the condition „Puste — {miejsce}”, read from the items' rows at each call, so a place
 * gains its target when an item starts to fit it.
 */
export function fittedPlaces(): GearPlace[] {
  const fitted = new Set(Object.values(ITEMS).map((item) => item.fits));
  return (Object.keys(GEAR_PLACES) as GearPlace[]).filter((place) =>
    fitted.has(place),
  );
}

/**
 * Whether a place of the gear holds nothing (D-459): one of its slots is empty, so „Kieszeń” holds
 * while one of the three pockets is empty. A place no slot has is never empty; the program check
 * refuses such a place before it is ever read.
 */
function placeHasEmptySlot(gear: Gear, place: GearPlace): boolean {
  return (Object.keys(GEAR_SLOTS) as GearSlot[]).some(
    (slot) => GEAR_SLOTS[slot] === place && gear[slot] === null,
  );
}

/** Whether a condition of a program rule holds now. */
export function conditionHolds(
  run: RunView,
  condition: Condition,
  context?: ConditionContext,
): boolean {
  switch (condition.kind) {
    case "always":
      return true;
    case "emptyPlace":
      return placeHasEmptySlot(run.character.gear, condition.place);
    case "hereBelow":
      return stockHere(run, condition.resource) < condition.value;
    case "temperatureBelow":
      return run.body.temperature < condition.value;
    case "satietyBelow":
      return run.body.satiety < condition.value;
    case "natureEnergyBelow":
      return run.natureEnergy < condition.value;
    case "healthBelow":
      return (context?.health ?? run.body.health) < condition.value;
    case "opponentHealthBelow":
      return (
        context?.opponentHealth !== undefined &&
        context.opponentHealth < condition.value
      );
    case "itemBelow":
      return run.character.backpack[condition.item] < condition.value;
    case "campfireLeftBelow":
      return nearestCampfireMinutes(run) < condition.value;
    case "awayFromCampfire":
      return campfireHere(run) === undefined;
  }
}

/** The tile a walk to a resource heads for: the nearest revealed tile holding some of it. */
export function walkTarget(
  run: RunView,
  resource: ResourceId,
): { tile: Tile; minutes: number; next: Hex } | null {
  return nearestTile(
    walkingTiles(run),
    run.character.at,
    (tile) => tile.revealed && (tile.stock[resource] ?? 0) > 0,
  );
}

/**
 * The tile a walk to a campfire heads for: the nearest by minutes of walking holding a campfire,
 * burning or not. Every campfire of the map run is known: the character made each one.
 */
export function campfireTarget(
  run: RunView,
): { tile: Tile; minutes: number; next: Hex } | null {
  return nearestTile(walkingTiles(run), run.character.at, (tile) =>
    run.campfires.some((campfire) => sameHex(campfire.at, tile.at)),
  );
}

function walkingTiles(run: RunView): Tile[] {
  return run.tiles.map((tile) => ({
    ...tile,
    stepMinutes: actionMinutes(
      tile.stepMinutes,
      "walkTo",
      run.character.skills,
    ),
  }));
}

/** The name of an item as the game writes it, in lower case: read from the item's row. */
function itemName(item: ItemId): string {
  return ITEMS[item].name;
}

/** The name of a resource on a map as the game writes it, in lower case: read from its row. */
function resourceName(resource: ResourceId): string {
  return RESOURCES[resource].name;
}

/** „brakuje {how many} × {item}”: what the backpack lacks of the pieces `need` names. */
function lacking(backpack: Backpack, need: { item: ItemId; count: number }) {
  return `brakuje ${need.count - backpack[need.item]} × ${itemName(need.item)}`;
}

/** The first item of the data's order that the data marks for a use. */
function firstItemFor(use: ItemUse): ItemId {
  const ids = Object.keys(ITEMS) as ItemId[];
  return ids.find((id) => ITEMS[id][use] !== undefined)!;
}

/**
 * The slot „Załóż — {rzecz}” puts `item` into (D-458): the first empty slot of the item's place, so
 * the first empty pocket for an item of a pocket; where none is empty, the one slot of a place that
 * has only one, whatever it holds. Null where the place has several slots and every one is taken, and
 * where the item fits no place, which the program check never lets be a target.
 */
export function equipSlot(gear: Gear, item: ItemId): GearSlot | null {
  const slots = gearSlots().filter((slot) => fitsSlot(item, slot));
  return (
    slots.find((slot) => gear[slot] === null) ??
    (slots.length === 1 ? slots[0] : null)
  );
}

/**
 * Why „Załóż — {rzecz}” cannot put a piece of `item` on (D-380, D-458), in the player's words: null
 * where it can. A reason about the state of a slot stands before the lack in the backpack.
 */
function equipRefusal(
  character: Pick<RunCharacter, "gear" | "backpack">,
  item: ItemId,
): string | null {
  const slot = equipSlot(character.gear, item);
  if (slot === null) return "kieszenie pełne";
  if (character.gear[slot] === item) return `już założone: ${itemName(item)}`;
  return holds(character.backpack, { item, count: 1 })
    ? null
    : lacking(character.backpack, { item, count: 1 });
}

/**
 * The gear and the backpack after „Załóż — {rzecz}” puts one piece of `item` from the backpack into
 * its slot and the piece that slot held, if any, into the backpack (D-458), so the count of the
 * backpack never rises; null where it cannot, in the cases `equipRefusal` names. Inputs are not changed.
 */
export function equipped(
  character: Pick<RunCharacter, "gear" | "backpack">,
  item: ItemId,
): Pick<RunCharacter, "gear" | "backpack"> | null {
  const slot = equipSlot(character.gear, item);
  if (slot === null || equipRefusal(character, item) !== null) return null;
  const held = character.gear[slot];
  const backpack = { ...character.backpack };
  backpack[item] -= 1;
  if (held !== null) backpack[held] += 1;
  return { gear: { ...character.gear, [slot]: item }, backpack };
}

/**
 * Why an action cannot start now outside combat, in the words of the player: null where it can.
 * The first of these that holds is given: combat, then the world and the backpack, then the nature
 * energy a spell costs, then a branch the character did not buy. Never draws: the wander generator
 * is left as it is.
 */
export function actionRefusal(run: RunView, action: Action): string | null {
  const refusal = worldRefusal(run, action);
  if (refusal !== null) return refusal;
  const cost = natureEnergyCost(action);
  if (run.natureEnergy < cost)
    return `brak energii natury: ${Math.floor(run.natureEnergy)} z ${cost}`;
  if (!branchActionAvailable(run.character.skills, action.kind))
    return BRANCH_NOT_BOUGHT;
  return null;
}

/** The refusal of an action by combat, the world or the backpack; null where none of them refuses. */
function worldRefusal(run: RunView, action: Action): string | null {
  const backpack = run.character.backpack;
  switch (action.kind) {
    case "explore": {
      const here = tileAt(run.tiles, run.character.at);
      return here !== undefined && !here.revealed
        ? null
        : "kafelek już odkryty";
    }
    case "wander":
      return neighbours(run.tiles, run.character.at).length > 0
        ? null
        : "nie ma dokąd iść";
    case "walkTo": {
      const target = walkTarget(run, action.resource);
      if (target === null)
        return `nie znasz miejsca, gdzie leży ${resourceName(action.resource)}`;
      return target.minutes > 0
        ? null
        : `${resourceName(action.resource)} leży już tutaj`;
    }
    case "walkToCampfire": {
      const target = campfireTarget(run);
      if (target === null) return "nie ma ogniska";
      return target.minutes > 0 ? null : "już przy ognisku";
    }
    case "gather":
    case "patrol":
      if (stockHere(run, action.resource) <= 0)
        return `tu nie leży ${resourceName(action.resource)}`;
      return backpackCount(backpack) < backpackCap(run.character)
        ? null
        : "plecak pełny";
    case "craftCampfire":
      if (!revealedHere(run)) return "kafelek nieodkryty";
      if (campfireHere(run) !== undefined) return "tu już stoi ognisko";
      return holds(backpack, CAMPFIRE.craft)
        ? null
        : lacking(backpack, CAMPFIRE.craft);
    case "lightCampfire": {
      const campfire = campfireHere(run);
      if (campfire === undefined) return "tu nie stoi ognisko";
      if (campfire.minutesLeft > 0) return "ognisko już płonie";
      return holds(backpack, {
        item: CAMPFIRE.light.item,
        count: campfireLightCount(run.character.skills),
      })
        ? null
        : lacking(backpack, CAMPFIRE.light);
    }
    case "lightItem":
      if (!revealedHere(run)) return "kafelek nieodkryty";
      return itemFor(backpack, "lightable") !== null
        ? null
        : lacking(backpack, { item: firstItemFor("lightable"), count: 1 });
    case "feedCampfire":
      if ((campfireHere(run)?.minutesLeft ?? 0) <= 0)
        return "tu nie płonie ognisko";
      return itemFor(backpack, "fuel") !== null
        ? null
        : `brak opału: ${itemName(firstItemFor("fuel"))}`;
    case "eat":
      return itemFor(backpack, "food") !== null
        ? null
        : lacking(backpack, { item: firstItemFor("food"), count: 1 });
    case "craft": {
      const piece = ITEMS[action.item].recipe!.uses.find(
        (use) => !holds(backpack, use),
      );
      return piece === undefined ? null : lacking(backpack, piece);
    }
    case "tend":
      if (run.body.health >= BALANCE.body.startHealth) return "zdrowie pełne";
      return holds(backpack, { item: action.item, count: 1 })
        ? null
        : lacking(backpack, { item: action.item, count: 1 });
    case "equip":
      return equipRefusal(run.character, action.item);
    case "strikeWithStick":
    case "kick":
    case "dodge":
      return "tylko w walce";
  }
}

/**
 * Whether an action can start now. A spell needs at least the nature energy it costs, as the other
 * actions need their pieces. Never draws: the wander generator is left as it is.
 */
export function actionFeasible(run: RunView, action: Action): boolean {
  return actionRefusal(run, action) === null;
}

/**
 * Where a combat action that uses `item` takes its piece from (D-144, D-456, D-457): `held` where the
 * main hand holds the item, `refill` where the hand is empty and the backpack holds a piece of it,
 * which the action takes into the hand before it acts, in the same turn, and null where neither is so:
 * no other slot gives the piece.
 */
export function combatPiece(
  character: Pick<RunCharacter, "gear" | "backpack">,
  item: ItemId,
): "held" | "refill" | null {
  const held = character.gear[WIELDING_SLOT];
  if (held === item) return "held";
  if (held === null && character.backpack[item] > 0) return "refill";
  return null;
}

/** The item a combat action uses, from the actions' data; null for one that uses none. */
export function combatItem(kind: Action["kind"]): ItemId | null {
  const effect = (ACTIONS[kind] as ActionDef).combat;
  return effect && "item" in effect && effect.item ? effect.item : null;
}

/**
 * Why a rule's action cannot be carried out in combat: null where it can. Only a combat action can,
 * and one that uses an item needs a piece of it in the main hand or, where the hand is empty, in the
 * backpack (D-380).
 */
function combatRefusal(run: RunView, action: Action): string | null {
  if (!(ACTIONS[action.kind] as ActionDef).combat) return "trwa walka";
  const item = combatItem(action.kind);
  if (item !== null && combatPiece(run.character, item) === null)
    return `brakuje 1 × ${itemName(item)}`;
  return null;
}

/**
 * What the bar at a rule or a rule group says: `go` where its condition holds and it can start (of
 * a rule group, where one of its rules can), `blocked` where the condition holds and it cannot,
 * `unmet` where the condition does not hold.
 */
export type ConditionBar = "go" | "blocked" | "unmet";

/** What one rule shows: its bar and, where it is `blocked`, the reason in the player's words. */
export type RuleJudgement = { bar: ConditionBar; reason: string | null };

/** What the pick judged of a program, rule by rule and group by group. */
export type ProgramJudgement = {
  groups: Record<GroupId, ConditionBar>;
  rules: Record<RuleId, RuleJudgement>;
  /** The rule the pick takes: the first whose bar is `go`; null where none is. */
  winner: ProgramRule | null;
};

export type JudgeOptions = {
  /**
   * What the character can use and what the Understanding knows of it (`knownRepertoire`). The
   * repertoire is checked before the condition: a rule outside it is `blocked` with its reason, a
   * group whose condition lies outside it counts as one whose condition does not hold. Left out
   * where the program is already reduced to the repertoire.
   */
  reach?: { repertoire: Repertoire; known: Repertoire };
  /** The health of the side that picks and of its opponent: judges as a combat turn does. */
  combat?: ConditionContext;
  /** Stops after the winner: the rules and groups below it are not judged. */
  throughWinner?: boolean;
};

/** What one rule of a group that holds shows. */
function judgeRule(
  run: RunView,
  rule: ProgramRule,
  options: JudgeOptions,
): RuleJudgement {
  const { reach, combat } = options;
  if (reach) {
    const outside = outsideReason(reach.repertoire, reach.known, rule);
    if (outside !== null) return { bar: "blocked", reason: outside };
  }
  if (!conditionHolds(run, rule.condition, combat))
    return { bar: "unmet", reason: null };
  const reason = combat
    ? combatRefusal(run, rule.action)
    : actionRefusal(run, rule.action);
  return reason === null
    ? { bar: "go", reason: null }
    : { bar: "blocked", reason };
}

/**
 * Judges the rule groups of a program in order, each only while its condition holds, and the rules
 * of each in order: the one function the pick, the combat pick and what the program shows beside its
 * rules all come from. The winner is the first rule whose bar is `go`. A rule in a group whose
 * condition does not hold is `unmet` with no reason. Inputs are not changed.
 */
export function judgeProgram(
  run: RunView,
  program: Program,
  options: JudgeOptions = {},
): ProgramJudgement {
  const { reach, combat, throughWinner = false } = options;
  const groups: Record<GroupId, ConditionBar> = {};
  const rules: Record<RuleId, RuleJudgement> = {};
  let winner: ProgramRule | null = null;
  for (const group of program.groups) {
    if (throughWinner && winner !== null) break;
    const holds =
      (!reach || conditionInRepertoire(reach.repertoire, group.condition)) &&
      conditionHolds(run, group.condition, combat);
    if (!holds) {
      groups[group.id] = "unmet";
      for (const rule of group.rules)
        rules[rule.id] = { bar: "unmet", reason: null };
      continue;
    }
    let goes = false;
    for (const rule of group.rules) {
      if (throughWinner && winner !== null) break;
      const judged = judgeRule(run, rule, options);
      rules[rule.id] = judged;
      if (judged.bar !== "go") continue;
      goes = true;
      winner ??= rule;
    }
    groups[group.id] = goes ? "go" : "blocked";
  }
  return { groups, rules, winner };
}

/** The first feasible rule of the first qualifying group, both conditions holding; else a wait. */
export function chooseActivity(run: RunView, program: Program): Activity {
  const { winner } = judgeProgram(run, program, { throughWinner: true });
  return winner
    ? { kind: "rule", ruleId: winner.id, action: { ...winner.action } }
    : { kind: "wait" };
}

/** The first feasible combat rule at the actor's current health, or no action this exchange. */
export function chooseCombatRule(
  run: RunView,
  program: Program,
  health: number,
  opponentHealth: number,
): ProgramRule | null {
  const { winner } = judgeProgram(run, program, {
    combat: { health, opponentHealth },
    throughWinner: true,
  });
  return winner;
}
