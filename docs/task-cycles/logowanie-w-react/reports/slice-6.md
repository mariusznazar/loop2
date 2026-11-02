# Report — Slice 6, task `logowanie-w-react`

**Status:** `done`

## Files and commits

| File | Added | Removed |
|---|---|---|
| `tests/view/account-screen.test.mjs` | 232 | 385 |
| `tests/view/password-reset.test.mjs` | 1 | 1 |

Commit: `2046594` test: :white_check_mark: run the 69 cases of the account screen on the jsdom harness and drop the hand-made document model. Base 758ba84.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/account-screen.test.mjs`, source broken: `origin.focus()` removed at `src/browser/view/account-screen.ts:227` | 1 | 3 of 69 fail, the focus cases, each by a short error such as `expected <input>, got <body>`; output 12 KB; source restored by `git checkout` |
| same, source broken: `kept = null` where `src/browser/view/app.ts` keeps the state at a 401 | 1 | 4 fail, among them „a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it”, marked `invariant: expired-session-unsaved-progress`; restored |
| same, source broken: `if (kept !== null)` in place of the account's comparison | 1 | 2 fail, among them „a sign-in to another account after a 401 on a save drops the kept state and loads that account's save”, the second case with that mark; restored |
| `npm test -- tests/view/account-screen.test.mjs`, on the committed tree | 0 | 69 pass, 0 fail, 0 skipped |
| `npm test -- tests/view/password-reset.test.mjs` | 0 | 2 pass |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | 37 pass; its guard reads the ported file |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 pass (ESLint, Prettier, Ruff, ShellCheck) |
| `node <scratchpad>/battery.mjs`, 18 runs of both versions of the file on a broken build | 0 | below, own-work check |
| `node --test` of the file on the build with the focused control disabled when the chest redraws, with and without the two awaits | not captured: the run was piped through `grep` | the runner's own count: `fail 1` with the awaits, `fail 0` without; below, own-work check |

Not run: the product gate and `python -B .the-way/elements/common/foundation_check.py`, which are the orchestrator's by the handoff. `tests/view/page-document.test.mjs` was not run: the harness did not change.

**The two invariant-marked cases** of `expired-session-unsaved-progress` changed in their harness alone; their bodies are the old ones after the rename below. Each was seen failing on the harness above and passing with the same command.

## Own-work check

**The requirement most likely unmet:** To do 15, „Przypadki … dalej chronią to samo zachowanie po stracie ręcznego modelu dokumentu”. The cases passing says nothing of it: all 69 passed on the first run, and a helper rebuilt wrongly passes with them.

**The check:** the built page was broken in one place at a time, 17 breaks and one run with none, and each time both the ported file and the file as it stood at the base were run, the failing cases compared by name. The old file ran from the scratchpad with the harness's `assert` in place of Node's, imported first, so the limit stood over it and no failure could write out a model's element, whose parent links form the same kind of graph; the one comparison of elements in a `deepEqual` became three `equal`, as in the ported file. It passes 69 of 69 that way.

**What it showed:** the same cases failed in 16 breaks of the 17. In the seventeenth, new values on a select list, the old file fails none and the ported one fails 4, because the model's `Option` took any value and a real select does not. The ported file lost nothing and gained that.

| Break | Failing now | Failing before |
|---|---|---|
| screen: focus not returned after a refusal | 4 | 4 |
| reset form: focus not returned after a failure | 1 | 1 |
| reset form: the locked „Anuluj” acts | 1 | 1 |
| screen: every guard on `waiting` gone | 3 | 3 |
| saver: the hidden page not heard | 1 | 1 |
| headquarters: the heading takes no focus | 1 | 1 |
| headquarters: the program list not heard | 1 | 1 |
| program panel: the list not heard | 1 | 1 |
| headquarters: a loop does not lock the row | 2 | 2 |
| headquarters: a tick rewrites an unchanged line | 1 | 1 |
| app: logout's focus not returned | 2 | 2 |
| app: the retry takes no focus | 0 | 0 |
| app: the save line under the address row | 1 | 1 |
| app: „Wyloguj” not hidden at start | 3 | 3 |
| select list: value and text swapped | 4 | 0 |
| text field: no `aria-invalid` | 2 | 2 |
| away report: never hidden | 3 | 3 |

The break „the locked „Anuluj” acts” also proves the helper `fire`: it reaches the listener of a disabled control, as the model's did.

**The second check, on focus read straight after a fire.** Two cases read focus with no await after a fire, and the harness drops focus one microtask later. With the focused control disabled at the chest's redraw, „a change of the chest redraws the chest alone …” passed without the await and fails with it, by `the focus stays: expected <button class="button destructive">, got <body>`. So the await is what keeps that case's protection.

## Cases that read focus after a fire, as the handoff asks

Of the file's 20 reads of focus, 16 already stood after an await and 2 stand straight after a case's own `.focus()`, as its precondition. The other 2 stood straight after a fire, and each gained `await settle()` before the read, its expectation unchanged: „a change of the chest redraws the chest alone: the rows, their lists and the focus on „Zatrzymaj” stay” and „„Zamknij” closes the whole section at once, saves, and focus stays on the screen”.

## Every case by name

Compared by script: each case of the base was put through the same mechanical rename the file went through, then its text compared with the committed case. The rename is `x.fire(t)` to `fire(x, t)`, `fakeDocument.` to `pageDocument().`, `.tag` to `.localName`, `.parent` to `.parentElement`, and `x.children.method` to `childrenOf(x).method`. 65 cases are identical after it; the 4 others are named with their reason. No expected value changed. No case was added, removed or renamed; none is replaced, since `createAccountScreen` stays until Slice 11.

| # | Case | Changed |
|---|---|---|
| 1 | until the server names an account the page has neither the game nor a running clock | only its harness |
| 2 | an answer of no session shows the two forms with visible labels, and no game | only its harness |
| 3 | an answer that names no account and is not a refusal of the session shows one warning with retry, neither forms nor game | only its harness |
| 4 | a sent login waits with both forms locked, and a refusal leaves one warning under it and focus where the player sent it from | only its harness |
| 5 | a lost connection on registration leaves one warning under that form and focus on its button | only its harness |
| 6 | a created account enters the game at once, and the forms keep no password | only its harness |
| 7 | a registration the server would refuse sends nothing and marks the field at fault | only its harness |
| 8 | registration problems follow the server's rules, counting a password in code points | only its harness |
| 9 | the button under „Zaloguj się” puts one form with an empty address, „Wyślij odnośnik” and „Wróć do logowania” in place of both forms | only its harness |
| 10 | a request waits with its field and every button of the screen locked, and sends nothing twice | only its harness |
| 11 | while a login waits, the button „Nie pamiętam hasła” is locked with the two forms and opens nothing | only its harness |
| 12 | an address not written as name@domain gets its sentence under the field, nothing is sent and the field takes focus | only its harness |
| 13 | a well-formed address gets the one sentence of the reset under the form in a status, with the field empty and the form and „Wróć do logowania” staying | only its harness |
| 14 | a refusal or a lost connection on a request stands as the form's warning, keeps the address and returns focus to where it was sent from | only its harness |
| 15 | „Wróć do logowania” brings back both forms, and nothing typed, no sentence and no warning survives a second visit | only its harness |
| 16 | reset from outside empties the request form, removes its sentence and shows the two forms, and a request answered afterwards is ignored | only its harness |
| 17 | the address rule and the password rules each give registration's result alone | only its harness |
| 18 | a confirmed logout or an expired session removes the game and its clock and brings back the forms | only its harness |
| 19 | a logout whose outcome is uncertain keeps the game with one warning, and „Wyloguj” stays usable | only its harness |
| 20 | signing in and out again and again keeps at most one clock running | only its harness |
| 21 | an answer that comes after the screen was left is ignored | only its harness |
| 22 | a reload or sign-in with an unconfirmed address shows the row after the title and Wyloguj, and leaves it at logout | only its harness |
| 23 | a confirmed address shows no row | only its harness |
| 24 | a created account starts the row with the outcome of its first message | only its harness |
| 25 | Wyślij ponownie sends one request for the signed-in account and shows its outcome in the row | only its harness |
| 26 | with a token in the address the page confirms first, saying so, and checks the session only after the answer | only its harness |
| 27 | the result stands as one sentence above the game for a signed-in player and leaves at the next change between forms and game | only its harness |
| 28 | a refused link stands in warning above the forms for a player who is not signed in, and the fragment goes | only its harness |
| 29 | a lost connection on the confirmation keeps the fragment and shows the client message in warning above the screen | only its harness |
| 30 | an address without a token asks only for the session and shows no notice | only its harness |
| 31 | the sentence of a confirmation waits through a failed session check and shows once it passes | only its harness |
| 32 | with a reset token in the address the page shows the form at once, asking nothing, building no game and saving nothing | only its harness |
| 33 | a sent form waits with its fields and „Anuluj” locked, sends the token and both passwords once and keeps the fragment | only its harness |
| 34 | a password the server would refuse sends nothing, marks the field at fault, takes focus there and keeps the link | only its harness |
| 35 | a change clears the fragment first, then shows the forms with the sentence in positive above them, asks about no session and focuses the address field | only its harness |
| 36 | a refused link, whatever its reason, clears the fragment first and then checks the session: the forms or the game with the sentence in warning above them | only its harness |
| 37 | „Anuluj” clears the fragment first and opens the page as usual with the session check and no sentence | only its harness |
| 38 | a failure that is no change and no refused link keeps the form, the fragment and the link, with the client's sentence under the form and focus back where the player sent it from | only its harness |
| 39 | a 401 on a save keeps the state, and a sign-in to the same account sends it and returns to the game from it | only its harness |
| 40 | a sign-in to another account after a 401 on a save drops the kept state and loads that account's save | only its harness |
| 41 | an error of the code in the load of a downloaded save keeps the save, builds no game, and the retry loads it | only its harness |
| 42 | an error of the code in the load of the kept state keeps it for the retry, and only then is it sent | only its harness |
| 43 | after the session check the page keeps „Sprawdzanie logowania…” until the saved game state answers, and none gives a new game that saves nothing by itself | only its harness |
| 44 | a save builds the game the load gives: a map run that went on comes back paused at its pace, an ended one on its screen after the end | only its harness |
| 45 | a loaded game catches its loop up once, and a catch-up that ended a map run of the loop is saved at once | only its harness |
| 46 | a catch-up that ended no map run sends nothing until the page hides, and the document then holds it caught up once | only its harness |
| 47 | the document kept for the same account holds the moment of its reading and loads, and the view's state stays what it was | only its harness |
| 48 | each act of the player that changes the game state is saved at once, and one that changes nothing sends nothing | only its harness |
| 49 | a character in a loop shows its line and „Zatrzymaj”; its „Wyślij” and „Puść w pętlę” are disabled, another character's are not, and „Kup” and the program list stay active | only its harness |
| 50 | „Puść w pętlę” puts the character into a loop at once and the row shows it, with no map run opened | only its harness |
| 51 | „Zatrzymaj” stops at once and the row shows „Pętla zatrzymana” with the practice paid, or the bare words, until the next start | only its harness |
| 52 | a game built from a state with a stopped loop shows the line of the stop in that character's row | only its harness |
| 53 | a change of the chest redraws the chest alone: the rows, their lists and the focus on „Zatrzymaj” stay | harness, plus `await settle()` before its last read of focus: the harness drops focus one microtask after `disabled` is set, so a read straight after a fire no longer saw a lapse. Expectation unchanged. Source: Slice 5's report, carried in the handoff. |
| 54 | the mark of a rehearsal the loop cannot repeat stands under „Wyślij” of a solved map, and only where the chest lacks what the list takes | only its harness |
| 55 | a game minute that ends the map run in a death is saved at once, settled | only its harness |
| 56 | a clock tick rewrites the resurrection line of the headquarters at the clock's moment, writes a line only when it changed, and saves nothing | harness, plus the seed of its spy: `let written = line.textContent`, where the spy read the model's `ownText`. Writes counted and expectations unchanged. Source: spec decision 1, „a matter of seeding it”. |
| 57 | a failed or uncertain answer for the saved game state shows the warning with retry, which asks both again; no session shows the forms | only its harness |
| 58 | a refused save starts a new game with its one-time sentence above it, after a confirmation notice, and saves the new game at once on the server's revision | only its harness |
| 59 | a failed save shows its line under the title and „Wyloguj”, above the address row, and a retry that succeeds clears it | harness, plus `assert.deepEqual(order, [logout, line, row])` become one `equal` for each place, which keeps identity and order. Expectation unchanged. Source: spec decision 10. |
| 60 | a conflict drops the game, asks for the server's save and builds from it with its sentence in the header until a save succeeds; a refused one there starts anew | only its harness |
| 61 | „Wyloguj” saves first and goes on, stays or ends each way its save's outcome gives | only its harness |
| 62 | a tab that stopped saving as outdated logs out without a save and shows the update sentence above the forms | only its harness |
| 63 | a save that finds no session while the logout's request is under way waits for its answer: a logout ends it, an uncertain one then takes the expiry path | only its harness |
| 64 | a game built from a state with a report shows the section above „Drużyna”, the stopped line first | only its harness |
| 65 | only stops in the open game give „Pętle, które stanęły”, and a full chest adds its sentence | only its harness |
| 66 | a state with an empty report shows no section | only its harness |
| 67 | „Zamknij” closes the whole section at once, saves, and focus stays on the screen | harness, plus `await settle()` before its read of focus, for the same reason. Expectation unchanged. Source: the same. |
| 68 | the report survives a reload, and a closed report stays closed after one | only its harness |
| 69 | a manual map run hides the report with the headquarters, and „Zakończ” shows it | only its harness |

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md`, which the method names.
- `src/browser/view/account-screen.ts:195-228`, `src/browser/view/password-reset.ts:110-150`, `src/browser/view/app.ts:169-316` and greps of `src/browser` for `window`, `closest`, `querySelector`, `activeElement`, `.focus()`: what breaks the focus and kept-state checks, and what the model had answered with an empty result.
- `dist/browser/view/*.js`, by search: the strings of the breaks.
- `eslint.config.mjs`: test files have Node's globals alone, so a bare `document` fails `no-undef`; hence `pageDocument()`.
- `scripts/test-node-file.mjs`, `tests/view/memory-limit.mjs`, `tests/sim/program-fixture.mjs` by search: how a file runs, and that the fixture holds no `assert`.

## Searches not found or unclear

- **„Seen failing once”, by `npm test` or `node --test`.** The method asks for the command that later shows the test passing, so the three source breaks ran through `npm test --`. The 17 breaks of the own-work check ran on `dist/browser` by `node --test`, as a build for each would add minutes and they are no test's first failure.
- **The handoff's „a case that read focus straight after a fire”** did not say whether a case with no control disabled counts. I took it by its text: both cases gained the await.
- **The rest of To do 15**, `guidelines/testing.md` through `maintain-testing-guidelines`, lies outside this slice's *Change*. That file still speaks of the hand-made model at lines 29, 310 and 349, which no longer holds for this test file, so I left it, and I could not see from my section which slice holds it.

## Choices, each with the way rejected and its cost if wrong

- **`fire` dispatches a plain bubbling, cancelable `Event`.** Rejected: `element.click()`, which does nothing on a disabled control, so the cases on a locked control would pass with the page's guard gone. Rejected: a `MouseEvent`, which runs a button's activation and could send a form the old `.fire` never sent. Cost if wrong: a behaviour that hangs on activation stays unproved, as it was.
- **A free function `fire`, `childrenOf` and `pageDocument`, not methods put on jsdom's prototypes.** Rejected: `Element.prototype.fire`, which would leave the bodies unchanged but alter the thing under test. Cost: a larger diff, 96 lines of it `fire`, all mechanical.
- **`all` by `querySelectorAll("*")`.** The order is the old walk's, document order. It leaves out text nodes, which the model listed as elements; no case looked for one.
- **`.value =` stays in the cases.** Rejected: `typeInto`, which the DOM page does not need, and which fires an `input` event the old cases did not, so it would not be „only its harness”. The slices that bring React change those lines. Cost: those slices touch them.
- **`fire` stays synchronous, outside `act`.** The DOM page has no React to await, so `inAct` would change nothing here; a slice that puts a React screen under a case wraps it.
- **`hidePage` defines `visibilityState` on the case's document**, as jsdom's is a reading with no setter, and fires a real `visibilitychange`. The fresh window of each case ends it.
- **`assert.equal(order[n], …)` carries no separate length check.** `order` is a filter by the same three elements, so it cannot be longer, and a shorter one fails at its last place.

## Problems as observed

- **A gap that stood before this slice:** with `retryButton.focus()` removed at `src/browser/view/app.ts:200`, no case fails, on the old file or the new. Nothing here changes it; it is outside this slice.
- The old file ran only with the harness's `assert`, never with Node's on a failing comparison: its model's elements link to their parents, and I did not test whether Node's message grows on them. A guess, marked as one.
- Every break was restored: `src` by `git checkout`, `dist` from a copy of its bytes, then the checks above ran on a fresh build. `git status` was clean after the commit.

## Plan and code

No mismatch of structure. *Checks* name no full suite, and I ran none. No screen changed, so `ui_check.md` does not apply. The plan's 69 cases stand as 69; the task's context says 67, an older count of the same file.
