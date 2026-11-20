FAIL 7e3869c22376378803e520ab4735cf53c82ca3e4

# Review of slices 5 and 6 — `zapas-i-wskrzeszenie`, range `a007dd9b..7e3869c2`

Reviewed: slice 5 (`fc64661c`, `src/browser/sim/game.ts`, `src/browser/view/team-lines.ts`) and
slice 6 (`7e3869c2`, `types.ts`, `data/balance.ts`, `game.ts`, `saved-game.ts`,
`tests/sim/team.test.mjs`, `guidelines/coding-saved-game.md`). `git rev-parse HEAD` in the worktree
is `7e3869c2…`, the head given. Method: `.the-way/task-cycle/review/SKILL.md`, variant "a planned
slice"; the-way pin checked (`19e5774a`, as the gitlink records).

Counts: blocking 1 (Important, I-1); Minor 5, of which 1 (M-5) out of scope; Declined to judge 5
lines, out of scope.

## Findings

### Important

**I-1. The load refuses a death settlement whose `usesLeft` equals the data's count, against the
task's settled effect of a later lowering of the count** — slice 6.

- Place: `src/browser/sim/saved-game.ts:839`
  `if (usesLeft >= BALANCE.resurrectionUses) refuse();`; the same bound is written in
  `guidelines/coding-saved-game.md:119-120` („a po śmierci, która zużyła użycie, zostaje ich mniej
  niż ta liczba”) and fixed by the case "uses left in the settlement equal to the data's count" in
  `tests/sim/team.test.mjs:626-630`.
- What is wrong: question 15 of the frozen task (task.md:142-147) settles the player's effect of a
  later tuning: „obniżenie odrzuca jako uszkodzony tylko zapis, w którym zużytych jest więcej niż
  nowa liczba”. The plan turns the settlement's check into "refuses … a settlement whose uses left
  exceed the data's count" (slice 6 Goal). The executor tightened it to "equal or above" (its
  choice 2). With `>=`, lowering the count from 3 to 2 — the likely correction the task foresees
  in task 6 of the plan (task.md Context: „poprawka to zmiana liczby w danych gry”) — makes the
  load refuse whole every save whose manual map run stands ended in a death that left 2 uses (the
  first death from a full stock, the most common one, whose window stands until „Restart” or
  „Zakończ”, after a load too), even where the team's spent count is 1, at most the new count. Q15
  says such a save survives; under the plan's `>` it does survive. A refused save is discarded
  whole and the player starts anew (D-206).
- Why it matters: player data loss on a data correction the task plans for, in a case the task
  settled explicitly; "Wolno odmówić więcej" in the guidelines does not override an answer of the
  task about what the load keeps.
- Evidence: reading the line above; the probe kept beside this report
  (`review-s56-probe-head.txt`, lines "settlement usesLeft 3" refused and "usesLeft 2" admitted at
  count 3); arithmetic of `>=` against a lowered count of 2.
- Fix suggested: `usesLeft > BALANCE.resurrectionUses` as the plan gives, the guideline sentence
  „nie więcej niż ta liczba”, and the test case "equal to the data's count" moved to the admitted
  side or dropped (the "above" case stays).
- Residual for the orchestrator (not a finding of the slice): even the plan's `>` refuses, on a
  lowering by two or more (3 to 1), a save whose settlement left 2 while the team's spent count is
  within the new count, so To do 3 („wczytanie sprawdza ją wobec liczby użyć w danych gry”) and the
  „tylko” of question 15 cannot both hold in every lowering. Whether that residual is accepted is a
  question for the person who settled the task, not for this fix.

Contradiction: yes — task question 15 (the effect of lowering the count: only a save with more
spent than the new count is refused) and the plan's slice 6 Goal ("exceed the data's count").

### Minor

**M-1. A settling function now throws a RangeError for some safe-integer moments, and its comment
says only "no safe integer"** — slice 6. `src/browser/sim/game.ts:85-91` (`momentAfter`) makes
`teamAfterDeath`, and through it `settleDeath`, throw where `nowMs + renewal` is no safe integer
(tested at `tests/sim/team.test.mjs:549-571`). The doc comments of `settleDeath`
(`game.ts:670-679`: "otherwise a `nowMs` that is no safe integer is a RangeError") and of
`teamAfterDeath` ("`nowMs` is taken as a safe integer; the caller checks it") no longer state the
whole condition; `resurrectionAt`/`resurrectionReady` can in principle throw too (`usesAt` calls
`momentAfter`), though only at clock readings near 2^53 ms. The guard itself agrees with D-386's
rationale ("a number the load would refuse must never reach a document"), so executor concern 2 is
allowed; only the comments lag. I checked that no admitted crafted save makes the view's reading
throw at real clocks: probe lines "view reading does not throw" for a moment at
`±Number.MAX_SAFE_INTEGER` and negative, read at today's moment and in 2100.

**M-2. Wrong comment at the load of `usesLeft`** — slice 6. `src/browser/sim/saved-game.ts:836-837`:
"A death spends one use of a stock that holds at most the data's count, so at most one is left
after it." At most the count minus one is left, not one; a reader fixing I-1 may read the bound
wrongly from it.

**M-3. The stored stock is not canonical; one stock has several stored forms** — slice 6 (executor
concern 3, judged allowed). `Team` keeps the uses as the last settling left them
(`types.ts:425-432` says so), so `{spent 1, next in the past}` and `{spent 0, next null}` are the
same stock. Observable behaviour goes only through `usesAt`, and I found it right (probe, 0 bad of
60). Consequence worth knowing for slices 7–9: a test that compares whole team objects across two
paths (catch-up against the open game, `catch-up-state`) compares representations, not stocks; the
two paths call the same functions at the same moments, so they agree today. Evidence of
equivalence: I mutated `settleCompletion` to subtract from the stored count and keep the stored
moment instead of the normalized ones; `tests/sim/team.test.mjs` stayed green (21/21), and the
probe showed the stored fields differ (`[2, T]` against `[1, T+R]`) while every reading at or after
the settling moment gives the same stock (`review-s56-probe-mutant.txt`, lines 13-14). Not a test
gap: the difference is not observable through the game's readings at or after the settling.

**M-4. The executor's judgment that no output a user sees changes in slice 6 is not accurate** —
slice 6 report, section "Walkthrough". With the data at 240 minutes and 3 uses, the end-of-run line
of `src/browser/view/end-window-lines.ts:98` now reads „po 4 godzinach”, and the line at a
character (`team-lines.ts:77`) stays „Wskrzeszenie drużyny gotowe” after a first and second death
instead of the countdown in `danger`. The report names the first; the plan accepts both until
slices 12–14, so no code fix is asked here; the branch must not reach a request before those slices.

**M-5 (out of scope of slices 5–6). D-386 still names "the moment the account's resurrection is
ready" and its Verification "the team's moment of readiness … stored as given when a death or a
first completion is settled".** `foundations/decisions.md:4233` and `:4238`. The game state now
holds the moment the next use returns, nullable, and a first completion no longer stores its own
moment. The rule of the decision (a safe integer of any sign, no clock compared) holds in the code
(`saved-game.ts:514-515`); only the words lag. D-386 is not in the plan's table of foundation
entries, so no slice owns it; for the orchestrator to place.

## Judgment of the executor's six concerns (slice 6)

1. Refusal of `usesLeft` equal to the count: a divergence from the task — I-1.
2. RangeError within one renewal of 2^53: allowed (D-386 rationale); comments lag — M-1.
3. Lazy storage of returns: allowed; behaviour correct; note for later slices — M-3.
4. Instrument (`balance/loop.mjs:64-71` still writes `resurrectionReadyAtMs`, so a loop started
   "with the resurrection used up" now starts with a full stock) and `end-window-lines.ts`: later
   slices' (10, 14), as the plan gives; see Declined to judge.
5. The compact refusal table in `team.test.mjs`: allowed and useful; it does not carry an
   `invariant: save-version` mark, which `guidelines/testing.md` ("Trust boundaries") asks of the
   boundary's refusal tests — the plan gives those to slice 7 (`tests/sim/saved-game.test.mjs`),
   where the mark belongs.
6. Names for later slices: consistent with the code.

## What I checked and found right

- Slice 5: `resurrectionAt` is pure, returns `{usesLeft, nextReturnMs}` with `null` where none is
  missing; `resurrectionLine` no longer names the field or picks it from `Team`; texts and roles
  unchanged; its five focused checks and typecheck pass at `fc64661c`.
- Slice 6 rules (D-190, `resurrection-renewal`, To do 3, questions 3, 5, 6), by the tests and by my
  own probe: full stock death starts the clock at its moment plus 240 min; a death with the clock
  running keeps it; returns counted first, the moment included; several returns after a long
  absence (`T`, `T+R`, `T+2R` boundaries); zero left takes everything and leaves uses and moment;
  no practice spends none and returns the very team; a first solving returns one with the clock
  running on, stops it when the stock fills, leaves a full stock (also full through returns) as
  stored, and a solved-map run returns none; the settlement holds the uses left; D-240 — a death
  settled later at an earlier moment keeps the clock an earlier-settled death started, and the last
  use goes to the one settled first.
- New game: count 0, no moment (D-220); its `decision:` quote of D-220 is the sentence as slice 1
  left it (the foundation check reports nothing in the range's files).
- Trust boundary (`loadSavedGame`): each of 22 hostile variants of the team refused whole as
  `shape` — count 4, −1, 1.5 (in the test), NaN, ±Infinity, null, true, [], {}, 2^53, BigInt,
  `new Number`, a getter; moment NaN, undefined, 1.5, false, text, −2^53, 2^53; a moment standing
  with none spent and missing with some spent; the old key beside and instead of the new ones; a
  key missing. Admitted as D-386 gives: a moment negative, at ±MAX_SAFE_INTEGER, and count 3. A
  version-7 document refused as `version`. Settlement `usesLeft` −1, NaN, null, text, missing
  refused. No variant threw out of the load.
- `SAVED_GAME_VERSION` 7 → 8 (`saved-game.ts:82`); the guideline list of data checks gains the
  count of uses (`coding-saved-game.md:118-120`), apart from the bound of I-1.
- Simulation isolation and unchanged arguments: invariant tests pass; `game.ts` reads no clock.
- No code made for a test's input; no reserved choice taken; no screenshot in the range.

## Declined to judge

- `balance/loop.mjs`, `balance/check-map.mjs`, `balance/cli.mjs` still on the old field — slice 10's.
- `end-window-lines.ts` text and the D-216 wording — slices 11 and 14's.
- The resurrection line's texts at a character with uses — slices 11 and 12's.
- `loop.ts` comments and the catch-up through the real `catchUp` — slice 9's; the executor's
  throwaway run is a claim I did not repeat.
- The failing files the plan expects until later slices (`saved-game`, `death`, `completion`,
  `flow`, `data`, `catch-up`, `loop`, `tests/balance/*`, `tests/view/*`) — not run.

## Checks run

- `npm test -- tests/sim/team.test.mjs` (worktree, head) — exit 0, 21 pass.
- `npm run typecheck` (head) — exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py` — exit 0 (5 tests).
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0 (2 tests).
- At `fc64661c` (slice 5) in a worktree of my own: `npm test --` `tests/view/team-lines.test.mjs`
  (16 pass), `tests/view/character-screen.test.mjs` (9), `tests/view/headquarters-screen.test.mjs`
  (28), `tests/view/maps-screen.test.mjs` (21), `tests/sim/death.test.mjs` (33) — each exit 0;
  `npm run typecheck` exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 1 with 75 lines, none in the
  range's files (all quotes of other slices' test files, as the executor reported).
- `npx eslint` and `npx prettier --check` on the six changed code and test files — exit 0;
  `node tests/quality/eslint-size-rules.mjs` — 0 over a threshold, exit 0.
- Manual mutation in a worktree of the head: `settleCompletion` using the stored count and moment —
  `team.test.mjs` exit 0 (survived; equivalent in observable behaviour, M-3).
- Probe script against the built head (`review-s56-probe.mjs`): 60 checks, 0 bad
  (`review-s56-probe-head.txt`); against the mutant, 1 expected difference
  (`review-s56-probe-mutant.txt`; its two other "BAD" lines were errors of my first expectations,
  corrected before the head run).
- Not run: StrykerJS (needs all of `tests/sim` green, which it is not until slices 7–9, as the
  handoff says); the full `npm test` (the cycle's own run).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-206 (to judge the version bump), D-216 (stale text the data now
  feeds, M-4), D-218, D-221 (the settlement's place), D-438 (named by D-190) — read whole by heading.
- `foundations/glossary.md` "resurrection" — to check the word against the shape.
- `src/browser/sim/saved-game.ts:60-200, 828-898` — the helpers `fields`, `integer`, `count` and the
  settlement reader, to judge the load.
- Grep over the repository for the old field and the new names — to find readers left on the old
  shape.

## Working copies

- `.runs/review-s56/s5` (worktree of
  `fc64661c`) and `…\.runs\review-s56\head` (worktree of `7e3869c2`), each with a junction
  `node_modules` to the reviewed worktree's; the junctions were removed with `rmdir` first, then
  both worktrees with `git worktree remove --force` and `git worktree prune`; the directory
  `…\.runs\review-s56` (probe script and outputs) removed. The reviewed worktree's
  `node_modules` checked intact afterwards. Remainder: none.
- Kept beside this report: `review-s56-probe.mjs`, `review-s56-probe-head.txt`,
  `review-s56-probe-mutant.txt`.
- The builds `npm test` made in the reviewed worktree's `dist/` are the product's own output.

## Unread material

- `guidelines/styleguide-browser-view.md` (about 1174 lines): read lines 1-80 and its headings
  only. Slice 5 changes no text, role, element or style, so its rules on tokens,
  focus, contrast and the screens were not reached.
- `foundations/part_map.md:139-157` (agent-workflow) not read; `:1-66` read.
- The task file itself not opened; its passages were read as the handoff copies them.
- The plan's other slices not read.

## Searches not found or unclear

- Unclear: whether the task accepts that a check of the settlement's uses left "against the data's
  count" (To do 3) refuses some saves on a lowering of the count by two or more, which the „tylko”
  of question 15 excludes (residual of I-1).
- The plan's ranges for D-217 and D-219 differ from where the entries stand (6287, 6330); entries
  found by heading.
