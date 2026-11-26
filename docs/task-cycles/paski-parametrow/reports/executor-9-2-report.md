# Report — executor of slice 9 (second executor of the slice) — task `paski-parametrow`

**Status:** done with concerns (the concerns are in "Problems as observed" and "Choices"; none blocks the slice)

## Commits (on `task/paski-parametrow`, base `8836c61a`)

| Commit | Message (start) |
|---|---|
| `c2639ea7` | docs: :memo: write the styleguide's rule The body row of a map run, with its cells, bars, temperature scale, alarm, frame, explanation, blow marker, motion and both layouts, and the button of a cell of the body row … in the list of controls that depart from the list of states |
| `df83c446` | docs: :memo: say in the styleguide's rule The body row of a map run that the dark marker of the temperature scale in the middle of a zone looks like one more gap between zones … |
| `51e2a43a` | docs: :memo: name in the styleguide's rule The body row of a map run the states of the sample of the cell's button on the page of all states as the page draws them |

One file changed, `guidelines/styleguide-browser-view.md`: +164 / −2 over the three commits
(`git diff 8836c61a HEAD --stat`). The two removed lines are the *Decision* line of the rule "States of
shared controls" (two decisions added to it) and the backticks I took off `origin/test` in the rule
"Every value with its source" (slice 1's text; `check_instructions.py` warned on it as a dead path).

What the file now holds:
- the new rule `### The body row of a map run`, after "The scene of a map run": *Decision*, *Invariant*
  (`none`), *Good*, *Bad*, then the cells, bars and scale, alarm, frame of the temperature cell,
  explanation, blow marker, motion and the two layouts, in the form of "The scene of a map run" and
  "The screen Postać" (a lead paragraph and lists, with no value written: roles, tokens and files are
  pointed to; times and numbers stand in `src/browser/run-screen.css` and `src/browser/view/body-row.ts`);
- in "States of shared controls", in the list „Kontrolki odstępujące od tej listy stanów”, an entry for the
  cell of the body row (`kind: "value-cell"`) with its states and its reason: its track stands in `highlight`,
  the colour of the background of a button under the pointer; the two decisions D-337 and D-450 added to the
  rule's *Decision* line.

## Checks (command, exit code)

| Check | Command | Exit | Note |
|---|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` (after `git add`, and again after the last commit) | 0 | `0 errors` |
| instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 0 warn, 112 info`; before I removed the backticks from `origin/test` it said `1 warn` (a dead path), exit 0 |
| heading | `rg -U "###\s+The\s+body\s+row\s+of\s+a\s+map\s+run" guidelines/styleguide-browser-view.md` | 0 | one match, line 1415 |
| status | `git status --short` | 0 | empty: nothing of mine untracked or modified, no screenshot in the repository |

The full gate (`npm test` bare) was not run, as the handoff gives. No test of the repository reads the
styleguide (`rg styleguide-browser-view tests` finds nothing), so no focused test applies.

## Own-work check (section 3)

- Requirements most likely not met: (a) "its values pointed to and none written"; (b) "as the code of Slices 2
  and 5–8 makes them", that is, that what the rule says the code does is what it does.
- (a) Check: `git diff 8836c61a HEAD -- guidelines/styleguide-browser-view.md`, the added lines searched for a
  hex colour, a `px`, `ms` or `s` time, or a decimal (`grep -E '#[0-9a-fA-F]{3,8}\b|[0-9]+ ?px|[0-9]+ ?ms|[0-9]+(\.[0-9]+)? ?s\b|0[.,][0-9]'`).
  Three matches, none a value of the body row: the example „14 %” in *Good*, the threshold of the layout
  `@media (width < 1280px)` (D-396, which the styleguide already writes as it stands) and the page area 360 px
  in the sentence on the phone measurement.
- (b) Check: each class, attribute and function the rule names searched in `src/browser/`
  (`alarm`, `note-danger`, `holds-marker`, `frame-warming`, `frame-cooling`, `data-standing`, `data-blow`,
  `body-explanation`, `value-cell-static`, `temperatureZones`, `bodyExplanation`, `standingOf`): every one found;
  and the rule read against `body-row-cells.tsx`, `body-row.ts`, `body-blow.ts`, `react-button.tsx`, the body-row
  rules of `run-screen.css` and the cell rules of `styles.css`.
  **It found two statements of mine that were wrong, both corrected:**
  1. my first sentence said the dark marker merges with the gap between zones "near the zone edge" (the
     report of slice 6 says so); the screenshot of the start state showed it merges in the middle of the safe
     zone at 37,0 °C too. The probe below measured it; corrected in `df83c446`.
  2. the rule said the kitchen-sink page shows the cell's button "open"; `src/browser/kitchen-sink/control-samples.tsx`
     (lines 129–156) shows it in the page's states (default, hover, focus, disabled) with a bar and with a scale,
     not open; corrected in `51e2a43a`. (This was found by reading, not by a command, so there is no failing run.)
- Probe of finding 1 (kept here, the file it ran on is in the screenshots repository): Python with Pillow, on
  `loop2_01_start_1600x1000.png` and `loop2_02_below_threshold_1600x1000.png`, the colour runs along the row
  y = 477 from x = 150 to 301:
  `[(24,24,27) 4][(0,166,244) 65][(24,24,27) 1][(159,159,169) 24][(9,9,11) 2][(159,159,169) 25][(24,24,27) 1][(255,100,103) 26][(24,24,27) 4]`
  at 37,0 °C, and `… (159,159,169) 13, (9,9,11) 2, (159,159,169) 36 …` at 36,1 °C. The gaps between zones are
  1 px of `panel` (24,24,27); the marker is 2 px of (9,9,11). Exit 0.
- Mutation of the rule in my head: a rule that named a value (a time, a hex) would stand stale when the token changes —
  scanned in (a); a rule that named a class that no longer exists — the search in (b) is the check, run once now, not
  held by a test (no test reads the styleguide).

## Walk (walkthrough.md)

The change alters no behaviour a user sees: it writes the styleguide, a file no screen reads. I did run the
game, but only to make the screenshots below; it is not a walk of a change, so `walkthrough.md` was not read
(`ui_check.md` was read, and its route, the screenshots to the place D-418 settles, was followed).

## The side-by-side for the request (task *To do* 8)

Screenshots of the old Loop come from the folder `rozpoznanie_mvp2/zrzuty` beside the project's definition; I
compared the copy byte by byte with the original (`cmp`, same). All seven files lie in
`mariusznazar/screenshots`, directory `loop2/paski-parametrow/`, branch `loop2/paski-parametrow` (created by my
push; it did not exist), commit `97922f0683a59447f3bc50f72ca89088d356e7aa`, pushed with the `gh` account
`mariusznazar` (`gh auth status`). Every link was fetched after the push: HTTP 200, `image/png`.
None is in this repository or in the record. The screens show the made-up account of my local start only
(its address does not appear on any of them); the old ones show the public game loop.

Link prefix, for each file below:
`https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/<file>?raw=true`

**Pair 1 — the start of a map run, full values**

- Old: [`loop_06_przejscie_ekran.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop_06_przejscie_ekran.png?raw=true) — 1600 × 1000, Skraj lasu, run #2 at 00:00, three cells (ciepło 37,0 °C, sytość 100 %, zdrowie 100) with white bars, notes under them.
- New: [`loop2_01_start_1600x1000.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop2_01_start_1600x1000.png?raw=true) — 1600 × 1000, Skraj lasu, „Minuta 0 (pauza)”, composed state (below), body row under „Potem”: four cells in a row. I looked at it and at a 2× crop of the row. I see: „Temperatura 37,0 °C” with the scale blue / grey / grey / red and „bez ognia 83 min” under it, in a frame in the blue of the chill zone (no fire, the map cools); „Sytość 100 %” on a full orange bar, „bez jedzenia 116 min”; „Zdrowie 100” on a full green bar with no frame; „Energia natury 100” on a full white bar. Numbers at the right of the names, bars 4 px thick on a dark track. **The marker: at 37,0 °C it stands in the middle of the grey safe zone and I cannot tell it from one more gap between zones — the safe zone looks like two grey pieces** (the probe above). The scene is grey, as the old screenshot's is: both are paused.

**Pair 2 — a value below its threshold**

- Old: [`loop_11_run_w_ruchu.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop_11_run_w_ruchu.png?raw=true) — 1600 × 1000, run #2 at 02:24 at 16×, ciepło 36,1 °C, sytość 14 % with a red bar and „głoduje”, zdrowie 90.
- New: [`loop2_02_below_threshold_1600x1000.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop2_02_below_threshold_1600x1000.png?raw=true) — 1600 × 1000, Skraj lasu, „Minuta 144 (pauza)”, composed state: 36,1 °C, satiety 14, health 90, no fire. I looked at it and at a 2× crop. I see: „Sytość” and „14 %” in red, the fill orange at 14 % of a dark track, „głoduje” in red under it — the fill taken at the full phase of its pulse (I took frames until the pixel of the fill read (251,135,5); a frame taken a moment earlier showed it at the dim phase, a dark orange, and is not pushed); „Zdrowie 90” on a green bar to 90 % with a visible dark track; temperature at 36,1 °C with the marker again a dark line in the grey zone, bluish frame, „bez ognia 45 min”. The 14 % fill is visible on its track, not lost; the track of a nearly empty bar is faint against the block, as D-337 accepts. The pulse and its pause are motion: described in words only.

**Not paired (the old screenshots have no such state)**

- [`loop2_03_fire_and_explanation_1600x1000.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop2_03_fire_and_explanation_1600x1000.png?raw=true) — 1600 × 1000, the same state as pair 2 with a campfire on the character's tile, after a click on „Temperatura”. I see: the frame of the temperature cell amber and „przy ogniu” under the scale (the first time this frame is seen in a browser; the slice-6 executor did not see it), the name „Temperatura” brighter (open), and under the four cells, above „Plecak 0/15”, the explanation „Poniżej 35 °C postać marznie — traci 0,35 zdrowia na minutę, a passa się zeruje. Otoczenie 25 °C: temperatura spada tu o 0,024 °C na minutę, a ognisko podnosi ją o 0,5 °C na minutę, najwyżej do 37 °C.” on two lines, which moves the backpack and what is under it down.
- [`loop2_04_phone_360_below_threshold.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop2_04_phone_360_below_threshold.png?raw=true) — 360 × 740 phone window with touch (`.playwright/cli.phone.config.json`), the state of pair 2, scrolled to the row. I see four cells in two rows of two: „Temperatura” and „Sytość” above, „Zdrowie” and „Energia natury” below, all names whole, no text over a frame, the row inside the window.
- [`loop2_05_phone_360_explanation_open.png`](https://github.com/mariusznazar/screenshots/blob/97922f0683a59447f3bc50f72ca89088d356e7aa/loop2/paski-parametrow/loop2_05_phone_360_explanation_open.png?raw=true) — the same, after a tap on „Sytość”: the name brighter, the explanation „Poniżej 30 % postać głoduje — traci 0,35 zdrowia na minutę, a passa się zeruje. Sytość spada o 0,6 % na minutę, tak samo na każdej mapie.” on three lines between the two rows and „Plecak 0/15”.

How the states were made: pair 1 and the others by the composed state of `.claude/skills/loop2-play/SKILL.md` „Compose a game state”: a copy of the executor 9's idea in my own script, kept as `.runs/task-cycles/paski-parametrow/reports/executor-9-2-compose.mjs` (`node <it> <minute> <temperature> <satiety> <health> [fire]` from the repository root after the build; it prints the saved document, sent by the page's own save request). Pair 1 is the state at minute 0, paused, with the starting body, not a state reached by pressing „Wejdź” (a first take by that route showed minute 2 at 36,9 °C and 98 %, because the run goes on at 1× while the screenshot is taken). The state of pair 2 is a composed one, not reached by playing. A blow marker was not shown on any screenshot: a combat would need another composed state, and the marker is motion.

Phone measurement (`reports/executor-7-phone-measure.js`, `playwright-cli run-code`) at 360 × 740, with the row and with the explanation open: `scrollsToTheSide: false`, `controlsSmallerThan48: []`, `contentWiderThanItsBox`: `div.world-area` (content 330 > box 318) and `div.scene-sheet` (256 > 64), `outsideTheWindow`: `img` spanning 156..412 (exit 0 each).
**Answer to the open point of slices 7 and 8:** the same three flags stand at the base commit `51667231`, measured: a worktree of that commit in my directory, `npm ci` (exit 0), `npm run local`, a phone session, an account, the same map run, the same measurement: `div.world-area` 330 > 318, `div.scene-sheet` 256 > 64, `img` spanning −36..220. They come from the scene's picture and its negative margin in the phone layout (`margin-inline` in `.scene-place`, line 729 of `run-screen.css` at the base), not from the body row.

## Values chosen by the agents, for the human's veto in the request

Slice 1 (the values stand in `src/browser/tokens.css`, each with its `Source:`): `satiety-fill` `#ff8904` (Tailwind v4 `orange-400`, converted; loop has no orange bar); `chill-zone` `#00a6f4` (loop's blue `bg-sky-500` of the rule being carried out); `safe-zone` `#9f9fa9` (loop's grey of descriptions, the value of `text-secondary`; a lighter grey than the `#71717b` the task computed, to keep the dark marker readable on all three zones); `scale-marker` `#09090b` (loop's page background; the value of `page`); `warming-frame` `#ffd230` (the amber the task gives, loop's `bg-amber-300`); `--alarm-pulse-dim-opacity` `0.4` (loop's `@keyframes alarm`). Slice 2: the resting role of the name of a value `text-label` and of its number `text` (D-40 names neither). Slices 6 and 8: the curve of the fill and the marker `ease` over 500 ms; the pulse `ease-in-out`; the shake ±`--space-xs` (4 px) over 340 ms, `linear`; the text rising `--space-m` (12 px) over 1.3 s.

## Departures from the task's answers and the plan, gathered from the reports of slices 1–8 and mine

1. The five roles and the dim opacity: values chosen by the agent with sources (above), as ruling (1) of the handoff gives.
2. The fill colours of the cell stand in `src/browser/styles.css`, not in `run-screen.css` (the plan's place), because the kitchen-sink page links only `styles.css` (slice 2).
3. No rule in an `@media (width < 1280px)` block for the body row: the pairs wrap by themselves and the touch target of the three buttons is the one every `.button` holds there (slices 2 and 6). The styleguide rule says so.
4. The border of the chill and safe zones follows `BALANCE.body.chilledBelow`, not the number 35 of the look (slice 5).
5. The marker of a killing blow sums the creature's strikes, not the health lost: „−14 · wilk” at 8,65 lost (slice 5).
6. The number keeps its unit: „82 %” (slice 5).
7. The scale's marker also moves smoothly over 500 ms, not only the fills (slice 6).
8. Bars animate after „Restart” (the same component draws the new run, so the fills grow from the old run's lengths): the task asks for the length to stand at once only at the first draw (slice 6). Not written into the styleguide.
9. The marker's visibility: the dark marker (and it merges with the gap between zones near 35 and 39 °C, slice 6) looks like one more gap in the middle of a zone too (mine, finding above). The rule says so.
10. The amber frame was not seen in the browser by slice 6; I saw it (screenshot 03).
11. Blow text: it stands over the cell, near its right edge, with no row of its own, so in the phone's two rows of two it lies over the lower part of the temperature cell for the 1.3 s of its fading (slice 8 saw it; I did not see it). The styleguide rule says so.
12. Mine: the cell button's reason in the exception list is written with the old Loop's open cell as the pattern (D-40 rationale); the resting roles `text-label` and `text` of the name and the number are set by the rule "The body row of a map run" (a rule of the look no decision gives: *Decision* `none` for that sentence; the human accepts it at the merge, as the template says).

## Choices (with the way rejected and the cost if wrong)

- **The rule stands after "The scene of a map run"** (the world area's two parts together). Rejected: after "The screen Postać" (the template does not say; the body row is a part of the world area). Cost if wrong: a move of one section.
- ***Invariant* `none`.** The pair tests of `design-token-contrast` hold the colours already; no cheap test checks the rest. Rejected: naming `design-token-contrast` in the rule, which would claim it checks the rule.
- **Numbers not written; pointed to.** The scale's ends, the start of overheating, the shares and the health threshold are in `body-row.ts` (`temperatureZones`); times in `run-screen.css`. Rejected: writing 30, 35, 39 and 41 °C and 5 : 4 : 2 as D-337 does — a second copy that drifts (template: a rule repeats no decision or value). Cost if wrong: a reader goes to D-337 for them.
- **Motion times stated as not tokens, like the scene's** (they are in the stylesheet's rules with their sources in comments), and the dim opacity and the shake and rise distances as tokens (they are). Cost if wrong: one sentence.
- **The finding about the marker is in the rule** as a plain sentence, not as a prohibition, because a rule that hid it would say the marker reads well. Cost if wrong: the sentence goes when the marker is changed.
- **A second commit and a third, not an amend,** for the two corrections.
- **Screenshots: one commit, seven files, one branch.** Rejected: one commit per file (more links to read; the files are one set).

## Problems as observed (with evidence)

1. **The temperature scale's marker is not readable as a marker at the start of every map run** (screenshot 01; probe above). At 37,0 °C — where a character stands at the start, on every map — the marker is 2 px of (9,9,11) in the middle of a 49 px grey zone, and the gap between zones is 1 px of (24,24,27) a few pixels away; I took it for another gap until I measured it. The same at 36,1 °C (02). The task asks the marker to be a short dark vertical line the height of the bar and the answer of D-42 only asks 3:1 against the zones, which it has (6.9:1 to 7.6:1); nothing asks it to stand out from the gaps, which are the colour of `panel`. This matters for the acceptance criterion (the human must not call the old Loop better at the parameters): in the old Loop's cell the warmth bar had a fill that said the value at once. **A guess at a cause:** the marker's colour was chosen dark for contrast against the zones (slice 1) and the gap was fixed at 1 px of `panel` (slice 6); neither was judged against the other. **Recommendation:** decide before the merge whether to keep it (the number carries the value), or to make the marker read: wider than the gap, or taller than the bar, or a lighter colour with 3:1 against the zones where possible (the task's *Context* computes that a light marker has only 2.63:1 on `danger`), or two-colour (a light edge around the dark line). Cost of leaving it: the one thing the scale was added to show — where the temperature stands — is the number alone, as before the change. The rule text says what the code does today and would change with the marker.
2. The phone flags `div.world-area` 330 > 318 and the rest stand at the base commit too (above): not the body row's and not this task's.
3. **Not observed by me:** the blow marker (no screenshot, no browser check), the lengthening of bars after „Restart”, the over-lapping of the blow text in the phone layout (reports of slices 6 and 8 only), the cell under touch keeping its brighter name after a tap closes it (the hover of a touch browser sticks; there is no `hover: none` block for the cell; a guess, not checked).
4. `bodyCells` and `bodyValues` in `body-row.ts` are used by no component now and kept by `tests/view/body-row.test.mjs` (slice 6's note; outside this slice).

## Reaches beyond the dispatch (what, where, why)

- `~/.the-way/locations.json` and the folder of the project's notes, to find `rozpoznanie_mvp2/zrzuty` (the dispatch asks for it); no path of it is in any file or in this report.
- D-317 and D-322 statements (the first paragraphs, `foundations/decisions.md:11915-11935`, `12148-12170`), which the rule cites for the pace and the standing of time; D-407 whole (the handoff's "read besides" had it in the ranges).
- Reports of slices 1, 2 whole, and the departure and choice sections of 3 and 5–8 (the handoff names them for the departures).
- `src/browser/kitchen-sink/control-samples.tsx:125-170` to check what the page shows of the cell's button.
- The old Loop's screenshot files: copied to my directory, looked at, pushed.

## Working copies (where each stood, and removal)

- `.runs/executor-9-2/` — my scripts, states, crops, the clone of `mariusznazar/screenshots` (`screenshots/`), the screenshots before the push, the logs of two `npm run local` starts, and a worktree of `51667231` with its `node_modules` (`.runs/executor-9-2/base/`): removed (`git worktree remove --force` on the path, `git worktree prune`; then `Remove-Item` on the directory). Kept, beside this report: `executor-9-2-compose.mjs`.
- `.runs/executor-9/` — the earlier executor's directory: removed as the handoff asks, by the full path; I used none of its files or screenshots (its `compose.mjs` and `send-*.js` were read as hints).
- `.runs/executor-9-2-ci.txt`, `-fc.txt`, `-proj.txt` (outputs of the two checks and the path of the project's folder, which holds the author's private path): removed.
- `.playwright-cli/` in the worktree's root: removed. Playwright sessions `exec92`, `exec92p` and `base92` closed; both local starts stopped (`npm run local:stop`, "Local starts stopped: 1" in each directory). The databases of the starts stand under `.runs/local-start/`, which the game removes at its next start.
- No remainder. (`.runs/executor-2/` belongs to another executor and is not mine.)

## Unread material

- `foundations/decisions.md`: D-317 and D-322 read in their statements only, not their *Verification*, *Rationale* and *Rejected*; D-57 and D-125 are cited in the rule's *Decision* line and were not read as entries (I read them through the sentences of D-337, D-178 and the task); D-396, D-418, D-419, D-407, D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-43, D-44, D-45, D-04, D-47 (partly, through the neighbours) read whole except D-47 not read.
- `foundations/decisions.md` D-47 and D-395: not read (cited by the code's comments and the styleguide, not by my *Read*; I did not cite D-395).
- `src/browser/run-screen.css`: lines 590–989 read; the rest not. `src/browser/styles.css`: lines 299–651 read; the rest not. `src/browser/tokens.css`: only the lines the search returned (the long lines of the five roles' values were "omitted" by the tool; I took their values from the report of slice 1).
- `.runs/task-cycles/paski-parametrow/plan.md`: not opened (the handoff carries the slice's section). `task.md` read whole.
- Reports: 3 and 4 only in part; 5–8 in the sections on departures, choices and concerns.
- `.the-way/task-cycle/change/walkthrough.md`: not read (no behaviour changed).

## Searches not found or unclear

- none that stayed unfound. Unclear: the plan's wording "the zone border … numbers of the look (30, 35, 39, 41)" and slice 5's tying of 35 to the game's data — I followed the code (the rule says the border is the game's threshold).
- The *Read* range of `foundations/decisions.md` in the plan is stale (the handoff's current ranges held; used those).
