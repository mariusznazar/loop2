# Handoff — executor of slice 4: browser-view: the packs' credits complete, and the shared origin cited

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `f2a723faa7ab46051657330cc251cd6af16bd347`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-4-report.md`. Your directory for working copies: `.runs/executor-4/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 4 — browser-view: the packs' credits complete, and the shared origin cited

- **Goal:** `tests/view/icons.test.mjs` holds a case citing `// invariant: sprite-credits` that
  assigns each PNG file directly in `assets/sprites/` to the pack it comes from — Pixel Crawler,
  [LPC] Wolf Animation or Smoke & Fire Animated Particle [16x16], as D-271 gives — and fails naming a
  file with no assignment, and naming each assigned pack whose licence asks for a credit
  (`lpc-wolf-licence`, `smoke-fire-particle-licence`; `pixel-crawler-terms` asks for none) that has no
  line among the credits of the section (Settlements row 2, To do 5); it is seen failing once with a
  PNG file added to `assets/sprites/` for a moment and once with a pack's line taken out of
  `src/browser/view/credits.ts` for a moment, each restored and the added file removed. The cases of
  `tests/account-api.test.mjs` that check a relative `/api/` path and no followed redirect (they cite
  `account-client-requests`) also cite `loop2-shared-public-origin` (To do 11), seen failing once with
  the client's path made absolute in `src/browser/account-api.ts` for a moment and restored. No
  product file and no file of `assets/` changes in the slice's commits.
- **Change:** `tests/view/icons.test.mjs` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:31-31` To do 5 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43` To do 11 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:69-73` question 3 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:136-144` Settlements to record ·
  `foundations/invariants.md:1298-1307` sprite-credits · `foundations/invariants.md:708-717`
  loop2-shared-public-origin · `foundations/invariants.md:818-827` account-client-requests ·
  `foundations/decisions.md:4848-4949` D-271 · `foundations/decisions.md:2614-2626` D-108 ·
  `foundations/decisions.md:641-655` D-117 · `foundations/environment_facts.md:654-659`
  pixel-crawler-terms · `foundations/environment_facts.md:792-803` smoke-fire-particle-licence,
  lpc-wolf-licence · `foundations/environment_facts.md:78-88` cc-by-3-adaptation-credit ·
  `foundations/environment_facts.md:372-377` fetch-same-origin-credentials ·
  `src/browser/view/credits.ts` · `src/browser/account-api.ts` · `foundations/part_map.md:3-31`
  browser-view · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** same — a new test of completeness and a citation, each seen failing against a change
  made for a moment and restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/icons.test.mjs` · `npm.cmd test -- tests/account-api.test.mjs` ·
  `git status --short -- assets src` shows nothing ·
  `python -B .the-way/elements/common/foundation_check.py` passes, with no invariant reading `test`
  left uncited
- **Depends on:** Foundation entries (sprite-credits's and loop2-shared-public-origin's *Method*) ·
  Slice 3

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:31-31 — To do 5

5. Test kompletności wzmianek paczek grafik (loop2#77-10): test przypisuje każdy plik PNG z `assets/sprites/` do paczki, z której pochodzi, nowy plik bez przypisania wywraca test, a każda paczka, której licencja wymaga wzmianki, ma linię w zasługach gry; metoda niezmiennika `sprite-credits` zmienia się na `test`.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-43 — To do 11

11. F-14 — metoda `test` i znaczniki w testach, które je sprawdzają, dla `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage` (znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`) i `loop2-shared-public-origin` (powołanie w testach `account-client-requests`).

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:69-73 — question 3

- 3. Wzmianki paczek grafik (`sprite-credits`, loop2#77-10) — test kompletności czy przegląd?
  - Answer: test kompletności (To do 5).
  - Not chosen:
    - zostawić przegląd — nową paczkę bez wzmianki złapie tylko recenzent, a błąd łamie cudzą licencję
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”.

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

- plan: `foundations/invariants.md:1298-1307` sprite-credits -> current: `foundations/invariants.md:1288-1296` sprite-credits
- plan: `foundations/invariants.md:708-717` loop2-shared-public-origin -> current: `foundations/invariants.md:708-716` loop2-shared-public-origin
- plan: `foundations/invariants.md:818-827` account-client-requests -> current: `foundations/invariants.md:808-816` account-client-requests
- plan: `foundations/decisions.md:4848-4949` D-271 -> current: `foundations/decisions.md:4863-4963` D-271
- plan: `foundations/decisions.md:2614-2626` D-108 -> current: `foundations/decisions.md:2629-2640` D-108
- plan: `foundations/decisions.md:641-655` D-117 -> current: `foundations/decisions.md:641-654` D-117
- plan: `foundations/environment_facts.md:654-659` pixel-crawler-terms -> current: `foundations/environment_facts.md:654-658` pixel-crawler-terms
- plan: `foundations/environment_facts.md:792-803` smoke-fire-particle-licence,   lpc-wolf-licence -> current: `foundations/environment_facts.md:792-796` smoke-fire-particle-licence; `foundations/environment_facts.md:798-802` lpc-wolf-licence
- plan: `foundations/environment_facts.md:78-88` cc-by-3-adaptation-credit -> current: `foundations/environment_facts.md:78-87` cc-by-3-adaptation-credit
- plan: `foundations/environment_facts.md:372-377` fetch-same-origin-credentials -> current: `foundations/environment_facts.md:372-376` fetch-same-origin-credentials
- `src/browser/view/credits.ts`
- `src/browser/account-api.ts`
- plan: `foundations/part_map.md:3-31` browser-view -> current: `foundations/part_map.md:3-31` browser-view
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
