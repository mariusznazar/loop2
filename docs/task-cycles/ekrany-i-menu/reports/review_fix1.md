PASS b3ee736257669193c81fcb12995b33a168f27b73

# Review of the fix of B1 and B2, task `ekrany-i-menu`

- Range: `eeb145f26f6702dd8e9cd2370269d95aa6effc6a..b3ee736257669193c81fcb12995b33a168f27b73`, two commits
  (`915b052` for B2, `b3ee736` for B1); 4 files, +223 −31: `foundations/decisions.md`,
  `src/browser/view/game-view.ts`, `src/browser/view/run-screen.ts`, `tests/view/account-screen.test.mjs`.
- `git rev-parse HEAD` in the reviewed worktree `C:/Storage/repos/loop2-wt/ekrany-i-menu` = `b3ee736…`, the head
  given. Pin: `git -C .the-way rev-parse HEAD` = `f45ca40724251a46965aed69f733d0a35c430048` = the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` and `.the-way/task-cycle/review/fix.md`, read whole. No subagent.
  The reviewed worktree, its index and its branch were not changed (status clean before and after); every build,
  test and mutation ran in a separate worktree detached at `b3ee736` under the session scratchpad, with
  `node_modules` (and, for the quality case, `.runs/quality-venv`) joined by a junction; the junctions were removed
  first and the worktree removed after.
- Read whole: `reports/fix1_findings.md`, `reports/fix1.md`; D-93, D-166, D-167, D-173, D-244, D-265, D-280, D-281
  at the head; `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`, `src/browser/AGENTS.md`. From the frozen task: To do 5, 6 (with its sub-points),
  questions 15 and 17, *Decisions in play*, *Out of scope*.

## The findings of the findings file

### B1 — fixed

What the player sees on the head: after „Zakończ” of a map run whose copy came from „Program 2”, the bar's
„Programy” (`#/programy`, no number) opens the panel of Programy on „Program 2”, marked on the list, with the
counts of the map run beside its rules; `#/programy/1` still opens „Program”, without counts. Once the copy's
program is gone, `#/programy` falls back to the first program.

- Code: `src/browser/view/game-view.ts:387-393` (`programShownOn`): for the kind `programs` it now takes
  `state.countsProgram ?? state.programs[0].id`, guarded by `programById`; `program` (`#/programy/{n}`) is
  unchanged. `countsProgram` is set by `end` to the copy's program where it is still on the list
  (`src/browser/sim/game.ts:405`), cleared at a send (`game.ts:179`), by the deletion of that program
  (`src/browser/sim/programs.ts:488-500`) and is kept by `editProgram` (`programs.ts:523`), so the program
  shown does not jump while the player edits it after „Zakończ”. Starting an earning loop does not touch it
  (D-244: „the start of an earning loop leaves the counts a manual map run left as they were”). The counts beside
  its rules come from the unchanged `shownContent` (`src/browser/view/program-panel.ts:151`), which shows them
  exactly when `!state.run && state.countsProgram === saved.id` — the D-93 clause „after „Zakończ” beside the
  rules of the program the copy belongs to … and beside the rules of no other program”.
- D-173 at the head: binding sentence unchanged („after „Zakończ” the program panel shows the program the copy
  belongs to”); *Verification* complies example now „„Program” standing in the panel of Programy as it was
  saved” (`foundations/decisions.md:3130`). The panel that stands after „Zakończ” is the panel of Programy at
  `#/programy`, and it shows the copy's program as saved (unsaved changes of the copy are dropped by `end`), so
  the entry now says what the code does. The binding clause read against the code: Postać, which „Zakończ”
  opens, has no program panel; the next panel the player reaches by the bar shows the copy's program. I keep no
  part of B1.
- Tests: `tests/view/account-screen.test.mjs:4247` and `:4289`. Mutations in the separate worktree:
  - M1, `#/programy` ignoring `countsProgram` (the bug as it stood) → `account-screen` exit 1, both new cases fail.
  - M2, `#/programy/{n}` following `countsProgram` instead of the address → exit 1, the case at `:4247` fails.
  - Not run, by reading: dropping the `programById` guard for the `programs` kind alone is equivalent today —
    every writer of `countsProgram` sets it to a listed program or clears it with the program
    (`game.ts:405`, `programs.ts:500`), and the load refuses an unlisted one (`saved-game.ts:1188-1192`); the
    fix report says the same.

### B2 — fixed

What the player would see with a second map run: the program panel of Przejście shows the copy of the map run
the screen was given, the same one the column beside it shows. Today, with one manual map run, nothing changes on
screen.

- Code: `src/browser/view/run-screen.ts:43-45` takes `Pick<ProgramPanel, "element" | "update">`; `:77` places
  `panel.element` first as before; `:86-87` builds `shown` (`{ ...state, run }` where they differ) and hands it,
  with the events, to the panel, the same state the column's parts get. `src/browser/view/game-view.ts:242-243`
  no longer updates `runPanel` from the store; `renderScreens(events)` (`:537-543`) updates Przejście, its panel
  included, while the state holds a map run, and the first drawing goes the same way (`:579-580`). The header
  comment of `run-screen.ts` now says the panel is among the parts fed the given map run, which is true. D-281
  („The screen of a map run takes its map run as a parameter and reads no map run of the game state by itself”)
  and To do 6 („Ekran dostaje przejście jako parametr i sam nie czyta przejścia ze stanu gry”) hold for what the
  screen draws.
- What the fix changed besides: the run panel is no longer updated while the state holds no map run (after
  „Zakończ” until the next send). I checked that this breaks nothing the player can reach: the screen is hidden
  then (`resolveScreen` sends `#/postac/{n}/przejscie` without a map run to Postać, D-281); the panel has no
  document-level listener (grep of `addEventListener` on `document`/`window` in `src/browser/view/`); its
  buttons cannot be pressed while hidden, and every control it calls acts on the game view's current `state`
  with its own guard (`game-view.ts:183-220`); at the next send or „Restart” the result carries `mapRunStarted`
  (`game.ts:193`, `restart` at `:385` through `startRun`), so `nextShown` (`program-panel.ts:120-125`) shows the
  copy as before, and `render` rebuilds the select list from the fresh state (`program-panel.ts:470-475`). A game
  loaded without a map run first updates the panel at the first send with `previous === null`, which also shows
  the copy.
- Tests: `tests/view/account-screen.test.mjs:3989` builds the screen alone with a real panel and gives it a
  state whose map run differs from the parameter. Mutation M3, `panel.update(state, events)` instead of
  `shown` (the bug's effect) → `account-screen` exit 1, that case fails.

## New findings

### Minor

**N1 (Minor) — the events the fix routes through the screen to the panel are guarded by no test.**
Place: `src/browser/view/run-screen.ts:87` (`panel.update(shown, events)`) and `src/browser/view/game-view.ts:539`
(`runScreen.update(state, state.run, events)`), both new in the fix. What is wrong: mutation M4,
`panel.update(shown, [])`, leaves `tests/view/account-screen.test.mjs` at exit 0 (126 of 126) and
`tests/view/program-panel.test.mjs` at exit 0 (31 of 31). With that break, a player who, during a map run, picks a
saved program in the list „Program:” of Przejście and then presses „Restart” — or ends with „Zakończ” and sends
again — would find the panel still on that saved program instead of the copy (`nextShown`,
`program-panel.ts:120-131`: without `mapRunStarted` the branch for a started map run is skipped). The code on the
head is correct, so nothing breaks today; the new B2 case passes `[]` as events. Why Minor: it is a pass-through
the testing guidelines do not require a separate test for („Czy kod tylko kopiuje lub przekazuje dane, bez
własnej reguły? — Bez osobnego stałego testu”), and the panel's own rule is tested at `program-panel.test.mjs:443`;
a page-level case of „Restart” with a saved program shown would close it.

**N2 (Minor, outside the fix diff) — a branch of the run panel and its case now describe a path the game no
longer takes.** Place: `src/browser/view/program-panel.ts:126-129` (`previous?.run && !state.run` → the copy's
program) and `tests/view/program-panel.test.mjs:443` („„Zakończ” shows the copy's program with them”). Since the
fix, the game view never updates the run panel with a state without a map run, so the branch runs only in the
panel-level test. Why it matters a little: a later reader can take the case as evidence that something on
Przejście moves to the copy's program at „Zakończ”; the behaviour D-173 asks for now lives in `programShownOn`.
It does not reopen the review (outside the fix diff, no wrong behaviour).

### Critical / Important

None.

## Declined to judge

- The status row's and the panel's controls act on the game view's `state.run`, not on the map run the screen was
  given (`game-view.ts:183-220`, `:322-345`). With one manual map run the two are the same object; D-281 and To do 6
  speak of what the screen reads and draws, and controls for a second map run are a later task's (D-281 rationale:
  „a map run for each character … become additions”). Outside the findings file and the fix diff.
- Which program `#/programy` shows after the deletion of another program from `#/programy/{n}` while counts stand
  beside the copy's program (`onDelete` → `resolveScreen` → `#/programy` → the copy's program rather than the
  first). No foundation entry says which program `#/programy` shows apart from D-173's clause, and the result
  follows D-173; not a defect, not a finding.

## Checks

All in the separate worktree of `b3ee736` unless stated.

| Command | Exit code |
|---|---|
| `git rev-parse HEAD`, `git status --short`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` (reviewed worktree) | 0; head `b3ee736…`, clean, pin and gitlink `f45ca40…` |
| `git log eeb145f..b3ee736`, `git diff eeb145f..b3ee736` (reviewed worktree) | 0 |
| `git worktree add --detach <scratchpad>/revfix b3ee736`; `git submodule update --init -- .the-way` there | 0, 0 (`.the-way` at `f45ca40…`) |
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (126 passed, 0 failed) |
| `npm test -- tests/view/program-panel.test.mjs` | 0 |
| `npm test -- tests/view/program-list.test.mjs` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py`, first run | 1 — 2 errors, `FileNotFoundError` for `ruff` and `shellcheck`: the separate worktree had no `.runs/quality-venv` (environment, not the change) |
| the same after joining `.runs/quality-venv` of the reviewed worktree by a junction | 0 (Ran 5 tests, OK) |
| `npx prettier --no-config --no-editorconfig --check src/browser/view/run-screen.ts src/browser/view/game-view.ts tests/view/account-screen.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| M1: `sed` `programShownOn` back to `state.programs[0].id` for `#/programy`; `npm test -- tests/view/account-screen.test.mjs`; `git checkout` | 1 (124 passed, 2 failed: the two new B1 cases) |
| M2: `#/programy/{n}` → `state.countsProgram ?? screen.programId`; same test; `git checkout` | 1 (1 failed: `:4247`) |
| M3: `panel.update(state, events)` in `run-screen.ts`; same test; `git checkout` | 1 (1 failed: `:3989`) |
| M4: `panel.update(shown, [])` in `run-screen.ts`; `account-screen` and `program-panel`; `git checkout` | 0 and 0 — survives (N1) |
| junctions removed with `rmdir`, then `git worktree remove --force <scratchpad>/revfix` | 0; reviewed worktree's `node_modules` and venv still present, status clean |

Not run: the full `npm test` (the cycle's run before the request, as the method and the handoff give); the real
browser (the fix report's run is a claim I did not repeat — the behaviour of B1 is covered at the page level on
jsdom and no look, focus or SVG changed; B2 changes nothing visible today); StrykerJS (its scope is `simulation`,
which the fix does not touch).

## Reaches beyond the handoff

- `src/browser/view/program-panel.ts:60-240`, `:440-600` — `nextShown`, `shownContent`, the run panel's `render`
  and `update`, the panel of Programy: what the panel does when it is, and is no longer, updated.
- `src/browser/view/game-view.ts:100-590` — the callers of `renderScreens`, `show`, `resolveScreen` use,
  `onDelete`, the controls: the reach of the fix in the view.
- `src/browser/sim/game.ts:240-260`, `:371-410` and `grep countsProgram` over `src/` (`game.ts`, `programs.ts:480-530`,
  `saved-game.ts:1188-1195`, `types.ts:388-394`) — when `countsProgram` is set, kept and cleared, for B1 and the
  guard M-not-run.
- `grep mapRunStarted` over `src/browser` and `restart` in `game.ts` — that a send and „Restart” carry the event
  the panel needs, for B2's side effect and N1.
- `grep addEventListener` on `document`/`window` in `src/browser/view/` — that the stale hidden run panel has no
  listener that could act.
- `docs/task-cycles/ekrany-i-menu/reports/review_whole.md` lines around its checks — how the earlier reviewer
  joined `node_modules` to a separate worktree.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` — before the `sed` mutation commands (user instruction).

## Searches not found or unclear

- `tests/quality/test_quality_invariants.py` in a fresh worktree needs `.runs/quality-venv`, which `git worktree
  add` does not bring; its first run failed on that and was rerun with the venv joined. Not a defect of the change.
- none else.
