PASS d5c80d3725e88439aea0937b73358117be6def7f

# Review of the fix of the whole-change findings, task `reset-hasla`

Range `2e5d694..d5c80d3`, three commits, three files. `git rev-parse HEAD` in the worktree is the head
given. `.the-way` is not in the diff. The review is bounded by `33-whole-fix-findings.md`, as
`.the-way/task-cycle/review/fix.md` gives.

**Counts: 0 blocking, 2 Minor notes outside the fix diff, 0 out of scope.** The author contests no
finding. My Minor and out-of-scope findings of report 32 stand as graded and are not part of this review.

## Findings file

### I-1. D-100 says that a wrong password racing a reset does not count: fixed

- `foundations/decisions.md:1808` now reads "a login with the password that was right when it was checked
  and that a password reset replaced meanwhile", and *complies* at `:1814` carries the same
  qualification. Both places the finding names changed; *violates* and *Rationale* already agreed.
- The sentence now says what the code does: `src/server/account-routes.ts:733` compares the hash only
  `if (account && verified)`, and a wrong password takes `ticket.fail()` at `:743-746`. The moved
  "whatever the account's block" keeps its meaning: the comparison at `:751` stands before the block at
  `:758`.
- Run on the fix head: a wrong password raced with a reset answers the next login `429`, so it counted;
  the right password `401`, so it was released. The entry now agrees with both.
- A search of `foundations/`, `guidelines/` and `src/` finds neither old wording left. No file of
  `src/server/` is in the range, and no test changed, as the finding asked.

### I-2. The kitchen-sink page has no sample of „Ustaw nowe hasło” with a refusal: fixed

Read from the rendered page of the fix head, in a real browser, ten samples:

| Sample | Sentence | Role, colour |
|---|---|---|
| „Ustaw nowe hasło: odmowa serwera” | „Za dużo prób. Spróbuj ponownie za kilka minut.” | `alert`, `rgb(254, 154, 0)` |
| „Nie pamiętam hasła: odmowa serwera” | „Serwer nie mógł obsłużyć żądania. Spróbuj ponownie.” | `alert`, the same |
| „Załóż konto: odmowa serwera” (new) | „Konto z tym adresem już istnieje.” | `alert`, the same |
| „Zaloguj się: odmowa serwera” | unchanged | `alert`, the same |
| „Załóż konto: brak połączenia” | unchanged | `alert`, the same |

- The four waiting samples read „Logowanie…”, „Zakładanie konta…”, „Wysyłanie…”, „Ustawianie…” with the
  button disabled, and the note stays `status`, `rgb(159, 159, 169)`.
- So To do 11, the plan's Slice 10 *Goal*, D-44's "of every form" and
  `guidelines/styleguide-browser-view.md:279-281` are each met as written, with no entry changed.
- Each sentence is one its form can show. `SERVER_ERROR` equals `serverErrorMessage` of
  `src/browser/account-api.ts:140-141`, `ACCOUNT_EXISTS` the 409 of `src/server/account-routes.ts:676-681`,
  and `TOO_MANY_ATTEMPTS` the full gate of row 11.
- The server-error sentence answers a 500, so it is a failure more than a refusal of the request. It is
  what my finding offered, and D-214 leaves that form no other sentence under it, so I raise nothing.
- The author's screenshot,
  `C:\Storage\repos\loop2-wt\reset-hasla\.runs\task-cycles\reset-hasla\reports\33-kitchen-sink-forms.png`,
  agrees: ten samples, no sentence clipped.

### I-3. Five rows of the testing guidelines say "without a session": fixed

- `guidelines/testing.md:204-208` read „Odwiedzający z sesją lub bez”, the rest of each row unchanged, and
  „Odwiedzający bez sesji” stands nowhere else in `guidelines/`. Row 206 no longer contradicts itself.
- **A correction of my finding.** The author is right on two points. I quoted D-109's "with or without a
  session" for all five rows, and that clause speaks of the link: rows 204-205 rest on D-109's "A visitor
  may … ask for a password-reset link", with no session condition, and on D-214's "Every request". The new
  words hold for them on that ground. And my sentence "The tests themselves cover the case" holds for the
  link route only; see Minor note 1.
- Run on the fix head: a request with a valid session cookie for its own address, for a stranger's and
  for an unknown one answers 204 with an empty body each; a badly written one 400 `invalid-email`; an
  extra field 400 `invalid-request`. Messages went to the named addresses only, and the session stayed.

## What the fix itself broke

Nothing found. The range holds no route, statement, screen or test. `kitchen-sink.ts` is page-only, the
build keeps it out of `dist/public`, and the invariant test of that separation passes. The removed sample
„Ustaw nowe hasło: brak połączenia” is no loss: the same state stands on „Załóż konto”, and the styleguide
asks for a refusal on that form, which it now has.

## Minor notes, outside the fix diff

Both are the author's *Problems as observed*, checked here, and neither reopens the review.

1. **No permanent test sends a session with `POST /api/password-reset-message`.** Rows 204-205 now state
   that expectation, and only scratch cases have shown it: the author's, this review's and one of Slice
   5's. `askReset` is never given a cookie in `tests/http.test.mjs`. The handler reads nothing of the
   session, so a fault would need a new line there. About ten lines beside the existing request cases
   would close it.
2. **No permanent test holds a wrong password during whose check a reset commits.** The case at
   `tests/http.test.mjs:1872` is the right password. The scratch case above could be taken over nearly as
   it stands. Without it, the sentence I-1 protects has the entry and no red test against the "correction"
   the finding feared.

The orchestrator places them. Taking them into the task costs a small test commit and its own review; leaving
them costs nothing today and keeps each sentence guarded by reading alone.

## Declined to judge

None.

## Checks

Run in a detached scratch worktree of `d5c80d3` with `node_modules` joined by a junction, removed
afterwards, the junction first, unless marked. The reviewed worktree shows no change and the same head.
The gate was not run, as the message gives.

| Check | Result |
|---|---|
| `git rev-parse HEAD`, `git log`, `git diff 2e5d694..d5c80d3` | head matches, three commits |
| `node scripts/build.mjs --check` | exit 0 |
| `node scripts/build.mjs` | exit 0 |
| `node scripts/kitchen-sink.mjs --build-only` | exit 0 |
| ESLint `--max-warnings 0` on `kitchen-sink.ts` | exit 0 |
| Prettier `--check` with the guideline's flags on the same file | exit 0 |
| `python -B scripts/test.py tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 OK |
| `node --test --test-name-pattern="^scratch:" tests/http.test.mjs`, with three scratch cases appended | exit 0, 3 pass, answers as above; file restored |
| `python -B .the-way/elements/common/foundation_check.py`, reviewed worktree | exit 0, `0 errors` |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py`, reviewed worktree, read-only | exit 0, 5 OK |
| Real browser, Playwright, the page of the fix head by a scratch server, computed styles of the ten samples | as under I-2 |
| Searches for the old wordings in `foundations`, `guidelines`, `src` | none left, with the kept „Załóż konto: brak połączenia” found as a positive control |

**Not run:** the gate; the other test files, since the range changes no code they exercise.

## Reaches beyond the dispatch

- `src/server/account-routes.ts:674-682` and `src/browser/account-api.ts:136-142`, `:170-175`: the sentences
  against their sources.
- `tests/http.test.mjs`, helpers `askReset`, `confirmedAccount`, `afterEarlierWork` and the case at
  `:3385-3400`: to write the scratch case with a session.

## Searches not found or unclear

- A permanent test with a session on the request route, and one with a wrong password raced with a reset:
  not found, Minor notes 1 and 2.
- Otherwise none.
