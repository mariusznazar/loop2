# Dispatch — second design revision (serwer-testowy), to the same design agent

The independent re-review `reports/spec-re-review.md` found two blocking issues and ten notes.
Revise `spec.md` in place under these orchestrator rulings (binding), append a section
"Revision 2" to `reports/design-revision.md`, and return at the self-reviewed spec as before.
Same write boundary, same rules (no code, plan, test or foundation entry; no access values).

**B1 — order of human actions: way (b).** The installed script has two input paths, already in the
spec: the forced command (`SSH_ORIGINAL_COMMAND`, no argument possible from the automation key) and
a human run on the server with exactly one argument. Rule:
- Forced-command path: unchanged — fetch `main`, commit must be an ancestor of `origin/main`.
- Human path (argument given, `SSH_ORIGINAL_COMMAND` unset): fetch all branch heads of the GitHub
  repository and accept a commit that belongs to any branch there. The trust boundary is the forced
  command; a human with a shell on the server can already run anything, so this widens nothing an
  attacker holding the automation key can reach. State why the automation key cannot reach the
  human path (forced command ignores client arguments; with no client command
  `SSH_ORIGINAL_COMMAND` is unset and no argument exists, so the run is refused for lack of input).
  Add adversarial tests: forced path with a commit only on another branch → exit 3; forced path
  with no command → refused; both inputs present → refused.
- Human actions in order, all before the merge, at the blocked draft: (1) Cloudflare; (2) read-only
  deploy key; (3) clone to `/srv/loop2` and install the script from the task branch's commit
  (e.g. `git -C /srv/loop2 show <request head sha>:deploy/loop2-deploy`), check with `bash -n`;
  (4) automation key and the five secrets — before the merge, because the merge's push triggers the
  workflow at once; (5) human run `loop2-deploy <request head sha>`, then the checks (local origin,
  18080 over IPv6, public HTTPS, `kantarion.bieda.it`, applied memory limit). The human reports the
  observations back; a correction of the request then writes the IPv6-origin environment fact from
  that observation (so it has a writer: this request, after the human actions). After the merge the
  workflow run of the merge commit is the first automated deployment; if it fails, loop2 stays on
  the human-deployed commit or fails per the error table, and the skill says what to do.

**B2 — test seam: accept the reviewer's way.** All constants (fixed `PATH`, the checkout, installed
path, log, lock, the meminfo source, thresholds) in one marked block at the top of the script. The
tests run a temporary copy in which only that block is replaced and assert the rest is byte-identical
to `deploy/loop2-deploy`. Stubs for `docker`, `curl`, `flock`, `df` record their calls; a guard
aborts the test if any of them resolves outside the stub directory. The seam is unreachable from the
forced command (no environment variable or argument changes a constant).

**Notes — rulings.**
1. Run account: one account — the one the automation key logs into — owns the clone, holds the
   GitHub SSH alias, runs manual and forced runs; it needs Docker and write access to the checkout,
   the log and the lock. Do not name the account (settlement row 4).
2. Accept: the container part of the one-serving-process check counts listening processes and their
   children, not Node.js processes; health probes and the init process are not serving processes;
   local runs use `--init` like Compose.
3. Accept: add a verification line — before the request, a scan of the diff, the record and the
   request text for IPv6 literals, Mikrus server-name forms and the SSH port/user held in the
   owner's note (the orchestrator runs it without writing the values); and a rule that the script
   never prints `docker info` whole, `hostname` or `uname -n`.
4. Accept: the workflow's public probe also requests `https://kantarion.bieda.it/` and reports it
   (failure there fails the run with a clear message, since the acceptance criterion is about it).
5. Settled by B1.
6. Accept: the first-deployment checks read the applied memory limit.
7. Trust boundary is `deploy/**` only (files that accept data the product does not trust); the
   workflow is security-sensitive (holds the key) but accepts no untrusted input — say so.
8. Accept: README's last sentence changes (Polish, like the file) together with the listen-variable
   line.
9. Accept: a test that the two skill copies are identical; it belongs to the `agent-workflow` part.
10. Accept: step 7 warns, not crashes, when the checked-out commit has no `deploy/loop2-deploy`.
