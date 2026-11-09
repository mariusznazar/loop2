# Handoff - Slice 6 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `23f7e43`. The head you start from: `23f7e43`. Your range runs from `23f7e43`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: same (sonnet).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 6 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-06-report.md`.

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

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
