# Handoff — review of Slice 1, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; run checks that need changed
files in a separate worktree of the head commit. Questions go to the orchestrator, never to the human.

- Worktree: `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole; a file it names only when its step comes.
- What is reviewed: **Slice 1** of the plan, range `7a633a7..589f4d7`. The range includes the plan's
  *Foundation entries* (commits `f545afe`, `06b0385`, `6ec347f`), which slice 1's review judges,
  and the slice's code (commit `589f4d7`).
- Authors' reports: the foundation entries' writer —
  `.runs/task-cycles/potwierdzenie-adresu/reports/06-foundation-report.md`; the slice's executor —
  `.runs/task-cycles/potwierdzenie-adresu/reports/08-slice1-report.md`. Claims to verify, not evidence.
- Mechanical check by the orchestrator: clean worktree, one commit in the slice's code range, the
  changed files equal the slice's *Change*; each check of the report carries its command and exit
  code. No mismatch.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/09-slice1-review-report.md`, first
  line `PASS 589f4d7` or `FAIL 589f4d7`, or `questions`.
- The full gate is the orchestrator's; do not run `npm test` without a file.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`. Check crafted input there: token digests, SQL
  built from data, the issue-versus-block race across connections.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server. Check that the change only prepares it (code and tests on temporary databases),
  and that a moved version-1 or version-2 database keeps every account, session and value.

## Answers and settlements the orchestrator gave the executor

- D-151 approved by the human 2026-10-29 (request #37).
- K1 settled after the spec's review: the issue operation stops every earlier unspent link of the
  same account and purpose in the transaction that inserts the new row; no retire step after the
  send (note at the head of `spec.md` *Decisions*, which prevails over Decisions 3, 4 and 12).
- The foundation entries were written before the code; changed invariants may be ahead of code
  that later slices make (routes, client, compose). Judge the entries for fidelity to the task's
  rows, the projected entries and the spec, and the slice's code against them.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`,
`guidelines/testing.md`. Foundation entries written by the foundation step are listed with their
plan rows in `reports/06-foundation-report.md` § "Entries written".

## The slice under review — copied word for word from `plan.md`

### Slice 1 — Schema version 3 and the store of emailed links

- **Goal:** The account database has schema step 3 appended after task 19's step 2: `accounts` gains a nullable confirmation time (null for every existing account, every other value and every session kept), the account record carries `emailConfirmed`, and a STRICT table of emailed links holds one row per message sent or attempted (token digest as key, account with cascade, purpose `email-confirmation` or `password-reset`, creation and expiry times, a spent mark, indexes on account and creation time). `AccountDatabase` gains synchronous single-transaction operations, none spanning an `await`: issue a link for an unblocked account below the hourly limits it is given (outcome `issued`, `limited` or `blocked`, the block read in the same transaction as the insert, and the same transaction spending every earlier unspent link of the same account and purpose — spec *Decisions*, the orchestrator's note); confirm by digest (outcome `confirmed` or `invalid`, an invalid outcome changing nothing, a confirmation spending every unspent confirmation link of the account); blocking spends every link of the account in its existing transaction, unblocking restores none; the periodic cleanup prunes, in bounded batches, link rows both expired and older than one hour. The block command keeps its behaviour; its report line may say the account's links stopped working. No route, policy constant or token creation is in this slice: the methods take digests, times and limits as arguments.
- **Change:** `src/server/database.ts` · `src/server/account-block.ts` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:98-118` 1. Where the D-105 counters stand ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:146-193` 3. Schema version 3 ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F1, F8, F9, F11, F12, F14, F20, F21, F22 ·
  `foundations/decisions.md:1938-1949` D-112 · `foundations/decisions.md:1951-1964` D-114 ·
  `foundations/decisions.md:1830-1843` D-105 · `foundations/decisions.md:2484-2497` D-137 ·
  `foundations/decisions.md:2499-2510` D-138 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:284-302` D-15 ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/invariants.md:778-786` account-session-storage ·
  `foundations/invariants.md:838-846` blocked-account-access ·
  `foundations/invariants.md:848-856` player-server-session ·
  `foundations/invariants.md:858-866` unblock-restores-no-session ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  `foundations/glossary.md:157-161` blocked account · `foundations/glossary.md:39-44` test server ·
  `foundations/part_map.md:58-74` account-server ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md`
- **Model:** same — the schema step cannot be changed once deployed, and the issue-versus-block race spans two connections, so a fault survives in every moved database.
- **Risk:** trust boundary — `src/server/**` · cannot be undone — schema step 3 of the persistent database `loop2_accounts`, run on the test server when the human deploys the branch (H4) or the merge deploys `main`; this slice only writes and tests it on temporary databases.
- **Checks:** `npm test -- tests/account-storage.test.mjs`, starting from failing cases for: the move of a version-2 database written by the test's own schema to version 3 with every account, session and value kept and every account unconfirmed; issuing under and at both limits; confirming once, at the expiry boundary, after a later link was issued (also when its send then failed) and for a blocked account; a block committed through a second connection spending a link issued before it; pruning; an unknown newer version (the test's "newer" number moves past 3, since 3 is now known — a change of an existing test with its reason). Then `npm test -- tests/http.test.mjs` and `npm test -- tests/startup.test.mjs` unchanged and passing; `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** F1 · F8 · F9 · F11 · F12 · F14 · F20 · F21 · F22

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-143 — `foundations/decisions.md:2566-2579`
- D-147 — `foundations/decisions.md:2626-2639`
- D-148 — `foundations/decisions.md:2641-2652`
- D-137 — `foundations/decisions.md:2484-2497`
- D-149 — `foundations/decisions.md:2654-2665`
- D-112 — `foundations/decisions.md:1938-1949`
- D-114 — `foundations/decisions.md:1951-1964`
- D-105 — `foundations/decisions.md:1830-1843`
- D-138 — `foundations/decisions.md:2499-2510`
- D-99 — `foundations/decisions.md:1744-1757`
- D-15 — `foundations/decisions.md:284-302`
- account-schema-lifecycle — `foundations/invariants.md:758-766`
- account-database-schema — `foundations/invariants.md:768-776`
- account-session-storage — `foundations/invariants.md:778-786`
- blocked-account-access — `foundations/invariants.md:838-846`
- player-server-session — `foundations/invariants.md:848-856`
- unblock-restores-no-session — `foundations/invariants.md:858-866`
- unblock-restores-no-link — `foundations/invariants.md:878-886`
- email-confirmation-link — `foundations/invariants.md:868-876`
- account-message-limits — `foundations/invariants.md:888-896`
- node-sqlite-database — `foundations/environment_facts.md:250-254`
- sqlite-wal-concurrency — `foundations/environment_facts.md:316-320`
- blocked account — `foundations/glossary.md:157-161`
- test server — `foundations/glossary.md:39-44`
- account-server — `foundations/part_map.md:58-74`

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:53-95`) — copied word for word

## Constraints

- The frozen task: To do 1–16, answers 1–10, K1–K7, K9, K10, the fixed Polish sentences, sender,
  subject and body (K5), and the order of cycles: task 19's schema version 2 is merged at base
  `7a633a7`, so this change adds version 3 (answer 6).
- D-104 and `account-mutation-request-guards`: every new state-changing route takes exactly the
  configured Origin and a JSON body of expected fields, refused before mutation.
- D-109 and `account-session-authorization`: identity comes only from the stored session; this
  change adds two authorities (the link alone confirms its own account; a session sends a message
  to its own account's address), which change D-109 (K2, K3).
- D-110 and `account-request-transport`: the new routes stand behind the same transport gate.
- D-112 and `guidelines/coding-database-access.md`: one step per version appended at the end,
  steps 1 and 2 untouched, the move keeps every account and session value, no transaction spans
  an `await` or an HTTP response.
- D-111 and `account-startup-configuration`: settings are validated before listening, errors name
  the setting or path, never contents; the wholly unconfigured non-production mode stays (To do
  10).
- D-13, D-17, `loop2-host-sharing`, `compose-file-secret-permissions`: a file-backed secret,
  read-only, granted only to its consumer, keeping host owner root, group 1000, mode 0440; no
  credential in environment, arguments, logs, responses or repository files.
- D-117 and `account-client-outcomes`/`account-client-requests`: the browser reads typed results,
  relative `/api/` paths, no redirect, a bounded wait (15 s default, `src/browser/account-api.ts:72`).
- D-86 and `src/server/app.ts:58`: only files of the public directory exist; the link must hit
  `/`.
- D-39, D-40, D-44, the styleguide's „Each role in its meaning” and „States of shared controls”:
  shared controls only; waiting labels; refusal sentences in `warning`.
- D-96 and `email-verification-nonblocking`: entry without confirmation. D-96's "immediately
  enters the headquarters" is read as "without a confirmation step"; the bounded wait of Decision
  5 is the cost the human accepted in answer 8.
- OWASP (task Context): tokens single-use and time-limited; no token or full link in logs.
- Nodemailer 10 (registry: `nodemailer` latest 10.2.1, published 2026-10-22, no runtime
  dependencies, types bundled): with `requireTLS` the client sends STARTTLS whether or not it is
  advertised and fails the connection when the upgrade does not happen (source of 10.2.1,
  `dist/cjs/smtp-connection/index.js` around lines 141–147 and 1516–1537). Its per-phase timeouts
  (`connectionTimeout`, `greetingTimeout`, `socketTimeout`) do not bound a whole send.
- The code as it stands: `AccountDatabase` owns all SQL (`src/server/database.ts`), routes
  sequence work (`src/server/account-routes.ts`), `AccountPolicy` holds limits as constants with a
  supplied clock (`src/server/account-policy.ts`), the header is built in
  `src/browser/view/app.ts:30`–`36`, waiting text in `text-secondary` exists as
  `.session-check-text` (`src/browser/styles.css:186`).
- Production containers in tests are started by `tests/invariants/account_container_support.py`
  with explicit production settings; they will need the mail settings too.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:108-129`) — copied word for word

### 1. Where the D-105 counters stand — in the account database, counted from the link rows

Every account message is one row of the link table (Decision 3), written before the message is
handed to SMTP. Admission counts, in the same write transaction that inserts the row, the rows
created in the last hour — all of them (limit 30) and those of the account (limit 3) — and inserts
only below both limits; otherwise the outcome is `limited` and nothing is sent. The account stands
for the address because an account's address never changes (K9). A row counts whatever the send's
outcome: an attempt handed to Outsider may have been delivered even when the answer is a failure
or a timeout, and D-105 says "at most". The numbers 30, 3 and one hour stand as constants of the
account-policy kind; the database method receives them and does the counting and the insert
atomically.

- Rejected: process memory like D-103 — a restart or deployment within the hour clears the
  counters and lets up to 30 more messages through, so D-105's "at most 30 per hour" does not hold
  across a deployment; it also needs D-103's bounded-table, eviction and reservation machinery for
  a path that sends at most 30 times an hour. A separate counter table — a second record of the
  same fact the link rows already hold.
- Rejected: counting only successful sends — Outsider may accept a message whose answer was lost,
  and a player could hammer a failing Outsider without bound.
- Cost if wrong: a player whose three sends failed waits up to an hour; the counting query reads
  at most a day of rows (bounded by 30 an hour), negligible.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:156-204`) — copied word for word

### 3. Schema version 3 — one appended step: a confirmation column and a link table

Step 3, appended after task 19's step 2:

- `accounts` gains a nullable integer column for the time the address was confirmed; null means
  unconfirmed. Every existing account gets null and keeps every other value and every session
  (To do 9). The stored account read validates it as null or a safe integer, and the account
  record carries `emailConfirmed`.
- A new STRICT table of emailed links, one row per message sent or attempted: the token digest
  (primary key), the account (foreign key to `accounts(id)`, `ON DELETE CASCADE`), the purpose
  constrained to `email-confirmation` or `password-reset`, the creation time, the expiry time, and
  a spent mark (0 or 1). Indexes on the account and on the creation time.
- A row is usable while it is not spent, its expiry is later than now (the boundary equal to now
  is expired, as for sessions) and its account is not blocked.
- The purpose admits `password-reset` now because K1, K10 and D-105 already bind both kinds to the
  same rules and limits, and a CHECK cannot be widened in SQLite without rebuilding the table,
  which D-112 rejects where a column suffices. No code writes that purpose in this change.
- The rows serve as the D-105 record (Decision 1), so a spent row stays until both its expiry has
  passed and it is older than one hour; the existing periodic cleanup prunes such rows in bounded
  batches beside expired sessions.
- Operations, each a synchronous method of `AccountDatabase` inside one write transaction, none
  spanning an `await`:
  - issue a link: read the account's blocked state, count the last hour's rows (all, and the
    account's) against the given limits, and insert the row only for an unblocked account below
    both limits — outcome `issued`, `limited` or `blocked`; reading the block in the same
    transaction as the insert means a block committed by the owner's command either precedes it
    (nothing is inserted, no message goes) or follows it and spends the row it inserted, so a
    message already on its way carries a dead link — the rule D-112 already keeps for a session write — so no link issued around a block survives the
    unblock (K10, To do 16);
  - retire earlier links: after a successful send, mark spent every other unspent row of the same
    account and purpose created before the new one (K1: "sending a new link invalidates earlier
    ones" applies only once the new message has been sent; a failed send leaves earlier links
    valid, and its own row stays usable, harmless if never delivered and useful if it was);
  - confirm by digest: find the row of purpose `email-confirmation`, check it usable with the
    account's blocked state read in the same transaction, set the account's confirmation time if
    still null, and mark spent every unspent confirmation row of that account — outcome
    `confirmed` or `invalid`; an invalid outcome changes nothing;
  - blocking (D-137's command, `blockAccount`) also marks spent every link row of the account, of
    either purpose, in its existing transaction; unblocking clears only the block, so no link
    returns (K10).
- Rejected: deleting rows on use, supersession or block — loses the D-105 record (Decision 1) and,
  for a block, would let a blocked account's later sends escape the hourly count. A boolean
  confirmed column — equally small; the time is kept because it costs nothing and tells when.
  A purpose constrained to confirmation only — task 21 would have to rebuild the table.
  Keeping other confirmation links usable after confirmation — leaves live tokens for an account
  with nothing left to confirm.
- Cost if wrong: a deployed step is never edited (D-112), so a wrong column or constraint is fixed
  only by a later step; this is why the purpose and the spent mark are chosen for task 21 too.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:358-387`) — copied word for word

### 9. Testing without the real Outsider

- The mailer (Decision 6) is tested as an integration test against a real SMTP server on
  loopback, started in the test process from the `smtp-server` package (devDependency at the
  version whose `nodemailer` dependency equals the pinned one; registry latest 3.21.1 depends on
  `nodemailer` 10.2.1), port 0, readiness awaited with a time limit, closed after each case even
  on failure. Cases: a message is submitted only after STARTTLS and authentication with the
  configured login and password; a server that offers or completes no STARTTLS receives no
  message and the outcome is `failed`; a server that stops answering yields `failed` within the
  shortened deadline; a crafted recipient (CR/LF, comma, angle brackets, a second `@`) yields
  `failed` and nothing is submitted; the submitted message has exactly the one recipient, the
  From, To and Subject of K5, a text-only body with the link on its own line; nothing written to
  the console holds the password, the token or the link. The server's certificate is a test
  certificate the case trusts through the mailer's seam; how the test obtains it is left to the
  maker, provided no network is used and verification is not turned off.
- Routes are tested on real HTTP and SQLite (as `tests/http.test.mjs` does) with a stand-in
  mailer that records messages and returns the outcome the case chooses or never answers — the
  route reacts to the outcome; the SMTP operation is proved by the mailer's own tests (D-84).
  The token for confirming is read from the recorded message's link. Among the cases: a block
  committed through a second connection while the stand-in mailer holds its answer spends the
  link, which confirms nothing after unblocking; a block committed before issuing leaves no row
  and sends nothing; a failure to issue the row still answers registration with 201 and
  `failed`.
- The database step and the link operations are tested on real files in
  `tests/account-storage.test.mjs`, the version-2 database written by the test's own schema.
- Startup refusals are tested as today in `tests/startup.test.mjs`.
- Pure browser functions (reading the fragment, the outcome-to-sentence mapping) are unit tests
  under `tests/view/`; the client's new calls go to `tests/account-api.test.mjs`.
- No test reaches the real Outsider; delivery is H4, done by the human.

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
