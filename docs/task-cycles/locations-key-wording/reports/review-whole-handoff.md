# Handoff — the review of the whole change, `review-change`

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. Nothing here is that person's approval. You are an agent that made none of this change. You report to the orchestrator, never to a human, and you change no tracked file.

## Where

- Worktree (work only here, from its root): `.runs/worktrees/locations-key-wording`, branch `task/locations-key-wording`.
- Range to review: base `ba67f04503afc56dc965bd197897b0a8f2adbeae` to head `02526a59` (three commits: `aacbbf16` AGENTS.md, `68745036` D-362 in `foundations/decisions.md`, `02526a59` invariant `tracked-file-private-names` in `foundations/invariants.md`).
- Your directory for working copies: `.runs/review-whole/` of the worktree.
- Your report: `.runs/task-cycles/locations-key-wording/reports/review-whole-report.md`; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`. It is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the write is refused, return the whole report as your answer.
- `cycle.md` and the other files of `.runs/task-cycles/locations-key-wording/` are not yours to read except those this handoff names.

## Method

Read `.the-way/task-cycle/review/SKILL.md` whole (method `review-change`) — the review of the whole change — and a file it names only when the step or variant that names it comes. You select your own foundation entries and guidelines by the parts the change touches (`.the-way/elements/common/way_of_working.md`, "Reading the foundation"); the change touches the parts `agent-workflow` (`AGENTS.md`) and `product-foundation` (`foundations/**`). State in the report how many decisions you read whole. You read the full diff of the range.

## What you get

- The frozen task, whole: `.runs/task-cycles/locations-key-wording/task.md` (status `ready for cycle`, independent; *To do* items 1–3, two answered questions, *Decisions in play*, *Settlements to record* row 1 → "sentence of D-362", *Out of scope*). No spec, no plan: one author without a plan, one route, no slice reviews of their own, so you judge the whole change.
- The author's report: `.runs/task-cycles/locations-key-wording/reports/author-report.md` (the author: `the-way-author`, class `same` as the orchestrator's).
- The orchestrator's mechanical check: clean tree, 3 commits, 3 files changed (7 added, 7 removed lines), the word diff shows exactly 18 swaps of `entry`/`entries` → `key`/`keys` (and `an` → `a` where the article needed it). Given as information, not as a finding. The author's unread items — the-way's glossary read by heading only, D-13, the part map, the `examples.md` of the decisions and invariants elements — and its search item (no glossary entry for "key" in the pinned the-way) go to you as a gap to judge: say whether any of them bears on the change.
- The two answers of step 4: the change touches no trust boundary and holds no operation that cannot be undone.
- The task does not move the pin of the-way; `.the-way` stays at `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- Settlement and entry marks to check: D-362's sentence is marked `row 1`; the invariant is marked `the cycle's` (its change comes from the task's question 2 and item 3, no row). Judge whether both marks and the meaning sentences in the author's report are right and whether the change's meaning is unchanged. Check source fidelity against the task word by word: every "entry" that means a name under `loop2` in the locations file changed; every "entry" that means an entry of the foundation stayed.

## Checks you may run (read-only)

`python -B .the-way/elements/common/foundation_check.py` and `python -B .the-way/instruction-files/check_instructions.py` from the worktree root, with their commands and exit codes in the report. You run no full gate (`npm test`; the worktree has no `node_modules`); CI is the final gate of this cycle.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

## Report form

As `review-change` gives it, with graded findings (each with its place, the slice it comes from or that it comes from none, the mark of contradiction with the settlements where it applies, and whether it is outside the task's scope), the checks with command and exit code, **Unread material** (what your own selection left unread or read in part, or `none`), **Searches not found or unclear** (or `none`), and the line on working copies.
