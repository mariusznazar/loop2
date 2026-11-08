/**
 * The screen of a manual map run in React, Przejście (D-311, D-280, D-281, D-282, D-19, D-122, D-313;
 * task ekran-przejscia, To do 1 to 8; D-173, task pytanie-przy-zakoncz, To do 1; task
 * proporcje-sceny-i-programu, To do 1 and 2): one header — the character's name, the map's name, the
 * clock, the bar of the solving condition and the buttons — over three areas, each a `screen-area`
 * element a narrower layout can rearrange, in this order in the document: the world, the program,
 * the band of a discovery above the program panel, and the area under the drawing, with the tabs
 * „Kronika” and „Teren” and the chronicle or the table of revealed tiles under the tab picked (D-311,
 * D-346). The stylesheet puts the world and, under it, the area with the tabs in the left column and
 * the program in the right one, and one under the other in a narrow window. A rule panel opens in the
 * program panel, under its row (D-288), and changes neither the tabs nor the tab picked. The
 * question „Zapisać, odrzucić, wrócić?” of „Zakończ” is the program panel's: it stands inside the
 * panel, just above the heading of the copy, and the screen only tells the panel when to show it
 * (`setQuestion`). The page holds the screen behind one boundary, `createRunScreen`, as it holds the
 * screen Postać: an element of its own for the page to place, a first render that is synchronous,
 * `update(state, run, events)`, `setQuestion(open)` and `focus()`, called from an event handler or
 * the clock, never from render or an effect. The screen takes its map run as a parameter and reads
 * no map run of the game state by itself (D-281): it draws from a game state holding the map run it
 * is given, and hands the program panel that state. The program panel keeps its own root; the screen
 * puts its element into the program's area. The screen holds the hovered tile's key, which the
 * drawing, the line under it and the table share, and hands the events of each update to the world
 * area for its scene (D-04). A click on „Teraz” or „Potem” in the world area asks the program panel
 * to scroll to the rule the row names (D-336). Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { GameEvent } from "../sim/game.js";
import type { GameMapRun, GameState, RuleId } from "../sim/types.js";
import type { Chronicle } from "./chronicle.js";
import { DiscoveryBand } from "./discovery-band.js";
import type { ProgramPanel } from "./program-panel.js";
import { RightArea } from "./right-area.js";
import { RunHeader } from "./run-header.js";
import type { EndQuestionControls } from "./end-question.js";
import type { StatusRowControls } from "./status-row.js";
import { WorldArea } from "./world-area.js";

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
  /**
   * Shows the question „Zapisać, odrzucić, wrócić?” in the program panel, just above the heading of
   * the copy, while `open`, and takes it away otherwise; the game view decides when it stands
   * (D-173). Showing what is shown changes nothing.
   */
  setQuestion(open: boolean): void;
  /** Moves keyboard focus to the first answer of the question, where it stands. */
  focusQuestion(): void;
};

/** What the screen needs of the program panel of the screen of a map run. */
export type RunScreenPanel = Pick<
  ProgramPanel,
  "element" | "update" | "addDiscoveredRule" | "setQuestion" | "scrollToRule"
>;

type RunScreenViewProps = {
  /** The game state with the map run the screen was given; null until the first `update`. */
  state: GameState | null;
  /** The events of the simulation call that returned `state`; none before the first `update`. */
  events: readonly GameEvent[];
  controls: StatusRowControls;
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
 */
function RunScreenView({
  state,
  events,
  controls,
  panelElement,
  chronicle,
  onAddRule,
  onShowRule,
}: RunScreenViewProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const panelPlace = useRef<HTMLDivElement>(null);

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
      {state === null ? null : <RunHeader state={state} controls={controls} />}
      <div className="run-screen-areas">
        <section className="screen-area run-world">
          {state === null ? null : (
            <WorldArea
              state={state}
              events={events}
              hovered={hovered}
              onHover={setHovered}
              onShowRule={onShowRule}
            />
          )}
        </section>
        <section className="screen-area run-program">
          {state === null ? null : (
            <DiscoveryBand
              state={state}
              onAddRule={onAddRule}
              onResume={() => controls.togglePause()}
            />
          )}
          <div className="run-program-place" ref={panelPlace} />
        </section>
        <section className="screen-area run-tabs">
          {state === null ? null : (
            <RightArea
              state={state}
              chronicle={chronicle}
              hovered={hovered}
              onHover={setHovered}
            />
          )}
        </section>
      </div>
    </>
  );
}

/**
 * Builds the screen once: `panel` is the program panel of this screen, which the screen places in
 * its program's area and updates with its map run (the game view holds a second program panel, for
 * Programy); the panel draws its rule panel under the row it changes. The header's controls go to
 * the game view, which turns each into a simulation call; „Wznów” of the band is the header's
 * `togglePause`, and „Dodaj regułę z tym” the panel's `addDiscoveredRule`. The chronicle memory is
 * the game view's: the area with the tabs reads it and tells it the tab and the filter picked, and
 * the game view records into it (D-339). The render is synchronous, so the areas stand in the
 * element when this returns.
 */
export function createRunScreen(
  panel: RunScreenPanel,
  controls: StatusRowControls & EndQuestionControls,
  chronicle: Chronicle,
): RunScreen {
  const element = document.createElement("section");
  element.className = "screen run-screen";
  element.tabIndex = -1;
  const onAddRule = () => panel.addDiscoveredRule();
  const onShowRule = (ruleId: RuleId) => panel.scrollToRule(ruleId);
  const root = createRoot(element);

  function draw(state: GameState | null, events: readonly GameEvent[]): void {
    flushSync(() => {
      root.render(
        <RunScreenView
          state={state}
          events={events}
          controls={controls}
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
    setQuestion(open: boolean): void {
      panel.setQuestion(open ? controls : null);
    },
    focusQuestion(): void {
      element.querySelector<HTMLElement>(".end-question button")?.focus();
    },
  };
}
