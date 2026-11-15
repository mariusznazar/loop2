# Report — executor of slice 28 (trip plan and carried items)

**Status:** done with concerns (the concerns are the R3 remarks below and two judgments the reviewer may weigh; no check failed)

## Commits (base `403660243b887cc078ad0e234d559f32667b6d1d`)

- `d2cc2c2d` test: 90 lines `decision:` in 15 files (0 removed)
- `fa7e5660` docs: *Verification* of D-179, D-180, D-181, D-182, D-184, D-185, D-186, D-187, D-188, D-189, D-307 (`foundations/decisions.md` +73 / −19)
- `64d65845` test: 4 more lines found by the own-work check (`tests/sim/run-record.test.mjs`, `tests/sim/trip.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/trip.test.mjs`, +4)

Author address `mariusznn@gmail.com` (same as the branch's earlier commits).

Files changed over the slice (`git diff --numstat 4036624..HEAD`): `foundations/decisions.md` 73/19; `tests/sim/trip.test.mjs` 27/0; `tests/view/trip-plan.test.mjs` 14/0; `tests/view/trip.test.mjs` 12/0; `tests/sim/loop.test.mjs` 10/0; `tests/view/maps-screen.test.mjs` 6/0; `tests/view/program-panel.test.mjs` 6/0; `tests/view/end-window.test.mjs` 4/0; `tests/view/world-area.test.mjs` 3/0; `tests/view/headquarters-screen.test.mjs` 2/0; `tests/view/end-window-game.test.mjs` 2/0; `tests/view/run-header.test.mjs` 2/0; `tests/view/end-window-lines.test.mjs` 1/0; `tests/view/react-controls.test.mjs` 1/0; `tests/sim/death.test.mjs` 1/0; `tests/sim/catch-up.test.mjs` 1/0; `tests/sim/run-record.test.mjs` 1/0; `tests/view/account-screen.test.mjs` 1/0. 94 lines `decision:` of the slice's decisions in all. No test code, name or assertion changed; no mention of a decision number removed.

## Files beyond the slice's *Change* (item 5), one line each

- `tests/view/end-window-lines.test.mjs` (browser-view): D-185 line; focused run passed.
- `tests/view/end-window-game.test.mjs` (browser-view): two D-185 lines; focused run passed.
- `tests/view/run-header.test.mjs` (browser-view): D-179, D-188 lines; focused run passed.
- `tests/view/world-area.test.mjs` (browser-view): D-186 lines; focused run passed.
- `tests/view/program-panel.test.mjs` (browser-view): D-179, D-180, D-182, D-307 lines; focused run passed.
- `tests/view/react-controls.test.mjs` (browser-view): D-181 line; focused run passed.
- `tests/view/account-screen.test.mjs` (browser-view): D-189 line; focused run passed.
- `tests/sim/loop.test.mjs` (simulation): D-189 lines; focused run passed.
- `tests/sim/death.test.mjs` (simulation): D-189 line; focused run passed.
- `tests/sim/catch-up.test.mjs` (simulation): D-189 line; focused run passed.
- `tests/sim/run-record.test.mjs` (simulation): D-189 line; focused run passed.

The browser-view guideline `guidelines/styleguide-browser-view.md` is in my *Read*; I did not read it whole (see Unread material). A comment line changes nothing it rules.

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` (base) — 0; `0 errors`; listed D-181, D-182, D-184, D-185, D-186, D-188 (and D-216, D-217, D-218, D-220) as held by nothing.
- Same, after the edits, first run — 1: `foundations/decisions.md:4049: the entry lacks *Origin*, *Rationale*` — my edit of D-186 had dropped its `- **Origin:** none` line and the start of *Rationale*; restored word for word. Rerun — 0, `0 errors`; listed only D-216, D-217, D-218, D-220 (other slices). Final run after the last commit's content — 0, `0 errors`, none of D-179…D-189, D-307 listed.
- Positive control that the check reads the quotes: one quote in `tests/sim/death.test.mjs` altered ("FIRST") — the check reported `tests/sim/death.test.mjs:294: the quotation stands in no binding sentence of D-189`; file restored from a copy, `git diff --stat` shows only the slice's one line.
- `git diff -U0 4036624 -- foundations/decisions.md`: 11 hunks, every one in the *Verification* field of D-179, D-180, D-181, D-182, D-184, D-185, D-186, D-187, D-188, D-189 or D-307 (the hunk at 7873 is D-307). Also checked mechanically: the log at the base and now, each with every *Verification* field removed, compared with `cmp` — identical.
- `npm test -- <file>`, one run per file — all exit 0: `tests/sim/trip.test.mjs` (29 pass, run after the last commit's content), `tests/view/trip-plan.test.mjs` (11), `tests/view/trip.test.mjs` (9, after the last content), `tests/view/maps-screen.test.mjs` (21), `tests/view/headquarters-screen.test.mjs` (26), `tests/view/end-window.test.mjs` (14), `tests/view/end-window-lines.test.mjs` (11), `tests/view/end-window-game.test.mjs` (27), `tests/view/run-header.test.mjs` (24), `tests/view/world-area.test.mjs` (22), `tests/view/program-panel.test.mjs` (53), `tests/view/react-controls.test.mjs` (56), `tests/sim/loop.test.mjs` (46), `tests/sim/death.test.mjs` (33), `tests/sim/catch-up.test.mjs` (33), `tests/sim/run-record.test.mjs` (15), `tests/view/account-screen.test.mjs` (131). `tests/sim/trip.test.mjs` and `tests/view/trip.test.mjs` were also run, exit 0, before the last commit's one line each.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` on all 17 changed `.mjs` files — 0 ("All matched files use Prettier code style!").
- Not run: the full gate `npm test` without a file (the cycle's, not a slice's). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; they fail at the base per the handoff.

## Own-work check

- Requirement most likely missed: "every test that holds one of its binding sentences carries a line" — a test that holds a sentence while my search by number and by the cases I read missed it.
- Check: a script listed every test case under `tests/` whose body holds a term of these decisions (screen texts „Wyniesie”, „Do skrzynki”, „przycięty”, „Wejdzie”, „Skrzynka ”, „Plan wyprawy”, „Wpisz liczbę całkowitą”, the functions `rehearsalMark`, `takeLoopPractice`, `stopLoop`, `takeFromNowhere`, `sendTake`, `clippedTake`, `tripLoot`, `tripEntryCut`, `tripWarning`, `entersLine`, `tripTexts`, `tripCount`, `readTripCount`, `waitingPractice`, the fields `carryIn`, `carryOut`, `solvedMapRun`, the classes `trip-plan`, `rehearsal-mark`) and no line of these decisions.
- What it showed: 33 cases. I read each; 4 hold a sentence and got lines in `64d65845` (`tests/sim/run-record.test.mjs` "a map run of a solved map keeps what it took from nowhere…" — D-189 equipment from nowhere; `tests/view/account-screen.test.mjs` "the mark of a rehearsal the loop cannot repeat…" — D-189 mark; `tests/sim/trip.test.mjs` "the preview of a marked run is empty…" and `tests/view/trip.test.mjs` "the six screens of a map run…" — D-186 what the preview gives). The other 29 hold only an invariant's part (e.g. `sendTake at an unsolved map …`, `practice taken is paid once` held in that part by `loop-practice-payment`), another decision (D-190 death, D-214 load of the mark, D-246 full-chest line, D-327/D-328 caps on the card in `tests/view/maps-screen.test.mjs:396` and `tests/view/map-lines.test.mjs:233`), or nothing of these decisions.

## Rows (item 6)

Line numbers are as at `64d65845`; each line stands at the top of the case named.

**D-179** — *Verification:* pair removed; `tests:` added; `invariants: trip-transfer` kept.
- Held in part by tests: "The trip plan is a field of the program…" — `tests/sim/trip.test.mjs:150` "editing or discarding only a trip plan preserves solving progress and rule counts", `tests/sim/trip.test.mjs:331` "saved plan edits stay out of the copy; saves and overwrite detection include both lists", `tests/view/program-panel.test.mjs:264` "an edit of the trip plan on Programy goes to the program shown…". "The backpack is the cap on both sides…" (map's own cap down to zero; a plan over the entry cap enters cut; the player told beforehand) — `tests/sim/trip.test.mjs:212` "entry caps, including zero, affect equipment independently of exit caps", `:234` "exit spends chest room and map capacity in snapshot order, with partial rows", `:424` "zero map entry cap still allows gathering…", `tests/view/maps-screen.test.mjs:625` "a map that cuts the plan shows the clipped-plan line and what enters cut", `tests/view/end-window.test.mjs:602` "the warning of a cut trip plan stands between „Restart” and „Zakończ”…", `tests/view/run-header.test.mjs:352` "the warning of a cut trip plan follows the current copy's take list".
- Held by invariants: trip-transfer — both lists bound at the start, the frozen bring snapshot, only what it names going to the chest, the whole second sentence (reality cuts down, in list order, under each budget), the backpack as the cap on both sides.
- Held by nothing: none.

**D-180** — *Verification:* pair rewritten for the part nothing holds; `tests:` added.
- Sentence 1 ("The screen Programy shows a section „Plan wyprawy”…") in part: `tests/view/program-panel.test.mjs:216` "Programy holds the trip plan between the program's name and its rules…", `:265` "an edit of the trip plan on Programy…", `tests/view/trip-plan.test.mjs:71` "an empty trip plan folds to the line…", `:90` "a folded line shows each position's item icon and count, with Zabierz and Wynieś, and no list", `:138` "a click on the line unfolds the lists…". Together they hold it whole.
- Sentence 2 ("Each position holds an item select list…") in part: `tests/view/trip-plan.test.mjs:139` (unfold), `:165` "each list offers the items it does not hold…", `:224` "Dodaj przedmiot commits the list…", `:247` "a count typed and left commits it…", `:293` "the item select commits the position…", `:320` "↑ and ↓ move a position…", `:407` "Usuń is the destructive button…".
- Sentence 3 ("The card of a map shows what of the plan enters") whole: `tests/view/trip.test.mjs:279` "the enter line gives what a send takes…", `tests/view/maps-screen.test.mjs:480` "the characters stand in the order of their creation…", `:583` "„Wejdzie: …” is what a send takes…", `:626` "a map that cuts the plan…".
- Held by invariants: none.
- Held by nothing: the visible texts „↑”, „↓” and „Dodaj przedmiot” and the add button's place below each list (the tests find these controls by `aria-label`).

**D-181** — *Verification:* pair added for the part nothing holds; `tests:` added.
- Sentence 1 ("The game accepts an item once on each trip list…") whole: `tests/sim/trip.test.mjs:479` "editing a program accepts one piece on each trip list", `:496` "program validation rejects duplicate items and bad counts…", `tests/view/trip.test.mjs:63` "trip input rejects invalid counts and offers each list's unused items…", `tests/view/trip-plan.test.mjs:166`, `:225`.
- Sentence 2 ("A position's count is a safe integer from 1 up…") in part: `tests/sim/trip.test.mjs:480`, `:497`, `tests/view/trip.test.mjs:64` (the range, the bound, a large count accepted); `tests/view/trip-plan.test.mjs:248` "a count typed and left commits it; a count that is no whole number from 1 keeps the previous one and shows the message", `tests/view/react-controls.test.mjs:1285` "a number field under the trip count rule commits nothing…" (invalid entry kept visible, nothing committed, the message).
- Held by invariants: none.
- Held by nothing: the role `warning` of the field's frame and of the message.

**D-182** — *Verification:* pair added for the part nothing holds; `tests:` added.
- In part: "a newly created program" — `tests/sim/trip.test.mjs:498` "program validation rejects duplicate items…" (`createProgram`'s new program has both lists empty), `tests/view/program-panel.test.mjs:266` "an edit of the trip plan on Programy…" (the created program shows „Plan wyprawy: pusty”).
- Held by invariants: none.
- Held by nothing: the program of a new game (no test reads `newGame()`'s trip plan; `tests/view/program-panel.test.mjs:216` sets its own program).

**D-183** — not in the slice's list of twelve but in its group; its sentences are held whole by the invariant `trip-run-end`; *Verification* unchanged (`invariants: trip-run-end.`), no line added (R1).

**D-184** — *Verification:* `none` became `tests:` (held whole).
- Whole: `tests/view/headquarters-screen.test.mjs:228` "the chest heading reads the pieces and the capacity, its lines follow the items, and an empty chest says so under „Skrzynka 0/60”"; in part `:131` "the screen holds its heading Siedziba, then the sections…".

**D-185** — *Verification:* pair added for the part nothing holds; `tests:` added.
- In part: `tests/view/trip.test.mjs:133` "completion keeps actual deposit text while later editing cannot change it" (both texts), `tests/view/end-window-lines.test.mjs:131` "the cost line after a completion is the deposit frozen at the completion…" (both texts in `text-secondary`), `tests/view/end-window.test.mjs:278` "a streak that meets the map's condition is drawn in positive…", `:328` "the window shows the line of a death with no practice, and the renewal line after the deposit line…", `tests/view/end-window-game.test.mjs:1038` "a reload of the screen of an ended map run opens the window…", `:1111` "a reload… holds the line of a death with no practice and of a renewal…" (the line in the section of the end-of-run window saying what the end gave).
- Held by invariants: none.
- Held by nothing: "until „Restart” or „Zakończ”".

**D-186** — *Verification:* pair added for the part nothing holds; `tests:` added.
- Sentence 1 in part: `tests/view/trip.test.mjs:98` "preview follows frozen inventory and available chest room, even after the copy changes", `:391` "the six screens of a map run…", `tests/view/world-area.test.mjs:205` "the world area stands from the top…" (below the backpack), `tests/sim/trip.test.mjs:235` "exit spends chest room and map capacity…" and `:727` "the preview of a marked run is empty…" (`tripLoot`, which `tripTexts` in `src/browser/view/trip-lines.ts` shows: clipping by backpack, free room, exit cap).
- Sentence 2 whole: `tests/view/trip.test.mjs:99`, `:134` "completion keeps actual deposit text…", `:392`, `tests/view/world-area.test.mjs:206`, `:450` "a death that used a resurrection shows no line of its settlement and no deposit and no preview…".
- Held by invariants: none.
- Held by nothing: the role `text-secondary` of the line.

**D-187** — *Verification:* `tests:` added after `invariants: trip-transfer.` (held whole; it had no pair).
- Sentence 1 whole: `tests/sim/trip.test.mjs:213` "entry caps, including zero…", `:236` "exit spends chest room and map capacity…", `:425` "zero map entry cap still allows gathering…".
- Sentence 2: the clipping at entry and completion by `trip-transfer`; "gathering during the run is bounded by the character's carrying capacity, which the map cap leaves unchanged" by `tests/sim/trip.test.mjs:426` (same case).
- Held by nothing: none.

**D-188** — *Verification:* pair added for the part nothing holds; `tests:` added.
- Sentence 1 in part: `tests/sim/trip.test.mjs:272` "warnings compare desired pieces and carrying capacity to the map, ignoring stock", `tests/view/trip.test.mjs:157` "map warning appears below desired load and backpack capacity, including a zero map cap", `tests/view/maps-screen.test.mjs:627` "a map that cuts the plan shows the clipped-plan line and what enters cut".
- Sentence 2 whole: `tests/view/end-window.test.mjs:603`, `tests/view/run-header.test.mjs:353` (beside „Restart”, from the current copy), `tests/sim/trip.test.mjs:273`, `tests/view/trip.test.mjs:158` (absent where capacity alone clips).
- Held by invariants: none.
- Held by nothing: the role `warning` of the line (the tests read the class `trip-warning`, not a role).

**D-189** — *Verification:* pair removed (held whole by tests and invariants); `tests:` added; the four invariants kept.
- Sentence 1 in part: first solve pays practice and loot — `tests/sim/trip.test.mjs:72` "a bought branch acts on entry equipment and completion pays practice and loot once"; a death pays no practice — `tests/sim/death.test.mjs:294` "the practice a dying character gathered reaches no skill…", `tests/sim/loop.test.mjs:736` "a death with a resurrection ready is settled…", `:903` "stopping a loop whose map run ended in death…", `:1017` "taking the practice while the map run has ended in death…", `:1073` "after a death a resurrection covers the loop waits for none…", `:1333` "a death of a character with no practice takes the carried items only…".
- Sentence 2 in part: practice gathered at the loop — `tests/sim/loop.test.mjs:667` "a completion deposits the bring list's clipped loot… adds its practice to the loop…", `tests/sim/catch-up.test.mjs:564` "each character's line holds its own change of the chest…, and the practice stays at the loop"; „Odbierz” — `tests/sim/loop.test.mjs:924` "taking the practice pays what the loop and its map run going on gathered…", `:971` "practice taken is paid once…"; the stop — `:857` "stopping a loop pays the loop's practice and the map run's…", `:904`.
- Sentence 3 in part: equipment from nowhere, cut only by capacity and the map's cap — `tests/sim/trip.test.mjs:73`, `:360` "switching programs retains the entry snapshot…", `:583`, `:617`, `:641`, `:794`, `:805`, `:817`, `tests/sim/run-record.test.mjs:317`; the mark — `tests/view/trip.test.mjs:175` "the mark shows at a solved map when a take entry cut by capacity and the entry cap exceeds the chest, and only then", `tests/view/maps-screen.test.mjs:739` "a rehearsal the loop cannot repeat is marked under „Wejdź” at a solved map alone", `tests/view/account-screen.test.mjs:3016`.
- Held by invariants: `solved-map-manual-run` (a manual run of a solved map pays nothing and takes nothing from the chest; once per map whichever character), `trip-transfer` and `trip-run-end` (loot only on completion, a death returns no loot), `loop-practice-payment` (never paid twice).
- Held by nothing: none.

**D-307** — *Verification:* pair removed; `tests:` added (held whole).
- Whole: `tests/view/program-panel.test.mjs:217` "Programy holds the trip plan between…" („Plan wyprawy: pusty” on Programy), `:267`, `tests/view/trip-plan.test.mjs:72` "an empty trip plan folds to the line „Plan wyprawy: pusty” with no icon and no list".

## Pairs added or rewritten (for the human at the merge)

- D-180 (rewritten): "For the texts of the move buttons and the text and place of the add button, an agent compares a change with the part no test holds:" complies: the move buttons of a position reading „↑” and „↓”, and „Dodaj przedmiot” standing below the last position of each list; violates: „Dodaj przedmiot” standing above its list, or the move buttons of a position reading words in place of „↑” and „↓”.
- D-181 (added): "For the role of the field and its message…" complies: the frame of the field and the message „Wpisz liczbę całkowitą od 1.” in the role `warning` while the entry is invalid; violates: the message of an invalid count in `text-secondary`, or the frame of the field in its usual role while the message stands.
- D-182 (added): "For the program of a new game…" complies: the program of a new game showing „Plan wyprawy: pusty” on Programy; violates: a new game whose program takes sticks or berries on its take list.
- D-185 (added): "For how long the line stands…" complies: the line gone once „Restart” starts the next map run or „Zakończ” ends the map run; violates: the line of the last completion still standing on the screen of the map run that „Restart” started.
- D-186 (added): "For the role of the line…" complies: „Wyniesie: patyk 3” in `text-secondary` below the backpack; violates: the line in `text`, the role of the practice record beside it.
- D-188 (added): "For the role of the line…" complies: the line in `warning` on the card of a map and beside „Restart”; violates: the line in `text-secondary` or in `danger`.

## Remarks on the log's wording (R3; nothing changed)

- D-189, sentence 1: "pays practice and loot once per map for the player, whichever character completes it". `tests/sim/trip.test.mjs` "a run started before another character solved the map still pays practice and deposits at its completion" shows a second payment for one map when two manual runs on a map unsolved at their starts overlap; the *Rationale* ("What decides … is the state of the map when the map run starts") settles it, the binding sentence does not say it. I gave that case no D-189 line.
- D-189, sentence 3: "the list of maps marks it" — the mark stands under „Wejdź” at a character in „Kto idzie” on the card of a map (`src/browser/view/trip-lines.ts` `rehearsalMark`, tests at `tests/view/maps-screen.test.mjs:739`), not in the list of maps on the left of Mapy (D-325). I judged the tests of the card's mark as holding that clause.
- D-180, sentence 1: "folded to a line of icons" — an empty plan's line holds no icon („Plan wyprawy: pusty”, D-307); no conflict, D-307 narrows it.

## Choices made, with the way rejected

- Placement of lines: inside the test body at its top, after the `// invariant:` and `// decision:` lines already there, as earlier slices did (e.g. `tests/sim/trip.test.mjs` at the base); in `tests/sim/loop.test.mjs` and `tests/sim/catch-up.test.mjs`, where `// invariant:` stands above the test, the line still goes inside the body, as the file's existing `decision:` lines do. Rejected: above the `test(` line — differs from the form already in these files. Cost if wrong: a move of comment lines.
- Quotes start at the sentence start and run to its end (D-181 sentence 2 stops at "…clipping of the plan" where the test holds only the range); a test holding only a later clause of a sentence (e.g. `tests/sim/trip.test.mjs:426` for D-187's gathering clause, `:273` for D-188's absence clause) still quotes from the sentence start, as the template requires; the *Verification* words say which part.
- Under R1 no line for parts the invariants state: D-179's second sentence, D-183 whole, D-187's clipping at entry and completion, D-189's no-pay and no-take of a solved map's run, its loot rules and the never-twice rule.
- Not marked, judged as holding another rule: the crafted-document cases of `tests/sim/saved-game.test.mjs` (a trip count of 0, an item twice, beyond the safe integers) — they hold the load's refusal (`save-version`, a trust boundary), not what the game accepts in its editor; the card's display of caps (`tests/view/maps-screen.test.mjs:396`, `tests/view/map-lines.test.mjs:233`) — D-327/D-328, not D-187's data sentence; `tests/view/headquarters-screen.test.mjs:439` (the report's practice line, D-246). Cost if wrong: a few lines a reviewer adds.
- D-179 "The trip plan is a field of the program": many tests hold it in passing (any test that saves or edits a program with a trip plan); I marked the three whose purpose is the trip plan inside the program. A reviewer may want more.

## Reaches beyond the dispatch

- `src/browser/view/trip-lines.ts` and `src/browser/sim/trip.ts` (read) — to judge which sim functions the view lines show (`tripLoot` drives both the deposit and the preview; `clippedTake` is the cut of a solved map's take and of the mark).
- `src/browser/view/trip-plan.tsx` (grep of the texts „↑”, „↓”, „Usuń”, „Dodaj przedmiot”) — to confirm the D-180 pair describes the code as it is.
- `foundations/invariants.md` `trip-plan-progress` (its *Derives from*: D-93, D-131, D-136) — to apply R1 to `tests/sim/trip.test.mjs:150`.
- Test files outside *Change* listed above, read by case.
- `the author's rules on writing scripts, outside the repository` and `git.md` (the user's rules for scripts and commits).

## Working copies

All stood in `.runs/executor-28/` of the worktree: the insertion script `insert.py`, the coverage script `coverage.py`, the stripping script `strip.py`, the foundation-check outputs, the test logs, a backup copy of `tests/sim/death.test.mjs` for the positive control. The directory was removed before return; nothing kept in `reports/` beyond this report.

## Unread material

- `guidelines/coding.md`: read only by search (comment and Prettier rules, lines 32-35 and 88-104); not whole.
- `guidelines/styleguide-browser-view.md`: read only by search for comment rules; not whole (986 lines).
- `foundations/part_map.md`: not read; the part of each file taken from the handoff's list (`tests/view/**` browser-view) and `guidelines/testing.md`.
- `foundations/glossary.md`: read only by search ("trip plan", "headquarters", lines 28, 89, 199-201).
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and `task-frozen.md` passages: read as copied in the handoff, plus `task-frozen.md:25-105` read directly.
- `foundations/decisions.md` D-73 and D-82: read only as quoted in `task-frozen.md` ("Decisions in play"), not as entries in the log.
- `.the-way/elements/decisions/template.md`: read 105-130, 160-168, 218-260 (the named ranges at their current place).
- `guidelines/testing.md`: read whole.

## Searches not found or unclear

- No test reads the trip plan of a new game's program (`newGame().programs[0].program.tripPlan` and the line „Plan wyprawy: pusty” on a fresh game): searched `tests/` for `newGame().programs`, `programs[0].program.tripPlan`, `pusty`, `tripPlan: { take: [], bring: [] }`. Hence the D-182 pair.
- No test checks the role of „Wyniesie: …”, of „Plan wyprawy wejdzie przycięty…” or of the trip count's field and message: searched for `trip-result`, `trip-warning`, `text-secondary`, `warning` near them. Hence the D-186, D-188 and D-181 pairs.
- No test checks the visible texts „↑”, „↓”, „Dodaj przedmiot” of the trip plan (only `aria-label`s): searched `tests/view/trip-plan.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/account-screen.test.mjs`. Hence the D-180 pair.
- Unclear: whether "until „Restart” or „Zakończ”" of D-185 is held by the end-of-run window's own tests (`tests/view/end-window.test.mjs` "nothing is drawn for a state without an ended map run", which is D-368's); I judged it not held for this line and gave it a pair.
- The first per-file run logged `tests/sim/trip.test.mjs` and `tests/view/trip.test.mjs` to one file name, so the sim file's count was overwritten; both exited 0, and the sim file was run again on its own (29 pass).
