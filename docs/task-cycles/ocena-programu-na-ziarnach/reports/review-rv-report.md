FAIL 25d1494d

# Review `rv` — task `ocena-programu-na-ziarnach`, range `7fc40efc..25d1494d`

Method: `.the-way/task-cycle/review/SKILL.md` (review-change), the-way pinned at `19e5774aed6d1d628042e23deccc110ed9f112c0`. Head checked: `git rev-parse HEAD` = `25d1494d6fa928c54b27e00fef2ef30743ed1466`. Range holds slices 10 (`159eca79`, `47111517`), 11 (`0095c910`), 12 (`8b280fc2`), the fix of slice 11's focus defect (`21499c5d`, judged with slice 11), slice 13 (`cf8261c8`) and the kitchen-sink step (`25d1494d`).

Trust boundary: the range does not touch `src/browser/sim/saved-game.ts` (no file under `src/browser/sim/` changes in `git diff --stat 7fc40efc..25d1494d`), so no crafted input at that boundary was checked here. Irreversible operation: none; the range prepares nothing irreversible.

## Findings

### Important

**I-1. „Puść w pętlę” starts the earning loop at once on a failing result that came from an earlier „Puść w pętlę”, not from the button of a judging** — slice 11 (`0095c910`).

Place: `src/browser/view/maps-screen.tsx:476` passes `shown?.judging` as `standing` for any result standing under the character; `src/browser/view/maps-screen.tsx:595` starts at once where `standing` has the same lines; `src/browser/view/maps-screen.tsx:627` (`spend`) leaves the result of a first click of „Puść w pętlę” standing with `asking: false` after „Puść mimo to”.

What is wrong: a player clicks „Puść w pętlę” on a program that dies on some seed, sees the result and „Na {k} z 12 ziaren…”, presses „Puść mimo to”, then stops the earning loop (or the loop ends in a death that stops it — the view result stays). The result stays under the character, as D-329 lets it. A new click of „Puść w pętlę” whose judging gives the same twelve lines then starts the earning loop at once, with no second click. D-243, which this task writes, allows an at-once start on a failing judging only „where it gives each seed the same line as the result of the button of a judging (D-329) that stands under the character. Otherwise … a second click starts the earning loop.” The task says the same: *To do* 5 „Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny …”, *Settlements to record* row 5 „gdy pod postacią stoi już ten sam wynik z osobnego przycisku oceny, pętla rusza od razu”, and Q14 is asked of that case alone. A result left by „Puść w pętlę” is none of these, so by the entry and the task this click must wait for „Puść mimo to”.

Why it matters: the code does what the entry it writes forbids (the „Otherwise” branch), which WAY-263 grades Important. The effect on the player is mild — the player has seen this exact result and sent it once — but the case after a death that stopped the loop is the one D-243's warning exists for: the character has just changed, and if the new judging still gives the same lines the loop starts with no warning shown again.

Evidence: a probe on jsdom in a worktree of `25d1494d` (`npm test -- tests/view/zz-review-probe.test.mjs`, exit 0; the file is kept as `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rv-probe.test.mjs.txt`, its output as `…/reports/review-rv-probe-output.txt`): click „Puść w pętlę” (judging with a death) → „Puść mimo to” → „Zatrzymaj” → „Puść w pętlę” with the same judging gives the calls `["judge","startLoop","stop","judge","startLoop"]`: the last click started the loop at once. No case of `tests/view/maps-screen.test.mjs` covers this path; case 4 of slice 11 („where a result with a failure already stands under the character …”, `tests/view/maps-screen.test.mjs:1672`) only stands results from the button of a judging before the same-lines start.

Two ways out, for the orchestrator: (a) recommended — the shown result records which click made it (for example `from: "judge" | "loop"` on `ShownJudging`), and only a result of the button of a judging (or one kept at an at-once start that equalled such a result) is passed as `standing`; add a case of the path above. Cost: a field and a case; it follows the task and the entry word for word. (b) widen D-243 to „the result that stands under the character”, which the rationale of Q14 (rejected variant a: „klika dwa razy, choć wynik już widział”) arguably supports — but the frozen task's wording is specific to the button of a judging, so this widening is a question for the human, not for the cycle.

Contradiction: yes — D-243 (second paragraph, „… the result of the button of a judging (D-329) that stands under the character. Otherwise …”) and the task's Q14 answer, *To do* 5 and *Settlements to record* row 5.

### Minor

**M-1. The rationale of D-243 says more than the waiting second click does.** `src/browser/view/maps-screen.tsx:627` and the case „the waiting second click … stays where the chest or the time changes alone” (`tests/view/maps-screen.test.mjs:1592`): „Puść mimo to” survives any change of the chest and starts the loop without a new judging, as the orchestrator's answer (record question 11) and D-243's binding text allow. D-243's *Rationale* reads „The judging runs anew at each start, … so a result judged with a chest that has changed since starts nothing”. With other characters' earning loops running, the chest changes every few game minutes, so a second click pressed later starts on a result judged with another chest. Not a departure from binding text, so Minor; the sentence of the rationale would read truer as „… so no result judged with an older chest starts the earning loop at the first click”. Nothing to change in the code.

**M-2. The at-once start takes a focus the player moved during the judging.** `src/browser/view/maps-screen.tsx:597` owes the focus to „Zatrzymaj” unconditionally, while the path that does not start owes it only `if (hadFocus …)`. Before the change the start was synchronous, so no focus could move between click and start; now the judging comes a frame later and may take up to ~170 ms (task *Context*, the refiner's measure). A player who tabbed on during it has the focus pulled to „Zatrzymaj”. Small window; a `hadFocus` condition, as on the other path, closes it.

**M-3. A judging asked on one map and answered after the player opened another still acts on the first map.** `src/browser/view/maps-screen.tsx` `judging.start` captures `judgedMap`; where the act is „loop” and the judging solves all twelve seeds, `controls.startLoop(characterId, judgedMap, …)` runs while the card shows another map. The window is one frame plus the judging; slice 10's executor noted the hidden result of the same race. Low likelihood; dropping the answer of a judging whose map is no longer the card's (as the screen already drops one after `dispose`) would close it.

**M-4. The case of the uncaught failure does not press the new button.** `tests/view/uncaught-failure.test.mjs` „after an error nothing handled, the buttons of the screen Mapy change no state …” presses „Puść w pętlę”, „Puść mimo to” and „Wejdź”, not „Oceń na 12 ziarnach”. The judging of „Puść w pętlę” goes through the same `judge` control and `store.act`, whose `take` refuses results after `halt()`, so the path is covered indirectly; pressing the button of a judging there too would name it.

### Out of scope

none

## The executors' choices the orchestrator asked to judge

- „Puść w pętlę” inactive with its text kept while its judging counts: agrees with *To do* 4 („napisu nie zmienia”) and with the styleguide's „Wyłączony przycisk traci fokus…, więc ekran po odpowiedzi przywraca go”; the focus does come back (`tests/view/maps-screen.test.mjs:1756`). No contradiction.
- After an at-once start the standing result kept only where the new rows equal it, else removed: a new judging is one of the three things that end a result (D-329, *To do* 4), so removing a different one agrees. No contradiction.
- The second click starts the loop as any start does, and only another program, a new judging or leaving the card remove it: agrees with D-243's binding text; see M-1 for the rationale's wording.
- A result stands until another program is picked, a new judging, or the player leaves the card (another map, another screen — the entry lives `while-shown` and disposes the screen —, a reload): agrees with D-329 and *To do* 4. A result is also hidden, not removed, where the list shows another program for another reason (`tests/view/maps-screen.test.mjs:1134`); D-329's „violates” (a result standing after another program is picked) is not met.
- The kitchen-sink row „Przycisk oceny” (`25d1494d`): the styleguide's rule „The kitchen-sink page” asks a new state of a shared control on the page in the same change, and „States of shared controls” names the loading state of the button of a judging; the row shows it with the texts from `judging-lines.ts`. No sample of the result is required by that rule. Agrees.
- Slice 13's hand-made loops: `tests/view/camp-picture.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/character-screen.test.mjs` and `tests/view/team-lines.test.mjs` hold earning loops without `inARow`/`loopRecord`; none draws the away report (searched for `awayReport`, `reportEntries`, `loadSavedGame` in the first two; the Postać screen hides the report by D-246, `team-lines` draws a loop line only). `camp-picture` passes at head.

## Against the task, the foundation and the guidelines (what was checked and held)

- Texts word for word against *To do* 8: button and „Oceniam…”, heading, the five row forms (cap from `BALANCE.judgingCapMinutes`, „po 4000 minutach”), the sentence under the rows, „szczelny: 12 z 12”/„{n} z 12”, the note on the stock, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, „Puść mimo to”, „ · najdłużej bez śmierci: {n} przejść z rzędu” with „1 przejście”, „3 przejścia”, „5 przejść” (`src/browser/view/judging-lines.ts`, `src/browser/view/away-report.ts`). Held.
- Roles against the styleguide rule „The screen Mapy” (read whole): heading `text-strong`, solved `positive`, death `danger`, undecided `warning`, sentence `text-secondary`, badge `positive`, count `text`, note `warning`, sentence before the second click `warning` (`src/browser/maps-screen.css`, tokens only); the button of a judging and „Puść mimo to” plain shared buttons; loading state disabled with „Oceniam…” and `aria-busy` through `ReactButton`'s `waitingText`. Held; the cases read the real stylesheet.
- D-439/D-325: the button on a map not yet solved and at a character in an earning loop or manual map run, active (`tests/view/maps-screen.test.mjs:932`, `:970`). Held.
- D-409: the entry's `judge` runs `judgeAndRemember(store.get(), …)` inside `store.act`, whose `clock.flush()` precedes the body (`src/browser/view/state-store.ts`). D-170: the entry case asserts the pick and the program used last unchanged. D-407: the judging's screen state lives in `MapsView`. Held.
- D-243 first paragraph and the at-once start; D-326 sentence beside the button still acting. Held, apart from I-1.
- D-246 and D-241 for slice 13: record last on the line, plain text, read from the loop at each drawing, none at zero, none on a stopped line, none without a loop. Held.
- Coding guidelines: Hooks at the top level; the one `useEffect` (alive flag) has an empty list and reads no reactive value; the map change resets state during render, not in an effect; size rule passes; lint and format pass. The new files `judging-lines.ts` and `judging-result.tsx` are not rows of the table *Files of this kind* of `guidelines/coding-browser-module.md`, which its rule „Nowy ekran i moduły w DOM” allows. No reserved choice is taken.
- Tests: the expected values are written out in the cases (texts, rows, roles, declension table), not computed by the product; the changed cases of `tests/view/maps-screen.test.mjs`, `tests/view/uncaught-failure.test.mjs` and `tests/view/account-screen.test.mjs` give D-243 as their reason, and the uncaught-failure case's assertion was replaced by a stronger one („no Zatrzymaj”). No code made for a test's input was found. No invariant test changed in the range; `tests/view/uncaught-failure.test.mjs` holds the case of the invariant `uncaught-failure-game-state` that slice 11 changed (named here as a changed invariant test).
- No screenshot file among the commits of the range.

## Declined to judge

- The simulation slices 3–9 (`judging.ts`, `judging-record.ts`, the loop record counters, `saved-game.ts`): reviewed apart, outside this range.
- `tests/sim/saved-game.test.mjs` and the other files of earlier slices: not graded, per the handoff.
- Whether the browser paints „Oceniam…” before a long judging: jsdom proves the order only; the cycle's walk through the running game follows this review.

## Checks run

All in a detached worktree of `25d1494d` at `.runs/review-rv/wt`, after `npm ci` (exit 0).

| Command | Exit |
|---|---|
| `npm test -- tests/view/judging-lines.test.mjs` | 0 |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 |
| `npm test -- tests/view/away-report.test.mjs` | 0 |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 |
| `npm test -- tests/view/counted-name.test.mjs` | 0 |
| `npm test -- tests/view/shared-controls.test.mjs` | 0 |
| `npm test -- tests/view/screen-registry.test.mjs` | 0 |
| `npm test -- tests/view/state-store.test.mjs` | 0 |
| `npm test -- tests/view/camp-picture.test.mjs` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/view/zz-review-probe.test.mjs` (probe of I-1, removed afterwards) | 0 — showed the at-once start |
| `python -B <cycle worktree>/.the-way/elements/common/foundation_check.py --skip-test-citations` (run from the review worktree with the pinned the-way of the cycle's worktree, since the review worktree's submodule was not initialized) | 0, „0 errors” |
| the same without `--skip-test-citations` | 0, „0 errors” |
| `node tests/quality/eslint-size-rules.mjs` | 0, „0 functions and files over a threshold in 335 files” |
| `npx eslint` on the 6 changed source files and 6 changed test files | 0 |
| `npx prettier --check` on the 13 changed files | 0 |

Not run: the full `npm test` (the cycle's own run, per the handoff); a browser check of my own (the cycle's walk follows).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-439 (11814) and D-440 (11840) whole, the entries the changed code realizes; D-246 (8899) whole for slice 13; D-244/D-245 read in passing with D-243's range; D-327/D-328 in passing with D-325/D-326; D-407, D-409, D-170 and the first paragraph of D-241 to check the screen state, the act of the store, the pick and the loop record.
- `src/browser/view/state-store.ts` (act, take, halt) — to check D-409 and what a judging does after an uncaught failure.
- `src/browser/view/maps-entry.ts` and `createMapsScreen` in `src/browser/view/maps-screen.tsx` whole at head — `flushSync` order behind the focus fix and the at-once start.
- `tests/view/page-document.mjs` (head of file) — to write the probe as the testing rule „Tests on a document imitation” asks.

## Working copies

- `.runs/review-rv/wt` (detached worktree of `25d1494d`, with `node_modules` and the probe file) — removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rv/` (logs of the runs, `npm ci` log) — removed; `ls .runs` afterwards shows `local-start`, `quality-venv`, `task-cycles` only.
- Kept beside this report: `review-rv-probe.test.mjs.txt` (the probe) and `review-rv-probe-output.txt` (its run).
- No browser was opened and no screenshot taken.

## Unread material

- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`: read whole.
- Decisions the plan's *Read* names that I did not open whole: D-207, D-217, D-244 (read in part), D-44, D-287, D-18, D-326's neighbours, D-239, D-241 (first paragraph and verification start only); their bearing on this range came through the quotations in the tests and the task. `foundations/invariants.md` content-identifiers and browser-view-token-values, `foundations/part_map.md` browser-view: not opened; their tests were run and pass.
- `src/browser/sim/judging.ts`, `src/browser/sim/judging-record.ts`, `src/browser/view/trip-lines.ts`, `src/browser/view/now-lines.ts`, `src/browser/view/counted-name.ts`, `src/browser/sim/data/balance.ts`: not opened; used through their exports in the changed code and tests.
- `tests/view/account-screen.test.mjs` (≈350 KB): only its diff in the range.

## Searches not found or unclear

- `git submodule` of `.the-way` in the review worktree was not initialized, so `foundation_check.py` was run from the cycle worktree's `.the-way` (same pinned commit `19e5774a`).
- The grep of the test logs for `# pass`/`# fail` counts found no such lines (the runner's output format); the exit codes are the evidence.
