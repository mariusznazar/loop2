FAIL 0af565f5c8900ec77ec4de73ed56d583b750a4f1

# Review of Slice 3, task `reset-hasla` — the account policy of a reset

Range `08df410..0af565f`, one commit. The product code is correct as read and as exercised. The
review fails on one test: the case that carries the design's central claim, a login in progress
settling on the same entry, does not protect that claim.

## Findings

### Critical

None.

### Important (blocking)

**1. The case "a login in progress at a clear keeps its reservation and settles once on the same entry" passes when the clear replaces the entry.**

- **Place:** `tests/http.test.mjs:1561-1591`, above all `:1582` (`running.fail()`) and the last
  assertion, message "its failure counts after the clear and locks the address", `:1586-1590`. The
  code it protects, `src/server/account-policy.ts:243-250`, is right.
- **What is wrong:** Decision 9 keeps the entry object because "a replaced entry would let an old
  ticket drop a live one, against D-103, and reservations would stop counting", and D-102 lists as a
  violation "a reset dropping the address's history entry that a login in progress still settles
  on". The fault that sentence names is not the plain delete the executor ran; it is a clear that
  installs a new entry and copies the reservation count. Under that fault the case stays green:
  the copied count still refuses the fifth admission, `inFlight` is a separate counter and stays
  right, and the last assertion gets `null` from four failures plus a reservation that never ends,
  not from the lock its message claims.
- **Why it matters:** the slice's *Risk* is what lifts a login lock, and this case is the only guard
  of the entry's identity. Both effects of the fault are wrong for a player or an attacker: a wrong
  guess made after the reset is forgotten when the old ticket releases, and an address keeps a
  reservation that is never settled, which against `account-attempt-limits` counts for ever and
  against `account-attempt-tracking` holds a table place for ever. The case also settles only by
  `fail`. `release`, the settlement of a login whose password a reset replaced
  (`src/server/account-routes.ts:603`, Slice 2), is never exercised on a cleared entry; Decision 9
  says "`succeed` and `release` change nothing further". The test's name and its *Faults* comment
  promise exactly what it does not show.
- **Evidence:** fault `replaces-entry-keeping-count` applied to the compiled policy in a scratch
  copy: all cases matching `clear|password rules` pass, exit 0. Two cases on one policy, run against
  the real code and the fault:
  - ticket admitted, clear, one failure, `running.release()`, then count the failures admitted
    before refusal: real 4, fault 5 (the failure was dropped with the entry).
  - ticket admitted, clear, `running.fail()`, clock forward 16 minutes, then hold as many tickets as
    are admitted: real 5, fault 4 (a reservation that nothing settles).
- **Fix:** add the release path at least, the first of the two cases above; it is about ten lines
  with the helpers already in the file. Then either add the second case, or reword the last
  assertion's message so it no longer says "locks".

The executor's own-work check names this requirement as the weakest, and its check does not catch
it: it ran the delete fault and the no-clear fault, not the replacement Decision 9 names.

### Minor

**2. The first clear case's name and *Faults* comment claim what other cases prove.**
`tests/http.test.mjs:1508-1511`, with `:1515` and `:1532`. A locked entry has no failures left,
because the fifth failure empties them (`account-policy.ts:226`), so "failures before the lock are
forgotten" is not exercised: fault `leaves-failures` passes this case. Fault `lifts-every-lock`
passes it too, since `other@example.test` is never locked and its two `failLogin` lines decide
nothing. Both faults are caught elsewhere (the login-in-progress case and the table case), so no
behaviour is unguarded. `guidelines/testing.md` has the author name the fault each test guards;
here the next reader trusts the wrong case. Rename, and drop the `other@` lines or make that address
locked.

**3. The table case's comment names a fault it cannot catch.**
`tests/http.test.mjs:1593-1596`: "a clear that fills a place for an address with no entry", and the
name's "changes nothing". Fault `creates-entry-for-unknown` passes every case. Decision 9's *Proved
by* and the plan's *Checks* ask for "clearing an unknown address adds no key". The executor said so
in its report and is right that behaviour cannot show it, because `room` evicts a dead entry before
any decision; the code is plainly right at `account-policy.ts:246`. The report is honest and the
test comment is not: it should say the case proves a full table undisturbed and that the absence of
a key rests on reading. Cost if left: a later reader takes the property as tested.

**4. The order of the two password rules is not pinned.**
`tests/http.test.mjs:1462-1506`. Fault `rules-order-swapped` in `checkNewPassword` passes the whole
of `tests/http.test.mjs`. The order is unchanged as read, so nothing is wrong today, but the Goal is
"the same results", and a short password with a differing repetition would turn from
`invalid-password` to `password-mismatch` for registration and reset both. One assertion closes it:
`{ password: "short", passwordConfirmation: "other" }` gives `invalid-password`.

**5. Nothing pins `passwordResetLinkLifetime` to one hour, and no later slice's *Checks* name it.**
`src/server/account-policy.ts:25`. The value is right (`60 * minute`) and the slice has no consumer
for it, so fault `reset-lifetime-a-day` passes. The executor's reason, that a constant only fails on
a deliberate decision, is not what this says: a slice that reaches the route could carry the wrong
constant past D-155's "a password-reset link that works longer than one hour". The Slice 5 and 6
*Checks* speak of expired links but not of the length. For the orchestrator: a Slice 5 assertion on
the recorded link, `expires_at` minus `created_at` equal to 3 600 000, would settle it there.

**6. The address's key is now computed in two places.**
`src/server/account-policy.ts:175` and `:244` repeat the same hash expression. A change to one makes
the clear a silent no-op, which the cases would catch. A one-line private helper removes the pair.
Polish only.

## Declined to judge

- The route's use of `clearEmailAttempts`, its order against the commit and "no await between": no
  route calls it in this range; Slice 6.
- The spec's words that `succeed` "changes nothing further", while `succeed` empties failures added
  since the clear: unchanged code, and not reachable for a login in progress at a reset as read,
  because admission and the read of the hash share a turn and a changed hash ends in `release`
  (`account-routes.ts:567-576`, `:602-603`). Left to the review of the whole change.
- `forget` deleting by key without comparing the entry object: unchanged code, and safe while no
  entry is replaced; finding 1 is what keeps that premise guarded.
- Coverage of `checkRegistration` for a valid address with a short password in the new case: the
  existing case "passwords count 12 to 128 Unicode code points and keep their exact content" holds
  it; no new risk.

## Trust boundary

The handoff names `src/server/**` and two new routes. This range adds neither route (`password-reset`
appears in no route file), so token forms, origin and body guards, enumeration, logs and a link of
another kind have nothing to check here, and go to Slices 5 and 6. What the slice does put at the
boundary, I checked:

- What lifts a lock: only `clearEmailAttempts`, on the one entry of the given key. The client-address
  table is untouched (`clears-client-table` is caught) and other addresses keep their locks
  (`lifts-every-lock` is caught by the table case).
- An address not in normal form: the clear finds no entry and silently does nothing. The contract
  holds: `resetPassword` returns `account.email` (`src/server/database.ts:570`), the address stored
  from `checkRegistration`'s `checked.email` (`src/server/account-routes.ts:498-520`), the same
  normalized value `admitLogin` gets.
- A login in progress: its reservation stays, and a settlement after a clear is counted once
  (`zeroes-reservation` and `deletes-entry` are caught; finding 1 is the shape that is not).
- Passwords: `checkNewPassword` returns the password unchanged (`trims-new-password` fails 14 cases)
  and compares nothing with an old password, as D-98 requires. Field types stay with the route, as
  `guidelines/coding-account-policy.md` says.
- Logs: the slice writes none.

## Against the task and foundation

- `checkRegistration` keeps email first, then the password rules, as before; the returned refusal has
  the same shape. Its one caller, `src/server/account-routes.ts:498`, reads `registrationProblems`
  by the same three codes.
- To do 7 and row 15, the clearing half of D-102 and `account-attempt-limits`: the code does what they
  say. D-98, D-103, D-116, D-155, `account-attempt-tracking`: nothing departs.
- "A registration or a resend": no occurrence left anywhere outside `.the-way`, `.runs`, `dist` and
  `node_modules`; `account-policy.ts:151` now says "an account message".
- No existing invariant test changed. The only removed test-file line is the import, widened. New
  cases carry `invariant: account-attempt-limits` (three) and `invariant: account-attempt-tracking`
  (one), in the file's form.
- The executor's claims hold: four cases fail under a no-op clear; 46 pass, 0 fail; the delete fault
  fails the login-in-progress case. The zeroed reservation it only reasoned does fail that case.

## Checks run

All in a scratch export of `0af565f` (`git archive`), with `node_modules` linked from the worktree,
removed afterwards. Faults were applied to the compiled `dist/server/account-policy.js`. The
reviewed worktree stayed clean (`git status --short` empty, HEAD `0af565f`).

| Check | Result |
|---|---|
| `node scripts/build.mjs --check` | exit 0 |
| `node scripts/build.mjs` | exit 0 |
| `node --test --test-name-pattern="clear\|password rules" tests/http.test.mjs` | exit 0, 9 pass |
| `node --test tests/http.test.mjs` | exit 0, 46 pass, 0 fail |
| `prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on both files | exit 0 |
| `eslint --max-warnings 0` on both files | exit 0 |
| `git ls-files --eol` on both files | LF |
| fault `no-op` | exit 1, 4 cases |
| fault `leaves-lock` | exit 1, 3 cases |
| fault `leaves-failures` | exit 1, 1 case, login in progress only |
| fault `deletes-entry` | exit 1, 1 case |
| fault `zeroes-reservation` | exit 1, 1 case |
| fault `clears-client-table` | exit 1, 1 case |
| fault `lifts-every-lock` | exit 1, 1 case, the table case only |
| fault `replaces-entry-keeping-count` | exit 0, survives: finding 1 |
| fault `creates-entry-for-unknown` | exit 0, survives: finding 3 |
| fault `no-forget` | exit 0, survives: equal in behaviour, because `room` evicts a dead entry; the entry only leaves later |
| fault `registration-password-before-email`, whole file | exit 1, 1 case |
| fault `rules-order-swapped`, whole file | exit 0, survives: finding 4 |
| fault `trims-new-password`, whole file | exit 1, 14 cases |
| fault `reset-lifetime-a-day`, whole file | exit 0, survives: finding 5 |
| two entry scenarios of finding 1 | real 4 and 5, fault 5 and 4 |

Faults not marked "whole file" ran on the name pattern `clear|password rules`, except
`deletes-entry`, `zeroes-reservation` and `clears-client-table`, which ran on the narrower
`attempts|login in progress at a clear|password rules`, without the table case; their counts could
be one higher. The harness and the scenarios stand in
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\mutate.mjs`
and
`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\entry-scenarios.mjs`.

Not run:

- `npm test -- tests/quality/test_quality_invariants.py`: it sweeps the repository through git, and
  the export has none; I ran its two relevant tools directly on the two changed files. The
  executor's exit 0 for the whole sweep stands as its claim, unverified by me.
- Faults against other test files (`tests/transport.test.mjs`, `tests/account-storage.test.mjs`): the
  policy cases stand in `tests/http.test.mjs`, so a survivor there may be caught elsewhere. For
  finding 4 this is unverified; for finding 1 the entry has no other guard, since no other file calls
  `clearEmailAttempts`.
- The product's gate: the handoff forbids it.

## Reaches beyond the dispatch

- `src/server/database.ts:530-572`, `resetPassword`: what address it returns, the contract of
  `clearEmailAttempts`.
- `src/server/account-routes.ts:495-520` and `:566-616`: how an address enters the policy and which
  settlement a replaced password gets.
- `.runs/task-cycles/reset-hasla/plan.md:214-335`, Slices 5 and 6: whether a later slice pins the
  lifetime and calls the clear.
- `.runs/task-cycles/reset-hasla/spec.md`, a search for `one hour` and `lifetime`, for finding 5.
- `foundations/invariants.md:1048-1056`, `password-reset-link`, for finding 5.
- `tests/account-storage.test.mjs` and `tests/transport.test.mjs`, a search for `lifetimeMs` and
  `expires_at`, for how a link's lifetime is tested today.

## Searches not found or unclear

- The handoff's trust-boundary paragraph speaks of two new routes; none is in this range. Handled
  above.
- No test pins `confirmationLinkLifetime` by name either, so finding 5 has that precedent; whether
  a confirmation link's 24 hours is proved through a route I did not settle.
