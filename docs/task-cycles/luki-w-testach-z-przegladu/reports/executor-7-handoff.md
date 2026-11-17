# Handoff — executor of slice 7: the scene: the wolf's run in through a pause and a resumption

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `1f21cf914fcff94475e8e77c599091a1ec607a33`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-7-report.md`. Your directory for working copies: `.runs/executor-7/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 7 — the scene: the wolf's run in through a pause and a resumption

- **Goal:** `tests/view/scene.test.mjs` holds a case in which the player pauses the map run within
  the 300 ms of the wolf's run in and resumes it, and the wolf keeps its run (`data-entering`) through
  the pause and after it until the run's animation ends; the case fails when the half
  `drawing.standing === "paused"` is removed from the condition of `entering` in
  `src/browser/view/scene.tsx` (To do 2), seen failing once with that half removed and restored byte
  for byte. No product code changes.
- **Change:** `tests/view/scene.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:28-28` To do 2 ·
  `foundations/decisions.md:10864-10990` D-316 · `foundations/decisions.md:11213-11279` D-322 ·
  `foundations/invariants.md:1188-1197`
  document-test-memory-limit · `src/browser/view/scene.tsx` · `tests/view/page-document.mjs` ·
  `foundations/part_map.md:3-31` browser-view · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — a new case beside the file's cases of the run in, seen failing against a break
  of the scene restored exactly.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/scene.test.mjs` (red with the half removed, green restored) ·
  `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:28-28 — To do 2

2. Przypadek pauzy i wznowienia w trakcie 300 ms wbiegania wilka, który pada po usunięciu połowy `paused` z warunku w `src/browser/view/scene.tsx` (loop2#86-2).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:10864-10990` D-316 -> current: `foundations/decisions.md:10879-11004` D-316
- plan: `foundations/decisions.md:11213-11279` D-322 -> current: `foundations/decisions.md:11228-11293` D-322
- plan: `foundations/invariants.md:1188-1197` document-test-memory-limit -> current: `foundations/invariants.md:1178-1186` document-test-memory-limit
- `src/browser/view/scene.tsx`
- `tests/view/page-document.mjs`
- plan: `foundations/part_map.md:3-31` browser-view -> current: `foundations/part_map.md:3-31` browser-view
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
