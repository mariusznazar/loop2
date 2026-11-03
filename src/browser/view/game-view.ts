import type { AccountClient } from "../account-api.js";
import {
  createCharacter,
  end,
  mapRunEnded,
  restart,
  setPace,
  setPaused,
  setProgram,
  withSaveTime,
  type GameResult,
} from "../sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  pickProgram,
  programById,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../sim/programs.js";
import { closeAwayReport, stopLoop } from "../sim/loop.js";
import { savedGame, type SavedGame } from "../sim/saved-game.js";
import type { CharacterId, GameState, ProgramId } from "../sim/types.js";
import { buyBranch } from "../sim/skills.js";
import {
  createCharacterScreen,
  type CharacterScreen,
} from "./character-screen.js";
import { startClock, type GameStore } from "./clock.js";
import type { PageAddress } from "./email-confirmation.js";
import { createGameSaver, type LogoutSave } from "./game-saver.js";
import { createHeadquarters } from "./headquarters.js";
import { createProgramList } from "./program-list.js";
import {
  createProgramPanel,
  type ProgramPanelControls,
} from "./program-panel.js";
import { createRunScreen } from "./run-screen.js";
import {
  readScreenAddress,
  resolveScreen,
  returnToRunEntry,
  screenAddress,
  type ReturnEntry,
  type Screen,
} from "./screen-address.js";

/**
 * How the page came to build the game, which picks its first screen (D-96, D-212, D-225, D-281):
 * `sign-in` — the sign-in form or a registration; `link` — an emailed link, a confirmation or the
 * form „Ustaw nowe hasło” ended by „Anuluj” or a refused link; `address` — the page opened or built
 * again at its address: a reload, a retry of the session check, a game built again after a conflict.
 */
export type GameEntry = "sign-in" | "link" | "address";

/** Where the player is: the screen, and the bar's way back to a map run the player left. */
export type ScreenPlace = {
  readonly screen: Screen;
  readonly returnEntry: ReturnEntry | null;
};

export type GameViewOptions = {
  /** The account client the game's saver saves through. */
  readonly client: Pick<AccountClient, "saveGame">;
  /** The game state the game starts from: a new game, or the state a load returned. */
  readonly state: GameState;
  /** The revision of the saved game state `state` came from; 0 when the server held none. */
  readonly revision: number;
  /** The game was built from the server's save after a conflict (D-209). */
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

/** The current game state as a saved document, with the revision the saver last saw. */
export type KeptGame = {
  readonly document: SavedGame;
  readonly revision: number;
};

export type GameView = {
  /** The game with its screens, one shown at a time, for the page to place. */
  element: HTMLElement;
  /** The header line of saving, for the page to place under the menu bar (D-208). */
  saveLine: HTMLElement;
  /** A moment of saving the page calls itself: the current state goes at once. */
  saveNow(): void;
  /** The save before logout and its outcome (D-97). */
  saveBeforeLogout(): Promise<LogoutSave>;
  /** The current game state, real time passed first, as a document to keep in the page (D-211). */
  keep(): KeptGame;
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

function sameScreen(one: Screen, other: Screen): boolean {
  return screenAddress(one) === screenAddress(other);
}

function samePlace(one: ScreenPlace, other: ScreenPlace): boolean {
  return (
    sameScreen(one.screen, other.screen) &&
    one.returnEntry?.text === other.returnEntry?.text &&
    one.returnEntry?.address === other.returnEntry?.address
  );
}

/**
 * Builds the game from the state it starts from and starts its clock and its saver. The view holds
 * the one current game state; it replaces it only with the state a simulation function returned
 * and draws from it and from the real moment of the clock's latest reading, which the resurrection
 * lines need and the state never holds.
 *
 * The view shows one screen at a time, the one the address names (D-280, D-281): Siedziba, the
 * headquarters alone; Postać, built on entering it and disposed on leaving; Programy, the list of
 * programs beside a program panel that shows the saved program the address names, never the copy
 * (D-166); and Przejście, a program panel that shows the copy beside the column of the map run. The
 * DOM screens are built once and hidden while another shows. The two program panels are two, so the
 * program each shows stays its own: a panel that moved between the screens would carry the program
 * shown on one into the other. The first screen is the entry's (D-96, D-212,
 * D-225): after the sign-in form and at a reload with no fragment Siedziba or the map run's screen
 * where the state holds one, at a reload at an address the screen it names, and after an emailed
 * link Siedziba; the view writes that screen's fragment into the address with no new entry of the
 * history. A fragment that names no existing screen opens the nearest one and is replaced the same
 * way. A send leads to Przejście and „Zakończ” to Postać of that character, each with a new entry
 * (D-53); the browser's back and forward and the bar's links reach the view through the address's
 * listener. Leaving Przejście by any change of screen pauses a map run that goes on as „Pauza” does,
 * a moment of saving (D-283, D-207); coming back resumes nothing (D-284). The view tells the page its
 * place through `onScreen`, at the first screen and at each change, with the bar's „Wróć do
 * przejścia” where a map run waits outside its screen.
 *
 * Every act of the player whose result changed the state, every game minute that ends the map run
 * in a death or a completion and every result in which a loop's map run ended is a moment of saving
 * (D-207). Each reading of the clock rewrites the resurrection lines of the screen that shows,
 * Siedziba's or Postać's, also while a map run waits (D-217). The clock catches up the earning
 * loops of a loaded state as the last step of building (D-247). Nothing here runs when the module
 * is imported.
 */
export function createGameView(options: GameViewOptions): GameView {
  const { address } = options;
  let state: GameState = options.state;

  const element = document.createElement("div");
  element.className = "game-view";

  /** An act of the player: its result replaces the state, and a changed state is saved. */
  function act(result: GameResult): void {
    const before = state;
    store.apply(result);
    if (state !== before) saver.moment();
  }

  // What the program panels ask for, Programy's and Przejście's alike. Each act goes to the
  // simulation, which checks it; real time elapsed before the act is passed first, so it runs under
  // the program it ran under.
  const panelControls: ProgramPanelControls = {
    editCopy(program) {
      clock.flush();
      if (state.run) act(setProgram(state, program));
    },
    editProgram(programId, program) {
      clock.flush();
      act(editProgram(state, programId, program));
    },
    createProgram() {
      clock.flush();
      act(createProgram(state));
    },
    renameProgram(programId, name) {
      clock.flush();
      act(renameProgram(state, programId, name));
    },
    deleteProgram(programId) {
      clock.flush();
      act(deleteProgram(state, programId));
    },
    saveCopy() {
      clock.flush();
      act(saveCopyIntoProgram(state));
    },
    saveCopyAsNew(name) {
      clock.flush();
      act(saveCopyAsNewProgram(state, name));
    },
    discardCopy() {
      clock.flush();
      act(discardCopyChanges(state));
    },
    switchProgram(programId) {
      clock.flush();
      act(switchProgram(state, programId));
    },
  };
  // The panel of Przejście shows the copy and holds the select list of programs; the panel of
  // Programy shows a saved program, which the list beside it and the address name.
  const runPanel = createProgramPanel(panelControls, "run");
  runPanel.element.classList.add("screen-area");
  const programsPanel = createProgramPanel(panelControls, "programs");
  programsPanel.element.classList.add("screen-area");

  const store: GameStore = {
    get: () => state,
    apply(result: GameResult): void {
      if (result.state === state) return;
      const ended =
        state.run !== null &&
        !mapRunEnded(state.run) &&
        result.state.run !== null &&
        mapRunEnded(result.state.run);
      const loopEnded = result.events.some(
        (event) => event.kind === "loopRunEnded",
      );
      state = result.state;
      runPanel.update(state, result.events);
      programsPanel.update(state, result.events);
      renderScreens();
      // A game minute that ends the map run in a death or a completion, and a result in which a
      // loop's map run ended, however many, is one moment of saving (D-207).
      if (ended || loopEnded) saver.moment();
    },
  };
  // After each reading of the clock the screen that shows rewrites its resurrection lines at the
  // moment read, Siedziba's or Postać's, also while a map run waits: real time passes there with no
  // change of the game state, so nothing is applied to the store and nothing is saved by a tick.
  const clock = startClock(store, () => {
    if (current.kind === "headquarters")
      headquarters.tick(state, clock.moment());
    characterScreen?.update(characterProps(characterScreen.characterId));
  });
  const saver = createGameSaver({
    client: options.client,
    read() {
      clock.flush();
      return state;
    },
    moment: () => clock.moment(),
    // The rhythm of 30 seconds is the manual map run's; loops are saved at acts, ends and hiding.
    runPasses: () =>
      state.run !== null && !mapRunEnded(state.run) && !state.paused,
    state,
    revision: options.revision,
    afterConflict: options.afterConflict ?? false,
    onConflict: () => options.onConflict(),
    onOutdated: () => options.onOutdated(),
    onSignedOut: () => options.onSignedOut(),
  });

  const headquarters = createHeadquarters({
    create(name) {
      act(createCharacter(state, name));
    },
    pick(characterId, programId) {
      clock.flush();
      act(pickProgram(state, characterId, programId));
    },
    // A send leads to the screen of the map run, with a new entry of the history (D-53, D-281).
    send(characterId, mapId, programId) {
      if (state.run) return;
      const before = state;
      clock.send({ mapId, characterId, programId });
      if (state !== before) saver.moment();
      // The send replaced the state through the store, which `state` read again shows.
      const started = store.get().run;
      if (started !== null) {
        show({ kind: "run", characterId: started.character.id }, "go");
        runScreen.focus();
      }
    },
    // An act of the player like a send: the reading is made first, and a changed state is saved (D-207).
    startLoop(characterId, mapId, programId) {
      const before = state;
      clock.startLoop({ mapId, characterId, programId });
      if (state !== before) saver.moment();
    },
    stop(characterId) {
      clock.flush();
      act(stopLoop(state, characterId));
    },
    closeReport() {
      clock.flush();
      act(closeAwayReport(state));
    },
  });
  headquarters.element.classList.add("screen-area");
  // Siedziba: the headquarters alone.
  const headquartersScreen = document.createElement("section");
  headquartersScreen.className = "screen headquarters-screen";
  headquartersScreen.tabIndex = -1;
  headquartersScreen.append(headquarters.element);
  // Programy: the list of programs and the program panel, which the list and the address pick for.
  const programsScreen = document.createElement("section");
  programsScreen.className = "screen programs-screen";
  programsScreen.tabIndex = -1;

  const runScreen = createRunScreen(runPanel.element, {
    togglePause() {
      clock.flush();
      act(setPaused(state, !state.paused));
    },
    // Real time elapsed before the click is passed at the old pace.
    setPace(pace) {
      clock.flush();
      act(setPace(state, pace));
    },
    restart() {
      clock.flush();
      if (state.run) act(restart(state));
    },
    // „Zakończ” leads to the screen Postać of the character, with a new entry (D-53, D-62, D-132).
    end() {
      clock.flush();
      if (state.run === null) return;
      const characterId = state.run.character.id;
      act(end(state));
      show({ kind: "character", characterId }, "go");
      characterScreen?.focus();
    },
  });
  element.append(headquartersScreen, programsScreen, runScreen.element);

  /** The screen Postać, which stands only while the player is on it, with its character's number. */
  let characterScreen: (CharacterScreen & { characterId: CharacterId }) | null =
    null;

  function characterProps(characterId: CharacterId) {
    return { state, nowMs: clock.moment(), characterId };
  }

  function openCharacterScreen(characterId: CharacterId): void {
    if (characterScreen?.characterId === characterId) return;
    characterScreen?.dispose();
    const screen = createCharacterScreen({
      onBuy(branch) {
        act(buyBranch(state, characterId, branch));
      },
      onStop() {
        clock.flush();
        act(stopLoop(state, characterId));
      },
      props: characterProps(characterId),
    });
    characterScreen = { ...screen, characterId };
    element.append(screen.element);
  }

  function closeCharacterScreen(): void {
    characterScreen?.dispose();
    characterScreen = null;
  }

  /** The screen the player is on. */
  let current: Screen = firstScreen();

  /**
   * The saved program Programy shows for `screen`: the one its address names, the first of the list
   * for `#/programy` and where the one named is gone (D-281).
   */
  function programShownOn(screen: Screen): ProgramId {
    const named =
      screen.kind === "program" ? screen.programId : state.programs[0].id;
    return programById(state.programs, named) ? named : state.programs[0].id;
  }

  // The list of programs on Programy. A pick is a link to the program's address, which the address
  // listener below turns into the screen; the list's acts go to the simulation (D-166, D-167, D-169).
  const programList = createProgramList({
    onCreate() {
      clock.flush();
      const programId = state.nextProgramId;
      act(createProgram(state));
      if (programById(state.programs, programId))
        show({ kind: "program", programId }, "go");
    },
    onRename(programId, name) {
      clock.flush();
      act(renameProgram(state, programId, name));
    },
    onDelete(programId) {
      clock.flush();
      act(deleteProgram(state, programId));
      // The program shown may be the one gone: the nearest screen opens in its place (D-281).
      const nearest = resolveScreen(current, state);
      if (!sameScreen(nearest, current)) show(nearest, "replace");
      focusShownScreen();
    },
    props: { programs: state.programs, chosenId: null },
  });
  programList.element.classList.add("screen-area");
  programsScreen.append(programList.element, programsPanel.element);
  /** What the list was last drawn from, so a game minute that changes no program redraws nothing. */
  let drawnPrograms: {
    programs: GameState["programs"];
    chosenId: ProgramId;
  } | null = null;

  /** Gives the program panel and the list of Programy the program they show. */
  function drawPrograms(): void {
    const chosenId = programShownOn(current);
    programsPanel.showProgram(chosenId);
    if (
      drawnPrograms?.programs === state.programs &&
      drawnPrograms.chosenId === chosenId
    )
      return;
    drawnPrograms = { programs: state.programs, chosenId };
    programList.update({ programs: state.programs, chosenId });
  }
  /** The place the page was last told. */
  let told: ScreenPlace | null = null;
  let disposed = false;

  /** The first screen, by how the page came to build the game (D-96, D-212, D-225, D-281). */
  function firstScreen(): Screen {
    switch (options.entry) {
      case "sign-in":
        return landing(state);
      case "link":
        return { kind: "headquarters" };
      case "address": {
        const hash = address.hash();
        return hash === ""
          ? landing(state)
          : resolveScreen(readScreenAddress(hash), state);
      }
    }
  }

  /**
   * Leaving the screen of a map run that goes on pauses it as „Pauza” does, a moment of saving
   * (D-283, D-207); a paused or an ended map run is left as it is.
   */
  function pauseOnLeaving(): void {
    clock.flush();
    if (state.run !== null && !mapRunEnded(state.run) && !state.paused)
      act(setPaused(state, true));
  }

  /** Tells the page where the player is, when that changed. */
  function tellPlace(): void {
    if (disposed) return;
    const place: ScreenPlace = {
      screen: current,
      returnEntry: current.kind === "run" ? null : returnToRunEntry(state),
    };
    if (told !== null && samePlace(told, place)) return;
    told = place;
    options.onScreen(place);
  }

  /**
   * Shows `next`: the address gets its fragment with a new entry (`go`), in place of the current
   * one (`replace`) or not at all, where the address already names it. The screen that holds
   * `next` shows and the others hide, Postać is built on entering and disposed on leaving, Programy
   * shows the program `next` names, and leaving Przejście pauses its map run. Text typed on
   * Programy and not yet committed goes to the program it was typed into before the screen or the
   * program changes.
   */
  function show(next: Screen, how: "go" | "replace" | "none"): void {
    if (!sameScreen(current, next)) commitProgramsScreen();
    if (current.kind === "run" && next.kind !== "run") pauseOnLeaving();
    const hash = screenAddress(next);
    if (how === "go") address.go(hash);
    else if (how === "replace") address.replace(hash);
    current = next;
    if (next.kind === "character") openCharacterScreen(next.characterId);
    else closeCharacterScreen();
    const holder = screenHolder(next);
    headquartersScreen.hidden = holder !== headquartersScreen;
    programsScreen.hidden = holder !== programsScreen;
    runScreen.element.hidden = holder !== runScreen.element;
    drawPrograms();
    tellPlace();
  }

  /**
   * An editor field of Programy that has focus commits its text when it loses focus, to the program
   * it was typed into; the commit is made before the screen or the program changes.
   */
  function commitProgramsScreen(): void {
    const active = document.activeElement;
    if (active && programsScreen.contains(active))
      (active as HTMLElement).blur();
  }

  /** The DOM screen that shows for `screen`; none for Postać, which is built on entering. */
  function screenHolder(screen: Screen): HTMLElement | null {
    switch (screen.kind) {
      case "headquarters":
        return headquartersScreen;
      case "programs":
      case "program":
        return programsScreen;
      case "run":
        return runScreen.element;
      case "character":
        return null;
    }
  }

  /** Draws every screen from the state; a hidden one is current when it shows. */
  function renderScreens(): void {
    headquarters.update(state, clock.moment());
    if (state.run !== null) runScreen.update(state, state.run);
    characterScreen?.update(characterProps(characterScreen.characterId));
    drawPrograms();
    tellPlace();
  }

  /** The element of the screen that shows. */
  function shownElement(): HTMLElement | null {
    return current.kind === "character"
      ? (characterScreen?.element ?? null)
      : current.kind === "run"
        ? runScreen.element
        : screenHolder(current);
  }

  /**
   * Moves keyboard focus to the screen that shows where it stands nowhere useful: on the body —
   * the link followed left the bar, or the browser's button moved nothing — or on a screen of the
   * game that is hidden now, so the keyboard goes on from the screen the player sees.
   */
  function focusShownScreen(): void {
    const active = document.activeElement;
    const shown = shownElement();
    const lost =
      active === null ||
      active === document.body ||
      (element.contains(active) && shown?.contains(active) !== true);
    if (lost) shown?.focus();
  }

  // The browser's back and forward, and a link of the bar: the address names the screen; one that
  // names no existing screen opens the nearest and is replaced with its address (D-281).
  const stopListening = address.onChange(() => {
    if (disposed) return;
    const hash = address.hash();
    const screen = resolveScreen(readScreenAddress(hash), state);
    show(screen, screenAddress(screen) === hash ? "none" : "replace");
    focusShownScreen();
  });

  runPanel.update(state, []);
  programsPanel.update(state, []);
  renderScreens();
  show(current, "replace");
  // The catch-up is the last step of building, so every place of loading goes the same way (D-212).
  clock.catchUp();

  return {
    element,
    saveLine: saver.element,
    saveNow: () => saver.moment(),
    saveBeforeLogout: () => saver.saveBeforeLogout(),
    keep(): KeptGame {
      clock.flush();
      return {
        document: savedGame(withSaveTime(state, clock.moment())),
        revision: saver.revision(),
      };
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      stopListening();
      clock.dispose();
      saver.dispose();
      closeCharacterScreen();
      programList.dispose();
      element.remove();
      saver.element.remove();
    },
  };
}
