# Report - the fix of the whole-change review's findings (`make-change`, "the fix of a review's findings")

**Status:** done.

**Base:** `4caa290f732a83e8154b192a6673d6d97ac27448`. **Commits (branch `task/przyrzad-balansu`):**

- `a53f0f22` - I-1, M-1, M-5, M-6: the neutral label in the table, the key in `programs`, the tests, the skill.
- `314deced` - M-3 and M-4: the trace starts through the engine's `startOf`; three comments stop citing `instrument-game-agreement`.
- `73d19b04` - M-2: D-425.

## Files changed

| File | Added / removed |
|---|---|
| `balance/check-map.mjs` | row and cell carry `programLabel`, not the identifier; header comment |
| `balance/describe.mjs` | new `programLabels(registry)`; `describePrograms` heads each program `**P<n> <identifier>**` |
| `balance/cli.mjs` | `check-map` passes the label of the program's place in the whole reference list |
| `balance/engine.mjs` | `startOf` exported, also returns the `events` of the start |
| `balance/trace.mjs` | starts through `startOf`; five imports removed |
| `balance/loop.mjs`, `balance/overlay.mjs`, `balance/campaign.mjs` | comments only |
| `tests/balance/check-map.test.mjs`, `tests/balance/cli.test.mjs` | see the findings below |
| `.claude/skills/loop2-balance/SKILL.md`, `.agents/skills/loop2-balance/SKILL.md` | the two copies, byte identical |
| `foundations/decisions.md` | two phrases of D-425 |

## Answer to each finding

**I-1 - fixed, by way (a).** The `Program` column holds `P1`...`P23`, the program's number in the order of `REFERENCE_PROGRAMS`. The label is the position in the whole list, so `--programs` narrowing the rows does not renumber (`balance/cli.mjs`, `runCheckMap`: `programLabels(REFERENCE_PROGRAMS)[programId]`). The row object (`measureRow`) now takes `programLabel` and has no identifier at all, so the table cannot print one. The key is what `programs` prints: each program in the list is headed `**P4 forestBest** - ...` (`balance/describe.mjs`, `describePrograms`); the `--out DIR` files keep their names by identifier. The skill describes the label, the key and why (`.claude/skills/loop2-balance/SKILL.md`, step 3 and the `programs` row of the commands table).
- Choice and way rejected: (a) over (b) renaming the reference programs. (b) would touch 23 identifiers imported by `tests/sim`, the player descriptions in `balance/players/` and the skill, and would have to be kept free of rule content by every later program writer; a label closes the leak at the one place where the table is made, and is reversible by reverting the label argument. Cost if wrong: the agent must look the label up in `programs` to name a program to itself, and the identifier still states its rules to anyone who reads the programs file or the `--out` file names (the task accepted that, Question 4); a program whose number changes when a program is inserted into the middle of the list changes its label, so the key must be read from `programs` at the time of the check, which the skill says.
- Tests: `tests/balance/check-map.test.mjs`, the test "the table holds no text of a program's rules..." now asserts that none of `Object.keys(REFERENCE_PROGRAMS)` appears in the table (it asserted that the identifier appears) besides the old check of group, condition and action words; a new last test runs `runCommand("check-map")` narrowed to `forestDeepBest` on the wasteland overlay and asserts the cell is `P10` (position in the whole list, written as a literal) and no identifier is printed; `tests/balance/cli.test.mjs` asserts the heading `**P<n> <identifier>**` of each program in `describePrograms` and in the `programs` command (the number counted from the position in the list).
- D-428: unchanged and still true. Its binding sentence ("the table holds no condition, action or rule of any program") names neither the identifier nor the program's name, and with the label the table agrees with it. I did not write to the entry. One point the orchestrator may want: the lesson that an identifier carries rules is now held by the test and the skill, not by D-428; adding it to D-428's rationale is a decision of the entry, not made here.

**M-1 - fixed.** `tests/balance/check-map.test.mjs`, "a row of one map and one program with few seeds...": now `forestDeepBest` on `forestDeep`, the chest `{ stick: 8, berry: 7 }` written as a literal, and `assert.deepEqual(chestOf(forestDeepBest), chest)` ties the literal to the take list. Mutant (the row's sweep given `chest: {}` in `balance/check-map.mjs`): `npm test -- tests/balance/check-map.test.mjs` exit 1, 6 passed and 1 failed, the failing test is this case (`actual: 0, expected: 75`, the share solved); file restored byte for byte from a copy made before the mutation, `grep -c "chest: {}"` = 0, and the file then passed again, 7 of 7, exit 0.

**M-2 - fixed.** `foundations/decisions.md`, `### D-425`: "the balance instrument" added to the list of the binding sentence ("the application, the scripts, the tests, the balance instrument, the JavaScript of ...") and, for the two to agree, to the same list in the clause of *Verification* ("the limit on a function reaching the application, the scripts, the tests, the balance instrument and the agent-workflow directories ..."). Nothing else of the entry changed; the quoted prefix of the test's `decision:` line is untouched.

**M-3 - fixed.** `balance/engine.mjs`: `startOf` exported (with a doc comment), and it returns the `events` that `newMapRun` gives, which the trace reads and the engine ignores. `balance/trace.mjs` starts through it; the five imports it no longer needs are gone. The test of the trace compared with the engine's outcome and end minute (`tests/balance/trace.test.mjs`, 3 of 3) and the six agreement tests still pass; no new test, since the copy is gone, not a behaviour added.

**M-4 - fixed.** `balance/overlay.mjs` cites "glossary term overlay; D-18"; `balance/loop.mjs` and `balance/campaign.mjs` cite no entry for "copies no number of the game". `balance/engine.mjs` and `balance/trace.mjs` keep their citation, which is the true one (same seed, same end).

**M-5 - fixed.** The skill, step 3, now says every row runs with a new character's skills unless `--practice` or `--ranks` say otherwise, applying to all rows; that a program needing a branch reads near zero without it, with the known case (`P22`, the branch "Czysty płomień", 0 of 50 without it and 47 of 50 with `--ranks cleanFlame=1`, the figures of executor 8's report); and that the agent reruns such a program with `--ranks` and `--programs <identifier>` and tells the person its row was measured with the branch.

**M-6 - fixed.** The skill, step 4, now says the attempts' results go to the person as rows like the table's (share solved, median minutes, deaths by cause) under labels of their own (`A1`, `A2`...), never under the file's name or a word of what the attempt does; the programs themselves stay with the agent.

## Checks (command, exit code)

| Command | Exit |
|---|---|
| `npm test -- tests/balance/<file>.test.mjs` for agreement, campaign, check-map, cli, engine, loop, overlay, trace (one call each: pass 6, 11, 7, 20, 7, 5, 5, 3, fail 0) | 0 each |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance tests/sim` | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check balance tests/balance tests/sim` | 1 at first (`balance/trace.mjs` wrapped lines), `--write` on that file, then 0 |
| `node tests/quality/eslint-size-rules.mjs` (lines naming `balance/`: 0) | 0 (and no line names `balance/`; the tool may report code outside `balance/` that stood over a threshold before this change, which is not mine) |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0 |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, "0 error, 144 warn, 7 info" (warnings only; I did not compare them with the base) |
| mutant of M-1, `npm test -- tests/balance/check-map.test.mjs` | 1 (fails as intended), then 0 after the restore |

The one command (`npm test` with no argument) and the other tests of the repository were not run, as the handoff says. `tests/quality/test_function_and_file_size.py` was not run on its own; I ran its tool, `eslint-size-rules.mjs`, as above.

## Own-work check

The requirement most likely unmet: D-428 and the task's *Need*, that the person gets a table "bez tresci programow". Check: a test that builds a table through the real command (`runCommand("check-map")` on the wasteland overlay, one row) and asserts none of the 23 identifiers is in the printed text, and a unit check on `renderTable` with a row of `forestBest`; both pass. What it did not show: that a label cannot leak a rule through its position (the order of the list is a list of programs' identities and its meaning is held by the agent's key only). Also checked: the table's heading and the cells of the made-up rows hold `P1`/`P2`.

Mutation in the head: a cell that prints `row.programLabel` from a row whose label is the identifier cannot be built through `runCommand`, which takes the label from `programLabels`; a label counted in the narrowed list instead of the whole one is caught by the `P10` literal of the new test; a sweep that loses its chest is caught (above); a loop that loses its chest is caught by the test of the resurrection (`forestLoopWithStock`), not re-mutated here.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/fix.md`, the method's file for this variant (named by `SKILL.md` section 1): read whole.
- `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `elements/common/way_of_working.md`, `elements/common/rules.md` and `elements/decisions/template.md` lines 1-155 (the handoff named the decisions skill as the way to change D-425): read.
- `balance/describe.mjs`, `balance/engine.mjs`, `balance/trace.mjs`, `balance/campaign.mjs`, `balance/overlay.mjs`, `balance/loop.mjs`, `tests/balance/cli.test.mjs`, `tests/agent_workflow/test_loop2_balance_skill.py`, `tests/sim/reference-programs.mjs` (lines 355-375 and 615-645), `src/browser/sim/data/skills.ts` (lines 128-142, for the branch identifier `cleanFlame`), `.runs/task-cycles/przyrzad-balansu/reports/executor-8-report.md` (grep, line 105 for the 0 of 50 and 47 of 50), `guidelines/coding.md`, and the vault rule `git.md`: read for the changes above.
- `foundations/decisions.md` lines 11477-11520 (D-427, D-428, D-429) and 822-840 (D-425): read whole entries.

## Working copies

`.runs/fix-whole/` of this worktree held the copy of `balance/check-map.mjs` for the mutant and the logs of the checks. Removed before return (`ls .runs` shows none). No worktree, clone or screenshot made.

## Unread material

- `.runs/task-cycles/przyrzad-balansu/reports/review-whole-report.md`: not read; the findings file held every finding with its places and evidence, and I fixed from it and from the code.
- `.runs/task-cycles/przyrzad-balansu/task-frozen.md`, `plan.md`: not read; Choice 8 of the plan and the task's Questions were taken from the findings file's and the handoff's quotations.
- `elements/decisions/template.md` lines 156-311: not read (I read the part "Changing a decision", lines 172-188, by a search, and the rest of it up to line 155).
- `guidelines/testing.md`: not read whole; the changed tests keep the form of the existing ones.
- `foundations/decisions.md` D-29: not read; the finding's statement that the main clause of D-425 covers `balance/` was taken from the finding and the run of the size rule.

## Searches not found or unclear

- The skill `the-way-record-decision` gives the way to write a decision entry through a conversation with the human (questions, a show-and-accept step); for an edit of two phrases of D-425 that the handoff asked for, I made the edit directly in place, following "Changing a decision" of the template, and ran the foundation check. Whether the cycle wants it through the skill proper is unclear to me.
- A python heredoc replacement of `describePrograms` found zero matches though the text looked identical (cause not found: the text did match when I made the same edit with the editing tool); no file was written wrongly, and the diff shows the intended change.
- The 144 warnings of `check_instructions.py`: not compared with the base, so I do not say whether the change added any.
