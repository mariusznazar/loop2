/**
 * The screen of a manual map run in React, Przejście (D-311, D-280, D-281, D-282, D-19, D-122, D-313;
 * task ekran-przejscia, To do 1 to 8): one header — the character's name, the map's name and the
 * status row — over three areas side by side, each a `screen-area` element a narrower layout can
 * rearrange: the world on the left, the program in the middle, the band of a discovery above the
 * program panel, and on the right one content at a time, the table of revealed tiles or, while a
 * rule or a group is open, the rule panel. The page holds the screen behind one boundary,
 * `createRunScreen`, as it holds the screen Postać: an element of its own for the page to place, a
 * first render that is synchronous, `update(state, run, events)` and `focus()`, called from an event
 * handler or the clock, never from render or an effect. The screen takes its map run as a
 * parameter and reads no map run of the game state by itself (D-281): it draws from a game state
 * holding the map run it is given, and hands the program panel that state. The program panel keeps
 * its own root; the screen puts its element into the program's area and the host of its rule panel
 * into the right area. The screen holds the hovered tile's key, which the drawing, the line under it
 * and the table share. Nothing runs when the module is imported.
 */
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { GameEvent } from "../sim/game.js";
import type { GameMapRun, GameState } from "../sim/types.js";
import { DiscoveryBand } from "./discovery-band.js";
import type { ProgramPanel } from "./program-panel.js";
import { RunHeader } from "./run-header.js";
import type { StatusRowControls } from "./status-row.js";
import { TileTable } from "./tile-table.js";
import { SCENE_SCALE, WorldArea } from "./world-area.js";

export type RunScreen = {
  /** The screen, for the game view to show and hide. */
  element: HTMLElement;
  /**
   * Shows the map run `run` of the game state `state`: the screen and its program panel draw from a
   * game state holding that map run, so the one the address names is the one drawn. `events` are
   * those of the simulation call that returned `state`, which the panel reads for a map run started.
   */
  update(state: GameState, run: GameMapRun, events: readonly GameEvent[]): void;
  /** Moves keyboard focus to the screen, for the page to call when a send opens it. */
  focus(): void;
};

/** What the screen needs of the program panel of the screen of a map run. */
export type RunScreenPanel = Pick<
  ProgramPanel,
  "element" | "update" | "placeRulePanel" | "addDiscoveredRule"
>;

/**
 * Whether the rule panel stands open in the right area, as the program panel tells it through
 * `onOpen`: a value outside the screen's tree, which the screen reads with `useSyncExternalStore`.
 */
type RuleOpen = {
  get: () => boolean;
  subscribe: (listener: () => void) => () => void;
  set: (open: boolean) => void;
};

function createRuleOpen(): RuleOpen {
  let open = false;
  const listeners = new Set<() => void>();
  return {
    get: () => open,
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    set(next) {
      if (next === open) return;
      open = next;
      for (const listener of [...listeners]) listener();
    },
  };
}

type RunScreenViewProps = {
  /** The game state with the map run the screen was given; null until the first `update`. */
  state: GameState | null;
  controls: StatusRowControls;
  /** The program panel's element, which keeps its own root. */
  panelElement: HTMLElement;
  /** The host of the rule panel, which the program panel draws into through its portal. */
  ruleHost: HTMLElement;
  ruleOpen: RuleOpen;
  /** „Dodaj regułę z tym” of the band. */
  onAddRule: () => void;
};

/**
 * The screen: the header over the three areas. The areas stand from the first render, so the
 * program panel's element and the rule panel's host are in place before the panel first draws.
 * The right area holds the table while no rule is open and the host always, empty while none is,
 * so the focus the rule panel takes when it opens lands in an element that is shown.
 */
function RunScreenView({
  state,
  controls,
  panelElement,
  ruleHost,
  ruleOpen,
  onAddRule,
}: RunScreenViewProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const open = useSyncExternalStore(ruleOpen.subscribe, ruleOpen.get);
  const panelPlace = useRef<HTMLDivElement>(null);
  const rulePlace = useRef<HTMLDivElement>(null);

  // The program panel and the host of its rule panel are elements outside this tree: the effect
  // puts them into their areas and takes them out again at cleanup.
  useLayoutEffect(() => {
    panelPlace.current?.append(panelElement);
    rulePlace.current?.append(ruleHost);
    return () => {
      panelElement.remove();
      ruleHost.remove();
    };
  }, [panelElement, ruleHost]);

  return (
    <>
      {state === null ? null : <RunHeader state={state} controls={controls} />}
      <div className="run-screen-areas" data-scene-scale={SCENE_SCALE}>
        <section className="screen-area run-world">
          {state === null ? null : (
            <WorldArea state={state} hovered={hovered} onHover={setHovered} />
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
        <section className="screen-area run-right">
          {state === null || open ? null : (
            <TileTable state={state} hovered={hovered} onHover={setHovered} />
          )}
          <div className="run-rule-place" ref={rulePlace} />
        </section>
      </div>
    </>
  );
}

/**
 * Builds the screen once: `panel` is the program panel of this screen, which the screen places in
 * its program's area, gives the host of the right area for its rule panel and updates with its map
 * run (the game view holds a second program panel, for Programy). The header's controls go to the
 * game view, which turns each into a simulation call; „Wznów” of the band is the header's
 * `togglePause`, and „Dodaj regułę z tym” the panel's `addDiscoveredRule`. The render is
 * synchronous, so the areas stand in the element when this returns.
 */
export function createRunScreen(
  panel: RunScreenPanel,
  controls: StatusRowControls,
): RunScreen {
  const element = document.createElement("section");
  element.className = "screen run-screen";
  element.tabIndex = -1;
  const ruleHost = document.createElement("div");
  ruleHost.className = "run-rule-host";
  const ruleOpen = createRuleOpen();
  panel.placeRulePanel(ruleHost, (open) => ruleOpen.set(open));
  const onAddRule = () => panel.addDiscoveredRule();
  const root = createRoot(element);

  function draw(state: GameState | null): void {
    flushSync(() => {
      root.render(
        <RunScreenView
          state={state}
          controls={controls}
          panelElement={panel.element}
          ruleHost={ruleHost}
          ruleOpen={ruleOpen}
          onAddRule={onAddRule}
        />,
      );
    });
  }
  draw(null);

  return {
    element,
    update(
      state: GameState,
      run: GameMapRun,
      events: readonly GameEvent[],
    ): void {
      const shown: GameState = state.run === run ? state : { ...state, run };
      draw(shown);
      panel.update(shown, events);
    },
    focus(): void {
      element.focus();
    },
  };
}
