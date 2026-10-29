# Slice 9 report — the deployment grants the SMTP password, and the deploy skill says so

**Status:** done with concerns (one failing check outside this slice's files, see Problems).

## Commits (on top of `53f2b82`)

- `5c73dc7` feat: grant the SMTP password to the application and fix its mail settings in Compose
  - `compose.yaml` (+8 -0), `tests/invariants/test_loop2_host_sharing.py` (+45 -9)
- A second commit, `docs: describe the SMTP password, its rotation and the version 3 rollback in the loop2-deploy skill`,
  holds the six skill files (`git log --oneline -2` shows its hash): `.claude/skills/loop2-deploy/` and
  `.agents/skills/loop2-deploy/`, `SKILL.md`, `references/setup_and_secrets.md`,
  `references/troubleshooting.md`, byte-identical in both copies (about +144 -15 per copy).

`deploy/loop2-deploy` and the Dockerfile are unchanged.

## What was done

- `compose.yaml`: secret `loop2_smtp_password` from `/etc/loop2/smtp-password`, granted to `app` in the short form
  (after `loop2_session_secrets`); `app` environment gains `LOOP2_MAIL_FROM`, `LOOP2_SMTP_USER`
  (`loop2@mariusznazar.com`), `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT` (`"587"`, quoted so it stays a string),
  `LOOP2_SMTP_PASSWORD_FILE` (`/run/secrets/loop2_smtp_password`). No password value anywhere.
- `test_loop2_host_sharing.py`: the secret reader admits exactly three definitions and the grants
  `app` = session keys + SMTP password (in that order, short form), `cloudflared` = tunnel token; the
  production-configuration test expects all nine settings (the password only as a file path).
  New refusal cases in `test_secret_reader_refuses_other_files_grants_sources_and_options`: other SMTP host
  file, `environment` source, `external` source, an additional source field, the SMTP secret granted to
  `cloudflared` (alone and beside the token), `app` without it, `app` with a fourth grant, a long-form grant
  with an option. Docstring updated (grants, three definitions).
- Skill (both copies): host file, container secret and metadata read
  (`stat -c '%U %g %a' /etc/loop2/smtp-password`, expects `root 1000 440`) in `SKILL.md`; a new "Account mail"
  section there (where the password lies, human-only rotation, H1/H2, agent limits: never reads the file,
  never sends mail through Outsider or triggers a send on the test server, the failure line
  `Account mail failed: <code>` as the readable evidence with `EAUTH` against a connection or TLS code,
  startup refusal, the merge deploying so the file must exist first, H4); rollback paragraph says the first
  deployment of this change, the H4 trial included, moves the database to version 3. `setup_and_secrets.md`:
  section "The SMTP password" (H1-H3, creation and replacement sequence with a no-echo prompt, rotation,
  different login, H4), deploy-head step 2 and the rotation list. `troubleshooting.md`: log-text rows for the
  mail settings, `EAUTH` and other codes; the schema paragraph rewritten for version 3; an SMTP-password
  rollback note. The skill names no host name containing `mikr.us` (the skill test forbids it), so the SMTP
  server is "Outsider's SMTP server" and SPF/DMARC values are "as Outsider's documentation gives them".

## Checks

- `npm test -- tests/invariants/test_loop2_host_sharing.py`: first run after writing the test, before
  `compose.yaml` changed: exit 1, 2 failures for the expected reasons
  (`test_production_account_configuration_is_fixed`, `test_runtime_secrets_are_granted_only_to_their_consumers`);
  after the change: exit 0, 18 tests OK.
- `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`: exit 0, 5 tests OK.
- `docker compose -f compose.yaml config --no-interpolate -q`: exit 0 (compose.yaml parses).
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors.
- `npm test -- tests/deploy/test_account_storage.py`: Docker answered (build and run happened); **exit 1, 1 failure**,
  see Problems. Not caused by this slice.
- Not run: the whole gate (per handoff).

## Own-work check

Requirement most likely missed: "no value of a credential or access stands in any file". Checked by reading
the diff: the files hold only paths, the secret name, the no-echo prompt text and the public sender address
(already a plain Compose value). Second: the skill must pass `test_no_ipv6_literal_and_no_mikrus_server_name`
(a `mikr.us` host name or a hex-colon run would fail it); it passed.

## Problems observed

- `tests/deploy/test_account_storage.py` fails at line 133: `GET /api/account` after registering returns
  `{id, email, emailConfirmed: false}` but the test expects the body of the registration response, which now
  also carries `confirmationMessage: 'failed'` (the container has no mail server, so the send fails, per K3).
  Evidence: the assertion diff in the run output. This is an earlier slice's change (the registration
  response gained the field) meeting a test no earlier slice touched because it needs Docker; this slice's
  files do not enter the test (it reads only the database path and volume mount from `compose.yaml`). It is
  not in this slice's *Change* list, so I left it. Recommended fix, for the orchestrator to assign: the test
  compares the registration body without `confirmationMessage` (that field is the mail result, not account
  state), or `tests/invariants/account_container_support.py` points the mail settings at a loopback SMTP.
  Cause is verified by the diff only to the extent that the two bodies differ in exactly that field.

## Choices

- Grants order in the test is `loop2_session_secrets` then `loop2_smtp_password` (exact list, short form);
  rejected: an order-free set comparison. Cost if wrong: a reordering of the two lines in `compose.yaml` fails
  the test; trivial to adjust.
- `LOOP2_SMTP_PORT: "587"` quoted; the YAML reader strips quotes, so the test expects the plain `587`.
- Password-file creation sequence reads the password with `read -s` (no echo, not in history); rejected:
  `printf`/`echo` with the value in the command line (history).
- The skill lists `ECONNECTION`, `ETIMEDOUT`, `ETLS` as examples of connection or TLS codes; they come from
  Nodemailer's documented codes, not from this repository (the mailer prints whatever code the library gives).
  Marked "for example" in the text.

## Reach beyond the dispatch

`src/server/account-mail.ts:83` and `src/server/account-routes.ts:188` (exact failure-line texts, 10 s deadline),
`src/server/database.ts:41-76` (what schema step 3 adds, for the rollback wording), `src/server/configuration.ts`
(setting names, password file limits). Reason: the skill text must match what the code prints and does.

## Mismatch with the handoff

None in the plan. The invariant `loop2-host-sharing` text in `foundations/invariants.md` already named the
SMTP grant, so no foundation edit was needed.
