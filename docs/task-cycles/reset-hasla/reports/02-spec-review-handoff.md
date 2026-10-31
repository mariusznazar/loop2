# Handoff — spec reviewer, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer** of the spec, a fresh
agent that did not write it. Your questions go to the orchestrator, never to the human; you return
before any plan, slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch
  `task/reset-hasla`, head = base `95de83b`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read `review.md`
  beside it when the step that names it comes.
- Variant: you review the spec.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md` — read it whole.
- Spec to review: `.runs/task-cycles/reset-hasla/spec.md`
- The designer's report (its readings and the ways it weighed):
  `.runs/task-cycles/reset-hasla/reports/01-spec-design-report.md`
- Report path: `.runs/task-cycles/reset-hasla/reports/02-spec-review-report.md`
- Do not commit. Do not run the product's gate (`npm test`).

## Answers of step 4

- Trust boundary: **yes**. `src/server/**` (part map, `account-server`). Two new routes take data
  from the network without a session. Check crafted input at that boundary: token forms, origin and
  body guards, account enumeration through content or time, tokens and links never reaching logs, a
  link of another kind, a blocked account, a login in progress.
- Irreversible operation: **no**, on the spec's claim that no schema step is needed. Say so if you
  find the design does need one.

## The open design choice

The three items of the task's *Questions carried to cycle*, and the mechanisms the task's
*Settlements to record* (rows 1–19) leave open. The spec is to settle them without widening the
task, reopening what the task or foundation settled, or contradicting a current entry other than
as the task commands.

## What to read

The same selection the designer had, each whole:

- Decisions: D-44, D-96, D-98, D-99, D-100, D-101, D-102, D-103, D-104, D-105, D-106, D-109, D-112,
  D-116, D-117, D-137, D-138, D-139, D-152, D-153, D-154, D-155, D-156, D-158, D-159, D-160, D-161,
  D-162, D-163, D-203, D-211; and D-11, D-15, D-36, D-37, D-39, D-40, D-42, D-45, D-47, D-81, D-84,
  D-85, D-97, D-107, D-110, D-111, D-113, D-114, D-115, D-157, D-202, D-204, D-207, D-208 as far as a
  claim of the spec rests on them.
- Invariants: `player-password-login`, `email-verification-nonblocking`, `password-operation-gate`,
  `player-argon2-password-hash`, `account-session-authorization`,
  `account-mutation-request-guards`, `account-request-transport`, `account-attempt-limits`,
  `account-attempt-tracking`, `account-message-limits`, `player-server-session`,
  `player-opaque-session-cookie`, `player-express-session-sqlite-store`, `account-session-storage`,
  `account-schema-lifecycle`, `account-database-schema`, `blocked-account-access`,
  `unblock-restores-no-session`, `unblock-restores-no-link`, `email-confirmation-link`,
  `account-client-requests`, `account-client-outcomes`, `account-email-via-outsider`,
  `account-email-nodemailer-starttls`, `expired-session-unsaved-progress`, and
  `loop2-one-serving-process` (a claim of the spec rests on it).
- Environment facts and glossary terms these entries link to, as far as a claim needs them.
- Part map (`foundations/part_map.md`).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-password-hashing.md`,
`guidelines/coding-mail-sending.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Product files, to check the spec's claims against the code at the base: `src/server/*.ts`,
`src/browser/account-api.ts`, `src/browser/view/app.ts`, `src/browser/view/account-screen.ts`,
`src/browser/view/email-confirmation.ts`, `src/browser/view/game-saver.ts`,
`src/browser/kitchen-sink/kitchen-sink.ts`, the tests the spec names, and
`node_modules/express-session/` (`index.js`, `session/session.js`, `session/store.js`), which the
spec's claims about the end of a request and about synchronous saving rest on. Check those claims
in the library's source, not from the spec's words.

## Return

Write your report as `review.md` gives, and return its first line and the report's path.
