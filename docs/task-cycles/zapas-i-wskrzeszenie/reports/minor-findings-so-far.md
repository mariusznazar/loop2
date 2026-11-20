# Minor findings of the slice reviews so far (in the reviewers' words)

##### reports/review-s01-report.md

### M-1 — D-190 *Rejected* lacks some of the ways the rows' sources keep

- Place: `foundations/decisions.md:6236` (D-190 *Rejected*).
- The template (`.the-way/elements/decisions/template.md`, "The *Rejected* of a decision written from a row …", WAY-134) asks *Rejected* to hold the ways not chosen that the row's source keeps, each with its cost, or `no cost to the product known`. Rows 2–4 cite questions 2, 3, 4, 5. Missing: from question 2, "Kształt Mariusza bez dalszej drogi przez wytwarzanie — jedna zmiana i koniec; zegar zostaje ceną na stałe", "Od razu pełny wytwarzany przedmiot — … do tego czasu obowiązuje dzisiejsze osiem godzin", "Wskrzeszenie jako prawdziwy przedmiot z własnymi liczbami — czekałby na zadania 8 i 10" (a cost of the plan only — then `no cost to the product known`); from question 4, "Liczby Mariusza — droga otwarta, bez kosztu w pytaniu" (`no cost to the product known`). The ways added (unchanged eight hours, shorter clock, 2/8, 5/2, own clock per use, all uses back at a completion) are right. Minor by WAY-364: form, the content agrees; the item "a resurrection as an item in the chest — set aside…" and the *Rationale*'s "a later direction, not built" cover the crafting ways in spirit.

### M-2 — D-240 *Rationale* and *Rejected* still speak of one resurrection to take

- Place: `foundations/decisions.md:8622-8630` (D-240, an entry of this slice). "a character higher on it died with the resurrection", "a character whose resurrection another's turn reaches is outside `catch-up-state`", *Rejected* "the resurrection going to the character that died first in real time". The binding sentence now says "the last use"; the prose keeps the old one-resurrection reading. Glossary template, "A changed meaning" (WAY-97): uses whose meaning the new definition of `resurrection` moves are rewritten in the same change. Minor: prose; a reader can still follow it, e.g. "the last use going to the character that died first in real time".

### M-3 — `resurrection-renewal` joins several rules in one sentence

- Place: `foundations/invariants.md:1070`. Use-up, start of the clock, return and move of the clock, the return at a first completion, deaths that leave everything, and the equal moment, in one sentence of about 150 words. The invariant template ("One entry states one invariant, in one sentence", WAY-08) — the entry joined several rules before the change too, and a split needs new identifiers, which the plan does not give. The content agrees with D-190 and the task (To do 3, questions 3, 5): checked clause by clause, including the stop of the clock when a completion or a return fills the stock ("unless the stock is then full", "while the stock is then not full"). Minor (WAY-364); the executor named it too.

##### reports/review-s01-fix-report.md

- Place: D-428 *Verification*, `foundations/decisions.md:11697-11699`.
- `.the-way/elements/decisions/skill/SKILL.md`, step 3: "*Verification*, where a test of a later slice of the same change will hold a sentence of this decision: carry a pair of examples for that part for now … the pair holds it until the test stands." Slice 10 is to write the tests of the switch and of the campaign player; until then nothing — no invariant, no test, no pair — holds the new paragraph. The foundation check does not report it because D-428's first paragraph is held by existing `decision:` lines. Minor (WAY-364): form of the entry; no code yet disagrees. Slice 10 should add the `decision:` lines and the `tests:` clause for the paragraph; a pair now would close the gap until then.

##### reports/review-s02-report.md

1. `tests/sim/saved-game.test.mjs:2332` — the new case carries `// invariant: solved-map-manual-run`, while that invariant now says only that such a run "adds no practice to any character skill" (`foundations/invariants.md:1060`) and the case checks nothing of practice; it checks the load's rule for the deposit. The invariant's method is `test`, its check the cases that cite it, so a reader who follows the citation finds a case that would stay green were the practice rule broken. The plan asked for the invariant as the reason of the change (the clause "leaves the chest as it was" was removed from it by Slice 1), which explains the citation, and the case beside it at `saved-game.test.mjs:924` cites the same invariant for the mark alone, so this follows the file's habit. It costs nothing today; were it fixed, the reason could stand in the comment and the invariant line move to a case that holds it, or `trip-run-end`, whose dropped exception this case does check, be named too. Polish.

##### reports/review-s34-report.md

**m-1 (slice 3). The cases of the from-nowhere functions now quote the new sentence of D-189, which they do not hold, and two of their names and a comment still state the old rule.**
`tests/sim/trip.test.mjs:623` ("takeFromNowhere clips ..."), `:649` ("clippedTake lists ..."), `:823` ("sendTake at a solved map takes the take list from nowhere ..."), `:834` ("sendTake at a solved map is not cut by any chest's stock ...") and `:845` ("the backpack of a solved map's run is the entries sendTake gives from nowhere") each carry `decision: D-189 "A manual map run of a map already solved takes its equipment from the chest ..."` while asserting a take from nowhere; the block comment at `:785-787` says "an unsolved map takes from the chest, a solved one from nowhere", and the name at `:845` says the backpack of a solved map's run is taken from nowhere, which is false after this slice. The plan keeps these functions and their cases until slice 16, and the quote change follows the plan's wording mechanically, so the cost is limited to that interval; Minor because the cases test functions that still exist, but the `decision:` lines are a traceability claim that is untrue. Recommended: drop the D-189 line from these five cases (or cite no decision) and rename the case at `:845` and fix the comment at `:785-787`, or let the slice that removes the functions remove the cases with them; for the orchestrator to place.

**m-2 (slice 3). `tripLoot` keeps `solvedMapRun` in its `Pick` type (`src/browser/sim/trip.ts:115`) and no longer reads it.** `src/browser/sim/loop.ts:337` and `balance/engine.mjs:193` pass it in literals. Harmless; the comment now says the mark "does not change the list". Executor's concern 3; a later cleanup.

**m-3 (slice 3). `tests/sim/trip.test.mjs:586` cites `invariant: solved-map-manual-run`, whose sentence is about practice only ("adds no practice to any character skill"), for a case that checks only the take from the chest.** `trip-transfer` is the invariant that case holds. Pre-existing citation, left as it was by the rewrite.

**m-4 (slice 3). The comment of `takeFromNowhere` (`src/browser/sim/trip.ts:94-96`) speaks of the plan, "until the slice that removes it".** Product code describing the process that will change it; it goes stale the moment the plan changes. Say what holds: no start of a map run calls it.

**m-5 (slice 4). The table is made by rendering the map check's table and cutting its last three columns from the text** (`balance/progression.mjs:41` `LOOP_COLUMN_COUNT = 3`, `withoutLoopColumns` at `:320-329`). The count 3 is knowledge of `headerOf` in `balance/check-map.mjs:79-91` held a second time, and the cut parses Markdown by `" | "`. A new column of the map check, or a loop column moved, makes this table wrong silently except for the test's exact six names (`tests/balance/progression.test.mjs:271-279`, which does guard it). Minor: guarded, and `check-map.mjs` is outside the slice's *Change* (executor's concern 2). Exporting the cell helpers, or giving `renderTable` the columns to print, is the follow-up.

**m-6 (slice 4). `neededBranches` counts only branches whose effect opens an action** (`balance/progression.mjs:47-59`); a program that needs a branch of another kind, as `wastelandCleanFlame` (P22) needs "Czysty płomień" (`cleanFlame`, `src/browser/sim/data/skills.ts:133-139`), is measured without it. The skill says so ("read such a row as measured without it"). I checked that it changes nothing in this measurement: with the practice Las — głębiej is measured with (flame spell 10), `buyBranch` cannot buy `cleanFlame` (cost 3 points; my script: `cleanFlameBought: false`), and P22 with the rank given outright solves 0 % of seeds 1-60 on Las — głębiej. Executor's concern 3; Minor.

**m-7 (slice 4). The stocking runs make the state more generous than the game in two ways the table's sentence does not say.** In `stockOnMap` (`balance/progression.mjs:99-124`) a death in a stocking run is left unsettled, so it costs no use of the resurrection and no practice; and the stocking character buys the ranks of the stocking program (`skillsFor(candidate.program, practice)`, `:100`) from the same points the measured program's ranks are bought from (`:206`), so points are spent twice. Neither matters for the measured numbers (no best program needs a branch; the stocking program P23 solves 97.4 % of Skraj lasu, and all runs of my reproduction were solved), and the first is in the skill ("its death is not settled"). The second is not written anywhere; one sentence in the skill would do.

##### reports/review-s34-fix-report.md

- **m-1 remainder.** The no-chest cases at `tests/sim/trip.test.mjs:623`, `:649`, `:824`, `:835` and `:846` still carry `decision: D-189 "A manual map run of a map already solved takes its equipment from the chest …"`, a sentence they do not hold, since they test the cut without a chest. The foundation check accepts the quotation because it stands in D-189. Only the traceability claim is wrong, and these cases are expected to go with the functions they test. This blocks nothing (WAY-162).

##### reports/review-s56-report.md

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

##### reports/review-s56-fix-report.md

**M-F1. The new test's comment points to the task document.** `tests/sim/team.test.mjs:657-658`:
"// Task question 15: a lowering of the count refuses only a save with more spent than the new
count, …". `guidelines/testing.md` ("Where the expected value comes from"): „Komentarz testu nie
wskazuje dokumentu spoza fundamentu”, and a requirement a test needs that the foundation does not
yet carry goes to the foundation first. The bound "at most the data's count" for a settlement
stands in the guideline (`coding-saved-game.md:119-120`) and in the frozen task, not in a
foundation entry (D-190, D-386 do not name it). It blocks nothing; the comment could name the
guideline's rule, or the bound could reach the foundation with the residual the orchestrator
records.

No Critical or Important finding in the fix diff: the change is the one comparison, its comment,
the guideline word and the tests; the team's own bound (`spent > count`, `saved-game.ts:509`) and
the moment's consistency check are untouched and still refuse (probe lines 21-42).

##### reports/review-s07-report.md

**M1. `tests/sim/saved-game.test.mjs:3269-3273` — the marked completion's expectation pins today's eating to 2 berries instead of holding D-189's relation.**

```
  // D-189: a marked run brings its loot out to the chest as any run does, its bring list clipped to
  // what the character still carries; only its practice is not paid. Of the three berries taken from
  // the chest, the character carries two at the completion.
  assert.equal(doneMarked.run.character.backpack.berry, 2);
  assert.deepEqual(doneMarked.run.deposited, [{ item: "berry", count: 2 }]);
```

The change of the old expectation `[]` has its reason in the foundation (D-189 now: "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179)"), so it is no hidden fix (`guidelines/testing.md`, "Changing an existing test"). The value 2 itself is the program's output of one play (the executor's concern 3): if the eating of the four game minutes changes, the precondition fails though the rule under test holds. D-189 gives an independent expectation that this test already has at hand: the unmarked completion `done` is the same play with the mark the only difference, so `assert.deepEqual(doneMarked.run.deposited, done.run.deposited)` holds the rule "as every other map run does" without a number from today's run. I added that assertion in my working copy and the file passed (run M0 below), so the marked deposit does equal the unmarked one today. Minor: the assertion is right now and fails loudly, not silently, when the play changes.

**M2 (out of scope for this slice; within the task). D-386 still names the old moment.** `foundations/decisions.md:4233`: "A moment of real time that the game state stores, the save time and the moment the account's resurrection is ready, is a safe integer of milliseconds of any sign …", and its *Verification* "a save time and the team's moment of readiness at zero or below zero loading". The state no longer holds a moment of readiness; it holds the moment the next use returns (`types.ts:425-438`). The test at `tests/sim/saved-game.test.mjs:1021-1029` and the comment at `:2747-2748` apply D-386 to "the team's moment of the next return", which is the reasonable reading, and the quotation is word for word as D-386 stands, so the slice does what its goal asks ("quotes it as it stands now"). D-386 is not in the plan's table of foundation entries, so no slice rewrites it. Named for the review of the whole change; no change is asked of this slice.

##### reports/review-s810-report.md

**M-1 — the comment of `withNoReturn` says what the game does not do** — `tests/balance/check-map.test.mjs:23-36` and `tests/balance/cli.test.mjs:57-70`: "a renewal of one use longer than any run, so no spent use returns in it". With the renewal frozen at load (I-2), a use that a death of the full-start loop spends returns after the built 240 minutes inside the run; only the spent start sees no return. The preconditions still hold (the spent start has no use, the full start has three), and they hold after I-2 is fixed too, when the comment becomes true. Fixed with I-2, or the comment narrowed to the spent start.

**M-2 — `oneLeft` is described as "the clock stopped"** — `tests/sim/catch-up.test.mjs:52-55`: the fixture sets 2 uses spent and the next return at minute 10 000 after the save, a running clock, and a state no play reaches (a next return later than the save time plus one renewal). The old `notReadyUntil(S + 10_000 * MIN)` did the same, so the fixture is acceptable (the executor's concern 1): it isolates "one use left for two deaths" from a return inside the span. Only the word "stopped" is wrong.

**M-3 — the save-and-load case of `death.test.mjs` loads a state no game function made** — `tests/sim/death.test.mjs:246-271` quotes D-386 "The load of a saved game state admits every game state the game's own functions make", but saves `usedUp(team(), ...)`, three uses spent by hand; the base case saved the state a settled death left. Three settled deaths (100, 200 minutes apart) reach the same stock through the game's functions, as my probe of the rules shows. The return after the load is tested well; the quoted sentence is held more weakly.

**M-4 — the catch-up no longer checks the clock started anew after the stock filled** — `tests/sim/catch-up.test.mjs:416-428` lost its second death (the executor's concern 2: the removal is justified, the second death is now covered). The relation case at `:491-500` checks the generation and the run number at minute 600, but neither case checks the uses and the clock after the second death at minute 486 (the stock full at 483 and the clock stopped, then one use spent and the clock started at 486 + 240). `tests/sim/team.test.mjs` holds the rule at the level of one death; an assertion in the catch-up would hold it where the earning loop settles it.

**M-5 — wrapping** — `balance/check-map.mjs:4` is a 140-character comment line in a header wrapped at about 100, and `.claude/skills/loop2-balance/SKILL.md:99` (and its copy) is a line longer than the wrapping of its paragraph. No check reads either.

**M-6 — leftover names of the one resurrection in test code** — `tests/sim/loop.test.mjs:1401-1420` keeps the loop variable `readyAt` for the moment of the next return; `tests/sim/death.test.mjs:95` and `:103` keep "ready"/"readiness" in the titles of two `resurrection-renewal` cases. The plan accepts "ready" as "with a use left" for the player descriptions; in these titles it reads well enough.

##### reports/review-s810-fix-report.md

**M-1 — the minute length stands in two instrument files** — `balance/campaign.mjs:361` writes `BALANCE.loopMinuteRealSeconds * MS_PER_SECOND`, the same thing `balance/loop.mjs:28` names `MS_PER_LOOP_MINUTE` (not exported), which `guidelines/coding-balance-instrument.md` ("Jedno miejsce wspólnej rzeczy") asks to keep in one place. Fixing N-1 by importing it from `balance/loop.mjs` settles both.

**M-2 — no case counts completions alongside covered deaths** — both new cases of `tests/balance/campaign.test.mjs` have 0 completions, so the new count of completions (the loop's `completed` counter of the last state with the loop alive) is held only by my comparison probe and the existing relations of the campaign tests, not by a case with completions and covered deaths in one return.

**M-3 — the fix edits a file another slice owns** — `tests/view/account-screen.test.mjs:1897-1899` (the versions) is part of Slice 18's Goal ("the version of the saved shape is 8", `plan.md:618`). The edit is right and makes 130 of 133 cases pass; Slice 18's executor should know it is done.

##### reports/correction-1-review-report.md

**m-1 — a window whose death spent more uses than the team now holds is refused at a count between the two** — `src/browser/sim/saved-game.ts:839-840` checks the settlement's `usesSpent` against the new count on its own. A game can hold an open end-of-run window whose death spent the third use while the team's stored count is lower: an earning loop's death settled later, after uses returned, stores the count `usesAt` gives (for example 2). Lowering the count to 2 then refuses that save, though the team has 2 spent. My probe: such a document (settlement 3, team 2) at count 2 — `shape`. Reading "zużytych" of the remark as the uses spent the save records, the settlement's included, the refusal follows the rule; reading it as the team's current count, it does not. Refusing is also the only answer without a clamp, since the window would say "uses left" of 2 − 3. The case the remark names (a lowering from 3 to 1 with the window after the first death) loads. For the orchestrator to put to the human if the stricter reading was meant.

**m-2 — the plan and the frozen task still speak of the uses left in the settlement** — `plan.md:278`, `:283`, `:323`, `:523`, `:529`, `:621`, `:644` and the task's To do 3 ("rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały") describe the old field; remark 3 authorizes the change. Slice 14 (the window's line) and Slice 18 need their passages read as "the data's count less `usesSpent`", and the return step needs to record the change. One consequence of computing it at display time: after a later change of the count, the window's "Po tej śmierci zostały użycia N z M" is computed against the new count, not the count at the moment of death (question 6: "Liczba użyć mówi o chwili śmierci"); with a raised count from 3 to 5 the first-death window would read 4 of 5 where 2 of 3 were left. The correction report names this cost.

**m-3 — a unit-test file now starts a process** — `tests/balance/campaign.test.mjs:289-321` runs the return in `spawnSync` with a 20-second limit, the only way to stop a synchronous endless loop. `guidelines/testing.md` sets the level by the resources ("unit test ... bez ... procesów"; the integration recipe lists its files by name, `tests/view/memory-limit.test.mjs` among them for the same reason), and this file is not listed there. Polish: list it in the integration recipe, or say why it stays in the unit recipe.

**m-4 — the guideline was edited by hand** — the correction report says `guidelines/coding-saved-game.md` was edited "by hand ... not through the skill `the-way-maintain-coding-guidelines`", which `AGENTS.md` names for that work. The edited sentence is right (above); the process departure is for the record.

##### reports/review-s1114-report.md

**M-1 — slice 11. D-329's binding sentence still gives „Wejdź” a warning.**
`foundations/decisions.md:9883`: „… the warning of a clipped plan, and „Wejdź” and „Puść w pętlę” with their
warnings, …”. Asked to decide whether the sentence is now false: it is not false. The plural reads
collectively, „Puść w pętlę” keeps the sentence of D-326 beside it, and D-287 still puts a sentence under the
inactive buttons of each character; the slice's own rule ("keep each sentence the task does not change word
for word") kept it, and its *Verification* and *Rationale* now list the warnings exactly. It is imprecise,
though: written when „Wejdź” had the mark of D-251, it now lets a reader look for a warning under „Wejdź”,
and Slice 15, which removes that warning from the code, reads D-329. Since this task already changes D-329,
rewording the phrase to name only what stands (for example „„Wejdź” and „Puść w pętlę” with „Pętla nic nie
zarobi do skrzynki” beside it”, as the *Verification* says) costs one sentence at the return step. Leaving
it costs nothing in the code today. Not blocking.

**M-2 — slices 12 and 14. Test names and comments still say "ready" or "renewal" of the old single resurrection.**
`tests/view/end-window-game.test.mjs:1160` and `:1162` („…no renewal line where the resurrection was ready”),
`tests/view/end-window.test.mjs:334-335` („where the resurrection was found ready”, „…a first completion that
renewed”), and `tests/view/team-lines.test.mjs`, the case „a clock set back lengthens the time left: the
moment an hour earlier reads 9 godz. 0 min for 8 hours of renewal” (the renewal is 4 hours now; the case's
fixture is a clock set back, so the value holds, the name does not). The assertions are right; the words of
the names mislead a reader about the rule. The settlement kind `resurrectionReady` in the code is a label of
Slice 6 and is not part of this finding.

**M-3 — slice 14. Test-first was not followed as the slice's *Checks* order it.**
The executor writes it made no failing run before the code. I made the run afterwards: the head's
`tests/view/end-window-lines.test.mjs` against the base's `src/browser/view/end-window-lines.ts` (with a stub
export `renewalSpanText`, without which the file does not load) exits 1, 8 pass, 4 fail — exactly the four
cases of the lines (used use and no use left, no practice, the span, the returned use). So the cases do fail
when the behaviour they protect is absent; the departure has no consequence for the code. Recorded so the
cycle's record holds it.

**M-4 — slice 11. D-216's question keeps „what a completion renewed?”.**
`foundations/decisions.md`, heading of D-216. The executor's concern 3. Not false: a first solving that returns
a use renews the stock. The task changes the four lines, not the question. Polish only.

##### reports/review-s1114-fix-report.md

**M-5 — the comment of the fixture says "an hour after the reading".**
`tests/view/clock.test.mjs:615-616`: „the clock runs to the return of the next, an hour after the reading”. The
moment is `T0 + 2 h` and the reading `T0 + 61 s`, so the return stands about two hours after the reading. The
value and the assertion are right; only the words are off. No consequence for the test.

No Critical or Important finding in the fix diff. The new D-190 quotation stands in a binding sentence (the
citation check reports nothing in the file).

##### reports/review-s1518-report.md

1. **`tests/view/trip.test.mjs:211-226`, the case "the enter line of a map already solved is cut by the chest, as at any map" (slice 15).**
   - **What is wrong:** `entersLine` takes no solved state. The case passes no input that makes a map solved. So it is the unsolved case at `tests/view/trip.test.mjs:171-208` again, with different numbers.
   - **Why it matters:** its comment says it "Catches a line of a solved map that takes from nowhere". It cannot catch that. The failure it names would sit in `maps-screen.tsx`, which used to pass `null` for a solved map, and this case never runs that code.
   - **What does guard the requirement:** the jsdom case "„Wejdzie: …” is what a send takes from the chest, at an unsolved map and at a solved one alike…" (`tests/view/maps-screen.test.mjs:601-641`), which mounts the screen with `solved(...)` and expects `Wejdzie: patyk 2`, and the type `Chest` (no `null`) on `entersLine` and `sendTake`, which `npm run typecheck` holds.
   - **Who asked for it:** the plan's *Checks* asked for a red case in this file. The executor reported that the case passed at once and that the real red was the maps-screen case.
   - **Evidence:** `src/browser/view/trip-lines.ts:23-30`, signature `entersLine(plan, chest, capacity, map)`. The guideline `guidelines/testing.md` "Testy bez dodatkowej ochrony" says a duplicate case may bring no new proof.
   - **Remedy (optional):** remove the case, or rewrite its comment so it claims only what it checks. Nothing here blocks.

2. **`guidelines/styleguide-browser-view.md:679` and `tests/view/world-area.test.mjs:277` (slices 15 and 17), polish.**
   - In the styleguide, line 679 („Puść w pętlę” zwykłym przyciskiem, a obok „Pętla nic nie zarobi do skrzynki” w `warning`, gdy) was not rewrapped after the line about the warning was removed. It runs to about 100 characters, where the paragraph wraps at about 78.
   - In `world-area.test.mjs`, the constant `notReady` still names the old idea of a resurrection "not ready". The comment above it now speaks of "no use of the resurrection left".
   - Neither changes what a reader or the code does.
