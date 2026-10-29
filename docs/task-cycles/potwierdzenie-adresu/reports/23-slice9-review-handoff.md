# Handoff — review of Slice 9, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; run checks that need changed
files in a separate worktree of the head commit, and remove that worktree when you are done.
Questions go to the orchestrator, never to the human.

- Worktree: `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; a file it names only when its step comes.
- What is reviewed: **Slice 9** of the plan, range `53f2b82..37d7bc8`.
- The executor's report: `.runs/task-cycles/potwierdzenie-adresu/reports/22-slice9-report.md` — claims to verify, not
  evidence. The executor's handoff, which carries the selection you also get (below):
  `.runs/task-cycles/potwierdzenie-adresu/reports/22-slice9-handoff.md`.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/23-slice9-review-report.md`, first line `PASS 37d7bc8` or
  `FAIL 37d7bc8`, or `questions`.
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

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/testing.md`.

## Orchestrator's mechanical check

Clean worktree; two commits (`5c73dc7`, `37d7bc8`); changed files equal the slice's *Change*; every
check carries its command and exit code. Passed on as information: `npm test --
tests/deploy/test_account_storage.py` exits 1 at this head. The test (part `deployment`, not in any
slice's *Change*) compares the registration body with the later `GET /api/account` body
(`tests/deploy/test_account_storage.py:127-133`); since Slice 5 (`5ab1b5a`) the registration body
also carries `confirmationMessage`, `failed` in a container without a reachable mail server. Slice
4 ran it green at `b4e50b2`; Slice 5 did not run it. Judge it and name the slice it comes from.

## The slice under review — copied word for word from `plan.md`

### Slice 9 — The deployment grants the SMTP password, and the deploy skill says so

- **Goal:** `compose.yaml` declares the secret `loop2_smtp_password` from `/etc/loop2/smtp-password`, granted only to `app` in the short form, and gives `app` the five mail settings as plain values (`LOOP2_MAIL_FROM` and `LOOP2_SMTP_USER` `loop2@mariusznazar.com`, `LOOP2_SMTP_HOST` `outsider.mikr.us`, `LOOP2_SMTP_PORT` `587`, `LOOP2_SMTP_PASSWORD_FILE` `/run/secrets/loop2_smtp_password`); `deploy/loop2-deploy` and the Dockerfile do not change. `tests/invariants/test_loop2_host_sharing.py` admits exactly the third secret for `app` and the fixed settings, and still refuses every other source, grant or option. Both copies of the `loop2-deploy` skill, kept byte-identical, say where the SMTP password lies and how its metadata is read (`stat -c '%U %g %a' /etc/loop2/smtp-password`, expecting `root 1000 440`), its rotation by the human (replace the file and the private copy, then recreate the application container), what the human set in Outsider and DNS (H1, H2), that an agent never reads or changes it and never sends mail through Outsider, the rollback note that the first deployment of this change moves the database to version 3 so earlier code refuses it, H4, and the failure line's error code (`EAUTH` against a connection or TLS failure) as what an agent may read in the service logs. No value of a credential or access stands in any file.
- **Change:** `compose.yaml` · `tests/invariants/test_loop2_host_sharing.py` · `.claude/skills/loop2-deploy/SKILL.md` · `.claude/skills/loop2-deploy/references/setup_and_secrets.md` · `.claude/skills/loop2-deploy/references/troubleshooting.md` · `.agents/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/references/setup_and_secrets.md` · `.agents/skills/loop2-deploy/references/troubleshooting.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:36-67` Questions to settle ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:96-101` Human actions ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:301-328` 7. Startup configuration of mail ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:330-346` 8. The SMTP password's path ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:422-431` 11. The two delivery questions ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:525-542` Left to the maker ·
  plan Foundation entries F6, F7, F9, F12, F16, F24, F26, F28, F30 ·
  `foundations/decisions.md:211-230` D-11 · `foundations/decisions.md:232-250` D-12 ·
  `foundations/decisions.md:252-265` D-13 · `foundations/decisions.md:284-302` D-15 ·
  `foundations/decisions.md:331-354` D-17 · `foundations/decisions.md:1938-1949` D-112 ·
  `foundations/decisions.md:2484-2497` D-137 · `foundations/decisions.md:1912-1923` D-111 ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/environment_facts.md:196-200` compose-file-secret-permissions ·
  `foundations/environment_facts.md:202-206` mikrus-tunnel-outbound-tcp ·
  `foundations/environment_facts.md:304-308` docker-volume-lifecycle ·
  `foundations/glossary.md:32-37` deployment · `foundations/glossary.md:39-44` test server ·
  `foundations/part_map.md:108-122` agent-workflow · `foundations/part_map.md:132-153` deployment ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — keys and the deployment: `compose.yaml` grants a runtime credential to the container, and the skill tells agents and the human how that credential and the first deployment of schema version 3 are handled (added by the orchestrator in the plan's review).
- **Checks:** `npm test -- tests/invariants/test_loop2_host_sharing.py`, starting from failing cases: the third secret granted to `app` only and the five settings fixed; a grant of it to `cloudflared`, an `environment` source and a long-form option refused. Then `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; where Docker answers, `npm test -- tests/deploy/test_account_storage.py` (all cases skipped is reported as unchecked); `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** Slice 4 · F6 · F7 · F16

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-111 — `foundations/decisions.md:1912-1923`
- D-13 — `foundations/decisions.md:252-265`
- D-17 — `foundations/decisions.md:331-354`
- D-137 — `foundations/decisions.md:2484-2497`
- D-148 — `foundations/decisions.md:2641-2652`
- D-112 — `foundations/decisions.md:1938-1949`
- D-141 — `foundations/decisions.md:2540-2551`
- D-11 — `foundations/decisions.md:211-230`
- D-12 — `foundations/decisions.md:232-250`
- D-15 — `foundations/decisions.md:284-302`
- loop2-host-sharing — `foundations/invariants.md:155-163`
- account-email-via-outsider — `foundations/invariants.md:898-906`
- mikrus-outsider-mail — `foundations/environment_facts.md:322-326`
- compose-file-secret-permissions — `foundations/environment_facts.md:196-200`
- mikrus-tunnel-outbound-tcp — `foundations/environment_facts.md:202-206`
- docker-volume-lifecycle — `foundations/environment_facts.md:304-308`
- deployment — `foundations/glossary.md:32-37`
- test server — `foundations/glossary.md:39-44`
- agent-workflow — `foundations/part_map.md:109-123`

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

## Passage of `task.md` (`.runs/task-cycles/potwierdzenie-adresu/task.md:96-102`) — copied word for word

## Human actions

- H1. W panelu Outsidera: dodać domenę `mariusznazar.com`, założyć skrzynkę nadawcy `loop2@mariusznazar.com` i włączyć DKIM („WŁĄCZ DKIM”) — before the cycle, done (2026-10-28: panel odpowiedział „mariusznazar.com: DKIM włączon”; serwer nazw Outsidera `outsider.mikr.us` podaje TXT `x._domainkey.mariusznazar.com` „v=DKIM1; k=rsa; p=MIIBIjANBg…QIDAQAB”; rozmowa refinementu tura 17).
- H2. W DNS `mariusznazar.com` w Cloudflare: rekord MX na `outsider.mikr.us`, TXT SPF „v=spf1 a mx include:outsider.mikr.us ~all”, TXT DKIM `<selektor>._domainkey` z wartością z panelu Outsidera, TXT `_dmarc` „v=DMARC1; p=none; fo=1; rua=mailto:<adres raportów>”; rekordów strony (A, CNAME) nie ruszać — before the cycle, done (2026-10-28, „dodałem rekordy”; publiczne resolwery 1.1.1.1 i 8.8.8.8 podają MX 5 `outsider.mikr.us`, TXT „v=spf1 a mx include:outsider.mikr.us ~all”, TXT `_dmarc` „v=DMARC1; p=none; fo=1; rua=mailto:loop2@mariusznazar.com” — adres raportów wybrał człowiek: „niech będzie na tą skrzynkę” — i TXT `x._domainkey` taki sam jak na serwerze nazw Outsidera; rekordy strony nietknięte; rozmowa refinementu tura 17, odczyt refinera przez 1.1.1.1 w turze 18 zgodny).
- H3. Na serwerze testowym: plik `/etc/loop2/smtp-password` z hasłem SMTP skrzynki nadawcy, poza checkoutem, właściciel root, grupa 1000, prawa 0440, i jego kopia w prywatnej notatce właściciela — before the cycle, done (2026-10-28: plik założył człowiek jako root, hasło wpisane bez echa; `stat -c '%U %g %a' /etc/loop2/smtp-password` → „root 1000 440”; kopia w prywatnej notatce — krok człowieka; rozmowa refinementu tura 17).
- H4. Próba doręczenia: wdrożenie commita gałęzi zadania na serwer testowy zainstalowanym skryptem wdrożenia (D-15), założenie konta adresem na zewnętrznej skrzynce, odebranie wiadomości i otwarcie odnośnika; z przyjętym kosztem: wdrożenie gałęzi przerabia bazę serwera testowego na nowy schemat przed scaleniem, a jeśli request nie zostanie scalony, kod z `main` odmówi nowszego schematu (D-112) i bazę naprawia tylko człowiek — in the cycle.

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:432-442`) — copied word for word

### 11. The two delivery questions — left to H4, not to code

Whether mail from the deployed container reaches an external inbox and whether the SMTP login is
the full address are settled only by the human's H4 (task, Human actions and To do 15); no code or
test of this change can settle them. The change takes the full address as the login (the task's
To do 10 value) as a plain `compose.yaml` value, so a different login is a one-line change after
H4, and the mailer's failure line (error code only, Decision 6) is what the agent may read through
the service logs to tell an authentication failure (`EAUTH`) from a connection or TLS failure
during H4. Outbound TCP from the container to `outsider.mikr.us:587` is unverified (the fact
`mikrus-tunnel-outbound-tcp` covers only the tunnel port); H4 shows it.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:535-553`) — copied word for word

## Left to the maker

- Names of methods, types, the column, the table and the CSS classes; the exact signature of the
  test seam for the mailer.
- The per-phase SMTP timeouts within the 10-second deadline.
- The wording of the `email-already-confirmed` refusal message (never shown: the row disappears)
  and of the command's report line after a block.
- How the mailer test obtains and trusts its certificate (no network, verification on).
- Whether the confirmation notice and the confirmation flow stay in `app.ts` or take a module of
  their own.
- The deploy skill's text in both copies (`.claude/skills/loop2-deploy/` and
  `.agents/skills/loop2-deploy/`, kept identical): where the SMTP password lies, its metadata read
  (`stat -c '%U %g %a' /etc/loop2/smtp-password`, expecting `root 1000 440`), its rotation (the
  human replaces the file and the private copy, then recreates the application container), what
  the human set in Outsider and DNS (H1, H2), the agent's limits on it, the rollback note that the
  first deployment of this change moves the database to version 3, and H4.
- Slicing, if the plan divides the change (Decision 12's units suggest server storage and mail,
  routes, browser, deployment, guidelines).
