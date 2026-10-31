# Findings to fix — Slice 3, task `reset-hasla`

The blocking findings of the review `reports/16-slice3-review-report.md`, in the reviewer's words.
Reviewed head: `0af565f`. The fix's range runs from it.

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
