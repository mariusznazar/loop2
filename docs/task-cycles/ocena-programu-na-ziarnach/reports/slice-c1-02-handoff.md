# Handoff — the executor of slice 2, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `730863c3`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 2 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-2/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-02-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 2, as the foundation step wrote it — find it in `foundations/` by its heading: The content revision of a program (0 when a program is made — created, saved from a copy as new, pulled from a previous save, the first program of a new game — and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename); the foundation step
- the plan's *Foundation entries* row 3, as the foundation step wrote it — find it in `foundations/` by its heading: D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- the plan's *Foundation entries* row 5, as the foundation step wrote it — find it in `foundations/` by its heading: D-386 — Which game states does the load of a saved game state admit? (the moment the game was made is a stored moment of any sign; a program's content revision any safe integer from 0)
- the plan's *Foundation entries* row 8, as the foundation step wrote it — find it in `foundations/` by its heading: D-206 — What happens to a saved game state of another version? (the judgings remembered in the browser are no part of the saved game state, and a game started anew shows none of the discarded game's judgings); the foundation step judges whether D-402 needs the same sentence for „Zacznij od zera” and
- `foundations/decisions.md:671-715` D-213 (plan: 659-702)
- `foundations/decisions.md:10760-10782` D-369 (plan: 10703-10724)
- `foundations/invariants.md:1048-1056` save-version
- `guidelines/coding.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `src/browser/sim/saved-game.ts`
- `src/browser/sim/types.ts:85-100`
- `src/browser/sim/types.ts:480-546`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 66-70 (spec: Decision 2)

### 2. What validates a cached judging: the program's content revision and the character's generation, compared at reading

**The content revision.** Each program of the player's list carries a content revision: a whole number from 0, part of the saved program beside its number, name and content (`SavedProgram`), not part of the content (`Program`). It is 0 for every new program — the first program of a new game, one made by „Nowy program” (`createProgram`), a copy saved as a new program (`saveCopyAsNewProgram`) and each program the previous-save pull appends (`appendPrograms`, D-401). It rises by one at every save into a listed program after which the program's rules, rule groups with their order or trip plan differ from before — compared as plain data by `sameData` over the groups and the trip plan, the identity counters `nextGroupId` and `nextRuleId` left out, as the first run's `judgingsAfterSave` compared — and nowhere else: not at a rename, not at a save that changes none of the three, not at a pick, a switch, a send, a deletion of another program or the start of an earning loop. The one place that raises it is the function every content write passes through, `withProgramSaved`, so `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill rule the game writes (D-123) raise it with no code of their own. The map run's copy (`ProgramCopy`) and the earning loop hold content only and carry no revision: a copy saved into its program raises the program's revision where the content differs; a copy saved as a new program makes a program of revision 0.

**The check.** A cached judging is stored with the content revision of the program it judged and the generation number of the character it judged for. At reading, against the game state at hand, it stands only where all hold: the character of the triple is on the team with the stored generation; the program of the triple is on the player's list with the stored content revision; the stored results number as many as the data's seeds of a judging. Otherwise it shows nothing, as where nothing is cached.

### lines 95-99 (spec: Decision 3)

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state (`app.ts:312`), a load refused — as another version, as an archetype the data lack or as shape — through `startFrom` (`app.ts:89-93`), and a reset of D-402 (`page-game-acts.ts:187`); the conflict reload that finds no save on the server goes through the first of these. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

The two files of the balance instrument that make games, `balance/engine.mjs:94` and `balance/campaign.mjs:169`, pass a fixed number as the moment, never the clock (`balance-instrument-repeatability`); no measurement reads it.

### lines 172-172 (spec: Decision 10)

- **Saved game** (`tests/sim/saved-game.test.mjs`, trust boundary `save-version`): the document of version 9 without `judgings`, with the moment of the game and with programs of revision 0 and above, loading whole, rewritten without a raise with the comment `guidelines/coding-saved-game.md` asks for; a document holding a `judgings` key refused as shape; a program's revision refused missing, below 0, not a whole number and beyond the safe integers; the moment admitted at zero, below zero and far ahead, and refused missing, as no integer and beyond the safe integers; the version-8 document still refused as version. `tests/sim/saved-game-judgings.test.mjs` loses its reason and goes, with its entry in the lists of the gate.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 2 — the document of version 9 holds the revision and the moment

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds the content
  revision of each program — programs of revision 0 and above — and the moment the game was made,
  and loads whole into the game state it describes; it is rewritten without a raise of the version,
  with the comment over it that `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z
  kształtem”, asks for (no saved game state of version 9 exists anywhere, since the change has not
  reached a server). The document of version 8 is still refused as version. New cases of the trust
  boundary `save-version`, built from the document changed at one place: a program's revision
  refused as shape where it is missing, below 0, not a whole number and beyond the safe integers;
  the moment admitted at zero, below zero and far ahead, and refused as shape where it is missing,
  no integer and beyond the safe integers (spec Decision 10, third item). The first run's judgings
  stay in the document for now (Slice 10 takes them out). Every line `decision:` of the file that
  quotes a passage the Foundation entries changed — D-440's first sentence among them — follows the
  new passage. The code of the load is Slice 1's: read `src/browser/sim/saved-game.ts` as it stands
  after Slice 1; where a case fails because of the load, stop and report it rather than change the
  load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-70` Decision 2 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation entries
  row 2 · Foundation entries row 3 · Foundation entries row 5 · Foundation entries row 8 ·
  `foundations/decisions.md:659-702` D-213 · `foundations/decisions.md:10703-10724` D-369 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:85-100` · `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes the direct refusal cases of the trust boundary `save-version`
  for the two new fields.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the new refusal cases seen failing once
  with the reading of each field taken out of a scratch copy of the load) ·
  `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  `tests/sim/saved-game.test.mjs`)
- **Depends on:** Slice 1 · Foundation entries row 3 · row 5

## Notes of the orchestrator for this slice

- Slice 1 is made (commits `056c2545`, `730863c3`): each saved program carries `contentRevision` (a safe integer from 0, in `SavedProgram`) and the game state carries `madeAtMs` (the moment the game was made); both are loaded strictly in `saved-game.ts`; `newGame` keeps a default moment. `tests/sim/saved-game.test.mjs` fails by design (20 cases) since its document lacks the two fields: you rewrite the document of version 9 in it to hold them — **the version stays 9** (raised and not deployed; `guidelines/coding-saved-game.md`'s exception on the version raised once), the first run's remembered judgings still stand in the document and the state until Slice 9–10 removes them.
- The direct refusal cases of the trust boundary (`guidelines/testing.md` "Trust boundaries", the row for `saved-game.ts`): a refused document for each new field — the revision missing, a non-integer, negative, beyond safe integers; the moment missing, a string, non-finite — as `shape` and no throw. Where `tests/sim/content-revision.test.mjs` already holds a load case, do not duplicate it: say in the report which you kept where.
- Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence; the quotations of D-440's first sentence in this file are yours (the sentence changed: shorten the quotation to what stands now, or take the new sentence as it reads), the foundation check should show no error for this file afterwards.
- No full gate; focused: `npm test -- tests/sim/saved-game.test.mjs` before and after, `tests/sim/content-revision.test.mjs`, `tests/sim/previous-programs.test.mjs`, ESLint, Prettier.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
