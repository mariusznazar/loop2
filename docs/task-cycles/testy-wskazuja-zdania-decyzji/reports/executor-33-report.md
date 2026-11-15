# Report — executor of slice 33 (earning loop and time away on the screens)

**Status:** done with concerns (the concerns are judgment calls named under "Choices", and the
partial reading under "Unread material"; nothing failed).

## Commits (base `4d74b04a72ebdb6c3cd9f2983ec751f00f88d5b9`)

- `cdd858e4` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the clock of an earning loop, its start, what the player sees of it, „Zatrzymaj”, the report after being away and the mark of a rehearsal the earning loop cannot repeat with lines decision:
- `2d7daafe` docs: :memo: name the tests of D-242, D-243, D-244, D-245, D-246 and D-251, drop the pair of D-243, which its tests hold whole, and rewrite the pair of D-242, D-244, D-245, D-246 and D-251 only for the part no invariant and no test holds

Author address of both: `mariusznn@gmail.com` (`git log -1 --format=%ae`), as the earlier commits.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 74 | 54 |
| `tests/sim/catch-up.test.mjs` (beyond *Change*) | 27 | 0 |
| `tests/sim/loop.test.mjs` (beyond *Change*) | 15 | 0 |
| `tests/view/account-screen.test.mjs` (beyond *Change*) | 24 | 0 |
| `tests/view/away-report.test.mjs` | 25 | 0 |
| `tests/view/character-screen.test.mjs` (beyond *Change*) | 3 | 0 |
| `tests/view/clock.test.mjs` | 10 | 0 |
| `tests/view/headquarters-screen.test.mjs` | 14 | 0 |
| `tests/view/maps-screen.test.mjs` | 6 | 0 |
| `tests/view/team-lines.test.mjs` | 2 | 0 |
| `tests/view/trip.test.mjs` (beyond *Change*) | 1 | 0 |

Only lines `// decision:` were added in tests (126 lines in 84 test cases), each placed at the top of
the case's body after the lines `decision:` already standing there, as earlier slices did. No test's
code, name or assertion changed; no mention of a decision number was removed.

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:
- `tests/sim/catch-up.test.mjs` — simulation; the open game, the catch-up and the report data of D-242 and D-246; focused run below.
- `tests/sim/loop.test.mjs` — simulation; the start, the stop and the stopped line of D-243, D-244, D-245, and one open-game stop line of D-246; focused run below.
- `tests/view/account-screen.test.mjs` — browser-view; the page-level cases of D-243, D-244, D-245, D-246, D-251; focused run below.
- `tests/view/character-screen.test.mjs` — browser-view; the screen Postać case of D-244 and D-245; focused run below.
- `tests/view/trip.test.mjs` — browser-view; the clipped measure of the mark of D-251; focused run below.
The browser-view guidelines (`guidelines/styleguide-browser-view.md`) were in my *Read* already; see "Unread material" for how far I read them.

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base — exit 0, `0 errors`, no decision listed `held by nothing` (none of mine was listed at the base either: each had a pair).
- The same after the lines, after the log edits and on the committed HEAD `2d7daafe` — exit 0, `0 errors`, nothing listed `held by nothing`; every quotation passes the script's check of a sentence start.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` for each of the ten changed `.mjs` files — exit 0 each (run after the final edits).
- `npm test -- <file>`, one run per file, after the final edits, all exit 0: `tests/view/clock.test.mjs` (27 pass, 0 fail), `tests/view/away-report.test.mjs` (17/0), `tests/view/headquarters-screen.test.mjs` (26/0), `tests/view/maps-screen.test.mjs` (21/0), `tests/view/team-lines.test.mjs` (16/0), `tests/sim/catch-up.test.mjs` (33/0), `tests/sim/loop.test.mjs` (46/0), `tests/view/character-screen.test.mjs` (7/0), `tests/view/account-screen.test.mjs` (131/0), `tests/view/trip.test.mjs` (9/0). An earlier round of the same ten runs, before four lines were added in the own-work check, also exited 0 each; all runs had finished before I returned.
- `git diff -U0 4d74b04a -- foundations/decisions.md`, read: hunks at 5882 (D-242), 5931 (D-243), 5954 (D-244), 5977 (D-245), 6025 (D-246), 6201 and 6203 (D-251); every changed line lies in the *Verification* field of one of my six decisions.
- Not run: the full gate `npm test` without a file — not mine to run (handoff, method section 3). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff names them failing at the base with `FileNotFoundError`.

## The decisions, one row each

Sentences are numbered as they stand in the entry (a sentence ends at a full stop followed by a space).
D-246 splits into five so: S1 "After being away …stopnie.", S2 "Teraz to pokolenie {n}.”, then the others …catch-up passed.", S3 "The practice waiting …", S4 "An earning loop a death stops in the open game …stopnie.", S5 "Teraz to pokolenie {n}.”, the title reading …". Line numbers below are those at HEAD, of the line `test(`.

### D-242 — Which clock drives an earning loop?

- **S1** (browser's date, one loop clock apart from the game state, whole minutes, a reading before it): held in part by tests, for the open game — `tests/view/clock.test.mjs:537` „a reading passes the manual run, then the loops, …”, `:580` „in a reading that ends a loop's map run in a death and the manual run in another, …”, `:626` „a loop's end is settled at the minute's own moment, …”, `:646` „minutes of a loop are never passed twice when apply reads the clock again”, `:676` „a date turned back passes nothing and the loop clock then runs from the date read”, `:697` „a loop started by the clock gets a full first minute, …”; `tests/sim/catch-up.test.mjs:213` „the span gives whole minutes and the clock's new value, …”, `:282` „a clock turned back before the save time passes nothing, …” (its open-game part), `:305` „with no loop, a save time of null … a clock set to the reading”, `:326` „the open game passes no minute before a whole one, …”.
- **S2** (each minute's real moment; a death settled at it): open game held by `tests/view/clock.test.mjs:580`, `:626`; `tests/sim/catch-up.test.mjs:393` „the moment of a death is the same in one call and in calls split at any minute”, `:895` „in the open game the death earlier in time takes the shared resurrection, …”.
- **S3** (open game minute by minute, team order; the manual run's death and first completion after the loop minutes): held in part by `tests/sim/catch-up.test.mjs:493` „the open game over a span gives the same state and events in calls of any size”, `:534` „the open game passes minute by minute, the characters in the team's order, …”, `:556` „with room in the chest for one, the open game gives it to whoever completes first …”, `:895`; `tests/view/clock.test.mjs:580` (the manual run's death at the reading, after the loop's earlier death).
- **Invariants:** `catch-up-minutes` holds S1 for the catch-up; `catch-up-death-moment` holds S2 for the catch-up. By R1 the invariant-marked catch-up cases `tests/sim/catch-up.test.mjs:258`, `:357`, `:376` and the view case `tests/view/clock.test.mjs:743` got no D-242 line.
- **Held by nothing:** in S3, the first completion of the manual map run that a reading brings settled after the earning loops' game minutes.
- **Verification:** pair rewritten.

### D-243 — How does the player start an earning loop?

- **S1:** `tests/view/maps-screen.test.mjs:477` „the characters stand in the order of their creation, …” (beside „Wejdź”), `:681` „„Wejdź” is the main button at each map, „Puść w pętlę” the plain one at a solved map alone, …”; `tests/view/account-screen.test.mjs:2593` „each act of the player that changes the game state is saved at once, …” (the row „Puść w pętlę”: the list's program 2, at once), `:2716` „a character in a loop shows its line and „Zatrzymaj” …” (no button at a map not solved), `:2886` „„Puść w pętlę” puts the character into a loop at once …”; `tests/sim/loop.test.mjs:227` „the first map run of a loop goes on the program of its row, …”, `:295` „without a program number a loop takes the program of the character's row: …”.
- **S2:** `tests/sim/loop.test.mjs:258` „starting a loop makes its program the one used last and last entered, clears the pick, …”.
- **S3:** `tests/view/maps-screen.test.mjs:779` „a character in an earning loop shows its line and „Zatrzymaj”, its sending buttons stand inactive, …”; `tests/view/account-screen.test.mjs:2716`, `:2886`; `tests/sim/loop.test.mjs:331` „a start the map, the character or the program does not allow returns the very state” (a character already in a loop), `:1150` „a send throws for a character in a loop, …”.
- **Invariants:** none. **Held by nothing:** none.
- **Verification:** pair removed.

### D-244 — What does the player see of an earning loop?

- **S1** (the line on card, screen and „Kto idzie”, with „Zatrzymaj”): in part — `tests/view/team-lines.test.mjs:167` „the line of a character in a loop names the map, the run, its minute and the runs completed”, `tests/view/headquarters-screen.test.mjs:288` „a running loop shows its line with „Zatrzymaj”, …”, `tests/view/character-screen.test.mjs:143` „a running loop shows its line with „Zatrzymaj”, which acts through onStop; …”, `tests/view/maps-screen.test.mjs:779`, `tests/view/account-screen.test.mjs:2716`, `:2886`.
- **S2** (no map of a loop's run opened; counts): in part — `tests/sim/loop.test.mjs:426` „a loop's map run through the first chill leaves … the counts as it found them, …”, `:258` (the start leaves the counts).
- **Invariants:** none.
- **Held by nothing:** the role `text` of the line; the game opening no map of an earning loop's map run, and the map-run view and the program editor standing for a manual map run.
- **Verification:** pair rewritten.

### D-245 — What does „Zatrzymaj” do?

- **S1:** in part — `tests/view/maps-screen.test.mjs:779` (destructive, acts on the click), `tests/view/headquarters-screen.test.mjs:288`, `tests/view/character-screen.test.mjs:143`, `tests/view/account-screen.test.mjs:2593` (the rows „Zatrzymaj”), `:2926` „„Zatrzymaj” stops at once and the row shows „Pętla zatrzymana” …”; `tests/sim/loop.test.mjs:892` „stopping a loop pays the loop's practice and the map run's into the skills, …”, `:926` „stopping a loop that gathered nothing writes an empty sum, …”, `:940` „stopping a loop whose map run ended in death pays only the loop's own practice, …”.
- **S2:** in part — `tests/view/team-lines.test.mjs:189` „the line after a stop lists the practice gathered in the skills' order, …”, `tests/view/headquarters-screen.test.mjs:288`, `tests/view/character-screen.test.mjs:143`, `tests/view/account-screen.test.mjs:2926`, `:2980` „a game built from a state with a stopped loop shows the line …”; `tests/sim/loop.test.mjs:258` (a start drops the line), `:1150` (a send clears it), `:1185` „the states of a loop … and of a stopped loop, load back”.
- **Invariants:** `trip-run-end` holds the carried items lost and the loot out of the chest; `loop-practice-payment` holds that the practice is paid once.
- **Held by nothing:** the role `text-secondary` of the line.
- **Verification:** pair rewritten.

### D-246 — What does the player read after being away?

- **S1:** `tests/view/away-report.test.mjs:72`, `:82`, `:98`, `:186`, `:236`, `:250`; `tests/view/headquarters-screen.test.mjs:338` „a report stands above „Drużyna”, …”, `:393` „„Zamknij” asks the page to close the report; …”; `tests/view/account-screen.test.mjs:3680`, `:3764`; `tests/sim/catch-up.test.mjs:583`, `:640`, `:720`, `:805`, `:870`.
- **S2:** `tests/view/away-report.test.mjs:72`, `:98` (generation), `:135`, `:153`, `:175`, `:186`, `:196`, `:207`, `:220`, `:236`, `:265`; `tests/view/headquarters-screen.test.mjs:338`, `:367`, `:454`, `:550`; `tests/view/account-screen.test.mjs:2182`, `:2209`, `:3680`, `:3717`, `:3792`; `tests/view/clock.test.mjs:743`; `tests/sim/catch-up.test.mjs:556`, `:583`, `:614`, `:640`, `:870`.
- **S3:** `tests/view/away-report.test.mjs:153`, `:175`; `tests/view/headquarters-screen.test.mjs:454`, `:487`, `:535`; `tests/view/account-screen.test.mjs:3792`, `:3846` „the report survives a reload, …”; `tests/sim/catch-up.test.mjs:583`, `:671`, `:683`, `:690`, `:787`.
- **S4:** `tests/view/away-report.test.mjs:110`, `:123`; `tests/view/headquarters-screen.test.mjs:367`; `tests/view/account-screen.test.mjs:3717`; `tests/sim/catch-up.test.mjs:742`, `:764`; `tests/sim/loop.test.mjs:1131` „a loop of a character other than the first that stops in passing writes that character's own generation”.
- **S5:** `tests/view/away-report.test.mjs:72`, `:82`, and the generation at `:110`, `:123`; `tests/view/headquarters-screen.test.mjs:367`; `tests/view/account-screen.test.mjs:3717`, `:3874` „a manual map run hides the report with Siedziba, …”; generation at `tests/sim/loop.test.mjs:1131`.
- **Invariants:** `loop-practice-payment` (practice never paid twice); no sentence of D-246 states it outright.
- **Held by nothing:** the role `text` of the lines of earning loops that went on and the role `warning` of „Skrzynka jest pełna.”; in S1, that a later earning loop of a character whose earning loop „Zatrzymaj” stopped (not a death) adds to that character's open line rather than opening one.
- **Verification:** pair rewritten.

### D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat?

- **S1:** in part — `tests/view/trip.test.mjs:173` „the mark shows at a solved map when a take entry cut by capacity and the entry cap exceeds the chest, and only then”, `tests/view/maps-screen.test.mjs:744` „a rehearsal the loop cannot repeat is marked under „Wejdź” at a solved map alone”, `tests/view/account-screen.test.mjs:3045` „the mark of a rehearsal the loop cannot repeat stands under „Wejdź” …”.
- **Invariants:** none. **Held by nothing:** the role `warning`.
- **Verification:** pair rewritten.

## Pairs added or rewritten (for the human to accept at the merge)

None added; D-243's pair removed. Rewritten, word for word as committed:

**D-242** — "For the first completion of the manual map run that a reading brings, an agent compares a change with the part no invariant and no test holds:
- complies: a reading that passes game minutes of earning loops and brings the first completion of a map by the manual map run settling that completion after those game minutes, at the reading, so a death in those game minutes finds the resurrection as the completion had not yet renewed it
- violates: the first completion of the manual map run settled before the game minutes of the earning loops that the same reading passes"

**D-244** — "For the role of the line and for what the map-run view and the program editor show, an agent compares a change with the part no test holds:
- complies: the line in `text`; the program editor staying on the player's programs and the map-run view on the manual map run while earning loops pass
- violates: a button that opens the map of an earning loop's map run; the map-run view drawing an earning loop's map run; the line in `text-secondary` or `danger`"

**D-245** — "For the role of the line, an agent compares a change with the part no invariant and no test holds:
- complies: the line „Pętla zatrzymana …” in `text-secondary` on the card and the screen of the character
- violates: the line in `text` or `danger`"

**D-246** — "For the roles of the lines that went on and of the sentence of a full chest, and for a later earning loop of a character whose earning loop „Zatrzymaj” stopped, an agent compares a change with the part no invariant and no test holds:
- complies: the lines of earning loops that went on in `text`, and „Skrzynka jest pełna.” in `warning`; „Zatrzymaj” leaving the character's line open, so the next return of a later earning loop of that character adds to it
- violates: „Skrzynka jest pełna.” in `text` or `danger`; a line of an earning loop that went on in `text-secondary`; a later earning loop after „Zatrzymaj” opening a second line of that character"

**D-251** — "For the role of the line, an agent compares a change with the part no test holds:
- complies: a program taking three pieces of an item the chest holds two of showing the line under „Wejdź” at Las in `warning`
- violates: the line in a role other than `warning`"

The clauses `tests:` are in `foundations/decisions.md` at the six entries (D-242 from line 5882 on).

## Own-work check

- **Requirement most likely missed:** a test that holds one of my sentences but got no line (the task asks that every such test carry one, searched by content, not number).
- **Check:** a script listed every case under `tests/` whose body holds a term of my sentences (`Pętla zatrzymana`, `Pętla:`, `Gdy cię nie było`, `Pętle, które stanęły`, `Skrzynka jest pełna`, `Próba weźmie`, `Puść w pętlę`, `stopLoop(`, `closeAwayReport`, `awayReport`, `stoppedLoops`, `loopLine`, `stoppedLoopLine`, `rehearsalMark`, `passLoops(`, `loopSpan(`, `Zatrzymaj`, `Odbierz`, `wprawa do odebrania`, `startLoop(`) and carries no line of D-242–D-246 or D-251: 154 such cases, 81 unmarked at first.
- **What it showed:** I read each unmarked case against the sentences. Four held a sentence and got lines afterwards: `tests/sim/loop.test.mjs:1131` (D-246 S4 and the generation), `tests/view/account-screen.test.mjs:2182` and `:2209` (D-246 S2, the minutes the catch-up passed), `tests/view/clock.test.mjs:743` (D-246 S2). The other 77 only use the term for another decision (D-44 destructive buttons, D-207 saving, D-190 deaths, D-206/D-241/D-386 the load, D-249 discoveries, D-287, D-389 the camp, focus) or are cases left out by the choices below; rerun after the additions: 154 cases, 77 unmarked.

## Choices, with the way rejected

- **R1 cases left unmarked for D-242:** `tests/view/clock.test.mjs:743` and `tests/sim/catch-up.test.mjs:258` check the catch-up's span and rest, which `catch-up-minutes` states; `:357` and `:376` the catch-up death moment, which `catch-up-death-moment` states. Marking them (rejected) would duplicate the invariant; cost if wrong: one line fewer for the open-game continuation after a catch-up (`clock.test.mjs:743`), which other open-game cases still hold.
- **Focus cases left unmarked:** `tests/view/maps-screen.test.mjs:875` and `:907` and `tests/view/headquarters-screen.test.mjs:427` assert in passing that „Zatrzymaj” stands or that „Zamknij” calls the page, but exist for the focus; other cases hold those parts. Rejected: a line at every case that touches the button (the spirit of R4). Cost if wrong: three missing lines.
- **`tests/sim/trip.test.mjs:642` („clippedTake …”) left unmarked for D-251:** it tests the cut alone, not the mark; `tests/view/trip.test.mjs:173` holds the mark measured by the cut.
- **`tests/sim/saved-game.test.mjs` left unmarked:** its cases check what a load admits of `stoppedLoops` and `awayReport` (D-206, D-241, D-386); the survival of the line and the report through a load is held by `tests/sim/loop.test.mjs:1185` and `tests/view/account-screen.test.mjs:2980`, `:3846`.
- **`tests/view/clock.test.mjs:367`** (first completion settled at the reading, no earning loop) is not marked for D-242 S3: it holds no ordering against loop minutes, so that part stays in the pair.
- **Quotation of the generation part of D-246:** the binding text has a full stop and a space inside the quoted line („…wykupione stopnie. Teraz to pokolenie {n}.”), so "Teraz to pokolenie {n}.”" begins a sentence by the rule; where a case holds only the generation I quote that short start, which begins both S2 and S5. Where a case holds the ordinary line I quote S2 from "Teraz to pokolenie {n}.”, then the others". Rejected: quoting across the full stop from S1 — the plan asks a quotation to begin the sentence it holds.
- **The data value of a game minute:** `tests/sim/data.test.mjs:404` (60 real seconds in the balance) is not marked for D-242: it checks the data, not that the clock reads it.

## Remarks on the log (R3) — nothing changed

- D-244's *Rationale* says "On the card of a map the character in an earning loop shows the same line as on its card in Siedziba, with „Zatrzymaj”, and the buttons below it inactive" — a binding-like statement standing in *Rationale*; the buttons part is D-243 S3. No change made.
- D-245 S2 names the role `text-secondary` and D-244 S1 the role `text`; no test checks either role (the views use classes with no role in the case). Recorded in the pairs.
- D-251 S1 says "clipped by carrying capacity and the map's entry cap"; the code and `tests/view/trip.test.mjs:173` also cut in the order of the take list (a budget spent from the top). The sentence does not say the order; `tests/sim/trip.test.mjs:642` and the code pin it. Possibly a sentence that says less than the code.
- The comment above the case `tests/view/account-screen.test.mjs:3045` says "Catches a mark in the wrong place or role", but the case asserts no role. Not changed (no test code changes in this task).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` — named by the method's row; read whole.
- `.the-way/elements/common/foundation_check.py` lines 700–736 and 781–838 — to see how a quotation's sentence start and `held by nothing` are judged, because D-246's quoted Polish lines contain ". " inside them.
- `the author's rules on writing scripts, outside the repository` and `.ai/rules/git.md` — the user's rules before a script and a commit.
- Test files beyond *Change*, read by case: `tests/sim/catch-up.test.mjs` (205–434, 484–568, 570–805, 845–885), `tests/sim/loop.test.mjs` (220–447, 802–842, 880–948, 1128–1205), `tests/view/account-screen.test.mjs` (2190–2270, 2460–2804, 2875–3074, 3620–3870), `tests/view/character-screen.test.mjs` (140–176), `tests/view/trip.test.mjs` (160–271), `tests/sim/trip.test.mjs` (630–679), `tests/sim/data.test.mjs` (396–421), `tests/sim/saved-game.test.mjs` (30–60, 2060–2135, 2590–2630), `tests/view/state-store.test.mjs` (280–330), `tests/view/uncaught-failure.test.mjs` (290–310).
- `foundations/glossary.md` entries manual map run, completion, solved map, earning loop, loop, catch-up, save time, loop clock.

## Working copies

Directory `.runs/executor-33/` in the worktree held: `add_lines.py`, `own_check.py`, `list_lines.py` (the scripts), the outputs `fc-base.txt`, `fc-1.txt`…`fc-3.txt`, `own_check.txt`, `lines.txt`, `diff-sample.txt`, `verification-new.txt`, and the logs `npm-*.log`, `npm-results.txt`. What the report needs from them is copied into this report. The directory is removed before return (see the last line).

## Unread material

- `guidelines/coding.md` — not read whole; searched for comment, line and Prettier rules (lines 32–35, 88–101 seen). The slice adds comments only, checked by Prettier.
- `guidelines/styleguide-browser-view.md` — not read whole; searched for comment and test rules; none bears on a comment line in a test.
- `foundations/part_map.md` — not read; the parts of the files I touched follow from `guidelines/testing.md` (Applies to, Files) and the plan's item 5.
- `foundations/glossary.md` — read only the eight entries named above.
- `guidelines/testing.md` — read whole.
- `.the-way/elements/decisions/template.md` — read 105–264 (covers the named 111–127, 162–166, 220–260).
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md` — not opened; its passages came copied in the handoff, as `slice.md` gives.
- `tests/view/account-screen.test.mjs`, `tests/sim/saved-game.test.mjs`, `tests/sim/loop.test.mjs`, `tests/sim/catch-up.test.mjs` — read by case, ranges above, not whole. `tests/view/clock.test.mjs` read 1–60 and 140–776; `tests/view/maps-screen.test.mjs` read 21–140, 484–527, 676–920; `tests/view/headquarters-screen.test.mjs` read 16–125, 284–549; `tests/view/team-lines.test.mjs` and `tests/view/away-report.test.mjs` whole.

## Searches not found or unclear

- No test checks the role `text` of the line of D-244, `text-secondary` of D-245, `warning` of „Skrzynka jest pełna.” (D-246) or of the mark (D-251): searched `tests/` for `rehearsal-mark`, `away-report-full`, `team-member-loop`, `team-member-stopped`, `maps-who-loop`, `trip-warning`.
- No test of the program editor or the map-run view during earning loops (D-244 S2): searched `tests/view` for `loops: {` and `startLoop(`; the hits are the cases above, the camp, the store and the failure screen.
- No test where a later earning loop after „Zatrzymaj” returns to an open line (D-246): searched `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` for `stopLoop(` with `awayReport`.
- No test of an earning loop started beside another sharing the loop clock with a first minute shorter than a real minute (D-242's former complies): searched `tests/` for "shar… clock", "one loop clock", "beside another".
- The handoff's "held by nothing" list of the base: the script listed none at the base (all my decisions had pairs), so there was no list to read for my decisions.

Removal: `.runs/executor-33/` (full path `.runs/executor-33/`) was removed with `rm -rf` before return; no remainder.
