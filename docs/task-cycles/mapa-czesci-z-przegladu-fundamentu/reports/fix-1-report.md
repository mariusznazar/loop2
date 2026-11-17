# Fix 1 report: findings of the review of the whole change

**Status:** done. Range from the reviewed head: `abd32bab..d5932fc5`.

| Commit | What |
|---|---|
| `fbaf2cac` | I-1: `tests/deploy/test_deploy_workflow.py` (`test_ssh_is_strict_and_batch` now reads the options of the one `ssh` call; new helper `ssh_options`, `import shlex`). |
| `d5932fc5` | M-1, M-2, M-3, M-5, M-6, M-7: `foundations/invariants.md`, `guidelines/testing.md`. |

## Each finding

**I-1, fixed.** The case now takes the one `ssh` call (the joined line `code()` gives, the search the forwarding case already uses), reads its `-o` options with `ssh_options` and asserts that the first value of `StrictHostKeyChecking` is `yes`. `ssh_options` splits the call with `shlex` and takes `-o K=V`, `-o "K V"` and `-oK=V`, the option name read without regard to case, and keeps the first value of each name (`setdefault`), because `ssh` uses the first one. The old negative regex `StrictHostKeyChecking=(?!yes)` over the whole text stays (nothing weakened). The case also asserts the first value of `BatchMode` is `yes` (stronger than the old `assertIn`).

Evidence, scratch worktree `.runs/author/wt` (detached at `abd32bab`), script `mutate_fix.py`, commands `python -B -m unittest tests.deploy.test_deploy_workflow.DeployWorkflow.test_ssh_is_strict_and_batch` (case) and `python -B -m unittest tests.deploy.test_deploy_workflow` (file), both from the scratch worktree; the numbers are exit codes of case / file / case after the restore. Raw: `reports/fix-1-evidence/results_fix_old.json`, `results_fix_new.json`.

| Break of `deploy.yml` | Old case (`abd32bab`) | New case |
|---|---|---|
| R0 no change | 0 / 0 / 0 | 0 / 0 / 0 |
| R1 `-o "StrictHostKeyChecking no"` before the `=yes` (the review's R1) | 0 / 0 / 0 (passes) | **1 / 1 / 0** |
| R1b `-oStrictHostKeyChecking=no` before it | 1 / 1 / 0 | 1 / 1 / 0 |
| R1c `-o StrictHostKeyChecking=no` before it | 1 / 1 / 0 | 1 / 1 / 0 |
| R1d `-o strictHostKeyChecking=accept-new` (other case of the name) before it | 0 / 0 / 0 (passes) | **1 / 1 / 0** |
| R2 `-o BatchMode=no` before `BatchMode=yes` (the review's R2) | 0 / 0 / 0 (passes) | **1 / 1 / 0** |
| R3 both options off the call, written into an `echo` of the probe step (the review's R3) | 0 / 0 / 0 (passes) | **1 / 1 / 0** |
| R6 `StrictHostKeyChecking` removed from the call | 1 / 1 / 0 | 1 / 1 / 0 |

So R1, R2 and R3 of the review, which passed before, now fail the case for the reason of the rule (the first value of the option on the call is not `yes`, or the option is not on the call), and the unchanged file passes. After the fix: `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` exit 0, 16 tests. The row of `guidelines/testing.md` now says what the case checks: the first value of `StrictHostKeyChecking` in the one `ssh` call, in the three forms, with the reason (`ssh` uses the first value); the first value of `BatchMode` is named apart as not a rule of the invariant (M-1).

**M-1, fixed.** "and batch mode" is out of the sentence of `deploy-workflow-input` and out of its *Derives from* place text; "on its command line" stays, the case checks it. The test keeps the `BatchMode` assertion, in the stronger form; the row names it apart from the rule.

**M-2, fixed.** "of that step" is out of the sentence; the test is unchanged. (A secret at the workflow-level `env:`, the review's R4, is an environment variable and passes, as the sentence now allows.)

**M-3, fixed.** *Rests on* of `deploy-workflow-input` is `none`. The two OpenSSH facts are not left orphaned: `openssh-strict-host-key-checking` and `openssh-option-order` are in the *Based on* of the decision at `foundations/decisions.md:2453` (the backup script's, D-238), and the foundation check reports no unused fact (`0 errors`).

**M-4, contested; the task mandates it.** The task's *Settlements to record* give one invariant per row ("nowy niezmiennik", rows 1 and 2) and the handoff says not to split. The marks already split one-to-one (screen-address tests vs. the two token files; the `sha` case vs. the `ssh` case), so a later split into two entries each costs only the entries; it goes to the request's list as a defect of the task's wording, not of the change.

**M-5, fixed.** D-224 is in the *Decision* list of `### Trust boundaries`.

**M-6, fixed.** The row of `password-reset.ts` names the two cases of `tests/view/account-screen.test.mjs`, not marked: line 1632 "a sent form waits with its fields and „Anuluj” locked, sends the token and both passwords once and keeps the fragment" (`startPage` with the address `RESET_LINK`; the form filled and sent; the client gets exactly one `setPassword` with `RESET_TOKEN` and both passwords: the whole step from the page's address into the form's request) and line 6502 "a sent „Ustaw nowe hasło” waits with the whole card locked, sends the token and both passwords once and keeps the fragment" (the account card opened with `reset` carrying the token; the same single `setPassword`, and the fragment still `RESET_LINK`). The row names them by their titles, not by line, so that it does not age with the file; the lines are here.

**M-7, fixed.** The sentence of `page-address-fragment` reads "goes unchanged into the body of the request of its own link and nowhere else"; its meaning is row 1's: the one kind of request the token belongs to. The request names the rewording for the human.

## Checks (command, exit)

- `python -B .the-way/elements/common/foundation_check.py` after the last commit: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 147 warn, 7 info` (as before the fix).
- `python -B scripts/test.py tests/deploy/test_deploy_workflow.py`: exit 0, 16 tests.
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`: exit 0, 10 tests.
- Not run: Ruff on the changed Python file (not installed on this computer: `No module named ruff`); `npm test` (not mine).
- Own-work check: the requirement a fix most likely misses is "the case refuses the crafted forms the review named, not only the one form"; checked with R1, R1b, R1c, R1d, R2, R3, R6 above, all failing, and the unchanged file passing. A first version of my edit script wrote a real newline into the regex `[^\n]` (the hazard of an escape in a heredoc); the file did not compile (`SyntaxError`), I corrected it by hand (`\n` in the file, verified by `git diff`), and the case then passed, 16 tests, exit 0.

## Reaches, working copies, unread, searches

- Reaches beyond the handoff: `tests/view/account-screen.test.mjs` helpers `startPage`, `heldClient`, `openCard`, `resetLink` (to say exactly what the two cases prove); `tests/deploy/test_loop2_backup.py` `ssh_options` (read, not reused: it parses a `--rsh=` string, not a workflow line); `foundations/decisions.md` line 2453 (the *Based on* that keeps the OpenSSH facts used).
- Working copy: the detached worktree `.runs/author/wt`, removed with `git worktree remove --force` and `git worktree prune`; no `node_modules` link this time. `.runs/author/` keeps scripts and results of both fixes; the fix's script and results are copied to `reports/fix-1-evidence/`.
- **Unread material:** none of the handoff's named files; of the reviewer's evidence I read `mutate_deploy.py` and did not open `results_deploy.json`, `results_view.json`, `mutate_view.py`, `sections.md`, `index.md` or `review-whole-report.md` (the findings file carries what the fix needs).
- **Searches not found or unclear:** none.
