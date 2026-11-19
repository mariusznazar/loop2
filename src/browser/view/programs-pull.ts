/**
 * The pull of the previous save as Programy holds it (D-401): a memory of the page outside React,
 * made by the entry of Programy for each building of the screen (D-407). It holds the view of the
 * pull — the button and the one line beside it — and the numbering of questions and pulls, and it
 * holds nothing between two showings of the screen. Nothing runs when the module is imported.
 */
import type {
  AccountClient,
  AccountResult,
  PreviousSavedGame,
} from "../account-api.js";
import { appendPrograms } from "../sim/programs.js";
import {
  readPreviousPrograms,
  type PreviousItem,
} from "../sim/previous-programs.js";
import {
  CHECK_FAILED,
  FETCH_FAILED,
  NO_PREVIOUS_SAVE,
  NOT_ALLOWED,
  pullResultLine,
} from "./previous-save-lines.js";
import type { PullView } from "./program-list.js";
import type { StateStore } from "./state-store.js";

/** What the pull holds when nothing of it is open: no button and no line. */
const NO_PULL: PullView = { control: "away", line: null };

export type ProgramPullOptions = {
  readonly store: Pick<StateStore, "get" | "act" | "halted">;
  /** The client the pull of the previous save fetches through. */
  readonly client: Pick<AccountClient, "loadPreviousSavedGame">;
  /** Whether the account holds the previous-save privilege (D-400); where it does not, nothing is asked. */
  readonly previousSaveAllowed: boolean;
  /** No session: the page keeps the game state for a sign-in to the same account (D-211). */
  readonly onSignedOut: () => void;
  /** Whether the screen was taken down; an answer that comes after it is ignored. */
  readonly disposed: () => boolean;
  /** Called after each change of the view, so that the screen draws the list anew. */
  readonly onChange: () => void;
};

export type ProgramPull = {
  /** What the list shows of the pull; a new object after each change. */
  readonly view: () => PullView;
  /**
   * Programy has just been shown: a privileged account's game asks the server whether a previous
   * save exists, and the button stands only for an answer of a document; while the question is open
   * the button is away, `null` leaves it away, and a failure leaves it away with one sentence. An
   * account without the privilege asks nothing and shows nothing (D-400, D-401).
   */
  readonly ask: () => void;
  /**
   * „Wciągnij programy z poprzedniego zapisu”: the button waits and the previous save is fetched
   * again, so that the pull works on what the server holds now; its programs are read one by one
   * and the ones the editor's check accepts are appended as one act of the player, which saves at
   * once (D-207, D-401).
   */
  readonly pullPrevious: () => void;
  /** The player left Programy: what is open of the pull is dropped and its answer will be ignored. */
  readonly leave: () => void;
};

/** Makes the pull of the previous save for one building of the screen Programy. */
export function createProgramPull(options: ProgramPullOptions): ProgramPull {
  const { store } = options;
  let view: PullView = NO_PULL;
  /**
   * Numbers each question of the screen and each pull, and the leaving of the screen; an answer
   * counts only while its number is the last, so an answer that comes after the player left the
   * screen, or after a later question or pull, is ignored.
   */
  let numbering = 0;

  /** Changes what the list shows of the pull. */
  function setView(next: PullView): void {
    view = next;
    options.onChange();
  }

  /** What the page does with the answer of the fetch a pull made. */
  function answerPull(result: AccountResult<PreviousSavedGame | null>): void {
    if (store.halted()) {
      setView({ control: "rest", line: null });
      return;
    }
    if (!result.ok) {
      const { failure } = result;
      if (failure.kind === "refused" && failure.status === 401) {
        // No session: the page keeps the game state for a sign-in to the same account (D-211).
        setView({ control: "rest", line: null });
        options.onSignedOut();
      } else if (
        failure.kind === "refused" &&
        failure.status === 403 &&
        failure.code === "previous-save-forbidden"
      ) {
        setView({ control: "away", line: NOT_ALLOWED });
      } else {
        setView({ control: "rest", line: FETCH_FAILED });
      }
      return;
    }
    if (result.value === null) {
      setView({ control: "away", line: NO_PREVIOUS_SAVE });
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
    setView({ control: "rest", line: pullResultLine(read) });
  }

  return {
    view: () => view,
    ask() {
      if (!options.previousSaveAllowed) return;
      const mine = ++numbering;
      setView(NO_PULL);
      void options.client.loadPreviousSavedGame().then((result) => {
        if (options.disposed() || mine !== numbering) return;
        if (!result.ok) setView({ control: "away", line: CHECK_FAILED });
        else if (result.value === null) setView(NO_PULL);
        else setView({ control: "rest", line: null });
      });
    },
    pullPrevious() {
      if (store.halted() || options.disposed() || view.control !== "rest")
        return;
      const mine = ++numbering;
      setView({ control: "waiting", line: null });
      void options.client.loadPreviousSavedGame().then((result) => {
        if (options.disposed() || mine !== numbering) return;
        answerPull(result);
      });
    },
    leave() {
      numbering += 1;
      if (view !== NO_PULL) setView(NO_PULL);
    },
  };
}
