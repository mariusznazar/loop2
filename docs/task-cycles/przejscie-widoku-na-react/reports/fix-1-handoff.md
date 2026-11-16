# Handoff — the fix of the Minor findings of the review of the whole change

**Stage:** the fix of a review's findings, `make-change`, variant "the fix of a review's findings". You fix the four Minor findings of `reports/findings-whole-minor.md` (m1–m4) and nothing else; where you hold a finding wrong, say so with the evidence instead of changing code. Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file it names only when the step that names it comes. You have no skill tool: it is a file you read.

**Delegation:** the human who requested this cycle delegated every intermediate choice to the orchestrator; there is no human to ask. A question goes to the orchestrator as `questions` in your report.

**Worktree:** `the task's worktree` (branch `task/przejscie-widoku-na-react`); your range starts at the reviewed head `46e572174b32814af91fe17f3405d4383392caee`. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.

**Findings file (the reviewer's words):** `docs/task-cycles/przejscie-widoku-na-react/reports/findings-whole-minor.md` (also `reports/findings-whole-minor.md`). The review that raised them: `docs/task-cycles/przejscie-widoku-na-react/reports/review-whole-report.md` (read the section *The carried material, point by point* for points 1, 2 and 7 and *Findings*, m1–m4). The frozen task `docs/task-cycles/przejscie-widoku-na-react/task.md`, the spec `docs/task-cycles/przejscie-widoku-na-react/spec.md` and the plan `docs/task-cycles/przejscie-widoku-na-react/plan.md` are the sources of what the change must keep.

**What each finding asks, in the orchestrator's reading (the findings file is the authority):**
- **m1:** one case in `tests/view/account-screen.test.mjs` with the four assertions the reviewer lists: focus on „Spróbuj ponownie” at the first refusal; the same element, disabled while it reads „Sprawdzanie…”; the same element at rest after a refusal that follows a retry; focus back on it. Expected values written out in the case (the testing guidelines). Show that the case can fail (the mutations the slice 8 report names: `focusRetry` taken out of `draw`; the button remounted between `refused` and `retrying`), then restore the code.
- **m2:** a case for each of two transitions of the page that slice 7 changed and no test holds: (2) after an error nothing handled, a reset that succeeds closes the game that stood (put it where the page's behaviour after the error is held, `tests/view/uncaught-failure.test.mjs`); (3) a saver outcome (a conflict or a missing session) of the game built by a reset, arriving while the old game's logout still waits, acts at once on the new game (put it in `tests/view/previous-save.test.mjs`, where the reset's cases are held). Each case states its ground in the requirement (D-402, D-280, D-209) and shows it can fail on a change of the code. Product code does not change: where a case shows that the code does not do what the reviewer's comparison says, stop and report it as `questions`.
- **m3:** the comment of `src/browser/styles.css:429` ("One rule for both forms, which carry the class.") made true, as the reviewer's fix says; nothing else in the stylesheet changes (`browser-view-token-values` and `browser-view-focus-outline` stay as they are).
- **m4:** the two places of `guidelines/coding-browser-module.md` (lines 197-201 and 348-349) say what the code does, as the reviewer's fix gives. The product writes guideline files only through the maintenance skills, whose files you read by path as slice 13's executor did (`.the-way/product-guidelines/coding/SKILL.md`, `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md`): no meaning the task did not settle, no new status in the table of files.

**Read:** `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`; `src/browser/view/app.ts`, `waiting-screen.tsx`, `header-rows.tsx`, `src/browser/styles.css` around line 429; `tests/view/page-document.mjs`; the tests you change, in the parts you need; decisions D-402, D-280, D-209, D-323, D-381, D-262 (each whole); the invariant `uncaught-failure-game-state`. Current ranges in the worktree (the foundation step moved `foundations/decisions.md`; where a range in the *Read* differs, these hold):


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

**Rules of this repository (its `AGENTS.md`):** product code, scripts and tests: `guidelines/coding.md` first; tests: `guidelines/testing.md`; files of the part `browser-view`: `guidelines/styleguide-browser-view.md`; `src/browser/`: `src/browser/AGENTS.md`. The whole `npm test` is the orchestrator's alone; run focused checks only (`npm test -- <one file>`, `npm run typecheck`, `npx eslint <files>`, `npx prettier --check <files>`, `python -B .the-way/elements/common/foundation_check.py` for the guideline), each reported with its command and exit code. The foundation check is green now and must stay green.

**Commits:** explicit paths only (`git add <path> …`, never `git add -A`, `git add .` or `git commit -a`); messages in English in the form of the history (`test: :white_check_mark: …`, `docs: :memo: …` with the decisions in a closing parenthesis); no push, no force, no amend. A commit for each finding or group is welcome. Leave the worktree clean.

**Working copies:** directory `.runs/fix-1/`. Paragraph of the cycle, word for word:

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

**Where to write:** your report `docs/task-cycles/przejscie-widoku-na-react/reports/fix-1-report.md` (this absolute path, inside the worktree; never a path under the main checkout). Return status (`done`, `done with concerns`, `questions`, `blocked`), the commits, a one-line check result naming what failed or did not run, the report's path. The report holds each check with its command and exit code, the own-work check as `make-change` gives it, the finding each commit answers, a finding you hold wrong with the evidence, **Unread material**, **Searches not found or unclear**, the reaches beyond the handoff and the working copies.
