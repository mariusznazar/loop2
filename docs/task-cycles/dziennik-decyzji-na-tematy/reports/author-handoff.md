# Handoff — the one author of the change (stage: whole change, foundation step included)

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator. The
orchestrator's answers below are never that person's approval. The cycle has one human contact, the
request; do not ask the human anything. Send questions to the orchestrator by returning `questions`.

## Where you work

- Worktree (your working directory, work only from its root): the root of the task's worktree
- Branch `task/dziennik-decyzji-na-tematy`, base `bea0abc1826ae794664fc6ef09043bae9d062957` (merge of request #137). Commit on this branch only, by explicit paths (`git add <path>`, never `git add -A`, `git add .` or `git commit -a`). Commit messages in English in the style of the repository's log, e.g. `docs: :memo: <what and why> (D-…)`.
- Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink. Do not move it. Point 1 of the task *To do* drops (the pin already stands on the merge of #133).
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Your full report: `.runs/task-cycles/dziennik-decyzji-na-tematy/reports/author-report.md` (write it there, as your method gives it).

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md` (method `make-change`). Your variant, in the words of its row: "the whole change as the one author". Read a file it names (`ui_check.md`, `fix.md`, `slice.md`) only when the step or variant that names it comes — none applies to this change.

You do the foundation step with your change: `.the-way/task-cycle/skill/foundation_step.md`, read whole. The task's *Settlements to record* is `none` and it projects no entry, so the step writes no new entry; the change is a re-ordering of the entries of the decision log under section headings. The log's template and element skill govern the form of what you write: read whole `.the-way/elements/decisions/template.md` (its "Where entries go" holds the section form) and `.the-way/elements/decisions/skill/SKILL.md`. Do not edit the text of any entry.

## Stage and boundary

Make the whole change: points 2 and 3 of the task's *To do* (point 1 drops; point 4 is written by the orchestrator from your report). Stop at the end of your change and the return of your report; do not run the product's full gate (`npm test` — it is the orchestrator's run), do not open a request, do not start the next stage.

## Frozen task and answers of step 4

- Frozen task, read whole: `.runs/task-cycles/dziennik-decyzji-na-tematy/task.md`. It holds the 28 sections (table, question 2), the projected assignment of 403 entries (*Context*) and *Out of scope*.
- Trust boundary: no. Irreversible operation: no. No open design choice; no spec; no plan.
- Decisions in play, read by their number: WAY-18 and WAY-150 of the-way (`.the-way/foundations/decisions.md`; their sentences are quoted in the task's *Decisions in play*). No decision of the game rules the layout of its log. The part the change touches: `product-foundation` (files `foundations/**`). No decision, invariant or guideline of a code part is touched, and no code is written: guidelines of coding, testing and the styleguide are not in your reading.
- The glossary is not touched.

## What the orchestrator found beyond the task

- `main` holds 408 entries, five more than the 403 of the projection: D-410, D-411, D-412, D-413 and D-414 (all five written after the projection). None of the 403 is missing. You assign these five to the 28 sections; name each assignment, and mark as doubtful any whose section is not clear, in your report (the request lists doubtful assignments).
- `foundations/decisions.md` has LF line endings (`git ls-files --eol` shows `i/lf w/lf`), a title line `# Decision log`, entries `### D-NN — question` and at the end `## Withdrawn identifiers`.
- The projected assignment in the task is a starting point, not an approved assignment: check each entry against its own text where the projection says "doubtful" (D-307, D-409, D-362, D-347, D-190, D-214, D-215) and wherever you find a better section; the request will name each doubtful one with the section it went to.

## What to make

1. Rewrite `foundations/decisions.md` so that: the title line stays; then the 28 sections follow in the task's order, each as a `## ` heading with the heading of the task's table, one blank line, the sentence of the table (word for word), one blank line, and its entries; each entry stands in exactly one section; entries keep their numbers; the order of the entries inside a section follows their order in the log before the change; `## Withdrawn identifiers` and its list stay at the end, unchanged.
2. The content of every entry (the block from its `### D-NN — ` heading to the line before the next heading, blank lines at its end aside) and the list of withdrawn numbers stay byte for byte as they are. Write the file by a script that reads and writes bytes or with `newline=''`, so no line ending is changed; keep the script in `.runs/author/`, not in a commit.
3. No other file changes. If you find an entry out of date or wrongly described, do not change it: note it in your report (the task's *Out of scope*).

## Checks you run and report (each with its command and exit code)

- `python -B .the-way/elements/common/compare_log_entries.py <the log of the base> foundations/decisions.md` with the log of the base from `git show bea0abc1:foundations/decisions.md > .runs/author/before-decisions.md`; its exit code must be 0 with no report. Note: the orchestrator reruns it at the end against `main` as it then stands.
- `python -B .the-way/elements/common/decision_index.py --sections --output .runs/author/sections.txt`; read the file: it lists each of the 28 sections with its sentence and the count of its entries; keep the counts for the request.
- `python -B .the-way/elements/common/foundation_check.py` (full, without `--skip-test-citations`): exit 0.
- A count of entries by script: 408 in the log, each once; the sum of the section counts equals 408.
- Output of a script to the console is ASCII and numbers; write texts to a file in UTF-8.

## What your report holds (beyond what the method gives)

- The list of the 28 sections, each with its number of entries.
- The assignment of D-410 to D-414 and the final assignment of the entries the projection called doubtful, each with its section and one sentence of the reason in English.
- Any other entry you moved away from the projection, with the reason.
- The remarks of "Out of scope" kind: entries you saw out of date or wrongly described, by number.
- Your weakest-point check (as the method asks) and your own-work check.
- Sections **Unread material** and **Searches not found or unclear** (`none` where none), and the line on your working copies.

## Working copies

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
