# Cycle record — loop2: test, który pilnuje, że części gry importują tylko z części dozwolonych w mapie

- Task source: the task's note in the author's private backlog (frozen copy: task.frozen.md beside this record; document `updated: 2026-11-08`, `Status: ready for cycle`)
- Task relation: independent
- Product repository: loop2 (github.com/mariusznazar/loop2)
- Process pin: `294af7fde45323ac1851c014a03071a97fc38d96` (gitlink equals the checkout; the task moves no pin)
- Target branch and base: main, `72287c2bd00c411929354bdb95949537adeb6dca`
- Task branch: task/test-granic-czesci
- Status: request open

## Two questions at start

- Trust boundary: no — the change touches tests, `foundations/*`, `guidelines/*` and one JavaScript test; none of the part map's trust-boundary patterns (`assets/icons|fonts|sprites/**`, `src/browser/sim/saved-game.ts`, `src/server/**`, `package-lock.json`, `scripts/audit_dependencies.py`, `scripts/kitchen-sink.mjs`, `scripts/local-start.mjs`, `deploy/**`) is changed.
- Irreversible operation: no — repository files only.

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: none — Settlements 1–3 and the answers to questions 1–6 settle the test's rules (what a test is, which import forms, an unmatched relative import fails), the invariant's sentence, the `simulation-isolation` sentence, and the moves of `file_owners` and of the `encounters` case. The remaining choices (identifier of the new part of test helpers, its *Depends on*, which part owns the new test file) follow from the part-map template's rules (WAY-44) and were left to the author, to name in its report.
- Reserved choice: none (no language, framework, library, store of data, way of logging in or place to run is chosen).
- Execution route and reason: one author without a plan. One Python test, one JavaScript test edit, a move of one function, a few foundation entries and two guideline lines fit one agent. The change spans several parts, so the author's class is `same` as the orchestrator's.
- Author: general-purpose subagent, class `same`, model `sonnet` (change across many parts), for its code, foundation entries and, resumed, for the fix of Minor findings and the return step. It was resumed twice (SendMessage); no replacement. Its tool refused every write of a report file ("subagents should return findings as text"), so the orchestrator saved its returned text as the report file (`author-report.md`, `fix-minor-report.md`, `return-step-report.md`), with a note on top.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: native completion notification of the Agent tool (background runs and background `npm test`); no smaller limit set by instructions.
- Whole-change review: reviewer other than the author, `review-change`, general-purpose subagent, sonnet; range `72287c2..628bd1b`, first line `PASS 628bd1bb74de5ef90128bde7066c48fcb51b5d4b`, report `review-whole-report.md`; changed files with added and removed lines: foundations/decisions.md +44 −0, foundations/invariants.md +13 −3, foundations/part_map.md +11 −1, guidelines/coding.md +1 −1, guidelines/testing.md +2 −1, tests/invariants/loop2_invariant_support.py +44 −1, tests/invariants/test_application_package_layout.py +1 −42, tests/invariants/test_browser_view_token_values.py +1 −2, tests/invariants/test_cross_part_imports.py +721 −0, tests/invariants/test_simulation_isolation.py +3 −3, tests/sim/encounters.test.mjs +1 −7. Coverage: every item of To do 1–6, settlement rows 1–3 and answers 1–6 met; source fidelity checked (verbatim `simulation-isolation` sentence; D-351 *Rejected* holds the five *Not chosen* ways). The reviewer ran four mutations in a scratch worktree; each failed for the stated reason. Blocking findings: none; Minor: 5.
- Review rounds: none blocked. Minor findings within the task (1, 4, 5 of the whole-change review) fixed in one fix, commit `842beb7` (range `628bd1b..842beb7`), reviewed once by the same reviewer: `PASS 842beb729dff9e465dda99c3a1e0250350d074b6` (`review-fix-minor-report.md`), one new Minor finding. The fix was not reverted. Return step commit `fff50e9` (range `842beb7..fff50e9`) reviewed: `PASS fff50e95bc59c635833f2742acca8c81b08fdd79` (`review-return-step-report.md`), two Minor findings.
- Weakest-point checks: author — requirement "read code, not strings" (the tokenizer could miss an import); compared the tokenizer's specifiers with an independent regex scan on 224 files, 221 equal, 3 differing only in template-string fixture text (author-report.md). Fix — docstring quote against the invariant text (fix-minor-report.md). Return step — whether an entry still places the helper in `build-tools` (return-step-report.md).

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

One-author route; no slices.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-11-08 | Start | orchestrator (Sonnet 5.5) | task.frozen.md; worktree created from `72287c2` with `git worktree add --no-track`; node_modules and .runs/quality-venv linked by junction to the main checkout | — | base checks: `npm test` exit 0 and `foundation_check.py` 0 errors; next: dispatch the author |
| 2026-11-08 | One author | general-purpose subagent, sonnet (class same) | reports/handoff-author.md; skill `make-change`, variant "the whole change as the one author" | reports/author-report.md | done with concerns; commits c3e27c7, 30afe4d, d858d14, 628bd1b (head 628bd1b); the report's write was refused by the agent's tool, the orchestrator saved the returned text; mechanical check: clean worktree, non-empty range, 11 files changed, commands and exit codes present, Searches section present, own-work check present; next: whole-change review |
| 2026-11-08 | Whole-change review | general-purpose subagent, sonnet | reports/handoff-review-whole.md; skill `review-change`, range 72287c2..628bd1b | reports/review-whole-report.md | PASS 628bd1b; 0 blocking, 5 Minor (findings 1, 4, 5 within the task and fixed; 2, 3 outside); next: fix of Minor findings |
| 2026-11-08 | Fix of Minor findings | the author, resumed | reports/findings-minor-whole.md; skill `make-change`, variant "the fix of a review's findings" | reports/fix-minor-report.md | done; commit 842beb7; finding 1 fixed as `Rests on: TODO` (a descriptive TODO fails `foundation_check.py`), findings 4 and 5 fixed; next: review of the fix |
| 2026-11-08 | Review of the fix | the same reviewer, resumed | range 628bd1b..842beb7 | reports/review-fix-minor-report.md | PASS 842beb7; one new Minor; next: the gate |
| 2026-11-08 | Gate | orchestrator | `npm test` on 842beb7 | reports/gate-npm-test.txt | exit 0; next: return step |
| 2026-11-08 | Return step | the author, resumed | reports/handoff-return-step.md; `task-cycle/skill/return_step.md` | reports/return-step-report.md | done; commit fff50e9 (D-28 and D-30 *Scope*, D-30 sentence and `ruff-source-rules` *Part* name `test-helpers`); next: review |
| 2026-11-08 | Review of the return step | the same reviewer, resumed | range 842beb7..fff50e9 | reports/review-return-step-report.md | PASS fff50e9; two Minor; next: reconciliation with the target branch, gate again, request |
| 2026-11-08 | Reconciliation | orchestrator | `git fetch`, `git merge origin/main` | — | origin/main is still 72287c2; "Already up to date"; no merge commit, no review needed |
| 2026-11-08 | Gate again | orchestrator | `npm test` on fff50e9 (the tree differs from the one gated at 842beb7 by the return step's two foundation files) | reports/gate2-npm-test.txt | see *Verification* |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q1 | Class of the one author (step 4) | `same`, sonnet | the change spans six parts; the test reads three languages | `cheaper` (haiku) | a worse test, caught by the review, one fix round | One author |
| Q2 | Identifier and place of the part of test helpers; *Depends on* `none`, *Trust boundary* `none`, holds only `tests/invariants/loop2_invariant_support.py` (author's choice, WAY-44) | `test-helpers` | `foundations/part_map.md`, author-report.md "Choices made"; the reviewer found it met To do 2 | other names | a rename touches the map, D-351, the invariant, both guidelines and the test's `HELPER_PART` constant | One author |
| Q3 | Which part owns the new test file | `build-tools`, listed beside `test_application_package_layout.py` | author-report.md; the reviewer judged the unchanged `build-tools` sentence not a finding | `tests/quality/`; a new part | a move of one file and one map line | One author |
| Q4 | Identifier of the invariant | `cross-part-imports`, the same as the-way's own | author-report.md; the reviewer: not a finding, separate foundations | a different name | a rename in the entry, D-351 and the test | One author |
| Q5 | `Rests on` of the new invariant | bare `TODO` (the fix) | fix-minor-report.md: a descriptive TODO fails `foundation_check.py`; no official source for git's matching read in the session, WAY-80 | an invented environment fact; `none` | the human records `git-path-patterns` for loop2 later | Fix |
| Q6 | Widen the testing-decision family's *Scope* to `test-helpers` | no, reported | return-step-report.md "What was left"; the reviewer agreed | widening about 40 decisions | a later sweep | Return step |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| Frozen task | docs/task-cycles/test-granic-czesci/task.frozen.md | orchestrator | — |
| Code and foundation commits | `c3e27c7`, `30afe4d`, `d858d14`, `628bd1b` | one author | PASS 628bd1b |
| Fix of Minor findings | `842beb7` | one author | PASS 842beb7 |
| Return step | `fff50e9` | one author | PASS fff50e9 |
| Reports | reports/author-report.md, fix-minor-report.md, return-step-report.md, review-whole-report.md, review-fix-minor-report.md, review-return-step-report.md | agents | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base) | orchestrator, `72287c2`, worktree | exit 0, "0 errors" (reports/base-foundation-check.txt) | none |
| `npm test` (base) | orchestrator, `72287c2`, worktree | exit 0; 2005 Node tests pass, 412 Python tests in 4 directories pass (3 skipped), ends with `0 errors` of the foundation check, so the one command runs `foundation_check.py` (reports/base-npm-test.txt) | none failing on the base; 3 container tests skipped (no Docker daemon) |
| `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`, failing run 1 | author, before the map edit and the fixes | exit 1, 32 failures: 30 imports of `loop2_invariant_support` from simulation (22) and browser-view (8) tests, the `encounters.test.mjs:19` import of the view, the new file claimed by no part | — |
| same, failing run 2 | author, after the part and the `file_owners` move | exit 1, only the `encounters.test.mjs:19` import | — |
| same, passing run | author, after the commits | exit 0, 10 tests | — |
| mutations of the new test (four, in a scratch worktree) | reviewer, `628bd1b` | exit 1 each, for the stated reason | — |
| `npm test` (gate) | orchestrator, `842beb7`, worktree | exit 0; every directory passed; 254 tests in `tests/invariants` (244 on the base, +10); 3 skipped as on the base; ends with `0 errors` (reports/gate-npm-test.txt) | none |
| `npm test` (gate again, final code tree) | orchestrator, `fff50e9`, worktree | exit 0; every directory passed: 2005 Node tests, 13 agent-workflow, 115 deploy, 254 invariant and 40 quality Python tests (422 in 4 directories); 3 container tests skipped as on the base; ends with `0 errors` (reports/gate2-npm-test.txt) | none |
| process remarks check, original (last run) | orchestrator | `python -B task-cycle/remarks_check.py docs/task-cycles/test-granic-czesci`: first run exit 1 listing 18 items (appended to the process remarks), second run exit 0, "6 reports, 18 items other than none, 0 not in the process remarks"; 2 runs | none |
| process remarks check and private paths check, copy (last runs) | orchestrator | `private_paths_check.py` and `remarks_check.py` on `docs/task-cycles/test-granic-czesci`: the last runs and their counts stand in the description of the request, *Checks* (the record cannot hold the runs on its own committed copy) | none |
| request form check and private paths check, description (last runs) | orchestrator | `request_check.py` (with `--task`) and `private_paths_check.py` on `request.md`: exit 0 and exit 0, 0 listed; the counts of runs stand in the description of the request, *Checks* | none |

## Return step

- Foundation compared with code: D-351, the invariant `cross-part-imports`, `simulation-isolation`, the part `test-helpers`, WAY-299, WAY-44, D-04, D-83 and the entries a search for `loop2_invariant_support`, `file_owners`, "import" and "part map" found (D-266, D-28, D-30 and others), and the part map. Mismatch found and corrected: D-28 *Scope*, D-30 binding sentence and *Scope*, `ruff-source-rules` *Part* did not name `test-helpers`, which now holds a Python file Ruff checks. Not corrected, reported: three entries that concern Bash or `.mjs` files (no mismatch), the testing-decision family (about 40 decisions), D-49 (found by the reviewer of the return step).
- Decisions written or changed: D-351 (written, row 1); D-28 and D-30 (changed by the return step).
- Invariants written or changed: `cross-part-imports` (written; set by row 2 and WAY-299); `simulation-isolation` (changed; row 3); `ruff-source-rules` (*Part*; the return step).
- Environment facts: none written; the invariant's *Rests on* reads `TODO` because loop2 holds no `git-path-patterns` fact.
- Glossary terms: none.
- Part-map changes: `test-helpers` (added, task To do 2; identifier and shape the author's choice).
- Projected entries written whole or in part: none.
- Rows of *Settlements to record* written: row 1 — D-351; row 2 — `cross-part-imports`; row 3 — `simulation-isolation`.

The return step corrects in the same change whatever no longer matches. It writes an invariant
only for a rule the task, a decision or the human sets, never for behaviour merely because no
invariant covers it.

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/70 (draft until the record is committed, then ready)
- Description: `request.md` beside this record, written by `task-cycle/skill/request_template.md`; written and checked after this commit
- Writes to the task's backlog entry: the request link and state, as the final report names
- Process remarks on the-way:
  - One author, docs/task-cycles/test-granic-czesci/reports/author-report.md: **Environment fact for git's path-pattern matching.** The-way's `cross-part-imports` rests on `git-path-patterns`, which exists only in the-way's environment facts. loop2's `foundations/environment_facts.md` has no such entry, and `foundation_check.py` reads only the product's own. The new invariant therefore reads `Rests on: none`, as the sibling `application-package-layout` does. Strictly, git's matching is probably a fact it rests on. Recording one needs `the-way-record-environment-fact` and a read of the git docs, which is outside the task's three settlements. This is open for the reviewer or the human.
  - One author, docs/task-cycles/test-granic-czesci/reports/author-report.md: **Unreviewed wording.** The `build-tools` sentence was left unchanged, though it mentions neither the boundary test nor the package-layout test. It is unclear whether the reviewer wants it reworded.
  - One author, docs/task-cycles/test-granic-czesci/reports/author-report.md: **Unverified mapping.** `BUILT_FROM` maps `dist/kitchen-sink/<x>` to `src/browser/<x>` from the tsconfig's inherited `rootDir`, but the output was not built here to verify it. An import from that folder would fail loudly, not pass.
  - One author, docs/task-cycles/test-granic-czesci/reports/author-report.md: **Unreadable `sys.path` addition.** `scripts/test.py:24` adds a directory from a run-time value, which cannot be read statically. The test treats it as adding nothing and says so in its docstring. Nothing depends on it today.
  - One author, docs/task-cycles/test-granic-czesci/reports/author-report.md: **Run command.** `python -B scripts/test.py <file>.mjs` directly fails with `KeyError: 'npm_execpath'`. D-77's form `npm test -- <file>` works.
  - Fix of Minor findings, docs/task-cycles/test-granic-czesci/reports/fix-minor-report.md: The checker accepts only a bare `TODO` in *Rests on*, while the invariants template shows `TODO — <the fact, with its source>`. The template and `foundation_check.py` disagree; I did not resolve that.
  - Fix of Minor findings, docs/task-cycles/test-granic-czesci/reports/fix-minor-report.md: The `git-path-patterns` fact for loop2 is still unwritten.
  - Return step, docs/task-cycles/test-granic-czesci/reports/return-step-report.md: The reviewer listed D-28 (`foundations/decisions.md:696`), D-30 (`:724`) and the invariants at `foundations/invariants.md:426`, `:436`, `:586` and `:1196`. I decided them one by one, as above.
  - Return step, docs/task-cycles/test-granic-czesci/reports/return-step-report.md: It is unclear whether the human wants the testing-decision family widened (see "What was left"). It is reported, not decided.
  - Return step, docs/task-cycles/test-granic-czesci/reports/return-step-report.md: The `Rests on: TODO` gap of `cross-part-imports` is unchanged.
  - Review of the fix, docs/task-cycles/test-granic-czesci/reports/review-fix-minor-report.md: Why the pinned the-way template shows `TODO — <the fact, with its source>` for *Rests on* while `foundation_check.py` rejects it: I did not find which of the two is meant to hold; I only showed they disagree at the pin `294af7f`.
  - Review of the fix, docs/task-cycles/test-granic-czesci/reports/review-fix-minor-report.md: No loop2 environment fact for git's path-pattern matching exists, as before; nothing in the fix adds one.
  - Review of the return step, docs/task-cycles/test-granic-czesci/reports/review-return-step-report.md: I found no rule in `return_step.md` or in the part-map skill that says whether a part's new *Scope* membership must be swept across decisions that merely describe a moved file; the report's "no rule of the return step requires it" matches what I read.
  - Review of the return step, docs/task-cycles/test-granic-czesci/reports/review-return-step-report.md: Not found: any other entry beyond D-49 that describes the helper without naming its file. The search was by phrases of its behaviour, not a full read of the log.
  - Whole-change review, docs/task-cycles/test-granic-czesci/reports/review-whole-report.md: No entry `git-path-patterns` in loop2's `foundations/environment_facts.md`; unclear whether the task intended the new invariant to rest on it (finding 1).
  - Whole-change review, docs/task-cycles/test-granic-czesci/reports/review-whole-report.md: No rule found in the part-map skill or template saying that adding a part requires revisiting the *Scope* of decisions and the *Part* of invariants that name every other part one by one; unclear whether it is expected (finding 2). `foundation_check.py` does not flag it.
  - Whole-change review, docs/task-cycles/test-granic-czesci/reports/review-whole-report.md: The task's *Context* names `.the-way/elements/part-map/test_cross_part_imports.py` as the pattern; the dispatch said the author's `Rests on` choice was left to me, but not whether `Rests on: TODO` is accepted by the cycle's checks. `foundation_check.py` lists *Rests on* neither among the fields that must not read `TODO` nor `none`, so `TODO` appears allowed; I did not run it with `TODO`.
  - Whole-change review, docs/task-cycles/test-granic-czesci/reports/review-whole-report.md: I did not find a statement of whether `/// <reference path>` or `import x = require()` in TypeScript are meant to count as imports; D-351 and question 2 say neither, the test ignores both, and no file of the repository uses them (not exhaustively searched).
