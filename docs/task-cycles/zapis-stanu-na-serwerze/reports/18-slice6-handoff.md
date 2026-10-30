# Handoff — Slice 6 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 6**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `6aae1e7`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `same` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/18-slice6-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** for the cycle (`src/server/**`, `src/browser/sim/saved-game.ts`); your
  slice's files are not on a trust boundary the part map names.
- Irreversible operation: **yes** for the cycle (schema step 4, Slice 2), not in your slice.

## Done before you

- Foundation entries (`fb1ef9d`, D-97 fixed in `59cd18a`): plan row 7 is D-184 (moments of
  saving), row 8 D-185 (what the player sees of saving), row 9 D-186, row 10 D-187, row 11 D-188,
  row 12 D-97, row 3 D-180, row 13 D-96, row 14 D-189, row 16 D-04, row 19 D-156, row 22 `expired-session-unsaved-progress`, row 32 `fetch-keepalive-body-quota`, row 33 `visibilitychange-hidden-last-event`.
- Slice 1 (`b36292e`): `src/browser/sim/saved-game.ts` — the saved document of a game state and
  the load.
- Slices 2–3 (`bbf6ad2`, `fc6540c`): `GET` and `PUT /api/saved-game` on the server.
- Slice 4 (`adb13fb`): the client's save methods in `src/browser/account-api.ts`, with their typed
  outcomes and the local too-large refusal over 65 536 bytes; tests in `tests/account-api.test.mjs`.
  Read the methods and their outcome types there before building on them. Its executor notes that
  no test can pin `keepalive: true`; your saver is the client's caller, so do not drop it.
- Slice 5 (`6aae1e7`): `src/browser/view/game-saver.ts`, tests in `tests/view/game-saver.test.mjs`.
  Read its exported interface there before building on it. Its executor's concern, for you to close
  in the page: after a save before logout reports that logout can go on, the saver's own 30-second
  check keeps running until the page disposes it; if that check fires while the page's
  `POST /api/logout` is in flight and a map run is passing, its save may get 401 and call
  `onSignedOut`, so the expired-session path could start during logout (found by reading the code;
  no test shows it). Close it, e.g. by disposing the saver or ignoring `onSignedOut` while logout is
  under way, with a test. Its executor also left two points unsettled (its report, *Searches not
  found or unclear*): every check during a request in flight sends nothing; what a saver already
  ended by a conflict or a missing session answers before logout — settle the second in the page
  from the task's To do 10 and spec decision 8, and name your choice.

## Your section of the plan (copied word for word from plan.md)

### Slice 6 — The page builds the game from the saved game state

- **Goal:** the page follows spec decisions 7 and 8 and gives the saver of Slice 5 its moments.
  `src/browser/view/app.ts`: after `GET /api/account` names an account or a form signs in, the page
  keeps „Sprawdzanie logowania…” and asks for the saved game state; only its answer builds the
  game — `null` a new game, a save the load function of Slice 1, a failed or uncertain answer the
  client's sentence with „Spróbuj ponownie” repeating both requests, 401 the forms; the request
  numbering covers the new request. A refused load builds a new game, puts above it, once, „Zapis
  pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (`version`, `archetype`)
  or „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (`shape`), a confirmation
  notice first where one stands, and saves the new game at once based on the server's revision. A
  conflict drops the game, shows the waiting screen, asks again and builds from the answer with
  „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” in the header slot until the
  first successful save; a refused load there takes the refused-load path. A 401 on a save keeps
  the current state as a document with the account's identifier and the last revision in a page
  variable — never in browser storage — disposes the game and shows the forms with „Sesja wygasła.
  Zaloguj się ponownie, aby zapisać postęp.” above them; a sign-in whose account `id` equals the
  kept one skips the request, builds from the kept document through the load function with the
  kept revision, drops it and calls one moment at once; another `id` drops it. „Wyloguj” goes
  through the saver's save before logout with each outcome of decision 8, and after an outdated
  outcome or with the saver stopped the forms show „Gra została zaktualizowana. Odśwież stronę.”
  where the expiry sentence stands. The header slot stands under the title and „Wyloguj”, in
  `warning`, above the D-157 row, hidden when empty; the confirmation notice stands above the game
  on whatever screen it opens. `src/browser/view/game-view.ts`: `createGameView` takes the state and
  revision it starts from and the page's callbacks, creates and disposes the saver, calls a moment
  after every act of the player whose result changed the state (decision 6's list) and after a game
  minute that ends the map run in a death or a completion, and lands where the state says — the
  headquarters, a map run paused, or the screen after a map run's end. `src/browser/styles.css`
  changes only where the header slot or the one-time notice needs a rule of its own.
  `tests/view/account-screen.test.mjs`, where the tests of `startApp` stand, gives its controlled
  client the save methods and gains a case for each of these paths, the case of the kept state
  marked `invariant: expired-session-unsaved-progress` (a 401 on a save keeps the state, the same
  account's sign-in sends it, another account's drops it); its existing cases change only where the
  new request changes what they wait for.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-28` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:65-94` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-149` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:155-180` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:182-208` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:288-299` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:228-295` 6. The browser's saver: one request at a time, every moment coalesced ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:297-324` 7. The page: session, then the saved game state, then the game ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:326-353` 8. Expired session, the same account, and logout ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker ·
  Foundation entries row 3 · Foundation entries row 6 · Foundation entries row 7 ·
  Foundation entries row 8 · Foundation entries row 9 · Foundation entries row 10 ·
  Foundation entries row 11 · Foundation entries row 12 · Foundation entries row 13 ·
  Foundation entries row 14 · Foundation entries row 16 · Foundation entries row 19 ·
  Foundation entries row 22 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:748-761` D-36 ·
  `foundations/decisions.md:793-806` D-39 · `foundations/decisions.md:868-881` D-44 ·
  `foundations/decisions.md:979-996` D-51 · `foundations/decisions.md:1022-1042` D-53 ·
  `foundations/decisions.md:1185-1198` D-62 · `foundations/decisions.md:1608-1624` D-91 ·
  `foundations/decisions.md:1726-1737` D-96 · `foundations/decisions.md:1739-1752` D-97 ·
  `foundations/decisions.md:1799-1810` D-101 · `foundations/decisions.md:1909-1920` D-109 ·
  `foundations/decisions.md:2334-2356` D-129 ·
  `foundations/decisions.md:2414-2437` D-132 · `foundations/decisions.md:2528-2541` D-137 ·
  `foundations/decisions.md:2556-2569` D-139 · `foundations/decisions.md:2815-2828` D-156 ·
  `foundations/decisions.md:2830-2843` D-157 · `foundations/decisions.md:3066-3079` D-173 ·
  `foundations/invariants.md:35-43` browser-view-framework ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/invariants.md:868-876` player-server-session ·
  `foundations/invariants.md:888-896` email-confirmation-link ·
  `foundations/glossary.md:18-23` map run · `foundations/glossary.md:131-135` manual map run ·
  `foundations/glossary.md:87-92` headquarters · `foundations/glossary.md:137-141` completion ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:175-179` copy ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/account-api.ts` · `src/browser/sim/game.ts` · `src/browser/view/clock.ts` ·
  src/browser/sim/saved-game.ts (made in Slice 1) · src/browser/view/game-saver.ts (made in Slice 5) ·
  `src/browser/view/account-screen.ts` · `src/browser/view/email-confirmation.ts` ·
  `src/browser/view/email-status.ts` · `src/browser/view/status-row.ts` ·
  `src/browser/view/headquarters.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/main.ts`
- **Model:** same — it joins the simulation's load, the client and the saver into the page's flows
  across three parts.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` (its case "a 401 on a save keeps the
  state, and a sign-in to the same account sends it and returns to the game from it" written first,
  failing) · `npm test -- tests/view/email-confirmation.test.mjs` ·
  `npm test -- tests/view/email-status.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 4 · Slice 5 · Foundation entries rows 3, 6, 7, 8, 9, 10, 11, 12,
  13, 14, 16, 19, 22

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 3 → `foundations/decisions.md:3220-3235` D-180 — What happens to unsaved progress when a session expires?
- plan row 6 → `foundations/decisions.md:3291-3315` D-183 — What happens to a saved game state of another version?
- plan row 7 → `foundations/decisions.md:3317-3356` D-184 — When does the game save the game state on the server?
- plan row 8 → `foundations/decisions.md:3358-3394` D-185 — What does the player see of saving the game state?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 11 → `foundations/decisions.md:3467-3498` D-188 — What does the player see when a save of the game state finds no session?
- plan row 12 → `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- plan row 13 → `foundations/decisions.md:1745-1758` D-96 — What does a player see before and after signing in?
- plan row 14 → `foundations/decisions.md:3500-3536` D-189 — How does a manual map run come back from a loaded saved game state?
- plan row 16 → `foundations/decisions.md:57-103` D-04 — What is the game built with?
- plan row 19 → `foundations/decisions.md:2835-2848` D-156 — How does an emailed link confirm a player's email address?
- plan row 22 → `foundations/invariants.md:958-966` expired-session-unsaved-progress
- `foundations/decisions.md:57-103` D-04 — What is the game built with?
- `foundations/decisions.md:766-779` D-36 — Which file is the exemplar for browser modules?
- `foundations/decisions.md:811-824` D-39 — What do the signal colours of the browser view mean?
- `foundations/decisions.md:886-899` D-44 — Which controls do the screens of the browser view build on?
- `foundations/decisions.md:997-1014` D-51 — What team does a new game start with?
- `foundations/decisions.md:1040-1061` D-53 — Where does the player send a character from, and where does „Zakończ” lead?
- `foundations/decisions.md:1204-1217` D-62 — What does the screen show, and what can the player do, after a character's death?
- `foundations/decisions.md:1627-1643` D-91 — What program does a new game start with?
- `foundations/decisions.md:1745-1758` D-96 — What does a player see before and after signing in?
- `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- `foundations/decisions.md:1820-1831` D-101 — How long do independent browser sessions last?
- `foundations/decisions.md:1930-1941` D-109 — What identity authorizes an account request?
- `foundations/decisions.md:2355-2377` D-129 — How long does the pace the player picks stay?
- `foundations/decisions.md:2435-2458` D-132 — What does the screen show, and what can the player do, after a completion?
- `foundations/decisions.md:2548-2561` D-137 — How does the operator block and unblock a player account?
- `foundations/decisions.md:2576-2589` D-139 — What does the login of a blocked account tell the player?
- `foundations/decisions.md:2835-2848` D-156 — How does an emailed link confirm a player's email address?
- `foundations/decisions.md:2850-2863` D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- `foundations/decisions.md:3086-3099` D-173 — What can the player do with the copy after a map run ends?
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:818-826` account-client-outcomes
- `foundations/invariants.md:868-876` player-server-session
- `foundations/invariants.md:888-896` email-confirmation-link
- `foundations/glossary.md:18-23` map run
- `foundations/glossary.md:131-135` manual map run
- `foundations/glossary.md:87-92` headquarters
- `foundations/glossary.md:137-141` completion
- `foundations/glossary.md:157-161` blocked account
- `foundations/glossary.md:175-179` copy

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/account-api.ts`
- `src/browser/sim/game.ts`
- `src/browser/view/clock.ts`
- src/browser/sim/saved-game.ts (made in Slice 1)
- src/browser/view/game-saver.ts (made in Slice 5)
- `src/browser/view/account-screen.ts`
- `src/browser/view/email-confirmation.ts`
- `src/browser/view/email-status.ts`
- `src/browser/view/status-row.ts`
- `src/browser/view/headquarters.ts`
- `src/browser/view/controls/button.ts`
- `src/browser/view/controls/text-field.ts`
- `src/browser/main.ts`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-28` To do

5. Zapis niesie numer wersji swojego kształtu, a gra wczytuje w całości tylko zapis o bieżącej wersji; zapis każdej innej wersji, zapis, którego postać ma archetyp nieobecny w danych, i zapis o złym kształcie gra odrzuca w całości, razem z programami gracza, i zaczyna dla gracza grę od nowa (wpis projektowany „What happens to a saved game state of another version?”, `save-version/1`; pytanie 10). Po odrzuceniu zapisu innej wersji albo z archetypem spoza danych gracz widzi jednorazowe zdanie w roli `warning`: „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 7); po odrzuceniu zapisu o złym kształcie widzi w tym samym miejscu, tak samo jednorazowo, własne zdanie w roli `warning`: „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 21). Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje wtedy w roli `warning` „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać (pytanie 4).
6. Po zalogowaniu i po przeładowaniu strony z ważną sesją — także w innej przeglądarce niż ta, w której gracz grał — gra wczytuje zapis konta; konto bez zapisu zaczyna nową grę z pustą drużyną i pustą grupą „Program” (D-51, D-91). Gra powstaje dopiero, gdy serwer odda zapis albo powie, że go nie ma; brak odpowiedzi albo odpowiedź niepewna daje ostrzeżenie i „Spróbuj ponownie”, jak przy sprawdzaniu sesji (D-96) — nigdy nową grę (pytanie 7). Wczytane trwające ręczne przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu, a gracz rusza je przyciskiem „Wznów”; czas od zapisu do wczytania go nie przesuwa (pytanie 8; wobec wpisów o doliczaniu, które zapisze zadanie 18 — pytanie 15, droga B: doliczanie rusza od stanu wczytanego, a kod tego zadania niczego nie dolicza). Wczytane przejście zakończone domknięciem albo śmiercią postaci, którego ekranu gracz nie zamknął, wraca na ekran po swoim końcu — z „Restart” i „Zakończ” i z kopią programu, którą gracz dalej edytuje i zapisuje, aż wybierze jedno z nich (D-62, D-132, D-173 bez zmian; pytanie 23, droga A). Gracz, w którego zapisie jest ręczne przejście, trafia po zalogowaniu i po przeładowaniu strony z ważną sesją do tego przejścia: trwające wraca zatrzymane pauzą, a zakończone — na ekran po swoim końcu; tak mówi punkt 4 zakresu definicji i wpis projektowany D-96, który zapisuje cykl (pytania 20, 22 i 23). Wynik potwierdzenia adresu z odnośnika stoi u zalogowanego gracza nad grą, na jakimkolwiek ekranie się ona otwiera — także na przejściu z zapisu (wpis projektowany D-156, który zapisuje cykl; pytanie 22).
7. Gra zapisuje stan na serwerze automatycznie: zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie (pytanie 1). Gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie (pytanie 2). Odmowa za dużego zapisu (punkt 4) to osobny przypadek: gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu z początku tego punktu; w nagłówku, w miejscu zdania o nieudanym zapisie, stoi w roli `warning`: „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” i znika po pierwszym udanym zapisie (pytanie 18).
8. Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie (pytania 3 i 16).
9. Gdy sesja wygaśnie w trakcie gry, przeglądarka zachowuje niezapisany stan gry, a po ponownym zalogowaniu na to samo konto gra ponawia jego zapis (wpis projektowany „What happens to unsaved progress when a session expires?”, `expired-session-unsaved-progress/1`). Gdy serwer odpowie na zapis, że sesji nie ma, gra znika z ekranu (jej czas staje), wracają formularze konta, a nad nimi zdanie w roli `warning`: „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”; niezapisany stan zostaje w pamięci strony. Po zalogowaniu na to samo konto gra wysyła ten stan i wraca do gry od niego — gdy jest w nim ręczne przejście, gracz trafia do tego przejścia jak w punkcie 6: trwające zatrzymane pauzą, zakończone na ekranie po swoim końcu (pytanie 5, część z cytatu o lądowaniu); po zalogowaniu na inne konto niezapisany stan przepada i gra wczytuje zapis tamtego konta; przeładowanie albo zamknięcie strony przed zalogowaniem gubi niezapisany stan — nic nie trafia do pamięci trwałej przeglądarki (pytanie 5).
10. „Wyloguj” najpierw zapisuje bieżący stan (przycisk w tym czasie: „Wylogowywanie…”), potem kończy sesję. Gdy zapis się nie uda z braku połączenia albo błędu serwera, wylogowanie nie następuje: gra zostaje z ostrzeżeniem w roli `warning` „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; gdy serwer odrzuci zapis jako starszy od zapisu z innej przeglądarki (punkt 8), wylogowanie idzie dalej (pytanie 6). Gdy serwer odrzuci zapis karty ze starszym kodem gry (punkt 5), wylogowanie też idzie dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”, w tym samym miejscu co zdanie z punktu 9 (pytanie 17). Gdy odrzuci zapis jako za duży (punkt 4), „Wyloguj” wylogowuje mimo tej odmowy (pytanie 18). Gdy odpowie na zapis, że sesji nie ma — sesja wygasła albo konto zablokowano (D-137) — dzieje się to, co w punkcie 9: formularze konta ze zdaniem „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” i niezapisany stan w pamięci strony do zalogowania na to samo konto (pytanie 19).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:65-94` Questions to settle

- 5. Gdy sesja wygaśnie w trakcie gry: co gracz widzi, co dzieje się z grą do ponownego zalogowania, co przy zalogowaniu na inne konto i czy niezapisany stan przetrwa przeładowanie strony? (Q5)
  - Answer, część z cytatu: do ponownego zalogowania przeglądarka zachowuje niezapisany stan, po zalogowaniu na to samo konto gra ponawia zapis, a pod innym kontem tego stanu nie zapisuje — definicja, „(new) — What happens to unsaved progress when a session expires?”: “If a player's session expires while the game runs, the browser keeps the unsaved game state. After the player signs in again to the same account, the game retries saving that state.”; *Rejected:* “saving it under a different account — crosses the account ownership boundary.”; punkt 3 In scope: „Gdy wygaśnie podczas gry, niezapisany postęp pozostaje w przeglądarce do ponownego zalogowania na to samo konto i ponowienia zapisu.”
  - Source: `definicja_mvp_loop2.md`, linie 30, 455–456, 470–471, sha256 3e9c2cc9146b, Status: approved 2026-10-28; cytat zachowany przez człowieka (C1): Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” (tura 9).
  - Answer, reszta: droga A: gdy serwer odpowie na zapis, że sesji nie ma, gra znika z ekranu (jej czas staje), wracają formularze konta, a nad nimi zdanie w roli `warning`: „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”; niezapisany stan zostaje w pamięci strony. Po zalogowaniu na to samo konto gra wysyła ten stan i wraca do gry od niego; po zalogowaniu na inne konto niezapisany stan przepada i gra wczytuje zapis tamtego konta; przeładowanie albo zamknięcie strony przed zalogowaniem gubi niezapisany stan (nic nie trafia do pamięci trwałej przeglądarki). Przyjęty koszt: niezapisany postęp przeżywa tylko w otwartej karcie; ponowienie może przegrać z zapisem z innej przeglądarki (pytanie 3).
  - Not chosen:
    - B — jak A, ale niezapisany stan trafia też do pamięci trwałej przeglądarki (`localStorage`) przy tym koncie i przeżywa przeładowanie — na wspólnym komputerze stan zostaje dla następnej osoby; nowa droga kodu i nowa decyzja o pamięci przeglądarki.
    - C — gra zostaje na ekranie i biegnie dalej, ze zdaniem w roli `warning` i przyciskiem „Zaloguj się ponownie”, który otwiera formularz — dalszy postęp też jest niezapisany; nowy układ ekranu, formularz obok gry.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A reszty pytania Q5, w pakiecie jako D5 (tura 9).
  - Answer, część z cytatu o lądowaniu (odpowiedź A nie mówi, czy ręczne przejście w stanie wysłanym po ponownym zalogowaniu wraca na pauzie): ponowne zalogowanie po wygaśnięciu sesji to zalogowanie adresem i hasłem, więc gracz, w którego stanie jest ręczne przejście, trafia do tego przejścia — trwające zatrzymane pauzą, zakończone na ekranie po swoim końcu. Definicja, punkt 4 In scope: „Zalogowany gracz trafia do siedziby, a gdy w jego zapisie jest ręczne przejście — do tego przejścia: trwające wraca zatrzymane pauzą, a zakończone domknięciem albo śmiercią postaci — na ekran po swoim końcu.”; wpis projektowany D-96: “signing in with email and password and reloading with a valid session also lead to the headquarters, or, when the saved game state holds a manual map run, to that map run — paused while it goes on, or on its screen after its end when it ended in a completion or in the character's death.”
  - Source: `definicja_mvp_loop2.md`, linia 31 i § Projected foundation changes › Decisions, „D-96 — What does a player see before and after signing in?”, sha256 fda97782458d, Status: approved 2026-10-29, odcisk 934f56c6 (znaczenie D-96 zatwierdził człowiek: Mariusz, 2026-10-29, „przyjmuję propozycje”, tura 25 rozmowy refinementu); sprawę wskazała obserwacja O1 agenta bramki definicji (tura 22). Cytat do pokazania człowiekowi razem z całym dokumentem (tura 31).
- 6. Co dzieje się z niezapisanym postępem gry w przeglądarce, gdy gracz się wyloguje? (Q6; pytanie otwarte planu przypisane temu zadaniu)
  - Answer: droga A: „Wyloguj” najpierw zapisuje bieżący stan (przycisk w tym czasie jak dziś: „Wylogowywanie…”), potem kończy sesję. Gdy zapis się nie uda z braku połączenia albo błędu serwera, wylogowanie nie następuje: gra zostaje z ostrzeżeniem w roli `warning` „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; gdy serwer odrzuci zapis jako starszy od zapisu z innej przeglądarki (pytanie 3), wylogowanie idzie dalej, bo tego postępu i tak nie da się zapisać. Przyjęty koszt: jedno żądanie więcej przy wylogowaniu.
  - Not chosen:
    - B — niezapisany postęp zostaje w pamięci strony i trafia na serwer po ponownym zalogowaniu na to samo konto, jak przy wygaśnięciu sesji — wylogowany gracz zostawia stan w karcie dla następnej osoby przy tym komputerze (przy drodze B pytania 5 — także w pamięci trwałej).
    - C — postęp od ostatniego zapisu przepada — przy drodze A pytania 1 to najwyżej ostatnie 30 s realnych przejścia: 30 minut gry przy 1×, do 480 minut gry (całe przejście Lasu) przy 16×; przy drodze D pytania 1 najwyżej 30 minut gry; przy drodze B pytania 1 — do całego przejścia.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q6, w pakiecie jako D6 (tura 9).
- 7. Co gracz widzi po zalogowaniu, gdy zapisu nie da się pobrać, i gdy gra odrzuca zapis innej wersji albo z archetypem spoza danych? (Q7)
  - Answer, część z cytatu: zapis innej wersji gra odrzuca w całości i zaczyna grę od nowa; zapis z archetypem spoza danych też odrzuca w całości — definicja, „(new) — What happens to a saved game state of another version?”: “The game discards a saved game state of any other version in full, including the player's programs, and starts the player anew. A saved game state whose character names an archetype missing from the data is also discarded whole.”
  - Source: `definicja_mvp_loop2.md`, linie 862–864, sha256 3e9c2cc9146b, Status: approved 2026-10-28; cytat zachowany przez człowieka (C2): Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” (tura 9).
  - Answer, reszta: droga A: gra powstaje dopiero, gdy serwer odda zapis albo powie, że go nie ma; brak odpowiedzi albo odpowiedź niepewna daje ostrzeżenie i „Spróbuj ponownie”, jak dziś przy sprawdzaniu sesji — nigdy nową grę. Zapis odrzucony daje nową grę (D-51, D-91) i jednorazowe zdanie w roli `warning`: „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” Przyjęty koszt: D-96 dostaje zdanie o zapisie; jeden komunikat więcej.
  - Not chosen:
    - B — jak A, ale odrzucenie bez słowa — gracz widzi pustą drużynę bez wyjaśnienia i może uznać to za błąd.
    - C — gdy zapisu nie da się pobrać, gra startuje od nowa — pierwszy zapis tej nowej gry nadpisze zapis na serwerze, więc gracz traci postęp przez chwilową awarię; wbrew temu, co D-96 robi przy sprawdzaniu sesji.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A reszty pytania Q7, w pakiecie jako D7 (tura 9).
- 8. Co gracz widzi po wczytaniu zapisu, w którym trwa ręczne przejście mapy, i czy czas od zapisu do wczytania przesuwa to przejście? (Q8; dotyczy też zadania 18)
  - Answer: droga A: przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu; czas nieobecności go nie przesuwa — ani teraz, ani po zadaniu 18; gracz rusza je przyciskiem „Wznów”. Przyjęty koszt: jedno kliknięcie po każdym wczytaniu z trwającym przejściem. Ta odpowiedź wiąże też zadanie 18, które zapisuje wpisy o doliczaniu — jak zapisać ją wobec ich brzmienia w definicji: pytanie 15.
  - Not chosen:
    - B — przejście wraca dokładnie w stanie z zapisu, biegnie dalej, jeśli biegło; czas nieobecności go nie przesuwa — gracz logujący się na innym urządzeniu może przegapić odkrycie, napaść albo śmierć postaci w pierwszych sekundach.
    - C — od zadania 18 doliczanie przesuwa też trwające ręczne przejście o czas nieobecności (w jakim tempie — do ustalenia w zadaniu 18), a do tego czasu przejście wraca jak w A — przejście, które gracz rozwiązuje jak zagadkę i ogląda (uzasadnienie D-21: “so the player still watches the program act”), domyka się albo kończy śmiercią postaci pod jego nieobecność; przy 1× zamknięcie karty na 8 minut kończy przejście Lasu; zadanie 18 dostaje dodatkowy wymóg.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q8, w pakiecie jako D8 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-149` Questions to settle

- 16. Czy przeglądarka, której zapis serwer odrzucił, bo w międzyczasie zapisała inna przeglądarka, po wczytaniu zapisu z serwera gra dalej i zapisuje jak zwykle — i czy trwające ręczne przejście wraca wtedy zatrzymane pauzą? (Q16)
  - Answer: droga A: po wczytaniu gra toczy się dalej od wczytanego zapisu i zapisuje jak zwykle; trwające ręczne przejście wraca zatrzymane pauzą, jak po zalogowaniu (odpowiedź 8), więc karta, która przegrała, sama nie zapisuje, dopóki gracz czegoś w niej nie zrobi; zdanie znika po pierwszym udanym zapisie. Wiersz 3 i punkt 8 To do w brzmieniu tej drogi. Przyjęty koszt: gracz, który gra na zmianę w dwóch otwartych kartach, przy każdej zmianie karty traci pierwsze działanie w karcie, do której wrócił (jego zapis dostaje odmowę), i widzi zdanie; a gdy w drugiej karcie biegnie przejście (zegar ukrytej karty biegnie dalej, `src/browser/view/clock.ts:31`–`33`), traci też każde następne działanie zrobione później niż 30 s po wczytaniu — wtedy znów wczytanie, pauza i zdanie — aż jedno zapisze się z powodzeniem; jedno kliknięcie „Wznów”, gdy przejście wróciło na pauzie.
  - Not chosen:
    - B — jak A, ale wczytane przejście biegnie dalej, jeśli biegło — karty zapisują się na zmianę i odrzucają nawzajem, także karta, w której gracz właśnie gra, dopóki stara karta jest otwarta: gdy gracz w drugiej karcie akurat nic nie robi, zapis starej karty przechodzi, a najbliższy zapis karty, w której gra, dostaje odmowę — gracz widzi zdanie i traci ostatnie działanie, choć karty nie zmieniał.
    - C — po wczytaniu przeglądarka nie zapisuje do odświeżenia strony, zdanie dostaje dopisek „Odśwież stronę.”, a „Wyloguj” w tej karcie wylogowuje bez zapisu — gracz, który gra dalej w tej karcie, gra bez zapisu, a cały ten postęp przepada przy zamknięciu karty; zmienia zdanie przyjęte w odpowiedzi 3.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja A pytania Q16 rozmowy refinementu, drogi w brzmieniu tury 14 z poprawką kosztu z tury 17 (tura 19).
- 17. Co robi „Wyloguj”, gdy serwer odrzuci zapis przed wylogowaniem, bo karta ma starszy kod gry (zapis wersji niższej niż ta, którą serwer trzyma)? (Q17)
  - Answer: droga C: wylogowanie idzie dalej, jak przy odmowie z pytania 3, bo postępu starej karty i tak nie da się zapisać; karta, która już przestała zapisywać, wylogowuje się bez próby zapisu; nad formularzami konta zostaje zdanie z pytania 4 w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” (w tym samym miejscu, w którym odpowiedź 5 stawia „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”). Przyjęty koszt: postęp starej karty od jej ostatniego udanego zapisu przepada; jeden stan formularzy więcej; fałszywy alarm zostaje możliwy — gracz, który mimo zdania zaloguje się w starej karcie bez odświeżenia, dostaje od starego kodu „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.”, choć zapis na serwerze jest cały.
  - Not chosen:
    - A — wylogowanie idzie dalej, jak przy odmowie z pytania 3, bez słowa o aktualizacji — postęp starej karty od jej ostatniego udanego zapisu przepada; gracz widzi formularze konta bez słowa o aktualizacji, więc łatwo zaloguje się w tej samej karcie i trafi na fałszywy alarm „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.”, choć zapis na serwerze jest cały.
    - B — wylogowanie nie następuje; karta pokazuje „Gra została zaktualizowana. Odśwież stronę.” i gracz musi odświeżyć stronę, żeby się wylogować — „Wyloguj” w starej karcie nie działa; gracz przy wspólnym komputerze, który nie odświeży strony, zostaje zalogowany.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja C pytania Q17 rozmowy refinementu, drogi w brzmieniu tury 14 (tura 19).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:155-180` Questions to settle

- 19. Czy przy zapisie przed wylogowaniem, na który serwer odpowie, że sesji nie ma (wygasła albo konto zablokowano), obowiązuje odpowiedź na pytanie 5? (Q19)
  - Answer: tak (droga A), w obu przypadkach — przy wygasłej sesji i przy zablokowanym koncie: formularze ze zdaniem „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”, niezapisany stan w pamięci strony do zalogowania na to samo konto. Przyjęty koszt: gracz, który chciał wyjść, dostaje prośbę o ponowne zalogowanie; stan zostaje w pamięci karty — niewidoczny, przepada przy przeładowaniu i przy zalogowaniu na inne konto, ale do tego czasu jest w karcie; dla zablokowanego gracza zdanie „Sesja wygasła…” jest nieprawdziwe, przy logowaniu zobaczy „To konto jest zablokowane.” (D-139), a stan przepadnie z kartą — to samo dotyczy każdego zapisu po blokadzie, nie tylko tego przed wylogowaniem.
  - Not chosen:
    - B — w obu przypadkach wylogowanie kończy się jak dziś: formularze bez zdania, niezapisany stan przepada — przy wygaśnięciu przeczy wpisowi projektowanemu („the browser keeps the unsaved game state”), więc wymaga zmiany definicji jej procesem, z bramką gotowości i ponownym sprawdzeniem planu, do których końca nie rusza żaden cykl zadania planu i żadne zadanie nie staje się gotowe; postęp od ostatniego zapisu przepada.
    - C — A przy wygaśnięciu sesji, B przy blokadzie konta — serwer musi odróżnić sesję usuniętą blokadą od wygasłej, a dziś nie może, bo blokada sesje usuwa (D-137); trzeba by pamiętać usunięte sesje albo oznaczać je zamiast usuwać, co D-137 odrzuca wprost, więc zmiana D-137 w cyklu, nowy stan w bazie i dwa zachowania zamiast jednego.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja A pytania Q19 rozmowy refinementu, drogi w brzmieniu tury 17 (tura 19); obok wpisu projektowanego „What happens to unsaved progress when a session expires?” (`definicja_mvp_loop2.md`, linie 455–456, sha256 3e9c2cc9146b), który droga A dotrzymuje.
- 20. Gdzie gracz ląduje po zalogowaniu, gdy w jego zapisie trwa ręczne przejście, wobec D-96 i zdania zakresu definicji „Zalogowany gracz trafia do siedziby.”? (Q20)
  - Answer: droga A: wyjątek trafia do definicji — zdanie zakresu (`definicja_mvp_loop2.md`, linia 31) brzmi „Zalogowany gracz trafia do siedziby, a gdy w jego zapisie trwa ręczne przejście — do tego przejścia, zatrzymanego pauzą.”; cykl zmienia D-96 tak samo (wiersz 8). Przyjęty koszt: zmiana zatwierdzonej definicji z bramką gotowości i ponownym sprawdzeniem planu; do ich końca nie rusza żaden cykl zadania planu i żadne zadanie nie staje się gotowe, a cykl, który ruszy przed bramką, biegnie dalej. Bramka rusza po starcie cykli zadań 9 i 13 — kiedy, pyta człowieka orkiestrator projektu.
  - Not chosen:
    - C — odpowiedź 8 zmienia się w tym miejscu: po zalogowaniu gracz trafia do siedziby, a trwające przejście czeka na pauzie za przyciskiem „Wróć do przejścia” — nowy stan ekranu (siedziba widoczna przy trwającym przejściu, czego kod dziś nie zna) i nowy przycisk, a z nimi nowe pytanie, co gracz może robić w siedzibie, gdy przejście czeka (zakładać postacie, wysłać inną); zmienia przyjętą odpowiedź 8.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja A pytania Q20 rozmowy refinementu, drogi w brzmieniu tury 17 (tura 19). Stan: definicja zmieniona i zatwierdzona ponownie na bramce gotowości 2026-10-29 (odcisk 934f56c6), z linią 31 w brzmieniu pytania 23, które rozszerza tę odpowiedź o przejście zakończone; zmianę D-96 niesie wpis projektowany definicji, nie wiersz 8 (pytanie 22); plan sprawdzony ponownie i przekazany na nowo 2026-10-29 (Mariusz, „potwierdzam”, tura 30).
- 21. Jakie zdanie widzi gracz, gdy gra odrzuci zapis o złym kształcie przy bieżącej wersji (pytanie 10) — to samo co po odrzuceniu zapisu innej wersji (pytanie 7), czy własne? (Q21)
  - Answer: droga B: własne zdanie w roli `warning`, w tym samym miejscu i tak samo jednorazowe: „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” Przyjęty koszt: jeden komunikat więcej w kodzie i w testach.
  - Not chosen:
    - A — to samo zdanie co w odpowiedzi 7 — gracz dostaje nieprawdziwy powód; zgłaszając problem, mówi o wersji, a chodzi o błąd.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja B pytania Q21 rozmowy refinementu, drogi w brzmieniu tury 17 (tura 19).
- 22. Gdzie zapisać zmiany D-96 i D-156, które wywołuje nowe zdanie zakresu — obie w wierszach zadania 16, czy obie jako zmiany projektowane w definicji? (Q22 w brzmieniu tury 24; postawione przez bramkę definicji)
  - Answer: droga B: obie jako zmiany projektowane w definicji — D-156 w brzmieniu, które w niej stoi („… above the account forms for a signed-out player and above the game for a signed-in one, whatever screen the game opens on.”), i D-96 w pełnym brzmieniu z tury 24, w wariancie drogi A pytania 23; plan przy ponownym sprawdzeniu przypisuje ich zapis zadaniu 16; wiersz 8 traci część o D-96, a oba wpisy stoją w *Decisions in play*. D-96 zmienia cykl tego zadania, jak postanowiła odpowiedź na pytanie 20. Przyjęty koszt: D-96 zmieniają w jednym cyklu dwa źródła — wpis projektowany (lądowanie) i wiersz 7 (zdanie o wczytywaniu zapisu), które cykl scala w jednym wpisie; jeden wpis więcej do zgody w bramce; przeróbka wiersza 8.
  - Not chosen:
    - A — obie zmiany w wierszach zadania 16: D-96 w wierszu 8, D-156 w nowym wierszu obok niego, a projektowana zmiana D-156 wypada z definicji — zatwierdzona definicja przeczy D-96 i D-156, a nic w niej nie mówi, że te decyzje się zmienią; wie o tym tylko dokument zadania 16, więc agent sprawdzający plan i refinerzy innych zadań (np. 18) zobaczą sprzeczność, a jej rozwiązanie znajdą dopiero w tym dokumencie; odstępstwo od trzech sposobów, którymi bramka domyka kolizję, oparte na przydziale człowieka.
  - Source: Mariusz, 2026-10-29, „przyjmuję propozycje” — odpowiedź na pytanie „Czy przyjmujesz Q23 A, Q22 B i znaczenie zmian D-156 i D-96?” (tura 25 rozmowy refinementu; drogi w brzmieniu tury 24); wpisy w definicji `definicja_mvp_loop2.md`, § Projected foundation changes › Decisions, sha256 fda97782458d, odcisk 934f56c6; przydział w planie `plan_mvp_loop2.md`, sha256 30396fc20aff, Projected entries, wiersze 81–82 (`D-156 … | 16, 20 | 16`, `D-96 … | 15, 16 | 16`).
- 23. Dokąd trafia po zalogowaniu i przeładowaniu gracz, w którego zapisie stoi ręczne przejście już zakończone — domknięciem albo śmiercią postaci — którego ekranu gracz jeszcze nie zamknął przyciskiem „Restart” ani „Zakończ”? (Q23; obserwacja W1 krytyki bramki definicji, tura 23)
  - Answer: droga A: gracz wraca na ekran po końcu przejścia, jak go zostawił; zdanie zakresu (`definicja_mvp_loop2.md`, linia 31) brzmi „Zalogowany gracz trafia do siedziby, a gdy w jego zapisie jest ręczne przejście — do tego przejścia: trwające wraca zatrzymane pauzą, a zakończone domknięciem albo śmiercią postaci — na ekran po swoim końcu.”; D-62, D-132 i D-173 zostają bez zmian. Przyjęty koszt: zdanie zakresu odchodzi od dosłownego brzmienia odpowiedzi na pytanie 20 (sens dla przejścia trwającego bez zmian); zmiana D-96 szersza o ten przypadek; To do 6 i wiersz 8 obejmują przejście zakończone.
  - Not chosen:
    - B — zdanie zakresu zostaje, a wczytanie zamyka zakończone przejście tak jak „Zakończ”: gracz trafia do siedziby — projektowane zmiany trzech decyzji, D-62, D-132 i D-173, w tej samej bramce, ze zgodą człowieka na każdą; kod zamykający przejście przy wczytaniu; po każdym przeładowaniu po śmierci albo domknięciu gracz traci niezapisane zmiany kopii (bez linii „Niezapisane zmiany w kopii.”, która dziś ostrzega przed „Zakończ”) i możliwość „Restart” na tym samym ziarnie.
  - Source: Mariusz, 2026-10-29, „przyjmuję propozycje” — ta sama odpowiedź (tura 25 rozmowy refinementu; drogi w brzmieniu tury 24); definicja zmieniona tak w turze 26 (sha256 fda97782458d).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:182-208` Context

## Context

- Kod loop2 w commicie b8ac134: stan gry to typ `GameState` (`src/browser/sim/types.ts:279`) — lista programów gracza, Zrozumienie, liczniki reguł, drużyna ze skrzynką, trwające przejście (`run`) z kopią programu, pauza, tempo, rozwiązane mapy, odkrycie i niewykorzystane milisekundy; nową grę daje `newGame` (`src/browser/sim/game.ts:155`), a widok gry zaczyna od niej przy każdym zbudowaniu (`src/browser/view/game-view.ts:47`).
- Strona buduje grę dopiero, gdy serwer potwierdzi sesję (`src/browser/view/app.ts:87`–`99`, `showGame`); w `src/browser/` nic nie czyta ani nie zapisuje `localStorage`, `sessionStorage` ani `indexedDB` (loop2 b8ac134).
- Serwer przyjmuje dziś treść JSON żądania zmieniającego stan do 16 KiB (`src/server/transport.ts:82`, loop2 b8ac134), zgodnie z D-104: “an application/json body with at most 16 KiB”.
- Pomiar refinera 2026-10-29 na loop2 4bfb962, przed zadaniem 12, które dołożyło do stanu listę programów i kopię (przeglądarkowa część zbudowana z tego commitu): stan gry z programem 17 reguł z testu akceptacyjnego Lasu (`tests/sim/acceptance.test.mjs:43`) i pełnym Zrozumieniem ma jako JSON 4665 bajtów w minucie 0 przejścia Lasu i 4727 bajtów w minucie 480; w siedzibie z 20 postaciami i bez przejścia — 4107 bajtów. Pomiar nie obejmuje listy programów (zadanie 12), drzew umiejętności (zadanie 10), planu wyprawy (zadanie 13) ani pętli zarobkowych (zadanie 18), które stan powiększą.
- Schemat bazy kont: na `main` wersja 3 (`src/server/database.ts:78`, liczba kroków schematu, loop2 b8ac134) — trzecią wersję, ze stanem potwierdzenia adresu i odnośnikami z wiadomości, wniosło zadanie 20.
- Blokada konta usuwa wszystkie sesje konta (D-137), więc zablokowany gracz w trakcie gry dostaje przy najbliższym zapisie tę samą odmowę co przy wygaśnięciu sesji, a przy ponownym logowaniu — „To konto jest zablokowane.” (D-139); dokument zadania 19 zapowiada: „gracz zablokowany w trakcie gry gra więc w przeglądarce dalej, aż do przeładowania strony albo wylogowania, a od zadania 16 — do najbliższego zapisu.”
- Wdrożenie loop2 odtwarza oba kontenery projektu (skill `loop2-deploy`, `.claude/skills/loop2-deploy/SKILL.md`), więc każde kolejne wdrożenie wymienia kontener aplikacji; baza leży w wolumenie `loop2_accounts`, którego agent nie czyta.
- D-17, *Verification*: “Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage.” — niezmiennik `account-save-durable-storage` ma dziś „Violated: yes”.
- W loop zapis niesie oprócz numeru wersji chwilę zapisu (`savedAtMs`), z której liczy się nieobecność, a odczyt odrzuca tekst niebędący JSON-em, `null`, zapis innej wersji i zapis bez chwili zapisu (testy loop `src/sim/sim.test.ts:1969`–`1998`, loop cdc7c0d); chwila zapisu służy doliczaniu nieobecności z zadania 18.
- Plan (dziennik zmian 2026-10-13, linia 197) dopisał temu zadaniu pytanie o wczytanie wobec zdania wpisu projektowanego „What is the game built with?”; w fundamencie stoi już D-04 w brzmieniu zmienionym przez zadanie 3, więc pytanie 10 pyta o D-04.
- Zadanie 15 zostawiło temu zadaniu sprawę niezapisanego postępu przy wylogowaniu: „K2 kończy się na „po czym wraca ekran formularzy, a gry z przeglądarki nie widać”, a co dzieje się z niezapisanym postępem przy wylogowaniu, ustala zadanie 16 razem z zapisem.” (Mariusz, 2026-10-26; `_zadania/konta_graczy_i_logowanie_loop2.md`, pytanie 16).
- Przejście biegnie z prędkością minuty gry na sekundę realną razy tempo (D-21: “one game minute per real second times the pace”); przejście Lasu to 480 minut gry — 8 minut realnych przy 1×, pół minuty przy 16× (uzasadnienie D-21, `foundations/decisions.md:436`–`438`, loop2 b8ac134).
- Doliczanie nieobecności wnosi zadanie 18; wpis projektowany „When and how is the time away computed?” mówi: “The catch-up takes place when the player returns and advances the missed game minutes, taking the characters one at a time, each to the end, in the order of the player's list of characters.”, pojęcie `catch-up`: “The catch-up is the computing of the game minutes that passed while the game was closed.”, a niezmiennik `catch-up-state/1` porównuje stan postaci po doliczeniu ze stanem “after the game runs without a break over that span” (`definicja_mvp_loop2.md`, linie 897–898, 2145–2147 i 2300, sha256 fda97782458d).
- Pauza jest dziś jednym polem całego stanu gry (`paused`, `src/browser/sim/types.ts:306`), a `passRealTime` nie przesuwa niczego, gdy gra stoi na pauzie (`src/browser/sim/game.ts:371`–`385`, loop2 b8ac134); przejście wczytane na pauzie (punkt 6) nie rusza się więc, dopóki gracz nie kliknie „Wznów”.
- Od zadania 12 słowo „zapis” w grze znaczy też zapis kopii programu w programie — przyciski „Zapisz w programie” i „Zapisz jako nowy program” i wiersz „Niezapisane zmiany w kopii.” (D-164, D-171, D-172; `src/browser/view/program-panel.ts:220`–`224`, loop2 b8ac134); to co innego niż zapis stanu gry na serwerze, a kopia ze swoimi niezapisanymi zmianami jest częścią stanu gry.
- Od zadania 12 gracz zmienia stan gry także działaniami na liście programów i na kopii — „Nowy program”, „Zmień nazwę”, „Usuń”, zapis kopii, „Porzuć zmiany”, „Przełącz postać na ten program” (D-167, D-171, D-174).
- W nagłówku pod tytułem i „Wyloguj” stoi od zadania 20 wiersz niepotwierdzonego adresu (D-157) — w tym samym miejscu staje zdanie o nieudanym zapisie z punktu 7.
- Kontrola skilla wdrożenia (WAY-139) dotyczy tego zadania: zadanie zmienia dane, które działający produkt trzyma na serwerze (zapisy stanu gry w bazie `loop2_accounts`) i wersję schematu tej bazy, a to zmienia, co wycofanie robi z danymi. Skill `loop2-deploy` mówi dziś: “The application keeps player accounts and sessions in a SQLite database in the named Docker volume `loop2_accounts`” i w § „Rollback”: “A rollback changes code, never data. The accounts, sessions and session-key file stay as they are” — o zapisach stanu gry nic (`.claude/skills/loop2-deploy/SKILL.md:9`–`10`, `:217`–`218`, loop2 b8ac134); pozostałe punkty listy WAY-139 — podgląd wdrożeń, sekrety, podział agent–człowiek, logi — zadanie zostawia bez zmian. Zadania 19 i 20 zostawiły takie dopiski u siebie (`blokada_konta_loop2.md`, punkt 6 To do; `potwierdzenie_adresu_loop2.md`, punkt 11 To do).
- Przed zamknięciem fazy „Konta na serwerze testowym” konto zakłada tylko właściciel (plan `plan_mvp_loop2.md`, faza „Konta na serwerze testowym”: „przed zamknięciem fazy konta zakłada tylko on”); ile kopii bazy zachować i czy zmieszczą się na Strychu, ustala zadanie 17 (pytanie otwarte planu).
- Każde scalenie do `main` wdraża się samo (D-11). Pierwsze wdrożenie gałęzi tego zadania (H1) przenosi bazę serwera testowego na wersję 4 schematu, a kod z `main` sprzed scalenia tego zadania zna tylko wersję 3, więc odmawia bazy i nie wstaje (kod 8; `.claude/skills/loop2-deploy/SKILL.md:221`–`227`, `references/troubleshooting.md:116`–`118`, loop2 b8ac134). Od H1 do scalenia tego zadania nie scala się więc do `main` nic innego. Czynności człowieka w cyklu robi się przy zablokowanym szkicu requestu, zanim człowiek go przejrzy (`.the-way/task-cycle/skill/SKILL.md:103`–`107`, `:367`–`368`), a po H2 cykl dokłada jeszcze zdjęcie znacznika (punkt 14), więc okno trwa od H1 przez przegląd i poprawki aż do scalenia; scala człowiek, więc to on pilnuje, żeby w tym czasie nie scalić innego requestu — w tym oknie mogą czekać cykle zadań 10 i 13 (plan `plan_mvp_loop2.md`, sha256 44f443454fdd: `ready for cycle`; zadanie 9 scalone 2026-10-29, `done`). Skill zna już taką zasadę dla przejścia na tunel: „From H3 until completion and merge, merge nothing else to `main`.” (`references/setup_and_secrets.md:37`).
- Drugie zdanie D-04 opisuje symulację jako “pure functions that take a game state and a span of game minutes and return the next game state together with the events it produced”; funkcja wczytania z punktu 11 nie bierze ani stanu gry, ani odcinka minut i oddaje stan albo odmowę. Dzisiejsze `newGame` i `send` też od tego zdania odbiegają, więc to nie nowa sprzeczność; cykl, zmieniając D-04, ocenia też to zdanie wobec funkcji wczytania.
- Zdanie zakresu definicji „Zalogowany gracz trafia do siedziby.” zmieniło się procesem definicji według odpowiedzi na pytania 20 i 23, a definicja dostała zmiany projektowane D-96 i D-156 (pytanie 22); bramka gotowości przeszła 2026-10-29 (`definicja_mvp_loop2.md`, sha256 fda97782458d, odcisk 934f56c6), a plan, sprawdzony ponownie, przekazano na nowo tego samego dnia (plan `plan_mvp_loop2.md`, sha256 30396fc20aff, dziennik zmian, linie 287–292).
- Kod loop2 b8ac134: panel przejścia stoi, a siedziba jest schowana, dopóki stan gry ma przejście (`state.run`), także po domknięciu i po śmierci postaci aż do „Zakończ” (`src/browser/view/game-view.ts:143`, `:157`–`158`); komunikat potwierdzenia adresu stoi nad całym elementem gry (`src/browser/view/app.ts:96`: `main.replaceChildren(...noticeElements(), game.element)`).
- Drogi pod *Not chosen* w Questions to settle stoją w brzmieniu i z kosztami, z jakimi człowiek je widział: pytania 1–12 i 14 z tur 2 i 5 rozmowy refinementu (pakiety w turach 7 i 9), pytania 15–21 z tur 14 i 17 (pakiet w turze 19), pytania 22 i 23 z tury 24 (odpowiedź w turze 25), pytanie 13 z pytania Q5 rozmowy refinementu zadania 19; człowiek przyjmował drogi według rekomendacji, bez własnego powodu, więc przy każdej niewybranej drodze stoi koszt podany w pytaniu.
- Rozmowa refinementu: `C:\Storage\repos\loop2\.runs\project-refinement\zapis-stanu-na-serwerze.md`.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:288-299` Settlements to record

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gra zapisuje stan gry na serwerze automatycznie: zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie. | decision | pytanie 1 (A; Mariusz, 2026-10-29) | kiedy przeglądarka wysyła zapis — przycisk, chwile działań gracza czy rytm w trakcie przejścia, w sekundach realnych czy minutach gry — i czy próbuje zapisu przy zamykaniu karty |
| 2 | Gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie; gdy serwer odrzuci zapis jako za duży, gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu, a w miejscu tamtego zdania stoi w roli `warning` „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” aż do pierwszego udanego zapisu. | decision | pytanie 2 (A; Mariusz, 2026-10-29) i pytanie 18 (A; Mariusz, 2026-10-29); w tym samym miejscu nagłówka stoi wiersz niepotwierdzonego adresu D-157; chwile zapisu — wiersz 1 | czy gracz widzi udany zapis, gdzie i jakim zdaniem widzi nieudany i czy gra sama ponawia zapis |
| 3 | Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie. | decision | pytanie 3 (B; Mariusz, 2026-10-29) i pytanie 16 (A; Mariusz, 2026-10-29), które daje temu wierszowi to brzmienie; to reguła, której wymaga uzasadnienie wpisu projektowanego „How does the browser exchange saved game states with the server?”: “resolving two browsers' conflicting saves still requires a separate game rule” | czy wygrywa ostatni zapis, czy serwer odrzuca zapis przeglądarki, która nie widziała ostatniego, co wtedy widzi gracz i czy po wczytaniu ta przeglądarka zapisuje dalej, a przejście biegnie |
| 4 | Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. | decision | pytanie 4 (B; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to a saved game state of another version?”, który zostaje bez zmian, i D-07 (serwer porównuje tylko numer wersji) | czy serwer przyjmuje każdy zapis, także karty ze starszym kodem, która może nadpisać zapis nowszej wersji, i co widzi gracz w starej karcie |
| 5 | Gdy serwer odpowie na zapis, że sesji nie ma, gra znika z ekranu (jej czas staje), wracają formularze konta, a nad nimi zdanie w roli `warning`: „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”; niezapisany stan trzyma pamięć strony, a nie pamięć trwała przeglądarki, więc przeładowanie albo zamknięcie strony przed zalogowaniem go gubi; po zalogowaniu na to samo konto gra wraca do gry od tego stanu, a po zalogowaniu na inne konto ten stan przepada i gra wczytuje zapis tamtego konta. | decision | reszta pytania 5 (A; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to unsaved progress when a session expires?” i `expired-session-unsaved-progress/1`, które mówią resztę — przeglądarka zachowuje stan, po zalogowaniu na to samo konto gra ponawia jego zapis, a pod innym kontem go nie zapisuje | czy gra biegnie dalej, co gracz widzi, co z niezapisanym stanem przy innym koncie i czy stan trafia do `localStorage` |
| 6 | „Wyloguj” najpierw zapisuje bieżący stan (przycisk w tym czasie: „Wylogowywanie…”), potem kończy sesję; gdy zapis się nie uda z braku połączenia albo błędu serwera, wylogowanie nie następuje i gra zostaje z ostrzeżeniem w roli `warning` „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; gdy serwer odrzuci zapis jako starszy od zapisu z innej przeglądarki albo jako za duży, wylogowanie idzie dalej; gdy odrzuci zapis karty ze starszym kodem gry, wylogowanie też idzie dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”; gdy odpowie, że sesji nie ma, bo sesja wygasła albo konto zablokowano, wracają formularze ze zdaniem „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”, a niezapisany stan zostaje w pamięci strony do zalogowania na to samo konto, jak w wierszu 5. | decision | pytanie 6 (A; Mariusz, 2026-10-29), pytanie 17 (C), pytanie 18 (A) i pytanie 19 (A) (Mariusz, 2026-10-29); zmienia D-97 — dokłada zapis przed wylogowaniem, którego D-97 nie rozstrzyga (uzasadnienie: “not the preservation of unsaved progress”) | czy wylogowanie zapisuje stan, czy kończy sesję mimo nieudanego zapisu, co robi przy każdej odmowie zapisu i czy niezapisany postęp zostaje w karcie |
| 7 | Gra powstaje dopiero, gdy serwer odda zapis albo powie, że go nie ma; brak odpowiedzi albo odpowiedź niepewna daje ostrzeżenie i „Spróbuj ponownie” — nigdy nową grę; zapis o złym kształcie gra też odrzuca w całości i zaczyna od nowa, a po odrzuceniu zapisu innej wersji albo z archetypem spoza danych gracz widzi jednorazowe zdanie w roli `warning`: „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.”, a po odrzuceniu zapisu o złym kształcie — w tym samym miejscu, tak samo jednorazowo — „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” | decision | reszta pytania 7 (A; Mariusz, 2026-10-29), pytanie 10 (zły kształt) i pytanie 21 (B; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to a saved game state of another version?”, który mówi resztę — zapis innej wersji i zapis z archetypem spoza danych gra odrzuca w całości i zaczyna od nowa; zmienia D-96 — dokłada zdanie o zapisie obok “The browser constructs the game only after the server confirms the session” | czy przy awarii pobrania zapisu gra startuje od nowa (a jej pierwszy zapis nadpisuje zapis na serwerze) i czy gracz dowiaduje się o odrzuceniu zapisu |
| 8 | Wczytane trwające ręczne przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu, a gracz rusza je przyciskiem „Wznów”; czas nieobecności go nie przesuwa — ani teraz, ani po zadaniu 18; wczytane przejście zakończone domknięciem albo śmiercią postaci wraca na ekran po swoim końcu. | decision | pytanie 8 (A; Mariusz, 2026-10-29); pytanie 15 (B; Mariusz, 2026-10-29) — wiersz w całości, razem z „ani po zadaniu 18”, bez kolizji z niezmiennikiem projektowanym `catch-up-state/1` i wpisem projektowanym „When and how is the time away computed?”, które zapisuje zadanie 18: doliczanie rusza od stanu wczytanego, z tym przejściem na pauzie, a pauza ręcznego przejścia nie zatrzymuje pętli zarobkowych innych postaci (pytanie otwarte planu dla zadania 18); pytanie 23 (A; Mariusz, 2026-10-29) — przejście zakończone, D-62, D-132 i D-173 bez zmian; to, gdzie gracz ląduje po zalogowaniu i przeładowaniu (pytania 20 i 23), mówi wpis projektowany D-96 spod *Decisions in play*, więc wiersz tego nie powtarza (pytanie 22, droga B); przy tym wpisie cykl poprawia uzasadnienie D-53 — “the headquarters stands above the screen of a map run as the screen the game opens on” → “the headquarters stands above the screen of a map run as the screen the game opens on when the saved game state holds no manual map run” (uwaga N5 krytyki bramki definicji, tura 23; materiał zgody, punkt 5, tura 24) | czy wczytane przejście biegnie od razu, czy stoi na pauzie, czy wczytanie zamyka przejście zakończone i — w zadaniu 18 — czy doliczanie przesuwa trwające ręczne przejście |
| 9 | Trasa zapisu przyjmuje treść do 64 KiB, inne trasy zostają przy 16 KiB, a serwer przechowuje najwyżej 64 KiB zapisu na gracza. | decision | pytanie 9 (B; Mariusz, 2026-10-29); zmienia D-104 (“an application/json body with at most 16 KiB” dla każdej trasy zmieniającej stan); niezmiennik `account-mutation-request-guards` nie podaje liczby („oversized”), więc czy obejmuje trasę zapisu („account route”) i jaki rozmiar jest dla niej „oversized”, ustala cykl | czy trasa zapisu bierze limit 16 KiB z D-104 (i trafi na niego z programami gracza), czy inny, i ile serwer trzyma na gracza |
| 10 | Wczytanie przechodzi przez funkcję symulacji, która dostaje zapis z serwera i oddaje stan gry albo odmowę (inna wersja, archetyp spoza danych, zły kształt); zdanie wiążące D-04 dostaje obok wyborów gracza i upływu czasu „zapis stanu gry, który przeglądarka pobrała z serwera”. | decision | pytanie 10 (A; Mariusz, 2026-10-29); zmienia D-04: “changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time”; przy tej zmianie cykl ocenia też drugie zdanie D-04 (“pure functions that take a game state and a span of game minutes …”) wobec funkcji wczytania (Context) | czy widok zastępuje stan gry wczytanym zapisem sam (wbrew przykładowi złamania D-04), czy przez funkcję symulacji, i jak to zapisać w D-04 |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game)

### 5. The simulation's load function and its counterpart (new kind `saved-game`)

Unit `src/browser/sim/saved-game.ts`, the first file and exemplar of kind `saved-game`:

- The version constant (decision 2).
- A function from a game state to the saved document `{ version, game }`, pure, sharing nothing it
  could later change with the state passed.
- A function from an unknown value (the `save` object the client hands over, or the document kept
  in page memory) to either a game state or a refusal with one of three reasons, `version`,
  `archetype`, `shape`. It never throws and changes nothing passed to it. In order: not an object
  with an integer `version` → `shape`; a version other than the current one → `version`; a team
  whose characters list is readable and names an archetype absent from the data → `archetype`;
  anything else that the state's types, closed lists and data do not admit → `shape`.
- What "admit" covers: every key present and no other (own keys only, `__proto__` included);
  numbers finite and safe integers where the type is an identity, a count or a minute; enumerated
  values on their closed lists (pace on the data's paces, condition and action kinds, death causes);
  identifiers of maps, resources, items, creatures and the campfire present in the data; programs
  through the existing program check; the references the simulation follows existing — the map
  run's character in the team, the copy's program on the list or null with its deleted name,
  identities below their next counters and unique, picks and programs used last naming listed
  programs; the map run's tiles of the number its map's layout gives. The maker may refuse more,
  never less.
- A map run that goes on (no death, no completion) comes back paused, at the game minute, pace and
  carried real time of the document; an ended one comes back as it ended, so the view shows its
  screen after the end with „Restart” and „Zakończ” and its copy open to editing (D-62, D-132,
  D-173 unchanged). Nothing advances it: no real time and no time away enters the load (answer 8,
  answer 15 B).
- The boundary with `simulation-module`: the new kind's guideline claims `src/browser/sim/saved-game.ts`
  (the file that turns a downloaded document into a game state or a refusal, and back); the
  `simulation-module` guideline's *When to read* excludes it as it excludes content data, and the
  index row in `guidelines/coding.md` names the new kind. The sentence „Wzorzec zapisu gry powstanie
  przy pierwszej implementacji” changes in the same change. The guideline's rules: simulation
  isolation, unchanged arguments, a refusal instead of a throw for every crafted input, and the
  version bump with the shape (decision 2). The new meaning goes to the human through
  `the-way-maintain-coding-guidelines` (WAY-172).

Rejected: load in the view, which replaces the state itself — the violation example of D-04; a
lenient load that fills missing keys — a migration by another name, against "discarded in full";
the load putting a running map run on pause in the view — the pause is a rule of the game state.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:228-295` 6. The browser's saver: one request at a time, every moment coalesced

### 6. The browser's saver: one request at a time, every moment coalesced

Unit `src/browser/view/game-saver.ts` (kind `browser-module`), created with the game and disposed
with it. It is given the client, a way to read the current game state (passing the clock's real time
first), the state and the revision it starts from, and callbacks to the page for the outcomes it
cannot handle in the game: conflict, outdated, signed out. It offers "a moment of saving", "a check
for changes", "save before logout" (a promise of the outcome), a read of the revision it last saw,
and `dispose()`.

- The baseline: the saver holds the state it last sent. It starts with the state the game was built
  on — the state a load returned (also on the conflict path and from the kept document), or the new
  game — as already saved at the revision it got, so a game nobody has touched since it was built is
  not saved again by itself. Comparison is by identity of the state object: the simulation hands
  back the very state it was given when nothing changed (`passRealTime` while paused or without a
  map run, `src/browser/sim/game.ts`), and the view keeps the state only when a result differs
  (`store.apply`).
- Moments that always send (row 1): the game view calls the moment after every act of the player
  whose result changed the state — program and copy edits, program list actions, creating a
  character, the pick on a headquarters row, sending, „Restart”, „Zakończ”, pause, pace — and after
  a game minute that ends the map run in a death or a completion; the page calls it for the two
  explicit saves of decisions 7 and 8 (the new game after a refused load, the kept document of the
  same account).
- Checks that send only when the current state is not the baseline: a 30-second real-time interval,
  and a `visibilitychange` to `hidden` (MDN fact above), which covers closing and hiding alike. While
  a map run passes the state changes every game minute, so the interval saves every 30 s and the
  hiding saves the latest state; outside a map run every change is a player's act already sent, and
  after a discovery's pause the interval sends once. A tab that lost a conflict, or one just built
  from a load with its map run paused, sends nothing until the player acts in it (answer 16, row 3,
  To do 8).
- One request at a time: a moment during a request in flight marks the saver to send once more
  when the answer comes, with the state of that time. Each request is `basedOn` the last revision
  the saver saw. Every save request the client sends is sent with `keepalive`, so the one in flight
  survives a closing page; one in flight keeps the body within the keepalive quota, and a body over
  it is never sent (decision 3). A hiding check while a request is in flight sends nothing more —
  the gap is the "bez gwarancji" the task accepts.
- Outcomes:
  - saved — the new revision is kept; the header sentence, if any, goes.
  - failed (no connection, time limit, a 5xx or any other answer) — „Nie udało się zapisać
    postępu. Gra spróbuje ponownie.” stands; a retry follows after 5 s, then 10 s, 20 s and every
    30 s, each with the state of its time; a moment meanwhile sends at once (answer 2).
  - too large (the server's 413, or a body the client measured over 65 536 bytes and did not
    send, decision 3) — „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne
    programy.” stands; no retry; the next moment or check that finds a changed state tries again,
    the hiding check included (answer 18); before logout it lets logout go on (decision 8).
  - conflict — the page drops this game and loads the server's save (decision 7), then shows
    „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” in the header slot until the
    first successful save (rows 3, answer 16).
  - outdated — „Gra została zaktualizowana. Odśwież stronę.” stands and the saver stops for good:
    no moment or check sends anything any more; the game stays on screen (row 4).
  - signed out (401) — the page takes the current state as a document with the account and the
    revision and removes the game (decision 8).
- The header slot is one line under the title and „Wyloguj”, in `warning`, above the D-157 row of
  an unconfirmed address: a sentence that says progress is not being saved concerns a loss and
  comes first, the address row is a `text-secondary` note. Hidden when empty.
- Tests the spec asks for besides those of each decision: the client returns too-large for a body
  over 65 536 bytes and the local server receives no request, while a body of exactly 65 536 bytes
  is sent; the saver given a too-large outcome shows its sentence, does not retry, and lets logout go
  on to `POST /api/logout`; a saver built on a loaded state (the conflict path) with no act of the
  player sends nothing at the interval or at hiding, and sends at the player's first act.

Rejected: a debounce timer instead of coalescing — a delay before every save, and the
one-request-at-a-time rule is still needed for the revision; several requests in flight — each
would be based on a revision another is about to change, so the tab would conflict with itself;
`sendBeacon` at hiding — no answer, so a tab that only hid would not learn its new revision and its
next save would read as another browser's conflict; `keepalive` only at hiding — the save in flight
when a tab closes is then cancelled and the hiding moment, seeing it in flight, sends nothing;
a fixed retry every 5 s — a long outage costs a request every 5 s per tab; `pagehide` as well — MDN
names `visibilitychange` the last reliable event, and two handlers send two saves.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:297-324` 7. The page: session, then the saved game state, then the game

### 7. The page: session, then the saved game state, then the game

Changes in `src/browser/view/app.ts` and `src/browser/view/game-view.ts`:

- After `GET /api/account` names an account (or a form signs in), the page keeps "Sprawdzanie
  logowania…" and asks `GET /api/saved-game`. Only its answer builds the game: `null` → a new game
  (D-51, D-91); a save → the load function. A failed or uncertain answer shows the client's
  sentence with „Spróbuj ponownie”, as the session check does, and the retry repeats both requests;
  401 shows the forms. The request numbering that ignores stale answers covers the new request too.
- `createGameView` takes the game state it starts from, the revision it starts from and the page's
  callbacks, and gives the saver its moments; it lands where the state says: the headquarters, a
  map run paused, or the screen after a map run's end (D-96 projected).
- A refused load builds a new game, puts above the game, as a one-time notice of the confirmation
  notice's kind, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.”
  (`version`, `archetype`) or „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”
  (`shape`), and saves the new game at once, based on the server's revision, so the refused save
  is replaced and the sentence does not come back at the next sign-in. Where a confirmation notice
  also stands, it comes first.
- The conflict path drops the game (its clock stops), shows the waiting screen, asks the save again
  and builds from it as above; the conflict sentence then stands in the header slot. A refused load
  on that path takes the refused-load path instead.
- The confirmation notice stands above the game whatever screen it opens on (D-156 projected):
  the page already puts it above the whole game element, so a game opening on a map run keeps it.

Rejected: one combined request for account and save — `GET /api/account` keeps its contract, its
tests and its use after the email confirmation; the refused-load sentence in the header slot — the
immediate save of the new game would clear it before the player reads it; no immediate save after a
refusal — the sentence would come back at every sign-in, which is not "jednorazowe".

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:326-353` 8. Expired session, the same account, and logout

### 8. Expired session, the same account, and logout

- Signed out by a save (401): the page reads the current state as a saved document and keeps it in
  a variable of the page together with the account's identifier (from the `id` of the account the
  server named) and the revision the saver last saw; it disposes the game and shows the forms with
  „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” above them in `warning`. Nothing goes
  to browser storage; a reload loses it (answer 5).
- Same account: after a sign-in, when an account's `id` equals the kept identifier, the page skips
  `GET /api/saved-game`, builds the game from the kept document through the load function (so a map
  run that went on comes back paused, an ended one on its screen after the end) with the kept
  revision, drops the kept copy, and calls one moment of saving at once. Its outcomes are the
  saver's: a conflict loads the other browser's save, an outdated answer stops saving, a failure
  retries. Another account's `id` drops the kept document and takes the normal path. The browser
  compares identifiers only; it sends none (D-109).
- „Wyloguj” (row 6): with the saver stopped as outdated, logout goes straight to `POST /api/logout`
  and the forms then show „Gra została zaktualizowana. Odśwież stronę.” above them. Otherwise the
  button reads „Wylogowywanie…” while the saver waits for a request in flight and sends the current
  state: saved, conflict or too large → `POST /api/logout` as today; outdated → logout, then the
  forms with that sentence; failed → no logout, the game stays, and the header slot reads „Nie udało
  się zapisać postępu. Spróbuj wylogować się ponownie.” while the saver's retries go on silently
  under it until a save succeeds; signed out → the expired-session path above, also for a blocked
  account (answer 19). The sentence above the forms stands in the same place as the expiry
  sentence.

Rejected: a new account-identity check on the server for the kept state — the stored session
already decides which row a save replaces, and the identifier the server named is enough for the
browser to tell its own accounts apart; the kept state as a live `GameState` — a second way to build
the game beside the load function, and its running map run would need a pause of its own.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:487-501` Left to maker

## Left to maker

- The names of functions, types and the client methods, and whether the save methods extend the
  client in `src/browser/account-api.ts` (recommended: one client, shared exchange and time limit)
  or a second file of kind `browser-api-client`.
- The exact list of what the load function refuses beyond decision 5's floor, and the split of its
  checks into private helpers.
- Where the save routes stand in `src/server/account-routes.ts` and how `mutationGuards` takes its
  limit; the SQL of step 4 and of the two database operations.
- How the game view reports "a game minute ended the map run" to the saver (from the events of
  `passRealTime` or from comparing the state).
- The waiting-screen markup on the conflict path, and the class of the one-time notice.
- Whether the kitchen-sink page shows the header save sentence; no shared control or role is added,
  so the styleguide does not require it.
- The order of the slices, if the cycle plans the change.
