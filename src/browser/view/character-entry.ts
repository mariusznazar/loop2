/**
 * The entry of the screen Postać in the registry of screens (D-56, D-280): built on entering it and
 * taken down on leaving, built anew where the address names another character. A new screen copies
 * this entry. Nothing here runs when the module is imported.
 */
import { putOnPiece, takeOffPiece } from "../sim/gear.js";
import { stopLoop } from "../sim/loop.js";
import { buyBranch } from "../sim/skills.js";
import { createCharacterScreen } from "./character-screen.js";
import type { ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type CharacterEntryOptions = {
  readonly store: Pick<
    StateStore,
    "get" | "moment" | "act" | "actWithoutCatchUp"
  >;
};

/** Makes the entry of Postać. */
export function createCharacterEntry(
  options: CharacterEntryOptions,
): ScreenEntry {
  const { store } = options;
  return {
    kinds: ["character"],
    lives: "while-shown",
    key: (screen) =>
      screen.kind === "character" ? `${screen.characterId}` : "",
    build(_port, screen) {
      if (screen.kind !== "character")
        throw new Error("the entry of Postać is built for its own screen only");
      const { characterId } = screen;
      const props = () => ({
        state: store.get(),
        nowMs: store.moment(),
        characterId,
      });
      const character = createCharacterScreen({
        // A bought rank does not catch up time: the screen draws what the state holds (D-04).
        onBuy(branch) {
          store.actWithoutCatchUp((take) =>
            take(buyBranch(store.get(), characterId, branch)),
          );
        },
        onStop() {
          store.act((take) => take(stopLoop(store.get(), characterId)));
        },
        // A change of the gear depends on the time passed, since a death in it may settle the gear, so the
        // store counts the time first and the body reads the state after that (D-409).
        onPutOn(slot, item) {
          store.act((take) =>
            take(putOnPiece(store.get(), characterId, slot, item)),
          );
        },
        onTakeOff(slot) {
          store.act((take) =>
            take(takeOffPiece(store.get(), characterId, slot)),
          );
        },
        props: props(),
      });
      return {
        element: character.element,
        drawResult: () => character.update(props()),
        drawReading: () => character.update(props()),
        dispose: () => character.dispose(),
      };
    },
  };
}
