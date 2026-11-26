done

# Report of executor-20 — Slice 20, Postać: the pick under a tile, the screen checked in a browser, the screenshots

## Commits

- `7898151d11c087aae749ab5ca6e46d13b137cdbf` on `task/wyposazenie-postaci` (base `e157c111`) — the pick, its two acts, the stylesheet rules and the tests.
- Screenshots (not in loop2): commit `723a212e4e6d88a035149525078b00faedc583c7` of `mariusznazar/screenshots`, branch `loop2/wyposazenie-postaci`, directory `loop2/wyposazenie-postaci/` (links below).

## Files changed (added / removed lines, `git show --stat 7898151d`)

- `src/browser/view/character-gear.tsx` — the pick under the chosen tile (`GearPickCells`), its acts and the focus to the tile: +143 / −21
- `src/browser/view/character-screen.tsx` — `onPutOn` and `onTakeOff` in the options, passed to the section, which now gets `state` in place of `run`
- `src/browser/view/character-entry.ts` — the two acts through `store.act` calling `putOnPiece` and `takeOffPiece` (D-409)
- `src/browser/character-screen.css` — the rules of the pick (heading, sentence, two columns of cells), tokens only
- `tests/view/character-gear-pick.test.mjs` (new) — 11 cases

## Checks (command, exit code)

- `npm test -- tests/view/character-gear-pick.test.mjs` written first: exit 1, 11 of 11 failing, each on an assertion (for example `expected "Ręka główna: patyk", got undefined`; one `Cannot read properties of undefined (reading 'focus')` where the case reads a cell of a pick that did not exist yet); after the code: exit 0, 11 pass (run again after the last edit to the file: exit 0).
- `npm test -- tests/view/character-gear.test.mjs`: exit 0 (7 pass)
- `npm test -- tests/view/character-screen.test.mjs`: exit 0 (16 pass)
- `npm test -- tests/view/screen-registry.test.mjs`: exit 0 (15 pass)
- `npm test -- tests/view/state-store.test.mjs`: exit 0 (12 pass)
- `npm run typecheck`: exit 0
- `npx eslint src/browser/view/character-gear.tsx src/browser/view/character-screen.tsx src/browser/view/character-entry.ts tests/view/character-gear-pick.test.mjs`: exit 0
- `npx prettier --check` on the five changed files: exit 0
- `python -B .the-way/elements/common/foundation_check.py` after `git add` of the new file: first run exit 1 (one error: `tests/view/character-gear-pick.test.mjs:331: decision: gives no decision number as the log writes it`, a `// decision: none` line I had written); line removed; second run exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: 0 errors, 0 warnings.
- `npm test -- tests/invariants/test_browser_view_token_values.py`, `…/test_content_identifiers.py`, `…/test_browser_view_framework.py`: each exit 0 (the new stylesheet rules and the TypeScript of the section touch those invariants; not in the slice's *Checks*, run as the checks of the code touched).
- Not run: the whole suite (`npm test` without a file), as the method forbids it. The slice's *Checks* name no whole-suite command, so there is no mismatch to report.

Tests that fail on the base and their result there: none failed after the change, so no measure on the base was needed.

## What the slice makes

- A touch on a selectable tile chooses it and opens, under the tiles, the pick of `gearPick` (Slice 2): a pick cell for each item of the chest that fits (`ReactPickCell`, the icon of the item, text `{name} × {pieces}`), then „Zdejmij” with no icon where the slot holds a piece; above it `{miejsce}: {rzecz}` or `{miejsce}: nic` (an `h4`, `text-strong`); `W skrzynce nie ma nic, co tu pasuje.` (`text-secondary`) where nothing fits, with „Zdejmij” beside it at a held slot; „Zdejmij” greyed with `GEAR_REFUSAL_WORDS[takeOff]` (`skrzynka pełna`) where `gearPick` says the chest cannot take the piece, and a greyed cell sends nothing.
- A cell or „Zdejmij” calls `onPutOn(slot, item)` or `onTakeOff(slot)` and closes the pick; a second touch of the chosen tile closes it; a touch of another tile moves it. The focus goes to the tile of the slot after an act (the cell that held it leaves with the pick): a layout effect with no list of dependencies, as the rules of the section "Effects" allow for the `focusAfterCommit` pattern, reads `refocus` (a ref the act sets) and focuses the tile's element.
- The entry runs both acts through `store.act` (clock first, D-409) with the state read inside the body, calling `putOnPiece` and `takeOffPiece`.

## Choices

- Text of a cell: `{name} × {count}` (for example `patyk × 3`), the count always shown. The task says "ikoną, nazwą i liczbą sztuk", in that order, and the styleguide says both stand in the name's role; `gear-lines.ts` writes `{count} × {name}` and omits the count of one, but there the count is a count of a held group, here the pieces of the chest. Rejected: the count first (the order the task gives is name, count); two spans (a break between them would put a count alone on a line). Cost if wrong: one string and its cases.
- Two columns of cells in both layouts (`repeat(2, minmax(0, 1fr))`), as the pick of the rule panel stands in the phone layout. Rejected: auto-fill of columns (the width would be an `em` or `px`, banned by D-43); one column (a long list of items). At 1280 px and at 360 px the cells measured 134 px wide, no name broke.
- `CharacterGear` takes `state` in place of `run` (the pick needs the chest, `gearPick` takes the state); the section's props were Slice 19's own and nothing else calls it.
- The pick's group has `role="group"` and `aria-label` equal to the heading (as the grid of the rule panel has), so a reader of the screen hears the heading with the cells.
- The heading is an `h4` (as `rule-panel-section-name`), not a `p`.
- No change to `tests/view/character-gear.test.mjs` or `character-screen.test.mjs`: they build the screen with `onBuy` and `onStop` only; they never press a cell, so the two new options being undefined there changes nothing they read.

## Own-work check (section 3)

- The requirement most likely not met: the focus never falls to the page after an act or a closing (rule "Focus does not fall to the page"). Check: the case "the focus stays at the tile of the slot when a pick closes, by an act or by a second touch" (jsdom) and the same in Chromium (phone session, tap on the cell: `document.activeElement` is the tile of the slot, `aria-label` `opatrunek`). Mutation: the line `tiles.current[slot]?.focus()` replaced by `void slot;` → `npm test -- tests/view/character-gear-pick.test.mjs` exit 1, that case failing and only that case; the line restored (identical to the commit, `git diff` showed the same stat) and the file passes (exit 0).
- The second requirement checked on purpose: the act reads the state after the store's reading of the clock (D-409). The case "the entry reads the state inside the body of the store's act, after its reading of the clock" has a stand-in store whose reading of the clock takes the stick out of the hand before the body; an entry that read `store.get()` outside the body would put the old gear back. I did not run a mutant of it (the entry reads the state inside the body by construction, as `onStop` does); the case is written to fail on that break.
- Mutating in my head the rest: a wrong slot or item sent (the case of the cells checks `["putOn","pocket2","bandage"]`), a pick that stays after an act (asserted), a greyed cell that sends (asserted `sent` empty), a heading of a pocket by its number (the case checks all three pockets by name), a pick that survives a locked tile (the case of the run that starts).

## Walk of the running product (`walkthrough.md`)

The change alters what a user sees: the screen Postać gets the pick and its two acts. Shared code touched: the registry's entry of Postać and `CharacterGear`; the screen's `createCharacterScreen` boundary gets two options (only the entry and the tests call it).

Where: Chromium through `playwright-cli` 0.1.22 on this computer (Windows 11), `npm run local` at `https://127.0.0.1:60098`, a made-up account at `example.test`, states composed with the game's own functions (a character at the camp with gear and a chest, a second in an earning loop, the first in a manual map run, a full chest of 60 berries) and sent by the ordinary save request. Computer layout: 1280 × 720, no touch, mouse clicks. Phone layout: `.playwright/cli.phone.config.json` (360 × 740, touch), taps by `page.tap`, the measurement of the skill; once at 1100 × 800.

| Case | By what | Verdict |
|---|---|---|
| Ala at the camp, main hand holds a stick, chest `stick 3, bandage 4, berry 2`: tile of the main hand opens `Ręka główna: patyk`, cells `patyk × 3` (icon) and `Zdejmij` (no icon) | 1280 px, mouse; `eval` and screenshot | right |
| the same at 360 px, touch | phone, `tap` on the tile, `innerText` of the pick, screenshot, measurement | right |
| empty pocket: `Kieszeń: nic` with `opatrunek × 4`; a tap on it puts the piece on, the pick closes, the tile shows the bandage, no tile stays pressed, the focus is on a tile | phone, `tap`; `eval` of the page | right |
| Ola in an earning loop: sentence `Postać jest w pętli. Zmiana działa od następnego przejścia.` above the tiles, the pick opens | 1280 px and 360 px | right |
| Ala in the manual map run: all eight tiles disabled, the sentence of the unfinished run, no pick | 1280 px and 360 px | right |
| chest full (60 pieces): `W skrzynce nie ma nic, co tu pasuje.` with `Zdejmij` greyed, reason `skrzynka pełna` | 1280 px and 360 px, screenshot | right |
| measurement at 360 px, in the pick states above: nothing scrolls to the side, no control under 48 px | skill's measurement; `controlsSmallerThan48` empty in all four phone states | right |
| the same at 1100 px | measurement after `resize 1100 800` | right (no side scroll, no small control) |
| console of the session | `playwright-cli console error` | 0 errors |
| side observation | — | see below |

Two entries stay in `contentWiderThanItsBox` and `outsideTheWindow` in every state, also in states with no pick: `div.character-figure` (content 192 > box 128), `div.scene-sheet` (1024 > 256) and an `img` spanning outside the window. They are the sprite sheet of the figure inside its box with `overflow: hidden` (Slice 14's figure; the screenshots show the figure whole and nothing crossing), so a sign, not a fault. The measurement at 1280 px lists the menu bar items and the cells, each under 48 px high, as the computer layout allows (D-396 gives the minimum to the phone layout alone).

What fell wrong: nothing in the browser; nothing corrected from it. The one error of the run was the `decision:` line of the test described under Checks.

What I did not check: Firefox, Edge and a real phone (the styleguide leaves them to a human); the `reading of the clock` path with a death settled in the time caught up in a real game (covered by the stand-in case only); a pick with many different items in the chest (the data has two items with a place, so no screen of the game shows more than one cell of an item); the screen with a map run of *another* character beside the open tiles in a browser (covered by Slice 19's jsdom case).

Side observation: a white frame stands round the whole left area in the screenshot taken at 1280 px after `location.hash` was set by `eval` and the chest was full (it is the keyboard-focus outline of the screen's host element, which the page focuses when the screen changes; the screenshot with that frame was not pushed). Not changed by this slice and not a fault of the pick; named for the orchestrator.

## Screenshots (pushed by this slice)

The public repository holds only the made-up account's characters (Ala, Ola); no address, password or token is on any screenshot (each looked at before the push). Commit `723a212e4e6d88a035149525078b00faedc583c7`:

- Computer layout, a character at the camp, the pick of the main hand open: `![Postać at the camp, 1280 px, the pick of the main hand](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-desktop-camp-pick.png?raw=true)`
- Computer layout, a character in an earning loop, the pick open: `![Postać in an earning loop, 1280 px, the pick of the main hand](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-desktop-loop-pick.png?raw=true)`
- Computer layout, a character of a manual map run, tiles locked: `![Postać in a manual map run, 1280 px, the tiles locked](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-desktop-run-locked.png?raw=true)`
- Phone layout, a character at the camp, the pick open: `![Postać at the camp, 360 px, the pick of the main hand](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-phone-camp-pick.png?raw=true)`
- Phone layout, a character in an earning loop, the pick open: `![Postać in an earning loop, 360 px, the pick of the main hand](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-phone-loop-pick.png?raw=true)`
- Phone layout, a character of a manual map run, tiles locked: `![Postać in a manual map run, 360 px, the tiles locked](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-phone-run-locked.png?raw=true)`
- Phone layout, a full chest, „Zdejmij” greyed with its reason: `![Postać, 360 px, a full chest, Zdejmij greyed with skrzynka pełna](https://github.com/mariusznazar/screenshots/blob/723a212e4e6d88a035149525078b00faedc583c7/loop2/wyposazenie-postaci/slice20-phone-full-chest-pick.png?raw=true)`

(The tile of the figure's hover in the loop screenshots, the pale first pocket on the computer one, is the mouse resting on it after an earlier click.)

## Reach beyond the dispatch

- Read the rest of `guidelines/testing.md` and, of `guidelines/styleguide-browser-view.md` (1975 lines), the rules the slice's work meets, by their headings: "Two layouts and one threshold between them", "Nothing scrolls to the side…", "Everything is done by touch…", "A change is checked in both layouts", "Focus does not fall to the page" and "The screen Postać", beside the rule "States of shared controls" (read whole) — the dispatch named the whole file; see Unread material.
- `foundations/decisions.md`: D-453, D-461 and D-409 at the ranges the handoff gave; `src/browser/sim/gear.ts`, `src/browser/sim/data/gear.ts`, `src/browser/sim/data/items.ts`, `src/browser/view/controls/react-button.tsx`, `rule-panel.tsx` (the pick's markup), `program-panel.css` and `styles.css` (the pick cell's rules), `tests/view/maps-screen.test.mjs` (the stand-in store pattern) and `tests/view/character-gear.test.mjs`: read to follow the pattern of the repository, not named in the dispatch.

## Working copies

- `.runs/executor-20/`: the compose script, the three composed states, the logs of the runs and the clone of `mariusznazar/screenshots` — removed (`rm -rf` by the full path; `.runs/executor-20` no longer exists). `.playwright-cli/` of the worktree removed. The Chromium session closed (`playwright-cli close`) and the local start stopped (`npm run local:stop`: `Local starts stopped: 1`). No git worktree or other clone was made.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–539 (roles, the rules up to "The kitchen-sink page", "States of shared controls" whole) and 561–790, 829–840, 1116–1215 ("The screen Postać"); not read: 540–560, 791–828, 841–1115, 1216–1975 (other screens' rules, the rule "A line at a text takes the colour of that text", "A name typed by the player breaks in its row", the scene, the body row, program editor, windows, the list of accounts), which the work did not touch. I read this partly because the file exceeds what one read returns and the work meets only the named rules.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: read lines 51–53, 56 and 285–286, as the handoff names; nothing more.
- The foundation entries D-418 and D-419 (the handoff names them): not read as entries; their rules are in the skill's section "Show a screenshot to the human", which I read whole and followed (branch `loop2/<cycle>`, public repository, commit named in the links).
- `foundations/part_map.md:3-32`: not read; the five files I changed are all in the part `browser-view` by the plan and the foundation check (exit 0) found them claimed.
- `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md` and `walkthrough.md`: read whole.

## Searches not found or unclear

- none

## Problems and remarks

- The handoff says the foundation check "currently reports 14 errors"; on this slice's base it reported none of them (after my one error was fixed, `0 errors`): the slices before this one had already made them 0.
- The plan's Slice 20 text says the screen "calls the acts of Slice 2" by name; the names in the code are `putOnPiece` and `takeOffPiece` (as the handoff and `gear.ts` give them).
