Status: done

# Report of executor-5 — Slice 5: the view's new condition and the scene's goal stay whole for a kind added later

Worktree: `the task's worktree`, branch `task/wyposazenie-postaci`. Slice base `74f9ce2a`.

## Commits

- `5d72724c` refactor: :recycle: the view's new condition and the mage's goal give none and stay for a kind of condition or action their cases do not name (two files, 10 insertions, 2 deletions).

## Files changed

- `src/browser/view/program-editor.ts`: +5 −1. `newCondition` gets a `default` branch that returns `null`, and its doc comment says so.
- `src/browser/view/scene-picture.ts`: +7 −1. `goalOf` gets a `default` branch that returns `STAYS`, and its doc comment says so.

No test file changed. The explicit cases of both switches are kept, so every condition and action of today keeps its branch.

## Checks

Baseline on the slice base, before my edit (same commands, run first):

- `npm test -- tests/view/program-editor.test.mjs`: exit 0, 63 pass, 0 fail.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, 78 pass, 0 fail.
- `npm test -- tests/view/rule-editor.test.mjs`: exit 0, 82 pass, 0 fail.
- `npm run typecheck`: exit 0.

After my change (the four slice checks, all green):

- `npm test -- tests/view/program-editor.test.mjs`: exit 0, 63 pass, 0 fail.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, 78 pass, 0 fail.
- `npm test -- tests/view/rule-editor.test.mjs`: exit 0, 82 pass, 0 fail.
- `npm run typecheck`: exit 0.

Additional checks I ran:

- `npx prettier --check src/browser/view/program-editor.ts src/browser/view/scene-picture.ts`: exit 0.
- `npx eslint src/browser/view/program-editor.ts src/browser/view/scene-picture.ts`: exit 0.
- `node tests/quality/eslint-size-rules.mjs`, filtered to the two files: no finding, exit 0 (the file limit of D-425 is 800 lines; `program-editor.ts` measures under it by the rule's count, so no move-out commit was needed).
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, 2 errors, both in `tests/view/character-screen.test.mjs` (line 134 quotes a sentence of D-446, line 400 one of D-445: "the quotation stands in no binding sentence"). My commit touches no test and no foundation file, so I did not add them. I did not verify them on the base. The handoff expected 14 errors of this kind; the tree I ran on shows 2.

Not run: the full `npm test` (the cycle's run, not mine) and the mutation run (the slice's *Change* is in `browser-view`, and the testing guideline's mutation tool is simulation-only).

## Tests that fail on the slice base

None. All four slice checks pass on the base, so no failing test needed a base measure.

## Own-work check (section 3)

- Requirement: with no change of behaviour, the default branches must be reached by no kind of today, and the existing tests must hold.
- Check: the four slice checks plus typecheck, run before and after the edit. All green before and after.
- What it showed: no regression. Typecheck stays green with the switches having a default.
- What it cannot show: that a kind added later to the simulation's closed lists now compiles and gets `null` / `STAYS`. No kind is added here, so that claim is not checked by this slice. Slices 6 and 7 are where it gets exercised.
- Mutation in my head: a wrong default (for example `default: return at(...)`) would change nothing for today's kinds, so no existing test catches it; that is why the Goal names the existing tests as the checks and I report it as unprotected by a new test. No new test was written, as the slice's *Checks* name only existing files.

## Working copies

None made. The `.runs/executor-5-*.log` and `.runs/executor-5-base-*.log` files in the worktree's ignored `.runs/` are the captured outputs of the checks above, not working copies. They are left in place; nothing else needs removing.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1-549 of 1897. The rest is unread. Reason: this slice draws no colour, token, style or icon; the rules of the styleguide that apply to values in a file of the part concern styles and token values, and the two files I changed carry none. Lines 550 onward cover the layout section and the kitchen-sink page, which the slice does not touch.
- `guidelines/testing.md`: read whole (510 lines).
- `guidelines/coding.md`: read whole.
- `guidelines/coding-browser-module.md`: read whole.
- `src/browser/AGENTS.md`: read whole.
- `foundations/part_map.md` lines 3-32 (browser-view): read. Both files belong to the part through `src/browser/view/**`.
- `docs/task-cycles/wyposazenie-postaci/plan.md` lines 612-628 (Choices, the current range named in the handoff) and the Slice 5 section (line 194 on): read. The plan's Slice 5 *Goal*, *Change*, *Read*, *Checks* and *Depends on* were followed. The slice's `Read` line also names the Choices, which I read in full.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`, `cycle.md` and other agents' handoffs and reports: not read. The handoff does not name them for this slice.
- Foundation entries of this slice: none named by F-number in Slice 5's text, so none read.

## Searches not found or unclear

- Searched for a foundation entry that sets a file-size exception for `program-editor.ts`: none, as the only file exception in D-425 is `src/browser/sim/saved-game.ts`. The file measured under the threshold anyway.
- The handoff's count of 14 foundation-check errors does not match the 2 I observed on this tree. Unclear whether the other 12 were already fixed by earlier slices or whether the check's count changed; I did not dig further since my commit does not touch tests.

## Choices made

- `default` branch placed after the explicit cases instead of replacing them: the explicit cases name each kind's behaviour, so the diff adds lines and removes none of today's branches. Way rejected: folding the explicit STAYS cases into `default` (a smaller diff, but it hides which kinds stay on purpose). Cost if wrong: none for behaviour; the file is one line longer.
- The doc comments of both functions are extended in one sentence each, so a reader sees the default's meaning. Way rejected: leaving the comments as they were (the new branch would then be undocumented). Cost if wrong: none.

## Problems observed

- The foundation check shows 2 errors on this tree (see Checks). I did not verify their cause beyond the message text.
