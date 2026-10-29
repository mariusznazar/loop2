# Handoff — Slice 3 executor, task `potwierdzenie-adresu`

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



- Slice base (recorded before dispatch): `426081f` (Slice 2 and its fix). Your commits go on top of it.

- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/14-slice3-report.md`

- Return only: your status (`done`, `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path.

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`.

- The-way files your *Read* names: `.the-way/product-guidelines/template.md`, `.the-way/product-guidelines/coding/template.md`, `.the-way/product-guidelines/coding/SKILL.md` (project skill `the-way-maintain-coding-guidelines`: write as the cycle's author of that skill writes kind files). The exemplar: `src/server/account-mail.ts` and `tests/account-mail.test.mjs` at `426081f`.

- Slice 2's review (`reports/11-slice2-review-report.md`, `reports/13-slice2-fix-review-report.md`) may be read for what was judged in the exemplar.

## Your slice — copied word for word from `plan.md`

### Slice 3 — Coding guidelines of the kind mail-sending

- **Goal:** `guidelines/coding-mail-sending.md` exists in the form of a kind's guidelines, with `src/server/account-mail.ts` as its exemplar under F13, its rules drawn from the decisions the foundation step wrote and from the exemplar, and its *Where in code*; `guidelines/coding.md` gains the kind's row in *Kinds of code* and its line on deferred kinds no longer defers the mail pattern. The slice is written as the cycle's author of `the-way-maintain-coding-guidelines` writes kind files ("Writing the files" of the coding template). A rule that needs a meaning no decision carries is not written: the slice returns it as a question (WAY-172).
- **Change:** `guidelines/coding-mail-sending.md` · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:69-83` Context ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:266-299` 6. The mail-sending unit ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:450-523` Foundation entries ·
  plan Foundation entries F5, F13, F25, F27, F29 ·
  `foundations/decisions.md:635-648` D-28 · `foundations/decisions.md:1951-1964` D-114 ·
  `foundations/decisions.md:252-265` D-13 ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` ·
  `guidelines/coding-database-access.md` · `guidelines/coding-account-policy.md` ·
  src/server/account-mail.ts and tests/account-mail.test.mjs (made in Slice 2)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (guidelines' references and *Applies to*).
- **Depends on:** Slice 2 · F13

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-150 — `foundations/decisions.md:2667-2680`
- D-146 — `foundations/decisions.md:2611-2624`
- D-142 — `foundations/decisions.md:2553-2564`
- D-151 — `foundations/decisions.md:2682-2695`
- D-28 — `foundations/decisions.md:635-648`
- D-114 — `foundations/decisions.md:1951-1964`
- D-13 — `foundations/decisions.md:252-265`
- account-email-nodemailer-starttls — `foundations/invariants.md:908-916`
- nodemailer-require-tls — `foundations/environment_facts.md:328-332`

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:460-534`) — copied word for word

## Foundation entries

Written or changed by the foundation step through the record skills; wording is that step's.

- Decision (new, K1): link validity — confirmation 24 h, reset 1 h, each works once, a newly sent
  link invalidates earlier links of its kind and account (with this spec's reading that "sent"
  means accepted by Outsider).
- Decision (new, K2): the link opens the game page, which confirms with a D-104 request without a
  session; the fragment form `/#confirm-email=<token>` and the digest-only storage of Decision 2.
- Decision (new, K3): the header row of an unconfirmed player, the resend authority and the
  outcome sentences, with the roles of Decision 10.
- Decision change, D-44 (K4): „Wysyłanie…” as the waiting label of „Wyślij ponownie” — through
  `the-way-maintain-styleguide` together with the rule „States of shared controls”.
- Decision (new, K5): sender, display name, plain text, subject and body of the confirmation
  message.
- Decision change, D-111 (K6): the five mail settings and the password file join the required
  account settings.
- Decision changes, D-13 and D-17 (K7): the third runtime credential file and its grant to the
  application alone.
- Decision (new, K9): an account's address is the one given at registration; no address change.
- Decision (new, K10), and D-137's text: blocking spends every link of the account; unblocking
  restores none.
- Decision change, D-109: the link alone authorizes confirming its own account; a valid session
  authorizes sending a confirmation message to its own account's address.
- Decision change, D-105: the counters stand in the account database and every attempted message
  counts — or a new decision deriving from D-105 that says so.
- Decision change, D-112: schema version 3, the confirmation time, the link table, blocking
  spending links, pruning of link rows.
- Decision (new): the exemplar of the mail-sending kind, `src/server/account-mail.ts` (To do 12).
- Invariant changes: `account-schema-lifecycle` and `account-database-schema` (version 3, the
  move keeps every account, session and value and leaves accounts unconfirmed);
  `account-startup-configuration` (the mail settings count as account settings);
  `loop2-host-sharing` (the application's read-only SMTP-password grant);
  `account-session-authorization` (the resend route without a session answers JSON 401);
  `account-mutation-request-guards` (now five state-changing routes; its wording already says
  "every"); `account-client-outcomes` (the account requires `emailConfirmed`); `blocked-account-access`
  or a new invariant for "a blocked account's links confirm nothing, also after unblocking".
- Invariant candidates (new, method test): an emailed link confirms once, only within its
  lifetime, only until a later message of its account has been sent, and only while its account
  is unblocked; account messages beyond 30 an hour
  in total or 3 an hour per address are not sent.
- Projected entries this change makes partly true, written by this change in their confirmation
  part (task, *Decisions in play*: "Zapisuje część wpisu, którą jego kod czyni prawdziwą
  (WAY-126), a resztę dopisuje zadanie zapisujące"; WAY-126: "where the code makes only part of it
  true, the agent writes that part and the human accepts its meaning at the merge"), each listed
  with its meaning in the request; task 21 writes the reset part later:
  - decision „How does a player sign in and reset a forgotten password?” — the part "a
    confirmation message establishes that address";
  - decision „Which service delivers account emails?” — its first sentence for confirmation
    messages; its second sentence (delivery from the intended container in a real test) becomes
    true for confirmation messages only after H4, so the foundation step writes it only if H4 has
    passed before the merge, and otherwise the request names it as left to task 21;
  - decision „How does the account server send email through Outsider?” — composing and sending
    confirmation messages through Outsider SMTP with Nodemailer 10, the connection upgraded to TLS
    and sending failing without STARTTLS (Decision 6);
  - invariant `account-email-via-outsider/1` — the confirmation part, method review;
  - invariant `account-email-nodemailer-starttls/1` — the confirmation part, method test, proved by
    the mailer's STARTTLS case of Decision 9.
- Environment facts (new): `mikrus-outsider-mail/1` (To do 14), the *Based on* of the partial
  „Which service delivers account emails?”; a Nodemailer 10 fact for `requireTLS` sending STARTTLS
  and failing without the upgrade (source: the 10.2.1 package, cited in *Constraints*), the *Based
  on* of the partial „How does the account server send email through Outsider?” and of
  `account-email-nodemailer-starttls/1`.
- Part map: `account-server` claims the new test file of the mailer; External context gains Mikrus
  Outsider (both directions; its SMTP replies are untrusted).
- Glossary: none required; the foundation step judges whether "confirmed email address" or
  "account message" needs a term.
- Guidelines (not foundation, same cycle): the new kind file and its row in `guidelines/coding.md`
  (`the-way-maintain-coding-guidelines`); `guidelines/testing.md` — the answer to „Czy kod
  rozmawia z cudzą usługą?” for SMTP, the trust-boundary rows of the two routes, and the existing
  rows this change alters — the `GET /api/account`, `POST /api/accounts` and `POST /api/session`
  rows (their bodies gain `emailConfirmed`, registration's its send outcome), the D-104 rows that
  list three state-changing routes, and the transport row "na czterech trasach"
  (`the-way-maintain-testing-guidelines`, human approval per WAY-172); the styleguide (To do 8).
