/**
 * The rows „Teraz” and „Potem” under the scene of the screen of a map run in React (D-334, D-335,
 * D-291, D-292, D-311; task teraz-i-potem, To do 1): what the character does now and the rule that
 * wins now, in the words of a rule's row. It draws from the game state and from what `nowAndNext`
 * names, and only words and roles. A row that names a rule of the copy is a control, built as the
 * rows of the rule list are: a click, Enter or Space on it asks, through `onShowRule`, to show the
 * rule (D-336); a row that names none is text. „Teraz” keeps one height and cuts a longer text, so
 * its change moves nothing below it. Nothing runs when the module is imported.
 */
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { nowAndNext } from "../sim/game.js";
import type { GameState, Program, RuleId } from "../sim/types.js";
import { NEXT_LABEL, nowRows, type NextRow, type NowRow } from "./now-lines.js";

/** The icon of an action, drawn as a mask in the colour of the text beside it (D-291). */
function ActionIcon({ icon }: { icon: string }) {
  return (
    <span
      className="icon-mask"
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${icon}.svg")` } as CSSProperties}
    />
  );
}

/** The icon where there is one, the text in its role, and the text at the right where there is one. */
function RowParts({ row }: { row: NowRow | NextRow }) {
  return (
    <>
      <span className="now-main">
        {row.icon === null ? null : <ActionIcon icon={row.icon} />}
        <span
          className={row.role === "text" ? "now-text" : `now-text ${row.role}`}
        >
          {row.text}
        </span>
      </span>
      {row.right === null ? null : (
        <span className="now-right">{row.right}</span>
      )}
    </>
  );
}

/** Whether the program holds a rule of this number: a row names a rule only while the copy has it. */
function holdsRule(program: Program, ruleId: RuleId): boolean {
  return program.groups.some((group) =>
    group.rules.some((rule) => rule.id === ruleId),
  );
}

/**
 * A row of the class `className`. Where it names a rule of the copy it is a control, built as the
 * rows of the rule list are: a tab stop, a click, and Enter or Space; where it names none it is
 * text, which the keyboard does not reach and a click on which asks for nothing (D-336). The
 * stylesheet gives the look of a control under the pointer to the row that has a tab stop.
 */
function RuleRow({
  className,
  program,
  ruleId,
  onShowRule,
  children,
}: {
  className: string;
  program: Program;
  ruleId: RuleId | null;
  onShowRule: (ruleId: RuleId) => void;
  children: ReactNode;
}) {
  if (ruleId === null || !holdsRule(program, ruleId))
    return <div className={className}>{children}</div>;
  return (
    <div
      className={className}
      tabIndex={0}
      onClick={() => onShowRule(ruleId)}
      onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        // Space would otherwise scroll the page as well.
        event.preventDefault();
        onShowRule(ruleId);
      }}
    >
      {children}
    </div>
  );
}

/**
 * „Teraz” and then „Potem” as two sibling rows, for the world area to place under the scene. They
 * draw nothing while the state holds no map run.
 */
export function NowRows({
  state,
  onShowRule,
}: {
  state: GameState;
  /** Called with the number of the rule a row names, when the player clicks the row or presses Enter or Space on it. */
  onShowRule: (ruleId: RuleId) => void;
}) {
  const run = state.run;
  const lines = nowAndNext(state);
  if (run === null || lines === null) return null;
  const program = run.copy.program;
  const rows = nowRows(lines, program);
  return (
    <>
      <RuleRow
        className="now-row"
        program={program}
        ruleId={lines.now.kind === "action" ? lines.now.ruleId : null}
        onShowRule={onShowRule}
      >
        <RowParts row={rows.now} />
      </RuleRow>
      <RuleRow
        className="next-row"
        program={program}
        ruleId={lines.next.kind === "rule" ? lines.next.ruleId : null}
        onShowRule={onShowRule}
      >
        <span className="next-label">{NEXT_LABEL}</span>
        <RowParts row={rows.next} />
      </RuleRow>
    </>
  );
}
