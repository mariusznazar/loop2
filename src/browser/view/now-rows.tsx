/**
 * The rows „Teraz” and „Potem” under the scene of the screen of a map run in React (D-334, D-335,
 * D-291, D-292, D-311; task teraz-i-potem, To do 1): what the character does now and the rule that
 * wins now, in the words of a rule's row. It draws from the game state and from what `nowAndNext`
 * names, and only words and roles; a click on a row does nothing here. „Teraz” keeps one
 * height and cuts a longer text, so its change moves nothing below it. Nothing runs when the module
 * is imported.
 */
import type { CSSProperties } from "react";
import { nowAndNext } from "../sim/game.js";
import type { GameState } from "../sim/types.js";
import { NEXT_LABEL, nowRows, type NextRow, type NowRow } from "./now-lines.js";

/** The icon of an action, drawn as a mask in the colour of the text beside it (D-291). */
function ActionIcon({ icon }: { icon: string }) {
  return (
    <span
      className="action-icon"
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

/**
 * „Teraz” and then „Potem” as two sibling rows, for the world area to place under the scene. They
 * draw nothing while the state holds no map run.
 */
export function NowRows({ state }: { state: GameState }) {
  const run = state.run;
  const lines = nowAndNext(state);
  if (run === null || lines === null) return null;
  const rows = nowRows(lines, run.copy.program);
  return (
    <>
      <div className="now-row">
        <RowParts row={rows.now} />
      </div>
      <div className="next-row">
        <span className="next-label">{NEXT_LABEL}</span>
        <RowParts row={rows.next} />
      </div>
    </>
  );
}
