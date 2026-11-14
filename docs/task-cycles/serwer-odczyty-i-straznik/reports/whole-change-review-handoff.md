# Handoff - the review of the whole change of the task cycle `serwer-odczyty-i-straznik`

You review the whole change of one task as an agent that did not make any of it. The person who requested this cycle delegated intermediate choices to the orchestrator; nothing you receive is that person's approval.

- Worktree: `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. Read-only: change no file and make no commit. Do NOT run the product's whole gate (`npm test`): the machine is short of memory and the orchestrator runs the gate later. Run only focused checks you need, one at a time, in the background with a bound (the watcher's tests take 10 to 30 minutes per module), and say what you ran and what you took from the reports.
- Method: the project skill `the-way-review-change`, `.the-way/task-cycle/review/SKILL.md`; read it whole, and `whole_change.md` beside it (this is the review of the whole change); read `fix.md` only if the step names it. You select your own foundation and guidelines by "Reading the foundation" (`.the-way/elements/common/way_of_working.md`) and `.the-way/product-guidelines/reading.md`, for the parts the change touches: `deployment`, `agent-workflow`, `product-foundation`. State in your report how many decisions you read whole and how many by title.
- Range: base `f0814d77` (origin/main at the start) to head `b5a316f3`, 15 commits, 15 files, +859 / -135. The process pin did not move (`55afa8e5...`); nothing of the pin is part of the change.
- The task's answers at its start: **the change touches a trust boundary** (`deploy/**`: the watcher `deploy/loop2-watch` now takes the content of `/var/log/loop2-backup.log` as input); check crafted input there. No operation that cannot be undone: the cycle only read the server through the `mikrus` MCP and `gh`, and changed nothing on it; the installed scripts on the server are not changed and the new watcher kind works only after a human reinstalls it.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish; read whole). No spec. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` (read whole). The planner wrote 12 slices; the orchestrator removed slice 12 because the human's measurement of the password work has no output word for word and the template of an environment fact takes no summary as a *Source*; the measurement is to be a remark at D-106 and D-113 and the invariant `player-argon2-deployment-check` stays, which the request names for the human. Slices 5 to 11 were raised to the class `same` for the fidelity of quotations. Slice 6 was also given the two skill files (it verified three expectations of slice 3 on the server).
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/whole-change-review.md`; its first line `PASS <sha>`, `FAIL <sha>` or `questions`. Return it with the report path, the changed files with line counts, **Unread material** and **Searches not found or unclear**.

## What is NOT yet in the range, on purpose (the return step, which comes after this review and has a review of its own)

**Entries that wait for the slices — written at the return step, not in a slice.** The log of
decisions, `foundations/decisions.md`, is about a million characters, more than any slice may read
(the size script counts every file a slice changes whole), so no slice changes it, and a slice may not
withdraw an invariant that a decision still names (the check of the foundation reports the dangling
name). Everything that edits a decision, or withdraws an invariant, therefore waits for what the
slices read, and is written by the return step through the project skills `the-way-record-decision`
and `the-way-record-invariant`, from the facts the slices wrote and from the reports of the slices
(each slice's report ends with a part "For the return step", which says, for each fact it wrote or
result it carries, which entry should name it or hold a remark, in plain words and with the date).
The slices write the environment facts themselves (`foundations/environment_facts.md` is small enough),
through `the-way-record-environment-fact`; a fact stands without a dependant until the return step names
it, and no later.

| Entry written at the return step | Kind | From | Waits for |
|---|---|---|---|
| D-09 names the fact of the real break at a deployment; its *Rationale* "a dozen or so seconds" is corrected | decision edit | To do 9 | Slice 5 |
| D-17 and D-237 name the facts of the `resources:` lines and the exit 5, and of exit 7 | decision edits | To do 9 | Slice 5 |
| D-10 names the facts of `docker stats` and of the published ports, and holds the human's reading of the Cloudflare panel as a remark | decision edit | To do 9, 11 | Slice 6 · the human's result in *Human actions* (Cloudflare) |
| D-205 names the fact about `SQLITE_BUSY` lines | decision edit | To do 9 | Slice 6 |
| D-355 names the facts of the Compose version, the daily `logrotate` and the log files; its *Rationale*, which says nobody has checked them, is corrected | decision edit | To do 9 | Slice 6 |
| D-16, D-231 and D-355 name the fact of the installed copies; D-14, D-16, D-17, D-231 and D-238 keep the facts they name, whose *Source* slice 7 re-read | decision edits | To do 9 | Slice 7 |
| D-228 names the fact of the backup log; the invariant `account-save-backup` is withdrawn, its list entry kept as the template gives | decision edit and invariant withdrawal | To do 2, 9 | Slice 7 |
| D-356 names the fact that `flock` works and the fact of GitHub's rhythm, and says in its sentence what rhythm GitHub gives, with its *Rationale* corrected; the human's reading of GitHub's mail is a remark | decision edit | To do 4, 11, 12 | Slice 7 · Slice 9 · the human's result (GitHub's mail) |
| D-232, D-110 and D-153 hold the human's results as remarks (the copy of the encryption key, the cookie and the client address through the tunnel, the reset message); D-153 also names the delivery fact of slice 11 | decision edits | To do 11, 2 | Slice 11 · the human's results in *Human actions* |
| D-12, D-16, D-223 (only the owner has accounts) and D-206 (only the owner's saved games) hold the human's count — 5 accounts, none of another person; 5 saved games, all the owner's — as a fact where the command the human ran and its output arrive word for word, otherwise as a remark; their words do not change | decision edits | To do 11 | the human's result (the count) |
| D-106 and D-113 hold the human's measurement of the password work (2026-11-14: the commit and image, the command, exit 0, the verdict `PASS` and the figures, as *Human actions* of the frozen task gives them) as a remark; the invariant `player-argon2-deployment-check` is **not** withdrawn in this cycle, because no output of the measurement word for word exists for a fact (the template's *Source* takes no summary); the request names this under what the human decides | decision edits | To do 11 | the human's result in *Human actions* |
| D-08 and D-10 name the facts that carry the server parts removed from the three invariants of item 1 | decision edits | To do 1 | Slice 6 · Slice 10 |

Do not report as a finding that a decision does not yet name a fact, or that an invariant is not yet withdrawn, or that D-356 does not yet carry GitHub's rhythm: the return step writes those, from the reports named below, and its commits are reviewed separately. Do report if a fact's text or a skill's text is false against its source or against a report's raw output.

## Slices, their ranges and whether each had a review of its own

| Slice | Range | Own review | Report |
|---|---|---|---|
| Foundation entries (rows 1-4: D-233, D-234, D-356) | `f0814d77..9630fb90` | no | `docs/task-cycles/serwer-odczyty-i-straznik/reports/foundation-report.md` |
| 1 | `9630fb90..3817a067` | no | `reports/slice-1-report.md` |
| 2 | `3817a067..b1e8ec99` | **yes**: `PASS b1e8ec99`, `reports/slice-2-review.md` | `reports/slice-2-report.md` |
| 3 | `b1e8ec99..f91123b3` | no | `reports/slice-3-report.md` |
| 4 | `f91123b3..9f4d6657` | no | `reports/slice-4-report.md` |
| 5 | `9f4d6657..55170ef8` | no | `reports/slice-5-report.md` (raw output also in `reports/slice-5-deploy-log-lines.txt`) |
| 6 | `55170ef8..629521e6` | no | `reports/slice-6-report.md` |
| 7 | `629521e6..5a8b8777` | no | `reports/slice-7-report.md` |
| 8 | `5a8b8777..96cb8c9c` | no | `reports/slice-8-report.md` |
| 9 | `96cb8c9c..9289c29f` | no | `reports/slice-9-report.md` |
| 10 | `9289c29f..628e637b` | no | `reports/slice-10-report.md` |
| 11 | `628e637b..b5a316f3` | no | `reports/slice-11-report.md` |

(The paths are under `docs/task-cycles/serwer-odczyty-i-straznik/`.) Slices without a review of their own are judged by you as a slice is judged (the executor's own-work check included).

## Mismatches the mechanical check passed on, and checks the executors could not run as named

- Slice 1 and slice 2: the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes on this machine in slice 1; the executor ran the same modules by `python -B -m unittest -v <module>` (exit 0 each). Slice 2 saw one `F` once in a bounded run of the named runner of `test_loop2_watch` that the next, complete run (98 of 98) did not reproduce; its cause is unknown.
- Slice 3: the executor wrote two expectations (`enabled`, the line `OnCalendar=daily`) from memory; slice 6 read them on the server and brought the skill's text to what the reading showed.
- Slice 6: four greps had `; echo "exit=$?"` appended and one control reading was piped through `cut`, both outside the forms the list allows (read-only; nothing of the `cut` output is in a fact); the running containers' log was not grepped (the list allows no pipe to `grep`), so the `SQLITE_BUSY` fact covers the dump and its rotated copy only.
- Slice 7: two independent single-line readings were run in parallel; `exec` shows no exit status, so an empty `cmp` output was read as identical; the server's checkout stands at `f0814d77`, behind this branch.
- Slice 4: the executor found the secrets file's `umask` in step 3 of "With no server" (the plan said step 8), and added a sentence instead of replacing "one trial before the merge", which is not in that file.
- Slice 10: *Rests on* stays `none` for the three invariants; the application-port sentence names the Compose file only (the test reads only `compose.yaml`).
- Slice 11: the new fact stands without a dependant until the return step names it in D-153; no log line of a confirmation message exists.

## Minor findings of the slice reviews (grade each as a finding of your own review)

Slice 2's review (`reports/slice-2-review.md`) lists three Minor findings, none outside the task: (1) `tail` of the backup log runs without a time bound while the docker calls have one (`deploy/loop2-watch`); (2) two comment lines too wide (`deploy/loop2-watch` lines 42 and 55 at its review); (3) a stray blank line in `TheState` of `tests/deploy/test_loop2_watch.py`. No other slice had a review of its own.

## Decisions the task names

*Decisions in play* of the task, and the foundation step's edits of D-233, D-234 and D-356 (commit `9630fb90`) are in range; read the decisions of the touched parts as your method gives and every decision whose title bears on the change.
