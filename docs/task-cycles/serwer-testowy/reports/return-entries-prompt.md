# Dispatch — return step: entries (serwer-testowy)

You wrote this task's foundation entries earlier (reports/foundation-entries.md). The return step
(WAY-11) found more; the orchestrator ruled which are written now. Same rules as your first
dispatch (project record skills read in full; sentences and fields only — no checks, no code;
explicit-path commits; no access values; questions back to the orchestrator). Analysis with
evidence: `reports/return-step.md` (IDs below refer to it).

Source change to reconcile: the definition's gate record now reads `Approved by: Mariusz,
2026-10-13`, fingerprint 9e480247 (re-approved; only "What is the game built with?" changed; the
entries of this task are unchanged — verify by reading them).

Write or edit (all unmerged, so edit in place where an entry is this cycle's own):
1. C8 — *Approved by* of D-08/1, D-09/1 and D-05/3 (D-05/3 now holds the projected wording whole):
   transcribe the current gate record, `Mariusz, 2026-10-13`.
2. C1 — D-12/1 sentence: keep row 3's meaning (agent reads only through the `mikrus` MCP; changes
   on the server are a human's), make it true beside the automated deployment (the deployment
   D-09 sets up is not an agent's change).
3. C2 — D-11/1: wording true under the workflow's non-cancelling concurrency group (a pending run
   can be replaced by a newer one whose commit contains it); row 2's meaning stays.
4. C3 — D-10/1 rationale: the host's two public IPv4 service ports are taken by other workloads
   (the old game and another), no port numbers.
5. F1 — new decision: how loop2 is rolled back (a rebuild of an earlier commit: a revert merged to
   `main`, or a human run of the installed script with an earlier commit; a human run may deploy a
   commit of any branch, the automation key only `main`; rolling back code does not roll back data;
   the base image tag is not pinned, so a rebuild restores code, not the identical image).
6. F2 — new decision: the automation key runs a root-owned installed copy outside the checkout;
   each run compares it with the commit's source and only warns; reinstalling is a human's.
   *Review when* carries: before player accounts are served (task 15), because a stolen automation
   key can switch loop2 to any earlier commit of `main` until the next push.
7. F4 — new decision: loop2 shares the host by acting on its own checkout, image, container, log
   and lock only (nothing else on the host, no host-wide prune), building only past a resource gate
   on available memory and free disk, and running under a memory limit — the rule, not the numbers.
8. F7 — new invariant (sentence only; a different agent writes the check):
   `loop2-deploy-trigger-input/1` — the deployment command the automation key runs refuses every
   input but one commit name of 40 lowercase hexadecimal characters before it fetches, builds or
   changes a container, and deploys only a commit that belongs to `main` as just fetched. Derives
   from D-09; *Rests on* the OpenSSH fact of item 10.
9. F8 — new invariant: `loop2-deploy-keeps-running/1` — a deployment that stops before it starts
   the new container (input, commit, lock, resource gate, fetch, checkout, type check or build)
   leaves the running loop2 container in service. Derives from the F1 or F4 decision as fits.
   Method for both: the invariant gate command the other entries use.
10. E1 — environment fact: OpenSSH forced-command semantics (`command=` replaces the client's
    command, which reaches the command as `SSH_ORIGINAL_COMMAND`, unset when the client sends none;
    `restrict` disables forwarding, pty, user rc) — read and quote the OpenSSH sshd(8) manual
    yourself, with source and read date.
11. E4 — environment fact: a Cloudflare Configuration Rule can set the SSL/TLS encryption mode for
    one hostname on the Free plan — read and quote Cloudflare's documentation; D-10/1 *Based on*
    cites it.
12. Glossary G1 `deployment` (separate the act from the installed thing, with *Not*), G2 `test
    server` (the only place loop2 runs and where accounts go public — not a server players never
    use), G3 `public address` (the HTTPS origin players use, not the server's IP address or origin
    port); adjust binding sentences only where the term entries require it.
13. Part map: P2 failure modes of `deployment` (from the spec's error table and return-step.md P2),
    P3 failure modes of `account-server` (invalid listen port, occupied address), P4
    `agent-workflow` depends on `deployment`, P5 external-context rows for the container image
    registry (them → us, untrusted) and the GitHub repository the server fetches over its read-only
    key (them → us).

Run every format guard (`--base 1701186 --merge-onto 1701186` where the guard takes them); expected
errors: only `merge of <request link>` placeholders. Append "Return step" to your report with the
Polish meaning sentence of every new or changed entry and the commits. Return under 150 words.
