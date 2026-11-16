# Report — fix 1 of the review of the whole change, cycle `drobne-bledy-ekranow`

**Status: done** (with the notes under "Questions and concerns").

Worktree `.`, branch `task/drobne-bledy-ekranow`, started from `5b3dac41`; head after the fix `fe15a267`.

## Commits (after `5b3dac41`)

| Commit | What |
|---|---|
| `5ddb7050` | B1 / I-1: the twelve `decision:` lines re-quoted (4 test files) |
| `a3baf310` | M3: pointers to the task document removed from three comments of `program-panel.test.mjs` |
| `04185e09` | I-2: D-297 comments and titles (`program-editor.ts`, `program-editor.test.mjs`, `rule-editor.test.mjs`) |
| `99e9fe6d` | I-3 / M1: the menu test (`menu-bar.test.mjs`) |
| `b01ec83e` | M2: `focusAfter` narrowed (`rule-list.tsx`) |
| `1822fbee` | M4: key and class (`tile-table.tsx`, `terrain-drawing.tsx`) |
| `fe15a267` | I-4, M-1, M-2, M-3: `foundations/decisions.md`, `guidelines/styleguide-browser-view.md` |

13 files, +98 / -120 lines in all (`git diff --stat 5b3dac41..HEAD`).

## Each finding

**B1 / I-1 — twelve `decision:` lines (fixed once).** Each line now quotes the start of a binding sentence of its decision, word for word, with no ellipsis and no added full stop:
- `shared-controls.test.mjs:787` D-267: the whole sentence from "No tool guards the rules of hooks and of effects: …" to "… handle a user event."
- `program-panel.test.mjs:1993` D-306: from "After the last field the panel stays open, …" to "… its new group".
- `program-panel.test.mjs:617` D-174: the first sentence from "During a map run, picking a saved program …" to "… „Kopia w przejściu” again" (the elision removed; the reviewer's "second sentence" is the sentence "Beside the program the copy belongs to, the button is gone.", which the test does not hold, so I took the sentence that carries "its click switches the character").
- `program-panel.test.mjs:647` D-164: from "Programs belong to the player, …" to "… its unsaved changes included".
- `login-card-focus.test.mjs:218, 233, 249, 303, 318` D-381: the whole second sentence, "The card takes no focus when it opens — … never while it is being drawn."
- `login-card-focus.test.mjs:269`: the quotation of the plan's Goal sentence is replaced by the same D-381 sentence. The test shows a signed-in player's refused link gives the game and no card takes focus, which D-381's "the page moves focus to it only after …" holds. D-225's "after a refusal of the link, whatever its reason, …" cannot be quoted: it stands mid-sentence, after "; ".
- `game-saver.test.mjs:527, :561` D-208: from "When one fails, the header line under the menu bar shows …" to "… until a save succeeds and the sentence goes".
Check: `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (log `reports/fix-1-foundation-check.log`).

**I-2 — D-297 stated old.** Comments only, plus one test case:
- `program-editor.ts` `moveRule` doc: "Null only where there is no group to move to: „↑” at the group's edge with no group before the rule's group, „↓” with none after it." `ruleArrows` doc: "off only where no group stands on that side of the rule's group."
- `program-editor.test.mjs:934` comment; titles of `program-editor.test.mjs:1591` and `rule-editor.test.mjs:400` now say "off only where no group stands before (after) the rule's group …".
- The reviewer's "better still" is done in `program-editor.test.mjs` (the arrows test): groups [empty, one rule, empty], `ruleArrows(…, 2, 0)` is `{ up: true, down: true }`, so the quoted clause "so a rule group left empty at the edge of the program takes the rule" is now exercised. In `rule-editor.test.mjs` the D-297 `decision:` quotation is cut before ", so a rule group left empty …", since that test does not hold it (the quotation still begins the sentence).
No behaviour changed.

**I-3 / M1 — menu test.** `menu-bar.test.mjs:318`: the test puts the focus on the link (`link.focus()`, as the neighbour test does with the field) before `press(link)`, and asserts `active()` is the link after the menu closes; the title says "… closes it and leaves the focus on that item"; the `decision:` line now quotes the full D-285 sentence, which carries the focus clause. Mutation check below.

**M2 — dead branches.** `rule-list.tsx`: `StructuralEdit` removed; `FocusTarget` is `{ groupId; row; control: "remove" } | { groupId; control: "add" }`; `focusAfter(edit, …)` became `focusAfterRemove(groupId, index, ruleCount)` (same two results); `keysOf` has only the removal branches. Behaviour and tests unchanged (`rule-editor.test.mjs:936` holds the focus after „Usuń”).

**M3 — task-document pointers.** "(To do 7)" removed from two comments, ", To do 15" from one (`program-panel.test.mjs:590, 613, 1989`). Search `grep "To do" tests/view src` finds none left.

**M4 — key and class.**
- `tile-table.tsx:78`: `key={index}`.
- `terrain-drawing.tsx:95`: `if (tile.revealed && key === hovered)`. Search first: the class `hovered` on a tile `g` is read by no style (`styles.css` has only `.tile-list tbody tr.hovered th`; the kitchen sink uses `tr.hovered`); tests read `g.hovered` in `world-area.test.mjs:954` and `run-screen.test.mjs:529`, both on revealed tiles (they pass after the change, `world-area` 23, `run-screen` 21 pass). So I removed the class from an unrevealed tile.

**I-4 — D-381 Verification.** The clause now reads "no focus taken when the card opens after an expired save or after a session check that no refused emailed link and no „Anuluj” led to, focus in the first field after a confirmed logout, a logout answered with no session, a set password, a refused emailed link and „Anuluj” of the form „Ustaw nowe hasło”". The pair of examples is removed (M-1), since `login-card-focus.test.mjs` holds those cases. Binding sentences unchanged.

**M-1 — pairs.** Edited in `foundations/decisions.md`: the tests clause gains what the test holds, the pair keeps only what no test holds.
- D-306: move to another group by „↓” and by its handle added to the clause; the pair keeps the number left and the deletion.
- D-294: the groups of a new copy (send, switch) added to the clause; the pair keeps reload and the saved game state.
- D-172: the short line with the inactive „Zapisz w programie” added; the pair keeps placement and role.
- D-342: the entry of a changed rule (whole sentence before and after, joined by „na”) added; the pair keeps the edits after a completion.
- D-207: the send after a failed save (hidden page, 30-second rhythm taking the place of the retry) added to the clause; the two complies/violates items about it removed; the other two stay, and the lead-in is the one the base had.
- D-285: the focus after a click outside the menu on the imitation added to the clause; the pair, with its real-browser part, stays unchanged (as the finding says).
- D-381: as I-4.
- D-306's deleting part stays (no test), as the finding says.

**M-2 — unit.** Changed with the unit from `src/browser/sim/data/conditions.ts` (`itemBelow` "szt.", `temperatureBelow` "°C", `healthBelow` "pkt"): D-288 (two places) and D-300, D-291 "Zapas poniżej 8 szt. · Patyk"; D-295 "Temperatura poniżej 35 °C"; D-309 "Zdrowie poniżej 50 pkt". None of these is a quotation of a test (`decision:`).

**M-3 — styleguide.** `guidelines/styleguide-browser-view.md:310`: "więc ramka ma kolor swojego tekstu (D-279)," dropped; the colour `text-disabled` of the name and the frame stay stated, the reason "z powodem w `text-secondary` (D-289)" stays.

## Checks (command, exit code)

| Check | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0, `0 errors` |
| `python -B .the-way/instruction-files/check_instructions.py` | 0, `0 error, 142 warn, 7 info` (warnings as at the base; the script's sizes) |
| `npx eslint` on `program-editor.ts`, `rule-list.tsx`, `terrain-drawing.tsx`, `tile-table.tsx` | 0 |
| `npx eslint` on `tests/view/menu-bar.test.mjs`, `tests/view/program-editor.test.mjs` | 0 |
| `npx prettier --check` on the four `.ts`/`.tsx` files and the seven changed `.mjs` tests | 0 |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 (76 pass) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 (54 pass) |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 (32 pass) |
| `npm test -- tests/view/program-panel.test.mjs` | 0 (60 pass) |
| `npm test -- tests/view/login-card-focus.test.mjs` | 0 (6 pass) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 (23 pass) |
| `npm test -- tests/view/shared-controls.test.mjs` | 0 (50 pass) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (23 pass) |
| `npm test -- tests/view/tabs-area.test.mjs`, `tests/view/run-screen.test.mjs` (read the `hovered` class) | 0, 0 |

Not run: the full suite (the handoff forbids it). `check_instructions.py` and `foundation_check.py` are the two checks the one command runs too; I ran each alone.

## Own-work check

Requirement most likely not met: the menu test keeps its power — a test that now passes only because the code puts the focus where the test says would be as empty as the one it replaces. Check: in a working change of `src/browser/view/menu-bar.tsx:161` I made the outside-click handler take the focus for "on the body", so every click sends the focus to „Konto”, and ran `npm test -- tests/view/menu-bar.test.mjs`: two tests failed — "a click outside the menu closes it; focus stays where the player clicked …" and the rewritten "a click on an item of the bar … leaves the focus on that item" (30 pass, 2 fail). I restored the file (`git status` clean) before committing.

The second likely miss: a re-quoted `decision:` line the foundation check passes but the test does not hold. I read each test against its sentence (above); `login-card-focus.test.mjs:269` is the weakest (a negative case under D-381's "only after …" sentence).

## Questions and concerns

1. The title and a comment of other tests still write the rule with the number and no unit: `tests/view/rule-editor.test.mjs:1127` (title "„Zapas poniżej 8 · Patyk → Zbierz — Patyk” …") and `tests/view/program-panel.test.mjs:1044` (comment). M-2 anchors only `decisions.md`, so I left them. The orchestrator's return step can fix them (one word each).
2. D-174's `decision:` line quotes the first sentence of the decision, not the second as the reviewer wrote (see B1).
3. The D-267 and D-381 quotations are long sentences that the test holds only in part (the foundation check holds a quotation to the start of a sentence, not to its whole).

## Choices (way rejected, cost if wrong)

- `focusAfter` renamed `focusAfterRemove` and its `edit` parameter dropped, instead of keeping the name and a one-value parameter. Cost if wrong: a rename of one private function.
- The test of D-297 gets an added case (three assertions in one existing test) instead of only rewording, on the reviewer's "better still". Cost: three lines of test.
- D-285's pair left whole (the finding says the real-browser part stays), instead of removing the complies/violates items the imitation test now holds; the imitation proves them only with the focus the test gives.

## Reaches beyond the handoff

- `.the-way/elements/decisions/template.md`, `.the-way/elements/decisions/skill/read.md`, `decide_entry.md`, `.the-way/elements/common/way_of_working.md` (read for the form of *Verification* and the checks); `src/browser/AGENTS.md`; `src/browser/view/menu-bar.tsx:150-172` and `src/browser/sim/data/conditions.ts` (the unit and the focus code); `.the-way/elements/common/foundation_check.py:795-840` (how a quotation is held). The handoff named none of these; the first group is what `foundation_step.md` points to.

## Unread material

- `.runs/task-cycles/drobne-bledy-ekranow/task.md` and `plan.md`: not read (the findings file was enough; no finding was silent).
- `reports/review-whole-report.md`, `reports/review-docs-report.md`: not read (the findings file holds the findings in the reviewers' words).
- `guidelines/styleguide-browser-view.md`: read only the passage around line 300-320 (my change there is one dropped clause; no visual change).
- `guidelines/coding-browser-module.md`: not read whole (`grep` for "key" only); my code changes are a key, a class condition and a narrowing.
- `.the-way/elements/common/rules.md` and the decisions' `examples.md`: not read (no new entry was written; edits of existing *Verification* and examples only).
- `.the-way/elements/common/way_of_working.md`: read to step 4 (the whole file was printed); the `critique` step was not made (no new entry set).

## Searches not found or unclear

- None unclear. Not found: no style reads the class `.tile.hovered` (the search for M4 found none); no test reads `hovered` on an unrevealed tile.
- The reviewer's anchor "second sentence" of D-174 does not match the log (see B1); resolved as stated there.

## Working copies

The directory `.runs/fix-1/` (my editing scripts, the logs and one copy of `menu-bar.tsx` for the mutation check) stood in the worktree; I removed it. Nothing else was made. I kept `reports/fix-1-foundation-check.log` beside this report.
