PASS 4f62fec5af761084a7aa832b077958d735edaad0

# Review of the fix — the six Minor findings of the review of the whole change

- Range: `0785c763896565f0ccd3f2323e4fb44eee5a17ac..4f62fec5af761084a7aa832b077958d735edaad0`. Commits: `15cf4273` (code and tests) and `4f62fec5` (foundation wording).
- `git rev-parse HEAD` in the worktree gave `4f62fec5…`, the head given.
- Changed files (`git diff --numstat`):

  | File | + | − |
  |---|---|---|
  | `foundations/decisions.md` | 3 | 3 |
  | `src/browser/view/screen-address.ts` | 16 | 0 |
  | `src/browser/view/screen-registry.ts` | 11 | 5 |
  | `tests/view/screen-registry.test.mjs` | 13 | 10 |
  | `tests/view/state-store.test.mjs` | 1 | 1 |

- The only test files edited are new files of this change; no test file that existed at the base changed.
- New findings from the fix diff: none Critical, none Important, none Minor.

## Each finding

1. **Fixed: a kind no entry holds was caught only at `show`.**
   - The fix adds `SCREEN_KINDS` to `src/browser/view/screen-address.ts:15-29`, the file D-408 already names as a place a new screen changes. It is built from a record checked with `satisfies Record<Screen["kind"], true>`.
   - `createScreenRegistry` now throws at creation for any listed kind that no entry holds (`screen-registry.ts:142-145`).
   - The test (`tests/view/screen-registry.test.mjs:150-164`) now expects the throw when a table is built that leaves out Postać, Przejście and Mapy, and that nothing was written to the address.
   - I checked that the compile-time half works by editing a copy of the head (see the table below):
     - with `map` removed from the record, `npm run typecheck` fails with TS2741;
     - with an extra name `wiedza` added, it fails with TS2353.
   - So a kind added to `Screen` but left out of the list stops the build, and so does a name that is no kind.
2. **Fixed: the doc overclaimed "the registry knows no screen".**
   - The module doc (`screen-registry.ts:6-9`) now says the registry "knows no screen but Przejście, whose way back the page is told of". That matches `tellPlace`.
   - D-408's rationale now says "with one branch left for the way back to the screen of a map run". That matches the code too.
3. **Fixed as suggested: D-407's sentence read as one root per screen.**
   - The binding sentence (`foundations/decisions.md:9877`) now reads "keeps React roots of its own for each screen and for the menu bar, none shared between screens, and no single root over the whole view".
   - This is faithful to the code. Programy has two roots (the list and the panel) and Przejście has two (the run panel and the run screen). Siedziba, Postać, Mapy and the menu bar have one each, and no root is shared between screens. The memories that screens share (the folding of rule groups and the chronicle) are page memories, not roots.
   - It matches my suggestion. As the handoff notes, it departs from the wording of the task row ("po jednym na ekran albo pasek"), so the human settles it in the request.
4. **Fixed: D-407's *Rejected* overstated the cost.** Way c now says "a rewrite of the game view's controller". That is faithful to the source ("ok. 800 linii do przepisania" of the controller) and keeps counts out of the entry, as the template asks.
5. **Fixed: a test comment cited the wrong decision.** `tests/view/state-store.test.mjs:165` now reads "1000 ms of real time are one game minute at pace 1× (D-21)", which agrees with D-21's binding sentence.
6. **Fixed: a test pinned a dispose order that no requirement sets.** The case at `tests/view/screen-registry.test.mjs:409-421` is renamed "dispose takes every living instance down" and compares the sorted list of disposed instances, so it no longer fixes their order.

## What the fix itself could break

- `SCREEN_KINDS` is computed once when the module is imported (`Object.keys`). It is pure, and `screen-address.ts` makes no claim that nothing runs at import.
- The throw at `show` (`entryOf`) stays as a defence; no table that passes creation can now reach it.
- The duplicate-kind case and the "no entry holds headquarters" case of the same test still throw for the reasons their patterns name. `SCREEN_KINDS` lists `headquarters` first, and a two-entry table first lacks `character`.
- The game's real table holds all seven kinds, so `createGameView` is unaffected. The five test files that build the game through `createGameView`, and `uncaught-failure`, pass unchanged.

## Declined to judge

None.

## Checks run

| Check | Command | Exit |
|---|---|---|
| head given | `git rev-parse HEAD` (reviewed worktree) | `4f62fec5…`, matches |
| focused tests (worktree of the head) | `npm.cmd test tests/view/<f>.test.mjs` for `screen-registry`, `screen-address`, `state-store`, `end-window-game`, `end-question`, `account-screen`, `chronicle-game`, `previous-save`, `uncaught-failure` | 0 each |
| types | `npm.cmd run typecheck` (head worktree) | 0 |
| guard of the kind list | `screen-address.ts` in the head worktree with `map: true` removed, then with `wiedza: true` added, `npm.cmd run typecheck` each time; file restored | 1 (TS2741), 1 (TS2353) |
| lint | `npx.cmd eslint src/browser/view tests/view` (head worktree) | 0 |
| format | `npx.cmd prettier --check src/browser/view tests/view` (head worktree) | 0 |
| imports | `npm.cmd test tests/invariants/test_cross_part_imports.py` (reviewed worktree) | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0, `0 errors` |

Not run:

- The full gate (the handoff rules it out).
- `prettier --check foundations/decisions.md`. The author reports it exits 1 on `0785c763` as well, and no invariant covers Markdown.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` (whole), the method of a fix review.
- The first 12 lines of `src/browser/view/screen-address.ts`, to check what the module's doc claims.

## Working copies

- `.runs/review-fix/` held a `git worktree` of `4f62fec5` (with a `node_modules` junction to the reviewed worktree's) and the logs of the checks.
- Removed:
  - the junction first, with `rmdir` (the reviewed worktree's `node_modules` was checked intact);
  - the worktree with `git worktree remove --force` (exit 0), then `git worktree prune`;
  - the directory, deleted.
- The reviewed worktree is clean, with HEAD at `4f62fec5`. Nothing was kept.

## Unread material

- `reports/minor-fix-findings.md`: I read only its headings. It holds my own six findings, which I checked against the diff.
- Everything else named is read: the fix handoff, the author's fix report and the whole fix diff.

## Searches not found or unclear

None.
