# Fix 1 — findings of the review of the whole change (reviewed head eb1f864)

Status: **done**. All four findings fixed; none contested.

Commits (on `task/pytanie-przy-zakoncz`, address `mariusznn@gmail.com`, not pushed):

- `15dfb9f` fix: :bug: stand the question of "Zakończ" in the program panel just above the heading of the copy
- `cb9d5e7` docs: :memo: say in D-173 that the question stands just above the heading of the copy and that "Zapisz" replaces the changes the program holds

Files changed in the range `eb1f864..HEAD`: `src/browser/view/end-question.tsx`, `src/browser/view/program-panel.tsx`, `src/browser/view/run-screen.tsx`, `tests/view/end-question.test.mjs`, `tests/view/run-screen.test.mjs`, `foundations/decisions.md`.

## I-1 (blocking) — fixed

Route: the one the orchestrator chose (the reviewer's first recommendation).

- `program-panel.tsx`: `ProgramPanelView` draws `<EndQuestion>` in the `run` mode head, after `.program-actions` and before `.copy-section`; so the order in the panel is `program-list > program-actions > end-question > copy-section > program-editing`, and the list „Program:” and „Nowy program” stay where they were. The way in: `ProgramPanel.setQuestion(answers | null)` (the panel keeps the answers, redraws; setting what is set changes nothing; the panel of Programy never draws it). The question is drawn also while the panel shows another saved program (then it stands after the actions, where the copy section would be), since the map run still waits for the answer.
- `run-screen.tsx`: it no longer renders the band; `RunScreen.setQuestion(open)` only calls `panel.setQuestion(open ? controls : null)`; `focusQuestion()` unchanged. (I took the file back to its base text and added only these members, so its diff is small.)
- `end-question.tsx`: now owns `copyLacksSentence` (the panel imports it from there; it used to be the other way round and would have made a cycle). Header comment says the panel draws it.
- Test (M-3 below) and D-173 changed with the code.
- Check that it is fixed: `tests/view/end-question.test.mjs` case "the question stands under the band of a discovery and directly above the heading of the copy, after the list „Program:” and „Nowy program”, also after a completion in the minute of a discovery" and `tests/view/run-screen.test.mjs` case "the question stands in the program panel, directly above the heading of the copy and under the band of a discovery, …" — both exit 0; real browser, below.
- Mutation check (own work, restored after, `git diff` checked): question moved above the list → 4 failing cases in `end-question.test.mjs`; question moved below the copy section → 2 failing there and the run-screen test fails (exit 1 each).

## M-1 — fixed

D-173, binding text, now reads "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, …". Same edit: "in a band of the program panel just above the heading of the copy, under the band of a discovery where one stands" (I-1). *Rationale* of D-173 changed to the new place ("just above the heading of the copy it concerns, under the band of a discovery, … nothing already standing moves but the copy and its rules"; Accepted-with line: "the band in the program panel"). I first added a *Rejected* line "the question above the whole program panel" and took it out again: a way the writer derives never enters *Rejected* (template, WAY-134); the row 8 option A line stays. `python -B .the-way/elements/common/foundation_check.py` → `0 errors`.

## M-2 — fixed

The earlier `after-save-programy.png` showed Siedziba (the hash I set by script did not take). New evidence from a run of this fix: `.runs/task-cycles/pytanie-przy-zakoncz/reports/fix1-programy-after-save.png` — I opened it: Programy, the list with „Program”, the panel heading „Program” and its two groups „Program” (with the rule „Zawsze → Eksploruj”, „Wykonano 1×”) and „Grupa 2”, no sentence about a waiting map run (the map run ended). The old file `after-save-programy.png` is stale and wrong; it is in the git-ignored `.runs/` and I did not delete it (it is the orchestrator's evidence folder) — ignore it.

## M-3 — fixed

The placement test in `tests/view/end-question.test.mjs` now asserts: in the program's area `discovery-band > run-program-place` (and `run-program-place` alone without a discovery), in the panel `program-list > program-actions > end-question > copy-section > program-editing`, and that the element after the question holds the heading „Kopia: Program”. A new case, "the question stays in its place while the panel shows another program, and never stands on Programy", picks program 2 on the list while the question stands (the copy section is gone, the question stays after the actions) and checks the panel of Programy never holds one.

## Check of the new place in the real browser (loop2-play, `npm run local`, Playwright CLI, 1280×720)

- Components and states: the question band inside the program panel, the band of a discovery above the panel, the list „Program:”, „Nowy program”, the heading „Kopia: Program” and its line „Niezapisane zmiany w kopii.”.
- Method: new account at `example.test`, character „Ala”, Las; copy made unsaved with „+ dodaj grupę”; „Zakończ” at 1× running, then „Wróć”, then 16× to the first discovery (minute 84, paused, band standing), „Zakończ” again; then „Zapisz”, then the bar's „Programy”.
- Observed: running — the panel's children `program-list > program-actions > end-question > copy-section > program-editing`, status ending „(pauza)”; screenshot shows „Program:”, „Nowy program”, then the question, then „Kopia: Program”. Under the discovery band — the program area `discovery-band > run-program-place`, the panel the same order; screenshot shows band, „Program:”, „Nowy program”, question, „Kopia: Program”. „Wróć” → the map run went on (before the discovery). „Zapisz” → `#/postac/1`, no question; Programy as in M-2. Console: only the two ordinary entries (401 before sign-in, 404 favicon), no `uncaught` line.
- Evidence: `reports/fix1-question-running.png`, `reports/fix1-question-under-discovery-band.png`, `reports/fix1-programy-after-save.png` (all three opened).
- Not checked: windows narrower than 1280 px; the `danger` colour of „Odrzuć” under the pointer (same class as „Zakończ”). The discovery band has no spacing under it and touches „Program:” — as before this change, not touched.
- `.playwright-cli/` deleted, local start stopped (`Local starts stopped: 1`).

## Checks (command → exit code); the gate was not run

All as `npm test -- <file>` (the handoff's `python -B scripts/test.py` needs `npm_execpath`):

- `tests/view/end-question.test.mjs` 0; `tests/view/run-screen.test.mjs` 0; `tests/view/program-panel.test.mjs` 0; `tests/view/account-screen.test.mjs` 0; `tests/view/discovery-band.test.mjs` 0; `tests/view/run-header.test.mjs` 0; `tests/view/react-controls.test.mjs` 0; `tests/view/uncaught-failure.test.mjs` 0
- `tests/invariants/test_browser_view_token_values.py` 0; `test_browser_view_framework.py` 0; `test_browser_view_focus_outline.py` 0; `test_design_token_contrast.py` 0; `test_copy_save.py` 0
- `npx tsc -p tsconfig.browser.json --noEmit` 0; `npx eslint --max-warnings 0 src/browser/view tests/view/end-question.test.mjs tests/view/run-screen.test.mjs` 0; `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` 0; `python -B .the-way/elements/common/foundation_check.py` 0 (`0 errors`)
- The placement tests passed on the first run after the code change (no seen-failing run written first); the two mutations above show they fail for the break they name.

## Own-work check

Requirement most likely not met by this fix: "nic, co już stoi, się nie przesuwa poza samym programem" (row 8) together with "pytanie stoi przy kopii, której dotyczy" — the question must not push the list and „Nowy program”, and must stand with the copy. Check: the order tests above (list and actions before the question, copy section right after) and the two screenshots; both show it. Second risk: the question vanishing from the panel when another saved program is picked — checked by the new case. Third: the question showing in the panel of Programy — checked in the same case.

## Choices

- The question is drawn also while the panel shows a saved program (not only with the copy shown). Rejected: only above `.copy-section` — a player who picks another program while the question stands would lose it though the map run waits. Cost if wrong: one condition to add in `program-panel.tsx`.
- `copyLacksSentence` moved into `end-question.tsx` to avoid an import cycle. Cost: the panel imports one more name.

## Reaches beyond the handoff

None beyond the findings file and `.the-way/task-cycle/change/fix.md`, which the message named; `author-report.md` (mine), `task.md` for the wording of To do 1 and question 8.

## Searches not found or unclear

- The coordinator's message says "Retake the screenshot of Programy after „Zapisz”"; the old file stays in `reports/` under its old name (I did not remove it); the new one is `fix1-programy-after-save.png`.
- No decision other than D-173 states where the question stands; D-324 does not mention a place (checked), so no other entry changed.
- Nothing else unclear.
