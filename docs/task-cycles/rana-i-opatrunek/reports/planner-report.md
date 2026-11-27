# Planner report — rana-i-opatrunek

- Status: questions
- Plan: `.runs/task-cycles/rana-i-opatrunek/plan.md` (11 slices)
- Size report: `.runs/task-cycles/rana-i-opatrunek/plan-size.md` — every slice fits; Slices 6, 9
  and 10 fit by ranges of `tests/sim/saved-game.test.mjs`, `tests/view/program-editor.test.mjs` and
  `tests/view/rule-editor.test.mjs`; Slice 4 reads about 139 000 tokens, near the limit.
- Open design choice (section 2): none found. Reserved choice: none.

## Questions with proposed answers

The plan is whole, but three player-visible texts the task does not quote are needed by Slices 2,
4 and 7. Each Goal says the orchestrator gives the settled words in the handoff.

1. **The words of the refill of an empty pocket** (Slice 7; `GEAR_PLACES.pocket.refill` in
   `src/browser/sim/data/gear.ts`, which today has no `refill` because no action takes a piece from
   a pocket). D-340 gives the main hand's words, „Bierze patyk z plecaka do ręki”. Its general
   sentence („The refill of an empty slot of the gear (D-457) gives one entry of its own”) already
   covers a pocket, so D-340 stays true without new words.
   - Proposed: data words „bierze opatrunek z plecaka do kieszeni”, giving „Mag bierze opatrunek z
     plecaka do kieszeni” in the paragraph and „Bierze opatrunek z plecaka do kieszeni” in the
     chronicle; D-340 is not changed (the words live in the data, as the hand's do in code).
   - Evidence: `src/browser/sim/data/gear.ts:9-27`, `src/browser/view/combat-line.ts:53-54`,
     `src/browser/view/chronicle-entries.ts:412-417`, D-340.
2. **The `status` of Ucisk and its element in the paragraph of an encounter** (Slices 4 and 7).
   `ActionDef.status` is required; the paragraph writes „Mag {status}: {creature} {h}/{full}” for a
   strike, which shows the creature's health. For a healing action the mage's health says more.
   - Proposed: status „Uciska ranę”, element „Mag uciska ranę: zdrowie {h}/{pełne}”, with the mage's
     health after the turn (from `characterHealth` of the turn's record).
   - Evidence: `src/browser/sim/data/actions.ts:196-225`, `src/browser/view/combat-line.ts:38-78`,
     D-147 („after them it gives each action and its outcome in order”).
3. **The numerical preview of the three numerical branches** (Slice 2; `preview` of `BranchDef`, which
   `branchText` turns into „teraz … → po kupnie …”). The task gives the effects, not the units;
   the earlier game's data hold no units (`src/sim/data/skills.ts` of `the repository of the earlier game, loop`, branch
   `feat/archetypes`, lines 212-246). The existing units are „%”, „szt.”, „min”, „obrażeń”, and
   the existing previews hard-code the data's base (as „Mocniejszy cios” does with 6).
   - Proposed: „Mocniejszy zwój” base 25, step 5, unit „zdrowia”; „Wprawna dłoń” base 10, step −2,
     unit „min”, minimum 1; „Szybkie gojenie” base 0,05, step 0,05, unit „zdrowia na minutę”.
   - Evidence: `src/browser/sim/data/skills.ts:77-78,167-198`, `src/browser/view/character-skills.ts:51-66`.

## Concerns

- **Quotations of the decisions that change.** `foundation_check.py` requires each `decision:`
  quotation of a test to begin one of the decision's binding sentences. These files quote decisions
  that this change rewrites (count of quotations): D-379 — `tests/sim/skills.test.mjs` (10),
  `tests/sim/trip.test.mjs` (1), `tests/view/character-screen.test.mjs` (2),
  `tests/view/character-skills.test.mjs` (3); D-144 — `tests/sim/combat.test.mjs` (9),
  `tests/sim/data.test.mjs` (2), `tests/sim/encounters.test.mjs` (4),
  `tests/sim/gear-combat-wear.test.mjs` (3), `tests/sim/gear-combat.test.mjs` (2),
  `tests/sim/judging.test.mjs` (2), `tests/sim/rule-signs.test.mjs` (1), `tests/sim/skills.test.mjs`
  (3); D-150 — `tests/sim/data.test.mjs` (2); D-145 — `tests/sim/combat.test.mjs` (1),
  `tests/sim/craft-and-tend.test.mjs` (7), `tests/sim/encounters.test.mjs` (1),
  `tests/sim/gear-combat-wear.test.mjs` (1), `tests/sim/gear-combat.test.mjs` (3); D-199 —
  `tests/view/character-screen.test.mjs` (6), `tests/view/character-skills.test.mjs` (6); D-290 —
  `tests/sim/data.test.mjs` (2), `tests/sim/gear-wear.test.mjs` (1),
  `tests/view/program-editor.test.mjs` (2), `tests/view/rule-editor.test.mjs` (3); D-380 —
  `tests/sim/craft-and-tend.test.mjs` (3), `tests/sim/gear-combat-wear.test.mjs` (2),
  `tests/sim/gear-combat.test.mjs` (1), `tests/sim/gear-wear.test.mjs` (2),
  `tests/sim/rule-signs.test.mjs` (6); D-363 — `tests/sim/campfire.test.mjs` (1),
  `tests/sim/craft-and-tend.test.mjs` (2), `tests/view/counted-name.test.mjs` (2),
  `tests/view/gear-rule-panel.test.mjs` (1), `tests/view/item-verb-panel.test.mjs` (4),
  `tests/view/program-editor.test.mjs` (11), `tests/view/rule-editor.test.mjs` (6); D-387 —
  `tests/sim/acceptance.test.mjs` (1), `tests/sim/body.test.mjs` (6), `tests/sim/campfire.test.mjs`
  (9), `tests/sim/data.test.mjs` (5), `tests/sim/gather.test.mjs` (2), `tests/sim/map-card.test.mjs`
  (3), `tests/sim/world.test.mjs` (4); D-120 — `tests/sim/action-targets.test.mjs` (1),
  `tests/sim/data.test.mjs` (1), `tests/sim/loop.test.mjs` (1), `tests/sim/repertoire.test.mjs` (4),
  `tests/sim/skills.test.mjs` (1), `tests/view/program-editor.test.mjs` (1). Several quote whole
  sentences: D-145's „„Opatrz — {rzecz}” uses up one piece of the thing, … never above full
  health.” and „It is not carried out in combat …” in `tests/sim/craft-and-tend.test.mjs`, D-120's
  „An action that no character skill grows, … an archetype never filters items.” in
  `tests/sim/action-targets.test.mjs`. The plan asks the entry writing to keep quoted sentences and
  to add what is new as sentences of their own or after the quoted words, and asks the orchestrator
  to give any stale quotation in a file no slice changes to a slice before Slice 1. Rewritten as
  they stand, D-379 („The eight character skills give …”) and D-145 (its second sentence) would
  break quotations in at least five files that no slice changes.
- **No change of the instrument.** The handoff expected one might be needed for the three-row
  table. None is: `sweep` takes `--chest`, `--ranks` and `--gear` with a pocket
  (`balance/cli.mjs:46-81,173-191`; its own usage text gives `mainHand=stick,pocket1=bandage`), and
  `check-map`, which takes the chest from the take list, measures only maps an overlay adds. The
  table is assembled from six sweeps (Choices of the plan). Unverified by a run: the worktree has no
  `node_modules`.
- **The order measure with one character** (To do 5) stays the cycle's end step: task 4 is not
  merged (`balance/progression.mjs` gives no verdict of „harder”), so it runs with
  `.runs/k9-measure/same-character.mjs` of the main checkout, copied into the worktree's
  `.runs/k9-measure/` with the game built there, as the task says.
- **Base results for To do 6.** The task's 46,8% for P10 on the pack was measured at `1dce073d`,
  before task 8's gear; the comparison of To do 6 must measure the base `be4e9c09` itself, not reuse
  that figure.
- **A version change and the backup trial.** `.claude/skills/loop2-deploy/references/backup_and_restore.md:301-304`:
  a change of `SAVED_GAME_VERSION` erases the marker of the test account; the operator needs a new
  marker before the next restore trial. Worth a sentence in the request.
- **Item 1's „Wytwórz with another target grows nothing”** cannot be shown by a test of the game's
  data today: the bandage is the only item with a recipe. Slice 1's pair model makes it so by
  construction; no slice tests it.
- Slice 4 is the densest (eight files, about 139 000 tokens to read). If its executor reports it too
  large, the natural cut is the reader of `saved-game.ts` into a slice of its own before Slice 6.

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md`, rule „The screen Postać”: it says nothing about how a
  numerical branch value with a fraction is written; the task leans on the rule-editor sentence
  („Liczba z ułamkiem w zdaniu reguły stoi z przecinkiem dziesiętnym”, rule „Program editor”),
  which speaks of a rule's sentence only. Slice 8 follows it; the styleguide may want the sentence
  (maintain-styleguide).
- `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”: it says a change of
  skills and branches does not raise the version by itself, and does not name the case of To do 9 —
  a new tree whose first action an old save already holds, so that the old save would never get it.
- `guidelines/coding-simulation-module.md`: its table of files has no row for
  `src/browser/sim/gear.ts`, `src/browser/sim/judging.ts` and `src/browser/sim/judging-record.ts`,
  which exist. No slice of this plan changes them.
- `.claude/skills/loop2-balance/SKILL.md`: it does not say how to measure a map of the game with
  the chest of a take list and `--ranks` together (only `check-map`, for overlay maps, takes the
  chest from the take list); the plan composes it from `sweep`.
- None missing in `guidelines/coding.md`, `coding-content-data.md`, `coding-browser-module.md`,
  `coding-balance-instrument.md`, `testing.md`, `src/browser/AGENTS.md`.

## The order of work and the styleguide's example

The styleguide's example („Plan of a user-interface change”: environment and library, values in
their source, one screen, its states) is about building screens from nothing. This change adds no
token, no control and no screen; the view reads what the simulation and the data give. So the view
slices (7 to 10) come after the simulation's (1 to 6), the data first, and no slice follows the
example's steps — a departure, explained.

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md`, whole — to settle whether a guideline goes to a slice
  whole (it does), which sets the size of the view slices.
- `.the-way/elements/common/foundation_check.py:1-110` — to learn how `decision:` quotations are
  checked (the concern above).
- `.the-way/task-cycle/slice_size.py:1-120` — its limits, before cutting.
- `the repository of the earlier game, loop`, branch `feat/archetypes`, `src/sim/data/skills.ts:212-246` (the earlier
  game's skill `tending`), read with `git show` — for the units of the previews (question 3) and
  the shape `grownBy` of pairs that the plan takes.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md:278-305` — what a change of the
  saved game's version does to the restore trial.
- `tests/sim/rules.test.mjs` (its test names), `tests/sim/understanding-fixture.mjs`,
  `tests/balance/agreement.test.mjs:1-60`, `tests/balance/progression.test.mjs:295-328`,
  `tests/sim/previous-programs.test.mjs:128-284`, the outline of `tests/sim/saved-game.test.mjs`
  — to name slices' files and ranges.
- `foundations/decisions.md` beyond the dispatch: D-425 (the dispatch named it with the rule of
  size), D-18 range located but not used.

## Working copies

- `.runs/planner/base` — a detached
  worktree of `be4e9c09`, on which `node tests/quality/eslint-size-rules.mjs <that path>`, run from
  the main checkout `the main checkout of the repository` (at `f2263d05`, whose `eslint.config.mjs`,
  `tests/quality/eslint-size-rules.mjs` and `package-lock.json` are identical to the base's, and
  which holds `node_modules`), printed „0 functions and files over a threshold in 382 files”.
  Removed with `git worktree remove --force` and `git worktree prune`.
- `.runs/planner/` — the index of
  decisions (`decision_index.py` output), a copy of the earlier game's `skills.ts` and a list of
  quotation openings. Removed whole; nothing of it is needed beyond what this report states.
- No remainder.

**Unread material:** `guidelines/styleguide-browser-view.md` was read whole in four parts (lines
1-560, 560-1119, 1119-1588, 1588-1979). `.runs/task-cycles/rana-i-opatrunek/task_frozen.md` read
whole in two parts (1-170, 171-230). `foundations/decisions.md` read only through the index of the
46 decisions named (each entry whole as the index gives it, binding sentences and fields up to its
*Scope*; their *Verification*, *Rationale* and *Rejected* fields are not in the index and were not
read). Of the code and tests, read in part: `src/browser/sim/program.ts` (1-140, 320-651),
`src/browser/sim/run.ts` (96-400, 540-728), `src/browser/sim/saved-game.ts` (80-119, 320-449,
745-784), `src/browser/sim/types.ts` (40-129, 140-179, 350-369), `src/browser/sim/programs.ts`
(150-239), `src/browser/view/program-editor.ts` (690-930), `src/browser/view/scene-picture.ts`
(185-224, 580-609), `tests/sim/data.test.mjs` (600-709), `tests/sim/reference-programs.mjs` (1-75,
600-682), `tests/sim/saved-game.test.mjs` (80-114 and its outline), `balance/progression.mjs`
(1-100), `.claude/skills/loop2-deploy/references/backup_and_restore.md` (278-307). Not read: the
dispatch's `src/browser/view/` screen Postać and rule panel beyond `character-skills.ts`,
`combat-line.ts`, `item-target-pick.ts` and the grep of `character-trees.tsx`; `tests/view/` beyond
greps and sizes; `balance/cli.mjs` beyond greps.

**Searches not found or unclear:**
- The words of a pocket's refill, the `status` and paragraph element of Ucisk, the units of the
  three previews — in the task, the foundation and the code: not found (questions 1 to 3).
- `--ranks` on `check-map` for a map of the game: unclear in the balance skill whether `check-map`
  measures a map of the game at all; its code measures only maps an overlay adds
  (`balance/check-map.mjs:1-8`).
- Whether the main tests that list the cells of the group „Żywność i walka” are the only view tests
  that break when Ucisk joins the data: found four (`tests/view/program-editor.test.mjs:1068-1118`,
  `tests/view/rule-editor.test.mjs:1700-1765`, `tests/view/icons.test.mjs:134-276`,
  `tests/view/gear-editor.test.mjs:144-160`) by a search of „"Odskocz",” and „Załóż”; tests that
  check a whole discovery of the moss minute may break too and were not enumerated (Slices 2 and 5
  name `tests/sim/craft-and-tend.test.mjs`, `tests/sim/discovery.test.mjs` and
  `tests/sim/data.test.mjs`).

## Check result

`python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/rana-i-opatrunek/plan.md`: exit 0,
all 11 slices fit (three by ranges). The size of functions and files on the base: 0 over a
threshold. Not run: no test, no balance command (no `node_modules` in the worktree).
