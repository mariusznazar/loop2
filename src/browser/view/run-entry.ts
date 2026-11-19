/**
 * The entry of the screen Przejście in the registry of screens (D-281, D-283, D-284, D-311, D-368):
 * the screen of a manual map run with its program panel, built once and hidden while another screen
 * shows. The entry carries out the acts of the screen against the store and gives the screen and
 * its panel the state of the screen (`run-screen-state.ts`), from which each reads the question
 * „Zapisać, odrzucić, wrócić?” and the end-of-run window itself (D-407); it moves the focus after a
 * change, to the question, to the window and to a button of the header, and carries out the focus
 * owed to the window. The screen takes its map run as a parameter and reads none by itself (D-281).
 * Nothing here runs when the module is imported.
 */
import {
  end,
  mapRunEnded,
  restart,
  setPace,
  setPaused,
  type GameResult,
} from "../sim/game.js";
import {
  copyHasUnsavedChanges,
  programById,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  suggestedProgramName,
} from "../sim/programs.js";
import type { GameState, MapId } from "../sim/types.js";
import type { Chronicle } from "./chronicle.js";
import {
  createProgramPanel,
  type Folding,
  type ProgramPanelControls,
} from "./program-panel.js";
import type { RunScreenState } from "./run-screen-state.js";
import { createRunScreen, type RunScreenControls } from "./run-screen.js";
import type { Screen, ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type RunEntryOptions = {
  readonly store: Pick<StateStore, "get" | "act" | "halted">;
  /** The state of the screen: the question, the window and the focus owed to it. */
  readonly screenState: RunScreenState;
  /** The acts of the program panel, shared with Programy. */
  readonly acts: ProgramPanelControls;
  /** The memory of the folding of rule groups, shared with Programy (D-295). */
  readonly folding: Folding;
  /** The chronicle memory of the map run (D-339). */
  readonly chronicle: Chronicle;
  /** The game's element, whose being in the page the focus owed to the window waits for. */
  readonly gameElement: HTMLElement;
};

/** Makes the entry of Przejście. */
export function createRunEntry(options: RunEntryOptions): ScreenEntry {
  const { store, screenState } = options;
  return {
    kinds: ["run"],
    lives: "always",
    build(port) {
      /**
       * Closes the question without a word to the map run: „Wznów”, „Restart”, the leaving of the
       * screen and the end of the map run each do their own act after it. Nothing after `halt()`.
       */
      function closeQuestion(): void {
        screenState.closeQuestion();
      }

      /**
       * Ends the map run with `result`, which is `end` of the state or `end` of the state after a
       * save, inside the act `take` belongs to. Returns the screen it leads to, Postać of its
       * character or, where `opens` names a map, the screen Mapy at the card of that map, with a new
       * entry (D-53, D-62, D-132, D-173); null where no map run stands.
       */
      function endRun(
        take: (result: GameResult) => void,
        result: (before: GameState) => GameResult,
        opens: MapId | null,
      ): Screen | null {
        const { run } = store.get();
        if (run === null) return null;
        const characterId = run.character.id;
        screenState.forgetQuestion();
        take(result(store.get()));
        return opens === null
          ? { kind: "character", characterId }
          : { kind: "map", mapId: opens };
      }

      /** Leads to the screen the end of the map run chose, with a new entry of the history. */
      function leadTo(target: Screen | null): void {
        if (target === null) return;
        port.show(target, "go");
        port.focusShown();
      }

      /**
       * „Zakończ” (`opens` null) or „Otwarte: {mapa} →” of the header or the window: the map run
       * ends at once where the copy holds no unsaved changes, and otherwise the question is asked,
       * which closes the window and remembers which button asked it (D-173, D-53). A second ask
       * leaves the question.
       */
      function askToEnd(opens: MapId | null): void {
        let target: Screen | null = null;
        store.act((take) => {
          const state = store.get();
          if (state.run === null) return;
          if (!copyHasUnsavedChanges(state)) {
            target = endRun(take, end, opens);
            return;
          }
          const asked = screenState.ask(opens);
          if (asked === null) return;
          // A map run that goes on stops as „Pauza” stops it; „Wróć” sets it going again.
          if (asked.resume) take(setPaused(store.get(), true));
          runScreen.focusQuestion();
        });
        leadTo(target);
      }

      const controls: RunScreenControls = {
        togglePause() {
          store.act((take) => {
            closeQuestion();
            const state = store.get();
            take(setPaused(state, !state.paused));
          });
        },
        // Real time elapsed before the click is passed at the old pace.
        setPace(pace) {
          store.act((take) => take(setPace(store.get(), pace)));
        },
        // „Restart” of the window closes it with the map run it covers; the focus then goes where
        // the header's „Restart” leaves it, on that button (D-62, D-368).
        restart() {
          store.act((take) => {
            const fromWindow = screenState.windowShown();
            closeQuestion();
            const state = store.get();
            if (state.run) take(restart(state));
            if (fromWindow && !store.halted())
              runScreen.focusHeaderButton("Restart");
          });
        },
        // „Zakończ” leads to the screen Postać of the character, with a new entry (D-53, D-62,
        // D-132); with unsaved changes in the copy it asks first (D-173). A second click leaves the
        // question.
        end() {
          askToEnd(null);
        },
        // „Otwarte: {mapa} →” of the window ends the map run as „Zakończ” does and leads to the
        // screen Mapy at the card of the map it opened (D-53, D-173).
        openMap(mapId) {
          askToEnd(mapId);
        },
        // „Koniec przejścia” of the header opens the window; a question standing goes as „Wróć”
        // closes it, since the window and the question do not show together (D-311), except after
        // `halt()`, when the question stays and the window waits behind it (D-323).
        openWindow() {
          screenState.openWindow();
        },
        // „✕” and Escape of the window; the screen moves the focus to „Koniec przejścia” (D-368).
        closeWindow() {
          screenState.closeWindow();
        },
        // The scene's effect of a death or a completion has ended, or the scene was hidden while it
        // ran: the window that waited for it stands now (D-322).
        effectEnded() {
          screenState.effectEnded();
        },
        // „Zapisz”: the copy goes into its program, or, its program gone, into a new program under
        // the first free name, and the map run ends (D-173, D-171, D-172).
        saveAndEnd() {
          const asked = screenState.question();
          if (store.halted() || asked === null) return;
          const { opens } = asked;
          let target: Screen | null = null;
          store.act((take) => {
            const state = store.get();
            if (state.run === null || !copyHasUnsavedChanges(state)) return;
            target = endRun(
              take,
              (before) => {
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
              },
              opens,
            );
          });
          leadTo(target);
        },
        // „Odrzuć”: the map run ends and the copy's unsaved changes go with it (D-173).
        discardAndEnd() {
          const asked = screenState.question();
          if (store.halted() || asked === null) return;
          const { opens } = asked;
          let target: Screen | null = null;
          store.act((take) => {
            target = endRun(take, end, opens);
          });
          leadTo(target);
        },
        // „Wróć”: the map run stays as it was before „Zakończ” (D-173).
        back() {
          const asked = screenState.question();
          if (store.halted() || asked === null) return;
          closeQuestion();
          if (asked.resume)
            store.act((take) => {
              const state = store.get();
              if (state.run !== null && !mapRunEnded(state.run) && state.paused)
                take(setPaused(state, false));
            });
          port.focusIfLost();
        },
      };
      // The panel of Przejście stands in the program's area of its screen, under the band of a
      // discovery; it and the screen read the question and the window from the state of the screen.
      const panel = createProgramPanel(options.acts, "run", options.folding, {
        state: screenState,
        answers: controls,
      });
      const runScreen = createRunScreen(
        panel,
        controls,
        options.chronicle,
        screenState,
      );
      if (port.current().kind === "run") screenState.entered();
      /** Whether the player is on this screen: set when it is placed, cleared when it is left. */
      let here = false;

      return {
        element: runScreen.element,
        // Leaving the screen of a map run that goes on pauses it as „Pauza” does, a moment of saving
        // (D-283, D-207); a paused or an ended map run is left as it is.
        leave() {
          closeQuestion();
          store.act((take) => {
            const state = store.get();
            if (state.run !== null && !mapRunEnded(state.run) && !state.paused)
              take(setPaused(state, true));
          });
          screenState.left();
          here = false;
        },
        // The window opens at every entering of the screen of an ended map run (D-368), which
        // the state of the screen holds and the screen reads, so that the window takes the focus
        // on a screen that is there to take it. At each entering the page goes to its top, so the
        // menu bar stands in sight above the screen, whatever the screen left was scrolled to.
        placed(screen) {
          if (screen.kind !== "run") return;
          if (!here) document.documentElement.scrollTop = 0;
          here = true;
          screenState.entered();
        },
        // Przejście, its program panel included, is given the state's map run while the state holds
        // one (D-281); without one it keeps what it showed, hidden, until the next send.
        drawResult(events) {
          const state = store.get();
          if (state.run !== null) runScreen.update(state, state.run, events);
        },
        // The window opened before the page placed the game takes the focus at the first reading
        // after the game stands in the page, where the focus is lost.
        drawReading() {
          if (!screenState.takeOwedFocus(options.gameElement.isConnected))
            return;
          const active = document.activeElement;
          if (active === null || active === document.body)
            runScreen.focusWindow();
        },
        dispose: () => panel.dispose(),
      };
    },
  };
}
