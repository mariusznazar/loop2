---
title: Wciąganie programów ze starych zapisów na uprawnienie i reset gry od zera do testów
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project's note"
---

# Wciąganie programów ze starych zapisów na uprawnienie i reset gry od zera do testów

Status: ready for cycle
Project relation: independent

## Description

### Need

- Mariusz po każdym podbiciu wersji zapisu zaczyna grę od nowa i pisze swoje programy drugi raz, bo gra odrzuca zapis innej wersji w całości, razem z programami (D-206).
- Dziś odrzucony zapis znika od razu: gra startuje nową grę i zapisuje ją natychmiast na miejsce starej (`src/browser/view/app.ts:414-419`), a serwer trzyma jeden zapis na konto (`src/server/database.ts:122-128`), więc programów nie ma już skąd wziąć.
- Wersja zapisu zmieniła się cztery razy w dwa tygodnie (2 → 2026-10-30, 3 → 2026-10-31, 4 → 2026-11-11, 5 → 2026-11-13; `git log -G "SAVED_GAME_VERSION = [0-9]" -- src/browser/sim/saved-game.ts`).
- Źródło („Kierunek” 4 w the scope note of the project): „Teraz jak w starym Loopie: domyślnie bez zgodności wstecz — Mariusz zaczyna od nowa i sprawdza, czy gra i jej elementy są czytelne — ale z uprawnieniem, które pozwala wciągnąć programy z wcześniejszych zapisów. Docelowo postęp przechodzi między wersjami, żeby nie cofać go innym graczom; do tego reset od zera dla Mariusza na potrzeby testów. Zmienia fundament loop2 D-206 (zapis innej wersji odrzucany w całości, z programami)”.

### To do

1. Serwer trzyma przy każdym koncie, z uprawnieniem czy bez, jeden poprzedni zapis gry: zapis, który zastąpił przyjęty zapis wyższej wersji albo reset (punkt 5), przechodzi na to miejsce i nadpisuje wcześniejszy poprzedni zapis; poprzedni zapis ma ten sam limit 64 KiB co zapis gry.
2. Konto ma uprawnienie, które człowiek nadaje i zdejmuje poleceniem uruchamianym w kontenerze `loop2`, tak jak blokadę konta (D-137); polecenie mówi, że nadało albo zdjęło uprawnienie, że konto już było w żądanym stanie albo że konta o tym adresie nie ma. Jedno uprawnienie obejmuje wciąganie programów (punkty 3–4) i reset (punkt 5).
3. Na koncie z uprawnieniem, gdy poprzedni zapis istnieje, ekran Programy ma przycisk „Wciągnij programy z poprzedniego zapisu”, dostępny w dowolnej chwili; na koncie bez uprawnienia albo bez poprzedniego zapisu przycisku nie ma.
4. Przycisk dopisuje na koniec listy programy z poprzedniego zapisu: program o nazwie zajętej na liście dostaje kolejny numer, np. „Las (2)”; programu, którego dzisiejsza gra nie przyjmuje (np. czynność albo przedmiot, których już nie ma), gra nie dopisuje i jednym zdaniem podaje nazwy pominiętych. Każdy program przechodzi to samo sprawdzenie co program z edytora; reszty poprzedniego zapisu gra nie czyta.
5. Na koncie z uprawnieniem gra ma przycisk „Zacznij od zera” z potwierdzeniem: po potwierdzeniu bieżący zapis przechodzi na miejsce poprzedniego zapisu, a gra startuje od nowa, więc programy da się potem wciągnąć punktem 3.
6. Skill wdrożenia `loop2-deploy` opisuje polecenie uprawnienia z punktu 2, tak jak opisuje polecenie blokady konta.

### Questions to settle

- 1. Skąd gra bierze programy z wcześniejszego zapisu, skoro dziś znika on przy pierwszym zapisie nowej gry?
  - Answer: serwer odkłada na każdym koncie jeden „poprzedni zapis” — ten, który zastąpił zapis wyższej wersji albo reset; kolejne odłożenie nadpisuje wcześniejszy; dla każdego konta, z uprawnieniem czy bez. Koszt: nowa tabela w bazie, do 64 KiB więcej na gracza; zmienia D-206.
  - Not chosen:
    - jak wyżej, ale tylko na kontach z uprawnieniem — konto, które dostanie uprawnienie później, nie ma z czego wciągać
    - serwer niczego nie przechowuje, gra proponuje wciągnięcie tylko w chwili odrzucenia — jedna okazja; nie da się najpierw zagrać od zera, ocenić czytelności i dopiero wtedy wciągnąć programów
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „1a”
- 2. Czym jest uprawnienie i kto je nadaje?
  - Answer: znacznik na koncie, nadawany i zdejmowany poleceniem człowieka na serwerze, jak blokada konta (D-137); jeden znacznik obejmuje wciąganie programów i reset. Koszt: kolumna w bazie, polecenie, opis w skillu wdrożenia.
  - Not chosen:
    - lista adresów e-mail w konfiguracji serwera — zmiana listy wymaga restartu kontenera
    - bez uprawnienia, wciągać może każdy — przeczy „domyślnie bez zgodności wstecz” ze źródła
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „2a”
- 3. Kiedy i gdzie gracz z uprawnieniem wciąga programy?
  - Answer: przycisk „Wciągnij programy z poprzedniego zapisu” na ekranie Programy, widoczny tylko na koncie z uprawnieniem i tylko gdy poprzedni zapis istnieje; działa w dowolnej chwili.
  - Not chosen:
    - przycisk tylko pod komunikatem „Zapis pochodził z innej wersji gry…” — jedna okazja, w chwili wczytania
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „3a”
- 4. Co dzieje się z wciągniętymi programami: dopisane czy zamiast listy, i co z programem, którego dzisiejsza gra nie przyjmuje?
  - Answer: dopisane na koniec listy, program o zajętej nazwie dostaje kolejny numer („Las (2)”); program, którego dzisiejsza gra nie przyjmuje, pominięty, a gra podaje jednym zdaniem nazwy pominiętych. Koszt: ponowne wciągnięcie dopisuje kopie.
  - Not chosen:
    - zastępują całą listę — przepadają programy napisane po starcie od zera
    - jak wybrane, ale jeden nieprzyjęty program przerywa całe wciąganie — jeden stary program blokuje resztę
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „4a”
- 5. Jak wygląda reset gry od zera do testów?
  - Answer: przycisk „Zacznij od zera” w grze z potwierdzeniem, tylko na koncie z uprawnieniem; bieżący zapis staje się poprzednim zapisem, więc programy da się potem wciągnąć. Koszt: nowe zapytanie do serwera zmieniające dane i przycisk z potwierdzeniem.
  - Not chosen:
    - polecenie człowieka na serwerze, jak blokada — każdy reset to SSH i `docker exec`
    - odłożyć do zadania z migracjami — dziś reset przychodzi z każdym podbiciem wersji, a nowe konto nie ma z czego wciągać programów
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „5a”
- 6. Jedno zadanie czy dwa (wciąganie programów osobno od resetu)?
  - Answer: jedno zadanie z estymatą 5.
  - Not chosen:
    - dwa zadania — dodatkowy pełny cykl, a reset i tak korzysta z poprzedniego zapisu i uprawnienia
  - Source: Mariusz przez doradcę dnia, 2026-11-13, „6a”

## Context

- Źródło nie jest zatwierdzoną definicją projektu (`status: draft`), więc zadanie jest niezależne, a cytat z „Kierunek” 4 służy jako uzasadnienie potrzeby.
- Część „docelowo postęp przechodzi między wersjami” (migracje zapisu gry) należy do osobnej sprawy: według źródła migracje „wchodzą najpóźniej przed pierwszym obcym graczem” (the architecture note of the project, karta D19).
- Programy sprawdza dziś funkcja `checkProgram` (`src/browser/sim/programs.ts:238`) — ta sama, która przyjmuje program z edytora; wczytanie zapisu jest ścisłe (D-213).
- Wzór polecenia operatora w kontenerze: blokada konta (`src/server/account-block.ts`, D-137).
- Programów z zapisów zastąpionych przed wdrożeniem tego zadania gra nie odzyska: tamte zapisy są już nadpisane na serwerze.
- Miejsce przycisku „Zacznij od zera” na ekranie wybiera cykl według wytycznych wyglądu widoku.

## Questions carried to cycle

none

## Human actions

- Nadać uprawnienie kontu Mariusza na serwerze testowym poleceniem z punktu 2, po wdrożeniu zmiany — in the cycle

## Decisions in play

- **D-206** — „A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version in full, including the player's programs, and starts the player anew. A saved game state whose character names an archetype missing from the data is also discarded whole.”
  - Zmiana, którą robi zadanie (odpowiedzi 1, 3 i 4): zapis innej wersji dalej nie wczytuje się jako gra i gracz zaczyna od nowa, ale serwer odkłada go jako poprzedni zapis, a konto z uprawnieniem wciąga z niego programy przyciskiem; skreślone zostaje „including the player's programs” w sensie „programy przepadają”. Razem z decyzją zmienia się wyprowadzony z niej niezmiennik `save-version` („The game loads no data from a saved game state whose version differs from the game's current version of the saved game state's shape.”) o wyjątek programów wciąganych na żądanie przez konto z uprawnieniem.
- **D-104** — „…while the server stores at most 64 KiB of each player's saved game state.”
  - Zmiana (odpowiedź 1): ten sam limit obejmuje poprzedni zapis; serwer trzyma na gracza do dwóch takich dokumentów.
- **D-210** — „The server refuses a save of the game state whose version of the shape is lower than the version of the saved game state it holds, comparing that number before the basis of D-209 and reading nothing of the game.”
  - Zadanie dokłada (odpowiedź 1): przyjęcie zapisu wyższej wersji odkłada dotychczasowy jako poprzedni zapis; serwer dalej porównuje tylko numer wersji.
- **D-07** — „The server holds the players' accounts and each player's saved game state, and computes nothing of the game.” Bez zmiany: serwer przechowuje i przenosi dokumenty, nie czyta programów; programy z poprzedniego zapisu sprawdza przeglądarka.
- **D-137** — „The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses. … The `loop2-deploy` skill describes the command, and only a human runs it on the server.” Bez zmiany; polecenie uprawnienia (punkt 2) idzie tym wzorem.
- **D-213** — „Saved-game code turns a game state into the saved document of the current version of its shape, and an unknown value … into a game state or a refusal naming why, inside the simulation, no value a document can hold making it throw, and changing nothing passed to it.” Bez zmiany: wczytanie zapisu zostaje ścisłe; wciąganie czyta z poprzedniego zapisu tylko programy, każdy sprawdzany jak program z edytora.
- **D-96** — „…a saved game state that the game discards — of another version, naming an archetype missing from the data or of a shape the game does not admit — starts a new game, above which stands once, in `warning`, „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” for the first two…” Bez zmiany.
- **D-209** — „The server gives each save of the game state it accepts a revision one higher than the one before, starting at 1, and accepts a save only when it names as its basis the revision of the saved game state the server holds, or 0 where the account has none, refusing every other.” Bez zmiany; po resecie konto nie ma zapisu, więc karta otwarta przed resetem dostaje odmowę jak dziś.

## Settlements to record

Candidates: 6 shown, 5 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Serwer odkłada na każdym koncie jeden poprzedni zapis — ten, który zastąpił zapis wyższej wersji albo reset — a kolejne odłożenie nadpisuje wcześniejszy; dotyczy każdego konta, z uprawnieniem czy bez. | decision | *Questions to settle* 1 (wybór Mariusza) | ile zapisów i dla których kont trzyma serwer oraz kiedy je odkłada |
| 2 | Uprawnienie to znacznik na koncie, nadawany i zdejmowany poleceniem człowieka w kontenerze jak blokada konta, i jeden znacznik obejmuje wciąganie programów i reset. | decision | *Questions to settle* 2 (wybór Mariusza) | czym jest uprawnienie, kto je nadaje i czy wciąganie i reset mają osobne uprawnienia |
| 3 | Konto z uprawnieniem wciąga programy przyciskiem „Wciągnij programy z poprzedniego zapisu” na ekranie Programy w dowolnej chwili, gdy poprzedni zapis istnieje. | decision | *Questions to settle* 3 (wybór Mariusza) | czy wciąganie jest jednorazowe przy wczytaniu, czy stałe, i gdzie stoi |
| 4 | Wciągnięte programy dopisują się na koniec listy z kolejnym numerem przy zajętej nazwie, a program, którego dzisiejsza gra nie przyjmuje, jest pomijany i gra podaje nazwy pominiętych. | decision | *Questions to settle* 4 (wybór Mariusza) | czy programy zastępują listę i czy jeden zły program przerywa wciąganie |
| 5 | Konto z uprawnieniem resetuje grę od zera przyciskiem „Zacznij od zera” z potwierdzeniem, a bieżący zapis przechodzi na miejsce poprzedniego zapisu. | decision | *Questions to settle* 5 (wybór Mariusza) | czy reset jest w grze czy na serwerze i czy zachowuje programy do wciągnięcia |
## Out of scope

- Migracje zapisu gry, czyli przenoszenie całego postępu między wersjami.
