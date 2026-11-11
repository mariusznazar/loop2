# Handoff — the review of the whole change

Delegation: the person who requested this cycle delegated the intermediate choices to the orchestrator; its go-aheads are provisional, never the human's approval.

You did not make this change. Stage: `review-change`, "the whole change". Read `.the-way/task-cycle/review/SKILL.md` whole and `.the-way/task-cycle/review/whole_change.md` (the skill names it for this review), and a further file only when the step that names it comes. Read-only: change nothing in the worktree and commit nothing.

Worktree (work from its root): `the repository's root`, branch `task/repo-na-zrzuty`. Range: base `a4015546163f24f82f4694830fcad457efa1caf2` to head `16f6b32` (two commits: `51ce2e5` foundation entries, `16f6b32` the skill, both copies). One-author route: no spec, no plan, no slices.

Frozen task (read whole): `.runs/task-cycles/repo-na-zrzuty/task.md`. Author's report: `.runs/task-cycles/repo-na-zrzuty/reports/author-report.md`.

Answers of the start: trust boundary — no (parts agent-workflow and product-foundation have none); irreversible operation — no (nothing is pushed, no repository created by the change; the later push of screenshots is a decision the human accepted, row 2). The process pin is `e3825a8`; `WAY-316..319` and `WAY-219` are decisions of the-way in `.the-way/foundations/decisions.md`.

Report path: `.runs/task-cycles/repo-na-zrzuty/reports/review-whole-report.md`; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`. Return that first line, the changed files with line counts, the checks you ran with command and exit code, and the path. The report holds **Unread material**, **Searches not found or unclear** and the counts of decisions read whole and by title (WAY-150).

## Where to look hard (the orchestrator's selection; you select your own foundation too)

- Source fidelity: each of the task's *To do* items 1–3 and *Settlements to record* rows 1–5 against the entries and the skill text; the task's words in D-357, D-358, D-359 and the two facts of rows 4 and 5.
- The author reports two places where the task's wording and the sources it found differ: row 5 ("by repository") against the code (the nearest directory upward holding `.playwright`), and row 4 ("the directory the session started in") against the README ("workspace root"); the author followed the sources. Judge whether that departs from the accepted settlements, or only makes them exact.
- The author made choices beyond the task's wording: the push goes to a branch `loop2/<cycle>` of the screenshots repository, not to `main` (a global pre-push hook on this computer blocks `main`); the directory of a cycle is the cycle's name under `.runs/task-cycles/`; a fifth fact `screenshots-repository-visibility` and an External-context row in the part map that no row of the task asks for; D-359 as a new decision narrowing D-254, with D-254 not edited; `Origin: none` in the three decisions. Judge each against the task's scope and the element skills' rules.
- The skill's text for an agent: nothing in it holds an access value or a real account's data; screenshots show only the made-up accounts of the local start (D-13); the links in the description use a file in a commit with `?raw=true`; both copies byte-identical.
- Gaps the author reports in its **Unread material**, which you cover yourself: the invariants whose *Part* names agent-workflow, product-foundation or `every` (the author listed the *Part* lines and read none whole; a *Part* continuing on a second line may have been missed), the glossary entries (the author read none), `.the-way/elements/environment-facts/skill/draft.md` (the author did not read it and took the source from the template), `.the-way/elements/decisions/skill/projected.md`.
- Mutation in the head: where a requirement of the task has no test, say so and whether the testing guidelines call for one (the author wrote none, and reasons that this is prose for agents).

## Checks already failing on the base

None once the quality venv stands. `python -B .the-way/elements/common/foundation_check.py` gave `0 errors` on the base and `0 errors` after the change by the author's report; `npm test` does not run it. The orchestrator runs the full gate; do not run `npm test`.
