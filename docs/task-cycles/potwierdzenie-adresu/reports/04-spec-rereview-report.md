PASS

# Report — spec reviewer, revision of `potwierdzenie-adresu`

- Spec reviewed: `.runs/task-cycles/potwierdzenie-adresu/spec.md`, as revised after
  `reports/02-spec-review-report.md` (FAIL, three findings).
- Designer's revision report: `reports/03-spec-revision-report.md`.
- Method: `.the-way/task-cycle/spec/SKILL.md` and `review.md`, reviewer variant, review of a
  revision. For each earlier finding I say whether it is resolved, and I report only what the
  revision broke besides.
- Read: the revised spec, mainly Constraints, Decisions 3, 4, 9 and 12, *Foundation entries* and
  *Left to the maker*, against the frozen task and the foundation entries already read for the
  first review.

## Earlier findings

### 1. Partial projected entries handed to task 21 — resolved

*Foundation entries* no longer says task 21 writes `account-email-nodemailer-starttls/1`. It now
lists the five projected entries this change writes in their confirmation part, citing the task's
line 127 and WAY-126:

- three decisions: „How does a player sign in and reset a forgotten password?”, „Which service
  delivers account emails?” and „How does the account server send email through Outsider?”;
- two invariants: `account-email-via-outsider/1` and `account-email-nodemailer-starttls/1`, the
  second proved by the STARTTLS case of Decision 9.

The Nodemailer `requireTLS` fact is now the *Based on* of the partial „How does the account
server send email through Outsider?” and of `account-email-nodemailer-starttls/1`, so it no longer
supports nothing. `mikrus-outsider-mail/1` is placed under the partial „Which service delivers
account emails?”.

### 2. A database failure inside the send step — resolved

Decision 4 now gives each failure one outcome:

- issuing the row throws → `failed`, and no message is sent;
- retiring the earlier links throws after `sent` → `sent`, with one fixed log line that holds no
  token and no address;
- issuing finds the account blocked → `failed` at registration, JSON 401 `unauthenticated` on the
  resend route.

The registration answer stays 201 with the account in every case, which keeps To do 1. A
database failure in `POST /api/email-confirmation` stays an ordinary 500, and the fragment stays
for a retry. Decision 9 adds the route case for a failed issue.

### 3. A link issued while a block commits survives the unblock — resolved

Decision 3's issue operation reads the blocked state in its own transaction and inserts nothing
for a blocked account (outcome `blocked`). A block committed after the insert spends the row
through `blockAccount`. Either way no link issued around a block works after the unblock, which
is the rule D-112 keeps for session writes. The unit table and Decision 9 carry it, with two
cases: a block through a second connection while the stand-in mailer holds its answer, and a
block before issuing.

## Broken by the revision

Nothing. The revised Decisions 3, 4 and 9 agree with each other, with *Foundation entries* and
with the task. The notes from the first review are handled too:

- the header citation now reads `src/browser/view/app.ts:30`–`36`;
- the `guidelines/testing.md` bullet now names the existing rows this change alters.

## For the orchestrator's record — choices, not findings

- **Retire failure versus K1 and To do 5.** Decision 4: when retiring the earlier links throws
  after a delivered message, the earlier links stay usable until they expire or are spent. This
  is the only case where "wysłanie nowego odnośnika … unieważnia wcześniejsze" is not met. The
  spec names it and gives a reason. It is a deliberate departure from To do 5 in a failure path,
  worth a row beside Q1–Q6 in `cycle.md`.
- **The second sentence of „Which service delivers account emails?”.** The foundation step
  writes it only if H4 has passed before the merge; otherwise the request names it as left to
  task 21. The task places H4 "in the cycle", so it should normally pass before the merge. The
  designer flags this reading as theirs; the orchestrator may instead leave it to the return
  step after H4.
- **Registration session failure.** It still answers 503 and sends no message. This stands from
  the first review and is still to be recorded in `cycle.md`.

## Reaches beyond the dispatch

None in this round. The WAY-126 passage the revision cites is the one I read in the first review.
