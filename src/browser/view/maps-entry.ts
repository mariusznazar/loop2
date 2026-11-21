/**
 * The entry of the screen Mapy in the registry of screens (D-325, D-329): built on entering `#/mapy`
 * or `#/mapy/{map}` and taken down on leaving; both addresses are one screen, so a pick of a map on
 * its list changes the map and builds nothing again. A new screen copies this entry. Nothing here
 * runs when the module is imported.
 */
import { judgeAndRecord } from "../sim/judging.js";
import type { JudgingIds } from "../sim/judging-record.js";
import { pickProgram } from "../sim/programs.js";
import { stopLoop } from "../sim/loop.js";
import type { Judging, MapId } from "../sim/types.js";
import { createMapsScreen } from "./maps-screen.js";
import type { JudgingCache } from "./judging-cache.js";
import type { Screen, ScreenEntry } from "./screen-registry.js";
import type { StateStore } from "./state-store.js";

export type MapsEntryOptions = {
  readonly store: Pick<
    StateStore,
    "get" | "moment" | "halted" | "act" | "send" | "startLoop"
  >;
  /**
   * The cache of the judgings the browser remembers (D-441): the entry reads the mark beside the list
   * „Program:” from it and gives it each judging. A page whose storage is refused gives it a cache that
   * keeps the judgings for the open page alone.
   */
  readonly judgingCache: JudgingCache;
};

/** The map the address names, or null under `#/mapy`. */
function mapOf(screen: Screen): MapId | null {
  return screen.kind === "map" ? screen.mapId : null;
}

/** Makes the entry of Mapy. */
export function createMapsEntry(options: MapsEntryOptions): ScreenEntry {
  const { store, judgingCache } = options;
  return {
    kinds: ["maps", "map"],
    lives: "while-shown",
    key: () => "maps",
    build(port, screen) {
      let mapId = mapOf(screen);
      let acting = false;
      let disposed = false;
      const props = () => ({
        state: store.get(),
        nowMs: store.moment(),
        mapId,
        readRecord: (ids: JudgingIds) => judgingCache.read(ids),
      });

      /**
       * Draws the screen from the state and the clock's latest moment, unless one of its acts is
       * running. The screen moves the keyboard's focus to the control its click is owed on the first
       * draw after the click, and the reading of the clock the act makes first would otherwise be
       * that draw, before the state holds the change the control stands for (D-329).
       */
      function draw(): void {
        if (acting || disposed) return;
        maps.update(props());
      }

      /** Runs an act of the screen and then draws the screen once, synchronously from the click. */
      function mapsAct(body: () => void): void {
        acting = true;
        try {
          body();
        } finally {
          acting = false;
        }
        draw();
      }

      // What the screen asks for, the sending of a character (D-329). Each act goes to the
      // simulation, which checks it; the reading of the clock is made first, so the act runs at the
      // moment of the click.
      const maps = createMapsScreen({
        controls: {
          pick(characterId, programId) {
            mapsAct(() =>
              store.act((take) =>
                take(pickProgram(store.get(), characterId, programId)),
              ),
            );
          },
          // „Wejdź” leads to the screen of the map run, with a new entry of the history (D-53,
          // D-281).
          enter(characterId, entered, programId) {
            mapsAct(() => {
              if (store.get().run) return;
              store.send({ mapId: entered, characterId, programId });
              const started = store.get().run;
              if (started !== null) {
                port.show(
                  { kind: "run", characterId: started.character.id },
                  "go",
                );
                port.focusShown();
              }
            });
          },
          // An act of the player like a send: the reading is made first, and a changed state is
          // saved (D-207). The player stays on the screen Mapy (D-329). The screen asks for it after
          // the judging of „Puść w pętlę”, which is the `judge` below, or at its second click; it
          // judges nothing itself, and takes what the chest holds at that moment (D-243).
          startLoop(characterId, looped, programId) {
            mapsAct(() =>
              store.startLoop({ mapId: looped, characterId, programId }),
            );
          },
          stop(characterId) {
            mapsAct(() =>
              store.act((take) => take(stopLoop(store.get(), characterId))),
            );
          },
          // The judging is an act of the store, so the time is counted first and the state the
          // judging reads is the one the click met (D-409). Inside the act, before the screen's one
          // draw, its record replaces the judging the cache holds for its character, program and
          // map (D-440, D-441), unless the store has halted (D-323). The act takes no result into the
          // store, which saves nothing for it (D-170); the judging is given back for the screen to
          // show, with the cause and the minute of each death the cache does not keep.
          judge(characterId, judged, programId) {
            const made: Judging[] = [];
            mapsAct(() =>
              store.act(() => {
                const ids = { mapId: judged, characterId, programId };
                const done = judgeAndRecord(store.get(), ids);
                if (!store.halted()) judgingCache.remember(ids, done.record);
                made.push(done.judging);
              }),
            );
            const [judging] = made;
            if (judging === undefined)
              throw new Error("the act of a judging ran no judging");
            return judging;
          },
        },
        props: props(),
      });
      return {
        element: maps.element,
        // A pick of another map on the list changes the map and builds nothing again.
        placed(next) {
          if (next.kind !== "maps" && next.kind !== "map") return;
          if (mapOf(next) === mapId) return;
          mapId = mapOf(next);
          maps.update(props());
        },
        drawResult: draw,
        drawReading: draw,
        dispose() {
          disposed = true;
          maps.dispose();
        },
      };
    },
  };
}
