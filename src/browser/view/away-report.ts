/**
 * The pure texts of the report on earning loops (D-246): the titles, the sentence of a full chest
 * and the lines of the report as the screen Siedziba draws them. The screen, `headquarters.tsx`,
 * draws them; nothing here touches the document. Nothing runs when the module is imported.
 */
import { BALANCE } from "../sim/data/balance.js";
import { ITEMS } from "../sim/data/items.js";
import { SKILLS, type SkillId } from "../sim/data/skills.js";
import { pieceCount } from "../sim/trip.js";
import type {
  AwayReportLine,
  Character,
  Chest,
  GameState,
  ItemId,
} from "../sim/types.js";

/** The title while the report holds a line of a return (D-246). */
export const AWAY_TITLE = "Gdy cię nie było";
/** The title while the report holds only loops that stopped in the open game (D-246). */
export const STOPPED_TITLE = "Pętle, które stanęły";
/** The sentence under the lines while the chest is full, in `warning`. */
export const CHEST_FULL_TEXT = "Skrzynka jest pełna.";

const DEATH_TEXT =
  "śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie.";
const MINUS = "−";

/** One line of the report as drawn: its text and whether it stands in `danger`. */
export type ReportEntry = { text: string; danger: boolean };

/**
 * The section's title: „Gdy cię nie było” while some line is open or stopped in a catch-up, else
 * „Pętle, które stanęły”, since only stops in the open game stand there (D-246). Pure.
 */
export function reportTitle(report: readonly AwayReportLine[]): string {
  const returned = report.some((line) => line.stop === null || line.stop.away);
  return returned ? AWAY_TITLE : STOPPED_TITLE;
}

/** „{name} +{n}” or „{name} −{n}” for a signed change. */
function signed(name: string, amount: number): string {
  return amount > 0 ? `${name} +${amount}` : `${name} ${MINUS}${-amount}`;
}

/** The text of a line that stopped: with „po {m} min” only where it stopped in a catch-up. */
function stoppedText(
  name: string,
  line: AwayReportLine,
  generation: number,
): string {
  const after = line.stop?.away ? ` po ${line.minutes} min` : "";
  return `${name}: pętla stanęła${after} — ${DEATH_TEXT} Teraz to pokolenie ${generation}.`;
}

/** The text of a line that went on: minutes, chest, practice, as data orders them, empty parts out. */
function goingText(name: string, line: AwayReportLine): string {
  const chest = (Object.keys(ITEMS) as ItemId[])
    .filter((id) => (line.chest[id] ?? 0) !== 0)
    .map((id) => signed(ITEMS[id].name, line.chest[id]!));
  const practice = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (line.practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${line.practice[id]}`);
  const parts = [`${line.minutes} min`];
  if (chest.length > 0) parts.push(`skrzynka: ${chest.join(", ")}`);
  if (practice.length > 0) parts.push(`wprawa: ${practice.join(", ")}`);
  if (line.resurrectionUsed) parts.push("wskrzeszenie zużyte");
  return `${name}: ${parts.join(" · ")}`;
}

/**
 * The lines of the report as drawn: the loops that stopped first, in `danger`, then the others, in
 * `text`, each group in the team's order, a character's lines in the order of the report. Names
 * come from the team and the data. Pure.
 */
export function reportEntries(
  state: Pick<GameState, "awayReport" | "team">,
): ReportEntry[] {
  const characters = state.team.characters;
  const placed = state.awayReport.flatMap((line, index) => {
    const at = characters.findIndex(({ id }) => id === line.characterId);
    return at < 0 ? [] : [{ line, index, at, character: characters[at] }];
  });
  const entry = (line: AwayReportLine, character: Character): ReportEntry =>
    line.stop === null
      ? { text: goingText(character.name, line), danger: false }
      : {
          text: stoppedText(character.name, line, line.stop.generation),
          danger: true,
        };
  const byTeam = (
    left: { at: number; index: number },
    right: { at: number; index: number },
  ): number => left.at - right.at || left.index - right.index;
  const stopped = placed.filter(({ line }) => line.stop !== null).sort(byTeam);
  const others = placed.filter(({ line }) => line.stop === null).sort(byTeam);
  return [...stopped, ...others].map(({ line, character }) =>
    entry(line, character),
  );
}

/** Whether the chest holds as many pieces as it can; read at drawing, never stored. Pure. */
export function reportChestFull(chest: Chest): boolean {
  return pieceCount(chest.pieces) >= BALANCE.chestCapacity;
}
