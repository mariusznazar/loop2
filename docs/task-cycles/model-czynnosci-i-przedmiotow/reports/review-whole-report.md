FAIL f9a9d24f2acd6aa99d9aad32d05085be1a468490

# Review of the whole change — model czynności i przedmiotów (opatrunek)

Range `aff09e987e3b64801f9011b2f8ad69c4723b4521..f9a9d24f2acd6aa99d9aad32d05085be1a468490`, 20 commits, 58 files.
`git rev-parse HEAD` in the worktree gave `f9a9d24f2acd6aa99d9aad32d05085be1a468490`; `.the-way` stands on the
pinned `19e5774aed6d1d628042e23deccc110ed9f112c0`.

Counts: blocking 2 (both Important); Minor within the task 13; Minor outside the task 2; out-of-scope findings
of the slice reviews withdrawn as resolved: 2.

## Blocking findings

### Important 1 — tests write the bandage's preliminary numbers as literals (*To do* 2 and 4)

- **Where:** `tests/view/item-verb-panel.test.mjs:186`, `:198`, `:221`, `:238`, `:240`, `:272`, `:310`, `:313`,
  `:322`, `:346`, `:347` („Wytwórz — Opatrunek (2 mchy)”, „Opatrunek (2 mchy)”, „10 min” for the recipe's minutes
  and for „Opatrz”); `tests/view/program-editor.test.mjs:1427-1428` (`actionTime(state, "tend") === "10 min"`,
  `actionTime(state, "tend", "bandage") === "10 min"`); `tests/view/rule-editor.test.mjs:1577`
  (`timeOf("Opatrz") === "10 min"`, with the comment at `:1574` that names `src/browser/sim/data/actions.ts` as the
  source of the value).
- **What is wrong:** *To do* 2 says the numbers of the recipe „stoją tylko w danych gry … a testy biorą je z danych, nie
  wpisują ich na sztywno (D-82), więc zadanie 6 poprawia je samą zmianą danych”, and *To do* 4 says the 10 minutes of
  „Opatrz” and the 25 health are preliminary in the same way. These three files write 2 moss, the 10 minutes of the
  recipe and the 10 minutes of „Opatrz” as literals. When task 6 changes the recipe or the time of „Opatrz” in the data,
  these cases fail, so the numbers can no longer be changed by data alone — what the task requires. The orchestrator
  already had slice 9 repaired for the same fault (`9e867128`); slice 13 did the recipe by shape (`BANDAGE_PRICE`,
  `BANDAGE_RECIPE.minutes`) but not the minutes of „Opatrz”, and slice 14's executor wrote the literals on purpose
  ("as the decisions D-293 and D-363 give them" — those are examples in a "such as" clause, not the source the task
  names).
- **Evidence:** `grep` of the changed tests for `2 mchy` and `"10 min"` (lines above); `tests/sim/craft-and-tend.test.mjs`
  shows the right way (`RECIPE = ITEMS.bandage.recipe`, `ACTIONS.tend.minutes`, `HEALING`).
- **Fix:** build the expected texts from `ITEMS.bandage.recipe`, `ACTIONS.tend.minutes` and the plural forms (or match by
  shape as `program-editor.test.mjs` does for the price), and drop the data-file comment at `rule-editor.test.mjs:1574`
  for the new verb.
- **Slices:** spans slices 13 (`16a720e2`), 14 (`9e9bb706`) and 15 (`301f9856`).

Contradiction: no

### Important 2 — D-441 states the fingerprint as injective, which a 64-bit hash is not

- **Where:** `foundations/decisions.md:12043` („… a short text that is the same for two contents the content revision
  counts as no change (D-442) and another for every change it counts.”) and `:12045` („… so two different contents never
  share a judging …”); code `src/browser/sim/judging-record.ts:60-90` (`contentFingerprint`, a 64-bit
  non-cryptographic hash).
- **What is wrong:** the change writes D-441 to require a different fingerprint for *every* change of content, and that
  two different contents *never* share a judging. A hash of unbounded text into 64 bits cannot meet that: two contents
  meet in it with a small chance (review 1 measured at most 62 effective bits). The spec bounded and accepted that
  chance (Decision 5, unit 1: „with a chance of a collision of at most one in 2^52”; „Cost if wrong: where a collision …
  would stand”), and the task's *To do* 15 was read by the spec as the pair not repeating — with that qualification. The
  entry restates the design without the qualification, so the code does not do what the binding sentences require
  (WAY-263: a restatement "without a qualification" is Important).
- **Why it matters:** the binding sentence is what a later change is compared with; as written it forbids every hash and
  would force a reader to treat the accepted collision as a defect, or a later author to "fix" it with a longer
  stored form.
- **Fix:** one clause in D-441, for example „… and another for every change it counts, but for a chance of a collision of
  at most one in 2^52”, and „… so two different contents share a judging only through such a collision”.
- **Slice:** none — the plan's *Foundation entries* step (`ed70970a`, row 11), which had no review of its own.

Contradiction: yes — D-441 (the entry the change writes)

## Minor findings within the task

1. **Pairs of examples kept "until tests stand" while the tests stand** — `foundations/decisions.md:6776` (D-142),
   `:6841` (D-145), `:7488` area (D-121), `:8146` area (D-380), `:8167` (D-443), `:9362` (D-293), `:9637` (D-289),
   `:9996` (D-363), `:11624` (D-318), `:12076` (D-441). Each changed entry carries a `complies`/`violates` pair "until
   tests of them stand", and its `tests:` clause does not name what the new tests hold (D-145's still says only "one
   stick serving every strike of an encounter"). At the head every such part is held by a test with a `decision:` line
   (`tests/sim/craft-and-tend.test.mjs`, `tests/sim/action-targets.test.mjs`, `tests/view/program-editor.test.mjs`,
   `tests/view/item-verb-panel.test.mjs`, `tests/view/scene-picture.test.mjs`, `tests/sim/judging-record.test.mjs`,
   `tests/balance/overlay.test.mjs`). The decision template says a sentence a test holds carries no pair, and the
   `tests:` clause names what the tests hold. Content agrees with the code, so Minor (WAY-364); a reader may still think
   no test holds these parts. From none: the plan gave no slice or step the removal; the return step can do it.
2. **The comment of the hash overstates it** (review 1, Minor 1, graded here) — `src/browser/sim/judging-record.ts:72`
   „about one in 2^64”: both lane multipliers are ≡ 1 mod 4 and both seeds ≡ 3 mod 4, so at most 62 bits; say „about
   one in 2^62” or drop the figure. Slice 1 (`0a41bd05`).
3. **Two properties of the fingerprint have no test** (review 1, Minor 2) — `src/browser/sim/judging-record.ts:59`
   (strings quoted, which keeps the canonical text injective over group names) and `:64` (`padStart(8, "0")`, without
   which about one fingerprint in eight would be shorter than 16 digits and its stored value would be refused at the next
   reading). Survivors of review 1's Stryker run; the code is right, the assertion is missing. Slice 1.
4. **A crafted-fingerprint case refused by the length cap, not the fingerprint check** (review 1, Minor 3) —
   `tests/view/judging-cache.test.mjs:445` „a fingerprint of a thousand digits”: the value is 1 097 characters, over
   `MAX_VALUE_LENGTH` 1 024, so it would pass with no fingerprint check; use about 900 digits. Slice 1.
5. **An old test name still reads as the sentence the task called wrong** (review 1, Minor 4) —
   `tests/view/judging-cache.test.mjs:882` „… once gave and no longer holds … is not removed by the above check”; after
   the comment fix the correct statement is the opposite where the held side stands above, which the case at `:905`
   pins. Rename to what it checks. Slice 1.
6. **A muddled, redundant case name** (review 1, Minor 5) — `tests/view/judging-cache.test.mjs:464` „a fingerprint of the
   form beside a value of version 1, which has none”: the value has no fingerprint at all and repeats „a value without
   fingerprint”. Slice 1.
7. **The refusal test rebuilds the product's wording of an object** (review 10, Minor 1) —
   `tests/sim/action-targets.test.mjs:99-103` (`named` returns „an object”, the rule of `shown` in
   `src/browser/sim/programs.ts`), and the `""` case asserts `includes("")`, true of any message. The refusal itself is
   asserted by `instanceof ProgramCheckError`. Slice 10 (`856fa860`).
8. **A fractional-„Opatrz” case that does not isolate the fraction** (review 11, Minor 1) —
   `tests/sim/saved-game.test.mjs:2776-2778` sets `tend = 4.5` and `gather = 55.5`, so the document is refused for either
   fraction; it cannot be isolated while the sum must hold. Slice 11 (`c791f755`).
9. **A comment that stopped being true** (review 8, out of scope there; within the task here) —
   `src/browser/view/credit-lines.ts:51-53` „in the section's order: the resources, then the campfire …” above
   `...Object.values(ITEMS)`; slice 6 (`19903a29`) changed the line and left the comment. Say „the items”.
10. **README names the resource data as the holder of the icons' titles** (review 8, out of scope there; within the task
    here for its item part) — `README.md:78` „The titles of the icons are held by the resource data in
    `src/browser/sim/data/resources.ts`”: the bandage's title now stands in `src/browser/sim/data/items.ts` and no
    resource row has it (slices 5 and 7, `38c61d4c`, `760def64`). The actions' titles in `actions.ts` were already
    missing from the sentence before the change; that part is outside the task.
11. **The guideline restates `content-identifiers` without items** — `guidelines/coding-browser-module.md:131`
    „Poza plikami danych nie wpisuj identyfikatorów ani nazw map, zasobów i archetypów.” The change widened the
    invariant to items (`foundations/invariants.md:238-240`) and its test checks them; the rule's sentence in the guideline
    lags. From none (the plan's *Foundation entries* changed the invariant without the guideline row).
12. **Two cases of the simulation's end checks have no test** (my Stryker run, below) — `src/browser/sim/run.ts:338`:
    `recipe.uses.some(…)` → `every(…)` survives, because every test of a lacking piece at the end uses a one-piece recipe;
    a two-piece recipe (as the acceptance criterion's second item may be, data alone) with one piece gone by the end would
    then be crafted. `src/browser/sim/run.ts:355-356`: the end of „Opatrz” with no piece of the target in the backpack
    survives as `false`; reachable only from a crafted saved game with a „Opatrz” activity and no bandage. The code is
    right; an assertion is missing. Slice 12 (`ef87d9e6`).
13. **The quotation at `tests/sim/craft-and-tend.test.mjs:520` fits half its case** (gap 4 of the handoff) — the case
    „what a finished „Wytwórz” or „Opatrz” takes from the backpack is exactly the price of the action with its target”
    cites D-142's sentence, which holds the end-of-action taking, not the equality with the price. The equality is in
    D-363's first binding sentence, „The rule panel shows beside an action what it costs, read from the game's data …”
    (what it costs is what it takes), so a second `decision:` line with that start-of-sentence quotation holds it; no
    foundation gap. The relation itself is a valid expectation (two functions, neither computes the other, D-82).
    Repair commit `f8ad4bd3`. The other choice, `:161` citing D-374, holds its case exactly.

## Minor findings outside the task

1. `balance/describe.mjs:21-26`: the instrument describes an item target with a capital („Wytwórz — Opatrunek”, as the
   game's row does and as *To do* 12 asks: „tak, jak pokazuje je gra”) but keeps a resource target lower-case
   („Zbierz — patyk”), unlike the game's „Zbierz — Patyk”; its own doc comment says both are worded „as the game words
   it”. The item part meets the task (it binds over the spec's „as an action with a resource is”); the resource part
   predates the change and is outside the task.
2. `tests/view/discovery-rule.test.mjs` and `tests/view/knowledge-lines.test.mjs` hold no case of „Dodaj regułę z tym” for
   a discovery of „Wytwórz”/„Opatrz” (D-313) nor of the bandage's icon on Wiedza (*To do* 9). Both go through generic code
   (`withActionKind` with `offeredItems`, `ITEMS[id].icon`) that is tested for the items of today; broader coverage only.

## Withdrawn findings of the slice reviews

- Review 10, Declined line on `tests/sim/saved-game.test.mjs` failing 19 of 45: resolved by slice 11; the file passes at
  the head.
- Review 10, Declined line on the editor, the scene and the instrument taking the verbs: resolved by slices 13, 14, 16, 17.

## What I checked against the task, the spec and the foundation

- *To do* 1–13 and 15, the acceptance criterion and the projected entry are met by the commits: the bandage is an item no
  map holds (`ITEMS` widened, `RESOURCES` unchanged, `ItemId`/`ResourceId` split with the type check holding every
  resource an item); recipe and healing in the item row; „Wytwórz”/„Opatrz” as `craft`/`tend` with `item`, targets from
  `itemTargets` (no item named in code; checked by grep of `action-targets.ts`, `item-target-pick.ts`,
  `balance/describe.mjs`, `balance/trace.mjs`); check, repertoire, D-126 pass-over, reasons and their order, end-of-action
  payment, the end check of „Opatrz”, „trwa walka” in combat, revelations with the new kind `crafted`, no practice, the
  pick (groups, greying, prices, times), panel, row, „Teraz”, chronicle, scene, icons with credits, version 10, the
  instrument, and the second item in the simulation, editor and instrument tests, moss a target of neither. *To do* 14 is
  the orchestrator's; not judged.
- Settlements rows 1–15 against their entries (gap 1): each row stands in the entry the plan names. Row 8 against D-363:
  the entry gives „Opatrz” no price at its cell, which *To do* 7 itself says („komórka „Opatrz” ma swój czas, bez ceny”),
  so the entry follows the task, not only the spec. Row 11's „scena nie dostaje nowego obrazka ani efektu” stands in D-318's
  rationale and *Rejected*, not in a binding sentence — enough for a decision that records no change of the scene. The
  group „Wytwarzanie” fifth, after „Żywność i walka”: the task's „piątej grupie” and the code agree. D-441 naming no
  version of the stored form: agrees with its existing wording („the key naming the version of the stored form”) and the
  code (`loop2-judging-2|`).
- D-443: its two binding sentences, *Scope*, *Rationale* and *Rejected* are the approved definition's word for word;
  its *Relations* (`derives from D-18 · derives from D-26`) and *Verification* were filled by the cycle, so in the request
  those two fields are the cycle's even if the entry is shown as projected. D-289's second sentence and D-441/D-442 are
  rightly the cycle's.
- Gap 6: the code and D-442 carry the pair reading (the count may repeat; nothing reads it alone), and D-289's added
  sentence is what `actionPick` does (`program-editor.ts`, `knownTargets(...).length === 0` → „nie znasz jeszcze celu”).
  The overstatement of D-441 is Important 2.
- Gap 2 (slices 6 and 7 against their unread entries): D-416 (icon from the item row), D-27, D-363 (price from the item
  row), D-425 (sizes) for slice 6; D-380 (wording, „zdrowie pełne” first), D-290, D-318, D-121 (data rows), D-145 (refusal
  at full health), D-140 (no `combat` flag, so „trwa walka”), D-306 (the target field comes in slice 13), D-310 (order),
  D-425 for slice 7 — all met.
- Gap 7, trust boundaries as the change leaves them: `saved-game.ts` (slice 11's crafted documents, re-run green; no
  later slice changed the file or its readers' shape); `previous-programs.ts` (only through `checkProgram`, whose
  `checkTarget` compares strictly with `itemTargets(kind)` read from `Object.keys(ITEMS)`, so `__proto__` and friends are
  no targets); `assets/icons/**` (slice 8's byte comparison with the source; `test_icon_file_content.py` green);
  `judging-cache.ts` (version-2 key, fifth field checked by `isContentFingerprint`, tests green). Irreversible operation:
  none in the range.
- Gap 8: every focused file I judged worth running passes at the head, and the foundation check reports 0 errors.
- Invariant tests changed by the change: `tests/invariants/test_content_identifiers.py` (items added, a control for
  items), `tests/invariants/test_program_closed_lists.py` (`craft`, `tend` added; `"craft"` out of the made-up kinds;
  `item` among plausible fields), `tests/invariants/test_program_world_reference.py` (programs with the two verbs),
  `tests/invariants/test_icon_credits.py` (two titles and authors). Each strengthens or follows its invariant; none
  weakens it.
- Reserved choice: none taken. Code made for a test (WAY-409): none found (no branch or value naming `splint`, `szyna` or
  another test input in `src/` or `balance/`).
- Executors' own-work checks of the slices without a review: each names a requirement where its slice is weakest and a
  check that would catch it (slice 2 and 16 by a break, 3 and 12 by a failing first run, 9 by two breaks, 13 and 14 by
  stubs and mutations, 17 by a break of the engine). Slice 6 saw no invariant test fail and says so; slice 15 did not run
  the case first, but executors 13 and 14 record it failing on four groups before slice 15.

## The executors' walks (gap 3)

No slice walked the running game. Slice 14 judged rightly that the panel, the row, „Teraz” and the chronicle change what
the player sees and gave a reason for every case left unchecked. From the code and tests the rendered states are right:
the closed action field „Wytwórz — Opatrunek (2 mchy)” / „Opatrz — Opatrunek (1 opatrunek)” with „10 min” beside it; the
cell „Wytwórz” with no price and no time and „Opatrz” with its time and no price; the target pick of „Wytwórz” with the
time beside each cell, of „Opatrz” with none; greyed verbs with „nie znasz jeszcze celu”; the row with time and no price.
D-88 still requires a check in a real browser after the change. A walk must still cover: the pick of actions with the
fifth group and both new cells (greyed and open), the keyboard through the target grid of each verb (arrows, Enter on a
greyed held target doing nothing), the focus after a pick of a target, the time beside the target cells and beside the
closed field, the row and „Teraz”/„Potem” during a „Wytwórz” and an „Opatrz”, the mage standing still with the verb's icon
on its badge, and the discovery plaques of moss → bandage and „Wytwórz”, and of the first bandage → „Opatrz”.

## The structure of the code the change leaves

- Sizes (`python -B .the-way/task-cycle/change_file_sizes.py aff09e98 f9a9d24f`, exit 0): 58 files, +4 425 lines. The
  largest growths in product code: `src/browser/view/rule-panel.tsx` 699 → 775, `src/browser/view/program-editor.ts`
  866 → 919, `src/browser/sim/run.ts` 781 → 820, `src/browser/sim/programs.ts` 840 → 863, `src/browser/sim/program.ts`
  510 → 539; new `src/browser/view/item-target-pick.ts` (99) and `src/browser/sim/action-targets.ts` (29).
- Thresholds: `tests/quality/test_function_and_file_size.py` run as an ordinary test in a worktree of the base and one of
  the head: both OK (exit 0); `node tests/quality/eslint-size-rules.mjs`: "0 functions and files over a threshold" in 338
  files at the base and 343 at the head. The invariant is not marked violated, so no expected-failure mark to lift.
  Nothing pushed over a threshold. Slice 4 brought `RulePanelView` down before slice 14 added to the panel; slice 13 put
  the target pick in a new module.
- Code with no user: none found (`thingName` removed; ESLint clean). Names that stopped being true: Minor 9, 10, 11.
  `item-target-pick.ts` and `program-editor.ts` import each other, the former for a type alone (no runtime cycle).

## Mutation testing (`guidelines/testing.md`, „Mutation testing”)

StrykerJS on the simulation lines of slices 7 and 12 that no slice review mutated (`run.ts:150-160,336-366`,
`body.ts:66-72`, `program.ts:93-106,384-395`, `understanding.ts:108-116,333-342`, `action-targets.ts:13-29`), with a
copy of the config whose test list is `craft-and-tend`, `action-targets`, `program`, `rule-signs`, `body`, `repertoire`,
`discovery`, `data` (the folder-wide list is the gate): 105 killed, 9 survived, 2 no coverage. Classified:
- `run.ts:338` `some` → `every`: real gap (Minor 12).
- `run.ts:355-356` the piece missing at the end of „Opatrz” (three mutants): real gap reachable only from a crafted saved
  game (Minor 12).
- `program.ts:99` `recipe?.uses ?? []` (optional chaining survived, the fallback uncovered): equivalent — the checked
  target of „Wytwórz” always has a recipe.
- `program.ts:105` `default`: equivalent.
- `run.ts:150-152` `case "lightItem"/"feedCampfire"/"eat"` and `understanding.ts:109` `case "patrol"`: lines of today
  inside the range; the campfire, eating and patrol tests that kill them are outside the narrowed list — not a gap.

## Checks run

| Check | Where | Exit |
|---|---|---|
| `git rev-parse HEAD` | reviewed worktree | 0 (`f9a9d24f…`) |
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree | 0 („0 errors”) |
| `python -B .the-way/task-cycle/change_file_sizes.py aff09e98 f9a9d24f` | reviewed worktree | 0 |
| `python -B .the-way/elements/common/decision_index.py` (`--sections`, then the selection) | reviewed worktree | 0 |
| `node tests/quality/eslint-size-rules.mjs` | base and head worktrees | 0 and 0 |
| `python -B -m unittest tests/quality/test_function_and_file_size.py` | base and head worktrees | 0 and 0 |
| `npx eslint` on the 37 changed `.ts`/`.tsx`/`.mjs` files | head worktree | 0 |
| `npx prettier --check` on the changed code, test and JSON files | head worktree | 0 |
| `npm run typecheck` | head worktree | 0 |
| `npm test -- <file>`, one file at a time, 39 files: `tests/sim/craft-and-tend`, `action-targets`, `data`, `trip`, `saved-game`, `previous-programs`, `judging-record`, `judging`, `rule-signs`, `repertoire`, `program`, `encounters`, `discovery`; `tests/view/program-editor`, `item-verb-panel`, `rule-editor`, `program-panel`, `discovery-rule`, `judging-cache`, `maps-screen`, `scene-picture`, `now-lines`, `chronicle-entries`, `icons`, `knowledge-lines`, `trip-plan`; `tests/balance/overlay`, `cli`, `trace`, `agreement`; `tests/invariants/test_content_identifiers.py`, `test_program_closed_lists.py`, `test_program_world_reference.py`, `test_icon_credits.py`, `test_icon_file_content.py`, `test_simulation_isolation.py`, `test_balance_instrument_file_writes.py`, `test_balance_instrument_repeatability.py`; `tests/quality/test_mutation_test_selection.py` | head worktree | 0 each |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json` | head worktree | 0 (results above) |
| `grep` of the changed tests for `2 mchy`, `"10 min"`, `2 × mech`, `25` | reviewed worktree | Important 1 |

Not run: the full gate (`npm test` with no argument), which the handoff reserves; `check_instructions.py` (no
instruction file changed); a walk in a real browser (none was asked of the reviewer; what it must cover is above).

## Declined to judge

- The resource description of the instrument in lower case — outside the task (Minor outside 1).
- *To do* 14, the table of the cost of the trial — the orchestrator's, as the handoff says.
- An activity whose action differs from its rule's, or whose length differs from its action's minutes, loading — exists
  before the change (review 11's Declined lines), not asked by the task.
- A burning item that cannot be lit, the bandage included, loading — exists before the change, not asked by the task.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md:263-304` (Verification): to judge the kept pairs (Minor 1).
- `src/browser/view/program-editor.ts:149-170` (`offeredItems`, `offeredResources`) and
  `src/browser/sim/understanding.ts:154-166` (`editorRepertoire`): to check that the switch of the verb and the pick of the
  target read the same items.
- `src/browser/view/` grep of `RESOURCES[` and `ITEMS[`: to check that every reader of an item reads the item row
  (*To do* 9).
- `README.md:74-82`: review 8's remark.
- `the author's global rules for git`, shown by a session hook before `git worktree add`.

## Working copies

- `.runs/review-whole/` held the decision index, the
  section list, the diffs, the logs of the checks, a detached worktree of the base at `…\.runs\review-whole\base`
  (`aff09e98`) and one of the head at `…\.runs\review-whole\head` (`f9a9d24f`), each with a junction `node_modules` to the
  reviewed worktree's, and the Stryker review config and output in the head worktree.
- Removed: each junction alone (`rmdir` without `/s`; the reviewed worktree's `node_modules` checked present after), then
  both worktrees with `git worktree remove --force` (exit 0 each) and `git worktree prune` (exit 0), then the directory
  `.runs\review-whole\` by its full path. `git worktree list` no longer shows them, and `git status --short` of the
  reviewed worktree is empty. Nothing remains; the results the report needs are written out above.

## Unread material

12 decisions of the index of my selection read whole: D-443, D-145, D-142, D-121, D-290, D-293, D-289, D-363, D-380,
D-318, D-441, D-442 (each from the head's log or from its whole hunk of the diff). The index (182 decisions in full, 202 by
heading) was read whole, and its headings outside the 14 sections were run through.

Decisions that bear on the change and stayed unread whole, read only as the index's binding sentences: D-18, D-23, D-26,
D-27, D-50, D-60, D-63, D-64, D-71, D-82, D-120, D-126, D-128, D-140, D-143, D-144, D-150, D-179, D-181, D-193, D-206,
D-291, D-306, D-309, D-310, D-313, D-317, D-320, D-322, D-334, D-340, D-367, D-374, D-387, D-401, D-416, D-425, D-427,
D-428, D-429, D-437, D-440 — the task names these in *Decisions in play* or the changed tests cite them; I judged the code
against their binding sentences and did not open their *Rationale*, *Rejected* or *Verification*.

Guideline files: read whole — `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-content-data.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-balance-instrument.md`, `guidelines/styleguide-browser-view.md` (in four parts). Not read:
`guidelines/coding-browser-api-client.md` (its *When to read* does not match: no API client changed). Invariants and part
map: the invariants the change writes (`content-identifiers`, `icon-credits`) read in the diff; the part-map entries of
the touched parts and the glossary were not opened; I took the parts from the handoff. Tests: the diffs of the changed
tests read in full for `program-editor`, `overlay`, `agreement`, the head of `craft-and-tend` (1-160) and its case list,
`now-lines` 190-247; the rest of the test diffs by grep and by running them.

## Searches not found or unclear

- A binding sentence that the price of an action equals what its end takes: not found in D-142; D-363's first sentence
  covers it (Minor 13).
- Whether the cycle's return step, rather than a slice, removes the kept pairs of examples: not stated in the plan
  (Minor 1).
- `tests/view/discovery-rule.test.mjs` and `tests/view/knowledge-lines.test.mjs`: searched for `craft`, `tend`,
  `bandage`; none found (Minor outside 2).
