# Report 07 — slice 5, the rows „Teraz” and „Potem” under the scene

**Status:** done with concerns (the concerns are two choices and one gap, below; none blocks).

Base of the slice: `c60bd5e`. Commit: `46e0ed9` `feat: :sparkles: draw the rows Teraz and Potem under the scene from what the simulation names for them`.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/view/now-lines.ts` (new) | 124 | 0 |
| `src/browser/view/now-rows.tsx` (new) | 64 | 0 |
| `src/browser/view/world-area.tsx` | 6 | 1 |
| `src/browser/styles.css` | 51 | 0 |
| `tests/view/now-lines.test.mjs` (new) | 179 | 0 |
| `tests/view/world-area.test.mjs` | 172 | 11 |

Only the files of the slice's *Change* were touched.

## What was made

- `now-lines.ts`: pure `nowRows(lines: NowAndNext, program: Program)` giving `{ now, next }`, each `{ icon, text, role, right }`; `NEXT_LABEL = "Potem"`. The number is `ruleNumber(groupIndex, ruleIndex)` of `program-editor.ts` found by rule id in the copy's program; the action words are `actionSentence`; the icon is `ACTIONS[kind].icon`.
- `now-rows.tsx`: `NowRows({ state })` calls `nowAndNext(state)` and draws two sibling rows `.now-row` and `.next-row` (the label `.next-label`, `.now-main` with the `action-icon` mask and `.now-text`, `.now-right`). The role is a class on `.now-text` (`positive`, `warning`; `text` is the plain class).
- `world-area.tsx` places `<NowRows>` right after `<Scene>`, above the encounter paragraph.
- `styles.css`: the rows (flex, one line, `white-space: nowrap`, `overflow: hidden`, text cut with an ellipsis), `.now-row { height: 1lh }`, label and right part in `text-label`, text in `text`, `positive` and `warning` for the two roles, every value from `tokens.css`.

## Checks (command → exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/now-lines.test.mjs`, **first run against a stub `nowRows` returning empty rows**: cases failed on their assertions (actual `{icon: null, text: "", …}` against the expected words) | 1 |
| `npm test -- tests/view/world-area.test.mjs`, **first run before `NowRows` existed**: 5 failed (the order case and the 4 new cases), 12 passed | 1 |
| `npm test -- tests/view/now-lines.test.mjs` (after) | 0 (9 pass) |
| `npm test -- tests/view/world-area.test.mjs` (after) | 0 (17 pass) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm run typecheck` | 0 |
| also run, files near the change: `npm test -- tests/view/run-screen.test.mjs`, `tests/view/combat-line.test.mjs`, `tests/view/scene.test.mjs`, `tests/quality/test_node_test_selection.py` | 0 each |
| `npx prettier --no-config --no-editorconfig --check` on the six files; `npx eslint --max-warnings 0` on the five TS/JS files | 0, 0 |
| the screen in a running browser (below) | done |

Note on the first now-lines run: I read the tail of its output (the failing cases of Potem), not the count of failures; the run exited 1.

The full gate (`npm test` with no argument) was not run, as the handoff says. `foundation_check.py` was not run.

## Own-work check

- Requirement my work most likely does not meet: „Teraz” has a fixed height so that a change of its text moves nothing below it (To do 1, Pytanie 1), and the cause of a death stands in `text`, a completion in `positive`, no winner in `warning`, in the real stylesheet, not only as class names (jsdom does not read the stylesheet).
- Check: the game run locally over HTTPS (`npm run local`, Playwright CLI at 1400×900 and 640×800), states composed with a copy of `compose-state.mjs` kept in `.playwright-cli/` (a program of two groups so that the rule is 2.1) and sent by the ordinary save request. Read by `getBoundingClientRect` and `getComputedStyle`:
  - a wait with no winner: „Czeka — żadna reguła nie pasuje”, below it „Potem · żadna reguła nie pasuje — postać stanie” in orange (screenshot looked at);
  - an action under way: icon of „Wędruj” in the colour of the text, „Wędruj”, at the right „reguła 2.1 · zostało 3 z 5 min”; „Potem · Wędruj · reguła 2.1” (screenshot looked at);
  - after a death of cold (the map run resumed and left to run): „Mag zamarzł”, colour `rgb(212, 212, 216)` = `text`; „Potem” still there naming rule 2.1;
  - after a completion (map run resumed from minute 477): „Las rozwiązany”, colour `rgb(0, 188, 125)` = `positive`;
  - the two rows had height 18.1875 px and `top` 407.98 and 430.17 in the running state, after the death and after the completion, so nothing below moved; at a width of 640 px both rows stayed one line (574 px wide, `scrollWidth` = `clientWidth`).
  - the console: no `uncaught` line was read; I did not run `playwright-cli console`, so this is not shown.
- What it showed: the requirement holds in these states. Combat in the browser was not looked at (the jsdom case covers its words, not its look).
- Mutations considered: the death role `positive` (caught by the roles case in both test files); the number counted from the rule id instead of its place (caught: ids 5, 6, 3, 9 against places 1.1, 1.2, 1.3, 2.1); the wait with an icon or minutes; `Potem` taken from `now`; `Potem` dropped after the end; the combat rule missing in `Potem` (caught by the kick case). Not protected by a test: `height: 1lh` and the cut text (jsdom shows no layout) — only by the browser look above (D-88).

## Choices (what I rejected, and its cost if wrong)

1. **`creatureAfterZ` and the three death sentences are copied into `now-lines.ts`** instead of exporting them from `status-row.ts`. Reason: the handoff says `status-row.ts` stays as it is and slice 7 removes its own copies of these words. Rejected: exporting `creatureAfterZ` from `status-row.ts` (a file outside the *Change*). Cost if wrong: the orchestrator would rather have one copy — then slice 7 deletes the status-row ones and nothing more is needed, so the cost is a few lines for one slice.
2. **No word „Teraz” is drawn in the row.** The plan and the task give „Teraz” as the icon, the action and the right-hand part only, and only „Potem” has a label. Rejected: a label „Teraz” in `text-label`, as the old Loop had („Teraz: …”). Cost if wrong: one more `span` in `NowRows` and one test line; the player today reads the first row under the scene as the action without the word. Flagged below as a concern.
3. **Both rows are one line with the text cut** (`white-space: nowrap`, ellipsis), „Potem” too, though only „Teraz” must have a fixed height (the task says nothing of the height of „Potem”). „Potem” has no `height`, only the nowrap. Rejected: letting „Potem” wrap. Cost if wrong: a long sentence of „Potem” is cut where it could have wrapped; the combat actions and rules' sentences are short, so I saw no case.
4. **A rule that the copy no longer holds** (the player deleted it while its action goes on): `right` is only „zostało 3 z 5 min”, no „reguła N”. Rejected: leaving the row empty or throwing. The plan says „the rule found in the copy of the map run” and does not say what happens when it is not found; covered by the case "Teraz keeps the minutes of an action whose rule the copy no longer holds". Cost if wrong: a different wording for a rare moment.
5. The role is a class on `.now-text` (`now-text positive`, `now-text warning`), the same pattern as `trip-result danger`, instead of a class per row.

## Reaches beyond the handoff

- I read `tests/view/run-screen.test.mjs`, `combat-line.test.mjs` and `scene.test.mjs` only by running them (they stand next to the world area); they pass unchanged.
- I read the whole `styleguide-browser-view.md`, `coding.md`, `coding-browser-module.md` and `testing.md` (the handoff names them, so this is no reach), and `.the-way/task-cycle/change/ui_check.md`.
- I read D-334, D-335 whole (the handoff names them only in the table of ranges, and „Foundation entries rows 1, 2, 4 and 8” point to them).
- I read `the author's git rules for agents` before the commit (the global instruction).
- I did not need anything from the foundation that the dispatch did not name.

## Searches not found or unclear

- The plan's *Read* line ranges for decisions are given as old ranges; the handoff gave the current ones, and I read D-311, D-147, D-291, D-334 and D-335 by those. None of the other entries it lists (D-03, D-18, D-39, D-40, D-43, D-62, D-87, D-88, D-132, D-185, D-216, D-264, D-265, D-268, D-292, D-293, D-308, D-309, D-320) were read whole: I did not need them to write the code, and I did not read `glossary.md`, `part_map.md`, the invariants beyond `rule-state-from-pick`, nor the task passages outside *Read* of the slice. This is a gap in my reading, not a thing I looked for and could not find.
- Whether a rule of the copy can be deleted while its action goes on (so that the row loses its number): not established; I wrote the case defensively, I did not search the simulation for it.
- Where the word „Teraz” is meant to be read by the player: the task, the plan and D-334 do not draw it; unclear (see Concerns).
- I did not find in the task where the clock or the header read "Minuta 312" for a death (that is the header's slice, not this one).

## Questions

None blocking. Recommended answers for the two concerns:

- **Label „Teraz”:** keep as is (no label), because the task, the plan and D-334 give the row without one and the first row under the scene reads as the action; if the human wants it, one `span` with the word in `text-label` before the icon.
- **Slice 6 and `overflow: hidden`:** the rows have `overflow: hidden` for the cut text. A focus outline (slice 6 makes the rows buttons) is drawn outside the element and will be clipped by it. Slice 6 should either move the cut to `.now-main` or give the rows room for the outline (the rule *Visible focus* draws it with an offset). Not touched here, since no click is in this slice.

## Concerns

1. As above: the word „Teraz” is not drawn.
2. As above: `overflow: hidden` on the rows against slice 6's focus outline.
3. The jsdom cases check classes and words; the colours and the fixed height are protected only by the browser look above (the testing guidelines put layout and look in the browser, D-88).

## Problems as observed

- A composed document with a death already in it (`advanceMinutes` run to the death before saving) was refused by the game on loading („Zapis był uszkodzony i nie dał się wczytać.”). I did not look into why; I sent a state a minute before the death instead and let the browser run it. Recorded as observed, cause unknown (a guess: a state of a died map run needs the settlement the game makes at „Zakończ”; not verified). It does not bear on this slice.
