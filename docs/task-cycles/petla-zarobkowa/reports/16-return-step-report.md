# Report — return step, task `petla-zarobkowa`

**Status:** `done with concerns`

No code changed. No question goes to the human as a block: no row's meaning failed to hold, and two
decisions collide nowhere with no precedence recorded. The concerns stand at the end; each is a matter
the request should put before the human, none stops the cycle.

## Files and commits

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 26 | 22 |
| `foundations/glossary.md` | 6 | 0 |
| `foundations/invariants.md` | 1 | 1 |
| `guidelines/coding-saved-game.md` | 7 | 4 |

- Commit `42784ca` on `task/petla-zarobkowa`, address `the owner's address`, base `34417de`. Not pushed.
- Worktree clean. The pin `.the-way` stays at `a8dfe8a`.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py`, before the work, at `34417de` | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py`, after the commit | 0 | `0 errors` |
| `npm run build`, for the measurement below; output ignored by git | 0 | |
| `node <scratchpad>/size.mjs`, the measurement of M-9 | 0 | below |

Not run: the product's gate (`npm test` with no file), as the handoff gives. No focused test: no code
and no test changed. No invariant's meaning changed, so no test was seen failing; `catch-up-minutes`
changed one name (below), and its citing tests at `tests/sim/catch-up.test.mjs:217`, `:240` stay true.

The measurement, because D-208 needed a value the sources did not give for the code as it stands: the
body of a save at game minute 300 with the 17-rule program of `tests/sim/acceptance.test.mjs`, a team
of only the characters in loops, an empty report, one round through JSON, every document loading.

| Map | Loops that fit under 65,536 bytes | Next one |
|---|---|---|
| Las | 12, 62,275 bytes | 13, 67,249 bytes |
| Las — głębiej | 10, 60,769 bytes | 11, 66,598 bytes |

On Las — głębiej some runs had died and begun again, so their minutes run from 2 to 300, not all 300.
The whole review's figure for Las, 62,179 bytes at 12 loops, agrees within 100 bytes.

## What was compared

- Written or changed by the change: D-22, D-44, D-62, D-71, D-93, D-132, D-164, D-183, D-189, D-190,
  D-194, D-200, D-207, D-208, D-209, D-222 to D-234; `catch-up-state`, `catch-up-minutes`,
  `catch-up-death-moment`, `loop-run-knowledge`, `trip-run-end`; `earning loop`, `catch-up`, `save time`.
- Named by the task: D-04, D-07, D-21, D-39, D-50, D-53 to D-56, D-118, D-119, D-122, D-123, D-168,
  D-170, D-179, D-188, D-191, D-204, D-206, D-209, D-211, D-212, D-213; `map-run-repeatability`,
  `simulation-randomness`, `minute-span-split`, `player-map-run-pace`, `simulation-isolation`,
  `simulation-inputs`, `restart-seed`, `save-version`, `trip-transfer`, `saved-program-edit`,
  `solved-map-manual-run`.
- The search: the binding part of each of D-01 to D-221, and every invariant whose *Part* names
  `simulation`, `browser-view` or `every`, against `src/browser/sim/loop.ts`, `clock.ts`,
  `game-saver.ts`, `game-view.ts`, `away-report.ts`, and the diff of `headquarters.ts`, `trip-lines.ts`,
  `game.ts`, `types.ts`, `trip.ts`, `random.ts`, `balance.ts`; `saved-game.ts:1000-1055`.
- The part map of `simulation` and `browser-view`, whole; the headings of the environment facts and a
  search of them for the clock and the page's hiding; the-way's glossary headings (WAY-104); the
  projected entries of `definicja_mvp_loop2.md`, by a search for `earning loop`, `catch-up`, `time away`.

## What no longer matched, and its correction

| Entry | What was wrong | Correction |
|---|---|---|
| D-229 (M-8) | "stopped" read widely takes in the player's „Zatrzymaj” of D-228, yet the code closes a line only at a stop by a death: `loop.ts:176-202` writes nothing to the report, `:476-483` closes | "a death stopped" in the binding sentences, the examples and *Rationale*; a new complying example: „Zatrzymaj” leaves the line open, and a later earning loop's return adds to it. Wording only: rows 10 and 24 speak of „śmierć bez wskrzeszenia” |
| D-208 (M-9) | *Rationale*: "at most about 10 earning loops on Las or 8 on Las — głębiej" was measured with a copy in the save; the code holds none (D-224), and 12 fit | "about 12 … or 10", the measurement above. The words "in practice fewer" stay |
| D-232 | D-121, D-143 and D-198 say a chill, the first wolf attack and tiles revealed by Zwiad enter the Understanding, the second with the game paused; a map run of an earning loop does none of it, and no link said so | `narrows D-121 · narrows D-143 · narrows D-198`. D-232's binding sentence states the area |
| D-227 | D-166 and D-174 open "During a map run", of the program panel's list and of the switch of a character, as D-171 and D-196 do; the search of the foundation step missed them | `narrows D-166 · narrows D-174`. D-227's binding sentence states the area |
| `coding-saved-game.md`, *Przebieg mapy po wczytaniu* | "Przebieg mapy, który trwał, wraca zatrzymany" is false of a loop's run, which `saved-game.ts:1024-1029` admits only going on, with no pause and no pace | The sentence now speaks of the manual map run; the loop's run and the save time have a sentence each. This is the sentence the spec left to the maker |

New: glossary `loop clock`. A reader who knows games takes it for the timer of the game loop; here it
is a stored date up to which whole minutes were counted. Its definition comes from D-225's binding
sentence, and its uses in D-225, D-231 and the code agree. `catch-up-minutes` said "the clock of the
earning loops" for the same thing, and now uses the term, with no change of meaning.

- Before: "… takes nothing and starts the clock of the earning loops from that reading."
- Now: "… takes nothing and starts the loop clock from that reading."

Nothing no longer matched in the other entries. Rows 1 to 26 and the projected entries stand as
`04-foundation-report.md` gives; no row or projected entry the code makes true was missed. The
projected entries of the task's source that name an earning loop or the catch-up are those the task
names, plus entries the log already holds: *How is the work of the game split…*, D-07; *What is the
game built with?*, D-04; *How do items go into a map run…*, D-179.

- Part map: no change. `src/browser/sim/loop.ts` and `src/browser/view/away-report.ts` fall under the
  parts' globs, the trust boundary stands on `src/browser/sim/saved-game.ts`, and the new imports go
  within the allowed dependencies.
- Environment facts: none written. The change reads the date and a next reading, and says nothing of
  sleep or timers (spec, *Foundation entries*); the 64 KiB and the hiding rest on the two facts already
  held.
- Decisions written: none new. Choices that bind after the merge: none; see *Choices* for the focus.
- *Files of this kind* tables: left. The template gives a file added after the audit no row until the
  guidelines are refreshed (`.the-way/product-guidelines/coding/template.md:166-169`).
- The styleguide: left. „Zatrzymaj” stands in its list, and the heading's `tabindex="-1"` breaks no
  rule: Tab does not reach it, so D-47 counts it no control, and the one outline rule draws its focus.

## One sentence of each meaning, for the request (WAY-114)

- D-229: Słowo „stanęła” w sekcji raportu znaczy pętlę zatrzymaną śmiercią, a „Zatrzymaj” zostawia linię otwartą, więc następny powrót kolejnej pętli tej postaci do niej się dodaje.
- D-208: Limit zapisu mieści około 12 pętli na Lesie albo 10 na Lesie — głębiej, a w praktyce mniej.
- D-232: Przejście pętli niczego nie odkrywa także wbrew D-121, D-143 i D-198, które mówią o przejściu ręcznym.
- D-227: To, co panel programu pokazuje w trakcie przejścia, także według D-166 i D-174, dotyczy przejścia ręcznego.
- `loop clock`: Data trzymana przez widok poza stanem gry, do której policzono pełne minuty pętli.
- `catch-up-minutes`: Bez zmiany znaczenia; zegar pętli nazywa się terminem `loop clock`.

## Own-work check

The requirement this work most likely missed: a sentence of the log an earning loop makes false that
no link joins, since the whole review did not read most of the log. Check: every binding part of
D-01 to D-221 read one after another, then a script listing each decision whose binding part says
"during a map run", "in a map run", "game time stops", "the game paused", "discovery pause" or "a map
run passes", with its *Relations*. It showed 15 entries; two not yet linked (D-166, D-174) and, from the
reading, three (D-121, D-143, D-198). The limit of that check stands under *Concerns*, item 4.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| D-221, whole | `foundations/decisions.md` | `passLoops` and `catchUp` take real moments and pass game time. They match: they are callers, `advanceLoopRun` takes no moment and `endLoopRun` settles (D-221, *Rationale*: "every caller … the computing of time away included") |
| The elements' templates and skills | `.the-way/elements/decisions/`, `glossary/`, `invariants/`, `common/way_of_working.md` | What writing an entry asks |
| WAY-11, WAY-33, WAY-36, WAY-104, WAY-126, WAY-134 | `.the-way/foundations/decisions.md` | What the step compares and what a finding becomes |
| `.the-way/task-cycle/skill/SKILL.md:315-354`, `record_template.md:145-174` | pin | What follows the step, and the questions table |
| `.the-way/product-guidelines/coding/template.md:156-177` | pin | Whether a file of a kind needs a row |
| `tests/sim/acceptance.test.mjs:1-110`, the two fixtures | tests | The program for the measurement |
| `C:\Storage\The Brain\The Brain\.ai\rules\git.md`, `scripts.md`, `knowledge_artifacts.md` | the owner's rules | Commit, scripts, the sentence in a guideline |

## Searches not found or unclear

- `catch-up` against D-230: see *Concerns*, item 1.
- D-21, D-122 and `player-map-run-pace` say "a map run the player starts", and the player starts an
  earning loop's first map run with „Puść w pętlę”. The task keeps D-21 and D-122 as they stand, and the
  glossary's `manual map run`, D-222 and D-233 settle the reading, so no correction.
- A word for "the open game" (D-225, D-229): plain English here; it takes no entry.

## Choices, each with the way rejected and its cost if wrong

These are for the questions table: none binds after the merge.

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| Focus after „Zamknij” goes to the heading „Drużyna” (Slice 6) stays a choice of the change, with no entry | A sentence in D-229 or the styleguide. A general rule that a control leaving the screen hands on focus is false of „Zatrzymaj” (M-6), and a rule for one button binds nothing later | A later change of the section moves the focus; the test in `tests/view/account-screen.test.mjs` still asks that it lands inside the headquarters |
| `catch-up` keeps its projected wording | A wider definition, see *Concerns*, item 1 | The glossary stays a shade narrower than D-230 |
| D-229's *Rejected* and the accepted cost left as they are | Rewriting each "stop" there | None: they speak of the lines of the section, which D-229 now scopes |
| D-208's number replaced, while D-207's 1440 is not | Leaving both | The accepted cost now reads smaller than the one the human saw in Q12 (see *Concerns*, item 3) |
| `catch-up-minutes` reworded to the term | Keeping two names for one thing | One name; no test moved |

## Concerns

1. **M-2, `catch-up`, not corrected.** The entry says "while the game was closed", and D-230 runs it
   after a save lost to another browser's, with the tab open. The definition is projected whole
   (WAY-126), and the task commands both it and row 25, so no question arises under the foundation
   step. D-230 states the wider set in its binding sentence, so no reader is misled about behaviour.
   Changing the word here would part the foundation from the approved definition, whose change has a
   gate and a check of the plan. The reviewer's reading stands: a later change of the definition can
   take it.
2. **M-1 stays for the human.** D-207's *Rejected* says "about 1440 saves a day" of a 30-second rhythm,
   which is 2880. The source is Q11 (`task.md:182`), and the way stays rejected at either number.
3. **The new numbers in D-208 stand beside Q12.** The human accepted "około 10 pętli na Lesie albo 8 na
   Lesie — głębiej"; the entry now reads 12 and 10, from the code as it stands. It is an estimate at one
   game minute with one program, as the words "in practice fewer" keep saying, and no behaviour rests
   on it. The request should show the difference.
4. **The search read binding parts.** Of D-01 to D-221 I read the binding part of each. Whole, I read
   only the entries the search found: D-121, D-143, D-166, D-174, D-198 and D-221, besides those this
   change wrote. The *Rationale*, *Rejected* and *Verification* of the others were not read, so a
   conflict that shows only there is not ruled out.
5. **Report-level findings M-3 to M-7 are not entries**, and stay for the request's lists.

## Problems

None observed. The first run of the measurement printed every document as refused: my script had put
the request's `basedOn` beside the document. With `revision`, as the server's answer holds it, each
loaded; the byte counts differ by one.
