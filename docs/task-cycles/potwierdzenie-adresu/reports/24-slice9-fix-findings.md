# Findings to fix — Slice 9, review `reports/23-slice9-review-report.md` (FAIL 37d7bc8)

The blocking finding, copied word for word from the review report (lines 14-60):

### Important (blocking)

**I1. The skill calls every error code other than `EAUTH` a connection or TLS failure, but the
mailer also prints codes for messages Outsider refused, and `unknown`.**
Where: `.claude/skills/loop2-deploy/SKILL.md` § "Account mail", bullet "What an agent may read"
("any other code, for example `ECONNECTION`, `ETIMEDOUT` or `ETLS`, means a connection or TLS
failure"; "The line `Account mail missed its deadline` means the send was abandoned after 10
seconds"), and `.claude/skills/loop2-deploy/references/troubleshooting.md` row
"`Account mail failed: <another code>` … | A connection or TLS failure towards Outsider on port
587, not a credential problem. Whether the container can reach that port is shown only by the
human's trial (H4)." The same text is in the `.agents/` copy (byte-identical).

What is wrong: the line `Account mail failed: <code>` (`src/server/account-mail.ts:75-84`) prints
any upper-case code Nodemailer gives. Nodemailer 10.2.1, the installed version, has more codes
than connection and TLS ones. `node_modules/nodemailer/dist/cjs/smtp-connection/index.js:1823`
and `:1845` give `EENVELOPE` when the server refuses the sender at MAIL FROM or the recipient
at RCPT TO. `:1971` and `:1991` give `EMESSAGE` when the server refuses the message at DATA.
`errors.js:28-29` describes them as "Invalid mail envelope (sender or recipients)" and "Message
delivery error". So once Outsider accepts the connection, TLS and login, any refusal it gives
(an exhausted monthly allowance of 1000, a sender it does not allow for this login, a refused
recipient) reaches an agent as a "connection or TLS failure towards Outsider on port 587". The
agent is then told to treat it as a question of whether the container can reach port 587. The
skill also never mentions `unknown`. The mailer prints `Account mail failed: unknown` when it
stops at its own 10-second deadline (`account-mail.ts:119`, `finish("failed")` with no error),
when the connection was not upgraded to TLS (`:172`), when the connection ends (`:166`) and
when the address is one the mailer refuses before connecting (`:101-103`). The mailer's
deadline and the route's deadline are both 10 s (`account-mail.ts:14`,
`account-policy.ts:12`), and the mailer's timer starts first. A send that runs out of time
therefore usually logs `Account mail failed: unknown`, not `Account mail missed its
deadline`, which the skill gives as the 10-second line.

Why it matters: the slice's Goal makes this text the agent's only diagnosis tool ("the failure
line's error code … as what an agent may read in the service logs"). Spec § 11 makes it the way
to tell failures apart during H4 and later. As written, it sends the human after the network
for faults that are Outsider refusing the message. The plan's own wording ("`EAUTH` against a
connection or TLS failure") is binary too. It is still a defect: the code prints more than
those two kinds.

Fix, a few lines in both copies: `EAUTH` = login or password refused; `ECONNECTION`,
`ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS`, `EREQUIRETLS` = connection, name lookup or TLS;
`EENVELOPE` / `EMESSAGE` = Outsider accepted the login but refused the sender, the recipient or
the message (for example the monthly allowance), with the human checking Outsider's panel;
`unknown` = no code: the mailer's 10-second deadline, a connection that ended or was not
upgraded to TLS, or an address the mailer refused before connecting. In every case the agent
reports the code. Name `EPROTOCOL` with the connection codes or leave it as "report it".

Evidence: the lines cited above. I read them; no run reached Outsider.
