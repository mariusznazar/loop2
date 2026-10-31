# Report — fix of Slice 1's review, task `reset-hasla`

**Status:** `done`

Findings: `reports/09-slice1-fix-findings.md`. Reviewed head `25345f1`. Branch `task/reset-hasla`, no
push, `.the-way` not moved.

## Commit and files

`b9efe52` on `25345f1`: "docs: :memo: keep D-160 to the refusal of a password-reset link, as its row
gives".

| File | Added / removed lines |
|---|---|
| `foundations/decisions.md` | +1 / −1 |
| `tests/account-storage.test.mjs` | +1 / −1 (a comment; no assertion) |

## The blocking finding

**I-1. D-160 now says a player signs in to ask for a password-reset link — fixed.**

- The way out taken: **the clause is dropped.** The second sentence of D-160 is again, word for word,
  the base's: "A link that a block stopped stays stopped after the account is unblocked, and the
  player, signed in again, asks for a new confirmation message with „Wyślij ponownie”."
- Way rejected: separating the two ways, as the finding's example does. That keeps a sentence no row,
  To do or spec line gives D-160, and row 10 and the spec's table give it only that the refusal's
  sentence and place hold for a reset link too. Who asks for a link stands in D-96, D-109 and D-214,
  so nothing is lost. Cost if wrong: one clause to write again.
- The cause was mine: I added the clause in `e8755e8` beyond the row, and `06-foundation-report.md`
  did not name it among its choices.
- Comment at `tests/account-storage.test.mjs:1346`, now: "A link recorded after the unblock works and
  ends a session made since." It says what the lines below it do and nothing of signing in. The
  session the case stores stays, and no assertion changed. The comment at `:1171` stays: it speaks of
  a confirmation message, where the phrase is true.
- The check that shows it:
  - comparing the sentence with `git show 95de83b:foundations/decisions.md`, line 2898: identical;
  - a search of `foundations/decisions.md` for „Wyślij odnośnik”: only D-96, at `:1748`;
  - a search of `tests/account-storage.test.mjs` for "signed in again": only `:1171`.

The search of the foundation, as `the-way-record-decision` asks: no entry leaned on the clause.
`email-confirmation-link`, `unblock-restores-no-link` and `password-reset-link` derive from D-160, and
none says who asks for a link; D-96 and D-109 stay as they are. D-160's *Verification*, *Origin*, *Rationale* and *Rejected* did not
change, since they did not carry the clause.

**The request:** `tests/account-storage.test.mjs` cites invariants, so by the template it is an
invariant test of this change; this commit alters one comment in it and no assertion. Name it with the
others.

## Checks

| Command | Exit code and result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| `npm test -- tests/account-storage.test.mjs` | exit 0, tests 56, pass 56, fail 0, skipped 0 |

Both ran on the tree that was then committed. Not run: the full gate, as the dispatch gives.

Own-work check. The requirement this fix most likely misses: that dropping the clause leaves a stale
copy of it elsewhere. The check: a search of `foundations/`, `guidelines/`, `tests/`, `src/` and the
deploy skill for "signed in again", and of `06-foundation-report.md` for the clause. It showed one copy
in that report's Polish sentence of D-160, which the request takes its meaning from; see below.

## Reaches beyond the dispatch

- `06-foundation-report.md`, line 62: the Polish sentence of D-160 said "a po odblokowaniu gracz prosi o
  nowy odnośnik". Corrected to the entry's meaning, since the request is written from it. The file is
  under `.runs/`, so it is in no commit.
- `08-slice1-review-report.md`, its I-1, to see the finding as the reviewer wrote it.
- `guidelines/coding.md` and `guidelines/testing.md`, as `AGENTS.md` asks before changing a test.

## Searches not found or unclear

- `tests/account-storage.test.mjs` was read for lines 1-1396 of 2147, the size cap of the read: the
  case changed stands there whole, and the rest was not read for a comment's change. This is less than
  "every file you change, whole".
- Otherwise none.

## Not touched

The review's four Minor findings, as the dispatch gives.
