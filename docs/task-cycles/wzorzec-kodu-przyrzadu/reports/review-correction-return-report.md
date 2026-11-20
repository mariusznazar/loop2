PASS 5bc3a85ff8532a7df2470b6f7fdeff62330c676a

# Review of the return step after correction 1 — `wzorzec-kodu-przyrzadu`

Range: `a44a0fd0` to `5bc3a85f` (`git rev-parse HEAD` = `5bc3a85ff8532a7df2470b6f7fdeff62330c676a`, the head given). `git log a44a0fd0..5bc3a85f` gives one commit, `5bc3a85f`, which changes one file, `guidelines/coding-balance-instrument.md`, in the rule "Zegar i losowość" (`:114-120`). `.the-way` is at `19e5774a`, equal to the gitlink. I read the diff whole.

Counts: 0 blocking; 1 Minor finding, within the task; 0 out of scope.

## What the range does and how it was judged

The commit adds one clause to the rule's list of what the test leaves to the reviewer: "ani `Math`, `Date` albo `performance` wziętych jako wartość w miejscu, którego test nie czyta (po `||`, `&&`, `...` albo `{`, jak w `{ Math }`)". The rule's fields, its *Good* and *Bad*, its first sentence and its reason sentence stay as they were.

- **Against the test's docstring** (`tests/invariants/test_balance_instrument_repeatability.py:8-43`). The rule does not claim that the test misses a form it reads. My probes show that every form the new clause names is left unflagged: `b || Math`, `b && Date`, `{ ...Math }`, `[...Math]`, `{ Math }` alone and `f({ Date })`. The neighbouring forms that end in a character the pattern reads are flagged, as the clause implies: `m ||= Math`, `a ?? Math` and `b ? Math : null`. The other classes in the list still match "Does NOT cover": a generator from scratch, a name built at run time, an object handed in from outside the file, and a method no form names. One class the docstring names is not in the clause (Minor 1).
- **Against the task and the invariant.** Row 5 of *Settlements to record*, *To do* 3 fourth bullet and the answer to question 6 ask for a rule that the instrument reads no system clock and draws from no source other than the seed of a measurement, with the invariant, *Decision* `none` and one sentence of reason. The answer to question 6 also names what the test does not catch. The rule still says this. The invariant `balance-instrument-repeatability` (`foundations/invariants.md:1458-1466`) is unchanged, and the rule restates it neither more broadly nor more narrowly. The clause concerns the test's reach and does not concern the invariant's sentence.
- **Against `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`.** The *Decision* is `none` and the reason stays one sentence ("Powód: pomiar, … od zmiany gry."). The clause adds no rationale, no rejected option, no decision and no value of a configuration file. It also lists no state of the product's code: it says what the reviewer is to look for, in the form the list already had before the range, which the review of correction 1 asked for (its Minor 2). The field names stay in English and the text is in Polish, as the rest of the file is.
- **Language and form.** The clause is in Polish and grammatical in the negated series ("Test nie łapie … ani … wziętych …, ani metody …"). Code names are in backticks, and the lines wrap like the rest of the file. `git diff --check` is clean.
- **Author's report claims.** The report says the rule was the one entry that no longer matched and that the invariant, the part sentence of `balance-tools` (`foundations/part_map.md:129`), D-437, D-429, D-427 and D-351 still match. I checked each claim against the entries and found it true. Its claim that "the other classes in the list still match the docstring" is true too. It reports the new clause as complete, but the clause is not complete (Minor 1). Nothing in the range touches `balance/`, a test, or a foundation entry. No invariant test was changed.

## Findings

### Minor 1 (within the task) — the rule's new clause leaves out the docstring's class of a name standing before an operator or a closing bracket the pattern does not read

`guidelines/coding-balance-instrument.md:117-118`: the parentheses list only the places *before* the name that the pattern does not read: "po `||`, `&&`, `...` albo `{`". The docstring's "Does NOT cover" (`tests/invariants/test_balance_instrument_repeatability.py:40-42`) names a second class as well: "or before an operator or a closing bracket other than those listed". Here the name stands after a character the pattern reads, but the character after the name is not one the pattern reads, so the name is not flagged. My probe shows this: `const m = Math || fallback; m.random()`, `const m = Date ?? null; m.now()` and `const m = (Math || x);` are not flagged (`reports/review-correction-return-probe-result.txt`, lines 10–12).

Why it matters: the parentheses read as a list of places. A reviewer who reads only the rule sees `= Math || fallback` start with `=`, which is not one of the four listed places, and takes it as covered by the test, though the test misses it. This is the gap the range set out to close (the review of correction 1, Minor 2: "a reviewer who reads the rule and not the test is not told to look there"), and half of it remains.

Why Minor: the forms are unusual, nothing in the instrument suggests them, and the general words "w miejscu, którego test nie czyta" still cover them for a careful reader. The rule is a guideline, not a foundation entry, so WAY-263 does not apply. A fix is one more phrase in the parentheses, for example "albo przed operatorem lub nawiasem zamykającym, którego test nie czyta, jak w `Math || x`".

## Declined to judge

none

## Checks

| Check | Command | Exit / result |
|---|---|---|
| Head, pin, range | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git log a44a0fd0..5bc3a85f`; `git diff a44a0fd0 5bc3a85f` | `5bc3a85f…`; `19e5774a` both; one commit; diff read whole |
| Whitespace | `git diff --check a44a0fd0..5bc3a85f` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 144 warn, 7 info`; no line names `guidelines/coding-balance-instrument.md`) |
| Test, repeatability | `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 (2 tests OK). The range changes no code; this run confirms the test the rule describes, at the head. |
| Scan probe | `python -B .runs/review-correction-return/probe.py` (calls `findings()` of the test on 15 made-up sources: the forms the new clause names, the docstring's "before an operator" forms and the neighbouring forms that are read) | 0; result kept as `reports/review-correction-return-probe-result.txt` |
| Decision index | `python -B .the-way/elements/common/decision_index.py --output .runs/review-correction-return/sections.md --sections .`, then `--output .runs/review-correction-return/index.md --section "Code rules, exemplars and static checks" --section "Balance measurement" --part balance-tools --part agent-workflow --decision D-437 --decision D-427 --decision D-429 --decision D-351 --decision D-28 .` | 0 and 0 |

Not run: the full `npm test`, which belongs to the cycle's own run and which the handoff excludes. I ran no ESLint, Prettier, Ruff or `tests/balance/`, because the range changes no code file.

## Foundation and guidelines selected

Parts: `agent-workflow` (the file `guidelines/coding-balance-instrument.md`) and `balance-tools` (the part the rule concerns). The decision index lists 30 decisions in full and 49 by heading. I went through the 49 headings, and none points to a bearing on one sentence of a guideline about the scan's blind spots. I read whole the invariant `balance-instrument-repeatability`, `instrument-game-agreement` and `balance-instrument-file-writes`, the two invariants on tracked files (`tracked-file-private-paths`, `tracked-file-private-names`), and the part-map entries of `balance-tools` and `agent-workflow`. Guideline files read whole: `guidelines/coding-balance-instrument.md`. I did not read `guidelines/coding.md`, because the range does not change its kind row and the handoff does not name it.

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md`, section "Reading the foundation", and `.the-way/product-guidelines/reading.md`: the handoff names them for my own selection.
- `foundations/invariants.md:1288-1307` (`tracked-file-private-paths`, `tracked-file-private-names`): their *Part* is `every`, and the range writes a tracked Markdown file. The clause holds no path and no private name.

## Working copies

- `.runs/review-correction-return/`: the probe script, its result, the two outputs of the decision index and the outputs of the checks. The probe result is kept beside this report as `reports/review-correction-return-probe-result.txt`. The directory is removed before I return. I made no worktree.

## Unread material

5 decisions of the index read whole: D-28, D-351, D-427, D-429, D-437. No decision that bears on the change stayed unread. Every guideline file I selected was read whole. I did not read `.the-way/task-cycle/review/fix.md`: this is the review of the return step's commits, which section 1 of the method reviews as section 2 gives, not of a fix.

## Searches not found or unclear

- The handoff gives the commit as "+5/-3". `git diff --stat a44a0fd0 5bc3a85f` gives "4 insertions(+), 2 deletions(-)". The commit and the file are the ones named, so I reviewed it as given.
