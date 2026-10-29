**Waiting for H4 before merging** — the human's delivery test from the deployed container (below). Code complete, reviewed; the gate's result is under *Checks*. This request was opened earlier as a blocked draft for the testing decision now numbered **D-163** (the comment below says "D-151"; see *Renumbering*).

After registration the player gets a plain-text message from `loop2@mariusznazar.com` („loop2”), sent from the loop2 container through Mikrus Outsider's SMTP on port 587 with Nodemailer 10, only after STARTTLS. Its link `https://loop2.mariusznazar.com/#confirm-email=<token>` opens the game page, which confirms the address with a D-104 request, signed in or not, and shows „Potwierdzanie adresu…”, then „Adres e-mail potwierdzony.” (`positive`) or „Odnośnik jest nieważny albo wygasł.” (`warning`) above the account forms or the headquarters. A signed-in player with an unconfirmed address sees „Adres e-mail niepotwierdzony.” and „Wyślij ponownie” in the header on every screen, with the outcome sentences of the task. The account is created and the player enters the headquarters whatever the send does. A link works once, for 24 h, until a newer link of the account is recorded, and never for a blocked account, also after unblocking. At most 30 account messages an hour in total and 3 per address are handed to Outsider, counted in the database. The account database moves to schema version 3 (existing accounts stay unconfirmed, nothing is lost). Startup on the test server requires the five mail settings in `compose.yaml` and the SMTP password as the read-only Compose secret from `/etc/loop2/smtp-password`; the `loop2-deploy` skill says where it lies, how it is rotated and how to read the mail failure line.

## Task and sources

- Task: `potwierdzenie_adresu_loop2.md` (vault, `Notes/Projects/(P) Loop/_zadania`), accepted 2026-10-28, sha256 `9340a79f…e817`; plan item 20 `potwierdzenie-adresu` of `plan_mvp_loop2.md` (depends on 15 and 19, both delivered); definition `definicja_mvp_loop2.md` approved 2026-10-28, sha256 `3e9c2cc9…`.
- Process pin: `.the-way` at `3aee7d9`, not moved.
- Base `7a633a7`; `main` merged in at `e07da9b` (from `4bfb962`, PR #38).

## The cycle

- **Spec** — written because the task left open design choices (where the D-105 counters stand, how the token is stored and carried, the schema of version 3, how the browser learns the send's outcome at registration). Reviewed: FAIL, one revision, PASS. One design choice changed after review: a newly recorded link stops earlier links in its own transaction, before the send, so K1 holds with no exception.
- **Route: a plan of 10 slices** — the change spans five parts, a new kind of code, three guideline maintenance skills and about twenty foundation entries. Slices 1, 2, 4, 5 and 9 (trust boundary, schema step) had reviews of their own: Slice 2 FAIL → fix → PASS (a flaky self-made test certificate), Slice 9 FAIL → fix → PASS (the skill's reading of mail error codes); the others PASS. A deploy test broken by Slice 5 was fixed in `fab1f2e`.
- **Review of the whole change** `7a633a7..28f0686`: PASS, 0 blocking. Return step `7247c09`: PASS. Reconciliation with `main` (`7dea887`, `e07da9b`): PASS.
- Record of the cycle (spec, plan, every handoff and report, questions table): RECORD_LINK

## Renumbering

`main` wrote decisions D-140…D-151 (combat) while this cycle ran, so this branch's decisions were renumbered **D-140…D-151 → D-152…D-163** (add 12) in `7dea887`. The decision the owner approved on this request on 2026-10-29 ("przyjmuję A") is **D-163**. The cycle record's rows and reports written before `7dea887` use the old numbers.

## What this request settles

Decisions:

- **D-152** (new, part of a projected entry; task 21 adds recovery) — Gracz rejestruje się i loguje adresem e-mail i hasłem, może grać przed potwierdzeniem adresu, a wiadomość potwierdzająca ustala ten adres.
- **D-153** (new, part) — Serwer kont wysyła wiadomości potwierdzające z adresu w `mariusznazar.com` przez uwierzytelniony SMTP Outsidera z istniejącego konta Mikrusa. *Not written:* the projected sentence on delivery from the intended container in a real test — it becomes true only after H4.
- **D-154** (new, part) — Serwer składa i wysyła wiadomości potwierdzające przez SMTP Outsidera biblioteką Nodemailer 10; połączenie musi przejść na TLS, a bez STARTTLS wysyłka się nie udaje.
- **D-155** (new, K1) — Odnośnik potwierdzenia działa 24 godziny, odnośnik resetu 1 godzinę od zapisania, każdy raz; zapisanie nowego odnośnika, jeszcze przed wysyłką, unieważnia wcześniejsze odnośniki tego rodzaju dla konta, więc po nieudanej wysyłce żaden wcześniejszy nie działa.
- **D-156** (new, K2) — Odnośnik to adres gry z `/#confirm-email=<token>`, baza trzyma tylko skrót SHA-256 tokenu; strona sama wysyła token żądaniem zgodnym z D-104, także bez sesji, pokazuje „Potwierdzanie adresu…” i wynik nad formularzami albo siedzibą, a każdy zły token dostaje tę samą odmowę; bez rozstrzygającej odpowiedzi pokazuje zdanie błędu klienta w roli `warning`.
- **D-157** (new, K3) — Zalogowany gracz z niepotwierdzonym adresem widzi w nagłówku na każdym ekranie zdanie i przycisk „Wyślij ponownie”, wysyłkę zleca tylko na adres własnego konta, a po założeniu konta i po każdej wysyłce stoi tam zdanie wyniku w swojej roli.
- **D-44** (changed, K4) — Przycisk „Wyślij ponownie” czekający na serwer ma napis „Wysyłanie…”, obok „Logowanie…” i „Zakładanie konta…”.
- **D-158** (new, K5) — Wiadomość potwierdzająca idzie z `loop2@mariusznazar.com` z nazwą „loop2”, zwykłym tekstem, z ustalonym tematem i treścią w trzech akapitach, z odnośnikiem w osobnym wierszu.
- **D-111** (changed, K6) — Produkcja wymaga do startu także pięciu ustawień poczty (nadawca, serwer, port, login, plik hasła), sprawdzanych przed nasłuchem; start nie łączy się z serwerem poczty.
- **D-13**, **D-17** (changed, K7) — Hasło SMTP leży w `/etc/loop2/smtp-password` (root, grupa 1000, 0440), z kopią w prywatnej notatce, przekazane tylko aplikacji jako sekret tylko do odczytu; nadawca, serwer, port i login są jawnymi wartościami w `compose.yaml`.
- **D-159** (new, K9) — Adres konta to adres podany przy założeniu; loop2 go nie zmienia, więc potwierdzenie dotyczy tego jednego adresu.
- **D-160** (new, K10) and **D-137** (changed, To do 16) — Odnośnik zablokowanego konta niczego nie zmienia i gracz widzi „Odnośnik jest nieważny albo wygasł.”; blokada w jednej transakcji unieważnia wszystkie odnośniki konta, a odblokowanie nie przywraca ani sesji, ani odnośników.
- **D-109** (changed) — Sam odnośnik uprawnia do potwierdzenia adresu własnego konta, a ważna sesja — do zlecenia wiadomości na adres własnego konta.
- **D-161** (new) — Każda wysłana albo próbowana wiadomość o koncie liczy się do pułapów D-105 od zapisu w bazie, przed przekazaniem serwerowi poczty; licznik przetrwa restart. **D-105** gains only its *Verification*.
- **D-112** (changed) — Schemat w wersji 3: konto ma czas potwierdzenia adresu (pusty, dopóki niepotwierdzone), tabela odnośników trzyma skrót tokenu, cel, czasy i znak unieważnienia; blokada i zapis nowego odnośnika unieważniają odnośniki, stare wiersze są przycinane.
- **D-162** (new, To do 12) — Wzorcem rodzaju `mail-sending` jest `src/server/account-mail.ts`.
- **D-163** (new, To do 13, **approved by the owner on this request**) with **D-73**, **D-79** changed — Żaden test nie sięga do Outsidera: kod wysyłki testuje się z prawdziwym serwerem SMTP na loopbacku, trasy z zastępczym nadawcą, a zgodność z Outsiderem sprawdza człowiek wysyłką z wdrożonego kontenera, gdy zmienia się sposób nadawania.

Invariants: `email-confirmation-link`, `unblock-restores-no-link`, `account-message-limits` (new, test); `account-email-via-outsider` (new, part, review); `account-email-nodemailer-starttls` (new, part, test); `loop2-host-sharing`, `account-session-authorization`, `account-client-outcomes` (changed); `player-password-login`, `email-verification-nonblocking` derive also from D-152.

Environment facts: `mikrus-outsider-mail` (To do 14), `nodemailer-require-tls`, `uri-fragment-in-requests`, `samesite-strict-cookie`. Part map: Mikrus Outsider in *External context*; `account-server` claims `tests/account-mail.test.mjs` and names sending account email.

Rows tied to existing entries: the version-3 move and existing accounts (F14) — `account-schema-lifecycle`, `account-database-schema` unchanged, D-112 carries it; mail settings as account settings (F15) — `account-startup-configuration` unchanged, D-111 carries it; the two new routes (F18) — `account-mutation-request-guards` unchanged ("every state-changing account route").

Guidelines: `guidelines/coding-mail-sending.md` (new kind, row in `guidelines/coding.md`); `guidelines/testing.md` (SMTP, the new routes, D-73's seven departures); `guidelines/styleguide-browser-view.md` („Wysyłanie…”, the header row on the kitchen-sink page).

**What the foundation puts in front of you at the merge:** invariant tests changed — those of `account-schema-lifecycle`/`account-database-schema` (`tests/account-storage.test.mjs`: the newer-version case moves from 3 to 4; the version-1 move ends at version 3), `account-startup-configuration` (`tests/startup.test.mjs`), `loop2-host-sharing` (`tests/invariants/test_loop2_host_sharing.py`), `account-client-outcomes` (`tests/account-api.test.mjs`); `tests/deploy/test_account_storage.py` compares only the account fields of the registration answer. Surfaces changed: `POST /api/email-confirmation`, `POST /api/email-confirmation-message` (new); `POST /api/accounts` gains `emailConfirmed` and `confirmationMessage`; `GET /api/account` and `POST /api/session` gain `emailConfirmed`; the Compose secret `loop2_smtp_password` and five settings. No *Violated* mark set or cleared.

## Checks

GATE_RESULT

- `tests/invariants/test_loop2_one_serving_process.py` fails on the base `7a633a7` on this machine as well: `Get-NetTCPConnection -State Listen` returns no objects in this environment. Unchecked here.
- Screenshot of the running game with the header row: **unchecked** — no settled route (WAY-219). The kitchen-sink page's waiting and refusal states of „Wyślij ponownie” were inspected in Chromium; the header row's layout in the game is read from code only.
- Each invariant test the change writes was seen failing before passing (slice reports).

## Questions

None.

## Review findings for you to choose from (not fixed; Minor)

1. The deploy skill's section on blocking an account does not say that the block stops the account's emailed links and that unblocking brings none back (`.claude/skills/loop2-deploy/SKILL.md:191-197` and the `.agents/` copy).
2. `guidelines/coding-mail-sending.md:41-42` says the sender is fixed in the mail file; the exemplar reads the sender address from the settings — task 21 could hard-code it.
3. `guidelines/coding-browser-module.md:12-25` lists neither `email-status.ts` nor `email-confirmation.ts` (nor the older `account-screen.ts`, `game-view.ts`, `body-row.ts`).
4. The rendered header row in the running game has not been seen (`src/browser/styles.css:50-84`, `src/browser/view/app.ts:95`).
5. No test covers "set the confirmation time only if still null" (`src/server/database.ts:450-453`).
6. A bad limit passed to `issueLink` is refused with the text "Invalid database timing option" (`src/server/database.ts:100`).
7. A password file holding only a UTF-8 byte order mark is accepted as empty, and a leading one is dropped silently (`src/server/configuration.ts:116-121`).
8. The login check accepts invisible format characters, the host check hyphen-edged and over-long labels (`src/server/configuration.ts:45-46`).
9. A block landing during a registration's send makes the end-of-response session save fail: a stack trace in the log, the socket closed after the 201 (`src/server/account-routes.ts:415-423`).
10. Removing `isLinkToken` would fail no test (`src/server/account-policy.ts:35-42`).
11. The route's sending deadline is a constructor option of `AccountPolicy`, kept in step with the mailer's 10 s by hand (`src/server/account-policy.ts:12`, `src/server/account-mail.ts:14`).
12. No test that a confirmation without a session creates no session and sets no cookie.
13. The password-file block of the deploy skill reads the password from the terminal it is pasted into; without bracketed paste the next pasted line could become the password (`.claude/skills/loop2-deploy/references/setup_and_secrets.md:247`).
14. D-111 does not say the password file must be non-empty, which the code requires (`foundations/decisions.md`, D-111).
15. "a mail service" in D-156's rationale means the player's webmail page, while elsewhere it means Outsider's SMTP service.

Outside the task's scope: none.

CHOICES_LINE

## Human actions this request waits for

- **H4 (placed in the cycle by the task):** deploy this request's head to the test server with the installed deploy script (`loop2-deploy <head sha>`, D-15), register with an address on an external inbox, receive the message and open its link; the header row should disappear. Accepted cost (task): deploying the branch moves the test server's `loop2_accounts` database to schema version 3 before the merge; if this request is not merged, code from `main` refuses that database (D-112) and only you can repair it. Merging deploys `main` by itself (D-11), and the server does not start without `/etc/loop2/smtp-password` (H3, done).
- After H4, the second sentence of the projected „Which service delivers account emails?” (D-153) becomes true for confirmation messages; this request leaves it unwritten.
- No other effect outside the repository was found.

Please merge with a merge commit (not squash or rebase), so the record's link by SHA keeps working.
