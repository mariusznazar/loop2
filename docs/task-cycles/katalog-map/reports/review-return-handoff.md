# Handoff - reviewer of the return step's commits, task `katalog-map`

You review the commits of the return step of a planned task cycle of the-way as an agent that made none of it. The person who requested the cycle has
delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human.
You are read-only on the product: no tracked file changes, no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole: the return step's commits are reviewed as its section 2 gives, against the
  task and the foundation entries the return step writes or corrects. Your directory for working copies: `.runs/review-return/`.
- Range: `7abe5a4d616c414f323a799a73280eaf3d034f43..be5bebc7` (compute `git diff` and `git log` yourself; confirm `git rev-parse HEAD` is the head the commit
  list ends at). The return step's report (claims to verify, not evidence): `.runs/task-cycles/katalog-map/reports/return-step-report.md`; its handoff,
  which tells what it was asked to do: `.runs/task-cycles/katalog-map/reports/return-step-handoff.md`. The method it followed:
  `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md` (read both).
- Frozen task (read whole): `.runs/task-cycles/katalog-map/task.md` (*Decisions in play* and *Settlements to record* hold the wording the entries must carry).
- Foundation entries to read whole by heading in `foundations/decisions.md`: D-325, D-331, D-134, D-149, D-24, D-327, D-440, D-441, D-271, D-438, D-448,
  D-449, D-147, D-334; `foundations/invariants.md`: `judging-cache-reading`, `rule-state-from-pick`, `sprite-credits`; `foundations/environment_facts.md`:
  `cc-by-4-credit` (new) and `lpc-bears-deer-lions-licence`. Check specifically: (1) every `tests:` clause names a test that exists and holds the sentence it is
  named for, and every pair of examples left stands only for a part no test holds; (2) the new binding sentence of D-325 (view, typed text and unfolded
  regions end with the screen) is the task's (To do 5: "Widok i szukane słowo nie zostają po wyjściu z ekranu") and is held by the new `decision:` line of
  `tests/view/map-catalog.test.mjs`; (3) the widened `judging-cache-reading` is a correction of reach, not a new rule invented by the cycle; (4) the CC BY 4.0
  fact is true to the legal code it quotes and cited as the foundation's rules for facts demand; (5) D-449's *Rejected* uses only what the task states; no
  invention; (6) the corrected D-147/D-334/`rule-state-from-pick` sentences are true of the code; (7) word limits and `foundation_check.py` (run it: exit 0
  expected), `python -B .the-way/instruction-files/check_instructions.py` (a warning is a finding).
- Grade by the review's rules. The fixer's earlier trimming of D-441 and D-136's rationale are not in this range (D-136 is outside the task).
- Report path: `.runs/task-cycles/katalog-map/reports/review-return-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's
  refusal of files named `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>`; checks with commands and exit codes; **Unread material**;
  **Searches not found or unclear**. Return the first line, the checks, the report path.
- `cycle.md` and files of `.runs/task-cycles/katalog-map/` not named here are not yours to read.

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
