# Report — executor of slice 13, task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `cf8261c8` feat: :sparkles: end the line of a character in „Gdy cię nie było” whose earning loop goes on with „ · najdłużej bez śmierci: {n} przejść z rzędu” … (D-246, D-241) — on top of base `21499c5d`.

## Files changed

- `src/browser/view/away-report.ts` — +21 / −4: `recordText(loopRecord)` (declines the noun through `countedName` with `one: "przejście"`, `few: "przejścia"`, `many: "przejść"`; empty at 0), `goingText` takes the loop record and appends it last (after „ · wskrzeszenie zużyte”), `reportEntries` reads `loop.loopRecord` from the character's earning loop at each call (0 where there is none). The branch of a stopped line is unchanged, so it carries none.
- `tests/view/away-report.test.mjs` — four new cases and the helper `loopsOf` takes `{ record }` (sets `loopRecord`, `inARow: 0`).
- `tests/view/headquarters-screen.test.mjs` — +2: the hand-made `LOOP` fixture gets `inARow: 0, loopRecord: 0` (see Reaches beyond the handoff).

## Checks (command, exit code)

- Failing run first: `npm test -- tests/view/away-report.test.mjs` → exit 1 (after the four new cases were written and before the code). Three cases failed on their assertions, for the expected reason: the ending-after-other-parts case (actual `… · wskrzeszenie zużyte`, expected `… · najdłużej bez śmierci: 3 przejścia z rzędu`), the declension table (actual `Ala: 5 min`, expected `Ala: 5 min · najdłużej bez śmierci: 1 przejście z rzędu`) and the read-at-each-drawing case (actual `['Ala: 5 min', 'Ola: 7 min']`). The fourth case, zero / no earning loop / stopped line shows no record, passed already: it guards against the way the code could be wrong (a zero drawn, a stopped line given a record of a later loop), not against a missing feature.
- `npm test -- tests/view/away-report.test.mjs` → exit 0 (22 pass, 0 fail).
- `npm test -- tests/view/counted-name.test.mjs` → exit 0.
- `npm test -- tests/view/headquarters-screen.test.mjs` → first run exit 1 (3 failing: the hand-made `LOOP` has no `loopRecord`, so the line read „najdłużej bez śmierci: undefined przejść z rzędu”); after the fixture fix exit 0 (28 pass, 0 fail).
- `npm test -- tests/view/clock.test.mjs` → exit 0 (it also builds an `awayReport`; run as a neighbour of the touched code).
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 0, `0 errors`.
- `npx prettier --check` on the three files → exit 0; `npx eslint` on `away-report.ts` and `away-report.test.mjs` → exit 0.
- Not run: the full gate (`npm test` with no file), as the handoff says.

## Own-work check

- Requirement most likely not met: „na końcu wiersza postaci … «najdłużej bez śmierci: {n} przejść z rzędu»” — three ways to miss it: the noun declined wrongly (12–14, 22, 25), the record placed before „wskrzeszenie zużyte” rather than at the end, and the record read from the line or from a later earning loop instead of from the character's earning loop of now (a stopped line must carry none).
- Check: the declension table for 1, 2, 3, 4, 5, 11, 12, 14, 21, 22, 25 written out by hand; one line with chest, practice and „wskrzeszenie zużyte” all present, with the whole entry compared (`danger: false`, `takeFor: 1` unchanged); the stopped lines, in a catch-up and in the open game, with a record of 7 held by another earning loop of the character; and the same report read with two different sets of loops. All pass. Mutations thought through: dropping the `loopRecord === 0` guard (caught by the zero case), moving the record before the resurrection note (caught by the full-line case), a `few` form taken for 12 (caught by 12 and 14), reading the record from the report line (caught by the two-readings case).
- Browser check (see Screen): the line draws as expected.

## Quotations of decisions

Every new `// decision:` line quotes, from its start, a sentence of D-246 as it stands now: „At the end of the line of a character whose earning loop goes on stands the loop record … „5 przejść”.” and „It is read from the earning loop whenever the section is drawn, as the practice waiting is, and stands nowhere where it is zero.” The foundation check shows no error in the files.

## Walk of the running product

The change alters what a user sees: the text of a line in „Gdy cię nie było”.

| Case | By what | Verdict |
|---|---|---|
| A character whose earning loop goes on and whose loop record is 3 reads „Ala: 5 min · najdłużej bez śmierci: 3 przejścia z rzędu” in the section, in the line's own role, with „Zamknij” as before | `npm run local` over HTTPS at `https://127.0.0.1:<port chosen at the start>`, Playwright CLI 0.1.22, on Windows 11; a state composed with the functions of the simulation (two characters, an earning loop of Ala on Las with `loopRecord` 3, a report line of Ala, 5 min) sent by `PUT /api/saved-game`, then a reload | passed — the text of the line read by script and the screenshot inspected |
| The second character, with no earning loop and no line | same page | passed — no line of Ola in the section |
| Console | `playwright-cli console error` | passed — 0 errors |
| side observation | — | none; the line is plain text (`away-report-line`, no `danger`, no mark) |

Not checked in the browser: the zero record, the stopped line and the declension forms — the tests above decide those, and a wait of the game for a record to grow by itself would take minutes of game time. Screenshots: inspected, none pushed, none kept (as the handoff says for this slice); the file the tool wrote, the composing script, the state and the logs were in `.runs/executor-13/` and `.playwright-cli/` and were removed.

## Reaches beyond the handoff

- `tests/view/headquarters-screen.test.mjs` is not in the slice's *Change*, but the slice's *Checks* names it: its hand-made earning loop `LOOP` (line 63) lacks the fields `inARow` and `loopRecord` of Slice 5's `EarningLoop`, so after this change its report lines read „undefined przejść z rzędu”. I added `inARow: 0, loopRecord: 0` to the fixture (a small mismatch of the plan and the code, adapted) instead of making the view tolerate a loop without the field, which the type and the load of a saved game rule out. The other hand-made earning loops of `tests/view/` (`camp-picture.test.mjs:15`, `maps-screen.test.mjs:82`) draw no report and were left; they may lack the fields too (a guess, not checked).
- Read in addition to the handoff's list: `src/browser/view/headquarters.tsx` lines 100–160 (it was in the list; read in part), `tests/view/headquarters-screen.test.mjs` lines 55–90 and 495–512, `.claude/skills/loop2-play/SKILL.md` and `compose-state.mjs` (for the browser check).

## Choices

- The record goes after „wskrzeszenie zużyte”, as the very last words of the line, by D-246 „At the end of the line”, and the example in D-246's *complies* (`… jagoda +12 · najdłużej bez śmierci: 3 przejścia z rzędu`); the other order would put „wskrzeszenie zużyte” at the end. Cost if wrong: one test string and one concatenation.
- The test case name uses the form „decision: D-246” lines for the sentence of the new paragraph of D-246 and not D-241, as the text of the line stands in D-246.

## Unread material

- `guidelines/styleguide-browser-view.md` (1213 lines): not read whole; I searched it for „away”, „report”, „Gdy cię nie było” and „najdłużej” and found nothing, and the change draws no new element and touches no stylesheet.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: read whole. `foundations/decisions.md` D-241 and D-246 and `foundations/glossary.md` „loop record”, `foundations/part_map.md` browser-view: read in the ranges the handoff gives.
- Everything else the handoff names was read whole.

## Searches not found or unclear

- none

## Working copies

- `.runs/executor-13/` (composing script, state document, screenshot, logs) and `.playwright-cli/` stood under the worktree root `.`; both were removed. The browser was closed and `npm run local:stop` ended the local game. Nothing remains.
