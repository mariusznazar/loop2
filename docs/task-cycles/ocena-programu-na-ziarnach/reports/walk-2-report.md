# Walk report 2 — correction 1 through the running game, task `ocena-programu-na-ziarnach`

**Status:** done. No case fell wrong; the game agrees with the task in every case walked. Cases or parts left unchecked are listed under "What I did not check".

Worktree `.`, head `c43c8ad7`. I changed no product code and wrote no test.

## Where I checked

- Windows 11 Pro 10.0.26300, Playwright CLI 0.1.22 (its own Chrome, one browser of this walk, closed at the end), the game of `npm run local` of this worktree at `https://127.0.0.1:63311` (a database of that start, made-up accounts `walker-a` and `walker-b` at `example.test`). Viewport 1280 x 1000.
- States were composed (loop2-play, "Compose a game state") with the game's own functions from `dist/browser/sim/` (`newGame`, `createCharacter`, `appendPrograms`, `send`, `startLoop`, `withSaveTime`, `savedGame`; `loadSavedGame` accepted each document before it was sent) and sent by `PUT /api/saved-game` from the signed-in page: two characters (Ala, Bob), the Understanding full, Skraj lasu solved, a chest of 30 sticks and 30 berries, and two programs added to the first one: „Szczelny" (`forestLoopWithStock` of `tests/sim/reference-programs.mjs`, solves 12 of 12 with 8 sticks) and „Naiwny" (`forestNaive`, 2 of 12). For cases 1-5 Bob stood in a manual map run on Skraj lasu (so the sentence of an open manual map run stood in both rows); for case 7 Bob stood in a loop caught up by the game on load (30 real hours).
- The state was read by the page (`innerText`, computed colours, `localStorage` keys and value shapes, a wrapper of `fetch` that logs the keys of each `PUT`), and by `GET /api/saved-game` (keys, content revisions, generations). Only shapes were printed; the account's identifier was reduced to its shape, no email or token was printed.

## What the correction alters (the user's words)

The marks and results of judging no longer travel with the saved game to the server; the browser remembers them. They stand while the program's content (rules, groups, their order, the plan of the trip) and the character's generation are what they were at the judging, and are lost on another device or after the browser's data is cleared. The sentence of an open manual map run in „Kto idzie" has a link to the run's screen. Shared code touched: the store's act path (judging, saves), the page's start of a game (made at the clock's moment) for a missing save, a refused version, a refused shape and „Zacznij od zera", the program saves (content revision), the row „Kto idzie".

## Plan and verdicts

| # | Case | By what | Verdict |
|---|---|---|---|
| 1 | A judging is remembered in the browser, not on the server: the mark stands after a reload; one `localStorage` value per triple under a key with the account's identifier and the game's moment, no email; the save sent holds no judging | click, reload, `localStorage` keys, `fetch` wrapper on `PUT`, `GET /api/saved-game` | passed. After judging Szczelny and Naiwny on Skraj lasu for Ala: two keys `loop2-judging-1\|<36-char identifier>\|<moment>\|1\|2\|forestEdge` and `…\|1\|3\|forestEdge`; the identifier is a 36-character id (no `@`), the moment equals the saved game's `madeAtMs`; each value holds the four fields `results`, `equipment`, `revision`, `generation` (12 letters, e.g. `ssssssssssss`). After a reload the badge „szczelny: 12 z 12" and the mark „2 z 12" stood. The `PUT` body of a save (7886 characters) holds version 9 and the keys `programs … saveTimeMs, madeAtMs` with no judging key and no word „judging"; the server's saved game holds no `judgings` key (checked at every later read, too) |
| 2 | The mark goes when the program changes; a rename keeps it; A→B→A does not bring it back | Programy screen, then „Kto idzie", `GET /api/saved-game` for the content revision | passed. Plan of the trip (Zabierz 8 → 7): mark gone (revision 0 → 1); back to 8: still no mark (revision 2, record of revision 0). Rename „Szczelny" → „Szczelny B": revision 2 unchanged, mark kept. Order of rules in a group (Naiwny, rule 1.5 down): its „2 z 12" gone (revision 1). Order of the groups (drag of group 5 to the top, Szczelny B): revision 3, mark gone. Value of a rule (Zapas poniżej 11 → 10): revision 4, mark gone. A judging between the steps put a mark with the new revision each time („1 z 12", „3 z 12") |
| 3 | A second account or a second game shows no mark of the first; the first account's game keeps its marks | second account in the same browser, return, „Zacznij od zera" | passed. Account B received the same document (same moment, same programs, same ids); A's value for Naiwny (revision 0, generation 1) would fit B's Naiwny, and B's Naiwny showed no mark; A's two values stayed in `localStorage`. Back in A: the mark „3 z 12" stood as before. „Zacznij od zera" (the control stood after I granted the previous-save privilege to account A in the local database with the operator command `account-previous-save.js grant`, since the control stands only with it, D-400): the page showed no characters, the server's save was null, `localStorage` held 0 keys (the values of the old game were removed at the opening of the new game's cache), console 0 errors |
| 4 | A failing storage changes nothing visible | init script making `window.localStorage` throw `SecurityError`, set per tab by a `sessionStorage` flag | passed. With reading `localStorage` throwing: „Oceń na 12 ziarnach" gave the twelve rows and the badge „szczelny: 12 z 12"; the badge stood after leaving for Programy and returning (the open page remembers it); after a reload no mark; console 0 messages throughout (no `uncaught`). I then removed the flag and reloaded: `localStorage` worked again (0 keys). A write that the browser refuses with the storage readable (quota) was not made |
| 5 | The second sentence of an open manual map run is a link to the run's screen | `innerText`, `href`, computed colour, click, „Zakończ" | passed. In both rows (Ala's and Bob's) of „Kto idzie" the sentence „Przejście na mapie Skraj lasu jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać." holds an `<a href="#/postac/2/przejscie">` over the second sentence only; its colour rgb(159, 159, 169) equals `--text-secondary` and the paragraph's, underlined; a click led to `#/postac/2/przejscie` (the run's screen, „Bob", „Wznów", „Zakończ"). The menu bar item „Wróć do przejścia · Skraj lasu · minuta 0" stood while the run was open. After „Zakończ" (no confirmation) the page went to Bob's screen, and on the card of Skraj lasu the sentence was gone in both rows, „Wejdź" for Ala usable, and the menu bar's „Wróć do przejścia" gone |
| 6 | A saved game of version 8 against the version 9 build | stored version of the local database set to 8, reload | passed: the sentence „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa." and a new game with no characters; console 0 messages (the game writes its `saved-game-load` line only for an error of the code, not for a refusal) |
| 7 | The judging result, the badge, „Puść w pętlę", „Puść mimo to" and the report „Gdy cię nie było" as the first walk found | Mapy, Siedziba | passed. Ala with Naiwny: „Oceń" not used; „Puść w pętlę" gave „Na 10 z 12 ziaren program mapy nie rozwiązuje." over „Puść mimo to" and the twelve rows (two „rozwiązane", ten „mag umarł z głodu w … minucie"; a cause the first walk did not reach); the second click started the loop („Pętla: Skraj lasu · przejście 1 · minuta 0 · domknięte 0"), the mark „2 z 12" stood. The report for Bob's loop after 30 real hours: „Bob: 1800 min · skrzynka: patyk −8, jagoda +3 · wprawa do odebrania: … · najdłużej bez śmierci: 3 przejścia z rzędu" (the form „3 przejścia", which the first walk did not read in the browser). Clearing the browser's data (`localStorage.clear()`) and reloading: the mark gone, the loop and the rest of the game as before (the "other device" cost) |
| 8 | Side observation | — | see below |

Console: `playwright-cli console` showed 0 messages at each read after the cases above (before the first sign-in it showed the ordinary 401 of the account request).

## What fell wrong

Nothing, by the cases above.

## What I did not check

- A write of the storage that the browser refuses while the storage can be read (quota full) and a storage that refuses `removeItem` or `key`: the cases of `judging-cache` in jsdom hold them; I blocked the storage as a whole only.
- A judging made on a character after a death that takes practice, a bought rank, or the deletion of a program (they erase the cached values through the generation and the content revision: the walk reached the revision, not the generation or the deletion); the version of a refused save of another browser (D-209, `afterRefusedSave`); a save that never reached the server leaving a cached value above the loaded game (`isAboveLoaded`).
- Case 7's parts the first walk already covered and this correction does not touch (colours of rows, the chest note „oceniono z zapasem…", the kitchen-sink page) were not repeated.
- Narrow widths, touch, other browsers than the Chrome of the CLI, another device (clearing the data stands in for it).
- Case 3 „Zacznij od zera" needed the previous-save privilege; I granted it to my own made-up account in this start's database. A player without the privilege has no such control.
- Case 5 was walked with the run paused at minute 0 (as the game loads it); a running run was not walked.

## Errors outside the task's scope and side observations

1. `playwright-cli eval` of a statement list (`localStorage.clear(); …`) fails with `SyntaxError` unless wrapped as an arrow function; only a note for whoever follows the skill, nothing of the game.
2. The sentence of the open manual map run also stands in the row of a character who is not in that run (Ala's row names Bob's run) and links to Bob's screen; that follows the task (the link leads to the screen of that run), and I noted it only as the link goes to another character's screen than the row's.
3. Dragging a group with `playwright-cli drag` of the snapshot's references did nothing (the draggable handle has no reference); `dragTo` on the handle's locator through `run-code` worked.

## Screenshots

Public repository `mariusznazar/screenshots`, branch `loop2/ocena-programu-na-ziarnach`, directory `loop2/ocena-programu-na-ziarnach/`, commit `bbba00c472a9de72208e9eb3cc571235c849a1b9` (author address checked: the private address of the owner's account, as the git rules of this machine allow in a public repository). The first run's seven images stand there too (`01`…`08`). Three new images, each inspected before the push; they show the game's screens only, no email, no password, no token (the menu bar shows only the button „Konto").

1. The link in the sentence of an open manual map run, in both rows of „Kto idzie" on Skraj lasu (grey, underlined second sentence): ![Skraj lasu, Kto idzie: zdanie o niezakończonym przejściu z odnośnikiem „Wróć do niego i je zakończ"](https://github.com/mariusznazar/screenshots/blob/bbba00c472a9de72208e9eb3cc571235c849a1b9/loop2/ocena-programu-na-ziarnach/09-odnosnik-otwarte-przejscie.png?raw=true)
2. A mark standing after a reload, read from the browser's cache: „szczelny: 12 z 12" beside the list „Program:" with no result under the character: ![Skraj lasu, Ala z programem Szczelny: odznaka „szczelny: 12 z 12" po odświeżeniu strony](https://github.com/mariusznazar/screenshots/blob/bbba00c472a9de72208e9eb3cc571235c849a1b9/loop2/ocena-programu-na-ziarnach/10-ocena-po-odswiezeniu.png?raw=true)
3. Siedziba, „Gdy cię nie było", the record of the loop in the form „3 przejścia z rzędu": ![Siedziba: raport Gdy cię nie było z „najdłużej bez śmierci: 3 przejścia z rzędu"](https://github.com/mariusznazar/screenshots/blob/bbba00c472a9de72208e9eb3cc571235c849a1b9/loop2/ocena-programu-na-ziarnach/11-raport-3-przejscia.png?raw=true)

## Unread material

- Read whole: `walk-2-handoff.md`, `walkthrough.md`, `ui_check.md`, `.claude/skills/loop2-play/SKILL.md`, `reports/walk-report.md` (the first walk), `reports/correction-1-remarks.md`, `src/browser/view/judging-cache.ts`, `a note in the author's private notes` and `git.md`.
- Read in part, for composing and diagnosis: `tests/sim/reference-programs.mjs` (lines 1-120 and 160-320, 410-430, 640-670), `src/browser/sim/judging.ts` (lines 30-140), `src/browser/sim/game.ts` (lines 380-445, 505-570, 775-805), `src/browser/sim/programs.ts` (lines 385-415, 486-520), `src/browser/sim/loop.ts` (lines 91-101), `src/browser/sim/understanding.ts` (lines 25-62), `src/browser/view/rule-drag.ts` and `rule-list.tsx` (the drag handlers), `src/browser/view/app.ts` (lines 55-100), `src/server/account-previous-save.ts` (lines 1-60), `src/server/database.ts` (the table `saved_games`).
- Not read: `cycle.md`, the foundation entries (D-441, D-442, D-400, D-402 and the rest; I took their content from the comments of the code and the handoff), `guidelines/styleguide-browser-view.md` (the grey role of the link was compared with the page's `--text-secondary` token, not against the styleguide's text), the diffs of the correction.

## Searches not found or unclear

- none

## Working copies

- Directory `.runs/walk-2/…` (under the worktree: composing scripts, the state documents, the screenshots, the clone `.runs/walk-2/screenshots/`): removed with `rm -rf` of its full path.
- `.playwright-cli/` under the worktree root: removed by its full path.
- The browser was closed (`playwright-cli close`), the local game ended with `npm run local:stop` (one start stopped).
- `.runs/local-start/` stays: the product's own database of the start, outside this rule; I changed it for the walk (two accounts, a stored version set to 8, the previous-save privilege granted to one account) and it ends with the next start.
- The branch `loop2/ocena-programu-na-ziarnach` of `mariusznazar/screenshots` stays on the remote with ten images, as the handoff gives; nothing of the walk was written into the repository of loop2.
