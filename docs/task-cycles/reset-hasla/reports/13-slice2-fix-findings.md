# Findings to fix — Slice 2, task `reset-hasla`

The blocking findings of the review `reports/12-slice2-review-report.md`, in the reviewer's words.
Reviewed head: `0fdaffe`. The fix's range runs from it.

**1. A login stores its session under the hash it read after the check, not the hash it checked against, so the comparison in the route is the only thing between an old password and a live session.**

- **Place:** `src/server/account-routes.ts:609` (`signIn(runtime, request, response, account)`, where
  `account` is the re-read of line 579) and `src/server/account-routes.ts:196`
  (`account.passwordHash`). The remembered `checkedHash` (lines 568, 571) is used only at line 596.
- **What is wrong:** The Goal of the slice says `establishSession` names "at a login the one the
  password was checked against", and D-112's *Verification* says "naming, in the write of that
  session, the password hash its password was checked against". The route names the hash of the
  second read. At the head the two values are equal, because line 596 has just proved it. That makes
  the comparison carry the guard, which the design forbids:
  - Spec Decision 7, its own heading: "The comparison in the login route chooses the answer and
    nothing else."
  - Spec Decision 7: "Without this comparison the guard would still leave no session, but the login
    would answer 503 after settling as a success."
  - D-100 *Rejected*, an entry this task changes: "no comparison of the password hash after the
    check — the guard of D-112 still leaves no session, but the login answers with a server error
    after settling as a success."

  All three are false of this code. The comment at `src/server/account-routes.ts:178-182` repeats
  the design, "the one a login checked the password against", over a call that passes something else.
- **Why it matters:** The design has two independent protections and the code has one. The failure
  the foundation describes for a lost comparison is a harmless 503. The real failure is a successful
  sign-in with a replaced password and a session that outlives the reset, which question 5 refused
  and `password-reset-ends-sessions` forbids. A reader of D-100 is told the comparison only picks the
  answer, so it reads as safe to change. The next route change around it rests on a sentence that
  does not hold.
- **Limits of this finding, stated plainly:** no request at the head reaches a wrong answer. Nothing
  awaits between the comparison and the store, and the committed login case fails if the comparison
  is removed (mutation M1). The finding is a missed requirement of the Goal plus code that does not do
  what the entry it rests on says; it is not a live hole.
- **The author's report on this:** `11-slice2-report.md`, Own-work check, saw the same thing and says
  "the comparison is load-bearing, as the spec says". The spec says the opposite. The author found the
  departure and recorded it as agreement.
- **Evidence (scratch worktree of the head, `tests/http.test.mjs`):**
  - M1, comparison disabled, head otherwise: `200 !== 401` on "a password replaced while the old
    password is checked…". The old password signs in.
  - M2, comparison disabled and the login naming `checkedHash`: `503 !== 401`, exactly what the spec
    and D-100 describe.
  - M3, comparison kept and the login naming `checkedHash`: all 42 cases pass, so the change costs no
    behaviour and no test.
- **Fix direction:** `establishSession` and `signIn` take the hash to name, and the login passes
  `checkedHash`; the registration passes the hash it made. Re-run M2 by hand as the own-work check.
