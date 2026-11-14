/**
 * The texts of the pull of the previous save on the screen Programy (D-395): the sentence that
 * stands next to „Wciągnij programy z poprzedniego zapisu” after each pull and the one of a failed
 * check. Pure: each function reads its arguments and draws nothing, and nothing runs when the
 * module is imported. A result is in `text` and a failure in `warning`, never in `positive` or
 * `danger` (D-39, D-40); the names of skipped programs come from the document and are plain text.
 */
import type {
  PreviousItem,
  PreviousPrograms,
} from "../sim/previous-programs.js";

/** A line next to the control and the role of its text. */
export type PullLine = { role: "text" | "warning"; text: string };

/** The sentence of the question that could not be answered when the screen was shown. */
export const CHECK_FAILED: PullLine = {
  role: "warning",
  text: "Nie udało się sprawdzić poprzedniego zapisu.",
};

/** The sentence of a pull whose fetch failed; the control stays for a retry. */
export const FETCH_FAILED: PullLine = {
  role: "warning",
  text: "Nie udało się pobrać poprzedniego zapisu. Spróbuj ponownie.",
};

/** The sentence of a pull that finds the previous save gone. */
export const NO_PREVIOUS_SAVE: PullLine = {
  role: "text",
  text: "Nie ma już poprzedniego zapisu.",
};

/** The sentence of a 403: the server says the account no longer holds the privilege (D-394). */
export const NOT_ALLOWED: PullLine = {
  role: "warning",
  text: "To konto nie ma już uprawnienia do poprzedniego zapisu.",
};

/** The sentence of a document that is unreadable or gives no program at all. */
const NOTHING_READABLE: PullLine = {
  role: "text",
  text: "Poprzedni zapis nie zawiera programów, które ta wersja gry potrafi wczytać.",
};

/** „program”, „programy” or „programów” for `count`, as Polish counts them. */
export function programsWord(count: number): string {
  if (count === 1) return "program";
  const last = count % 10;
  const teen = count % 100 >= 12 && count % 100 <= 14;
  return last >= 2 && last <= 4 && !teen ? "programy" : "programów";
}

/** A skipped program by the name the reader gave it, or by its place where it had no name. */
function skippedName(item: Extract<PreviousItem, { kind: "skipped" }>): string {
  return "name" in item
    ? `„${item.name}”`
    : `bez nazwy (pozycja ${item.place})`;
}

/**
 * What the player is told after a pull, from what the reader gave: how many programs were appended
 * where any were, one sentence naming every skipped program where any were, and where neither
 * stands — the document unreadable, or no program in it — that the previous save holds no program
 * this version of the game can read.
 */
export function pullResultLine(read: PreviousPrograms): PullLine {
  if (!read.ok) return NOTHING_READABLE;
  const appended = read.items.filter((item) => item.kind === "read").length;
  const skipped = read.items.filter((item) => item.kind === "skipped");
  const parts: string[] = [];
  if (appended > 0)
    parts.push(`Wciągnięto ${appended} ${programsWord(appended)}.`);
  if (skipped.length > 0) {
    const names = skipped.map(skippedName).join(", ");
    parts.push(
      skipped.length === 1
        ? `Pominięto program, którego ta wersja gry nie przyjmuje: ${names}.`
        : `Pominięto programy, których ta wersja gry nie przyjmuje: ${names}.`,
    );
  }
  return parts.length === 0
    ? NOTHING_READABLE
    : { role: "text", text: parts.join(" ") };
}
