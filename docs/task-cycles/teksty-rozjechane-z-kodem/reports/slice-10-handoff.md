# Handoff — Slice 10

You are the executor of Slice 10 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `af823e087545d72a8fdea5b8f299c2d2b0e5f1a9`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 10 — The coding guidelines: sender, account policy, browser modules, recording a failure

- **Goal:** four files of the coding guidelines, written through the project skill
  `the-way-maintain-coding-guidelines` as the cycle's author writes them (its `SKILL.md` and
  `template.md` in *Read*), match the code: (To do 11) `guidelines/coding-mail-sending.md` says the
  sender's address comes from the settings (`from` in `src/server/account-mail.ts`) while the display
  name, the subject and the text are fixed in the sending file; (To do 12) the *Good* example of
  the rule on reserving an attempt in `guidelines/coding-account-policy.md` speaks also of
  the registration, where the password is hashed and not checked; (To do 13) the list of releases
  of an attempt in the same file names every case the code releases, the blocked login and the login a
  reset overtook included (`ticket.release()` in `src/server/account-routes.ts`); (To do 14) the
  statuses of `src/browser/view/email-status.ts` and `src/browser/view/character-skills.ts` in the
  table of `guidelines/coding-browser-module.md` say what the files are today, pure functions that
  build no DOM — the status the table gives its other pure modules, the executor choosing from
  the table and the template and naming the choice; (To do 37) the rule "Recording a failure" of
  `guidelines/coding.md` says, as the entry written for Settlement row 1 says, that what
  `account-database-check` and `measure-passwords` print on failure is no log line but a message to
  whoever ran them, so it keeps the error's text and no JSON line, with the rule's existing sentence
  about the service commands left true. No code and no foundation entry changes in this slice.
- **Change:** `guidelines/coding.md` · `guidelines/coding-mail-sending.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-browser-module.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:42-45` To do, items 11 to 14 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:74-74` To do, item 37 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:114-119` Questions to settle, question 7 ·
  `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:171-171` Settlements to record, row 1 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `src/server/account-mail.ts` ·
  `src/server/account-policy.ts` · `src/server/account-routes.ts:700-830` the registration and the
  login routes · `src/server/account-database-check.ts` · `src/server/measure-passwords.ts:360-389`
  the report written at a failure · `src/browser/view/email-status.ts` ·
  `src/browser/view/character-skills.ts` · `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/decisions.md:2954-2967` D-158 · `foundations/decisions.md:4329-4355` D-227 ·
  `foundations/decisions.md:2083-2096` D-116 · `foundations/decisions.md:1887-1900` D-102 ·
  `foundations/decisions.md:1902-1915` D-103 · `foundations/decisions.md:4287-4327` D-226 ·
  `foundations/decisions.md:808-821` D-36 · `foundations/decisions.md:5120-5154` D-252 ·
  `foundations/decisions.md:5156-5199` D-253 · `foundations/decisions.md:7927-7951` D-354
- **Model:** same — five corrections across four files, each to be judged against code
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 with `0 errors`
  (it checks the guidelines' form); `git diff --check` exits 0; the executor names for each of To do
  11 to 14 the line of code it read to confirm the sentence
- **Depends on:** Settlement row 1 (Foundation entries)
D-252 was edited in place by the foundation step (commit 6c31f59): read its current text whole; it is the source of the rule 'Recording a failure' for the two commands. D-354 stays as it is.

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-10-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
