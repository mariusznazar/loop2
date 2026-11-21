PASS f5d659f8

# Review of the fix of the whole change's findings — task `ocena-programu-na-ziarnach`

- Range `f2d28489..f5d659f8` (4 commits: `3b411eb5`, `be6ca93d`, `eafdde35`, `f5d659f8`). `git rev-parse HEAD` in the cycle's worktree gave `f5d659f8dd2e26ec37353abaf4f27439663d5bbd`, the head given. `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, equal to the gitlink. The cycle's worktree was clean.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. Read whole: the handoff, `whole-findings.md`, `whole-fix-report.md`, `review-whole-report.md`, the diff of the range (`git diff f2d28489..f5d659f8`, and `--word-diff` for `foundations/decisions.md`), `.the-way/elements/decisions/template.md`.
- Counts: blocking 0 · Minor 1 (new, within the task) · out of scope 2 (lines of *Declined to judge*).

## Findings

### Critical

none

### Important

none

### Minor

**M-1. D-22 keeps a pair of examples for its judging sentence, which tests now hold, and its `tests:` clause does not name that sentence.** (within the task; in the fix diff, since `f5d659f8` rewrote the pair's line)

- Place: `foundations/decisions.md:5486-5498` (D-22, *Verification*). The `tests:` clause names only the generators, the layout's order and the seeds of map runs, then: „For the seeds of a judging, an agent compares a change with the part no invariant and no test holds: – complies: two judgings of one program of one character on Las, with one chest, giving the same twelve lines, their runs taking the same twelve seeds as a judging on Skraj lasu – violates: a judging that draws a new seed for its runs, or takes the seeds from the seed of the character's last map run”.
- What is wrong: three cases of `tests/sim/judging.test.mjs` quote D-22's judging sentence by lines `decision: D-22` and hold it: „the game's data holds … the twelve seeds 1 to 12” (one list for every map), „each seed's line is the map run of that seed …” (each run draws from its own seed), and „the same judging twice gives the same twelve lines, whatever the last seed and the map run of the game are” — which is the complying example and the second half of the violating one. The template (`.the-way/elements/decisions/template.md`, „Verification”) gives a decision whose sentence a test holds no pair, and asks the `tests:` clause to name the parts held. The fixer kept the pair on purpose (fix report, *Choices*, second point: „left for whoever reviews D-22”).
- Why only Minor: a departure from the form of the template whose content agrees with the code (WAY-364); no sentence of it reads wrongly: the pair now says the seeds are the same on Las and Skraj lasu, as the binding sentence and the data do.
- Fix, for the request's list: in D-22's `tests:` clause add the judging's part („a judging on the twelve seeds of the data, one list for every map, the same twelve lines at each judging whatever the game's last seed and map run, each run drawing from its own seed”) and remove the pair.

## Each finding of the findings file

| Finding | Verdict | Evidence |
|---|---|---|
| **I-1** D-243 `tests:` clause | **fixed** | `foundations/decisions.md:8791-8803` now gives the start as the second binding paragraph (`:8781-8786`) does: the click judges first; at once only where all twelve seeds are solved or each seed has the same row as a result of the button of a judging standing under the character; otherwise the result, the sentence in `warning`, „Puść mimo to”, the second click. The clause names what the tests hold by their lines `decision: D-243` (`tests/view/maps-screen.test.mjs` cases at 1477, 1523, 1593, 1635, 1715, 1799, 1828, 1848, 1873, 2033; `tests/view/judging-lines.test.mjs` 162, 182, 212; `tests/view/account-screen.test.mjs` 2701, 2873, 3042; `tests/sim/loop.test.mjs`). The pair of examples is gone, and each of its lines is held by one of those cases (the at-once start on twelve solved: 1477; two deaths, the sentence, „Puść mimo to”, the second click: 1523; same rows of the button's result: 1715; a start from a standing result without judging: 1715, 1593). Source fidelity: „a result an earlier „Puść w pętlę” left there being none” follows *To do* 5 („wynik … pokazany wcześniej osobnym przyciskiem oceny”); „the second click gone where another program is picked, a new judging is made or the player leaves the card, and kept where the chest or the time changes alone” follows *To do* 4 (the result stands until another program, a new judging or leaving the card) with *To do* 5; „with no new judging” is the behaviour the review of the whole change judged against the binding text, now said where the old *Rationale* said the opposite. No sentence beyond the task found. Contradiction mark of I-1 stands as recorded (yes — D-243); it is now gone. |
| **Minor 1** D-22 per-map seeds | **fixed** | D-22 `:5479-5481` „the twelve fixed seeds of a judging, the same on every map and at each judging” (*To do* 1: „te same na każdej mapie”); the three lines `decision: D-22` in `tests/sim/judging.test.mjs` quote it; `foundation_check.py` 0 errors. The pair left beside it is M-1 above. |
| **Minor 2** D-439, D-440 `tests:` clauses | **fixed** | `:11822-11834` and `:11851-11864`. I matched each part of the two clauses against the cases quoting D-439 (`tests/sim/judging.test.mjs` 159-434, `tests/sim/judging-record.test.mjs` 826, 872, `tests/view/judging-lines.test.mjs` 67, 96, 149, `tests/view/maps-screen.test.mjs` 934, 970) and D-440; each part names a case's title, in words, no path. Pairs removed; their lines are held by those cases. No meaning beyond the binding sentences and *To do* 1-2, 4, 6 found. |
| **Minor 3** D-165 lacks the remembered judging | **fixed** | `:8124` new second sentence „A judging the game remembers for a character, a program and a map (D-440) names its program by that number too.”, and the `tests:` clause names it; `tests/sim/saved-game-judgings.test.mjs` „a judging naming a character the team lacks, a program the list lacks or a map the data lacks is refused as shape” quotes it. Kept apart from the list so the three lines quoting the list sentence whole stay true — reasonable. On the mark `the cycle's`: the meaning is not the cycle's own — the frozen task gives it word for word in *Decisions in play*, „Obecne decyzje, których zadanie dotyka”, D-165: „Zapamiętana ocena nazywa program tym numerem.” (and *To do* 6 cites D-165 for the refusal of a judging naming a program the game did not give). The request can name that passage as the sentence's source rather than present it as the cycle's choice; no change to the entry needed. |
| **Minor 4** D-243 *Rationale* | **fixed** | `:8811-8815` „The judging runs anew at each first click, … so no result judged with an older chest starts the earning loop at the first click; … and the second click starts it on the result the first click has just shown, with no judging again.” — the wording the finding asked for; agrees with the `asking` branch of `src/browser/view/maps-screen.tsx:464-472`. |
| **Minor 5** loop record above completions | **fixed** | `src/browser/sim/saved-game.ts:1159` `if (inARow > loopRecord || loopRecord > completed) refuse();`. Red then green: with the new clause taken out (mutant `record`), `tests/sim/loop-record.test.mjs` fails one case, „a loop record above the map runs completed is refused as shape”, 23 pass; `tests/sim/saved-game.test.mjs` passes either way. Trust boundary below. The edit of `tests/sim/saved-game.test.mjs` (edge „an earning loop in its first map run, nothing gathered” now sets `inARow` and `loopRecord` to 0 with `completed` 0): the base version of that file run against the head code fails exactly that edge (exit 1, 44 pass, 1 fail, „AssertionError … an earning loop in its first map run, nothing gathered”), so the edit is caused by the new refusal; the state it held (record 3 with no completion) is one no code of the game makes — `completed`, `inARow` and `loopRecord` are written only at `src/browser/sim/loop.ts:161-163` (all 0 at a start) and `:363-365` (raised together at a completion), and `takeLoopPractice` (`loop.ts:237-239`) spreads the loop and resets only practice. The edge still checks what its name says (a loop in its first map run, nothing gathered). The admitting case of `loop-record` keeps its three pairs and gains a precondition; the older refusing case „a run in a row above the loop record” keeps its pairs, each still refused by its own guard alone (record ≤ 5 = completed). |
| **Minor 6** refusals of `judgeOnSeeds` | **fixed** | Both refusal cases assert `ownRefusal = (error) => error.constructor === Error`. Mutants: the character guard taken out (`src/browser/sim/judging.ts` `if (!character)` → never) — `tests/sim/judging.test.mjs` and `tests/sim/judging-record.test.mjs` each fail their refusal case alone; the program guard taken out — the same. Control: the character-guard mutant against the base version of `tests/sim/judging.test.mjs` passes (13 of 13), so the old assertion did let the guard go. Every refused input and the „a program deleted” case kept. |
| **Minor 7** test title | **fixed** | `tests/balance/engine.test.mjs:67` „the default cap of a map run equals the judging cap the built game holds”; assertion unchanged. |
| **Minor 8** `__proto__` judging with empty results | **fixed** | `tests/sim/saved-game-judgings.test.mjs:363-366` gives the judging the twelve `SOLVED_ALL`. Mutant `proto` (`fields` in `saved-game.ts` ignores an own key `__proto__`): the head test file fails „a judging record, a level of the record or the record itself of another shape is refused as shape”; the base test file under the same mutant passes 11 of 11, so the case now tests the key and before it did not. |
| **Minor 9** stale header comment | **fixed** | the sentence is gone from `tests/sim/saved-game-judgings.test.mjs` and the same one from `tests/sim/loop-record.test.mjs`; a search for „later slice” in `tests/` and `src/` finds nothing. |
| **Minor 10** „task Q14” in comments | **fixed** | `tests/view/maps-screen.test.mjs:1590`, `:1713`; a search for `Q14` in `tests/` and `src/` finds nothing. |
| **Minor 11** at-once start takes the focus | **fixed** | `src/browser/view/maps-screen.tsx:619-620` owes „Zatrzymaj” only `if (hadFocus)`. Mutant `focus` (condition taken out): `tests/view/maps-screen.test.mjs` fails one case, „an earning loop that „Puść w pętlę” starts at once takes no focus that stood elsewhere at the click”, 42 pass. The case focuses Bob's list and presses Ala's button with `press`, which fires a click without moving the focus (`tests/view/page-document.mjs:134-137`), so `hadFocus` is false as for a player whose focus stood elsewhere. The case „after „Puść w pętlę” the focus goes to that character's „Zatrzymaj”” still passes, so a held focus still moves. |
| **Minor 12** judging answered after another map opened | **fixed** | `src/browser/view/maps-screen.tsx:539, 547-550, 604-607`: `cardMap` follows the card's map in a layout effect, and a judging whose map is no longer the card's asks for nothing and frees its waiting button. Mutant `cardmap` (check made never true): `tests/view/maps-screen.test.mjs` fails one case, „a click whose judging is not yet made when another map of the list opens asks the page to judge nothing and starts no earning loop”, 42 pass. The 41 other cases, among them „a screen taken down while „Puść w pętlę” judges …” and every case of the at-once start and second click, pass at the head. |
| **Minor 13** uncaught failure, button of a judging | **fixed** | `tests/view/uncaught-failure.test.mjs:478-481` presses „Oceń na 12 ziarnach” and lets its judging run; the three assertions and both preconditions kept. As the fixer says, no mutant breaks this press alone (the judging goes through the same halted act as „Puść w pętlę”); it adds coverage, which is what the finding asked. |
| **Minor 14** docstring | **fixed** | `tests/invariants/source_lexer.py:205-211` says what the second reading is for; no code changed; ruff format and check pass. |
| **Minor 15** | not part of this fix (the orchestrator's, by the handoff) | — |

No finding is contested by the fixer.

## The fix diff — what it could have broken

- **Trust boundary, `src/browser/sim/saved-game.ts`** — my own probe (`reports/review-wf-probe.mjs`, output `reports/review-wf-probe-output.txt`), run against the head's `dist/`:
  - Game-made documents: an earning loop of Ala on each reference program of `tests/sim/reference-programs.mjs` on Skraj lasu and Las, caught up over 0, 1, 3, 8, 24 and 72 hours, saved and loaded: 276 documents, 0 refused. The counts seen (in a row / record / completed) include runs broken by deaths: `0/0/0 1/1/1 0/1/2 2/2/2 0/1/1 5/5/5 4/4/4 1/1/3 8/8/8 7/7/7`.
  - Crafted documents of version 9, one game-made document with its loop's numbers changed: record = completed + 1; record and in a row = completed + 1; both 1e15; record 2^53−1; completed 0 with record 1; completed 0 with in a row 1 and record 0; record `"1"`, `null`, `1.5`, `1e400` — each refused as `shape`, none threw, the input unchanged. Admitted, as the game makes them: record = completed, all zero, completed 999 with record 999 and 5 in a row. Record `-0` with completed 0 loads (the older `count` helper; out of scope as before, see *Declined*).
- **Irreversible operation:** none. The range raises no version and runs nothing; it adds a refusal of a state no game code makes, so no save the game writes is lost (the 276 documents above, and the load cases of `saved-game`, `loop-record`, `loop`, `saved-game-judgings`, all pass).
- **Minor 12's drop, considered:** a player who opens another map and returns to the first within the frame before the judging gets the judging on the first map — the click's own map, so no harm. A judging dropped after a map change owes no focus; where the pressed button held the focus and turned disabled, the focus could stay on the page only if the map changed in that frame without the player clicking a link (a link click takes the focus). Not a path a player takes in one frame; no finding.
- **Code made for a test:** none found. The new branches (`loopRecord > completed`, `hadFocus`, `cardMap.current !== judgedMap`) follow the requirement, not a test value.
- **Changed invariant tests:** `tests/view/uncaught-failure.test.mjs`, the case of `uncaught-failure-game-state` (one more press, every assertion kept); `tests/sim/loop-record.test.mjs`, a new case marked `invariant: save-version`; the admitting case of the same file (marked by D-213, not an invariant) gains a precondition only.
- **Entries:** no binding sentence changed beyond D-22 („of its map” → „of a judging, the same on every map and”) and D-165 (one sentence added); both quoted by tests; `foundation_check.py` 0 errors with and without `--skip-test-citations`. The D-439 and D-440 clauses and the D-243 clause add no binding meaning.

## Declined to judge

- D-439's first binding sentence („twelve fixed seeds of a map, the same seeds each time”) and the glossary's `judging` („the twelve fixed seeds of one game map”) still say „of a map”: D-439's sentence is the projected entry's approved text, word for word, and neither says the seeds differ by map; outside the fix diff and the findings file.
- `-0` admitted as a loop count by the older helper `count`: changes no comparison; outside the task, as the review of the whole change declined it.

## Checks run

In a detached worktree of `f5d659f8` at `.runs/review-wf/wt` (`npm ci`, exit 0); the-way's scripts from the cycle's worktree `.the-way` (pinned commit), run with the review worktree as the current directory.

| Command | Exit |
|---|---|
| `python -B <cycle>/.the-way/elements/common/foundation_check.py` | 0, „0 errors” |
| the same with `--skip-test-citations` | 0, „0 errors” |
| `npm test -- <file>` for `tests/sim/` loop-record (24), saved-game (45), saved-game-judgings (11), judging (13), judging-record (22), loop (46), copy (12), program-list (34); `tests/balance/engine.test.mjs` (8); `tests/view/` maps-screen (43), uncaught-failure (19), account-screen (132), judging-lines (12) | 0 each, all cases pass |
| `npm test -- <file>` for `tests/invariants/` test_balance_instrument_repeatability, test_simulation_randomness, test_simulation_isolation, test_content_identifiers, test_balance_instrument_file_writes (users of `source_lexer.py`) | 0 each |
| `npx eslint` on the 10 changed TS/JS files | 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the same 10 files (the flags of `tests/quality/test_quality_invariants.py`) | 0. A first plain `npx prettier --check` to which I had added `foundations/decisions.md` warned on that file; Markdown is outside the repository's Prettier patterns, so no finding. |
| `node tests/quality/eslint-size-rules.mjs` | 0, „0 functions and files over a threshold in 335 files” |
| `npm run typecheck` | 0 |
| `ruff format --check` and `ruff check` (`.runs/quality-venv`) on `tests/invariants/source_lexer.py` | 0 and 0 |
| Mutants (`reports/review-wf-mutate.py`, each applied alone, built by `npm test -- <file>`, then `git checkout`): `record`, `focus`, `cardmap`, `character-guard`, `program-guard`, `proto` | each kills exactly the case of its finding, as the table above gives; `record` leaves `saved-game.test.mjs` green |
| Controls: base `tests/sim/judging.test.mjs` under `character-guard`; base `tests/sim/saved-game-judgings.test.mjs` under `proto`; base `tests/sim/saved-game.test.mjs` against the head code | 0 (13/13), 0 (11/11), 1 (the edge of Minor 5) |
| `node reports/review-wf-probe.mjs <worktree> <out>` (trust boundary) | 0; results above |

Not run: the full `npm test` (the handoff: the cycle's gate, not this review's); `check_instructions.py` (no instruction file changed); StrykerJS (the mutants above target the four changed behaviours directly); a browser of my own (the handoff: not needed; the jsdom cases and mutants decide the two view fixes).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-243, D-439, D-440, D-22, D-165 read whole at the head (the entries the fix changed, named by the handoff's notes).
- `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`: *To do* 1-13, *Decisions in play*, *Settlements to record*, *Out of scope* — the handoff's passages section was empty, and source fidelity of the changed entries needs them.
- `src/browser/sim/loop.ts` (where the loop counts are written, `takeLoopPractice`), `src/browser/sim/saved-game.ts:134-175, 1120-1170` (`fields`, `list`, `entries`, `earningLoop`), `src/browser/sim/judging.ts:40-62` (guards), `src/browser/view/maps-screen.tsx:430-490, 500-680` (click handlers and the judging plumbing), `tests/view/page-document.mjs:134-137` (`press`), `scripts/build.mjs` (whether the build type-checks, for the mutants), `tests/quality/test_quality_invariants.py:18-28` (Prettier patterns), the test files' lines `decision: D-243` and `decision: D-439` (grep), to check the clauses and the fixes.
- `a note in the author's private notes` and `scripts.md`, which the session's hooks gave before the worktree command and the scripts.

## Working copies

- `.runs/review-wf/wt` (detached worktree of `f5d659f8`, with `node_modules` and `dist`): removed with `git worktree remove --force` (exit 0), then `git worktree prune` (exit 0).
- `.runs/review-wf/` (logs of the checks and mutants, the probe, its output, the mutation script): removed by its full path (exit 0); `.runs` holds `local-start`, `quality-venv`, `task-cycles` only. The cycle's worktree is clean.
- Kept beside this report: `review-wf-probe.mjs` (takes the worktree root and the output path as arguments), `review-wf-probe-output.txt`, `review-wf-mutate.py` (run from a worktree root with a mutant's name).

## Unread material

- `review-whole-probe-output.txt` and the earlier slice reviews' files: not opened; the findings file and the whole review's report quote what this review needed.
- `tests/view/maps-screen.test.mjs`, `tests/sim/judging.test.mjs`, `tests/sim/judging-record.test.mjs`: read in the diff and by their cases' titles and lines `decision:`, not line by line outside the changed cases.
- Otherwise none.

## Searches not found or unclear

- The handoff's sections „Passages of the frozen task” and „The plan's sections for what you review” are empty; I read the frozen task's passages myself (above).
- The log of the first `proto` mutant run was overwritten by the control run of the same name; the verdict rests on the two exit codes and pass counts printed by the run (head file: 1 fail; base file: 0 fail).
