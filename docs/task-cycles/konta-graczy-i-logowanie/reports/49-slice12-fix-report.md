# Slice 12 fix report: the target-measurement procedure in Windows PowerShell 5.1

**Status:** done.

- **Fix range:** no commit. The head stays at 19695d670a69ea6d005a3795541b57ba4fe5a3f6. The finding concerns report text only; no committed file carries the faulty command in a PowerShell context (Check 7).
- **Changed paths:** none tracked by git. Ignored record files under `docs/task-cycles/konta-graczy-i-logowanie/reports/`:
  - `49-target-measurement-procedure.md` (new, 59 lines): the corrected procedure, the text slice 13 copies;
  - `47-measure-report.md`: the old procedure section (24 lines) replaced by a 3-line pointer, and the slice 13 surface line pointed at the new file;
  - `49-fix-labels.log` (new): the output of Check 5;
  - this report.
- **Ignored harness input:** `.runs/account-linux-inputs/fix49-labels.sh` (new).

## Finding 1 (Important): resolved

**What was wrong:**
- Step 2 of the old procedure used `docker inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2`.
- Windows PowerShell 5.1 drops the inner double quotes when it passes this argument to a native program. Docker then receives `{{index .Config.Labels org.opencontainers.image.revision}}` and stops with a template parsing error, exit 64 (Checks 2 and 3).
- The procedure also did not say which shell it assumed.

**How it is fixed, in `reports/49-target-measurement-procedure.md`:**
- **Shell stated.** It names Windows PowerShell 5.1 (`powershell.exe`) as the shell of every command on the computer, and says not to paste them into another shell.
- **Label check without nested double quotes.** The label is read with `docker inspect --type container --format '{{json .Config.Labels}}' loop2 | ConvertFrom-Json`, then `$labels.'org.opencontainers.image.revision'`. No Docker format string in the procedure contains a double quote, so 5.1 passes each one unchanged (Check 2). This also works in PowerShell 7, where the reviewer's `\"` form would arrive with stray backslashes.
- **The commit in one variable.** `$sha` holds the commit, so the human compares `git rev-parse HEAD` and the label against one value and passes the same value to the launcher.
- **Output written as UTF-8.** The launcher's output is written with `Out-File -Encoding utf8`; 5.1's `>` writes UTF-16. The exit code is read from `$LASTEXITCODE` and the verdict from the file's last line (Check 6).
- **Exit 2 explained.** On exit 2 the file is empty, because usage messages go to standard error. This answers the reviewer's side note.
- **Memory check with a stated shell.** The memory check runs from the computer as `ssh <alias> grep MemAvailable /proc/meminfo` instead of an unstated server shell.

**Pointer:** `reports/47-measure-report.md` now points at the new file where the old procedure stood (line 169 onward).

## Checks (command, exit)

All PowerShell checks ran in Windows PowerShell 5.1.26100.9711 with Docker CLI 29.7.2 on this machine. Every check that names `DOCKER_HOST=tcp://127.0.0.1:1` points at a closed local port, so no daemon was reached and nothing touched the server.

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `$PSVersionTable.PSVersion.ToString(); docker version --format '{{.Client.Version}}'` | 0 | `5.1.26100.9711`, `29.7.2` |
| 2 | `node -e "console.log(JSON.stringify(process.argv.slice(1)))" '{{index .Config.Labels "org.opencontainers.image.revision"}}' '{{json .Config.Labels}}' '{{.Image}}' loop2` | 0 | `["{{index .Config.Labels org.opencontainers.image.revision}}","{{json .Config.Labels}}","{{.Image}}","loop2"]`. The old string loses its quotes; the two new strings arrive exactly as written. |
| 3 | `$env:DOCKER_HOST='tcp://127.0.0.1:1'`; the old command `docker inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` | 64 | `template parsing error: template: :1: function "org" not defined`. The finding reproduces. |
| 4 | Same `DOCKER_HOST`; the new commands `docker inspect --type container --format '{{json .Config.Labels}}' loop2` and `docker inspect --type container --format '{{.Image}}' loop2` | 1, 1 | Both parse their templates and stop only at `error during connect … 127.0.0.1:1 … actively refused`. |
| 5 | `docker run --rm --name loop2-task15-fix49-labels --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount type=bind,source=…/.runs/account-linux-inputs,target=/inputs,readonly loop2-task22-verifier:latest bash /inputs/fix49-labels.sh 19695d670a69ea6d005a3795541b57ba4fe5a3f6` (Git Bash, `MSYS_NO_PATHCONV=1`) | 0 | `reports/49-fix-labels.log` (details below). |
| 6 | PowerShell 5.1, in the worktree, as the procedure's step 2 (details below) | see right | Every step behaved as the procedure says (details below). |
| 7 | `git grep -n 'index .Config.Labels\|\$image\|DOCKER_HOST' -- scripts src tests .claude .agents deploy` | 0 | No committed PowerShell command carries the fault (details below). |
| 8 | `docker run --rm … loop2-task22-verifier:latest sh -c 'docker ps -a -q, volume ls -q, images -q'` against the task's daemon | 0 | `c=0 v=0 i=0`: nothing left on `loop2-task15-dind`. |

**Check 5 details.** It ran inside the task's own daemon:
- It built the application image of 19695d6 with `LOOP2_COMMIT=19695d6…` and created, without starting, a container named `loop2-fix49-labels-<hex>`.
- It printed the procedure's two format strings for that container: `{{json .Config.Labels}}` gives `{"org.opencontainers.image.revision":"19695d670a69ea6d005a3795541b57ba4fe5a3f6","org.opencontainers.image.title":"loop2"}`, and `{{.Image}}` gives `sha256:8a628beb…dbac0`, equal to the image id.
- Its trap removed the container and the image.
- I gave the container a unique name, not `loop2`. Only the name argument differs from the procedure.

**Check 6 details.** The steps, in order:
1. `$sha = '19695d6…'` and `git rev-parse HEAD` printed the commit.
2. Check 5's label JSON, piped through `ConvertFrom-Json`, gave `$labels.'org.opencontainers.image.revision'` = the commit, and the comparison with `$sha` was True.
3. Against the closed port, `docker inspect … | ConvertFrom-Json` exited 1 and left `$labels` empty, so the revision line prints nothing and the human stops.
4. `node scripts/measure-passwords.mjs --image $image --commit $sha --memory 512m | Out-File -Encoding utf8 <scratch file>` gave `$LASTEXITCODE` 1, and `Get-Content -Tail 1` printed `FAIL: the image cannot be inspected`.
5. The same command with `--memory 1g` gave `$LASTEXITCODE` 2 and an empty file, with the reason and the usage line on the console.
6. `Remove-Item Env:DOCKER_HOST` left `DOCKER_HOST` empty.

The PowerShell tool reported exit 2, which is the last native exit code of the script, the intended usage case. The scratch file was deleted.

**Check 7 details.**
- `scripts/measure-passwords.mjs` has no such command: its usage line and header comment contain no quoted format string, and its own docker calls pass arguments as an array, with no shell.
- The same template stands in `deploy/loop2-deploy` and in the Python tests (an argument list, no shell) and in `.claude/skills/loop2-deploy/SKILL.md:66` and `.agents/skills/loop2-deploy/SKILL.md:66` (bash on the server). That is not this fault: bash keeps the inner double quotes.

**Not run:**
- Full `npm test`: no committed file changed, so the head that passed it (`reports/47-measure-final2.log`, exit 0) is unchanged. The handoff asks for a rerun only after a commit.
- `ssh <alias> grep MemAvailable /proc/meminfo` and the whole procedure against the real server: no server command is allowed. The SSH step takes no quoted argument.
- PowerShell 7: it is not installed on this machine. The procedure says it is written for 5.1. Its format strings contain no characters that PowerShell 7's native argument passing would change; this is my reading, not a run.

## Reading reaches

- `reports/49-slice12-fix-handoff.md` and `reports/49-slice12-blocking-findings.md`, whole.
- My own `reports/47-measure-report.md`.
- `git grep` over committed files (Check 7).
- I did not read cycle.md or the whole review `48-measure-review.md`; the findings file carries the finding in the reviewer's words.

## Observation outside this round (not fixed)

`.claude/skills/loop2-deploy/SKILL.md:66` (and its `.agents` copy) shows the same label template for reading on the server. It is correct in the server's bash. If an agent or the human ran it from Windows PowerShell 5.1 through `ssh <alias> docker inspect …`, the inner quotes would be lost the same way. Slice 13 edits that skill and may want to note the shell there too.
