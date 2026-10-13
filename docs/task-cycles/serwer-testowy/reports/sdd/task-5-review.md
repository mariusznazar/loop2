# Slice 5 review — GitHub Actions workflow (7edefb0..4adedf0)

### Spec Compliance

- ❌ Issues found (one, partial): spec § 4 asks that an unknown `/api/` path answer "an API error";
  the probe accepts any 4xx/5xx status (`.github/workflows/deploy.yml:63`), so a Cloudflare-made
  error page (HTML 403 challenge, 52x origin error, 530) passes as an API error. The repository's
  own reading of "an API error response" is status 400–599 **and** a JSON media type **and** a JSON
  body (`tests/invariants/test_loop2_api_error_route.py:11-12`). Everything else in the brief and
  spec § 4 is present: trigger `push` on `main` only (`deploy.yml:5-7`); group `deploy-loop2`,
  `cancel-in-progress: false` (`:11-13`); `permissions: {}` (`:15`); no checkout, no upload; the five
  secrets by name only (`:29-33`); key decoded under `umask 077`, `chmod 600`, removed by an EXIT
  trap (`:36-41`); pinned `known_hosts`, `StrictHostKeyChecking=yes`, `BatchMode=yes`,
  `IdentitiesOnly=yes`, no `-A` (`:44-47`); one SSH call whose remote command is only
  `"$DEPLOY_SHA"`, which reaches the script through step `env` (`:28`, `:47`); a non-zero exit fails
  the step with an `::error::` line and the server output streams to the log (`:47-51`); probes with
  5 retries, root 200, old game 2xx–4xx, a failure naming the URL (`:57-76`); the loop2 address
  declared once as `LOOP2_PUBLIC_URL` (`:18`). No `${{ }}` inside any `run:` block. No server name,
  SSH port, SSH user or IPv6 literal in the diff; no Node.js reference; both files `i/lf w/lf`.
- ⚠️ Cannot verify from diff:
  - GitHub-hosted runners have no IPv6 egress. `DEPLOY_HOST` must therefore resolve to an IPv4 that
    reaches the SSH port (on Mikrus, the shared-IPv4 SSH port), and the `DEPLOY_KNOWN_HOSTS` lines
    must name exactly that host in `[host]:port` form when the port is not 22 — otherwise strict
    checking fails on the first run. Human action 4 in the spec ("set the five GitHub secrets with
    pinned host-key lines") does not say either; the orchestrator should make sure the request's
    human-action text and the skill do.
  - The server script's exit codes and output (Slice 4) and any real run (the merge's push).
- WAY-48: not applicable to this diff — it touches nothing under `deploy/**`; the workflow's only
  input is `github.sha` from GitHub (spec § 4, last bullet), and it reaches ssh quoted, via `env`.

### Strengths

- Every context value and secret reaches shell only through step `env`; the test enforces no
  `${{` inside any `run:` block (`tests/deploy/test_deploy_workflow.py:72-83`), which is the right,
  general guard rather than a check of one line.
- Key handling is correct in order: `umask 077` before the file exists, so it is never briefly
  world-readable; trap set before the first write; `IdentitiesOnly=yes` keeps a runner agent or
  default key out.
- `|| status=$?` under `set -e` keeps the exit code, and the error line names it without echoing
  any value; the probe step's `|| failed=1` runs all three probes before failing, so the log names
  every failing address, not only the first.
- The old game is probed with "answers" read as 2xx–4xx, so a Cloudflare 52x for a down origin
  counts as a failure — the right reading of "must still answer".
- `OLD_GAME_URL` is deliberately named without `LOOP2`, so the distinct-address check sees exactly
  one declaration.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

1. `.github/workflows/deploy.yml:63` — the `/api/` probe accepts any 4xx/5xx. Why it matters: it is
   the acceptance probe that the API route reaches Express, and a Cloudflare-generated error (or a
   rule serving an HTML 404) passes it; the product's own definition of an API error requires a JSON
   media type (`tests/invariants/test_loop2_api_error_route.py:11-12`). Fix: read both with
   `curl -w '%{http_code} %{content_type}'` and require 4xx/5xx with `application/json` or `+json`
   (or exactly 404 with JSON, the app's answer for an unknown path).
2. `tests/deploy/test_deploy_workflow.py:85-87` — `test_server_failure_fails_the_run` does not test
   what its name says. Checked: in a scratch copy I deleted the `if [ "$status" -ne 0 ] … exit`
   block (`deploy.yml:48-51`); all 13 tests of the file still passed, while the job would turn green
   after a failed server script (and the probes would then pass against the old container). Fix:
   assert that a non-zero ssh status ends the step — e.g. the ssh line is not followed by a swallow
   (`|| status=$?`) unless an `exit "$status"` follows, or drop the capture and let `set -e` fail
   the step and assert there is no `||` after ssh at all.
3. Deliberate break, `account-server-typecheck/1` workflow part, passes on a break
   (`tests/invariants/test_account_server_typecheck.py:73-81`, pattern at `:77`). Not this slice's
   code, but the contract makes a check passing on its break an Important finding. A step
   `uses: appleboy/scp-action@v0.1.7` with `source: dist` after `npm ci && npm run build` (no type
   check) passes `test_workflow_ships_no_files`: the `scp` pattern's look-arounds `(?<![\w.-])` /
   `(?![\w.-])` reject `/scp-action`. Fix belongs to the invariant check's author: flag any `uses:`
   of an action that copies or uploads (or every `uses:` other than an allow-list), and treat
   `scp`/`rsync`/`sftp` as a word inside an action name.

#### Minor (Nice to Have)

4. `tests/deploy/test_deploy_workflow.py` — coverage gaps confirmed in one scratch variant
   (`-A` added to ssh, a second remote argument `"; cat /etc/passwd"` after `"$DEPLOY_SHA"`, and
   `echo "…$SSH_KEY_BASE64" | base64 -d` printing the decoded key): all 13 tests passed. Add
   asserts that ssh's last argument is exactly `"$DEPLOY_SHA"` (`:71` matches `"$DEPLOY_SHA"`
   anywhere on the line), no `-A`/`ForwardAgent=yes`, no `set -x`, and no `echo`/`printf` of a
   secret-holding variable other than into a file. Decoded-key output would not be masked by
   GitHub, which masks only the exact base64 secret string.
5. `tests/deploy/test_deploy_workflow.py:107-110` — "no other host" checks only hosts in
   `http(s)://` URLs; a server name written as `user@name.example` or a bare host (`ssh x.y.z`)
   passes. The brief's check reads "no host name besides the two public addresses and
   `github.com`". Extend to dotted names anywhere in code lines (minus the allow-list), or at least
   to `@host` forms.
6. `.github/workflows/deploy.yml:44-47` — ssh's own error messages can print the **resolved IPv4
   address** of the server ("Connection closed by <ip> port <port>", "Connection reset by …",
   banner timeouts). The host name and port are masked as exact secret strings; the resolved address
   is derived and is not. It is a shared Mikrus IPv4 in a private repository's log, not one of the
   four values settlement row 4 names, so Minor. If it should stay out of logs: `-o LogLevel=ERROR`
   does not suppress these; the option is a `::add-mask::` of the `getent ahostsv4 "$SSH_HOST"`
   result before ssh.
7. `.github/workflows/deploy.yml:44-47` — no `-n` (ssh forwards the runner's stdin; harmless with a
   forced command, `-n` states the intent and stays clear of the typecheck check's `<` pattern), no
   `ConnectTimeout` / `ServerAliveInterval`: a hung connection holds the `deploy-loop2` slot until
   `timeout-minutes: 40` (`:24`). With a 900 s lock wait plus build plus 120 s health wait, 40 min is
   enough; `-o ConnectTimeout=30 -o ServerAliveInterval=30` would fail a dead link fast.
8. `.github/workflows/deploy.yml:55` — `set -uo pipefail` reads as "errexit off", but GitHub's
   default Linux shell is `bash -e {0}`, so `-e` is on. Harmless here (the function runs under
   `||`, which suspends `-e`), but a later edit outside that context would exit early; write
   `set +e` explicitly or a comment.
9. `.github/workflows/deploy.yml:67` — the probe sleeps 6 s after the last failed attempt too.
10. `tests/deploy/test_deploy_workflow.py:58-60` — the key-file test accepts `umask 077` **or**
    `chmod 600` and does not check removal (the trap); either alone would pass.

### Deliberate breaks (WAY-69)

Scratch copies of `git archive 4adedf0` in the session scratchpad (git-initialised so
`git ls-files` works), deleted afterwards; the worktree stayed clean. Each run directly with
`python -B -m unittest <module>` from the copy's `tests/invariants` (the `.the-way` submodule is not
in an archive). Control copy: all pass.

| Invariant | Break (from the sentence) | Command | Result |
|---|---|---|---|
| `loop2-distinct-address/1` | `LOOP2_PUBLIC_URL: https://kantarion.bieda.it/` | `python -B -m unittest test_loop2_distinct_address` | **fails** (1 failure) |
| `loop2-distinct-address/1` | `LOOP2_PUBLIC_URL: "https://Kantarion.Bieda.IT.:443/"` | same | **fails** (1 failure) |
| `account-server-typecheck/1` | step `npm ci; npm run build; scp -P "$SSH_PORT" -r dist "$SSH_USER@$SSH_HOST:/srv/loop2/"` | `python -B -m unittest test_account_server_typecheck.ServingImageBuiltOnlyAfterTypecheck` | **fails** (`test_workflow_ships_no_files`) |
| `account-server-typecheck/1` | step `npm ci && npm run build`, then `uses: appleboy/scp-action@v0.1.7` with `source: dist` | same | **passes — Important finding 3** |
| `account-server-typecheck/1` | `tar czf dist.tgz dist; curl -sS -T dist.tgz "sftp://…"` | same | **fails** (`test_workflow_ships_no_files`) |

### Assessment

**Task quality:** Needs fixes

**Reasoning:** The workflow is secure and correct in its key handling, SHA passing, strictness and
concurrency; it needs the `/api/` probe to require a JSON API error and a test that actually
catches a swallowed server failure. The typecheck check's `scp-action` gap is for its author, not
this slice's implementer.

## Re-review after daaff1b

Range 4adedf0..daaff1b (deadec8 implementer fix round 1, daaff1b check author's correction 4).
Breaks were rerun in scratch copies of `git archive daaff1b`, git-initialised, then deleted. The
worktree stayed clean. Control copy: `test_account_server_typecheck.ServingImageBuiltOnlyAfterTypecheck`
8 OK; `tests.deploy.test_deploy_workflow` 16 OK; `test_loop2_container_isolation`,
`test_loop2_distinct_address` and `test_account_server_runtime` 19 OK.

### Findings

| # | Finding | Verdict | Evidence |
|---|---|---|---|
| I1 | `/api/` probe accepted any 4xx/5xx | **ADDRESSED** | `deploy.yml` probe now reads `%{http_code} %{content_type}` and needs 4xx/5xx with `application/json*` or `*+json*`; asserted by `test_api_probe_demands_a_json_error` |
| I2 | failure-propagation test did not catch a swallowed failure | **ADDRESSED** | the c1 variant (exit block removed) now fails `test_server_failure_fails_the_run` |
| I3 | typecheck check passed on `appleboy/scp-action` | **ADDRESSED for that break**; new holes below | b2 now fails: `line 56: uses: appleboy/scp-action@v0.1.7` |
| M4 | `-A`, extra remote args, decoded-key printing | **ADDRESSED** | c1 fails `test_ssh_forwards_nothing_and_takes_only_the_sha` and `test_decoded_key_is_never_printed` |
| M5 | "no other host" reads only URL hosts | NOT ADDRESSED | unchanged `test_no_ipv6_and_no_other_host` |
| M6 | resolved IPv4 in ssh errors | **NOT ADDRESSED** | `LogLevel=ERROR` was added. It does not cover this: "Connection closed/reset by <ip> port <port>" comes from ssh's fatal path, which `ERROR` still prints. Residual stays Minor |
| M7 | `-n`, `ConnectTimeout`, `ServerAliveInterval` | NOT ADDRESSED | |
| M8 | `set -uo pipefail` while the default shell has `-e` | NOT ADDRESSED | |
| M9 | sleep after the last attempt | NOT ADDRESSED | |
| M10 | key-file test accepts umask or chmod, no trap check | NOT ADDRESSED | |

### Breaks against the fixed check (`account-server-typecheck/1`, workflow part)

| Break | Result |
|---|---|
| b1 `npm ci; npm run build; scp -r dist …` | fails (`npm`, `scp` outside the allow-list) |
| b2 `npm run build` + `uses: appleboy/scp-action@v0.1.7` | fails (`uses:`, `npm`) |
| b3 `tar …; curl -sS -T dist.tgz "sftp://…"` | fails |
| e1 step key written quoted: `"uses": appleboy/scp-action@v0.1.7` with `source: dist` | **passes** |
| e2 step as a flow mapping: `- { name: Copy dist, uses: appleboy/scp-action@v0.1.7, with: { source: dist, … } }` | **passes** |
| e3 `curl -sSLo dist.tgz <release URL>`, then `trap 'scp -P "$SSH_PORT" dist.tgz "$SSH_USER@$SSH_HOST:/srv/loop2/"' EXIT` | **passes** |
| e4 `curl -sSLo dist.tgz <release URL>`, then `ssh … "printf %s $(base64 -w0 dist.tgz) \| base64 -d > /srv/loop2/dist.tgz"` | **passes** |

### New findings in the fix diff

#### Important

11. `tests/invariants/loop2_invariant_support.py` `_WORKFLOW_KEY` (the `workflow_keys` reader) and
    `test_account_server_typecheck.py` `workflow_shipping`: the check still passes on breaks e1–e3,
    which copy files to the server without a type check. Both are valid YAML, and GitHub reads them
    as ordinary steps (that has not been run here).
    - `_WORKFLOW_KEY` matches only unquoted block-style keys, so a quoted key (e1) or a flow-mapping
      step (e2) hides its `uses:`.
    - `trap` is allow-listed, but its string argument is never read as commands (e3).

    These are adversarial forms, not likely edits. The contract still makes a check that passes on
    its break Important. Fix for the check author:
    - refuse any line where `uses` stands as a key in any form (quoted, or after `{` or `,`), and
      any `{` flow mapping under `steps:`;
    - read the string argument of `trap` (and of any allow-listed command that runs a string) with
      `shell_commands`, or drop `trap` from the list and allow it only in the exact form the
      workflow uses.

#### Minor

12. e4: allow-listed `base64` and command substitution carry a file's contents to the server inside
    ssh's remote-command argument. Against the real server this cannot do anything, because the
    forced command reads only the SHA. The check judges the workflow alone, though. Refuse `$(` or
    a backtick inside ssh's arguments, or refuse `base64` with a file argument.

No new Critical or Important breakage in deadec8. The `case` handling added to `shell_commands`
in daaff1b breaks none of the deploy-script, isolation, runtime or typecheck checks run above.

### Assessment after daaff1b

**Task quality (slice code, deadec8):** Approved. I1, I2 and M4 are addressed. The open minors
(M5–M10) do not block.
**Typecheck check (daaff1b):** Needs fixes — finding 11, for the check's author.

## Re-review after 34faea7

Range daaff1b..34faea7: the check author's correction 5, in `tests/invariants/loop2_invariant_support.py`
(`strict_workflow`, `_workflow_scalar`) and `tests/invariants/test_account_server_typecheck.py`
(`run_shipping`, `workflow_problems`, the allow-list and its forbidden constructs). The breaks ran
in scratch copies of `git archive 34faea7`, git-initialised, then deleted. The worktree stayed clean.

**Committed workflow and earlier checks:** `workflow_problems` returns none for the committed
`deploy.yml`. Also all OK in the control copy:
- `tests.deploy.test_deploy_workflow`: 16 tests;
- `ServingImageBuiltOnlyAfterTypecheck` together with `test_loop2_container_isolation`,
  `test_loop2_distinct_address` and `test_account_server_runtime`: 27 tests.

Nothing earlier was weakened:
- the earlier `SHIPPING_STEPS` are all kept;
- `shell:` is now matched exactly (`bash`/`sh`), not by its first word;
- a heredoc is refused anywhere outside single quotes, not only after `ssh`;
- the b2 form (`uses: appleboy/scp-action`), `npm … scp` and `tar … | ssh` are still refused.

### #11 breaks

| Break | Result |
|---|---|
| e1 quoted key `"uses": appleboy/scp-action@v0.1.7` | fails — `not read: … not a line of the YAML subset` |
| e2 flow-mapping step `- { name: Copy dist, uses: appleboy/scp-action@v0.1.7, … }` | fails — `not read: … not a line of the YAML subset` |
| e3 `trap 'scp -P "$SSH_PORT" dist.tgz "…:/srv/loop2/"' EXIT` | fails — ``command `scp` is not one this check reads`` |
| e4 (#12) `ssh … "printf %s $(base64 -w0 dist.tgz) \| base64 -d > …"` | fails — `ssh sends the output of a command` |

**#11: ADDRESSED. #12 (the form tried): ADDRESSED.**

### Further evasions tried

Each fetches a file with allow-listed `curl -sSLo dist.tgz <release URL>` and then:

| Break | Result |
|---|---|
| e5 `payload="$(base64 -w0 dist.tgz)"`, then `ssh -i k "$SSH_USER@$SSH_HOST" "printf %s $payload \| base64 -d > /srv/loop2/dist.tgz"` | **passes** |
| e9 the same with `printf -v payload '%s' "$(base64 -w0 dist.tgz)"` | **passes** |
| e6 `ssh -i k "$SSH_USER@$SSH_HOST" "cat > /srv/loop2/dist.tgz" 0<dist.tgz` | **passes** |
| e7 `base64 -w0 dist.tgz \|` then, on the next line, `ssh -i k … "base64 -d > /srv/loop2/dist.tgz"` | **passes** |
| e8 step key `Uses: appleboy/scp-action@v0.1.7` | **passes** in the check; whether GitHub reads `Uses` as `uses` was not verified here |

#### Important (new)

13. `tests/invariants/test_account_server_typecheck.py` `SSH_STDIN` and `run_shipping`: ssh can still
    be fed a file in ways the check's own docstring says it refuses ("ssh with nothing fed through
    its input").
    - e6: the redirection pattern `(?<![<\d])<` skips a descriptor-numbered `0<file`.
    - e7: `SSH_STDIN` reads line by line and joins only backslash continuations, so a pipe at the
      end of a line feeding `ssh` on the next line is not seen.
    - e5 and e9: the `__SUBSTITUTION__` test sees only a substitution written inside ssh's
      arguments, not one carried in through a variable.

    In practice the server's forced command reads only the SHA, so none of these could deploy
    anything. The check judges the workflow alone, though, and the contract grades a check that
    passes on its break Important. Fix:
    - match `\d*<` after ssh;
    - join lines that end in `|`, `||` or `&&` before searching;
    - refuse any variable assigned from a command substitution or from `printf -v` when it is
      later used in ssh's arguments — or, simpler and fail-closed, allow ssh only in the exact
      shape the workflow uses: options from a fixed list, then `"$SSH_USER@$SSH_HOST"
      "$DEPLOY_SHA"`, with no redirection, and not as the last command of a pipeline.

#### Minor (new)

14. e8: `strict_workflow` and `workflow_keys` compare key names case-sensitively. If GitHub
    matches workflow keys without regard to case, `Uses:` slips past. This is unverified here.
    Fail closed by refusing any key that equals a known workflow key only when case is ignored.

### Assessment after 34faea7

**Typecheck check (34faea7):** #11 addressed. It still needs fixes for #13, the ssh-input evasions.
**Slice code:** unchanged since deadec8, and still Approved.

## Re-review after 98be735

Range 34faea7..98be735 is the check author's correction 6. It adds one allowed shape for ssh and
an allowed set of workflow keys, matched case-sensitively. The breaks ran in LF scratch copies of
`git archive 98be735`, git-initialised, then deleted. The worktree stayed clean.

**Committed workflow and earlier checks:** `workflow_problems` returns none for the committed
`deploy.yml`. Also all OK in the control copy:
- `tests.deploy.test_deploy_workflow`: 16 tests;
- `ServingImageBuiltOnlyAfterTypecheck` together with `test_loop2_container_isolation`,
  `test_loop2_distinct_address` and `test_account_server_runtime`: 27 tests.

Nothing earlier was weakened:
- `SHIPPING_STEPS` now holds 32 forms, all the earlier ones kept;
- e1, e2, e3 and `npm` are still refused;
- `curl` now also refuses `file:` URLs, and `base64` is allowed only to decode its input.

### #13 and #14 forms

| Break | Result |
|---|---|
| e5 `payload="$(base64 -w0 …)"`, then `ssh … "$payload"` | fails — `base64 reads a file or encodes`; remote argument not the github.sha variable |
| e9 `printf -v payload '%s' "$(curl -sSL <release URL>)"`, then `ssh … "$payload"` | fails — `the remote argument $payload is not the variable holding github.sha` |
| e6 `ssh … "$DEPLOY_SHA" 0<"$RUNNER_TEMP/dist.tgz"` | fails — `the step redirects a command's input` |
| e7 `printf '%s' "$(curl …)" \|` then `ssh …` on the next line | fails — `ssh is not a command of its own at the top of the step` |
| e8 `Uses: appleboy/scp-action@v0.1.7` | fails — ``key `Uses` … is not one this check allows`` |

**#13: ADDRESSED. #14: ADDRESSED.**

### Further evasions tried

Each is inserted just before the committed ssh line, and the ssh line itself is unchanged:

| Break | Result |
|---|---|
| n1 `printf -v DEPLOY_SHA '%s' "$(curl -sSL <release URL of a base64 bundle>)"` | **passes** |
| n2 `for DEPLOY_SHA in "$(curl -sSL <release URL>)"; do :; done` | **passes** |
| n3 `load() { printf -v "$1" '%s' "$(curl -sSL <release URL>)"; }` then `load DEPLOY_SHA` | **passes** |

#### Important (new; graded by the contract's letter)

15. `tests/invariants/test_account_server_typecheck.py` `run_shipping`: ssh's remote argument
    must be a variable that `env` sets from `github.sha`. The guard against reassigning it only
    looks for the text `NAME=`. Three allow-listed forms overwrite the variable without that
    text: `printf -v NAME`, a `for NAME in` loop, and a function given the name as an argument.
    Each sends content downloaded with `curl` to the server inside the remote argument, and the
    check passes.

    Practical risk is nil:
    - the server's forced command accepts only a 40-hex commit;
    - with `npm` refused, the runner cannot build anything.

    The contract still grades a check that passes on its break Important.

    Fail-closed fix, one rule: refuse any step in which a name the workflow's `env` sets appears
    as a bare word, without `$`. That covers `printf -v DEPLOY_SHA`, `for DEPLOY_SHA in` and
    `load DEPLOY_SHA` alike. Alternatively, refuse `printf -v`, a `for` loop variable and a
    function call with a bare variable name.

### Assessment after 98be735

**Typecheck check (98be735):** #13 and #14 are addressed. #15 remains: an evasion that is
contrived and harmless in practice, but still a break the check passes. The orchestrator should
decide whether to fix it with the one-rule change above or record it as accepted.
**Slice code:** unchanged since deadec8, and still Approved.

## Re-review after bceae3d

Range 98be735..bceae3d is the check author's correction 7, in
`tests/invariants/test_account_server_typecheck.py` only:
- `bare_names` refuses a workflow `env` name written as anything but `$NAME` or `${NAME}`;
- `printf` and `local` take no option.

The breaks ran in LF scratch copies of `git archive bceae3d`, git-initialised, then deleted. The
worktree stayed clean.

**Committed workflow and earlier checks:** `workflow_problems` returns none for the committed
`deploy.yml`. Also all OK in the control copy:
- `tests.deploy.test_deploy_workflow`: 16 tests;
- `ServingImageBuiltOnlyAfterTypecheck` together with `test_loop2_container_isolation`,
  `test_loop2_distinct_address` and `test_account_server_runtime`: 27 tests.

Nothing earlier was weakened:
- `SHIPPING_STEPS` grew from 32 to 37, all the earlier forms kept;
- the old `NAME=` guard was replaced by `bare_names`, which covers more;
- a path variable for ssh may no longer be declared with `local` (the committed workflow does not
  use it).

### #15 forms

| Break | Result |
|---|---|
| n1 `printf -v DEPLOY_SHA '%s' "$(curl -sSL <release URL>)"` | fails — ``the step names `DEPLOY_SHA` … other than as `$DEPLOY_SHA` `` |
| n2 `for DEPLOY_SHA in "$(curl -sSL <release URL>)"; do :; done` | fails — same message |
| n3 `load() { printf -v "$1" '%s' "$(curl …)"; }` then `load DEPLOY_SHA` | fails — same message, and `printf` with an option |

### Further evasions tried

Both are inserted just before the committed ssh line, and the ssh line is unchanged. A local
`bash -e` run, with `echo` standing in for `curl`, shows that each one overwrites `DEPLOY_SHA` with
the downloaded text: it prints `c2: PAYLOAD-c2` and `c3: PAYLOAD-c3`.

| Break | Result |
|---|---|
| c1 `DEPLOY_\` + newline + `SHA="$(curl …)"` (bash joins the halves into an assignment) | fails, but only because the check reads `DEPLOY_` as a command name |
| c2 `for DEPLOY_\` + newline + `SHA in "$(curl -sSL <release URL>)"; do :; done` | **passes** |
| c3 ``printf $'\x2dv' DEPLOY_\`` + newline + `SHA '%s' "$(curl -sSL <release URL>)"` | **passes** |

**#15: NOT ADDRESSED.** The forms reported are refused, but the same overwrite still passes once
the name is split across a backslash-newline (c2, c3). c3 also defeats the "`printf` takes no
option" rule, because the check reads the option `$'\x2dv'` as a word that does not start with
`-`.

#### Important (by the contract's letter; practical risk nil, as #15 explains)

16. `tests/invariants/test_account_server_typecheck.py` `bare_names` and the `printf`/`local`
    rule: the check reads a logical line with its backslash-newlines turned into spaces. Bash
    instead removes a backslash-newline outright, inside a word too, so a name split across lines
    is never seen. ANSI-C quoting (`$'…'`) hides an option.

    Fail-closed fix:
    - refuse a `\` at the end of a line unless whitespace precedes it, since only such a split can
      fall inside a word;
    - refuse `$'` anywhere outside single quotes.

    With those two rules, every form tried so far fails.

No other new breakage in the fix diff.

### Assessment after bceae3d

**Typecheck check (bceae3d):** #15 is not addressed (#16). The forms it named are refused; the
same overwrite passes with a split name. The two-rule fix above closes it. Whether to keep
hardening a check against evasions that the server's forced command already makes harmless is
the orchestrator's call.
**Slice code:** unchanged since deadec8, and still Approved.

## Re-review after ebfb73b

Range bceae3d..ebfb73b is the check author's correction 8:
- `joined_continuations` and the `$'…'`/`$"…"` refusal in `tests/invariants/test_account_server_typecheck.py`;
- the shared `_logical_lines` in `tests/invariants/loop2_invariant_support.py:646` now removes a
  backslash-newline instead of turning it into a space.

The breaks ran in LF scratch copies of `git archive ebfb73b`, git-initialised, then deleted. The
worktree stayed clean.

### #15 and #16 forms

| Break | Result |
|---|---|
| c2 `for DEPLOY_\` + newline + `SHA in "$(curl …)"; do :; done` | fails — `a backslash ends the line without whitespace before it` |
| c3 ``printf $'\x2dv' DEPLOY_\`` + newline + `SHA '%s' "$(curl …)"` | fails — the same, plus the `$'…'` refusal |
| n1, n2, n3 (#15) | still fail; they are in `SHIPPING_STEPS`, which now holds 41 forms, and `test_workflow_reader_refuses_file_copying_steps` is OK |

**#16: ADDRESSED.**

### Further evasions tried

Both are inserted just before the committed ssh line, and the ssh line is unchanged. A local
`bash -e` run, with `echo` standing in for `curl`, prints `v1: PAYLOAD-v1` and `v2: PAYLOAD-v2`:
each one overwrites `DEPLOY_SHA`.

| Break | Result |
|---|---|
| v1 `for o in -v; do :; done`, `n=DEPLOY_`, `printf "$o" "${n}SHA" '%s' "$(curl -sSL <release URL>)"` | **passes** |
| v2 `o=-; o="${o}v"`, `n=DEPLOY_`, `printf "$o" "${n}SHA" '%s' "$(curl …)"` | **passes** |

The "printf takes no option" rule reads the word as written (`$o`), not its value when the value
is not fixed. `bare_names` sees only the whole name, not one put together from parts.

**#15: NOT ADDRESSED.** The same overwrite still passes in a third form. Fail-closed closure:
- `printf`'s first argument must be a literal format, single-quoted, not starting with `-`;
- no argument of `printf` may expand a variable to stand before the format.

Or, simpler still, allow `printf` only with a single-quoted literal first word.

### Shared reader change (deploy-script checks)

- `deploy/loop2-deploy` has five line-end backslashes (lines 130, 143, 147, 269 and 330). Each has
  whitespace before it, so removing the backslash-newline does not change any word.
- The joiner keeps lines with an open quote as they are, so quoted text is not joined.

Run as `test_account_server_typecheck.ServingImageBuiltOnlyAfterTypecheck` together with
`test_loop2_container_isolation`:

| Copy | Result |
|---|---|
| control | 20 OK |
| d1 `up` without `--no-build` | fails `test_deploy_script_builds_before_starting_without_building` |
| d2 `docker system \` + newline + `prune -af` | fails `test_no_host_wide_prune_and_images_pruned_only_by_the_loop2_label` |
| d3 `docker compose --project-name loop do\` + newline + `wn` (the word split mid-way) | fails `test_every_compose_command_names_the_loop2_project`, `test_nothing_takes_a_project_down` and `test_old_deployment_is_only_read` |

The deploy-script checks still read the script correctly. The split-word form d3 is now caught as
`down`, which it was not certain to be before. The control copy also passes `test_deploy_workflow`
(16), `test_loop2_distinct_address` and `test_account_server_runtime`.

No new breakage in the fix diff.

### Is the open finding load-bearing?

No. Every evasion from #13 to #15 can only change what the workflow sends as ssh's remote
argument. None can ship files or reach the server with anything other than a validated commit:
- the automation key's `authorized_keys` entry is `restrict,command="/usr/local/bin/loop2-deploy"`
  (spec line 131). `restrict` turns off forwarding and a terminal, and the forced command replaces
  whatever command is sent;
- `loop2-deploy` reads the sent text only as `SSH_ORIGINAL_COMMAND`. It refuses anything but 40
  lowercase hex (exit 2) and a commit not on `main` (exit 3), and Slice 4's adversarial tests
  cover that. The script reads no stdin from ssh: its two `read` loops read a variable and the
  meminfo file;
- the server builds the commit through the Dockerfile, whose build runs `npm run typecheck` first.
  So even a commit that is accepted reaches the container only type-checked. That is the sentence
  `account-server-typecheck/1` protects.

This depends on one thing no repository test checks: the human installing the `authorized_keys`
entry exactly as human action 4 says. If the entry lacked `command=`/`restrict`, the key would
give a shell and every workflow evasion would matter. That is the real dependency, and it should
be checked at the human's first deployment, not by more hardening of the workflow reader.

### Assessment after ebfb73b

**Typecheck check (ebfb73b):** #16 is addressed and #15 is still open in a third form (v1/v2). It
is not load-bearing, for the reason above. Recommendation: either apply the literal-format rule
for `printf`, or record #15 as an accepted limit of a static reader. The second should come with
an explicit check, at human action 4/5, that the `authorized_keys` entry carries
`restrict,command="/usr/local/bin/loop2-deploy"`.
**Slice code:** unchanged since deadec8, and still Approved.
