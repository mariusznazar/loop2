# Walk report — the running game, task `ocena-programu-na-ziarnach`

**Status:** done. No case fell wrong; the game agrees with the task in every case walked. Cases left unchecked are listed under "What I did not check".

Worktree `.`, head `f2d28489`. I changed no product code and wrote no test.

## Where I checked

- Windows 11 Pro 10.0.26300, Playwright CLI 0.1.22 (its own Chrome, one browser of this walk, closed at the end), the game of `npm run local` of this worktree at `https://127.0.0.1:53104` (a database of that start, a made-up account at `example.test`). The page of kitchen-sink: `npm run kitchen-sink -- --build-only`, the built `dist/kitchen-sink` served by a small static server of my own on `http://127.0.0.1:53795` (not `npm run kitchen-sink`, which opens the default browser of the computer).
- The state of the game was composed (loop2-play, "Compose a game state"): three characters (Ala, Bob, Cy) with the Understanding full, Skraj lasu solved (Las open and not solved), a chest of sticks and berries, and four programs made for the walk (listed below). The documents were built by the game's own functions (`newGame`, `createCharacter`, `appendPrograms`, `judgeAndRemember`, `startLoop`, `savedGame`) and sent by `PUT /api/saved-game`; `loadSavedGame` accepted each before it was sent. The state was read by the page (`innerText`, computed colours, an observer of the DOM and of frames) and by `GET /api/saved-game` (saved version, chest, judgings, loops, report).
- The four programs, each a variant of the settling program of `tests/sim/reference-programs.mjs` with the take list "stick 8", thresholds of the walk's own: „Szczelny” (solves all 12 seeds of Skraj lasu with 8 sticks in the chest), „Mieszany smierc” (7 of 12 solved, five deaths by cold, with 8 sticks), „Mieszany bez rozstrz” (8 of 12, four without a decision, with 8 sticks), „Wszystko bez rozstrz” (no decision on any seed). I found them by running `judgeOnSeeds` for the reference programs and variants on the built game before the walk.
- Where the Understanding is composed full, the judging runs the whole program; the new game's default program (empty, dies of cold on every seed) was walked by the executor of slice 10 and I did not repeat it.

## What the change alters (the user's words)

At each character of „Kto idzie” a button „Oceń na 12 ziarnach” gives a result of twelve rows; „Puść w pętlę” judges first, then starts the loop at once or asks for a second click („Puść mimo to”); the game remembers the last judging per character, program and map and shows a mark beside the list „Program:”; „Gdy cię nie było” ends a line with the loop record; the version of the save is raised (9 now, 8 before). Shared code the walk touched: the store's act path (clock, saves), the loop start, the Siedziba report, the shared button states in kitchen-sink.

## Plan and verdicts

| # | Case | By what | Verdict |
|---|---|---|---|
| 1a | The button „Oceń na 12 ziarnach” at each character on a solved map (Skraj lasu), beside „Wejdź” and „Puść w pętlę” | snapshot and `innerText` of the card | passed |
| 1b | The same on a map not yet solved (Las): button beside „Wejdź”, no „Puść w pętlę” | snapshot, `disabled` of the buttons | passed |
| 1c | The waiting text „Oceniam…”, the button disabled; „Puść w pętlę” keeps its text during its own judging | observer on the row plus `requestAnimationFrame` log | passed: the button read „Oceniam…”, `disabled`, `aria-busy="true"` from +1 ms to +31 ms with a frame at +1 ms and one at +31 ms, then „Oceń na 12 ziarnach”; at „Puść w pętlę” the label stayed „Puść w pętlę” (disabled, no `aria-busy`) for its 25 ms, then read „Puść mimo to” |
| 2a | A result with deaths: rows „Ziarno {i}: mag zamarzł w {m}. minucie” in `danger`, heading „Ocena na 12 ziarnach: 7 z 12 rozwiązanych” in `text-strong`, the sentence in `text-secondary` | `innerText`, computed colours against the tokens of the page | passed (rgb 255,100,103 = `--danger`; 244,244,245 = `--text-strong`; 159,159,169 = `--text-secondary`); texts word for word; no first fire, no entry tile, no summarising sentence |
| 2b | A result with all twelve solved: heading „12 z 12 rozwiązanych”, rows „Ziarno {i}: rozwiązane” in `positive`, badge „szczelny: 12 z 12” in `positive` beside the list „Program:” | same | passed (rgb 0,188,125 = `--positive` on rows and badge) |
| 2c | A result with rows without a decision: „Ziarno {i}: bez rozstrzygnięcia po 4000 minutach” in `warning`, not counted as solved (8 of 12 with 4 undecided, 0 of 12 with 12) | same | passed (rgb 254,154,0 = `--warning`); it can be made in the running game with a program that keeps the mage alive and loses the streak (the cap of 4000 game minutes is reached by the judging) |
| 2d | Deaths by hunger and by combat | — | unchecked: only deaths by cold came from the programs I made; the texts of the other two causes stand in `tests/view/judging-lines.test.mjs` |
| 3a | „Puść w pętlę” with a program that solves all twelve: the loop starts at once | click, row text, `GET /api/saved-game` | passed (Ala with „Szczelny”: „Pętla: Skraj lasu · przejście 1 …”, `loops` holds her loop, no „Puść mimo to”) |
| 3b | „Puść w pętlę” with a program that fails: result under the character, „Na {k} z 12 ziaren program mapy nie rozwiązuje.” in `warning` above the button, the button „Puść mimo to” (label too), the loop not started; the second click starts it | click, row text, computed colour, save | passed: Ala with „Wszystko bez rozstrz” read „Na 12 z 12 ziaren …” (k = unsolved seeds), Bob with „Mieszany smierc” read „Na 5 z 12 ziaren …” and, with an empty chest, „Na 2 z 12 …”; the button had the focus, `loops` did not hold the loop before the second click and did after; the chest lost 6 sticks at the second click (the take list cut by the chest) |
| 4a | A result from the button of a judging stands, then „Puść w pętlę” with the same result: the loop starts at once, the result stays | click, row text, save | passed (Bob, 7 of 12 with 8 sticks: the loop started at the first click, the same twelve rows stayed under him) |
| 4b | A standing result from the button, the chest changes, then „Puść w pętlę”: the new result replaces the old one and waits | click, row text | passed (Bob judged 7 of 12 with 8 sticks; Cy's loop took the 8 sticks; „Puść w pętlę” at Bob judged again to 10 of 12, replaced the rows, showed „Na 2 z 12 ziaren …” and „Puść mimo to”) |
| 4c | A result left by an earlier „Puść w pętlę” is no result of the button of a judging (the fix of finding I-1) | click, row text | passed (Bob: first click, „Puść mimo to”, „Zatrzymaj”, „Puść w pętlę” again on the same rows: the sentence and „Puść mimo to” came again; the loop did not start at once) |
| 5a | The mark „{n} z 12” and the note „oceniono z zapasem, którego dziś nie ma w skrzynce” (`warning`) when the chest lacks what the judging took; the badge goes out; a 12 of 12 loses the badge and keeps „12 z 12” with the note | row text, computed colour | passed (Ala: after her loop took the sticks, „12 z 12” in `text` with the note in `warning`, no „szczelny”; Bob „7 z 12” and Cy „8 z 12” with the note) |
| 5b | A chest with more than the judging took leaves the result as it was | row text after a composed chest of 40 sticks with a judging of 8 | passed („szczelny: 12 z 12”, no note) |
| 6a | A judging takes nothing from the chest; it does not change the program used last or the pick of the list „Program:” | `GET /api/saved-game` before and after | passed: chest 30/30 and 14/14 stayed, `lastUsedPrograms` `{}` and `lastEnteredProgram` `null` after three judgings, the picks stayed (after the loop start they were cleared and `lastUsedPrograms` set, as D-243 gives for a send) |
| 6b | The earning loop and the manual map run of the character judged go on | save, the page of the run | passed: Bob judged while in a loop (loop seed, minute, run number, completed unchanged in the saved game; the judging was remembered); Cy judged while her manual run stood (minute 11 before and after, the run paused and unchanged on its screen); the button stayed active and „Wejdź” and „Puść w pętlę” were inactive with the sentence about the unfinished map run |
| 6c | The result stands only while the card stays: it is gone after leaving for another screen or a reload; the mark stays | click, reload | passed |
| 6d | The mark stands only in „Kto idzie” | `innerText` of Siedziba, Postać, Programy, Wiedza for „szczelny”, „ z 12” and „Ocen” (a positive control on the card was true) | passed |
| 6e | The save holds the kinds of the twelve results and the equipment, no cause and no minute | `GET /api/saved-game` | passed (`results: ["solved","death",…,"undecided"]`, `equipment: [{"item":"stick","count":8}]`; the whole save of three characters with four programs and three judgings measured 10 002 characters) |
| 7a | Saving a program with another plan or another rule order erases the mark; a rename does not | Programy screen, then the card | passed (Cy's program: rename kept „8 z 12”; „Zabierz: liczba” 8 to 7 erased it; Bob's program: moving a rule down in a group erased his „10 z 12”) |
| 7b | A death that takes practice and ranks erases all the judgings of the character, on every map; a death covered by a resurrection does not | composed loops caught up by the game on load (100 hours) | passed: Cy died uncovered („pętla stanęła po 729 min — śmierć bez wskrzeszenia …”) and her three judgings (two programs, two maps) were gone from the save and the card; Ala's and Bob's stayed, and Bob's covered deaths showed „wskrzeszenie zużyte” |
| 8 | „Gdy cię nie było” on Siedziba: „ · najdłużej bez śmierci: {n} przejść z rzędu” at the end of the line of a loop that goes on | composed loops, 30, 100 and 150 real hours before the load, so the game's catch-up ran | passed: „1 przejście”, „4 przejścia”, „5 przejść”, „8 przejść”; after „ · wskrzeszenie zużyte” (Bob, 100 hours); no number at 0 (Cy at 30 and 150 hours); no number on a line stopped by a death; plain `text`, no mark. The form „3 przejścia” was not read in the browser (a unit case holds it) |
| 9 | Kitchen-sink: the row „Przycisk oceny” in the seven states | `innerText` and `disabled`, `aria-busy`, colour of the buttons | passed: default, hover, focus, disabled with „Oceń na 12 ziarnach”; error and empty with „Nie dotyczy: …”; loading disabled, `aria-busy="true"`, reading „Oceniam…” (rgb 82,82,92 like the disabled cell) |
| 10 | An old save (version 8) | database of the local start | passed. The server refused `PUT` of version 8 (`409 save-outdated`, „Zapis pochodzi ze starszej wersji gry.”), so I set the stored row to version 8 in the database of this local start with `node:sqlite` and reloaded: the page said „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” and showed a new game with no characters. The saved version is 9 now; the task text says 7 and the handoff 8, which only mean the version before the change |
| 11 | Side observation | — | see below |

Console: `playwright-cli console error` after the walk of the game showed 0 errors, none of `uncaught` or `saved-game-load`; the kitchen-sink page showed only the 404 of the favicon.

## What fell wrong

Nothing, by the cases above.

## What I did not check

- Deaths by hunger and by combat in a result (2d), the form „3 przejścia” of the record (8), the slice-12 paths of the old save other than the version: crafted judgings refused by the load (D-206), the deletion of a program that deletes its judgings, the death by a manual map run that erases the judgings (only the death of a loop was walked), and a bought rank that leaves the judgings: unit cases hold them, the walk did not reach them.
- The second click removed by picking another program or by leaving the card (the cases of slice 11 in jsdom hold it; the walk reached the replacement of a result and the return of the wait after a stop, not these two).
- Focus after the judging (the executors' jsdom cases), narrow widths and touch, other browsers than the Chrome of the CLI, a slow device (the judging took about 25-30 ms here, so the wait was one frame; a longer judging was not made).
- The new game's default program: not repeated; the Understanding of my composed states is full, so a judging of a program that needs a rule the player has not discovered was not walked.
- The size of the save against 64 KiB with many characters, programs and maps: measured only the one document above (10 002 characters with 3 judgings); the larger measurement is the cycle's.

## Errors outside the task's scope and side observations

1. At the width of 1280 px, at a character of a solved map, the sentence „Na {k} z 12 ziaren program mapy nie rozwiązuje.” stands to the right of „Oceń na 12 ziarnach” and the button „Puść mimo to” wraps under it (screenshot 05); it stands above the button, as the task says, but the buttons „Wejdź” and „Oceń na 12 ziarnach” and the sentence share one line. Cosmetic; no case fails on it.
2. At a character whose own manual map run stands, „Wejdź” on the card is inactive and the sentence says „Przejście na mapie Skraj lasu jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” I found no link in the row to that run and reached it by the address `#/postac/3/przejscie`. I do not know whether this existed before the change.
3. The waiting state „Oceniam…” stands for one or two frames, because the judging of twelve seeds takes about 25-30 ms here; the player sees a flicker at most. That is the measure the executors gave too.

## Screenshots

Pushed to the public repository `mariusznazar/screenshots`, branch `loop2/ocena-programu-na-ziarnach`, directory `loop2/ocena-programu-na-ziarnach/`, commit `5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d` (author address checked: the private address of the owner's account, as the git rules of this machine allow in a public repository). Seven images, each inspected before the push; they show the game's screens and the page of kitchen-sink only, a made-up state, no address, no password, no token.

1. A solved map, a result with all twelve rows solved and the badge „szczelny: 12 z 12” beside the list „Program:”: ![Skraj lasu: ocena 12 z 12 rozwiązanych, odznaka „szczelny: 12 z 12” przy liście Program](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/01-szczelny-12-z-12.png?raw=true)
2. Rows of deaths in red and rows without a decision in orange, with the marks „7 z 12” and „8 z 12”: ![wynik z wierszami śmierci i wierszami bez rozstrzygnięcia](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/03-bez-rozstrzygniecia-8-z-12.png?raw=true)
3. The note „oceniono z zapasem, którego dziś nie ma w skrzynce” beside „12 z 12”, „7 z 12” and „8 z 12”, three characters, two in a loop: ![marks with the note about the stock the chest no longer has](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/04-zapas-dopisek.png?raw=true)
4. The first click of „Puść w pętlę” on a program that solves no seed: the sentence in orange over „Puść mimo to”, the result under the character: ![Na 12 z 12 ziaren program mapy nie rozwiązuje, przycisk Puść mimo to](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/05-puszcz-mimo-to.png?raw=true)
5. A map not yet solved (Las): the button „Oceń na 12 ziarnach” beside „Wejdź”, no „Puść w pętlę”, a result with deaths: ![Las, mapa nierozwiązana: Wejdź i Oceń na 12 ziarnach, wynik 9 z 12](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/06-mapa-nierozwiazana.png?raw=true)
6. Siedziba, „Gdy cię nie było”, the loop record at the end of the lines („5 przejść z rzędu”, „8 przejść z rzędu”, none at 0): ![raport Gdy cię nie było z rekordem pętli](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/07-raport-rekord-petli.png?raw=true)
7. The page of kitchen-sink, the row „Przycisk oceny” in the seven states, the loading state „Oceniam…”: ![strona wszystkich stanów, wiersz Przycisk oceny](https://github.com/mariusznazar/screenshots/blob/5ddb284aa8f3ddd9a3d8d75c1d70f1428307611d/loop2/ocena-programu-na-ziarnach/08-kitchen-sink-przycisk-oceny.png?raw=true)

(The file numbers are 01, 03, 04, 05, 06, 07, 08; 02 was a duplicate of 03 and was removed before the push.)

## Unread material

- `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`: read whole. The four executors' reports named in the handoff: read whole. `walkthrough.md`, `ui_check.md`, `.claude/skills/loop2-play/SKILL.md`: read whole.
- Not read: the other slices' and the reviewers' reports and handoffs, `cycle.md`, the foundation entries (D-243, D-440 and the rest) and `guidelines/styleguide-browser-view.md` (the colour roles I compared to were the ones the task text gives, read from the computed styles of the page against the tokens of the page, not against the styleguide), `.claude/skills/loop2-balance/SKILL.md` (read its first 80 lines only, to find the reference programs).
- Read in part, for the composing: `tests/sim/reference-programs.mjs` (lines 1-91 and 190-320), `balance/engine.mjs` (lines 30-200), `src/browser/sim/judging.ts` (first 150 lines), `src/browser/sim/loop.ts` (lines 95-135 and 586-640), `src/browser/sim/game.ts` (about line 769), `src/browser/view/app.ts` (lines 40-70), `src/server/database.ts` (the tables), `scripts/kitchen-sink.mjs` (first 60 lines).

## Searches not found or unclear

- none

## Working copies

- Directory for working copies `.runs/walk/` under the worktree (composing scripts, the state documents, my helper scripts, the screenshots, the clone `.runs/walk/screenshots/` of the screenshots repository, the logs): removed with `rm -rf` of its full path; `ls .runs` afterwards shows `local-start`, `quality-venv` and `task-cycles` only.
- `.playwright-cli/` under the worktree root (snapshots, console logs, the state documents sent): removed by its full path. `dist/kitchen-sink/` (build output of the page, ignored by git): removed by its full path.
- The browser was closed (`playwright-cli close`), the local game ended with `npm run local:stop` (one start stopped), and the static server of kitchen-sink on port 53795 was stopped (checked: no port of the three is listening).
- `.runs/local-start/` stays: the product's own database of the start, outside this rule; I changed one row of it for case 10 (the stored version set to 8), and it ends with the next start.
- The branch `loop2/ocena-programu-na-ziarnach` of `mariusznazar/screenshots` stays on the remote with the seven images, as the handoff gives; nothing of the walk was written into the repository of loop2 (`git status` of the worktree is clean).
