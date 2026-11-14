/**
 * The list of programs on the screen Programy (D-165, D-166, D-167, D-169), in its React form: the
 * player's programs in the list's order, each a link to its address with the chosen one marked, and
 * under them „Nowy program”, „Zmień nazwę” and the destructive „Usuń” of the chosen program, and,
 * where the page gives it, „Wciągnij programy z poprzedniego zapisu” with the one line of its
 * result (D-167, D-401), and „Zacznij od zera” with its confirmation and the line of a failed reset
 * (D-402), with the name field under those where „Zmień nazwę” opened it. The page holds the state
 * of the pull — whether the button stands, whether it waits for the server and the line beside it —
 * and gives it through `props.pull`; the game view holds the reset's state and gives it through
 * `props.reset`. The page holds the list behind one boundary,
 * `createProgramList` (D-36), as the menu bar and the character screen do: an element of its own for
 * the page to place, a first render that is synchronous, `update(props)` and `dispose()`. The page
 * calls them from an event handler or the continuation of an answer, never from render or an effect.
 * The list's acts go to the page through `onCreate`, `onRename`, `onDelete`, `onPull` and the three
 * of the reset. The name field's
 * message is the one the program panel holds, for the same name rule. Nothing runs when the module
 * is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { programName } from "../sim/programs.js";
import type { ProgramId, SavedProgram } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import {
  ReactFormNote,
  ReactFormWarning,
  ReactTextField,
} from "./controls/react-text-field.js";
import { NAME_MESSAGES } from "./program-panel.js";
import type { PullLine } from "./previous-save-lines.js";
import { screenAddress } from "./screen-address.js";

/**
 * The pull of the previous save as the page gives it (D-401): `away` — no button, `rest` — the
 * button, `waiting` — the button disabled while the server answers; and the one line beside it,
 * which stands also where the button is away.
 */
export type PullView = {
  control: "away" | "rest" | "waiting";
  line: PullLine | null;
};

/**
 * The reset of the game as the view gives it (D-402): the control „Zacznij od zera”, at rest or
 * waiting for the server, whether its confirmation stands beside it, and the sentence of a failed
 * reset under it.
 */
export type ResetView = {
  control: "rest" | "waiting";
  confirming: boolean;
  /** The sentence of a failed reset, in `warning` beside the control; null where there is none. */
  line: string | null;
};

/** The control of the reset and the words of its confirmation (D-402, D-44). */
const RESET_TEXT = "Zacznij od zera";
const RESET_QUESTION =
  "Obecna gra przejdzie na miejsce poprzedniego zapisu, a gra zacznie się od zera. Poprzedni zapis, który tam jest, zostanie zastąpiony, a jego programów nie da się potem wciągnąć.";
const RESET_CONFIRM_TEXT = "Tak, zacznij od zera";
const RESET_WITHDRAW_TEXT = "Wróć";

/** What the page gives the list; every call of `update` gives it whole. */
export type ProgramListProps = {
  /** The player's saved programs, in the list's order. */
  programs: readonly SavedProgram[];
  /** The program the page gives marked, the one its address names; null marks none. */
  chosenId: ProgramId | null;
  /** The pull of the previous save: its button and the line of its result. */
  pull: PullView;
  /** The reset of the game; left out or null, the list draws neither the control nor its confirmation. */
  reset?: ResetView | null;
};

export type ProgramListOptions = {
  /** Called when the player asks for „Wciągnij programy z poprzedniego zapisu”. */
  onPull: () => void;
  /** Called when the player asks for „Zacznij od zera”, which opens its confirmation. */
  onResetAsk: () => void;
  /** Called when the player confirms the reset, once per confirmation. */
  onResetConfirm: () => void;
  /** Called when the player withdraws from the confirmation of the reset; nothing else changes. */
  onResetWithdraw: () => void;
  /** Called when the player asks for „Nowy program”. */
  onCreate: () => void;
  /** Called with a name the name rule takes, when the player saves „Zmień nazwę”. */
  onRename: (programId: ProgramId, name: string) => void;
  /** Called when the player asks for „Usuń” of the chosen program, only while the list holds more than one. */
  onDelete: (programId: ProgramId) => void;
  props: ProgramListProps;
};

export type ProgramList = {
  /** The list with its screen, for the page to place. */
  element: HTMLElement;
  /** Draws the list anew from what the page gives. */
  update(props: ProgramListProps): void;
  /** Unmounts the list and takes it out of the page. */
  dispose(): void;
};

/** The name field open for a program: its number and the text in it. */
type Naming = { programId: ProgramId; value: string };

type ProgramListViewProps = Omit<ProgramListOptions, "props"> & {
  props: ProgramListProps;
};

/** The list: the programs, the actions on the chosen one and the name field where it is open. */
function ProgramListView({
  onPull,
  onResetAsk,
  onResetConfirm,
  onResetWithdraw,
  onCreate,
  onRename,
  onDelete,
  props,
}: ProgramListViewProps) {
  const { programs, chosenId, pull } = props;
  const reset = props.reset ?? null;
  const resetControl = reset?.control;
  const resetConfirming = reset?.confirming ?? false;
  const chosen = programs.find((saved) => saved.id === chosenId);
  const onlyOne = programs.length <= 1;
  const [naming, setNaming] = useState<Naming | null>(null);
  const [namedFor, setNamedFor] = useState(chosenId);
  const renameButton = useRef<HTMLButtonElement>(null);
  const pullButton = useRef<HTMLButtonElement>(null);
  const resetButton = useRef<HTMLButtonElement>(null);
  const withdrawButton = useRef<HTMLButtonElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  // Set by „Zmień nazwę”, so the commit that shows the field moves focus into it.
  const focusNameOnOpen = useRef(false);
  // Set by the pull, so the commit that brings the button back from waiting moves focus to it: a
  // disabled button loses the focus.
  const focusPullOnRest = useRef(false);
  // Set by the reset's confirm, and by its open and withdraw, for the same reasons as the pull.
  const focusResetOnRest = useRef(false);
  const focusWithdrawOnOpen = useRef(false);

  // The field leaves with the program it was open for: another program chosen closes it.
  if (namedFor !== chosenId) {
    setNamedFor(chosenId);
    setNaming(null);
  }

  useLayoutEffect(() => {
    if (!focusNameOnOpen.current) return;
    focusNameOnOpen.current = false;
    nameInput.current?.focus();
  }, [naming]);

  useLayoutEffect(() => {
    if (pull.control === "waiting" || !focusPullOnRest.current) return;
    focusPullOnRest.current = false;
    if (pull.control === "rest") pullButton.current?.focus();
  }, [pull.control]);

  useLayoutEffect(() => {
    if (!focusWithdrawOnOpen.current || !resetConfirming) return;
    focusWithdrawOnOpen.current = false;
    withdrawButton.current?.focus();
  }, [resetConfirming]);

  useLayoutEffect(() => {
    if (resetControl === "waiting" || !focusResetOnRest.current) return;
    focusResetOnRest.current = false;
    if (resetControl === "rest") resetButton.current?.focus();
  }, [resetControl]);

  // The name rule judges the text for the program the field is open for; its own name is not taken.
  const checked =
    naming === null
      ? null
      : programName(programs, naming.value, naming.programId);
  const refusal = checked !== null && !checked.ok ? checked.reason : null;

  function toggleRename(): void {
    // The same action again leaves the field without saving.
    if (naming !== null) {
      setNaming(null);
      return;
    }
    if (chosen === undefined) return;
    focusNameOnOpen.current = true;
    setNaming({ programId: chosen.id, value: chosen.name });
  }

  function save(): void {
    if (naming === null || refusal !== null) return;
    const { programId, value } = naming;
    setNaming(null);
    onRename(programId, value);
    renameButton.current?.focus();
  }

  function remove(): void {
    if (chosen === undefined || onlyOne) return;
    onDelete(chosen.id);
  }

  function pullPrevious(): void {
    if (pull.control !== "rest") return;
    focusPullOnRest.current = true;
    onPull();
  }

  function askReset(): void {
    focusWithdrawOnOpen.current = true;
    onResetAsk();
  }

  function confirmReset(): void {
    focusResetOnRest.current = true;
    onResetConfirm();
  }

  function withdrawReset(): void {
    onResetWithdraw();
    // The confirmation's buttons leave with it; the reset control stays, so focus goes back to it.
    resetButton.current?.focus();
  }

  return (
    <div className="program-list-view">
      <ul className="program-list-items" aria-label="Programy">
        {programs.map((saved) => (
          <li key={saved.id}>
            <a
              className="program-list-item"
              href={screenAddress({ kind: "program", programId: saved.id })}
              aria-current={saved.id === chosenId ? "page" : undefined}
            >
              {saved.name}
            </a>
          </li>
        ))}
      </ul>
      <div className="program-actions">
        <ReactButton text="Nowy program" onClick={() => onCreate()} />
        <ReactButton
          text="Zmień nazwę"
          buttonRef={renameButton}
          disabled={chosen === undefined}
          onClick={toggleRename}
        />
        <ReactButton
          text="Usuń"
          kind="destructive"
          disabled={chosen === undefined || onlyOne}
          onClick={remove}
        />
        {pull.control === "away" ? null : (
          <ReactButton
            text="Wciągnij programy z poprzedniego zapisu"
            waitingText={pull.control === "waiting" ? "Wciąganie…" : null}
            buttonRef={pullButton}
            onClick={pullPrevious}
          />
        )}
        {pull.line === null ? null : pull.line.role === "warning" ? (
          <ReactFormWarning sentence={pull.line.text} />
        ) : (
          <ReactFormNote sentence={pull.line.text} />
        )}
        {reset === null ? null : (
          <ReactButton
            text={RESET_TEXT}
            kind="destructive"
            buttonRef={resetButton}
            disabled={reset.control === "waiting"}
            onClick={askReset}
          />
        )}
        {reset === null || reset.line === null ? null : (
          <ReactFormWarning sentence={reset.line} />
        )}
      </div>
      {reset === null || !reset.confirming ? null : (
        <div className="program-reset-confirm">
          <p className="program-reset-text">{RESET_QUESTION}</p>
          <ReactButton
            text={RESET_CONFIRM_TEXT}
            kind="destructive"
            onClick={confirmReset}
          />
          <ReactButton
            text={RESET_WITHDRAW_TEXT}
            buttonRef={withdrawButton}
            onClick={withdrawReset}
          />
        </div>
      )}
      {naming === null ? null : (
        <div className="program-name">
          <ReactTextField
            label="Nazwa programu"
            hint="Nazwa programu"
            error={refusal === null ? null : NAME_MESSAGES[refusal]}
            value={naming.value}
            onChange={(event) =>
              setNaming({
                programId: naming.programId,
                value: event.target.value,
              })
            }
            inputRef={nameInput}
          />
          <ReactButton text="Zapisz" onClick={save} />
        </div>
      )}
    </div>
  );
}

/**
 * Builds the list in an element of its own, for the page to place. The render is synchronous, so
 * the list stands in the element when this returns. Each list is a new root: nothing it holds
 * outlives `dispose()`.
 */
export function createProgramList(options: ProgramListOptions): ProgramList {
  const element = document.createElement("div");
  element.className = "program-list-host";
  const root = createRoot(element);
  let disposed = false;
  function draw(props: ProgramListProps): void {
    flushSync(() => {
      root.render(
        <ProgramListView
          onPull={options.onPull}
          onResetAsk={options.onResetAsk}
          onResetConfirm={options.onResetConfirm}
          onResetWithdraw={options.onResetWithdraw}
          onCreate={options.onCreate}
          onRename={options.onRename}
          onDelete={options.onDelete}
          props={props}
        />,
      );
    });
  }
  draw(options.props);
  return {
    element,
    update(props: ProgramListProps): void {
      if (!disposed) draw(props);
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      element.remove();
    },
  };
}
