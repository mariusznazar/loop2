/**
 * The pure texts of the report on earning loops (D-246): the lines of a character's card, the sentence
 * that counts the earning loops above „Drużyna” and the sentence of a full chest, as the screen
 * Siedziba draws them. The screen, `headquarters.tsx`, and its cards, `team-cards.tsx`, draw them;
 * nothing here touches the document. Nothing runs when the module is imported.
 */
import { BALANCE } from "../sim/data/balance.js";
import { ITEMS } from "../sim/data/items.js";
import { SKILLS, type SkillId } from "../sim/data/skills.js";
import { waitingPractice } from "../sim/loop.js";
import { pieceCount } from "../sim/trip.js";
import { countedName } from "./counted-name.js";
import type {
  AwayReportLine,
  CharacterId,
  Chest,
  GameState,
  ItemId,
  Practice,
} from "../sim/types.js";

/** The sentence beside the counting sentence while the chest is full, in `warning`. */
export const CHEST_FULL_TEXT = "Skrzynka jest pełna.";

const DEATH_TEXT =
  "śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie.";
const MINUS = "−";

/**
 * One line of the report as drawn in the card of its character: its text, whether it stands in
 * `danger`, and, where practice waits at the earning loop of its character, that character, whose
 * „Odbierz” stands beside it (D-246).
 */
export type ReportEntry = {
  text: string;
  danger: boolean;
  takeFor: CharacterId | null;
};

/** The sentence above „Drużyna” that counts the lines of the report, and whether it stands in `danger`. */
export type ReportSummary = {
  text: string;
  danger: boolean;
};

/** „{name} +{n}” or „{name} −{n}” for a signed change. */
function signed(name: string, amount: number): string {
  return amount > 0 ? `${name} +${amount}` : `${name} ${MINUS}${-amount}`;
}

/**
 * The loop record at the end of a line that went on (D-246): „ · najdłużej bez śmierci: {n}
 * przejść z rzędu” as plain text, empty where the record is zero.
 */
function recordText(loopRecord: number): string {
  if (loopRecord === 0) return "";
  const noun = countedName(loopRecord, {
    one: "przejście",
    few: "przejścia",
    many: "przejść",
  });
  return ` · najdłużej bez śmierci: ${loopRecord} ${noun} z rzędu`;
}

/** The text of a line that stopped: with „po {m} min” only where it stopped in a catch-up. */
function stoppedText(line: AwayReportLine, generation: number): string {
  const after = line.stop?.away ? ` po ${line.minutes} min` : "";
  return `pętla stanęła${after} — ${DEATH_TEXT} Teraz to pokolenie ${generation}.`;
}

/**
 * The text of a line that went on: minutes, chest, the practice waiting, as data orders them, empty
 * parts out, and the loop record of the earning loop last. The minutes and the chest are those of
 * the return, the practice and the loop record are those of now.
 */
function goingText(
  line: AwayReportLine,
  waiting: Practice,
  loopRecord: number,
): string {
  const chest = (Object.keys(ITEMS) as ItemId[])
    .filter((id) => (line.chest[id] ?? 0) !== 0)
    .map((id) => signed(ITEMS[id].name, line.chest[id]!));
  const practice = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (waiting[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${waiting[id]}`);
  const parts = [`${line.minutes} min`];
  if (chest.length > 0) parts.push(`skrzynka: ${chest.join(", ")}`);
  if (practice.length > 0)
    parts.push(`wprawa do odebrania: ${practice.join(", ")}`);
  if (line.resurrectionUsed) parts.push("wskrzeszenie zużyte");
  return `${parts.join(" · ")}${recordText(loopRecord)}`;
}

/**
 * The lines of the report in the card of the character `characterId`, with no name before them, since
 * they stand in that character's card: the lines of its earning loops a death stopped first, in
 * `danger`, then a later line, in `text`, each group in the order of the report. The practice of a
 * line that went on is read from the earning loop of the character as it stands now, and `takeFor`
 * names the character where some waits; its loop record, at the end of the line, is read from that
 * earning loop too and stands nowhere where it is zero. Pure.
 */
export function reportLinesOf(
  state: Pick<GameState, "awayReport" | "loops">,
  characterId: CharacterId,
): ReportEntry[] {
  const own = state.awayReport.filter(
    (line) => line.characterId === characterId,
  );
  const loop = Object.hasOwn(state.loops, characterId)
    ? state.loops[characterId]
    : undefined;
  const entry = (line: AwayReportLine): ReportEntry => {
    if (line.stop !== null)
      return {
        text: stoppedText(line, line.stop.generation),
        danger: true,
        takeFor: null,
      };
    const waiting = loop === undefined ? {} : waitingPractice(loop);
    return {
      text: goingText(line, waiting, loop === undefined ? 0 : loop.loopRecord),
      danger: false,
      takeFor: Object.keys(waiting).length > 0 ? characterId : null,
    };
  };
  return [
    ...own.filter((line) => line.stop !== null),
    ...own.filter((line) => line.stop === null),
  ].map(entry);
}

/**
 * The sentence above „Drużyna” that counts the lines of the report standing in the cards of the team
 * (D-246): a line of an earning loop a death stopped is a loop that stopped, every other line a loop
 * that went on; each count declined, a part of zero left out, „Bez ciebie” before it only where every
 * line is one of a return — a line that went on or one stopped in a catch-up — and the sentence in
 * `danger` where a loop stopped. Null where no line stands. Pure.
 */
export function reportSummary(
  state: Pick<GameState, "awayReport" | "team">,
): ReportSummary | null {
  const lines = state.awayReport.filter((line) =>
    state.team.characters.some(({ id }) => id === line.characterId),
  );
  if (lines.length === 0) return null;
  const stopped = lines.filter((line) => line.stop !== null).length;
  const went = lines.length - stopped;
  const parts: string[] = [];
  if (stopped > 0)
    parts.push(
      `${stopped} ${countedName(stopped, {
        one: "pętla stanęła",
        few: "pętle stanęły",
        many: "pętli stanęło",
      })}`,
    );
  if (went > 0) {
    const verb =
      stopped > 0
        ? countedName(went, {
            one: "chodziła",
            few: "chodziły",
            many: "chodziło",
          })
        : countedName(went, {
            one: "pętla chodziła",
            few: "pętle chodziły",
            many: "pętli chodziło",
          });
    parts.push(`${went} ${verb} bez przeszkód`);
  }
  const returned = lines.every((line) => line.stop === null || line.stop.away);
  return {
    text: `${returned ? "Bez ciebie " : ""}${parts.join(", ")}.`,
    danger: stopped > 0,
  };
}

/** Whether the chest holds as many pieces as it can; read at drawing, never stored. Pure. */
export function reportChestFull(chest: Chest): boolean {
  return pieceCount(chest.pieces) >= BALANCE.chestCapacity;
}
