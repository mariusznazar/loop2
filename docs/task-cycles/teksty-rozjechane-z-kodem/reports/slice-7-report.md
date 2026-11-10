# Slice 7 report — the deploy skill lets the agent read two more facts of the server

**Status:** done
**Commit:** `c2cfc04` on `task/teksty-rozjechane-z-kodem` (range from base `f96f56f`)
**Files changed:**
- `.claude/skills/loop2-deploy/SKILL.md`: +5 / -1
- `.agents/skills/loop2-deploy/SKILL.md`: +5 / -1 (byte-identical to the `.claude` copy)

## What changed

The "Allowed" list of the section "Agent or human" (first bullet, the end of it) gains two read-only reads, each with its expected value, in the form the list already uses for its other metadata reads:

1. `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` (expects `755 root:root`).
2. `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' ~/.ssh/authorized_keys` (expects `1`; the count only, never a line or a key).

The prohibitions and the other bullets are unchanged. Neither copy names the server, its identifier or its address.

## Checks run

| Check | Command | Exit | Result |
|---|---|---|---|
| Focused test | `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Copies identical | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 | identical |
| Count command, sample with one forced line, a near-miss `loop2-deploy-old` line and an indented line | `grep -c -e '^restrict,command="/usr/local/bin/loop2-deploy" ' <scratch file>` | 0 | prints `1` |
| Count command, sample with no forced line | same, on a scratch file with one other key | 1 | prints `0` |
| Count command, missing file | same, on a path that does not exist | 2 | error only, no key content |

The scratch files live in the session scratchpad at `a scratch folder outside the repository` and hold fake keys only. The full suite was not run, as the handoff asks.

No test was written first: the change is prose that instructs an agent, and the existing test covers its form (byte identity, no server name, no IPv6 literal). Nothing in the repository tests the expected values `755 root:root` or `1`.

## Own-work check

- **Requirement:** only the two commands are added; no permission is widened; the prohibitions stay; the copies stay byte-identical; no server name or IPv6 literal.
- **Check:** reviewed `git diff` (only the first Allowed bullet's last lines changed; the prohibition bullet is untouched); ran the count command on the scratch files above, which printed only the count and excluded the near-miss and indented lines; `cmp` of the copies; the existing test.
- **Showed:** all of the above hold. The stat command reads metadata only, and `grep -c` prints a count only.

## Choices

- The expected count is `1`. The handoff gives no value; I took it from the foundation fact `loop2-host-forced-command-entry`, which says the file holds "exactly one entry" beginning with the forced command. The way rejected: `grep -c` with an unanchored pattern, which would also count the near-miss `loop2-deploy-old` line. Cost if wrong: a count that reads 2 would be flagged by the expected value, not hidden.
- The pattern is anchored to the start of the line and includes the trailing space, as the fact's own definition does.
- The two commands sit in the first Allowed bullet, after the existing `cmp` read, instead of a new bullet.

## Unread material

- `.the-way/task-cycle/change/slice.md`: I read it only after the commit. It says a slice executor opens neither the whole plan nor the whole task. I had already read `plan.md` whole, as the handoff's method reading seemed to ask. Nothing in `slice.md` changes this slice's change.
- `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`: I read lines 56-95 (item 23 and question 2), not the whole document, which is what the handoff's *Read* names.
- `foundations/decisions.md` D-12, both `part_map.md` entries, the test file: read in the ranges or whole as named.

## Searches not found or unclear

- none

## Reach beyond the handoff

- `foundations/environment_facts.md` lines 1-50, to confirm the expected values of the count (`loop2-host-forced-command-entry`) and of the mode (`loop2-host-installed-command`). Those two facts belong to Slice 8's *Read* and are not in Slice 7's.
- `.the-way/task-cycle/change/slice.md`, read after the commit (see above).

## Concerns for the orchestrator

- **`~` in the count command.** It expands to the home of the account that runs the shell. The MCP's `exec` may not run through a shell that expands `~`. If it does not, the command fails with a "no such file" error and prints no count, so nothing false is reported. Slice 8's executor should run it once and confirm it prints `1`, or report the error. If it does not expand, the path would need to be written differently, which is a change to this slice.
- **Slice 8 depends on this commit.** Its readings use both new commands and `docker ps` and `free`, as its handoff says.
