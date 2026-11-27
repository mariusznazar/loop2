done with concerns

# Report — correction-1b (the human's remarks 1 and 4), task `wyposazenie-postaci`

Worktree `the task's worktree`, branch `task/wyposazenie-postaci`, head `18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6` at start and at the end.

Status `done with concerns`: both remarks are answered; **no file of the repository was changed and no commit was made**, because the walk found no fault in the task's scope and the three layout shifts are no defect (they stand the same on the base and are drawn on purpose). Two things are left as questions for the human (see "Questions and observations").

## Commits

None. `git status --short` was empty at the start and at the end; the head is the head of the first part (`18ad4c8e`).

Outside loop2: the screenshots lie in the public repository `mariusznazar/screenshots`, branch `loop2/wyposazenie-postaci`, commit `8989a93b761a5504e615f952f697dcde3f41694c` (parent `1fe6bc1`, the slice 23 commit), directory `loop2/wyposazenie-postaci/correction-1b/`. I looked at each picture before the push: only the made-up account name „Agent” stands in them, no e-mail, password or token.

## Checks (focused, not the gate; each command with its exit code, written to a file and read)

| Check | Command | Exit |
|---|---|---|
| ESLint, as `test_eslint_source_rules` runs it | `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/correction-1b/eslint-suppressions.json .` (suppressions file holds `{}`) | 0 |
| Typecheck | `npm run typecheck` | 0 |
| Size rules (D-425) | `node tests/quality/eslint-size-rules.mjs` | 0 (`0 functions and files over a threshold in 382 files`) |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| Instruction check | `python -B .the-way/instruction-files/check_instructions.py` | 0 (`0 error, 0 warn, 113 info`) |

Not run, with the reason: Prettier's check and the focused tests of "files I touch" — I touched no tracked file, so there is no file to check; `npm test` (the gate) — not mine. All five checks above ran on the unchanged head, so they say the tree the human reads is as the first part left it; they are no check of a change of this part.

## Remark 1 — the walk in a running game

How: the game from the worktree (`npm run local`, `https://127.0.0.1:65266` for the walk, `61699` for the head measurement), Chromium through Playwright CLI 0.1.22 on Windows 11, a made-up account at `example.test`. Computer layout: 1280 × 720, mouse. Phone layout: `.playwright/cli.phone.config.json` (360 × 740, touch; read back `width 360, height 740, touch 1`), taps by `page.tap`, the measurement of the skill (`phone-measure.js`). States composed by script with the game's own functions (`reports/correction-1b-walk/compose.mjs`; `loadSavedGame` accepted each document) and sent by the ordinary save request. A character „Agent” with every action, condition and item (the bandage too) in the Understanding, the maps `forestEdge` and `forest` solved, a map run of `forestDeep`, the program of the reference `forestDeepBest` with a group added or changed:

- `fightA` — group „Walka” = „Uderz — patyk”, „Kopnij”, the hand empty, a stick in the backpack, the run at minute 331 (wolf at 334; seed `realMs` 1, found with the game's `send` and `advanceMinutes`);
- `fightC` — the same with „Walka” = „Przeciwnik ma poniżej 99 pkt → Załóż — patyk”, „Uderz — patyk”, „Kopnij” (a rule of „Załóż” among the combat rules);
- `gear` — a first group „Wyposażenie” with 1.1 „Puste — Ręka główna → Załóż — patyk”, 1.2 „Puste — Kieszeń → Załóż — opatrunek”, 1.3 „Zawsze → Załóż — patyk”, 1.4 „Zawsze → Załóż — opatrunek”, the take list 5 sticks, 6 berries, 4 bandages, the run at minute 0 (no state patched after `send`, so the first activity is the one the game chose);
- `camp` — a character at the camp with a stick in the main hand, bandages in pockets 1 and 3, pocket 2 empty, a chest of 15 sticks, 15 berries, 6 bandages.

A first try of `already` and `full` states, made by patching the gear after `send`, showed „Teraz” reading „Zakłada patyk” beside a row „już założone: patyk”: that is a seam of my composing (the activity was chosen before I patched the hand), not a fault of the game; I dropped those states and made `gear`, where the refusals arise by play.

### Plan of cases, verdicts

| Case | By what | Verdict |
|---|---|---|
| a. „Teraz” reads „Zakłada patyk”, „Potem” „Załóż — Patyk”, „reguła 1.1 · zostało 1 z 1 min”, the row of 1.1 carries no reason | `gear` and `teraz` at minute 0, 1280 and 360; `innerText`, row colours by `getComputedStyle`, screenshots | right at both widths. After the minute „Wyposażenie: nic” became „patyk w ręku” and the backpack lost one stick (`15/15 → 14/15`, `patyk 8 → 7`) |
| b1. A rule „Załóż” among the combat rules, out of a fight (`fightC`, minute 331) | 1280 and 360; row text and colours, measurement | right: the row „2.1 Przeciwnik ma poniżej 99 pkt → Załóż — Patyk · 1 min” has no `rule-reason` part (no „tylko w walce”, no „trwa walka”, no amber); the rows „Uderz — patyk” and „Kopnij” beside it show „tylko w walce” in amber, as D-309 gives |
| b2. The same in the fight (minute 334) | 1280 and 360 | right: row 2.1 stands on the green `rule-winning` background and is the rule picked („Potem: Załóż — Patyk · reguła 2.1”); no reason beside it; the combat rules lose „tylko w walce” and read „tura”; the ordinary rule „Zjedz — jagoda” shows „trwa walka” in amber. The paragraph of the chronicle reads „Wilk gryzie: −7 · Mag zakłada patyk · …”; at the resolve the hand holds the stick (`9/15: patyk 6`) |
| c. The rule window of 1.2 | 1280 and 360, window open on the row; screenshots of the whole window, with the pick of „Czynność” open and with the pick of „Cel czynności” open | right: „Warunek: Puste”, „Cel warunku: Kieszeń”, „Czynność: Załóż — Opatrunek · 1 min” (no price), „Cel czynności: Opatrunek” with the cells „Patyk” and „Opatrunek”; in the pick of the action „Załóż” stands in „Żywność i walka”, with „1 min”. At 360 the cells are 48 px or more high |
| d1. Refusal „już założone: patyk” | `gear` at minute 5, row 1.3; colour read | right: shown on the row in amber `rgb(254,154,0)`, beside „1 min”; at 1280 and 360. It shows only on the row: „Teraz” and „Potem” name the rule that runs, and a refused rule is never that one |
| d2. Refusal „kieszenie pełne” | `gear` at minute 5, row 1.4 | right, as d1; it appeared only once the third pocket was filled (at minutes 1–4 row 1.4 had no reason) |
| e. „Puste — Kieszeń → Załóż — opatrunek” in the editor and as it runs | `gear`, minutes 1 to 5, 1280; minute 5, 360 | right: the line of gear read „Wyposażenie: nic” → „patyk w ręku” → „patyk w ręku, opatrunek pod ręką” → „patyk w ręku, 2 × opatrunek pod ręką” → „patyk w ręku, 3 × opatrunek pod ręką”; row 1.2 counted „Wykonano 3×” and stopped firing once no pocket was empty; the chronicle (after the reload) read „Zakłada opatrunek” at minutes 1, 2, 3. The backpack count fell `15 → 11` with each piece going to a pocket |
| f. The chronicle with the refill line (the first part, remark 2) | `fightA` at 1280 and 360, after the fight; the three filters read by `innerText` | right: newest first „339 Zjedz — jagoda”, **„339 Bierze patyk z plecaka do ręki”**, „334 Napada wilk … Wilk gryzie: −7 · Mag bierze patyk z plecaka do ręki · Mag uderza patykiem: wilk 18/24 · …”. Filter „Czynności”: the refill line and „Zjedz — jagoda”; filter „Walka”: the paragraph alone; filter „Wszystko”: all three. At 360 the paragraph wraps whole, no text cut |
| g. The pick of a pocket (the first part, remark 3) | `camp` at 1280 and 360; a tap on the empty pocket and on pocket 1; the accessibility tree read with `snapshot` | right: the heading reads „Kieszeń 2: nic” (pocket 2 empty, cell „6 × opatrunek”) and „Kieszeń 1: opatrunek” (cell and „Zdejmij”); the tiles are named in the tree `button "Ręka główna: patyk"`, `button "Kieszeń 1: opatrunek"`, `button "Kieszeń 3: opatrunek"`, and the empty pocket keeps its visible name `button "Kieszeń"`; the group of the pick has the label equal to the heading |
| h. The measurement of the phone layout in every phone state above | `phone-measure.js` | `scrollsToTheSide` false and `controlsSmallerThan48` empty in every state; the lists `contentWiderThanItsBox` and `outsideTheWindow` hold only the entries named under remark 4 |
| i. The console of both sessions | `playwright-cli console error` | 0 messages |
| j. Side observation | — | see "Questions and observations" |

What I did not check: Firefox, Edge, a real phone (the styleguide leaves them to a human); „Teraz” reading „Zakłada opatrunek” and the rule window of „Załóż” on `fightC` at 360 beyond what is listed (the same code paths as at 1280; „Zakłada patyk” at 360 was read); a „Załóż” turn in a fight chronicle line (none exists; see the observations); the state's reach by play (the states are composed, so they check that the game agrees with itself).

### Faults

None found in the task's scope, so nothing was corrected and no test was written (no fault to hold). The first part's work (the refill line, the names of the tiles, the numbered headings) shows no fault of the first part.

## Remark 4 — the three shifts of the layout

What I read, and how: with the page's own geometry in the same state on both builds — a character „Agent” of `compose-state.mjs` (run in the checkout, so each build writes its own document: version 10 on the base, 11 at the head), a map run of „Skraj lasu” entered through „Mapy”, the row, „Wejdź”, paused (a map run with the same program and no gear line on the base; the head has the gear row, which is the one difference of the states). `layout.js` (kept in `reports/correction-1b-walk/`) reads `innerWidth` and `documentElement.clientWidth`/`scrollWidth`; for `.world-area` its `clientWidth`, `scrollWidth`, `getBoundingClientRect()` and computed `width`, padding, `box-sizing`; the same for each child of the `.world-area`, for its parent `.screen-area.run-world`, and for the chain from `.scene img` up to `.world-area`. The base was a worktree of `f2263d0502395ea1a3113b558e5258c256589676` in `.runs/correction-1b/base/` (`.the-way` and `node_modules` as junctions, `npm run build`), run from itself with the head's start stopped first and its own start stopped before the head's second start.

Numbers (the files of both runs are in `reports/correction-1b-walk/measure-{base,head}-{1280,360}.json`):

| | base `f2263d05` | head `18ad4c8e` |
|---|---|---|
| page, 1280: `innerWidth` / root `clientWidth` / root `scrollWidth` | 1280 / 1280 / 1280 | 1280 / 1280 / 1280 |
| `.world-area`, 1280: `clientWidth` / `scrollWidth` | 672 / **676** | 672 / **676** |
| `.now-row`, `.next-row`, 1280: box | x 29, width 680 (the box 33..705 of the area is 672) | the same |
| page, 360: `innerWidth` / root `clientWidth` / root `scrollWidth` | 360 / 360 / 360 | 360 / 360 / 360 |
| `.world-area`, 360: `clientWidth` / `scrollWidth` | 318 / **330** | 318 / **330** |
| `.scene-place` / `.scene` / `img.scene-background`, 360 | x 9, 342 / x 12, 336 / 336 | the same |
| `.now-row`, `.next-row`, 360: box | x 17, width 326 | the same |
| the gear row `p.backpack-text` (head only) | — | 318 at 360, 672 at 1280, no overflow |
| the skill's measurement at 360 | `scrollsToTheSide` false; `div.world-area` content 330 > box 318; `div.scene-sheet` content 256 > box 64; one `img` spanning 156..412 | the same entries |

Answer: **the three shifts stand on the base with the same numbers, and they are no defect — the change did not cause them and nothing is to correct.** They are the width of boxes drawn on purpose, which the page's own measurement of `scrollWidth` against `clientWidth` reports as content wider than the world area:

- **4 px at 1280** — `src/browser/run-screen.css:561-565`: `.now-row, .next-row { padding-inline: var(--space-xs); margin-inline: calc(-1 * var(--space-xs)); }`. The rows „Teraz” and „Potem” are 8 px wider than the world area (padding of 4 px each side) and sit 4 px left of it; the right 4 px lie in the 16 px padding of the area's frame and make the area's `scrollWidth` 676. The comment above the rule (lines 555-561) says why: the padding gives the background under the pointer room round the text (D-336), the negative margin keeps the text where it is. Nothing is cut and nothing scrolls (the page `scrollWidth` equals `clientWidth`).
- **12 px at 360** — `src/browser/run-screen.css:975-979`: `@media (width < 1280px) { .scene-place { margin-inline: calc(-1 * var(--space-m)); } }`. The place of the scene takes the 12 px side padding of the area, so it is 342 px (x 9..351, inside the frame of the area, 8..352) and the world area's content 318 px scrolls to 330 on its right. The comment (lines 967-974) gives the reason in numbers.
- **the scene 336 px in a box of 318** — the same rule: the scene is the picture's own size, 336 × 152 (`.scene { flex: none }`), and D-349 fixes it: "in the phone layout the larger of the two that the place of the scene holds … so 336 × 152 px at a page area 360 px wide"; the place (342 px) holds it, 3 px to spare on each side. At 360 the picture is whole and in the frame (screenshots `teraz-360.png`, `fight-rule-zaloz-360.png`).
- The entries `div.scene-sheet` content 256 > box 64 and `img` 156..412 are the sprite sheets of the mage inside their boxes with `overflow: hidden`; in the gear state at minute 5 the mage's 64 px frame reaches 3 px beyond the scene (287..351 in a scene 12..348) and `.scene` clips it (`overflow: hidden`), the mage's figure (the comment of line 970 says it ends on column 319) standing whole in `gear-360-m5-worldarea.png`.

So of the three answers of the remark the result is none of the three corrections: nothing was caused by this change (i), no CSS to fix (ii), and no larger fix (iii) — the numbers are the intended geometry. A future check that reads `scrollWidth` of `.world-area` as a fault will find these entries each time; the human may want the measurement script of `loop2-play` to say so, which is an edit of a skill and not mine to make here.

## Screenshots (public repository `mariusznazar/screenshots`, commit `8989a93b761a5504e615f952f697dcde3f41694c`)

Every link is to the file in that commit, as D-418 gives.

- ![„Teraz”: „Zakłada patyk”, „Potem”: „Załóż — Patyk”, 1280 px, minute 0, the rule 1.1 in the list](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/teraz-1280.png?raw=true)
- ![„Teraz”: „Zakłada patyk”, 360 px with touch](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/teraz-360.png?raw=true)
- ![A fight at 1280 px: the rule „Załóż” among the combat rules is the green current rule, no reason beside it, „1 min”; the other combat rules read „tura”](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/fight-rule-zaloz-1280.png?raw=true)
- ![A fight at 360 px with touch: the same rule is the green current rule](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/fight-rule-zaloz-360.png?raw=true)
- ![The window of the rule „Puste — Kieszeń → Załóż — Opatrunek” with the pick of the action open, „Załóż” beside „1 min”, 1280 px](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/rule-window-1280.png?raw=true)
- ![The same window at 360 px with touch](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/rule-window-360.png?raw=true)
- ![The refusals on the rows of the group „Wyposażenie”: „już założone: patyk” and „kieszenie pełne” in amber, the line of gear „patyk w ręku, 3 × opatrunek pod ręką”, 1280 px](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/refusals-1280.png?raw=true)
- ![The same group at 360 px with touch](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/refusals-360.png?raw=true)
- ![„Puste — Kieszeń → Załóż — Opatrunek” as it runs: the third pocket being filled, the line of gear „patyk w ręku, 2 × opatrunek pod ręką”, 1280 px](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/pockets-running-1280.png?raw=true)
- ![The map-run screen at 360 px with touch, the line of gear „patyk w ręku, 3 × opatrunek pod ręką” under the backpack line](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/pockets-gear-line-360.png?raw=true)
- ![The chronicle after a fight in which a strike took the stick into the empty hand: the line „Bierze patyk z plecaka do ręki” after the paragraph, 1280 px](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/chronicle-refill-1280.png?raw=true)
- ![The same chronicle at 360 px with touch](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/chronicle-refill-360.png?raw=true)
- ![The screen Postać, the pick of the empty pocket headed „Kieszeń 2: nic”, 1280 px](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/pick-pocket-1280.png?raw=true)
- ![The same pick at 360 px with touch](https://github.com/mariusznazar/screenshots/blob/8989a93b761a5504e615f952f697dcde3f41694c/loop2/wyposazenie-postaci/correction-1b/pick-pocket-360.png?raw=true)

## Questions and observations (not faults of this task)

1. **A question, not a fault: the time beside „Załóż” in the turn of a fight.** In the fight (`fightC`, minute 334) the row of the rule „Załóż — Patyk” reads „1 min” while the rows of „Uderz — patyk” and „Kopnij” beside it read „tura”; in the foundation D-140 says „Załóż” takes one turn in combat and one minute out of it (decisions.md lines 6906 and 6934), and I found no entry that says what the row's time label shows for it in a fight. The paragraph and the simulation do take one turn. I cannot judge from the page whether „1 min” in a fight is wanted or misleading; I recommend the human decide, and if it is to read „tura” in a fight it is a change of the row's label and of its test in the program editor, not a few lines of CSS. Cost of leaving it: a player in a fight reads „1 min” on a rule that takes a turn; today no text or test says otherwise.
2. **The in-combat „Załóż” has no line of its own in the chronicle** (only „Mag zakłada patyk” inside the paragraph), as the first part's report already named; the walk confirms it (`fightC` chronicle: the paragraph has „Mag zakłada patyk”, no line among the actions). Outside combat the chronicle writes „Zakłada opatrunek”. Not in the remarks; named for the human.
3. At the minute the encounter resolves (339) „Teraz” still reads „Walczy z wilkiem” with „Potem: Zjedz — jagoda”, and the next minute it reads the new action; the same sight was in `executor-23`'s poll. An old screen and not this task's; no fault claimed.
4. The seams of composing: a state patched after `send` shows an action chosen before the patch (see "How"). Not a fault of the game.

## Choices, with the way rejected and its cost if wrong

1. **Remark 4 answered by description, with no change of CSS.** Rejected: removing the negative margins or clipping the area (a "fix" of a number that the skill's measurement lists), which would take away the background room of „Teraz”/„Potem” (D-336) and the 3 px of room of the scene's place (D-349, D-396) and change every map-run screen. Cost if wrong: the human wants the measurement quiet and not the intent kept — then a change of the two rules above and of the styleguide's sentence about the place of the scene, with both layouts checked again.
2. **States of the walk made by play (`gear`) and not by patching a run.** Rejected: patched states (they show a stale action). Cost: a state that is more contrived in its program (four rules of „Załóż” in one group), named above.
3. **The measurement of the base with a character at the camp and a run of „Skraj lasu” (`compose-state.mjs`) rather than a run of „Las — głębiej”.** The same state had to stand on both builds, and the base has no gear fields; the numbers do not depend on the map. Cost if wrong: a state with a wolf or a creature at the right edge could draw a different overflow inside the scene; the gear state at minute 5 at the head showed the mage's frame 3 px beyond the scene, clipped, with no sight of it (read above).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-418 and D-419 (named, read whole), D-309 whole, D-458 whole, D-349's first paragraph (the sentence of the phone size), and by search lines 6902-6940, 7011 (D-140 and the encounter entry) for the time of „Załóż”; `src/browser/run-screen.css` lines 530-640 and 925-1010 and `src/browser/styles.css` lines 260-297 for the cause of the shifts; `src/browser/sim/program.ts` 300-500 and `src/browser/sim/data/gear.ts` 1-200 for the words and the rule of the refusals and the data of the places; `scripts/local-start.mjs` head. Reason: the walk and the shifts needed the cause and the words.
- `the user's rule file on scripts` and `.ai/rules/git.md` (read when the hooks gave them; no commit was made in loop2, one in the screenshots repository, in the style of its log).

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: **not read**, since no file was edited and no fault turned up; the handoff names them "before you edit".
- `docs/task-cycles/wyposazenie-postaci/cycle.md`, other agents' handoffs and findings: not read (not named). `reports/correction-1-remarks.md`: not read; I took the remarks 1 and 4 from the handoff, word for word.
- Read whole: `.the-way/task-cycle/change/SKILL.md`, `ui_check.md`, `walkthrough.md`, `.claude/skills/loop2-play/SKILL.md`, the reports `correction-1a-report.md`, `executor-23-report.md`, `executor-20-report.md`, `executor-15-report.md`, the scripts of `executor-23-walk/` (compose, send, until, poll, rowinfo; `poll-A.txt` its first lines).

## Searches not found or unclear

- What the row of a rule shows for the time of „Załóż” in a fight: no entry found (question 1).
- The handoff says „Teraz” of the walk reads „Zakłada patyk” "at both widths" for item (a); done. The handoff's wording "(`1 min` or the turn)" does not say which of the two a row of „Załóż” shows in a fight; I read it as the question above.
- Otherwise none.

## Own-work check

The requirement most likely not met: the human's reason "to pierwsze, co gracz zobaczy na telefonie" — a text cut or a control under the touch size at 360 px in a state of the task. The check: the measurement of the skill after each phone state (the states a, b1, b2, c, d, e, f, g), `controlsSmallerThan48` empty in each and `scrollsToTheSide` false in each, and a look at each screenshot for a text crossing a border (none: the lines of gear, the refusals, the chronicle paragraph and the window all wrap inside their frames). Second: that the refusal words in the screen are those of the game's check (`equipRefusal`, `program.ts:358-367`): read „już założone: patyk” and „kieszenie pełne” on the screen, with the amber the foundation gives to a reason.

## Working copies

All stood under `.runs/` of the worktree and were removed by their full paths: the base worktree `.runs/correction-1b/base` (the junctions `.the-way` and `node_modules` taken off with `rmdir` first, so the worktree's own `.the-way` and `node_modules` were not touched; then `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer names it), the clone of the screenshots repository `…/.runs/correction-1b/screenshots`, the composed states, the scripts, the screenshots and the logs of `…/.runs/correction-1b/` (removed with the directory), and `…/.playwright-cli/`. The browser sessions were closed and `npm run local:stop` ran after each start (the last answered `Local starts stopped: 1`). Kept beside this report in `reports/correction-1b-walk/`: `compose.mjs` (run from the repository's root after `npm run build` as `node <path>/compose.mjs <teraz|fightA|fightB|fightC|gear|camp> [searchFrom]`, it reads `programs/forestDeepBest.json` written by `npm run --silent balance -- programs --out .runs/correction-1b/programs`), `layout.js` and `show.mjs` (the geometry reading and its printer), `read.js`, `scene-over.js`, `send.sh`, `resume-until.sh`, and the four measurement files. The database of the starts under `.runs/local-start/` stays for the next start to remove, as the skill says.
