# Slice 4 report

**Status:** done

**Commit:** see `git log -1` on branch task/logowanie-w-react (message: "refactor: move the account rules out of the account screen and read the game's name from its data").

**Files:** new `src/browser/sim/data/about.ts` (ABOUT.name "Loop", ABOUT.sentence), new `src/browser/view/account-rules.ts` (addressProblem, passwordProblems, registrationProblems, RegistrationField, RESET_REQUESTED_SENTENCE, moved verbatim); changed `account-screen.ts`, `password-reset.ts`, `app.ts` (header reads ABOUT.name), `kitchen-sink.ts` (one import line), `tests/view/account-screen.test.mjs` (imports only). `scripts/kitchen-sink.mjs` untouched.

**Checks (all exit 0):**
- `npm test -- tests/view/account-screen.test.mjs` 0 (69 pass)
- `npm test -- tests/view/password-reset.test.mjs` 0 (2 pass)
- `npm test -- tests/invariants/test_simulation_isolation.py` 0
- `npm test -- tests/invariants/test_content_identifiers.py` 0
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` 0
- `npm run kitchen-sink -- --build-only` 0
- `npm test -- tests/quality/test_quality_invariants.py` 0
Not run: the full suite (the cycle's run); a real-browser look at the kitchen-sink page (build-only only).

**Own-work check:** requirement "nothing a player sees changes, no expected value changes, kitchen-sink script byte for byte": git diff shows no change to scripts/kitchen-sink.mjs or to any expected value in the test; the account-screen test and kitchen-sink invariant pass.

**Adaptation:** `account-screen.ts` is kept in this slice (it only imports the rules); its deletion belongs to a later slice per the plan. The sentence is exposed as `ABOUT.sentence`; no consumer other than app's header name yet. Rule text moved verbatim, so no new test written (existing tests cover it).

**Reaches beyond dispatch:** none beyond reading the files changed and `slice.md`.

**Searches not found or unclear:** none.
