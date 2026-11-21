# Handoff — the executor of slice 1, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `a65b8fa4`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 1 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-1/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-01-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `guidelines/coding.md`
- `guidelines/testing.md`
- `foundations/decisions.md:1167-1181` D-49 (plan: 1167-1181)
- `foundations/decisions.md:1697-1709` D-431 (plan: 1697-1709)
- `foundations/decisions.md:1280-1306` D-256 (plan: 1280-1306)
- `foundations/decisions.md:1148-1162` D-432 (plan: 1148-1162)
- `foundations/invariants.md:1188-1197` local-start-access
- `foundations/part_map.md:90-125` build-tools
- `scripts/local-start.mjs`
- `tests/invariants/loop2_invariant_support.py`
- `tests/flaky-tests.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 52-52 (To do)

13. Przy okazji, w tej samej części testów (dopisane przez doradcę dnia w imieniu Mariusza z „Findings outside the task's scope” prośby https://github.com/mariusznazar/loop2/pull/166): przypadek `test_a_start_on_its_way_up_is_not_taken_for_ended` w `tests/invariants/test_local_start_access.py` pada losowo w CI z `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>` — port, na którym test sam startuje grę, bywa zajęty — a pojedynczy czerwony przypadek zatrzymuje bramkę przed kontrolą fundamentu. Test bierze port tak, żeby kolizja nie mogła wystąpić (np. port wolny w chwili startu, podany przez system), bez zmiany tego, co sprawdza; prośba o scalenie mówi, skąd brała się kolizja.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 1 — the local start's test takes a port that cannot collide

- **Goal:** the case `test_a_start_on_its_way_up_is_not_taken_for_ended` of
  `tests/invariants/test_local_start_access.py` no longer fails at random with
  `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>`: find from the test and from
  `scripts/local-start.mjs` where the port of the collision comes from and how two starts can meet
  on it, and make the test take its ports so that no collision can happen — a port the system
  names free at the moment of the start, as D-49 gives for the tests that start a server — without
  changing what any case of the file checks (no control case and no expected value changes,
  `guidelines/testing.md`, "Changing an existing test"). State in the report, for the request, where
  the collision came from. If the fix needs a change of `scripts/local-start.mjs` (a trust boundary
  of `build-tools`) rather than of the test, change nothing there and return with the cause and the
  change it would need. The register `tests/flaky-tests.md` holds no entry of this case, so nothing
  is removed from it. No file of the game changes.
- **Change:** `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:52-52` To do ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/decisions.md:1167-1181` D-49 ·
  `foundations/decisions.md:1697-1709` D-431 · `foundations/decisions.md:1280-1306` D-256 ·
  `foundations/decisions.md:1148-1162` D-432 · `foundations/invariants.md:1188-1197`
  local-start-access · `foundations/part_map.md:90-125` build-tools · `scripts/local-start.mjs` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/flaky-tests.md`
- **Model:** same — the cause of a collision that shows only at random in CI has to be found by
  diagnosis before the fix, which no pattern gives.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`; the case alone run several
  times in a row with `python -B -m unittest` from `tests/invariants`, as a diagnosis of the
  collision (`guidelines/testing.md`, "Flaky tests"), with each run's result in the report.
- **Depends on:** none

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
