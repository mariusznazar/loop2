# Handoff - review of Slice 7 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 7 of the plan, the range `a0ddb7d..ee5c375` (compute the diff yourself: `git diff a0ddb7d..ee5c375`, `git log a0ddb7d..ee5c375`; confirm that `git rev-parse HEAD` is `ee5c375`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-07-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-07-review.md`. Its first line is `PASS ee5c375` or `FAIL ee5c375` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- When the server breaks its answer off after the headers, how many failure lines does the proxy write: can both the upstream request's error and the upstream response's error fire for one request, and does the `failed` flag really keep it to one? What does the browser's connection see (cut, not an ended answer that looks whole)?
- A browser that leaves while the server is mid-answer: the order of events between the browser-side `close` (which sets `browserLeft` and destroys the upstream) and the upstream response's `error`/`aborted`. Can `fail` run before `browserLeft` is set and write a line for a browser that left? The executor says no test covers this combination ("argued from the code only"). Trace or run it (a stand-in server that answers slowly, a browser that closes mid-answer) and say what you saw.
- The new test that "a browser that left leaves no line" was seen failing with the guard removed: does it fail because of the guard, or because of something else the removal changes? Could it pass with the guard in place for a reason other than the guard?
- The docstrings of item 20 (module and class `LocalStart`): is each statement of which cases run the real server and which a stand-in true for every case of the file, including the case of a start on its way up and the cases of this slice?
- Does the change alter the pre-header 502 path, the headers sent upstream (`upstreamHeaders`), or anything the invariant `local-start-access` guards, which the slice does not intend?

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 7")

### Slice 7 — The local proxy ends a cut-off answer and stays quiet for a browser that left

- **Goal:** in `scripts/local-start.mjs` and its test file (To do 8, 18, 20): (8) when the server
  breaks off its answer after the headers, the proxy (`proxyRequest`, today `:162`–`:188`; the
  handler at `:172`–`:175` only pipes) ends the browser's connection instead of leaving the browser
  waiting, and writes one failure line with the cause, unless the browser had already left. (18) A
  test shows that a browser that leaves in the middle of a request leaves no `local-proxy` failure
  line (the `browserLeft` guard, today `:163`, `:177`–`:178`, `:183`–`:186`). (20) The docstrings of
  `tests/invariants/test_local_start_access.py` (the module's at `:1`–`:11`, the class `LocalStart`'s
  at `:256`) say which cases run the real server and which a stand-in, the stand-in cases of this
  slice included (today the case at `:467`–`:480` runs one, as does the case of a start on its way
  up). The tests run the real command with stand-in servers, as the file's cases with
  `DROPPING_SERVER` and `BUSY_SERVER` do. The test of (8) is written first and seen failing on the
  base; the test of (18) is seen once failing on code with the guard removed, put in temporarily —
  the commands and exit codes in the report, and the defect taken out again.
- **Change:** `scripts/local-start.mjs` · `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:42-42` To do, item 8 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:55-57` To do, items 18 to 20 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5230-5259` D-255 ·
  `foundations/decisions.md:5306-5324` D-258 · `foundations/decisions.md:1997-2010` D-110 ·
  `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:1179-1188` local-start-access ·
  `foundations/part_map.md:84-116` build-tools ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/server/log-line.ts` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** same — the orchestrator raised it from `cheaper`: the same file and test file as Slice 6, with a change of a proxy's handling of a cut-off answer and of a browser that left, in a trust boundary
- **Risk:** trust boundary — `scripts/local-start.mjs`
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`, also with the defect of
  (18) in place (failing), then without it (passing)
- **Depends on:** Slice 6

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

### `task.md:42-42`

8. Gdy serwer zerwie odpowiedź po nagłówkach, pośrednik lokalnego startu kończy połączenie z przeglądarką, zamiast zostawić ją czekającą, i zapisuje wiersz awarii (loop2#050-5; `scripts/local-start.mjs:172`–`:175`).

### `task.md:55-57`

18. Test pokazuje, że przeglądarka, która odeszła w trakcie żądania, nie zostawia wiersza awarii pośrednika lokalnego startu (loop2#050-7; `scripts/local-start.mjs:163`–`:184`).
19. Test podrzuconego katalogu startu nie zależy od kolejności, w jakiej system zwraca nazwy katalogów (loop2#050-8; `tests/invariants/test_local_start_access.py:393`–`:399`; `scripts/local-start.mjs:282`).
20. Opisy pliku `tests/invariants/test_local_start_access.py` (`:11`, `:256`) mówią, które przypadki biegną na prawdziwym serwerze, a który na podstawionym (`:467`–`:470`) (loop2#050-9).

### `task.md:83-85`

### Acceptance criteria

- Każdy test dodany z pozycji 11–19 został raz widziany z porażką na kodzie z usterką, którą ma łapać.

## What to return

The status as the report's first line (`PASS <sha>` / `FAIL <sha>` / `questions`), then graded findings (blocking and Minor, each marked inside or outside the task's scope), the checks you ran as command and exit code,
every reach beyond this handoff (what, where, why), and **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Name any changed invariant test. Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
