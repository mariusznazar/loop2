# Handoff - the return step of correction 1, task `katalog-map`

You take the return step for what correction 1 touched, as a fresh agent with `make-change`. The person who requested the cycle has delegated intermediate choices to the orchestrator; nothing you are told is the
human's approval. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`, head `1054b372` (confirm). Commit by path (`git add <path>...`, never `-A`, `.`, `-a`), messages in English in the repository's style, push nothing, no full gate.
  Commit only what the return step must correct or write; if nothing, commit nothing and say so.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`; your stage is the return step, no code), `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md`, each whole; the `SKILL.md` of an element when you write an entry of it. Foundation entries only through those skills.
- The correction: range `720d1d2a465bbd6b3c731041d4dcae471fab5766..1054b372` (compute `git diff`/`git log`). The remarks it answers: `.runs/task-cycles/katalog-map/reports/correction-1-remarks.md`; its report (claims to verify): `.runs/task-cycles/katalog-map/reports/correction-1-report.md`;
  the frozen task `.runs/task-cycles/katalog-map/task.md`; the first return step's report `.runs/task-cycles/katalog-map/reports/return-step-report.md` (for what was already compared; do not repeat it, only what the correction changed or touched).
- Do: compare with the code the entries the correction writes or changes (D-327, D-331, D-325, D-39, D-279, D-133, D-438, the fact and the invariant lines for the magnifying-glass icon, `icon-credits`, `foundations/part_map.md` if a file moved, the styleguide section „The screen Mapy"), those the task names, and the entries your own search of the foundation
  finds by the names and words the correction adds (the card's heading, the state tag, the tables „Żąda"/„Teren", „Wejdź — wybierz postać", the fold row, the picked row's green bar, `withPreposition`, the magnifying glass, `positive`'s meaning); correct what no longer matches; write what the return step must.
  The pairs of examples and `tests:` clauses: a part a test now holds leaves the pair and is named by `tests:` (check each decision the correction touched, and the ones whose quoted sentence a test line carries). The correction's report says it **extended the meaning of the role `positive` in D-39 and wrote an exception into D-279** so that the picked row has a green bar:
  check that those sentences are true of the code and that no other decision or styleguide sentence says that green or `positive` is never used for a picked mark; correct what is false. Do not decide for the human whether the extension stays: report it (it goes to the human at the merge).
- Report path: `.runs/task-cycles/katalog-map/reports/return-step-2-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line: your status. It holds the record's *Return step* items for this correction (foundation compared with code, decisions, invariants,
  environment facts, glossary terms, part-map changes, projected entries, rows of settlements - each or none), the commands with exit codes (`python -B .the-way/elements/common/foundation_check.py` without a flag and `python -B .the-way/instruction-files/check_instructions.py`, exit 0 expected), **Unread material**, **Searches not found or unclear** (each `none` or the items).
  Your directory for working copies: `.runs/return-step-2/`.
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
