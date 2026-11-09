# Handoff - review of Slice 6 (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You did not make this change. You alone grade and scope your findings: this handoff names no finding wrong, Minor or outside the scope.
You are read-only: change no file of the worktree, and leave no temporary edit of the product behind (a defect you put in to see a test fail is taken out again, and the report says so).
You never ask the human; a question to the orchestrator stands in your report.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Slice 6 of the plan, the range `23f7e43..a0ddb7d` (compute the diff yourself: `git diff 23f7e43..a0ddb7d`, `git log 23f7e43..a0ddb7d`; confirm that `git rev-parse HEAD` is `a0ddb7d`).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole (a slice review, not the whole-change variant); `fix.md` and `whole_change.md` do not apply.
- The executor's report is a set of claims to verify, not evidence: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-06-report.md`.
- The cycle's answers at start: trust boundary - **yes** (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where the slice touches them, check crafted input at that boundary.
  Irreversible operation: none (the cycle prepares and never performs one).
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-06-review.md`. Its first line is `PASS a0ddb7d` or `FAIL a0ddb7d` (or `questions`).

## Questions of risk the orchestrator asks, beside the full scope of the review

These are questions to compute or trace in time, not suspicions; the review covers the whole range regardless of them:

- For `npm run local:stop` take each combination of (game built | not built) x (one broken start directory | none) x (a real start running | none): which starts are told to stop, which failure lines are written, and what is the exit code? Compare each with the base `23f7e43`. Does a start that did not stop still give exit 1?
- On the base one broken directory gave two lines (`tellToStop` and `START_STILL_RUNNING`). After the change, which single line remains and does it still carry the cause (kind, code, place) and no path, token or address of the start?
- The change lists the start directories sorted by name: with which comparison (default string order, locale), and could a name that sorts differently on another platform change which start is told first or whether the planted directory still keeps stop from telling the others? Does the case of item 19 fail under the defect in a way independent of the file system's listing order, and could it pass for a reason other than the loop continuing after a failure?
- When the log-line writer is not built, what exactly does the script do with the failure of loading it (the plan: recorded once, as the rule for a script run by hand and D-253 give)? Is "Node's default print of an unhandled error" what that rule gives, or does it fall short?
- Does anything in the change touch the proxy, the access rules of the local start (`local-start-access`) or the TLS handling, which the slice does not intend?

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 6")

### Slice 6 — `npm run local:stop` tells every start and writes one line for one broken directory

- **Goal:** in `scripts/local-start.mjs` (To do 6, 7, 19): (6) `npm run local:stop` with no built
  game — `dist/server/log-line.js` absent, so `recordFailure` cannot load its writer — and one broken
  start directory still sends the stop to every other running start; the failure to load the writer
  is itself recorded once, as the rule "Recording a failure" and D-253 give a script run by hand, and
  stops nothing. (7) One broken start directory — one whose stop file cannot be written — leaves one
  failure line, not the line of `tellToStop` (today `:392`–`:395`) and a second
  `START_STILL_RUNNING` line (today `:406`–`:410`); the exit code stays 1 when a start did not stop.
  (19) The case "a planted directory keeps stop from telling no other start" of
  `tests/invariants/test_local_start_access.py` (today `:392`–`:407`, the name in `planted_name`
  sorted first by zeros) holds whatever order the system lists directory names in
  (`readdirSync` at `:282` does not sort); the slice may make the order fixed in the script or make
  the case independent of it. Tests for (6) and (7) are written first and seen failing on the base;
  the case of (19) is seen once failing on code with the defect it is to catch — the loop of `stop`
  stopping at its first failure, put in temporarily with the planted directory listed after the real
  start — the command and exit code in the report, and the defect taken out again.
- **Change:** `scripts/local-start.mjs` · `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:17-26` Need ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:40-41` To do, items 6 and 7 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:56-56` To do, item 19 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:83-85` Acceptance criteria ·
  `foundations/decisions.md:5120-5154` D-252 · `foundations/decisions.md:5156-5199` D-253 ·
  `foundations/decisions.md:5230-5259` D-255 · `foundations/decisions.md:5261-5282` D-256 ·
  `foundations/decisions.md:5306-5324` D-258 · `foundations/decisions.md:1570-1581` D-84 ·
  `foundations/invariants.md:1179-1188` local-start-access ·
  `foundations/part_map.md:84-116` build-tools ·
  `guidelines/coding.md` · `guidelines/testing.md` · `src/server/log-line.ts` ·
  `tests/invariants/loop2_invariant_support.py` · `.claude/skills/loop2-play/SKILL.md:1-60`
- **Model:** same — the orchestrator raised it from `cheaper`: three changes of what a process-level script writes to its failure log under D-252, D-253, D-255, D-256 and D-258, in a trust boundary, with a test that must be seen failing by a defect put in temporarily
- **Risk:** trust boundary — `scripts/local-start.mjs`
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`, also with the defect of
  (19) in place (failing), then without it (passing)
- **Depends on:** none

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

### `task.md:40-41`

6. `npm run local:stop` bez zbudowanej gry, przy jednym zepsutym katalogu startu, nadal wysyła polecenie zatrzymania pozostałym startom (loop2#050-4; `scripts/local-start.mjs:69`–`:77`, `:386`–`:397`).
7. Jeden zepsuty katalog lokalnego startu zostawia jeden wiersz awarii, nie dwa (loop2#050-6; `scripts/local-start.mjs:392`–`:395` i `:406`–`:410`).

### `task.md:56-56`

19. Test podrzuconego katalogu startu nie zależy od kolejności, w jakiej system zwraca nazwy katalogów (loop2#050-8; `tests/invariants/test_local_start_access.py:393`–`:399`; `scripts/local-start.mjs:282`).

### `task.md:83-85`

### Acceptance criteria

- Każdy test dodany z pozycji 11–19 został raz widziany z porażką na kodzie z usterką, którą ma łapać.

## What to return

The status as the report's first line (`PASS <sha>` / `FAIL <sha>` / `questions`), then graded findings (blocking and Minor, each marked inside or outside the task's scope), the checks you ran as command and exit code,
every reach beyond this handoff (what, where, why), and **Searches not found or unclear** (each thing you looked for and did not find, or that was unclear, or `none`).
Name any changed invariant test. Return to the orchestrator only: the first line of the report, a one-line check result naming what failed or did not run, and the report path.
