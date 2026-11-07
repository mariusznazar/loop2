import { ITEMS } from "../sim/data/items.js";
import { MAPS } from "../sim/data/maps.js";
import { SKILLS, type SkillId } from "../sim/data/skills.js";
import { resurrectionReady } from "../sim/game.js";
import type {
  Character,
  Chest,
  EarningLoop,
  ItemId,
  MapId,
  Practice,
  SavedProgram,
} from "../sim/types.js";

/**
 * The sentence under a character's sending while a manual map run waits or has ended (To do 8,
 * question 3): why „Wejdź” and „Puść w pętlę” are inactive, the map's name from the data. Pure.
 */
export function runWaitingSentence(mapId: MapId): string {
  return `Przejście na mapie ${MAPS[mapId].name} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.`;
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

/** A character's resurrection line: its text, and whether it stands in `danger`. */
export type ResurrectionLine = {
  text: string;
  danger: boolean;
};

/**
 * The resurrection line of a character at the real moment `nowMs` (D-217): „Wskrzeszenie gotowe”
 * once ready, else a warning with the time left, „za {g} godz. {m} min czasu realnego” and below an
 * hour „za {m} min czasu realnego”. The time left is rounded up to whole minutes first, then divided
 * into hours and minutes, so the line never promises sooner than the real time. A clock set back
 * gives more time left. Pure.
 */
export function resurrectionLine(
  character: Character,
  nowMs: number,
): ResurrectionLine {
  if (resurrectionReady(character, nowMs))
    return { text: "Wskrzeszenie gotowe", danger: false };
  const minutes = Math.ceil(
    (character.resurrectionReadyAtMs - nowMs) / MS_PER_MINUTE,
  );
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const left =
    hours === 0
      ? `za ${minutes} min czasu realnego`
      : `za ${hours} godz. ${minutes % MINUTES_PER_HOUR} min czasu realnego`;
  return {
    text: `Wskrzeszenie ${left} — śmierć zabierze wprawę i wykupione stopnie`,
    danger: true,
  };
}

/** The line of a character in an earning loop (D-244): the map, the run, its minute, runs completed. Pure. */
export function loopLine(loop: EarningLoop): string {
  return `Pętla: ${MAPS[loop.run.mapId].name} · przejście ${loop.runNumber} · minuta ${loop.run.minute} · domknięte ${loop.completed}`;
}

/**
 * The line of a character whose earning loop was stopped (D-245): „Pętla zatrzymana” and, where the
 * loop gathered practice, „ · wprawa: {skill} +{n}, …” in the order of the skills' data. Pure.
 */
export function stoppedLoopLine(practice: Practice): string {
  const gains = (Object.keys(SKILLS) as SkillId[])
    .filter((id) => (practice[id] ?? 0) > 0)
    .map((id) => `${SKILLS[id].name} +${practice[id]}`);
  return gains.length
    ? `Pętla zatrzymana · wprawa: ${gains.join(", ")}`
    : "Pętla zatrzymana";
}
