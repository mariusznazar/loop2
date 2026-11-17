# Handoff — executor of slice 6: the chronicle: a row already drawn is not drawn again when an entry arrives above it

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `74308be59d083c3c7d07baa626e4eaad59e4e706`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: the strongest class the human allows (Opus; never `fable`).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-6-report.md`. Your directory for working copies: `.runs/executor-6/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 6 — the chronicle: a row already drawn is not drawn again when an entry arrives above it

- **Goal:** `tests/view/tabs-area.test.mjs` holds a case that fails when the `memo` around `Row` in
  `src/browser/view/tabs-area.tsx` is removed: with a window of rows drawn, an entry recorded above
  them draws its own row and draws none of the rows under it again (D-382, its last clause; To do 1).
  The case observes React's draws from the test alone — for example through a hook React reads before
  it loads, or a profiler of the test's own around the area — and adds nothing to `src/`; it is seen
  failing once with the `memo` removed for a moment and restored byte for byte. Where no such
  observation is possible without a change of product code, the slice commits nothing and its report
  says each way tried and why it fails (question 5); the gap stays. The slice writes no foundation
  entry; its report says whether the test stands, for the return step and D-382's *Verification*.
- **Change:** `tests/view/tabs-area.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:27-27` To do 1 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:79-84` question 5 ·
  `foundations/decisions.md:10765-10779` D-382 · `foundations/decisions.md:10443-10518` D-338, D-339 ·
  `foundations/decisions.md:10619-10656` D-343 · `foundations/decisions.md:1228-1349` D-264, D-268 ·
  `foundations/invariants.md:1188-1197` document-test-memory-limit · `foundations/glossary.md:260-264`
  chronicle · `src/browser/view/tabs-area.tsx` · `src/browser/view/chronicle.ts` ·
  `tests/view/page-document.mjs` · `foundations/part_map.md:3-31` browser-view ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — it needs a way to see a draw of React from outside the product's code, or
  the evidence that none exists.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/view/tabs-area.test.mjs` (red with the `memo` removed, green
  restored) · `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:27-27 — To do 1

1. Test, który pada, gdy wiersz kroniki już narysowany rysuje się ponownie, gdy nad nim przybywa wpis (D-382), czyli po usunięciu `memo` z wiersza w `src/browser/view/right-area.tsx` (loop2#66-7), napisany bez zmiany kodu produktu; jeśli się nie da, PR opisuje, co sprawdzono, i luka zostaje.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:79-84 — question 5

- 5. Ponowne rysowanie wiersza kroniki (loop2#66-7) — czy test może wymagać zmiany kodu produktu?
  - Answer: nie; cykl szuka testu bez zmiany kodu produktu, a jeśli się nie da, opisuje to w PR i luka zostaje (To do 1).
  - Not chosen:
    - mały punkt zaczepienia w kodzie produktu tylko dla testu — kod produktu niesie coś, czego gra nie potrzebuje
    - zostawić teraz — luka zostaje bez próby
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „5 a”.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:10765-10779` D-382 -> current: `foundations/decisions.md:10780-10793` D-382
- plan: `foundations/decisions.md:10443-10518` D-338, D-339 -> current: `foundations/decisions.md:10458-10484` D-338; `foundations/decisions.md:10486-10532` D-339
- plan: `foundations/decisions.md:10619-10656` D-343 -> current: `foundations/decisions.md:10634-10670` D-343
- plan: `foundations/decisions.md:1228-1349` D-264, D-268 -> current: `foundations/decisions.md:1243-1303` D-264; `foundations/decisions.md:1305-1363` D-268
- plan: `foundations/invariants.md:1188-1197` document-test-memory-limit -> current: `foundations/invariants.md:1178-1186` document-test-memory-limit
- plan: `foundations/glossary.md:260-264` chronicle -> current: `foundations/glossary.md:260-264` chronicle
- `src/browser/view/tabs-area.tsx`
- `src/browser/view/chronicle.ts`
- `tests/view/page-document.mjs`
- plan: `foundations/part_map.md:3-31` browser-view -> current: `foundations/part_map.md:3-31` browser-view
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
