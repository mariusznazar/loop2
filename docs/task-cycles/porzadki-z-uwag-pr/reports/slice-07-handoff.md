# Handoff - Slice 7 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `a0ddb7d`. The head you start from: `a0ddb7d`. Your range runs from `a0ddb7d`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: same (sonnet).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 7 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-07-report.md`.

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

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
