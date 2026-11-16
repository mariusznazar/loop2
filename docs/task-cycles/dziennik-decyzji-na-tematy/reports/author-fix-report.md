# Author fix report — Minor findings of the review of the whole change (PASS 3b5af51b)

**Status:** done

**Commit:** `6c146b51` on `task/dziennik-decyzji-na-tematy`, one file: `foundations/decisions.md` (19 lines added, 15 removed against `3b5af51b`). No entry text edited; section sentences untouched.

## Finding 1 — D-412 in the wrong section: fixed

D-412 moved from section 4 to section 2, "Code rules, exemplars and static checks", at the end of the section, which keeps the order of the log (it stood after D-394, the old last entry of section 2). Counts now: section 2 has 21 entries, section 4 has 16; the other 26 are as before; the sum is 408.

Check: `decision_index.py --sections` exit 0, "Sections: 28", entries per section in order 12, 21, 15, 16, 17, 10, 18, 11, 19, 16, 14, 21, 20, 18, 10, 11, 19, 11, 13, 12, 13, 14, 13, 11, 11, 17, 11, 14 (sum 408). The listing is at `reports/author-fix-sections.txt`.

## Finding 2 — four entries lost their second blank line: fixed

My claim in `reports/author-report.md` that all entries of the old log had a single blank line after them is withdrawn: D-10, D-13, D-15 and D-227 had two. The log is now rebuilt from the base `bea0abc1` with each entry block kept together with the blank lines that followed it in the base (the script, `reports/author-fix-build-sections.py`, asserts every block ends in a blank line and appends it untouched).

Checks, by script (`python -I`):
- Every one of the 408 entry blocks of the new file, with the blank lines that follow it up to the next heading, is equal to its block in the base: 0 blocks differ. D-10, D-13, D-15 and D-227 end in `\n\n\n` in both.
- Each entry is followed by a section heading, or by `## Withdrawn identifiers`, only where it ends a section: D-266, D-412, D-89, D-414, D-356, D-360, D-410, D-381, D-352, D-403, D-411, D-396, D-404, D-387, D-373, D-151, D-379, D-313, D-380, D-384, D-307, D-409, D-305, D-363, D-389, D-385, D-383 (the last entry of sections 1 to 27, in order) and D-372 (last entry of section 28, followed by `## Withdrawn identifiers`). In the base these entries were followed by the next entry. None of the four double-blank entries ends a section. The heading and sentence of the section after it is the only text that follows them where they differ from the base.
- The line count: the new file has 112 lines more than the base, equal to 28 sections times 4 lines (heading, blank, sentence, blank), so no blank line is lost. The withdrawn tail is equal to the base's.
- In each of the 28 sections the entries stand in their base order (0 out of order). Line endings LF (`git ls-files --eol`: `i/lf w/lf`).

## Checks (command, exit code)

- `python -B .the-way/elements/common/compare_log_entries.py .runs/author/before-decisions.md foundations/decisions.md` (before = `git show bea0abc1:foundations/decisions.md`) — exit 0, "Compared 408 entries … all the same byte for byte". No report.
- `python -B .the-way/elements/common/decision_index.py --sections --output .runs/author/sections.txt` — exit 0; 28 sections; sum 408.
- `python -B .the-way/elements/common/foundation_check.py` (full) — exit 0, `0 errors`.
- Count of entries: `grep -c '^### D-' foundations/decisions.md` gives 408; the script asserts 408 distinct numbers, each in one section.
- `npm test` not run, as the handoff says.

## Doubtful assignments, now

- D-412 — section 2 (alternative: 4). It is a check that keeps secrets out of what the repository holds; its nearest relatives D-33 and D-362 are in section 2.
- D-411 — section 11 (alternative: 7). Unchanged.
- D-414 — section 4 (no section fits well; alternative: 2). Unchanged. It remains nearest to the tools an agent works with.
- D-413 — section 4, fairly clear: it runs the one command. Unchanged.
- D-347 — section 5 (alternative: 11). Unchanged.
- D-215 — section 13 with D-214 (alternative: 26). Unchanged.
- D-307 stays in 21, D-409 in 22, D-362 in 2, D-190 in 14, D-214 in 13: as in `reports/author-report.md`.

Remark: section 4's sentence does not name CI, which D-413 and D-414 touch, and section 7's and 11's sentences do not name the owner's list of accounts; as before, the sentences are the human's and I did not touch them.

## Own-work check

Requirement most likely not met by this fix: "every entry keeps its block byte for byte, blank lines after it included, and the only added text is the 28 headings with their sentences". The check above (0 differing blocks, +112 lines = 28 x 4, `compare_log_entries.py` exit 0) shows it holds. The first run of the script passed; the build script for the fix was rewritten once before running after a shell edit of it broke its syntax (before it had written anything to the log).

## Reaches beyond the dispatch

None.

## Unread material

`reports/review-whole-report.md` and `reports/review-whole-index.md` not read (the findings file carried the evidence needed). `fix.md` and the two handoffs read whole.

## Searches not found or unclear

none

## Working copies

`.runs/author/` (the log of the base, the log of the reviewed commit, the build and check scripts, their outputs) was removed. Kept in `reports/`: `author-fix-build-sections.py` and `author-fix-sections.txt`. No remainder.
