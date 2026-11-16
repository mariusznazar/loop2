# Handoff — reviewer of the whole change

**Stage:** the review of the whole change, `review-change`. You did not make this change. You are read-only: you change no file of the repository (your report is the one file you write), and you return `PASS <sha>` or `FAIL <sha>` as the method gives it. Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`), `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. Work from its root.

**Range to review:** `f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa..80cdb843` (`git diff f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa..80cdb843`, `git log f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa..80cdb843`). Read the full diff of the range.

**Frozen task, spec, plan:** `docs/task-cycles/przejscie-widoku-na-react/task.md`, `docs/task-cycles/przejscie-widoku-na-react/spec.md`, `docs/task-cycles/przejscie-widoku-na-react/plan.md` (the slice sections and the *Foundation entries* are what the change is judged against).

**Reports of the agents that made the range (read them):**
- `docs/task-cycles/przejscie-widoku-na-react/reports/return-step-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-fix-1-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-whole-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/foundation-entries-report.md`

**Answers of step 4:** trust boundary — yes for the change as a whole: `scripts/kitchen-sink.mjs` (part `build-tools`, the developer's preview server) is a trust-boundary file; check crafted input at that boundary where the range touches it. Irreversible operation — no (the change only prepares none).

**Known state, not a finding:** `python -B .the-way/elements/common/foundation_check.py` is red until slice 12 deletes `tests/view/react-controls.test.mjs` (39 errors, all quotations of the old sentence of D-265 in that file); the product's whole `npm test` is the orchestrator's alone, so you run focused checks only, each reported with its command and exit code.

**Reports and working copies:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/review-return-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`), its first line `PASS <sha>` or `FAIL <sha>`. Your working copies, if any, in `.runs/review-return/`; the paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** the report's first line, its path, the findings graded as the method gives them, the checks you ran with command and exit code, **Unread material** (what this handoff names, or for you your own selection, that you left unread or read in part, or `none`) and **Searches not found or unclear**, and the working copies. You start no next stage and ask no human.

**Review of the return step's range.** The return step (`reports/return-step-report.md`, method `.the-way/task-cycle/skill/return_step.md`) compared the foundation with the code and committed three things: `937e4b0a` (decisions D-402, D-262, D-276, D-264, D-269, D-407 in `foundations/decisions.md`), `6df956ae` (two comments of tests that now quote the foundation, no assertion changed) and `80cdb843` (one `decision: D-402 "…"` line in `tests/view/previous-save.test.mjs`, and D-402's *Verification* naming those cases in `tests:`). Judge the range against the frozen task, the reviewed spec and the entries the return step writes or corrects: each sentence it wrote says what the code at the head does and what the cycle chose (read the code: `src/browser/view/app.ts`, `waiting-screen.tsx`, `header-rows.tsx`, `page-sentences.tsx`; the cases that hold each sentence), and none states a rule the task, a decision or the human did not set; the clause `tests:` names tests that hold the sentence; the shortened pairs of examples keep only a part no test holds; the quotations (`decision: D-xxx "…"`) are exact and the foundation check passes; no assertion of any test changed; the three decisions the cycle writes after the merge (D-402's second paragraph on a reset after an error and on the outcome of the game a reset built; D-262's paragraph on focus and the retry button) are within the settlements and choices the record holds (`cycle.md` Q2, the spec's Decision 3 and finding F4 of its review). The foundation step's nine entries and the code were judged before; here judge only what this range changed, and say if the range makes another entry untrue.

The reaches of the earlier reviews that bear on you: n1, n2, n3 of `reports/review-fix-1-report.md` are what this range answers; M1, M2 of `reports/review-slice-1-report.md` (D-276 *Rejected*, D-264 *Rationale*) too. Do not re-review the earlier ranges.

## Current ranges (decisions and invariants; `foundations/decisions.md` moved when the foundation step wrote its entries)

Current ranges in the worktree (the foundation step moved `foundations/decisions.md`; where a range in the *Read* differs, these hold):

- D-03: `foundations/decisions.md:44-57`
- D-36: `foundations/decisions.md:534-547`
- D-43: `foundations/decisions.md:4527-4540`
- D-44: `foundations/decisions.md:4542-4555`
- D-45: `foundations/decisions.md:4557-4570`
- D-47: `foundations/decisions.md:4587-4600`
- D-76: `foundations/decisions.md:841-854`
- D-96: `foundations/decisions.md:2717-2730`
- D-97: `foundations/decisions.md:2732-2755`
- D-156: `foundations/decisions.md:3061-3086`
- D-157: `foundations/decisions.md:3088-3099`
- D-207: `foundations/decisions.md:3580-3647`
- D-208: `foundations/decisions.md:3649-3675`
- D-209: `foundations/decisions.md:3677-3722`
- D-210: `foundations/decisions.md:3724-3757`
- D-211: `foundations/decisions.md:3759-3799`
- D-225: `foundations/decisions.md:3295-3333`
- D-253: `foundations/decisions.md:1739-1788`
- D-261: `foundations/decisions.md:2863-2885`
- D-262: `foundations/decisions.md:2887-2927`
- D-263: `foundations/decisions.md:354-372`
- D-264: `foundations/decisions.md:1211-1270`
- D-265: `foundations/decisions.md:3985-4031`
- D-266: `foundations/decisions.md:374-412`
- D-267: `foundations/decisions.md:4033-4060`
- D-269: `foundations/decisions.md:4062-4092`
- D-273: `foundations/decisions.md:4747-4778`
- D-274: `foundations/decisions.md:4780-4824`
- D-275: `foundations/decisions.md:4826-4857`
- D-276: `foundations/decisions.md:4859-4903`
- D-280: `foundations/decisions.md:4123-4191`
- D-286: `foundations/decisions.md:4299-4318`
- D-288: `foundations/decisions.md:8579-8653`
- D-289: `foundations/decisions.md:8891-8930`
- D-323: `foundations/decisions.md:4320-4333`
- D-381: `foundations/decisions.md:2954-2969`
- D-395: `foundations/decisions.md:4335-4348`
- D-402: `foundations/decisions.md:3925-3938`
- D-407: `foundations/decisions.md:4350-4365`

- invariant application-build-kitchen-sink: `foundations/invariants.md:498-506`
- invariant preview-server-access: `foundations/invariants.md:568-576`
- invariant browser-view-focus-outline: `foundations/invariants.md:468-476`
- invariant browser-view-token-values: `foundations/invariants.md:458-466`
- invariant browser-view-framework: `foundations/invariants.md:35-43`
- invariant uncaught-failure-game-state: `foundations/invariants.md:1228-1236`

