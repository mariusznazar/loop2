/**
 * The name field of the program panel of a map run in React (D-169, D-170): the field „Zmień nazwę”
 * opens for a saved program and „Zapisz jako nowy program” for the copy. The program panel holds it
 * through the Hook `useNaming`, which keeps the text typed, reads the name rule and asks the panel's
 * actions for the rename or the save. Nothing runs when the module is imported.
 */
import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import {
  programById,
  programName,
  suggestedProgramName,
} from "../sim/programs.js";
import type { GameState, ProgramId, ProgramNameRefusal } from "../sim/types.js";
import type { ShownProgram } from "./program-panel.js";

/** What the name field is open for: a rename of a saved program, or the save of the copy as a new one. */
type NamePurpose =
  { kind: "rename"; programId: ProgramId } | { kind: "saveNew" };

/** The name field open: for what, the text in it, and the program shown it was opened under. */
export type Naming = { key: string; purpose: NamePurpose; value: string };

/** What the name field of the panel of a map run needs of the panel that holds it. */
type NamingSource = {
  state: GameState;
  shown: ShownProgram;
  /** The list's position of what the panel shows. */
  key: string;
  copyShown: boolean;
  unsaved: boolean;
  /** The acts the field's „Zapisz” asks for, the panel's own. */
  actions: {
    renameProgram: (programId: ProgramId, name: string) => void;
    saveCopyAsNew: (name: string) => void;
  };
  list: RefObject<HTMLSelectElement | null>;
  renameButton: RefObject<HTMLButtonElement | null>;
};

/** What the Hook gives the panel: the field, its refusal, its input and what opens, changes, saves it. */
export type NamingField = {
  naming: Naming | null;
  refusal: ProgramNameRefusal | null;
  nameInput: RefObject<HTMLInputElement | null>;
  toggleRename: () => void;
  toggleSaveNew: () => void;
  saveName: () => void;
  changeName: (value: string) => void;
};

/**
 * The name field of „Zmień nazwę” and „Zapisz jako nowy program”: the text in it, the refusal of
 * the name rule, and what opens, changes, saves and leaves it. The field belongs to the program shown:
 * another shown leaves it, and a field for the save of the copy leaves with the copy's changes. What
 * opens the field moves the focus to it at the commit that follows. A Hook of its own, so that
 * the panel's component stays under the threshold of a function.
 */
export function useNaming({
  state,
  shown,
  key,
  copyShown,
  unsaved,
  actions,
  list,
  renameButton,
}: NamingSource): NamingField {
  const [namingState, setNaming] = useState<Naming | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  // Set by what opens the name field, so the commit that follows moves the focus to it.
  const focusName = useRef(false);

  useLayoutEffect(() => {
    if (focusName.current) {
      focusName.current = false;
      nameInput.current?.focus();
    }
  });

  let naming = namingState;
  if (
    naming !== null &&
    (naming.key !== key || (naming.purpose.kind === "saveNew" && !unsaved))
  ) {
    naming = null;
    setNaming(null);
  }

  const checked =
    naming === null
      ? null
      : programName(
          state.programs,
          naming.value,
          naming.purpose.kind === "rename"
            ? naming.purpose.programId
            : undefined,
        );
  const refusal = checked !== null && !checked.ok ? checked.reason : null;

  function openName(purpose: NamePurpose, value: string): void {
    focusName.current = true;
    setNaming({ key, purpose, value });
  }

  function toggleRename(): void {
    // The same action again leaves the field without saving.
    if (naming?.purpose.kind === "rename") {
      setNaming(null);
      return;
    }
    if (shown.kind !== "saved") return;
    const saved = programById(state.programs, shown.programId);
    if (saved) openName({ kind: "rename", programId: saved.id }, saved.name);
  }

  function toggleSaveNew(): void {
    if (!copyShown || !unsaved) return;
    if (naming?.purpose.kind === "saveNew") {
      setNaming(null);
      return;
    }
    openName({ kind: "saveNew" }, suggestedProgramName(state.programs));
  }

  function saveName(): void {
    if (naming === null || refusal !== null) return;
    const { purpose, value } = naming;
    setNaming(null);
    if (purpose.kind === "rename") {
      actions.renameProgram(purpose.programId, value);
      renameButton.current?.focus();
    } else {
      actions.saveCopyAsNew(value);
      // „Zapisz jako nowy program” is inactive now; focus goes to the list.
      list.current?.focus();
    }
  }

  function changeName(value: string): void {
    if (naming !== null) setNaming({ ...naming, value });
  }

  return {
    naming,
    refusal,
    nameInput,
    toggleRename,
    toggleSaveNew,
    saveName,
    changeName,
  };
}
