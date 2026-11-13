---
title: Niższe progi drzew walki i stopnie gałęzi walki dopasowane do punktów
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project's note in the author's notes"
---

# Niższe progi drzew walki i stopnie gałęzi walki dopasowane do punktów

Status: ready for cycle
Project relation: independent

## Description

### Need

- Rozwiązanie Lasu — głębiej daje średnio 8,2 udanego ciosu patykiem, 0,05 kopnięcia i 0 uników, a pierwsze progi drzew walki to 30 ciosów, 20 kopnięć i 10 uników, więc sześć punktów drzew walki leży dziś poza zasięgiem gracza (`symulator_balansu_loop2.md`, ustalenie 2.6; D-379).
- Dalszą wprawę walki daje dziś tylko pętla na Lesie — głębiej, która opróżnia skrzynkę i gubi dorobek postaci (`symulator_balansu_loop2.md`, ustalenie 2.6, punkt 4).
- Mariusz chce, żeby punkty walki dało się zdobyć już na pierwszych mapach z walką, a progi skorygować w którąkolwiek stronę przy wyważaniu po większej liczbie map (`zakres_projektu_2_loop2.md`, punkt 10, „Wprawa walki”).

### To do

1. „Walka bronią jednoręczną” daje poziom i punkt przy 15, 40, 100 i 300 wprawy, w miejsce dzisiejszych 30, 90 i 200.
2. „Mocniejszy cios” ma cztery stopnie, każdy za 1 punkt i +2 obrażeń ciosu patykiem, więc wykupiony w pełni daje cios za 14 obrażeń, w miejsce dzisiejszych trzech stopni i 12 obrażeń.
3. „Kopanie” daje poziom i punkt przy 10 i 30 wprawy, w miejsce dzisiejszego jednego progu 20.
4. „Cięższy kop” ma dwa stopnie, każdy za 1 punkt i +1 obrażeń kopnięcia, w miejsce dzisiejszych trzech.
5. „Unik przed ciosem” daje poziom i punkt przy 4 i 15 wprawy, w miejsce dzisiejszych 10 i 30.

### Questions to settle

- Skąd ma się brać wprawa walki, skoro rozwiązanie Lasu — głębiej daje około 8 ciosów, a pierwszy próg walki to 30?
  - Answer: progi drzew walki schodzą niżej już teraz; gdy wyjdą za hojne, koryguje się je później, tak samo jak korygowałoby się je w drugą stronę.
  - Not chosen:
    - progi bez zmian, pilnowane liczbą ciosów, kopnięć i uników w pomiarze każdej nowej mapy — drzewa walki prawie martwe przez pierwsze tygodnie
  - Source: Mariusz, 2026-11-13: „zrobiłbym b, jak będzie zbyt hojnie, to się skoryguje później tak samo jak by sie później robiło w drugą stronę”
- Jakie progi dostają trzy drzewa walki?
  - Answer: „Walka bronią jednoręczną” 15, 40, 100, 300; „Kopanie” 10, 30; „Unik przed ciosem” 4, 15.
  - Not chosen:
    - progi mniej więcej cztery razy niższe od dzisiejszych: 6, 20, 50; 5; 3, 8 — Mariusz: „toś dowalił”
  - Source: Mariusz, 2026-11-13: „wbj - 15 - 40 - 100 - 300 / kop - 10 - 30 / unik- 4 - 15”
- Na co idzie czwarty punkt „Walki bronią jednoręczną”, skoro „Mocniejszy cios” ma dziś trzy stopnie?
  - Answer: na czwarty stopień „Mocniejszego ciosu”, za 1 punkt i +2 obrażeń, jak trzy pierwsze.
  - Not chosen:
    - czwarty próg jako zapas pod przyszłą gałąź — gracz widzi wolny punkt, którego nie ma na co wydać
    - czwarty próg wypada — drzewo zostaje przy trzech punktach na trzy stopnie
  - Source: Mariusz, 2026-11-13: „4 punkt idzie na 4 poziom w gałęzi - no to powinna być prosta struktura w danych tak, żeby jedną umiejętnosć dało się łatwo wyskalować dokładając wiersze w tabelce po prostu”; cena 1 i +2 obrażeń w punkcie 10 zakresu, przyjętym przez Mariusza 2026-11-13 („tak”)
- Co z „Cięższym kopem”, skoro „Kopanie” z progami 10 i 30 daje dwa punkty, a gałąź ma trzy stopnie?
  - Answer: „Cięższy kop” ma dwa stopnie.
  - Not chosen:
    - dwa punkty na trzy stopnie — gałęzi nie da się wykupić do końca
    - trzeci próg „Kopania” — kolejna liczba do ustalenia
  - Source: Mariusz, 2026-11-13: „c”

## Context

- Rozmowa, z której wyszło zadanie, rozstrzygała, co płaci pętla zarobkowa i skąd bierze się wprawa walki; jej ustalenia stoją w `zakres_projektu_2_loop2.md`, punkt 10, w notatkach Mariusza poza repozytorium.
- Progi drzew stoją w `src/browser/sim/data/skills.ts:38-48`, gałęzie walki w `:157-180`, a test, który oczekuje dzisiejszych progów, w `tests/sim/skills.test.mjs:113-115`.
- Gałąź ma jeden efekt na stopień (`effect.amount` razy liczba stopni), a liczbę stopni wyznacza długość listy `costs`, więc czwarty stopień „Mocniejszego ciosu” to jedna cena więcej w danych.
- Ekran Postać pokazuje stopień i najwyższy stopień gałęzi z danych (D-199).
- Pomiar, na którym stoi potrzeba: `symulator_balansu_loop2.md`, ustalenie 2.6, w notatkach Mariusza poza repozytorium.
- Odczyt zapisu gry odrzuca stopień gałęzi wyższy niż liczba jej cen (`src/browser/sim/saved-game.ts:411`), ale dziś „Kopanie” ma jeden próg i daje najwyżej jeden punkt, więc żaden zapis nie ma „Cięższego kopu” powyżej pierwszego stopnia, a dwa stopnie po zmianie go mieszczą.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-379 — „The eight character skills give a level and a point at each of these amounts of practice: „Zbieranie małych przedmiotów” at 30, 80, 160, 280 and 450; „Wytwarzanie ogniska” at 20, 55, 110 and 190; „Rzucanie czaru Płomyk” at 2, 6 and 14; „Eksploracja” at 15, 45, 100 and 200; „Walka bronią jednoręczną” at 30, 90 and 200; „Kopanie” at 20; „Unik przed ciosem” at 10 and 30; „Jedzenie” at 15, 40 and 80. Each rank of a branch gives the effect below, and the ranks of a branch cost the points listed, in order: […] „Mocniejszy cios” +2 damage of a blow with a stick, prices 1 · 1 · 1; „Cięższy kop” +1 damage of a kick, prices 1 · 1 · 1; „Zwinny odskok” 1 more taken from a blow by a dodge, prices 1 · 1; […] These numbers stand in the data of the character skills (D-18).”
  - Change made by this task: „Walka bronią jednoręczną” at 15, 40, 100 and 300; „Kopanie” at 10 and 30; „Unik przed ciosem” at 4 and 15; „Mocniejszy cios” prices 1 · 1 · 1 · 1; „Cięższy kop” prices 1 · 1. The numbers of the three combat trees and their two branches are no longer the old loop game's: they are set lower so that the points of combat can be earned on the first maps with combat, and are to be corrected either way when more maps are balanced. Accepted with it: once progress carries over between versions of the game, lowering this generosity takes points from players. Rejected: the old game's combat numbers kept and watched through a count of blows, kicks and dodges in the measurement of each new map — the combat trees nearly dead in the first weeks; thresholds about four times lower (6 · 20 · 50, 5, 3 · 8) — too generous; a fourth threshold kept for a future branch — a free point with nothing to buy; a fourth threshold dropped; „Cięższy kop” keeping three ranks on two points — the branch never fully bought.
- D-191 — „Each level gives points that buy ranks of branches of its own tree, at prices that differ from branch to branch, and each next level needs more practice than the one before.”
- D-199 — „Below it each branch gives its name, rank and maximum rank, description from data and a „Kup” button disabled when points are insufficient or all ranks are bought; a numerical branch also gives „teraz {wartość} → po kupnie {wartość} · cena {cena}”, while „Obchód”, „Czysty płomień” and „Zwiad” give the price and currently omit numerical before-and-after values.”

## Settlements to record

Candidates: 1 shown, 0 accepted — 2026-11-13

none

## Out of scope

none
