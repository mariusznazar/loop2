# Fix report: Minor findings 1, 4 and 5

Saved by the orchestrator from the author's returned text: the author's own write to this path was
refused by its tool. The words below are the author's.

Status: done. Commit `842beb7` on `task/test-granic-czesci` (base `628bd1b`). Findings 1, 4 and 5 fixed only; 2 and 3 untouched. Nothing was pushed, and the whole `npm test` was not run.

**Finding 1: fixed, but not in the reviewer's suggested form.**
- In `foundations/invariants.md`, entry `cross-part-imports`, `Rests on: none` became `Rests on: TODO`.
- No environment fact was recorded. No official source for git's path-pattern matching was read in this session, and the WAY-80 rule forbids citing one from memory.
- The reviewer's form `TODO — <the fact>` does not pass `foundation_check.py`. It splits the field on `·` and `,` and rejects each item that is not an identifier ("is no identifier of a fact"). Two descriptive variants failed with exit 1.
- The bare word `TODO` is accepted, so it was used.
- What is missing: loop2 has no `git-path-patterns` fact, unlike the-way. It would need `the-way-record-environment-fact` and a read of the git documentation.

**Finding 4: fixed.** The extra blank line before `# --- controls` in `tests/invariants/test_cross_part_imports.py` was removed. It now has the usual two blank lines, and no run of four newlines remains in the file.

**Finding 5: fixed.** The test's docstring now quotes the entry word for word, including "of the importing file's part names the other part".

**Commands and exit codes** (from the worktree root):
- `python -B .the-way/elements/common/foundation_check.py`: 0 (earlier tries with a described TODO gave 1, twice)
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`: 0
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests scripts`: 0
- Not run: the whole `npm test`, and the Prettier/ESLint quality test (no JavaScript file was touched).

**Own-work check:**
- Requirement most likely unmet: the docstring quote differs from the entry text.
- Check: the docstring was read against `foundations/invariants.md:1241`.
- Result: the first rewrap lost the blank line after the quoted paragraph. It was restored before committing and confirmed by reading lines 1–8.

## Searches not found or unclear
- The checker accepts only a bare `TODO` in *Rests on*, while the invariants template shows `TODO — <the fact, with its source>`. The template and `foundation_check.py` disagree; I did not resolve that.
- The `git-path-patterns` fact for loop2 is still unwritten.
