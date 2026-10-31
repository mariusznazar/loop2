# Handoff — spec designer, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch
  `task/reset-hasla`, head = base `95de83b` (`main`, the merge of task 16). Process pin `.the-way`
  at `a8dfe8a`, not moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it) when the step that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/reset-hasla/task.md` — read it whole. Its line 3 reads `Status:
  ready for cycle`; its text is the document the human accepted.
- Spec path: `.runs/task-cycles/reset-hasla/spec.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Do not commit; the spec stays in the
  ignored `.runs/`. Do not run the product's gate (`npm test`); it is the orchestrator's, and a run
  of it is going on in this worktree while you read.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`. The change adds two routes that take data from the network without a session:
  a request naming an email address, and a password set authorized by a token alone. It changes
  who may ask for a message, what ends a session and what clears an attempt lock. Every code review
  of the cycle checks crafted input at that boundary: token forms, origin and body guards, account
  enumeration through content or time, tokens and links never reaching logs, a link of another
  kind, a blocked account, a login in progress.
- Irreversible operation: **no at the start**. The task's *Context* says links need no new schema
  version. If your design needs a schema step, say so plainly in the spec and in your report: it
  would make this answer yes (D-112, D-15: after it a rollback to an earlier commit refuses the
  database). Prefer a design that needs none where it fulfils the task equally well.

## The open design choice

The task's section *Questions carried to cycle* leaves these open (word for word from the frozen
task):

> - Jak logowanie starym hasłem, które trwa w chwili ustawienia nowego hasła, nie zostawia działającej sesji po usunięciu sesji konta (pytanie 5): D-112 mówi to dla blokady (“a session write for a blocked account stores nothing”, *Rejected*: “a login in progress at the block stores its session afterwards”), a dla resetu żaden wpis tego nie mówi.
> - Jak trasa ustawienia hasła sprawdza odnośnik przed pracą nad hasłem i ponownie w transakcji zapisu, tak by zły token nie zajmował bramki D-103, a blokada albo nowszy odnośnik z czasu haszowania niczego nie zmieniły (D-112: “no transaction spans asynchronous hashing, mail sending or an HTTP response”; D-155, D-160).
> - Jak odpowiedź na prośbę nie czeka na serwer poczty, a wysyłka dalej ma ograniczony czas i zapisuje porażkę w logu bez tokenu i odnośnika (D-162), skoro dziś obie trasy wysyłające czekają na wynik (`boundedSending`, *Context*).

Beside them, the spec gives the design that the task's *Settlements to record* (rows 1–19) rest on
where a row leaves the mechanism open. The orchestrator noticed these points while reading the code
at the base; each is a place to settle, not a stated answer, and you may find it needs nothing:

1. The second sentence of Settlement row 3 says neither the answer's content nor its *time* tells
   what became of the request. `issueLink` is a synchronous transaction with `PRAGMA synchronous =
   FULL` that runs only for some branches (an account with a confirmed address), so its place
   relative to the response matters, as does a database failure at that step.
2. A set-password request may arrive with a valid session cookie of the same or another account
   (row 6 shows the form to a signed-in player). What `express-session` does at the end of that
   request — saving or touching the session the request loaded, after the route deleted it — is to
   be read from the library, and its outcome must leave no session (row 14, `saveSession` in
   `src/server/database.ts`).
3. The order of the set-password route: guards, fields, password rules, link pre-check, admission
   and gate, hashing, the write transaction. Which refusal a request gets when both its link and
   its password are bad is settled by the rows only in part (rows 10, 11, 13, 19).
4. Whether that route takes an attempt ticket of the account policy (D-102, D-103, D-116) or only
   the gate of password work, and how the failure of hashing maps to row 11.
5. How clearing the email address's failure history and lock (row 15) works together with a login
   of that address in progress, whose ticket settles afterwards (D-116: "each admitted attempt is
   settled once"), and where the order of the database write and the clearing lies.
6. What happens to `sendConfirmation`'s shared shape: what the two sending paths share and where
   they differ, given that this route's outcome is never shown (D-161, D-162).
7. How the browser tells `#reset-password=` from `#confirm-email=`, what happens with the game and
   `game-saver` while the form stands for a signed-in player, and how the screen's third state and
   the form fit `account-screen.ts` and `app.ts` (rows 1, 6, 8, 9, 10; D-96, D-44, D-117).
8. How `Anuluj`, the success and the refusal remove the fragment (`email-confirmation.ts` does the
   same for its fragment) so that a reload neither reuses nor resubmits the token.

The wording of the foundation entries is the foundation step's, made later by the author; the spec
gives the design they rest on and names the entries the change will write. Where the task and
foundation already settle a point, the spec cites them and does not reopen it. Never widen the task.

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`,
`foundations/environment_facts.md`, `foundations/glossary.md`):

- Decisions in play (the task's list): D-44, D-96, D-98, D-99, D-100, D-101, D-102, D-103, D-104,
  D-105, D-106, D-109, D-112, D-116, D-117, D-137, D-138, D-139, D-152, D-153, D-154, D-155, D-156,
  D-158, D-159, D-160, D-161, D-162, D-163, D-203, D-211.
- Decisions of the touched parts the design leans on: D-11, D-15, D-36, D-37, D-39, D-40, D-42,
  D-45, D-47, D-81, D-84, D-85, D-97, D-107, D-110, D-111, D-113, D-114, D-115, D-157, D-202, D-204,
  D-207, D-208.
- Invariants: `player-password-login`, `email-verification-nonblocking`, `password-operation-gate`,
  `player-argon2-password-hash`, `account-session-authorization`,
  `account-mutation-request-guards`, `account-request-transport`, `account-attempt-limits`,
  `account-attempt-tracking`, `account-message-limits`, `player-server-session`,
  `player-opaque-session-cookie`, `player-express-session-sqlite-store`, `account-session-storage`,
  `account-schema-lifecycle`, `account-database-schema`, `blocked-account-access`,
  `unblock-restores-no-session`, `unblock-restores-no-link`, `email-confirmation-link`,
  `account-client-requests`, `account-client-outcomes`, `account-email-via-outsider`,
  `account-email-nodemailer-starttls`, `expired-session-unsaved-progress`.
- Environment facts and glossary terms these entries link to, as far as the design needs them.
- Part map (`foundations/part_map.md`, short — read whole).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-password-hashing.md`,
`guidelines/coding-mail-sending.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Product files the choice depends on (read to design, not to write): `src/server/*.ts` (notably
`database.ts`, `account-routes.ts`, `account-policy.ts`, `account-mail.ts`, `passwords.ts`,
`session-store.ts`, `transport.ts`, `app.ts`), `src/browser/account-api.ts`,
`src/browser/view/app.ts`, `src/browser/view/account-screen.ts`,
`src/browser/view/email-confirmation.ts`, `src/browser/view/game-saver.ts`,
`src/browser/kitchen-sink/kitchen-sink.ts`, `tests/http.test.mjs`, `tests/account-storage.test.mjs`,
`tests/account-mail.test.mjs`, `tests/account-api.test.mjs`, `tests/view/account-screen.test.mjs`,
`tests/view/email-confirmation.test.mjs`, and `node_modules/express-session/index.js` where the
base `npm ci` has placed it (reach it for point 2 above).

The task's sources: the frozen task quotes what it rests on word for word. The project definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (sha256
`fda97782458d`) may be searched selectively for a passage the task cites. Name each such reach.

## Return

Write the spec and your report as `design.md` gives, and return your status (`questions` or
`done`) with the two paths.
