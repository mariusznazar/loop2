FAIL 77dd1194d5e32f4a627b7c9419df6335d1e83ace

# Review of the whole change — `wskrzeszenie-wspolne`

Range `2a8645d46c50b23437ad824d1e7969ee760d05f1..77dd1194d5e32f4a627b7c9419df6335d1e83ace` (six commits, 35 files: 15 product files under `src/browser/`, 3 foundation files, 20 test files — `git diff --stat` reports +1741 / −435). One-author route, no plan, no spec, no slice review: this is the only review the change gets. `git rev-parse HEAD` in the worktree gave the head above.

Counts: blocking findings 1 (Important, within the task); Minor findings 5 (all within the task); out-of-scope findings 0; Declined to judge 5 lines.

## Findings

### Important

**I-1 — Four existing view tests no longer exercise the deaths they are named for: their fixture character has no practice, so every death they build now settles as `noPractice`, and their `readyAtMs` argument has no effect.**

Place: `tests/view/world-area.test.mjs:75-84` (helper `died`, changed in this range) and its uses at `tests/view/world-area.test.mjs:236-239` („Dead, the resurrection not ready …”) and `:406-408` (test „a death that used a resurrection shows no line of its settlement and no deposit and no preview in the world area”); `tests/view/trip.test.mjs:345-354` (helper `died`, changed in this range) and its uses at `:383-389` and `:405-406` (test „a death not yet settled has no settlement record, and a loaded game holds the same record and the same lines”).

What is wrong: the change rewrote both `died` helpers to put `readyAtMs` on `team.resurrectionReadyAtMs`, but their characters come from `createCharacter(withEdgeSolved(newGame()), …)` with zero practice in every skill. Under the new D-190 such a death uses no resurrection whether one is ready or not, so `died(sent(), 0)` and `died(sent(), 9_000_000)` both give `deathSettlement: { kind: "noPractice" }`. Before the change they gave `resurrectionUsed` and `progressLost`. The tests still pass, but:
- the world-area test named „a death that used a resurrection …” contains no death that used a resurrection;
- the case „Dead, the resurrection not ready” (`:239`) no longer has a death with a resurrection not ready, and its guard `!text.includes("Wskrzeszenie")` would not even catch the new no-practice line leaking into the world area, because that line reads „…nie zużyła wskrzeszenia drużyny.” (lower-case, inflected);
- the trip test's load round-trip now loads two `noPractice` records instead of one `resurrectionUsed` and one `progressLost`.

Why it matters: D-216, D-62 („what the death took … standing in the world area instead of the window” is a violation) and D-311 require that the lines of a used or missing resurrection stand only in the end-of-run window. These tests were the guard for the world-area side of that rule. After the change, nothing guards it for the two settlements that carry the danger line, and the tests' names claim a protection they no longer give. `guidelines/testing.md`, „Changing an existing test”, treats a weakened check without a stated reason as hiding a fault. The author's report (concern 4) states the rule it followed elsewhere — give the fixture character one practice where a test needs a death that costs something (`practised` / `withPractice` in `catch-up`, `loop`, `clock`, `saved-game`, `account-screen` and `end-window-game` tests) — but these two files were missed.

Evidence: a scratch run against the head build (`scratchpad/probe/fixture.mjs`, method below) printed `world-area/trip fixture character has no practice: true`, `readyAt 0 settlement {"kind":"noPractice"}`, `readyAt 9000000 settlement {"kind":"noPractice"}`.

Fix: give the character of both `sent` fixtures one practice (as the other files do), so that `readyAtMs` again selects `resurrectionUsed` or `progressLost`. Optionally add a `noPractice` case to the world-area test and check the line's own text rather than the word „Wskrzeszenie”.

### Minor (all within the task)

**M-1 — D-190's binding text restates the loop stop without the exception it makes two sentences earlier.** `foundations/decisions.md:3716` (the D-190 paragraph). The first sentence says that the death of a character with no practice „does not stop its earning loop”. The third sentence says: „The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death with none ready stops the character's earning loop, and …”. Read on its own, „a death with none ready stops the character's earning loop” covers the death of a character with no practice too, which the first sentence and the task (To do 6, pytanie 7) exclude. The code (`src/browser/sim/loop.ts:316-330`) and the Verification's *violates* („… or stopping its earning loop”) follow the exception, so the overall reading holds. The fix is one clause: „a death of a character with practice with none ready stops its earning loop”.

**M-2 — The clock test of the order of one reading uses an exact tie, which the foundation does not settle and which D-242's tie rule would settle the other way.** `tests/view/clock.test.mjs:568` (test „in a reading that ends a loop's map run in a death and the manual run in another, the loop's death, no later than the reading, takes the resurrection”). In this test the loop's game minute lies at T0 + 60 s and the reading is at the same moment (the comment says so). The test therefore pins only the tie-break „loop before the manual run at an equal moment”. D-242 orders two deaths in one game minute by the team's order, and the manual run's Ala is first in that order. The defect the author fixed in `4f0781c3` is a loop death strictly *earlier* than the reading losing to the manual death settled at the reading, and that is the case worth pinning. Move the reading at least one millisecond after the loop's minute moment (for example `jump(LOOP_MINUTE_MS - 1000 + 1)`). The test would still fail under the old order, and its expectation would then follow from „the earlier death takes it” (To do 4) instead of a convention.

**M-3 — An assertion about the test's own helper.** `tests/sim/catch-up.test.mjs:856` (in the test „a loop of a character with no practice dies on and on with no loss …”): `assert.equal(line(1, { minutes: 300 }).resurrectionUsed, false);` checks the fixture `line`, not the product. The next assertion (`deepEqual(caught.awayReport[0], line(1, { minutes: 300 }))`) carries the check. Drop the first one.

**M-4 — The new clause of `resurrection-renewal`, „and no later completion of it”, has no test marked with the invariant.** `foundations/invariants.md:1050` gained the clause; the tests that show it, `tests/sim/completion.test.mjs:535` („the completion of a map the account had solved before renews nothing, whatever the resurrection”) and `:549` („a restart after a first completion starts a map run of a solved map, whose completion renews nothing”), have no `// invariant: resurrection-renewal` line. The other new clauses have marked tests. Add the marker to at least one of the two.

**M-5 — The appearance of the long countdown line and of the renewal line is unverified in a real browser.** The author's UI check showed only „Wskrzeszenie drużyny gotowe” and the no-practice line (screenshots kept outside the repository, as the foundation settles). It did not show „Wskrzeszenie drużyny za 7 godz. 59 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in the narrow „Kto idzie” column of the card of a map, or „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” in the window. What the jsdom tests establish: the exact texts (`team-lines`, `end-window-lines`); the role (`danger` class present or absent: `headquarters-screen`, `character-screen`, `maps-screen`, `end-window`); that the same line stands at every character (`maps-screen`); that the renewal line stands after the deposit line and only for `resurrectionRenewed` (`end-window`); that it survives a reload while the no-practice line does too (`end-window-game`). What they leave to appearance: wrapping and height of the longer line beside „Wejdź” and „Puść w pętlę”, and the spacing of the second `end-window-cost` paragraph. Neither the styleguide nor D-87 asks for a pixel test. The text and role are what the task fixes, so this is a visual check before merge, not a defect.

## Points of the handoff

1. **Order and moments of deaths (To do 4, D-240, D-242).**
   - In the catch-up, each character's turn goes through the whole span, and the team's resurrection travels with the state from one character to the next (`src/browser/sim/loop.ts:560-606`). So a death lower on the list finds the resurrection as the turns above left it. Tests: `catch-up.test.mjs` „with one resurrection for two deaths …”, and the no-practice case.
   - In the open game, `passLoops` goes minute by minute and, inside a minute, by the team's order (`loop.ts:518-548`). So the earlier death takes the resurrection, and of two deaths in one game minute the character earlier in the team's order takes it (test at `catch-up.test.mjs`, „in the open game the death earlier in time …”).
   - `clock.ts:94-102` now passes the loops before settling the manual run. Loop ends lie at moments no later than the reading, and the manual death and the first completion are settled at the reading (D-221). This makes „earlier takes it” hold for the moments the foundation defines.
   - `passLoops` does not read the manual run (`beginRun` and `takeEnd` read only the loop and the team), so passing the loops before the manual death is settled cannot change them. The store still gets one result per reading, with the death settled.
   - Each death is settled once: `settleDeath` and `settleCompletion` return the very state when a settlement is held, and `takeEnd` starts the next map run in the same step.
   - `death-settled-once`, `catch-up-death-moment`, `catch-up-state` and `minute-span-split` stay true. Their tests pass, and the „moment of a death is the same in one call and in calls split” test still compares whole states.
   - Only the tie test is weak (M-2).
2. **Renewal at a first completion (To do 3, 10).** `settleCompletion` plus `GameMapRun.completionSettlement` is, in my judgement, the smallest reading that meets both items:
   - To do 3 needs a real moment („gotowe od chwili pierwszego rozwiązania”), which the function that passes game time must not take (D-04, D-221).
   - To do 10 needs a saved fact „this solving renewed a used-up resurrection” that survives a load and does not flip when eight hours pass. A clock-free mark cannot tell „was used up” from „was ready”.
   - Both follow the pattern D-221 already set for deaths.

   On the load rule:
   - Admitting an unsettled first completion is consistent with D-386's first sentence: `advanceMinutes` makes that state, and the scratch run confirms the game-made state loads.
   - It is safe: the next reading settles it once, and the probe confirmed it is settled once.
   - It is consistent with D-221: that decision is about deaths, and it forbids a load that *settles* a death. Here the load settles nothing.
   - Refusing an unsettled death stays as D-221 gives it.

   The asymmetry is therefore not a conflict. In play the store never holds an unsettled completion either, because the clock settles it in the same reading. So refusing it would also have been admissible. The choice is recorded in D-386 and the type comment, and I do not count it as a finding.
3. **„No practice” (To do 5, 6).** `hasNoPractice` (`src/browser/sim/skills.ts:136-148`) requires zero practice in every skill, no bought rank and nothing in `gathered`. `takeEnd` passes `waitingPractice(loop)`, which leaves out the run that died (D-189). `teamAfterDeath` returns the very team for such a character, ready or not, so the resurrection, the generation and the loop stay. This is covered for the manual run (`death.test.mjs`), the open loop (`loop.test.mjs`), the catch-up (`catch-up.test.mjs`, including the character lower on the list finding the resurrection as it was) and the clock (`clock.test.mjs`). The chest stays as it stood, and the carried items go with the run.
4. **Texts and roles (To do 7–10).** All four texts match the task word for word (`team-lines.ts:79-91`, `end-window-lines.ts:96-128`), with roles `text-secondary` and `danger` as given. The no-practice line replaces the used/not-ready line. The renewal line stands only for `resurrectionRenewed`, after the deposit line, until „Restart” (which resets the field) or „Zakończ”, and after a load (`end-window-game.test.mjs` reload test). See M-5 for what stays visual.
5. **Version and foundation (To do 11, 12).**
   - `SAVED_GAME_VERSION` is raised once, to 7. The test keeps `DOCUMENT_V6` and refuses it as another version, as `guidelines/coding-saved-game.md` asks.
   - Every entry the task names is written as the task gives it: D-190, D-220, D-240, D-217, D-329, D-216 (the renewal line placed in D-216, its question widened, as the task allows), D-386, `resurrection-renewal`, `catch-up-state`, and the glossary entries `resurrection` and `generation number`.
   - The extra edits are justified corrections of sentences the change made untrue: the D-242 rationale clause about the resurrection, and the D-247 clause „a death that takes the character's practice”. The D-386 additions are about `settleCompletion`, which the code introduces.
   - My own search of the foundation for „resurrect|wskrzesz|generation number” (decisions, invariants, glossary, environment facts, part map) found D-04, D-189, D-212, D-218, D-219, D-241, D-246, D-248 and D-311 besides the changed ones. None of them now says something untrue: they speak of a resurrection generally, of a character with practice, or in *Rejected* text.
   - The only wording fault is M-1.
6. **Tests (WAY-03, `guidelines/testing.md`).** Invariant-marked tests the change altered:
   - `resurrection-renewal`: `death`, `loop`, `catch-up`, `completion`, `clock`, `team-lines`, `character-screen` (and unmarked view tests of D-217);
   - `catch-up-state`: the `assertRelation` test, narrowed to one looping character as the invariant now is;
   - `catch-up-death-moment`: three tests moved to `aloneLooping`, plus one new test;
   - `death-settled-once`: `loop.test.mjs` „what a death does to the team is one rule …”;
   - `save-version`: `saved-game.test.mjs` (current document v7, v6 refused, crafted table), `previous-programs.test.mjs`, `previous-save.test.mjs`.

   Each altered expectation follows a changed decision and keeps the rule:
   - the `catch-up-state` relation still compares the whole team and loops, the resurrection included;
   - the `save-version` tests still refuse another version and every crafted shape;
   - the `death-settled-once` test now compares the whole team for the manual run and the loop.

   The tests the author did not see fail again were judged by reading: each would fail if its rule broke. For example, removing `"resurrectionReadyAtMs"` from the team keys would turn the v7 document's load to `shape`. The Stryker run below supports this. The failing parts are I-1 (fixture weakening), M-3 and M-4.
7. **Real browser.** See M-5.

## Trust boundary — `src/browser/sim/saved-game.ts`

Read: `team()` (`:500-540`), `SETTLEMENTS` / `deathSettlement` (`:806-848`), `COMPLETION_SETTLEMENTS` / `completionSettlement` (`:850-873`), `mapRun` (`:1054-1083`), helpers `fields`, `integer`, `oneOf`, `plainObject`.

Ran: `node probe/probe.mjs <review worktree>` (scratch, outside the repository), against the head build. Every crafted document of the handoff's list gave the expected result, and none threw:
- a character still holding `resurrectionReadyAtMs`, the team without its moment, and an extra team key → `refused:shape`;
- moment NaN, 1.5, 2**53 or the string „5” → `shape`; −1 and `MAX_SAFE_INTEGER` → admitted, as D-386 gives;
- version 6 and version 8 → `version`; version „7” → `shape`;
- death kind `foo`, `constructor` or `__proto__` (through JSON), `noPractice` with a `generation`, `noPractice` as a string, a death with a null settlement → `shape`;
- a completion settlement on a death, on a run going on, on a completion of a solved-map run, of kind `foo` or `toString`, with an extra key, as an array or `true`, the key missing, a death settlement on a completion → `shape`;
- a completion settlement `null` on a death → admitted (correct: no first solving).

Game-made states all load:
- a run going on;
- a first completion unsettled, renewed, or found ready;
- a `noPractice` death.

The unsettled death stays refused (D-221). A loaded unsettled completion is settled once by `settleCompletion` (a second call returns the very state). The committed tests cover the same cases in `CRAFTED` of `tests/sim/saved-game.test.mjs` and its „game state the simulation made loads back” test.

The reverse case (a state the game's functions make but the load refuses) exists only at a moment near 2**53: `settleDeath` at `MAX_SAFE_INTEGER − 1000` stores an unsafe moment, and that state is refused. This is pre-existing (the base `characterAfterDeath` did the same) and is under Declined to judge.

## Irreversible operation

None performed. The raise to version 7 discards version-6 saves at the first load after deployment. The server keeps them as the previous save (D-399), and an account with the privilege can pull its programs (D-400, D-401). The task's note to check the human's privilege before deployment stands for the human at the request.

## Author's own-work check

The author named To do 4 and 6 in the catch-up as the requirement most likely unmet. That fits where the change is hardest, and its three catch-up tests would catch it unmet (I confirmed by reading them, and the Stryker run below covers `takeEnd`). The weakest place turned out to be elsewhere: the view fixtures of I-1, which the own-work check did not reach.

## Declined to judge

- The unsafe moment `nowMs + renewal` stored by `teamAfterDeath` for `nowMs` within eight hours of 2**53, which the load then refuses. It is pre-existing behaviour of the base `characterAfterDeath`, unchanged in kind by this task, and unreachable from a real clock.
- The trust-boundary table of `guidelines/testing.md:173` names the previous-programs test by its old title („from 1 to 5”). This was stale before this change, which only renamed „1 to 6” to „1 to 7”. It is guideline upkeep outside the task.
- In a reading after a long hidden tab, the manual run's death or completion is settled at the reading even if it happened earlier in real time, so a loop death in between may take the resurrection first. This follows D-221 (settle at the reading) and is not changed by the task.
- D-216 now holds two „Accepted with it:” phrases in its rationale. This is style only and changes no meaning.
- The Stryker survivor at `src/browser/sim/saved-game.ts:521`: no test refuses a document whose character's number equals `nextCharacterId`. This line predates the task and only falls inside the range I mutated because `team()` was changed around it; it is a gap at the trust boundary for a later task.

## Checks run

| Command / method | Result |
|---|---|
| `git worktree add --detach <scratchpad>/rv 77dd1194…` + junction to the worktree's `node_modules` (separate worktree; the reviewed worktree was not changed) | ok |
| `npm run typecheck` (review worktree) | exit 0 |
| `npm run build` (review worktree) | exit 0 |
| `node --test` on the 20 changed test files (`tests/sim/{death,completion,catch-up,loop,saved-game,flow,team,previous-programs}.test.mjs`, `tests/view/{clock,end-window-lines,end-window,end-window-game,team-lines,maps-screen,headquarters-screen,character-screen,trip,world-area,previous-save,account-screen}.test.mjs`) | exit 0; 571 tests, 571 pass, 0 fail |
| `npx eslint <changed .ts/.tsx/.mjs>` | exit 0 |
| `npx prettier --check <changed .ts/.tsx/.mjs>` | exit 0 (the two changed foundation `.md` files fail Prettier, but they also fail at the base and are outside the Prettier gate, which covers TS/JS) |
| `python -B .the-way/elements/common/foundation_check.py` (in the reviewed worktree, read-only; `.the-way` at `55afa8e5…` = the recorded gitlink) | exit 0, `0 errors` |
| Scratch probe of the load and of the settle functions (`node probe/probe.mjs`) | as reported under Trust boundary |
| Scratch probe of the view fixtures (`node probe/fixture.mjs`) | as reported in I-1 |
| StrykerJS on the changed simulation ranges (`stryker.js run --mutate "skills.ts:136-149,game.ts:80-85,game.ts:583-690,loop.ts:292-394,saved-game.ts:504-540,saved-game.ts:806-873,saved-game.ts:1054-1083"`), in the review worktree | exit 0; 252 mutants: 222 killed, 9 timeout, 12 survived, 0 without coverage (score 95.06 %). The survivors, classified:
  - `skills.ts:145` (`every(rank => false)`, `every(() => undefined)`, `skill.ranks` without `?.`): equivalent. Every rank the game or the load keeps is from 1 up and every skill value is defined, so a non-empty `ranks` record already means a bought rank.
  - `game.ts:633`, `game.ts:665`, `loop.ts:302` (text of the RangeError): not worth fixing; the type of the error is tested.
  - `loop.ts:299`, `:308`, `:330` (the internal `EndKind` words `none`, `completion`, `noPractice` set to empty): equivalent. Callers compare only with `covered` and `stopped`.
  - `game.ts:646`, `game.ts:682` (`events: ["Stryker was here"]` on settling): not worth fixing. `clock.ts` does not pass the settle functions' events on, so nothing a player sees changes.
  - `saved-game.ts:521` (`id >= nextCharacterId` changed to `>`): a real gap, but in a line this task did not change. It is under Declined to judge. |

Not run: `npm test` (the cycle's gate, by instruction); the Python and quality tests (no file of theirs changed); a real-browser check (M-5).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-62, D-132 (binding sentence and Verification), D-185–D-188, D-206, D-311 (the one resurrection line). They hold the end-window and save-version rules that the change touches, and D-311 came up in the foundation search.
- The scratch worktree of the head commit under the session scratchpad. Building and Stryker write files, and the reviewed worktree must stay untouched.

## Unread material

Decisions of my selection (Scope naming `simulation`, `browser-view` or `product-foundation`: 336 entries):
- read whole: 29 — D-04, D-62, D-185, D-186, D-187, D-188, D-189, D-190, D-206, D-212, D-216, D-217, D-218, D-219, D-220, D-221, D-240, D-241, D-242, D-243, D-244, D-245, D-246, D-247, D-248, D-249, D-329, D-368, D-386;
- opened in part: 2 — D-132 (binding sentence and the start of its Verification), D-311 (the one line that mentions a resurrection, which is *Rejected* text);
- by title only: 305.

None of the decisions that bear on the change stayed unread. Every decision whose title points to death, resurrection, catch-up, earning loops, saving or the end-of-run window was opened.

Guidelines:
- read whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`;
- not read: `guidelines/coding-content-data.md` and `guidelines/coding-browser-api-client.md`. Their index rows do not match the change, which touches no content-data file and no API client.

The author's reading gaps, judged:
- `foundations/part_map.md`: I read the entries of `browser-view`, `simulation`, `product-foundation` and `test-helpers`. The change adds no file, and `foundation_check.py` reports 0 errors, so there is no conflict.
- Styleguide lines 609–987: I read them whole. No conflict: the end-window rule at line 912 („w `text-secondary`, a w `danger`, gdy wskrzeszenie nie było gotowe”) still holds for the new lines.
- `coding-content-data.md`: not applicable.
- D-04, D-212, D-241, D-243, D-246, D-247, D-248: read whole. No conflict, and D-247's corrected clause is right.
- D-311: only the resurrection line. No conflict.
- Glossary `solved map` and `map run`: read. No conflict; „a map the account has not solved” agrees with `solved map`.

## Searches not found or unclear

- The `.the-way` submodule is not initialized in a fresh `git worktree add`, so `foundation_check.py` could not run in the review worktree. I ran it read-only in the reviewed worktree instead, after checking that the gitlink and the checkout match.
- The trust-boundary table in `guidelines/testing.md` names a previous-programs test by a title that no longer exists („from 1 to 5”). It was stale before this change.
