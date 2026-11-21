# Handoff — the executor of slice 6, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `d84a5958`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 6 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-6/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-06-executor-report.md`.
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
- `foundations/decisions.md:9164-9178` D-409 (plan: 9115-9128)
- `foundations/decisions.md:4735-4753` D-323 (plan: 4710-4727)
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/state-store.ts:56-104`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 138-145 (spec: Decision 6 (view))

Browser view (`src/browser/view/`):

- **V1 — the judging cache, a new module (a trust boundary of `browser-view`)**: opened for one account's id and one game's moment, with a storage given to it or none, and told whether the game was built after a refused save (D-209); offers *read a triple* (gives the stored record or none, Decisions 4–5) and *remember a triple* (stores the record, Decision 5). At opening it removes, best effort, the entries of the same account under another game's moment, so the storage does not grow with each reset, and, where the game was built after a refused save, the entries of this account and this game too (Decision 2); entries of other accounts are left. It is the one file that knows the stored form. It reaches no `window` itself: the storage is given to it.
- **V2 — the one place that reaches `localStorage`**: the page (the game view or the module that builds it) reaches `window.localStorage` inside a guard, since reaching it can throw, and gives V1 the storage or none.
- **The game view** gets the signed-in account's id from the page (beside the role and the previous-save privilege it gets today), opens V1 for that id, the moment of the game it is built with and its existing `afterConflict`, and gives V1 to the entry of the screen Mapy.
- **The entry of the screen Mapy (`maps-entry.ts`)**: its `judge` control runs the act of a judging through `store.act` as today (D-409), and inside the same act body, before the screen's one draw after the act, gives the record to V1 — unless the store has halted (D-323), in which case nothing is remembered. „Puść w pętlę” judges through the same control, so its judging replaces the cached one too (D-440). It gives the screen a way to read the record of a triple from V1.
- **The screen Mapy (`maps-screen.tsx`)**: each row of „Kto idzie” reads the record of its character, the program its list shows and the card's map, and draws the mark S3 gives from the state it is drawn with; what is shown under the character (the result of a judging, the waiting second click) is unchanged.
- **The page (`app.ts`, `page-game-acts.ts`)** passes the moment of the clock to the function that makes a new game on each path of Decision 3, and the account's id to the game view.

### lines 149-154 (spec: Decision 7)

### 7. Several tabs and a second device

- Two tabs of one game write different triples to different keys, so no write loses another; on one triple the last write stands, each a whole judging. A tab reads the storage at each draw of the screen Mapy, so it shows a judging another tab made at its next draw, except for a triple whose write it could not store itself (Decision 5). No listener on the `storage` event is added.
- A tab whose save the server refuses (another tab or device saved first) loads the server's game and builds it after the refused save; its opening of the cache removes this game's entries in this browser (Decision 6, V1), since judgings it made may belong to changes the server never received. The cost: the badges of that game in that browser are gone after a refused save, until judged again.
- A tab of a game that another device or tab has reset or replaced keeps reading its own game's key until its save is refused and the page loads the other game, whose moment differs.
- A second device, or a browser whose data were cleared, has no entry: no badge and no count beside „Program:” until a judging there; „Puść w pętlę” judges anew on every first click whatever is cached (D-243), so starting a loop is unchanged.

### lines 162-164 (spec: Decision 9)

### 9. Concurrency with the act and with the store

The judging changes no game state, so the store takes no result from it and saves nothing for it (it may still take and save the catch-up its reading makes first, as any act). The tests that count saves around a judging follow that (Decision 10).

### lines 175-175 (spec: Decision 10)

- **The screen** (`tests/view/maps-screen.test.mjs`, page document `tests/view/page-document.mjs`): the cases that stand today for the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their expectations, the cache built on a stand-in storage the case gives (the storage of the case's jsdom window, or a stand-in passed to the game view); a judging remembered and shown again by a screen built anew on the same storage (a reload); no mark on an empty storage (another device) until a judging; no mark for the same triple under another account or another game's moment; no mark after an edit of the program that changes its content, also after the content is changed back. `tests/view/uncaught-failure.test.mjs`: the button of a judging after an error nothing handled leaves the storage as it was. `tests/view/account-screen.test.mjs`: the saves around a judging follow Decision 9; a new game made by each page path carrying the clock's moment; a game built after a refused save showing no mark its browser had cached for it.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 6 — the screen Mapy reads the marks from the cache and the judging is remembered there

- **Goal:** the entry of the screen Mapy, `src/browser/view/maps-entry.ts`, takes a judging cache of
  Slice 5 as an option — optional until Slice 8 makes the game view give it; with none, nothing is
  remembered and no mark stands. Its `judge` control runs Slice 4's act through `store.act`, which
  catches up time first (D-409), and inside the same act body, before the screen's one draw after the
  act, gives the record to the cache, unless the store has halted (`store.halted()`, D-323), when
  nothing is remembered; the act takes no result into the store, so a judging saves nothing of its
  own (spec Decision 9). „Puść w pętlę” judges through the same control, so its judging replaces the
  cached one too (D-440). The entry gives the screen a way to read the record of a triple from the
  cache. The screen, `src/browser/view/maps-screen.tsx`, draws in each row of „Kto idzie” the mark
  Slice 4's function gives from the state it is drawn with and the record of its character, the
  program its list shows and the card's map, read at each draw (a tab shows another tab's judging at
  its next draw, spec Decision 7); what stands under the character — the result of a judging, the
  waiting second click — is unchanged, and the first run's `judgingMark` and `state.judgings` are no
  longer read. The failing tests come first, in `tests/view/maps-screen.test.mjs`, with the cache built
  on a stand-in storage the case gives (spec Decision 10, sixth item): the cases that stand today for
  the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their
  expectations; a judging remembered and shown again by a screen built anew on the same storage; no
  mark on an empty storage until a judging; no mark for the same triple under another account or
  another game's moment; no mark after an edit that changes the program's content, also after the
  content is changed back; nothing remembered after the store halted. The cases that build
  `judgings` into the game state or use `judgeAndRemember` follow this change, with the remark 1 of
  the human and the new decision as their reason (`guidelines/testing.md`, „Changing an existing
  test”); a line `decision:` quoting a passage of D-440 the Foundation entries changed follows it.
  `tests/view/account-screen.test.mjs` turns red here where it counts the save of a judging: do not
  change or run it; Slice 7, made next, follows it. Read `src/browser/sim/judging-record.ts`,
  `src/browser/sim/judging.ts` and `src/browser/view/judging-cache.ts` as Slices 4 and 5 left them.
- **Change:** `src/browser/view/maps-entry.ts` · `src/browser/view/maps-screen.tsx` ·
  `tests/view/maps-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:175-175` Decision 10 · Foundation entries
  row 1 · Foundation entries row 3 · `foundations/decisions.md:9115-9128` D-409 ·
  `foundations/decisions.md:4710-4727` D-323 · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts:56-104`
- **Model:** same — the switch of the screen from the game state to the cache, inside the act and the
  one draw after it, is the correction's view at its core.
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new cases written first, failing) ·
  `npm test -- tests/view/judging-lines.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 4 · Slice 5 · Foundation entries row 1 · row 3

## Notes of the orchestrator for this slice

- Slices 1–5 of the correction are made. In the simulation: the content revision per saved program, `madeAtMs`, and in `judging-record.ts` / `judging.ts` the pure record (`recordOfJudging`), the mark (`markOfRecord`) and the act `judgeAndRecord` that leaves the game state as it was. In the view: `src/browser/view/judging-cache.ts` (Slice 5: the module that reads and writes the browser's storage; a trust boundary) — read its exports as they stand. The foundation entries at `4d813606` (D-441, D-440, D-243, D-329, D-325 — read those your *Read* names whole).
- Your slice: the screen Mapy ("Kto idzie") reads the mark of the program the list shows from the cache and a judging is remembered there: the act of a judging (through `store.act`, D-409: it catches up time first; the judging changes no game state, so the game saves nothing after it) hands its record to the cache; the mark beside „Program:” is computed from the cached record with `markOfRecord` and the validity check against the game state at hand; „Puść w pętlę”'s comparison of a result with the standing one is unchanged. The cache reaches the screen as an argument/interface of the screen's entry (`maps-entry.ts`): Slice 8 makes the page open it and pass it; until then the page shows no mark (the planner's recorded choice: between Slices 6 and 8 the running page shows no mark and remembers no judging; the finished change has no such gap) — your tests give the screen a cache of their own (a stand-in or the cache over jsdom's storage). The first run's reading of the remembered judgings from the game state (`state.judgings`…) stays in the simulation until Slice 9: the screen stops reading it.
- The first run's cases of `tests/view/maps-screen.test.mjs` for the mark, the note of the stock, the erasing by a rule change etc. follow: a case whose expectation was „the mark stands from the game state” now gives the cache the record; the erasing cases (a change of rules, groups or plan; a death; a deleted program) become cases of the validity check through the revision and the generation (the simulation's own cases are Slice 4's; here the screen shows no mark when the record is stale); `decision:` lines quoting D-440/D-441 follow the new wording word for word. Read `tests/view/maps-screen.test.mjs` by search (it is large), the whole of `src/browser/view/maps-screen.tsx` and `maps-entry.ts`.
- UI: the styleguide (`guidelines/styleguide-browser-view.md`, read whole — the root AGENTS.md requires it for every file of the part, tests included) and `src/browser/AGENTS.md`; inspect your own screenshot of the screen in the running game if the way in `.claude/skills/loop2-play/SKILL.md` works (a judging shows its mark after you pass the cache by a stand-in? — if not possible until Slice 8, say so), **push none, keep none**, close the browser (WAY-319). No full gate; ESLint, Prettier, typecheck, size rules, `npm test -- tests/view/maps-screen.test.mjs` and the neighbours your *Checks* name; `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
