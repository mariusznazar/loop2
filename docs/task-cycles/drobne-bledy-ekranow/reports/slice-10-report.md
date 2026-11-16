# Slice 10 report — cycle `drobne-bledy-ekranow`

## Status

`done with concerns`

Concern: the screenshot part of the own-work check (`ui_check.md`) is unperformed; see "Own-work check" and "Questions and concerns".

## Commits

- `855939b0` — `fix: :bug: say only what the copy lacks where the copy has no unsaved changes, without the promise of a save`
  - range: base `bc79b284` to head `855939b0`
  - `src/browser/view/end-question.tsx` — 1 function changed, the call in the question passes `true`
  - `src/browser/view/program-panel.tsx` — the line under the copy's heading passes the copy's unsaved changes
  - `tests/view/program-panel.test.mjs` — one new case, one expectation changed
  - total: 3 files, 35 insertions, 7 deletions

## What changed

- `copyLacksSentence(name, unsaved)` in `src/browser/view/end-question.tsx` now gives two forms (D-172):
  - `unsaved` true: `Program {name} ma zmiany, których nie ma w tej kopii — zapis w programie je zastąpi.`
  - `unsaved` false: `Program {name} ma zmiany, których nie ma w tej kopii.`
- The question of „Zakończ” (`EndQuestion`) always passes `true`. The question stands only with unsaved changes (D-173), so it keeps the full sentence.
- The save-buttons line in `ProgramPanelView` (`src/browser/view/program-panel.tsx`) passes the panel's `unsaved` value, which is `copyShown && copyHasUnsavedChanges(state)`.
- Tests:
  - New case `a copy with no unsaved changes whose program was changed reads the short line, with „Zapisz w programie” inactive`. It asserts the exact short text under `Kopia: Program` and that „Zapisz w programie” is disabled.
  - Existing case `the line of a changed program stands with and without unsaved changes, and goes after „Zapisz w programie”`: its first assertion (copy with no unsaved changes) expected the full sentence. I changed it to the short sentence `lacksPlain`, because D-172 now settles the short wording there (task settlement 8, answer 1b; the task's To do 19). The assertion for the copy with unsaved changes still expects the full sentence.

## Checks

Each run through `npm test -- <file>` (Node after build), the exit code is that of the command.

| # | Command | Exit code | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/program-panel.test.mjs` (before the code change, new case written first) | 1 | 59 pass, 1 fail: the new case. Expected `["Kopia: Program","Program Program ma zmiany, których nie ma w tej kopii."]`, got the full sentence with „— zapis w programie je zastąpi.”. Log: `.runs/slice-10/run-red.log` |
| 2 | `npm test -- tests/view/program-panel.test.mjs` (after the change) | 0 | 60 pass, 0 fail. Log: `.runs/slice-10/run-program-panel.log` |
| 3 | `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass, 0 fail. Log: `.runs/slice-10/run-end-question.log` |
| 4 | `npm test -- tests/sim/copy-actions.test.mjs` | 0 | 35 pass, 0 fail. Log: `.runs/slice-10/run-copy-actions.log` |
| 5 | `npx eslint src/browser/view/end-question.tsx src/browser/view/program-panel.tsx` | 0 | no output. Log: `.runs/slice-10/eslint.log` |
| 6 | `npx prettier --check src/browser/view/end-question.tsx src/browser/view/program-panel.tsx tests/view/program-panel.test.mjs` | 0 | "All matched files use Prettier code style!" Log: `.runs/slice-10/prettier.log` |

Not run, by design: the full suite (`npm test` without a file), `foundation_check.py`, `check_instructions.py`. The handoff forbids the full suite and the slice's checks do not name the others.

Invariant tests: the slice touches no invariant, so none was seen failing. The case that the new test guards is named below.

## Own-work check

- Requirement most likely not met: with no unsaved changes of the copy, the line must not promise a save, and its text must be the short form (D-172, task settlement 8). Where the copy holds unsaved changes, the full sentence must stand, and under the question of „Zakończ” the full sentence must stand.
- Check written: the new case in `tests/view/program-panel.test.mjs`, which asserts the exact short text and that „Zapisz w programie” is disabled, plus the existing case, which asserts the full sentence with unsaved changes and under the question (`tests/view/end-question.test.mjs`, the case at its line 304 and 446 for the question).
- Run: check 1 (red) showed the full sentence where the short one is required; checks 2 and 3 (green) pass.
- Mutation in my head: if the function ignored `unsaved` (always short), the case for unsaved changes in the existing test fails. If the panel passed `!unsaved`, both cases fail. If the question passed `false`, the end-question case at line 304 fails. Each is caught.
- Rerun after a failure: the only failure was check 1, and I did not rerun it with a different outcome other than the green run of check 2 after the code change.

## Own-work: `ui_check.md` (screenshot)

- States: the affected text has two states, with and without unsaved changes. Both are covered by jsdom cases (the new case and the existing case). The line's role `warning` is unchanged in code; no shared control changed, so no styleguide state list applies.
- Screenshot: unperformed. The settled route is `.claude/skills/loop2-play/SKILL.md`: it starts the game with `npm run local`, operates it in a real browser, and shows a screenshot by pushing it to the public repository `mariusznazar/screenshots` (D-418, D-419). Running that route and publishing an image to a public repository is outside the focused checks this handoff gives, so I did not do it. Nothing is shown to the human and no screenshot was kept.

## Questions and concerns

1. Screenshot route (`ui_check.md`): should the orchestrator run the `loop2-play` route for this slice (game start, a browser check of the copy's line with and without unsaved changes, screenshot to the public repository), or accept the jsdom states as the check? My recommendation: accept the jsdom states for this slice, since the change is one text form in a line that already has the role `warning`, and run the screenshot once with the other slices of the cycle. Cost if not run: a visible wrap or wrong colour would pass unnoticed by jsdom; the risk is low because the element and its class are unchanged.
2. Test expectation change: the existing case's first assertion was changed from the full sentence to the short one. Cause: D-172 (wording without unsaved changes) and task settlement 8. Recommended: accept. Cost if wrong: none found; the new case asserts the same text independently.
3. Choice: `copyLacksSentence` takes a flag `unsaved` instead of two functions. Rejected: two functions, which would split the one source of the D-172 wording. Cost if wrong: a caller that forgets the flag gets the full sentence, which is the older behaviour and not a silent loss.

## Unread material

- `task.md` (`.runs/task-cycles/drobne-bledy-ekranow/task.md`): not opened. I used only the passages quoted in the handoff (lines 43, 84-89, 194-195 header, 203).
- Row 8 of the plan's Foundation entries: not opened. The handoff quotes the row (task line 203) and I used that quote.
- `foundations/invariants.md:1188-1197` (`document-test-memory-limit`): not read. The slice does not change an imitation of a document, so the rule does not bear on the change; I did not check it.
- `foundations/part_map.md`: not read; the handoff does not name it.
- `foundations/decisions.md:7879-7895` (D-168), `7931-7951` (D-171), `7952-7976` (D-172), `7977-8008` (D-173): read whole at the handoff's current ranges.
- `foundations/glossary.md:170-181` (the word "copy"): read; the whole file not read.
- `foundations/invariants.md:855-867` (`copy-save`): read.
- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`: read whole.
- `tests/view/program-panel.test.mjs`, `src/browser/view/end-question.tsx`, `src/browser/view/program-panel.tsx`: read whole before the change.
- `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`: read whole.

## Searches not found or unclear

- The plan's line ranges for D-168, D-171, D-172 and D-173 were stale (for example D-172 at `7915-7934` in the plan). I used the handoff's current ranges, which match the file.
- No other production or test code uses `copyLacksSentence` (grep over the worktree, excluding `dist/`), so the signature change has one caller in the product (`end-question.tsx`, the question) and one in the panel.

## Reaches beyond the handoff

- `a note in the author's private notes`: read because a pre-commit hook required it (rules-on-demand). Followed: English message, explicit `git add` by path.
- `.claude/skills/loop2-play/SKILL.md` and `tests/view/end-question.test.mjs`: read to judge the screenshot route and the question's cases.
- Stray directory: I created `.runs/slice-10/` in the main checkout by a mistaken `mkdir`, found it empty, and removed it (`rmdir`). Nothing was written there. The slice's directory is `.runs/worktrees/drobne-bledy-ekranow/.runs/slice-10/`.

## Working copies

- No worktree, clone, script or screenshot was made by me.
- `.runs/slice-10/` (inside the worktree's ignored `.runs/`) holds only the output logs of the checks listed above (`run-red.log`, `run-program-panel.log`, `run-end-question.log`, `run-copy-actions.log`, `eslint.log`, `prettier.log`). They are outputs, not copies, and I left them in place for the orchestrator. Nothing needed removal.
