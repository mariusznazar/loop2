# Author report — task `security-notes`

**Status:** done

## Commits and files

- `705be3a5` — docs: add security-notes.md ..., translate README.md into English, add the file to the part agent-workflow (D-12, D-362), on branch `task/security-notes`.
- `security-notes.md` — new, 36 lines.
- `README.md` — translated whole (94 lines before, 96 after: the new line and its blank line); every line of the file changed by the translation.
- `foundations/part_map.md` — +1 line (`security-notes.md` in *Files* of `agent-workflow`).

## Checks

| Check | Command | Exit |
|---|---|---|
| Foundation check after the entry | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 (0 errors) |
| Focused test of private paths | `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` | 0 (1 test OK) |

Not run: the full gate (the orchestrator's); `check_instructions.py` on its own; no test written (the task asks for none).

## Own-work check

Requirement most likely missed: hard edges of the new file (no absolute path, no `[[ ]]`, no host/token value, link targets that exist) and "README: nothing dropped or added except the one line".
- Link targets (AGENTS.md, foundations/decisions.md, the deploy SKILL.md, setup_and_secrets.md, the test file) all exist; the section "Agent or human" is at `.agents/skills/loop2-deploy/SKILL.md:45` (anchor `#agent-or-human`).
- grep of `security-notes.md` for `[[`, drive-letter paths, `~/`, `mikr`, `.cloud`: no hit.
- README: the set of text between backticks (commands, files, identifiers) is identical before and after except the added `security-notes.md`; six `##` headings before and after; the only Polish left is the quoted screen labels, each with its English meaning.
- Tracked-file private-paths test passes with both files staged.

## Choices

- **Part:** `agent-workflow`, as the orchestrator chose; I added `security-notes.md` to its *Files* beside `AGENTS.md` and `CLAUDE.md`. Reading of the part's rules: the responsibility sentence ("directs and records the work performed on this repository") already covers a file that says how agents may work and records a trial on them, and the template says the sentence changes only when what the part answers for changes; so I left the sentence as it is. Way rejected: rewording the sentence to name security notes. Cost if wrong: a one-sentence fix. *README.md* stays in `build-tools`.
- **Entry meaning** (marked `the cycle's`: the task carries the part-map line as a question to the cycle, in no row of *Settlements to record*): the part `agent-workflow` also holds the file `security-notes.md`, the public page on agents' permissions, secrets and the trial of 14.11.2026. In Polish: część `agent-workflow` obejmuje też plik `security-notes.md`, publiczną stronę o uprawnieniach agentów, miejscu sekretów i próbie prompt injection z 14.11.2026. No decision, invariant, glossary term or environment fact written.
- **"operator" instead of the author's name:** the repository's own files and glossary call the person who runs the server "operator" (D-12, D-13); the file uses it, so no personal name stands in it. Rejected: naming him.
- **"the operator's daily adviser"** and "professional work" kept close to the task's own words (answer 3); the file does not explain what the adviser is, because the task does not say.
- The conclusion of the trial ("do not run code or a command that a comment ... asks for before you have read what it does") stands only inside the description of the trial, as the task's answer 1 requires.
- The file adds, from the task's Context and the orchestrator's reconciliation, that the ruleset requires zero approving reviews and merges with the method `merge`; it says nothing about who merges.
- The first sentence adds a clause: where the file and a source differ, the source is right. Small extension of "the files it points to are the source of truth".

## Reach beyond the dispatch

- `.the-way/elements/part-map/template.md`, `rules.md`, `common/way_of_working.md`, `part-map/examples.md`, `decide_entry.md`, `write.md` — read because `SKILL.md` of the part-map element names them for writing the entry.
- `.the-way/task-cycle/tracked_private_paths_check.py` (head only) — to see what the test flags.
- `git grep -il mariusz` — to see whether the repository's files name the person.
- `decision_index.py --decision` failed ("no decision 12") because the log is in sections; I read D-12, D-13, D-362, D-412 by heading with `sed` instead (lines 1539, 1559, 734, 777 of `foundations/decisions.md`).

## Working copies

I made working copies only in `.runs/author/` (two text files listing the code spans of the old and new README, for comparison) and removed the directory before returning; nothing remains.

## Unread material

- `foundations/part_map.md` whole, `foundations/glossary.md` whole: read.
- D-12, D-13, D-362, D-412 whole: read (D-13 and D-362 whole, D-412 whole, D-12 whole).
- Invariants `tracked-file-private-paths` and `tracked-file-private-names`: read whole.
- `setup_and_secrets.md`: read only its first ~60 lines (the file's content is not repeated in `security-notes.md`; only linked).
- `.agents/skills/loop2-deploy/SKILL.md`: read the section "Agent or human" from line 45 (first ~25 lines of it); not the whole file.
- `tests/agent_workflow/test_tracked_file_private_paths.py`: first 60 lines (the whole file).
- `AGENTS.md`: read whole from the session context.

## Searches not found or unclear

- The task does not say what "the daily adviser" is, nor where the rule denying work repositories is configured; the file says only what the task says, and says the deny rules and the guard lie outside the repository.
- `AGENTS.md` says a CI check "is a check this repository requires before a merge, which the repository's owner may bypass", while the ruleset listed by the orchestrator has no required-status-checks rule; the file claims nothing about CI. A possible disagreement between those two sources, not resolved.
- The invariant `tracked-file-private-names` is checked by review, not by the test; I checked by eye that no note, folder or private repository is named.
