Status: done

# Executor report — Slice 15 (The test of the rule editor takes the fifth group)

## Commits

- `301f9856` — `test: :white_check_mark: the rule editor's test takes the five groups of the pick, ...` (1 file, +19 / -4). Base was `9e9bb706`.

## Changed files

| File | Added | Removed | Part | Reason |
|---|---|---|---|---|
| `tests/view/rule-editor.test.mjs` | 19 | 4 | (1) one-time | The case writes out the groups of the pick by hand, which is the shape of the action model (the list of groups and the actions in each), so it belongs to the model's tests; the change adds the fifth group „Wytwarzanie” and the action „Opatrz” to that shape. |

Icons, foundation entries and guideline files are outside the count; none were changed by this slice.

## What changed in the test

- Title now names the five groups: Ruch, Zbieranie, Ogień, Żywność i walka and Wytwarzanie, "each with its icon and, where it has one, the time of one execution beside it".
- Groups expectation: „Żywność i walka” now reads `Zjedz — jagoda (1 jagoda)`, `Opatrz`, `Uderz — patyk`, `Kopnij`, `Odskocz`; a new group `Wytwarzanie` holds `Wytwórz` alone.
- New time assertions: `Opatrz` shows `10 min` (data: `src/browser/sim/data/actions.ts`, `tend.minutes: 10`); `Wytwórz` shows no time (`minutes: { fromTarget: "recipe" }`, D-293).
- Decision citation for D-290 changed from „four named groups” to „five named groups” (the sentence as the log holds it now, `foundations/decisions.md:9667`).
- Two decision lines added: D-363 „The pieces an action uses up …” was already there; added D-363 „An action whose price its target gives, „Wytwórz” and „Opatrz” with an item as the target, shows no price at its cell of the pick of actions” (sentence as the log holds it, second paragraph of D-363). D-293 line unchanged; it matches the log.
- Prettier: one of my new lines was over the width; reformatted by hand to the Prettier output before commit (no other lines touched).

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Focused test (the slice's check) | `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 pass, 0 fail, 0 skipped |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | "0 errors"; no line of `tests/view/rule-editor.test.mjs` reported |
| Size rule (D-425) | `node tests/quality/eslint-size-rules.mjs` | 0 | "0 functions and files over a threshold in 343 files" |
| Prettier | `npx prettier --check tests/view/rule-editor.test.mjs` | 0 | clean (after the one-line reformat) |
| ESLint | `npx eslint tests/view/rule-editor.test.mjs` | 0 | clean |
| Typecheck (the repo's script) | `node scripts/build.mjs --check` | 0 | clean |

No check was skipped. The full gate (`npm test` with no argument, `node --test` over a folder) was not run, as the handoff forbids.

One-line check result: focused test file 76/76 pass; foundation check exit 0; size rule, Prettier, ESLint and typecheck all exit 0.

## Own-work check (make-change section 3)

- Requirement: the case must take the five groups of D-290 with „Opatrz” after „Zjedz — jagoda” with its time, „Wytwórz” alone in „Wytwarzanie” with no time, and the cells with no price (D-363), and the title must name five groups.
- Check: the focused test file run, and a read of the expectation against `ACTION_GROUPS` and `ACTIONS` in `src/browser/sim/data/actions.ts`.
- Showed: the case passes against the current product code (the product side was written by earlier slices, commits `16a720e2` and `ef87d9e6`); the expected groups and times match the data.

## Test first (section 2)

- I did not run the case before my edit, so I did not see the changed expectations fail on the old expectation. The change is an expectation change for behaviour the product already has (the slice's own premise, "No product code changes"). The new expectations are the ones that pass now; the case would fail on a product that dropped „Opatrz” from its group, or gave „Wytwórz” a time, as the new assertions catch. Named here, not hidden.

## Reaches beyond the handoff

- `src/browser/sim/data/actions.ts` (lines 55-231) read to take the group labels and the minutes of `gather`, `patrol`, `tend` and `craft` for the expectations. Why: the handoff does not name the data file, and the expected times must come from the data, not from the code under test. Read-only.

## Unread material

- `tests/view/rule-editor.test.mjs`: read only lines 1500-1679 (the case and its neighbour), not the whole file (the handoff asks for whole). The change is confined to the case at line 1527; the rest of the file is outside this slice.
- `guidelines/styleguide-browser-view.md`: read lines 1-601 of 1217. The rest is not read. The slice changes a test only, no screen, token or style; the rules that bind a view change do not bind this test change.
- `guidelines/coding.md`, `guidelines/testing.md` (whole, both pages), `guidelines/coding-browser-module.md` (whole), `src/browser/AGENTS.md` (whole), `foundations/decisions.md` D-290 (9665-9691), D-293 (9347-9380), D-363 (9987-10003): read whole.
- `.the-way/task-cycle/change/ui_check.md`: not read; the slice changes no user interface.
- `walkthrough.md`: not read; the slice changes no behaviour a user sees.

## Searches not found or unclear

- `tests/view/program-editor.test.mjs` lines 1093-1097 also write out the pick's actions by hand (grep hit: `Zjedz — jagoda (1 jagoda)`, `Uderz — patyk`, `Odskocz`). Not in this slice's file; the handoff's "any other case of the file" refers to `tests/view/rule-editor.test.mjs`, which has no other case writing out the whole pick. I did not read or change `program-editor.test.mjs`; it may need the same groups and the two verbs in a later slice — flagged for the orchestrator.
- The typecheck script is `node scripts/build.mjs --check`; `npx tsc -p .` fails here (no root `tsconfig.json`), so that route is not a check of this repo. I used the repo's script.

## Working copies

- `.runs/executor-15/` (inside the worktree's ignored `.runs/`) holds only the output files of my checks: `foundation.txt`, `size.txt`, `tsc.txt`, `typecheck.txt`. No worktree or clone was made. Removed before return; the results are in this report. (The directory is removed; a `head-rule-editor.mjs` copy of the HEAD file made for a Prettier comparison was removed earlier.)

## Worktree

Clean after the commit (`git status --short` empty).
