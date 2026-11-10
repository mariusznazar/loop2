# Handoff — Slice 6

You are the executor of Slice 6 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `75d994308f0f2d26ebf6bcefbaadaddf61eae26f`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 6 — The description of the sprites check names the case that ties the files to the drawing

- **Goal:** the docstring of `tests/invariants/test_loop2_container_sprites.py` (its lines 12 and
  13) points to the case "every file the scene's data names stands directly in assets/sprites/ as a
  .png file" of `tests/view/scene-picture.test.mjs` as the one that ties the files the scene's
  drawing asks for to the files this check reads, instead of "the case of Slice 3 of task
  `scena-z-ludzikiem`", which stands only in the ignored `.runs/`. No code, no other word of the
  docstring changes.
- **Change:** `tests/invariants/test_loop2_container_sprites.py`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:36-36` To do, item 8 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:143-173` deployment ·
  `foundations/invariants.md:1209-1217` loop2-container-sprites ·
  `tests/view/scene-picture.test.mjs:449-470` the case that checks the scene's files
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B -m py_compile tests/invariants/test_loop2_container_sprites.py` exits 0;
  `python -B scripts/test.py tests/quality/test_quality_invariants.py` exits 0 (ruff and prettier see
  the file; it needs `.runs/quality-venv`); the case the docstring names is found in
  `tests/view/scene-picture.test.mjs` under that exact name
- **Depends on:** none

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-6-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
