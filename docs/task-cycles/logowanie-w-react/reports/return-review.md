FAIL c0337587b1174b28e2dea170c55755da630f4097

# Review of the return step — task `logowanie-w-react`

Range `b415368..c033758`, one commit, four files: `foundations/decisions.md`, `foundations/environment_facts.md`, `foundations/invariants.md`, `guidelines/coding-browser-module.md`. No test and no product code in the range. `git rev-parse HEAD` is the head given. The reviewed worktree stayed clean; crafted runs took place in a separate worktree of c033758, removed afterwards. No invariant test changed in this range; the entries `icon-credits` and `browser-view-framework` did.

Counts: 4 blocking, 6 Minor, 0 out of scope.

## Answers to the handoff's points

| Point | Answer |
|---|---|
| D-269 | Carries what spec decision 6 and To do 18 carry. The sentence, the rationale clause, the rejected way and `derives from D-45` moved from D-265 as the template's „Changing a decision” gives. „Its build passes” and „nothing fails” go beyond the spec's words and are true: a page module that reached React built with exit 0 and passed the page's test. M3, M4 |
| D-265 | Lost the sentence, nothing else of meaning. No other file cites it for the page |
| D-270 | Its Rejected and most of its Rationale stand in `reports/fix-1.md`, `fix-1-handoff.md` and `whole-review-fix.md`. Two things do not hold: it widens D-03 with no question (I3), and it rests on an npm behaviour no fact holds (I4) |
| D-270 against `react_libraries` | Same on the class but one word: the code reads only entries not marked `dev`, the entry has no such condition. The clause „in the browser view's code” is sound in meaning, as D-03's own words. The second account in the test file is a finding (I2) |
| `icon-credits` reworded | Sound. It comes to the projected entry's own words, „the game's section of credits”, and D-27's binding sentence keeps the card. Two loose ends: the test's docstring (I1) and D-27's *Verification* (M1) |
| The six facts | All 13 passages stand at their addresses; each fact is named by an entry; each sentence says no more than its source. The fact that is missing is I4 |
| `foundation_check.py` | exit 0, 0 errors, twice |

## Important (blocking)

### I1. The test of `icon-credits` restates the entry with the wording this range took out

- **Place:** `tests/invariants/test_icon_credits.py:1-3`, against `foundations/invariants.md:331` (`icon-credits`). Also `:18` of the same file. The range made the mismatch; the file itself is outside the range but in the task, changed by commits 09c99ee, 13f91f8 and 0021295.
- **What is wrong:** the docstring opens „Invariant icon-credits: For each SVG icon file directly in `assets/icons/`, the game's footer and the login card's section of credits each hold a credit…”. The entry now reads „the game's section of credits”, and the reason it changed is that this test does not reach the card. So the file calls itself the invariant, gives a wording the foundation no longer has, and at `:51` denies covering what that wording says. `:18`, „no card does so yet”, has been false since Slice 11 (M2 of `reports/whole-review.md`).
- **Why it matters:** this is a second account of an entry the change changes, read first by whoever next touches the credits. Task 24 writes the rest of this entry and starts from this file.
- **Grade:** WAY-263, „restate it differently”, with its *Verification*: grading such a repeated account Minor because it only says something different is what the decision names as violating. The report's concern 2 names the mismatch and says it is not the author's under the handoff. That explains who may fix it; it does not lower the grade. The handoff to the author („That test's comment is no entry and not yours”) does not bind this grade either.
- **Evidence:** `git show 3d366c8:tests/invariants/test_icon_credits.py` holds a footer-only first line, so the task wrote the present one; a search of the tree for „login card's section” finds only this file.
- **What would close it:** a docstring-only change of two places: the sentence as the entry reads it, and `:18` saying the card is held by D-27 and `tests/view/account-screen.test.mjs`.

### I2. The framework test defines „a library built on React” with a condition D-270 does not hold, and the report says the two are the same

- **Place:** `foundations/decisions.md:5586-5603` (D-270, sentence and second violating example), against `tests/invariants/test_browser_view_framework.py:17-19` (docstring), `:26-30` (*Does NOT cover*), `:136-145` (`react_libraries`, the condition at `:142`). The report's claim stands at `reports/return.md:46`: „The test needs no change: `react_libraries` … is what D-270 says”.
- **What is wrong:** D-270's class is any package other than `react` and `react-dom` whose lock entry declares a peer on `react`, and it names as violating „a library on React taken as a development dependency and imported by a screen”. The test's docstring defines the same words as „a package-lock.json entry not marked `dev`”, and *Does NOT cover* does not name that route. The file's `:17-19` reads as the rule, not as a limit.
- **Is the clause sound?** In meaning, yes. D-03 says „its code or its runtime dependencies”, so an import in a screen is covered in words, and the pair of examples is the template's place for what no invariant checks. So D-270 should keep it. What fails is the agreement between entry and test, on the entry that the invariant now takes its condition from. `browser-view-framework` reads Method `test`, its condition stands in D-270 by the template's „The sentence”, and a citing test's pass is its result. So this commit gives the invariant a pass with its sentence false. That is the very reasoning the report uses to reword `icon-credits` (`reports/return.md:83`), applied one way there and not here.
- **Why it matters:** the next tasks move the program editor to React. esbuild bundles what the source imports, so such a library would reach the player, while a listed framework is refused on that route. Seeing it costs one word.
- **Grade:** N1 of `reports/whole-review-fix.md` graded this Minor before any entry existed; a stated limit of a test was then enough. Now an entry written by this change says otherwise, so WAY-263 applies. The report's concern 3 is a rationale and does not lower it.
- **Evidence:** in a separate worktree of c033758, the command of row 2 below. D-270's own violating example, as a dev lock entry with a peer on `react` imported by `src/browser/zz-temp.tsx`: exit 0. Same tree with `not entry.get("dev", False)` dropped from `:142`: exit 1, `('src/browser/zz-temp.tsx', '@mui/material/Button')`. The real tree with the condition dropped: exit 0 on those two cases and on the control. My lock entry is written by hand; N1 of `whole-review-fix.md` ran the same route in a lock npm wrote.
- **What would close it:** drop the condition at `:142` and say so at `:17-19`; the runtime check keeps its own `dev` reading in `runtime_names`. The other way, naming the route under *Does NOT cover*, leaves the agreement to an agent and keeps the invariant's false pass.

### I3. D-270 widens the meaning of the approved D-03, and it went to the request as a settled entry, not as a question

- **Place:** `foundations/decisions.md:5588-5592`, „counts as another UI framework under D-03, whether it draws anything or not”. `reports/return.md:3` (status `done with concerns`), `:149` (concern 1).
- **What is wrong:** D-03, approved at the readiness gate, bans „other UI framework”. To do 13 commands „bez innej biblioteki widoku”, and the definition's meaning sentence (`definicja_mvp2_loop2.md:1320`) says the same. A router, a state library and a library for dragging are none of these, and D-270's *Rationale* says so itself: „a helper that draws nothing”. D-270 brings them under D-03's ban. Before it, such a helper was allowed by D-03's words; after it, it is not.
- **What the rules give:** `.the-way/task-cycle/skill/foundation_step.md`: a question for the human arises where „an entry would change the meaning of an approved decision beyond what the accepted task document or plan carries (WAY-30)”, and the writer „returns such a question with the status `blocked`”. WAY-114 lists as violating „an entry changes the meaning of an approved decision without a question”. The return handoff repeats it in its last lines. Concern 1 says plainly that this is „a meaning the human has not read”, and then sends it to *What this request settles*, which holds what is settled, instead of *Questions*.
- **Why it matters:** a request that lists D-270 among settled entries asks for acceptance by merge of something the rules put to the human before it. The next screens meet it first: task 5 of the plan drags rules between groups. That is no collision today, as the trial in `technologia_budowanie_ekranow.md:161` used the browser's `draggable` with no library.
- **Limit of this finding:** what the guard does may well be the right answer, and I do not call the guard wrong. The orchestrator's own note in `fix-1-handoff.md` calls it „not researched and not required”, and the delegation of intermediate choices does not reach a decision's meaning (WAY-14). I read it so; the orchestrator may see it otherwise, see *Searches*.
- **What would close it:** the request holds D-270 under *Questions*, opening as `foundation_step.md` gives, with the two ways of concern 1 and their costs. Keep it: every helper with a peer on `react` fails loudly until a task names it, and no list of names is kept. Narrow it: back to a list of names, since no lock entry tells a library that draws from one that does not, and a library on the list's outside passes. The report already holds the recommendation.

### I4. D-270 rests on npm writing `peerDependencies` into a lock entry, a behaviour no fact holds and npm's documentation does not state

- **Place:** `foundations/decisions.md:5595`, D-270 **Based on:** none. `reports/return.md:100-105`, whose *Not written* does not name it.
- **What is wrong:** D-270 defines its class by what „its entry in `package-lock.json` declares”, and the guard reads nothing else. The lock's format is npm's. npm's page on the lock file at v12.2.1, section `packages`, lists „bin, license, engines, dependencies, optionalDependencies: fields from `package.json`”, and `peerDependencies` is not among the fields of a package descriptor. The field comes from npm's source alone: `workspaces/arborist/lib/shrinkwrap.js`, `pkgMetaKeys`.
- **Why it matters:** template, *Based on*: a fact entry „for every citation that, once it stopped being true, would call the decision into question”; `return_step.md`: „each source outside the product that the change rests on and the foundation does not hold”. If npm stopped writing the field, D-270's class would read nothing and the guard would pass everything with no failure, since its controls run on hand-written locks and the real tree holds only `react-dom` there, which is excepted. The report's own test for its six facts, „a reason its decision would fall or lose its teeth without” (`reports/return.md:194`), holds here more than for any of the six.
- **Evidence:** the two files downloaded from `raw.githubusercontent.com/npm/cli/v12.2.1/`: `docs/lib/content/configuring-npm/package-lock-json.md` has no `peerDependencies` (positive control: the same search finds `peer` at its legacy `dependencies` section); `workspaces/arborist/lib/shrinkwrap.js:94` has it. `package.json` pins npm 12.2.1, and the installed copy's file holds the same line. In the real lock, `node_modules/react-dom` is the one entry with a peer on `react`.
- **What would close it:** a fact with that source, its passage `const pkgMetaKeys = [` · `'peerDependencies',`, named in D-270's *Based on*. A control on the real lock, that the entry of `react-dom` names `react`, would turn a silent loss into a failure; that part is a test, for the fix of I2 to take or leave.

## Minor

**M1. D-27's *Verification* leaves the card to nobody by name.** `foundations/decisions.md:651`. With `icon-credits` no longer naming the card, what checks that the section stands there is the agent's comparison, whose lead-in reads „For where the icons come from and where their source files stand”. The complying example names the folded section of the login card; no violating example does. The binding sentence holds, and removing the section fails two cases of `tests/view/account-screen.test.mjs` (M2 of `reports/whole-review.md`, not rerun here). A few words in the lead-in close it.

**M2. `document-test-memory-limit` keeps a condition its test does not hold, the same case as `icon-credits` treated the other way.** `foundations/invariants.md:1189`, „read every 100 ms”, Method `test`. The report says it: the value stands in `tests/view/memory-limit.mjs:12`, no test reads it, and the kill before the case's own stop bounds it from above only. The only other mention under `tests/view/` is a comment at `page-document.test.mjs:70`. A commit raising it to a second would pass with the sentence false; reasoned, not run. The entry is true of the code, and D-268 holds the number, so the sentence could lose it.

**M3. D-269 reads `Based on: none` while its *Rationale* rests on the browser.** `foundations/decisions.md:5568`, „the browser resolves no bare import”. Graded below I4 because the decision would stand on the CommonJS entry alone, which the foundation already holds as `react-entry-format`; naming that fact is enough, and it is the reason D-06 gives for the same matter.

**M4. D-269 is a sentence a commit can make false, and nothing fails on it.** The entry says so („nothing fails when a module lets React in, so review keeps this decision”), and the spec took that cost. Confirmed by a run: with the page importing `credits-section.js`, `dist/kitchen-sink/view/credits-section.js` imports `react/jsx-runtime`, the build exits 0 and `tests/invariants/test_application_build_kitchen_sink.py` passes. That test already builds the page, so a check for a bare import there is a few lines. Broader coverage, for a later task or the fix.

**M5. D-06 now says „the build takes one more build step”.** `foundations/decisions.md:151`. The qualifier the glossary rule asks for doubles the word; „building takes one more build step” keeps the rule.

**M6. Three claims of the report.** `reports/return.md:89` and `:158` count 12 passages; there are 13, all found. `:167` credits „refused until the guard is changed on purpose” to the docstring; it stands in `reports/fix-1.md:14`, not in the test file. `:46`, see I2. No entry depends on them.

## Declined to judge

- The Minor findings of `reports/whole-review.md` and N1 to N3 of `reports/whole-review-fix.md`, beyond where this range reaches them: not fixed by design, and they stand in the request.
- „static elements” in D-36 and bare „the sentence” across the log: older than this change or word for word as the gate approved, as the report says.
- D-03's quoted UMD passage beside `react-entry-format`: no collision, and D-03's passage is not of this range.
- „working set” in D-268's *Rationale*: the spec's words on an accepted cost; nothing rests on it, and the report names the gap.
- Which Node release the image runs: `Dockerfile:1` reads `node:24-slim`, this machine 24.17.0, the facts `v24.17.0`, D-01 24.21.0. The template's rule on which edition a citation takes is itself a TODO there.
- D-97's projected move of „Wyloguj”: outside this task, as the report says.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree, at the start and at the end | 0 | `0 errors` both times |
| `python -B -m unittest test_browser_view_framework.NoUiFramework.test_no_ui_framework_in_runtime_dependencies test_browser_view_framework.NoUiFramework.test_browser_source_imports_no_ui_framework`, from `tests/invariants` of the separate worktree: the tree as it stands | 0 | passes |
| The same, crafted: dev entry `@mui/material` with a peer on `react`, in the manifest's `devDependencies`, imported by `src/browser/zz-temp.tsx` | 0 | **passes, I2** |
| The same tree, `not entry.get("dev", False)` removed at `:142` | 1 | refused by the source case |
| The real tree, condition removed, those two cases and `test_control_the_dependency_check_reads_what_an_entry_really_is` | 0 | |
| `node scripts/kitchen-sink.mjs --build-only`, with `CreditsSection` imported and exported by `kitchen-sink.ts` | 0 | a compiled module imports `react/jsx-runtime` |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py`, same tree | 0 | 3 tests, M4 |
| `node scripts/kitchen-sink.mjs --build-only`, at the head | 0 | 21 modules, none with an import of `react` |
| `python -B <scratchpad>/check_facts.py`: each passage of the six facts in the file downloaded from its address, markup dropped and whitespace collapsed; each fact against *Based on* | 0 | 13 of 13; named by D-264 and D-267, D-264, D-06, D-268, D-268, D-268 |
| `curl` of the four fact sources and of npm's two files, at tags `v19.3.1`, `v24.17.0`, `v12.2.1` | 0 | 200 each |
| `diff` of `packages/react/npm/index.js` at `v19.3.1` with `node_modules/react/index.js` | 0 | same |
| `git status --short` in the reviewed worktree, after the runs | 0 | empty |

Read, not run: the citation of `guidelines/coding-browser-module.md:147` against D-269, which agrees. The part map is held by `foundation_check.py`; I did not repeat the report's reading of each part's responsibility. `.runs/` is ignored, so this report touches no tracked file.

### Did not run

- `npm test` without arguments and the whole gate: forbidden by the handoff, the orchestrator's run.
- H1, with mail: the human's.
- Any test on jsdom: not needed for this range, and nothing here loaded an imitation.
- The page with React opened in a real browser: D-269's „blank page” rests on the spec's words, and the run shows the bare import only.
- A change of the 100 ms with its test (M2): reasoned from the report and a search of the tests.

## Own-work check of the author

It names the right place, D-270, and its check found the clause past the test. It then left that as a concern, and judged the rest as the entry's own, so it caught neither the source D-270 rests on (I4) nor that the concern is a question (I3).

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| WAY-14, WAY-30, WAY-114, WAY-263 | `.the-way/foundations/decisions.md` | the grades of I1 to I3 |
| `.the-way/elements/decisions/template.md`, `invariants/template.md`, `environment-facts/template.md`, `glossary/template.md:15-26`, `common/rules.md` | `.the-way` | the forms the entries keep |
| `.the-way/task-cycle/skill/SKILL.md:395-425`, `.the-way/project-level/technology/reserved_choices.md` | `.the-way` | *What this request settles* against *Questions*; whether D-270 takes a reserved choice: it does not |
| D-03, D-06, D-27, D-76, D-264, D-265, D-268, `document-test-memory-limit` | `foundations/`, each whole | entries the range reaches |
| `reports/return-handoff.md`, `fix-1.md`, `fix-1-handoff.md`, `whole-review-findings.md`, `whole-review.md` M1 and M2, spec decisions 2, 6, 9, 10 and *Foundation entries* | `.runs/` | sources of the entries |
| `definicja_mvp2_loop2.md`, `plan_mvp2_loop2.md`, `rozpoznanie_mvp2/technologia_budowanie_ekranow.md`, by a search for dragging and libraries; `_zadania/logowanie_w_react_loop2.md`:161 | the vault, read only | what the human approved of D-03; that D-269's *Origin* quotes the note word for word: it does |
| npm's documentation and source at `v12.2.1` | raw.githubusercontent.com, read 2026-11-02 | I4 |
| `C:\Storage\The Brain\The Brain\Notes\Areas\(A) Claude code\playbook_code_review.md`, `.ai\rules\scripts.md`, `.ai\rules\search.md` | the user's rules | before the review, the scripts and each „not found” |

## Searches not found or unclear

- **`peerDependencies` in npm's documentation of the lock file:** not found in that page at v12.2.1, the rest of the page found by the same search. Found in the source, so a fact has a source, one of code and not of a documented promise.
- **Whether the delegation of intermediate choices covers I3:** unclear. The handoffs send questions to the orchestrator, and WAY-14 and WAY-114 reserve a decision's meaning to the human. I graded by the latter. If the orchestrator reads D-270 as no change of D-03's meaning, I3 is the one finding of the four that falls with that reading, and the request should then say why.
- **Whether a test's docstring is a „repeated account” under WAY-263:** the decision says „another changed file repeats the entry”. A docstring that opens „Invariant icon-credits:” and gives the sentence is one by any reading I found; `guidelines/testing.md` holds no rule on it.
- **Whether a helper with a peer on `react` is wanted soon:** the plan's task 5 drags rules, and the trial did it natively; touch was not tried (`technologia_budowanie_ekranow.md:161`).
