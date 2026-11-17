# Correction 1 report: the human's remarks on the open request

**Status:** done. One commit, `0fb68aa6` (range `6bc246ab..0fb68aa6`). Changed: `tests/deploy/test_deploy_workflow.py` (+46 −21 together with the row), `guidelines/testing.md` (the one row of `.github/workflows/deploy.yml`). The test count of the file is 17 (was 16).

## Each remark as made, and how

**Item 1, the comment case: fixed.**
- The check of the scripts moved out of the case into a function of the text, `script_expressions(text)`: the lines of the workflow text that hold `${{` in the script of a `run:` key (the key's value and every line deeper than the key itself, `- run:` included, block, one line or continued). It reads the lines **whole**, comment mark included. `test_sha_reaches_the_script_only_through_env` calls it on the raw text of the file (`workflow_text()`).
- `code_lines()` is unchanged in what it gives (it now reads the file through `workflow_text()`), so every other case, and the `github.sha` line check and the `ssh` check of the same cases, read the comment-stripped lines as before. I did not need to show that any other case needs raw lines.
- The honest `deploy.yml` holds no expression in a comment inside a script: the case passes on it (`python -B scripts/test.py tests/deploy/test_deploy_workflow.py` exit 0, 17 tests). No question to return.

**Item 2, the mutation case: added, and marked.** `test_an_expression_after_a_comment_mark_in_a_script_is_refused` takes the text of the real workflow, asserts the function finds nothing in it (the control), then writes `${{ secrets.DEPLOY_HOST }}` after a comment mark (a) at the end of the command `umask 077` of the deployment script and (b) as a line that is only a comment, inside the same script, and asserts the function returns exactly that line each time. It calls the very function the real case calls, so the two cannot disagree.
- *Failing before the fix, passing after* (a copy of the test file whose function strips comments before reading, i.e. the logic as it was, `test_prefix_logic.py`, run with `python -B runner.py <test file> .github/workflows/deploy.yml <case>` from `.runs/author/`): the new case on the old logic exit **1** (`AssertionError`, the function returned `[]`/missing the `# …` line; the output line is `+ ['umask 077 # ${{ secrets.DEPLOY_HOST }}']`), on the new logic exit **0**; the sha case on the honest file exit 0 on both.
- The same with whole crafted workflows (the sha case, old logic / new logic; exit codes): expression after `#` at the end of a command: **0 / 1**; `echo "Deploying #${{ … }}"`: **0 / 1**; a comment-only line `# was ${{ … }}` in the script: **0 / 1**; an expression in a comment outside any script (honest): 0 / 0. So the real case now refuses the comment cases and still lets an honest comment through.
- *Marked `invariant: deploy-workflow-input`*: yes. Reason: the case checks a break of the invariant's own clause (an outside value reaching the script otherwise than as an environment variable) and shows it refused, on the real text of the workflow with one expression added; the repository marks such controls (`test_control_…` of the icon and package-layout invariants). The invariants template says a test fed made-up input is the method of a sentence about a check, not about data, so I name the other reading: if the human holds the case to be a test of the sentence about the *test's* check, it stays as a case with no mark; the real case carries the mark either way.

**Item 3, the smaller crafted ways: no test extension; the row says plainly what its cases do not read.** I checked each form against the test as it stands after item 1 (variants of `deploy.yml` from `make_forms.py`; the cell is the exit code of the case on the variant, 0 = the case passes, i.e. does not refuse):

| Form | `test_ssh_is_strict_and_batch` | `test_sha_reaches_the_script_only_through_env` | Whole file |
|---|---|---|---|
| D1 decoy `echo ssh -o StrictHostKeyChecking=yes …` before the call, the real call setting `no` first | 0 | 0 | 1: only `test_ssh_forwards_nothing_and_takes_only_the_sha` (not marked) fails |
| D2 `ssh -4o "StrictHostKeyChecking no" -i …` | 0 | 0 | 0 |
| D3 line starting with `ssh` (`ssh -V …`) before the call, the real call setting `no` first | 0 | 0 | 1: only `test_ssh_forwards_nothing_and_takes_only_the_sha` fails |
| D4 a script line `run: note`, then `echo ${{ github.event.head_commit.message }}` | 0 | 0 | 0 |
| D5 step as an inline mapping `- { name: Echo, run: 'echo ${{ … }}' }` | 0 | 0 | 0 |
| D6 quoted key `"run": echo ${{ … }}` | 0 | 0 | 0 |

Raw: `reports/correction-1-evidence/matrix_forms.txt`. The row now lists each of D1 to D6, the first with the example forms `echo ssh …` and `ssh -V …`, plus the anchor and the reusable workflow it already named, and says the reviewer of a later change to the file reads them by hand. The wording says the marked cases "pass" such a decoy (true) and does not claim the whole file passes (it does not, by an unmarked case that happens to notice a decoy holding `ssh ` before the call; I did not rely on that and did not name it as a protection).

**Item 4, the one sentence: fixed in the same edit.** The row said "w pierwszym wierszu pliku z wywołaniem `ssh`". It now says what the case takes: the text from the first place in the file where the word `ssh` and a space after it stand, to the end of the line, lines ending in a backslash joined and comments cut; that place need not be a call, and `test_one_ssh_call` counts only lines holding `ssh` and `-i`. (The pattern is `(?<![\w./-])ssh\s[^\n]*` over the joined, comment-stripped text.)

**Item 5, let through, no change:** M-4, m-2, m-3, n-3, N-3 untouched. The accepted items 3 to 8 of the description ask for nothing. The row's other clauses (the three option forms, the first value, `BatchMode` apart from the rule, "tekst pliku") are as before.

## Checks (command, exit)

- `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`: exit 0, 17 tests.
- `python -B .the-way/elements/common/foundation_check.py` after the commit, no switch: exit 0, `0 errors` (no `listed:` line).
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 144 warn, 7 info` (was 147 at the last report; none of the warnings names the row I changed; I did not trace why the count moved, a guess: the removal of the cycle record's files from the tree).
- Ruff on the changed Python file: not run, not installed on this computer.
- `npm test`: not run, as ordered.
- Own-work check: the requirement most likely missed is "the case reads script lines whole without refusing the honest file or the neighbouring cases": the honest file passes the whole file (17 tests, exit 0) and an expression in a comment outside any script passes (0), while the three comment variants fail the case (1). A second one, "the mutation case fails on the logic before the fix": shown above (exit 1 before, 0 after). My edit of the test through a Python heredoc wrote real newlines into three string literals (the escape hazard of the notes on scripts); the file did not compile, I corrected the three literals by hand (`\n` verified by `grep -n 'umask 077'`), and the file then ran.

## Reaches, working copies, unread, searches

- Reaches beyond the handoff: `reports/review-fix-2-evidence/probe2-out.txt` (variant names); `src`-level: none.
- Working copies: files, not a worktree, in `.runs/author` (`runner.py`, `whole.py`, `make_forms.py`, `test_prefix_logic.py`, the six variants, `matrix_forms.txt`); all removed from there after copying to `reports/correction-1-evidence/`. The three comment-case variants (`comment-after-command`, `comment-after-hash-in-string`, `comment-only-line-in-script`, plus the honest comment outside a script) were generated in the first run and removed by me before I copied; they are one-line edits of `deploy.yml` described in the item 2 table and not kept as files.
- **Unread material:** `reports/review-fix-1-report.md` and `review-fix-2-report.md` read in part (the passages naming the forms and the evidence listings); their `*-evidence/` variant files not opened except `probe2-out.txt`. `guidelines/coding.md` and the rest of `guidelines/testing.md` not re-read in this round (read whole in the first round; the row and its section were re-read).
- **Searches not found or unclear:** none.
