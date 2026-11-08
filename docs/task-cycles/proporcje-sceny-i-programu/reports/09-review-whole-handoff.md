# Handoff 09 — reviewer of the whole change (stage: review of the whole change)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of `implement-task`. You did not make any part of this change. You never ask the human; a question goes back to the orchestrator in your report (first line `questions`). Grade and scope are yours alone.

## What you review
- The whole change of the task branch `task/proporcje-sceny-i-programu` in the worktree `the worktree's root` (shell: Windows 11, Git Bash or PowerShell; read-only for you — never change the reviewed worktree, its index or its branch; run any check that needs changed files in a separate worktree of the head commit under `.runs/`, delete it afterwards).
- Range: base `01b26d54d1fea63de8570ca854814ff8e564048c` (the target branch `main` when the task began) to head `38dfa8c` (confirm with `git rev-parse HEAD` that it is `38dfa8c…`; compute the diff yourself as `git diff 01b26d5..HEAD` and `git log 01b26d5..HEAD`; never `HEAD~1`).
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole; variant: the whole change — read `.the-way/task-cycle/review/whole_change.md` and follow it. Read `.the-way/task-cycle/review/fix.md` only if its step comes (it does not).
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/09-review-whole-report.md`. Its first line is `PASS <head sha>` or `FAIL <head sha>` and nothing else (or `questions`). Return only the first line, the counts of blocking, Minor and out-of-scope findings, a one-line check result naming what failed or did not run, and the report path.

## Answers of the cycle's step 4 (tell your review of risk)
- Trust boundary: no (the part map's boundary of `browser-view` is `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; the change touches none). Irreversible operation: no.
- Open design choice: none judged; reserved choice: none.

## The inputs
- Frozen task, whole: `docs/task-cycles/proporcje-sceny-i-programu/task.md` (the original lives in the author's private notes).
- Plan, whole: `docs/task-cycles/proporcje-sceny-i-programu/plan.md` (six slices; the orchestrator added `.claude/skills/loop2-play/SKILL.md` and one sentence to slice 5 after slice 4's report). Its *Choices* are the orchestrator's autonomous choices; judge them.
- The ranges and who made them. **No slice had a review of its own: this review is the only one each gets (WAY-136).**

| Part | Range | Report |
|---|---|---|
| Foundation entries (nine decisions, one new) | `01b26d5..189d589` | `docs/task-cycles/proporcje-sceny-i-programu/reports/02-foundation-report.md` |
| Slice 1 — the rule list draws the panel under its row/header | `189d589..a5aa424` | `reports/03-slice1-report.md` |
| Slice 2 — Programy keeps two columns | `a5aa424..6ee2e7f` | `reports/04-slice2-report.md` |
| Slice 3 — one scene size | `6ee2e7f..f9a5b86` | `reports/05-slice3-report.md` |
| Slice 4 — the screen of a map run in two columns | `f9a5b86..d737a1a` | `reports/06-slice4-report.md` |
| Slice 5 — what the move leaves behind | `d737a1a..df84a1d` | `reports/07-slice5-report.md` |
| Slice 6 — the styleguide | `df84a1d..38dfa8c` | `reports/08-slice6-report.md` |

  (All report paths are in `docs/task-cycles/proporcje-sceny-i-programu/reports/`.) The reports are claims to verify, not evidence.
- Mismatches the orchestrator's mechanical check passed on (information; each slice's changed files equal its *Change* list, with slice 5's list extended by the orchestrator): slice 3's plan note that the size case would fail first did not hold (the size was already 672; its failing test asserts that no scale is exported); slices 2 and 5 read some changed files by region, not whole, and slice 3 read `guidelines/coding.md` and `guidelines/testing.md` only through a header; slice 2 wrote no row case in `tests/view/account-screen.test.mjs` (covered by slice 1's tests); slice 2 reasoned the narrow-window behaviour under 1100 px from code, not from a browser.
- Checks not made by the executors, all of which the orchestrator will run after your review: the full `npm test`. Do not repeat it. Browser checks that the executors report as performed: slice 2 (Programy at 1280 px), slice 4 (the screen of a map run at 1280, 1074, 1073 and 1000 px, the badge over the mage, the question at „Zakończ”). Slice 1 had none (both screens still gave the panel a host); slice 3's badge check was carried to slice 4.
- No slice review exists, so there are no Minor or out-of-scope findings of slice reviews to carry.

## What you select yourself
You alone select your foundation and guidelines (WAY-150, WAY-213): the entries of the parts the change touches by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` (the parts: `browser-view`, `agent-workflow` for `guidelines/**` and `.claude/skills/loop2-play/SKILL.md`, `product-foundation` for `foundations/decisions.md`), and the guideline files by `.the-way/product-guidelines/reading.md`, each whole. The change writes guidelines (`guidelines/styleguide-browser-view.md`) and decisions: compare them as section 2 of the method and `product-guidelines/template.md` give. Judge the foundation entries the change writes or changes (D-288, D-311, D-282, D-19, D-338, D-343, D-345, D-346, D-334, new D-349) against the code, and against the three rows of *Settlements to record* and the task's *Decisions in play* — each row whole, its meaning the row's (WAY-134).

## Notes for the cut (from the cycle's record, not conclusions)
- Check source fidelity: the task's figures 526 px and 622 px are arithmetic of the task, not requirements; the foundation step was told to keep them out of the entries. The executor of slice 4 measured 526 px in a headless browser with an overlay scrollbar and noted that a classic scrollbar of about 15 px would leave the program 15 px narrower.
- Outside any slice's *Change* list the executors left, as they report: the comment at `src/browser/view/game-view.ts:647` and the comment at `src/browser/styles.css:1865`, `scene.tsx` headers; the slice 6 executor asks whether D-349 should be cited in the scene paragraph of the styleguide; the slice 1 executor reports that the panel remounts when it changes place, so its field state resets when the open rule moves with „↑”/„↓” across a group border. Judge each yourself, with evidence; grade as section 3 gives.
- Out of the task's scope (do not grade as missed): the place of the end of the map run (question 6; task 16).

## Return
Per the method: first line `PASS <head sha>` or `FAIL <head sha>`; findings by grade with place, reasoning and evidence; for each blocking finding the slice it comes from (number and commit), or that it spans slices (name them), or that it comes from none; each Minor finding with its place in the code and its own words, saying where a Minor finding lies outside the task; **Declined to judge**; each check you ran (command and exit code) and each you could not run; each reach beyond this handoff; **Searches not found or unclear**.
