PASS 28f0686

# Review of the whole change — task `potwierdzenie-adresu`, range `7a633a7..28f0686`

Reviewer: a fresh agent that made none of the change. Method: `.the-way/task-cycle/review/SKILL.md`
with `whole_change.md` (pinned the-way `3aee7d958835cc19b95519f4d21b37538b78e3e1`, matching the
gitlink). `git rev-parse HEAD` in the reviewed worktree is
`28f0686dcf354ad55f50c7e13385f043c28581a6`, the head given. The range has 19 commits and changes
44 files (+4950 −213), as the handoff says. The worktree, its index and its branch were not
touched: every check that needed a build ran in a separate detached worktree of `28f0686`, which
was removed at the end. Afterwards the reviewed worktree was clean, still at `28f0686`.

Counts: **blocking 0** · **Minor 15** (11 from the slice reviews, graded again here, and 4 new)
· **out of scope 0** (Declined to judge: 6 lines).

## Findings

### Critical

None.

### Important

None.

### Minor — new findings of this review

**N1. The deploy skill's section on blocking an account still describes the block without the
emailed links.** Slice 9 (`5c73dc7`..`fea6091`), with a gap in the plan.
Place: `.claude/skills/loop2-deploy/SKILL.md:191-197` and the byte-identical `.agents/` copy.
What: the bullet "**`block`** marks the account blocked and ends its sessions in every browser in
the same step" and the bullet "**`unblock`** … The sessions the block ended stay ended" say
nothing about what the block now does to emailed links. Since this change, the block also stops
every emailed link of the account, and unblocking brings none back: D-137 as changed in
`f545afe`, D-148, and the command's own report line in `src/server/account-block.ts:83-85`. D-137
says "The `loop2-deploy` skill describes the command". Plan row F9 lists Slice 9 among the slices
that depend on it, and the Slice 1 review (`reports/09-slice1-review-report.md`, "The block
command") deferred this text to Slice 9. Slice 9's goal never named it, and neither its executor
nor its reviewer added it.
Why it matters: an owner who reads the skill before blocking someone does not learn that the
player's confirmation link dies, or that after an unblock the player has to press „Wyślij
ponownie” (K10, D-148). Nothing breaks for a player, because the command prints the effect when
it runs. That is why this is Minor and not blocking.
Evidence: the lines quoted above. `git grep -n -i link` over the skill's `SKILL.md` finds the word
only in § "Account mail".
Fix: one clause in each of the two bullets, in both copies.

**N2. The kind guidelines say the sender is fixed in the mail-sending file, but the exemplar
reads the sender address from the settings.** Slice 3 (`1c335f3`).
Place: `guidelines/coding-mail-sending.md:41-42`: "Nadawca, nazwa wyświetlana, temat i treść są
ustalone w pliku wysyłki, nie dobierane przez wywołującego."
What: in the exemplar, the display name, the subject and the body are constants
(`src/server/account-mail.ts:6-12`). The sender address, however, is `MailSettings.from`. That
value is `LOOP2_MAIL_FROM`, which startup validates (`src/server/configuration.ts:131-133`) and
which D-13 and D-111 place as a plain value in `compose.yaml`.
Why it matters: a later mail file (task 21's reset message) that follows the rule literally
would hard-code `loop2@mariusznazar.com` instead of reading the configured sender. The rule's
real point holds and is right: the caller does not choose any of these values. Only its first
word is too broad.
Fix: write "nazwa wyświetlana, temat i treść są ustalone w pliku wysyłki, a adres nadawcy
pochodzi z ustawień poczty".

**N3. The two new view modules are not listed in the browser-module kind's table of files.**
Slice 7 (`70002a5`).
Place: `guidelines/coding-browser-module.md:12-25`.
What: `src/browser/view/email-status.ts` and `src/browser/view/email-confirmation.ts` are view
modules, but the table *Files of this kind* does not list them. The Slice 7 executor reported
this under *Problems*. The table already left out `account-screen.ts`, `game-view.ts` and
`body-row.ts` at the base, and no check reads the table, so this follows an existing gap.
Why it matters: a reader of the kind cannot tell from the table whether the two modules are
`copy` or `do not copy`. Nothing in the code depends on it.

**N4. The rendered header row in the running game has not been seen by anyone in the cycle.**
Slices 7 and 8 (`70002a5`, `53f2b82`).
Place: `src/browser/styles.css:50-84` and `src/browser/view/app.ts:95`.
What: the Slice 7 executor marked the screenshot as unchecked: the foundation settles no route to
the running product, as WAY-219 allows. The Slice 8 executor inspected the kitchen-sink samples
in Chromium, inside a `.header-sample` box that copies the header's flex layout. Read as code,
`header { display: flex; flex-wrap: wrap }` combined with `.email-status { flex-basis: 100% }`
puts the row on a line of its own. The global `[hidden] { display: none !important }`
(`styles.css:7-9`) beats `.email-status { display: flex }`, so a confirmed account's row really
disappears. This is still a reading of code, not proof of how the page looks.
Why it matters: it is a gap in evidence, not a defect found. The request has to name the
screenshot of the running game as unchecked, as WAY-219 requires.

### Minor — findings of the slice reviews, graded as this review's

**Slice 1, m1 — Minor, stands.** `src/server/database.ts:450-453`: no test covers "set the
confirmation time only if still null". The test "a confirmation link confirms its account once…"
(`tests/account-storage.test.mjs:636-673`) checks the time after the first confirmation. It never
confirms a second live link of an already confirmed account, which is the only path where
`AND email_confirmed_at IS NULL` matters. The effect would be a later timestamp, with
`emailConfirmed` unchanged. No player sees it.

**Slice 1, m2 — fixed by Slice 10 (`28f0686`).** `guidelines/testing.md:10-11` now says "jego
siedem odstępstw to D-74, D-75, D-76, D-77, D-78, D-79 i D-151". The *Decision* line of
"Choosing the level" names D-151. Both match D-73 as changed in `06b0385`.

**Slice 1, m3 — Minor, stands.** `src/server/database.ts:100`: a bad limit passed to `issueLink`
is refused with "Invalid database timing option". The only reader is someone looking at a stack
trace, because a throwing issue becomes `failed` (`account-routes.ts`, `sendConfirmation`).

**Slice 2, M1 — Minor, stands.** `foundations/part_map.md:60`: the `account-server`
responsibility sentence does not say that the part composes and sends account mail. The *External
context* row "Mikrus Outsider | both | untrusted" (line 170) and the claim of
`tests/account-mail.test.mjs` were written. The responsibility sentence was in no slice's goal
and in no row of the spec's *Foundation entries*. Today no file assignment depends on it, since
`src/server/**` already claims the mailer. It belongs to the return step's comparison of the
foundation with the code, through `the-way-update-part-map`.

**Slice 4, M1 — Minor, stands.** `src/server/configuration.ts:116-121`: the emptiness check runs
on the raw bytes, and `TextDecoder` then drops a leading UTF-8 BOM. A password file holding only
a BOM is therefore accepted as an empty password, and a BOM before a real password is removed
without notice. D-111 asks for "a regular file of at most 1 KiB of UTF-8 with no control
character". The spec asks for a "non-empty" file and rejects silent changes to its content. The
effect is a failed login at the first send instead of a refusal at startup, and only for an
unlikely file.

**Slice 4, M2 — Minor, stands.** `src/server/configuration.ts:45-46`: the login check accepts
invisible format characters (Cf, for example U+200B). The host check accepts labels that begin
or end with a hyphen, and labels longer than 63 characters. The values come only from the
operator, and no header or command injection follows from them.

**Slice 5, m1 — Minor, stands.** `src/server/account-routes.ts:415-423` with the session
middleware: when a block lands during a registration's send, the end-of-response session save
fails. The log then gets a stack trace, and the socket is destroyed after the 201 has been
written. I saw the stack trace twice in my run of `tests/http.test.mjs`, in the block cases, with
all 33 cases passing. The block guard of D-112 holds. The trace holds no token or address.

**Slice 5, m2 — Minor, stands.** `src/server/account-policy.ts:35-42`: deleting `isLinkToken`
would leave every test passing. A non-canonical token still matches no digest and still gets
`invalid-link`, so the behaviour stays protected but the check itself does not.

**Slice 5, m3 — Minor, stands.** `src/server/account-policy.ts:12`: the route's sending deadline
is a constructor option of `AccountPolicy`. The mailer has its own 10-second deadline
(`account-mail.ts:14`), so the two values have to be kept in step by hand. The account-policy
kind gains an option that later copies would follow.

**Slice 5, m4 — Minor, stands.** No test asserts that a confirmation made without a session
creates no session and sets no cookie. The code is right: the handler never touches
`request.session`, and `saveUninitialized` is false.

**Slice 9, M1 — Minor, stands.** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:247`
and its `.agents/` copy: the block is meant to be pasted whole, and `read -r -s` reads the
password from the same terminal. On a terminal without bracketed paste, the next pasted line
(`stat …`) could be taken as the password. Bash 5.2 on Ubuntu 24.04 turns bracketed paste on by
default, and H3 is already done, so the risk applies only to a later rotation.

## Against the whole task

Every required outcome and every item of *To do* was checked against the commits. The fixed
Polish sentences, the subject and the three body parts were compared with `task.md` by fixed
string. All 13 occur verbatim in `src/`.

- **To do 1, 2:** the send runs after the session is stored, through Nodemailer 10.2.1 to the
  configured host and port, with STARTTLS required and checked before login. The 201 comes with
  the account in every outcome, `limited` and a block included. The text is plain, and the
  subject and the three paragraphs match exactly.
- **To do 3, 4:** the link is `<origin>/#confirm-email=<token>`. The page posts the token under
  D-104 without needing a session, shows „Potwierdzanie adresu…” where „Sprawdzanie logowania…”
  stands, and then puts one sentence above the forms or the game. The fragment is cleared only on
  a definitive answer.
- **To do 5, K1:** the lifetime is 24 hours and a link works once. Recording a new link stops the
  earlier ones in the same transaction (the K1 settlement prevails over spec Decisions 3, 4 and
  12). D-143 and `email-confirmation-link` say what the code does.
- **To do 6, 7, K3:** the header row sits after the title and „Wyloguj” and shows the three
  outcome sentences with their roles. The resend works only with a session, sends only to the
  account's own address and takes the body `{}`. The waiting label is „Wysyłanie…”, focus comes
  back to the button, and the row disappears on a confirmed address or on `409`.
- **To do 8, K4:** D-44, the styleguide's "States of shared controls" and the kitchen-sink rule
  all name the label. The kitchen-sink page shows the waiting sample and both refusal samples,
  built with the real module.
- **To do 9:** step 3 is appended, and steps 1 and 2 are unchanged. The move from version 2 keeps
  every account, session and value, and leaves every account unconfirmed. The move is tested.
- **To do 10, K6, K7:** the five settings are plain values in `compose.yaml`. The password file
  `/etc/loop2/smtp-password` is a short-form secret granted to `app` alone. Any missing or bad
  setting refuses startup before the server listens. The wholly unconfigured mode stays.
- **To do 11:** both copies of the skill, byte-identical, cover the password, its rotation, H1
  and H2, the agent's limits, the error codes, H4 and the version-3 rollback note. See N1 for
  the gap.
- **To do 12:** D-150, `guidelines/coding-mail-sending.md` and the index row exist. See N2.
- **To do 13:** D-151 was approved by the human (WAY-172), and `guidelines/testing.md` carries
  it.
- **To do 14:** the fact `mikrus-outsider-mail` was written whole, word for word as projected.
- **To do 15 (H4):** left to the human, as planned. F24's delivery sentence is not written.
- **To do 16, K10:** the block stops every link in its own transaction, and the unblock restores
  none. Tests run through a second connection and through the command's own process.
- **Settlement rows** K1–K7, K9 and K10 are recorded as D-143, D-144, D-145, D-44, D-146, D-111,
  D-13/D-17, D-147, D-148 and D-137.
- **Projected entries:** D-140, D-141, D-142, `account-email-via-outsider` and
  `account-email-nodemailer-starttls` hold the confirmation part of each projection, without
  invented content. D-140 drops only "for account recovery", which is the reset part.
- **Trust boundary:** I traced crafted input through each entry point:
  - the confirmation token is checked for type, form and length, looked up by its digest, and
    every failure gets one refusal;
  - the resend body must be `{}`;
  - recipient addresses that D-99 accepts but that could add a recipient or header text are
    refused before connecting;
  - Outsider's replies reach the log only as an upper-case code;
  - the password never appears in the environment, an argument, a log or a response.
- **Operation that cannot be undone:** nothing in the range deploys or touches the server. The
  schema step runs only on temporary databases and in Docker test containers.
- **Changed invariant tests**, each a change of requirement with its reason and no weaker
  assertion:
  - `tests/account-storage.test.mjs`: `account-database-schema` and `account-schema-lifecycle`;
  - `tests/startup.test.mjs`: `account-startup-configuration`;
  - `tests/invariants/test_account_server_default_address.py`: `account-server-default-address`;
  - `tests/invariants/test_loop2_host_sharing.py`: `loop2-host-sharing`;
  - `tests/transport.test.mjs`: `account-mutation-request-guards` and `account-request-transport`;
  - `tests/http.test.mjs`: `account-session-authorization` and `blocked-account-access`;
  - `tests/account-api.test.mjs`: `account-client-outcomes`;
  - `tests/deploy/test_account_storage.py`: `account-schema-lifecycle`. This is the O1 fix,
    judged here: it now compares only the account fields of the registration body, and the three
    later whole-body comparisons still catch any extra or missing field.
- **Unreviewed slices** (3, 6, 7, 8, the O1 fix and 10) were judged as section 2 judges a slice.
  - Slice 6: own-work check (extra properties dropped, own status only) confirmed by its tests.
  - Slice 7: own-work check (fragment cleared only on a definitive answer, notice placement)
    confirmed by `tests/view/email-confirmation.test.mjs` and
    `tests/view/account-screen.test.mjs`, and by my mutations below.
  - Slice 8: kitchen-sink samples and styleguide text match To do 8.
  - Slice 10: every case title it cites exists verbatim in the test files (checked by fixed-string
    search), and every row it changed matches the routes.
  - Slice 3: rules carried by D-142, D-146 and D-150; see N2.

## Declined to judge

- An attacker using up D-105's 30 messages an hour by registering foreign addresses — this is
  D-105 as decided, not something this change introduced.
- Whether Outsider accepts the full address as login, non-ASCII local parts (SMTPUTF8), and
  outbound TCP from the container to port 587 — settled only by H4 (spec § 11).
- Installing with npm 11.13.0 instead of the pinned 12.2.1 — `npm ci` with npm 11.13.0 succeeded
  on the lockfile, and the introduced-vulnerabilities audit passes.
- *Invariant* `none` on four rules of the mail-sending kind file — WAY-168 allows `none` where no
  cheap test checks the rule. Whether a script could check `requireTLS` and similar options is a
  question for the guideline-maintenance skill, not a defect of this change.
- The stale `ready for cycle` label of task 19 in the project plan — plan upkeep, not this change.
- Leftover Docker images `loop2-account-storage-check:a0d184f63298` and `:bd7784839963`, 15 hours
  old — they are not from my runs, which cleaned up after themselves.

## Checks run

All checks ran in a separate detached worktree of `28f0686` under the session scratchpad
(`rv-whole-28f0686`, `.the-way` initialized at `3aee7d9`, `npm ci` with npm 11.13.0 / Node
24.17.0: exit 0). The quality checks reached the reviewed worktree's `.runs/quality-venv` through a
directory junction in my own worktree. The junction was removed first, then the worktree
(`git worktree remove --force`, `git worktree prune`). The venv is intact.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 44 pass |
| `npm test -- tests/http.test.mjs` | 0 | 33 pass; the Slice 5 m1 stack trace printed in the block cases |
| `npm test -- tests/transport.test.mjs` | 0 | 8 pass |
| `npm test -- tests/startup.test.mjs` | 0 | 15 pass |
| `npm test -- tests/account-mail.test.mjs` | 0 | 7 pass |
| `npm test -- tests/account-api.test.mjs` | 0 | 11 pass |
| `npm test -- tests/view/email-status.test.mjs` | 0 | 8 pass |
| `npm test -- tests/view/email-confirmation.test.mjs` | 0 | 5 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 22 pass |
| `npm test -- tests/view/clock.test.mjs` | 0 | 4 pass |
| `npm test -- tests/invariants/test_loop2_host_sharing.py` | 0 | 18 OK |
| `npm test -- tests/invariants/test_account_server_default_address.py` | 0 | OK |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 | OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | OK |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | OK |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 OK (ESLint, Prettier, Ruff, ShellCheck, introduced-vulnerabilities audit) |
| `npm test -- tests/invariants/test_loop2_one_serving_process_container.py` (Docker answered) | 0 | 3 OK, none skipped |
| `npm test -- tests/deploy/test_account_storage.py` (Docker answered) | 0 | 1 OK, not skipped — confirms the O1 fix |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `npm run typecheck` | 0 | |
| Mutation `accountOfBody` accepts a missing `emailConfirmed`, then `tests/account-api.test.mjs` | 1 | 1 fail — killed |
| Mutation the header row ignores a `sent` registration outcome, then `tests/view/email-status.test.mjs` | 1 | 1 fail — killed |
| Mutation the fragment cleared on every answer, then `tests/view/email-confirmation.test.mjs` | 1 | 1 fail — killed |
| Mutation `showForms` no longer disposes the header row, then `tests/view/account-screen.test.mjs` | 1 | 1 fail — killed |
| Mutation the row never hidden for a confirmed account, then `tests/view/email-status.test.mjs` | 1 | 1 fail — killed |
| Mutation no `button.focus()` after the answer, then `tests/view/email-status.test.mjs` | 1 | 2 fail — killed |
| Manual: fixed-string search of the 13 fixed Polish texts in `task.md` and `src/` | — | each present verbatim |
| Manual: fixed-string search of each case title `guidelines/testing.md` cites | — | each found in the file named |
| Manual: `cmp` of the three skill file pairs at `28f0686` | — | identical |

Three of my first mutation attempts did not compile (TypeScript errors), so they proved nothing.
I replaced them with the type-valid mutations listed above. Each mutated file was restored with
`git checkout` in my worktree.

Not run:
- the whole gate (`npm test` without a file) — that is the orchestrator's run;
- `tests/invariants/test_loop2_one_serving_process.py` — it fails on the base on this machine
  (cycle record, *Verification*);
- a screenshot of the running game — no settled route (N4);
- anything on the server or towards `outsider.mikr.us` — forbidden by the dispatch.

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md` § "Reading the foundation" and
  `.the-way/product-guidelines/reading.md` — the selection method this review uses.
- `.the-way/product-guidelines/coding/template.md` (*Files of this kind*, *Where in code*, the
  *Invariant* field), WAY-168 and WAY-198 in `.the-way/foundations/decisions.md` — to judge the
  mail-sending kind file (N2, N3, Declined).
- WAY-219 and `.the-way/task-cycle/change/ui_check.md` — to judge the missing screenshot (N4).
- `guidelines/coding-browser-module.md` (whole) and the *Where in code* of every kind file — N3,
  and the consistency of Slice 3.
- `src/server/account-block.ts` and the deploy skill's blocking section — N1.
- `foundations/part_map.md` lines 56-80 and 155-175 — Slice 2 M1.
- `tests/account-storage.test.mjs` lines 635-690 — whether Slice 1 m1 still stands.
- `.runs/task-cycles/potwierdzenie-adresu/cycle.md` — slice table and questions Q1-Q22.
- The slice review reports 09, 11, 13, 16, 18, 23 and 25, and the executor reports 06, 14, 19,
  20, 21, 26 and 27 — as the handoff lists them.
