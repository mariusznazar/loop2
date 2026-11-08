# Handoff — slice 5 of the plan (stage: make-change, a slice, or the retry of a slice)

You are the executor of slice 5 of the plan of one task of a the-way cycle. You make the code of
this slice, test first where it fits, commit it, and report. You write no plan, you do not widen the
slice, and you run no full gate (`npm test` with no file) — the orchestrator runs it; you run the
focused checks the slice's *Checks* lists, each with its command and exit code.

## Delegation

The person who requested this cycle has delegated intermediate choices to the cycle's orchestrator
(Sonnet 5.5). Questions that change what the work means go to the orchestrator in your report
(status `questions`), never to the human. An answer from the orchestrator is never the human's
approval.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. Slice base (the head before your first commit): `5ed6c6b`. The
  worktree is clean when you start. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of
  the same name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/change/SKILL.md` — your variant is **a slice, or the retry of a
  slice**, so read `.the-way/task-cycle/change/slice.md` whole; where your slice changes a user
  interface read `.the-way/task-cycle/change/ui_check.md` when its step comes.
- Frozen task: `docs/task-cycles/kronika-z-filtrami/task.md` (sha256 prefix cd12745e0f8566f7). Reviewed spec:
  `docs/task-cycles/kronika-z-filtrami/spec.md`. Plan: `docs/task-cycles/kronika-z-filtrami/plan.md`. Read the passages of these that your slice's *Read*
  names; the task binds where the spec and the task differ, the spec where it settles more than the
  task, and the plan's slice where it divides the work. Do not reopen a design the spec settles.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/11-slice5-report.md`.
- Commits: on this branch, messages in English in the repository's form (`feat: :sparkles: <what>`,
  `fix: :bug: <what>`, `test: :white_check_mark: <what>`, `docs: :memo: <what>`; look at
  `git log` for the form), added **by path** (`git add <path>…`), never `git add -A`, `.` or
  `commit -a`. Leave no uncommitted change. The code is in English (identifiers, comments);
  what the code writes to the player stays in Polish as the task gives it.
- Answers of step 4: trust boundary no, irreversible operation no; every *Risk* is `none`.

## Foundation entries, with their current ranges

The foundation step has written and changed entries since the plan was made, so the plan's ranges
are stale. **These ranges hold** (they are the entries as the foundation step left them, at the
head `5ed6c6b` or later). Read each whole:

- `foundations/decisions.md:852-865` D-39
- `foundations/decisions.md:867-880` D-40
- `foundations/decisions.md:912-925` D-43
- `foundations/decisions.md:927-940` D-44
- `foundations/decisions.md:957-970` D-46
- `foundations/decisions.md:1450-1461` D-75
- `foundations/decisions.md:1621-1632` D-88
- `foundations/decisions.md:2220-2263` D-122
- `foundations/decisions.md:2449-2470` D-130
- `foundations/decisions.md:2506-2531` D-132
- `foundations/decisions.md:2792-2805` D-147
- `foundations/decisions.md:3376-3387` D-185
- `foundations/decisions.md:3926-3964` D-212
- `foundations/decisions.md:4036-4056` D-216
- `foundations/decisions.md:5200-5227` D-254
- `foundations/decisions.md:5229-5258` D-255
- `foundations/decisions.md:5474-5514` D-265
- `foundations/decisions.md:5544-5571` D-267
- `foundations/decisions.md:5706-5731` D-272
- `foundations/decisions.md:5830-5866` D-276
- `foundations/decisions.md:6047-6064` D-283
- `foundations/decisions.md:6696-6749` D-311
- `foundations/decisions.md:7187-7200` D-331
- `foundations/decisions.md:7232-7276` D-334
- `foundations/decisions.md:7380-7400` D-338
- `foundations/decisions.md:7537-7569` D-343
- `foundations/decisions.md:7571-7603` D-344
- `foundations/decisions.md:7630-7653` D-346
- `foundations/decisions.md:7655-7682` D-347
- the glossary term `chronicle`: `foundations/glossary.md:248-252`
- invariant `browser-view-focus-outline`: `foundations/invariants.md:469-477`
- invariant `browser-view-framework`: `foundations/invariants.md:35-43`
- invariant `browser-view-token-values`: `foundations/invariants.md:459-467`
- invariant `content-identifiers`: `foundations/invariants.md:236-246`
- invariant `document-test-memory-limit`: `foundations/invariants.md:1189-1197`
- invariant `local-start-access`: `foundations/invariants.md:1179-1187`

Entries of the plan's *Foundation entries* are named in your slice as F-numbers: F1 = glossary term `chronicle`, F2 = D-338, F7 = D-343, F8 = D-343, F9 = D-344, F11 = D-346, F13 = D-347, F14 = D-122, F15 = D-147, F16 = D-311, F17 = D-185, F18 = D-272, F19 = D-276.
Ranges in your slice's *Read* below for `foundations/decisions.md` are the plan's; use the ones above.

## Your slice (word for word from `plan.md`)

### Slice 5 — The right area shows the chronicle under its tabs; the paragraph leaves the world area

- **Goal:** while no rule or group is open, the right area of the screen of a map run holds the
  tabs „Kronika” and „Teren” (`ReactButton kind="tab"` in a container of class `tabs`, D-276) and
  under them the chronicle or the table of revealed tiles as today, as the spec's D9 gives; while
  one is open, the rule panel takes the area and „✕” brings back the tab picked, read from the
  chronicle memory. The chronicle is a row of the seven filter buttons (`ReactButton` with
  `selected`, as the pace buttons) and the list, newest first, each row the minute alone in a column
  in `text-label` and the text in its entry's role, the filter row and the list on `panel`, the list
  and its empty sentence in Geist Mono at the token file's chronicle size, „Nic tu jeszcze nie ma.”
  in `text-secondary` where the filter shows nothing (spec, D5). The paragraph of the last encounter
  stands at its place among the entries, composed at draw from `lastCombat` with `combatText`, again
  only when `lastCombat` changed (spec, D6), and the world area no longer shows it. The list draws a
  bounded window and grows it on a scroll near its end, and draws no row again where nothing changed
  (spec, D7; the window's size is the maker's). The hover link between a tile and its table row
  stands only while „Teren” is picked. `createRunScreen` takes the chronicle memory from the game
  view; the picked tab and filter are clicks the screen tells the memory. Styles read only tokens.
  The unit tests of the spec's D11 for the right area, the game view and the world area exist and
  pass; the existing expectations of `tests/view/run-screen.test.mjs` (the table always in the right
  area) and `tests/view/world-area.test.mjs` (the paragraph under „Teraz” and „Potem”) change with
  To do 8 and To do 6 as their sources. The new game-view test follows the setup of
  `tests/view/end-question.test.mjs`.
  Then the acceptance check (task, *Acceptance criteria*; question 10): reading
  `.claude/skills/loop2-play/SKILL.md`, the executor runs the game locally and checks the chronicle
  in a real browser at 1× and at 16×, saving screenshots under
  `docs/task-cycles/kronika-z-filtrami/screenshots/`. It records, for each screenshot, its path,
  the pace, the game minute, the tab and filter picked and what it shows, and covers at least: at 1×
  in the first minutes, „Kronika” and „Wszystko” with action entries, the minute column and a
  discovery's entry; at 16× a longer map run with entries of several kinds, a change of the copy
  standing with the loss of the streak it caused in the same minute; a filter picked („Passa” or
  „Moje zmiany”); an empty filter with „Nic tu jeszcze nie ma.”; „Teren” with the table; an attack
  with its paragraph in the chronicle and none in the world area; the chronicle and the picked tab
  kept after Siedziba and back; after a reload with a `lastCombat`, the chronicle holding the
  paragraph alone. A state hard to reach by playing is composed as the skill's „Compose a game
  state” gives. It reads the browser's console and records any error line. Where the check shows a
  fault of an earlier slice's code, it stops and reports it rather than fixing it.
- **Change:** `src/browser/view/right-area.tsx` · `src/browser/view/run-screen.tsx` ·
  `src/browser/view/world-area.tsx` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/right-area.test.mjs` · `tests/view/run-screen.test.mjs` ·
  `tests/view/world-area.test.mjs` · `tests/view/chronicle-game.test.mjs`
- **Read:** `docs/task-cycles/kronika-z-filtrami/task.md:26-36` To do (items 1 to 9) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:41-43` Acceptance criteria ·
  `docs/task-cycles/kronika-z-filtrami/task.md:72-92` Questions to settle (Pytanie 5 to Pytanie 7) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:103-107` Questions to settle (Pytanie 10) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:111-116` Questions to settle (Pytanie 12) ·
  `docs/task-cycles/kronika-z-filtrami/task.md:138-143` Questions carried to cycle ·
  `docs/task-cycles/kronika-z-filtrami/task.md:199-219` Settlements to record and Out of scope ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:16-62` Intent and Goals and non-goals ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:64-151` Constraints ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:199-279` D2 and D3 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:333-394` D5, D6 and D7 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:407-467` D9 and D10 ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:489-511` D11. Tests the design makes necessary, by kind (view) ·
  `docs/task-cycles/kronika-z-filtrami/spec.md:569-585` Left to the maker ·
  F1 · F2 · F7 · F8 · F9 · F11 · F13 · F14 · F15 · F16 · F17 · F18 · F19 ·
  the modules Slice 3 made, the chronicle memory and the composing of entries ·
  `foundations/decisions.md:846-874` D-39, D-40 · `foundations/decisions.md:906-934` D-43, D-44 ·
  `foundations/decisions.md:951-964` D-46 · `foundations/decisions.md:1444-1455` D-75 ·
  `foundations/decisions.md:1615-1626` D-88 · `foundations/decisions.md:2443-2464` D-130 ·
  `foundations/decisions.md:2500-2525` D-132 · `foundations/decisions.md:2786-2799` D-147 (as F15 leaves it) ·
  `foundations/decisions.md:3370-3381` D-185 (as F17 leaves it) · `foundations/decisions.md:3920-3958` D-212 ·
  `foundations/decisions.md:4030-4050` D-216 ·
  `foundations/decisions.md:5194-5252` D-254, D-255 · `foundations/decisions.md:5468-5508` D-265 ·
  `foundations/decisions.md:5538-5565` D-267 · `foundations/decisions.md:5700-5725` D-272 (as F18 leaves it) ·
  `foundations/decisions.md:5824-5860` D-276 (as F19 leaves it) · `foundations/decisions.md:6041-6058` D-283 ·
  `foundations/decisions.md:6690-6733` D-311 (as F16 leaves it) · `foundations/decisions.md:7171-7184` D-331 ·
  `foundations/decisions.md:7216-7260` D-334 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers ·
  `foundations/invariants.md:459-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/invariants.md:1179-1197` local-start-access, document-test-memory-limit ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `src/browser/view/tile-table.tsx` · `src/browser/view/combat-line.ts` ·
  `src/browser/view/run-header.tsx` · `src/browser/view/account-card.tsx:610-645` ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/tokens.css` ·
  `tests/view/end-question.test.mjs:1-240` · `tests/view/page-document.mjs`
- **Model:** same — the slice spans the screen, the game view, the stylesheet and four test files,
  and ends with the check in a real browser.
- **Risk:** none
- **Checks:** `tests/view/right-area.test.mjs` and `tests/view/chronicle-game.test.mjs` written
  first and seen failing: `npm test -- tests/view/right-area.test.mjs`,
  `npm test -- tests/view/chronicle-game.test.mjs`; then `npm test -- tests/view/run-screen.test.mjs`,
  `npm test -- tests/view/world-area.test.mjs`, `npm test -- tests/view/end-question.test.mjs`,
  `npm test -- tests/view/account-screen.test.mjs`, `npm test -- tests/view/tile-list.test.mjs`,
  `npm test -- tests/view/combat-line.test.mjs`, `npm test -- tests/view/react-controls.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`,
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`,
  `npm test -- tests/invariants/test_browser_view_framework.py`; after `npm run build`:
  `npm test -- tests/invariants/test_content_identifiers.py`; `npm run typecheck`;
  `npm test -- tests/quality/test_quality_invariants.py`; the check in a real browser at 1× and 16×
  by `.claude/skills/loop2-play/SKILL.md`, with the screenshots and the console reading above.
- **Depends on:** Slice 3 · Slice 4 · F7 · F8 · F9 · F11 · F13 · F14 · F15 · F16 · F17 · F18 · F19


## What the earlier slices left, from their reports (the interfaces you build on)

Reports to read the sections "What the slice gives" and "Choices" of:
`docs/task-cycles/kronika-z-filtrami/reports/09-slice3-report.md` and
`docs/task-cycles/kronika-z-filtrami/reports/10-slice4-report.md`. In short:

- `src/browser/view/chronicle.ts` (Slice 3): `createChronicle(state)` with `record`, `pickTab`,
  `pickFilter`, `snapshot()` (same object while the version stays), `window(filter, size)` returning
  `{rows, more}`; a row is an entry (`key`, `entry` with kind, minute, text, role) or the paragraph
  of the last encounter by its place; no React, no DOM, no `subscribe` — how the screen reads the
  memory is yours to choose (the spec's *Left to the maker*: `useSyncExternalStore`, as `RuleOpen`
  is read, or a value handed with `update`). The memory has no `subscribe`, so if you read it with
  `useSyncExternalStore` you add the small subscription to the module and its test; say so in your
  report.
- `src/browser/view/game-view.ts` (Slice 4): creates the memory when the game view is built and
  records every result into it (`take(result, copyAct?)`); the memory is **not yet handed** to
  `createRunScreen` — that is yours. The save/discard/switch/edit acts on the copy already describe
  themselves to it.
- The simulation reports `streakLost` (Slice 1) and `campfireExtinguished` (Slice 2).
- The foundation entries D-338 … D-347 are written; read the ones your slice names whole. They say
  what the player sees; the spec says how the code gets there.

## About the browser check at the end of your slice (the task's acceptance criterion)

- Follow `.claude/skills/loop2-play/SKILL.md` whole for running the game (`npm run local` over HTTPS,
  an account through the login card, Playwright CLI with Playwright MCP where the CLI fails, reading
  motion from a stream of frames). It writes nothing outside `.runs/` and the local database it makes.
- Save screenshots under `docs/task-cycles/kronika-z-filtrami/screenshots/` (ignored by git; the
  orchestrator copies the ones the request needs). Name each file so its pace, tab and filter can be
  read from the name.
- Stop the game and the browser when you finish; leave no process running.
- A fault of an earlier slice's code that the check shows: stop and report it, as the slice says;
  do not fix it.
- Before you start the check, run `npm run build` once and the focused tests of your slice, so the
  game you play is the code you wrote.

## What the report holds

As `make-change` and `slice.md` give: status (`done`, `done with concerns`, `questions`,
`returned`, `reserved` or `blocked`), your commits (hashes) and the range from the slice base to
your head, each check with its command and exit code, whether you saw each new test fail first, the
**own-work check** (the requirement you were most likely to miss and the check you made of it),
every reach beyond this handoff (what, where, why), the files you changed beyond the slice's
*Change* (a small mismatch, one line each), and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`). Return your status, your commits and the report
path in one short message.
