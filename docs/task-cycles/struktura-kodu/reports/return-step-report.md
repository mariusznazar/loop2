# Report — the return step

**Status:** done

## Commits

- `6cc90484` — `docs: :card_file_box: name the test of function-and-file-size by the clause tests: in the Verification of D-425, leave in its pair only the part no test holds, and drop from its Rationale what the coding template of the pinned process asks`. File: `foundations/decisions.md` (D-425 only). `git log -1 --format='%h %ae'` shows `6cc90484 mariusznn@gmail.com` (the private address). Head before: `2b9b2cd3`.

## What I compared (range `a3d913da..2b9b2cd3`)

- **D-425** (`foundations/decisions.md`, from line 822) with `tests/quality/eslint-size-rules.mjs` and `tests/quality/test_function_and_file_size.py`:
  - thresholds 200 (function) and 800 (file), `skipBlankLines` and `skipComments` on, `IIFEs: true`, nested lines counted in the holder (ESLint's own count; the control case of the test has a nested function and a padded function): match.
  - scope: files and ignores are read from `eslint.config.mjs` (the application, scripts, tests, the three agent-workflow directories, the two root configuration files); the file rule is off under `tests/**`: match with the binding sentence.
  - the two exceptions: the file `src/browser/sim/saved-game.ts` (file rule off for that path) and the function `accountRoutes` in `src/server/account-routes.ts` (report dropped by file and message); the control case shows no other place excepted: match.
  - the separate run: the script imports only the file patterns and ignores of `eslint.config.mjs`; `eslint.config.mjs` and `package.json` are unchanged in the range (`git diff --stat` empty for both), so the rule set of D-29 is untouched.
  - *Verification*: did not match the method (see below).
- **Invariant `function-and-file-size`** (`foundations/invariants.md:1408`): *Part* (browser-view · simulation · account-server · build-tools · deployment · agent-workflow, the same as D-425's *Scope*), *Derives from* D-425, *Violated* `yes`, the test cites `# invariant: function-and-file-size`. `node tests/quality/eslint-size-rules.mjs` (exit 0) reports at this head exactly four reports: `src/browser/kitchen-sink/kitchen-sink.tsx` (890 lines), `startApp` in `src/browser/view/app.ts` (449), `createProgramsEntry` (245) and its method `build` (225) in `src/browser/view/programs-entry.ts`: the set of choice Q1, no other. The sentence names none of them (Q1); the comment at the `expectedFailure` of the test names them (Q3): match. `createGameView` stands under the threshold at this head and is named nowhere in the entries.
- **D-426**: no `knip` in `package.json` or any tracked file but `foundations/decisions.md`; no stage of the one command runs a tool for unused code: the claims hold. Its *Verification* pair (no test holds the sentence) stays.
- **D-29**: its sentence stays true: `eslint.config.mjs` is not changed by the range. D-425 says how it stands beside D-29 in its third binding sentence (the run is of its own, leaves D-29's rule set and configuration as they are, is no change of D-29) and in the *violates* example of its *Verification*; its *Relations* read `derives from D-28`, since the closed list (`derives from` / `narrows`) has no word for standing beside (the choice of the foundation step, kept). No change of D-29.
- **D-267**: compared the four views' code with its sentences. `RuleListView` calls `useRef`, `useState`, `useCallback`, `useRuleDrag` and `useLayoutEffect` at the top of the function, before any condition; the custom Hook `useRuleDrag` (`src/browser/view/rule-drag.ts:145`) calls its hooks at its top, and its `useEffect` lists `[root, clearDrag]` and returns the cleanup that removes both listeners (as the effect it replaced did in the base). `Scene` calls its hooks before the early `return null`; the state advance that was set in several `useState` calls is now `advanceMemory` called in render with one `setKept`, the pattern the base used. `RulePanelView` and `ProgramPanelView` keep their hooks above their early returns, and `RunHead`, `ProgramsHead`, `GroupNameField` have no hook. No rule of D-267 broken.
- **Search of the foundation (WAY-33)** over `foundations/`, `guidelines/`, `AGENTS.md`, `src/browser/AGENTS.md`, `.claude/skills` for `Scene`, `scene.tsx`, `RuleListView`, `rule-list.tsx`, `RulePanelView`, `rule-panel.tsx`, `ProgramPanelView`, `program-panel.tsx`, `tests/transport.test.mjs`, "size of a function", and for the names of the functions the change moved (`reachedX`, `sceneDrawing`, `useRuleDrag`, `firstMemory`, `RunHead`, …): hits in `foundations/part_map.md:73` (the test file in a part; unchanged), `guidelines/coding-browser-module.md:68-79` (file table), `guidelines/styleguide-browser-view.md:126,769`, `guidelines/testing.md:182,374,458`. None names a function, a line count or a case name the change made untrue; the case names of `tests/transport.test.mjs` the guidelines cite are unchanged. `guidelines/coding-browser-module.md` "Files of this kind" has no row for the two new files `scene-memory.ts` and `rule-drag.ts`: the template says a file added after the audit takes no row until the guidelines are refreshed, so no change.
- **Part map**: `python -B .the-way/elements/common/foundation_check.py` shows every tracked file claimed (the new files fall under `src/browser/view/**` of browser-view and `tests/quality/` of build-tools).
- **Guidelines**: `guidelines/coding.md` `### Size of a function and a file` names D-425 and the invariant and repeats no threshold or exception (it says they stand in D-425), and its "Where in code" lists the script and the test of the run; `guidelines/styleguide-browser-view.md` sentence names `scene-memory.ts`, which exists: match.
- **Glossary**: the change writes "reading" (`scene-memory.ts`, `scene.tsx`: "from one reading to the next", "the previous reading", a local type `Reading`) in the meaning of the glossary entry `reading` (one pass of the browser view that draws the screen from the state it then holds): no use against the entry, no entry needed. No other glossary term used in another meaning.
- **Environment facts**: I checked whether the change rests on a source outside the product that the foundation does not hold: the documentation of ESLint 10.12.0 for `max-lines-per-function` and `max-lines` (their options `skipBlankLines` and `skipComments`). I wrote no fact: the counting the decision binds is held by the control case of the invariant's test, which runs the real rule on made-up files (comments, blank lines, a nested function), and the documentation says nothing of nested functions, so a fact would hold less than the sentence rests on. D-425's *Based on* stays `none`. This is a judgement; the cost if wrong is a decision without a fact for the tool's behaviour.

## What no longer matched and its correction

1. **D-425 *Verification*:** it named only the invariant and carried a pair that described parts the test now holds (a function brought under 200 lines with the run reporting nothing; a limit raised for a function). The method of the return step asks for the clause `tests:` and a pair only for the part no test holds. Corrected: `tests:` names the thresholds and the count, the scope of the limit on a function and the file limit off in the tests, and the two exceptions standing whole and no other; the pair keeps *complies*: a size rule applied only by the run of the rule, and *violates*: a size rule added to `eslint.config.mjs` or the run widened to D-29's set, a function or a file added to the exceptions or given a limit of its own, each with no accepted change of the decision (the parts no test holds). The line `decision: D-425 "A function holds at most 200 lines of code and a file at most 800"` in the test stays a quotation of the binding sentences (`foundation_check.py` reports 0 errors).
2. **D-425 *Rationale*:** a sentence ("The coding template of the pinned process asks too for a test that runs apart from the linter's run") told what a tool of the process asks today, which the template of a decision keeps out of *Rationale*; removed. The reason of the separate run stays in the sentence before it.

## Entries written or changed

- Decisions: D-425 (edited in place, *Verification* and *Rationale*). Invariants, environment facts, glossary terms, part-map changes: none. Projected entries: none.

## Rows of *Settlements to record*

- Row 1 → D-425 (whole; compared with the code above; the cycle's choice Q4, the scope of D-29's linter, is in its binding sentences).
- Row 2 → invariant `function-and-file-size` (whole; Q1: marked violated, no exception for the set above a threshold, none split; Q3: the set is named in the comment at the marking of the test, not in the entry).
- Row 3 → D-426 (whole; claims hold).
- A choice that binds after the merge: the cycle's choices Q1, Q3 and Q4 are already in D-425 or the invariant or in the code's comment, so no second entry.

## Checks (own work)

- Requirement most likely missed: that D-425's *Verification* follows the method (the tests clause, no pair for a held part) and that no entry names the violating set. Check: read D-425 after the edit; `grep` of D-425, D-426 and the invariant for `startApp`, `createProgramsEntry`, `kitchen-sink`, `createGameView` finds none of them.
- `node tests/quality/eslint-size-rules.mjs` — exit 0, four reports (above); a focused check of the code against the entries, not the full gate.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (run after the edit and before the commit).
- No test run and no full gate (left to the orchestrator). `.the-way` stands at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the pinned commit.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md`, `elements/decisions/skill/SKILL.md`, `elements/environment-facts/template.md` and its `skill/*.md`, `elements/glossary/skill/SKILL.md` (head), `product-guidelines/coding/template.md` (the table "Files of this kind"): to settle *Verification*, the environment fact and the table of files.
- `guidelines/coding-browser-module.md` (head and the table, lines 1-110, and the examples near 235-275): the search of the foundation found it names files of the part.
- `eslint.config.mjs` whole, `src/browser/view/rule-drag.ts`, parts of `scene.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `program-panel.tsx`: for D-267 and D-425's scope.
- Fetched with `curl` the documentation of ESLint v10.12.0 (`max-lines-per-function.md`, `max-lines.md` from `raw.githubusercontent.com/eslint/eslint`) to decide on the environment fact; the two files were kept in `.runs/return-step/` and removed.

## Unread material

- Reports `executor-1-report.md` … `executor-6-report.md`, `review-whole-report.md`, `fix-minor-report.md`, `review-fix-report.md` and `plan.md`: not read (I compared the entries with the code and the foundation directly; the handoff said to read them, I did not). `foundation-entries-report.md` and `task-frozen.md` read whole.
- The diffs of `rule-list.tsx`, `rule-panel.tsx`, `program-panel.tsx`, `scene.tsx`, `scene-memory.ts` and `tests/transport.test.mjs` were read only where hooks, effects and cited names are concerned, not line by line.
- `.the-way/elements/glossary/skill/SKILL.md` read to its step 3 only (no entry was written).

## Searches not found or unclear

- None missing. Unclear: whether the behaviour of ESLint's size rules should be an environment fact (judged not, see above).

## Working copies

None remain. I made files in `.runs/return-step/` (two downloaded documentation pages), removed them and the directory.
