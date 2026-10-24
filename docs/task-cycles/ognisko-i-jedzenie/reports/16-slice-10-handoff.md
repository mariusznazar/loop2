# Handoff — executor of Slice 10, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 10** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `ab1558b09c2fbf37a106c34e0b6b731f5d387f2e` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/16-slice-10-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:285-311`)

### Slice 10 — the campfire's icon and its credit

- **Goal:** An SVG icon of a campfire from game-icons.net stands directly in `assets/icons/`, copied from the repository github.com/game-icons/icons at the commit `ICON_SOURCE_COMMIT` of `src/browser/view/credits.ts` and changed as the four icons there are (`assets/icons/wood-stick.svg` shows how: no black background, the shape in their colour, which the styleguide ties to `text-strong`), named after its source file as the four are (`assets/icons/campfire.svg` stands here for that name; the report names the file taken, its page and its author). It holds nothing that runs and refers to nothing outside itself (`icon-file-content`). The campfire's data, `src/browser/sim/data/campfire.ts` (Slice 3), names its icon file and the icon's title as its page on game-icons.net gives it. `credits.ts` credits it — author, page, changes —, and the footer shows its line beside the four resources' — „ognisko: „<title>”, <author>, game-icons.net, CC BY 3.0, zmienione (bez tła, jasny kolor)” —: the footer's credits come from every icon the data names, not from the resources alone, with names from the data. With the icon, through the pinned skills of their elements, the slice writes F21 after the pattern of `game-icons-wood-stick-title` (the page and an archived copy, read on the day), F22, and F23 where the icon's author is not Delapouite. `tests/invariants/test_icon_credits.py` names the new file's author and title, and `tests/view/icons.test.mjs` covers the icon the campfire's data names — its file, its credit and its footer line. The file comes from outside the product and is untrusted (part map, *External context*). Where the source cannot be fetched, the slice returns `blocked`, naming the missing access; no icon is drawn by hand or taken from elsewhere.
- **Change:** `assets/icons/campfire.svg` · `src/browser/sim/data/campfire.ts` · `src/browser/view/credits.ts` · `src/browser/view/footer.ts` · `tests/view/icons.test.mjs` · `tests/invariants/test_icon_credits.py` · `foundations/environment_facts.md` · `foundations/invariants.md`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:30-30` To do (item 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:87-87` Context (icons) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:154-154` Settlements to record (row 15) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:86-89` Constraints (D-27 and the icon invariants) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:420-480` Foundation entries ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F15 · F21 · F22 · F23 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:590-622` D-27 ·
  `foundations/decisions.md:739-753` D-36 · `foundations/decisions.md:844-858` D-43 ·
  `foundations/invariants.md:222-233` content-identifiers ·
  `foundations/invariants.md:301-335` icon-file-content, icon-credits, loop2-container-icons ·
  `foundations/environment_facts.md:57-87` game-icons-licence to game-icons-wood-stick-title ·
  `foundations/part_map.md:3-25` browser-view · `foundations/part_map.md:143-156` External context ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` ·
  `assets/icons/wood-stick.svg` · `src/browser/sim/data/resources.ts` ·
  `tests/invariants/test_icon_file_content.py` · `tests/invariants/test_loop2_container_icons.py`
- **Model:** same — an untrusted file changed by hand to the four icons' pattern, and the footer's credits widened beyond the resources.
- **Risk:** trust boundary — `assets/icons/**` (part `browser-view`): the campfire icon from game-icons.net, untrusted
- **Checks:** `npm run build`; `node --test tests/view/icons.test.mjs`, first failing on the campfire's icon, then passing; `npm run typecheck`; `node --test "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_icon_file_content.py`, `test_icon_credits.py`, `test_content_identifiers.py`, `test_loop2_container_icons.py`; `python -B -m unittest discover -s tests/deploy -p test_loop2_image_icons.py`; `python -B .the-way/elements/common/foundation_check.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. A container check that reports itself skipped on this machine is named as unchecked; the Ruff check of the changed Python file cannot run — Ruff is not installed.
- **Depends on:** Slice 3 · F15

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

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/campfire.ts`
and `src/browser/sim/data/items.ts`, as they stand now.

This slice crosses the trust boundary `assets/icons/**`: the icon file is untrusted input from
game-icons.net. A review of this slice of its own follows (`review-change`), told so. Reading the
icon's source and page outside the repository is yours to do; without network access return
`blocked` naming it, never an icon from elsewhere or drawn by hand.
