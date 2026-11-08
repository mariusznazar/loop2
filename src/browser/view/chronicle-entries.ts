/**
 * The composing of the entries of the chronicle (D-338 to D-345; task kronika-z-filtrami, To do 2–7):
 * from an event of the simulation or an act of the player on the copy to an entry's kind, game
 * minute, text and role, and the comparison of the copy's program before and after an act, with the
 * hint of a move the program editor gives. Pure: every text is composed once, from the result being
 * recorded, and nothing here keeps state or draws. Nothing runs when the module is imported.
 */
import { CAMPFIRE } from "../sim/data/campfire.js";
import { MAPS } from "../sim/data/maps.js";
import { sameData } from "../sim/programs.js";
import type { GameEvent, StreakLossCause } from "../sim/run.js";
import type {
  GameState,
  GroupId,
  Program,
  ProgramRule,
  RuleGroup,
  RuleId,
  Understanding,
} from "../sim/types.js";
import { discoveryBandText } from "./discovery-band-text.js";
import { deathText, WAIT_TEXT } from "./now-lines.js";
import { actionSentence, ruleNumber, ruleSentence } from "./program-editor.js";

/**
 * The kind of an entry, which decides both the filter that shows it and the role of its text:
 * „Czynności”, „Odkrycia”, „Walka”, „Moje zmiany”, „Passa” and „Świat” (D-343, D-344).
 */
export type ChronicleKind =
  "action" | "discovery" | "combat" | "change" | "streak" | "world";

/** The role of an entry's text (D-39, D-40, D-343, D-344). */
export type ChronicleRole =
  "text" | "discovery" | "player-change" | "danger" | "positive";

/** One entry of the chronicle: its kind, its game minute, its text and the role of its text. */
export type ChronicleEntry = {
  readonly kind: ChronicleKind;
  readonly minute: number;
  readonly text: string;
  readonly role: ChronicleRole;
};

/**
 * Which rule or rule group the player moved in an edit of the copy, as the program editor knows it
 * at „↑”, „↓” and a drop: a swap of two neighbours leaves the copies unable to tell which one moved.
 */
export type MoveHint =
  { kind: "rule"; ruleId: RuleId } | { kind: "group"; groupId: GroupId };

/**
 * What an act of the player on the copy was: an edit, with the hint of a move where the editor gives
 * one, a discard of the copy's changes, a save into the copy's program, a save as a new program, or
 * a switch of the character to another program.
 */
export type CopyAct =
  | { kind: "edit"; move: MoveHint | null }
  | { kind: "discard" }
  | { kind: "save" }
  | { kind: "saveAsNew" }
  | { kind: "switch" };

/** The cause of a loss of the streak in the words of its entry (D-341). */
const STREAK_CAUSES: Record<StreakLossCause, string> = {
  cold: "zdrowie spadło od zimna",
  hunger: "zdrowie spadło od głodu",
  coldAndHunger: "zdrowie spadło od zimna i głodu",
  programChanged: "zmiana programu",
  programSwitched: "przełączenie na inny program",
};

function capitalized(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** A rule's row as one sentence: „{condition} → {action}”. */
function sentence(rule: ProgramRule): string {
  const { condition, action } = ruleSentence(rule);
  return `${condition} → ${action}`;
}

/** Where a rule stands in a program: its group, the editor's number and the rule. */
type RulePlace = {
  groupId: GroupId;
  groupIndex: number;
  ruleIndex: number;
  number: string;
  rule: ProgramRule;
};

/** Where a group stands in a program: its index and the group. */
type GroupPlace = { index: number; group: RuleGroup };

function rulePlaces(program: Program): Map<RuleId, RulePlace> {
  const places = new Map<RuleId, RulePlace>();
  program.groups.forEach((group, groupIndex) =>
    group.rules.forEach((rule, ruleIndex) =>
      places.set(rule.id, {
        groupId: group.id,
        groupIndex,
        ruleIndex,
        number: ruleNumber(groupIndex, ruleIndex),
        rule,
      }),
    ),
  );
  return places;
}

function groupPlaces(program: Program): Map<GroupId, GroupPlace> {
  return new Map(
    program.groups.map((group, index) => [group.id, { index, group }]),
  );
}

/**
 * Of items listed in their order before an act, each with its position after it, those whose order
 * against the others changed: all but the largest set kept in the same order (a longest increasing
 * subsequence of the positions after). Where several such sets are as large, the one kept is the
 * first the search finds, so the choice is fixed for the same input.
 */
function reordered<Id>(items: { id: Id; after: number }[]): Set<Id> {
  const length = items.map(() => 1);
  const previous = items.map(() => -1);
  for (let i = 0; i < items.length; i += 1)
    for (let j = 0; j < i; j += 1)
      if (items[j].after < items[i].after && length[j] + 1 > length[i]) {
        length[i] = length[j] + 1;
        previous[i] = j;
      }
  let last = -1;
  for (let i = 0; i < items.length; i += 1)
    if (last === -1 || length[i] > length[last]) last = i;
  const kept = new Set<Id>();
  for (let i = last; i !== -1; i = previous[i]) kept.add(items[i].id);
  return new Set(
    items.filter((item) => !kept.has(item.id)).map((item) => item.id),
  );
}

/**
 * The groups the player moved: the one the hint names where its place changed, and those whose
 * order against the other groups found in both programs changed.
 */
function movedGroups(
  before: Map<GroupId, GroupPlace>,
  after: Map<GroupId, GroupPlace>,
  move: MoveHint | null,
): Set<GroupId> {
  const hinted =
    move?.kind === "group" &&
    before.has(move.groupId) &&
    after.has(move.groupId) &&
    before.get(move.groupId)!.index !== after.get(move.groupId)!.index
      ? move.groupId
      : null;
  const common = [...before.entries()]
    .filter(([id]) => after.has(id) && id !== hinted)
    .sort(([, a], [, b]) => a.index - b.index)
    .map(([id]) => ({ id, after: after.get(id)!.index }));
  const moved = reordered(common);
  if (hinted !== null) moved.add(hinted);
  return moved;
}

/**
 * The rules the player moved: the one the hint names where its group or number changed, those whose
 * group changed, and those whose order against the other rules of their group, found in the group
 * in both programs, changed — never a rule whose number shifted only because another rule or group
 * moved, came or went.
 */
function movedRules(
  before: Map<RuleId, RulePlace>,
  after: Map<RuleId, RulePlace>,
  move: MoveHint | null,
): Set<RuleId> {
  const moved = new Set<RuleId>();
  if (move?.kind === "rule") {
    const was = before.get(move.ruleId);
    const is = after.get(move.ruleId);
    if (was && is && (was.groupId !== is.groupId || was.number !== is.number))
      moved.add(move.ruleId);
  }
  const stayed = new Map<
    GroupId,
    { id: RuleId; at: number; after: number }[]
  >();
  for (const [id, was] of before) {
    const is = after.get(id);
    if (!is || moved.has(id)) continue;
    if (was.groupId !== is.groupId) {
      moved.add(id);
      continue;
    }
    const list = stayed.get(was.groupId) ?? [];
    list.push({ id, at: was.ruleIndex, after: is.ruleIndex });
    stayed.set(was.groupId, list);
  }
  for (const list of stayed.values()) {
    list.sort((a, b) => a.at - b.at);
    for (const id of reordered(list)) moved.add(id);
  }
  return moved;
}

/** The items of `places` in program order, by group index and then by index in the group. */
function inOrder(places: Map<RuleId, RulePlace>): [RuleId, RulePlace][] {
  return [...places.entries()].sort(
    ([, a], [, b]) => a.groupIndex - b.groupIndex || a.ruleIndex - b.ruleIndex,
  );
}

/**
 * The texts of the entries of an edit of the copy, comparing its program before the act with its
 * program after it, rules and groups matched by their identities (D-342; spec D4): a group removed,
 * added, renamed or given another condition, moved; then a rule removed from a group that stays,
 * added, changed in its condition or action, moved; then a changed trip plan. A rule's entry names
 * the editor's number and its row's sentence: before the act for a removed rule, after it
 * otherwise, and both numbers for a move. A group's entry names it, by its name before the act for
 * a removed group and after it otherwise; the rules of a removed group, and the numbers the rules of
 * a moved group took, give none. An edit after which the copy is the same gives nothing. The hint
 * names the rule or group the player moved, where the copies alone cannot tell it. Pure.
 */
export function copyChangeTexts(
  before: Program,
  after: Program,
  move: MoveHint | null,
): string[] {
  const groupsBefore = groupPlaces(before);
  const groupsAfter = groupPlaces(after);
  const rulesBefore = rulePlaces(before);
  const rulesAfter = rulePlaces(after);
  const texts: string[] = [];

  for (const group of before.groups)
    if (!groupsAfter.has(group.id))
      texts.push(`Usunięto grupę „${group.name}”`);
  for (const group of after.groups)
    if (!groupsBefore.has(group.id)) texts.push(`Dodano grupę „${group.name}”`);
  for (const group of after.groups) {
    const was = groupsBefore.get(group.id)?.group;
    if (
      was &&
      (was.name !== group.name || !sameData(was.condition, group.condition))
    )
      texts.push(`Zmieniono grupę „${group.name}”`);
  }
  const groupsMoved = movedGroups(groupsBefore, groupsAfter, move);
  for (const group of after.groups)
    if (groupsMoved.has(group.id))
      texts.push(`Przesunięto grupę „${group.name}”`);

  for (const [id, was] of inOrder(rulesBefore))
    if (!rulesAfter.has(id) && groupsAfter.has(was.groupId))
      texts.push(`Usunięto regułę ${was.number}: ${sentence(was.rule)}`);
  for (const [id, is] of inOrder(rulesAfter))
    if (!rulesBefore.has(id))
      texts.push(`Dodano regułę ${is.number}: ${sentence(is.rule)}`);
  for (const [id, is] of inOrder(rulesAfter)) {
    const was = rulesBefore.get(id);
    if (
      was &&
      (!sameData(was.rule.condition, is.rule.condition) ||
        !sameData(was.rule.action, is.rule.action))
    )
      texts.push(
        `Zmieniono regułę ${is.number}: ${sentence(was.rule)} → ${sentence(is.rule)}`,
      );
  }
  const rulesMoved = movedRules(rulesBefore, rulesAfter, move);
  for (const [id, is] of inOrder(rulesAfter))
    if (rulesMoved.has(id))
      texts.push(
        `Przesunięto regułę ${rulesBefore.get(id)!.number} na ${is.number}: ${sentence(is.rule)}`,
      );

  if (!sameData(before.tripPlan, after.tripPlan))
    texts.push("Zmieniono plan wyprawy");
  return texts;
}

/** The name of the program the copy of the state's map run belongs to, or had when it was deleted. */
function copyProgramName(state: GameState): string {
  const copy = state.run!.copy;
  return (
    state.programs.find((saved) => saved.id === copy.programId)?.name ??
    copy.deletedName ??
    ""
  );
}

/**
 * The entries of an act of the player on the copy, in the role `player-change`, at the game minute
 * of the map run after the act, which after its end is the minute of the end (D-342; spec D4, D5):
 * for an edit, one entry for each change `copyChangeTexts` finds; for a discard „Porzucono zmiany
 * kopii” alone; for a save, a save as a new program and a switch the sentence with the name of the
 * program the copy belongs to after the act. None without a map run. Pure.
 */
export function actEntries(
  act: CopyAct,
  before: GameState,
  after: GameState,
): ChronicleEntry[] {
  const run = after.run;
  if (!run) return [];
  let texts: string[];
  switch (act.kind) {
    case "edit":
      texts = before.run
        ? copyChangeTexts(before.run.copy.program, run.copy.program, act.move)
        : [];
      break;
    case "discard":
      texts = ["Porzucono zmiany kopii"];
      break;
    case "save":
      texts = [`Zapisano kopię w programie „${copyProgramName(after)}”`];
      break;
    case "saveAsNew":
      texts = [`Zapisano kopię jako nowy program „${copyProgramName(after)}”`];
      break;
    case "switch":
      texts = [`Przełączono postać na program „${copyProgramName(after)}”`];
      break;
  }
  return texts.map((text) => ({
    kind: "change",
    minute: run.minute,
    text,
    role: "player-change",
  }));
}

/** What a `discovered` event revealed, as the Understanding's shape holds it. */
function revealed(
  event: Extract<GameEvent, { kind: "discovered" }>,
): Understanding {
  return {
    trees: event.trees,
    actions: event.actions,
    conditions: event.conditions,
    items: event.items,
    creatures: event.creatures,
  };
}

/**
 * The entry one event of the simulation gives, as D3 of the spec tables it (D-340, D-341, D-344,
 * D-345): the start of a program rule's action in the words of its row, the start of a wait in the
 * words of „Teraz”, a discovery as the band's text for the state returned with it, a loss of the
 * streak, a campfire going out, a death in the words of „Teraz” and a completion in the map's text.
 * Null for every other event; an attack gives no entry here, since the chronicle places the
 * paragraph of the encounter itself (D-147), and whether a wait's start gives an entry is the
 * chronicle's to decide. `after` is the game state of the result the event came with. Pure.
 */
export function eventEntry(
  event: GameEvent,
  after: GameState,
): ChronicleEntry | null {
  switch (event.kind) {
    case "activityStarted":
      return {
        kind: "action",
        minute: event.minute,
        text:
          event.activity.kind === "rule"
            ? actionSentence(event.activity.action)
            : WAIT_TEXT,
        role: "text",
      };
    case "discovered":
      return {
        kind: "discovery",
        minute: event.minute,
        text: discoveryBandText({ ...after, discovery: revealed(event) }) ?? "",
        role: "discovery",
      };
    case "streakLost":
      return {
        kind: "streak",
        minute: event.minute,
        text: `Passa ${event.streak} przerwana: ${STREAK_CAUSES[event.cause]}`,
        role: "danger",
      };
    case "campfireExtinguished":
      return {
        kind: "world",
        minute: event.minute,
        text: `${capitalized(CAMPFIRE.name)} wygasło`,
        role: "text",
      };
    case "characterDied":
      return {
        kind: "world",
        minute: event.minute,
        text: deathText(event.cause),
        role: "text",
      };
    case "mapRunCompleted":
      return after.run
        ? {
            kind: "world",
            minute: event.minute,
            text: MAPS[after.run.mapId].completionText,
            role: "positive",
          }
        : null;
    default:
      return null;
  }
}
