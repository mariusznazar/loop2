# Handoff — the executor of slice 10, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `3966b24e`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 10 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-10/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-10-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- the plan's *Foundation entries* row 3, as the foundation step wrote it — find it in `foundations/` by its heading: D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- `foundations/decisions.md:671-715` D-213 (plan: 659-702)
- `foundations/invariants.md:1048-1056` save-version
- `guidelines/coding.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `src/browser/sim/saved-game.ts`
- `src/browser/sim/types.ts:480-546`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 172-172 (spec: Decision 10)

- **Saved game** (`tests/sim/saved-game.test.mjs`, trust boundary `save-version`): the document of version 9 without `judgings`, with the moment of the game and with programs of revision 0 and above, loading whole, rewritten without a raise with the comment `guidelines/coding-saved-game.md` asks for; a document holding a `judgings` key refused as shape; a program's revision refused missing, below 0, not a whole number and beyond the safe integers; the moment admitted at zero, below zero and far ahead, and refused missing, as no integer and beyond the safe integers; the version-8 document still refused as version. `tests/sim/saved-game-judgings.test.mjs` loses its reason and goes, with its entry in the lists of the gate.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 10 — the document of version 9 holds no judging

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds no
  `judgings` and loads whole into the game state it describes, still with the content revisions and
  the moment Slice 2 gave it, rewritten without a raise of the version under the comment Slice 2
  wrote; the cases of the first run that built remembered judgings through the document go, with
  remark 1 of the human as their reason; a document holding a `judgings` key is refused as shape (spec
  Decision 10, third item). A line `decision:` of the file that quotes a passage the Foundation
  entries changed follows it. The code of the load is Slice 9's: where a case fails because of the
  load, stop and report it rather than change the load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation
  entries row 1 · Foundation entries row 3 · `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes a direct refusal case of the trust boundary `save-version`.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the case of the refused `judgings` key seen
  failing once against a scratch copy of the load that still reads it) ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation)
- **Depends on:** Slice 2 · Slice 9

## Notes of the orchestrator for this slice

- Slice 9 is made (`3966b24e`): the first run's remembered judgings are gone from the game state and from the strict load of `saved-game.ts`; a document of version 9 that carries a `judgings` key is refused as `shape` (that direct refusal case stands in `tests/sim/judging-record.test.mjs`, written by Slice 9: do not duplicate it). `tests/sim/saved-game.test.mjs` fails (21 of 45 cases, the executor of Slice 9 reports) because its document of version 9 still holds the first run's `judgings` keys and cases: you rewrite the document **without** judgings (the content revision and `madeAtMs` it already holds from Slice 2 stay), and delete the cases that tested judgings; the version stays 9 (raised and not deployed; `guidelines/coding-saved-game.md`'s exception — keep the comment over the document that says so); the document of version 8 stays one refused as another version. Where a case of the trust boundary there still names a judging, it names the loop's counts or the program's revision instead. Run the file before and after (exit codes); the foundation check shows no error; no full gate; ESLint, Prettier.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
