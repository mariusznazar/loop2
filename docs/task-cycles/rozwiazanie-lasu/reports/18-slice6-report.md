# Slice 6 report

Status: done

Files: src/browser/view/status-row.ts, src/browser/view/headquarters.ts, src/browser/styles.css,
tests/view/status-row.test.mjs, tests/view/headquarters.test.mjs (see commit).

Checks (all exit 0): npm test -- tests/view/status-row.test.mjs; tests/view/headquarters.test.mjs;
tests/invariants/test_content_identifiers.py; test_browser_view_token_values.py;
test_browser_view_focus_outline.py; test_browser_view_framework.py.
First failing run: status-row test "Minuta 312 · Eksploruje · Passa 120/480" failed on the assertion (exit 1).
Not run: full gate (orchestrator's); rendered screenshot and hand check in a browser (D-75, D-88) unchecked.

Own-work check: requirement "the text element is positive after a completion and only then" - screen test
toggles running -> completed -> running -> dead on the fake document and reads the class set.

Choices: headquarters pure helpers mapLabel/solvingSentence; solved mark is a span class "map-label solved"
(whole label positive); condition sentence is a span "map-solving" between label and Wyślij button.
Status text role = class "positive" toggled via classList. Re-render keyed on solvedMaps reference.
Note: prettier reformatted existing lines in the two test files. Pace buttons were already made in slice 2;
only their hiding moved to mapRunEnded via pauseLabel. No reach beyond dispatch.
Streak at minute 84 in the discovery test reads 0 (first chill zeroes it, D-60).
