Remarks of the human for correction 1, word for word, from https://github.com/mariusznazar/loop2/pull/164#issuecomment-7044664541 (written by the account of the request's author, 2026-11-20T16:22:24Z, headed "Uwagi doradcy dnia w imieniu Mariusza"):

Uwagi doradcy dnia w imieniu Mariusza

Fix or let through:

1. **Fix in this request.** The two gaps of the automatic check of the clock and randomness (`tests/invariants/test_balance_instrument_repeatability.py`, Minor findings 2 and 3): add the left-hand forms the reviewer named — `:`, `[`, `return`, `=>` and `?` — to `CLOCK_OR_DRAW_AS_VALUE`, each with a control case, and make the docstring say exactly what the pattern reads and that it is stricter than the invariant's sentence (with the harmless uses it flags, e.g. a date format given a date). Reason: the docstring today claims more than the check catches, and the next tasks of the plan that change the balance tool (2 and 24) are the first to rely on it.
2. **Let through here, no task of its own.** The three copies of the code that cuts comments and strings (Minor finding 1): it goes as an item of *To do* into task 2 of the plan (`ocena-programu-na-ziarnach`), which is still being refined and touches the randomness checks of the simulation — one lexer in `test-helpers`, used by the two simulation tests and `tests/invariants/balance_source_scan.py`.
3. **Partly fix in this request.** Run the full `check-map` (500 seeds, all programs, about a minute) on the base and on the head and compare the outputs, since it is cheap and the fix round runs anyway. The campaign outcome at the limit, which nothing prints, is let through without a task: the outcome name is now one shared function the engine's comparison test checks.

You accept by merging: 4–8 accepted.

