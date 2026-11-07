# Handoff — planner (stage: plan-task)

You are the planner of the task cycle of the task `karty-i-katalog-map` (ekran Mapy z listą otwartych map, kartą mapy i sekcją „Kto idzie”). Write the plan; write no code, no test, no foundation entry.

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator and, through it, to you: choices of how to make what the task settles are yours, listed under *Choices*. Never label an answer as the human's approval. Never ask the human; questions go back to the orchestrator in your report.

## Where you work

- Worktree (work from its root): `the root of the task worktree` — branch `task/karty-i-katalog-map`, base `213670952542816b8dd86117f815c3869cc090d5`, pin-move commit `58d48490ef7a61b37e04d1cc09b3c7f5e21ff96c` (HEAD). The-way is `.the-way` in the worktree, at `294af7fde45323ac1851c014a03071a97fc38d96`. Run the-way's scripts from the worktree root as `.the-way/<path>`.
- Method: read `.the-way/task-cycle/plan/SKILL.md` whole, and a file it names only when the step or variant that names it comes. Its project skill is `the-way-plan-task`; use that, never an unprefixed skill.
- Plan path: `docs/task-cycles/karty-i-katalog-map/plan.md`; size report: `docs/task-cycles/karty-i-katalog-map/plan-size.md`.
- Your full report: `docs/task-cycles/karty-i-katalog-map/reports/01-plan-report.md`. It must carry the section **Searches not found or unclear** (items or `none`), your reaches beyond this handoff, questions and concerns. Return only your status, the report's path and a one-line result.

## Inputs

- Frozen task, read whole: `docs/task-cycles/karty-i-katalog-map/task.md`. Project relation: plan item 13 of `plan_mvp2_loop2.md`. Its sources (the plan and definition) are private notes outside the repository; the task document copies everything the cycle needs from them. Do not look for them.
- Answers of step 4: trust boundary — **no** (the change must not touch `src/browser/sim/saved-game.ts`, `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; if you find that a slice must touch the saved game's shape, that is an open design choice: return it, do not plan it). Irreversible operation — **no**. Open design choice at start — none; reserved choice — none. Execution route — planned slices (judged by the orchestrator; you may return that one slice suffices only with the reason).
- The move of the pin carried no failing check (gate on `58d4849`: exit 0, 412 tests, `foundation_check.py` 0 errors).
- Checks failing on the base: only `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality`, and only because the quality environment was not yet installed; it is installed now at `.runs/quality-venv`, so the gate passes.
- The product's gate is `npm test` from the worktree root (it builds, runs Node tests, Python tests of each `tests/` directory, then `foundation_check.py`; it stops at the first failing directory). A slice's *Checks* name focused checks only — `npm test -- <one test file>` runs exactly one file (see the README, “Jeden plik testu”) — and never the full gate (WAY-160).

## What to read (whole unless said otherwise)

Product rules and guidelines: `AGENTS.md`; `guidelines/coding.md`; `guidelines/coding-browser-module.md`; `guidelines/coding-simulation-module.md`; `guidelines/testing.md`; `guidelines/styleguide-browser-view.md`; `src/browser/AGENTS.md`. Files of `guidelines/` for other parts (saved-game, content-data, …) only if your plan reaches them.

Foundation: `foundations/part_map.md` and `foundations/glossary.md` whole. Decisions — each whole, from its heading to the next `###`, with rationale and *Rejected* — by identifier: D-03, D-36, D-39, D-40, D-53, D-54, D-55, D-118, D-125, D-133, D-134, D-136, D-149, D-165, D-170, D-171, D-180, D-187, D-188, D-189, D-196, D-217, D-243, D-244, D-245, D-246, D-250, D-251, D-265, D-269, D-270, D-274, D-277, D-280, D-281, D-282, D-283, D-287, D-307, plus D-44 (the plain button). The task names others in *Decisions in play* and *Obecne decyzje…*; every identifier above exists in `foundations/decisions.md` in this worktree (checked). The entries the task's *Decisions in play* marks `(new)` — “What does the screen Mapy show?”, “What does the game say before an earning loop that earns nothing?”, and the parts of the screens, addresses and room-for-layout entries — have no identifier yet; the cycle writes them. Invariants: `content-identifiers` (`foundations/invariants.md`), `simulation-isolation`, and any other whose *Part* is `browser-view`, `simulation` or `every` that the slices reach.

My selection of decisions of the touched parts is not complete: 223 decisions name `browser-view` and 148 `simulation` in their *Scope*. Search the *Scope* lines yourself for what a slice needs (WAY-150 step 2 of “Reading the foundation” in `.the-way/elements/common/way_of_working.md`) and name in each slice's *Read* the identifiers and guideline files its agent must read. Name every such reach in your report.

Code to read to cut slices (not to design): `src/browser/view/headquarters.ts`, `game-view.ts`, `screen-address.ts`, `menu-bar.tsx`, `character-screen.tsx`, `trip-lines.ts`, `src/browser/sim/game.ts`, `trip.ts`, `body.ts`, `run.ts`, `layout.ts`, `src/browser/sim/data/maps.ts`, `resources.ts`, `creatures.ts`, `balance.ts`, `src/browser/kitchen-sink/`, and the tests of these under `tests/view/` and `tests/sim/`. The task's *Context* gives line numbers from commit `b97fdd0`; they have drifted, find the code again by name.

## What the plan must cover

1. Every item of the task's *To do* 1–11, the *Acceptance criteria*, every row of *Settlements to record* (1–6), every projected entry and changed present entry listed in *Decisions in play* (including D-287, D-274, D-217, D-244 in the wording given there, and the corrected examples of D-55 and D-171), and the four *Questions carried to cycle* — settle each as a *Choice* with its reason, or return it as an open design choice if the foundation and guidelines leave a way costly to turn back.
2. Foundation entries first, as the plan's *Foundation entries* the plan template gives: the entries are written through the project skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact` and the foundation step `.the-way/task-cycle/skill/foundation_step.md`. The styleguide change (To do 9) goes through the project skill `the-way-maintain-styleguide`, and the coding-guidelines changes (To do 10) through `the-way-maintain-coding-guidelines`; name them in the slice that makes them, and say what each reads.
3. The task's own part list: `browser-view` (all view, tests/view, kitchen-sink), `simulation` only for pure number functions if you choose to put them there, `product-foundation`/`agent-workflow` for the guidelines and foundation files (see the part map for who claims `guidelines/**` and `foundations/**`).
4. Tests: follow `guidelines/testing.md` (read it whole; it fixes levels and recipes). A slice that draws a screen records the state check the cycle's record needs for UI (components, states, method, evidence) — see `guidelines/styleguide-browser-view.md` order-of-work example.
5. Also say, in your report, whether a bump of the saved game's version is needed (carried question 4: “każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie”) — expected: no, the card is derived from data; verify in `src/browser/sim/`.

## Boundary

Stop when `plan.md` and `plan-size.md` stand (run `.the-way/task-cycle/slice_size.py` as the method gives) or when you return an open design choice or `reserved`. Do not start any slice.
