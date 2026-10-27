# Slice 13 report: human deployment, secret rotation and recovery instructions

**Status:** done

**Base:** 19695d670a69ea6d005a3795541b57ba4fe5a3f6. **Head:** bf36040ed5f916a01fea53af4ae0bc3c779bad5b. **Commit:** bf36040 (one commit).

## Changed paths (added/removed lines; each pair byte-identical)

| Path | + / - |
|---|---|
| `.claude/skills/loop2-deploy/SKILL.md` and `.agents/...` | 47 changed (about 41 / 6) |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` and `.agents/...` | 222 / 0 |
| `.claude/skills/loop2-deploy/references/troubleshooting.md` and `.agents/...` | about 36 / 3 |

Total per git: 602 insertions, 14 deletions over six files. No other path. LF kept (`git ls-files --eol`: i/lf w/lf). Files were written as UTF-8 with Python `newline=''`; the `.agents` copies are `cp` of the `.claude` ones.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `product.bundle` rebuilt: `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie` | 0 | |
| `docker run --name loop2-task15-deployskill51-final --network container:loop2-task15-dind ... loop2-task22-verifier:latest bash /inputs/verify.sh bf36040... 7012abc...` (full `npm test`; log `reports/51-deploy-skill-final.log`) | 0 | Node 429/429 pass, 0 skipped; Python 5+66+176+32 tests OK, 3 Windows-only skips (as in the baseline), 279 tests in 4 directories; foundation check 0 errors; `tests/agent_workflow/test_loop2_deploy_skill.py` (twin bytes, frontmatter, IPv6/Mikrus-name scan) is in the 5 agent_workflow tests and passed |
| `python quick_validate.py .claude/skills/loop2-deploy` | 0 | Skill is valid |
| `python quick_validate.py .agents/skills/loop2-deploy` | 0 | Skill is valid |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

Container removed after the run. Not run: any server command, any Windows full gate (not requested). The three Windows-only tests are skipped on Linux, not passed.

## Human sequences written, and what each rests on

1. **Session key file creation** (`setup_and_secrets.md`, "Session signing keys"). Rests on `compose.yaml` (secret `loop2_session_secrets`, file `/etc/loop2/session-secrets`, granted to `app` only, `LOOP2_SESSION_SECRET_FILE=/run/secrets/loop2_session_secrets`), `src/server/configuration.ts` `readSecrets` (UTF-8 JSON array, 43-char base64url keys of 32 bytes, distinct, at most 16 KiB, nonempty), task To do 13, Q10, Q14, D-13. Owner root, group 1000, mode 0440. Refuses to run if the file exists; key generated in a pipe, no key in argv or history; verification by `stat` (`root 1000 440`) and `wc -c` (48). Private copy before deployment.
2. **Ordered rotation**: new key prepended with `printf` (builtin) and `${current#\[}`, file replaced by `mv -T` of a temp file with owner/mode set before the move; private copy; deploy the running label's SHA (as the tunnel token rotation); the log line `deployed <sha>, previously <sha>` is the retirement reference; persistence check. Rests on D-13 (new first, old kept), `src/server/app.ts` (express-session `secret` array, `rolling: true`, `maxAge` 30 days).
3. **Retirement** of the oldest key not earlier than 30 days after the last deployment able to sign with it (D-13, spec section 6), with a guard for at least two keys; immediate removal for a leaked key with the sign-out consequence; "putting an old key first again" resets the reference.
4. **Database location** (`The account database`): `loop2_accounts` volume, `/app/data/accounts.sqlite` (`compose.yaml`, `Dockerfile` `mkdir /app/data && chown node`), D-17, D-110, Q15; WAL companion files; prune hazards; no agent reads.
5. **Deploying a request head and accepting it**: script reinstall only if the head changes `deploy/loop2-deploy`; key file check; `loop2-deploy <head sha>` by the human; measurement; public browser journey including wrong-password message, logout, unknown `/api/` JSON 404, persistence across a same-commit redeploy, and the rate limits to avoid (task To do 10). Rests on task Acceptance criteria, Human actions, D-12, D-75 as cited in the task.
6. **Password measurement**: `reports/49-target-measurement-procedure.md` carried verbatim in substance (PowerShell 5.1, JSON labels, `Remove-Item Env:DOCKER_HOST`, exit codes 0/1/2, 429496729.6 bytes, what it changes) with the label-template shell note added. Rests on `scripts/measure-passwords.mjs` arguments.
7. **Rollback and the accounts** (`troubleshooting.md`, `SKILL.md`): code not data; volume and key file untouched; accounts after the target stay; rolling back to a commit without accounts leaves volume and file unused; schema newer than the code fails health (exit 8); no copy outside the server. Rests on D-15, D-17, D-110 (`PRAGMA user_version = 1` in `database.ts`).
8. **Failure table** for account settings in exit 8 (the log names the setting, never a value): `configuration.ts` messages `Invalid or unavailable account configuration: <setting>` and `Account password readiness failed`.

Existing tunnel and route-transition text (H1-H5, four Cloudflare changes, abandonment) is untouched except one sentence in each of two places that said "This transport task changes no game data" (now stale), replaced by a pointer to the new rollback section.

## Placeholders a human fills

`<alias>` (SSH alias of the test server), `<the 40-character deployed commit>`, `<request head sha>`, `<test account address from the private note>`, the test password "from the same note", `<tunnel UUID>` (existing). No access value, key or secret is in the files.

## Shell statements

The label template `{{ index .Config.Labels "org.opencontainers.image.revision" }}` in `SKILL.md` now says bash on the server (`mikrus` `exec`), not Windows PowerShell 5.1, and points to the PowerShell form in the measurement section. The measurement commands say Windows PowerShell 5.1. The key sequences say bash as root on the server.

## Comparison with actual paths, CLI, decisions (read only, nothing run on the server)

- Paths and Compose wiring match `compose.yaml` and `configuration.ts`. Key file format matches `readSecrets`. The loop2-deploy script is unchanged and still gives `app` and `cloudflared` the same force-recreate, so rotation by redeploying the same SHA works as for the tunnel token.
- The internal probe still holds with accounts: `app.ts` skips sessions when the request has no proxy address, so `/api/loop2-deploy-probe` reaches the 404 JSON handler (checked in code, not run).
- D-12: new agent reads are `docker volume ls --filter name=loop2_accounts` and `stat -c '%U %g %a'` on the key file (metadata only); all changes stay with the human. D-13: no value anywhere. D-15: rollback is a deployment of earlier code, no data. D-16: reinstall only by the human, from the exact commit. D-17: only loop2's own volume and files.
- Compose behaviour on a missing `file:` secret was not verified; the skill says only that the application does not start without a valid file, and the deployment ends with exit 8 (from `configuration.ts` and the script's health stage).

## Reading reaches beyond the dispatch

`src/server/app.ts` (cookie, rolling, probe path) and `src/server/account-routes.ts:140-175` (route guards), `Dockerfile`, `deploy/loop2-deploy` label lines, `.runs/account-linux-inputs/verify.sh`, `reports/linux-verification.md`, `reports/44-client-report.md` (Checks). Reason: confirm the 30-day rolling re-signing, the probe's compatibility, the data directory ownership, and the harness arguments. Also `.runs/planner-sources/skill-conventions.md` head (not needed further).

## Own-work check

Requirement most likely missed: a key is never visible in argv or history and the file ends with owner root, group 1000, mode 0440. Check: read each sequence line by line; keys exist only in pipes, `$(...)` of a pipeline, builtin `printf` and the temp file; `chown`/`chmod` happen before `mv -T`; `umask 077` and `mktemp` give no wider mode in between. Not executed: not allowed. The shell logic (`case` patterns, `${current#\[}`, `${current%,\"*}`) was then run locally in bash on dummy arrays: prepend gives `["NEW","AAA"]`, drop-oldest of three gives the first two, the one-key array prints STOP. No key, file or server was involved.

## Choices (rejected way, cost if wrong)

- Measurement placed in `setup_and_secrets.md`, not a new file: a new file needs a twin and test update (FILES list). Cost: that file grows to about 365 lines.
- Retirement reference is the rotation deployment's log line: it equals "the last deployment able to sign with the old key" because the old key stops signing when that deployment replaces the container. If the reviewer reads D-13 as an earlier moment, only the note moves.
- The sequences require a one-line canonical file instead of a JSON parser (no `jq` or `python` assumed on the host). Cost: a hand-edited file needs rebuilding first (said in the text).
- Added two agent-readable commands (volume list, key file `stat`). Rejected: leaving the agent blind to the volume. Cost: two more agreed reads; neither shows content.
- Sentences "the installed script is reinstalled only when the head changes `deploy/loop2-deploy`" instead of a diff of the request: I did not compare the request's script with `main`.

## Own-work findings and consequences

- No foundation or guideline change needed by this slice. `player-argon2-deployment-check` and `account-save-durable-storage` stay violated until the human evidence exists; the skill says the persistence step does not clear the latter.
- `DEPLOY` text uses the quoted Polish product message `Nieprawidłowy adres e-mail lub hasło.` inside English text, as the UI shows it.

## Questions

None.
