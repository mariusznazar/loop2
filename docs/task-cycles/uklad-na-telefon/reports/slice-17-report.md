done with concerns

# Report - slice 17 "Siedziba, Postać, Mapy and Wiedza at 360 px"

Status `done with concerns`: the slice's goal is met by measurement and by screenshots looked at; the concerns are the two measured signs that stay on the list of the picture band and of the sprite sheets (below, "Concerns"), and that the slice's two commands of *Checks* are tests of invariants that the change did not need to bring a new assertion to (the phone rules are not testable in jsdom, as the styleguide says).

## Commit and files

- Commit `b5615e32` on `task/uklad-na-telefon` (base `2b4bbeaa`), added by path, not pushed.
- `src/browser/character-screen.css` +54 -2, `src/browser/headquarters.css` +20, `src/browser/maps-screen.css` +31 -3, `src/browser/knowledge-screen.css` +2 -2 (106 added, 8 removed in all).

What changed:

- Postać: the phone block of the two areas now reads `minmax(0, 1fr)` (the one column may shrink below the least width of its content); a new phone block makes the row of a tree two lines with `grid-template-areas` (the fold at the left of both lines; line 1 the name with „+{n} pkt czeka w pętli” and „{k} pkt”; line 2 „poziom {p}”, the bar, „{wprawa} / {próg}”), the gap `--space-xs` / `--space-s`, and the branches' left padding `--space-m`. The cells keep their texts, roles and bar.
- Siedziba: `.team-member-name` holds `--touch-target-min` (min-width and min-height, `display: flex; align-items: center`) in a block `@media (width < 1280px)`; its comment says why the band needs no rule (it already crops, see below).
- Mapy: `.maps-list-item` (`box-sizing: border-box; align-items: center; min-height`) and `.maps-who-name` (as the name in Siedziba) hold the minimum in a block `@media (width < 1280px)`; the stale comment "under 720 px" is corrected.
- Wiedza: no rule; the stale comment "under 720 px" is corrected. The screen measured clean before and after.
- Every new block names D-396, has no media type, and stands after the computer-layout rules it changes. No value in `px`/`rem`/`em` was written beyond the `em` of the grid column that the computer rule already used (`4em`, a layout dimension, D-43).

## Checks (command, exit code)

- `npm test -- tests/invariants/test_browser_view_token_values.py` - exit 0 (4 tests, OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` - exit 0 (3 tests, OK).
- Neither was run failing first: the change adds no assertion and no code that either test reads differently; they guard that the new CSS holds no value in place of a token and no `outline`. The full gate (`npm test` with no argument) was not run, as the handoff says.
- In the running game: below.

## Own-work check

Requirement most likely not met: "every control of these screens at least the touch-target minimum, nothing scrolling to the side, no text over its frame, at 360 px with real state", and, secondly, "at 1280 × 720 each screen as before".

Check made in `npm run local` (HTTPS, a made-up account at `example.test`), Playwright CLI, phone config of the skill (360 × 740, touch), the measurement of the skill (`.playwright-cli/phone-measure.js` code, kept in `.runs/slice-17/measure.js`), the composed state sent by the page's own save request (`PUT /api/saved-game`).

The composed state (made with the simulation's own functions, loaded through `loadSavedGame` first): five characters of the screens in view - „Agent” at the camp; „Petla” in an earning loop on Las with 200 practice waiting („Odbierz”) and three completed map runs; a character named `DlugieImieBezSpacjiDoSprawdzaniaLamaniaWiersza` (46 letters, no space) with 400 and 300 practice paid, so with points to spend („4 pkt” on two trees and „Kup” on every branch); „Obozowicz” whose loop had stopped („Pętla zatrzymana”); the maps `forestEdge` and `forest` solved; a report „Gdy cię nie było” with two lines; chest 14 sticks and 9 berries; the Understanding with the combat verbs and the wolf. A second state with nine characters at the camp checked the band's whole-characters rule.

Measurement at 360 × 740, by the skill's measurement, **before** (the base 2b4bbeaa, the same state) and **after** (b5615e32):

| Screen | Before | After |
|---|---|---|
| Siedziba `#/` | `scrollsToTheSide` false; `controlsSmallerThan48`: `a.team-member-name` "Agent" 36.3 x 18.2, "Petla" 31.6 x 18.2, "Obozowicz" 67.1 x 18.2, the long name 318 x 36.4; `contentWiderThanItsBox`/`outsideTheWindow`: the band only (below) | `scrollsToTheSide` false; `controlsSmallerThan48` empty; the same band entries |
| Postać `#/postac/3` | `scrollsToTheSide` **true**, page 402 x 827; content 394 > box 344 on `main.app-main`, `.screen`, `.character-screen`; `section.screen-area` spans 8..402; the tree rows span 21..389 | `scrollsToTheSide` false; page 360 x 740; lists only `div.character-figure` content 96 > box 64 and its sheet 512 > 128; `controlsSmallerThan48` empty |
| Mapy `#/mapy` | `controlsSmallerThan48`: three `a.maps-list-item` 318 x 22.2 | empty, all lists empty |
| Mapy `#/mapy/forest` | the three rows and four `a.maps-who-name` (31.6-318 x 18.2-36.4) | all three lists empty |
| Wiedza `#/wiedza` | all lists empty | all lists empty |

After, in the states reached by tapping (`page.tap`): Postać with the trees „Eksploracja” and „Zbieranie małych przedmiotów” open (six „Kup” buttons) - no side scroll, `controlsSmallerThan48` empty; Wiedza with two trees open - all three lists empty; Mapy with „Oceń na 12 ziarnach” tapped (the result under the character: heading, twelve lines, the sentence) and „Puść w pętlę” tapped - all lists empty. At 1100 × 800 (touch kept): Siedziba, Postać, Mapy, Wiedza - `scrollsToTheSide` false, `controlsSmallerThan48` empty, and on Siedziba and Postać the same band and sheet entries as at 360.

What the screenshots showed (looked at, then removed): at 360 the band keeps its 344 px width cropped evenly around the fire, the picture not scaled (its `img` spans -492..852, centred on the window), two whole characters left of the fire and the chest whole at the right (nine characters at the camp: still two whole, none cut); at 1100 the same, with three characters. Postać: the name breaking on two lines inside the head, the rows of trees in two lines without a text over its frame, „Kup” buttons below each branch's text. Mapy: the list rows 48 px high with the selected row's bar, the card and all four characters' lines inside the width. Wiedza: no change needed.

Measurement left on the list, judged by the screenshot (signs, not verdicts, as the skill and the styleguide give):

- Siedziba: `div.camp` content 844 > box 344 and `img.camp-background` spanning -492..852 are the clearing, clipped by `.camp`'s `overflow: hidden` (the crop D-389 asks for); `div.camp-team` content 172 > box 140, the `div.camp-member` 96 > 64 and the `div.scene-sheet` 512 > 128 are the cells that do not fit (wrapped to an unseen line) and the sprite sheets clipped to their frame. None scrolls: a box with `overflow: hidden` takes no scroll by a finger, and `scrollsToTheSide` is false. This is the same as the scene's sheets and the Postać figure's, which earlier slices also left as signs.
- Postać: `div.character-figure` content 96 > box 64 and `div.scene-sheet` 512 > 128: the figure's sheet in its frame, the same kind.
- Mapy at a character with a manual map run waiting: `a.maps-who-run-link` 307.6 x 35.2. It is the second half of the sentence „Przejście na mapie Las jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.", a link inside a running sentence, outside the minimum by the styleguide rule and by the sentence of the cited source (the source's passage speaks of "each interactive UI element"; the styleguide's reading of it, with D-396's list of controls, exempts a link in a running sentence). The CSS comment says so. The player has the bar's „Wróć do przejścia” as the target-sized way to the same screen.

1280 × 720, a session with no touch, before from the base and after from the commit, the same state sent before each session, full-page screenshots of the four screens, compared by pixel difference: Postać and Wiedza pixel-identical; Mapy differs only in a box 171 x 23 px at the minute counter of the loop's line; Siedziba differs in the band's animation frames (box 244 x 56 px in the band) and in the text of the report's minutes and the loop's minute counter (341 -> 346 min, minute 1 -> 6), which the real time between the two sessions moved. A side-by-side crop of the report and team lines showed the same layout. No change of the computer layout.

Mutation in the head: the change that would have broken this is a phone rule that leaks to the computer layout (a media block missing its `<`) - the 1280 comparison above holds against it; a phone block that stayed unmatched would be seen by a measurement of the 360 page - the table above holds against it. No unit test can see either (jsdom does not apply a block without `screen`, a rule of the styleguide).

## Walkthrough (`walkthrough.md`)

What the change alters, in the user's words: in a phone window the Siedziba names of characters, the list of maps and the names in „Kto idzie” are larger touch targets; Postać no longer scrolls to the side and its tree rows take two lines; the 1280 layout stays.

| Case | By what | Verdict |
|---|---|---|
| Siedziba at 360: no side scroll, name links >= 48, band cropped around the fire, long name breaks in its row, „Odbierz”, „Zamknij”, „Zatrzymaj”, field and „Załóż”, `summary` at the minimum | browser (Chromium, `https://127.0.0.1:53417`, 360 × 740 touch), the skill's measurement and a screenshot | passes; band entries stay as signs (above) |
| Postać at 360, folded and with two trees open: no side scroll, rows in two lines, „Kup” >= 48, a long name breaks, the frame of „W obozie” | same | passes |
| Mapy at 360 `#/mapy` and `#/mapy/forest`: the rows of the list, the names, „Wejdź”, „Puść w pętlę”, „Oceń na 12 ziarnach”, the select list, the result of a judging, „Zatrzymaj” | same, with `page.tap` for the judging and the loop | passes |
| Mapy at a waiting manual map run: sentence with link | same | the link is below 48 by design (running sentence); nothing scrolls |
| Wiedza at 360, folded and with two trees open | same | passes; no change |
| 1100 px of the four screens | same, `resize 1100 800` | passes |
| 1280 × 720 of the four screens as before | a session without touch, screenshots before/after, pixel difference | passes; only the time-driven counters and the band's animation differ |
| side observation | - | the glyph „▸” of the tree's fold is tiny in the button on Postać and Wiedza (the button itself holds 48 x 48 and the glyph looks like a dot at the base too); not mine, not in this slice's scope |

What I did not check: Firefox and Edge (the styleguide keeps them to the human's own session, D-396); a real phone; a window narrower than 360 px or turned sideways (D-396 does not fix them); Programy, the run screen and the login card (other slices); a map run's earning loop going on while the page is open for long.

## Reaches beyond the dispatch

- `.runs/task-cycles/uklad-na-telefon/reports/slice-16-evidence/setup.sh` (named in the orchestrator's note 4 as where earlier slices kept their scripts): read once for the way slice 16 made an account; I wrote my own scripts instead.
- `src/browser/view/camp.tsx`, `src/browser/view/camp-picture.ts`, `src/browser/view/character-trees.tsx`, `src/browser/view/headquarters.tsx` (first 200 lines), `src/browser/view/away-report.ts` (first 80 lines), `src/browser/sim/loop.ts` (lines 90-230), `src/browser/sim/types.ts` (lines 400-540), `src/browser/sim/saved-game.ts` (grep of the loop's validation), `src/browser/sim/game.ts` (lines 455-510): to read how the markup stands (which element is the fold, which the name), to compose a state that `loadSavedGame` accepts, and to see why a first composed state was refused (`completed` must be below `runNumber`). Reason: the rows' markup decides the grid areas, and a composed state is the skill's way.
- `src/browser/styles.css` lines 1-330, 460-620 and `src/browser/credits.css`: to follow the way earlier slices wrote the phone blocks and which controls styles.css already holds at the minimum (`.button`, `.select-list`, `.input-field input`).
- `foundations/decisions.md` D-416 (lines 4818-4850) and the glossary entry headquarters: named by the handoff, read.

## Choices (with the way rejected and cost if wrong)

- The row of a tree on Postać in two lines by `grid-template-areas`, with no change of the markup. Rejected: a new wrapper in `character-trees.tsx` that groups the three lower cells (a change of code and of tests for a layout fix); hiding a cell at the phone (the player would lose the practice or the level, D-199 gives them). Cost if wrong: a later task that redesigns the row (task 17-21 of the plan) replaces the two blocks.
- The phone column of Postać as `minmax(0, 1fr)`. Rejected: leaving `1fr` and relying on the row fix alone (a future wide child would widen the screen again). Cost: none seen; the computer rule is untouched.
- The name links as `display: flex` in the rows that stand alone at the head (Siedziba's team rows, Mapy's „Kto idzie”), not as inline links with a larger padding. Rejected: `padding-block` as the summary of the credits has (the names stand in a wrapping flex row where a flex item takes a height anyway, and `display: flex` keeps the long-name break). Cost if wrong: a name's text stands vertically centred in 48 px beside a „Mag żywiołów” text on its baseline; the screenshot shows the row reads well, but a human may want the two texts aligned.
- The links that are controls by themselves: the names of characters and the rows of the list of maps; the link inside the sentence of a waiting map run is left out. Rejected: holding the sentence link too (it would break the sentence's line). Cost if wrong: one link of a sentence a little small to tap.
- The picture band: no rule. It already crops its clearing at the sides around the fire, never scales it, shows whole characters only and takes no scroll; the measurement's entries for it are the clearing and the sprite sheets inside boxes with hidden overflow. Rejected: `object-fit: none` on the `img` with `width: 100%` in a phone block (it would empty the `contentWiderThanItsBox` entry of the clearing, but the sprite-sheet entries stay, so the lists would still not be empty, and it re-draws a picture whose offset at an odd width the computer layout has today); `overflow: clip` (not tried in a browser; the styleguide says the entry is a sign). Cost if wrong: the reviewer, reading the handoff's note that the band "crosses its frame", expects an empty list; the screenshots at 360 and 1100 and the text above are the answer, and a later change can add the `object-fit` rule without touching anything else.
- No new test. The styleguide says the phone rules are checked in a browser (jsdom ignores a block without `screen`), and a test of the text of the CSS would check a decision, not behaviour.

## Concerns and questions for the orchestrator

- The handoff says the band "crosses its frame at 360 and 1100 px" and calls it mine. By the screenshots and the measurement I find the band meets D-389 already, so I changed no band rule; see the choice above. If the orchestrator wants the measurement's lists emptied for the band, that is a change of the sprite sheets (`scene-sheet`, `camp-member`), which this slice's files do not hold; I recommend leaving it as signs, as slices 14-16 did for the scene.
- `maps-who-run-link` stays under 48 px by the styleguide's rule for a link in a running sentence; the reviewer who reads `controlsSmallerThan48` will see it listed in the state "a manual map run waits".
- No value or token was missing; none was added.

## Working copies

- Directory `.runs/slice-17/` of the worktree (scripts of the composed state, the measurement, the screenshots, the pixel-difference scripts, the local start's log) stood in `.runs/slice-17`; removed before returning. `.playwright-cli/` (made by the CLI) stood in the worktree root; removed. The browser session was closed (`playwright-cli close`) and the local start stopped (`npm run local:stop`, "Local starts stopped: 1"). The start's database under `.runs/local-start/` and the rebuilt `dist/` are the product's own files and stay by the rule on those. No screenshot was shown to the human, none was pushed, and no image file stays anywhere.

## Unread material

- `.the-way/task-cycle/change/slice.md`, `.the-way/task-cycle/change/SKILL.md`, `walkthrough.md`, `ui_check.md`: read whole.
- `guidelines/styleguide-browser-view.md` (1457 lines): read lines 1-1029 (roles, rules through the end of the head of "The scene of a map run"); not read: lines 1030-1457 (the rest of the scene rule, the rules after it up to the end, which the handoff's slice does not name by line; the rule "The screen Siedziba" or a rule of the picture band, if any stands there, is among them - I searched by D-389 only in the rules I read).
- `guidelines/coding.md`: read whole. `src/browser/AGENTS.md`: read whole. `.claude/skills/loop2-play/SKILL.md`: read whole.
- `foundations/decisions.md`: D-396, D-282, D-389, D-445, D-446, D-447, D-199 (lines 7314-7340, read to its first lines of Verification and Origin), D-325, D-326, D-327, D-328, D-329 (to its Verification list start, lines 10212-10235), D-416 read; **not read**: the end of D-329 and the Rationale of D-199, D-325 beyond what is above; D-416 read whole. The handoff's range for D-199 (7309-7338) and D-325/D-327/D-329 (10111-10229) were read in that range extended a little each side.
- `foundations/environment_facts.md` `android-touch-target-size`: read whole. `foundations/glossary.md` lines 85-94: read.
- `.runs/task-cycles/uklad-na-telefon/task.md` lines 25-50 and 143-148: read.

## Searches not found or unclear

- The skill's note says `run-code` has "no file system" and gives a `--filename` form; both worked. Nothing missing there.
- The styleguide's measurement describes `contentWiderThanItsBox` entries as signs; the handoff's note 2 says the band "crosses its frame" as a fault. I could not find a place that says which of the two the reviewer takes for the picture band, so I judged by the screenshot and said so (concerns).
- The loop2-play skill gives no recipe for composing a state with earning loops; I wrote one from the simulation's functions (`startLoop`, `stopLoop`, `paidPractice`) and the refusal `shape` of `loadSavedGame` led me to the rule `completed < runNumber`. The skill's "Compose a game state" could name an earning-loop recipe.
- No search for a foundation entry or a token returned nothing.
