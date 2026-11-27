Status: done with concerns

# Executor report — Slice 14: The rule panel picks the place of „Puste” and the item of „Załóż”

## Commits

- `fe521037` — test: the rule panel's picks of „Puste” and „Załóż” checked in a file of their own, and the rule-editor test takes the new cells. Range from the slice base `f9be98ce`: this is the only commit of the slice.

## Files changed

| File | Added | Removed | Note |
|---|---|---|---|
| `tests/view/gear-rule-panel.test.mjs` | 200 | 0 | new file, 4 cases |
| `tests/view/rule-editor.test.mjs` | 10 | 4 | three stale expectations updated (see below) |

No product file changed. `src/browser/view/rule-panel.tsx` and `src/browser/view/item-target-pick.ts` (named in the slice's *Change*) are unchanged: the behaviour the slice's *Goal* asks for already holds in the code Slice 13 wrote (commit `f9be98ce`). `placePick` and `conditionTargetPick` in `src/browser/view/program-editor.ts` give „Puste” its place cells, `itemTargetPick` in `src/browser/view/item-target-pick.ts` gives „Załóż” its item cells without a price, and `changedProgram` in `rule-panel.tsx` commits the place. The new file tests that behaviour; it found nothing to fix.

## Checks

Each `npm test -- <file>` run builds the game first.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/gear-rule-panel.test.mjs` (first run, before any product change, and with no product change at all) | 0 | 4 of 4 pass |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 82 of 82 pass |
| `npm test -- tests/view/item-verb-panel.test.mjs` | 0 | 6 of 6 pass |
| `npm test -- tests/view/rule-window.test.mjs` | 0 | 10 of 10 pass |
| `npm run typecheck` | 0 | `node scripts/build.mjs --check` passes |
| `python -B .the-way/elements/common/foundation_check.py` (after `git add` of both files, before the commit and again after it) | 1 | 2 errors, both in `tests/view/character-screen.test.mjs:134` and `:400` (`D-446`, `D-445`), not in this slice's files; my two files add no error |
| `npx prettier --check` on both test files | 0 | after `prettier --write` on the new file |

Not run: the full `npm test` (the handoff forbids it for a slice), and the check in a real browser (Slice 15's).

### Failing tests before and after

- Base (slice base `f9be98ce`, before my edits), `tests/view/rule-editor.test.mjs`: 3 of 82 fail, exit 1. The results on the base:
  - „in a grid the arrow keys move among the cells, two columns of conditions, a greyed cell reached and Enter on it doing nothing": `expected "Tu leży mniej niż", got "Puste"`.
  - „the actions stand in the five groups Ruch, Zbieranie, Ogień, Żywność i walka and Wytwarzanie…": the group „Żywność i walka” lacks „Załóż” at its end.
  - „the conditions stand in two columns in their sections…": „Puste” is in the body section of the conditions, where the expected list does not have it.
- After my edits: `rule-editor.test.mjs` 82 of 82 pass.

### The fail-first step

The slice asks for `gear-rule-panel.test.mjs` to be written first and failing. It was not failing: all 4 cases passed on their first run, because the behaviour already existed (see *Files changed*). I did not force a failure. What each case would catch if the panel broke:

1. „Puste” takes its place from a pick of the fitted places — catches a missing or wrong place pick for the condition's target (`conditionTargetPick`, `placePick`).
2. The arrow keys move between the two place cells, and Enter on „Kieszeń” commits `{ kind: "emptyPlace", place: "pocket" }` — catches a broken key path or a commit with the wrong place kind.
3. „Załóż” takes its item from the items that fit: „Patyk” and „Opatrunek”, each with no price and no time — catches a price shown in the cell or a time shown beside the target (`itemTargetPick`, `itemTargetTime`).
4. The cell „Załóż” in the pick of actions has no price and shows „1 min” — catches a wrong time or a price in the action's name.

## Own-work check (`make-change` section 3)

- Requirement: the rule panel gives „Puste” the pick of its place in pick cells, and „Załóż” the pick of its item with no price; the keyboard moves among the cells.
- Check: the four cases of `gear-rule-panel.test.mjs` and the changed cases of `rule-editor.test.mjs`.
- Showed: all pass; the place cells read „Ręka główna” and „Kieszeń”, the item cells read „Patyk” and „Opatrunek”, neither with brackets nor a time.

## Changed expectations in `rule-editor.test.mjs` (why)

These are the stale expectations the slice's *Goal* names ("takes the new group's and section's cells"). They follow D-290 as it stands: „Puste” sits in the body section after „Energia natury poniżej”, and „Załóż” ends „Żywność i walka”.

- The arrow-key case: after „Energia natury poniżej” the next cell is now „Puste”, then „Zapas poniżej”; „Tu leży mniej niż” is reached by one more step right. Going up from „Tu leży mniej niż” lands on „Puste”, and one step further up on „Zdrowie poniżej”, where Enter commits `healthBelow` as before.
- The actions case: „Załóż” added at the end of „Żywność i walka”.
- The conditions case: „Puste” added to the body section.

## Decision lines

- `gear-rule-panel.test.mjs` carries `decision:` lines quoting D-459 (the whole first sentence), D-288 (copied from the existing test, unchanged), and D-363 and D-293. The first attempt quoted a clause of D-363 that does not begin a sentence, and the foundation check rejected it; I removed that line. The remaining quotes pass the foundation check.

## Working copies

None made as copies. `.runs/executor-14/` holds only the logs of the runs listed above (`baseline-rule-editor.txt`, `gear-rule-panel-first-run.txt`, `final-*.txt`, `foundation*.txt`, `typecheck.txt`, `commit-msg.txt`). It is under the ignored `.runs/`. No worktree or clone was made, so nothing needed removal.

## Walkthrough (`walkthrough.md`)

Not walked: the slice changes no behaviour a user sees in the running product (test files only), so no walk of the plan of cases applies. The real-browser check is Slice 15's.

## Unread material

- `docs/task-cycles/wyposazenie-postaci/task_frozen.md` lines 33-39: read as the slice names them.
- `foundations/decisions.md` D-289 (9923-9973), D-290 (9975-10002), D-459 (12818-12831): read whole. D-458, D-363 and D-293 were read by their headings and first sentences only; the quotes in my test headers follow the first sentence of D-363 and the text of D-459.
- `guidelines/styleguide-browser-view.md`: read whole (lines 1-1975, in pages).
- `guidelines/testing.md`: read whole (lines 1-510, in pages).
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `foundations/part_map.md` 3-32: read whole or in the named range.
- Not read: `foundations/decisions.md` D-288 in full (the existing test quotes it; I used the test's quote unchanged) and D-443, D-456 (named by D-459 as relations only).

## Searches not found or unclear

- Reach beyond the dispatch: `src/browser/view/program-editor.ts` lines 740-970 (the picks: `placePick`, `conditionTargetPick`, `actionTargetPick`, `conditionFields`, `actionTime`, `actionFieldValue`), read to find where „Puste” and „Załóż” get their cells. The slice's *Read* does not name this file; I read it because the panel's pick comes from it. Why: the *Change* names only the panel and its item-target file, and the cells come from this file.
- Searched `tests/view/` for `Puste`, `Załóż`, `emptyPlace` and `equip`: 17 files match (among them `tests/view/program-editor.test.mjs`, `tests/view/gear-editor.test.mjs` and `tests/view/gear-words.test.mjs`). I did not open them, so I do not know whether any of them already checks the rule panel's pick of „Puste” or „Załóż”; a possible overlap with my new file is unverified.
- The slice's wording "written first, failing": the test passed on first run (see *The fail-first step*). Not found in any dispatch: a way to show a failing run for a behaviour that already holds.

## Choices

- I updated the three stale expectations in `rule-editor.test.mjs` rather than the panel, because D-290 (the decision the test quotes) puts „Puste” and „Załóż” where the code already draws them. Cost if wrong: if the decision moved „Puste” out of the body section, the new expectations would hide the change; the foundation's decision governs, and it is the one D-290 as written.
- I left `rule-panel.tsx` and `item-target-pick.ts` untouched. Cost if wrong: none for this slice, since the behaviour is tested and passes; a later change in those files will need the new file's cases to be run.

## Problems observed

- The slice's *Checks* line says the new file should fail first; it cannot, because the behaviour already holds. The orchestrator should decide whether Slice 14 is done by its tests alone, or whether the *Goal* still stands as written.
- `foundation_check.py` reports 2 errors in `tests/view/character-screen.test.mjs` (lines 134 and 400), which quote D-446 and D-445. This slice does not touch that file. The handoff expected 14 such errors until Slices 4, 4b and 18; 2 remain at this run.
