# Measuring the password work of the deployed image

The human runs this after `loop2-deploy` has deployed the request's head commit, to check
`player-argon2-deployment-check` on the test server. Agents do not run it: it starts a
container on the server.

## What it needs

- A shell on the server as root, the shell the deployment is run from. The commands below are
  bash.
- The host's Node.js, version 20 or later (`node --version`). The launcher uses only Node's
  built-in modules; the measurement itself runs on the image's own Node.js 24.
- The checkout `/srv/loop2`, which the deployment leaves at the deployed commit.

## Steps

1. Check that the server has room for a temporary container of 409 MiB:

   ```bash
   grep MemAvailable /proc/meminfo
   ```

   The value should be at least `1048576 kB`, the deployment's own build threshold. If it is
   lower, wait and check again.
2. Measure:

   ```bash
   sha=<the 40-character request head>
   cd /srv/loop2
   git rev-parse HEAD
   docker inspect --type container --format '{{ index .Config.Labels "org.opencontainers.image.revision" }}' loop2
   node --version
   image=$(docker inspect --type container --format '{{.Image}}' loop2)
   node scripts/measure-passwords.mjs --image "$image" --commit "$sha" --memory 512m > "/tmp/measure-$sha.txt"
   echo $?
   tail -n 1 "/tmp/measure-$sha.txt"
   ```

   - `git rev-parse HEAD` and the label must both print the value of `$sha`. If the label
     differs, the running container is not the request head: stop and report. If git refuses
     the checkout as root with `dubious ownership`, `cat /srv/loop2/.git/HEAD` prints the same
     commit, because the deployment leaves the checkout detached at it.
   - `--memory 512m` is the deployment's memory limit. The launcher runs the measurement under
     80% of it, rounded down to whole MiB: 409 MiB, 428867584 bytes.
3. Read the result. The number `echo $?` printed is the measurement's exit code, and the last
   line of the file is its verdict.
   - **0, last line `PASS`:** the deployed image passed. In a container limited to 409 MiB with
     no swap, the kernel counted no hit of that limit and no OOM kill, so its memory stayed
     below 80% of 512 MiB. Keep the file. It holds the JSON report: Node and argon2 versions,
     profile, gate, operation counts, times, cgroup version, limit, the counts of limit hits
     and OOM kills, current memory and, where the kernel records one, peak memory; kernel 5.15
     records none, so the peak reads `null`. It holds no password, hash, cookie or secret.
     `/tmp` does not keep the file for long: copy its content into the report on the request.
   - **1, last line `FAIL: ...`:** the deployed image did not pass, or its environment could
     not be measured. Report the file.
     - `the container's memory reached its limit of 428867584 bytes`, `a process of the
       container was killed for lack of memory` or `the container was killed for lack of
       memory` means the password work does not fit in 80% of 512 MiB. The password profile or
       the gate has to change in code; then rebuild, redeploy and measure again. Never measure
       an older image instead.
     - `cgroup memory accounting is unavailable`, or another line naming a `cgroup file`, means
       Docker on the server does not show the memory counts the verdict needs. The result
       cannot be judged and goes back to the task's cycle.
   - **2, the file is empty:** the arguments were wrong. The reason and the usage line went to
     the terminal, not to the file, because `>` keeps only standard output.

## What it changes on the server

The launcher starts one container from the deployed image:
no network, no volume, no secret and no environment of the application; limited to 409 MiB
with no swap, with no restarts; named `loop2-password-measure-<random>`. It removes the
container afterwards, also after a failure. The running `loop2` container, its database volume
and its secrets are not touched. The extra load is two password operations at a time for a few
seconds; locally, the 40 measured operations took 3.4 s.

This text stands in the `loop2-deploy` skill, `references/setup_and_secrets.md`, section
"Measuring the password work of the deployed image", in both copies.
