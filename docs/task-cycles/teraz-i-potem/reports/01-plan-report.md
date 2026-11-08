# Report 01 — planner (plan-task)

- Status: done with concerns
- Plan: `.runs/task-cycles/teraz-i-potem/plan.md` (10 slices after the foundation entries; no open
  design choice found that needs a spec, no reserved choice)
- Size: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/teraz-i-potem/plan.md` — exit 0,
  every slice fits; report `.runs/task-cycles/teraz-i-potem/plan-size.md`
- Nothing written outside the three paths of the handoff; no code, test, foundation entry or commit.

## The plan in one view

| Slice | Goal | Part | Model |
|---|---|---|---|
| (foundation entries) | rows 1–8, D-311, D-133, `rule-state-from-pick`, D-147, D-122, D-132, D-39, D-40, the examples of D-62, D-135, D-178, D-57, and the cycle's D-46, D-324, D-280, D-291 | product-foundation | orchestrator's choice |
| 1 | the new uses of roles in the styleguide's table *Roles* | agent-workflow | same |
| 2 | minutes of the needs and the note of each need, in `body.ts`; the card's count reuses it | simulation | cheaper |
| 3 | what „Teraz” and „Potem” name, one function beside `ruleSigns` | simulation | cheaper |
| 4 | each requirement of the solving condition beside `meetsSolving` | simulation | cheaper |
| 5 | the rows „Teraz” and „Potem” under the scene (`now-lines.ts`, `now-rows.tsx`) | browser-view | cheaper |
| 6 | a click or a key on a row scrolls the program to its rule | browser-view | cheaper |
| 7 | the clock in the header, no action, no status row | browser-view | cheaper |
| 8 | the bar of the solving condition in the header | browser-view | cheaper |
| 9 | the body row in cells with the notes | browser-view | cheaper |
| 10 | rows of the two new view files in `guidelines/coding-browser-module.md` | agent-workflow | cheaper |

Every *Risk* is `none`: no slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts`
or `assets/**`.

## Concerns

1. **The rows as controls and D-44.** To do 1 and Pytanie 3 ask for „dwa przyciski … z fokusem”.
   D-44 (`foundations/decisions.md:921-935`) has every button built from the shared controls and
   lists among its violations „a module that creates and styles a `<button>` of its own”; the shared
   button (`src/browser/view/controls/react-button.tsx`) takes only a text, draws a frame in
   `control-border`, and disabled it writes `text-disabled`, which row 4 (cause of death in `text`)
   and the completion in `positive` cannot take. The plan (slice 6, *Choices*) builds a row that
   names a rule as `rule-list.tsx` builds its rule rows — an element with `tabIndex={0}` and click
   and Enter/Space handlers — and a row that names no rule as plain text. Leaving it as planned:
   no change of a shared control, the look of old Loop's rows; a review reading D-44 as covering
   every clickable element may raise it. The other way: extend the shared button in both forms to
   carry an icon and a right-hand part, with its kitchen-sink sample and a case in
   `tests/view/react-controls.test.mjs` — one more slice and a framed row. Proposed answer: keep the
   plan; I found no rule of the guidelines for a clickable row that is no shared control (see
   below), so the precedent of the rule rows is the nearest.
2. **To do 5's „przez skille” and the-way's own split.** `.the-way/product-guidelines/styleguide/SKILL.md`
   and `.the-way/product-guidelines/coding/SKILL.md`, section "Where the skill works", run inside a
   task's refinement and *never write* the guideline files; in `implement-task` the cycle's author
   writes them, by the section "Writing the file(s)" of each discipline's `template.md`, from the
   task's settlements, and a meaning or choice the task did not settle stops the cycle. The handoff
   asks the slices' executors to use those skills. Slices 1 and 10 have their executors work as the
   cycle's author those skills name — reading the skill's table and the template — and return to the
   orchestrator what the task does not settle. Proposed answer: this reading; if you meant the
   skills' refinement steps to run in the cycle, they would write a task document, not the file.
3. **Foundation entries the task does not name.** A search for "status row" in
   `foundations/decisions.md` shows three more entries this change makes false: D-46 *Verification*
   (`:959`, the clock „in the status row of the header”), D-324 *Verification* (`:7048`, „the status
   row ending in „ (pauza)””) and D-280 (`:5922` binding sentence „as the status row writes it”,
   `:5951` *Rationale*). The first two fall under the plan's answer To do 6 quotes („wszystkie, każdy
   w zadaniu, którego zmiana go unieważnia”); D-280's is a binding sentence, so the foundation writer
   judges whether naming the clock keeps its meaning or is a question (WAY-30). D-291 lists where an
   action's icon stands; rows 1 and 2 add two places, for the writer's search to tie or extend. All
   four stand in *Foundation entries* marked „the cycle's”. Invariants and the glossary hold no
   "status row" (searched).
4. **An unused data field after slice 7.** `status` of `src/browser/sim/data/actions.ts` („Eksploruje”,
   „Zbiera” …) is read only by `activityText` of `src/browser/view/status-row.ts`; once slice 7
   removes the status row, nothing reads it, and `tests/sim/data.test.mjs:76-90` pins it. The task
   does not ask for its removal, so no slice removes it; the return step or a follow-up task can.
5. **Slice 7 is near the size limit** (242 249 of 250 000 estimated tokens) because
   `tests/view/account-screen.test.mjs` (242 KB) is counted whole as a changed file; its edit is the
   class at `:3687`, the comment at `:3685` and the expectation at `:4145`. The agent needs only those
   passages; I split the header into slices 7 and 8 to bring it under the limit.
6. **Words standing twice between slices 5 and 7.** Slice 5 writes its own words of the wait, of the
   causes of death and of „Walczy z wilkiem”, and slice 7 removes the status row's copies, so the
   branch holds both copies for two slices, never the merged change (*Choices*).
7. **„Teraz” of a rule's minutes.** „zostało {left} z {in all} min” depends on what `run.current`
   holds at the end of a game minute; slice 3 is told to read it in `src/browser/sim/run.ts` and test
   the task's example. I did not establish it while planning.

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md:291-292`: the example of the rule "A fault of one screen is
  fixed in its component" is a status row too tight („Za ciasny wiersz stanu”); after this change the
  screen has no status row. The task does not settle a new example, so slice 1 leaves it; it still
  reads as an example, only of a row that no longer exists.
- No rule of the styleguide or of `guidelines/coding-browser-module.md` covers a clickable row that is
  no shared control (the rule rows of `rule-list.tsx` are the only precedent); see concern 1.
- No rule names the roles of a label and of a right-hand detail of a row of the world area; the plan
  takes `text-label` for both and `text` for the action from the meanings of D-40 and the rule row's
  number and time (*Choices*).
- `guidelines/coding-browser-module.md:59` keeps `status-row.ts` (`do not copy`); after slice 7 the
  file holds the clock's text and pure functions only, under a name of a row that is gone (*Choices*:
  no rename).

## The order against the styleguide's example

The example ("Plan of a user-interface change", `guidelines/styleguide-browser-view.md:625-632`):
environment and library, then values in their source, then one screen, then its states. This change
needs no environment, library or token value, so it starts at meanings: the foundation entries and
slice 1 (the table *Roles*) come before any screen code; then the simulation slices 2–4, which the
screen writes out (D-04, D-333); then the screen one part at a time — the rows (5), their state as
controls with focus and pointer (6), the header's clock (7), its bar (8), the body row (9) — and the
guideline rows of the new files last (10). The departure is the simulation slices between the
meanings and the screen, which the example does not have.

## Reaches beyond the handoff

- `foundations/decisions.md`, whole entries: D-44, D-47, D-291, D-292, D-293, D-295 (controls, focus,
  icon, numbers and folding the rows and the scroll touch); D-61, D-131, D-140, D-141 already named
  or near; D-324 and D-280 and D-46 (found by a search for "status row", concern 3); D-264, D-267,
  D-268, D-87, D-88 (tests on jsdom and checks in the browser); D-18, D-20, D-23, D-28, D-36, D-38,
  D-327, D-269 (headings and ranges only, for the slices' *Read*). Why: to name each slice's reading
  and to find what the change makes false.
- `foundations/glossary.md` headings, for the terms of each slice.
- The-way files: `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/task-cycle/skill/SKILL.md:265-300`
  (who writes *Foundation entries*), `.the-way/task-cycle/record_template.md:60-80`,
  `.the-way/product-guidelines/reading.md`, `.the-way/elements/common/way_of_working.md` "Reading the
  foundation", `.the-way/task-cycle/change/ui_check.md`, `.the-way/product-guidelines/styleguide/SKILL.md`,
  `.the-way/product-guidelines/coding/SKILL.md:1-60`, both `orchestrated_mode.md`, the "Writing the
  file(s)" sections of the two discipline templates and the `## Files of this kind` section of the
  coding template. Why: how the guideline slices are to be made (concern 2).
- Code and tests beyond the handoff's list: `src/browser/view/run-screen.tsx`,
  `src/browser/view/rule-list.tsx` (rows, `data-rule`, `data-group`, folding), `src/browser/view/program-panel.tsx`
  (boundary, folding memory), `src/browser/view/game-view.ts:255-270, 410-430`,
  `src/browser/view/controls/react-button.tsx`, `src/browser/sim/run.ts` (`meetsSolving`,
  `minuteBeforePick`), `src/browser/sim/world.ts`, `src/browser/sim/game.ts:130-200` (`ruleSigns`),
  `src/browser/styles.css` (header, body row, icon rules), `src/browser/tokens.css` (sizes, `danger`,
  `text-secondary`), `src/browser/sim/data/maps.ts`, `tests/view/account-screen.test.mjs`,
  `tests/view/end-question.test.mjs`, `tests/sim/encounters.test.mjs`, `tests/sim/completion.test.mjs`,
  `tests/sim/data.test.mjs:70-90`, `stryker.config.json` and `scripts/test.py` (so no new simulation
  test file is needed), `tests/invariants/test_simulation_inputs.py` (new exports are covered by
  default), `.claude/skills/loop2-play/SKILL.md:1-40`. Why: to name every file each slice changes,
  every test that would break, and what the checks can run.
- Old Loop, read-only: `old Loop, src/components/probe/RunWorld.tsx:357-430` and
  `old Loop, src/sim/data/maps.ts:380-404` (named by the handoff), at `cdc7c0d`.

## Searches not found or unclear

- A reader of `ACTIONS[…].status` besides `src/browser/view/status-row.ts` — none found in
  `src/browser/` (concern 4).
- A precedent for `scrollIntoView` or any scrolling in `src/` or `tests/` — none found; slice 6
  brings the first, with a stand-in in jsdom.
- Whether the program panel of a map run always shows the copy — it does not: it can show a saved
  program (`program-panel.tsx`, the doc of `addDiscoveredRule`); the plan scrolls only while the copy
  is shown (*Choices*).
- A rule for a clickable row that is no shared control — none (concern 1).
- The roles of the label „Potem” and of the rows' right-hand parts — not in the task; taken by the
  plan from existing meanings (*Choices*).
- The size of old Loop's note under a value — not read; the plan takes `--font-size-detail`, whose
  source names descriptions.
- What `run.current` holds at the end of a game minute, for „zostało … min” — left to slice 3
  (concern 7).

## Questions still open

none — each matter above is taken in the plan with its proposal; concerns 1–3 are where the
orchestrator may want to rule before slice 1.
