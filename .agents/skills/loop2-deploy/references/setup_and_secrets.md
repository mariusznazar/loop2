# Setup, secrets and rotation

Everything here is done by the human, on the server or in GitHub and Cloudflare. Access values (the
server name, SSH port, run account, key material, addresses) live in the owner's private note outside
the repository; this file refers to them by role or secret name and never holds one.

## The two input paths of `loop2-deploy`

| Path | How it is recognised | Accepts |
|---|---|---|
| forced command | `SSH_ORIGINAL_COMMAND` is set: the commit name arrives as the SSH command, no argument | commits of `main` only |
| human run | `SSH_ORIGINAL_COMMAND` unset: the commit name is the one argument | commits of any branch |

Both take exactly one commit name of 40 lowercase hex characters; anything else exits 2 before git or
Docker runs.

## The run account

The account that runs the script (it owns `/srv/loop2` and holds the automation key's login) needs:

- Docker access (it can run `docker` and `docker compose`);
- write access to the checkout `/srv/loop2`;
- write access to the log `/var/log/loop2-deploy.log`;
- the ability to create the lock `/run/loop2-deploy.lock`.

An account with root rights meets the last two as they are. A non-root account also needs the log file
created and made writable for it, and a `tmpfiles.d` entry that creates `/run/loop2-deploy.lock` at
boot with the account as owner (`/run` is cleared at boot); without it exit 4 appears at once.

## The five human actions, in order, all before the merge

The merge's push starts the workflow immediately, so the setup comes first, at the blocked draft
request.

1. **Cloudflare:** a proxied AAAA record `loop2` pointing at the server's IPv6 address, an Origin Rule
   for `loop2.mariusznazar.com` only that overrides the destination port to 18080, and a Configuration
   Rule scoped to that hostname setting encryption to Flexible. No zone-wide change, no change to the
   old game's route.
2. **Read-only repository key:** generate a key on the server under the run account, add its public
   half to the loop2 repository as a Deploy key without write access, and add an SSH alias for GitHub
   that uses it (a `Host` entry in the account's SSH config pointing at github.com with that identity
   file), so the checkout's `origin` uses the alias.
3. **Clone and install:** clone the repository to `/srv/loop2` as the run account, fetch the task
   branch, and install the script from the request's head commit:
   `git -C /srv/loop2 show <request head sha>:deploy/loop2-deploy > /tmp/loop2-deploy.new`, then
   `bash -n /tmp/loop2-deploy.new`, then install it root-owned, mode 0755, as
   `/usr/local/bin/loop2-deploy`. `main` holds no script yet. When a correction changes
   `deploy/loop2-deploy` before the merge, the human reinstalls from the new request head the same way.
4. **Automation key and secrets:** create the automation key, append its line to the run account's
   `authorized_keys` without removing existing entries, set the five GitHub secrets (below) with the
   pinned host-key lines, and delete the private key from the server. Verify that the entry reads
   exactly `restrict,command="/usr/local/bin/loop2-deploy" ssh-... <key>`; that prefix is the real
   guarantee that the key can only start a rebuild, so check it by reading the file.
5. **First deployment and checks:** run `loop2-deploy <request head sha>` (human path) on the server.
   Then check `http://127.0.0.1:18080/` on the host, reachability of port 18080 over the host's IPv6,
   `https://loop2.mariusznazar.com/`, that `https://kantarion.bieda.it/` still works, and the applied
   memory limit: `docker inspect --type container loop2`, `HostConfig.Memory` expected 536870912
   (512 MiB). Report the observations back; a failing IPv6 route, port or limit is revised before the
   change is accepted.

After the merge, the workflow run of the merge commit is the first automated deployment. If it
fails, see `troubleshooting.md`.

## The five GitHub secrets

Set under the repository's Actions secrets. The workflow reads them under the names below.

| Secret | Holds |
|---|---|
| `DEPLOY_HOST` | a name that reaches the server over IPv4; GitHub's runners reach SSH over IPv4 only, and the name's port must be the one mapped to the server's SSH |
| `DEPLOY_PORT` | the SSH port of that name |
| `DEPLOY_USER` | the run account's login name |
| `DEPLOY_SSH_KEY` | the automation key's private half, base64-encoded in one line |
| `DEPLOY_KNOWN_HOSTS` | the pinned host-key lines for `DEPLOY_HOST`; because the port is not 22, each line uses the `[host]:port` form for that name and port |

The public addresses the workflow probes are the `LOOP2_PUBLIC_URL` and `OLD_GAME_URL` variables at
the top of `deploy.yml`, not secrets. Obtain the host-key lines from the server itself
(`ssh-keyscan` over IPv4 against the name and port, compared with the host's own key files), never
from a first connection's prompt.

## Rotation (each a human sequence)

- **Automation key:** create a new key, append its `restrict,command=...` line to `authorized_keys`,
  update `DEPLOY_SSH_KEY`, run a deployment (a push, or re-run the workflow), then remove the old
  line and delete the private key from the server.
- **Deploy key:** generate a new key on the server, add it as a read-only Deploy key to the
  repository, point the SSH alias at it, check with `git -C /srv/loop2 fetch`, then delete the old
  Deploy key in GitHub and the old file on the server.
- **Pinned host key:** after the server's host key changes, rebuild the `DEPLOY_KNOWN_HOSTS` lines
  from the server (as above) and replace the secret. Until then every run fails at SSH.

## Reinstalling the script

Needed after any merge that changes `deploy/loop2-deploy`; the script never updates itself.
"Installed-script warning" in `troubleshooting.md` gives the procedure that keeps the previous copy.
