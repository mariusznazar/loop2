# Handoff - the foundation step (the plan's Foundation entries) of the task cycle `serwer-odczyty-i-straznik`

You write the four foundation entries the task carries, before any slice. The person who requested
this cycle delegated intermediate choices to the orchestrator; nothing you receive is that person's
approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`, base `f0814d77`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), with English commit messages in the style of `git log` of the repository. Do not push and do not run the product's gate.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your stage is **the foundation step**, which takes none of that skill's rows; read `.the-way/task-cycle/skill/foundation_step.md` whole and follow it. Write each decision through the project skill `the-way-record-decision` (its method is under `.the-way/elements/decisions/`); read its files when the step that names them comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish; read whole). The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - read only its section "Foundation entries" and the table "Entry written at the return step" (so you do not write what the return step writes).
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher); no operation that cannot be undone. No open design choice, no reserved choice.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/foundation-report.md`. Return the status, commits, a one-line check result, the report path, **Unread material** and **Searches not found or unclear** as your method gives; the report keeps, for each entry, one sentence of its meaning in English and one in Polish, marked `row <n>`.

## Your boundary

Write only rows 1 to 4 below, as edits of the decisions D-233, D-234 and D-356 in `foundations/decisions.md` (an edit in place: the entries hold only their current wording). Write nothing else: the other changes of D-356, D-10, D-228, D-355, D-09... and every environment fact and every invariant belong to later slices and to the return step. In particular do not write the sentence about the rhythm of GitHub's scheduled runs in D-356 (the return step does) and do not touch D-235 or D-360 (another task changes them later).

## The rows (copied word for word from the frozen task)

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Strażnik czyta log kopii i, gdy przez 26 godzin nie było udanego wysłania kopii, wysyła przez `pusher` wiadomość tego rodzaju najwyżej raz na dobę; przegląd przed otwarciem kont znika z D-233 (zmienia D-233 i D-356). | decision | *Questions to settle*: „Jak często strażnik przypomina o nocy bez kopii?”; F-4 przeglądu | próg braku kopii i jak często przypominać |
| 2 | Gdy na serwerze nie działa `flock`, strażnik dalej kończy się sukcesem z linią we własnym logu i nic nie wysyła — to przyjęta luka, wymieniona w D-356 obok harmonogramu, który nie ruszył (zmienia D-356). | decision | *Questions to settle*: „Co robi strażnik, gdy na serwerze nie działa `flock`?” | czy dodać strażnikowi wiadomość albo kod wyjścia przy awarii `flock` |
| 3 | Właściciel powtarza próbę odtworzenia kopii na swoim komputerze co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry (zmienia D-234). | decision | *Questions to settle*: „Jak próba odtworzenia kopii ma iść „na harmonogramie”?” | automat próby i gdzie trzymać jej klucze |
| 4 | Ścieżki instrukcji odtwarzania z listy „Not tried”, razem z `umask 077`, zostają nieprzećwiczone jako przyjęty koszt (zmienia D-234). | decision | *Questions to settle*: „Co z nieprzećwiczonymi ścieżkami instrukcji odtwarzania?” | czy zaplanować ćwiczenie tych ścieżek na serwerze |

## Their sources in the task (copied word for word from *Questions to settle*)

- Co robi strażnik, gdy na serwerze nie działa `flock`? (loop2#71-31)
  - Answer: zostaje jak jest (sukces i linia `skipped:` we własnym logu); D-356 wymienia ten przypadek wśród tych, w których nic nie przychodzi, a fakt środowiska zapisuje, że `flock` na serwerze działa.
  - Not chosen:
    - wiadomość nowego rodzaju „strażnik nie działa” — bez własnej blokady nie da się bezpiecznie ograniczać wiadomości, grozi mail co 5 minut; średni kod i testy
    - wyjście z błędem — harmonogram ma wyłączoną pocztę (`MAILTO=""`), więc nikt tego nie zobaczy; w skutku to samo co wybrana droga
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „1 a”
- Jak często strażnik przypomina o nocy bez kopii?
  - Answer: najwyżej raz na dobę dla tego rodzaju; kopia „brakuje”, gdy w logu kopii nie ma udanego wysłania z ostatnich 26 godzin.
  - Not chosen:
    - co 6 godzin, jak inne rodzaje — do 4 maili dziennie, dopóki problem trwa, i zjada limit 6 wiadomości na dobę, z którego korzystają awarie gry
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „2 a”; sama zmiana (strażnik czyta log kopii zamiast przeglądu przed otwarciem kont) — the author's private note on the foundation review of 2026-11-13, F-4, „Decyzja (2026-11-13): zmieniamy (a)”
- Jak próba odtworzenia kopii ma iść „na harmonogramie”? (pozycja raportu stanu, M25)
  - Answer: rytm ręczny — właściciel powtarza próbę na swoim komputerze co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry; przypomina powtarzalna linia w backlogu; D-234 zmienia „jedna próba” na ten rytm.
  - Not chosen:
    - automat na komputerze właściciela (Harmonogram zadań Windows) — klucz do Strychu, klucz kopii i hasło konta testowego stale na dysku (zmiana D-13), Docker musi być włączony o tej porze; średnio-duża praca agenta
    - jedna próba jak dziś — kopia, której nie da się odtworzyć, wyjdzie na jaw w dniu awarii
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „3 a”
- Co z nieprzećwiczonymi ścieżkami instrukcji odtwarzania? (loop2#75-9)
  - Answer: zostają nieprzećwiczone jako przyjęty koszt; lista „Not tried” wymienia także `umask 077`.
  - Not chosen:
    - sesja człowieka na serwerze, która ćwiczy drogę wstecz i drugą próbę — godzina i więcej oraz przerwa w działającej grze
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, „4 a”
- Kto robi odczyty spoza listy dozwolonych w skillu `loop2-deploy` (`docker compose version`, dzienny `logrotate`, lista obróconych plików logu)?

From *To do* of the task (word for word): "3. ... D-233 traci zdanie o przeglądzie przed otwarciem kont i mówi o tym sygnale; D-356, skill `loop2-deploy` (...) i testy strażnika znają nowy rodzaj." "4. D-356 wymienia wśród przypadków, w których nic nie przychodzi, serwer bez działającego `flock` (strażnik kończy się wtedy sukcesem z linią `skipped: flock could not take …` we własnym logu) ... Zachowanie strażnika się nie zmienia." "6. D-234: sprawdzone odtworzenie to próba na komputerze właściciela powtarzana co miesiąc i po każdej zmianie wersji schematu bazy albo wersji zapisu gry, nie jedna próba przed scaleniem."

## What to read (the orchestrator's selection)

- Decisions, each whole: D-233, D-234, D-356 (the entries you edit), and D-228, D-230, D-231, D-235, D-13, D-12, D-360 (the ones they relate to; read, never changed here). Search the rest of the foundation once for entries that state the same things (WAY-33), as the foundation step gives, in particular any other entry that repeats "reviewed before the public launch of accounts" or says the restore trial is one trial.
- The invariants `account-save-backup-failure-notice` and `failure-watcher-message`, whole; the facts `mikrus-pusher-mail`, `github-scheduled-workflow-disabling`, `github-schedule-shortest-interval`.
- The part map `foundations/part_map.md`. The files the later slices will change (`deploy/loop2-watch`, the skill `loop2-deploy` and its twin under `.agents/`) are not yours.
- Two facts of the code the row 1 sentence rests on: the watcher's present kinds are in `deploy/loop2-watch` (header and the table of kinds) and the backup script writes `end: sent <file>` at a successful end (`deploy/loop2-backup`); read them only to word the sentence truly; the code does not change in this step.
- D-356's *Verification* (complies / violates) and D-233's *Verification* must still be true after your edit; where a sentence of them names the five kinds or the review, bring it to the new meaning.

## Notes from the orchestrator

- The new message is of a new kind with a fixed subject and one fixed sentence like the others, with no player's data, no number and no tool's output (row 1 and *To do* 3); do not write the subject or sentence in the decision.
- Mind the language of an entry and the fields the decisions' template gives (the skill reads them). The invariant `account-save-backup`, which D-233's neighbours may name, is withdrawn later by the return step: do not touch invariants.
- A foundation check at the end: `python -B .the-way/elements/common/foundation_check.py` (it must exit 0 or report only what it reported on the base: `0 errors` on the base); report its command and exit code.
