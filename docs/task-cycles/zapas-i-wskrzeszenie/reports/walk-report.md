done

# Walk through the running game, correction 1 of `zapas-i-wskrzeszenie`

Where: Windows 11, Playwright CLI 0.1.22 (own session of this worktree, no shared browser), the game of `npm run local` at `https://127.0.0.1:53851` (head `ad90dd33`, worktree `the root of the task's worktree`), 1280x720 and, for width checks, 375x700. Account: `walk@example.test` (made through the login card). The states were composed with functions of the built simulation (`send`, `createCharacter`, `savedGame`, `loadSavedGame`, `paidPractice`) and sent by the page's own save request (version 8); every state passed `loadSavedGame` before it was sent. The deaths and the completions below were played in the browser at 16x (the first deaths came by cold at game minute 241-243, after two discovery pauses answered with „Wznów”). The changed code was not edited and nothing of the repository changed (`git status` clean at the end).

## What I did not check

- The hover and the visible-focus states of „Wejdź” and „Puść w pętlę”: those controls are shared and unchanged by this change; I only saw the focus ring that the end window and the character block take on open.
- The page of all states (`kitchen-sink`) and the contrast of each pair: unchanged colour roles only (read from computed styles, see below); the contrast table is not touched by the change.
- The line at a character on the Siedziba screen in the part state (1 of 3) and on the Postać screen in the full and part states: read as text only for the full state (Siedziba), for 2 of 3 (Postać, text) and for 0 of 3 (Siedziba and Postać, text); the three screens draw the same `resurrectionLine`, and the part state was read on the Mapy card with its colour.
- A death settled in an earning loop and the report on earning loops: not part of this walk.
- Mail, the test server, other browsers: outside this start (see the skill).
- Motion: not judged (nothing in the change moves).
- Side observation, no bearing on the fault list: on the screen of a manual run on a solved map the line „Wprawa w tym przejściu: Eksploracja +1” still stands under the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy …” (screenshot 08). D-215 puts the solved line „above the line „Wprawa w tym przejściu”” by design, so this is no disagreement with the task, but a player may read the two lines as contradicting each other (the +1 is gathered and not paid).

## Cases and verdicts

| # | Case | By what | Verdict |
|---|---|---|---|
| 1 | Card of the solved map „Skraj lasu” with the character in „Kto idzie”: „Wejdzie: …” counted from the chest, no warning under „Wejdź”. State: chest patyk 10, jagoda 6; take list patyk 3, jagoda 2. | Mapy screen, text of the page, screenshot 01 | pass: „Wejdzie: patyk 3, jagoda 2”, no „Próba weźmie zapas…” anywhere; „Wejdzie: nic” with an empty chest, „Wejdzie: patyk 1” with the chest at patyk 1, jagoda 0 (cut by the chest, no warning). „rozwiązana” in the list and in the heading. |
| 2 | Line at the character, full stock: „Wskrzeszenie drużyny: użycia 3 z 3” in `text-secondary` | Mapy card, Siedziba, computed colour | pass: text exact, computed `rgb(159, 159, 169)` = token `#9f9fa9` (Mapy `maps-who-resurrection`, Siedziba `team-member-resurrection`) |
| 3 | Line at the character, part: „…użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” in `text-secondary` (spent 2, next return 190 min after the reading) | Mapy card, computed colour, screenshot 02 | pass: text exact, `rgb(159, 159, 169)` |
| 4 | Line at the character, zero: „…użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger` | Mapy card, Siedziba, Postać (text), computed colour, screenshot 04 | pass: text exact, `rgb(255, 100, 103)` = `#ff6467`, class `danger`; at 375 px wide it wraps to three lines with no horizontal overflow (`scrollWidth` 375 = `clientWidth`, screenshot 09). The line read 3 godz. 9 min a minute later in the same state (rounding up to whole minutes as D-217). |
| 5 | Entry on the solved map takes the supply from the chest: screen of the run shows the solved line, the backpack and „Wyniesie” | Run screen, text, saved game read by `GET /api/saved-game` | pass: chest 10/6 before, 7/4 after entry (patyk 3, jagoda 2 left it); „Plecak 5/15: patyk 3, jagoda 2”; „Wyniesie: patyk 3, jagoda 2”; the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” stands in `text-secondary` (`rgb(159, 159, 169)`), under the backpack, above „Wprawa w tym przejściu” (screenshot 08); the run's `solvedMapRun` is true. The old warning is gone. |
| 6 | „Restart” of the solved run in progress | Run screen, saved game | pass: chest 7/4 → 4/2; the new run carries patyk 3, jagoda 2 again; what the first run carried (3 + 2) did not go back to the chest (it would read 7/4 + 3/2 = 10/6) |
| 7 | Death at the manual run of the solved map by a character with practice: end-of-run window | Window text, computed colour, saved game, screenshot 03 | pass: title „Mag zamarzł”; „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” exactly, class `end-window-cost`, `rgb(159, 159, 169)` (`text-secondary`); the save holds `deathSettlement {resurrectionUsed, usesSpent 1}`, uses spent 1; the line at the character then reads „użycia 2 z 3, następne za 4 godz. 0 min czasu realnego” in `text-secondary`; the chest stayed 4/2 (what the dead character carried is lost). |
| 8 | „Restart” from the window after the death | Window, saved game | pass: new run, chest 4/2 → 1/0 (took patyk 3, jagoda 2 again), the use stays spent (1), the death does not settle twice |
| 9 | „Zakończ” of a solved run in progress | Run screen → Postać screen, saved game | pass: lands on the Postać screen, `run` null, chest stays 1/0 (the backpack is not returned), practice stays 160 (a solved run pays none) |
| 10 | Death with no use left (spent 3): window in `danger` | Window text, computed colour, saved game, screenshot 06 | pass: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie 2.”, `rgb(255, 100, 103)`; the save holds `progressLost` generation 2; chest 10/6 → 7/4 after the entry |
| 11 | Death of a character with no practice | Window text, computed colour, saved game | pass: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.” in `text-secondary`; uses stay 0 spent, `deathSettlement {noPractice}` |
| 12 | Completion of the solved map (state at game minute 479, uses spent 1): window and chest after the exit | Window text, saved game, screenshot 07 | pass: „Skraj lasu rozwiązany”, „Do skrzynki: patyk 3, jagoda 2.”, chest 7/4 → 10/6, no line about a use returned, uses stay spent 1 |
| 13 | First solving of an unsolved map with a spent use: the line of the returned use | Window text, saved game | pass: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.” in `text-secondary`; uses spent 1 → 0 and the line at the character reads „użycia 3 z 3” |
| 14 | First solving of an unsolved map with a full stock | Window text | pass: no returned-use line; only „Do skrzynki: patyk 3, jagoda 2.” |
| 15 | States of the changed components required by the styleguide: window closed by Escape, focus back on „Koniec przejścia”, reopening; no overflow at 375 px; the window does not cover the menu bar | Page state, `document.activeElement`, `scrollWidth`, screenshots | pass: after Escape the window is hidden, the active element is „Koniec przejścia”, the solved line stays on the screen; the window at 375 px has no horizontal overflow; menu bar stands above the window in every screenshot. The line at the character in `text-secondary` and in `danger` seen in both. |
| 16 | Console | `playwright-cli console error` | pass: 0 errors, 0 warnings after the walk (two entries at the first load were the expected 401 of the account request) |
| 17 | Side observation | — | the solved line and „Wprawa w tym przejściu: Eksploracja +1” stand together on a solved run (see above); by D-215, not a fault |

Faults found: none. Every text and role the task requires was read from the rendered page and agreed with the required wording.

## Screenshots (looked at before pushing; only the made-up account, no address or token on any of them)

Repository `mariusznazar/screenshots`, branch `loop2/zapas-i-wskrzeszenie-correction-1`, directory `loop2/zapas-i-wskrzeszenie-correction-1/`, commit `5e0dee8a904c5e83627e254ecc72113506d8fc91`. Pushed by me with the `gh` account `mariusznazar`. No file of them in this repository or in the record directory.

1. Card of the solved map, character in „Kto idzie”, full stock: `![Card of the solved map Skraj lasu: line of the resurrection with uses 3 of 3, „Wejdzie: patyk 3, jagoda 2” and no warning under „Wejdź”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/01-card-solved-map.png?raw=true)`
2. Line of the resurrection, part (1 of 3, next in 3 godz. 10 min): `![Card of the solved map with the line „użycia 1 z 3, następne za 3 godz. 10 min czasu realnego”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/02-resurrection-line-part.png?raw=true)`
3. End-of-run window after a death covered by a use: `![End-of-run window after a death covered by a use: „Zużyte jedno użycie wskrzeszenia drużyny … zostały użycia 2 z 3 …”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/03-end-window-death-use-spent.png?raw=true)`
4. Line of the resurrection at zero uses, in `danger`: `![Card of the solved map with the line „użycia 0 z 3 … śmierć zabierze wprawę i wykupione stopnie” in red](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/04-resurrection-line-zero.png?raw=true)`
5. End-of-run window after a death with no use left, in `danger`: `![End-of-run window after a death with no use of the resurrection left: the character lost the practice, generation 2](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/06-end-window-death-no-use.png?raw=true)`
6. End-of-run window after the completion of a solved map: `![End-of-run window after the completion of a solved map: „Do skrzynki: patyk 3, jagoda 2.” and no line of a returned use](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/07-end-window-solved-completion.png?raw=true)`
7. Screen of a manual run on the solved map, with the new line (window closed): `![Screen of a run on a solved map with the line „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/08-run-screen-solved-line.png?raw=true)`
8. The zero-use line on a 375 px wide window: `![The card of the solved map at 375 px with the line of the resurrection at zero uses wrapped on three lines](https://github.com/mariusznazar/screenshots/blob/5e0dee8a904c5e83627e254ecc72113506d8fc91/loop2/zapas-i-wskrzeszenie-correction-1/09-resurrection-line-zero-narrow.png?raw=true)`

(A screenshot of the Postać screen taken mid-transition showed an unfinished Siedziba card; I dropped it and pushed no file of it. The Postać line was read as text.)

## Working copies

- `.runs/walk/` (composing script `compose.mjs`, the run-code files, state documents, the drive and role scripts) stood at `.runs/walk`; removed.
- The Playwright CLI working files and the screenshot originals stood in `.playwright-cli`; removed (the screenshots live only in the screenshots repository).
- The clone of the screenshots repository stood at `.runs/screenshots`; removed.
- Browser closed (`playwright-cli close`); the local game stopped (`npm run local:stop` said „Local starts stopped: 1”; no listener left on ports 53850 and 53851). The database of the start under `.runs/local-start/` stays by the skill's rule until the next start.
- No remainder.

## Unread material

none (read whole: `.the-way/task-cycle/change/walkthrough.md`, `.the-way/task-cycle/change/ui_check.md`, `.claude/skills/loop2-play/SKILL.md`, decisions D-417 to D-420 and D-215 from `foundations/decisions.md`; for the composing: `src/browser/sim/game.ts` lines 60-960 in part, `types.ts`, `trip.ts`, `data/maps.ts` and the parts of `view/trip-lines.ts`, `view/team-lines.ts`, `view/end-window-lines.ts` that carry the texts; of `guidelines/styleguide-browser-view.md` I read the rules of the screen Mapy and of the end-of-run window, not the whole file)

## Searches not found or unclear

none
