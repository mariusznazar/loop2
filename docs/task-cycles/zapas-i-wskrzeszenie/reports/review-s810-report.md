FAIL ab0e44bad3fa7ee7cf33eea123f87c49b7c0c64a

# Review of slices 8, 9 and 10 of `zapas-i-wskrzeszenie` (grouped review)

Range `f2c9c335..ab0e44ba` (`3c621606` slice 8, `b0353afa` slice 9, `55a35a33` and `ab0e44ba` slice 10). `git rev-parse HEAD` = `ab0e44bad3fa7ee7cf33eea123f87c49b7c0c64a`, the head given. `.the-way` stands on the pinned commit `19e5774a`. Method: `.the-way/task-cycle/review/SKILL.md`, variant "a planned slice" (the grouped review of the range).

Counts: blocking 3 (Important), Minor 6, out of scope 0.

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

### Minor

**M-1 — the comment of `withNoReturn` says what the game does not do** — `tests/balance/check-map.test.mjs:23-36` and `tests/balance/cli.test.mjs:57-70`: "a renewal of one use longer than any run, so no spent use returns in it". With the renewal frozen at load (I-2), a use that a death of the full-start loop spends returns after the built 240 minutes inside the run; only the spent start sees no return. The preconditions still hold (the spent start has no use, the full start has three), and they hold after I-2 is fixed too, when the comment becomes true. Fixed with I-2, or the comment narrowed to the spent start.

**M-2 — `oneLeft` is described as "the clock stopped"** — `tests/sim/catch-up.test.mjs:52-55`: the fixture sets 2 uses spent and the next return at minute 10 000 after the save, a running clock, and a state no play reaches (a next return later than the save time plus one renewal). The old `notReadyUntil(S + 10_000 * MIN)` did the same, so the fixture is acceptable (the executor's concern 1): it isolates "one use left for two deaths" from a return inside the span. Only the word "stopped" is wrong.

**M-3 — the save-and-load case of `death.test.mjs` loads a state no game function made** — `tests/sim/death.test.mjs:246-271` quotes D-386 "The load of a saved game state admits every game state the game's own functions make", but saves `usedUp(team(), ...)`, three uses spent by hand; the base case saved the state a settled death left. Three settled deaths (100, 200 minutes apart) reach the same stock through the game's functions, as my probe of the rules shows. The return after the load is tested well; the quoted sentence is held more weakly.

**M-4 — the catch-up no longer checks the clock started anew after the stock filled** — `tests/sim/catch-up.test.mjs:416-428` lost its second death (the executor's concern 2: the removal is justified, the second death is now covered). The relation case at `:491-500` checks the generation and the run number at minute 600, but neither case checks the uses and the clock after the second death at minute 486 (the stock full at 483 and the clock stopped, then one use spent and the clock started at 486 + 240). `tests/sim/team.test.mjs` holds the rule at the level of one death; an assertion in the catch-up would hold it where the earning loop settles it.

**M-5 — wrapping** — `balance/check-map.mjs:4` is a 140-character comment line in a header wrapped at about 100, and `.claude/skills/loop2-balance/SKILL.md:99` (and its copy) is a line longer than the wrapping of its paragraph. No check reads either.

**M-6 — leftover names of the one resurrection in test code** — `tests/sim/loop.test.mjs:1401-1420` keeps the loop variable `readyAt` for the moment of the next return; `tests/sim/death.test.mjs:95` and `:103` keep "ready"/"readiness" in the titles of two `resurrection-renewal` cases. The plan accepts "ready" as "with a use left" for the player descriptions; in these titles it reads well enough.

## Points the handoff asked to judge

- Slice 8, the completion below zero: the executor's first expectation (use due at −5 000, completion at −5 000, 2 spent) was wrong; the code's 1 spent agrees with `resurrection-renewal` ("a moment equal to the moment of the next return counts as returned", then the completion returns one more) and D-190. Moving the due moment to `RENEWAL_MS` keeps the case about a completion at a moment below zero; no fault hidden.
- Slice 8, `death.test.mjs` written whole: read whole; 33 cases at the base and at the head, one for one by title; the expectations follow D-190, D-220 and `resurrection-renewal`; M-3.
- Slice 8, a completion at the very moment the clock returns a use: covered in `tests/sim/team.test.mjs:430-456` (one spent, the completion at the moment of the return, full stock, `resurrectionReady`), Slice 6's file; the three-spent variant is the same mechanism.
- Slice 9, the `oneLeft` fixture: acceptable (M-2). The removed half of the first death case: acceptable (M-4). `loop.ts` changed in comments only: confirmed by the diff; the comments speak of uses and of the clock.
- Slice 9, the case of a character later on the list that died earlier in real time: Ola's death at minute 1 finds the clock Ala started at minute 243 and leaves it; a real-time order would put the clock at minute 241 — the case tells them apart (the executor's break of `nextReturnMs ??` failed it).
- Slice 10: the full start and the spent start go through the game's state and `resurrectionAt`/`resurrectionReady`; no copy of a game number in `balance/` (the tests' `RENEWAL_MS` is a test parameter, which `guidelines/testing.md` admits); the export of `dueAttempt` for its test breaks no rule of `guidelines/coding-balance-instrument.md` and follows `earnedPoints`; the overlay-based preconditions: I-2 and M-1; both skill copies byte-identical (`cmp`), the switch described as the task asks; the four `decision: D-428` lines quote the second paragraph of D-428 from its start, and the foundation check reports no error for them. I-1 is the part of the campaign the slice left on the one-resurrection model.
- Every test file of the range: every case that sets the team's resurrection sets `resurrectionUsesSpent` and `resurrectionNextReturnAtMs` (no `resurrectionReadyAtMs` left in the files of the range); the foundation check reports no error in a file of the range; its 9 errors stand in `tests/view/*`, by the plan.
- Trust boundary (`src/browser/sim/saved-game.ts`, not changed in this range): probed anyway, since the range's save-and-load cases rest on it — see the checks.

## Declined to judge

none

## Checks

- `npm test -- tests/sim/death.test.mjs` — exit 0 (33 pass)
- `npm test -- tests/sim/completion.test.mjs` — exit 0 (27 pass)
- `npm test -- tests/sim/flow.test.mjs` — exit 0 (12 pass)
- `npm test -- tests/sim/data.test.mjs` — exit 0 (37 pass)
- `npm test -- tests/sim/catch-up.test.mjs` — exit 0 (35 pass)
- `npm test -- tests/sim/loop.test.mjs` — exit 0 (its log was overwritten by the next run of the same file name; the exit code was recorded)
- `npm test -- tests/balance/loop.test.mjs` — exit 0
- `npm test -- tests/balance/check-map.test.mjs` — exit 0
- `npm test -- tests/balance/cli.test.mjs` — exit 0
- `npm test -- tests/balance/campaign.test.mjs` — exit 0
- `npm test -- tests/balance/agreement.test.mjs` — exit 0
- `npm test -- tests/balance/progression.test.mjs` — exit 0
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py` — exit 0
- `npm test -- tests/invariants/test_balance_instrument_repeatability.py` — exit 0
- `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` — exit 0
- `node --test tests/sim/*.test.mjs` (the built game, the whole simulation directory, to see whether it is green for the mutation tool) — exit 1: 865 tests, 1 fail (I-3)
- `python -B .the-way/elements/common/foundation_check.py` — exit 1, 9 errors, all in `tests/view/` (`account-screen.test.mjs:3130`, `clock.test.mjs:320, 392, 538, 581, 582, 585`, `maps-screen.test.mjs:749`, `trip.test.mjs:175`), none in a file of the range
- `npx eslint` on the changed `balance/`, `tests/balance/`, `tests/sim/` files and `src/browser/sim/loop.ts` — exit 0
- `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the same code files (the gate's flags) — exit 0
- `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` — identical
- Probe of the rules of the uses on the built game (`teamAfterDeath`, `resurrectionAt`, values derived by hand from D-190): deaths at 0, 100, 200 minutes on a full stock — 2 left / next 240, 1 left / 240 (clock left as it runs), 0 left / 240; at 239 none, at 240 one (next 480), at 480 two (next 720), at 720 three (clock stopped); a death at 230 with none left — `progressLost`; a death at 800 after the stock filled — 2 left, next 1040 (clock started anew). All as derived.
- Probe of the load's refusals (`loadSavedGame` on a version-8 document with the team's two fields crafted): admitted — 0 spent with no moment, 2 spent with a moment, 3 spent with a moment below zero; refused as `shape` — 4 spent, −1, 1.5, `"1"`, `null`, a moment with none spent, no moment with 2 spent, a moment of 1.5, 2^53, a string or `true`, either field missing, the old field `resurrectionReadyAtMs` added. The boundary holds.
- Probes for I-1 and I-2: described under the findings.
- Not run: StrykerJS — the simulation tests are not green (I-3), so its first run of the tests fails, and `loop.ts` changed in comments only; `game.ts` is outside the range. The full `npm test` — the cycle's own run, and forbidden bare by the handoff.

## Reaches beyond the dispatch

- `src/browser/sim/game.ts` at the base `46cfec71` (`git show`, the line that read the renewal) — to tell whether the frozen renewal of I-2 is new.
- `balance/overlay.mjs` lines 1-60 and glossary `overlay` (`foundations/glossary.md:296-300`) — for I-2.
- `balance/campaign.mjs:336-376` and `:590-615`, `balance/loop.mjs:92-175` — the campaign's and the loop's counts of the resurrection, for I-1.
- `tests/sim/previous-programs.test.mjs:405-428`, `src/browser/sim/previous-programs.ts` (grep of the version check) and `plan.md` (grep for the file, and the slice headings) — for I-3.
- `tests/sim/team.test.mjs:406-460` — whether a completion at the moment of a return is covered (handoff point of slice 8).
- `src/browser/sim/saved-game.ts` (grep of the two fields) — for the boundary probe.
- D-216, D-217, D-218, D-219 (read as they follow D-190 in the file), D-401 (its sentence in the failing case) — context only.
- `stryker.config.json`, `scripts/test.py`, `tests/quality/test_quality_invariants.py:18-28` — how the tools run.

## Working copies

- `.runs/review-s810/` held the logs of the checks, the saved diff of `tests/sim/loop.test.mjs`, copies of the skill for a format check and four probe scripts (`renewal.mjs`, `covered.mjs`, `boundary.mjs`, `rules.mjs`). Their results are in this report; nothing is kept in `reports/`. Removed with `rm -rf` by its full path before returning. No git worktree was made; the probes only read the built `dist/` and the instrument's modules.

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-simulation-module.md` — read whole.
- `src/browser/sim/game.ts` — read at lines 60-134 and 610-742 (the uses, death, completion); the rest not read.
- `src/browser/sim/types.ts` — not read.
- `src/browser/sim/data/balance.ts` — not read (the two numbers checked through `tests/sim/data.test.mjs` and the probes).
- `foundations/part_map.md:33-64` (simulation) and `:127-157` (balance-tools, agent-workflow) — not read.
- D-189, D-214, D-194, D-246, D-437 — not read whole; their quotations in the range checked by the foundation check only. D-221 read to line 6404 of its entry. D-190, D-220, D-240, D-242, D-427, D-428, D-429 read whole.
- Invariants `trip-transfer`, `trip-run-end`, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment`, `loop-practice-payment`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability` — read whole. Glossary `resurrection` — not read.
- `task.md` — only the passages the handoff copies.
- `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` — read through the diff of the range, not whole; `tests/sim/completion.test.mjs` through the diff; `tests/sim/death.test.mjs` whole.

## Searches not found or unclear

- `foundations/decisions.md` line ranges of the plan differ at the head (D-427 at 11672, D-428 at 11687, D-429 at 11704, D-437 at 888); found by identifier.
- `tests/sim/previous-programs.test.mjs` in `plan.md`: not found — no slice covers the failing case of I-3.
- An overlay file under `balance/` that sets `resurrectionRenewalRealMinutes` or `resurrectionUses`: none found (grep of `balance/`), so I-2 is latent today.
- A test of the campaign's `resurrectionsUsed` with more than one use spent in one return: none found in `tests/balance/campaign.test.mjs`.
- Unclear: whether a blocking finding whose code lies outside the reviewed range (I-2 in `game.ts`, I-3 in `tests/sim/previous-programs.test.mjs`) should fail this range; counted as blocking since both lie within the task, each named with the slice it comes from.
