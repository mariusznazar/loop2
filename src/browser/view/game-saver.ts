/**
 * The saver of the game state on the server (D-207, D-208, D-209, D-210, D-211, D-97): one save
 * request at a time, every moment of saving during one coalesced into one more save after its
 * answer, except a moment asked for during the save before a logout that goes on, which is
 * dropped (D-207); a check every 30 real seconds, made only while a manual map run passes, and at a
 * hidden page, that sends only a changed state; each document holding the clock's moment as its save time, which changes no state
 * (D-231); and the header sentence of what the player sees of saving. It is created with the game
 * and disposed with it; nothing here runs when the module is imported.
 */
import type { AccountClient, SaveOutcome } from "../account-api.js";
import { withSaveTime } from "../sim/game.js";
import { savedGame } from "../sim/saved-game.js";
import type { GameState } from "../sim/types.js";
import { createFormWarning } from "./controls/text-field.js";

const RETRYING = "Nie udało się zapisać postępu. Gra spróbuje ponownie.";
const TOO_LARGE =
  "Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.";
const CONFLICT =
  "Gra została zapisana w innej przeglądarce. Wczytano ten zapis.";
const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";
const LOGOUT_FAILED =
  "Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.";

/** The rhythm of the check for changes, in real milliseconds (D-207). */
const CHECK_MS = 30_000;
/** The waits before each retry after a failed save; the last one repeats (D-208). */
const RETRY_MS = [5_000, 10_000, 20_000, 30_000] as const;

export type GameSaverOptions = {
  /** The account client, whose save sends its request with `keepalive`. */
  readonly client: Pick<AccountClient, "saveGame">;
  /** The current game state; the page passes the clock's real time to the simulation first. */
  readonly read: () => GameState;
  /** The real moment of the clock's latest reading, the one `read` has just made (D-231). */
  readonly moment: () => number;
  /**
   * A manual map run passes now: present, not ended, not paused. The 30-second rhythm checks only
   * then; the earning loops are saved at the player's acts, at the end of each of their map runs and
   * at a hidden page (D-207). `check` itself and the hidden page do not ask it.
   */
  readonly runPasses: () => boolean;
  /** The state the game was built on, held as already saved at `revision`. */
  readonly state: GameState;
  /** The revision of the saved game state the game was built on; 0 when the server held none. */
  readonly revision: number;
  /**
   * The game was built from the server's save after a conflict, so „Gra została zapisana w innej
   * przeglądarce. Wczytano ten zapis.” stands from the start until a save succeeds (D-209).
   */
  readonly afterConflict?: boolean;
  /** Another browser saved first: the page drops this game and loads the server's save. */
  onConflict(): void;
  /** The server holds a newer version: the saver has stopped for good; the game stays. */
  onOutdated(): void;
  /** No session: the page keeps the current state for the same account and removes the game. */
  onSignedOut(): void;
};

/**
 * What the save before logout came to; logout goes on for every kind but `failed` (D-97).
 * `outdated` is also the answer of a saver already stopped as outdated, which sends nothing.
 */
export type LogoutSave = {
  readonly kind:
    "saved" | "conflict" | "too-large" | "outdated" | "signed-out" | "failed";
};

export type GameSaver = {
  /** The header sentence of saving, in the role `warning`; hidden while there is none. */
  readonly element: HTMLElement;
  /**
   * A moment of saving: sends the current state, at once or after the request in flight, except
   * when that request is the save before a logout that goes on (D-207).
   */
  moment(): void;
  /** Sends the current state only where it is not the one last sent; nothing during a request. */
  check(): void;
  /**
   * Waits for the request in flight, sends the current state and reports the outcome; the page
   * callbacks are not called for it. On a failure the retries go on, the header sentence then
   * asking the player to log out again. A saver that stopped reports why without sending; a
   * disposed one sends nothing and reports a failure.
   */
  saveBeforeLogout(): Promise<LogoutSave>;
  /** The revision of the saved game state the saver last saw. */
  revision(): number;
  /** Stops the saver for good: its timers and its listener go, and later answers are ignored. */
  dispose(): void;
};

export function createGameSaver(options: GameSaverOptions): GameSaver {
  const { client, read } = options;
  const warning = createFormWarning();
  /** The state of the request last sent, or the state the game was built on. */
  let baseline = options.state;
  let revision = options.revision;
  let inFlight = false;
  /** A moment came while a request was in flight. */
  let pending = false;
  /** Failed saves one after another, which choose the wait before the next retry. */
  let failures = 0;
  let retry: ReturnType<typeof setTimeout> | null = null;
  /** The saver sends nothing any more: outdated, or the game is being dropped. */
  let halted: "conflict" | "outdated" | "signed-out" | null = null;
  let disposed = false;
  /** A logout failed, so failures meanwhile keep its sentence. */
  let logoutFailed = false;
  /** The save before logout waiting for its outcome, and whether its request is sent. */
  let logout: {
    resolve(save: LogoutSave): void;
    readonly promise: Promise<LogoutSave>;
    sent: boolean;
  } | null = null;

  warning.set(options.afterConflict ? CONFLICT : null);

  const cancelRetry = (): void => {
    if (retry !== null) clearTimeout(retry);
    retry = null;
  };

  const scheduleRetry = (): void => {
    const wait = RETRY_MS[Math.min(failures, RETRY_MS.length) - 1];
    retry = setTimeout(() => {
      retry = null;
      sendNow(false);
    }, wait);
  };

  const sendNow = (forLogout: boolean): void => {
    cancelRetry();
    pending = false;
    inFlight = true;
    const state = read();
    // The state read stays the baseline: only its document holds the save time (D-231).
    baseline = state;
    const stamped = withSaveTime(state, options.moment());
    void client
      .saveGame({ ...savedGame(stamped), basedOn: revision })
      .then((outcome) => answered(outcome, forLogout));
  };

  const finishLogout = (save: LogoutSave): void => {
    const waiting = logout;
    logout = null;
    waiting?.resolve(save);
  };

  /** The outcomes that end saving: the page's callback, or the logout's report while it waits. */
  const halt = (kind: "conflict" | "outdated" | "signed-out"): void => {
    halted = kind;
    pending = false;
    cancelRetry();
    if (kind === "outdated") warning.set(OUTDATED);
    if (logout !== null) {
      finishLogout({ kind });
      return;
    }
    if (kind === "conflict") options.onConflict();
    else if (kind === "outdated") options.onOutdated();
    else options.onSignedOut();
  };

  const answered = (outcome: SaveOutcome, forLogout: boolean): void => {
    if (disposed) return;
    inFlight = false;
    if (outcome.kind === "conflict" || outcome.kind === "outdated") {
      halt(outcome.kind);
      return;
    }
    if (outcome.kind === "signed-out") {
      halt("signed-out");
      return;
    }
    if (outcome.kind === "saved") {
      revision = outcome.revision;
      failures = 0;
      logoutFailed = false;
      warning.set(null);
    } else if (outcome.kind === "too-large") {
      failures = 0;
      logoutFailed = false;
      warning.set(TOO_LARGE);
    } else {
      failures += 1;
      if (forLogout) logoutFailed = true;
      warning.set(logoutFailed ? LOGOUT_FAILED : RETRYING);
    }
    if (logout !== null && !logout.sent) {
      // The request the logout waited for has its answer: the logout's own save goes now.
      logout.sent = true;
      sendNow(true);
      return;
    }
    if (forLogout) {
      finishLogout({ kind: outcome.kind });
      // The logout goes on, and its session's end takes the game away, so the moment asked for
      // during this save is dropped (D-207). The saver goes on: when the logout's request
      // fails, the game stays and later moments and checks still send.
      if (outcome.kind !== "failed") {
        pending = false;
        return;
      }
    }
    if (pending) sendNow(false);
    else if (outcome.kind === "failed") scheduleRetry();
  };

  const check = (): void => {
    if (disposed || halted !== null || inFlight) return;
    if (read() !== baseline) sendNow(false);
  };

  const onVisibility = (): void => {
    if (document.visibilityState === "hidden") check();
  };

  const interval = setInterval(() => {
    if (options.runPasses()) check();
  }, CHECK_MS);
  document.addEventListener("visibilitychange", onVisibility);

  return {
    element: warning.element,
    moment() {
      if (disposed || halted !== null) return;
      if (inFlight) pending = true;
      else sendNow(false);
    },
    check,
    saveBeforeLogout() {
      if (logout !== null) return logout.promise;
      if (halted !== null) return Promise.resolve({ kind: halted });
      if (disposed) return Promise.resolve({ kind: "failed" });
      let resolve: (save: LogoutSave) => void = () => {};
      const promise = new Promise<LogoutSave>((done) => (resolve = done));
      logout = { resolve, promise, sent: false };
      if (!inFlight) {
        logout.sent = true;
        sendNow(true);
      }
      return promise;
    },
    revision: () => revision,
    dispose() {
      disposed = true;
      cancelRetry();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    },
  };
}
