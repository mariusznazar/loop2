PASS fea6091

# Review of the fix of Slice 9, task `potwierdzenie-adresu` — range `37d7bc8..fea6091`

Reviewer: the reviewer of `reports/23-slice9-review-report.md`; I made none of the fix.
Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. `git rev-parse HEAD` =
`fea6091a551c54ebfd05ed3aeb274367c9fd18df`, matching the given head. One commit, `fea6091`; it
changes only the six skill files of both copies.

Counts: blocking 0 · Minor 0 new · out of scope 0 new. M1 and O1 of the earlier report stand
as they were. They are not part of this fix; O1 goes to Slice 5.

## Findings of the findings file

**I1 — fixed.** Both copies now classify each code the mailer can print correctly against the
code and the library:
- `SKILL.md` § "Account mail", "What an agent may read" gives one reading per group of codes:
  - `EAUTH`: Outsider refused the login or the password;
  - `ECONNECTION`, `ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS`, `EREQUIRETLS`: a connection, name
    lookup or TLS failure;
  - `EENVELOPE`, `EMESSAGE`: Outsider accepted the login but refused the sender, the
    recipient or the message (for example the allowance), and the human checks Outsider's
    panel;
  - `unknown`: the 10-second limit, a connection that ended or was not upgraded to TLS, or an
    address refused before connecting; `Account mail missed its deadline` is the same limit
    seen from the route;
  - any other code (for example `EPROTOCOL`): reported as it is.

  Each code named is one the installed Nodemailer 10.2.1 defines. In my first review I
  counted them in `node_modules/nodemailer/dist/cjs/smtp-connection/index.js` and `errors.js`.
  The causes given for `unknown` match `src/server/account-mail.ts` (deadline, `end` event,
  connection not upgraded to TLS, address refused before connecting) and
  `src/server/account-routes.ts:180-203`.
- `references/troubleshooting.md`: the row that called every other code a connection failure
  is now three rows. The first holds the connection, DNS and TLS codes, still "not a
  credential problem". The second holds `EENVELOPE`/`EMESSAGE` (look in Outsider's panel).
  The third holds `unknown` and the deadline line ("Cannot tell a network fault from a slow
  Outsider"). None of them sends the human after the network for a refusal by Outsider.
- `references/setup_and_secrets.md` (H4): the old wording "`EAUTH` against a connection or TLS
  code" is replaced by a pointer to the code list in `SKILL.md`.

## What the fix itself could have broken — checked, nothing found

- The copies stay byte-identical (`cmp`, all three pairs).
- No credential value, `mikr.us` host name or IPv6 literal was added (the skill test passes).
- The agent's limits are unchanged: the agent still only reads and reports, and the human
  acts.
- The troubleshooting table has no row for "any other code". `SKILL.md` covers that case,
  and it misleads no one.

## Declined to judge

none

## Checks run

In a separate worktree of `fea6091`, with `.the-way` at `3aee7d958835cc19b95519f4d21b37538b78e3e1`,
matching its gitlink. I removed the worktree afterwards; the reviewed worktree is clean at
`fea6091`.
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0, 5 tests OK.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- Manual: I read the whole fix diff against the code lines named above, and ran `cmp` on the
  three file pairs (equal).
- Not run: the whole gate (the orchestrator's); `test_loop2_host_sharing.py` and
  `test_account_storage.py` (the fix does not touch `compose.yaml` or code).

## Reach beyond the dispatch

None beyond what the first review already read (`src/server/account-mail.ts`,
`src/server/account-routes.ts`, the Nodemailer sources), which I reused to check the new text.
