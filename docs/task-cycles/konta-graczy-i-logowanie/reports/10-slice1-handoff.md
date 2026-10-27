# Execute slice 1 — bounded password operations

Worktree C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie; branch task/konta-graczy-i-logowanie. Task/slice-review base 7012abcfb55b4ba2b2836b574a2275eb1551df28; the preceding foundation commit and current entry ranges are appended below before dispatch. Process pin 574a37b9ab9572f876298f4cc10754581222d3f0. The user invoked the-way-implement-task and delegated intermediate choices to the orchestrator. Do not read cycle.md, ask the human or dispatch the next stage.

Act only as the executor of slice 1 using .agents/skills/the-way-make-change/SKILL.md and its complete pinned method/references. Verify gitlink/checkout. Your copied plan section and required source passages below are authoritative; the original paths identify them. Implement only that Change, with its first-file exemplar/kind/index and element-skill work. Complete each actual code check, own-work check and commit according to the method. Read whole guideline files selected by the slice. Read entries by their supplied identifiers/current ranges and follow linked entries as the element skills require. Do not use a whole foundation-file dump instead of selection.

The project task is frozen at docs/task-cycles/konta-graczy-i-logowanie/task.md; reviewed spec at spec.md and plan at plan.md in that directory. This stage's report goes to reports/10-slice1-report.md. All prerequisite foundation changes are on your branch and are reviewed with slice 1. Change their current truth/test fields only for behavior your slice actually proves; later account behavior and the target-image measurement remain violated/unchecked. No runtime or target fact follows merely from upstream documentation. Verify installed dependency versions against recorded source contracts and amend through element skills if needed. Keep no secret or access values in output/artifacts.

Trust boundary: native password inputs/work admission and dependency lockfile. Inspect crafted inputs and error/capacity behavior. The accepted candidate is provisional pending actual-image and target measurements; do not tune it or claim Mikrus performance without the required evidence. No target-server effect is authorized. This is a local repository task. No .the-way/global skill/vault/other-repository mutation.

Every repository test runs with npm test. Use the established local Linux harness in reports/linux-verification.md and .runs/account-linux-inputs/verify.sh: Windows has a known baseline listener-enumeration failure. Do not repeatedly run a fifteen-minute Windows gate to rediscover it. The local task daemon loop2-task15-dind is available, with no exposed host API or host Docker-socket mount. Use fresh task-owned runner names, preserve logs under this cycle's reports, record exact source/commit and process identity. Rebuild product.bundle for the commit under test before using that harness. You may use a disposable copied checkout for deliberate fail-once mutations, while still invoking the full npm test and restoring the exact committed source before the passing run. Logs must identify each intended failure; a failure solely from setup or the Windows baseline proves no new assertion. Never remove unrelated containers/processes. The verifier image is not the production application image.

Baseline exact base Linux npm test exit 0, 343 Node/275 Python tests with three native Windows-only skips, foundation 0 errors. This is supplied evidence, not your own run. A deliberately red assertion/mutation is expected test-development evidence; your final slice checks must pass, with every failure or unchecked item named. Report each command and exit code. Only root owns the later full-change gate; your slice owns its actual behavior checks.

Follow existing English code/comment/commit conventions and explicitly git add only your changed paths. Keep the task branch; do not create another branch, push, squash/rebase, modify the backlog or open a PR. Commit the completed slice and return status, commit(s), check result and full report path. Report actual reaches beyond the selection; an open consequential design choice returns to orchestrator as the method requires. A larger-than-plan responsibility returns for splitting instead of hiding extra files.

Your report must include the weakest-point check, plausible faults and catching assertions, exact invariant fail-once evidence/restoration, new facts/exemplar/guideline/part-map entries and their one-sentence Polish meanings for the request, violation marks set/cleared, installed versions/audit result, all checks and remaining questions/concerns. Return before independent review.

## Concrete foundation state

Starting head: 713b60d0aeea9838034ef1458f59aeb2bffb5b7f. Full preceding report: reports/08-foundation-report.md in this cycle. Read its source-version limits, checks and reaches; all new account invariants are review/Violated yes. The source facts include argon2 0.45.1 and express-session 1.19.0 contracts, not an installed-package claim. D-44/styleguide has a documented temporary mismatch owned by slice 7.

New entries required for this slice:

- D-96: `foundations/decisions.md:1678-1692`
- D-100: `foundations/decisions.md:1736-1750`
- D-101: `foundations/decisions.md:1751-1765`
- D-104: `foundations/decisions.md:1794-1807`
- D-105: `foundations/decisions.md:1808-1821`
- player-argon2-password-hash: `foundations/invariants.md:612-621`
- player-argon2-deployment-check: `foundations/invariants.md:622-631`
- argon2-password-api: `foundations/environment_facts.md:208-213`
- argon2-native-platform: `foundations/environment_facts.md:214-219`
- password-hash-work-factor: `foundations/environment_facts.md:220-225`
- express-session-store-contract: `foundations/environment_facts.md:226-231`

## Copied plan section

Source: docs/task-cycles/konta-graczy-i-logowanie/plan.md, Slice 1.

````markdown
### Slice 1 — Bounded password work and dependency integration

- **Goal:** Provide the explicit production Argon2id candidate and one two-operation gate with no waiting queue, used for hash, verify and dummy-hash preparation. Release capacity on completion/error and preserve password content. Pin the selected libraries and types after checking availability. Extend the existing npm test selection to every root *.test.mjs without excluding any existing test. Through maintain-coding-guidelines create the first password-hashing exemplar, its kind guidelines/index and decision. Update package facts and exact test ownership through element skills; actual deployed profile acceptance remains unchecked.
- **Change:** `package.json` · `package-lock.json` · `src/server/passwords.ts` · `tests/passwords.test.mjs` · `guidelines/coding-password-hashing.md` · `guidelines/coding.md` · `foundations/decisions.md` · `foundations/environment_facts.md` · `foundations/invariants.md` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37` To do and Acceptance criteria · `docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215` Out of scope · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25` Intent, Goals and non-goals, Constraints · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167` Units and code kinds; Tests and evidence · `foundations/decisions.md:1339-1507` D-73–D-85 · `foundations/decisions.md:1547-1559` D-89 · `foundations/glossary.md:94-104` unit test; integration test · `foundations/invariants.md:572-581` node-test-selection · `foundations/part_map.md:100-123` agent-workflow; product-foundation · `guidelines/coding-http-application.md` · `foundations/decisions.md:3-38` D-01–D-02 · `foundations/decisions.md:94-154` D-05–D-07 · `foundations/decisions.md:752-766` D-37 · `foundations/decisions.md:932-946` D-49 · `foundations/decisions.md:1508-1520` D-86 · `foundations/part_map.md:56-99` account-server; build-tools · `foundations/invariants.md:5-34` account-server-runtime/typecheck/express-http · `foundations/invariants.md:45-104` API/one-serving-process/build/package/occupied-address · `foundations/invariants.md:532-541` public-file-access · `docs/task-cycles/konta-graczy-i-logowanie/spec.md:86-124` Password work and rate limits; Startup, secrets and measured deployment · `docs/task-cycles/konta-graczy-i-logowanie/task.md:61-63` Q7 · `docs/task-cycles/konta-graczy-i-logowanie/task.md:196-201` K3–K8 · `foundations/decisions.md:621-706` D-28–D-33 · `foundations/invariants.md:442-451` introduced-npm-vulnerabilities · `tests/startup.test.mjs` · `.agents/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.agents/skills/the-way-record-environment-fact/SKILL.md` · `.agents/skills/the-way-record-invariant/SKILL.md` · `.agents/skills/the-way-update-part-map/SKILL.md` · `foundations/decisions.md:1678-1692` D-96 · `foundations/decisions.md:1736-1750` D-100 · `foundations/decisions.md:1751-1765` D-101 · `foundations/decisions.md:1794-1807` D-104 · `foundations/decisions.md:1808-1821` D-105 · `foundations/invariants.md:612-621` player-argon2-password-hash · `foundations/invariants.md:622-631` player-argon2-deployment-check · `foundations/environment_facts.md:208-213` argon2-password-api · `foundations/environment_facts.md:214-219` argon2-native-platform · `foundations/environment_facts.md:220-225` password-hash-work-factor · `foundations/environment_facts.md:226-231` express-session-store-contract · Foundation rows F08, F16, F20d, F20e, F23a, F24a.
- **Model:** cheaper — The reviewed spec fixes the package, profile, admission behavior and exemplar work.
- **Risk:** trust boundary — native password work and package-lock.json
- **Checks:** Start failing tests/passwords.test.mjs integration cases that execute the real compiled module in a bounded child process: encoded Argon2id, correct/wrong verification, two active operations, third refused and capacity released after failure. This is a process integration test, not a broadened unit-test glossary. Run npm test before/after; include real native-package installation and audit outcomes. Each newly attached invariant test must fail once under an identified mutation in a disposable copy via npm test, followed by restoration/pass. Run python -B .the-way/elements/common/foundation_check.py after foundation writes.
- **Depends on:** foundation step · Foundation rows F08, F16, F20d, F20e, F23a, F24a.
- **Dispatch reads to materialize:** none. Add actual files/ranges once produced and rerun slice_size.py before execution; do not treat the current size as counting unborn source. Read any newly created guideline of a kind this slice changes whole.

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/task.md:14-37

````markdown
### To do

1. Gracz zakłada na serwerze testowym konto adresem e-mail, hasłem i powtórzonym hasłem, bez zatwierdzenia przez właściciela i bez potwierdzania adresu, a po założeniu konta jest od razu zalogowany i trafia do siedziby (pytanie 4).
2. Serwer przyjmuje hasło od 12 do 128 znaków dowolnego rodzaju, bez wymogu cyfr i wielkich liter; adres e-mail przyjmuje z obciętymi spacjami na początku i końcu, porównuje go bez rozróżniania wielkości liter i sprawdza tylko postać „coś@coś”; przy adresie, który ma już konto, gracz widzi „Konto z tym adresem już istnieje.” (pytanie 5).
3. Gracz niezalogowany widzi tylko ekran z dwoma formularzami: „Zaloguj się” (adres e-mail, hasło) i „Załóż konto” (adres e-mail, hasło, powtórzone hasło); siedziby ani panelu programu nie widać, dopóki gracz się nie zaloguje (pytanie 4).
4. Gracz loguje się adresem e-mail i hasłem i trafia do siedziby, a przeładowanie strony z ważną sesją prowadzi prosto do siedziby; nieudane logowanie pokazuje jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza (pytania 4 i 5).
5. Przycisk „Wyloguj” stoi w nagłówku strony obok tytułu; wylogowanie unieważnia na serwerze rekord sesji tej przeglądarki, po czym wraca ekran formularzy, a gry z przeglądarki nie widać (pytania 4, 6 i 16).
6. Żądanie konta bez ważnej sesji serwer odrzuca odpowiedzią błędu API, a nieznane żądanie `/api/` dalej dostaje błąd API, nigdy stronę gry.
7. Przeglądarka trzyma losowy identyfikator sesji w ciasteczku ograniczonym do adresu loop2, z ustawieniami Secure i HttpOnly; serwer prowadzi sesje przez `express-session` z własnym magazynem opartym na `node:sqlite`, nie przez domyślny `MemoryStore`. Sesja jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym; gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją (pytanie 6).
8. Serwer zapisuje dla hasła skrót Argon2id z biblioteki `argon2` i sprawdza nim hasło przy logowaniu; ustawienia kosztu są jawne i dobrane po pomiarze równoległego tworzenia i sprawdzania skrótów w docelowym obrazie kontenera na Mikrusie.
9. Konta i sesje leżą w bazie SQLite, do której serwer sięga przez wbudowany moduł `node:sqlite`, w pliku na trwałym miejscu poza wymienialną warstwą kontenera, tak że wdrożenie nowego commitu, które wymienia kontener, zachowuje konta. Plik bazy leży w nazwanym wolumenie Dockera, który zakłada samo wdrożenie (pytanie 15).
10. Po 5 nieudanych logowaniach na jeden adres e-mail serwer odrzuca kolejne próby tego adresu przez 15 minut; z jednego adresu IP przyjmuje najwyżej 20 nieudanych logowań na 15 minut i najwyżej 5 nowych kont na godzinę; liczenie skrótów haseł naraz ogranicza tak, żeby zmieściło się w pamięci kontenera, z liczbą ustaloną pomiarem z punktu 8. Liczniki stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów, a restart albo wdrożenie je zeruje. Gracz, którego próby ograniczono, widzi „Za dużo prób. Spróbuj ponownie za kilka minut.” (pytanie 7).
11. Ciasteczko sesji ma ustawienie `SameSite=Strict`, a serwer odrzuca każde żądanie zmieniające stan, którego nagłówek `Origin` nie jest adresem loop2, i przyjmuje dane tylko jako JSON (pytanie 8).
12. W fundamencie staje zasada ograniczania wysyłki wiadomości o koncie, którą stosują zadania 20 i 21: serwer wysyła łącznie najwyżej 30 wiadomości na godzinę i najwyżej 3 na jeden adres na godzinę, a ponad pułap wiadomość nie wychodzi i gracz widzi, że ma spróbować później (pytanie 9).
13. Sekret podpisu sesji leży w pliku na serwerze poza checkoutem, z właścicielem root, grupą o numerze 1000 i prawami 0440 (odczyt dla roota i dla użytkownika `node`, którym w kontenerze działa proces gry, nic dla innych), który Compose przekazuje kontenerowi, a jego kopia stoi w prywatnej notatce właściciela. Przy wymianie nowy sekret stoi przed starym: serwer podpisuje nowym, a ciasteczka podpisane starym dalej przyjmuje, więc wymiana nie wylogowuje graczy; stary sekret usuwa się po czasie ważności sesji z punktu 7 (pytania 10 i 14).
14. Serwer bierze protokół i adres gracza z nagłówków pośrednika szyfrowanej drogi od Cloudflare, którą wprowadza zadanie 22 szyfrowana-droga-do-serwera (Cloudflare Tunnel z `cloudflared`, pytania 1 i 2), tak że bezpieczne ciasteczko sesji działa na serwerze testowym, a progi na adres IP z punktu 10 liczą adres gracza.
15. Kontrolka, która czeka na odpowiedź serwera, ma stan oczekiwania (loading), pokazany na stronie wszystkich stanów: na czas oczekiwania przycisk jest wyłączony (tekst w `text-disabled`), jego napis zmienia się na „Logowanie…” albo „Zakładanie konta…”, a pola formularza są zablokowane; odmowa serwera i brak połączenia stoją jednym zdaniem pod formularzem w roli `warning` — przez `maintain-styleguide`, ze zmianą D-44 (pytanie 11).
16. Skill `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`) mówi, gdzie leży sekret podpisu sesji i jak się go wymienia, gdzie leży plik bazy kont oraz co wycofanie wdrożenia robi z kontami w bazie (WAY-139, pytanie 13).
17. Pierwszy plik każdego nowego rodzaju kodu, który powstaje w tym zadaniu — wśród nich pierwszy plik sesji (`guidelines/coding.md:221`: „Wzorce sesji, zapisu gry i poczty powstaną przy pierwszych implementacjach”) — zostaje wzorcem swojego rodzaju, z wytycznymi rodzaju i wierszem w indeksie `guidelines/coding.md` — przez `maintain-coding-guidelines` (WAY-200). Plików sesji ani dostępu do bazy produkt dziś nie ma (`src/server/` ma tylko `app.ts` i `main.ts`, a `app.ts` żadnej trasy `/api/`; loop2 `9a5f360`), więc to pierwsze pliki swoich rodzajów, nie wybór wzorca spośród istniejących plików, który według `guidelines/coding.md:222` poprzedza porównanie. Trasy kont należą do rodzaju `http-application`, który ma już wzorzec `src/server/app.ts` (D-37), a jego wytyczne pokazują plik trasy Express jako przykład rodzaju (`guidelines/coding-http-application.md`, „HTTP przez Express”); pliki odłożonych istniejących rodzajów, które zadanie zmienia — wdrożenia (`compose.yaml`, `Dockerfile`), punktu uruchomienia (`src/server/main.ts`), HTML — zmienia bez wyboru ich wzorca.
18. Tabela uprawnień i granic zaufania w `guidelines/testing.md` dostaje wiersze dla tras kont: kto, który zasób, jakie działanie i oczekiwana odmowa, z testem odmowy żądania bez ważnej sesji, oznaczonym niezmiennikiem i raz widzianym z porażką — przez `maintain-testing-guidelines`.

### Acceptance criteria

- Zmieniona ścieżka gracza — założenie konta, siedziba, wylogowanie, ponowne zalogowanie — jest sprawdzona ręcznie w przeglądarce pod `https://loop2.mariusznazar.com/` po wdrożeniu (D-75), a pomiar skrótów Argon2id odbył się na obrazie wdrożonym z commitu tego zadania (`player-argon2-deployment-check`).

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/task.md:208-215

````markdown
## Out of scope

- Szyfrowanie drogi od Cloudflare do serwera i zamknięcie bezpośredniego dostępu do portu aplikacji — zadanie 22 szyfrowana-droga-do-serwera (pytanie 1).
- Wysyłka wiadomości, potwierdzenie adresu i konfiguracja poczty Outsidera — zadanie 20.
- Reset hasła — zadanie 21.
- Blokada konta przez właściciela — zadanie 19.
- Zapis stanu gry na serwerze, jego wczytanie po zalogowaniu i niezapisany postęp po wygaśnięciu sesji i przy wylogowaniu — zadanie 16 (pytanie 16).
- Kopia bazy poza serwerem gry — zadanie 17.

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/spec.md:6-25

````markdown
## Intent

A visitor creates an account, enters the existing headquarters, leaves through logout and can sign in again. Authentication persists across reloads and container replacement; game progress does not yet persist. The server protects accounts and the browser exposes the game only after server confirmation of a session.

These are autonomous intermediate technical choices under implement-task, not new human approvals. The task and K1–K13 remain binding. Answers and their costs stand in reports/02-designer-answers.md; the default-start invariant clarification stands in reports/04-spec-revision-handoff.md.

## Goals and non-goals

Deliver registration, login, current-account lookup, logout, durable accounts/sessions, bounded password work and attempts, same-origin JSON requests, authentication UI/loading states, first-kind guidelines, refusal tests, foundation entries and deployment instructions.

Do not add saves, mail, verification, recovery, blocking, an operator interface, backup service or second public server. Record the mail rule without implementing mail. Preserve the tunnel and existing game behavior, including empty team and empty Program group. Reload/fresh login starts newGame(). Task 16 owns future unsaved-progress behavior after logout/expiry; this task establishes no enduring policy about it.

## Constraints

- Base 7012abcfb55b4ba2b2836b574a2275eb1551df28 includes the delivered tunnel. Historical task Context does not restore a published port. Current D-10/D-13/D-15/D-17 apply.
- Node.js 24, Express 5, one serving process and npm package, separate browser/server builds, public files only, no server simulation. Use node:sqlite, express-session with a project Store and argon2 Argon2id.
- Public assets remain public under D-86. UI gating is not authorization of account data.
- Run repository tests only through npm test. Use real database/files/HTTP; manual browser evidence retains D-75/D-87/D-88 and assesses their return conditions.
- Existing design tokens, shared controls, focus rule and warning/text-disabled roles; no new token values, framework or permanent browser/pixel test suite.
- Agents do not mutate the server. Human actions are secret creation, installation of a changed deploy command if needed, request-head deployment and target-image measurement/public journey. Request remains a blocked draft until evidence exists.

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/spec.md:138-167

````markdown
### 8. Units and code kinds

Paths below identify the designed first files; the maker may adjust names while preserving interfaces and honest first-file designation.

| Unit | Contract/dependencies | Kind |
|---|---|---|
| src/server/database.ts | Schema/open/close, account/session operations, supplied clock; owns node:sqlite/SQL, no HTTP/hash. | New database-access exemplar. |
| src/server/session-store.ts | Express Store callback/expiry adapter over DB, no route policy. | New session-store exemplar. |
| src/server/passwords.ts | Argon2 hash/verify and bounded gate/profile, no DB/HTTP. | New password-hashing exemplar. |
| src/server/account-policy.ts; optional rate-limits.ts | Normalize/validate and reserve/complete attempts, supplied clock, HTTP-independent outcomes. | New account-policy; first file exemplar, others copies. |
| src/server/account-routes.ts; optional transport middleware | HTTP guards/identity/sequencing over preceding units. | Existing http-application, app.ts exemplar retained. |
| src/browser/account-api.ts | Relative fetch, bounded abort timeout, response validation/typed outcomes, no DOM/game state. | New browser-api-client exemplar. |
| src/browser/view/account-screen.ts and shell/clock integration | Controls, transitions, game lifecycle. | Existing browser-module. |
| Runtime/build/deploy/measurement entrypoints | Compose/start/check existing units, no duplicate account policy. | Existing deferred entrypoint/build/deployment kinds when responsibilities match. |

Through maintain-coding-guidelines, each genuinely new kind gets its first-file exemplar, kind guidelines and coding.md row. Do not invent a new kind solely for a new filename or disguise a new responsibility as deferred. Measurement is an entrypoint using password operations. Return unexpected additional kinds to orchestrator. Existing exemplars and deferred HTML/CSS/build/deployment decisions remain.

Browser API/screen belong to browser-view; map gains account-server protocol dependency. Account-server description gains persistence. Assign each new test path exactly once; scripts belong to build-tools unless an operational deployment entrypoint lives under deploy. Include new tests in npm test. No foundation reorganization.

### 9. Tests and evidence

Use existing Node/Python tools, real temporary DB/files/local HTTP, bounded readiness/requests and cleanup on failures. Test account policies through real HTTP/DB where appropriate; do not silently broaden glossary unit test, currently simulation/view logic. View-state tests may be unit tests; real focus/events/rendering remain manual evidence.

Protect concrete faults: concurrent duplicate normalized email; code-point boundary/exact preservation; missing/tampered/expired/deleted session; foreign Origin/non-JSON/oversized requests; forwarded-chain spoof changing limiter key; sixth registration or sixth/twenty-first failure admitted concurrently; delayed touch resurrecting logout/shortening expiry; excess native password concurrency; success before persistence; request-supplied account ID changing authority; container replacement losing records; malformed secrets/new schema reaching readiness; unconfigured production falling back; game mounted before identity; timers left by logout.

At least one direct unauthorized-account refusal test carries its invariant and is seen failing once with controlled temporary guard removal then restoration. Every new invariant test has fail-once evidence with exact mutation/restoration, npm test command and exit. Do not leave weakened code or claim static grep proves session persistence/cookie safety.

Through maintain-testing-guidelines extend authorization table: visitor create/login allowed subject to guards; signed-in player reads own account/destroys own session; absent valid session denied; supplied other ID grants nothing; wrong Origin/media/transport denied before mutation. Bind rows to new decisions/invariants. Preserve public-file and unknown-API protections.

Restore D-73's adopted mental-mutation obligation: author names plausible faults and assertions that catch them. Adopt no mutation tool. The missing tool/parts settlement for computational work is an unresolved existing guideline gap, not a permanent exemption or complete template compliance. This task changes connection-based accounts and browser auth, not simulation/computational drawing. Preserve gap, scope and reason in request; no unrelated audit.

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/spec.md:86-124

````markdown
### 5. Password work and rate limits

Provisional profile: Argon2id, memoryCost 65536 KiB, timeCost 3, parallelism 1, hashLength 32, package-generated salt; at most two active hash/verify operations. No waiting queue: capacity returns the limitation response immediately. One gate covers registration hashing, known-account verify and unknown-account dummy verify; release on every completion/error. No hash fallback or weaker production/test profile.

Create one dummy hash with the configured profile before configured readiness; unknown-account login verifies against it through the same gate. This avoids an obvious no-hash path but does not claim identical timings. Reject invalid/oversized credentials before expensive work. Ordinary logs/benchmark output contain no real email/IP/password/hash/cookie/secret.

| Counter | Behavior |
|---|---|
| Email | Five failures in rolling 15 minutes start a 15-minute lock at failure five. During lock all attempts, including correct credentials, fail. Success clears pre-lock email failures. |
| IP login | Twenty failures in rolling 15 minutes block further login attempts until history permits one. Success does not clear IP failures. |
| IP registration | Five successfully created accounts in rolling one hour; invalid/duplicate requests do not consume successful-account slots. |

Reserve email/IP failure capacity before asynchronous credential work; convert to failure or release on success. Registration reserves a creation slot and converts it after insert. Reservations count toward admission to prevent parallel overshoot. Cancelled requests release reservations only after actual work finishes; disconnect does not release active hashing early.

Keep at most 10,000 live email keys and 10,000 live IP keys (IP histories combined). Use a fixed-size digest of normalized email as the limiter key, avoiding retained arbitrary-size strings. Expire empty entries, never evict a live restriction to admit a new key. Capacity fails closed, not bypasses tracking. History arrays are bounded by thresholds, reservations by the hash gate. Restart/deployment resets all counters.

All limitations show “Za dużo prób. Spróbuj ponownie za kilka minut.” Retry-After may report a known wait without replacing the text. Capacity refusal is not a failed credential check. Item 5 of orchestrator answers settles the unspecified email collection window. Lifetime accumulation was rejected because stale partial failures fill bounded memory indefinitely; rolling windows let widely spaced attempts avoid email lock. Durable counters were already rejected by the task; unbounded maps/queues defeat the resource goal. Capacity values remain reversible engineering bounds.

### 6. Startup, secrets and measured deployment

Configured startup uses LOOP2_DATABASE_PATH, LOOP2_SESSION_SECRET_FILE, LOOP2_PUBLIC_ORIGIN and LOOP2_PROXY_MODE. Production Compose supplies the durable path, mounted secret path, `https://loop2.mariusznazar.com` and cloudflare-tunnel mode. Validate the origin as HTTPS with no credentials, path beyond root, query or fragment, retaining its serialized origin for comparisons. Production requires all settings, validates before readiness and has no generated-key/in-memory/MemoryStore fallback. Partial/invalid explicit configuration fails everywhere. Preserve invalid-port/occupied-address behavior and dispose resources on failure. Production/container smoke tests supply isolated explicit account configuration; they must not silently exercise the unconfigured developer mode.

Non-production with none of those four settings retains static/developer startup. Known account routes return explicit JSON 503; UI shows account unavailability, never an anonymous game. Production forbids this mode. Tests construct configured apps with explicit real temporary SQLite and test secrets, avoiding process-wide environment changes shared across cases.

The default-address guarantee applies after startup configuration/resource validation succeeds: eligible configurations include wholly unconfigured non-production startup and fully configured startup that passes validation of account settings and required resources. With neither listen variable set, an eligible start retains exactly the readiness address `Loop: http://127.0.0.1:3000`, or the existing nonzero address-in-use outcome naming `127.0.0.1:3000`. Missing production settings and every partial/invalid explicit account configuration refuse readiness before listening; they are outside that conditional address guarantee. Amend account-server-default-address through the invariant skill to state this precondition and derive it from the task's external-secret requirement and resulting startup validation, rather than retaining the obsolete unconditional scope. The occupied-address invariant's nonzero/no-readiness promise remains unchanged.

The existing single default-address test explicitly establishes wholly unconfigured non-production startup: remove both inherited listen variables and all four account variables, and select non-production. Separate startup tests check missing, partial and invalid production configuration refusing before readiness; fully configured successful startup uses ephemeral ports. These cases follow D-49 and do not introduce a second default-port test. The intentional existing invariant/test amendment reconciles the accepted account requirement; it is not silent coverage weakening or a claim of human approval. Keeping the old unconditional entry would be false, while weakening production validation would allow unsafe startup.

Host `/etc/loop2/session-secrets` is root:1000 mode 0440, granted only to app at `/run/secrets/loop2_session_secrets`. Retain existing tunnel token, directory permissions and connector-only grant. The application reads the mounted secret without traversing the host directory. Human creation/replacement preserves the directory's tunnel access; file-backed Compose permission attributes do not remap host permissions.

Secret format: UTF-8 JSON array of distinct base64url strings, each encoding exactly 32 random bytes, newest first. Allow surrounding whitespace, reject empty/malformed/duplicate/short values, and bound input file to 16 KiB. Supply ordered keys to express-session. Invalid/unreadable input reports configuration setting/path, never contents.

Human rotation prepends a private random key, updates private backup, preserves ownership/mode and deploys to remount/reload. Old signatures remain accepted; rolling responses use the new key. Remove old key after at least 30 days from the last deployment able to sign with it, then redeploy; restoring old configuration resets that retirement reference. No secret in argv, logs, environment values, repo or request text. Update both deploy skill copies for these operations, database location and data-preserving rollback.

Build and exercise the actual image locally at 512 MiB with fresh disposable volume/secrets, verifying node ownership and persistence across replacement. Provide a bounded measurement executable in the built image importing the production profile/gate, using synthetic in-memory credentials, never opening account DB or session secrets. Report exact application commit, verified image identity, Node/argon2 versions, profile/gate, concurrency, operation counts, timings, peak process/container memory, memory limit and errors. Check correct/wrong verification, two active operations and overload refusal; run after warmup at least 20 hash and 20 verify operations at concurrency two. Bound total execution and exit nonzero for errors/budget failure.

On Mikrus the human runs an isolated disposable container from the deployed image, with the same 512 MiB bound, rather than an extra hashing load inside the live app. Verify image against deployed commit. Collect cgroup/container peak including native Argon2 memory: heapUsed alone is insufficient. Require no OOM/restart, peak below 80% of 512 MiB and correct bounds; remaining headroom is for application work. Report latency without inventing a player SLA. Failing candidate requires tuning code, rebuilding, redeploying and repeating exact-image measurement. Local/old-image evidence cannot certify target code.

The profile, two-slot candidate and 80% margin are engineering choices, not prior measured Mikrus facts. Keep player-argon2-deployment-check unchecked until target evidence. Request remains blocked until measurement and public browser journey. Prepare installed-script changes only if necessary and extract them from exact request commit; no agent server mutation.

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/task.md:61-63

````markdown
- 7. Jak serwer ogranicza automatyczne próby rejestracji i logowania i co widzi gracz, którego próby ograniczono? (Q7; część pytania otwartego definicji „Jak ograniczyć automatyczne próby rejestracji i logowania oraz wysyłkę potwierdzeń adresu i resetów hasła, uwzględniając pamięć kontenera i limit Outsidera?”)
  - Answer: w brzmieniu propozycji: „po 5 nieudanych logowaniach na jeden adres e-mail kolejne próby tego adresu są odrzucane przez 15 minut; z jednego adresu IP najwyżej 20 nieudanych logowań na 15 minut; najwyżej 5 nowych kont z jednego adresu IP na godzinę; liczenie skrótów haseł naraz ograniczone tak, żeby zmieściło się w pamięci kontenera (liczbę ustala pomiar cyklu).”; „Liczniki stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów; restart albo wdrożenie je zeruje.”; „Gracz ograniczony widzi „Za dużo prób. Spróbuj ponownie za kilka minut.”” Przyjęte koszty: zablokowanie na 15 minut logowania cudzego adresu złymi hasłami; wspólny próg graczy za jednym adresem IP; zerowanie liczników przy wdrożeniu; progi na adres IP działają tylko przy zaufaniu do nagłówka pośrednika (punkt 14 To do); próg na pojedynczy adres IPv6 łatwo obejść; liczenie skrótów dzieli procesor hosta z innymi kontenerami.
  - Source: Mariusz, 2026-10-25, słowa wyżej (tura 9).

````

## Source passage: docs/task-cycles/konta-graczy-i-logowanie/task.md:196-201

````markdown
| K3 | Hasło gracza ma od 12 do 128 znaków dowolnego rodzaju, bez wymogu cyfr i wielkich liter. | decision | pytanie 5 (Mariusz, 2026-10-25) | najkrótsze i najdłuższe przyjmowane hasło, także dla nowego hasła z resetu w zadaniu 21 |
| K4 | Serwer obcina spacje na początku i końcu adresu e-mail, porównuje adresy bez rozróżniania wielkości liter, więc „Ala@x.pl” i „ala@x.pl” to jedno konto, i sprawdza tylko postać „coś@coś”, bo prawdziwość adresu ustala potwierdzenie. | decision | pytanie 5 (Mariusz, 2026-10-25) | czy dopasowanie adresu przy potwierdzeniu (zadanie 20) i resecie (zadanie 21) rozróżnia wielkość liter i jak ściśle sprawdzać postać adresu |
| K5 | Rejestracja adresem, który ma już konto, pokazuje „Konto z tym adresem już istnieje.”, a nieudane logowanie jeden komunikat „Nieprawidłowy adres e-mail lub hasło.” bez wskazania, co się nie zgadza. | decision | pytanie 5 (Mariusz, 2026-10-25), z przyjętym kosztem „każdy może sprawdzić, czy dany adres ma konto w loop2” | czy logowanie i reset hasła w zadaniu 21 ukrywają, że adres ma konto, i jaki tekst odmowy sprawdza test (`guidelines/testing.md`, „Behaviour, not implementation”: bez wymagania tekstu odmowy się nie utrwala) |
| K6 | Sesja gracza jest ważna 30 dni od ostatniego żądania i przedłuża się przy każdym, a gracz może być zalogowany w kilku przeglądarkach naraz, każda z własną sesją. | decision | pytanie 6 (A; Mariusz, 2026-10-25) | czas życia ciasteczka i rekordu sesji, przedłużanie przy żądaniu, a w zadaniu 19 — czy blokada kończy jedną sesję, czy wszystkie sesje konta |
| K7 | Po 5 nieudanych logowaniach na jeden adres e-mail serwer odrzuca kolejne próby tego adresu przez 15 minut, z jednego adresu IP przyjmuje najwyżej 20 nieudanych logowań na 15 minut i najwyżej 5 nowych kont na godzinę, a gracz, którego próby ograniczono, widzi „Za dużo prób. Spróbuj ponownie za kilka minut.” | decision | pytanie 7 (Mariusz, 2026-10-25) | progi i okna ograniczania prób oraz to, czy zadania 20 i 21 dzielą komunikat ograniczenia |
| K8 | Liczniki prób stoją w pamięci procesu serwera, z górną granicą liczby śledzonych adresów, więc restart albo wdrożenie je zeruje, a liczenie skrótów haseł naraz jest ograniczone tak, żeby zmieściło się w pamięci kontenera. | decision | pytanie 7 (Mariusz, 2026-10-25), obok alternatywy, której Mariusz nie wybrał: „liczniki w bazie SQLite — przeżywają restart, ale każda próba to zapis w bazie” | czy liczniki stoją w bazie, czy w pamięci, i czy liczba równoczesnych skrótów ma górną granicę |

````
