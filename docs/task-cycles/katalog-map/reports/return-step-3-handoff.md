# Handoff - the return step for the fix of correction 1, task `katalog-map`

You take the return step for the last fix of correction 1, as a fresh agent with `make-change`. The person who requested the cycle has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval.
Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`; the code head is `8725b92d` (later commits of the branch only add and remove the copy of the cycle's record under `docs/task-cycles/`; confirm with `git log`).
  Commit by path (`git add <path>...`, never `-A`, `.`, `-a`), messages in English in the repository's style, push nothing, no full gate. Commit only what the return step must correct or write; if nothing, commit nothing and say so.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`; your stage is the return step, no code), `.the-way/task-cycle/skill/return_step.md` and `foundation_step.md`, each whole; the `SKILL.md` of an element when you write an entry of it. Foundation entries only through those skills.
- What the return step covers: the fix range `523046f6..8725b92d` (commits `69d98b19` the card moved to `src/browser/view/map-card.tsx`; `bf3e933a` the title token `--font-size-map-card-title` in `src/browser/tokens.css` and the hand-written `goalText` of the five maps in `src/browser/sim/data/maps.ts`; `8725b92d` D-327, D-133 and the styleguide).
  The earlier return step for the correction ran on `1054b372` (report `.runs/task-cycles/katalog-map/reports/return-step-2-report.md`; do not repeat it). The fix's report: `reports/fix-whole-2-report.md`; the review of the fix: `reports/review-whole-4-report.md`; the findings: `reports/findings-whole-2.md`; the frozen task: `.runs/task-cycles/katalog-map/task.md`.
  The human's decision on the one blocking finding that remained (R1 of `review-whole-4-report.md`): **keep the code and D-327 as they are despite the finding; change neither the code nor D-327's list of departures from the old card** (the missing creature icon in the heading and the phone's bottom bar are for a later task). The remarks: `reports/correction-2-remarks.md`. So do not edit D-327's sentence on the departures even though it is untrue by that finding; report it.
- Do: compare with the code the entries the fix writes or changes (D-327, D-133, the token's `Source:` comment and the invariant `design-token-sources`, the styleguide's card item and the rule "Every value with its source", the decisions on the card's content and sentence, D-24/D-18 for the new data field `goalText`, `foundations/part_map.md` if a file moved - `map-card.tsx` is new),
  those the task names, and the entries your own search of the foundation finds by the names and words the fix adds (`goalText`, `map-card`, `--font-size-map-card-title`, the short sentence of the demand, „dwa pokonane wilki", the card's module); correct what no longer matches, except D-327's departure list; write what the return step must (an entry for a choice that binds after the merge, a glossary term used in a new meaning, a fact for a source outside the product the fix rests on: the old Loop's page is the source of the token and already stands as a source in the styleguide's rule - check whether the foundation holds it as a fact and whether the token's `Source:` comment names what that rule asks).
  Pairs of examples and `tests:` clauses: a part a test now holds leaves the pair and is named by `tests:`; check each decision the fix touched (D-327, D-133) and the tests that quote their sentences.
- Report path: `.runs/task-cycles/katalog-map/reports/return-step-3-report.md` (the report file is the input of the cycle's scripts, the case Claude Code's refusal of files named `report...` leaves open). First line: your status. It holds the record's *Return step* items (foundation compared with code, decisions, invariants, environment facts, glossary terms, part-map changes, projected entries, rows of settlements - each or none), the commands with exit codes
  (`python -B .the-way/elements/common/foundation_check.py` without a flag and `python -B .the-way/instruction-files/check_instructions.py`, exit 0 expected), **Unread material**, **Searches not found or unclear** (each `none` or the items). Your directory for working copies: `.runs/return-step-3/`.
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
