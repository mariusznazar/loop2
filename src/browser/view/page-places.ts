import type {
  Account,
  AccountClient,
  ConfirmationMessage,
} from "../account-api.js";
import type { AccountCard } from "./account-card.js";
import type { GameView, ScreenPlace } from "./game-view.js";
import { createFailureRow, type FailureRow } from "./header-rows.js";
import { createMenuBar, type MenuBarProps } from "./menu-bar.js";
import {
  createPageSentences,
  type PageSentenceValue,
} from "./page-sentences.js";
import { createWaitingScreen, type Waiting } from "./waiting-screen.js";

/** What the bar holds while no game stands: the game's name alone (D-262, D-280). */
const NAME_ALONE: MenuBarProps = {
  account: null,
  screen: null,
  returnEntry: null,
  registrationMessage: null,
  logout: { waiting: false, sentence: null, unavailable: false },
};

/** The page's sentences above the game while no game stands, or none is to be shown. */
const NO_SENTENCES: readonly PageSentenceValue[] = [];

/**
 * The logout of the game: `idle`, with the sentence of an uncertain end or none; `saving`, while the
 * save before the logout waits; `ending`, while the request that ends the session waits, with the
 * outcome of the saver that came meanwhile, which acts after the answer, or none.
 */
export type Logout =
  | { readonly kind: "idle"; readonly sentence: string | null }
  | { readonly kind: "saving" }
  | { readonly kind: "ending"; readonly held: (() => void) | null };

/**
 * The reset of the game (D-402): `idle`, or `waiting` for the server, with the outcome of the old
 * game's saver that came meanwhile, which acts only if the reset fails, or none.
 */
export type Reset =
  | { readonly kind: "idle" }
  | { readonly kind: "waiting"; readonly held: (() => void) | null };

/** The game that stands, with everything of the page that belongs to it and goes with it. */
export type GamePage = {
  readonly kind: "game";
  readonly view: GameView;
  /** The account the game belongs to. */
  readonly account: Account;
  /** Where the player is in the game, as the game last told; none before it tells. */
  readonly place: ScreenPlace | null;
  /** The page's sentences above the game's first screen; they leave at its first change of screen. */
  readonly notices: readonly PageSentenceValue[];
  /** The outcome of a registration's first message, which the bar starts its menu with. */
  readonly message: ConfirmationMessage | null;
  readonly logout: Logout;
  readonly reset: Reset;
};

/**
 * The state of the start page, one value of three kinds: the waiting screen with the header, the
 * card alone on the screen (D-262), or the game. The page holds one and changes it only through
 * `change`, which closes the card or the game the next value no longer holds and draws the places of
 * the page from it. Values that outlive a change of kind stand apart in `startApp`.
 */
export type PageState =
  | { readonly kind: "checking"; readonly waiting: Waiting }
  | { readonly kind: "card"; readonly card: AccountCard }
  | GamePage;

/**
 * What the bar is given in a state: the game's name alone in every kind but a game that has told its
 * place, else the account, the place, the registration's outcome and the logout — waiting while the
 * logout is not idle, unavailable while the reset waits (D-97, D-280, D-402).
 */
function barPropsOf(state: PageState): MenuBarProps {
  if (state.kind !== "game" || state.place === null) return NAME_ALONE;
  return {
    account: state.account,
    screen: state.place.screen,
    returnEntry: state.place.returnEntry,
    registrationMessage: state.message,
    logout: {
      waiting: state.logout.kind !== "idle",
      sentence: state.logout.kind === "idle" ? state.logout.sentence : null,
      unavailable: state.reset.kind === "waiting",
    },
  };
}

/** Whether two props of the bar say the same, so that the bar need not be drawn again. */
function sameBarProps(a: MenuBarProps, b: MenuBarProps): boolean {
  return (
    a.account === b.account &&
    a.screen === b.screen &&
    a.returnEntry === b.returnEntry &&
    a.registrationMessage === b.registrationMessage &&
    a.logout.waiting === b.logout.waiting &&
    a.logout.sentence === b.logout.sentence &&
    a.logout.unavailable === b.logout.unavailable
  );
}

export type PagePlacesOptions = {
  /** The page's root: the card of the page stands in it beside the header and `main` (D-262). */
  root: HTMLElement;
  client: AccountClient;
  /** What the waiting screen shows at the start, when the page asks the server whom this browser is signed in as. */
  waiting: Waiting;
  /** The bar's „Wyloguj”, which the page runs. */
  onLogout: () => void;
  /** The waiting screen's „Spróbuj ponownie”, which the page runs. */
  onRetry: () => void;
};

/** The places of the start page and the one value of what they show, which only `change` changes. */
export type PagePlaces = {
  /** The header with the bar and the row of the failure, for the page to append to its root. */
  header: HTMLElement;
  /** The block that holds the page's sentences and the waiting screen or the game, to append after the header. */
  main: HTMLElement;
  /** The row of the failure, drawn and hidden at the start, for the page to show at an error (D-323, D-407). */
  failureRow: FailureRow;
  /** What the page shows now. */
  shown: () => PageState;
  /** The game the page holds now, where it is `view`; else none. */
  gameOf: (view: GameView) => GamePage | null;
  /**
   * The one way to change what the page shows: the card or the game the next value no longer holds
   * is closed, and the header, the place of the screen, the sentences and the bar are drawn from it
   * (D-262, D-381).
   */
  change: (next: PageState) => void;
};

/**
 * Builds the places of the start page — the header with the menu bar and the row of the failure, and
 * `main` with the page's sentences and the waiting screen — and holds what the page shows and what the
 * bar and the row of sentences were last given. The roots are drawn here, in the order of the
 * document: the bar, the row of the failure, the sentences, the waiting screen (D-262, D-407).
 */
export function createPagePlaces(options: PagePlacesOptions): PagePlaces {
  const { root } = options;
  const header = document.createElement("header");
  const bar = createMenuBar({
    client: options.client,
    onLogout: options.onLogout,
    props: NAME_ALONE,
  });
  // The row of the failure: drawn now, hidden, and only shown at an error (D-323, D-407). It stands
  // right after the bar and before the line of saving, which the game's header appends later.
  const failureRow = createFailureRow();
  header.append(bar.element, failureRow.element);

  const main = document.createElement("main");
  main.className = "app-main";

  // The page's sentences above the game, in a root of their own that stands in `main` before the
  // game's element; they stand only in a game, where the state holds them.
  const sentences = createPageSentences({ sentences: NO_SENTENCES });

  // The waiting screen: what the page says while it asks, and the warning with its retry.
  const waitingScreen = createWaitingScreen({
    onRetry: options.onRetry,
    waiting: options.waiting,
  });

  // What the page shows; changed only by `change`.
  let state: PageState = { kind: "checking", waiting: options.waiting };
  // What the bar was last given.
  let drawnBar: MenuBarProps = NAME_ALONE;
  // What the row of sentences was last given.
  let drawnSentences: readonly PageSentenceValue[] = NO_SENTENCES;

  function gameOf(view: GameView): GamePage | null {
    return state.kind === "game" && state.view === view ? state : null;
  }

  /** Closes the card or the game the next value no longer holds. */
  function release(next: PageState): void {
    const previous = state;
    if (
      previous.kind === "card" &&
      !(next.kind === "card" && next.card === previous.card)
    )
      previous.card.dispose();
    if (
      previous.kind === "game" &&
      !(next.kind === "game" && next.view === previous.view)
    )
      previous.view.dispose();
  }

  /** What `main` holds in a state, in the order of the document. */
  function mainContent(next: PageState): readonly HTMLElement[] {
    switch (next.kind) {
      case "checking":
        return [sentences.element, waitingScreen.element];
      case "card":
        return [sentences.element];
      case "game":
        return [sentences.element, next.view.element];
    }
  }

  /** Takes out of `main` what the state no longer shows, and puts in what it shows and is not there. */
  function drawMain(content: readonly HTMLElement[]): void {
    for (const child of Array.from(main.children))
      if (!content.includes(child as HTMLElement)) child.remove();
    const there = Array.from(main.children);
    if (
      there.length !== content.length ||
      content.some((element, index) => there[index] !== element)
    )
      main.replaceChildren(...content);
  }

  /** Draws every place of the start page from `next`, after `previous` was left. */
  function draw(previous: PageState, next: PageState): void {
    header.hidden = next.kind === "card";
    main.hidden = next.kind === "card";
    drawMain(mainContent(next));
    if (
      next.kind === "game" &&
      !(previous.kind === "game" && previous.view === next.view)
    )
      header.append(next.view.saveLine);
    if (
      next.kind === "card" &&
      !(previous.kind === "card" && previous.card === next.card)
    )
      root.append(next.card.element);
    if (next.kind === "checking") waitingScreen.update(next.waiting);
    const standing = next.kind === "game" ? next.notices : NO_SENTENCES;
    if (standing !== drawnSentences) {
      drawnSentences = standing;
      sentences.update(standing);
    }
    const props = barPropsOf(next);
    if (!sameBarProps(props, drawnBar)) {
      drawnBar = props;
      bar.update(props);
    }
    // The button waited disabled, which took the focus, so each refusal moves it back.
    if (next.kind === "checking" && next.waiting.kind === "refused")
      waitingScreen.focusRetry();
  }

  function change(next: PageState): void {
    const previous = state;
    release(next);
    state = next;
    draw(previous, next);
  }

  return {
    header,
    main,
    failureRow,
    shown: () => state,
    gameOf,
    change,
  };
}
