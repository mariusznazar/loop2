/**
 * The list of programs on the screen Programy (D-165, D-166, D-167, D-169), in its React form: the
 * player's programs in the list's order, each a link to its address with the chosen one marked, and
 * under them „Nowy program”, „Zmień nazwę” and the destructive „Usuń” of the chosen program, with the
 * name field under those where „Zmień nazwę” opened it. The page holds the list behind one boundary,
 * `createProgramList` (D-36), as the menu bar and the character screen do: an element of its own for
 * the page to place, a first render that is synchronous, `update(props)` and `dispose()`. The page
 * calls them from an event handler or the continuation of an answer, never from render or an effect.
 * The list's acts go to the page through `onCreate`, `onRename` and `onDelete`. The name field's
 * message is the one the program panel holds, for the same name rule. Nothing runs when the module
 * is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { programName } from "../sim/programs.js";
import type { ProgramId, SavedProgram } from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { NAME_MESSAGES } from "./program-panel.js";
import { screenAddress } from "./screen-address.js";

/** What the page gives the list; every call of `update` gives it whole. */
export type ProgramListProps = {
  /** The player's saved programs, in the list's order. */
  programs: readonly SavedProgram[];
  /** The program the page gives marked, the one its address names; null marks none. */
  chosenId: ProgramId | null;
};

export type ProgramListOptions = {
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
  onCreate,
  onRename,
  onDelete,
  props,
}: ProgramListViewProps) {
  const { programs, chosenId } = props;
  const chosen = programs.find((saved) => saved.id === chosenId);
  const onlyOne = programs.length <= 1;
  const [naming, setNaming] = useState<Naming | null>(null);
  const [namedFor, setNamedFor] = useState(chosenId);
  const renameButton = useRef<HTMLButtonElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  // Set by „Zmień nazwę”, so the commit that shows the field moves focus into it.
  const focusNameOnOpen = useRef(false);

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
      </div>
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
