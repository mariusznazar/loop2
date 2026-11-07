/**
 * The question „Zapisać, odrzucić, wrócić?” in React (D-173, D-172, D-122, D-44, D-39; task
 * pytanie-przy-zakoncz, To do 1): the band the program panel of the screen of a map run draws just
 * above the heading of the copy, under the band of a discovery, while the player's „Zakończ” waits
 * for an answer: the sentence in the role `warning`, the three answers „Zapisz”, „Odrzuć” and „Wróć” in that order, and, where the
 * program the copy belongs to holds changes the copy lacks, the line of D-172 under the sentence.
 * It is a component with no boundary of its own: the program panel of the screen of a map run
 * renders it just above the heading of the copy, from the game state it was given, and answers its
 * three callbacks, which the game view carries out. It builds no element after a DOM module's
 * pattern (D-265). Nothing runs when the module is imported.
 */
import { programById, programHasChangesCopyLacks } from "../sim/programs.js";
import type { GameState } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";

/**
 * The line beside the save buttons of the copy, and under the question of „Zakończ”, when the
 * program `name` the copy belongs to holds changes the copy lacks (D-172, task pytanie-przy-zakoncz).
 */
export function copyLacksSentence(name: string): string {
  return `Program ${name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.`;
}

/** What the three answers of the question ask for; the game view turns each into its act. */
export type EndQuestionControls = {
  /** „Zapisz”: the copy is saved, in its program or as a new one, and the map run ends. */
  saveAndEnd(): void;
  /** „Odrzuć”: the map run ends and the copy's unsaved changes go with it. */
  discardAndEnd(): void;
  /** „Wróć”: the question closes and the map run stays as it was before „Zakończ”. */
  back(): void;
};

/** What the panel gives the question; every render gives it whole. */
export type EndQuestionProps = {
  /** The game state the question draws; it draws no line of D-172 without a map run. */
  state: GameState;
  controls: EndQuestionControls;
};

/**
 * The question: the sentence, then „Zapisz”, „Odrzuć” — a destructive button, since it loses the
 * copy's changes (D-44) — and „Wróć”; under the sentence the line of D-172 where the copy's program
 * is on the list and holds changes the copy lacks, the same line the save buttons of the panel carry.
 */
export function EndQuestion({ state, controls }: EndQuestionProps) {
  const run = state.run;
  const owner =
    run === null ? undefined : programById(state.programs, run.copy.programId);
  return (
    <div className="end-question">
      <div className="end-question-row">
        <p className="end-question-text">Zapisać, odrzucić, wrócić?</p>
        <ReactButton text="Zapisz" onClick={() => controls.saveAndEnd()} />
        <ReactButton
          text="Odrzuć"
          kind="destructive"
          onClick={() => controls.discardAndEnd()}
        />
        <ReactButton text="Wróć" onClick={() => controls.back()} />
      </div>
      {owner !== undefined && programHasChangesCopyLacks(state) ? (
        <p className="end-question-note">{copyLacksSentence(owner.name)}</p>
      ) : null}
    </div>
  );
}
