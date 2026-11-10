# Slice 8 report

**Status:** `questions`

**Commits:** none. No fact is committed: none of the four readings can be complete, because no allowed command
prints a tool version (section "Questions"). `foundations/environment_facts.md` is unchanged. The worktree is clean
at `c2cfc04`.

**Files changed:** none.

## Readings made (the `mikrus` MCP, `servers` then `exec`, run 2026-11-10)

Only the four commands of the handoff were run, each once, in the form the list "Allowed" of
`.claude/skills/loop2-deploy/SKILL.md` gives. The server
identifier was used in the calls only and is written nowhere here.

| Fact | Command as run | Output as the MCP returned it |
|---|---|---|
| `loop2-host-installed-command` | `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` | `755 root:root` |
| `loop2-host-forced-command-entry` | `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` | `1` |
| `mikrus-host-docker-workloads` | `docker ps` | table of six containers (below) |
| `mikrus-host-swap` | `free` | table (below) |

The tilde in the count command expanded under `exec`; it printed `1`.

`free`, whole:

```
total        used        free      shared  buff/cache   available
Mem:         4456448      625296     3647128         720      184024     3831152
Swap:              0           0           0
```

`docker ps`: six rows, container names `loop2-cloudflared`, `loop2`, `lab-cloudflared`, `lab-caddy`, `loop`,
`foundryvtt`. The row of `loop` reads, up to its PORTS column, `loop:latest   "docker-entrypoint.s..."   8 weeks ago   Up 8 weeks (healthy)`
and the row of `foundryvtt` reads `felddy/foundryvtt:12.331   "./entrypoint.sh res..."   18 months ago   Up 5 months (healthy)`.
Both rows carry published host port numbers in their PORTS column; those numbers are the ones the deploy skill keeps
out of the repository, so I do not reproduce the rows whole here or in a draft.

## Questions (every one I can see)

1. **Versions (all four tools).** The template asks for `<tool and its version>`. None of the allowed commands prints
   a version: `stat` and `grep` (GNU coreutils / grep), `docker ps` (Docker) and `free` (procps) print none, and the
   list allows no `--version`. The earlier wording (`GNU coreutils 8.32`, `Docker 28.1.1 build 4eba377`,
   `Python 3.10.12`, Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve) comes from the 2026-10-13 run and is not shown by
   this run, so I did not copy it. Recommended answer: add to the list "Allowed" of the deploy skill the reads
   `stat --version`, `grep --version`, `docker --version` and `free --version` (each prints a version only), then
   have this slice resumed; alternative if the orchestrator prefers no new allowed command: settle that the
   *Source* names the tool without a version and record that as a decision, since the template and WAY-80 ask for
   one. Cost if the first is wrong: one more skill edit. I did not widen the list myself.
2. **Docker output carries port numbers.** A word-for-word `docker ps` output, or even the two rows the sentence
   rests on, contains host port numbers. The template allows "the lines of it the sentence rests on". Recommended
   answer: quote fragments of the two rows that stop before the PORTS column, joined by ` · `, and the status
   fragments, e.g. `loop:latest "docker-entrypoint.s…"   8 weeks ago   Up 8 weeks (healthy)` ·
   `felddy/foundryvtt:12.331 "./entrypoint.sh res…"   18 months ago   Up 5 months (healthy)` (the container names
   `loop` and `foundryvtt` are in the NAMES column, after PORTS, so they would be written as the image names above;
   the sentence then says "containers of the images loop and foundryvtt run"). Alternative: narrow the command to
   `docker ps --format '{{.Names}} {{.Status}}'` as the 2026-10-13 reading did, which prints no port; that format is
   not in the list "Allowed" and would need adding.
3. **Escaping in the MCP output.** The MCP returns `&quot;` for `"` and `&gt;` for `>` in the `docker ps` output.
   The host prints the plain characters. Recommended answer: write the plain characters (they are what the host
   returned; the escaping is the MCP's JSON wrapping) and say so nowhere in the entry.

## Drafted readings and sentences (not committed)

Form: `reading: \`<command>\` on the test server's host, <tool, version missing> — "<output>"; run 2026-11-10`.

1. `loop2-host-forced-command-entry`. Sentence: the output shows a count of lines in the `~/.ssh/authorized_keys` of
   the account the MCP command runs as, and the allowed read does not show that this account is the one the deploy
   key belongs to (no `whoami` is allowed). Draft sentence, narrower than the current one: "The authorized_keys file
   of the account the test server's host gives the agent contains exactly one line beginning with
   `restrict,command="/usr/local/bin/loop2-deploy" `." Draft source: reading:
   `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` on the test server's host,
   grep <version missing> — "1"; run 2026-11-10. Question for the orchestrator: keep the current sentence (the
   test server's authorized_keys, exactly one entry beginning with the command), which is wider than the output
   only by the identity of the account, or narrow it as drafted. The current text also drops the trailing space
   the command matches; the draft keeps it.
2. `loop2-host-installed-command`. The current sentence ("owned by root:root with mode 0755") stands. Draft source:
   reading: `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` on the test server's host, stat <version missing> —
   "755 root:root"; run 2026-11-10.
3. `mikrus-host-docker-workloads`. The current sentence ("The old loop game and foundryvtt run as Docker containers
   on the test server's host.") stands against the output (both containers are `Up`). Draft source: reading:
   `docker ps` on the test server's host, docker <version missing> — fragments per question 2; run 2026-11-10.
4. `mikrus-host-swap`. The current sentence says "in `/proc/meminfo`", which the `free` output does not show, so it
   is wider than the output. Draft sentence: "The test server's host reports zero total swap." Draft source:
   reading: `free` on the test server's host, free <version missing> — "Swap:              0           0           0"
   · "total        used        free      shared  buff/cache   available"; run 2026-11-10.

Dependants D-14, D-16, D-17 and D-231 were not read in this run: nothing was changed, and with the sentence of
the swap fact narrowed (draft 4) and that of the forced-command fact possibly narrowed (draft 1) they must be read
when the slice is resumed (see Unread material).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (baseline; no file changed, so
  this shows only that the worktree stays clean).
- Each *Source* names the command and carries the output as returned: not met, by design, for the reason in
  question 1; nothing was written.

## Own-work check

Requirement most likely not met: a reading complete in the template's form, with a tool version that the run
itself shows (task item 22 and question 2, and the handoff's ban on a version from memory). Check: look in the
four outputs for any version string. Result: none of the four outputs contains one, so the requirement cannot be
met without a new allowed read; I returned `questions` instead of writing a version from memory.

## Unread material

- `foundations/decisions.md` D-12, D-14, D-16, D-17, D-231: not read, because no entry was changed and a sentence
  change is only a draft; to be read on resumption.
- `foundations/part_map.md:143-173` (deployment): not read, for the same reason.
- `.runs/.../task.md:59` and `:88-93`: not read; the handoff's quoted slice and notes were enough to decide the
  return.
- `.claude/skills/loop2-deploy/SKILL.md`: read lines 35-114 (the section "Agent or human" whole); the rest unread.
- `foundations/environment_facts.md`: the viewer showed lines 1-135 of a file it reported as 719 lines; read the
  four entries (lines 15-37) and the template-form entries around them. The rest not read; it is not changed.

## Searches not found or unclear

- A command in the list "Allowed" that prints a tool version: not found (question 1).
- The file `foundations/environment_facts.md` reported 719 lines in the reader's header but showed 134 and
  `grep -c '^## '` counts 118 headings; unclear which is right, not relevant to this slice.

## Reach beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by the method file, read whole), and
  `.the-way/elements/environment-facts/template.md` (named in *Read*, read whole).
- Ran `git status`, `git log -1` and `foundation_check.py` in the worktree.

## Choices

- Committed nothing rather than a part of the facts: the handoff offers "none" when versions are missing, and all
  four lack one. Rejected: writing the facts without a version (breaks the template; cost if wrong: a reading the
  checker or reviewer rejects) or writing the old versions (a version from memory, banned by the handoff).
- Did not run `--version` or any unlisted command to obtain versions.
