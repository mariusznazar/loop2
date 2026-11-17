# Handoff — executor of slice 13: build-tools: the audit's unreadable report cited, and a fixed case of the import check

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `de7774b5b1ef7531561817c33180a27f54328c50`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-13-report.md`. Your directory for working copies: `.runs/executor-13/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 13 — build-tools: the audit's unreadable report cited, and a fixed case of the import check

- **Goal:** the check of an unreadable report of the audit that
  `test_audits_only_a_lockfile_changed_from_the_fork_point` holds, in
  `tests/quality/test_audit_dependencies.py`, cites `dependency-audit-refusal` (To do 8), seen failing
  once with the refusal of an unreadable report in `scripts/audit_dependencies.py` broken for a moment
  and restored byte for byte; and `tests/invariants/test_cross_part_imports.py` holds a fixed case,
  citing `cross-part-imports`, that gives the check a made-up import from a file of one part into a
  file of a part its *Depends on* does not name and expects the check to report it (To do 15,
  question 10), seen failing once with the refusal of the check broken for a moment and restored.
  Where an existing control case already does exactly that, the report names it and the slice cites
  it instead of adding one.
- **Change:** `tests/quality/test_audit_dependencies.py` · `tests/invariants/test_cross_part_imports.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40` To do 8 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:47-47` To do 15 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:105-109` question 10 ·
  `foundations/invariants.md:548-557` dependency-audit-refusal · `foundations/invariants.md:1238-1247`
  cross-part-imports · `foundations/decisions.md:506-520` D-33 · `foundations/decisions.md:903-917` D-79 ·
  `foundations/decisions.md:701-750` D-351 · `scripts/audit_dependencies.py` ·
  `foundations/part_map.md:90-124` build-tools · `foundations/part_map.md:190-198` test-helpers ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a citation and a control case, each shown red against a break restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/quality/test_audit_dependencies.py` ·
  `npm.cmd test -- tests/invariants/test_cross_part_imports.py` · `git status --short -- scripts` shows
  nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:40-40 — To do 8

8. Znaczniki `// invariant: <id>` (F-13) na testach, które już sprawdzają klauzulę bez powołania: napaść przerywająca akcję w `tests/sim/encounters.test.mjs` (`action-in-progress`), tura walki w `tests/sim/combat.test.mjs` ze znacznikiem w poprawnej postaci zamiast `// Invariant program-rule-pick:` (`program-rule-pick`), minuty walki w `tests/sim/encounters.test.mjs` (`minute-span-split`), liczniki zerowane przy przełączeniu w `tests/sim/copy-actions.test.mjs` (`copy-save`), raport nieczytelny w `test_audits_only_a_lockfile_changed_from_the_fork_point` (`dependency-audit-refusal`), zatrzymanie nadrabiania w `tests/sim/catch-up.test.mjs` (`catch-up-minutes`, klauzula „until it stops”).

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:47-47 — To do 15

15. Stały przypadek testu `cross-part-imports`, w którym sprawdzarka dostaje import spoza dozwolonych zależności części i zgłasza go.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:105-109 — question 10

- 10. Kontrola testu `cross-part-imports` — stały przypadek czy jednorazowe sprawdzenie?
  - Answer: stały przypadek (To do 15).
  - Not chosen:
    - jednorazowe sprawdzenie zapisane w cyklu — po zmianie sprawdzarki nikt nie wie, czy dalej działa
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „10 a”.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:548-557` dependency-audit-refusal -> current: `foundations/invariants.md:548-556` dependency-audit-refusal
- plan: `foundations/invariants.md:1238-1247` cross-part-imports -> current: `foundations/invariants.md:1228-1236` cross-part-imports
- plan: `foundations/decisions.md:506-520` D-33 -> current: `foundations/decisions.md:506-519` D-33
- plan: `foundations/decisions.md:903-917` D-79 -> current: `foundations/decisions.md:903-916` D-79
- plan: `foundations/decisions.md:701-750` D-351 -> current: `foundations/decisions.md:701-749` D-351
- `scripts/audit_dependencies.py`
- plan: `foundations/part_map.md:90-124` build-tools -> current: `foundations/part_map.md:90-124` build-tools
- plan: `foundations/part_map.md:190-198` test-helpers -> current: `foundations/part_map.md:190-198` test-helpers
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
