# Handoff — review of the whole change (fresh reviewer, not the author)

You review: **the whole change**, with `the-way-review-change` (its `SKILL.md` is `.the-way/task-cycle/review/SKILL.md` in the worktree; read it whole and follow its section for the whole change, `whole_change.md`, when it says). You are read-only: change nothing in the worktree, commit nothing.

## Where and what

- Worktree: `the task's worktree root`, branch `task/raport-z-wyplata`.
- Range: base `2b4d760c517a8b399b2d9b80f77531455e32d11c` to head `1a4b79b8e5e99e39f13a1f78bd6b8a9944eb2a64` (4 commits: `a9a9b257` code and tests, `caf7bf39` foundation and styleguide, `be946654` bring the entries to the approved wording, `1a4b79b8` delete one D-246 rationale sentence). 19 files.
- Frozen task: `.runs/task-cycles/raport-z-wyplata/task.md` (read whole). No spec, no plan: one author without a plan. The task's *Settlements to record* rows 1 and 2, its *Decisions in play* and *Questions carried to cycle* are the criteria; check every item of *To do* (1–8), every settlement row and every carried projected entry (D-245, D-246, D-189) for coverage.
- Author's report (claims to verify, not evidence): `.runs/task-cycles/raport-z-wyplata/reports/author-report.md`.
- Report path for you: `.runs/task-cycles/raport-z-wyplata/reports/whole-review-report.md`; first line `PASS <sha>` or `FAIL <sha>`; sections **Unread material** and **Searches not found or unclear** as the method gives.

## Told to every code review of this cycle

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` (the saved game state arrives from the server). The change removes `AwayReportLine.practice`, bumps `SAVED_GAME_VERSION` 4 → 5 and reads the loop's `practice` and its run's `practice` as the waiting practice. Check crafted input at that boundary: documents with a missing, negative, non-integer or oversized value, or a line still holding the removed field, must be refused; no loadable state may pay more than the loop gathered.
- Irreversible operation: no.

## The author's choice you judge (an open design choice the cycle left to the author, SKILL step 4)

The state does not remember a payment: „Odbierz” (`takeLoopPractice` in `src/browser/sim/loop.ts`) pays the waiting practice (loop practice + the practice of the map run going on, none when that run ended in death) into the character's skills and empties both `loop.practice` and `loop.run.practice`. The alternative (a second field of what was paid) was rejected. Judge whether the choice meets the task's required outcome in every path: completion after „Odbierz”, „Zatrzymaj” after „Odbierz”, catch-up of a further absence, death with and without a resurrection ready, a loop run that ended in the same minute, a save and a reload, and whether emptying `loop.run.practice` breaks anything that reads a loop run's practice (the author says only `world-area.tsx:70` reads a run's practice and it reads the manual run).

## What the orchestrator carries into your review (gaps and risks)

- The author read the foundation selectively and wrote the entries D-189, D-245, D-246 (in the approved wording), D-241, D-207, D-39, D-44 and the styleguide. After a repair he read the rest of what the orchestrator named; the **search of the whole foundation** for entries that the change makes untrue (WAY-33), beyond the greps the author names, belongs to the return step, which comes after your review. You select your own foundation by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and may report an entry the change makes untrue; the return step corrects it.
- Fidelity of the three projected entries to the approved definition: the definition is in the author's private notes at `the approved project definition in the author's notes` (D-245 at line 1013, D-246 at 1028, D-189 at 1058, each to the next `####`). Reading outside the repository is yours (WAY-140). The author reports D-189, D-245 identical to it, and D-246 identical except a trailing-space artefact in *Rejected*. Verify, and report whether anything in the entries of the cycle is not held by the definition or by the task (source fidelity); the private path and note title never go into your report or into the repository.
- `guidelines/coding-browser-module.md` (section "Kontrolki w DOM i ich aktualizacja") still lists the button kinds `secondary`, `tab`, `main` without `positive`; the author left it (it is maintained through `the-way-maintain-coding-guidelines`). Judge whether leaving it contradicts a decision or guideline now and grade it; the orchestrator does not move findings between grades.
- No glossary entry for "practice waiting"; the author took it as ordinary English. Judge by WAY-95.
- The author's own-work check names, as the requirement most likely unmet: practice taken is paid once (completion and stop after „Odbierz”). Check it by the tests and by reading the code.
- Interface: the author inspected the report with „Odbierz” in a real browser (screenshots in the public screenshots repository, commit `4f7e1d512a4231b2495dd7c20f24833786515a18`, links in the author's report); the button's return when the loop gathers more was seen only in jsdom tests; the kitchen-sink page was not opened in a browser. Judge the rendered states from the styleguide and the code; code inspection alone does not establish rendered appearance, so say what you could and could not see.

## Checks

The full gate `npm test` is the orchestrator's; do not run it. You may run focused checks (each with its command and exit code in your report). The orchestrator's base gate at `2b4d760c`: exit 0, 542 tests, 0 foundation errors.
