# Report — Slice 11, task `logowanie-w-react`

**Status:** done

## Files and commits

On `task/logowanie-w-react`, base 6cc3b88:

- `24023af` feat: :sparkles: hold the login card in the page, alone on its screen, and drop the DOM account screen, with the page's cases moved onto the card
- `98bb2a8` docs: :memo: name the task and the item of To do at each expectation of the page's cases that the card changes

| File | Added | Removed |
|---|---|---|
| `src/browser/view/app.ts` | 88 | 56 |
| `src/browser/view/account-screen.ts` (deleted) | 0 | 346 |
| `src/browser/view/password-reset.ts` | 3 | 123 |
| `tests/view/account-screen.test.mjs` | 437 | 340 |

## What I read

Whole, one per call: the handoff, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `src/browser/main.ts`, `src/browser/view/email-confirmation.ts`, `src/browser/view/account-card.tsx`, `tests/view/page-document.mjs`, `src/browser/view/app.ts`, `src/browser/view/account-screen.ts`, `src/browser/view/password-reset.ts`, and `tests/view/account-screen.test.mjs` in four ranges that cover its 4280 lines.

Each range of the handoff's *Current ranges*: D-96, D-97, D-156, D-157, D-160, D-211, D-222, D-225, D-252, D-88, D-259, D-261, D-262 and `expired-session-unsaved-progress`.

The handoff carries no words for rows F5, F15, S1, S3 and S4. I found their lines in the plan's table by a search (see Reaches); what they point to is among the entries above.

No read was cut short.

## Checks

Commands run from the worktree's root.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/account-screen.test.mjs`, test file changed, page not yet | 1 | 100 cases, 71 pass, 29 fail: see below |
| `npm test -- tests/view/account-screen.test.mjs`, on `98bb2a8` | 0 | 100 pass, 0 fail, 0 skipped |
| `npm test -- tests/quality/test_quality_invariants.py`, on `98bb2a8` | 0 | 5 tests OK |
| `npm test -- tests/view/password-reset.test.mjs` | 0 | pass |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | pass |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 7 tests OK, on a bundle with React |
| `npm test -- tests/invariants/test_application_build_output.py` | 0 | 7 tests OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests OK |
| `npm run kitchen-sink -- --build-only` | 0 | built |
| `npm test -- tests/deploy/test_loop2_image_icons.py` | 0 | 1 test OK, none skipped; Docker daemon 29.7.2 answered |

The checks without a commit named ran on the tree of `24023af`. `98bb2a8` changes comments of the test file only, so of those it reran the test file and the quality check.

**Not run:** `npm test` without arguments and `python -B .the-way/elements/common/foundation_check.py`. The handoff keeps the product gate for the orchestrator. So what the deletion of `account-screen.ts` does to that check is unchecked (see Notes for later slices).

**Safety rule.** Every run on jsdom went through the harness and its `assert`. No file outside `tests/` loaded jsdom or happy-dom. No run was killed by the memory limit.

### The failing run first

29 cases failed against the old page: 24 of the base and 5 of the 6 new ones.

- 15 failed on an assertion of their own, such as `expected ["Zaloguj się"], got ["Zaloguj się","Załóż konto"]`.
- 13 stopped earlier, in the helper `fillIn`: `as many fields as texts: expected 2, got 5`. That is the expected reason, two forms where one should stand, but it is not the case's own final expectation. Of these, 2 are new cases, shown failing on their own assertions by M7, M8 and M12 to M14 below.
- 1 new case, „the page's sentence stays in the card…”, stopped on a `TypeError` reading an absent element. M11 shows it failing on its assertion, `expected "alert", got "status"`.

The sixth new case, „a card opened by the session check or by an expired save takes no focus”, passed against the old page, which took no focus either. M1 shows it failing.

### Mutations of `app.ts`

Each was made on `24023af`, ran `npm test -- tests/view/account-screen.test.mjs` and was restored. All 15 exited 1, and the tree was clean after them.

| Mutation | Cases failed | Example |
|---|---|---|
| M1 `focus()` at every placing | 1 | „…takes no focus”: `expected <body>, got <input>` |
| M2 no `focus()` after a logout | 1 | „a confirmed logout…”: `expected <input>, got <body>` |
| M3 no `focus()` after a set password | 1 | „a change clears the fragment first…”: `expected <input>, got <body>` |
| M4 card inside `main` | 22 | „the card stands alone…”: `expected <body>, got <main class="app-main">` |
| M5 footer left beside the card | 2 | `expected [false,false,false], got [false,false,true]` |
| M6 header left beside the card | 2 | `expected [false,false,false], got [true,false,false]` |
| M7 `showPage` does not close the card | 13 | `one card stands: expected 1, got 2` |
| M8 footer stays hidden after the card | 4 | `expected [true,true,true], got [true,true,false]` |
| M9 the notice is not taken | 2 | `expected [], got [["Adres e-mail potwierdzony.","positive"]]` |
| M10 the game's sentence dropped | 5 | `expected ["Sesja wygasła…"], got []` |
| M11 that sentence in the wrong role | 2 | `expected "alert", got "status"` |
| M12 a failed load misses `showPage` | 2 | „…closes the card, so its warning and retry show”: `expected undefined, got <div class="account-card">` |
| M13 the game misses `showPage` | 2 | „a sign-in that goes straight back to the kept game closes the card” |
| M14 kept state lost at the 401 | 6 | invariant case: `expected ["saveGame"], got ["loadSavedGame"]` |
| M15 kept state sent for any account | 2 | invariant case: `expected ["loadSavedGame"], got ["saveGame"]` |

### Changed invariant tests

Two cases carry `expired-session-unsaved-progress`:

- „a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it” changed its expected list of forms.
- „a sign-in to another account after a 401 on a save drops the kept state and loads that account's save” keeps its body; it changed only through the helper `signIn`.

Seen failing on behaviour by M14 and M15 with the command of the table above, exit 1; passing with it, exit 0.

## The own-work check

**Requirement most likely unmet:** „the page works” in a browser. Every test here runs on jsdom, and this is the first slice where the page's bundle holds React, so a page blank in a real browser would pass all of them.

**Check:** the route of `.claude/skills/loop2-play/SKILL.md`, which `README.md:72` names: `npm run local`, and `playwright-cli` 0.1.22 from the worktree's root, with a made-up address at `example.test`.

**Result:** it works.

- The bundle renders. On the card, header, `main` and footer are `hidden`, the card's parent is `BODY`, the `<script>` stays in `body`, and focus stands on the body.
- Enter in a field sends the form, for registration and for sign-in, and a click on a label moves focus to its field. The spec names both as what jsdom cannot prove.
- Registration leads into the game. A refused sign-in shows „Nieprawidłowy adres e-mail lub hasło.” with both fields kept and focus back on the password field.
- A good sign-in and a reload with a session show the game, with no card and no password field.
- „Wyloguj” brings one card with empty fields and focus in the address field. The switch, „Nie pamiętam hasła” and „Wróć do logowania” move focus to the address field too.
- The credits open with one click and stay open across a change of state.
- The console log of the session holds three lines, none an error of execution: a 401 on `/api/account`, the check that leads to the card; a 401 on `/api/session`, the sign-in I got wrong on purpose; and a 404 on `/favicon.ico`.

**Screenshot:** one, of „Zaloguj się”, inspected. The card stands alone, as wide as the window and at its top, which is what this slice expects: its rules come in Slice 12.

**Not checked in a browser:** the card opened by a reset link, a confirmation link, and a session that expires under a running game. Those stand on jsdom alone. The skill says a start here cannot finish the mail paths. No control changed, so their styleguide states were not walked. The person's check of D-88 remains.

Nothing of this check stays: `.playwright-cli/` is deleted and the local start is stopped.

## All 69 cases of the base

Sorted from the bodies of the cases in 6cc3b88 and 24023af, by a script: 2 + 11 + 6 + 12 + 38 = 69.

### Replaced by cases of Slice 10 (2)

Both drove `createAccountScreen` itself, which is gone.

| Case | Replaced by |
|---|---|
| reset from outside empties the request form, removes its sentence and shows the two forms, and a request answered afterwards is ignored | „dispose() takes the element out with what it holds, and an answer still awaited is ignored”; „nothing typed and no sentence survives leaving „Nie pamiętam hasła” and coming back” |
| an answer that comes after the screen was left is ignored | „dispose() takes the element out with what it holds, and an answer still awaited is ignored” |

The dispose case sends a login and a new password, not a request for a link. The three share `lock.send` and its one check of `isDisposed`, so the request has no path of its own to miss.

### Renamed, expectation changed (11)

| Old name | New name | Source |
|---|---|---|
| an answer of no session shows the two forms with visible labels, and no game | an answer of no session shows the card on „Zaloguj się”, and the switch „Załóż konto”, each with visible labels, and no game | To do 2, 3; D-259 |
| a sent login waits with both forms locked, and a refusal leaves one warning under it and focus where the player sent it from | a sent login waits with the whole card locked, and a refusal leaves one warning under it and focus where the player sent it from | To do 3, 5 |
| a created account enters the game at once, and the forms keep no password | a created account enters the game at once, and the page keeps no password | spec decision 3 |
| the button under „Zaloguj się” puts one form with an empty address, „Wyślij odnośnik” and „Wróć do logowania” in place of both forms | the button under „Zaloguj się” puts in its place one form with an empty address, „Wyślij odnośnik” and „Wróć do logowania” | To do 2; D-96 |
| while a login waits, the button „Nie pamiętam hasła” is locked with the two forms and opens nothing | while a login waits, the button „Nie pamiętam hasła” is locked with the form and opens nothing | To do 3 |
| „Wróć do logowania” brings back both forms, and nothing typed, no sentence and no warning survives a second visit | „Wróć do logowania” brings back „Zaloguj się”, and nothing typed, no sentence and no warning survives a second visit | To do 2; D-96 |
| a confirmed logout or an expired session removes the game and its clock and brings back the forms | a confirmed logout or an expired session removes the game and its clock and brings back the card, with focus in its first field | To do 3, 8; spec decision 3; focus newly asserted |
| a refused link stands in warning above the forms for a player who is not signed in, and the fragment goes | a refused link stands in warning above the form in the card for a player who is not signed in, and the fragment goes | To do 6; D-261 |
| a change clears the fragment first, then shows the forms with the sentence in positive above them, asks about no session and focuses the address field | a change clears the fragment first, then shows a new card with the sentence in positive above its form, asks about no session and focuses the address field | To do 3, 6; D-261; spec decision 3 |
| a refused link, whatever its reason, clears the fragment first and then checks the session: the forms or the game with the sentence in warning above them | a refused link, whatever its reason, clears the fragment first and then checks the session: the card or the game with the sentence in warning above the form or the game | To do 6; D-261 |
| a tab that stopped saving as outdated logs out without a save and shows the update sentence above the forms | a tab that stopped saving as outdated logs out without a save and shows the update sentence above the form in the card | To do 6; D-261 |

### Same name, expectation changed (6)

| Case | What changed | Source |
|---|---|---|
| the result stands as one sentence above the game for a signed-in player and leaves at the next change between forms and game | the list of forms becomes `["Zaloguj się"]` | To do 3 |
| „Anuluj” clears the fragment first and opens the page as usual with the session check and no sentence | the same | To do 3 |
| a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it | the same | To do 3 |
| a failed or uncertain answer for the saved game state shows the warning with retry, which asks both again; no session shows the forms | the same | To do 3 |
| „Wyloguj” saves first and goes on, stays or ends each way its save's outcome gives | the same; and the sentence is read by `noticeTexts`, not `pageNotices` | To do 3, 6; D-261 |
| a save that finds no session while the logout's request is under way waits for its answer: a logout ends it, an uncertain one then takes the expiry path | the sentence is read by `noticeTexts`, not `pageNotices` | To do 6; D-261 |

### Same name, only the harness changed in the body (12)

Every assertion stands as it was. Typing goes through `typeInto` or `fillIn`, a press and a send through act, and „Załóż konto” is reached by the switch.

1. a lost connection on registration leaves one warning under that form and focus on its button
2. a registration the server would refuse sends nothing and marks the field at fault
3. a request waits with its field and every button of the screen locked, and sends nothing twice
4. an address not written as name@domain gets its sentence under the field, nothing is sent and the field takes focus
5. a well-formed address gets the one sentence of the reset under the form in a status, with the field empty and the form and „Wróć do logowania” staying
6. a refusal or a lost connection on a request stands as the form's warning, keeps the address and returns focus to where it was sent from
7. signing in and out again and again keeps at most one clock running
8. a reload or sign-in with an unconfirmed address shows the row after the title and Wyloguj, and leaves it at logout
9. a created account starts the row with the outcome of its first message
10. a sent form waits with its fields and „Anuluj” locked, sends the token and both passwords once and keeps the fragment
11. a password the server would refuse sends nothing, marks the field at fault, takes focus there and keeps the link
12. a failure that is no change and no refused link keeps the form, the fragment and the link, with the client's sentence under the form and focus back where the player sent it from

### Body unchanged (38)

The shared helpers under them changed: `startPage` goes through act, and `forms` and `signIn` read and drive the card.

1. until the server names an account the page has neither the game nor a running clock
2. an answer that names no account and is not a refusal of the session shows one warning with retry, neither forms nor game
3. registration problems follow the server's rules, counting a password in code points
4. the address rule and the password rules each give registration's result alone
5. a logout whose outcome is uncertain keeps the game with one warning, and „Wyloguj” stays usable
6. a confirmed address shows no row
7. Wyślij ponownie sends one request for the signed-in account and shows its outcome in the row
8. with a token in the address the page confirms first, saying so, and checks the session only after the answer
9. a lost connection on the confirmation keeps the fragment and shows the client message in warning above the screen
10. an address without a token asks only for the session and shows no notice
11. the sentence of a confirmation waits through a failed session check and shows once it passes
12. with a reset token in the address the page shows the form at once, asking nothing, building no game and saving nothing
13. a sign-in to another account after a 401 on a save drops the kept state and loads that account's save
14. an error of the code in the load of a downloaded save keeps the save, builds no game, and the retry loads it
15. an error of the code in the load of the kept state keeps it for the retry, and only then is it sent
16. after the session check the page keeps „Sprawdzanie logowania…” until the saved game state answers, and none gives a new game that saves nothing by itself
17. a save builds the game the load gives: a map run that went on comes back paused at its pace, an ended one on its screen after the end
18. a loaded game catches its loop up once, and a catch-up that ended a map run of the loop is saved at once
19. a catch-up that ended no map run sends nothing until the page hides, and the document then holds it caught up once
20. the document kept for the same account holds the moment of its reading and loads, and the view's state stays what it was
21. each act of the player that changes the game state is saved at once, and one that changes nothing sends nothing
22. a character in a loop shows its line and „Zatrzymaj”; its „Wyślij” and „Puść w pętlę” are disabled, another character's are not, and „Kup” and the program list stay active
23. „Puść w pętlę” puts the character into a loop at once and the row shows it, with no map run opened
24. „Zatrzymaj” stops at once and the row shows „Pętla zatrzymana” with the practice paid, or the bare words, until the next start
25. a game built from a state with a stopped loop shows the line of the stop in that character's row
26. a change of the chest redraws the chest alone: the rows, their lists and the focus on „Zatrzymaj” stay
27. the mark of a rehearsal the loop cannot repeat stands under „Wyślij” of a solved map, and only where the chest lacks what the list takes
28. a game minute that ends the map run in a death is saved at once, settled
29. a clock tick rewrites the resurrection line of the headquarters at the clock's moment, writes a line only when it changed, and saves nothing
30. a refused save starts a new game with its one-time sentence above it, after a confirmation notice, and saves the new game at once on the server's revision
31. a failed save shows its line under the title and „Wyloguj”, above the address row, and a retry that succeeds clears it
32. a conflict drops the game, asks for the server's save and builds from it with its sentence in the header until a save succeeds; a refused one there starts anew
33. a game built from a state with a report shows the section above „Drużyna”, the stopped line first
34. only stops in the open game give „Pętle, które stanęły”, and a full chest adds its sentence
35. a state with an empty report shows no section
36. „Zamknij” closes the whole section at once, saves, and focus stays on the screen
37. the report survives a reload, and a closed report stays closed after one
38. a manual map run hides the report with the headquarters, and „Zakończ” shows it

### New in this slice (6)

In the section „the page around the card”:

1. the card stands alone in the page's body, and the screens before and after it keep the header and the footer
2. the card of a reset link stands alone at once, and each way out of it shows the page again
3. an error of the code in the load of the kept state closes the card, so its warning and retry show
4. a sign-in that goes straight back to the kept game closes the card
5. a card opened by the session check or by an expired save takes no focus
6. the page's sentence stays in the card through a press of the switch, in warning as an alert, and leaves when the game comes

The file runs 100 cases: 69 − 2 + 27 of Slice 10 + 6.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| Spec decisions 1, 8, 9, 10, 11 | `spec.md:42-74`, `spec.md:177-244` | The safety rule names them; decision 1 on a mount outside act; decision 8 on the order in the card |
| The rows' lines and later slices | `plan.md`, by search | The rows are not in the handoff; to see which later slice takes what this slice leaves stale |
| The React controls | `src/browser/view/controls/react-text-field.tsx`, `src/browser/view/controls/react-button.tsx` | Which elements stay mounted, for the helpers |
| The tag of the footer | `src/browser/view/footer.ts`, by search | The test finds the footer by its tag |
| The production build | `scripts/build.mjs`, by search | Whether React's bundle reads `process` in a browser |
| A local start | `scripts/local-start.mjs` by search, `README.md`, `.claude/skills/loop2-play/SKILL.md`, `.playwright/cli.config.json` | The route of the own-work check |
| What a framework check covers | head of `tests/invariants/test_browser_view_framework.py` | The slice's check „on a bundle with React” |
| The human's own rules | `.ai/rules/scripts.md`, `.ai/rules/git.md` | Read before the scripts and the commits, as his instructions ask |

## Searches not found or unclear

- `spec.md:175` says `tests/view/password-reset.test.mjs:4` loses its mention of the hand-made model. That line holds no such mention at this base, so nothing was to do.
- The foundation names no route for a screenshot: a search of `foundations/` for it found none. `README.md:72` and the skill it names give one, and I took that as what `ui_check.md` asks for. Unclear whether a README counts as „its foundation settles”.
- `account-card.tsx` cites D-260, which is not among the handoff's ranges. I did not read it; the clearing of the card is Slice 10's and did not change.

## Choices

- **`placeCard` closes through `showPage()`, with no screen.** Rejected: a `dispose` of its own in `placeCard`. So one place closes a card, and `main` holds nothing stale under the card, such as a sentence that stood above the game. Cost if wrong: the three parts are shown and hidden again inside one synchronous call, so no frame shows it.
- **`takeNotice()` in place of `noticeElements()`**, since the card takes the notice as data and the game as an element. Rejected: a second way of reading `pendingNotice`.
- **`card?.focus()` at the two places**, where `accountScreen.focus()` stood. Rejected: `showForms` returning the card, a change of its shape for two callers. Cost if wrong: none today, since `showForms` has just placed the card, so the optional call does not meet null there.
- **The test keeps `pageNotices` for `.page-notice` and reads the card by `noticeTexts`.** Rejected: one helper reading both classes, which would break the case of a refused save, where the two stand together above the game.
- **`startPage` goes through `inAct` for every page, and `fire` stays outside act for the game**, which is DOM. A press or a send on the card goes through `press` and `sendForm`, which moved to the top of the file with `tagged`, `inputsIn`, `formIn`, `fillIn`, `noticeTexts`, `assertInOrder` and `lockOf`.
- **„a created account…” now asserts** that no password field stands beside the game and that the next card opens empty, where it read the emptied fields of a form kept for the page's life. Whether an unmounted input holds what was typed until it is collected was not measured; nothing refers to it after `dispose()`.
- **The test file grew from 4280 to 4377 lines.** The plan's table named the cost of growing past 3381. I kept the page's cases beside Slice 10's, since the slice replaces only those of `createAccountScreen`.

## Adaptations

None of section 4: the plan and the code agreed.

## Problems as observed

- `npm run local 2>&1 | cut …` left its background log empty, so the ready line did not show. A guessed cause: `cut` holding its buffer. I took the address from the name of the directory under `.runs/local-start/`.
- `browser_navigate` of Playwright MCP ended in `ERR_CERT_AUTHORITY_INVALID`, which the skill expects. I went to the CLI, its first route, and did not use `browser_run_code_unsafe`.
- `playwright-cli --raw run-code --filename .playwright-cli/round.js`, exit 1, then, corrected, exit 0. The first failed on my own locator: `.form-warning` also meets the header's hidden warning. No fault of the product. The two were not the same walk: the first had registered, entered the game, logged out and been refused, and the second went on from there.

## Notes for later slices

- `guidelines/coding-browser-module.md:16` still lists the deleted `src/browser/view/account-screen.ts`. Slice 14 takes that file. A search of `.the-way/elements/common/foundation_check.py` for `Files of this kind`, `exists` and `is_file` found nothing, but the check was not run.
- `src/browser/styles.css:252-258` holds `.account-screen`, which no element carries now. Slice 12 takes the rules of the two forms side by side.
- `.claude/skills/loop2-play/SKILL.md:58` says „Under „Załóż konto”, fill…”, which now takes a press of the switch first. Slice 12 reads that skill; whether it changes it I did not establish.
