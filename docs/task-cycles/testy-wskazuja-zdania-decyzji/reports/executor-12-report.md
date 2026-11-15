# Executor report — slice 12 (saving the game state from the browser)

**Status:** done with concerns

The concerns are the four remarks under "Choices and concerns" (quotations that run past the held part, the extent of the lines on D-208's first sentence, the program-list component tests left unmarked, and lines added in two files the slice's *Change* does not name). None blocks the slice.

## Commits (base `e5f15269f1423b1311d8bc0a886903487c42f961`)

- `e65f22cb` test: :white_check_mark: mark the tests that hold the sentences of the decisions on when the game saves, what the player sees of saving, a save that finds no session and the pull of the previous save's programs with lines decision:
- `5c24526a` docs: :memo: name the tests of D-207, D-208, D-211 and D-401, and rewrite their pair of examples only for the part no invariant and no test holds

Author address of both: `mariusznn@gmail.com`, the same as the base commit's (`git log -1 --format=%ae`).

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 52 | 28 (only the *Verification* fields of D-207, D-208, D-211, D-401) |
| `tests/view/previous-save.test.mjs` | 26 | 0 |
| `tests/view/account-screen.test.mjs` | 22 | 0 |
| `tests/view/game-saver.test.mjs` | 19 | 0 |
| `tests/sim/previous-programs.test.mjs` | 5 | 0 |
| `tests/view/state-store.test.mjs` | 4 | 0 |
| `tests/account-api.test.mjs` | 3 | 0 |

79 lines `decision:`, each the first line of its test's body after any line `decision:` already there, as the earlier slices place them. No test's code, name or assertion changed; no mention of a decision number was removed.

Files outside the slice's *Change* (plan item 5):
- `tests/view/account-screen.test.mjs` (part `browser-view`; its styleguide is already in my *Read*): 22 lines for D-207, D-208 and D-211.
- `tests/sim/previous-programs.test.mjs` (part `simulation`; no styleguide; `guidelines/coding.md` and `guidelines/testing.md` already read): 5 lines for D-401.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0, `0 errors`, none of D-203/207/208/211/401 listed |
| same, after the lines were added and before the log edit | 0, `0 errors` |
| same, after the log edit, and again on `HEAD` `5c24526a` | 0, `0 errors`, 11 decisions listed `held by nothing` (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of the slice's |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <file>` for each of the six `.mjs` files | 0 each |
| `npm test -- tests/account-api.test.mjs` | 0 (32 pass, 0 fail) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 (20 pass) |
| `npm test -- tests/view/previous-save.test.mjs` | 0 (44 pass) |
| `npm test -- tests/view/state-store.test.mjs` | 0 (12 pass) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (131 pass) |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 (19 pass) |
| `git diff -U0 e5f15269f1423b1311d8bc0a886903487c42f961 -- foundations/decisions.md`, read | four hunks, each lying wholly in the *Verification* field of D-207, D-208, D-211 or D-401 |

Not run: the full gate (`npm test` with no file) — the cycle's, not the slice's. `test_ruff_source_rules` and `test_shellcheck_source_rules` are not in any file this slice ran; they fail at the base, as the handoff says.

## Own-work check

- **The requirement most likely not met:** every quotation standing in its decision's binding sentences and starting at the start of a sentence. 79 long quotations were built by hand from prefixes, and `0 errors` proves this only if the check reads the quotations at all.
- **Check:** after the commits, I turned one inserted quotation in `tests/sim/previous-programs.test.mjs:336` into `"Each program appended takes the next free program number"`, which is not in D-401. Then I ran `python -B .the-way/elements/common/foundation_check.py`.
- **What it showed:** exit 1, `tests/sim/previous-programs.test.mjs:336: the quotation stands in no binding sentence of `D-401``, `1 error`. I then restored the file with `git checkout --`, and the tree is clean. So the earlier `0 errors` does confirm all 79 quotations.

## Row per decision (plan item 6)

Tests are given as `path:line` of the test's `test(` line at `HEAD`, with the case name.

### D-203 — unchanged

- Held by tests: none.
- Held by invariant: the whole decision. `expired-session-unsaved-progress` says that an expired session leaves unsaved progress in the browser and that the game retries saving it only after a sign-in to the same account. That is both binding sentences.
- Held by nothing: nothing.
- Result: following R1, its tests (`tests/view/account-screen.test.mjs:1819`, `:1849`, which carry that invariant) get no line for D-203. *Verification* stays `invariants: expired-session-unsaved-progress.` and is not touched.

### D-207 — pair rewritten

- **Sentence 1** ("The game saves the game state on the server by itself …"), held in part. The tests below hold every listed act, the end of a manual map run, the catch-up, the 30-second rhythm and the hidden page:
  - `tests/view/state-store.test.mjs:194` "an act that changes the state sends one save, and one that changes nothing sends none"
  - `:244` "a reading that ends a manual map run is one moment of saving, …"
  - `:269` "a catch-up whose result ended the map runs of two earning loops is one moment of saving"
  - `:288` "a send and a start of a loop are each one moment of saving"
  - `tests/view/account-screen.test.mjs:2115` "a loaded game catches its loop up once, …"
  - `:2135` "a catch-up that ended no map run sends nothing until the page hides, …"
  - `:2514` "each act of the player that changes the game state is saved at once, …"
  - `:2793` "„Puść w pętlę” puts the character into a loop at once …"
  - `:3015` "a game minute that ends the map run in a death is saved at once, settled"
  - `:3639` "„Zamknij” closes the whole section at once, saves, …"
  - `:3666` "„Odbierz” pays the practice waiting, saves at once, …"
  - `:4235` "leaving the screen of a map run that goes on pauses it … and saves at once; …"
  - `tests/view/game-saver.test.mjs:469` "a passing map run is saved at the 30-second check and at hiding, …"
  - `:496` "the 30-second check is silent while no manual map run passes, …"
  - `tests/view/previous-save.test.mjs:398` "a pull fetches the previous save again and appends its programs …" (the pull as an act on the list of programs)
  - **Not held:** a reading of the clock, as opposed to a catch-up, that ends map runs of earning loops; and "with no guarantee that this last save arrives".
- **Sentence 2** ("The 30-second rhythm and the hidden page send …"), held whole:
  - `tests/view/game-saver.test.mjs:219` "a moment during a request in flight sends once more, after the answer, …"
  - `:342` "a moment during a request that then fails sends once more at once after the answer, …"
  - `:440` "an untouched game sends nothing at the 30-second check or at hiding, …"
  - `:469` (see above)
  - `:582` "a loaded paused game sends nothing, and a save of it changes nothing …"
  - `:610` "before logout the saver waits for the request in flight, …"
  - `:686` "a moment during the save before a logout that goes on is not sent after its answer"
  - `tests/account-api.test.mjs:1288` "saveGame hands the real fetch a PUT with keepalive …"
  - `tests/view/account-screen.test.mjs:2029` "after the session check the page keeps „Sprawdzanie logowania…” …"
  - `:2055` "a save builds the game the load gives: …"
- **Sentence 3** ("A save whose body is larger than 64 KiB …"), held whole:
  - `tests/account-api.test.mjs:914` "a save body of exactly 65 536 bytes is sent whole"
  - `:928` "a save body over 65 536 bytes is never sent and comes back too large"
- Held by invariant: none (D-207 names none).
- Held by nothing: the two parts of sentence 1 named as not held above.
- Result: *Verification* now has `tests:` and a pair rewritten for those two parts.

### D-208 — pair rewritten

- **Sentence 1** ("A save of the game state that succeeds shows nothing"), held in part: a success leaves the line under the menu bar empty.
  - `tests/view/game-saver.test.mjs:264` "a save that succeeds keeps its revision …"
  - `:310` "a moment while a retry waits sends at once, …"
  - `:360` "a save refused as too large shows its sentence and is not retried; …"
  - `:655` "a failed save before logout asks to log out again, …"
  - `tests/view/account-screen.test.mjs:3196` "a refused save starts a new game with its one-time sentence above it, …"
  - `:3251` "a failed save shows its line under the menu bar, outside the menu „Konto”, …"
  - `:3301` "a conflict drops the game, asks for the server's save …"
  - **Not held:** that a success shows nothing elsewhere on the screen.
- **Sentence 2** ("When one fails, the header line under the menu bar shows …"), held whole:
  - `tests/view/game-saver.test.mjs:282` "a failed save shows that the game retries, and the retries follow after 5, 10 and 20 s …"
  - `:310` (see above)
  - `:342` (see above)
  - `:655` (see above)
  - `tests/view/account-screen.test.mjs:3251` (see above). This test holds the `warning` role, the position under the bar and outside the menu, and the clearing.
  - `:3374` "„Wyloguj” saves first and goes on, …" (the D-97 sentence on the line)
- **Sentence 3** ("When the server refuses a save as larger than its limit of D-104 …"), held in part: no retry, a new try at the next moment of saving, and the sentence until a success.
  - `tests/view/game-saver.test.mjs:360` (see above)
  - `:634` "before logout a refusal is reported for logout to go on, …"
  - `tests/view/previous-save.test.mjs:678` "a state over the limit after a pull gets the sentence of D-208 in the line of saving"
  - **Not held:** that sentence's `warning` role (no test checks the class of the too-large sentence); "the game sets no limit on the number of earning loops"; "the limits of a save stay as D-104 and D-207 give them".
- Held by invariant: none.
- Held by nothing: the parts named as not held above.
- Result: *Verification* now has `tests:` and a pair rewritten for those parts.

### D-211 — pair rewritten

- **Sentence 1** ("When the server answers a save of the game state that there is no session …"), held in part: the game leaves the screen, its time stops, and the forms return with „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”.
  - `tests/view/account-screen.test.mjs:1819` "a 401 on a save keeps the state, and a sign-in to the same account sends it …"
  - `:3374` "„Wyloguj” saves first and goes on, …" (third block)
  - `:3469` "a save that finds no session while the logout's request is under way …"
  - **Not held:** the sentence in `warning` (the tests check `role="alert"` and the text, not the class); "never in the browser's lasting storage, so a reload … loses it".
- **Sentence 2** ("After a sign-in to the same account …"), held whole beyond the invariant:
  - `tests/view/account-screen.test.mjs:1819` (see above)
  - `:1849` "a sign-in to another account after a 401 on a save drops the kept state …"
  - `:1949` "an error of the code in the load of the kept state keeps it for the retry, …"
  - `:5187` "a sign-in that goes straight back to the kept game closes the card"
- Held by invariant: `expired-session-unsaved-progress`, for the kept state and its retry after a sign-in to the same account.
- Held by nothing: the parts of sentence 1 named as not held above.
- Result: *Verification* now has `tests:` and a pair rewritten for those parts.

### D-401 — pair rewritten

- **Sentence 1** ("An account with the previous-save privilege has on the screen Programy …"), held whole:
  - `tests/view/previous-save.test.mjs:273` "an account without the flag, or with it false, never asks and has no button, …"
  - `:303` "the question is asked at each entering of Programy; …"
  - `:337` "a game built at the address of Programy asks at once"
  - `:351` "an answer of null leaves the button away, …"
  - `:385` "a pull fetches the previous save again …"
  - `:450` "after a pull the button stays, and a second press appends the programs again as copies"
  - `:561` "a pull that finds no previous save says so and the button goes away"
  - `:700` "an answer of the check that comes after the player left the screen is ignored, …"
  - `:754` "the pull works while a manual map run goes on and while one has ended"
  - `:791` "the page gives the game the account's flag: …"
  - `:852` "the button stands in the screen Programy alone"
- **Sentence 2** ("The programs are read by a reader of their own …"), held in part beyond the invariants: the versions from 1 to the current one, the name not empty after trimming, and skipping a refused item and going on.
  - `tests/sim/previous-programs.test.mjs:132` "a document of each version from 1 to 7, the current one included, …"
  - `:308` "an item whose name is spaces or is no text is skipped and named by its place on the list"
  - `:356` "a program naming an action, a resource or an item the data lacks is skipped; refusing one refuses no other"
  - `:413` "a document of another version or with no whole version is unreadable"
  - `tests/view/previous-save.test.mjs:474` "skipped programs stand in one sentence by their names, …"
  - `:535` "an unreadable document, and one with no program, …"
  - **Not held:** the reader standing in a file of its own, apart from the load of D-206 and D-213.
- **Sentence 3** ("Each program appended takes the next program number …"), held whole:
  - `tests/sim/previous-programs.test.mjs:335` "the name read is trimmed of the white space at its start and end"
  - `tests/view/previous-save.test.mjs:385`, `:450`, `:474`, `:514` "a document with every program skipped …", `:535`, `:561`, `:580` "a failed fetch is one warning, …", `:643` "names from the document are shown as text, …", `:678`, `:754`, `:895` "the result line of the reader's answer names the appended count and the skipped programs"
- Held by invariants: `save-version` and `previous-save-programs-reader`. They hold the keys `id`, `name`, `program`, the check of the program editor, reading only the version, the list and the items, and throwing for no value. Following R1, their tests get no line.
- Held by nothing: the reader standing apart from the load.
- Result: *Verification* now has `tests:` and a pair rewritten for that part.

## Pairs added or rewritten (for the human to accept at the merge)

**D-207** (rewritten), for the part no test holds:
- complies: a reading of the clock whose result ended map runs of two earning loops followed by one save request; a tab closed while its last save is on its way, nothing holding the page open for the answer
- violates: a save request for each map run of an earning loop that one reading ended; the closing of a tab held back, or a question raised, until its last save is answered

**D-208** (rewritten), for the part no test holds:
- complies: a successful save that changes nothing elsewhere on the screen; the sentence of a save refused as too large in `warning`; any number of earning loops started, the limits of a save staying 64 KiB in the browser and on the server
- violates: a line „Zapisano o 12:31” after each save shown outside the line under the menu bar, in the menu „Konto” included; the sentence of a save refused as too large in `text`, `positive` or `danger`; a start of an earning loop refused for the number of earning loops; a higher limit of a save for a game state with many earning loops

**D-211** (rewritten), for the part no invariant and no test holds:
- complies: the sentence „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” in `warning`; the unsaved game state held in the page's memory alone, so a reload before the sign-in loads the server's saved game state
- violates: the unsaved game state written to `localStorage`, `sessionStorage` or IndexedDB; that sentence in `text`, `positive` or `danger`

**D-401** (rewritten), for the part no invariant and no test holds:
- complies: the reader kept in `src/browser/sim/previous-programs.ts`, the load of D-206 and D-213 calling nothing of it
- violates: the previous save loaded as a game by the load of D-206; the reading of the programs written into `src/browser/sim/saved-game.ts`

## Choices and concerns

- **Quotations run past the held part.** A quotation is a prefix of the sentence. Where a test holds a later part of a long sentence, its line quotes from the sentence's start through that part, as earlier slices did (D-209, D-402). Two examples: D-207 sentence 2 at the keepalive test, and D-208 sentence 3 quoted through „… in `warning` until a save succeeds” at `tests/view/game-saver.test.mjs:360`, which checks the text but not the role. What each test actually holds is the `tests:` clause and this report. The rejected way was to stop each quotation at a few words; it would mark the sentence but not show which part is held. If wrong, the cost is that a line reads as holding more than its test checks.
- **D-208 sentence 1** ("succeeds shows nothing") is marked at the seven tests that check the save line empty after a success. Three of them (`game-saver.test.mjs:264`, `account-screen.test.mjs:3196`, `:3301`) are mainly tests of other decisions. They would still fail if a success put text on that line, so I judged that they hold that part.
- **Left unmarked by judgment:**
  - The component tests of the pull in `tests/view/program-list.test.mjs` (around lines 129–260). They draw the list from the props they are given, so they do not fail if the page's rule on the button breaks.
  - `tests/view/clock.test.mjs:420` and `:530`. They pin the clock's hand-over, not a save.
  - The D-323 tests in `tests/view/uncaught-failure.test.mjs`, which name D-207 and D-208 only through D-323.
  - `tests/account-api.test.mjs:824` "saveGame maps each documented refusal to its own outcome" (contract `account-client-outcomes`).
  - `tests/view/game-saver.test.mjs:378` for D-211: it holds only what the invariant states.
  - `tests/view/previous-save.test.mjs:589` (a 401 at the pull) and `:1354` (a reset answered 401). Neither is a save, which is what D-211 speaks of.
- **Lines added in files the *Change* does not name:** `tests/view/account-screen.test.mjs` and `tests/sim/previous-programs.test.mjs`, under plan item 5. Most of the evidence for D-207, D-208 and D-211 lies in `account-screen.test.mjs`.
- **R3 remarks** (log wording against the tests and code; nothing changed):
  - D-207 sentence 1 lists "a reading of the clock … whose result ended map runs of earning loops". The tests reach only the catch-up that does so; whether a reading of the clock is a separate path in the code, I did not verify.
  - D-401's *Rationale* says the names of skipped programs "are shown as text only". The binding sentences do not say so, yet `tests/view/previous-save.test.mjs:643` and `tests/view/program-list.test.mjs` test it.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-209 (heading region, lines around 4301) — read in passing while reading D-208's range; not used for a judgment.
- `the author's rules on writing scripts, outside the repository` — the user's rule file, which must be read before writing a script; read before writing the insertion script.

## Working copies

- `.runs/executor-12/` (under the worktree) held the insertion script `add_lines.py`, the outputs of the foundation check and the six test logs. It was removed before return (`rm -rf`, confirmed absent).
- One run wrote the foundation check's output to `/tmp/fc-final.txt` (Git Bash's temporary directory). That breaks the rule on working copies; the file was deleted in the same command.
- No worktree or clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–60 (When to read, Roles, "Each role in its meaning") and 491–551 ("Menu bar, the menu „Konto” and the list of programs"); the other sections (lines 61–490 and 552–986 — tokens, focus, contrast, shared controls, kitchen sink, screens, map run, chronicle, end window, examples, where in code) not read. The slice adds only comment lines to test files, which none of those sections governs.
- `.the-way/elements/decisions/template.md`: read lines 105–260, which hold the *Read* ranges 111–127, 162–166 and 220–260.
- Test files were read by case and range, not whole, as the dispatch asks:
  - `tests/account-api.test.mjs`: 905–1114, 1280–1310 and the list of cases.
  - `tests/view/previous-save.test.mjs`: 32–900 and the list of cases.
  - `tests/view/account-screen.test.mjs`: 205–224, 972–1013, 1738–2240, 2458–2627, 2780–2871, 3000–3069, 3205–3543, 3619–3698, 4208–4294, 5146–5195 and the list of cases.
  - `tests/sim/previous-programs.test.mjs`: 1–30, 128–427 and the list of cases.
  - `tests/view/uncaught-failure.test.mjs`: 650–708 and the case headers at 353, 781, 844.
  - `game-saver.test.mjs` and `state-store.test.mjs`: read whole.

## Searches not found or unclear

- No test checks the browser's lasting storage (`localStorage`, `sessionStorage`, IndexedDB) for the view. Those words occur only in the simulation-isolation checks (`tests/sim/rules.test.mjs`, `tests/invariants/test_simulation_isolation.py`).
- No test checks the class (`warning`) of the too-large sentence or of „Sesja wygasła…”.
- No test checks that a reading of the clock, as opposed to a catch-up, which ends map runs of earning loops is saved once.
- No test checks that the reader stands apart from the load.
- Whether the state-store case at `tests/view/state-store.test.mjs:244` ends its map run in a death or in a completion was not established. Its helper accepts either, so I did not claim the completion case separately.
