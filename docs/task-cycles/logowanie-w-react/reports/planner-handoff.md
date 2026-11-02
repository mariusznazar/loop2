# Handoff — planner, task `logowanie-w-react`

**Delegation.** Mariusz, who requested this cycle, delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator, never to him.

**Worktree.** `C:\Storage\repos\loop2-wt\logowanie-w-react`, branch `task/logowanie-w-react`, base 3d366c8, the worktree clean. Work from its root. You write no code and change no tracked file.

**Method.** Read `.the-way/task-cycle/plan/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Your stage is the plan of slices for this one task. Your boundary: you return before any slice is made.

**Inputs.** The frozen task `.runs/task-cycles/logowanie-w-react/task.md`, read whole. The spec `.runs/task-cycles/logowanie-w-react/spec.md`, read whole: its decisions 1 to 10 passed review, with the corrections and the settlement of decision 11 made by the orchestrator after that review. Lines the task cites moved on the base; the spec's *Constraints* gives the moved ones, and `.claude/skills/loop2-deploy/SKILL.md` „sees the forms again” is at :225, the sentence of `guidelines/testing.md` :174–:177 at :175–:178.

**Answers of step 4.**

- Trust boundary: yes. `package-lock.json` of `build-tools`, partner npm registry: the slice that writes it is marked so. `scripts/kitchen-sink.mjs` does not change under spec decision 6.
- Irreversible operation: no.

Human action H1 is placed in the cycle, so the request opens as a blocked draft; no slice performs it, and no slice deploys or sends mail.

**Order the spec fixes.** The memory limit and its proof stand and pass before the first test on jsdom; the harness's `assert` before the first case moves onto it (spec decision 7). Plan slices so that the gate could stand between them where the change allows it: a slice leaving the tree broken for the next one says so.

**Safety rule for every agent of this cycle, to go into each slice that touches jsdom.** A failing comparison on a rendered element can take down the human's machine: see spec decisions 1, 9 and 11. Until `tests/view/memory-limit.mjs` stands no test on jsdom in which a comparison on an element can fail runs at all. After it stands, a file outside `tests/` that loads jsdom or happy-dom imports it first and starts the limit. The slices hold this in their text.

**What to read beside those.**

Foundation, each whole: in `foundations/decisions.md` D-03, D-04, D-06, D-18, D-27, D-28, D-29, D-30, D-31, D-32, D-33, D-36, D-42, D-43, D-44, D-45, D-47, D-75, D-76, D-77, D-78, D-88, D-96, D-97, D-98, D-99, D-100, D-139, D-156, D-157, D-160, D-211, D-222, D-224, D-225, D-252, D-253, D-254, D-257, D-258; in `foundations/invariants.md` browser-view-framework, application-build-output, application-build-layout, application-package-layout, application-build-kitchen-sink, browser-view-token-values, browser-view-focus-outline, eslint-source-rules, prettier-source-format, preview-server-access, icon-credits, loop2-container-icons, node-test-selection, mutation-test-selection, introduced-npm-vulnerabilities, dependency-audit-refusal, account-client-requests, account-client-outcomes, expired-session-unsaved-progress, local-start-access; `foundations/part_map.md` entries `browser-view`, `build-tools`, `deployment`, `agent-workflow`, `product-foundation`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.

The foundation entries the task and the spec carry have to stand in the plan: the task's *Decisions in play*, the rows S1 to S6 of its *Settlements to record*, and the spec's *Foundation entries*. Items 15, 16 and 18 of the task go by the guideline routes they name, and item 17 touches both copies of the deploy skill.

**Report.** Write `.runs/task-cycles/logowanie-w-react/plan.md`, its size report `.runs/task-cycles/logowanie-w-react/plan-size.md` and your full report `.runs/task-cycles/logowanie-w-react/reports/planner.md`, as your method gives. Return your status, a one-line check result naming what failed or did not run, and the report's path; questions, reaches and **Searches not found or unclear** stand in the report.
