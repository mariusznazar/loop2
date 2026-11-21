# Handoff — the executor of slice 8, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `7ba9d74e`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 8 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-8/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-08-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- the plan's *Foundation entries* row 4, as the foundation step wrote it — find it in `foundations/` by its heading: D-04 — What is the game built with? (the view also draws from the judgings remembered in the browser's lasting storage; the game state stores the moment the game was made, which names the game)
- the plan's *Foundation entries* row 8, as the foundation step wrote it — find it in `foundations/` by its heading: D-206 — What happens to a saved game state of another version? (the judgings remembered in the browser are no part of the saved game state, and a game started anew shows none of the discarded game's judgings); the foundation step judges whether D-402 needs the same sentence for „Zacznij od zera” and
- `foundations/decisions.md:4067-4113` D-209 (plan: 4046-4091)
- `foundations/decisions.md:4321-4337` D-402 (plan: 4296-4311)
- `foundations/decisions.md:4735-4753` D-323 (plan: 4710-4727)
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `tests/view/previous-save.test.mjs:37-160`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 95-107 (spec: Decision 3)

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state (`app.ts:312`), a load refused — as another version, as an archetype the data lack or as shape — through `startFrom` (`app.ts:89-93`), and a reset of D-402 (`page-game-acts.ts:187`); the conflict reload that finds no save on the server goes through the first of these. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

The two files of the balance instrument that make games, `balance/engine.mjs:94` and `balance/campaign.mjs:169`, pass a fixed number as the moment, never the clock (`balance-instrument-repeatability`); no measurement reads it.

Collision: two games of one account made in the same millisecond of the browsers' clocks; only one of them survives the server's revision check (D-209), so the risk is taken.

Ways weighed:

- **The moment in the game state (chosen).** Tells games apart on every device; costs one field of the saved game at the version 9 already raised, one more moment in D-386, and the argument of the new game in the page's paths, in the balance instrument's two calls and in the tests that make games. The simulation does not read it; D-04's *complies* admits a stored moment of an event, and D-04 is changed to name it as the game's identity.
- **A random token from the view in place of the moment.** Same cost and a text to check at the load; no gain.
- **No new field: the key names the account alone, and the page clears that account's judgings whenever it makes a new game.** Rejected: a reset or a discard made on another device — every deployment that raises the version — is loaded on this device, not made here, so nothing clears, and the old game's keys answer in the new game, against the remark („żeby ocena z jednej gry nie pokazała się w innej”).

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

### lines 174-175 (spec: Decision 10)

- **The cache, unit at its trust boundary** (a new test file of `tests/view/`, marked with the new invariant, its refusal seen failing once): with a stand-in storage given to the cache — a map-backed one, one whose writes throw, one whose every call throws, and none — remember then read a triple; another account's, another game's and another version's keys never read; each crafted value of Decision 4 read as nothing with no throw, `__proto__` and `constructor` as keys of the value included, and a value over the bound not parsed; a refused write still read from the page's memory and the triple's stored value removed; two caches on one storage (two tabs) reading each other's writes; the opening removing the same account's entries of another game and leaving another account's; the opening after a refused save removing this game's entries too.
- **The screen** (`tests/view/maps-screen.test.mjs`, page document `tests/view/page-document.mjs`): the cases that stand today for the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their expectations, the cache built on a stand-in storage the case gives (the storage of the case's jsdom window, or a stand-in passed to the game view); a judging remembered and shown again by a screen built anew on the same storage (a reload); no mark on an empty storage (another device) until a judging; no mark for the same triple under another account or another game's moment; no mark after an edit of the program that changes its content, also after the content is changed back. `tests/view/uncaught-failure.test.mjs`: the button of a judging after an error nothing handled leaves the storage as it was. `tests/view/account-screen.test.mjs`: the saves around a judging follow Decision 9; a new game made by each page path carrying the clock's moment; a game built after a refused save showing no mark its browser had cached for it.

### lines 179-184 (spec: Decision 11)

### 11. Settlements of the orchestrator after the review of the revision (`reports/spec-review-2-report.md`)

The review of the revised spec found one thing the build would get wrong, and offered one narrowing. The orchestrator settles them as a question of the cycle, and the planner and the maker take these as binding:

1. **D-401 is changed, unconditionally** (not „if the foundation step finds it needs it”): its binding sentence about the keys of an item of a previous save („… takes an item only when its keys are exactly `id`, `name` and `program` …”) says, after the change, that an item of a version-9 save has exactly the four keys `id`, `name`, `program` and the content revision, that an item of an earlier version has the three keys, and that a pulled program starts at revision 0; its *Rejected* clause that rests on „the items had one shape in every version” is corrected to say that the shape changed once, at version 9, for the revision. The three lines `decision:` of `tests/sim/previous-programs.test.mjs` that quote the old sentence follow the new wording, and the invariant on the previous-save programs reader (rewritten as the spec says) and D-401 must agree. Where the foundation step finds D-209 or D-402 name the same keys, it changes them the same way.
2. **What the refused-save path closes is stated exactly.** The spec's claim that clearing a game's cached judgings after a refused save covers D-209 is true for the page that builds the game after another browser saved first, and not for a refused save at „Wyloguj”, which goes on to the login forms (D-97): the next sign-in builds the game without the refused-save flag, so that path stays open like the closed page. The planner and the maker do not claim more in a comment, a test title or a foundation sentence; the repeated-revision gap stays a rare accepted cost (a stale badge until the next judging or the next change of that program; „Puść w pętlę” always judges anew, so no loop starts on it), and the request names it.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 8 — the page makes each new game at the clock's moment and gives the game view the cache

- **Goal:** every path of the page that makes a new game passes the clock's moment to `newGame`
  (spec Decision 3): an account with no saved game state (`app.ts`, `loadGame`), a load refused as
  another version, as an archetype the data lack or as shape (`startFrom` in `app.ts`) and the reset
  of D-402 (`page-game-acts.ts`); the conflict reload that finds no save goes through the first. A
  loaded game keeps its moment. The page gives the game view the signed-in account's id beside the
  role and the previous-save privilege it gives today. `createGameView` in `game-view.ts` reaches
  `window.localStorage` inside a guard, since reaching it can throw, and opens the judging cache of
  Slice 5 with that storage or none, the account's id, the moment of the game it is built with, that
  game state and its `afterConflict`; it gives the cache to the entry of the screen Mapy, whose option
  becomes required. No other file of the page reaches the browser's storage. The failing tests come
  first, in a new file `tests/view/judging-cache-page.test.mjs`, built on the page as
  `tests/view/uncaught-failure.test.mjs` and `tests/view/previous-save.test.mjs` build it: a new game
  made by each path above carrying the clock's moment, also the reset; a reload of a saved game naming
  the same game; a game built after a refused save showing no mark its browser had cached for it; a
  mark cached under another account or another game's moment not shown. In
  `tests/view/uncaught-failure.test.mjs` the press of „Oceń na 12 ziarnach” after an error nothing
  handled leaves the browser's storage as it was. The other callers of `createGameView` in the tests
  (`chronicle-game`, `end-question`, `end-window-game`, `previous-save`, `account-screen`) run
  unchanged. Read `src/browser/view/judging-cache.ts` and `src/browser/view/maps-entry.ts` as Slices 5
  and 6 left them.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-game-acts.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/view/maps-entry.ts` ·
  `tests/view/judging-cache-page.test.mjs` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-107` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-175` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-184` Decision 11 · Foundation entries
  row 1 · Foundation entries row 4 · Foundation entries row 8 · `foundations/decisions.md:4046-4091`
  D-209 · `foundations/decisions.md:4296-4311` D-402 · `foundations/decisions.md:4710-4727` D-323 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `tests/view/previous-save.test.mjs:37-160`
- **Model:** same — four paths of the page make games, and the one reach of the browser's storage
  stands here.
- **Risk:** none
- **Checks:** `npm test -- tests/view/judging-cache-page.test.mjs` (written first, failing) ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs`
  · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs`
  · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs`
  · `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 1 · Slice 5 · Slice 6 · Foundation entries row 4 · row 8

## Notes of the orchestrator for this slice

- Slices 1–7 of the correction are made. The game state has `madeAtMs` (`newGame(madeAtMs = 0)` refuses a moment that is no safe integer with a `RangeError`: the page must pass a safe integer — the whole milliseconds of the clock, never a fraction); `src/browser/view/judging-cache.ts` (Slice 5) is the module that reads and writes the browser's storage — read its exports as they stand (opening for a loaded game: dropping this game's entries above the game's revision or generation, removing the account's entries of earlier games; the key from the account's id — never the email — and the game's moment); the screen's entry (`maps-entry.ts`, Slice 6) takes the cache as an argument. D-441 and the spec's *Decisions* 3, 5, 7, 8, 9 (copied below where the plan's *Read* names them) say what the page does.
- Your slice: the page makes each new game at the clock's moment — find the four paths of the page that make or load a game (a new account's first game, „Zacznij od zera” after a discarded save, a game built after the server refused a save (D-209: another browser saved first — the page clears **this game's** cached judgings in this browser then), a sign-in / reload) — and the one reach of the browser's storage: the game view opens the cache for the loaded game and gives it to the screen's entry. The account's id is what the page already knows of the signed-in account (find it; never the email, and no new request). A page without storage or with a refused storage keeps working (the judging then stays in the open page's memory). Remember the first run's note: the open page's memory keeps a judging if the storage refuses the write.
- New cases in a new file `tests/view/judging-cache-page.test.mjs` (the page's test document, `tests/view/page-document.mjs`; the cache over jsdom's storage): a judging made on the screen Mapy is remembered across a reload of the page; another account's or another game's (a different moment) entries never show; „Zacznij od zera” shows no mark of the discarded game's judgings; a game built after a refused save shows none cached for it; an account's entries of earlier games are removed on opening; a failing storage changes nothing visible. Change `tests/view/uncaught-failure.test.mjs` only where the entry's new argument touches the case. A new test file needs no `stryker.config.json` entry unless `tests/quality/test_mutation_test_selection.py` says so.
- The balance instrument's own calls of `newGame` are Slice 12's. Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence; the foundation check should show no error for your files. UI: inspect your own screenshot of the running game (`.claude/skills/loop2-play/SKILL.md`): a judging, a reload — the mark still stands; **push none, keep none**; close the browser (WAY-319). No full gate; ESLint, Prettier, typecheck, size rules.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
