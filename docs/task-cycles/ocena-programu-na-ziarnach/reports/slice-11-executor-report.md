# Slice 11 — executor report — „Puść w pętlę” judges the program anew first

**Status:** done

## Commits

- `0095c910` — `feat: :sparkles: make „Puść w pętlę” … judge the program of the list anew first …` (one commit, on the base `47111517`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/view/maps-screen.tsx` | 156 | 46 |
| `src/browser/view/judging-lines.ts` | 35 | 4 |
| `src/browser/view/maps-entry.ts` | 3 | 1 (a comment) |
| `src/browser/maps-screen.css` | 18 | 1 |
| `tests/view/maps-screen.test.mjs` | 467 | 7 |
| `tests/view/judging-lines.test.mjs` | 79 | 1 |
| `tests/view/uncaught-failure.test.mjs` | 15 | 3 |

`src/browser/view/judging-result.tsx` and `src/browser/kitchen-sink/` were not touched (nothing in them had to change).

## What was made

- `judging-lines.ts`: `LOOP_ANYWAY_TEXT` („Puść mimo to”), `solvedSeeds`, `unsolvedSentence` („Na {k} z 12 ziaren program mapy nie rozwiązuje.”, k = seeds not solved), `sameLines` (each of the twelve seeds with the same kind and the same row text, i.e. cause and minute; the equipment of a judging is not compared, the screen shows none of it). `judgingHeading` now uses `solvedSeeds`.
- `maps-screen.tsx`: the click of „Puść w pętlę” at a character goes through the judging path of slice 10 (`judging.start("loop", …)`): the button is drawn inactive with its own text, one frame is given, then `controls.judge` (the store's act) runs and the screen decides. All twelve solved, or the same twelve rows as the result standing under that character for that program and map: `controls.startLoop` at once, focus owed to „Zatrzymaj” as before. Otherwise the new result replaces the standing one under the character and carries `asking: true`; the sentence stands above the button (inside `.maps-who-loop-start`, over a new inner row `.maps-who-loop-row` that keeps the button and the empty-list mark of D-326 side by side), the button reads „Puść mimo to” (its accessible name too: „Puść mimo to: {imię}, mapa {mapa}”), and its click is `judging.spend` + `controls.startLoop`, with no new judging. The `asking` flag lives on the shown result, so it goes with it: another program picked (`clear`), a new judging by the button of a judging (replaces the result with `asking: false`), the card left (existing reset on a change of map). A change of the chest or a draw alone leaves it.
- `maps-screen.css`: `.maps-who-loop-start` is now a column (sentence over row); `.maps-who-loop-row` takes the old row layout; `.maps-who-loop-unsolved` is `var(--warning)`. Tokens only.
- `maps-entry.ts`: comment only; the entry's `judge` and `startLoop` already did what the screen needs.

## Choices (with the way rejected and the cost if wrong)

1. **Second click** (the orchestrator's answer, as the handoff names it): it starts the earning loop as any start (`controls.startLoop` = the store's `startLoop`, which reads the clock first and takes the chest at that moment) and does not judge again; picking another program or a new judging removes the wait; a change of the chest alone does not. Done as given.
2. **The wait is a flag on the shown result** (`asking`), not a separate state. Rejected: a separate per-character set to be cleared at each of the three events — three places to forget; one flag cannot outlive its result. Cost if wrong: none seen.
3. **The „Puść w pętlę” button is inactive while its judging counts** (text kept, as the handoff says), so a second click cannot start a second judging in the frame before the page judges. Rejected: leaving it active (two judgings queued, two starts). Focus is given back after the wait where the button had it (`target: "loop"`), as slice 10 does for the judge button. Cost if wrong: the button looks inactive for a moment.
4. **The button of a judging is not touched by the wait of „Puść w pętlę”** (it keeps „Oceń na 12 ziarnach”, active), and the other way round; each button waits only for its own click. If both are clicked within the frame, the two judgings run one after the other. Rejected: locking both — the task says the judge button is inactive „od kliknięcia do wyniku” of its own click only.
5. **Result at an at-once start**: where the judging solves all twelve seeds and no equal result stood, no result is shown, and a different failing result that stood is removed (it would speak of a judging the loop no longer rests on); where the new result equals the standing one, the standing one stays (D-243: it stands until the player leaves the card). The task and D-243 do not say what stands under the character after an at-once start with a different standing result; this is my choice. Cost if wrong: a stale result would stand, or one result more would be drawn.
6. **„Same result” = the shown rows** (`seedLines` kind and text), as the handoff says; the result standing is captured at the click (`shown` of the row, which exists only for the program the list shows now on this map).
7. **The standing result of another character is no standing result** (tested).

## Checks (command → exit code)

- `npm test -- tests/view/judging-lines.test.mjs` — failing run first, with stubs of the four new exports returning wrong values: exit 1 (4 cases failed on their assertions); after the code: exit 0 (12 cases).
- `npm test -- tests/view/maps-screen.test.mjs` — failing run first (new and followed cases written, code as slice 10 left it): exit 1, 7 cases failed on assertions (the awaited judging did not come, the button was not inactive, the entry made no judging); after the code: exit 0 (39 cases).
- `npm test -- tests/view/uncaught-failure.test.mjs` — exit 0 (19 cases), also after the change of the case.
- `npm test -- tests/view/state-store.test.mjs` — exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0.
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 0 (no new test file, no `stryker.config.json` entry needed).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — 3 errors, all in `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975` (the D-243 quotations that are slice 12's); my files show no error.
- `npx prettier --check` on the changed files: pass. `npx eslint` on the changed files: no output (pass). `node tests/quality/eslint-size-rules.mjs`: `0 functions and files over a threshold in 335 files`. `tsc -p tsconfig.browser.json --noEmit`: no output (pass).
- Not run: the full gate (`npm test` with no argument), by the handoff.

The test of the invariant `uncaught-failure-game-state` (the screen-Mapy case) was changed, not created. I broke `if (halted || …)` in `state-store.ts` take for a moment: three cases of `tests/view/uncaught-failure.test.mjs`, that one among them, failed; I restored the file (the diff of `state-store.ts` is empty) before the commit.

Mutation done by hand on the focus code (`if (hadFocus && !starting) focus.owe(...)` made dead): the two focus cases failed; restored.

## Cases changed for the new behaviour, and why

The reason of each is the change of D-243 (the click judges first and starts the loop only after it, or at the second click):

- `tests/view/maps-screen.test.mjs`: „„Wejdź” is the main button at each map, „Puść w pętlę” the plain one …” (waits for the judging, then expects `judge` and `startLoop` in that order); „an empty list „Wynieś” puts „Pętla nic nie zarobi do skrzynki” beside „Puść w pętlę”, which still acts” (same; the sentence of D-326 stands beside the button in its new inner row, which the case already asserted through the shared parent); „after „Puść w pętlę” the focus goes to that character's „Zatrzymaj” …” (judge reaction added, waits for „Zatrzymaj”). Nothing else of those cases changed; each got a comment line with the reason. Their `decision: D-243` quotations stand as slice 10 left them (they pass the foundation check).
- `tests/view/uncaught-failure.test.mjs`, the case „after an error nothing handled, the buttons of the screen Mapy change no state, start no save and open no map run”: the click now only draws the waiting state, so the case ticks the mocked timers, expects the second click (`precondition` assertion: the new game's program does not solve all twelve seeds of Las), presses „Puść mimo to” and ticks again, then asserts as before no save, no map run, and, in place of „button „Puść w pętlę” still stands”, no „Zatrzymaj” (no earning loop started). The old assertion (the button „Puść w pętlę” still stands) could not tell a loop that did not start from a button whose text had changed, so it was replaced by one that checks the thing the case is for.

## New cases

`tests/view/judging-lines.test.mjs`: `solvedSeeds`; `LOOP_ANYWAY_TEXT` and `unsolvedSentence` (1, 2, 12 unsolved); `sameLines` (same, a minute apart, other cause, the same rows at other seeds, other length); equipment not compared.

`tests/view/maps-screen.test.mjs` (new section „„Puść w pętlę” judges first”):
1. the click keeps the text and goes inactive, the page is asked after the draw, all twelve solved starts the loop at once, no sentence, no result, another character's button untouched;
2. a seed unsolved: result under that character only, sentence in `warning` above the button, „Puść mimo to” (label too), D-326 mark beside the button, second click starts with the program and judges no more, after stop the button is „Puść w pętlę” again and the result stands;
3. the wait goes with another program picked (and does not come back when picked back), with a new judging, with leaving the card; stays with a change of the chest and of the time;
4. Q14: a standing result at another character does not count; the same twelve rows start at once and the result stays; a different result replaces and waits; a failing standing result replaced by one that solves all twelve starts at once and the result goes;
5. focus stays on the button through the wait and comes back as „Puść mimo to”; a focus elsewhere is not taken;
6. a screen taken down while the loop button waits asks the page for nothing;
7. the stylesheet gives the sentence `var(--warning)` and the button the look of the plain one;
8. the entry: one act of the store at the first click (judges and remembers, starts nothing), the second click is the store's `startLoop` and no act.

## Own-work check (section 3)

- **The requirement my work most likely misses:** task Q14 / To do 5 — „Puść w pętlę” on a standing failing result: same twelve rows start at once, different replaces and waits (the state machine across clicks), together with „the waiting second click goes with what makes the result go”.
- **The checks:** case 4 and case 3 above, each on jsdom with answers given by the test (independent expected rows, not computed by the code), and the same two paths in the real browser (below).
- **Result:** passed. Mutations considered by hand: ignoring `standing` (case 4 fails at the same-rows step), taking another character's result as standing (fails at the first step of case 4), no `spend` after the second click (fails at the „ORDINARY after stop” step), no `asking` reset at a pick or a new judging (case 3), no focus owe (the focus case, checked by really breaking it).
- **UI check (`ui_check.md`):** the states of the affected components were checked in code (the cases above: inactive with kept text, ask-for-second-click, after the second click, after stop; the plain look of both buttons) and in a screenshot of the running game (`npm run local`, Playwright CLI, one test account at `example.test`, a composed saved game with two characters and Las solved). I looked at the screenshot: the sentence in warning colour over „Puść mimo to” beside „Wejdź” and „Oceń na 12 ziarnach”, the result with its rows in danger under the character, the badge-less count „0 z 12” beside „Program:”. The screenshot is **not shown and not kept** (the orchestrator's handoff: push none, keep none); it was in my directory and is removed. The browser was closed (`playwright-cli close`), the local start stopped (`npm run local:stop`).

## Walk of the running product (`walkthrough.md`)

The change alters what a player sees and does (the click of „Puść w pętlę”), so the walk was made. Where: Windows 11, Playwright CLI browser, `https://127.0.0.1:62476` (a start of `npm run local` of this worktree), a composed game (two characters, Skraj lasu and Las solved, the default program), address `#/mapy/forest`.

| Case | By what | Verdict |
|---|---|---|
| First click on a program that does not solve all twelve: result under the character, sentence over the button, „Puść mimo to”, loop not started | the browser: snapshot of the page and screenshot | passed: „Na 12 z 12 ziaren program mapy nie rozwiązuje.” (the default program dies of cold on every seed, so k = 12), „Ocena na 12 ziarnach: 0 z 12 rozwiązanych” and twelve rows, the button focused, „Pętla nic nie zarobi do skrzynki” beside it, no „Zatrzymaj” |
| Second click starts the loop without a new judging | the browser | passed: „Pętla: Las · przejście 1 …”, „Zatrzymaj: Agent”, both of Agent's start buttons inactive, the result still under Agent |
| After „Zatrzymaj”, the button is „Puść w pętlę” again | the browser | passed |
| Q14: a result from „Oceń na 12 ziarnach” stands (Bob), then „Puść w pętlę” judges again the same twelve rows and starts at once, focus on „Zatrzymaj: Bob” | the browser | passed |
| No error of the game in the console | `playwright-cli console error`, filtered for `uncaught` and `saved-game-load` | passed: none |
| Side observation | — | The sentence stands in the column of the loop button, which sits as a third item beside „Wejdź” and „Oceń na 12 ziarnach” in the row of buttons; at this width it reads well. |

Not checked in the browser, and why: the second click removed by picking another program or leaving the card, a different result replacing the standing one, a change of the chest while the sentence stands — all three are covered by jsdom cases with answers given by the test, and the default game cannot be made to give a different result without composing a chest; the paint of the frame before the judging (jsdom proves the order of the draw and the call, not the paint — the same limit as slice 10).

## Reaches beyond the handoff

None needed. I read `foundations/decisions.md` D-325/D-329 only through the lines D-329 (9975-10003) to see where „the warning of seeds left unsolved above it (D-243)” stands, which the handoff named by range for D-243 but not D-329 (D-329 is in the Foundation entries rows the plan names). Also read the styleguide section „The screen Mapy” (lines 1-80 and 654-725) and `src/browser/view/controls/react-button.tsx`.

## Mismatch notes

- The handoff's *Checks* say „its new cases written first, failing”: done. No mismatch of the full gate (not run).
- The plan's slice names `src/browser/view/judging-result.tsx` among its files; nothing in it had to change (rows, heading and sentence are the same).

## Unread material

- `guidelines/styleguide-browser-view.md` was read in part: lines 1-80 (roles and the first rules) and 654-725 (the screen Mapy), plus the search for the other headings; the rules on stylesheets, tokens and focus I had in mind only by their headings and by the existing code and tests (the token-values invariant passes).
- `foundations/part_map.md:3-31`: read lines 3-31 (cut to 200 characters per line in the terminal output; the file list was whole).
- `.runs/task-cycles/.../task-frozen.md`: not opened; the passages came in the handoff.

## Searches not found or unclear

- Nothing is said, in the task, in D-243 or in the styleguide, about what stands under the character after an at-once start with a different standing result or with a fully solved result (my choice 5). Nothing is said about whether „Puść w pętlę” is inactive while its judging counts; the handoff says only that its text stays (choice 3).

## Working copies

- `.runs/executor-11/` (the directory for working copies: scripts, the failing-run outputs, backups of two files restored, the screenshot, the message of the commit, the log of `npm run local`) — removed before return.
- `.playwright-cli/` (made by Playwright CLI under the worktree root, ignored by git: the composed `state.json`, `send-state.js`, snapshots and console logs) — removed before return.
- The database of the local start under `.runs/local-start/` is a file the product's own tool made by itself; the tool removes it at its next start. It was left.

# Fix of review rv, finding I-1

**Status:** done. **Commit:** `f2d28489` (on `25d1494d`), `fix: :bug: make „Puść w pętlę” start the earning loop at once on the same twelve rows only where the result standing under the character came from the button „Oceń na 12 ziarnach” …`.

**Finding:** „Puść w pętlę” started the loop at once on the same rows where the result under the character was left by an earlier „Puść w pętlę” (after „Puść mimo to” and a stop); D-243 and the task allow that only for a result of the button of a judging.

**Fix (way a, as the orchestrator answered):** `ShownJudging` has a field `from: "judge" | "loop"`, the click that made the result. The row passes `standing` to the judging only when `shown.from === "judge"`. A result kept at an at-once start that equalled a standing result of the button stays as it was (`from: "judge"`); a result made by a first click of „Puść w pętlę” has `from: "loop"`; a new judging by the button replaces it with `from: "judge"`. Files changed: `src/browser/view/maps-screen.tsx` (+9 −2 lines: the field, the condition, two comments), `tests/view/maps-screen.test.mjs` (+38: one case). Nothing else touched; M-1..M-4 not touched.

**New case:** „a result left under the character by an earlier „Puść w pętlę” is no result of the button of a judging: the same rows wait for the second click again” — first click, „Puść mimo to”, „Zatrzymaj”, „Puść w pętlę” on the same rows: expects the calls `judge, startLoop, stop, judge` and „Puść mimo to” with the sentence, then the second click starts. Its `decision: D-243` quotations are the two already used in the slice, which the foundation check accepts.

**Red then green:**
- `npm test -- tests/view/maps-screen.test.mjs` before the code: exit 1, 40 passed, 1 failed, the new case: „expected [judge, startLoop, stop, judge], got [judge, startLoop, stop, judge, startLoop]” (the same path as the reviewer's probe).
- Same command after the code: exit 0, 41 passed.

**Checks after the fix (command → exit code):** `npm test -- tests/view/maps-screen.test.mjs` 0 · `npm test -- tests/view/judging-lines.test.mjs` 0 · `npm test -- tests/view/uncaught-failure.test.mjs` 0 · `npm test -- tests/view/account-screen.test.mjs` 0 · `npx eslint` on the two changed files 0 · `npx prettier --check` on them 0 · `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` 0 · `node tests/quality/eslint-size-rules.mjs`: 0 over threshold. Full gate not run.

**Reaches beyond the handoff:** none. **Working copy:** `.runs/executor-11/` removed. **Unread material** and **Searches not found or unclear** of the report above stand as they were; nothing new was left unread (the findings file and the probe were read whole).
