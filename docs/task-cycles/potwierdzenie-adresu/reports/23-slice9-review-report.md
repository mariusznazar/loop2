FAIL 37d7bc8

# Review of Slice 9, task `potwierdzenie-adresu` — range `53f2b82..37d7bc8`

Reviewer: a fresh agent that made none of this change. Method: `.the-way/task-cycle/review/SKILL.md`.
`git rev-parse HEAD` in the worktree = `37d7bc843df3a47e55d34a6d5dfbb461ee441faf`, matching the
given head. Commits: `5c73dc7` (compose and invariant test), `37d7bc8` (six skill files). Changed
files equal the slice's *Change*; `deploy/loop2-deploy` and the Dockerfile are untouched.

Counts: blocking 1 (Important) · Minor 1 · out of scope 1 (the failing storage test, from Slice 5).

## Findings

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

### Minor

**M1. The password-file block reads the password from the same terminal it is pasted into.**
Where: `references/setup_and_secrets.md` § "The SMTP password", the block under "Creating or
replacing the file". Its lead-in says "the block can be pasted whole".
Bash reads the whole `( … )` group before running it. If the terminal does not use bracketed
paste, the next pasted line, `stat -c '%U %g %a' "$f"`, can still be waiting in the terminal's
input when `read -r -s` runs. `read` then takes that line as the password: `test -n` passes,
the file gets the `stat` text, and the human sees no `stat` output. Bash 5.2 on Ubuntu 24.04
turns bracketed paste on by default, and I did not try this in a real terminal, so it stays a
risk, not a shown fault. The cheap fix: tell the human to paste the block and type the password
at the prompt, and put the `stat` line inside the group after `mv`, or ask for the `stat`
command to be run on its own. Minor: H3 is done, so this affects only a later rotation.

## Out of scope of this slice (inside the task)

**O1. `tests/deploy/test_account_storage.py` fails at `37d7bc8`, and the failure comes from Slice
5 (`5ab1b5a`).** It is Important for the whole change, which cannot pass its gate with it; it is
not counted against Slice 9.
Where: `tests/deploy/test_account_storage.py:133`,
`self.assertEqual((before["status"], before["body"]), (200, account))`, where `account` is the
`POST /api/accounts` body. Since `5ab1b5a` that body also carries `confirmationMessage`
(`src/server/account-routes.ts:422`; `git log -S confirmationMessage -- src/server/account-routes.ts`
names only `5ab1b5a`). `GET /api/account` (`account-routes.ts:115`) carries only `id`, `email`
and `emailConfirmed`. The test container's settings point at `smtp.example.test`, so the send
gives `failed`.
My run at `37d7bc8` in a separate worktree: exit 1, one failure, `{'id', 'email',
'emailConfirmed': False}` against the same keys plus `'confirmationMessage': 'failed'`. This
slice's files do not enter the test, which reads only the database path and volume from
`compose.yaml`.
Suggested fix, for the orchestrator to assign: compare the account fields of the registration
body (`id`, `email`, `emailConfirmed`) with `GET /api/account`. The reason, under "Changing an
existing test" in `guidelines/testing.md`, is requirement K3: the registration response
carries the send's outcome, and account reads carry only account state. The test then still
checks the invariant `account-schema-lifecycle`.

## Against the task, the spec and the foundation — what holds

- `compose.yaml`: the secret `loop2_smtp_password` comes from `/etc/loop2/smtp-password`. It is
  granted to `app` alone in the short form. `app` has the five plain values exactly as To do
  10, spec § 8 and D-13 give them. No credential value stands in any changed file. The
  password is not an environment value (D-13 *Rejected*). `docker compose config
  --no-interpolate -q` exits 0.
- The changed invariant test is `tests/invariants/test_loop2_host_sharing.py` (invariant
  `loop2-host-sharing`). The invariant's text in `foundations/invariants.md:155-163`, written
  with the foundation step, already names the application's SMTP-password grant. Admitting
  the third secret therefore follows the requirement and does not weaken the check. The
  expectation for the application's settings now also holds the five mail values.
- Skill, both copies (`cmp` equal for all three files): the host file and container path; the
  metadata read `stat -c '%U %g %a' /etc/loop2/smtp-password` expecting `root 1000 440` in the
  allowed reads; human-only rotation (file, private copy, recreating `app` by deploying the
  running commit); H1 and H2; the agent never reads or changes the password and never sends
  mail through Outsider (no SMTP login, no account creation, no „Wyślij ponownie”); the
  version-3 rollback note, including H4's branch deployment and `main` refusing the database;
  H4 itself. This matches To do 11, K7, D-12, D-13, D-15, D-17, D-112 and D-137. The schema
  paragraph in `troubleshooting.md` matches D-112 (version 3 adds the confirmation time and
  the emailed-links table; existing accounts stay unconfirmed; there is no step back).

## Declined to judge

- The task's open question whether the SMTP login is the full address, and outbound TCP from
  the container to Outsider's port 587: H4 settles them (spec § 11), not this slice.
- Leftover Docker images `loop2-account-storage-check:a0d184f63298` and `:bd7784839963`, 14 and
  15 hours old, are not from my run. My run's image was removed by the test's cleanup. They
  are outside this slice's code; I left them.

## Checks run

All runs in a separate worktree of `37d7bc8`, with `.the-way` at
`3aee7d958835cc19b95519f4d21b37538b78e3e1`, matching its gitlink. I removed the worktree
afterwards. The reviewed worktree is unchanged (`git status` clean, HEAD `37d7bc8`).

- `npm test -- tests/invariants/test_loop2_host_sharing.py` — exit 0, 18 tests OK.
- Mutations of `compose.yaml` against that test, each restored after its run, each exit 1 with
  one failure:
  - `loop2_smtp_password` also granted to `cloudflared`;
  - `LOOP2_SMTP_PASSWORD: x` added to `app`'s environment;
  - the long form with `mode: 0444`;
  - an `environment:` source for the secret;
  - the port changed to 465;
  - `env_file: /etc/loop2/smtp-password` on `app`.

  The new refusal cases on the made-up Compose file pass. Each replacement has to match and be
  refused for its case to pass.
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` — exit 0, 5 tests OK (copies
  byte-identical, no `mikr.us` host name, no IPv6 literal).
- `docker compose -f compose.yaml config --no-interpolate -q` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `npm test -- tests/deploy/test_account_storage.py` — Docker answered (server 29.7.2); exit 1,
  one failure at line 133 (O1).
- Manual: `cmp` of the three file pairs — equal. I read every diff hunk against the code it
  describes (lines below).
- Not run: the whole gate (the orchestrator's); I did not replay the executor's failing-first
  run of the test (the mutations above show the test fails when the Compose file breaks);
  anything on the server or towards `outsider.mikr.us` (forbidden).

## Reach beyond the dispatch

- `src/server/account-mail.ts` (whole) and `src/server/account-routes.ts:160-245`, `:115`,
  `:422`: what the failure lines print, and the registration and account bodies (I1, O1).
- `src/server/account-policy.ts:12`: the route's sending deadline (I1).
- `src/server/configuration.ts:95-200`: the setting names in the startup refusals the
  troubleshooting rows cite.
- `node_modules/nodemailer/dist/cjs/smtp-connection/index.js` and `errors.js` (10.2.1): the codes
  the library gives (I1).
- `tests/deploy/test_account_storage.py:95-140` and `tests/invariants/account_container_support.py`
  (grep for the mail settings): O1, and that Slice 4 already provisions the synthetic SMTP
  password file spec § 8 names.
- `.runs/task-cycles/potwierdzenie-adresu/plan.md`, the *Change* lines of every slice: to
  attribute O1 and the container support file to their slices.
- `foundations/part_map.md:153`: the trust boundary of the part `deployment`.
