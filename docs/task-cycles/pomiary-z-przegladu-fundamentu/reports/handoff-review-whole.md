# Handoff — review of the whole change

**Worktree:** `the root of the task's worktree`, branch `task/pomiary-z-przegladu-fundamentu`. Work from its root. Read-only: change no file of the repository, commit nothing.

**Method and variant:** `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), variant **the review of the whole change**; read `.the-way/task-cycle/review/whole_change.md` when the SKILL names it. Pin `55afa8e57aa1b83c77108576a36642722e0dda15`.

**Range:** base `aa0ecd09a1037e3aff0ac2bcfc786f2707352929`, head `72817471` (confirm `git rev-parse HEAD` is `72817471` fully expanded before you go on). Route: one author without a plan; no spec, no plan, no slices. The task did not move the pin.

**Frozen task (read whole):** `.runs/task-cycles/pomiary-z-przegladu-fundamentu/task.md` — independent, no projected entries; four rows of *Settlements to record* (rows 1–4 = *To do* items 1–4). *Out of scope* binds: D-03, D-75, the chronicle in the save, a measurement of the reload rarity.

**Author's report:** `.runs/task-cycles/pomiary-z-przegladu-fundamentu/reports/author-report.md` (status `done with concerns`). It is a set of claims to verify, not evidence.

**Answers of step 4:** trust boundary — no; irreversible operation — no.

**Gaps the orchestrator carries to you:** the author did not read the part-map entries of `product-foundation` and `browser-view`, nor the end of D-347's *Rejected*, and read the glossary only in part. You select your own foundation, so read what you need of them. The author's own checks: `foundation_check.py` exit 0, `npm test -- tests/view/memory-limit.test.mjs` 37 pass; the product's full gate is the orchestrator's and is run after this review.

**What to check in particular (the orchestrator's selection, not a grade):**
- Source fidelity: every figure in the seven edited decisions and in the comment of `tests/view/memory-limit.mjs` against the frozen task's *Context*, word for word with its conditions; no figure the *Context* does not give.
- The author's report names choices that go beyond replacing a figure (its section "Choices", items 1, 2, 4 and 6). Judge each against the task's rows, the *Out of scope* list, the decisions' own text before the change (`git show aa0ecd09:foundations/decisions.md`) and whether a decision still says what it must, without leaving a sentence that contradicts the new text or states something the measurement does not support.
- Whether any other sentence of the foundation or the guidelines still gives the old figures or says the chronicle size is unmeasured (search the whole repository outside `.runs`, `.the-way`, `node_modules`, `dist`).
- Form of the decisions by the pinned decision template and `foundation_check.py`.

Write your full report to `.runs/task-cycles/pomiary-z-przegladu-fundamentu/reports/review-whole-change.md` as the method gives it; its first line is `PASS <sha>`, `FAIL <sha>` or `questions`. Return the first line, the checks you ran with command and exit code, and the path. Include **Unread material** and **Searches not found or unclear**; `none` is an answer.
