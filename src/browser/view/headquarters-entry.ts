/**
 * The entry of the screen Siedziba in the registry of screens (D-280): the headquarters alone, built
 * once and hidden while another screen shows. Its acts go to the store, the reading of the clock
 * made first where the act depends on real time. Nothing here runs when the module is imported.
 */
import { createCharacter } from "../sim/game.js";
import { closeAwayReport, stopLoop, takeLoopPractice } from "../sim/loop.js";
import { createHeadquarters } from "./headquarters.js";
import type { ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type HeadquartersEntryOptions = {
  readonly store: Pick<
    StateStore,
    "get" | "moment" | "act" | "actWithoutCatchUp"
  >;
};

/** Makes the entry of Siedziba. */
export function createHeadquartersEntry(
  options: HeadquartersEntryOptions,
): ScreenEntry {
  const { store } = options;
  const props = () => ({ state: store.get(), nowMs: store.moment() });
  return {
    kinds: ["headquarters"],
    lives: "always",
    build() {
      const headquarters = createHeadquarters({
        controls: {
          create(name) {
            store.actWithoutCatchUp((take) =>
              take(createCharacter(store.get(), name)),
            );
          },
          stop(characterId) {
            store.act((take) => take(stopLoop(store.get(), characterId)));
          },
          closeReport() {
            store.act((take) => take(closeAwayReport(store.get())));
          },
          takePractice(characterId) {
            store.act((take) =>
              take(takeLoopPractice(store.get(), characterId)),
            );
          },
        },
        props: props(),
      });
      const section = document.createElement("section");
      section.className = "screen headquarters-screen";
      section.tabIndex = -1;
      section.append(headquarters.element);
      return {
        element: section,
        drawResult: () => headquarters.update(props()),
        // Real time passes with no change of the game state: the resurrection lines of the screen
        // that shows are rewritten at the moment read (D-217).
        drawReading(shown) {
          if (shown) headquarters.update(props());
        },
        dispose: () => headquarters.dispose(),
      };
    },
  };
}
