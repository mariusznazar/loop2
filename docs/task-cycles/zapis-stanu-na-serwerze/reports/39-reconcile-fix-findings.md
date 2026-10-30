# Findings to fix — reconciliation review (`FAIL f7d8234`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/37-reconcile-review-report.md`, § Important. The review's Minor findings are not fixed (they go to the request).

### Important

**I-1 — A trip count the game accepts from the player makes the whole saved game load as damaged.**
(blocking; from `932da64`)

- Place: `src/browser/sim/saved-game.ts:246-247` (`program`: `identity(entry.count)` over both trip
  lists) and `src/browser/sim/saved-game.ts:270-280` (`tripList`: `identity(read.count)`, used for
  `bringPlan` at `:859` and `deposited`); the comment at `:240-241` and the guideline
  `guidelines/coding-saved-game.md:137-138` state the same rule and cite D-181 for it.
- What the player sees: a player types a very large count into a trip-plan field, such as
  `99999999999999999999` or `1e20`. The game keeps it and saves it. On the next load the page says
  „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” and the player loses every
  program, character, rank and chest piece; the next save overwrites the server's copy.
- Why: the game admits any integer from 1 up as a trip count —
  `src/browser/view/trip-editor.ts:10-12` (`Number.isInteger(count) && count >= 1`) and
  `src/browser/sim/programs.ts:203-208` (`checkTripList`: `Number.isInteger`, `count < 1`) — while
  the load demands a safe integer. D-181 says only "an integer from 1 up, with its upper range
  currently left to reality's clipping"; it does not hold the safe-integer bound the guideline and
  the comment cite it for. The author saw the gap ("`checkProgram` alone takes `1e300`", report
  § What the strict load now covers) and closed it on the load's side only. The spec allows the load
  to refuse more (`spec.md:202`, `:208`), but a load that refuses a state the game itself makes from
  the player's input breaks the task's purpose — a saved game comes back — and the stated aim of the
  test "the load admits what the game plays".
- Evidence: a probe on the built `f7d8234` (`newGame` → `editProgram` with a take count of
  `Number("99999999999999999999")` → `savedGame` → JSON round trip → `loadSavedGame`) printed
  `game accepted edit: true` and `load: {"ok":false,"reason":"shape"}`; the same probe with count 5
  loaded (`control load: true`). The crafted cases "a trip count beyond the safe integers" and
  "a frozen bring count beyond the safe integers" (`tests/sim/saved-game.test.mjs`) pin the refusal,
  and no case checks that the game cannot produce such a count.
- Fix, two ways:
  - (a) the game refuses an unsafe trip count where it takes one: `tripCount` in
    `trip-editor.ts` and `checkTripList` in `programs.ts` use `Number.isSafeInteger`, so the field
    shows its existing warning „Wpisz liczbę całkowitą od 1.”; the load stays as written. Cost: it
    changes task 13's code in the merge, and a test of the editor and of `checkProgram` must pin
    the bound; whether D-181 then needs a qualification through `the-way-record-decision` is the
    orchestrator's call.
  - (b) the load admits for trip counts what `checkProgram` admits (any finite integer from 1 up,
    which JSON carries exactly). Cost: the load departs for this one field from the spec's "safe
    integers where the type is … a count" (`spec.md:202`), and non-safe numbers stay in the game
    state.
  - Recommendation: (a). It keeps the spec's rule whole and keeps numbers that integer arithmetic
    cannot handle exactly out of the game state.
  - If nothing is done: a player who enters such a count loses the whole saved game with no warning
    at the moment of entry.
