# Handoff — executor of Slice 11, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 11** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `6981b7fae945f28aa65fb0a04aeca31fc636fa64` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/17-slice-11-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:313-338`)

### Slice 11 — the status row at death, and the row of the body and the backpack

- **Goal:** Under the status row stands a row of the body and the backpack: „Temperatura 36,8 °C · Sytość 82 % · Zdrowie 100” and „Plecak 7/15: patyk 5, jagoda 2” („Plecak 0/15” when empty) — the temperature cut down to tenths, satiety and health cut down to whole numbers, with a decimal comma (spec Decision 3, *What the player reads beside it*), the cap the character's carrying capacity (Slice 5), the items' names from the data in the data's order; a value below the threshold of chill or of hunger stands in the role `danger` (D-39), which part of the row the maker's within the styleguide. At death the status row reads „Minuta <n> · Mag zamarzł” for cold or „Minuta <n> · Mag umarł z głodu” for hunger, `<n>` the minute of death; „Pauza” is gone; „Restart” and „Zakończ” stay destructive buttons and act on the ended map run as on one in progress — „Restart” with the same seed from minute zero, „Zakończ” back to the screen from which the player sends the character. The status texts of the new actions read as their data gives them, followed by the target's name where the action takes one, as „Idzie po: patyk”. The row is a new module, `src/browser/view/body-row.ts`, after the exemplar `status-row.ts` (made once, updated in place), placed by `app.ts` under the status row; its styles stand in `styles.css` on the existing tokens — no new token, role or shared control. Where the texts of the causes stand is the maker's, within D-18 and `content-identifiers`. Tests first in `tests/view/status-row.test.mjs` and the new `tests/view/body-row.test.mjs`: the texts at death of cold and of hunger and no „Pauza” then; the body row's cut-down values (36.976 as „36,9”, 37.0 as „37,0”, 34.99 as „34,9” in `danger`); the backpack's text, empty and holding items. The screenshot check of `make-change` follows the route the foundation settles; where it settles none, the states are checked in code and the screenshot is named unchecked.
- **Change:** `src/browser/view/status-row.ts` · `src/browser/view/body-row.ts` · `src/browser/view/app.ts` · `src/browser/styles.css` · `tests/view/status-row.test.mjs` · `tests/view/body-row.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:50-55` Questions to settle (Q10, Q11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:144-146` Settlements to record (rows 5–7) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:292-341` Decision 3 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:369-418` Decision 5, Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F5 · F6 · F7 · F9 ·
  `foundations/decisions.md:39-93` D-03, D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:446-463` D-21 · `foundations/decisions.md:739-753` D-36 ·
  `foundations/decisions.md:769-873` D-38 to D-44 · `foundations/decisions.md:904-933` D-47, D-48 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:440-479` browser-view-token-values to design-token-sources ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:59-65` map run restart ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/tokens.css` · `src/browser/view/controls/button.ts` · `src/browser/view/clock.ts`
- **Model:** same — a new row of the screen, its roles and its cut-down values, and the status row's state at death.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/view/body-row.test.mjs tests/view/status-row.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_content_identifiers.py`, `test_browser_view_framework.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 5 · Slice 8 · F5 · F6 · F7 · F9

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

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/character.ts`
(the backpack's count and cap), `src/browser/sim/body.ts`, `src/browser/sim/data/items.ts`,
`src/browser/sim/data/balance.ts` (thresholds), `src/browser/sim/data/actions.ts` (status texts), and
`src/browser/sim/types.ts`, `src/browser/sim/game.ts` (the death in the map run's state; `restart`,
`end`), as they stand now.

From Slice 7's report: the status row today reads „Minuta N · Zbiera” — `status-row.ts` appends the
target's name for „Idź” only. Your goal's sentence "followed by the target's name where the action
takes one" covers „Zbierz — <zasób>” and the other new kinds that take a target.
