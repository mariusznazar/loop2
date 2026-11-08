# Report — slice 4: the game view records every result into the chronicle; moves carry their hint

**Status:** done

**Commits:** `5ed6c6b` (one commit). Range: `416c10d..5ed6c6b`.

## Files changed (added / removed lines, before the Prettier pass of the test file)

- `src/browser/view/game-view.ts` — creates the chronicle (`createChronicle(state)`) beside `createFolding`; the body of `store.apply` moved into `take(result, copyAct?)`, which records into the chronicle right after `state = result.state` and before `programsPanel.update` / `renderScreens`, with the state before it; `store.apply` is `(result) => take(result)`; `act(result, copyAct?)` calls `take` directly, so the act's description reaches the recording without a change of `clock.ts`. The five acts on the copy pass their description: `editCopy` → `{kind:"edit", move: move ?? null}`, `saveCopy` → `save`, `saveCopyAsNew` → `saveAsNew`, `discardCopy` → `discard`, `switchProgram` → `switch`.
- `src/browser/view/program-panel.tsx` — `ProgramPanelControls.editCopy(program, move?)`; `PanelActions.edit(program, move?)`; `edit` passes `move` to `editCopy` and never to `editProgram`.
- `src/browser/view/rule-list.tsx` — `onCommit(program, move?)`; `commit(next, focus, move?)`; the „↑”/„↓” site hands `{kind:"rule", ruleId}`, the drop site hands `{kind:"rule", ruleId}` for a rule and `{kind:"group", groupId}` for a group; every other edit (Usuń, ✕, + reguła, + dodaj grupę) hands none.
- `tests/view/rule-editor.test.mjs` — `mount` records the second argument of `onCommit`; three new cases (hint from „↑”/„↓” across a group border; hint from the drop of a rule and of a group; no hint from Usuń, ✕, + reguła, + dodaj grupę).
- `tests/view/program-panel.test.mjs` — `controlsOver` records the argument after the program for `editCopy` and `editProgram` (`game.hints`); a helper `gameWithTwoRules`, a `drag` helper; two new cases (hint reaches `editCopy` from „↓”, from the rule drop and from the group drop, and a button-added group gives none; an edit of a saved program, a move included, carries none).

`git diff --stat`: 5 files, +213 / −47.

The memory is not handed to the screen of a map run (Slice 5): `chronicle` has no reader yet in `game-view.ts` other than the recording.

## Checks (command, exit code)

Hint cases written first and seen failing:
- `npm test -- tests/view/rule-editor.test.mjs` — exit 1 before the code (2 new tests failed on `expected {"kind":"rule",...}, got undefined`; the "no hint" test passed, as it should), exit 0 after (64/64).
- `npm test -- tests/view/program-panel.test.mjs` — exit 1 before the code (the copy case failed on `expected [{"kind":"rule","ruleId":1}], got []`), exit 0 after (51/51).
- The "saved program carries no hint" case passes by construction, so I saw it fail by a mutation: in `dist/browser/view/program-panel.js` (ignored by git) `controls.editProgram(shown.programId, program)` changed to pass `move`; `node --test tests/view/program-panel.test.mjs` — exit 1, 50 pass / 1 fail, the failing case being exactly that one; dist restored (the next `npm test` rebuilt it).

After the code:
- `npm test -- tests/view/rule-editor.test.mjs` — exit 0 (64 pass)
- `npm test -- tests/view/program-panel.test.mjs` — exit 0 (51 pass; run again after the Prettier pass)
- `npm test -- tests/view/end-question.test.mjs` — exit 0 (17 pass)
- `npm test -- tests/view/account-screen.test.mjs` — exit 0 (128 pass)
- `npm test -- tests/view/uncaught-failure.test.mjs` — exit 0 (14 pass)
- `npm test -- tests/view/chronicle.test.mjs` — exit 0 (23 pass)
- `npm run typecheck` — exit 0
- `npm test -- tests/quality/test_quality_invariants.py` — first run exit 1 (Prettier: `tests/view/program-panel.test.mjs` layout); I ran Prettier (`--no-config --no-editorconfig --ignore-path .gitignore --write`) on the five files, then exit 0 (5 tests OK).

Not run: the full gate (`npm test` with no file) and `foundation_check.py` — the orchestrator's.

## Own-work check

- **Requirement most likely missed:** that every result passes the recording *in `store.apply`*, with the state before it and the act's description, and that a move hint really decides which rule the entry names — the spec's central claim for this slice, which no test in the slice's *Change* files shows, since the memory is not yet handed to any screen.
- **Check:** an exploratory run, nothing committed. In the ignored `dist/browser/view/game-view.js` I made the chronicle reachable (`globalThis.__chronicle = createChronicle(state)`), and a scratch test file `tests/view/zz-scratch.test.mjs` (deleted before the commit) built the real game view on a map run whose program holds two different rules (`Zawsze → Eksploruj`, `Zawsze → Wędruj`), pressed „↓” on rule 1 in the panel of the map run and then „Porzuć zmiany”, and read `window("all", 50)`.
- **What it showed:** the chronicle started with no entry; after „↓” it held `0 change player-change: Przesunięto regułę 1.1 na 1.2: Zawsze → Eksploruj` (the rule the player moved, with the numbers before and after); after „Porzuć zmiany” it held `Porzucono zmiany kopii` newer than that entry. The scratch run reported a failure of React's `act(...)` warning at the end (my scratch's dispose outside `act`), unrelated to the result. The hook and the scratch file are gone; `grep -c __chronicle dist/browser/view/game-view.js` after the later `npm test` builds gave 0.

I did not add a permanent test of the recording through the game view: the files the slice lists for tests are the two hint files, the spec puts the game-view tests (the chronicle and the tab surviving Siedziba and „Restart”) with the screen's slice, and the memory has no reader until Slice 5. The chronicle memory itself is covered by Slice 3's `tests/view/chronicle.test.mjs`.

## Reaches beyond the handoff

- Read `src/browser/view/chronicle.ts` and `src/browser/view/chronicle-entries.ts` whole (named in the handoff) and the existing test setups of `tests/view/end-question.test.mjs` (lines 80–200) and `tests/sim/program-fixture.mjs`, for the scratch check and the new test fixtures.
- Read `guidelines/coding.md`, `coding-browser-module.md`, `testing.md` whole. I did not read `guidelines/styleguide-browser-view.md` whole: the slice changes no look, class, role or token (no screen output changes), so I took it as not bearing on this change.
- Did not open the foundation entries D-04 … D-346 ranges one by one; the spec passages the slice named carry their content (D2, D4, D10), and the code needs nothing from the entries beyond that. No reach to anything the handoff did not name for decisions.

## Choices

- **How the act reaches `store.apply`:** `take(result, copyAct?)` as the single recording place, called by `store.apply` (no act) and by `act` (with the act). Rejected: a second argument of `GameStore.apply` (would change `clock.ts`, outside the slice's *Change* list) and a call of the memory beside `store.apply` (two places that must agree on the state before). Cost if wrong: none found; `act` bypasses `store.apply`, but `store.apply` is a thin wrapper of the same function.
- **The hint type is `MoveHint | undefined`** on the list and the panel (`move?: MoveHint`) and `null` only in `CopyAct` (`move ?? null`), as Slice 3's type has it.
- **`saveAndEnd` („Zapisz” of the question of „Zakończ”) passes no act description:** its result is a save followed by `end`, whose `mapRunEnded` clears the chronicle at once and leaves no map run for the act's entry, so the description would give nothing. The five acts of the spec are the panel's controls, which carry theirs.
- **Hint on the drop of a rule:** the hint is given for any drop that commits, even one inside a group that reorders; `copyChangeTexts` ignores a hint whose rule's group and number did not change.

## Searches not found or unclear

none (one note: the handoff says D-04's text is as "F12 leaves it" and gives ranges that I did not need to open for this code).
