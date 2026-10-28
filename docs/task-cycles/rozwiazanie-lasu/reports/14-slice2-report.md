# Slice 2 report — pace buttons in the status row

Status: done

Files: src/browser/view/status-row.ts, src/browser/view/game-view.ts, tests/view/status-row.test.mjs.
Order of the row: text, Pauza/Wznów, five pace buttons, Restart, Zakończ. Buttons built once from BALANCE.paces,
label `${pace}×`, selected state via setButtonSelected from state.pace; hidden with the pause button after death
or completion (label === null). game-view setPace: clock.flush() then setPace.

Checks (exit codes):
- first failing run of tests/view/status-row.test.mjs: failed on the assertion (actual [Restart, Zakończ]) 
- npm test -- tests/view/status-row.test.mjs: 0 (20 pass)
- npm test -- tests/view/clock.test.mjs: 0
- npm test -- tests/invariants/test_content_identifiers.py: 0
- npm test -- tests/invariants/test_browser_view_framework.py: 0
Not run: full gate, hand check in a browser (named in spec for later).

Own-work check: requirement "stay visible/active while paused, hidden after death" is tested (paused row, dead row).
Note: completion hiding relies on pauseLabel returning null; the completion state is a later slice and is not tested here.
Test fake document now records attributes and listeners; existing tests updated for the new child order.
