# Handoff — the reviewer of the whole change (stage `review-change`)

## Who asks and what you may decide

The person who requested this cycle delegated the intermediate choices to the orchestrator. You did not make the change; you review it and only read: no edit of the code, the spec or the foundation, no commit. The reviewer alone grades and scopes findings.

## What is reviewed, method, worktree

- **The whole change** on the route of one author without a plan (no slices): range from the base `9e13af95af4fa77445eccfe3e50a28e00c2adaf0` to the head `0785c763896565f0ccd3f2323e4fb44eee5a17ac` of the branch `task/podzial-sterownika-widoku`. The task did not move the pin, so there is no pin commit and no check it carried.
- Method: read whole `.the-way/task-cycle/review/SKILL.md` and follow it, variant **the whole change**: read `whole_change.md` beside it as it says; read other files it names when their step comes.
- Worktree (work from its root): `the root of the task's worktree`. The pinned the-way is its `.the-way` at `ec7929d02164c8754f0236d93db52624688967e6`. Dependencies are installed.
- Report path: `.runs/task-cycles/podzial-sterownika-widoku/reports/review-whole-report.md`; its first line `PASS <sha>` or `FAIL <sha>` as the method gives.
- Your directory for working copies: `.runs/review-whole/`.

Working copies (copied word for word from the cycle's skill):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
> clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
> directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
> in the system's temporary directory, in the scratch directory of a session or in the main checkout
> of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
> itself under its session's directory is moved into the agent's directory and the original removed.
> The files that a product's own tools and tests make by themselves are no working copy of the agent
> and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a
> worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside
> its report what the report needs, and states in the report where each copy stood and that it was
> removed. Where a removal fails, the agent finishes all the same and names in the report the
> remainder, with its full path and the reason it stayed.


## Material

- Frozen task (read whole): `.runs/task-cycles/podzial-sterownika-widoku/task-frozen.md`. Coverage of every *To do* item, each *Acceptance criterion*, each row of *Settlements to record* (three decisions) and source fidelity are yours to judge; the task's *Out of scope* binds.
- The reviewed spec: `.runs/task-cycles/podzial-sterownika-widoku/spec.md`; its reviews: `reports/spec-reviewer-report.md` (FAIL, three findings) and `reports/spec-reviewer-revision-report.md` (PASS). The text first reviewed is `spec-reviewed.md`.
- The author's report (read whole, and its **Unread material**): `reports/author-report.md`. The author's differential driver is kept beside it as `reports/author-diff-driver.mjs`; you may reuse it to check the claim that the player sees nothing change (build the base in a copy under your own directory).
- Answers of step 4: touches a trust boundary — no; holds an irreversible operation — no; open design choice — settled by the spec; reserved choice — none.
- Slices: none. The author wrote the foundation entries (decisions D-407, D-408 and D-409, commit `0785c763`) as the foundation step; judge them as part of the range.
- The author could not run the quality cases `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools missing on this machine; both also fail on the base, where the orchestrator ran the gate: failing on the base are exactly these two). The orchestrator runs the full gate later; you run no full gate (no `npm test` without an argument). Focused checks are yours to run as the method allows: one test file as `npm.cmd test <path>` (Windows), `npm.cmd run typecheck`.
- Gap carried to you from the author's report: it read only 11 of the 46 decisions on its list whole. Its list of the unread ones (read whole those that bear on the change): D-03, D-04, D-07, D-28, D-88, D-96, D-97, D-173, D-208, D-211, D-212, D-217, D-225, D-247, D-250, D-267, D-280, D-281, D-282, D-283, D-284, D-287, D-295, D-311, D-322, D-339, D-342, D-346, D-352, D-368, D-383, D-395, D-396, D-401, D-402. Judge the preservation of what each says in the code, in particular D-173, D-311, D-322, D-368 (question and end-of-run window), D-281/D-283/D-284 (leaving and returning to the screen of a map run), D-295/D-339 (shared memory of the page), D-401/D-402 (pull and reset).
- The spec's reviewers noted: the author reports that the spec's sentence "`send` is a moment even where the send is refused" does not hold in the code (`send` throws while a run stands) and the test says what holds; and the closed import list of decision 1 names some types one by one. Judge both.
- The author chose that the registry has no list of all screen kinds (it throws at creation for a duplicate kind and at `show` for a screen no entry holds), that the Przejście entry calls `syncWindow()` after `openWindow`, `closeWindow` and `effectEnded` even where the state did nothing, and that D-408 and D-409 hold `Rejected: unknown`; see its report, section *Choices*. Judge each against the task and the foundation.

## What to return

The report's first line, the report path, and in the report: the changed files with their added and removed line counts, the count of decisions read whole and read by title only, **Unread material**, **Searches not found or unclear** (`none` where none), every reach beyond this handoff, each check you ran with command and exit code, and the working copies line.
