PASS abf2e542a7f2c2ff26708baad9813a8a2825d5c7

# Review of the reconciliation with the target branch, task `blokada-konta`

- Reviewed: merge commit `abf2e54` (parents `017c860` task branch, `519bb8c` `origin/main`),
  merge base `6540e4c`. `git rev-parse HEAD` = `abf2e542a7f2c2ff26708baad9813a8a2825d5c7`, as given.
- Method: `.the-way/task-cycle/review/SKILL.md`. Read: the handoff
  `.runs/task-cycles/blokada-konta/reports/10-merge-review-handoff.md`, the author's report
  `.runs/task-cycles/blokada-konta/reports/09-merge-report.md` (treated as claims).

## Findings

### Critical
None.

### Important
None.

### Minor
None.

Blocking: 0. Minor: 0. Out of scope: 0.

## How the merge was judged

I rebuilt the expected merge on my own and compared it with `abf2e54` file by file, instead of
reading the author's resolution:

1. For each file both sides changed or the renumbering touched (`foundations/decisions.md`,
   `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`,
   `guidelines/testing.md`) I took the branch's `017c860` version and renamed `D-129`→`D-137`,
   `D-130`→`D-138`, `D-131`→`D-139` (only when no digit follows). Then I ran
   `git merge-file` of that renamed branch, the base `6540e4c` and main `519bb8c`.
2. `part_map.md` and `guidelines/testing.md` merge cleanly, and the result is byte-identical to
   `abf2e54`.
3. `decisions.md`, `invariants.md` and `glossary.md` each have one conflict, where both sides
   appended entries in the same place. I resolved each one mechanically: main's block first, then
   the branch's block. Compared with `abf2e54`, the only difference is at the join between the two
   blocks: a blank separator line in `decisions.md` and `glossary.md`, and in `invariants.md` the
   line `- **Violated:** no` plus a blank line. That line ends main's `streak-program-change`. The
   conflict had left one shared copy of it after the hunk, which now ends
   `unblock-restores-no-session`. Each of the two entries now has its own line, as the author
   reports.

What this shows:
- Main's D-129 … D-136 (`foundations/decisions.md:2296`–`:2482`), its invariant
  `streak-program-change` and its glossary terms are exactly as on `519bb8c`. Every line
  `git diff 519bb8c abf2e54` changes in `foundations/` belongs to the branch's own edits:
  D-100 (`:1761`), D-107 (`:1864`), D-112 (`:1940`, `:1943`, `:1948`), the invariants at
  `:674`, `:760`, `:770`, `:780`, `:783`, the appended entries, and the account-server
  responsibility sentence in `part_map.md:60`.
- The branch's three decisions now sit at `foundations/decisions.md:2484` (D-137), `:2499` (D-138)
  and `:2512` (D-139). Their text is the branch's text with only the numbers changed, so no
  meaning was dropped or altered on either side.
- No file outside `foundations/` and `guidelines/testing.md` differs from the parent that changed
  it. The code and test files the two sides changed do not overlap: `git diff 519bb8c abf2e54`
  lists only the branch's files, and `git diff 017c860 abf2e54` lists only main's files plus the
  resolved foundation files and `guidelines/testing.md`.

References:
- `git grep -E 'D-1(29|3[01])([^0-9]|$)' 6540e4c` gives no hit, so every such number on the
  branch was the branch's own. On `017c860` the hits are only in `decisions.md` (7),
  `invariants.md` (4) and `guidelines/testing.md` (4), and all of them are renamed in the merge.
- On `abf2e54`, outside `decisions.md`, the numbers D-120 … D-139 occur only at
  `foundations/invariants.md:674` (`D-101 · D-138`), `:834` (main's `D-131 · D-136`), `:844`
  (`D-137 · D-139`), `:854` (`D-138 · D-137`), `:864` (`D-137`) and `guidelines/testing.md:149`
  and `:192`–`:194`. Inside `decisions.md`, D-100 says "as D-139 gives" (`:1761`), D-107 says
  `derives from D-138` (`:1864`), D-112 says "blocking command of D-137" (`:1940`) and D-139
  says `derives from D-137` (`:2518`). Each one points to the meaning it had on the branch.
- The frozen task, the spec and the vault notes cite none of the old numbers (see the reaches
  below). Nothing outside git points at the branch's old numbers in a way that would now land on
  main's decisions. The exception is the ignored cycle reports 03, 05 and 07, which the author
  names.

Trust boundary and irreversible operation: the merge changes no file in `src/server/**` relative
to `017c860`. The migration of `loop2_accounts` is still prepared and not performed, exactly as
on the reviewed branch head.

Pin: `git -C .the-way rev-parse HEAD` = `3aee7d958835cc19b95519f4d21b37538b78e3e1` =
`git ls-files --stage -- .the-way`.

## Declined to judge

- The branch's own change, already reviewed: whole change `PASS 81cb7c6`, return step and its fix
  `PASS 017c860`. The merge leaves it unchanged except for the renumbering, so I did not
  re-review it.
- Main's own change (PR #35 `rozwiazanie-lasu`), merged upstream. The merge leaves it unchanged.

## Checks

| Check | Exit | Result |
|---|---|---|
| Rebuild of the merge: renamed branch + `git merge-file` against base and main, conflicts resolved main-then-branch, `diff` with `abf2e54` (method above) | — | `part_map.md` and `testing.md` identical; three join-point differences, each one correct (above) |
| `git grep -E 'D-1(29\|3[01])([^0-9]\|$)'` on `6540e4c`, `017c860`; `git grep -E 'D-1[2-3][0-9]'` on `abf2e54` | — | as above |
| `git diff -U0 519bb8c abf2e54 -- foundations/` hunk list; `git diff -U0 6540e4c 519bb8c -- foundations/decisions.md` hunk list | — | the hunks do not overlap |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm test -- tests/account-storage.test.mjs` | 0 | pass |
| `npm test -- tests/http.test.mjs` | 0 | pass |
| `npm test -- tests/account-api.test.mjs` | 0 | pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | pass (the branch's `account-blocked` refusal code next to main's view changes) |
| `npm test -- tests/sim/streak.test.mjs` | 0 | pass (main) |
| `npm test -- tests/sim/completion.test.mjs` | 0 | pass (main) |
| `npm test -- tests/view/status-row.test.mjs` | 0 | pass (main) |
| `npm test -- tests/invariants/test_streak_program_change.py` | 0 | 4 tests OK (main's invariant, reads the merged foundation) |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 8 tests OK (type-check across both sides' sources) |
| `git status --short` after the checks | 0 | clean; only ignored `dist/` rebuilt |

Not run: `npm test` without arguments (the cycle's own run, as the dispatch says).

## Reaches beyond the dispatch

- `.runs/task-cycles/blokada-konta/task.md` and `spec.md`, searched for `D-12x` and `D-13x`, to
  find stale references to the old numbers: no hit.
- Vault `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\` (recursive) and
  `…\(P) Loop\_zadania\blokada_konta_loop2.md` (the Origin of D-137 and D-139), searched for
  D-129 … D-139, for the same reason. No hit; these notes name the decisions by their questions.
  As a positive control, the same search for `D-[0-9]+` finds files.
- `scripts/test.py`, read to learn how `npm test -- <file>` runs, including that it builds into
  the ignored `dist/`.
