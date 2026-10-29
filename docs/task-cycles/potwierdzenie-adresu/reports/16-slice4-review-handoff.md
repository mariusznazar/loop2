# Handoff — review of Slice 4, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; run checks that need changed
files in a separate worktree of the head commit, and remove that worktree when you are done.
Questions go to the orchestrator, never to the human.

- Worktree: `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; a file it names only when its step comes.
- What is reviewed: **Slice 4** of the plan, range `1c335f3..b4e50b2`.
- The executor's report: `.runs/task-cycles/potwierdzenie-adresu/reports/15-slice4-report.md` — claims to verify, not
  evidence. The executor's handoff, which carries the selection you also get (below):
  `.runs/task-cycles/potwierdzenie-adresu/reports/15-slice4-handoff.md`.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/16-slice4-review-report.md`, first line `PASS b4e50b2` or
  `FAIL b4e50b2`, or `questions`.
- The full gate is the orchestrator's; do not run `npm test` without a file. Never deploy, touch
  the server or connect to `outsider.mikr.us`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`, keys and the deployment: a session-less
  confirmation route, a session route that triggers a send, an outbound SMTP connection with a
  credential read from a file, new startup configuration, a schema step. Check crafted input at
  the boundary this slice touches.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server (H4, the merge). The cycle only prepares it.

## Answers and settlements the orchestrator gave the executor

- D-151 approved by the human 2026-10-29 (request #37): no test reaches Outsider; mail-sending
  code is tested against a real SMTP server on loopback, routes with a stand-in mailer.
- K1 settled after the spec's review: the issue operation stops every earlier unspent link of the
  same account and purpose in the transaction that inserts the new row; no retire step after the
  send (note at the head of `spec.md` *Decisions*, which prevails over Decisions 3, 4 and 12).
- The foundation entries are written (commits `f545afe`, `06b0385`, `6ec347f`, reviewed with
  Slice 1); plan rows F1–F33 map to identifiers in `reports/06-foundation-report.md`
  § "Entries written". Changed invariants may be ahead of code that later slices make.

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/coding-mail-sending.md` (written in Slice 3), `guidelines/coding-http-application.md`, `guidelines/testing.md`.

## Orchestrator's mechanical check

Clean worktree; one commit (`b4e50b2`); changed files equal the slice's *Change*; every check of
the report carries its command and exit code. Nothing passed on as a mismatch. Docker answers on
this machine (29.7.2); the quality tools are in `.runs/quality-venv` of the reviewed worktree.
`compose.yaml` gains the mail settings in Slice 9, not here.

## The slice under review — copied word for word from `plan.md`

### Slice 4 — Startup requires the mail settings and the SMTP password file

- **Goal:** `src/server/configuration.ts` reads and validates `LOOP2_MAIL_FROM`, `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`, `LOOP2_SMTP_USER` and `LOOP2_SMTP_PASSWORD_FILE` as account settings, as spec Decision 7 gives each (a start with any account setting requires all nine, production always; a partial or invalid set refuses before listening naming the setting or path and nothing of the value; the password file is a regular file of at most 1 KiB, strict UTF-8, non-empty, without control characters, a trailing newline refused, read once); the wholly unconfigured non-production mode stays; startup does not contact Outsider. `AccountRuntime` carries the mailer of Slice 2 built from these settings, the seam through which route tests later substitute a stand-in. Every test fixture that configures accounts supplies synthetic mail settings and a synthetic password file: the Node tests that open a runtime, the default-address test's list of account settings it strips, and the container support, which provisions the password file in its secret volume (root, group 1000, 0440), passes the settings and checks the file's owner, group and mode in its resource probe.
- **Change:** `src/server/configuration.ts` · `tests/startup.test.mjs` · `tests/http.test.mjs` · `tests/transport.test.mjs` · `tests/invariants/test_account_server_default_address.py` · `tests/invariants/account_container_support.py`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:50-52` question 5 ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:301-328` 7. Startup configuration of mail ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:330-346` 8. The SMTP password's path ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F6, F7, F15, F26 ·
  `foundations/decisions.md:1912-1923` D-111 · `foundations/decisions.md:252-265` D-13 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:946-959` D-49 ·
  `foundations/invariants.md:748-756` account-startup-configuration ·
  `foundations/invariants.md:508-516` account-server-default-address ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/environment_facts.md:244-248` session-secret-rotation ·
  `foundations/environment_facts.md:196-200` compose-file-secret-permissions ·
  `foundations/part_map.md:58-74` account-server · `foundations/part_map.md:76-106` build-tools ·
  `src/server/main.ts` · `src/server/app.ts` ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  src/server/account-mail.ts and guidelines/coding-mail-sending.md (made in Slices 2 and 3)
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`
- **Checks:** `npm test -- tests/startup.test.mjs`, starting from failing cases: each mail setting missing or invalid, and the password file missing, a directory, oversized, not UTF-8, empty or ending in a newline, each refuses before readiness naming its setting or path without its contents; a full valid set starts. Then `npm test -- tests/http.test.mjs`, `npm test -- tests/transport.test.mjs`, `npm test -- tests/invariants/test_account_server_default_address.py`; where Docker answers, `npm test -- tests/invariants/test_loop2_one_serving_process_container.py` and `npm test -- tests/deploy/test_account_storage.py` (a run whose cases all skip fails, and is reported as unchecked). `tests/invariants/test_loop2_one_serving_process.py` fails on the base on this machine and is not a check of this slice.
- **Depends on:** Slice 2 · F6 · F7 · F15

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-111 — `foundations/decisions.md:1912-1923`
- D-13 — `foundations/decisions.md:252-265`
- D-17 — `foundations/decisions.md:331-354`
- D-49 — `foundations/decisions.md:946-959`
- account-startup-configuration — `foundations/invariants.md:748-756`
- account-server-default-address — `foundations/invariants.md:508-516`
- loop2-host-sharing — `foundations/invariants.md:155-163`
- account-email-via-outsider — `foundations/invariants.md:898-906`
- session-secret-rotation — `foundations/environment_facts.md:244-248`
- compose-file-secret-permissions — `foundations/environment_facts.md:196-200`
- account-server — `foundations/part_map.md:58-75`
- build-tools — `foundations/part_map.md:77-107`

## Passage of `task.md` (`.runs/task-cycles/potwierdzenie-adresu/task.md:17-35`) — copied word for word

### To do

1. Po założeniu konta serwer wysyła na jego adres wiadomość z odnośnikiem potwierdzającym, z adresu `loop2@mariusznazar.com` z nazwą nadawcy „loop2”, przez SMTP Outsidera (`outsider.mikr.us`, port 587) biblioteką Nodemailer 10, tylko po przejściu połączenia na TLS; konto powstaje, a gracz wchodzi do siedziby także wtedy, gdy wysyłka się nie uda albo trafi na pułap D-105.
2. Wiadomość jest zwykłym tekstem bez HTML, z tematem „Potwierdź adres e-mail w loop2” i treścią: „Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik: <odnośnik> / Odnośnik jest ważny przez 24 godziny i działa raz. / Jeśli to nie Ty, zignoruj tę wiadomość.”
3. Odnośnik prowadzi na stronę gry `https://loop2.mariusznazar.com/`; strona sama wysyła potwierdzenie do serwera żądaniem spełniającym D-104 i robi to także wtedy, gdy gracz w tej przeglądarce nie jest zalogowany — wystarcza sam odnośnik.
4. Na czas potwierdzania gracz widzi „Potwierdzanie adresu…”, potem jedno zdanie: „Adres e-mail potwierdzony.” w roli `positive` albo „Odnośnik jest nieważny albo wygasł.” w roli `warning` — nad formularzami konta, gdy nie jest zalogowany, albo nad siedzibą, gdy jest.
5. Odnośnik potwierdzenia jest ważny 24 godziny i działa raz; wysłanie nowego odnośnika potwierdzenia unieważnia wcześniejsze odnośniki potwierdzenia tego konta.
6. Zalogowany gracz z niepotwierdzonym adresem widzi w nagłówku, pod tytułem i „Wyloguj”, na każdym ekranie, zdanie „Adres e-mail niepotwierdzony.” w roli `text-secondary` i przycisk „Wyślij ponownie”; po potwierdzeniu zdanie i przycisk znikają. Zaraz po założeniu konta stoi tam, gdy wiadomość wyszła: „Wysłaliśmy odnośnik potwierdzający na <adres>.”; gdy wysyłka trafiła na pułap D-105: „Za dużo wiadomości. Spróbuj ponownie za godzinę.” w roli `warning`; gdy wysyłka się nie udała: „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” w roli `warning` obok przycisku „Wyślij ponownie”, tak jak po nieudanym „Wyślij ponownie” (pytanie 8).
7. Ponowną wysyłkę może zlecić tylko zalogowany gracz i tylko na adres własnego konta. Przycisk „Wyślij ponownie” w czasie oczekiwania jest wyłączony i ma napis „Wysyłanie…”; po wysłaniu stoi „Wysłaliśmy odnośnik potwierdzający na <adres>.”; ponad pułapem D-105 (łącznie 30 wiadomości o koncie na godzinę, 3 na jeden adres na godzinę, wspólne z resetem hasła zadania 21) — „Za dużo wiadomości. Spróbuj ponownie za godzinę.” w roli `warning`; gdy wysyłka się nie uda (np. Outsider nie odpowiada albo połączenie nie przejdzie na TLS) — „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” w roli `warning`.
8. D-44 i reguła „States of shared controls” w `guidelines/styleguide-browser-view.md` dostają napis „Wysyłanie…” przycisku „Wyślij ponownie” obok „Logowanie…” i „Zakładanie konta…”, przez skill `the-way-maintain-styleguide`, a strona wszystkich stanów pokazuje stan oczekiwania i odmowy tego przycisku; nowe znaczenie wytycznych zatwierdził człowiek w pytaniu 3 (WAY-172).
9. Konta istniejące przed tym zadaniem, także na serwerze testowym, zostają z adresem niepotwierdzonym; baza otwiera się z nimi bez utraty kont i sesji, a stan potwierdzenia i odnośniki wchodzą do kolejnej wersji schematu po wersji, którą wprowadza zadanie 19 (pytanie 6).
10. Na serwerze testowym serwer wymaga do startu ustawień poczty: adres nadawcy, serwer `outsider.mikr.us`, port 587 i login jako jawne wartości w `compose.yaml`, a hasło SMTP w pliku `/etc/loop2/smtp-password` poza checkoutem, przekazanym tylko aplikacji jako sekret Compose tylko do odczytu; brak albo błąd tych ustawień zatrzymuje start przed nasłuchem, jak dziś przy kluczach sesji, a tryb bez konfiguracji D-111 poza produkcją zostaje.
11. Skill wdrożenia `loop2-deploy` (`.claude/skills/loop2-deploy/` i `.agents/skills/loop2-deploy/`) mówi, gdzie leży hasło SMTP, jak je wymienić (człowiek podmienia plik i kopię w prywatnej notatce, potem odtwarza kontener aplikacji) i co człowiek ustawia w Outsiderze i DNS.
12. Pierwszy plik wysyłający pocztę zostaje wzorcem nowego rodzaju kodu, z wytycznymi rodzaju i wierszem w indeksie `guidelines/coding.md`, przez skill `the-way-maintain-coding-guidelines` (WAY-216).
13. `guidelines/testing.md` mówi, jak testować kod rozmawiający z SMTP Outsidera, przez skill `the-way-maintain-testing-guidelines`; nowe znaczenie zatwierdza człowiek tak, jak daje WAY-172.
14. Fakt środowiska `mikrus-outsider-mail/1` z definicji wchodzi do fundamentu (plan: zapisuje go to zadanie).
15. Wiadomość potwierdzająca wysłana z wdrożonego kontenera loop2 dochodzi na zewnętrzną skrzynkę, a jej odnośnik oznacza adres konta jako potwierdzony (czynność człowieka H4).
16. Blokada konta poleceniem z zadania 19 unieważnia wszystkie wysłane odnośniki potwierdzenia tego konta, z testem; odnośnik zablokowanego konta nie działa — gracz widzi „Odnośnik jest nieważny albo wygasł.” w roli `warning`, a konto zostaje bez zmian; po odblokowaniu odnośniki sprzed blokady nie wracają, a gracz po zalogowaniu wysyła nowy przyciskiem „Wyślij ponownie” (pytanie 10). Odnośniki resetu hasła obejmuje ta sama reguła w zadaniu 21.

## Passage of `task.md` (`.runs/task-cycles/potwierdzenie-adresu/task.md:36-68`) — copied word for word

### Questions to settle

- 1. Jak długo jest ważny odnośnik potwierdzenia adresu i odnośnik resetu hasła, czy każdy działa tylko raz i czy po wysłaniu nowego odnośnika tego samego rodzaju działa jeszcze starszy? (Q1 rozmowy refinementu; pytanie otwarte planu „Jak długo są ważne odnośniki potwierdzenia adresu i resetu hasła?” przypisane temu zadaniu)
  - Answer: Jednorazowość odnośnika resetu rozstrzyga cytat z definicji, którego człowiek nie skreślił: “A password reset link is single-use and sent only to the account's previously confirmed email address.” Reszta — droga A przyjęta przez człowieka: odnośnik potwierdzenia jest ważny 24 godziny, odnośnik resetu 1 godzinę; każdy odnośnik działa raz; wysłanie nowego odnośnika unieważnia wcześniejsze tego samego rodzaju dla tego konta. Przyjęty koszt: kto otworzy starszą wiadomość po wysłaniu nowej, zobaczy „nieważny” i musi otworzyć najnowszą; kto nie zajrzy do poczty przez dobę, wysyła wiadomość ponownie.
  - Source: cytat — `definicja_mvp_loop2.md`, wpis projektowany `password-reset-verified-email/1` (pokazany przy definicji approved 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d, linie 1735–1738; brzmienie bez zmian w definicji approved 2026-10-28, odcisk 7e33760d, sha256 3e9c2cc9146b, linie 1744–1747), dokument-cytat podany przez agenta odpowiadającego i pokazany człowiekowi jako cytat (uwaga krytyki 17); droga A — Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7).
- 2. Co dzieje się, gdy gracz otwiera odnośnik z wiadomości, i co wtedy widzi? (Q2)
  - Answer: Droga A: odnośnik prowadzi na stronę gry `https://loop2.mariusznazar.com/`; strona sama wysyła potwierdzenie do serwera żądaniem zgodnym z D-104 i działa także wtedy, gdy gracz w tej przeglądarce nie jest zalogowany (wystarcza sam odnośnik). Na czas oczekiwania gracz widzi „Potwierdzanie adresu…”, potem jedno zdanie: „Adres e-mail potwierdzony.” w roli `positive` albo „Odnośnik jest nieważny albo wygasł.” w roli `warning` — nad formularzami konta, gdy nie jest zalogowany, albo nad siedzibą, gdy jest. Przyjęty koszt: ekran startowy gry dostaje jeszcze jeden stan; D-104 bez zmian, a D-109 zmienia się, bo sam odnośnik, bez sesji, uprawnia do potwierdzenia (uwaga krytyki 18). Odrzucona droga B (serwer potwierdza samym otwarciem odnośnika): wymaga wyjątku od D-104, a programy pocztowe i filtry antyspamowe potrafią same otwierać odnośniki i zużyć jednorazowy odnośnik.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7), droga A pytania Q2.
- 3. Co zalogowany gracz widzi o stanie swojego adresu i czy może sam wysłać wiadomość ponownie — także gdy wysyłka się nie udała albo przekroczyła pułap D-105? (Q3)
  - Answer: Droga A: zalogowany gracz z niepotwierdzonym adresem widzi w nagłówku, pod tytułem i „Wyloguj”, zdanie „Adres e-mail niepotwierdzony.” w roli `text-secondary` i przycisk „Wyślij ponownie”; po potwierdzeniu zdanie i przycisk znikają. Zaraz po założeniu konta stoi tam „Wysłaliśmy odnośnik potwierdzający na <adres>.”. Przycisk w czasie oczekiwania jest wyłączony i ma napis „Wysyłanie…”; po wysłaniu znów „Wysłaliśmy odnośnik potwierdzający na <adres>.”; ponad pułapem „Za dużo wiadomości. Spróbuj ponownie za godzinę.” w roli `warning`; gdy wysyłka się nie uda (np. Outsider nie odpowiada albo połączenie nie przejdzie na TLS), „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” w roli `warning`. Wysyłkę ponowną może zlecić tylko zalogowany gracz i tylko na adres własnego konta. Przyjęty koszt: nowa trasa zmieniająca stan (pod ochroną D-104), zmiana D-109 (sesja uprawnia też do ponownej wysyłki) oraz D-44 i reguły styleguide'u „States of shared controls” o napis „Wysyłanie…” — nowe znaczenie wytycznych zatwierdzone tą odpowiedzią (WAY-172); wiersz w nagłówku na każdym ekranie aż do potwierdzenia.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7), droga A pytania Q3.
- 4. Z jakiego adresu w `mariusznazar.com` wychodzi wiadomość i jaki ma temat i treść? (Q4)
  - Answer: Nadawca — droga A: `loop2@mariusznazar.com`, nazwa nadawcy „loop2”; odpowiedzi graczy trafiają do tej skrzynki (przyjęty koszt: skrzynkę warto czasem przejrzeć). Zwykły tekst bez HTML. Temat: „Potwierdź adres e-mail w loop2”. Treść: „Ktoś — zapewne Ty — założył konto w loop2 na ten adres e-mail. Aby go potwierdzić, otwórz odnośnik: <odnośnik> / Odnośnik jest ważny przez 24 godziny i działa raz. / Jeśli to nie Ty, zignoruj tę wiadomość.” — bez zdania „Potwierdzony adres pozwala samodzielnie zresetować zapomniane hasło.”, które może dodać zadanie 21 (uwaga krytyki 19).
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7), droga A pytania Q4 z treścią bez zdania o resecie.
- 5. Czy serwer na serwerze testowym wymaga ustawień poczty do startu i gdzie leży hasło SMTP? (Q5)
  - Answer: Hasło SMTP nie trafia do zmiennej środowiskowej kontenera — cytat, którego człowiek nie skreślił: D-13 *Verification*, violates: “an access or credential value in a workflow, script, skill, request, command argument, log or container environment”; *Rejected*: “environment delivery — exposes the credential through environment inspection.” Reszta — droga A: serwer wymaga do startu na serwerze testowym ustawień poczty: adres nadawcy, serwer `outsider.mikr.us`, port 587 i login jako jawne wartości w `compose.yaml`, a hasło SMTP w pliku `/etc/loop2/smtp-password` poza checkoutem (właściciel root, grupa 1000, prawa 0440 — jak plik kluczy sesji), przekazanym tylko aplikacji jako sekret Compose tylko do odczytu, z kopią w prywatnej notatce; wymiana: człowiek podmienia plik i kopię, potem odtwarza kontener aplikacji. Brak albo błąd tych ustawień zatrzymuje start przed nasłuchem, jak dziś przy kluczach sesji. Przyjęty koszt: H3 musi być zrobione przed scaleniem, bo scalenie samo wdraża (D-11) i bez pliku gra na serwerze nie wstanie; lokalnie tryb bez konfiguracji z D-111 zostaje. Odrzucona droga B (poczta opcjonalna) — D-111 odrzuca “an unconfigured production fallback — conceals missing setup”.
  - Source: cytat — `C:\Storage\repos\loop2\foundations\decisions.md`, D-13 (linie 252–264, loop2 6540e4c), podany przez agenta odpowiadającego (rozmowa refinementu tura 4) i pokazany człowiekowi jako cytat; droga A — Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7).
- 6. W jakiej kolejności idą cykle zadań 16, 19, 20 i 21, które wszystkie zmieniają schemat bazy kont, i czy cykl tego zadania pisze pierwsze przejście bazy z wersji 1? (Q6; pytanie kanoniczne: Q5 rozmowy refinementu zadania 19 blokada-konta; dotyczy też zadań 16, 21 i — przez zależność od 16 — startu zadania 17)
  - Answer: Droga A: cykle idą kolejno 19 → 20 → 16 → 21 — zadanie 20 zależy od 15 i 19, zadanie 16 od 3, 15, 19 i 20, zadanie 21 od 16 i 20. Cykl zadania 19 pisze pierwsze przejście bazy z wersji 1 (nowe brzmienie D-112, niezmienników `account-schema-lifecycle` i `account-database-schema` oraz reguły „Otwarcie schematu bez utraty danych” w `guidelines/coding-database-access.md`), a cykl tego zadania dokłada kolejną wersję. Przyjęty koszt: zapis stanu gry (16) i kopia bazy (17) czekają na cykl poczty z czynnościami H1–H4, a do scalenia zadania 16 odświeżenie strony gubi programy i postęp o cykl tego zadania dłużej — w fazie „Konta na serwerze testowym” konto ma tylko właściciel.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — odpowiedź A na pytanie Q5 rozmowy refinementu zadania 19 (część 1 pakietu rundy); zapisana w `plan_mvp_loop2.md` (zapis w sha256 5fa0238b02ec; bez zmian w sha256 f67ff61b42fb i w sha256 0bb32bb08456, nagłówek z odciskiem 7e33760d): wiersze 16, 20 i 21 tabeli Tasks oraz trzy linie dziennika zmian z 2026-10-28 (linie 244–246), z których pierwsza mówi: „zadanie 19 idzie pierwsze, […] więc jego cykl pisze pierwsze przejście bazy z wersji 1 […], a zadanie 20 dokłada kolejną wersję”.
- 7. Czy dopisanie poczty do skilla `loop2-deploy` (gdzie leży hasło SMTP, jak je wymienić, co człowiek ustawia w Outsiderze i DNS) zostaje w tym zadaniu, czy idzie do osobnego? (Q7)
  - Answer: Zostaje w tym zadaniu, razem z kodem, który wprowadza hasło SMTP (punkt 11 To do); przyjęty koszt: większy request (dwie kopie skilla). WAY-139: “where it has none or an item is missing, the task gains an item of its To do for that work or the human splits that work into a task of its own.”
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (część 2 pakietu rundy, rozmowa refinementu tura 7), droga A pytania Q7, pokazana jako domyślna z możliwością wydzielenia (uwaga krytyki 20); WAY-139 w `.the-way/foundations/decisions.md` (the-way 574a37b9).
- 8. Co zalogowany gracz widzi w nagłówku zaraz po założeniu konta, gdy wiadomość potwierdzająca przy założeniu konta nie wyszła — wysyłka się nie udała albo trafiła na łączny pułap D-105? (Q8)
  - Answer: Część o pułapie — rozstrzyga cytat: D-105 “Above either limit no message is sent and the player is told to try later” obejmuje każdą wysyłkę, także tę przy założeniu konta, a miejsce i zdanie daje przyjęta odpowiedź na pytanie 3 (zaraz po założeniu konta wiersz w nagłówku; ponad pułapem „Za dużo wiadomości. Spróbuj ponownie za godzinę.” w roli `warning`). Zaraz po założeniu konta, gdy wysyłka trafiła na pułap, nagłówek pokazuje więc „Za dużo wiadomości. Spróbuj ponownie za godzinę.” w roli `warning` obok „Wyślij ponownie”. Część o nieudanej wysyłce („Co nagłówek pokazuje zaraz po założeniu konta, gdy wysyłka się nie udała?”) — droga A: nagłówek pokazuje „Nie udało się wysłać wiadomości. Spróbuj ponownie później.” w roli `warning` obok przycisku „Wyślij ponownie”, tak jak po nieudanym „Wyślij ponownie”. Przyjęty koszt: przeglądarka musi poznać wynik rozmowy z Outsiderem — albo odpowiedź na założenie konta czeka na nią, więc wejście do siedziby opóźnia się o kilka sekund, a przy niedostępnym Outsiderze do limitu czasu, który wybierze cykl; albo przeglądarka dopytuje o wynik osobnym żądaniem, co dokłada stan i trasę; który sposób — wybiera cykl. Odrzucone: droga B (zawsze „Wysłaliśmy odnośnik potwierdzający na <adres>.”, także gdy wysyłka się nie udała — gracz czyta, że wiadomość wyszła, choć nie wyszła) i droga C (bez zdania o wysyłce — zmienia przyjęte w pytaniu 3 zdanie po założeniu konta).
  - Source: cytat — `C:\Storage\repos\loop2\foundations\decisions.md`, D-105 (linia 1811, loop2 6540e4c), wskazany przez krytykę rundy (rozmowa refinementu tura 10) i pokazany człowiekowi jako cytat 2026-10-28, nieskreślony (tura 12); pytanie 3 — Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” (rozmowa refinementu tura 7). Część o nieudanej wysyłce, droga A — Mariusz, 2026-10-28, „ok przyjmuję wpisy dla 19 i 20 i propozycje dla A-Q8 i Q9” (rozmowa refinementu tura 12, Q8).
- 9. Czy kandydaci do fundamentu z tego zadania biorą zasadę brzmienia przyjętą dla zadań 4, 5, 6, 7 i 11 — zastrzeżenie o wyborach na MVP i zakaz słów wykluczających? (pytanie kanoniczne Q15 rozmowy refinementu zadania 8 walka-w-glebi-lasu, wspólne dla zadań 8, 12, 19 i 20)
  - Answer: Droga B: zasada — zastrzeżenie „to są elementy na potrzeby mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie zabraniać alternatyw” (Mariusz, 2026-10-24) i zakaz słów wykluczających, takich jak „tylko”, „nigdy”, „zawsze”, „bez” — obowiązuje kandydatów zadań 8 i 12, a nie zadań 19 i 20; kandydaci tego zadania mogą używać słów wykluczających, jak zadanie 15.
  - Source: Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje” — odpowiedź B na pytanie kanoniczne Q15 rozmowy refinementu zadania 8 (część 1 pakietu rundy).
- 10. Co robi odnośnik potwierdzenia — i odnośnik resetu hasła z zadania 21 — konta, które właściciel zablokował: czy blokada unieważnia odnośniki wysłane przed nią, czy odnośnik działa, gdy konto jest zablokowane, i czy działa po odblokowaniu? (Q9 rozmowy refinementu; luka między zadaniami 19 i 20 wskazana przez krytykę rundy)
  - Answer: Droga A: blokada unieważnia wszystkie wysłane odnośniki konta (potwierdzenia i resetu), a odnośnik zablokowanego konta nie działa: gracz widzi „Odnośnik jest nieważny albo wygasł.” w roli `warning`, konto zostaje bez zmian. Po odblokowaniu odnośniki sprzed blokady nie wracają, jak sesje — gracz po zalogowaniu wysyła nowy przyciskiem „Wyślij ponownie”. Przyjęty koszt: cykl tego zadania dokłada do polecenia blokady z zadania 19 (już scalonego) unieważnienie odnośników konta, z testem, a sprawdzenie odnośnika czyta stan blokady; zablokowany gracz z odnośnika nie dowie się, dlaczego nie działa — dowie się przy logowaniu („To konto jest zablokowane.”, zadanie 19); zadanie 21 dziedziczy regułę dla resetu (zablokowany nie zmieni hasła odnośnikiem) i samo rozstrzyga, czy wysyła wiadomość resetu zablokowanemu kontu. Odrzucone: droga B (odnośnik działa niezależnie od blokady — zablokowane konto zmienia stan mimo blokady, a odnośnikiem resetu zablokowany gracz ustawiłby nowe hasło) i droga C (odnośnik nie działa w czasie blokady, ale po odblokowaniu znów działa, jeśli nie wygasł — niespójne z sesjami, a odnośnik resetu przechwycony przed blokadą działa zaraz po odblokowaniu).
  - Source: Mariusz, 2026-10-28, „ok przyjmuję wpisy dla 19 i 20 i propozycje dla A-Q8 i Q9” (rozmowa refinementu tura 12), droga A pytania Q9 z rozmowy refinementu (tura 11).

## Passage of `task.md` (`.runs/task-cycles/potwierdzenie-adresu/task.md:69-84`) — copied word for word

## Context

- Kod loop2 w commicie 6540e4c: zależności produkcyjne to tylko `argon2`, `express` i `express-session` (`package.json:17`–`21`); trasy kont to `/api/accounts`, `/api/session`, `/api/account` i `/api/logout` (`src/server/account-routes.ts:28`–`31`); pliki gry podaje `express.static` bez strony zastępczej dla innych ścieżek (`src/server/app.ts:58`), więc odnośnik z wiadomości musi trafić w plik, który istnieje, np. w stronę główną.
- Kodu wysyłającego pocztę loop2 jeszcze nie ma; `guidelines/coding.md` (Examples, „Odłożone rodzaje i formatowanie”) mówi: „Wzorce zapisu gry i poczty powstaną przy pierwszych implementacjach.”
- `guidelines/testing.md` (Choosing the level) dla pytania „Czy kod rozmawia z cudzą usługą?” ma tylko przypadek rejestru npm — stąd punkt 13 To do.
- DNS `mariusznazar.com` odczytany 2026-10-28 przez resolver 1.1.1.1: domena nie ma rekordów MX ani TXT, a `_dmarc.mariusznazar.com` nie ma rekordu TXT; serwery nazw to Cloudflare.
- Dokumentacja Outsidera (https://wiki.mikr.us/outsider/ i https://wiki.mikr.us/outsider/mail/, odczyt 2026-10-28): rekord MX `outsider.mikr.us` („Jeśli wcześniej były tam inne wpisy MX, to usuń je.”), SPF „v=spf1 a mx include:outsider.mikr.us ~all”, DKIM włączany przyciskiem „WŁĄCZ DKIM” w zakładce kont e-mail i rekord TXT `x._domainkey` z wartością z panelu, DMARC jako TXT `_dmarc` o wartości „v=DMARC1; p=none; fo=1; rua=mailto:{{TWÓJ_EMAIL}}”, SMTP `outsider.mikr.us` na porcie 587; limitów wysyłki strona nie podaje.
- Ta sama strona każe też „wycelować swoją domenę poprzez rekord DNS o nazwie “A” lub CNAME w Outsidera”, a uzasadnienie wpisu projektowanego „Which service delivers account emails?” mówi: “The website's DNS records do not need to be moved for mail-only use.”
- Konto Outsidera ma „limit 1000 wiadomości miesięcznie” (Mariusz, 2026-10-25, pytanie 9 zadania 15); pułap D-105 przyjęto ze świadomością, że może go wyczerpać.
- OWASP Email Validation and Verification Cheat Sheet (odczyt 2026-10-28): tokeny „Single-use” i „Time-limited”; „Never log verification, reset, or authentication tokens or full verification/reset URLs”. OWASP Forgot Password Cheat Sheet: „Single use and expire after an appropriate period.” Żadna z nich nie podaje liczby godzin.
- D-112 opisuje dziś tylko schemat w wersji 1 i odmawia nieznanego nowszego (`src/server/database.ts:98`–`130`, loop2 6540e4c); przejście z wersji 1 wnosi cykl zadania 19, który idzie przed tym zadaniem (pytanie 6).
- D-15: wycofanie wdrożenia przywraca kod, nie dane; kod sprzed zmiany schematu odmówi bazy w nowszym schemacie (D-112), więc po wdrożeniu tego zadania powrót do starszego commita wymaga też naprawy bazy.
- Zadanie 19 (blokada-konta), którego cykl idzie przed tym zadaniem, ma przyjęte odpowiedzi: właściciel blokuje i odblokowuje konto poleceniem uruchamianym na serwerze w kontenerze gry z adresem e-mail konta, a sesje unieważnione przy blokadzie nie wracają po odblokowaniu (Mariusz, 2026-10-28, „przyjmuję wszystkie rekomendacje”, drogi A pytań 1 i 2 zadania 19; dokument `_zadania/blokada_konta_loop2.md`, pytania 1 i 2) — na nich stoi pytanie 10.
- Plan (dziennik zmian 2026-10-11): „zadanie 20 […] ważność odnośnika resetu ustala razem z ważnością odnośnika potwierdzenia i zapisuje ją w fundamencie, skąd bierze ją zadanie 21” — niesie to wiersz K1 *Settlements to record*.
- Po czynnościach H1–H3 (2026-10-28, rozmowa refinementu tura 17): plik `/etc/loop2/smtp-password` na serwerze testowym trzyma samo hasło skrzynki `loop2@mariusznazar.com`, w UTF-8, bez końcowego znaku nowej linii; selektor DKIM Outsidera to dosłownie `x` (rekord `x._domainkey.mariusznazar.com`).

## Passage of `task.md` (`.runs/task-cycles/potwierdzenie-adresu/task.md:152-169`) — copied word for word

## Settlements to record

Candidates: 10 shown, 9 accepted — 2026-10-28

Wybór: Mariusz, 2026-10-28, „ok przyjmuję wpisy dla 19 i 20 i propozycje dla A-Q8 i Q9” (tura 12 rozmowy refinementu) — przyjęte K1–K7 i K9 w brzmieniu pokazanym po krytyce rundy; K8 („Konta założone przed tym zadaniem zostają z adresem niepotwierdzonym, a baza otwiera się z nimi bez utraty kont i sesji.”) pokazany jako odrzucony z powodem refinera — wiąże tylko przy tym przejściu schematu, a zachowanie kont przy przejściach schematu niesie nowe brzmienie D-112, które pisze cykl zadania 19 (pytanie 6) — i odrzucony. K10, zbudowany z odpowiedzi na pytanie 10 i pokazany osobno: Mariusz, 2026-10-28, „przyjmuję też propozycję na rekomendację dla zadania 20” (tura 14 rozmowy refinementu) — jedyną czekającą rekomendacją tego zadania było przyjęcie K10, więc K10 przyjęty w pokazanym brzmieniu. Odpowiedź na pytanie 8 (droga A) zostawia K3 w przyjętym brzmieniu. Brzmienie wedle pytania 9 (droga B): wiersze mogą używać słów wykluczających.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| K1 | Odnośnik potwierdzenia adresu jest ważny 24 godziny i działa raz, a odnośnik resetu hasła jest ważny 1 godzinę; wysłanie nowego odnośnika unieważnia wcześniejsze odnośniki tego samego rodzaju dla tego konta. | decision | pytanie 1 (A; Mariusz, 2026-10-28); plan, dziennik zmian 2026-10-11: ważność odnośnika resetu zapisuje to zadanie, a stosuje zadanie 21; jednorazowość odnośnika resetu mówi już wpis projektowany `password-reset-verified-email/1` (Decisions in play) — wiersz dokłada czasy ważności, jednorazowość odnośnika potwierdzenia i unieważnianie starszych | czas wygaśnięcia odnośnika potwierdzenia i — w zadaniu 21 — odnośnika resetu, i to, czy starszy odnośnik działa po wysłaniu nowego |
| K2 | Odnośnik z wiadomości otwiera stronę gry, która sama wysyła potwierdzenie do serwera żądaniem spełniającym D-104, także gdy gracz w tej przeglądarce nie jest zalogowany, bo wystarcza sam odnośnik; gracz widzi „Potwierdzanie adresu…”, a potem „Adres e-mail potwierdzony.” w roli `positive` albo „Odnośnik jest nieważny albo wygasł.” w roli `warning`, nad formularzami konta, gdy gracz nie jest zalogowany, albo nad siedzibą, gdy jest. | decision | pytanie 2 (A; Mariusz, 2026-10-28); zmienia D-109: “a valid server-side session alone authorizes reading its own account or destroying that browser's session” — wiersz dokłada uprawnienie samego odnośnika do potwierdzenia | czy serwer potwierdza adres samym otwarciem odnośnika (wyjątek od D-104), czy potwierdzenie wymaga sesji, i co gracz widzi — a w zadaniu 21, jak działa odnośnik resetu |
| K3 | Zalogowany gracz z niepotwierdzonym adresem widzi na każdym ekranie w nagłówku, pod tytułem i „Wyloguj”, „Adres e-mail niepotwierdzony.” w roli `text-secondary` i przycisk „Wyślij ponownie”, który zlecić może tylko zalogowany gracz i tylko na adres własnego konta; zaraz po założeniu konta i po wysłaniu stoi „Wysłaliśmy odnośnik potwierdzający na <adres>.”, ponad pułapem „Za dużo wiadomości. Spróbuj ponownie za godzinę.”, a przy nieudanej wysyłce „Nie udało się wysłać wiadomości. Spróbuj ponownie później.”, oba w roli `warning`; po potwierdzeniu zdanie i przycisk znikają. | decision | pytanie 3 (A; Mariusz, 2026-10-28); zmienia D-109 (sesja uprawnia też do ponownej wysyłki); D-105 mówi tylko “the player is told to try later”, także przy wysyłce zaraz po założeniu konta (pytanie 8, część o pułapie); co stoi zaraz po założeniu konta, gdy wysyłka się nie udała, dokłada pytanie 8 | gdzie i jak długo gracz widzi stan adresu, kto może zlecić ponowną wysyłkę i na jaki adres, oraz komunikaty pułapu i błędu wysyłki — także dla resetu w zadaniu 21, który dzieli pułap D-105 |
| K4 | Przycisk „Wyślij ponownie” czekający na serwer ma napis „Wysyłanie…”. | decision | pytanie 3 (A; Mariusz, 2026-10-28), nowe znaczenie wytycznych zatwierdzone tą odpowiedzią (WAY-172); zmienia D-44: “the button that sends a form then reads „Logowanie…” or „Zakładanie konta…” for the corresponding form” i regułę „States of shared controls” w `guidelines/styleguide-browser-view.md` | napis przycisku spoza formularza w czasie wysyłki — D-44 zna tylko „Logowanie…” i „Zakładanie konta…” |
| K5 | Wiadomość potwierdzająca wychodzi z `loop2@mariusznazar.com` z nazwą nadawcy „loop2”, zwykłym tekstem bez HTML, z tematem „Potwierdź adres e-mail w loop2” i treścią z pytania 4. | decision | pytanie 4 (A; Mariusz, 2026-10-28); wpisy projektowane „Which service delivers account emails?” i `account-email-via-outsider/1` mówią tylko „an address under `mariusznazar.com`”; zdanie o samodzielnym resecie hasła może dodać zadanie 21 | adres i nazwa nadawcy, HTML czy zwykły tekst, temat i treść — a w zadaniu 21 nadawca wiadomości resetu |
| K6 | Na serwerze testowym serwer wymaga do startu ustawień poczty — adresu nadawcy, serwera `outsider.mikr.us`, portu 587 i loginu jako jawnych wartości w `compose.yaml` oraz pliku hasła SMTP — a ich brak albo błąd zatrzymuje start przed nasłuchem. | decision | pytanie 5 (A; Mariusz, 2026-10-28); zmienia D-111: “Production requires valid `LOOP2_DATABASE_PATH`, `LOOP2_SESSION_SECRET_FILE`, `LOOP2_PUBLIC_ORIGIN` and `LOOP2_PROXY_MODE`” i może zmienić brzmienie niezmiennika `account-startup-configuration`; D-111 odrzuca “an unconfigured production fallback — conceals missing setup” | czy brak ustawień poczty zatrzymuje start, czy serwer startuje z pocztą wyłączoną |
| K7 | Hasło SMTP leży w pliku `/etc/loop2/smtp-password` poza checkoutem, z właścicielem root, grupą 1000 i prawami 0440, przekazanym tylko aplikacji jako sekret Compose tylko do odczytu, z kopią w prywatnej notatce właściciela; wymiana: człowiek podmienia plik i kopię, potem odtwarza kontener aplikacji. | decision | pytanie 5 (A; Mariusz, 2026-10-28) i cytat D-13 *Rejected*: “environment delivery — exposes the credential through environment inspection”; zmienia D-13 (dwa pliki poświadczeń: “`/etc/loop2/cloudflared-token` for the tunnel and `/etc/loop2/session-secrets` for session signing”), D-17 (“The tunnel token and session signing files are provisioned by the human”) i niezmiennik `loop2-host-sharing` (wylicza tylko udział tokenu tunelu i kluczy sesji) | miejsce, prawa i droga hasła SMTP do kontenera, jego wymiana — i to, czy zadanie 21 bierze ten sam sekret |
| K9 | Adres e-mail konta to adres podany przy jego założeniu — loop2 nie ma zmiany adresu, więc potwierdzenie dotyczy tego jednego adresu konta. | decision | dawny wpis *Out of scope* dokumentu (brzmienie refinera z tury 2: „Zmiana adresu e-mail konta — loop2 jej nie ma i to zadanie jej nie wnosi”), przeniesiony tu jako wykluczenie trwające dłużej niż zadanie (szablon zadania, Out of scope; WAY-26; uwaga krytyki 21); człowiek tego zdania nie przyjmował | czy cykl przewiduje zmianę adresu konta (np. wiąże potwierdzenie z adresem na wypadek zmiany) i czy zadanie 21 może zakładać, że potwierdzony adres konta jest stały |
| K10 | Blokada konta unieważnia wszystkie wysłane odnośniki konta, potwierdzenia adresu i resetu hasła; odnośnik zablokowanego konta nie działa — gracz widzi „Odnośnik jest nieważny albo wygasł.” w roli `warning`, a konto zostaje bez zmian — a po odblokowaniu odnośniki sprzed blokady nie wracają. | decision | pytanie 10 (A; Mariusz, 2026-10-28, „ok przyjmuję wpisy dla 19 i 20 i propozycje dla A-Q8 i Q9”); obok `blocked-account-access/1` (“A blocked account cannot sign in or use authenticated game endpoints.”) i `player-server-session/1` (“invalidates that record on logout or account blocking”), które mówią o logowaniu, żądaniach z sesją i rekordzie sesji, a odnośnik sesji nie potrzebuje (K2); obok przyjętego wiersza 2 zadania 19 („Sesja unieważniona przy blokadzie konta nie daje dostępu także po odblokowaniu konta.”) — wiersz dokłada odnośniki z wiadomości | czy polecenie blokady unieważnia wysłane odnośniki, czy sprawdzenie odnośnika czyta stan blokady i czy odnośnik sprzed blokady działa po odblokowaniu — a w zadaniu 21, czy zablokowany gracz ustawi odnośnikiem resetu nowe hasło |

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:276-310`) — copied word for word

### 6. The mail-sending unit — `src/server/account-mail.ts`, the exemplar of a new kind

One file, independent of HTTP and the database:

- A pure composition of the confirmation message from an address and a link: subject „Potwierdź
  adres e-mail w loop2”; plain text only, no HTML part; the body is the task's three parts, each a
  paragraph separated by one empty line, with the link alone on its own line right after the first
  part's sentence that ends with „otwórz odnośnik:” (answer 4's „ / ” marks the paragraph breaks).
- A mailer created from the mail settings, with one operation: send a composed message to one
  recipient, resolving to `sent` or `failed`, never rejecting. It:
  - refuses, as `failed` without connecting, a recipient that is not one plain address: exactly
    one `@`, text on both sides, no whitespace, control character, or any of `, ; < > ( ) [ ] " \ :`
    — D-99 accepts such addresses at registration, so they reach the sender and must not become
    extra recipients or header text;
  - passes the SMTP envelope explicitly (sender address, the one recipient), the From header as
    the configured address with the fixed display name „loop2” (K5), and the To header as that one
    address;
  - connects to the configured host and port without implicit TLS, with STARTTLS required, server
    certificate verified against the host name (minimum TLS 1.2), authenticates with the
    configured login and the password read at startup, and offers no fallback to plain text;
  - opens one connection per message (no pool), with per-phase timeouts of a few seconds and the
    overall 10-second deadline of Decision 5 (a constructor option, so tests shorten it);
  - turns off the library's logger and debug output and its file and URL access for content;
  - logs one fixed line on failure carrying only the library's error code (an upper-case word)
    or "unknown" — never the error message, the server's reply, the message, the link, the token,
    the login or the password.
- A test seam: the mailer accepts an additional trusted certificate for the server (used only by
  tests); certificate verification is never switched off.
- Route tests receive a stand-in mailer through the same interface (Decision 9).
- Rejected: composing the message in the route — mixes HTTP sequencing with message text and
  header safety; a module per concern (composer, transport) — two files for about one screen of
  code, and the exemplar would show half the kind.
- Cost if wrong: the kind's guidelines (To do 12) take this file as their exemplar; a later split
  changes the exemplar's row.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:311-339`) — copied word for word

### 7. Startup configuration of mail — five settings, part of the account settings

- New settings: `LOOP2_MAIL_FROM` (sender address), `LOOP2_SMTP_HOST`, `LOOP2_SMTP_PORT`,
  `LOOP2_SMTP_USER`, `LOOP2_SMTP_PASSWORD_FILE`. They join the account settings of D-111: a start
  with any account setting requires all nine (production always requires all nine); a partial or
  invalid set refuses before listening; the wholly unconfigured non-production mode stays. This
  matches To do 10's "jak dziś przy kluczach sesji" — session keys are required whenever accounts
  are configured.
- Validation, each failure naming its setting or path and nothing of the value:
  - sender: exactly one `@`, text on both sides, printable ASCII without whitespace or the
    address specials of Decision 6;
  - host: a DNS host name (letters, digits, hyphens, dots), at most 253 characters;
  - port: a decimal integer from 1 to 65535;
  - login: non-empty, at most 254 characters, printable, no whitespace or control character;
  - password file: a regular file of at most 1 KiB, strict UTF-8, non-empty, with no control
    character — so a trailing newline is refused rather than silently trimmed (the human's file
    has none, task Context); read once at startup.
- The public origin already configured builds the links.
- Startup does not contact Outsider: a failing Outsider must not keep the game down, and container
  and startup tests run without network.
- `AccountRuntime` gains the mailer built from these settings.
- Rejected: mail as a separate optional group with a "mail off" mode outside production — a second
  configured-but-incomplete mode beside D-111's one unconfigured mode, against "every partial
  explicit configuration refuses"; cheaper for existing test fixtures, which instead now supply
  synthetic mail settings. Trimming the password file — hides a rotation mistake until the first
  failed login to Outsider.
- Cost if wrong: every test and local run that configures accounts supplies the mail settings; a
  local run's sends then fail visibly unless it points at a local SMTP server.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:340-357`) — copied word for word

### 8. The SMTP password's path — a third Compose secret

- `compose.yaml`: a secret `loop2_smtp_password` from `/etc/loop2/smtp-password`, granted only to
  `app` in the short form (read-only `/run/secrets/loop2_smtp_password`, host permissions kept);
  the app's environment gains the five settings as plain values — `LOOP2_MAIL_FROM` and
  `LOOP2_SMTP_USER` `loop2@mariusznazar.com`, `LOOP2_SMTP_HOST` `outsider.mikr.us`,
  `LOOP2_SMTP_PORT` `587`, `LOOP2_SMTP_PASSWORD_FILE` `/run/secrets/loop2_smtp_password`.
- `deploy/loop2-deploy` and the Dockerfile do not change: a missing host file fails `compose up`
  or startup, which ends the deployment with exit 8 and the running containers as D-15 describes.
- `tests/invariants/test_loop2_host_sharing.py` admits exactly the third secret for `app` and
  still refuses every other source, grant or option; `tests/invariants/account_container_support.py`
  provisions a synthetic SMTP password file in its secret volume (root, group 1000, 0440) and
  passes synthetic mail settings, and its resource probe checks that file's owner, group and mode.
- Rejected: an environment variable for the password — D-13 Rejected; a Compose `environment`
  secret source — the same exposure.
- Cost if wrong: if the SMTP login is not the full address (open question of the task), the human
  changes one plain value in `compose.yaml` after H4; no credential moves.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:443-459`) — copied word for word

### 12. Units and their interfaces

| Unit | What it does | How it is used | Depends on |
|---|---|---|---|
| `src/server/account-mail.ts` (new kind) | composes the confirmation message; sends one message over SMTP with STARTTLS, bounded, never throwing | the send step calls compose then `send` → `sent`/`failed` | Nodemailer 10, the mail settings |
| `src/server/database.ts` | step 3; account `emailConfirmed`; issue link for an unblocked account under limits; retire earlier links; confirm by digest; block spends links; prune links | routes and the block command call synchronous methods | `node:sqlite` |
| `src/server/account-policy.ts` | D-105 numbers and window; link lifetime 24 h; token creation, format check and digest — pure, no HTTP or database | routes pass the numbers to the database and the digest to lookups | `node:crypto` |
| `src/server/configuration.ts` | reads and validates the five mail settings and the password file; builds the mailer into the runtime | startup, tests | `account-mail.ts` |
| `src/server/account-routes.ts` | the two routes, the send step, the extended account bodies | `createApp` | the units above |
| `src/server/account-block.ts` | unchanged behaviour of the command; its report line may mention that links stopped working | the owner | `database.ts` |
| `src/browser/account-api.ts` | the extended and the two new client calls | app, account screen, header row | `fetch` |
| `src/browser/view/email-status.ts` (new) | the header row | `app.ts` creates it with the client and the account | shared button, client |
| `src/browser/view/app.ts`, `account-screen.ts` | confirmation on load, notice placement, outcome hand-over | page start | the units above |

The seam for tests is the mailer interface: `createApp` (or the runtime it receives) takes a
mailer; the runtime built from configuration supplies the SMTP one.
