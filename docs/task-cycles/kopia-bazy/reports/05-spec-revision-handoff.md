# Handoff — revision of the spec, task kopia-bazy

The reviewer returned `FAIL`: `docs/task-cycles/kopia-bazy/reports/04-spec-review-report.md`. Read it whole. Revise `spec.md` once, as `.the-way/task-cycle/spec/SKILL.md` and its `design.md` give for a revision. Boundary, files and report rules as in your first handoff. Your report: `docs/task-cycles/kopia-bazy/reports/06-spec-revision-report.md`.

## Answers to the findings' questions

These bind; they are the orchestrator's choices, not the human's approval.

1. Finding 1, way A: the skill names no Mikrus host; it points to the constants block of `deploy/loop2-backup`. The test `tests/agent_workflow/test_loop2_deploy_skill.py` keeps its pattern and only gains the new file in its list.
2. Finding 2, way A: for the send step the log holds the stage and `rsync`'s exit code, and the error text of `ssh` and `rsync` reaches no file. Add the test with a sentinel login on the stand-in's standard error. Say how a human sees the reason: a hand run of the send.
3. Finding 3, way A: the command needs one fixed word and without it refuses and prints nothing. Correct the sentences that say it takes no argument and the one that promises a terminal refusal stops the slip. Whether a terminal refusal stays beside the word is yours; keep it only if it still protects something.
4. Finding 4: add the row to decision 11, as the reviewer gives.

## Answers to what the reviewer left to the orchestrator

- Reading 1, `spec.md:146` against `spec.md:286`. `.the-way/task-cycle/skill/foundation_step.md` settles it: of a row of *Settlements to record*, the meaning is the row's and the wording the writer's; a projected entry stands whole as approved. Correct line 286 to say so. The invariant of settlement 10 names no step that does not exist: its words cover the send, which also replaces the oldest copy, so a failed replacement is a failed send.
- `account-save-backup` is false from its recording until the human's H2 and H3. Under *Foundation entries*, state that it is recorded with *Violated: yes*, and that the mark is cleared only after those checks, by a later commit on this branch, as commit e95a8b1 did in the previous cycle. Say what in the request names this.
- After a rollback to a commit from before this change, the nightly run fails and a message comes each night. Add this to what the skill says (decision 13).
- The figure of about 385 accounts stays in the spec. The orchestrator carries it to the request.

## Facts read from the server by the orchestrator, 2026-10-30

Read through the `mikrus` server under D-12, metadata only. Use them in place of the matching unknowns; state them as read on that date.

- The cron service is active and `/etc/cron.d` exists. Whether a file there really starts stays H2.8's to show.
- Ubuntu 22.04. `age` is not installed; `apt` offers candidate `1.0.0-1ubuntu0.1`. The release binary is no longer needed as a fallback in H2.1.
- The server's clock is CET, +0100 at this date.
- `/run/loop2-deploy.lock` is root-owned with mode 640, and the deployment's log likewise, so a backup run by root opens the same lock. The reviewer's question about the lock closes.
- Root's `~/.ssh/config` has no Strych entry, so H2.3 writes it. Root's default `known_hosts` holds lines for the host from H1; the design's own host-key file stands.
- Free room on the temporary filesystem is about 19 GB.

## Correction

Docker's engine answers on this computer: `docker version` gave 29.7.2, and the base gate's container tests ran with nothing skipped (exit 0, 315 Python tests, 898 Node tests). Correct any sentence of the spec that says the engine is off or that the container checks cannot run here.

## Return

Your status, a one-line check result naming what failed or did not run, and the report's path.
