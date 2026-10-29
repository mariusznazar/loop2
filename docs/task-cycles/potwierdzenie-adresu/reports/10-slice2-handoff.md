# Handoff — Slice 2 executor, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh executor of one planned slice.
Questions go to the orchestrator, never to the human; you return at your slice's boundary and
start no other slice.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`. Process pin `.the-way` at `3aee7d9`. Only you write in this
  worktree while you work.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it
  whole; read a file it names (`slice.md`, `ui_check.md` …) only when the step or variant that
  names it comes. Your variant: **"a slice, or the retry of a slice"**.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md`; reviewed spec:
  `.runs/task-cycles/potwierdzenie-adresu/spec.md`; plan:
  `.runs/task-cycles/potwierdzenie-adresu/plan.md`. What your slice needs of them is copied below;
  the files are their addresses.
- The product's instructions: `AGENTS.md` in the worktree (read `guidelines/coding.md` before
  changing code, `guidelines/testing.md` before changing tests, and `src/browser/AGENTS.md` when
  working in `src/browser/`). Commit by explicit paths (`git add <path>…`), English messages in
  the repository's style (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`).
  Do not push. Do not run the whole gate (`npm test` without a file); run the focused checks your
  slice names, each as `npm test -- <file>` or the command given, and report each with its command
  and exit code.
- Never deploy, never touch the server, never connect to `outsider.mikr.us` or send real mail
  (D-12; step 4 below).
- Dependencies are installed (`npm ci` ran on the base); the quality tools are in
  `.runs/quality-venv`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (part map, `account-server`): a session-less
  confirmation route, a session route that triggers a send, an outbound SMTP connection with a
  credential read from a file, new startup configuration, a schema step. Crafted input at that
  boundary is checked by every review.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server, run by the human's deployment (H4) and by the merge (D-11). The cycle prepares
  it and tests it only on temporary databases; it never performs it.

## Answers and settlements the orchestrator gives

- **D-151 is approved by the human** (2026-10-29, "przyjmuję A", recorded on request #37): no test
  reaches Outsider; mail-sending code is tested against a real SMTP server on loopback, routes
  with a stand-in mailer.
- **K1 settled after the spec's review** — copied word for word from the note at the head of
  `spec.md` *Decisions*, which prevails over the spec's Decisions 3, 4 and 12 where they differ:

  > **Settled after review by the orchestrator (2026-10-29, cycle Q2 revised).** The foundation step
  > found that the retire step after `sent` leaves an exception K1 does not allow (a retire that fails
  > after the mail service accepted the message). The cycle changes its own design so that K1 holds
  > whole: **the issue operation stops every earlier unspent link of the same account and purpose in
  > the same transaction that inserts the new row**, before the message is handed to the mailer. There
  > is no separate retire step and no retire failure case. A send that then fails leaves no earlier
  > link working; the player sends again. Where Decisions 3, 4 and 12 below say otherwise ("retire
  > earlier links: after a successful send", "on `sent` retire earlier links", "retiring earlier links
  > throws after the mailer answered `sent`"), this note prevails.

- The foundation entries of this change are written (commits `f545afe`, `06b0385`, `6ec347f`);
  plan rows F1–F33 map to identifiers as `reports/06-foundation-report.md` § "Entries written"
  lists. Changed invariants are ahead of the code until the slices land.
- Checks failing on the base on this machine: `tests/invariants/test_loop2_one_serving_process.py`
  (`Get-NetTCPConnection -State Listen` returns no objects in this environment). It is not a
  check of any slice.

## Base, report and return



- Slice base (recorded before dispatch): `589f4d7` (Slice 1 reviewed, PASS). Your commits go on top of it.

- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/10-slice2-report.md`

- Return only: your status (`done`, `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path.

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/testing.md`. The kind `mail-sending` has no guideline file yet — Slice 3 writes it from your file; follow D-150 and spec Decision 6.

- F31 is yours: write the part map's claim of `tests/account-mail.test.mjs` under `account-server` *Files* through the project skill `the-way-update-part-map` (`.claude/skills/the-way-update-part-map/`), with the file.

- Installing `nodemailer` and `smtp-server` reaches the public npm registry; that is allowed. Name the versions pinned and the audit result in your report.

## Your slice — copied word for word from `plan.md`

### Slice 2 — The mailer, first file of the kind mail-sending

- **Goal:** `src/server/account-mail.ts` exists, independent of HTTP and the database: a pure composition of the confirmation message from an address and a link (subject, plain text only, the three paragraphs of answer 4 with the link alone on its own line after „otwórz odnośnik:”), and a mailer built from the mail settings whose one operation sends a composed message to one recipient and resolves to `sent` or `failed`, never rejecting. It refuses without connecting a recipient that is not one plain address (the characters spec Decision 6 lists); passes the envelope explicitly and the From header with the fixed display name „loop2”; connects without implicit TLS with STARTTLS required, certificate verified against the host name, TLS 1.2 at least, authenticated, no plain-text fallback; one connection per message with per-phase timeouts and an overall deadline of 10 s that is a constructor option; turns off the library's logger, debug output and file or URL access; logs on failure one fixed line with only the library's error code or "unknown". A test-only seam trusts an additional server certificate; verification is never switched off. Nodemailer 10 is a runtime dependency and `smtp-server` a development dependency at the version whose `nodemailer` dependency equals the pinned one. `tests/account-mail.test.mjs` is an integration test against a real SMTP server on loopback (port 0, readiness awaited with a time limit, closed after each case even on failure, no network) holding the cases of spec Decision 9, the STARTTLS case marked `invariant: account-email-nodemailer-starttls` (F27). The part map's `account-server` claims the test file (F31, through `the-way-update-part-map`). The executor may read the Nodemailer 10 and `smtp-server` documentation or their installed sources for options and naming each reach in its report.
- **Change:** `src/server/account-mail.ts` · `tests/account-mail.test.mjs` · `package.json` · `package-lock.json` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:247-264` 5. How the browser learns the outcome at registration ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:422-431` 11. The two delivery questions ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F5, F13, F24, F25, F26, F27, F29, F30, F31, F32 ·
  `foundations/decisions.md:252-265` D-13 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:708-719` D-33 · `foundations/decisions.md:1459-1470` D-81 ·
  `foundations/decisions.md:1498-1509` D-84 ·
  `foundations/invariants.md:448-456` introduced-npm-vulnerabilities ·
  `foundations/glossary.md:100-104` integration test ·
  `foundations/part_map.md:58-74` account-server · `foundations/part_map.md:76-106` build-tools ·
  `foundations/part_map.md:155-168` External context ·
  `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** same — the first file of a kind that every later mail file copies, with TLS, header-injection and secret-handling rules and an SMTP test harness the product has none of.
- **Risk:** trust boundary — `src/server/**` · `package-lock.json`
- **Checks:** `npm test -- tests/account-mail.test.mjs`, starting from the failing STARTTLS case (a server that offers or completes no STARTTLS receives no message, outcome `failed`), then the cases of spec Decision 9; `npm test -- tests/quality/test_node_test_selection.py`; `npm test -- tests/quality/test_quality_invariants.py` (lint, format and the audit of the changed lockfile, which reads the public npm registry); `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** F5 · F13 · F25 · F27 · F29 · F30 · F32

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-146 — `foundations/decisions.md:2611-2624`
- D-150 — `foundations/decisions.md:2667-2680`
- D-141 — `foundations/decisions.md:2540-2551`
- D-142 — `foundations/decisions.md:2553-2564`
- D-151 — `foundations/decisions.md:2682-2695`
- D-13 — `foundations/decisions.md:252-265`
- D-99 — `foundations/decisions.md:1744-1757`
- D-33 — `foundations/decisions.md:708-719`
- D-81 — `foundations/decisions.md:1459-1470`
- D-84 — `foundations/decisions.md:1498-1509`
- account-email-via-outsider — `foundations/invariants.md:898-906`
- account-email-nodemailer-starttls — `foundations/invariants.md:908-916`
- introduced-npm-vulnerabilities — `foundations/invariants.md:448-456`
- nodemailer-require-tls — `foundations/environment_facts.md:328-332`
- mikrus-outsider-mail — `foundations/environment_facts.md:322-326`
- integration test — `foundations/glossary.md:100-104`
- account-server — `foundations/part_map.md:58-74`
- build-tools — `foundations/part_map.md:76-106`

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:257-275`) — copied word for word

### 5. How the browser learns the outcome at registration — the registration answer waits for the send, bounded at 10 s

The registration response is sent after the send step ends, and the send step is bounded by an
overall deadline of 10 seconds after which its outcome is `failed` and the SMTP connection is
closed; a late answer from Outsider is ignored. The browser client's 15-second limit is kept, so
hashing, the session write and the bounded send end well within it. Meanwhile the registration
button reads „Zakładanie konta…” as today. A client that disconnects does not stop the send; the
account and session exist, and a reload shows the header row.

- Rejected: the send in the background with the browser polling for its outcome (the human's
  second listed way) — a per-account in-flight state, a field or route to poll, and a poll loop in
  the page, for a wait of normally one to three seconds.
- Rejected: registration answering at once and the page requesting the first send itself — the
  server would send nothing after a registration whose page did not follow up, against To do 1
  ("po założeniu konta serwer wysyła"), and the human did not see this way.
- Cost if wrong: while Outsider hangs, entering the headquarters takes up to about 10 s more; that
  is the cost named in answer 8. If measurements show slower normal sends, only the deadline and
  the client limit change.

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
