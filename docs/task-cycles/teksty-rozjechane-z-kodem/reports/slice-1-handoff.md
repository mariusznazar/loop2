# Handoff — Slice 1

You are the executor of Slice 1 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `3fcf546ee51ec286290108ef67cda05b05cf5927`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 1 — The Node.js range in README, package.json and the lockfile

- **Goal:** the requirement is Node.js 24.15.0 or newer within line 24, written `^24.15.0`, in three
  places: the sentence "Wymagania: …" of `README.md` (line 5, kept in Polish and naming the floor
  where it now says "24.x"), `engines.node` of `package.json` and `engines.node` of the root entry
  (`packages[""]`) of `package-lock.json`. The README may give the reason (the pinned npm and jsdom
  declare that floor) only after the lockfile shows it; it states no reason it cannot find there.
  Nothing else of the lockfile changes: no regeneration, no new resolution, one line differs.
- **Change:** `README.md` · `package.json` · `package-lock.json`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:26-26` To do, item 1 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:83-87` Questions to settle, question 1 ·
  `guidelines/coding.md` · `foundations/part_map.md:84-116` build-tools ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:765-776` D-33 ·
  `foundations/invariants.md:5-13` account-server-runtime ·
  `foundations/invariants.md:449-457` introduced-npm-vulnerabilities ·
  `foundations/invariants.md:549-557` dependency-audit-refusal ·
  `tests/invariants/test_account_server_runtime.py`
- **Model:** cheaper
- **Risk:** trust boundary — `package-lock.json` (build-tools)
- **Checks:** `python -B scripts/test.py tests/invariants/test_account_server_runtime.py` exits 0 (a
  regression check: the invariant reads the major version 24 from the range and passed before);
  `git diff --stat -- package-lock.json` shows one line changed; `python -B scripts/audit_dependencies.py`
  exits 0 (the lockfile now differs from the fork point, so it asks the npm registry; without
  network report it unchecked, never passed)
- **Depends on:** none

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-1-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
