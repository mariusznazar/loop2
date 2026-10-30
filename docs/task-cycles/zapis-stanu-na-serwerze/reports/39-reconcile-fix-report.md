# Fix report — reconciliation review finding I-1, task `zapis-stanu-na-serwerze`

**Status:** done.

Variant: the fix of a review's findings (`.the-way/task-cycle/change/SKILL.md`, `fix.md`). Findings: `reports/39-reconcile-fix-findings.md`. Head before the fix: `776acbc`. I left the two comments in `src/browser/view/game-saver.ts` that another agent corrected untouched.

## I-1 — fixed (way (a), the reviewer's recommendation)

- **What the player sees now:** a count beyond the safe integers typed into a trip-plan field — `9007199254740992`, `99999999999999999999` or `1e20` — is refused where the game takes it. The field keeps its existing warning „Wpisz liczbę całkowitą od 1.”. So the game never holds a trip count its own load refuses.
- **Code:**
  - `src/browser/view/trip-editor.ts` (`tripCount`) uses `Number.isSafeInteger`.
  - `src/browser/sim/programs.ts` (`checkTripList`) uses `Number.isSafeInteger`. It also gains a doc comment that cites D-181.
  - `src/browser/sim/saved-game.ts` (`program`) drops its own extra `identity(entry.count)` loop. The program check now holds that bound, and the comment says so. `tripList`, used for `bringPlan` and `deposited`, keeps `identity`.
- **What holds the bound, cited:**
  - D-181 now states it, amended through `the-way-record-decision`. The binding sentence says a position's count is a safe integer from 1 up — at most 9007199254740991, the largest integer a saved game state holds exactly — and that below that bound the upper range is left to clipping.
  - D-181's *Rationale* gains why the bound exists: a count beyond it would make the load refuse the whole saved game.
  - D-181's *Rejected* gains way (b) as the reviewer weighed it. The question, *Scope*, *Relations*, *Verification* and *Origin* are unchanged. No decision derives from D-181, and no invariant names it.
  - The code comments (`saved-game.ts`, `programs.ts`, `trip-editor.ts`) and `guidelines/coding-saved-game.md`, example "Plan wyprawy i skrzynia", now say the program check — the same check through which the game takes a plan from the player — holds the safe count (D-181). The guideline was edited following the writing rules of `the-way-maintain-coding-guidelines`.

## Commits

| Commit | What |
|---|---|
| `24b75f6` | Code and tests: `programs.ts`, `trip-editor.ts`, `saved-game.ts`, `tests/sim/trip.test.mjs`, `tests/view/trip.test.mjs`, `tests/sim/saved-game.test.mjs` |
| `64d1a94` | D-181, in `foundations/decisions.md` (+3 −3) |
| `8eb6042` | `guidelines/coding-saved-game.md` (+4 −3) |

## Tests written first, and their failing runs

| Test | Break it catches | Failing run (before the fix) | After the fix |
|---|---|---|---|
| `tests/sim/trip.test.mjs`: `checkProgram` throws on `2 ** 53` and `1e20`, and accepts `Number.MAX_SAFE_INTEGER` | `checkTripList` admitting an unsafe integer | `npm test -- tests/sim/trip.test.mjs` exit 1 ("Missing expected exception") | exit 0 (15 pass) |
| `tests/view/trip.test.mjs`: `tripCount` gives null for `"9007199254740992"`, `"99999999999999999999"` and `"1e20"`, and gives 9007199254740991 for `"9007199254740991"` | the field taking an unsafe count | `npm test -- tests/view/trip.test.mjs` exit 1 (strictEqual) | exit 0 (4 pass) |
| `tests/sim/saved-game.test.mjs`: "the largest trip count the game accepts loads back, and one beyond the safe integers the game refuses" (`editProgram` → `savedGame` → JSON → `loadSavedGame`) | the game holding a state its load refuses — the finding itself | `npm test -- tests/sim/saved-game.test.mjs` exit 1 ("Missing expected exception: 9007199254740992") | exit 0 (14 pass) |

## Checks

| Command | Exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 (15) |
| `npm test -- tests/view/trip.test.mjs` | 0 (4) |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (14) |
| `npm test -- tests/sim/program.test.mjs` | 0 (19) |
| `npm test -- tests/sim/program-list.test.mjs` | 0 (26) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 (39) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (35) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (OK) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `npx eslint` (changed source and test files) | 0 |
| `npx prettier --check` (changed source and test files) | 0 |

Not run:
- The whole gate — it is the orchestrator's.
- Stryker — the reviewer runs it.

## Own-work check

- **Requirement most likely missed:** that the game, by any way the player enters a trip plan, holds no count the load refuses.
- **Check:** the new round-trip test of `saved-game.test.mjs`, together with the editor test.
- **What it showed:** both ways a count reaches a program — the field (`tripCount`), and the program check every edit and the copy go through (`editProgram`, `setProgram`) — refuse an unsafe count. The largest safe count loads back.
- The crafted cases "a trip count beyond the safe integers" and "a frozen bring count beyond the safe integers" still pass. They are now refused by the program check and by `tripList`.

## Choices

- **Way (a)**, as recommended. Rejected: way (b), the load admitting any integer. Cost if wrong: none to the player beyond the warning on an absurd count.
- **The redundant `identity` loop in `saved-game.ts` `program` is removed** rather than kept as a second guard. Rejected: keeping it. Cost if wrong: a future loosening of `checkTripList` would no longer be caught by the load. The new round-trip test would then fail instead.

## New meaning for the human

D-181: a trip-plan count is a safe integer from 1 up, at most 9007199254740991; above that the game refuses the entry with „Wpisz liczbę całkowitą od 1.”.

## Searches not found or unclear

- The reviewer leaves to the orchestrator whether D-181 needs a qualification. Your message requires that the citations name what really holds the bound, and only a decision can carry a code rule's citation. So I amended D-181 rather than citing the spec, which lives under `.runs/` and is removed when the task closes.
- The warning text „Wpisz liczbę całkowitą od 1.” does not mention an upper bound. I left it unchanged: D-181 fixes that wording, and a count of 9007199254740991 or more is no plausible input.
