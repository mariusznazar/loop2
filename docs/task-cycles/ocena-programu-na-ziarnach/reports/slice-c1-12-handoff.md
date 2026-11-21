# Handoff — the executor of slice 12, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `969d4c60`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 12 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-12/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-12-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 4, as the foundation step wrote it — find it in `foundations/` by its heading: D-04 — What is the game built with? (the view also draws from the judgings remembered in the browser's lasting storage; the game state stores the moment the game was made, which names the game)
- `foundations/decisions.md:901-915` D-437 (plan: 889-902)
- `foundations/invariants.md:1458-1466` balance-instrument-repeatability
- `foundations/part_map.md:127-137` balance-tools
- `guidelines/coding.md`
- `guidelines/coding-balance-instrument.md`
- `guidelines/testing.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 95-99 (spec: Decision 3)

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state (`app.ts:312`), a load refused — as another version, as an archetype the data lack or as shape — through `startFrom` (`app.ts:89-93`), and a reset of D-402 (`page-game-acts.ts:187`); the conflict reload that finds no save on the server goes through the first of these. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

The two files of the balance instrument that make games, `balance/engine.mjs:94` and `balance/campaign.mjs:169`, pass a fixed number as the moment, never the clock (`balance-instrument-repeatability`); no measurement reads it.

### lines 147-147 (spec: Decision 6 (balance))

Balance instrument: `balance/engine.mjs` and `balance/campaign.mjs` pass a fixed moment where they make a game (Decision 3), read under `guidelines/coding-balance-instrument.md`.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 12 — the balance instrument makes its games at a fixed moment

- **Goal:** `balance/engine.mjs` (line 94 at the base) and `balance/campaign.mjs` (line 169) pass a
  fixed number, 0, as the moment the game was made where they call `newGame`, never the clock
  (`balance-instrument-repeatability`); no measurement reads it, and every case of `tests/balance/`
  runs unchanged. The number stands where each file makes its game; whether it is one named constant
  shared through the engine is decided by `guidelines/coding-balance-instrument.md`, „Jedno miejsce
  wspólnej rzeczy”.
- **Change:** `balance/engine.mjs` · `balance/campaign.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:147-147` Decision 6 (balance) · Foundation
  entries row 4 · `foundations/decisions.md:889-902` D-437 · `foundations/invariants.md:1458-1466`
  balance-instrument-repeatability · `foundations/part_map.md:127-137` balance-tools ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/campaign.test.mjs`
  · `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py`
- **Depends on:** Slice 1 · Foundation entries row 4

## Notes of the orchestrator for this slice

- The game state has `madeAtMs` since Slice 1 (`newGame(madeAtMs = 0)` refuses a moment that is no safe integer), and each saved program carries `contentRevision`. The balance instrument calls `newGame()` at `balance/engine.mjs:94` and `balance/campaign.mjs:169` (find them by search) and builds saved programs in `balance/campaign.mjs` (about lines 174–181) **without `contentRevision`** — the review of Slice 1 found that their revision becomes `NaN` at the first content write (no measurement reads it, but it is a malformed saved program): give them the revision 0 the way the game does.
- Your slice: the instrument makes its games at a **fixed moment**, never the clock (the invariant `balance-instrument-repeatability`: no file of `balance/` reads the system clock or draws a random number from a source other than the seed of its measurement). Read `guidelines/coding-balance-instrument.md` whole before you change a file of that kind (the rules „Liczba gry” and „Jedno miejsce wspólnej rzeczy”): where the fixed moment lives — one place in the instrument, as a parameter of the measurement, not a copy of a game's number (the game's default is 0): choose and say why in the report; the other file takes it from there. Keep the instrument's results unchanged: its tests (`tests/balance/*`) pass as they are; a test that the change makes untrue follows only with its reason. Quote every `// decision:` line word for word. No full gate; focused: `npm test -- tests/balance/engine.test.mjs`, `agreement`, `trace`, `campaign`, `cli`, `npm test -- tests/invariants/test_balance_instrument_repeatability.py`, `test_cross_part_imports.py`, ESLint, Prettier.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
