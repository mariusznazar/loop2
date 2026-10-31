# Findings to fix — the whole change, task `reset-hasla`

The blocking findings of the review `reports/32-whole-review-report.md`, in the reviewer's words.
Reviewed head: `2e5d694`. The fix's range runs from it.

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
