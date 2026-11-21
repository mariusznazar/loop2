# Report — executor of slice 2 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Files and commits

- `tests/sim/saved-game.test.mjs`: +93 / -12, commit `bc386205` (base `730863c3`). Nothing else changed.

## What changed

- The document of version 9 (`DOCUMENT`) holds `contentRevision` on each program (program 1 at 0, program 3 at 4) and `madeAtMs` (1759900000000, before the save time). `HEADQUARTERS` holds one program of revision 1 and `madeAtMs` 0. The version stays 9; the header comment of the document now says why (version 9 was raised for the judgings and the counts, and no saved game state of version 9 exists anywhere since the change has not reached a server). The first run's `judgings` stay in the document and the state.
- The comment of the version-8 test names the two new fields among what version 8 lacks. The version-8 document is still refused as version (unchanged cases, passing).
- `CRAFTED` (refused as shape): the moment missing, null, fractional, text, NaN, infinite, beyond and below the safe integers; a program's revision missing, below 0, fractional, text, null, NaN, infinite, beyond the safe integers; a revision held in the content of a program, in the copy of a map run and in the program of an earning loop (content alone, D-442).
- Edges (admitted): moment at 0, below 0, the lowest and the highest safe integer, far ahead of the save time; program revisions both 0 and the highest safe integer.
- The new refusal cases and the existing sweep (`no value a document can hold ... throws`) also cover the new keys with hostile values at every place (the sweep passed).
- The case "a program whose number is not below the next program number" pushed a program with no revision, so it would have been refused for the missing revision and not for the number; it now carries `contentRevision: 0`.
- Quotations: the one `// decision: D-440` line (it quoted the old first sentence, "The saved game state holds ...") now quotes the first sentence as it stands. I added to the crafted test the D-386 sentence on the moment and revision, D-442's first sentence and D-442's sentence on the copy and the earning loop's program (each a prefix from the beginning of a sentence); to the edges test the D-386 sentence.

## Checks (each command and exit code)

- Before: `npm test -- tests/sim/saved-game.test.mjs` failed by design (20 cases; the document lacked the two fields), as the orchestrator said.
- After: `npm test -- tests/sim/saved-game.test.mjs` exit 0 (45 pass, 0 fail).
- `npm test -- tests/sim/saved-game-judgings.test.mjs` exit 0 (11 pass). It is slice 10's, untouched.
- `npm test -- tests/sim/content-revision.test.mjs` exit 0 (37 pass); `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (19 pass).
- `npx prettier --write tests/sim/saved-game.test.mjs` exit 0 (unchanged); `npx eslint tests/sim/saved-game.test.mjs` exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` exit 1 with 11 errors, none in `tests/sim/saved-game.test.mjs` (the one it had at line 2595 is gone). The remaining errors are in files I did not change: `tests/sim/judging-record.test.mjs`, `tests/sim/previous-programs.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`, `tests/view/previous-save.test.mjs`.
- `python -B .the-way/elements/common/foundation_check.py` (full) exit 1 with 12 errors: the same 11 plus `foundations/invariants.md:1472` (`judging-cache-reading` has no test citing it yet). Its report names no stale quotation and no error of `tests/sim/saved-game.test.mjs`. The log is `reports/slice-c1-02-foundation-check.log`.
- Not run: the full gate (`npm test` with no file), as the handoff says.

## Own-work check

Requirement: the new refusal cases of the trust boundary `save-version` really catch a load that reads either new field loosely (spec Decision 10, third item; slice *Checks*: seen failing with the reading of each field taken out of a scratch copy of the load).

Check: a scratch copy of `dist/` with `saved-game.js` patched, run with `node --test --test-name-pattern "crafted document of the current version"` and, for the edge, the edges test. Results (each run stops at its first failing case):

| Patch to the copy of the load | Result | Case that failed |
|---|---|---|
| none (baseline) | pass 1, fail 0 | none |
| `contentRevision: read.contentRevision` (reading taken out) | fail | "a content revision below 0" |
| `contentRevision: integer(...)` (no minimum 0) | fail | "a content revision below 0" |
| `madeAtMs: read.madeAtMs` (reading taken out) | fail | "a moment of the game of none" |
| `madeAtMs: finite(...)` (not a whole number) | fail | "a fractional moment of the game" |
| `madeAtMs: count(...)` (minimum 0 added) | fail (edges test) | the edges: moment below 0 |

The copy was removed; the real `src/` was never edited.

## Reaches beyond the handoff

- `guidelines/coding-saved-game.md` was read whole (it is named); `.the-way/task-cycle/change/slice.md` was read, since `SKILL.md` names it for this variant. D-442, D-386, D-206 and D-440 read whole (D-440, D-386, D-206 by their headings; D-442 first paragraphs only for quotations). `tests/sim/content-revision.test.mjs:340-428` read to see what it covers.
- `scripts/test.py` grepped to learn that `npm test` builds `dist/` first (so my scratch copy of `dist/` was a faithful copy of the build).

## Which load cases are kept where (overlap with `tests/sim/content-revision.test.mjs`)

`content-revision.test.mjs:364-428` already holds load cases of both fields: the moment admitted at 0, -5, a present moment and the highest safe integer and refused as 1.5, 2**53, text, null, missing; the revision admitted at 0, 1, 3 and the highest safe integer and refused as -1, 1.5, 2**53, text, null, missing. I kept the refusal and edge cases in this file too, and did not remove those there. Why: the plan and Decision 10 name this file's table as the trust boundary's cases, built from the full document of the version, and the slice's check ("seen failing with the reading taken out") is of this table; the overlap is the values, the documents differ (the full document with a map run, loops and a report, and the sweep). What this file adds that the other has not: NaN and infinity for each field, the moment below the lowest safe integer, a revision held in a program's content, in the copy and in an earning loop's program, and the edge of both programs at revision 0 and at the highest.

## Choices

- Revision values 0 and 4 for the two programs, 1 for `HEADQUARTERS`'s one: hand-written fixtures with no source; any values would do. Cost if wrong: none.
- D-440 quotation: I kept the first sentence in full as it stands (it says the game remembers the judging in the browser that made it) over the judging cases that are still in the document, since its words on the twelve results, the equipment and no cause or minute still describe those cases. The sentence says the browser, not the saved game state, holds judgings, so the file's judging cases and this quotation disagree in meaning until slice 10 removes the judging cases; the quotation matches word for word and the foundation check shows no error. Alternative rejected: quoting none for them (the check wants no stale quotation, but a test of judgings without a decision line lacks its reason). Cost if wrong: slice 10 removes the line with the cases.

## Problems observed

- The handoff names the directory for working copies as `.runs/executor-2/`; the dispatch message named `.runs/executor-c1-2/`. I used `.runs/executor-2/` (the handoff's), nothing stood in the other.
- `foundations/invariants.md:1472` `judging-cache-reading` is cited by no test: it is not mine (a later slice's).

## Working copies

- `.runs/executor-2/scratch/` (a copy of `dist/`, three test files and `package.json`, with the patched load): removed with `rm -rf` by its full path. The logs I kept in `.runs/executor-2/` were removed too, except the foundation check log, which stands in `reports/slice-c1-02-foundation-check.log`. None remain.

## Unread material

none (the whole of `tests/sim/saved-game.test.mjs`, `src/browser/sim/saved-game.ts`, `guidelines/coding-saved-game.md`, the handoff and `SKILL.md` were read; `guidelines/coding.md`, `guidelines/testing.md`, D-213, D-369, the invariant `save-version`'s sentence were read in part or by the passages the handoff gave: I did not reopen `guidelines/coding.md`, `guidelines/testing.md`, D-213 (`decisions.md:671-715`) and D-369 (`decisions.md:10760-10782`) whole, since the file's existing quotations of them pass the check and my change quotes neither anew. `src/browser/sim/types.ts` was read at the ranges of `SavedProgram` and `GameState` only. The frozen task passages and the foundation rows were taken from the handoff's copies and the entries D-440, D-386, D-206, D-442 read in the worktree.)

## Searches not found or unclear

none
