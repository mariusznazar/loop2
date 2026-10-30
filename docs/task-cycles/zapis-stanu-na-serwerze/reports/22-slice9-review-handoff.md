# Handoff — Slice 9 reviewer, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **reviewer of Slice 9**, a fresh agent
that made none of it. Read-only: change no file other than your report. Questions go to the
orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`.
- Method: `.the-way/task-cycle/review/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes. You review a planned slice: Slice 9.
- Range to review: `11d1fb6..59bf3da` (Slice 9).
- Executor's report: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/21-slice9-report.md`.
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md`.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/22-slice9-review-report.md`, its
  first line `PASS <sha>`, `FAIL <sha>` or `questions`.
- Do not run the whole gate (`npm test` with no argument); run focused checks and any mutation
  analysis your method gives for the files of the range.

## Answers of step 4

- Trust boundary: **yes** for the cycle; Slice 9's text tells an agent what it may read on the
  server and the human what to do — check that the agent–human division of D-12 stands as it was
  and that no secret or value from the server enters the text.
- Irreversible operation: **yes** — Slice 9 is the text the human reads before it: the first
  deployment of this branch (H1) moves the test server's `loop2_accounts` from schema version 3 to
  4; after it, code from `main` before this task's merge refuses the database (exit 8), so a
  rollback across it cannot start, and from H1 to this task's merge nothing else may be merged to
  `main` (D-11). Check that the text says so where the human will meet it, that it matches the code
  of Slice 2 (`src/server/database.ts`) and D-112, D-15, D-17, D-182, and that it only prepares the
  operation (no agent performs it).

## Information from the orchestrator's mechanical check

Passed: clean worktree, one commit `59bf3da`, files = *Change* (three files of
`.claude/skills/loop2-deploy/` and their byte-equal copies in `.agents/skills/loop2-deploy/`), its
one check with command and exit code. The executor's first return named its commit as an
unexpanded `$H`; the report itself names `59bf3da`.

## Slice 9 of the plan (copied word for word from plan.md)

### Slice 9 — The deploy skill's text about saved game states

- **Goal:** as To do 15 and spec decision 9: `.claude/skills/loop2-deploy/SKILL.md` — its opening
  lines, § „Accounts, session keys and the database” and § „Rollback” — and
  `references/troubleshooting.md` § „Rollback and the accounts” say that `loop2_accounts` also
  holds saved game states, that a rollback leaves them as they are, that schema version 4 adds the
  table of saved game states, and that a commit knowing only version 3, `main` before this change
  included, then fails health (exit 8); `references/setup_and_secrets.md` § „Deploying a request
  head and accepting it” gains the rule that from the first deployment of this task's branch (H1)
  until its merge, through review and corrections, nothing else merges to `main`, its sentence
  „Reload: the headquarters appears straight away” gains the landing on a manual map run (paused
  while it goes on, on its screen after its end), and in place of „saved game states are not
  checked here” it gives the step: save the game, redeploy the same commit (H2), reload and see the
  saved state back. `.agents/skills/loop2-deploy/` stays byte-equal to
  `.claude/skills/loop2-deploy/`. The skill's other matters (WAY-139: watching deployments,
  secrets, the agent–human split, logs) stay as they are.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:33-33` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:124-130` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:190-191` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:201-203` Context ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:222-225` Human actions ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:355-364` 9. The deploy skill's text (both copies) ·
  Foundation entries row 5 · Foundation entries row 13 · Foundation entries row 18 ·
  Foundation entries row 27 ·
  `foundations/decisions.md:211-230` D-11 · `foundations/decisions.md:232-250` D-12 ·
  `foundations/decisions.md:284-302` D-15 · `foundations/decisions.md:331-354` D-17 ·
  `foundations/decisions.md:1963-1974` D-112 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/glossary.md:32-37` deployment · `foundations/glossary.md:39-44` test server ·
  `.the-way/foundations/glossary.md:79-83` human action ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Model:** cheaper
- **Risk:** cannot be undone — the text that tells the human about schema step 4 on
  `loop2_accounts`: the rollback that no longer starts across it and the window from H1 to the
  merge in which nothing else may merge to `main`
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`
- **Depends on:** Slice 2 · Foundation entries rows 5, 13, 18, 27

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 5 → `foundations/decisions.md:3270-3289` D-182 — Where are player accounts and saved game states stored?
- plan row 13 → `foundations/decisions.md:1745-1758` D-96 — What does a player see before and after signing in?
- plan row 18 → `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- plan row 27 → `foundations/invariants.md:758-766` account-schema-lifecycle
- `foundations/decisions.md:229-248` D-11 — Which branch deploys loop2 to the test server?
- `foundations/decisions.md:250-268` D-12 — What access to the server does an agent have?
- `foundations/decisions.md:302-320` D-15 — How is loop2 recovered when a deployment goes wrong?
- `foundations/decisions.md:349-372` D-17 — How does loop2 share the Mikrus host with other workloads?
- `foundations/decisions.md:1984-1995` D-112 — How does the account database open and preserve its schema?
- `foundations/invariants.md:688-696` account-save-durable-storage
- `foundations/invariants.md:758-766` account-schema-lifecycle
- `foundations/glossary.md:32-37` deployment
- `foundations/glossary.md:39-44` test server
- `.the-way/foundations/glossary.md:79-83` human action

## Other files your *Read* names (each whole unless a range is given)

- `tests/agent_workflow/test_loop2_deploy_skill.py`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:33-33` To do

15. Skill wdrożenia `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`), jego `references/troubleshooting.md`, § „Rollback and the accounts”, i `references/setup_and_secrets.md`, § „Deploying a request head and accepting it”, mówią, że baza w wolumenie `loop2_accounts` trzyma też zapisy stanu gry, że wycofanie zostawia je bez zmian, że wycofanie do commitu sprzed tego zadania nie wystartuje na bazie po przejściu na wersję schematu z punktu 1 i że od pierwszego wdrożenia gałęzi tego zadania (H1) do jego scalenia, przez przegląd i poprawki, człowiek nie scala do `main` nic innego; w § „Deploying a request head and accepting it” zdanie „Reload: the headquarters appears straight away” zgadza się z odpowiedziami na pytania 20 i 23 (dostaje zastrzeżenie, że gdy w zapisie jest ręczne przejście, pojawia się to przejście — trwające na pauzie, zakończone na ekranie po swoim końcu), a zdanie „saved game states are not checked here” ustępuje sprawdzeniu, że zapis stanu gry wraca po ponownym wdrożeniu (H2) (WAY-139; pytanie 14).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:124-130` Questions to settle

- 14. Czy dopisanie zapisów stanu gry do skilla `loop2-deploy` (punkt 15 To do) zostaje w tym zadaniu, czy idzie do osobnego zadania? (Q14; WAY-139: “the task gains an item of its To do for that work or the human splits that work into a task of its own”)
  - Answer: zostaje w tym zadaniu (droga A): skill (obie kopie, `.claude/skills/` i `.agents/skills/`) i jego `references/troubleshooting.md` mówią, że baza trzyma też zapisy stanu gry, że wycofanie zostawia je bez zmian i że wycofanie do commitu sprzed tego zadania nie wystartuje na bazie po przejściu na jego wersję schematu. Przyjęty koszt: kilka zdań więcej w requeście, w dwóch kopiach skilla.
  - Not chosen:
    - B — osobne zadanie — nowe zadanie w planie (zmiana planu); do jego scalenia skill przemilcza zapisy, więc agent pytany o wycofanie powie, że baza trzyma tylko konta i sesje.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q14, w pakiecie jako D12 (tura 9).
  - Answer, rozszerzenie (propozycja P1): punkt 15 To do w brzmieniu P1 — dochodzi `references/setup_and_secrets.md`, § „Deploying a request head and accepting it”, w obu kopiach skilla, gdzie po tym zadaniu dwa zdania przestają być prawdą („Reload: the headquarters appears straight away” i „saved game states are not checked here”, `.claude/skills/loop2-deploy/references/setup_and_secrets.md:323`, `:324`–`327`, loop2 b8ac134), oraz zasada okna scaleń od H1 do scalenia. Przyjęty koszt: kilka zdań więcej w requeście, w dwóch kopiach skilla.
  - Source: Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami” — propozycja P1 przyjęta zgodnie z rekomendacją (tura 19 rozmowy refinementu; brzmienie P1 w turze 17).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:190-191` Context

- Wdrożenie loop2 odtwarza oba kontenery projektu (skill `loop2-deploy`, `.claude/skills/loop2-deploy/SKILL.md`), więc każde kolejne wdrożenie wymienia kontener aplikacji; baza leży w wolumenie `loop2_accounts`, którego agent nie czyta.
- D-17, *Verification*: “Checks of accounts and sessions alone do not establish preservation of saved game states and cannot clear account-save-durable-storage.” — niezmiennik `account-save-durable-storage` ma dziś „Violated: yes”.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:201-203` Context

- Kontrola skilla wdrożenia (WAY-139) dotyczy tego zadania: zadanie zmienia dane, które działający produkt trzyma na serwerze (zapisy stanu gry w bazie `loop2_accounts`) i wersję schematu tej bazy, a to zmienia, co wycofanie robi z danymi. Skill `loop2-deploy` mówi dziś: “The application keeps player accounts and sessions in a SQLite database in the named Docker volume `loop2_accounts`” i w § „Rollback”: “A rollback changes code, never data. The accounts, sessions and session-key file stay as they are” — o zapisach stanu gry nic (`.claude/skills/loop2-deploy/SKILL.md:9`–`10`, `:217`–`218`, loop2 b8ac134); pozostałe punkty listy WAY-139 — podgląd wdrożeń, sekrety, podział agent–człowiek, logi — zadanie zostawia bez zmian. Zadania 19 i 20 zostawiły takie dopiski u siebie (`blokada_konta_loop2.md`, punkt 6 To do; `potwierdzenie_adresu_loop2.md`, punkt 11 To do).
- Przed zamknięciem fazy „Konta na serwerze testowym” konto zakłada tylko właściciel (plan `plan_mvp_loop2.md`, faza „Konta na serwerze testowym”: „przed zamknięciem fazy konta zakłada tylko on”); ile kopii bazy zachować i czy zmieszczą się na Strychu, ustala zadanie 17 (pytanie otwarte planu).
- Każde scalenie do `main` wdraża się samo (D-11). Pierwsze wdrożenie gałęzi tego zadania (H1) przenosi bazę serwera testowego na wersję 4 schematu, a kod z `main` sprzed scalenia tego zadania zna tylko wersję 3, więc odmawia bazy i nie wstaje (kod 8; `.claude/skills/loop2-deploy/SKILL.md:221`–`227`, `references/troubleshooting.md:116`–`118`, loop2 b8ac134). Od H1 do scalenia tego zadania nie scala się więc do `main` nic innego. Czynności człowieka w cyklu robi się przy zablokowanym szkicu requestu, zanim człowiek go przejrzy (`.the-way/task-cycle/skill/SKILL.md:103`–`107`, `:367`–`368`), a po H2 cykl dokłada jeszcze zdjęcie znacznika (punkt 14), więc okno trwa od H1 przez przegląd i poprawki aż do scalenia; scala człowiek, więc to on pilnuje, żeby w tym czasie nie scalić innego requestu — w tym oknie mogą czekać cykle zadań 10 i 13 (plan `plan_mvp_loop2.md`, sha256 44f443454fdd: `ready for cycle`; zadanie 9 scalone 2026-10-29, `done`). Skill zna już taką zasadę dla przejścia na tunel: „From H3 until completion and merge, merge nothing else to `main`.” (`references/setup_and_secrets.md:37`).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:222-225` Human actions

## Human actions

- H1. Wdrożenie commitu z requestu na serwer testowy zainstalowanym skryptem wdrożenia przed scaleniem (D-15) i sprawdzenie kryterium akceptacji: zapis gry w jednej przeglądarce i jej wczytanie po zalogowaniu na to samo konto w drugiej — in the cycle (Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”, droga A umieszczenia H1, w pakiecie jako D13; tura 9 rozmowy refinementu). Od H1 do scalenia tego zadania, przez przegląd i poprawki, nie scala się do `main` nic innego — każde scalenie wdraża `main` ze schematem 3, który odmówi bazy w wersji 4 (kod 8; Context); pilnuje tego człowiek przy scalaniu innych requestów. Umieszczenie potwierdzone z tym kosztem: in the cycle (Mariusz, 2026-10-29, „przyjmuję zgodnie z rekomendacjami”, droga A ponownie zadanego umieszczenia H1 i H2 — obie w cyklu, przed scaleniem; okno od H1 do scalenia, przez przegląd i poprawki, w którym nic innego nie scala się do `main`, pilnuje człowiek; niewybrane: H1 po scaleniu, H2 w cyklu (B) — okno zostaje, bo H2 i tak wdraża gałąź przed scaleniem, a odpada tylko sprawdzenie kryterium akceptacji przed scaleniem; H1 i H2 po scaleniu, a znacznik zdejmuje osobna mała zmiana po H2 (C) — zmienia odpowiedź na pytanie 11 („przed scaleniem”) i powód zmiany planu z 2026-10-29, zdjęcie znacznika potrzebuje własnego zadania w planie, które przejmie zapis `account-save-durable-storage/1` (zmiana zapisującego z krytyką), a request scala się ze znacznikiem nadal ustawionym i z niesprawdzonym kryterium akceptacji, więc błąd zapisu wychodzi dopiero na `main`; tura 19 rozmowy refinementu, drogi w turze 17).
- H2. Ponowne wdrożenie tego samego commitu, które wymienia kontener aplikacji, i sprawdzenie, że zapis z H1 wraca — in the cycle (Mariusz, 2026-10-29, ta sama odpowiedź; pytanie 11, droga A; umieszczenie potwierdzone 2026-10-29 razem z H1, tura 19).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:355-364` 9. The deploy skill's text (both copies)

### 9. The deploy skill's text (both copies)

`SKILL.md` and `references/troubleshooting.md` say that `loop2_accounts` also holds saved game
states, that a rollback leaves them, that schema version 4 adds the table of saved game states and
that a commit knowing only version 3, `main` before this change included, then fails health (exit 8);
`references/setup_and_secrets.md`, § "Deploying a request head and accepting it", gains the
merge-window rule from H1 to the merge, the reload sentence with the landing on a manual map run, and
a step in place of "saved game states are not checked here": save the game, redeploy the same commit
(H2), reload and see the saved state back. `.agents/skills/loop2-deploy/` stays byte-equal to
`.claude/skills/loop2-deploy/`.
