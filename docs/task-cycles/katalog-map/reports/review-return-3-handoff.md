# Handoff - reviewer of the return step of the fix, task `katalog-map`

You review the commits of the return step as an agent that made none of it. The person who requested the cycle has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human.
You are read-only on the product.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`. Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole: the return step's commits are reviewed against the task and the foundation entries the return step writes or corrects.
  Your directory for working copies: `.runs/review-return-3/`.
- Range: `1e44e946..20b4471f` (compute `git diff`, `git log`; confirm `git rev-parse HEAD` is `20b4471f`). One file: `guidelines/styleguide-browser-view.md`. The return step's report (claims to verify): `.runs/task-cycles/katalog-map/reports/return-step-3-report.md`; its handoff (what it was asked, and the human's decision not to change D-327 and the code):
  `.runs/task-cycles/katalog-map/reports/return-step-3-handoff.md`; the method it followed: `.the-way/task-cycle/skill/return_step.md`.
- Check: (1) the added words in the rule "Every value with its source" are true: the token `--font-size-map-card-title` in `src/browser/tokens.css` has a `Source:` comment naming the old Loop's page, the element and the reading date 2026-11-26, and the styleguide says the same; (2) the sentence agrees with the other sentences of the rule and with the invariant `design-token-sources` (read `foundations/invariants.md`, that entry, and its test `tests/invariants/test_design_token_sources.py`: run it, exit 0 expected);
  (3) the return step left no entry it should have written or corrected: read the report's "what matched without change" and judge from the fix range `523046f6..8725b92d` (`git diff`) whether D-327, D-133, D-18, D-24, the part map and the glossary are in agreement with the code, EXCEPT D-327's sentence that the card departs from the old card "in six things only", which the human decided to keep despite the review's finding R1 (do not report it again);
  (4) `python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` exit 0 (a warning is a finding).
- Report path: `.runs/task-cycles/katalog-map/reports/review-return-3-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**. Return the first line, the checks, the report path.
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
