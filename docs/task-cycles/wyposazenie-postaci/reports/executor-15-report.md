done with concerns — Slice 15 (the line of gear on the screen of a map run, and that screen checked in Chromium); commit 883489bf on task/wyposazenie-postaci

## Commits

- `883489bf` feat: :sparkles: the screen of a map run holds the line of gear under the backpack line, the main hand first and the pockets after it, in the backpack's text and class (D-311, D-455)

Files (range from the slice base fe521037; 156 insertions, 5 deletions):
- `src/browser/view/gear-lines.ts` (new, +30): pure `gearLine(gear)`.
- `src/browser/view/world-area.tsx` (+3 −1): draws the line right after `BodyRowCells`, before the solved line, the practice line and „Wyniesie”.
- `tests/view/gear-lines.test.mjs` (new, +80): 8 cases, written first.
- `tests/view/world-area.test.mjs` (+47 −5): class and index updates for the new element, plus one new test.

## Checks (command → exit code)

- `npm test -- tests/view/gear-lines.test.mjs` before the code, with a stub `gearLine` returning "": **exit 1**, every case failing on its assertion (`actual ''`), not on a missing module.
- `npm test -- tests/view/gear-lines.test.mjs` after the code: **exit 0**, 8 of 8 pass.
- `npm test -- tests/view/world-area.test.mjs`: first run **exit 1**, one failure from my own expectation (`Plecak 0/15` where the state holds `patyk 5`); corrected to `Plecak 5/15: patyk 5` in the test; rerun **exit 0**, 20 of 20 pass.
- `npm test -- tests/view/run-screen.test.mjs`: **exit 0**, 25 of 25.
- `npm test -- tests/invariants/test_content_identifiers.py`: **exit 0**, 5 tests OK.
- `npm run typecheck`: **exit 0**.
- Extra, not in the slice's list: `npx prettier --check` on the four files: first **exit 1** (two test files), `npx prettier --write` on those two, then **exit 0**. `npx eslint` on the four files: **exit 0**, no output.
- Extra: `python -B .the-way/elements/common/foundation_check.py` reports 2 errors, both in `tests/view/character-screen.test.mjs` (lines 134 and 400, quotations of D-446 and D-445), none in this slice's files. The count is below the 14 the handoff recorded; I did not check which slice made the change.
- The product's full gate (`npm test` without a file) was not run, per the handoff.

## Tests that fail on the slice base

None of the slice's tests existed on the base. `tests/view/world-area.test.mjs` and `tests/view/run-screen.test.mjs` pass on the base as on the change, as far as I know: I did not run them on the base.

## Choices made

1. **Element and class of the line.** The line is `<p className="backpack-text">` drawn in `world-area.tsx` right after `BodyRowCells`. The class is the backpack's, so no stylesheet changes (F19). Rejected: putting it inside `body-row-cells.tsx`, which the styleguide names as the component (its D-455 paragraph, styleguide lines 1591–1595), because the slice names `world-area.tsx` as the drawer. Cost: the line sits outside `.body-row`, so the `gap` of the body row does not separate it from the backpack line; in the screenshots the two lines stand close together with no gap. Check it by eye if the layout is judged.
2. **One piece in a pocket.** Written without a count: „opatrunek pod ręką”, as the main hand's „patyk w ręku” has none. Rejected: „1 × opatrunek pod ręką”. Cost if wrong: one line of text; the slice's examples do not cover one piece.
3. **Pockets grouped by item, in the order the pockets first hold each item.** Only the main hand and the pockets are named, as the slice gives.

## Changed invariant or test expectations

`tests/view/world-area.test.mjs`: the expected class lists of the first test (going, completed, dead) gained `"backpack-text"` after `"body-row"`, and the indices of the solved line, the practice line and „Wyniesie” moved by one (`parts[4]`→`[5]`, `[5]`→`[6]`, `[6]`→`[7]`, `ended[4]`→`[5]`). Cause: the slice expressly adds the line (D-311 and the slice's Goal). The added test quotes D-311 with the sentence as it stands in `foundations/decisions.md`.

## Browser check (loop2-play, Playwright CLI 0.1.22)

Started with `npm run local` at `https://127.0.0.1:57519`, account `agent15@example.test` (made-up), state composed with `.claude/skills/loop2-play/compose-state.mjs` and adjusted in scratch scripts (two bandages in the pockets, main hand empty, chest of 5 sticks and 1 bandage, and the bandage added to the understanding's items: without it the bandage is not offered as a target of „Załóż”, which is the game's own rule for an item not yet seen). Save sent with `PUT /api/saved-game` → `200 {"revision":…}`. Local start stopped with `npm run local:stop` (1 start stopped).

Plan of cases and verdicts:

| Case | Where | Verdict |
|---|---|---|
| Line of gear under the backpack line, 1280 × 720, no touch: „Wyposażenie: 2 × opatrunek pod ręką” | desktop, Chromium | checked: shown under „Plecak 0/15”, same text and size as the backpack line (screenshot below) |
| Line of gear, 360 × 740 with touch: same text, no crossing, not in the controls list | phone, Chromium, `hasTouch` | checked: visible under „Plecak 0/15”; phone measure lists no control under 48 px, and the gear line is not in any overflow list |
| Rule „Puste — Ręka główna → Załóż — Patyk” committed, the item pick offers „Patyk”, „1 min” beside „Załóż” | desktop | checked: the chronicle reads „Zmieniono regułę 1.1: … na „Puste — Ręka główna → Załóż — Patyk””; the row shows „brakuje 1 × patyk” in amber (`rgb(254,154,0)`) with „1 min” |
| Rule „Puste — Kieszeń → Załóż — Opatrunek” committed, the item pick offers „Patyk” and „Opatrunek” | desktop | checked: the window shows „Puste — Kieszeń”, „Załóż — Opatrunek”, „1 min”, „Opatrunek” chosen; the row reads „brakuje 1 × opatrunek” in amber |
| Rule window at 360 px with touch | phone | checked: the condition pick shows „Puste” chosen; the measure lists no overflow of the window |
| Colour of „Załóż” out of combat | desktop and phone | checked: the only amber on the row is the reason of the lack („brakuje …”); no „trwa walka” or „tylko w walce” text |
| Colour of „Załóż” in combat | — | **not checked**: no combat reached in the session |
| Strike refills the hand: „Mag bierze patyk z plecaka do ręki” in the combat line and the chronicle | — | **not checked**: no stick in the backpack, no wolf fight in the session |
| „Teraz” reading „Zakłada …” | — | **not checked**: no „Załóż” rule fired (no stick in the backpack, pocket already full) |
| Paragraph of an encounter with the refill (Slice 12) | — | **not checked**: no combat |
| Program editor at 1280 × 720 and 360 px beyond the rows above | desktop, phone | checked as listed above |
| Gear changes refused in a manual run | — | not part of this slice; not checked |

Screenshots (shown to the human; pushed as the loop2 skill's D-418/D-419 route, to the public repository `mariusznazar/screenshots`, branch `loop2/wyposazenie-postaci`, commit `c7aa7109188ef9d881b1ccdd9dee25da12092b8f`):
- `![Map run at 1280 × 720 with the gear line under the backpack line](https://github.com/mariusznazar/screenshots/blob/c7aa7109188ef9d881b1ccdd9dee25da12092b8f/loop2/wyposazenie-postaci/slice15-desktop-map.png?raw=true)`
- `![Program at 1280 × 720 with the pocket rule and its Załóż pick](https://github.com/mariusznazar/screenshots/blob/c7aa7109188ef9d881b1ccdd9dee25da12092b8f/loop2/wyposazenie-postaci/slice15-desktop-rule-pocket.png?raw=true)`
- `![Map run at 360 px with touch, the gear line under the backpack line](https://github.com/mariusznazar/screenshots/blob/c7aa7109188ef9d881b1ccdd9dee25da12092b8f/loop2/wyposazenie-postaci/slice15-phone-map.png?raw=true)`
- `![Rule window at 360 px with touch](https://github.com/mariusznazar/screenshots/blob/c7aa7109188ef9d881b1ccdd9dee25da12092b8f/loop2/wyposazenie-postaci/slice15-phone-rule.png?raw=true)`

Notes on the check:
- The clone for the screenshots was made under `.runs/executor-15/screenshots/` (the working-copy rule), not `.runs/screenshots` as the skill names; the branch was created from `main` as the skill says, since none existed.
- Layout facts I did not trace to a cause: on the desktop the world area measures 676 px of content in a 672 px box (4 px); on the phone 330 px in 318 px (12 px), and the scene picture's `img` spans 156–412 px outside the 360 px window. The gear line is in neither list. I did not measure these on the base, so I do not call them regressions.
- No fault in the gear line itself was found, so nothing was fixed outside the slice's *Change* list. `src/browser/view/rule-panel.tsx` was not touched.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–539 whole, and the ranges 709–748, 1584–1600 and 1737 by search; not read whole (1975 lines). Its rules for the body row and the phone layout were read where cited.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: lines 50–129 read; lines 117–121 and 128 are inside that range. Lines 262–267 (the *Settlements to record* row about the line of gear) were not read: my read of them failed on a wrong path and I did not retry.
- `foundations/part_map.md:3-33`: not read (the handoff's part range is 3-32; I took the part from the handoff).
- `plan.md`: lines 1–40 read, and Slice 1's section by search; the rest not read. The slice's text in the handoff was used as given.
- `foundations/decisions.md` D-311: read at lines 10821–10982 as the handoff gives.
- Everything else the slice's *Read* names was read whole: `.claude/skills/loop2-play/SKILL.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `tests/view/world-area.test.mjs` (lines 1–325 plus the new test), the change SKILL.md, `slice.md`, `ui_check.md` and `walkthrough.md`.

## Searches not found or unclear

- The styleguide's D-455 paragraph names `src/browser/view/body-row-cells.tsx` as the component of the gear line; the slice names `world-area.tsx`. I followed the slice (choice 1 above). The mismatch is for the orchestrator to settle; the styleguide text was not changed by me.
- The bandage is not offered as a „Załóż” target until the player's understanding holds it; this is the game's rule, not a fault, but it means the bandage pick cannot be checked on a fresh composed state without adding it to the understanding (done in the check, as described).
- No foundation entry for the gear line's words was found beyond D-311 and D-455; the words in `gear-lines.ts` come from `GEAR_PLACES` in `src/browser/sim/data/gear.ts` and `ITEMS` in `items.ts`.

## Working copies

- `.runs/executor-15/screenshots/` (clone of `mariusznazar/screenshots` for the screenshot push): removed, its commit recorded above.
- `.playwright-cli/` in the worktree (CLI files, screenshots, scratch scripts and the composed state): removed.
- `.runs/executor-15/local.log` (the local start's log): removed. `.runs/local-start/` (the start's database) stays, as the skill says it is no leftover to clean up.
- No `git worktree` was made.

## Own-work check

Requirement: the line under the backpack shows the words of the data, the main hand first, the pockets after, and „Wyposażenie: nic” for nothing, from the map run's character's gear, in the backpack's class (D-311, D-455). Check: the eight tests of `gear-lines.test.mjs`, and the world-area test that reads the line in the drawn part. Result: all pass after the one expectation fixed above. Browser: the line is seen at 1280 × 720 and at 360 px with touch; the rest of the browser cases are listed above, with the ones not checked named.

## Walkthrough

The change alters what a user sees on the screen of a map run, so the walk applies. Cases and verdicts are in the table above; the cases that could not be checked are named with their reason. Not checked: the combat cases and the refill, because no fight was reached in the session.
