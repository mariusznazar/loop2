FAIL

# Report — reviewer of the spec's revision, task kopia-bazy

Status: done
Spec reviewed: `docs/task-cycles/kopia-bazy/spec.md`, as revised at 00:48 on 2026-10-31

Check result: the four earlier findings are resolved; the revision broke one thing, the reason for a full Strych; local Docker checks ran on Node.js 24.22.1; not run: anything on the server or on Strych, `age`, `rsync`, `ssh`, `npm test` and `foundation_check.py` (no code yet).

The fix is one change to a script step and one sentence in the skill's list. It reopens no decision.

## Earlier findings

| # | Finding | State | Where |
|---|---|---|---|
| 1 | The skill may not name Strych's host | Resolved | `spec.md:250`, `:212`, `:362`. The skill points to the constants block, and the test keeps its pattern and gains the file |
| 2 | The log can hold the Strych login | Resolved | `spec.md:171`, `:173`, `:289`. The error text of `ssh` and `rsync` reaches no file, and a sentinel test holds that. Its one side effect is the finding below |
| 3 | The terminal refusal did not stop the slip | Resolved | `spec.md:76`, `:82`, `:273`, `:283`, `:286`. The bare command now refuses. Dropping the terminal check is right: under `docker exec` without `-t` a process here reported `isTTY` false, and with `-t` true |
| 4 | The marker had no place in the procedure | Resolved | `spec.md:214`, `:231`. H2.4a stands before H2.5 and covers later runs too |

The points I left to the orchestrator are also resolved:

- Reading 1: `spec.md:153`, `:302` and `:331` agree with `.the-way/task-cycle/skill/foundation_step.md`, first paragraph.
- *Violated*: `spec.md:325`–`328` agree with `.the-way/elements/invariants/template.md`, § Violated. Method `review` needs no expected-failure marking, and the request field at `.the-way/task-cycle/record_template.md:169`–`171` exists. Commit e95a8b1 changed that one field and nothing else.
- The rollback sentence: `spec.md:261`.
- The lock question: closed by the server fact at `spec.md:160`.

## What the revision broke

### 1. A failed send on a full Strych now shows no reason, and the hand run reports that all is well — contradiction inside the spec

What goes wrong: the first version kept `rsync`'s text in the log, so a night that did not fit said so. Finding 2's answer rightly removes that text and offers a hand run instead. But the hand run sends a small file, and a small file fits on a Strych that has no room for the eighth copy. So in the one send failure the spec itself predicts, the owner gets a message every night, the log gives only an exit code, and the hand run succeeds.

- `spec.md:122` — "A night whose eighth copy does not fit fails cleanly: the old file stays and `pusher` fires", and "the log records each night's size".
- `spec.md:169` and `:171` — the size is logged only after the send, "on success". So the night that fails for its size does not log its size, against `spec.md:122`.
- `spec.md:173` and `:259` — "A human who needs the reason makes a hand run of the send … `rsync` of a small file", given in the skill "for the reason of a failed send".
- Question 5 names a full Strych among the failures that report themselves, and To do 7 asks the skill to say how to read the result. The decision's *Review when* in the definition also starts at "backup copies stop fitting at their destination".
- `rsync`'s list of exit values is unread (`06-spec-revision-report.md:97`), so no exit code can be counted on to name this case.

If nothing changes: the message still comes, so no failure goes silent, but the skill sends the owner to a check that passes. No new copy reaches Strych while he looks elsewhere, so the older files stay in place and the newest copy goes on ageing. The cost of leaving it is a slow, confusing diagnosis on the day the accounts have grown, which is when the copies matter most.

Fix, both small:

- In `spec.md:166`–`169`, log the ciphertext's size before the send, on every attempt, so a failed night holds it next to the exit code. Step 3 already leaves the file there, and a size is no access value.
- In `spec.md:173` and `:259`, say that a passing hand run proves access only, and that a failed send with a passing hand run and a size near 25 MB means Strych has no room for the eighth copy. Add one case to `spec.md:289`'s test: a failing send leaves the size in the log.

Cost of the fix: one log line, one case of a test, one sentence of the skill. There is no way around it inside finding 2's answer, and it needs nothing reversed.

## Measured, for the orchestrator

I reran the probes in disposable containers of the local `node:24-slim`, 24.22.1, limited to 512 MiB with no swap, on an anonymous Docker volume. That is closer to the server's disk than the bind mount the spec's table used. No image was pulled.

| Check | Result |
|---|---|
| One step, 66 MB, writer running | 485 ms, 0 restarts, integrity `ok`, peak 56 MiB, writer's longest commit 55 ms, no busy error |
| Default `rate`, same load | **finished in 1.5 s**, 70 restarts, integrity `ok`, peak 61 MiB, writer's longest commit 155 ms |
| One target file alone | whole, row held only in the write-ahead log and `user_version` present, no `-wal` beside it |
| `rate: -1` | refused, `ERR_OUT_OF_RANGE` |
| Backup into `/tmp`, then the file to standard output, through `docker exec` into a file on the host | exit 0, 66056192 bytes, opened with integrity `ok` and 1000 rows, peak 79 and 85 MiB in two runs, 0.9 and 1.3 s in all, nothing left in `/tmp` |

What follows from this, none of it a finding:

- **`spec.md:64` is wrong in one word.** "the memory and the restarts are what this table gives for the server": restarts follow the disk's speed, 1337, 18 and 70 on three disks. Only the memory carries over. The choice of decision 1 stands, since one step had no restart at all and took a third of the time. But "default `rate` does not finish" must not reach a foundation entry as a general fact, because it finished here. Drop "and the restarts".
- **`spec.md:361`.** A default-`rate` backup "would not finish" under the test's load only on a slow disk, so the guard bites on this computer's Windows disk and may not on another. The test still passes either way, so nothing fails; the maker should know it.
- **The memory gap the designer left is closed for this one way of streaming.** 85 MiB at the peak, on a file over twice the 25 MB limit, stays inside the roughly 100 MiB room of `spec.md:42`. This is a stream written the way a maker probably would, not the product's code.

## A correction to my first report

- "engine off" came from the designer's report and I did not test it. The engine answers.
- I wrote "`rate: -1` was accepted". True of 24.17.0 only; 24.22.1 refuses it, as the spec now says.
- My finding 3 rested on documentation. It is now observed: `isTTY` false without `-t`, true with it.

## Reaches

- `docs/task-cycles/kopia-bazy/cycle.md`, from line 49 — the state of the cycle and its choices Q2–Q6.
- `.the-way/task-cycle/skill/foundation_step.md`, lines 1–14; `.the-way/elements/invariants/template.md`, lines 150–172; `.the-way/task-cycle/record_template.md`, lines 163–174 — what the revision cites.
- `.the-way/elements/common/foundation_check.py`, search for *Violated* and lines 400–432 — whether a new `yes` mark needs anything more. It names `foundations/violated_invariants.md`, which does not exist here, and a mark needs no such file.
- `git show e95a8b1`, and a search of the history for the mark — the model the spec cites.
- Docker on this computer, as the handoff allows: the designer's probes copied to the session's scratchpad, and two small probes of mine there.

Two anonymous volumes outlived their containers, because `docker rm -f` left them. Before removing them I confirmed both were mine, by their creation time and their one synthetic file, and removed exactly those two by name. No container, dangling volume or probe database remains, and the worktree shows no change.

No `mikrus` tool, no ssh, no change to the spec, no code, no commit, no foundation entry.

**Searches not found or unclear:**

- What `rsync` exits with, and what Strych does, at the 200 MB limit: still no source and no trial. The finding holds whatever the code is. I did not try `rsync` locally.
- The text OpenSSH prints on a refused login: still from knowledge, now stated as fact at `spec.md:173`. The rule there holds whatever it prints.
- The human's acceptance of the *Violated* mark, as the designer reports: the mark is set and cleared before the merge, so at the merge the entry reads `no`. The request names both, and the previous cycle did the same; the template does not spell out this order.
- `spec.md:325` sets `Part account-server · deployment` on a projected entry that reads `Part: every`, while `spec.md:302` says a projected entry stands whole. Every projected invariant has that `every`, and `account-save-sqlite-access`, from the same definition, was recorded with its real parts, so I read "whole" as the entry's meaning. The orchestrator may want to confirm that reading.
- The size the hand run's small file leaves on Strych, and its name: the spec leaves both open. It is harmless in size, and one fixed name keeps repeats from adding up.
