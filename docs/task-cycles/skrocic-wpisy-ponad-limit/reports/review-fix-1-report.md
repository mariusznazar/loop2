PASS d5e02cd08f82cda7a07f0d4342f5b40c58e3cee0

# Review of fix 1 — skrocic-wpisy-ponad-limit

Range: `3e5018a8..d5e02cd0` (one commit `d5e02cd0`, author address `mariusznn@gmail.com`;
`git rev-parse HEAD` gives `d5e02cd08f82cda7a07f0d4342f5b40c58e3cee0`; working tree clean).
Variant: the fix of earlier findings. The findings file `reports/fix-1-findings.md` holds three
Minor findings alone, so only a new Critical or Important finding in the fix diff could fail this
review.

## Findings of the findings file

1. **D-115 *Relations* (`foundations/decisions.md:619`) — fixed.** The line now reads
   `derives from D-28 · derives from D-107 · derives from D-112 · derives from D-435`, the wording
   the finding gave. The word diff of `foundations/` is the single insertion
   `D-112 · derives from` in that line; nothing else of the log changed. Foundation check: 0 errors.
3. **`src/server/account-backup.ts:21`, comment of 85 columns — fixed.** Lines 21–23 are rewrapped.
   No line of the comment from line 18 to line 26 is over 80 columns now. The words of lines 18–23
   at `3e5018a8` and `d5e02cd0`, comment marks stripped and whitespace joined, are identical.
   Changed lines that are not `//` comments: 0. Prettier passes. The file still has lines over 80
   columns at 13, 46, 48, 130, 131 and 140; the fix diff did not touch them, and they stand as they
   did at the base of the task.
4. **Meaning sentence of D-435 (author report, "Foundation entries written") — fixed.** I compared
   the new English and Polish wordings (fix report, finding 4) with the nine binding sentences of
   D-435 at the head:
   - Each claim stands in a sentence of the entry:
     - what the writes read: blocked state (2, 4, 5), version and revision (4), privilege (5), role (8);
     - blocking, a password reset by a link and the reset of the game changing sessions, links and
       saves in the same transaction (2, 3, 5);
     - a session write for a blocked account (2) or for a replaced hash (3) storing nothing;
     - the three outcomes of the privilege and role writes, and the role write ending no session and
       stopping no link (6, 7);
     - pruning at startup and periodically (1);
     - blocking keeping the saved game state and the previous save (9).
   - Nothing in it goes beyond the entry.
   - The Polish wording says the same as the English.
   - Being a summary, it leaves some details out; Minor note below.
   - The entry itself is unchanged (word diff of `foundations/` above).

## New findings in the fix diff

Critical: none. Important: none.

Minor (does not block; at the reader's choice):
- **Fix report, finding 4, new meaning sentence of D-435.**
  - The list of what a write reads leaves out the one input of the password reset: "whether the
    link still works" (sentence 3).
  - "expired sessions and emailed links are pruned" leaves out that a link is pruned only once it is
    expired and also older than one hour (sentence 1). That condition is what keeps links counting
    against D-105.
  - Adding "whether the link still works" to the list after "the role", and "links once also an hour
    old" to the pruning clause, would close both.
  - This is not in any file of the commits.

## Declined to judge

- The lines over 80 columns elsewhere in `src/server/account-backup.ts` (13, 46, 48, 130, 131, 140)
  — outside the fix diff and outside the task.

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| fix diff | `git diff 3e5018a8..d5e02cd0`, `git diff --word-diff=porcelain 3e5018a8..d5e02cd0 -- foundations` | two files, +4 −4; in `foundations/` only the insertion in D-115 *Relations* |
| comment words unchanged | `diff` of lines 18–23 of `src/server/account-backup.ts` at both commits, comment marks stripped and whitespace joined | identical |
| comment lines only | `git diff -U0 3e5018a8..d5e02cd0 -- src`, changed lines not starting with `//` | 0 |
| width | `awk 'length($0)>80' src/server/account-backup.ts` | none in lines 18–26 (others listed above, untouched) |
| foundation check, test citations included | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check src/server/account-backup.ts` | 0 |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0: 0 error, 146 warn, 7 info (same counts as at `3e5018a8`) |

Not run: `npm test` (the orchestrator's, per handoff); no node test, since only a comment and one
field of the log changed.

## Reach beyond the dispatch

`.the-way/task-cycle/review/fix.md`, whole, as the method names it for this variant. Nothing else.

## Working copies

`.runs/review-fix-1/` in the task's worktree held the outputs of the foundation check and the
instruction check. It was removed before return. Remainder: none.

## Unread material

**Decisions read whole for this review: 0 new.** I read D-115 and D-435 whole in the review of the
whole change, and this review rechecked their changed line and their binding sentences against the
head. The handoff and the findings file were read whole, and so was the fix report. Nothing named
by the dispatch stayed unread.

## Searches not found or unclear

none
