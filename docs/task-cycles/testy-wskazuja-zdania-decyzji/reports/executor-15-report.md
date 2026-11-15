# Report — executor of slice 15 (build and design-system decisions of the browser view)

**Status:** done with concerns

## Commits

Base `20cb341c348b04b11f97e00e35bfb53cb21ca330`, branch `task/testy-wskazuja-zdania-decyzji`, author address `mariusznn@gmail.com` (the same as the earlier commits; checked with `git log -3 --format='%h %ae %s'`).

- `9136e43b` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the browser view's and the game's language, the icons and their credits, the signal and neutral roles, the roles of the grid, icons drawn as masks, the shared controls, the kitchen-sink command, the fonts and the token names with lines decision:
- `40c66260` docs: :memo: name the tests of D-03, D-04, D-27, D-39, D-40, D-41, D-43, D-44, D-45, D-46 and D-48, add a pair to D-03 and rewrite the pair of D-04, D-27, D-39, D-40, D-41, D-43, D-44, D-45, D-46, D-47 and D-48 only for the part no invariant and no test holds

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `foundations/decisions.md` | 46 | 39 |
| `tests/invariants/test_application_build_kitchen_sink.py` | 1 | 0 |
| `tests/invariants/test_browser_view_framework.py` | 2 | 0 |
| `tests/invariants/test_design_token_contrast.py` | 1 | 0 |
| `tests/invariants/test_icon_credits.py` | 1 | 0 |
| `tests/view/account-screen.test.mjs` | 21 | 0 |
| `tests/view/discovery-band.test.mjs` | 1 | 0 |
| `tests/view/end-question.test.mjs` | 1 | 0 |
| `tests/view/end-window.test.mjs` | 1 | 0 |
| `tests/view/headquarters-screen.test.mjs` | 4 | 0 |
| `tests/view/icons.test.mjs` | 4 | 0 |
| `tests/view/maps-screen.test.mjs` | 2 | 0 |
| `tests/view/menu-bar.test.mjs` | 1 | 0 |
| `tests/view/previous-save.test.mjs` | 1 | 0 |
| `tests/view/program-list.test.mjs` | 3 | 0 |
| `tests/view/program-panel.test.mjs` | 1 | 0 |
| `tests/view/react-controls.test.mjs` | 1 | 0 |
| `tests/view/rule-editor.test.mjs` | 2 | 0 |
| `tests/view/run-header.test.mjs` | 6 | 0 |
| `tests/view/scene.test.mjs` | 3 | 0 |
| `tests/view/terrain-picture.test.mjs` | 2 | 0 |
| `tests/view/trip-plan.test.mjs` | 2 | 0 |
| `tests/view/world-area.test.mjs` | 8 | 0 |

No test's code, name or assertion changed; every test change is one or more comment lines `decision:` as the first lines of the case's body (after its `invariant:` lines in Python, after the `decision:` lines already standing in JavaScript), the form the files of earlier slices use. No mention of a decision number was removed. In the log only *Verification* fields of D-03, D-04, D-27, D-39, D-40, D-41, D-43, D-44, D-45, D-46, D-47 and D-48 changed; D-42 is untouched.

### Files beyond the slice's *Change* (item 5), one line each

- `tests/invariants/test_application_build_kitchen_sink.py` (part build-tools; its guidelines are `guidelines/coding.md` and `guidelines/testing.md`, read) — D-45.
- `tests/view/account-screen.test.mjs` (browser-view) — D-27, D-44.
- `tests/view/discovery-band.test.mjs` (browser-view) — D-44.
- `tests/view/end-question.test.mjs` (browser-view) — D-44.
- `tests/view/end-window.test.mjs` (browser-view) — D-44.
- `tests/view/headquarters-screen.test.mjs` (browser-view) — D-27, D-39, D-44.
- `tests/view/maps-screen.test.mjs` (browser-view) — D-43, D-44.
- `tests/view/menu-bar.test.mjs` (browser-view) — D-44.
- `tests/view/previous-save.test.mjs` (browser-view) — D-44.
- `tests/view/program-list.test.mjs` (browser-view) — D-44.
- `tests/view/program-panel.test.mjs` (browser-view) — D-44.
- `tests/view/react-controls.test.mjs` (browser-view) — D-44.
- `tests/view/rule-editor.test.mjs` (browser-view) — D-43, D-44.
- `tests/view/run-header.test.mjs` (browser-view) — D-39, D-40, D-44, D-46.
- `tests/view/scene.test.mjs` (browser-view) — D-40, D-43.
- `tests/view/terrain-picture.test.mjs` (browser-view) — D-41.
- `tests/view/trip-plan.test.mjs` (browser-view) — D-43, D-44.
- `tests/view/world-area.test.mjs` (browser-view) — D-40, D-41, D-43.

Files of the *Change* that got no line, with the reason: `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_focus_outline.py` (every case tests its invariant, which states all the case checks of D-43, D-42 and D-47 — R1); `tests/invariants/test_design_token_sources.py` (its invariant derives from D-38; it holds no sentence of the slice's decisions — it reads that declarations of `:root` are custom properties with a `Source:` comment, not their names or the fonts' files).

## Checks run

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any change) | 0, `0 errors`, none of the slice's decisions listed |
| `python -B .the-way/elements/common/foundation_check.py` (final) | 0, `0 errors`; 11 decisions `held by nothing`, none of D-03, D-04, D-27, D-39 … D-48 among them |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (Ran 4, OK) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (Ran 3, OK) |
| `npm test -- tests/invariants/test_design_token_contrast.py` | 0 (Ran 3, OK) |
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 (Ran 2, OK) |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 (Ran 3, OK) |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 (Ran 9, OK) |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 (Ran 3, OK) |
| `npm test -- tests/view/icons.test.mjs` | 0 (32 pass, 0 fail) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (131 / 0) |
| `npm test -- tests/view/discovery-band.test.mjs` | 0 (10 / 0) |
| `npm test -- tests/view/end-question.test.mjs` | 0 (17 / 0) |
| `npm test -- tests/view/end-window.test.mjs` | 0 (14 / 0) |
| `npm test -- tests/view/headquarters-screen.test.mjs` | 0 (26 / 0) |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 (21 / 0) |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 (29 / 0) |
| `npm test -- tests/view/previous-save.test.mjs` | 0 (44 / 0) |
| `npm test -- tests/view/program-list.test.mjs` | 0 (23 / 0) |
| `npm test -- tests/view/program-panel.test.mjs` | 0 (53 / 0) |
| `npm test -- tests/view/react-controls.test.mjs` | 0 (56 / 0) |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 (75 / 0) |
| `npm test -- tests/view/run-header.test.mjs` | 0 (24 / 0) |
| `npm test -- tests/view/scene.test.mjs` | 0 (71 / 0) |
| `npm test -- tests/view/terrain-picture.test.mjs` | 0 (16 / 0) |
| `npm test -- tests/view/trip-plan.test.mjs` | 0 (11 / 0) |
| `npm test -- tests/view/world-area.test.mjs` | 0 (22 / 0) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the 18 changed `.mjs` files (one run for 17, one for `react-controls.test.mjs`) | 0, 0 |
| `git diff -U0 20cb341c348b04b11f97e00e35bfb53cb21ca330 -- foundations/decisions.md`, read: 13 hunks, every `+`/`-` line a `- **Verification:**` line or an indented line of it, in D-03, D-04, D-27, D-39, D-40, D-41, D-43, D-44, D-45, D-46, D-47, D-48 | (read; 0 lines outside) |

The per-file runs are also kept in `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-15-test-results.txt` (each run's command, exit code and seconds). No run was still going when I returned. Not run: the full gate `npm test` without a file (the cycle's run, as the method gives); `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run by me (they fail at the base with `FileNotFoundError`, per the handoff; the slice touches nothing they read).

The foundation check validates every quotation of a line `decision:` against the decision's binding sentences (`.the-way/elements/common/foundation_check.py`, docstring lines 70–76), so its `0 errors` holds every one of the 69 lines' quotations. The quotations were also built by a script from the binding sentences themselves (prefix from a sentence start, no `"`), not typed by hand.

## Own-work check

- **Requirement most likely not met:** "every test that holds one of its binding sentences carries a line `decision:`" — a case left without its line.
- **Check:** a script read every case of every `tests/**/*.test.mjs` and listed each case that holds a pattern of the slice's held parts (`destructive`, `"button positive"`, the waiting texts „Logowanie…”, „Zakładanie konta…”, „Ustawianie…”, „Wciąganie…”, "no picture"/`img` null, `step-target`/`stepTarget`/`link-highlight`/`var(--depleted)`, `font-family-mono`, „Autorzy grafiki”) and carries no line of the matching decision.
- **What it showed:** 12 cases. One I had missed and then marked: `tests/view/react-controls.test.mjs:450` „a waiting submit button is the same element in both forms” (it asserts the waiting shared button `disabled`) — D-44. The other 11 I judged and left: `account-screen.test.mjs:5309` and `:5866` (the waiting text only as a precondition of D-156/D-260 and of `dispose()`); `program-list.test.mjs:415` (the destructive „Tak, zacznij od zera”, which D-44 does not name; D-402's); `react-controls.test.mjs:230`, `:246`, `:270`, `:501`, `:527` (the shared controls' own two forms, D-265; D-44 binds which screen button takes which control, and `:527` checks no click, which a button that is not disabled could also give); `headquarters-screen.test.mjs:649`, `scene.test.mjs:390`, `world-area.test.mjs:887` (the camp, the scene and the drawing are pictures with no control — D-272, D-19, not the mask of D-43 or a role of D-41).

## Table of the decisions (item 6)

Line numbers are those of the case's opening line after the commits.

| Decision | Held by tests (whole / in part), `path:line` — case | Held by invariants | Held by nothing | *Verification* |
|---|---|---|---|---|
| D-03 | In part, "built in TypeScript": `tests/invariants/test_browser_view_framework.py:207` — `test_browser_source_holds_typescript_and_no_other_code` | browser-view-framework: React and no other UI framework in code or runtime dependencies | "its screens written as `.tsx` components that draw from the game state" | pair added |
| D-04 | In part, sentence 1 "written in TypeScript": `tests/invariants/test_browser_view_framework.py:207` — same case | simulation-isolation and simulation-inputs: sentence 2 in part (no page, timer or system time in the simulation; no value passed changed) | "runs in the browser"; the shape of the functions that pass game time (a game state and a span of minutes in, the next state and its events out); sentence 3 whole (what the browser view draws from, and that it changes the game state only through the simulation) | pair rewritten (language part and the system-time example dropped) |
| D-27 | In part, sentence 1 "SVG files from game-icons.net, kept in `assets/icons/`": `tests/view/icons.test.mjs:265` — each icon the data names, the campfire's included, exists as a file; `tests/view/icons.test.mjs:272` — each action of the data names an icon and its title, and the icon file exists; `tests/view/icons.test.mjs:284` — each icon file has a credit with an author and the source commit (game-icons.net page). In part, sentence 3 "folded … stands on the login card and at the bottom of Siedziba, as its last part": `tests/view/icons.test.mjs:297` — the section is a folded details whose summary reads Autorzy grafiki; `tests/invariants/test_icon_credits.py:294` — `test_credits_section_credits_each_icon_file` (asserts not `open`); `tests/view/account-screen.test.mjs:5765` — the folded credits stand last in all four states…; `tests/view/account-screen.test.mjs:5469` — the card opens on „Zaloguj się” … and the folded credits, in that order; `tests/view/account-screen.test.mjs:5132` — the card stands alone in the page's body … (one `details` over the game); `tests/view/headquarters-screen.test.mjs:144` — the folded section „Autorzy grafiki” stands last on the screen… | icon-file-content: sentence 2 whole; icon-credits: the credit's content in sentence 3; loop2-container-icons: the copy into the served directory at the build | that the source files stand outside the served directory and reach it only through the build; that the game draws no icon from an emoji or another site | pair rewritten |
| D-39 | Whole, sentence 5 (bar of a met requirement in the header; its 3:1 by the invariant): `tests/view/run-header.test.mjs:534` — a requirement not met has its fill in text … a met one its fill, name and numbers in positive; in part `tests/view/run-header.test.mjs:585` — after a completion the bar stands, met… (class `positive`). In part, sentence 6 (Odbierz in `positive`, by its class): `tests/view/headquarters-screen.test.mjs:437` — practice waiting at a loop reads in its line with „Odbierz” in `positive`… | design-token-contrast: sentence 2 (each signal role 4.5:1 on the five backgrounds), the 3:1 of sentences 4 and 7 | sentence 1 (the five meanings — see Concern 1); sentence 3 (state bar of a rule and a group); sentence 4 (the fill of the bar over the mage's head; `warning` in no progress bar); sentence 6 under the pointer; sentence 7 (the frame of a discovery's plaque) | pair rewritten („Passa 480/480” items dropped, Odbierz under the pointer added) |
| D-40 | Whole, sentence 5: `tests/view/run-header.test.mjs:534` (same case). In part, sentence 4: `tests/view/world-area.test.mjs:768` — the icons of the drawing take the colour text-strong…; `tests/view/scene.test.mjs:908` — a gathering that ends … sends the icon of the resource flying, on a plaque (`text-strong`) | design-token-contrast: the threshold of every text role on the five backgrounds | sentences 1–3 (the meanings, and `text` as the text of each background — Concern 1); sentence 4's badge on `panel`, its track in `highlight`, its icon in `text-strong`, and the flying icon's plaque in `panel` | pair rewritten |
| D-41 | In part, sentence 1: `tests/view/terrain-picture.test.mjs:189` — the character tile has the character outline; `tests/view/terrain-picture.test.mjs:202` — the step target is outlined only while a move runs; `tests/view/world-area.test.mjs:839` — the character's tile and the step's target carry an outline each, the target apart by its class; `tests/view/world-area.test.mjs:793` — the drawing has a tile per tile … (revealed tiles with their icons, the hidden one none). In part, sentence 2: `tests/view/world-area.test.mjs:908` — a hovered tile marks its row …; `tests/view/world-area.test.mjs:768` — … the icon of a stock of 0 dimmed by depleted | design-token-contrast: `character` against both tiles, `tile-revealed` against `tile-hidden`, `focus` on the five backgrounds | the target told by shape (thin dashed line), never by colour; `link-highlight` as the colour of the marking line, the tile's own colour unchanged; `tile-edge`; `focus` meaning | pair rewritten (complies sharpened to the colour of the line; header phrase) |
| D-42 | none | design-token-contrast: sentences 2 and 3 (the thresholds); browser-view-focus-outline: 2.4.7 in part | sentence 1 apart from the thresholds and the focus rule: 2.3.1 and "no other requirement of WCAG" (see Concern 4 on `scene.test.mjs` „the cold layer blends by colour”) | unchanged |
| D-43 | In part, the mask clause of sentence 2: `tests/view/world-area.test.mjs:768`; `tests/view/world-area.test.mjs:793`; `tests/view/world-area.test.mjs:1104` — the table has a column per resource …; `tests/view/maps-screen.test.mjs:258` — the card of Las holds its heading …; `tests/view/rule-editor.test.mjs:228` — the action's icon stands in a mask …; `tests/view/trip-plan.test.mjs:86` — a folded line shows each position's item icon …; `tests/view/scene.test.mjs:218` — the badge over the mage holds the icon of the action as a mask …; `tests/view/scene.test.mjs:908` (mask and `text-strong`) | browser-view-token-values: the definition of a value written in place of a token, in the text of every file of the part | a colour a TypeScript module builds from numbers; the colour of an icon beside a text (and dimmed with its greyed cell); the badge icon's `text-strong` | pair rewritten |
| D-44 | In part, sentence 1: destructive buttons — `tests/view/run-header.test.mjs:178` „Restart” and „Zakończ” are destructive buttons …; `tests/view/end-window.test.mjs:548` the buttons stand after the scrolling part …; `tests/view/rule-editor.test.mjs:365` a row has „↑”, „↓” and the destructive „Usuń” …; `tests/view/program-list.test.mjs:104` Usuń is inactive while the list holds one program …; `tests/view/program-list.test.mjs:387` at rest the reset is an enabled destructive button …; `tests/view/trip-plan.test.mjs:392` Usuń is the destructive button of its position …; `tests/view/program-panel.test.mjs:1342` „Przełącz postać na ten program” stands beside another saved program only …; `tests/view/end-question.test.mjs:258` the question reads „Zapisać, odrzucić, wrócić?” …; `tests/view/headquarters-screen.test.mjs:280` a running loop shows its line with „Zatrzymaj” …; `tests/view/maps-screen.test.mjs:719` a character in an earning loop shows its line and „Zatrzymaj” …; `tests/view/account-screen.test.mjs:2695` a character in a loop shows its line and „Zatrzymaj” …; shared plain buttons — `tests/view/discovery-band.test.mjs:290` both buttons are the shared plain button (D-44); Odbierz — `tests/view/headquarters-screen.test.mjs:437`. In part, sentence 2: `tests/view/account-screen.test.mjs:567`, `:613`, `:802`, `:1218`, `:1548`, `:5932`, `:6001`, `:6123`, `:6243` (waiting text, fields and card locked; „Wyślij ponownie” at `:1218`); `tests/view/menu-bar.test.mjs:419` a send waits with the button disabled as Wysyłanie… ; `tests/view/program-list.test.mjs:176` while the pull waits the button reads „Wciąganie…” …; `tests/view/previous-save.test.mjs:1024` a confirmed reset … (control disabled while it waits); `tests/view/react-controls.test.mjs:450` a waiting submit button is the same element in both forms. In part, sentence 3: refusal as one sentence in the form — `tests/view/account-screen.test.mjs:567`, `:613`, `:906`, `:5932`, `:6047`, `:6190`; the answer to a reset-link request in that place as a status — `:870`, `:6156` | none | sentence 1: every other button, field and pick cell built from the shared controls; „Porzuć zmiany” destructive; neutral at rest and `danger` under the pointer and at focus; Odbierz's colour under the pointer; sentence 2: the text in `text-disabled`; sentence 3: below the form, in `warning`; the answer in `text`, its bar, never `positive`; the kitchen-sink page's states | pair rewritten |
| D-45 | In part, sentence 1 "built from `src/browser/kitchen-sink/` … by its own command": `tests/invariants/test_application_build_kitchen_sink.py:114` — `test_page_command_builds_the_page_with_its_marker` | application-build-kitchen-sink: nothing `npm run build` writes holds it; preview-server-access (review): served only on the developer's machine | sentence 2 whole (what the page shows, never a drawing from a game state) | pair rewritten |
| D-46 | In part, sentence 2: `tests/view/run-header.test.mjs:411` — the clock stands in the mono face of the stylesheet …; `tests/view/run-header.test.mjs:599` — the words of the bar of the solving condition are not in the mono face … | font-file-provenance (review): the files come only from a release of github.com/vercel/geist-font | sentence 1's place outside the served directory and the copy at build; loading fonts only from those files; the chronicle in Geist Mono; every other text in Geist beyond the one bar | pair rewritten |
| D-47 | none | browser-view-focus-outline: sentence 2 for stylesheets | sentence 1 ("the code marks none"); an outline set or turned off from TypeScript or in a way the stylesheet reading does not see (`all: unset`); a link's focus in a real browser | pair rewritten (`outline: none` and the class with its own focus rule, which the invariant catches, dropped) |
| D-48 | In part: `tests/invariants/test_design_token_contrast.py:192` — `test_token_file_keeps_every_pair` (21 roles read from `--<role>`; a role named otherwise is "declared 0 times") | none | the other roles of the table (`divider`, `selected`, `condition-unmet`, `tile-edge`, `link-highlight`, `depleted`, `text-disabled`) and every other value of appearance named by its purpose | pair rewritten |

## Pairs added or rewritten (for the human to accept at the merge)

**D-03 — added**

```
- **Verification:** invariants: browser-view-framework. tests: the browser view's source held in TypeScript files alone, with no file of another code or template language. An agent compares a change with the part no invariant and no test holds:
  - complies: a new screen of the browser view written as a React component in a `.tsx` file, drawing what it shows from the game state it is given
  - violates: a new screen of the browser view written as a `.ts` module that builds its elements with `document.createElement`; a screen component that draws from a copy of the game state it keeps and changes by itself
```

**D-04 — rewritten** (only the header and the first item of each line changed; the rest of the pair stands as it was)

```
- **Verification:** invariants: simulation-isolation · simulation-inputs. tests: the browser's
  source, the simulation's included, held in TypeScript files alone. For whether the game runs in
  the browser, for the shape of the simulation's functions that pass game time and for how the
  browser view uses the game state, an agent compares the change with the part no invariant and no
  test holds:
  - complies: a game screen that the build compiles into the page the browser loads;
    the simulation's function that passes real time … [unchanged to the end]
  - violates: a screen of the game written as a Godot scene; a screen of the browser view that
    replaces … [unchanged to the end]
```

Dropped: complies "a game screen written as a TypeScript module that the build compiles for the browser"; violates "or a script of the game's own code that the browser loads, written directly in JavaScript instead of compiled from TypeScript" (the test holds it for the browser source) and "a simulation function that reads the system time or the page" (simulation-isolation holds it).

**D-27 — rewritten**

```
- **Verification:** invariants: icon-file-content · icon-credits · loop2-container-icons. tests:
  every icon the game's data names, the actions' and the campfires' included, standing as an SVG
  file in `assets/icons/` with a credit whose page is on game-icons.net; the section of credits a
  folded `details` whose summary reads „Autorzy grafiki”, standing as the last part of the login
  card in each of its states and as the last part of Siedziba, the game holding that one section.
  For where the icons' source files stand and where the game draws its icons from, an agent compares the
  change with the part no invariant and no test holds:
  - complies: a campfire icon taken from game-icons.net into `assets/icons/`, reaching the
    directory the server serves only through the build's copy
  - violates: an icon file placed straight in the directory the server serves; an icon drawn from
    an emoji, or loaded from another site while the game runs
```

**D-39 — rewritten**

```
- **Verification:** invariants: design-token-contrast. tests: the fill, the name and the numbers of a met requirement of the solving condition in the header in `positive`, on a track in `highlight`, through the real stylesheet, and a met requirement marked `positive` after a completion; „Odbierz” drawn as the button of the kind `positive`. An agent compares a change with the part no invariant and no test holds:
  - complies: the message under a number field holding a wrong value, written in `warning`; the text of the button „Zakończ” in `danger` under the pointer; the bar at a program rule that can start in `positive`, beside an action in `text-strong`; the fill of the progress bar over the mage's head in `positive` on a track in `highlight`, in a badge on `panel`; the text of „Odbierz” in `positive` under the pointer too; the plaque of a discovery in the scene on `panel` with its frame in `discovery`;
  - violates: the message of a wrong value in a field written in `danger`; `discovery` used for a message that the player changed the program; the bar at a program rule drawn in the colour of the text beside it; the progress bar over the mage's head filled in `warning`; the frame of a discovery's plaque in `text-strong` or `warning`, so that a discovery in the scene looks like an ordinary badge.
```

**D-40 — rewritten**

```
- **Verification:** invariants: design-token-contrast. tests: the icons of the drawing of the map and the icon flying to the mage in `text-strong`, through the real stylesheet; the bar of a requirement of the solving condition in the header with its track in `highlight` and, while the requirement is not met, its fill in `text`. An agent compares a change with the part no invariant and no test holds:
  - complies: the badge over the mage's head on `panel`, the track of its progress bar in `highlight` and its icon in `text-strong`; the plaque of the icon flying to the mage in `panel`; the date of a row written in `text-label`; the button chosen in a group framed in `selected` with its text in `text-strong`; the tab chosen in its group shown by a line in `selected` at its bottom, its text in `text-strong`; a button under the pointer on the background `highlight`, its frame and its text role unchanged; the row of the program rule that wins now on `rule-winning`; the bar of a program rule whose condition does not hold in `condition-unmet`;
  - violates: the text of a disabled button written in `text-secondary`; the button chosen in a group shown by the background `highlight` alone; the row of the rule that wins now on `highlight`; `condition-unmet` used for the line between two sections; the icon in the badge over the mage's head written in `text`.
```

**D-41 — rewritten**

```
- **Verification:** invariants: design-token-contrast. tests: an outline on the character's tile and, only while a move runs, an outline on the target of the move, told apart from the first; the revealed tiles holding the icons of what lies there and a tile not revealed none; a hovered tile and its row of the list marking each other, with a line around the tile; the icon of a stock of 0 dimmed by `depleted`, through the real stylesheet. An agent compares a change with the part no invariant and no test holds:
  - complies: the target of the current move drawn as a thin dashed line in `character`; the line around a hovered tile drawn in `link-highlight`, the tile's own colour unchanged;
  - violates: the target of the current move drawn in a colour of its own; a hovered tile filled with another colour.
```

**D-43 — rewritten**

```
- **Verification:** invariants: browser-view-token-values. tests: an icon of `assets/icons/` drawn as a mask of its file and no picture of it in the drawing of the map, the table of revealed tiles, the card of a map, the row of a rule, the trip plan, the badge over the mage's head and the plaque of the icon flying to the mage, the icons of the drawing of the map and the flying one in `text-strong` through the real stylesheet. For values the text of a file does not show and for the colour of an icon beside a text, an agent compares a change with the part no invariant and no test holds:
  - complies: the icon of „Zbierz” drawn as a mask in the colour of the text beside it, dimmed with its greyed cell; the icon of a resource in the card of a map in the colour of the text beside it; the icon of „Zbierz” in the badge over the mage's head in `text-strong`;
  - violates: a TypeScript module that builds a colour from numbers it computes and writes it into a style; the icon of a greyed pick cell keeping the colour of an active one.
```

**D-44 — rewritten**

```
- **Verification:** tests: „Zakończ”, „Restart”, „Usuń” of a program, of a rule and of a position of the trip plan, „Przełącz postać na ten program”, „Zatrzymaj”, „Zacznij od zera” and „Odrzuć” of the question drawn as the shared destructive button, and the two buttons of a discovery's band as the shared plain button; „Odbierz” drawn as the button of the kind `positive`; the button that sends each of the four forms reading its waiting text, with the form's fields and the card locked, „Wyślij ponownie” reading „Wysyłanie…”, the pull reading „Wciąganie…” disabled, and „Zacznij od zera” disabled while its reset waits, the shared button that sends a form disabled while it waits in both its forms; a refusal or a lost connection of a form shown as one sentence in that form, and the answer to a request for a password-reset link shown in the form as a status, not as that sentence. An agent compares a change with the part no test holds:
  - complies: the button „Wyślij” of a new screen made with the shared button; „Wróć do logowania” made with the shared secondary action; a condition of the rule panel made with the shared pick cell; „Zakończ”, „Restart” and „Zacznij od zera” neutral at rest and in `danger` under the pointer and at focus; a waiting control's text in `text-disabled`; the refusal of a form standing under the form in `warning`, and the answer to a request for a password-reset link standing there in `text` with a bar on its left in the same colour; the kitchen-sink page showing every form waiting and refused, and the form „Nie pamiętam hasła” with that answer;
  - violates: a module that creates and styles a `<button>` of its own; „Porzuć zmiany” made as a plain button; a destructive button in `danger` at rest; a cell of a pick drawn as a button of its own; the answer to a request for a password-reset link written in `warning`, as if it refused something, or in `positive`, as if the message had left; the text of „Odbierz” changing its colour under the pointer.
```

**D-45 — rewritten**

```
- **Verification:** invariants: application-build-kitchen-sink · preview-server-access. tests: the page's own command building the page from its sources into `dist/kitchen-sink/`. For what the page shows, an agent compares a change with the part no invariant and no test holds:
  - complies: the page showing the destructive button at rest, under the pointer, at focus and disabled while it waits, every role, and a sample of a revealed tile drawn with `tile-revealed`, from values made up on the page;
  - violates: the page drawing the game map from a game state put together by hand; a state of a shared control left off the page with no reason given.
```

**D-46 — rewritten**

```
- **Verification:** invariants: font-file-provenance. tests: the clock of the map run set in the mono face of the stylesheet, and the words of the bar of the solving condition beside it not. An agent compares a change with the part no invariant and no test holds:
  - complies: an `@font-face` rule whose `src` reads a file under `/fonts/` copied there from `assets/fonts/`; the chronicle set in Geist Mono;
  - violates: a stylesheet that loads a font from Google Fonts or another CDN; the headings of the panels set in Geist Mono.
```

**D-47 — rewritten**

```
- **Verification:** invariants: browser-view-focus-outline. An agent compares a change with the part no invariant holds:
  - complies: a link of the folded section of credits showing the outline of `focus` when the keyboard reaches it, with nothing added to it for its focus;
  - violates: a class or an attribute added to the controls to mark them as controls; an outline set or turned off from TypeScript; an outline turned off on a shared button by `all: unset`.
```

**D-48 — rewritten**

```
- **Verification:** tests: each role whose contrast the design tokens keep — the roles of the kind text but `text-disabled`, the five backgrounds, `control-border`, `focus`, `character`, `tile-revealed` and `tile-hidden` — read from the custom property of its own name. For the other roles and every other value of appearance, an agent compares a change with the part no test holds:
  - complies: `--divider` for the role `divider`; `--space-s` for a size of the spacing scale; `--font-size-label` for the size of labels;
  - violates: `--space-8` for the spacing of 8 px; `--grey-700` for the role `divider`.
```

## Concerns

1. **A test of one element's role, and the meaning sentences of D-39, D-40 and D-41 (a choice of judgment).** About 110 cases of `tests/view/` assert that a given element takes a role (a class `warning`, `danger`, `positive`, a `role:` field, a `var(--…)` through the stylesheet); the list from my scan is kept in `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/executor-15-role-scan.txt` (it also catches `character` as a word, so it over-counts). I gave a line of D-39/D-40/D-41 only where the test checks an instance that the decision's own sentences name (the header's bar, „Odbierz”, the icons in `text-strong`, the outlines of the character and its target, the revealed tiles, `link-highlight`, `depleted`). I gave none for the meaning sentences (D-39 sentence 1, D-40 sentences 1–3) from a test of another element's role, because that role is placed by the decision of that element (e.g. D-156, D-216, D-381 already marked on those cases), the test fails on changes that keep the meaning (a warning sentence moved to `text`), and in the two cases where D-39 alone is cited as the source (`tests/view/program-list.test.mjs:195`, `:455`) the list draws a role it is handed or checks `role="alert"`, not the colour. **Way rejected:** a line of D-39/D-40 sentence 1 on every such case, by the plan's test "it would fail if the code broke that sentence" for that element — tens of lines, each a long quotation prefix, telling the agent who compares a change little beyond the element's own decision. **Cost if wrong:** the meaning sentences stand with the pair only, and a later reviewer may ask for those lines; the fix is additive (lines plus a sentence in `tests:`).
2. **Destructive and colour parts held through classes.** The destructive-button cases assert the class `destructive` (and `positive` for „Odbierz”), not the colours, which `src/browser/styles.css` gives. I counted them as holding "are destructive buttons" and "the plain button with its text in `positive`" in part, and left "neutral until the pointer or the focus reaches them and then in `danger`" and the colour under the pointer to the pair. The quotation of D-44 sentence 1 has to run from its start, so these lines quote a prefix that names all eight controls and every button; the clause `tests:` says what they hold.
3. **Quotations longer than the part held.** Lines must quote a prefix from a sentence's start, so several quote more than their case holds (e.g. D-27 "…stands on the login card and at the bottom of Siedziba" on `tests/view/account-screen.test.mjs:5132`, D-41's whole first clause on `world-area.test.mjs:793`, D-46 "…the chronicle and the clock … in Geist Mono" on the clock case, D-43's whole second sentence on each mask case). The clause `tests:` of each decision names the held part in words, as the template asks.
4. **D-42 and the cold layer.** `tests/view/scene.test.mjs:2140` („the cold layer blends by colour, so it keeps the brightness of what it lies over”) checks D-317's guard against one whole-scene brightness change; a single change is no breach of 2.3.1 (three flashes in a second), so I gave it no line of D-42 and left D-42's field as it was.
5. **Scope beyond the slice's *Change*.** 17 files outside the *Change* got lines (listed above); the plan's *Change* named seven files, three of which hold no sentence of these decisions beyond their invariants. Each was run on its own, as item 5 gives.

## Remarks on the log's wording (R3 — nothing changed)

- **D-03**, "its screens written as `.tsx` components that draw from the game state": the code builds parts of the page with the DOM in `.ts` modules — `src/browser/view/app.ts` creates the page's `header`, `main` and the section of the session check with `document.createElement` (lines 172–186), and `src/browser/view/game-view.ts`, `email-confirmation.ts`, `headquarters-entry.ts` and `programs-entry.ts` create elements the same way. Whether the waiting screens and these wrappers count as "screens" under D-03 I did not settle; observed by reading, not run.
- **D-42**, sentence 3 "against the colours they touch": the invariant and its test hold `control-border` and `focus` against the five backgrounds only; the sentence says more than the check.
- **D-27**, sentence 1 "copied into that directory when the application is built" is held through the container (loop2-container-icons, a Docker test the gate may skip without a daemon); no test of `npm run build` alone reads `dist/public/icons/`.

## Reaches beyond the dispatch

- `src/browser/styles.css:1100-1120` — to learn how a rule's state bar takes its colour (classes `bar-go`, `bar-blocked`, `bar-unmet`), to judge `tests/view/rule-signs.test.mjs:103` (it checks the classes, not the colours; no line).
- `foundations/invariants.md:488-496` design-token-sources — the invariant of `tests/invariants/test_design_token_sources.py`, a file of my *Change*, which the *Read* did not name.
- The binding sentences of D-216, D-337, D-401 and D-402 (by an `awk` search for roles in backticks) — to see whether another decision places the role of the elements whose tests cite D-39 (Concern 1).
- `src/browser/view/app.ts` and four other view modules, grep for `document.createElement` — for the R3 remark on D-03.

## Working copies

- `.runs/executor-15/` in the worktree held my scripts (a scan of role assertions, a scan of cases by pattern, the insertion script, a listing script), their outputs and the logs of each test run. Removed with `rm -rf` before returning; nothing remains. Kept beside this report: `executor-15-role-scan.txt` (the scan of Concern 1) and `executor-15-test-results.txt` (each focused run's command and exit code).

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–499 (roles, the rules on roles, tokens, focus, contrast, shared controls, the kitchen-sink page, main button and lines at a text, the head of the menu-bar rule); lines 500–986 (rules of particular screens) not read.
- `foundations/glossary.md`: only its headings read (no term of it bears on the slice's sentences).
- `.the-way/elements/decisions/template.md`: read lines 105–264, which hold the three passages the *Read* names.
- `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md` (lines 1–190; the rest is external context and withdrawn identifiers), the task's passages, the decision skill's `SKILL.md`, every decision and invariant named: read whole.

## Searches not found or unclear

- A test of what the kitchen-sink page shows (D-44's last clause, D-45 sentence 2): none found (`grep kitchen-sink` over `tests/` finds only build and part-map tests).
- A test that the game's fonts are copied at build or loaded only from `/fonts/` (D-46 sentence 1 and the loading clause): none found (`grep Geist|/fonts/|font-family` over `tests/`).
- A test of the colours a destructive button takes at rest and under the pointer, of `text-disabled` on a waiting control, of a form's sentence below the form in `warning`, of the bar beside the reset-link answer: none found; tests check classes, roles `alert`/`status` and texts.
- A test of the frame of a discovery's plaque or of the fill of the progress bar over the mage's head by colour (D-39 sentences 4 and 7): none found (`scene.test.mjs` checks their positions, lengths and icons).
- A test that a field's wrong value is written in `warning` (D-39 sentence 1): the cases find `.input-field-message` and `aria-invalid`, not its colour.
