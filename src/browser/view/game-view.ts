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
  type GameEvent,
  type GameResult,
} from "../sim/game.js";
import {
  copyHasUnsavedChanges,
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  pickProgram,
  programById,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  suggestedProgramName,
  switchProgram,
} from "../sim/programs.js";
import { closeAwayReport, stopLoop } from "../sim/loop.js";
import { savedGame, type SavedGame } from "../sim/saved-game.js";
import type { CharacterId, GameState, MapId, ProgramId } from "../sim/types.js";
import { buyBranch } from "../sim/skills.js";
import {
  createCharacterScreen,
  type CharacterScreen,
} from "./character-screen.js";
import { startClock, type GameStore } from "./clock.js";
import { createChronicle } from "./chronicle.js";
import type { CopyAct } from "./chronicle-entries.js";
import {
  readConfirmationToken,
  type PageAddress,
} from "./email-confirmation.js";
import { createGameSaver, type LogoutSave } from "./game-saver.js";
import { createHeadquarters } from "./headquarters.js";
import {
  createMapsScreen,
  type MapsScreen,
  type MapsScreenControls,
} from "./maps-screen.js";
import { createProgramList } from "./program-list.js";
import {
  createFolding,
  createProgramPanel,
  type ProgramPanelControls,
} from "./program-panel.js";
import { readResetToken } from "./password-reset.js";
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
   * Stops the game taking any change, for good (D-323): after an error that no code of the game
   * handled the store rejects every later result of the simulation, so the clock and the buttons
   * change nothing, and the clock stops, so that a later read of the state for a save makes no
   * reading of it, whose error would come back with every save. The saver goes on as D-207, D-208
   * and D-97 give, with the state the game held. Calling it again does nothing.
   */
  halt(): void;
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
 * headquarters alone, built once; Postać, built on entering it and disposed on leaving; Mapy, built
 * on entering `#/mapy` or `#/mapy/{map}` and disposed on leaving, the card of the map the address
 * names beside the list of open maps (D-325); Programy, the list of programs beside a program panel that shows
 * the saved program the address names, never the copy (D-166), and with no number the program the
 * copy belonged to after „Zakończ” (D-173); and Przejście, a program panel that shows the copy
 * beside the column of the map run. The screens built once are hidden while another shows.
 * The two program panels are two, so the program each shows stays its own: a panel that moved
 * between the screens would carry the program shown on one into the other. The first screen is the
 * entry's (D-96, D-212, D-225): after the sign-in form and at a reload with no fragment Siedziba or
 * the map run's screen where the state holds one, at a reload at an address the screen it names,
 * and after an emailed link Siedziba; the view writes that screen's fragment into the address with
 * no new entry of the history. A fragment that names no existing screen opens the nearest one and
 * is replaced the same way.
 *
 * A send, „Wejdź” of a character on the screen Mapy, leads to Przejście and „Zakończ” to Postać of
 * that character, each with a new entry (D-53, D-329), while „Puść w pętlę” leaves the player on
 * the screen Mapy. „Zakończ” asks „Zapisać, odrzucić, wrócić?” and acts on the answer where the
 * copy holds unsaved changes (D-173); the browser's back and forward and the bar's links reach the
 * view through the address's listener, which reloads the page where the fragment of an emailed link
 * appears in the address (D-352). Leaving Przejście by any change of screen pauses a map run
 * that goes on as „Pauza” does, a moment of saving (D-283, D-207); coming back resumes nothing
 * (D-284). The view tells the page its place through `onScreen`, at the first screen and at each
 * change, with the bar's „Wróć do przejścia” where a map run waits outside its screen.
 *
 * The question of „Zakończ” is a memory of the view alone, never of the game state or of a save
 * (D-173): it pauses a map run that goes on as „Pauza” does and remembers that it did, so „Wróć”
 * puts the map run back as it was, and remembers which button asked it, „Zakończ” or „Otwarte:
 * {mapa} →”, so „Zapisz” and „Odrzuć” lead to Postać or to the card of the opened map; it closes at
 * „Wróć”, at „Wznów” and „Restart”, at the leaving of Przejście and whenever the copy stops holding
 * unsaved changes, and after `halt()` it changes nothing (D-323).
 *
 * The end-of-run window (D-362) is a memory of the view too, whether it is open: it opens when a map
 * run ends and at every entering of the screen of an ended map run, is open when the view is built
 * on one, and closes at „✕” and Escape, when the question stands and when the map run ends or
 * starts again; „Koniec przejścia” in the header opens it. The view tells the screen of the map run
 * whether the window stands, which is while it is open, the player is on that screen and no
 * question stands.
 *
 * Every act of the player whose result changed the state, every game minute that ends the map run
 * in a death or a completion and every result in which a loop's map run ended is a moment of saving
 * (D-207). Each reading of the clock rewrites the resurrection lines of the screen that shows,
 * Siedziba's, Postać's or Mapy's, also while a map run waits (D-217). The clock catches up the
 * earning loops of a loaded state as the last step of building (D-247). After `halt()` the store
 * replaces the state no more (D-323). Nothing here runs when the module is imported.
 */
export function createGameView(options: GameViewOptions): GameView {
  const { address } = options;
  let state: GameState = options.state;
  /** The game takes no change any more: an error nothing handled stopped it (D-323). */
  let halted = false;
  /**
   * The question „Zapisać, odrzucić, wrócić?” of „Zakończ” or of „Otwarte: {mapa} →”, null while
   * none stands (D-173): `resume` is whether „Wróć” sets the map run going again, which is so when
   * the question paused a map run that went on, and `opens` the map „Otwarte: {mapa} →” asked it
   * for, null where „Zakończ” did, since „Zapisz” and „Odrzuć” lead where the button that asked
   * leads. It lives in the memory of the page only.
   */
  let question: {
    readonly resume: boolean;
    readonly opens: MapId | null;
  } | null = null;
  /**
   * Whether the end-of-run window is open (D-362): a memory of the page, never of the game state or
   * the save. It opens when a map run ends and at every entering of the screen of an ended map run,
   * it is open when the view is built on one, and it closes at „✕” and Escape, when the question
   * stands, and when the map run ends or starts again. The window stands only while it is open, the
   * player is on the screen of an ended map run and no question stands.
   */
  let endWindowOpen = state.run !== null && mapRunEnded(state.run);
  /**
   * The window opened before the page placed the game, where focus cannot go to it: the first
   * reading of the clock after the game stands in the page moves it there, where focus is lost.
   */
  let windowFocusOwed = false;

  const element = document.createElement("div");
  element.className = "game-view";

  /**
   * An act of the player: its result replaces the state, and a changed state is saved. An act on the
   * copy gives, with its result, what the act was, for the chronicle (D-342).
   */
  function act(result: GameResult, copyAct?: CopyAct): void {
    const before = state;
    take(result, copyAct);
    if (state !== before) saver.moment();
  }

  // What the program panels ask for, Programy's and Przejście's alike. Each act goes to the
  // simulation, which checks it; real time elapsed before the act is passed first, so it runs under
  // the program it ran under.
  const panelControls: ProgramPanelControls = {
    // `move` is the hint of the editor's move sites; it goes to the chronicle and never into the
    // simulation (D-342).
    editCopy(program, move) {
      clock.flush();
      if (state.run)
        act(setProgram(state, program), { kind: "edit", move: move ?? null });
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
      act(saveCopyIntoProgram(state), { kind: "save" });
    },
    saveCopyAsNew(name) {
      clock.flush();
      act(saveCopyAsNewProgram(state, name), { kind: "saveAsNew" });
    },
    discardCopy() {
      clock.flush();
      act(discardCopyChanges(state), { kind: "discard" });
    },
    switchProgram(programId) {
      clock.flush();
      act(switchProgram(state, programId), { kind: "switch" });
    },
  };
  // The panel of Przejście shows the copy and holds the select list of programs; the screen of the
  // map run updates it with the map run it is given (D-281). The panel of Programy shows a saved
  // program, which the list beside it and the address name.
  // The folding of rule groups is one memory of the page, which both panels read and change; it is
  // not part of the game state, so a reload forgets it (D-295).
  const folding = createFolding();
  // The chronicle of the map run is one memory of the page too, made from the state the game is built
  // from and recording every result the store takes; it is not part of the game state or the save
  // (D-339).
  const chronicle = createChronicle(state);
  // The panel of Przejście stands in the program's area of its screen, under the band of a discovery.
  const runPanel = createProgramPanel(panelControls, "run", folding);
  const programsPanel = createProgramPanel(panelControls, "programs", folding);
  programsPanel.element.classList.add("screen-area");

  /**
   * Takes a result into the game: the one place every result passes, the clock's readings, a send and
   * every act of the player alike. The chronicle records it with the state before it, and with what
   * an act on the copy was, after the state is replaced and before the screens draw (D-04, D-339).
   */
  function take(result: GameResult, copyAct?: CopyAct): void {
    if (halted || result.state === state) return;
    const before = state;
    const ended =
      state.run !== null &&
      !mapRunEnded(state.run) &&
      result.state.run !== null &&
      mapRunEnded(result.state.run);
    const loopEnded = result.events.some(
      (event) => event.kind === "loopRunEnded",
    );
    state = result.state;
    // The window opens at the game minute a map run ends. The end and the restart of the map run
    // leave no ended map run, which is where it stands no more (D-362).
    if (ended) endWindowOpen = true;
    chronicle.record(result, before, copyAct);
    // The question has no sense once the copy holds no unsaved changes; it does not come back.
    if (question !== null && !copyHasUnsavedChanges(state)) question = null;
    programsPanel.update(state, result.events);
    renderScreens(result.events);
    // A game minute that ends the map run in a death or a completion, and a result in which a
    // loop's map run ended, however many, is one moment of saving (D-207).
    if (ended || loopEnded) saver.moment();
  }

  const store: GameStore = {
    get: () => state,
    apply: (result) => take(result),
  };
  // After each reading of the clock the screen that shows rewrites its resurrection lines at the
  // moment read, Siedziba's, Postać's or Mapy's, also while a map run waits: real time passes there
  // with no change of the game state, so nothing is applied to the store and nothing is saved by a
  // tick.
  const clock = startClock(store, () => {
    if (current.kind === "headquarters")
      headquarters.update(headquartersProps());
    characterScreen?.update(characterProps(characterScreen.characterId));
    drawMapsScreen();
    focusOwedWindow();
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

  // What the screen Mapy asks for, the sending of a character (D-329). Each act goes to the
  // simulation, which checks it; the reading of the clock is made first, so the act runs at the
  // moment of the click.
  const mapsControls: MapsScreenControls = {
    pick(characterId, programId) {
      mapsAct(() => {
        clock.flush();
        act(pickProgram(state, characterId, programId));
      });
    },
    // „Wejdź” leads to the screen of the map run, with a new entry of the history (D-53, D-281).
    enter(characterId, mapId, programId) {
      mapsAct(() => {
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
      });
    },
    // An act of the player like a send: the reading is made first, and a changed state is saved
    // (D-207). The player stays on the screen Mapy (D-329).
    startLoop(characterId, mapId, programId) {
      mapsAct(() => {
        const before = state;
        clock.startLoop({ mapId, characterId, programId });
        if (state !== before) saver.moment();
      });
    },
    stop(characterId) {
      mapsAct(() => {
        clock.flush();
        act(stopLoop(state, characterId));
      });
    },
  };

  function headquartersProps() {
    return { state, nowMs: clock.moment() };
  }

  // What Siedziba asks for: the three acts of its screen. Each goes to the simulation, which checks
  // it; the reading of the clock is made first where the act depends on real time.
  const headquarters = createHeadquarters({
    controls: {
      create(name) {
        act(createCharacter(state, name));
      },
      stop(characterId) {
        clock.flush();
        act(stopLoop(state, characterId));
      },
      closeReport() {
        clock.flush();
        act(closeAwayReport(state));
      },
    },
    props: headquartersProps(),
  });
  // Siedziba: the headquarters alone.
  const headquartersScreen = document.createElement("section");
  headquartersScreen.className = "screen headquarters-screen";
  headquartersScreen.tabIndex = -1;
  headquartersScreen.append(headquarters.element);
  // Programy: the list of programs and the program panel, which the list and the address pick for.
  const programsScreen = document.createElement("section");
  programsScreen.className = "screen programs-screen";
  programsScreen.tabIndex = -1;

  /**
   * Closes the question without a word to the map run: „Wznów”, „Restart”, the leaving of the
   * screen and the end of the map run each do their own act after it. Nothing after `halt()`.
   */
  function closeQuestion(): void {
    if (halted || question === null) return;
    question = null;
    runScreen.setQuestion(false);
  }

  /** Whether the end-of-run window stands over the screen now (D-362, D-311). */
  function windowShown(): boolean {
    return (
      endWindowOpen &&
      current.kind === "run" &&
      question === null &&
      state.run !== null &&
      mapRunEnded(state.run)
    );
  }

  /** Tells the screen of the map run whether the window stands. */
  function syncWindow(): void {
    runScreen.setWindow(windowShown());
  }

  /** Moves the focus to a window opened before the page placed the game, where focus is lost. */
  function focusOwedWindow(): void {
    if (!windowFocusOwed || !element.isConnected) return;
    windowFocusOwed = false;
    const active = document.activeElement;
    if (windowShown() && (active === null || active === document.body))
      runScreen.focusWindow();
  }

  /**
   * Ends the map run with `result`, which is `end` of the state or `end` of the state after a save,
   * and leads to the screen Postać of its character, or, where `opens` names a map, to the screen
   * Mapy at the card of that map, with a new entry (D-53, D-62, D-132, D-173).
   */
  function endRun(
    result: (before: GameState) => GameResult,
    opens: MapId | null,
  ): void {
    const run = state.run;
    if (run === null) return;
    const characterId = run.character.id;
    question = null;
    act(result(state));
    if (opens === null) {
      show({ kind: "character", characterId }, "go");
      characterScreen?.focus();
    } else {
      show({ kind: "map", mapId: opens }, "go");
      mapsScreen?.focus();
    }
  }

  /**
   * „Zakończ” (`opens` null) or „Otwarte: {mapa} →” of the header or the window: the map run ends at
   * once where the copy holds no unsaved changes, and otherwise the question is asked, which closes
   * the window and remembers which button asked it (D-173, D-53). A second ask leaves the question.
   */
  function askToEnd(opens: MapId | null): void {
    clock.flush();
    if (state.run === null) return;
    if (!copyHasUnsavedChanges(state)) {
      endRun(end, opens);
      return;
    }
    if (halted || question !== null) return;
    const run = state.run;
    // A map run that goes on stops as „Pauza” stops it; „Wróć” sets it going again.
    const resume = !mapRunEnded(run) && !state.paused;
    question = { resume, opens };
    // The window covers the program panel, where the question stands, so it closes and stays closed
    // after „Wróć” (D-173, D-311).
    endWindowOpen = false;
    if (resume) act(setPaused(state, true));
    runScreen.setQuestion(true);
    syncWindow();
    runScreen.focusQuestion();
  }

  const runScreen = createRunScreen(
    runPanel,
    {
      togglePause() {
        clock.flush();
        closeQuestion();
        act(setPaused(state, !state.paused));
      },
      // Real time elapsed before the click is passed at the old pace.
      setPace(pace) {
        clock.flush();
        act(setPace(state, pace));
      },
      // „Restart” of the window closes it with the map run it covers; the focus then goes where the
      // header's „Restart” leaves it, on that button (D-62, D-362).
      restart() {
        clock.flush();
        const fromWindow = windowShown();
        closeQuestion();
        if (state.run) act(restart(state));
        if (fromWindow && !halted) runScreen.focusHeaderButton("Restart");
      },
      // „Zakończ” leads to the screen Postać of the character, with a new entry (D-53, D-62, D-132);
      // with unsaved changes in the copy it asks first (D-173). A second click leaves the question.
      end() {
        askToEnd(null);
      },
      // „Otwarte: {mapa} →” of the window ends the map run as „Zakończ” does and leads to the screen
      // Mapy at the card of the map it opened (D-53, D-173).
      openMap(mapId) {
        askToEnd(mapId);
      },
      // „Koniec przejścia” of the header opens the window; a question standing goes as „Wróć” closes
      // it, since the window and the question never stand together (D-311).
      openWindow() {
        if (halted || state.run === null || !mapRunEnded(state.run)) return;
        closeQuestion();
        endWindowOpen = true;
        syncWindow();
      },
      // „✕” and Escape of the window; the screen moves the focus to „Koniec przejścia” (D-362).
      closeWindow() {
        if (halted) return;
        endWindowOpen = false;
        syncWindow();
      },
      // „Zapisz”: the copy goes into its program, or, its program gone, into a new program under the
      // first free name, and the map run ends (D-173, D-171, D-172).
      saveAndEnd() {
        if (halted || question === null) return;
        const { opens } = question;
        clock.flush();
        if (state.run === null || !copyHasUnsavedChanges(state)) return;
        endRun((before) => {
          const saved =
            programById(before.programs, before.run?.copy.programId) ===
            undefined
              ? saveCopyAsNewProgram(
                  before,
                  suggestedProgramName(before.programs),
                )
              : saveCopyIntoProgram(before);
          const ended = end(saved.state);
          return {
            state: ended.state,
            events: [...saved.events, ...ended.events],
          };
        }, opens);
      },
      // „Odrzuć”: the map run ends and the copy's unsaved changes go with it (D-173).
      discardAndEnd() {
        if (halted || question === null) return;
        const { opens } = question;
        clock.flush();
        endRun(end, opens);
      },
      // „Wróć”: the map run stays as it was before „Zakończ” (D-173).
      back() {
        if (halted || question === null) return;
        const { resume } = question;
        closeQuestion();
        if (resume) {
          clock.flush();
          if (state.run !== null && !mapRunEnded(state.run) && state.paused)
            act(setPaused(state, false));
        }
        focusShownScreen();
      },
    },
    chronicle,
  );
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

  /**
   * The screen Mapy, which stands only while the player is on it, with the map its address names,
   * null under `#/mapy`. Both addresses are one screen: a pick of a map on its list changes the map
   * and builds nothing again.
   */
  let mapsScreen: (MapsScreen & { mapId: MapId | null }) | null = null;

  function mapsProps(mapId: MapId | null) {
    return { state, nowMs: clock.moment(), mapId };
  }

  /** True while an act of the screen Mapy runs, so that the screen is drawn once, at its end. */
  let mapsActing = false;

  /**
   * Draws the screen Mapy from the state and the clock's latest moment, unless one of its acts is
   * running. The screen moves the keyboard's focus to the control its click is owed on the first
   * draw after the click, and the reading of the clock the act makes first would otherwise be that
   * draw, before the state holds the change the control stands for (D-329).
   */
  function drawMapsScreen(): void {
    if (mapsActing) return;
    mapsScreen?.update(mapsProps(mapsScreen.mapId));
  }

  /** Runs an act of the screen Mapy and then draws the screen once, synchronously from the click. */
  function mapsAct(body: () => void): void {
    mapsActing = true;
    try {
      body();
    } finally {
      mapsActing = false;
    }
    drawMapsScreen();
  }

  function openMapsScreen(mapId: MapId | null): void {
    if (mapsScreen !== null) {
      if (mapsScreen.mapId !== mapId) {
        mapsScreen.mapId = mapId;
        mapsScreen.update(mapsProps(mapId));
      }
      return;
    }
    const screen = createMapsScreen({
      controls: mapsControls,
      props: mapsProps(mapId),
    });
    mapsScreen = { ...screen, mapId };
    element.append(screen.element);
  }

  function closeMapsScreen(): void {
    mapsScreen?.dispose();
    mapsScreen = null;
  }

  /** The screen the player is on. */
  let current: Screen = firstScreen();

  /**
   * The saved program Programy shows for `screen`: the one its address names; for `#/programy` the
   * program the copy of the last map run belonged to, which the counts stand beside from „Zakończ”
   * to the next send (D-173, D-93), or the first of the list where none does; and the first where
   * the one named is gone (D-281).
   */
  function programShownOn(screen: Screen): ProgramId {
    const named =
      screen.kind === "program"
        ? screen.programId
        : (state.countsProgram ?? state.programs[0].id);
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
  // Programy has two areas, the list and the program panel; an open rule's panel stands in the panel's
  // rule list, under the row or header it changes (D-288, D-282).
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
   * `next` shows and the others hide, Postać and Mapy are built on entering and disposed on
   * leaving, Programy shows the program `next` names, and leaving Przejście pauses its map run. Text typed on
   * Programy and not yet committed goes to the program it was typed into before the screen or the
   * program changes.
   */
  function show(next: Screen, how: "go" | "replace" | "none"): void {
    if (!sameScreen(current, next)) commitProgramsScreen();
    if (current.kind === "run" && next.kind !== "run") {
      closeQuestion();
      pauseOnLeaving();
    }
    // The window opens at every entering of the screen of an ended map run (D-362).
    if (
      current.kind !== "run" &&
      next.kind === "run" &&
      state.run !== null &&
      mapRunEnded(state.run)
    )
      endWindowOpen = true;
    const hash = screenAddress(next);
    if (how === "go") address.go(hash);
    else if (how === "replace") address.replace(hash);
    current = next;
    if (next.kind === "character") openCharacterScreen(next.characterId);
    else closeCharacterScreen();
    if (next.kind === "maps") openMapsScreen(null);
    else if (next.kind === "map") openMapsScreen(next.mapId);
    else closeMapsScreen();
    const holder = screenHolder(next);
    headquartersScreen.hidden = holder !== headquartersScreen;
    programsScreen.hidden = holder !== programsScreen;
    runScreen.element.hidden = holder !== runScreen.element;
    // After the screen shows, so the window takes the focus on a screen that is there to take it.
    syncWindow();
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

  /**
   * The DOM screen that shows for `screen`; none for Postać and Mapy, which are built on entering.
   */
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
      case "maps":
      case "map":
        return null;
    }
  }

  /**
   * Draws every screen from the state; a hidden one is current when it shows. `events` are those
   * of the simulation call that returned the state. Przejście, its program panel included, is
   * given the state's map run while the state holds one (D-281); without one it keeps what it
   * showed, hidden, until the next send.
   */
  function renderScreens(events: readonly GameEvent[]): void {
    headquarters.update(headquartersProps());
    runScreen.setQuestion(question !== null);
    syncWindow();
    if (state.run !== null) runScreen.update(state, state.run, events);
    characterScreen?.update(characterProps(characterScreen.characterId));
    drawMapsScreen();
    drawPrograms();
    tellPlace();
  }

  /** The element of the screen that shows. */
  function shownElement(): HTMLElement | null {
    switch (current.kind) {
      case "character":
        return characterScreen?.element ?? null;
      case "maps":
      case "map":
        return mapsScreen?.element ?? null;
      case "run":
        return runScreen.element;
      default:
        return screenHolder(current);
    }
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
    const screen = resolveScreen(readScreenAddress(hash), state);
    show(screen, screenAddress(screen) === hash ? "none" : "replace");
    focusShownScreen();
  });

  programsPanel.update(state, []);
  renderScreens([]);
  show(current, "replace");
  windowFocusOwed = windowShown();
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
    halt(): void {
      halted = true;
      clock.dispose();
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      stopListening();
      clock.dispose();
      saver.dispose();
      closeCharacterScreen();
      closeMapsScreen();
      headquarters.dispose();
      programList.dispose();
      runPanel.dispose();
      programsPanel.dispose();
      element.remove();
      saver.element.remove();
    },
  };
}
