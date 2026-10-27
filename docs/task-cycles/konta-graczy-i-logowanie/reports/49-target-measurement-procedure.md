# Measuring the password work of the deployed image

The human runs this after `loop2-deploy` has deployed the request's head commit, to check `player-argon2-deployment-check` on the test server. Agents do not run it: it works on the server's Docker daemon.

## What it needs

- **A computer with Windows PowerShell 5.1** (`powershell.exe`, the shell Windows ships). The commands below are written for 5.1. Its quoting differs from PowerShell 7 and from bash, so do not paste them into another shell.
- On that computer:
  - Node.js 24;
  - the Docker CLI;
  - a checkout of this repository at the deployed commit;
  - an SSH login to the test server for an account that may use Docker, reachable through an alias in `~/.ssh/config`.

The server needs no Node.js. The Docker commands go over SSH to the server's Docker daemon.

## Steps

1. Check that the server has room for a temporary container of 512 MiB. Run this in PowerShell on the computer:

   ```powershell
   ssh <alias> grep MemAvailable /proc/meminfo
   ```

   The value should be at least `1048576 kB`, the deployment's own build threshold. If it is lower, wait and check again.

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

   - `git rev-parse HEAD` and `$labels.'org.opencontainers.image.revision'` must both print the value of `$sha`. If the label differs, the running container is not the deployed commit: stop and report.
   - The Docker format strings contain no double quotes. Windows PowerShell 5.1 drops double quotes nested inside an argument before Docker sees them, so the labels are read as JSON, and PowerShell picks the revision out of it.
   - `Remove-Item Env:DOCKER_HOST` sends later Docker commands back to the local daemon. Run it even if a step failed.

3. Read the result. `$LASTEXITCODE` is the measurement's exit code, and the last line of `measure-$sha.txt` is its verdict.
   - **0, last line `PASS`:** the deployed image passed. Keep `measure-$sha.txt`. It holds the JSON report: Node and argon2 versions, profile, gate, operation counts, times, cgroup version, memory limit, peak memory, OOM and restart data. It holds no password, hash, cookie or secret.
   - **1, last line `FAIL: …`:** the deployed image did not pass, or its environment could not be measured. Report the file.
     - A peak at or above 429496729.6 bytes (80 % of 512 MiB), or an OOM, means the password profile or the gate has to change in code; then rebuild, redeploy and measure again. Never measure an older image instead.
     - `cgroup memory accounting is unavailable` or `cgroup file memory.peak is unavailable` means Docker on the server does not show the memory data the verdict needs. The result cannot be judged and goes back to the task's cycle.
   - **2, the file is empty:** the arguments were wrong. The reason and the usage line went to the console, not to the file, because `Out-File` keeps only standard output.

## What it changes on the server

The launcher starts one container from the deployed image:
- no network, no volume, no secret and no environment of the application;
- limited to 512 MiB with no swap, with no restarts;
- named `loop2-password-measure-<random>`.

The launcher removes it afterwards, also after a failure. The running `loop2` container, its database volume and its secrets are not touched. The extra load is two password operations at a time for a few seconds; locally, the 40 measured operations took 3.4 s.
