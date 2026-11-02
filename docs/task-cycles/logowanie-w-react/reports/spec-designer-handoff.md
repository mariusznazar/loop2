# Handoff — designer of the spec, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. You send every question to the orchestrator, never to him. You do not seek human approval.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, base 3d366c8. Work from its root. The gate of the base is running there now, so change no tracked file, and do not delete or rebuild `dist/` or `node_modules/`. A trial you need goes in a directory of its own under the ignored `.runs/task-cycles/logowanie-w-react/spec-trials/`, with its own `node_modules`, and you say in the spec what it showed. Trials are for evidence on a choice; they are not the change.

**Method.** Read `.the-way/task-cycle/spec/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your stage is the designer. Your boundary: you return `questions`, `done` with the spec, or `reserved`, before any plan or code.

**Frozen task.** `.runs/task-cycles/logowanie-w-react/task.md`, read whole. Accepted by the human 2026-11-01, written at loop2 48544f0. Lines it cites have moved on the base; `.runs/task-cycles/logowanie-w-react/cycle.md` is not yours to read, so here is what you need of its reconciliation:

- Base holds PR #50 (local start, `scripts/local-start.mjs`, skill `loop2-play`), PR #51 (rules on failures and logs, `guidelines/coding.md` grew by 112 lines) and the pin f45ca40.
- New decisions D-252 to D-258. D-96 and D-213 changed only in the part about an error of the code in a saved game's load.
- `src/browser/view/app.ts`: `showForms` at :268, `root.append(header, main, createFooter());` at :445, „Loop” at :134. `tests/view/account-screen.test.mjs` is 3381 lines. `.claude/skills/loop2-deploy/SKILL.md` „sees the forms again” at :225.

**Answers of step 4.**

- Trust boundary: yes. `package-lock.json` of `build-tools`, partner npm registry; `scripts/kitchen-sink.mjs` may be touched and question 7 of the task forbids its lines that serve files.
- Irreversible operation: no.

**The open design choices.** The task's *Questions carried to cycle* are the choices this spec settles, each with the ways weighed:

1. What replaces the hand-made document model in tests of screens that move to React. The plan says the choice between jsdom and happy-dom falls on this task, not blind. It has to carry the cases that go through the whole page, which build screens staying in DOM too, and `tests/invariants/test_icon_credits.py:82` and `tests/view/icons.test.mjs:124`, which have stand-in documents of their own. The orchestrator has ruled this no reserved choice: a test tool used only by tests, that one task can make and change alone, and which the plan gives to this task. The spec's result is written in `guidelines/testing.md` by the route the task's item 15 gives.
2. How the shared controls of `src/browser/view/controls/` exist in a React screen while other screens keep using them in DOM (D-44), and what the kitchen-sink page then shows.
3. How `src/browser/view/app.ts`, which stays in DOM, mounts and unmounts the card, including the ways the page leaves it: sign-in, cancel of „Ustaw nowe hasło”, and return to it on logout and on D-211.
4. Where the per-module compilation output that tests import stands once D-06 bundles the browser's code. Today tests import single modules from `dist/public/` (`tests/view/account-screen.test.mjs:21`) and the browser loads them the same way (`src/browser/index.html:11`). The invariants `application-build-output`, `application-build-layout`, `application-package-layout`, `application-build-kitchen-sink`, `mutation-test-selection` and `node-test-selection`, and `stryker.config.json`, may all rest on this layout: check each.
5. Whether a tool guards React's rules, given D-29 holds the ESLint rule set unchanged and says changing it takes a human-accepted change of that decision, or only the guidelines and review do.
6. Whether the kitchen-sink page stands up without a change of `scripts/kitchen-sink.mjs` when `RESET_REQUESTED_SENTENCE` moves to a module without React.

A later task's needs count: tasks 3, 4, 5, 6 and 13 of the plan move further screens onto what this task lays down, and task 3 puts a picture behind this card. Do not design for them beyond not closing their way.

Items the task already settles are not open. Do not reopen its eleven questions, its six rows of *Settlements to record*, esbuild or React.

**What to read.**

Foundation, by identifier, in `foundations/decisions.md`, each whole from its heading to the next: D-03, D-04, D-06, D-18, D-27, D-28, D-29, D-30, D-31, D-33, D-36, D-42, D-43, D-44, D-45, D-47, D-75, D-76, D-77, D-78, D-88, D-96, D-97, D-98, D-99, D-100, D-139, D-156, D-157, D-160, D-211, D-222, D-224, D-225, D-252, D-253, D-254, D-257, D-258. The task quotes the projected wording of D-03, D-06, D-36, D-96 and D-27, which supersedes what the log holds now for those parts.

Invariants in `foundations/invariants.md`: browser-view-framework, application-build-output, application-build-layout, application-package-layout, application-build-kitchen-sink, browser-view-token-values, browser-view-focus-outline, eslint-source-rules, prettier-source-format, preview-server-access, icon-credits, loop2-container-icons, node-test-selection, mutation-test-selection, introduced-npm-vulnerabilities, dependency-audit-refusal, account-client-requests, account-client-outcomes, expired-session-unsaved-progress, local-start-access. `foundations/part_map.md` entries `browser-view`, `build-tools`, `deployment`. `foundations/glossary.md` for the words you use.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.

Sources, as the task cites them, in `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\`: `rozpoznanie_mvp2\technologia_budowanie_ekranow.md` (section „Konsekwencje”, and the esbuild line at :143), `rozpoznanie_mvp2\rozpoznanie_projektant.md` part C.1 (a sketch, material and no decision), `definicja_mvp2_loop2.md` section *Technology* and `plan_mvp2_loop2.md`.

Code: the task's *Context* names the entry points; `scripts/build.mjs`, `scripts/kitchen-sink.mjs`, `scripts/static-files.mjs`, `scripts/local-start.mjs`, `tsconfig.browser.json`, `tsconfig.kitchen-sink.json`, `eslint.config.mjs`, `stryker.config.json`, `Dockerfile`, `src/browser/index.html`.

**Report.** Write the spec to `.runs/task-cycles/logowanie-w-react/spec.md` and your full report to `.runs/task-cycles/logowanie-w-react/reports/spec-designer.md`, as your method gives. Return your status, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.
