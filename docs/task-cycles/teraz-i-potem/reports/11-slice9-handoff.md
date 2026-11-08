# Handoff 11 — slice 9 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 9 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/11-slice9-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 9 — The body row in cells, with the minutes of the needs

- **Goal:** The body row has each value in a cell of its own — „Temperatura 36,9 °C”, „Sytość 82 %”,
  „Zdrowie 100”, „Energia natury 90” — and under temperature and under satiety a note in smaller
  grey text, from slice 2's note of each need in `src/browser/sim/body.ts`: under temperature
  „marznie” in red, otherwise „przy ogniu”, „nie stygnie” or „bez ognia {n} min”; under satiety
  „głoduje” in red, otherwise „bez jedzenia {n} min”; health and nature energy with no note. The
  roles are those slice 1 wrote into the table *Roles* — expected `text-secondary` for the note and
  `danger` for „marznie” and „głoduje”; a value below its threshold keeps `danger` as today (D-39).
  The smaller text takes the existing token `--font-size-detail`, whose source in
  `src/browser/tokens.css` is the descriptions of loop; no new value. The notes stand from game
  minute zero and after the end, at the stopped minute, whatever the Understanding holds (D-125).
  The words of each note stand in `src/browser/view/body-row.ts` as pure functions, the cells in
  `src/browser/view/world-area.tsx`, the look in `src/browser/styles.css`. Write the failing cases
  first in `tests/view/body-row.test.mjs` — the example of D-178 in To do 6, in Las 36.9 °C with
  „bez ognia 79 min” and 82 % with „bez jedzenia 86 min”, each note at its threshold, by the fire, a
  map that does not cool, no note at health and nature energy — and in
  `tests/view/world-area.test.mjs` — the cells and the notes on the screen, the note's role, the
  red at chill and at hunger, the notes after a death. A case that checks the values joined by
  „ · ” changes with row 7 and the new example of D-178, and says so. Look at the body row in a
  running browser as `.claude/skills/loop2-play/SKILL.md` gives.
- **Change:** `src/browser/view/body-row.ts` · `src/browser/view/world-area.tsx` ·
  `src/browser/styles.css` · `tests/view/body-row.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:44-57` To do, items 4 to 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:86-92` Questions to settle, Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 7, D-311, D-178 and D-57 · `foundations/decisions.md:39-51` D-03 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:1163-1192` D-57, D-58 · `foundations/decisions.md:1602-1627` D-87, D-88 ·
  `foundations/decisions.md:2316-2338` D-125 · `foundations/decisions.md:3252-3272` D-178 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:459-488` browser-view-token-values, browser-view-focus-outline,
  design-token-contrast · `foundations/glossary.md:117-123` Understanding ·
  `foundations/part_map.md:3-29` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/sim/body.ts` ·
  `src/browser/tokens.css` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/body-row.test.mjs` and `npm test -- tests/view/world-area.test.mjs`
  (their new cases failing first) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_design_token_contrast.py` · `npm run typecheck` · a look at the
  body row in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 1 · Slice 2 · Slice 6 · Slice 8 · row 7 · D-311 · D-178 · D-57

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-311 | `foundations/decisions.md:6690-6734` |
| D-178 | `foundations/decisions.md:3266-3287` |
| D-57 | `foundations/decisions.md:1163-1177` |
| D-03 | `foundations/decisions.md:39-51` |
| D-39 | `foundations/decisions.md:846-860` |
| D-40 | `foundations/decisions.md:861-875` |
| D-43 | `foundations/decisions.md:906-920` |
| D-58 | `foundations/decisions.md:1178-1192` |
| D-87 | `foundations/decisions.md:1602-1614` |
| D-88 | `foundations/decisions.md:1615-1627` |
| D-125 | `foundations/decisions.md:2317-2339` |
| D-264 | `foundations/decisions.md:5436-5467` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-268 | `foundations/decisions.md:5567-5611` |
| D-333 | `foundations/decisions.md:7201-7215` |
| D-337 | `foundations/decisions.md:7320-7353` |
| `browser-view-framework` | `foundations/invariants.md:35-44` |
| `browser-view-token-values` | `foundations/invariants.md:459-468` |
| `browser-view-focus-outline` | `foundations/invariants.md:469-478` |
| `design-token-contrast` | `foundations/invariants.md:479-488` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slice 2 (commit `35f53cd`) gives the notes: `needNotes` (with `minutesUntilChilled`, `minutesUntilStarving`) in `src/browser/sim/body.ts`, returning tagged objects, not words; the view writes the words. Draw only from it.
- Slice 1 (commit `02e41f3`) wrote into the table *Roles* of `guidelines/styleguide-browser-view.md`: `danger` for „marznie” and „głoduje”, `text-secondary` for the other notes of the body row. The smaller size is the existing `--font-size-detail` (plan *Choices*).
- Slices 5 and 6 changed `src/browser/view/world-area.tsx` and `tests/view/world-area.test.mjs` (the rows „Teraz” and „Potem”); read them as they stand now.
- For the look in a running browser, follow `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` when your method names it; stop the local start you began when you are done (`npm run local:stop`).
