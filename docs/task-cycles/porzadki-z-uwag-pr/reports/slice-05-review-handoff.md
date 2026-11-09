# Handoff - review of Slice 5 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 5 of the plan, the range `b6c70d1..23f7e43` (compute the diff yourself: `git diff b6c70d1..23f7e43`, `git log b6c70d1..23f7e43`; confirm that `git rev-parse HEAD` is `23f7e43`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-05-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-05-review.md`. Its first line is `PASS 23f7e43` or `FAIL 23f7e43` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- Guard 2 test patches `fs.createReadStream` and guard 1 test observes `destroy`: is each patch restored on every path (pass, fail, timeout) and can it leak into another case of `tests/http.test.mjs` (the file's cases may run in the same process; check whether any runs concurrently)? Run the whole file twice, and once with only the new cases selected, and say what you saw.
- For each of the two guards, take the guard out of `src/server/app.ts` in a temporary worktree (removed again after) and say whether the matching new test fails for the reason the slice names, and whether it can pass for another reason (for example the response ended by a different path, or `destroy` called by Node itself).
- The guard-1 test is a call check on `destroy`. The testing guideline allows a call check only "for an effect visible outside the product". The executor reports the effect (a cut-off answer) invisible on this Windows host and names the call check as a departure. Is the departure sound for a boundary guard that keeps an ended answer whole, or does the test then protect an implementation detail? Grade and scope it yourself.
- Does the guard-2 test's route (the static file served by the real app, its read stream failing after the first kilobyte) really reach the `headersSent` branch of the error handler rather than another path, and does it assert exactly one failure line, no stack of the error, and the answer cut?

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 5")

### Slice 5 — Tests of the server's two guards for an error after the answer began

- **Goal:** two guards of `src/server/app.ts` have a test each, on real HTTP (To do 17): the
  `if (!response.writableEnded)` before `response.destroy()` in the session callback (today `:68`),
  which keeps an answer already ended whole, and the `response.headersSent` branch of the error
  handler (today `:109`–`:113`), which destroys a response whose answer began and hands no error on
  to Express's own handler. Each test is seen once failing on code with the defect it is to catch —
  the guard removed, or turned into a plain `destroy()`, put in temporarily — the command and exit
  code in the report, and the defect taken out again. No product file changes; if a guard proves
  unreachable from any request, the slice returns without code and says so.
- **Change:** `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:54-54` To do, item 17 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:2650-2661` D-138 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/part_map.md:62-82` account-server ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/app.ts` · `src/server/log-line.ts`
- **Model:** cheaper
- **Risk:** trust boundary — the tests of `src/server/app.ts` (`src/server/**`), whose defects the
  slice puts in temporarily
- **Checks:** `npm test -- tests/http.test.mjs`, also with each defect in place (failing), then
  without it (passing)
- **Depends on:** Slice 4

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:54-54`

17. Testy pokazują dwa zabezpieczenia serwera na błąd po rozpoczęciu odpowiedzi: `if (!response.writableEnded)` (`src/server/app.ts:68`) i gałąź `headersSent` (`:109`–`:110`) (loop2#051-9).

### `task.md:83-85`

### Acceptance criteria

- Każdy test dodany z pozycji 11–19 został raz widziany z porażką na kodzie z usterką, którą ma łapać.

## What to return

The status as the report's first line (`PASS <sha>` / `FAIL <sha>` / `questions`), then graded findings (blocking and Minor, each marked inside or outside the task's scope), the checks you ran as command and exit code,
every reach beyond this handoff (what, where, why), and **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Name any changed invariant test. Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
