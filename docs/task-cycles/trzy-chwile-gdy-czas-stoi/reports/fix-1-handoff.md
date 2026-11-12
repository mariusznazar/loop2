# Handoff — the fix of a review's findings, task trzy-chwile-gdy-czas-stoi

You are the author of the change, resumed for the fix. Same delegation, worktree and rules as in
`reports/author-handoff.md` (no push of anything, anywhere — the task branch and the screenshots
repository included; commit by path, messages in English; do not run the product's full gate).

- Method and variant: `.the-way/task-cycle/change/SKILL.md`, **the fix of a review's findings**
  (re-read the variant's file `.the-way/task-cycle/change/fix.md` now, whole).
- Findings file: `reports/findings-1.md` (in `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/`) — cut word
  for word from the review of the whole change (`reports/review-1-report.md`, `FAIL 81578d66`): four
  blocking findings (Important 1–4) and five Minor findings within the task. Fix **all nine**, or answer
  with evidence the ones you hold wrong; the reviewer alone grades them.
- Reviewed head and fix range: the range of your fix runs from `81578d6653c3f583810685cd6f18c9372bad5068`.
- Report: `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/reports/fix-1-report.md`, with the commands and
  exit codes of the affected checks, the own-work check, **Unread material** and **Searches not found or
  unclear** (`none` is an answer).

## The orchestrator's rulings

1. **Important 3 (the 3:1 for the specks in D-271).** Take the first way the reviewer gives: drop the 3:1
   for the specks from D-271, its Verification, the styleguide and the test, keeping the clause "the colour
   of an effect stands out from the ground it stands on" of task 18's sentence. The 3:1 stays for the frost
   as task 18 wrote it. Do **not** change the proposed colours of the specks or the cold layer, and take no
   new screenshots (they are published; the request will say that the human chooses the colours freely and
   that the specks as proposed read as dark sparks). Where a test pins the specks' ratio, replace it with
   the weakest check that still holds the clause (the specks' colours are read from named pixels of the
   pack, and differ from the snow), or delete it with its reason stated in the report.
2. **Important 2.** Name the specks in D-315's list of what lies over the tint, and in its Verification,
   next to the plaques.
3. Where a Minor finding asks that the request say something (the examples written from proposals that
   wait for the human's choice), change the foundation's wording only if that makes the entry state a fact
   that is not yet true; otherwise answer that the request carries it. State which in the report.
4. Keep every other behaviour and every other entry as it is. Run again the affected checks: the
   test files you touch, `foundation_check.py`, prettier on touched files, and the invariant tests that
   cite the entries you touched.
