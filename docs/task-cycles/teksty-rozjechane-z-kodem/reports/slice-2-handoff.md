# Handoff — Slice 2

You are the executor of Slice 2 of a the-way task cycle. Work only in the worktree `the task's worktree` (branch `task/teksty-rozjechane-z-kodem`). The person who requested the cycle (Mariusz) delegated intermediate choices to the orchestrator, which answers your questions; you never seek the human, and the orchestrator's answers are not the human's approval.

**Method.** Read `.the-way/task-cycle/change/SKILL.md` whole (the method `make-change`), in its variant "a slice, or the retry of a slice"; read a file it names (such as `.the-way/task-cycle/change/slice.md`) when the step that names it comes. Stage and boundary: make the change of this slice only, commit it on the task branch (`git add` by path, English commit messages in the style of `git log`), run the focused checks of the slice, and return. You run no gate (`npm test` whole); the orchestrator does. Your slice base is `2a85b42aad274a52b3aea261abd200310941104d`; your range runs from it.

**Frozen task.** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md`. **Plan.** `docs/task-cycles/teksty-rozjechane-z-kodem/plan.md`. No spec.

**Answers of step 4.** Trust boundary: yes for the change as a whole (`src/server/**` and `package-lock.json`); a slice that touches those says so below in its *Risk*. Irreversible operation: no. Open design choice: none.

**What has moved since the plan was written.** The plan's line ranges were read at `adbec4b`. The foundation step has since edited `foundations/decisions.md`, `foundations/glossary.md` and `foundations/environment_facts.md` (commits `6c31f59`..`3fcf546`) and earlier slices may have changed other files. Find a foundation entry of *Read* by its identifier heading (`### D-nn`, `## <fact-id>`), a passage of the task by its heading, and a range of code again by its text; where a range differs from the plan's, the current one holds. Read the whole entry, whatever the range says. The guideline files named in *Read* are read whole.

**Your slice, copied from `plan.md` word for word:**

### Slice 2 — README: the browser check and the build point

- **Goal:** two texts of `README.md` say what the code does. (a) The paragraph "W przeglądarce, po
  `npm run local` …" (line 76 at the task's source commit): "z stopką" reads "ze stopką"; the screen
  reached by "Mapy", the row "Las" and "Wejdź" is named as the game names it today, the screen
  Przejście (D-280), not "ekran przebiegu mapy"; the "panel terenu z listą kafelków", which PR #58
  removed, is no longer named, and the sentence says only what the screen shows today, read from the
  code named in *Read*; the sentence has a predicate. (b) The first point of the build list
  ("`npm run build` — …", line 25): the sentence about the graphics of Anokolisa stands once, not
  twice, with the facts the foundation holds about the pack's terms unchanged and none added; the
  three matters it joins — what the build writes, where the sprites come from, and that
  `npm run kitchen-sink` copies no sprites — become separate points of the list. Polish stays.
- **Change:** `README.md`
- **Read:** `docs/task-cycles/teksty-rozjechane-z-kodem/task.md:27-28` To do, items 2 and 3 ·
  `foundations/part_map.md:84-116` build-tools · `foundations/decisions.md:5937-5985` D-280 ·
  `foundations/decisions.md:6713-6784` D-311 · `foundations/decisions.md:7666-7690` D-346 ·
  `foundations/decisions.md:5675-5706` D-271 · `foundations/environment_facts.md:604-608`
  pixel-crawler-terms · `foundations/glossary.md:87-91` headquarters ·
  `src/browser/view/run-screen.tsx` · `src/browser/view/run-header.tsx` ·
  `src/browser/view/right-area.tsx` · `src/browser/view/footer.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** no test reads the README; `git diff --check -- README.md` exits 0; the executor reads
  each claim of the changed paragraph against the file of *Read* that shows it and names that file
  in the report
- **Depends on:** Slice 1

**Report.** Write the full report to `docs/task-cycles/teksty-rozjechane-z-kodem/reports/slice-2-report.md` as `make-change` gives it, with: the checks you ran (each with command and exit code), your own-work check, **Unread material** (what your *Read* names that you left unread or read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and any reach beyond this handoff (a file or guideline you had to read that *Read* did not name). Return: status (`done`, `done with concerns`, `questions`, `returned`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, and your questions and concerns.
