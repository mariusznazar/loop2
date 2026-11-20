# Findings of the review of slices 5-6 (blocking finding, in the reviewer's words)

Review report: `reports/review-s56-report.md`, first line `FAIL 7e3869c22376378803e520ab4735cf53c82ca3e4`. The blocking finding comes from slice 6. The reviewer's probe script `reports/review-s56-probe.mjs` shows the case.

## Findings

### Important

**I-1. The load refuses a death settlement whose `usesLeft` equals the data's count, against the
task's settled effect of a later lowering of the count** — slice 6.

- Place: `src/browser/sim/saved-game.ts:839`
  `if (usesLeft >= BALANCE.resurrectionUses) refuse();`; the same bound is written in
  `guidelines/coding-saved-game.md:119-120` („a po śmierci, która zużyła użycie, zostaje ich mniej
  niż ta liczba”) and fixed by the case "uses left in the settlement equal to the data's count" in
  `tests/sim/team.test.mjs:626-630`.
- What is wrong: question 15 of the frozen task (task.md:142-147) settles the player's effect of a
  later tuning: „obniżenie odrzuca jako uszkodzony tylko zapis, w którym zużytych jest więcej niż
  nowa liczba”. The plan turns the settlement's check into "refuses … a settlement whose uses left
  exceed the data's count" (slice 6 Goal). The executor tightened it to "equal or above" (its
  choice 2). With `>=`, lowering the count from 3 to 2 — the likely correction the task foresees
  in task 6 of the plan (task.md Context: „poprawka to zmiana liczby w danych gry”) — makes the
  load refuse whole every save whose manual map run stands ended in a death that left 2 uses (the
  first death from a full stock, the most common one, whose window stands until „Restart” or
  „Zakończ”, after a load too), even where the team's spent count is 1, at most the new count. Q15
  says such a save survives; under the plan's `>` it does survive. A refused save is discarded
  whole and the player starts anew (D-206).
- Why it matters: player data loss on a data correction the task plans for, in a case the task
  settled explicitly; "Wolno odmówić więcej" in the guidelines does not override an answer of the
  task about what the load keeps.
- Evidence: reading the line above; the probe kept beside this report
  (`review-s56-probe-head.txt`, lines "settlement usesLeft 3" refused and "usesLeft 2" admitted at
  count 3); arithmetic of `>=` against a lowered count of 2.
- Fix suggested: `usesLeft > BALANCE.resurrectionUses` as the plan gives, the guideline sentence
  „nie więcej niż ta liczba”, and the test case "equal to the data's count" moved to the admitted
  side or dropped (the "above" case stays).
- Residual for the orchestrator (not a finding of the slice): even the plan's `>` refuses, on a
  lowering by two or more (3 to 1), a save whose settlement left 2 while the team's spent count is
  within the new count, so To do 3 („wczytanie sprawdza ją wobec liczby użyć w danych gry”) and the
  „tylko” of question 15 cannot both hold in every lowering. Whether that residual is accepted is a
  question for the person who settled the task, not for this fix.

Contradiction: yes — task question 15 (the effect of lowering the count: only a save with more
spent than the new count is refused) and the plan's slice 6 Goal ("exceed the data's count").

