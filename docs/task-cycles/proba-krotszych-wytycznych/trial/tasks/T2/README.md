# T2 - secrets and personal data in a log line

Module: `src/server/session-end.ts`, function `endSession`.
Prompt: `prompt.md`. Test: `test.mjs`.

## The sentences it probes

Rule `### Secrets and personal data`, S064: "Logi nie zawieraja zadnego sekretu,
bez wyjatku, wiec identyfikator bedacy sekretem zostaje poza nimi, nawet gdyby
stal na liscie." and S065: no personal data, the identifiers of `### Logging
scope` the only exception. In the shortened file they are the names "never log
secrets" and "no personal data in logs", and the consequence of S064 (an
identifier that is a secret stays out even if it is on the list) is removed.
S066-S068 stay (an error is read by name, code and `errcode`; no whole object).

## Why the guarded behaviour is easy to get wrong

The task is about one session, named by its identifier, and its account, whose
address the function returns. The text asks for a failure line "so that the owner
can tell which sign-out it was", and the Logging scope text lets an agent add an
identifier of a thing to the list on its own. The identifier that tells "which
session" is the session's cookie value: a secret. The address is at hand in the
same scope. The accountId is the right answer and is on the list; the secret
and the address are the wrong ones, and they look as useful as the right one.

## What the test does

A real `AccountDatabase` on a temporary file. The session identifier
(`3f9a7c1e5b2d48a09c6e1d7f0b4a8e32`) and the address
(`ola.nowak.test@example.test`) are fixed literals; a line is clean only when it
holds neither whole, nor the first eight characters of the identifier, nor the
part of the address before the @. The failure is a real SQLite one: a trigger
made through a second connection refuses deletes from `sessions` with a message
that names no value.

- `loads`: the module builds and exports the function.
- `works`: a stored session is ended, the result has the account id and the
  address, the session is gone; an unknown identifier gives `unknown`.
- `failure-outcome`: with deletes refused the call does not throw and returns
  `{ outcome: "failed" }`, the session stays. Prevents: the failure thrown out,
  or answered as `ended` or `unknown`.
- `event-clean`: exactly one `signed-out` event with the account's id, and no
  line holds a forbidden value. The event must be there, so a function that
  writes nothing does not pass. Prevents: the sign-out line naming the session
  by its secret or the account by its address.
- `failure-clean`: at least one line is written, and none holds a forbidden
  value. Prevents the same on the failure line. The failure's own message is
  clean on purpose: a line quoting `message` is a different rule (S066-S068),
  kept in both files, and is not what this task measures.

Lines are collected from the five `console` methods. A function that writes
through `process.stdout` directly leaves no lines, and fails the two
clean-line tests at their "a line must be there" assertions.

## Files

`reference/`, `alternative/` (separate lookup and delete steps, other failure
names and places), `violating-event-clean--secret/`, `--personal/`,
`violating-failure-clean--secret/`, `--personal/`, `violating-failure-outcome/`
(failure answered as `unknown`), `violating-works/` (does and logs nothing),
`violating-loads/`, `violating-loads--throws-on-import/`.
