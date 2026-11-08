# Report of the return step (the one author, resumed)

Saved by the orchestrator from the agent's returned text, word for word: the agent returned its report as text.

**Status: done, nothing needed correcting. No commit.**

**Question settled: no glossary entry is needed.** I read WAY-95 and WAY-99 in `.the-way/foundations/decisions.md` (lines 2051–2090 and 2145 onward, whole).
- WAY-95 gives a word an entry only where a reader who takes the field's meaning would read a sentence wrongly. "Gate" in its field sense is an admission or refusal point, and "a full password gate refuses immediately" reads correctly in that sense. The misreading risk was with the-way's own "gate" (the test command), which WAY-104 already handles by qualification, not by a loop2 entry.
- "Sentence of this decision" and "in this decision" also read correctly in the field sense. "D-308" is a number, not a word.
- The loop2 glossary (`foundations/glossary.md`) has no "gate" or "sentence" entry. Nothing was written.
- WAY-99 is not triggered: no bare "gate" sentence in `foundations/` is true in one meaning and false in the other. The test-gate uses (`decisions.md` 1479–1559, 5012, 5164, 5175) are unchanged and read as the test command. The password-gate uses without a qualifier (`decisions.md` 2027, 2035–2036; `invariants.md` 661) are read in an Argon2 or password context. Under WAY-104 they stay bare.

**Return-step fields:**
- **Foundation compared with code:** the six edited entries, the entries that name them (D-225 whole; the decision-number grep of `foundations/`), `invariants.md` entries that derive from D-23, D-103 and D-109, and the part map `product-foundation` (`foundations/**`, no dependencies, no change needed). All are wording-only and consistent with the code. `src/server/account-routes.ts` (comment at line 574) and `src/server/measure-passwords.ts` (lines 280–321) already speak of "the gate" for the password admission gate, admitting two and refusing a third. No mismatch found, so no correction.
- **Decisions written or changed:** none in this step. The six edits of `20f5ffd` stand.
- **Invariants written or changed:** none.
- **Environment facts:** none.
- **Glossary terms:** none (WAY-95 does not require one for "password gate" or any other qualified word of the edits).
- **Part-map changes:** none.
- **Projected entries:** none.
- **Rows of Settlements to record:** none (the task has none).

**Checks:**
- `git status --short` in the worktree: empty, exit 0. The worktree is clean.
- `git log --oneline -1`: `20f5ffd`.
- `foundation_check.py` and `npm test` were not run by the agent, because the coordinator said not to run the product's gate. Both are unchecked by it.

**Searches not found or unclear:**
- The loop2 glossary has no "gate" or "sentence" entry. I read WAY-95 as not requiring one, but a human may read the "password gate" qualifier differently. That judgement is mine.
- The bare "gate" uses at `decisions.md` 2027, 2035–2036 and `invariants.md` 661 are read as password-gate uses. WAY-99 is judged not triggered by sentence reading; I did not check every sentence against the test in WAY-99.
