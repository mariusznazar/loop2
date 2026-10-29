# Handoff — spec designer, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`, head = base `7a633a7` (`main`, the merge of task 19
  `blokada-konta`). Process pin `.the-way` at `3aee7d9`, not moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it) when the step that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md` — read it whole.
- Spec path: `.runs/task-cycles/potwierdzenie-adresu/spec.md`
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree. Do not commit; the spec stays in the
  ignored `.runs/`. Do not run the product's gate (`npm test`); it is the orchestrator's.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/server/**` as the trust boundary of
  `account-server`. The change adds a route that takes a confirmation token from the network
  without a session, a session-authorized route that triggers a send, an outbound SMTP connection
  to Mikrus Outsider with a credential read from a file, new startup configuration, and a schema
  step on the persistent account database. Every code review of the cycle checks crafted input at
  that boundary — token forms, origin and body guards, header injection into the message, the
  credential and tokens never reaching logs, the container environment or responses.
- Irreversible operation: **yes**. The change carries a schema step of the persistent account
  database `loop2_accounts` on the test server; after it a rollback to an earlier commit refuses
  that database (D-112, D-15). It runs when the human deploys the branch (H4) and when the merge
  deploys `main` (D-11). The cycle prepares it (code, tests on temporary databases, the deploy
  skill's text) and never performs it. No agent deploys, sends real mail through Outsider or
  changes anything on the server (D-12); tests never reach the real Outsider.

## The open design choice

The task's section *Questions carried to cycle* leaves these open (quoted word for word from the
frozen task):

> - Gdzie stoją liczniki pułapów wysyłki D-105 — w pamięci procesu jak liczniki prób D-103 (restart je zeruje), czy w bazie; D-105 tego nie mówi.
> - Jak serwer przechowuje token odnośnika (np. tylko jego skrót) i jaką postać ma odnośnik (ścieżka, parametr albo fragment adresu), tak by token nie trafiał do logów (OWASP, Context) i trafiał w plik gry, który istnieje (D-86, `src/server/app.ts:58`).
> - Jak zapisać stan potwierdzenia adresu i odnośniki w kolejnej wersji schematu po wersji, którą wprowadza zadanie 19, i jakie brzmienie dostają przez to D-112 oraz niezmienniki `account-schema-lifecycle` i `account-database-schema` (pytanie 6, punkt 9 To do).
> - Jak przeglądarka poznaje wynik wysyłki przy założeniu konta — czy odpowiedź na założenie konta czeka na wynik wysyłki, z jakim limitem czasu, czy wysyłka idzie w tle; wymagane jest, by założenie konta i wejście do siedziby nie zależały od jej powodzenia (punkt 1 To do), a przeglądarka musi poznać, czy wysyłka wyszła, trafiła na pułap D-105 czy się nie udała (punkt 6 To do, pytanie 8); sposób wybiera cykl, jak mówi odpowiedź na pytanie 8.
> - Jaką rolę mają zdania „Potwierdzanie adresu…” i „Wysłaliśmy odnośnik potwierdzający na <adres>.”, których pytania 2 i 3 nie przypisały do roli — według reguły „Each role in its meaning” w `guidelines/styleguide-browser-view.md` i tabeli ról.
> - Podział treści wiadomości na wiersze — w odpowiedzi na pytanie 4 kolejne części treści oddziela „ / ”.
> - Pytanie otwarte planu „Czy można skonfigurować DNS `mariusznazar.com`, skrzynkę i połączenie SMTP do Outsidera z kontenera loop2, a wiadomości potwierdzenia i resetu dochodzą do zewnętrznych skrzynek?” — część o potwierdzeniu rozstrzygają czynności człowieka H1–H4 i punkt 15 To do; doręczenie wiadomości resetu sprawdza cel zadania 21.
> - Czy login SMTP skrzynki nadawcy to pełny adres `loop2@mariusznazar.com` (wartość loginu w `compose.yaml`, punkt 10 To do) — dokumentacja Outsidera nie mówi tego jasno; sprawdza to próba doręczenia H4 (rozmowa refinementu tura 17).

Beside them, the spec gives the design that the task's *Settlements to record* (K1–K7, K9, K10)
and its projected entries rest on, where a row leaves the mechanism open — among others: how the
browser's confirming request meets D-104 without a session (K2, change of D-109), how the
production configuration of mail is named and validated (K6, change of D-111 and
`account-startup-configuration`), how the SMTP password file reaches only the application (K7,
change of D-13, D-17, `loop2-host-sharing`), how blocking invalidates links (K10, the owner command
of D-137), how the header row and the resend button fit the header of D-97 and D-44 (K3, K4), and
how a mail-sending module is tested without the real Outsider (To do 12 and 13). The wording of the
foundation entries is the foundation step's, made later by the author; the spec gives the design
they rest on. Where the task and foundation already settle a point, the spec cites them and does
not reopen it.

## What to read

Foundation entries, each whole (`foundations/decisions.md`, `foundations/invariants.md`,
`foundations/environment_facts.md`, `foundations/glossary.md`):

- Decisions in play (the task's list): D-05, D-13, D-15, D-17, D-12, D-39, D-44, D-96, D-97, D-99,
  D-104, D-105, D-108, D-109, D-111, D-112, D-117.
- Decisions of the touched parts the design leans on: D-11, D-37, D-40, D-86, D-101, D-102, D-103,
  D-107, D-110, D-114, D-115, D-116, D-137, D-138, D-139, D-33, D-81, D-84.
- Invariants: `email-verification-nonblocking`, `account-mutation-request-guards`,
  `account-startup-configuration`, `account-schema-lifecycle`, `account-database-schema`,
  `account-session-authorization`, `account-client-outcomes`, `account-client-requests`,
  `account-request-transport`, `loop2-host-sharing`, `loop2-one-serving-process`,
  `introduced-npm-vulnerabilities`, `blocked-account-access`, `player-server-session`,
  `unblock-restores-no-session`, `account-attempt-limits`, `account-attempt-tracking`,
  `account-session-storage`, `public-file-access`, `loop2-shared-public-origin`.
- Environment facts: `mikrus-tunnel-outbound-tcp`, `compose-file-secret-permissions`,
  `node-sqlite-database`, `sqlite-wal-concurrency`, `docker-volume-lifecycle`,
  `fetch-origin-header`, `fetch-same-origin-credentials`.
- Glossary: `test server`, `headquarters`, `deployment`, `public address`.
- Part map (`foundations/part_map.md`, short — read whole): entries `account-server`,
  `browser-view`, `deployment`, `build-tools`, `agent-workflow`, `product-foundation` and its
  *External context* (Mikrus Outsider is not yet a partner there).

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`,
`guidelines/coding-database-access.md`, `guidelines/coding-account-policy.md`,
`guidelines/coding-session-store.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`.

Product files the choice depends on (read to design, not to write): `src/server/*.ts` (notably
`database.ts`, `account-routes.ts`, `app.ts`, `configuration.ts`, `main.ts`, `account-block.ts`,
`account-policy.ts`, `session-store.ts`, `transport.ts`), `src/browser/account-api.ts`,
`src/browser/view/app.ts`, `src/browser/view/account-screen.ts`, `src/browser/view/headquarters.ts`,
`src/browser/view/controls/`, `src/browser/kitchen-sink/kitchen-sink.ts`, `tests/http.test.mjs`,
`tests/account-storage.test.mjs`, `tests/startup.test.mjs`, `Dockerfile`, `compose.yaml`,
`deploy/loop2-deploy`, `.claude/skills/loop2-deploy/SKILL.md` and its `references/`.

The task's sources: the frozen task quotes the projected entries and the answers it rests on word
for word. The project definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` (approved
2026-10-28, sha256 `3e9c2cc9146b…`) may be searched selectively for a passage the task cites. The
Outsider documentation pages the task's *Context* names may be read on the web; Nodemailer 10's
documentation likewise (its STARTTLS options, `requireTLS`, timeouts) — name each such reach.

## Return

Write the spec and your report as `design.md` gives, and return your status (`questions` or
`done`) with the two paths.
