# Slice 26 report

**Status:** done with concerns (the concerns are listed under *Concerns*; none blocks).

**Base:** `683a9b484d41a89775988434a992cd0c0306da37` (HEAD at the start, worktree clean).

**Commits**
- `25545c1a` docs: record D-379 (new decision) — `foundations/decisions.md` +15 lines
- `b8bee55c` test: the comments of the five view test files and of `tests/invariants/test_browser_view_token_values.py`

Files changed: `tests/view/account-screen.test.mjs` (about 160 comment lines), `tests/view/password-reset.test.mjs`,
`tests/view/email-confirmation.test.mjs`, `tests/view/email-status.test.mjs`, `tests/view/menu-bar.test.mjs`,
`tests/invariants/test_browser_view_token_values.py` (docstring and one comment), `foundations/decisions.md`.
Only comments, docstrings and JSDoc lines changed in the tests; no code line, no test title, no assertion.

## Checks (command, exit code)

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 130 tests, 130 pass |
| `npm test -- tests/view/password-reset.test.mjs` | 0 | 2 pass |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 | 5 pass |
| `npm test -- tests/view/email-status.test.mjs` | 0 | 3 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 28 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the five JS files | 0 | clean |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig` on the five | 0 | all formatted |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `the quality environment of the worktree (not committed)/Scripts/ruff.exe check tests/invariants/test_browser_view_token_values.py` (extra) | 0 | passed |
| S1 `git grep` | 1 | no line |
| S2 `git grep` | after the work: no line (see *S2 hits*) | |
| S3 `git grep` | after the work: only product words (see *S3 hits*) | |

The full gate (`npm test` with no argument) was not run, as instructed.

## S2 hits at the end

None. At the start S2 printed 120 lines in `account-screen.test.mjs`, 1 in each of `email-confirmation`, `email-status`,
`password-reset`, `menu-bar`, and 2 in `test_browser_view_token_values.py`; every one was a real pointer and was changed
(below).

## S3 hits at the end (all kept, none points to a document)

`tests/view/account-screen.test.mjs:2238`, `:2240`, `:2246`: "The plan stands folded to a line", `"an edit of a program's trip
plan"`, `"trip-plan-line"` — "plan" is the product's trip plan (a game object), not a cycle's plan. The 46 S3 hits at the
start were: the same three, plus every "spec decision/section N", "Slice 9", "the plan" (cycle) and "the concern of slice 5"
below, all changed.

## The new decision (written through `the-way-record-decision`)

Steps done: 1 Read (`SKILL.md`, `read.md`, `template.md`, `rules.md`, `way_of_working.md`, example WAY-03, foundation
entries D-96, D-259 to D-262, D-82, D-362, D-368; highest heading was D-378, no withdrawn list in the log); 2 Decide the
entry (one question; searched the log for focus, dispose, lock, card — no decision answers it; no collision with D-260,
which speaks of a change of state, and D-96); 3 Draft (all fields; *Based on* `none`, *Origin* `none`, reasoning from the
passages of decisions 3 and 8 of the spec of the login card in React, which exist in loop2's git history at
`9ea15247:docs/task-cycles/logowanie-w-react/spec.md`, not in the vault; *Rejected* holds only the ways that spec kept);
4.3 Write at the end of the log and run `foundation_check.py --skip-test-citations` (0 errors). There is no neighbour
decision to change and no new invariant (no step 4.4 work). No human question: I had a recommendation; this is marked
**`the cycle's`** (no row of *Settlements to record* carries it) — the request must put it before the human.

**D-379 — How does the page open, focus and close the login card, and what does the card do while a form waits?**
One sentence of meaning (English): the page creates the login card as an object it focuses and closes, takes no focus on
an opening except after a confirmed logout, a logout with no session and a set password, locks the whole card while a form
waits, and refuses a second send before the lock is drawn. (Polish: strona tworzy kartę logowania jako obiekt, który
ogniskuje i zamyka; karta nie bierze fokusu przy otwarciu poza trzema przypadkami; w czasie oczekiwania formularza cała
karta jest zablokowana, a drugie wysłanie przed narysowaniem blokady nie robi nic.)

Why a decision: the test comments "spec decision 3" and "spec decision 8" (about 25 lines) carried requirements that only
that spec held (the card's focus rules, closing from handlers, no state outliving the card, the lock of the whole card,
the guard held before the commit, a press of the already shown state doing nothing). Tests of `createAccountCard` check
them, and D-82 now forbids a test to rest on a spec.

Not entered into the foundation (kept as the test titles and comment text that already say them; my judgement, see
*Concerns*): the folded credits stand last in the four states and keep their open/closed state across a change of state;
the fields keep their label, hint, `autocomplete` token, `inputmode` and no spell check; the width of the card.

## Per changed pointer: old pointer, outcome, entry

Outcome words: **named** = an entry the foundation already holds is named; **removed** = pointer gone, the comment's own
words or the test's title already say it; **written** = D-379.

### `tests/view/account-screen.test.mjs`

| Old pointer (first line of the comment) | Outcome | Entry |
|---|---|---|
| Header: task konta-graczy-i-logowanie To do 1, 3, 4, 5, 15; spec section 7; task zapis-stanu-na-serwerze To do 5-10, spec sections 7, 8; task logowanie-w-react To do 2-8, spec decision 3; task ekrany-i-menu To do 2, 3, 6, 7, 11, 12 | removed (D-numbers already beside them stay) | D-96, D-97, D-208..D-212, D-259..D-262, D-280, D-281, D-283, D-284, D-286 |
| "Changed with D-97 (task ekrany-i-menu, To do 9)" before the bar's name alone | removed | D-97 |
| "Task logowanie-w-react, To do 2 and 3, D-259" (one form at a time) | removed | D-259 |
| "Task logowanie-w-react, To do 3 and 5" (lock of the whole card) | written | D-379 |
| "Task logowanie-w-react, spec decision 3" (no state outlives dispose) | written | D-379 |
| "--- the form „Nie pamiętam hasła” (task reset-hasla, To do 1 and 3 ...)" | removed | D-96, D-222 |
| "Task logowanie-w-react, To do 2, D-96" (button puts the form) and the same for „Wróć do logowania” | removed | D-96 |
| "Task logowanie-w-react, To do 3" (button locks with the form) | written | D-379 |
| "Task logowanie-w-react, To do 3 and 8; ... focus() ... (spec decision 3)" | written | D-379 |
| "Changed with D-97 and D-285 (task ekrany-i-menu, To do 9)" | removed | D-97, D-285 |
| "Changed with the screens by address (task ekrany-i-menu, To do 2)" (two places) | removed, D-280 named | D-280 |
| "Changed with D-157 (task ekrany-i-menu, To do 9)" | removed | D-157 |
| "(To do 6, D-261)" in the JSDoc of `assertAboveTheForm` | removed | D-261 |
| "Task logowanie-w-react, To do 3: the card shows one form" (three places) | named | D-259 |
| "Task logowanie-w-react, To do 6, D-261" (three places) | removed | D-261 |
| "Task logowanie-w-react, To do 3 and 6, D-261, spec decision 3" | removed, D-379 added | D-261, D-379 |
| JSDoc "4 since To do 10 of koniec-przejscia"; "which To do 10 and D-206 make another version" | removed | D-206 |
| JSDoc "(To do 10, row 13)" twice (save time of a document) | named | D-248 |
| "Task zapis-stanu-na-serwerze, To do 9; D-203, D-211" + "Task logowanie-w-react, To do 3" | removed; D-259 named | D-203, D-211, D-259 |
| "Question 16 of the task ... The sentence and the button are the task's" | removed; "the task's" became "D-96's" | D-213, D-96, D-207 |
| "Handoff question 1, D-211, D-213" | removed | D-211, D-213 |
| "(spec, decision 9)" in the JSDoc of `ended` (load refuses an unsettled death) | named | D-221 |
| "Spec section 7; D-96" (game built after the saved state answers) | removed | D-96 |
| "To do 6; D-212" (loaded map run) | removed | D-212 |
| "Task ekran-przejscia, To do 2 and 8" (two places: screen of a map run holds no column) | removed | none needed |
| "Task petla-zarobkowa, To do 11 and 17, row 25; spec sections 8 and 10; D-212" (catch-up after a load) | named | D-207, D-212 |
| "Spec section 10: saving after any caught-up minute ..." | named | D-207 (its Rejected holds the same sentence), D-209 |
| "since Slice 9" (4 places: „Kup”, React-drawn Siedziba, „Zatrzymaj”) | removed | D-199, D-200 kept/added; D-329, D-330 added at "Siedziba sends nobody" |
| "Spec section 9; D-211, D-248" (`keep()` document) | removed | D-211, D-248 |
| "To do 7; D-207, decision 6's list" | named | D-207 |
| "To do 10 with D-206; row 13" in `saveOf` expectations | named | D-248 |
| "Task ekran-przejscia, To do 8: the header in React draws nothing ..., where the status row in DOM stood ..." | removed (history dropped, present state kept) | D-281 |
| "Task petla-zarobkowa, To do 1, 8, 9 and 18; D-243, D-244, D-245, D-251; spec section 12" | removed | D-243, D-244, D-245, D-251 |
| "(To do 8)" Siedziba sends nobody | named | D-329, D-330 |
| "To do 8, row 1; question 3; D-287" | removed | D-287 |
| "To do 2, row 3; question 7" (name in a row is a link) | named | D-329 |
| "To do 7; D-329" | removed | D-329 |
| "(D-245, Q18)" | removed | D-245 |
| "(spec section 12)" chest inside the key of the rows | removed (the comment says what it catches) | none |
| "D-251, To do 18; D-329" | removed | D-251, D-329 |
| "To do 7; D-207; To do 16" (death saved settled) | named | D-207, D-221 |
| "To do 6; D-96 ... Task logowanie-w-react, To do 3" | removed; D-259 named | D-96, D-259 |
| "To do 5; D-96, D-206" | removed | D-96, D-206 |
| "To do 10 with D-206: 4 is the current version since the raise" (two places) | rewritten | D-206 |
| "To do 7; D-208; changed with To do 10 (task ekrany-i-menu)" | removed | D-208 |
| "To do 8; D-209" | removed | D-209 |
| "To do 10; D-97 ... Task logowanie-w-react, To do 3 and 6, D-261" | removed; D-259 named | D-97, D-259, D-261 |
| "Task logowanie-w-react, To do 6, D-261" (two more places) and "the concern of slice 5" | removed | D-261, D-97, D-211 |
| "Task petla-zarobkowa, To do 16 and rows 10, 11, 22-24 and 26 of Settlements to record; spec section 11; D-246, D-42" | removed | D-246, D-42 |
| "(Q19)" title „Pętle, które stanęły” | named | D-246 (its binding sentence holds the title) |
| "(D-42; spec, Left to the maker)" focus after „Zamknij” | removed | D-42 (see *Concerns*) |
| "Changed with D-246 and D-53 (task ekrany-i-menu, To do 3 and 6)" | removed | D-246, D-53 |
| "--- the screens by address: Task ekrany-i-menu, To do 2, 3, 6, 7, 11 and 12, questions 1, 6, 8, 9, 10, 12 and 16" | removed | D-96, D-212, D-225, D-280, D-281, D-283, D-284, D-286 |
| "Task ekran-przejscia, To do 1 and 8, and task teraz-i-potem, To do 3 (D-311, D-122)" | removed | D-311, D-122 |
| "To do 2, question 1" (x3), "(question 1)" | removed; "(question 1)" became "(D-96)" | D-96, D-212, D-283 |
| "The slice's first failing case." (x3) | removed | D-96 / D-283, D-284, D-207 |
| "To do 2, D-281"; "To do 2 and 3, questions 8 and 9, D-281, D-331"; "To do 2 (the browser's back and forward)"; "Question 8, D-281, trust" | removed | D-281, D-331, D-280 |
| "To do 6 and 7, question 6 ..." | removed | D-53, D-280, D-329 |
| "The acceptance criterion; To do 1, 5 and 7; D-280, D-330" | removed | D-280, D-330 |
| "D-283's rejected way and the plan"; "D-209 with the plan" | "and the plan" removed | D-283, D-209 |
| "Question 16, D-225, D-96, D-281" | removed | same |
| "Task proporcje-sceny-i-programu, To do 3; D-288, D-282" | removed | D-288, D-282 |
| "Task ekrany-i-menu, To do 3 and 5, questions 5, 8 and 15; D-166, D-281" and "To do 3 and 5, D-166", "To do 5, question 15, D-166", "To do 5, D-166" | removed | D-166, D-281 |
| "To do 5, question 8" (x2) | named | D-281 |
| "To do 11, question 12, D-286"; "Question 9, D-280, D-277" | removed | D-286; D-280, D-277 |
| "The orchestrator's ruling (record Q14), To do 12, D-217" | named; "as before" dropped | D-217 |
| "The plan: Postać is created on entering it ..." (cycle plan) | removed; the lifecycle statement stays in the comment's words | none (see *Concerns*) |
| "Settlement 1 of the task porzadki-z-uwag-pr, D-352, D-156, D-224" | removed | D-352, D-156, D-224 |
| "--- the page around the card: Task logowanie-w-react, To do 6 and 8; spec decision 3; D-261, D-262" | named | D-261, D-262, D-379 |
| "To do 8, D-262 ... To do 1 of the task spokojniejszy-wyglad: catches a footer" | removed; footer part named | D-262, D-27 |
| "To do 1, D-262, D-280" | removed | D-262, D-280 |
| "To do 2 and 8, D-96, D-225, D-262; spec decision 3, on what closes a card" | written | D-379 |
| "D-96, D-213; spec decision 3"; "D-211; spec decision 3" | written | D-379 |
| "Spec decision 3: focus() is called after a confirmed logout ..." | written | D-379 |
| "To do 6, D-261: „Gra została zaktualizowana ..." | removed | D-261 |
| "--- the login card: Task logowanie-w-react, To do 1-7; spec decisions 3 and 8" | named | D-379 added |
| "// The task, To do 1." above `GAME_SENTENCE` | replaced by "The sentence about the game (D-96)" | D-96 |
| "To do 1 and 3, spec decision 8, D-259" and four "To do 2 and 3 ..." | removed | D-259, D-96, D-225 |
| "Spec decision 8, „The fields keep everything they have today”" | removed (the comment's second sentence stays) | none |
| "To do 4, D-260" | removed | D-260 |
| "Spec decision 8, „The switch”" | written | D-379 |
| "To do 6, D-261, and the roles of createConfirmationNotice" | removed | D-261 |
| "To do 7, spec decision 8" (credits) | removed | D-96 |
| four "Spec decision 3 ..." (card in its element, no focus on opening, dispose, close from handlers) | written | D-379 |
| "To do 5, D-44, spec decision 8"; "Spec decision 8, „One form waits at a time”" | written | D-44, D-379 |
| twelve "To do 5, ..." headers of the form tests | removed | D-96, D-44, D-98, D-99, D-222, D-225 |
| "To do 19, 20; spec decisions 7 and 8; D-207 ... since Slice 9" | removed; D-217 added | D-207, D-217 |

### Other files

| File:line (at the base) | Old pointer | Outcome | Entry |
|---|---|---|---|
| `email-confirmation.test.mjs:1-2` | task potwierdzenie-adresu, To do 3 and 4; spec sections 2 and 10 | removed | D-39, D-104 |
| `email-status.test.mjs:1-2`, `:4-12` | task potwierdzenie-adresu, To do 6 and 7; spec section 10; "Changed in task ekrany-i-menu (To do 9) ... is gone" | removed; the paragraph now says what the menu „Konto” and the cases of `menu-bar.test.mjs` carry | D-39, D-157 |
| `menu-bar.test.mjs:1-2` | task ekrany-i-menu, To do 1, 7, 9; questions 2, 7, 9, 11 | removed | D-97, D-157, D-277, D-280, D-285 |
| `password-reset.test.mjs:1-2` | task reset-hasla, To do 4; spec decisions 10 and 11 | removed | D-224, D-225 |
| `test_browser_view_token_values.py` docstring `:53` | "the 23 roles (Q18 of the task, ...)" | named: "the roles in `ROLE_NAMES` (the styleguide's table Roles; D-39, D-40, D-41)" | D-39, D-40, D-41 |
| `test_browser_view_token_values.py:130` | "The roles of Q18 of the task" | named | D-39, D-40, D-41 |

## Own-work check (section 3 of `make-change`)

Requirement most likely not met: no comment still points to a document outside the foundation, even in a form the three
greps do not catch. Check: besides S1 to S3 I ran a wider case-insensitive `git grep` over the six files for
`slice|spec|settlement|criteri|orchestrator|ruling|round|decision N|section N|task|TODO|note|handoff|sketch|definition|concept|record`;
the remaining hits are identifiers and product words (`note` of a form, `round` loop variables, `deathSettlement`,
`trip plan`). Second check: every `D-` number in the changed lines exists as a heading (script-free loop of `grep`
over the 58 numbers; none missing), and the two `invariant:` lines of `account-screen.test.mjs` and the four of the Python
test are unchanged (`git diff` shows no change to a line with `invariant:`). Showed: no pointer left.

## Reaches beyond the dispatch

- `tests/view/account-screen.test.mjs` and the other files: read by passage around each pointer, not whole (see Unread).
- `git show 9ea15247:docs/task-cycles/logowanie-w-react/spec.md` (decisions 3 and 8 and its constraints): the source of
  D-379's reasoning; it is loop2's own history, which the dispatch's *Read* did not name. Why: the pointers "spec decision
  3 / 8" can only be resolved there, and the vault snapshot does not hold specs.
- `foundations/decisions.md`: D-27, D-42, D-166, D-199, D-200, D-207, D-209, D-212, D-217, D-221, D-246, D-248, D-259 to
  D-262, D-280, D-287, D-329, D-330 read by passage to choose the entry to name; D-96 read whole.
- `foundations/invariants.md`: `expired-session-unsaved-progress` and `browser-view-token-values` whole.
- `.the-way/foundations/decisions.md`, WAY-03 (the example the decisions element names).
- `.the-way/task-cycle/change/slice.md` (method).

## Unread material

- `account-screen.test.mjs` (6126 lines) was read by passage around every pointer (about 70% of it), not whole;
  `menu-bar.test.mjs` (685 lines) was read for lines 1-40 and searched; `email-confirmation.test.mjs` read for lines 1-30;
  `password-reset.test.mjs` for lines 1-30; `test_browser_view_token_values.py` for lines 35-160 and the invariant citations;
  `email-status.test.mjs` whole.
- Not read at all: `.the-way/task-cycle/skill/foundation_step.md` beyond its first 60 lines, `guidelines/coding.md`
  (first 150 lines read), `guidelines/styleguide-browser-view.md` (first 60 lines), `foundations/part_map.md` (the entry
  of browser-view read, rest not), the task's Questions beyond Pytanie 1a, the vault snapshot (no pointer named a passage
  that was not already in the foundation, and the new decision's source was the spec in git).
- `guidelines/testing.md`: read lines 80-110 and a grep for "comment", not whole.

## Searches not found or unclear

- The spec of the login card in React was not in the snapshot; found in git history (`9ea15247`). Its decision 3 and 8 are
  not in the tree otherwise.
- Not found in the foundation: where "Postać and Mapy are built on entering and gone on leaving, Siedziba and Programy built
  once" (test at "the screens Postać and Mapy are built on entering them") is a requirement. It was a plan item; the test
  title and comment say it. Not entered (an implementation lifecycle). Not found either: a requirement that focus stays
  on the screen after „Zamknij” (D-42 holds Focus Visible only).
- `ROLE_NAMES` in `test_browser_view_token_values.py` holds 23 names, while the styleguide's table Roles now has
  27 rows (it lacks `rule-winning`, `rule-running` and `condition-unmet`). The docstring said "23 roles"; I made it say
  "the roles in `ROLE_NAMES`" instead of repeating a count that no longer matches the table. The code is untouched.

## Concerns (for the orchestrator)

1. D-379 is the cycle's own entry (marked **`the cycle's`**); the request must put it before the human. It is built from the
   spec in git history, not from a vault note, and says in a binding sentence three things the old spec allowed only
   implicitly: that focus also moves "after a logout the server answers with no session" (taken from the test at "a confirmed
   logout or an expired session removes the game ... with focus in its first field", not from the spec's two cases) —
   if the human reads this wider than the spec, D-379 or the test must change.
2. Two requirements the tests check stay without a foundation entry: the lifecycle of the screens Postać/Mapy (built on
   entering, disposed on leaving) and "focus does not fall to the body after „Zamknij”". The first is a plan item; the second
   was "left to the maker" in the spec and D-42 does not hold it. Both comments now name no document; the cycle may want a
   decision for the second one.
3. The credits, the field attributes and the card width (spec decision 8) were not entered. If the cycle holds that D-82 asks
   for an entry for each, they would be one more decision (what the login card's fields and credits keep).
4. Two JSDoc comments kept "4 since the raise" no longer: the constants `VERSION = 4` and `OLDER_VERSION = 2` are
   unchanged; the comments no longer name the number.
