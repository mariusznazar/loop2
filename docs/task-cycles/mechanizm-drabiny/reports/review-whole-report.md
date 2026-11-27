FAIL d7136c57ef232b05cad48b2aaaf5ef3f6cc99e5e

# Review of the whole change — task cycle `mechanizm-drabiny`

Range `e84a73ce..d7136c57` (`git rev-parse HEAD` = `d7136c57ef232b05cad48b2aaaf5ef3f6cc99e5e`, as given; `.the-way` at `6ed3cb36`, the pinned commit). 21 files changed, +1304 −124 (13 commits, foundation entries and slices 1–8, none with a review of its own).

Counts: 4 blocking (all Important, all within the task), 9 Minor (8 within the task, 1 outside it), 0 Critical.

## Important findings (blocking)

### I1 — The foundation check of the one command fails on three `decision:` lines

- Places: `tests/view/map-lines.test.mjs:66`, `tests/view/map-lines.test.mjs:67`, `tests/view/maps-screen.test.mjs:572`.
- What is wrong: `python -B .the-way/elements/common/foundation_check.py` on the head ends with exit 1 and `3 errors`:
  - `tests/view/map-lines.test.mjs:66: the quotation stands in no binding sentence of D-149`
  - `tests/view/map-lines.test.mjs:67: the quotation stands in no binding sentence of D-466`
  - `tests/view/maps-screen.test.mjs:572: the quotation does not begin a sentence of D-43`
  The two lines in `map-lines.test.mjs` quote the *headings* of D-149 and D-466 ("When does the game offer a map opened by another map?", "Where does a new map stand in the order of the game maps' data?"), which are no binding sentences. The line in `maps-screen.test.mjs` quotes "which is drawn as a mask and takes its colour from the text beside it", the middle of D-43's one long sentence.
- Why it matters: `npm test`, the one command the repository requires before a merge, runs this check, so the gate fails at the head whatever else passes. No executor of Slices 3 and 8 ran the foundation check (their reports say so).
- Fix: quote a sentence start of each decision. Examples: D-149 "A map whose opening map is still unsolved is absent from the screen Mapy, and from the opening map’s first completion it stands there with its card for every character"; D-466 "A new map stands in the order of the game maps' data right after the last map that the map opening it already opens"; D-43 "In the files of the part browser-view other than its file of design tokens, a value written in place of a design token is …".
- Evidence: the command above, exit 1, run in the reviewed worktree.
- Slices: Slice 3 (`3d272ec9`) for the two lines of `map-lines.test.mjs`, Slice 8 (`d7136c57`) for `maps-screen.test.mjs:572`.
- Contradiction: no

### I2 — No test fails when the measure loses the opener's practice or the stock of the maps before the opener

- Places: `balance/progression.mjs:332-333` (the `practiceIn` and `candidates` that `withOpenerOf` passes) and the one test of that path, `tests/balance/progression.test.mjs:240-266`.
- What is wrong: the only case of the new measure uses Las, whose opener Skraj lasu opens no chain. The opener's character is therefore empty by construction: no practice and no maps before it. Two mutations of the head survive the whole test file (16 pass, 0 fail):
  - (a) `practiceIn: openerSummary.practiceIn` → `practiceIn: {}`. This measures every map with a fresh character, which is the bug D-448's second paragraph exists to forbid.
  - (b) `candidates: candidatesOf(before)` → `candidates: []`. This removes the stock that the maps before the opener give.
- Why it matters: To do 4 and D-448 require the measure "with one character on both maps — the one … `progression` builds for the map that opens it, from what the maps before that one gave". Every rung of this task and of task 16 is measured through exactly the path that has no test. A regression to (a) or (b) would pass the gate, and only someone reading the four-and-a-half-minute table by eye could catch it. The executor of Slice 4 named this gap. A fixture with a non-empty opener already stands in the data (`forestDeep` with opener `forest`, or `forestDeep2` with opener `forestDeep`). A case there can compare `withOpenerShare` against a sweep built from the opener's `practiceIn` and stock, for example, or assert that it differs from the fresh-character sweep.
- Evidence: `reports/review-whole/mut-a.log`, `reports/review-whole/mut-b.log` (command `npm test -- tests/balance/progression.test.mjs` after a one-line `sed` of each mutation in a worktree of `d7136c57`; both exit 0).
- Slice: Slice 4 (`69f74f9e`).
- Contradiction: no

### I3 — D-466 says the catalog shows the maps in the data's order, with no qualification, while the catalog groups them first

- Place: `foundations/decisions.md:6259`, third sentence of D-466: "The catalog of the screen Mapy and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included."
- What is wrong: the catalog orders by the data only within groups the views make.
  - „Dokąd” puts the open unsolved maps first and the solved ones after, under the fold row (`src/browser/view/catalog-lines.ts:275-278`, D-331, styleguide "The screen Mapy" line 961).
  - „Co daje” orders its groups by how few maps give the resource, and within a group puts the solved maps first (`catalog-lines.ts:365`, `:376-377`, styleguide line 971).
  The sentence restates the order more broadly than the product does it. It was written in this change and marked `the cycle's` (it is not in row 5 of *Settlements to record*).
- Why it matters: a later agent that reads D-466 alone, such as the agent of task 16, may take it as a requirement to drop the grouping, which D-325, D-331 and the styleguide keep. WAY-263 and WAY-364 grade such a mismatch Important.
- Fix (one clause): for example "… show the maps in the order of the game maps' data within the groups each view makes (D-325, D-331) …", or name the end-of-run window and „Postęp” alone.
- Slice: the plan's *Foundation entries* (`5a0b6ccf`).
- Contradiction: yes — D-466, the entry the change writes, which here says more than the catalog does (against D-331 and the styleguide's rule "The screen Mapy").

### I4 — D-327 says that on a phone the tag and the opener "stay beside the name", but the card puts them on the line under it

- Place: `foundations/decisions.md:10491`, the clause "and in the phone layout the tag of the state and „odsłania ją {mapa}” stay beside the name and „Wejdź — wybierz postać” at the top of the card"; and its *Verification* complying item "the tag „otwarta” beside the name".
- What is wrong: Slice 8 made the tag, the separator and the opener one item, `.maps-card-tags` (`src/browser/view/map-card.tsx:145-161`, `src/browser/maps-screen.css:268-279`), which wraps as a whole.
  - Executor 8 measured the solved Las — głębiej card at 360 px: 318 px of room, against the name 134 + icon 31 + tag item 150 + gaps. The item goes to the second line of the heading (`reports/executor-8-report.md`, Walk and "Where my code makes a foundation entry less exact").
  - The cards of the rungs have longer names and a longer opener („odsłania ją Las — głębiej II”). By the same widths, their tags stand under the name on the phone in both states, as does the card of Las — wataha. This is derived from executor 8's measured widths, not measured by me.
  So the entry written in this change says "beside" where the card puts the tag under the name. The departure D-327 means to name (the old Loop puts the tag in a bar above the card) is still true, but the sentence about this card is not.
- Why it matters: D-327 is the entry against which a later change of the card is judged. A reviewer would hold a correct wrap to "beside the name", or an executor would shrink the icon to keep one line. WAY-263 grades it Important.
- Fix (one clause): for example "stay in the heading at the top of the card, beside the name or on the line under it, …", with the *Verification* item read the same way.
- Slices: the plan's *Foundation entries* (`1d14b6eb`) and Slice 8 (`d7136c57`).
- Contradiction: yes — D-327 (the change's own entry).

## Minor findings

1. **The rows of the second table are described wrongly, in the skill and in two code comments.**
   - Places: `.claude/skills/loop2-balance/SKILL.md:180` and `:186` (and the same lines of the byte-identical `.agents/skills/loop2-balance/SKILL.md`); `balance/progression.mjs:316` and `:445`.
   - The skill says the second table has "a row for each map that another map opens", but the code prints a row for every requested map, Skraj lasu included.
   - The skill and both comments say "A map that opens nothing has dashes in the opener's cells". The dashes stand at a map that no map opens: Skraj lasu opens Las, yet has dashes, while Las — głębiej IV opens nothing and has its cells filled.
   - The verdict columns are read correctly, so no pass or fail is misread. But To do 7 asks the skill to say how to read the measure, and a later agent reads these sentences. Within the task. Slices 4 (`69f74f9e`, comments) and 5 (`48632dc4`, skill).

2. **The skill's first sentence on rungs reads wider than the glossary.**
   - Place: `.claude/skills/loop2-balance/SKILL.md:203`: "A rung is a game map that differs from the map that opens it by its numbers alone (D-448)."
   - Taken alone, this calls Las a rung, which D-464's *Rationale* says it is not. The glossary entry `rung` adds "made by the ladder mechanism, from a row …". The next sentence of the skill limits it.
   - Within the task. Slice 5 (`48632dc4`).

3. **A resource of density 0, which D-464 allows, would still show on the card and in the catalog.**
   - Places: D-464 (`foundations/decisions.md:6229`) against D-327's „Leży tu” and D-325's search and „Co daje”.
   - A rung that gives a resource density 0 would show „≈ 0 z 25 kafelków” for it on its card, would be found by that resource's name and would be listed under it in „Co daje”.
   - No rung of this task uses density 0, so no user sees it today. The first rung that does (task 16) needs the view to leave such a resource out, or a sentence in D-327 and D-325. Within the task as a latent edge of its mechanism. Foundation entries (`5a0b6ccf`).

4. **D-448's *Rationale* now reads two ways.**
   - Place: `foundations/decisions.md:6209`: "a rung that differs from the map before it by its numbers".
   - Under D-466 the map before a rung in the data is not always its opener (before Las — głębiej II stands Las — wataha).
   - The rationale binds nothing. The cheap fix is "the map that opens it", as the foundation writer proposed. Outside this change's entries, but caused by D-466. Within the task.

5. **`measureProgression`'s comment does not mention the fields the change adds.**
   - Place: `balance/progression.mjs:348-356`.
   - The comment lists what the result's `maps` hold, but not the new `opener`, `openerName`, `openerBestShare`, `withOpenerShare` and `harder`. A reader of the exported function's comment does not learn of them.
   - Within the task. Slice 4.

6. **The styleguide's rule does not list D-43 among its decisions.**
   - Place: `guidelines/styleguide-browser-view.md:928`.
   - The rule "The screen Mapy" now cites D-43 in its item on the card heading (`:1009`), but its **Decision** list does not name D-43. A reader who finds rules by decision does not reach it.
   - Within the task. Slice 7 (`733f8c42`).

7. **D-327's new phone departure is sourced from the old game's local code only.**
   - Place: `foundations/decisions.md:10491`, "… puts the tag and the opener in a bar above the card, beside a link back to the list of maps".
   - To do 8 names only the bottom bar of the button. The tag bar was read from the old game's local code (`src/components/probe/MapPage.tsx of the old game's local code`), not from the deployed site (`reports/foundation-report.md`).
   - The entry is marked `the cycle's`, so the request has to show this addition to the human and say where it was read. Within the task.

8. **The mutation run on the mechanism leaves survivors no test is needed for (classification).**
   - Place: `src/browser/sim/data/maps.ts`.
   - StrykerJS on `src/browser/sim/data/maps.ts:78-276`: 50 killed, 22 survived, 25 compile errors.
   - The survivors, classified:
     - 16 at the numeral table, lines 215-222, values 1000 to 40: behaviour not worth fixing in a test now, since a place of 40 or more is beyond a ladder of about thirty maps and the test goes to X.
     - 2 at the kind word of the refusal message, lines 193 and 202: not worth fixing, since the tests match the identifier, not the word.
     - 4 at lines 196 and 200: equivalent. Either the `...opener` spread already carries the attackers, or the mutant gives `attackers: []` where the field was absent, which reads the same everywhere it is read (`map.attackers ?? []`); the `["Stryker was here"]` mutant is reached only by a row that the refusal stops first.
   - No real gap in the mechanism. Within the task, recorded for the record (Slice 1).

9. **Outside the task: the evidence that a rung is harder is in effect its own share against its opener's.**
   - Place: `reports/executor-6-progression-full.md:198-207`.
   - Every map but Las has "Best share with the opener's character" equal to its own "Best share", for example Las — głębiej II 88.4 / 88.4 and Las — głębiej IV 65.4 / 65.4. My probe (60 seeds, all programs) shows why.
     - The opener's practice is genuinely smaller: Las — głębiej II from Las — głębiej's character holds about two thirds of the practice of its own chain.
     - The stock is the same, and the best program, P10 throughout, reaches the same results on every seed.
     - So the extra practice of one more first solving changes no outcome.
   - This is consistent with the code (`reports/review-whole/probe-practice.out.txt`). But beyond Las, "harder by one character" equals "own share below the opener's own share" for this data.
   - The thinnest margin is Las — głębiej II against Las — głębiej: 88.4 % vs 91.8 % on seeds 1-500, 17 seeds, paired on the same seeds and character. The narrowed 100-seed run agreed (87 vs 91).
   - No requirement asks for a margin (D-449), so this is no defect. Outside the task as a defect; named for the request's description.

## Declined to judge

- How hard the rungs are beyond the order of difficulty and the solving: D-449 and the task's *Out of scope* make it no requirement.
- The screenshots pushed to `mariusznazar/screenshots` and the commit author address in that public repository: an outside effect already made by D-418 and D-419, not code of this range. I checked only that no screenshot file entered this repository (the diff holds no image file) and that `reports/executor-8-report.md` gives six links in a commit with `?raw=true` for the request's description.
- The white frame round the screen area on executor 8's 1280 px screenshots: a focus ring from navigating by script, by executor 8's guess. Not changed by this range.

## Checks run

| Check | Command or method | Exit / result |
|---|---|---|
| Head confirmed | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | `d7136c57…`; `6ed3cb36…` = pinned |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | **1**, 3 errors (I1) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0; `0 error, 0 warn, 122 info` |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py e84a73ce d7136c57` | 0; 21 modified, +1180 lines net; `maps.ts` 189→421, `progression.mjs` 377→495 |
| Size invariant | `npm test -- tests/quality/test_function_and_file_size.py` at the head (invariant `function-and-file-size` not marked violated) | 0, 2 tests OK: nothing over a threshold at the head, so nothing pushed over one; not run on the base, since the head names nothing |
| Focused tests | `npm test -- <file>` for `tests/sim/data.test.mjs` (58 pass), `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/end-window-lines.test.mjs`, `tests/view/end-window.test.mjs`, `tests/view/maps-record.test.mjs`, `tests/sim/discovery.test.mjs`, `tests/balance/progression.test.mjs` (16), `tests/balance/cli.test.mjs` (25), `tests/sim/map-card.test.mjs` (11), `tests/sim/saved-game.test.mjs` (53), `tests/invariants/test_content_identifiers.py` (5), `tests/invariants/test_map_run_tiles.py` (6), `tests/invariants/test_browser_view_token_values.py` (4), `tests/agent_workflow/test_loop2_balance_skill.py` (3) | all 0 |
| Typecheck | `npm run typecheck` | 0 |
| Ruff on the two Python files of Slice 1 | `ruff check` and `ruff format --check` of `tests/invariants/test_content_identifiers.py` and `tests/invariants/test_map_run_tiles.py`, with the pinned ruff 0.17.1 of the main checkout's `.runs/quality-venv` (executable only, nothing written there) | 0 / 0 ("All checks passed!", "2 files already formatted") |
| Skill copies | SHA-256 of both copies of the skill | equal |
| Mutation, game | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/data/maps.ts:78-276"` in a worktree of the head | 0; 50 killed, 22 survived (Minor 8), 25 errors; `reports/review-whole/stryker-maps-summary.txt` |
| Mutation, instrument | two targeted mutations of `balance/progression.mjs:332-333`, each followed by `npm test -- tests/balance/progression.test.mjs` (StrykerJS covers the simulation alone, D-94) | both survive, exit 0 (I2); `reports/review-whole/mut-a.log`, `mut-b.log` |
| Measure against the code | `node probe-practice.mjs 60 <out>` (`reports/review-whole/probe-practice.mjs`) on a build of the head | `reports/review-whole/probe-practice.out.txt` (Minor 9) |
| Trust boundaries | diff file list against the part map's *Trust boundary* lines; reading `saved-game.ts` `oneOf`/`uniqueOf` (`hasOwn(MAPS, …)`), `screen-address.ts:44-55` | no boundary file changed; a rung identifier is accepted by membership in `MAPS` at the load and at the address |
| Polish of the rungs' sentences | reading `src/browser/sim/data/maps.ts:361-387` | 600/660/720 min = 10/11/12 h; „trzy/cztery pokonane”, „pięć pokonanych”, „wilki/wilków” agree |

Not run: the whole gate (`npm test` with no file). By the handoff nobody runs it before the advisor's start signal, so it stays unchecked. I1 shows it would fail at its foundation check. No CI runs before the request, by the handoff.

## Coverage of the task

- To do 1: met (D-464, the mechanism and refusals in `maps.ts`, the numbers of the rungs only).
- To do 2: met. Names composed in `maps.ts`, `ENTRIES` holds the three names, the three sentences are written by hand. I3 and I4 concern entry wording only.
- To do 3: met (order of `MAPS`, the end window's two buttons, the tests of task 3 changed).
- To do 4: met in the code, but its non-empty path is untested (I2).
- To do 5: met by the full run (`reports/executor-6-progression-full.md`, seeds 1-500, 24 programs, no loop, labels `P1`…, both shares side by side). The table goes into the request's description later.
- To do 6: met (`tests/sim/discovery.test.mjs` passes over every map).
- To do 7: met, with Minor 1 and 2.
- To do 8: met, with I4 and Minor 7.
- *Settlements to record*:
  - row 1 → data;
  - row 2 → D-464, with `goalText` added and marked `the cycle's`;
  - row 3 → D-465;
  - row 4 → glossary `rung`, *Not* `none`;
  - row 5 → D-466, with the view sentence added and marked `the cycle's` (I3).
- The question carried to the cycle (does `progression` print the verdict): answered, yes, by the second table.
- Source fidelity: the two additions marked `the cycle's` and D-327's tag bar (Minor 7) go beyond the task's sources and must be shown in the request. Nothing else is taken from the sources altered.

The orchestrator's gap 6 asked which of these I would change:
- D-466's view sentence: yes, I3.
- D-327's "in six things only … and in one more in the phone layout": keep as is. It counts right, and "seven" would break seven test lines for no gain.
- D-327's tag bar from local code: Minor 7.
- D-448's "the map before it": Minor 4.
- Density 0: Minor 3.
- D-464's `goalText`: keep; it follows from row 2's "sentences by hand".

On the orchestrator's mismatches:
- Slice 4's export of `plain`, `share` and `lineOf` from `balance/check-map.mjs` follows the kind rule "Jedno miejsce wspólnej rzeczy" of `guidelines/coding-balance-instrument.md` and changes no behaviour: no finding.
- `tests/view/end-window.test.mjs` was given to Slice 3 and passes.
- Slice 6 changing no rung matches the full run.

On gap 7, the icon's colour, place and wrap against the styleguide, `maps-screen.css` and `browser-view-token-values`:
- every value is a token or a keyword, and the invariant passes;
- the colour `text-strong` follows D-43's "the text beside it" (the name);
- "obok nazwy i znacznika" and the *Good* example agree with the icon standing between the two.
- The one-item wrap is sound for the user: no lone separator at a line's end. It is the reason for I4.

## Reaches beyond the dispatch

- `src/browser/view/catalog-lines.ts` (grep of order and filter lines): to check D-466's view sentence (I3).
- `src/browser/view/screen-address.ts` (whole) and the `oneOf`/`uniqueOf` helpers of `src/browser/sim/saved-game.ts`: the trust-boundary question of the handoff.
- `balance/engine.mjs:99-107` (`prerequisitesOf`): to read the measure.
- The pinned `ruff.exe` of the main checkout's `.runs/quality-venv`: to run Ruff without the whole gate; nothing was written there.
- The rule file on scripts of the human's instructions (`a private note of the author (outside the repository)`): before writing the probe script.

## Working copies

- `.runs/review-whole/head`: a worktree of `d7136c57` with `.the-way` initialized and `npm ci`. Removed with `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer shows it.
- `.runs/review-whole/`: the decision index, entry extracts, logs and the probe. Removed with `rm -rf` by its full path; `test -e` reports it gone.
- Kept for the report in `reports/review-whole/`: `probe-practice.mjs`, `probe-practice.out.txt`, `mut-a.log`, `mut-b.log`, `stryker-maps-summary.txt`.
- The `dist/` that `npm test -- <file>` rebuilt in the reviewed worktree is the product's own ignored output, not a working copy. No tracked file of the reviewed worktree changed (`git status --short` empty).

## Unread material

**Decisions read whole: 36 of the index's 73 listed in full**:
D-18, D-24, D-34, D-136, D-142, D-144, D-149, D-132, D-133, D-187, D-388, D-398, D-427, D-428, D-429, D-437, D-438, D-448, D-449, D-464, D-465, D-466, D-325, D-327, D-331, D-332, D-333, D-43, D-53, D-82, D-148, D-42, D-94, D-418, D-419, D-368.

The index was written with `decision_index.py`:
- `--section` for "Maps: their content, time and solving", "Screen Mapy and Siedziba", "Balance measurement" and "Screen of a map run and the end-of-run window";
- `--part` for simulation, browser-view, balance-tools, agent-workflow and product-foundation;
- `--decision` for the task's *Decisions in play* and the decisions cited by the altered test cases.

I ran through its 333 headings and opened D-82, D-148 and D-42 from them. The other decisions of the index were read by their binding sentences in the index. The decisions cited only by unaltered cases of the altered test files were not opened.

Invariants read whole: `simulation-isolation`, `simulation-inputs`, `content-identifiers`, `map-run-tiles`, `map-run-layout`, `browser-view-token-values`, `save-version`, `cross-part-imports`, `first-map-stock`, `first-map-balance`, `first-exploration-discovery`, `new-account-first-pass`, `function-and-file-size`, `instrument-game-agreement`, `balance-instrument-file-writes`, `balance-instrument-repeatability`.

Read whole: the part map, the glossary entry `rung`, `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-content-data.md`, `guidelines/coding-balance-instrument.md`, `guidelines/coding-browser-module.md`.

`guidelines/styleguide-browser-view.md` was not read whole. I read lines 1-1092: the roles, every general rule, both layouts, touch, the menu bar and the whole rule "The screen Mapy". Lines 1093-1979 hold the rules of the other screens (Wiedza, Postać, the program editor, the run screen, the scene, mockups). I searched them for Mapy, the card, the heading, creature icons and wrapping, with no hit bearing on this change. The reason is size.

`guidelines/coding-simulation-module.md` was not read: `maps.ts` is of the kind content-data. That is a question of classification for the composer code it now holds, raised here.

The executors' reports, the foundation writer's report, the frozen task and the plan were read whole.

## Searches not found or unclear

- `cmp` is not on this computer's PowerShell path; the skill copies were compared by SHA-256 instead.
- Whether the old Loop's deployed phone card matches its local code (Minor 7): not checked by anyone in the cycle, nor by me.
- Whether the composer code in `maps.ts` makes the file a simulation module for the kind table of `guidelines/coding.md` as well as content data: unclear; the plan chose content data.
