# Findings to fix — Slice 5, task `reset-hasla`

The blocking findings of the review `reports/22-slice5-review-report.md`, in the reviewer's words.
Reviewed head: `b966a74`. The fix's range runs from it.

### 1. Nothing fails when the work on an account moves before the answer

- **Place:** `src/server/account-routes.ts:541-544` (the order that goes unprotected); `tests/http.test.mjs:2608-2609` and `tests/http.test.mjs:2638-2639` (the comments naming the fault). Slice: 5.
- **What is wrong:** the first test's comment lists "the message handed on before the answer" as a fault it guards against, and the second lists "recording a link before the answer". Neither test can see the order. I replaced the end of the handler with the design Decision 2 rejects:

  ```ts
  void sendResetMessage(runtime, policy, email);
  response.status(204).end();
  ```

  `sendResetMessage` looks up the account, records the link and hands the message over synchronously, up to its first `await`, so with this change all of that runs before the response. Both test files stayed fully green: `tests/http.test.mjs` 56 of 56, `tests/transport.test.mjs` 10 of 10. A second mutant, the same work in the same turn just after `end()` with `setImmediate` removed, also stayed green at 56 of 56 and 10 of 10.
- **Why it matters:** this order is the whole of what stops the answer's time from telling who has an account. Row 3 says "ani jej treść, ani czas"; D-214 lists under *violates* "a lookup of the account or the recording of a link before the response has ended"; Decision 2 rejects recording in the handler because the commit costs a sync to disk only for a confirmed account that is neither blocked nor above a limit. With the mutant the answer again takes longer for exactly those accounts. Every test stays green while it does, and the change looks like a tidy-up, so nothing would stop a later edit from bringing the leak back. The test guidelines ask the author to name the fault and pick the smallest piece that really detects it, and the reviewer to check that choice (`guidelines/testing.md`, *Choosing the level*); here the named fault is not detected.
- **The author's own words do not lower this:** `21-slice5-report.md` says the order "rests on reading the handler". The code is right today, and that is the only protection it has. The test comments claim more than that.
- **Evidence that a test is cheap:** a scratch case, never committed, exposed the fixture's server and recorded the order of the response's `finish` event and of the `beforeFind` and `beforeIssue` hooks, expecting `["answer", "lookup", "record"]`. No product code changed. It passes at head five times out of five in one run, also in a variant with a valid session of the sender, and fails on both mutants. The source of the expected order is D-214. The case is kept in `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\scratch-cases.mjs`. The fixture change it needs is one added property, `listening`, in the object `accountFixture` returns.

### 2. The route may send the confirmation message's text with a reset link

- **Place:** `src/server/account-routes.ts:278` (`compose: composePasswordResetMessage`); `tests/http.test.mjs:2838` (the comment naming the fault) and `tests/http.test.mjs:2863` (the assertion). Slice: 5.
- **What is wrong:** the comment lists "the confirmation kind or message for a reset" as a fault. I set `compose: composeConfirmationMessage` in the `reset` row of the table. Both test files stayed fully green (56 of 56, 10 of 10). The only check on the text, `assert.doesNotMatch(f.mailer.messages[1].text, /confirm-email/)`, looks for the link's fragment, which the table's `fragment` field sets; the confirmation message's own sentences do not contain that string, so the assertion cannot notice a wrong message. `resetTokenOf` checks only that the link stands on a line of its own, which the confirmation text satisfies too.
- **Why it matters:** this is the line of the table that picks the message, and the table is the slice's own new structure. A player who asked for a new password would read "Ktoś — zapewne Ty — założył konto w loop2", then that the link works for 24 hours when it works for one (D-219, D-155). `tests/account-mail.test.mjs` proves `composePasswordResetMessage` writes the right text, but no test proves the route uses it: `git grep` finds "Ustaw nowe hasło" and that function only in that file, and `subject` does not occur in `tests/http.test.mjs`.
- **Evidence that a test is cheap:** one assertion, `assert.equal(f.mailer.messages[0].subject, "Ustaw nowe hasło w loop2")`, source D-219. As a scratch case it passes at head and fails on this mutant.
