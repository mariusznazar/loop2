# Return step report — correction 1 — teksty-rozjechane-z-kodem

**Status:** done
**Head compared:** `102b4f3` (branch `task/teksty-rozjechane-z-kodem`), range `e9bca2f..102b4f3` (files changed: `.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md`, `foundations/environment_facts.md`)
**Commits of the return step:** none (nothing in the foundation no longer matched; the worktree is clean)

## Foundation compared with code

I read the whole of `foundations/environment_facts.md` lines 1-135 (the four facts in their new form and the template form they are checked against), the diff of the range, and every entry a search of the whole foundation found for the four identifiers and for the words of the host facts. What no longer matches: **none**.

| Entry | Read against | Result |
|---|---|---|
| Facts `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads`, `mikrus-host-swap` (`foundations/environment_facts.md:15-37`) | their new *Source* lines (reading of 2026-11-10, command, host, tool and version, output word for word) and the skill's new allowance (`.claude/skills/loop2-deploy/SKILL.md:68-70`: `stat --version`, `grep --version`, `docker --version`, `free --version`); the commands of the readings are the ones the skill allows: `grep -c -e ...` and `stat -c '%a %U:%G' ...` at `SKILL.md:62-67`; `docker ps` and `free` are the skill's other allowed reads (not re-read here beyond the diff and the existing lines `SKILL.md:41,60-67`) | The four sentences stand with their readings; the three known Minor findings are unfixed as the handoff says and not touched. |
| D-14 (`decisions.md:307-321`; *Based on* `mikrus-host-docker-workloads`) | sentence "The loop2 container is a Docker container"; *Rationale* "the host already runs Docker with Compose, and the old loop game runs there in a Docker container" | Matches the fact (Docker 28.1.1 on the host, `loop:latest` and `felddy/foundryvtt:12.331` running). |
| D-16 (`decisions.md:344-368`; *Based on* `openssh-authorized-keys-options`, `loop2-host-forced-command-entry`, `loop2-host-installed-command`) | "root-owned installed copy ... kept outside the server's checkout"; *Verification* "an `authorized_keys` entry whose forced command names the installed copy's path" | Matches the readings `1` (one entry beginning `restrict,command="/usr/local/bin/loop2-deploy" `) and `755 root:root`. |
| D-17 (`decisions.md:370-393`; *Based on* `mikrus-host-docker-workloads`, `mikrus-host-swap`, `docker-volume-lifecycle`) | *Rationale* "the host is shared with the old loop game and another workload and has no swap" | Matches: `free` shows `Swap: 0 0 0` (the narrowed sentence "reports zero total swap" is what D-17's "has no swap" rests on). |
| D-231 (`decisions.md:4437-4545`; *Based on* `mikrus-host-swap`, `cron-d-file-rules`) | *Rationale* "on a host without swap" | Matches the swap reading. |
| D-12 (`decisions.md:271-292`) and the skill's new allowance | "An agent reads the server only through the `mikrus` MCP server and changes nothing on it"; *Verification* complies "reads the deploy log and the container state" | The four version commands only read; D-12 carries no list of commands, so it needs no change. |
| Other mentions found by search (`decisions.md:4692` "a new allowed `docker run` that the reading of loop2-host-sharing forbids", `:4479`, `:4492`, `:4536`; invariant `loop2-host-sharing`, `invariants.md:155`) | the invariant's *Rests on* is `none`; no invariant names any of the four facts (`grep` of `foundations/invariants.md` for the four identifiers: no match) | Nothing rests on or restates the changed wording ("zero total swap in `/proc/meminfo`" is no longer quoted anywhere: `grep -rn -iE "proc/meminfo|coreutils|Ubuntu 22|total swap"` finds it only in the skill's reference `setup_and_secrets.md:402`, a command of the setup procedure, and in unrelated facts about `cron` and `logrotate` on Ubuntu 22.04). |
| Part map `deployment` and `agent-workflow` (`part_map.md:118-173`) | the skill's new list | Neither entry lists the skill's allowed commands or the facts; `agent-workflow` claims `.claude/**` and `.agents/**`, which hold the changed skill files and the copy pair (`diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy`: identical). No file is unclaimed (`foundation_check.py`). No change needed. |
| Word "observed" against the template's three forms | `.the-way/elements/environment-facts/template.md` form of *Source* (edition, page, `reading:`); `grep -n "observed" foundations/environment_facts.md` | None of the four uses "observed" now; each takes the form `reading: ... run <date>`. One other fact still says "observed": `mikrus-tunnel-outbound-tcp` (`environment_facts.md:272`, reading of 2026-10-26, written in the cycle that added the Cloudflare tunnel). It is not one of the four and outside this correction, so I left it (see concerns). |

## Decisions written or changed (by me)

None.

## Invariants written or changed

None.

## Environment facts

None written or changed by me. (The four facts were rewritten by the correction's step 2.)

## Glossary terms

None. No word of the correction is used against an entry or in a meaning WAY-95 gives an entry.

## Part-map changes

None.

## Projected entries written

None (the task is independent).

## Rows of *Settlements to record* written

None by me.

## Choices of the correction, weighed for an entry that binds after the merge

| Choice | Binds after the merge and not in an entry yet? | What I did |
|---|---|---|
| The deploy skill may run the version of `stat`, `grep`, `docker` and `free` for a reading in an environment fact (human's answer A, 2026-11-10) | No. It is a rule of the skill's list of allowed reads, written in the skill itself (`SKILL.md:68-70`); D-12 already holds the principle (an agent only reads) and holds no list. | Nothing to record. |

## Own-work check

- **Requirement most likely not met:** an entry that rests on or names one of the four facts still says what the old reading said (for example the swap sentence's "in `/proc/meminfo`", or a claim of D-17 or D-231 wider than "zero total swap").
- **Check:** `grep` of the whole of `foundations/` for the four identifiers (hits: `decisions.md:312,352,375,4462` and the four headings), for `proc/meminfo`, `coreutils`, `swap`, `docker`, `authorized_keys`, `0755`, `root:root`; I read D-12, D-14, D-16, D-17, D-231 whole and D-237's lines around `:4692`.
- **Showed:** every dependent sentence stands with the new readings. No correction made.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git status --short` (at start and at end) | 0 | empty |
| `git -C .the-way rev-parse HEAD` | 0 | `e3825a82386a61930a86f8517fc0c5f422fc2833` |
| `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` | 0 | identical |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |

Not run: `npm test` and any other test (the cycle runs the gate; no gate is mine). I did not check the `git ls-files --stage -- .the-way` gitlink against the `rev-parse` output above (the handoff did not ask). No command was run on the test server; the `mikrus` MCP was not called.

## Concerns and observations (not corrected)

1. `mikrus-tunnel-outbound-tcp` (`foundations/environment_facts.md:272`) still opens its *Source* with "observed:" and names no tool or version, so it stands against the template's third form as the four did before the correction. It is outside this correction's scope (a different fact, of the tunnel step, not of the four host facts); Mariusz may want it brought to the form (`reading: ... <tool and its version> — "<output>"; run <date>`) in a separate change. The deploy skill's new allowance covers only the four version commands, not `curl --version`, so a reading of it would need a further allowance.
2. The three Minor findings of `reports/correction-1-review.md` stay unfixed, as the handoff says: the forced-command sentence is slightly wider than its reading, the docker sentence names "the old loop game" while the rows show the image `loop:latest`, and the quoting of the docker rows is loose.

## Unread material

- `foundations/environment_facts.md`: read lines 1-135 whole (the Read tool truncated the file at 135 of 719 lines); the rest I searched with `grep` for "observed", the four identifiers and the host words, and read line 272 and its neighbours.
- `foundations/decisions.md`: D-12, D-14, D-16, D-17 read whole; D-231 read from its beginning to its *Rejected* (lines 4437-4500, truncated by cutting at 600 characters per line, so long lines of *Rejected* and the entry's later part were not read whole); D-237 only lines 4684-4700.
- `foundations/invariants.md`: only the entry `loop2-host-sharing` and the lines the greps matched.
- `.claude/skills/loop2-deploy/SKILL.md`: the diff and the lines `41`, `60-67` through grep and the diff; not whole. The `references/` files: only the lines the greps matched.
- `reports/correction-1-step-1-report.md`, `correction-1-step-2-report.md`, `correction-1-review.md`, `.runs/.../task.md`: not opened (the handoff gave their content).

## Searches not found or unclear

- None unclear. Not found, as expected: any foundation entry, invariant, part-map line or guideline that lists the deploy skill's allowed commands; any invariant whose *Rests on* names one of the four facts; any remaining quotation of "zero total swap in `/proc/meminfo`".
