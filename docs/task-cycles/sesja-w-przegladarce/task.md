---
title: "loop2: jedna sesja gry w prawdziwej przeglądarce — stany, których nikt nie oglądał"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project's folder note"
---

# loop2: jedna sesja gry w prawdziwej przeglądarce — stany, których nikt nie oglądał

Status: ready for cycle
Project relation: independent

## Description

### Need

- Kilka stanów ekranów gry sprawdziły tylko testy na imitacji przeglądarki albo stany składane ręcznie: wiersze „Teraz”/„Potem” w ataku, akapit ataku w kronice, koniec przejścia osiągnięty prawdziwym programem, okno końca pod dwuwierszowym ostrzeżeniem i w niskim oknie, odcień sceny i ograniczony ruch, odejście wilka i mapa rozwiązana w walce. Jeśli któryś jest zły, gracz zobaczy to pierwszy.
- Grupa G-4 przeglądu fundamentu z 13.11.2026 (7 uwag z PR-ów #61–#87), do tego uwaga loop2#79-22 z G-8 (przewinięcie strony o ok. 40 px przy wejściu na ekran przejścia — sesja ustala skutek) i słabe punkty oznaczone „P” w sekcji 2: the note of the foundation review of 13 November 2026 in the author's notes, sekcje „G-4”, „G-8” i „2. Słabe punkty”.

### To do

1. Jedna sesja agenta ze skillem `loop2-play` w Chrome ogląda w oknie 1280 × 720 każdy stan z uwag G-4 poza loop2#80-5 i zapisuje w PR-ze, co widać (zrzuty albo przebieg klatek):
   - loop2#65-1: wiersze „Teraz”/„Potem” w czasie ataku; koniec rozwiązanej mapy („Minuta 480”, „Las rozwiązany”); czerwone „marznie” osiągnięte grą;
   - loop2#66-1: akapit ataku w kronice w walce, którą mag przeżył, z konsolą czytaną w trakcie gry;
   - loop2#79-1: koniec przejścia osiągnięty prawdziwym programem — śmierć i rozwiązanie mapy — oraz okno końca pod dwuwierszowym ostrzeżeniem;
   - loop2#79-23: okno końca przy 1280 × 720 z wierszem ostrzeżeń;
   - loop2#83-4: powrót odcienia sceny po stracie passy, pauza szarzejąca odcień i szron razem, ograniczony ruch;
   - loop2#86-1: wilk, który odchodzi i odbiega w prawo; mapa rozwiązana w środku walki.
2. Koniec rozwiązanego Lasu sesja osiąga programem, który agent pisze w edytorze gry; Wiedzę postaci może złożyć skryptem. Gdy po ok. 45 minutach prób program mapy nie rozwiązuje, sesja pokazuje koniec rozwiązanej mapy na stanie złożonym, a PR mówi, że część „prawdziwy program” uwag loop2#65-1 i loop2#79-1 zostaje otwarta.
3. Ta sama sesja ustala skutek przewinięcia z loop2#79-22 i ogląda słabe punkty „P”: ryzyka D-03 (restart animacji CSS, linia upuszczenia po przeciągnięciu reguły między grupami, kursor w polu liczby przyciętym przez grę), ryzyko D-254 o przeciąganiu (chwyt listy wyboru zamiast uchwytu), D-278 (karta logowania z rozwiniętymi zasługami), D-299 (wybór czynności przy wszystkich odkrytych czynnościach bez przewijania), D-323 (zdanie po nieobsłużonym błędzie bez usterki i mignięcia), D-349 (zmierzone szerokości programu i scena 672 × 304 px w oknie 1280 i 1920 px szerokim).
4. Krótkie przejście w Firefoksie po ekranach, gdzie silniki różnią się najbardziej: scena z odcieniem i szronem, maski ikon na rysunku mapy, okno końca przy 1280 × 720, przewinięcie przy wejściu na ekran przejścia. Gdy Firefox Playwrighta nie działa z zainstalowanym `playwright-cli`, PR to mówi, a agent niczego nie instaluje.
5. Stan, który wygląda źle, naprawia to zadanie, gdy spełnia trzy warunki: ekran przeczy obecnej decyzji, niezmiennikowi albo regule styleguide'u; poprawka mieści się w plikach części `browser-view`; poprawka nie zmienia żadnej decyzji. Każdy inny zły stan PR podaje jako usterkę do decyzji człowieka.
6. Ta sama sesja ogląda stany, których nie objęło nagranie stylów przy podziale arkusza na pliki ekranów (loop2#145, pozycja 2 „Fix or let through”): okno końca przejścia po ukończeniu mapy, zablokowane konto, pętla zarobkowa i jej raport, rozwiązana mapa, panel porażki karty logowania, stany najechania i fokusu, ruch, lista kont (konto właściciela) — i porównuje je z wyglądem sprzed podziału. Źródło: opis PR-a https://github.com/mariusznazar/loop2/pull/145, doradca dnia 16.11.
7. Lista wyboru programu (`select`) na Mapach i na ekranie przejścia jest tak szeroka jak najdłuższa nazwa programu, więc nazwa z 200 liter bez spacji przewija całą stronę w bok (ok. 1840 i 2230 px przy 1280 × 720; 40 liter się mieści). Lista dostaje największą szerokość, a ucięta nazwa — wielokropek; pełna nazwa zostaje w rozwiniętych opcjach. Wyjątek dla `select` w regule styleguide'u „A name typed by the player breaks in its row” idzie za tym: lista nie łamie nazwy, tylko ją ucina. Sesja ogląda to w oknie 1280 × 720 z nazwą 40- i 200-literową. Źródło: opis PR-a https://github.com/mariusznazar/loop2/pull/146, pozycja 1 „Fix or let through” po korekcie 1; wybór wyglądu (wielokropek i największa szerokość) — doradca dnia w imieniu Mariusza, 17.11.
8. Ta sama sesja wywołuje w prawdziwej przeglądarce błąd w kodzie zapisu, zanim żądanie wyjdzie (np. podmieniony klient zapisu), i patrzy, czy błąd dochodzi do ostatniej obsługi strony (`last-resort.ts`): gra staje i pisze zdanie z D-323, a wcześniej gracz widzi zdanie o nieudanym zapisie i ponowienia (D-208); to samo dla zapisu przed wylogowaniem (D-97). Źródło: opis PR-a https://github.com/mariusznazar/loop2/pull/147, pozycja 1 „Fix or let through” (Checks, 4) — testy trzymają oba końce, ogniwa w stronie nikt nie widział; doradca dnia 17.11.

### Acceptance criteria

- PR mówi o każdej pozycji punktów 1–4, co widać, w jakiej przeglądarce i oknie, albo dlaczego jej nie obejrzano.

### Questions to settle

- Co sesja robi ze stanem, który wygląda źle?
  - Answer: mieszanie z regułą trzech warunków (wariant c) — naprawa w tym zadaniu, gdy ekran przeczy obecnej decyzji, niezmiennikowi albo regule styleguide'u, poprawka mieści się w plikach `browser-view` i nie zmienia żadnej decyzji; reszta jako usterka w PR-ze do decyzji człowieka.
  - Not chosen:
    - a) sesja tylko ogląda, PR bez kodu — nawet jednolinijkowa poprawka płaci za cały osobny cykl
    - b) sesja naprawia wszystko, co znajdzie — zakres nieznany z góry, a cykl i tak staje na decyzji, której fundament nie daje
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 c (mieszanie z regułą trzech warunków)”
- Co, gdy agent nie napisze w edytorze programu, który rozwiązuje Las?
  - Answer: agent próbuje napisać program w edytorze (Wiedza postaci może być złożona skryptem), z limitem ok. 45 minut; potem koniec rozwiązanej mapy na stanie złożonym, a PR mówi, że uwagi loop2#65-1 i loop2#79-1 w części „prawdziwy program” zostają otwarte (wariant a).
  - Not chosen:
    - b) tylko stan złożony, bez pisania programu — powtarza dokładnie to, co uwagi wytykają; obie zostają otwarte i wrócą w następnym przeglądzie
    - c) prawdziwy program bez wyjścia awaryjnego — koszt nieograniczony; gdy Las okaże się zbyt trudny, cykl staje i wraca do człowieka
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”
- Które dodatkowe słabe punkty „P” (D-254, D-317, D-347) wchodzą do sesji?
  - Answer: tylko D-254, w części o przeciąganiu; D-317 i D-347 zostają z adnotacją w PR-ze, że ich nie sprawdzano, i dlaczego (wariant a).
  - Not chosen:
    - b) wszystkie trzy — narzędzie do pomiaru migania (godziny, nowa rzecz do przyjęcia) i nocny przebieg, którego skill dziś nie umie zrobić
    - c) żaden, tylko pięć ze szkicu — ryzyko przeciągania z D-254 zostaje niesprawdzone, choć sesja i tak przeciąga reguły
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”
- Czy sesja idzie tylko w Chrome, czy też w Firefoksie?
  - Answer: całość w Chrome plus krótkie przejście w Firefoksie po scenie z odcieniem i szronem, maskach ikon na mapie, oknie końca przy 1280 × 720 i przewinięciu przy wejściu na ekran przejścia; gdy Firefox Playwrighta nie pasuje do CLI, agent zgłasza to w PR-ze zamiast instalować (wariant b).
  - Not chosen:
    - a) tylko Chrome — Firefox, od F-40 w zbiorze przeglądarek, zostaje nieobejrzany, a usterkę jego silnika pierwszy zobaczy gracz
    - c) każdy stan w obu przeglądarkach — mniej więcej podwaja sesję dla stanów, których różnica silników raczej nie dotyczy
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 b”

## Context

- Dane przeglądu: the note of the foundation review of 13 November 2026 in the author's notes — tabele G-4 i G-8 i tabela słabych punktów.
- Decyzja F-40 przeglądu (2026-11-13), jeszcze nie w `foundations/decisions.md`, niesie ją zadanie „zmiany decyzji o grze i ekranach z przeglądu fundamentu”: „gra działa w bieżących Chrome, Edge i Firefox na komputerze; Safari poza zbiorem; najmniejsze obsługiwane okno 1280 × 720”. Edge ma silnik Chrome, więc Chrome go pokrywa.
- Przewinięcie z loop2#79-22: `src/browser/view/game-view.ts:974` — `if (lost) shown?.focus();`, `focus()` bez `preventScroll` (odczyt 2026-11-13, `fc00c406`); przy otwarciu okna końca `src/browser/view/run-screen.tsx:288` ustawia `scrollTop = 0`. Plik `game-view.ts` dzieli zadanie „podział sterownika widoku”.
- Las rozwiązuje się po 480 minutach bez utraty zdrowia od zimna i głodu i bez zmiany programu (`src/browser/sim/data/maps.ts:74-76`); repozytorium nie ma programu, który rozwiązuje mapę (D-255). Pusty program umiera po 243 minutach gry (D-255).
- Na komputerze leży Firefox Playwrighta (`ms-playwright/firefox-1532`); czy pasuje do `playwright-cli` 0.1.22, nie sprawdzano.

## Questions carried to cycle

- Jak sesja dochodzi do każdego stanu — graniem czy stanem złożonym (`compose-state.mjs`) — poza końcem rozwiązanego Lasu, który ustala punkt 2.
- Jak sesja wywołuje dwuwierszowy wiersz ostrzeżeń nad oknem końca (np. nieudany zapis po zatrzymaniu serwera i zdanie po nieobsłużonym błędzie).

## Human actions

none

## Decisions in play

Cykl czyta decyzje części `browser-view` dla każdego oglądanego stanu metodą „Reading the foundation”; niżej te, które zadanie nazywa wprost.

- D-75: „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually. Automation is reconsidered when a critical-journey defect escapes smaller tests or repeated manual checking becomes a significant task cost; that task settles the tool and scope.”
- D-88: „Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests on a hand-made document model or on a ready-made document imitation prove only the logic they run, never real events, focus or rendering. Automation is reconsidered on a defect that such a test missed or together with the player-journey automation of D-75, and this exclusion never covers a trust boundary.”
- D-254: „An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails, and reads motion from a stream of frames. This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.”
- D-255: „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”
- D-03: „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.” Ryzyka, które sesja ogląda: „a rebuilt node may restart a CSS animation and make the figure shake; a rule dragged between groups may leave the drop line on the screen; a number field whose value the game clips may lose its cursor.”
- D-278: „The top edge of the login card stands at 15% of the window's height, whatever the card holds, so the unfolding of the credits, a change at the switch and a sentence appearing under a form move nothing above them.”
- D-299: „The pick of the rule panel holds no search field and no row of recent picks.”
- D-323: „After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, … Until the page is reloaded the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once, in `warning`: on a screen with the header, a game screen or a waiting screen, in the row under the menu bar beside the sentence of a failed save, on the screen of the login card in the card under the form, and, where React takes the card down, alone in the card's place (D-262). The page writes the line of the error as D-253 gives it.”
- D-349: „The scene has one size, 672 × 304 px, twice the size of its picture, and the game keeps no second scale of it. Whatever the scene draws is drawn for this size alone.”

## Settlements to record

Candidates: 5 shown, 0 accepted — 2026-11-13

none

## Out of scope

- Sprawdzenie w Safari (loop2#80-5) — Safari poza zbiorem przeglądarek (F-40).
- Okna niższe niż 720 px (część loop2#79-23 o wysokości poniżej ok. 525 px) — poniżej najmniejszego obsługiwanego okna (F-40).
- Pomiar migania części sceny z D-317 i noc w karcie z D-347 — PR mówi, że ich nie sprawdzano, i dlaczego.
- Drugie ryzyko D-254 — czy człowiek widzi szarpanie sceny przy 16× — tego agent nie rozstrzyga.
- Zachowanie w repozytorium programu, który rozwiązuje Las.
