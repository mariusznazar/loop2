# Report - slice 9 of the task cycle `serwer-odczyty-i-straznik`

**Status:** done with concerns (the concern: the template gives no exact form for this source; see "Choices" and "For the return step")

## Commits and files

- `1a3c8678` - `foundations/environment_facts.md` (+6 -0): new entry `check-address-schedule-run-times`, placed after `github-schedule-shortest-interval`.
- `9289c29f` - `.claude/skills/loop2-deploy/SKILL.md` (+13 -7) and `.agents/skills/loop2-deploy/SKILL.md` (+13 -7), byte for byte the same (`cp` of the first over the second, then `cmp`: identical).
- `.github/workflows/check-address.yml` and `deploy/**` are unchanged (`git diff 96cb8c9c HEAD --stat -- .github deploy` prints nothing).

## The reading

Command (the form slice 3 put on the list), run 2026-11-14 on the author's computer in the worktree, `gh version 2.88.1 (2026-03-12)` as `gh --version` prints it, exit 0:

```
gh run list --workflow check-address.yml --event schedule --limit 20 --json createdAt,startedAt
```

Raw output, word for word (one line; it holds 17 objects, newest first, fewer than the limit of 20, and `createdAt` equals `startedAt` in every one):

```
[{"createdAt":"2026-11-14T02:14:57Z","startedAt":"2026-11-14T02:14:57Z"},{"createdAt":"2026-11-13T22:02:16Z","startedAt":"2026-11-13T22:02:16Z"},{"createdAt":"2026-11-13T16:20:34Z","startedAt":"2026-11-13T16:20:34Z"},{"createdAt":"2026-11-13T08:10:45Z","startedAt":"2026-11-13T08:10:45Z"},{"createdAt":"2026-11-13T01:20:56Z","startedAt":"2026-11-13T01:20:56Z"},{"createdAt":"2026-11-12T20:26:48Z","startedAt":"2026-11-12T20:26:48Z"},{"createdAt":"2026-11-12T12:39:58Z","startedAt":"2026-11-12T12:39:58Z"},{"createdAt":"2026-11-12T04:09:51Z","startedAt":"2026-11-12T04:09:51Z"},{"createdAt":"2026-11-11T23:35:47Z","startedAt":"2026-11-11T23:35:47Z"},{"createdAt":"2026-11-11T17:25:19Z","startedAt":"2026-11-11T17:25:19Z"},{"createdAt":"2026-11-11T09:35:11Z","startedAt":"2026-11-11T09:35:11Z"},{"createdAt":"2026-11-11T02:17:48Z","startedAt":"2026-11-11T02:17:48Z"},{"createdAt":"2026-11-10T22:45:37Z","startedAt":"2026-11-10T22:45:37Z"},{"createdAt":"2026-11-10T17:55:20Z","startedAt":"2026-11-10T17:55:20Z"},{"createdAt":"2026-11-10T10:15:50Z","startedAt":"2026-11-10T10:15:50Z"},{"createdAt":"2026-11-10T02:28:54Z","startedAt":"2026-11-10T02:28:54Z"},{"createdAt":"2026-11-09T19:54:50Z","startedAt":"2026-11-09T19:54:50Z"}]
```

An earlier run of `gh run list` with `--json createdAt,startedAt,databaseId,status,conclusion,event` gave the same 17 times, all `success`, all `schedule`.

Gaps between neighbouring start times, computed by a one-off Python script from the output (oldest to newest): 6:34, 7:47, 7:39, 4:50, 3:32, 7:17, 7:50, 6:10, 4:34, 8:30, 7:47, 4:54, 6:50, 8:10, 5:42, 4:13 (hours:minutes); shortest 3 h 32 min (2026-11-10 22:45:37 to 2026-11-11 02:17:48), longest 8 h 30 min (2026-11-12 04:09:51 to 12:39:58), mean about 6 h 24 min, 17 runs over about 102 h. The task's Context says 16 runs and gaps of about 4.5-8 h; my reading has one more run (2026-11-14 02:14:57) and gaps from 3 h 32 min to 8 h 30 min, so the Context's range is not repeated anywhere; fact and skill carry only what this reading shows.

## What was written

- Fact `check-address-schedule-run-times`: the sentence says what the output shows (17 runs between two start times, gaps between 3 h 32 min and 8 h 30 min); it names no cause and says nothing of the cron line (that is the repository's file, not the source). *Source* is in the `reading:` form with the full output.
- Skill, both copies, item 2 of "The three ways the owner learns the game failed": the workflow asks for a run every five minutes; five minutes is what the schedule asks for, not the rhythm GitHub gives; the start times (the `gh run list` form "Agent or human" allows) show gaps of hours; with the server or the tunnel down the alarm of GitHub may come only after hours; the cause of the gaps is not established.
- Skill, both copies, "The four limits of the scheduled check", limit (4): the GitHub message follows the rhythm of its scheduled runs and may come only after hours; the mails of GitHub follow that rhythm, not one every five minutes; the cause of the gaps is not established. The skill holds no numbers of the reading (they would go stale; the fact holds them), no provider host name and no IPv6 literal.
- Left as is: the comment of `check-address.yml` ("Every five minutes, ...") states what the schedule asks for; the slice told me to leave it, and I did. The watcher's "cron every five minutes" in the skill is the server's cron, not GitHub's, and is unchanged.

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` (run after the edits, before the commits) | 0, "0 errors" |
| skill test | `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` (the named runner, 5 tests, OK, finished at once) | 0 |
| private paths | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` (1 test, OK) | 0 |
| workflow | `python -B scripts/test.py tests/deploy/test_check_address_workflow.py` (17 tests, OK; the workflow is unchanged) | 0 |
| copies | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` after `cp` | 0, identical |

The named runner finished in seconds for all three, so the substitute `python -B -m unittest` was not needed. `npm test` was not run.

## Own-work check

Requirement most likely missed: the two skill copies byte for byte the same, with no provider host name or IPv6 literal, and the workflow unchanged. Checks: `cmp` of the copies (identical), `test_both_copies_are_byte_identical` and `test_no_ipv6_literal_and_no_mikrus_server_name` in the skill test (pass, exit 0), `git diff 96cb8c9c HEAD -- .github deploy` (empty). A second requirement at risk: that the fact's numbers are the output's. I recomputed min and max gaps by hand from the raw output (22:45:37 to 02:17:48 is 3 h 32 min 11 s; 04:09:51 to 12:39:58 is 8 h 30 min 7 s) and by script; they agree. No check failed and passed on a rerun.

## Choices

- **Form of *Source*.** The orchestrator's note gave `reading: <command> on <host>, <tool and its version> - "<output>"; run <date>`. The template (`.the-way/elements/environment-facts/template.md`, section "Source") reserves a reading for "a state of a host the product's people run that no page shows"; for a service's public answer it gives the form "a page without editions" (an address, a place, the passage, the date read), and the only line on a service's answer read through a tool (lines 135-139, a setting read only with its setter's credentials) is a `TODO`. So the template gives no exact form for the output of `gh run list` on a public repository. I used the `reading:` form, naming the computer, `gh` with its version and the output word for word, and added "the answer of GitHub for a public repository" to mark what it is. Rejected: the page form with an address such as the API's `.../actions/workflows/check-address.yml/runs` URL - it would quote a different text than the slice's command prints, and the To do says to read through `gh`. Cost if wrong: the reviewer may want the page form; it is a change of the Source line only. `foundation_check.py` accepts the entry.
- **Gaps in the sentence as a range, not a list.** A list of 16 gaps would be derived values; the full output stays in *Source*, so a reader can recompute.
- **Limit (4) of the skill also edited**, not only the sentence the slice names for it: it said "a GitHub mail every five minutes", which states the rhythm the reading contradicts.

## For the return step

- Remark for D-356 (not edited here): its Rationale and text say the scheduled workflow runs "about every five minutes"; the risk "a mail every 5 minutes and hundreds of runs a day" and the sentence about outage detection need correcting from the fact `check-address-schedule-run-times` (17 runs, gaps 3 h 32 min to 8 h 30 min on 2026-11-14), with the cause of the gaps stated as not established. The sentence "so that GitHub notifies the owner of the failed run" holds, but the notice comes at the next scheduled run, which may be hours after an outage begins.
- The new fact is named by no decision yet, so the return step adds `check-address-schedule-run-times` to the *Based on* of D-356 (the fact stands only while a decision or invariant names it); `foundation_check.py` did not report it.
- `github-schedule-shortest-interval` ("once every 5 minutes") stays true as the shortest interval GitHub allows; D-356's wording should separate what the cron asks for from what GitHub gives.
- Template remark: `elements/environment-facts/template.md` gives no form for a service's public answer read through a CLI (see "Choices"); a decision for the-way may be warranted.
- The comment in `.github/workflows/check-address.yml` ("Every five minutes, ...") and the test `tests/deploy/test_check_address_workflow.py` are unchanged, as the slice requires.

## Reach beyond the handoff

- `.the-way/elements/environment-facts/template.md` (whole): to find the form of *Source* for a service's answer; the handoff gave only the orchestrator's form.
- `.claude/skills/loop2-deploy/SKILL.md:80-91` and `:280-370` (passages): to find the allowed `gh` form and the sections to edit.
- `grep` of `.claude/skills/loop2-deploy/references` for "five minutes": no reference to the scheduled check's rhythm there; nothing to change.
- Local `gh run list` (read only), `gh auth status` (to see `gh` is logged in; the token is not quoted here) and `gh --version`.

## Unread material

- `.runs/.../task.md`: read only lines 38-43, 84-91, 101-104 (the passages named), not the rest.
- `foundations/decisions.md`: D-356 read whole (9027-9040); the rest not read.
- `foundations/environment_facts.md`: read lines 670-740 (the entries around the two named ones) and the diff of commit `96cb8c9c`; not the rest of the file.
- `tests/agent_workflow/test_loop2_deploy_skill.py`: first 80 lines (the whole file shown by `cat | head -80`; the file ended inside that range).
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: whole. No other the-way file beyond the template.

## Searches not found or unclear

- A template form for a source that is a service's public answer read through a CLI: not found (see "Choices").
- The sentence "the fact stands only while a decision names it" versus a new fact that no decision names yet: `foundation_check.py` did not complain; whether it should is unclear, and the return step resolves it by naming the fact in D-356.
- The cause of the gaps between scheduled runs: not established, not searched beyond the output (as the slice requires).
