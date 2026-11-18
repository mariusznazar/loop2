# Report - correction 1, the human's items 1 and 2 (`make-change`, "a correction for the human's remarks")

**Status:** done. **Base:** `2fe4fde09044d4508afd0520c6d7fbb7067a85c9`. **Commits** on `task/przyrzad-balansu`:

- `3abba636` - item 1 (N-1): the skill's text, both copies.
- `f3bc5fdf` - item 2 (N-2): the control file of the size test.

I touched no file of `foundations/` (D-425 included) and nothing for items 3, 4 and 5.

## Item 1 (N-1) - done

`.claude/skills/loop2-balance/SKILL.md`, step 3 of "Checking a map before a package is defined" (lines 110-115), and its byte-identical copy `.agents/skills/loop2-balance/SKILL.md` (`cmp` says identical; `test_loop2_balance_skill.py` passes). The sentence naming the branch "Czysty płomień", the program `P22`, the figures 0 of 50 and 47 of 50 and `--ranks cleanFlame=1` is gone. The text now says that a program needing a branch measures near zero without it; that where the comment of a program in `tests/sim/reference-programs.mjs` says it depends on a branch, the agent reruns it with `--ranks` and `--programs <identifier>`; and that the agent tells the person **only** that the row was measured with the skills the program needs, naming no branch, no skill and no rank. The example row of the table, which carried the fixed number `P22` (the reviewer's smaller point), now carries `P<n>`.

Search for other hints: `grep -n "P22\|Czysty\|cleanFlame"` on both copies and on `tests/agent_workflow/test_loop2_balance_skill.py` finds nothing. The other places that name a skill identifier are the flag description of `--practice` and `--ranks` (`smallItemGathering=80` and `keenEye=3`), which are examples of the flag's form and tie no program to a skill, so they stay; and step 4's example of a map that "asks for defeated wolf attacks" with a program that avoids the fights, which concerns what a map asks and is no branch of the skills. I left both.

## Item 2 (N-2) - done

`tests/quality/test_function_and_file_size.py`: one control file `balance/over-function.mjs` (a function `overBalanceFunction` of 201 lines) added to `CONTROL_FILES`, and its report `("balance/over-function.mjs", "Function 'overBalanceFunction' has too many lines (201). Maximum allowed is 200.")` added to `CONTROL_REPORTS`. No change to `tests/quality/eslint-size-rules.mjs`.

- Passing: `npm test -- tests/quality/test_function_and_file_size.py` exit 0 (`.x`, "OK (expected failures=1)"; the expected failure is the old marked case of the real repository's code).
- Failing: I removed `balance` from `eslint.config.mjs` at its three places (the `directories` list, the pattern `"balance/**/*"` of the second list and the `balance/**/*.${extensions}` pattern of the node globals; the size run takes every pattern that any entry gives to `files`, so removing the first alone would not have reached it). The same command ended with exit 1: `FAIL: test_control_the_script_reports_what_stands_over_a_threshold_and_nothing_else`, "Lists differ", the missing item `('balance/over-function.mjs', "Function 'ov...')`. The file was restored from a copy made before, `cmp` says identical, `git status` shows no change to it, and the test then passed.
- Ruff on the test file: `.runs/quality-venv/Scripts/ruff.exe check tests/quality/test_function_and_file_size.py` exit 0.

**For the return step (D-425's *Verification*):** the test is `tests/quality/test_function_and_file_size.py`, class `FunctionAndFileSize`, method `test_control_the_script_reports_what_stands_over_a_threshold_and_nothing_else` (the control case). The clause that now describes it: the limit on a function reaching the application, the scripts, the tests, **the balance instrument** and the agent-workflow directories the linter of D-29 reaches, shown by a planted function of 201 lines under `balance/` that the size run must report. What it holds is the limit on a function only. The limit on a file does not reach the instrument's directory in a test of its own (the planted file in `scripts/` and `src/` hold it for other directories); if the entry's clause says that the limit on a file reaches the instrument's code, a second planted file of 801 lines under `balance/` would be needed, which I did not add since the remark asked for one file.

## Checks (command, exit code)

| Command | Exit |
|---|---|
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 (after the change); 1 with `balance` removed from `eslint.config.mjs`, restored |
| `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0 |
| `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, "0 error, 144 warn, 7 info" (warnings only; not compared with the base) |
| ruff on `tests/quality/test_function_and_file_size.py` | 0 |

Prettier check: not run on what I changed, since I changed a Python file and two Markdown files and the Prettier scope of the repository is the TypeScript and JavaScript files. The full gate was not run.

## Own-work check

The requirement most likely unmet: the person learns no branch, skill or rank from the skill's text. Check: `grep` of both copies and of the skill's test for `P22`, `Czysty`, `cleanFlame` (nothing), and a reading of step 3 for any sentence that a program needs a named skill (none; the only mention is that the comment of a program in a file the agent reads may say so, with the instruction to tell the person nothing of it). For item 2 the check is the failing run above, which shows the test fails for the break it is meant to catch.

## Reaches beyond the dispatch

- `.runs/task-cycles/przyrzad-balansu/reports/review-fix-report.md`: read lines 34-55 (N-1, N-2, N-3) as the handoff names; the rest of that report not read.
- `tests/quality/eslint-size-rules.mjs` and `eslint.config.mjs` (lines 5-25 and 100-125, and a grep for `balance`): read, to know what the size run takes from the configuration and what the mutant had to remove.
- `guidelines/testing.md`: lines 1-214 read; the rest of the file (497 lines) not read, a grep for the size test's name found no line of it there.

## Working copies

`.runs/correction-1/` of this worktree held the copy of `eslint.config.mjs` for the mutant and the logs of the runs. Removed before return (`ls .runs` shows no such directory). No worktree, clone or screenshot made.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`: read whole earlier in this session; the variant's file for a correction is a row of the method's table that carries no separate file, so none was read.
- `.runs/task-cycles/przyrzad-balansu/reports/review-fix-report.md`: only lines 34-55 (and the grep lines before them); the other sections not read.
- `guidelines/testing.md`: lines 215-497 not read (see above).
- N-3 (D-425 edited without the decisions skill): not mine; the return step takes it, as the handoff says.

## Searches not found or unclear

- A test of the limit on a file for the instrument's directory: not found, and not added (see item 2).
