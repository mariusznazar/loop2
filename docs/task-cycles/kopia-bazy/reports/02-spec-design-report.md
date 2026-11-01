# Report — designer of the spec, task kopia-bazy

Status: done
Spec: `docs/task-cycles/kopia-bazy/spec.md`

Check result: the four checks of `design.md` pass after three fixes; two local probes ran on Node.js 24.17.0; not run: anything in Docker (engine off), on the server, on Strych, with `age` (not installed here); no test suite, since no code was written.

## Questions sent

None. No source left a question open that changes the design: each fact only the server holds became a check inside H2 (see *Searches not found or unclear*), and the design stands either way. No batch was returned, so no answer is recorded.

## Readings to check

These are the places where the spec reads a settled text in a way the orchestrator or the spec's reviewer should look at.

1. **Settlement 10 lists „usuwanie starych kopii" as a step; the design has no such step.** Seven fixed weekday file names mean the old copy goes in the sending step. The invariant's meaning holds (no failed step stays silent), and a failure of the send calls `pusher`. The foundation step has to word the invariant so that it is not false or empty on this point. Rejected alternative: a real deletion step, which needs an operation no source documents and H1 did not try.
2. **Overwriting a file on Strych has not been tried.** H1 sent one file. Decision 7 rests on it, so H2.5 tries it with a second run. If Strych refuses, retention has no way left and the cycle returns to question 2, the path the refinement's note F9 foresaw for deletion.
3. **The seeing of a scheduled run (H2.8).** Question 10 words this as the human's wish ("jeśli człowiek chce zobaczyć"). The spec keeps it the human's choice, recommends it and reports it as unchecked if left out, because a host whose cron never starts the file is exactly the silence settlement 8 accepts.
4. **Eight copies, not seven, stand on Strych during a transfer.** The task's sum 7 × S stays H3's pass condition as written. The spec adds what it misses: the real limit per copy is 25 MB, about 385 accounts at the full limit against the 440 of question 1. The human accepted 440 as a cost, so the handoff to the human should carry this.
5. **H2 gains a deliberate failure (H2.6), which the task does not list.** It costs a minute and one message, and is the only proof on the real host that the failure path reaches `pusher`. It adds no code. It can be dropped without changing the design.
6. **`scripts/restore-trial.mjs` is new code the task does not name.** To do 5 needs a login, and a browser cannot do it: production settings force the tunnel mode, and the cookie and Origin rules refuse a local browser. Its cost is one launcher and its tests; the way it replaces is about ten untried PowerShell commands inside the no-merge window.
7. **`account-save-backup` gets Method `review`.** Its sentence speaks of the state of a running server. By `.the-way/elements/invariants/template.md`, `test` reads only where a test checks the sentence itself.

## Ways weighed

Each carried row, the way taken and why the others lost. The spec's *Decisions* hold the costs in full.

| Carried row | Taken | Lost, and why |
|---|---|---|
| 1. Node.js release sentence | A check in the final stage of the image build | Pin only: checks nothing. Check in the deploy script: a container on a host without swap, and a `docker run` the reading of `loop2-host-sharing` forbids. Both: a pin to maintain, which the sentence does not need; can be added later |
| 2. How the copy is made | `backup()` of `node:sqlite` in one step | Default `rate`: measured, not finished in 20 s with 1337 restarts. `VACUUM INTO`: works, but a second operation beside the one the entry's source names; kept as the fallback. `rate: -1`: outside the documented "positive". Three-file copy: not consistent |
| 3. Container to host | `docker exec` standard output, temporary copy in the container's `/tmp` | `docker cp` from the volume: a plain copy left in persistent storage by any failure. A mount: changes D-17 |
| 4. Encryption | `age`, identity file as a symmetric key, in the host's pipe | Pair: settlement 6 says a secret on the server with a copy, and a thief of the server reads the live database anyway. `gpg`: many flags, home directory, possible background agent. `openssl enc`: authenticates nothing. Node `crypto`: own format, key in the game container |
| 5. Sending, compression | `rsync` as in H1; no compression | `rsnappush`: absent, deletes nothing, no saving on a changed file. `gzip`: one stage and one restore step for room nothing needs yet; reversible later. `zstd`: one more package |
| 6. Host key | Batch mode, strict check, own file filled in H2 and compared with H1's fingerprint | `accept-new`: trusts the first answer. No check: sends past an impostor. Default `known_hosts`: depends on H1's answer |
| 7. How older copies go | Seven weekday files, replaced by the send | Listing then deleting: names from a shared server into a deleting command, and deletion is undocumented. `rsync --delete`: same power. Computed deletion: deletion untried, and one missed night strands a file. In-place writing: a failed send destroys a copy |
| 8. Hour, deployment | 03:17 server clock; the deployment's own lock for the container step | No lock: a false alarm at each deployment at that hour |
| 9. Result | `/var/log/loop2-backup.log`, one attempt's start, end, stage, size | Exit code only: too little to diagnose. Nothing: To do 7 could not be met |
| 10. Comparison | Yes, three pairs, warning only, reinstalled once in H5 | No comparison: the drift D-10 rejected stays invisible |
| 11. *Scope*, *Method*, *Rests on* | Named per entry in *Foundation entries* | — |

Added questions:

- **Capacity:** decision 5.
- **What a human needs for H5, H2, H3:** decision 11's table, and decision 12.

## Evidence

Probes on this computer, Node.js 24.17.0; the scripts stand in `docs/task-cycles/kopia-bazy/design-probe/` and their databases were removed.

- `probe.mjs`, 66 MB database in WAL mode, a separate process committing about 66 times a second:
  - `rate` above the page count: done in 371 ms, integrity `ok`, peak 54 MiB, writer's longest commit 9 ms, no busy error.
  - Default `rate`: not finished after 20 s, 1337 restarts seen, peak 55 MiB, writer's longest commit 118 ms.
- `probe2.mjs`: the target alone holds a row that stood only in the source's write-ahead log and `user_version`, and no `-wal` file stands beside it; `rate: -1` was accepted on this release.
- The probes measured neither the streaming to standard output nor a run inside a container, so the memory figure holds for this computer only.

## The four checks

1. **Placeholders, empty sections:** none.
2. **Contradictions:** fixed one between *Intent* and decision 7 (who "runs" the replacement) and one in decision 13 (seven nights are not enough where a night failed). Sums rechecked: 512 − 409, 200 / 8, 25 / 0.065, 200 / 7. The hour rechecked against Poland's clock changes. Against the foundation: D-10, D-15, D-16, D-17 and `loop2-host-sharing` hold; D-13, D-112 and D-73 change and are named.
3. **Several independent changes:** To do 6 (the release check) stands apart from the backup except for the one `AccountDatabase` method both use. It can be a slice of its own, built first. The rest is one change. The skill and foundation work follow the code.
4. **Two readings:** H2.8, the capacity sum and settlement 10 are each written down one way. A guideline line was also widened to the `src/server/` trust boundary, which the command reaches.

## Reaches beyond the dispatch

- `docs/task-cycles/kopia-bazy/cycle.md` — the two questions of step 4 in full.
- `src/server/configuration.ts`, `src/server/account-routes.ts`, `src/server/transport.ts` (by search) — whether a browser can log in to a local image, for H3.
- `src/browser/sim/saved-game.ts`, by search — saved game states hold names as text, for H3's marker.
- `tests/invariants/test_loop2_host_sharing.py` (head), `tests/invariants/account_container_support.py` (head), `tests/quality/test_quality_invariants.py` (search), `tests/invariants/test_account_server_typecheck.py` (search) — what a new `docker` command or a new script meets.
- `scripts/measure-passwords.mjs` (head), `package.json`, `.gitattributes`, `tsconfig.server.json` (search) — the launcher's model, and line endings.
- `foundations/part_map.md` *build-tools* lines on `scripts/**`, `foundations/glossary.md` (search for backup words, none) — where the new files fall.
- `.the-way/elements/invariants/template.md`, lines 40–71 — the meaning of *Method*.
- Refinement record lines 263, 417, 807, and the search on Strych words — H1's course.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` — before the probes.
- Sources outside the repository, read 2026-10-30:
  - Node.js 24.21.0 `sqlite.md`
  - sqlite.org `backup.html` and `c3ref/backup_finish.html`
  - age 1.0.0 `age.1.ronn` and README
  - packages.ubuntu.com `jammy/age` and its file list
  - the rsync manual
  - wiki.mikr.us `strych_backupy`
  - Ubuntu jammy `cron.8`

  The foundation step should reread each one raw: these were read through a summarizing fetch tool, which is not a reading of the source for a fact's quotation.
- Wrote in `docs/task-cycles/kopia-bazy/design-probe/`, inside the handoff's boundary; nothing outside `docs/task-cycles/kopia-bazy/`. No `mikrus` tool, no ssh, no commit.

**Searches not found or unclear:**

- Whether root's `~/.ssh/config` on the server holds the Strych entry: the H1 record does not say how the login was given. H2.3 confirms or writes it.
- Whether the host's cron daemon runs and honours `/etc/cron.d`: "harmonogram użytkownika root jest pusty" says nothing of it. H2.8 is the only proof.
- Whether `apt` on the server offers `age`: Ubuntu 22.04 has it in `universe`, but whether that component is on is unread. H2.1 names the release binary as the fallback.
- The server's time zone: unread; decision 8 needs no answer.
- Which Node.js release the server's image holds: unread; decision 9 needs no answer, and the deploy log will show it.
- What Strych does at its 200 MB limit: no source says. The design assumes a non-zero exit of `rsync`, which is a failed night with a message; no trial covers it.
- `rsync`'s list of exit values: the part of the manual read did not reach it, so the skill's reading of a failed send needs that passage (left to the maker).
- Cron's default `PATH`: the manual gives no value; the script sets its own, as `deploy/loop2-deploy` does.
- Docker's stream being binary-safe: not confirmed here; the spec's smoke test, where a daemon answers, and H3 cover it.
- The `age` version on the server is 1.0.0 by Ubuntu's list, and the `-e -i` use was read in that version's manual. The winget version on the owner's computer will be newer: the file format is meant to carry across versions, but no source read here says so in words, and H3 proves it for this case.
