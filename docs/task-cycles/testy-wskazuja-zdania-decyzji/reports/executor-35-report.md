# Executor 35 — report

## Status

done

## Commits (base 4437095f)

- `0e2e6970` test: lines `decision:` for D-311, D-324, D-368, D-369, D-370, D-371 (138 lines added, none removed).
- `81dfed74` docs: *Verification* of D-311, D-324, D-368, D-369, D-370, D-371.
- Author address: `mariusznn@gmail.com` (`git log -1 --format=%ae`).

Files changed (added / removed):

| File | + | − |
|---|---|---|
| foundations/decisions.md | 85 | 34 |
| tests/sim/run-record.test.mjs | 16 | 0 |
| tests/sim/saved-game.test.mjs | 4 | 0 |
| tests/view/chronicle-game.test.mjs | 1 | 0 |
| tests/view/chronicle.test.mjs | 2 | 0 |
| tests/view/end-question.test.mjs | 10 | 0 |
| tests/view/end-window-game.test.mjs | 38 | 0 |
| tests/view/end-window-lines.test.mjs | 7 | 0 |
| tests/view/end-window.test.mjs | 15 | 0 |
| tests/view/rule-editor.test.mjs | 2 | 0 |
| tests/view/run-header.test.mjs | 10 | 0 |
| tests/view/run-screen-state.test.mjs | 15 | 0 |
| tests/view/run-screen.test.mjs | 14 | 0 |
| tests/view/tabs-area.test.mjs | 1 | 0 |
| tests/view/trip.test.mjs | 1 | 0 |
| tests/view/world-area.test.mjs | 2 | 0 |

No test code, name or assertion changed; no mention of a decision number removed; nothing in the log
changed outside the six *Verification* fields.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any change) | 0 | `0 errors`, no decision listed `held by nothing` (none of the six) |
| same, after the edits and after both commits | 0 | `0 errors`, nothing listed `held by nothing` |
| positive control: one quotation in `tests/view/trip.test.mjs` changed to a wrong start, check run, file restored | 1 (error) | `tests/view/trip.test.mjs:394: the quotation stands in no binding sentence of D-311`, `1 error` — the check does read the quotations |
| `git diff -U0 4437095f -- foundations/decisions.md`, read | — | six hunks, each starting at the `- **Verification:**` line of D-311 (8185), D-324 (8861), D-368 (9980), D-369 (9995), D-370 (10010), D-371 (10025); nothing else |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` on each of the 15 changed `.mjs` files | 0 each | all formatted |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 20 pass, 0 fail |
| `npm test -- tests/view/run-screen-state.test.mjs` | 0 | 12 pass |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 | 28 pass |
| `npm test -- tests/view/end-window.test.mjs` | 0 | 15 pass |
| `npm test -- tests/view/end-window-lines.test.mjs` | 0 | 11 pass |
| `npm test -- tests/view/run-header.test.mjs` | 0 | 24 pass |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass |
| `npm test -- tests/view/tabs-area.test.mjs` | 0 | pass, 0 fail |
| `npm test -- tests/view/chronicle-game.test.mjs` | 0 | 4 pass |
| `npm test -- tests/view/chronicle.test.mjs` | 0 | pass, 0 fail |
| `npm test -- tests/view/world-area.test.mjs` | 0 | pass, 0 fail |
| `npm test -- tests/view/trip.test.mjs` | 0 | pass, 0 fail |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 75 pass |
| `npm test -- tests/sim/run-record.test.mjs` | 0 | pass, 0 fail |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | pass, 0 fail |

Every file ran once, one after another, in one background run that ended before I committed; all 15
exit codes were 0 and every output summary read `fail 0`.

Not run: the full gate (`npm test` without a file) — the cycle runs it, as the method says. The
failing `test_ruff_source_rules` and `test_shellcheck_source_rules` stand at the base, as the
handoff says, and I did not touch them.

## Own-work check

- Requirement most likely missed: "every test that holds a binding sentence, in whole or in part,
  carries a line `decision:`", and its reverse, that a *Verification* clause `tests:` claims no
  part without a line under it.
- Checks: (1) counted the added lines by decision and sentence: all 17 binding sentences of the six
  decisions (D-311 5, D-324 3, D-368 3, D-369 2, D-370 2, D-371 2) have at least one line (1 to 17
  lines each); (2) checked that every added line follows a `test(` line or another leading line
  `decision:`; nothing turned up; (3) searched the tests a second time by content, not number
  (`setWindow|windowShown|openWindow|closeWindow|end-window`, `Koniec przejścia`, `Ostatnie minuty`,
  `najdłuższa passa`, `longestStreak|minutesByAction|enteredWith`, `end-question`,
  `Zapisać, odrzucić`, the window test names): every file it found was either judged case by case
  or only builds a state with these fields (`tests/sim/encounters.test.mjs`,
  `tests/sim/skills.test.mjs`) or puts the record in a key list (`tests/sim/loop.test.mjs:207`,
  whose case belongs to D-22 and D-241; see below); (4) searched for any test of the CSS layout
  (`grid-column|grid-row|grid-area|two columns|1074`, `backdrop`, `end-window` outside the window
  tests): none, which is why the pairs stay for the columns and the window's place, size and
  scrolling.
- Result: no sentence left without a line; no part claimed in a clause `tests:` without a line.

## Rows of the decisions (item 6)

The case lines are those at commit `0e2e6970`; the full list (94 cases, each with its sentences) is
kept beside this report in `executor-35-cases.txt`. S1, S2 … are the binding sentences in order.

### D-311 — how the screen of a map run is laid out

- S1 ("The screen of a map run has two columns under one header", up to "opens in place under its row (D-288)") — held in part:
  - `tests/view/run-screen.test.mjs:222` "the header stands above three areas of their own in the order world, program and tabs…"
  - `tests/view/run-screen.test.mjs:363` "an open rule panel stands in the program under its header…"
  - `tests/view/run-screen.test.mjs:430` "at the first chill „Dodaj regułę z tym” adds „Zawsze → Wędruj”…"
  - `tests/view/tabs-area.test.mjs:144` "the area under the drawing holds the tabs Kronika and Teren with Kronika picked first…"
  - `tests/view/chronicle-game.test.mjs:228` "„Zakończ” clears the chronicle and a new send starts with Kronika and Wszystko picked"
  - `tests/view/rule-editor.test.mjs:1673` "a list given a panel draws it right after the open row…"
  - `tests/view/rule-editor.test.mjs:1696` "a list given a panel draws it right after the open header…"
  - Not held: the two columns themselves, the world with the area of the tabs under it on the left and the program on the right (CSS; jsdom checks only the order of the areas).
- S2 (the world from the top) — held in whole, as to the order of the parts: `tests/view/world-area.test.mjs:202` "the world area stands from the top: the scene, Teraz, Potem, the body row…". What the body row says ("the minutes each need lasts") is D-337's, which slice 34 marked.
- S3 (what the header holds) — held in whole:
  - `tests/view/run-header.test.mjs:110` (the list in order), `:160` („Wznów” in place of „Pauza”), `:250` and `:273` („Koniec przejścia”, „Restart”, „Zakończ” after a death or a completion), `:297` („Koniec przejścia” opens the window), `:362` (the warning after „Restart”, before „Zakończ”)
  - `tests/view/run-screen.test.mjs:222` (the clock in the header, no area)
  - `tests/view/end-window-game.test.mjs:727`, `:763`
- S4 (the window over the screen, header included; the lines of the end in it and not in the world area; „✕” and Escape; reopening at every entry; closing at the question) — held in part:
  - `tests/view/run-screen.test.mjs:848`, `:899`; `tests/view/run-header.test.mjs:335`
  - `tests/view/run-screen-state.test.mjs:65`, `:143`
  - `tests/view/end-window-game.test.mjs:408`, `:448`, `:578`, `:727`, `:864`
  - `tests/view/end-window.test.mjs:231` (the line of the cost in the window)
  - `tests/view/world-area.test.mjs:202` and `tests/view/trip.test.mjs:389` (no line of the end in the world area)
  - `tests/view/end-question.test.mjs:344` (no window while the question stands)
  - Not held: the window standing "under the menu bar and the row of warnings below it" (the window tests' header comment leaves the menu bar to the browser).
- S5 (opens once the scene's effect has played; at once at an entry, after a reload or a load, under reduced motion) — held in whole:
  - `tests/view/run-screen-state.test.mjs:92`, `:107`, `:130`
  - `tests/view/end-window-game.test.mjs:408`, `:472`, `:507`, `:544`, `:608`
- Invariants: none.
- *Verification*: pair rewritten (columns, and the window under the menu bar).

### D-324 — the map run and the screen while the question of „Zakończ” stands

- S1 (paused as „Pauza” pauses it; „Wróć” puts it back) — held in whole:
  - `tests/view/end-question.test.mjs:344` "„Zakończ” with unsaved changes asks at every moment…" (paused, no minute passes)
  - `tests/view/end-question.test.mjs:561` "„Wróć” closes the question and puts the map run back as it was…" (going on, paused, the stop at a discovery)
  - `tests/view/run-screen-state.test.mjs:159` "the question remembers whether the map run went on…"
- S2 (the rest of the screen works; when the question goes; „Wznów”, „Restart”, „Koniec przejścia”) — held in whole:
  - `tests/view/end-question.test.mjs:661` (paces, a second „Zakończ”, „Wznów” of the header and of the band, „Restart”), `:715` (the four panel buttons), `:791` (an edit back to the program), `:884` (the list „Program:” leaves it standing)
  - `tests/view/run-screen-state.test.mjs:179`, `:191`
  - `tests/view/end-window-game.test.mjs:777` („Koniec przejścia” closes the question and opens the window)
- S3 (leaving the screen; memory of the page; reload) — held in whole: `tests/view/end-question.test.mjs:612`, `:637`.
- Invariants: none.
- *Verification*: pair removed.

### D-368 — what the end-of-run window says, how it opens and closes

- S1 (opens of itself, covers with its header, not the menu bar; the order: title, longest streak, discovery, line of what the end gave or cost, sections, buttons) — held in part:
  - `tests/view/run-screen-state.test.mjs:92`; `tests/view/end-window-game.test.mjs:408`, `:448`, `:1083`
  - `tests/view/run-screen.test.mjs:848`; `tests/view/run-header.test.mjs:335` (covers with the header)
  - `tests/view/end-window.test.mjs:168` (label „Koniec przejścia” above the title, the title's words and role), `:231` (streak, discovery, cost, in this order)
  - `tests/view/end-window-lines.test.mjs:71` (the three causes, the completion text in `positive`), `:106` („najdłuższa passa 116/480”), `:234` (the discovery where there is one)
  - Not held: "but not the menu bar nor the row of warnings under it"; the sections of why standing after the line of what the end gave or cost (no case checks that order).
- S2 (each section of why only where it has content, and what each holds) — held in whole:
  - `tests/view/end-window.test.mjs:376`, `:455`, `:498`, `:545`
  - `tests/view/end-window-lines.test.mjs:270`, `:293`, `:365`
  - `tests/view/run-screen.test.mjs:973`; `tests/view/end-window-game.test.mjs:688`
  - `tests/view/chronicle.test.mjs:715`, `:745`
- S3 (scrolling with buttons fixed at the bottom; the buttons; „✕” and Escape; „Koniec przejścia”; reopening at every entry, menu bar and reload) — held in part:
  - `tests/view/end-window.test.mjs:568` (buttons after the scrolling part, „Otwarte” only after a completion that opens a map), `:614` (the warning between „Restart” and „Zakończ”), `:653`, `:678`
  - `tests/view/end-window-lines.test.mjs:398`
  - `tests/view/run-screen.test.mjs:899`, `:920`; `tests/view/run-screen-state.test.mjs:65`
  - `tests/view/end-window-game.test.mjs:448`, `:578`, `:608`, `:727`, `:1053`
  - Not held: the window actually scrolling in itself while the buttons stay fixed at its bottom (CSS; the file's header comment leaves it to the browser).
- Invariants: none.
- *Verification*: pair rewritten (menu bar, place of the sections, scrolling).

### D-369 — the record a manual map run keeps for the window

- S1 (the three things, where they are kept and how they are counted) — held in whole:
  - `tests/sim/run-record.test.mjs:81`, `:102`, `:114`, `:131`, `:162`, `:185`, `:225`, `:261`, `:283`, `:293`, `:314`, `:328`, `:344`, `:387` (none in an earning loop's map run)
  - `tests/sim/saved-game.test.mjs:2214` (an earning loop's map run carrying the record refused), `:2234` (the record loads back whole)
  - `tests/view/end-window-game.test.mjs:1083` (the longest streak read back from a saved document)
- S2 (the record starts at the start and at „Restart”; what the load refuses) — held in whole:
  - `tests/sim/run-record.test.mjs:81`, `:358`
  - `tests/sim/saved-game.test.mjs:2214` (the crafted table: longest streak 15 and 213, the counts off the list or not summing, the items out of order or above 15), `:2262` (the edges admitted)
- Invariants: none (`save-version` derives from D-206 and D-401, not D-369, so its cases get lines).
- *Verification*: pair removed.

### D-370 — how the window covers the screen, and the keyboard

- S1 (header and areas not shown but kept; place, width, height, no backdrop; heading and buttons fixed; page at its top) — held in part:
  - `tests/view/run-screen.test.mjs:848`, `:873`, `:1008`; `tests/view/run-header.test.mjs:335`
  - `tests/view/end-window-game.test.mjs:408`, `:640`
  - `tests/view/end-window.test.mjs:568` (heading, middle part and buttons as a column)
  - Not held: the window under the menu bar and the row of warnings, as wide as the content column, as tall as its content up to a part of the browser window, with no backdrop, its heading and buttons actually staying fixed while the middle scrolls.
- S2 (focus, Escape in the window, no trap, focus to „Koniec przejścia”) — held in whole:
  - `tests/view/end-window.test.mjs:168` (no `aria-modal`), `:678`, `:706`
  - `tests/view/run-screen-state.test.mjs:262`; `tests/view/end-window-game.test.mjs:640`, `:727`
  - `tests/view/run-screen.test.mjs:899`
- Invariants: none.
- *Verification*: pair rewritten (place, size and look).

### D-371 — who remembers that the window is open, and „Koniec przejścia”

- S1 — held in whole:
  - `tests/view/run-screen-state.test.mjs:65`, `:92`, `:130`, `:143`
  - `tests/view/end-window-game.test.mjs:578`, `:608`, `:727`, `:864`, `:960`, `:1053`
  - `tests/view/end-question.test.mjs:344`
- S2 — held in whole:
  - `tests/view/run-header.test.mjs:297`
  - `tests/view/end-window-game.test.mjs:408`, `:525` (opens at once during the wait), `:727`, `:763`, `:864`
- Invariants: none.
- *Verification*: pair removed.

## Pairs added or rewritten (for the human to accept at the merge)

D-311 (rewritten):

> For the two columns and the place of the window under the menu bar, an agent compares a change with the part no invariant and no test holds:
> - complies: on the screen of a map run of Las in a window 1280 px wide, the world and under it the area with the tabs in the left column and the program in the right column; after a completion the window standing under the menu bar and the row of warnings, the menu bar in sight above it
> - violates: the program standing under the world in a window 1280 px wide; the tabs standing in the column of the program or in a third column of their own; the window covering the menu bar or the row of warnings

D-368 (rewritten):

> For the menu bar, the place of the sections and the scrolling, an agent compares a change with the part no invariant and no test holds:
> - complies: after a completion of Las the menu bar and the row of warnings standing above the window; the sections of why under the line „Do skrzynki: …”; with many rules that never fired the sections scrolling while „Restart”, „Zakończ” and „Otwarte: Las — głębiej →” stay fixed at the bottom of the window
> - violates: the window covering the menu bar; a section of why standing above the line of what the end gave or cost; the buttons scrolling away with the sections

D-370 (rewritten):

> For the place, the size and the look of the window, an agent compares a change with the part no invariant and no test holds:
> - complies: after a death the window standing under the menu bar and the row of warnings, as wide as the content column of the screens; a window with many rules that never fired as tall as a part of the browser window, its middle part scrolling while „✕”, „Restart” and „Zakończ” stay in sight
> - violates: the window wider or narrower than the content column of the screens; a dimmed backdrop; the window taller than the browser window, its buttons below the lower edge; the buttons or the heading scrolling away with the sections

Pairs removed: D-324, D-369, D-371. No pair added to a decision that had none.

## Tests in files the slice's *Change* does not name (item 5)

- `tests/view/run-header.test.mjs` — D-311, D-368, D-370, D-371; `npm test -- tests/view/run-header.test.mjs` exit 0.
- `tests/view/end-question.test.mjs` — D-324, D-311, D-371; exit 0.
- `tests/view/tabs-area.test.mjs` — D-311; exit 0.
- `tests/view/chronicle-game.test.mjs` — D-311; exit 0.
- `tests/view/world-area.test.mjs` — D-311; exit 0.
- `tests/view/trip.test.mjs` — D-311; exit 0.
- `tests/view/rule-editor.test.mjs` — D-311; exit 0.
- `tests/view/chronicle.test.mjs` — D-368; exit 0.
- `tests/sim/run-record.test.mjs` — D-369; exit 0.
- `tests/sim/saved-game.test.mjs` — D-369; exit 0.

The view files belong to `browser-view`, whose styleguide the *Read* names (see Unread material); the
sim files belong to `simulation`, whose guidelines are `guidelines/coding.md` and
`guidelines/testing.md`, also in the *Read*.

## Choices, with the way rejected

- **A test that only uses a control or a line to reach its own subject gets no line** (the R4
  reasoning applied to controls and lines, not only to roles). Examples:
  `tests/view/end-window-game.test.mjs:800` („Restart” of the window, D-62's subject) gets no D-368
  line, and `tests/view/end-window-game.test.mjs:1161` (D-216 lines after a reload) and
  `tests/view/end-window.test.mjs:281` and `:333` (D-185/D-216 wording) get no D-368 line. Rejected:
  a line at every case that would fail if the window lacked the control; that would spread lines
  over many cases whose subject is another decision. Cost if wrong: a few cases stand without a line
  for a part other cases already hold; no part is left unheld.
- Also left unmarked as only mentioning or only using: `tests/view/run-screen.test.mjs:318` (D-281:
  the clock of the given run), `tests/view/status-row.test.mjs` (the clock's text, D-122; it does
  not check where the clock stands), `tests/view/tabs-area.test.mjs:195` (D-346's hover link),
  `tests/view/world-area.test.mjs:749` (the paragraph of the last encounter is not in D-311's binding
  sentences, only in its rationale and pair), `tests/view/scene.test.mjs:2154` (the scene telling
  the game view the effect ended: D-322's wiring, not the window), `tests/view/end-window.test.mjs:215`
  and `tests/view/run-screen-state.test.mjs:81` (no window without an end: the reverse of D-368 S1,
  which no binding sentence states), `tests/sim/loop.test.mjs:207` (the record's keys as a filter in
  a D-22/D-241 case), `tests/view/run-screen-state.test.mjs:209` (the end drops the question: in
  D-173, not D-324's sentences), the D-62/D-122 lines in `tests/sim/body.test.mjs`,
  `completion.test.mjs` and `discovery.test.mjs` (they only quote D-368 inside another decision's
  sentence).
- **D-324 S2 judged held in whole.** The clause "the buttons of the panel of the copy act and leave
  the question standing" is held by the panel buttons acting (`end-question.test.mjs:715`), the list
  „Program:” (`:884`) and the rule panel of a group (`:791`) leaving the question standing. No case
  presses a panel button that keeps unsaved changes and then checks that the question stays.
  Rejected: keeping a pair for that sliver. Cost if wrong: one narrow case unguarded and no example.
- **D-311 S2 judged held in whole as to the order.** "with the minutes each need lasts" describes the
  body row, whose content is D-337's (slice 34); I did not add D-311 lines to the body-row tests.
- The quotation for each sentence is its opening words (one per sentence across all cases). I kept
  existing mentions of numbers and existing lines `decision:` untouched, and put new lines after the
  leading lines `decision:` of a case.

## Reaches beyond the dispatch

- `tests/view/end-question.test.mjs`, `run-header`, `tabs-area`, `chronicle-game`, `world-area`,
  `trip`, `rule-editor`, `chronicle`, `status-row`, `scene`, `account-screen`, `discovery-band`
  (view) and `tests/sim/run-record.test.mjs`, `saved-game.test.mjs`, `loop.test.mjs` (sim): read by
  case to judge tests of my decisions found by number or by content, as item 2 asks.
- `foundations/invariants.md`, entry `save-version` and a grep for the six numbers: to see whether an
  invariant derives from my decisions (none does), which decides R1 for the cases in
  `saved-game.test.mjs` marked `invariant: save-version`.
- `.the-way/elements/common/foundation_check.py:700-737`: to see how `held by nothing` is reported,
  since the base run printed only `0 errors`.
- `.the-way/task-cycle/change/slice.md`, as the method's row for a slice names it.

## Working copies

- `.runs/executor-35/` held the insertion script, the per-file outputs of the test runs, and a
  temporary backup of `tests/view/trip.test.mjs` for the positive control (restored from it).
  Removed with `rm -rf`. Kept beside this report: `executor-35-add_lines.py` (the insertion script,
  with the full table of cases and quotations) and `executor-35-cases.txt` (each marked case with its
  line at `0e2e6970`, its name and its sentences).
- `.runs/fc-35-base.txt`, the output of the base foundation check, which I wrote directly under
  `.runs/` instead of in my directory: removed. It held only `0 errors`.
- No remainder.

## Unread material

- `guidelines/styleguide-browser-view.md` (986 lines): not read whole. I read only a grep for
  comments, `Source:` and the *Decision* lines of its sections (lines 50–857 of matches); I read none
  of its sections in full. The slice adds only comment lines to tests. Their form follows the lines
  `decision:` already in the same files, and prettier passes on every file.
- `guidelines/coding.md` (330 lines): not read whole; read only by a grep for comments and
  `prettier-ignore` (lines 32–35, 88–91). The rules found there (no silencing comments, prettier
  layout, no `prettier-ignore`) were checked: prettier passes.
- `foundations/part_map.md` and `foundations/glossary.md`: not read. The part of each changed file
  is plain from the path (`tests/view/*` browser-view, `tests/sim/*` simulation), as item 5 gives it.
  No term needed the glossary.
- `.the-way/elements/decisions/template.md`: read lines 105–264, which hold the named passages
  111–127, 162–166 and 220–260.
- `.runs/task-cycles/.../task-frozen.md`: read whole. `plan.md`: only the passages the handoff copies,
  plus a grep for the slices that name related test files.
- `guidelines/testing.md`: read whole.
- The *Read*'s D-73 and D-82: read whole.

## Searches not found or unclear

- The base `foundation_check.py` printed only `0 errors` and no `held by nothing` list at all. The
  six decisions all carried a pair, so none was listed. Not an error; noted because the handoff
  expected a list.
- No test checks the CSS layout of the map-run screen (two columns) or of the window (place under
  the menu bar, width, height, backdrop, fixed buttons while scrolling). Searched for `grid-column`,
  `grid-row`, `grid-area`, `two columns`, `1074`, `backdrop`, `end-window` outside the window tests.
  Hence the three rewritten pairs.
- No test checks that the sections of why stand after the line of what the end gave or cost (D-368
  S1's order). `tests/view/end-window.test.mjs:231` orders the streak, the discovery and the cost
  only. Left to the D-368 pair.

## Remarks on wording (R3)

- None found against the code. I did not compare the binding sentences with the product code beyond
  what the tests show. The tests and the sentences agree on every point judged.
- A remark on the plan: its *Checks* name the five files of the *Change* and "every file reached
  beyond them". I ran all 15 one by one, as given; the full gate was not run (WAY-160).
