/**
 * The shared button, a React component (D-44, D-265). The classes and attributes it draws are what
 * `styles.css` reads, so the stylesheet stays the one place of the look;
 * `tests/view/shared-controls.test.mjs` holds each kind and state of the button. Nothing here runs
 * when the module is imported.
 */
import type { CSSProperties, MouseEventHandler, ReactNode, Ref } from "react";

/**
 * „destructive” — its text in `danger` at rest, in every layout, and the background `highlight` under the pointer;
 * „secondary” — the secondary action; „tab” — a button of a group drawn as a tab; „main” — the main
 * look of a button that sends no form, which stays of the type `button` (D-274); „positive” — the
 * plain button with its text in `positive`, the look of „Odbierz”; „value-cell” — the button of a
 * cell of the body row, which carries a `cell` where the others carry a `text`; „tile” — the square
 * button of a slot of the gear, which carries a `tile` where the others carry a `text` (D-44, D-461);
 * „dashed” — the dashed button with its text in the middle, the closed „+ postać” of Siedziba (D-44).
 */
export type ReactButtonKind =
  | "destructive"
  | "secondary"
  | "tab"
  | "main"
  | "positive"
  | "value-cell"
  | "tile"
  | "dashed";

/**
 * The role of the colour of a fill of a bar, which the stylesheet reads as the class of the fill:
 * health in `positive`, satiety in its own role and nature energy in `text-strong` (D-39, D-40).
 */
export type CellFillRole = "positive" | "satiety-fill" | "text-strong";

/**
 * The bar of a cell: the fill, which the screen gives as the share of the track it covers, from 0
 * to 1, and the role of its colour; or, for a value that stands on a scale of its own, that scale
 * as the screen draws it, in place of the track and fill.
 */
export type CellBar =
  { share: number; fillRole: CellFillRole } | { scale: ReactNode };

/**
 * What a screen gives a cell of the body row: the name of the value and its number, already
 * written as the screen shows them, the bar, and the note under the bar, or null where the value
 * has none. `marks` are states of the value that the screen names, such as an alarm or a frame, each
 * set as a class beside the cell's own, for the stylesheet of the screen to read; the control gives
 * them no look and knows no screen (D-395).
 */
export type CellParts = {
  name: string;
  number: string;
  bar: CellBar;
  note: string | null;
  marks?: readonly string[];
};

/**
 * The parts of a cell of the body row, in the order D-337 gives: the name at the left and the number
 * at the right on one line, the bar under them and the note under the bar. The button of a cell draws
 * them, and so does the cell that is no button, health, so that the four cells stand alike
 * (`styles.css`). A space stands between the name and the number and before the note, so that the
 * text of the cell, which is the button's name for a reader of the screen, reads them apart; in the
 * flex boxes of the cell a space alone between two parts draws nothing.
 */
export function ValueCellParts({ cell }: { cell: CellParts }) {
  const { bar } = cell;
  return (
    <>
      <span className="value-cell-head">
        <span className="value-cell-name">{cell.name}</span>{" "}
        <span className="value-cell-number">{cell.number}</span>
      </span>
      {"scale" in bar ? (
        <span className="value-cell-scale">{bar.scale}</span>
      ) : (
        <span className="value-cell-bar">
          <span
            className={`value-cell-fill ${bar.fillRole}`}
            style={{ "--share": bar.share } as CSSProperties}
          />
        </span>
      )}
      {cell.note === null ? null : (
        <>
          {" "}
          <span className="value-cell-note">{cell.note}</span>
        </>
      )}
    </>
  );
}

/**
 * The face of the tile of a slot of the gear: the icon of a piece drawn as a mask, in the colour of
 * the text beside it (D-43), hidden from a reader of the screen, since the button carries the name the
 * screen gives it; or the pale name of the slot. The look stands in `styles.css`.
 */
function TileFaceParts({ face }: { face: TileFace }) {
  return "icon" in face ? (
    <span
      className="icon-mask"
      aria-hidden="true"
      style={{ "--icon": `url("/icons/${face.icon}.svg")` } as CSSProperties}
    />
  ) : (
    <span className="tile-slot-name">{face.slotName}</span>
  );
}

type ReactButtonCommon = {
  /** The accessible name, where the visible text alone does not say what the button does. */
  label?: string;
  /** Makes the button the one that submits its form; any other button never does. */
  submit?: boolean;
  /**
   * Given, the button opens and closes a block below it and says whether the block stands open;
   * left out, it says nothing of that.
   */
  expanded?: boolean;
  /** The id of the block the button opens and closes, while that block stands; left out, it names none. */
  controls?: string;
  /**
   * Given, the button is one of a group and says whether it is the selected one; left out, it
   * belongs to no group and says nothing of selection.
   */
  selected?: boolean;
  /**
   * Given text, the button waits for the server: it shows this text, is disabled and says it is
   * busy. Given null or left out, it shows `text`.
   */
  waitingText?: string | null;
  /** Locks the button with its text kept, while the screen around it waits for the server. */
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** The button's element, for the screen that moves focus to it. */
  buttonRef?: Ref<HTMLButtonElement>;
};

/**
 * What a screen gives the tile of a slot of the gear: the icon of the piece the slot holds, as the
 * file name in `assets/icons` without the extension, with the name the button has for a reader of
 * the screen since the tile shows the icon alone — the screen writes it „{miejsce}: {rzecz}” — or,
 * for a slot that holds nothing, the name of the slot, which the tile shows pale in place of an icon.
 */
export type TileFace = { icon: string; name: string } | { slotName: string };

/** A button that carries a text, in any of the kinds but the cell of the body row and the tile. */
type ReactTextButtonProps = ReactButtonCommon & {
  text: string;
  /** Left out, the button is the plain one or, given `selected`, the one selected in its group. */
  kind?: Exclude<ReactButtonKind, "value-cell" | "tile">;
  cell?: undefined;
  tile?: undefined;
};

/** The button of a cell of the body row, which carries the parts of the cell in place of a text. */
type ReactCellButtonProps = ReactButtonCommon & {
  kind: "value-cell";
  cell: CellParts;
  text?: undefined;
  tile?: undefined;
};

/**
 * The tile of a slot of the gear, which carries its face in place of a text. It names itself, by the
 * piece's name or by the slot's, so it takes no `label`, and it waits for no server, so it takes no
 * `waitingText`; a screen locks it with `disabled`.
 */
type ReactTileButtonProps = Omit<ReactButtonCommon, "label" | "waitingText"> & {
  kind: "tile";
  tile: TileFace;
  text?: undefined;
  cell?: undefined;
  label?: undefined;
  waitingText?: undefined;
};

export type ReactButtonProps =
  ReactTextButtonProps | ReactCellButtonProps | ReactTileButtonProps;

/** A button of the shared look: plain, secondary, main, selected in its group, a tab of it, dashed, a cell of the body row or the tile of a slot of the gear. */
export function ReactButton(props: ReactButtonProps) {
  const {
    kind,
    label,
    submit,
    expanded,
    controls,
    selected,
    waitingText,
    disabled,
    onClick,
    buttonRef,
  } = props;
  const waiting = waitingText !== undefined && waitingText !== null;
  const marks = props.kind === "value-cell" ? (props.cell.marks ?? []) : [];
  return (
    <button
      ref={buttonRef}
      type={submit ? "submit" : "button"}
      className={["button", kind, ...marks, selected ? "selected" : undefined]
        .filter(Boolean)
        .join(" ")}
      aria-label={
        props.kind === "tile" && "icon" in props.tile ? props.tile.name : label
      }
      aria-expanded={expanded}
      aria-controls={controls}
      aria-pressed={selected === undefined ? undefined : selected}
      aria-busy={waiting ? "true" : undefined}
      disabled={waiting || disabled}
      onClick={onClick}
    >
      {props.kind === "value-cell" ? (
        <ValueCellParts cell={props.cell} />
      ) : props.kind === "tile" ? (
        <TileFaceParts face={props.tile} />
      ) : waiting ? (
        waitingText
      ) : (
        props.text
      )}
    </button>
  );
}
