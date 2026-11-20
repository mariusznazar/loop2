PASS 14f9b8dac60bbf066e6db6bddd73662a7d87218f

# Review of correction 1 (the human's remarks 1 and 3) of `zapas-i-wskrzeszenie`

Range `cfc5206b..14f9b8da`: `fae769a4` (remark 1, N-1) and `14f9b8da` (remark 3, the lowered count); the code before is `3a00e73a` (`cfc5206b` only removes the record's copy). `git rev-parse HEAD` = `14f9b8dac60bbf066e6db6bddd73662a7d87218f`, the head given. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (a correction: the remarks in place of a findings file). Remarks: `reports/correction-1-remarks.md`; correction report: `reports/correction-1-fix-report.md`. Trust boundary: `src/browser/sim/saved-game.ts`.

Counts: blocking 0, Minor 4, out of scope 0. Remark 1 made, remark 3 made.

## The remarks

**Remark 1 (way a: the campaign takes the step length from the instrument's loop file) — made.** `balance/loop.mjs:28-29` exports `MS_PER_LOOP_MINUTE`, read at load as the game's `src/browser/sim/loop.ts:417` reads it, and `balance/campaign.mjs:65-70`, `:371`, `:375` use it; `BALANCE.loopMinuteRealSeconds` is no longer read in `campaign.mjs` (grep). The game is not changed, as the remark wants (way c refused). N-1 of my review of the fix is fixed:
- my own probe: `comeBack` on the context of the campaign's tests, 24 hours, under `applyOverlay({ BALANCE: { loopMinuteRealSeconds: s } })` laid after the files loaded: `s = 60`, `30`, `15`, `90` all end (exit 0) with 5 uses, 0 completions, run number 6 — the same as the built value, since neither the game nor the instrument reads the overlaid number. At `3a00e73a` the same probe at 30 s hung (my earlier report).
- results unchanged at the built minute: my side-by-side probe of the campaign code of `ab0e44ba` (slice 10) against the head, players `edge-daily-best`, `edge-daily-decent`, `edge-daily-decent-stock`, seeds 1-10, 28 days: 30 campaigns, every log deep-equal beside the two counts, and the two counts equal too.
- M-1 of the fix review (the minute length in two instrument files) is settled with it.

**Remark 3 (lowering the count refuses only a save with more uses spent than the new count, an open end-of-run window included) — made.** The settlement of a death that spent a use now holds `usesSpent`, the uses spent after that death (`src/browser/sim/types.ts:285-295`, `src/browser/sim/game.ts:653` `usesSpent: spent + 1`), and the load takes it as a safe integer from 1 up to `BALANCE.resurrectionUses` read when the load runs, refusing above it, with exactly the keys `kind` and `usesSpent` (`src/browser/sim/saved-game.ts:834-842`). That is the way the remark names first ("rekord końca przejścia trzyma zużyte zamiast pozostałych"); no clamp (the guidelines and question 15 forbid it).

My own documents, made by the game's functions (a character with practice sent to Las until it dies, `settleDeath`, `withSaveTime`, `savedGame`), loaded with `BALANCE.resurrectionUses` changed after the save:

| Document | count 3 | count 1 | count 2 |
|---|---|---|---|
| open window after the first death (team 1 spent, settlement `usesSpent: 1`) | admitted | **admitted**, settlement and team as saved (1 and 1) | admitted |
| open window after the second death (team 2, settlement 2) | admitted | refused, `shape` | admitted |
| no window, team 2 spent | admitted | refused, `shape` | admitted |

Crafted settlements on the first-death window (count 3), each refused whole as `shape`: `usesSpent` 0, 4, −1, 1.5, `Infinity` and `NaN` (as `null` through JSON), `"1"`, `null`, `true`, 2^53, `[1]`; the old key `usesLeft` instead of `usesSpent`, both keys, the key missing, an extra key. `usesSpent` 1 and 3 admitted. Nothing refused before is admitted now: the old range was `usesLeft` 0..count, the new one `usesSpent` 1..count, the same number of values, and neither version checks the settlement against the team's count. The team's own checks (`saved-game.ts:504-516`: spent 0..count, a moment exactly when some are spent) are unchanged.

Readers of the settlement agree with the new field and meaning: `git grep usesLeft|usesSpent` in `src/` and `balance/` finds the field only in `types.ts`, `game.ts:653` and `saved-game.ts`; `usesLeft` elsewhere is `resurrectionAt`'s return (`game.ts:124-134`, `src/browser/view/team-lines.ts:76`, `balance/campaign.mjs:379-380`), a different thing, unchanged. No file of `src/browser/view/` reads a field of the settlement (the window reads its kind; its wording is slice 14's). The game's `teamAfterDeath` writes it. No foundation decision or invariant says what the settlement holds (`git grep -i "uses left|usesLeft|uses spent"` in `foundations/` and `guidelines/`: only a D-240 rationale sentence about the uses left in general, `decisions.md:8708`); D-190, D-216 (not yet rewritten; slice 11), `resurrection-renewal` and `death-settled-once`, read whole, say nothing of it either.

`guidelines/coding-saved-game.md:119-120`: "liczbę użyć wskrzeszenia drużyny (zużytych użyć nie może być więcej, także w rozliczeniu śmierci, która zużyła użycie)" — says what the load does now, and drops the old "zostaje ich nie więcej" that described the uses left.

## Findings

### Minor

**m-1 — a window whose death spent more uses than the team now holds is refused at a count between the two** — `src/browser/sim/saved-game.ts:839-840` checks the settlement's `usesSpent` against the new count on its own. A game can hold an open end-of-run window whose death spent the third use while the team's stored count is lower: an earning loop's death settled later, after uses returned, stores the count `usesAt` gives (for example 2). Lowering the count to 2 then refuses that save, though the team has 2 spent. My probe: such a document (settlement 3, team 2) at count 2 — `shape`. Reading "zużytych" of the remark as the uses spent the save records, the settlement's included, the refusal follows the rule; reading it as the team's current count, it does not. Refusing is also the only answer without a clamp, since the window would say "uses left" of 2 − 3. The case the remark names (a lowering from 3 to 1 with the window after the first death) loads. For the orchestrator to put to the human if the stricter reading was meant.

**m-2 — the plan and the frozen task still speak of the uses left in the settlement** — `plan.md:278`, `:283`, `:323`, `:523`, `:529`, `:621`, `:644` and the task's To do 3 ("rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały") describe the old field; remark 3 authorizes the change. Slice 14 (the window's line) and Slice 18 need their passages read as "the data's count less `usesSpent`", and the return step needs to record the change. One consequence of computing it at display time: after a later change of the count, the window's "Po tej śmierci zostały użycia N z M" is computed against the new count, not the count at the moment of death (question 6: "Liczba użyć mówi o chwili śmierci"); with a raised count from 3 to 5 the first-death window would read 4 of 5 where 2 of 3 were left. The correction report names this cost.

**m-3 — a unit-test file now starts a process** — `tests/balance/campaign.test.mjs:289-321` runs the return in `spawnSync` with a 20-second limit, the only way to stop a synchronous endless loop. `guidelines/testing.md` sets the level by the resources ("unit test ... bez ... procesów"; the integration recipe lists its files by name, `tests/view/memory-limit.test.mjs` among them for the same reason), and this file is not listed there. Polish: list it in the integration recipe, or say why it stays in the unit recipe.

**m-4 — the guideline was edited by hand** — the correction report says `guidelines/coding-saved-game.md` was edited "by hand ... not through the skill `the-way-maintain-coding-guidelines`", which `AGENTS.md` names for that work. The edited sentence is right (above); the process departure is for the record.

## Declined to judge

none

## Checks

- `npm test -- tests/invariants/test_simulation_isolation.py` — exit 0 (5 tests)
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0 (2 tests)
- `npm test -- tests/sim/team.test.mjs` — exit 0 (24 pass)
- `npm test -- tests/sim/saved-game.test.mjs` — exit 0 (44 pass)
- `npm test -- tests/sim/death.test.mjs` — exit 0 (33 pass)
- `npm test -- tests/balance/campaign.test.mjs` — exit 0 (15 pass; the new case's child process ends)
- `node --test tests/sim/*.test.mjs` (built at the head) — exit 0, 867 of 867
- `node --test tests/balance/*.test.mjs` — exit 0, 86 of 86 (covers `tests/balance/campaign-fixture.mjs` through its users)
- `node --test tests/view/end-window*.test.mjs tests/view/clock.test.mjs` (readers of the settlement) — exit 1, 71 pass, 8 fail: 5 of `clock.test.mjs` (Slice 13's; e.g. `:272` expects the settlement `{ kind: 'resurrectionUsed' }` with no number at all, the model before this task) and 3 of the end-window files expecting the old line of the 8-hour renewal (Slice 14's); none expects `usesLeft`, so the correction did not make any of them fail.
- Overlay probe of the loop minute (60, 30, 15, 90 s) and the side-by-side campaign probe — as above.
- Load probe of the lowered count and crafted settlements — as above.
- `git grep` for the readers of the settlement and for the wording in `foundations/` and `guidelines/` — as above.
- Not run: the full `npm test` (the cycle's run); `foundation_check.py` (no foundation file and no `decision:` line changed in the range besides those the correction report lists; the fix agent ran it with no line for its files); StrykerJS on `game.ts:653` (a one-expression change held by the `usesSpent` values of `team.test.mjs` and `death.test.mjs`).

## Reaches beyond the dispatch

- `task.md` question 6 and question 15 (lines 73-79, 142-147) and `plan.md` (grep for the uses left) — for m-2 and the rule.
- `src/browser/sim/saved-game.ts:182-203` (`integer`, `count`) and `:499-516` (the team's check).
- The campaign of `ab0e44ba` (`git show`) for the side-by-side probe.
- `guidelines/coding-saved-game.md:100-125` — the passage around the changed phrase.

## Working copies

- `.runs/review-c1/` held the probes (`lowered.mjs`, `minute.mjs`, `compare.mjs` with a copy of the slice-10 `balance/campaign.mjs`) and the logs of the checks; results are in this report, nothing kept in `reports/`. Removed with `rm -rf` by its full path before returning. No git worktree made. `npm run build` was run to rebuild `dist/` (ignored) at the head.

## Unread material

- D-190, D-240, D-242, D-428, `resurrection-renewal`, `death-settled-once` and the `catch-up-*` invariants — read whole in my first review of this range; their text is unchanged at this head. D-216 read whole then (its old wording, which slice 11 rewrites).
- `guidelines/coding-saved-game.md` — read at lines 100-125 only, not whole.
- `tests/sim/saved-game.test.mjs` and `tests/sim/death.test.mjs` — the range's hunks only through the counts in the correction report and the test runs, not read line by line; `tests/sim/team.test.mjs` and the two campaign test files read through the diff.
- `src/browser/view/` — not read; only grepped for readers of the settlement.

## Searches not found or unclear

- A foundation entry saying what the settlement of a death holds: none found (`git grep -i "uses left|usesLeft|uses spent"` in `foundations/`, besides the general D-240 rationale sentence).
- A reader of the settlement's number in `src/browser/view/` or `balance/`: none found.
- Unclear: which reading of "zużytych" the human meant for a window whose death spent more than the team's count now holds (m-1).
