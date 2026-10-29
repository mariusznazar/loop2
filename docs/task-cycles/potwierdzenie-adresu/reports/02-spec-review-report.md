FAIL

# Report — spec reviewer, task `potwierdzenie-adresu`

- Spec reviewed: `.runs/task-cycles/potwierdzenie-adresu/spec.md` (first review, not a revision)
- Method: `.the-way/task-cycle/spec/SKILL.md` and `review.md`, reviewer variant; pin
  `.the-way` at `3aee7d958835cc19b95519f4d21b37538b78e3e1`, equal to the gitlink.
- Worktree head read: `7a633a7`, clean.
- Read against: the frozen task whole; the designer's report; every foundation entry, guideline
  file and product file the handoff names.

The spec answers all eight *Questions carried to cycle*. It also gives a mechanism for every
settlement row the handoff lists (K2, K3, K4, K6, K7, K10, testing without Outsider). Each of
To do 1–16 has a place in it. Three findings remain. Each is a point where the build or the
foundation step would go wrong if it follows the spec as written.

## Findings

### 1. The spec hands writing the partial projected entries to task 21, against the task and WAY-126 (medium)

The task, *Decisions in play*, line 127: "Zapisuje część wpisu, którą jego kod czyni prawdziwą
(WAY-126), a resztę dopisuje zadanie zapisujące." WAY-126 (`.the-way/foundations/decisions.md`)
says: "where the code makes only part of it true, the agent writes that part and the human
accepts its meaning at the merge". The task names the parts this change makes true (lines
135–139):

- "How does a player sign in and reset a forgotten password?": "a confirmation message
  establishes that address";
- "Which service delivers account emails?": its first sentence for confirmation messages, and
  the delivery of the confirmation message from the intended container;
- "How does the account server send email through Outsider?": the confirmation part;
- `account-email-via-outsider/1`: the confirmation part;
- `account-email-nodemailer-starttls/1`: the confirmation part.

The spec's *Foundation entries* lists none of the partial decisions. On the invariants it says
the opposite: "The projected `account-email-nodemailer-starttls/1` is written by task 21 per the
plan; this change's test proves its confirmation part." The designer's report repeats this.

The spec also contradicts itself. It asks for "a Nodemailer 10 fact for `requireTLS` … as the
*Based on* of the STARTTLS decision", but it writes no STARTTLS decision in this change. The
fact would support nothing.

Why it matters: the foundation step reads the spec's list. If it follows the list, the change
merges Nodemailer, STARTTLS and Outsider sending with no decision or invariant in the
foundation, and the human does not accept the meaning of those parts at the merge, which
WAY-126 requires. The return step might catch the gap, but only if it reads past the spec.

Fix: list the five partial entries as written by this change (confirmation part only, wording
per the foundation step), and point the Nodemailer fact at the partial "How does the account
server send email through Outsider?".

### 2. The spec does not say what a database failure inside the send step does (low–medium)

Decision 4 says the send step "never throws to the route: every mailer failure is the outcome
`failed`". Decision 6 makes the mailer itself never reject. But two steps around the mailer are
`AccountDatabase` writes and can throw: issuing the link row, and retiring the earlier links
after `sent`. They can throw on `SQLITE_BUSY` after the 1 s busy timeout, for example while the
owner's block command holds the write lock, or on a disk error.

At registration the session is already stored when the send step runs. A throw there goes to
the error handler of `src/server/app.ts` and answers 500 "Account service failed", carrying the
session cookie. The account screen then shows a failure and the player does not enter the
headquarters. That breaks To do 1: "konto powstaje, a gracz wchodzi do siedziby także wtedy, gdy
wysyłka się nie uda". A throw from the retire step after a delivered message would likewise
report a failure for a message that was sent.

The builder has to guess which of these answers is meant. The wrong guess breaks To do 1.

Fix: one sentence in Decision 4. A failure to issue the row gives `failed` and no message is
sent. A failure to retire after a delivered message gives `sent`, and the earlier links stay
valid until they expire, or whatever the designer chooses. In both cases the registration
answer stays 201.

### 3. A link issued while a block commits survives the unblock (low)

The issue operation (Decision 3) counts rows and inserts one, but nothing reads the account's
blocked state in that transaction. The resend route checks the block when it reads the session
(`sessionAccount`). Registration checks it when the session is stored. Either way the check runs
before the send step's own transaction. A block the owner's command commits in between (another
process, another connection) spends only the rows that exist at that moment. The new row comes
after, so:

- the message still goes to a blocked account;
- after unblocking, that link confirms, because it is unspent, unexpired and its account is no
  longer blocked.

To do 16 and K10 say that blocking invalidates every link sent ("unieważnia wszystkie wysłane
odnośniki"). The spec's own invariant candidate says a link confirms "only while its account is
unblocked". The product already guards this exact race for sessions. D-112: "a session write
for a blocked account stores nothing". Its rationale: a block committed during a login "either
deletes the session that login stored or makes its write store nothing".

Fix: the issue operation reads the block in the same transaction, inserts nothing for a blocked
account and ends the step with no message. The spec then names the outcome the route gives
(`failed`, or 401 on resend, as the designer chooses).

## Not findings — for the orchestrator's record

- Decision 4: if the registration session cannot be stored (503), no message is sent although
  the account exists. To do 1 says the server sends after the account is created. The spec's
  choice is defensible: the database is the likely fault and the browser cannot show the
  outcome. It is an autonomous choice worth a row beside Q1–Q6 in `cycle.md`.
- `guidelines/testing.md` also changes outside the two new routes' rows the spec names. Rows to
  update:
  - the `GET /api/account` row ("200 z samym identyfikatorem konta i znormalizowanym adresem");
  - the `POST /api/accounts` and `POST /api/session` rows;
  - the D-104 rows that list three routes;
  - the transport row ("na czterech trasach").

  `the-way-maintain-testing-guidelines` should catch these, so this is not a finding.
- Constraints cite "the header is built in `src/browser/view/app.ts:254`–`260`". The file has
  125 lines; the header is built at `src/browser/view/app.ts:30`–`36`.
- The designer's report leaves the unpacked Nodemailer tarball at
  `C:\Users\Mariusz\AppData\Local\Temp\nmcheck-10253` for the human to remove.

## Checks I ran

- To do 1–16, answers 1–10, K1–K7, K9, K10 and the eight carried questions, one by one against
  spec Decisions 1–12 and *Foundation entries*. The three findings above are the only points
  that drop, change or leave open a requirement. The designer's readings Q1–Q6 hold: each is
  within the task's words and named with its cost.
- Foundation consistency, against D-05, D-13, D-15, D-17, D-39, D-40, D-44, D-96, D-99, D-102,
  D-103, D-104, D-105, D-109, D-111, D-112, D-116, D-117, D-137, D-138, D-139 and the named
  invariants. Every change the spec makes to them is listed as a change in *Foundation entries*.
  No unlisted contradiction, apart from finding 1.
- Code claims, checked against the code:
  - schema step 2 is in `src/server/database.ts`;
  - the `router.all` transport gate and `mutationGuards` are in `src/server/account-routes.ts`;
  - the configuration is all-or-nothing in `src/server/configuration.ts`;
  - the 15 s client limit is at `src/browser/account-api.ts:72`;
  - `express.static` is at `src/server/app.ts:58`;
  - `.session-check-text` in `text-secondary` is at `src/browser/styles.css:186`;
  - `compose.yaml` has the two secrets;
  - `deploy/loop2-deploy` exit 8 is "a loop2 service did not start healthy";
  - the secret checks in `tests/invariants/test_loop2_host_sharing.py` and
    `tests/invariants/account_container_support.py`.

  All hold, apart from the `app.ts` line citation above.
- Timing of Decision 5: the Argon2id profile (64 MiB, t=3, `src/server/passwords.ts`) plus the
  session write plus the 10 s send deadline fits inside the client's 15 s.

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md`, WAY-126 (whole entry). The frozen task cites it at line
  127 for writing partial projected entries; finding 1 rests on it.
- `src/server/passwords.ts`: the hash profile, to check Decision 5's 10 s deadline against the
  15 s client limit.
- `src/browser/styles.css` (header and `.session-check-text`) and
  `src/browser/view/controls/button.ts` (`setButtonWaiting`): to check Decision 10's claims.
- `tests/invariants/test_loop2_host_sharing.py` and `tests/invariants/account_container_support.py`
  (grep of their secret and setting lines): to check Decision 8's claims.
- A grep of the worktree for consumers of `LOOP2_SESSION_SECRET_FILE`, `openAccountRuntime` and
  `readAccountConfiguration`: to see which tests Decision 7's required mail settings reach.
  `tests/transport.test.mjs`, `tests/password-measurement.test.mjs` and
  `tests/invariants/test_account_server_default_address.py` are reached too. Decision 7's cost
  covers them in general terms.
- Not read: the project definition, the Outsider wiki and the Nodemailer documentation. The
  frozen task quotes every passage the findings rest on.
