# Report — correction 1 (the human's remarks on request #179) — task `paski-parametrow`

**Status:** done

Every remark is answered:
- **Remark 1:** real blows were watched in the running game. The one fault found was answered by the orchestrator as Q1, way a), and is fixed.
- **Remark 3:** the scene at 360 px is not cut off, so nothing was changed.
- **M-1…M-4:** made.
- **Remarks 2 and 4, and N-1:** let through, as the human said.

## Commits (on `task/paski-parametrow`, from `18c16b69`; not pushed)

| Commit | Part | Message |
|---|---|---|
| `c9441aa2` | C: M-1…M-4, tests | `test: :white_check_mark: hold in the tests of the body row the bar under each value as D-311 gives it, the number of nature energy in text at 100, the open explanation moving the backpack down in the flow of the row, and quote D-450 once at the test of the click on satiety` |
| `4f886004` | C: the clauses `tests:` | `docs: :memo: name in the tests clause of D-178 the number of nature energy in text at 100 too, and in that of D-450 the open explanation standing in the flow of the row so that it moves the backpack down` |
| `713c4def` | A: the fix of Q1 | `fix: :lipstick: keep the text of a creature's blow still at its place under the health bar and only fade it, smoothly and slowly at first, so that it reads through its 1.3 s and leaves the bar and its end free, where rising inside the cell it ran across the bar; the motion test holds that it does not move, and the styleguide's rule of the body row says what it does` |

Part B has no commit, since nothing needed fixing.

Files changed (`git diff --numstat 18c16b69..HEAD`, added/removed):

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 4 | 3 |
| `guidelines/styleguide-browser-view.md` | 8 | 3 |
| `src/browser/run-screen.css` | 19 | 22 |
| `tests/view/body-row-cells.test.mjs` | 21 | 0 |
| `tests/view/body-row-explanation.test.mjs` | 31 | 1 |
| `tests/view/body-row-motion.test.mjs` | 26 | 7 |

## Each remark: what was done

### Remark 1 (item 1): real blows in the running game — watched; one fault found and fixed (`713c4def`)

**How it was run.**
- Browser: Chromium through Playwright CLI 0.1.22, on Windows 11.
- The game: `npm run build` and `node scripts/local-start.mjs`. The first check was at `https://127.0.0.1:53601`, the check after the fix at `https://127.0.0.1:62072`. Both starts were stopped.
- Sessions of my own, so no browser was shared with another cycle:
  - `-s=corr1`: desktop, page area 1600 × 1000;
  - `-s=corr1p`: phone, from `.playwright/cli.phone.config.json` (360 × 740, `touch: 1`, `phone: true`). Every control on the phone was tapped.
- Account: a made-up `agent@example.test`.

**The state.**
- `executor-8-compose.mjs 37 100 100 fight`, sent by the page's own save request (`correction-1-send.sh`).
- The run is on Las — wataha with the rule „Zawsze → Uderz — patyk”.
- At game minute 166 a wolf attacks. At 171 the simulation resolves the combat: three bites of 7, health 100 → 79. The marker reads „−21 · wilk”.
- Each case was sampled on every animation frame (`correction-1-watch-blow.template.js` through `correction-1-watch.sh`). The samples record:
  - the text's rectangle against its own cell, the other three cells and the bar;
  - its opacity and movement;
  - the cell's shake, its `data-blow` and the row's `data-standing`.

**What the first check found (before the fix).**
- At 1×, 2× and 4×, the text appeared right under the right end of the health bar. It then rose 12 px while fading, so the bar's line ran through it for almost its whole 1.3 s.
- Desktop: the text crossed the bar from 105 ms on, in 139 of 143 frames. Phone: from the first frame, in all 134.
- From about 0.45 s on it stood below half opacity, a faint red smear over the end of the green fill. That end is the health the blow had just taken.
- Screenshots 01 and 02 show it.
- I returned this as Q1. The orchestrator answered: way a). The text stands still under the bar and only fades.

**The fix (`713c4def`).**
- `src/browser/run-screen.css`:
  - one set of keyframes, `body-blow-text-fade`, which changes only `opacity` (to 0);
  - the base rule plays it in 1.3 s with `step-end`, so under reduced motion the text stands and goes in one step, as before;
  - the block `@media (prefers-reduced-motion: no-preference)` gives it `ease-in`: a smooth fade, slow at first;
  - the rise keyframes are gone;
  - the shake, the stop with game time, the removal at the animation's end and the place in the cell are unchanged;
  - the comments say what the text does and why it does not rise.
- `guidelines/styleguide-browser-view.md`, rule "The body row of a map run", section „Znacznik ciosu”:
  - „napis unosi się, gasnąc, nad pasek” is replaced by what the text does now: it stands still at its place and only fades, smoothly and slowly at first; the bar and its end stay free;
  - it says why it does not rise: under the bar the cell has only the text's height of room, and above the cell the text would stand on the „Potem” line or on the frame of the next cell;
  - the reduced-motion sentence now says the text stands in full colour and goes at once at the end of its time;
  - no value is written.
- `tests/view/body-row-motion.test.mjs`, the case at line 528, renamed to „… otherwise the cell shakes once in 0.34 s and the text stands still and fades smoothly once in 1.3 s”. Without reduced motion it now asserts:
  - an animation of 1.3 s that does not repeat, with timing other than `step-end`;
  - keyframes that end at opacity 0;
  - no `translate`, `transform`, `bottom` or `top` in any keyframe.
- The cause stands in the test's comment: rising in the health cell, the text ran across the bar and its end, where the number read badly. The comment points to the styleguide's rule "The body row of a map run" and not to the cycle's question or the request. The reason is `guidelines/testing.md`, "Where the expected value comes from": „Komentarz testu nie wskazuje dokumentu spoza fundamentu”. This departs from the wording of the orchestrator's instruction, „with the cause named in a comment as this decision (Q7 of the cycle, the human's remark 1)”.
- Seen failing first: the new test against the stylesheet before the fix gave exit 1, "it stays at its place under the bar, at 100%: expected ["","","",""], got ["0 calc(-1 * var(--space-m))","","",""]". After the fix: exit 0.
- A mutation, with the rule giving `ease-in` removed: exit 1, "it fades smoothly, not in one step: expected anything but "step-end"". Restored from a copy.
- The search the orchestrator asked for: `rise|rises|unosi|wznosi|translate` in `guidelines/styleguide-browser-view.md`, `foundations/decisions.md`, `src/browser/run-screen.css`, `src/browser/styles.css`, `src/browser/view/body-row-cells.tsx`, `src/browser/view/body-blow.ts`, `tests/view/body-row-motion.test.mjs`, `tests/view/body-blow.test.mjs` and `src/browser/kitchen-sink/`. A second search over the whole tree, without `node_modules`, `dist`, `.runs` and `.the-way`, looked for a rise near „blow” or „−”. The blow's rise stood only in:
  - the styleguide sentence at :1536;
  - the comments and keyframes of `run-screen.css` at :801, :814, :861, :903–906;
  - the motion test at :528 and :574.
- All of these are changed.
- No decision says the text rises. D-450 says „shows the fading „−{n} · {stworzenie}”” and „the text stands still and goes”; D-42 says „the fading text of a blow once in 1.3 s”; D-337 says nothing of it. So no binding sentence, *Verification* or *Rationale* changed. D-450's rationale „The text fades in the same real time at every pace” stays true.
- The other hits of the search are the scene's motion, the bear's paws, the flying icon and the specks. They are not the blow, and I did not touch them.

**The check after the fix, in the running game (`https://127.0.0.1:62072`).**

| Case | What I saw | Verdict |
|---|---|---|
| Desktop, 1× | „−21 · wilk” at 581.9..638 × 480.2..498.3 in every frame, under the bar (494..638 × 475.5..479.5). It never overlaps the bar: 0 of 141 frames, then 0 of 216 in a second run. It stays in its own cell, crossing no other cell's frame (0 violations). It moves only sideways with the cell's shake, about ±4 px for 340 ms. Opacity: 1.00 at 0 s, 0.94 at 0.25 s, 0.83 at 0.45 s, 0.69 at 0.65 s, 0.55 at 0.8 s, 0.35 at 1.0 s, 0.24 at 1.1 s, 0.12 at 1.2 s, 0 at 1.30–1.36 s, then removed. The bar's end at 79 % stays free throughout. Screenshots 06 (opacity about 0.94) and 07 (taken at measured opacity 0.52 → 0.45, so about 0.85 s): both read „−21 · wilk” plainly, under a free bar. | ok |
| Phone, 1× | Text at 110.9..167 × 390.2..408.4 in every frame. Its line box overlaps the bar's bottom (390.5) by 0.3 px, but the glyphs stand clear of the bar in the 4× crop. Inside the health cell (21..176 × 363.4..411.4), 0 violations, the same opacity curve. Screenshot 08. | ok |
| Paused by the player | „Pauza” clicked after the marker came. For the 1.5 s of the pause every frame stood at opacity 0.730, `translate: none`, `animation-play-state: paused`, standing `paused`. After „Wznów” it went on from 0.720 to gone. Kept: `correction-1-after-q1-pause.txt`. | ok |
| Phone, paused right after the blow | Text 111..167 × 390.2..408.4 at opacity 0.85, standing `paused`, inside the cell. The phone measurement: `scrollsToTheSide: false`, `controlsSmallerThan48: []`, and only the flags of the scene (Part B). | ok |
| A second blow | As in the first check, the built `dist/public/main.js` was patched to an attack chance of 1, cooldown 0 and combat length 1, and restored byte for byte at once (`cmp` equal). At 2×, a new combat every second: each new one put one text back at opacity 1.00 while the one before stood at 0.86. `data-blow` went odd → even → odd → even → odd, restarting the shake; never more than one text. The killing blow stood at 1.00 until the end-of-run window opened, then was dropped. Kept: `correction-1-after-q1-replace-2x.txt`. | ok |
| Reduced motion | No shake (translate `none`). The text stood still at 1.00 opacity for 1.30 s and went in one step; 0 of 216 frames overlap the bar. | ok |

**What the first check saw of the other steps** (the fix does not touch them):
- 2× and 4×: the same as 1×; the text took 1.3 s at both.
- 8× and 16×: the combat happened (health 100 → 79), with no marker, no `data-blow` and no shake.
- Killing blow at a stop (`… 37 100 5 fight`): „−7 · wilk”, standing `dead`, opacity 1.00, cell translate 0, `paused`. It stood 0.97 s until the end-of-run window opened, then was dropped.
- Bars after „Restart” (`executor-9-2-compose.mjs 144 33 14 30`):
  - the numbers changed at once to 37,0 °C / 100 % / 100 / 100;
  - the fills of satiety and health (20.2 / 43.2 px) and the marker of the scale grew smoothly to the right lengths in about 0.5 s;
  - at minute 1 they stood at 143.1 / 144 / 144 px and the marker at 242.8 px;
  - not broken, so not changed (item 7 of the request).
- The explanation open on the phone with a blow: the explanation stood between the cells and the backpack. The phone measurement flagged only the scene's flags.
- M-3 in the browser, on the desktop: the backpack's top moved from 505.3 to 542.9 px when „Sytość” opened its explanation. That is +37.6 px, the explanation's 33.6 px plus the row's gap of 4 px, and it went back to 505.3 on closing.

Console of both checks: no line beginning `uncaught` or `saved-game-load`.
- The first check had one `409 (Conflict)` on `/api/saved-game`. It came after the phone session, signed in to the same account, had saved, which is the expected conflict of two pages on one save.
- The second check had no such line.

### Remark 2 (item 2): the sum on a killing blow — let through

Seen as described („−7 · wilk” at health 5; „−21 · wilk” from 16). Not changed.

### Remark 3 (item 3): the scene's picture at 360 px — checked; not cut off; no fix

- Phone, 360 × 740, map run on Skraj lasu, running. Screenshot 05; both edges cropped and enlarged 5×.
- The picture `.scene-background` (natural 336 × 152) is drawn at 1 : 1 at 12..348 px, and so is the frame `.scene`. Its place `.scene-place` stands at 9..351 with `margin-inline: -12px`, in a window 360 px wide.
- The whole picture stands in the window and in the area's frame, 3 px from each side. Its frosty edge shows on both sides, and the mage and the bush stand whole.
- What the measurement flags:
  - `div.world-area` 330 > 318: that negative margin, set on purpose in the phone block of `.scene-place` in `src/browser/run-screen.css`;
  - `div.scene-sheet` 256 > 64 and `img` 156..412: the camp fire's sprite sheet of four 64 px frames, clipped by its own `overflow: hidden`, with a box of 0 × 0 on this map.
- Nothing was changed.

### Minor findings M-1…M-4 — done (`c9441aa2`, `4f886004`)

- **M-1:**
  - The test at `tests/view/body-row-cells.test.mjs:253` carries `// decision: D-311 "The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with a bar under each of its values"`.
  - The line at `tests/view/body-row-explanation.test.mjs:90` stays. That test holds the explanation's place, and a quotation must begin at the start of a sentence (`.the-way/elements/decisions/template.md`, "Verification"), so it cannot be cut down to the explanation's part.
  - Seen failing by a mutation, with no bar under nature energy: exit 1.
- **M-2:**
  - The case „only the number below its threshold stands in danger…” draws the row at nature energy 100 and asserts all four numbers in `var(--text)`.
  - Seen failing with energy put in alarm at its cap: exit 1, "… got […, "var(--danger)"]".
- **M-3:**
  - New case „an open explanation stands in the flow of the row, between the cells and the backpack, so it moves the backpack down”, with a `decision: D-450` line on „… and moves down what stands under it”. It asserts:
    - the row's children are `body-cells`, `body-explanation`, `backpack-text`;
    - the row is `display: flex`, `flex-direction: column`;
    - the explanation is `display: block`, `position: static`, `float: none`.
  - Its comment says that layout is left to the browser; the measurement is under remark 1 above.
  - Seen failing with `position: absolute` (exit 1) and with `float: left` (exit 1).
- **M-4:** the second identical D-450 line removed.
- ***Verification*** **clauses, through the foundation step** (decision skill, an in-place edit of `tests:` only, no binding sentence):
  - **D-178**, marked **the cycle's**:
    - new clause: "the number of the energy in `text` at 0, 90 and 100, never in `danger`";
    - meaning, English: the tests hold the number of nature energy in `text` at 0, 90 and 100, never in red;
    - meaning, Polish: testy trzymają liczbę energii natury w roli `text` przy 0, 90 i 100, nigdy na czerwono.
  - **D-450**, marked **the cycle's**:
    - new clause: "… opening between the four cells and the backpack, in the flow of the row so that it moves the backpack down, the explanation of its value …";
    - meaning, English: the tests hold that the open explanation stands in the flow of the row and so moves the backpack down;
    - meaning, Polish: testy trzymają, że otwarte objaśnienie stoi w przepływie wiersza i dlatego spycha plecak w dół.
  - **D-311**: its clause already names the bar under each value and the explanation under the cells, so it is unchanged.
  - No pair of examples was added. The fix of Q1 changed no decision.

### Item 4 and N-1 — let through; nothing done

## Screenshots

- All are pushed to `mariusznazar/screenshots`, directory `loop2/paski-parametrow/`, branch `loop2/paski-parametrow`. Each push was a new commit with the `gh` account `mariusznazar`, never forced and never on `main`:
  - `bf44064459bc31cc7d51e68ae74a1d915903f8f4` (01–05, the first check), on top of `5528530e`;
  - `287c92ab5ce3f4cb65ce78112c1a481602f22e63` (06–08, after the fix), on top of `bf440644`.
- `git ls-remote` shows the branch at `287c92ab`.
- I looked at each screenshot before pushing it. They show only „Konto”, with no address, password or token.
- **Fetch results** at 13:11 UTC (`curl -L`): every link answered **200** `image/png`, with the size of its file. The first check's 503 is gone.

| # | File | Link | HTTP |
|---|---|---|---|
| 01 | `loop2_c1_01_blow_1x_1600x1000.png` — before the fix: a real blow at 1×, about 0.25 s; the bar's line runs through „−21 · wilk” | https://github.com/mariusznazar/screenshots/blob/bf44064459bc31cc7d51e68ae74a1d915903f8f4/loop2/paski-parametrow/loop2_c1_01_blow_1x_1600x1000.png?raw=true | 200 |
| 02 | `loop2_c1_02_phone_360_blow_1x.png` — before the fix, phone: the text crossed by the bar | https://github.com/mariusznazar/screenshots/blob/bf44064459bc31cc7d51e68ae74a1d915903f8f4/loop2/paski-parametrow/loop2_c1_02_phone_360_blow_1x.png?raw=true | 200 |
| 03 | `loop2_c1_03_phone_360_blow_paused_explanation_open.png` — before the fix, phone: the explanation of „Sytość” open, the blow held by „Pauza” | https://github.com/mariusznazar/screenshots/blob/bf44064459bc31cc7d51e68ae74a1d915903f8f4/loop2/paski-parametrow/loop2_c1_03_phone_360_blow_paused_explanation_open.png?raw=true | 200 |
| 04 | `loop2_c1_04_blow_reduced_motion_1600x1000.png` — reduced motion: the text still and clear under the bar (the look the fix brings to the ordinary motion too) | https://github.com/mariusznazar/screenshots/blob/bf44064459bc31cc7d51e68ae74a1d915903f8f4/loop2/paski-parametrow/loop2_c1_04_blow_reduced_motion_1600x1000.png?raw=true | 200 |
| 05 | `loop2_c1_05_phone_360_scene.png` — Part B: the whole scene in the phone layout, not cut off | https://github.com/mariusznazar/screenshots/blob/bf44064459bc31cc7d51e68ae74a1d915903f8f4/loop2/paski-parametrow/loop2_c1_05_phone_360_scene.png?raw=true | 200 |
| 06 | `loop2_c1_06_blow_still_1x_025s_1600x1000.png` — after the fix: a real blow at 1×, about 0.25 s, opacity about 0.94; „−21 · wilk” clear under the bar, the bar's end at 79 % free | https://github.com/mariusznazar/screenshots/blob/287c92ab5ce3f4cb65ce78112c1a481602f22e63/loop2/paski-parametrow/loop2_c1_06_blow_still_1x_025s_1600x1000.png?raw=true | 200 |
| 07 | `loop2_c1_07_blow_still_1x_085s_1600x1000.png` — after the fix: the same blow at about 0.85 s (opacity 0.52 → 0.45 during the capture), still readable in place, the bar free | https://github.com/mariusznazar/screenshots/blob/287c92ab5ce3f4cb65ce78112c1a481602f22e63/loop2/paski-parametrow/loop2_c1_07_blow_still_1x_085s_1600x1000.png?raw=true | 200 |
| 08 | `loop2_c1_08_phone_360_blow_still_1x.png` — after the fix, phone: two rows of two, „−21 · wilk” under the health bar, the bar free, nothing over another frame | https://github.com/mariusznazar/screenshots/blob/287c92ab5ce3f4cb65ce78112c1a481602f22e63/loop2/paski-parametrow/loop2_c1_08_phone_360_blow_still_1x.png?raw=true | 200 |

Motion, in words, after the fix:
- The cell shakes about ±4 px left and right, four times in 0.34 s.
- The red text stands still under the right end of the bar. It fades slowly at first (still about 0.83 at 0.45 s), then faster, and is gone at 1.3 s.
- In a pause both stand still; a new blow restarts both.

## Checks (command, exit code)

At `713c4def`, after all commits:

| Check | Exit |
|---|---|
| `npm test -- tests/view/body-row-motion.test.mjs` | 0 (9 pass) |
| `npm test -- tests/view/body-row-cells.test.mjs` | 0 (9 pass) |
| `npm test -- tests/view/body-row-explanation.test.mjs` | 0 (5 pass) |
| `npm test -- tests/view/body-blow.test.mjs` | 0 (8 pass) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (19 pass) |
| `npm run typecheck` | 0 |
| `npx prettier --check src/browser/run-screen.css tests/view/body-row-motion.test.mjs` | 0 |
| `npx eslint tests/view/body-row-motion.test.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (no `--skip-test-citations`) | 0 ("0 errors") |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 ("0 error, 0 warn, 120 info") |
| `npm run build` | 0 |

Earlier in the correction (Part C), each at its own commit:
- `npx prettier --check` and `npx eslint` on `tests/view/body-row-cells.test.mjs` and `tests/view/body-row-explanation.test.mjs`: 0.
- `foundation_check.py` and `check_instructions.py`: 0.

Failing runs of tests written first, or seen failing by a mutation:

| Run | Exit |
|---|---|
| motion case (Q1) against the old stylesheet | 1 |
| motion case with the rule giving `ease-in` removed | 1 |
| explanation case with `position: absolute` (M-3) | 1 |
| explanation case with `float: left` (M-3) | 1 |
| cells case with nature energy in alarm at its cap (M-2) | 1 |
| cells case with no bar under nature energy (M-1) | 1 |

Each mutation was undone before the commit.

Not run: the full gate (`npm test`), which is CI's on the request, as the handoff gives. Nothing but CI runs the full gate before the merge.

## Own-work check

- **Requirement most likely not met:** after the fix, the number reads through its whole 1.3 s and leaves the bar's end free, in both layouts. That is the task's goal „co najmniej tak czytelne jak w starym Loopie”, with D-450's „shows the fading „−{n} · {stworzenie}””.
- **The check:** on every frame of a real blow at 1×, compare the text's rectangle with the bar's, and record the opacity. Then look at crops of screenshots at about 0.25 s and 0.85 s, and on the phone.
- **What it showed:**
  - Desktop: 0 frames overlapping the bar (141 and 216 frames).
  - Phone: the text's line box overlaps the bar's bottom by 0.3 px, while the glyphs stand clear in the 4× crop.
  - Opacity at least 0.5 until about 0.85 s, about 0.35 at 1.0 s, 0 at 1.3 s. The crops at 0.25 s and 0.85 s read plainly.
- **What a fade still costs:** the last 0.3–0.4 s are faint, as any fading text is. Before the fix the text was below half opacity from 0.45 s and crossed by the bar from 0.1 s.
- **Mutations in my head:**
  - a `margin-top` or `bottom` changed in the text's base rule so that it moves onto the bar: not caught by a test, since that is layout (D-87). It is checked in the browser as above.
  - the keyframes moving it by `inset` or `margin`: not caught (the test reads `translate`, `transform`, `bottom` and `top`). Named as left to review.

## Walkthrough

A correction reports no walk (method, section 6). The browser checks of Part A and B stand above.

## Choices, with the way rejected

- **The fade's curve `ease-in`.**
  - Rejected: a hold at full opacity, then a fade. That would need a keyframe `opacity: 1`, which the token check counts as a value in place of a token, since only `0` is exempt. Also rejected: `ease-out`, kept from loop's rise, which falls below half opacity by about 0.45 s.
  - Cost if wrong: the human may want another curve. That is one CSS word.
- **One set of keyframes for both settings of motion, told apart by timing** (`step-end` under reduced motion, `ease-in` otherwise), in place of two sets with the same body.
- **The cause in the motion test's comment** points to the styleguide's rule, not to the cycle's question or the request, under `guidelines/testing.md`. This departs from the wording of the orchestrator's instruction.
- **Step 3 (a second blow) with the built bundle patched** to make attacks follow each other, and restored at once. The game's data puts two blows at least 96 game minutes apart, so the case cannot happen otherwise.
- **M-3 as a jsdom case of the stylesheet's flow properties plus a browser measurement.** Rejected: a jsdom case of heights, since jsdom lays nothing out (D-87, D-88).
- **The D-311 line at `body-row-explanation.test.mjs:90` kept**, since a quotation must begin at the start of a sentence.

## Departures from the task's answers or the plan

- **The text of a blow no longer rises as loop's does** (task, *Context*: „napis wznosi się i znika przez 1,3 s”). It stands still and fades, under *To do* 9, as the orchestrator's answer to Q1 gives it:
  - the human's remark 1 („Co wyjdzie źle — popraw”);
  - the goal of readability;
  - D-396 rules out the rise above the cell;
  - inside the cell the bar crossed it.

## Reach beyond the dispatch

- `src/browser/sim/run.ts` (`finishMinute`), `src/browser/sim/combat.ts` lines 1–80, and searches of `src/browser/sim/data/maps.ts` and `balance.ts` for the attack chance, cooldown and combat minutes: to see when real blows can follow each other.
- `src/browser/styles.css` lines 455–569: the parts of a value cell.
- `src/browser/view/body-row.ts` lines 170–236: the mutation of M-2.
- `package.json` and the head of `scripts/local-start.mjs`: to run the start without a rebuild.
- `tests/invariants/test_browser_view_token_values.py`, a search for `opacity`: to see whether `opacity: 1` would pass the token check.
- `tests/view/body-row-motion.test.mjs` lines 1–145 and 515–577: the helpers and the case the fix changes.
- For the foundation step: `.the-way/elements/decisions/template.md`, `skill/SKILL.md`, `read.md`, `decide_entry.md` and `examples.md`, `.the-way/elements/common/rules.md` and `way_of_working.md`.
- `executor-8-report.md` (walk section) and `fix-1-report.md` whole, as the handoff names.

## Working copies

- `.runs/correction-1/` in the worktree, used twice, for the first check and after the answer to Q1. It held:
  - logs and the copied compose and probe scripts;
  - the screenshots and crops;
  - the copy of `dist/public/main.js`;
  - the clone of `mariusznazar/screenshots` (`.runs/correction-1/screenshots`).
- Both times the directory was removed with everything in it. Three test logs I had written straight into `.runs/` were removed too.
- `.playwright-cli/`, the CLI's snapshots and console logs: removed. The sessions `corr1` and `corr1p` were closed both times, and the local starts stopped (`npm run local:stop`: "Local starts stopped: 1", twice).
- `dist/public/main.js` was patched twice for the second-blow case and restored from its copy each time (`cmp` equal).
- Kept in `reports/` for this report:
  - probes: `correction-1-send.sh`, `correction-1-watch.sh` with `correction-1-watch-blow.template.js` (its screenshot step now records the opacity before and after the capture), `correction-1-summ.py`, `correction-1-profile.py`, `correction-1-replace.template.js` with `correction-1-trans.py`, `correction-1-pause.js` (from the first check; its screenshot path is the first check's), `correction-1-phone-pause-blow.js`;
  - outputs: `correction-1-desk-1x-blow.txt` and `correction-1-replace-2x.txt` (the first check), `correction-1-after-q1-blows.txt`, `correction-1-after-q1-pause.txt` and `correction-1-after-q1-replace-2x.txt` (after the fix).
- Left as the product's own output: `dist/`, and the local start's database under `.runs/local-start/`, which the next start removes.

## Unread material

- D-04: read its binding sentences and the first lines of *Verification* (lines 59–98); the rest of *Verification*, *Rationale* and *Rejected* not read.
- D-311: read to the first lines of its *Rationale* (lines 10677–10736); the rest of *Rationale* and *Rejected* not read.
- `.the-way/elements/decisions/template.md`:
  - read: lines 1–117 and 134–310;
  - lines 118–133 only through a search hit;
  - lines 311–354 (trade-off principles, Origin, recovered decisions) not read, since no such part was written.
- WAY-03, which `examples.md` names: not read, since only clauses `tests:` were edited.
- `tests/view/body-row-motion.test.mjs`: lines 146–514 not read; the change touched one case and the helpers it uses.
- `guidelines/styleguide-browser-view.md`: read whole after the answer to Q1, before it was changed. The rule "Two layouts and one threshold between them" (539–609) and "The body row of a map run" (1421–1569) were read at the start; the rest in this round.

## Searches not found or unclear

- The handoff says `guidelines/testing.md` holds the rules for the lines `decision:` and the clause `tests:`. A search of the file for `decision:` and `tests:` found nothing. The rules stand in `.the-way/elements/decisions/template.md`, section "Verification", which I followed.
- `tests/view/body-blow.test.mjs`, which the orchestrator named, holds no `rise`, `unosi`, `wznosi` or `translate`. It tests the words of the marker, not its motion. Nothing changed there; it passes.
- The rule in `guidelines/testing.md` that a test's comment points to no document outside the foundation conflicts with the orchestrator's wording for the test's comment. I followed the guideline, as said under Choices.
