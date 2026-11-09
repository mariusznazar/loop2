# Handoff - review of Slice 3 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 3 of the plan, the range `2a58095..6d18fb2` (compute the diff yourself: `git diff 2a58095..6d18fb2`, `git log 2a58095..6d18fb2`; confirm that `git rev-parse HEAD` is `6d18fb2`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-03-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-03-review.md`. Its first line is `PASS 6d18fb2` or `FAIL 6d18fb2` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- Which error types does the body parser raise besides `request.aborted`, and for each of them, are its status and its failure line (or the absence of one) the same as on the base `2a58095`? Which type does a body that ends before its declared `Content-Length` raise?
- Does the new test break the connection while the body is still being read by the parser (not before the request reaches the handler and not after the body is complete), and does it fail on the base for the reason the slice names? Could it pass for a reason other than the change?
- After the change, can a real failure of the server still reach the error handler under the status 400 branch and be hidden (an error whose `type` is `request.aborted` but which is not a browser breaking off)?
- Is the log line the change removes the only line a broken-off body wrote on the base, and does the answer the handler tries to send (status 400, "Invalid request body") match what a refused body gets today, including for a connection still open?

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 3")

### Slice 3 — A browser that breaks off its request body is refused, not logged as a failure

- **Goal:** a request whose body the browser stops sending (`request.aborted` of the body parser,
  today a `status` of 500 in the error handler of `src/server/app.ts:84`–`:118`, which writes a
  `{"failure":"request",…,"place":"app.errors"}` line) is treated as a refused body: it gets the
  answer a refused body gets ("Invalid request body", status 400) where the connection still takes
  one, and leaves no failure line (To do 9, Settlement 2). Every other error keeps its status and its
  line. A test on real HTTP sends part of a body and breaks the connection, then checks that the
  server's log holds no failure line; it is written first and seen failing on the base.
- **Change:** `src/server/app.ts` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:43-43` To do, item 9 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:100-107` Questions to settle, „Co jest awarią…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  Foundation entries: Settlement 2 as written ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:1917-1928` D-104 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:729-738` account-mutation-request-guards ·
  `foundations/part_map.md:62-82` account-server ·
  `guidelines/coding.md` · `guidelines/coding-http-application.md` · `guidelines/testing.md` ·
  `src/server/log-line.ts` · `tests/transport.test.mjs`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/app.ts` (`src/server/**`)
- **Checks:** `npm test -- tests/http.test.mjs` — the new case written first and seen failing on
  the base; `npm test -- tests/transport.test.mjs`
- **Depends on:** Slice 1 · Foundation entries: Settlement 2

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:17-26`

### Need

- Pełne `npm test` co jakiś czas pada samo z siebie, bez winy zmiany: przypadek ciasteczka sesji w `tests/account-storage.test.mjs` dostaje 5001 zamiast 5000 i wywrócił bramkę PR #51 (uwaga loop2#043-28 = 051-1); test zajętego portu ma 5-sekundowy limit, który pod obciążeniem raz już się przekroczył (loop2#050-21). Mariusz i agenci tracą wtedy przebieg i sprawdzają, czy to nie ich zmiana.
- Kilka miejsc zapisuje awarię, której nie było, zapisuje jedną awarię dwa razy albo mówi w logu nieprawdę, wbrew regule „Awarię zapisuj zawsze z przyczyną … raz, tam gdzie kod ją obsługuje” (`guidelines/coding.md:123`) — polecenie kopii bazy pisze „No backup was made”, choć kopia wyszła, lokalny start pisze dwa wiersze jednej awarii, a przeglądarka, która zerwie wysyłanie, liczy się jako awaria serwera.
- Przy kilku sprawdzeniach wczytywania zapisu gry, zapisu przy zamykaniu karty i zabezpieczeniach serwera można by wprowadzić usterkę, przez którą gracz traci cały zapis, a testy dalej by przeszły (uwagi loop2#043-2, 043-6, 043-23, 044-4, 047-5, 051-15, 051-9).
- Gracz, który wklei link z maila potwierdzającego albo resetu hasła do karty z już otwartą grą, ląduje w Siedzibie, a link przepada bez potwierdzenia (loop2#055-3).
- Skill wdrożenia ma zdania, przez które Mariusz albo agent źle odczyta instrukcję: trzy kroki o jednej nazwie, „nie ma przycisku zapisu” obok przycisków „Zapisz…”, pomiar haseł bez przyczyny porażki i bez sprzątania, polecenia usuwające wolumen, wynik polecenia blokady, linki po odblokowaniu (loop2#043-14, 043-16, 032-11, 032-12, 032-17, 032-4, 036-2, 037-1).
- Blok zapisu hasła poczty ze skilla, wklejony w terminal bez wklejania nawiasowego, zapisuje jako hasło następną wklejoną linię, `stat -c '%U %g %a' "$f"`, bez żadnego błędu (loop2#037-13; wniosek z tekstu bloku, nie próbowany w terminalu).
- Dwie linie fundamentu i skilla do grania są niezawinięte (loop2#050-10, 050-11).
- Źródłem jest pierwszy przegląd fundamentu z 2026-11-06/07; każdą pozycję sprawdzono ponownie na `main` `72287c2` 2026-11-08 i wszystkie stoją, poza zmienioną 037-9 (zob. Context).

### `task.md:43-43`

9. Przeglądarka, która zerwie wysyłanie treści żądania (`request.aborted`), dostaje odmowę jak przy odrzuconej treści i nie zostawia wiersza awarii (pytanie „Co jest awarią…”; loop2#051-6; `src/server/app.ts:90`–`:106`).

### `task.md:100-107`

- Co jest awarią, a co zwykłym przebiegiem: przeglądarka zrywająca wysyłanie, blokada konta w trakcie rejestracji i zdanie dla operatora po wierszu JSON?
  - Answer: (1) przeglądarka zrywająca wysyłanie treści żądania to spodziewana odmowa, jak za duża albo zepsuta treść, bez wiersza awarii; (2) odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to zamierzony skutek blokady, bez wiersza awarii, a inna przyczyna nieudanego zapisu sesji zostaje awarią; (3a) zdanie, którym polecenie serwisowe odpowiada operatorowi, nie jest wierszem logu — zostaje obok wiersza JSON, a wytyczne to mówią. Każdy fałszywy wiersz awarii stałby się fałszywym alarmem strażnika z zadania „skąd wiem o awarii”.
  - Not chosen:
    - (1) zostawić zerwanie jako awarię — każde zerwane połączenie gracza daje alarm
    - (2) zostawić odmowę zapisu sesji przy blokadzie jako awarię — rzadki fałszywy alarm
    - (3b) usunąć zdanie dla operatora — po blokadzie albo jej odmowie operator widzi w terminalu sam JSON, wbrew D-137
    - (3c) usunąć wiersz JSON — awaria polecenia nie trafia do logu, wbrew D-252
  - Source: Mariusz, 2026-11-08: „tak, przyjmuję rekomendacje” (rekomendacje: 1 zmienić, 2 zmienić, 3a)

### `task.md:148-156`

## Settlements to record

Candidates: 8 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gdy w adresie karty z już otwartą grą pojawi się link z maila (`#confirm-email=…`, `#reset-password=…`), strona przeładowuje się i robi to, co strona otwarta tym linkiem. | decision | pytanie „Co robi otwarta gra…”, Answer i Not chosen | czy dopisać to obok D-281 i D-96, czy zostawić w samym kodzie; bez wpisu późniejsza zmiana adresów ekranów może po cichu wrócić do „link przepada” |
| 2 | Przeglądarka zrywająca wysyłanie treści żądania i odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to spodziewany przebieg, nie awaria, i nie zostawiają wiersza awarii; inna przyczyna nieudanego zapisu sesji zostaje awarią. | decision | pytanie „Co jest awarią…”, Answer (1), (2) i Not chosen | czy przy następnej zmianie obsługi błędów serwera te dwa przypadki znów zapisać jako awarię, co da fałszywe alarmy strażnika |
| 3 | Zdanie, którym polecenie serwisowe (`account-block`, `account-backup`) odpowiada operatorowi, nie jest wierszem logu; wierszem logu jest tylko wiersz JSON. | decision | pytanie „Co jest awarią…”, Answer (3a) i Not chosen | czy zdanie dla operatora liczyć jako drugi zapis awarii i je usuwać albo przenosić; wytyczna z pozycji 32 potrzebuje decyzji, z której wynika |

## What to return

The status as the report's first line (`PASS <sha>` / `FAIL <sha>` / `questions`), then graded findings (blocking and Minor, each marked inside or outside the task's scope), the checks you ran as command and exit code,
every reach beyond this handoff (what, where, why), and **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Name any changed invariant test. Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
