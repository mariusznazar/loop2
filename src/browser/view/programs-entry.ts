/**
 * The entry of the screen Programy in the registry of screens (D-166, D-280, D-281, D-401, D-402):
 * the list of programs beside a program panel that shows the saved program the address names, never
 * the copy (D-166), and with no number the program the copy belonged to after „Zakończ” (D-173).
 * Built once and hidden while another screen shows. The entry holds the memories of the screen: the
 * pull of the previous save and the reset of the game. Nothing here runs when the module is imported.
 */
import type {
  AccountClient,
  AccountResult,
  PreviousSavedGame,
} from "../account-api.js";
import {
  appendPrograms,
  createProgram,
  deleteProgram,
  programById,
  renameProgram,
} from "../sim/programs.js";
import {
  readPreviousPrograms,
  type PreviousItem,
} from "../sim/previous-programs.js";
import type { GameState, ProgramId } from "../sim/types.js";
import {
  CHECK_FAILED,
  FETCH_FAILED,
  NO_PREVIOUS_SAVE,
  NOT_ALLOWED,
  pullResultLine,
} from "./previous-save-lines.js";
import {
  createProgramList,
  type PullView,
  type ResetView,
} from "./program-list.js";
import {
  createProgramPanel,
  type Folding,
  type ProgramPanelControls,
} from "./program-panel.js";
import { resolveScreen, screenAddress } from "./screen-address.js";
import type { Screen, ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

/** The reset control's state as the entry holds it (D-402): waiting, the sentence of a failure, and the confirmation. */
type ResetState = {
  readonly waiting: boolean;
  readonly sentence: string | null;
  readonly confirming: boolean;
};

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

/**
 * The pull of the previous save as Programy shows it (D-401): a memory of the page alone, never of
 * the game state or the save. It holds nothing between two showings of the screen.
 */
const NO_PULL: PullView = { control: "away", line: null };

/** Makes the entry of Programy. */
export function createProgramsEntry(
  options: ProgramsEntryOptions,
): ProgramsEntry {
  const { store } = options;
  let setReset: ProgramsEntry["setReset"] = () => undefined;

  /** The reset control as the list draws it, or none where the page gives no reset (D-402). */
  function resetViewOf(resetState: ResetState): ResetView | null {
    if (!options.previousSaveAllowed || options.onReset === undefined)
      return null;
    return {
      control: resetState.waiting ? "waiting" : "rest",
      confirming: resetState.confirming,
      line: resetState.sentence,
    };
  }

  return {
    kinds: ["programs", "program"],
    lives: "always",
    setReset: (next) => setReset(next),
    build(port) {
      let pull: PullView = NO_PULL;
      /**
       * Numbers each question of the screen and each pull, and the leaving of the screen; an answer
       * counts only while its number is the last, so an answer that comes after the player left the
       * screen, or after a later question or pull, is ignored.
       */
      let pullAsk = 0;
      /** Whether Programy was shown when `placed` last ran, so that only an entering asks. */
      let onProgramsScreen = false;
      let disposed = false;
      /**
       * The reset control of Programy as the page and the player left it (D-402): a memory of the
       * view alone, never of the game state or of a save. Each change makes a new object, so the
       * list is drawn anew only when it changed.
       */
      let resetState: ResetState = {
        waiting: false,
        sentence: null,
        confirming: false,
      };
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
        if (
          drawn?.programs === state.programs &&
          drawn.chosenId === chosenId &&
          drawn.pull === pull &&
          drawn.reset === resetState
        )
          return;
        drawn = {
          programs: state.programs,
          chosenId,
          pull,
          reset: resetState,
        };
        list.update({
          programs: state.programs,
          chosenId,
          pull,
          reset: resetViewOf(resetState),
        });
      }

      /** Changes what the list shows of the pull. */
      function setPull(next: PullView): void {
        pull = next;
        drawPrograms();
      }

      /**
       * Programy has just been shown: a privileged account's game asks the server whether a
       * previous save exists, and the button stands only for an answer of a document; while the
       * question is open the button is away, `null` leaves it away, and a failure leaves it away
       * with one sentence. An account without the privilege asks nothing and shows nothing (D-400,
       * D-401).
       */
      function askPrevious(): void {
        if (!options.previousSaveAllowed) return;
        const mine = ++pullAsk;
        setPull(NO_PULL);
        void options.client.loadPreviousSavedGame().then((result) => {
          if (disposed || mine !== pullAsk) return;
          if (!result.ok) setPull({ control: "away", line: CHECK_FAILED });
          else if (result.value === null) setPull(NO_PULL);
          else setPull({ control: "rest", line: null });
        });
      }

      /**
       * The player left Programy: what is open of the pull is dropped and its answer will be
       * ignored, and the confirmation of the reset closes (D-402).
       */
      function leavePrograms(): void {
        pullAsk += 1;
        if (pull !== NO_PULL) setPull(NO_PULL);
        if (resetState.confirming)
          setResetState({ ...resetState, confirming: false });
      }

      /** Changes the reset control's state and draws the list from it. */
      function setResetState(next: ResetState): void {
        resetState = next;
        drawPrograms();
      }

      /**
       * „Zacznij od zera” asks for its confirmation; the click changes nothing else, and nothing
       * shows where the control is not shown (D-402).
       */
      function askReset(): void {
        if (store.halted() || disposed || resetViewOf(resetState) === null)
          return;
        if (resetState.waiting || resetState.confirming) return;
        setResetState({ ...resetState, confirming: true });
      }

      /** The confirmation's withdraw: it closes and changes nothing (D-402). */
      function withdrawReset(): void {
        if (!resetState.confirming) return;
        setResetState({ ...resetState, confirming: false });
      }

      /**
       * The confirmed reset: the control waits, and the page is told once. The game sends no save
       * and no request for the reset of its own; the page makes the request and answers it through
       * `setReset`.
       */
      function confirmReset(): void {
        if (store.halted() || disposed || resetViewOf(resetState) === null)
          return;
        if (!resetState.confirming || resetState.waiting) return;
        setResetState({ waiting: true, sentence: null, confirming: false });
        options.onReset?.();
      }

      /**
       * „Wciągnij programy z poprzedniego zapisu”: the button waits and the previous save is
       * fetched again, so that the pull works on what the server holds now; its programs are read
       * one by one and the ones the editor's check accepts are appended as one act of the player,
       * which saves at once (D-207, D-401).
       */
      function pullPrevious(): void {
        if (store.halted() || disposed || pull.control !== "rest") return;
        const mine = ++pullAsk;
        setPull({ control: "waiting", line: null });
        void options.client.loadPreviousSavedGame().then((result) => {
          if (disposed || mine !== pullAsk) return;
          answerPull(result);
        });
      }

      /** What the page does with the answer of the fetch a pull made. */
      function answerPull(
        result: AccountResult<PreviousSavedGame | null>,
      ): void {
        if (store.halted()) {
          setPull({ control: "rest", line: null });
          return;
        }
        if (!result.ok) {
          const { failure } = result;
          if (failure.kind === "refused" && failure.status === 401) {
            // No session: the page keeps the game state for a sign-in to the same account (D-211).
            setPull({ control: "rest", line: null });
            options.onSignedOut();
          } else if (
            failure.kind === "refused" &&
            failure.status === 403 &&
            failure.code === "previous-save-forbidden"
          ) {
            setPull({ control: "away", line: NOT_ALLOWED });
          } else {
            setPull({ control: "rest", line: FETCH_FAILED });
          }
          return;
        }
        if (result.value === null) {
          setPull({ control: "away", line: NO_PREVIOUS_SAVE });
          return;
        }
        const read = readPreviousPrograms(result.value);
        const accepted = read.ok
          ? read.items.filter(
              (item): item is Extract<PreviousItem, { kind: "read" }> =>
                item.kind === "read",
            )
          : [];
        if (accepted.length > 0)
          store.act((take) =>
            take({
              state: appendPrograms(store.get(), accepted),
              events: [],
            }),
          );
        setPull({ control: "rest", line: pullResultLine(read) });
      }

      setReset = (next) => {
        if (disposed) return;
        setResetState({
          waiting: next.waiting,
          sentence: next.sentence,
          confirming: resetState.confirming,
        });
      };

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
        onPull: pullPrevious,
        onResetAsk: askReset,
        onResetConfirm: confirmReset,
        onResetWithdraw: withdrawReset,
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
          pull,
          reset: resetViewOf(resetState),
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
          if (onPrograms && !onProgramsScreen) askPrevious();
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
