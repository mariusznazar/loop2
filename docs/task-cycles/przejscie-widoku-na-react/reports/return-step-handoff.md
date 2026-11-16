# Handoff — the return step

**Stage:** the return step, step 11 of the cycle, taken by a fresh agent with `make-change`. Methods, each read whole from `.the-way`: `task-cycle/change/SKILL.md` (`make-change`), `task-cycle/skill/return_step.md` (what the step compares and writes) and `task-cycle/skill/foundation_step.md` (how an entry is written, each by the `SKILL.md` of its element: `elements/decisions/skill/SKILL.md` for a decision, `elements/invariants/skill/SKILL.md`, `elements/glossary/skill/SKILL.md`, `elements/part-map/skill/SKILL.md`, `elements/environment-facts/skill/SKILL.md`). You have no skill tool: every method is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions` in your report.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`); the head is `f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa`; the change you compare with the foundation is the range `d850f76063c1f7a302b89d0b89e1fca72682be6d..f89dbd09a1a21e1c1f49bb5a53f276b309e6e8fa`. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Inputs (read whole):** the frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the reviewed spec `docs/task-cycles/przejscie-widoku-na-react/spec.md`, the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md` (its section *Foundation entries*), the reports of the two whole-change reviews and the slice 1 review in `docs/task-cycles/przejscie-widoku-na-react/reports/` (`review-whole-report.md`, `review-fix-1-report.md`, `review-slice-1-report.md`), the report of the foundation step `foundation-entries-report.md`, and the code as the range leaves it.

**What the step must do, in the orchestrator's reading of what the cycle left to it (the methods are the authority):**
1. Compare the nine entries the foundation step wrote (D-03, D-44, D-265, D-269, D-275, D-276, D-323, D-381, D-407), those the task names (its *Decisions in play*: D-03, D-265, D-269, D-44, D-45, D-76, D-262, D-323) and those that a search of the whole foundation finds, with the code at the head; correct what no longer matches. Known to be untrue now, both found by the reviews: **D-276 *Rejected*** ("keyboard handling written by hand in both forms of the control (D-265)", `foundations/decisions.md`, search it) and **D-264's *Rationale*** ("the cases that walk the page also build the screens still in DOM"). The part map of `browser-view`, `build-tools` and `agent-workflow`, the invariants (`browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `uncaught-failure-game-state`) and the glossary: compare them with the code as well.
2. Choices of the cycle that bind after the merge (WAY-36) and are not yet in the foundation, to write where the questions of the decisions template give them a place, or leave as rows of the questions table where the place is another (the record keeps the table; your report names where each went):
   a. **A reset that succeeds after an error nothing handled closes the game that stood and builds none** (slice 7's code, judged by the whole-change review as in line with D-280 and D-402 and not forbidden by D-323 or the invariant `uncaught-failure-game-state`; the test `tests/view/uncaught-failure.test.mjs` "a reset that succeeds after an unhandled error…" quotes D-323 and the review of the fix says D-323's "saving goes on" speaks of the game that stands). One clause of D-323 or D-402 should say it.
   b. **Focus moves to „Spróbuj ponownie” at every entry into the refused waiting screen, a refusal after a retry included, and the button stays one element across a retry** (spec Decision 3, finding F4 of its review; the test case of fix 1, `tests/view/account-screen.test.mjs:564-622`, points in its comment to "To do 2 of the task", which the testing guidelines forbid: a test quotes the foundation, not a document outside it). A precision of D-262 or D-96, or of the entry where the waiting screen's behaviour is held, and then the case's comment quotes it (a `decision:` quotation as the testing guidelines give, and the foundation check passes).
   c. **A saver outcome of a game built by a reset, arriving while the old game's logout waits, acts at once** (slice 7; D-402 holds only the old game's outcomes): say it where D-402 holds the outcomes, if the decision's text does not already.
   d. The settlement of the spec's Decision 6 (the page types an empty text into its number-field sample, outside React, in its entry module; settlement N1 in `spec.md`) and the way the kitchen-sink page forces hover and focus by a wrapper class: judge whether D-269, D-45 or D-47 should hold them; write where a decision binds later work, otherwise leave them in the record.
3. Two comments of tests that point to the task document, not to the foundation: `tests/view/account-screen.test.mjs` (the m1 case, near line 570, "To do 2 of the task") and `tests/view/uncaught-failure.test.mjs` near line 765 ("To do 4 of the task"). After the entries above stand, make each comment quote the entry (or drop the parenthesis where D-323 already holds the sentence), as `guidelines/testing.md` asks; change no assertion.
4. Where a decision you write carries a pair of examples and a test holds part of its sentence, shorten the pair and name that test in the clause `tests:` of its *Verification* (`return_step.md`).
5. An invariant only for a rule the task, a decision or the human sets; none is expected.

**Not yours:** any code, any other test, any guideline file (the maintenance skills write those; `guidelines/` had its slice), and anything the review findings of the request would add as a foundation entry — the review findings are no entries.

**Rules of this repository (its `AGENTS.md`):** foundation entries only through the record skills' files; `guidelines/testing.md` before you change a test comment; the whole `npm test` is the orchestrator's alone, you run `python -B .the-way/elements/common/foundation_check.py` (green at the head, and it must stay green) and the focused test file of each test comment you change (`npm test -- tests/view/account-screen.test.mjs`, `npm test -- tests/view/uncaught-failure.test.mjs`), each with its command and exit code. Commits: explicit paths only (never `git add -A`, `.` or `commit -a`), messages in English in the form of the history (`docs: :card_file_box: …` with the decisions in a closing parenthesis; `test: :white_check_mark: …`), no push, no force, no amend. Leave the worktree clean. Where you commit nothing, say so and why.

**Read:** the decisions above each whole with *Rationale* and *Rejected*: D-03, D-44, D-45, D-47, D-76, D-96, D-209, D-211, D-262, D-264, D-265, D-269, D-275, D-276, D-280, D-286, D-323, D-381, D-395, D-402, D-407, D-408; the invariants named; the part map entries; the glossary entries of the terms you write. Current ranges in the worktree (the foundation step moved `foundations/decisions.md`; where a range in the *Read* differs, these hold):


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

**Working copies:** directory `.runs/return-step/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/return-step-report.md` (this absolute path, inside the worktree). It holds, in the form of the record's *Return step* section: the foundation compared with code (what no longer matched and its correction, or none), the decisions, invariants, environment facts, glossary terms and part-map changes written or changed, the projected entries written, the rows of *Settlements to record* written, a choice that binds after the merge and where it went; each check with its command and exit code; the own-work check as `make-change` gives it; **Unread material**; **Searches not found or unclear**; the reaches beyond the handoff; the working copies. Return status (`done`, `done with concerns`, `questions`, `blocked`), the commits, a one-line check result, the report's path.
