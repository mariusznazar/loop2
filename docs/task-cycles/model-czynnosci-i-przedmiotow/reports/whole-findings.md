# Findings of the review of the whole change (range aff09e98..f9a9d24f) — blocking findings and the Minor findings within the task, in the reviewer's words

Source: reports/review-whole-report.md (its first line: FAIL f9a9d24f2acd6aa99d9aad32d05085be1a468490). Cut by the orchestrator from the report; nothing is reworded.

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
