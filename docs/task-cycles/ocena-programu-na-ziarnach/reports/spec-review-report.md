FAIL

# Spec review — correction 1, task `ocena-programu-na-ziarnach`

- Spec reviewed: `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` (first review of this spec; no `spec-reviewed.md` beside it).
- Worktree head `4e4a104b9862fe1f5a9d843638e80438e5c38d4d`; `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.
- Method: `.the-way/task-cycle/spec/SKILL.md` and `.the-way/task-cycle/spec/review.md`, read whole, as the reviewer of a spec.
- Findings: 1 (a requirement of the task the spec changes). The other three points of the handoff hold; they are answered below with what I checked.

## Finding 1 — the spec changes the task's erasure at a change of the program into „stands while the content is the same”, so a judging the task says is erased comes back

- Where the spec says it: `spec.md:79` („**One difference from the first run, accepted:** a program changed from content A to B and back to A, with no judging of that triple between, shows A's judging again, while the first run had erased it at the change to B. … (D-440 is reworded from „erases” to „stands only while”)”), with Goal 3 (`spec.md:16`), the test „the A→B→A case standing again, pinned as the chosen behaviour” (`spec.md:162`) and the D-440 change (`spec.md:174`).
- What the task and the remark say: *To do* 6 (`task-frozen.md:36`): „Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje” and „Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne”. The human's remark 1 of this correction (`reports/correction-1-remarks.md:3`) moves the store and keeps the behaviour, naming this part of it: „Kształt zachowania zostaje: … kasowanie przy zmianie reguł, grup albo planu wyprawy, przy śmierci, która zabiera wprawę, i przy usunięciu programu.” D-440 today (`foundations/decisions.md:11842`): „A change of the rules, the rule groups or the trip plan of a program erases the judgings remembered for it”, and its tests clause (`:11855-11857`) „the judgings of a program erased by a change of its rules, its rule groups or its trip plan”.
- What the player sees under the spec: a player saves the program as B, does not judge it, then saves it back as A; the badge „szczelny: 12 z 12” or „{n} z 12” of the old judging of A stands again beside „Program:”. Under the task it was erased at the save of B and stays gone until the next judging.
- Why it is a finding and not an intermediate choice: the remark lists erasure among the things that stay, so the spec does not settle an open choice here, it rewrites a requirement the human restated a day ago; the orchestrator's delegation covers intermediate choices and its answers are never the human's approval (handoff, „Delegation”). The build would follow the spec faithfully and then contradict *To do* 6 to the letter, which the review of the whole change grades against the task.
- The spec's argument (the judging shown is a true judging of the content the program has; a cache keyed by its input behaves so) is sound as a design argument and may well be what the human would choose — the human called the memory „cache, żeby nie przeliczać” in question 2 and again in the remark. That makes it a good proposal to the human, not a settled reading.
- Ways out, with what each costs:
  - a. **Exact, as the task says: a content revision instead of the fingerprint.** One number per saved program, raised by the one function that writes content (`withProgramSaved`, which `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill write already pass through), stored in the cached record and compared by equality. It erases on every content change, A→B→A included, on every device, and removes the hash and its collision risk (S1 and the key-order canonicalisation go away). Cost: one field per program in the game state and the save, at the version 9 this change already raises and which is not deployed (`origin/main` has `SAVED_GAME_VERSION = 8`, the branch 9), so no further raise; the load, the append of programs (D-401) and the save of the copy as a new program set or read it. The spec rejected this way (`spec.md:84`) as „a field in every saved program that exists only for the cache, so the saved game's shape does not go back to one without judgings in spirit”; that argument is weaker now that Decision 3 already adds a field to the game state for the cache.
  - b. **Keep the spec's behaviour and put the departure to the human** as a named decision — the material is the quote of *To do* 6 and the spec's A→B→A sentence, with the question whether the badge of an unchanged content may come back. Cost: nothing to build beyond the spec; but the cycle has to have the human's yes before the build relies on it, or the request carries a behaviour the task forbids.
  - Leaving it as written: the change ships a behaviour against *To do* 6 and the remark, with D-440 reworded to match, and the next reader of the foundation sees no trace that the human did not choose it.
- Recommendation: a, if the cycle is to build without waiting for the human — it keeps the task's words, and its price is one counter where the spec already pays for one new field. b, if the orchestrator can get the human's answer before planning.

## The orchestrator's points, checked

### 1. A→B→A — see Finding 1.

The other erasures of the task do keep their meaning under the spec's check at reading, and I found no case where they come back: a death with `progressLost` raises `generation`, which nothing lowers (`src/browser/sim/game.ts:662-675` is the one place it grows; `src/browser/sim/types.ts:454-463`); a deleted program's number is never given again (D-165, `foundations/decisions.md:8121`); a rename and a save that changes none of rules, groups and trip plan leave the content the same.

### 2. The moment the game was made, as the game's identity

- Needed: yes. The remark asks for it outright („Klucz pamięci odróżnia też grę (konto i grę po resecie), żeby ocena z jednej gry nie pokazała się w innej”). The game state holds nothing that changes at a reset (D-402) or after a discarded save (D-206): the page's three paths that make a game call `newGame()` with no argument (`src/browser/view/app.ts:93`, `:312`; `src/browser/view/page-game-acts.ts:187`), and program and character numbers start again at 1.
- The simpler keys do not do it. The account alone: a reset made on another device is loaded on this one by `loadGame` (`app.ts:302-316`), not made here, so a „clear at a new game” on this device never runs, and the old game's (character 1, program 1, map) key answers in the new game. The account and the character's generation: `generation` starts at 1 in every new game (`game.ts:472`), so it tells no game from another.
- The smallest design: I found none smaller. A game identity from the server would need a server change (a new field in the save route or the account), which D-07 and D-204 would have to carry; the revision restarts at 0 after a reset (D-402), so it identifies nothing.
- Against D-04: its *violates* example names a field added „for what the scene's motion or the chronicle needs” (`foundations/decisions.md:109-110`); the moment is a moment of an event written once, which D-04's *complies* list admits („a game state storing the moment of an event, such as … the moment of a save”, `:97-99`), and the spec changes D-04 to name it. Not a contradiction left in place.
- Shape and version: the version stays 9, raised once in this change and not deployed (`origin/main` and `main`: `SAVED_GAME_VERSION = 8` at `src/browser/sim/saved-game.ts:82`; the branch: 9 at `:85`). `guidelines/coding-saved-game.md:110-113` allows rewriting the test's document without a raise exactly in that case, with a comment above the document saying so; the maker reads that guideline before changing the file.
- The strict load: the moment read as a safe integer of any sign, compared with no clock, refused when missing, non-integer or beyond the safe integers (`spec.md:91`, `:164`), as D-386 gives for the save time. The trust-boundary row of `save-version` in `guidelines/testing.md:176` keeps its cases; the new refusals are more cases of „a crafted document of the current version is refused whole as shape”. Right as written.

### 3. Does an entry of the foundation forbid the cache outside the saved game? — No; the spec's conclusion holds.

Searched `foundations/` (decisions, invariants, environment facts, glossary, part map), `guidelines/*.md`, `src/browser/AGENTS.md` and `AGENTS.md` for `localStorage`, `sessionStorage`, `IndexedDB`, „storage”, „lasting storage”, „shared computer”, „next person”, „at logout”, „Wyloguj”, „keeps no identity”, „account id”. What binds anything near the cache:

- D-07 (`decisions.md:255-257`): where the save lies and who computes; nothing says nothing else of the game may lie in the browser. Its *Rejected* „the save kept in the browser” is about the save; the cache is no save and nothing of it is loaded into the game state.
- D-211 (`:4133`, `:4153`, `:4164-4166`): binds „the unsaved game state”; the cached judging is no game state.
- D-97 (`:3100`, *Rejected*): the shared-computer concern is about unsaved progress left in a tab; no binding text on other data.
- D-117 (`:646`, `:653`) and `guidelines/coding-browser-api-client.md:59`: bind the kind `browser-api-client` only.
- D-294 (`:9265`, `:9272`): binds folding only.
- D-04: the view's sources are an enumerated list, which the spec extends — a change, not a breach.
- The decision at `:2914` (*Rejected* „session secrets in browser storage”) is about session secrets; the cache holds none.
- No invariant (`expired-session-unsaved-progress`, `simulation-isolation`, `simulation-inputs`, `save-version`, `player-save-isolation`) and no environment fact speaks of the browser's storage for such data.

So the fallback of remark 1 is not owed. What stays on a shared computer after „Wyloguj” (the account's opaque id, numbers, kinds of results, items) is named by the spec as a cost of the new decision (`spec.md:148`), beside D-211; that is the right place for it.

### 4. The new trust boundary (the judging cache in `src/browser/view/`)

- It is a trust boundary: the module reads values the page did not make in this run (another version of the code, another tab, another script of the origin, the player's own edits), as `src/browser/view/screen-address.ts` reads the address, which stands under *Trust boundary* of `browser-view` (`foundations/part_map.md:26-31`). `guidelines/testing.md:164-166` asks of each boundary of the part map a rule of refusal and a lasting test of it, marked with an invariant and seen failing once; the spec gives all three (new invariant, part-map entry, row in the „Trust boundaries” table, `spec.md:165`, `:179-181`).
- Strict enough: a bound on the length before parsing; exactly four fields; results of the data's length and of three letters; items of the data, each once, counts safe integers from 1; the fingerprint of its written form; the generation a safe integer from 1; `__proto__` and `constructor` as keys refused (JSON.parse makes them own keys, so the exact-fields check catches them); nothing thrown out of the cache, the storage's own exceptions included; keys of another version neither read, written nor removed. The account and the game are not read from the value but put into the key by the page, so a value cannot claim another account. I found no form that should be refused and is not.

## Not findings (for the planner; nothing to change in the spec)

- `balance/engine.mjs:94` and `balance/campaign.mjs:169` call `newGame()`. Where the maker makes the moment a required argument (`spec.md:188`), these two files of kind `balance-instrument` change too and must pass a fixed number, never the clock (invariant `balance-instrument-repeatability`); their guidelines are `guidelines/coding-balance-instrument.md`. The spec's lists of code and checks (Decisions 6 and 10) do not name them; the gate's invariant test would catch a clock read.
- Decision 3 lists the page's paths as „a load refused as another version or archetype” (`spec.md:91`); a load refused as shape goes through the same `startFrom` (`app.ts:89-93`), so one change covers it.
- Goal 1 (`spec.md:14`) speaks of „the shape of version 9 without `judgings`” and leaves out the moment Decision 3 adds; Decisions 3 and 10 are explicit, so no builder is misled.

## Reaches beyond the handoff

- `foundations/decisions.md`: D-97 (`:3074-3100`), D-203, D-204, D-205, D-207, D-208, D-210, D-212, D-213 (first part), D-399, D-400, D-401, D-403 (read as they stood between the named entries), D-329's binding paragraphs (`:9972-9990`), and the lines the storage and identity searches found (`:621`, `:626`, `:1921`, `:2187`, `:2194`, `:2226`, `:2671`, `:2705`, `:2774`, `:2778`, `:2858`, `:2864`, `:2914`, `:3032`) — to check point 3.
- `guidelines/styleguide-browser-view.md:700-715` and `guidelines/coding-browser-api-client.md:59` — whether either ties the remembered judging to the save or forbids storage.
- Code: `src/browser/view/maps-entry.ts` whole (the act draws once after its body unconditionally, and the store exposes `halted()`, so Decisions 6 and 9 are buildable); `src/browser/view/state-store.ts` by grep (`take` ignores the very state, `halted()`); `src/browser/view/app.ts:70-100`, `:295-320`; `src/browser/view/page-game-acts.ts:175-195`; `src/browser/account-api.ts:1-30`; `src/browser/view/game-view.ts` by grep; `src/browser/view/clock.ts` by grep (the moment is `Date.now()`); `src/browser/sim/` grep for `generation`; `balance/` grep for `newGame`; `git show origin/main:src/browser/sim/saved-game.ts` and `main:` for the version.

## Unread material

- `foundations/glossary.md`: read only the entries `judging` and `save time` and the lines a grep for „judging”, „saved game state” and „save time” found, not whole.
- `foundations/part_map.md`: read lines 1-70 (`browser-view`, `simulation`, the start of `account-server`), not the rest.
- `guidelines/testing.md`: read „Where the expected value comes from” through „Trust boundaries” (lines 84-248) whole, the sections the handoff names; not the rest of the file.
- `foundations/decisions.md`: D-213 read in its first part (`:659-693`), not to its end. Every entry the handoff names was read whole: D-04, D-07, D-117, D-165, D-206, D-209, D-211, D-218, D-294, D-386, D-402, D-409, D-439, D-440.
- Everything else the handoff names read whole: `spec.md`, `spec-designer-report.md`, `task-frozen.md` (in two pages), `correction-1-remarks.md`, `slice-04-executor-report.md`, `slice-07-executor-report.md`, `review-whole-report.md`, the invariants `expired-session-unsaved-progress`, `simulation-isolation`, `simulation-inputs`, `save-version`, and `guidelines/coding-saved-game.md`, `coding-simulation-module.md`, `coding-browser-module.md`.

## Searches not found or unclear

- No entry of the foundation or guideline that forbids keeping data of the game other than the unsaved game state in the browser's lasting storage (searches listed under point 3).
- Not checked: whether any local or preview database holds saves of version 9 from the walks of the first run; it bears only on the comment `guidelines/coding-saved-game.md:110-113` asks for, not on the design.

## Working copies

None made; `.runs/spec-review/` was not created.
