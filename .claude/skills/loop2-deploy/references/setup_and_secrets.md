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
