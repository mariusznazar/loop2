FAIL f2d28489

# Review of the whole change — task `ocena-programu-na-ziarnach`

- Range `c36e2739883002af2b959b787eb0880b748fd7e5..f2d28489` (20 commits, `a65b8fa4` … `f2d28489`). `git rev-parse HEAD` in the cycle's worktree and `git rev-parse f2d28489` both gave `f2d28489bedc2f39f2cbc3dd6d5fcf32acd441d3`. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`. Read whole: the frozen task, the plan, the handoff, the slice reviews `ra`, `rg`, `rs4` (findings and checks), `rs5` (findings), `rs6`, `rv`, `rvf`, the walk report; the executors' *Choices*/*Concerns* sections and the foundation report's concerns.
- Counts: blocking 1 · Minor 15 (all within the task) · out of scope 6 (3 findings and 3 lines of *Declined to judge*).

## Findings

### Critical

none

### Important

**I-1. The *Verification* of D-243 still says the tests show „Puść w pętlę” starting the earning loop at once on the click, which the entry's own second paragraph now forbids for a program that fails on some seed.**

- Place: `foundations/decisions.md:8790-8792` (D-243, *Verification*, `tests:` clause): „tests: „Puść w pętlę” standing beside „Wejdź” at each character in „Kto idzie” of the card of a solved map alone, and starting the earning loop at once on the click with the program the character's list „Program:” shows, the player staying on the card; …”.
- What is wrong: the binding text the change writes (`foundations/decisions.md:8780-8785`) starts the earning loop at once only „where it solves all twelve seeds, or where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character. Otherwise … a second click starts the earning loop.” The `tests:` clause restates the start without that qualification. The tests themselves no longer show what the clause says for every program: the cases of `tests/view/account-screen.test.mjs` changed by `8b280fc2` start the loop at the second click, „Puść mimo to”, and the cases of `tests/view/maps-screen.test.mjs` changed by `0095c910` start at once only on a program solving all twelve seeds or on the same rows.
- Why it matters: the entry is the one the next task reads (task 3 of the plan builds on the judging). Read alone, the clause says the opposite of the binding paragraph for a program that loses on a seed. By section 3 of the method (WAY-263) a change's files that restate an entry the change writes without its qualification are Important. The plan and the foundation writer meant the return step to rewrite this clause (foundation report, concern 2; review `ra`, Minor 2), but a plan to do it later does not lower the grade (section 1). The fix is one clause, written through `the-way-record-decision`; the return step can carry it, provided it is done before the request opens.
- Evidence: the two quoted passages; `git diff c36e2739..f2d28489 -- foundations/decisions.md` shows the *Verification* of D-243 changed in `a65b8fa4` (the agent pair added) with the `tests:` clause left as it was.
- Slice: the plan's *Foundation entries* (`a65b8fa4`), made untrue by Slices 11 (`0095c910`) and 12 (`8b280fc2`), which changed the tests; the plan left the rewrite to the return step, so it is also a gap of the plan.
- Contradiction: yes — D-243 (its second binding paragraph, written by this change; *Settlements to record* row 5).

### Minor (each within the task)

1. **D-22 reads as seeds that differ by map** — `foundations/decisions.md:5479` („runs on the twelve fixed seeds of its map”) and `:5495` („their runs taking the same twelve seeds of the map”). *To do* 1: „Ziarnami oceny są liczby od 1 do 12, te same na każdej mapie, dla każdego programu i każdej postaci”. The code is right (`src/browser/sim/data/balance.ts:55`, one list); the entry should say „the twelve fixed seeds of a judging, the same on every map”. Review `ra`, Minor 1; still standing.
2. **D-439 and D-440 have no `tests:` clause** although tests now quote them by lines `decision:` (`tests/sim/judging.test.mjs`, `tests/sim/judging-record.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`, `tests/view/judging-lines.test.mjs`, `tests/view/maps-screen.test.mjs`). A departure from the form of the template whose content agrees with the code (WAY-364); the foundation report gives it to the return step.
3. **D-165 lists the records that name a program and lacks the remembered judging** — `foundations/decisions.md` D-165 („Each record of the game state that names a program — the program the copy …, the program a character used last, … — names it by that number”). `src/browser/sim/types.ts` `RememberedJudgings` is such a record now. D-440 *derives from* D-165, so the list should name it (orchestrator's note; for the return step).
4. **D-243's *Rationale* says more than the waiting second click does** — `foundations/decisions.md` D-243 *Rationale*: „The judging runs anew at each start, … so a result judged with a chest that has changed since starts nothing”. „Puść mimo to” starts the loop without a new judging, whatever the chest did since (`src/browser/view/maps-screen.tsx`, the `asking` branch of the loop button; case „the waiting second click … stays where the chest or the time changes alone” in `tests/view/maps-screen.test.mjs`). The binding text allows it; the rationale should say „no result judged with an older chest starts the earning loop at the first click”. Review `rv`, M-1.
5. **The load admits a loop record above the completions** — `src/browser/sim/saved-game.ts` `earningLoop` (after `if (inARow > loopRecord) refuse();`). The game never makes `loopRecord > completed` (`src/browser/sim/loop.ts:363-365` raise the three together from 0); my probe loaded `inARow = loopRecord = 999` with `completed = 0` (`review-whole-probe-output.txt`, last line). The load already compares fields (`completed >= runNumber`), so `if (loopRecord > completed) refuse();` fits; the cost of leaving it is a forged number in its own player's report line. Reviews `rs5` (Minor 2) and `rs6` (out of scope 2), which I grade within the task: it is the task's new field at a trust boundary.
6. **The refusals of `judgeOnSeeds` survive the removal of their guards** — `src/browser/sim/judging.ts:461-476`; the tests (`tests/sim/judging.test.mjs`, the refusal case; `tests/sim/judging-record.test.mjs`, the refusal of the act) assert only `assert.throws(…, Error)`, which a `TypeError` from reading `.traits` of `undefined` also meets. A check that the error is the function's own (`error.constructor === Error`) would name each guard. Review `rg`, M1.
7. **A test title claims more than it checks** — `tests/balance/engine.test.mjs:67` „… is the judging cap the built game holds, not a number of the instrument”: with `4000` written back into `balance/engine.mjs` it passes while the data hold 4000. „… equals the judging cap the built game holds” says what it checks. Review `rg`, M2.
8. **The case of a `__proto__` key in a judging is refused for an empty `results`** — `tests/sim/saved-game-judgings.test.mjs:366-370` (`{"results":[],"equipment":[],"__proto__":{}}`): the length check refuses it whatever happens to the key. Twelve results would make the case test the key (my probe's „map __proto__” and `rs4`'s probe show the load refuses it). Review `rs4`, M-1.
9. **The header comment of a test file describes the plan's order of work** — `tests/sim/saved-game-judgings.test.mjs:9-11` „The version of the shape is raised in a later slice together with the document of `tests/sim/saved-game.test.mjs` …”; the version is raised at the head, so the sentence speaks of a past step (`guidelines/testing.md`, „Where the expected value comes from”: no comment without information the code needs). Review `rs4`, M-2.
10. **Two test comments point to the task's document** — `tests/view/maps-screen.test.mjs:1590` and `:1713` („// D-243, task Q14: …”). `guidelines/testing.md`, „Where the expected value comes from”: „Komentarz testu nie wskazuje dokumentu spoza fundamentu.” Drop „, task Q14”. Review `rvf`, m-1 (which named both lines).
11. **The at-once start takes a focus the player moved during the judging** — `src/browser/view/maps-screen.tsx`, `judging.start`: the starting path owes the focus to „Zatrzymaj” unconditionally, while the path that does not start owes it only `if (hadFocus …)`. The judging now runs a frame after the click (the walk measured 25-30 ms), so a player who tabbed on meanwhile has the focus pulled back. A `hadFocus` condition, as on the other path, closes it (styleguide, „Focus does not fall to the page”, is not broken: the focus goes to a control). Review `rv`, M-2.
12. **A judging asked on one map and answered after another map was opened still acts on the first** — `src/browser/view/maps-screen.tsx`, `judging.start` keeps `judgedMap`: a first click of „Puść w pętlę” whose judging solves all twelve seeds starts the loop on the first map while the card shows another. The player did ask for that start, and the window is one frame plus the judging, so the effect is small; dropping an answer whose map is no longer the card's, as the screen drops one after `dispose`, closes it. Review `rv`, M-3.
13. **The case of the uncaught failure does not press the button of a judging** — `tests/view/uncaught-failure.test.mjs`, „after an error nothing handled, the buttons of the screen Mapy change no state …”, presses „Puść w pętlę”, „Puść mimo to” and „Wejdź”; the judging path is covered only through „Puść w pętlę”, which uses the same `judge` control. Review `rv`, M-4.
14. **A docstring names code that no longer exists** — `tests/invariants/source_lexer.py:208` („as the old cut of the balance instrument read it”). Say what the reading is for. Review `ra`, Minor 3.
15. **The request must give the right reason why the shared lexer leaves regular expressions out of the scans** — slice 2's report („Where a test sees more or differently”, first bullet) says „the sentences of all four invariants exclude regular expressions”; they do not — the *Covers* of the test files do (`tests/invariants/test_simulation_randomness.py:9-11`). No code changes; the text that goes into the request is to be right. Review `ra`, Minor 4.

### Out of scope

1. **Important by consequence, beyond the task: a player who judges much can push the save over 64 KiB.** The task's *To do* 6 asks only that the cycle measure it („Cykl sprawdza, ile miejsca zajmują zapamiętane oceny … wobec limitu zapisu 64 KiB”), and that is met: `reports/slice-06-measure-output.txt` (re-run and confirmed by `rs6`, arithmetic checked by hand there) gives 211.9-296.9 bytes a judging, and 5 characters × 20 programs × 3 maps take 107.6 % of the limit with empty programs and up to 167 % in the worst case; at most 152-276 judgings fit beside 20 programs. What the player would see: from that point every save fails with „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” (D-208), and progress since the last good save is lost when the page closes. Nothing erases a judging of a program the player keeps and does not edit; deleting or editing programs frees the room, which the sentence half-suggests, while stopping loops barely does. Today's plausible play (3 characters, ~10 programs, 3 maps: ~90 judgings, ~20-27 KB, beside a save of ~10-20 KB) fits, and the walk measured 10 002 characters for a state with 3 judgings; the risk grows linearly with the maps that task 3 of the plan adds. A way out needs a decision the task does not hold — a shorter form of a judging (results as twelve letters would roughly halve it), a cap on remembered judgings, or a higher limit (D-104, D-207). How serious for the request: it does not block the merge, but the request has to put the figures and these options before the human as a decision to take before task 3, not as a footnote.
2. **The guideline names the trust-boundary case of `tests/sim/previous-programs.test.mjs` by a stale title** — `guidelines/testing.md:177` „a document of each version from 1 to 5 …”; the case reads „… from 1 to 8 …” at the base and „… from 1 to 9 …” at the head (`tests/sim/previous-programs.test.mjs`, renamed by `7fc40efc`). Stale before the change; a title that follows the version will go stale at each raise. Review `rs6`, *Declined to judge*.
3. **Readings of text no parser accepts** — `tests/invariants/source_lexer.py:194-201` and the string reading: on an unclosed template or string at the end of a file the new lexer gives another reading than an old copy did. No file the build accepts can hold such text. Review `ra`, Minor 5; no change asked.

## The Minor and out-of-scope findings of the slice reviews, graded here

| Review | Finding | Here |
|---|---|---|
| `ra` | Minor 1 D-22 per-map seeds | Minor 1 |
| `ra` | Minor 2 D-243 `tests:` clause | Important I-1 |
| `ra` | Minor 3 `source_lexer.py` docstring | Minor 14 |
| `ra` | Minor 4 slice 2 report's reason | Minor 15 |
| `ra` | Minor 5 unclosed-text readings | out of scope 3 |
| `rs4` | M-1 `__proto__` case | Minor 8 |
| `rs4` | M-2 header comment | Minor 9 |
| `rs4` | 4 lines of *Declined to judge* | `saved-game.test.mjs` red until slice 6 — resolved at the head (version 9, the file passes); the size of the judgings — out of scope 1; erasure and lines in „Kto idzie” in other slices — met, see below; the foundation-check errors before the range — resolved (0 errors at the head) |
| `rs5` | Minor 1 shape changed at version 8 | resolved: `7fc40efc` raises `SAVED_GAME_VERSION` to 9 once, with the document of `tests/sim/saved-game.test.mjs`, and keeps the version-8 document refused as `version`; no finding |
| `rs5` | Minor 2 loop record above `completed` | Minor 5 |
| `rs5` | 5 lines of *Declined to judge* | the report line (slice 13, met), the version raise (met), `-0` read by `count` (out of scope: an older helper, JSON cannot carry `-0` distinctly in a way that changes a comparison; *Declined to judge* below), mutants on older lines (out of scope, *Declined*), another agent's uncommitted files (not a finding) |
| `rg` | M1 refusal guards | Minor 6 |
| `rg` | M2 test title | Minor 7 |
| `rg` | 2 lines of *Declined to judge* | `events: []` mutants of `settleDeath`/`deleteProgram` — out of scope (*Declined* below); the five D-243 quotation errors — resolved (0 errors at the head) |
| `rs6` | out of scope 1 save size | out of scope 1 |
| `rs6` | out of scope 2 loop record | Minor 5 (within the task) |
| `rv` | M-1 … M-4 | Minor 4, 11, 12, 13 |
| `rvf` | m-1 „task Q14” | Minor 10 |
| `rvf` | out of scope: `standing` captured at the click | withdrawn: it needs a click of „Oceń na 12 ziarnach” and of „Puść w pętlę” within one frame, not a path a player takes; no finding |
| `rvf` | out of scope: `rv`'s Minors | graded above |

## The orchestrator's choices, judged

- **The first chill erases the program's remembered judgings** (slice 7, `src/browser/sim/game.ts` `advanceMinutes` through `withProgramSaved`): agrees with D-440 („A change of the rules … of a program erases the judgings remembered for it”); D-123 exempts the written rule only from the copy's unsaved changes and the announcement of D-172, and a judging of the program without „Zawsze → Eksploruj” no longer speaks of the program that has it. No finding.
- **„Puść mimo to” starts as any start; another program or a new judging removes it, a change of the chest alone does not**: agrees with D-243's binding text; the rationale's wording is Minor 4.
- **„Puść w pętlę” inactive with its text kept while it judges**: agrees with *To do* 4 („„Puść w pętlę” na czas swojej oceny napisu nie zmienia”) and the styleguide („Wyłączony przycisk traci fokus …, więc ekran po odpowiedzi przywraca go”); the focus comes back (`tests/view/maps-screen.test.mjs`). No finding.
- **D-165's list lacks the remembered judging**: Minor 3.
- **`guidelines/coding-simulation-module.md` has no rows for `judging.ts` and `judging-record.ts`**: the-way's coding template gives a file added after the audit no row (`.the-way/product-guidelines/coding/template.md:268-269`, as `rg` found), and `guidelines/coding-browser-module.md`, „Nowy ekran i moduły w DOM”, says the same for view files. No finding.
- **The save-size finding**: out of scope 1 — *To do* 6's check is made; the consequence is for the human at the request.

## Against the whole task

- *To do* 1: `BALANCE.judgingCapMinutes: 4000` and `judgingSeeds: [1 … 12]` beside each other (`src/browser/sim/data/balance.ts:46-55`); `judgeOnSeeds` steps `while (!mapRunEnded(run) && run.minute < cap)`, so a completion or death in minute 4000 counts and only a run still going is undecided, as `runOnce`. Met.
- *To do* 2: equipment by `sendTake` (cut by chest, capacity, entry cap), one backpack for all twelve, nothing taken from the chest, program reduced by `programOf` as `beginRun` does, only `stepMinute` passes minutes (no discovery, no rule written), no clock and no seed drawn; the act changes `judgings` alone (`src/browser/sim/judging.ts:518-531`). Met.
- *To do* 3, 8: twelve rows, three kinds, undecided not solved, no first fire, no entry tile, no summarising sentence; every text word for word (`src/browser/view/judging-lines.ts`, `src/browser/view/away-report.ts`), the cap from the data. Met.
- *To do* 4: the button at each character on every open map, active at a character in a loop or a manual run, drawn disabled with „Oceniam…” before one call through `store.act` (D-409), the result under the character until another program, a new judging or leaving the card (map change resets the screen state; another screen disposes it; a reload); the pick and the program used last unchanged. Met; the walk confirmed it in a browser (cases 1a-1c, 6a-6c).
- *To do* 5 and Q14: judging first; all twelve solved → at once; else result, „Na {k} z 12 …” in `warning`, „Puść mimo to”, start at the second click; the same rows of a result of the button → at once; a result of an earlier „Puść w pętlę” → waits again (`f2d28489`). Met; the foundation's verification clause is I-1.
- *To do* 6: last judging per character, program and map, kinds and equipment only; badge, „{n} z 12”, note and badge going out with „12 z 12”; more in the chest leaves it; erased by a save of different rules, groups (order) or trip plan, not by a rename; removed with the program; all of a character's erased by a death with `progressLost`, in a manual run, a loop and the catch-up; not by a covered death or a bought rank; the load refuses a judging naming a character, program or map the game did not give; the cap and the map's data not compared. Met. The room is measured (out of scope 1).
- *To do* 7: `inARow`/`loopRecord` counted in `takeEnd` (open game and catch-up alike), reset by a covered death and a death with no practice, gone with the loop; the report line ends with the record, plain text, declined by `countedName`, none at zero or on a stopped line. Met.
- *To do* 9: D-439, D-440 new; D-243, D-329, D-325, D-241, D-246 changed; D-22 sentence; D-190's rationale; `judging` and `loop record` in the glossary. Met, with I-1 and Minors 1-4.
- *To do* 10: styleguide rule „The screen Mapy” and „States of shared controls” give every role the task names; the kitchen-sink page shows the button's loading state (`25d1494d`), as the rule „The kitchen-sink page” asks for a new state. Met.
- *To do* 11: `DEFAULT_CAP_MINUTES = BALANCE.judgingCapMinutes` (`balance/engine.mjs:32`), `trace.mjs` and `campaign.mjs` unchanged. Met.
- *To do* 12: one lexer in `tests/invariants/source_lexer.py` of `test-helpers`, the four copies gone, the part map follows. Met (review `ra`).
- *To do* 13: the stand-in binds before it holds and the case waits for the `Loop:` line (`b2114894`). Met (review `ra`); not re-run here.
- Rows 1-13 of *Settlements to record*: each stands in its entry (D-439 rows 1-3, D-440 row 4, D-243 row 5, D-329 row 6, D-325 row 7, D-241 row 8, D-246 row 9, D-22 row 10, D-190 row 11, glossary rows 12-13); the projected entry „(new) — How does the game judge a program before an earning loop?” stands word for word as D-439's first paragraph, with *Relations* and *Verification* filled. Source fidelity: no sentence added beyond the task's answers (as `ra` traced); I found none either.
- Nothing built that nobody asked for. No reserved choice taken: no language, framework, library, store or place to run is added.

## Trust boundary (`src/browser/sim/saved-game.ts`) — my own check at the head

A probe (`reports/review-whole-probe.mjs`, output `reports/review-whole-probe-output.txt`) built a document of version 9 through the game's own functions (two characters, two programs, judgings on two maps, an earning loop, `savedGame(withSaveTime(…))`, a JSON round trip), loaded it (`ok`), then changed one place at a time, 38 cases: `judgings` missing, `null`, a list; character keys `99`, `01`, `-1`, `__proto__`; program keys `99`, `1.5`, `__proto__`; map keys unknown, `constructor`, `__proto__`; 11 and 13 results; a result object with cause and minute, an unknown kind, `toString`, a number, a 12-letter string in place of the list; a foreign key in a judging; equipment missing, an unknown item, counts 0, −1, 1.5, 2^53, a string, an item twice; loop counts run above record, negative, 1.5, a string, 1e308, missing, a foreign key. Each was refused as `shape` with no throw and the document unchanged, except two that load: equipment of count 2^53−1 (a safe count; harmless, it only lights the note on the stock) and a loop record above `completed` (Minor 5). The earlier probes of `rs4` (40 cases), `rs5` and `rs6` (70 cases) cover more forms and agree.

Irreversible operation: none prepared or run; the version rises from 8 to 9, which discards today's saves at deployment (D-206), accepted by the project's definition. The walk saw it (case 10).

## Tests

- No code made for a test's input found: the cap and seeds come from the data, the texts from `judging-lines.ts`, no branch for a test value.
- The tests take their expected values from the foundation and from written-out values (texts, kinds, counts); changed existing cases give D-243, D-206 or D-241 as their reason. Changed invariant tests: `tests/invariants/test_simulation_isolation.py`, `test_simulation_randomness.py`, `test_content_identifiers.py`, `balance_source_scan.py` (slice 2, the cutting moved, no case changed), `tests/invariants/test_local_start_access.py` (slice 1, D-256 case), and the case of `uncaught-failure-game-state` in `tests/view/uncaught-failure.test.mjs` (slice 11, assertion replaced by a stronger one).
- Mutation: the simulation files changed in the range were mutated by the slice reviews (`rg`: `judging.ts`, `judging-record.ts`, the changed ranges of `programs.ts`, `game.ts`, `loop.ts`; `rs4`, `rs5`, `rs6`: the new ranges of `saved-game.ts` and `loop.ts`). After those reviews only `saved-game.ts:85` (a literal, no mutant) changed (`git diff --stat 3218a620 f2d28489 -- src/browser/sim`), so I did not re-run StrykerJS; the survivors they classified stand (Minor 6 is the one real gap).
- The walk (29 of 34 sub-cases in Chrome, none wrong) follows the task's requirements; each case left unchecked gives its reason. I looked at screenshot 05 (`05-puszcz-mimo-to.png`): the sentence stands above „Puść mimo to” in its column, beside „Oceń na 12 ziarnach”, readable; *To do* 8 („nad przyciskiem”) holds; no finding.

## The structure the change leaves

- `python -B .the-way/task-cycle/change_file_sizes.py c36e2739… f2d28489` (exit 0): +5114 lines over 41 files; of code, `src/browser/view/maps-screen.tsx` 466 → 717, `src/browser/sim/saved-game.ts` 1435 → 1492 (excepted file, D-425), `src/browser/sim/programs.ts` 810 → 836, `src/browser/sim/loop.ts` 613 → 638, `src/browser/sim/game.ts` 979 → 983; new `judging.ts` 115, `judging-record.ts` 140, `judging-lines.ts` 125, `judging-result.tsx` 57; the four test copies shrank by 520 lines into `source_lexer.py` 222.
- The size rule (`node tests/quality/eslint-size-rules.mjs`): base „0 functions and files over a threshold in 326 files”, head „0 … in 335 files”. Nothing pushed over a threshold. The judging's state lives in `MapsView`/`CharacterRow` of `maps-screen.tsx`, which grew most; both stay under the thresholds, so no finding.
- No code left without a user: `withProgramContent` is called only inside `withProgramSaved`; no name stopped being true that I found beyond the comments of Minors 9 and 14.

## Declined to judge

- `-0` admitted by `count` in the loop counts: an older helper serving every count of the save; it changes no comparison. Outside the task.
- Surviving mutants `events: []` of `settleDeath` and `deleteProgram` and others on lines the range did not write: outside the task.
- Whether a judging of twelve runs stays short on a slow device: measured 25-30 ms (walk) and 5-170 ms in Node (task *Context*); no requirement sets a limit; outside what the task asks to check.

## Checks run

In a detached worktree of `f2d28489` (`npm ci`, exit 0), the-way's scripts from the cycle's worktree `.the-way` (pinned commit). Exit codes kept in `reports/review-whole-checks-summary.txt`.

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0, „0 errors” |
| the same with `--skip-test-citations` | 0, „0 errors” |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, „0 error, 249 warn, 7 info” — the same counts on the base |
| `npm run typecheck` | 0 |
| `node tests/quality/eslint-size-rules.mjs` (head and base) | 0 and 0, nothing over a threshold |
| `npx eslint` on the 29 changed TS/JS files | 0 |
| `npx prettier --check` on the 31 changed web files | 0 |
| `npm test -- <file>` for `tests/sim/` judging, judging-record, loop-record, saved-game-judgings, saved-game, previous-programs, loop, catch-up, death, program-list, copy, data | 0 each |
| `npm test -- <file>` for `tests/view/` judging-lines, maps-screen, away-report, headquarters-screen, account-screen, uncaught-failure, shared-controls, state-store, counted-name | 0 each |
| `npm test -- <file>` for `tests/balance/engine.test.mjs`, `agreement.test.mjs` | 0 each |
| `npm test -- <file>` for `tests/invariants/` simulation_isolation, simulation_randomness, simulation_inputs, content_identifiers, browser_view_token_values, balance_instrument_file_writes, balance_instrument_repeatability, saved_program_edit, application_build_kitchen_sink; `tests/quality/` mutation_test_selection, node_test_selection | 0 each |
| `npm test -- tests/invariants/test_cross_part_imports.py` | 1 at the first run: my own probe file, untracked in the worktree's root, imported `dist/`; removed, re-run → 0 |
| `node probe-review-whole.mjs` (hostile load, 38 cases) | 0; results above |
| screenshot 05 of the walk, fetched with `gh api` | viewed; see Tests |

Not run: the full `npm test` (the cycle's gate is CI's, by the handoff); `tests/invariants/test_local_start_access.py` (slice 1's case, about 200 s, run by `ra`; no file it reads changed after `b2114894`); StrykerJS (reason under Tests); a browser of my own (the walk covers it).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-22, D-190, D-241, D-246 read whole at the head (the entries changed); D-439, D-440, D-243, D-325, D-329 whole; the index of my selection (below).
- `foundations/invariants.md`: the invariants of the touched parts and those deriving from changed decisions (listed under *Unread material*), to see whether any quotes an altered sentence — none does.
- `src/browser/sim/saved-game.ts:134-302, 465-469, 1116-1170` (`fields`, `list`, `entries`, `oneOf`, `tripList`, `listedProgram`, `characterKey`, `earningLoop`) for the trust boundary; `src/browser/sim/loop.ts` (counts, `startLoop`); `tests/sim/understanding-fixture.mjs` for the probe.
- `a note in the author's private notes` and `git.md`, which the session's hooks named before the probe script and the worktree command.

## Working copies

- `.runs/review-whole/wt` (detached worktree of `f2d28489`, with `node_modules`, `dist` and the probe) and `…/.runs/review-whole/base` (detached worktree of `c36e2739`, with `node_modules`): removed with `git worktree remove --force` (exit 0 each), then `git worktree prune`.
- `.runs/review-whole/` (the index of decisions, the diffs, the logs of the checks, the check script, the screenshot `shot05.png`): removed by its full path (exit 0); `.runs` holds `local-start`, `quality-venv`, `task-cycles` only. The cycle's worktree is clean.
- Kept beside this report: `review-whole-probe.mjs`, `review-whole-probe-output.txt`, `review-whole-checks-summary.txt`. The probe imports `./dist/…` and `./tests/sim/understanding-fixture.mjs` relative to a worktree root and takes the output path as its argument.

## Unread material

- Decisions: the index of my selection (sections „Judging a program”, „Earning loop and time away”, „Screen Mapy and Siedziba”, „Saving the game state and the previous save”, „Trip plan, chest and items”, „Balance measurement”; parts simulation, browser-view, balance-tools, test-helpers, product-foundation, agent-workflow, build-tools; and the decisions of *Decisions in play* and those the slices named) lists 74 decisions in full and 326 by heading. I read whole 9: D-439, D-440, D-243, D-329, D-325, D-241, D-246, D-22, D-190. Of the decisions that bear on the change and stayed unread whole (read by their binding sentences in the index): D-165, D-170, D-123, D-189, D-179, D-249, D-326, D-239, D-409, D-407, D-206, D-207, D-208, D-213, D-386, D-104, D-287, D-44, D-425. I ran through the 326 headings and found none whose question bears on the change beyond those (D-131, D-135, D-167, D-168, D-172, D-173, D-174, D-221 considered by their question; their binding text is not reached by the code).
- Invariants read whole: map-run-repeatability, simulation-randomness, restart-seed, map-run-layout, trip-run-end, resurrection-renewal, death-settled-once, catch-up-state, catch-up-death-moment, loop-practice-payment, instrument-game-agreement, simulation-isolation, simulation-inputs, content-identifiers, browser-view-token-values, browser-view-focus-outline, design-token-sources, character-team, node-test-selection, mutation-test-selection, streak-program-change, saved-program-edit, copy-save, trip-transfer, save-version, solved-map-manual-run, catch-up-minutes, loop-run-knowledge, local-start-access, uncaught-failure-game-state, cross-part-imports, previous-save-programs-reader, function-and-file-size. Not read: the other invariants of parts the change touches only through the gate (deployment, account-server).
- Part map read whole; glossary read whole; the-way's glossary not opened (no word of the process is used in the changed product files that I found needing it).
- Guidelines read whole: `guidelines/coding.md`, `coding-saved-game.md`, `coding-simulation-module.md`, `coding-content-data.md`, `coding-balance-instrument.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`. `src/browser/AGENTS.md` not opened (the browser-view guidelines cover its content in the review's reach).
- The diff: read whole for `src/`, `balance/`, `stryker.config.json`, `foundations/`; for the tests, the diffs of the small changed files whole and the large new and changed test files (`tests/view/maps-screen.test.mjs` +1130, `tests/sim/judging-record.test.mjs`, `tests/sim/saved-game-judgings.test.mjs` header and crafted cases, `tests/sim/loop-record.test.mjs`, `tests/sim/judging.test.mjs`, `tests/view/account-screen.test.mjs`) by their cases and quotations as the slice reviews describe them, not line by line; the Python lexer and the four invariant files of slice 2 not read line by line (review `ra` compared them by a differential probe).
- Reports: `slice-01…13`, `slice-k` and `repair-q` executor reports read in their *Choices*/*Concerns* sections only; `foundation-report.md` read in its choices and concerns.

## Searches not found or unclear

- The worktrees of my directory had no initialized `.the-way`; the-way's scripts ran from the cycle's worktree `.the-way` at the pinned commit.
- `tail -3 f1 f2` failed under the Bash tool (`option used in invalid context`); `tail -n` worked.
