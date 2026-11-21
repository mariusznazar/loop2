# Fix of the review of the whole change — task `ocena-programu-na-ziarnach`

**Status:** done

Worktree `.`, branch `task/ocena-programu-na-ziarnach`, from `f2d28489` to `f5d659f8`. Method: `.the-way/task-cycle/change/SKILL.md`, variant "the fix of a review's findings" (`fix.md`), and for the entries `.the-way/task-cycle/skill/foundation_step.md` with `elements/decisions/skill/SKILL.md` (`read.md`, `decide_entry.md`), `elements/common/way_of_working.md`, `elements/decisions/template.md`, `elements/common/rules.md`, `elements/decisions/examples.md` (WAY-03 read in `.the-way/foundations/decisions.md`).

## Commits

| Commit | What |
|---|---|
| `3b411eb5` | fix: the load refuses a loop record above the map runs completed (Minor 5), the case written first; the edge of `tests/sim/saved-game.test.mjs` that held an impossible loop; the stale header sentence of `tests/sim/loop-record.test.mjs` |
| `be6ca93d` | fix: the at-once start owes the focus only where the pressed button held it (Minor 11); a judging asked on a card the player has left for another map is dropped (Minor 12); both cases written first; „task Q14” dropped from two comments (Minor 10) |
| `eafdde35` | test: Minors 6, 7, 8, 9, 13, 14 |
| `f5d659f8` | docs: I-1, Minors 1, 2, 3, 4 in `foundations/decisions.md`, with the lines `decision:` that quote the changed sentences |

Files changed (added/removed, `git diff --numstat f2d28489..f5d659f8`): `foundations/decisions.md` 58/55 · `src/browser/sim/saved-game.ts` 3/2 · `src/browser/view/maps-screen.tsx` 21/6 · `tests/balance/engine.test.mjs` 1/1 · `tests/invariants/source_lexer.py` 4/2 · `tests/sim/judging-record.test.mjs` 7/1 · `tests/sim/judging.test.mjs` 11/5 · `tests/sim/loop-record.test.mjs` 24/5 · `tests/sim/saved-game-judgings.test.mjs` 2/6 · `tests/sim/saved-game.test.mjs` 3/0 · `tests/view/maps-screen.test.mjs` 52/2 · `tests/view/uncaught-failure.test.mjs` 4/0.

## Each finding

- **I-1** — fixed in `f5d659f8`. D-243's `tests:` clause now gives the start its second paragraph gives: the click judges the program on the card's map first; the loop starts at once where the judging solves all twelve seeds or gives each seed the row of a result of the button of a judging standing under the character (a result an earlier „Puść w pętlę” left there being none); otherwise the result, „Na {k} z 12 …” in `warning`, „Puść mimo to”, and the second click starts the loop with no new judging; the second click gone where another program is picked, a new judging is made or the card is left, kept where the chest or time alone change. The agent pair that stood for the judging part is removed: the cases of `tests/view/maps-screen.test.mjs` (at once on twelve solved; a seed unsolved and the second click; an earlier „Puść w pętlę” result is none; the same rows of the button's result start at once, a different result waits) and `tests/view/account-screen.test.mjs` now hold each of its complies/violates lines, and the template gives a pair only to the part no test holds. Written through `record-decision`. Row 5.
- **Minor 1** — fixed in `f5d659f8`. D-22: „runs on the twelve fixed seeds of a judging, the same on every map and at each judging, …”; its pair says „the same twelve seeds as a judging on Skraj lasu”. The three lines `decision: D-22` of `tests/sim/judging.test.mjs` quote the new sentence (the case „the game's data holds … the twelve seeds 1 to 12” holds „the same on every map”: one list in the data). Row 10.
- **Minor 2** — fixed in `f5d659f8`. D-439 and D-440 get `tests:` clauses written by the parts of their sentences the tests hold, in words, no path or name. Their pairs are removed: each complies/violates line is held by a test I read (D-439: the cap and seeds in the data and read from them in `judgeOnSeeds` and in the row's words, the state unchanged by a judging, uses of the resurrection included, the take list cut, unsolved map and loop/manual-run characters judged; D-440: what is remembered, replacement, the mark and the badge going out, erasure by edit and by a death that takes the practice, through a save and load). Rows 1–4.
- **Minor 3** — fixed in `f5d659f8`, as a second sentence of D-165's paragraph rather than an item inside its list: „A judging the game remembers for a character, a program and a map (D-440) names its program by that number too.” Way rejected: inserting into the list changes the sentence that three lines `decision:` of `tests/sim/copy.test.mjs` and `tests/sim/program-list.test.mjs` quote whole; their tests hold nothing of judgings, so they would have to quote a sentence they do not hold or be cut to a prefix that drops „names it by that number”. Cost if wrong: a reader wanting the list itself to be complete asks for the move later; no code depends on it. *Verification* `tests:` names the remembered judging; the case „a judging naming a character the team lacks, a program the list lacks or a map the data lacks is refused as shape” of `tests/sim/saved-game-judgings.test.mjs` now quotes the new sentence. Marked `the cycle's` (no row carries it).
- **Minor 4** — fixed in `f5d659f8`. D-243 *Rationale*: „The judging runs anew at each first click, … so no result judged with an older chest starts the earning loop at the first click; … and the second click starts it on the result the first click has just shown, with no judging again.” Row 5.
- **Minor 5** — fixed in `3b411eb5`. `earningLoop` in `src/browser/sim/saved-game.ts`: `if (inARow > loopRecord || loopRecord > completed) refuse();`. New case „a loop record above the map runs completed is refused as shape” in `tests/sim/loop-record.test.mjs` (completed 5 with record 6; 999/999 with 5; completed 0 with record 1), marked `invariant: save-version`, seen failing first. Game-made documents still load: every load case of `tests/sim/saved-game.test.mjs`, `loop-record`, `loop`, `saved-game-judgings` passes. One edge of `tests/sim/saved-game.test.mjs` („an earning loop in its first map run, nothing gathered”) set `completed = 0` and kept Ola's record of 3 — a state the game never writes (D-241: no completion, no run of completions); it now sets both counts to 0. Cause on the requirement side, D-241; the case still checks the edge it names. The admitting case of `loop-record` is renamed „… the record up to the map runs completed” with a precondition that the document's loop has 5 completed.
- **Minor 6** — fixed in `eafdde35`. Both refusal cases assert `ownRefusal = (error) => error.constructor === Error`. Seen catching each guard: the character guard removed → both files fail with `TypeError … reading 'traits'`; then the program guard removed alone → both fail with `TypeError … reading 'program'`; `src/browser/sim/judging.ts` restored (no diff, checked with `git diff`).
- **Minor 7** — fixed in `eafdde35`: „the default cap of a map run equals the judging cap the built game holds”. The old title is quoted nowhere (searched).
- **Minor 8** — fixed in `eafdde35`: the `__proto__` judging has the twelve results of `SOLVED_ALL`; the same judging without the key is the document's own `forestEdge` judging, which loads in the round-trip case, so only the key refuses it.
- **Minor 9** — fixed in `eafdde35` for `tests/sim/saved-game-judgings.test.mjs`; the same stale paragraph stood in `tests/sim/loop-record.test.mjs`, removed in `3b411eb5`.
- **Minor 10** — fixed in `be6ca93d` (both comments).
- **Minor 11** — fixed in `be6ca93d`: `if (hadFocus) focus.owe({ characterId, target: "stop" });` on the starting path. Case „an earning loop that „Puść w pętlę” starts at once takes no focus that stood elsewhere at the click” seen failing first (`expected <select>, got <button class="button destructive">`). What stays: a focus held at the click and moved by the player within the frame and the judging (25–30 ms) is still taken back, on both paths alike, since `hadFocus` is read at the click; I made no change for it, as the finding asks only the same condition as the other path.
- **Minor 12** — fixed in `be6ca93d`: the screen keeps the map of the card drawn last (`cardMap`, set in a layout effect); a judging whose map is no longer the card's asks the page for nothing — no judging, no start — and frees its waiting button, as one of a screen taken down. Applied to both clicks (the button of a judging too), since both ask on the card's map. Case „a click whose judging is not yet made when another map of the list opens asks the page to judge nothing and starts no earning loop” seen failing first (`expected [], got [["judge",1,"forest",1],["startLoop",1,"forest",1],["judge",1,"forest",1]]`).
- **Minor 13** — fixed in `eafdde35`: the case presses „Oceń na 12 ziarnach” after the error and lets its judging run; „no act started a save” then covers it. Not seen failing separately: every way a judging changes the state runs through the store's act, whose halt the „Puść w pętlę” press already holds, so no mutant breaks the button's path alone; the press keeps the button's own path under the case for a later change of it.
- **Minor 14** — fixed in `eafdde35`: the docstring says the second reading lets a name the scans compare whole still read as that name where a backtick, `$`, `{` or `}` stands as text beside it (`` `{crypto}` `` reads `crypto`), which I checked against `_template_text` and `strip`.
- **Minor 15** — not mine (the orchestrator's, by the handoff); nothing done.

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/sim/loop-record.test.mjs` before the fix (case written first) | 1 — the new case alone fails, `5 completed, 2 in a row, a record of 6` loads |
| `npm test -- tests/view/maps-screen.test.mjs` before the fix (two cases written first) | 1 — the two new cases fail, 41 of 43 pass |
| `npm test -- tests/sim/judging.test.mjs` and `tests/sim/judging-record.test.mjs` with the character guard, then the program guard removed | 1 and 1, each time the refusal case alone |
| `npm test -- tests/sim/saved-game.test.mjs` after the code fix, before the edge was corrected | 1 — the edge „an earning loop in its first map run, nothing gathered” |
| `npm test -- <file>` after the fixes: `tests/sim/loop-record`, `saved-game`, `saved-game-judgings`, `judging`, `judging-record`, `loop`, `copy`, `program-list`, `tests/balance/engine`, `tests/view/maps-screen`, `uncaught-failure`, `account-screen`, `tests/invariants/test_balance_instrument_repeatability.py`, `test_simulation_randomness.py` | 0 each |
| `python -B .the-way/elements/common/foundation_check.py` | 0, „0 errors” |
| the same with `--skip-test-citations` | 0, „0 errors” |
| `npx eslint` on the 10 changed TS/JS files | 0 |
| `npx prettier --check` on the same files | 0 |
| `ruff format --check` and `ruff check` (`.runs/quality-venv`) on `tests/invariants/source_lexer.py` | 0 and 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0, „0 functions and files over a threshold in 335 files” |
| `npm run typecheck` | 0 |

Not run: the full `npm test` (the handoff: no full gate; nothing but the cycle's run or CI checks the whole before the merge); `tests/quality/test_mutation_test_selection.py` (no test file added); `check_instructions.py` (no instruction file changed); StrykerJS (the reviewer's, WAY-253).

## Own-work check

- Requirement most likely unmet: „keep every game-made document loading” with the new refusal (handoff, trust boundary). Check: every case that loads game-made states — `saved-game` (its document has Ola at 3 in a row, record 3, 3 completed), `loop-record` („the states an earning loop makes through completions and a covered death load back”), `loop`, `saved-game-judgings` — passes; reasoning from `src/browser/sim/loop.ts:363-365`, the only place that raises the counts, `completed`, `inARow` and `loopRecord` rise together from 0 and nothing lowers `completed` (`takeLoopPractice` leaves it). It showed one test edge that held an impossible state, corrected as above.
- Browser check of Minor 11 and 12 (`.claude/skills/loop2-play/SKILL.md`, Playwright CLI 0.1.22, `npm run local` at `https://127.0.0.1:63900`, an account at `example.test`, a state with Ala and Bob, Skraj lasu and Las solved and the empty program, sent by the save request and loaded):
  - Minor 11: on Las, a real click of „Oceń na 12 ziarnach” at Ala (twelve deaths); then in the page Bob's list „Program:” focused and Ala's „Puść w pętlę” clicked by script, which moves no focus. After 1 s: the focus still on „Program: Bob”, „Zatrzymaj: Ala” standing, the loop line „Pętla: Las · przejście 1 · minuta 0 · domknięte 0” — the loop started at once on the same rows and took no focus.
  - Minor 12: „Zatrzymaj” at Ala, again „Oceń na 12 ziarnach” on Las; then in one task Ala's „Puść w pętlę” clicked and the list's link to Skraj lasu clicked. After 1 s: address `#/mapy/forestEdge`, heading „Skraj lasu”, no „Zatrzymaj: Ala” anywhere (no loop started on Las), Ala's „Puść w pętlę” on Skraj lasu reading „Puść w pętlę” and enabled, her „Oceń na 12 ziarnach” enabled. Before the fix this click would have started the loop on Las (the same rows as the button's result, as the jsdom case showed red).
  - Console: 0 errors, 0 warnings. No screenshot taken, none pushed; the browser closed (`playwright-cli close`, `playwright-cli list`: no browsers) and the start ended (`npm run local:stop`: 1 stopped).

## Foundation entries (for the request)

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-243 *Verification*, *Rationale* | row 5 | The tests show the start as the second paragraph gives it; no result of an older chest starts at the first click, and the second click starts on the result just shown. | Testy pokazują start tak, jak mówi drugi akapit; wynik oceniony ze starszą skrzynką nie rusza pętli przy pierwszym kliknięciu, a drugie kliknięcie rusza ją na pokazanym właśnie wyniku. |
| D-22 second paragraph | row 10 | The twelve seeds of a judging are one list, the same on every map and at each judging. | Dwanaście ziaren oceny to jedna lista, ta sama na każdej mapie i przy każdej ocenie. |
| D-439 *Verification* | rows 1–3 | The tests hold every part of the decision, so the pair of examples goes. | Testy trzymają każdą część decyzji, więc para przykładów odpada. |
| D-440 *Verification* | row 4 | As for D-439. | Jak przy D-439. |
| D-165 new sentence | the cycle's | A remembered judging names its program by the program's number, as every other record of a program does. | Zapamiętana ocena wskazuje program jego numerem, jak każdy inny zapis programu. |

No pair of examples was added. D-165's sentence is the only entry marked `the cycle's`; its *Rejected* is unchanged.

## Choices

- Pairs of examples of D-243, D-439 and D-440 removed where tests now hold every line of them (template, "Verification": a pair only for the part no test holds; `record-decision`, step 3: the return step removes the pair's part the test holds). Way rejected: keeping the pairs beside the new clauses — a form the template rules out. Cost if wrong: an agent comparing a change loses the worked examples; the cases with their lines `decision:` stand in their place.
- D-22's pair kept, only its „of the map” changed: the finding asked for the wording, and the case „the same judging twice gives the same twelve lines …” that may hold the pair's part is not this finding's; left for whoever reviews D-22.
- Minor 12 dropped before judging, for both clicks, as the screen does after `dispose`. Way rejected: judging and only not starting — a judging remembered for a map the player has left, the button of the new card waiting. Cost if wrong: a judging asked a frame before the map change is not remembered; the player clicks again.
- Partial staging of `tests/sim/judging.test.mjs` and `tests/sim/saved-game-judgings.test.mjs` (`git apply --cached` of their Minor 6, 8, 9 hunks) so that the quotes of changed sentences go with `f5d659f8` and each commit's quotes match its log.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-329 heading only (located); the *Verification* fields of D-22's neighbours not read. `foundations/invariants.md` lines naming D-22 and D-165 (`grep`), to see whether an invariant derives from a changed sentence — five derive from D-22 (map-run-repeatability, simulation-randomness, restart-seed, map-run-layout, instrument-game-agreement), none rests on the judging sentence; none on D-165.
- `foundations/glossary.md:310` („judging … on the twelve fixed seeds of one game map”) and D-439's first sentence („twelve fixed seeds of a map, the same seeds each time”), found by the search of step 2 of `way_of_working.md`: neither says the seeds differ by map; D-439's sentence is the approved projected text. Not changed; named here for the request.
- `src/browser/sim/loop.ts` (the counts), `src/browser/view/maps-entry.ts` (the entry's `judge`, its key „maps”), `src/browser/view/state-store.ts` (halt), `tests/view/page-document.mjs` (`press`), `.claude/skills/loop2-play/compose-state.mjs`, to fix and check.
- `a note in the author's private notes` and `scripts.md`, named by the session's instructions before the commits and the browser scripts.

## Working copies

- `.runs/whole-fix/` (test logs, the red runs' output, the partial patch, the full copies of two test files, the composed state, the browser scripts and their output): removed by its full path, exit 0.
- `.playwright-cli/` (the CLI's snapshots and console log of this session): removed, exit 0.
- One test log, `/tmp/acc.txt` (the run of `tests/view/account-screen.test.mjs`), went to the system's temporary directory by mistake; removed, `ls` confirms it gone.
- The database of the local start stays under `.runs/local-start/`, as the skill gives (no leftover to clean).
- `dist/` rebuilt by the builds; the product's own output, outside this rule.

## Unread material

- `guidelines/styleguide-browser-view.md`: read whole (1213 lines, in three parts).
- `guidelines/testing.md`: read whole.
- `.the-way/foundations/decisions.md` WAY-03: its first ~25 lines (heading to *Verification*); the rest of the print overflowed.
- `reports/review-whole-probe-output.txt`: not opened; the finding's sentence about it was enough.
- Otherwise none.

## Searches not found or unclear

- `assert.throws` with a validation function: relied on Node's rule that the function must return `true`; confirmed by the failing runs, not by documentation.
- No mutant of the button of a judging's own path fails the case of Minor 13 (see above).
- `playwright-cli run-code --filename` accepted a path under `.runs/whole-fix/`; the skill names `.playwright-cli/`.
