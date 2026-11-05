# Findings of the review of the return step that block (the reviewer's words)

Review: `reports/report-review-return.md`, first line `FAIL c9e5eb026fb1e1ec23614cfceb2c6bed1d946809`. Range reviewed: `a504688..c9e5eb0`. Only this finding is yours; the Minor findings are not fixed.

## Blocking (Important, within the task)

1. foundations/decisions.md:6177, D-291 Verification, "complies" example. The return step reports D-291 corrected, but the commit changed only the "violates" line (6180, now "Zbierz — Patyk"). The "complies" line still reads „Zapas poniżej 8 · patyk → Zbierz — patyk”. The task's criterion (task.frozen.md:51, :30) and the code/tests (tests/view/rule-editor.test.mjs:188-189, 1001-1021) show „Zapas poniżej 8 · Patyk → Zbierz — Patyk”. The return step's report line "D-291 ... corrected" is therefore false for the example that carries the task's criterion. Now the same entry spells the target both ways. Fix: change line 6177 to „Zapas poniżej 8 · Patyk → Zbierz — Patyk”.
