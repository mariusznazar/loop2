PASS 9b08c13d

# Review rr2 — return step of correction 1, task `ocena-programu-na-ziarnach`

Range `51015538..9b08c13d` (one commit, `9b08c13d`), worktree `.`, branch `task/ocena-programu-na-ziarnach`. `git rev-parse HEAD` = `9b08c13d591fff5046574ae0c2162c5871c0ce78`, the head given. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the pinned commit. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (a correction for the human's remarks), against `.the-way/task-cycle/skill/return_step.md`. Files changed: `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/part_map.md`; no code, no test.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — the D-04 part moved into `tests:` is held by tests that carry no `decision: D-04` line** (within the task)

- Place: `foundations/decisions.md:95-98` (D-04 *Verification*: „the screen Mapy drawing the mark beside „Program:” from the judging the browser keeps in its lasting storage, under the account's identifier and the moment the game state names its game by, again after a reload and none under another account or another game's moment”).
- What: the tests that hold this part are `tests/view/judging-cache-page.test.mjs:297` (line `:298` `decision: D-441`), `:324` (`:325` `decision: D-441`), `tests/view/maps-screen.test.mjs:1605` (`:1606` `decision: D-440`) and `:1632` (`:1633` `decision: D-440`). I read each body: they do hold the part (a mark drawn from the stored judging, again after a reload with no judging made, none under another account or a game made at `MADE + 1`). None carries a `decision: D-04` line.
- Why it matters: `.the-way/elements/decisions/template.md:268-281` says a test that holds a sentence of the decision carries a `decision:` line of that decision, and that the `tests:` clause is no second copy of the link because „the lines `decision:` find the tests”. Here the clause names tests the lines do not find: an agent who looks for D-04's tests by their lines finds `tests/sim/content-revision.test.mjs:381` and `judging-cache-page.test.mjs:212` and not the mark's tests, and a later change of D-04's second paragraph (the clause „for the mark beside the list „Program:”, the judgings the browser remembers …”) gets no quotation check at them.
- Answer to the handoff's question (1): the clause may name the part — a test holds it, and a pair kept for it would claim that none does, against `return_step.md` and the template line 284-285. The gap is the missing line at the tests, not the clause. Fix: add at those four tests a line such as `// decision: D-04 "The browser view draws the game only from the game state"` (a comment in a test file; the line need not reach the mark's clause, only begin at the sentence's start). Graded Minor by WAY-364: the entry's content agrees with the code and no sentence is read wrongly through the gap.
- Outside the range (not changed by `9b08c13d`, from the return step's report, checked by me at `tests/sim/judging-record.test.mjs:263`, `:297`, `:382`, `:397`): the same gap stands for D-165's part on the remembered judging (lines carry `D-441`) and two parts of D-440's third paragraph (`D-441`, `D-442`). Same fix, a note only.
- Evidence: `git grep -n "decision: D-04 " -- tests src balance` gives `tests/invariants/test_browser_view_framework.py:294`, `tests/sim/content-revision.test.mjs:381`, `tests/view/judging-cache-page.test.mjs:212` and nothing else.

**M2 — `local-storage-lasting` says „of a site”, which no quoted passage carries** (within the task)

- Place: `foundations/environment_facts.md:999` — „… for storage that spans the windows of a site and lasts beyond the current session.”
- What: the two passages quoted at `:1001` say „spans multiple windows” and „a page's local storage area”; „of a site” comes from the section's unquoted sentence „Each site has its own separate storage area.” (§ 12.1 of the same snapshot, which I read).
- Why it matters: the template (`.the-way/elements/environment-facts/template.md:84-85`, `:142-143`) has the sentence say no more than its source says and makes the passage what a reader compares the source with; a reader checking the entry against its passages finds no ground for „of a site”. The fact is true of the source, so nothing rests on a false statement. Fix: drop „of a site”, or add `· "Each site has its own separate storage area."` to the *Source*. Minor: the content agrees with the source.

### Out of scope

**O1 — no row of *External context* for the player's browser** (outside the task; the handoff's question (5))

`foundations/part_map.md:218-238` holds no partner for the player's browser. Judgment: this change owes no row. The template (`.the-way/elements/part-map/template.md:148-159`, `:188`) reads the table only for whoever records a trust boundary, and the boundary is recorded (`foundations/part_map.md:32`, `src/browser/view/judging-cache.ts` under *Trust boundary* of `browser-view`), so the review aimed at crafted input there as it would with a row. The map treats the page's own browser as no partner for every browser-side boundary (`screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`), so a row for it is a question of the whole map, not of this change. I agree with the return step's recommendation: none in this request.

## The remarks of correction 1, for this range

The range is the return step alone; it makes the foundation part of the remarks.

1. Remark 1 (judgings out of the saved game, a cache in the browser): the foundation part is made in this range — D-441 rests on two facts of the HTML Standard at a fixed snapshot (`local-storage-lasting`, `storage-set-item-refusal`), its *Verification* names the tests that hold it, and the part map's sentence for `browser-view` (`foundations/part_map.md:5`) says „the last judging of each character, program and map of a game”, as D-441's first paragraph gives (review `w2f` N3 made). No entry found still saying that the saved game state holds a judging.
2. Remark 2 (let through): nothing to make; nothing in this range touches it.
3. Remark 3 (the link to the open manual map run): its foundation part made — D-287's link part moved into `tests:`; `tests/view/maps-screen.test.mjs:940` (`decision: D-287` quoting the link sentence) holds it in every row, at the map run's character, and gone with the map run.
4. Remark 4 (`guidelines/testing.md:177`): not in this range.
5. Remark 5: nothing in this range touches it.

## What I checked, by the handoff's points

1. **Each moved part is held by a test.** Read the bodies:
   - D-04: „a new game holding the moment” — `content-revision.test.mjs:380` (`decision: D-04`); each path of the page and the loaded game keeping its moment — `judging-cache-page.test.mjs:211` (`decision: D-04`; the six variants of the clause, each asserting the moment of the first save); the mark from the lasting storage — see M1.
   - D-206: the discarded game's judgings gone and the new game at the clock's moment — `judging-cache-page.test.mjs:211` and `:374` (each `decision: D-206`); „the same triple judged in a game made at another moment showing no mark” — `maps-screen.test.mjs:1632`, `judging-cache-page.test.mjs:324` (lines `D-440`, `D-441`; D-206's binding sentence itself is held by the two `D-206` tests). Removed pair wholly held.
   - D-287: link part — `maps-screen.test.mjs:940`, `team-lines.test.mjs:260`. The pair left (Siedziba „Załóż”, screen Postać „Zatrzymaj”) is held by no test I found and describes true cases.
   - D-441: every item of the clause traced to `tests/view/judging-cache.test.mjs` (`:152`, `:203`, `:247`, `:290`, `:322`, `:513`, `:553`, `:589`, `:606`, `:651`, `:671`, `:700`, `:722`, `:763`, `:830`), `judging-cache-page.test.mjs:297`, `:324`, `:353`, `:415`, `maps-screen.test.mjs:1668` and `tests/sim/saved-game.test.mjs` (the `decision: D-441` line among the refused-shape case), each with `decision: D-441`. The dropped violating items are held: a key by email address (`judging-cache.test.mjs:179` asserts the exact key), a judging in the save (saved-game refusal), another account or game (`:290`, page `:324`), an exception reaching D-323 (page `:415`); „a function of the simulation reading or writing the browser's storage” is no sentence of D-441 and stands under the invariant `simulation-isolation` of D-04. The pair kept („Wyloguj”) is held by no test and true of the code by the return step's reading.
   - D-442: each item traced to `content-revision.test.mjs:156`, `:191`, `:225-238` (eight changes × three saves), `:240`, `:274`, `:283`, `:298`, `:308`, `:348`, `tests/sim/saved-game.test.mjs:2173-2177` with `:2541`, and `tests/balance/campaign.test.mjs:231`, each with `decision: D-442`. Removed pair items held. The pair kept and widened for the server alone: no server test found that names the content revision (`git grep contentRevision -- src/server` and the server tests: no hit); true case.
2. **No binding sentence changed.** Every `+`/`-` line of `git diff 51015538..9b08c13d -- foundations/decisions.md` is a line of *Verification* or *Based on* or an indented continuation of them; binding sentences are unindented, and none appears. `git diff --stat 9e6ae5a4..51015538 -- foundations/` is empty, so the binding sentences stand as at `9e6ae5a4`.
3. **The two facts.** Form as the template gives (identifier by subject, one sentence, *Source* with the publisher's frozen address `https://html.spec.whatwg.org/commit-snapshots/0e292f402d0c3dd17fe00c1bb2ef3a3c94cd8bce/`, place, passages joined by ` · `, date read), placed before *Withdrawn identifiers*, two facts in two entries. I downloaded the snapshot and checked each of the three passages, markup dropped and whitespace collapsed: each found once, the first two under „12.1 Introduction”, the third under „12.2.1 The Storage interface”. Both facts are named by D-441's *Based on* (`foundations/decisions.md:11945`), and by nothing else; D-441 rests on them (a value kept beyond a reload; a write that throws). The sections quoted are non-normative (the Introduction says so; the `setItem` passage is the domintro note); the sentences state a design and a throw, which those passages say. See M2.
4. **The part map's sentence** says what D-441 says: one lasting state, the last judging of each triple, of a game. D-441's removals at the opening need not be in the part's sentence.
5. **External context row**: see O1.
6. **Nothing missed.** `foundation_check.py` gives 0 errors with and without `--skip-test-citations`; a search of `foundations/decisions.md`, `invariants.md`, `glossary.md`, `part_map.md` for a saved game state or game state holding, keeping or storing a judging finds only D-441's own sentence that it holds none and its *Rejected*.
7. **D-415** (`foundations/decisions.md:11806`) is outside every hunk of the range; nothing undoes the first run's correction.

Trust boundary: the range touches no code, so `src/browser/sim/saved-game.ts` is not touched and no crafted input is newly reached. Irreversible operation: none; the change only edits three foundation files.

## Declined to judge

- The pairs of D-386 and D-401, which the return step judged held by no test and kept: not changed in this range.
- Whether the cited tests pass at `9b08c13d`: the range changes no test; the cycle's run of the whole suite decides.

## Checks

| Command or method | Result |
|---|---|
| `git rev-parse HEAD 9b08c13d`; `git -C .the-way rev-parse HEAD` | exit 0; `9b08c13d591fff…` both; `19e5774a…` = pinned |
| `git diff --stat 51015538..9b08c13d`; `git log` of the range | exit 0; three foundation files, one commit |
| `python -B .the-way/elements/common/foundation_check.py` (cycle worktree, read-only) | exit 0, „0 errors” |
| the same with `--skip-test-citations` | exit 0, „0 errors” |
| `git status --short` after the checks | empty |
| `curl` of the commit snapshot | HTTP 200, 15,266,289 bytes |
| `python -I -B check_passages.py` (my script: markup dropped, whitespace collapsed, count of each passage, nearest heading) | exit 0; each passage found once, under § 12.1 and § 12.2.1 |
| filter of the decisions diff for unindented `+`/`-` lines other than *Verification*/*Based on* | no line |
| `git grep "decision: D-04 \|D-206 \|D-287 \|D-442 \|D-165 "` and the lists of tests and lines in `judging-cache.test.mjs`, `judging-record.test.mjs`; bodies read as listed above | as reported in the findings |

Not run: the focused tests (no code or test changed; the claim judged is that the test bodies hold the parts, which I read); `npm test` (the handoff's boundary); `check_instructions.py` (no instruction file changed).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` lines 195-304: the rules for `decision:` lines, the `tests:` clause and the pair, for point (1).
- `.the-way/elements/environment-facts/template.md` whole and `skill/SKILL.md`, `read.md`, `decide_entry.md`, `draft.md`, `write.md`: point (3).
- `.the-way/elements/part-map/template.md` lines 140-189: point (5).
- `foundations/decisions.md`: D-04, D-206, D-287, D-440, D-441, D-442 whole; the rest by search.
- Test files: `tests/view/judging-cache-page.test.mjs` whole; `tests/sim/content-revision.test.mjs:140-419`; `tests/view/maps-screen.test.mjs:935-994`, `:1590-1699`; `tests/view/team-lines.test.mjs:238-270`; `tests/view/judging-cache.test.mjs:150-204` and its list of tests and lines; `tests/sim/saved-game.test.mjs:2530-2545` and its `contentRevision` lines; `tests/balance/campaign.test.mjs:225-250`; `tests/sim/judging-record.test.mjs` lines `262-264`, `296-297`, `381-382`, `396-397`.
- The web: the commit snapshot of the HTML Standard named by both facts, to check the passages.
- `a note in the author's private notes`, the user's rule for scripts, before the check script.

## Working copies

- `.runs/review-rr2/` held the downloaded snapshot (`web/snapshot.html`), the check script `check_passages.py`, its output and two extracts of § 12.1 and § 12.2.1. Removed with `rm -rf` on that full path before returning. No git worktree was made (no Node test was run). Nothing kept beside this report; the results are quoted above.

## Unread material

- The handoff's *Passages of the frozen task* and *The plan's sections* are empty; `task-frozen.md` and `spec.md` not opened. Point (2) was settled against `51015538` and `9e6ae5a4` (no binding sentence in the range's diff), which needs neither.
- `.the-way/task-cycle/skill/foundation_step.md`: not read; `return_step.md` refers to „the foundation step” without naming the file, and nothing in this range needed its rules beyond the templates read.
- `foundations/decisions.md`, `invariants.md`, `glossary.md`: not read whole, by the method; the entries named above read whole, the rest by search.

## Searches not found or unclear

- A server test that names the content revision: none found (`git grep contentRevision -- src/server`; server test titles); the D-442 pair kept for the server stands.
- `.runs/task-cycles/.../reports/return-step-2-report.md` names `foundation_step.md` as read; the orchestrator's note says `return_step.md` names it — it names „the foundation step”, not the file.
