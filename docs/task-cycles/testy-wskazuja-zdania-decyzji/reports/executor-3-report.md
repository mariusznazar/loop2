# Executor 3 report — Slice 3, testing-guideline decisions

**Status:** done with concerns (the concerns are judgment calls named under "Choices" and two facts under "Problems as observed"; nothing is left undone)

## Commits and files

Base `21948edfdce67635b6ea24d878ed9772468b5439`, branch `task/testy-wskazuja-zdania-decyzji`, author address `mariusznn@gmail.com` (checked with `git log`).

- `2ea299c4` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the harness of a document imitation and its memory limit with lines decision:
  - `tests/view/page-document.test.mjs` +18 −0
  - `tests/view/memory-limit.test.mjs` +4 −0
- `7ee18d26` docs: :memo: name the tests of D-264 and D-268, and add a pair of examples for D-73, D-74, D-75, D-76, D-78, D-81, D-84, D-85, D-87, D-88, D-89, D-264 and D-268 only for the part no invariant and no test holds
  - `foundations/decisions.md` +63 −24 (the message says "add" for D-264 and D-268; their pairs were rewritten, not added)

No file outside the slice's *Change* was touched.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after the edits, before and after the commits) | 0 | `0 errors`; 11 decisions listed `held by nothing`: D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220 — none of this slice |
| the same check on the base `21948edf` in a temporary worktree | 0 | 22 listed `held by nothing`: the 11 above plus D-73, D-74, D-75, D-76, D-78, D-81, D-84, D-85, D-87, D-88, D-89 |
| `npm test -- tests/view/page-document.test.mjs` | 0 | tests 59, pass 59, fail 0, skipped 0 |
| `npm test -- tests/view/memory-limit.test.mjs` | 0 | tests 37, pass 37, fail 0, skipped 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/page-document.test.mjs` | 0 | all files use Prettier code style |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/memory-limit.test.mjs` | 0 | all files use Prettier code style |
| `git diff -U0 21948edf -- foundations/decisions.md`, read | — | 13 hunks, at log lines 1588, 1603, 1618, 1633, 1663, 1693, 1738, 1753, 1781, 1796, 1811 (the *Verification* line of D-73, D-74, D-75, D-76, D-78, D-81, D-84, D-85, D-87, D-88, D-89 each), 5988 (D-264 *Verification*) and 6154 (D-268 *Verification*); no other line changed |

Not run: the full gate `npm test` without a file — the cycle's run, not a slice's (handoff). The two known failures at the base (`test_ruff_source_rules`, `test_shellcheck_source_rules`) lie in a file this slice did not touch and were not run.

## Own-work check

- Requirement most likely not met: every quotation in a line `decision:` stands in the binding sentences of its decision (a quotation that does not stand would be a link that leads nowhere).
- Check: an exploratory break — `carries those files"` changed to `carries these files"` in the D-264 line of `tests/view/memory-limit.test.mjs`, then `python -B .the-way/elements/common/foundation_check.py`.
- Showed: exit 1, `tests/view/memory-limit.test.mjs:135: the quotation stands in no binding sentence of D-264`. The file restored from a copy; the check rerun: exit 0, `0 errors`. So the 22 lines are each checked by the script, and all stand.
- Second requirement at risk: a test elsewhere holding a sentence of these 14 decisions. Searched by content (see "Searches"); none found beyond the two files.

## Table of the decisions

Line numbers are those of `HEAD` `7ee18d26`.

| Decision | Held by tests in whole | Held by tests in part (test, `path:line`, case) | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|---|
| D-73 | none | none | none | both sentences | pair added |
| D-74 | none | none | none | both sentences | pair added |
| D-75 | none | none | none | both sentences | pair added |
| D-76 | none | none | none | all three sentences | pair added |
| D-78 | none | none | none | both sentences | pair added |
| D-81 | none | none | none | both sentences | pair added |
| D-82 | none | none | none | both sentences | unchanged (it had a pair; held by nothing, so the pair stays as it is) |
| D-84 | none | none | none | all three sentences | pair added |
| D-85 | none | none | none | all three sentences | pair added |
| D-87 | none | none | none | both sentences | pair added |
| D-88 | none | none | none | both sentences | pair added |
| D-89 | none | none | none | the sentence | pair added |
| D-264 | none | Sentence 2 ("One harness, …"): its first clause, one harness carrying the files — `tests/view/memory-limit.test.mjs:133` "the tree holds no file that goes round the harness of a document imitation"; a fresh window for each case — `tests/view/page-document.test.mjs:255` "no case's page reaches another's: its listeners, its content and its window stay behind", `:276` "the globals the product reads are the case's page, a shown one, until the case ends"; focus moved away from a control that becomes disabled — `:319` "a focused control disabled ${name} leaves the focus on the body" (three variants), `:338` "a focused field React disables leaves the focus on the body, and takes it back once enabled", `:355` "focus stays where it is when another control becomes disabled, and when a control is disabled and enabled in one step"; React's work awaited through `act` — `:484` "an answer that comes before settle draws on the page, and React has no update outside act to report"; typing through the native value setter and a bubbling `input` event — `:388` "typing reaches a controlled field's change, so it stands in the field and in what the field drives", `:401` "typing reaches a listener of a field outside React, by a bubbling input event"; a case failed on a report of React's development build through `console.error` — `:501` "a mount outside act fails its case in a short error, the one report the trial met", `:561` "${name}, reported by React's development build, fails its case in a short error" (three variants). Sentence 3 ("A test file of such a screen …"): `press` clicking inside `act` — `:424` "a press clicks the control inside act, so what its handler changed stands when the press returns"; `fire` sending the event as a browser does — `:447` "fire sends a bubbling event of the window of its target, a pointerout as a mouse event with the fields given" | none (the field names none; `document-test-memory-limit` derives from D-268) | Sentence 1 whole (jsdom, pinned exactly, only the test files of screens in React leave their stand-ins); in sentence 2 "it is imported before React loads"; in sentence 3 that a test file of a screen in React clicks through `press`, sends events through `fire` inside `act` where React must answer, and keeps no copy of either | pair rewritten, clause `tests:` added |
| D-268 | none | Sentence 1 ("A test file under `tests/` …"): the harness's `assert` building no message of Node's and putting no value on its error — `tests/view/page-document.test.mjs:140` "${name} throws a plain short error with the case's words and no value on it" (14 variants), `:184` "a failing equal on two rendered elements ends in a short error that names each by its tag and class", `:203` "a failing comparison on rendered elements names its case to the runner, in a short report", `:224` "deepEqual refuses a rendered element ${name}" (6 variants), `:244` "deepEqual refuses ${name}, which its walk does not enter and the comparison behind it would" (3 variants); the limit the harness starts, read by a worker thread, writing its sentence to standard error, killing only above the limit — `:107` "a file that imports the harness is killed above 2 GiB, by the limit the harness started, and says why", `tests/view/memory-limit.test.mjs:94` "a child growing on a stuck main thread is killed before its own stop and says why on standard error", `:109` "a killed child reads as a failed run with its sentence through ${route}" (two routes), `:121` "a child under its limit ends well and nothing kills it" | `document-test-memory-limit`: only the harness loads jsdom or happy-dom under `tests/`; a test file importing the harness imports no assertion module of Node; above 2 GiB read every 100 ms as `rss`, the process is killed and the run fails with a sentence | In sentence 1 a file under `tests/` that is no test file importing the harness (a helper) taking `node:assert`; sentence 2 whole (a file outside `tests/` starting the limit first); sentence 3 whole (the reopening at forty files or at a run-away test on no imitation) | pair rewritten, clause `tests:` added |

Per R1, the cases of `document-test-memory-limit` in `tests/view/memory-limit.test.mjs` that check only what the invariant states — the guard reading the tree and its controls (`:133` aside, which holds a sentence of D-264, not of D-268) — got no line for D-268.

## Pairs added or rewritten (for the human to accept at the merge)

**D-73 (added)**
- complies: a new testing rule for loop2 written into `guidelines/testing.md` in the form of the pinned template; the wording of `guidelines/testing.md` brought to the template of the-way once its pin moves, with only the departures of this decision kept
- violates: a rule of the template left out of `guidelines/testing.md`, or a test that departs from it, with no decision of a departure behind it; a testing rule for loop2 kept only in a comment or a file other than `guidelines/testing.md`; the agent instructions no longer sending an agent to `guidelines/testing.md` before it writes or changes a test

**D-74 (added)**
- complies: a test on generated inputs added by a task that names the game rule and the risk from combinations of inputs that a few readable examples do not protect, the task choosing the tool and settling its upkeep
- violates: a property-test library or a test on generated inputs added by a change whose task names no game rule or no such risk; a test on generated inputs added where a few readable examples protect the rule

**D-75 (added)**
- complies: a changed player journey checked by hand in a browser, with no permanent test of the whole journey; a task that, after a critical-journey defect escaped smaller tests, chooses the tool and the scope of automating journeys
- violates: a permanent test of a complete player journey in a real browser added with no defect that escaped smaller tests and no significant cost of manual checks behind it; a change of a player journey merged with no manual check of that journey

**D-76 (added)**
- complies: the first change of the principle of the font files or of the preview server — another kind of file, another way in, another recipient — bringing the boundary's refusal test and moving its invariant to the method test; a change of how the kitchen-sink page is built that adds no refusal test and whose review checks that the preview server serves only its own directory and only on the developer's machine
- violates: a change of a boundary's principle merged with no refusal test of that boundary, or with its invariant still checked by review; a new font file whose review does not check it against the release of the Geist font repository; a change that lets the preview server serve outside its own directory or to another machine, passed by its review

**D-78 (added)**
- complies: a new case named by the behaviour and the condition it checks, with its preparation, action and assertion apart, protecting one behaviour, possibly through a table of explicitly named variants of it; an expected value written out in the case
- violates: a new case that checks unrelated behaviours in one scenario, or walks a table of variants that carry no names; a case whose expected value repeats the product's algorithm in the test or was copied from what the code returned

**D-81 (added)**
- complies: a test in `tests/view/` that starts child processes counted as an integration test; a test that starts the built application in a container and checks only that it answers, counted as a smoke test
- violates: a test that reads files of test data, uses the network or starts a process counted as a unit test because it stands in `tests/sim/` or `tests/view/`; a smoke test presented as proof of a complete game journey; a fourth level of tests added to `guidelines/testing.md`

**D-84 (added)**
- complies: a new simulation test that writes out the state, the elapsed time and the seed and runs the game's own random generator; a new test of an HTTP failure on a real local server that waits for its listening with a time limit and closes the server even after a failure; a change of the HTTP helper of `tests/http.test.mjs` that limits its waits and cleans up after a failure
- violates: a simulation test that waits for game minutes on the computer's clock or replaces the game's random generator; a test of a file or HTTP failure on a substitute presented as proof of the replaced operation; a test that sleeps a fixed span as proof of readiness, or leaves a file, server or process behind after a failure; a change of the HTTP helper that keeps a wait with no time limit

**D-85 (added)**
- complies: `guidelines/testing.md` naming the three cases of this decision as the exemplars of their levels, each with its limits; a new unit test that follows the backpack case in its explicit data and independent arithmetic, not in its handling of time
- violates: `guidelines/testing.md` naming another case, the whole file of an exemplar or its helpers as the exemplar of a level; one of the three cases renamed or removed while the guidelines still name it as an exemplar

**D-87 (added)**
- complies: a changed appearance inspected by a person in a browser, the checks of agreed appearance rules kept; the check of the content of external icons kept as it is
- violates: a pixel-by-pixel comparison of a whole screen against a reference image added with no concrete visual defect and no agreed requirement of an exact layout; a check of an agreed appearance rule or of the safety of external icons or fonts removed on the ground that the look is inspected in a browser

**D-88 (added)**
- complies: a change of a click, a key or the focus of a screen checked by hand in a browser, its test on jsdom proving only the logic it runs; a test of a trust boundary kept whatever this exclusion leaves to a person
- violates: a test on a hand-made document model or on jsdom presented as proof of a real event, of focus or of the drawing of SVG; an automated test of real browser events, focus or SVG added with no defect that such a test missed and apart from the automation of the player journeys of D-75; a refusal test of a trust boundary left out on the ground of this exclusion

**D-89 (added)**
- complies: a change of a player journey whose author and reviewer check whether a critical-journey defect escaped smaller tests or the manual checks grew costly; a change of the focus of a screen whose author and reviewer check whether a test on jsdom missed a defect of a real event or of focus
- violates: a change of the look of a screen whose author and reviewer do not check whether a concrete visual defect or an agreed requirement of an exact layout now calls for image comparison; a change of a player journey merged with no check of whether a defect of that journey escaped smaller tests

**D-264 (rewritten; the clause `tests:` is new)**
- tests: no file under `tests/` but the harness loading jsdom or happy-dom; each case on a window of its own, which the product reads as its globals and which no other case reaches; the focus leaving a focused control that becomes disabled, by its property, its attribute, its fieldset or React, and staying where it is otherwise; React's work awaited through `act`; typing through the input's native value setter and a bubbling `input` event, which reaches a controlled field's change and a listener outside React; a case failed on a report of React's development build through `console.error`; the harness's `press` clicking inside `act`, and its `fire` sending a bubbling event of its target's window, a `pointerout` as a mouse event.
- complies: a case of a screen in React whose file imports the harness before React and clicks a button with the harness's `press`, and sends an event React answers through `fire` inside `act`; a test of a screen not built with React keeping its own stand-in for the document; jsdom kept at one exact version in `package.json`
- violates: a hand-made document model grown until React runs on it; a test file of a screen in React that imports the harness after React, or defines a copy of the harness's `press` or `fire`; jsdom declared with a range of versions; a test of a screen not built with React made to give up its stand-in for jsdom
- Gone from the old pair, now held by tests: "a second harness for the next screen" (the guard of the tree), "a test that passes while React's development build reports a changed order of hooks" (`page-document.test.mjs:561`); "walks the page, screens still in DOM included" left out, being the rationale's words, not the sentences'.

**D-268 (rewritten; the clause `tests:` is new)**
- tests: the harness's `assert` failing with a short plain error that carries no value, also on a rendered element and in the report of the runner; the limit the harness starts read by a thread that kills a process whose main thread is stuck, with its sentence on standard error, and that leaves a process under the limit alone.
- complies: a throwaway file outside `tests/` that imports `tests/view/memory-limit.mjs` first and starts the limit before it loads jsdom; how the limit is held taken up again once a forty-first test file on a document imitation comes
- violates: a helper under `tests/` that works on jsdom's elements and takes `assert` from `node:assert` without importing the harness; a file outside `tests/` that loads jsdom with no limit, or starts the limit after it has loaded jsdom; a forty-first test file on a document imitation, or a test on none whose memory runs away, met with the limit left held as it is and how it is held not reopened
- Gone from the old pair, now held by a test: "a failing comparison on a DOM element that ends in a short message naming its case" (`page-document.test.mjs:203`).

## Choices, with the way rejected

1. **Where a line stands in these two files.** The plan says "directly above" the case "in the comment form the file uses for its lines `invariant:`"; both files put `// invariant:` as the first line inside the case's body. I put each `// decision:` there too, after any `// invariant:` line, as slice 2 did in its Python files. Rejected: a line above `test(` — it would split a case's two citations into two places. Cost if wrong: 22 lines move; the check reads either place.
2. **A test of another behaviour that runs on the harness does not hold the harness's sentences.** Every test of a screen on jsdom would fail if the harness stopped giving a fresh window or moving focus, but its subject is the screen; lines go only to the harness's own cases. Rejected: lines at every test on jsdom — some hundreds of lines that say nothing a reader of D-264 can use. Cost if wrong: D-264's held part would be the same; only more lines.
3. **The guard of the tree (`memory-limit.test.mjs:133`) carries a D-264 line.** It is a test of `document-test-memory-limit`, an invariant of D-268; R1 keeps D-268 lines off it, but no invariant derives from D-264, so the part "One harness … carries those files" it holds gets a line. Only that case: its controls (the crafted refusals) fail when the guard breaks, not when a second harness appears.
4. **Long quotations.** A test that holds the end of a long sentence quotes from the sentence's start to the end of the held clause (D-264 sentence 2, D-268 sentence 1), as the template requires; the clause `tests:` names the part each holds.
5. **Not held, after reading.** `tests/view/page-document.test.mjs` "an error thrown in a listener, which jsdom reports through console.error, fails its case" and "a report that passes a rendered element fails its case with no word of that element" — the reports are jsdom's or a product line's, not React's development build's, which is what D-264 names. "a press of something that does not stand…", "an Error given as the message…", "a line the product writes itself…", "the line of the page's last-resort handling…", "a case that throws ends in its own error…" and the ten `passes` cases — no sentence of D-264 or D-268 speaks of them.
6. **D-82 and `tests/agent_workflow/test_tracked_file_private_paths.py`.** That test fails on an absolute path on a disk in any tracked file, so a test comment naming a task document by its absolute path would fail it. I judged it does not hold D-82: a comment naming the task document by its title or by a path under `.runs/task-cycles/` — the forms D-82 forbids — passes it, and what it refuses is the form of a path, for privacy (D-362). No line added there. Cost if wrong: D-82 would carry a clause `tests:` for a narrow slice and keep its pair.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` — named by the method's row for a slice; read whole.
- `.the-way/elements/common/foundation_check.py:140-180, 698-712` — to see how a line `decision:` and a pair are read (whether an indented `- complies:` counts); searched by word.
- `tests/view/page-document.mjs`, `tests/view/memory-limit.mjs`, `tests/view/memory-limit-child.mjs` — whole, to judge what the harness's cases hold.
- `tests/view/screen-registry.test.mjs:120-175` — the form of existing JavaScript lines `decision:`.
- `tests/view/end-window.test.mjs:640-665` — a local `press` found by search (see below).
- `tests/agent_workflow/test_tracked_file_private_paths.py` whole, `tests/invariants/test_simulation_randomness.py:1-30`, `foundations/invariants.md` entries `tracked-file-private-paths` and `tracked-file-private-names` — candidates for D-82 and D-84.
- `git diff 394ca859..HEAD` of the earlier slices, as the handoff asks.
- The whole of `task-frozen.md` was read, not only lines 30-42 and 99-104.

## Working copies

- `.runs/executor-3/` under the worktree: the insertion script `add_lines.py`, the outputs `check.txt`, `check2.txt`, `test-page-document.txt`, `test-memory-limit.txt`, and for one moment a copy of `tests/view/memory-limit.test.mjs` for the exploratory break (removed at once). Removed before return.
- `.runs/executor-3/base`, a detached worktree of `21948edf` with its `.the-way` submodule at `ec7929d0`, to run the check on the base. Removed with `git worktree remove --force`, then `git worktree prune`; `git worktree list` no longer shows it.
- Nothing kept in `reports/` beyond this report; the results it needs are in the table of checks.

## Problems as observed

- **Count at the base.** The handoff gives 23 decisions `held by nothing` at the base; the check run on `21948edf` lists 22 (the list is in the table of checks). The cause is not verified; a guess: the 23 was counted on an earlier commit of the branch.
- **R3 remarks — wording against the code.** None of the 14 decisions reads wrong against the code as far as I checked: jsdom stands at `30.1.3` exactly in `package.json`; no test file defines a copy of the harness's `press` or `fire`. `tests/view/end-window.test.mjs:651` defines a local `press(target, key)` that sends a `keydown`, not a click — not a copy of the harness's `press`, but a function of the same name in a test file of a screen in React; a reader may take it for one.
- **R3 remarks — a decision that says more than its tests.** D-268's sentence 2 rests on a written rule alone (its *Rationale* says so); D-264's "it is imported before React loads" is held only by each file's own import order, which no test checks.

## Unread material

- `.the-way/elements/decisions/template.md`: read lines 105-264, which hold the named ranges 111-127, 162-166 and 220-260; not the rest of the file.
- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `foundations/part_map.md`, `foundations/glossary.md`, `.the-way/elements/decisions/skill/SKILL.md`, the 14 entries and the invariant: read whole.
- `plan.md:16-73` and `:97-106`: read as copied in the handoff, not from the file.

## Searches not found or unclear

- For D-73: a test that checks the agent instructions send an agent to `guidelines/testing.md`, or that `guidelines/testing.md` follows the template — none in `tests/` (`git grep "testing\.md"` found only a comment in `tests/invariants/test_terrain_drawing_numbers.py:24`).
- For D-74: `fast-check` or another property-test library — none. For D-75: `playwright` in tests — only `tests/agent_workflow/test_loop2_play_skill.py`, a test of a skill, not of a journey. For D-87: `pixelmatch`, `toMatchSnapshot`, `screenshot` — none.
- For D-76: a refusal test of fonts or of the preview server — none (`tests/invariants/test_application_build_output.py` mentions the kitchen-sink build only).
- For D-84: a test of how simulation tests use the seed or the clock — none (`tests/invariants/test_simulation_randomness.py` checks the simulation's source, not its tests).
- For D-85: a test that the three exemplar cases exist — none (`git grep "exemplar"` in `tests/` and `scripts/` found nothing).
- For D-81, D-78, D-88, D-89: nothing a test can hold was found; searched by the terms of their sentences (levels, case names, focus, condition of return).
- For D-264 and D-268 outside the two files: `git grep` for `memory-limit`, `page-document`, `startMemoryLimit`, `2048` and `jsdom` in `tests/quality`, `tests/invariants`, `tests/agent_workflow` and `scripts` — none; a check of the exact pin of jsdom — none.
- Unclear: whether "directly above it" in the plan means above `test(` or at the top of the body; settled as in choice 1.
