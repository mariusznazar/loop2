PASS 60e6a6bb470b1963687259365ab8f43f83ae1946

# Review of the fix of the merge-review finding, range b1628f0a..60e6a6bb

`git rev-parse HEAD` is `60e6a6bb470b1963687259365ab8f43f83ae1946`, the head given. The range is one commit, `60e6a6bb`, one file, `tests/view/previous-save.test.mjs` (+1/-12), as the fix report says. Method: `.the-way/task-cycle/review/fix.md`. Read-only; no npm command, no product test, build or typecheck.

Counts: blocking 0, Minor 0, out of scope 0. Questions: none.

## Finding 1 of `reports/merge-findings.md` (the copies of `press` and `fire` in `tests/view/previous-save.test.mjs`): fixed

- The defect no longer exists on the new head. `git grep -n -E '^(async )?function (press|fire)\b' HEAD -- tests` finds no definition in any test file. In the file, `grep -n -E '\bfire\b'` finds nothing, and `press` is bound only by line 9: `import { assert, inAct, press, settle, withPage } from "./page-document.mjs";` (the same import shape as `tests/view/program-list.test.mjs:5`, 76 characters, within the formatter's width).
- The diff deletes exactly the local `fire`, the local `press` and its doc comment (old lines 69-78); the rest of the file is untouched.
- `fire` is truly unused: its only caller was the local `press`; no call or mention of `fire` remains.
- `inAct` is still used (51 mentions in the file), `assert` stays used, so no import is left unused by the removal. `pressLogout` (line 1362) is a different helper that calls `press`, not a copy.

## The difference between the local `fire` and the harness's `fire`

- Local: `Event` from `globalThis.window`. Harness (`tests/view/page-document.mjs:125-131`): `Event`/`MouseEvent` from `(target.ownerDocument ?? target).defaultView`, `MouseEvent` only for `pointerout`, `{ bubbles: true, cancelable: true, ...init }`. For a `click` the class is `Event` in both and the options are the same.
- The two windows are the same inside a case: `withPage` (lines 93-108) opens a window, installs its globals (`install(window)`) and gives `{ window, document, root }`; every click in this file targets an element of the page built in that window. `onPage` (lines 43-62), the file's wrapper, runs its body inside `withPage`, so it keeps the same window.
- Outside `withPage` the globals point to `betweenCases` (the harness's idle window), which no case in this file uses. I checked with an `awk` pass over each top-level `test(` block: every block that contains `press(` or `pressLogout(` also contains `onPage(` or `withPage(` (the pass printed no block with a press and no wrapper). There are 40 `test(` blocks and 42 `onPage(`/`withPage(` mentions. No call of `press` stands at module level above line 140 (the helpers at the top are definitions only). So no case runs `press` or `fire` outside a page.
- `press` is otherwise identical: `assert.ok(target, "what the case presses stands")`, then `inAct(() => fire(target, "click"))`, with `assert` the harness's own.

## What the fix itself broke

Nothing found. The diff only removes duplicated code and adds one named import; no behaviour of a case changes, and the file parses (`node --check`, exit 0). No new finding of any grade. `git diff --stat b1628f0a..HEAD` shows no other file changed.

## Declined to judge

- Whether the file passes at run time and under the linter: not run (limit); the orchestrator's gate runs it.
- The file's header comment (lines 1-8) mentions D-264 and was not part of the finding.

## Checks run

- `git rev-parse HEAD` — exit 0, `60e6a6bb...`.
- `git log --oneline b1628f0a..HEAD`, `git diff b1628f0a..60e6a6bb` (and `--stat`), `git diff --stat b1628f0a..HEAD` — exit 0.
- `git grep -n -E '^(async )?function (press|fire)\b' HEAD -- tests` — exit 0 and no output (no definition left).
- `grep -n -E '\bfire\b' tests/view/previous-save.test.mjs` — no match; `grep -n -E 'onPage\(|withPage\('` and the `test(` count — counts 42 and 40.
- `awk` pass over the `test(` blocks for a `press` without `onPage`/`withPage` — exit 0, no block listed.
- `node --check tests/view/previous-save.test.mjs` — exit 0 (syntax only).
- Not run, for the limit: any npm command, the test file, the formatter, the linter, typecheck, build. Unverified for that reason: that the file passes and lints clean after the change.

## Reach beyond the dispatch

- `tests/view/page-document.mjs` lines 60-150 (the harness's `install`, `withPage`, `inAct`, `fire`, `press`): to compare the two `fire`s and see where the globals point outside a case.
- `tests/view/previous-save.test.mjs` lines 20-66 and 1362-1365 (`onPage`, `pressLogout`).
- `tests/view/program-list.test.mjs` line 5 (by earlier grep): for the import shape.

## Unread material

- `reports/merge-fix-report.md` read whole; `reports/merge-findings.md` not re-opened (the finding is the one of my own review, in `merge-reviewer-report.md`).
- `tests/view/previous-save.test.mjs` read in part only (header lines 1-66, the diff, `pressLogout`) beside the greps; the 40 cases were not read.
- Decision D-264 not re-read; it was read whole in the review of the merge.

## Searches not found or unclear

none
