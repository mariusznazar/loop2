# Handoff — foundation entries, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **agent of the plan's *Foundation
entries***, a fresh agent. Your stage is the foundation step; you take no row of the variants table
of `make-change`. You write no product code and no test. Your questions go to the orchestrator,
never to the human. You return before any slice.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`, head = base `95de83b`.
  Process pin `.the-way` at `a8dfe8a`, not moved.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for how you
  commit and report, and `.the-way/task-cycle/skill/foundation_step.md`, the stage itself. Read each
  whole; read a file they name when the step that names it comes.
- Every entry goes through the pinned skill of its element, each with the `the-way-` prefix:
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`,
  `the-way-record-glossary-term`. Read the skill of an element under `.the-way/elements/` when you
  write an entry of it; it says what it reads, its search of the whole foundation included.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md` — the sections *Description* (To do),
  *Questions to settle*, *Decisions in play*, *Settlements to record*. A row's meaning is the row's
  and its wording yours. The rows may use excluding words (question 12).
- Reviewed spec: `.runs/task-cycles/reset-hasla/spec.md` — its Decisions and its section *Foundation
  entries*. The task binds where they differ.
- Plan: `.runs/task-cycles/reset-hasla/plan.md`; its section stands below, word for word.
- Report path: `.runs/task-cycles/reset-hasla/reports/06-foundation-report.md`. Your report holds, for
  each entry, its identifier and one sentence of its meaning **in Polish**, the language of the task
  document, for the request; and, for each row of *Settlements to record*, the entry that carries it
  or the entry already stating it (WAY-134).
- Commit on the task branch, in the repository's style (`docs: :memo: ...`, English, explicit paths
  with `git add <path>`, never `git add -A`). Separate commits by kind are welcome. No push.
- Run `python -B .the-way/elements/common/foundation_check.py` before you return and give its command
  and exit code. Do not run the product's gate (`npm test`); it is the orchestrator's.
- A question only where `foundation_step.md` allows one: you return it with the status `blocked`,
  and never write a row with another meaning.

If the whole set proves too much for one agent, return `returned` with what you wrote and where the
size lies: the plan's author proposed a split by kind, decisions first, then invariants and facts,
which changes nothing in the slices. Commits you made stay.

## Answers of step 4

- Trust boundary: **yes**, `src/server/**`. Your entries state the rules the reviews of that
  boundary will hold the code to.
- Irreversible operation: **no**. The reviewed spec needs no schema step. D-112 changes in its
  account of writes, not in its schema version.

## The orchestrator's rulings that bind you

- D-44 is written here, with the entries; the styleguide's text and the kitchen-sink page come in
  Slice 10, and the part of To do 11 that is the guideline's stays with that slice.
- `D-163` needs no change: no way of reaching Outsider changes.
- New identifiers replace the plan's labels N1–N6, I1–I3 and F1–F2. List the mapping in your report:
  the slices' handoffs use it.
- F1 and F2 cite the library as the facts of `foundations/environment_facts.md` do: by the pinned
  GitHub commit of express-session 1.19.0 (`c10b2a383841766899f6dcf53c8aff8c7fd3d2e7`, the designer's
  note), after reading the passage there. If that commit cannot be reached, cite what the file's
  rules allow and name it in your report.
- An invariant's check by a test names the test file as the plan gives; the slices write the tests.
  An entry written before its test exists is in order here, as the plan's author checked in
  `foundation_check.py`.

## What the plan gives

## Foundation entries

Every entry is written through the project skill of its element, as
`.the-way/task-cycle/skill/foundation_step.md` gives, on the task branch before Slice 1. The plan
names them and words none.

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-44 | decision, changed: the waiting texts of „Wyślij odnośnik” and „Ustaw hasło”, the two new forms on the kitchen-sink page, the sentence in `text-secondary` under the request form | rows 1, 3, 8; To do 11; spec, *Foundation entries* | Slices 8, 9, 10 |
| D-96 | decision, changed: the screen's third state, the form in place of game and forms, also for a signed-in player | rows 1, 6; spec | Slices 8, 9 |
| D-98 | decision, changed: the repeated-password rule holds for the new password, no comparison with the old one | row 7; spec | Slices 3, 6, 9 |
| D-102 | decision, changed: a successful reset clears the address's failures and lock and leaves the client address's | row 15; spec | Slices 3, 6 |
| D-105 | decision, changed: the ending of row 3's sentence is the "try later" of a limit; exhausting the hourly limit is an accepted cost | rows 3, 4; spec | Slice 5 |
| D-106 | decision, projected in part: the hash of a password set by a reset; a change of its wording only where the writer's search finds it needed | To do 5; the task's projected entry (D-106, part) | Slice 6 |
| D-109 | decision, changed: who may ask for a link, and what a reset link alone authorizes | row 2; spec | Slices 5, 6 |
| D-112 | decision, changed: setting a password by a link is one transaction; a session write that names a password hash stores nothing once the account holds another; its *Rationale* gains the second store | rows 12, 14, 19; Decisions 6, 7; spec | Slices 1, 2 |
| D-138 | decision, changed: the server also invalidates sessions at a reset | row 14; spec | Slices 1, 6 |
| D-152 | decision, projected in full: the confirmed address serving recovery and the single-use reset link | To do 12; the task's projected entry | Slices 1, 5, 6 |
| D-153 | decision, projected in full: password-reset messages and the real delivery test before public recovery | To do 12; the task's projected entry; question 11 | Slices 4, 5; H1 |
| D-154 | decision, projected in full: password-reset messages through Nodemailer | To do 12; the task's projected entry | Slice 4 |
| D-155 | decision, changed: a reset link is spent only together with the new password | row 12; spec | Slices 1, 6 |
| D-158 | decision, changed: the fourth paragraph; its *Rejected* no longer holds | row 17; spec | Slice 4 |
| D-160 | decision, changed: the refusal's sentence and place hold for a reset link too | row 10; spec | Slices 6, 9 |
| D-211 | decision, changed: a reset is a third cause of the ended session | row 14; spec | Slice 9 (the page's existing path; no code of its own) |
| N1 — the answer to a request for a link | decision, new: row 3's one answer, leaving before any work on an account, with the accepted cost of a recording commit's stall | row 3; Decision 2; spec | Slices 5, 8 |
| N2 — no limit per client address | decision, new: the accepted cost and its review condition | row 4; spec | Slice 5 |
| N3 — the form of a reset link | decision, new, parallel to D-156 | row 5; spec | Slices 5, 6, 9 |
| N4 — the form „Ustaw nowe hasło” | decision, new: its buttons, its outcomes, and that the page does not check the link first | rows 8, 9, 10, 11, 13; spec | Slices 6, 9 |
| N5 — the order of the set-password route and its gate without a ticket | decision, new | Decisions 4, 5; spec | Slice 6 |
| N6 — the reset message and no message about the change | decision, new: sender, subject, body and the accepted departure from OWASP | rows 16, 18; spec | Slice 4 |
| I1 — `password-reset-verified-email` | invariant, new, projected in full, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1, single use), `tests/http.test.mjs` (Slice 5, a message only to a confirmed address) | To do 12; the task's projected entry | Slices 1, 5 |
| I2 — `password-reset-link` | invariant, new, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 19; spec | Slices 1, 6 |
| I3 — `password-reset-ends-sessions` | invariant, new, method `test`, rests on F1 and F2; its sentence speaks of requests that start after the reset. Check: `tests/account-storage.test.mjs` (Slices 1, 2), `tests/http.test.mjs` (Slices 2, 6) | row 14; Decision 7; spec | Slices 1, 2, 6 |
| `account-session-authorization` | invariant, changed, method `test`. Check: `tests/http.test.mjs` (Slices 5, 6) | row 2; spec | Slices 5, 6 |
| `player-server-session` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 14; spec | Slices 1, 6 |
| `account-session-storage` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 2) | Decision 7; spec | Slice 2 |
| `account-attempt-limits` | invariant, changed, method `test`. Check: `tests/http.test.mjs` (Slices 3, 6) | row 15; spec | Slices 3, 6 |
| `unblock-restores-no-link` | invariant, changed, method `test`. Check: `tests/account-storage.test.mjs` (Slice 1), `tests/http.test.mjs` (Slice 6) | row 19; spec | Slices 1, 6 |
| `account-email-via-outsider` | invariant, changed, projected in full, method `review`. Check: the review of Slice 4 | To do 12; the task's projected entry; spec | Slice 4 |
| `account-email-nodemailer-starttls` | invariant, changed, projected in full, method `test`. Check: the existing cases of `tests/account-mail.test.mjs`, with the reset message submitted through the same mailer (Slice 4) | To do 12; the task's projected entry; spec | Slice 4 |
| `player-argon2-password-hash` | invariant, projected in part: the hash of a password set by a reset; a change of its wording only where the writer's search finds it needed. Check: `tests/http.test.mjs` (Slice 6) | To do 5; the task's projected entry (part) | Slice 6 |
| F1 — `express-session-end-of-request` | environment fact, new: express-session 1.19.0 at the end of a request touches a session loaded from the cookie whose data did not change and does not save it | Decision 8; spec | Slice 6 |
| F2 — `express-session-regenerated-session-saved-again` | environment fact, new: express-session 1.19.0 saves a session made by `regenerate` again at the end of the request and hands `Store.set` the same object | Decision 7; spec | Slice 2 |

The part map does not change: every new file falls under an existing pattern. No glossary term is
proposed; the writer judges again, as the spec says.
