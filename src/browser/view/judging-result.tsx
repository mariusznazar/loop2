/**
 * What the screen Mapy draws of the judging of a program at a character in „Kto idzie” (D-329, D-440):
 * the result that unfolds under the character and the mark beside the list „Program:”. Both read their
 * words from `judging-lines.ts`; the screen keeps what stands and for how long. Nothing here runs when
 * the module is imported.
 */
import type { JudgingMark } from "../sim/judging-record.js";
import type { Judging } from "../sim/types.js";
import {
  JUDGING_COSTS_NOTHING,
  judgingHeading,
  markLine,
  seedLines,
} from "./judging-lines.js";

/** The role of a row by the kind of its result (the styleguide's rule „The screen Mapy”). */
const ROW_ROLE = {
  solved: "positive",
  death: "danger",
  undecided: "warning",
} as const;

/** The result of a judging: the heading, a row for each seed and the sentence that it costs nothing (D-329). */
export function JudgingResult({ judging }: { judging: Judging }) {
  return (
    <div className="judging-result">
      <p className="judging-heading">{judgingHeading(judging)}</p>
      <ul className="judging-rows">
        {seedLines(judging).map((line) => (
          <li key={line.text} className={`judging-row ${ROW_ROLE[line.kind]}`}>
            {line.text}
          </li>
        ))}
      </ul>
      <p className="judging-note">{JUDGING_COSTS_NOTHING}</p>
    </div>
  );
}

/** The judging remembered for the program the list shows: the badge or the count, and the note on the stock (D-440). */
export function JudgingMarkLine({ mark }: { mark: JudgingMark }) {
  const line = markLine(mark);
  return (
    <>
      <span
        className={
          line.role === "positive" ? "maps-who-mark positive" : "maps-who-mark"
        }
      >
        {line.text}
      </span>
      {line.note === null ? null : (
        <span className="maps-who-mark-note warning">{line.note}</span>
      )}
    </>
  );
}
