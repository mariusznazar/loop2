# Report — executor of slice 32 (earning loop and time away in the simulation)

**Status:** done with concerns

The concerns are the line-of-judgement choices listed under "Choices", chiefly where an
incidental assertion was and was not counted as holding a sentence, and the remarks of R3.

## Commits (range from `f29555d3732672cca48f150b8625d603a7efc314`)

- `f2724ddd` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the speed of the earning loop, the computing of time away, how the game state holds earning loops, the save time, what a map run of an earning loop discovers and what a pause holds with lines decision:
- `4d74b04a` docs: :memo: name the tests of D-239, D-240, D-241, D-247, D-248, D-249 and D-250, drop the pair of D-239, D-240, D-241 and D-248, which their tests and invariants hold whole, and rewrite the pair of D-247, D-249 and D-250 only for the part no invariant and no test holds

Author address checked after the commits: `mariusznn@gmail.com` on both (`git log --format='%h %ae %s' -3`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 51 | 47 |
| `tests/sim/catch-up.test.mjs` | 21 | 0 |
| `tests/sim/loop.test.mjs` | 20 | 0 |
| `tests/sim/saved-game.test.mjs` | 8 | 0 |
| `tests/sim/data.test.mjs` | 1 | 0 |
| `tests/sim/time.test.mjs` | 2 | 0 |
| `tests/view/clock.test.mjs` | 4 | 0 |
| `tests/view/game-saver.test.mjs` | 5 | 0 |
| `tests/view/account-screen.test.mjs` | 10 | 0 |

71 lines `decision:` added, every one a comment; no code, name or assertion of a test changed, no
mention of a decision number removed.

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:

- `tests/sim/saved-game.test.mjs` — simulation; focused run below.
- `tests/sim/data.test.mjs` — simulation; focused run below.
- `tests/sim/time.test.mjs` — simulation; focused run below.
- `tests/view/clock.test.mjs` — browser-view; `guidelines/styleguide-browser-view.md` read whole first; focused run below.
- `tests/view/game-saver.test.mjs` — browser-view; styleguide read; focused run below.
- `tests/view/account-screen.test.mjs` — browser-view; styleguide read; focused run below.

## Checks run

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (at the base, before any edit) | 0 — `0 errors`, no decision listed as held by nothing |
| `python -B .the-way/elements/common/foundation_check.py` (after the lines, before the log) | 0 — `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after the log edits; the tree then equals the committed `4d74b04a`) | 0 — `0 errors`, none of D-239, D-240, D-241, D-247, D-248, D-249, D-250 listed as held by nothing (nothing listed at all) |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 — 33 tests, 33 pass |
| `npm test -- tests/sim/loop.test.mjs` | 0 — 46 / 46 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 — 39 / 39 |
| `npm test -- tests/sim/data.test.mjs` | 0 — 36 / 36 |
| `npm test -- tests/sim/time.test.mjs` | 0 — 19 / 19 |
| `npm test -- tests/view/clock.test.mjs` | 0 — 27 / 27 |
| `npm test -- tests/view/game-saver.test.mjs` | 0 — 20 / 20 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 — 131 / 131 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` for each of the eight `.mjs` files above | 0 each |
| `git diff -U0 f29555d3… -- foundations/decisions.md`, read | hunks at 5773, 5807, 5843, 6077, 6111, 6146, 6170 of the base: the *Verification* fields of D-239, D-240, D-241, D-247, D-248, D-249, D-250; every removed line is an old *Verification* line |

All test runs finished before this report (run in the background, sequentially, each waited for).
Not run: the full `npm test` — the cycle's, as the method gives. `test_ruff_source_rules` and
`test_shellcheck_source_rules` were not run (they fail at the base, per the handoff).

## Own-work check

- **Requirement most likely missed:** a line `decision:` whose quotation does not stand in the
  binding sentences, or that stands at the wrong test, while the foundation check still reports `0
  errors` because it does not read the quotation at all.
- **Check 1 (positive control of the script):** changed one quotation in
  `tests/sim/data.test.mjs` (`per real minute` → `per real hour`), ran
  `python -B .the-way/elements/common/foundation_check.py` → exit 1, `tests/sim/data.test.mjs:405:
  the quotation stands in no binding sentence of D-239`, `1 error`; restored the line, ran it again
  → exit 0, `0 errors`; `git diff` of the file then showed only the one added line. So the 0 errors
  above do check all 71 quotations.
- **Check 2 (placement):** a script (`.runs/executor-32/place_check.py`, removed) walked up from
  every added line through comment lines to the line that opens a test case: `added=71 bad=0`, exit
  0. Its listing, line by line with the test case each line stands at, is kept in
  `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-32-place-check.txt`.

## Rows of item 6 (line numbers as at `4d74b04a`; the line is the test's `test(` line)

### D-239 — How fast does the earning loop go? — *Verification:* pair removed, `tests:` added

- Sentence 1 ("An earning loop goes only on a solved map, one game minute per real minute, …") — held in whole:
  - only on a solved map: `tests/sim/loop.test.mjs:326` "a start the map, the character or the program does not allow returns the very state"; `tests/sim/saved-game.test.mjs:2214` "a crafted document of the current version is refused whole as shape" (an earning loop on a map absent from the solved maps refused)
  - one game minute per real minute: `tests/sim/data.test.mjs:404` "an earning loop goes one game minute in 60 real seconds, a whole number of seconds"; `tests/sim/catch-up.test.mjs:213` "the span gives whole minutes and the clock's new value, …"; `tests/sim/catch-up.test.mjs:257` "the catch-up passes a loop one game minute for each whole real minute from the save time, and the rest waits"; `tests/sim/catch-up.test.mjs:323` "the open game passes no minute before a whole one: …"; `tests/view/clock.test.mjs:689` "a loop started by the clock gets a full first minute, …"; `tests/view/clock.test.mjs:734` "the catch-up spans from the save time to the date it reads, …"
  - the speed control does not reach it: `tests/sim/catch-up.test.mjs:333` "the catch-up and the open game read neither the manual map run nor the pause, …" (pace 16 in the state, the loop passes 10 game minutes in 10 real minutes)
  - a manual map run may be fast-forwarded: `tests/sim/time.test.mjs:176` "at 16x each whole 62.5 ms of real time moves the run on by one game minute"; `tests/sim/time.test.mjs:190` "each pace of the data gives its multiple of a game minute per real second"
- Sentence 2 ("Each map run of an earning loop is a map run of its own, followed at once by the next …") — held in whole: `tests/sim/loop.test.mjs:397` "two loops from one state at one moment go the same map runs, …"; `:449` "a loop's map run through a death and its next map run still leaves …"; `:543` "a rank bought during a loop reaches the next map run and not the one going on"; `:678` "a completion deposits the bring list's clipped loot, counts the map run, … and starts the next map run in the same step"; `:731` "the seeds of the successive map runs of a loop follow the draw …"; `:751` "a death with a resurrection ready is settled at the moment given: … the loop going on at its next map run"; `:834` "a death at the very moment of readiness uses the resurrection, …"; `:1373` "a death of a character with no practice takes the carried items only: …"; `tests/sim/catch-up.test.mjs:430` "a character whose chest and resurrection no other loop reaches ends the catch-up as the open game does, …"; `:602` "a covered death in the catch-up gives the loop its next map run …"; `:627` "a loop that stops in the catch-up writes its line …, and the others go on"; `:723` "a loop that stops in the open game writes a line of 0 minutes, …"; `:888` "a loop of a character with no practice dies on and on with no loss: …"; `tests/view/clock.test.mjs:537` "a reading passes the manual run, then the loops, …"; `tests/view/account-screen.test.mjs:2182` "a loaded game catches its loop up once, …"
- Sentence 3 ("Solving a map unlocks its earning loop without certifying …") — held in whole: `tests/sim/loop.test.mjs:326` (solved map allowed with the empty program, which dies; maps not solved refused)
- Invariants: none. Held by nothing: nothing.

### D-240 — When and how is the time away computed? — *Verification:* pair removed, `tests:` added, `invariants: catch-up-state.` kept

- Sentence 1 ("The catch-up takes place when the player returns and advances the missed game minutes, taking the characters one at a time, …") — held in whole, with the invariant:
  - takes place when the player returns: `tests/view/account-screen.test.mjs:2182` "a loaded game catches its loop up once, …"; `tests/view/account-screen.test.mjs:2208` "a catch-up that ended no map run sends nothing until the page hides, …"
  - one at a time, each to the end, in the list's order: `tests/sim/catch-up.test.mjs:549` "with room in the chest for one, the open game gives it to whoever completes first and the catch-up to the earlier character of the team"; `tests/sim/catch-up.test.mjs:847` "with one resurrection for two deaths the catch-up gives it to the character earlier on the list, though it died later in real time"
  - advances the missed game minutes: invariant `catch-up-state` (the catch-up ends as the game run without a break)
- Sentence 2 ("Characters meet only at the borders of map runs and at the account's resurrection: …") — held in whole: `tests/sim/catch-up.test.mjs:574` "each character's line holds its own change of the chest …" (Ala's completion deposits, Ola's next map run takes those sticks); `:549` (the last room to the earlier character); `:847` (one resurrection for two deaths)
- Held by nothing: nothing.

### D-241 — How does the game state hold earning loops? — *Verification:* pair removed, `tests:` added, `invariants: loop-practice-payment.` kept

- Sentence 1 ("The game state holds its earning loops beside the one manual map run, by character number, …") — held in whole: `tests/sim/loop.test.mjs:227` "the first map run of a loop goes on the program of its row, … and the loop holds the content of the program and nothing of its copy" (exactly the five keys, number 1, no completion, no practice); `:281` "a loop starts beside a manual map run of another character, …"; `:326` (a character already in a loop refused); `:509` "editing or deleting the program after the start leaves the loop on the content it took, …"; `:678` (count of completions, practice of the completion added to the loop); `:952` "taking the practice pays what the loop and its map run going on gathered, empties both …"; `:1000` "practice taken is paid once: …"; `:1203` "a loop beside a manual map run of another character loads back"; `tests/sim/saved-game.test.mjs:2214` (keys by character number, none for the manual run's character, exactly the keys of a loop, a pause key refused, completions below the run number)
- Sentence 2 ("In every game state the browser view holds or a saved game state admits, the map run of an earning loop is going on: …") — held in whole: `tests/sim/loop.test.mjs:851` "a death is settled once: … a load of it settles nothing" (the load refuses the state before the end); `tests/sim/saved-game.test.mjs:2214` (a loop's map run ended in a death or a completion refused); `tests/sim/catch-up.test.mjs:430`, `:602`, `:627`, `:723`, `:888` (the open game and the catch-up take the end at once); `tests/view/clock.test.mjs:537` and `tests/view/account-screen.test.mjs:2182` (the view's state after a reading and after a load holds the next map run)
- Invariant `loop-practice-payment`: practice never paid twice, which stands beside sentence 1's practice since the last „Odbierz”.
- Held by nothing: nothing.

### D-247 — When is time away computed, and how much? — *Verification:* `tests:` added, pair rewritten, `invariants: catch-up-minutes.` kept

- Sentence 1 ("The catch-up computes all the missed game minutes, and the game sets no upper bound on them") — held in whole by the invariant `catch-up-minutes` (one game minute for every whole real minute from the save time to the reading); no test line (R1).
- Sentence 2 ("It runs on its own after each load of a game state, …") — held in part: `tests/view/account-screen.test.mjs:2182` "a loaded game catches its loop up once, …"; `tests/view/account-screen.test.mjs:2208` "a catch-up that ended no map run sends nothing until the page hides, …" — the load the page makes when it opens with a session (the reload).
- Held by nothing: the catch-up after a sign-in through the form, after a save lost to another browser's, after a sign-in with the unsaved game state kept in the page's memory.

### D-248 — What is the save time? — *Verification:* pair removed, `tests:` added

- Sentence 1 ("The save time comes from the browser's clock and lies in the game state: …") — held in whole: `tests/view/game-saver.test.mjs:542` "each document holds the moment of the reading made for it and loads, and the state held stays what it was"; `:282` "a failed save shows that the game retries, … each with the state of its time" (each retry stamped); `:585` "a loaded paused game sends nothing, and a save of it changes nothing …"; `tests/view/account-screen.test.mjs:2546` "the document kept for the same account holds the moment of its reading and loads, and the view's state stays what it was"; `:2591` "each act of the player that changes the game state is saved at once, …"; `:2182` (the document of the catch-up's save holds the clock's moment); `tests/sim/saved-game.test.mjs:2611` "a state with its save time is a copy holding the moment, the state passed left as it was"; `:2653` "the saved document of a state never stamped is refused as shape"; `:2214` (a document without a save time refused)
- Sentence 2 ("A game that came from no save holds none, and a game from a save holds the moment of that save") — held in whole: `tests/sim/saved-game.test.mjs:2601` "a new game holds no earning loop, no stopped loop, no report and no save time"; `:2636` "a state stamped by a clock set before 1970 loads back from its saved document"; `tests/view/game-saver.test.mjs:542`, `:585`; `tests/view/account-screen.test.mjs:2546`
- Invariants: none. Held by nothing: nothing.

### D-249 — What does a map run of an earning loop discover? — *Verification:* `tests:` added, pair rewritten, `invariants: loop-run-knowledge.` kept

- The one sentence ("A map run of an earning loop discovers nothing: …") — held in part:
  - invariant `loop-run-knowledge`: the Understanding and the player's programs stay as they stand
  - tests: `tests/sim/catch-up.test.mjs:462` "a catch-up across the first chill leaves the Understanding and the programs as they were"; `tests/sim/loop.test.mjs:420` "a loop's map run through the first chill leaves the Understanding, the programs and the counts as it found them, and its copy empty" — game time goes on (all minutes pass, no stop, no discovery, not paused) and the content the loop holds gains no rule
- Held by nothing: "the player discovers what the character met in a manual map run" — that a discovery reaches the player only through a manual map run (no report naming it, no entry when the report closes).

### D-250 — What does a pause or an end screen hold? — *Verification:* `tests:` added, pair rewritten

- The one sentence ("A pause of a manual map run, its stop at a discovery and the screen after its end hold that map run, …") — held in part: `tests/sim/catch-up.test.mjs:333` "the catch-up and the open game read neither the manual map run nor the pause, and leave them as they stand" — a pause, in the open game and the catch-up.
- Invariants: none. Held by nothing: the stop at a discovery and the screen after the end.

## Pairs added or rewritten (for the human's acceptance at the merge)

None added. Rewritten:

**D-247**

```markdown
- **Verification:** invariants: catch-up-minutes. tests: the catch-up running on its own after the
  load the page makes when it opens with a session. For the catch-up after a sign-in, after a save
  lost to another browser's and after a sign-in with the unsaved game state kept in the page's
  memory, an agent compares a change with the part no invariant and no test holds:
  - complies: the tab that lost to another browser's save loading that save and then catching up; a
    sign-in to the same account with the state kept in the page's memory catching up from that
    state's save time
  - violates: a state kept in the page's memory going on from the sign-in with its missed game
    minutes dropped; a save with earning loops loaded at a sign-in through the form and shown without
    its catch-up
```

**D-249**

```markdown
- **Verification:** invariants: loop-run-knowledge. tests: a loop's map run, passed on its own and in
  the catch-up, through the game minutes in which a manual map run discovers, its game time going on
  with no stop and no discovery, and the program content the earning loop holds gaining no rule. For
  the player discovering what a character met only in a manual map run, an agent compares a change
  with the part no invariant and no test holds:
  - complies: a creature a character first meets in an earning loop's map run entering the
    Understanding only when a manual map run meets it
  - violates: a discovery of an earning loop's map run named in the report of the time away, or
    entered when that report closes
```

**D-250**

```markdown
- **Verification:** tests: a paused manual map run standing as it is in the open game and in the
  catch-up while another character's earning loop passes its game minutes. For the stop at a
  discovery and the screen after the end, an agent compares a change with the part no test holds:
  - complies: a manual map run stopped at a discovery while another character's earning loop passes
    its game minutes and ends a map run; the screen after a death standing while an earning loop
    deposits into the chest
  - violates: earning loops standing still while a manual map run waits at a discovery or while the
    screen after its completion stays
```

Pairs removed whole: D-239, D-240, D-241, D-248.

## Choices made, with the way rejected

1. **What counts as holding.** A test got a line where the sentence's requirement is the subject of
   an assertion: the test's name, a comment at the assertion, or an assertion on the very value
   (the save time sent, the run number after an end). Tests where the requirement only passes
   through setup got none: the stamping before a load in `tests/view/trip.test.mjs:452`,
   `tests/sim/death.test.mjs:239` and `:357`, `tests/view/game-saver.test.mjs` 440 (with its
   `submissionOf` comparisons), the round trips of `assertLoadsBack` in `catch-up.test.mjs`, and the
   setup in `catch-up.test.mjs:333` that puts a loop beside a manual map run. Rejected: a line at every
   test whose fixture passes through the requirement — most of the save and loop suites. Cost if
   wrong: a few tests lack a line for a part another test already holds; the *Verification* is
   unchanged by it.
2. **D-239 sentence 2 ("followed at once by the next")** is marked at every test that asserts the
   next map run after an end (run number, minute 0, the end cleared), also where the test's subject
   is another decision (`loop.test.mjs:543` D-200, `:731` D-22, `:834` D-190). Rejected: only the
   tests named for it — those assertions would fail as well, so they hold the part.
3. **D-241 sentence 2** is marked at tests of `passLoops`, `catchUp`, the view's reading and the
   load, not at tests calling `endLoopRun` directly (`loop.test.mjs:678`, `:751`, `:834`, `:1373`):
   the sentence speaks of the function that reaches an end dealing with it at once and of the states
   held or admitted, and those tests check what the dealing does. Exception: `loop.test.mjs:851` for
   its load refusal.
4. **D-247 sentence 1** got no line at `catch-up.test.mjs:213` (its ten years of minutes), because
   `catch-up-minutes` already states every whole minute with no bound (R1). Cost if wrong: one line
   more is asked for.
5. **D-240 sentence 2** got no line at the single-character test `catch-up.test.mjs:430`: with one
   character nothing meets.
6. **D-239's clause "while a manual map run may be fast-forwarded"** is marked at the two pace tests
   of `time.test.mjs` whose subject is the multiple at each pace (176, 190), not at the change-of-pace
   tests (204, 222).
7. **D-249's clause "the player discovers what the character met in a manual map run"** is kept in a
   pair instead of credited to the preconditions of `catch-up.test.mjs:462` and
   `loop.test.mjs:420`, which only guard that a manual map run would discover there.

## Remarks under R3 (log wording, nothing changed)

- The invariant `loop-run-knowledge` (`foundations/invariants.md:1160`) reads "A map run of an
  earning loop **currently** leaves …": "currently" is a word the first cleanup task removed from
  binding sentences of decisions; this is an invariant, so out of this slice's scope.
- `tests/sim/loop.test.mjs:1153` is named "every state a loop makes over a whole map run, an end and
  the next map run loads back", but its body only calls `advanceLoopRun` for 520 minutes and never
  `endLoopRun`. If the SURVIVING program completes Las within those minutes, the states after the
  completion would hold an ended run, which `saved-game.test.mjs:2214` shows the load refuses; the
  test passes, so either the run does not complete there or the name says more than the body does.
  Not verified — a guess; it bears on D-386, not on my decisions, and got no line from me.

## Reaches beyond the dispatch

- `tests/sim/saved-game.test.mjs` 1900-2230, 2530-2690 — the crafted documents and the save-time
  cases (D-241, D-248 sentences).
- `tests/view/account-screen.test.mjs` 2160-2230, 2530-2620; `tests/view/clock.test.mjs` 503-773;
  `tests/view/game-saver.test.mjs` 1-30, 185-220, 282-311, 440-470, 536-610;
  `tests/view/state-store.test.mjs` 1-5, 55-80, 268-285; `tests/view/uncaught-failure.test.mjs`
  778-827; `tests/view/trip.test.mjs` 440-462; `tests/sim/death.test.mjs` 230-249;
  `tests/sim/data.test.mjs` 395-420; `tests/sim/time.test.mjs` 1-45, 176-205 — candidates found by
  searching for the sentences' terms (catch-up, save time, startLoop, pace).
- `foundations/invariants.md`: the *Derives from* of `trip-transfer`, `trip-run-end`,
  `saved-program-edit`, `save-version`, `map-run-repeatability`, `minute-span-split`,
  `death-settled-once`, `resurrection-renewal`, `simulation-inputs`, `uncaught-failure-game-state`
  and `catch-up-death-moment` — to apply R1 (none derives from my decisions).
- `guidelines/styleguide-browser-view.md` whole — item 5, before the three view files.
- `.the-way/elements/decisions/template.md` 108-262 (a range wider than the plan's three sections,
  read once) and `.the-way/task-cycle/change/slice.md` (the method's row for a slice).
- `git log` and `git show f29555d3`, `git show 198ac579` — the form of the earlier slice.

## Working copies

`.runs/executor-32/` held the
test logs, the base check output, the control output, `place_check.py` with its listing and an
anchor listing. The placement listing is kept beside this report as `executor-32-place-check.txt`;
the directory was removed with `rm -rf` and its absence confirmed (`test ! -e` → removed). No
worktree or clone was made; no remainder.

## Unread material

- Files changed but not read whole (the handoff forbids whole large files; the method asks for every
  changed file whole — a conflict, settled for the handoff): `tests/sim/saved-game.test.mjs`,
  `tests/view/account-screen.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/game-saver.test.mjs`,
  `tests/sim/data.test.mjs`, `tests/sim/time.test.mjs` — read only in the ranges listed above. Each
  change in them is one comment line inside a test case read whole.
- Everything the dispatch's *Read* names was read whole: plan 16-73 (copied in the handoff),
  task-frozen 25-105, the template's sections, the decision skill whole, `guidelines/testing.md`,
  `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`, the seven entries,
  D-73, D-82 and the four invariants; `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs`
  whole.

## Searches not found or unclear

- No test found for the catch-up after a sign-in through the form, after a save lost to another
  browser's, or after a sign-in with the kept state (searched `loopingAla`, `catchUp`, `catch-up`,
  `keep` in `tests/view/`) — that part of D-247 stays in its pair.
- No test found of a manual map run stopped at a discovery or ended while an earning loop passes
  (searched `paused|discovery|ended|deathSettlement|completion` near `loops[` across `tests/`) —
  that part of D-250 stays in its pair.
- No test found that a discovery of a loop's map run never reaches the report or the Understanding
  at its close (searched the report and `closeAwayReport` cases) — D-249's pair.
- Unclear: whether a precondition assertion ("precondition: a manual map run discovers within these
  minutes") counts as holding a sentence; judged not (choice 7).
