---
title: "loop2: hook Claude Code w repo ostrzega na starcie sesji, gdy the way stoi na innym commicie niż przypięty"
status: draft
created: 2026-11-14T18:10
updated: 2026-11-14
tags: [zadanie]
related: "the project note of the Loop project"
---

# loop2: hook Claude Code w repo ostrzega na starcie sesji, gdy the way stoi na innym commicie niż przypięty

Status: ready for cycle
Project relation: independent

## Description

### Need

- `AGENTS.md` loop2, sekcja „Pinned the-way process”, każe przed użyciem the way sprawdzić, że `git -C .the-way rev-parse HEAD` pokazuje commit zapisany przez `git ls-files --stage -- .the-way`, a przy rozjeździe albo nieudanej inicjalizacji przerwać pracę; pilnuje tego dziś tylko to, czy agent o tym pamięta.
- W repo nie ma żadnego hooka Claude Code: nie ma pliku `.claude/settings.json`, ani śledzonego, ani nieśledzonego (sprawdzone 2026-11-14; `.claude/` zawiera `skills/` i `worktrees/`).
- Odczuwa to agent pracujący w loop2 po zmianie gałęzi albo pobraniu zmian, gdy kopia the way została na innym commicie: pracuje na niewłaściwej wersji procesu bez żadnego sygnału.
- Projekt zaliczeniowy kursu AI Tech Leaders wymaga w repo „jeden hook, który pilnuje wybranej zasady” (wymaganie 6); zgłoszenie Mariusz wysyła 28.11.2026.

### To do

1. Repo ma plik `.claude/settings.json` z hookiem uruchamianym na starcie sesji Claude Code (`SessionStart`).
2. Hook porównuje commit, na którym stoi submoduł `.the-way`, z commitem, który zapisuje dla niego repo; przy rozjeździe albo niezainicjowanym submodule ostrzega, podając obie wartości i polecenie naprawy z `AGENTS.md` (`git submodule update --init -- .the-way`); gdy commity się zgadzają, nie wypisuje nic.
3. Ostrzeżenie dostaje agent, do kontekstu sesji, i człowiek, jako komunikat widoczny na ekranie (pytanie 2).
4. Hook niczego nie blokuje: sesja startuje i działa tak samo, z ostrzeżeniem czy bez.
5. Hook działa na Windowsie, Linuksie i macOS (pytanie 1).
6. `AGENTS.md` dostaje jedno zdanie poza blokiem `<!-- the-way:begin -->` … `<!-- the-way:end -->`: sesje Claude Code dostają na starcie ostrzeżenie, gdy `.the-way` stoi na innym commicie niż przypięty, a zasada przerwania pracy przy rozjeździe obowiązuje dalej (pytanie 4).

### Acceptance criteria

- Zmiana scalona przed 28.11.2026.

### Questions to settle

- Pytanie 1. Na jakich systemach hook ma działać?
  - Answer: Na Windowsie, Linuksie i macOS.
  - Not chosen:
    - Tylko Windows — skrypt może być w czymkolwiek, ale sprawdzający kursu, którzy klonują publiczne repo na Linuksie albo Macu, przy każdym starcie sesji zobaczą błąd hooka zamiast ostrzeżenia, a hook to jeden z ocenianych elementów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a” (rekomendacja: a).
- Pytanie 2. Kto widzi ostrzeżenie?
  - Answer: Agent i człowiek: agent dostaje ostrzeżenie do kontekstu, człowiek krótki komunikat na ekranie, bo hook niczego nie blokuje, a o przerwaniu pracy decyduje człowiek.
  - Not chosen:
    - Tylko agent — człowiek dowie się o rozjeździe tylko wtedy, gdy agent o nim napisze, czyli znów zależnie od pamięci agenta.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „2 a” (rekomendacja: a).
- Pytanie 3. Czy ostrzeżenie ma działać też w sesjach Codexa?
  - Answer: Nie; tylko Claude Code. Spełnia wymaganie kursu i mieści się w terminie; sesje Codexa zostają przy pamięci agenta.
  - Not chosen:
    - Też Codex — wymaga najpierw sprawdzenia, czy Codex ma hook uruchamiany na starcie sesji; bez niego wariant odpada albo zadanie rośnie o inny mechanizm.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „3 a” (rekomendacja: a).
- Pytanie 4. Czy `AGENTS.md` mówi o hooku?
  - Answer: Tak, jednym zdaniem poza blokiem the way, żeby agent i sprawdzający widzieli, że hook istnieje i czego pilnuje, a aktualizacja bloku przez the way zdania nie skasowała.
  - Not chosen:
    - Nie — nic się nie psuje, ale o istnieniu hooka dowie się tylko ten, kto zajrzy do `.claude/settings.json`.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a” (rekomendacja: a).
- Pytanie 5. Czy hook ostrzega, czy blokuje?
  - Answer: Tylko ostrzega; niczego nie blokuje.
  - Not chosen:
    - Blokada wywołań skilli `the-way-*`, gdy kopia the way stoi na innym commicie — mocniej pilnuje zasady, ale Mariusz woli ostrzeżenie, bo rozjazd nie zawsze jest problemem.
    - Hook blokujący commit i push na `main` (push na `main` wdraża grę na serwer) — ochrona gałęzi na GitHubie robi to lepiej; Mariusz włącza ją sam w ustawieniach repo.
  - Source: Mariusz, 2026-11-14, sesja, w której zadanie powstało: „zostałbym na razie przy ostrzeżeniu jednak, nie zawsze to będzie problem”.

## Context

- Zasada, której hook pilnuje, stoi w `AGENTS.md` między znacznikami `<!-- the-way:begin -->` i `<!-- the-way:end -->`, czyli w bloku, który wstawia instalacja the way.
- W worktree, w którym submoduł nie jest zainicjowany, katalog `.the-way` jest pusty, a `git -C .the-way rev-parse HEAD` znajduje wtedy repo loop2 i zwraca jego własny commit, nie błąd.
- Hooki z `.claude/settings.json` w repo działają obok hooków Mariusza z jego globalnych ustawień; tamte nie dotyczą tego zadania.
- Plik hooka należy do części `agent-workflow` (`foundations/part_map.md`: `.claude/**`), a jej testy do `tests/agent_workflow/`; wytyczne `guidelines/coding.md` i `guidelines/testing.md` obejmują tę część.

## Questions carried to cycle

- Czym napisać skrypt hooka. Notatka, z której zadanie powstało, zauważa: Bash działa na Windowsie tylko z Git Bashem, PowerShell tylko na Windowsie, a Node repo i tak wymaga (`package.json`, `engines.node` `^24.15.0`) i działa wszędzie. Wybór języka nie jest zastrzeżony dla człowieka (`.the-way/project-level/technology/reserved_choices.md`: nic nie dodaje do uruchamiania ani opłacania, jedno zadanie może go zmienić samo), więc rozstrzyga go cykl.

## Human actions

none

## Decisions in play

- D-252 — How does loop2 write its failures to its logs, and what does it log? Fragment wiążący, który dotyczy ostrzeżenia hooka: „what a command prints to whoever ran it — the readiness line of the server, the sentence of `account-database-check` in the log of an image build, the report of `measure-passwords` for the script that ran it — is no log line”.
- D-362 — How does loop2 point to places outside the repository that its readers cannot reach? Fragment wiążący: „no file git tracks holds an absolute path on that disk”. Dotyczy `.claude/settings.json` i skryptu hooka: ścieżki do repo nie mogą być bezwzględne.

## Settlements to record

Candidates: 2 shown, 1 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Na starcie sesji Claude Code hook z repo loop2 ostrzega agenta i człowieka, gdy submoduł `.the-way` stoi na innym commicie niż zapisany w repo albo nie jest zainicjowany; działa na Windowsie, Linuksie i macOS, niczego nie blokuje i nie obejmuje sesji Codexa. | decision | Pytania 1, 2, 3 i 5 (wybór człowieka między pokazanymi drogami; *Not chosen* tam) | czy hook ma blokować, komu pokazywać ostrzeżenie, czy wolno mu działać tylko na jednym systemie i czy dokładać mechanizm dla Codexa |

## Out of scope

none
