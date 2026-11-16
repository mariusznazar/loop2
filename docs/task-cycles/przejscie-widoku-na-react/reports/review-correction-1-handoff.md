# Handoff — reviewer of the whole change

**Stage:** the review of the whole change, `review-change`. You did not make this change. You are read-only: you change no file of the repository (your report is the one file you write), and you return `PASS <sha>` or `FAIL <sha>` as the method gives it. Method: read `.the-way/task-cycle/review/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions`.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`), `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. Work from its root.

**Range to review:** `d850f76063c1f7a302b89d0b89e1fca72682be6d..4f6947425b2f1af1c29de6b4181e731fbba69914` (`git diff d850f76063c1f7a302b89d0b89e1fca72682be6d..4f6947425b2f1af1c29de6b4181e731fbba69914`, `git log d850f76063c1f7a302b89d0b89e1fca72682be6d..4f6947425b2f1af1c29de6b4181e731fbba69914`). Read the full diff of the range.

**Frozen task, spec, plan:** `docs/task-cycles/przejscie-widoku-na-react/task.md`, `docs/task-cycles/przejscie-widoku-na-react/spec.md`, `docs/task-cycles/przejscie-widoku-na-react/plan.md` (the slice sections and the *Foundation entries* are what the change is judged against).

**Reports of the agents that made the range (read them):**
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-whole-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-fix-1-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-return-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/review-return-fix-report.md`
- `docs/task-cycles/przejscie-widoku-na-react/reports/correction-1-remarks.md`

**Answers of step 4:** trust boundary — yes for the change as a whole: `scripts/kitchen-sink.mjs` (part `build-tools`, the developer's preview server) is a trust-boundary file; check crafted input at that boundary where the range touches it. Irreversible operation — no (the change only prepares none).

**Known state, not a finding:** the product's whole `npm test` is the orchestrator's alone, so you run focused checks only, each reported with its command and exit code; the foundation check (`python -B .the-way/elements/common/foundation_check.py`) exits 0 at the head.

**Reports and working copies:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/review-correction-1-report.md` (this absolute path, inside the worktree; never a path under the main checkout `the main checkout's .runs/`), its first line `PASS <sha>` or `FAIL <sha>`. Your working copies, if any, in `.runs/review-correction-1/`; the paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Return:** the report's first line, its path, the findings graded as the method gives them, the checks you ran with command and exit code, **Unread material** (what this handoff names, or for you your own selection, that you left unread or read in part, or `none`) and **Searches not found or unclear**, and the working copies. You start no next stage and ask no human.

**The correction's review: a fresh reading of what the review of the whole change left unread.** You are a fresh reviewer: you did not make the change and did not write `reports/review-whole-report.md` (`PASS 46e57217`), whose **Unread material** says it read 2 of the 61 decisions of its index whole (D-265, D-269) and the rest by binding sentences, and ran through the headings of 257 more without opening them. The human's remark that started this correction (`reports/correction-1-remarks.md`, item 3) asks for this reading and binds you:

> A fresh reviewer reads whole the decisions of the index that the review did not read and compares each with the change; anything it finds that the change contradicts is fixed in this same correction (code or entry, whichever the foundation requires), and the request lists the result under Checks. A finding that needs Mariusz's choice goes under "Needed from you", not into the code.

**What you do, in this order:**
1. Build the index of the selection the review of the whole change built, for the parts the change touches (`browser-view`, `build-tools`, `agent-workflow`, `product-foundation`) and the topical sections of the decision log on the browser view's screens and controls, the kitchen-sink page, the start page and its waiting screens, the login card, saving and the saver's outcomes, the reset, the failure handling, the page's roots and the view's tests: `python -B .the-way/elements/common/decision_index.py --output .runs/review-correction-1/index.md --sections` lists the sections; then `--section <heading> …` for each you take, `--part browser-view --part build-tools --part agent-workflow --part product-foundation`, and `--decision D-<nn>` (the form `D-03`, not `3`) for each decision the earlier review or the task names: the nine the change writes (D-03, D-44, D-265, D-269, D-275, D-276, D-323, D-381, D-407), D-402, D-262, D-264, D-96, D-97, D-208, D-209, D-211, D-225, D-261, D-280, D-281, D-286, D-253, D-36, D-45, D-47, D-76, D-352, D-213, D-207, D-210, D-157. The earlier review's index held 61 decisions in full and 257 by heading; yours holds at least those, and you may hold more.
2. Read **whole**, each from its heading to the next heading with its rationale, *Rejected* and *Relations*, every decision the index lists in full, and every one of the others whose title points to a bearing on the change; the nine the change writes are read as they stand at the head (`git show HEAD:foundations/decisions.md`), whole, and not by the diff. State in your report how many decisions you read whole and how many by title only, as the method asks.
3. Compare each decision with the change (the range below, and the code at the head; the change is the end of every line of `git diff d850f76063c1f7a302b89d0b89e1fca72682be6d..4f6947425b2f1af1c29de6b4181e731fbba69914`; the commits `aa424573` and `4f694742` only add and remove the record's copy, and the final tree holds no record): does the change contradict it, make it untrue, or leave it unchecked by a test it names? Name each finding with the decision's identifier, the sentence, the place in the code, and the grade the method gives; say for each whether a fix is in the code or in the entry and which the foundation requires; a finding that needs the human's choice (a decision that cannot be both kept and followed, a rule only the human sets) is marked `needs a choice` and is not fixed by a code change.
4. Also read whole, as the earlier review did not: the invariants and the glossary entries that name the browser view, the controls, the kitchen-sink page or the failure handling, and `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` and `src/browser/AGENTS.md` whole.

Items 1 and 2 of the human's remarks (the screen reader, the screenshots) are let through: do not review them again. The decisions the change itself wrote or corrected were reviewed by two earlier reviewers; you read them whole as they stand and judge them against the rest of the log.

The earlier reports you may read for what they say about the change (not to repeat them): `reports/review-whole-report.md`, `reports/review-fix-1-report.md`, `reports/review-return-report.md`, `reports/review-return-fix-report.md`.

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

