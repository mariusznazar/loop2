# Author report — lokalizacje-poza-repozytorium

**Status:** done with concerns. Items 1-6 and both settlements are made and committed; item 7 is NOT met: the new test is red because of 12 hits of the pinned check on the class `[:space:]` between double brackets in Markdown, which the orchestrator told me to leave. The test is red on the branch; the cycle did not hide it, and the choice goes to the human (the blocked draft request).

## Commits (base `211a4ea`)

- `a71321b` docs: D-362 (row 1), invariant `tracked-file-private-paths` (row 2), D-82 and the *Derives from* of `action-duration-minimum` without a path
- `e11b8da` test: `tests/agent_workflow/test_tracked_file_private_paths.py`
- `f6d19ce` docs: `AGENTS.md` backlog lines, `guidelines/testing.md`, comment in `tests/view/scene-picture.test.mjs`
- `a4b9197` docs: docstring of `shell_path` in `tests/deploy/deploy_script_support.py` without the Git Bash path (orchestrator's answer 1)

## Files changed (added / removed lines)

- `AGENTS.md` 3 / 3
- `foundations/decisions.md` 16 / 1 (D-362 added; D-82 binding sentence edited)
- `foundations/invariants.md` 11 / 1 (new entry; *Derives from* of `action-duration-minimum`)
- `guidelines/testing.md` 4 / 4
- `tests/view/scene-picture.test.mjs` 2 / 2
- `tests/deploy/deploy_script_support.py` 1 / 1 (docstring only, no behaviour change)
- `tests/agent_workflow/test_tracked_file_private_paths.py` 22 / 0 (new)

Foundation entries (marks per foundation step):

- D-362, `row 1`. English: loop2 names a place on the author's disk outside the repository by the entries `projects` and `tasks` under `loop2` in the locations file, no tracked file holds an absolute path on that disk, and a file may name a note and its folder within the notes. Polish: loop2 wskazuje miejsca na dysku autora poza repozytorium pozycjami `projects` i `tasks` pod `loop2` w pliku lokalizacji, żaden plik śledzony nie ma ścieżki bezwzględnej, a plik może nazwać notatkę i jej katalog w notatkach. Scope lists all eight parts (a decision cannot take `every`). *Rejected* holds the three ways not chosen from questions 1 and 2 of the task. *Origin* names `zadanie_loop2_lokalizacje_poza_repozytorium.md`, taken from the cycle record.
- `tracked-file-private-paths`, `row 2`. English: no tracked file holds an absolute path or, in a Markdown file, a note link, as the pinned the-way's check reads them. Polish: żaden plik śledzony nie zawiera ścieżki bezwzględnej ani, w pliku Markdown, linku do notatki w rozumieniu sprawdzenia przypiętego the-way. Method `test`, Part `every`, *Derives from* D-362. The sentence has no backticked text, so the check skips no file.
- D-82: sense unchanged; the path replaced by "the folder that the entry `projects` under `loop2` in the locations file names".
- Part map: no change; the test file lies under `tests/agent_workflow/**` of `agent-workflow`.

## The red test, stated plainly

The invariant's test fails after my last commit (`a4b9197`) on 12 hits of the pinned check (`e3825a8`), all of the kind `note link: the class `[:space:]` between double brackets`, the POSIX character class of `grep -E` patterns inside a documented shell command. A hit is printed twice per line, so six lines:

- `.claude/skills/loop2-deploy/references/backup_and_restore.md:211` and `:224`
- `.agents/skills/loop2-deploy/references/backup_and_restore.md:211` and `:224` (identical copy)
- `foundations/environment_facts.md:39` and `:52`

None is a path or a note link. The pinned check lists a `[[...]]` holding a letter in every Markdown file, so the class `[:space:]` between double brackets matches. Per the orchestrator's answer 2, I left these files untouched (they mirror a block of `deploy/loop2-deploy`, and the fact quotes it word for word) and added no exception; the invariant sentence names no file. The nine paths of the task and the the Git Bash form of a drive path docstring are gone, so these 12 are the only remaining hits. The test is red because of them, and the cycle did not hide it.

## Checks (command, exit code)

Failing run of the invariant's test, state before items 1-6 (clean checkout of the base `211a4ea` in a scratch worktree under `.runs/`, with only the invariant entry and the test file added, removed afterwards; no tracked file of the task worktree touched):

- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` (cwd that checkout) -> exit 1, `checked: 435 files, 22 listed`: the nine paths of the task (`AGENTS.md:3-5`, `foundations/decisions.md:1548`, `foundations/invariants.md:955`, `guidelines/testing.md:91,93,94`, `tests/view/scene-picture.test.mjs:34`), the the Git Bash form of a drive path docstring at `tests/deploy/deploy_script_support.py:130`, and the 12 the class `[:space:]` between double brackets hits.
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` (same checkout, with `task-cycle/` of the pin copied into `.the-way/`) -> exit 1, `FAILED (failures=1)`, 22 listed.

Run after the last commit (`a4b9197`), in the task worktree:

- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 1, `checked: 435 files, 12 listed`: only the 12 hits above.
- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> exit 1, `FAILED (failures=1)` (the 12 hits). NOT a pass.
- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, 0 errors (with test citations, on the committed tree).
- `python -B scripts/test.py tests/deploy/test_loop2_backup.py` -> exit 0, 26 tests OK (the user of `shell_path`, after the docstring change).

Not run: `npm test` (the orchestrator's step); an earlier start of `.the-way/gate/run_tests.py` was stopped after 3 minutes because the handoff reserves the full gate. The base's failing `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools missing) are not mine and were not run.

## Own-work check (section 3)

Requirement most likely unmet: item 7, "after items 1-6 the new test passes". Check: the command and the test file after each stage. Showed: before the edits exit 1 with 22 hits; after the edits and the docstring fix exit 1 with 12 hits, all the class `[:space:]` between double brackets in Markdown. The requirement is unmet; the cause is verified by reading the hits and `NOTE_LINK` in `.the-way/task-cycle/private_paths_check.py`.

A mutation I considered: the test would pass for any repository if the command returned 0 on an unknown invariant; it returns 2 with `Error:`, and the test asserts 0, so a mistyped identifier fails too.

## Choices made

- Backlog lines: two lines (Projects, Tasks) each with the ask-the-human clause, modelled on the Backlog of the-way's `AGENTS.md`; I did not claim that `_zadania` lies beside the tasks file, which the task does not say. Rejected: one shared clause (a line is read alone by `backlog_place.md`). Cost if wrong: a wording change.
- Invariant sentence says "as the check of tracked files in the pinned the-way reads them" instead of the-way's decision numbers, because a decision of the-way is no entry of this log. Rejected: copying the-way's sentence with WAY-309 and WAY-323.
- *Derives from* of `action-duration-minimum` reads `wprawa_i_drzewa_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania) § Settlements to record, row 7 - "..."; read 2026-10-29`, the form of the *Origin* fields; the passage and the date are unchanged.
- Scene test comment: "src/components/probe/Scene.tsx of the old Loop repository, lines 44-58 at cdc7c0d".
- D-362 carries a pair of examples next to the invariant, because the invariant does not check that a pointer is by entry.
- Docstring of `shell_path`: "A path as Git's bash writes it: on Windows, the drive letter in lower case as the first directory." Rejected: dropping the docstring (loses the explanation).

## Reaches beyond the dispatch

- `elements/decisions/template.md`, `skill/read.md`, `skill/decide_entry.md`, `elements/invariants/template.md`, `skill/draft.md`, `skill/write.md`, `elements/common/rules.md`, `way_of_working.md`, `skill/SKILL.md` of both elements: read through the two record skills, as they require.
- `foundations/part_map.md` entries `agent-workflow` and `product-foundation` (the test needs no line); `.the-way/task-cycle/private_paths_check.py` (first 80 lines) for what a path and a link are; `.the-way/foundations/invariants.md` `tracked-file-private-paths` as the model sentence; the cycle record `.runs/task-cycles/lokalizacje-poza-repozytorium/cycle.md` (first 40 lines) for the note's file name; `the author's rules for git in his agent instructions` before the commits; `tests/deploy/deploy_script_support.py` around line 130 and its users in `tests/deploy/backup_script_support.py`.

## Unread material

- Decisions whose *Scope* names `agent-workflow` or `product-foundation`: D-82, D-13 and the new D-362 read whole; the others not read, nor the glossary, because the change sets no new meaning and my search of the foundation for `locations`, `absolute path` and `public repo` found no neighbour.
- `.the-way/task-cycle/private_paths_check.py`: first 80 lines only.
- The vault: the task note was not opened (the frozen copy was read whole).

## Searches not found or unclear

- The name of the task note for *Origin* is in the cycle record only; I did not open the vault to confirm it.
- The task expected the-way's correction (question 3) to leave no false hits; the pinned commit still lists the class `[:space:]` between double brackets in Markdown. Those 12 hits entered `main` on 2026-11-11, after the 2026-11-09 trial the task rests on (the orchestrator's account; I did not verify the dates).
