PASS 6cc9048489598d800bcd05b5234d5a9a81a43be6

# Review — the return step's commit of task `struktura-kodu`

Range `2b9b2cd3910357de5fcf836e07e9e149d7d43573..6cc9048489598d800bcd05b5234d5a9a81a43be6`, one commit (`6cc90484`), touching `foundations/decisions.md`, D-425 only. `git rev-parse HEAD` in the worktree is `6cc9048489598d800bcd05b5234d5a9a81a43be6`, the head given; `.the-way` stands at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.

Blocking findings: 0. Minor: 2. Out of scope: 0.

## What the commit changes (computed with `git diff --word-diff=porcelain`)

- *Verification* of D-425: the clause `tests:` added; the *complies* example "a change that brings a function under 200 lines by moving a part of it into a function or a file of its own, with the run of the rule reporting nothing for it" removed; "or a limit raised for it" reworded to "or given a limit of its own"; "the part no invariant holds" to "the part no invariant and no test holds".
- *Rationale* of D-425: the one sentence "The coding template of the pinned process asks too for a test that runs apart from the linter's run." removed.
- Nothing else of the entry changed: the binding sentences, *Scope*, *Based on*, *Relations*, *Origin*, the rest of *Rationale* and *Rejected* are byte-identical to the base.

## Judgement against what the handoff names

- **The clause `tests:` against the test** (`tests/quality/test_function_and_file_size.py`, `tests/quality/eslint-size-rules.mjs`):
  - thresholds 200 and 800: the control case reports a function and a file at 201 and 801 and not at 200 and 800 (`over-function.ts`, `over-file.ts`, `at-function.ts`, `at-file.ts`); held.
  - lines counted without comments and blank lines: `padded_function_source` (200 lines of code plus 40 lines of comments and blanks) and `file_source(800, blank_and_comment=80)` are not reported; held.
  - lines of a nested function counted in the holder: `nested.ts` (201 in all, 79 of them a nested function) is reported as 201; were the nested lines not counted it would be 122 and the control would fail; held.
  - the limit on a function reaching the application, the tests and agent-workflow: `src/browser/view/*`, `src/server/*`, `tests/over-function.test.mjs`, `.claude/hooks/over-hook.js` reported; the files come from `eslint.config.mjs` itself (`lintedPatterns`), and `elsewhere/big.mjs` and `dist/big.js` are not reported; held. The scripts: see Minor 2.
  - the limit on a file off in the tests: `tests/over-file.test.mjs` (801) not reported while `scripts/over-file.mjs` (801) is; held.
  - the two exceptions whole and no other: `saved-game.ts` (801) not reported; `accountRoutes` in `account-routes.ts` not reported, `otherRoute` in the same file and `accountRoutes` in `other-routes.ts` reported; held, with the edge of Minor 2.
- **The pair keeps only what no test holds:** the removed *complies* example (a function brought under 200 with the run reporting nothing) is what the first case holds once its marking comes off, and the thresholds the control holds. What stays is not held by any test: a size rule kept out of `eslint.config.mjs` and the run kept off D-29's rule set (D-29 itself says "review keeps its rules to those sets", and the withdrawn invariant `eslint-configuration-rules` says no cheap test checks it), and an exception added to the run's configuration or a limit of its own given to one function or file (the control holds a raised global threshold, since `over-function.ts` at 201 would go unreported, but not a per-file override or a further named exception). The reword "raised for it" to "given a limit of its own" narrows the example to exactly that unheld part; it changes no meaning of the decision. Matches the template (`.the-way/elements/decisions/template.md:245-250`) and the return step's method (`.the-way/task-cycle/skill/return_step.md:16-18`).
- **The removed *Rationale* sentence:** rightly removed. The template keeps out of author-written *Rationale* "what the process's own tools do or lack today" (`.the-way/elements/decisions/template.md:74-78`); the sentence stated what the pinned coding template asks today (it does: `.the-way/product-guidelines/coding/template.md:243-246`, "Its test stands in the product's suite and runs apart from the linter's run"), quoting no source of the task's row. The reason of the separate run that is the product's own stays in the sentence before it (D-29 holds one rule set; the expected failure would take the linter's whole check off the gate). The template's line that a decision whose sentence a test holds "keeps its *Rationale* and *Rejected* whole" (`template.md:251-252`) protects reasons from going because a test holds the sentence; this removal is on another ground, so it does not breach it. *Rejected* still names the template of the pinned process twice, but there it carries the ways not chosen with the cost the row's source keeps (task, *Questions to settle*, "inna miara … wymaga zapisanego odstępstwa", "bez limitu pliku … potrzebne jest odstępstwo"), which `template.md:82-87` allows.
- **Against the task** (`task-frozen.md`, *Settlements to record* row 1): D-425's binding sentences carry the thresholds, the counting, the scope, the two exceptions and the separate run; the commit alters none of them.
- **Against Q1, Q3, Q4** (`reports/review-whole-handoff.md:36-38`): D-425 and the invariant `function-and-file-size` name none of `startApp`, `createProgramsEntry`, `build`, `kitchen-sink.tsx` or `createGameView` (Q1, Q3: the set stands only in the comment at `tests/quality/test_function_and_file_size.py:138-143`); the scope sentence of D-425 reaches every file D-29's linter lints and the file limit the same files outside `tests/` (Q4). The clause `tests:` follows Q4.
- **Invariant `function-and-file-size`** (`foundations/invariants.md:1408-1416`): unchanged by the range; *Derives from* D-425, *Violated* `yes`, matching the expected failure.
- **D-28, D-29:** unchanged; D-425's *Relations* `derives from D-28` and the D-29 clause of the *violates* example still match them.
- **Return-step claims checked cheaply:** the run of the rule at the head reports exactly the four the report names (below); the foundation check reports 0 errors.

## Findings

### Critical

none

### Important

none

### Minor

1. **`foundations/decisions.md:833` with `tests/quality/test_function_and_file_size.py:147` — the clause `tests:` names parts of two sentences that no line `decision:` quotes.** The clause says the test holds the scope ("the limit on a function reaching …", sentence 2 of the first paragraph) and the exceptions ("the two exceptions standing whole and no other", the second paragraph), but the test carries one line, `# decision: D-425 "A function holds at most 200 lines of code and a file at most 800"`, which quotes sentence 1 only. The template has a test that holds a sentence carry a line `decision:` beside it (`template.md:232-240`) and the skill names tests in the clause "once their lines `decision:` stand" (`.the-way/elements/decisions/skill/SKILL.md:34-35`); the repository has more than one line per test where a test holds more than one sentence (`tests/sim/data.test.mjs:206-207`). Why Minor: the content of the clause agrees with the code — the control case does hold these parts — and `foundation_check.py` counts a decision as held by any line naming its number (`.the-way/elements/common/foundation_check.py:82-88`), so no check and no reader goes wrong; a later change that rewrites the scope or the exceptions sentence leaves no quotation to mismatch, which is the cost. The fix would be two more lines `decision: D-425 "The limit on a function covers every file …"` and `decision: D-425 "Two exceptions stand whole over a threshold …"` at the test (a test file, outside this commit). Evidence: `grep "decision: D-425"` over the repository finds the one line at `:147`.
2. **`foundations/decisions.md:833` — two edges of the clause are held only by construction, not by a case of the control.** (a) "the limit on a function reaching … the scripts": the control has no function in `scripts/`, only `scripts/over-file.mjs` for the file limit; the function limit reaches the scripts because both rules sit in one entry of the run's configuration (`eslint-size-rules.mjs:66-76`), so an override turning the function rule off for `scripts/**` would pass the control. (b) "no other function or file": the control has no function over 200 inside `saved-game.ts` and no file over 800 that is `account-routes.ts`, so an override widening the file exception to the function rule (or the reverse) would pass the control. Why Minor: the code does neither (`eslint-size-rules.mjs:81-92`), and the pair's *violates* example, "a function or a file added to the exceptions of the run's configuration, or given a limit of its own", still sends an agent to compare such an override by hand, so no change goes unchecked; it is broader coverage that would be nice. The clause also leaves out "the two root configuration files" the scope sentence names; that understates, so it misleads no one.

## Declined to judge

- The code of the slices (`scene.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `program-panel.tsx`, `tests/transport.test.mjs`) — the handoff bounds this review to the return step's commit; judged by the earlier reviews (`reports/review-whole-report.md`, `reports/review-fix-report.md`).
- The return step's judgement that ESLint's size rules need no environment fact — the commit writes none and changes no *Based on*; outside the range.
- The author address of the commit — no foundation entry the step writes reaches it.

## Checks run

- `git rev-parse HEAD` — exit 0, `6cc9048489598d800bcd05b5234d5a9a81a43be6`, the head given; `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — both `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- `git log --stat` and `git diff`, `git diff --word-diff=porcelain` of the range — exit 0; one commit, one file, the changes listed above and no other.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `node tests/quality/eslint-size-rules.mjs` — exit 0; four reports: `kitchen-sink.tsx:956` (890), `startApp` `app.ts:248` (449), `createProgramsEntry` `programs-entry.ts:81` (245), method `build` `programs-entry.ts:102` (225); "4 functions and files over a threshold in 297 files". The set of Q1, no other; `createGameView` and `accountRoutes` not reported.
- `python -B -m unittest -v tests.quality.test_function_and_file_size` — exit 0: the control case `ok`, the first case `expected failure`.
- Not run: the full gate (the handoff: run no full gate); `check_instructions.py` (no instruction file in the range).

## Reaches beyond the handoff

- `eslint.config.mjs` whole — to check the scope the clause names against the patterns the run reads.
- `.the-way/product-guidelines/coding/template.md` (passages found by search for the rule of size, lines 47-76 and 232-248) — to check whether the removed *Rationale* sentence stated what the pinned template asks.
- `.the-way/elements/common/foundation_check.py:78-91` — how the script counts a decision as held, to grade Minor 1.
- `foundations/decisions.md` searched for `tests: ` clauses holding numbers (line 588 and others) — to see whether thresholds in the clause depart from the repository's use; they do not.
- `tests/` searched for `decision: D-29` and `decision: D-425` — for the form of more than one line per test and the lines of D-425.

## Working copies

None made in `.runs/review-return/` (the directory does not exist). One scratch file of the foundation check's output, `a scratch file of the session`, outside the worktree, removed. `git status --short` of the worktree is empty.

## Unread material

- `.the-way/task-cycle/skill/return_step.md`, `.the-way/task-cycle/review/SKILL.md`, `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/skill/SKILL.md`, `task-frozen.md`, `reports/return-step-report.md`, D-425, D-28, D-29, the invariant `function-and-file-size`, both test files: read whole.
- `reports/review-whole-handoff.md`: read only lines 30-39 (Q1, Q3, Q4, Q5), as the handoff names Q1, Q3, Q4 there.
- `reports/review-whole-report.md`, `reports/review-fix-report.md`: not read (named only as the earlier judgement of the slices, outside this review).
- The files `read.md`, `decide_entry.md` beside the decisions skill: not read (they bear on writing an entry, not on this comparison).

## Searches not found or unclear

- Unclear: whether the template's "A test that holds a sentence of the decision carries beside it a line `decision:`" asks one line per sentence held or one line per test; graded as Minor 1 either way.
- Unclear: whether "no number" in the clause `tests:` (`template.md:241-244`) reaches the thresholds; read as a number that links a test (a line or a case number), since the repository's other clauses hold measures (`foundations/decisions.md:588`).
