# Spec design report — task `reset-hasla`

Status: done. Spec: `.runs/task-cycles/reset-hasla/spec.md`. No commit made; `npm test` not run, as
the handoff asks.

## Questions sent and answers

None were sent. Each of the three open choices and eight noticed points was settled by the task's
rows, the foundation, the code at `95de83b` or the pinned library's source. Where the rows leave a
reading open I picked the smallest one that fulfils the task and wrote it into the spec; the
readings are listed below so the orchestrator or the spec's reviewer can overrule them.

## Schema and the irreversible operation

The design needs **no schema step**. The answer to the second question at the start stays **no**.

## Readings the orchestrator may want to look at

1. **"Czas" in row 3 is read as the time of this answer** (spec Decision 2). The commit of `issueLink`
   runs after the answer, but it stalls the single event loop for its few milliseconds, so a client
   timing a second request sent straight after could in principle notice it. Removing this takes a
   second thread and connection, against D-112's one connection. Named in the spec as an accepted cost.
2. **Row 9 is read as written** (Decision 10): no session check after success. A browser signed in to
   *another* account sees the forms with the sentence, and a reload returns to that account's game.
   Nothing is lost. A check there would be a request row 10 paid for and row 9 did not.
3. **An answer lost after the server committed** (Decision 11): row 11 keeps the form on no connection,
   so a second send gets "Odnośnik jest nieważny albo wygasł." although the password did change. This
   follows from row 11 and is accepted, not new. It is the one screen where a player is told something
   discouraging after a success.
4. **A fragment changing in an open tab** (*Non-goals*): pasting a link into a tab with the game does
   nothing until a reload, as with a confirmation link at the base.
5. **Password refusal before link refusal** (Decision 4): the rows settle this only in part. Link
   first would make a short password an oracle for whether a token works, which is what row 13
   rejected. Only a crafted request sees the order.
6. **`release` for a login whose password was replaced during its check** (Decision 7), with the
   common `invalid-credentials`, ahead of the block check. No entry states this; it follows D-139's
   reasoning.
7. **Failures of logins in progress may land after the clear** (Decision 9): a wrong guess that
   settles after a reset adds one failure to the emptied history. Row 15 says the history is cleared,
   not that it stays empty; the gate limits this to two, below the lock of five.

## Ways weighed

**Login in progress (open choice 1).**

- Chosen: compare the verified hash with the stored one after the password check, in the turn that
  stores the session. It adds a few lines, needs no storage change, and is correct because everything
  from the comparison to `store.set` is synchronous, checked in `session/session.js`, `session/store.js`
  and `src/server/session-store.ts`.
- Lost: a check in the session-writing statement, as D-112 does for a block. `Store.set` receives only
  session data, so it would need a stamp derived from the password in the stored payload, a change of
  `decode` and of D-115's narrow payload, for no order that can occur, because the block's reason for
  it (another connection) does not exist here.
- Lost: a generation column — a schema step. Voiding tickets in the policy — a second memory of what
  the database holds. A check after storing plus a destroy — an unreachable branch.
- Weak point stated in the spec: the proof breaks if an `await` enters between the comparison and the
  store, or a second process ever sets passwords.

**Set-password route (open choice 2).**

- Chosen: a read before hashing and the same read inside the write transaction, sharing one private
  query so they cannot drift.
- Lost: no pre-check (a bad token takes a gate slot, forbidden by the task); spending the link first
  (rows 11, 19); a transaction around hashing (D-112).

**Request's answer (open choice 3).**

- Chosen: answer first, then all account work in a later turn; the existing bounded sending and its
  fixed log lines carry over.
- Lost: recording in the handler (the time of a `synchronous = FULL` commit tells the account's state);
  a time floor (hides the usual commit, not a slow one); a durable queue (a schema step).

**Attempt ticket (point 4).** Gate only: a ticket limits guessing, 256 bits are not guessed, and work
is already bounded by working links and D-105. A new ticket needs thresholds no decision gives.

**Sending shape (point 6).** One `sendLinkMessage` with a table of what differs. A copy loses: the
order of recording and sending is what D-155 and D-161 depend on.

**Clearing (point 5).** Empty the entry in place, after the commit, in the same turn. Deleting the
entry loses: a ticket's later `forget` could drop a live entry, against D-103. Clearing before the
commit loses: a failed reset would lift a lock.

**Browser (points 7, 8).** A new module and an early branch in `start()`, with the fragment cleared by
the screen before it reports its ending. A fourth state of `account-screen.ts` loses: that screen
belongs to a signed-out player, and the form stands before the page knows who is signed in.

**Session brought along (point 2).** The route never touches `request.session`. The library then only
touches, `renewSession` changes nothing on a deleted row, and `saveSession` is never called. Read in
`node_modules/express-session/index.js`, version 1.19.0: `hash` omits the cookie, `shouldSave` is
false, `shouldTouch` true, `shouldSetCookie` true with `rolling`. This rests on a new environment fact
the spec names.

## The four checks

1. Placeholder, `TBD` or empty section: none found.
2. Contradictions between sections, or with the task or foundation: none left. Checked in particular:
   row 6 and row 13 against Decision 10 (no request before the form); row 11 and row 19 against
   Decisions 4–6; `account-session-authorization`'s "direct a message to another address" against
   row 2, which the spec lists as changing; D-112's "no transaction spans" against Decision 6.
3. Several independent changes: no. Server and browser parts depend on each other through the two
   routes. They divide naturally into slices, which is the plan's to judge. Row 17's sentence is the
   only part that could stand alone, and the task ties it in.
4. Requirements readable two ways: "czas" (fixed in Decision 2); what `limited` leaves (nothing, fixed
   there); who clears the fragment (Decision 11); which refusal comes first (Decision 4); whether
   success checks the session (Decision 10).

## Reaches beyond the dispatch

- `src/browser/view/controls/button.ts`, whole, and `src/browser/view/controls/text-field.ts`, by search
  — to see how buttons avoid submitting and what `createFormWarning` is.
- `src/browser/styles.css`, by search and lines 78–108, 215–285 — the form and notice rules.
- `src/browser/kitchen-sink/kitchen-sink.ts`, lines 228–322 (named by the dispatch; read in part).
- `node_modules/express-session/session/session.js` and `session/store.js`, by search and lines 40–70 —
  to check that `save` and `regenerate` are synchronous, which Decision 7 needs.
- Foundation: invariant `loop2-one-serving-process` and D-05, first lines — the one-process claim of
  Decision 7.
- `src/server/configuration.ts`, `AccountRuntime` only; `src/server/measure-passwords.ts` not read, as
  the design does not touch password measurement.
- `tests/http.test.mjs`, lines 225–359 and 1575–1624; `tests/transport.test.mjs`, by search;
  `tests/view/*`, by search — to see how a login in progress is staged and which route lists exist.
- Environment facts `express-session-store-contract`, `express-session-cookie-lifecycle`,
  `session-proxy-security`, `node-sqlite-database`, `sqlite-wal-concurrency`, `uri-fragment-in-requests`,
  `samesite-strict-cookie`, `fetch-origin-header`, `password-hash-work-factor`; the headings of the
  glossary. The dispatch allowed these as far as needed.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` — the user's rule before writing the one-off
  scripts that extracted entries into the scratchpad.

The project definition `definicja_mvp_loop2.md` was not reached; the frozen task quotes all I needed.

## Searches not found or unclear

- `tests/account-api.test.mjs`, `tests/account-mail.test.mjs`, `tests/account-storage.test.mjs` and
  `tests/view/account-screen.test.mjs`, named by the handoff, were searched for specific patterns and
  not read whole. The spec depends on them only for where cases go, which is left to the maker.
- The stale-login test depends on `verifyPassword` still running when the test commits the reset, as
  the existing test "a block committed while the password is checked" already does; it is ordered
  through `policy.inFlight` and the length of the password work, not a hook.
- `guidelines/coding-browser-module.md`'s table of files lists neither `account-screen.ts` nor
  `email-confirmation.ts`, so I did not add `password-reset.ts` to it. Unclear whether the table is
  meant to be complete.
- `guidelines/coding-account-policy.md` and `guidelines/coding-mail-sending.md` describe the confirmation
  path only. No To do item asks to change them, so the spec does not; the return step may find a rule
  worth adding on clearing with reservations kept.
- The spec cites the library from `node_modules`, while facts in `environment_facts.md` cite a pinned
  GitHub commit. The foundation step should cite the same commit
  (`c10b2a383841766899f6dcf53c8aff8c7fd3d2e7`) after reading the passage there.
