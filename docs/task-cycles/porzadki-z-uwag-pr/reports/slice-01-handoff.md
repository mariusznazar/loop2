# Handoff - Slice 1 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `00aa818e59ab484358970f98af1f4ab61e969e4c`. The head you start from: `0277f8a`. Your range runs from `0277f8a`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: cheaper (haiku).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 1 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-01-report.md`.

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 1")

### Slice 1 — The three flaky tests pass whatever the clock and the computer's speed

- **Goal:** three kinds of case stop failing with no fault of the change (To do 1–3), each still
  guarding what it guards today. (1) The case of `tests/account-storage.test.mjs` that asserts
  `before.cookie.expires.getTime()` is 5000 after `load` (today about `:1819`–`:1846`, inside the
  loop of corrupted payloads) gives the same result whether or not a millisecond passes between two
  clock reads. The two reads are in the library, not in the product: `Store.prototype.createSession`
  of express-session makes `new Cookie(sess.cookie)`, whose `for…in` copies the enumerable accessor
  `maxAge` (getter `expires - Date.now()`) and then sets `expires = Date.now() + ms`. The case keeps
  checking that the database's expiry replaces the older JSON expiry. (2) The case "exits with an
  error instead of reporting ready when its listening port is occupied" of `tests/startup.test.mjs`
  (today `timeout: 5000` at `:120`) does not fail when a loaded computer takes longer than 5 s to
  start the process; it keeps a bound on its own waiting (D-77, D-84). (3) The three cases of
  `tests/http.test.mjs` that wait on `f.policy.inFlight === 1` (today `:1382`, `:1839`, `:1893`) do
  not depend on the password check lasting longer than one 5 ms poll of `waitFor`: each acts at a
  moment it observes for certain, for example through a hook the fixture already wraps around
  `runtime.database` or a wrapper of the `AccountPolicy` the fixture builds, and each still checks
  what its name says. Only test files change; no product file does.
- **Change:** `tests/account-storage.test.mjs` · `tests/startup.test.mjs` · `tests/http.test.mjs`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:30-35` To do, items 1 to 4 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:109-120` Context ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:1425-1436` D-73 · `foundations/decisions.md:1477-1490` D-77 ·
  `foundations/decisions.md:1492-1503` D-78 · `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/decisions.md:1003-1016` D-49 · `foundations/decisions.md:1887-1900` D-102 ·
  `foundations/decisions.md:1902-1915` D-103 · `foundations/decisions.md:2068-2081` D-115 ·
  `foundations/decisions.md:2663-2676` D-139 ·
  `foundations/invariants.md:779-788` account-session-storage ·
  `foundations/invariants.md:789-798` account-attempt-limits ·
  `foundations/invariants.md:1089-1098` password-reset-ends-sessions ·
  `foundations/part_map.md:62-82` account-server ·
  `foundations/glossary.md:93-103` unit test, integration test ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `src/server/session-store.ts` · `src/server/account-policy.ts:140-200` ·
  `src/server/passwords.ts` · `src/server/account-routes.ts:730-793` ·
  `node_modules/express-session/session/cookie.js` ·
  `node_modules/express-session/session/store.js`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/startup.test.mjs` ·
  `npm test -- tests/http.test.mjs`; where the race can be forced on the base — a busy wait of a few
  milliseconds put in temporarily between the two reads, or a password check that ends at once — the
  old case is shown failing and the new one passing, the commands and exit codes in the report and
  the temporary change taken out again; where it cannot be forced, the report says why
- **Depends on:** none

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

### `task.md:30-35`

Testy, które padają same z siebie:

1. Przypadek ciasteczka sesji w `tests/account-storage.test.mjs` (dziś `:1825`–`:1831`, `assert.equal(before.cookie.expires.getTime(), 5000, …)`) daje ten sam wynik niezależnie od tego, czy między dwoma odczytami zegara minie milisekunda (loop2#043-28 = 051-1).
2. Przypadek zajętego portu w `tests/startup.test.mjs` (dziś `timeout: 5000`, `:120`) nie pada pod obciążeniem komputera bez winy zmiany (loop2#050-21).
3. Trzy przypadki `tests/http.test.mjs`, które czekają na `f.policy.inFlight === 1` (dziś `:1382`, `:1839`, `:1893`), nie zależą od tego, że sprawdzenie hasła trwa dłużej niż jedno sprawdzenie warunku co 5 ms (loop2#036-1).
4. Klasa `OneExpressProcessServesGameAndApi` w `tests/invariants/test_loop2_one_serving_process.py` wykonuje się w pełnym `npm test` na komputerze Mariusza; gdy jej przygotowanie pada, cykl usuwa przyczynę (loop2#038-2).

### `task.md:109-120`

## Context

- Źródło pozycji: `the author's private note of the remarks of the first foundation review`, sekcja „Zadanie 2 (loop2): porządki z realnym ryzykiem”; kolumna „Słowa recenzenta” niesie brzmienie uwagi z opisu PR-a.
- Pozycje 25–31 pochodzą z sekcji „Zostawić” tego samego pliku, choć wstęp sekcji „Zadanie 2” je zapowiada; przy 032-4 sprawdzający zanotował „Nie sprawdzałem zachowania Dockera; opieram się na znanej semantyce `down -v`”, a skill wymienia trzy polecenia; czas kilkunastu sekund przy 032-17 pochodzi z uwagi recenzenta, kod go nie zawiera.
- Mariusz wybrał jedno zadanie zamiast podziału na pięć (testy niestabilne, zapis awarii, testy wczytywania, link z maila, teksty) — „wolę jedno zadanie” (2026-11-08).
- Ponowne sprawdzenie 2026-11-08 na `72287c2`: pliki kodu i testów pozycji 1–20 nie zmieniły się od `5694146`; mutantów nie uruchamiano ponownie.
- loop2#037-9 zmieniło się od przeglądu: zapis sesji na końcu odpowiedzi nadal pada (`src/server/database.ts:355` „Session cannot be replaced” przy zablokowanym koncie), ale dziś zostawia jeden wiersz `{"failure":"session",…,"place":"app.sessions"}` bez śladu stosu (`src/server/app.ts:60`–`:71`), a odpowiedź 201 dochodzi cała; ciasteczko wskazuje sesję, której baza nie ma. Prześledzone w kodzie, nie uruchomione.
- loop2#038-2: oba polecenia PowerShella, których używa przygotowanie klasy (`Get-NetTCPConnection -State Listen`, `Get-CimInstance Win32_Process`), zwracają 2026-11-08 wiersze z kodem 0; samego pliku nie uruchomiono, bo buduje grę.
- Numery linii w kolumnie „Stan dziś” źródła przesunęły się: 050-21 to `:120`, 050-9 to `:467`–`:470`, reguła „raz” to `guidelines/coding.md:123`–`:124`; numery w tym dokumencie są z `72287c2`.
- Zadanie `the note of another task in the author's backlog` (gotowe do cyklu) zmienia, dokąd trafiają wiersze JSON polecenia `account-block`, i dopisuje sekcję do `.claude/skills/loop2-deploy/SKILL.md`; pozycje 29 i 30 zmieniają ten sam plik, w sekcji o blokowaniu kont.
- Pytanie, czy zdania poleceń serwisowych są wierszami logu, stoi też w sekcji „Zadanie 4” źródła (loop2#051-13).
- Pozycja 24 zmienia `foundations/decisions.md`; wpisy fundamentu zmienia się tylko przez skill `the-way-record-decision` (`AGENTS.md`).

## What to return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
