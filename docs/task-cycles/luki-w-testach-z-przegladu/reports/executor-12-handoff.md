# Handoff — executor of slice 12: simulation: world reference, closed lists and the team through a load and a loop

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `4690292844c37164c52aa26f204b4a6b9c056c78`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-12-report.md`. Your directory for working copies: `.runs/executor-12/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 12 — simulation: world reference, closed lists and the team through a load and a loop

- **Goal:** the test of `program-world-reference` also reads programs holding the conditions
  `temperatureBelow` and `itemBelow`; `program-closed-lists` is also checked on a program that comes
  through the load of a saved game state and through an earning loop, and `character-team` on the
  states a load and an earning loop give (To do 10); each widened check seen failing once against the
  simulation broken for a moment and restored byte for byte.
- **Change:** `tests/invariants/test_program_world_reference.py` ·
  `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_character_team.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:42-42` To do 10 ·
  `foundations/invariants.md:386-396` program-world-reference · `foundations/invariants.md:364-374`
  program-closed-lists · `foundations/invariants.md:518-527` character-team ·
  `foundations/decisions.md:7582-7612` D-26 · `foundations/decisions.md:7512-7555` D-23 ·
  `foundations/decisions.md:8076-8098` D-50 · `foundations/decisions.md:3687-3731` D-206 ·
  `tests/invariants/program_fixture.py` · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:223-227` earning loop · `foundations/part_map.md:33-64` simulation ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — three checks widened to new inputs, each shown red against a break restored
  exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/invariants/test_program_world_reference.py` ·
  `npm.cmd test -- tests/invariants/test_program_closed_lists.py` ·
  `npm.cmd test -- tests/invariants/test_character_team.py` · `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:42-42 — To do 10

10. Testy sięgające tak daleko jak zdanie niezmiennika (sekcja 2 przeglądu, „test sięga węziej niż zdanie”): `program-world-reference` z warunkami `temperatureBelow` i `itemBelow`; `catch-up-state` i `simulation-randomness` z napaścią wilka; `program-closed-lists` i `character-team` także przez wczytanie zapisu i pętlę.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:386-396` program-world-reference -> current: `foundations/invariants.md:386-395` program-world-reference
- plan: `foundations/invariants.md:364-374` program-closed-lists -> current: `foundations/invariants.md:364-373` program-closed-lists
- plan: `foundations/invariants.md:518-527` character-team -> current: `foundations/invariants.md:518-526` character-team
- plan: `foundations/decisions.md:7582-7612` D-26 -> current: `foundations/decisions.md:7597-7626` D-26
- plan: `foundations/decisions.md:7512-7555` D-23 -> current: `foundations/decisions.md:7527-7569` D-23
- plan: `foundations/decisions.md:8076-8098` D-50 -> current: `foundations/decisions.md:8091-8112` D-50
- plan: `foundations/decisions.md:3687-3731` D-206 -> current: `foundations/decisions.md:3702-3745` D-206
- `tests/invariants/program_fixture.py`
- plan: `foundations/glossary.md:25-30` program -> current: `foundations/glossary.md:25-30` program
- plan: `foundations/glossary.md:223-227` earning loop -> current: `foundations/glossary.md:223-227` earning loop
- plan: `foundations/part_map.md:33-64` simulation -> current: `foundations/part_map.md:33-64` simulation
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
