PASS b9efe52b106ddbb7a2f0cec8fc1ab357ee967246

# Review of the fix — Slice 1, task `reset-hasla`

Range `25345f1..b9efe52`, one commit. `git rev-parse HEAD` is `b9efe52`, the head given. `.the-way` at
`a8dfe8a`, not moved. Bound by `reports/09-slice1-fix-findings.md`, as `.the-way/task-cycle/review/fix.md`
gives. Counts: **0 blocking, 0 Minor, 0 out of scope.** M-1 to M-4 of the earlier review stand as
graded and are not part of this fix.

## The finding

### I-1. D-160 now says a player signs in to ask for a password-reset link — **fixed**

The defect no longer exists on the new head.

- **The clause is gone.** "or asks for a new password-reset link with „Wyślij odnośnik”" stands nowhere
  in `foundations/`. The last sentence of D-160, `foundations/decisions.md:2902`, is word for word the
  base's: the same string is found once in `git show 95de83b:foundations/decisions.md` and once at the
  head. "signed in again" now governs the confirmation message alone, where it is true.
- **What row 10 asks stayed.** The first sentence of D-160 still gives the refusal's sentence and place
  to a password-reset link. *Verification*, *Origin*, *Rationale* and *Rejected* are not in the diff, so
  `password-reset-link` keeps its link to D-160.
- **Who asks for a link stands in one place.** „Wyślij odnośnik” is found in `foundations/` and
  `guidelines/` only at D-96, `foundations/decisions.md:1748`, on the signed-out screen, with
  „Wyślij ponownie” as the search's positive control.
- **The echo is gone.** `tests/account-storage.test.mjs:1346` now reads "A link recorded after the
  unblock works and ends a session made since." The lines below it store a session, record a link,
  reset and find the session gone, so the comment says what they do. The case's session and assertions
  are unchanged, as the finding asked. Of the phrase in `tests/`, only `:1171` is left, the confirmation
  case, where it is true.

The dropped clause is the first of the two ways out the finding offered, and the fix report's reason
for it holds: no row, To do or spec line gives D-160 that clause. The author contested nothing.

## What the fix itself broke

Nothing. The diff is two lines in two files, one a sentence of an entry and one a comment; no assertion
and no product code changed.

Considered and set aside: D-160's last sentence opens with "A link", which covers both kinds, and ends
on the confirmation message alone, so it does not say how a player gets a new password-reset link. It
stands so at the base, D-96, D-109 and D-214 say it, and row 10 asks nothing more of D-160. No finding.

## Declined to judge

- The correction to `06-foundation-report.md:62`: a file under `.runs/`, in no commit, outside the range.
  Line 62 was read: it no longer holds the clause, and it says what D-160 now says.
- M-1 to M-4: not part of this fix, as the dispatch gives.

## Checks run

All in the reviewed worktree, read-only.

| Check | Result |
|---|---|
| `git diff --stat 25345f1..HEAD` | 2 files, +2 −2 |
| `grep -cF` of D-160's last sentence, in `git show 95de83b:foundations/decisions.md` and at the head | 1 hit each |
| `grep -rlF "asks for a new password-reset link" foundations` | 0 files |
| `grep -rnF "Wyślij odnośnik" foundations guidelines` | `foundations/decisions.md:1748` only |
| `grep -rnFi "signed in again" foundations guidelines tests src .agents` | D-160 at `:2902` and `tests/account-storage.test.mjs:1171`, the two where it is true |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore tests/account-storage.test.mjs` | exit 0 |
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs`, on the worktree's existing `dist/`, since `src/` is not in the range | exit 0, 56 pass, 0 fail |
| `git status --short` afterwards | empty; HEAD still `b9efe52` |

**Not run:** the full gate, as the dispatch gives. ESLint and the type check were not repeated: the
range changes one comment in a test file and no source file.

The author's report holds: `foundation_check.py` exit 0, 56 of 56, and the three searches it names
match what was found above. Its note that it read `tests/account-storage.test.mjs` only up to line 1396
does not touch this change, which stands at `:1346`.

## Reaches beyond the dispatch

- `.runs/task-cycles/reset-hasla/reports/06-foundation-report.md:62`: to check the fix report's claim
  about it.
- `foundations/decisions.md:2904-2911`, D-160's fields, to confirm they still stand as the fix report
  says, and `:1748` through the search.

## Searches not found or unclear

none
