PASS ad2d808420c1d0526c95ecafef3012f57dff6af6

# Review of correction 1 — task cycle `mechanizm-drabiny` (review-change, a correction for the human's remarks)

Range `fc61255e..ad2d808420c1d0526c95ecafef3012f57dff6af6`: four commits (`8153c44e`, `1bb7b2ce`, `6b2064b8`, `ad2d8084`) and five files (`.git-blame-ignore-revs`, `balance/progression.mjs`, `foundations/decisions.md`, `src/browser/view/map-lines.ts`, `tests/balance/progression.test.mjs`). `git rev-parse HEAD` printed the head I was given. `.the-way` is at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit the gitlink records. Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md`. The human's remarks (`reports/correction-1-remarks.md`) bound the review.

Counts: 0 blocking, 3 Minor (all within the task), 0 out of scope.

## The remarks, each as made or not

| Remark | Made? |
|---|---|
| 1 — D-466, option (a) with its first clause | **made** |
| 3 — the formatter on `src/browser/view/map-lines.ts` | **made** |
| 5(b) — a test case on made-up data that fails when the measure loses the opener's practice or the stock | **made** |
| 2, 4, 5(a), 6–10 | nothing for this correction (2 belongs to the orchestrator; 4 and 5(a) were let through; 6–10 were accepted) |

### Remark 1 — made

- The third sentence of D-466 (`foundations/decisions.md:6261`) now reads: "The catalog of the screen Mapy, within the groups each of its views makes and after the place each view gives the solved maps among them (D-325, D-331), and the end-of-run window show the maps in the order of the game maps' data, the buttons „Otwarte: {mapa} →” after a completion included." The clause uses the review's words, which the human chose.
- I checked the sentence against the code, view by view:
  - **„Co daje”**: `resourceGroups` puts the solved maps of a group first and the unsolved maps after them (`src/browser/view/catalog-lines.ts:375-378`). Each part keeps the order of `found`. `found` comes from `holdingsByResource` over `open`, and `open` is `sendMaps` (`src/browser/view/map-lines.ts:15-20`), which filters `Object.keys(MAPS)`. So each part is in the data's order. The sentence holds.
  - **„Dokąd”**: the open maps come first, then the picked solved map pinned above the fold, then the folded solved maps (`catalog-lines.ts:274-299`). Each list is filtered from `shown`, which is in the data's order. The pinned row is a place that D-331 gives a solved map, so "the place each view gives the solved maps" covers it. The sentence holds.
  - **„Postęp”**: the rows are in the data's order (`catalog-lines.ts:314`). This view gives the solved maps no place of their own, so the clause is empty here, as it should be.
- The styleguide agrees: `guidelines/styleguide-browser-view.md:971-972` („w grupie najpierw rozwiązane”) and `:961-970` („Dokąd”).
- *Rationale* and *Verification* are still true:
  - The *Rationale*'s „Dokąd” cases compare maps that are all open and unsolved (Las — wataha over Las — głębiej II; the rung in progress over the lair).
  - The *Verification*'s catalog case, the three rungs in the region Las after Las — wataha and before Las — matecznik, is the „Postęp” order.
  - Its "violates" item "the catalog ordering the maps by their names" is still a violation under the new sentence.
- No `decision:` line quotes the third sentence. The four D-466 lines quote the first sentence: `tests/sim/data.test.mjs:117`, `:329`, `tests/view/catalog-lines.test.mjs:344` and `tests/view/map-lines.test.mjs:67`. `foundation_check.py` exits 0 with `0 errors`.
- Does the sentence say what the product does? Yes. The citation is a separate issue: see Minor 1.

### Remark 3 — made

- `1bb7b2ce` changes one file. Prettier applied to the base file `fc61255e:src/browser/view/map-lines.ts` gives a file byte-identical to the head file (`diff` exit 0). So the commit is formatter output and nothing else: the three lines of `icons:` joined into one, and the trailing argument comma dropped, which Prettier removes when it joins the lines (`src/browser/view/map-lines.ts:101`).
- `guidelines/coding.md`, "Reformatting commits" (`:312-324`), asks for a formatting commit of its own whose hash goes into `.git-blame-ignore-revs` in a later commit. `6b2064b8` adds the full hash `1bb7b2cef9b8fef441ab8c9c8cc6a0790694bae1`, under a comment line in the file's form (`# <what> by Prettier 3.9.10`), with a blank line between entries (`.git-blame-ignore-revs:11-12`). That matches the two earlier entries and the precedent `ff645a68`/`e8d02127`.
- `npm test -- tests/quality/test_quality_invariants.py` exits 0 (8 tests OK). `npx prettier --check` passes on all three changed source files.

### Remark 5(b) — made

**(a) The mutations, run by me.** I copied `dist/`, `balance/`, `tests/sim/reference-programs.mjs` and the test file, and changed one line of `balance/progression.mjs` in each copy. The patches and logs are in `reports/review-correction-1/`.

| Mutation | Line changed | Result |
|---|---|---|
| (a) | `:347` `practiceIn: openerSummary.practiceIn,` → `practiceIn: {},` | exit 1, 16 pass, 1 fail: the rewritten case fails on its final assertion, actual 0 against expected 75 (`mut-a.patch`, `mut-a.log`) |
| (b) | `:348` `candidates: candidatesOf(before),` → `candidates: [],` | exit 1, 16 pass, 1 fail: the same case, actual 12.5 against expected 75 (`mut-b.patch`, `mut-b.log`) |
| real code | none | `npm test -- tests/balance/progression.test.mjs` exits 0, 17 pass (`progression-green.log`) |

The case's expected value does not come from the comparison code. It comes from `sweep` with `skillsFor` of Las's `practiceIn` and each program's stock from its row of Las. The three preconditions check that each of the two inputs matters on the case's data, so neither mutant can survive by chance.

**(b) The new input `practice` of `measureProgression`.**
- With the default `{}`, `sumPractice([{}, ...paid])` equals `sumPractice(paid)` key by key, so every result is unchanged (`balance/progression.mjs:297-300`). Every other case, `cli.test.mjs` (25 pass) and `agreement.test.mjs` (12 pass) pass.
- The input is explicit and documented (`:367-368`, head comment `:7-8`). The result stays data.
- No file is written: the `balance-instrument-file-writes` test passes.
- Nothing is drawn outside the seed: the `balance-instrument-repeatability` test passes.
- The input holds no number of the game: the made-up 160 stands in the test, and the thresholds are read by the game's `buyBranch` (rule "Liczba gry").
- An unknown skill in it is refused by `buildSkills` (`balance/engine.mjs:66`) on the first `skillsFor`, before any map run.
- The CLI does not expose it, so D-428 and D-429 are untouched.
- The comparison picks up the start practice through `openerSummary.practiceIn` (`:347`), which already holds it. Both maps are still measured with one character.
- It is a general input, not a branch made for a test's input (SKILL.md section 2).
- One weak spot remains: Minor 3.

**(c) Name, `decision:` line and *Verification*.**
- The name "… with the practice and the stock the opener was measured with, where that practice buys a rank" (`tests/balance/progression.test.mjs:275`) is held: the first precondition checks the rank (`:286-290`).
- The `decision:` line (`:274`) quotes D-448's second paragraph, which the case holds.
- D-448's `tests:` clause (`foundations/decisions.md:6204`) now names the made-up start practice and the rank it buys, which is what the case does.
- One reading is still not held: that the practice is *exactly* the opener's and not more. See Minor 2.

**(d) Replacing the old case instead of adding one.**
- The human wrote "dopisz przypadek testowy na zmyślonych danych … który pada, gdy miara gubi wprawę mapy otwierającej albo zapas map przed nią. Wtedy nazwa testu i klauzula decyzji mówią prawdę już dziś". The remark's goal is a case that fails on either loss and a name and clause that tell the truth. The rewritten case does both.
- The old case's one protection, the stock of the comparison, is held by the new case: mutation (b) fails it.
- The loss the author names is that no case now checks that stock on a run with no start practice. It runs through the same code: `withOpenerOf` → `measureFrom` → `stockFor` with the same `candidates`, and `practiceIn` is only its argument. The old case beside the new one would be the duplicate that `guidelines/testing.md`, "Testy bez dodatkowej ochrony", names. The removal has a cause on the requirement's side, as "Changing an existing test" asks.
- I hold the loss acceptable within the remark's intent. The human's example "np. niższy niż 140" was a made-up rank threshold; the author made up the opener's practice instead, which the human's "np." and the handoff both allow.
- For the orchestrator: the request's description should say that the case was rewritten rather than added beside the old one. The human's word was "dopisz".

**(e) The comment "Skraj lasu opens no map".** It is at `tests/balance/progression.test.mjs:251` and belongs to the case at `:241`, which was not rewritten. It is still untrue: Skraj lasu opens Las, and the case relies on no map opening Skraj lasu. It stays the Minor note 2 of `review-fix-1-report.md`. The remark did not ask for it, and this review does not reopen it.

## Findings

### Critical

none

### Important

none

### Minor

1. **The citation of D-466's new clause names two decisions, and neither holds the solved-first order of a „Co daje” group.**
   - Place: `foundations/decisions.md:6261`, "within the groups each of its views makes and after the place each view gives the solved maps among them (D-325, D-331)".
   - What is wrong:
     - D-325 (`:10442`) names the three views and nothing about where the solved maps stand.
     - D-331 (`:10603`) gives the folded solved maps of a region and the pinned picked map, which is the place of the solved maps in „Dokąd”.
     - Nothing in the foundation gives the place of the solved maps in „Co daje”, first in each group. It stands only in `guidelines/styleguide-browser-view.md:971-972` and in `catalog-lines.ts:375-378`.
   - Why it matters: a reader who follows the citation to learn where the solved maps of a „Co daje” group stand finds nothing. The sentence itself is true, so nobody would build against the product. That is why the grade is Minor.
   - The handoff told the author to keep both citations, and the author says so in the report.
   - Fix, for example: add the styleguide rule "The screen Mapy" to the parenthesis, or record the „Co daje” order in a decision.

2. **The rewritten case and D-448's `tests:` clause read as "the opener's practice", while the case only holds "practice enough to buy the rank".**
   - Places: the case's name (`tests/balance/progression.test.mjs:275`) and `foundations/decisions.md:6204`.
   - What is wrong: I ran mutation (d), not one the remark asked for, as a probe. It measures the comparison with the practice the map would get from its own chain, `sumPractice([openerSummary.practiceIn, openerSummary.practicePaid])` at `balance/progression.mjs:347`. That is the very fault D-448's *Rationale* names: "a map has the practice that the first solving of its opener paid, while its opener is measured without it". All 17 cases pass (exit 0; `reports/review-correction-1/mut-d.patch`, `mut-d.log`). On the case's data, the extra practice buys no further rank, so the share is the same.
   - Why it is Minor: the remark defined the failures it wanted, the loss of the practice and the loss of the stock, and the case catches both. No case before the correction caught (d) either, so this is a gap the change leaves, not one it opens. A case that kills both (a) and (d) needs data where two rank levels matter, which may not exist in the branches of today.
   - For comparison, mutation (c) builds the comparison's stock from the map's own chain (`prerequisitesOf(mapId)` at `:344`). It is caught, by the case at `:241` (actual 100 against expected 87.5; `mut-c.patch`, `mut-c.log`).

3. **The sentence of `renderProgression` does not mention the new start practice.**
   - Place: `balance/progression.mjs:516`, "Each map was measured with the practice and ranks from the first solvings of the maps before it, …".
   - What is wrong: a result measured with a `practice` given would be rendered with that sentence, and the sentence would be untrue. The summaries do not carry the start practice either, so the renderer cannot tell.
   - Why it is Minor: today no caller renders such a result. The CLI does not pass `practice`, and the rewritten case does not render. It becomes real only if a flag is added later.

## Declined to judge

- The comment at `tests/balance/progression.test.mjs:251` ("Skraj lasu opens no map"): outside the correction's diff, already a Minor note of `review-fix-1-report.md`, and the remark did not ask for it.
- Whether any opener's practice reaches 160 gathering on seeds 1–500: the case runs on seeds 1–8 with made-up data, so the real measurement does not bear on the remark.
- The comment at `tests/balance/progression.test.mjs:271-272` ("no opener of the game's maps holds the practice that buys one") goes stale when task 16 adds a rung opened by Las — głębiej IV (180 gathering). That is outside this task, and the case's result does not depend on it.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`, `git -C .the-way rev-parse HEAD`, `git ls-files --stage -- .the-way` | 0 | head `ad2d8084`; `.the-way` `6ed3cb36`, matching the gitlink |
| `git diff fc61255e..ad2d8084`, `git log fc61255e..ad2d8084` | 0 | 4 commits, 5 files |
| `npm test -- tests/balance/progression.test.mjs` (real code) | 0 | 17 pass |
| `node --test <copy>/tests/balance/progression.test.mjs`, mutation (a) | 1 | 16 pass, 1 fail: the rewritten case, actual 0, expected 75 |
| same, mutation (b) | 1 | 16 pass, 1 fail: the rewritten case, actual 12.5, expected 75 |
| same, mutation (c), probe | 1 | 16 pass, 1 fail: the case at `:241`, actual 100, expected 87.5 |
| same, mutation (d), probe | 0 | 17 pass: survives (Minor 2) |
| `git show fc61255e:src/browser/view/map-lines.ts \| npx prettier --stdin-filepath src/browser/view/map-lines.ts \| diff - src/browser/view/map-lines.ts` | 0 | the head file is exactly Prettier's output of the base file |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 8 tests OK |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests OK |
| `npx prettier --check` on the three changed source files | 0 | clean |
| `npx eslint` on the three changed source files | 0 | clean |
| `npm run typecheck` | 0 | clean |
| `npm test -- tests/balance/cli.test.mjs` | 0 | 25 pass |
| `npm test -- tests/balance/agreement.test.mjs` | 0 | 12 pass |
| `npm test -- tests/view/map-lines.test.mjs` | 0 | 14 pass |
| `npm test -- tests/invariants/test_balance_instrument_file_writes.py` | 0 | 3 tests OK |
| `npm test -- tests/invariants/test_balance_instrument_repeatability.py` | 0 | 2 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` (no switch) | 0 | `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 120 info` |
| `grep -rn "decision: D-466" tests` | 0 | four lines, all quoting the first sentence |

Not run:
- `npm test` without a file: the handoff reserves the whole gate for CI on the request.
- `tests/view/maps-screen.test.mjs`: the formatter commit changes layout alone, and the file is byte-equal to Prettier's output. The author's run (exit 0) is a claim I did not repeat.
- StrykerJS: the range changes no file of `simulation`.

No invariant test was changed by the range.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-448, D-449, D-464, D-465 and D-466 read whole (`:6195-6272`); D-325 (`:10438-10467`) and D-331 (`:10601-10624`) read whole. They hold the wording that remarks 1 and 5(b) touch.
- `src/browser/view/catalog-lines.ts:230-467` and `src/browser/view/map-lines.ts:15-20` (`sendMaps`): to confirm the data's order inside each part of each view, for remark 1.
- `guidelines/styleguide-browser-view.md:960-979` (the rule of the three views), for remark 1.
- `guidelines/coding.md:300-336` and `:396-416` (the rule "Reformatting commits" and "Where in code"), and the history of `.git-blame-ignore-revs` (`git log -- .git-blame-ignore-revs`), for remark 3.
- `balance/engine.mjs:55-90` (`buildSkills`), to judge how an unknown skill in the new input is refused.
- `reports/review-fix-1-report.md` (searched for I3, Minor 1 and the note) and `reports/correction-1-handoff.md`, read whole.
- `task_frozen.md`: *To do* 1–8 (`:26-35`) and row 5 of *Settlements to record* (`:167`).

## Working copies

- `.runs/review-correction-1/` held four copies, `mut-a/` to `mut-d/` (`dist/`, `balance/`, `tests/sim/reference-programs.mjs`, `tests/balance/progression.test.mjs`), together with the logs of every check and the base copy of `map-lines.ts`.
- I removed it with `rm -rf ".runs/review-correction-1"`. `ls .runs/` shows it gone.
- I made no git worktree: `git worktree list` shows none of mine.
- `git status --short` of the reviewed worktree is clean.
- Kept beside this report, in `.runs/task-cycles/mechanizm-drabiny/reports/review-correction-1/`:
  - `mut-a.patch` to `mut-d.patch`, the one-line edits as unified diffs against `balance/progression.mjs`;
  - `mut-a.log` to `mut-d.log`;
  - `progression-green.log`.
- To repeat a probe: copy the four paths into a directory two levels under the worktree root, apply the patch to its `balance/progression.mjs`, and run `node --test <dir>/tests/balance/progression.test.mjs` from the worktree root.
- No process is left running.

## Unread material

- `guidelines/coding.md`: only `:300-336` and `:396-416` (the rule on reformatting commits and the list of its files). The range's code changes are a formatter layout, a test case and one input of the instrument, which `coding-balance-instrument.md` governs; that file I read whole.
- `guidelines/styleguide-browser-view.md`: only `:960-979`. The one change to a `browser-view` file is a formatter layout of one line.
- `guidelines/testing.md`: read whole.
- `guidelines/coding-balance-instrument.md`: read whole.
- `foundations/invariants.md` (`balance-instrument-file-writes`, `balance-instrument-repeatability`): not read as entries. I relied on the guideline rules that name them and on their tests, which pass.
- `reports/review-whole-report.md`: not read. The remarks answer I3 and Minor 1 of `review-fix-1-report.md`, which I read.
- `gh pr view 184`: not read. The remarks file holds the human's comment word for word.

## Searches not found or unclear

- Not found: a sentence in D-325 or D-331 that sets the solved-first order inside a „Co daje” group (both entries read whole). It stands only in the styleguide and the code (Minor 1).
- Not found: a test that reads `.git-blame-ignore-revs` (`grep` of `tests/` for the name). The file's form is checked by review alone.
