# Handoff — Slice 12

You are the executor of Slice 12 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `b8abf535193c8e387dc5ddf3b2e652fc5e4f3b94`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 12 — The instructions for the browser view: the page's class rule and a changed token value

- **Goal:** `src/browser/AGENTS.md` says two things right. (To do 6) The sentence on giving an
  element a class says that the class of an element of the kitchen-sink page has its rule in
  `src/browser/kitchen-sink/kitchen-sink.css`, not in `src/browser/styles.css`, which is copied to
  `dist/public` and reaches the players. (To do 7) The sentence on a value the token file does not
  hold covers a change of an existing value of the token file as well as a new value, as the rule
  "Every value with its source" of the styleguide, in the state Slice 11 left it, does. The file's
  other sentences stay, and it stays in English.
- **Change:** `src/browser/AGENTS.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:34-35` To do, items 6 and 7 ·
  `guidelines/styleguide-browser-view.md` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/decisions.md:913-926` D-43 · `foundations/decisions.md:943-956` D-45 ·
  `foundations/decisions.md:988-1001` D-48 · `foundations/invariants.md:459-467`
  browser-view-token-values · `foundations/invariants.md:489-497` design-token-sources
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`; `git diff --check`
  exits 0; the executor names the sentence of the styleguide and the file of the page's stylesheet
  that each new sentence rests on
- **Depends on:** Slice 11
Slice 11 is committed (b8abf53): read guidelines/styleguide-browser-view.md as it stands; the rule 'Every value with its source' now names the kind of source of --bar-width. src/browser/AGENTS.md stays in English.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-12-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
