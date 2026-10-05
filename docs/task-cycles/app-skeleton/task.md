# Przygotować szkielet aplikacji loop2

Status: ready for cycle
Project relation: source only: MVP loop2 — `definicja_mvp_loop2.md`, approved 2026-10-04

## Description

### Need

- Repozytorium `loop2` ma fundament i instrukcje dla agentów, ale nie ma jeszcze uruchamialnej aplikacji. Następne zadania potrzebują wspólnego punktu startu zgodnego z zatwierdzonymi ustaleniami MVP.

### To do

1. Przygotować minimalną stronę budowaną w TypeScripcie i rysowaną przez API DOM przeglądarki, bez biblioteki do budowania widoku.
2. Uruchamiać serwer Express 5 napisany w TypeScripcie na Node.js 24, który podaje zbudowaną stronę; nieznane żądanie pod `/api/` ma dostać błąd API zamiast strony HTML.
3. Dodać powtarzalne komendy instalacji zależności, lokalnego uruchomienia, budowania obu części i sprawdzania ich typów; opisać je tak, by kolejny wykonawca mógł uruchomić szkielet.

### Questions to settle

- Jaki jest najmniejszy uruchamialny wynik tego zadania i które elementy MVP mają już w nim działać?
  - Answer: Pusta strona w TypeScripcie, serwer Express 5, błąd API dla nieznanych ścieżek `/api/` oraz komendy budowania i kontroli typów. Konta, baza, mechanika gry i wdrożenie są zadaniami późniejszymi. Mariusz, 2026-10-05.

## Context

- Źródło: `definicja_mvp_loop2.md` w tym folderze; zadanie korzysta z jej ustaleń, ale nie bierze pozycji ani zależności z planu projektu.
- Stan repozytorium: `C:\Storage\repos\loop2` na `main` zawiera `AGENTS.md`, pusty fundament i przypięty proces `.the-way`, bez kodu gry lub serwera. Przed startem cyklu trzeba przypiąć scaloną wersję the-way zawierającą `implement-task` i odświeżyć adaptery skilli.
- Definicja MVP przeszła kontrolę gotowości `project-level/readiness_check.py` bez ustaleń do poprawy.

## Questions carried to cycle

- Jak ułożyć i uruchamiać kod przeglądarki oraz serwera z tego samego repozytorium, zachowując zatwierdzony podział odpowiedzialności?
- Jak zbudować i sprawdzić typy obu części przed ich uruchomieniem?

## Decisions in play

- Obecny fundament repozytorium `loop2` nie zawiera wpisów o aplikacji.
- Zatwierdzona definicja MVP, „How is the work of the game split between the server and the browser?”: “The server holds the players' accounts and each player's saved game state, and computes nothing of the game. The browser computes the whole game — the map runs, the earning loops and the catch-up — and sends the saved game state to the server.”
- Zatwierdzona definicja MVP, „What is the game built with?”: “The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions that take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The view draws only from the game state and changes nothing in it.”
- Zatwierdzona definicja MVP, „How is the browser view built?”: “The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.”
- Zatwierdzona definicja MVP, „What runs the account and save server?”: “The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript types are checked before deployment.”
- Zatwierdzona definicja MVP, „How does the account and save server handle HTTP requests?”: “The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and responses.”
- Zatwierdzona definicja MVP, „What serves the built game and account requests in the container?”: “One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page.”

## Out of scope

- Konta, baza danych, mechanika gry i wdrożenie na serwer — te elementy nie wchodzą do tego zadania.
