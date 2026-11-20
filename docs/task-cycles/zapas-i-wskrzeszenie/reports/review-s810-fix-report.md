FAIL 3a00e73a48b73102f6b6bd88c6e0e8dfd6f2f73a

# Review of the fix of the findings of the grouped review of slices 8-10 (`zapas-i-wskrzeszenie`)

Fix range `ab0e44ba..3a00e73a`: `febbcfc9` (I-2), `87ae7409` (I-3), `3a00e73a` (I-1). `git rev-parse HEAD` = `3a00e73a48b73102f6b6bd88c6e0e8dfd6f2f73a`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. Findings file `reports/findings-s810.md` (I-1, I-2, I-3, all Important); fix report `reports/fix-s810-report.md`.

Counts: blocking 1 (a new Important finding in the fix diff, which counts as one that remains), I-1, I-2, I-3 fixed, Minor 3.

## The findings of the findings file

**I-2 — fixed.** `src/browser/sim/game.ts:76-79` replaces the constant read at load by `renewalMs()`, read in `usesAt` (`:105-111`) and in `teamAfterDeath` (`:649`). No other read of `resurrectionRenewalRealMinutes` at load remains in `src/browser/sim/` (grep). The new case of `tests/sim/team.test.mjs` ("the renewal is read from the data of the game when it is used ...") sets the renewal to 60 minutes after the module loaded and checks the clock of a death and the three returns with values written out; the fix report shows it failing on the base (`actual 1760014400000`, T0 + 240 min). With this, the instrument's spent start (`balance/loop.mjs`) and the game read the same number, and M-1 of my first review (the comment of `withNoReturn`) is now true.

**I-3 — fixed.** `tests/sim/previous-programs.test.mjs` takes the first version above the current one from `SAVED_GAME_VERSION + 1` and its `DOCUMENT` from `SAVED_GAME_VERSION`; the table of documents gains version 8 with a precondition tying it to `SAVED_GAME_VERSION`. `tests/view/previous-save.test.mjs:551-552` and `tests/view/account-screen.test.mjs:1897-1899` take their versions from the constant too. My search for other hard-coded save versions (`git grep` for `version: N`, `"version": N`, `version = N`, `VERSION = N` in `tests/`, `src/`, `scripts/`, `balance/`) found only the constant itself (`src/browser/sim/saved-game.ts:82`), the version-agnostic pass-through values of `tests/account-api.test.mjs` and the schema version of `tests/account-storage.test.mjs`, none a save version that the change to 8 broke. Runs: `previous-programs.test.mjs` 19 pass, `previous-save.test.mjs` 46 pass, the whole simulation directory 866 of 866. `account-screen.test.mjs`: 130 pass, 3 fail — "a game minute that ends the map run in a death is saved at once, settled" (`expected {"kind":"resurrectionUsed"}, got {"kind":"resurrectionUsed","usesLeft":2}`), and the two "a clock tick rewrites the resurrection line ..." cases: the resurrection lines that Slice 18 owns (`plan.md:618-634`, "from Slice 6 on that file fails until Slice 18"), not the version.

**I-1 — fixed, and the fix brings N-1.** `balance/campaign.mjs:351-382` (`passAway`) passes the game's `catchUp` in steps that end at the end of a map run, as `advanceLoopRun` reports it, and counts the uses a death spent as `resurrectionAt(before, moment).usesLeft - resurrectionAt(after, moment).usesLeft`; completions come from the loop's own `completed` counter. Judged on the three points the coordinator asked:

- (a) Order and moment of settling, and the clock. The campaign's team has one character (`balance/campaign.mjs:166`, one `createCharacter`), so D-240's order between characters is not touched. Each step ends at a whole loop minute counted from the original save time (`moment = saveTimeMs + passed * minuteMs`, and the next step starts from `caught.clockMs`), so a death in the k-th game minute is still settled at the save time plus k minutes (`catch-up-death-moment`), the minutes passed are the whole minutes from the save time to the reading with the rest waiting (`catch-up-minutes`; the last step ends at the same `clockMs` as the single call), and each end is settled once, in exactly one step (`death-settled-once`). The uses and the clock are changed only by the game's `catchUp`; the instrument only reads them, and both readings are at the same moment, so returns up to that moment cancel (`resurrection-renewal`, D-190). This holds while the instrument's minute length equals the game's: see N-1.
- (b) Results identical to the base where one use is involved. My probe ran the base's `balance/campaign.mjs` (from `ab0e44ba`) against the fix for `edge-daily-best`, `edge-daily-decent`, `edge-daily-decent-stock`, seeds 1-10, 28 days: 30 campaigns, every log deep-equal beside the two counts, and the two counts equal as well. The two new cases of `tests/balance/campaign.test.mjs` give 5 uses in one return (the old rule 1) and 3 uses before a stop (the old rule 1, and 2 completions by the old formula), with values derived from the game's 243-minute run and D-190.
- (c) The instrument's rules. No return is counted by the instrument (`resurrectionAt` is the game's) and the map runs go through `catchUp` and `advanceLoopRun`. But `passAway` computes the moment of a step itself, from a live read of `BALANCE.loopMinuteRealSeconds`, while the game's catch-up reads that number once at load (`src/browser/sim/loop.ts:417`, `MS_PER_LOOP_MINUTE`) — N-1; and the same expression already stands in `balance/loop.mjs:28` — M-1.

## New finding in the fix diff

### Important

**N-1 — the campaign hangs under an overlay that shortens the loop minute (I-1's fix, `3a00e73a`)**

Place: `balance/campaign.mjs:361` (`const minuteMs = BALANCE.loopMinuteRealSeconds * MS_PER_SECOND;`) and the loop `:366-379`, against `src/browser/sim/loop.ts:417` (`const MS_PER_LOOP_MINUTE = BALANCE.loopMinuteRealSeconds * 1000;`, read once at load).

What is wrong: `passAway` steps by the minute length it reads now, the game's catch-up by the one it read at load. Under an overlay of `loopMinuteRealSeconds` (an ordinary number of `BALANCE`, which `balance/overlay.mjs` lays) the two differ. With a shorter overlaid minute, each step's `moment` covers fewer of the game's minutes than `advanceLoopRun` reported; the remainder halves step by step until a step of one instrument minute is shorter than one game minute, `catchUp` passes zero minutes and returns the same `clockMs`, and the `while` loop repeats forever. With a longer one, a step can pass more than one end, which the rest of the code does not expect. The base (one `catchUp` per return) ran under such an overlay, with the game ignoring it; the fix turns it into a hang. It is the same kind of fault as I-2 — a number of the game read in two ways — in the code that fixed I-1, and it makes the instrument compute the moment of a step with its own arithmetic where the catch-up's own clock (`caught.clockMs`) already tells it.

Why it matters: a campaign under such an overlay never ends and prints nothing; the guidelines of the instrument want every map run "jak w grze" and no own computation of the game's rules (`guidelines/coding-balance-instrument.md`, "Przejście mapy jak w grze", "Liczba gry"). No overlay file sets the loop minute today, so the hang is latent, but it is a new failure the fix brought, and its repair is local: take the step's length from the same place as the game (for example export `MS_PER_LOOP_MINUTE` from `balance/loop.mjs`, which reads it at load as `loop.ts` does, M-1), or derive the step from the catch-up's own clock and stop the loop when `caught.clockMs` does not move.

Evidence: probe `.runs/review-s810-fix/minute.mjs` (removed; output kept here): the campaign's `comeBack` on the context of the new tests (one character with practice, the empty program on Skraj lasu), 24 hours, under `applyOverlay({ BALANCE: { loopMinuteRealSeconds: s } })`:
- `s = 60` (the built value): 5 uses, 0 completions, run number 6, exit 0;
- `s = 90`: 5 uses, 0 completions, run number 6, exit 0;
- `s = 30`: no result within 30 seconds, `timeout` exit 124 (the run takes about a second at 60).

Contradiction: no

### Minor

**M-1 — the minute length stands in two instrument files** — `balance/campaign.mjs:361` writes `BALANCE.loopMinuteRealSeconds * MS_PER_SECOND`, the same thing `balance/loop.mjs:28` names `MS_PER_LOOP_MINUTE` (not exported), which `guidelines/coding-balance-instrument.md` ("Jedno miejsce wspólnej rzeczy") asks to keep in one place. Fixing N-1 by importing it from `balance/loop.mjs` settles both.

**M-2 — no case counts completions alongside covered deaths** — both new cases of `tests/balance/campaign.test.mjs` have 0 completions, so the new count of completions (the loop's `completed` counter of the last state with the loop alive) is held only by my comparison probe and the existing relations of the campaign tests, not by a case with completions and covered deaths in one return.

**M-3 — the fix edits a file another slice owns** — `tests/view/account-screen.test.mjs:1897-1899` (the versions) is part of Slice 18's Goal ("the version of the saved shape is 8", `plan.md:618`). The edit is right and makes 130 of 133 cases pass; Slice 18's executor should know it is done.

## Declined to judge

none

## Checks

- `npm test -- tests/sim/team.test.mjs` — exit 0 (23 pass)
- `npm test -- tests/sim/previous-programs.test.mjs` — exit 0 (19 pass)
- `npm test -- tests/view/previous-save.test.mjs` — exit 0 (46 pass)
- `npm test -- tests/view/account-screen.test.mjs` — exit 1 (130 pass, 3 fail; the three resurrection-line cases of Slice 18, named above)
- `npm test -- tests/balance/campaign.test.mjs` — exit 0 (14 pass)
- `node --test tests/sim/*.test.mjs` (built game) — exit 0, 866 of 866
- `node --test tests/balance/*.test.mjs` — exit 0, 85 of 85
- `python -B .the-way/elements/common/foundation_check.py` — exit 1, the same 9 errors in `tests/view/` as before the fix (`account-screen.test.mjs:3133` now, moved by 3 lines), none in a file of the fix besides that line, which Slice 18 owns
- `npx eslint` on the seven files of the fix — exit 0; `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on them — exit 0
- Comparison probe of the base's and the fix's campaigns (30 campaigns of 28 days) — identical logs and counts
- Overlay probe of the loop minute — N-1
- `git grep` for hard-coded save versions — as under I-3
- Not run: the full `npm test` (the cycle's run); StrykerJS on `game.ts`'s changed lines (the change is a read moved into a function, held by the new `team.test.mjs` case)

## Reaches beyond the dispatch

- `src/browser/sim/loop.ts:540-607` (`catchUp`, `loopSpan` use, `clockMs`) and `:242-250` (`advanceLoopRun`) — how a step is passed, for (a) and N-1.
- `balance/campaign.mjs:166` and `:216-300` (one character, `startPlayersLoop` resetting the save time) — for (a) and for the save time a stopped loop leaves (`{ ...state, saveTimeMs: now }`, which the next loop start overwrites; no effect).
- `plan.md:618-634`, `:675` — whose the failing `account-screen.test.mjs` cases are.
- The base's `balance/campaign.mjs` (`git show ab0e44ba:...`) — for the comparison probe.

## Working copies

- `.runs/review-s810-fix/` held the logs of the checks, the probe `minute.mjs`, the comparison `compare.mjs` with a copy of the base's `balance/campaign.mjs` (imports pointed at the worktree), and their outputs. Results are in this report; nothing kept in `reports/`. Removed with `rm -rf` by its full path before returning. No git worktree made. `npm run build` was run once to rebuild `dist/` (ignored) at the fix head.

## Unread material

- D-190, D-240, D-242, D-428, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment`, `instrument-game-agreement` — read whole in my first review of this range (same text at this head; the fix changes no foundation file).
- `guidelines/coding-balance-instrument.md`, `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-simulation-module.md` — read whole in my first review.
- `src/browser/sim/game.ts` — the changed lines and `:60-134`, `:610-750`; the rest not read.
- `tests/view/account-screen.test.mjs` — the fix's hunks and the failure messages only.
- `tests/sim/previous-programs.test.mjs`, `tests/view/previous-save.test.mjs` — through the diff.

## Searches not found or unclear

- An overlay file under `balance/` that sets `loopMinuteRealSeconds`: none, so N-1 is latent today.
- Another place hard-coding the save version: none found.
- Unclear: whether the coordinator wants N-1 fixed in the instrument (step length from `balance/loop.mjs`, or the catch-up's clock) or in the game (`loop.ts:417` read at use, as I-2 did for the renewal); the second is outside the task's slices but would also make overlays of the loop minute reach the game.
