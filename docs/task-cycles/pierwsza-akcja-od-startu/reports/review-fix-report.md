PASS d925d5ca17f6ea57be36e103379bda4d50ab4493

# Review of the fix — task pierwsza-akcja-od-startu

Range `17d830188d8469a55518eefa1ab313e5cd41b08f..d925d5ca17f6ea57be36e103379bda4d50ab4493` (`git rev-parse HEAD` confirmed; one commit `d925d5ca`; working tree clean). Method: `review/SKILL.md` and `fix.md`; bounded by `reports/findings-1.md` (F1, M1, M2, M3), plus the human's decision of `reports/fix-handoff-addendum.md`. No `src/` file changed. Changed: `foundations/decisions.md` 49/16, `foundations/invariants.md` 3/3, `tests/sim/new-account-first-pass.test.mjs` 11/7.

Blocking findings: 0. Minor findings new in the fix diff: 3 (none blocks).

## Findings of the findings file

- **F1 (D-312 says more than the code does) — fixed.** D-312's binding sentence now leaves the band's sentence out "where the record of the map run holds a minute of exploring", and its "violates" example reads "the sentence in the band of a discovery in a map run whose record holds a minute of exploring". That is exactly what `chillRuleGroupName` does (`understanding.ts`, `minutesByAction.explore > 0`, unchanged). The *Rationale* now carries the two accepted wrong cases as costs of the record-based reading (a player's rule not yet carried out is still named; the game's rule goes unnamed where the player deleted every carried-out rule „Eksploruj”), which my report found to be complete for reachable states. D-345 was the one other entry quoting the sentence (checked by `grep -n "D-312"`): its binding sentence now says "followed, where the band of that discovery has it (D-312), by …" and its "violates" example "left out of the entry of a discovery whose band holds it"; both agree with the code. D-122 and D-313 do not quote the condition and need nothing.
- **M1 (D-403 *Verification* names `save-version`) — fixed.** The line `invariants: save-version.` is gone; *Verification* reads `an agent compares a change with the decision:` with the pair of examples kept.
- **M2 (invariants name decisions that do not name them back) — fixed.** `first-exploration-discovery` derives from D-121 alone; `new-account-first-pass` from D-121 · D-404. D-121's *Verification* names both invariants; D-404's names `new-account-first-pass`. Script over the log: the pairs (invariant, decision) missing from a decision's *Verification* fell from 10 to 6, none of the two invariants among them, and no decision names an invariant that does not name it back for the three I looked at (`first-exploration-discovery`, `new-account-first-pass`, `save-version`). The 6 left were in the base.
- **M3 (no real-browser check) — left, by the orchestrator's choice C6.** Not graded.

## The human's decision (addendum), carried into the fix

- **D-404 as the decision template and skill require?** Yes. Number `D-404` follows `D-403` (no gap, none taken in the log); one question the binding sentence answers; fields complete (*Scope* `simulation`, *Based on* `none`, *Relations* `derives from D-80 · D-121 · D-397 · D-398` — the closed list's only type used, each a number alone, *Verification* `invariants: new-account-first-pass.` plus a pair of examples, *Origin* `none`); *Rationale* and *Rejected* in prose; no note of the vault named (D-362; `git grep` of the diff for vault words finds none). Plan test: the figure binds after the merge until the balance work revises it, so it belongs in the log. "Decision or invariant": the choice goes in the decision and the checkable sentence in the derived invariant, as the template wants. `foundation_check.py` 0 errors.
- **Faithful, not widened?** Yes. The human's words: 289 of 300 is acceptable for now, recorded as the threshold of item 8 accepted for now at 289/300, to be revised in the balance work, test adjusted, no "blocked". D-404 says exactly that: the figure is the measurement accepted on 2026-11-14, revised when the balance is worked on, and keeps no tolerance. *Rejected* repeats the two options of Q6 (the first wording "at least as many", and a percentage without a measurement, whose reasons are those the task gave for Q6 B). It adds no new requirement.
- **Does the cause sentence match what I traced?** Yes for the seeds I traced. In the *Rationale*, "the account with nothing discovered is one seed behind, since the condition „Sytość poniżej” is revealed only by the first gathered berry (D-121)": on seed 297 (and the same pattern on 116) the new account's group „Głód” (condition „Sytość poniżej 65 %”) does not apply because the condition is unknown until the first berry is gathered, so it gathers sticks (rule of the stick before the berry rule) and starves in minute 274. The net difference of one seed is two such losses against one seed lost by the other account (254, died of cold), which I did not trace to a cause; the sentence is true of the seeds the new account loses, which is what it explains. Not a finding.
- **Invariant and test say the same figure.** Invariant `new-account-first-pass`: "at least 289 of 300 seeds that its test names"; test: `ACCEPTED_SEEDS = 289`, `fresh >= ACCEPTED_SEEDS`; D-404: "at least 289 of the 300". The test still plays the account with everything discovered and puts both counts in the failure message (not asserted), as the addendum asks. `Violated: no` is true now (test passes).
- **Nothing else quotes the old threshold.** `git grep -i "at least as many|as many of the 300|as many seeds|fresh >= knowing"` outside `.the-way` and `docs`: one hit, D-404's *Rejected* (intended). The number 289 appears in D-404, the invariant and the test only.

## New findings in the fix diff (Minor, block nothing)

1. **The number stands twice in the test.** `tests/sim/new-account-first-pass.test.mjs:145` has "…at least 289 of the 300 named seeds" in the test's title, beside `ACCEPTED_SEEDS = 289` at line 27; the addendum asked for the number once. A revision of the constant would leave the title false. Fix: take the number out of the title ("…on at least the accepted number of the 300 named seeds").
2. **D-312's binding sentence says "and so the game wrote none" of the record that holds a minute of exploring.** In the accepted case where the player deleted every carried-out rule „Eksploruj”, the record holds a minute of exploring although the game did write a rule; the *Rationale* says so, the clause "and so the game wrote none" does not. Read as a cause of the omission it overstates by that one case; the omission itself matches the code. Fix: end the clause after "(D-123)" without "and so the game wrote none".
3. **D-404's "complies" example carries the measurement of the other account (290).** After the balance work it may go stale with the figure; harmless, since the entry says the figure is to be revised.

## Declined to judge

- Whether 289 is the right figure (the human's, accepted).
- The real-browser appearance of the changed screens (M3, left by choice).

## Checks (command and exit code)

- `git rev-parse HEAD` → `d925d5ca17f6ea57be36e103379bda4d50ab4493`, exit 0; `git diff --numstat`, `git diff` of the range, exit 0.
- `npm test tests/sim/new-account-first-pass.test.mjs` → exit 0 (3 pass: the two preconditions and the first-pass test).
- `npx eslint tests/sim/new-account-first-pass.test.mjs` → exit 0; `npx prettier --check` of it → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → "0 errors", exit 0 (my own check, not the gate).
- Script over `foundations/` (invariants *Derives from* against decisions' *Verification*), exit 0: 6 pairs missing, none new.
- `git grep` for the old threshold wording and for "289" → as above.

Not run, with the reason: `npm test` with no argument and any mutation analysis (forbidden by the handoff); any real-browser run (forbidden; M3); other test files (the fix changes no code and no other test).

## Unread material

- `foundations/decisions.md`: D-404, D-312 and D-345 read whole in their new form (the diff and the surrounding entry); D-403 read whole in the review of the whole change and its changed *Verification* line now. No decision of my earlier selection was re-screened; the earlier report's gap (decisions of the selection not skimmed by title, only searched by keyword) stands and bore on no finding here.
- `reports/fix-handoff.md` was read only as far as the review handoff and the addendum quote it; `reports/fix-report.md` and `findings-1.md` read whole.
- Guidelines: not re-read for this pass; the files read whole in the earlier review (`coding.md`, `coding-saved-game.md`, `coding-simulation-module.md`, `coding-content-data.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md`, `src/browser/AGENTS.md`) bear on the one test file changed, which follows them (`Where the expected value comes from`: the figure now stands in D-404 and the invariant before the test uses it).

## Searches not found or unclear

- None. (The check that no vault note is named in the added entries: `git diff` of the range grepped for the vault's folder, note and instrument names, no hit.)
