# Handoff - reviewer of the second D-448 correction, task `katalog-map`

You review one commit of a task cycle of the-way as an agent that made none of it. The person who requested the cycle has delegated intermediate choices to the orchestrator;
nothing you are told is the human's approval. Questions go to the orchestrator, never to the human. You are read-only on the product.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`. Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole.
  Your directory for working copies: `.runs/review-d448b/`.
- Range: `07f2577faf97d6d4ee1f1dcc044cfce9b46b21a1..ecd239e0` (compute `git diff`, `git log`; confirm `git rev-parse HEAD` is `ecd239e0`). It changes `foundations/decisions.md` only.
- Asked of the author (relayed by the day's advisor on behalf of the human): in the *Verification* of D-448 the `violates` example loses the qualification ", where its solving condition holds no new rule"
  (the re-approved definition has none: every map is harder than the map that opens it, also one with a new rule in its solving condition); nothing else changes. Author's report (claims to verify):
  `.runs/task-cycles/katalog-map/reports/foundation-report.md`, last section.
- Check: (1) the diff removes exactly that clause and nothing else; (2) the remaining `violates` and the `complies` example are well-formed and consistent with the second paragraph of D-448, which the
  previous correction wrote (`be5bebc7..f53f2409`); (3) word limits and `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py`
  exit 0 (a warning is a finding); (4) does the removal leave anything in the foundation, tests or the `loop2-balance` skill that quoted the clause or relied on it (search) - report, grade by the review's rules.
- Report path: `.runs/task-cycles/katalog-map/reports/review-d448b-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open).
  First line `PASS <sha>` or `FAIL <sha>`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**. Return the first line, the checks, the report path.
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
