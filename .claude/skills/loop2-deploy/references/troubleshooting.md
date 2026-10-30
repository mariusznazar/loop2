# Troubleshooting and rollback

Read the Actions stage line and the matching bounded tail of `/var/log/loop2-deploy.log`.
Git and Docker output goes to the server log. The agent reads only; every change here is the
human's. Use `SKILL.md` for allowed read commands and limits.

| Exit | Diagnosis and response |
|---|---|
| 255 or no stage | SSH failed: access secret, IPv4 route, pinned host key or authorized key. SSH output may expose access values; redact it. |
| 2 | Refused input; inspect workflow and restricted authorized-key entry. |
| 3 | Commit missing or automation commit outside freshly fetched `main`. |
| 4 | Lock inaccessible or held for 900 seconds; check run-account setup before retry. |
| 5 | Resource gate below its limit or unreadable; see below. |
| 6 | Fetch/checkout failure; read Git's error for repository key, alias, reachability or disk. |
| 7 | Application type check/build or connector pull/build failed; both old containers remain. Fix the request or `main` as appropriate. |
| 8 | Either service failed readiness or internal HTTP failed; partial availability is possible. Read both bounded service logs, then recover with the correct procedure below. |

A failing application whose log names a setting is read as follows (the log names the
setting, never a value):

| Log text | Human check |
|---|---|
| `Invalid or unavailable account configuration: LOOP2_SESSION_SECRET_FILE` | `/etc/loop2/session-secrets` exists with `stat -c '%U %g %a'` giving `root 1000 440`, is one JSON array of distinct 43-character base64url keys and is at most 16 KiB. Rebuild it with the sequences in `setup_and_secrets.md`, not by editing it by hand. |
| `Invalid or unavailable account configuration: LOOP2_SMTP_PASSWORD_FILE` | `/etc/loop2/smtp-password` exists with `stat -c '%U %g %a'` giving `root 1000 440`, holds the password alone, non-empty, at most 1 KiB, with no trailing newline. Replace it with the sequence in "The SMTP password" in `setup_and_secrets.md`, not by editing it by hand. |
| `Invalid or unavailable account configuration: LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT` or `LOOP2_SMTP_USER` | Compose supplies them; a mismatch means the checkout's `compose.yaml` was changed. Report to the task. |
| `Account mail failed: EAUTH` | Outsider refused the login or the password: the human checks the login in `compose.yaml` and the password file against the mailbox, as in "The SMTP password". |
| `Account mail failed: ECONNECTION`, `ETIMEDOUT`, `ESOCKET`, `EDNS`, `ETLS` or `EREQUIRETLS` | A connection, name lookup or TLS failure towards Outsider on port 587, not a credential problem. Whether the container can reach that port is shown only by the human's trial (H4). Report the code. |
| `Account mail failed: EENVELOPE` or `EMESSAGE` | Outsider accepted the connection, TLS and login but refused the sender, the recipient or the message, for example because the monthly allowance of 1000 is used up. The human looks in Outsider's panel. Report the code. |
| `Account mail failed: unknown` or `Account mail missed its deadline` | No library code: the send ran out of its 10 seconds, the connection ended or was not upgraded to TLS, or the mailer refused the address before connecting. Cannot tell a network fault from a slow Outsider; the human's trial (H4) decides. Report the line. |
| `Invalid or unavailable account configuration: LOOP2_DATABASE_PATH` | The volume `loop2_accounts` is mounted at `/app/data` and writable by uid 1000 (`docker volume inspect loop2_accounts`), and the database is not from a newer schema than this commit knows (see below). |
| `Invalid or unavailable account configuration: LOOP2_PUBLIC_ORIGIN` or `LOOP2_PROXY_MODE` | Compose supplies them; a mismatch means the checkout's `compose.yaml` was changed. Report to the task. |
| `Account password readiness failed` | The password hash self-test failed at start; report with the bounded log. |

Exits 2–7 preserve the old running containers; there may be none on a first installation.
After failed health waiting, the last 50 lines of each service's log are also in the deploy
log. After failed HTTP, read `docker compose -p loop2 logs --tail 100 app cloudflared` from
`/srv/loop2`. Never dump configuration, environment or token files to diagnose it.

## Resource gate

Before preparing both images, deployment requires at least 1024 MiB `MemAvailable` and 4 GiB
free on Docker's filesystem. It logs those readings and fails closed if either is unreadable.
Each running service also has its own memory limit. The human may free resources or change
the selected bounds in the repository and reinstall the script. The agent does neither.
Read the limits using the one-field inspect and scoped stats commands in `SKILL.md`.

Repeated builds grow shared cache. `docker system df` is a read-only size check. Reclaiming
cache is a human decision affecting the next builds of all projects. Never use host-wide
`docker system prune` as loop2 recovery. Product cleanup removes only dangling images with
loop2's ownership label; it leaves upstream bases and shared cache alone.

## Installed-script warning

The installed command is outside the checkout and never updates itself. A mismatch warning
does not stop deployment. After a source change, review and install from the **exact intended
commit** using `setup_and_secrets.md`, then deploy that commit. The checkout may hold a failed
commit, so copying `/srv/loop2/deploy/loop2-deploy` without selecting its commit is unsafe.
A missing or unreadable installed copy needs its existence, owner and mode checked by the human.

Preserve the previous installed script before replacing it. During the tunnel transition,
`.previous` remains the pre-transition copy across all corrections. Outside that window,
preserve a recovery copy appropriate to the change. A failed syntax check is never installed.

## Tunnel unavailable or Cloudflare 1016/521/522

Separate three observations:

1. **Application:** run the fixed internal HTTP probe from `SKILL.md`. A wrong page/API status
   concerns the application even if the connector is healthy.
2. **Connector:** inspect only state/health and bounded `cloudflared` logs, then run the
   bounded readiness command. A token-file read error asks the human to check the host owner,
   group 65532 and mode 0640, with directory mode 0750. A rejected token asks the human to
   rotate it. Neither diagnosis calls for printing its contents or changing the container to root.
3. **Public routing:** if internal HTTP and connector readiness pass, check the tunnel's
   published hostname and service `http://app:3000`, its CNAME, and removal of loop2's old
   AAAA/Origin/Configuration rules. These are human Cloudflare actions. Readiness alone does
   not verify that route. A stopped tunnel can produce 1016 while DNS still exists; 1016 is
   a symptom, not a unique diagnosis.

A few seconds of outage while both containers are recreated is expected. If connectivity is
uncertain, the agent may run the bounded host check:

```sh
timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844
```

The evidence is the **Connected** line, often followed by timeout exit 124 while curl waits;
exit 124 alone is not success. A connection failure such as exit 28 and no connected line is
different. This checks host TCP over IPv4 only. It proves no container path and no UDP/QUIC
path. The same check can target the other official endpoint `region2.v2.argotunnel.com`; the
recorded host observation covers region1 only. Do not open port 18080 as a tunnel repair.

## Rollback and the accounts

A rollback deploys earlier code (D-15). The data does not move with it:

- The volume `loop2_accounts` and the key file `/etc/loop2/session-secrets` lie outside the
  image and the checkout. A rollback, a revert, a redeployment of the same commit and
  `--remove-orphans` leave them as they are.
- **Accounts and sessions made after the target commit stay;** nothing is restored from an
  earlier time. There is no earlier image to run and no copy of the database anywhere but the
  server, so a lost volume cannot be brought back.
- **Rolling back to a commit with accounts:** players stay signed in as long as the key file
  still holds the key their cookie was signed with. The file is not rolled back with the code.
- **Rolling back to a commit without accounts:** that commit's Compose file does not mention
  the volume or the key file, so both stay unused on the server and the accounts are not
  visible. Deploying forward again shows them. Until then no loop2 container references the
  volume, which is exactly the state a volume prune would clear; run none.
- **A database newer than the code:** an application refuses a database whose schema version
  it does not know. The current code writes schema version 4. Version 2 added to version 1 the
  blocked state of each account; version 3 adds to version 2 the confirmation state of each
  account's address and the table of emailed links; version 4 adds to version 3 the table of
  saved game states. The first start on an older database moves it to version 4 in one
  transaction, keeping every account, session, emailed link and saved game state with their
  values; only accounts from a database before version 3 come out with an unconfirmed address
  (the move from 3 to 4 leaves the confirmation state as it is), and a failure leaves the database as it was and stops the
  start (exit 8). **The first deployment of this change, also the human's trial deployment of
  its branch before the merge (H4), moves the persistent database of the test server to
  version 3.** From then on a commit that knows only version 2 or 1, `main` before this change
  included, fails health (exit 8): a rollback to it fails, and an unmerged branch leaves `main`
  unable to start. **The first deployment of the change with saved game states, also the
  human's deployment of its branch before the merge (H1), moves the persistent database of the
  test server to version 4.** From then on a commit that knows only version 3 or older, `main`
  before this change included, fails health (exit 8): a rollback to it cannot start, and every
  merge to `main` before this change is merged deploys that older code and leaves the test
  server down. A target commit that knows only an older schema fails health (exit 8) on a
  newer database; the recovery is deploying a commit that knows the schema, since the data has
  no way back: there is no step from version 4 to version 3 and no copy of the database from
  before the move. Only the human repairs the database.
- **Saved game states in a rollback:** the saved game states lie in the same volume
  `loop2_accounts`. A rollback leaves them as they are, like the accounts: nothing is restored
  from an earlier time and a state saved after the target commit stays. Rolling back to a commit
  that knows version 4 keeps them readable; a commit that knows only older versions cannot open
  the database at all (see above).
- **The SMTP password in a rollback:** the file `/etc/loop2/smtp-password` is not rolled back
  with the code; a commit from before this change does not mention it and leaves it unused.
- **Session keys in a rollback:** restoring an old private copy of the key file puts an old
  key first again; follow "Putting an old key first again" in `setup_and_secrets.md`.

The human runs the rollback itself: `loop2-deploy <earlier sha>` or a merged revert, as above.
After it, check health, the internal probe and, for a commit with accounts, that a test account
still logs in. A rollback across the tunnel transition also needs the next section.

## Rollback across the tunnel transition

Stay in a no-other-merges window until recovery is verified. Before changing anything, retain
the target application SHA from the deploy log and the old IPv6/rule values from the private
note. Rebuilding code never restores historical data (see the previous section).

**Fast recovery:** the human installs the script extracted from the exact earlier target SHA
(fetch it first if necessary), validates it with `bash -n`, and installs it root-owned 0755 as
in `setup_and_secrets.md`. Then run `loop2-deploy <target sha>` with the human input path.
The earlier Compose definition restores the published application port and its
`--remove-orphans` removes the connector from the loop2 project. Next make these four
Cloudflare changes, scoped to loop2 alone:

1. Remove the tunnel's published application hostname and its `loop2` CNAME. Verify both are gone.
2. Restore the proxied AAAA `loop2` to the host IPv6 from the private note.
3. Restore the Origin Rule matching only `loop2.mariusznazar.com`, destination port 18080.
4. Restore the Configuration Rule matching only that hostname, encryption mode Flexible.

This is **script installation, one deployment and four Cloudflare changes**; public traffic
can be unavailable between those actions. Check the game page, unknown API JSON 404, old game,
and neighbour containers. The fast rollback lasts only until another push deploys `main`.

**Durable revert:** prepare a revert request restoring the earlier route. Before merging it,
fetch its exact head and install the script extracted from that revert commit's content,
with syntax check and a recovery copy, so automation uses the matching script. Merge the
revert, let the automatic deployment finish, then perform the same four Cloudflare changes
and acceptance checks above. The count is script installation, one automated deployment and
four Cloudflare changes; the public outage lasts until the route agrees with the containers.

The default earlier-route values above apply when crossing this transition. For any other
target, read that target's deployment instructions and restore its route. In particular,
rolling back code alone cannot restore external DNS/rules or the installed script.

## Abandoning the request during H1–H5

- After H1/H2 only, current public traffic is unchanged; unused tunnel/token cleanup is a
  later human action.
- After H3, restore the preserved pre-transition `.previous` script root-owned 0755.
- If H4 occurred, deploy the pre-transition `main` SHA recorded before the window, using
  that restored script.
- If H5 occurred, remove the published tunnel name and its CNAME, then restore AAAA and
  the two hostname-scoped rules as above. Verify both games and neighbour containers before
  ending the no-other-merges window.

The human can later remove the unused tunnel and token file. No agent performs that cleanup.

## Sources for route recovery and diagnostics

- https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/
- https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/
- https://developers.cloudflare.com/rules/origin-rules/
- https://developers.cloudflare.com/rules/configuration-rules/settings/
- https://docs.docker.com/reference/cli/docker/compose/up/
