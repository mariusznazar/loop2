FAIL 2e5d694e825c7155be55f2f482e5b9d4f0501a6e

# Review of the whole change, task `reset-hasla`

Range `95de83b..2e5d694`, 19 commits, 30 files. `git rev-parse HEAD` in the worktree is the head given.
`.the-way` is at `a8dfe8a`, not moved by the range.

**Counts: 3 blocking (Important), 22 Minor, 7 out of scope (the lines of Declined to judge).**

The product behaves as the task asks. Every route, statement and screen read or run here did what the
task, the spec and the entries require, a real browser included. The three blocking findings are one
sentence of a decision that says more than the code does, one sample of the kitchen-sink page, and five
rows of the testing guidelines. No finding is in a route, a transaction, a mail text or a screen a
player sees; each fix is a few lines.

## Critical

None.

## Important (blocking)

### I-1. D-100 says that a wrong password racing a reset does not count, and the code counts it

- **Comes from:** none of the slices: the plan's *Foundation entries*, commit `e8755e8`. This is the item
  of the *Searches* of `12-slice2-review-report.md`, graded here as the dispatch asks.
- **Place:** `foundations/decisions.md:1808` (binding sentence), `foundations/decisions.md:1814`
  (*complies*); the code it describes, `src/server/account-routes.ts:728-747`.
- **What is wrong:** the binding sentence reads "and so does a login whose account's password was
  replaced by a password reset while it was being checked, whatever the account's block, which is
  neither a failed nor a successful login for the attempt limits of D-102". *complies* reads "a login
  during whose password work a reset commits answering that message, releasing its admission and
  storing no session". Both cover every such login. The spec (Decision 7), and D-100's own *violates*
  and *Rationale*, limit this to a password that was right when checked. The code follows the spec: the
  hash is compared only `if (account && verified)`, and a wrong password takes `ticket.fail()` at
  `src/server/account-routes.ts:743-746`.
- **Why it matters:** the code is right and the entry is not. A wrong guess must stay a wrong guess, or
  a guess made while a reset commits would escape the lock. A later agent that reads the binding sentence
  as written would "correct" the route to release that attempt, and D-100 would back it. Under WAY-263 a
  change's entry restated more broadly than its code is Important.
- **Evidence:** two scratch cases on real HTTP and SQLite. Three failures, then a login with a
  **wrong** password during whose check a reset commits, then one more failure, then one more login:
  `429`, so the raced login counted (five failures). The same with the **right** password: `401`, so it
  was released (four). Both cases passed as written here.
- **Fix:** through `the-way-record-decision`, add the qualification to both places, for example "a login
  with the password that was right when it was checked, replaced by a password reset meanwhile". The
  code and the tests stay.

### I-2. The kitchen-sink page has no sample of „Ustaw nowe hasło” with a refusal

- **Comes from:** Slice 10, commit `bdd2557`. Slice 10 had no review of its own.
- **Place:** `src/browser/kitchen-sink/kitchen-sink.ts:335`, with `:324`. What it fails against:
  `task.md` To do 11, the plan's Slice 10 *Goal* "both new forms waiting and with a refusal under them",
  D-44 at `foundations/decisions.md:891`, the styleguide at `guidelines/styleguide-browser-view.md:279-281`.
- **What is wrong:** To do 11 asks for both new forms "czekające na serwer i ze zdaniem odmowy pod
  nimi". The page shows „Ustaw nowe hasło” waiting and „Ustaw nowe hasło: brak połączenia”, which is no
  refusal, by its own label. The executor's reason is that a refusal of the link ends the screen, but
  the form has a real refusal that keeps it: „Za dużo prób. Spróbuj ponownie za kilka minut.” from a
  full password gate (row 11). The page does use that sentence, on the wrong form: „Nie pamiętam hasła:
  odmowa serwera” (`:324`) shows a refusal the request route never gives, since D-215 gives it no limit.
- **Why it matters, and its limit:** no player sees this page, and the two warnings look the same, so
  nothing on the page looks wrong. The finding blocks because the whole-change review checks each To do
  against the commits and this item is not met as written, and because this range wrote "of every form,
  „Nie pamiętam hasła” and „Ustaw nowe hasło” included" into D-44 (WAY-263). The base has the same shape
  in „Załóż konto: brak połączenia”, which D-44's new "every form" now also leaves short. Slice 10's
  own-work check looked at the colour of the note and could not have caught this.
- **Evidence:** screenshot of the rendered samples,
  `C:\Storage\repos\loop2\.playwright-mcp\element-2026-10-31T01-43-07-817Z.png`; the sample's label at
  `:335`; the only `TOO_MANY_ATTEMPTS` use at `:324`.
- **Fix:** give the reset sample `TOO_MANY_ATTEMPTS` with the label „Ustaw nowe hasło: odmowa serwera”,
  and give the request sample a sentence that form can show, such as the client's server-error sentence.
  For „Załóż konto”, add a refusal sample or narrow D-44's "of every form" through
  `the-way-record-decision`; the first is a few lines and leaves the entry alone.

### I-3. Five rows of the testing guidelines say "without a session" where D-109 says "with or without"

- **Comes from:** Slice 11, commit `2e5d694`. Slice 11 had no review of its own.
- **Place:** `guidelines/testing.md:204-208`, column *Who*.
- **What is wrong:** all five rows begin „Odwiedzający bez sesji”. D-109 reads "a password-reset link
  alone, under the same guards and with or without a session", and `account-session-authorization` says
  the same; D-218 settles what happens to a session sent along. Row 206 contradicts itself: a visitor
  without a session, and in its result „sesje konta (także ta wysłana razem z żądaniem)”. The row of the
  confirmation link, which these copy, says „z sesją lub bez” (`guidelines/testing.md:203`).
- **Why it matters:** this table is where a later test takes its expectation from, and the rule says the
  expectation comes from the permission decision. Read as written, the rows leave a signed-in sender
  undefined, the one case the design spent Decision 8 on. WAY-263 grades a restatement without its
  qualification Important. The tests themselves cover the case.
- **Fix:** „Odwiedzający z sesją lub bez” in the five rows, by the column „The cycle's author” of
  `the-way-maintain-testing-guidelines`.

## Minor

### New in this review

1. **Focus falls to the page after a refused link and after „Anuluj”.** `src/browser/view/app.ts:369-379`,
   Slice 9, `34a7197`. After `changed` focus goes to the address field; after the other two endings the
   control is gone and `document.activeElement` is `BODY`, seen in a browser. A keyboard player presses
   Tab from the top of the page, and the sentence is announced through `role="alert"`, so the cost is
   small. The spec's table asks focus for `changed` alone.
2. **The table does not name all the new cases.** `guidelines/testing.md:168`, Slice 11. Its *Goal* asks
   for "the new cases by their names". Of 39 cases the range adds, those that lift a lock are absent:
   seven marked `account-attempt-limits`, one `account-attempt-tracking`, one `account-message-limits`,
   and the `unblock-restores-no-link` entry names none of the four new ones, which stand under
   `password-reset-link`. Slice 11's check ran one way, from the table to the files. Every invariant has
   its marks, and To do 14 is met.
3. **The deploy skill names neither new log line.** `.claude/skills/loop2-deploy/SKILL.md`, *What an agent
   may read*; a gap of the plan. On the reset path a failure shows only in the log (row 3), yet
   `Account password-reset link could not be recorded` and `Password-reset request could not be served`
   stand nowhere an agent reading the log during H1 would find them. At the base a failed recording also
   reached the player as `failed`, so this is the first path where the line is the only trace. The skill
   is agent workflow, so the fix adds one bullet to both copies.
4. **Two comments say less or more than the code.** `src/browser/kitchen-sink/kitchen-sink.ts:231` says
   each kind holds "its fields", which it does not. `src/browser/styles.css:283` names one form, and the
   rule serves „Ustaw nowe hasło” too.
5. **D-218's "stays as it was".** `foundations/decisions.md`, D-218, last sentence; listed by report 26 as
   out of scope. A session of another account has its expiry renewed as the request ends. D-101 requires
   that of every request and the route does not do it, so there is no departure and I do not grade it
   under WAY-263, but "stays working" would be exact.

### From the slice reviews, as the dispatch lists them

| Report | Finding | State at the head | Grade |
|---|---|---|---|
| 08 | M-1 no test sees that `resetPassword` is one transaction | stands: mutant S2 survives `tests/account-storage.test.mjs`, 59 pass. The code is right; D-112 carries it as an agent's comparison, made here and it complies | Minor |
| 08 | M-2 a reset case pins the schema version | stands, `tests/account-storage.test.mjs:1235` | Minor |
| 08 | M-3 an assertion on a reset of an unconfirmed account | stands | Minor |
| 08 | M-4 the private read's signature differs from the spec | stands, no effect, no change needed | Minor |
| 12 | Minor 2 no test holds "before it looks at the block" | stands: mutant S3 survives `tests/http.test.mjs`, 66 pass | Minor |
| 12 | Minor 3 storage cases accept any rejection | stands: the `assert.rejects` calls of the two cases on a hash that no longer holds name no expected error | Minor |
| 12 | *Searches*, D-100's wording | **raised to Important: I-1** | Important |
| 14 | out-of-scope note, no test tells `checkedHash` from the re-read hash | stands; a test would have to reach an unreachable state | out of scope |
| 16 | Minor 2 a case's name and *Faults* claim what other cases prove | stands; the name did not change | Minor |
| 16 | Minor 3 a comment names a fault its case cannot catch | stands, `tests/http.test.mjs:1658` | Minor |
| 16 | Minor 4 the order of the two password rules is not pinned | stands: mutant S4 survives `tests/http.test.mjs` | Minor |
| 16 | Minor 5 nothing pins the link's hour | closed by Slice 5: a recorded link's lifetime is asserted | closed |
| 16 | Minor 6 the address's key is computed in two places | stands, `src/server/account-policy.ts:175`, `:244` | Minor |
| 20 | Minor 1 the reset token and link in the leak case cannot fail | stands, `tests/account-mail.test.mjs:508`: the failed send carries the confirmation message | Minor |
| 20 | *Declined*: `.gitattributes` gives one test file no `eol` | stands, older than the task | out of scope |
| 20 | *Declined*: enumeration, guards and the rest at the routes | closed: judged in Slices 5 and 6 and here | closed |
| 20 | *Declined*: the real delivery test | open on H1, not counted either way | see Declined |
| 20 | *Declined*: the guideline names one composer | closed by Slice 11 | closed |
| 20 | *Declined*: no production caller of the composer | closed by Slice 5 | closed |
| 22 | Minor 3 "the fourth" asserted after three requests | stands, `tests/http.test.mjs:2918-2919` | Minor |
| 22 | Minor 4 the guidelines name a test that no longer exists | closed by Slice 11 | closed |
| 22 | out of scope, the shared limit read from one's own resend | stands | out of scope, see Declined |
| 26 | M1 a comment counts six small routes | stands, `src/server/account-routes.ts:52`; the routes are seven | Minor |
| 26 | M2 the comment of `invalidLink` speaks of confirming alone | stands, `src/server/account-routes.ts:122` | Minor |
| 26 | M3 no test pins `invalid-request` on the new route | stands | Minor |
| 26 | M4 an existing check was narrowed without a reason | stands, `tests/transport.test.mjs:261`. New evidence: with the base's count back, the file passes 10 of 10, so the narrowing was not needed. Restore it in the fix round. A later control still catches the fault, so it stays Minor | Minor |
| 26 | M5 the case never checks whose password changed | stands | Minor |
| 26 | *Declined*: rows of the guidelines; the browser client | closed by Slices 11 and 7 to 9 | closed |
| 26 | *Declined*: expiry renewed against "stays as it was" | Minor 5 above | Minor |
| 26 | *Declined*: a lone surrogate in a password | as at the base | out of scope |
| 26 | *Declined*: `Session cannot be replaced` printed three times | the library's deferred error, as for a block at the base | out of scope |

## Against the whole task

| Item | Met by | Judged |
|---|---|---|
| To do 1 | D-96, D-44, D-109; `account-screen.ts`; route | met, seen in a browser |
| To do 2 | D-155, D-161, D-105; `sendResetMessage`, `issueLink` | met |
| To do 3 | D-214, D-215; the route answers before the work | met, seen in a browser; a badly written address under the field, nothing sent |
| To do 4 | D-216, D-217, D-155; `password-reset.ts`, `app.ts`, the route | met, each ending seen in a browser against a stand-in server |
| To do 5, 6, 7 | D-98, D-106, D-160, D-138, D-102; `resetPassword`, `clearEmailAttempts` | met |
| To do 8, 9, 10 | D-219, D-158 | met; strings read against the task here, and compared by script in report 20; no third message |
| To do 11 | D-44, styleguide, kitchen-sink | **not met as written: I-2**; the waiting texts, the note and the waiting samples are met |
| To do 12 | see below | met, apart from **I-1** |
| To do 13 | H1 | open, the human's; not counted |
| To do 14 | `guidelines/testing.md` | rows and both Origin and JSON rows stand, marks stand; **I-3** on their *Who* |
| Rows 1-19 | each carried by the entry the writer's table names | all 19 read against their entries and the code; none missing. Row 3's "czas" read as the time of this answer, as the spec chooses |
| Projected entries | D-152, D-153, D-154, `password-reset-verified-email`, `account-email-via-outsider`, `account-email-nodemailer-starttls`, part of D-106 and `player-argon2-password-hash` | word for word with the task's quotations |
| Questions carried | Decisions 2, 4, 6, 7 | answered and proved |
| Irreversible operation | no schema step in `database.ts` | confirmed, `package.json` and the lockfile untouched |

**Writer's concern 3, `Method: test`:** every such invariant now has a test citing it:
`password-reset-verified-email` 9, `password-reset-link` 10, `password-reset-ends-sessions` 7,
`account-session-authorization` 6, `player-server-session` 4, `account-session-storage` 10,
`account-attempt-limits` 11, `unblock-restores-no-link` 6, `player-argon2-password-hash` 2. One limit:
`account-email-nodemailer-starttls` keeps its one citing case, which sends the confirmation message;
the reset message goes through the same mailer in an unmarked case on a real loopback SMTP server, as
the plan accepts. The mailer has no branch by message.

## Trust boundary

Checked by reading and by the focused runs, on top of the slices' own runs: both paths stand in `paths`
and in the `mutationGuards` list; `stringFields` holds the fields; the answer of the request is decided
by the request's text alone and ends before `setImmediate`; `sendResetMessage` cannot reject; the
password rules come before the link and the link before the gate; every bad token gets one refusal;
`resetPassword` reads the link again under the write lock; a block, a later link and an expiry during
the hashing refuse; the guard stands in the statement that writes a session, and `establishSession` is
the only product code that stores one; the two new log lines hold no address, token or link. No route
was added beyond the two, and D-12 holds: no agent deployed or sent mail.

## Slices without a review of their own

- **Slice 7, `c21a4a7`:** no finding. Mutants B1 and B2 die. Own-work check fits the weak place and would
  catch it.
- **Slice 8, `931f578`:** no blocking finding. Mutants B5, B6, B12, B14, B15 die. B7, the opener without
  `reset()`, survives, and is equal for a player: the state can be reached again only through „Wróć do
  logowania”, which empties everything. The own-work check names the right requirement. The report's
  "not seen" is closed below.
- **Slice 9, `34a7197`:** Minor 1 only. Mutants B4, B8, B9, B10, B13, B16, B18, B19 die. The own-work
  check names the order of fragment and page, and its mutation run is believable and fits.
- **Slice 10, `bdd2557` and `f89bdbc`:** I-2. Its check looked at the note's colour, not at the To do's
  words. Its report took no screenshot though the route was open; I took it, and the samples render as
  named.
- **Slice 11, `2e5d694`:** I-3, Minor 2 and 3. The counts in the table are right: seven routes, eighth
  the save route, nine paths. Its case-name search is one way only.

**Mismatches the mechanical checks passed on:** Slice 9 needed no stylesheet change, since the screen
reuses the existing classes. No harm, except Minor 4's comment. Slice 10's one-word export keeps one
copy of the sentence, which is the better way. Slice 11's extra files are the plan's own choices and
hold: both copies of the skill are the same (`diff`).

**The look.** The one form in place of two, which the handoff says no agent had seen, is now seen at
1280 and at 400 pixels wide, with a scratch server answering 401 and chosen outcomes on the two routes:
one panel at its width, left, focus on the field, buttons in order, sentences where the task puts them.
Real focus returned to the sending control after each answer. Screenshots in
`C:\Storage\repos\loop2\.playwright-mcp\`: `page-2026-10-31T01-41-54-553Z.png` (request form),
`page-2026-10-31T01-42-06-616Z.png` (its sentence), `page-2026-10-31T01-42-04-006Z.png` (bad address),
`page-2026-10-31T01-42-14-209Z.png` (reset form), `page-2026-10-31T01-42-36-641Z.png` (full gate),
`page-2026-10-31T01-42-18-389Z.png` (refused), `page-2026-10-31T01-42-47-709Z.png` (changed),
`page-2026-10-31T01-48-45-149Z.png` (400 wide). This does not replace H1: the server was a stand-in. The
waiting state in the real browser went by too fast to catch; it is seen on the kitchen-sink samples and
in the page cases.

## Changed invariant tests

- `tests/transport.test.mjs`: „transport refuses all four link routes…” (`account-request-transport`,
  renamed, routes added, query narrowed: 26 M4); „refused state-changing requests…” and „refused requests
  to the save route…” (`account-mutation-request-guards`, routes and their data added).
- `tests/account-mail.test.mjs`: the confirmation message's expected body, for To do 9; the leak case
  (20 Minor 1). Reason on the requirement's side.
- `tests/account-api.test.mjs`: the four tables of `account-client-requests` and
  `account-client-outcomes`, extended, none weakened.
- `tests/http.test.mjs`: the list of canonical routes, extended.

## Declined to judge

- H1, D-153 and To do 13: the human's; neither met nor a defect, as the dispatch gives.
- 14's note: a test would have to reach an unreachable state.
- `.gitattributes` and one test file's `eol`: older than the task.
- The shared limit of 30 read from one's own resend, report 22: To do 2 and row 4 mandate the shared
  limits, and D-214 speaks of the answer to the request. No entry names this reading, though D-105's new
  *Rationale* argues against the same disclosure. Worth a line in D-215 when it is reviewed before other
  players come.
- A lone surrogate in a password: as at the base.
- `Session cannot be replaced` in the log: the path a block takes at the base.
- `account-attempt-limits` "since … successful password reset" while a reservation made before the reset
  still counts: the same reading as "since its last successful login" at the base, and D-102 keeps
  reservations on purpose.

## Checks

Run in a detached scratch worktree of `2e5d694` with `node_modules` joined by a junction, removed
afterwards, the junction first. The reviewed worktree shows no change and the same head. The gate was
not run, as the handoff gives.

| Check | Result |
|---|---|
| `git rev-parse HEAD`, `git diff`, `git log 95de83b..2e5d694` | head matches |
| `node scripts/build.mjs --check` | exit 0 |
| `node scripts/build.mjs`; `node scripts/kitchen-sink.mjs --build-only` | exit 0 each |
| `node scripts/test-node-file.mjs` on `tests/account-api.test.mjs` | exit 0, 22 pass |
| the same on `tests/view/account-screen.test.mjs` | exit 0, 51 pass |
| the same on `tests/view/password-reset.test.mjs` | exit 0, 2 pass |
| the same on `tests/view/email-confirmation.test.mjs` | exit 0, 5 pass |
| the same on `tests/account-mail.test.mjs` | exit 0, 9 pass |
| the same on `tests/account-storage.test.mjs` | exit 0, 59 pass |
| the same on `tests/transport.test.mjs` | exit 0, 10 pass |
| the same on `tests/http.test.mjs` | exit 0, 66 pass |
| ESLint `--max-warnings 0` on the browser files, the route file and three test files | exit 0 |
| Prettier `--check` with the guideline's flags on 19 changed files | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py`, reviewed worktree | exit 0, `0 errors` |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py`, reviewed worktree, read-only, Ruff and ShellCheck included | exit 0, 5 OK |
| `git ls-files --eol` on the new and a changed file | LF |
| `diff` of the two copies of the deploy skill | same |
| Scratch cases on a wrong and a right password during a reset | exit 0, 2 pass: `429`, `401` (I-1) |
| `tests/transport.test.mjs` with the base's count restored | exit 0, 10 pass (26 M4) |
| 15 mutants on the built files, each with one test file: B1, B2, B4 to B6, B8 to B10, B12 to B16, B18, B19 | killed, exit 1 |
| 4 more mutants: B7, S2, S3, S4 | survive, exit 0; each explained above |
| Real browser, Playwright, the built page against a scratch server | as under *The look* |

**Not run or not verified:** the gate; the full flow of the real page against the real server, since the
server needs an HTTPS origin and proxy metadata (the contract was compared by reading: paths, fields,
refusal codes); mutant B17, whose pattern did not match the built file, so it says nothing; a real
message, by D-12.

## Reaches beyond the dispatch

- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and
  `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md`: the owner's global
  instructions ask for them before a script and before a review.
- `.the-way/task-cycle/change/ui_check.md`: what a screenshot has to show.
- `.the-way/product-guidelines/testing/template.md` and `styleguide/template.md`, *Writing the file*:
  the plan's Slices 10 and 11 name them.
- `src/server/account-policy.ts`, `session-store.ts`, `transport.ts` and the `issueLink` part of
  `database.ts`; `src/browser/view/email-confirmation.ts`; `scripts/test.py`, `scripts/kitchen-sink.mjs`:
  callers and how to run the checks.

## Searches not found or unclear

- D-214 says the sentence of a badly written address stands "under the field, from the form and from
  the server alike". A server's `invalid-email` would show on the page as the form's warning, under the
  form. The page sends no such address, since both sides hold one rule, and registration behaves the same,
  so the path is unreachable; I raise no finding, and the words may be read at the return step.
- `guidelines/coding-browser-module.md`, *Files of this kind*, holds neither `account-screen.ts` nor
  `password-reset.ts`. The plan says to add them only where the wording says the table lists all; it does
  not say so. Unclear whether the table is meant to be complete; older than the task.
- "Odwiedzający bez sesji" in `task.md`: row 2 says „bez sesji” of what a link needs, and D-109 settled it
  as "with or without a session". I took D-109, the later and exact form, as what binds (I-3).
- The browser tool writes only under `C:\Storage\repos\loop2\.playwright-mcp\`, which git ignores, so the
  screenshots stand there, not in the scratchpad.
