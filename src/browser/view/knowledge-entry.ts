/**
 * The entry of the screen Wiedza in the registry of screens (D-416, D-408): built on entering
 * `#/wiedza` and taken down on leaving, so each entering builds the screen anew and starts it with
 * its skill trees folded. The screen only reads the game state, so the entry holds no act and no
 * memory. Nothing here runs when the module is imported.
 */
import { createKnowledgeScreen } from "./knowledge-screen.js";
import type { ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type KnowledgeEntryOptions = {
  readonly store: Pick<StateStore, "get">;
};

/** Makes the entry of Wiedza. */
export function createKnowledgeEntry(
  options: KnowledgeEntryOptions,
): ScreenEntry {
  const { store } = options;
  return {
    kinds: ["knowledge"],
    lives: "while-shown",
    key: () => "knowledge",
    build() {
      const props = () => ({ state: store.get() });
      const knowledge = createKnowledgeScreen({ props: props() });
      return {
        element: knowledge.element,
        drawResult: () => knowledge.update(props()),
        // The Understanding changes with no reading of the clock, so a reading draws nothing.
        drawReading() {},
        dispose: () => knowledge.dispose(),
      };
    },
  };
}
