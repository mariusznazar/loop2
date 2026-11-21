# Handoff — the executor of slice 7, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `d0cf581b`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 7 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-7/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-07-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- `foundations/decisions.md:3955-4034` D-207 (plan: 3934-4012)
- `foundations/decisions.md:8818-8883` D-243 (plan: 8769-8833)
- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 162-164 (spec: Decision 9)

### 9. Concurrency with the act and with the store

The judging changes no game state, so the store takes no result from it and saves nothing for it (it may still take and save the catch-up its reading makes first, as any act). The tests that count saves around a judging follow that (Decision 10).

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 7 — the page tests of the account screen follow a judging that saves nothing

- **Goal:** the cases of `tests/view/account-screen.test.mjs` that expect a save of a judging — the
  act of „Puść w pętlę” at its first click, its second click „Puść mimo to” waiting behind the save of
  the first, the helper `startLoopOf` — follow spec Decision 9: a judging changes no game state, so
  the store saves nothing for it; the saves a case expects are the ones of the catch-up its reading
  makes, where it makes one, and of the start of the earning loop; the import of `judgeAndRemember`
  and the expected states built with it go, the expected state after a judging being the state before
  it. The reason of each change is remark 1 of the human and the new decision (`guidelines/testing.md`,
  „Changing an existing test”). What else a case checks stays; a line `decision:` quoting a passage
  the Foundation entries changed follows it. The file is about 360 KB: find its cases by search
  („judgeAndRemember”, „Puść w pętlę”, „Puść mimo to”, `startLoopOf`, „saveGame”) rather than
  reading it whole.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 · Foundation
  entries row 1 · `foundations/decisions.md:3934-4012` D-207 · `foundations/decisions.md:8769-8833`
  D-243 · `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md`
- **Model:** same — the cases stand in a file of 360 KB that the agent reaches by search, and each
  changed expectation needs its reason.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`
- **Depends on:** Slice 6

## Notes of the orchestrator for this slice

- Slice 6 is made (`d0cf581b`): the screen Mapy takes the cache as an argument of its entry and a judging no longer changes the game state, so **the game saves nothing after a judging** (D-207: a save follows a change of the game state; the act of a judging leaves it as it was). The cases of `tests/view/account-screen.test.mjs` that click „Oceń na 12 ziarnach” or „Puść w pętlę” (which judges first) and then count or read the saves the account's page makes (the saved-game requests of its stand-in server) follow: the expected saves no longer include one for a judging; a case that imported `judgeAndRemember` from the first run stops depending on it (the act is now `judgeAndRecord`; read how Slice 6's cases of `tests/view/maps-screen.test.mjs` call it). The page gives the entry no cache until Slice 8: where a case of this file needs a mark standing, it has none yet — change expectations only where Slice 6's change makes them untrue, with the reason (`guidelines/testing.md` "Changing an existing test"); the new page-level cases of the cache are Slice 8's, in a new file.
- The file is about 360 KB: do NOT read it whole. Find the cases by search (`Puść w pętlę`, `Oceń na 12 ziarnach`, `judgeAndRemember`, `judgings`, `saves`, `whoOf`) and read ranges. Run `npm test -- tests/view/account-screen.test.mjs` before you begin (to see which cases already fail — they are the ones to follow) and after; report both with exit codes. Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence; `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` shows no error in this file afterwards. ESLint, Prettier. No full gate.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
