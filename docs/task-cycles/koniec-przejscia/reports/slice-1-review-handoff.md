# Handoff — review of slice 1 of the task koniec-przejscia

You review one range of commits as an agent that did not make it. Read-only: change nothing in the worktree ``, its index or branch; run checks that need files changed in a separate worktree of the head commit under `.runs/` of that worktree (ignored), and remove it afterwards. Never touch the main checkout `a repository on the author's disk`. Do the whole review yourself.

## Method

Read whole `.the-way/task-cycle/review/SKILL.md` and follow it (this is the review of a slice, not of the whole change and not of a fix). Read a file it names only when the step that names it comes.

## What is reviewed

- Slice 1 of the plan: "A manual map run keeps its record of the end, and the save is version 4".
- Range: base `211a4ea556d48f5da98fc08380b3c061b9365709` to head `d7ac8a9` (confirm `git rev-parse HEAD` is `d7ac8a9`; the full sha is `git rev-parse d7ac8a9`). The range starts at the base of the plan's *Foundation entries*, so it holds the foundation entries (commits `e0fd091` and `c730482`, file `foundations/decisions.md`), the code of the slice (commit `41abf1f`) and the repair of two view test files (commit `d7ac8a9`). Compute the diff yourself: `git diff 211a4ea..d7ac8a9` and `git log 211a4ea..d7ac8a9`.
- Report path: `docs/task-cycles/koniec-przejscia/reports/slice-1-review-report.md` (first line `PASS <head sha>` or `FAIL <head sha>`).

## Answers of the cycle's start (told to every review)

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` is a trust boundary of the part `simulation` (part map). The change raises the version of the save from 3 to 4 and adds strict reading of three new fields of a manual map run. Check crafted input at that boundary: a saved game state of version 4 with missing, mistyped, foreign or out-of-range new fields, a key outside the closed list, a sum that is not `minute`, a `longestStreak` outside its bounds, a repeated or unknown item in `enteredWith`, a combat action as the activity going on; one of version 3 (refused whole as another version, D-206).
- Irreversible operation: no.
- Checks failing on the base: `tests/account-mail.test.mjs:350` (a timing-dependent test, failed in one whole run and passes alone); two tests of `tests/quality` that failed only for a missing `.runs/quality-venv` in the new worktree (present now). Do not run the gate.

## What you get

The task passages, the slice's section of the plan and the current ranges of the foundation entries the executor read are in `docs/task-cycles/koniec-przejscia/reports/slice-1-handoff.md`, under its headings "Your slice, copied word for word from the plan", "Current ranges of the foundation entries named in *Read*" and "Passages of the task named in *Read*, copied word for word" — judge the slice against those passages, not against the plan alone. Read each foundation entry named there whole (the entries are read at their current ranges; the plan's "row (new)" is D-362). Read whole the guideline files `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md` and `guidelines/testing.md` (the executor's selection) and compare the change with each rule of them that has no invariant and that the change reaches.

The foundation entries the range writes (D-362 new; D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313 changed) are judged against the task's rows 1–7 of *Settlements to record* and the projected entries quoted in the task's *Decisions in play*: read the foundation writer's report `docs/task-cycles/koniec-przejscia/reports/foundation-report.md` as a set of claims to verify, and do they say what the code does (the code of this slice and, for sentences about the window and the screen, the code the later slices of the plan will write: judge those sentences against the task, not against code that does not exist yet).

The executor's report, as claims to verify, not evidence: `docs/task-cycles/koniec-przejscia/reports/slice-1-report.md` (with its amendment after the mechanical check).

## Information from the mechanical check (not findings; judge them)

- Files changed beyond the slice's *Change* list: `tests/sim/encounters.test.mjs`, `tests/sim/skills.test.mjs`, `stryker.config.json` (each named in the executor's reaches as needed by a check of the slice), and `tests/view/account-screen.test.mjs`, `tests/view/trip.test.mjs` (commit `d7ac8a9`, authorized by the orchestrator: they broke on the version bump and the new record).
- The plan's *Foundation entries* are all decisions; the foundation writer widened nothing else.
- The foundation writer reworded the heading question of the projected entry: the plan's "(new) — What does the end of a map run explain?" is written as D-362 "What does the end-of-run window say, and how does it open and close?", and D-132's title wording reads "the completion text of the map from its data" where the definition says „{mapa} rozwiązana”. Judge whether each says what the task requires (WAY-263).

## Report

Write the full report as `SKILL.md` section 4 gives: first line `PASS <sha>` or `FAIL <sha>`, findings by grade with place, reasoning and evidence, **Declined to judge**, each check with command and exit code (or method and result), each reach beyond the dispatch, **Unread material:** and **Searches not found or unclear:**. Name every changed invariant test. Return to the orchestrator only the first line, the counts of blocking, Minor and out-of-scope findings, a one-line check result and the report path.
