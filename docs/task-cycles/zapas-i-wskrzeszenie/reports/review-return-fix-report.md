PASS ad465c7698f507ee98d13bde4102ee8c0ebf8926

# Review of the fix of the return step's review - task `zapas-i-wskrzeszenie`

I reviewed the range `f1205477..ad465c76`. `git log` shows one commit in it, `ad465c76`. `git rev-parse HEAD` returns `ad465c7698f507ee98d13bde4102ee8c0ebf8926`, the head I was given.

I read these whole:
- the findings file `reports/findings-return.md`
- the fix report `reports/return-fix-report.md`
- its probe output `reports/return-fix-probe.out`
- the method `.the-way/task-cycle/review/SKILL.md` with `fix.md`
- the diff of the range

## Findings of the findings file

1. **Fixed.** Before the fix, a save made after every spent use had come back was refused when the count was lowered, although D-386's second paragraph says it loads. `withSaveTime` (`src/browser/sim/game.ts:764-780`) now stores the uses as `usesAt(team, nowMs)` gives them. A spent use whose return moment has come by the save, that moment included, is stored as returned. The moment of the next return is recomputed, and no moment is stored when nothing is spent. The team object stays the same where nothing came back. I re-ran my own case from `reports/review-return-probe-returned.out`; the probe output is kept in `reports/review-return-fix-probe.out`.
   - **Full return.** Ala dies twice. At T0+13 h the document holds `resurrectionUsesSpent 0` and no moment, and it loads at counts 3, 2, 1 and 0. Before the fix it was refused at count 1.
   - **Partial return.** After three deaths:

     | Save at | Stored | Loads at | Refused at |
     |---|---|---|---|
     | T0+4 h−1 ms | 3 spent, next at +4 h | 3 | 2 and 1 |
     | T0+4 h exactly | 2 spent, next at +8 h (the use due at the save moment counts as back) | 3 and 2 | 1 |
     | T0+9 h | 1 spent, next at +12 h | 3, 2 and 1 | — |
     | T0+12 h exactly | 0 spent, no moment | 3, 2 and 1 | — |

     Each stored figure is what `resurrectionAt` of the held state reckons at that moment.
   - **D-386 now says what the code does.** The second paragraph reads "the count spent and not yet returned at the moment of the save". *Verification* gained the part about a save made after spent uses came back. *Rationale* says the same. Everything else in the entry is word for word as before. The 3 `decision:` quotations of the reworded sentence in `tests/sim/team.test.mjs` quote it as it stands, and `foundation_check.py` reports 0 errors.

## The fix diff

### Trust boundary (the load of a saved document)

`git diff f1205477..ad465c76 -- src/browser/sim/saved-game.ts` changes two comments and no logic, so the load is unchanged.

I crafted hostile documents from a normalised save (the +6 h save of the two-death game). Each of these was refused as `shape`:
- spent above the count
- spent 0 with a moment
- spent 1 with no moment
- a moment that is a text, 2^53 or 1.5
- spent NaN or −1
- the old key `resurrectionReadyAtMs` beside the new ones
- a save time that is a text, and a missing save time

The normalised document itself loads. A forged document with every use spent and a moment of −MAX_SAFE_INTEGER loads, and its next save stores `0/null`; no RangeError.

### Both save paths go through `withSaveTime`

A search of `src/` for `savedGame(` and `withSaveTime(` finds only two save paths:
- `src/browser/view/game-saver.ts:162-163`: `withSaveTime` and then `savedGame` inside a `try` whose `catch` reports the save as not sent.
- `src/browser/view/state-store.ts:194`: `savedGame(withSaveTime(state, clock.moment()))`.

Nothing else makes a document. `balance/` and `scripts/` do not call `withSaveTime`.

### The normalised team reckons the same uses as the original from the save moment on

The derivation: let `b0` be the uses back at the save moment `s`. The normalised team holds `spent − b0` and `next + b0·R`. For every moment `t ≥ s`, `min(spent, 1 + ⌊(t − next)/R⌋)` equals `b0` plus the returns the normalised team counts. Both teams therefore reckon the same uses and the same next moment, and a death settled at `t` finds the same uses (D-190, invariant `resurrection-renewal`).

The probe ran 1,050 comparisons with 0 mismatches. It compared `resurrectionAt` of the loaded team with that of the held team, and `teamAfterDeath` of a second character with practice (the settlement, the uses spent, the next moment and the reckoning an hour later). The comparisons covered three base states (1, 2 and 3 spent) and 50 save moments over 14 h. Each save was checked at 7 moments from the save on, including a moment exactly at a return.

The catch-up settles a death at the save time plus k real minutes (`catch-up-death-moment`, D-240), which is never before the save moment. The open game settles at the reading (D-242), which is at or after the save on the same clock. `death-settled-once` and `catch-up-state` read the run and the state, not how the team is stored. `catch-up.test.mjs` and `loop.test.mjs` pass.

The two reckonings differ only for a clock reading earlier than the save time, for example another device whose clock is behind. Uses the save stored as back read as back, where the held state would show them as spent a little longer. D-219's *Rationale* and D-248 (*Accepted with it*: "a wrong clock on the device…", D-07) already accept that a wrong device clock moves the renewal. I judge this acceptable, not a finding.

### The executor's two concerns

1. **The open window after a second death, saved hours later, is refused at count 1.** The probe confirms it: team 0 spent, settlement `{"kind":"resurrectionUsed","usesSpent":2}`, loads at count 2 and is refused at count 1. A window after a first death, saved at +13 h, loads at count 1. This follows the rule as written. D-386 refuses where more uses are spent than the new number "in the team or in the settlement of a death". The settlement describes the moment of that death, which D-216 shows and must not change. Remark 3 names "zapis, w którym zużytych jest więcej niż nowa liczba" and asks for the case of the window after the first death. The paragraph's closing clause, "so a saved game state with an end-of-run window open after a death stays loadable", follows from "only where", and a reader who takes it alone could read it more broadly. That sentence was not changed by this fix, I did not flag it in the first review, and the binding sentence states the exception. Not a finding.
2. **D-248 says the save changes no game state.** D-248's binding sentence ("a saved document carries the moment it was saved, written on its way to the document, and the game state the browser view holds stays the value it was") and its *Rationale* ("changes no game state, so a comparison by identity keeps its meaning") both speak of the state the view holds. That state still stays the value it was. The probe confirms the held state is deep-equal after a save and the team keeps its identity where nothing came back. `team.test.mjs` asserts the held state is unchanged. The document now also holds the uses brought up to date, which D-386's paragraph says. That changes nothing the game reckons from the save on. D-248 is not made false, so this is not a finding. Naming the uses in D-248 would be optional polish.

### The tests

The three new cases in `tests/sim/team.test.mjs` fail first. I checked this in a scratch worktree at `f1205477` (old code), built, with the new test file from `ad465c76`: exit 1, 24 passed and 3 failed — exactly the three new cases (`reports/review-return-fix-old-code.out`). The third case fails on the old code only through its identity assertion, since its equivalence assertions hold on any code. They are not tautological: they compare the reckoning of the loaded document with that of the held state, a regression check of the normalising arithmetic. The first two cases carry expected values written out by hand: 0 spent and no moment at +13 h; 1 spent and the next at T0+8 h at +6 h and at exactly +4 h; 2 spent 1 ms before the first return.

The round-trip case in `tests/sim/saved-game.test.mjs` hand-derives its expectations (`STORED_AT_THE_SAVE`). `SAVE_MS − REAL_MS` is 59,992 ms, more than the 1 ms to the first return, so 3 spent become 2 with the next at `REAL_MS + 1 + 14,400,000`, and the completion state becomes 1. Neither test lets the code compute its own expected value. No product code has a branch for a test input.

### Other parts of the diff

The comment in `src/browser/sim/types.ts` was extended. The comment in `saved-game.ts` dropped the word "readiness". The test title at `tests/sim/death.test.mjs:103` was renamed. Each of these says what the code does (see Minor 1 for the one inexact sentence that remains).

## Findings new in the fix diff

### Critical / Important

none

### Minor

1. `src/browser/sim/types.ts:429-433` still says "The state holds the uses as they stood when a death or a first solving last settled". A state loaded from a document holds them as they stood at that save. The sentence added after it says so for the document, but not for the state the load gives. It misleads no one about behaviour; the wording could read "…last settled, or the save it was loaded from".

### Notes, outside the fix diff (no finding)

- `withSaveTime` can now also throw a RangeError for a safe `nowMs`, when the recomputed moment leaves the safe integers. The probe shows it: a forged moment of MAX_SAFE_INTEGER−10 with a clock at MAX_SAFE_INTEGER. `resurrectionAt` throws the same for that state at that moment, so the save adds no new failure. The function's comment says it. `game-saver.ts` catches it.
- Minor 4 of the first review: the titles `tests/balance/loop.test.mjs:135` and `tests/balance/cli.test.mjs:135` still say "the resurrection ready". Minors 2 and 3 of the first review were not in the findings file and are not touched. None of these is in the findings file.

## Declined to judge

- Whether D-248 should name the uses brought up to date in its binding sentence: a wording choice. D-248 is not made false (concern 2).
- The behaviour of a clock reading earlier than the save time: already accepted by D-219 and D-248 for a wrong device clock.

## Checks run

- `git log --oneline f1205477..ad465c76`: one commit, `ad465c76`. `git rev-parse HEAD`: `ad465c76…`.
- `npm run typecheck`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py` (no skip switch): exit 0, "0 errors".
- `npm test -- <file>`, one at a time, all exit 0:

  | File | Passed |
  |---|---|
  | `tests/sim/team.test.mjs` | 27/27 |
  | `tests/sim/saved-game.test.mjs` | 44/44 |
  | `tests/sim/death.test.mjs` | 33/33 |
  | `tests/sim/catch-up.test.mjs` | 35/35 |
  | `tests/sim/loop.test.mjs` | 46/46 |
  | `tests/sim/completion.test.mjs` | 27/27 |
  | `tests/view/game-saver.test.mjs` | 25/25 |
  | `tests/view/state-store.test.mjs` | 12/12 |
  | `tests/view/previous-save.test.mjs` | 46/46 |

- Probe `.runs/review-return-fix/probe.mjs` with `node` against the built head: exit 0; output in `reports/review-return-fix-probe.out`.
- First-failing check: a detached worktree of `f1205477` with the new `tests/sim/team.test.mjs`, built with `node scripts/build.mjs` (exit 0); `node --test tests/sim/team.test.mjs` exited 1 on exactly the three new cases.
- Not run:
  - the full gate (the cycle's own run)
  - `tests/view/account-screen.test.mjs` and `clock.test.mjs` (the fix report ran them; they do not touch the stored team beyond what the files above cover)
  - `check_instructions.py` (no instruction file in the range)

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-248 whole (concern 2), and the binding sentences of D-242.
- `foundations/invariants.md`: `catch-up-death-moment`, `catch-up-minutes` and `death-settled-once` (equivalence in the catch-up).
- `src/browser/view/game-saver.ts:158-167` and `src/browser/view/state-store.ts:190-197` (the save paths).
- `tests/sim/saved-game.test.mjs`: lines 2890-2892 and 2940-2955 (the constants and the `usedUp` fixture behind `STORED_AT_THE_SAVE`).
- `tests/sim/team.test.mjs`: lines 228-235 (the `dies` and `stock` helpers).

## Working copies

- `.runs/review-return-fix/` held:
  - the probe and its output
  - the test logs
  - a detached worktree `wt` of `f1205477`, whose `node_modules` was a junction to the reviewed worktree's `node_modules`
- Cleanup:
  - The junction was removed as a link (`rmdir` without `/s`), and the real `node_modules` is intact.
  - The worktree was removed with `git worktree remove --force` and `git worktree prune`.
  - The directory was removed by its full path.
- Kept in `reports/`: `review-return-fix-probe.out` and `review-return-fix-old-code.out`.
- The reviewed worktree is clean, at `ad465c76`.

## Unread material

- `tests/sim/team.test.mjs`, `tests/sim/saved-game.test.mjs` and `src/browser/sim/game.ts`: read in the diff and the ranges named above, not whole.
- D-190, D-219 and D-240: not reread whole in this review. Their sentences on the one clock, the browser's clock and the order of the catch-up were read in the first review (D-190's binding paragraph, its *Rationale* and *Rejected*) or through the invariants named above. D-219 was read in its *Verification* lines.
- `src/browser/sim/loop.ts` (the catch-up): not read. I relied on `catch-up-death-moment` and the passing `catch-up.test.mjs`.

## Searches not found or unclear

- Not found: any path besides `game-saver.ts:162` and `state-store.ts:194` that makes a saved document. I searched `src/` for `savedGame(` and `withSaveTime(`, and `balance/` and `scripts/` for `withSaveTime`.
- Unclear: whether D-386's clause "so a saved game state with an end-of-run window open after a death stays loadable" is meant for every window or only within "only where". I read it within "only where" (concern 1).
