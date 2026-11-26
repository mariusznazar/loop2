done with concerns

# Fix of the whole-change review's findings, task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, reviewed head `cf6be29e` (confirmed with `git rev-parse HEAD` at the start). Nothing pushed. No full gate run (`npm test` with no file argument was not run); focused checks only.

## Commits (in order, on top of cf6be29e)

1. `2d0678c8` fix: B1 — `balance/progression.mjs`, `tests/balance/progression.test.mjs`
2. `93db0e24` fix: findings 4, 5, 6, 7, 8, 9 — `src/browser/view/catalog-lines.ts`, `counted-name.ts`, `map-catalog.tsx`, `map-lines.ts`, and the tests `catalog-lines`, `map-catalog`, `counted-name`, `maps-record`, `maps-screen`, `account-screen`
3. `6253e69f` docs: findings 6, 7, 8, 11 — `guidelines/styleguide-browser-view.md`
4. `962cced1` docs: findings 1, 2, 3 — `foundations/decisions.md` (D-441, D-438), `guidelines/testing.md`, `src/browser/view/judging-cache.ts` (one comment), `tests/view/judging-cache-record.test.mjs` (one `decision:` line)
5. `14c39365` docs: finding 10 — both copies of `loop2-balance/SKILL.md`
6. one more commit, `test: quote D-438 as it stands …`, on `tests/balance/progression.test.mjs` (see B1; its first commit held a quotation the foundation check refuses, the fix of it came after the first commit)

## Per finding

### B1 — fixed
`balance/progression.mjs`: `SOLVABLE_SHARE = 20` is now `SOLVABLE_SEEDS = 1` ("The seeds of the measurement a map's best program solves, at the fewest, for the map to count as solvable (D-438)"); `solvable: best.solved >= SOLVABLE_SEEDS`. Each row of the measurement now also carries `solved` (the count, from `summary.solved`), because `solvedShare` is rounded to 0.1 % and one seed of a long list would round to 0 (a choice: the count, not `solvedShare > 0`). The doc comment of `measureProgression` says "solves one seed or more". Tests: the constant case reads `SOLVABLE_SEEDS === 1`; the other two cases (`edge.solvable === true`, "a map no program solves is not solvable") stand unchanged and pass; a new case — forest measured with `forestNaive` on seeds 9 to 16, which solves 1 of 8 (12.5 %) — reads solvable, carrying `// decision: D-438 "In one map check of the balance instrument a map can be solved where its best reference program, played with the character built from what the maps before it gave, solves at least one of the seeds 1 to 500"`. D-438 had no `tests:` clause; I added one to its *Verification* (the template asks for it once a test holds a sentence), leaving the pair of examples for the part no test holds.
- Failing run first: with the line temporarily `solvable: best.solvedShare >= 20`, `npm test -- tests/balance/progression.test.mjs` exit 1 (`false !== true` at the new case; output in `reports/fix-whole-probes/b1-test-failing-with-the-old-reading.txt`); restored; passing: same command exit 0, 14 pass.
- `grep -rn -i "solvable\|SOLVABLE_SHARE\|solvedShare" balance tests .claude/skills/loop2-balance .agents/skills/loop2-balance README.md`: nothing else reads the old share (the skills hold neither word; `solvedShare` elsewhere is the engine's own field). `cmp` of the skill's two copies after finding 10: exit 0.
- Probe that found the 12.5 % case: `reports/fix-whole-probes/probe-solvable-seeds.mjs` (its relative imports assume the file stands directly under `.runs/<dir>/` of the worktree root; run `node` on it from the worktree root).

### 1 — fixed (D-441), marked `the cycle's`
Added a sentence to the last paragraph of D-441: "A record the storage refuses stays for the open page, and the stored one is left, since the record never falls." It is a new sentence and not a rewrite of the one before it, because six test lines quote that one word for word. The change took the entry over the 600-word limit of binding sentences (622, the limit is for an entry a change alters); to bring it to 598 I cut from the paragraph "The unsaved game state stays out of the browser's lasting storage as D-211 gives, and the remembered judgings stay there after „Wyloguj”, holding …" the list "the account's identifier, numbers of characters and programs, identifiers of maps, kinds of results and items with their counts, and", which the first paragraph of the same entry (what the value holds) and the *Rationale* ("the account's opaque identifier, numbers, identifiers of maps, kinds of results and items") already say; no test quotes that sentence. This is a change of a binding sentence beyond the ordered clause; it is for the human to accept or to undo at the merge, and I name it among the concerns. The refused-write record test now carries a `decision:` line with the new sentence (the test already asserted "leaves the stored record where it is").
- `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors" (first run without the trim: exit 1, "D-441 … 622 words in all (at most 600)").

### 2 — fixed, no behaviour change
A comment in `readRecordValue` (`src/browser/view/judging-cache.ts`) says a value written by hand as `-0` or `2.4e1` is read as the number it denotes (0, 24), as the reading of the judgings does, and why that harms nothing.

### 3 — fixed in the guideline; the invariant is left, a concern
`guidelines/testing.md`, the row `src/browser/view/judging-cache.ts` of *Trust boundaries*, now also names `tests/view/judging-cache-record.test.mjs` and its cases (every stored-value case, the case of a storage answering with no text, the replacement of a bad value, the bad offers, the foreign accounts, games and versions, the separator in an account's identifier, the refusing and the broken storage, and the opening). The sentence of `judging-cache-reading` in `foundations/invariants.md` ("gives a judging") is unchanged: the entry has no *Verification* cases to widen, so there was nothing I may change without changing its rule. Concern: its sentence names the judging alone while ten cases of the record carry `// invariant: judging-cache-reading`; a human may want "gives a judging or a record" there.

### 4 and 5 — fixed
`DokadRegion` carries `region: RegionName` and `solved.forced` / `solved.expanded`, computed once in `catalogLinesOf`; `map-catalog.tsx` no longer parses the header (`regionOf` and the `REGIONS` import are gone), no longer recomputes the rule, and keys the group by `region.region`. Tests of the lines carry `region` and `forced`.

### 6 — fixed
The solved maps unfold for the picked map only where it stands among them (`solved.some((row) => row.selected)`), and for a search; the fold stays enabled and works for a picked open map. Tests: `catalog-lines.test.mjs` (the five states: picked solved, search, unfold by the player, picked open, picked open plus unfold), `map-catalog.test.mjs` (the picked solved map is seen with the fold disabled; a picked open map leaves them folded, the fold is enabled, unfolds and folds; nothing stored). Two older tests assumed the old behaviour and changed for the requirement, not to pass: `maps-screen.test.mjs` "a row is a link …" (the open picked map now leaves the solved ones folded; the test presses the fold before reading the circles) and `account-screen.test.mjs` "a reload at #/mapy/forest …" (expects the one open picked row, "the solved one stays folded"). The styleguide section (Mapy, the "Dokąd" bullet) says it. Failing first: `catalog-lines`, `map-catalog`, `counted-name` and `maps-record` failed against the source at `cf6be29e` (checked by restoring the source files from git, running the four files, and applying the change again: `catalog-lines` and `counted-name` stopped at the new export, `map-catalog` and `maps-record` at their assertions); `maps-screen` and `account-screen` were not run against the old source, they failed against the new one and were changed for the requirement.

### 7 — fixed
Counters: `countText(open.length, KNOWN_FORMS)` with "poznana/poznane/poznanych" and, after „z” in „Postęp”, the genitive forms "poznanej/poznanych/poznanych": "1 poznana · 0 rozwiązanych", "2 poznane · 1 rozwiązana", "5 poznanych · 4 rozwiązane", "0 rozwiązanych z 1 poznanej", "1 rozwiązana z 2 poznanych". Test: all five states the five maps give (1 to 5 open maps). The numbers 12 and 22 of the handoff cannot be reached through the catalog, because the game has five maps and `sendMaps` reads the game's data; they stand in the rule shared with the other counters (`countedName`, tested for 0, 1, 2, 4, 5, 12, 14, 21, 22, 24, 25, 112, 122 in `counted-name.test.mjs`) — the catalog applies it and I did not copy that test.
Real browser: `npm run local`, new account, Mapy: the counter reads "1 poznana · 0 rozwiązanych" in „Dokąd” and "0 rozwiązanych z 1 poznanej" in „Postęp" (read with `eval`; screenshot inspected, not shown to the human, so none kept).

### 8 — fixed, with a concern
`withPreposition(count)` in `src/browser/view/counted-name.ts` (the one place): "ze" for 0, 6, 7, 16, 17, 60 to 79, 100 to 199, 600 to 799, and for numbers from 1000 on by their thousands; "z" otherwise. `recordLine` uses it: "niedźwiedź: 24 ze 120" is unchanged and the wolf's line is now "wilk: 7 z 24". Tests: 0, 1, 5, 6, 7, 8, 16, 17, 18, 24, 50, 59, 60, 70, 79, 80, 99, 100, 120, 199, 200, 599, 600, 799, 800, 999, 1000, 1500, 2000, 6000, 16000, 10^6, 6·10^6 in `counted-name.test.mjs`, and the real creatures' two health numbers (120, 24) in `maps-record.test.mjs`/`catalog-lines.test.mjs`. I added 16 and 17 to the orchestrator's list on its own principle ("begins with s, z, sz …": szesnaście, siedemnaście). Concern, not a decision: whether Polish wants „ze” before „siedem-” (7, 17, 70 to 79) — I know „ze sześciu”, „ze stu”, and I am not sure of „ze siedmiu” against „z siedmiu”; I followed the handoff's rule and the data has no creature with those numbers. If the human prefers „z siedmiu”, the three numbers come out of one function and one test row.

### 9 — fixed by the exported pure function (not held wrong)
`catalogLines(input)` takes no data or regions now; it calls the exported `catalogLinesOf(data, regions, input)`. The five cases that need what the five maps do not show (a streak of 90 minutes with a step of 9, a resource that does not renew, the wolf as the record's creature, a map that names none, a region with nothing open) call `catalogLinesOf`; every other case calls `catalogLines` with ids from the game's data. The product code has no optional parameter for a test any more.

### 10 — fixed
Both copies read "… takes about a minute and a half." with no history of the change; `cmp` exit 0; `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` exit 0.

### 11 — fixed
The rule "The scene of a map run" now names the stronger creature: the opening sentence says "stworzeniem, które napada: wilkiem albo niedźwiedziem", the wolf paragraph keeps its sentence about the wolf's sheets (paws on the bottom row; true of the wolf) and adds the bear of Las — matecznik: same place, same order of layers, own sheets of 64 × 64, paws not on the bottom row of the frame but a few rows above it, so the scene lowers its frame by `SCENE_FIGHT.sink` (a number of rows from the scene's data, different for each creature: wolf 0, bear 4) and its paws stand on the ground line; "kod widoku nie nazywa żadnego pliku stworzenia". I said nothing about the bear's bite height (the code does not tell it) and nothing about a pack of the bear's pictures (the data comment names none). Checked against `src/browser/sim/data/scene.ts` (`SCENE_CREATURES`, `SCENE_FIGHT`) and `scene.tsx:406`, `scene-picture.ts:259`.

## Checks (command → exit code)

- `npm test -- tests/balance/progression.test.mjs` → 0 (14 pass), after the failing run above
- `npm test -- tests/view/catalog-lines.test.mjs` → 0 (14); `map-catalog.test.mjs` → 0 (13); `counted-name.test.mjs` → 0 (3); `maps-record.test.mjs` → 0 (10); `maps-screen.test.mjs` → 0 (50; first run 1 fail, the old-behaviour test above); `map-lines.test.mjs` → 0 (11); `account-screen.test.mjs` → 0 (132; first run 1 fail, same reason); `end-window-game.test.mjs` → 0 (27); `screen-address.test.mjs` → 0 (68); `judging-cache-record.test.mjs` → 0 (70); `judging-cache.test.mjs` → 0 (107); `judging-cache-page.test.mjs` → 0 (6)
- `npm test -- tests/quality/test_function_and_file_size.py` → 0; `tests/quality/test_quality_invariants.py` → 0 (Prettier, ESLint, Ruff, ShellCheck rules); `tests/quality/test_node_test_selection.py` → 0; `tests/agent_workflow/test_loop2_balance_skill.py` → 0
- `npx prettier --check` and `npx eslint` on every changed .ts, .tsx, .mjs → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0 ("0 errors") on the committed tree; `python -B .the-way/instruction-files/check_instructions.py` → 0 ("0 error, 0 warn, 122 info")
- Not run: the full `npm test`; the phone layout and the fold of a solved map in the real browser (a solved map needs a map run of eight game hours; the fold is shown by the jsdom test only — unchecked in a real browser).

## Own-work check
Requirement most likely not met: D-438 "a map can be solved where its best reference program solves at least one of the seeds" — a map whose best program solves a small share. Check: a case where the best program solves 1 of 8 seeds (12.5 %, below the old 20 %); it failed against the old line and passes now. Second: D-331's reason for the unfolding (the picked row seen) — the test with a picked solved map shows its row and the disabled fold, and with a picked open map the folded group and a working fold.

## Choices (way rejected, cost if wrong)
- `solved` count on the row and `SOLVABLE_SEEDS` — rejected `solvedShare > 0` (rounds to 0 for one seed in more than 1000); cost if wrong: a field more on the row, none visible in the table.
- D-441 as a third sentence plus the trim above — rejected editing the quoted sentence (six quotations would stop standing) and a new decision for the record (a second entry for one storage); cost if wrong: the human undoes the trim, and the entry stands at 622 words, which the check refuses.
- `catalogLinesOf(data, regions, input)` — rejected a parameter bag on `catalogLines`; cost: one more export.
- `withPreposition` in `counted-name.ts` — rejected a new file (a new file needs the part map); cost: the file's name now also holds a preposition rule (its header says so).
- Genitive „z 1 poznanej” — rejected „z 1 poznanych”, which is wrong Polish for one; cost: a form a reader may notice as unusual.

## Reach beyond the dispatch
- `.the-way/elements/decisions/template.md`, `elements/common/rules.md`, `elements/common/way_of_working.md`, `decisions/skill/read.md` and `decide_entry.md` (the chain behind `the-way-record-decision`), and `product-guidelines/testing/SKILL.md` with the rule *Trust boundaries* of its `template.md`: read as the handoff said, to write the D-441 and D-438 edits and the testing-guidelines row.
- `foundations/decisions.md` D-325 (searched for "unfold": the unfolding rule is not in a decision, so the D-331 sentence the old test quoted stays its anchor for the row) and `foundations/invariants.md` `judging-cache-reading`.
- `.the-way/task-cycle/change/fix.md` and `ui_check.md` (the method files named by `SKILL.md`).
- `src/browser/sim/data/scene.ts`, `src/browser/view/scene.tsx`, `scene-picture.ts` (grep and ranges) for finding 11.

## Working copies
`.runs/fixer/` (scripts, outputs, a patch of the source, a screenshot of Mapy for my own look) stood under the worktree root and was removed; the input and command of the B1 probe and the failing run are kept in `reports/fix-whole-probes/`. The local game start (`npm run local`) was stopped (`npm run local:stop`, "Local starts stopped: 1") and the browser closed. The Playwright CLI's own files stay in `.playwright-cli/` (git-ignored, the tool's own).

## Concerns for the orchestrator
1. D-441's binding sentences were trimmed by one list (finding 1 above) to stay within 600 words; the human accepts it at the merge or asks for another way.
2. The invariant `judging-cache-reading` says "judging" only (finding 3).
3. „ze” before 7, 17, 70 to 79 follows the handoff's rule; the Polish of it is unverified (finding 8).
4. A picked solved map still disables the fold (as D-331's reason needs); it is the one case where the fold is dead.

## Unread material
- `guidelines/styleguide-browser-view.md`: read in full lines 1 to 330, 838 to 964 (the section The screen Mapy) and 1122 to 1322 (the scene of a map run), and the list of headings; lines 331 to 837, 965 to 1121 and 1323 to 1557 not read (the rest of the rules of states, layouts, the screens other than Mapy and the scene, the end window, the list of accounts).
- `guidelines/testing.md` read whole; `guidelines/coding.md`, `coding-browser-module.md`, `coding-balance-instrument.md`, `coding-content-data.md` and `src/browser/AGENTS.md` read whole.
- Foundation by heading: D-440 and D-441 read whole; D-438 read from its heading to its *Verification* and the start of *Rationale*/*Rejected* (the tail of its *Rejected* not read); D-325 and D-331 read in part (the binding paragraphs and the start of the verification); D-416, D-448 and D-449 not read (D-416 only through the test quotation "The counters of the screen decline by the number" found by grep; D-448 only its heading and first paragraph); the invariant `judging-cache-reading` read whole.
- `.the-way/elements/decisions/examples.md` and `elements/common/reaching_another_skill.md`: not read (no hand-over to another skill was needed). `project-level/technology/reserved_choices.md`: not read (no reserved choice arose).
- `reports/review-whole-report.md`, `task.md`, `plan.md`: not read (the findings file carried what I needed).
- `.claude/skills/loop2-play/SKILL.md` read in part (start, the way into the game, the phone section up to the measuring script; the rest not read).

## Searches not found or unclear
- The handoff names "12 and 22" for the counter tests; the catalog reaches 1 to 5 open maps only (found by reading `sendMaps` and the data); stated above.
- The handoff's rule for „z”/„ze” lists 6, 7, 60–79, 100–199, 600–799 and "so on"; I read "so on" with the stated principle and added 16 and 17; unclear whether that was meant.
- Did not find a rule of the-way that tells how many words a binding paragraph may lose in a trim made only to fit the limit; chose the list that two other places of the entry already say.
