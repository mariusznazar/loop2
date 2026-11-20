**Status:** done

# Report - fix of the review of slice 1, task `zapas-i-wskrzeszenie`

## Commit and files

- Commit `f30dffb7` (after `3647bb19`), by path: `foundations/decisions.md` only, +4 / -2. No code, no test, no other foundation file.

## Findings

- **I-1 (D-242 *Rationale*, `foundations/decisions.md:8708`) - fixed, finding right.** The sentence now reads "so the clock of the returns, when a death during an absence starts it, runs from that death's own moment, and the uses left can cover a further death the same night, ...", the wording the review suggested. It no longer says every use spent returns from that death's moment, so it agrees with D-190's "a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs" and with `resurrection-renewal`. The sentence of the *Verification* pair of D-242 ("finds the uses of the resurrection as the completion had not yet returned one") says nothing about the clock and is unchanged.
- **I-2 (D-428, row 10 recorded in part) - fixed, finding right.** A second binding paragraph of D-428 now stands after its first paragraph, at `foundations/decisions.md:11691`: "The earning loop of the map check and the command of the loop start with the full number of uses of the resurrection, the switch `--no-resurrection` starts the loop with every use spent and the clock of the returns started at the start of the loop, after which the uses return as in the game, and the player of a campaign who waits for the resurrection before trying the next map tries when at least one use is left." One sentence, well within 300 words; the sum of D-428's binding sentences is well within 600. The change of the *Verification* of the first commit stays.
  - D-428's question is "What does the map check of the balance instrument print?"; the new paragraph speaks of the loop, the switch and the campaign player, a part of another question the entry answers (how the instrument counts the resurrection), which is the form the template allows ("a part of another question ... has its own paragraph"). It is the cycle's wording of row 10, so the entry's mark is `row 10`.
  - *Rationale* of D-428 gained one sentence: "The loop and the check measure the game as it is, with its full stock of uses, and the switch measures it without that protection; a player who waits for the resurrection waits only until one use is back, since one use protects one try." *Rejected* unchanged: the row's source keeps no way not chosen for this part, and a way I derive would not be allowed (WAY-134).
  - The `tests:` clause of D-428 still holds only the first part (the loop started with the full number of uses); the switch and the campaign player have no test yet, Slice 10 writes them and then adds the `decision:` lines and the clause. I added no pair of examples for the new paragraph: the review did not ask for one and the foundation check does not report the entry; Slice 10 or the return step may add one if wanted.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` -> exit 1, "86 errors", the same number as before the fix. Nothing in `foundations/` is an error: the 82 `tests/...` lines quote sentences slice 1 rewrote (a later slice's tests) and the 4 `foundations/invariants.md` lines are the "listed" lines of the invariants reworded by the first commit. No line names D-242 or D-428 newly: the quotations of D-242 and D-428 in tests were not reported before the fix and are not now (the sentences they quote are unchanged).
- Full gate and `check_instructions.py`: not run (not mine).

## Own-work check

- Requirement most likely not met: that the new D-428 paragraph and the D-242 sentence say what To do 3 / To do 5 and row 10 say, no more. Check: read the D-242 sentence against To do 3 ("śmierć przy zegarze już biegnącym go nie przestawia") - it speaks of the clock only when the death starts it; read the D-428 paragraph against row 10 and To do 5 ("`--no-resurrection` startuje bez żadnego - wszystkie użycia zużyte, zegar puszczony w chwili startu pętli - a potem użycia wracają jak w grze"; the player who waits "próbuje, gdy zostało choć jedno użycie"), the three parts all present. Result: both match; the paragraph does not say how the instrument keeps the clock (functions of the game, no count of its own), which To do 5 gives to the guidelines and the code, not to the foundation.
- The limits of the-way for a rewritten decision: counted by the foundation check, no error for D-428.

## Reach beyond the dispatch

None.

## Working copies

`.runs/slice-01-fix` was made empty and removed.

## Unread material

None beyond what the findings file and `.the-way/task-cycle/change/fix.md` ask: both read whole; D-242 and D-428 read whole (in the first pass).

## Searches not found or unclear

- `balance/cli.mjs` searched for the switch and a command of the loop (the header `loop`, the switch `--no-resurrection`, lines 64-94 and 347) to be sure "the command of the loop" names something that exists; the campaign player's `needResurrection` was not searched again (named in the handoff's context).
- Not unclear otherwise.
