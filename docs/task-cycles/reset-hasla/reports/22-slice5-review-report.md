FAIL b966a746b165164c9469e334402f81d7e14d346c

# Review of Slice 5 — The request for a link

- Task `reset-hasla`, range `aa9ff04..b966a74` (one commit, `b966a74`). `git rev-parse HEAD` is the head given.
- Process pin: `git -C .the-way rev-parse HEAD` shows `a8dfe8a`, the commit `git ls-files --stage -- .the-way` records.
- Paths below are relative to the worktree root `C:\Storage\repos\loop2-wt\reset-hasla`.

**Verdict in short.** The product code does what the slice asks: every crafted-input check below passed and I found no defect in `src/server/account-routes.ts`. The review fails on two tests. Each names a fault in its own comment that it does not catch, and I proved that by leaving the fault in the code with both test files still green. One of the two is the central rule of the slice, that the answer leaves before any work on an account.

Counts: 2 blocking (Important), 2 Minor, 1 out of scope.

## Important (blocking)

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

## Minor

### 3. "The fourth" is asserted after three requests

- **Place:** `tests/http.test.mjs:2878-2883`.
- **What is wrong:** the loop sends three requests for `counted@example.test`, then `afterEarlierWork` sends only the control's. No fourth request for that account is ever made, yet the next lines assert "the fourth is not handed on" and "the fourth not recorded". Those two assertions hold with no limit at all, so as written they assert nothing about a fourth.
- **Why Minor, not Important:** the behaviour is protected a few lines below. The block for `mixed@example.test` (two recorded messages, one reset message, then a real fourth request) would fail if a reset message did not count, since `issueLink` counts all purposes in one query (`src/server/database.ts:430-444`). I reached this by reading; I ran no mutant for it. The fix is one more `askReset` before `afterEarlierWork`.

### 4. The testing guidelines now name a test that no longer exists

- **Place:** `guidelines/testing.md:168`; `tests/transport.test.mjs:244`.
- **What is wrong:** the commit renames "transport refuses both link routes before the session, the link or the mail service" to "transport refuses all three link routes…". `guidelines/testing.md:168` still cites the old name as the check of `account-request-transport`, and `guidelines/testing.md` is outside this slice's *Change*.
- **Why Minor:** Slice 11 changes that row, and its *Checks* look up every case the table names by name, so it will be found. Nothing else in the repository cites the name (`git grep`, one hit outside the test). I did not run `foundation_check.py`, so I do not know whether it reads such names.

## Changed invariant tests (named as the method asks)

- `tests/transport.test.mjs:244`, "transport refuses all three link routes…" (`account-request-transport`): renamed, the route added. Nothing weakened.
- `tests/transport.test.mjs`, "refused state-changing requests change no account or session and do no password work" (`account-mutation-request-guards`): `confirmed() === 0` became `confirmedBefore`, and `1` became `confirmedBefore + 1`, because a confirmed account was added beforehand. The check is as strict as before; the executor's reason holds.
- `tests/transport.test.mjs`, "refused requests to the save route…": the route added to the 16 KiB loop. Nothing weakened.

## Declined to judge

- **Out of scope, a design matter of the task:** the limit of 30 messages is shared, and a signed-in player can see it through `confirmationMessage: "limited"` on the own resend or registration. So someone who brings the total to 29 with own messages and then asks for a reset for a stranger's address could read from the own next resend whether that address is confirmed and not blocked. To do 2 and row 4 mandate the shared limits, and D-214 speaks of the answer to the request itself, so this is no defect of the slice. D-215 accepts exhausting the limit but no entry names this reading of it. Reasoned from `issueLink` and the routes; not run. The orchestrator may want it in view when D-215 is reviewed before other players come.
- The commit's few milliseconds seen by a second request sent right after: accepted by Decision 2 and D-214.
- No limit of the request's own per client address: D-215.
- `POST /api/password-reset`, token forms, a link of another kind, a blocked account's link, a login in progress: Slice 6 and after; this slice adds no route that takes a token.
- The sentence, the form and the client calls: Slices 7 to 9.
- The changed wording of the log line, now `Account email-confirmation link could not be recorded`: Decision 3 asks for a fixed line and it is one, bounded by the type `LinkPurpose`. `git grep` finds the wording nowhere else, the `loop2-deploy` skill included.

## Checks

All runs below were in a detached scratch worktree of `b966a74`, with `node_modules` linked from the reviewed worktree. It has been removed; the reviewed worktree's `git status --short` is empty and its head unchanged.

| Check | Result |
|---|---|
| `npm test -- tests/http.test.mjs` at head | exit 0 |
| `npm test -- tests/transport.test.mjs` at head | exit 0 |
| `npm run typecheck` at head | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` at head | exit 1, see below |

Mutants of `src/server/account-routes.ts`, each run with both test files:

| Mutant | `http` | `transport` | Reading |
|---|---|---|---|
| `workBeforeAnswer`: the work, then the 204 | exit 0 (56/56) | exit 0 (10/10) | **survived**, finding 1 |
| `workSameTurn`: the 204, then the work with no `setImmediate` | exit 0 (56/56) | exit 0 (10/10) | **survived**, finding 1 |
| `confirmationTextForReset`: wrong composer in the `reset` row | exit 0 (56/56) | exit 0 (10/10) | **survived**, finding 2 |
| `awaitBeforeAnswer`: the executor's M1 | exit 1 (1 failed) | exit 0 | killed, claim confirmed |
| `noCatch`: the executor's M4 | exit 1 (1 failed) | exit 0 | killed, claim confirmed |
| `rawAddress`: the request's unnormalized text used for the lookup | exit 1 (1 failed) | exit 0 | killed |
| `noGuards`: the route outside `mutationGuards` | exit 1 (8 failed) | exit 1 (3 failed) | killed |

Scratch cases added to `tests/http.test.mjs` in the scratch worktree only. `npm test -- tests/http.test.mjs` with them: exit 0 at head (61 of 61). On the three survivors, exit 1 each, failing only the cases aimed at them: both order cases on the first two mutants, the subject case on the third. This is also the positive control that the survivors really reached the built code.

| Crafted input | Result at head |
|---|---|
| A sender with a valid session of another account, at the order check | the answer still ended before the lookup |
| `Host`, `X-Forwarded-Host` and `Forwarded` naming `evil.example` | the link keeps the configured origin; nothing of `evil` in the message |
| Addresses with NUL, a lone surrogate, CRLF, a `Bcc:` attempt, 15 000 characters, SQL quoting | 204 or 400 each, the case accepting either, and nothing in the log; those well formed reach the lookup and leave no trace, those refused never reach it |
| Kelvin sign `\u212A@example.test`, which lowercases to `k` | the account is found, the message goes to the stored `k@example.test` |

Read and confirmed, not run:

- `response.end()` with a session cookie: the store's `touch` and its callback are synchronous (`src/server/session-store.ts:156-188`), and the order case with a session shows the answer ending first.
- `boundedSending` never rejects and bounds the unawaited sending.
- The recipient is always the stored `account.email` and the link's origin always comes from the configuration.
- No logged line holds a token, link or address.
- `stringFields` holds crafted keys: `__proto__` beside `email` fails the key count.
- The executor's logs under `.runs/slice5-*.log` agree with its claims: nine failures before the code in `http`, three in `transport`, 56 passing after, five quality tests OK.
- The "thirty-first" case at `tests/http.test.mjs` waits two immediates instead of a control request. A control cannot get through at the total limit, and immediates run in order, so the case is sound.

**Could not run:** the two tests `test_ruff_source_rules` and `test_shellcheck_source_rules` in the scratch worktree. Both errored with `FileNotFoundError` on launching their tool through `venv_tool(...)`, so this says nothing about the code; I did not establish where `venv_tool` looks. The other three quality tests, ESLint and Prettier among them, passed there on the slice's files. The slice changes no Python or shell file, and the executor's log shows all five passing in the reviewed worktree. The product's gate and `foundation_check.py` were not run, as the handoff gives.

**Executor's M2 and M3** were not repeated: `tests/http.test.mjs` reads as catching both (the confirmed-address condition, the lifetime of 3 600 000).

## Reaches beyond the dispatch

- `src/server/database.ts:255-284`, `:410-470` (`findAccountByEmail`, `readAccount`, `issueLink`): what a blocked or limited account gets and what is counted.
- `src/server/session-store.ts:60-193`, `src/server/app.ts`: whether `response.end()` really ends the response in the same turn for a request with a session.
- `src/server/transport.ts:1-60`: the transport gate behind the new path.
- `foundations/environment_facts.md:358-368` (`express-session-end-of-request`, `express-session-regenerated-session-saved-again`): the same question, and the labels the handoff names.
- `foundations/decisions.md:1806-1863`, read in passing because the range I opened ran from D-99 to D-110: D-100 to D-103 and D-106 to D-108 beside the entries named.
- `.runs/task-cycles/reset-hasla/plan.md:515-553` (Slice 11): whether finding 4 is already planned.
- `tests/account-mail.test.mjs` by `git grep`: where the reset message's text is tested.
- `scripts/test.py`, `scripts/test-node-file.mjs`, `tests/quality/test_quality_invariants.py:52-59`: how to run one file, and why two quality tests errored.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` and `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md`: the user's global instructions ask for both before writing a script and before a review.

## Searches not found or unclear

- `foundations/decisions.md` line ranges: the *Read* of the plan's section and the handoff's list differ; the handoff says its ranges hold, and they matched.
- Where `venv_tool` resolves its tools: not looked up, see *Could not run*.
- Whether `foundation_check.py` reads test names cited in the guidelines: not established, see finding 4.
