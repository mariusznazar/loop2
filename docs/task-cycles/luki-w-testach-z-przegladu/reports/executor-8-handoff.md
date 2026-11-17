# Handoff — executor of slice 8: the saved game: a character numbered as the next number is refused

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `cac04185766066e163fed8049f57d17a171daf67`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-8-report.md`. Your directory for working copies: `.runs/executor-8/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 8 — the saved game: a character numbered as the next number is refused

- **Goal:** with `id >= nextCharacterId` of `src/browser/sim/saved-game.ts` made `id > nextCharacterId`
  for a moment, a case of `tests/sim/saved-game.test.mjs` fails: a document valid in everything but one
  character whose number equals `nextCharacterId` is refused whole (To do 3). The executor first runs
  the file with that change: where an existing case or variant of `CRAFTED` already fails on it, the
  report names it with its output and the slice adds nothing; otherwise it adds a named variant or a
  case and shows it failing on the change. The change is restored byte for byte.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:29-29` To do 3 ·
  `foundations/invariants.md:1038-1047` save-version · `foundations/decisions.md:3687-3731` D-206 ·
  `foundations/decisions.md:5840-5865` D-56 · `src/browser/sim/saved-game.ts:495-540` the team's check ·
  `foundations/glossary.md:217-221` generation number · `foundations/part_map.md:33-64` simulation ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — the case must be shown to catch one changed comparison of a trust boundary file,
  restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/sim/saved-game.test.mjs` (red with the comparison changed, green
  restored) · `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:29-29 — To do 3

3. Przypadek wczytania zapisu, który pada po zamianie `id >= nextCharacterId` na `id > nextCharacterId` w `src/browser/sim/saved-game.ts`: dokument poprawny poza postacią o numerze równym `nextCharacterId` dostaje odmowę (loop2#72-20).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:1038-1047` save-version -> current: `foundations/invariants.md:1028-1036` save-version
- plan: `foundations/decisions.md:3687-3731` D-206 -> current: `foundations/decisions.md:3702-3745` D-206
- plan: `foundations/decisions.md:5840-5865` D-56 -> current: `foundations/decisions.md:5855-5879` D-56
- `src/browser/sim/saved-game.ts:495-540` the team's check
- plan: `foundations/glossary.md:217-221` generation number -> current: `foundations/glossary.md:217-221` generation number
- plan: `foundations/part_map.md:33-64` simulation -> current: `foundations/part_map.md:33-64` simulation
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
