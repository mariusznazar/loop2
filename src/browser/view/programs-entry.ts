/**
 * The entry of the screen Programy in the registry of screens (D-166, D-280, D-281, D-401, D-402):
 * the list of programs beside a program panel that shows the saved program the address names, never
 * the copy (D-166), and with no number the program the copy belonged to after „Zakończ” (D-173).
 * Built once and hidden while another screen shows. The entry holds the memories of the screen: the
 * pull of the previous save (`programs-pull.ts`) and the reset of the game (`programs-reset.ts`).
 * Nothing here runs when the module is imported.
 */
import type { AccountClient } from "../account-api.js";
import {
  createProgram,
  deleteProgram,
  programById,
  renameProgram,
} from "../sim/programs.js";
import type { GameState, ProgramId } from "../sim/types.js";
import { createProgramList, type PullView } from "./program-list.js";
import {
  createProgramPanel,
  type Folding,
  type ProgramPanelControls,
} from "./program-panel.js";
import { createProgramPull } from "./programs-pull.js";
import { createProgramReset, type ResetState } from "./programs-reset.js";
import { resolveScreen, screenAddress } from "./screen-address.js";
import type { Screen, ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type ProgramsEntryOptions = {
  readonly store: Pick<StateStore, "get" | "act" | "halted">;
  /** The acts of the program panel, shared with Przejście. */
  readonly acts: ProgramPanelControls;
  /** The memory of the folding of rule groups, shared with Przejście (D-295). */
  readonly folding: Folding;
  /** The client the pull of the previous save fetches through. */
  readonly client: Pick<AccountClient, "loadPreviousSavedGame">;
  /** Whether the account holds the previous-save privilege (D-400); where it does not, nothing is asked. */
  readonly previousSaveAllowed: boolean;
  /** The page's act of a confirmed „Zacznij od zera” (D-402); left out, the game shows no reset control. */
  readonly onReset?: () => void;
  /** No session: the page keeps the game state for a sign-in to the same account (D-211). */
  readonly onSignedOut: () => void;
};

export type ProgramsEntry = ScreenEntry & {
  /** Sets what the reset control shows (D-402); the page calls it from the game's `setReset`. */
  setReset(next: { waiting: boolean; sentence: string | null }): void;
};

/** Makes the entry of Programy. */
export function createProgramsEntry(
  options: ProgramsEntryOptions,
): ProgramsEntry {
  const { store } = options;
  let setReset: ProgramsEntry["setReset"] = () => undefined;

  return {
    kinds: ["programs", "program"],
    lives: "always",
    setReset: (next) => setReset(next),
    build(port) {
      /** Whether Programy was shown when `placed` last ran, so that only an entering asks. */
      let onProgramsScreen = false;
      let disposed = false;
      /** What the list was last drawn from, so a game minute that changes no program redraws nothing. */
      let drawn: {
        programs: GameState["programs"];
        chosenId: ProgramId;
        pull: PullView;
        reset: ResetState;
      } | null = null;

      /**
       * The saved program Programy shows for `screen`: the one its address names; for `#/programy`
       * the program the copy of the last map run belonged to, which the counts stand beside from
       * „Zakończ” to the next send (D-173, D-93), or the first of the list where none does; and the
       * first where the one named is gone (D-281).
       */
      function programShownOn(screen: Screen): ProgramId {
        const state = store.get();
        const named =
          screen.kind === "program"
            ? screen.programId
            : (state.countsProgram ?? state.programs[0].id);
        return programById(state.programs, named)
          ? named
          : state.programs[0].id;
      }

      /** Gives the program panel and the list of Programy the program they show. */
      function drawPrograms(): void {
        const state = store.get();
        const chosenId = programShownOn(port.current());
        panel.showProgram(chosenId);
        const pullView = pull.view();
        const resetState = reset.state();
        if (
          drawn?.programs === state.programs &&
          drawn.chosenId === chosenId &&
          drawn.pull === pullView &&
          drawn.reset === resetState
        )
          return;
        drawn = {
          programs: state.programs,
          chosenId,
          pull: pullView,
          reset: resetState,
        };
        list.update({
          programs: state.programs,
          chosenId,
          pull: pullView,
          reset: reset.view(),
        });
      }

      // The pull of the previous save and the reset control hold their own memories (D-401, D-402);
      // each change of either draws the list anew.
      const pull = createProgramPull({
        store,
        client: options.client,
        previousSaveAllowed: options.previousSaveAllowed,
        onSignedOut: options.onSignedOut,
        disposed: () => disposed,
        onChange: drawPrograms,
      });
      const reset = createProgramReset({
        store,
        previousSaveAllowed: options.previousSaveAllowed,
        onReset: options.onReset,
        disposed: () => disposed,
        onChange: drawPrograms,
      });
      setReset = reset.set;

      /**
       * The player left Programy: what is open of the pull is dropped and its answer will be
       * ignored, and the confirmation of the reset closes (D-402).
       */
      function leavePrograms(): void {
        pull.leave();
        reset.leave();
      }

      const section = document.createElement("section");
      section.className = "screen programs-screen";
      section.tabIndex = -1;
      // The panel of Programy shows a saved program, which the list beside it and the address name.
      const panel = createProgramPanel(
        options.acts,
        "programs",
        options.folding,
      );
      panel.element.classList.add("screen-area");
      // The list of programs on Programy. A pick is a link to the program's address, which the
      // address listener turns into the screen; the list's acts go to the simulation (D-166, D-167,
      // D-169).
      const list = createProgramList({
        onPull: pull.pullPrevious,
        onResetAsk: reset.ask,
        onResetConfirm: reset.confirm,
        onResetWithdraw: reset.withdraw,
        onCreate() {
          const made: { id: ProgramId | null } = { id: null };
          store.act((take) => {
            made.id = store.get().nextProgramId;
            take(createProgram(store.get()));
          });
          const { id } = made;
          if (id !== null && programById(store.get().programs, id))
            port.show({ kind: "program", programId: id }, "go");
        },
        onRename(programId, name) {
          store.act((take) =>
            take(renameProgram(store.get(), programId, name)),
          );
        },
        onDelete(programId) {
          store.act((take) => take(deleteProgram(store.get(), programId)));
          // The program shown may be the one gone: the nearest screen opens in its place (D-281).
          const here = port.current();
          // The screen shown is a program or the list of programs: neither names the list of accounts, so no role is asked.
          const nearest = resolveScreen(here, store.get(), false);
          if (screenAddress(nearest) !== screenAddress(here))
            port.show(nearest, "replace");
          port.focusIfLost();
        },
        props: {
          programs: store.get().programs,
          chosenId: null,
          pull: pull.view(),
          reset: reset.view(),
        },
      });
      list.element.classList.add("screen-area");
      // Programy has two areas, the list and the program panel; an open rule's panel stands in the
      // panel's rule list, under the row or header it changes (D-288, D-282).
      section.append(list.element, panel.element);

      return {
        element: section,
        // An editor field of Programy that has focus commits its text when it loses focus, to the
        // program it was typed into; the commit is made before the screen or the program changes.
        commit() {
          const active = document.activeElement;
          if (active && section.contains(active))
            (active as HTMLElement).blur();
        },
        // Only an entering of Programy asks about the previous save; a change of program on it does
        // not.
        placed(screen) {
          const onPrograms =
            screen.kind === "programs" || screen.kind === "program";
          if (onPrograms && !onProgramsScreen) pull.ask();
          else if (!onPrograms && onProgramsScreen) leavePrograms();
          onProgramsScreen = onPrograms;
          drawPrograms();
        },
        drawResult(events) {
          panel.update(store.get(), events);
          drawPrograms();
        },
        drawReading: () => undefined,
        dispose() {
          disposed = true;
          list.dispose();
          panel.dispose();
        },
      };
    },
  };
}
