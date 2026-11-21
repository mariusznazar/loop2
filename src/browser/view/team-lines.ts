import { BALANCE } from "../sim/data/balance.js";
import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { SKILLS, type SkillId } from "../sim/data/skills.js";
import { resurrectionAt } from "../sim/game.js";
import type {
  Chest,
  EarningLoop,
  ItemId,
  MapId,
  Practice,
  SavedProgram,
  Team,
} from "../sim/types.js";

/** The words of the sentence under a character's sending that lead back to the map run (D-287). */
const RUN_LINK_TEXT = "Wróć do niego i je zakończ, żeby wysłać postać.";

/**
 * The sentence under a character's sending while a manual map run waits or has ended (D-287): why
 * „Wejdź” and „Puść w pętlę” are inactive, the map's name from the data. It comes in two parts that
 * make the sentence, `lead` and then `link`, the part the screen makes a link to the screen of the
 * map run. Pure.
 */
export function runWaitingParts(mapId: MapId): { lead: string; link: string } {
  return {
    lead: `Przejście na mapie ${MAPS[mapId].name} jest niezakończone. `,
    link: RUN_LINK_TEXT,
  };
}

/**
 * What the chest shows: one line „{name}: {count}” for each item it holds some of, in the
 * order of the items' data; no line for an empty chest. Pure.
 */
export function chestLines(chest: Chest): string[] {
  return (Object.keys(ITEMS) as ItemId[]).flatMap((id) => {
    const count = chest.pieces[id] ?? 0;
    return count > 0 ? [`${ITEMS[id].name}: ${count}`] : [];
  });
}

/** One row's „Program:” list (D-170): the positions and the value shown. */
export type ProgramPositions = {
  options: (readonly [value: string, text: string])[];
  value: string;
};

/**
 * The positions of a row's program list, the names of `programs` in list order with the program's
 * number as the value, and the value of the program the row shows. Pure.
 */
export function programPositions(
  programs: readonly SavedProgram[],
  shown: SavedProgram,
): ProgramPositions {
  return {
    options: programs.map((saved) => [String(saved.id), saved.name]),
    value: String(shown.id),
  };
}

const MS_PER_MINUTE = 60_000;
const MINUTES_PER_HOUR = 60;

/** The label of a character's generation number: „pokolenie {n}” from 2 up, nothing at 1. Pure. */
export function generationLabel(generation: number): string | null {
  return generation >= 2 ? `pokolenie ${generation}` : null;
}

/** The resurrection line of the team: its text, and whether it stands in `danger`. */
export type ResurrectionLine = {
  text: string;
  danger: boolean;
};

/**
 * The resurrection line that stands at each character, from the team's one resurrection at the real
 * moment `nowMs` (D-217): „Wskrzeszenie drużyny: użycia {u} z {c}” with the count from the balance
 * data, and once a use is spent „, następne za {g} godz. {m} min czasu realnego” (below an hour
 * „, następne za {m} min czasu realnego”). At zero uses the line stands in `danger` and ends with the
 * warning about the practice and the bought ranks. The time left is rounded up to whole minutes
 * first, then divided into hours and minutes, so the line never promises sooner than the real time.
 * A clock set back gives more time left. Pure.
 */
export function resurrectionLine(team: Team, nowMs: number): ResurrectionLine {
  const { usesLeft, nextReturnMs } = resurrectionAt(team, nowMs);
  const stock = `Wskrzeszenie drużyny: użycia ${usesLeft} z ${BALANCE.resurrectionUses}`;
  if (nextReturnMs === null) return { text: stock, danger: false };
  const minutes = Math.ceil((nextReturnMs - nowMs) / MS_PER_MINUTE);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const next =
    hours === 0
      ? `następne za ${minutes} min czasu realnego`
      : `następne za ${hours} godz. ${minutes % MINUTES_PER_HOUR} min czasu realnego`;
  if (usesLeft > 0) return { text: `${stock}, ${next}`, danger: false };
  return {
    text: `${stock}, ${next} — śmierć zabierze wprawę i wykupione stopnie`,
    danger: true,
  };
}

/** The line of a character in an earning loop (D-244): the map, the run, its minute, runs completed. Pure. */
export function loopLine(loop: EarningLoop): string {
  return `Pętla: ${MAPS[loop.run.mapId].name} · przejście ${loop.runNumber} · minuta ${loop.run.minute} · domknięte ${loop.completed}`;
}

/**
 * The line of a character whose earning loop was stopped (D-245): „Pętla zatrzymana” and, where the
 * earning loop gathered practice, „ · wprawa: {skill} +{n}, …” in the order of the skills' data. Pure.
 */
export function stoppedLoopLine(practice: Practice): string {
  const gains = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${practice[id]}`);
  return gains.length
    ? `Pętla zatrzymana · wprawa: ${gains.join(", ")}`
    : "Pętla zatrzymana";
}
