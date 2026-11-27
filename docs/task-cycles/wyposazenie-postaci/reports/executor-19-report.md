done

# Report of executor-19 — Slice 19, Postać: the tiles of the eight slots and their sentences

## Commits

- `e157c111` feat: the section „Wyposażenie” of the screen Postać holds the tiles of the eight slots around the figure … (D-461, D-454, D-462, D-287). On the base `7d18842d`; one commit; committed by path.

## Files changed (from `7d18842d`)

| File | Added / removed |
|---|---|
| `src/browser/view/character-gear.tsx` (new) | 124 / 0 |
| `src/browser/view/character-screen.tsx` | 10 / 6 (the section's markup and the figure import go; `CharacterGear` comes in) |
| `src/browser/character-screen.css` | 46 / 5 |
| `tests/view/character-gear.test.mjs` (new) | 473 / 0 |

Total of `git diff --stat`: 653 insertions, 11 deletions. No file outside the slice's *Change*.

## What was made

- `CharacterGear` (`character-gear.tsx`): the section's heading „Wyposażenie”, the sentence, and the body — the left column „Głowa”, „Tułów”, „Nogi”, the figure (`CharacterFigure`, unchanged), the right column „Ręka główna”, „Druga ręka”, and under them the row of three pockets. Each tile is the `kind="tile"` of `ReactButton` (Slice 16): the icon and name of the item in the slot, from `ITEMS`, or the pale name of the slot's place from `GEAR_PLACES`. Slots come from `GEAR_SLOTS` grouped by place; every slot stands, a slot nothing fits included (D-454).
- The tiles read `character.gear`, the gear the game keeps at the character outside a map run. So for a character in an earning loop they show the gear set for the next map run (D-462), and for the character of the manual map run they show the gear it entered with: the team's character keeps it while `state.run` holds the map run's own copy. Both were checked with a state in which the two differ.
- Sentences: a locked character (`state.run?.character.id === character.id`, going, paused or ended) gets „Przejście na mapie {mapa} jest niezakończone. Wyposażenie zmienisz po jego zakończeniu.” with the map's name from `MAPS`, and all its tiles `disabled`; another character's tiles stay open and carry no sentence. A character in an earning loop gets „Postać jest w pętli. Zmiana działa od następnego przejścia.” The sentence stands between the heading and the body, class `character-gear-note`, in `text-secondary`. Where both would hold (the simulation refuses it) the manual map run's sentence wins.
- Choice: `GearBody` holds `chosen` (one slot or none); a touch chooses, a touch of another moves, a second touch takes it away; `selected` gives the tile `aria-pressed` and the frame in `selected`. The screen builds the component anew at each entering, so none is chosen; `GearBody` is keyed by the lock, so a map run that starts or ends builds it anew and takes the choice away. The pick under a tile is Slice 20's.
- CSS (`character-screen.css`): the body is a grid (left column, figure, right column; the pockets under all three), columns `minmax(0, 1fr) auto minmax(0, 1fr)`, column gap `--space-xs`; the note shares the rule of `.character-screen-skills-note`. No value is written in place of a token.

## Checks (command → exit code)

Red run first (the tests written before the component; each failed at its assertion, the tiles absent, not at a missing module):

- `npm test -- tests/view/character-gear.test.mjs` → exit 1 before the component; 7 of 7 failed ("expected 8, got 0", "expected [...] got []", the colour case on a missing note element).

After:

- `npm test -- tests/view/character-gear.test.mjs` → exit 0 (7 pass).
- `npm test -- tests/view/character-screen.test.mjs` → exit 0.
- `npm test -- tests/invariants/test_content_identifiers.py` → exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0.
- `npm run typecheck` → exit 0.
- Beside the slice's *Checks*: `npx eslint` on the three source/test files → exit 0; `npx prettier --check` on the four files → exit 0; `python -B .the-way/elements/common/foundation_check.py` → `0 errors` (exit 0), run after `git add` of the new files.
- The gate (`npm test` with no file) was not run, as the boundary says.

One failing run on the way, a fault of the slice's own test, not of a base test: the first green attempt of the case on choosing failed once on "an update … was not wrapped in act(...)" because the case called `screen.dispose()` outside `inAct`; fixed in the test (`await inAct(() => screen.dispose())`), then passed (exit 0). An earlier version of the component (state reset by a `setState` during render, then a derived-only version) was replaced by the keyed body; the case "a map run that starts takes the choice away … and the lock's end does not bring it back" failed on the derived-only version (the choice reappeared after the lock ended) and passes now.

Tests that fail on the slice's base: none were seen failing outside the red run of the new file (which does not exist on the base). No test needed a run on the base.

## Tests written and the break each catches

`tests/view/character-gear.test.mjs`, 7 cases, expected values written out in the file (slot names, item names, icon file names `wood-stick` and `first-aid-kit`, the two sentences), the states made with the simulation's own functions (`send`, `startLoop`, `takeOffPiece`, `advanceMinutes`, `setPaused`) and patched only where the case needs a map run's own gear to differ:

1. Eight tiles from creation, in the places and order of the decisions, pale names, the second hand included (break: a slot left off, wrong side or column, a pocket as one tile; `decision:` D-454).
2. A held piece shows its icon alone, named by the item, other tiles keep pale names (break: wrong icon source, name or count on the tile, no accessible name).
3. Earning loop: the sentence stands between heading and body, the main hand's tile empty though the map run going on holds the stick, no second row of icons, no tile locked, the sentence gone after the loop (break: tiles of the map run going on, a sentence at a character in no loop; `decision:` D-462).
4. Manual map run going, paused, ended by death, ended by completion and played to its death: all tiles disabled, the stick the character entered with shown while the map run's own gear is empty, the sentence naming the map under the heading, gone after the map run (break: tiles open, gear of the map run, missing sentence in a state; `decision:` D-287).
5. Another character's map run: this character's tiles open and chosen by a touch, no sentence; the run's own character locked with the sentence and all pale names (break: a lock falling on every character; `decision:` D-287).
6. Choosing: none at the start, one at a time, a second touch takes it away, a clock reading keeps it, a map run that starts takes it away for good, a new screen starts with none (break: a tile never chosen, two chosen, a choice surviving the lock or the rebuilt screen).
7. The sentences stand in `text-secondary` through the real stylesheet (break: another role).

The `decision:` lines quote the sentences of D-454, D-462 and D-287 as they stand; the foundation check passes. Mutations considered in the head: the lock tested by a wrong id (cases 4, 5), the two sentences swapped (cases 3, 4), `GEAR_SLOTS` order changed (cases 1, 2 read the DOM order), the key of the body dropped (case 6).

## Own-work check (section 3)

- The requirement my work most likely does not meet: "the tiles show the gear the game keeps at the character, so for the character of the manual map run the gear it entered with, and for a character in an earning loop the gear of the next map run, not what the map run holds". Check: cases 3 and 4 build states in which the team's gear and the map run's gear differ (a stick taken off in a loop whose map run still holds it; a manual map run whose own gear is emptied) and read the tile of the main hand. Result: the tiles follow the team's character in both.
- A second worry: the layout does not fit the narrow left area. Checked in the browser, below. Found a fault (see the walk) and corrected it.

## Walk of the running product (`walkthrough.md`)

The change alters what a user sees (the screen Postać). The plan's *Choices* put the full check of the screen Postać in a real browser into Slice 20; I made a short walk of the layout only, because the layout is this slice's CSS.

Where: Chromium via Playwright CLI 0.1.22, the game started by `npm run local` from this worktree (`https://127.0.0.1:50968`, a local start, stopped afterwards with `npm run local:stop`), an account `agent19@example.test` made through the login card, one character „Ala”, the screen at `#/postac/1`. System: Windows 11.

| Case | By what | Verdict |
|---|---|---|
| Eight tiles stand around the figure at a page area 1280 px wide, in the two columns and a row, nothing wider than the area | screen at 1280 px, `getBoundingClientRect` of the body and tiles | fell wrong, then corrected: the left area is 306 px wide, the body 272 px, the tile 67 px (`4lh`), the columns 64 px with a gap of `--space-s`, so the two outer tiles stood 3 px outside the body (the page did not scroll, the area did not widen). The gap between the columns changed to `--space-xs` in `character-screen.css`; the same measurement with that gap set live on the page: the tiles stand at 34..101 and 237..304 inside the body 33..305, no overflow. I did not rebuild and re-measure the corrected stylesheet itself; the live setting was the same property and value. |
| The same at 360 px wide, 740 px high (phone layout) | `resize 360 740`, measurement, a screenshot looked at and not kept | passed: the page does not scroll to the side, the body does not overflow (21..339 for tiles at 45..112, 248..315, pockets at 71, 146, 222), every tile 67 × 67 px, so over `--touch-target-min`; the screenshot shows the left column, the figure and the right column in the order of the decision, the pockets under, the pale names legible. |
| A touch of a tile chooses it, in the browser | `run-code` clicking the tile | not checked: my snippet failed (`document` used outside the page), and I ended the session. The choice is checked in jsdom only (case 6). |
| Locked tiles, the loop sentence in a browser | – | not checked in a browser (a map run and a loop need a longer route); covered in jsdom, cases 3 to 5. Slice 20's check in a real browser stands. |
| Side observation | – | nothing beyond the above. The three pocket tiles share the one name „Kieszeń” for a reader of the screen (the tile's own name is the pale name of the slot, as the styleguide gives it); the pockets cannot be told apart by name. |

What I did not check: the colour of the frame of a chosen tile in the browser (the tile's own slice, Slice 16 and Slice 17, holds that), a screenshot to show the human (none made for the human: the foundation's place for screenshots is the public screenshots repository, and this slice leaves the screenshots to Slice 20), the computer layout at a wider area than 1280 px, the phone layout with touch (I used a resize without touch), motion of the figure.

## Reach beyond the dispatch

- `tests/sim/understanding-fixture.mjs` (`withEdgeSolved`) and `tests/view/page-document.mjs` / `game-stylesheets.mjs` were read to make the test; the dispatch named none of them. `.claude/skills/loop2-play/SKILL.md` read for the browser walk, `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md` as the method asks; `src/browser/sim/gear.ts`, `loop.ts`, `data/gear.ts`, `data/items.ts`, `types.ts` (Gear fields) and `character-trees.tsx` read for the data and a pattern. No foundation entry beyond those named was read, except D-445's heading text in `decisions.md` and D-456 (searched for „Głowa” to find the decision that names the eight slots).
- The guidelines the handoff names were read whole, but `guidelines/styleguide-browser-view.md` and `guidelines/testing.md` were read in several calls (the files stand over the single-read size) through to their end.

## Choices (with the way rejected and the cost if wrong)

- The tiles in the document are not wrapped one by one: the three groups are the elements `character-gear-left`, `character-gear-right`, `character-gear-pockets`, and a tile's slot is its place in the document. Rejected: a wrapper with `data-slot` on each tile (one more element for the layout, a hook the tests do not need). If wrong: Slice 20 needs a slot for a tile and derives it from the order, as the tests do.
- The lock takes the choice away by keying `GearBody` on the lock, which remounts the body (the figure's frame animation restarts then). Rejected: `setState` during render (React then logged an update not wrapped in `act` in the test run, and I could not tell why, so I did not keep it); a derived "shown chosen" (the choice came back after the lock ended). Cost if wrong: the figure's animation restarts at a lock's start or end, which can happen only while the screen is shown if a map run changes under it.
- Where the map run's sentence and the loop's sentence both hold (the simulation refuses it), only the map run's stands.
- Gap between the columns `--space-xs` instead of `--space-s`, from the measurement above, a layout step of the existing scale.

## Unread material

- `foundations/part_map.md:3-32` (browser-view) was not opened: the foundation check, which reads the part map, reports 0 errors and claims the new files. `docs/task-cycles/wyposazenie-postaci/task_frozen.md:41-45`, `48-50`, `160-161`, `267`, `287-288` were read (by `sed` at those lines) and `plan.md` only at the lines of Slice 19 and of the rows named; the plan's other lines were not read. `foundations/decisions.md` D-199 and D-447 were read at the handoff's ranges (7443-7471, 4930-4946).
- Everything else the handoff names was read whole: `guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md` and `testing.md` (each in several calls through to its last line), `src/browser/AGENTS.md`, `react-button.tsx`, D-287, D-454, D-461, D-462, `slice.md`, `SKILL.md`, `ui_check.md`, `walkthrough.md`.

## Searches not found or unclear

- none. (A note on the handoff: the *Read* names `foundations/decisions.md:10710-10753` for D-287; its current text stands at 10765-10819 as the handoff says, and I read that.)

## Concerns and problems observed

- The check of the screen Postać in a real browser, the frame of a chosen tile, the loop and manual-run states in a browser and the screenshots are Slice 20's, as the plan says; this slice's browser walk covered the layout only.
- A guess, marked as one: the `act` warning raised by the `setState`-during-render version came from the way the page document harness runs a render-phase update; I did not verify it.

## Working copies

- Directory `.runs/executor-19/` (the local game's log and one screenshot of the phone layout): stood in `.runs/executor-19/`; removed (the directory itself too), together with the log files `.runs/executor-19-*.log` and the commit-message file. The local start, a product's own file, stood at `.runs/local-start/41760-50968-bdc7a074171105e1/` and was left where the product's tool put it; the start was stopped with `npm run local:stop`. The Playwright session was closed (`playwright-cli close`). No screenshot was kept or shown.
