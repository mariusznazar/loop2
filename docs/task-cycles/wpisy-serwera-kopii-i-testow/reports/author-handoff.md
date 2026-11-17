# Handoff: the one author of the change

You are the one author of this change, without a plan.

## Delegation and place

- The person who requested this task cycle delegated its intermediate choices to the orchestrator; nothing in this handoff is that person's approval. You never ask the human. Questions go to the orchestrator, in your report, with status `questions`.
- Work from the root of the task's worktree (branch `task/wpisy-serwera-kopii-i-testow`, base `f0e466cad5776d86bd979dfe824fb03f543cf6e8`). Never write in the main checkout of the repository.
- Method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one author". Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes. You have no skill tool: every method and element skill below is read as a file.
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Report path: `.runs/task-cycles/wpisy-serwera-kopii-i-testow/reports/author-report.md`. Begin it with the status line and end it with the sections the method gives, including **Unread material**, **Searches not found or unclear** and the own-work check.

## Working copies (word for word from the cycle's skill)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## The task

- The frozen task (read it whole): `.runs/task-cycles/wpisy-serwera-kopii-i-testow/task.md`. It is the Polish task document `zmiany wpisów o serwerze, kopiach i testach z przeglądu fundamentu`, `Status: ready for cycle`, `Project relation: independent`. Its *To do* items 1 to 9, its *Questions to settle*, its *Decisions in play* and its five rows of *Settlements to record* are what you make. Write the entries in English, as the log is written.
- No spec and no plan exist: none was needed.
- It writes no code and no test. It changes entries of the foundation (part `product-foundation`), the two copies of the skill `loop2-deploy` and `guidelines/testing.md` (part `agent-workflow`).
- The two copies of `.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/` are identical today and must be identical when you finish (every file you change in one, you change the same way in the other).

## Answers of the orchestrator at start

1. Trust boundary: no. Irreversible operation: no. Every code review of the cycle is told so.
2. Open design choice: none. Route: one author without a plan.
3. The question the task carries to the cycle — F-3, where the new step of the restore procedure stands and by which bounded command it searches — is answered as an autonomous choice (Q1):
   - The step stands inside step 8 of "Restoring over the server's database" in `.claude/skills/loop2-deploy/references/backup_and_restore.md` (step 8 is the one that already undoes what the restore gave back), after step 6, not before it. The reason: the read-only command that prints the addresses runs in the game container, which runs again only after step 6, and the deployment of step 6 appends the log of the stopped container to `/var/log/loop2-app.log` before it replaces the container (D-355).
   - The search is by fixed strings, in the manner of the bounded commands at `.claude/skills/loop2-deploy/SKILL.md:277`: `grep -F` on the file, `zgrep -F` on its generations, and `docker logs` of the running container piped through `grep -F`, for the three markers `password-set`, `account-blocked` and `account-unblocked`, taking the lines newer than the time of the backup.
   - Where the log of the deployment of step 6 (`/var/log/loop2-deploy.log`) shows a `warning:` for the append of the stopped container's log, the lines of that container are lost, and the step says so: the human then treats the period of that container as unknown and says so in what he writes down.
   - Rejected: a step before step 6 that reads the stopped container with `docker logs` — it adds work while the game is down and a second place to read.
   You may refine the wording, never the placement or the three markers; if you find a fact that contradicts the placement, return `questions` with the evidence.
4. The writing of each entry follows the pinned element skill, as `task-cycle/skill/foundation_step.md` gives (read it whole): `.the-way/elements/decisions/skill/SKILL.md` for a decision, `.the-way/elements/invariants/skill/SKILL.md` for an invariant. A skill those files name by its name alone is the `SKILL.md` whose frontmatter `name:` is that name.

## What to read

- The whole of `task-cycle/skill/foundation_step.md` (path `.the-way/task-cycle/skill/foundation_step.md`).
- The index of the selected decisions: `.runs/task-cycles/wpisy-serwera-kopii-i-testow/decision-index.md` (sections of the server, the backup and restore, the testing discipline and the account server, and the parts `product-foundation`, `agent-workflow`, `deployment`, `test-helpers`). Open whole, from `foundations/decisions.md`, each decision the task changes — D-15, D-360, D-235, D-109, D-112, D-49, D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-80, D-81, D-82, D-83, D-84, D-85, D-87, D-88, D-89 — with its *Rationale* and *Rejected*, and those it relies on without change: D-355, D-356, D-137, D-13, D-154, D-231, D-351, D-362, D-31.
- The invariants the task changes, whole, from `foundations/invariants.md`: `cross-part-imports`, `tracked-file-private-names`, `account-email-nodemailer-starttls`; and `browser-failure-report`, which guards the route of D-109. The glossary and the part map of the parts you touch (`foundations/glossary.md`, `foundations/part_map.md`).
- `guidelines/testing.md`, whole (the task changes its lines at 60 and 354).
- The two copies of the skill `loop2-deploy`: `.claude/skills/loop2-deploy/SKILL.md` and `.claude/skills/loop2-deploy/references/backup_and_restore.md`, whole, and their copies under `.agents/skills/loop2-deploy/`.
- `deploy/loop2-watch`, `tests/deploy/watch_script_support.py` and `deploy/loop2-backup` as far as the wording of D-235 and the testing guidelines needs them, and `src/server/account-routes.ts:391-441` as far as the wording of D-109 needs it. Quote nothing from them into entries beyond what a decision's sentence must say.

## Boundaries

- The foundation step and the code of this task are the same work: write every entry of the task whole, in the place its row or item names, and the skill and guidelines edits, then return before review. Return step is a later stage and is not yours now.
- Do not run the product's full gate (`npm test`): the orchestrator runs it after the review. Run the focused checks that your edits call for: `python -B .the-way/elements/common/foundation_check.py` (report its result as it prints it, with its exit code), the check of the instruction files for the skill copies, `python -B .the-way/instruction-files/check_instructions.py`, and any test of the repository that reads the two skill copies or `guidelines/testing.md` (find them by a search for the file names in `tests/`). Report each with its command and exit code.
- Commit on the task branch, with `git add <path> …` by path (never `-A`, `.` or `-a`), and English commit messages in the form of the repository's recent commits (`docs: :memo: …`). Do not commit anything under `.runs/`. Check that the commit's author address is the one the repository's recent commits carry.
- Tell the weakest point of your own work in the report (the requirement most likely to be wrong, the check you made on it and what it showed).
