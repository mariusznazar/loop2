FAIL 1d8caf1710408bd57940048892bd9c19fc75640b

# Review of the whole change — poprawki kodu z przeglądu fundamentu

Range `e7b3d071d7877c005c33f432d41860cc818361f5..1d8caf1710408bd57940048892bd9c19fc75640b` (5 commits: `ea35311f`, `b87424d0`, `881f1a4a`, `79deca06`, `1d8caf17`). `git rev-parse HEAD` in the worktree is `1d8caf17…`, the head given. `.the-way` stands at the pinned `bfb2e109…`. One author, no plan, no slices: every finding comes from no slice, it is a finding of the change as a whole.

Counts: blocking 2 (Important), Minor 2 (both within the task), out of scope 0 findings (the lines of *Declined to judge* count as out of scope).

## Important

### I-1 — Settlement row 2, a glossary term, is not recorded as an entry of its own

- Place: `foundations/glossary.md:87-91` (only a *Not* added to `headquarters`; no entry for the new term); the author's choice at `.runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/reports/author-report.md:58` ("The new word "at the camp" gets no entry of its own … Rejected: an entry `camp`").
- What is wrong: the task's *Settlements to record*, row 2 (`task.md:92`), is of the kind **glossary term**: "Postać jest „at the camp” / „w obozie”, gdy nie jest ani w ręcznym przejściu (idącym, w pauzie albo skończonym i czekającym na „Restart” lub „Zakończ”), ani w pętli zarobkowej; „Siedziba” nazywa tylko ekran." Its column *What the cycle would otherwise guess* names exactly the choice the author then made by itself: "czy nowe słowo dostaje własne hasło słownika, czy żyje tylko w *Not* hasła `headquarters` i w D-389". The human accepted the row with the task, so the cycle was not to guess it. The-way's glossary template says the human accepts the meaning "of a term written whole from an accepted row of a task's *Settlements to record* with the task document" (`.the-way/elements/glossary/template.md:59-61`, WAY-114), and where an agent judges that a word takes no entry, `decide_entry.md:14-15` has it "show the human why, with the uses, and stop once they agree". The author neither wrote the entry nor asked; it overrode an accepted settlement with its own reading of the template's narrow-meaning test.
- Why it matters: a sentence the files hold reads wrongly without the entry. After the change "camp" names two things: the picture band ("The camp at the top of Siedziba is a band …", "a camp with none shows the fire and the chest alone", `foundations/decisions.md:9725, 9734-9735`; "The camp of the state", `src/browser/view/camp-picture.ts:68`) and the place of a character ("The characters that stand in it are those at the camp, a character being at the camp where it is neither …: the first of them … that the band holds …, the rest standing in the picture nowhere", `foundations/decisions.md:9730-9734`; "Whether the character is at the camp", `src/browser/view/camp-picture.ts:60`). A reader who takes "at the camp" as "drawn in the camp" reads D-389's "the rest standing in the picture nowhere" as a contradiction, and reads the members comment "The characters at the camp, … no more than the widest band holds" (`camp-picture.ts:25`) as a definition of the place by the band's capacity. That is the confusion of the very word the task renamed (F-32: "grozi narysowaniem w obozie postaci, która jest w przejściu").
- Evidence: `git show 1d8caf17 -- foundations/glossary.md` (one line changed, the *Not*); `task.md:89-92`; `author-report.md:58`.
- Fix: write the entry for the term as the row gives it, through `the-way-record-glossary-term`, with the qualifier of a manual map run "going, paused or ended and waiting for „Restart” or „Zakończ”" in its definition; or, if the fix finds that the-way's rules forbid an entry here, stop and put that to the human as a question with the uses, rather than drop the accepted row.

### I-2 — The glossary *Not* restates the place without its qualifier

- Place: `foundations/glossary.md:91`: "the place where a character stands that is in neither a manual map run nor an earning loop — "at the camp"".
- What is wrong: the row it records (`task.md:92`) and D-389 (`foundations/decisions.md:9731-9732`) both say that a manual map run counts "going, paused or ended and waiting for „Restart” or „Zakończ”". The *Not*, an entry this change writes, drops that qualification. A manual map run that has ended is easily read as no longer being one (a character "in neither a manual map run …" then includes the character of an ended run waiting for „Restart”), which is the case `tests/view/camp-picture.test.mjs:63-81` ("the character of a manual map run is away while the run goes, is paused or has ended") exists to guard.
- Why it is Important: `review-change` section 3 (WAY-263): a change's entry that restates a foundation entry more broadly or without a qualification is Important. The fix of I-1 settles it if the new entry carries the qualifier and the *Not* points to it.
- Evidence: `foundations/glossary.md:91` against `foundations/decisions.md:9730-9732` and `task.md:92`.

## Minor

### M-1 — The invariant test's own description is not brought up to its new scenarios (within the task)

`tests/invariants/test_player_map_run_pace.py:13-15` says the driver records "the map run's game minute, whether the game is paused, the pace (`pace`), the real time carried over (`realMsCarry`) and whether the game holds a discovery"; it now also records `dead` (and already recorded `completed`, line 328-329), which the death scenarios assert (lines 400-402). Lines 18-20 say "the discovery scenarios alone start from the new game `newGame()` gives"; the three death scenarios start from it too (`BARE_START`, lines 437-447). The task (To do 1) rewrites this description, so the reader of the description is the one misled. Fix: name the two recorded fields and the death scenarios among those that start from the bare game.

### M-2 — A comment of the logout case claims what the case does not check (within the task)

`tests/view/game-saver.test.mjs:616-617`: "„Wyloguj” works again: the next save before logout is a request of its own, and the retries under that sentence go on." The case asserts the second `saveBeforeLogout` is sent and answered (lines 619-622), but nothing about retries going on under „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” (the second save is made at once, before any retry is due, and `cancelRetry` drops the planned one). Likewise the first case checks the retry at 5 s only (lines 582-588), not the 10/20/30 s steps of D-208's rhythm; the rhythm is shared code (`scheduleRetry`) already covered by the older cases, so that half is coverage, not a gap. Fix: drop the retry clause from the comment, or assert a retry at 5 s before the second `saveBeforeLogout`.

## What I checked and found sound

- `src/browser/view/game-saver.ts:153-185`. An exception of `read()`, `withSaveTime`/`options.moment()`, `savedGame` or a synchronous throw of `client.saveGame` is caught; a rejection of the client's promise goes to the second handler of `.then(onFulfilled, onRejected)` (so an exception thrown inside `answered` is not caught there and not counted twice). Both reach `answered({kind: "failed"}, forLogout)`: `inFlight` is cleared, `failures` grows, the sentence is RETRYING or LOGOUT_FAILED, a waiting logout gets `{kind: "failed"}` (so `logOut` in `src/browser/view/app.ts:704-707` goes back to idle and „Wyloguj” works), and `scheduleRetry` plans 5/10/20/30 s. Re-entrancy traced: `saveBeforeLogout` → `sendNow(true)` throwing → `finishLogout` before the promise is returned (resolved promise, fine); a logout waiting behind a request whose answer then sends the logout's save that throws (nested `answered`, retry planned once). The error is re-raised once in a later microtask as an unhandled rejection; the author's reason (a synchronous rethrow out of `saveBeforeLogout` would leave the async `logOut` stuck on „Wylogowywanie…”) holds against `app.ts:699-707`. No path hides the error: a disposed saver ignores the outcome but still re-raises. `JSON.stringify` in `account-api.ts:520` is inside an `async` function, so its throw is the "rejection before sending" the task names. The degraded mode is set by the task as a product decision (D-208, D-97) and the error leaves its line through the last resort (coding guidelines, "Hiding a failure").
- `src/browser/sim/game.ts:873`: `paused: !mapRunEnded(run)` with `mapRunEnded` = death or completion (`src/browser/sim/run.ts:413-415`) gives D-122 ("a death is treated as a completion is", its *Rationale*) and the invariant's "paused unless the map run ends in it". Inside `advanceMinutes` no other end exists (`Zakończ`/`end` is a separate function). Views already read death before the pause (`status-row.ts:20-23, 55-58`, `scene-picture.ts:208`), and the load keeps an ended run's `paused` as saved (`saved-game.ts:1328`).
- The invariant test's new scenarios are explicit state: `patchBody` sets health 0.3 at game minute 83; the control without the patch stops paused and alive at 84, so the end there is the death's; 16x drops the carry and the rest. They fail on the base code (below) and pass on the head.
- D-208, D-97, D-323 and D-389 against the task: the new paragraphs say what the code does; the earlier sentences stay word for word, so every `decision:` quotation still matches (`foundation_check.py` 0 errors). *Rejected* of D-208 and D-97 carry the one alternative of question 1 and nothing invented. D-323's sentence is the task's To do 3, with the same ambiguity of "that goes on" the Polish source has; its *Verification* resolves it as decisions that have the game go on, consistent with D-323's first sentence.
- Rename census over the whole tracked tree at the head (`git grep -n -I -i -w -E 'ember|bronze|inSiedziba'`, `git grep -n -I -E 'speck-(ember|bronze)|"(ember|bronze)"'`, `git grep -n -I -E '(in|at|to) Siedzib|w Siedzibie|do Siedziby|Siedzibie|of Siedziba'`): no `ember`, `bronze` or `inSiedziba` left except the npm package `ember-source` (`tests/invariants/test_browser_view_framework.py:51`); every remaining „Siedziba” is the screen (decisions D-96, D-280, D-287, D-330 and the like; styleguide lines 128, 463, 481, 532, 542, 586, 675; skills, README, CSS comments, test names). No screen use was changed by mistake: the diff touches only the place meaning. Token values and their `Source:` comments are unchanged (`src/browser/tokens.css:92-93`), and D-48 now holds.
- Structure: `change_file_sizes.py` shows `game-saver.ts` 277 → 304 (+27) and no other code file grown; `guidelines/coding.md` holds no rule of size, so no size test exists and no structure finding arises.

## Declined to judge

- English "headquarters" in rationales and verifications (`foundations/decisions.md:135`, `:170`, `:3828` "the headquarters with one character came to 3 202 bytes", `:5535`): readable as the screen; the task's census is of „Siedziba”, and D-208's rationale sentence predates the change. Outside the task.
- The path after an unhandled error in `app.ts` and `account-card.tsx`: outside the task by its *Out of scope*.
- A save-code error that recurs on every retry re-raises an unhandled rejection every 30 s: what D-208 as changed asks for; D-253 writes the line once. Not a defect of this change.
- The chain error → window `unhandledrejection` → `last-resort.ts` in a real browser: the test stands in Node's `unhandledRejection` for it; a real-browser check falls under the testing guidelines' manual category and was not run by me either.

## Checks

| Check | Result |
|---|---|
| `node scripts/build.mjs` in a worktree of the head (`.runs/review-whole/head`) | exit 0 |
| `node scripts/test-node-file.mjs tests/view/game-saver.test.mjs` (head) | exit 0 |
| `node scripts/test-node-file.mjs tests/sim/discovery.test.mjs` (head) | exit 0 |
| `node scripts/test-node-file.mjs tests/view/camp-picture.test.mjs` (head) | exit 0 |
| `node scripts/test-node-file.mjs tests/view/scene-picture.test.mjs` (head) | exit 0 |
| `node scripts/test-node-file.mjs tests/view/scene.test.mjs` (head) | exit 0 |
| `python -B scripts/test.py tests/invariants/test_player_map_run_pace.py` (head) | exit 0, 12 tests OK |
| The head's three changed test files on the base code (`.runs/review-whole/base`, base worktree with the head's test files copied in): `game-saver.test.mjs` | exit 1, the two new cases fail, 23 pass |
| same, `discovery.test.mjs` | exit 1, the new case fails, 49 pass |
| same, `python -B scripts/test.py tests/invariants/test_player_map_run_pace.py` | exit 1, the two death scenarios fail (`paused after input 2/3`), the death control and the rest pass |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts:870-877"` (head; testing guidelines, "Mutation testing") | exit 0; 13 mutants killed, 0 survived |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, 0 errors |
| `python -B .the-way/task-cycle/change_file_sizes.py e7b3d071… 1d8caf17…` | exit 0 |
| `npx eslint` on the 11 changed `.ts`/`.tsx`/`.mjs` files | exit 0 |
| `npx prettier --check` on those files and `src/browser/run-screen.css`, `src/browser/tokens.css` | exit 0 |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa tests/invariants/test_player_map_run_pace.py` | exit 0 |
| Manual: `git grep` census of `ember`, `bronze`, `inSiedziba`, „Siedziba” with prepositions, "headquarters", over every tracked file at the head | as in "What I checked" and *Declined to judge* |

Not run: the full gate `npm test` (the orchestrator's); `check_instructions.py`; the other invariant and quality tests; a real-browser check. Not run means unchecked, not passed.

## Reaches beyond the dispatch

- `.the-way/elements/glossary/template.md` and `.the-way/elements/glossary/skill/decide_entry.md`: to judge whether a settled glossary term may be left without an entry (I-1).
- `src/browser/account-api.ts:515-544` (`saveGame`), `src/browser/view/app.ts:685-724` (`logOut`), `src/browser/view/status-row.ts`, `src/browser/sim/saved-game.ts:1299-1331`, `src/browser/sim/run.ts:413`: to follow the callers and readers of the two code changes.
- `foundations/decisions.md`: D-421 whole (the stylesheets the token rename touches), D-21's binding sentence (pause and pace), and the contexts of "headquarters" at lines 135, 170, 3828, 5535.
- `tests/invariants/loop2_invariant_support.py` (`built_copy`, `ROOT`): to know which tree the invariant test builds.

## Working copies

- `.runs/review-whole/head` (git worktree of `1d8caf17`) and `.runs/review-whole/base` (git worktree of `e7b3d071`, with the head's three test files copied in), each with a junction `node_modules` to the task worktree's: junctions removed with `rmdir` (the target is intact), worktrees removed with `git worktree remove --force`; `git worktree list` shows neither, `git status --short` of the reviewed worktree is empty. Stryker's `.runs/stryker` and `.stryker-tmp` lay inside the head worktree and went with it.
- Remainder, kept as evidence: `.runs/review-whole/` holding `index.md` and `sections.md` (the decision index), and the logs `head-*.log`, `base-*.log`, `foundation-check.log`, `eslint.log`, `prettier.log`, `ruff.log`, `head-stryker.log`.

## Unread material

Decisions read whole: 9 of the index of my selection (76 listed in full, 270 by heading; sections "Saving the game state and the previous save", "Screen Mapy and Siedziba", "Screen of a map run and the end-of-run window", "Discovery and the Understanding", "Scene"; parts browser-view, simulation, product-foundation; plus D-122, D-207, D-208, D-97, D-323, D-389, D-48, D-330, D-54, D-121, D-322, D-368, D-252, D-253): D-97, D-207, D-208, D-323, D-122, D-48, D-389, D-330, D-421. The others of the index were read as index lines.

- Bearing and not read whole: D-21 (binding sentence and the start of *Verification* only); D-322 and D-368 (index lines only, on the scene and window after a death in a discovery minute); D-62 and D-132 (headings only; the views' reading of them was checked in `status-row.ts`); D-253 (index line only, the last resort writing one line).
- Guideline files: all read whole — `guidelines/coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`.
- Invariants: `player-map-run-pace` whole; `loop2-container-sprites`, `design-token-sources`, `design-token-contrast`, `browser-view-token-values` and the other invariants of `simulation` and `browser-view` not read.
- Glossary: entries `extinguished campfire` to `completion` (lines 80-139) and the list of headings; the rest not read. The-way's glossary not read.
- `foundations/part_map.md`: read whole.

## Searches not found or unclear

- Whether a *Settlements to record* row of kind "glossary term" may be met by a *Not* on an existing entry rather than an entry of its own: no rule I found says so in either direction for the kind column; I read the row's own "otherwise guess" column and WAY-114 as settling an entry of its own (I-1). If the orchestrator reads it otherwise, I-1 becomes a question for the human, not a dropped finding.
- The task's "12 wpisów danych" of `scene.ts`: the data holds 24 specks (12 of each shade), all renamed; the task's count is the count of one shade.
- `ruff` is not installed as a Python module; the copy in `.runs/quality-venv` was used.
