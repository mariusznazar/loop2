PASS d5932fc5b68c99fdc9a6b45cc23a812b04720d51

# Review of fix 1: mapa-czesci-z-przegladu-fundamentu

Range `abd32babdc7c3d68f6da53d444d1a65663208cfd..d5932fc5` (two commits: `fbaf2cac` the test, `d5932fc5` the wording and table), worktree `the task's worktree`, `git rev-parse HEAD` = `d5932fc5b68c99fdc9a6b45cc23a812b04720d51` (matches the dispatch). Bounded by `reports/fix-1-findings.md` (I-1, M-1 to M-7). Paths are relative to the worktree root.

Counts: the one blocking finding (I-1) is fixed; of the Minor findings, six fixed and one (M-4) remains, mandated by the task; the fix diff adds no Critical or Important finding and three Minor ones (N-1 to N-3), which block nothing.

Changed files (`change_file_sizes.py abd32bab d5932fc5`): `foundations/invariants.md` 1425 → 1425 (+0), `guidelines/testing.md` 491 → 491 (+0), `tests/deploy/test_deploy_workflow.py` 157 → 182 (+25).

## Each finding of the findings file

**I-1 — fixed.** `tests/deploy/test_deploy_workflow.py:26-44` (`ssh_options`) and `:80-88`. The case now takes the `ssh` call from the joined text, splits it with `shlex`, reads `-o K=V`, `-o "K V"` and `-oK=V`, keeps the first value of each option name, case-insensitively, and asserts the first `StrictHostKeyChecking` is `yes`; the old negative regex stays. In a worktree of `d5932fc5`, each of my earlier breaks now fails the case and the whole file and passes after the restore: R1 (`-o "StrictHostKeyChecking no"` before the `yes`) case 1 / file 1 / restored 0; R3 (both options moved off the call into an `echo`) 1 / 1 / 0. Honest forms pass: the file as it stands, `-o "StrictHostKeyChecking yes"`, `-oStrictHostKeyChecking=yes`, the options reordered, the value in single quotes — each 0 / 0 / 0. The row at `guidelines/testing.md:185` now says the case reads the first value in the one `ssh` call, which is what it checks (with the limits of N-1 and N-2). Evidence: `reports/review-fix-1-evidence/results_fix.json`, script `mutate_fix.py` beside it. Two narrower crafted forms still pass (N-1, N-2); they need an obscure flag bundle or a decoy line written on purpose, which is why I grade them Minor and hold I-1 as fixed.

**M-1 — fixed.** `foundations/invariants.md:1410` no longer says "and batch mode", and *Derives from* (`:1414`) no longer names `BatchMode=yes`. The case keeps a `BatchMode` assertion, which the row calls out as no rule of the invariant (N-3).

**M-2 — fixed.** "of that step" is gone from the sentence; a secret in the workflow-level `env:` is now allowed by the sentence, and the test was left unchanged, as the orchestrator answered. The answer is sound: row 2 never carried "of that step".

**M-3 — fixed.** *Rests on* is `none` (`invariants.md:1413`). The foundation check reports 0 errors, so the two OpenSSH facts are still cited elsewhere (D-238's *Based on*).

**M-4 — remains, Minor, mandated by the task.** Both entries still join more than one rule in a sentence (`invariants.md:1400`, `:1410`; the second now joins two, not three). The orchestrator's answer holds: rows 1 and 2 of *Settlements to record* each settle "nowy niezmiennik", so a split would depart from the human's approved rows; the marks already split one-to-one, so a later split costs only the entries. The request is to name it. This blocks nothing.

**M-5 — fixed.** D-224 stands in the *Decision* list (`testing.md:155`, between D-222 and D-225).

**M-6 — fixed.** The row of `password-reset.ts` (`testing.md:178`) names both cases of `tests/view/account-screen.test.mjs` by their titles, which I checked against `:1632` and `:6502` word for word. What the row says of them is true: each starts with the reset link and asserts exactly one `setPassword` with the token from the address and both passwords (`:1645-1648`, `:6512-6515`). The cases stay unmarked, as the orchestrator answered.

**M-7 — fixed.** `invariants.md:1400` reads "goes unchanged into the body of the request of its own link and nowhere else". It no longer reads as a count, and it keeps row 1's meaning (the request the token belongs to). The request is to name the rewording.

## New findings in the fix diff (all Minor, within the task; none blocks)

**N-1. The case does not read an `-o` bundled behind another short flag, while the row says "w każdej postaci opcji, jaką `ssh` przyjmuje".** `tests/deploy/test_deploy_workflow.py:35-38`; `guidelines/testing.md:185`. `ssh` parses its flags with getopt, so `-4o "StrictHostKeyChecking no"` sets the option, but `ssh_options` takes only a word equal to `-o` or starting with `-o`. Break R7 — `ssh -i` changed to `ssh -4o "StrictHostKeyChecking no" -i` — passes the case and the whole file (0 / 0), and `ssh` would use `no`. The row lists three forms and calls them every form `ssh` takes. Two small repairs, either one: read a word matching `-[46AaCfGgKkMNnqsTtVvXxYy]*o` as `-o` too; or let the negative check refuse any `StrictHostKeyChecking` followed by a value other than `yes`, in `=` and space form, anywhere in the text. Short of that, the row could say "w trzech postaciach".

**N-2. The case reads the first `ssh ` it finds in the file, not necessarily the one call.** `tests/deploy/test_deploy_workflow.py:83`. Break R8 sets the real call to `-o "StrictHostKeyChecking no"` and adds an earlier line `echo ssh -o StrictHostKeyChecking=yes -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SSH_HOST" "$DEPLOY_SHA"`. It passes the case and all 16 tests (0 / 0), because `test_one_ssh_call` (unmarked) counts only lines holding `-i`. The row says "w jedynym wywołaniu `ssh`". A decoy has to be written on purpose, which no text test can fully stop. Taking the call as the line that holds `-i "$key_file"`, or asserting in the case that there is exactly one `ssh ` word, would close it.

**N-3. The invariant's marked case also fails on a property that is no rule of the invariant.** `tests/deploy/test_deploy_workflow.py:87`. R2 (`BatchMode=no` before `yes`) fails the case (1 / 1), though `deploy-workflow-input` no longer says anything of batch mode. A red run of this case can therefore be read as a break of the invariant when it is not. The orchestrator allowed this, and the row says it openly ("co nie jest regułą niezmiennika"), so I record it only: moving the `BatchMode` assertion to an unmarked case of its own would keep the mark's meaning exact.

## Declined to judge

- Whether a text test can stop a workflow written on purpose to defeat it (variables, `eval`): out of reach of any test that reads the file as text, as the row itself says ("dowodzi, co plik mówi"). The review of each change to the boundary carries it.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 147 warn, 7 info`; the warnings on `guidelines/testing.md` stand on lines 278-282, which the fix did not write |
| deploy workflow tests | `python -B scripts/test.py tests/deploy/test_deploy_workflow.py` | 0, 16 tests |
| file sizes | `python -B .the-way/task-cycle/change_file_sizes.py abd32babdc7c3d68f6da53d444d1a65663208cfd d5932fc5` | 0, table above |
| crafted and honest forms of `deploy.yml` | `python -B mutate_fix.py <scratch worktree of d5932fc5> <out>`: each change applied, the case and the whole file run (`python -B -m unittest ...`), restored, the case run again | breaks R1, R3: 1 / 1 / 0; side check R2: 1 / 1 / 0; breaks R7, R8: 0 / 0 / 0 (N-1, N-2); honest R0, H1–H4: 0 / 0 / 0. My first run of R8 applied its two edits in the wrong order and broke the decoy instead of the call; corrected and rerun, and only the rerun is reported |
| Ruff on the changed Python file | — | not run: `No module named ruff` on this computer; unverified, the full gate runs it |
| `npm test` | — | not run, by the dispatch |

## Reaches beyond the dispatch

- `tests/view/account-screen.test.mjs:6498-6527` (and `:1632-1663`, read in the earlier review): to check what the M-6 row says of the two cases.

## Working copies

- `.runs/review-fix-1` held a detached worktree `wt` of `d5932fc5` (no `node_modules`), the script `mutate_fix.py` and `results_fix.json`. The worktree was removed with `git worktree remove --force` and `git worktree prune`, then the directory; nothing remains. The script and results are kept in `.runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/reports/review-fix-1-evidence/`. The reviewed worktree is unchanged (`git status --short` empty).

## Unread material

- `reports/fix-1-evidence/` (the author's mutation results): not opened; I ran my own.
- `reports/fix-1-findings.md`: read by its headings and the M-5 line; its findings are my own report's, word for word, as the dispatch says, and I judged each against my report's text.
- Otherwise none: the fix diff, the fix report and the handoff were read whole.

## Searches not found or unclear

- `ruff` is not installed as a Python module here; the lint of the changed test file is unverified.
- No environment fact holds `ssh`'s getopt parsing of bundled flags (N-1); I judged it from the OpenSSH command line's ordinary getopt behaviour, not from a recorded fact.
