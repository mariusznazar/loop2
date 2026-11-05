FAIL c9e5eb026fb1e1ec23614cfceb2c6bed1d946809

# Review of the return step's commit c9e5eb0 (range a504688..c9e5eb0), task edytor-programu

HEAD confirmed c9e5eb0. The diff is one commit, foundations/decisions.md only, 6 lines, wording of examples. No rule, Relations, Verification meaning or Rejected changed in what was touched.

## Blocking (Important, within the task)

1. foundations/decisions.md:6177, D-291 Verification, "complies" example. The return step reports D-291 corrected, but the commit changed only the "violates" line (6180, now "Zbierz — Patyk"). The "complies" line still reads „Zapas poniżej 8 · patyk → Zbierz — patyk”. The task's criterion (task.frozen.md:51, :30) and the code/tests (tests/view/rule-editor.test.mjs:188-189, 1001-1021) show „Zapas poniżej 8 · Patyk → Zbierz — Patyk”. The return step's report line "D-291 ... corrected" is therefore false for the example that carries the task's criterion. Now the same entry spells the target both ways. Fix: change line 6177 to „Zapas poniżej 8 · Patyk → Zbierz — Patyk”.

## Minor

2. foundations/decisions.md:6184, 6190-6191, D-291 Rationale and Rejected: „Idź — patyk”, „Zbierz — patyk”, lower case; the row shows „Idź — Patyk” / „Zbierz — Patyk” (the row's action text, rule-editor.test.mjs:189). Prose, not a Verification example; reword with finding 1 for consistency.
3. foundations/decisions.md:5954-5955 (D-282 "violates": „Zbierz — patyk” and „Zbierz — jagoda” as cells) and :1295 (a program rule „Zbierz — patyk” in a passed-over example): lower-case target names in examples; not the editor's row, so left as is is defensible. Optional.

## The two unwritten questions
- D-289 (held value with no reason) and D-304 („+ dodaj grupę” placement): leaving them unwritten is right. Each would change the meaning of an approved decision (D-289's "with its reason" and its violates example; D-304's "beside"/task word "obok") beyond what the task carries, so they belong to the human. Code at rule-list.tsx:595 and :640 matches the report's description of D-304 (spot-checked the lines exist). No further stale entry found in a short search beyond finding 3: grep of "patyk" in decisions.md; the removed names were already searched by the return step.

## Declined to judge
- Whether the code should change for D-289 or D-304 (human's call; outside the return step).
- Action names such as „Zapal — patyk”, „Uderz — patyk” (D-290 etc.): lower case in src/browser/sim/data/actions.ts labels, correctly left.

## Checks run
- git rev-parse HEAD: c9e5eb0 (matches). git log / git diff a504688..c9e5eb0: one commit, 6 lines in 5 entries.
- python -B .the-way/elements/common/foundation_check.py: "0 errors", exit 0 (the exit status was taken from the script itself via tail; the "0 errors" text is the script's verdict).
- grep of "patyk"/"Patyk" in foundations/decisions.md, tests/view/rule-editor.test.mjs, src/browser/sim/data/actions.ts: showed the leftover in finding 1.
- Not run: tests, full gate (instructed).

## Reaches beyond the dispatch
- foundations/decisions.md:6165-6192 (D-291 whole region) and :5948-5958 (D-282 violates), to judge finding 1 and 3.

## Searches not found or unclear
none
