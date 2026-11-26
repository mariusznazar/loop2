# Handoff - reviewer of the D-448 correction, task `katalog-map`

You review one commit of a task cycle of the-way as an agent that made none of it. The person who requested the cycle has delegated intermediate choices to
the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human. You are read-only on the product.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole. Your directory for working copies: `.runs/review-d448/`.
- Range: `be5bebc7d85495cba14944f5d69d53a81890dac9..f53f2409` (compute `git diff` and `git log` yourself; confirm `git rev-parse HEAD` is `f53f2409`).
  It changes `foundations/decisions.md` only: the decision D-448 ("How may a map differ from the map that opens it?").
- What was asked of the author (the source, a copy of the day's advisor's note, relayed on behalf of the human): `.runs/task-cycles/katalog-map/reports/d448-source.md`
  (read whole). It cites the re-approved project definition, whose entry "(new) — How may a map differ from the map that opens it?" is the text to compare with:
  `the project definition in the author's notes` (read the entry; the file is a private note: you may read it, but quote
  nothing of it into your report beyond the words of D-448 itself, and no absolute path of it).
- Author's report (claims to verify): `.runs/task-cycles/katalog-map/reports/foundation-report.md`, last section "Addition 2026-11-25: D-448 from the re-approved definition".
- Check: (1) the second paragraph, the *Rationale* block and *Rejected* stand word for word as the definition (and the note) gives them; (2) Scope and Relations
  unchanged from before the range; the first paragraph unchanged; (3) the *Verification* examples measure with one character on both maps and keep the form the
  decisions skill (`.the-way/elements/decisions/skill/SKILL.md`) asks; (4) nothing else in `foundations/` was changed; (5) word limits and the foundation check
  (`python -B .the-way/elements/common/foundation_check.py`, exit 0 expected) and `python -B .the-way/instruction-files/check_instructions.py` (a warning is a finding);
  (6) places that the new measure makes untrue and that the author reports (the `loop2-balance` skill's paragraph at `.claude/skills/loop2-balance/SKILL.md` about when a map
  is harder, and its `.agents` copy; D-438's third paragraph and its test quotation) - grade whether they are a finding of this change (they lie outside the range's
  files) and say where each lies.
- Report path: `.runs/task-cycles/katalog-map/reports/review-d448-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files
  named `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>`; checks with commands and exit codes; **Unread material**; **Searches not found or unclear**.
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
