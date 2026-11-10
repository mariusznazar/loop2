# Handoff — Slice 5

You are the executor of Slice 5 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `60c799efb7722021af3c991efbcd5289c4a14ea8`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 5 — The tests say "restore" where a destroyed session or counter comes back

- **Goal:** the comment of `tests/http.test.mjs` that cites D-101 ("a delayed renewal cannot
  resurrect a destroyed session", near line 669) and the name of the case "deleting an active rule
  removes its count; adding its duplicate starts at zero and completion does not resurrect it" in
  `tests/sim/program-counts.test.mjs` say "restore" (question 4, answer A), as D-101 now does. Nothing
  else changes: no assertion, no other word; "resurrect" and "resurrection" stay where they mean the
  resurrection of a character. The executor shows with `grep -rnw` over `tests` and `src` that no
  other use of the word means a restored session or counter.
- **Change:** `tests/http.test.mjs` · `tests/sim/program-counts.test.mjs`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:70-70` To do, item 33 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:99-104` Questions to settle, question 4 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/decisions.md:1874-1885` D-101 ·
  `foundations/glossary.md:205-209` resurrection · `foundations/part_map.md:30-60` simulation ·
  `foundations/part_map.md:62-82` account-server
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/sim/program-counts.test.mjs` exits 0;
  `python -B scripts/test.py tests/http.test.mjs` exits 0; `git diff -U0` shows only the comment and
  the name of the case changed
- **Depends on:** D-101 (Foundation entries)
Slice 5 test commands: run .mjs files as 'npm test -- <file>' (the python form fails for .mjs outside npm run).

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-5-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
