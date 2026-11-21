# Handoff — the executor of slice 1, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `4d813606`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 1 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-1/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-01-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 2, as the foundation step wrote it — find it in `foundations/` by its heading: The content revision of a program (0 when a program is made — created, saved from a copy as new, pulled from a previous save, the first program of a new game — and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename); the foundation step
- the plan's *Foundation entries* row 4, as the foundation step wrote it — find it in `foundations/` by its heading: D-04 — What is the game built with? (the view also draws from the judgings remembered in the browser's lasting storage; the game state stores the moment the game was made, which names the game)
- the plan's *Foundation entries* row 5, as the foundation step wrote it — find it in `foundations/` by its heading: D-386 — Which game states does the load of a saved game state admit? (the moment the game was made is a stored moment of any sign; a program's content revision any safe integer from 0)
- the plan's *Foundation entries* row 6, as the foundation step wrote it — find it in `foundations/` by its heading: D-165 — How does the game state tell one program from another? (the judging the browser remembers names its program by its number; and the content revision, if the foundation step places it here)
- the plan's *Foundation entries* row 12, as the foundation step wrote it — find it in `foundations/` by its heading: the moment the game was made; the content revision of a program
- `foundations/decisions.md:7558-7597` D-123 (plan: 7533-7571)
- `foundations/decisions.md:671-715` D-213 (plan: 659-702)
- `foundations/invariants.md:1048-1056` save-version
- `foundations/invariants.md:214-224` simulation-isolation
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:858-866` saved-program-edit
- `foundations/glossary.md:25-31` program (plan: 25-30)
- `foundations/glossary.md:180-185` copy (plan: 180-184)
- `foundations/part_map.md:33-64` simulation
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 11-28 (spec: Goals and non-goals)

## Goals and non-goals

Goals:

1. The saved game state holds no judging. Its version stays 9, raised once in this change and not deployed; the shape of version 9 is the shape before the first run's judgings with the loop record (D-241), the content revision of each saved program (Decision 2) and the moment the game was made (Decision 3).
2. The last judging of each character–program–map triple of one game of one account is kept in the browser's lasting storage (`localStorage`) and shown beside „Program:” as today, the note on the stock included.
3. A cached judging is erased in effect — never shown again — by every save that changes the program's rules, groups with their order or trip plan, A→B→A included and on every device, by a death that takes the character's practice and ranks, and by the program's deletion; it stays through a rename, a save that changes none of the three, a covered death, a death with no practice and a bought rank. No function of the simulation reaches the cache.
4. A judging of one account never shows for another account, and a judging of one game never shows in another game of the same account (a game after „Zacznij od zera”, D-402, and after a discarded save, D-206).
5. A corrupt, foreign or oversized value in the storage, a full storage and a storage the browser refuses never break the page: a value it cannot read shows nothing, and a judging it cannot write still stands for the open page.
6. No file of the simulation touches storage; the cache is one module of the browser view. No hash function is written.

Non-goals:

- No change to the judging itself (D-439), to the result shown under the character, to the flow of „Puść w pętlę” and „Puść mimo to” (D-243), or to the texts and roles (D-329, styleguide).
- No limit of time and no eviction policy beyond what Decision 8 gives; no measure of the browser's quota.
- No sharing of judgings between devices; another device shows no badge until a judging is made there (cost the human accepted).
- Not designed here, taken by planning as the handoff gives: remark 3 (the sentence „Wróć do niego i je zakończ” in a row of „Kto idzie” becoming a link to the open manual map run's screen) and remark 4 (the title of the trust-boundary case of `tests/sim/previous-programs.test.mjs` and `guidelines/testing.md:177` naming no highest version). Remark 2 is let through.
- The fallback of remark 1 — a shortened judging in the saved game with the removal of the least recently used judgings before the limit — is not designed: no entry of the foundation forbids the cache (Decision 1).

### lines 66-107 (spec: Decisions 2 and 3)

### 2. What validates a cached judging: the program's content revision and the character's generation, compared at reading

**The content revision.** Each program of the player's list carries a content revision: a whole number from 0, part of the saved program beside its number, name and content (`SavedProgram`), not part of the content (`Program`). It is 0 for every new program — the first program of a new game, one made by „Nowy program” (`createProgram`), a copy saved as a new program (`saveCopyAsNewProgram`) and each program the previous-save pull appends (`appendPrograms`, D-401). It rises by one at every save into a listed program after which the program's rules, rule groups with their order or trip plan differ from before — compared as plain data by `sameData` over the groups and the trip plan, the identity counters `nextGroupId` and `nextRuleId` left out, as the first run's `judgingsAfterSave` compared — and nowhere else: not at a rename, not at a save that changes none of the three, not at a pick, a switch, a send, a deletion of another program or the start of an earning loop. The one place that raises it is the function every content write passes through, `withProgramSaved`, so `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill rule the game writes (D-123) raise it with no code of their own. The map run's copy (`ProgramCopy`) and the earning loop hold content only and carry no revision: a copy saved into its program raises the program's revision where the content differs; a copy saved as a new program makes a program of revision 0.

**The check.** A cached judging is stored with the content revision of the program it judged and the generation number of the character it judged for. At reading, against the game state at hand, it stands only where all hold: the character of the triple is on the team with the stored generation; the program of the triple is on the player's list with the stored content revision; the stored results number as many as the data's seeds of a judging. Otherwise it shows nothing, as where nothing is cached.

What each erasing of the task becomes:

| Task, *To do* 6 / D-440 | With the cache |
|---|---|
| a save after which the rules, the groups with their order or the trip plan differ, the first-chill rule (D-123) included, A→B→A included | the revision rose; it never comes back down |
| a rename, a save that changes none of them | the revision is the same |
| a program deleted | its number is on no program of the list and is never given again (D-165) |
| a death that takes practice and ranks (`progressLost`), in a manual map run, an earning loop or the catch-up | the generation grew |
| a death covered by the resurrection, a death of a character with no practice, a bought rank | the generation is the same |
| a change of the cap or of the map's data | not compared, as today |

Because the revision travels in the saved game, the check gives the same answer on every device and after every reload.

**The revision is a counter, not a hash; no hash function remains.** The limit of a counter, named and accepted: a revision or a generation that went back. Where a change whose save never reached the server is lost — the page closed with the save failing (D-208), or a save refused for another browser's (D-209) — a judging this browser made after that change is cached with a revision (or generation) the server's game never had; if the program later reaches the same revision with other content, with no judging of the triple between, that judging would stand beside it. Two things narrow it: the page removes this game's cached judgings in this browser when it builds the game after a refused save (Decision 7), which covers the case of D-209; the case of a page closed with an unsaved change stays, and it needs the change's save to fail, a judging in that window, and later edits reaching exactly the same count with no judging between; the wrong mark lasts until the next judging of the triple or the next change of the program. Rejected way to close it: the revision as the real moment of each change, passed from the clock to every function that writes content (`editProgram`, `saveCopyIntoProgram`, `setProgram`, and the passing of game time for the first-chill rule) — never repeats, but a clock argument on four functions and their tests for a case of a failed save.

Ways weighed:

- **A content revision of each saved program, compared at reading (chosen).** Exact to *To do* 6 and the human's remark on every device, A→B→A included; no hash; costs one field of the saved program at the version 9 already raised, its strict load, and the previous-save reader's knowing of the field (Decision 6).
- **A fingerprint (hash) of the program's content, compared at reading.** Rejected after the review: a program changed A→B→A shows A's judging again, while the task and the remark say the change to B erases it (`reports/spec-review-report.md`, Finding 1).
- **Hooks kept in the view: the store hands the cache each new state with the one before it, and the cache erases what changed.** Rejected: a second path beside the check at reading, which is still needed for a reload, another tab and another device, and a write to storage on edits.

Where the validity lives: in the simulation, as pure functions (Decision 6, units S1–S3), so the cases are tested at the lowest level with no page.

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state (`app.ts:312`), a load refused — as another version, as an archetype the data lack or as shape — through `startFrom` (`app.ts:89-93`), and a reset of D-402 (`page-game-acts.ts:187`); the conflict reload that finds no save on the server goes through the first of these. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

The two files of the balance instrument that make games, `balance/engine.mjs:94` and `balance/campaign.mjs:169`, pass a fixed number as the moment, never the clock (`balance-instrument-repeatability`); no measurement reads it.

Collision: two games of one account made in the same millisecond of the browsers' clocks; only one of them survives the server's revision check (D-209), so the risk is taken.

Ways weighed:

- **The moment in the game state (chosen).** Tells games apart on every device; costs one field of the saved game at the version 9 already raised, one more moment in D-386, and the argument of the new game in the page's paths, in the balance instrument's two calls and in the tests that make games. The simulation does not read it; D-04's *complies* admits a stored moment of an event, and D-04 is changed to name it as the game's identity.
- **A random token from the view in place of the moment.** Same cost and a text to check at the load; no gain.
- **No new field: the key names the account alone, and the page clears that account's judgings whenever it makes a new game.** Rejected: a reset or a discard made on another device — every deployment that raises the version — is loaded on this device, not made here, so nothing clears, and the old game's keys answer in the new game, against the remark („żeby ocena z jednej gry nie pokazała się w innej”).

### lines 126-136 (spec: Decision 6 (simulation))

### 6. Where the code lives

Simulation (`src/browser/sim/`, pure, no storage, held by `simulation-isolation` and `simulation-inputs`):

- **S1 — the content revision of a saved program**: a field of `SavedProgram` (Decision 2), 0 in `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms`, raised by one in `withProgramSaved` where `sameData` finds the groups or the trip plan different, kept as it is by `renameProgram` and every other function that copies a saved program. `withProgramSaved` goes back to giving the list of programs alone (as before `3218a620`, when its callers used `withProgramContent`), now with the revision raised; its callers take the list as before slice 7. The save writes the field; the strict load reads it as a safe integer from 0, the item of the list holding exactly `id`, `name`, `program` and the revision, built from new values (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”); nothing compares it with anything at the load. The previous-save reader (`previous-programs.ts`) reads an item of a document of version 9 or above only where its keys are exactly `id`, `name`, `program` and the revision, and one of a version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value, like `id`'s, is neither read nor checked, since the pull makes a new program of revision 0.
- **S2 — the record of a judging**: takes the game state the judging read, the triple and the judging, gives what the cache stores — the kinds of the twelve results, the equipment, the content revision of the triple's program in that state, the character's generation in that state. It replaces `rememberedOf`.
- **S3 — the mark**: takes the game state, the triple and a record or none, gives the mark beside „Program:” — the count solved, all twelve, the note on the stock (less of an item in the chest than the record took), the badge — or none where no record is given or it does not stand (Decision 2). It replaces today's `judgingMark`, whose result type `JudgingMark` stays.
- **The act of a judging**: gives the judging and its record, made from the one state it read, and leaves the game state as it was (the very state). It replaces `judgeAndRemember`; whether it still answers as a `GameResult` is the maker's.
- **The moment the game was made**: a field of `GameState`, given to the function that makes a new game, written by the save and read by the load (Decision 3).
- **Goes away**: `GameState.judgings`; the types `RememberedJudging` and `RememberedJudgings`; `withRememberedJudging`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`, `judgingsAfterDeath`; the judgings half of `withProgramSaved`; the removal of judgings in `deleteProgram`; the erasing in `settleDeath` and in `takeEnd`; the reading and writing of `judgings` in `saved-game.ts` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the seed kinds there if nothing else reads them). Of the five places slice 7 hooked for a change of content, the four that write content now raise the revision through `withProgramSaved`, and the deletion needs nothing (D-165); of the two places hooked for a death, both need nothing (the generation grows there already). The death functions and `deleteProgram` go back to what they did before `3218a620`, keeping every other change made since.
- **Stays**: `judgeOnSeeds`, the types `SeedResult` and `Judging`, the mark's meaning, the loop record.

### lines 170-172 (spec: Decision 10)

- **Simulation, unit — the content revision** (`tests/sim/program-list.test.mjs`, `tests/sim/copy.test.mjs` or a file of the maker's choosing): 0 for the first program of a new game, a created program, a copy saved as a new program and each appended program; raised by one by an edit, a save of the copy into its program and `setProgram` that change a rule, add or remove one, swap two rules or two groups, change a group's condition or change the take or bring list; raised by the first-chill rule the game writes; raised twice by A→B→A; unchanged by a rename, by an edit or a save of the copy that changes none of the three (also where the objects' keys were made in another order), by a change of the identity counters alone, and by the deletion of another program.
- **Simulation, unit — the record and the mark** (rewriting `tests/sim/judging-record.test.mjs`; `tests/sim/judging.test.mjs` for the act): the record holding the revision and the generation of the state the judging read; the mark none for no record; none for a record whose program is deleted, whose character is not on the team, whose generation is below the character's after a death with `progressLost` — in a manual map run, an earning loop and the catch-up — and whose revision differs, the A→B→A case included; standing after a covered death, a death with no practice, a bought rank and a rename; the stock cases as today (less in the chest gives the note and no badge, more leaves the mark); the act leaving the game state the very state it got.
- **Saved game** (`tests/sim/saved-game.test.mjs`, trust boundary `save-version`): the document of version 9 without `judgings`, with the moment of the game and with programs of revision 0 and above, loading whole, rewritten without a raise with the comment `guidelines/coding-saved-game.md` asks for; a document holding a `judgings` key refused as shape; a program's revision refused missing, below 0, not a whole number and beyond the safe integers; the moment admitted at zero, below zero and far ahead, and refused missing, as no integer and beyond the safe integers; the version-8 document still refused as version. `tests/sim/saved-game-judgings.test.mjs` loses its reason and goes, with its entry in the lists of the gate.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 1 — a content revision for each saved program and the moment the game was made, in the simulation and its load

- **Goal:** each program of the player's list carries a content revision, a whole number from 0, as
  a field of the saved program (`SavedProgram` in `types.ts`) beside its number, name and content, not
  of the content (`Program`), named apart from the revision of a save of D-209 (the name is yours,
  e.g. `contentRevision`). It is 0 for the first program of `newGame`, for a program `createProgram`
  makes, for a copy `saveCopyAsNewProgram` saves as new and for each program `appendPrograms` appends
  (D-401). It rises by one in `withProgramSaved` of `programs.ts` — the one function every write of
  content into a listed program passes through, so `editProgram`, `saveCopyIntoProgram`, `setProgram`
  of `game.ts` and the first-chill rule of `advanceMinutes` (D-123) raise it with no code of their
  own — at a save after which the program's rule groups with their order or its trip plan differ
  from before, compared as plain data by `sameData` of `programs.ts` (so the order in which an
  object's keys were made changes nothing), the counters `nextGroupId` and `nextRuleId` left out; it
  never rises at a rename, at a save that changes none of them, at a pick, a switch, a send, a
  deletion of another program or the start of an earning loop, and `renameProgram` and every other
  function that copies a saved program keep it as it is. `withProgramSaved` keeps giving the programs
  and the first run's judgings as today (Slice 9 takes the judgings out). The game state also holds
  the real moment the game was made (a field of `GameState`, name yours, e.g. `madeAtMs`):
  `newGame` takes it as an optional argument and stores it, 0 where none is given (the tests and the
  balance instrument; the page passes the clock's reading in Slice 8); no function of the simulation
  reads it or reads a clock (D-04, `simulation-isolation`). The save writes both fields, and the
  strict load of `saved-game.ts` (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”) reads an
  item of the list as exactly `id`, `name`, `program` and the revision, the revision a safe integer
  from 0, and the moment as a safe integer of any sign compared with no clock (D-386), built from new
  values; nothing at the load compares the revision with anything. The version is not raised: it is
  9 and not deployed (spec Goal 1). The failing tests come first, in a new file
  `tests/sim/content-revision.test.mjs`, which `stryker.config.json` lists: the cases of spec
  Decision 10, first item — 0 for each made program; one rise for an edit, a save of the copy into
  its program and `setProgram` that change a rule, add or remove one, swap two rules or two groups,
  change a group's condition or change the take or bring list; one rise for the first-chill rule;
  two for A→B→A; none for a rename, an edit or a save of the copy that changes none of the three (also
  with the keys of the objects made in another order), a change of the identity counters alone and a
  deletion of another program — and a new game holding the moment it is made with. The cases of
  `tests/sim/program-list.test.mjs`, `tests/sim/copy.test.mjs` and `tests/sim/copy-actions.test.mjs`
  that expect a saved program as exactly a number, a name and a content follow with the revision,
  with this change as their reason (`guidelines/testing.md`, „Changing an existing test”); a trial on
  the base found these cases: copy-actions.test.mjs:213, copy.test.mjs:62 and :241,
  program-list.test.mjs:89, :264, :510 and :527. A line `decision:` of these files that quotes a
  passage of D-165 or D-386 the Foundation entries changed follows the new passage.
  `tests/sim/saved-game.test.mjs` turns red here, since its document of version 9 lacks the two
  fields: do not change or run it; Slice 2, made next, rewrites it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/content-revision.test.mjs` ·
  `tests/sim/program-list.test.mjs` · `tests/sim/copy.test.mjs` · `tests/sim/copy-actions.test.mjs` ·
  `stryker.config.json`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:11-28` Goals and non-goals ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-107` Decisions 2 and 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:170-172` Decision 10 ·
  Foundation entries row 2 · Foundation entries row 4 · Foundation entries row 5 · Foundation
  entries row 6 · Foundation entries row 12 · `foundations/decisions.md:7533-7571` D-123 ·
  `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:858-866` saved-program-edit · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:180-184` copy · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — the content revision is the core of the correction's check, and the slice
  changes the strict load at a trust boundary.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/content-revision.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/copy.test.mjs` ·
  `npm test -- tests/sim/copy-actions.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_copy_save.py`
- **Depends on:** Foundation entries row 2 · row 4 · row 5 · row 6

## Notes of the orchestrator for this slice

- Correction 1 of the open request. The foundation step has written the plan's entries (commit `4d813606`: D-441 new — where the judgings lie; D-442 new — the content revision of a program; D-440, D-04, D-386, D-165, D-401, D-206, D-287 changed; the invariants `previous-save-programs-reader` changed and `judging-cache-reading` new; the glossary term `content revision`): read the entries your *Read* names where they now stand; the foundation check shows 12 quotation errors at test lines that Slices 2, 3, 4 and 9 follow — leave those owned by other slices.
- The trial of the planner (reports/planner-2-trial-output.txt) shows which cases fail when the two fields are added: 20 in the saved-game test document (`tests/sim/saved-game.test.mjs`, which Slice 2 rewrites — not yours) and 7 named cases in `tests/sim/copy.test.mjs`, `copy-actions.test.mjs` and `program-list.test.mjs` (yours where your *Change* names them). `newGame` keeps a default moment of 0 (a required argument would change 237 calls in 73 test files); the page passes the clock's moment in Slice 8.
- A new test file under `tests/sim/` has to be listed in `stryker.config.json` (`tests/quality/test_mutation_test_selection.py`); say in the report when you add a line there (outside your *Change*).
- Write the failing cases first and show them red. Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence. Run the focused checks of your slice, ESLint (`npx eslint <changed files>`), Prettier (`npx prettier --check <changed files>`), `node tests/quality/eslint-size-rules.mjs`. No full gate.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
