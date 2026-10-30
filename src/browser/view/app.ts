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
import { createAccountScreen } from "./account-screen.js";
import { createButton, setButtonWaiting } from "./controls/button.js";
import { createFormWarning } from "./controls/text-field.js";
import {
  browserAddress,
  confirmFromAddress,
  createConfirmationNotice,
  readConfirmationToken,
  type ConfirmationNotice,
  type PageAddress,
} from "./email-confirmation.js";
import { createEmailStatus, type EmailStatus } from "./email-status.js";
import { createFooter } from "./footer.js";
import { createGameView, type GameView, type KeptGame } from "./game-view.js";

const EXPIRED = "Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.";
const OUTDATED = "Gra została zaktualizowana. Odśwież stronę.";
const OTHER_VERSION =
  "Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.";
/** The one-time sentence above a new game that replaces a refused save (D-96). */
const REFUSED_LOAD: Readonly<Record<SavedGameRefusal, string>> = {
  version: OTHER_VERSION,
  archetype: OTHER_VERSION,
  shape: "Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.",
};

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

/** The game a saved document gives through the load, or a new game where the load refuses it. */
function startFrom(document: unknown, revision: number): GameStart {
  const loaded = loadSavedGame(document);
  return loaded.ok
    ? { state: loaded.state, revision, refused: null }
    : { state: newGame(), revision, refused: loaded.reason };
}

/** A sentence of the page in `warning`, standing once above the screen it opens. */
function createPageNotice(sentence: string): HTMLElement {
  const element = document.createElement("p");
  element.className = "page-notice";
  element.setAttribute("role", "alert");
  element.textContent = sentence;
  return element;
}

/**
 * Builds the page in `root`: the header with the title, the place of the screen, and the footer.
 * The page first asks the server whom this browser is signed in as and shows only that it is
 * asking; once the server names an account, it goes on asking for the account's saved game state,
 * and only that answer builds the game: a new game where there is none, else the game the load
 * gives. The forms come only once the server says there is no session. Any other answer is a
 * warning with „Spróbuj ponownie”, which repeats both requests, never a guess. „Wyloguj” beside
 * the title saves the game state, then ends this browser's session; the game leaves the page only
 * when the server confirms it, and stays with a warning when the outcome is uncertain (D-97). One
 * transition runs at a time, and an answer that comes after the page moved on is ignored.
 *
 * Under the title and „Wyloguj”, on lines of their own, stand the line of saving (D-185) and, for
 * a signed-in player with an unconfirmed address, the row of `email-status.ts`. When the page's
 * address carries a confirmation token, the page first sends it — showing „Potwierdzanie adresu…”
 * where it shows the session check — and only then checks the session; the result stands as one
 * sentence above the first screen that check leads to, and leaves at the next change between forms
 * and game. A save answered with no session keeps the game state in this page only, for a sign-in
 * to the same account (D-188).
 */
export function startApp(
  root: HTMLElement,
  client: AccountClient = createAccountClient(),
  address: PageAddress = browserAddress(),
): void {
  const header = document.createElement("header");
  const title = document.createElement("h1");
  title.textContent = "Loop";
  const logoutButton = createButton("Wyloguj");
  logoutButton.hidden = true;
  const logoutWarning = createFormWarning();
  header.append(title, logoutButton, logoutWarning.element);

  const main = document.createElement("main");
  main.className = "app-main";

  // The session check: what the page says while it asks, and the warning with its retry.
  const check = document.createElement("section");
  check.className = "session-check";
  const checking = document.createElement("p");
  checking.className = "session-check-text";
  checking.textContent = "Sprawdzanie logowania…";
  const checkWarning = createFormWarning();
  const retryButton = createButton("Spróbuj ponownie");
  retryButton.hidden = true;
  check.append(checking, checkWarning.element, retryButton);

  const accountScreen = createAccountScreen(client, (account, message) => {
    pendingMessage = message;
    enter(account);
  });
  let game: GameView | null = null;
  /** The account whose game the page shows. */
  let account: Account | null = null;
  let emailStatus: EmailStatus | null = null;
  // The result of a confirmation from the address, until the first screen shows it.
  let pendingNotice: ConfirmationNotice | null = null;
  // The outcome of a registration's first message, until the game it leads to is built.
  let pendingMessage: ConfirmationMessage | null = null;
  // The game about to be built replaces one that lost a conflict to another browser (D-186).
  let afterConflict = false;
  // The game state a save answered with no session left, kept in this page only (D-188).
  let kept: (KeptGame & { readonly accountId: string }) | null = null;
  // While „Wyloguj” waits for the server to end the session, the logout's answer decides what the
  // page does, so an outcome the saver reports meanwhile waits for it.
  let loggingOut = false;
  let deferred: (() => void) | null = null;
  // Each request of the page takes the next number; an answer counts only while it is the last.
  let latest = 0;

  /** The notice to stand above the screen about to be shown, once; nothing after that. */
  function noticeElements(): HTMLElement[] {
    const notice = pendingNotice;
    pendingNotice = null;
    return notice === null ? [] : [createConfirmationNotice(notice)];
  }

  /** The waiting screen while the page asks the server, the warning of a retry cleared. */
  function waitForServer(): void {
    checkWarning.set(null);
    if (retryButton.hidden) {
      checking.hidden = false;
    } else {
      setButtonWaiting(retryButton, "Sprawdzanie…");
    }
    main.replaceChildren(check);
  }

  function askingFailed(message: string): void {
    checking.hidden = true;
    checkWarning.set(message);
    retryButton.hidden = false;
    retryButton.focus();
  }

  /** The waiting screen starts afresh the next time it is shown. */
  function leaveWaiting(): void {
    checking.hidden = false;
    checkWarning.set(null);
    retryButton.hidden = true;
  }

  function dropGame(): void {
    game?.dispose();
    game = null;
    account = null;
    emailStatus?.dispose();
    emailStatus = null;
  }

  /** An outcome of the saver acts now, or after the answer to a logout under way. */
  function whenNotLoggingOut(view: GameView, action: () => void): void {
    const guarded = (): void => {
      if (game === view) action();
    };
    if (loggingOut) deferred = guarded;
    else guarded();
  }

  function showGame(
    owner: Account,
    start: GameStart,
    saveAtOnce: boolean,
  ): void {
    dropGame();
    const conflict = afterConflict && start.refused === null;
    afterConflict = false;
    const message = pendingMessage;
    pendingMessage = null;
    const view: GameView = createGameView({
      client,
      state: start.state,
      revision: start.revision,
      afterConflict: conflict,
      onConflict: () => whenNotLoggingOut(view, () => reloadAfterConflict()),
      onOutdated: () => {},
      onSignedOut: () => whenNotLoggingOut(view, () => expire()),
    });
    game = view;
    account = owner;
    emailStatus = createEmailStatus(client, owner, message);
    view.saveLine.classList.add("save-line");
    header.append(view.saveLine, emailStatus.element);
    leaveWaiting();
    const notices = noticeElements();
    if (start.refused !== null)
      notices.push(createPageNotice(REFUSED_LOAD[start.refused]));
    main.replaceChildren(...notices, view.element);
    logoutWarning.set(null);
    logoutButton.hidden = false;
    // A refused save is replaced at once, so its sentence does not come back (spec decision 7).
    if (saveAtOnce || start.refused !== null) view.saveNow();
  }

  /** The account forms, with `sentence` in `warning` above them where one is given. */
  function showForms(sentence: string | null): void {
    dropGame();
    afterConflict = false;
    pendingMessage = null;
    logoutButton.hidden = true;
    logoutWarning.set(null);
    leaveWaiting();
    accountScreen.reset();
    const notices = noticeElements();
    if (sentence !== null) notices.push(createPageNotice(sentence));
    main.replaceChildren(...notices, accountScreen.element);
  }

  /** No session for a save: the current state stays in this page for the same account (D-188). */
  function expire(): void {
    if (game === null || account === null) return;
    kept = { ...game.keep(), accountId: account.id };
    showForms(EXPIRED);
  }

  /** Another browser saved first: this game goes and the server's save is loaded (D-186). */
  function reloadAfterConflict(): void {
    const owner = account;
    if (owner === null) return;
    dropGame();
    logoutButton.hidden = true;
    afterConflict = true;
    void loadGame(owner);
  }

  /**
   * A named account: the state kept for it builds the game and is saved at once; otherwise the
   * kept state, if any, is dropped and the account's saved game state is asked for.
   */
  function enter(named: Account): void {
    const keptGame = kept;
    kept = null;
    if (keptGame !== null && keptGame.accountId === named.id) {
      latest += 1;
      showGame(named, startFrom(keptGame.document, keptGame.revision), true);
      return;
    }
    void loadGame(named);
  }

  async function loadGame(owner: Account): Promise<void> {
    const mine = ++latest;
    waitForServer();
    const result = await client.loadSavedGame();
    if (mine !== latest) return;
    setButtonWaiting(retryButton, null);
    if (result.ok) {
      const save = result.value;
      showGame(
        owner,
        save === null
          ? { state: newGame(), revision: 0, refused: null }
          : startFrom(save, save.revision),
        false,
      );
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
    setButtonWaiting(retryButton, null);
    if (result.ok) {
      enter(result.value);
    } else if (signedOut(result.failure)) {
      showForms(null);
    } else {
      askingFailed(result.failure.message);
    }
  }

  retryButton.addEventListener("click", () => {
    if (retryButton.disabled) return;
    void checkSession();
  });

  logoutButton.addEventListener("click", () => {
    const view = game;
    if (view === null || logoutButton.disabled) return;
    void (async () => {
      const mine = ++latest;
      logoutWarning.set(null);
      setButtonWaiting(logoutButton, "Wylogowywanie…");
      const save = await view.saveBeforeLogout();
      if (mine !== latest || game !== view) return;
      if (save.kind === "failed") {
        // The saver's line asks the player to log out again; its retries go on.
        setButtonWaiting(logoutButton, null);
        logoutButton.focus();
        return;
      }
      if (save.kind === "signed-out") {
        setButtonWaiting(logoutButton, null);
        expire();
        return;
      }
      loggingOut = true;
      const result = await client.logout();
      loggingOut = false;
      const later = deferred;
      deferred = null;
      if (mine !== latest) return;
      setButtonWaiting(logoutButton, null);
      if (result.ok || signedOut(result.failure)) {
        showForms(save.kind === "outdated" ? OUTDATED : null);
        accountScreen.focus();
        return;
      }
      // The server may or may not have ended the session: the game stays, and so does „Wyloguj”.
      logoutWarning.set(result.failure.message);
      logoutButton.focus();
      // A save that lost to another browser leaves this game behind the server's save (D-186).
      if (save.kind === "conflict") reloadAfterConflict();
      else later?.();
    })();
  });

  /** The confirmation from the address, where there is one, then the session check. */
  async function start(): Promise<void> {
    if (readConfirmationToken(address.hash()) !== null) {
      checking.textContent = "Potwierdzanie adresu…";
      main.replaceChildren(check);
      const notice = await confirmFromAddress(client, address);
      checking.textContent = "Sprawdzanie logowania…";
      pendingNotice = notice;
    }
    await checkSession();
  }

  root.append(header, main, createFooter());
  void start();
}
