# Findings of the grouped review of slices 8-10 (blocking findings, in the reviewer's words)

Review report: `reports/review-s810-report.md`, first line `FAIL ab0e44bad3fa7ee7cf33eea123f87c49b7c0c64a`. I-1 comes from slice 10 (cheaper), I-2 and I-3 from slice 6 (same); the fix therefore runs on the class `same`.

## Findings

### Important

**I-1 — the campaign counts at most one covered death per return of the player (slice 10)**

Place: `balance/campaign.mjs:364-374` (`comeBack`):

```js
const used = ctx.state.awayReport.some((line) => line.resurrectionUsed);
if (used) log.resurrectionsUsed += 1;
...
// A loop that stopped ended its last run in a death, and one more where a resurrection covered it.
log.loopCompletions += loop
  ? loop.completed - completedBefore
  : Math.max(0, ended - 1 - (used ? 1 : 0));
```

What is wrong: the rule is the one-resurrection model. A line of the away report says only whether some use covered a death (a boolean), so one return of the player adds one to `resurrectionsUsed` however many uses the catch-up spent; and for a loop that stopped, the completions are the ended runs minus the stopping death minus *one* covered death. With three uses and a return every four hours, one return of a campaign player (one a day for the players of `balance/players/`) covers several deaths: `resurrectionsUsedMean` of the campaign summary (`balance/campaign.mjs:604`) is too low, and `loopCompletionsMean` too high for every stopped loop that had two or more covered deaths before its stop. The comment at line 371 is a comment of a mode file that speaks of the one resurrection, which the slice's Goal requires to speak of uses ("the comments of the mode files that speak of the one resurrection speak of uses"), and the formula under it holds the same rule.

Why it matters: To do item 5 of the task — "Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry" — and question 12 ("pomiary map mówią wtedy o grze takiej, jaka będzie po zmianie"). The campaign is the mode that reports how often a player spends the resurrection, the very number question 4 says will be tuned after measurement; it reports a game with one resurrection.

Evidence: probe `.runs/review-s810/probe/covered.mjs` (removed; output kept here): `loopOnce` on `forest`, `forestLoopWithStock`, practice `smallItemGathering: 80`, chest `{stick: 8, berry: 7}`, one 24-hour reading, seeds 1-30. Seeds 5 and 13: the loop alive with 2 covered deaths (`runNumber - 1 - completed`) in one reading and `resurrectionUsed` true — `comeBack` would add 1 for 2 uses spent. No test of `tests/balance/campaign.test.mjs` checks `resurrectionsUsed` or the completions of a stopped loop with more than one covered death.

Contradiction: no

**I-2 — an overlay of the renewal reaches the instrument's spent start but not the game (from slice 6, shown through slice 10)**

Place: `src/browser/sim/game.ts:76` (`const RENEWAL_MS = BALANCE.resurrectionRenewalRealMinutes * MS_PER_MINUTE;`, read once at module load, Slice 6) against `balance/loop.mjs:65-75` (`startState` reads `BALANCE.resurrectionRenewalRealMinutes` at call time, slice 10).

What is wrong: under an overlay of `resurrectionRenewalRealMinutes` (the instrument's way to measure the game with other numbers, glossary `overlay`), `--no-resurrection` starts the clock with the overlaid span, every later return and every clock a death starts goes by the built 240 minutes, and a loop with the full stock ignores the overlay altogether. The uses then return neither as in the overlaid game nor as in the built one — against D-428's "after which the uses return as in the game" and the slice's "the instrument counts no return itself": the first moment is the instrument's arithmetic on a number the game no longer reads. At the base `46cfec71` the game read the renewal at call time (`game.ts:596`, `nowMs + BALANCE.resurrectionRenewalRealMinutes * MS_PER_MINUTE`), so an overlay of the renewal reached the game's deaths; Slice 6 removed that. `BALANCE.resurrectionUses` is still read at call time, so of the two numbers question 4 says will be corrected after a measurement, one can be overlaid and the other is half-applied, silently.

Why it matters: the executor's question, answered — yes, it makes `--no-resurrection` behave differently from "uses return as in the game" for an overlaid game, and it matters because the task (question 4, "Liczby można poprawić w zadaniu 6 planu po pomiarze pierwszej ściany") plans to measure other numbers, and an overlay of the renewal would give a measurement of no game, with no error. No overlay file sets the renewal today, so the fault is latent until that measurement. The fix lies in `game.ts` (read the renewal where it is used, as before Slice 6); the tests of slice 10 stay valid after it (see M-1).

Evidence: probe `.runs/review-s810/probe/renewal.mjs` (removed; output kept here), overlay `{ BALANCE: { resurrectionRenewalRealMinutes: 60 } }`:
- spent start (`loopOnce`, `resurrectionReady: false`): next return at +60 min — the overlay;
- at +60 min: 1 use left, the second return at +300 min — 60 + the built 240;
- `teamAfterDeath` of a character with practice on a full stock at the loop's start: next return at +240 min — the built value.

Contradiction: no — no entry says an overlay reaches every number; D-428's "as in the game" is met for the built game and unmet for an overlaid one.

**I-3 — a test of the simulation fails since the save version became 8 (from slice 6; no slice of the plan covers it)**

Place: `tests/sim/previous-programs.test.mjs:414-428`, "a document of another version or with no whole version is unreadable": it expects version `8` to be unreadable, as a version above the current one. Slice 6 made 8 the current version (`SAVED_GAME_VERSION`), and `src/browser/sim/previous-programs.ts:58-65` admits versions from 1 up to the current one (D-401), so `readPreviousPrograms({ version: 8, ... })` reads the programs and the case fails.

Why it matters: the full `npm test` fails on it, and no slice of the plan names `tests/sim/previous-programs.test.mjs` (searched `plan.md`). It lies outside slices 8-10, but within the task; I count it blocking so that the orchestrator routes it. The case should take the version above the current one from `SAVED_GAME_VERSION + 1`, or 9, with its reason (the D-401 sentence it quotes stays as it is).

Evidence: `node --test tests/sim/*.test.mjs` after the build: 865 tests, 864 pass, 1 fail — `AssertionError [ERR_ASSERTION]: version 8`, actual `{ ok: true, items: [{ kind: 'read', name: 'Las', ... }] }`, expected `{ ok: false }`.

Contradiction: no

