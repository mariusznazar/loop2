FAIL f120547777ba97470e9aef5ad11212a88647c195

# Review of the return step - task `zapas-i-wskrzeszenie`

Range `5d20e26e..f1205477` (two commits: `3d171140` foundation and the tests that quote it, `f1205477` two player descriptions of the balance instrument). `git rev-parse HEAD` = `f120547777ba97470e9aef5ad11212a88647c195`, the head given. Pinned `.the-way` at `19e5774a`, as the gitlink records. Reviewed against the frozen task `task.md`, the human's remarks `reports/correction-1-remarks.md` (remark 3), the return report `reports/return-report.md`, `.the-way/task-cycle/skill/return_step.md`, and the code at the head (`src/browser/sim/saved-game.ts`, `src/browser/sim/game.ts`).

## Findings

### Important

1. **A save in which every spent use has already come back is refused when the count is lowered, but D-386's new second paragraph says it loads.** `foundations/decisions.md`, D-386, the second paragraph, against `src/browser/sim/game.ts:101-112`, `:645-658`, `:729-739`, `:758` and `src/browser/sim/saved-game.ts:504-516`.
   - What is wrong: the new paragraph says "A saved game state holds the uses of the account's resurrection as the count spent and not yet returned, with the moment the next one returns". It also says that lowering the number "makes the load refuse a saved game state only where more uses are spent than the new number". The code does not keep that count as "not yet returned". `resurrectionUsesSpent` changes only when a death (`teamAfterDeath`) or a first completion (`settleCompletion`) is settled. In between, uses come back only in the reckoning of `usesAt`/`resurrectionAt` at the moment of reading. `withSaveTime` stamps the save time and leaves the team as it is. So a saved document keeps uses as spent after they have come back by the clock. The load compares that stale stored count with `BALANCE.resurrectionUses` (`saved-game.ts:509`).
   - Evidence (a probe run against the built game, output kept in `reports/review-return-probe-returned.out`): Ala, with practice, dies twice at T0 and T0+1 s, and the end-of-run window is closed with `end`. The save is made 13 hours later, at T0+13 h. At that moment `resurrectionAt(team, saveAt)` gives `{"usesLeft":3,"nextReturnMs":null}`, so the player reads "użycia 3 z 3". The document holds `resurrectionUsesSpent: 2`. With the count at 3 and at 2, `loadSavedGame` gives `ok: true`. With the count lowered to 1 it gives `ok: false, reason: "shape"`. D-206 discards that save whole, though no use is spent at the save's moment.
   - Why it matters: remark 3 is binding in this request ("Wygrywa zdanie, że obniżenie liczby odrzuca tylko zapis, w którym zużytych jest więcej niż nowa liczba … Powód: gracz traciłby cały zapis za zwykłe strojenie liczby w danych"). Any player who once spent two uses and has had no death or first completion since keeps a save with two uses stored as spent, for days. The planned tuning of the count after the first walls are measured would then wipe that save. D-386's binding paragraph and its *Rationale* ("without the player losing a whole save for it") say the opposite. A reader of the entry is misled about what the load refuses. The tests do not catch it: both cases in `tests/sim/team.test.mjs:729-783` save at the moment of the death, before any use has come back.
   - The way out, recommended: (a) a change of code, not of the entry. `withSaveTime` stores the uses as `usesAt(team, nowMs)` gives them, which is a state the game's own functions make and leaves every moment a safe integer. Add a case to `team.test.mjs`: two deaths, a save after every return, the count lowered to 1, the load accepts. The test that holds `withSaveTime` as "the state passed unchanged otherwise" then needs the uses named as the one exception. Second way: (b) at the load, reckon the uses at the document's own `saveTimeMs`, a stored moment and not a clock, before comparing with the count. That keeps a stored count above the data's count inside a loaded state (`resurrectionAt` would read negative uses left until the next return), so it is worse. Third way: (c) reword D-386 to say the stored count is the one the last settled death or completion left. That makes the entry true, but it keeps the loss remark 3 forbids, so it needs the human.

   Contradiction: yes — D-386, second paragraph (written in this range), and the human's remark 3 of correction 1 that it records.

### Minor

2. **D-386 has no `derives from D-190`.** `foundations/decisions.md`, D-386 *Relations* (`derives from D-213 · derives from D-221 · derives from D-248`). The new paragraph is about the uses of the resurrection that D-190 sets. Its *Rationale* says it exists "so that the number of uses in the balance data can be tuned", which is D-190's sentence that both numbers are lines of the balance data. By the template ("`derives from` — a higher decision this one serves", "written in the entry that depends on the other"), D-386 now depends on D-190: a change of D-190 that dropped the uses would have to change this paragraph. Without the relation, the search of the foundation (WAY-33) from D-190 does not reach it. D-216 and D-220, which depend on the uses the same way, carry `derives from D-190`. No sentence is misread for lack of it, so the grade is Minor (WAY-364). Recommended: add `derives from D-190`.

3. **D-386 *Rejected* does not keep, with its own reason, the second way remark 3 names.** Remark 3 names two ways for the cycle to choose from: "rekord końca przejścia trzyma zużyte zamiast pozostałych … albo sprawdzenie pozostałych przycięte do nowej liczby". By the template (`.the-way/elements/decisions/template.md:106`), the *Rejected* of a decision marked `the cycle's` holds the ways a statement of the human names. The third item of *Rejected*, "the uses left cut to the new number at the load — it repairs a state", is the way under *Not chosen* of question 15 (the load clips instead of refusing). Its reason does not fit a check that is only clipped while the stored uses left stay as they are. That way repairs nothing; what it costs is a window reading "zostały użycia 2 z 1". Recommended: one item for the clipped check, with that cost. The binding sentences are unaffected.

4. **Stale wording about "readiness" stays in a comment of the product and in three test titles.** The code no longer has a moment of readiness, but these places still use the word:
   - `src/browser/sim/saved-game.ts:1268` ("The save time is a safe integer of any sign, as a moment of readiness is")
   - `tests/sim/death.test.mjs:103` ("a moment of readiness below zero is ready at every moment from zero on")
   - `tests/balance/loop.test.mjs:135` ("a loop that starts with the resurrection ready …")
   - `tests/balance/cli.test.mjs:135` ("… the resurrection ready …")

   They are not foundation entries and they mislead no one about behaviour, but they are the same kind of correction the return step made in `tests/view/end-window-lines.test.mjs`. The comments in `tests/sim/saved-game.test.mjs` and `tests/view/account-screen.test.mjs` that describe the old versions of the document stay true and are not part of this finding.

### Out of scope

none

## Judgement on the handoff's points

1. **The entries written or changed say what the code does.** They do, except finding 1.
   - D-386's first paragraph ("the moment the next spent use of the account's resurrection returns") agrees with `resurrectionNextReturnAtMs` and with `saved-game.ts:513-514`.
   - The settlement holding the uses spent after the death agrees with `game.ts:654-657` and `saved-game.ts:834-842`. The refusal in the team or in the settlement agrees with `saved-game.ts:509` and `:840`.
   - The open window after a first death stays loadable when the count goes from 3 to 1, held by `team.test.mjs:729`.
   - *Verification*'s new clause matches the cases in `team.test.mjs:610-783`.
   - Template limits: two sentences in the new paragraph, well under 300 words, and `foundation_check.py` counts them with 0 errors. The first paragraph keeps every word except the changed phrase. *Verification*, *Rationale* and *Rejected* keep the old text and append.
2. **D-04, D-194, D-216 heading, D-219, D-241, D-329, D-428 `tests:` and the glossary `generation number`.** Each changed only the stale words.
   - D-329's binding sentence now names only the warning of an empty list „Wynieś” beside „Puść w pętlę” (D-326). That agrees with `src/browser/view/maps-screen.tsx:313-341`: `tripWarning` is the clipped-plan warning, listed separately, and `emptyLoopMark` is drawn only beside „Puść w pętlę”. No `decision: D-329` line quotes the changed part.
   - D-428's clause names what the four cases carry: `tests/balance/check-map.test.mjs:215`, `loop.test.mjs:134` and `:149` (every use spent at the start, the first use back at `LOOP_START_MS + RENEWAL_MS`, through the game's `resurrectionAt`), `cli.test.mjs:454` (`--no-resurrection` reaches the loop), and `campaign.test.mjs:232` (tries with two spent, waits with three).
   - The glossary term agrees with D-190 ("when the resurrection has no use left").
3. **The tests quote the sentences as they now stand.** All 12 `decision: D-386` lines quote the reworded sentence word for word, and the three new lines in `team.test.mjs` quote the new paragraph. `foundation_check.py` with no skip switch: 0 errors. A tracked-file search for the old sentence ("account's resurrection is ready"), the old heading ("completion renewed") and "no resurrection is ready" finds nothing.
4. **Player descriptions in `balance/players/`: allowed, no defect.** `description` is free text for a person. No `.mjs` of `balance/` reads it: `campaign.mjs` reads `days`, `checkHours`, `pace`, `cashIn`, `attempts` and the other fields, and `checkedPlayer` does not touch `description`. The only test that touches it asserts it is non-empty (`tests/balance/campaign.test.mjs:200`), and it is not printed in any output. A change of the text therefore cannot change a measurement or a refusal. The new words "has a use left" are what `needResurrection` means in code (`campaign.mjs:17-19`, D-428's second paragraph). The plan's *Choices* row read "ready" as "with a use left". Making that explicit departs from the plan, but it fixes a misleading word and breaks nothing. `campaign.test.mjs` passes.
5. **Nothing else stale in `foundations/` misleads a reader about the changed code.** Searched for "ready", "one resurrection", "uses left", "480", "eight hours", "from nowhere", "takes nothing", "pays nothing", "rehearsal", "renewed", "D-251" and `resurrectionReadyAtMs`. The hits are:
   - "ready" in D-217 *Rejected* ("a bare ready or not ready", "only a row in `danger` when the resurrection is not ready"): ways that were rejected.
   - "ready" in D-220 *Rationale* ("as the first character of the tests of loop had its resurrection ready"): it describes the predecessor game's tests.
   - "one resurrection": D-190's binding sentence and its *Verification*, both true (one resurrection with uses).
   - "480" and "renewed": game minutes and resource renewals of maps (D-398, D-388), and D-190 *Rejected*.
   - "eight hours": D-190 *Rejected*, D-189 *Rejected* (Odbierz) and D-262: rejected ways or unrelated.
   - "D-251": only the withdrawn list.
   - "uses left": D-190, D-216, D-240, the glossary `resurrection` and the invariant `resurrection-renewal`, all of which agree with the code.
6. **The *Relations* link left out (D-386 derives from D-190).** The template's rule points to adding it; see finding 2, Minor.

## Declined to judge

- Whether D-216's end-of-run line should show the uses left of the moment of death after the count in the data changes. D-216's *Rationale* already accepts that the number holds "for as long as the count in the data stays as it was". It is not changed in this range and is the human's accepted shape.
- The code's choice of a lazily reckoned count in the team (no normalising step at each tick). It belongs to the code of the earlier slices, not to this range. It is judged here only where finding 1 shows the entry and the human's rule disagree with it.

## Checks run

- `git rev-parse HEAD`: exit 0, `f1205477…`. `git -C .the-way rev-parse HEAD` equals `git ls-files --stage -- .the-way` (`19e5774a…`).
- `python -B .the-way/elements/common/foundation_check.py` (no skip switch): exit 0, "0 errors".
- `npm test -- <file>`, one at a time (each run also builds `dist/`):
  - `tests/sim/team.test.mjs`: exit 0, 24/24.
  - `tests/sim/saved-game.test.mjs`: exit 0, 44/44.
  - `tests/sim/death.test.mjs`: exit 0, 33/33.
  - `tests/sim/completion.test.mjs`: exit 0, 27/27.
  - `tests/sim/loop.test.mjs`: exit 0, 46/46.
  - `tests/view/end-window-lines.test.mjs`: exit 0, 12/12.
  - `tests/balance/campaign.test.mjs` (reads the two changed player files): exit 0, 16/16.
- Trust-boundary probe 1, `.runs/review-return/probe.mjs` with `node`: exit 0, every case as expected (output in `reports/review-return-probe.out`). It used crafted saved documents against the built game, with `BALANCE.resurrectionUses` set to 0, 1, 2, 3 and 5.
  - Game-made saves with 1, 2 and 3 spent load when the count is at or above the spent count and are refused below it.
  - Raising the count to 5 loads, with 2 uses left.
  - A crafted settlement alone above the new count is refused, and so is a crafted team alone above it.
  - A settlement above the team loads.
  - Hostile `usesSpent` values are each refused as `shape`: "1", 0, -1, 1.5, Infinity, NaN, null, true, [1], an object with `valueOf`, 2^53.
  - Also refused as `shape`: a `usesLeft` key beside it, `usesSpent` on a `progressLost` settlement, an own `__proto__` key, and a `usesSpent` that is only inherited.
  - A new game with none spent loads with the count at 0.
- Probe 2, `.runs/review-return/probe-returned.mjs` with `node`: exit 0, output in `reports/review-return-probe-returned.out`. A save after every use has come back is refused when the count is lowered to 1 (finding 1). Its core:

  ```js
  const second = end(settleDeath(fell(end(first).state, T0 + 1000), T0 + 1000).state).state;
  const document = savedGame(withSaveTime(second, T0 + 13 * HOUR)); // usesLeft 3 of 3 at the save
  BALANCE.resurrectionUses = 1; loadSavedGame(document); // { ok: false, reason: "shape" }
  ```
- Not run, with reasons:
  - The full gate (`npm test` with no file): the cycle's own run, as the method says.
  - `check_instructions.py`: no instruction file is in the range.
  - `tests/balance/loop|cli|check-map.test.mjs`: unchanged in the range, and what they read is unchanged. I read the four D-428 cases instead.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, lines 60-134 and 195-294: the rules of *Relations*, *Verification*, *Rejected* of `the cycle's`, and the limits, for points 1 and 6.
- `foundations/decisions.md`: D-189 (binding sentences), D-216 (whole binding sentences and *Verification*), D-220, D-326 (binding sentence), D-329 (whole) and D-428 (binding sentences), to check the corrections against the entries they cite. Lines of the search hits, for point 5.
- `foundations/invariants.md`, `resurrection-renewal` whole, for point 5.
- `guidelines/coding-saved-game.md`, lines 112-123: the list of checks against the data, to compare with the new rule.
- Code: `src/browser/sim/game.ts:80-137`, `:612-760`, `src/browser/sim/saved-game.ts:495-565`, `:820-890`, `:1195-1240`, `:1264-1272`, `src/browser/view/maps-screen.tsx:300-344`, `balance/campaign.mjs:1-30`, `:94-130`.
- Tests: `tests/sim/team.test.mjs:1-40`, `:183-260`, `:600-783`, and the D-428 cases in `tests/balance/*.test.mjs`, for points 1-4.

## Working copies

- `.runs/review-return/` held the two probe scripts, their outputs and the logs of the test runs. The outputs needed here were copied to `reports/review-return-probe.out` and `reports/review-return-probe-returned.out`. The directory was removed by its full path before returning.
- `dist/` was rebuilt by `npm test` itself (the product's own tool, outside the rule).
- The reviewed worktree, its index and its branch were not changed.

## Unread material

- `task.md`, `return-report.md`, `correction-1-remarks.md`, `return_step.md` and the review method: read whole.
- The diff of the range: read whole.
- `foundations/decisions.md` entries D-04, D-194, D-219 and D-241: read only around the changed lines (the diff hunks), not whole. The changes are single phrases in *Verification*, *Rejected* and *Rationale*.
- D-386: read through the diff, which shows the whole entry except the pair of examples' lines, and those were unchanged.
- D-190: read in its *Rationale* and *Rejected* lines (diff context) and its binding paragraph, not its *Verification*.
- `plan.md`: only its lines about the player descriptions (found by search: lines 404-406 and 676), not whole.

## Searches not found or unclear

- Not found: any step that brings the team's stored uses up to date at a save or at a load. Searched `src/browser/sim/` for assignments of `resurrectionUsesSpent` (only `game.ts:396`, `:650`, `:737`) and for callers of `usesAt`. This absence is the basis of finding 1.
- Unclear: remark 3's second way, "sprawdzenie pozostałych przycięte do nowej liczby". It can be read as a check that only lets a larger count pass, or as a cut of the stored value. D-386 *Rejected* takes it as the cut (finding 3).
- Not found: any `.mjs` of `balance/` that reads a player's `description`. Searched `balance/*.mjs` for "description".
