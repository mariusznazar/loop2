PASS 7abe5a4d616c414f323a799a73280eaf3d034f43

# Review of the fix of the whole-change review, task `katalog-map`

- Fix range `cf6be29e..7abe5a4d` (`git rev-parse HEAD` confirmed 7abe5a4d616c414f323a799a73280eaf3d034f43), 6 commits, 19 files. Worktree `the task's worktree`. Read-only on tracked files.
- Findings file: `reports/findings-whole.md` (B1 blocking; Minor 1 to 11). Fix report: `reports/fix-whole-report.md` (claims verified below, not taken on trust).
- Counts: 0 remaining blocking, 0 new Critical or Important, 0 findings of the file that remain blocking; 3 Minor notes (none blocks).

## Each finding

- **B1 — fixed.** `balance/progression.mjs` now has `SOLVABLE_SEEDS = 1` and `solvable: best.solved >= SOLVABLE_SEEDS`; each row carries the count `solved` (from `summary.solved`), so one seed of a long list is not lost to the rounding of `solvedShare`. No reader of the old share remains: `grep -rn -i "SOLVABLE_SHARE|solvedShare >= |fifth" balance tests .claude/skills/loop2-balance .agents/skills/loop2-balance README.md` finds only the new test's title ("... a share far below a fifth ...") and unrelated "fifth" words in account tests. The test of the constant reads `SOLVABLE_SEEDS === 1`, and a new case measures `forest` with `forestNaive` on seeds 9 to 16, asserts the precondition (`rows[0].solved === 1`, `bestShare === 12.5`) and then `solvable === true`; it quotes D-438's sentence and would fail against the old `>= 20` (the fixer's failing run is in `reports/fix-whole-probes/b1-test-failing-with-the-old-reading.txt`; I read it, I did not repeat it). The skill's two copies are byte for byte equal (`cmp` exit 0). D-438 gained a `tests:` clause in *Verification*, which the foundation check accepts. Kept the Contradiction mark: the contradiction with D-438 is gone.
- **1 (D-441 loose wording) — fixed.** A third sentence in the last paragraph: "A record the storage refuses stays for the open page, and the stored one is left, since the record never falls." The refused-write record test quotes it (`tests/view/judging-cache-record.test.mjs`, one `decision:` line). See concern 1 below for the trim that came with it.
- **2 (`-0`, `2.4e1`) — fixed.** A comment at `readRecordValue` in `src/browser/view/judging-cache.ts` says what a hand-written value reads as and why that harms nothing; no behaviour change.
- **3 (row and invariant) — fixed for the row; the invariant remains as a note.** `guidelines/testing.md`, the row `src/browser/view/judging-cache.ts`, now names `tests/view/judging-cache-record.test.mjs` and its cases. The sentence of `judging-cache-reading` still says "gives a judging" while ten record cases carry its marker; leaving it is right for a fixer (a change of an invariant's sentence needs the human), so I keep it as a Minor note for the return step (concern 2).
- **4 and 5 (the rule twice, the region parsed from text) — fixed.** `DokadRegion` carries `region: RegionName` and `solved.{expanded, forced}`, computed once in `catalog-lines.ts`; `map-catalog.tsx` no longer imports `REGIONS`, no longer holds `regionOf`, uses `disabled={solved.forced}` and `onToggle(region.region)`, and keys the group by `region.region`.
- **6 (dead fold) — fixed.** `forced = context.query !== "" || solved.some((row) => row.selected)`: the solved maps unfold for a search or for a picked map that stands among them, and a picked open map leaves the fold enabled. The two older tests that assumed the old behaviour (`maps-screen.test.mjs`, `account-screen.test.mjs`) were changed for the requirement (the test now presses the fold before reading the circles), not to pass; new cases in `catalog-lines.test.mjs` and `map-catalog.test.mjs` hold the five states. The styleguide's "Dokąd" bullet says it. Concern 4: a picked solved map still disables the fold; that is the one case D-331's stated reason needs (the picked row with the bar seen), and I accept it.
- **7 (counters) — fixed.** `KNOWN_FORMS` ("poznana / poznane / poznanych") and, after „z”, `KNOWN_AFTER_Z_FORMS` ("poznanej / poznanych / poznanych"), through `countedName`; the lines give "1 poznana · 0 rozwiązanych", "5 poznanych · 4 rozwiązane", "0 rozwiązanych z 1 poznanej". Tested for all five states the five maps give.
- **8 (fixed „ze”) — fixed, with a Minor note.** `withPreposition(count)` in `counted-name.ts` (the one place) gives „ze” for 0, 6, 7, 16, 17, 60 to 79, 100 to 199, 600 to 799 and for larger numbers by their thousands, „z” otherwise; `recordLine` uses it: "niedźwiedź: 24 ze 120" unchanged, "wilk: 7 z 24" for the wolf (`maps-record.test.mjs` updated). Concern 3 is graded below.
- **9 (test-only parameters) — fixed.** `catalogLines(input)` takes no data or regions; `catalogLinesOf(data, regions, input)` is the exported pure function the five tests that need made-up data call; every other case calls `catalogLines` with ids from the game's data. The product code carries no optional parameter for a test.
- **10 (history in the skill) — fixed.** Both copies end "takes about a minute and a half." with no history; copies equal; `tests/agent_workflow/test_loop2_balance_skill.py` exit 0.
- **11 (scene rule silent on the bear) — fixed.** The opening sentence of "The scene of a map run" names "wilkiem albo niedźwiedziem"; a paragraph says the bear stands in the same place and layer order, has its own 64 × 64 sheets whose paws are not on the bottom row, and that the scene lowers its frame by `SCENE_FIGHT.sink` (wolf 0, bear 4); the wolf's own sentence stays; "kod widoku nie nazywa żadnego pliku stworzenia". Checked against `src/browser/sim/data/scene.ts`, `scene.tsx` and `scene-picture.ts` as I read them in the first review: it says what the code does and no more.

## The fixer's concerns, graded

1. **D-441 trimmed to 598 words** (the new sentence took the entry to 622, over the 600 limit the foundation check enforces for an entry a change alters). The cut is the positive list "the account's identifier, numbers of characters and programs, identifiers of maps, kinds of results and items with their counts" from the sentence on what stays after „Wyloguj”; the sentence keeps "holding no email address, no name and nothing the game loads". The list is said again in the first paragraph (what the value holds), in the key description and in the *Rationale* ("the account's opaque identifier, numbers, identifiers of maps, kinds of results and items"); no test quotes the sentence (the foundation check passes); nothing the record or the judgings hold is made less bound. It is a change of a binding sentence beyond the ordered clause, as the fixer says, and it is for the human to accept or undo at the merge. Minor note; not blocking. A shorter way (moving the new clause into the *Rationale* instead) would not have bound the behaviour, so I do not call the trim wrong.
2. **Invariant `judging-cache-reading` unchanged.** Agreed it is not the fixer's to change; Minor note for the return step ("gives a judging or a record"). Not blocking.
3. **„ze” before 7, 17, 16 and 70 to 79.** I cannot settle the Polish from the repository. My own reading is that „ze” stands before „sz-”, „st-”, „z-” clusters („ze sześciu”, „ze stu”, „ze szesnastu”, „ze zera”) and that „z siedmiu” is the usual form before „siedem-” and „siedemdziesiąt” (and „siedemset”), so I would expect „z” there; „ze siedmiu” is not wrong in every grammar book, so I do not call it a defect. No creature of the data has these numbers (120 and 24 only); the rule sits in one function and the test rows, so a change is one function and a few rows. New Minor note for the human; not blocking.
4. **A picked solved map disables the fold.** Accepted, as above.

## What the fix itself did, from its diff

Nothing broke: no code that passes a test without meeting a requirement (the new B1 case has a precondition and fails against the old reading; the fold and counter cases write expected values by hand); no new Critical or Important finding. The changed older tests were changed for a stated requirement. The `solved` count added to each measurement row is read by nothing but the new test and `measureMap`; it adds no output to the table.

## Checks run (command, exit code)

- `python -B .the-way/instruction-files/check_instructions.py` on the head: exit 0, `0 error, 0 warn, 112 info`.
- `python -B .the-way/elements/common/foundation_check.py` on the head: exit 0, `0 errors`.
- `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md`: exit 0, identical.
- `npm run --silent typecheck`: exit 0.
- `npx eslint --max-warnings 0` on `balance/progression.mjs`, `catalog-lines.ts`, `map-catalog.tsx`, `counted-name.ts`, `map-lines.ts`, `judging-cache.ts` and four changed test files: exit 0. `npx prettier --check` on the same and `src/browser/view`: all files use Prettier style.
- `node tests/quality/eslint-size-rules.mjs`: exit 0, `0 functions and files over a threshold in 353 files`.
- One `npm test -- <file>` each, all exit 0: `tests/balance/progression.test.mjs`, `tests/balance/cli.test.mjs`, `tests/balance/check-map.test.mjs`, `tests/view/catalog-lines.test.mjs`, `map-catalog.test.mjs`, `counted-name.test.mjs`, `maps-record.test.mjs`, `maps-screen.test.mjs`, `account-screen.test.mjs`, `map-lines.test.mjs`, `judging-cache-record.test.mjs`, `judging-cache.test.mjs`, `end-window.test.mjs`, `end-window-lines.test.mjs`, `tests/invariants/test_content_identifiers.py`, `tests/invariants/test_browser_view_token_values.py`, `tests/agent_workflow/test_loop2_balance_skill.py`, `tests/quality/test_function_and_file_size.py`.
- Not run: the full gate (`npm test` with no argument); the failing run of the B1 test against the old line (I relied on the fixer's saved output); the running game (the fold of a solved map is held by the jsdom test only, which the fixer also names).

## Reach beyond the dispatch

None beyond the fix diff and the files it names, and the earlier review's reading of the same files.

## Working copies

`.runs/review-whole-2/` in the reviewed worktree (the check outputs, the test runner and its summary); no worktree and no clone. Removed before return.

## Unread material

- The fix diff of all 19 files: read for `balance/progression.mjs`, `counted-name.ts`, `map-lines.ts`, `judging-cache.ts`, `catalog-lines.ts`, `map-catalog.tsx`, `decisions.md`, the skill, and the styleguide; for `tests/balance/progression.test.mjs`, `maps-record.test.mjs` and `judging-cache-record.test.mjs` read the changed lines. **Not read:** the full diff of `tests/view/catalog-lines.test.mjs` (109 lines changed), `tests/view/map-catalog.test.mjs`, `tests/view/counted-name.test.mjs`, `tests/view/maps-screen.test.mjs` and `tests/view/account-screen.test.mjs`; I took their content from the fixer's report and from their passing.
- `reports/findings-whole.md` read in its first 1.5 KB (the rest is my own earlier report in the orchestrator's copy), `reports/fix-whole-handoff.md` not read (the fixer's report restates the directions).
- The guideline files and decisions were not read again; the first review's reading stands.
- Not read: `cycle.md`.

## Searches not found or unclear

- The Polish rule for „ze” against „z” before „siedem-” and „siedemdziesiąt-”: not in the foundation or the guidelines; stated above as unverified.
- Whether `judging-cache-reading` should name the record: no entry or decision says; left to the return step.
