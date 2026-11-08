# T1 - hiding a failure

Module: `src/server/saved-game-overview.ts`, function `summarizeSavedGames`.
Prompt: `prompt.md`. Test: `test.mjs`.

## The sentence it probes

Rule `### Hiding a failure`, sentence S055: "Awarii nie zamieniaj ani w
odpowiedz "wszystko w porzadku", ani w pusta liste." In the shortened file it is
replaced by the name of the practice, "fail loudly". S056 (a degraded mode only
where a task sets it, with a log line) stays in both files; the task sets none.

## Why the guarded behaviour is easy to get wrong

The function is a listing for an overview page: the natural-looking reflex is to
let the page "still render" by catching the error around the reads and returning
what was read, or `[]`. The task text names the caller (a page) and does not
say what a failure should do, so nothing in the text asks for loudness; only the
guideline does. An agent that writes no `try` at all passes by default, which the
measurement accepts: the test only decides whether the failure was hidden.

## What the test does

All on a real `AccountDatabase` on a temporary file (no stand-in; the failures
are real SQLite failures).

- `loads`: the module builds and exports the function.
- `works`: three accounts saved twice, never and once, plus an id no account has,
  in a given order; the result is the two summaries in that order (hand-written
  expectation). Catches: a function that always throws or returns nothing
  passing the failure tests below.
- `failure-whole`: the table of saved games is dropped through a second
  connection, so every read throws; the call must throw (or reject). Failure it
  prevents: the failure of the database becoming `[]` or any other answer.
- `failure-one-record`: one account's row holds a revision no JavaScript number
  holds exactly, which `readSavedGame` refuses; the call must throw. Failure it
  prevents: the unreadable record being left out and the rest returned as the
  whole list. (A solution that fails only when every read failed passes
  `failure-whole` and fails this one.)

The test never reads the agent's source and does not look at the log: logging
the failure and then throwing, or not logging, are both fine.

## Files

`reference/` (no `try`), `alternative/` (records the failure and rethrows),
`violating-failure-whole/` (catch, return `[]`),
`violating-failure-one-record/` (skip the record), `violating-failure-one-record--partial-only/`
(throw only when all reads failed), `violating-works/` (always throws),
`violating-loads/` (wrong export), `violating-loads--throws-on-import/`.
