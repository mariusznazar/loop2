PASS 2c6b28b8727f4f52e0b6ee06430f0392b6a54c7e

# Review of the fix — return step, cycle `ognisko-i-jedzenie`

Fix range `105e4b9a27ba495bbc1de5da6bf33fb130659aee..2c6b28b8727f4f52e0b6ee06430f0392b6a54c7e`, one
commit (2c6b28b), one file (`foundations/glossary.md`, 2 lines changed). `git rev-parse HEAD` is the
head given. I read the findings file `26-return-fix-findings.md` and the fix report
`26-return-fix-report.md`.

Blocking: 0. Minor: 0. Out of scope: 0.

## Findings of the findings file

- **I-1 — the glossary term `extinguished campfire` did not open with "In the MVP": fixed.** At the
  head the entry reads "In the MVP, an extinguished campfire is a campfire standing on its tile with
  no minutes of burning left, whether it has burnt out or has not been lit yet." This is the wording
  the finding recommended. It opens the way the round's rule asks, and the way `map run restart`
  does. The meaning has not changed: only the opening phrase was added, and the rest of the
  sentence and *Not: none* are the same. The definition holds no word that excludes the
  alternative. It still matches the code: a crafted campfire gets `minutesLeft: 0`, a burnt-out
  campfire stays at 0, and the tile's row reads „wygasłe” at 0. The fix author did not contest the
  finding.

## What the fix itself broke

Nothing. The diff touches only this entry. The word's one use outside the glossary is D-61's
*Verification* (`foundations/decisions.md:1133`), which is itself an MVP decision and reads the
same as before. The foundation check passes.

## Declined to judge

- Minor findings M-1 to M-3 of the earlier review. They are not in the findings file, so they do
  not reopen this review.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `2c6b28b8727f4f52e0b6ee06430f0392b6a54c7e`, the head given |
| `git diff 105e4b9..2c6b28b` | one entry of `foundations/glossary.md`, 2 lines |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| Search for "extinguished campfire" in `foundations/`, `src/` and `tests/` | the glossary entry and D-61's *Verification* only |

Not run: the full `npm test`, which is the cycle's own run. No test reads this entry.

## Reaches beyond the dispatch

- D-61's *Verification* line, found by the search: the word's one use outside the glossary.
