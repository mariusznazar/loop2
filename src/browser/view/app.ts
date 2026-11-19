import {
  createAccountClient,
  type Account,
  type AccountClient,
  type AccountFailure,
  type ConfirmationMessage,
} from "../account-api.js";
import { newGame } from "../sim/game.js";
import { loadSavedGame, type SavedGameRefusal } from "../sim/saved-game.js";
import type { GameState } from "../sim/types.js";
import { createAccountCard, type AccountCardReset } from "./account-card.js";
import {
  browserAddress,
  confirmFromAddress,
  readConfirmationToken,
  type ConfirmationNotice,
  type PageAddress,
} from "./email-confirmation.js";
import {
  createGameView,
  type GameEntry,
  type GameView,
  type KeptGame,
  type ScreenPlace,
} from "./game-view.js";
import { errorWords, installLastResort } from "./last-resort.js";
import { createPagePlaces, type Logout } from "./page-places.js";
import type { PageSentenceValue } from "./page-sentences.js";
import { readResetToken, type ResetEnding } from "./password-reset.js";
import {
  GAME_STARTS_ANEW,
  RESET_FAILED,
  RESET_NOT_ALLOWED,
} from "./previous-save-lines.js";
import { screenAddress } from "./screen-address.js";

const EXPIRED = "Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.";
const PASSWORD_CHANGED = "Hasło zmienione. Zaloguj się nowym hasłem.";
const LINK_INVALID = "Odnośnik jest nieważny albo wygasł.";
const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";
const OTHER_VERSION =
  "Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.";
/** The one-time sentence above a new game that replaces a refused save (D-96). */
const REFUSED_LOAD: Readonly<Record<SavedGameRefusal, string>> = {
  version: OTHER_VERSION,
  archetype: OTHER_VERSION,
  shape: "Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.",
};
/** The sentence of a load that met an error of the code: it refused nothing, so nothing is replaced. */
const LOAD_FAILED = "Nie udało się wczytać gry. Spróbuj ponownie.";
/** What the waiting screen says while the page asks the server whom this browser is signed in as. */
const CHECKING_SESSION = "Sprawdzanie logowania…";
/** What the waiting screen says while the page sends the confirmation token of its address. */
const CONFIRMING_ADDRESS = "Potwierdzanie adresu…";
/** The server's answer that this browser has no valid session: the player is signed out. */
function signedOut(failure: AccountFailure): boolean {
  return failure.kind === "refused" && failure.status === 401;
}

/** What a game is built from: its state, the revision it is based on, and a refused save. */
type GameStart = {
  readonly state: GameState;
  readonly revision: number;
  readonly refused: SavedGameRefusal | null;
};

/** The console line of a load that met an error of the code: its kind and code, never its text. */
function recordLoadFailure(error: unknown, accountId: string): void {
  const { kind, code } = errorWords(error);
  console.error(
    `saved-game-load kind=${kind} code=${code} place=view/app.startFrom accountId=${accountId}`,
  );
}

/**
 * The game a saved document gives through the load, a new game where the load refuses it, or none
 * where the load meets an error of the code, which refused nothing, so that a new game would be
 * saved over a save that may be whole (D-213).
 */
function startFrom(
  document: unknown,
  revision: number,
  owner: Account,
): GameStart | null {
  try {
    const loaded = loadSavedGame(document);
    return loaded.ok
      ? { state: loaded.state, revision, refused: null }
      : { state: newGame(), revision, refused: loaded.reason };
  } catch (error) {
    recordLoadFailure(error, owner.id);
    return null;
  }
}

/**
 * Builds the page in `root`: the header with the menu bar and the place of the screen.
 * The page first asks the server whom this browser is signed in as and shows only that it is
 * asking; once the server names an account, it goes on asking for the account's saved game state,
 * and only that answer builds the game: a new game where there is none, else the game the load
 * gives. The login card comes only once the server says there is no session, and while it stands
 * nothing else does: it stands in `root` beside those two, which are hidden (D-262). Any other
 * answer is a warning with „Spróbuj ponownie”, which repeats both requests, never a guess, and so
 * is a load that meets an error of the code: it builds no game, so nothing is saved. The menu bar
 * (D-280) holds the game's name alone while no game stands, and over the game the items and the menu
 * „Konto”. „Wyloguj” in that menu saves the game state, then ends this browser's session; the game
 * leaves the page only when the server confirms it, and stays with the sentence of the uncertain
 * outcome in the menu, which stays open (D-97, D-285). The page runs that logout and gives the bar
 * its waiting and its sentence; the bar sends „Wyślij ponownie” itself, starting with the outcome
 * of the registration's message where the sign-in followed one (D-157).
 * One transition runs at a time, and an answer that comes after the page moved on is ignored.
 *
 * What the page shows is one value of three kinds — the waiting screen, the card, the game with its
 * account, its place, its sentences, its logout and its reset — which the page changes only through
 * one function; that function closes the card or the game the next value no longer holds and draws
 * the header, the place of the screen, the page's sentences above the game and the bar from the value.
 *
 * The game shows one screen at a time, the one its address names (D-280, D-281); the page tells it
 * which entry built it — the sign-in form, an emailed link or the address itself — which picks the
 * first screen (D-96, D-225), and the game tells the page its place, which the page gives the bar
 * to mark, with „Wróć do przejścia” where a map run waits.
 *
 * For an account with the previous-save privilege the page gives the game the act of „Zacznij od
 * zera” (D-402): after the player's confirmation it sends the reset, with no save of its own before
 * it, and while it waits holds the old saver's outcomes, which it acts on only if the reset fails, and
 * leaves „Wyloguj” not pressable; on 204 it replaces the game with a new one on revision 0, saved
 * only at the player's first act, under one sentence that the previous game waits as the previous save.
 *
 * Under the bar, on a line of its own, stands the line of saving (D-208), which shows only at a
 * problem, the sentence of a failed save before a logout (D-97) included. When the page's
 * address carries a confirmation token, the page first sends it — showing „Potwierdzanie adresu…”
 * where it shows the session check — and only then checks the session; the result stands as one
 * sentence on the first screen that check leads to, and leaves at the next change between card and
 * game (D-261) or at the game's first change of screen (D-286). When the address carries a
 * password-reset token instead, the page places the card on „Ustaw nowe hasło” and stops: it asks
 * nothing, builds no game and saves nothing, whoever is signed in, until the form ends (D-225). A
 * save answered with no session keeps the game state in this page only, for a sign-in to the same
 * account (D-211).
 *
 * An error that no code of the game handled — an exception, a rejected promise — reaches the
 * window; the page cancels it, writes one line of it in the console (`last-resort.ts`) and says
 * „Coś w grze się zepsuło — odśwież stronę.” until the page is reloaded: on the line under the bar,
 * beside the line of saving, on every screen with the header — a row drawn when the page starts, in
 * a root of its own, hidden, which the error only shows; in the card, under the form; and,
 * where React has taken the card down, alone in its place. The game then takes no change but goes
 * on saving the state it held, and no game is built after the error: a sign-in stays at the waiting
 * screen with the sentence (D-323, D-262).
 */
export function startApp(
  root: HTMLElement,
  client: AccountClient = createAccountClient(),
  address: PageAddress = browserAddress(),
): void {
  // The places of the page and what they show: the header with the bar and the row of the failure,
  // and `main` with the sentences and the waiting screen (D-262, D-407). The bar's „Wyloguj” and the
  // waiting screen's retry call back into the page; neither runs before the page has started.
  const places = createPagePlaces({
    root,
    client,
    waiting: { kind: "asking", text: CHECKING_SESSION },
    onLogout: () => logOut(),
    onRetry: () => {
      void checkSession();
    },
  });
  const { failureRow, change, gameOf, shown } = places;

  // The result of a confirmation from the address, until the first screen shows it.
  let pendingNotice: ConfirmationNotice | null = null;
  // The outcome of a registration's first message, until the game it leads to is built.
  let pendingMessage: ConfirmationMessage | null = null;
  // The game about to be built replaces one that lost a conflict to another browser (D-209).
  let afterConflict = false;
  // How the page comes to build the next game, which picks its first screen; the page opens at its
  // address, and a retry of the session check keeps the entry it had.
  let entry: GameEntry = "address";
  // The game state a save answered with no session left, kept in this page only (D-211).
  let kept: (KeptGame & { readonly accountId: string }) | null = null;
  // Each request of the page takes the next number; an answer counts only while it is the last.
  let latest = 0;
  // An error nothing handled came: the game takes no change and the sentence stands, until the page
  // is reloaded (D-323).
  let failed = false;
  // The card that the session check shows after a refused link or „Anuluj” takes the focus, until a
  // card or a game is shown (D-381); a retry of the check keeps it.
  let focusCardOnForms = false;

  /**
   * An error nothing handled: the page shows the sentence of the failure, stops the game and tells
   * the card, its line already written. It may be called from inside React's work, so it renders
   * nothing: showing the row is one attribute of an element the page owns (D-323, D-407).
   */
  function onUncaught(): void {
    failed = true;
    failureRow.show();
    const state = shown();
    if (state.kind === "game") state.view.halt();
    if (state.kind === "card") state.card.fail();
  }
  /**
   * Sends a line the page wrote to the server (D-356). The result is ignored, and a failing client,
   * a test double included, must not become an error of the last-resort handler.
   */
  function reportLine(kind: string, code: string, place: string): void {
    try {
      client.reportBrowserFailure(kind, code, place).catch(() => undefined);
    } catch {
      // Nothing to do: the line is already written and the page goes on.
    }
  }
  const lastResort = installLastResort({
    target: window,
    onUncaught,
    onLine: reportLine,
  });

  /** The notice to stand on the screen about to be shown, once; nothing after that. */
  function takeNotice(): ConfirmationNotice | null {
    const notice = pendingNotice;
    pendingNotice = null;
    return notice;
  }

  /** The game leaves before the next is built, so that a new game finds no old one on the address. */
  function leaveGame(): void {
    if (shown().kind !== "game") return;
    change({
      kind: "checking",
      waiting: { kind: "asking", text: CHECKING_SESSION },
    });
  }

  /** Puts a new card in place of the page, any card before it closed by `change` (D-262). */
  function placeCard(
    sentence: ConfirmationNotice | null,
    reset: AccountCardReset | null,
  ): void {
    const card = createAccountCard({
      client,
      sentence,
      reset,
      signedIn(named, message): void {
        pendingMessage = message;
        entry = "sign-in";
        enter(named);
      },
      failed,
      onUncaught(error): void {
        lastResort.report(error, "view/account-card.createAccountCard");
      },
    });
    change({ kind: "card", card });
  }

  /** Gives the card the focus, where a card stands. */
  function focusCard(): void {
    const state = shown();
    if (state.kind === "card") state.card.focus();
  }

  /**
   * The waiting screen while the page asks the server, the warning of a retry cleared: once a
   * refusal was shown, „Spróbuj ponownie” waits until the waiting screen is left.
   */
  function waitForServer(text: string = CHECKING_SESSION): void {
    const state = shown();
    const retrying =
      state.kind === "checking" &&
      (state.waiting.kind === "refused" || state.waiting.kind === "retrying");
    change({
      kind: "checking",
      waiting: retrying ? { kind: "retrying" } : { kind: "asking", text },
    });
  }

  function askingFailed(message: string): void {
    change({
      kind: "checking",
      waiting: { kind: "refused", sentence: message },
    });
  }

  /** A load that met an error of the code: the waiting screen with its warning and its retry. */
  function loadFailed(): void {
    askingFailed(LOAD_FAILED);
  }

  /** The game's place: at its first screen, while the game is being built, the page only keeps it. */
  function onPlace(view: GameView, next: ScreenPlace): void {
    const current = gameOf(view);
    if (current === null) return;
    // At a change of screen the sentences above the first screen leave (D-286).
    const changed =
      current.place !== null &&
      screenAddress(current.place.screen) !== screenAddress(next.screen);
    change({
      ...current,
      place: next,
      notices: changed ? [] : current.notices,
    });
  }

  /**
   * An outcome of the saver acts now, after the answer to a logout under way, or, while the reset
   * waits, only if the reset fails (D-402): the held outcome then goes through here again.
   */
  function whenNotBusy(view: GameView, action: () => void): void {
    const current = gameOf(view);
    if (current === null) return;
    if (current.reset.kind === "waiting")
      change({
        ...current,
        reset: { kind: "waiting", held: () => whenNotBusy(view, action) },
      });
    else if (current.logout.kind === "ending")
      change({
        ...current,
        logout: { kind: "ending", held: () => whenNotBusy(view, action) },
      });
    else action();
  }

  function showGame(
    owner: Account,
    start: GameStart,
    saveAtOnce: boolean,
  ): void {
    if (failed) {
      // After an error nothing handled no game is built, so no catch-up passes time and nothing is
      // saved: the page stays at the waiting screen with the sentence of the failure (D-323).
      change({ kind: "checking", waiting: { kind: "stopped" } });
      return;
    }
    leaveGame();
    const conflict = afterConflict && start.refused === null;
    afterConflict = false;
    focusCardOnForms = false;
    const message = pendingMessage;
    pendingMessage = null;
    // The game tells its first place while it is built, before the page holds it.
    let building = true;
    let first: ScreenPlace | null = null;
    const view: GameView = createGameView({
      client,
      previousSaveAllowed: owner.previousSaveAllowed,
      role: owner.role,
      state: start.state,
      revision: start.revision,
      afterConflict: conflict,
      address,
      entry,
      onScreen(next) {
        if (building) first = next;
        else onPlace(view, next);
      },
      ...(owner.previousSaveAllowed ? { onReset: () => resetGame() } : {}),
      onConflict: () => whenNotBusy(view, () => reloadAfterConflict()),
      onOutdated: () => {},
      onSignedOut: () => whenNotBusy(view, () => expire()),
    });
    building = false;
    const notice = takeNotice();
    const notices: PageSentenceValue[] = notice === null ? [] : [notice];
    if (start.refused !== null)
      notices.push({
        text: REFUSED_LOAD[start.refused],
        role: "refused-load",
      });
    change({
      kind: "game",
      view,
      account: owner,
      place: first,
      notices,
      message,
      logout: { kind: "idle", sentence: null },
      reset: { kind: "idle" },
    });
    // A refused save is replaced at once, so its sentence does not come back (D-96).
    if (saveAtOnce || start.refused !== null) view.saveNow();
  }

  /**
   * The card, with one sentence in it: `sentence` in `warning` where one is given, else the notice
   * that waits. Both never stand: a sentence comes only from a running game, which took the notice.
   */
  function showForms(sentence: string | null): void {
    afterConflict = false;
    pendingMessage = null;
    const notice = takeNotice();
    placeCard(
      sentence === null ? notice : { text: sentence, role: "warning" },
      null,
    );
    if (focusCardOnForms) {
      focusCardOnForms = false;
      focusCard();
    }
  }

  /** No session for a save: the current state stays in this page for the same account (D-211). */
  function expire(): void {
    const state = shown();
    if (state.kind !== "game") return;
    kept = { ...state.view.keep(), accountId: state.account.id };
    showForms(EXPIRED);
  }

  /**
   * Another browser saved first: this game goes and the server's save is loaded (D-209); the game
   * built from it stays on the screen the address names.
   */
  function reloadAfterConflict(): void {
    const state = shown();
    if (state.kind !== "game") return;
    const owner = state.account;
    afterConflict = true;
    entry = "address";
    void loadGame(owner);
  }

  /**
   * A named account: the state kept for it builds the game and is saved at once; otherwise the
   * kept state, if any, is dropped and the account's saved game state is asked for. A kept state
   * whose load met an error of the code stays for the retry, since the page holds it alone.
   */
  function enter(named: Account): void {
    if (kept?.accountId === named.id) {
      latest += 1;
      const start = startFrom(kept.document, kept.revision, named);
      if (start === null) {
        loadFailed();
        return;
      }
      kept = null;
      showGame(named, start, true);
      return;
    }
    kept = null;
    void loadGame(named);
  }

  async function loadGame(owner: Account): Promise<void> {
    const mine = ++latest;
    waitForServer();
    const result = await client.loadSavedGame();
    if (mine !== latest) return;
    if (result.ok) {
      const save = result.value;
      const start =
        save === null
          ? { state: newGame(), revision: 0, refused: null }
          : startFrom(save, save.revision, owner);
      if (start === null) loadFailed();
      else showGame(owner, start, false);
    } else if (signedOut(result.failure)) {
      showForms(null);
    } else {
      askingFailed(result.failure.message);
    }
  }

  async function checkSession(): Promise<void> {
    const mine = ++latest;
    waitForServer();
    const result = await client.currentAccount();
    if (mine !== latest) return;
    if (result.ok) {
      enter(result.value);
    } else if (signedOut(result.failure)) {
      showForms(null);
    } else {
      askingFailed(result.failure.message);
    }
  }

  /** Sets the logout of the game `view`, where the page still holds it. */
  function setLogout(view: GameView, logout: Logout): void {
    const current = gameOf(view);
    if (current !== null) change({ ...current, logout });
  }

  /**
   * „Wyloguj” of the menu: the page saves first, then ends the session. The bar shows the waiting
   * and, after an uncertain end, the sentence; the failed save before a logout stays in the line of
   * saving under the bar (D-97, D-208).
   */
  function logOut(): void {
    const current = shown();
    if (
      current.kind !== "game" ||
      current.logout.kind !== "idle" ||
      current.reset.kind !== "idle"
    )
      return;
    const { view } = current;
    void (async () => {
      const mine = ++latest;
      change({ ...current, logout: { kind: "saving" } });
      const save = await view.saveBeforeLogout();
      if (mine !== latest || gameOf(view) === null) return;
      if (save.kind === "failed") {
        // The saver's line asks the player to log out again; its retries go on.
        setLogout(view, { kind: "idle", sentence: null });
        return;
      }
      if (save.kind === "signed-out") {
        expire();
        return;
      }
      setLogout(view, { kind: "ending", held: null });
      const result = await client.logout();
      const ending = gameOf(view)?.logout;
      const later = ending?.kind === "ending" ? ending.held : null;
      if (mine !== latest) return;
      if (result.ok || signedOut(result.failure)) {
        showForms(save.kind === "outdated" ? OUTDATED : null);
        focusCard();
        return;
      }
      // A reset that succeeded meanwhile built a new game: this uncertain end concerns the old one,
      // so the new game gets neither its sentence nor a reload for the old game's lost save.
      if (gameOf(view) === null) return;
      // The server may or may not have ended the session: the game stays, and so does „Wyloguj”.
      setLogout(view, { kind: "idle", sentence: result.failure.message });
      // A save that lost to another browser leaves this game behind the server's save (D-209).
      if (save.kind === "conflict") reloadAfterConflict();
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
  function resetGame(): void {
    const current = shown();
    if (current.kind !== "game" || current.reset.kind !== "idle") return;
    const { view, account: owner } = current;
    change({ ...current, reset: { kind: "waiting", held: null } });
    void (async () => {
      const result = await client.resetSavedGame();
      // The game left the page meanwhile (a logout, a sign-in elsewhere): nothing here concerns it.
      const now = gameOf(view);
      if (now === null) return;
      if (result.ok) {
        pendingNotice = { text: GAME_STARTS_ANEW, role: "positive" };
        entry = "address";
        showGame(
          owner,
          { state: newGame(), revision: 0, refused: null },
          false,
        );
        return;
      }
      if (signedOut(result.failure)) {
        expire();
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
      change({ ...now, reset: { kind: "idle" } });
      held?.();
    })();
  }

  /**
   * The card on the form „Ustaw nowe hasło”. Its ending says how the page goes on: after a change
   * a new card with the sentence of success, without a session check; after a refused link the
   * usual session check with the sentence of refusal; after „Anuluj” the usual session check alone.
   * Both of the last open Siedziba for a signed-in player, as an emailed link does (D-225, D-96).
   * Where the check shows the card, that card takes the focus, since the player stays at it (D-381).
   */
  function showReset(token: string): void {
    placeCard(null, {
      token,
      address,
      finished(ending: ResetEnding): void {
        if (ending === "changed") {
          pendingNotice = { text: PASSWORD_CHANGED, role: "positive" };
          showForms(null);
          focusCard();
          return;
        }
        if (ending === "refused")
          pendingNotice = { text: LINK_INVALID, role: "warning" };
        entry = "link";
        focusCardOnForms = true;
        void checkSession();
      },
    });
  }

  /** The reset form or the confirmation from the address, where there is one, then the session check. */
  async function start(): Promise<void> {
    const resetToken = readResetToken(address.hash());
    if (resetToken !== null) {
      showReset(resetToken);
      return;
    }
    if (readConfirmationToken(address.hash()) !== null) {
      change({
        kind: "checking",
        waiting: { kind: "asking", text: CONFIRMING_ADDRESS },
      });
      const answer = await confirmFromAddress(client, address);
      pendingNotice = answer?.notice ?? null;
      // A refused link leaves the player at the card, which takes the focus (D-381).
      focusCardOnForms = answer?.refused ?? false;
      entry = "link";
    }
    await checkSession();
  }

  root.append(places.header, places.main);
  void start();
}
