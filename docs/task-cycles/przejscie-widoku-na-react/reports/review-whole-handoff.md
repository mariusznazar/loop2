# Handoff — reviewer of the whole change

**Stage:** the review of the whole change, `review-change`. You did not make this change. You are read-only: you change no file of the repository (your report is the one file you write), and you return `PASS <sha>` or `FAIL <sha>` as the method gives it. Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`), `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. Work from its root.

**Range to review:** `d850f76063c1f7a302b89d0b89e1fca72682be6d..46e572174b32814af91fe17f3405d4383392caee` (`git diff d850f76063c1f7a302b89d0b89e1fca72682be6d..46e572174b32814af91fe17f3405d4383392caee`, `git log d850f76063c1f7a302b89d0b89e1fca72682be6d..46e572174b32814af91fe17f3405d4383392caee`). Read the full diff of the range.

**Frozen task, spec, plan:** `docs/task-cycles/przejscie-widoku-na-react/task.md`, `docs/task-cycles/przejscie-widoku-na-react/spec.md`, `docs/task-cycles/przejscie-widoku-na-react/plan.md` (the slice sections and the *Foundation entries* are what the change is judged against).

**Reports of the agents that made the range (read them):**
- `docs/task-cycles/przejscie-widoku-na-react/reports/foundation-entries-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-slice-1-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/designer-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/designer-report-2.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/spec-reviewer-report-2.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/planner-report.md`

**Answers of step 4:** trust boundary — yes for the change as a whole: `scripts/kitchen-sink.mjs` (part `build-tools`, the developer's preview server) is a trust-boundary file; check crafted input at that boundary where the range touches it. Irreversible operation — no (the change only prepares none).

**Known state, not a finding:** `python -B .the-way/elements/common/foundation_check.py` is red until slice 12 deletes `tests/view/react-controls.test.mjs` (39 errors, all quotations of the old sentence of D-265 in that file); the product's whole `npm test` is the orchestrator's alone, so you run focused checks only, each reported with its command and exit code.

**Reports and working copies:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/review-whole-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`), its first line `PASS <sha>` or `FAIL <sha>`. Your working copies, if any, in `.runs/review-whole/`; the paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** the report's first line, its path, the findings graded as the method gives them, the checks you ran with command and exit code, **Unread material** (what this handoff names, or for you your own selection, that you left unread or read in part, or `none`) and **Searches not found or unclear**, and the working copies. You start no next stage and ask no human.

**Review of the whole change.** You are the fresh reviewer that made none of it, on the strongest class. Read the full diff of the range. You select your own foundation and guidelines by "Reading the foundation" (`.the-way/elements/common/way_of_working.md`) and the product's guidelines by `.the-way/product-guidelines/reading.md`, by the parts of the change (`browser-view`, `build-tools`, `agent-workflow`, `product-foundation`); in your report state how many decisions you read whole and how many by title only. Judge every slice (only slice 1 had a review of its own, `reports/review-slice-1-report.md`: `PASS 7c0fda9f`; its two Minor findings are in the task of the return step and the request's list), and name for each blocking finding the slice it comes from, or that it comes from none. Judge coverage of every item of *To do* of the task (1–8), every row of *Settlements to record* (3) and the carried question, and the fidelity to the sources (the task's answers to questions 1–6, the spec, D-323, D-262, D-381, D-407, D-265, D-269).

**The slices, their heads and their agents (the plan is in `plan.md`; every report is in `reports/`):**
| Slice | Range | Report |
|---|---|---|
| foundation entries (nine decisions) | `d850f760..e3a58f45` | `foundation-entries-report.md` |
| 1 kitchen-sink bundled (own review) | `e3a58f45..7c0fda9f` | `executor-1-report.md`, `review-slice-1-report.md` |
| 2 kitchen-sink in React | `7c0fda9f..d3c20034` | `executor-2-report.md` |
| 3 account-screen structural assertions | `d3c20034..6cbdc8b7` | `executor-3-report.md` |
| 4 two assertions of the uncaught-failure test | `6cbdc8b7..fc00bda6` | `executor-4-report.md` |
| 5 the constant of the warning sentence | `fc00bda6..f0e6eea9` | `executor-5-report.md` |
| 6 the saver's sentence as a value, row of saving | `f0e6eea9..51f26f01` | `executor-6-report.md` |
| 7 the page's state as one value | `51f26f01..db8f0f3f` | `executor-7-report.md` |
| 8 the waiting screen in a React root | `db8f0f3f..5c4ce66b` | `executor-8-report.md` |
| 9 the sentences above the game | `5c4ce66b..1bffa4e6` | `executor-9-report.md` |
| 10 the row of the failure | `1bffa4e6..4437ebd7` | `executor-10-report.md` |
| 11 the test of the React forms | `4437ebd7..6839f5b1` | `executor-11-report.md` |
| 12 the DOM forms deleted | `6839f5b1..7226e369` | `executor-12-report.md` |
| 13 the guidelines | `7226e369..46e57217` | `executor-13-report.md` |
The reports of slices 2–13 and of the foundation entries are yours to read (no slice but 1 had a review of its own). The classes of the executors were: foundation entries, slices 1, 2, 6–11, 13 `sonnet` (same); slice 3 `opus` (strongest, because the size script counts the 344 000-character test file whole: the plan's *Choices* and `cycle.md` Q1); slices 4, 5, 12 `haiku` (cheaper).

**Material the orchestrator carries to you from the reports — judge each; none is a verdict:**
1. **Slice 7 (`app.ts`, state as one value) changed four things that the slice's goal said stay as today; three of them have no test:** (1) a card is created before the card it replaces is closed (D-381 asks the card to be created, focused and closed by the page "as today"); (2) after an error nothing handled, a reset that succeeds with a game standing now closes that game, which before stayed and went on saving (D-323: "the game then takes no change but goes on saving the state it held"; the invariant `uncaught-failure-game-state`); (3) a saver outcome of a game built by a reset, arriving while the old game's logout still waits, now acts at once on the new game, where it was held and dropped (D-402); (4) the bar is redrawn only when its props differ from the last ones. Compare the page before (`git show d850f760:src/browser/view/app.ts`) with the page after, transition by transition, and say which of the four changes a requirement, a decision or an invariant forbids.
2. **Slice 8**: no repository test holds the focus on „Spróbuj ponownie” after a repeated refusal, nor that it is the same button element across a retry (the spec's Decision 3 and finding F4 of the spec's review require both); the executor confirmed them by a throwaway check (`reports/executor-8-waiting-check.mjs.txt`) and in a real browser. Judge whether this needs a test now.
3. **Slice 9**: the sentence after „Zacznij od zera”, a `positive` sentence and a refused-load sentence could not be brought about on the local start; check them by the code and the tests of the account screen (`tests/view/account-screen.test.mjs`, `previous-save.test.mjs`).
4. **Slice 10**: the case of the failure row against any root passed before the code existed; the executor showed it can fail (a `show()` that does nothing). Whether a screen reader announces the row turning from hidden to shown is assumed in the spec's Decision 1, not checked.
5. **Slice 12**: the executor's comparison of the deleted test's React-form cases with `tests/view/shared-controls.test.mjs` was a grep on a few points. Compare them case by case: every case of the deleted `tests/view/react-controls.test.mjs` (`git show d850f760:tests/view/react-controls.test.mjs`) that protects a behaviour or an attribute of the React form a decision names has its place in the new file, and each *Verification* line that said "both forms" (D-44, D-275, D-276) has a case on the React form.
6. **Slice 4**: the executor added an assertion that a tick after the error reads no clock, and read the styleguide in part; the case's own-work check did not break the product. Check the two removed assertions are the two the task means (finding M-4 of request #62) and that the remaining case still protects the behaviour.
7. **Slice 13**: three headings of the guidelines were renamed, D-407 and D-265 were added to two rules' *Decision* lines, and the meaning of the `copy` status for the files in `controls/` was reworded from D-265, where the task's question 4 a says the statuses of the table stay. Judge whether each is the guideline following the change or a meaning the task did not settle.
8. **Slice 2 and the kitchen-sink page**: the page types an empty text into the number-field sample after its first draw (the spec's Decision 6 and its settlement N1); the forced hover and focus samples; the one outline rule with its two selectors (`browser-view-focus-outline`). The page has no test; the executor checked it in a real browser.
9. **The foundation entries**: their writer left unread D-253, D-36 and D-96, D-276's *Rejected* in part and three invariants in part. Read the entries against the task's settlements and the spec's *Foundation entries*; D-276's *Rejected* ("in both forms of the control (D-265)") and D-264's rationale ("the screens still in DOM") are known untrue now and go to the return step — do not count them as findings of this review, but say if you find another entry the change makes untrue.
10. **Slice 3 and the size of its reading** (Q1 in the record); **slice 1's Minor findings** (the two entries of point 9).
11. The commit `1bffa4e6` has `D-096` in its message for `D-96`; commit messages are not checked.

**Known state, not a finding:** the product's whole `npm test` is the orchestrator's alone and has not run yet (it runs after the return step, on the signal `start` of the adviser of the day); you run focused checks only, each reported with its command and exit code. The foundation check (`python -B .the-way/elements/common/foundation_check.py`) exits 0 now; the check of the instruction files is part of the gate.

**Trust boundary:** `scripts/kitchen-sink.mjs` was judged by the review of slice 1; check that nothing after it (slice 2 and the rest) changed the script or the served paths again (`git diff 7c0fda9f..46e57217 -- scripts tsconfig.kitchen-sink.json`).

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

