# Handoff - Slice 5 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `b6c70d1`. The head you start from: `b6c70d1`. Your range runs from `b6c70d1`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: cheaper (haiku).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 5 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-05-report.md`.

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

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
