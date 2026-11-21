/**
 * The texts of the judging of a program in „Kto idzie” (D-329, D-439, D-440): the button and its waiting
 * text, the heading and the twelve rows of a result, the sentence under it, and the mark beside the list
 * „Program:”. Pure; nothing runs when the module is imported. The number of seeds and the cap of game
 * minutes come from the game's data (D-18), the words of a death from the one place that names the causes.
 */
import { BALANCE } from "../sim/data/balance.js";
import type { JudgingMark } from "../sim/judging-record.js";
import type { DeathCause, Judging, SeedResult } from "../sim/types.js";
import { countedName } from "./counted-name.js";
import { deathText } from "./now-lines.js";

/** One of the rows under the heading of a result: the kind of the result and the words of the row. */
export type SeedLine = { kind: SeedResult["kind"]; text: string };

/** How the mark beside the list „Program:” reads: its words, their role, and the note on the stock or null. */
export type MarkLine = {
  text: string;
  role: "positive" | "text";
  note: string | null;
};

/** The seeds of a judging, the number a result and a mark count against. */
function seedCount(): number {
  return BALANCE.judgingSeeds.length;
}

/** The button of a judging at a character (D-329). */
export const JUDGE_BUTTON_TEXT = `Oceń na ${seedCount()} ziarnach`;

/** What the button reads from its click to the result (D-329). */
export const JUDGING_WAITING_TEXT = "Oceniam…";

/** The sentence under the rows of a result (D-329, D-439). */
export const JUDGING_COSTS_NOTHING =
  "Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.";

/** The note beside a mark where the chest holds less of an item than the judging took (D-440). */
const STOCK_SHORT_NOTE = "oceniono z zapasem, którego dziś nie ma w skrzynce";

/** The heading of a result: the seeds solved of all, a seed left undecided or ended in a death not among them. */
export function judgingHeading(judging: Judging): string {
  const solved = judging.results.filter(
    (result) => result.kind === "solved",
  ).length;
  return `Ocena na ${seedCount()} ziarnach: ${solved} z ${seedCount()} rozwiązanych`;
}

/** The cause of a death in the words of a row: „mag zamarzł”, the first letter lower. */
function deathWords(cause: DeathCause): string {
  const words = deathText(cause);
  return `${words.charAt(0).toLowerCase()}${words.slice(1)}`;
}

/** The words of one row after „Ziarno {i}: ”. */
function rowWords(result: SeedResult): string {
  switch (result.kind) {
    case "solved":
      return "rozwiązane";
    case "death":
      return `${deathWords(result.cause)} w ${result.minute}. minucie`;
    case "undecided": {
      const cap = BALANCE.judgingCapMinutes;
      const minutes = countedName(cap, {
        one: "minucie",
        few: "minutach",
        many: "minutach",
      });
      return `bez rozstrzygnięcia po ${cap} ${minutes}`;
    }
  }
}

/** The rows of a result, one per seed in the order of the results, numbered from 1. */
export function seedLines(judging: Judging): SeedLine[] {
  return judging.results.map((result, index) => ({
    kind: result.kind,
    text: `Ziarno ${index + 1}: ${rowWords(result)}`,
  }));
}

/**
 * The mark beside the list „Program:” (D-440): the badge in `positive` where all seeds are solved and the
 * chest holds what the judging took, otherwise the count in `text`, with the note where the chest holds less.
 */
export function markLine(mark: JudgingMark): MarkLine {
  return {
    text: mark.badge
      ? `szczelny: ${mark.solved} z ${seedCount()}`
      : `${mark.solved} z ${seedCount()}`,
    role: mark.badge ? "positive" : "text",
    note: mark.stockShort ? STOCK_SHORT_NOTE : null,
  };
}
