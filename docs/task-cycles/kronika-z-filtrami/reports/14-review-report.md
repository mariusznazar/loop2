PASS 1880393

# Review of the whole change — kronika-z-filtrami

- Range: `6f36c7ab998ceaf996afb617ca95881b3f007b2d..1880393a31b8080a8ab2543f423d6e42db4e55c1` (`git rev-parse HEAD` = `1880393a31b8…`, matches the handoff). 18 commits, 34 files, +3986 / −325.
- Pinned the-way: gitlink `294af7fde45323ac1851c014a03071a97fc38d96` = `git -C .the-way rev-parse HEAD`.
- Method: `.the-way/task-cycle/review/SKILL.md` with `whole_change.md`. No slice had a review of its own; every slice (foundation step, slices 1–7) is judged here, its executor's own-work check included.
- The worktree, its index and branch were not changed: `git status --short` is empty after every check. `npm run build` wrote `dist/`, StrykerJS wrote `.runs/stryker/` and `.stryker-tmp/`, all ignored by git.

## Findings

### Critical

none

### Important

none

### Minor (all within the task unless said otherwise)

1. **D-347 does not hold the projected entry word for word** — `foundations/decisions.md`, D-347 (the heading „How does an agent learn what went wrong in the running game?”). The task (*Decisions in play*, „Zadanie zapisuje w całości”) quotes two binding sentences; D-347 holds only the first. The second, „An exception in the game shows on the screen as a sentence that something broke and goes to the console.”, was left out because D-323 and D-253 already state it, and the approved *Rationale* lost „Today an exception stops the game without a word, for a person as for an agent.” (no longer true) and one risk. Why it matters: a human-approved projected text is altered without a question, and a later check of the definition's projected entries against the foundation finds the entry incomplete. The meaning the dropped sentence carries does stand in the foundation (D-323, D-253, named in D-347's *Rationale*), so nothing a reader acts on is lost. The request description must name the departure so the human accepts it at the merge, or the sentence goes back with a relation to D-323 and D-253. Comes from the foundation step (`6f36c7a..3ea46e8`, commit `36c7b3e`); its report says so itself.
2. **D-346 states „through the whole map run” with no word about a load, while the code starts every load at „Kronika”** — `foundations/decisions.md`, D-346; `src/browser/view/chronicle.ts:118` (`let tab: ChronicleTab = "chronicle"` in `createChronicle`). A reload in the middle of a map run (D-212: the map run goes on after a load) shows „Kronika” again, though „Teren” was picked. D-346 is written word for word from settlement row 14, which is silent on a load, and the reviewed spec (D2) reads the load as starting at „Kronika” and „Wszystko”. So code, spec and row agree, but a reader of D-346 alone can take a reset after a reload for a violation. The qualification would add a meaning the task did not settle (WAY-172), so it is a question for the human at the merge, not a fix the cycle makes alone. Comes from the foundation step (`36c7b3e`).
3. **The grown window of the list does not start anew at a send or „Restart” while the same filter stays picked** — `src/browser/view/right-area.tsx:104` (`useState(WINDOW_SIZE)` in `ChronicleList`, keyed only by the filter at `:174`). After a long map run grown to, say, 180 rows, the next map run draws up to 180 rows before its first scroll. Nothing breaks and the rows stay bounded, so the effect on the player is nil today; the slice-5 report names it and it is untested. A key that also changes with a send or „Restart” would close it.
4. **No test protects „a row already drawn is not drawn again” (spec D7)** — `src/browser/view/right-area.tsx:77` (`memo(Row)`) and `:109` (`useMemo` of the paragraph). Removing `memo` or the `useMemo` passes every test (slice-5 own-work check says so). The protection is the code alone; a render counter in `tests/view/right-area.test.mjs` would catch it. Low risk: the window already bounds what is drawn.
5. **The styleguide's `## Where in code` gains a screen file, and the new rule is written in unwrapped lines** — `guidelines/styleguide-browser-view.md:659` (`src/browser/view/right-area.tsx`) and `:626-631`. `.the-way/product-guidelines/styleguide/template.md:149-151` gives this section the token file, the directory of shared components and the page of every state only; no other rule of the file lists its screen there. The lines of the new rule run to several hundred characters where every other rule wraps near 80. Neither misleads a reader; both depart from the template and the file's form (WAY-170). Comes from slice 6 (`2ca73e1`).

## Findings outside the task (out of scope)

- The table of revealed tiles is cut at the right edge of the right area (`src/browser/styles.css:303`, `.screen-area.run-right` with `overflow-x: auto`, column width from before this change); screenshot `05`/`15`. Present at the base; the slice-5 report names it.
- `src/browser/view/end-question.tsx` has no row in *Files of this kind* of `guidelines/coding-browser-module.md`; it predates this change (slice-7 report). Under WAY-200 it waits for the next refresh of that table.
- StrykerJS survivor at `src/browser/sim/run.ts:549` (`picks: false` → `true` in the death branch of `minuteBeforePick`): an unchanged line of the base inside the range I gave the tool. Classified as behaviour not worth pinning here: `finishMinute` returns at once for an ended map run (`run.ts:700`), so the flag is not read after a death.

## Declined to judge

- Whether „dopisuje tury, dopóki starcie trwa” means the turns should appear minute by minute: the simulation resolves an encounter at once at `resolveMinute` (`src/browser/sim/run.ts:705-713`), as at the base; the reviewed spec D6 reads it as „adds the turns when they are resolved”, which falls inside the encounter. Changing it would be new simulation work the task does not ask for.
- Keyboard scrolling of the chronicle list (`ul.chronicle-list` is a scroll container with no focusable item): not a requirement of the task or of D-42's three criteria as I read them, and the D-88 manual check after the merge covers real browser focus.
- The tab and filter after a sign-in or a save conflict (the game view is rebuilt): same reading as finding 2, settled by spec D2; not judged separately.

## Coverage of the task

| Item | Met by | Evidence |
|---|---|---|
| To do 1 — chronicle with game minutes; empty at a send and at „Restart”, gone at „Zakończ”; no earning loop; page memory, kept through Siedziba; save shape and version 3 unchanged; after a load only the paragraph at the attack's minute | `chronicle.ts` (`createChronicle`, `record`), `game-view.ts` (`take`), no change to `saved-game.ts` or `types.ts` beyond `GameEvent` | `tests/view/chronicle.test.mjs` (send, Restart, Zakończ, loaded state with and without attack), `tests/view/chronicle-game.test.mjs` (Siedziba and back, Restart, Zakończ + send, load), `tests/sim/saved-game.test.mjs` pass; `startLoop` returns no events, `passLoops` hands on only `loopRunEnded`; screenshots 16, 17, 19, 21 |
| To do 2 — one discovery entry per minute with the whole band text without buttons, the written-rule sentence included | `discovery-band-text.ts`, `eventEntry` case `discovered` | chronicle test „first chill…” with the literal band text; screenshot 02 |
| To do 3 — action start in the rule row's words, no number or outcome; one wait entry at its start | `eventEntry` `activityStarted`, wait mark in `record` | chronicle tests „a wait gives one entry…”, „the start of an action…”, load-in-wait case |
| To do 4 — loss only above zero → zero, five causes, streak before, `danger`, also at death of cold/hunger, change + loss in the same minute, none at streak 0 | sim: `body.ts` `healthLoss`, `run.ts` `streakLossEvents`, `programs.ts` `withCopyProgram`/`switchProgram`; view: `STREAK_CAUSES` | `tests/sim/streak.test.mjs` (9 cases), `tests/sim/copy-actions.test.mjs`; chronicle test „an edit of the copy gives its entry and then the loss…”; Stryker: body.ts 6/6, programs.ts 27/27 killed |
| To do 5 — every change of the copy in `player-change`, the listed words, after the end with the end's minute; none for a saved program | `copyChangeTexts`, `actEntries`, the five acts in `game-view.ts`, hints from `rule-list.tsx` | `tests/view/chronicle-entries.test.mjs` (13), chronicle tests for save/saveAsNew/switch/discard/after death/saved program; `tests/view/rule-editor.test.mjs`, `tests/view/program-panel.test.mjs` hint cases |
| To do 6 — paragraph out of the world area, one entry at the attack's minute, last attack only | `world-area.tsx` (paragraph removed), `chronicle.ts` `paragraph`, `right-area.tsx` | `tests/view/world-area.test.mjs`, right-area paragraph cases; screenshots 18, 19 |
| To do 7 — kind „Świat”: „Ognisko wygasło”, death and completion in „Teraz”'s words, completion `positive` | `run.ts` `extinguishedEvents`, `now-lines.ts` `deathText`, `MAPS[…].completionText` | `tests/sim/campfire.test.mjs` (6 new cases), chronicle „Świat” case; screenshots 06, 12, 14 |
| To do 8 — tabs „Kronika”/„Teren” as D-276 tabs, „Kronika” at the start, rule panel takes the area, „✕” returns the picked tab, pick kept through Siedziba and „Restart” | `right-area.tsx`, `run-screen.tsx` | right-area and run-screen tests (both tabs through „✕”), chronicle-game tests; screenshots 08, 09, 16, 21 |
| To do 9 — filter row in the look of the pace buttons, one picked, „Wszystko” first; newest on top; minute column in `text-label`; Geist Mono on `panel`; colours by kind; „Nic tu jeszcze nie ma.” | `right-area.tsx`, `styles.css` `.chronicle*` | right-area tests; screenshots 02, 04, 20 |
| To do 10 — foundation entries | glossary `chronicle`, D-338 to D-347, D-04, D-122, D-147, D-311, D-185, D-272, D-19 | `foundation_check.py` 0 errors; see fidelity below and Minor 1–2 |
| To do 11 — styleguide | `guidelines/styleguide-browser-view.md` rule „The chronicle of a map run”, tab bullet | Minor 5 |
| To do 12 — coding tables | four rows in `guidelines/coding-browser-module.md`; `coding-simulation-module.md` unchanged (no new sim file) | `git diff --name-status` shows only `M` under `src/browser/sim/` |
| Acceptance criterion — real browser at 1× and 16× with screenshots | slice 5's check: 21 screenshots in `docs/task-cycles/kronika-z-filtrami/screenshots/` | I viewed 02 (1×, discovery, loss, wait), 09 (16×, change and loss in one minute, ✕ back to Kronika), 18 (16×, paragraph in the chronicle, none in the world area), 19 (after reload, paragraph alone); the report covers every state slice 5's plan lists. Attaching them to the request is still to be done by the cycle. |
| Questions carried to cycle 1–4 | spec D1, D2, D7; slices 1–5 | as above |

Settlement rows: 1 → D-339; 2 → D-340; 3 → D-341; 4 → D-342; 7 and 8 → D-343; 9 → D-344; 10 → D-345; 14 → D-346. Each binding part carries its row's words; code does what each says (finding 2 for the load).

Projected entries the task carries: `chronicle` (whole, *Not* gains the ` — "events"` the template asks); D-338 (approved sentence, *Rationale*, *Rejected* word for word); D-04 („for the scene and the chronicle…” word for word); D-347 (first sentence only — Minor 1); D-122 („and what it named enters the chronicle” and the *Rationale* sentence word for word; the made-untrue „keeps no record of them” removed); D-147 (both transitional sentences word for word as the task gives them); D-311 (both transitional sentences word for word, header sentence unchanged).

## Source fidelity

- Word for word against the task: the transitional texts of D-147 and D-311, the approved sentence of D-338, D-04's clause, D-122's clause — all match. Every literal of To do 2–9 (the five causes, the eight change sentences, the seven filter names, „Czeka — żadna reguła nie pasuje”, „Ognisko wygasło”, the death and completion words, „Nic tu jeszcze nie ma.”) stands in the code with those words; the tests state them by hand.
- Readings, not alterations, each written down by the reviewed spec D5: „edycja innego zapisanego programu…” read as any saved program, the copy's own included (D-342 says „an edit of a saved program … gives none”); „Cała kronika stoi w Geist Mono” read as the list and its empty sentence, the filter buttons keeping the shared button's font; group entries carrying verb and name; „… od głodu” read as „zdrowie spadło od głodu”.
- Not word for word: D-347 (Minor 1).
- Invented: nothing found. D-343 does not claim the filter is kept through „Restart” (the code keeps it, as spec D9 reads it); the foundation step declined to write that, rightly.

## Slices judged (no review of their own)

- **Foundation step** (`6f36c7a..3ea46e8`): entries as above; D-19, D-185, D-272 changes are true of the code. Own-work check (literals searched in the added lines) was the right weakest point and would catch a dropped word. Minor 1 and 2.
- **Slice 1** (`3ea46e8..734b2dd`): the loss is emitted from one definition of chill and starvation (`healthLoss` beside `lostHealth`), before the death, not in encounter minutes, and from `withCopyProgram`/`switchProgram` only above zero and before the end. The changed whole-list expectations in `copy-actions` and `discovery` name this task as their source. Own-work check (death ordering, mutation `&&`→`||`) fits; Stryker confirms all mutants of the changed lines of `body.ts` and `programs.ts` killed.
- **Slice 2** (`734b2dd..6392714`): `extinguishedEvents` pairs campfires by position, which `worldMinute` keeps (stated in its comment); events in all three world-step branches, none in a death minute. `world.ts` untouched (the plan's mismatch, harmless). Own-work check (mid-activity branch, broken and restored) fits. Stryker: no survivor on the new lines.
- **Slice 3** (`6392714..416c10d`): `chronicle.ts` and `chronicle-entries.ts` match spec D2–D8; the window reads only the rows it returns; the move search (longest increasing subsequence plus hint) never names a rule shifted only by another's move. Own-work check (a real run to death) fits.
- **Slice 4** (`416c10d..5ed6c6b`): recording sits in `take`, the body `store.apply` delegates to and `act` calls — every result still passes one place, with the state before it, before the screens draw; this meets spec D2's intent (the handoff's noted mismatch). Hints come from the three move sites only and never reach `editProgram`. The executor's unread styleguide is immaterial: the slice changed no look. The missing permanent game-view test is supplied by slice 5's `chronicle-game.test.mjs`.
- **Slice 5** (`5ed6c6b..2b74988`): the right area, the list window, the paragraph composed from `lastCombat`, the world area without it. The extra files (`subscribe` in `chronicle.ts`, its test, `scene.test.mjs` call sites) are needed for `useSyncExternalStore`. The entries it did not read whole — I compared the code with D-39, D-40, D-43, D-46, D-130, D-276, D-283, D-311, D-343, D-344, D-346 and the invariants it reaches and found no departure. The subscription test was not seen failing, but it asserts the call count and the stop, so it fails if `notify` breaks. Minor 3 and 4.
- **Slice 6** (`2b74988..2ca73e1`): roles and fonts in the rule agree with `styles.css` and the decisions; the second place of a tab is recorded. Its named check (`test_browser_view_token_values.py`) reads code, not the guideline, as its executor says. Minor 5.
- **Slice 7** (`2ca73e1..1880393`): four rows, path order, `copy` like their nearest likes; sim table unchanged correctly.

## Checks run

| Check | Command | Exit |
|---|---|---|
| head | `git rev-parse HEAD` | 0 (`1880393a31b8…`) |
| pin | `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 (both `294af7f…`) |
| build | `npm run build` | 0 |
| new and changed Node tests, each | `node --test <file>` for `tests/sim/streak`, `campfire`, `copy-actions`, `body`, `discovery`; `tests/view/chronicle`, `chronicle-entries`, `right-area`, `chronicle-game`, `run-screen`, `world-area`, `program-panel`, `rule-editor`, `discovery-band`, `now-lines`, `scene` (`.test.mjs`) | 0 each |
| neighbouring Node tests, each | `node --test <file>` for `tests/sim/saved-game` (27), `death` (26), `encounters` (29), `completion` (19), `world` (12), `acceptance` (5), `catch-up` (28), `loop` (36), `program-list` (26), `trip` (29); `tests/view/end-question` (17), `account-screen` (128), `tile-list` (15), `combat-line` (2), `react-controls` (55), `uncaught-failure` (14) | 0 each, 0 failed |
| typecheck | `npm run typecheck` | 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| quality (ESLint, Prettier) | `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 OK) |
| invariants | `npm test -- tests/invariants/<file>` for `test_simulation_isolation.py`, `test_simulation_inputs.py`, `test_content_identifiers.py`, `test_browser_view_token_values.py`, `test_browser_view_framework.py`, `test_browser_view_focus_outline.py`, `test_streak_program_change.py`, `test_minute_span_split.py`, `test_saved_program_edit.py`, `test_map_run_repeatability.py` | 0 each |
| mutation (testing.md, reviewer's run on changed simulation lines) | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/body.ts:100-107,src/browser/sim/programs.ts:582-603,src/browser/sim/programs.ts:760-770,src/browser/sim/run.ts:473-502,src/browser/sim/run.ts:521-527,src/browser/sim/run.ts:545-575"` | 0; 82 mutants, 81 killed, 1 survived (`run.ts:549`, unchanged line, classified above) |
| screenshots | image reader on screenshots 02, 09, 18, 19 | as in Coverage |
| manual reading | the whole diff, the four new view modules whole, the sim diff, the foundation diff, the changed existing tests for named sources and kept assertions | — |

Not run: the full gate `npm test` with no file (the orchestrator's, as the handoff gives); `tests/invariants/test_save_version.py` does not exist — `save-version` is held by `tests/sim/saved-game.test.mjs` (testing.md, Trust boundaries), which passed; the browser check was not repeated (no finding needed it); the instruction-file checker was not run (no instruction file changed).

## Selection and reaches

Parts touched: browser-view, simulation, product-foundation, agent-workflow (`guidelines/**`). Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`; `foundations/part_map.md` whole. Foundation entries read whole: every entry the change writes or changes (from the diff, read with its unchanged context: glossary `chronicle`, D-04, D-19 binding part and example, D-122, D-147, D-185, D-272 example, D-311, D-338 to D-347) and D-130, D-173, D-255, D-276; invariants `simulation-isolation`, `simulation-inputs`, `content-identifiers`, `browser-view-token-values`, `minute-span-split`, `streak-program-change`, `saved-program-edit`, `copy-save`, `save-version`.

Reaches beyond that selection, each for the reason given:
- `.the-way/product-guidelines/coding/template.md:210-237` and `.the-way/product-guidelines/styleguide/template.md:140-170`, plus grep of `.the-way/product-guidelines/template.md` for `Where in code` — WAY-170 comparison of the changed guidelines.
- `src/browser/sim/game.ts:290-330, 495-545` (send, restart, end), `src/browser/sim/loop.ts` `startLoop` returns, `src/browser/view/clock.ts:80-125` — which results reach `take` and with which events.
- `src/browser/sim/programs.ts:662-704` (`saveCopyAsNewProgram`) — that the name after the act is the new program's.
- `src/browser/sim/understanding.ts:460-482` (`chillRuleGroupName`) — the discovery entry's written-rule sentence.
- `src/browser/sim/run.ts:690-775`, `src/browser/sim/types.ts:140-160`, `src/browser/view/combat-line.ts:67-77` — when `lastCombat` gains its turns.
- `src/browser/styles.css:303` and grep of `.tabs` — the right area's container.
- `stryker.config.json`, `.gitignore` — what the mutation run writes.

## Searches not found or unclear

- `tests/invariants/test_save_version.py` — not found; the invariant's test lives in `tests/sim/saved-game.test.mjs` per `guidelines/testing.md`.
- The decision selection by *Scope*: browser-view and simulation are named by most of the log; I did not read every such decision whole, only those listed above and the task's *Decisions in play* as the task quotes them (D-131, D-174, D-206, D-207, D-212, D-283, D-312, D-316, D-39, D-46 not read whole in the log). A departure from one of those not reached by the code paths I read would be unchecked.
- Whether the human expects the tab pick to survive a reload (finding 2) — the task, spec and D-346 do not say.
- Whether „dopisuje tury, dopóki starcie trwa” expects turns minute by minute — unclear; declined above.
