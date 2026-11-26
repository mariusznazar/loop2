Status: done with concerns

# Executor report — Slice 13: the program editor offers „Puste” and „Załóż”

## Commits

- `f9be98ce` on `task/wyposazenie-postaci`, range from the slice base `778ea803`:
  `feat: :sparkles: the program editor offers the condition „Puste” …` (4 files, +237 −5).

Files, with added and removed lines:

| File | Added | Removed |
|---|---|---|
| `src/browser/view/program-editor.ts` | 46 | 4 |
| `src/browser/view/rule-panel.tsx` | 5 | 1 |
| `tests/view/gear-editor.test.mjs` (new) | 182 | 0 |
| `tests/view/program-editor.test.mjs` | 4 | 0 |

## What the slice changed

- `program-editor.ts`: a new condition „Puste” starts with the first place some item fits
  (`fittedPlaces()[0]`, here „Ręka główna”), its target field lists the fitted places in the
  order of the places (`placePick`), its sentence reads „Puste — {miejsce}”, it takes a target
  field in `conditionFields`, and `withConditionPlace` changes its place (null where unchanged
  or where the condition is not „Puste”). „Załóż” needed no code: its targets, its „1 min”, its
  sentence and its place at the end of „Żywność i walka” already came from the data and the
  shared functions.
- `program-editor.test.mjs`: only the expected lists move: `emptyPlace` after
  `awayFromCampfire` in the condition kinds, `equip` after `dodge` in the action kinds,
  „Załóż” after „Odskocz” in the group, „Puste” after „Energia natury poniżej” in the body
  section. These were the three failing tests of the base (see below).
- `gear-editor.test.mjs` (new, 10 tests): the „Puste” pick offered to the Understanding only,
  the new condition's default place, the target pick (`Ręka główna`, `Kieszeń`, no `Głowa`), the
  sentences, the field order, the place change, and the „Załóż” targets, group place, time,
  price and sentence, and its target choice.

## Reach beyond the Change list (named as the Goal needs it)

- `src/browser/view/rule-panel.tsx` (not in the slice's *Change*): `conditionTargetPick` now
  returns place cells, so `asSection` takes `PickCell<string>[]` (typecheck needs it), and the
  panel's `changedProgram` commits a picked place through `withConditionPlace` for „Puste”.
  Without that branch the pick of a place would commit nothing. Reason: the Goal says the pick
  offers the places; a pick that does nothing would not be the offer. Read only: lines 30–70 and
  185–300 of that file, not the whole file.
- Read only, no change: `src/browser/sim/program.ts` (`fittedPlaces`), `src/browser/sim/data/gear.ts`,
  `src/browser/sim/action-targets.ts`, `src/browser/sim/data/actions.ts`, `src/browser/sim/data/conditions.ts`,
  `src/browser/view/item-target-pick.ts` (parts).

## Checks

Each command run from the worktree root, exit codes as printed.

1. `npm test -- tests/view/gear-editor.test.mjs` — before the implementation, with a stub
   `withConditionPlace` in place so the test reached its assertions: **exit 1**, 5 of 10 failing,
   all the „Puste” cases (the `Załóż` cases passed already, see below).
2. `npm test -- tests/view/gear-editor.test.mjs` — after: **exit 0**, 10 pass, 0 fail.
3. `npm test -- tests/view/program-editor.test.mjs` — on the base (`778ea803`): **exit 1**, 3 failing:
   „every program the editor builds passes setProgram, before sending and during a run”,
   „the actions of the pick stand in five named groups …”, „the conditions of the pick stand in
   four sections with no names …”. After the change: **exit 0**, 63 pass, 0 fail.
4. `npm test -- tests/view/item-verb-panel.test.mjs` — **exit 0**, 6 pass.
5. `npm run typecheck` — **exit 0**.
6. `npm test -- <file>` for the view tests that import the rule panel or the editor, after the
   change: `account-screen` 0, `end-window-game` 0, `group-arrows` 0, `program-panel` 0,
   `rule-window` 0, `run-screen` 0, `shared-controls` 0 (all exit 0); `rule-editor` **exit 1**,
   3 failing (see the base result below).
7. `npx prettier --check` on the four files — **exit 0** (after `prettier --write` on the new test file).
8. `npx eslint` on `program-editor.ts`, `rule-panel.tsx`, `gear-editor.test.mjs` — **exit 0**.
9. `python -B .the-way/elements/common/foundation_check.py` — **exit 1**, 2 errors, both in
   `tests/view/character-screen.test.mjs:134` (D-446) and `:400` (D-445), not in this slice's
   files. My own first draft of the new test file had 3 such errors (quotes that did not begin a
   sentence of D-459 and D-443); I fixed them, and the new file adds none.
10. Not run: the full suite `npm test` without a file (the handoff says the product's gate is not
    the executor's), `python -B .the-way/instruction-files/check_instructions.py` (not in this
    slice's checks).

## Tests that fail, and their result on the base

- `tests/view/rule-editor.test.mjs`, 3 tests fail after the change: „in a grid the arrow keys move
  among the cells, two columns of conditions …” (expects „Tu leży mniej niż” after two arrows,
  gets „Puste”), „the actions stand in the five groups … Żywność i walka …” (lacks „Załóż”), and
  „the conditions stand in two columns in their sections …” (lacks „Puste”). **On the base the
  same 3 fail** (run with my diff set aside, the same file restored from `HEAD`, then restored
  again; `ℹ fail 3`, same names). They expect the pick from before Slices 6 and 12, which the data
  already changed. They are outside this slice's *Change* and I left them as they are.
- The three failing `program-editor.test.mjs` tests on the base are the slice's own (fixed above).

## Own-work check (SKILL.md section 3)

- Requirement most likely unmet: the pick's place commit in the real rule panel (the branch I added to
  `rule-panel.tsx`). No automated check reaches it: the panel's jsdom tests (`rule-editor`,
  `item-verb-panel`) do not pick a place. Not written in this slice; it is the browser check's
  ground (Slice 15). Run: not run.
- Requirement covered by the new tests: „Puste” offered only once the Understanding holds it;
  default place „Ręka główna”; targets `Ręka główna`, `Kieszeń`, no `Głowa`; sentences
  „Puste — Ręka główna” and „Puste — Kieszeń”; field order; place change commits only a change;
  „Załóż” targets from the items whose row names a place, „1 min”, no price, „Załóż — Patyk”,
  its choice of the first target.
- Mutations, reasoned in my head and not run: first place becoming the last fitted one (the
  default-place test should fail); greyed flag inverted (the target test should fail); separator
  changed (the sentence test should fail); `conditionFields` without the target field (the field test
  should fail); `withConditionPlace` committing an unchanged place (its same-place case should fail).
- Test-first: the five „Puste” cases failed on assertions first (run 1 above). The „Załóż” cases
  passed on the base, because the view already had them from earlier slices (data, pick and
  sentence); they are characterisation cases, not a failing-first test. Said plainly here.

## Walk and screenshot (walkthrough.md, ui_check.md)

- The change alters what the editor shows (the pick of conditions and targets, the sentence of a
  rule). Not performed: the plan's Goal assigns "the check of the editor in a real browser" to
  Slice 15, so no walk or screenshot was made here. Every case of a walk is therefore unchecked,
  with that reason. This is a gap the orchestrator must place (Slice 15, or a walk now).

## Choices made

- The default place of „Puste” is the first of `fittedPlaces()` (the main hand). Rejected: no
  default, a null condition until the player picks. Cost if wrong: the rule starts with the main
  hand, which the player can change.
- The target pick offers only the fitted places; a held place that no item fits any more is shown
  greyed, with no reason, which is how `itemBelow` shows its held item. Rejected: all six places
  greyed where they do not fit (the plan says the pick offers the fitted ones). Cost: none known.
- No `noTarget` reason for „Puste”: the data always has a fitted place. Rejected: a reason branch
  that never shows. Cost if the data later holds no fitted item: the target pick is empty and the
  choice commits nothing, with no reason shown.
- `rule-panel.tsx` widened to `PickCell<string>` and given a „Puste” commit branch (reach above).
  Rejected: casting the places to `ItemId` in the editor, which would type a place as an item.
- Test changes were limited to the expected lists, as the plan's wording allows; no assertion was
  weakened.

## Unread material

- `tests/view/rule-editor.test.mjs`: read only the three failing tests' region (around lines
  1564–1600 and the failing `it` bodies in the output), not the whole file.
- `src/browser/view/rule-panel.tsx`: lines 30–70 and 185–300 only.
- `src/browser/view/item-target-pick.ts`: read by grep for `targetName`, `namesItem`, `knownTargets`,
  `itemTargetTime`, not whole.
- `docs/task-cycles/wyposazenie-postaci/plan.md`: not opened; the handoff carries Slice 13's text
  word for word, which is what I used.
- Read whole: the handoff, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `guidelines/coding.md`,
  `guidelines/testing.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `src/browser/AGENTS.md`, `.the-way/task-cycle/change/ui_check.md`, `walkthrough.md`; from
  `task_frozen.md` lines 34–38 and 273–277; decisions D-290, D-293, D-363, D-443, D-458, D-459 (the
  ranges of the handoff); `foundations/part_map.md` browser-view.

## Searches not found or unclear

- The Goal's „row 21 (F28)” and „row 23 (F18)” are read from the table lines of `task_frozen.md`
  (lines 273–277), which I did read.
- Unclear: whether a held „Puste” place that no item fits any more should stay in the pick greyed
  or disappear. I chose greyed, as `itemBelow` does for a held item.
- Not found: a test that drives the rule panel's pick of a place. None exists in the repository.
- `foundation_check.py` reports 2 errors now (the handoff said 14 before the slices); those 2 are in
  `character-screen.test.mjs`, not in this slice.

## Problems observed, with evidence

- An accidental edit to the main checkout, `src/browser/view/program-editor.ts`
  (+4 lines, a `newCondition` branch), made by a wrong path in one Edit call. I restored that file
  with `git checkout -- src/browser/view/program-editor.ts` in `the main checkout of the repository`, which had
  been clean before (`git status` was clean at the start and is clean again). No other file in
  the main checkout was touched. The branch's own file was edited with the worktree path afterwards.
- `rule-editor.test.mjs` fails on the base as described above; it is not a slice-13 regression.

## Working copies

- `.runs/executor-13/` in the worktree held my check logs and a backup patch of the uncommitted
  work (`slice-13-wip.patch`) made before a base run. The patch is in the commit now. The directory
  is removed before I return (full path, `git worktree` not used: no worktree was made).
- No worktree, clone or screenshot was made.
