# Report — spec designer, revision of `potwierdzenie-adresu`

- Status: done
- Spec revised in place: `.runs/task-cycles/potwierdzenie-adresu/spec.md`
- Review answered: `.runs/task-cycles/potwierdzenie-adresu/reports/02-spec-review-report.md`
  (FAIL, three findings). All three held; none is disputed.

## Finding 1 — partial projected entries handed to task 21 (held, fixed)

Evidence: WAY-126 (`.the-way/foundations/decisions.md`, read whole): "where the code makes only
part of it true, the agent writes that part and the human accepts its meaning at the merge"; the
frozen task, *Decisions in play*: "Zapisuje część wpisu, którą jego kod czyni prawdziwą (WAY-126),
a resztę dopisuje zadanie zapisujące". My first spec read the plan's assignment as "task 21 writes"
and contradicted itself by asking for a Nodemailer fact with no decision to rest on.

Change in *Foundation entries*:

- The sentence "is written by task 21 per the plan" is gone.
- A new item lists the five projected entries this change writes in their confirmation part, each
  listed with its meaning in the request: the three decisions („How does a player sign in and
  reset a forgotten password?”, „Which service delivers account emails?”, „How does the account
  server send email through Outsider?”) and the invariants `account-email-via-outsider/1` and
  `account-email-nodemailer-starttls/1` (the latter proved by the mailer's STARTTLS case,
  Decision 9).
- For „Which service delivers account emails?” the second sentence (delivery from the intended
  container in a real test) depends on H4, not on code: the foundation step writes it only if H4
  has passed before the merge; otherwise the request names it as left. This is a reading of mine;
  the orchestrator may prefer to always leave it to the return step after H4.
- The environment facts now name what they rest under: `mikrus-outsider-mail/1` under the partial
  „Which service delivers account emails?”, the Nodemailer `requireTLS` fact under the partial
  „How does the account server send email through Outsider?” and
  `account-email-nodemailer-starttls/1`.

## Finding 2 — a database failure inside the send step (held, fixed)

Evidence: the issue and retire operations are `AccountDatabase` writes that can throw
(`SQLITE_BUSY` after the bounded busy timeout, `src/server/database.ts:89`, or a disk error); an
uncaught throw reaches the error handler of `src/server/app.ts:60`–`88` and answers 500, which
would break To do 1 at registration.

Change in Decision 4, the send step now names one outcome per failure:

- issuing throws → `failed`, no message sent (a message whose link has no row could never confirm);
- retiring throws after the mailer answered `sent` → `sent`, earlier links stay usable until they
  expire or are spent later; one fixed log line without token or address. Named in the spec as the
  one case where K1's invalidation is not met, and why (reporting a delivered message as failed
  sends the player back into the same fault);
- in every case the registration answer stays 201 with the account.

Also added: a database failure in `POST /api/email-confirmation` stays an ordinary 500; the page
keeps the fragment, so a reload retries (consistent with Decision 2). Decision 9 gained the route
case "a failure to issue the row still answers registration with 201 and `failed`".

## Finding 3 — a link issued while a block commits survives the unblock (held, fixed)

Evidence: D-112 keeps exactly this race closed for sessions ("a session write for a blocked
account stores nothing"; the session write reads the block in its own statement,
`src/server/database.ts:223`–`235`); my issue operation read no block.

Change in Decision 3: the issue operation reads the account's blocked state in its own
transaction and inserts nothing for a blocked account — new outcome `blocked`. A block committed
before the insert leaves no row and no message; one committed after spends the row, so a message
already on its way carries a dead link. Decision 4: `blocked` gives `failed` at registration and
JSON 401 `unauthenticated` on the resend route (as every request of a blocked account's deleted
session, D-137). The units table and Decision 9's test cases were updated (a block through a second
connection while the stand-in mailer holds its answer; a block before issuing).

## Not findings, handled while there

- Line citation corrected: the header is built at `src/browser/view/app.ts:30`–`36` (my first read
  printed two files with continuous numbering).
- `guidelines/testing.md`: the guidelines bullet now names the existing rows this change alters —
  the `GET /api/account`, `POST /api/accounts`, `POST /api/session` rows, the D-104 rows listing
  three routes, and the transport row "na czterech trasach".
- The registration-session-failure choice (503, no message) stands as written in Decision 4; the
  reviewer suggests the orchestrator records it beside Q1–Q6 in `cycle.md`.

## The four checks, after revision

1. No placeholder, `TBD` or empty section.
2. No contradiction found between the revised Decisions 3, 4 and 9, *Foundation entries* and the
   task; the one deliberate departure (finding 2's retire failure versus K1) is named with its
   reason.
3. Scope unchanged from the first report: one feature, large; slicing is the plan's.
4. One new two-way reading settled: the outcome when issuing finds the account blocked (`failed` at
   registration, 401 on resend).

## Reaches beyond the dispatch

- `.the-way/foundations/decisions.md`, WAY-126 whole — to check finding 1.
