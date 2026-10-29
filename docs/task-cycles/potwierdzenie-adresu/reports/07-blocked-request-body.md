**Blocked — waiting for the owner's approval of one testing decision (WAY-172).** No product code exists on this branch yet; it holds only the foundation entries of the task's cycle. The cycle continues once the question below is answered.

Task: `potwierdzenie_adresu_loop2.md` (plan `plan_mvp_loop2.md`, task 20 `potwierdzenie-adresu`), accepted 2026-10-28. Base `7a633a7` (`main`, after task 19). Process pin `.the-way` at `3aee7d9`, not moved.

## Question — how is the code that talks to Outsider's SMTP service tested?

To do 13 of the task: „`guidelines/testing.md` mówi, jak testować kod rozmawiający z SMTP Outsidera, przez skill `the-way-maintain-testing-guidelines`; nowe znaczenie zatwierdza człowiek tak, jak daje WAY-172.” The task document does not state that meaning, so the cycle proposes it on this branch (commit `06b0385`) and waits.

Why it is new: D-73 adopts the testing template whole, and the template asks for any foreign service „a double of that service in the test, and a separate contract test”. D-79 departs from it only for the npm registry, calling it "the only foreign service the tested code talks to" — false once the mailer exists. D-84 already carries the real local server and the controlled responses; leaving Outsider's contract to a human's delivery is what no decision carries.

Proposed decision (commit `06b0385`, `foundations/decisions.md`), in full:

> ### D-151 — How is the code that talks to Mikrus Outsider's SMTP service tested?
>
> Mikrus Outsider's SMTP service has no contract test, and no test reaches it: mail-sending code is tested as an integration test against a real SMTP server run on the loopback interface, and routes that send mail are tested with a stand-in mailer whose chosen outcomes prove the routes' reactions and not the sending. The agreement with Outsider is checked by a human who sends a message from the deployed container to an external inbox when the way messages are submitted to Outsider changes.

With it, D-73 lists D-151 among its departures, and D-79 loses the words "the only foreign service the tested code talks to".

Options:

- **A (recommended)** — accept D-151 as written. Tests never touch Outsider, the password or the monthly allowance of 1000 messages. Cost: a later change to how the mailer connects is known good only after a human's delivery test from the deployed container.
- **A′** — D-151 without the last clause ("when the way messages are submitted to Outsider changes"): the delivery test is H4 of this task alone, and nothing says when it is repeated. Cheaper; a broken connection change shows only when a player's message does not arrive.
- **B** — keep the template's contract test, against the real Outsider: it needs the SMTP password outside the server (against D-13), the network and a share of the monthly allowance, and its result changes with the service, not the code.
- **C** — a contract test against a recorded transcript of Outsider's replies: proves nothing of the real service (D-84) and drifts from it.

If nothing is decided, the mailer's and the routes' tests (Slices 2, 5, 10 of the cycle's plan) cannot be written: they would rest on a meaning no decision carries.

**Answer with a comment on this request** — A, A′, B, C or your own wording.

## What the branch holds so far

- `f545afe` — the foundation entries the task carries (decisions D-140–D-150, changes of D-13, D-17, D-44, D-105, D-109, D-111, D-112, D-137; invariants `email-confirmation-link`, `unblock-restores-no-link`, `account-message-limits`, `account-email-via-outsider`, `account-email-nodemailer-starttls` and changes of `loop2-host-sharing`, `account-session-authorization`, `account-client-outcomes`; facts `mikrus-outsider-mail`, `nodemailer-require-tls`, `uri-fragment-in-requests`; Outsider in the part map's external context).
- `06b0385` — the proposal above.
- `6ec347f` — a newly recorded link stops every earlier link of its account and purpose in the same transaction, before its message is sent, so K1 holds with no exception.

The invariants changed or added there are ahead of the code until the slices land. Not run on this branch: the product's gate (`npm test`) — no code changed; `python -B .the-way/elements/common/foundation_check.py` exits 0 on `6ec347f`.

## Human actions

- H4 (in the cycle, after the code): deploy the branch's head to the test server, register with an external inbox, receive the message and open its link. Not yet — nothing to deploy.

Do not merge: this request is a blocked draft.
