# Handoff 09 — slice 7 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 7 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/09-slice7-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 7 — The clock in the header, with no action and no status row

- **Goal:** The header of the screen of a map run holds the character's name, the map's name, the
  clock, „Pauza” or „Wznów”, the five pace buttons, „Restart”, the warning of a cut trip plan and
  „Zakończ”, in this order (To do 3); the character's action is no longer in it and the status row
  is gone; slice 8 sets the bar of the solving condition after the clock, so between the two slices
  the header shows no numbers of the condition. The clock reads „Minuta {game minute}”, with
  „ (pauza)” after it at every pause, the stop at a discovery included, „Minuta 312 (pauza)”; after a
  death and after a completion it stands at the game minute of the end with no „ (pauza)”, „Minuta
  312” or „Minuta 480”, in the role `text`; it stays in Geist Mono with tabular figures (D-46). After
  the end „Pauza” and the pace buttons are gone as today (D-62, D-132). In
  `src/browser/view/status-row.ts` the text of the status row gives way to the clock's text; the
  module keeps its name, `pauseLabel`, `discoveryText` and the type of the controls, and what only the
  status row's activity used — the words of the wait, of the causes of death, the form of the
  creature's name, the reading of the action's status — goes, since slice 5's `now-lines.ts` writes
  „Teraz”. The clock's element takes the class `run-header-clock` in place of `run-header-status`,
  and the tests that find it by that class follow: `tests/view/run-screen.test.mjs`,
  `tests/view/end-question.test.mjs` and `tests/view/account-screen.test.mjs` — there also the
  expectation of the clock with „ (pauza)” at its line 4145, which becomes „Minuta 0 (pauza)”, and its
  comment at line 3685; each changed expectation names the requirement that changed it (D-311 and
  D-122 in their new wording). Write the failing cases first in `tests/view/status-row.test.mjs` —
  the clock's text running, paused, at a discovery, after a death and after a completion — and in
  `tests/view/run-header.test.mjs` — the header's order with no action, the clock after a death and
  after a completion in `text` with no „ (pauza)”, the clock in the mono face; the cases of the status
  row's wording are rewritten from the requirement that replaced it, none is dropped without one.
  Look at the header in a running browser as `.claude/skills/loop2-play/SKILL.md` gives, during a map
  run, paused and after a death.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/run-header.tsx` ·
  `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/run-header.test.mjs` ·
  `tests/view/run-screen.test.mjs` · `tests/view/end-question.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:93-106` Questions to settle, Pytanie 8, Pytanie 9 and
  Pytanie 10 · `.runs/task-cycles/teraz-i-potem/task.md:110-112` Questions to settle, Pytanie 12 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries row 4, D-311, D-122, D-132, D-62 and D-46 · `foundations/decisions.md:39-51`
  D-03 · `foundations/decisions.md:891-935` D-42, D-43, D-44 · `foundations/decisions.md:951-980`
  D-46, D-47 · `foundations/decisions.md:1238-1252` D-62 · `foundations/decisions.md:1615-1627` D-88 ·
  `foundations/decisions.md:2214-2257` D-122 · `foundations/decisions.md:2442-2464` D-130 ·
  `foundations/decisions.md:2499-2524` D-132 · `foundations/decisions.md:3394-3406` D-188 ·
  `foundations/decisions.md:5421-5494` D-264, D-265 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:6673-6708` D-311 · `foundations/invariants.md:35-44`
  browser-view-framework · `foundations/invariants.md:459-478` browser-view-token-values,
  browser-view-focus-outline · `foundations/glossary.md:12-24` game minute, map run ·
  `foundations/glossary.md:136-141` completion · `foundations/part_map.md:3-29` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/view/controls/react-button.tsx` ·
  `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/status-row.test.mjs` and `npm test -- tests/view/run-header.test.mjs`
  (their new cases failing first) · `npm test -- tests/view/run-screen.test.mjs` ·
  `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/now-lines.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck` · a look at
  the header in a running browser by `.claude/skills/loop2-play/SKILL.md`
- **Depends on:** Slice 5 · Slice 6 · row 4 · D-311 · D-122 · D-132 · D-62 · D-46

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-311 | `foundations/decisions.md:6690-6734` |
| D-122 | `foundations/decisions.md:2214-2258` |
| D-132 | `foundations/decisions.md:2500-2526` |
| D-62 | `foundations/decisions.md:1238-1252` |
| D-46 | `foundations/decisions.md:951-965` |
| D-03 | `foundations/decisions.md:39-51` |
| D-42 | `foundations/decisions.md:891-905` |
| D-43 | `foundations/decisions.md:906-920` |
| D-44 | `foundations/decisions.md:921-935` |
| D-47 | `foundations/decisions.md:966-980` |
| D-88 | `foundations/decisions.md:1615-1627` |
| D-130 | `foundations/decisions.md:2443-2465` |
| D-188 | `foundations/decisions.md:3409-3421` |
| D-264 | `foundations/decisions.md:5436-5467` |
| D-265 | `foundations/decisions.md:5468-5509` |
| D-268 | `foundations/decisions.md:5567-5611` |
| D-334 | `foundations/decisions.md:7216-7261` |
| `browser-view-framework` | `foundations/invariants.md:35-44` |
| `browser-view-token-values` | `foundations/invariants.md:459-468` |
| `browser-view-focus-outline` | `foundations/invariants.md:469-478` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.

## Orchestrator's notes for this slice

- Slices 5 and 6 (commits `46e0ed9`, `92f6860`) write „Teraz” and „Potem” in `src/browser/view/now-lines.ts` and `now-rows.tsx`, from `nowAndNext(state)` of `src/browser/sim/game.ts`. The words of the wait, the causes of death and the creature's name now stand there; remove the status row's copies, as your *Goal* gives.
- `tests/view/account-screen.test.mjs` is about 242 KB: read only the passages you change — today `:3685-3687` (the comment and `statusTextOf` by the class `run-header-status`) and `:4145` (the expectation `/^Minuta 0 .* \(pauza\)$/`) — and find any other use of that class or of the status row's words by search, not by reading the whole file.
- The class `run-header-status` stands today in `src/browser/styles.css:1340`, `:1347`, `src/browser/view/run-header.tsx:60-61`, `tests/view/end-question.test.mjs:169`, `tests/view/run-header.test.mjs:95`, `tests/view/run-screen.test.mjs:229`, `:314`.
- For the look in a running browser, follow `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` when your method names it; stop the local start you began when you are done (`npm run local:stop`).
