# Slice 2 report — the container holds the scene's sprites

**Status:** done

## Commits (branch `task/scena-z-ludzikiem`, on top of `d3a04f3`)

- `a20acf5` test: :white_check_mark: check that the container serves each sprite file with its bytes
- `bd7216b` docs: :memo: claim the sprite invariant's test in the deployment part

## Files changed

- `tests/invariants/test_loop2_container_sprites.py` — new, +181 / −0. Model: `tests/invariants/test_loop2_container_icons.py`. The docstring reads E10 (`foundations/invariants.md:1211`) and the reading of the sentence; it says the case of Slice 3 ties the drawing's files to these files. The set is every file directly in `assets/sprites/` ending in `.png` (case-sensitive, as `scripts/static-files.mjs` copies it). An empty set fails. No Docker daemon means skip.
- `foundations/part_map.md` — +1 / −0. `deployment` *Files* gains `tests/invariants/test_loop2_container_sprites.py`, after the icons test line. Binding sentence and *Depends on* unchanged, so no entry follows from it (step 4.4).

## Checks

1. `npm test -- tests/invariants/test_loop2_container_sprites.py` — exit 0. `Ran 1 test … OK`, 77.46 s, Docker image built from the working tree and container started; the run that proved the test passes on the real image.
2. Failing run, local only (never committed): `EXPECTED_STATUS = 404` in the test, then `npm test -- tests/invariants/test_loop2_container_sprites.py` — exit 1, `FAILED (failures=8)`. Each of the 8 PNG files failed with `200 != 404 : GET /sprites/<file> in the container answers 200`. The expectation was then restored to `200`; the file is clean again (`git status` shows nothing).
3. Same test after the restore: `npm test -- tests/invariants/test_loop2_container_sprites.py` — exit 0, `Ran 1 test … OK` (5.58 s, image cached).
4. `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`, run after both commits. Before the test was committed the same command gave exit 1 (`pattern … matches no file git tracks`), as expected for an untracked file.
5. Not run: `npm test` without arguments (the gate; the orchestrator runs it, per the handoff).
6. Unchecked: ruff for the new Python file. `python -m ruff check --config ruff.toml --ignore-noqa …` exits 1 with `No module named ruff`; no ruff binary is on this machine. The gate's quality tests will check it. I committed before this check passed, so the orchestrator should look at it first.

## Own-work check (section 3)

- Requirement: the container serves every PNG in `assets/sprites/` at `/sprites/<file name>` with the file's bytes, and the check fails on an empty set.
- Check: check 1 (real image, real GET per file, byte comparison against the working tree) and check 2 (a wrong expectation must fail for each file). Check 1 passed; check 2 failed for the expected reason (status mismatch, not a missing module).
- The dockerignore, the Dockerfile's `COPY assets/sprites/` and `scripts/build.mjs` (`copySpriteFiles` into `dist/public/sprites/`) already carry the files; no change to them was needed.

## Choices made

- **Helpers copied, not imported.** The icons test's Docker helpers (`docker_answers`, `docker_run`, `node_in_container`, the two probes) are copied into the new file. Rejected: importing them from the icons test module (couples two invariant tests to one file's private helpers). Cost: about 80 duplicated lines. If a third container-serving test comes, move them into `tests/invariants/account_container_support.py` or `loop2_invariant_support.py` in one change.
- **Case-sensitive `.png` match.** Rejected: lowercasing like the icons test does, because the build copies only names ending in `.png` exactly. Cost: a file named `X.PNG` would be silently outside the check, as it is outside the build.

## Reach beyond the handoff (section 1)

- `.the-way/elements/common/way_of_working.md`, `.the-way/elements/part-map/skill/SKILL.md`, `write.md`, `decide_entry.md` — named by the project skill `the-way-update-part-map`, read for the part-map step.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md` — named by the dispatch; the handoff's `ui_check.md` skipped (no user interface changes).
- `scripts/build.mjs` — to confirm where sprites are copied.
- `tests/invariants/loop2_invariant_support.py` — imported by the icons test; read for `run`, `read_required`, `ROOT`.
- `foundations/decisions.md` D-271 (lines 5631–5663) and D-27 (648–683), read whole as the handoff names them; `guidelines/coding.md` and `guidelines/testing.md`, read whole as the handoff names them.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` and `scripts.md` — the user's global rules, read before the commits and before writing the test file. Neither changed the content.
- Not read: `.the-way/project-level/technology/reserved_choices.md` — no choice of language, framework, library, store or place was needed for this slice.

## Searches not found or unclear

- Ruff's installed version and location: not found on this machine (see check 6).
- Nothing else was looked for and missing. The sprite files `berry-bush.png`, `fire.png`, `forest-scene.png`, `login-backdrop.png`, `mage-idle.png`, `mage-run.png`, `moss.png`, `sticks.png` are in `assets/sprites/` as the handoff implies.

## Problems observed

- None in the product. The invariant holds on the current tree.
