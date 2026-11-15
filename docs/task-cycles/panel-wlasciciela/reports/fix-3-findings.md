# Findings to fix — slice 3 (review `reports/review-3-report.md`, `FAIL 85966562aadfa413888dab094544f707710bf942`)

Blocking findings, in the reviewer's words. The slice review's Minor findings are not fixed here.

**I-1. The tests of the command never check that a real change ends no session and stops no link, so a command that does so passes.**
- Place: `tests/account-owner.test.mjs:472-545` (the outcomes test) and `:546-` (the refusals test); the code is `src/server/account-role.ts:67`.
- What: D-410 says the command "ends no session and stops no link", and its Verification lists "the command giving and taking the role … ending no session and stopping no link". The report sentences of `account-role.ts:80-81` promise it ("its sessions and emailed links stay as they were"). The outcomes test runs the four outcomes on an account with no session and no link, and asserts only the role and the exit code. The refusals test does have a live session `one`, but asserts it only after refusals, where nothing was going to touch it. The slice-2 test checks this on `setAccountRole` in the database, not on the command, so a command that calls something else besides it is not caught.
- Why it matters: the property is the one an operator relies on when giving or taking the role of a signed-in account; the printed sentence states it as a fact.
- Evidence (mutations, below): M8 — `made-owner` also blocks the account through `database.blockAccount(email)`, which ends its sessions and stops its links: 13 pass, 0 fail.
- Fix: in the outcomes test, give the account a live session and an unspent link before the first call, and after each of the four outcomes assert that the session and the link are as they were and that `blocked` is false.
