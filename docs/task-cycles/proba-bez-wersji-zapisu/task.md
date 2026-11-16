---
title: "loop2: próbę odtworzenia kopii bazy powtarzać co miesiąc i po zmianie schematu bazy, bez warunku zmiany wersji zapisu gry"
status: draft
created: 2026-11-14T21:00
updated: 2026-11-14
tags: [zadanie]
related: "the project's note"
---

# loop2: próbę odtworzenia kopii bazy powtarzać co miesiąc i po zmianie schematu bazy, bez warunku zmiany wersji zapisu gry

Status: ready for cycle
Project relation: independent

## Description

### Need

- Reguła projektu (decyzja D-234) i instrukcja próby każą właścicielowi powtarzać próbę odtworzenia kopii bazy na jego komputerze co miesiąc, po zmianie wersji schematu bazy i po każdej zmianie wersji zapisu gry.
- Próba wersji zapisu nie sprawdza: szuka w zapisie konta testowego tylko nadanej w grze nazwy (znacznika) jako tekstu, więc po zmianie wersji zapisu daje ten sam wynik co przed nią.
- Mariusz to odczuwa: wersja zapisu zmienia się często (14.11 dwa razy), a każda zmiana formalnie wymaga godzinnej sesji próby.
- Agent przeglądający zmianę też: reguła wymienia brak takiej próby jako jej złamanie.
- Jeśli nic nie zrobimy: albo próby, które nic nowego nie sprawdzają, albo reguła, której nikt nie przestrzega i która w końcu zostanie zgłoszona jako złamana.

### To do

1. W D-234 („What does a checked restore of the database mean?”) usunąć zmianę wersji zapisu gry z warunku powtórzenia próby, w trzech miejscach: w zdaniu decyzji („which the owner repeats every month and after each change of the database's schema version or of the saved game's version”), w linii „violates” *Verification* („a change of the database's schema version or of the saved game's version taken as covered by a trial made before it”) i w *Rationale* („at the moments when what the backups hold changes its shape: a change of the database's schema version or of the saved game's version”); zostaje: co miesiąc i po każdej zmianie wersji schematu bazy, a do *Rejected* trafiają drogi z *Not chosen* pytania niżej.
2. W instrukcji próby, w obu kopiach naraz (`.claude/skills/loop2-deploy/references/backup_and_restore.md` i `.agents/skills/loop2-deploy/references/backup_and_restore.md`), sekcja „Trying a backup on the owner's computer”, usunąć zmianę wersji zapisu gry ze zdania „The owner repeats it every month and after each change of the database's schema version or of the saved game's version; a trial made before such a change does not cover it.”
3. W tej samej instrukcji, w obu kopiach, dodać wskazówkę przygotowania próby, nie warunek jej powtórzenia: zmiana wersji zapisu gry (`SAVED_GAME_VERSION`) kasuje znacznik w zapisie konta testowego, gdy gra wyrzuci ten zapis i zacznie nową grę (D-96), więc przed następną próbą właściciel nadaje nowy znacznik, tak jak w kroku 8 sekcji „Installing and reinstalling”, i go zapisuje.

### Acceptance criteria

- Akapit „Not proven by this trial: … and the version of the saved game” w sekcji „Trying a backup on the owner's computer” oraz akapit o wersji zapisu w sekcji „Restoring” („The schema version of the database is not the only version a backup carries. …”) zostają bez zmian — opisują, czego próba nie sprawdza, i są prawdziwe.

### Questions to settle

- Czy próbę odtworzenia kopii trzeba powtarzać po każdej zmianie wersji zapisu gry?
  - Answer: Nie. Próbę powtarza się co miesiąc i po każdej zmianie wersji schematu bazy. Skrypt próby wersji zapisu nie czyta, więc po jej zmianie daje ten sam wynik co przed nią. Gra wyrzuca zapis o innej wersji niż `SAVED_GAME_VERSION` wdrożonego kodu i zaczyna nową grę (D-96), więc utrata zapisów przy zmianie ich wersji dzieje się już przy wdrożeniu, a odtworzenie kopii sprzed zmiany nie dokłada nowej straty. Jedyny realny skutek zmiany wersji zapisu dla próby — skasowany znacznik w zapisie konta testowego — zostaje w instrukcji jako wskazówka przygotowania, nie jako warunek powtórzenia.
  - Not chosen:
    - zostawić warunek, jak jest — albo próby, które nic nowego nie sprawdzają (godzinna sesja przy każdej zmianie wersji zapisu, 14.11 dwie), albo reguła, której nikt nie przestrzega i która w końcu zostanie zgłoszona jako złamana
    - nauczyć skrypt próby sprawdzać wersję zapisu z kopii, żeby warunek miał sens — po każdej zmianie wersji stwierdzałby tylko to, co i tak wiadomo: zapisy z kopii sprzed zmiany przepadną przy pierwszym wczytaniu
  - Source: Mariusz, 2026-11-14, ustalenie w sesji `3fc1c497-35e8-4540-8185-0795d2d4e9fa`, spisane przy odkładaniu zadania w sekcjach „Dlaczego (ustalone z Mariuszem 14.11)” i „Rozważone i odrzucone” tej notatki; stan kodu: `scripts/restore-trial.mjs:307` (`result.markerFound = holds(body.save.game, spec.marker)`) i `src/browser/sim/saved-game.ts:1403` (`if (version !== SAVED_GAME_VERSION) return { ok: false, reason: "version" };`), rewizja `be597c41`

## Context

- Wersja schematu bazy to liczba kroków `schemaSteps` w `src/server/database.ts:95`, zapisywana w bazie jako `PRAGMA user_version`; wersja zapisu gry to `SAVED_GAME_VERSION` w `src/browser/sim/saved-game.ts:82` (rewizja `be597c41`).
- Skrypt próby `scripts/restore-trial.mjs` sprawdza, że kopia się odszyfrowuje, baza otwiera się w obrazie zbudowanym z tego samego commita, konto testowe się loguje, a w jego zapisie stoi znacznik.
- Linia „complies” w *Verification* D-234 mówi już tylko o schemacie bazy i nie wymaga zmiany.
- Test `tests/agent_workflow/test_loop2_deploy_skill.py` (`test_both_copies_are_byte_identical`) wymaga, żeby obie kopie instrukcji były identyczne bajt w bajt.
- Przeszukanie repozytorium (`git grep` po „saved game's version” i „every month”, rewizja `be597c41`) znajduje ten warunek tylko w D-234 i w obu kopiach instrukcji.
- Znacznik nadaje się w kroku 8 sekcji „Installing and reinstalling” tej samej instrukcji; dziś instrukcja nie mówi, że zmiana wersji zapisu go kasuje.
- Pełny zapis sesji, w której zadanie powstało (plik lokalny poza repo, wygasa ~2027-02-12): `a local file outside the repository that holds the transcript of that session`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-234 — What does a checked restore of the database mean?** Obecne brzmienie (fragmenty, które zadanie zmienia):
  - „A checked restore is a trial on the owner's computer, which the owner repeats every month and after each change of the database's schema version or of the saved game's version: a backup fetched from its destination and decrypted, the same commit run on it, a login with a test account, the saved game state seen back, and the backup removed from the computer.”
  - *Verification* — „violates: a backup taken as checked because its file opens; an agent that fetches, decrypts or opens a backup; a change of the database's schema version or of the saved game's version taken as covered by a trial made before it”
  - *Rationale* — „A backup that cannot be restored would otherwise show only on the day of the failure, so the trial is repeated by hand, every month and at the moments when what the backups hold changes its shape: a change of the database's schema version or of the saved game's version.”
  - Zmiana, którą zadanie wprowadza: z warunku powtórzenia próby znika zmiana wersji zapisu gry — próbę powtarza się co miesiąc i po każdej zmianie wersji schematu bazy; drogi niewybrane z pytania wyżej trafiają do *Rejected*.
- **D-96 — What does a player see before and after signing in?** Zadanie jej nie zmienia, opiera się na niej: „a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game”.

## Settlements to record

Candidates: 3 shown, 1 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Próbę odtworzenia kopii bazy powtarzać co miesiąc i po zmianie schematu bazy, bez warunku zmiany wersji zapisu gry — zmienia D-234. | decision | odpowiedź Mariusza na pytanie „Czy próbę odtworzenia kopii trzeba powtarzać po każdej zmianie wersji zapisu gry?” pod *Questions to settle*, której *Not chosen* trzyma drogi niewybrane | czy zostawić w D-234 warunek wersji zapisu, czy dopisać do skryptu próby sprawdzanie wersji zapisu, żeby warunek miał sens, i co wpisać do *Rejected* |

## Out of scope

- Zachowanie skryptu próby (`scripts/restore-trial.mjs`) i gry — zadanie zmienia tylko tekst decyzji i instrukcji.
