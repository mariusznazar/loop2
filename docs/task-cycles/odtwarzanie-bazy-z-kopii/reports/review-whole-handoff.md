# Handoff — review of the whole change (review-change)

Delegation: the person who requested this cycle (the product's owner) delegated every intermediate choice to the orchestrator of `implement-task`. You judge; you change nothing. Your questions go to the orchestrator.

## Method

Read whole `.the-way/.claude/skills/the-way-review-change/SKILL.md` (the project skill `the-way-review-change`; if you can invoke it, do) and follow it for **the whole change** (a review of the whole change within the task). Read a file it names only when the step or variant that names it comes. You select your own foundation entries and guidelines by the parts of the change, as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md` give; state in your report how many decisions you read whole and how many by title only.

Worktree (read-only for you; do not edit, do not commit): `the root of the task's worktree`.

Report path: `docs/task-cycles/odtwarzanie-bazy-z-kopii/reports/review-whole-report.md`. The report's first line is `PASS <sha>` or `FAIL <sha>` (or `questions`). Return the first line, the changed files with line counts, the checks you ran with command and exit code, and the report path. The report holds **Unread material** and **Searches not found or unclear** (each `none` if so).

## What to review

- Range: base `f672c7b1d7e71c7f8077b2bb5f16fd9b37196998` to head `76120d8` (three commits: `08f7a06` instruction in both skill copies; `aa15552` decisions D-360, D-361; `76120d8` environment fact and D-238's *Based on*).
- Frozen task (binding; read whole): `docs/task-cycles/odtwarzanie-bazy-z-kopii/task.md`. Check coverage of every *To do* item 1–16, the *Acceptance criterion*, the three *Questions to settle* answers, both *Settlements to record* rows (written whole as decisions), *Out of scope* (loop2#046-93 gets no text), and fidelity to the sources.
- The author's report: `docs/task-cycles/odtwarzanie-bazy-z-kopii/reports/author-report.md` (its handoff: `reports\author-handoff.md`). No spec or plan exists (one-author route, no open design choice).
- The task's irreversible-operation answer is **yes**: the restore of the database on the server over the live one is reserved to a human (D-12). Check that the change only prepares it (text of an instruction) and that nothing in it performs or invites an agent to perform it. Item 15 and the acceptance criterion's "places where Mariusz got stuck in the trial" are **deliberately not done**: they wait for the human's trial (a human action in the cycle), after which a correction follows; `The procedure has never been tried.` stays. Do not grade that absence as a defect of this change; do check that nothing in the text pretends the trial happened.
- Trust boundary: the task's answer is no (parts `agent-workflow`, `product-foundation`; `deploy/**` is read, not changed). The instruction is nevertheless a recovery procedure for keys, SSH host-key checking and file modes: check every command, path, file mode, owner/group, exit code, name and number in the changed instruction against `deploy/loop2-backup`, `deploy/loop2-backup.cron`, `scripts/restore-trial.mjs`, `src/browser/view/app.ts`, `src/browser/sim/saved-game.ts`, `src/server/account-policy.ts` and the decisions; check that a person following the steps in order on a fresh failure (host lost, or database damaged) would not lose saves, leave a key or hash-bearing file too open, or be stuck on a command the instruction does not give. Check the shell blocks for syntax (`bash -n` is available through Git Bash) and the counting command of item 14 (its claim: follows `Include`, case-insensitive, skips comment lines, fails closed) with fake files; one reading of it on the server was taken by the orchestrator through the `mikrus` MCP (output `0`, grep 3.7) and is the source of the environment fact. You may not read the server yourself (D-12); run no `mikrus` tool.
- Twin copies: `.agents/skills/loop2-deploy/` must equal `.claude/skills/loop2-deploy/` byte for byte (`tests/agent_workflow/test_loop2_deploy_skill.py`).
- Foundation entries the change writes: D-360 (row 1), D-361 (row 2), the fact `loop2-host-ssh-host-key-options-unset`, D-238's *Based on* — marked in the author's report with meaning sentences. Check each against the row/source, the decisions' and facts' templates, and `python -B .the-way/elements/common/foundation_check.py`.

## Gaps of the author's reading, carried to you (judge them; read what you need)

The author reported as unread or read in part: the tails of D-234 *Rejected* and D-209 *Rationale*; D-252, D-355, D-356; `.claude/skills/loop2-deploy/references/setup_and_secrets.md` lines 340–575 (the instruction links to it); `troubleshooting.md` (only grepped for the restore and "never tried" mentions); parts of `src/browser/sim/saved-game.ts`. Decide whether any of it bears on what the instruction says, and read it where it does.

## Claims the author could not try (no Linux, `rsync`, `ssh`, `age` on this computer)

(a) the exit-code-1 row says the real process status can differ from the logged 1 — based on the header of `deploy/loop2-backup`; (b) `rsync` exit 23 for a missing weekday file — from the script's exit table; (c) item 6's reading of the newest backup (`rsync --times`, then `ls -l -t --time-style=long-iso`; the backup log as cross-check) is the author's choice within D-230 ("nothing reads the destination's list of files"): judge whether it conforms to D-230 and works on a host after loss. State what you could and could not verify.

## Minor findings

Name the Minor findings the report lists within the task and mark those outside the task's scope as such; the orchestrator fixes the Minor findings within the task before the request (WAY-161). Do not move findings between kinds in later rounds.

## Checks

You may run focused checks yourself (`python -B tests/agent_workflow/test_loop2_deploy_skill.py`, `foundation_check.py`, `bash -n` of extracted blocks). Do not run the whole gate; the orchestrator does (step 10).
