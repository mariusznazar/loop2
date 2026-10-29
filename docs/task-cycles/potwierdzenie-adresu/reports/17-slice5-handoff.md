# Handoff — Slice 5 executor, task `potwierdzenie-adresu`

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



- Slice base (recorded before dispatch): `b4e50b2` (Slice 4 reviewed, PASS). Your commits go on top of it.

- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/17-slice5-report.md`

- Return only: your status (`done`, `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path.

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-database-access.md`, `guidelines/coding-mail-sending.md`, `guidelines/testing.md`.

- Product files your *Read* names: `src/server/app.ts`, `src/server/transport.ts`, `src/server/configuration.ts`, `src/server/database.ts`, `src/server/account-mail.ts`.

- What earlier slices settled that you build on: Slice 1's `issueLink` takes a lifetime (not an expiry) and computes the expiry from the database's clock, refuses a window above one hour, throws for an unknown account, and spends earlier links of the account and purpose in its own transaction (`reports/08-slice1-report.md` § Choices made). Slice 4 put the mailer on the runtime as the plain `mailer` property; route tests substitute it by spreading the runtime with another mailer (`reports/15-slice4-report.md` § Choices). The mailer's settings fields are `from`, `host`, `port`, `user`, `password`.

## Your slice — copied word for word from `plan.md`

### Slice 5 — The confirming route, the resend route and the send step

- **Goal:** The account server takes `POST /api/email-confirmation` (body exactly `{ "token" }`, no session needed, 204 on `confirmed`, one 400 `invalid-link` answer with „Odnośnik jest nieważny albo wygasł.” for every malformed, unknown, spent, expired, blocked or other-purpose token) and `POST /api/email-confirmation-message` (body exactly `{}`, a valid session of an unblocked account, 401 `unauthenticated` otherwise, 409 `email-already-confirmed` for a confirmed account, else 200 with `confirmationMessage` `sent`, `limited` or `failed`), both behind the transport gate, `no-store`, the unconfigured 503 and the D-104 guards. `POST /api/accounts` runs the send step after the session is stored and answers 201 with `emailConfirmed: false` and `confirmationMessage` in every outcome of the send; a refused registration or an unstored session sends nothing. `GET /api/account` and `POST /api/session` add `emailConfirmed`. The send step creates a token, issues its row under the D-105 limits, composes and hands the message to the runtime's mailer, never throws to the route, and maps each failure as spec Decision 4 lists (an issue that throws or finds the account blocked, a mailer failure or missed deadline); earlier links are spent by the issue itself, with no retire step after `sent` (spec *Decisions*, the orchestrator's note). `src/server/account-policy.ts` holds the D-105 numbers and window, the link lifetime of 24 h, and the token's creation, format check (43 base64url characters decoding to 32 bytes and re-encoding identically) and SHA-256 digest, pure and without HTTP or the database. Route tests run on real HTTP and SQLite with a stand-in mailer that records messages and returns the outcome the case chooses or never answers; the token is read from the recorded link.
- **Change:** `src/server/account-routes.ts` · `src/server/account-policy.ts` · `tests/http.test.mjs` · `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/task.md:17-34` To do ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:36-67` Questions to settle ·
  `.runs/task-cycles/potwierdzenie-adresu/task.md:152-168` Settlements to record ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:53-94` Constraints ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:98-118` 1. Where the D-105 counters stand ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:120-144` 2. The token and the link ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:146-193` 3. Schema version 3 ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:195-245` 4. Routes and their contracts ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:247-264` 5. How the browser learns the outcome at registration ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:433-448` 12. Units and their interfaces ·
  plan Foundation entries F1, F2, F3, F8, F9, F10, F11, F17, F18, F20, F21, F22, F23, F32, F33 ·
  `foundations/decisions.md:1701-1712` D-96 · `foundations/decisions.md:1744-1757` D-99 ·
  `foundations/decisions.md:1787-1800` D-102 · `foundations/decisions.md:1802-1815` D-103 ·
  `foundations/decisions.md:1817-1828` D-104 · `foundations/decisions.md:1830-1843` D-105 ·
  `foundations/decisions.md:1884-1895` D-109 · `foundations/decisions.md:1897-1910` D-110 ·
  `foundations/decisions.md:1981-1994` D-116 · `foundations/decisions.md:766-779` D-37 ·
  `foundations/decisions.md:1524-1535` D-86 · `foundations/decisions.md:2484-2497` D-137 ·
  `foundations/decisions.md:2512-2525` D-139 ·
  `foundations/invariants.md:718-726` account-session-authorization ·
  `foundations/invariants.md:728-736` account-mutation-request-guards ·
  `foundations/invariants.md:738-746` account-request-transport ·
  `foundations/invariants.md:788-796` account-attempt-limits ·
  `foundations/invariants.md:798-806` account-attempt-tracking ·
  `foundations/invariants.md:838-846` blocked-account-access ·
  `foundations/invariants.md:858-866` unblock-restores-no-session ·
  `foundations/invariants.md:628-636` email-verification-nonblocking ·
  `foundations/invariants.md:608-616` player-self-registration ·
  `foundations/environment_facts.md:310-314` fetch-origin-header ·
  `foundations/part_map.md:58-74` account-server ·
  `src/server/app.ts` · `src/server/transport.ts` · `src/server/configuration.ts` ·
  `src/server/database.ts` ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` ·
  `guidelines/coding-account-policy.md` · `guidelines/coding-database-access.md` ·
  `guidelines/testing.md` ·
  src/server/account-mail.ts and guidelines/coding-mail-sending.md (made in Slices 2 and 3)
- **Model:** same — a session-less authority and the send step's failure ordering at the trust boundary, across HTTP, the database, the mailer and the block command's concurrent write.
- **Risk:** trust boundary — `src/server/**`
- **Checks:** `npm test -- tests/http.test.mjs`, starting from failing cases: registration answers 201 with `sent`, `limited` and `failed` (stand-in failing, never answering past the shortened deadline, issue throwing) and sends nothing for refused registrations; resend for no session, a blocked account's deleted session, a confirmed account and over each limit; confirmation once, expired, spent, superseded by a later issued link (also one whose send failed), other purpose and malformed all giving the one `invalid-link` answer; a block committed through a second connection while the stand-in mailer holds its answer spends the link, which confirms nothing after unblocking; a block committed before issuing leaves no row and sends nothing; the token never appears in a response or the log. Then `npm test -- tests/transport.test.mjs` (Origin, body and transport refusals on both new routes before mutation), `npm test -- tests/account-storage.test.mjs`, `npm test -- tests/startup.test.mjs`; `python -B .the-way/elements/common/foundation_check.py`.
- **Depends on:** Slice 1 · Slice 2 · Slice 4 · F1 · F2 · F3 · F10 · F11 · F17 · F18 · F20 · F21 · F22

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-143 — `foundations/decisions.md:2566-2579`
- D-144 — `foundations/decisions.md:2581-2594`
- D-145 — `foundations/decisions.md:2596-2609`
- D-147 — `foundations/decisions.md:2626-2639`
- D-148 — `foundations/decisions.md:2641-2652`
- D-109 — `foundations/decisions.md:1884-1895`
- D-149 — `foundations/decisions.md:2654-2665`
- D-140 — `foundations/decisions.md:2527-2538`
- D-151 — `foundations/decisions.md:2682-2695`
- D-96 — `foundations/decisions.md:1701-1712`
- D-99 — `foundations/decisions.md:1744-1757`
- D-102 — `foundations/decisions.md:1787-1800`
- D-103 — `foundations/decisions.md:1802-1815`
- D-104 — `foundations/decisions.md:1817-1828`
- D-105 — `foundations/decisions.md:1830-1843`
- D-110 — `foundations/decisions.md:1897-1910`
- D-116 — `foundations/decisions.md:1981-1994`
- D-37 — `foundations/decisions.md:766-779`
- D-86 — `foundations/decisions.md:1524-1535`
- D-137 — `foundations/decisions.md:2484-2497`
- D-139 — `foundations/decisions.md:2512-2525`
- account-session-authorization — `foundations/invariants.md:718-726`
- account-mutation-request-guards — `foundations/invariants.md:728-736`
- account-request-transport — `foundations/invariants.md:738-746`
- account-attempt-limits — `foundations/invariants.md:788-796`
- account-attempt-tracking — `foundations/invariants.md:798-806`
- blocked-account-access — `foundations/invariants.md:838-846`
- unblock-restores-no-session — `foundations/invariants.md:858-866`
- unblock-restores-no-link — `foundations/invariants.md:878-886`
- email-confirmation-link — `foundations/invariants.md:868-876`
- account-message-limits — `foundations/invariants.md:888-896`
- email-verification-nonblocking — `foundations/invariants.md:628-636`
- player-self-registration — `foundations/invariants.md:608-616`
- fetch-origin-header — `foundations/environment_facts.md:310-314`
- uri-fragment-in-requests — `foundations/environment_facts.md:334-338`
- account-server — `foundations/part_map.md:58-75`

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:130-155`) — copied word for word

### 2. The token and the link — 32 random bytes, stored only as a SHA-256 digest, carried in the fragment of `/`

- The token is 32 bytes from the crypto random generator, written as 43 base64url characters. The
  database keeps only its SHA-256 digest (base64url, 43 characters) as the row's key; the token
  itself is never stored, logged or returned by any route.
- The link is the configured public origin (`LOOP2_PUBLIC_ORIGIN`) followed by
  `/#confirm-email=<token>`. The fragment never leaves the browser in a navigation, so the token
  reaches neither Cloudflare's nor any server's request line, nor a `Referer`; `/` is the game's
  page, which exists (D-86).
- The page reads the fragment, sends the token in the JSON body of a `POST` (Decision 4), and
  removes the fragment from the address with `history.replaceState` once the server's answer is
  definitive — confirmed or the link refusal — so a reload neither resends a spent token nor keeps
  it in the address bar; after a lost connection the fragment stays and a reload tries again.
- The server accepts a token only of exactly that form (43 base64url characters that decode to 32
  bytes and encode back to the same text); any other string gets the same refusal as an unknown
  token.
- No attempt limit on confirming: guessing a 256-bit token is infeasible, and the transport and
  body guards bound each request's work.
- Rejected: a query parameter — the token reaches the Cloudflare edge's and the server's request
  logs, against OWASP's "never log … full verification URLs". A path such as `/potwierdz/<token>`
  — logged likewise, and `express.static` answers 404 for it (`src/server/app.ts:58`). Storing the
  token in clear — a read of the database would yield live links. A salted or slow hash — needless
  for 256 random bits.
- Cost if wrong: a mail client that drops fragments would deliver a link that only opens the game;
  the player resends from the header. H4 shows whether the tested client keeps it.

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

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:205-256`) — copied word for word

### 4. Routes and their contracts

All new paths join the existing transport and `no-store` gate (`router.all` list) and the JSON
503 of the unconfigured mode; both new routes are `POST` behind `mutationGuards` (D-104).

- `POST /api/email-confirmation` — body exactly `{ "token": <string> }`; no session needed (the
  link alone authorizes, K2), none created; a session cookie, if sent, is handled as on any route.
  Success: 204 after the confirm operation commits. Every token that is malformed, unknown,
  spent, expired, of a blocked account, or of another purpose: 400 with code `invalid-link` and
  message „Odnośnik jest nieważny albo wygasł.” — one answer for all, so it says nothing about
  which. A body of other fields or types: 400 `invalid-request`, as today.
- `POST /api/email-confirmation-message` — body exactly `{}` (as logout); a valid session of an
  unblocked account required, else JSON 401 `unauthenticated` (D-109); the address is always the
  session account's own; no field may name an address or account. An already confirmed account:
  409 with code `email-already-confirmed` and a message; nothing sent. Otherwise the send step
  (below) and 200 with `{ "confirmationMessage": "sent" | "limited" | "failed" }`.
- `POST /api/accounts` — unchanged up to and including the session (D-102 ticket settled as
  today, session stored before success, D-109); then the send step, then 201 with `id`, `email`,
  `emailConfirmed: false` and `confirmationMessage`. When the session cannot be stored the answer
  stays the 503 of today and no message is sent; the player signs in later and resends.
  A refused registration (invalid, duplicate, limited) sends nothing.
- `GET /api/account` and `POST /api/session` — the account body gains `emailConfirmed`
  (boolean); nothing else changes.
- The send step, shared by the two sending routes: create a token, issue its link row with the
  D-105 limits (Decision 1; `limited` ends the step without contacting Outsider), compose the
  message with the link, hand it to the mailer, and on `sent` retire earlier links. It never
  throws to the route; each failure has one outcome:
  - the mailer fails or misses its deadline: `failed` (Decision 6);
  - issuing the row throws (for example `SQLITE_BUSY` after the busy timeout while the owner's
    command holds the write lock, or a disk error): `failed`, and no message is sent, since a
    message whose link has no row could never confirm;
  - retiring earlier links throws after the mailer answered `sent`: `sent` — the message went and
    its link works — and the earlier links stay usable until they expire or are spent by a later
    send, confirmation or block; the step logs one fixed line without any token or address. This
    is the one case where K1's "a new link invalidates earlier ones" is not met, accepted because
    reporting a delivered message as failed would make the player send again into the same
    fault;
  - issuing finds the account blocked (a block committed after the route checked the session,
    Decision 3): at registration `failed`; on the resend route the answer is JSON 401
    `unauthenticated`, as for every request of a blocked account's deleted session (D-137).
  The registration answer is 201 with the account in every one of these cases (To do 1: the
  account is created and the player enters the headquarters whatever the send does).
- A database failure in `POST /api/email-confirmation` is an ordinary server error (500, as today
  from the error handler); the page shows the client's failure message and keeps the fragment,
  so a reload tries again (Decision 2).
- Rejected: limits and failures as error statuses (429, 503) on the resend route while
  registration reports them in a 201 body — two representations of one outcome; the client and
  the header would map both. One `confirmationMessage` value in both bodies, read by one client
  function.
- Cost if wrong: an HTTP-minded reviewer may prefer 429 for `limited`; the change is local to the
  route and the client.

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
