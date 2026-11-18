# Return step report — testy-padajace-losowo

**Status:** done

**Commit:** `145959e8` on `task/testy-padajace-losowo` (head before: `f2253fc5`). One file, `tests/flaky-tests.md`, 2 lines changed. The step committed, so the range `f2253fc5..145959e8` needs the orchestrator's review by a fresh reviewer.

**Check result (one line):** nothing failed; `foundation_check.py` exit 0 (0 errors) and `check_instructions.py` exit 0 (0 error, 145 warn, 7 info, as before the step); not run: the full gate (the orchestrator's).

## What was compared, and what it showed

Compared with the code at head `f2253fc5`:

- **D-432** (written by the change): its binding sentence, scope, relation `derives from D-73`, and the pair of examples. The pair holds a part no test holds (no test exists for prose), so there is no part to remove from it and no `tests:` clause to add. The sentence agrees with the register file, the part-map row and the rule of the guidelines. Nothing to correct.
- **`guidelines/testing.md`**: the rule `### Register of flaky tests` (*Decision* D-432, sentence with the qualification „bez związku ze zmianą kodu i bez ustalonej przyczyny”), the rule *Flaky tests* (as at the base, *Decision* D-73), `tests/flaky-tests.md` in *Where in code*. Agrees with D-432 and D-73 (the list of departures of D-73 is unchanged, as the task says; D-432 is no departure). Nothing to correct.
- **D-73, D-77, D-356** (named by the task): D-73's "testing rules in `guidelines/testing.md`" holds (the rule stands there); D-77's "new or changed tests still bound their own waiting" holds (the changed case still bounds the hang by its limit; the mutation at the fix showed it fails when the hang is not cut); D-356's sentence held by the line `decision:` of the changed test is unchanged, `foundation_check.py` reports no mismatch. `deploy/loop2-watch` unchanged. Nothing to correct.
- **Part map** of the touched parts: `agent-workflow` has `tests/flaky-tests.md` in *Files* (the sentence of the part, which directs and records the work on the repository, is unchanged); `deployment` (the watcher test) and `account-server` (the transport test helper) are touched by tests only, so neither their sentences, *Depends on* nor *Trust boundary* change; `product-foundation` holds D-432 and the part map as `foundations/**`. Nothing to correct.
- **Search for other places naming the chapter or the register**: `git grep -i flaky` outside `node_modules` and `.the-way` found only `foundations/decisions.md` (D-432), `foundations/part_map.md`, `guidelines/testing.md` and `tests/flaky-tests.md`, plus two unrelated comments in `tests/view/memory-limit*.mjs` that say "no flaky test" about a memory limit (no meaning against the register).
- **Glossary, environment facts, invariants:** no word of the change is used against a glossary entry or needs one under WAY-95; no source outside the product is cited that the foundation lacks (D-432's *Based on* is `none`); no rule of the task, a decision or the human asks for an invariant. None written.

## The one correction (N-1 of the review of the fix)

`tests/flaky-tests.md` lines 6–7 sent the reader to „rozdział „Flaky tests”” for the register's rule, while the rule now stands in the rule `### Register of flaky tests`. The register's own text contradicted the foundation, so the step corrected it in this change: the line now reads „Zasadę rejestru podaje `guidelines/testing.md`, reguła „Register of flaky tests”.” (`145959e8`). It is the only correction. The register's other text (intro, common rule, four entries) agrees with D-432.

## Settlements and choices — where each went

- Row 1 of *Settlements to record* (the register): written by the foundation step as D-432 in `foundations/decisions.md`; nothing missed, nothing new written by this step.
- The choice "the register is kept short and an entry leaves with its cause" is a sentence of D-432 already; no further choice binds after the merge that the foundation lacks. Nothing deferred.
- The author's observation that in five of six whole-file loops of the load one file run failed (file not kept) is no foundation matter and no register entry, because D-432 asks for a named test; it stays in `reports/author-report.md` only.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (run after the correction).
- `python -B .the-way/instruction-files/check_instructions.py` → exit 0, `0 error, 145 warn, 7 info` (the same warnings as before; none names `tests/flaky-tests.md`).
- Not run: the full gate (`npm test` without arguments), which is the orchestrator's; Ruff and ShellCheck (no quality environment made).

## Reaches beyond the handoff

- `git grep -i flaky` over the tracked files, to find other places that name the rule or the register; none was beyond what is listed above.

## Unread material

- Of `foundations/decisions.md` I re-read only D-432 (lines 1100–1115) for this step; D-73, D-77 and D-356 are those read whole at the first stage, not re-read. The reports `review-whole-report.md` and `review-fix-report.md` were not read; the points the handoff gives from them (N-1 and the observation) were taken from the handoff.

## Searches not found or unclear

- none.

## Working copies

None made: the step needed no working copy, and `.runs/author-return/` was not created. `.runs/` holds only `task-cycles/`.
