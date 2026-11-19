import {
  createAccountClient,
  type Account,
  type AccountClient,
} from "../account-api.js";
import { newGame } from "../sim/game.js";
import { loadSavedGame, type SavedGameRefusal } from "../sim/saved-game.js";
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
  type GameView,
  type ScreenPlace,
} from "./game-view.js";
import {
  errorWords,
  installLastResort,
  type LastResort,
} from "./last-resort.js";
import {
  logOut,
  onPlace,
  resetGame,
  signedOut,
  whenNotBusy,
  type GameActsPage,
  type GameStart,
} from "./page-game-acts.js";
import {
  createPagePlaces,
  type PageMemory,
  type PagePlaces,
} from "./page-places.js";
import type { PageSentenceValue } from "./page-sentences.js";
import { readResetToken, type ResetEnding } from "./password-reset.js";

const EXPIRED = "Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.";
const PASSWORD_CHANGED = "Hasło zmienione. Zaloguj się nowym hasłem.";
const LINK_INVALID = "Odnośnik jest nieważny albo wygasł.";
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

/**
 * What the functions of the page share: the places and what they show, the page's memory, the
 * client, the address, the last-resort handling, and the functions the acts on a standing game
 * (`page-game-acts.ts`) call back here.
 */
type Page = GameActsPage & {
  readonly address: PageAddress;
  readonly lastResort: LastResort;
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

/** The notice to stand on the screen about to be shown, once; nothing after that. */
function takeNotice(memory: PageMemory): ConfirmationNotice | null {
  const notice = memory.pendingNotice;
  memory.pendingNotice = null;
  return notice;
}

/** The game leaves before the next is built, so that a new game finds no old one on the address. */
function leaveGame(places: PagePlaces): void {
  if (places.shown().kind !== "game") return;
  places.change({
    kind: "checking",
    waiting: { kind: "asking", text: CHECKING_SESSION },
  });
}

/** Puts a new card in place of the page, any card before it closed by `change` (D-262). */
function placeCard(
  page: Page,
  sentence: ConfirmationNotice | null,
  reset: AccountCardReset | null,
): void {
  const { memory } = page;
  const card = createAccountCard({
    client: page.client,
    sentence,
    reset,
    signedIn(named, message): void {
      memory.pendingMessage = message;
      memory.entry = "sign-in";
      enter(page, named);
    },
    failed: memory.failed,
    onUncaught(error): void {
      page.lastResort.report(error, "view/account-card.createAccountCard");
    },
  });
  page.places.change({ kind: "card", card });
}

/** Gives the card the focus, where a card stands. */
function focusCard(places: PagePlaces): void {
  const state = places.shown();
  if (state.kind === "card") state.card.focus();
}

/**
 * The waiting screen while the page asks the server, the warning of a retry cleared: once a
 * refusal was shown, „Spróbuj ponownie” waits until the waiting screen is left.
 */
function waitForServer(
  places: PagePlaces,
  text: string = CHECKING_SESSION,
): void {
  const state = places.shown();
  const retrying =
    state.kind === "checking" &&
    (state.waiting.kind === "refused" || state.waiting.kind === "retrying");
  places.change({
    kind: "checking",
    waiting: retrying ? { kind: "retrying" } : { kind: "asking", text },
  });
}

function askingFailed(places: PagePlaces, message: string): void {
  places.change({
    kind: "checking",
    waiting: { kind: "refused", sentence: message },
  });
}

/** A load that met an error of the code: the waiting screen with its warning and its retry. */
function loadFailed(places: PagePlaces): void {
  askingFailed(places, LOAD_FAILED);
}

function showGame(
  page: Page,
  owner: Account,
  start: GameStart,
  saveAtOnce: boolean,
): void {
  const { places, memory } = page;
  if (memory.failed) {
    // After an error nothing handled no game is built, so no catch-up passes time and nothing is
    // saved: the page stays at the waiting screen with the sentence of the failure (D-323).
    places.change({ kind: "checking", waiting: { kind: "stopped" } });
    return;
  }
  leaveGame(places);
  const conflict = memory.afterConflict && start.refused === null;
  memory.afterConflict = false;
  memory.focusCardOnForms = false;
  const message = memory.pendingMessage;
  memory.pendingMessage = null;
  // The game tells its first place while it is built, before the page holds it.
  let building = true;
  let first: ScreenPlace | null = null;
  const view: GameView = createGameView({
    client: page.client,
    previousSaveAllowed: owner.previousSaveAllowed,
    role: owner.role,
    state: start.state,
    revision: start.revision,
    afterConflict: conflict,
    address: page.address,
    entry: memory.entry,
    onScreen(next) {
      if (building) first = next;
      else onPlace(places, view, next);
    },
    ...(owner.previousSaveAllowed ? { onReset: () => resetGame(page) } : {}),
    onConflict: () =>
      whenNotBusy(places, view, () => reloadAfterConflict(page)),
    onOutdated: () => {},
    onSignedOut: () => whenNotBusy(places, view, () => expire(page)),
  });
  building = false;
  const notice = takeNotice(memory);
  const notices: PageSentenceValue[] = notice === null ? [] : [notice];
  if (start.refused !== null)
    notices.push({
      text: REFUSED_LOAD[start.refused],
      role: "refused-load",
    });
  places.change({
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
function showForms(page: Page, sentence: string | null): void {
  const { memory } = page;
  memory.afterConflict = false;
  memory.pendingMessage = null;
  const notice = takeNotice(memory);
  placeCard(
    page,
    sentence === null ? notice : { text: sentence, role: "warning" },
    null,
  );
  if (memory.focusCardOnForms) {
    memory.focusCardOnForms = false;
    focusCard(page.places);
  }
}

/** No session for a save: the current state stays in this page for the same account (D-211). */
function expire(page: Page): void {
  const state = page.places.shown();
  if (state.kind !== "game") return;
  page.memory.kept = { ...state.view.keep(), accountId: state.account.id };
  showForms(page, EXPIRED);
}

/**
 * Another browser saved first: this game goes and the server's save is loaded (D-209); the game
 * built from it stays on the screen the address names.
 */
function reloadAfterConflict(page: Page): void {
  const state = page.places.shown();
  if (state.kind !== "game") return;
  const owner = state.account;
  page.memory.afterConflict = true;
  page.memory.entry = "address";
  void loadGame(page, owner);
}

/**
 * A named account: the state kept for it builds the game and is saved at once; otherwise the
 * kept state, if any, is dropped and the account's saved game state is asked for. A kept state
 * whose load met an error of the code stays for the retry, since the page holds it alone.
 */
function enter(page: Page, named: Account): void {
  const { memory } = page;
  if (memory.kept?.accountId === named.id) {
    memory.latest += 1;
    const start = startFrom(memory.kept.document, memory.kept.revision, named);
    if (start === null) {
      loadFailed(page.places);
      return;
    }
    memory.kept = null;
    showGame(page, named, start, true);
    return;
  }
  memory.kept = null;
  void loadGame(page, named);
}

async function loadGame(page: Page, owner: Account): Promise<void> {
  const { places, memory } = page;
  const mine = ++memory.latest;
  waitForServer(places);
  const result = await page.client.loadSavedGame();
  if (mine !== memory.latest) return;
  if (result.ok) {
    const save = result.value;
    const start =
      save === null
        ? { state: newGame(), revision: 0, refused: null }
        : startFrom(save, save.revision, owner);
    if (start === null) loadFailed(places);
    else showGame(page, owner, start, false);
  } else if (signedOut(result.failure)) {
    showForms(page, null);
  } else {
    askingFailed(places, result.failure.message);
  }
}

async function checkSession(page: Page): Promise<void> {
  const { places, memory } = page;
  const mine = ++memory.latest;
  waitForServer(places);
  const result = await page.client.currentAccount();
  if (mine !== memory.latest) return;
  if (result.ok) {
    enter(page, result.value);
  } else if (signedOut(result.failure)) {
    showForms(page, null);
  } else {
    askingFailed(places, result.failure.message);
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
 * What outlives a change of kind stands in one record of the page's memory, which this function
 * makes and gives, with the places, the client and the address, to the functions of the page: those
 * of this module and the acts on a standing game of `page-game-acts.ts`.
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
    onLogout: () => logOut(page),
    onRetry: () => {
      void checkSession(page);
    },
  });
  // What outlives a change of kind of what the page shows; the page opens at its address.
  const memory: PageMemory = {
    pendingNotice: null,
    pendingMessage: null,
    afterConflict: false,
    entry: "address",
    kept: null,
    latest: 0,
    failed: false,
    focusCardOnForms: false,
  };

  /**
   * An error nothing handled: the page shows the sentence of the failure, stops the game and tells
   * the card, its line already written. It may be called from inside React's work, so it renders
   * nothing: showing the row is one attribute of an element the page owns (D-323, D-407).
   */
  function onUncaught(): void {
    memory.failed = true;
    places.failureRow.show();
    const state = places.shown();
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

  const page: Page = {
    places,
    memory,
    client,
    address,
    lastResort,
    calls: {
      expire: () => expire(page),
      showForms: (sentence) => showForms(page, sentence),
      focusCard: () => focusCard(places),
      reloadAfterConflict: () => reloadAfterConflict(page),
      showGame: (owner, start, saveAtOnce) =>
        showGame(page, owner, start, saveAtOnce),
    },
  };

  /**
   * The card on the form „Ustaw nowe hasło”. Its ending says how the page goes on: after a change
   * a new card with the sentence of success, without a session check; after a refused link the
   * usual session check with the sentence of refusal; after „Anuluj” the usual session check alone.
   * Both of the last open Siedziba for a signed-in player, as an emailed link does (D-225, D-96).
   * Where the check shows the card, that card takes the focus, since the player stays at it (D-381).
   */
  function showReset(token: string): void {
    placeCard(page, null, {
      token,
      address,
      finished(ending: ResetEnding): void {
        if (ending === "changed") {
          memory.pendingNotice = { text: PASSWORD_CHANGED, role: "positive" };
          showForms(page, null);
          focusCard(places);
          return;
        }
        if (ending === "refused")
          memory.pendingNotice = { text: LINK_INVALID, role: "warning" };
        memory.entry = "link";
        memory.focusCardOnForms = true;
        void checkSession(page);
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
      places.change({
        kind: "checking",
        waiting: { kind: "asking", text: CONFIRMING_ADDRESS },
      });
      const answer = await confirmFromAddress(client, address);
      memory.pendingNotice = answer?.notice ?? null;
      // A refused link leaves the player at the card, which takes the focus (D-381).
      memory.focusCardOnForms = answer?.refused ?? false;
      memory.entry = "link";
    }
    await checkSession(page);
  }

  root.append(places.header, places.main);
  void start();
}
