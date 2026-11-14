PASS c62c48dff86aa7656dba753d6cfa9aafb917d10e

# Review of correction 1 — task pierwsza-akcja-od-startu

Range `5daa2b8519ecb6545c31a3020b758e8868ff13e3..c62c48dff86aa7656dba753d6cfa9aafb917d10e` (`git rev-parse HEAD` confirmed; one commit `c62c48df`; working tree clean). Changed: `foundations/decisions.md` 3/5, `tests/sim/new-account-first-pass.test.mjs` 1/1. No `src/` file and no `saved-game.ts` touched, so the trust boundary is unchanged. Method: `review/SKILL.md` and `fix.md` (a correction: the remarks take the findings file's place).

Blocking findings 0; Minor 0.

## The three remarks

1. **Title of the first-pass test — made.** `tests/sim/new-account-first-pass.test.mjs:145` now reads "…on at least the accepted number of the 300 named seeds". The number 289 stands in the test only as `ACCEPTED_SEEDS = 289` (line 27), used at the assertion (line 149) and in the failure message; no second literal. The assertion, constant and message are unchanged (diff: one line).
2. **D-312's clause "and so the game wrote none" — made, and the entry agrees with the code.** The binding sentence now ends "…or where the record of the map run holds a minute of exploring, which a rule „Eksploruj” of the player's own has been carried out to give (D-123), the band leaves that sentence out." Read whole against `chillRuleGroupName` (`understanding.ts`, `if (state.run.minutesByAction.explore > 0) return null;`, after the chill test):
   - Binding sentence: true for every state the game reaches. Where the record holds a minute of exploring, the code returns null at once, so the band has no sentence, including the one case where the player deleted the rule afterwards (the game's rule is then unnamed, as the sentence says) and the minute was given by the player's rule. The explanatory clause "which a rule … of the player's own has been carried out to give" is true in every such state: before the first chill only a rule of the player's can give a minute of exploring, since the game writes its rule at the chill itself. The sentence no longer claims the game wrote no rule. The first clause ("Where a band names the discovery at which the game wrote a program rule") is a condition, so it does not forbid the accepted case where a player's own rule not yet carried out is named.
   - *Verification*: "complies" (first chill of a copy holding the player's rule its character has carried out: no sentence) agrees with the code; "violates" ("the sentence in the band of a discovery in a map run whose record holds a minute of exploring") is exactly the null branch, and calls no true case a violation. The other examples (group dragged, renamed, rule deleted) are unchanged and still agree.
   - *Rationale*: the two accepted wrong cases stand as before (a player's rule not carried out by the first chill is named though the game wrote none; the game's rule goes unnamed where the player deleted every carried-out rule). They do not conflict with the binding sentence now.
   - D-345 (quotes D-312): "followed, where the band of that discovery has it (D-312), by …" and its "violates" "…left out of the entry of a discovery whose band holds it" agree with D-312 and with the code (the chronicle's text is `discoveryBandText`, which calls `chillRuleGroupName`); unchanged by the correction.
3. **D-404's example with 290 — made.** The "complies" example now reads "the program of the test solving Skraj lasu on at least 289 of the 300 seeds from a game of an account with nothing discovered", with its meaning kept; the "violates" example is unchanged. The figure 290 remains once, in D-404's *Rationale* ("That account solves 290 of the same 300 seeds; the account with nothing discovered is one seed behind…"), where it states the measurement the human accepted and explains why the figure is 289; the remark names the example, not the *Rationale*, and the *Rationale* is about the time of the decision. Not a finding. No other file quotes it (`grep`).

## Nothing else changed

The diff has exactly the three edits above (three lines and the test title); D-404's binding sentence, the invariant `new-account-first-pass` ("at least 289 of 300 seeds that its test names", *Derives from* D-121 · D-404), the constant and the code are untouched. D-404, the invariant and the test say the same figure (289). The correction's own return-step comparison (in `reports/correction-1-report.md`) I did not need to rely on: I compared D-312, D-345, D-404 and the invariant with the code and each other as above.

## Checks (command and exit code)

- `git rev-parse HEAD`, `git log`, `git diff --numstat`, `git diff` of the range: exit 0.
- `npm test tests/sim/new-account-first-pass.test.mjs` → exit 0 (3 pass; the title is the new one).
- `npx prettier --check tests/sim/new-account-first-pass.test.mjs` → exit 0; `npx eslint tests/sim/new-account-first-pass.test.mjs` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py` → "0 errors", exit 0 (my own check).
- Not run: the full gate and any mutation analysis (forbidden by the handoff; another session's gate is running); any other test file (no code changed).

## Unread material

- `reports/correction-1-report.md` was not read (I compared the entries myself); `reports/correction-1-handoff.md` read to the remarks and the three points. The entries D-312, D-345 and D-404 read whole as they now stand. Guidelines were not re-read for this wording-only range; they were read whole in the earlier review.

## Searches not found or unclear

- None. (`git grep 290` and `git grep 289` outside `.the-way` and `docs`: D-404, the invariant and the test only, apart from unrelated hits such as `D-289`.)
