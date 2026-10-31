# Report — fix of the whole-change findings, task `reset-hasla`

**Status:** `done with concerns`. All three blocking findings are fixed and none is contested. The
concerns are two gaps in permanent tests, under *Problems as observed*; they ask for a choice of the
orchestrator and change none of the fixes.

Reviewed head `2e5d694`; head now `d5c80d3`, branch `task/reset-hasla`, not pushed. Process pin
`.the-way` at `a8dfe8a`, not moved.

## Commits and files

| Commit | Finding | File | Added | Removed |
|---|---|---|---|---|
| `c02b685` docs: limit D-100's raced login to a password that was right when it was checked | I-1 | `foundations/decisions.md` | 2 | 2 |
| `5240194` fix: show on the kitchen-sink page a refusal each form can really get | I-2 | `src/browser/kitchen-sink/kitchen-sink.ts` | 9 | 3 |
| `d5c80d3` docs: say with or without a session in the five trust-boundary rows | I-3 | `guidelines/testing.md` | 5 | 5 |

## Findings

### I-1 — fixed

D-100 now limits the raced login to a password that was right when checked, in both places the
finding names, through `the-way-record-decision`. Its code and tests stay. The meaning stays within
what the spec's Decision 7 already carries, so step 4.2 of the skill asks no question of the human.

Binding sentence, whole, as it now stands:

> Registration with an email address that already has an account shows „Konto z tym adresem już
> istnieje.”. A credential login with an unknown address or a wrong password shows „Nieprawidłowy
> adres e-mail lub hasło.” without distinguishing the two, and so does, whatever the account's block,
> a login with the password that was right when it was checked and that a password reset replaced
> meanwhile, which is neither a failed nor a successful login for the attempt limits of D-102; a
> blocked account's correct password is refused as D-139 gives.

*complies*, its second half: "a login with the password that was right when it was checked, during
whose password work a reset commits, answering that message, releasing its admission and storing no
session".

The clause moved "whatever the account's block" forward, so that "which" follows the login it
describes and cannot be read as the block.

Search of the foundation (step 2): the entries that name D-100 are D-139 and the rule "Trust
boundaries" of `guidelines/testing.md`; no invariant derives from it. D-139 was read whole and needs
no change, and rows 197 and 200 of the table say nothing of the raced login. The words "while it was
being checked", "replaced by a password reset" and the like stand nowhere else in `foundations/` or
`guidelines/`. `password-reset-ends-sessions` speaks of sessions only. No glossary term is at stake.

Shown by: `python -B .the-way/elements/common/foundation_check.py`, exit 0; `src/server/account-routes.ts:733`
and `:743-746` read against the new sentence: the hash is compared only `if (account && verified)`, and
a wrong password takes `ticket.fail()`. The reviewer's two scratch cases showed that behaviour on head
`2e5d694`, and no file of `src/server/` changed since.

### I-2 — fixed

Every form on the page now has a waiting sample and a refusal sample of its own, each with a sentence
that form can get:

| Sample | Sentence | Why that form can get it |
|---|---|---|
| „Załóż konto: odmowa serwera” (new) | „Konto z tym adresem już istnieje.” | 409 `account-exists`, D-100, `src/server/account-routes.ts:676-681`, shown by `send` as the form's warning, `src/browser/view/account-screen.ts:280` |
| „Nie pamiętam hasła: odmowa serwera” (sentence changed) | „Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.” | the client's sentence for a server error, `src/browser/account-api.ts:140-141`, `:173`; D-215 gives that route no limit, so „Za dużo prób…” never reaches it |
| „Ustaw nowe hasło: odmowa serwera” (replaces „Ustaw nowe hasło: brak połączenia”) | „Za dużo prób. Spróbuj ponownie za kilka minut.” | full password gate, row 11, D-218 |

„Załóż konto: brak połączenia” stays. D-44 and the styleguide needed no change: `guidelines/styleguide-browser-view.md:279-281`
is now met as written.

Read beforehand: `guidelines/styleguide-browser-view.md` whole, D-44 whole, `src/browser/AGENTS.md`.
The change writes no value of appearance; the sentences stand as string constants beside the page's
others, copied as the page already copies them, because `serverErrorMessage` is private to the client
and D-45 keeps the page's code in its own module.

Shown by a look at the rendered page, see *UI check*.

### I-3 — fixed

The column *Who* of `guidelines/testing.md:204-208` reads „Odwiedzający z sesją lub bez” in all five
rows, the rest of each row unchanged; „Odwiedzający bez sesji” stands nowhere else in the file. The
method: the column „The cycle's author” of `the-way-maintain-testing-guidelines`
(`.the-way/product-guidelines/testing/SKILL.md:37-45`), and `testing/template.md`, "Writing the file".

The source differs by row, which the finding does not say. Rows 206-208 are the link route, covered
by D-109's "with or without a session" and by D-218's last sentence. Rows 204-205 are the request
route, which that clause does not reach: there the words follow from D-109's "A visitor may … ask for
a password-reset link" with no session condition, and from D-214's "Every request". To do 1 and row 2
say „odwiedzający bez sesji” for who needs the route; they exclude no one, so no new meaning enters
(WAY-172). See the first concern below for what stands behind those two rows.

## Checks

All on the committed head `d5c80d3`. There is no failing run to record: this change wrote no test
and changed no invariant test, since a page sample and two documents gave no first failing test to
name.

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `node scripts/kitchen-sink.mjs --build-only` | 0 | |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests, OK |
| `npm run typecheck` | 0 | |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |

Each also ran before the commits where it applies (`foundation_check`, the page's build and
`typecheck`, exit 0).

Not run: `npm test` with no argument, the orchestrator's by the handoff. `node --test` of the page
and server test files was not run as a whole: this range changes no code they exercise.

### Own-work check

- **Requirement most likely unmet:** To do 14 with the fix of I-3, a row that now promises the same
  answer to a sender with a session on the request route, where no test sends one.
- **Check:** a temporary case in a copy of `tests/http.test.mjs`, deleted afterwards: a request with a
  valid session cookie for that session's own confirmed address, for an unknown address, for a badly
  written one and with an extra field, then a control request.
  `node --test --test-name-pattern=scratch33 tests/zz-scratch-33.test.mjs`, exit 0, one test run.
- **Showed:** 204 with an empty body for both well-formed addresses, 400 `invalid-email`, 400
  `invalid-request`; one message to the named address and none for the others; the session's row
  stays and still authorizes `GET /api/account`. It ran against the existing `dist/server/`, not a
  fresh build; `src/server/` is unchanged in this range.
- **Second requirement, To do 11:** checked on the rendered page, below.

### UI check

Page built with `node scripts/kitchen-sink.mjs --build-only` and served from `dist/kitchen-sink/` on
127.0.0.1 by a throwaway Express line, because `npm run kitchen-sink` also opens the default browser
on the owner's machine. Read in Playwright by computed style:

- all ten form samples: the four waiting samples have every field and the button disabled, reading
  „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…”, „Ustawianie…”;
- the five sentences of refusal and lost connection stand under their forms, class `form-warning`,
  `role="alert"`, colour `rgb(254, 154, 0)`, which is `--warning` (`#fe9a00`);
- the answer to a request stands in `form-note`, `role="status"`, `rgb(159, 159, 169)`, which is
  `--text-secondary` (`#9f9fa9`);
- the only console error is a 404 of `/favicon.ico`, which the page does not ask for itself.

Screenshot, inspected:
`C:\Storage\repos\loop2-wt\reset-hasla\.runs\task-cycles\reset-hasla\reports\33-kitchen-sink-forms.png`.
It shows the ten samples with their labels; no sentence is clipped.

The server and the browser are stopped; a request to the port afterwards got no answer. The
screenshot was written to `C:\Storage\repos\loop2\` first, the only root the tool allows, and moved
into the reports folder. My two log files in `C:\Storage\repos\loop2\.playwright-mcp\` are deleted; the
checkout's `git status` is clean.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| D-102, D-139, the invariant `password-reset-ends-sessions` | `foundations/decisions.md:1834`, `:2579`; `foundations/invariants.md:1058` | the search of step 2 of `record-decision` for I-1 |
| D-109, D-214, D-218, the invariant `account-session-authorization` | `foundations/decisions.md:1931`, `:3896`, `:4030`; `foundations/invariants.md:718` | to check whether "with or without a session" holds for each of the five rows |
| The process's files for a decision: `read.md`, `decide_entry.md`, `way_of_working.md`, `rules.md`, `template.md`, `examples.md`, WAY-03 | `.the-way/elements/` and `.the-way/foundations/decisions.md:68` | step 1 of the skill |
| `testing/template.md` | `.the-way/product-guidelines/testing/` | the rule of the table and "Writing the file" |
| Client and screen code | `src/browser/account-api.ts`, `src/browser/view/account-screen.ts` | which sentence each form can really show |
| Test code and the runner | `tests/http.test.mjs`, `scripts/test.py`, `scripts/kitchen-sink.mjs` | the temporary case, and how to serve the page |

## Searches not found or unclear

- A test that sends a session with `POST /api/password-reset-message`: not found. Across
  `tests/http.test.mjs` `askReset` is never given a cookie, and the only cookie between lines 2520 and
  3400 is the link route's, at `:3394`. The finding's "The tests themselves cover the case" holds for
  the link route, not for the request route.
- A permanent test of a **wrong** password during whose check a reset commits: not found. The case at
  `tests/http.test.mjs:1872` is the right password; the wrong one was the reviewer's scratch case.
- The finding's quote from D-109 for all five rows: unclear for rows 204-205, resolved as under I-3.
- `.playwright-mcp` is not named in this worktree's `.gitignore`, yet the main checkout shows it clean;
  how it is ignored was not looked up.

`guidelines/testing.md` was read at lines 170-229, the rule "Trust boundaries", not whole: the change
is five cells of that table and it writes no test. `AGENTS.md` asks a whole read before changing tests.

## Choices

- **Replaced the sample „Ustaw nowe hasło: brak połączenia”** rather than keeping it beside the new
  one, as the finding gives. Rejected: both samples. Cost if wrong: the page shows no lost connection
  on that form, one line to add; „Załóż konto” still shows that state and it looks the same.
- **The request form's sample keeps the label „odmowa serwera”** with the server-error sentence, as
  the finding offers. That sentence answers a 500 and is no refusal of the request itself, since D-214
  gives a well-formed address none. Rejected: `invalid-email` under the form, which the form shows
  under its field and never sends. Cost if wrong: a label, on a page no player sees.
- **„Konto z tym adresem już istnieje.” for „Załóż konto”**, as the handoff takes the sample over a
  narrowing of D-44. Rejected: „Za dużo prób…”, which that form can also get, because the duplicate
  address is the refusal only this form has. Cost if wrong: one sentence on the page.
- **D-100's wording** departs from the finding's example by a clause, to place "which", as said under
  I-1. No `complies` line for the wrong guess was added: the finding names two places, and the first
  clause of the binding sentence already carries it.
- **Three commits, one per finding**, so that each can be reviewed or reverted alone.

No section 4 adaptation, and no invariant test changed.

## Problems as observed

Two gaps in permanent tests, neither introduced by this fix and neither fixed here, since the handoff
keeps tests out of it. Both are for the orchestrator to place.

1. Rows 204-205 now state an expectation for a sender with a session that only my temporary case has
   checked. If it stays untested, a later change that reads the session on that route would break the
   row with no red test. A permanent case is about ten lines beside the existing request cases.
2. The sentence the finding I-1 protects, that a wrong guess stays a wrong guess during a reset, has
   no permanent test either. If it stays so, the route could be "corrected" as the finding fears and
   only the entry would stand against it. A permanent case would take the shape of
   `tests/http.test.mjs:1872`.
