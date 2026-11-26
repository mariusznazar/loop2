# Handoff — review of the whole change, task `edytor-programu-modale`

**Delegation.** The person who requested this cycle has delegated intermediate choices to the orchestrator. You review; nothing you return is that person's approval.

**Worktree and range.** Work from the root of `the task's worktree` (branch `task/edytor-programu-modale`; process pin `.the-way` at `b502011f53225451ddf121e2b772a903b87492db`). Review the range `a566f5d52210085d9c5e94d4878815bd6c1ebc54..f124f5f4` (four commits: `05e30198`, `85466a8c`, `46383db1`, `f124f5f4`), reading the full diff. You are read-only: change no file of the worktree.

**Method.** Read `.the-way/task-cycle/review/SKILL.md` whole and follow it, in the variant "the whole change". Read a file it names only when the step that names it comes. Return `PASS <sha>` or `FAIL <sha>` as the report's first line, with graded findings and the checks you ran. You select your own foundation and guidelines by the parts of the change (the part `browser-view` only) as `.the-way/elements/common/way_of_working.md` "Reading the foundation" gives, and `.the-way/product-guidelines/reading.md` gives the guidelines; the decisions of the task's *Decisions in play* that the change alters, each whole with its *Rejected*, are to be read. State how many decisions you read whole.

**Inputs.**
- Frozen task, all of it: `.runs/task-cycles/edytor-programu-modale/task-frozen.md` (its *To do* 1–9, *Acceptance criteria*, the answers of *Questions to settle*, *Questions carried to cycle*, *Decisions in play* and *Settlements to record* rows 1–12 each bind and each is to be covered).
- The author's report: `.runs/task-cycles/edytor-programu-modale/reports/author-report.md`. Its screenshots lie in the public repository `mariusznazar/screenshots` at the addresses it lists; you may open them to judge the look.
- No spec, no plan, no slice reviews: one author without a plan; the whole change is one range. No Minor or out-of-scope findings come from earlier reviews.
- Base: the base is newer than the commit 1dce073d that the task's code references name (PR #179 `paski-parametrow` merged since); judge against the base.

**Answers of step 4.** Trust boundary: no. Irreversible operation: no. The task did not move the pin.

**What the orchestrator found in the author's report that bears on your review (it names gaps; it judges none of them).** The author did not read whole the invariants of `browser-view` and `every` (read their headings; ran the tests of `browser-view-token-values`, `browser-view-focus-outline` and `function-and-file-size`); did not read `foundation-index.md`; did not read `rule-drag.ts`, `discovery-rule.ts` and `end-window.tsx` (not changed) and read several test files only in part; did not check in a browser the window of a rule standing while the end-of-run window stands, nor Firefox, Edge or a real phone (held in jsdom tests). Its concerns: the window's look is the same `panel` with a `divider` frame as the area behind it, so it sets off little; the *Rationale* of D-166 still says „the panel of a rule opens in place under its row (D-288)”. The author's choice 4 hides the header's „✕” by `:nth-last-child(-n + 2)`; its choice 2 takes rows out of reach with `inert` read from boxes after every commit. Check these against the task and the foundation yourself. The orchestrator ran no check of the code; checks you cite are yours.

**Your own checks.** Run focused checks yourself where a finding needs them (`npm test -- <file>` for the touched test files, `npm run typecheck`, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`); the product's full gate is not yours to run. Where you want to see the running game, `.claude/skills/loop2-play/SKILL.md` gives how, in a browser of your own and in your directory.

**Working copies (word for word from the cycle's method).**

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

Your directory for working copies is `.runs/review-whole/`. A screenshot you take is a working copy, not shown to the human: keep it there and remove it before you return; remove a worktree with `git worktree remove --force` then `git worktree prune`, by paths written out in full, never through a shell variable; state in the report where each copy stood and that it was removed.

**The record.** `cycle.md` and the other files of the record directory are not yours to read unless named here.

**Report.** Write the full report to `.runs/task-cycles/edytor-programu-modale/reports/review-whole-report.md` (the file is the input of the cycle's scripts; the case Claude Code's rule about report-named files leaves open). Its first line is `PASS <sha>` or `FAIL <sha>`. Carry: the findings graded as the method gives, with, for each blocking finding, the mark `Contradiction: yes` or `no` and the settlement it contradicts, and "from no slice" since there are no slices; the Minor findings within the task apart from those outside the task's scope; the coverage of every *To do* item, settlement row and the acceptance criterion; the checks with command and exit code; how many decisions you read whole; **Unread material** and **Searches not found or unclear** (each `none` or the items); the working copies line. Return your first line, the report's path and a one-line check result.
