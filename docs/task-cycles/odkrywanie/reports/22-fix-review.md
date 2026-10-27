PASS bdef6f8058037c9ca153e8b37b4f1c85f162b472

# Review of the fix of I-1 — task cycle odkrywanie

- Fix range: `1f3e2917a0b0aa5e90b976777f9e6f01c74079ed..bdef6f8058037c9ca153e8b37b4f1c85f162b472`, one commit: `fix: :bug: leave kinds that name a target out of the editor's lists while no target is offered`. It changes `src/browser/view/program-editor.ts` and `tests/view/program-editor.test.mjs`. `git rev-parse HEAD` in the worktree is bdef6f8.
- Method: project skill `the-way-review-change`, section 4 (review of a fix) of `.the-way/task-cycle/review/SKILL.md` (pinned 574a37b).
- Read: the findings file `.runs/task-cycles/odkrywanie/reports/21-findings-I1.md`, the section "Fix of I-1" of `.runs/task-cycles/odkrywanie/reports/slice-11-report.md`, and the fix diff.
- Counts: findings fixed 1 of 1; new blocking 0; Minor 1; out of scope 0.

## Findings of the findings file

**I-1 — fixed.**
- What changed: the author took the first of the two proposed ways and does not contest the finding.
  - `offeredActionKinds` leaves out „Idź” and „Zbierz” (`takesResource`) while `offeredResources` is empty.
  - `offeredConditionKinds` leaves out „Tu leży mniej niż” while no resource is offered, and „Zapas poniżej” while no item is offered.
- Why that fixes it: every kind the selects now offer can be turned into a rule. The edit after such a choice therefore cannot return null, so the select cannot show a kind the program does not hold. A rule that already holds one of these kinds still shows it, after the offered kinds, through `showChoice`. The rule is shown as the program holds it.
- Effect on the rest of the editor:
  - The group condition select uses the same `offer.conditions`, so it gets the same fix.
  - „Dodaj regułę” still depends on `offer.actions` being non-empty. „Eksploruj” needs no target, so the button stays enabled from the first chill on.
- Evidence on the fix head:
  - The scratch script of the finding (`scratchpad/entr2.mjs`, a send to Las at real time 1760000000000, whose entrance tile holds nothing) now gives at minute 104:
    - `offeredActionKinds` = `["explore","wander"]`
    - `offeredConditionKinds` = `["always","temperatureBelow"]`
    - `offeredResources` = `[]`, `offeredItems` = `[]`

    Before the fix, the actions included `walkTo` and `gather`, and the conditions included `hereBelow` and `itemBelow`.
  - The two new tests fail against the editor of 1f3e291 and pass against bdef6f8 (see Checks):
    - one on the pure lists, with a control: with `items: ["moss"]` all four kinds come back;
    - one on the document model: the third rule, holding „Idź”, still shows it after the offered kinds, and the condition select offers „Zawsze” alone.

## New findings in the fix diff

### Minor

**M-F1. The fix's tests do not cover the mixed case, where the Understanding holds an item that is no resource of the shown map.**
- In that case „Zapas poniżej” is offered and „Tu leży mniej niż”, „Idź” and „Zbierz” are not. The two flags are computed separately (`program-editor.ts`, `named.hereBelow` and `named.itemBelow`), so the code handles it correctly.
- No test pins the two flags apart. A change that merged them into one condition would pass.
- With one map whose resources are all the items, the case cannot occur in play today.

No Critical or Important finding in the fix diff.

## Declined to judge

(none)

## Checks run

- A separate worktree of bdef6f8 in the scratchpad, with `node_modules` linked, removed after use:
  - `npm run build`: exit 0.
  - `node --test tests/sim/*.test.mjs tests/view/*.test.mjs`: exit 0, 430 pass, 0 fail.
  - Control, the new tests against the pre-fix editor: `src/browser/view/program-editor.ts` restored from 1f3e291 in the scratch worktree only, rebuilt, then `node --test tests/view/program-editor.test.mjs`. Exit 1: 36 pass, 2 fail, the two new tests. The file was then restored to bdef6f8.
  - prettier `--check` on both changed files: exit 0.
  - `eslint --max-warnings 0` on both changed files: exit 0.
  - `node scratchpad/entr2.mjs <worktree>`: the result is above.
- Not run:
  - The full `npm test`: it is the cycle's own run. The fix report gives exit 1, with only the base's three Python failures.
  - `foundation_check.py`: the fix touches no file of the foundation, and the fix report gives exit 0.
  - A manual browser check of the fix: the send's real time cannot be set from the page, so the empty entrance tile cannot be reached there on purpose. The lists are covered by the document-model test and the scratch run.

## Reaches beyond the dispatch

None beyond reusing the scratch script `entr2.mjs` of the whole-change review. The reviewed worktree is unchanged: `git status` is clean and HEAD is bdef6f8.
