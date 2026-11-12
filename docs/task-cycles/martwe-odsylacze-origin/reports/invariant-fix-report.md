# Invariant fix report: tracked-file-private-names

**Status:** done

- Base: 12ff2bcb142f22bac2148ec8210d9dc2f613b1ee (worktree clean at start, branch task/martwe-odsylacze-origin).
- Files changed: foundations/invariants.md (1 line replaced, the sentence of tracked-file-private-names only).
- Commit: see `git log -1` on the branch ("docs: :memo: let the invariant on private names allow a pointer through the entries of the locations file, as D-362 does").

## Skill steps (the-way-record-invariant)
1. Read: SKILL.md, way_of_working.md, rules.md, template.md, decide_entry.md, draft.md, write.md, examples.md; D-362 whole; the invariant entry whole.
2. Decide entry: a change of an existing entry (same identifier). Searched the repo with git grep for the identifier: only D-362's Verification and the entry itself name it. No new entry, no split.
3. Draft: Method review (no cheap test), Part every, Derives from D-362, Rests on none, Violated no, all kept.
4. Write: edited with the editor tool; foundation_check run.

New sentence: "A file git tracks points to a place the author keeps outside the repository only by naming the entry `projects`, `tasks` or `task-rules` under `loop2` in the locations file `~/.the-way/locations.json`, and names no note, no folder of notes, no path on the author's disk and no file of the private repository of the old loop game."

## Checks
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 0 (0 errors)
- `python -B .the-way/elements/common/foundation_check.py`: exit 0 (0 errors)
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths`: exit 0, 443 files, 0 listed
- Product gate: not run, as instructed.

## Own-work check
Requirement most likely missed: the sentence must say the same as D-362 (exception for the three entries, plus bans on notes, folders, disk paths, private-repo files) and stay one sentence checkable by an agent. Check: compared word by word with D-362's both sentences. The exception names the three entries and the file; the four bans match. Task documents are covered by "no note". AGENTS.md's backlog lines (entry names only) comply.

## Choices
- Rejected an "except" clause attached to one flat prohibition: it reads as if a disk path or a private-repo file could be pointed to by entry name too. The chosen form separates the permitted pointer from the bans. Cost if wrong: none for the checks; wording only.
- "a task document included" dropped: a task document is a note the author keeps outside the repository, so "no note" covers it and the handoff asked for no task in the entry.

## Reaches beyond the dispatch
none

## Unread material
none

## Searches not found or unclear
none
