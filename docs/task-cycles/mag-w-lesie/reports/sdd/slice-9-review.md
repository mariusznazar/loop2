### Spec Compliance

- ✅ Spec compliant. Each item below was checked against the diff:
  - Spec § 5 program panel. Heading „Program” (`src/browser/view/program-editor.ts:194`). Each row has a condition select labelled from `CONDITIONS` (`:200`, `:226`). The number input takes min/max/step from data (`:236-239`). The condition resource select (`:228`), „→” (`:242`), the action select labelled from `ACTIONS` (`:201`, `:229`), the action resource select (`:230`) and „↑”, „↓”, „Usuń” (`:231-233`) are all present. „Dodaj regułę” is at `:197` and `:219-221`. Resource names come from `RESOURCES` (`:173`). The resource list is the run's map, or else the send panel's map, in the map's order (`:25-29`).
  - Commit on `change`, never `input`. Every field listener is `change` (`:246-264`) and the buttons use `click` (`:219`, `:265-267`). The diff has no `input` listener.
  - The number rule matches § 5 / C12. Text with no finite number keeps the previous value and is written back (`:36-42`, `:249-255`). Otherwise the value is rounded and clamped to `CONDITIONS.hereBelow`, and committed only when it differs.
  - Switching to a kind that names a resource takes the first offered resource and the data's default N (`:72-96`). „Dodaj regułę” appends „Zawsze → Eksploruj” (`:50-52`).
  - Every commit builds a whole new `Program`. `app.ts:38-41` passes it to `setProgram` (`clock.flush(); store.apply(setProgram(state, program))`), which is the D-04/3 "complies" example. The editor never writes the game state.
  - Focus (§ 5):
    - Rows are rebuilt only after a structural edit, or when the rule count or the offered list changes (`:303-310`).
    - Value edits update controls in place, setting a value only where it differs (`:272-287`).
    - `focusAfter` (`:124-135`) puts focus where § 5 says after „↑”/„↓”, after „Usuń” (that row's „Usuń” or „Dodaj regułę”) and after „Dodaj regułę”. `update` applies it after the rebuild (`:312-316`).
  - Rebuild triggers / ticks (Slice 8 ledger). The editor's `update` runs from `store.apply` only when `state.program` or `state.run?.mapId` changes (`app.ts:53-55`).
    - Named risk: a tick re-renders the editor. I checked `sim/game.ts`. `passRealTime`/`advanceMinutes` spread the state and keep the `program` reference (`game.ts:149`, `game.ts:167`), so a 200 ms tick never reaches the editor. Typing „12” keeps focus, and the `change` on blur or Enter commits 12.
    - Named risk: an edit fails to trigger an update. `setProgram` always returns a new program object via `checkProgram` (`game.ts:104`, `game.ts:71-77`), so every commit updates the editor.
  - Listener duplication. Each row's listeners are attached once in `createRow` (`:246-267`). A rebuild throws the old row elements away with `list.replaceChildren` (`:308`), and `addButton`'s listener is attached once (`:219`). No duplication.
  - Show/hide. Named risk: CSS overrides `hidden`. `index.html:8` has `[hidden] { display: none !important; }`, and the new styles (`index.html:38-46`) set no `display`, so `hidden` on the number field and the resource selects takes effect.
  - Task item 4. One program in a panel beside the terrain panel, changeable before sending and during a run. The program survives „Restart”/„Zakończ” because `restart` and `end` spread the state (`game.ts:120-130`).
  - D-10/1. The edit goes through `setProgram`, which leaves `run.current` alone (`game.ts:104`). The flush before it (`app.ts:39`) steps the real time already elapsed under the program in force then.
  - Task item 5 / D-13/1. The only buttons are „↑”, „↓”, „Usuń” and „Dodaj regułę”. Nothing carries out an action by hand. Conditions come from a select over the closed list.
  - § 4.5 / C3. Every program the editor's functions build passes the real `setProgram`, with and without a run, and is stored unchanged (`tests/view/program-editor.test.mjs:142-190`).
  - D-08/1 / S2. Labels, range, default and resource names come from data. The code holds only kind literals (`'always'`, `'hereBelow'`, `'explore'`, `'walkTo'`), which § 4.2 keeps in code. It holds no map, resource or archetype id.
- ⚠️ Cannot verify from the diff (no browser in this cycle), for the controller:
  - These behaviours are argued from the code only, and the report lists them as unchecked: a program written before „Wyślij” drives the run; an edit during a 20-minute exploration changes the status only after it ends; real focus placement after structural edits.
  - The S2 scan and the invariant gate passing are the implementer's claim. I did not re-run them.

### Strengths

- The commit rules are cleanly separated into pure, exported functions (`program-editor.ts:25-135`). The module touches no DOM at import, and the test proves it by importing it in Node (`tests/view/program-editor.test.mjs:34-37`).
- The editor is guarded against ticks precisely. It relies on reference equality of `state.program`, which the simulation preserves on time steps. That is cheap and correct (`app.ts:53`).
- Flushing the clock before `setProgram` (`app.ts:39`) is the right ordering for "takes effect from the next free game minute". It matches the status-row controls.
- The test at `tests/view/program-editor.test.mjs:142-190` exercises the real `setProgram` with every kind pair, every resource and out-of-range numbers, both before sending and during a run. It is a real C3 contract check, not a mock. Mutation checks are reported, and the reported mutations would be caught by the visible tests.
- Inputs are never mutated, and the tests check this with deep copies (`:73-75`, `:84-89`, `:115-124`).

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. `src/browser/view/program-editor.ts:78-79` and `:93-94`, with the listeners at `:246-248` and `:260-262`.
   - **What is wrong:** `withConditionKind`/`withActionKind` return `null` when no resource is offered. The listener then commits nothing, but it never resets the select either. The select would show „Tu leży mniej niż” or „Idź” while the program still holds the old kind.
   - **Why it matters:** this cannot happen with today's data (Las has four resources). It would happen with a map that has no resources.
   - **How to fix:** when the result is `null` and the select's value differs from the rule, write the rule's kind back into the select, as the number field already does.
2. `src/browser/view/app.ts:38-41`.
   - **What is wrong:** the editor's `commit` closure refers to `clock` and `store`, which are declared below it (`app.ts:44`, `app.ts:58`). This is safe only because the closure runs on user events, after `startApp` has finished.
   - **How to fix:** move the editor's creation below `startClock`, or add a one-line comment, so a later reorder cannot produce a TDZ `ReferenceError`.
3. `tests/view/program-editor.test.mjs`.
   - **What is wrong:** no test covers `createProgramEditor`'s wiring: the `change`-only listeners, in-place updates, rebuild only on structural edits, and applying the focus target. No test covers the `app.ts:53` guard either. A regression that rebuilt rows on every update, or listened on `input`, would pass the suite.
   - **Why it is only Minor:** the brief scopes the test to the pure commit rules, and no browser automation is allowed. A later cycle with a DOM shim (e.g. a tiny fake `document`) could cover it.
4. Judgment of the six choices beyond the brief:
   1. Enabled no-op „↑”/„↓” at the ends: sound. § 5 sends focus to the moved rule's same button, which can land on the first or last row, and a disabled button could not take focus. `moveRule` returns `null`, so nothing is committed (`:60-66`, `:211`).
   2. Polish `aria-label`s: acceptable. They are not visible text, and without them the selects and arrow buttons would have no accessible name.
   3. Flushing before `setProgram`: correct (see Strengths).
   4. Offered map = first send target's map without a run: acceptable today. `setProgram` accepts a resource of any map without a run, so this restricts nothing it validates. With several maps in the send panel, "the map shown in the send panel" becomes ambiguous. That is a later task's choice, but worth a note in the ledger.
   5. An extra option for a resource that is not offered (`:171-180`): harmless and defensive. It keeps a select from showing blank. Cost: two small helpers.
   6. Unit „szt.” not shown: consistent with § 5, which lists no unit in the row, and with task item 4's wording.

### Assessment

**Task quality:** Approved

**Reasoning:**
- The editor meets every point of spec § 5, C3 and C12. Commits go through `setProgram` (D-04/3 complies). The tick path provably never touches the editor, because `passRealTime` keeps the program reference, so focus while typing is safe.
- The remaining items are a latent select/program mismatch that today's data cannot trigger, a declaration-order fragility, and DOM wiring left untested by design. All three are Minor.
