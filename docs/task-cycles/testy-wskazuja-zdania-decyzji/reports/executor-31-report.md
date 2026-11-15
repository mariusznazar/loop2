# Report — executor of slice 31 (the saved game state in the simulation)

## Status

`done with concerns` — the concerns are the breadth of the slice (sixteen test files beyond *Change*) and the reading of `endLoopRun` under D-386 (Concerns 1 and 2).

## Commits and files

Base `5459423e3ab5a74870709be92b0055902ff24220`.

- `198ac579` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the split of work between server and browser, one manual map run at a time, a saved game state of another version, the return of a manual map run from a load, the saved-game code and what a load admits with lines decision: — 82 lines added, 0 removed, in 18 files:
  `tests/sim/saved-game.test.mjs` +26, `tests/view/account-screen.test.mjs` +13, `tests/sim/catch-up.test.mjs` +12, `tests/sim/death.test.mjs` +5, `tests/sim/loop.test.mjs` +5, `tests/view/end-window-game.test.mjs` +5, `tests/http.test.mjs` +3, `tests/sim/completion.test.mjs` +2, `tests/view/previous-save.test.mjs` +2, `tests/account-api.test.mjs` +1, `tests/account-storage.test.mjs` +1, `tests/sim/discovery.test.mjs` +1, `tests/sim/flow.test.mjs` +1, `tests/sim/previous-programs.test.mjs` +1, `tests/sim/program-list.test.mjs` +1, `tests/view/end-question.test.mjs` +1, `tests/view/maps-screen.test.mjs` +1, `tests/view/uncaught-failure.test.mjs` +1.
- `f29555d3` docs: :memo: name the tests of D-07, D-55, D-206, D-212, D-213 and D-386, drop the pair of D-206, which its tests and invariant hold whole, and rewrite the pair of D-07, D-55, D-212, D-213 and D-386 only for the part no invariant and no test holds — `foundations/decisions.md` +50 −37, only the *Verification* fields of the six decisions.

Author address checked after the first commit: `git log -2 --format='%h %ae'` shows `mariusznn@gmail.com` on both.

No test's code, name or assertion changed; no mention of a decision number was removed; every line `decision:` stands at the top of its case's body, after the lines `decision:` and `invariant:` already there, before the other comments, in the form earlier slices used.

## Files beyond the slice's *Change* (item 5 of "Work of every slice")

Each holds a case that holds a sentence of my decisions; each was run with its focused test (results below):

- `tests/sim/catch-up.test.mjs` (simulation)
- `tests/sim/completion.test.mjs` (simulation)
- `tests/sim/death.test.mjs` (simulation)
- `tests/sim/discovery.test.mjs` (simulation)
- `tests/sim/flow.test.mjs` (simulation)
- `tests/sim/loop.test.mjs` (simulation)
- `tests/sim/program-list.test.mjs` (simulation)
- `tests/view/account-screen.test.mjs` (browser-view)
- `tests/view/end-question.test.mjs` (browser-view)
- `tests/view/end-window-game.test.mjs` (browser-view)
- `tests/view/maps-screen.test.mjs` (browser-view)
- `tests/view/previous-save.test.mjs` (browser-view)
- `tests/view/uncaught-failure.test.mjs` (browser-view)
- `tests/account-api.test.mjs` (browser-view)
- `tests/http.test.mjs` (account-server)
- `tests/account-storage.test.mjs` (account-server)

Files of the slice's *Change* that got no line: `tests/sim/run-record.test.mjs`, `tests/invariants/test_copy_save.py`, `tests/invariants/test_saved_program_edit.py` — see "Plan and code".

## Checks

All checks were run from the worktree's root at HEAD `f29555d3`, apart from the Prettier check, which ran before the commits on the same content.

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; it lists no decision as `held by nothing`, none of D-07, D-55, D-206, D-212, D-213, D-386 included. The run at the base also gave exit 0 and `0 errors`. Output kept at `reports/executor-31-foundation-check.txt`.
- Control of that check: one quotation broken on purpose gave exit 1. The file was then restored (see Own-work check).
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 18 changed .mjs files>` — exit 0.
- `git diff -U0 5459423e -- foundations/decisions.md`, read: seven hunks, each in the *Verification* field of D-07, D-55, D-206, D-212, D-213 or D-386.
- `npm test -- <file>`, one run per file, each exit 0 (log at `reports/executor-31-tests.log`): `tests/sim/saved-game.test.mjs`, `tests/sim/previous-programs.test.mjs`, `tests/sim/run-record.test.mjs`, `tests/invariants/test_copy_save.py` (Ran 5, OK), `tests/invariants/test_saved_program_edit.py` (Ran 4, OK), `tests/sim/catch-up.test.mjs`, `tests/sim/completion.test.mjs`, `tests/sim/death.test.mjs`, `tests/sim/discovery.test.mjs`, `tests/sim/flow.test.mjs`, `tests/sim/loop.test.mjs`, `tests/sim/program-list.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/end-question.test.mjs`, `tests/view/end-window-game.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/previous-save.test.mjs`, `tests/view/uncaught-failure.test.mjs`, `tests/account-api.test.mjs`, `tests/account-storage.test.mjs`, `tests/http.test.mjs`.
- Not run: the full gate `npm test`. It is the cycle's run, not the executor's. The known base failures `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality/test_quality_invariants.py` stay unchecked here.

## Table of the decisions (item 6)

Quotations are named by the sentence's opening words. "S1", "S2", "S3" are the binding sentences in order.

### D-07 — split of work between server and browser

- S1 "The server holds the players' accounts and each player's saved game state, and computes nothing of the game" — held in part by:
  - `tests/http.test.mjs:3972` "each account's session reads and replaces only its own saved game state"
  - `tests/http.test.mjs:4173` "the save routes answer null with no save, count revisions from 1, refuse an outdated version before a stale basis and return the game unchanged" (an arbitrary game JSON stored and returned unchanged, the version compared, nothing inside read)
- S2 "The browser computes the whole game — … — and sends the saved game state to the server" — held in part by:
  - `tests/account-api.test.mjs:667` "loadSavedGame sends a bodiless GET on the relative saved-game path and the save call a JSON PUT of exactly version, basedOn and game"
  - `tests/view/account-screen.test.mjs:2184` "a loaded game catches its loop up once, and a catch-up that ended a map run of the loop is saved at once"
- Invariants: none.
- Held by nothing: that the server computes nothing of the game (no endpoint or module advancing a map run, the catch-up or an action's outcome) and that the browser computes the whole game.
- *Verification*: pair rewritten.

### D-55 — one manual map run at a time

- S1 "The game holds one manual map run at a time: …" — held in part by:
  - `tests/sim/flow.test.mjs:95` "a send while a map run exists is refused" (the game has one character, so this is a second send of the character already in the map run)
  - `tests/view/maps-screen.test.mjs:825` "a manual map run going on, waiting and ended keeps „Wejdź” inactive and „Puść w pętlę” inactive at its character alone, with the sentence at each character" (Bob's „Wejdź” inactive while Ala's run goes on, waits or has ended)
  - `tests/view/account-screen.test.mjs:2801` "after the end of a map run every character's „Wejdź” is inactive under the sentence why, and „Zakończ” takes the sentence away"
- Invariants: none.
- Held by nothing: `send` in the simulation refusing a character other than the one in the manual map run (no case calls `send` for a second character while a manual map run exists).
- *Verification*: pair rewritten.

### D-206 — a saved game state of another version

- S1 "A saved game state carries the version number of its shape, and the game loads whole only …" — held by:
  - `tests/sim/saved-game.test.mjs:765` "a document of the current version loads into the state it describes"
  - `tests/sim/saved-game.test.mjs:783` "the server's save of the current version loads into the game it holds, its revision left out"
  - `tests/sim/saved-game.test.mjs:2651` "the saved document of a state is the current version beside a copy of the state, shared nowhere"
  - the "only" by the invariant save-version.
- S2 "The game discards a saved game state of any other version, loading none of it as a game, and starts the player anew; the server keeps … (D-399), and an account with the previous-save privilege (D-400) can append its programs one by one (D-401)" — discarding and loading none: invariant save-version; the rest held by:
  - `tests/view/account-screen.test.mjs:3288` "a refused save starts a new game with its one-time sentence above it, after a confirmation notice, and saves the new game at once on the server's revision"
  - `tests/view/account-screen.test.mjs:3396` "a conflict drops the game, asks for the server's save and builds from it with its sentence in the header until a save succeeds; a refused one there starts anew"
  - `tests/account-storage.test.mjs:1063` "a save of a higher version moves the stored save into the previous slot, a second move replaces it, and a first or same-version save moves nothing"
  - `tests/http.test.mjs:4620` "a privileged account reads null, then the document of its slot; a save of a higher version fills it, and the privilege off stops the reads and keeps the slot"
  - `tests/sim/previous-programs.test.mjs:134` "a document of each version from 1 to 7, the current one included, gives its programs in order, a program without a trip plan skipped and named"
  - `tests/view/previous-save.test.mjs:394` "a pull fetches the previous save again and appends its programs in order with free names and the next numbers, and the game saves at once"
  - `tests/view/previous-save.test.mjs:484` "skipped programs stand in one sentence by their names, and the others are appended"
- S3 "A saved game state whose character names an archetype missing from the data is also discarded whole" — held by:
  - `tests/sim/saved-game.test.mjs:1117` "a document whose character's archetype the data lacks is refused as archetype"
  - `tests/view/account-screen.test.mjs:3289` (the case of line 3288 above, its archetype row)
- Invariants: save-version (the discarding of another version whole and the programs reaching the game only through the pull, one by one).
- Held by nothing: none.
- *Verification*: pair removed. The cases of save-version at `tests/sim/saved-game.test.mjs` versions 0/8/−1 and 1–6 got no D-206 line (R1: the invariant states what they hold).

### D-212 — the return of a manual map run from a load

- S1 "A manual map run of a loaded saved game state that goes on comes back …; one that ended … comes back with its screen after its end, …, and the screen the page opens on is the one D-96 gives" — held in part by:
  - going on, paused, its minute, pace and carried real time: `tests/sim/saved-game.test.mjs:859` "a map run that goes on comes back paused, at its game minute, pace and carried real time"; `tests/sim/saved-game.test.mjs:2880` "a game state the simulation made loads back from its saved document" (the states going on come back paused); `tests/view/account-screen.test.mjs:1879` "a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it"; `tests/view/account-screen.test.mjs:3395` "a conflict drops the game, …"; `tests/view/end-question.test.mjs:634` "the question lives in the page alone: a game built from the kept document stands with no question and the map run paused"
  - going on and ended on their screens with „Wznów”, „Restart”, „Zakończ”: `tests/view/account-screen.test.mjs:2123` "a save builds the game the load gives: a map run that went on comes back paused at its pace, an ended one on its screen after the end"
  - ended as it ended, record whole: `tests/sim/saved-game.test.mjs:874` "a map run that ended comes back as it ended"; `tests/sim/saved-game.test.mjs:2230` "the record loads back whole from a map run that goes on, one that died and one that completed"
  - the end-of-run window open again holding its streak and lines, no „Ostatnie minuty”: `tests/view/end-window-game.test.mjs:595` "a game built on an ended map run opens the window: …"; `:669` "„Ostatnie minuty” are the last entries of the chronicle … and stand nowhere after a completion or a load"; `:1021` "the window stands in no game state and no saved document: … a load opens it by the rule of an ended map run"; `:1051` "a reload of the screen of an ended map run opens the window with its longest streak and the line of what the end gave or cost read from the loaded state, …"; `:1127` "a reload of the screen of an ended map run holds the line of a death with no practice and of a renewal at a first completion, …"
  - the screen the page opens on, D-96: `tests/view/account-screen.test.mjs:3941` "the first screen of each entry: …"; `:3996` "a reload at #/postac/1 while the save holds a map run opens the screen Postać of Ala, …"; `:4020` "a reload at each of the seven addresses opens its screen and leaves the address as it is"
- S2 "No time that passed between the save and the load advances it, the computing of time away included" — held in part by `tests/sim/catch-up.test.mjs:331` "the catch-up and the open game read neither the manual map run nor the pause, and leave them as they stand".
- Invariants: death-settled-once (a load on the screen after a death leaves the character and the map run as they stood).
- Held by nothing: the copy of an ended map run open to editing after a load; real time between the save and the load moving the map run outside the catch-up.
- *Verification*: pair rewritten.

### D-213 — the saved-game exemplar

- S1 "The exemplar for kind `saved-game` is `src/browser/sim/saved-game.ts`, and its kind guidelines are read before …" — held by nothing.
- S2 "Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value … into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it" — held in part by:
  - `tests/sim/saved-game.test.mjs:2652` "the saved document of a state is the current version beside a copy of the state, shared nowhere"
  - `:766` "a document of the current version loads into the state it describes"; `:784` "the server's save of the current version loads into the game it holds, its revision left out"
  - `:1005` "a document of another version is refused as version, whatever its game holds"; `:1118` "a document whose character's archetype the data lacks is refused as archetype"; `:1140` "a value that is no object with a whole version is refused as shape"; `:2221` "a crafted document of the current version is refused whole as shape"
  - `:2443` "no value a document can hold, at any place of it, throws out of the load"
  - `:971` "the load changes nothing passed to it, and the state it gives shares nothing with it"
- S3 "An error of its own code is no refusal: …" — held by:
  - `tests/sim/saved-game.test.mjs:2503` "an error of the code in the load is no refusal: it leaves the load as the error it is"
  - `tests/view/account-screen.test.mjs:1971` "an error of the code in the load of a downloaded save keeps the save, builds no game, and the retry loads it"
  - `tests/view/account-screen.test.mjs:2014` "an error of the code in the load of the kept state keeps it for the retry, and only then is it sent"
  - `tests/view/uncaught-failure.test.mjs:849` "a failure the game foresees keeps its own sentence alone: a lost connection, a refused sign-in and a load that meets an error of the code"
- Invariants: none.
- Held by nothing: S1 (the exemplar and its kind guidelines) and the load standing inside the simulation.
- *Verification*: pair rewritten.

### D-386 — what a load admits

- S1 "The load of a saved game state admits every game state the game's own functions make, …" — held in part (no test can play every state) by:
  - `tests/sim/saved-game.test.mjs:2537` "a document at the edges of what the earning loops, the report and the save time admit loads"; `:2631` "a state stamped by a clock set before 1970 loads back from its saved document"; `:2881` "a game state the simulation made loads back from its saved document"; `:3076` "the largest trip count the game accepts loads back, and one beyond the safe integers the game refuses"
  - `tests/sim/catch-up.test.mjs:566` "each character's line holds its own change of the chest …"; `:593` "a covered death in the catch-up gives the loop its next map run …"; `:617` "a loop that stops in the catch-up writes its line …"; `:642` "a loop that stops in the first minute of the catch-up opens the report at one minute"; `:659` "a further return adds to the line of a loop still going …"; `:688` "a later loop of a character whose line stopped opens a line of its own"; `:709` "a loop that stops in the open game writes a line of 0 minutes …"; `:728` "a loop that stops in the open game closes the line of an earlier return …"; `:750` "a stop in the catch-up closes the line of an earlier return with the minutes added"; `:833` "with one resurrection for two deaths the catch-up gives it to the character earlier on the list …"; `:871` "a loop of a character with no practice dies on and on with no loss …"
  - `tests/sim/loop.test.mjs:838` "a death is settled once: … and a load of it settles nothing"; `:1136` "every state a loop makes over a whole map run, an end and the next map run loads back, …"; `:1154` "the states of a loop through a death, its settling and the next map run, and of a stopped loop, load back"; `:1186` "a loop beside a manual map run of another character loads back"
  - `tests/sim/death.test.mjs:237` "a resurrection used up is ready again at its moment after a save and a load, …"; `:354` "a settled death saved and loaded on its screen is left as it stood by a later settling"
  - `tests/sim/program-list.test.mjs:529` "the game state after an append is saved and loaded again whole, …"
  - `tests/sim/discovery.test.mjs:1047` "a saved document of the paused state, loaded again, gives the same name, with the shape unchanged"
- S2 "A moment of real time that the game state stores, … is a safe integer of milliseconds of any sign, …; the function that stamps a save time, … refuse a moment that is no safe integer with a RangeError, and the last two read no moment where there is nothing to settle" — held in part by:
  - `tests/sim/saved-game.test.mjs:994` "the team's moment of readiness below zero loads, as it is a safe integer of any sign"; `:2538` (edges, save time 0 and −1); `:2618` "a moment that is no safe integer gives no save time"; `:2632` (clock before 1970)
  - `tests/sim/death.test.mjs:257` "a moment below zero settles as any other"; `:370` "with nothing to settle the very state comes back, whatever the moment"; `:392` "a moment that is no safe integer is refused at a death to settle"
  - `tests/sim/completion.test.mjs:627` "a completion to settle takes a safe integer moment, and nothing else to settle reads none"; `:665` "a first completion at a moment below zero makes the used-up resurrection ready at that moment"
  - `tests/sim/loop.test.mjs:854` "taking an end reads the moment only when there is an end to settle, and the moment must be a safe integer" (see concern 2)
- Invariants: none.
- Held by nothing: the load comparing no moment with any clock (no case loads a moment far beyond the present); game states no test plays.
- *Verification*: pair rewritten.

## Pairs added or rewritten, for the human to accept at the merge

- D-07 (rewritten) — "For the server computing nothing of the game and the browser computing all of it, an agent compares a change with the part no test holds:"
  - complies: a rule of how a map run, an earning loop or the catch-up passes written in the simulation the browser runs, with nothing of it on the server
  - violates: a server endpoint that advances a map run, or computes the catch-up; a server module that computes the outcome of a character's actions or of the time the game was closed
- D-55 (rewritten) — "For the simulation refusing to send another character, an agent compares a change with the part no test holds:"
  - complies: `send` refusing a second character while a manual map run of another goes on
  - violates: `send` starting a manual map run of a second character while the first one's goes on
- D-212 (rewritten) — "For the copy of an ended map run open to editing after a load, and for real time between the save and the load outside the catch-up, an agent compares a change with the part no test holds:"
  - complies: a map run saved on the screen after a death loading with its copy open to editing, its unsaved changes kept; a map run of Las saved at game minute 212 at 8× loading an hour later at game minute 212
  - violates: a loaded ended map run whose copy cannot be edited; a loaded map run moved on by the real time between its save and its load
- D-213 (rewritten) — "For the exemplar, its kind guidelines and the load standing inside the simulation, an agent compares a change with the part no test holds:"
  - complies: saved-game guidelines identify the first implementation as exemplar and draw the kind's boundary with simulation modules as the content-data guidelines draw theirs
  - violates: the load of a saved game state written in the browser view; a second exemplar for the kind
- D-386 (rewritten) — "For the load comparing no moment with a clock and for the game states no test plays, an agent compares a change with the part no test holds:"
  - complies: a save time far beyond the present loaded as it stands; a new kind of game state a function of the game makes loading back from its saved document
  - violates: a load that compares a moment with the clock; a game state made by the game's own functions in a play that the load refuses
- D-206: pair removed (held whole by its tests and save-version).

## Choices, with the way rejected

1. **Where a load is the route, not the check.** D-386 S1 is held "in part" by any case that loads a state the game made. I marked the simulation cases whose own assertion is that such a state loads back (`ok` and the state as it was, not marked as a precondition). I left without a D-386 line the view cases that load a state only to read a screen (`tests/view/trip.test.mjs:431`, `tests/view/end-window-game.test.mjs` cases with "precondition: the document loads", `tests/view/end-question.test.mjs:632`, `tests/view/end-window-game.test.mjs:1017`). Rejected: a line at every case that calls `loadSavedGame`, which would mark screen tests for a rule of the load. Cost if wrong: a few more view cases also hold D-386 S1 in part; the pair of D-386 already keeps "game states no test plays".
2. **D-213's "a refusal naming why".** I marked the cases whose subject is a kind of refusal (version 996, archetype 1107, shape 1128, crafted 2202), not every case of a shape rule that ends in `reason: "shape"` (those hold D-50, D-56, D-221 and others), nor the cases of versions 1–6, which repeat 996 for older documents. Rejected: a D-213 line on about thirty shape and version cases. Cost if wrong: those cases also hold D-213 S2 in part with no line.
3. **D-212's last clause, "the screen the page opens on is the one D-96 gives".** I marked the three address cases whose save holds a manual map run (3929, 3980, 4004); other address cases (for example 4030, Mapy with a map picked) hold D-96 and D-331 with lines of their own. Rejected: a D-212 line at every D-96 address case.
4. **D-206's clauses that restate D-399 and D-401.** I marked the server cases of the previous slot (`tests/account-storage.test.mjs:1058`, `tests/http.test.mjs:4609`) and the pull cases that append programs of a previous save (`tests/sim/previous-programs.test.mjs:132`, `tests/view/previous-save.test.mjs:389`, `:480`), not every D-401 case (button lifecycle, names, failures). Rejected: no D-206 line there, which would leave those clauses held by nothing and keep a pair for them although D-399 and D-401 cases check them.
5. **`tests/view/account-screen.test.mjs:4900` ("the page's sentence above the first screen …")** loads a save of an older version only to get the sentence of D-286; no D-206 line.
6. **`tests/view/program-panel.test.mjs:796`** cites D-212 ("a loaded map run's copy open to editing") but builds a map run that goes on, not an ended one; D-212's copy clause speaks of an ended map run, so no line; that clause stays in the pair.

## Concerns

1. **Breadth.** The slice's *Change* names five test files; the sentences of my decisions are held in sixteen more (listed above). Every judgment was mine; the borderline principle is choice 1–4.
2. **D-386 and `endLoopRun` (R3).** D-386 names three functions that refuse a moment that is no safe integer: the one that stamps a save time, the one that settles a death and the one that settles a first completion. `endLoopRun` (`src/browser/sim/loop.ts:387`) settles the death or the end of a map run of an earning loop and also refuses such a moment with a RangeError and reads none where there is nothing to settle (`tests/sim/loop.test.mjs:852`). I read it as "the function that settles a death" for an earning loop and marked the case; if the decision means `settleDeath` alone, the line at `tests/sim/loop.test.mjs:854` holds nothing and should go. The decision's wording is not changed.
3. **D-206 restating D-399, D-400 and D-401 (R3).** Its second sentence carries the previous save and the pull as clauses with references; they are the content of those decisions. Not changed; a remark for the human.
4. **D-55's *Rationale* (R3)** says "It is a choice for now, expected to change later, so the entry holds what is true today" — wording of a stage in a rationale, not in a binding sentence; not changed.

## Plan and code

- Small mismatch: `tests/sim/run-record.test.mjs`, `tests/invariants/test_copy_save.py` and `tests/invariants/test_saved_program_edit.py` hold no sentence of my decisions. The two Python files concern „Zapisz w programie” and the edit of a saved program (a save of a copy into a program, not of a saved game state); `run-record.test.mjs` cites D-212 in its header, but no case loads a saved game state. No lines added there; each still ran with its focused test.
- The plan's *Checks* name `npm test -- <file>` for the five files of *Change*; I also ran the sixteen files reached beyond them. I did not run the full gate.

## Own-work check

- Requirement most likely missed: the acceptance criterion that only *Verification* changes in the log. Check: a script that splits the base log (`git show 5459423e:foundations/decisions.md`) and the current log into entries and compares each entry apart from its *Verification* field — 403 entries in both, only D-07, D-55, D-206, D-212, D-213 and D-386 differ, and each differs only in *Verification* (`reports/executor-31-own-check.txt`). Also `git diff -U0 5459423e -- foundations/decisions.md`: every hunk lies in the *Verification* field of one of the six.
- That the check script really checks quotations: one quotation broken on purpose in `tests/sim/flow.test.mjs` (`The game holds` → `The game keeps`): `python -B .the-way/elements/common/foundation_check.py` exit 1, "tests/sim/flow.test.mjs:95: the quotation stands in no binding sentence of `D-55`"; file restored with `git checkout -- tests/sim/flow.test.mjs`, tree clean.
- Second most likely miss: a test that holds a sentence and has no line. Searches made: the numbers D-07/D-55/D-206/D-212/D-213/D-386 across `tests/`; every caller of `loadSavedGame` and `savedGame` in `tests/`; every `assert.throws` around `send`; test names with "load", "loaded", "reload", "Wejdź"; `OTHER_VERSION`/`OLDER_VERSION` and the D-96 sentence of a discarded save; the server cases of the saved-game and previous-save routes. Remaining uncertainty is in choices 1–4.

## Reaches beyond the dispatch

- `src/browser/sim/game.ts:446-476` (`send`) and `src/browser/sim/saved-game.ts:1040-1059` — to judge D-55 (what `send` refuses).
- `src/browser/sim/game.ts` and `src/browser/sim/loop.ts` signatures of `settleDeath`, `settleCompletion`, `withSaveTime`, `endLoopRun` — for D-386.
- `guidelines/coding-saved-game.md` (one line, by search) — whether any test holds D-213's exemplar.
- `tests/invariants/test_cross_part_imports.py:1-30` — whether it holds "inside the simulation" of D-213 (it does not: it checks import direction, not where the load stands).
- The test files listed under "Files beyond the slice's *Change*", by case.
- The author's own rules for scripts and git (`the author's rules on writing scripts, outside the repository`, `git.md`), as the session's instructions require.

## Working copies

Directory `.runs/executor-31/` (full path `.runs/executor-31/`): the insertion script `add_lines.py`, its log, outputs of the check script, a copy of the base log, test outputs. The directory has been removed with `rm -rf`, and `ls` confirmed it is gone. What the report needs is kept beside the report:
- `reports/executor-31-own-check.txt`
- `reports/executor-31-tests.log`
- `reports/executor-31-foundation-check.txt`
- `reports/executor-31-add_lines.py` (the script that inserted the lines, with every quotation and every case)

No worktree or clone was made. `git status --short` is clean.

## Unread material

- `guidelines/styleguide-browser-view.md` (986 lines): read lines 1-60 and 324-388 and its headings, not whole. Its rules concern roles, tokens, focus and screens; the slice adds only comment lines to view tests.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:16-73` and the slice's section: read as the handoff copies them word for word; the plan file itself not opened.
- `.the-way/elements/decisions/template.md`: read lines 105-264, which hold the three ranges named.
- Everything else named: read whole (the frozen task whole; the six decisions, D-73, D-82 and the two invariants each whole).

## Searches not found or unclear

- No case calls `send` for a second character while a manual map run of another exists (D-55, simulation side): not found.
- No case loads an ended manual map run and checks its copy open to editing (D-212): not found.
- No case loads a moment far beyond the present (D-386 "without comparing it with any clock"): not found.
- No test holds D-213's exemplar sentence: not found.
- Unclear: whether `endLoopRun` is "the function that settles a death" of D-386 (concern 2).
- Unclear: whether the test files of *Change* `test_copy_save.py`, `test_saved_program_edit.py` and `run-record.test.mjs` were meant for another decision; none of mine.
