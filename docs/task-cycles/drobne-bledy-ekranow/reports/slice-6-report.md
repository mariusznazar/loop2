# Slice 6 report — no target of focus in the module of the program editor

**Status:** done with concerns (one choice of shape, named below; no question blocks the slice)

## Commits

- `23aa5440` refactor: :recycle: move the focus after an edit of the rule list from the program editor to the rule list, its one user, and the focus cases of the program editor's tests with it

Range: base `61002f91` to head `23aa5440` (one commit).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/program-editor.ts` | 0 | 42 |
| `src/browser/view/rule-list.tsx` | 43 | 2 |
| `tests/view/program-editor.test.mjs` | 0 | 32 |

What changed:

- `program-editor.ts`: the types `FocusTarget` and `StructuralEdit` and the function `focusAfter` are gone, with their doc comments. Nothing else in the module moved or changed.
- `rule-list.tsx`: the two types and `focusAfter` now stand here, unexported, just before `keysOf`, the one function that reads them. The logic of `focusAfter` is copied unchanged. Its doc comment no longer names a "condition select" (the old DOM editor's term): the „Dodaj regułę” branch now reads "the new row's opening control, since its panel opens on the condition", which is what `keysOf` maps the `condition` control to (`open`). The import from `./program-editor.js` drops `focusAfter` and `FocusTarget`.
- `tests/view/program-editor.test.mjs`: the `focusAfter` import and the one case "focus after a structural edit: …" (asserts `focusAfter` for up, down, remove, add) are removed. Reason and source are given under "Changed test" below.

No behaviour changes. No other file of the repository imports the removed names (checked by search across the worktree, outside `.runs/`).

## Checks (focused, from the slice's *Checks*)

| Command | Exit code | Result |
|---|---|---|
| `npm test -- tests/view/program-editor.test.mjs` | 0 | pass 54, fail 0 |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | pass 76, fail 0 |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | pass 53, fail 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | Ran 5 tests, OK |

The full suite (`npm test` without a file) was not run, as the handoff asks.

## Own-work check (WAY-164)

- **Requirement most likely not met:** the focus after „Usuń” goes to the „Usuń” of the rule now in its place, or to „+ reguła” where none is left, and the focus after „↑”, „↓” and „+ reguła” stays as it is. A slip in the moved `remove` branch would shift that focus.
- **Check:** temporarily change `index < ruleCount` to `index < ruleCount - 1` in the `remove` branch of `focusAfter` in `rule-list.tsx`, run `npm test -- tests/view/rule-editor.test.mjs`, then restore the line and run it again.
- **Mutated run:** `npm test -- tests/view/rule-editor.test.mjs` exit 1, pass 75, fail 1. The failing case: "after „Usuń” the focus goes to the „Usuń” of the rule now in its place, and to „+ reguła” where none is left".
- **Restored run:** the same command, exit 0, fail 0.
- The mutation was reverted before the commit; the commit contains the original line (verified by the passing check and the diff).

## Test first

Not applied. This is a move with no change of behaviour; no new failing test is named, and the slice has no invariant test.

## Changed test (testing guidelines, "Changing an existing test")

Removed: `focus after a structural edit: same button in the moved rule's row, next „Usuń” or „Dodaj regułę”, new condition` in `tests/view/program-editor.test.mjs`.

- Reason: the function it asserts leaves this module (the requirement is on the rule list, D-288), so its assertions can no longer run here.
- Protection kept: the focus behaviour the list reaches is asserted in `tests/view/rule-editor.test.mjs`, section "the focus after an edit", which passes unchanged: after „↓” across a group border (line 876), after „↑” across a group border (895), at the program's end with the other arrow (912), into a folded group (924), after „Usuń” and „+ reguła” (936), after a rule is added (954), after „✕” (966) and after a drop (984).
- Not kept, and why it is no loss: the case also asserted `focusAfter("up")`, `focusAfter("down")` and `focusAfter("add")` as return values. The list never calls those three branches: `move` and `add` build their own control keys (`rule:<id>:…`, `group:<id>:add`), and only `remove` calls `focusAfter`. Those return values protected no behaviour of the list. See concern 1.

## Choices

1. **Move the whole `focusAfter` with its types, not only the branch the list uses.** Rejected: narrowing `StructuralEdit` to `"remove"` and `FocusTarget` to the remove shape. Narrowing changes the type that `keysOf` switches on (its `condition`, `up`, `down` and group branches would then not type-check) and so widens the change beyond a move. Cost if wrong: the `up`, `down` and `add` branches of `focusAfter` remain as dead code in `rule-list.tsx` with no unit coverage (see concern 1).
2. **Keep the comment's wording changed only where it named the old editor's control.** The "condition select" wording is replaced by "the new row's opening control". The rest of the doc comment is kept.

## Concerns

1. **Dead branches, no unit coverage.** `focusAfter` in `rule-list.tsx` has three branches that the list never reaches (`up`, `down`, `add`), since `move` and `add` in the same file build their own keys. Before this commit the program-editor test covered their return values, and that case is removed here. Nothing that the list does is unprotected (the list-level focus cases above pass), but the function as it now stands carries code no test and no caller uses. Recommendation: narrow `focusAfter`, `FocusTarget` and `StructuralEdit` to the `remove` edit and simplify `keysOf` in a follow-up change; that is a choice of shape, not part of the move. This slice does not do it, to keep it a move.
2. **Only one old-editor comment found.** The handoff's To do 13 second part speaks of "comments of the old editor built through the DOM" (plural). The only one in `program-editor.ts` and `rule-list.tsx` is the "condition select" wording in the `focusAfter` doc comment, which this slice rewrote. A case-insensitive search for "DOM", "old" and "select" found no other comment of that kind (the match on `react-dom` in `rule-list.tsx` is an import, not a comment).

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: not opened. I used only the passage the handoff gives (line 37, copied word for word in the handoff).
- `foundations/decisions.md`: only the ranges the handoff gives are read (D-288 at 8792-8867, D-297 at 8973-9004, D-303 at 9061-9074).
- `foundations/invariants.md`: only 1188-1197 (`document-test-memory-limit`) is read. It bears on tests that load jsdom; this slice adds no such test.
- `.the-way/task-cycle/change/ui_check.md`: not read. The change alters no screen, so the reading that section 3 of `make-change` asks for before a change of a screen does not apply.
- Every named guideline file was read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, and `src/browser/AGENTS.md`. The two source files and the test file I changed were read whole before the change.
- Also read: `a note in the author's private notes` (the user's instruction before a commit; it was shown by a hook, and the commit was repeated after it).

## Searches not found or unclear

- "comments of the old editor built through the DOM", plural (To do 13 second part): found one, the "condition select" wording in the `focusAfter` doc comment, moved and rewritten (concern 2).
- Callers of `focusAfter`: only `rule-list.tsx` uses it, and only for `remove`. Not unclear, but it is the reason for concern 1.

## Reaches beyond the handoff

- Read `tests/view/rule-editor.test.mjs` lines 874-998 (the focus section) to confirm that the list-level focus cases cover the removed program-editor case (the basis of the "Changed test" section).
- Read `.the-way/task-cycle/change/SKILL.md` and `slice.md` (the method, as the handoff names them).
- Read the whole of `tests/view/program-editor.test.mjs` (the changed file, read before the change).

## Working copies

None made. The directory `.runs/slice-6/` held only my redirected check logs; I removed the logs and the directory after the checks. No worktree, clone, script, screenshot or prepared input was made, so nothing needed the `git worktree remove` step. The worktree `.` is the task's own worktree and was not removed.
