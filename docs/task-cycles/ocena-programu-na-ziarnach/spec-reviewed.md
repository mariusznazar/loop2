# Spec — Ocena programu na dwunastu stałych ziarnach mapy przed puszczeniem pętli (correction 1: the remembered judgings leave the saved game)

- Task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the human's remarks of correction 1: `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md`, remark 1.
- Open choice: how the last judging of each character–program–map triple is remembered in a cache of the browser instead of in the saved game sent to the server — what makes a cached judging stand or not with no hook in the game state, what tells one game from another in the browser, the stored form and its failures, where the code lives, what several tabs and a second device see — and whether any entry of the foundation forbids such a cache.

## Intent

The first run of the cycle keeps the remembered judgings in the game state, so in the saved game the server holds, where a player who judges much pushes the save past its 64 KiB limit and loses progress (review of the whole change, out of scope 1; `reports/slice-06-measure-output.txt`: 300 judgings come to 107.6–167.0 % of the limit). The human's remark 1 moves them into a cache in the browser: a judging is recomputable in about 30 ms, the cache only spares the recount, and the server's save is the one place whose limit costs the player's progress. The behaviour the player sees stays: the badge or „{n} z 12” beside the list „Program:”, the note on the stock, and a judging that stops standing when the program's content changes, when a death takes the character's practice and ranks, and when the program is deleted. The saved game goes back to holding no judging.

## Goals and non-goals

Goals:

1. The saved game state holds no judging; its version stays 9, raised once in this change for the loop record (D-241), with the shape of version 9 without `judgings`.
2. The last judging of each character–program–map triple of one game of one account is kept in the browser's lasting storage (`localStorage`) and shown beside „Program:” as today, the note on the stock included.
3. A cached judging stands only while the program's content is the content it judged and the character's generation number is the one it judged with; the triple's program and character must be in the game state. No hook in the simulation erases anything.
4. A judging of one account never shows for another account, and a judging of one game never shows in another game of the same account (a game after „Zacznij od zera”, D-402, and after a discarded save of another version, D-206).
5. A corrupt, foreign or oversized value in the storage, a full storage and a storage the browser refuses never break the page: a value it cannot read shows nothing, and a judging it cannot write still stands for the open page.
6. No file of the simulation touches storage; the cache is one module of the browser view.

Non-goals:

- No change to the judging itself (D-439), to the result shown under the character, to the flow of „Puść w pętlę” and „Puść mimo to” (D-243), or to the texts and roles (D-329, styleguide).
- No limit of time and no eviction policy beyond what Decision 8 gives; no measure of the browser's quota.
- No sharing of judgings between devices; another device shows no badge until a judging is made there (cost the human accepted).
- Not designed here, taken by planning as the handoff gives: remark 3 (the sentence „Wróć do niego i je zakończ” in a row of „Kto idzie” becoming a link to the open manual map run's screen) and remark 4 (the title of the trust-boundary case of `tests/sim/previous-programs.test.mjs` and `guidelines/testing.md:177` naming no highest version). Remark 2 is let through.
- The fallback of remark 1 — a shortened judging in the saved game with the removal of the least recently used judgings before the limit — is not designed: no entry of the foundation forbids the cache (Decision 1).

## Constraints

- D-04: the simulation is pure functions; real time enters only as an argument; the browser view draws from an enumerated list of sources and changes the game state only through functions of the simulation. Invariant `simulation-isolation`: „No file of the simulation outside `tests/` imports a file, a package or a module from outside the simulation, or uses the page, a timer, the system time or a global object that the browser or Node.js adds”; its test already lists `localStorage`, `sessionStorage` and `indexedDB` (`tests/invariants/test_simulation_isolation.py:77-79`).
- D-211: „the unsaved game state stays in the page's memory only, never in the browser's lasting storage”; *violates*: „the unsaved game state written to `localStorage`, `sessionStorage` or IndexedDB”.
- D-117: a browser API client „keeps no identity, cookie or document state”; *violates*: a client that „writes `document.cookie` or `localStorage`” — binds the kind `browser-api-client` (`src/browser/account-api.ts`).
- D-165: program numbers count up and are never given again, „a deleted program's number included”.
- Generation number: grows by one exactly in `teamAfterDeath` (`src/browser/sim/game.ts:662-675`) at the settlement `progressLost`, the death with no use of the resurrection left of a character with practice; `settleDeath` (manual map run) and `takeEnd` (earning loop and catch-up, `src/browser/sim/loop.ts`) are its two callers; nothing else changes `generation` (`src/browser/sim/types.ts:454-463`). D-218 shows it; D-190 settles the death.
- D-409: an act of the player that depends on time goes through the store, which catches up time first. The judging reads the chest, which earning loops change with time, so it stays such an act.
- D-386 and D-206: the load admits every state the game's own functions make; a moment of real time the state stores is a safe integer of any sign, compared with no clock; a saved game of another version is discarded and the player starts anew.
- D-402: „Zacznij od zera” replaces the game with a new one built as for an account with no saved game state.
- The account the page knows: `Account.id`, a string the server makes with `randomUUID` (`src/browser/account-api.ts:8-16`, `src/server/database.ts:1`); the game state holds no identity of its game (`src/browser/sim/types.ts:485-546`, `newGame` at `src/browser/sim/game.ts:384-414`).
- The store ignores a result that holds the very state it holds and saves only a changed state (`src/browser/view/state-store.ts`, `take` and `takeAsAct`); after `halt()` (D-323) it takes no result, while the body of `act` still runs.
- The code of the first run this correction rebuilds came from commits `bae893e2` („hold the last judging of each character, program and map in the game state, … and write and read it strictly in the saved game … (D-440, D-206, D-213)”) and `3218a620` („… erase the remembered judgings where a save makes the rules, groups or trip plan of a program different, where a program is deleted and where a death takes a character's practice and ranks, in a manual map run, an earning loop and the catch-up alike (D-440, D-439, D-165, D-190, D-123)”). Their reason is D-440's first sentence, „The saved game state holds the last judging of each character, program and map”, from *To do* 6 of the task („Gra pamięta w zapisie…”), which the human's remark 1 replaces.
- `SAVED_GAME_VERSION` is 9 in the code (`src/browser/sim/saved-game.ts:85`) and not deployed.
- The human's remark names `localStorage` as the example of the cache; it adds nothing the product runs, pays for or backs up, so it is no reserved choice (`.the-way/project-level/technology/reserved_choices.md`, „The test”), and the remark settles it.

## Decisions

### 1. No entry of the foundation forbids the cache; the cache is made, not the fallback

Searched: all of `foundations/decisions.md`, `foundations/invariants.md`, `foundations/environment_facts.md`, `guidelines/*.md`, `src/browser/AGENTS.md` for `localStorage`, `sessionStorage`, `IndexedDB`, `storage`, „lasting storage”, „shared computer”; read whole D-04, D-07, D-117, D-203, D-206, D-209 (binding text), D-211, D-294, D-386, D-402 and the invariants `simulation-isolation`, `simulation-inputs`, `expired-session-unsaved-progress`, `save-version`, `player-save-isolation`. Each that touches it:

- D-07: „The server holds the players' accounts and each player's saved game state, and computes nothing of the game. The browser computes the whole game — the map runs, the earning loops and the catch-up — and sends the saved game state to the server.” It says where the save lies and who computes; it does not say that nothing else of the game may lie in the browser. Its *Rejected* „no accounts, with the save kept in the browser” rejects the save in the browser, and the cache is no save: the game state is built from the server's save alone.
- D-211: „the unsaved game state stays in the page's memory only, never in the browser's lasting storage”; *violates*: „the unsaved game state written to `localStorage`, `sessionStorage` or IndexedDB”; *Rationale*: „nothing of it stays in the browser for the next person at a shared computer”. It binds the unsaved game state — progress. A cached judging is no game state: nothing of it goes back into the game state, the game is whole without it, and a judging made again gives it anew. Its *Rejected* names „a new path of code and a new decision about the browser's storage” as the price of storage, which the new decision of this change pays.
- D-117 and `guidelines/coding-browser-api-client.md:59` („Klient zapisuje tożsamość w `localStorage`…” as **Bad**): bind the kind `browser-api-client`; the cache is no API client.
- D-294: folding of rule groups is not kept in the browser's storage, its *Rejected* giving „folding kept in the browser — a new storage” as a cost; it settles folding alone.
- D-04: lists what the browser view draws from; the cache is a new source, so D-04 changes (Foundation entries), as it changed for the folding and the chronicle — it is not forbidden.
- Invariant `expired-session-unsaved-progress`: „An expired session leaves unsaved progress in the browser…” — unsaved progress, not touched.
- Invariant `simulation-isolation`: holds as long as the cache is in the view (Decision 6).
- No environment fact and no guideline rule speaks of the browser's lasting storage beyond these.

Conclusion: the cache outside the saved game is not forbidden; the orchestrator's reading is confirmed. What stays in the browser of a shared computer is named as a cost in Decision 8.

### 2. What validates a cached judging: a fingerprint of the program's content and the character's generation, compared at reading

A cached judging is stored with two values beside its twelve results and its equipment: the **fingerprint** of the content of the program it judged, and the **generation number** of the character it judged for. At reading, against the game state at hand, it stands only where all hold: the character of the triple is on the team with the stored generation; the program of the triple is on the player's list and its content gives the stored fingerprint; the stored results number as many as the data's seeds of a judging. Otherwise it shows nothing, as where nothing is cached.

What each erasing of the task becomes, with no hook:

| Task, *To do* 6 / D-440 | With the cache |
|---|---|
| a save after which the rules, the groups with their order or the trip plan differ, the first-chill rule (D-123) included | the fingerprint differs |
| a rename, a save that changes none of them | the fingerprint is the same |
| a program deleted | its number is on no program of the list and is never given again (D-165) |
| a death that takes practice and ranks (`progressLost`), in a manual map run, an earning loop or the catch-up | the generation grew |
| a death covered by the resurrection, a death of a character with no practice, a bought rank | the generation is the same |
| a change of the cap or of the map's data | not compared, as today |

The **fingerprint** is a function of the simulation's own code, deterministic and with no browser API: a 53-bit non-cryptographic hash, written as base-36 text, over a canonical text of the program's content — its rule groups in their order, each with its identity, name, condition and rules in order (each rule with its identity, condition and action), and its trip plan (take and bring lists in order) — the same content the first run compared (`judgingsAfterSave`, `JSON.stringify([program.groups, program.tripPlan])`). The program's name and number and its identity counters `nextGroupId`, `nextRuleId` are left out. The canonical text does not depend on the order in which an object's keys were made, so a program built by the editor, by a save of the copy and by the load of a saved game gives one fingerprint for one content. Collision: a changed program giving its old fingerprint has a chance of about 2^-53 per change; the cost of one would be a judging of the old content standing beside the new one, so the risk is taken.

**One difference from the first run, accepted:** a program changed from content A to B and back to A, with no judging of that triple between, shows A's judging again, while the first run had erased it at the change to B. The judging shown is a judging of the very content the program has, as true as any remembered judging (it ages with bought ranks as D-440 accepts); a cache keyed by what it was computed from behaves so. The foundation entry says it (D-440 is reworded from „erases” to „stands only while”).

Ways weighed:

- **Fingerprint and generation compared at reading (chosen).** No hook, no field in the game state for it; deletion needs nothing; costs a hash per row drawn (a program of tens of rules, microseconds) and the A→B→A difference.
- **A content counter in each saved program, raised by the one function that writes content (`withProgramSaved` of slice 7).** Exact to the first run in the A→B→A case. Rejected: a field in every saved program that exists only for the cache, so the saved game's shape does not go back to one without judgings in spirit, every append of programs (D-401) and copy save needs it, and it buys one rare case.
- **Hooks kept in the view: the store hands the cache each new state with the one before it, and the cache erases what changed.** Exact within one browser; rejected: a second path beside the check at reading that is still needed for a reload, another tab and another device, and a write to storage on edits.

Where the validity lives: in the simulation, as pure functions (Decision 6, units S1–S3), so the cases are tested at the lowest level with no page.

### 3. What tells one game from another: the account's id and the moment the game was made

The key of every cached judging names the account (`Account.id`, the server's opaque identifier, never the email) and the game. The game state today names no game, and nothing the page knows tells a game after „Zacznij od zera” (D-402) or after a discarded save (D-206) from the game before it: the account is the same and program and character numbers start again at 1. So the game state gets one new field, **the real moment the game was made**, from the browser's clock, passed by the page to the function that makes a new game (D-04: real time enters only as an argument). Every path of the page that makes a new game passes it: an account with no saved game state, a load refused as another version or archetype (D-206), a reset of D-402 and the conflict reload that finds no save. A loaded game keeps its moment, so a reload, a conflict reload of the same game (D-209), the kept state after an expired session (D-211) and another device all name the same game. The save writes it and the load admits any safe integer of any sign and compares it with no clock, as the save time (D-386).

Collision: two games of one account made in the same millisecond of the browsers' clocks; only one of them survives the server's revision check (D-209), so the risk is taken.

Ways weighed:

- **The moment in the game state (chosen).** Tells games apart on every device; costs one field of the saved game at the version 9 already raised for the loop record, one more moment in D-386, and the argument of the new game in the page's three paths and in the tests that make games. It is a field the simulation does not read itself, which D-04's *violates* names for the scene and the chronicle; the new decision settles it as the game's own identity, not a need of one screen.
- **A random token from the view in place of the moment.** Same cost and a text to check at the load; no gain.
- **No new field: the key names the account alone, and the page clears that account's judgings whenever it makes a new game.** Rejected: a reset or a discard made on another device — every deployment that raises the version — leaves this device showing the old game's judgings in the new game, where the program and character numbers come back from 1, against the remark („żeby ocena z jednej gry nie pokazała się w innej”).

### 4. The shape of the cache: one entry per triple, a short stored form

- **One entry of `localStorage` per character–program–map triple** of one account and one game. Rejected: one entry per game (a whole record rewritten at each judging, a lost write when two tabs judge, and one corrupt value losing every judging of the game); both (two places to keep agreeing).
- **The key**: a fixed prefix naming the cache of loop2 and the version of the cache's own stored form (1), then the account's id, the game's moment, the character's number, the program's number and the map's identifier, in that order, with a separator that none of them holds. The cache reads and writes only keys of its own version.
- **The value**: a small JSON object with exactly four fields: the twelve results as one text of one letter per seed, in the order of the data's seeds (one letter each for solved, death, undecided); the equipment as the judging's clipped take list, a list of item and count pairs in the order of the data's items; the fingerprint text; the generation number. No cause, no minute (as D-440), no name, no email.
- **Reading a value (the trust boundary)**: a value longer than a fixed bound is ignored without being parsed; a value that is no JSON, has another field or misses one, has results of another length or another letter, an item the data lack or named twice, a count that is no safe integer from 1, a fingerprint not of the form written or a generation that is no safe integer from 1, is ignored. Ignored means: the reading gives nothing for that triple, never throws, and leaves the value where it is (the next judging of the triple overwrites it). The reading builds new values and never returns an object the parse made with a key such as `__proto__`.
- **Another version of the stored form**: keys of another version are neither read, written nor removed; a later change that raises the version decides what becomes of older keys.

Size, for the report and the request: one entry is a key of about 70–90 characters and a value of about 60–100 characters; the browser's quota per origin is in megabytes, so tens of thousands of entries fit (Decision 8 says what happens past it).

### 5. Failures of the storage

- **Storage refused** (the browser throws on reaching `localStorage`, or it is absent): the cache runs in the page's memory alone; the judging stands for the open page and is gone at a reload.
- **A write refused** (the quota is full, or any other exception): the entry is kept in the page's memory for that triple, the stored value of that triple is removed if it can be (so no older stored judging of the triple stands against the newer one), and the page goes on; no sentence is shown.
- **Reading**: the page's memory holds only entries whose write the storage refused; a triple held there is read from it, any other from the storage, so a write that succeeds later takes the triple out of the page's memory.
- Every exception of the storage, at reading, writing, removing or listing keys, is caught inside the cache; none reaches the screen or the last-resort handling.

### 6. Where the code lives

Simulation (`src/browser/sim/`, pure, no storage, held by `simulation-isolation` and `simulation-inputs`):

- **S1 — the fingerprint of a program's content**: takes a program's content, gives the fingerprint text (Decision 2).
- **S2 — the record of a judging**: takes the game state the judging read, the triple and the judging, gives what the cache stores — the kinds of the twelve results, the equipment, the fingerprint of the triple's program as it stands in that state, the character's generation in that state. It replaces `rememberedOf`.
- **S3 — the mark**: takes the game state, the triple and a record or none, gives the mark beside „Program:” — the count solved, all twelve, the note on the stock (less of an item in the chest than the record took), the badge — or none where no record is given or it does not stand (Decision 2). It replaces today's `judgingMark`, whose result type `JudgingMark` stays.
- **The act of a judging**: gives the judging and its record, made from the one state it read, and leaves the game state as it was (the very state). It replaces `judgeAndRemember`; whether it still answers as a `GameResult` is the maker's.
- **The moment the game was made**: a field of `GameState`, given to the function that makes a new game, written by the save and read by the load (Decision 3).
- **Goes away**: `GameState.judgings`; the types `RememberedJudging` and `RememberedJudgings`; `withRememberedJudging`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`, `judgingsAfterDeath`; the judgings half of `withProgramSaved` and its callers' taking of it in `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill write of `advanceMinutes`; the removal in `deleteProgram`; the erasing in `settleDeath` and in `takeEnd`; the reading and writing of `judgings` in `saved-game.ts` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the seed kinds there if nothing else reads them). These functions go back to what they did before `3218a620` and `bae893e2`, keeping every other change made since.
- **Stays**: `judgeOnSeeds`, the types `SeedResult` and `Judging`, the mark's meaning, the loop record.

Browser view (`src/browser/view/`):

- **V1 — the judging cache, a new module (a trust boundary of `browser-view`)**: opened for one account's id and one game's moment, with a storage given to it or none; offers *read a triple* (gives the stored record or none, Decisions 4–5) and *remember a triple* (stores the record, Decision 5). At opening it removes, best effort, the entries of the same account under another game's moment, so the storage does not grow with each reset; entries of other accounts are left. It is the one file that knows the stored form. It reaches no `window` itself: the storage is given to it.
- **V2 — the one place that reaches `localStorage`**: the page (the game view or the module that builds it) reaches `window.localStorage` inside a guard, since reaching it can throw, and gives V1 the storage or none.
- **The game view** gets the signed-in account's id from the page (beside the role and the previous-save privilege it gets today), opens V1 for that id and the moment of the game it is built with, and gives V1 to the entry of the screen Mapy.
- **The entry of the screen Mapy (`maps-entry.ts`)**: its `judge` control runs the act of a judging through `store.act` as today (D-409), and inside the same act body, before the screen's one draw after the act, gives the record to V1 — unless the store has halted (D-323), in which case nothing is remembered. „Puść w pętlę” judges through the same control, so its judging replaces the cached one too (D-440). It gives the screen a way to read the record of a triple from V1.
- **The screen Mapy (`maps-screen.tsx`)**: each row of „Kto idzie” reads the record of its character, the program its list shows and the card's map, and draws the mark S3 gives from the state it is drawn with; what is shown under the character (the result of a judging, the waiting second click) is unchanged.
- **The page (`app.ts`, `page-game-acts.ts`)** passes the moment of the clock to the function that makes a new game on each path of Decision 3, and the account's id to the game view.

### 7. Several tabs and a second device

- Two tabs of one game write different triples to different keys, so no write loses another; on one triple the last write stands, each a whole judging. A tab reads the storage at each draw of the screen Mapy (the clock's readings redraw it), so it shows a judging another tab made, except for a triple whose write it could not store itself (Decision 5). No listener on the `storage` event is added.
- A tab of a game that another device or tab has reset or replaced keeps reading its own game's key until its save is refused and the page loads the other game (D-209), whose moment differs.
- A second device, or a browser whose data were cleared, has no entry: no badge and no count beside „Program:” until a judging there; „Puść w pętlę” judges anew on every first click whatever is cached (D-243), so starting a loop is unchanged.
- The first opening of the cache for the new game on a device removes that account's entries of earlier games there.

### 8. What stays in the browser, and the limits accepted

- After „Wyloguj”, the account's cached judgings stay in that browser, so its next sign-in shows the badges without judging again. On a shared computer the next person's browser holds them: the account's opaque id, numbers of characters and programs, map identifiers, kinds of results, items and counts — no email, no name and no progress, nothing the game loads. Rejected: clearing them at logout — the badges then vanish at every logout on the player's own device, for data that tells another person nothing they can use. The new decision names this beside D-211.
- No limit on the number of entries: per game they are bounded by characters × programs × maps; across resets the opening removes the account's older games. A full storage costs only the lasting of new judgings (Decision 5).
- Entries of a deleted program or of a map gone from the data stay in the storage, unread, until the account's next new game on that browser.

### 9. Concurrency with the act and with the store

The judging changes no game state, so the store takes no result from it and saves nothing for it (it may still take and save the catch-up its reading makes first, as any act). The tests that count saves around a judging follow that (Decision 10).

### 10. Checks the correction needs

At the lowest level that catches each error:

- **Simulation, unit** (rewriting `tests/sim/judging-record.test.mjs`; `tests/sim/judging.test.mjs` for the act):
  - the fingerprint equal for one content whatever the order the objects' keys were made in, through a save and a load of the game, through a save of the copy that changes nothing, and through a rename; different for a rule changed, added or removed, two groups or two rules swapped, a group's condition changed, the trip plan's take or bring list changed, and the first-chill rule written by the game; unchanged by the identity counters alone;
  - the mark none for no record; none for a record whose program is deleted, whose character is not on the team, whose generation is below the character's after a death with `progressLost` — in a manual map run, an earning loop and the catch-up — and whose fingerprint differs; standing after a covered death, a death with no practice, a bought rank and a rename; the A→B→A case standing again, pinned as the chosen behaviour; the stock cases as today (less in the chest gives the note and no badge, more leaves the mark);
  - the act leaving the game state the very state it got, and its record holding the fingerprint and generation of that state.
- **Saved game** (`tests/sim/saved-game.test.mjs`, the trust boundary `save-version`): the document of version 9 without `judgings` and with the moment of the game, loading whole; a document holding a `judgings` key refused as shape; the moment admitted at zero, below zero and far ahead, and refused missing, as no integer and beyond the safe integers; the version-8 document still refused as version. `tests/sim/saved-game-judgings.test.mjs` loses its reason and goes, with its entry in the lists of the gate.
- **The cache, unit at its trust boundary** (a new test file of `tests/view/`, marked with the new invariant, its refusal seen failing once): with a stand-in storage given to the cache — a map-backed one, one whose writes throw, one whose every call throws, and none — remember then read a triple; another account's, another game's and another version's keys never read; each crafted value of Decision 4 read as nothing with no throw, `__proto__` and `constructor` as keys of the value included, and a value over the bound not parsed; a refused write still read from the page's memory and the triple's stored value removed; two caches on one storage (two tabs) reading each other's writes; the opening removing the same account's entries of another game and leaving another account's.
- **The screen** (`tests/view/maps-screen.test.mjs`, page document `tests/view/page-document.mjs`): the cases that stand today for the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their expectations, the cache built on a stand-in storage the case gives (the storage the case's jsdom window has, or a stand-in passed to the game view); a judging remembered and shown again by a screen built anew on the same storage (a reload); no mark on an empty storage (another device) until a judging; no mark for the same triple under another account or another game's moment. `tests/view/uncaught-failure.test.mjs`: the button of a judging after an error nothing handled leaves the storage as it was. `tests/view/account-screen.test.mjs`: the saves around a judging follow Decision 9; a new game made by each page path carrying the clock's moment.
- **Invariants**: `simulation-isolation` and `simulation-inputs` run unchanged and pass; `cross-part-imports` passes with the new view module; the foundation check's test citations follow the reworded entries.

## Foundation entries

Words are the foundation step's; named here by kind and meaning:

- **New decision** (browser-view, simulation): the last judging of each character, program and map lies in the browser's lasting storage of the page, one entry per triple under the account and the game, holding the kinds of the twelve results, the equipment, the fingerprint of the program's content and the character's generation; it stands beside „Program:” only while the program's content and the character's generation are those it judged with and both are in the game; an unreadable value shows nothing, a refused storage keeps a judging for the open page, and another device or cleared data show none until the next judging; the saved game holds no judging. Its *Rationale* and *Rejected* carry Decisions 2–8 (the save limit and its loss of progress; the content counter, the view-side hooks, one entry per game, clearing at logout; the account-only key). Relations: derives from D-440 and D-04; it says why D-211 does not bind it (no unsaved game state, nothing loaded back into the game), that D-07's server still holds the whole save, and that D-206's discarded save takes no judging along.
- **D-440 changed**: its first paragraph says the browser remembers the judging (the new decision), not the saved game state; its third paragraph says a judging stands only while the program's rules, groups and trip plan and the character's generation are those it judged with, the program deleted standing for none; its *Rationale* drops „the saved game states of the earlier version are discarded” as a cost of the judgings and adds the A→B→A case and the badge missing on another device; its tests clause follows Decision 10.
- **D-04 changed**: the browser view also draws from the judgings remembered in the browser's lasting storage (the new decision), the one source the view keeps beyond the page; and the game state stores the moment the game was made, which names the game.
- **D-386 changed**: the moment the game was made is one of the moments the game state stores, a safe integer of any sign, compared with no clock at the load.
- **D-165 changed**: its sentence on the remembered judging says the judging the browser remembers names its program by that number, so a deleted program's judging stands beside no other program.
- **D-206 changed** (the human's remark names it): the judgings remembered in the browser are no part of the saved game state, and a game started anew shows none of the discarded game's judgings. The foundation step judges whether D-402 needs the same sentence for „Zacznij od zera”.
- **New invariant** (method: test; part: browser-view; derives from the new decision): a value under the keys of the judging cache gives a judging only in the form the cache writes, for the account and the game its key names, and no value read from the browser's storage throws out of the cache.
- **Part map** (through `the-way-update-part-map`): the new module of the cache under *Trust boundary* of `browser-view`.
- **Guideline** `guidelines/testing.md`, „Trust boundaries”: a row for the cache's module with its invariant and its case; the line of remark 4 is planning's.
- **Glossary**: no term changes meaning; the foundation step judges whether the moment the game was made needs an entry beside „save time”.
- **Tests' `decision:` lines** quoting D-440, D-165, D-04, D-386 or D-206 follow the new wording.

## Left to the maker

- The names of the new field, functions, module and test file; whether the act of a judging stays a `GameResult`; the letters of the results, the separator of the key and the bound on a value's length.
- Whether the function that makes a new game takes the moment as a required argument (every test call changed or given through a helper) or the page stamps it with a function of its own; whichever, a test of each page path of Decision 3 shows the moment is the clock's reading, and no path makes a game without it.
- The hash's construction, within Decision 2 (53 bits, deterministic, no browser API, key-order independent).
- Where exactly V2 reaches `localStorage` (the game view or `app.ts`) and how the maps entry hands the reading to the screen (a prop or a control).
- The order of the slices; the removal of the first run's code and the addition of the cache may be cut so that every slice passes the gate.
- Whether the request states an entry's measured size and the number of entries a quota of a few megabytes holds.
