# Slice 15 report

**Status:** done

**Commit:** see `git log -1` on branch task/logowanie-w-react (message: "docs: describe tests of a screen on jsdom and the memory limit in the testing guidelines"). File changed: `guidelines/testing.md` only.

## Changes in guidelines/testing.md
- Row `browser-view` of the table of parts: names jsdom beside the hand-made model (F15).
- Trust boundaries paragraph: states what D-76 says after S5 (only a change of a boundary's principle ends the exception; a change of how the all-states page is built does not). `scripts/kitchen-sink.mjs` row and `preview-server-access` untouched, no refusal test.
- New further rule `### Tests on a document imitation` (D-264, D-268, invariant `document-test-memory-limit`): harness first, `assert` from the harness, helper too, throwaway file outside `tests/` imports `memory-limit.mjs` and calls `startMemoryLimit` before loading the imitation (spec decision 11).
- Recipe `unit test`: Purpose names the harness and its `assert`; Doubles says only files of tests of React screens lose their stand-ins.
- Recipe `integration test`: Files lists `tests/view/memory-limit.test.mjs`.
- Not tested on purpose, item D-88: jsdom named beside the hand-made model, plus Enter/label/layout not proved (from D-264).
- Where in code: the three files of tests/view added (all git-tracked).

## Checks
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- No product gate run (orchestrator's).

## Read
All files and ranges of the handoff's Read and Current ranges, one per call, plus `.the-way/task-cycle/change/SKILL.md`, `slice.md`, whole `guidelines/testing.md`, `tests/view/memory-limit.test.mjs`. Task rows S5, F15, F16, F21, F22 found by grep in `task.md:323` and `plan.md:25-34` (reach beyond the dispatch: the handoff gave their ids but not their text; searched to confirm wording).

## Choices
- Rule placed as a further rule after "Flaky tests" (template: further rules follow required ones); Invariant field names `document-test-memory-limit` because a cheap test checks the convention.
- Did not add D-264/D-268 to the header list of departures: they are not departures from the template.
- Own-work check: the requirement most likely missed was "no rule leans on the hand-made model"; grep of the file for "ręczny model" shows the remaining mentions are the D-88 wording naming both kinds of imitation.

## Questions for the human
none.

## Searches not found or unclear
- The plan cites `guidelines/testing.md:175-178` for the sentence; it stood at 175-179 in this base. Small mismatch, adapted.
