/**
 * The program panel in React (D-36, D-166 to D-174, D-180, D-282, D-288, D-295, D-302, D-313; task
 * edytor-programu, To do 1, 8 and 11; task ekran-przejscia, To do 7). One panel serves the two screens
 * that edit programs, behind the boundary `createProgramPanel` that `createAccountCard` and
 * `createProgramList` give the page: an element of its own, a first render that is synchronous,
 * `update(state, events)`, `showProgram`, `addDiscoveredRule` and `dispose()`, called from an event
 * handler or the continuation of an answer, never from render or an effect. The panel holds the rule
 * list and, beside it, the rule panel, the open rule a state of the panel; where the screen places a
 * host element for the rule panel (`placeRulePanel`), the panel draws it there, through a portal of
 * its own React tree, and tells the screen whether it stands. It asks the
 * game for every change through `ProgramPanelControls` and never writes the game state. Which program it shows is the boundary's, changed by picking on the list and by the
 * operations of the game. The folding of rule groups is one memory of the page, `createFolding`, which
 * the page makes once and gives to both panels. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal, flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import { MAPS } from "../sim/data/maps.js";
import { ruleSigns, type GameEvent } from "../sim/game.js";
import {
  copyHasUnsavedChanges,
  programById,
  programHasChangesCopyLacks,
  programName,
  suggestedProgramName,
} from "../sim/programs.js";
import { mapRunEnded } from "../sim/run.js";
import type {
  GameState,
  GroupId,
  Program,
  ProgramId,
  ProgramNameRefusal,
} from "../sim/types.js";
import { ReactButton } from "./controls/react-button.js";
import { ReactSelectList } from "./controls/react-select-list.js";
import type { SelectOption } from "./controls/select-list.js";
import { ReactTextField } from "./controls/react-text-field.js";
import { discoveryRule } from "./discovery-rule.js";
import { offeredItems } from "./program-editor.js";
import { RuleListView, type RuleListTarget } from "./rule-list.js";
import { RulePanelView, type RulePanelOpen } from "./rule-panel.js";
import { TripPlanView } from "./trip-plan.js";

/** What the panel shows: the copy of the map run, or a saved program by its number (D-165). */
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
  /** „Zapisz w programie”, called only while the copy has unsaved changes and its program is on the list. */
  saveCopy(): void;
  /** „Zapisz” of „Zapisz jako nowy program”, called only with a name the name rule takes. */
  saveCopyAsNew(name: string): void;
  /** „Porzuć zmiany”, called only while the copy has unsaved changes and its program is on the list. */
  discardCopy(): void;
  /** „Przełącz postać na ten program”, called only for a saved program the copy does not belong to. */
  switchProgram(programId: ProgramId): void;
};

/**
 * Which screen the panel serves (D-166). `run` is the screen of a map run: the select list „Program:”
 * with „Kopia w przejściu” first, the copy with its buttons, the list's actions and „Przełącz postać
 * na ten program”, no trip plan. `programs` is the screen Programy: the saved program the page names,
 * never the copy, under the sentence about a map run the game state holds, with its name above its
 * trip plan and its rules; the list of programs and its actions stand beside the panel, on the screen.
 */
export type ProgramPanelMode = "run" | "programs";

/**
 * The memory of the folding of rule groups (D-295, settlement row 6): which groups of each program
 * stand folded to their header. It lives in the page, outside the game state and the save, so a reload
 * forgets it; the panels of the two screens read and change the one memory, so a group folded on one
 * screen stays folded on the other for the same program. A program's key is its number, the copy's
 * is „copy”.
 */
export type Folding = {
  /** The groups folded now, by the key of each program; a stable value until a change. */
  snapshot: () => ReadonlyMap<string, readonly GroupId[]>;
  /** Calls `listener` after each change; returns the way to stop. */
  subscribe: (listener: () => void) => () => void;
  /** Replaces the groups folded of the program under `key`. */
  set: (key: string, folded: readonly GroupId[]) => void;
};

/** Makes the memory of folding, empty: every group unfolded. */
export function createFolding(): Folding {
  let memory: ReadonlyMap<string, readonly GroupId[]> = new Map();
  const listeners = new Set<() => void>();
  return {
    snapshot: () => memory,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    set(key, folded) {
      const next = new Map(memory);
      if (folded.length === 0) next.delete(key);
      else next.set(key, folded);
      memory = next;
      for (const listener of [...listeners]) listener();
    },
  };
}

export type ProgramPanel = {
  /** The panel, for the page to place. */
  element: HTMLElement;
  /**
   * Shows the given game state. `events` are those of the simulation call that returned it: a map
   * run started, by a send or „Restart”, shows the copy, on the screen of a map run.
   */
  update(state: GameState, events: readonly GameEvent[]): void;
  /**
   * Shows the saved program numbered `programId`, as a pick on the list „Program:” does; one that
   * is not on the list gives way to the first. Text typed into the editor and not yet committed goes
   * to the program it was typed into first. Showing what is shown changes nothing.
   */
  showProgram(programId: ProgramId): void;
  /**
   * Places the rule panel in `host`, an element of the screen outside this panel, instead of beside
   * the rows: the panel draws it there through a portal, so it stays in this panel's React tree.
   * `onOpen(true)` is called when a rule or a group opens and `onOpen(false)` when none is open any
   * more, so the screen can hide what the panel takes the place of and show `host` meanwhile. Left
   * unplaced, the panel draws the rule panel beside its rows.
   */
  placeRulePanel(host: HTMLElement, onOpen: (open: boolean) => void): void;
  /**
   * „Dodaj regułę z tym” (D-313), for the screen of a map run to call from an event handler: the rule
   * the discovery held by the game state last given writes (`discoveryRule`) goes to the copy through
   * `editCopy`, as every edit of the copy goes, so the streak goes to zero (D-131); the copy is shown
   * where a saved program was, and the rule panel opens on the new rule and the field the discovery
   * filled, in the host the screen placed, telling it through `onOpen`, with the focus on that field.
   * Where the game holds no discovery or the copy no rule group, and in the panel of Programy, it does
   * nothing.
   */
  addDiscoveredRule(): void;
  /** Unmounts the panel and takes it out of the page. */
  dispose(): void;
};

/** The value of the copy's position on the list; a saved program's value is its number. */
const COPY_VALUE = "copy";
const COPY_TEXT = "Kopia w przejściu";
const NO_GROUPS: readonly GroupId[] = [];

/** The message under the name field for each name the name rule refuses (spec decision 7). */
export const NAME_MESSAGES: Record<ProgramNameRefusal, string> = {
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
 * produced `events` (spec decision 7): at a map run started, by a send or „Restart”, the copy, and
 * the same for the first state shown when it holds a map run, as a loaded game state may (D-212);
 * at a map run's end, the copy's program, or the first of the list where it is gone; a copy shown
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
  if (
    state.run &&
    (previous === null ||
      events.some((event) => event.kind === "mapRunStarted"))
  )
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

/**
 * Whether „Przełącz postać na ten program” stands beside the saved program shown: a map run not
 * ended, and a program other than the one the copy belongs to (spec decision 7).
 */
function canSwitchTo(
  state: GameState,
  shown: { kind: "saved"; programId: ProgramId },
): boolean {
  const run = state.run;
  return (
    run !== null &&
    !mapRunEnded(run) &&
    run.copy.programId !== shown.programId &&
    programById(state.programs, shown.programId) !== undefined
  );
}

/** The value of the list's position of what the panel shows. */
function shownValue(shown: ShownProgram): string {
  return shown.kind === "copy" ? COPY_VALUE : String(shown.programId);
}

/** The saved program of the list the panel of Programy shows for `shown`: itself, or the first one. */
function savedShown(
  state: GameState,
  shown: ShownProgram,
): { kind: "saved"; programId: ProgramId } {
  return shown.kind === "saved" && programById(state.programs, shown.programId)
    ? shown
    : { kind: "saved", programId: state.programs[0].id };
}

/**
 * The line beside the save buttons of the copy, and under the question of „Zakończ”, when the
 * program `name` the copy belongs to holds changes the copy lacks (D-172, task pytanie-przy-zakoncz).
 */
export function copyLacksSentence(name: string): string {
  return `Program ${name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.`;
}

/** The sentence above the editor of Programy while the game state holds a map run (D-166). */
function runNoteText(run: NonNullable<GameState["run"]>): string {
  return `Zmiany tutaj nie dotykają przejścia na mapie ${MAPS[run.mapId].name}.`;
}

/** What the name field is open for: a rename of a saved program, or the save of the copy as a new one. */
type NamePurpose =
  { kind: "rename"; programId: ProgramId } | { kind: "saveNew" };

/** The name field open: for what, the text in it, and the program shown it was opened under. */
type Naming = { key: string; purpose: NamePurpose; value: string };

/**
 * The row or header whose rule panel stands open, with the program shown it was opened under; the
 * field it opened on, where one other than the condition was asked for.
 */
type OpenRule = { key: string; target: RulePanelOpen };

/** What the view asks of the boundary, which holds the program shown and the game state. */
type PanelActions = {
  /** Shows `next`; uncommitted text of the editor goes to the program it was typed into first. */
  show: (next: ShownProgram) => void;
  /** An edit of the program shown, a whole new program. */
  edit: (program: Program) => void;
  createProgram: () => void;
  renameProgram: (programId: ProgramId, name: string) => void;
  deleteProgram: (programId: ProgramId) => void;
  saveCopy: () => void;
  saveCopyAsNew: (name: string) => void;
  discardCopy: () => void;
  switchProgram: (programId: ProgramId) => void;
};

type ProgramPanelViewProps = {
  mode: ProgramPanelMode;
  state: GameState;
  shown: ShownProgram;
  actions: PanelActions;
  folding: Folding;
  /** Where the rule panel stands when the screen gives it a place of its own; null beside the rows. */
  ruleHost?: HTMLElement | null;
  /** Told, after each commit, whether a rule or a group stands open in the rule panel. */
  onRuleOpen?: (open: boolean) => void;
  /**
   * A rule the boundary asks to open, „Dodaj regułę z tym”'s; each request a new object, opened at
   * the first draw that gives it, as a click on its row would open it.
   */
  opening?: RulePanelOpen | null;
};

/**
 * The panel drawn from the game state and the program shown. In `run` mode it holds the list
 * „Program:”, the actions of the list, the copy's section and the name field above the editor; in
 * `programs` mode the sentence of a waiting map run, the program's name and its trip plan. Both hold
 * the rule list with the rule panel beside it.
 */
export function ProgramPanelView({
  mode,
  state,
  shown,
  actions,
  folding,
  ruleHost = null,
  onRuleOpen,
  opening = null,
}: ProgramPanelViewProps) {
  const key = shownValue(shown);
  const [namingState, setNaming] = useState<Naming | null>(null);
  const [openState, setOpen] = useState<OpenRule | null>(null);
  const [openingSeen, setOpeningSeen] = useState(opening);
  const memory = useSyncExternalStore(folding.subscribe, folding.snapshot);
  const list = useRef<HTMLSelectElement>(null);
  const renameButton = useRef<HTMLButtonElement>(null);
  const deleteButton = useRef<HTMLButtonElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const editing = useRef<HTMLDivElement>(null);
  // Set by what opens the name field and by what closes the rule panel, so the commit that follows
  // moves the focus: a control that leaves the page loses it.
  const focusName = useRef(false);
  const focusClosed = useRef<RuleListTarget | null>(null);

  useLayoutEffect(() => {
    if (focusName.current) {
      focusName.current = false;
      nameInput.current?.focus();
    }
    const closed = focusClosed.current;
    if (closed !== null) {
      focusClosed.current = null;
      const row =
        closed.ruleId === null
          ? editing.current?.querySelector(
              `[data-group="${closed.groupId}"] .rule-list-header`,
            )
          : editing.current?.querySelector(`[data-rule="${closed.ruleId}"]`);
      if (row instanceof HTMLElement) row.focus();
    }
  });

  const run = state.run;
  const content = shownContent(state, shown);
  const copyShown = shown.kind === "copy" && run !== null;
  const owner =
    copyShown && run
      ? programById(state.programs, run.copy.programId)
      : undefined;
  const unsaved = copyShown && copyHasUnsavedChanges(state);

  // The name field and the open rule belong to the program shown: another shown leaves them, and a
  // name field for the save of the copy leaves with the copy's changes.
  let naming = namingState;
  if (
    naming !== null &&
    (naming.key !== key || (naming.purpose.kind === "saveNew" && !unsaved))
  ) {
    naming = null;
    setNaming(null);
  }
  let open = openState;
  // A request of the boundary opens its rule under the program shown, once.
  if (opening !== openingSeen) {
    setOpeningSeen(opening);
    if (opening !== null) {
      open = { key, target: opening };
      setOpen(open);
    }
  }
  if (open !== null && open.key !== key) {
    open = null;
    setOpen(null);
  }

  const openGroup =
    open === null
      ? undefined
      : content.program.groups.find(
          (group) => group.id === open.target.groupId,
        );
  const panelStands =
    open !== null &&
    openGroup !== undefined &&
    (open.target.ruleId === null ||
      openGroup.rules.some((rule) => rule.id === open.target.ruleId));
  const folded = memory.get(key) ?? NO_GROUPS;

  // The screen hides what the rule panel takes the place of while it stands. The effect only passes
  // the fact on to the screen's elements, outside this tree, and runs again when the fact changes.
  useLayoutEffect(() => {
    onRuleOpen?.(panelStands);
  }, [panelStands, onRuleOpen]);

  const checked =
    naming === null
      ? null
      : programName(
          state.programs,
          naming.value,
          naming.purpose.kind === "rename"
            ? naming.purpose.programId
            : undefined,
        );
  const refusal = checked !== null && !checked.ok ? checked.reason : null;

  function openName(purpose: NamePurpose, value: string): void {
    focusName.current = true;
    setNaming({ key, purpose, value });
  }

  function toggleRename(): void {
    // The same action again leaves the field without saving.
    if (naming?.purpose.kind === "rename") {
      setNaming(null);
      return;
    }
    if (shown.kind !== "saved") return;
    const saved = programById(state.programs, shown.programId);
    if (saved) openName({ kind: "rename", programId: saved.id }, saved.name);
  }

  function toggleSaveNew(): void {
    if (!copyShown || !unsaved) return;
    if (naming?.purpose.kind === "saveNew") {
      setNaming(null);
      return;
    }
    openName({ kind: "saveNew" }, suggestedProgramName(state.programs));
  }

  function saveName(): void {
    if (naming === null || refusal !== null) return;
    const { purpose, value } = naming;
    setNaming(null);
    if (purpose.kind === "rename") {
      actions.renameProgram(purpose.programId, value);
      renameButton.current?.focus();
    } else {
      actions.saveCopyAsNew(value);
      // „Zapisz jako nowy program” is inactive now; focus goes to the list.
      list.current?.focus();
    }
  }

  function remove(): void {
    if (shown.kind !== "saved" || state.programs.length === 1) return;
    actions.deleteProgram(shown.programId);
    // A disabled button loses focus: with one program left, focus goes to the list.
    if (deleteButton.current?.disabled === true) list.current?.focus();
  }

  function closePanel(): void {
    if (open === null) return;
    focusClosed.current = open.target;
    setOpen(null);
  }

  const switchStands =
    run !== null && shown.kind === "saved" && canSwitchTo(state, shown);
  const lacks =
    copyShown && owner !== undefined && programHasChangesCopyLacks(state);
  const saved =
    shown.kind === "saved"
      ? (programById(state.programs, shown.programId) ?? state.programs[0])
      : state.programs[0];

  const rulePanel =
    panelStands && open !== null ? (
      <RulePanelView
        state={state}
        program={content.program}
        open={open.target}
        copy={copyShown}
        onCommit={actions.edit}
        onClose={closePanel}
      />
    ) : null;

  const runHead =
    mode === "run" ? (
      <>
        <div className="program-list">
          <span className="program-list-label">Program:</span>
          <ReactSelectList
            label="Program:"
            options={programListOptions(state)}
            value={key}
            selectRef={list}
            onChange={(event) =>
              actions.show(
                event.target.value === COPY_VALUE
                  ? { kind: "copy" }
                  : { kind: "saved", programId: Number(event.target.value) },
              )
            }
          />
        </div>
        {switchStands && shown.kind === "saved" ? (
          <ReactButton
            text="Przełącz postać na ten program"
            kind="destructive"
            onClick={() => {
              actions.switchProgram(shown.programId);
              // The button is gone now; focus goes to the list.
              list.current?.focus();
            }}
          />
        ) : null}
        <div className="program-actions">
          <ReactButton text="Nowy program" onClick={actions.createProgram} />
          {copyShown ? null : (
            <>
              <ReactButton
                text="Zmień nazwę"
                buttonRef={renameButton}
                onClick={toggleRename}
              />
              {/* „Usuń” deletes the program: a destructive button (D-44). */}
              <ReactButton
                text="Usuń"
                kind="destructive"
                buttonRef={deleteButton}
                disabled={state.programs.length === 1}
                onClick={remove}
              />
            </>
          )}
        </div>
        {copyShown && run ? (
          <div className="copy-section">
            <h2 className="copy-heading">
              {`Kopia: ${owner ? owner.name : (run.copy.deletedName ?? "")}`}
            </h2>
            {unsaved ? (
              <p className="copy-line">Niezapisane zmiany w kopii.</p>
            ) : null}
            <div className="copy-save">
              {owner ? (
                <ReactButton
                  text="Zapisz w programie"
                  disabled={!unsaved}
                  onClick={() => {
                    actions.saveCopy();
                    // The button is inactive now; focus goes to the list.
                    list.current?.focus();
                  }}
                />
              ) : null}
              <ReactButton
                text="Zapisz jako nowy program"
                disabled={!unsaved}
                onClick={toggleSaveNew}
              />
              {owner ? (
                <ReactButton
                  text="Porzuć zmiany"
                  kind="destructive"
                  disabled={!unsaved}
                  onClick={() => {
                    actions.discardCopy();
                    list.current?.focus();
                  }}
                />
              ) : null}
              {lacks && owner ? (
                <p className="copy-line">{copyLacksSentence(owner.name)}</p>
              ) : null}
            </div>
          </div>
        ) : null}
        {naming === null ? null : (
          <div className="program-name">
            <ReactTextField
              label="Nazwa programu"
              hint="Nazwa programu"
              error={refusal === null ? null : NAME_MESSAGES[refusal]}
              value={naming.value}
              onChange={(event) =>
                setNaming({ ...naming, value: event.target.value })
              }
              inputRef={nameInput}
            />
            <ReactButton text="Zapisz" onClick={saveName} />
          </div>
        )}
      </>
    ) : (
      <>
        {run === null ? null : (
          <p className="program-run-note">{runNoteText(run)}</p>
        )}
        <h2 className="program-title">{saved.name}</h2>
      </>
    );

  return (
    <>
      {runHead}
      <div className="program-editing" ref={editing}>
        {mode === "programs" ? (
          <TripPlanView
            key={key}
            program={content.program}
            items={offeredItems(state)}
            onCommit={actions.edit}
          />
        ) : null}
        <div
          className={
            panelStands && ruleHost === null
              ? "program-editor-layout with-panel"
              : "program-editor-layout"
          }
        >
          <div className="program-rules">
            <RuleListView
              state={state}
              program={content.program}
              counts={content.counts}
              folded={folded}
              open={open === null ? null : open.target}
              signs={copyShown ? ruleSigns(state) : null}
              onCommit={actions.edit}
              onOpen={(target) => setOpen({ key, target })}
              onFoldedChange={(groups) => folding.set(key, groups)}
            />
          </div>
          {ruleHost === null && rulePanel !== null ? (
            <div className="program-rule-panel">{rulePanel}</div>
          ) : null}
        </div>
      </div>
      {ruleHost !== null && rulePanel !== null
        ? createPortal(rulePanel, ruleHost)
        : null}
    </>
  );
}

/**
 * Builds the program panel for the screen `mode` names; the screen of a map run unless told. The
 * panel stands in an element of its own and draws when the page gives it a game state through
 * `update`. Which program it shows is the boundary's: `update` changes it at a map run started or
 * ended and for a program gone from the list, a pick on the list and `showProgram` change it, and
 * picking changes no game state. `folding` is the page's memory of folded groups, which the panels of
 * both screens read; left out, the panel has one of its own.
 */
export function createProgramPanel(
  controls: ProgramPanelControls,
  mode: ProgramPanelMode = "run",
  folding: Folding = createFolding(),
): ProgramPanel {
  const element = document.createElement("section");
  element.className = "program-panel";
  const root = createRoot(element);
  let state: GameState | null = null;
  let shown: ShownProgram = { kind: "saved", programId: 1 };
  let disposed = false;
  let ruleHost: HTMLElement | null = null;
  let onRuleOpen: ((open: boolean) => void) | undefined;
  // The rule „Dodaj regułę z tym” asked the view to open last; null until it asks.
  let opening: RulePanelOpen | null = null;

  function draw(): void {
    if (disposed || state === null) return;
    const current = state;
    flushSync(() => {
      root.render(
        <ProgramPanelView
          mode={mode}
          state={current}
          shown={shown}
          actions={actions}
          folding={folding}
          ruleHost={ruleHost}
          onRuleOpen={onRuleOpen}
          opening={opening}
        />,
      );
    });
  }

  /**
   * Text typed into an editor field and not yet committed goes to the program it was typed into: the
   * field commits when it loses focus, before the editor shows another program.
   */
  function commitEditor(): void {
    const active = element.ownerDocument.activeElement;
    const area = element.querySelector(".program-editing");
    if (
      active instanceof HTMLElement &&
      (area?.contains(active) === true || ruleHost?.contains(active) === true)
    )
      active.blur();
  }

  function show(next: ShownProgram): void {
    if (shownValue(next) !== shownValue(shown)) commitEditor();
    shown = next;
    draw();
  }

  const actions: PanelActions = {
    show,
    edit(program) {
      if (shown.kind === "copy") controls.editCopy(program);
      else controls.editProgram(shown.programId, program);
    },
    createProgram() {
      if (state === null) return;
      const programId = state.nextProgramId;
      controls.createProgram();
      if (state && programById(state.programs, programId))
        show({ kind: "saved", programId });
    },
    renameProgram: (programId, name) => controls.renameProgram(programId, name),
    deleteProgram: (programId) => controls.deleteProgram(programId),
    saveCopy: () => controls.saveCopy(),
    saveCopyAsNew: (name) => controls.saveCopyAsNew(name),
    discardCopy: () => controls.discardCopy(),
    switchProgram(programId) {
      controls.switchProgram(programId);
      show({ kind: "copy" });
    },
  };

  return {
    element,
    update(next: GameState, events: readonly GameEvent[]): void {
      const previous = state;
      state = next;
      shown =
        mode === "run"
          ? nextShown(shown, previous, next, events)
          : savedShown(next, shown);
      draw();
    },
    showProgram(programId: ProgramId): void {
      const named: ShownProgram = { kind: "saved", programId };
      const resolved = state === null ? named : savedShown(state, named);
      if (shownValue(resolved) === shownValue(shown)) return;
      show(resolved);
    },
    placeRulePanel(host: HTMLElement, onOpen: (open: boolean) => void): void {
      ruleHost = host;
      onRuleOpen = onOpen;
      draw();
    },
    addDiscoveredRule(): void {
      if (mode !== "run" || state === null) return;
      // Text typed and not yet committed goes first to the program it was typed into, so the rule
      // is built on the copy that holds it.
      commitEditor();
      const found = discoveryRule(state);
      if (found === null) return;
      shown = { kind: "copy" };
      // A new object at each call, which the view opens once, at the draw that first gives it.
      opening = found.open;
      controls.editCopy(found.program);
      draw();
    },
    dispose(): void {
      disposed = true;
      root.unmount();
      onRuleOpen?.(false);
      element.remove();
    },
  };
}
