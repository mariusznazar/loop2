# Report — executor of slice 8 — task `paski-parametrow`

## Status

`done with concerns` (concerns: two items for the orchestrator below — a file outside the slice's *Change* touched by one word, and five foundation-check errors that are in slice 7's test, not in this slice's files).

## Commit

- `bb600781` on the branch `task/paski-parametrow` (base `a7a0108a`): `feat: :sparkles: pulse the fill of satiety and of health below their thresholds … with the cases of body-row-motion.test.mjs`. (Amended once, message only, before anything built on it: the first wording read as if the pulse went on under reduced motion.)

## Files changed (added / removed lines)

| File | + / − |
|---|---|
| `src/browser/run-screen.css` | 128 / 0 |
| `src/browser/view/body-row-cells.tsx` | about 143 / few (new props, blow memory, health cell, marks) |
| `src/browser/view/world-area.tsx` | 11 / 2 (hands `events`, `pace`, `standing` to the body row) |
| `src/browser/view/scene-picture.ts` | 7 / 1 (`standingOf` exported, comment) — **not in the slice's *Change*, see Departures** |
| `tests/view/body-row-motion.test.mjs` | 570 / 0 (new, 9 cases) |

`git show --stat HEAD`: 5 files, 844 insertions, 15 deletions.

## What was made

- **Pulse (CSS only, `run-screen.css`, after the body row's transition rule).** Inside `@media (prefers-reduced-motion: no-preference)`: `.body-cells .alarm .value-cell-fill`, `.alarm .body-scale-marker`, `.alarm .body-scale-zone.holds-marker` run `body-alarm-pulse` 1.1 s, `ease-in-out`, infinite; the keyframes name only the 50 % step, `opacity: var(--alarm-pulse-dim-opacity)` (the token of slice 1; the element's own opacity is the full end of the cycle). Under reduced motion nothing pulses. The pulse stands on other elements than the stop rule below, so it goes on while time stands.
- **Blow (`body-row-cells.tsx`).** `BodyRowCells` takes optional `events`, `pace`, `standing` (defaults `[]`, `1`, `"going"`). It keeps, like the scene, the events it has seen (`seen` starts as the events of the first draw, so a first draw, a reload and a load show nothing) and the one marker of the last blow; a new events array is read by `blowMarker(events, run.lastCombat, pace)`; the same array drawn again changes nothing; a call with no blow keeps the marker shown. The health cell gets `data-blow="odd|even"` (by the number of the blow, so a new blow changes the mark and restarts the shake on the same element — the fill's width transition is not lost) and a `span.body-blow-text` keyed by that number. The marker is dropped when its animation ends (`onAnimationEnd`) or the browser cancels it (`animationcancel` listener in a ref, as the scene does), so a screen hidden and shown again never plays it from its start.
- **Standing.** `.body-row` carries `data-standing` = the scene's `standingOf(state, run)` (exported, not re-written); `WorldArea` computes it and hands it down. One unconditional rule `.body-row:not([data-standing="going"]) .body-blow-text, … .value-cell-static[data-blow] { animation-play-state: paused }` holds the shake and the text at a stop: a marker that comes at a stop stands at its first frame (text whole, cell not yet shaken) and goes on when the standing becomes `going` (same element).
- **Reduced motion.** Text: base rule (outside the media block) — `body-blow-text-still`, 1.3 s, `step-end`, fill both, keyframes only `to { opacity: 0 }`: it stands still and goes. Inside the `no-preference` block: shake 340 ms (`body-blow-shake-odd/even`, ±`--space-xs`) and `body-blow-text-rise` (1.3 s, `ease-out`, rises `--space-m` and fades).
- No new design token; no `px`, colour or unitless opacity written in the stylesheet (the text is in `danger`, the spacings are tokens).

## Checks (command, exit code)

| Check | Result |
|---|---|
| `npm test -- tests/view/body-row-motion.test.mjs`, **first run, before the code** (8 cases written first) | exit 1; 8 cases failed on their assertions ("a fill below its threshold pulses: expected a true value, got false", "the marker pulses", "precondition: a blow shows: expected 1, got 0", "at 1×: expected [„−21 · wilk”], got []", "the cell is marked for its shake", "the cell shakes", …); the 9th case ("a blow among the events of the first draw gives no marker") passed at once since no marker existed — a guard, seen failing by mutation below |
| same, after the code, after two small test corrections (see below) | exit 0, 9 cases pass |
| `npm test -- tests/view/body-row-cells.test.mjs` | exit 0 |
| `npm test -- tests/view/world-area.test.mjs` | exit 0 |
| `npm test -- tests/view/scene.test.mjs` | exit 0 |
| `npm test -- tests/view/body-row-explanation.test.mjs` (extra) | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | first run exit 1 (ESLint: `NATURE_ENERGY` assigned and never used in my test); after removing it exit 0 |
| `npm test -- tests/quality/test_function_and_file_size.py` (extra) | exit 0 |
| `npx prettier --check` on the five files | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | **fails, 5 errors, none in my files**: `tests/view/body-row-explanation.test.mjs:83, 84, 116, 135, 149` ("the quotation … does not begin a sentence of `D-450` / `D-337` / `D-407`") — slice 7's test. Before I fixed the `decision:` quotations of my own test it printed 12 errors, 7 of them in `body-row-motion.test.mjs`; those are fixed. The line about `design-token-contrast` the handoff expected did not print. |
| Full gate (`npm test`) | not run (the handoff and the method forbid it) |

Two test corrections made before the code passed, both mine: (1) `keyText` of a `to` keyframe reads `100%` in jsdom, so the expectation says `100%`; (2) React reads `webkitAnimationEnd` on jsdom, so the case fires both names (the same as `tests/view/scene.test.mjs`).

Mutation checks I ran (code mutated, case seen failing, code restored): the first-draw memory started from `[]` instead of the first events → "a blow among the events of the first draw gives no marker…" fails; the stop rule extended to `.alarm .value-cell-fill` (the pulse held at a stop) → "while game time stands the pulse goes on…" fails. In my head: the pulse rule moved outside the `no-preference` block → "…under reduced motion nothing pulses" fails; the `holds-marker` zone left out or the other zones included → the scale case fails; `pace > 4` not refused → the 8×/16× case fails; marker not cleared on end/cancel → "the marker is gone…" fails.

## Own-work check (section 3)

Requirement most likely not met: *"while game time stands … a marker that comes while it stands, as that of a killing blow does, stands at its first frame and goes on when time goes on"* and *"the pulse goes on while time stands"* — both are timing against a stop, which jsdom cannot run. Check: the case "a blow that comes while game time stands…" (play state `paused` on the new text and cell at `standing="dead"`, same element and not paused after `going`) and, in the running game, the real flow: a character at 33 health with no rule fighting a wolf. Showed: the killing blow's marker `−35 · wilk` appeared with the death, `animation-play-state: paused`, opacity 1.00, translate 0 (first frame), standing `dead`, until the end-of-run window opened, when it was dropped (the window hides the screen, which cancels the animation; D-450 says "before the window opens"). The pulse sampled every 100 ms in the player's pause (`standing=paused`, scene mage `paused`): the four elements (satiety fill, health fill, marker, chill zone) went 0.40 → 1.00 → 0.40 with a period of about 1.1 s, all four in phase.

## Walk of the running product (`walkthrough.md`)

Where: Windows 11, Chromium through Playwright CLI 0.1.22, game from `npm run local` (`https://127.0.0.1:51655`, stopped), desktop window of the CLI's default size and the phone window `.playwright/cli.phone.config.json` (360 × 740, touch). State composed with `.runs/task-cycles/paski-parametrow/reports/executor-8-compose.mjs` (kept beside this report: `node …/executor-8-compose.mjs <temperature> <satiety> <health> [fight]` prints the saved document of a game whose Las — wataha run stands one game minute before the wolf's first attack; `fight` adds a rule „Zawsze → Uderz — patyk”, a stick and the Understanding of the combat actions, which gives the combat of D-450's example, three blows of 7 over four strikes). Sent as the skill gives.

What the change alters, in the user's words: below the threshold the bars of satiety and health and the marker with its zone breathe; a creature's blow shakes the health cell and shows a red „−21 · wilk” that rises and fades; at a stop they hold; with reduced motion nothing pulses or shakes.

| Case | By what | Verdict |
|---|---|---|
| Pulse below thresholds in the player's pause: 100 % → 40 % → 100 % in 1.1 s, smooth, endless, four elements in phase; scene mage paused at the same time | browser, desktop; computed opacity sampled every 100 ms | ok |
| Reduced motion (`page.emulateMedia({ reducedMotion: "reduce" })`): no pulse (`animation-name: none`, opacity 1), no shake, the text stands still 1.3 s and goes in one step | browser, desktop; computed styles | ok |
| Blow at 1×, non-lethal („−21 · wilk”, health 90 → 69): the cell shakes about 340 ms (±3 px sampled), the text rises 12 px and fades to 0 over 1.3 s, and is removed at its end | browser, desktop; computed styles, two screenshots looked at | ok; the text stands above the health cell, in `danger`, right-aligned |
| Killing blow at a stop (standing `dead`): marker shown, held at its first frame, dropped when the end-of-run window opens | browser, desktop | ok (see Own-work check) |
| First attack's discovery stop, then the blow after „Wznów”: no marker at the stop, the marker after | browser, desktop | ok |
| No marker at the first draw / after a reload of a state in which the character had lost health | browser, desktop (reloaded states, marker element count 0) and the case of the test | ok |
| Marker at 8× / 16×, marker replaced by a second blow, marker held in the player's pause and going on at „Wznów” | the cases of the test only | not checked in the browser: a second combat and a pace of 8× would have needed another composed state; the logic is the same code the browser exercised |
| Phone layout 360 px: nothing scrolls to the side, no control under 48 px, no text outside its frame with the row and with a marker shown (`scrollsToTheSide: false`, `controlsSmallerThan48: []`; marker rectangle inside the window) | browser, phone window, measurement of the skill | ok for the row; see the flag below |
| Side observation: in the phone's two-by-two layout the rising text lays over the lower part of the temperature cell (over its frame, to the right of „marznie”) for the 1.3 s of its fading | browser, phone window, screenshot looked at | appearance, not an error of the task; named for the human's eye (the request's screenshots) |

What I did not check: 8×/16× and the replacement in the browser (above); the dim phase of the pulse against any criterion by a tool (D-42 exempts it; the cycle is 1.1 s, below three a second, on a strip 4 px high); Firefox and Edge (the styleguide leaves them to a person); a real touch on the explanation (slice 7's).

**The phone measurement flag the previous executor saw** (`div.world-area` content 330 > box 318, a scene sheet, an `img` spanning 156..412): it stands at the base of this slice too, and is not the body row's. Evidence: it is reported identically with the body row hidden (`display: none` on `.body-row`) and with a marker shown; 330 − 318 = 12 px, which is the scene place's `margin-inline: calc(-1 * var(--space-m))` in the phone layout. I did not build the base commit to measure it there.

## Reaches beyond the dispatch

- `src/browser/view/scene-memory.ts:60-260`, `src/browser/view/scene.tsx:1-135, 560-800`, `src/browser/view/scene-picture.ts:150-270, 535-570` — to see how the scene tells a fresh reading (`events !== seenEvents`), keeps its memory and handles `animationcancel`; the body row follows the same pattern. The handoff pointed at `standingOf`; the rest was needed to follow the pattern.
- `src/browser/view/run-screen.tsx:270-330`, `src/browser/view/run-entry.ts:225-290` — to confirm that a clock reading redraws nothing with new events and that every simulation result hands one new events array (the freshness test relies on that).
- `src/browser/styles.css:455-575` — the look of `.value-cell-static` and the cell parts the new text is placed in.
- `src/browser/tokens.css` (grep of `opacity`, `space`, `frame`, `bar`, `font-size`) — to take the dim token and the spacing steps.
- `tests/view/body-blow.test.mjs:1-110` — the shape of the events of a combat, copied into my cases; `tests/view/scene.test.mjs:326-350, 640-730, 888-902` — how the scene's tests read `animation-play-state` and fire `animationend`; `tests/sim/program-fixture.mjs`, `tests/sim/combat.test.mjs` (parts), `src/browser/sim/run.ts:780-800`, `src/browser/sim/data/maps.ts`, `creatures.ts` — only for the probe's composed state (not product code).
- The guideline `guidelines/styleguide-browser-view.md` is 1634 lines; see Unread material.

## Departures from the plan and the task's answers

1. **`src/browser/view/scene-picture.ts` is touched, and is not in the slice's *Change*:** one keyword, `export` on `standingOf`, with its comment. The handoff itself allowed "exporting and reusing the same reading"; the alternative (calling `sceneDrawing(state)` a second time to read its `standing`, or copying the five-line rule) duplicates work or logic. Cost if wrong: the orchestrator's `Change` list for the review is one file short.
2. `BodyRowCells` got three optional props (`events`, `pace`, `standing`); the plan said only that `WorldArea` hands the events to the body row.
3. The plan's *Read* names D-317 and D-322 "(…) 11752-11842", "11985-12055"; I used the handoff's current ranges.

## Choices made, with the way rejected

- **Restart of the shake on a new blow:** the mark `odd`/`even` selects one of two keyframes with identical bodies. Rejected: remounting the health cell with a `key` (loses the 500 ms glide of its fill at the very moment health drops); a single keyframes name (a changed attribute alone does not restart a CSS animation). Cost: six duplicated lines of keyframes.
- **Where the text stands:** `bottom: 100%` of the health cell, right-aligned at `--space-s`, rising `--space-m` while fading. Rejected: over the number (unreadable, red on red), inside the cell below the bar (the 2×2 layout has no spare line there). Cost: the overlap noted in the side observation.
- **Ending the marker** on `animationend`/`animationcancel` rather than never: without it a screen hidden and shown again (animations restart) would show the old marker frozen at its first frame while paused. Cost: a marker created while its screen is hidden never gets an end event until the animation runs; in the real flow leaving the screen pauses the run, so no blow arrives then (I reached that case only with a hand-driven „Wznów” on a hidden screen; **a guess** that it does not occur in play).
- **Motion values the task leaves to the agent** (for the human's veto): ease curve of the pulse `ease-in-out` (smooth both ways); shake of ±`--space-xs` (4 px) in five steps over 340 ms (`linear`); the rise of the text `--space-m` (12 px) with `ease-out`; under reduced motion the text stands the same 1.3 s. The 340 ms and 1.3 s are loop's (the task's Context), the 1.1 s and 40 % the task's. No colour or token value was chosen in this slice.
- The pulse selectors name `.alarm` on the cell (the mark the earlier slice put there) and `holds-marker`; satiety's fill pulses as `.value-cell-fill` in `satiety-fill`'s own colour, health's in `positive` — no fill takes the alarm colour.

## Problems as observed

- `foundation_check` prints 5 errors in `tests/view/body-row-explanation.test.mjs` (slice 7): quotations that do not begin a sentence of the decision. Evidence: the command above. I did not touch the file (not in my *Change*); slice 7's owner or the orchestrator should fix the `decision:` lines (the sentence beginnings are in D-450, D-337 and D-407).
- The browser harness trap: after `reload` the page may open on Siedziba, not the map run, and a `.click()` from `page.evaluate` still drives the hidden run screen, whose animations never run (`getAnimations()` empty). I lost time to this; the screen's address is `#/postac/1/przejscie`.

## Working copies

- `.runs/executor-8/` (composition scripts, screenshots, test outputs, backups), `.playwright-cli/` (CLI working files, state documents) and `.runs/executor-8-*.txt` — all removed with `rm -rf` by path. The browser session is closed (`playwright-cli close`) and the server stopped (`npm run local:stop`, "Local starts stopped: 1"). The server's own database directory `.runs/local-start/9076-51655-…` is made by the start script itself and stays (ignored by git).
- Kept beside this report: `.runs/task-cycles/paski-parametrow/reports/executor-8-compose.mjs` (the input of the probe). No screenshot is kept anywhere (the handoff says to describe motion in words).

## Unread material

- `foundations/decisions.md`: **D-04, D-311, D-178, D-39, D-40, D-44** — the handoff's list names their ranges but the slice's *Read* and its additions do not; I relied on the handoff's statement of D-04 (the view reads the reduced-motion setting only for the scene) and on D-337/D-450 for the rest. Read whole: D-450, D-337, D-42, D-317, D-322, D-421.
- `guidelines/styleguide-browser-view.md` (1634 lines): read lines 1–560 (roles, contrast of every pair, shared controls, stylesheets, sources, kitchen-sink, layouts), 561–690 (phone layout, touch targets, both-layouts check), 1193–1397 (the scene's rule, including its motion and stops). Not read: 691–1192 (main button, menu bar, Mapy, Wiedza, Postać, program editor) and 1398–1634 (picture band, chronicle, end window, list of accounts, mockups, plan of a UI change). The new rule „The body row of a map run” does not stand in the file yet (no hit for "body row"), so there was nothing of it to read.
- `tests/view/body-row-cells.test.mjs`: lines 1–260 read (the helper head 1–162 and the first cases); the rest not read.
- `.claude/skills/loop2-play/SKILL.md`: lines 1–110 and 270–380 read (the Read range 23–94 and 284–363 is inside them); lines 110–270 only in part (the phone measurement block).
- Whole and as named: `run-screen.css` ranges 590–910, 1270–1480, 1540–1700 (the Read ranges 600–672, 840–890, 1280–1470 are inside them), task `To do` and `Context` passages (lines 20–50, 170–184), `body-row.ts`, `world-area.tsx`, `body-row-cells.tsx`, `body-blow.ts`, `page-document.mjs`, `game-stylesheets.mjs`, `slice.md`, `ui_check.md`, `walkthrough.md`, `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, `src/browser/AGENTS.md`.

## Searches not found or unclear

- **Not found:** the new styleguide rule „The body row of a map run” (grep "body row", case-insensitive, in the styleguide: no hit) — expected, it is a later slice's.
- **Not found:** the foundation-check line about `design-token-contrast` that the handoff said would print.
- **Unclear:** how loop's `--animate-shake` and `--animate-rise` look (amplitude, rise length, curve): the task gives only their durations (0.34 s, 1.3 s) and I did not read the loop repository, so the amplitude, the rise and the curves are my choices (above).
- **Unclear:** whether D-450's "the text stands still and goes" fixes the time under reduced motion; I took the same 1.3 s as the animated text.

## Questions

none.
