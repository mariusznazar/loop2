PASS 90ff110077cc002fe409da85c794f4d01f7254d1

# Review-10 fix — the fix of the findings of the review of Slice 10

Range `8f896859..90ff1100` (one commit, `90ff1100`; one file, `tests/view/judging-cache-gear.test.mjs`, +1 −2). Variant: the fix of earlier findings (`.the-way/task-cycle/review/fix.md`). `git rev-parse HEAD` in the worktree was `90ff110077cc002fe409da85c794f4d01f7254d1`, the head given.

## Findings of the findings file

### Important 1 — the new test file imports Node's assertion module beside the jsdom harness — **fixed**

- The import of `node:assert/strict` at `tests/view/judging-cache-gear.test.mjs:10` is gone. The file's first import is now `import { assert, inAct, press, withPage } from "./page-document.mjs";`, and the later import of the harness was removed. The file now has the shape of `tests/view/maps-record.test.mjs:10`.
- Evidence: `npm test -- tests/view/memory-limit.test.mjs` on `90ff1100` gives exit 0, 37 pass, 0 fail. The case "the tree holds no file that goes round the harness of a document imitation" now passes; it failed on `8f896859`. Output: `docs/task-cycles/wyposazenie-postaci/reports/review-10-fix-memory-limit-run.txt`.
- The assertions keep their meaning. The file uses only `equal` (24), `deepEqual` (9), `notEqual` (2) and `ok` (1). The harness's `equal`/`notEqual` compare with `Object.is`, and its `deepEqual` compares with `isDeepStrictEqual` (`tests/view/page-document.mjs:217-250`), which matches `node:assert/strict` for the values the file compares. The harness's `deepEqual` takes only plain data, and every `deepEqual` of the file compares records, lists of booleans or lists of keys, all plain data. All 12 cases pass on the new head.

Contested: none.

## New findings in the fix diff

none. The diff only moves an import and changes where `assert` comes from. No product code is changed, and no test case or expected value changed.

## Minor findings

The three Minor findings of `review-10-report.md` were not in the findings file and were not addressed; they remain as reported and block nothing. They are: four crafted counts pass by the equality at reading; the trust-boundary row of `guidelines/testing.md:178` is out of date; the game state is an optional parameter of `read` and `remember`.

## Declined to judge

none

## Checks run

All were run in a worktree of `90ff1100` at `.runs/review-10/head`, with `node_modules` and `.the-way` linked to the reviewed worktree's.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | 37 pass, 0 fail |
| `npm test -- tests/view/judging-cache-gear.test.mjs` | 0 | 12 pass, 0 fail |
| `npx eslint tests/view/judging-cache-gear.test.mjs` | 0 | clean |
| `npx prettier --check tests/view/judging-cache-gear.test.mjs` | 0 | clean |

Not re-run, because the fix touches only the one test file: the other focused tests of the slice, the typecheck and the foundation check (the executor reports them unchanged). Not run: the full suite, which is the cycle's own run.

## Reach beyond the dispatch

- `tests/view/page-document.mjs:180-260` (the harness's `assert`): to check that the methods the file uses behave as `node:assert/strict` did.

## Working copies

- `.runs/review-10/head`, a detached worktree of `90ff1100`, with junctions to `node_modules` and `.the-way`. The junctions were removed first, then `git worktree remove --force` and `git worktree prune`. The directory `.runs/review-10/` was removed. Nothing remains.
- Kept in `reports/`: `review-10-fix-memory-limit-run.txt`.

## Unread material

none: `fix.md`, the findings file, the fix report and the full fix diff were read whole.

## Searches not found or unclear

none
