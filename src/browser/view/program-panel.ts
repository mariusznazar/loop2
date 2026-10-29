import type { GameEvent } from "../sim/game.js";
import { programById, programName } from "../sim/programs.js";
import type {
  GameState,
  MapId,
  Program,
  ProgramId,
  ProgramNameRefusal,
} from "../sim/types.js";
import { createButton } from "./controls/button.js";
import {
  createSelectList,
  setSelectOptions,
  type SelectOption,
} from "./controls/select-list.js";
import { createTextField } from "./controls/text-field.js";
import { createProgramEditor } from "./program-editor.js";

/** What the panel shows: the copy of the map run, or a saved program by its number (D-153). */
export type ShownProgram =
  { kind: "copy" } | { kind: "saved"; programId: ProgramId };

/** What the panel's controls ask for; the game view turns each into a simulation call. */
export type ProgramPanelControls = {
  /** An edit of the copy the map run carries out. */
  editCopy(program: Program): void;
  /** An edit of the saved program numbered `programId`. */
  editProgram(programId: ProgramId, program: Program): void;
  /** „Nowy program”: a program with the suggested name at the end of the list. */
  createProgram(): void;
  /** „Zapisz” of „Zmień nazwę”, called only with a name the name rule takes. */
  renameProgram(programId: ProgramId, name: string): void;
  /** „Usuń” of the program shown, called only while the list holds more than one program. */
  deleteProgram(programId: ProgramId): void;
};

export type ProgramPanel = {
  /** The left panel, for the page to place. */
  element: HTMLElement;
  /**
   * Shows the given game state. `events` are those of the simulation call that returned it: a map
   * run started, by a send or „Restart”, shows the copy.
   */
  update(state: GameState, events: readonly GameEvent[]): void;
};

/** The value of the copy's position on the list; a saved program's value is its number. */
const COPY_VALUE = "copy";
const COPY_TEXT = "Kopia w przejściu";

/** The message under the name field for each name the name rule refuses (spec decision 7). */
const NAME_MESSAGES: Record<ProgramNameRefusal, string> = {
  empty: "Wpisz nazwę programu.",
  taken: "Program o tej nazwie już istnieje.",
};

/**
 * The positions of the list „Program:”: during a map run „Kopia w przejściu” first, then the
 * player's programs by name in list order. Pure.
 */
export function programListOptions(state: GameState): SelectOption[] {
  return [
    ...(state.run ? [[COPY_VALUE, COPY_TEXT] as const] : []),
    ...state.programs.map((saved): SelectOption => [
      String(saved.id),
      saved.name,
    ]),
  ];
}

/**
 * Which program the panel shows after the simulation call that took `previous` to `state` and
 * produced `events` (spec decision 7): at a map run started, by a send or „Restart”, the copy; at
 * a map run's end, the copy's program, or the first of the list where it is gone; a copy shown
 * without a map run or a saved program gone from the list gives way to the first of the list;
 * otherwise what was shown. Pure.
 */
export function nextShown(
  shown: ShownProgram,
  previous: GameState | null,
  state: GameState,
  events: readonly GameEvent[],
): ShownProgram {
  const first: ShownProgram = {
    kind: "saved",
    programId: state.programs[0].id,
  };
  if (state.run && events.some((event) => event.kind === "mapRunStarted"))
    return { kind: "copy" };
  if (previous?.run && !state.run) {
    const owner = programById(state.programs, previous.run.copy.programId);
    return owner ? { kind: "saved", programId: owner.id } : first;
  }
  if (shown.kind === "copy") return state.run ? shown : first;
  return programById(state.programs, shown.programId) ? shown : first;
}

/**
 * The program the editor shows and the counts beside its rules (spec decision 6): the copy with
 * the counts of the map run, a saved program during a map run with none, and outside a map run a
 * saved program with the counts only where they stand beside it. Pure.
 */
export function shownContent(
  state: GameState,
  shown: ShownProgram,
): { program: Program; counts: GameState["ruleCounts"] } {
  if (shown.kind === "copy" && state.run)
    return { program: state.run.copy.program, counts: state.ruleCounts };
  const saved =
    (shown.kind === "saved" && programById(state.programs, shown.programId)) ||
    state.programs[0];
  return {
    program: saved.program,
    counts:
      !state.run && state.countsProgram === saved.id ? state.ruleCounts : null,
  };
}

/** The value of the list's position of what the panel shows. */
function shownValue(shown: ShownProgram): string {
  return shown.kind === "copy" ? COPY_VALUE : String(shown.programId);
}

/** What the name field is open for; Slice 7 adds the save of the copy as a new program. */
type NamePurpose = { kind: "rename"; programId: ProgramId };

/**
 * Builds the program panel: the select list „Program:” with the player's programs and, during a
 * map run, „Kopia w przejściu” first; „Nowy program”, „Zmień nazwę” and the destructive „Usuń”,
 * the last two hidden while the copy is shown and „Usuń” disabled while the list holds one program;
 * the name field „Nazwa programu” with its message in `warning` and „Zapisz”, open for „Zmień
 * nazwę”; and the program editor, editing the program shown. Which program it shows is view state,
 * changed by picking on the list and by the operations of the game, and picking changes no game
 * state. The controls are made once and updated in place, so a field being typed into keeps its
 * value and focus while time passes (D-36).
 */
export function createProgramPanel(
  controls: ProgramPanelControls,
): ProgramPanel {
  const element = document.createElement("section");
  element.className = "program-panel";

  const listRow = document.createElement("div");
  listRow.className = "program-list";
  const listLabel = document.createElement("span");
  listLabel.className = "program-list-label";
  listLabel.textContent = "Program:";
  const list = createSelectList("Program:");
  listRow.append(listLabel, list);

  const actions = document.createElement("div");
  actions.className = "program-actions";
  const createButtonElement = createButton("Nowy program");
  const renameButton = createButton("Zmień nazwę");
  // „Usuń” deletes the program: a destructive button (D-44).
  const deleteButton = createButton("Usuń", { kind: "destructive" });
  actions.append(createButtonElement, renameButton, deleteButton);

  const nameRow = document.createElement("div");
  nameRow.className = "program-name";
  nameRow.hidden = true;
  const nameField = createTextField({
    label: "Nazwa programu",
    hint: "Nazwa programu",
  });
  const saveNameButton = createButton("Zapisz");
  nameRow.append(nameField.element, saveNameButton);

  const editor = createProgramEditor((program) => {
    if (shown.kind === "copy") controls.editCopy(program);
    else controls.editProgram(shown.programId, program);
  });
  element.append(listRow, actions, nameRow, editor.element);

  let state: GameState | null = null;
  let shown: ShownProgram = { kind: "saved", programId: 1 };
  let namePurpose: NamePurpose | null = null;
  let listKey = "";
  /** What the editor was last given, so time passing refreshes its counts alone. */
  let drawn: {
    value: string;
    program: Program;
    mapId: MapId | undefined;
    understanding: GameState["understanding"];
  } | null = null;

  /** The reason the name rule refuses the field's text for the purpose open, or null. */
  function nameRefusal(): ProgramNameRefusal | null {
    if (!state || !namePurpose) return null;
    const checked = programName(
      state.programs,
      nameField.input.value,
      namePurpose.programId,
    );
    return checked.ok ? null : checked.reason;
  }

  function showNameMessage(): void {
    const refusal = nameRefusal();
    nameField.setError(refusal === null ? null : NAME_MESSAGES[refusal]);
  }

  function openName(purpose: NamePurpose, value: string): void {
    namePurpose = purpose;
    nameField.input.value = value;
    nameRow.hidden = false;
    showNameMessage();
    nameField.input.focus();
  }

  function closeName(): void {
    namePurpose = null;
    nameRow.hidden = true;
    nameField.setError(null);
  }

  /** Shows `next`; the name field leaves the panel unsaved when the program shown changes. */
  function setShown(next: ShownProgram): void {
    if (shownValue(next) !== shownValue(shown)) closeName();
    shown = next;
  }

  function show(next: ShownProgram): void {
    setShown(next);
    if (state) render(state);
  }

  list.addEventListener("change", () => {
    show(
      list.value === COPY_VALUE
        ? { kind: "copy" }
        : { kind: "saved", programId: Number(list.value) },
    );
  });

  createButtonElement.addEventListener("click", () => {
    if (!state) return;
    const programId = state.nextProgramId;
    controls.createProgram();
    if (state && programById(state.programs, programId))
      show({ kind: "saved", programId });
  });

  renameButton.addEventListener("click", () => {
    if (!state || shown.kind !== "saved") return;
    // The same action again leaves the field without saving.
    if (namePurpose?.kind === "rename") {
      closeName();
      return;
    }
    const saved = programById(state.programs, shown.programId);
    if (saved) openName({ kind: "rename", programId: saved.id }, saved.name);
  });

  deleteButton.addEventListener("click", () => {
    if (!state || shown.kind !== "saved" || state.programs.length === 1) return;
    controls.deleteProgram(shown.programId);
    // A disabled button loses focus: with one program left, focus goes to the list.
    if (deleteButton.disabled) list.focus();
  });

  nameField.input.addEventListener("input", showNameMessage);

  saveNameButton.addEventListener("click", () => {
    if (!namePurpose) return;
    showNameMessage();
    if (nameRefusal() !== null) return;
    const purpose = namePurpose;
    const text = nameField.input.value;
    closeName();
    controls.renameProgram(purpose.programId, text);
    renameButton.focus();
  });

  function render(current: GameState): void {
    const options = programListOptions(current);
    const nextListKey = JSON.stringify(options);
    if (nextListKey !== listKey) {
      setSelectOptions(list, options);
      listKey = nextListKey;
    }
    const value = shownValue(shown);
    if (list.value !== value) list.value = value;

    const copyShown = shown.kind === "copy";
    renameButton.hidden = copyShown;
    deleteButton.hidden = copyShown;
    const lastProgram = current.programs.length === 1;
    if (deleteButton.disabled !== lastProgram)
      deleteButton.disabled = lastProgram;

    // The editor's content is written only when the program shown, its content, the map or the
    // Understanding changes; otherwise only its counts, so a field being typed into keeps focus.
    const content = shownContent(current, shown);
    const next = {
      value,
      program: content.program,
      mapId: current.run?.mapId,
      understanding: current.understanding,
    };
    if (
      !drawn ||
      next.value !== drawn.value ||
      next.program !== drawn.program ||
      next.mapId !== drawn.mapId ||
      next.understanding !== drawn.understanding
    ) {
      editor.update(current, content.program, content.counts);
      drawn = next;
    } else {
      editor.updateCounts(content.counts);
    }
  }

  return {
    element,
    update(next: GameState, events: readonly GameEvent[]): void {
      const previous = state;
      state = next;
      setShown(nextShown(shown, previous, next, events));
      render(next);
    },
  };
}
