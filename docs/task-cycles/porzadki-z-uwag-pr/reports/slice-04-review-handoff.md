# Handoff - review of Slice 4 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 4 of the plan, the range `6d18fb2..b6c70d1` (compute the diff yourself: `git diff 6d18fb2..b6c70d1`, `git log 6d18fb2..b6c70d1`; confirm that `git rev-parse HEAD` is `b6c70d1`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-04-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-04-review.md`. Its first line is `PASS b6c70d1` or `FAIL b6c70d1` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- For each cause that makes `saveSession` store nothing (the account blocked; the expected password hash replaced; the session row of another account; an expired row; an unknown account), which error does the change raise and which line does the app write? Is there any combination in which a cause other than a block is classified as a block and so loses its failure line? What if two causes hold at once?
- The classifying read runs after the statement that stored nothing: are the statement and the read one unit against a concurrent block or unblock, in the way SQLite and `this.transaction` really behave here (deferred vs immediate)? Could an unblock between them turn a block's refusal into a failure line, or the reverse?
- Does `instanceof BlockedSessionRefusal` still hold after the error has travelled through the session store and the library's callback to the handler in `app.ts`, or does something wrap or copy it?
- The executor's open point: `establishSession` (a login or registration whose first session write is refused by a block that came before it) still writes a failure line and answers 503. Is that behaviour the same as on the base `6d18fb2`? Is it inside what Settlement 2 / D-353 and To do 10 require, or outside the task's scope? Grade and scope it yourself.
- Do the changes to `tests/account-storage.test.mjs` leave every earlier case's assertions as they were, and does each new case fail without the change for the reason the slice names? The executor did not run the new storage test on the base; judge by tracing or by running it against `6d18fb2` in a temporary checkout that you remove again.

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 4")

### Slice 4 — A block during a registration leaves no failure line of the session write

- **Goal:** when the account is blocked while its registration waits on the confirmation message,
  the session write at the end of the response (`saveSession`, `src/server/database.ts:318`–`:356`,
  which throws "Session cannot be replaced") is refused as the block intends and leaves no
  `{"failure":"session",…,"place":"app.sessions"}` line (`src/server/app.ts:60`–`:71`); a session
  write refused for any other reason — a password replaced meanwhile, a database error, a trigger —
  still leaves its line (To do 10, Settlement 2). The block is told apart where the write learns it
  (see *Choices*), so what the write stores and when it refuses stay as D-112 gives: nothing is stored
  for a blocked account. The answer 201 and its body stay as today. Tests on real HTTP and SQLite —
  a block committed while the registration's message is held, then the log read — show no line for
  the block and one line for another cause; written first and seen failing on the base. Where the
  error the store or the database gives changes, the cases of `tests/account-storage.test.mjs` that
  match it follow, each change with its reason (testing guideline "Changing an existing test").
- **Change:** `src/server/database.ts` · `src/server/session-store.ts` · `src/server/app.ts` ·
  `tests/http.test.mjs` · `tests/account-storage.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:44-44` To do, item 10 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:100-107` Questions to settle, „Co jest awarią…” ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:115-115` Context, loop2#037-9 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:148-156` Settlements to record ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  Foundation entries: Settlement 2 as written ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:2038-2051` D-112 ·
  `foundations/decisions.md:2068-2081` D-115 · `foundations/decisions.md:2635-2648` D-137 ·
  `foundations/decisions.md:2650-2661` D-138 · `foundations/decisions.md:1799-1812` D-96 ·
  `foundations/decisions.md:2924-2937` D-156 ·
  `foundations/invariants.md:859-868` blocked-account-access ·
  `foundations/invariants.md:869-878` player-server-session ·
  `foundations/invariants.md:779-788` account-session-storage ·
  `foundations/invariants.md:609-618` player-self-registration ·
  `foundations/invariants.md:629-638` email-verification-nonblocking ·
  `foundations/invariants.md:1089-1098` password-reset-ends-sessions ·
  `foundations/part_map.md:62-82` account-server · `foundations/glossary.md:156-160` blocked account ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` ·
  `guidelines/coding-session-store.md` · `guidelines/coding-http-application.md` ·
  `guidelines/testing.md` · `src/server/log-line.ts` · `src/server/account-routes.ts:180-262` ·
  `src/server/account-routes.ts:640-730`
- **Model:** same — the reason of a refused session write crosses the database, the session store
  and the HTTP application of a trust boundary, and a mistake either hides a real failure or stores
  a session of a blocked account
- **Risk:** trust boundary — `src/server/database.ts`, `src/server/session-store.ts`,
  `src/server/app.ts` (`src/server/**`)
- **Checks:** `npm test -- tests/http.test.mjs` — the new cases written first and seen failing on
  the base; `npm test -- tests/account-storage.test.mjs`; `npm test -- tests/transport.test.mjs`
- **Depends on:** Slice 3 · Slice 1 · Foundation entries: Settlement 2

## The plan's Choices (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Choices")

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 4 gets no slice: the orchestrator's base run shows the class running and passing, so the task's condition does not hold | a slice that rewrites the class's PowerShell preparation anyway | the class could stop running again on another state of the machine, and only a reader of the gate's output would see it, as before |
| Slice 2 keeps the non-zero exit code `account-backup` gives today when its cleanup fails, and changes only the failure's name and the operator's sentence | exit 0 after a whole backup — the nightly script would send it, but the plain copy left in the container's `/tmp` would reach the owner by no notice; a new exit code of its own — the skill's table of the command's codes in `backup_and_restore.md` changes in two copies for a rare case whose sentence, in the backup log, already says which | one night's backup is not sent each time only the cleanup fails; the owner learns it from the notice and the log |
| Slice 4 tells the block apart where the session write learns it, carried from the database to the error handler of the session callback | reading the account's blocked state again after the write failed — a second query, and an unblock in between turns a block's refusal back into a failure line | a cause wrongly read as the block hides a real failure of the session write |
| Items 9, 10 and 17 are three slices in a chain over `src/server/app.ts` and `tests/http.test.mjs`, after Slice 1 | one slice of all three — a reviewer judges a change of behaviour, a second one and a gap of tests at once | three reviews of a trust boundary instead of one |
| Item 15 joins the simulation's test slice (Slice 9), though it guards `loop.ts`, not the load | a slice of its own | none beyond a larger review of Slice 9 |
| Slice 8 observes what the client hands the real `fetch` and lets it reach the file's real local server | a stand-in for `fetch` — against the example "Test na prawdziwym lokalnym serwerze" of `guidelines/coding-browser-api-client.md` | a wrapper that changes the request would test the wrapper; the review checks that it passes the call on unchanged |
| Slice 10 reloads through the `PageAddress` the page already gets, which gains the reload | `location.reload()` called in `game-view.ts` — no test of the view can see it | one more member of a type every fake address of the tests implements |
| Slice 11 sends docker's own error text to standard error, which stays in the terminal, and puts in the report only the docker step and its exit status | docker's text in the report — the report is copied into the request, and docker's message over `DOCKER_HOST=ssh://…` can carry the server's name or address, which D-13 keeps out of requests | Mariusz has to read the terminal, not only the file, to see the reason |
| Slice 12 keeps the tunnel's H1–H5 and renames the mail's and the saved-game's steps | renaming all three families — the tunnel's names stand also in `backup_and_restore.md`, in `troubleshooting.md`'s section on abandoning the request and in further places, so more files and more references to miss | the tunnel's steps keep a name as generic as before |
| The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) stays as it is, though several cases use it (the orchestrator's answer to the planner's open question) | raising it with item 2 — the task and the review row name only the occupied-port case, and nobody has seen `refusedStart` fail | a later load failure of another case of the same file, to be a remark of a later task |
| Slice 12 changes the text of the measuring section only for items 26 and 27 and leaves the launcher without a signal handler | a signal handler in `scripts/measure-passwords.mjs` that removes the container — the task asks the skill to say how, and a killed terminal or lost connection runs no handler anyway | none |

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

### `task.md:44-44`

10. Blokada konta, która zapadnie w trakcie wysyłki maila przy rejestracji, nie zostawia wiersza awarii zapisu sesji; inna przyczyna nieudanego zapisu sesji nadal go zostawia (pytanie „Co jest awarią…”; loop2#037-9; `src/server/account-routes.ts:706`–`:724`, `src/server/database.ts:355`, `src/server/app.ts:60`–`:71`).

### `task.md:100-107`

- Co jest awarią, a co zwykłym przebiegiem: przeglądarka zrywająca wysyłanie, blokada konta w trakcie rejestracji i zdanie dla operatora po wierszu JSON?
  - Answer: (1) przeglądarka zrywająca wysyłanie treści żądania to spodziewana odmowa, jak za duża albo zepsuta treść, bez wiersza awarii; (2) odmowa zapisu sesji z powodu blokady konta w trakcie rejestracji to zamierzony skutek blokady, bez wiersza awarii, a inna przyczyna nieudanego zapisu sesji zostaje awarią; (3a) zdanie, którym polecenie serwisowe odpowiada operatorowi, nie jest wierszem logu — zostaje obok wiersza JSON, a wytyczne to mówią. Każdy fałszywy wiersz awarii stałby się fałszywym alarmem strażnika z zadania „skąd wiem o awarii”.
  - Not chosen:
    - (1) zostawić zerwanie jako awarię — każde zerwane połączenie gracza daje alarm
    - (2) zostawić odmowę zapisu sesji przy blokadzie jako awarię — rzadki fałszywy alarm
    - (3b) usunąć zdanie dla operatora — po blokadzie albo jej odmowie operator widzi w terminalu sam JSON, wbrew D-137
    - (3c) usunąć wiersz JSON — awaria polecenia nie trafia do logu, wbrew D-252
  - Source: Mariusz, 2026-11-08: „tak, przyjmuję rekomendacje” (rekomendacje: 1 zmienić, 2 zmienić, 3a)

### `task.md:115-115`

- loop2#037-9 zmieniło się od przeglądu: zapis sesji na końcu odpowiedzi nadal pada (`src/server/database.ts:355` „Session cannot be replaced” przy zablokowanym koncie), ale dziś zostawia jeden wiersz `{"failure":"session",…,"place":"app.sessions"}` bez śladu stosu (`src/server/app.ts:60`–`:71`), a odpowiedź 201 dochodzi cała; ciasteczko wskazuje sesję, której baza nie ma. Prześledzone w kodzie, nie uruchomione.

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
