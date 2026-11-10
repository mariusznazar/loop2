# Slice 9 report — the testing guidelines: the gate's patterns and the level of the page-document test

**Status:** done

**Commit:** `af823e0` on `task/teksty-rozjechane-z-kodem` (slice base `c2cfc04`, one commit in the range)

**Files changed:** `guidelines/testing.md` (+3 / -3)

## What changed

1. `## Rules` → `### Test files in the gate`: "przekazuje Node pliki i wzorce" → "przekazuje Node wzorce, nie pliki" (To do 9).
2. `## Recipes` → `### unit test`, *Files*: added "bez `tests/view/page-document.test.mjs`, który uruchamia procesy (integration test)" so the directory `tests/view/` no longer lists that file as a unit test (To do 10).
3. `## Recipes` → `### integration test`, *Files*: added `tests/view/page-document.test.mjs` (uruchamia procesy potomne, `spawnSync`, których limit pamięci dotyczy) after the `memory-limit.test.mjs` entry (To do 10).

No *Where in code* line changed; the rest of the file is untouched. No decision number or invariant was added.

## Checks run

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `python -B scripts/test.py tests/quality/test_node_test_selection.py` | 0 | `Ran 1 test … OK` |
| `git diff --check` | 0 | clean |

Not run: `npm test` (the full gate; the orchestrator runs it). No `.mjs` test was run, since the slice changes prose only.

## Own-work check

- **Requirement:** the rule "Test files in the gate" must say the full run hands Node patterns, not files, and the page-document test must sit in the integration level and not in the unit level's directory list (To do 9, 10; D-81 and the glossary's definitions: unit test has no processes, integration test has processes).
- **Check:** `grep -n "pliki i wzorce\|page-document.test.mjs" guidelines/testing.md` — the old wording is gone; the page-document file appears in both the unit exclusion (line 338) and the integration list (line 350). Foundation check and the node-selection test ran as above.
- **Showed:** the edited wording is in place and the foundation check passes. The checks do not test the prose itself; a reviewer must read the lines against the sources (`scripts/test.py:11` and `:44`; `tests/view/page-document.test.mjs:4` and `:88`).

## Unread material

none — the handoff's *Read* list was read whole or, for the foundation entries, read whole from its identifier heading (D-73, D-77, D-81, D-83, D-264, D-268, the invariants `document-test-memory-limit` and `node-test-selection`, the glossary entries `unit test` and `integration test`). `guidelines/testing.md` was read whole (464 lines, in three reads). The `the-way-maintain-testing-guidelines` SKILL.md, `product-guidelines/testing/template.md` and `product-guidelines/template.md` were read whole. `scripts/test.py` and `tests/view/memory-limit.test.mjs` were read whole. `foundations/part_map.md` was read at lines 116–135 (the agent-workflow part).

## Searches not found or unclear

- The unit recipe's *Files* line and the integration recipe's *Files* line both name `tests/view/memory-limit.test.mjs`, which also runs child processes. The unit line lists `tests/view/` by directory without excluding it, so the same contradiction that this slice removes for page-document still stands for memory-limit. Not changed here: the handoff names only page-document. See the concern below.

## Reach beyond the handoff

none. The method files read were those `make-change` names: `task-cycle/change/SKILL.md` (whole) and `task-cycle/change/slice.md` (whole). The `the-way-maintain-testing-guidelines` skill's step files were not read; the handoff named only its SKILL.md and template.md, and this slice edits only two lines of the file.

## Concerns and questions

1. **memory-limit.test.mjs in the unit *Files* line (question).** `tests/view/memory-limit.test.mjs` runs child processes (`spawnSync`, lines 29 and 96 of the test) and sits in the integration list (already), but the unit *Files* line still lists `tests/view/` with no exclusion. Recommendation: add it to the same exclusion as page-document ("bez `tests/view/page-document.test.mjs` i `tests/view/memory-limit.test.mjs`"). Cost of leaving it: a reviewer reads the file as both unit and integration, the same ambiguity this slice closes for page-document. Cost of changing it: one more word in one line, a reach beyond the handoff. I have not changed it.
2. No other concerns. The commit message is in English, in the `docs: :memo:` style of the log, as the handoff asks.
