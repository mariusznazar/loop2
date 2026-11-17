# Handoff — executor of slice 10: simulation: citations on tests that already check

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `24acd7e8f51ce13dedc5a23e775b8bee0ccf68ab`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-10-report.md`. Your directory for working copies: `.runs/executor-10/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 10 — simulation: citations on tests that already check

- **Goal:** the cases of the simulation that To do 8 names cite their invariant in the form
  `foundation_check.py` reads, `// invariant: <identifier>`, at the case: in
  `tests/sim/encounters.test.mjs` the attack that interrupts an action in progress (`action-in-progress`,
  for example „an eligible attack interrupts a long exploration before it finishes”) and the minutes
  of combat compared whole and split (`minute-span-split`, the comment `// Invariant
  minute-span-split:` brought to the form); in `tests/sim/combat.test.mjs` the turn of combat
  (`program-rule-pick`, its two comments `// Invariant program-rule-pick:` brought to the form); in
  `tests/sim/copy-actions.test.mjs` the counts at zero after a switch (`copy-save`); in
  `tests/sim/catch-up.test.mjs` the catch-up that passes an earning loop until it stops
  (`catch-up-minutes`, the clause "until it stops"). Each case is seen failing once against
  `src/browser/sim/` broken for a moment where its clause holds, and restored byte for byte. The
  malformed comments the task does not name (`tests/sim/encounters.test.mjs`, map-run-repeatability
  and restart-seed; `tests/sim/body.test.mjs`, nature-energy-range) stay as they are.
- **Change:** `tests/sim/encounters.test.mjs` · `tests/sim/combat.test.mjs` ·
  `tests/sim/copy-actions.test.mjs` · `tests/sim/catch-up.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40` To do 8 ·
  `foundations/invariants.md:187-197` action-in-progress · `foundations/invariants.md:248-263`
  program-rule-pick · `foundations/invariants.md:528-537` minute-span-split ·
  `foundations/invariants.md:858-867` copy-save · `foundations/invariants.md:1148-1157`
  catch-up-minutes · `foundations/decisions.md:7492-7555` D-20, D-23 · `foundations/decisions.md:6402-6441`
  D-140 · `foundations/decisions.md:5354-5366` D-71 · `foundations/decisions.md:7955-7975` D-171 ·
  `foundations/decisions.md:8425-8478` D-242 · `foundations/decisions.md:8641-8677` D-247 ·
  `foundations/glossary.md:180-184` copy · `foundations/glossary.md:223-239` earning loop, loop,
  catch-up · `foundations/part_map.md:33-64` simulation · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — six citations, each case shown red against a break of the simulation and
  restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/sim/encounters.test.mjs` · `npm.cmd test -- tests/sim/combat.test.mjs` ·
  `npm.cmd test -- tests/sim/copy-actions.test.mjs` · `npm.cmd test -- tests/sim/catch-up.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` · `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40 — To do 8

8. Znaczniki `// invariant: <id>` (F-13) na testach, które już sprawdzają klauzulę bez powołania: napaść przerywająca akcję w `tests/sim/encounters.test.mjs` (`action-in-progress`), tura walki w `tests/sim/combat.test.mjs` ze znacznikiem w poprawnej postaci zamiast `// Invariant program-rule-pick:` (`program-rule-pick`), minuty walki w `tests/sim/encounters.test.mjs` (`minute-span-split`), liczniki zerowane przy przełączeniu w `tests/sim/copy-actions.test.mjs` (`copy-save`), raport nieczytelny w `test_audits_only_a_lockfile_changed_from_the_fork_point` (`dependency-audit-refusal`), zatrzymanie nadrabiania w `tests/sim/catch-up.test.mjs` (`catch-up-minutes`, klauzula „until it stops”).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:187-197` action-in-progress -> current: `foundations/invariants.md:187-196` action-in-progress
- plan: `foundations/invariants.md:248-263` program-rule-pick -> current: `foundations/invariants.md:248-262` program-rule-pick
- plan: `foundations/invariants.md:528-537` minute-span-split -> current: `foundations/invariants.md:528-536` minute-span-split
- plan: `foundations/invariants.md:858-867` copy-save -> current: `foundations/invariants.md:848-856` copy-save
- plan: `foundations/invariants.md:1148-1157` catch-up-minutes -> current: `foundations/invariants.md:1138-1146` catch-up-minutes
- plan: `foundations/decisions.md:7492-7555` D-20, D-23 -> current: `foundations/decisions.md:7507-7525` D-20; `foundations/decisions.md:7527-7569` D-23
- plan: `foundations/decisions.md:6402-6441` D-140 -> current: `foundations/decisions.md:6417-6455` D-140
- plan: `foundations/decisions.md:5354-5366` D-71 -> current: `foundations/decisions.md:5369-5380` D-71
- plan: `foundations/decisions.md:7955-7975` D-171 -> current: `foundations/decisions.md:7970-7989` D-171
- plan: `foundations/decisions.md:8425-8478` D-242 -> current: `foundations/decisions.md:8440-8492` D-242
- plan: `foundations/decisions.md:8641-8677` D-247 -> current: `foundations/decisions.md:8656-8691` D-247
- plan: `foundations/glossary.md:180-184` copy -> current: `foundations/glossary.md:180-184` copy
- plan: `foundations/glossary.md:223-239` earning loop, loop,   catch-up -> current: `foundations/glossary.md:223-227` earning loop; `foundations/glossary.md:229-233` loop; `foundations/glossary.md:235-239` catch-up
- plan: `foundations/part_map.md:33-64` simulation -> current: `foundations/part_map.md:33-64` simulation
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
