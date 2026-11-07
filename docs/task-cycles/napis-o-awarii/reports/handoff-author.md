# Handoff — the one author, task `napis-o-awarii` (loop2 MVP2, task 8)

You are the one author of the whole change, without a plan. Variant of `make-change`: **the whole change as the one author**.

## Delegation

Mariusz asked for this task cycle (`/the-way-implement-task`) and delegated the intermediate choices to the orchestrator. Nothing here is the human's approval. Ask no one for design, spec, plan or review decisions; a question goes to the orchestrator in your report with status `questions`.

## Where you work

- Worktree (work only here, from its root): `C:\Storage\repos\loop2-wt\napis-o-awarii`, branch `task/napis-o-awarii`, base `5694146` (`main`). `.the-way` is initialized at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`, the commit the gitlink records.
- Dependencies are installed (`npm ci`) and `.runs/quality-venv` exists. Python: `python`.
- Method: read `C:\Storage\repos\loop2-wt\napis-o-awarii\.the-way\task-cycle\change\SKILL.md` (the project skill `the-way-make-change`) whole, and a file it names only when the step or variant that names it comes. The foundation step is `.the-way\task-cycle\skill\foundation_step.md` (read it whole); write every entry through the project skill of its element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-record-glossary-term`, `the-way-update-part-map`), never by hand. The edit of `guidelines/coding.md` goes through `the-way-maintain-coding-guidelines`.
- The cycle record is the orchestrator's; do not read or write `.runs/task-cycles/napis-o-awarii/cycle.md`.
- Commit on the task branch, with `git add <path> <path>` by explicit paths (never `git add -A`, `.`, or `commit -a`). Commit messages in English, in the form of the existing commits of the repository (`git log` shows it); several commits are fine. Do not push. Do not touch anything outside this worktree.

## The task

The frozen task is `C:\Storage\repos\loop2-wt\napis-o-awarii\.runs\task-cycles\napis-o-awarii\task-frozen.md` (task document accepted by the human 2026-11-07). Read it whole: *Need*, *To do* items 1–7, *Questions to settle* with their answers, *Context*, *Decisions in play*, *Settlements to record* (rows 1–5), *Out of scope*. It is the authority. Its *Questions carried to cycle* and *Human actions* are `none`.

The task is a plan member (`plan_mvp2_loop2.md`, task 8); its projected entry "How does an agent learn what went wrong in the running game?" is written by task 15, not by you (task *Out of scope*). Rows 1–5 of *Settlements to record* are yours, each whole.

Answers of the orchestrator to the two questions at start:
- Trust boundary: **no** (the change touches none of the files the part map names as trust boundary of `browser-view`). Still, the console line carries kind, code and place of an error and never its `message` or `stack`.
- Irreversible operation: **no**.
- Open design choice: **none**. Choosing how to make what the task settles (names, module layout, how each React root passes its uncaught error on) is yours; record such a choice in your report.
- Design reading of the code is yours too: the task's *Context* is a reading of the code at `b97fdd0`; re-check each cited line against the worktree (`5694146`) before relying on it, and name a mismatch in your report.

## What to read (the orchestrator's selection)

Parts the change touches: `browser-view` (the view, `src/browser/*.ts`, `tests/view/**`, a new invariant test under `tests/invariants/`), `agent-workflow` (`.claude/skills/loop2-play/SKILL.md`, `guidelines/coding.md`), `product-foundation` (`foundations/**`).

- `C:\Storage\repos\loop2-wt\napis-o-awarii\AGENTS.md`, `src\browser\AGENTS.md`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md` (the view modules you add or change), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (the sentence is a piece of user interface; its example of the order of work for an interface change is an example, not a rule).
- Foundation, each whole by its heading in `foundations/decisions.md`: D-252, D-253, D-213, D-96, D-97, D-207, D-208, D-62, D-122, D-132, D-173, D-262, D-286, D-39, D-254, D-264, D-261, D-265, D-211, D-203, D-204, D-259. Invariants of `foundations/invariants.md`: `browser-view-framework`, `document-test-memory-limit`, `node-test-selection`, `expired-session-unsaved-progress`, `saved-state-http-exchange`, `account-client-outcomes`, `account-client-requests`, `browser-view-token-values`, `browser-view-focus-outline`. The part map `foundations/part_map.md` and the glossary `foundations/glossary.md` whole. The environment fact on the Node.js default print `node-uncaught-default-print` (and the facts it links) as the pattern of row 3. Search the whole foundation for entries the new ones touch, as `elements/common/way_of_working.md` "2. Search the foundation" gives, when you write them.
- Code: `src/browser/view/clock.ts`, `app.ts`, `game-saver.ts`, `game-view.ts`, `status-row.ts`, `menu-bar.tsx`, `account-card.tsx`, the other `createRoot` roots of `src/browser/view/*.tsx`, `src/browser/main.ts`, `src/browser/index.html`, and the tests `tests/view/clock.test.mjs`, `game-saver.test.mjs`, `page-document.mjs`, `page-document.test.mjs`, `account-screen.test.mjs`, `menu-bar.test.mjs`. Existing exemplar of a console line: `recordLoadFailure` in `app.ts`.
- `C:\Storage\repos\loop2-wt\napis-o-awarii\.claude\skills\loop2-play\SKILL.md` (the skill whose paragraph item 6 asks for; the project skill `the-way-maintain-instruction-files` is available for the placement and wording of a rule in a skill).

Where the work reaches a part or file not named here, read its guidelines yourself and name the reach in your report.

## What I expect from you

- Make all seven *To do* items and write rows 1–5 of *Settlements to record*: foundation entries per the foundation step (row 4 is an invariant with a test; the other rows are decisions, an environment fact and the addition to D-262), the changes to the part map your new files need (via `the-way-update-part-map`), and the coding-guidelines sentence of item 7.
- Tests in the way `guidelines/testing.md` gives; a test for each behaviour of items 1–5 that the Node test harness with jsdom can show. Where a behaviour can be shown only in a real browser, name it in your report as a manual check of `loop2-play` (`npm run local`, Playwright CLI) and run it: a `console` check of the line, and the sentence on a game screen and on the card, with a screenshot inspection in the report (method, observed result). Evidence goes into the report, none of it into the repository.
- Do not run the full gate (`npm test`): the orchestrator runs it on the reviewed change. Run the focused checks for your files (one file: `npm test tests/view/<file>.test.mjs`; typecheck `npm run typecheck`; lint through the quality tests of your files), each with its command and exit code in the report.
- Do the own-work check and the weakest-point check the method gives and name each requirement checked, the check, and what it showed.
- Write the full report to `C:\Storage\repos\loop2-wt\napis-o-awarii\.runs\task-cycles\napis-o-awarii\reports\author-report.md` as the method gives it, with **Searches not found or unclear**, concerns and every reach beyond this handoff. Return only: status, commits, a one-line check result naming what failed or did not run, and the report's path.
- If the change proves too large for you, or an open design choice or a reserved choice shows, return `returned` with no code, as the method gives.
