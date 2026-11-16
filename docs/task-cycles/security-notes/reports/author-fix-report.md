# Author fix report — task `security-notes`

**Status:** done

**Commit:** `09170e8b` on `task/security-notes` (from head `705be3a5`), changing `security-notes.md` (12 lines) and `README.md` (1 line).

## Findings

- **M1.** In `security-notes.md`: the operator is introduced on first use (the "Mode of work" bullet) as "the operator, the person who owns this repository and runs its agents". "The cycles of the process the repository pins" now reads "the task cycles of the-way, the process this repository pins for its foundation", with the `AGENTS.md` link kept (wording from `AGENTS.md`'s own sentence on the-way). The daily adviser is "the operator's own tool outside this repository that starts some of the sessions", and nothing more; the sentence about which sessions get the deny rule is as wide as before (a session started by the adviser). Stage B and the limits now say "the account of the repository's owner, the operator's own", so one person is meant. I read the rest of the file for names of the same kind: `the-way`, `mikrus` MCP server, Claude Code and the marker file are explained or ordinary; none left.
- **M2.** "this is a rule Claude Code enforces, whatever the model decides."
- **M3.** First sentence: "This file brings together, in one place, how this repository keeps the work of AI agents safe; the files it points to are the source of truth, and where this file and one of them differ, that file is right."
- **M4.** The clause "to see what a session does with a planted instruction" is dropped.
- **M5.** `README.md`: "to the one-off command that updates the lock file".

## Checks

| Check | Command | Exit |
|---|---|---|
| Focused test of private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 (1 test OK) |

Not run: `foundation_check.py` (no foundation file touched, as the handoff says); the full gate (the orchestrator's).

## Own-work check

Hard edges re-run on the two changed files: grep of `security-notes.md` for `[[`, drive-letter paths, `~/`, `mikr.us`, the author's name: no hit; no token value, no decoy host name, no company name, no verbatim planted instruction; the file still says nothing about who merges (the words "merged with the method `merge`" name the method, not a person). `git diff` of `README.md` against `705be3a5` shows the one changed line, the M5 wording only; so README still equals the base but for the one added line and the fixed wording.

## Working copies

None made in this fix; `.runs/author/` was removed in the first return and does not stand.

## Unread material

none (the findings file and the fix handoff read whole; `security-notes.md` read whole before the edit).

## Searches not found or unclear

none
