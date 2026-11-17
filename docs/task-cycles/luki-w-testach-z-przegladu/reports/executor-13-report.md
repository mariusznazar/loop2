# Report of executor 13 — build-tools: the audit's unreadable report cited, and a fixed case of the import check

**Status:** done

## Commits (range starts at base `de7774b5b1ef7531561817c33180a27f54328c50`)

- `4377e4f36d26b1a8a2b4ee1790bc7a2a92a757f2` test: :white_check_mark: cite dependency-audit-refusal on the check of an unreadable report in test_audits_only_a_lockfile_changed_from_the_fork_point, seen failing with the audit reading an unreadable report as no advisory

## Files changed

- `tests/quality/test_audit_dependencies.py` +1 −0: the line `# invariant: dependency-audit-refusal` at the head of `test_audits_only_a_lockfile_changed_from_the_fork_point`, before its two existing `# decision:` lines.
- `tests/invariants/test_cross_part_imports.py`: not changed (see Choices).

## What the cited test checks

The third audit of the case (`self.assertEqual(self.audit(), 1)`) runs `scripts/audit_dependencies.py` in a fixture repository with no local npm. `node` then prints nothing to stdout, `json.loads('')` raises `ValueError`, and the script ends with exit 1. That is the refusal of an unreadable report of `dependency-audit-refusal` ("its report is unreadable"), run through the real script as a process.

## Checks (command, exit code)

Red run of the citation — `scripts/audit_dependencies.py` broken for a moment (`audit()` wrapping `advisories(json.loads(result.stdout))` in `try/except ValueError: return set()`, so an unreadable report counted as no advisory):

- `npm.cmd test -- tests/quality/test_audit_dependencies.py` → exit 1. Failure: `test_audits_only_a_lockfile_changed_from_the_fork_point`, line 60 `self.assertEqual(self.audit(), 1)`, `AssertionError: 0 != 1`; the other case of the file passed (`Ran 2 tests`, `FAILED (failures=1)`).
- Restore: `git checkout -- scripts/audit_dependencies.py`; `git diff --stat -- scripts` empty (exit 0), so the file is back byte for byte.

Green run after the restore, with the citation:

- `npm.cmd test -- tests/quality/test_audit_dependencies.py` → exit 0 (`Ran 2 tests`, `OK`).

Red run of the import check — `refusal` in `tests/invariants/test_cross_part_imports.py` broken for a moment (the last line `return f"the part {source} does not list the part {target} in Depends on"` replaced by `return None`, so a part's *Depends on* is never enforced):

- `npm.cmd test -- tests/invariants/test_cross_part_imports.py` → exit 1, `Ran 10 tests`, `FAILED (failures=5)`: `test_control_each_form_of_a_script_import_is_read_with_its_line`, `test_control_the_map_the_helpers_and_the_accepted_invariants_decide_what_passes`, `test_control_a_built_file_is_matched_to_its_source_and_its_part`, `test_control_a_python_import_is_read_from_the_code_and_the_directories_it_adds`, `test_control_a_directory_added_to_sys_path_is_written_out_of_the_file`. The check of the real repository (`test_every_import_of_the_repository_stays_within_the_part_map`) passed, as expected: the repository has no such import, which is why the fixed cases are needed.
- Restore: `git checkout -- tests/invariants/test_cross_part_imports.py`; `git diff --stat -- tests/invariants scripts` empty.

Green run after the restore:

- `npm.cmd test -- tests/invariants/test_cross_part_imports.py` → exit 0 (`Ran 10 tests`, `OK`).

Other checks:

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (run before the commit; the added `# invariant:` line is a citation).
- `git status --short -- scripts` → empty (exit 0). `git status --short` → empty after the commit.

Not run: the product's gate (`npm.cmd test` without a file) — the orchestrator's alone.

## Own-work check

- Requirement most likely not met: the slice asks that the unreadable-report check of the audit be *proved* by the test and not only labelled. The check: break the refusal in the script and see the cited case fail. It failed with `0 != 1` at the third audit (the case with no npm), so the cited assertion is the one that holds the refusal.
- Second requirement most likely not met: To do 15 / question 10 want a fixed case that gives the check an import of a part outside the part's *Depends on* and expects it reported. Check: break `refusal` so no dependency is ever refused and see which fixed cases fail. Five did (list above), so the fixed cases hold it.
- Mutation in the head: the audit reading an empty or unreadable report as no advisory — caught (red run above). The import check's `refusal` returning `None` for an unlisted part — caught by five cases. Not mutated: a request failure (`"error"` in a real npm report) is held by the other case of the file, `test_counts_each_advisory_of_low_or_higher_severity` (`advisories` raises on `{"message": …, "error": {}}`), which already cites `dependency-audit-refusal`.

## Choices

- **No new case in `tests/invariants/test_cross_part_imports.py`.** The slice says where an existing control case already does exactly that, the report names it and the slice cites it instead of adding one. Existing cases that give the check a made-up import from a file of one part into a file of a part its *Depends on* does not name, and expect it reported, each already citing `# invariant: cross-part-imports`:
  - `ReadingOfImports.test_control_each_form_of_a_script_import_is_read_with_its_line` (`tests/invariants/test_cross_part_imports.py:559`): nine imports from `tests/core/forms.test.mjs` into `src/view/…`, where the part `core` lists no part; it expects nine failures at lines 1–9 and the whole text of the first: `…(src/view/screen.tsx): the part core does not list the part view in Depends on`.
  - `ReadingOfImports.test_control_the_map_the_helpers_and_the_accepted_invariants_decide_what_passes` (`:639`): `backward` = `src/core/rules.ts` importing `../view/screen.js`, expecting one failure, none where the pair is accepted by an invariant, and one where only the opposite pair is accepted.
  - `test_control_a_built_file_is_matched_to_its_source_and_its_part` (`:603`) and `test_control_a_python_import_is_read_from_the_code_and_the_directories_it_adds` (`:680`) give the same refusal for a built file and for a Python import.
  Way rejected: adding a further case with the same made-up import — it would duplicate the first and add no protection (testing guidelines, "Testy bez dodatkowej ochrony"). Cost if wrong: if the orchestrator wants a case named for this alone, one small case is a follow-up; the red run above shows today's cases already fail for the break.
- **Marker only, no comment.** Testing guidelines: a comment that carries nothing for the code is not written; the marker is the citation.
- **Breaking `audit()` in the script (not the fixture copy).** The fixture copies `scripts/audit_dependencies.py` at `setUp`, so the break reaches the process the case runs.

## Mismatches of plan and code

- Line ranges of the entries shifted by one or ten lines (the handoff lists them); no content mismatch.

## Reaches beyond the handoff

- `Grep` for `^## (dependency-audit-refusal|cross-part-imports)$` in `foundations/invariants.md`, only to find the current lines (the handoff gave them; the read itself was of the ranges the handoff gave). No other reach.

## Working copies

None made. Evidence outputs of the runs stood in `.runs/executor-13-*.txt` of the worktree (ignored by git) and were removed before return.

**Unread material:** none. `guidelines/testing.md` and `guidelines/coding.md` read whole (testing.md in two pages); the entries dependency-audit-refusal, cross-part-imports, D-33, D-79, D-351, the part `build-tools` and `scripts/audit_dependencies.py` read whole. Of the part `test-helpers` (`foundations/part_map.md:190-198`) I did not read the passage — nothing in the slice touched a file of it. The task passages (`task.md:40`, `:47`, `:105-109`) I read as copied into the handoff, not from the file.

**Searches not found or unclear:** none.
