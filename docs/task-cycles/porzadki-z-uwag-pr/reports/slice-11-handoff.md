# Handoff - Slice 11 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `098a708`. The head you start from: `098a708`. Your range runs from `098a708`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: cheaper (haiku).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 11 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-11-report.md`.

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 11")

### Slice 11 — A failed password measurement says which docker step failed and why

- **Goal:** after a failed measurement on the server, Mariusz learns whether the SSH login, the
  permission to use Docker or the image itself failed, not only "the image cannot be inspected"
  (To do 25; `scripts/measure-passwords.mjs:89`–`:99`, `:190`–`:199`, `:238`–`:250`, `:285`). The
  launcher names in its report which docker step failed (`image inspect`, `run`, `wait`) and docker's
  exit status, and writes docker's own error text to standard error, which the skill's command leaves
  in the terminal, never into the report file that is copied into the request (see *Choices*). The
  list of failures in "Measuring the password work of the deployed image" of
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (today `:405`–`:416`) says how to
  read that terminal text: an SSH login refused, no permission on the Docker socket, or an image the
  daemon does not hold. Both copies of the skill change alike, byte for byte. A test of
  `tests/password-measurement.test.mjs`, through the `docker` function `measure` takes, is written
  first and seen failing on the base. Items 26 and 27 of the same section are Slice 12's, not this
  slice's.
- **Change:** `scripts/measure-passwords.mjs` · `tests/password-measurement.test.mjs` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:23-23` Need, the fifth point ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:71-71` To do, item 25 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:89-93` Questions to settle, the seven remarks ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:2025-2036` D-113 · `foundations/decisions.md:271-289` D-12 ·
  `foundations/decisions.md:291-304` D-13 · `foundations/decisions.md:5156-5199` D-253 ·
  `foundations/invariants.md:649-658` player-argon2-deployment-check ·
  `foundations/part_map.md:84-116` build-tools · `foundations/part_map.md:118-133` agent-workflow ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/password-measurement.test.mjs` — the new case written first and
  seen failing on the base; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`
- **Depends on:** none

## The plan's Choices (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Choices")

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 4 gets no slice: the orchestrator's base run shows the class running and passing, so the task's condition does not hold | a slice that rewrites the class's PowerShell preparation anyway | the class could stop running again on another state of the machine, and only a reader of the gate's output would see it, as before |
| Slice 2 keeps the non-zero exit code `account-backup` gives today when its cleanup fails, and changes only the failure's name and the operator's sentence | exit 0 after a whole backup — the nightly script would send it, but the plain copy left in the container's `/tmp` would reach the owner by no notice; a new exit code of its own — the skill's table of the command's codes in `backup_and_restore.md` changes in two copies for a rare case whose sentence, in the backup log, already says which | one night's backup is not sent each time only the cleanup fails; the owner learns it from the notice and the log |
| Slice 4 tells the block apart where the session write learns it, carried from the database to the error handler of the session callback | reading the account's blocked state again after the write failed — a second query, and an unblock in between turns a block's refusal back into a failure line | a cause wrongly read as the block hides a real failure of the session write |
| Items 9, 10 and 17 are three slices in a chain over `src/server/app.ts` and `tests/http.test.mjs`, after Slice 1 | one slice of all three — a reviewer judges a change of behaviour, a second one and a gap of tests at once | three reviews of a trust boundary instead of one |
| Item 15 joins the simulation's test slice (Slice 9), though it guards `loop.ts`, not the load | a slice of its own | none beyond a larger review of Slice 9 |
| Slice 8 observes what the client hands the real `fetch` and lets it reach the file's real local server | a stand-in for `fetch` — against the example "Test na prawdziwym lokalnym serwerze" of `guidelines/coding-browser-api-client.md` | a wrapper that changes the request would test the wrapper; the review checks that it passes the call on unchanged |
| Slice 10 reloads through the `PageAddress` the page already gets, which gains the reload | `location.reload()` called in `game-view.ts` — no test of the view can see it | one more member of a type every fake address of the tests implements |
| Slice 11 sends docker's own error text to standard error, which stays in the terminal, and puts in the report only the docker step and its exit status | docker's text in the report — the report is copied into the request, and docker's message over `DOCKER_HOST=ssh://…` can carry the server's name or address, which D-13 keeps out of requests | Mariusz has to read the terminal, not only the file, to see the reason |
| Slice 12 keeps the tunnel's H1–H5 and renames the mail's and the saved-game's steps | renaming all three families — the tunnel's names stand also in `backup_and_restore.md`, in `troubleshooting.md`'s section on abandoning the request and in further places, so more files and more references to miss | the tunnel's steps keep a name as generic as before |
| The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) stays as it is, though several cases use it (the orchestrator's answer to the planner's open question) | raising it with item 2 — the task and the review row name only the occupied-port case, and nobody has seen `refusedStart` fail | a later load failure of another case of the same file, to be a remark of a later task |
| Slice 12 changes the text of the measuring section only for items 26 and 27 and leaves the launcher without a signal handler | a signal handler in `scripts/measure-passwords.mjs` that removes the container — the task asks the skill to say how, and a killed terminal or lost connection runs no handler anyway | none |

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:23-23`

- Skill wdrożenia ma zdania, przez które Mariusz albo agent źle odczyta instrukcję: trzy kroki o jednej nazwie, „nie ma przycisku zapisu” obok przycisków „Zapisz…”, pomiar haseł bez przyczyny porażki i bez sprzątania, polecenia usuwające wolumen, wynik polecenia blokady, linki po odblokowaniu (loop2#043-14, 043-16, 032-11, 032-12, 032-17, 032-4, 036-2, 037-1).

### `task.md:71-71`

25. Po nieudanym pomiarze haseł na serwerze Mariusz wie, czy zawiodło logowanie SSH, uprawnienia Dockera czy sam obraz, a nie widzi tylko „the image cannot be inspected” (loop2#032-11; `scripts/measure-passwords.mjs:89`, `:94`, `:197`, `:285`; lista porażek w `setup_and_secrets.md:405`–`:416`).

### `task.md:89-93`

- Czy siedem uwag o skillu wdrożenia z sekcji „Zostawić” (loop2#032-11, 032-12, 032-17, 032-4, 036-2, 037-1, 037-13) wchodzi do zadania, choć wstęp sekcji „Zadanie 2” je zapowiada, a tabela ich nie ma?
  - Answer: tak, wchodzą — pozycje 25–31.
  - Not chosen:
    - zostają w „Zostawić”, a poprawia się tylko wstęp sekcji — zadanie zamyka się na 26 pozycjach, a zostaje przypadkowe hasło poczty przy wklejaniu bloku (037-13) i sześć zdań skilla, które mylą się w niegroźny sposób
  - Source: Mariusz, 2026-11-08: „tak, niech wejdą”

## What to return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
