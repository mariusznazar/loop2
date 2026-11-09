# Findings to fix - part A (the foundation entry and the comments of the code it describes)

Copied word for word from `reports/whole-change-review.md` (the review of the whole change, first line `FAIL c1b371d`).

### I-1 (Important, inside the task): D-353 and the code disagree on which session write a block's refusal silences

Source: this finding spans the Foundation entries (`c3de2a6`, D-353) and Slice 4 (`b6c70d1`).

Places:
- `foundations/decisions.md:7899` onward, D-353.
- `src/server/database.ts:18-26`, the class `BlockedSessionRefusal` and its comment.
- `src/server/app.ts:57-73`, the session callback.
- `src/server/account-routes.ts:193-222`, `establishSession`. This function is unchanged, and registration calls it at `:710` through `signIn`.

What D-353 says:
> a session write refused because the account was blocked while its registration was in progress is the intended effect of the block; neither leaves a failure line. A session write that fails for any other reason stays a failure.

Its *violates* line: "a line of `failure` for the session write that a block refused".

What the code does:
1. **Registration's first store: narrower than D-353.** A registration first stores its session in the route: `createAccount` at `account-routes.ts:687`, then `signIn` → `establishSession` → `request.session.save`. The `account-block` process runs on its own connection to the same SQLite database. If it commits a block between `createAccount` and that store, `saveSession` throws `BlockedSessionRefusal`. `establishSession` then writes `{"failure":"session",…,"place":"account-routes.establishSession"}` for it and answers 503.
   - That is a session write refused because the account was blocked while its registration was in progress, and D-353 says it leaves no line.
   - The slice-4 reviewer judged this out of scope, because To do 10 names only the stretch of the mail send. D-353, as written by this change, names the whole registration. So the change's own entry requires what its code does not do.
2. **End-of-response write of other requests: broader than D-353.** D-112's *Rationale* says "A login or a registration stores its session twice, once in its route and once as the library ends the request". The callback in `app.ts` silences `BlockedSessionRefusal` whichever request it ends, so a login whose account is blocked between its two stores now leaves no line either.
   - D-353 confines the silence to a registration and keeps "any other reason" a failure.
   - The comment at `database.ts:18-20` restates D-353 without its qualification: "the one refusal of a session write that is no failure (D-353)". The comment at `app.ts:60-62` does the same: "A write that the account's block refused … leaves no line (D-353)".

Why it matters: WAY-263 makes a change that departs from a foundation entry it writes Important when its files fail to do what the entry requires, or restate it more broadly or without its qualification. Both happen here, in opposite directions. A later agent comparing a change with D-353 finds `establishSession` already violating it. If that agent reads "any other reason" literally, it can also put the line back for logins. Today no player and no operator sees a difference, because the window is tiny. The cost is that the decision says something different from the code.

Evidence:
- Reading of `account-routes.ts:686-724` and `:193-222`, `database.ts:338-374` and `app.ts:57-73`.
- D-112's *Rationale*.
- Task To do 10 ("w trakcie wysyłki maila") against Settlement row 2 ("w trakcie rejestracji").
- Not run: I did not force the cross-process race of point 1, a block committed from a second connection between two synchronous statements. It is shown by reading alone.

Fix, recommended: rewrite D-353 through `the-way-record-decision` to say which write it means: the session write that ends a response, refused because a block was committed while the request was in progress, as while a registration waits on its message. Then narrow the comment in `database.ts` the same way.
- This matches To do 10 and the human's reason in the answer ("zamierzony skutek blokady").
- It leaves `establishSession`'s 503 and its line as they are.
- The other way is to keep D-353 and also skip the line for `BlockedSessionRefusal` in `establishSession`. That changes a route whose 503 is an existing answer, and To do 10 does not ask for it.
- The orchestrator chooses. Both ways stay within row 2's intent.

### Minor m-1, from the same report

- **m-1 (inside the task; Foundation entries, `0277f8a`).** `guidelines/coding.md:117`, rule "Recording a failure".
  - Its *Decision* field became `D-252 · D-253 · D-354`. `.the-way/product-guidelines/coding/template.md:170-174` gives this field as "the product's one decision on these rules", and says a decision for a degraded mode is not named there, or the rule would change with every such decision.
  - D-354 is a narrow decision about two commands, and the new paragraph already cites it in its body. Adding it to the field moves the rule further from the template; D-253 there was already a departure.
  - Effect: the field grows with every narrow decision. Nothing reads it wrongly today.
  - Otherwise the new paragraph follows the template's form: Polish as the file is, no reason in the rule, the decision cited.
