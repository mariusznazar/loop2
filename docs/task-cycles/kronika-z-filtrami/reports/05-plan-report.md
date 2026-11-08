# Report 05 — the planner (stage: plan-task)

- **Status:** done with concerns
- **Plan:** `docs/task-cycles/kronika-z-filtrami/plan.md`
- **Size report:** `docs/task-cycles/kronika-z-filtrami/plan-size.md` — `slice_size.py` exit 0,
  every one of the 7 slices `fits` (largest: Slice 5, 9 files, about 186k tokens to read)
- **Check result:** only the size script ran; no test or other check of the product ran (the
  planner runs none). No tracked file changed (`git status --short` empty).

## The plan in short

- *Foundation entries* F1–F19, written first in their order: F1 glossary `chronicle`
  (`the-way-record-glossary-term`); F2–F19 decisions (`the-way-record-decision`): the new chronicle
  decision, rows 1, 2, 3, 4, 7, 8, 9, 10, 14 (F3–F11; the writer decides whether rows 2–10 stand in
  F2), D-04, the new „How does an agent learn what went wrong…”, D-122 (part and its *Rationale*),
  D-147 and D-311 (transitional wordings, D-311 with its *Verification*, *Rationale* and *Rejected*),
  and the „to check” D-185, D-272, D-276. No invariant, environment fact or part-map entry: every new
  file falls under globs `browser-view` and `simulation` already claim. Return-step candidate (no
  row): the two new simulation events.
- Slices: 1 loss-of-streak event (sim); 2 campfire-out event (sim); 3 chronicle memory, composing of
  entries, band text function (view, no React); 4 game view records in `store.apply`, move hints
  from the editor; 5 right area with tabs, filters and list, paragraph out of the world area,
  game-view test, and the real-browser check at 1× and 16× with screenshots; 6 styleguide; 7 coding
  guidelines' tables. Every *Risk* is `none`. Models: 1, 2, 4, 6, 7 cheaper; 3 strongest (move
  detection without a hint is the maker's algorithm); 5 same.
- The acceptance check is the last step of Slice 5; its executor reads
  `.claude/skills/loop2-play/SKILL.md` and records, per screenshot under
  `docs/task-cycles/kronika-z-filtrami/screenshots/`, path, pace, game minute, tab, filter and what
  it shows, plus the console reading.

## Concerns

1. **The guideline skills in a task cycle.** The task (To do 11, 12) and the handoff say the guideline
   changes go „through” `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines`. Both
   skills describe themselves as leading a refinement with the human, and their own tables say that
   in `implement-task` it is the cycle's author who writes the guideline file, as
   `.the-way/product-guidelines/styleguide/template.md` and `.the-way/product-guidelines/coding/template.md`
   give (`.the-way/product-guidelines/styleguide/SKILL.md:34-37`; `.the-way/product-guidelines/coding/SKILL.md:40-43`).
   The plan takes that reading: Slices 6 and 7 name the skill, read it and its template, and write
   only what the task settled. Proposed answer if the orchestrator is asked: keep it; running the
   refinement steps would need the human, which the cycle does not have.
2. **Statuses of new files in the coding table.** The coding template says a file added after the
   last audit takes no row until the guidelines are refreshed or extended
   (`.the-way/product-guidelines/coding/template.md:218-228`); To do 12 asks for rows, but no
   status (`copy` / `do not copy`). Slice 7 gives each new file the status of the rows of its like
   and reports it; that is a small choice, not a new meaning, but the reviewer should see it.
3. **Existing tests that compare whole event lists.** I named in *Change* the files I found likely to
   fail by reading (`copy-actions` for the switch at `tests/sim/copy-actions.test.mjs:300-316`;
   `body`, `discovery`, `death` for deaths; `world`, `encounters`, `completion` for campfires) but ran
   none. A failing file not named is treated as a small mismatch (`.the-way/task-cycle/change/slice.md`).

## Guidelines found missing or uncertain

- `guidelines/coding-browser-module.md` has no rule or example for a stateful view module with no
  React and no DOM read by a React screen (the chronicle memory; the spec points at
  `useSyncExternalStore` „as `RuleOpen` is read”), nor for drawing a bounded window of a growing list.
- `guidelines/testing.md` designates no pattern for a test that drives the game view across screens
  (Przejście → Siedziba → Przejście); the plan points Slice 5 at the setup of
  `tests/view/end-question.test.mjs:1-240`, which is no designated exemplar.
- It is uncertain whether `npm test -- tests/invariants/<file>.py` needs a prior `npm run build`:
  the testing guideline says Python files run „bez budowania”, while those invariant scripts drive
  the built game; the plan's checks run `npm run build` first.
- `guidelines/styleguide-browser-view.md` has no rule for a list that scrolls in the right area, nor
  for the font of buttons inside a block set in Geist Mono (the spec's D5 reading covers it).
- *Styleguide order-of-work example* (environment and library → values in their source → one screen
  → its states): this change adds no font, library or token value (spec, non-goals), so the plan
  starts where the example's third step stands — after the simulation and the view's state, one
  screen part (Slice 5), and no state of a shared control changes. It follows the example from that
  step; the departure is only that the steps before it have nothing to do.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` and `.the-way/task-cycle/change/ui_check.md`, whole — how a
  slice treats a mismatch with the plan and what the own-work check of a changed screen asks, to
  place the browser check and to word the handling of unnamed failing tests.
- `.the-way/product-guidelines/styleguide/SKILL.md:1-60`, a search of
  `.the-way/product-guidelines/coding/SKILL.md`, and `.the-way/product-guidelines/coding/template.md:210-240`
  — who writes the guideline files in a cycle, and the rule for *Files of this kind* (concerns 1, 2).
- `.claude/skills/the-way-maintain-styleguide/SKILL.md`, whole; `.claude/skills/loop2-play/SKILL.md`,
  headings only — to name what Slices 5 and 6 read.
- `.the-way/task-cycle/slice_size.py:1-60` — its limits and how it parses *Read*.
- Foundation entries read beyond the handoff's list: D-71 (`foundations/decisions.md:1388-1401`),
  invariants `minute-span-split` (`foundations/invariants.md:529-537`) and `map-run-repeatability`
  (`:165-174`) — the order of a minute and the split-span rule the new events must keep. Entries the
  plan names in *Read* whose ranges I took from their headings without reading them: D-18, D-35,
  D-40, D-43, D-44, D-75, D-88, D-123, D-130, D-136, D-164, D-254, D-265, D-267, D-331, invariants
  `copy-save`, `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`,
  `local-start-access`, `document-test-memory-limit`. Glossary terms read: game minute, map run,
  program, program rule, rule group, map run restart, extinguished campfire, manual map run,
  completion, solved map, streak, copy, trip plan, earning loop.
- Code read to cut slices: `src/browser/sim/run.ts:55-90`, `:440-510`; `src/browser/sim/world.ts:30-70`;
  `src/browser/sim/programs.ts:560-600`, `:690-745`; `src/browser/sim/game.ts:360-380` and its exports;
  `src/browser/view/game-view.ts:200-300` and the run-screen lines; `src/browser/view/run-screen.tsx:160-202`;
  `src/browser/view/discovery-band.tsx` whole; `src/browser/view/status-row.ts:85-117`;
  `src/browser/view/rule-list.tsx:105-130`, `:355-380`; `src/browser/view/program-panel.tsx:750-820`.
  Tests: listings of `tests/sim`, `tests/view`; `tests/sim/body.test.mjs:90-150`,
  `tests/sim/discovery.test.mjs:505-536`, `tests/sim/copy-actions.test.mjs:95-110`, `:300-316`,
  `tests/sim/data.test.mjs:675-695`; searches for whole-list event comparisons and for the right
  area in `tests/view`; `tests/view/end-question.test.mjs` structure; `scripts/test.py:1-40`.

## Searches not found or unclear

- „How does an agent learn what went wrong in the running game?” — not found in
  `foundations/decisions.md` (search for „went wrong” and „chronicle”), so F13 is new. Task 8's
  part (the sentence of a fault and the console) appears already in the product as D-323 and the
  coding guideline's `installLastResort`; I did not check that task 8 is closed.
- Which existing tests fail once the events exist — not determined by running (concern 3).
- Whether „Ognisko” in „Ognisko wygasło” falls under `content-identifiers` (maps, resources,
  archetypes) — unclear; the campfire may be an item. Slice 3 reads the invariant and the data.
- The exact range of the login card's tabs in `src/browser/view/account-card.tsx` — the spec gives
  `:621-638`; the plan names `:610-645` around it, not read.
- No test of the game view under that name exists (`tests/view/game-view.test.mjs` absent); the
  game view is driven by `tests/view/account-screen.test.mjs`, `end-question.test.mjs` and
  `uncaught-failure.test.mjs`.

## Questions still open

none
