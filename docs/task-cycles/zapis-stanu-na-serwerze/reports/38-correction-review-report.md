PASS 776acbc676236ba085476680bf6f740883530f21

# Review of the correction — request #43, task `zapis-stanu-na-serwerze`

- **Reviewed:** a later change to the open request, `f7d8234..776acbc` (one commit, `776acbc` docs:
  :memo: say in the saver's comments that only the moment during the save before a logout that goes
  on is dropped). `git rev-parse HEAD` = `776acbc676236ba085476680bf6f740883530f21`, the head given.
- **Method:** `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The human's decision on I-2
  ("popraw ten komentarz") and I-2 of `reports/32-return-fix-review-report.md` take the place of a
  findings file.
- **Not reviewed:** the renumbering and the merge of `origin/main` (`a2d89bf..f7d8234`), which
  another reviewer judges. I read it only to check that the saver's code and the logout's flow in
  `app.ts` did not change there. Its diff for `app.ts` and `game-saver.ts` changes decision numbers
  in comments only.

## The remark: I-2 — **made** (fixed)

- **Header** (`src/browser/view/game-saver.ts:2-7`) now says: "…every moment of saving during one
  coalesced into one more save after its answer, except a moment asked for during the save before
  a logout that goes on, which is dropped (D-207); …". This is what D-207 says
  (`foundations/decisions.md:3650-3652`, "a moment of saving during one is sent after its answer,
  unless that request is the save before a logout that goes on (D-97)"). The false clause "after
  which nothing more is sent" is gone, and nothing broader than D-207 is claimed.
- **Inline** (`:186-188`) now says: "The logout goes on, and its session's end takes the game away,
  so the moment asked for during this save is dropped (D-207). The saver goes on: when the logout's
  request fails, the game stays and later moments and checks still send." This matches the code:
  - The block `if (outcome.kind !== "failed") { pending = false; return; }` (`:189-192`) clears only
    the pending moment. `halted` is not set, so `moment()` (`:211-215`) and the interval's `check`
    (`:196-199`, `:205`) still send.
  - `app.ts` keeps the game when the logout request fails (`logoutWarning.set(...)`, then
    `later?.()`), and takes it away through `showForms` when the session ends (`result.ok` or a 401).
  - The act whose moment was dropped is not lost when the logout fails: its state differs from
    `baseline`, so the next check sends it. "later moments and checks still send" covers that.
  - I showed this behaviour (the saver sending after the logout's save) with a scratch test at
    `3bd8f3f` (report 32). The code of `answered`, `moment` and `check` is the same at `776acbc`:
    `git diff 3bd8f3f..776acbc -- src/browser/view/game-saver.ts` changes only comments and decision
    numbers.

## New findings in the correction's diff

None. All 12 changed lines are comment lines (checked by a script over `git diff -U0`), none longer
than 100 characters, and Prettier parses and accepts the file.

## Declined to judge

- The renumbering and merge range `a2d89bf..f7d8234`, which another reviewer judges, as the dispatch
  says.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `776acbc676236ba085476680bf6f740883530f21`, the given head |
| `git log f7d8234..776acbc`, `git diff f7d8234..776acbc` | one commit; `src/browser/view/game-saver.ts` +7 −5 |
| Script over `git diff -U0 f7d8234..776acbc`: every `+`/`-` line starts with `*` or `//` | 12 of 12 are comments; longest is 100 characters |
| `npx prettier --check src/browser/view/game-saver.ts` | exit 0, "All matched files use Prettier code style!" |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| `git diff a2d89bf..f7d8234 -- src/browser/view/app.ts src/browser/view/game-saver.ts` (read only) | only decision numbers in comments changed |
| `git status --short` before and after | clean |

Not run: `npm test -- tests/view/game-saver.test.mjs`. The range changes no executable line, and
Prettier's parse shows the comments are well formed. The correction report has it passing, 17 of 17.
Running it here could also write build output into the worktree, which this review is not to touch.
Not run either: `npm test` with no argument (the cycle's gate).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-207 whole: its wording after the renumbering, for the comparison.
- `src/browser/view/app.ts`, the logout handler after `client.logout()`: for the inline comment's
  claim about a failed logout request.
- `git diff a2d89bf..f7d8234` for `app.ts` and `game-saver.ts` only: to confirm the code that the
  report-32 scratch test showed is unchanged.

## Searches not found or unclear

- None.
