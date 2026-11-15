---
title: "loop2: testy wskazują zdania decyzji — jednorazowe przejście po decyzjach o budowie i zachowaniu gry"
status: draft
created: 2026-11-13T23:50
updated: 2026-11-14
tags: [zadanie]
related: "the project's folder-note in the author's notes"
---

## Po co to

- **Jak jest dziś:** Testy gry powołują się na numery decyzji w komentarzach, ale sam numer nie mówi, czy test sprawdza zdanie decyzji, czy tylko o nim wspomina. W próbie 20 takich decyzji test trzymał całe zdanie w 10, część w 7, a w 3 numer był tylko wspomniany. Z szacunku: około 90 decyzji gry nie pilnuje nic, a około 55 tylko częściowo.
- **Kto to odczuwa:** Agent sprawdzający całą zmianę, który nie wie, którą część decyzji musi porównać sam, bo testu na nią nie ma; ja, gdy po cichu psuje się zachowanie, którego nikt nie pilnował.
- **Co jeśli nic:** Nie wiadomo, które zdania decyzji są bez straży; stary numer w komentarzu wygląda tak samo przy teście, który sprawdza, i przy takim, który tylko wspomina.

# loop2: testy wskazują zdania decyzji — jednorazowe przejście po decyzjach gry

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Testy gry powołują się na numery decyzji w komentarzach, ale sam numer nie mówi, czy test pilnuje zdania decyzji, czy tylko o nim wspomina: w próbie 20 cytowanych decyzji test trzymał całe zdanie w 10, część w 7, a w 3 numer był tylko wspomniany.
- Agent sprawdzający całą zmianę nie wie, którą część decyzji musi porównać ze zmianą sam, bo żaden test jej nie trzyma.
- The way od scalenia PR #120 daje na to znacznik: test, który pilnuje zdania decyzji, ma obok linię `decision: <numer> "<cytat początku zdania>"`, pole *Verification* nazywa takie testy klauzulą `tests:`, a para przykładów `complies:` / `violates:` zostaje tylko dla części zdania, której nie trzyma żaden test; gra jest dziś przypięta do wersji the way sprzed tej reguły.

### To do

1. Przypięta wersja the way w grze przesuwa się na commit `f4af75d85c7850696e5716d0c9678878559549d6` (scalenie PR #123 w the way, po PR #120), jako pierwszy commit gałęzi zadania (pytanie 4).
2. Przy każdej decyzji, która stoi w dzienniku gry na bazie gałęzi (pytanie 1), cykl ustala, które zdania wiążące trzyma test, które niezmiennik wyprowadzony z decyzji, a których nie trzyma nic, i zapisuje to tak, jak każe szablon decyzji przypiętej wersji the way (`.the-way/elements/decisions/template.md`, sekcja „Verification”):
   - test, który trzyma zdanie, dostaje linię `decision:` z numerem decyzji i cytatem początku tego zdania — także test, który dziś numeru decyzji nie cytuje; testów szuka się po treści zdania, nie tylko po numerze;
   - pole *Verification* nazywa te testy klauzulą `tests:`; niezmienniki po `invariants:` zostają bez zmian;
   - para `complies:` / `violates:` zostaje tylko dla części zdań, której nie trzyma ani test, ani niezmiennik, i mówi tylko o tej części; decyzja trzymana w całości traci parę, a decyzja, której nie trzyma nic i która pary nie ma, dostaje ją.
3. Każdą ocenę, czy test trzyma zdanie decyzji w całości, w części czy wcale, robi agent na najmocniejszym dostępnym modelu (pytanie 3).

### Acceptance criteria

- `python -B .the-way/elements/common/foundation_check.py` na końcu gałęzi nie zgłasza błędu i nie wypisuje żadnej decyzji jako „held by nothing”.
- Zdania wiążące, *Rationale* i *Rejected* każdej decyzji są takie jak na bazie gałęzi; w dzienniku zmienia się tylko pole *Verification*.

### Questions to settle

- 1. Które decyzje obejmuje przejście?
  - Answer: (b) — wszystkie wpisy, które zostają w dzienniku gry (ok. 396 po zadaniu „pierwsze porządki dziennika decyzji”), bez listy rodzajów z analizy.
  - Not chosen:
    - (a) tylko rodzaje K i R z tabeli analizy, ok. 296 wpisów (268 do D-373 i 28 z D-374–D-402, bez D-380) — cykl dostaje listę numerów z dokładnością ±10%, kilkanaście wpisów G i T, które test łatwo trzyma (np. napis D-301), zostaje bez linii, a lista „held by nothing” dalej wypisuje 11 z nich.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 b, 2 a, 3 a, 4 a” (odpowiedź na pytanie z drogami a, b i rekomendacją b; cena drogi b podana w pytaniu: ok. 100 ocen więcej, ok. +35% pracy agenta, a linie `decision:` wpisu G albo T, który później wyjdzie z dziennika, trzeba zdjąć — skrypt to wymusi).
- 2. Czy przejście idzie jednym cyklem i jedną prośbą o scalenie, czy partiami po częściach gry?
  - Answer: (a) — jeden cykl i jedna prośba o scalenie; pracę agentów dzieli plan cyklu.
  - Not chosen:
    - (b) trzy zadania po częściach gry (symulacja z mieszanymi symulacja/widok, sam widok, serwer z wdrożeniem i budowaniem) — trzy pełne cykle, każdy z przeglądem całości i pełnymi testami, w zamian za trzy mniejsze prośby i krótko żyjące gałęzie.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 b, 2 a, 3 a, 4 a” (odpowiedź na pytanie z drogami a, b i rekomendacją a; cena drogi a podana w pytaniu: ogromna prośba, przeglądana tylko na próbie, i długo żyjąca gałąź narażona na konflikty z innymi zmianami dziennika).
- 3. Kto ocenia, czy test trzyma zdanie decyzji?
  - Answer: (a) — każdą ocenę robi agent na najmocniejszym dostępnym modelu.
  - Not chosen:
    - (b) tańszy model ocenia, najmocniejszy sprawdza losową próbę (np. 30 ocen) i przy błędach ponad próg ocena idzie od nowa — próba 30 nie wykryje rzadkich błędów, a przy 8 chybionych na 12 zgłoszeń tańszy model najpewniej odpadnie na pierwszej próbie i praca zostanie opłacona dwa razy.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 b, 2 a, 3 a, 4 a” (odpowiedź na pytanie z drogami a, b i rekomendacją a; cena drogi a podana w pytaniu: najwięcej tokenów).
- 4. Jak przesunąć przypiętą wersję the way?
  - Answer: (a) — jako pierwszy commit gałęzi zadania, krokiem 2 cyklu, który przesuwa przypiętą wersję na commit nazwany w zadaniu (`.the-way/task-cycle/skill/SKILL.md`, krok 2).
  - Not chosen:
    - (b) osobna drobna prośba o scalenie przed cyklem, jak przy poprzednich przesunięciach (`chore/move-the-way-pin-…`) — jedna prośba więcej do scalenia.
  - Source: Mariusz (przez doradcę dnia), 2026-11-14, „1 b, 2 a, 3 a, 4 a” (odpowiedź na pytanie z drogami a, b i rekomendacją a).

## Context

- Analiza, z której zadanie wyszło: `the author's analysis of the decision log, outside the repository`, ustalenie 3 i karta D4.
- Wzór zapisu oceny z miejscami w testach: `…\odchudzenie_dziennika_decyzji_dane\proba_20_testow_oceny.tsv` (oceny „całe”, „część”, „wspomina”).
- Przykład testu, który trzyma zdanie bez cytowania numeru: D-176 („A mage starts every map run … with its nature energy at the cap”) sprawdza `tests/sim/body.test.mjs:331` (stan `e6a95a9b`), a żaden test D-176 nie cytuje.
- W analizie zgodności fundamentu z kodem tańszy model mylił się właśnie przy pytaniu, czy test jest węższy niż zdanie: 8 z 12 jego zgłoszeń było chybionych (raport `fundamenty_a_kod_loop2.md` w tym samym folderze analiz).
- Dziennik gry na `e6a95a9b` ma 402 wpisy; pole *Verification* ma parę przykładów w 242 z nich, a niezmienniki w 136 (`grep`, 2026-11-14).
- Skrypt kontroli fundamentu z commitu `f4af75d`, uruchomiony na grze w stanie `e6a95a9b`, nie zgłasza błędu i wypisuje 24 decyzje, których nie trzyma nic (2026-11-14): D-73, D-74, D-75, D-76, D-78, D-79, D-80, D-81, D-84, D-85, D-87, D-88, D-89, D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220. Starą taką decyzję skrypt tylko wypisuje; decyzję, którą zmiana dodaje albo której zdania wiążące zmienia, a której nie trzyma nic, zgłasza jako błąd (`elements/common/foundation_check.py`, docstring, punkt o „a decision that nothing holds”).
- Linia `decision:` liczy się tylko w pliku innym niż Markdown, który śledzi git; cytat zaczyna się na początku zdania wiążącego, ma co najmniej trzy słowa i nie zawiera `"` (szablon decyzji the way `f4af75d`, sekcja „Verification”).
- Opis prośby o scalenie wymienia każdą zmianę testu z linią `decision:` tak jak zmianę testu niezmiennika (`task-cycle/skill/request_template.md` the way `f4af75d`, linie 305 i 463).
- Zadanie czeka na zadanie „loop2: pierwsze porządki dziennika decyzji”: tamto usuwa słowa „currently”, „today” i „for now” ze zdań wiążących 23 wpisów i wycofuje D-80, D-254, D-357, D-358, D-359 i D-361, więc cytat w linii `decision:` wzięty przed nim przestałby stać we wpisie.
- Zadanie wydzielono jako punkt 4 zadania „loop2: pierwsze porządki dziennika decyzji” (`zadanie_loop2_pierwsze_porzadki_dziennika_decyzji.md`, pytanie 1); na nim czeka zadanie „loop2: dziennik decyzji gry podzielony na tematy”.

## Questions carried to cycle

- Czy wzmianka numeru decyzji w komentarzu przy teście, który dostaje linię `decision:`, zostaje obok tej linii, czy linia ją zastępuje.

## Human actions

none

## Decisions in play

- D-73 — „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.” — przesunięcie przypiętej wersji zmienia przyjęty wzór wytycznych testów tylko w jednym odsyłaczu (WAY-168 na WAY-173 w opisie pól przepisu poziomu).
- D-82 — „The expectation of a test comes from the loop2 foundation — its decisions, invariants and glossary — from a relation the code under test does not compute, or from a crash counted as a failure; a human's judgement is a source once a decision of the foundation holds it. What a test needs of the requirement it checks stands in the foundation, so no comment is required to name the source of a value, a test comment names as the source of an expectation no document outside the foundation — a task document and a copy of one kept in the record of a task cycle included — and a comment that carries nothing the code needs is not written.” — linia `decision:` jest komentarzem testu, który wskazuje wpis fundamentu.

## Settlements to record

Candidates: 5 shown, 0 accepted — 2026-11-14

none

## Out of scope

- Nowe testy dla części zdań, których nie trzyma żaden test — zostaje dla nich para przykładów.
- Nowe niezmienniki i zmiana istniejących.
- Przenumerowanie decyzji i zmiana ich zdań wiążących.
- Usuwanie wzmianek numerów decyzji z kodu i z testów, które linii `decision:` nie dostają.
