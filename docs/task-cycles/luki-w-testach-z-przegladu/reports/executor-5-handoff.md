# Handoff — executor of slice 5: testing guidelines: the departure for `destroy`, and the deploy workflow's unread forms

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `98195ef42c617f71a5f52c1f15737001aa3e370f`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-5-report.md`. Your directory for working copies: `.runs/executor-5/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 5 — testing guidelines: the departure for `destroy`, and the deploy workflow's unread forms

- **Goal:** `guidelines/testing.md` names the departure of the row of *Foundation entries* among
  D-73's departures, in *When to read* with their count made right, and the *Doubles* of the recipe
  `integration test` allows checking the call of `destroy` for the one case of `tests/http.test.mjs`
  „a failed renewal after an answer that has ended writes one line of the session and calls no
  destroy on the response”, because the cut of the answer is not seen on Windows, where the gate
  runs, naming the departure's decision (To do 6). The row of `.github/workflows/deploy.yml` under
  *Trust boundaries* also names, among the forms the cases of `tests/deploy/test_deploy_workflow.py`
  do not read and the reviewer reads by hand, a key with a space before its colon and a value with
  `$` written as the escape `\u0024` (To do 17), each verified against the test's reading — by
  reading its code, and where the executor wants, by feeding a crafted copy of the workflow to that
  reading in its own directory under `.runs/`. The wording follows the form of the pinned template and
  the language the file stands in. No test and no code change.
- **Change:** `guidelines/testing.md`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:32-32` To do 6 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:49-49` To do 17 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:63-68` question 2 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:136-144` Settlements to record ·
  Foundation entries row "A decision of the departure" · `foundations/decisions.md:813-827` D-73 (as
  the row of *Foundation entries* changes it) · `tests/http.test.mjs:5954-5987` the case of destroy ·
  `tests/deploy/test_deploy_workflow.py` · `foundations/invariants.md:1408-1417` deploy-workflow-input ·
  `.the-way/product-guidelines/testing/template.md` · `guidelines/coding.md`
- **Model:** same — it writes into the guidelines what the settlement row, the new decision and
  two items already settle, in the Polish of the file and by the pinned template, and verifies two
  crafted forms against the test's reading (orchestrator's change of the planner's `cheaper`: the
  wording of a guideline and the check of two forms are no mechanical carry-over).
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `python -B .the-way/instruction-files/check_instructions.py` ·
  `npm.cmd test -- tests/deploy/test_deploy_workflow.py` (unchanged, passes)
- **Depends on:** Foundation entries (the departure's decision and D-73)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:32-32 — To do 6

6. Wyjątek dla testu strażnika `destroy` (loop2#72-4): `guidelines/testing.md` (przepis integration test, *Doubles*) dopuszcza sprawdzenie wywołania w przypadku „a failed renewal after an answer that has ended writes one line of the session and calls no destroy on the response” w `tests/http.test.mjs`, bo urwania odpowiedzi nie widać na Windowsie, na którym biegnie bramka; wyjątek wchodzi do listy odstępstw D-73.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:49-49 — To do 17

17. Wiersz `guidelines/testing.md` o teście workflow wdrożenia (`tests/deploy/test_deploy_workflow.py`), który wylicza postacie nieczytane przez jego przypadki, wymienia też klucz z odstępem przed dwukropkiem i wartość z `$` zapisanym jako ucieczka (`\u0024`) — bez tego recenzent ufa testowi przy tych dwóch postaciach (loop2#149, Minor c-1; dopisane przez doradcę dnia 2026-11-17).

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:63-68 — question 2

- 2. Test sprawdzający wywołanie `destroy` wbrew wytycznym testowania (loop2#72-4) — wyjątek w wytycznych, przepisanie testu czy nic?
  - Answer: wyjątek w wytycznych testowania (To do 6).
  - Not chosen:
    - przepisać test na skutek — urwanie widać tylko na Linuksie, a bramka biegnie na Windowsie, więc tam test by się pomijał i ochrona zniknęłaby tam, gdzie biegnie bramka
    - nic nie zmieniać — rozjazd wytycznych i testu zostaje
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:136-144 — Settlements to record

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Test strażnika `destroy` po skończonej odpowiedzi sprawdza wywołanie, nie skutek, bo urwania odpowiedzi nie widać na Windowsie, na którym biegnie bramka; to odstępstwo od szablonu testowania stoi w D-73 i w wytycznych. | decision | pytanie 2 (wybór człowieka) | czy wyjątek zapisać tylko w wytycznych, czy jako odstępstwo D-73, i jak szeroko go sformułować |
| 2 | Każdy plik PNG pod `assets/sprites/` ma w teście przypisaną paczkę, a nowy plik bez przypisania wywraca test; `sprite-credits` jest sprawdzany testem. | invariant | pytanie 3 (wybór człowieka) | czy test kompletności ma łapać nowy plik, czy tylko nową paczkę, i czy metoda niezmiennika zostaje „review” |
| 3 | To, jak `express-session` tworzy identyfikator sesji, stoi jako fakt środowiska z cytatem źródła, na którym opiera się `player-opaque-session-cookie`. | environment fact | pytanie 9 (wybór człowieka) | czy wynik odczytu zapisać jako fakt, test losowości, czy tylko w zapisie cyklu |


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- (as in the plan) Foundation entries row "A decision of the departure"
- plan: `foundations/decisions.md:813-827` D-73 (as   the row of *Foundation entries* changes it) -> current: `foundations/decisions.md:813-826` D-73
- `tests/http.test.mjs:5954-5987` the case of destroy
- `tests/deploy/test_deploy_workflow.py`
- plan: `foundations/invariants.md:1408-1417` deploy-workflow-input -> current: `foundations/invariants.md:1398-1406` deploy-workflow-input
- `.the-way/product-guidelines/testing/template.md`
- `guidelines/coding.md`
- added by the orchestrator, written by the foundation step: `foundations/decisions.md:1038-1051` D-422

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
