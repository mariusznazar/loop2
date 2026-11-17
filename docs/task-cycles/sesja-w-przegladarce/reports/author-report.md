# Report of the one author — task `sesja-w-przegladarce`

**Status:** `done with concerns` — point 7 changed and committed; points 1, 2, 3, 6 and 8 looked at in Chrome 1280 × 720; point 4 (Firefox) not run, the installed `playwright-cli` 0.1.22 wants another Firefox build than the one on the computer, and nothing was installed. Several states were reached on composed states, a few of them with a field set by hand (named in the table). Five observations go to the human as defects or questions (the fifth, D-299, added in the fix of the whole-change review) (section "Defects for the human").

Branch `task/sesja-w-przegladarce`, base `e5516b17`. Session in Chrome: 19:23–20:10 (computer's clock).

## Commits and files

- `8e9c01a0` fix: :lipstick: keep the select list within its row and cut a long program name with an ellipsis on Mapy and on the screen of a map run, and let the styleguide's exception for the select list say so
  - `src/browser/styles.css` +12 −0 — `.select-list { max-width: 100%; overflow: hidden; text-overflow: ellipsis; }` with its comment, beside the other rules of the shared controls (D-265, D-421: the look of a shared control stands only in `styles.css`).
  - `src/browser/maps-screen.css` +8 −0 — `.maps-who-program { max-width: 100%; }`: the row „Program:” in „Kto idzie” is an item of a column flexbox with `align-items: flex-start`, so without it the row took the select's own width and the select's `max-width: 100%` resolved against it.
  - `guidelines/styleguide-browser-view.md` +7 −4 — rule "A name typed by the player breaks in its row": the exception for the select list now says the list cuts the name, stands at most as wide as its row, ends the name of the picked position with an ellipsis, keeps the full name in the opened options, and that every select list of the game behaves so because its look stands in one place.
- `81502efc` docs: :memo: let the styleguide's exception for the select list say what it asks of a list and of its row, and drop from it the screens and lists the product has today (fix of the whole-change review, M1): the exception now says the list is no wider than its row, a row with a list no wider than its column (`max-width: 100%` in a flex column that does not stretch its items), and a longer picked name ends with „…”; it names no screen and no list of today.

No foundation entry was written (no decision, invariant or glossary term changes); no foundation step.

## Screenshots shown to the human (D-418, D-419)

Pushed to `mariusznazar/screenshots`, branch `loop2/sesja-w-przegladarce`, commit `9ab9baa497fa2b4af18e899cf55d4085d87897d8`. Only the local test accounts `agent@example.test` and `gracz@example.test` stand in them.

| Name | What it shows | Link for the request |
|---|---|---|
| p7-mapy-200 | Mapy, 1280 × 720, program with a 200-letter name picked: list as wide as the character's column, name cut with „…”, page 1280 px wide | `![Mapy: lista „Program:” z nazwą 200 liter, ucięta wielokropkiem](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p7-mapy-200.png?raw=true)` |
| p7-run-200 | Screen of a map run, 1280 × 720, the same program picked on the panel's list „Program:”, cut with „…” | `![Ekran przejścia: lista „Program:” z nazwą 200 liter](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p7-run-200.png?raw=true)` |
| p2-las-solved-window | End-of-run window „Las rozwiązany”, reached by the program written in the game's editor | `![Okno końca: Las rozwiązany programem z edytora](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p2-las-solved-window.png?raw=true)` |
| p1-attack-now-next | Minute of an attack (paused): „Walczy z wilkiem”, „Potem · Kopnij · reguła 1.11”, ordinary rules amber with „trwa walka” | `![Napaść: Teraz i Potem w minucie walki](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p1-attack-now-next.png?raw=true)` |
| p1-end-window-two-lines | End-of-run window under the two-line row of warnings at 1280 × 720 | `![Okno końca pod dwuwierszowym ostrzeżeniem](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p1-end-window-two-lines.png?raw=true)` |
| p1-die-combat-scene | After a death in combat: the wolf stands still beside the fallen mage and covers the burning campfire | `![Śmierć w walce: wilk stoi nad ogniskiem](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p1-die-combat-scene.png?raw=true)` |
| p8-logout | „Wyloguj” with a broken save client: both sentences under the menu bar, the menu open, still signed in | `![Wylogowanie z zepsutym zapisem](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p8-logout.png?raw=true)` |
| p6-card-down | Login card taken down by React: the sentence of D-323 alone in the card's place | `![Karta logowania zdjęta przez React](https://github.com/mariusznazar/screenshots/blob/9ab9baa497fa2b4af18e899cf55d4085d87897d8/loop2/sesja-w-przegladarce/p6-card-down.png?raw=true)` |

Other screenshots and frames were looked at and not kept (D-418: only shown ones are pushed).

## How the states were reached

- Local start `npm run local` (D-255), one account made through the login card. Chrome is Playwright's headless Chromium (`HeadlessChrome/157.0.0.0`), viewport set by `playwright-cli resize 1280 720` (page area 1280 × 720, `innerWidth`/`innerHeight` read back).
- Composed states, all built from the save the browser itself held after Las was solved by play (`compose-*` scripts, kept as `author-script-*.txt` beside this report):
  - `compose-known`: a new game whose Understanding holds what Skraj lasu shows, the campfire, lighting, the chill and the wolf (events fed to the simulation's `discover`), no rule; checked with `loadSavedGame`.
  - `compose-combat`: "Agent" sent to „Las — głębiej” with a program „Głębiej” built in the script, game minutes passed with `advanceMinutes` until the first attack (seed 1000: attack at minute 205), document written at minute 202. One variant (`state-fight`) sets the body's health to 100 and satiety to 90 by hand at minute 202 (field edit): with the composed program the mage had 16.7 health at the attack, too little to see a fight it survives. The variant without the edit (`state-die`) is the real 16.7.
  - `compose-solved-fight`: same map; between game minutes the body set back to full and the streak capped at 300 by hand (field edits), until two attacks were beaten by „Zawsze → Kopnij” and a third came after minute 545 (attack at 903); document written at minute 901 with the streak set to 535 by hand, so that 540 falls in minute 906, inside the attack's minutes 903–908. Every composed document passed `loadSavedGame` and the server answered `200`.
- After each load the map run came back paused at the saved minute (D-212) and was played on in the browser at 1× (or 4×/16× where named): the wolf's run, the fights, the deaths and the completion below are played, from those minutes.
- Program edits during play were made through the game's own editor (rule panel and „+ reguła”), driven by a `run-code` script that clicks the panel's cells (`author-script-write-program.js.txt`).

## Observations

Window 1280 × 720 in Chrome unless named. "Evidence" names a pushed screenshot (table above), a frame stream read and dropped (`frames`, described in words), a measurement by `eval`, or a file beside this report.

| Item | State and how reached | Result | What was seen | Evidence |
|---|---|---|---|---|
| loop2#65-1 „Teraz”/„Potem” in an attack | `state-fight` (composed, health edited), played at 1× from 202 into the attack at 205; then a combat rule added in the editor at 202 | matches | Through 205–209 „Teraz” reads „Walczy z wilkiem” with no icon, rule or minutes; with no combat rule „Potem” reads „żadna reguła nie pasuje — postać stanie” in orange (`warning`); with „Zawsze → Kopnij” added, „Potem · Kopnij · reguła 1.11”, the ordinary rules amber with „trwa walka” (D-309, D-334, D-335) | p1-attack-now-next; frames 202→206 |
| loop2#65-1 end of a solved map | Played: Skraj lasu solved at minute 769 and Las at minute 712, by a program written in the editor (point 2) | matches | Header „Minuta 712”, „Passa 480/480” in green, „Teraz” „Las rozwiązany” in `positive`, scene in full gold, window „Las rozwiązany” with „najdłuższa passa 480/480”, „Otwarte: Las — głębiej →”. The remark's „Minuta 480” is not reached: the streak starts after the first chill, so the end came later | p2-las-solved-window |
| loop2#65-1 red „marznie” by play | Played: „Restart” of a map run on „Las — głębiej” at 4× until the body fell under 35 °C (minute 34) | matches | „marznie” under the temperature, and the value „34,9 °C” itself, in `rgb(255,100,103)` = `--danger` `#ff6467` (D-337, rule `.body-value.danger`, `.body-note.danger`) | eval of the computed colour |
| loop2#66-1 attack paragraph in a fight the mage survived, console during play | `state-fight`, „Zawsze → Kopnij” added, played at 1× through 205–214 | matches | Chronicle at 205: „Napada wilk (24/24). Wilk: Zdrowie poniżej 8 pkt → Odskocz; Zawsze → Uderz.” before the turns; after 210 the same entry grows the turns and ends „… Mag kopie: wilk 0/24 · Wilk pokonany.”; mage at 58 health. `playwright-cli console` read at 202, 206 and 214: 0 messages | eval of the chronicle; console |
| loop2#79-1 end by a real program: death | Played, program written in the editor, Skraj lasu: „Mag zamarzł” at 243 (first try, no „Eksploruj”), Las at 369 | matches | Window „Mag zamarzł”, „Ostatnie minuty”, „Nie zadziałały ani razu”, page 1280 × 720 with no scroll | eval; screenshot looked at |
| loop2#79-1 end by a real program: solved map | Point 2 | matches | As loop2#65-1 above | p2-las-solved-window |
| loop2#79-1 window under a two-line warning | `state-die` (composed, no edit) played to the death in combat at 210 with every `PUT /api/saved-game` aborted by a route of the page (network failure), window opened by itself; then an error thrown from a timer of the page | matches | Row 1 „Coś w grze się zepsuło — odśwież stronę.” at y 40, row 2 „Nie udało się zapisać postępu. Gra spróbuje ponownie.” at y 66, window from y 133 to 709, its middle part scrolling (526 in 478 px), „Restart”/„Zakończ” at y 696, page 720 px high | p1-end-window-two-lines |
| loop2#79-23 window at 1280 × 720 with the row of warnings | Same state | matches | As above: the window fits under the bar and both rows, its buttons stay in sight | p1-end-window-two-lines |
| loop2#83-4 tint back after a lost streak | `state-solved-fight` (streak 535) resumed at 1×, a rule added in the editor at 902 | matches | The scene's tint goes from the warm beige-gold to the cool grey-green over about 1.4–2 s of frames (519 → 1919 ms after the edit), not at once; „Passa 0/540”, „Pokonane napaści 0/2” (D-131) | frames (213) |
| loop2#83-4 pause greys tint and frost together | Paused map runs at 35.1 °C (Skraj lasu) and 34.9 °C („Las — głębiej”) | matches | The whole scene, the frost at the edges and the badge over the head grey together | screenshots looked at |
| loop2#83-4 reduced motion | `playwright-cli set-reduced-motion reduce`, same state and edit | matches | `matchMedia('(prefers-reduced-motion: reduce)')` true; the tint jumps to cool between two frames (0 → 357 ms); in 3 s 7 frames only; the wolf stands beside the mage at once (no frame of a run) | frames (7) |
| loop2#86-1 wolf that leaves runs off right | `state-fight`, rules „Przeciwnik ma poniżej 8 → Odskocz”, „Zawsze → Kopnij” added; played 209→213 | matches | Paragraph ends „… Wilk odszedł.”; frames show the wolf turned right running past the bush and out of the right edge; on the frames' timestamps the run lasts about 300–360 ms (first moved frame 935–990 ms, gone after 1293 ms) — the screencast's timing cannot tell this from the 300 ms of D-317 | frames (170) |
| loop2#86-1 map solved in the middle of a fight | `state-solved-fight` (field edits named above), played 901→907 | matches | Attack at 903, wolf beside the mage; at 906 „Passa 540/540”, „Teraz” „Las — głębiej rozwiązany”, scene to full gold, specks rise; the wolf stands still where it stood; window paragraph „Napada wilk (24/24). …” with no outcome (D-147). „Potem” then reads „żadna reguła nie pasuje — postać stanie” in `warning` (see note 4 below) | frames (231) |
| loop2#86-1 extra: wolf beaten | `state-fight`, „Zawsze → Kopnij” | matches | At 210 the wolf falls in about 300 ms of frames (3843 → 4176 ms) and is gone; the campfire it covered shows again | frames (253) |
| loop2#86-1 extra: death in combat | `state-fight` with no combat rule, and `state-die` | matches, with a question | „Mag zginął w walce”; the wolf stands still beside the fallen mage; at the mage's place by the fire the wolf covers the burning campfire (see defect 3) | p1-die-combat-scene |
| Point 2 program | Played on Skraj lasu and Las, Understanding composed (`compose-known`), program written in the editor | matches | Program and times under "Point 2" below | p2-las-solved-window |
| scroll of loop2#79-22 | Played: „Wejdź” on Mapy, and „Wróć do przejścia · …” in the bar | bad: defect for the human | After entering the screen of a map run the page stands scrolled 40 px down (`scrollY` 40); what moves is the whole page: the menu bar (40.2 px high, `position: static`) goes out of sight above the window and the header of the run screen stands at the window's top edge. The focused element is the screen's `section.screen.run-screen`. Both ways in do it: the clicked control leaves the page (the „Wejdź” of a hidden screen, the bar item that the run screen does not show), so `focusIfLost` (`src/browser/view/screen-registry.ts:208`, moved there from the context's `game-view.ts:974`) calls `focus()` on the 820 px high section without `preventScroll`. Cause: the focus is verified, the scroll by focus is read from the browser's behaviour, not traced in its code | eval: scrollY, banner top −40, activeElement |
| D-03 restart of a CSS animation | Played at 1×: an ordinary run (minutes 943–961) and a fight (206–209) | matches | Over 6 and 4 readings no animation of the mage's sheets, the fire, the wolf's bite or the scuffle restarted (same element, same `startTime`; sampled every 100 ms) | eval (`getAnimations`) |
| D-03 drop line after a drag between groups | Programy: a second group added, rule 1.2 dragged by its handle onto the header of group 2 (Chromium HTML5 drag of Playwright) | matches | Groups 8/0 → 7/1 rules; no `.drop-line` element left in the page | eval |
| D-03 cursor in a number field the game clips | Rule panel „Sytość poniżej”, typed „9” and „1” after „60” | matches | The game does not clip while typing: the field keeps focus with „6091”; it clips at Enter to „100” and focus moves on to the action field (D-306). `selectionStart` of a number input is not readable (null), so the caret position itself was not measured | eval |
| D-254 drag catching a select list (now D-417) | Same drag as above | matches | The drag by the handle locator moved the rule; no select list stands in a rule row to catch it. D-254 is withdrawn, its question is answered by D-417, whose risk sentence this is | eval |
| D-278 card with unfolded credits | Login card, folded/unfolded credits, „Załóż konto”, the sentence of a blocked account | matches | Card top at 108 px = 15 % of 720 in every state; the tabs at 211.8 px in every state; unfolded credits make the page 1293–1308 px high and scroll, nothing above moves | eval |
| D-299 pick with every action | Programy, panel of rule 1.2, action pick with all 14 actions | bad: defect for the human (relabelled in the fix; see defect 5) | 14 cells in four groups, no field, no row „ostatnio”, no element of the pick scrolls by itself; the pick is 300 px high, from y 438 to 738: in a 720 px window its last row stands 18 px under the edge until the page scrolls | eval; screenshot looked at |
| D-323 sentence with no fault or blink | Point 8 runs and the card taken down | matches as far as seen | The sentence stood once in each place; its row, appearing, moves the content under the menu bar down by its height (26 px), as the row of a failed save does. Flicker was not measured: no tool for it (D-317's measurement is out of scope) | eval; p8-logout, p6-card-down |
| D-349 scene and program widths | Screen of a map run at 1280 × 720 and 1920 × 1080 | matches | Scene 672 × 304 in both; area of the program 526 px at 1280 and 622 px at 1920 (D-349's rationale counts 526 and 622); program panel 492 and 588 px | eval |
| D-317, D-347 | — | not viewed: out of scope | The task leaves them out: D-317's flicker needs a measuring tool not adopted, D-347's night in the card needs a night run the skill cannot make (task, *Questions to settle*, third; *Out of scope*) | — |
| Point 4 Firefox: scene with tint and frost; icon masks on the map; window at 1280 × 720; scroll at entry | `playwright-cli -s=ff open --browser firefox …` | not viewed: tool | `Error: Browser "firefox" is not installed; expected executable at …\ms-playwright\firefox-1553\firefox\firefox.exe. Run playwright-cli install-browser firefox to install` — the computer holds `firefox-1532`; nothing installed. Playwright MCP was not tried for Firefox: the plugin's browser is set in its own configuration, not per call | `author-firefox-open.txt` |
| Point 6 end window after a completed map | Played (Skraj lasu, Las) | matches | Title in green, streak bar, „Do skrzynki nic nie trafiło.”, sections, buttons; window 410 px, page not scrolled | p2-las-solved-window |
| Point 6 blocked account | Local `account-role owner agent@example.test`, second account `gracz@…` blocked from the owner's list, sign-in as it | matches | „To konto jest zablokowane.” under the form in `rgb(254,154,0)` (`warning`), card top 108 | screenshot looked at |
| Point 6 earning loop and its report | „Puść w pętlę” on Skraj lasu; page left 95 s and opened again | matches | Line „Pętla: Skraj lasu · przejście 1 · minuta 0 · domknięte 0” with „Zatrzymaj” on Mapy and Siedziba, „Pętla nic nie zarobi do skrzynki” in `warning`; after the return „Gdy cię nie było — Agent: 2 min — Zamknij” | screenshots looked at |
| Point 6 solved map | Mapy after play | matches | „Skraj lasu rozwiązana”, „Las rozwiązana” with „rozwiązana” in `rgb(0,188,125)` (`positive`), picked row with its bar; card „Las · rozwiązana · odsłania ją Skraj lasu” | eval |
| Point 6 failure panel of the login card | Second session, `Array.prototype.map` made to throw for the list of credits, then a press of the switch | matches | The card goes and „Coś w grze się zepsuło — odśwież stronę.” stands alone in `.account-card-failure`, top 108, in `warning`; console `uncaught kind=TypeError code=none place=view/account-card.createAccountCard` | p6-card-down |
| Point 6 hover and focus | Login card | matches | Main button and tab under the pointer: background `#27272a` (`highlight`), text and frame unchanged; focus from Tab: `:focus-visible`, 2 px solid `#f4f4f5`, offset 2 px | eval |
| Point 6 motion | Scene and picture band | matches | Mage, fire, wolf, scuffle, flying icon, dust run from CSS (frames above); the band's fire and chest in frames | frames |
| Point 6 list of accounts | Owner account | matches | „Panel właściciela”, each account with address, block, privilege, role and buttons; no „Zablokuj” at the owner; confirmation sentence with „Tak, zablokuj” and „Wróć” | screenshot looked at |
| Point 6 compared with the look before the split | Rules of `src/browser/*.css` in link order at `581d09bb^` (one sheet) and `a9a95479` (after the split, 13 sheets) | matches, compared as text (not viewed; see *Weak spots*) | Same 565 rules (selector × declarations × `@media`/`@keyframes` context), none only before, none only after; 33 places where neighbouring rules changed order; of the reversed pairs that set a same property, 14 share a class in their last compound, and none of them can meet one element (`.chronicle-text.positive` / `.button.positive`, `.away-report-line.danger` / `.body-value.danger`, `.scene-badge .icon-mask` / `.tile-list thead .icon-mask` and the like) | `author-css-split-compare.txt`, `author-script-css_compare.py.txt` |
| Point 7 name of 40 letters | Program „Abcdefghij”×4, Mapy and screen of a map run | matches | Before and after: page 1280 px, select 284 px beside its label, not cut | eval |
| Point 7 name of 200 letters | Program „Abcdefghij”×20 | bad: fixed (`8e9c01a0`) | Before: page 1661 px wide on Mapy (select 1298 px) and 2053 px on the screen of a map run (select 1298 px). After: page 1280 px on both; select 884 px on Mapy (the character's column) and 492 px on the screen of a map run (its row), the name ending „A…”; option text still 200 letters in the DOM. The task's ≈1840 and ≈2230 px come from another name; letters of „Abcdefghij” are narrower | p7-mapy-200, p7-run-200; eval |
| Point 7 on the kitchen-sink page (resume 1) | `npm run kitchen-sink -- --build-only`, `dist/kitchen-sink/` served by `python -m http.server` on 127.0.0.1 (the script's own server opens the default browser of the desktop, so it was not used; it serves the same directory), Chrome 1280 × 720, row „Lista wyboru” | matches; long name: observation | Options „Pierwsza pozycja”, „Druga pozycja”, each sample 133 px. Default: no background, text `rgb(212,212,216)`, frame `rgb(113,113,123)`; hover sample and a real hover: background `#27272a`; focus sample: outline solid 2 px, drawn whole around the list; disabled: text `rgb(82,82,92)`; empty: 30 px list with no position. Nothing cut, as before the change. With the first option's text set in the page to 200 letters (a working edit; the page has no long sample) the list grew to 1298 px and its table cell to 1310 px: in a table cell of automatic width `max-width: 100%` holds nothing, so the name is clipped by the page's edge with no „…”; the page stayed 1280 px. No player sees this page or that name, and no rule asks the page for a long sample, so it is no defect of the game and nothing was fixed | screenshots looked at, not kept; eval |
| Point 4, other Playwright for `firefox-1532` (resume 1) | Files read only | not viewed: none found | `browsers.json` of every `playwright-core` found under `%APPDATA%/nvm` (global `@playwright/cli`: 1.64.0-alpha, Firefox 1553), `%LOCALAPPDATA%/npm-cache/_npx` (two: 1.64.0-alpha, Firefox 1553; 1.66.0-alpha-2026-11-09, Firefox 1573 — the latter most likely the Playwright MCP run through `npx`), `~/.claude/plugins` (none), `node_modules` of the repository and of the worktree (none). None pairs with 1532; nothing installed, downloaded or reconfigured | — |
| D-208 failed save before D-323 | `state-die`, `JSON.stringify` of a save body made to throw in the page after „Wznów” (the save client's promise rejects before the request leaves) | matches | At the end-of-run save: „Nie udało się zapisać postępu. Gra spróbuje ponownie.” at 6612 ms, „Coś w grze się zepsuło — odśwież stronę.” at 6618 ms (observer in the page); one console line `uncaught kind=TypeError code=none place=view/last-resort.installLastResort`; the server wrote `{"failure":"browser","kind":"TypeError",…}` | console; `author-server-browser-failure-lines.txt` |
| D-97 save before logout | Same break, „Konto” → „Wyloguj” | matches | No logout; „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” at 925 ms, the D-323 sentence at 928 ms, under the bar; menu open; „Wyloguj” enabled again; one console line as above | p8-logout |

### Point 2: the program and its time

Started 19:29, Skraj lasu solved 19:37 on the third run, Las solved 19:41 on the second run on Las (about 12 minutes of trying). The program, written in the editor, one group „Program” under „Zawsze”:

```text
1.1 Z dala od — ognisko → Idź — ognisko
1.2 Temperatura poniżej 35,8 °C → Zapal — ognisko
1.3 Sytość poniżej 60 % → Zjedz — jagoda
1.4 Zawsze → Wytwórz — ognisko
1.5 Zapas poniżej 1 szt. · Jagoda → Zbierz — Jagoda
1.6 Zapas poniżej 8 szt. · Patyk → Zbierz — Patyk
1.7 Zapas poniżej 3 szt. · Jagoda → Zbierz — Jagoda
1.8 Zawsze → Eksploruj
```

The Understanding was composed (`compose-known`), as the task allows. The part „prawdziwy program” of loop2#65-1 and loop2#79-1 is met for Skraj lasu and for Las; for „Las — głębiej” no program was written, and its combat states stand on composed states. No program stays in the repository; it lived in the local database alone.

Interpretation: when the task was written (13.11) „Las” was the first map (`maps.ts:74-76`); Skraj lasu came before it on 14.11 (`f513b34f`) and Las now opens after it. I solved both, Skraj lasu first, by play.

### Console lines read

- During the play of points 1 and 3: 0 messages at every read (202, 206, 214 of the fights; the frames runs).
- Point 8 (save break): `[ERROR] uncaught kind=TypeError code=none place=view/last-resort.installLastResort @ https://127.0.0.1:62614/main.js:8`, once per page load.
- Route of the window: `[ERROR] Failed to load resource: net::ERR_CONNECTION_REFUSED @ …/api/saved-game:0` ×3 (the aborted saves), then `[ERROR] uncaught kind=RangeError code=none place=view/last-resort.installLastResort …` for the thrown error.
- Card taken down: `[ERROR] uncaught kind=TypeError code=none place=view/account-card.createAccountCard …`.
- Ordinary: `401` of `/api/account` before sign-in, `404` of the favicon, `403` of `/api/session` for the blocked account.
- Server log lines of the browser's reports: `author-server-browser-failure-lines.txt` (four lines; the account number is the local test account's).

## Defects for the human

1. **Scroll on entering the screen of a map run (loop2#79-22).** What the player sees: after „Wejdź” on Mapy or the bar's „Wróć do przejścia · …”, the menu bar is out of sight; the page stands 40 px down and the run screen's header is at the top edge. How to reach: any map run, either way in, at 1280 × 720. In the code: `focusIfLost` in `src/browser/view/screen-registry.ts:208` focuses the screen's section without `preventScroll`. Entry touched: none decides it — D-370 asks for the page at its top only when the end-of-run window opens, and the styleguide rule "Focus does not fall to the page" is kept. Not fixed: condition (a) of point 5 does not hold. Left as is, the bar is one wheel-turn away at every entry; a fix is one option of `focus()`, but it is a choice of the look the foundation does not settle.
2. **After an error no code handled, „Koniec przejścia” does nothing.** What the player sees: the error came with the save at the death (point 8 break, `state-die` played to 210); the end-of-run window did not open by itself, and a click on „Koniec przejścia” in the header opened nothing, while both sentences stood under the bar. Entries touched: D-311 and D-371 (the window opens of itself after the effect and „Koniec przejścia” opens it at once) against D-323 ("every decision about the game that goes on gives way"); whether the window, a memory of the page rather than game state, still opens after the error is not settled. Cause (traced in resume 1, by reading the code): the error's handler `onUncaught` calls `state.view.halt()` (`src/browser/view/app.ts:316`), which sets the store's `halted` (`src/browser/view/state-store.ts:202-203`) — the stop of game state that D-323 and `uncaught-failure-game-state` set. The state of the screen Przejście reads that same flag and refuses its own changes: `openWindow` returns at `game.halted()` (`src/browser/view/run-screen-state.ts:225`), so „Koniec przejścia” does nothing; `effectEnded` returns too (`run-screen-state.ts:241`), so a window that waited for the scene's death effect (`effectPending`, set in `taken`, `run-screen-state.ts:177-180`) never shows; `closeWindow` likewise (`:234`). This goes beyond the stop of game state: the window's openness is a memory of the page (D-371), not game state, and the guard is deliberate — added in `d0c42108` and held by the test „after halt the question, the window and the wait change nothing, while entering and leaving go on” (`tests/view/run-screen-state.test.mjs:219`), which also asserts that leaving the screen and entering it again does open the window after the halt (`run-screen-state.ts:196-201`, `:193`). Open: whether D-323's "every decision about the game that goes on gives way" is meant to reach the page's memory of the window — the foundation does not say; the way out by leaving and entering again was read from the code and its test, not tried in the browser.
3. **The wolf covers the campfire.** What the player sees: in a fight next to the burning campfire, and after a death in it, the wolf stands at its offset to the right of the mage, over the fire, which is hidden until the wolf is gone (p1-die-combat-scene). Entry touched: D-415 leaves to the human whether another element of the scene covers an effect or a prop; no threshold decides. DOM order is as the styleguide gives (fire, creature, mage).
4. **„Potem” after a completion in a fight reads „żadna reguła nie pasuje — postać stanie” in `warning`.** At the stopped minute no rule of that copy can start (the combat rule is out of combat, the others are infeasible), so D-335 holds as written; a player reads a warning that the character will stop on a solved map. Shown for the human's judgement; no entry is contradicted.
5. **The action pick does not stand whole in the smallest window.** What the player sees: in a 1280 × 720 window, with the rule panel open under rule 1.2 on Programy and every action discovered, the last row of the action pick („Zjedz — jagoda”, „Uderz — patyk”, „Kopnij”, „Odskocz”) stands 18 px below the window's edge (pick from y 438 to 738) until the page scrolls. How to reach: any game with the 14 actions discovered, Programy, a click on rule 1.2, the action field. Entry touched: D-299 — its *Verification* gives as complying "the pick of actions of a game with every action discovered standing whole without scrolling", and its rationale rests on every cell fitting without scrolling and says a search or a row of recent picks may be called for again when that stops; D-396 makes 1280 × 720 the smallest window. Not fixed: D-299's binding sentence (no search field, no row of recent picks) holds, so condition (a) of point 5 does not; whether the pick should fit, or D-299 be revisited, is the human's.

## Checks run

- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (4 tests OK).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0 (3 tests OK).
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors` (the styleguide file changed).
- `npx prettier --check src/browser/styles.css src/browser/maps-screen.css` → exit 0, "All matched files use Prettier code style!" (run again alone in resume 1; the first run sat in a chain and its exit code was not captured).
- `npm run kitchen-sink -- --build-only` → exit 0 (resume 1).
- Browser checks of the change: see point 7 rows (before and after, 40 and 200 letters, both screens, ellipsis seen in enlarged crops), focus outline of the select from the keyboard (drawn, 2 px, not clipped by `overflow: hidden`), the select under the pointer (background `#27272a`, text and frame unchanged).
- Not run: `npm test` in full — the orchestrator's (WAY-160). `python -B .the-way/instruction-files/check_instructions.py` — no instruction file changed; left to the full gate. The kitchen-sink page (`npm run kitchen-sink`) was not opened: the select's states there were not looked at; in the game the default, hover, focus and cut states were.

### Tests

No permanent test was added. The change is CSS layout and rendering: the testing guidelines leave whole-screen looks to a look in the browser (D-87) and real rendering to a manual check (D-88); a test on the text of the stylesheet would test text, and jsdom computes no layout. Mutations in the head: dropping `overflow: hidden` leaves the name cut with no ellipsis in Chrome (seen in the trial before the commit: "…Abc" with no „…”); dropping `max-width` or the row's `max-width` widens the page again (1661 / 2053 px measured before). No test catches either; only the browser check does, as D-88 gives.

## Own-work check

- Requirement most likely missed: "a cut name shows an ellipsis" — `text-overflow` on a `select` is not drawn by every engine. Check: enlarged crops of the select in Chrome with `max-width` alone (no „…”, the name just clipped) and with `overflow: hidden` added („A…”). It showed that `overflow: hidden` is needed in Chrome; the committed rule has it, and the enlarged crops of both screens after the commit show „…”. Firefox was not checked (point 4).
- Second: "the full name stays in the opened options" — the native popup of a select is not drawn in a headless screenshot; checked instead that the option's text is the whole 200 letters in the DOM. The popup itself is unchecked.
- UI check (`ui_check.md`): screenshots of the running product taken and pushed (p7-mapy-200, p7-run-200); states: default, cut, focus, hover checked in the game; disabled and empty not looked at (the change touches no colour of them).

## Choices

- The ellipsis and `max-width: 100%` on every `.select-list`, in `styles.css`, not only on the two program lists. Rejected: rules scoped to `.program-list` and `.maps-who-program` in the screens' sheets — D-265 and D-421 keep the look of a shared control only in `styles.css`, and a scoped rule there would be one screen's rule in the shared sheet. Cost if wrong: every other select list (the trip plan's, the kitchen-sink's) is now held to its row too; none of them has a long name today.
- The row „Program:” on Mapy limited with `max-width: 100%` in `maps-screen.css`. Rejected: `align-self: stretch` — it would widen the row of every character to the column even with a short list, a change of the row's look the task did not ask for. With a long name the select now wraps under its label and takes the whole column (884 px); with a short one it stays beside the label (284 px).
- The styleguide's exception names every select list, since one rule draws them all. Rejected: naming the program lists only — it would leave the other lists' cut unspoken while the code cuts them. After the fix (`81502efc`) the exception speaks of a select list in general and names no screen or list, as the template keeps the product's state out of a rule.
- Composed states with field edits (health, satiety, temperature, streak) where the simulation's own play could not reach a fight with a healthy mage or a completion inside a fight within the time; named in the table. Rejected: a better program for „Las — głębiej” — two tries in Node ended in hunger before the first attack; the time went to the listed states.
- Point 2 read as "the opening map and Las both, by play" (see Interpretation).

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-396 (found in the index; it carries F-40 of the task: browsers and the smallest window), D-169 and D-170 (names of programs and the list „Program:”, for point 7), D-311, D-368, D-370, D-371 (window, for defect 2), D-415 (for defect 3), D-417 (D-254 is withdrawn and points to it) — read whole or as the index gives them.
- `foundations/invariants.md`: `browser-view-token-values`, `uncaught-failure-game-state` whole; the list of invariants of `browser-view` and `every` by heading.
- Product code read to drive the game and to read causes: `src/browser/sim/data/{maps,balance,actions,campfire,items,conditions}.ts`, `src/browser/sim/game.ts` (send, advanceMinutes), `src/browser/sim/understanding.ts` (discover), `src/browser/sim/run.ts` (craft/light), `src/browser/view/screen-registry.ts` (focus), `src/browser/view/game-saver.ts`, `src/browser/account-api.ts` (save path), `src/browser/view/last-resort.ts` (head), `src/browser/view/program-editor.ts` (`readNumberField`), `src/browser/view/credits-section.tsx`, `src/server/account-role.ts` (usage), `scripts/build.mjs` (whether the build clears `dist`).
- `.the-way/product-guidelines/styleguide/SKILL.md`: to see whether a change of one rule of the styleguide in a cycle goes through `maintain-styleguide`; it is the refinement's method, and the cycle's author writes the styleguide's file from the task.

## Working copies

- `.runs/author/` — index of the foundation, composed states, scripts, frames JSON, screenshots, the local start's output log and the clone of `mariusznazar/screenshots` (`.runs/author/screenshots`): removed. The scripts the report needs are kept beside it as `author-script-*.txt`.
- `.playwright-cli/` — the CLI's snapshots, console logs and frames, and `state` files: removed.
- Browser sessions `default` and `p2` closed; `playwright-cli list` shows no browsers; `npm run local:stop` stopped 1 start. The local database under `.runs/local-start/` is the product tool's own and stays until the next start.
- `dist/public/styles.css` and `dist/public/maps-screen.css` were overwritten with the committed sources during the check (build output, ignored by git).
- Remainder: none.

## Unread material

- `guidelines/coding-browser-module.md`: not read — the handoff asks for it only where a module of the view directory changes; only stylesheets changed.
- `.the-way/task-cycle/skill/foundation_step.md`: not read — no foundation entry written.
- Glossary: only the entry `map run`; the rest by heading.
- `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, the decision index (191 in full, 121 by heading): read whole.

## Searches not found or unclear

- The handoff asks for "the decision that the rule cites" for the styleguide rule "A name typed by the player breaks in its row": the rule cites none (`Decision: none`).
- D-254, named by the task and the handoff, is withdrawn (`foundations/decisions.md:11415`), answered again by D-417; its risk sentence stands in D-417.
- The task's place of the scroll, `src/browser/view/game-view.ts:974`, holds no `focus()` now; the code stands in `src/browser/view/screen-registry.ts:208`.
- The task's widths ≈1840 and ≈2230 px were not reproduced; with „Abcdefghij”×20 they are 1661 and 2053 px.
- Firefox of `playwright-cli` 0.1.22: expects `firefox-1553`, the computer holds `firefox-1532`.

## Weak spots of the method

- The look before the split (point 6) was compared as stylesheet text, not viewed: no state was looked at in a build of `581d09bb^`. The rule sets match; of the rules whose order the split reversed and that set a same property in the same context, I looked only at the pairs whose last compound shares a class (14). The reviewer reran the comparison without that filter: 7724 reversed pairs; it checked the 35 among them that might meet on one element type with no shared class and found each pair on different element types, so none meets one element, and it found no shared control carrying a class of a screen (`react-button.tsx:66`, `react-select-list.tsx:38`). What the method does not exclude: an element that carries the classes of two screen rules with no class in common.

- Combat states, the solved fight and the window under two warnings stand on composed states, three with fields set by hand; what follows the load was played. A state a player cannot reach is not excluded for the solved fight (two beaten attacks with a body kept full).
- Motion read from screencast frames whose timestamps bunch (10 ms apart in bursts, 150 ms gaps elsewhere): durations near 300 ms cannot be told apart.
- The drag is Playwright's synthetic HTML5 drag in Chromium, not a person's mouse.
- The caret of a number input cannot be read through the DOM.
- Headless Chromium draws no native select popup.
- Hash navigation by `goto` focuses screens programmatically, which drew a focus ring around the whole list of accounts once; a player's click does not do that, so it is not reported as a fault.

## The part of the task not done

- Point 4, Firefox: not run (tool, above).
- „Las — głębiej” by a program written in the editor: not tried; its states are composed.
- The kitchen-sink page's select list after the change: not looked at.

## Resume 1

**Status:** `done with concerns` (as before: point 4 not viewed). No new commit; the branch stays at `8e9c01a0`.

1. **Repair.** `npx prettier --check src/browser/styles.css src/browser/maps-screen.css` run alone → exit 0. The other checks under *Checks run* already carried their exit codes; `npm run kitchen-sink -- --build-only` → exit 0 is added there.
2. **Kitchen-sink page.** Row "Point 7 on the kitchen-sink page" in *Observations*: default, hover, focus, disabled and empty states of the shared select list unchanged and as the styleguide gives them. A 200-letter name typed into the page's sample is not held to its table cell (automatic table layout), clipped at the page's edge without „…”; this page and that name reach no player, and no rule asks the page for such a sample — reported, not fixed. The page was served by `python -m http.server` on 127.0.0.1 instead of `npm run kitchen-sink`, because the script opens the default browser of the desktop; the server was stopped (the port no longer answers).
3. **Firefox.** Row "Point 4, other Playwright for `firefox-1532`" in *Observations*: no Playwright on the computer pairs with Firefox 1532 in the places named there; point 4 stays not viewed.
4. **Defect 2.** Cause added to its entry in *Defects for the human*: the guards `game.halted()` in `src/browser/view/run-screen-state.ts:225` and `:241`, reading the store's halt of `src/browser/view/state-store.ts:202-203` set by `src/browser/view/app.ts:316`; deliberate and tested (`tests/view/run-screen-state.test.mjs:219`), and broader than the stop of game state that D-323 and `uncaught-failure-game-state` set. Open: whether D-323 is meant to reach the page's memory of the window.

**Reaches beyond the dispatch:** `src/browser/view/run-screen-state.ts` (lines 20–260), `src/browser/view/state-store.ts` (halt), `src/browser/view/app.ts:310-320`, `tests/view/run-screen-state.test.mjs:215-262`, `scripts/kitchen-sink.mjs` (its options), `README.md` (how the page is served).

**Working copies:** `.runs/author/` (prettier log, kitchen-sink scripts and screenshots, serve log) and `.playwright-cli/` removed; the built `dist/kitchen-sink/` is the product tool's output (ignored) and stays. Browser closed (`playwright-cli list`: no browsers), kitchen-sink server stopped. Remainder: none.

**Unread material:** none beyond what the main report names.

**Searches not found or unclear:** a `playwright-core` with Firefox revision 1532 — not found in the places named; the way out of defect 2 by leaving and entering the screen again was read from code and test, not tried in the browser.
