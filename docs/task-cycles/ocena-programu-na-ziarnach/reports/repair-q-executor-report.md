# Executor report — repair of the quotations of decisions, slices 3 and 4

**Status:** done

## Commits

- `f93df2f6` — `test: :white_check_mark: quote the decisions D-439, D-440, D-22, D-179, D-213 and D-165 word for word …`
- Files changed: `tests/sim/judging.test.mjs` (6 lines changed), `tests/sim/saved-game-judgings.test.mjs` (8 lines changed); 14 insertions, 14 deletions, every changed line a comment line `// decision:`. No assertion, expected value, test title or code changed. Committed by path.

## Checks (command, exit code)

| Check | Before | After |
|---|---|---|
| `npm test -- tests/sim/judging.test.mjs` | 0 | 0 |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | 0 | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1; 14 errors in the two files plus 7 D-243 errors | 1; 0 errors in the two files; the 7 D-243 errors stay (`tests/sim/loop.test.mjs:237,304`, `tests/view/account-screen.test.mjs:2683,2807,2975`, `tests/view/maps-screen.test.mjs:494,700`), owned by other slices |

The full gate was not run (handoff: no full gate).

## What was repaired

How the check reads a line (`.the-way/elements/common/foundation_text.py`, `binding` and `begins_sentence`): the binding sentences are only the paragraphs before the entry's first field (`- **Scope:**`), so the `Verification` list (`complies:` / `violates:`) and *Rationale* are no source; the quotation must begin a sentence of such a paragraph (at the paragraph start or after `. `).

Each quotation is now one whole sentence, from its beginning, cut at its end:

- `judging.test.mjs:154`, `:199`, `:233` (D-439): the first sentence ("The game runs a program on twelve fixed seeds … 4000 to start"). It holds the cap in the game's data, the twelve fixed seeds, "undecided where the program has neither solved the map nor died within a cap" — the requirement of each of the three cases. The quotation of `:233` had stood in *Rationale*, of `:199` in `Verification`.
- `:244` (D-22): "A judging of a program (D-439) runs on the twelve fixed seeds of its map, the same at each judging, and takes no new seed, each of its twelve runs drawing from its own seed as a map run does" (it had quoted `Verification`).
- `:258` (D-179): "Reality cuts the trip plan down and never up: … as many go in from the top of the list as fit" (the former quotation began mid-sentence).
- `:315` (D-439): "A judging discovers nothing: it runs with what the player has discovered, writes nothing into the Understanding and adds no rule to the program" (it had quoted `Verification`). The case also rests on D-439's sentence "Such a judging is no map run …" and D-249, both left as they stood.
- `saved-game-judgings.test.mjs:115`, `:261`, `:308` (D-440): the first sentence ("The saved game state holds the last judging of each character, program and map: the twelve results … (D-329)"). It names the twelve results of three kinds, the equipment taken, and that the cause and the minute are kept only in the shown result — the requirement of the three cases.
- `:136`, `:351`, `:472`, `:500` (D-213): the sentence "Saved-game code turns a game state into the saved document … no value a document can hold making it throw, and changing nothing passed to it" — refusal naming why, no throw, nothing passed changed. The quotations of `:351` and `:500` had stood in `Verification`.
- `:228` (D-165): "Each program of the player carries a number … a deleted program's number included".

A tool that wrote the lines: `.runs/repair-q/fix.py` took each sentence from `foundations/decisions.md` by script, so the quotation is word for word; the files keep their LF endings (`git ls-files --eol`: `i/lf w/lf`).

## Own-work check

Requirement most likely missed: a quotation that the check accepts but that is no sentence "that belongs to the case's requirement". Check: the foundation check run after the change shows no error for the two files (run above), and each case's requirement was read against its sentence (list above). Showed: 0 errors in the two files; the 7 expected D-243 errors remain.

## Choices

- Whole-sentence quotations, long, in place of short fragments: a fragment must begin a sentence, and the one sentence that holds the requirement is the safe unit. The way rejected: a short opening of the sentence (for D-440, "The saved game state holds the last judging of each character, program and map") — it would drop the words the case rests on. Cost if wrong: none for behaviour; a reviewer may prefer a shorter line.
- The same sentence is quoted for several cases (D-439 three times, D-440 three times, D-213 four times), since each decision holds one sentence that carries all of them.

## Reaches beyond the dispatch

- `.the-way/elements/common/foundation_check.py` (`check_decision_line`) and `.the-way/elements/common/foundation_text.py` (`binding`, `begins_sentence`): read to learn what a "binding sentence" is, because the handoff described it loosely ("first paragraphs before *Rationale*"); in fact the check ends at the first field line, so `Verification` is no binding text.
- `guidelines/testing.md` (read whole, in two parts): holds no rule for the line `decision:` beyond the sections on the source of an expected value.

## Working copies

`.runs/repair-q/` (logs of the before and after runs, `fix.py`, `sentences.txt`) stood in the task's worktree; removed before return (see the list of removal below).

## Unread material

- `.the-way/task-cycle/change/slice.md` (named by the method's table for the variant "a slice, or the retry of a slice"): not read; the handoff gave the goal, boundary and files, and nothing of the plan or of a failed executor's report was involved.
- Decisions D-439, D-440, D-22, D-179, D-213, D-165: read whole for D-439, D-440, D-22 (first paragraphs and fields), D-179, D-213, D-165 up to their *Rationale*/*Rejected* (D-22 and D-213 not read to the end of their *Verification*).

## Searches not found or unclear

- The rule for the line `decision:` in `guidelines/testing.md`: not found there; found in the check's code instead (see Reaches).
- The handoff's definition of the binding sentences ("first paragraphs before *Rationale*") differs from the check's (before the first field): unclear, resolved by the code.
