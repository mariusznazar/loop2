# Handoff 07 — slice 5 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 5 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/07-slice5-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 5 — The rows „Teraz” and „Potem” under the scene

- **Goal:** In the world area, right under the scene and above the paragraph of the last encounter
  and the lines of the end of the map run (To do 2), stand two rows drawn only from what slice 3's
  function of `src/browser/sim/game.ts` gives: the new `src/browser/view/now-lines.ts`, pure
  functions with no DOM and no React that turn that result into the parts of the rows, and the new
  `src/browser/view/now-rows.tsx`, the React component of the two rows, which
  `src/browser/view/world-area.tsx` places. „Teraz”: for a rule, the icon of its action drawn as a
  mask in the colour of the text beside it, as in a rule's row (D-291; the class `action-icon`), the
  action in the words of the rule's row (`actionSentence` of `src/browser/view/program-editor.ts`,
  „Zbierz — Patyk”), and at the right „reguła {number} · zostało {left} z {in all} min”, the number
  as the editor numbers the rule (`ruleNumber`, the rule found in the copy of the map run); for a
  wait „Czeka — żadna reguła nie pasuje” with nothing at the right; in the minutes of an attack
  „Walczy z wilkiem” alone, the creature's name in the form `creatureAfterZ` of
  `src/browser/view/status-row.ts` gives it today, with no icon, number or minutes; after a death
  „Mag zamarzł”, „Mag umarł z głodu” or „Mag zginął w walce” in `text`; after a completion the map's
  `completionText`, such as „Las rozwiązany”, in `positive`. „Teraz” has a fixed height — one line,
  a longer text cut rather than wrapped — so that a change of its text moves nothing below it, and
  no progress bar. „Potem”: the label „Potem”, then the icon and the action of the winner with
  „reguła {number}” at the right — in the minutes of an attack the combat rule the turn would
  choose — and with no winner „żadna reguła nie pasuje — postać stanie” in `warning`; it stands after
  the end too. The other parts take roles by the meanings of the table *Roles* as slice 1 left it:
  the label „Potem” and the parts at the right in `text-label`, as the number and the time of a
  rule's row stand, and the action in `text`. This slice draws words and roles only; a click comes
  in slice 6. The look stands in `src/browser/styles.css`, every value from `src/browser/tokens.css`,
  the fixed height a layout dimension (D-43). `status-row.ts` stays as it is; slice 7 removes its
  own copies of these words. Write the failing cases first: in the new
  `tests/view/now-lines.test.mjs`, each kind of row with its words from the task; in
  `tests/view/world-area.test.mjs`, the case "the world area stands from the top: the scene, the
  encounter, the lines of the end, the body row, …" with „Teraz” and „Potem” right under the scene,
  and a case of the roles — a death's cause in `text`, a completion in `positive`, no winner in
  `warning`. Look at the screen in a running browser as `.claude/skills/loop2-play/SKILL.md` gives,
  with a rule under way, a wait and after a death.
- **Change:** `src/browser/view/now-lines.ts` · `src/browser/view/now-rows.tsx` ·
  `src/browser/view/world-area.tsx` · `src/browser/styles.css` · `tests/view/now-lines.test.mjs` ·
  `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:29-38` To do, items 1 and 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:61-72` Questions to settle, Pytanie 1 and Pytanie 2 ·
  `.runs/task-cycles/teraz-i-potem/task.md:96-101` Questions to settle, Pytanie 9 ·
  `.runs/task-cycles/teraz-i-potem/task.md:113-122` Questions to settle, Pytanie 13 and Pytanie 14 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 1, 2, 4 and 8, D-311, D-147, D-132, rule-state-from-pick and D-291 ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2499-2524` D-132 · `foundations/decisions.md:2772-2786` D-147 ·
  `foundations/decisions.md:3355-3367` D-185 · `foundations/decisions.md:4015-4036` D-216 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6236-6299` D-291, D-292, D-293 ·
  `foundations/decisions.md:6559-6646` D-308, D-309 · `foundations/decisions.md:6673-6708` D-311 ·
  `foundations/decisions.md:6938-6972` D-320 · `foundations/invariants.md:1219-1228`
  rule-state-from-pick · `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:53-64` program rule, rule group ·
  `foundations/glossary.md:136-141` completion · `foundations/glossary.md:174-179` copy ·
  `foundations/part_map.md:3-29` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  `src/browser/view/program-editor.ts:787-818` ruleNumber, actionSentence ·
  `src/browser/view/rule-list.tsx:470-490` the icon of a rule's row ·
  `src/browser/view/status-row.ts` · `src/browser/tokens.css` · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/now-lines.test.mjs` and `npm test -- tests/view/world-area.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` · a look at the
  screen in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 3 · row 1 · row 2 · row 4 · row 8 · D-311 · D-291

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-311 | `foundations/decisions.md:6690-6734` |
| D-147 | `foundations/decisions.md:2786-2800` |
| D-132 | `foundations/decisions.md:2500-2526` |
| D-291 | `foundations/decisions.md:6253-6277` |
| D-03 | `foundations/decisions.md:39-51` |
| D-18 | `foundations/decisions.md:390-408` |
| D-39 | `foundations/decisions.md:846-860` |
| D-40 | `foundations/decisions.md:861-875` |
| D-43 | `foundations/decisions.md:906-920` |
| D-62 | `foundations/decisions.md:1238-1252` |
| D-87 | `foundations/decisions.md:1602-1614` |
| D-88 | `foundations/decisions.md:1615-1627` |
| D-185 | `foundations/decisions.md:3370-3382` |
| D-216 | `foundations/decisions.md:4030-4051` |
| D-264 | `foundations/decisions.md:5436-5467` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-268 | `foundations/decisions.md:5567-5611` |
| D-292 | `foundations/decisions.md:6278-6296` |
| D-293 | `foundations/decisions.md:6297-6316` |
| D-308 | `foundations/decisions.md:6576-6635` |
| D-309 | `foundations/decisions.md:6636-6663` |
| D-320 | `foundations/decisions.md:6964-6998` |
| D-334 | `foundations/decisions.md:7216-7261` |
| D-335 | `foundations/decisions.md:7262-7293` |
| `browser-view-framework` | `foundations/invariants.md:35-44` |
| `content-identifiers` | `foundations/invariants.md:236-247` |
| `browser-view-token-values` | `foundations/invariants.md:459-468` |
| `browser-view-focus-outline` | `foundations/invariants.md:469-478` |
| `design-token-contrast` | `foundations/invariants.md:479-488` |
| `rule-state-from-pick` | `foundations/invariants.md:1219-1228` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slice 3 (commit `e7e8a95`) gives what the rows name: `nowAndNext(state)` in `src/browser/sim/game.ts`, with the types `NowLine`, `NextLine` and `NowAndNext`. Draw only from it.
- Slice 1 (commit `02e41f3`) wrote the new uses of roles into the table *Roles* of `guidelines/styleguide-browser-view.md`: `warning` for „żadna reguła nie pasuje — postać stanie” in „Potem”.
- For the look in a running browser, follow `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` when your method names it; stop the local start you began when you are done (`npm run local:stop`). The worktree has its own `node_modules` and `.runs/quality-venv`.
