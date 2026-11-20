# Author return report after correction 1 — `wzorzec-kodu-przyrzadu`

**Status:** `done`. One entry no longer matched the test and was corrected; one commit.

**Commit** (private email `mariusznn@gmail.com`; not pushed): `5bc3a85f` `docs: :pencil2: name in the rule of the clock and randomness the Math, Date or performance taken as a value in a place the test does not read among what the reviewer keeps`. It changes `guidelines/coding-balance-instrument.md` only.

## Entries compared with the code (at `a44a0fd0`) and what no longer matched

Compared with `tests/invariants/test_balance_instrument_repeatability.py` as the correction left it (the left- and right-hand forms of `CLOCK_OR_DRAW_AS_VALUE`, the docstring's "Reading", "Stricter than the sentence" and "Does NOT cover"):

- **Invariant `balance-instrument-repeatability`** (sentence "No file of code in `balance/` reads the system clock or draws a random number from any source other than the seed of its measurement"): unchanged by the correction and still true of the files of `balance/` (the first test of the file scans them and passes); the test is stricter than the sentence, which its docstring now says; *Part*, *Derives from*, *Method* match. No change.
- **Part sentence of `balance-tools`** ("…the tests that keep its instrument in agreement with the game, from writing a file outside its command line and from reading the clock or drawing outside the seed of a measurement"): still describes what the two tests keep; the correction narrows or widens none of it. No change. *Files* hold the three files, each present.
- **The rule "Zegar i losowość" of `guidelines/coding-balance-instrument.md`: no longer matched.** Its list of what the test leaves to the reviewer lacked the class the docstring's "Does NOT cover" now names: `Math`, `Date` or `performance` taken as a value in a place the pattern does not read (`b || Math`, `b && Date`, `[...Math]`, `{ Math }`). Corrected, in the same change and nothing more: the list now reads "…ani `Math`, `Date` albo `performance` wziętych jako wartość w miejscu, którego test nie czyta (po `||`, `&&`, `...` albo `{`, jak w `{ Math }`), ani metody, która czyta bieżącą chwilę, a żadna z jego postaci jej nie nazywa; te przypadki pilnuje recenzent." The rule's *Decision* (`none`), *Invariant*, *Good*, *Bad* and its reason sentence are unchanged. The other classes in the list (a generator from scratch, a name built at run time, an object handed in from outside the file, a method no form names) still match the docstring.
- **Minor 1 of the review of the correction** (a type annotation `d: Date` in a `.ts` file would be flagged): left, as the handoff says; a Minor finding of a correction's review is not fixed.
- **Not touched by the correction and still matching:** D-437 (the exemplar, the table of files), D-429 (its *Verification* and the invariant `balance-instrument-file-writes`), D-427, D-351, `instrument-game-agreement`, `cross-part-imports`; the part map of `balance-tools`, `agent-workflow` (claims `guidelines/**`) and `product-foundation` (claims `foundations/**`); the correction touched no `balance/` file, so the `check-map` comparison it ran (identical base against head for the three overlays) leaves the entries about the instrument's agreement with the game as they stood.

## Decisions written or changed
None in this step.

## Invariants written or changed
None in this step (`balance-instrument-repeatability`, written earlier, is unchanged).

## Environment facts
None.

## Glossary terms
None.

## Part-map changes
None in this step.

## Projected entries written whole or in part
None.

## Rows of *Settlements to record* written
None in this step; the rows were written in the earlier steps (row 1 → D-437; rows 2 and 3 → the rules "Liczba gry" and "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md`; row 4 → `balance-instrument-file-writes`; row 5 → `balance-instrument-repeatability`). The sentence added to the rule "Zegar i losowość" in this step is not a row and adds no rule: it says what the test of row 5's invariant does not read, as the rule's list already did for its other cases, and carries the human's accepted meaning of that rule (the rule says what the test misses; the reviewer keeps it).

## Checks (command, exit code), at head `5bc3a85f`

| Check | Command | Exit |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`, as before; no warning names the guidelines file) |

No test was run again: the commit changes only a Markdown file of guidelines.

## Unread material
None. I read the handoff whole and the review of the correction at its Minor findings and the line quoted for them; `.the-way/task-cycle/skill/return_step.md` I did not re-read this round (read whole in the earlier return step; this step writes no entry).

## Searches not found or unclear
None.

## Working copies
`.runs/author-correction-return/` of the worktree (`.runs/author-correction-return/`): `fc.txt` and `ci.txt`. Removed by `rm -r` of that path before I returned. No worktree or junction made this round.
