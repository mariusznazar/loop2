import type { AccountClient, AccountRole } from "../account-api.js";
import type { GameState } from "../sim/types.js";
import { createAccountsEntry } from "./accounts-entry.js";
import { createChronicle } from "./chronicle.js";
import { createCharacterEntry } from "./character-entry.js";
import {
  readConfirmationToken,
  type PageAddress,
} from "./email-confirmation.js";
import type { LogoutSave } from "./game-saver.js";
import { createSaveRow } from "./header-rows.js";
import { createHeadquartersEntry } from "./headquarters-entry.js";
import { lastingStorageOf, openJudgingCache } from "./judging-cache.js";
import { createKnowledgeEntry } from "./knowledge-entry.js";
import { createMapsEntry } from "./maps-entry.js";
import { readResetToken } from "./password-reset.js";
import { createFolding } from "./program-panel.js";
import { createProgramPanelActs } from "./program-panel-acts.js";
import { createProgramsEntry } from "./programs-entry.js";
import { createRunEntry } from "./run-entry.js";
import { createRunScreenState } from "./run-screen-state.js";
import { createScreenRegistry, type ScreenPlace } from "./screen-registry.js";
import {
  readScreenAddress,
  resolveScreen,
  screenAddress,
  type Screen,
} from "./screen-address.js";
import { createStateStore, type KeptGame } from "./state-store.js";

export type { KeptGame, ScreenPlace };

/**
 * How the page came to build the game, which picks its first screen (D-96, D-212, D-225, D-281):
 * `sign-in` — the sign-in form or a registration; `link` — an emailed link, a confirmation or the
 * form „Ustaw nowe hasło” ended by „Anuluj” or a refused link; `address` — the page opened or built
 * again at its address: a reload, a retry of the session check, a game built again after a conflict.
 */
export type GameEntry = "sign-in" | "link" | "address";

export type GameViewOptions = {
  /**
   * The account client the game's saver saves through, and the pull of the previous save fetches
   * through; only a privileged account's game ever calls `loadPreviousSavedGame`. The screen of the
   * list of accounts (D-411) takes its five requests from the same client, and is built only for an
   * account with the owner role, so the other accounts' games never call them.
   */
  readonly client: Pick<
    AccountClient,
    | "saveGame"
    | "loadPreviousSavedGame"
    | "listAccounts"
    | "blockAccount"
    | "unblockAccount"
    | "grantPreviousSave"
    | "revokePreviousSave"
  >;
  /**
   * The identifier the server gives the signed-in account, never its email address: the judgings the
   * browser remembers are kept under it (D-441).
   */
  readonly accountId: string;
  /**
   * Whether the account holds the previous-save privilege (D-400), from the account the page names;
   * left out, it counts as false. Where it is false the game asks for nothing of the previous save
   * and shows no control for it.
   */
  readonly previousSaveAllowed?: boolean;
  /**
   * The role of the account the page names (D-410); left out, it is `player`. Only an account with
   * the role `owner` reaches the screen of the list of accounts at its address (D-281).
   */
  readonly role?: AccountRole;
  /**
   * The page's act of a confirmed „Zacznij od zera” (D-402): the game calls it once for each
   * confirmation and sends no request of its own for the reset. Left out, the game shows no reset
   * control, so that no page that gives none offers the reset. Only for an account with the
   * previous-save privilege, as `previousSaveAllowed` says.
   */
  readonly onReset?: () => void;
  /** The game state the game starts from: a new game, or the state a load returned. */
  readonly state: GameState;
  /** The revision of the saved game state `state` came from; 0 when the server held none. */
  readonly revision: number;
  /**
   * The game was built from the server's save after a conflict (D-209), which removes the judgings
   * this browser remembers for the game (D-441).
   */
  readonly afterConflict?: boolean;
  /** The page's address, which the view reads its screen from and writes it to (D-281). */
  readonly address: PageAddress;
  /** How the page came to build the game. */
  readonly entry: GameEntry;
  /** The screen the view shows and its way back to the map run, at the first screen and each change. */
  onScreen(place: ScreenPlace): void;
  /** Another browser saved first: the page drops this game and loads the server's save. */
  onConflict(): void;
  /** The server holds a newer version: the saver has stopped for good; the game stays. */
  onOutdated(): void;
  /** No session: the page keeps the current state for the same account and removes the game. */
  onSignedOut(): void;
};

export type GameView = {
  /** The game with its screens, one shown at a time, for the page to place. */
  element: HTMLElement;
  /** The host of the row of saving, for the page to place under the menu bar (D-208). */
  saveLine: HTMLElement;
  /** A moment of saving the page calls itself: the current state goes at once. */
  saveNow(): void;
  /** The save before logout and its outcome (D-97). */
  saveBeforeLogout(): Promise<LogoutSave>;
  /** The current game state, real time passed first, as a document to keep in the page (D-211). */
  keep(): KeptGame;
  /**
   * Stops the game taking any change, for good (D-323): after an error that no code of the game
   * handled the store rejects every later result of the simulation, so the clock and the buttons
   * change nothing, and the clock stops, so that a later read of the state for a save makes no
   * reading of it, whose error would come back with every save. The saver goes on as D-207, D-208
   * and D-97 give, with the state the game held. Calling it again does nothing.
   */
  halt(): void;
  /**
   * Sets what the reset control shows (D-402), for the page: `waiting` while the page waits for the
   * server's answer, and a `sentence` beside the control for a failed reset, after which the control
   * is at rest. The view sets `waiting` itself when the player confirms, before it calls `onReset`.
   */
  setReset(next: { waiting: boolean; sentence: string | null }): void;
  /**
   * Ends this game in the page: its clock and its saver stop, it stops listening to the address,
   * and its elements leave the page, taking their event handlers with them. It changes no screen
   * and pauses nothing. Calling it again does nothing.
   */
  dispose(): void;
};

/** The screen of the map run of `state`, or Siedziba where it holds none (D-96). */
function landing(state: GameState): Screen {
  return state.run === null
    ? { kind: "headquarters" }
    : { kind: "run", characterId: state.run.character.id };
}

/** Whether the system's setting asks for less motion, which leaves the scene's effects out (D-317). */
function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Builds the game from the state it starts from and starts its clock and its saver, as the
 * composition of three modules and the entries of the screens. The store (`state-store.ts`) holds
 * the one current game state, replaces it only with the state a simulation function returned, makes
 * the reading of the clock before an act of the player that depends on time, and saves; the state of
 * the screen Przejście (`run-screen-state.ts`) holds the question „Zapisać, odrzucić, wrócić?”, the
 * end-of-run window and the focus owed to it; the registry (`screen-registry.ts`) shows the screens
 * and draws them from the state and from the real moment of the clock's latest reading, which the
 * resurrection lines need and the state never holds. The screens are the entries of the table
 * below: Siedziba, Programy and Przejście built once and hidden while another shows, Postać, Mapy,
 * Wiedza and the list of accounts built on entering and taken down on leaving. A new screen is one
 * more line of the table.
 *
 * The view shows one screen at a time, the one the address names (D-280, D-281). The two program
 * panels are two, so the program each shows stays its own. The first screen is the entry's (D-96,
 * D-212, D-225): after the sign-in form and at a reload with no fragment Siedziba or the map run's
 * screen where the state holds one, at a reload at an address the screen it names, and after an
 * emailed link Siedziba; the view writes that screen's fragment into the address with no new entry
 * of the history. A fragment that names no existing screen opens the nearest one and is replaced
 * the same way. The browser's back and forward and the bar's links reach the view through the
 * address's listener, which reloads the page where the fragment of an emailed link appears in the
 * address (D-352). The view tells the page its place through `onScreen`, at the first screen and at
 * each change, with the bar's „Wróć do przejścia” where a map run waits outside its screen.
 *
 * Every act of the player whose result changed the state, every game minute that ends the map run
 * in a death or a completion and every result in which an earning loop's map run ended is a moment of saving
 * (D-207). Each reading of the clock rewrites the resurrection lines of the screen that shows
 * (D-217). The clock catches up the earning loops of a loaded state as the last step of building
 * (D-247). After `halt()` the store replaces the state no more (D-323). Nothing here runs when the
 * module is imported.
 */
export function createGameView(options: GameViewOptions): GameView {
  const { address } = options;
  const owner = options.role === "owner";
  let disposed = false;

  const element = document.createElement("div");
  element.className = "game-view";

  // After each result the memories of the screen Przejście and the chronicle take it, then the
  // screens draw (D-04, D-339); after each reading of the clock the screens rewrite what real time
  // changes. Neither runs before the registry stands: no act and no reading happens before the
  // clock's first tick or the catch-up.
  const store = createStateStore({
    state: options.state,
    revision: options.revision,
    afterConflict: options.afterConflict ?? false,
    client: options.client,
    onConflict: () => options.onConflict(),
    onOutdated: () => options.onOutdated(),
    onSignedOut: () => options.onSignedOut(),
    onTaken(taken) {
      screenState.taken(taken);
      chronicle.record(taken.result, taken.before, taken.copyAct);
      registry.drawResult(taken.result.events);
    },
    onReading: () => registry.drawReading(),
  });
  // The header's line of saving is a root of its own, drawn from the saver's sentence (D-407).
  const saveRow = createSaveRow({
    sentence: () => store.saveSentence(),
    subscribe: (listener) => store.subscribeSaveSentence(listener),
  });
  const screenState = createRunScreenState({
    game: store,
    reducedMotion: prefersReducedMotion,
  });
  // The folding of rule groups is one memory of the page, which both program panels read and change;
  // it is not part of the game state, so a reload forgets it (D-295). The chronicle of the map run is
  // one memory of the page too, made from the state the game is built from and recording every
  // result the store takes; it is not part of the game state or the save (D-339).
  const folding = createFolding();
  const chronicle = createChronicle(options.state);
  const acts = createProgramPanelActs(store);
  // The one reach of the browser's storage: the cache of the judgings the browser remembers for this
  // account and this game, which the game's moment names (D-441). Opening it removes what D-441 says.
  const judgingCache = openJudgingCache({
    accountId: options.accountId,
    state: options.state,
    afterRefusedSave: options.afterConflict ?? false,
    storage: lastingStorageOf(window),
  });
  const programsEntry = createProgramsEntry({
    store,
    acts,
    folding,
    client: options.client,
    previousSaveAllowed: options.previousSaveAllowed === true,
    onReset: options.onReset,
    onSignedOut: () => options.onSignedOut(),
  });

  /** The first screen, by how the page came to build the game (D-96, D-212, D-225, D-281). */
  function firstScreen(): Screen {
    switch (options.entry) {
      case "sign-in":
        return landing(store.get());
      case "link":
        return { kind: "headquarters" };
      case "address": {
        const hash = address.hash();
        return hash === ""
          ? landing(store.get())
          : resolveScreen(readScreenAddress(hash), store.get(), owner);
      }
    }
  }

  // The table of screens, in the order they stand in the document.
  const registry = createScreenRegistry({
    element,
    entries: [
      createHeadquartersEntry({ store }),
      programsEntry,
      createRunEntry({
        store,
        screenState,
        acts,
        folding,
        chronicle,
        gameElement: element,
      }),
      createCharacterEntry({ store }),
      createMapsEntry({ store, judgingCache }),
      createKnowledgeEntry({ store }),
      createAccountsEntry({
        client: options.client,
        onSignedOut: () => options.onSignedOut(),
      }),
    ],
    first: firstScreen(),
    address,
    state: () => store.get(),
    onPlace: (place) => options.onScreen(place),
  });

  // The browser's back and forward, and a link of the bar: the address names the screen; one that
  // names no existing screen opens the nearest and is replaced with its address (D-281). The fragment
  // of an emailed link (D-156, D-224) names none: the page reloads with it in the address, and the
  // reloaded page does what a page opened by that link does (D-352).
  const stopListening = address.onChange(() => {
    if (disposed) return;
    const hash = address.hash();
    if (readConfirmationToken(hash) !== null || readResetToken(hash) !== null) {
      address.reload();
      return;
    }
    const screen = resolveScreen(readScreenAddress(hash), store.get(), owner);
    registry.show(screen, screenAddress(screen) === hash ? "none" : "replace");
    registry.focusIfLost();
  });

  registry.start();
  screenState.built();
  // The catch-up is the last step of building, so every place of loading goes the same way (D-212).
  store.catchUp();

  return {
    element,
    saveLine: saveRow.element,
    saveNow: () => store.saveNow(),
    saveBeforeLogout: () => store.saveBeforeLogout(),
    keep: () => store.keep(),
    setReset(next: { waiting: boolean; sentence: string | null }): void {
      if (disposed) return;
      programsEntry.setReset(next);
    },
    halt: () => store.halt(),
    dispose(): void {
      if (disposed) return;
      disposed = true;
      stopListening();
      store.dispose();
      registry.dispose();
      element.remove();
      saveRow.dispose();
    },
  };
}
