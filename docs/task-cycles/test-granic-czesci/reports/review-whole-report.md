PASS 628bd1bb74de5ef90128bde7066c48fcb51b5d4b

# Review of the whole change (review-change, variant: the whole change)

Range `72287c2..628bd1b` (4 commits: `c3e27c7`, `30afe4d`, `d858d14`, `628bd1b`). `git rev-parse HEAD` in the
worktree is `628bd1bb74de5ef90128bde7066c48fcb51b5d4b`, as given. Route: one author, no plan, no slices, no spec.
Counts: blocking 0, Minor 5 (4 within the task, 1 outside), out-of-scope 1 (the same one counted among the Minor).

## Findings

### Critical

none

### Important

none

### Minor

1. **Invariant `cross-part-imports` reads `Rests on: none`** — `foundations/invariants.md:1239-1247` (the entry), compare
   the-way's twin at `.the-way/foundations/invariants.md:308-316` (`Rests on: git-path-patterns`). The test gives
   every file its part by matching the part map's *Files* patterns with git (`file_owners`, `tests/invariants/loop2_invariant_support.py:73`),
   so git's attribute-pattern rules decide which part a file is in, and with it whether a commit makes the sentence
   true. The invariants template says *Rests on* names every environment fact holding such a condition and that
   "a link the author knows is missing reads `TODO` rather than `none`" (WAY-17, WAY-73;
   `.the-way/elements/invariants/template.md:119-123`). The author's own report says git's matching is "probably" a fact
   it rests on, so `none` states something the author doubts. Why it does not block: loop2's `foundations/environment_facts.md`
   has no `git-path-patterns` entry, so recording one is a separate step (`the-way-record-environment-fact`) that the
   task's three settlements do not carry; the sibling `application-package-layout` (`foundations/invariants.md:75-83`)
   rests on the same `file_owners` and reads `none` too; nothing breaks if it stays. Fix: record the fact and name it,
   or write `TODO — git's matching of attribute-file path patterns` until it is. Within the task (it is an entry the
   change writes).

2. **The new Python file of `test-helpers` falls out of the entries that name parts one by one** — `foundations/decisions.md:696`
   (D-28 *Scope*), `foundations/decisions.md:724` (the Ruff decision's sentence names "browser-view, simulation, account-server,
   build-tools, deployment and agent-workflow"), `foundations/invariants.md:426`, `:436`, `:586`, `:1196` (*Part* lists of the
   same six parts). `tests/invariants/loop2_invariant_support.py` was in `build-tools`, which those entries name; it is now in
   `test-helpers`, which none of them names. Effect: the Ruff check still runs over it (`tests scripts`), so nothing is
   unprotected today, but the sentence "every `.py` file Ruff finds in <six parts> passes" no longer covers it, and an agent
   that selects entries by the part of the file it changes (`test-helpers`) will not be handed the Ruff, ESLint, Prettier
   and test-selection entries (the coding guideline is handed over, because item 6 added the part to its *Applies to*).
   Evidence: `git grep -n "Part:.*agent-workflow$" foundations/invariants.md` lists four entries without `test-helpers`;
   `foundation_check.py` does not flag it. **Outside the task** as written: the task's *To do* names the guidelines'
   *Applies to* (item 6) but no decision *Scope* or invariant *Part*; I list it so the orchestrator or the human decides
   whether to widen those fields now or in a task of their own. Not blocking.

3. **Tokenizer duplicates the segmenter of `test_simulation_isolation.py`** — `tests/invariants/test_cross_part_imports.py:69-177`
   against `tests/invariants/test_simulation_isolation.py:115-246`. Two hand-written readers of comments, strings,
   templates and regular expressions of TypeScript and JavaScript now exist, and a fix to one will not reach the other.
   The author's reason (importing the other test would be a forbidden test-to-test import) holds for the import, but the
   segmenter could have moved to the shared helpers like `file_owners` did. Mitigation I verified: nine controls on made-up
   files (forms, comments, strings, templates, regular expressions, member `.import`) and the author's own comparison with
   a regex scan on 224 files; I found no import the tokenizer misses. Minor, polish; **outside the task** (the task asks for a
   reader of code, not for its sharing).

4. **Three blank lines before the controls section** — `tests/invariants/test_cross_part_imports.py:527-530`. Ruff
   passes; style only. Within the task.

5. **Docstring of the test paraphrases the invariant** — `tests/invariants/test_cross_part_imports.py:1-5` says "the *Depends on* of
   its part" where `foundations/invariants.md:1240` says "of the importing file's part", and omits "No file of a part
   imports a file of another part" wording identity. The meaning is the same; the sibling `test_simulation_isolation.py`
   quotes its entry word for word. Within the task, polish.

## Points the dispatch left for the reviewer

- **(a) `Rests on: none`.** Judged in finding 1: Minor, not blocking.
- **(b) The `build-tools` sentence was not reworded.** Not a finding. It reads "...checks code quality and types, audits
  introduced dependency versions, builds and launches the application ..."; a repository-wide import check is code quality,
  and the same sentence already carries seven other invariant tests of `build-tools` (`foundations/part_map.md:100-110`) with no
  mention. WAY-44 asks for the sentence of a part to describe its responsibility, not to list its tests.
- **(c) The identifier equals the-way's own `cross-part-imports`.** Not a finding. The two foundations are separate files;
  `foundation_check.py` reports 0 errors; the product's entry names its own decision (D-351) and test.
- **(d) Docstring edit in `tests/invariants/test_simulation_isolation.py:1-3`.** Not a finding. The docstring quotes the
  sentence of the invariant; the diff changes only that quotation to the new verbatim sentence (`git diff` shows the
  3-line hunk, no logic). Leaving the old quotation would have made the test's own header contradict the foundation. The test
  reads only `src/browser/sim/` and `dist/browser/sim/`, so "outside `tests/`" is true of what it does.
- **(e) 721-line test with its own tokenizer.** Judged in finding 3, and by the mutation checks below.
- **(f) `BUILT_FROM` mapping of `dist/kitchen-sink/...`.** Verified by reading config, not unverified:
  `tsconfig.kitchen-sink.json` extends `tsconfig.browser.json` (`rootDir: src/browser`) and sets `outDir: dist/kitchen-sink`,
  so `dist/kitchen-sink/<x>` comes from `src/browser/<x>`, as `tests/invariants/test_cross_part_imports.py:59-60` maps it.
  `dist/browser` -> `src/browser` (`rootDir src/browser`) and `dist/server` -> `src/server` (`rootDir src/server`) also match.
  I did not build the kitchen-sink output; an import from that folder that the mapping misses would fail the check, not pass it.

## Coverage of the task

- *To do* 1: invariant `cross-part-imports` (*Part* `every`, *Method* `test`, *Violated* `no`, *Derives from* D-351) at
  `foundations/invariants.md:1239`; its test `tests/invariants/test_cross_part_imports.py` reads the part map, assigns files with
  `git check-attr` (`support.file_owners`), reads TypeScript/JavaScript/Python imports. Met.
- *To do* 2: part `test-helpers` at `foundations/part_map.md:171-179` (sentence says what it holds and that the tests of every part
  may import it and code that is no test may not; *Files* `tests/invariants/loop2_invariant_support.py`, *Depends on* `none`,
  *Trust boundary* `none`); the file left `build-tools`. Met.
- *To do* 3: `file_owners` moved to `tests/invariants/loop2_invariant_support.py:73`; the package-layout test and the view token test
  call `support.file_owners`; `test_browser_view_token_values.py` no longer imports a build-tools test. Behaviour of the moved
  function unchanged (same pattern writing, same `git check-attr` call, same overlap error); both tests pass. Met.
- *To do* 4: `tests/sim/encounters.test.mjs` no longer imports the view; the case at line 174 asserts
  `attacked.run.current?.stepTo ?? null` equals `null`. This is the same condition the removed assertion tested (the view draws
  the `stepTarget` outline only when `run.current?.stepTo` is set, `src/browser/view/terrain-picture.ts:119`), and the view side stays
  under `tests/view/terrain-picture.test.mjs:195`. Met.
- *To do* 5: the `simulation-isolation` sentence equals row 3 of *Settlements to record* word for word (checked against the task text and
  the diff of `foundations/invariants.md`). Met.
- *To do* 6: `guidelines/coding.md:4` and `guidelines/testing.md:4` list `test-helpers`; the author also added the row the testing
  table of parts needs (`guidelines/testing.md:34`). Met.
- *Settlements* row 1 (decision): D-351 (`foundations/decisions.md:7825-7867`). Its sentence holds: every file under `tests/` counts as a test,
  the languages and import forms, no process launches, no HTML/CSS, the failure of an unmatched relative import with file and line,
  `dist/` matched to `src/`, packages as no part's file. *Rejected* holds all five *Not chosen* ways of questions 1-3 (1b, 1c, 2b, 3 A2,
  3 B2), with file names made generic. Faithful.
- *Settlements* row 2 (invariant): sentence equals the task's wording (Depends on / tests + helper part / `Violated: yes` pair). Faithful.
- *Settlements* row 3: see *To do* 5.
- Answers 1-6: 1a (any file under `tests/` is a test: `refusal`, `importer.startswith("tests/")`), 2a (no process launches), 3 A1/B1
  (no HTML/CSS; unmatched relative import fails with file and line; `dist/` mapped), 4a, 5a, 6a. All met.
- Nothing added that nobody asked for, apart from the testing-table row (needed by the template, the author names it).
- No reserved choice taken (Python `ast` and the standard library only; no new package).
- Trust boundary: none touched (answered no at dispatch; `foundations/part_map.md` trust-boundary patterns unchanged).

## Against the foundation and the guidelines

- Foundation: `python -B .the-way/elements/common/foundation_check.py` reports 0 errors. D-351 *Based on* `none`, *Relations* `none`
  (WAY-263 check: the invariant's sentence restates the decision's rule without widening: it names the same three exceptions).
  *Verification* of D-351 names the invariant and gives complies/violates examples that match the test's behaviour (confirmed by
  the mutation runs).
- Changed invariant tests named: `tests/invariants/test_simulation_isolation.py` (docstring only, no logic); the new
  `tests/invariants/test_cross_part_imports.py`.
- `guidelines/testing.md`: *Where the expected value comes from* - the controls write expected failures out as literals; the real run
  expects `[]`, which is the invariant itself. *Test files in the gate* - the file is `test_*.py` in `tests/invariants/`, a directory the
  Python runner selects (`Ran 10 tests`). *Changing an existing test* - the `encounters` change has its cause named in the task
  (question 4) and keeps the check (see *To do* 4). *Trust boundaries* - not touched.
- `guidelines/coding.md`: Ruff passes on `tests scripts`; no suppression comments in the new file.
- No guideline rule without invariant that the change reaches was departed from.

## Tests: do they fail when the behaviour breaks

Mutation runs in a separate worktree of `628bd1b` (not the reviewed one):

| Mutation | Result |
|---|---|
| re-add `import { terrainPicture } from "../../dist/browser/view/terrain-picture.js"` to `tests/sim/encounters.test.mjs` | test fails: `tests/sim/encounters.test.mjs:17 imports '../../dist/browser/view/terrain-picture.js' (src/browser/view/terrain-picture.ts): the part simulation does not list the part browser-view in Depends on` |
| new `src/browser/sim/zz_new.ts` importing `../view/terrain-picture.js` | fails with the file, line, target and reason |
| new `scripts/zz_new.py` adding `tests/invariants` to `sys.path` and importing `loop2_invariant_support` | fails: build-tools does not list test-helpers |
| new `src/server/zz.ts` with `import("../../tests/invariants/x.mjs")` of a missing file | fails: "matches no file git lists" |

Each failed for the stated reason; the unmodified head passes. Nine controls cover the reading of each import form, comments/strings
/templates/regular expressions giving no import, packages, built files, unmatched relative imports, the part map and the
accepted-violation pairs, Python forms and `sys.path` additions.

## Author's own-work check

The author named "read code, not strings" (the tokenizer could silently miss an import) as the most likely unmet requirement and
compared the tokenizer's specifiers with an independent regex scan over 224 files (221 equal, 3 differing only in template-string
fixtures). That check fits where the change is weakest and would have shown a miss. I confirmed the result indirectly with the mutations
above and the controls; I did not find a missed import form. The gaps the docstring lists (`require`, `import()` of a non-literal,
process launches, HTML/CSS, `/// <reference>`) are the task's declared exclusions (question 2, question 3) except the triple-slash
reference and `import x = require(...)`, which the decision does not mention either way.

## Declined to judge

- Process launches of another part's file from a test (`tests/view/memory-limit.test.mjs:10` runs `scripts/test-node-file.mjs`): settled by question 2a, not checked on purpose.
- HTML and CSS references: settled by question 3 A1.
- Whether `Part`/`Scope` fields of existing entries should say `every` or name `test-helpers` (finding 2 raises the fact; the decision is the human's).
- Whether the full gate selects the new file in `npm test` (the cycle's own full run).

## Checks I ran

| Command | Exit |
|---|---|
| `git rev-parse HEAD` (in the worktree) | 0, `628bd1bb74de5ef90128bde7066c48fcb51b5d4b` |
| `git log --oneline 72287c2..HEAD`; `git diff --stat 72287c2..HEAD`; `git diff 72287c2..HEAD -- <foundation, guideline, support, changed tests>` | 0 |
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` (reviewed worktree) | 0, 10 tests OK |
| same, four times in a scratch worktree of `628bd1b`, each with one mutation (table above) | 1 each, for the stated reason |
| `python -B scripts/test.py tests/invariants/test_application_package_layout.py` (scratch worktree, unmodified head) | 0 |
| `python -B scripts/test.py tests/invariants/test_browser_view_token_values.py` (scratch worktree, unmodified head) | 0 |
| `npm test -- tests/sim/encounters.test.mjs` (scratch worktree with the real `node_modules` linked) | 0, 29 tests pass |
| `ruff check --config ruff.toml --ignore-noqa --no-fix --no-cache tests scripts` (scratch worktree, unmodified head, ruff from the reviewed worktree's venv) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0, "0 errors" |

Not run: the whole `npm test` (the orchestrator's), the whole `tests/invariants` directory, `tests/quality/test_quality_invariants.py`
(Ruff run on its own instead), mutation tooling (the changed simulation file is a test), `ui_check.md` (no user interface changed).
The scratch worktree was removed afterwards; the reviewed worktree, its index and branch were not changed (`git status --short` empty).

## Reaches beyond the dispatch

- `.the-way/elements/invariants/template.md:110-135` and `.the-way/foundations/decisions.md` (WAY-17 entry): to judge the *Rests on* link rule (finding 1).
- `.the-way/foundations/invariants.md:308-316` and `.the-way/foundations/environment_facts.md:6`: the-way's twin and the `git-path-patterns` fact (finding 1).
- `.the-way/elements/part-map/template.md:60-125`: the sentence rule for a part of test helpers and the allowed-dependencies text.
- `tsconfig.browser.json`, `tsconfig.server.json`, `tsconfig.kitchen-sink.json`: point (f).
- `src/browser/view/terrain-picture.ts:105-135`, `src/browser/sim/run.ts` (grep of `stepTo`): the equivalence of the replaced assertion.
- `tests/invariants/test_simulation_isolation.py:1-30` and `:115-246`: point (d) and finding 3.
- `foundations/decisions.md:690-700`, `:720-726`, `foundations/invariants.md:420-440`, `:580-588`, `:1190-1198`: finding 2.
- `the folder of the task notes in the author's private backlog`: the vault path in D-351's *Origin* exists (`zadanie_loop2_test_granic_czesci.md`).

## Searches not found or unclear

- No entry `git-path-patterns` in loop2's `foundations/environment_facts.md`; unclear whether the task intended the new invariant to rest on it (finding 1).
- No rule found in the part-map skill or template saying that adding a part requires revisiting the *Scope* of decisions and the *Part* of invariants that name every other part one by one; unclear whether it is expected (finding 2). `foundation_check.py` does not flag it.
- The task's *Context* names `.the-way/elements/part-map/test_cross_part_imports.py` as the pattern; the dispatch said the author's `Rests on` choice was left to me, but not whether `Rests on: TODO` is accepted by the cycle's checks. `foundation_check.py` lists *Rests on* neither among the fields that must not read `TODO` nor `none`, so `TODO` appears allowed; I did not run it with `TODO`.
- I did not find a statement of whether `/// <reference path>` or `import x = require()` in TypeScript are meant to count as imports; D-351 and question 2 say neither, the test ignores both, and no file of the repository uses them (not exhaustively searched).
