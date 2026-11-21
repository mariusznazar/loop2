PASS 606048b4261ce45c14a864efa08471cfadc009e2

# Review of the return step — model-czynnosci-i-przedmiotow

Range `3a5548f15fdae665407a6954943d4324bf819fa1..606048b4261ce45c14a864efa08471cfadc009e2`, one commit `606048b4` (`git log` shows it alone). `git rev-parse HEAD` = `606048b4261ce45c14a864efa08471cfadc009e2`, as the handoff gives. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the gitlink's commit. The diff touches `foundations/decisions.md` (+D-444, D-120 and D-128 *Verification*) and `guidelines/testing.md` (one cell) only.

Counts: blocking 0, Minor 1, out of scope 0.

## Findings

### Critical

none

### Important

none

### Minor

1. `foundations/decisions.md:6704-6706` (D-444 *Verification*) and `tests/sim/data.test.mjs:439-445`, `:494-502`. D-444 keeps its whole pair of examples although tests hold parts of its sentence in fact: the case „the bandage is no resource and lies on no map” checks that `bandage` has no row of `RESOURCES` and no map lays it (the pair's first `complies` half and first `violates` item), and the case „every item of a resource takes its words from the resource, …” checks that each item that is a resource has the four words of its resource row. The first case carries `// decision: D-443 "An action is a verb with a target, and the targets a verb takes follow from the properties of the items in the game's data"`, a sentence that case does not hold — it holds D-444's first sentence, which did not exist when the line was written; the second case carries no `decision:` line. By the template's own definition („A test holds a decision's sentence by a line `decision:`”, `.the-way/elements/decisions/template.md:200`) no test holds D-444 today, so its pair is allowed in form, and its content agrees with the code (`src/browser/sim/data/items.ts:57-60`, `:78-107`; `resources.ts`; `run.ts:213-214`). What is weak is what the rule of `return_step.md:16-18` aims at: where a test holds part of a decision the step writes, the part leaves the pair and the test is named by `tests:`. Moving the `decision:` line of the first case from D-443 to D-444 (and adding one to the second case for the words being equal) is a comment-only change of a test that would let D-444 name those tests and keep its pair only for what no test holds — that the words of a resource's item are taken by reference, not written twice with equal values (the equality test passes for both), and that gathering gives the item of the same identifier. Consequence today: `foundation_check.py` does not tie the two data cases to D-444, so a later change of D-444's sentence is not met by a stale quotation, and a reader of D-443's tests is pointed to a case about resources. No user-visible effect. Graded Minor by WAY-364 (a form matter where the content agrees with the code; no sentence a reader would read wrongly). The return report names the same doubt (`return-report.md`, lines 57 and 98).

## Answers to the handoff's questions

- **Does D-444 say what the code does, and nothing it does not?** Yes. Every item has a row of `ITEMS` with `name`, `plural`, `icon`, `iconTitle` (`ItemDef`, `items.ts:4-48`); `ITEM_ROWS` `satisfies Record<ResourceId, ItemRow>` (`items.ts:107`), so every resource identifier is an item identifier and has an item row; `RESOURCES` holds stick, berry, moss, fibre (`resources.ts:20-45`), each laid by some map (`maps.ts`: stick and berry 6 entries, moss and fibre lines 87-88, 106-107), and no bandage (`data.test.mjs:439-445`); the four resource items take their words by `...wordsOf(id)` from the resource row (`items.ts:57-60`, `:79-97`), the bandage its own (`:98-106`); gathering puts the piece into the backpack under the resource's identifier (`run.ts:213-214`). D-444 claims nothing beyond these.
- **A binding choice, or a restatement?** A choice that binds after the merge: every later item made by a recipe follows it, and the task's *Questions carried to cycle* leaves this exact choice to the cycle with two ways named. It restates neither D-443 (verbs and how their targets follow from item properties), D-18 (content in data files) nor the invariant `content-identifiers` (no data identifier named in the view's code). Its *Rejected* holds the two ways the human-accepted task document keeps, with their costs; the spec's third way and the load cost stay out, as the template gives for `the cycle's`.
- **Is its pair allowed?** Yes in form; see Minor 1 for what the rule of the return step would rather have.
- **Does an unchanged entry still disagree with the code?** No disagreement found. `grep -i -E "ItemId|ResourceId|recipe|przedmiot|zasób|zasob"` over `foundations/*.md`, and every line of `foundations/*.md` holding „resource” together with item, backpack, chest or bandage, were read: D-18 (recipes in data, true), the view's words „Dodaj przedmiot” and „{przedmiot}” (`decisions.md:8529-8531`, `:9025-9026`, item lists and placeholders), D-7208 „Obchód — {zasób}” (map resource, true), D-11829/D-11844 (icon of the gathered resource from the data, true under D-444), D-363 *Verification* „the forms of every resource's name in the data” (true — `program-editor.test.mjs:1841`; the items' forms, the bandage's included, are held by `data.test.mjs:384-418`, which the clause does not deny), D-121 *Rationale* („the first piece of an item crafted is a kind of revealing event of its own”, true: `revelations.ts:18-19`, `understanding.ts:336-340`). The glossary holds no „resource”; `invariants.md` uses „resource” only for what lies on tiles, and `content-identifiers` already names items.
- **D-128 and D-120 corrections.** D-128 *Verification* now lists the first gathered moss and the first piece of an item crafted, which `data.test.mjs:629-642` (`ROWS`, under `decision: D-128` at :669) and `craft-and-tend.test.mjs:708` hold; no binding sentence changed. D-120 *Verification* adds „Wytwórz” and „Opatrz” with an item as the target to the actions staying open with no predisposition, which `data.test.mjs:541-566` (free actions `wander`, `walkTo`, `walkToCampfire`, `tend`, `craft`) and `action-targets.test.mjs:407` hold. Both agree with the code.
- **`guidelines/testing.md:178`.** „z piętnastoma, siedemnastoma i dziewięciuset cyframi” matches `tests/view/judging-cache.test.mjs:443-445` (`FINGERPRINT.slice(1)`, `${FINGERPRINT}0`, `"0".repeat(900)`); the rest of the cell was unchanged by the range.
- **Trust boundary.** The diff holds no code, no test, no boundary file (`git diff --stat`: two files, `foundations/decisions.md`, `guidelines/testing.md`).

## Declined to judge

none

## Checks run

- `git rev-parse HEAD` — exit 0, `606048b4261ce45c14a864efa08471cfadc009e2`.
- `git log --format='%H %s' 3a5548f1..606048b4`, `git diff --stat 3a5548f1..606048b4`, `git diff 3a5548f1..606048b4` — exit 0.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — exit 0, both `19e5774a…`.
- `python -B .the-way/elements/common/foundation_check.py` (worktree root) — exit 0, „0 errors”, nothing listed for D-444, D-128, D-120 or the testing guideline.
- Manual: the code and tests named above read against D-444, D-128, D-120 and the guideline cell; searches of `foundations/` as above.
- Not run: any test file — the range changes no code and no test, so no test result tells this change from a broken one; `npm test` is the orchestrator's gate.

## Reaches beyond the dispatch

- `src/browser/sim/run.ts:182-235` — to verify D-444's „gathering a resource gives pieces of the item of the same identifier”.
- `src/browser/sim/data/maps.ts` (grep for the resource ids) — to verify that every resource lies on some map.
- `foundations/invariants.md`, entry `content-identifiers` whole, and the „resource” lines of `invariants.md` and `environment_facts.md` — the handoff's search.
- D-363 whole and D-121's *Rationale* tail (`decisions.md:7510-7530`) — hits of the search that bear on items and resources.
- `tests/view/judging-cache.test.mjs:425-459` — to verify the guideline cell.
- `tests/` grep for `D-120|D-128` and for plural forms — to verify the two *Verification* clauses and D-363's.
- `.the-way/elements/decisions/template.md` whole — the handoff names it for the pair.

## Working copies

None made. The directory `.runs/review-return/` was not created; a redirect into it failed before any file was written. Nothing to remove.

## Unread material

- `spec.md`: read lines 113-442 (*Decisions* 1-5, trust boundary, *Foundation entries*, start of *Left to the maker*); lines 1-112 and after 442 not read — the handoff names only the *Decisions* and *Foundation entries*.
- `src/browser/sim/understanding.ts`: read by grep around `happened` (lines 317-343) only. `src/browser/sim/types.ts`: grep of `ItemId|ResourceId` only.
- `tests/sim/data.test.mjs`: read lines 560-689 and the grep hits; not whole.
- D-121: read its *Rationale* tail only (lines 7476-7530 partly), not whole; the range does not change it.

## Searches not found or unclear

- No `decision: D-444` line in any tracked file (grep of the worktree outside `.runs`, `.the-way`, `node_modules`) — the ground of Minor 1.
