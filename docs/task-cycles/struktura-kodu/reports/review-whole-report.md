PASS 11d266bc61b077aa25157d3d5b96f30a21636a88

# Review of the whole change — task `struktura-kodu`

- Range: `a3d913dac87160f56b194ce863c60145a551765a..11d266bc61b077aa25157d3d5b96f30a21636a88` (7 commits). `git rev-parse HEAD` in the reviewed worktree printed `11d266bc61b077aa25157d3d5b96f30a21636a88`, the head of the handoff. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the gitlink's commit; the change does not move it.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`, variant "the whole change". No slice had a review of its own, so each slice is judged here as section 2 judges a slice, its executor's own-work check included.
- Counts: blocking findings 0; Minor findings 8, all within the task; out-of-scope findings 0.

## Changed files and their sizes

From `python -B .the-way/task-cycle/change_file_sizes.py a3d913da… 11d266bc…` (exit 0), physical lines:

| File | Before | After | Change |
|---|---|---|---|
| `foundations/decisions.md` | 11448 | 11482 | +34 |
| `foundations/invariants.md` | 1416 | 1426 | +10 |
| `guidelines/coding.md` | 335 | 361 | +26 |
| `src/browser/view/program-panel.tsx` | 863 | 963 | +100 |
| `src/browser/view/rule-drag.ts` | — | 230 | +230 (added) |
| `src/browser/view/rule-list.tsx` | 767 | 659 | −108 |
| `src/browser/view/rule-panel.tsx` | 582 | 699 | +117 |
| `src/browser/view/scene-memory.ts` | — | 346 | +346 (added) |
| `src/browser/view/scene.tsx` | 964 | 832 | −132 |
| `tests/quality/eslint-size-rules.mjs` | — | 115 | +115 (added) |
| `tests/quality/test_function_and_file_size.py` | — | 167 | +167 (added) |
| `tests/transport.test.mjs` | 1409 | 1437 | +28 |

## The structure of the code the change leaves

Numbers from my own runs of the invariant's test, `npm test -- tests/quality/test_function_and_file_size.py`, with `@unittest.expectedFailure` taken off. I ran it in a worktree of the base, with the head's two new files copied in, and in a worktree of the head. Both runs ended with exit 1, as they should with the mark off.

- Base: 9 reports. They were `kitchen-sink.tsx:956` file 890, `startApp` 449, `ProgramPanelView` 293, `createProgramsEntry` 245, its `build` 225, `RuleListView` 511, `RulePanelView` 345, `Scene` 366 and `tests/transport.test.mjs:537` async arrow 238.
- Head: 4 reports. They are `src/browser/kitchen-sink/kitchen-sink.tsx:956` file 890, `src/browser/view/app.ts:248` `startApp` 449, `src/browser/view/programs-entry.ts:81` `createProgramsEntry` 245 and `programs-entry.ts:102` method `build` 225.
- What the head names and the base does not: nothing. The change pushed no function and no file over a threshold. The head's set is exactly what the comment at the marking names (Q1/Q3), and both exceptions (`accountRoutes`, `saved-game.ts`) are absent from both lists.

Sizes by the rule's counting at threshold 100, from a probe of my own in the head and base worktrees (lines of code; base → head):

- `Scene` 366 → 184. `scene.tsx` 736 → 631 lines of code. `scene-memory.ts` is new at 234.
- `RuleListView` 511 → 179. Its nested `renderRule` 116 and `renderGroup` 126 are now the components `RuleRow` 110 and `GroupSection`, which is under 100. `rule-list.tsx` 644 → 544. `rule-drag.ts` is new at 184.
- `RulePanelView` 345 → 200, exactly the threshold. `PickGrid` is 103. `rule-panel.tsx` 487 → 590.
- `ProgramPanelView` 293 → 194. `RunHead` is 137. `program-panel.tsx` 639 → 724.
- The transport case 238 → 127, and the file 1291 → 1310.

Growth below the threshold: `program-panel.tsx` grew by 85 lines of code, to 724 of 800, and `rule-panel.tsx` by 103. Both stay under the threshold, and the plan chose to divide these two inside their files. `RulePanelView` stands at exactly 200, which the rule allows. Its next added line goes over, and while the test is an expected failure no gate stops that, only review (WAY-51). That is a note for later work, not a finding. No code is left without a user: `placeOf`, the types and the moved helpers are all imported. No name stopped being true, apart from Minor 7 (a guideline sentence).

## Coverage of the task

- **To do 1** (the rule, its thresholds, scope, counting and two exceptions): met in D-425 and in `tests/quality/eslint-size-rules.mjs`. That file has `skipBlankLines`/`skipComments`, `max-lines-per-function` counting nested functions in the outer one, takes the files and ignores of `eslint.config.mjs`, turns the file rule off under `tests/` and for `saved-game.ts`, and drops only the `accountRoutes` report in `account-routes.ts`.
- **To do 2** (the test apart from the linter's run, the size rules alone, every item with its place and size, configuration listing only the decision's exceptions, seen failing once): met. My base and head runs show the failing message's form. Slice 1's report records the first failing run before the marking. The control case and its five breaks are recorded in `reports/executor-1-report.md`.
- **To do 3** (invariant marked violated, test an expected failure, both marks to come off together): met, adapted by Q1. The set in the comment at `tests/quality/test_function_and_file_size.py:139-144` is the true head set (above). `createGameView` is no longer over the threshold, which I confirmed: it is absent from the base run.
- **To do 4** (Scene, ProgramPanelView, RuleListView, RulePanelView and the transport test function under 200, with no change of what the player sees): met. The head run shows none of them. On behaviour, see the slices below.
- **To do 5** (`### Size of a function and a file` naming the decision and invariant, repeating no threshold or exception): met. It stands after `### Logging scope`, as the pinned template orders. One partial repetition is Minor 1.
- **To do 6**: met by place. Both new files stand under `tests/quality/`, which build-tools claims. `foundation_check.py` reports 0 errors, so every tracked file has its part.
- **Settlements row 1** → D-425, **row 2** → invariant `function-and-file-size` (`Violated: yes`, *Part* the six parts the run reads and build-tools), **row 3** → D-426: all written. *Rejected* of each holds the ways of the rows' sources and nothing derived.
- **Source fidelity**: the binding sentences of D-425 and D-426 and the invariant's sentence follow the task's answers. The numbers in *Rationale* match the task's *Context*: 7/9 functions, 200–295, 596 with 3 branches, 15/1 files, 19 test files, 229 files, 13 exports, 39 types. I found nothing invented. Four prose departures in *Rejected* and *Rationale* are Minor 3–6.
- **Out of scope** respected: no change to `game-view.ts`, `app.ts`, `programs-entry.ts`, `kitchen-sink.tsx`, a stylesheet or `trip-plan.tsx`.

## Choices of the orchestrator, judged

- **Q1** is right. Writing an exception needs the human (D-425, WAY-172), and splitting is out of scope. The consequence the request must state plainly: the human chose "3 a" expecting the rule to stand violated only until the two controller splits merge. With `createProgramsEntry`/`build` and `kitchen-sink.tsx` in the set, and no task dividing them, the test stays an expected failure after those merges too. Until then the gate stops no growth at all, and only review keeps a file or function from going over (WAY-51).
- **Q3** is right: the template's *Violated* takes `yes` or `no`, and the comment sits beside the marking it explains.
- **Q4** is right. It follows D-29's scope, and no file it adds beyond "aplikacja, skrypty, testy" is over a threshold.
- **Q5** is followed: slices 2–6 measured with the rule's own run.
- **D-425 *Relations* `derives from D-28`** is sound. D-28 adopts the pinned templates, and the pinned coding template (`.the-way/product-guidelines/coding/template.md:232-255`) asks for this rule and its decision. D-29 neither collides with D-425 nor is narrowed by it: D-29's "review keeps its rules to those sets" speaks of `eslint.config.mjs`, so the closed list of the decisions template (`elements/decisions/template.md:211-219`) rightly leaves D-29 out. The standing beside D-29 is said in the third binding paragraph and in *Verification*, where review reads it.
- **`IIFEs: true`** fits "a function" in D-425 and changes no report today.
- **The control case cites no invariant**: accepted. It is the check of the run, and `foundation_check.py` reports 0 errors.
- **The extra cuts** (`scene-memory.ts`, `rule-drag.ts`, helper components) are within the plan's allowance, and each new file stands under `src/browser/view/**` (browser-view).

## The slices

Each slice is judged against the task and its foundation. Each executor's own-work check is judged too (WAY-164).

- **Foundation entries (`e1e6b127`)**: correct in substance, with Minors 3–6. The own-work check (a grep for `createGameView|should|will|MUST|startApp`) caught form, not fidelity. Fidelity is where the Minors lie.
- **Slice 1 (`78f081b5`)**:
  - The run applies the two rules alone, with `overrideConfigFile: true`.
  - `noInlineConfig: true` keeps an `eslint-disable` comment from hiding a report, and `applySuppressions: false` does the same for `eslint-suppressions.json`. The control case holds both.
  - A fatal parse message throws.
  - The `accountRoutes` exception matches file and message, so another function of that file, and an `accountRoutes` elsewhere, are still reported. The control case holds both.
  - An expected failure counts every exception as "expected", so a crash of the script on the repository's own files would pass. The unmarked control case runs the same script and configuration and catches every crash that is not specific to the repository's files. A parse error in a repository file also fails `eslint-source-rules`. The residue is small.
  - The own-work check (only the decision's exceptions, with breaks A and D seen failing) fits the weakest point. One robustness gap remains (Minor 2).
- **Slice 2 (`2fc6b1e0`)**: I read every changed line of `Scene` against the base.
  - `advanceMemory` reproduces each render-phase adjustment of the seven slots: placing, facing, effects at the previous reading's `x`, tint, moment, `lastState`, `seenEvents`. It returns the given memory where nothing changes, so React's render-phase update settles.
  - The end handlers keep their serial guards.
  - `momentSettled` and `walkStarted` use the same captured values as the old value-setters.
  - The cancel routing keeps its selector order, and the `useLayoutEffect` keeps `[pending, shown, frameWidth]`, where `shown` equals the committed state as before.
  - `Ground` adds no DOM element.
  - The own-work check (three mutations, each caught by `tests/view/scene.test.mjs`) fits where the slice is weakest.
- **Slice 3 (`2935e093`)**:
  - Keys are kept: `RuleRow` and `GroupSection` are keyed by rule and group id as the old `li` and `section` were, so moves keep DOM identity.
  - The panel `li` moves with its row inside the same fragment.
  - `useRuleDrag` is called at the top level, before no early return. Its effect lists `[root, clearDrag]`, both stable, and removes both page listeners.
  - The layout effect of the focus is unchanged.
  - The new components call no Hook (D-267).
  - The own-work check is a real-browser comparison of base and head builds, with identical outputs. It is coarse, as its author says.
  - My mutation of `afterDrop`'s focus key in `rule-drag.ts` failed `tests/view/rule-editor.test.mjs` (1 of 76).
- **Slice 4 (`e0cd12e5`)**:
  - `PickGrid` uses `field`, which equals `active` wherever the grid is drawn, in place of `active`. `NumberRow` returns null where the old code returned null.
  - `changedProgram` and `fieldsOf` are the old closures with their captured values as parameters.
  - The focus effect is unchanged, with no dependency list, as before.
  - My mutation (Enter picks a greyed cell) failed `rule-editor.test.mjs` (1 of 76), so the moved key handler is covered.
  - The own-work check fits.
- **Slice 5 (`d7493a85`)**:
  - `RunHead` and `ProgramsHead` hold no Hook. The refs stay owned by `ProgramPanelView`.
  - `switchTo` is equivalent to `switchStands && shown.kind === "saved"`.
  - `changeName` keeps the old guard.
  - The own-work check (focus after each action, compared on both builds) fits the weakest point.
- **Slice 6 (`11d266bc`)**:
  - The case keeps its name, `// invariant: account-mutation-request-guards`, its `decision: D-226` line, the routes and their precondition, every variant (26 rows plus the per-field rows), every assertion and message, and the controls.
  - `f.account.id` is passed as `accountId`.
  - The guard break (Origin of `mutationGuards`) seen failing and restored is recorded.
  - This is a changed invariant test: `tests/transport.test.mjs`, case "refused state-changing requests change no account or session and do no password work", invariant `account-mutation-request-guards`.

## Findings

### Critical

none

### Important

none

### Minor (each within the task)

1. **`guidelines/coding.md:256`** — slice 1, `78f081b5`. The sentence reads "Progi dla funkcji i dla pliku oraz dwa wyjątki stoją w D-425 i tu się ich nie powtarza." It repeats the number of exceptions, "dwa", which To do 5 keeps in the decision alone ("bez powtarzania progów i wyjątków, które stoją tylko w decyzji"). A human-accepted third exception in D-425 would leave this sentence false, with nothing to signal it. Fix: "Progi i wyjątki stoją w D-425 i tu się ich nie powtarza."
2. **`tests/quality/eslint-size-rules.mjs:32-48`** (`lintedPatterns`) — slice 1, `78f081b5`.
   - What is wrong: any entry without `files` that has `ignores` is taken as global ignores, even with other keys beside it. The `ignores` of an entry that has `files` are dropped. ESLint treats only an entry holding `ignores` alone (and `name`) as global.
   - What it causes: an entry such as `{ ignores: [...], rules: {...} }` added to `eslint.config.mjs` would silently narrow the size run. An entry with `files` and its own `ignores` would widen it beyond what the linter lints.
   - Why no test catches it: the control case cannot see either, because it runs the same configuration. Neither form stands in `eslint.config.mjs` today.
   - Fix: throw on both forms, as the function already throws on a non-string `files` entry. That keeps the slice's own principle that a form the script cannot read stops the run instead of narrowing it.
3. **`foundations/decisions.md:839`** (D-425 *Rejected*) — foundation entries, `e1e6b127`. The sentence reads "no limit on a file — review in the pinned process does not look at size". That held for the pin the task's source spoke of (`55afa8e`). At the pin this change stands on (`bfb2e109`), review does look at size: `.the-way/task-cycle/review/whole_change.md`, section "The structure of the code the change leaves", and WAY-363. The same entry's *Rationale* already speaks of the current pin ("The coding template of the pinned process asks too…"). A reader therefore reads a false statement about the current process. Fix: keep the source's reason in a form true now, e.g. "review would see a file's growth only as a Minor finding, and the departure from the template would be written down". Or keep the source's words tied to their time, which *Rejected* allows as the source's reason.
4. **`foundations/decisions.md:839`** (D-425 *Rejected*, first way) — foundation entries, `e1e6b127`. The sentence reads "nine functions break it, and two more that the review judged to leave whole join them, so there would be three exceptions". It reads as 9 + 2 = 11. The task's own measurement gives 9 in all, `TripPlanView` and `EndWindowView` among them, and *Rationale* in the same entry says "nine broke 150". The ambiguity comes with the source's "łamie 9 funkcji, dochodzą …". Fix: "nine functions break it, two of them ones the review judged to leave whole, so there would be three exceptions".
5. **`foundations/decisions.md:824`** (D-425 binding sentence) — foundation entries, `e1e6b127`. The list "the application, the scripts, the tests, the scripts of deployment, …" names "the scripts of deployment". Deployment has no TypeScript or JavaScript script. Its scripts are Bash (`deploy/loop2-deploy`, `loop2-backup`, `loop2-watch`), which ESLint does not read, and its linted files are its tests under `tests/deploy/`. The governing clause, "every file that ESLint checks under D-29", is right and the code follows it. A reader could still take the Bash scripts as covered by the limit. Fix: drop "the scripts of deployment", or write "the test helpers of deployment".
6. **`foundations/decisions.md:853`** (D-426 *Rationale*) — foundation entries, `e1e6b127`. "one file and four packages falsely, each started by its path" narrows the source. The source reads: "memory-limit-child.mjs uruchamiany po ścieżce; npm, prettier, typescript-compiler, jsdom używane po ścieżce albo z Pythona". Fix: "each started by its path or from Python".
7. **`guidelines/styleguide-browser-view.md:768-770`** (rule "The scene of a map run") — slice 2, `2fc6b1e0`. The rule says the scene "Stoi w `src/browser/view/scene.tsx` i `src/browser/view/scene-picture.ts`". Since this change, the scene's memory between readings — the dropping of overdue effects, the walk's start and end, the moment's playing — stands in the new `src/browser/view/scene-memory.ts`. A reader of the styleguide who looks for the code of D-317/D-367 does not find that file named. `scene.tsx:23-24` does point to it. Fix: name `scene-memory.ts` in that sentence. The plan's "no style changes" spoke of stylesheets, not of this guideline.
8. **`src/browser/view/program-panel.tsx:398-403`** — slice 5, `d7493a85`. The doc comment of the component `RunHead` ("The head of the screen of a map run: …") stands above `type RunHeadProps`, and `function RunHead` at line 426 has none. An editor's hover over `RunHead` shows nothing. Fix: move the comment to the function. Polish only.

## Declined to judge

- That the gate stops no growth while the test is an expected failure, and that the set keeping it so now outlives the two controller tasks. This is the human's accepted choice ("3 a") under WAY-51, and Q1's consequence for the request. It is a question for the human, not a defect of the change.
- `guidelines/coding-browser-module.md` has no rows for `scene-memory.ts` and `rule-drag.ts`. Its rule "Nowy ekran i moduły w DOM" says a file added after the table's last audit takes no row, so no change is due.
- `.runs/executor-6/` in the reviewed worktree still holds three test logs of slice 6. That is a matter of the cycle's working-copy rule, not of the code. The orchestrator may want them moved into `reports/` or removed.

## Checks I ran

| Check | Exit | Result |
|---|---|---|
| `git rev-parse HEAD` (reviewed worktree) | 0 | `11d266bc61b077aa25157d3d5b96f30a21636a88` |
| `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` | 0 | both `bfb2e109…` |
| `python -B .the-way/task-cycle/change_file_sizes.py a3d913da… 11d266bc…` (reviewed worktree) | 0 | table above |
| `npm test -- tests/quality/test_function_and_file_size.py`, mark off, base worktree (with the head's two new files copied in) | 1 | main case fails with 9 reports; control case passes |
| the same, mark off, head worktree | 1 | main case fails with 4 reports (the Q1 set); control case passes |
| the same, mark on (file as committed), head worktree | 0 | `OK (expected failures=1)` |
| size probe at threshold 100 on the six changed sources and the transport test, base and head (script in my working directory) | 0 | sizes above |
| `npm test -- tests/transport.test.mjs` (head) | 0 | 13/13 |
| `npm test -- tests/view/scene.test.mjs` | 0 | 74/74 |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76/76 |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 60/60 |
| `npm test -- tests/view/rule-signs.test.mjs` | 0 | 6/6 |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 21/21 |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 17/17 |
| `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18/18 |
| `npm test -- tests/view/end-window-game.test.mjs` | 0 | 27/27 |
| `npm test -- tests/view/previous-save.test.mjs` | 0 | 46/46 |
| `npm test -- tests/quality/test_source_tool_scope.py` | 0 | 4 OK |
| mutation: `PickGrid` Enter picks a greyed cell (`rule-panel.tsx`), then `npm test -- tests/view/rule-editor.test.mjs` | 1 | 1 of 76 fails; file restored with `git checkout --` |
| mutation: `afterDrop` focus key `rule:<id>:open` → `:remove` (`rule-drag.ts`), the same test | 1 | 1 of 76 fails; file restored |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the 6 changed sources, the transport test and `eslint-size-rules.mjs` | 0 | clean |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the same files | 0 | clean |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on `test_function_and_file_size.py` | 0 | clean |
| `npm run typecheck` (head) | 0 | — |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | `0 errors` |

Not run:

- the full gate, `npm test` with no argument, which is the orchestrator's run;
- `check_instructions.py`, because the change touches no instruction file;
- the dependency audit and the Ruff/ShellCheck/Prettier run of `test_quality_invariants.py`, because the reviewed slices' reports record them and my focused lint and format runs cover the changed files;
- any real-browser check of my own (D-88). I relied on the executors' recorded comparisons of base and head builds, and my reading of the code found nothing that changes events, keys or focus.

## Reaches beyond my selection

- `.the-way/foundations/decisions.md` WAY-51 and WAY-365 — to judge the expected-failure marking and the guideline sentence about a move before an addition.
- `.the-way/elements/decisions/template.md` (lines 1–110 and 205–240) — to judge *Relations* of D-425 and the prose rules of *Rationale* and *Rejected*.
- `.the-way/product-guidelines/coding/template.md`, whole — to compare `### Size of a function and a file` with the pinned template.
- `.the-way/product-guidelines/reading.md` and the reading section of `.the-way/elements/common/way_of_working.md` — to select.
- `eslint.config.mjs`, whole — to judge the run's scope.
- The executors' reports and the foundation-entries report, as the method directs.

## Working copies

- `.runs/review-whole/base`: a worktree of `a3d913da`, detached, with `node_modules` as a junction to the reviewed worktree's and the head's two new test files copied in.
- `…/.runs/review-whole/head`: a worktree of `11d266bc`, detached, with the same junction.
- In `…/.runs/review-whole/`: the decision index, the size probe script, diffs and test logs.

I removed both junctions first, as links only, and checked that `node_modules/eslint/package.json` of the reviewed worktree still stands. Then I removed both worktrees with `git worktree remove --force`, ran `git worktree prune`, and deleted `.runs/review-whole/`. `git worktree list` shows neither worktree, and `git status` of the reviewed worktree is clean. Nothing remains, and nothing was needed in `reports/`: the numbers stand in this report.

## Unread material

- **Decisions read whole: 9 of the index of my selection** — D-28, D-29, D-78, D-88, D-104, D-226, D-267, D-425, D-426. The index lists 101 decisions in full (binding sentences and *Scope*) and 256 by heading; I read all of it, including the run through the 256 headings. The selection was: sections "Code rules, exemplars and static checks", "The gate, test tools and the local start", "Browser view: screens, navigation and their code", "Program editor", "Rule panel and the signs of a rule" and "Scene", parts browser-view, account-server, build-tools, agent-workflow and product-foundation, and D-28, D-29, D-88 and D-267 by number.
  - Decisions bearing on the change that I did not read whole: D-316, D-317, D-319, D-322, D-367 (scene behaviour), D-288, D-295, D-306, D-350 (editor and panel behaviour), and D-171, D-173 and D-174 (copy and program panel). I read them through the index's binding sentences only. The change claims to keep their behaviour, and I checked that by reading the code and running the tests, not entry by entry.
- **Guideline files:** none unread. I read `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` whole.
- **Invariants:**
  - Read whole: `function-and-file-size`, `eslint-source-rules`, `account-mutation-request-guards`, `cross-part-imports`, `browser-view-framework` and `prettier-source-format`.
  - Not read: the many other invariants whose *Part* names a touched part, among them `browser-view-token-values`, `browser-view-focus-outline`, `content-identifiers`, `rule-state-from-pick`, `streak-program-change`, `saved-program-edit`, `copy-save` and `ruff-source-rules`. The change touches no token, style, content identifier or saved data, and the tests of those that run in the focused files passed.
- **Part map:** read the entries of browser-view, account-server, build-tools, agent-workflow, product-foundation, deployment and test-helpers. Not read: simulation, which the change does not touch.
- **Glossary:** neither the product's nor the-way's glossary was read. The change adds or changes no term.
- **Other:** `reports/executor-3-manual-check.txt` and the slice-4 logs (`executor-4-log-*.txt`, `executor-4-steps.sh`) were not opened; I relied on the reports' descriptions of them. I did not read `.runs/orchestrator/index.md`, which the handoff says I need not follow.

## Searches not found or unclear

none

## Afterwards

The fix of the eight Minor findings above (`11d266bc..2b9b2cd3`) was reviewed in `reports/review-fix-report.md`: `PASS 2b9b2cd3910357de5fcf836e07e9e149d7d43573`, with all eight fixed.
