# Handoff - the return step, task `katalog-map`

You take the return step of a planned task cycle of the-way, as a fresh agent with `make-change`. The person who requested the cycle has
delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`, head `7abe5a4d` (confirm). Commit by
  path (`git add <path>...`, never `-A`, `.`, `-a`), messages in English in the repository's style, push nothing to the product repository. Commit
  only what the return step has to correct or write; if nothing, commit nothing and say so.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole (its stage here is the return step, no code), and
  `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`, each whole; the `SKILL.md` of an element
  (`elements/<element>/skill/SKILL.md` under `.the-way/`, as foundation_step.md gives) when you write an entry of that element. Foundation entries
  only through those skills.
- The change: range `97936c245cecfc11778fcf3d10feb075436d17fc..7abe5a4d` (compute `git diff`/`git log` yourself). Frozen task (read whole):
  `.runs/task-cycles/katalog-map/task.md`; plan (read whole): `.runs/task-cycles/katalog-map/plan.md`; the foundation step's report
  `.runs/task-cycles/katalog-map/reports/foundation-report.md`; the whole-change review `reports/review-whole-report.md` and the fix review
  `reports/review-whole-fix-report.md` (their foundation-related notes are yours below). The product's gate is not yours: run no `npm test`
  without a file argument; the foundation check `python -B .the-way/elements/common/foundation_check.py` and focused checks are allowed.
- Do: compare with the code the entries the change writes or changes (D-325, D-331, D-134, D-149, D-24, D-327, D-440, D-441, D-271, D-18, D-429,
  D-438, D-448, D-449, D-04, `wall`, the environment facts of the bear pack and of the icon title, `sprite-credits`, `icon-credits`, the part map's
  `browser-view` sentence and its External context row), those the task names, and the entries found by your own search of the foundation by the names
  and words the code adds (`region`, `recordCreature`, `creatureDamage`, `nameWith`, `sink`, `readRecord`, `offerRecord`, `catalogLines`, the catalog,
  the record, `SOLVABLE_SEEDS`, the bear, the lair, `forestPack`, `forestLair`); correct whatever no longer matches; write what the return step must
  (a settlement the code makes true that the foundation step missed; a choice that binds after the merge, where the questions of the decisions template
  give it a place; a glossary term used in a meaning other than its entry's; an environment fact for a source outside the product that the foundation
  does not hold - for example the CC BY 4.0 licence the credit rests on, if the foundation holds none for 4.0).
- Known items for you from the reviews: (a) the invariant `judging-cache-reading` still says "gives a judging" while ten cases of the record carry its
  marker; the fix reviewer's wording proposal: "gives a judging or a record" - an invariant is written only for a rule the task, a decision or the human
  sets (D-440/D-441 set the record's reading), so decide by `elements/invariants/skill/SKILL.md` whether this is a correction of the sentence's reach
  (and do it through that skill, with its test citations) or not, and say which; (b) D-441 was edited by the fixer: a clause on a refused write was added and
  a list was cut from the paragraph about what stays after „Wyloguj" to fit the 600-word limit - check that no true statement of the foundation was lost
  (the first paragraph, the key description and the *Rationale* are said to hold it); (c) the Polish rule for „z”/„ze" before a number is now in code
  (`src/browser/view/counted-name.ts` or `map-lines.ts`): check whether a decision/glossary sentence says anything contradicting it; (d) D-136's
  *Rationale* still holds a sentence that D-448 makes untrue; D-136 is written by task 9 and is OUTSIDE this task: do not edit it; (e) the *Rationale* and
  *Rejected* of D-448 and D-449 were written by the cycle (the project definition was not available to the foundation step; *Rejected* is `unknown`): where
  the task document gives the rejected options (Q5, Q6, the question on how a map may differ), state them; do not invent.
- Report path: `.runs/task-cycles/katalog-map/reports/return-step-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's
  refusal of files named `report...` leaves open). First line: your status. It holds the record's *Return step* items (foundation compared with code: the
  entries compared and each correction, or none; decisions written or changed; invariants written or changed with the task, decision or human that sets its
  rule; environment facts; glossary terms; part-map changes; projected entries written whole or in part; rows of *Settlements to record* written, each
  with its row number and identifier), the commands with exit codes, **Unread material** and **Searches not found or unclear** (each `none` or the items).
  Your directory for working copies: `.runs/return-step/`.
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
