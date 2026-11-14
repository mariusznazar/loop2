/**
 * The acts of the two program panels, the one of Programy and the one of Przejście (D-166, D-342):
 * what each panel asks for goes to the simulation through the store, which reads the clock first, so
 * that the act runs under the program it ran under. One object is made once and given to both panels.
 * An act on the copy says what it was, for the chronicle. Nothing here runs when the module is
 * imported.
 */
import { setProgram } from "../sim/game.js";
import {
  createProgram,
  deleteProgram,
  discardCopyChanges,
  editProgram,
  renameProgram,
  saveCopyAsNewProgram,
  saveCopyIntoProgram,
  switchProgram,
} from "../sim/programs.js";
import type { ProgramPanelControls } from "./program-panel.js";
import type { StateStore } from "./state-store.js";

/** The acts of the program panels, made over the store of the game. */
export function createProgramPanelActs(
  store: Pick<StateStore, "act" | "get">,
): ProgramPanelControls {
  return {
    // `move` is the hint of the editor's move sites; it goes to the chronicle and never into the
    // simulation (D-342).
    editCopy(program, move) {
      store.act((take) => {
        const state = store.get();
        if (state.run)
          take(setProgram(state, program), {
            kind: "edit",
            move: move ?? null,
          });
      });
    },
    editProgram(programId, program) {
      store.act((take) => take(editProgram(store.get(), programId, program)));
    },
    createProgram() {
      store.act((take) => take(createProgram(store.get())));
    },
    renameProgram(programId, name) {
      store.act((take) => take(renameProgram(store.get(), programId, name)));
    },
    deleteProgram(programId) {
      store.act((take) => take(deleteProgram(store.get(), programId)));
    },
    saveCopy() {
      store.act((take) =>
        take(saveCopyIntoProgram(store.get()), { kind: "save" }),
      );
    },
    saveCopyAsNew(name) {
      store.act((take) =>
        take(saveCopyAsNewProgram(store.get(), name), { kind: "saveAsNew" }),
      );
    },
    discardCopy() {
      store.act((take) =>
        take(discardCopyChanges(store.get()), { kind: "discard" }),
      );
    },
    switchProgram(programId) {
      store.act((take) =>
        take(switchProgram(store.get(), programId), { kind: "switch" }),
      );
    },
  };
}
