# Handoff 10 — slice 8 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 8 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/10-slice8-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 8 — The bar of the solving condition in the header

- **Goal:** In the header, right after the clock, stands the bar of the solving condition with its
  numbers (To do 3; D-133): for each requirement slice 4's function of `src/browser/sim/run.ts`
  gives, in its order, the name and the numbers „Passa {streak}/{required}” or „Pokonane napaści
  {count}/{required}” and beside them its bar, the track in `highlight` and the fill as long as the
  share of the count in the number required, never more than whole, in `text` while the
  requirement is not met, though it is no text (D-40); once it is met, the fill, the name and the
  numbers in `positive` (row 5; D-39). The bar stands after the end too, at the stopped minute, such
  as „Passa 0/480” after a death of cold (row 6), and shows the current streak, never the longest
  (D-135). The words come from pure functions of `src/browser/view/status-row.ts`, the elements from
  `src/browser/view/run-header.tsx`, the look from `src/browser/styles.css`: the bar's thickness is
  `--bar-width` and its length a layout dimension (D-43); no new token value. The roles are those
  slice 1 wrote into the table *Roles*. Write the failing cases first in
  `tests/view/status-row.test.mjs` — the parts of Las, 120/480, and of Las — głębiej, both in their
  order, one met — and in `tests/view/run-header.test.mjs` — the bar right after the clock, the
  roles of a requirement not met and met, the fill's share, the bar after a death of cold reading
  „Passa 0/480”, no bar part for a requirement the map lacks. Look at the header in a running browser
  as `.claude/skills/loop2-play/SKILL.md` gives, during a map run and after a death.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/run-header.tsx` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/run-header.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 5 and 6, D-133, D-39, D-40, D-135 and D-311 ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:846-875` D-39, D-40 ·
  `foundations/decisions.md:891-920` D-42, D-43 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2525-2546` D-133 · `foundations/decisions.md:2566-2584` D-135 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/decisions.md:6938-6972` D-320 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:142-155` solved map, streak ·
  `foundations/glossary.md:162-167` beaten attack · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/data/maps.ts` · `src/browser/tokens.css` ·
  `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/status-row.test.mjs` and `npm test -- tests/view/run-header.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_design_token_contrast.py` · `npm run typecheck` · a look at the
  header in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 4 · Slice 7 · row 5 · row 6 · D-133 · D-39 · D-40

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-133 | `foundations/decisions.md:2527-2560` |
| D-39 | `foundations/decisions.md:846-860` |
| D-40 | `foundations/decisions.md:861-875` |
| D-135 | `foundations/decisions.md:2580-2598` |
| D-311 | `foundations/decisions.md:6690-6734` |
| D-03 | `foundations/decisions.md:39-51` |
| D-42 | `foundations/decisions.md:891-905` |
| D-43 | `foundations/decisions.md:906-920` |
| D-87 | `foundations/decisions.md:1602-1614` |
| D-88 | `foundations/decisions.md:1615-1627` |
| D-264 | `foundations/decisions.md:5436-5467` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-268 | `foundations/decisions.md:5567-5611` |
| D-320 | `foundations/decisions.md:6964-6998` |
| `browser-view-framework` | `foundations/invariants.md:35-44` |
| `browser-view-token-values` | `foundations/invariants.md:459-468` |
| `browser-view-focus-outline` | `foundations/invariants.md:469-478` |
| `design-token-contrast` | `foundations/invariants.md:479-488` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slice 4 (commit `c60bd5e`) gives the requirements: `solvingRequirements(run, map)` in `src/browser/sim/run.ts`, returning for each requirement the map's data has `{ kind: "streak" | "defeatedAttacks", count, required, met }`, streak first. Draw only from it.
- Slice 7 (commit `0727fac`) left the header with the clock alone after the map's name (`clockText` in `src/browser/view/status-row.ts`); set the bar right after the clock.
- Slice 1 (commit `02e41f3`) wrote the bar's roles into the table *Roles* of `guidelines/styleguide-browser-view.md`: track `highlight`, fill `text` while not met, and name, numbers and fill `positive` once met.
- For the look in a running browser, follow `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` when your method names it; stop the local start you began when you are done (`npm run local:stop`).
