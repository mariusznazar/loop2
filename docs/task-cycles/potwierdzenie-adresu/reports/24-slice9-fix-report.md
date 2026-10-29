# Slice 9 fix report (review FAIL 37d7bc8, finding I1)

**Status:** done.

**I1 fixed.** The skill no longer calls every code other than `EAUTH` a connection or TLS failure.
- `SKILL.md` § "Account mail": the codes are read as a list: `EAUTH` (login or password refused);
  `ECONNECTION`, `ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS`, `EREQUIRETLS` (connection, name lookup, TLS);
  `EENVELOPE`, `EMESSAGE` (login accepted, sender, recipient or message refused, for example the monthly
  allowance; human checks Outsider's panel); `unknown` (no library code: the 10-second limit, a connection
  that ended or was not upgraded to TLS, an address refused before connecting; `Account mail missed its
  deadline` is the same limit seen from the route); any other code (for example `EPROTOCOL`) reported as is.
- `references/troubleshooting.md`: the single "another code" row is split into three rows (connection codes;
  `EENVELOPE`/`EMESSAGE`; `unknown` and the deadline line).
- `references/setup_and_secrets.md` (H4 paragraph): the binary "`EAUTH` against a connection or TLS code" now
  points to the code list in `SKILL.md`.
- Both copies (`.claude/` and `.agents/`) copied byte-identical.

I took the code facts from the findings file and did not re-read the Nodemailer sources.

**Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0 (5 OK, includes the
byte-identical and no-`mikr.us` checks); `python -B .the-way/elements/common/foundation_check.py` exit 0,
0 errors. M1 and O1 not touched.
