# Handoff — executor of Slice 12, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 12** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `eca1fb1b4974241fec78dcb95f89779c357ca6c5` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/18-slice-12-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:340-363`)

### Slice 12 — the campfire on the drawing and in the list of revealed tiles

- **Goal:** The campfire's icon — the file the campfire's data names (Slice 10) — stands on its tile in the terrain panel's drawing, beside the resources' icons, whether the campfire burns or is extinguished, never drawn in `depleted` (D-41: an extinguished campfire is still there), and the drawing shows no number of the campfire or the stick (D-19, row 15). The row of a revealed tile in the list of revealed tiles gives the state of its campfire — „ognisko — płonie, zostało 42 min” or „ognisko — wygasłe” — and of each stick burning on it — „patyk — płonie, zostało <n> min” (spec Decision 5) —, the names from the data; where in the row that state stands is the maker's within the styleguide. A burning stick shows only in that row. Hovering keeps linking a tile and its row. Tests first in `tests/view/terrain-picture.test.mjs` and `tests/view/tile-list.test.mjs`, from map runs in which the program crafts and lights a campfire and lights a stick: the icon on the campfire's tile, burning and extinguished, with no number on the drawing; the row's texts, burning and extinguished, and the burning stick's. The screenshot check of `make-change` follows the route the foundation settles; where it settles none, the states are checked in code and the screenshot is named unchecked.
- **Change:** `src/browser/view/terrain-picture.ts` · `src/browser/view/terrain-panel.ts` · `src/browser/view/tile-list.ts` · `src/browser/styles.css` · `tests/view/terrain-picture.test.mjs` · `tests/view/tile-list.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:30-30` To do (item 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:53-55` Questions to settle (Q11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:154-154` Settlements to record (row 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:343-418` Decision 4, Decision 5, Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F15 · F20 ·
  `foundations/decisions.md:39-93` D-03, D-04 · `foundations/decisions.md:380-424` D-18, D-19 ·
  `foundations/decisions.md:590-622` D-27 · `foundations/decisions.md:739-753` D-36 ·
  `foundations/decisions.md:769-873` D-38 to D-44 · `foundations/decisions.md:904-933` D-47, D-48 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:336-345` terrain-drawing-numbers ·
  `foundations/invariants.md:440-479` browser-view-token-values to design-token-sources ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `tests/invariants/test_terrain_drawing_numbers.py`
- **Model:** same — where the campfire's icon and the burning state stand on the drawing and in the row are decisions of the screen.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/view/terrain-picture.test.mjs tests/view/tile-list.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_terrain_drawing_numbers.py`, `test_browser_view_token_values.py`, `test_content_identifiers.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 6 · Slice 8 · Slice 10 · Slice 11 · F15 · F20

## Current ranges

The foundation step wrote the plan's F1–F20 and moved some ranges of `foundations/`. Read
`.runs/task-cycles/ognisko-i-jedzenie/reports/foundation-map.md`: it maps each F-entry your *Read*
names to its identifier and current range, and gives the current range of each range of
`foundations/` that moved. Where it differs from the plan's, the current one holds.

## Known checks already failing on the base (a945cf1)

`npm test` exits 1 on this machine for three checks unrelated to this change:
`tests/invariants/test_loop2_one_serving_process.py` (setUpClass: `Get-NetTCPConnection` finds no
listening connection) and `tests/quality` `test_ruff_source_rules`, `test_shellcheck_source_rules`
(Ruff and ShellCheck are not installed). Name any of them you meet as already failing, not as yours.

## What earlier slices made (read as they stand now)

- Slice 3 (7a273ae) added the content data files `src/browser/sim/data/items.ts`,
  `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/traits.ts` and numbers in
  `src/browser/sim/data/balance.ts`, `src/browser/sim/data/maps.ts`.
- Slice 4 (46ec64d) added `src/browser/sim/body.ts` and put the character's body on the map run as
  `MapRun.body` — not inside `MapRun.character`, since `tests/sim/actions.test.mjs:115` compares
  `character` across minutes; the program's view of the run (`RunView`) does not carry the body yet
  (Slice 9 adds what conditions read). When a span reaches death `passRealTime` drops the leftover
  part of a real second (`realMsCarry` = 0). `mapRunEnded` is still given at „Zakończ” and
  „Restart”, not at death.
- Slice 5 (dfe814a) added `src/browser/sim/character.ts` (a new character's traits from the data;
  the backpack's count and cap) and put the traits and the backpack in `MapRun.character`;
  `newMapRun` and `stepMinute` keep their arguments, a new one optional.
- Slice 6 (cc0669d) added `src/browser/sim/world.ts` (what burns, its warmth, renewal) and the map
  run's campfires and burning items in `types.ts`: a campfire is `{ at, minutesLeft }`, 0 meaning
  extinguished — a crafted, never-lit campfire also stands at 0; burning sticks are `burningItems`
  keyed by `item`, so no code names the stick.
- `guidelines/coding-simulation-module.md` and `guidelines/coding-content-data.md` list no row for
  the new files; by the pinned template a file added after the audit takes no row until the
  guidelines are refreshed — not a gap of your slice.
- Slice 7 (006616f) added the action kind `gather` (data `actions.ts`, `program.ts`, `run.ts`,
  `game.ts`), the gathering stream in `random.ts`, and the editor's offer of it in
  `program-editor.ts`. Its status text in the data is „Zbiera”; `status-row.ts` appends the target's
  name for „Idź” only, so the status row reads „Minuta N · Zbiera” until Slice 11, whose goal makes
  every action that takes a target show its name.
- Slice 8 (612404f) added the action kinds of the campfire, the burning stick, eating and „Idź —
  ognisko” (`actions.ts`, `program.ts`, `run.ts`, `game.ts`, `program-editor.ts`) and `eatenBody`
  in `body.ts` (eating's satiety, rounded and capped like the body minute).
- `tests/invariants/test_walk_feasibility.py` fails from Slice 6 on (renewal at minute 120 gives a
  zeroed tile its piece back); Slice 13 adapts it. Do not treat that failure as yours.
- Slice 9 (ab1558b) added the five new condition kinds with their numbers' ranges and steps
  (`conditions.ts`, `program.ts`, `game.ts`, `program-editor.ts`); labels „Zostało mniej niż N min
  — ognisko” and „Z dala od — ognisko”.
- Slice 10 (6981b7f) added `assets/icons/campfire.svg` (Lorc, "Campfire icon"), the campfire's
  `icon` and `iconTitle` in `src/browser/sim/data/campfire.ts`, its credit in `credits.ts` and its
  footer line in `footer.ts`; its review passed.
- Slice 11 (eca1fb1) added `src/browser/view/body-row.ts` (the body and backpack row, placed by
  `app.ts`), the status row at death and the target's name for every action that takes one
  (`status-row.ts`), with styles in `styles.css`.

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/campfire.ts`
(name, `icon`), `src/browser/sim/data/items.ts`, `src/browser/sim/types.ts` (campfires and
`burningItems` of the map run), `assets/icons/campfire.svg`, `src/browser/view/body-row.ts` (as the
pattern of a row written in this change), as they stand now. For tests driving a program that
crafts and lights a campfire and lights a stick, `tests/sim/campfire.test.mjs` shows how.
