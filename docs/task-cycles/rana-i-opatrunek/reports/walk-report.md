# Walk report — the task rana-i-opatrunek, in the running game

Status: done. Result: all seven cases right; two states were composed (stated per case), no defect of the change found, three side observations outside the task.

Where I checked: the worktree `the worktree's root`, branch `task/rana-i-opatrunek`, head `5731b59213c317bdfb76e0ed27ca0768c2dbdbcb`; `npm run local` (built the game there), the game at `https://127.0.0.1:65221` over HTTPS, Windows 11, Chromium through Playwright CLI 0.1.22 (computer layout 1280 × 720 with a mouse; phone layout 360 × 740 with touch, `.playwright/cli.phone.config.json`, taps by `page.tap`). A test account made through the login card (`walker@example.test`). The local start was stopped at the end (`npm run local:stop`: one start stopped).

Reading of the styleguide: I read `guidelines/styleguide-browser-view.md` lines 1–539 and the sections „The screen Postać” and „Program editor” (lines 1116–1304) fully, and looked up the rest by section heading only; the file is about 1,980 lines, so I did not read the other screens' sections (scene, body row, end-of-run window, list of accounts), which the change does not touch. `task_frozen.md` I read lines 1–170 (all of *Description*, *Questions to settle*, *Decisions in play* to D-290).

## What I did not check (and what I noticed)

- Not played: solving the wolf pack without a bandage to its end (540 minutes and six wolves). Case 5 checks that it can be entered with no bandage and the starting program and that the game does not refuse; the share of runs that solve is the balance instrument's work, not this walk's.
- Not checked: the third price of „Wprawna dłoń” (the screen showed „cena 1” for ranks 1 and 2, and I had no points to buy the third); the prices of „Mocniejszy zwój” (1 · 1 · 2) and of „Szybkie gojenie” (2 · 3) I saw on the screen as they changed with each purchase. The third price of „Wprawna dłoń” is data covered by the tests, not read here.
- Not checked: the owner panel, mail, the test server and the earning loop (outside the change).
- A fight was never started by the game itself in this walk: the wolf pack's attack chance and cooldown (90 minutes calm) would have taken a program that survives 7 °C for hours. The fight states are composed (case 4).
- Side observations, outside the task, nothing corrected:
  1. Phone layout, screen of a map run: the world area (`div.world-area`) reports content 330 px in a box of 318 px, on the scene's own width (`div.scene-place` and `div.scene` end 12 px past the box), in a fight and without one, with „Wytwórz — Opatrunek” as well as with Ucisk, so the cause is older than this change. The page does not scroll to the side (`scrollsToTheSide` false).
  2. Phone layout, the line „Teraz” of a map run: „Wytwórz — Opatrunek” is cut with an ellipsis (`span.now-text`, content 134 px in a box of 114 px) when the line also says „zostało 10 z 10 min”; the line „Potem Ucisk — Opatrunek” fitted.
  3. After „Zakończ” of a map run whose copy of the program was changed, the game asks „Zapisać, odrzucić, wrócić?”; I chose „Odrzuć”. Expected, noted for completeness.
- The console showed only the two ordinary lines of every start (the 401 of `/api/account` before sign-in and the 404 of the favicon) in both sessions, at 1280 px and at 360 px; no line beginning `uncaught` or `saved-game-load`.

## The cases

| # | Case | Verdict | How |
|---|---|---|---|
| 1 | Screen Postać, the tree | right | `#/postac/1`, `#/postac/2`, 1280 px; the state composed (see below), the purchases made by clicking „Kup” |
| 2 | Practice of the tree and „Wprawna dłoń” | right (the run composed close to its end) | `#/postac/1/przejscie`, 1280 px |
| 3 | Rule panel of the program editor | right | the screens of a map run on „Las — wataha” and on „Las”, 1280 px and 360 px with touch |
| 4 | A fight with Ucisk | right (the fight composed to its start) | `#/postac/1/przejscie` on „Las — wataha”, 1280 px |
| 5 | The wolf pack is entered without a bandage | right | „Mapy” → „Las — wataha” → „Wejdź: Agent”, 1280 px |
| 6 | Phone layout | right, with the side observations above | 360 × 740 with touch, the measurement of the skill |
| 7 | Save of version 11 refused, new save at 12 | right | `PUT /api/saved-game`, reload, `GET /api/saved-game` |

### Composed states (not reached by play)

I composed the saved document with the game's own functions from `dist/browser/sim/` (script `reports/walk-compose.mjs`, sent by `reports/walk-send.sh`, which is the ordinary save request of the page; `loadSavedGame` accepted every document before I sent it, the one refused was never used). Character and understanding come from `createCharacter` / `savedGame`; I set by hand: the practice of the tree „Opatrywanie małych ran” (110 for „Agent” and „Medyk”, 20 for „Uczen”), all trees, actions, conditions and items known to the Understanding, the solved maps (`forestEdge`, `forest`, `forestDeep`, so that the pack is open), a chest of 3 opatrunki, 4 mchy, 6 patyki, 3 jagody, the program „Ucisk” (combat group „Walka”: „Zdrowie poniżej 50 → Ucisk — Opatrunek” before „Zawsze → Uderz — patyk”; a trip list taking 1 opatrunek and 3 patyki), and for „Medyk” a stick in the main hand and an opatrunek in pocket 1. Two runs were composed further: the fight (a map run of `forestPack` at minute 0 with an encounter of the wolf at its start, as `finishMinute` makes it: `activeCombat` resolving after 5 minutes, health set to 30 / 100 / 92, with „Ucisk” and „Mocniejszy zwój” rank 1 composed as bought where noted) and the practice run (a map run of `forest` set at minute 400 with a lit campfire, streak 400, so that it completes in the 80 minutes that follow). Everything after the start of each composed run — the minutes, the encounter, the crafting, the dressing, the chronicle, the completion — was the game running live in the browser. The buying of branches in cases 1 was done by clicking „Kup”.

### 1. The screen Postać, the tree — right

- `main` text of „Agent” (practice 110, points 4): the nine rows stand in this order, „Opatrywanie małych ran” last, after „Unik przed ciosem”; its row reads „poziom 5 · najwyższy · 4 pkt” (110 = the last threshold of 10 · 28 · 60 · 110); at 20 practice it reads „poziom 2 · 20 / 28”, at 22 „22 / 28” (case 2).
- Branch lines as the screen read them at 0 points spent:
  - „Mocniejszy zwój 0/3 — Opatrunek leczy więcej. · teraz 25 zdrowia → po kupnie 30 zdrowia · cena 1”
  - „Wprawna dłoń 0/3 — Opatrujesz szybciej. · teraz 10 min → po kupnie 8 min · cena 1”
  - „Szybkie gojenie 0/2 — Rany schodzą same szybciej — cecha, działa zawsze. · teraz 0,05 zdrowia na minutę → po kupnie 0,1 zdrowia na minutę · cena 2”
  - „Ucisk 0/1 — Opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut. · cena 3” — price and no „teraz … → po kupnie …”; after buying it (on „Medyk”) the line reads „Ucisk 1/1 — Opatrzenie w trakcie starcia, za turę zamiast za dziesięć minut.” with no price.
- The descriptions are word for word those of the task.
- Prices by purchase (on „Agent”): „Mocniejszy zwój” showed „cena 1” at rank 0, „cena 1” at rank 1 (after „Kup”: „1/3 … teraz 30 → po kupnie 35”), „cena 2” at rank 2 („2/3 … teraz 35 → 40”): 1 · 1 · 2. „Szybkie gojenie” showed „cena 2” at rank 0 and, after buying it, „1/2 … teraz 0,1 zdrowia na minutę → po kupnie 0,15 zdrowia na minutę · cena 3”: 2 · 3, and the values „0,05 → 0,1” and „0,1 → 0,15” with the decimal comma and no rounding trace anywhere on the screen. „Wprawna dłoń” on „Medyk” after one purchase: „1/3 … teraz 8 min → po kupnie 6 min · cena 1”.
- Screenshots (1280 px, „Agent” with two ranks of „Mocniejszy zwój” and one of „Szybkie gojenie” bought by clicking): ![The screen Postać at 1280 px with the tree „Opatrywanie małych ran” expanded: four branches with „teraz → po kupnie”, Ucisk with price only](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s1-postac-1280.png?raw=true)

### 2. The practice of the tree and „Wprawna dłoń” — right

- First run, on the unsolved map „Las” (practice is paid at a completion of a map not solved before, as the game rules it), the character „Uczen” (practice 20, „Wprawna dłoń” rank 1 composed): a program `Wytwórz — Opatrunek`, `Zdrowie poniżej 100 → Opatrz — Opatrunek`, `Eksploruj`. After the first finished „Wytwórz — Opatrunek” the line „Wprawa w tym przejściu” read „Eksploracja +1 · Opatrywanie małych ran +1”: a craft raises the tree by one.
- Second run (the composed one at minute 400, with the same program, health 60): the chronicle read „410 Opatrz — Opatrunek”, then „418 Eksploruj”, so the dressing lasted 8 minutes (10 − 2 for rank 1; the cell of the pick for the same action without the branch read „10 min” on „Agent”, and the rule row read „8 min”). After the end the line read „Eksploracja +1 · Opatrywanie małych ran +2”: the craft and the dressing, each to its end, a practice of one each. Health 60 → 89 (25 + the natural return).
- At the completion „Las rozwiązany”, the screen Postać read „Opatrywanie małych ran poziom 2 · 22 / 28” (it read „20 / 28” before): the practice paid is 20 + 2.
- Not measured: the floor of 1 minute for „Wprawna dłoń” (rank 3 would give 4 minutes; the floor is not reached by 3 ranks of 2 from 10).

### 3. The rule panel of the program editor — right

- 1280 px, window of a rule on „Las — wataha” with „Agent” (no branch): in „Żywność i walka” the cells stand in the order „Zjedz — jagoda (1 jagoda)”, „Opatrz”, „Uderz — patyk”, „Kopnij”, „Odskocz”, „Ucisk”, „Załóż”; the cell „Ucisk” has the mask icon `/icons/bandage-roll.svg` (the same as „Opatrz”), no price, is grey with a dashed border and the reason „gałąź niewykupiona”, and its time is „tura” ![The rule panel on 1280 px with the cell Ucisk grey: gałąź niewykupiona](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s2-panel-unbought-1280.png?raw=true)
- With „Medyk” (branch bought), rule 1.1: field „Czynność” read „Ucisk — Opatrunek (1 opatrunek)”, time „tura”, field „Cel czynności” read „Opatrunek (1 opatrunek)”; in the pick the cell „Ucisk” was the selected one, with no price in the cell ![The window of the rule 1.1 with Ucisk and the scene of a fight](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s3-rule-panel-ucisk-1280.png?raw=true)
- Outside a fight (after the fight, health 45, a bandage nowhere): the row 1.1 read „Zdrowie poniżej 50 pkt → Ucisk — Opatrunek tylko w walce tura” with „tylko w walce” in amber, as the row of „Uderz — patyk” ![The rule rows 1.1 and 1.2 outside a fight: tylko w walce in amber on both](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s5-rule-row-outside-fight-1280.png?raw=true)
- In a fight (composed to its start, paused at minute 0): health 100 and the rule „Zawsze → Ucisk” → the row read „zdrowie pełne”; health 30, branch bought, no bandage in the pocket and none in the backpack → the row read „brakuje 1 × opatrunek” (the row of „Uderz — patyk” stood as the next action in both).
- 360 px with touch: the cells are 156 × 48 px, the cell „Ucisk” selected for „Medyk” ![The pick on 360 px: Ucisk selected, time tura, target Opatrunek (1 opatrunek)](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s8-panel-360.png?raw=true), and for a character without the branch the cell is grey with „gałąź niewykupiona” on one line in the cell, no text crossing its border (`scrollWidth` 154 = `clientWidth` 154) ![The pick on 360 px: Ucisk grey, gałąź niewykupiona](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s9-panel-unbought-360.png?raw=true)

### 4. A fight with Ucisk — right

- Composed: „Medyk”, branch „Ucisk” bought, an opatrunek in pocket 1 and one in the backpack, the program as above, the wolf's encounter at the start of the map run, health 30. The screen before the encounter resolved: „Plecak 4/15: patyk 3, opatrunek 1” and „Wyposażenie: patyk w ręku, opatrunek pod ręką”.
- Resumed at 1×, the paragraph of the encounter and the chronicle read (health 30, rank 0 of „Mocniejszy zwój”): „Napada wilk (24/24). … Wilk gryzie: −7 · Mag uciska ranę: zdrowie 48/100 · Wilk gryzie: −7 · Mag bierze opatrunek z plecaka do kieszeni · Mag uciska ranę: zdrowie 66/100 · Wilk gryzie: −7 · Mag uderza patykiem: wilk 18/24 · … · Wilk pokonany.” and the chronicle line „6 Bierze opatrunek z plecaka do kieszeni”. 30 − 7 + 25 = 48; 48 − 7 + 25 = 66. After the fight: „Plecak 3/15: patyk 3”, „Wyposażenie: patyk w ręku” (the pocket and the backpack bandage both used), „Zdrowie 45”; the line „Wprawa w tym przejściu: Walka bronią jednoręczną +4 · Opatrywanie małych ran +2” (each Ucisk gave one practice) ![The chronicle of the fight with Ucisk and the pocket refill](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s4-fight-chronicle-1280.png?raw=true)
- With „Mocniejszy zwój” rank 1 (composed bought), health 30: „zdrowie 53/100”, then „bierze opatrunek z plecaka do kieszeni · Mag uciska ranę: zdrowie 76/100”: 30 − 7 + 30 = 53 and 53 − 7 + 30 = 76.
- With „Mocniejszy zwój” rank 1, health 100 and the rule „Zawsze → Ucisk”: the first Ucisk came after a bite: „Wilk gryzie: −7 · Mag uciska ranę: zdrowie 100/100”, again „… bierze opatrunek z plecaka do kieszeni · Mag uciska ranę: zdrowie 100/100”: never above 100 (93 + 30 is capped); the rule did not fire at health 100 before the first bite („zdrowie pełne”).
- The screen of the map run shows the line of gear with the pockets, as quoted.

### 5. The wolf pack is entered without a bandage — right

- „Mapy” → „Las — wataha” (listed „Otwarta … 9 h · 6 do pokonania · bez ognia 33 min”) → „Wejdź: Agent, mapa Las — wataha”: „Agent” (no bandage anywhere, „Wyposażenie: nic”, „Plecak 0/15”), the starting program „Program” with no rules. The game entered („Las — wataha · Minuta 3 · Passa 3/540 · Pokonane napaści 0/6”), no refusal. Not played to the end (above).

### 6. The phone layout — right

- 360 × 740, touch 1, `phone` true. The measurement of the skill, on the screen Postać with the tree expanded: `scrollsToTheSide` false, no control under 48 px (list empty); `contentWiderThanItsBox` listed only `div.character-figure` and `div.scene-sheet` (the drawing's sprite sheet inside its clipping frame, a picture, not text). On the rule panel with the pick open (both states): `scrollsToTheSide` false, no control under 48 px, the two picture items and the two side observations above only. The new texts read in full on the screens (screenshots below): the four branch lines wrap within the page ![The screen Postać at 360 px with the tree expanded](https://github.com/mariusznazar/screenshots/blob/ad39a4d07196a05e95a34230b13b12109213f3a8/loop2/rana-i-opatrunek/s7-postac-360.png?raw=true) and the cells of the pick (see case 3).
- Console: see "What I did not check".

### 7. A save of version 11 is refused, a new save is at version 12 — right

- With the new account I sent a document of the composed state with `version: 11` by the ordinary request (`200 {"revision":1}`) and reloaded: the page said „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” and showed an empty „Drużyna”. After „Załóż” of a character, `GET /api/saved-game` answered `version: 12`.

## What fell wrong, what I corrected

Nothing fell wrong in the change; I changed no tracked file and wrote no test.

## Errors outside the task's scope

The side observations 1 and 2 above (phone layout of the screen of a map run). Neither is about Ucisk and neither is corrected.

## Working copies

- `.runs/walk/` (working copies, the composed states, the screenshots as the tool saved them): removed at the end. `reports/walk-compose.mjs` and `reports/walk-send.sh` keep the script that composed the states and the script that sent them, since the report rests on them; they are no screenshots.
- `.runs/screenshots/` (the clone of `mariusznazar/screenshots`): removed at the end. The eight screenshots lie in the commit `ad39a4d07196a05e95a34230b13b12109213f3a8` on the branch `loop2/rana-i-opatrunek` of that repository, in `loop2/rana-i-opatrunek/`: `s1-postac-1280.png`, `s2-panel-unbought-1280.png`, `s3-rule-panel-ucisk-1280.png`, `s4-fight-chronicle-1280.png`, `s5-rule-row-outside-fight-1280.png`, `s7-postac-360.png`, `s8-panel-360.png`, `s9-panel-unbought-360.png`. Each shows only the made-up account's characters; no address, password or token.
- `.playwright-cli/`: my files (from this session) removed; the six older files with the time 02:46 of 2026-11-27 are another session's and stay.
- The local start (database under `.runs/local-start/14988-65221-38cdb3aa7d7f629c/`): stopped; the database stays until the next start, as the skill says.
