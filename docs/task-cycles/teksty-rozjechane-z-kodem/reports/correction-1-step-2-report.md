# Correction 1, step 2 report (Slice 8, the four host facts)

**Status:** `done`

**Commit:** `102b4f3` (on the task branch, from `f33f110`). One commit for the four facts.

**Files changed:** `foundations/environment_facts.md` only, 5 insertions, 5 deletions (four *Source* lines and one sentence).

## Commands run (the `mikrus` MCP, `servers` then `exec`, 2026-11-10)

Exactly the eight commands of the handoff, each once. The server id was used in the calls only and is written nowhere.
The MCP wraps output in JSON with HTML escapes (`&lt;`, `&gt;`, `&quot;`); the plain characters the host printed are
used below and in the file. The MCP strips leading whitespace of the first line of `free`.

| Command | Output as the host returned it |
|---|---|
| `stat --version` | `stat (GNU coreutils) 8.32` (first line; the rest is copyright and licence text) |
| `grep --version` | `grep (GNU grep) 3.7` (first line; the rest is copyright and licence text) |
| `docker --version` | `Docker version 28.1.1, build 4eba377` |
| `free --version` | `free from procps-ng 3.3.17` |
| `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` | `755 root:root` |
| `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` | `1` |
| `free` | `total        used        free      shared  buff/cache   available` / `Mem:         4456448      629204     3642344         720      184900     3827244` / `Swap:              0           0           0` |
| `docker ps` | six rows (`loop2-cloudflared`, `loop2`, `lab-cloudflared`, `lab-caddy`, `loop`, `foundryvtt`); the rows of `loop` and `foundryvtt` are quoted in the entry below up to their PORTS column; the PORTS columns (which hold host port numbers) are not reproduced anywhere |

## The four facts

### `loop2-host-forced-command-entry`
- Sentence before and after: unchanged — "The test server's authorized_keys contains exactly one entry beginning with
  `restrict,command="/usr/local/bin/loop2-deploy"`." It is wider than the output only by the identity of the account:
  the count is of the `~/.ssh/authorized_keys` of the account the agent's command runs as, as in the 2026-10-13 reading
  (the handoff keeps the sentence). It also says "entry" for a line, and omits the trailing space the command matches.
- *Source* as written: reading: `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` on the test server's host, grep (GNU grep) 3.7 — "1"; run 2026-11-10

### `loop2-host-installed-command`
- Sentence: unchanged — "The installed `/usr/local/bin/loop2-deploy` is owned by root:root with mode 0755." (output
  `755 root:root` shows it).
- *Source* as written: reading: `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` on the test server's host, stat (GNU coreutils) 8.32 — "755 root:root"; run 2026-11-10

### `mikrus-host-docker-workloads`
- Sentence: unchanged — "The old loop game and foundryvtt run as Docker containers on the test server's host." Both
  rows show `Up` (`Up 8 weeks (healthy)`, `Up 5 months (healthy)`). The container names `loop` and `foundryvtt` stand in
  the NAMES column after PORTS, so the rows quoted (which stop before PORTS) show them by image: `loop:latest` and
  `felddy/foundryvtt:12.331`. That the first image is the old game's rests on the NAMES column of the output, which is
  not quoted, and on the entry's earlier wording; the quoted fragments show a `loop:latest` container and a foundryvtt
  container running.
- *Source* as written: reading: `docker ps` on the test server's host, Docker version 28.1.1, build 4eba377 — "6e63d970d315   loop:latest                "docker-entrypoint.s…"   8 weeks ago     Up 8 weeks (healthy)" · "bbe6f6752113   felddy/foundryvtt:12.331   "./entrypoint.sh res…"   18 months ago   Up 5 months (healthy)"; run 2026-11-10

### `mikrus-host-swap`
- Sentence before: "The test server's host reports zero total swap in `/proc/meminfo`." After: "The test server's host reports
  zero total swap." Narrowed because `free` does not show where it reads from.
- *Source* as written: reading: `free` on the test server's host, free from procps-ng 3.3.17 — "total        used        free      shared  buff/cache   available" · "Swap:              0           0           0"; run 2026-11-10

## Dependants read

D-14, D-16, D-17 and D-231 read whole (`foundations/decisions.md` from `### D-14`, `### D-16`, `### D-17`, `### D-231`).
All four still stand against the new readings: D-14 rests on a loop2 container beside the old game's (shown running);
D-16 on a forced-command line and a root-owned installed copy (counts `1`, `755 root:root`); D-17 on a host shared with
the old game and no swap (`Swap: 0`); D-231 on a host without swap. No decision says anything the readings contradict,
so none was edited. A search of `foundations/` found no invariant whose *Rests on* names the four facts.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`, run after all four edits (the four
  edits were one file in one run; not run after each, as the four changes are in one commit).
- Mechanical check before showing: each quoted output is the output of this run's command, as copied from the host's
  returns above (the version is the first line of the version query).

## Own-work check

Requirement most likely not met: no host port number, server name or id in the repository, and the reading in the
template's form with the tool's version. Check: `git diff` of the commit searched for `273`, `2027`, `joanna` and `:20`
patterns by eye over the five changed lines (the docker rows stop before PORTS; the container IDs `6e63d970d315` and
`bbe6f6752113` are Docker container ids, not the server's). Result: none of those appears. The `docker ps` rows quoted
contain nested double quotes (the COMMAND column); `foundation_check.py` accepts them (0 errors), but a reader of the
entry should know the fragment's own quotes belong to the host's output.

## Unread material

- `foundations/environment_facts.md`: read lines 1-135 (the part that holds the four entries and the template-form
  entries around them), not the remaining entries (the viewer capped the read); the four entries edited were read whole.
- `.the-way/elements/common/way_of_working.md` ("Reading the foundation") named by `read.md`: not read; the foundation
  search was done by grepping the four identifiers in `foundations/`.
- Everything else named: read.

## Searches not found or unclear

- none for the work; the earlier note that `foundations/environment_facts.md` shows 134 lines in one read against a
  larger count in the viewer's header remains unclear and does not touch this change.

## Reach beyond the handoff

None beyond `read.md`, `decide_entry.md`, `draft.md`, `write.md` of the environment-facts skill (named by its
`SKILL.md`) and a grep of `foundations/` for the four identifiers.

## Questions and concerns

- Nested double quotes inside the docker fragments (see own-work check). Alternative if the reviewer dislikes them:
  quote the IMAGE and STATUS columns as separate fragments. Not changed.
