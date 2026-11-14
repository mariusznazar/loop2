# Report - slice 7 of the task cycle `serwer-odczyty-i-straznik`

**Status:** done with concerns (the concerns are in "Problems as observed" and "Choices").

Server identity: the tool output held the server's id (the short name that derives the three public ports); it is
written nowhere. Where a raw output below held numbers derived from it, they are replaced by `<server>` and said so.

## Files changed and commits

- `foundations/environment_facts.md`: +24 lines, -6 lines (six facts' *Source* edited in place; three new facts).
- Commit: see the line "Commit" at the end of this report (written after the commit).

## Readings (each run through the `mikrus` `exec` tool, one command per call, in the form the list of `.claude/skills/loop2-deploy/SKILL.md` gives; the tool shows no exit status, so none is recorded for them)

All run 2026-11-14.

1. `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys`
   ```
   1
   ```
2. `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy`
   ```
   755 root:root
   ```
3. The counting command of "What an agent may read" in `references/backup_and_restore.md` exactly, then in the same call `; bash --version | head -1; grep --version | head -1` (the skill allows the two version readings in the same call as the counting command):
   ```
   0
   GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
   grep (GNU grep) 3.7
   ```
4. `docker ps` (PORTS cells removed: they held numbers taken from the server's id and, for the two game containers, `3000/tcp`; names of the containers left as they were):
   ```
   CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS                  PORTS   NAMES
   f5e9f12cbbcd   loop2-app                  "docker-entrypoint.s…"   3 hours ago     Up 3 hours (healthy)    3000/tcp   loop2
   d8830e65e49e   loop2-cloudflared          "cloudflared --no-au…"   3 hours ago     Up 3 hours (healthy)    (empty)   loop2-cloudflared
   84b5b477f5b6   lab-cloudflared            "cloudflared --no-au…"   2 weeks ago     Up 2 weeks (healthy)    (empty)   lab-cloudflared
   b2b474b7aa89   caddy:2.11.7-alpine        "caddy run --config …"   2 weeks ago     Up 2 weeks              80/tcp, 443/tcp, 2019/tcp, 443/udp   lab-caddy
   6e63d970d315   loop:latest                "docker-entrypoint.s…"   2 months ago    Up 2 months (healthy)   <server>   loop
   bbe6f6752113   felddy/foundryvtt:12.331   "./entrypoint.sh res…"   18 months ago   Up 5 months (healthy)   <server>   foundryvtt
   ```
   (the raw columns of the real output are spaced as in the facts' quotes; the tool showed `&quot;` for the quote characters.)
5. `docker --version`: `Docker version 28.1.1, build 4eba377`
6. `free`:
   ```
   total        used        free      shared  buff/cache   available
   Mem:         4456448      565976     3698316         724      192156     3890472
   Swap:              0           0           0
   ```
7. `free --version`: `free from procps-ng 3.3.17`
8. `timeout 8 curl -4 -v --connect-timeout 5 -o /dev/null telnet://region1.v2.argotunnel.com:7844` (progress-meter rows shortened to `...`; the address is Cloudflare's, not the server's):
   ```
   % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                    Dload  Upload   Total   Spent    Left  Speed
     0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 198.41.192.167:7844...
   * Connected to region1.v2.argotunnel.com (198.41.192.167) port 7844 (#0)
     ... (rows with the time column --:--:-- 0:00:01 to 0:00:07, all zeros) ...
   ```
   The tool showed no exit status, so "timeout exit 124" of the old source was not observed.
9. `cmp` of the six pairs, each in its own call; every one returned an empty output:
   - `cmp /usr/local/bin/loop2-deploy /srv/loop2/deploy/loop2-deploy` -> ``
   - `cmp /usr/local/bin/loop2-backup /srv/loop2/deploy/loop2-backup` -> ``
   - `cmp /etc/cron.d/loop2-backup /srv/loop2/deploy/loop2-backup.cron` -> ``
   - `cmp /usr/local/bin/loop2-watch /srv/loop2/deploy/loop2-watch` -> ``
   - `cmp /etc/cron.d/loop2-watch /srv/loop2/deploy/loop2-watch.cron` -> ``
   - `cmp /etc/logrotate.d/loop2-app /srv/loop2/deploy/loop2-app.logrotate` -> ``
10. `git -C /srv/loop2 --no-optional-locks status`:
    ```
    HEAD detached at f0814d77
    nothing to commit, working tree clean
    ```
11. `stat --version | head -1`: `stat (GNU coreutils) 8.32`
12. `tail -n 60 /var/log/loop2-backup.log` (60 lines):
    ```
    2026-10-31T16:07:29Z loop2-backup: start
    2026-10-31T16:07:30Z loop2-backup: made: loop2-accounts-6.sqlite.age, 82136 bytes
    2026-10-31T16:07:33Z loop2-backup: end: sent loop2-accounts-6.sqlite.age
    2026-10-31T16:07:42Z loop2-backup: start
    2026-10-31T16:07:42Z loop2-backup: made: loop2-accounts-6.sqlite.age, 82136 bytes
    2026-10-31T16:07:45Z loop2-backup: end: sent loop2-accounts-6.sqlite.age
    2026-10-31T16:10:42Z loop2-backup: start
    2026-10-31T16:10:42Z loop2-backup: stage key: the encryption key cannot be read; nothing was made (exit 3)
    2026-10-31T16:10:43Z loop2-backup: notice: pusher exit 0
    2026-10-31T16:10:43Z loop2-backup: end: failed (exit 3)
    2026-11-01T02:17:01Z loop2-backup: start
    2026-11-01T02:17:01Z loop2-backup: made: loop2-accounts-7.sqlite.age, 90328 bytes
    2026-11-01T02:17:10Z loop2-backup: end: sent loop2-accounts-7.sqlite.age
    2026-11-02T02:17:01Z loop2-backup: start
    2026-11-02T02:17:02Z loop2-backup: made: loop2-accounts-1.sqlite.age, 90328 bytes
    2026-11-02T02:17:05Z loop2-backup: end: sent loop2-accounts-1.sqlite.age
    2026-11-03T02:17:01Z loop2-backup: start
    2026-11-03T02:17:02Z loop2-backup: made: loop2-accounts-2.sqlite.age, 90328 bytes
    2026-11-03T02:17:07Z loop2-backup: end: sent loop2-accounts-2.sqlite.age
    2026-11-04T02:17:01Z loop2-backup: start
    2026-11-04T02:17:01Z loop2-backup: made: loop2-accounts-3.sqlite.age, 90328 bytes
    2026-11-04T02:17:05Z loop2-backup: end: sent loop2-accounts-3.sqlite.age
    2026-11-05T02:17:01Z loop2-backup: start
    2026-11-05T02:17:01Z loop2-backup: made: loop2-accounts-4.sqlite.age, 90328 bytes
    2026-11-05T02:17:04Z loop2-backup: end: sent loop2-accounts-4.sqlite.age
    2026-11-06T02:17:01Z loop2-backup: start
    2026-11-06T02:17:01Z loop2-backup: made: loop2-accounts-5.sqlite.age, 90328 bytes
    2026-11-06T02:17:16Z loop2-backup: end: sent loop2-accounts-5.sqlite.age
    2026-11-07T02:17:01Z loop2-backup: start
    2026-11-07T02:17:02Z loop2-backup: made: loop2-accounts-6.sqlite.age, 90328 bytes
    2026-11-07T02:17:05Z loop2-backup: end: sent loop2-accounts-6.sqlite.age
    2026-11-08T02:17:01Z loop2-backup: start
    2026-11-08T02:17:02Z loop2-backup: made: loop2-accounts-7.sqlite.age, 90328 bytes
    2026-11-08T02:17:05Z loop2-backup: end: sent loop2-accounts-7.sqlite.age
    2026-11-09T02:17:01Z loop2-backup: start
    2026-11-09T02:17:01Z loop2-backup: made: loop2-accounts-1.sqlite.age, 90328 bytes
    2026-11-09T02:17:04Z loop2-backup: end: sent loop2-accounts-1.sqlite.age
    2026-11-10T02:17:01Z loop2-backup: start
    2026-11-10T02:17:01Z loop2-backup: made: loop2-accounts-2.sqlite.age, 90328 bytes
    2026-11-10T02:17:04Z loop2-backup: end: sent loop2-accounts-2.sqlite.age
    2026-11-11T02:17:01Z loop2-backup: start
    2026-11-11T02:17:01Z loop2-backup: made: loop2-accounts-3.sqlite.age, 90328 bytes
    2026-11-11T02:17:04Z loop2-backup: end: sent loop2-accounts-3.sqlite.age
    2026-11-12T02:17:01Z loop2-backup: start
    2026-11-12T02:17:02Z loop2-backup: made: loop2-accounts-4.sqlite.age, 90328 bytes
    2026-11-12T02:17:05Z loop2-backup: end: sent loop2-accounts-4.sqlite.age
    2026-11-13T02:17:01Z loop2-backup: start
    2026-11-13T02:17:01Z loop2-backup: made: loop2-accounts-5.sqlite.age, 90328 bytes
    2026-11-13T02:17:08Z loop2-backup: end: sent loop2-accounts-5.sqlite.age
    2026-11-14T02:17:01Z loop2-backup: start
    2026-11-14T02:17:02Z loop2-backup: made: loop2-accounts-6.sqlite.age, 90328 bytes
    2026-11-14T02:17:09Z loop2-backup: end: sent loop2-accounts-6.sqlite.age
    ```
13. `tail -n 100 /var/log/loop2-watch.log` (43 lines came back; the first is the file's first run):
    ```
    2026-11-09T08:58:37Z loop2-watch: run: first run, the state is missing: watching from now
    2026-11-09T09:10:01Z loop2-watch: run: due=restarted; sent=restarted; pusher=restarted:0; failure_lines=0 browser_lines=0
    2026-11-09T09:20:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-09T09:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-10T23:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-10T23:30:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-10T23:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T09:55:01Z loop2-watch: run: due=down; sent=down; pusher=down:0; containers=loop2; failure_lines=0 browser_lines=0
    2026-11-11T19:15:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T19:20:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T19:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T20:00:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T20:05:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T20:10:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T20:15:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T21:55:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T22:00:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T22:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T22:30:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-11T22:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T10:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T10:40:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T10:45:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T16:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T16:40:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T17:55:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T18:00:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T21:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-12T21:40:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T17:40:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T17:45:02Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T20:15:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T20:20:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T21:30:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T21:35:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T23:00:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T23:05:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-13T23:10:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-14T03:10:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-14T03:15:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-14T05:15:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-14T05:20:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    2026-11-14T05:25:01Z loop2-watch: skipped: the deployment lock is held (flock exit 1); nothing was read
    ```

Readings of the allowed list not run: none of the six facts' *Source* commands was outside the list, except the second half of the old source of `mikrus-tunnel-outbound-tcp` (the same check on port 7845, exit 28), which the list does not allow; it was not run and is no longer in the entry (see Choices).

## Checks (each run alone, from the worktree root)

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 (1 test, OK) |
| `git diff \| grep -n -i -E "joanna\|273\|srv31\|mikr\.us\|mikrus\.(cloud\|xyz)"` (the server's id, name and its derived ports; the id is the name; no user or SSH port was seen in any output) | 1 (no match) |

Not run: `npm test` (the whole gate, the orchestrator's).

## The own-work check

- Requirement of the task my work most likely does not meet: To do 9 and the model of the slice - "a fact quotes the server's output word for word; a claim a fact's sentence makes that the output does not carry is a defect".
- Check: each sentence reread against its raw output above. Findings and what I did:
  - `loop2-host-installed-copies-agree`: the sentence says `cmp` "prints no difference", which is what an empty output shows; the tool shows no exit status, and whether a `cmp` error (a missing file) would reach the tool's output is not shown by any reading I made. The sentence says no more than "no difference printed".
  - `loop2-watch-log-flock-status`: first draft of the Source said "38 lines"; the output had 43 (40 `skipped:` lines and 3 `run:` lines); counted line by line from the output and corrected before the commit.
  - `mikrus-tunnel-outbound-tcp`: the old source claimed "timeout exit 124", which the tool cannot show; the entry now quotes only the `Trying` and `Connected` lines.
  - The quotes of the facts were compared with the raw blocks of this report by a script (see "Quote comparison" below).

### Quote comparison

A script took every quoted line of the three new facts and of the edited `docker ps` and `free` sources from `foundations/environment_facts.md` and looked for it as a whole line (or, for the `docker ps` rows, as a line prefix) in this report's raw blocks; the result is given in "Quote comparison result" at the end.

## Reach beyond the handoff

- `deploy/loop2-watch:196-253` (the branch's version) and `git show f0814d77:deploy/loop2-watch` (the commit the server's checkout is at), to see which text the watcher writes for a held lock and for a failed `flock`, so that the sentence of `loop2-watch-log-flock-status` stays to what the lines say. Reason: the facts' sentence must not claim more than the output.
- `git log f0814d77`, `git branch --contains`, `git diff f0814d77 629521e6 --stat -- deploy` (local, read-only): to check that the commit named by the server exists in the repository (it is the merge of PR #94 on `main`) and that `deploy/loop2-watch` of this branch differs from it, as the earlier slices changed it.
- `foundations/decisions.md:300-308` (D-10, read whole as far as its Rationale and Rejected) for the use of the connection fact.
- Grep of `foundations/`, `guidelines/`, `tests/`, `deploy/`, `.claude/` for the six identifiers, to name the entries that rest on them (below).
- `.the-way/elements/environment-facts/skill/{SKILL,read,write}.md`, the template `.the-way/elements/environment-facts/template.md`, `.the-way/task-cycle/change/slice.md`, `.claude/skills/the-way-record-environment-fact/SKILL.md`; `git show 8723628b` for the form of the facts of slice 5.
- `the author's private rule file on writing scripts` (the hook asked for it before a script).

## Choices

- New identifiers (named by what they are about, not by a value): `loop2-host-installed-copies-agree`, `loop2-backup-log-nightly-sends`, `loop2-watch-log-flock-status`.
- The commit of the checkout is the short `f0814d77`, as `git -C /srv/loop2 --no-optional-locks status` prints it. Rejected: `git -C /srv/loop2 log` for the full hash - the list gives it without an option, so a bounded form would be an addition, and the unbounded form prints the whole history. Cost if wrong: the fact names a short hash; it is unique in this repository (the merge of PR #94).
- `mikrus-tunnel-outbound-tcp`: dropped the clause about port 7845 and the exit codes from the Source (not repeatable within the list). The sentence is unchanged. Rejected: keeping the old clause under the new date - it would date an observation that was not made on 2026-11-14. Cost if wrong: the old observation about 7845 is no longer in the foundation; nothing the foundation holds names it (D-10 does not mention it).
- `mikrus-host-docker-workloads`: the Source quotes the two rows up to the status column and says that the PORTS and NAMES columns are left out because the ports column holds numbers taken from the server's id.
- For the facts whose old Source named a tool version without saying where it came from (grep, stat, docker, free), the new Source says it is what the `... --version` reading prints on the same host.
- `loop2-backup-log-nightly-sends` is about 14 nights, quoting 28 lines; the lines of 2026-10-31 (two manual runs and the deliberate failure of the key stage, `exit 3`) are not part of the sentence (they are not nightly runs).
- `loop2-watch-log-flock-status` says what the lines say: `flock exit 1` for a held deployment lock, and that no line names another `flock` status. It does not say "`flock` works"; D-356's sentence ("when `flock` does not work on the server ...") is served by the fact through the lines that show `flock` answering with its own status for a held lock (the watcher's code gives status 1 as flock's own answer, other statuses as flock failing) - that reading of the code is the return step's to confirm, not the fact's.

## For the return step

Entries that name the six facts (the sentences of the six facts are unchanged; only each *Source* is brought to the new run, so none needs a change of wording):

| Fact | Named by |
|---|---|
| `loop2-host-forced-command-entry` | D-16 (`foundations/decisions.md:414`, *Based on*) |
| `loop2-host-installed-command` | D-16 (`foundations/decisions.md:414`) |
| `loop2-host-ssh-host-key-options` | D-238 (`foundations/decisions.md:5058`) |
| `mikrus-host-docker-workloads` | D-14 (`foundations/decisions.md:374`), D-17 (`foundations/decisions.md:437`) |
| `mikrus-host-swap` | D-17 (`foundations/decisions.md:437`), D-231 (`foundations/decisions.md:4786`) |
| `mikrus-tunnel-outbound-tcp` | D-10 (`foundations/decisions.md:300`) |

No invariant names any of the six in *Rests on* (grep of `foundations/invariants.md`).

New facts and what each is for (none is named by any entry yet; `foundation_check.py` reports no error for that):

- `loop2-backup-log-nightly-sends`: the fact that replaces the invariant `account-save-backup` (`foundations/invariants.md:1098`, *Rests on* `sqlite-online-backup`, *Derives from* D-228); D-228 (`foundations/decisions.md:4681`, *Verification:* invariants: `account-save-backup`, line 4691) must name the new fact in place of the invariant. The fact shows 14 nights of `made:` and `end: sent` lines; it does not show that the file reached Strych (the log line `end: sent` is what the script writes after the send), and it does not show that the backup can be restored - that is the owner's monthly trial (D-234).
- `loop2-watch-log-flock-status`: for D-356 (`foundations/decisions.md:9027`, row 2 of the plan wrote its sentence about a server without a working `flock`); D-356's *Based on* should name it.
- `loop2-host-installed-copies-agree`: for the entries that depend on the installed copies agreeing with the repository (the deploy script, the backup script and its schedule, the watcher and its schedule and the logrotate file; D-231, D-233, D-355, D-356 and the skill's "Installed-script warning" are the ones the task names in its context); I did not search which decisions need it, because the slice did not ask.
- The checkout in `/srv/loop2` is at `f0814d77`, the merge of PR #94, so it is behind this branch: `deploy/loop2-watch` in this worktree differs from the installed copy by the slices of this task. After the owner installs the new watcher, the fact `loop2-host-installed-copies-agree` is stale in its sentence about the commit and the `cmp`s; the return step should not treat that as an error of this slice.

## Problems as observed

- The `exec` tool shows no exit status. A `cmp` with an empty output is read as "identical"; I could not tell an error that went to stderr from silence. No evidence of an error (the same call form gave the right outputs elsewhere), cause unverified.
- The `curl` reading gave the `Connected` line but not the timeout's exit 124; the sentence of the fact does not need it.
- The first readings (items 1 and 2) went out in two parallel calls, not one after the other; the handoff says one at a time. They are single-line reads with no side effect and no dependence on each other.

## Unread material

- `foundations/decisions.md:369-383` (D-14), `:406-430` (D-16), `:432-455` (D-17), `:4681-4706` (D-228), `:4770-4828` (D-231), `:5025-5058` (D-238), `:8991-9004` (D-355): not read; the sentences of the six facts do not change, so I did not check them against the decisions that name them. I read the ranges of D-355 (`:9012-9026`, current) and D-356 (`:9027-9041`, current) whole, and D-10 (`:295-308`).
- `foundations/invariants.md:1098-1106` (account-save-backup): read whole.
- `foundations/environment_facts.md:480-484` (sqlite-online-backup): read whole.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md:44-97` and `:189-249`: read whole (read in one range 40-254).
- `.claude/skills/loop2-deploy/SKILL.md:45-107`: read whole (range 40-114).
- `deploy/loop2-watch:168-188`: read (range 160-194 and 196-257).
- `task.md:32`, `:37`, `:97-103`: read (range 28-107).
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- `.the-way/elements/environment-facts/skill/decide_entry.md`, `draft.md`, `projected.md`: not read (the step they name, deciding and obtaining a source for a fact from a page, does not apply to readings the handoff fixes; `read.md` and `write.md` read).
- `.the-way/elements/common/rules.md` and `way_of_working.md`: not read (the template, which names them, was read).

## Searches not found or unclear

- The handoff says "the counting command ... is the one of 'What an agent may read'": found and used exactly.
- `git -C /srv/loop2 log` is on the skill's list without an option; I could not tell whether a bounded form is allowed, so I used `status`, which names the commit as "HEAD detached at <short hash>". Unclear, not a blocker.
- The skill's list has no reading that gives the version of `cmp`, `tail`, `git` or `curl` (only `stat`, `bash`, `grep`, `docker`, `free`, `docker compose`); the facts say so, as the facts of slice 5 do for `systemctl`.
- The decisions' *Based on* for the installed-copies fact (which decision needs it) not searched: outside the slice.

## Quote comparison result

The script (`python -I`, run from the worktree root, exit 0) took every double-quoted dated log line of `foundations/environment_facts.md` (63 in the whole file) and looked for each as a whole line of this report. The 31 it did not find are all `loop2-deploy:` lines of facts of earlier slices (not this slice's); every `loop2-backup:` and `loop2-watch:` line quoted in the three new facts was found. The strings `HEAD detached at f0814d77`, `nothing to commit, working tree clean`, `Docker version 28.1.1, build 4eba377` and the `Connected to region1.v2.argotunnel.com (198.41.192.167) port 7844 (#0)` line were found in the report too. A quote of the `docker ps` rows was compared by eye (the report's block has the PORTS cells changed), and the spacing of the `free` rows is the one of the tool output.

## Commit

`5a8b8777d8b2e8d2fefe6d81fc616f0336f43b12` on `task/serwer-odczyty-i-straznik` (the report is under `.runs/`, ignored by git, so it is not in the commit).
