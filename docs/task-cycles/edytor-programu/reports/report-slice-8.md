# Report — slice 8 of `edytor-programu`: destructive buttons grey at rest across the game

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done. **Commit:** `3afd424` (base `ba30024`), not pushed.

## Changed
- `src/browser/styles.css` (+7/-3): `.button.destructive { color: var(--danger) }` replaced by one rule `.button.destructive:hover:not(:disabled), .button.destructive:focus-visible { color: var(--danger); }`, comment citing D-44 and D-39.
- `src/browser/kitchen-sink/kitchen-sink.css` (+9): `.button.destructive.sample-hover, .button.destructive.sample-focus { color: var(--danger); }` for the page's pointer and focus samples.
- `src/browser/kitchen-sink/kitchen-sink.ts` (+3/-2): comment only.
- `src/browser/view/controls/button.ts` (+2/-1) and `src/browser/view/controls/react-button.tsx` (+2/-2): comments only (outside the slice's *Change* list).
- No test file changed (jsdom computes neither `:hover` nor `:focus-visible`). Foundation and guideline text already state the rule.

## Checks
- `node scripts/kitchen-sink.mjs --build-only` before and after: exit 0.
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py` exit 0 (3); `test_browser_view_token_values.py` exit 0 (4); `test_browser_view_focus_outline.py` exit 0 (3); `tests/view/react-controls.test.mjs` exit 0 (52).
- Prettier `--check` on the five files exit 0; `npm run build` exit 0; `npm run local` / `npm run local:stop` exit 0 / 0.
- Not run: the full gate; ESLint (not named in the handoff).
- Failing before the change: kitchen-sink destructive button at rest was `rgb(255, 100, 103)` (`danger`); after: `rgb(212, 212, 216)` (`text`).

## Own-work check
Computed colours and screenshots for the kitchen-sink row and the game's buttons at rest, under a real pointer (`playwright-cli hover`) and at focus; `:focus-visible` matched, outline solid; the disabled sample stayed grey. Kitchen-sink: rest `rgb(212,212,216)`, pointer and focus `rgb(255,100,103)`, disabled `rgb(82,82,92)`. Game: Restart rest `rgb(212,212,216)`, pointer and focus `rgb(255,100,103)`; Zatrzymaj pointer and focus `rgb(255,100,103)`; Usuń grupę rest `rgb(212,212,216)`, pointer and focus `rgb(255,100,103)`.
Weakest points: (1) "reached by Tab": one Tab press to switch to keyboard focus, then `focus()` on the button — the Tab order was not walked; (2) on Programy the program-level „Usuń” in `program-panel.ts` was disabled in every state reached, so „Usuń grupę” of the rule editor was used; why it was disabled was not investigated; rest state of Zakończ and Zatrzymaj judged from screenshots only.

## Screenshots (directory `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\`)
Kitchen-sink: `slice-8-kitchen-sink-destructive-rest.png`, `-pointer.png`, `-focus.png`. Game: `slice-8-game-restart-end-rest.png`, `slice-8-game-restart-pointer.png`, `slice-8-game-end-pointer.png`, `slice-8-game-restart-tab-focus.png` (Restart and Zakończ after a death); `slice-8-game-stop-rest.png`, `-stop-pointer.png`, `-stop-tab-focus.png` (Zatrzymaj on Postać); `slice-8-game-delete-rest.png`, `-delete-pointer.png`, `-delete-tab-focus.png` (Usuń grupę on Programy).
State: a scratch copy of `compose-state.mjs` built a document with a character whose map run on „Las” ended in death and a character in an earning loop on solved „Las"; loaded with `loadSavedGame` (ok), sent with `PUT /api/saved-game` (200, revision 1). The earning loop was stopped with its own „Zatrzymaj” before the Programy steps (a running loop locks the editor); „Zakończ” pressed once to leave the ended run.

## Reaches
Read in full: the make-change SKILL, slice.md, ui_check.md, `src/browser/AGENTS.md`, the four guidelines; D-39, D-40, D-44, D-45, D-47, D-245, D-269; three invariants; the browser-view part-map entry; `loop2-play/SKILL.md` and its scripts; `.ai/rules/git.md`. Test account `agent-slice8@example.test` created in the local game; scratch files in `.playwright-cli/` deleted; kitchen-sink server and local game stopped; a stray `/tmp/unused` written during a build and deleted.

## Choices
One selector-list rule rather than a separate rule for the look at rest (`:not(:disabled)` keeps a disabled destructive button at `text-disabled`); kitchen-sink samples drawn by class in `kitchen-sink.css`, not by a style set in TypeScript (the token invariant forbids colour values in TS files).

## Searches not found or unclear
Why the program-level „Usuń” was disabled after the dead run and the loop (not investigated); whether the game's Tab order reaches each destructive button (not walked); the numeric rest colour of Zakończ and Zatrzymaj in the game (only screenshots).

## Concerns
None blocking. Both forms covered: Zakończ and Restart (DOM, `status-row.ts`), Zatrzymaj (React, `character-screen.tsx`), Usuń grupę (rule editor).
