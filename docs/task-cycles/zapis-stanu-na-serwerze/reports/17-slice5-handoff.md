# Handoff — Slice 5 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 5**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base = head when you start: `adb13fb`. Process pin
  `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `same` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/17-slice5-report.md`
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
  row 12 D-97, row 32 `fetch-keepalive-body-quota`, row 33 `visibilitychange-hidden-last-event`.
- Slice 1 (`b36292e`): `src/browser/sim/saved-game.ts` — the saved document of a game state and
  the load.
- Slices 2–3 (`bbf6ad2`, `fc6540c`): `GET` and `PUT /api/saved-game` on the server.
- Slice 4 (`adb13fb`): the client's save methods in `src/browser/account-api.ts`, with their typed
  outcomes and the local too-large refusal over 65 536 bytes; tests in `tests/account-api.test.mjs`.
  Read the methods and their outcome types there before building on them. Its executor notes that
  no test can pin `keepalive: true`; your saver is the client's caller, so do not drop it.

## Your section of the plan (copied word for word from plan.md)

### Slice 5 — The game saver

- **Goal:** `src/browser/view/game-saver.ts` (kind `browser-module`) is the saver of spec decision
  6. It is created with the client, a read of the current game state (passing the clock's real
  time first), the state and revision it starts from — held as already saved — optionally the
  conflict sentence to stand from the start, and the page's callbacks for conflict, outdated and
  signed out; it offers a moment of saving, a check for changes, a save before logout (a promise
  of its outcome), the revision it last saw, the header sentence it stands for, and `dispose()`. A
  moment always sends; the 30-second real-time interval and a `visibilitychange` to `hidden` send
  only when the current state is not the one last sent, compared by identity. One request at a
  time: a moment during a request in flight sends once more, with the state of that time, when the
  answer comes; each request is based on the last revision seen and sent through the client of
  Slice 4, measured and with `keepalive`; a hiding check during a request in flight sends nothing
  more. Outcomes: saved — the revision kept, the sentence gone; failed — „Nie udało się zapisać
  postępu. Gra spróbuje ponownie.” stands and a retry follows after 5 s, then 10 s, 20 s and every
  30 s, each with the state of its time, a moment meanwhile sending at once; too large — „Nie udało
  się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” stands, no retry, the
  next moment or check that finds a changed state tries again; conflict and signed out — the
  page's callbacks; outdated — „Gra została zaktualizowana. Odśwież stronę.” stands and nothing is
  sent any more. Before logout (spec decision 8): a stopped saver reports so without sending;
  otherwise it waits for a request in flight, sends the current state and reports the outcome; a
  failure leaves „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” with the retries
  going on silently. `tests/view/game-saver.test.mjs` runs it with a controlled client, controlled
  timers and a hand-made document model: each outcome with its sentence; coalescing during a
  request in flight; the retry rhythm; nothing sent at the interval or at hiding for an untouched
  state, also one built from a load, and a send at the first act; too large without retry and
  letting logout go on; the stopped saver.
- **Change:** `src/browser/view/game-saver.ts` · `tests/view/game-saver.test.mjs`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-26` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:28-28` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:41-53` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-154` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:290-295` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:228-295` 6. The browser's saver: one request at a time, every moment coalesced ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:326-353` 8. Expired session, the same account, and logout ·
  Foundation entries row 7 · Foundation entries row 8 · Foundation entries row 9 ·
  Foundation entries row 10 · Foundation entries row 11 · Foundation entries row 12 ·
  Foundation entries row 32 · Foundation entries row 33 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:416-448` D-21 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:793-806` D-39 ·
  `foundations/decisions.md:1739-1752` D-97 · `foundations/decisions.md:2021-2034` D-117 ·
  `foundations/decisions.md:2830-2843` D-157 ·
  `foundations/invariants.md:35-43` browser-view-framework ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:18-23` map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/account-api.ts` · src/browser/sim/saved-game.ts (made in Slice 1) ·
  `src/browser/sim/game.ts:353-417` · `src/browser/view/clock.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/view/status-row.ts` ·
  `tests/view/clock.test.mjs` · `tests/view/email-status.test.mjs`
- **Model:** same — its timers, its one request in flight and its coalesced moments decide whether
  a player's progress is saved, with no module of this sort in the product to follow.
- **Risk:** none
- **Checks:** `npm test -- tests/view/game-saver.test.mjs` (its case "a moment during a request in
  flight sends once more, after the answer, with the state of that time" written first, failing) ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · Slice 4 · Foundation entries rows 7, 8, 9, 10, 11, 12, 32, 33

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 7 → `foundations/decisions.md:3317-3356` D-184 — When does the game save the game state on the server?
- plan row 8 → `foundations/decisions.md:3358-3394` D-185 — What does the player see of saving the game state?
- plan row 9 → `foundations/decisions.md:3396-3438` D-186 — Which browser's save of the game state does the server accept?
- plan row 10 → `foundations/decisions.md:3440-3465` D-187 — What does the server do with a save of the game state of a lower version than the one it holds?
- plan row 11 → `foundations/decisions.md:3467-3498` D-188 — What does the player see when a save of the game state finds no session?
- plan row 12 → `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- plan row 32 → `foundations/environment_facts.md:346-350` fetch-keepalive-body-quota
- plan row 33 → `foundations/environment_facts.md:352-356` visibilitychange-hidden-last-event
- `foundations/decisions.md:57-103` D-04 — What is the game built with?
- `foundations/decisions.md:434-466` D-21 — How does time pass in a map run the player starts?
- `foundations/decisions.md:766-779` D-36 — Which file is the exemplar for browser modules?
- `foundations/decisions.md:811-824` D-39 — What do the signal colours of the browser view mean?
- `foundations/decisions.md:1760-1773` D-97 — What does the player's logout do?
- `foundations/decisions.md:2042-2055` D-117 — Which file is the exemplar for a browser API client?
- `foundations/decisions.md:2850-2863` D-157 — What does a signed-in player see of an unconfirmed address, and who may ask for another confirmation message?
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/glossary.md:12-16` game minute
- `foundations/glossary.md:18-23` map run

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `src/browser/account-api.ts`
- src/browser/sim/saved-game.ts (made in Slice 1)
- `src/browser/sim/game.ts:353-417`
- `src/browser/view/clock.ts`
- `src/browser/view/controls/text-field.ts`
- `src/browser/view/status-row.ts`
- `tests/view/clock.test.mjs`
- `tests/view/email-status.test.mjs`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:25-26` To do

7. Gra zapisuje stan na serwerze automatycznie: zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie (pytanie 1). Gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie (pytanie 2). Odmowa za dużego zapisu (punkt 4) to osobny przypadek: gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu z początku tego punktu; w nagłówku, w miejscu zdania o nieudanym zapisie, stoi w roli `warning`: „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” i znika po pierwszym udanym zapisie (pytanie 18).
8. Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie (pytania 3 i 16).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:28-28` To do

10. „Wyloguj” najpierw zapisuje bieżący stan (przycisk w tym czasie: „Wylogowywanie…”), potem kończy sesję. Gdy zapis się nie uda z braku połączenia albo błędu serwera, wylogowanie nie następuje: gra zostaje z ostrzeżeniem w roli `warning` „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; gdy serwer odrzuci zapis jako starszy od zapisu z innej przeglądarki (punkt 8), wylogowanie idzie dalej (pytanie 6). Gdy serwer odrzuci zapis karty ze starszym kodem gry (punkt 5), wylogowanie też idzie dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”, w tym samym miejscu co zdanie z punktu 9 (pytanie 17). Gdy odrzuci zapis jako za duży (punkt 4), „Wyloguj” wylogowuje mimo tej odmowy (pytanie 18). Gdy odpowie na zapis, że sesji nie ma — sesja wygasła albo konto zablokowano (D-137) — dzieje się to, co w punkcie 9: formularze konta ze zdaniem „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.” i niezapisany stan w pamięci strony do zalogowania na to samo konto (pytanie 19).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:41-53` Questions to settle

- 1. Kiedy gra zapisuje stan gry na serwerze? (Q1 rozmowy refinementu)
  - Answer: automatycznie (droga A): zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie. Przyjęty koszt: przy biegnącym przejściu żądanie co 30 s realnych na gracza; zamknięcie karty zabiera najwyżej ostatnie 30 s realnych przejścia — przy 1× to 30 minut gry, przy 16× do 480 minut gry, czyli całe przejście Lasu od wysłania postaci.
  - Not chosen:
    - B — zapis tylko w chwilach: działania gracza, domknięcie i śmierć, bez zapisu w trakcie biegnącego przejścia — mniej żądań, ale zamknięcie karty w środku przejścia cofa je do chwili wysłania postaci: przy 1× do 8 minut realnych (całe 480 minut gry Lasu), przy 16× do pół minuty realnej.
    - C — przycisk „Zapisz” — gracz, który zapomni kliknąć, traci wszystko od ostatniego kliknięcia; nowy przycisk i jego stany.
    - D — jak A, ale w trakcie biegnącego przejścia co 30 minut gry zamiast co 30 s realnych — przy 1× tak samo jak A; przy 16× żądanie co niecałe 2 s realne (przejście Lasu to 16 zapisów w pół minuty, razem około 80 KB); za to zamknięcie karty zabiera najwyżej 30 minut gry przy każdym tempie.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q1 rozmowy refinementu, przedstawionego w pakiecie zadania 16 jako D1 (tura 9 rozmowy).
- 2. Co gracz widzi o zapisie — gdy zapis się udaje i gdy się nie udaje? (Q2)
  - Answer: droga A: gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie. Przyjęty koszt: gracz nie widzi, kiedy ostatnio zapisano.
  - Not chosen:
    - B — jak A, a do tego stały wiersz „Zapisano o 12:31” w roli `text-secondary` — wiersz zmienia się co 30 s w trakcie przejścia; więcej tekstu w nagłówku obok zdania zadania 20.
    - C — nic nie widać, także przy nieudanym zapisie — gracz gra dalej w przekonaniu, że postęp jest zapisany, i traci go przy zamknięciu karty.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q2, w pakiecie jako D2 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:138-154` Questions to settle

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
- 18. Co robi gra, gdy serwer odrzuci zapis jako za duży (ponad 64 KiB, pytanie 9) — przy zapisie automatycznym, przy jego ponawianiu i przy zapisie przed wylogowaniem? (Q18)
  - Answer: droga A: odmowa za dużego zapisu to osobny przypadek: gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu z odpowiedzi 1; w nagłówku, w miejscu zdania z odpowiedzi 2, stoi w roli `warning`: „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” i znika po pierwszym udanym zapisie; „Wyloguj” wylogowuje mimo tej odmowy, jak przy odmowie z pytania 3. Przyjęty koszt: postęp od ostatniego udanego zapisu przepada przy wylogowaniu albo zamknięciu karty; jedyne, co gracz może zmniejszyć, to programy — „Usuń” na liście programów (D-167), przy czym ostatni program zostaje; postaci, Zrozumienia ani rozwiązanych map usunąć nie może (w loop2 b8ac134 nie ma działania usuwającego postać), więc gracz, którego stan rośnie poza programami, zostaje bez zapisu do zmiany limitu w kolejnym zadaniu; jeden stan nagłówka więcej. Stanu gry po zadaniu 12 nikt nie mierzył (Context).
  - Not chosen:
    - B — odmowa liczona jak nieudany zapis z odpowiedzi 2 i 6 — ponawianie bez końca, obietnica „Gra spróbuje ponownie.”, która się nie spełni, i niedziałające „Wyloguj”; na wspólnym komputerze gracz zostaje zalogowany.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — rekomendacja A pytania Q18 rozmowy refinementu, droga i zdanie w brzmieniu poprawki z tury 17 (tura 19); zdanie przyjęte tak, jak je zaproponowano.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:290-295` Settlements to record

| 1 | Gra zapisuje stan gry na serwerze automatycznie: zaraz po każdej zmianie stanu wywołanej przez gracza (edycja programu, założenie postaci, wysłanie, „Restart”, „Zakończ”, pauza, tempo), zaraz po domknięciu i po śmierci postaci, a w trakcie biegnącego przejścia co 30 sekund realnych; przy zamykaniu albo ukrywaniu karty gra próbuje jeszcze jednego zapisu, bez gwarancji, że dojdzie. | decision | pytanie 1 (A; Mariusz, 2026-10-29) | kiedy przeglądarka wysyła zapis — przycisk, chwile działań gracza czy rytm w trakcie przejścia, w sekundach realnych czy minutach gry — i czy próbuje zapisu przy zamykaniu karty |
| 2 | Gdy zapis się udaje, nic nie widać; gdy się nie uda, w nagłówku pod tytułem i „Wyloguj” staje zdanie w roli `warning`: „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, gra sama ponawia zapis, a zdanie znika po pierwszym udanym zapisie; gdy serwer odrzuci zapis jako za duży, gra nie ponawia tego samego zapisu, tylko próbuje znowu przy następnej chwili zapisu, a w miejscu tamtego zdania stoi w roli `warning` „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.” aż do pierwszego udanego zapisu. | decision | pytanie 2 (A; Mariusz, 2026-10-29) i pytanie 18 (A; Mariusz, 2026-10-29); w tym samym miejscu nagłówka stoi wiersz niepotwierdzonego adresu D-157; chwile zapisu — wiersz 1 | czy gracz widzi udany zapis, gdzie i jakim zdaniem widzi nieudany i czy gra sama ponawia zapis |
| 3 | Serwer przyjmuje zapis tylko z przeglądarki, która widziała ostatni zapis na serwerze; zapis z przeglądarki, która go nie widziała, bo w międzyczasie zapisała inna, odrzuca, a ta przeglądarka porzuca swój niezapisany stan, wczytuje zapis z serwera — trwające ręczne przejście zatrzymane pauzą — pokazuje w roli `warning`: „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” i toczy grę dalej od wczytanego zapisu, zapisując jak zwykle; zdanie znika po pierwszym udanym zapisie. | decision | pytanie 3 (B; Mariusz, 2026-10-29) i pytanie 16 (A; Mariusz, 2026-10-29), które daje temu wierszowi to brzmienie; to reguła, której wymaga uzasadnienie wpisu projektowanego „How does the browser exchange saved game states with the server?”: “resolving two browsers' conflicting saves still requires a separate game rule” | czy wygrywa ostatni zapis, czy serwer odrzuca zapis przeglądarki, która nie widziała ostatniego, co wtedy widzi gracz i czy po wczytaniu ta przeglądarka zapisuje dalej, a przejście biegnie |
| 4 | Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje w roli `warning`: „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać. | decision | pytanie 4 (B; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to a saved game state of another version?”, który zostaje bez zmian, i D-07 (serwer porównuje tylko numer wersji) | czy serwer przyjmuje każdy zapis, także karty ze starszym kodem, która może nadpisać zapis nowszej wersji, i co widzi gracz w starej karcie |
| 5 | Gdy serwer odpowie na zapis, że sesji nie ma, gra znika z ekranu (jej czas staje), wracają formularze konta, a nad nimi zdanie w roli `warning`: „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”; niezapisany stan trzyma pamięć strony, a nie pamięć trwała przeglądarki, więc przeładowanie albo zamknięcie strony przed zalogowaniem go gubi; po zalogowaniu na to samo konto gra wraca do gry od tego stanu, a po zalogowaniu na inne konto ten stan przepada i gra wczytuje zapis tamtego konta. | decision | reszta pytania 5 (A; Mariusz, 2026-10-29); obok wpisu projektowanego „What happens to unsaved progress when a session expires?” i `expired-session-unsaved-progress/1`, które mówią resztę — przeglądarka zachowuje stan, po zalogowaniu na to samo konto gra ponawia jego zapis, a pod innym kontem go nie zapisuje | czy gra biegnie dalej, co gracz widzi, co z niezapisanym stanem przy innym koncie i czy stan trafia do `localStorage` |
| 6 | „Wyloguj” najpierw zapisuje bieżący stan (przycisk w tym czasie: „Wylogowywanie…”), potem kończy sesję; gdy zapis się nie uda z braku połączenia albo błędu serwera, wylogowanie nie następuje i gra zostaje z ostrzeżeniem w roli `warning` „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”; gdy serwer odrzuci zapis jako starszy od zapisu z innej przeglądarki albo jako za duży, wylogowanie idzie dalej; gdy odrzuci zapis karty ze starszym kodem gry, wylogowanie też idzie dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”; gdy odpowie, że sesji nie ma, bo sesja wygasła albo konto zablokowano, wracają formularze ze zdaniem „Sesja wygasła. Zaloguj się ponownie, aby zapisać postęp.”, a niezapisany stan zostaje w pamięci strony do zalogowania na to samo konto, jak w wierszu 5. | decision | pytanie 6 (A; Mariusz, 2026-10-29), pytanie 17 (C), pytanie 18 (A) i pytanie 19 (A) (Mariusz, 2026-10-29); zmienia D-97 — dokłada zapis przed wylogowaniem, którego D-97 nie rozstrzyga (uzasadnienie: “not the preservation of unsaved progress”) | czy wylogowanie zapisuje stan, czy kończy sesję mimo nieudanego zapisu, co robi przy każdej odmowie zapisu i czy niezapisany postęp zostaje w karcie |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:143-165` 3. D-104 and account-mutation-request-guards cover the save route, with its own limit

### 3. D-104 and `account-mutation-request-guards` cover the save route, with its own limit

- `mutationGuards` takes the route's body limit as a parameter; the save route gets 64 KiB
  (65 536 bytes), every other state-changing route keeps 16 KiB. The Origin, media-type,
  compression and object checks stay the same for all six routes.
- The invariant `account-mutation-request-guards` keeps covering every state-changing route, the
  save route included, and "oversized" means over that route's limit in D-104.
- The stored limit is checked apart from the body limit on the text the server stores (decision 1):
  re-serializing parsed JSON can lengthen it (`1e21` becomes `1e+21`), so the body limit alone does
  not bound the stored text. One row per account (primary key) gives "najwyżej 64 KiB na gracza".
- Fit with `keepalive`: the server's body limit and the page's keepalive quota are the same number,
  65 536 bytes, and the browser refuses a larger keepalive body as a network error before sending
  it. So the client measures the UTF-8 byte length of the save body it is about to send: up to
  65 536 bytes it sends it with `keepalive` (within the quota while it is the only keepalive
  request in flight, which decision 6 guarantees); above that it sends nothing and returns the
  too-large outcome, the same typed outcome as the server's 413. The server's own 413 stays for a
  body that reaches it over the limit from any other client and for the stored-text check below
  it. The client's limit is a copy of the server's contract (D-117's weak point): both change
  together, and a test pins each side.

Rejected: a separate guard stack for the save route — two copies of the Origin and JSON rules that
can drift; leaving the invariant to the five account routes — the save route would change state
outside the one guarded set D-104 names.

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
