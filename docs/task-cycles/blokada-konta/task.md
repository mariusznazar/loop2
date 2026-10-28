# Blokada konta gracza przez właściciela na serwerze testowym loop2

Status: ready for cycle
Project relation: plan item: plan_mvp_loop2.md — blokada-konta

## Description

### Need

- Definicja MVP obejmuje blokadę konta: „Każdy może sam założyć konto i od razu grać; gracz odczytuje i zmienia tylko własny zapis, a właściciel może zablokować konto.” (§ In scope, pkt 1).
- Rejestracja pod publicznym adresem gry jest technicznie otwarta od zadania 15, więc właściciel potrzebuje sposobu, by odciąć konto od gry, zanim poda adres gry innym graczom (faza „Konta na serwerze testowym” planu).
- Dziś właściciel nie ma jak tego zrobić: tabela kont nie ma żadnego stanu blokady (`src/server/database.ts:106`), a logowanie i odczyt konta nie sprawdzają niczego poza hasłem i sesją (`src/server/account-routes.ts:44`, `:172`, `:262`; loop2 `6540e4c`).

### To do

1. Właściciel blokuje konto gracza wskazane adresem e-mail poleceniem, które sam uruchamia na serwerze w kontenerze gry `loop2`; polecenie mówi, czy konto zablokowało, czy konta o takim adresie nie ma (pytanie 1).
2. Tym samym sposobem właściciel odblokowuje zablokowane konto: odblokowane konto znów się loguje, a sesje unieważnione przy blokadzie nie wracają — gracz loguje się od nowa (pytanie 2).
3. Zablokowanie konta unieważnia na serwerze wszystkie sesje tego konta, w każdej przeglądarce, a żadna sesja zablokowanego konta nie daje dostępu do żądań wymagających zalogowania; żądanie z ciasteczkiem takiej sesji dostaje odpowiedź jak bez ważnej sesji (JSON 401, D-109), więc przeglądarka wraca do ekranu formularzy (pytanie 3).
4. Zablokowane konto nie może się zalogować: przy poprawnym haśle gracz widzi w miejscu ostrzeżenia formularza logowania „To konto jest zablokowane.” i nie dostaje sesji, a przy złym haśle — jak dotąd „Nieprawidłowy adres e-mail lub hasło.” (pytanie 4).
5. Baza kont na serwerze testowym, dziś w wersji schematu 1, przechodzi na schemat z blokadą przy wdrożeniu, z zachowaniem wszystkich kont i sesji; to pierwsze przejście bazy kont z wersji 1, a zadania 20, 16 i 21 dokładają po nim swoje wersje (pytanie 5).
6. Skill `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`) mówi, jak właściciel blokuje i odblokowuje konto poleceniem z punktów 1 i 2, a w `references/troubleshooting.md`, § „Rollback and the accounts”, zdanie „The current code writes schema version 1.” odpowiada nowemu schematowi i mówi, że wycofanie do commitu sprzed tego zadania nie wystartuje na bazie po przejściu z punktu 5 (WAY-139: wycofanie i to, co dzieje się z danymi; pytanie 7).
7. Tabela uprawnień i granic zaufania w `guidelines/testing.md` dostaje wiersze dla zablokowanego konta — kto, który zasób, jakie działanie i oczekiwana odmowa — z testem odmowy oznaczonym niezmiennikiem `blocked-account-access` i raz widzianym z porażką — przez `maintain-testing-guidelines`.
8. Wytyczne rodzaju `database-access` (`guidelines/coding-database-access.md`, reguła „Otwarcie schematu bez utraty danych”, dziś tylko inicjalizacja wersji 1 i odmowa nieznanej wersji) dostają zasadę przejścia istniejącej bazy na nowszą wersję schematu — przez `maintain-coding-guidelines`.

### Acceptance criteria

- Ścieżka zablokowanego gracza — konto zalogowane w przeglądarce, zablokowanie przez właściciela, przeładowanie strony, próba logowania z poprawnym i ze złym hasłem, odblokowanie i ponowne logowanie — jest sprawdzona ręcznie na serwerze testowym pod `https://loop2.mariusznazar.com/` po wdrożeniu commitu tego zadania (D-75), a konta i sesje założone przed wdrożeniem nadal działają.

### Questions to settle

Pytania 1–5 i 7 to pytania Q1–Q5 rozmowy refinementu `C:\Storage\repos\loop2\.runs\project-refinement\blokada-konta.md` (Q1–Q4 w turze 2, Q5 w turach 5 i 6) i pytanie o opis w skillu z części 1 pakietu rundy; pytanie 6 to pytanie kanoniczne Q15 rozmowy `C:\Storage\repos\loop2\.runs\project-refinement\walka-w-glebi-lasu.md`. Odpowiedź człowieka na wszystkie: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 1 pakietu rundy; zapis w turze 7 rozmowy blokada-konta.md i w turze 5 rozmowy walka-w-glebi-lasu.md).

- 1. Jak właściciel blokuje konto? (Q1; pytanie otwarte definicji „Jak właściciel blokuje konto?”, plan: zadanie 19)
  - Answer: poleceniem na serwerze (droga A): właściciel loguje się na serwer przez SSH i uruchamia w kontenerze gry polecenie z adresem e-mail konta (w materiale pytania przykład `docker exec loop2 node <plik polecenia> zablokuj <adres>`); polecenie mówi, czy konto zablokowało, czy takiego adresu nie ma; opis w skillu `loop2-deploy`. Przyjęte koszty: blokowanie tylko z terminala serwera, bez widoku w przeglądarce; adres gracza zostaje w historii powłoki serwera; drugi proces otwiera bazę obok działającego serwera (otwarcie czeka na blokadę zapisu najwyżej ustawiony czas, D-112); nowy plik rodzaju, którego wzorzec jest odłożony (punkt uruchomienia). Odrzucone drogi: panel właściciela w przeglądarce (B) i ręczna zmiana pliku bazy narzędziem SQLite (C).
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja A pytania Q1.
- 2. Czy właściciel może zablokowane konto odblokować? (Q2)
  - Answer: tak, tym samym sposobem co blokadę (droga A); odblokowane konto znów się loguje, a sesje unieważnione przy blokadzie nie wracają — gracz loguje się od nowa. Odrzucona droga: blokada ostateczna (B).
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja A pytania Q2.
- 3. Czy blokada kończy jedną sesję konta, czy wszystkie jego sesje, we wszystkich przeglądarkach? (Q3)
  - Answer: wszystkie — z cytatów: “A blocked account cannot sign in or use authenticated game endpoints.” oraz “The account server validates authenticated requests against a server-side SQLite session record and invalidates that record on logout or account blocking.” Zablokowane konto nie korzysta z żadnego żądania wymagającego zalogowania, więc nie daje do nich dostępu żadna jego sesja, w żadnej przeglądarce.
  - Source: definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d), § Projected foundation changes, niezmienniki `blocked-account-access/1` i `player-server-session/1`; oba cytaty brzmią tak samo w definicji zatwierdzonej ponownie 2026-10-28 (odcisk 7e33760d, sha256 3e9c2cc9146b); wiele sesji jednego konta: D-101 (`foundations/decisions.md`, loop2 `6540e4c`): “a player may remain signed in through several browsers at once”. Cytat pokazany człowiekowi 2026-10-28 jako pytanie, cytat i źródło i przez niego nieskreślony (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”).
- 4. Co widzi zablokowany gracz, gdy próbuje się zalogować? (Q4)
  - Answer: przy poprawnym haśle komunikat „To konto jest zablokowane.” w miejscu ostrzeżenia formularza logowania, bez sesji; przy złym haśle — jak dziś „Nieprawidłowy adres e-mail lub hasło.” (droga A). Przyjęty koszt: nowy kod odmowy w serwerze i w kliencie API przeglądarki; o blokadzie dowiaduje się tylko ten, kto zna hasło. Odrzucone drogi: ten sam komunikat co przy złym haśle (B) i komunikat o blokadzie po samym adresie, bez sprawdzania hasła (C).
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja A pytania Q4; brzmienie komunikatu pytanie podawało jako „do zmiany”, człowiek go nie zmienił.
- 5. W jakiej kolejności idą cykle zadań 16, 19, 20 i 21, które wszystkie zmieniają schemat bazy kont? (Q5)
  - Answer: kolejno 19 → 20 → 16 → 21 (droga A): zadanie 20 zależy od zadania 19, zadanie 16 od zadania 20, zadanie 21 od zadania 16. Cykl tego zadania pisze więc pierwsze przejście bazy z wersji 1 — nowe brzmienie D-112, niezmienników `account-schema-lifecycle` i `account-database-schema` i reguły „Otwarcie schematu bez utraty danych” w `guidelines/coding-database-access.md` — a każde następne zadanie tylko dokłada swoją wersję.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja A pytania Q5; zapisane w planie `plan_mvp_loop2.md` (przy zapisie sha256 5fa0238b02ec; w obecnym planie, sha256 f67ff61b42fb, bez zmian), wiersze 16, 20 i 21 i trzy linie dziennika zmian z 2026-10-28.
- 6. Czy kandydaci do fundamentu z tego zadania biorą zasadę brzmienia przyjętą dla zadań 4, 5, 6, 7 i 11 — zastrzeżenie „to są elementy na potrzeby mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw” (Mariusz, 2026-10-24) i zakaz słów wykluczających, takich jak „tylko”, „nigdy”, „zawsze”, „bez”?
  - Answer: nie (droga B pytania kanonicznego): zasada obowiązuje kandydatów zadań 8 i 12, a kandydaci zadań 19 i 20 mogą używać słów wykluczających, jak zadanie 15.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęta rekomendacja B pytania kanonicznego Q15 rozmowy `walka-w-glebi-lasu.md` (wspólnego dla zadań 8, 12, 19 i 20).
- 7. Czy opis blokowania i przejścia schematu w skillu `loop2-deploy` (punkt 6 To do) zostaje w tym zadaniu, czy idzie do osobnego zadania? (WAY-139: skill wdrożenia produktu ma opisywać m.in. wycofanie i to, co dzieje się wtedy z danymi; brakujący opis staje się punktem To do, który człowiek może wydzielić)
  - Answer: zostaje w tym zadaniu.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — przyjęte domyślne pozostawienie w zadaniu.

## Context

- Kod przy refinemencie, loop2 `6540e4c`: `src/server/database.ts` — schemat w wersji 1 z tabelami `accounts` i `sessions`, a każdą inną wersję niż 0 i 1 baza odrzuca przy otwarciu („Unsupported account database schema”, `:98`–`:130`); `src/server/account-routes.ts` — `sessionAccount()` (`:44`) bierze konto tylko z rekordu sesji, `GET /api/account` (`:172`), logowanie `POST /api/session` (`:262`).
- Gra w przeglądarce pyta dziś serwer tylko przy wczytaniu strony (sprawdzenie sesji), przy logowaniu, zakładaniu konta i wylogowaniu (`src/browser/view/app.ts:74`–`:119`); gracz zablokowany w trakcie gry gra więc w przeglądarce dalej, aż do przeładowania strony albo wylogowania, a od zadania 16 — do najbliższego zapisu.
- Odpowiedź 401 na sprawdzenie sesji albo na wylogowanie przeglądarka traktuje jako wylogowanie i pokazuje formularze (`src/browser/view/app.ts:13`, `:88`, `:112`).
- Klient API w przeglądarce pokazuje komunikat serwera tylko dla kodu odmowy ze swojej listy (`src/browser/account-api.ts:11`–`:22`, `:95`–`:108`; `guidelines/coding-browser-api-client.md`, reguła „Sukces tylko dla własnego statusu i kształtu”), więc komunikat z punktu 4 wymaga nowego kodu odmowy w serwerze i w tym kliencie (D-117); ekran stawia odmowę pod przyciskiem formularza w roli `warning` (`guidelines/styleguide-browser-view.md`, „States of shared controls”).
- Konto po zablokowaniu zostaje w bazie, więc rejestracja tym samym adresem dostaje „Konto z tym adresem już istnieje.” (D-100; `src/server/account-routes.ts:234`–`:256`); zablokowana osoba może założyć nowe konto innym adresem — definicja, uzasadnienie wpisu „(new) — Who can create and use a player account?”: “A blocked person can register a new account; this control does not identify or exclude a person across accounts.”
- Każda zmiana na serwerze, która nie jest wdrożeniem uruchomionym przez automat, należy do człowieka (D-12), a agent nie wykonuje poleceń w kontenerze ani nie czyta bazy kont (skill `loop2-deploy`, § „Agent or human”); polecenie blokady uruchamia więc tylko właściciel.
- Wycofanie wdrożenia zmienia kod, nie dane: aplikacja odmawia bazy o wersji schematu, której nie zna, więc commit sprzed zmiany schematu kończy wdrożenie kodem 8 (skill `loop2-deploy`, § „Rollback”, i `references/troubleshooting.md`, § „Rollback and the accounts”).
- Drugi proces otwierający tę samą bazę obok serwera: otwarcie bazy czeka na blokadę zapisu najwyżej ustawiony czas (D-112: “a bounded busy timeout”; commit `9c89d83`, test w `tests/account-storage.test.mjs`).
- Plik polecenia właściciela jest punktem uruchomienia — rodzajem odłożonym w `guidelines/coding.md`, § „Odłożone rodzaje i formatowanie”: „Osobne wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS również są odłożone.”; zadanie dodaje go bez wyboru wzorca, jak zadanie 15 zmieniło `src/server/main.ts`, a podobnym istniejącym plikiem jest `src/server/measure-passwords.ts`, uruchamiany przez człowieka na serwerze.

## Questions carried to cycle

- Jak baza w wersji schematu 1 przechodzi na wersję z blokadą — pierwsze przejście bazy kont z wersji 1 (pytanie 5): nowe brzmienie D-112, niezmienników `account-schema-lifecycle` i `account-database-schema`, które dziś mówią tylko o wersji 1, i reguły „Otwarcie schematu bez utraty danych” (punkty 5 i 8 To do); zadania 20, 16 i 21 dokładają po nim swoje wersje.
- Jak serwer unieważnia rekordy sesji blokowanego konta — usuwa je z bazy czy trwale oznacza jako nieważne — tak żeby sesja zapisana przez logowanie trwające w chwili blokady też nie dawała dostępu, a odblokowanie nie przywróciło żadnej z nich. Samo odrzucanie sesji przy odczycie po stanie konta nie wystarcza: `player-server-session/1` każe rekord unieważnić (“invalidates that record on logout or account blocking”), a odblokowanie przywróciłoby takie sesje (wiersz 2 *Settlements to record*); sprawdzenie stanu konta przy odczycie może unieważnienie tylko uzupełnić (punkty 2 i 3 To do, `blocked-account-access/1`).
- Jak logowanie zablokowanego konta liczy się do progów prób z D-102 (punkt 4 To do).
- Jak polecenie właściciela sięga do bazy obok działającego serwera, przy D-112 “The account server opens one application-owned SQLite connection before readiness” (punkty 1 i 2 To do).

## Human actions

- Wdrożenie commitu z requestu ręcznym uruchomieniem `loop2-deploy` przed scaleniem, do sprawdzenia z kryterium akceptacji — in the cycle (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”). Przyjęty koszt: wdrożenie przerabia trwałą bazę `loop2_accounts` na nowszą wersję schematu, więc gdy request nie zostanie scalony albo potem zmieni układ bazy, na serwerze zostaje baza, której kod z `main` odmawia (D-112), a naprawić ją może tylko człowiek; sprawdzenie dopiero po scaleniu, które wdraża samo (D-11), nie zostało wybrane.
- Zablokowanie i odblokowanie konta testowego na serwerze testowym poleceniem z punktów 1 i 2 To do — in the cycle (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”).

## Decisions in play

Wpisy rzutowane z definicji `definicja_mvp_loop2.md` (zatwierdzona 2026-10-28, odcisk 7e33760d; te cztery wpisy brzmią tak samo jak w wersji zatwierdzonej 2026-10-26, odcisk 7692b28a), § Projected foundation changes; przydział z planu `plan_mvp_loop2.md`, § Projected entries:

- „(new) — Who can create and use a player account?” (urzeczywistniają zadania 15, 16, 19; zapisuje zadanie 16): “Anyone can create a player account and start playing without approval. A signed-in player can read and change only their own saved game state. The operator can block an account from signing in and using the game.” — zadanie czyni prawdziwe trzecie zdanie.
- „(new) — How is a player's login kept between requests?” (urzeczywistniają zadania 15, 19; zapisuje zadanie 19): “The browser holds an opaque, random session identifier in a host-scoped, Secure and HttpOnly cookie. The account server keeps the session record in SQLite, checks it on authenticated requests and can invalidate it on logout or account blocking.” — zadanie 15 uczyniło prawdziwe wszystko poza unieważnieniem przy blokadzie konta; to zadanie dokłada unieważnienie przy blokadzie i zapisuje wpis.
- `blocked-account-access/1` (urzeczywistniają zadania 16, 19; zapisuje zadanie 19): “A blocked account cannot sign in or use authenticated game endpoints.” — zadanie czyni go prawdziwym dla dzisiejszych żądań wymagających zalogowania; żądania zapisu wnosi zadanie 16.
- `player-server-session/1` (urzeczywistniają zadania 15, 19; zapisuje zadanie 19): “The account server validates authenticated requests against a server-side SQLite session record and invalidates that record on logout or account blocking.” — zadanie dokłada część o blokadzie konta i zapisuje niezmiennik.

Obecne wpisy fundamentu (`foundations/`, loop2 `6540e4c`):

- D-11: “The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.”
- D-12: “An agent reads the server only through the `mikrus` MCP server and changes nothing on it. Every change on the server that is not a deployment started by the automation is made by a human.”
- D-75: “Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually.”
- D-97: “The shared „Wyloguj” button stands in the header beside the title and ends only this browser's server-side session.”
- D-99: “The account server normalizes email with ECMAScript trim and lowercase, stores the normalized address uniquely, and accepts its form when exactly one `@` has nonempty text on both sides. It imposes no dot, DNS or ASCII restriction; confirmation establishes whether the address is real.” — adres podany w poleceniu właściciela wskazuje konto tak samo jak przy logowaniu.
- D-100: “Registration with an email address that already has an account shows „Konto z tym adresem już istnieje.”. An unsuccessful credential login shows „Nieprawidłowy adres e-mail lub hasło.” without distinguishing an unknown address from a wrong password.”
- D-101: “Each browser holds its own random, opaque session identifier in a loop2 host-scoped, Secure and HttpOnly cookie, and a player may remain signed in through several browsers at once. A session expires 30 days after its last request and every request with a valid session, static-file requests included, renews the server expiry and cookie. Expired, removed or invalid sessions authorize nothing, and a delayed renewal cannot resurrect a destroyed session or shorten a later expiry.”
- D-102: “Five failed logins for one normalized email address within a rolling 15-minute window lock that address for 15 minutes from the fifth failure; success clears pre-lock email history but not IP failures, and a locked address remains locked even for correct credentials. […] A limited player sees „Za dużo prób. Spróbuj ponownie za kilka minut.”; invalid or duplicate registrations do not consume successful-account slots, and a capacity refusal is not a credential failure.”
- D-109: “A visitor may create an account or attempt credential login subject to the transport, origin, input and admission guards, and a valid server-side session alone authorizes reading its own account or destroying that browser's session. `GET /api/account` and `POST /api/logout` without a valid session return JSON 401, while an account identifier supplied in a request grants no authority. […]”
- D-112: “The account server opens one application-owned SQLite connection before readiness, transactionally initializes version 1 with accounts and sessions on a new database, retains an existing version 1 without resetting records and refuses an unknown newer schema. […]”
- D-114: “The exemplar for kind `database-access` is `src/server/database.ts`, and its kind guidelines are read before adding or changing a database-access file.”
- D-117: “The exemplar for kind `browser-api-client` is `src/browser/account-api.ts`, and its kind guidelines are read before adding or changing a browser API client file.” — dotyczy zadania przez nowy kod odmowy logowania (punkt 4 To do).
- Niezmienniki `account-session-authorization`, `account-schema-lifecycle`, `account-database-schema`, `account-session-storage` i `account-client-requests` (`foundations/invariants.md`).

## Settlements to record

Candidates: 4 shown, 4 accepted — 2026-10-28

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Właściciel blokuje i odblokowuje konto gracza poleceniem, które sam uruchamia na serwerze w kontenerze gry z adresem e-mail konta; polecenie mówi, czy konto zablokowało albo odblokowało, czy takiego adresu nie ma, a opisuje je skill `loop2-deploy`. | decision | pytania 1 i 2 (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”, drogi A); zderza się z D-112: “opens one application-owned SQLite connection” — polecenie otwiera bazę drugim procesem obok serwera | czy blokować panelem właściciela w przeglądarce z rolą konta, ręcznym zapytaniem SQLite czy poleceniem, i czy blokadę da się cofnąć; późniejsze zadanie, np. panel właściciela, nie wiedziałoby, że sposób jest wybrany i czemu |
| 2 | Sesja unieważniona przy blokadzie konta nie daje dostępu także po odblokowaniu konta. | invariant | pytanie 2 (droga A: „sesje unieważnione przy blokadzie nie wracają — gracz loguje się od nowa”); obok `player-server-session/1`, który każe przy blokadzie rekord sesji unieważnić (“invalidates that record on logout or account blocking”), i D-101, według którego unieważniona sesja nie daje dostępu (“Expired, removed or invalid sessions authorize nothing”); wiersz dokłada chwilę odblokowania | czy odblokowanie może przywrócić sesję, którą blokada tylko oznaczyła jako nieważną, zamiast ją usunąć |
| 3 | Zablokowany gracz, który przy logowaniu poda poprawne hasło, widzi w miejscu ostrzeżenia formularza logowania „To konto jest zablokowane.” i nie dostaje sesji, a przy złym haśle widzi jak dotąd „Nieprawidłowy adres e-mail lub hasło.”. | decision | pytanie 4 (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”, droga A); zmienia D-100: “An unsuccessful credential login shows „Nieprawidłowy adres e-mail lub hasło.”” — to zdanie zostaje dla złego hasła i nieznanego adresu | komunikat zablokowanego gracza i to, czy serwer ujawnia blokadę przed sprawdzeniem hasła albo wcale; obok D-100, którego zdanie o nieudanym logowaniu zostaje dla złego hasła |
| 4 | Zablokowane konto to konto, które operator (właściciel) odciął od logowania i gry i które takie zostaje, aż on je odblokuje — co innego niż czasowe zablokowanie adresu e-mail po pięciu nieudanych logowaniach z D-102. | glossary term | pytanie 1; D-102 (“a locked address remains locked even for correct credentials”); propozycja z materiału | czy blokada konta korzysta ze stanu, kodu odmowy „too-many-attempts” albo komunikatu czasowego zablokowania adresu z D-102, i jak nazwać jej stan w schemacie i w kodzie |

## Out of scope

- Odmowa żądań zapisu stanu gry zablokowanemu kontu — wnosi je zadanie 16 zapis-stanu-na-serwerze, które urzeczywistnia `blocked-account-access/1` dla tych żądań (plan, dziennik zmian 2026-10-11).
