PASS d84a5958

# Review rc15 — slice 5 of correction 1 (the judging cache), task `ocena-programu-na-ziarnach`

- Range: `614c7559..d84a5958` (one commit, `d84a5958`); `git rev-parse HEAD` in the cycle's worktree gave `d84a5958555eb1e5ecc4b8e6eddfa878e8641c55`, the head given. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0`, confirmed in the worktree and in my review worktree.
- Files: `src/browser/view/judging-cache.ts` (+324), `tests/view/judging-cache.test.mjs` (+791), `foundations/part_map.md` (+1), `guidelines/testing.md` (+3/−2) — equal to the slice's *Change*.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (a correction).
- Judged against: the plan's Slice 5 (handoff), the spec `spec.md` read whole (Decisions 1–11), D-441 and D-440 whole, D-209 and D-211 whole, the invariants `judging-cache-reading`, `cross-part-imports`, `document-test-memory-limit`, the part map's `browser-view`, the part-map template's *Trust boundary*, the testing template's "Trust boundaries" rule, `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`.

## Blocking findings

None.

## Minor findings

### M1 — A value of a program or character number the loaded game never gave stays, and can stand beside a later new program or character of that number

- Place: `src/browser/view/judging-cache.ts:239-253` (`isAboveLoaded`) and `:261-280` (`tidyStorage`).
- What: the opening drops this game's values whose content revision or generation stands above the loaded game's own, but only where the loaded game holds the triple's program or character. A value for a program number at or above the loaded state's `nextProgramId`, or a character number at or above its `nextCharacterId`, is kept whatever it holds. Such a value can only come from a game state the server never received (a page closed while its save failed, D-208, or a save refused at „Wyloguj”, D-97) — or from another tab's newer state not yet saved, the same race the drop above the loaded revision already takes. The executor named the program half; the character half is the same: a character created and judged in the lost state, then a new character of that number at generation 1, shows the lost character's judging for a program at the same content revision.
- What a player sees: after such a lost save, the next „Nowy program” (or a copy saved as new, or a pulled program) gets the lost program's number at revision 0 (D-165 counts from the server's `nextProgramId`), and the row of „Kto idzie” for that character and map can show „szczelny: 12 z 12” or „{n} z 12” for a program never judged, whose content may differ (a copy saved as new, a pulled program, or edits reaching the same revision). It lasts until the next judging of the triple or the next change of the program; „Puść w pętlę” judges anew on its first click (D-243), so no loop starts on it.
- Why Minor and not blocking: D-441's *Rationale* accepts exactly this class — „a judging made after a change lost with a page closed while its save failed (D-208), or with a save refused at „Wyloguj” (D-97), can stand beside other content that reaches the same content revision (D-442)”; the creation of the lost program is such a change, and the new program „other content that reaches the same content revision”. Spec Decision 11.3 and D-441's binding sentence give the drop above the loaded revision or generation only. The code does what the entry says; the gap is the accepted rare cost the spec names, of the same frequency and the same consequence as the repeated-revision gap, not a contradiction.
- How to close it, if the orchestrator takes it: the game state holds both counters (`nextProgramId`, `src/browser/sim/types.ts:498`; `nextCharacterId`, `:516`), so at the opening drop this game's values whose program number is at or above `state.nextProgramId` or whose character number is at or above `state.nextCharacterId` — two comparisons in `isAboveLoaded` with the ids parsed as safe integers, a case in the test file (a value of program `nextProgramId` and of character `nextCharacterId` dropped, of a present id kept). It changes what D-441's third paragraph says the opening removes, so it goes through the foundation step first (D-441's binding sentence and its *Rationale* clause), then the code. Leaving it costs nothing until a save is lost after a new program or character was judged.
- Evidence: probe section 5 in `reports/review-rc15-probe-out.txt` — with the state's `nextProgramId=2` and `nextCharacterId=2`, values under program 2 and character 7 are both kept by the opening.

### M2 — The case of a separator in an account's identifier passes with the escaping of key parts removed

- Place: `tests/view/judging-cache.test.mjs:313-333`, case „an account whose identifier holds the separator of a key shares no judging with another account”, cited in `guidelines/testing.md:178` as a case of `judging-cache-reading`.
- What: with `part` in `judging-cache.ts:68-72` reduced to `return String(text);` (no escaping), the whole file passes (mutation M3, exit 0). The case writes for account `"a|1000"` and opens account `"a"` with the moment 1000; without escaping, the key `loop2-judging-1|a|1000|1000|1|1|forest` starts with account `"a"`'s own game prefix `loop2-judging-1|a|1000|`, so the opening keeps it by the coincidence that the suffix equals `MADE`. With an identifier such as `"a|999"`, the unescaped opening of account `"a"` would remove the other account's value (it starts with `loop2-judging-1|a|` and not with `…|a|1000|`), against D-441's „leaving the values of other accounts”. The escaping in the code is correct (probe section 3: account `"a"` leaves `"a%7C999"`'s value; `"x|y"` and `"x%7Cy"` do not collide; a lone surrogate opens and reads), but no case would see it go.
- Why Minor: account identifiers come from the server's `randomUUID` (spec Constraints), which holds no `|` or `%`, so no player meets the case; reading is not affected even without escaping, since map identifiers from the data hold no separator. The cost is a guideline row and a test title that claim a protection the test does not give.
- Fix: in the case, use an account `"a|999"` (a moment that differs from the opening's) and assert that opening account `"a"` leaves its value and reads none of it.
- Evidence: `reports/review-rc15-mutate-out.txt`, line „M3 key parts not escaped: exit 0 SURVIVED”.

### M3 — Two comments say more or other than the code does

- `src/browser/view/judging-cache.ts:233-238`: „A triple whose program or character the loaded game lacks … is left alone.” The code compares each half with its own: a value whose program the loaded game lacks but whose generation stands above the character's is removed (probe section 6: „program absent, character's generation above: removed”). The behaviour agrees with D-441 („whose content revision or generation number stands above that of its program or character”) and with the executor's report; the comment should say „each half is compared only where the loaded game holds it”.
- `src/browser/view/judging-cache.ts:256-258`: „of this game those a refused save may have made untrue” — the drop above the loaded game's own concerns values from a save that never reached the server (D-441: a page closed while its save failed, D-208, or a save refused at „Wyloguj”), not a refused save alone; the comment at `:234` says it right. Wording only; no claim that the refused-save path closes more than D-441 gives (spec 11.2 holds).

### M4 — `lastingStorageOf` gives `undefined` where the window has no `localStorage`

- Place: `src/browser/view/judging-cache.ts:316-324`.
- What: the function is typed `JudgingStorage | null` and documented as giving none where the browser refuses the storage; for a window whose `localStorage` is absent it gives `undefined` (probe: `lastingStorageOf({})` gives `undefined`). The cache then treats `undefined` as a storage and every call fails inside its guards, so the judging still stands for the open page and nothing throws (probe section 4 passes) — no effect for a player. `return page.localStorage ?? null;` makes the contract true and keeps the cache off the throwing path.

### M5 — The game's moment is given twice to the opening

- Place: `JudgingCacheOpening`, `src/browser/view/judging-cache.ts:26-32`.
- What: the opening takes `madeAtMs` and `state`, and the state holds `madeAtMs` (`src/browser/sim/types.ts:559`). A caller (slices 6–7) that passes a moment differing from its state's would key the judgings under one game and compare them with another. The plan lists both inputs, so this is a polish of the design: read the moment from `state`, or drop `state.madeAtMs` from consideration explicitly. No effect at this head, where no file calls the cache.

### M6 — The part's sentence of `browser-view` does not name the one lasting state the part now keeps in the browser

- Place: `foundations/part_map.md:5`.
- What: the slice adds the module under *Trust boundary* as the plan asks; the part's responsibility sentence (draws the screens, sends requests, reports failures, holds the kitchen-sink page) says nothing of keeping the remembered judgings in the browser's lasting storage, the only lasting browser state of the game. The file is claimed by `src/browser/view/**` and the trust-boundary line is right (the template: a file that takes in what the product does not control). A reader of the map looking for what reaches the browser's storage finds it only through the trust-boundary list. The executor named it. Adding a clause through `the-way-update-part-map` closes it.

## Correction remarks (`reports/correction-1-remarks.md`)

- Remark 1 (the judgings leave the saved game and become a browser cache): this slice makes its module at the trust boundary — the key under account, game and triple, the stored form, the reading of crafted values, the storage's failures, the opening's removals (D-441). The wiring into the page, the screen and the removal from the saved game belong to other slices; not judged here.
- Remarks 2–5: not in this slice.

## Hostile input at the trust boundary

The range touches `src/browser/view/judging-cache.ts` (new boundary) and not `src/browser/sim/saved-game.ts`, the boundary the handoff names; that one is not touched by this range.

Probes (`reports/review-rc15-probe.mjs`, output `reports/review-rc15-probe-out.txt`, against the build of `d84a5958`): each read as none, left in place, no throw, under 200 ms — extra fields `toString`, `valueOf`, `hasOwnProperty`; revision as a text, as `[0]`, as 2^53+2; generation 1.5, −0, `true`; twelve UTF-16 units holding a surrogate pair, a lone surrogate, a NUL; items `hasOwnProperty`, `__defineGetter__`, a nested pair; 500 nested lists within the bound; JSON `true`; a duplicated field name; 200 000 pairs and a 5 MB text (over the bound, not parsed); a count of `1e400` and of −0. Admitted, and allowed by the spec: a revision written `0.0` or `-0`, the four fields in another order, equipment out of the data's order, white space around the JSON. Keys: no collision between `"a|1000"`, `"a"`, `"x|y"`, `"x%7Cy"`; an opening of account `"acct"` leaves `"acct-1"`; an opening of `"a"` leaves `"a%7C999"`. Storages: absent `localStorage`, a `getItem` that throws, a `length` that throws midway — none throws, the judging stands for the open page. Together with the 55 crafted values and the four stand-in storages of the test file, the module does what `judging-cache-reading` and D-441 say.

No file of the simulation changes in the range, and the module imports only `../sim/data/balance.js`, `../sim/data/items.js`, `../sim/judging-record.js` (type) and `../sim/types.js` (type) — `browser-view` depends on `simulation` (`cross-part-imports` passes).

Irreversible operation: none. At this head no file of the product calls the cache (`grep judging-cache` in `src`, `tests`, `balance` of the review worktree finds only the test file), so nothing removes any value of a browser yet; the removals the opening makes are of the cache's own recomputable values, by D-441.

## Considered and not a finding

- `guidelines/coding.md`, „Hiding a failure” (a degraded mode leaves a log line): a storage that refuses (quota, a blocked storage) is an expected refusal of the browser that D-441 settles („no exception of the storage reaches the screen …”, *complies*: „with no sentence”), not a failure in the rule's sense; each `catch` wraps only the storage's own call (`:194-231`), so no error of the cache's own code is swallowed.
- An opening in one tab can drop a judging another tab made on a newer state not yet saved, above the opening tab's loaded revision: the narrowing of spec Decision 11.3 takes it, and the next judging restores it.
- The stored value always reads back: the judging's equipment comes from `clipTrip` (`src/browser/sim/trip.ts:19-34`), which gives counts above 0 only, and a take list naming an item twice is refused by the program's check (`src/browser/sim/programs.ts:231`); a generation is 1 or more and a revision 0 or more.

## Declined to judge

- The five errors of `foundation_check.py` in `tests/sim/saved-game-judgings.test.mjs` (lines 111, 124, 170, 257, 304): a file of the first run that slice 9 removes, outside this range, as the handoff notes.

## Checks run

All in a detached worktree of `d84a5958` at `.runs/review-rc15/wt`, after `npm ci` (exit 0).

- `npm test -- tests/view/judging-cache.test.mjs` → exit 0, 79 pass, 0 fail.
- `npm test -- tests/invariants/test_cross_part_imports.py` → exit 0 (10 tests).
- `npm test -- tests/invariants/test_simulation_isolation.py` → exit 0 (5 tests).
- `python -B .the-way/elements/common/foundation_check.py` → exit 1, the 5 expected errors in `tests/sim/saved-game-judgings.test.mjs`, none in the files of the range (`reports/review-rc15-foundation-check-head.txt`); `--skip-test-citations` → exit 1, the same 5.
- Positive control of the invariant's citation: the lines `invariant: judging-cache-reading` deleted from the test file in my copy, the foundation check run → exit 1 with `foundations/invariants.md:1472: \`judging-cache-reading\` reads \`test\` and no test cites it` (`reports/review-rc15-foundation-check-control.txt`); the file restored with `git checkout`. So at the head the check finds the test.
- Mutation probes (`reports/review-rc15-mutate.py`, output `reports/review-rc15-mutate-out.txt`), each a change of `judging-cache.ts` then `npm test -- tests/view/judging-cache.test.mjs`: 18 of 19 killed (exit 1) — the exact four fields, the length bound, the revision drop at equal, the refused-save flag, the memory after a good write, the stored value after a refused write, other accounts tidied, the results' length, an item named twice, a negative revision, generation 0, the memory never read, other games not tidied, the generation drop, an item the data lack, a count of 0, a `getItem` exception let out, `lastingStorageOf` letting its throw out. Survived: the escaping of key parts (M2). The refusal of the invariant is so seen failing (M1, M2, M9 of the mutation list among others).
- Hostile-input probes (`reports/review-rc15-probe.mjs`) → exit 0, 0 failures (`reports/review-rc15-probe-out.txt`).
- `npx eslint src/browser/view/judging-cache.ts tests/view/judging-cache.test.mjs` → exit 0; `npx prettier --check` of the same two files → exit 0; `npm test -- tests/quality/test_function_and_file_size.py` → exit 0.
- Not run: the full `npm test` (the handoff forbids it; the cycle runs it before the request), `npm run typecheck` (the build of `npm test` compiled the module; the executor reports typecheck exit 0, unverified by me).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md` — the method names it for a correction.
- `foundations/decisions.md` D-252 (first part) — the decision behind „Hiding a failure” in `guidelines/coding.md`, to judge whether the cache's silent catches break it.
- `.the-way/elements/part-map/template.md:40-139` — „Trust boundary” and „Assigning files”, which the part-map skill names, to judge the new line of the map.
- `src/browser/sim/judging.ts:55-96`, `src/browser/sim/trip.ts:1-52`, a grep of `src/browser/sim/programs.ts` for duplicates — whether a record the cache writes always reads back.
- `src/browser/sim/types.ts` grep for `nextProgramId`, `nextCharacterId`, `madeAtMs`, `generation`, `contentRevision` — the D-165 question and M5.
- `src/browser/sim/judging-record.ts:1-80` — the record type the cache stores.

## Working copies

- `.runs/review-rc15/` under the task's worktree held the detached worktree `.runs/review-rc15/wt` of `d84a5958` (with `node_modules` from `npm ci` and the build), the probe and mutation scripts and their outputs. The worktree was removed with `git worktree remove --force` and `git worktree prune`, then the directory `.runs/review-rc15/` was removed by its full path; `git worktree list` shows no `rc15` entry. Kept beside this report: `review-rc15-probe.mjs`, `review-rc15-probe-out.txt`, `review-rc15-mutate.py`, `review-rc15-mutate-out.txt`, `review-rc15-foundation-check-head.txt`, `review-rc15-foundation-check-control.txt`.

## Unread material

- `guidelines/styleguide-browser-view.md`: not read (1213 lines); the module draws nothing and holds no text, colour or length.
- D-117: not read whole; the spec's Decision 1 quotes its binding sentence and *violates*, and the cache is no API client.
- D-442, D-04, D-386, D-07, D-401, D-165 (named by the orchestrator's notes): not read whole; read through the spec's Constraints and Decisions and through D-440/D-441's references. Nothing in the range quotes them.
- `src/browser/account-api.ts:1-20` and `src/browser/sim/types.ts:360-400`: not opened; the spec's Constraints carry `Account.id` and the state's fields, and grep gave the lines needed.
- `.the-way/elements/part-map/skill/decide_entry.md` and `write.md`: not read (the review judges the entry against the template).
- `.the-way/product-guidelines/testing/template.md`: lines 170–209 read, which hold the rule the handoff names.

## Searches not found or unclear

- The handoff's section „Passages of the frozen task” is empty; I judged against the plan's section, the spec and the foundation entries it names, and did not open `task-frozen.md`.
