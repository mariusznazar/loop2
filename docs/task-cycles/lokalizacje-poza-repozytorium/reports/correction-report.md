# Correction report — lokalizacje-poza-repozytorium

**Status:** done with concerns (one open item for the human: the fact `cross-part-imports` rests on).

Range: `8c7fe66..b58ce12`. The pin of `.the-way` is at `52f8164a354ee1a704af0d58add2f3be8e4f0247` (`git -C .the-way rev-parse HEAD`), moved by the orchestrator in `8c7fe66`; I did not touch it.

## The human's remarks, as made

The remarks bind: make the fix the blocking finding called for — the pin holds the fixed check — and take off the marking of the temporary state.
- Marking taken off: `tests/agent_workflow/test_tracked_file_private_paths.py` is a plain test again (the `@unittest.expectedFailure` line and the 2-line comment over it are gone; `timeout=30` kept).
- `Violated: yes` -> `no` on `tracked-file-private-paths`, through `the-way-record-invariant`. The skill's rule for an invariant that stops being violated (template "Violated": the change in which the test starts to pass removes the marking and turns *Violated* to `no`) is met by the two commits together. The sentence is unchanged; its *Derives from* is unchanged and still true against the new pin: I read `.the-way/installation/README.md` lines 78-79 at `52f8164` and the quoted passage ("that no file git tracks holds an absolute path on the author's disk or, in a Markdown file, a link to a private note") is intact. This change clears *Violated*, so the request names it.
- The error the pin brought: `foundations/invariants.md:1244` *Rests on* of `cross-part-imports` was a bare `TODO`; the new `foundation_check.py` wants `TODO — <the fact, with its source>`.

## Commits

- `50e7a57` docs: `foundations/invariants.md` — `tracked-file-private-paths` *Violated* `no`; `cross-part-imports` *Rests on* rewritten
- `b58ce12` test: `tests/agent_workflow/test_tracked_file_private_paths.py` — marking and its comment removed

Files: `foundations/invariants.md` 2 / 2, `tests/agent_workflow/test_tracked_file_private_paths.py` 0 / 3.

## Choice (the orchestrator's, entered as the choice it is)

*Rests on* of `cross-part-imports` now reads: `TODO — the fact is not named in the foundation (a bare TODO since 2026-11-08, commit 842beb7); the human names the fact and its source`. This is the orchestrator's wording, shortened to fit the form `TODO — <the fact, with its source>`; I invented no fact. I checked the history it states: `git log -S"Rests on:** TODO"` gives `842beb7` dated 2026-11-08, and that commit's entry has a bare `TODO` there. The line is not mine to complete: the human is to name the fact (and its source), which stays open. Cost if wrong: none for the code; the entry stays honest about what is missing.

## Checks (command, exit code)

- `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` -> exit 0, `Ran 1 test`, `OK` (plain pass, no expected failures).
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, `checked: 435 files, 0 listed`.
- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, `0 errors` (before my edits: exit 1, 1 error, `foundations/invariants.md:1244`).
- Not run: `npm test` (the orchestrator's gate); the base's `test_ruff_source_rules` and `test_shellcheck_source_rules` (tools not installed).

## Own-work check

Requirement most likely unmet: that nothing else the pin brought is left, and that the entry and the test tell the same truth. Check: the three focused commands above after the edits, and a search for another `Violated: yes` and for the marking. Showed: all three exit 0; `grep "Violated:\*\* yes" foundations/invariants.md` finds nothing; no `expectedFailure` is left in `tests/agent_workflow/test_tracked_file_private_paths.py`. The check that the test can fail stays as seen earlier: the same command exited 1 on the base state with 22 hits (`reports/author-report.md`), and on the head before the pin move with 12.

## Concerns

- The fact `cross-part-imports` rests on is still unnamed: its entry carries an honest `TODO` and the main branch holds it (the rules allow `TODO` in *Rests on* in that form), but the human has to name the fact and its source; the request should put it as an open point. It is work the pin brought, not a failing of this change.
- Nothing else differs: the focused checks show no other difference from the pin move.

## Reaches beyond the dispatch

None. Read: `reports/correction-handoff.md`; `foundations/invariants.md` entries `cross-part-imports` and `tracked-file-private-paths` whole; `.the-way/elements/invariants/template.md` and `.the-way/elements/common/rules.md` by `TODO` and "Violated" (passages, via grep, with the form lines read whole).

## Unread material

- `.the-way/task-cycle/change/SKILL.md`: not re-read for this correction (read whole earlier in this cycle).
- `.the-way/elements/invariants/template.md` and `elements/common/rules.md`: the sections on `Violated` and `TODO` read, the rest not re-read (read whole earlier in this cycle).
- `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`, D-362 and the earlier reports: not re-read; nothing in the correction touches them beyond what is stated above.

## Searches not found or unclear

- The fact that `cross-part-imports` rests on: the orchestrator says it is named nowhere in the foundation. My own search was only a grep of the headings of `foundations/environment_facts.md` for "import", "module" and "resolution", which found one heading, `browser-bare-import-resolution` (line 738); I did not read it whole and I do not claim it is or is not the fact. I did not guess one. The human (or a reader of that fact) can say.
- None other.
