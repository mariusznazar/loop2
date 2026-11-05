# Findings to fix — review of the whole change, round 1

Source: `reports/report-review-whole-1.md`, first line `FAIL 908c03edbb0be6f070071436a4787607e3590bbc`. Only the blocking findings, in the reviewer's words. Minor findings 3 and 4 of that report are not fixed in this round (they go to the request's list).

## Blocking findings (Important)

### 1. The test of a group whose condition lies outside the repertoire does not fail when the check is removed
- **Place:**
  - Code: `src/browser/sim/program.ts:420-422`, the term `(!reach || conditionInRepertoire(reach.repertoire, group.condition))`.
  - Test: `tests/sim/rule-signs.test.mjs:511-535`.
- **What is wrong:**
  - The test gives group 1 the condition `temperatureBelow 36` and removes it from the Understanding.
  - The body in that run is at 37, so the condition does not hold anyway. The group is dark with or without the repertoire check, and the test passes either way.
  - No other test calls `judgeProgram` with a `reach`. The existing repertoire tests and the invariant `program-rule-pick` go through `programInRepertoire`, which filters the program before the pick and never uses this term.
- **Why it matters:**
  - This is To do 3, question 6 and the last clause of D-308: a group with a condition outside the repertoire counts as one whose condition does not hold.
  - A group whose condition holds but lies outside the repertoire would show a green or amber bar while the pick passes over it. The code is right today; nothing keeps it right.
- **Evidence:**
  - Stryker mutant `program.ts:421:8` (`(true) &&`) survived, with `rule-signs.test.mjs` among the tests run.
  - Scratch run with the body set to 34, so the condition holds: `judgeProgram` without `reach` gives `{"1":"go","2":"go"}`. `ruleSigns` gives `{"1":"unmet","2":"go"}`. A test with a holding condition would tell the two apart.
- **Slice:** none (one author, no slices).

### 2. D-126 restates D-308 without its qualification
- **Place:** `foundations/decisions.md:2337-2338`, *Rationale* of D-126: "Accepted with it: a program rule outside the repertoire stands in the program amber with the reason that it lies outside it (D-308)."
- **What is wrong:**
  - D-308 says such a rule is amber "unless the condition of its rule group does not hold", and then every rule of that group is dark with no reason.
  - The D-126 sentence drops that exception, so it is broader than the entry it cites (WAY-263).
  - The task asked only that D-126 stop saying "with no sign of why", not that it state the sign.
- **Why it matters:** D-126 has *Scope* `simulation` only. An agent working on the pick reads it alone and learns the rule is always amber.
- **Fix:** either add "unless the condition of its rule group does not hold (D-308)", or replace the sentence with a pointer that restates nothing.
- **Slice:** none.
