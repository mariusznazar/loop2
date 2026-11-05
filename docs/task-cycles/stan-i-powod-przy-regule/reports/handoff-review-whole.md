# Handoff — review of the whole change (round 1)

## Delegation

The human who requested this cycle (Mariusz) has delegated intermediate choices to the orchestrator
and will review only the finished pull request. You are a reviewer that made none of the change.
You ask the human nothing. You alone grade and scope your findings.

## Your stage

Review the whole change of the task „Stan i powód przy regule w ręcznym przejściu” with the
method `review-change`: read `.the-way/task-cycle/review/SKILL.md` (in the worktree) whole and
follow it, and read a file it names when the step or variant that names it comes. Your variant is
**the whole change**.

- Worktree (read-only for you): `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule`, branch
  `task/stan-i-powod-przy-regule`.
- Process pin: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`. Use project skills with the
  `the-way-` prefix only.
- Range to review: base `18fca47bc1b099ff8a5fbe9d688fabf201b7759f` to head `908c03e` (three commits:
  `0a5ee3e` code and tests, `2c59e0e` foundation entries and styleguide, `908c03e` stryker list).
- Route: one author without a plan, no spec, no plan, no slices; the process pin is not moved by
  this task. The orchestrator runs the product's gate (`npm test`, `foundation_check.py`) after your
  review; run the checks you need for your own judgment, and leave the worktree clean (do not
  change a tracked file; files your checks write must be ignored or deleted).
- Answers of the two questions at start: the change touches **no** trust boundary and holds **no**
  operation that cannot be undone.
- The author's report: `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\reports\report-author.md`
  (the author could not write the file itself; the orchestrator copied its returned text word for
  word). It states, among other things, that the foundation entries were written by reading the
  record skills and their templates and following them by hand rather than as separate skill
  invocations, and that no critique of the set was run (the-way's critique method says the
  foundation diff takes no critique of its own: you read it).

## What to review it against

- The frozen task, whole: `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\task.md`
  (copy of `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\stan_i_powod_przy_regule_loop2.md`).
  Cover every item of its *To do* (1–10), its acceptance criterion, each of its *Questions to
  settle* answers, each row of *Settlements to record* (3 and 4) and each projected entry it carries
  (*Decisions in play*), and source fidelity: the foundation entries must say what the task's
  sources say, nothing the sources do not give.
- Select your own foundation entries and guidelines by the parts of the change, as
  `Reading the foundation` in `.the-way/elements/common/way_of_working.md` and
  `.the-way/product-guidelines/reading.md` give. The parts the change touches by the part map:
  `simulation`, `browser-view`, `product-foundation`, `agent-workflow` (`guidelines/styleguide-browser-view.md`).
- The changes of base-to-task: the task cites code of an older commit (20d804b); task 5 (PR #56)
  has since replaced the program editor, and the author's report says where each reference now lies.

## Report

Write your full report to
`C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\reports\report-review-whole-1.md`
as your method gives it. If the harness refuses that write, return the whole report text as your
answer instead and say so. Return the report's first line (`PASS <sha>` or `FAIL <sha>`),
the status of your checks (each with command and exit code, what failed or did not run) and the
report's path. Include **Searches not found or unclear** (each thing looked for and not found or
unclear, or `none`).
