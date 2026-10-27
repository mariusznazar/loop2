# Setup, secrets and rotation

All changes here are the human's. Access values and key material live in the owner's private
note, never in repository files, request text, shell history or shared logs.

## Initial host provisioning

These prerequisites are separate from the tunnel transition's H1–H5 below; an already
provisioned host keeps its existing keys and checkout.

The run account owns `/srv/loop2`, has Docker/Compose access, can write
`/var/log/loop2-deploy.log` and can create `/run/loop2-deploy.lock`. For a non-root account,
create the log with that owner and configure `tmpfiles.d` to recreate the owned lock at boot;
otherwise the cleared `/run` directory causes exit 4.

Generate a repository key under this account, add its public half as a read-only GitHub Deploy
key and configure an SSH alias for GitHub using that identity. Clone to `/srv/loop2` with
`origin` using the alias. Install the exact target commit's script as described below.

Create the separate automation key and append its public line to the account's
`authorized_keys`, preserving other entries:
`restrict,command="/usr/local/bin/loop2-deploy" ssh-... <public key>`.
Verify that exact restriction prefix. Set the five GitHub secrets below, then remove the
automation private key from the server. The installed script stays root-owned, mode 0755,
outside the checkout; deployment never updates it.

| Input path | Recognition | Accepted commits |
|---|---|---|
| Automation forced command | `SSH_ORIGINAL_COMMAND` set, no argument | `main` only |
| Human run | `SSH_ORIGINAL_COMMAND` unset, one argument | any branch of the repository |

Both accept exactly one lowercase 40-hex commit name; all other input exits 2 before Git or Docker.

## H1–H5: switching from the published port to the tunnel

Perform these at the blocked draft request before merging. H1 and H2 leave public traffic
unchanged. **From H3 until completion and merge, merge nothing else to `main`.** Every merge
deploys automatically with the installed script, so this window includes corrections. Keep the
pre-transition running application SHA and previous script in the private operational record.

1. **H1 — Cloudflare:** create a remotely managed loop2 tunnel and receive its token. Leave it
   without a published application hostname. No old-game route or zone-wide setting changes.
2. **H2 — token:** create `/etc/loop2` with the deployment account as owner, numeric group 65532,
   mode 0750. Put the token into `/etc/loop2/cloudflared-token`, same owner/group, mode 0640,
   using a private editor or secure input; never paste a token into command arguments or a
   logged shell command. Keep its second copy in the owner's private note. Root and the owner
   can read it; group 65532 can read the file and traverse the directory; other users cannot.
   The pinned image runs as 65532:65532. Compose mounts the file read-only for the connector
   at `/run/secrets/cloudflare_tunnel_token`; it grants nothing to `app`. File-backed Compose
   secret `uid`/`gid`/`mode` settings do not remap host permissions, so do not substitute them
   for these host permissions or make the file world-readable.
3. **H3 — exact script:** fetch the request branch as the run account and extract the script
   from the request's exact full SHA, not the checkout's current file. Validate it and preserve
   the pre-transition installed copy once as `/usr/local/bin/loop2-deploy.previous`, then
   install root-owned 0755. Use the procedure below. During corrections retain that same
   pre-transition `.previous`; reinstall from the corrected request head without overwriting it.
4. **H4 — deploy:** the human runs `loop2-deploy <request head sha>` with
   `SSH_ORIGINAL_COMMAND` unset. Both services must pass health and the internal HTTP probe.
   The old public route stops working now because there is no published application port;
   an outage until H5 is expected. Read the applied and enforced limits by the narrow commands
   in `SKILL.md`: application 512 MiB and connector 256 MiB. These are chosen bounds, not
   measured demand; a failing limit or restart loop is resolved before acceptance.
5. **H5 — route and acceptance:** remove the proxied AAAA record `loop2`, its hostname-scoped
   Origin Rule (port 18080), and its hostname-scoped Configuration Rule (Flexible). Publish
   `loop2.mariusznazar.com` on the tunnel with service `http://app:3000`, producing its proxied
   CNAME to `<tunnel UUID>.cfargotunnel.com`. AAAA and CNAME cannot coexist at the same name.
   Check the public game page and an unknown `/api/` path (JSON 404, not HTML); from outside
   the host, request the former game port 18080 at the host IPv6 from the private note and
   confirm the connection is refused or times out while the public page works. Confirm
   `https://kantarion.bieda.it/` works and `loop` and `foundryvtt` remain untouched. Report
   these observations and both memory limits before acceptance and merge.

After merge, inspect the automated deployment of the merge commit. H4 proves connection
readiness and internal HTTP; only H5 proves the public route. A missing real token or remote
observation is unchecked, never a passing local test. Abandonment and rollback are in
`troubleshooting.md`; do not merge an unrelated change to end the transition window.

## Installing a script from an exact commit

Fetch the target branch as the run account so its full target SHA exists locally. A fetch
changes the host and is the human's. Set `target_sha` to that exact SHA, and extract safely:

```sh
script_tmp=$(mktemp)
git -C /srv/loop2 show "${target_sha}:deploy/loop2-deploy" > "$script_tmp" &&
  bash -n "$script_tmp"
```

Continue only if both commands succeeded. Review the difference against the installed script.
On the first H3 only, preserve it with
`cp -p /usr/local/bin/loop2-deploy /usr/local/bin/loop2-deploy.previous`; if that backup already
exists, first establish which copy is the pre-transition one and preserve it. Do not overwrite
the recovery copy during corrections. With root privileges, install the checked temporary file:

```sh
install -o root -g root -m 0755 "$script_tmp" /usr/local/bin/loop2-deploy
rm -- "$script_tmp"
```

Run Git as the account owning the checkout and the install/copy with the required privileges;
the role labels here are not server usernames. Keep the target SHA for the subsequent human
deployment. The installed-script comparison merely warns, so selecting the correct script is
part of this procedure, especially across a route change.

## Session signing keys

The application signs its session cookie with keys from `/etc/loop2/session-secrets`. In
`compose.yaml` the secret `loop2_session_secrets` has this host file as its source and is
granted to `app` alone, which sets `LOOP2_SESSION_SECRET_FILE` to
`/run/secrets/loop2_session_secrets`; the connector does not receive it. Compose ignores
`uid`/`gid`/`mode` for a file-backed secret, so inside the container the host file's owner and
mode apply. The process runs as `node`, uid and gid 1000, hence owner root, group **1000**,
mode **0440**: readable by root and by group 1000, by no one else.

The file is UTF-8 JSON on one line: an array of distinct base64url strings, each the encoding
of exactly 32 random bytes (43 characters), the **newest first**, in at most 16 KiB. The
application signs with the first key and accepts a cookie signed by any key in the file. A
missing, unreadable, empty, malformed or duplicated file stops the application before it
listens; its log names the setting `LOOP2_SESSION_SECRET_FILE`, never the contents.

Leave `/etc/loop2` itself as it is (deployment account as owner, group 65532, mode 0750; see
H2). Run the sequences below in bash as root on the server, from a private terminal. They put
no key into a command argument and no key into shell history. Never print the file in a
logged or shared session.

**Creating the file** (once, before the first deployment of a commit with accounts; without
it that deployment ends with exit 8). The sequence does nothing if the file already exists,
since replacing it signs every player out. Each block below runs in a subshell, so the
`umask` does not stay set in your shell, and each step depends on the one before it, so the
block can be pasted whole: when a check fails, nothing after it runs and the file is not
changed.

```sh
f=/etc/loop2/session-secrets
( umask 077
  test ! -e "$f" &&
  key=$(head -c 32 /dev/urandom | base64 -w0 | tr '+/' '-_' | tr -d '=') &&
  test "${#key}" -eq 43 &&
  tmp=$(mktemp /etc/loop2/.session-secrets.XXXXXX) &&
  trap 'rm -f -- "$tmp"' EXIT &&
  printf '["%s"]\n' "$key" > "$tmp" &&
  chown root:1000 -- "$tmp" && chmod 0440 -- "$tmp" &&
  mv -T -- "$tmp" "$f" )
stat -c '%U %g %a' "$f"
wc -c < "$f"
```

Expected: `root 1000 440`, then `48` (two quotes, two brackets, 43 characters, a newline).
Then copy the file's whole content into the owner's private note: read it with `cat` in a
private terminal and paste it there. Do this before the deployment.

**Rotating: a new key first, the old one kept.**

1. Set the file from the current one with a new key prepended. The block stops, with the file
   unchanged, if the file is not in the one-line form this procedure writes (`["<key>"]` or
   `["<key>","<key>"]`; an empty or pretty-printed file is refused). Its guard prints STOP and
   then fails, and every later step depends on it:

   ```sh
   f=/etc/loop2/session-secrets
   ( umask 077
     current=$(cat "$f") &&
     case $current in '["'*'"]') ;; *) echo "STOP: not in the one-line form"; false ;; esac &&
     key=$(head -c 32 /dev/urandom | base64 -w0 | tr '+/' '-_' | tr -d '=') &&
     test "${#key}" -eq 43 &&
     tmp=$(mktemp /etc/loop2/.session-secrets.XXXXXX) &&
     trap 'rm -f -- "$tmp"' EXIT &&
     printf '["%s",%s\n' "$key" "${current#\[}" > "$tmp" &&
     chown root:1000 -- "$tmp" && chmod 0440 -- "$tmp" && mv -T -- "$tmp" "$f" )
   stat -c '%U %g %a' "$f"
   ```

   After STOP the file is as it was; bring it into the one-line form from the private note
   first, then run the block again.
2. Replace the private note's copy with the file's new content.
3. Read the running application commit from its label (not the checkout's HEAD) and deploy
   exactly that commit with the installed script, as for the tunnel token. Deployment
   force-recreates the application, which reads the file again; players stay signed in. The
   server log's line `deployed <sha>, previously <sha>` gives the moment the old key stopped
   signing; write it into the private note next to the old key.
4. Check, as in the persistence step of "Deploying a request head and accepting it", that a
   player who was signed in before is still signed in.

**Retiring an old key.** Remove a key no earlier than **30 days after the last deployment
that could sign with it**: that is the moment recorded in step 3, since a session lasts 30
days from its last request and every response is signed again with the first key. Removing it
earlier signs out the players whose cookies were last signed with it. With at least two keys
in the file, this drops the oldest one (the last):

```sh
f=/etc/loop2/session-secrets
( umask 077
  current=$(cat "$f") &&
  case $current in '["'*'","'*'"]') ;; *) echo "STOP: fewer than two keys, or not the one-line form"; false ;; esac &&
  tmp=$(mktemp /etc/loop2/.session-secrets.XXXXXX) &&
  trap 'rm -f -- "$tmp"' EXIT &&
  printf '%s]\n' "${current%,\"*}" > "$tmp" &&
  chown root:1000 -- "$tmp" && chmod 0440 -- "$tmp" && mv -T -- "$tmp" "$f" )
stat -c '%U %g %a' "$f"
```

After STOP the file is as it was. Otherwise update the private note, then redeploy
the running application commit as in step 3. A key that leaked is removed at once, accepting
that the players with cookies signed by it must log in again.

**Putting an old key first again** (restoring an earlier private copy, or any file whose first
key is an older one): that key signs again, so its 30 days start only at the deployment that
next makes another key first; keep every key that signed meanwhile until then. Never delete
the file to "reset" the keys: the application refuses to start without it.

## The account database

The database is the file `/app/data/accounts.sqlite` in the named Docker volume
`loop2_accounts`, which only `app` mounts at `/app/data`. The deployment's own `compose up`
creates the volume; nothing is prepared on the host. The image creates `/app/data` owned by
`node`, so a new volume starts writable for the application. The environment variable
`LOOP2_DATABASE_PATH` carries that path, and the application opens the database before it
listens. It keeps recent writes in companion files next to `accounts.sqlite` (write-ahead
log), so copying the one file while the application runs does not copy the database.

- Replacing the container, redeploying the same commit and rolling back code keep the volume.
  `docker compose down`, `docker system prune --volumes` and `docker volume prune` remove it
  when no loop2 container references it; none of these is part of any loop2 procedure.
- Docker keeps the volume in its own data directory on the server; the human finds it with
  `docker volume inspect loop2_accounts` and opens it only as root or through Docker.
- The database holds e-mail addresses and password hashes. No agent reads or copies it, and
  nothing here copies it off the server: losing the volume loses the accounts.

## Deploying a request head and accepting it

The request stays a blocked draft until the password measurement and the public journey have
been done on its head commit. The human does everything here (D-12).

1. **Script.** The installed script is reinstalled only when the head changes
   `deploy/loop2-deploy`: compare it with the installed copy as `troubleshooting.md` describes
   and, if they differ in behaviour, install from the exact head as above before deploying.
   The commands in this skill work with the script as it is.
2. **Session keys.** The file exists with the expected owner, group and mode (see above).
3. **Deployment.** Run `loop2-deploy <request head sha>` with `SSH_ORIGINAL_COMMAND` unset.
   The server log must end with `deployed <sha>, previously <sha>`. Check both services'
   health, the internal probe and both limits with the narrow commands in `SKILL.md`.
4. **Measurement.** Run the next section on this commit.
5. **Public journey,** in a browser at `https://loop2.mariusznazar.com/`, with a test account:
   the address `<test account address from the private note>` and a password of 12 to 128
   characters from the same note.
   - Signed out, the page shows the two forms and no game or Program panel.
   - Create the account: the headquarters appears at once and the header shows the logout
     button.
   - Reload: the headquarters appears straight away.
   - Persistence: run step 3 again for the same commit, then reload; the same session still
     reaches the headquarters. Log out, log in with the same address and password; it works.
     This shows that accounts and sessions survive container replacement; saved game states
     are not checked here.
   - A wrong password shows the single message `Nieprawidłowy adres e-mail lub hasło.`
   - Logout shows the forms again and no game.
   - An unknown `/api/` path still answers JSON 404, not HTML.
   - The limits are 5 failed logins per address in 15 minutes, 20 failed logins per client
     address in 15 minutes and 5 new accounts per client address in an hour; do not trip them
     while testing. A restart or deployment resets the counters.

   The test account stays in the database afterwards. Report the observations before merge.

## Measuring the password work of the deployed image

The human runs this after `loop2-deploy` has deployed the request's head commit, to check
`player-argon2-deployment-check` on the test server. Agents do not run it: it works on the
server's Docker daemon.

**What it needs**

- A computer with **Windows PowerShell 5.1** (`powershell.exe`, the shell Windows ships). The
  commands below are written for 5.1. Its quoting differs from PowerShell 7 and from bash, so
  do not paste them into another shell.
- On that computer: Node.js 24; the Docker CLI; a checkout of this repository at the deployed
  commit; an SSH login to the test server for an account that may use Docker, reachable through
  an alias `<alias>` in `~/.ssh/config`.

The server needs no Node.js. The Docker commands go over SSH to the server's Docker daemon.

**Steps**

1. Check that the server has room for a temporary container of 512 MiB. Run this in PowerShell
   on the computer:

   ```powershell
   ssh <alias> grep MemAvailable /proc/meminfo
   ```

   The value should be at least `1048576 kB`, the deployment's own build threshold. If it is
   lower, wait and check again.
2. In Windows PowerShell 5.1, in the checkout of the deployed commit:

   ```powershell
   $sha = '<the 40-character deployed commit>'
   git rev-parse HEAD
   $env:DOCKER_HOST = 'ssh://<alias>'
   $labels = docker inspect --type container --format '{{json .Config.Labels}}' loop2 | ConvertFrom-Json
   $labels.'org.opencontainers.image.revision'
   $image = docker inspect --type container --format '{{.Image}}' loop2
   node scripts/measure-passwords.mjs --image $image --commit $sha --memory 512m | Out-File -Encoding utf8 "measure-$sha.txt"
   $LASTEXITCODE
   Get-Content "measure-$sha.txt" -Tail 1
   Remove-Item Env:DOCKER_HOST
   ```

   - `git rev-parse HEAD` and `$labels.'org.opencontainers.image.revision'` must both print the
     value of `$sha`. If the label differs, the running container is not the deployed commit:
     stop and report.
   - The Docker format strings contain no double quotes. Windows PowerShell 5.1 drops double
     quotes nested inside an argument before Docker sees them, so the labels are read as JSON,
     and PowerShell picks the revision out of it. The label template in `SKILL.md`, with its
     nested quotes, is for bash on the server only.
   - `Remove-Item Env:DOCKER_HOST` sends later Docker commands back to the local daemon. Run
     it even if a step failed.
3. Read the result. `$LASTEXITCODE` is the measurement's exit code, and the last line of
   `measure-$sha.txt` is its verdict.
   - **0, last line `PASS`:** the deployed image passed. Keep `measure-$sha.txt`. It holds the
     JSON report: Node and argon2 versions, profile, gate, operation counts, times, cgroup
     version, memory limit, peak memory, OOM and restart data. It holds no password, hash,
     cookie or secret.
   - **1, last line `FAIL: ...`:** the deployed image did not pass, or its environment could
     not be measured. Report the file.
     - A peak at or above 429496729.6 bytes (80 % of 512 MiB), or an OOM, means the password
       profile or the gate has to change in code; then rebuild, redeploy and measure again.
       Never measure an older image instead.
     - `cgroup memory accounting is unavailable` or `cgroup file memory.peak is unavailable`
       means Docker on the server does not show the memory data the verdict needs. The result
       cannot be judged and goes back to the task's cycle.
   - **2, the file is empty:** the arguments were wrong. The reason and the usage line went to
     the console, not to the file, because `Out-File` keeps only standard output.

**What it changes on the server.** The launcher starts one container from the deployed image:
no network, no volume, no secret and no environment of the application; limited to 512 MiB
with no swap, with no restarts; named `loop2-password-measure-<random>`. It removes the
container afterwards, also after a failure. The running `loop2` container, its database volume
and its secrets are not touched. The extra load is two password operations at a time for a few
seconds; locally, the 40 measured operations took 3.4 s.

## The five GitHub secrets

| Secret | Holds |
|---|---|
| `DEPLOY_HOST` | server name reachable over IPv4 by Actions, with its mapped SSH port |
| `DEPLOY_PORT` | SSH port for that name |
| `DEPLOY_USER` | run account login |
| `DEPLOY_SSH_KEY` | automation private key, base64 in one line |
| `DEPLOY_KNOWN_HOSTS` | pinned host-key lines, `[host]:port` for the configured non-default port |

Obtain host-key lines from the server and compare an IPv4 `ssh-keyscan` result to its own key
files, never accept a first connection's prompt blindly. Workflow variables `LOOP2_PUBLIC_URL`
and `OLD_GAME_URL` are public URLs, not secrets. The tunnel token is a runtime server file,
not an additional GitHub secret; the existing automation key transports only a commit name.

## Rotation — human sequences

- **Tunnel token:** read the currently running application revision label (not checkout HEAD),
  refresh the token in Cloudflare, replace the server file with owner/group/mode as in H2 and
  update the private copy. Deploy that running application SHA using the installed script.
  Deployment force-recreates both services even for the same SHA, remounting an atomically
  replaced file and establishing a new connector connection. Verify readiness and the public
  page/API. This rebuild/recreate causes the normal short outage. A plain Compose restart is
  not this rotation procedure; an existing connection may remain active after token refresh.
- **Session signing keys:** a new key first, the old one kept 30 days; see "Session signing keys"
  above. A rotation redeploys the running application commit and signs no player out.
- **Automation key:** append the new restricted public key, replace `DEPLOY_SSH_KEY`, verify a
  deployment, then remove the old authorized line and server copy of the private key.
- **Repository Deploy key:** add a new read-only key, update the SSH alias, verify a fetch,
  then remove the old key from GitHub and the server.
- **Pinned host key:** verify the new host key from the server and replace
  `DEPLOY_KNOWN_HOSTS`; SSH fails until the pinned key matches.

## Sources

- Token-file and connection parameters: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/
- File-backed secret permissions: https://docs.docker.com/reference/compose-file/services/#secrets
- Token refresh: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/
- Tunnel DNS: https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/
- Same-name DNS records: https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/
