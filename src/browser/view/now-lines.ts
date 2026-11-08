import { ACTIONS } from "../sim/data/actions.js";
import { CREATURES } from "../sim/data/creatures.js";
import type { NowAndNext, NowLine } from "../sim/game.js";
import type {
  Action,
  CreatureId,
  DeathCause,
  Program,
  RuleId,
} from "../sim/types.js";
import { actionSentence, ruleNumber } from "./program-editor.js";

/** The word that opens the row „Potem”. */
export const NEXT_LABEL = "Potem";

/** What „Teraz” says of a wait, and the chronicle at the start of one (D-334, D-340). */
export const WAIT_TEXT = "Czeka — żadna reguła nie pasuje";
const NO_WINNER_TEXT = "żadna reguła nie pasuje — postać stanie";
/** What „Teraz” says of a map run ended in death, by its cause (D-334). */
const DEATH_TEXTS: Record<DeathCause, string> = {
  cold: "Mag zamarzł",
  hunger: "Mag umarł z głodu",
  combat: "Mag zginął w walce",
};

/**
 * The words of a death by its cause, as „Teraz” says them after the death and the chronicle in the
 * entry of the death (D-334, D-344).
 */
export function deathText(cause: DeathCause): string {
  return DEATH_TEXTS[cause];
}
/** Between the parts at the right of a row. */
const SEPARATOR = " · ";

/**
 * What the row „Teraz” draws: the file name of an icon of `assets/icons/` or null for none, the text,
 * the role of the text's colour and the text at the right or null for none (D-334).
 */
export type NowRow = {
  icon: string | null;
  text: string;
  role: "text" | "positive";
  right: string | null;
};

/** What the row „Potem” draws after its label, as `NowRow` gives it (D-335). */
export type NextRow = {
  icon: string | null;
  text: string;
  role: "text" | "warning";
  right: string | null;
};

/** The parts of the two rows. */
export type NowRows = { now: NowRow; next: NextRow };

/** The creature's name in the case that follows „z”: „wilk” becomes „wilkiem”. */
function creatureAfterZ(id: CreatureId): string {
  const name = CREATURES[id].name;
  return name.endsWith("k") ? `${name.slice(0, -1)}kiem` : name;
}

/** „reguła 2.1” for the rule as the editor numbers it in the program, or null when the program lacks it. */
function ruleLabel(program: Program, ruleId: RuleId): string | null {
  for (const [groupIndex, group] of program.groups.entries()) {
    const ruleIndex = group.rules.findIndex((rule) => rule.id === ruleId);
    if (ruleIndex >= 0) return `reguła ${ruleNumber(groupIndex, ruleIndex)}`;
  }
  return null;
}

function joined(parts: (string | null)[]): string | null {
  const present = parts.filter((part): part is string => part !== null);
  return present.length === 0 ? null : present.join(SEPARATOR);
}

function iconOf(action: Action): string {
  return ACTIONS[action.kind].icon;
}

function nowRow(line: NowLine, program: Program): NowRow {
  switch (line.kind) {
    case "action":
      return {
        icon: iconOf(line.action),
        text: actionSentence(line.action),
        role: "text",
        right: joined([
          ruleLabel(program, line.ruleId),
          `zostało ${line.minutesLeft} z ${line.minutes} min`,
        ]),
      };
    case "wait":
      return { icon: null, text: WAIT_TEXT, role: "text", right: null };
    case "combat":
      return {
        icon: null,
        text: `Walczy z ${creatureAfterZ(line.creatureId)}`,
        role: "text",
        right: null,
      };
    case "death":
      return {
        icon: null,
        text: deathText(line.cause),
        role: "text",
        right: null,
      };
    case "completion":
      return { icon: null, text: line.text, role: "positive", right: null };
  }
}

/**
 * The parts of the rows „Teraz” and „Potem” for what `nowAndNext` names, with the program of the copy
 * of the map run, which numbers the rules as the editor does (D-334, D-335). Pure.
 */
export function nowRows(lines: NowAndNext, program: Program): NowRows {
  const next = lines.next;
  return {
    now: nowRow(lines.now, program),
    next:
      next.kind === "rule"
        ? {
            icon: iconOf(next.action),
            text: actionSentence(next.action),
            role: "text",
            right: ruleLabel(program, next.ruleId),
          }
        : { icon: null, text: NO_WINNER_TEXT, role: "warning", right: null },
  };
}
