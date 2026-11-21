/**
 * The screen of a manual map run in React, Przejście (D-311, D-280, D-281, D-282, D-19, D-122, D-313,
 * D-368, D-173, D-407): one header — the character's name, the map's name, the clock, the bar of the
 * solving condition and the buttons — over three areas, each a `screen-area` element a narrower
 * layout can rearrange, in this order in the document: the world, the program, the band of a
 * discovery above the program panel, and the area under the drawing, with the tabs „Kronika” and
 * „Teren” and the chronicle or the table of revealed tiles under the tab picked (D-311, D-346). The
 * stylesheet puts the world and, under it, the area with the tabs in the left column and the
 * program in the right one, and one under the other in a narrow window. A rule panel opens in the
 * program panel, under its row (D-288), and changes neither the tabs nor the tab picked. The
 * question „Zapisać, odrzucić, wrócić?” of „Zakończ” is the program panel's: it stands inside the
 * panel, just above the heading of the copy, and the panel reads it from the state of the screen
 * Przejście itself. The end-of-run window (D-368) stands over the screen of an ended map run while
 * the state of the screen Przejście (`run-screen-state.ts`), which the screen reads itself (D-407),
 * shows it: the header and the three areas are then `hidden`, which keeps them in the tree with
 * their state, so the window covers the screen with its header and the menu bar of the page,
 * outside the game view, stays above it; the screen gives the window the entries of „Ostatnie
 * minuty” its chronicle memory holds, and carries out the window's „✕”, Escape and „Dodaj regułę z
 * tym” itself, asking the game view for the rest. The page holds the screen behind one boundary,
 * `createRunScreen`, as it holds the screen Postać: an element of its own for the page to place, a
 * first render that is synchronous, `update(state, run, events)` and the focus methods, called from
 * an event handler or the clock, never from render or an effect. The screen takes its map run as a parameter and reads
 * no map run of the game state by itself (D-281): it draws from a game state holding the map run it
 * is given, and hands the program panel that state. The program panel keeps its own root; the screen
 * puts its element into the program's area. The screen holds the keys of the hovered tile and of the
 * tapped one, which the drawing, the line under it and the table share as one marked tile, and takes
 * the tapped tile's mark off at a tap with a finger anywhere but on the drawing (D-19), and hands the events of each update to the world
 * area for its scene (D-04). A click on „Teraz” or „Potem” in the world area asks the program panel
 * to scroll to the rule the row names (D-336). Nothing runs when the module is imported.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { MapId } from "../sim/data/maps.js";
import { mapRunEnded, type GameEvent } from "../sim/game.js";
import type { GameMapRun, GameState, RuleId } from "../sim/types.js";
import type { Chronicle } from "./chronicle.js";
import { DiscoveryBand } from "./discovery-band.js";
import { EndWindow, type EndWindowControls } from "./end-window.js";
import type { ProgramPanel } from "./program-panel.js";
import { RunHeader, type RunHeaderControls } from "./run-header.js";
import type { EndQuestionControls } from "./end-question.js";
import {
  useRunScreenSnapshot,
  type RunScreenReading,
} from "./run-screen-reading.js";
import { TabsArea } from "./tabs-area.js";
import { WorldArea } from "./world-area.js";

/** The entries of „Ostatnie minuty” the screen asks its chronicle memory for (D-368). */
const LAST_MINUTES = 4;

/** The reading of a screen given no state of the screen Przejście: it holds no question and no window. */
const NO_WINDOW: RunScreenReading = {
  subscribe: () => () => undefined,
  snapshot: (() => {
    const none = { question: null, windowShown: false };
    return () => none;
  })(),
};

/**
 * What the screen asks of the game view: the header's buttons, the three answers of the question
 * „Zapisać, odrzucić, wrócić?” and the acts of the end-of-run window the screen does not carry out
 * itself. `openWindow` and `closeWindow` change the state of the screen Przejście, which the screen
 * reads to show or take away the window; `openMap` ends the map run
 * as `end` does and opens the card of the map named, asking the question where the copy holds
 * unsaved changes (D-173, D-53).
 */
export type RunScreenControls = RunHeaderControls &
  EndQuestionControls & {
    openWindow(): void;
    closeWindow(): void;
    openMap(mapId: MapId): void;
    /**
     * The scene's effect of a death or a completion has ended, or the scene was hidden while it ran:
     * the game view then opens the window that waited for it (D-322, D-311).
     */
    effectEnded(): void;
  };

export type RunScreen = {
  /** The screen, for the game view to show and hide. */
  element: HTMLElement;
  /**
   * Shows the map run `run` of the game state `state`: the screen and its program panel draw from a
   * game state holding that map run, so the one the address names is the one drawn. `events` are
   * those of the simulation call that returned `state`, which the panel and the scene read for a map
   * run started.
   */
  update(state: GameState, run: GameMapRun, events: readonly GameEvent[]): void;
  /** Moves keyboard focus to the screen, for the page to call when a send opens it. */
  focus(): void;
  /** Moves keyboard focus to the first answer of the question, where it stands. */
  focusQuestion(): void;
  /**
   * Moves keyboard focus to the header's button named `name` where it stands and is shown: after
   * „✕” or Escape to „Koniec przejścia”, after a restart to „Restart”.
   */
  focusHeaderButton(name: "Koniec przejścia" | "Restart"): void;
  /** Moves keyboard focus to the window, where it stands, and the page to its top. */
  focusWindow(): void;
};

/** What the screen needs of the program panel of the screen of a map run. */
export type RunScreenPanel = Pick<
  ProgramPanel,
  "element" | "update" | "addDiscoveredRule" | "scrollToRule"
>;

type RunScreenViewProps = {
  /** The game state with the map run the screen was given; null until the first `update`. */
  state: GameState | null;
  /** The events of the simulation call that returned `state`; none before the first `update`. */
  events: readonly GameEvent[];
  controls: RunScreenControls;
  /** The state of the screen Przejście, which says whether the window stands; it stands only over an ended map run. */
  reading: RunScreenReading;
  /** What the window's controls carry out. */
  windowControls: EndWindowControls;
  /** The program panel's element, which keeps its own root. */
  panelElement: HTMLElement;
  /** The chronicle memory of the map run, which the area under the drawing reads and tells the picks (D-346). */
  chronicle: Chronicle;
  /** „Dodaj regułę z tym” of the band. */
  onAddRule: () => void;
  /** A click on „Teraz” or „Potem”: the program panel scrolls to the rule the row names (D-336). */
  onShowRule: (ruleId: RuleId) => void;
};

/**
 * The screen: the header over the three areas. The areas stand from the first render, so the
 * program panel's element is in place before the panel first draws. The area with the tabs holds the
 * tabs and their content whenever the screen has a state, whether a rule is open in the program or not.
 * While the window stands over an ended map run the header and the three areas are `hidden`, not
 * left out, so that the program panel's element and what the areas hold stay where they are.
 */
function RunScreenView({
  state,
  events,
  controls,
  reading,
  windowControls,
  panelElement,
  chronicle,
  onAddRule,
  onShowRule,
}: RunScreenViewProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tapped, setTapped] = useState<string | null>(null);
  const marked = hovered ?? tapped;
  const panelPlace = useRef<HTMLDivElement>(null);
  const { windowShown } = useRunScreenSnapshot(reading);
  const covering =
    windowShown &&
    state !== null &&
    state.run !== null &&
    mapRunEnded(state.run);

  // The window takes the focus as it appears, which scrolls the page to its top edge, past the menu
  // bar of the page where the player had scrolled down the screen it covers now; the page goes to
  // its top, so the menu bar stands above the window in sight (D-368). The window's own effect runs
  // before this one, so the page goes to its top after the focus has moved.
  useEffect(() => {
    if (covering) document.documentElement.scrollTop = 0;
  }, [covering]);

  // A tap with a finger anywhere but on the drawing takes the tapped tile's mark off; a tap on the
  // drawing is the drawing's, which moves the mark or, beside every tile, takes it off (D-19).
  useEffect(() => {
    const takeOff = (event: PointerEvent) => {
      const onDrawing =
        event.target instanceof Element &&
        event.target.closest(".terrain-drawing") !== null;
      if (event.pointerType === "touch" && !onDrawing) setTapped(null);
    };
    document.addEventListener("pointerup", takeOff);
    return () => document.removeEventListener("pointerup", takeOff);
  }, []);

  // The program panel is an element outside this tree: the effect puts it into its area and takes it
  // out again at cleanup.
  useLayoutEffect(() => {
    panelPlace.current?.append(panelElement);
    return () => {
      panelElement.remove();
    };
  }, [panelElement]);

  return (
    <>
      {state === null ? null : (
        <RunHeader state={state} controls={controls} windowOpen={covering} />
      )}
      <div className="run-screen-areas">
        <section className="screen-area run-world" hidden={covering}>
          {state === null ? null : (
            <WorldArea
              state={state}
              events={events}
              hovered={marked}
              onHover={setHovered}
              onTap={setTapped}
              onShowRule={onShowRule}
              onEffectEnd={() => controls.effectEnded()}
            />
          )}
        </section>
        <section className="screen-area run-program" hidden={covering}>
          {state === null ? null : (
            <DiscoveryBand
              state={state}
              onAddRule={onAddRule}
              onResume={() => controls.togglePause()}
            />
          )}
          <div className="run-program-place" ref={panelPlace} />
        </section>
        <section className="screen-area run-tabs" hidden={covering}>
          {state === null ? null : (
            <TabsArea
              state={state}
              chronicle={chronicle}
              hovered={marked}
              onHover={setHovered}
            />
          )}
        </section>
      </div>
      {covering && state !== null ? (
        <EndWindow
          state={state}
          lastMinutes={chronicle.entriesToDeath(LAST_MINUTES)}
          controls={windowControls}
        />
      ) : null}
    </>
  );
}

/**
 * Builds the screen once: `panel` is the program panel of this screen, which the screen places in
 * its program's area and updates with its map run (the game view holds a second program panel, for
 * Programy); the panel draws its rule panel under the row it changes. The header's controls go to
 * the game view, which turns each into a simulation call; „Wznów” of the band is the header's
 * `togglePause`, and „Dodaj regułę z tym” the panel's `addDiscoveredRule`; the same button in the
 * window first asks the game view to close the window and then calls `addDiscoveredRule`, so the
 * panel it opens is drawn on the uncovered screen, and „✕” of the window and Escape ask for the
 * closing and move the focus to „Koniec przejścia” in the header. The chronicle memory is
 * the game view's: the area with the tabs reads it and tells it the tab and the filter picked, and
 * the game view records into it (D-339). `reading` is the state of the screen Przejście, which the
 * screen reads to show the window; given none, the screen shows none. The render is synchronous, so
 * the areas stand in the element when this returns.
 */
export function createRunScreen(
  panel: RunScreenPanel,
  controls: RunScreenControls,
  chronicle: Chronicle,
  reading: RunScreenReading = NO_WINDOW,
): RunScreen {
  const element = document.createElement("section");
  element.className = "screen run-screen";
  element.tabIndex = -1;
  const onAddRule = () => panel.addDiscoveredRule();
  const onShowRule = (ruleId: RuleId) => panel.scrollToRule(ruleId);
  const root = createRoot(element);

  function focusHeaderButton(name: string): void {
    [...element.querySelectorAll<HTMLButtonElement>(".run-header button")]
      .find((button) => button.textContent === name)
      ?.focus();
  }

  const windowControls: EndWindowControls = {
    close() {
      controls.closeWindow();
      focusHeaderButton("Koniec przejścia");
    },
    restart: () => controls.restart(),
    end: () => controls.end(),
    openMap: (mapId) => controls.openMap(mapId),
    addRule() {
      controls.closeWindow();
      panel.addDiscoveredRule();
    },
  };

  function draw(state: GameState | null, events: readonly GameEvent[]): void {
    flushSync(() => {
      root.render(
        <RunScreenView
          state={state}
          events={events}
          controls={controls}
          reading={reading}
          windowControls={windowControls}
          panelElement={panel.element}
          chronicle={chronicle}
          onAddRule={onAddRule}
          onShowRule={onShowRule}
        />,
      );
    });
  }
  draw(null, []);

  return {
    element,
    update(
      state: GameState,
      run: GameMapRun,
      events: readonly GameEvent[],
    ): void {
      const shown: GameState = state.run === run ? state : { ...state, run };
      draw(shown, events);
      panel.update(shown, events);
    },
    focus(): void {
      element.focus();
    },
    focusQuestion(): void {
      element.querySelector<HTMLElement>(".end-question button")?.focus();
    },
    focusHeaderButton,
    focusWindow(): void {
      const opened = element.querySelector<HTMLElement>(".end-window");
      if (opened === null) return;
      opened.focus();
      document.documentElement.scrollTop = 0;
    },
  };
}
