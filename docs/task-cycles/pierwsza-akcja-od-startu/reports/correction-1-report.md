# Correction 1 report — pierwsza-akcja-od-startu

**Status: done.** One commit on `task/pierwsza-akcja-od-startu`, on top of `5daa2b85` (message: "docs: :memo: end the clause of D-312 on the minute of exploring without saying the game wrote none, leave the other account's count out of the example of D-404 and take the number out of the title of the first-pass test"); files `foundations/decisions.md` and `tests/sim/new-account-first-pass.test.mjs`. No code, threshold or figure touched; nothing under `docs/task-cycles/`; nothing pushed.

## The three points

1. **Title of the test — fixed.** `tests/sim/new-account-first-pass.test.mjs:145` now ends "…on at least the accepted number of the 300 named seeds"; the number 289 stands once in the file, as `ACCEPTED_SEEDS`. No other file quotes the title (searched).
2. **D-312 — fixed.** The binding sentence now ends the clause after "(D-123)": "…or where the record of the map run holds a minute of exploring, which a rule „Eksploruj” of the player's own has been carried out to give (D-123), the band leaves that sentence out." Read whole with its examples and *Rationale*: the "complies" example (a copy holding a carried-out rule of the player's own: no sentence) and the "violates" example (the sentence in the band of a discovery in a map run whose record holds a minute of exploring) say the same as the sentence, and neither calls a true case a violation; the case of a deleted carried-out rule is omission by the record, and the *Rationale* already names it as accepted (the game's rule goes unnamed). The clause no longer gives a cause that the case contradicts.
3. **D-404 — fixed.** The "complies" example reads "the program of the test solving Skraj lasu on at least 289 of the 300 seeds from a game of an account with nothing discovered", without the other account's 290. The figure 290 still stands once, in D-404's *Rationale*, as the measurement the human's decision rests on (the remarks name the example only; I left the *Rationale* as it is). No test or other entry quotes 290 (`grep`).

## Return step, repeated for what the remarks touch

- **Foundation compared with code:** D-312 now says what `chillRuleGroupName` does (`minutesByAction.explore > 0` returns null; else the first group holding „Zawsze → Eksploruj”); matches. D-345 quotes D-312 as "where the band of that discovery has it (D-312)": agrees, no change. D-404 and the invariant `new-account-first-pass` ("at least 289 of 300 seeds") agree with the test's `ACCEPTED_SEEDS = 289`, which still passes. Corrected in this step: the three points above.
- **Decisions written or changed:** changed D-312 (clause) and D-404 (example); none written.
- **Invariants:** none written or changed.
- **Environment facts:** none; the measurement still comes from an instrument outside the repository, which D-362 forbids naming.
- **Glossary terms:** none.
- **Part-map changes:** none; the test stays in `tests/sim/**`, the entries in `foundations/**`.
- **Projected entries written whole or in part:** none in this step.
- **Rows of settlements:** none written in this step (rows 1–3 stand: `first-exploration-discovery`, D-403, `new-account-first-pass` with D-404).
- Foundation entries are written only if the comparison finds one missing; it found none.

## Checks (command and exit code)

- `npm test tests/sim/new-account-first-pass.test.mjs` exit 0 (3 pass).
- `npx prettier --check tests/sim/new-account-first-pass.test.mjs` exit 0; `npx eslint` on it exit 0.
- `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (my own check, not the gate).
- Not run: the full gate, mutation analysis, any real-browser run.

## Unread material

`.claude/skills/the-way-record-decision/SKILL.md` and the files it names were read whole in the earlier fixes of this task; I did not reopen them for two edits of existing wording. `reports/review-fix-report.md` not opened; the handoff quoted its three points. `.the-way/task-cycle/skill/return_step.md` was read whole in the return step and not again.

## Searches not found or unclear

None. Searched for other quotations of D-312's clause (D-345 only), of the number 290 (D-404 only) and of the test's title (none).

## Own-work check

The requirement most likely not met: that D-312's binding sentence is true for every state the game reaches. Checked the sentence against the code for the three states (no explore minute: sentence given if a group holds the rule; explore minute present: left out, whoever wrote the rule; deleted carried-out rule: left out) — it holds in all three, since it states the record and no cause.
