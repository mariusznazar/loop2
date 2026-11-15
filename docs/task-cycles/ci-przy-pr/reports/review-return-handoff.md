# Handoff — review of the return step (task `ci-przy-pr`)

You review the range of the return step as an agent that made none of it, with `review-change` (`.the-way/task-cycle/review/SKILL.md`; read it whole, and a file it names only when the step that names it comes). Variant: the review of the return step, "against the task and the entries the return step writes or corrects".

## Where

- Worktree (read-only for you): `the task's worktree`, branch `task/ci-przy-pr`. Range `9912f0db..1c0e49eb` — one commit by the one author (`foundations/decisions.md`, `foundations/environment_facts.md`). Your directory for working copies: `.runs/review-return/`.
- The author's report: `.runs/task-cycles/ci-przy-pr/reports/return-step-report.md`. The method it followed: `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md` (read the first whole; the second only where a finding needs it). The frozen task: `.runs/task-cycles/ci-przy-pr/task.md`. The whole change, for context, is `bdf0dbd7..1c0e49eb`; the earlier reviews of it (`reports/review-whole-report.md`, `reports/review-fix-report.md`) passed, with Minor findings that the request lists; do not repeat them.
- Trust boundary: none of the part map's trust-boundary files is touched by this range. No irreversible operation.

## What to judge

1. **The four new environment facts** in `foundations/environment_facts.md`: for each, does its *Source* hold an address at a fixed commit, a section, a quoted passage and the date read, in the form of the file's other entries and of `.the-way/elements/environment-facts/`; **open each address** (a raw file of a public repository; `git`, `gh` or an anonymous fetch from the shell, not from memory) and check that each quoted passage stands there word for word and says what the fact claims. One of the four is a read-only `gh api` call of the repository's own settings: check that its form is allowed for a source and that the settings it reports are what the entry says (read-only call only).
2. **D-412, D-413 and D-390 as corrected:** does each *Based on* name facts that hold what the *Rationale* claims; does any sentence still claim of GitHub more than a fact shows; is a binding sentence changed where only the *Rationale* should be (a binding sentence changes the requirement, the *Rationale* its reason). The author kept the comment of `.github/workflows/tests.yml` lines 7-9 ("the Docker daemon of a Linux machine answers") unchanged by order of the handoff, while D-413 now says the reason is that Docker is installed on the image: say whether the two now contradict each other in a way the human must see, and how it should be worded in the request (do not ask for a fix of the comment: the code is outside this range).
3. **The comparison of the foundation with the code** reported by the author: the entries it says matched (D-77, D-405, D-390, D-11, D-412, D-413, the part map, the guidelines rows, README, the invariants file) — spot-check the ones where a mismatch is most likely (the part map's `agent-workflow` and `build-tools` sentences against the files each now lists; any invariant that names the stages of the gate or the files of a part).
4. The rows of *Settlements to record* as the report places them.

You run no full gate. Focused checks are yours (`foundation_check.py`, `check_instructions.py`).

## Report

`.runs/task-cycles/ci-przy-pr/reports/review-return-report.md`, first line `PASS <sha>` or `FAIL <sha>`; findings graded as `review-change` gives with `file:line`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**; the working-copies line.

Working copies, word for word from the cycle's process:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
