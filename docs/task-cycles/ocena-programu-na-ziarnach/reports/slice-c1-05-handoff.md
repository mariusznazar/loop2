# Handoff — the executor of slice 5, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `614c7559`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 5 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-5/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-05-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- the plan's *Foundation entries* row 10, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — a value under the keys of the judging cache gives a judging only in the form the cache writes, for the account and the game its key names, and no value read from the browser's storage throws out of the cache; *Method*: test; *Part*: browser-view; derives from the new decision of row 1; check
- the plan's *Foundation entries* row 11, as the foundation step wrote it — find it in `foundations/` by its heading: browser-view — `src/browser/view/judging-cache.ts` under *Trust boundary*
- `foundations/decisions.md:4149-4190` D-211 (plan: 4128-4168)
- `foundations/decisions.md:4067-4113` D-209 (plan: 4046-4091)
- `foundations/decisions.md:656-670` D-117 (plan: 644-657)
- `foundations/invariants.md:1248-1256` cross-part-imports
- `foundations/invariants.md:1198-1206` document-test-memory-limit
- `foundations/part_map.md:3-31` browser-view
- `.the-way/elements/part-map/skill/SKILL.md`
- `.the-way/product-guidelines/testing/template.md:180-200`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/account-api.ts:1-20`
- `src/browser/sim/types.ts:360-400`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 7-47 (spec: Intent, Goals and non-goals, Constraints)

## Intent

The first run of the cycle keeps the remembered judgings in the game state, so in the saved game the server holds, where a player who judges much pushes the save past its 64 KiB limit and loses progress (review of the whole change, out of scope 1; `reports/slice-06-measure-output.txt`: 300 judgings come to 107.6–167.0 % of the limit). The human's remark 1 moves them into a cache in the browser: a judging is recomputable in about 30 ms, the cache only spares the recount, and the server's save is the one place whose limit costs the player's progress. The behaviour the player sees stays: the badge or „{n} z 12” beside the list „Program:”, the note on the stock, and the erasing of a judging when the program's rules, groups or trip plan change, when a death takes the character's practice and ranks, and when the program is deleted. The saved game goes back to holding no judging.

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

## Constraints

- D-04: the simulation is pure functions; real time enters only as an argument; the browser view draws from an enumerated list of sources and changes the game state only through functions of the simulation; its *complies* admits „a game state storing the moment of an event, such as … the moment of a save”. Invariant `simulation-isolation`: „No file of the simulation outside `tests/` imports a file, a package or a module from outside the simulation, or uses the page, a timer, the system time or a global object that the browser or Node.js adds”; its test already lists `localStorage`, `sessionStorage` and `indexedDB` (`tests/invariants/test_simulation_isolation.py:77-79`).
- D-211: „the unsaved game state stays in the page's memory only, never in the browser's lasting storage”; *violates*: „the unsaved game state written to `localStorage`, `sessionStorage` or IndexedDB”.
- D-117: a browser API client „keeps no identity, cookie or document state”; *violates*: a client that „writes `document.cookie` or `localStorage`” — binds the kind `browser-api-client` (`src/browser/account-api.ts`).
- D-165: program numbers count up and are never given again, „a deleted program's number included”.
- Generation number: grows by one exactly in `teamAfterDeath` (`src/browser/sim/game.ts:662-675`) at the settlement `progressLost`, the death with no use of the resurrection left of a character with practice; `settleDeath` (manual map run) and `takeEnd` (earning loop and catch-up, `src/browser/sim/loop.ts`) are its two callers; nothing else changes `generation` (`src/browser/sim/types.ts:454-463`). D-218 shows it; D-190 settles the death.
- Every place the simulation writes content into a listed program goes through `withProgramSaved` (`src/browser/sim/programs.ts:391-403`): `editProgram`, `saveCopyIntoProgram`, `setProgram` (`game.ts:426-445`) and the first-chill write of `advanceMinutes` (`game.ts:880-895`, D-123); `withProgramContent` is called nowhere else (slice 7 report, own-work check). New programs are made by `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms` (D-401), each with a new number. `sameData` (`programs.ts:311`) compares plain data by keys and values whatever the order the keys were made in.
- The previous-save reader (`src/browser/sim/previous-programs.ts`, trust boundary `previous-save-programs-reader`) reads an item of a document of any version from 1 to the current one only where its keys are exactly `id`, `name` and `program`, and skips any other.
- D-409: an act of the player that depends on time goes through the store, which catches up time first. The judging reads the chest, which earning loops change with time, so it stays such an act.
- D-386 and D-206: the load admits every state the game's own functions make; a moment of real time the state stores is a safe integer of any sign, compared with no clock; a saved game of another version is discarded and the player starts anew. `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem” (lines 100–113): the version rises with every change of shape, except that the test's document may be rewritten without a raise while no saved game of the current version exists anywhere, with a comment over the document saying so.
- D-402: „Zacznij od zera” replaces the game with a new one built as for an account with no saved game state. D-209: a save the server refuses makes the browser drop its unsaved state and load the server's.
- The account the page knows: `Account.id`, a string the server makes with `randomUUID` (`src/browser/account-api.ts:8-16`, `src/server/database.ts:1`); the game state holds no identity of its game (`src/browser/sim/types.ts:485-546`, `newGame` at `src/browser/sim/game.ts:384-414`).
- The store ignores a result that holds the very state it holds and saves only a changed state (`src/browser/view/state-store.ts`, `take` and `takeAsAct`); after `halt()` (D-323) it takes no result, while the body of `act` still runs.
- `balance/engine.mjs:94` and `balance/campaign.mjs:169` call `newGame()`; they are files of kind `balance-instrument` (`guidelines/coding-balance-instrument.md`), bound by the invariant `balance-instrument-repeatability` („No file of code in `balance/` reads the system clock …”).
- The code of the first run this correction rebuilds came from commits `bae893e2` („hold the last judging of each character, program and map in the game state, … and write and read it strictly in the saved game … (D-440, D-206, D-213)”) and `3218a620` („… erase the remembered judgings where a save makes the rules, groups or trip plan of a program different, where a program is deleted and where a death takes a character's practice and ranks, in a manual map run, an earning loop and the catch-up alike (D-440, D-439, D-165, D-190, D-123)”). Their reason is D-440's first sentence, „The saved game state holds the last judging of each character, program and map”, from *To do* 6 of the task („Gra pamięta w zapisie…”), which the human's remark 1 replaces.
- `SAVED_GAME_VERSION` is 9 in the branch (`src/browser/sim/saved-game.ts:85`) and 8 on `main`; 9 is not deployed.
- The human's remark names `localStorage` as the example of the cache; it adds nothing the product runs, pays for or backs up, so it is no reserved choice (`.the-way/project-level/technology/reserved_choices.md`, „The test”), and the remark settles it.

### lines 95-124 (spec: Decisions 3, 4 and 5)

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state (`app.ts:312`), a load refused — as another version, as an archetype the data lack or as shape — through `startFrom` (`app.ts:89-93`), and a reset of D-402 (`page-game-acts.ts:187`); the conflict reload that finds no save on the server goes through the first of these. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

The two files of the balance instrument that make games, `balance/engine.mjs:94` and `balance/campaign.mjs:169`, pass a fixed number as the moment, never the clock (`balance-instrument-repeatability`); no measurement reads it.

Collision: two games of one account made in the same millisecond of the browsers' clocks; only one of them survives the server's revision check (D-209), so the risk is taken.

Ways weighed:

- **The moment in the game state (chosen).** Tells games apart on every device; costs one field of the saved game at the version 9 already raised, one more moment in D-386, and the argument of the new game in the page's paths, in the balance instrument's two calls and in the tests that make games. The simulation does not read it; D-04's *complies* admits a stored moment of an event, and D-04 is changed to name it as the game's identity.
- **A random token from the view in place of the moment.** Same cost and a text to check at the load; no gain.
- **No new field: the key names the account alone, and the page clears that account's judgings whenever it makes a new game.** Rejected: a reset or a discard made on another device — every deployment that raises the version — is loaded on this device, not made here, so nothing clears, and the old game's keys answer in the new game, against the remark („żeby ocena z jednej gry nie pokazała się w innej”).

### 4. The shape of the cache: one entry per triple, a short stored form

- **One entry of `localStorage` per character–program–map triple** of one account and one game. Rejected: one entry per game (a whole record rewritten at each judging, a lost write when two tabs judge, and one corrupt value losing every judging of the game); both (two places to keep agreeing).
- **The key**: a fixed prefix naming the cache of loop2 and the version of the cache's own stored form (1), then the account's id, the game's moment, the character's number, the program's number and the map's identifier, in that order, with a separator that none of them holds. The cache reads and writes only keys of its own version.
- **The value**: a small JSON object with exactly four fields: the twelve results as one text of one letter per seed, in the order of the data's seeds (one letter each for solved, death, undecided); the equipment as the judging's clipped take list, a list of item and count pairs in the order of the data's items; the program's content revision; the character's generation number. No cause, no minute (as D-440), no name, no email.
- **Reading a value (the trust boundary)**: a value longer than a fixed bound is ignored without being parsed; a value that is no JSON, has another field or misses one, has results of another length or another letter, an item the data lack or named twice, a count that is no safe integer from 1, a content revision that is no safe integer from 0, or a generation that is no safe integer from 1, is ignored. Ignored means: the reading gives nothing for that triple, never throws, and leaves the value where it is (the next judging of the triple overwrites it). The reading builds new values and never returns an object the parse made with a key such as `__proto__`.
- **Another version of the stored form**: keys of another version are neither read, written nor removed; a later change that raises the version decides what becomes of older keys.

Size, for the report and the request: one entry is a key of about 70–90 characters and a value of about 50–90 characters; the browser's quota per origin is in megabytes, so tens of thousands of entries fit (Decision 8 says what happens past it).

### 5. Failures of the storage

- **Storage refused** (the browser throws on reaching `localStorage`, or it is absent): the cache runs in the page's memory alone; the judging stands for the open page and is gone at a reload.
- **A write refused** (the quota is full, or any other exception): the entry is kept in the page's memory for that triple, the stored value of that triple is removed if it can be (so no older stored judging of the triple stands against the newer one), and the page goes on; no sentence is shown.
- **Reading**: the page's memory holds only entries whose write the storage refused; a triple held there is read from it, any other from the storage, so a write that succeeds later takes the triple out of the page's memory.
- Every exception of the storage, at reading, writing, removing or listing keys, is caught inside the cache; none reaches the screen or the last-resort handling.

### lines 138-140 (spec: Decision 6 (V1))

Browser view (`src/browser/view/`):

- **V1 — the judging cache, a new module (a trust boundary of `browser-view`)**: opened for one account's id and one game's moment, with a storage given to it or none, and told whether the game was built after a refused save (D-209); offers *read a triple* (gives the stored record or none, Decisions 4–5) and *remember a triple* (stores the record, Decision 5). At opening it removes, best effort, the entries of the same account under another game's moment, so the storage does not grow with each reset, and, where the game was built after a refused save, the entries of this account and this game too (Decision 2); entries of other accounts are left. It is the one file that knows the stored form. It reaches no `window` itself: the storage is given to it.

### lines 149-160 (spec: Decisions 7 and 8)

### 7. Several tabs and a second device

- Two tabs of one game write different triples to different keys, so no write loses another; on one triple the last write stands, each a whole judging. A tab reads the storage at each draw of the screen Mapy, so it shows a judging another tab made at its next draw, except for a triple whose write it could not store itself (Decision 5). No listener on the `storage` event is added.
- A tab whose save the server refuses (another tab or device saved first) loads the server's game and builds it after the refused save; its opening of the cache removes this game's entries in this browser (Decision 6, V1), since judgings it made may belong to changes the server never received. The cost: the badges of that game in that browser are gone after a refused save, until judged again.
- A tab of a game that another device or tab has reset or replaced keeps reading its own game's key until its save is refused and the page loads the other game, whose moment differs.
- A second device, or a browser whose data were cleared, has no entry: no badge and no count beside „Program:” until a judging there; „Puść w pętlę” judges anew on every first click whatever is cached (D-243), so starting a loop is unchanged.

### 8. What stays in the browser, and the limits accepted

- After „Wyloguj”, the account's cached judgings stay in that browser, so its next sign-in shows the badges without judging again. On a shared computer the next person's browser holds them: the account's opaque id, numbers of characters and programs, map identifiers, kinds of results, items and counts — no email, no name and no progress, nothing the game loads. Rejected: clearing them at logout — the badges then vanish at every logout on the player's own device, for data that tells another person nothing they can use. The new decision names this beside D-211.
- No limit on the number of entries: per game they are bounded by characters × programs × maps; across resets the opening removes the account's older games. A full storage costs only the lasting of new judgings (Decision 5).
- Entries of a deleted program, of an older revision of a program or of a map gone from the data stay in the storage, unread, until the triple is judged again or the account's next new game on that browser.

### lines 174-177 (spec: Decision 10)

- **The cache, unit at its trust boundary** (a new test file of `tests/view/`, marked with the new invariant, its refusal seen failing once): with a stand-in storage given to the cache — a map-backed one, one whose writes throw, one whose every call throws, and none — remember then read a triple; another account's, another game's and another version's keys never read; each crafted value of Decision 4 read as nothing with no throw, `__proto__` and `constructor` as keys of the value included, and a value over the bound not parsed; a refused write still read from the page's memory and the triple's stored value removed; two caches on one storage (two tabs) reading each other's writes; the opening removing the same account's entries of another game and leaving another account's; the opening after a refused save removing this game's entries too.
- **The screen** (`tests/view/maps-screen.test.mjs`, page document `tests/view/page-document.mjs`): the cases that stand today for the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their expectations, the cache built on a stand-in storage the case gives (the storage of the case's jsdom window, or a stand-in passed to the game view); a judging remembered and shown again by a screen built anew on the same storage (a reload); no mark on an empty storage (another device) until a judging; no mark for the same triple under another account or another game's moment; no mark after an edit of the program that changes its content, also after the content is changed back. `tests/view/uncaught-failure.test.mjs`: the button of a judging after an error nothing handled leaves the storage as it was. `tests/view/account-screen.test.mjs`: the saves around a judging follow Decision 9; a new game made by each page path carrying the clock's moment; a game built after a refused save showing no mark its browser had cached for it.
- **Balance instrument**: `tests/balance/` cases that make games run unchanged; `balance-instrument-repeatability` passes with the fixed moment.
- **Invariants**: `simulation-isolation` and `simulation-inputs` run unchanged and pass; `cross-part-imports` passes with the new view module; the foundation check's test citations follow the reworded entries.

### lines 179-185 (spec: Decision 11)

### 11. Settlements of the orchestrator after the review of the revision (`reports/spec-review-2-report.md`)

The review of the revised spec found one thing the build would get wrong, and offered one narrowing. The orchestrator settles them as a question of the cycle, and the planner and the maker take these as binding:

1. **D-401 is changed, unconditionally** (not „if the foundation step finds it needs it”): its binding sentence about the keys of an item of a previous save („… takes an item only when its keys are exactly `id`, `name` and `program` …”) says, after the change, that an item of a version-9 save has exactly the four keys `id`, `name`, `program` and the content revision, that an item of an earlier version has the three keys, and that a pulled program starts at revision 0; its *Rejected* clause that rests on „the items had one shape in every version” is corrected to say that the shape changed once, at version 9, for the revision. The three lines `decision:` of `tests/sim/previous-programs.test.mjs` that quote the old sentence follow the new wording, and the invariant on the previous-save programs reader (rewritten as the spec says) and D-401 must agree. Where the foundation step finds D-209 or D-402 name the same keys, it changes them the same way.
2. **What the refused-save path closes is stated exactly.** The spec's claim that clearing a game's cached judgings after a refused save covers D-209 is true for the page that builds the game after another browser saved first, and not for a refused save at „Wyloguj”, which goes on to the login forms (D-97): the next sign-in builds the game without the refused-save flag, so that path stays open like the closed page. The planner and the maker do not claim more in a comment, a test title or a foundation sentence; the repeated-revision gap stays a rare accepted cost (a stale badge until the next judging or the next change of that program; „Puść w pętlę” always judges anew, so no loop starts on it), and the request names it.
3. **The narrowing is taken.** When the cache is opened for a loaded game, it drops this game's entries whose content revision or whose generation is above the loaded game's own: such an entry can only come from a save that never reached the server. It needs the loaded game state, which the reading of a cached judging needs anyway (the validity check compares with it); the cases: an entry above by revision dropped, above by generation dropped, equal or below kept (and judged stale or fresh by the comparison, not by this drop).

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 5 — the judging cache, a module of the view at a trust boundary

- **Goal:** a new module `src/browser/view/judging-cache.ts`, the one file that knows the stored form
  of a cached judging (spec Decisions 4, 5, 6 V1, 7, 8, 11.2 and 11.3). It is opened for one
  account's id (`Account.id`, never the email), one game's moment (Slice 1's field), the game state it
  is opened with, whether the game was built after a refused save (D-209), and a storage given to it
  or none — it reaches no `window` itself. It offers reading the record of a triple (the record or
  none) and remembering the record of a triple; the record is the type of Slice 4. One entry of the
  storage per triple: the key a fixed prefix naming the cache of loop2 and the version 1 of its stored
  form, then the account's id, the game's moment, the character's number, the program's number and
  the map's identifier, in that order, with a separator none of them holds; the value a JSON object of
  exactly four fields — the twelve results as one text of one letter per seed, in the order of the
  data's seeds; the equipment as item and count pairs; the content revision; the generation. Reading
  ignores, never throwing and leaving the value where it is: a value longer than a fixed bound,
  unparsed; one that is no JSON, has another field or misses one, has results of another length or
  letter, an item the data lack or named twice, a count that is no safe integer from 1, a revision
  that is no safe integer from 0, a generation that is no safe integer from 1; it builds new values
  and never gives an object the parse made, a `__proto__` or `constructor` key included. Keys of
  another version of the form are neither read, written nor removed. A storage refused at opening
  makes the cache live in the page's memory; a refused write keeps the triple in the page's memory and
  removes the triple's stored value where it can; a triple held in the page's memory is read from it,
  any other from the storage, so a later write that succeeds takes it out of memory; every exception
  of the storage is caught inside. At opening, best effort, it removes this account's entries under
  another game's moment and, after a refused save, this game's entries too; it leaves other accounts'
  entries; and for the game it is opened with it drops this game's entries whose revision or
  generation stands above that state's own (spec Decision 11.3). No comment, case title or sentence
  claims that the refused-save path closes more than the page that builds a game after another
  browser saved first (spec Decision 11.2). The failing tests come first, in a new file
  `tests/view/judging-cache.test.mjs` marked with the new invariant (Foundation entries row 10), its
  refusal seen failing once: the cases of spec Decision 10, fifth item, with stand-in storages — a
  map-backed one, one whose writes throw, one whose every call throws, and none — and the cases of
  Decision 11.3 (an entry above by revision dropped, above by generation dropped, equal or below
  kept). The part map follows through the project skill `the-way-update-part-map`, read as the file
  named in *Read*: the module under *Trust boundary* of `browser-view`. `guidelines/testing.md`, rule
  „Trust boundaries”, gets a row for the module naming its invariant and its refusal cases, and the
  rule's *Decision* and *Invariant* lists the new decision and the new invariant, written as
  `.the-way/product-guidelines/testing/template.md` gives the rule. Read
  `src/browser/sim/judging-record.ts` as Slice 4 left it.
- **Change:** `src/browser/view/judging-cache.ts` · `tests/view/judging-cache.test.mjs` ·
  `foundations/part_map.md` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:7-47` Intent, Goals and non-goals,
  Constraints · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-124` Decisions 3, 4 and 5 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-140` Decision 6 (V1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-160` Decisions 7 and 8 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-177` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-185` Decision 11 · Foundation entries
  row 1 · Foundation entries row 10 · Foundation entries row 11 · `foundations/decisions.md:4128-4168`
  D-211 · `foundations/decisions.md:4046-4091` D-209 · `foundations/decisions.md:644-657` D-117 ·
  `foundations/invariants.md:1248-1256` cross-part-imports · `foundations/invariants.md:1198-1206`
  document-test-memory-limit · `foundations/part_map.md:3-31` browser-view ·
  `.the-way/elements/part-map/skill/SKILL.md` · `.the-way/product-guidelines/testing/template.md:180-200`
  · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts:1-20`
  · `src/browser/sim/types.ts:360-400`
- **Model:** same — a new trust boundary that reads values anyone with the browser can write.
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts` (the part map names it in this slice)
- **Checks:** `npm test -- tests/view/judging-cache.test.mjs` (written first, failing; the refusal
  seen failing once) · `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (the module claimed as a trust boundary of
  `browser-view`, the new invariant cited by its test, no fault of `guidelines/testing.md`)
- **Depends on:** Slice 3 · Slice 4 · Foundation entries row 1 · row 10

## Notes of the orchestrator for this slice

- Slices 1–4 of the correction are made: the content revision per saved program and the moment the game was made (`madeAtMs`) in the simulation and the strict load; the reader of a previous save; and in `src/browser/sim/judging-record.ts` / `judging.ts` the pure record (`recordOfJudging`), the mark (`markOfRecord`) and the act `judgeAndRecord` that leaves the game state as it was — read their signatures as they stand. The foundation entries (commit `4d813606`): D-441 (where the judgings lie — read it whole: the key, the stored form, the failures, the several tabs), D-442, D-440, D-04 (the view may draw from the judgings remembered in the browser's lasting storage), the invariant `judging-cache-reading` (new: a value under the keys of the judging cache gives a judging only in the form the cache writes, for the account and the game its key names, and no value read from the browser's storage throws out of the cache) — **your test file `tests/view/judging-cache.test.mjs` is its test**: the invariant's check names it; the foundation check without `--skip-test-citations` must find a test citing it (a comment line `invariant: judging-cache-reading` as the testing guidelines give for an invariant's test), and its refusal seen failing once.
- Your slice: the new view module `src/browser/view/judging-cache.ts` — **a new trust boundary**: it reads values that anyone with the browser can write. The only module that knows the stored form and `localStorage`; no file of the simulation touches storage. It exposes (settle the exact names in the code, state them in the report): reading the cached judging of a triple for a game, writing it, dropping this game's entries above the loaded game's revision or generation (spec Decision 11.3), removing an account's entries of earlier games on opening, and the key (the cache's own version, the account's id — never the email —, the game's moment `madeAtMs`, the character, the program, the map). Failures: an unreadable / foreign / oversized / wrong-version value shows nothing and never throws; a refused storage or write keeps the judging for the open page's memory. Tests in the page's test document (jsdom; `tests/view/page-document.mjs` — how `localStorage` is stood in) with hostile values (wrong types, a stored form with 11 or 13 results, an unknown letter, a negative or unsafe revision/generation, extra keys, `__proto__`, a huge string).
- The part map (`foundations/part_map.md`): `src/browser/view/judging-cache.ts` is added under *Trust boundary* of `browser-view`, and the trust-boundary table of `guidelines/testing.md` gets its row: write the part-map change through `.the-way/elements/part-map/skill/SKILL.md` (read it whole) in this slice, and the guideline row as the guideline's own rules say (read `guidelines/testing.md` "Trust boundaries" first).
- A new test file under `tests/view/` needs no `stryker.config.json` entry unless `tests/quality/test_mutation_test_selection.py` says so; run that check once. Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence. No full gate; ESLint, Prettier, `npm run typecheck`, size rules; no screenshot is needed (no screen changes).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
