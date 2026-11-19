import type { Account, AccountClient, AccountFailure } from "../account-api.js";
import { newGame } from "../sim/game.js";
import type { SavedGameRefusal } from "../sim/saved-game.js";
import type { GameState } from "../sim/types.js";
import type { GameView, ScreenPlace } from "./game-view.js";
import type { Logout, PageMemory, PagePlaces } from "./page-places.js";
import {
  GAME_STARTS_ANEW,
  RESET_FAILED,
  RESET_NOT_ALLOWED,
} from "./previous-save-lines.js";
import { screenAddress } from "./screen-address.js";

/**
 * The acts of the start page on a standing game: the logout of the menu „Konto” (D-97), the reset
 * of the game (D-402), the holding of the saver's outcomes while either waits, and the game's place
 * (D-280, D-286). The functions receive the page as a parameter; what they call back in the page
 * (`app.ts`) comes through it, so this module imports nothing of `app.ts`.
 */

const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";

/** The server's answer that this browser has no valid session: the player is signed out. */
export function signedOut(failure: AccountFailure): boolean {
  return failure.kind === "refused" && failure.status === 401;
}

/** What a game is built from: its state, the revision it is based on, and a refused save. */
export type GameStart = {
  readonly state: GameState;
  readonly revision: number;
  readonly refused: SavedGameRefusal | null;
};

/** What the acts on a standing game call back in the page. */
export type PageCalls = {
  /** No session for a save: the current state stays in the page for the same account (D-211). */
  expire(): void;
  /** The card, with `sentence` in `warning` where one is given, else the notice that waits. */
  showForms(sentence: string | null): void;
  /** Gives the card the focus, where a card stands. */
  focusCard(): void;
  /** Another browser saved first: this game goes and the server's save is loaded (D-209). */
  reloadAfterConflict(): void;
  /** Builds the game of `owner` from `start`, saved at once where `saveAtOnce` says so. */
  showGame(owner: Account, start: GameStart, saveAtOnce: boolean): void;
};

/** What the acts on a standing game share with the page. */
export type GameActsPage = {
  readonly places: PagePlaces;
  readonly memory: PageMemory;
  readonly client: AccountClient;
  readonly calls: PageCalls;
};

/** The game's place: at its first screen, while the game is being built, the page only keeps it. */
export function onPlace(
  places: PagePlaces,
  view: GameView,
  next: ScreenPlace,
): void {
  const current = places.gameOf(view);
  if (current === null) return;
  // At a change of screen the sentences above the first screen leave (D-286).
  const changed =
    current.place !== null &&
    screenAddress(current.place.screen) !== screenAddress(next.screen);
  places.change({
    ...current,
    place: next,
    notices: changed ? [] : current.notices,
  });
}

/**
 * An outcome of the saver acts now, after the answer to a logout under way, or, while the reset
 * waits, only if the reset fails (D-402): the held outcome then goes through here again.
 */
export function whenNotBusy(
  places: PagePlaces,
  view: GameView,
  action: () => void,
): void {
  const current = places.gameOf(view);
  if (current === null) return;
  if (current.reset.kind === "waiting")
    places.change({
      ...current,
      reset: { kind: "waiting", held: () => whenNotBusy(places, view, action) },
    });
  else if (current.logout.kind === "ending")
    places.change({
      ...current,
      logout: {
        kind: "ending",
        held: () => whenNotBusy(places, view, action),
      },
    });
  else action();
}

/** Sets the logout of the game `view`, where the page still holds it. */
function setLogout(places: PagePlaces, view: GameView, logout: Logout): void {
  const current = places.gameOf(view);
  if (current !== null) places.change({ ...current, logout });
}

/**
 * „Wyloguj” of the menu: the page saves first, then ends the session. The bar shows the waiting
 * and, after an uncertain end, the sentence; the failed save before a logout stays in the line of
 * saving under the bar (D-97, D-208).
 */
export function logOut(page: GameActsPage): void {
  const { places, memory, client, calls } = page;
  const current = places.shown();
  if (
    current.kind !== "game" ||
    current.logout.kind !== "idle" ||
    current.reset.kind !== "idle"
  )
    return;
  const { view } = current;
  void (async () => {
    const mine = ++memory.latest;
    places.change({ ...current, logout: { kind: "saving" } });
    const save = await view.saveBeforeLogout();
    if (mine !== memory.latest || places.gameOf(view) === null) return;
    if (save.kind === "failed") {
      // The saver's line asks the player to log out again; its retries go on.
      setLogout(places, view, { kind: "idle", sentence: null });
      return;
    }
    if (save.kind === "signed-out") {
      calls.expire();
      return;
    }
    setLogout(places, view, { kind: "ending", held: null });
    const result = await client.logout();
    const ending = places.gameOf(view)?.logout;
    const later = ending?.kind === "ending" ? ending.held : null;
    if (mine !== memory.latest) return;
    if (result.ok || signedOut(result.failure)) {
      calls.showForms(save.kind === "outdated" ? OUTDATED : null);
      calls.focusCard();
      return;
    }
    // A reset that succeeded meanwhile built a new game: this uncertain end concerns the old one,
    // so the new game gets neither its sentence nor a reload for the old game's lost save.
    if (places.gameOf(view) === null) return;
    // The server may or may not have ended the session: the game stays, and so does „Wyloguj”.
    setLogout(places, view, {
      kind: "idle",
      sentence: result.failure.message,
    });
    // A save that lost to another browser leaves this game behind the server's save (D-209).
    if (save.kind === "conflict") calls.reloadAfterConflict();
    else later?.();
  })();
}

/**
 * „Zacznij od zera” confirmed: the page sends no save of its own, since programs are saved right
 * after each edit (D-207), and asks the server to move the saved game state to the previous save.
 * While it waits the outcomes of the old game's saver are held and „Wyloguj” is not pressable
 * (D-402). On 204 the game is replaced by a new one built as for an account with no save, with no
 * save sent at once and one sentence above it; no session goes as for a save (D-211); a refusal of
 * the privilege and any other failure each have a sentence beside the control, the game stays
 * and a held outcome is acted on (D-402).
 */
export function resetGame(page: GameActsPage): void {
  const { places, memory, client, calls } = page;
  const current = places.shown();
  if (current.kind !== "game" || current.reset.kind !== "idle") return;
  const { view, account: owner } = current;
  places.change({ ...current, reset: { kind: "waiting", held: null } });
  void (async () => {
    const result = await client.resetSavedGame();
    // The game left the page meanwhile (a logout, a sign-in elsewhere): nothing here concerns it.
    const now = places.gameOf(view);
    if (now === null) return;
    if (result.ok) {
      memory.pendingNotice = { text: GAME_STARTS_ANEW, role: "positive" };
      memory.entry = "address";
      calls.showGame(
        owner,
        { state: newGame(), revision: 0, refused: null },
        false,
      );
      return;
    }
    if (signedOut(result.failure)) {
      calls.expire();
      return;
    }
    const { failure } = result;
    const forbidden =
      failure.kind === "refused" &&
      failure.status === 403 &&
      failure.code === "previous-save-forbidden";
    view.setReset({
      waiting: false,
      sentence: forbidden ? RESET_NOT_ALLOWED : RESET_FAILED,
    });
    const held = now.reset.kind === "waiting" ? now.reset.held : null;
    places.change({ ...now, reset: { kind: "idle" } });
    held?.();
  })();
}
