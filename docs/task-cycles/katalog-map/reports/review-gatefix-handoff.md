# Handoff - reviewer of the fix of the red gate, task `katalog-map`

You review one commit of a task cycle of the-way as an agent that made none of it. The person who requested the cycle has delegated intermediate choices to
the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human. You are read-only on the product.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`. Method: `.the-way/task-cycle/review/SKILL.md`
  (`review-change`), read whole. Your directory for working copies: `.runs/review-gatefix/`.
- Range: `f53f24093c35adc49abcc9860c42b240c1b57266..07f2577f` (compute `git diff`, `git log`; confirm `git rev-parse HEAD` is `07f2577f`). It changes
  `tests/invariants/test_map_run_tiles.py` only. Author's report (claims to verify): `.runs/task-cycles/katalog-map/reports/fix-gate-report.md`.
- Why: the cycle's full local gate (`npm test`) at `f53f2409` failed on one test, `test_tripwire_every_map_and_resource_is_written_out` in that file: the data
  hold the new maps `forestPack` and `forestLair` and the file's `MAP_RESOURCES` did not. The fix adds both with their resources and stocks written out by hand, and
  changes the driver's solved maps so that the maps can be sent (the author reports it went beyond the instruction: `send: map forestPack is not available` otherwise).
- Judge: (1) the added resources and stocks are right for the two maps' data (`src/browser/sim/data/maps.ts` and the resources' data: stock per tile, which resources each map lists),
  written out by hand, not computed from the code under test, as `guidelines/testing.md` (read whole) requires; (2) the tripwire itself is untouched and still checks
  every map; (3) the driver's change keeps the test meaningful (the invariant `map-run-tiles` in `foundations/invariants.md`, read whole, and the docstring stay true); (4) run
  `npm test -- tests/invariants/test_map_run_tiles.py` (exit 0 expected) and mutate in a copy that a wrong stock fails the test; (5) the foundation check
  `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` exit 0.
- Report path: `.runs/task-cycles/katalog-map/reports/review-gatefix-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named
  `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**.
  Return the first line, the checks, the report path.
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
