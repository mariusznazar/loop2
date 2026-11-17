# Handoff - reviewer of the whole change (`review-change`)

You review the whole change of one task cycle of the-way as an agent that made none of it. The
person who requested the cycle has delegated intermediate choices to the orchestrator; return
`questions` to the orchestrator where you need one, never ask the human.

- Worktree (read-only for you; work from its root): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`.
- Method: `.the-way/task-cycle/review/SKILL.md` - read it whole; your variant is the review of the whole change. Read a file it names only when the step or variant that names it comes.
- Range to review: base `f66ae6eb34de0b68099caf1a19f4ff368b332372` to head `bcc35f33` (`git diff f66ae6eb..bcc35f33`). You read the full diff of the range.
- Frozen task (read whole): `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`. No spec. Plan (read whole): `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md`.
- Answers of step 4: trust boundary - no; irreversible operation - no. The process pin was not moved by the task. No foundation-entries agent ran (the plan's *Foundation entries* is `none`; the new glossary term `reading` was written inside slice 1).
- Directory for your working copies: `.runs/review-whole/`. Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/review-whole-report.md`.
- You select your own foundation and guidelines by the parts of the change (`.the-way/elements/common/way_of_working.md`, "Reading the foundation"); the change touches `foundations/**` (all five files), `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, tests of every part, `src/browser/view/camp.tsx`, `src/browser/program-panel.css`, `scripts/measure-passwords.mjs`, `README.md`, `security-notes.md`. Never open `foundations/decisions.md` (about 11 400 lines) whole; use the index script of the-way and read the changed entries whole by range.
- Do not run the product's full gate (`npm test` without a file argument): the orchestrator runs it. You may run the foundation check (`python -B .the-way/elements/common/foundation_check.py`), focused tests (`npm test -- <file>`) and the instruction check. Dependencies are installed; `.runs/quality-venv` is missing, so a ruff check is not run (say so).

## Slices (planned route; no slice had a review of its own, you judge all of them)

Each executor's report stands in `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-<n>-report.md` and its handoff in `executor-<n>-handoff.md`. A slice's range is its base to its head.

| Slice | Base | Head | Content | Class |
|---|---|---|---|---|
| 1 | f66ae6eb | ce9cac00 | glossary, part map | same |
| 2 | ce9cac00 | d60ad606 | environment facts | same |
| 3 | d60ad606 | 7bdce4fa | simulation test docstrings | cheaper |
| 4 | 7bdce4fa | 173c4f3f | invariant wording, measure-passwords comments | cheaper |
| 5 | 173c4f3f | 192e9096 | links invariants-decisions | same |
| 6 | 192e9096 | 36d4292e | server, deployment, backup decisions | same |
| 7 | 36d4292e | 2c17721d | testing decisions, testing.md | same |
| 8 | 2c17721d | c753bc5e | D-104, D-271, D-49, README, sprite-credits | same |
| 9 | c753bc5e | 4cd6fe84 | decisions of the game, programs, chronicle | same |
| 10 | 4cd6fe84 | 64f2061e | run screen and end window decisions | cheaper |
| 11 | 64f2061e | 307cc1d4 | scene decisions | same |
| 12 | 307cc1d4 | 578d13d2 | D-44, D-03 | cheaper |
| 13 | 578d13d2 | 2a2f1607 | saving the game | cheaper |
| 14 | 2a2f1607 | ee68e190 | screens and login card | cheaper |
| 15 | ee68e190 | f173b651 | picture band in the foundation | same |
| 16 | f173b651 | c37e2d4e | picture band in comments and test names | cheaper |
| 17 | c37e2d4e | bcc35f33 | styleguide, copy-line comment, security notes | same |

Mechanical check of each slice (clean tree, non-empty range, changed files against the slice's *Change*, checks with command and exit code, unread material, searches) passed. Slice 10 has a second commit `64f2061e` (the orchestrator's answer: the *Verification* of D-311 and D-185 follow their binding sentences).

## Choices the orchestrator made that bind the executors (none is the human's approval)

- Size verdicts of slices 5-15 accepted (the script counts the whole decision log); 12 files in slice 12 accepted.
- The band at the top of Siedziba is named "the picture band" (the task says "np. the picture band"); the rename covers D-389, D-271, D-272, D-421, D-54, the section sentence and `loop2-container-sprites`, beyond the entries the task names (judge whether the wider scope is consistent with the task's reason: "camp" means only where a character is).
- The task's changes for the withdrawn D-358 and the withdrawn fact `playwright-cli-sessions-per-workspace` were applied to the successors D-419 and `playwright-cli-session-separation`.
- To do 4.4 read as "the owner's computer" (build-tools) and "telling the owner" (deployment, twice) -> "operator".
- The *Verification* of D-311 and D-185 follow the binding sentences (beyond the task's list).
- D-03's *Relations* holds "narrowed by D-265" as the task words it, though the template's closed list of relations is `derives from` / `narrows`.
- Line numbers of the task are from an older commit; wordings were found by quotation; items found already made or not standing were reported, not forced.

## Points the orchestrator carries to you (gaps of unread material and wordings the executors chose)

1. Slice 2: twelve dependants of the changed environment facts were opened only at their *Based on* / *Rests on* line; the sentence of `docker-compose-down-volumes` names the networks the Compose file defines while the quoted page lists a third item, the default network. Check each changed fact's quotation against its source page where you can reach it, and the dependants against the new sentences.
2. Slice 4: the citing tests of seven reworded invariants were not read against the new wording (`account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `account-message-limits`, `trip-plan-progress`, `password-reset-verified-email`, `loop-run-knowledge`); the glossary was not read for the "deployment" wording. The foundation check lists these (and `sprite-credits`) as invariants that read `test` whose citing test did not change.
3. Slice 6: D-355 left unchanged (its quoted wording was replaced earlier by a sentence saying the readings were made on 2026-11-14); the `decision:` quotation of D-232 in `tests/invariants/test_account_save_backup_encrypted.py` is the whole new sentence, though the test exercises only its first part; the "complies" line of D-231 was reworded beyond the task's list; D-232's *Verification* "violates" adapted to the base's wording.
4. Slice 7: the *Verification* pair of D-83 and a *Rationale* sentence of D-84 changed beyond the task's list; the quoted "four kind guidelines" of D-28 does not stand.
5. Slice 8: `sprite-credits` reworded while its citing test (`tests/view/icons.test.mjs`) was not read against it; the clause of D-104 wording.
6. Slice 9: D-189 now cites D-251 in its binding sentence while D-251 derives from D-189; D-335's quoted wording stands nowhere; D-310's wording was the executor's.
7. Slice 11: the first sentence of D-322 cites "(D-319)" as the task gives it, but the executor found the sentence about a scene drawn again on the same moment in D-317; check which decision says it. The D-367 "violates" example does not exist.
8. Slice 13: the wording by which D-04 names the previous-save privilege (D-400) is the executor's own.
9. Slice 14: the wording of D-57's decimal comma is the executor's own; `guidelines/testing.md` was only grepped.
10. Slice 1: the *Not* of the new term `reading` holds the term itself (`"reading:"`), as the task words it, against the glossary template's rule that a carrier never holds the term; the second *Not* item of `at the camp` now reads "the headquarters".
11. Slice 17: the date "2026-11-12" for the three moments of the scene in the styleguide is the task's.

## What to return

As `review-change` gives: the report's first line `PASS <sha>` or `FAIL <sha>`, graded findings with their places, for each blocking finding the slice it comes from, the Minor and out-of-scope findings kept apart (the Minor findings within the task are listed, in your words, so that the orchestrator can have them fixed), the checks you ran with command and exit code, how many decisions you read whole, **Unread material**, **Searches not found or unclear**, your working copies.

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
