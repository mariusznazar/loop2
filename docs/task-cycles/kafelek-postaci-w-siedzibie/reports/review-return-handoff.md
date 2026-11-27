# Handoff — review of the return step, task kafelek-postaci-w-siedzibie

You are a fresh reviewer of the commits of the return step, as `.the-way/task-cycle/review/SKILL.md` (`review-change`) gives for such a review: you did not make the change; you review the return step's commits against the task and the foundation entries the return step writes or corrects (section 2 of that skill). Read the `SKILL.md` whole; other files it names only when the step or variant that names them comes.

- Worktree (your working directory): `the root of the task's worktree`, branch `task/kafelek-postaci-w-siedzibie`; pinned the-way `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`. `reports/` means `.runs/task-cycles/kafelek-postaci-w-siedzibie/reports/`.
- Range: `aeb2711a686afbdd93e6ab6375a66fc7f0f7dc47..61584722` (one commit, `61584722`; confirm `git rev-parse HEAD`; compute the diff yourself with `git diff aeb2711a..HEAD`). It changes `foundations/decisions.md`: D-42's *Verification* (the green frame of a card in an earning loop moved from its examples to the clauses a test holds).
- The return step's report (claims to verify): `reports/author-return-report.md`. The frozen task: `.runs/task-cycles/kafelek-postaci-w-siedzibie/task_frozen.md` — read in full its *Decisions in play* and *Settlements to record* (row 5 is the D-42 row) and *To do* 5.
- Background: the whole change (`d79ad0b7..aeb2711a`) was reviewed and passed after one fix round (`reports/review-whole-report.md`, `reports/review-fix-1-report.md` are not yours to read). The change wrote D-42's sentence on the green frame of a card; in its first form the Verification of D-42 listed the frame as an example (complies); the return step found a test that now holds it and moved it.
- Select the foundation and guidelines you need as `review-change` gives for a review of the return step (the entry D-42 whole, the entries it links to, `foundations/invariants.md` entries it rests on, the test that the Verification names — read it — and the styleguide's rule "Contrast of every pair"). Judge: that the Verification still says what the entry's tests hold and what they do not; that the test the Verification names exists and checks the claimed case (it is `tests/view/headquarters-screen.test.mjs`: find the case on the green frame read through the real stylesheet and decide whether it is what the Verification says); that no binding sentence changed; that `foundation_check.py` passes; that nothing the return step should have corrected was missed (glossary, part map, other entries — the report lists what was compared: sample it).
- Rules: no full gate (never `npm test` of the whole repository or `gate_times.py`); focused checks only (the Siedziba test file, `foundation_check.py`, `check_instructions.py`); read-only toward the code; leave the worktree clean; stop every background process you start. Your directory for working copies: `.runs/review-return/`; the working-copy paragraph of `reports/review-whole-handoff.md`... is not yours to read, so here it is word for word:

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

- Report: `reports/review-return-report.md`; first line `PASS <sha>` or `FAIL <sha>`; the graded findings with the mark of contradiction with the settlements; the checks with command and exit code; **Unread material**; **Searches not found or unclear**; the line on working copies. `cycle.md` and other files of the record's directory are not yours to read. Return the first line, a one-line check result and the report's path.
