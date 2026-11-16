---
title: "loop2: dziennik decyzji gry podzielony na tematy — sekcje bez przenumerowania, treść wpisów bez zmian"
status: draft
created: 2026-11-13T23:50
updated: 2026-11-15
tags: [zadanie]
related: "the project note of the loop project in the author's notes"
---

## Po co to

- **Jak jest dziś:** Agent wybiera decyzje do zadania po części gry, której zadanie dotyka. Część „widok w przeglądarce” obejmuje około 70% dziennika, więc taki wybór zwraca prawie wszystko. Największy temat to kilkanaście wpisów, ale dziennik nie ma podziału na tematy, po którym dałoby się wybrać węziej.
- **Kto to odczuwa:** Agenci cyklu, którzy czytają decyzje do każdego zadania.
- **Co jeśli nic:** Wybór po części dalej zwraca 70–85% dziennika. Szacunek z analizy: 10–13 tys. tokenów zamiast 31 tys. na agenta czytającego decyzje — założenie „3–5 tematów na zadanie” nie było zmierzone.

# loop2: dziennik decyzji gry podzielony na tematy — sekcje bez przenumerowania, treść wpisów bez zmian

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Agent wybiera decyzje do lektury po częściach gry, których dotyka praca, a część `browser-view` miała przy analizie 263 z 373 wpisów dziennika, więc wybór po części zwraca 70–85% dziennika.
- The way pozwala już podzielić dziennik na sekcje tematyczne i w takim dzienniku wybierać do lektury po temacie, z przeglądem pytań decyzji spoza wybranych sekcji; dziennik gry tych sekcji nie ma.
- Odbiorcą są agenci cyklu gry, którzy czytają decyzje do każdego zadania, w tym recenzent całej zmiany, który czyta spis całego swojego wyboru.

### To do

1. Przypięta wersja the way (gitlink `.the-way`) przesuwa się na najnowsze scalenie gałęzi `foundations` the way, nie starsze niż scalenie zadania „jak agent czyta dziennik decyzji” (prośba #128 the way), razem z plikami, które instalator the way przy tym zapisuje w repozytorium gry — tak, żeby w grze obowiązywały reguła dziennika z sekcjami i wybór lektury po temacie oraz były skrypty `elements/common/decision_index.py` i `elements/common/compare_log_entries.py`. Gdy na początku cyklu przypięta wersja stoi już na scaleniu gałęzi `foundations` nie starszym niż prośba #128 the way albo na nowszym commicie tej gałęzi — bo przesunęło ją inne zadanie, np. „CI przy prośbie o scalenie” — ten punkt odpada.
2. Dziennik decyzji gry (`foundations/decisions.md`) dostaje 28 sekcji tematycznych z pytania 2, w ich kolejności, z ich nagłówkami i zdaniami, w formie z szablonu decyzji the way (`elements/decisions/template.md`, „Where entries go”): nagłówek `## ` i jedno zdanie, co sekcja obejmuje. Każdy wpis stoi w dokładnie jednej sekcji, numery wpisów zostają bez zmian, a lista wycofanych numerów (`## Withdrawn identifiers`) zostaje na końcu dziennika.
3. Treść każdego wpisu i listy wycofanych numerów zostaje bajt w bajt ta sama, zmienia się tylko kolejność wpisów i dochodzą nagłówki sekcji z ich zdaniami; potwierdza to `compare_log_entries.py` uruchomiony na dzienniku sprzed podziału i po nim, bez żadnego zgłoszenia, a jego wynik stoi w opisie prośby o scalenie.
4. Opis prośby o scalenie pokazuje listę sekcji z liczbą wpisów każdej i wymienia wpisy, których przydział był wątpliwy, z sekcją, do której trafiły.

### Acceptance criteria

- Dziennik „sprzed podziału”, z którym porównuje skrypt z punktu 3, to dziennik z `main` w chwili, gdy prośba jest gotowa do scalenia — także wtedy, gdy w trakcie cyklu na `main` trafi zmiana innego zadania, która rusza wpisy dziennika.
- `decision_index.py --sections` uruchomiony na dzienniku gry wypisuje każdą sekcję z jej zdaniem.

### Questions to settle

- 1. Kto układa listę sekcji (nagłówki i zdania) i kiedy Mariusz ją przyjmuje?
  - Answer: (a) — listę około 25 sekcji (nagłówek i jedno zdanie) układa to doprecyzowanie z grup tabeli analizy i z nagłówków wpisów bez grupy, a Mariusz przyjmuje ją przed cyklem; cykl przydziela wpisy do przyjętych sekcji, a opis prośby pokazuje liczbę wpisów każdej sekcji i wpisy, których przydział był wątpliwy.
  - Not chosen:
    - (b) jak w the way: listę i przydział układa cykl, a Mariusz przyjmuje całość przy scaleniu — krótsze doprecyzowanie, ale lista odrzucona przy scaleniu przestawia cały dziennik drugi raz w dodatkowej rundzie cyklu; przeczy zdaniu z notatki zadania „Listę sekcji przyjmuję przed naniesieniem”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „1 a — ułóż listę sekcji teraz (nagłówek + jedno zdanie, z grupami z tabeli i wpisami bez grupy) i pokaż ją jako tabelę z liczbą wpisów w każdej sekcji. Listę przekażę Mariuszowi do przyjęcia, bo w notatce zastrzegł, że przyjmuje ją sam.”
- 2. Jakie sekcje dostaje dziennik gry?
  - Answer: 28 sekcji w tej kolejności, z nagłówkiem i zdaniem opisu jak w tabeli; liczba wpisów z projektu przydziału z 15.11.2026 (*Context*).

    | # | Nagłówek | Zdanie opisu | Wpisy |
    |---|---|---|---|
    | 1 | Architecture and technology | What the game, the account server and their build are made of and how the work splits between the browser and the server. | 12 |
    | 2 | Code rules, exemplars and static checks | The coding guidelines loop2 adopts, the exemplar files of each kind of code, the linters and the checks that keep the code and its references in bounds. | 20 |
    | 3 | Testing discipline | The testing discipline loop2 adopts: the levels, shape and exemplars of tests, the mechanisms they exercise and the deliberate exclusions. | 15 |
    | 4 | The gate, test tools and the local start | How the full gate runs its stages, Docker and the test tools, and what the local start gives an agent that checks the game. | 14 |
    | 5 | The server: hosting, deployment, logs and failure reports | Where the game runs, how a change reaches the server and is rolled back, who may act on it, and how its logs and failures reach the owner and the agent. | 17 |
    | 6 | Database backup and restore | How the database is backed up, where the copies go, and what a checked restore means. | 10 |
    | 7 | Account server: access, security and blocked accounts | Who may use an account, how requests are authorized and limited, how passwords and sessions are kept and how the operator blocks an account. | 17 |
    | 8 | Signing in: the login card and credentials | What a visitor sees before and after signing in, the login card and the passwords and addresses it accepts. | 11 |
    | 9 | Account email and password reset | How account email is sent and limited, how emailed links confirm an address or reset a password, and what the messages say. | 19 |
    | 10 | Saving the game state and the previous save | When and how the game state is saved on the server and loaded back, and the previous save kept for a privileged account. | 16 |
    | 11 | Browser view: screens, navigation and their code | Which screens the game has, how the player moves between them, and how the screens are built in React. | 13 |
    | 12 | Look of the browser view: styleguide, controls, pictures and fonts | The styleguide, design tokens, shared controls, accessibility, browsers and window sizes, and where pictures, icons and fonts come from. | 21 |
    | 13 | Maps: their content, time and solving | What a map is made of and its numbers, how time and pace pass in a map run, and how a map is solved and opens the next one. | 20 |
    | 14 | Team, body, death and resurrection | The team and its characters, a character's warmth, satiety and health, its death and its resurrection. | 18 |
    | 15 | Gathering, campfire and backpack | How a character gathers, what the backpack holds, and how a campfire is made, fed and shown. | 10 |
    | 16 | Combat | How an encounter with a creature goes, what it reveals and what record of it the player reads. | 11 |
    | 17 | Character skills and nature energy | How character skills and their branches grow and act, and how a mage's nature energy is spent and comes back. | 19 |
    | 18 | Discovery and the Understanding | What the player and the characters know of the world, how a discovery is made and what it writes into the program. | 11 |
    | 19 | How a program runs: rules, actions and conditions | How a character acts by its program: the rules and their groups, actions, conditions, movement and refusals. | 13 |
    | 20 | Programs: ownership, names and the copy | Who owns a program, how programs are named, listed and picked, and what becomes of the copy a map run uses. | 12 |
    | 21 | Trip plan, chest and items | How items go into a map run and out of it, the trip plan, the chest and what a map run pays or takes. | 13 |
    | 22 | Earning loop and time away | How an earning loop runs and is stopped, how time away is caught up, and what the player reads after it. | 14 |
    | 23 | Program editor | How the player writes, groups, folds, moves and deletes program rules in the program editor. | 13 |
    | 24 | Rule panel and the signs of a rule | The rule panel that takes the player through a rule, and the state and signs a program rule shows. | 11 |
    | 25 | Screen Mapy and Siedziba | What the screen Mapy shows of maps and characters, and the camp at the top of Siedziba. | 11 |
    | 26 | Screen of a map run and the end-of-run window | The layout of the screen of a map run, its rows and tabs, what pausing and leaving it do, and the end-of-run window. | 17 |
    | 27 | Chronicle | What the chronicle of a map run holds, how its entries read, and how the player filters it. | 11 |
    | 28 | Scene | What the scene shows and how the mage, its effects and the frost on its frame move and draw. | 14 |

  - Source: Mariusz, 2026-11-15: „przyjmuję w tej postaci” (odpowiedź na listę 28 sekcji z liczbą wpisów).

## Context

- To jest punkt 5 zadania „pierwsze porządki dziennika decyzji” (the document of the earlier task of the author's backlog, the first tidying of the decision log), wydzielony 13.11.2026; jego pytanie 1 mówi, dlaczego osobno.
- Zależności są scalone: zadanie the way „jak agent czyta dziennik decyzji” (prośba #128 the way, 15.11.2026), „pierwsze porządki dziennika decyzji” (prośba #99 loop2) i „testy wskazują zdania decyzji” (prośba #133 loop2, 15.11.2026).
- Gra ma dziś przypiętą wersję the way `ec7929d` (scalenie prośby #125), sprzed prośby #128; najnowsze scalenie gałęzi `foundations` to `bfb2e10` (prośba #133 the way), a między nimi stoi osiem scaleń, #126–#133.
- Kontrola fundamentu z `bfb2e10` uruchomiona na `main` gry (`b1904c5b`) zgłasza 0 błędów (sprawdzone 15.11.2026), więc przesunięcie wersji nie wymaga zmian w fundamencie gry, o których dziś wiadomo.
- Przesunięcie przypiętej wersji razem z inną zmianą ma precedens: prośba #130 loop2.
- Prośba #128 the way podzieliła dziennik the way na 28 sekcji tematycznych — wzór formy nagłówka i zdania (`foundations/decisions.md` the way, np. „## The-way and how a product takes it”).
- Szablon decyzji the way na `bfb2e10`, „Where entries go”: „The log may have topical sections, each a `## ` heading with one sentence of what it covers, its entries keeping their numbers. In a log so divided a new entry goes at the end of the section of its topic, or, where no section fits, into a new section, heading and sentence, opened at the end of the log before the list of withdrawn numbers; the request that adds the entry names that section.”
- `compare_log_entries.py` porównuje wpisy (bloki od nagłówka `### D-NN — ` do następnego nagłówka) i listę wycofanych numerów; nagłówków sekcji i ich zdań nie porównuje.
- Dziennik gry ma dziś 403 wpisy (D-01–D-409, część numerów wycofana), ok. 1,17 MB, bez sekcji (`main`, `b1904c5b`).
- Punkt wyjścia dla sekcji: kolumna `cluster` tabeli analizy the table of the analysis of the loop2 decision log, a file of the author's private notes — grupy nadali subagenci i sprawdzono je tylko w próbie. Policzone 15.11.2026: 96 różnych grup (raport analizy pisze o 67); grupę ma 353 z dzisiejszych 403 wpisów, 50 jej nie ma (głównie wpisy od D-374), a 6 wpisów z grupą już w dzienniku nie ma.
- Projekt przydziału wpisów do sekcji z pytania 2, ułożony w doprecyzowaniu 15.11.2026 na `main` `b1904c5b` i sprawdzony skryptem (każdy z 403 wpisów w dokładnie jednej sekcji). To punkt wyjścia cyklu, nie przyjęty przydział: cykl przydziela wpisy, w tym te dopisane później, a opis prośby wymienia przydziały wątpliwe. Wątpliwe już w projekcie: D-307 przy planie wyprawy, D-409 przy pętli zarobkowej, D-362 przy regułach kodu, D-347 przy serwerze i logach, D-190 przy śmierci, D-214 i D-215 przy mapach.
  - 1. Architecture and technology: D-01, D-02, D-03, D-04, D-05, D-06, D-07, D-18, D-229, D-237, D-263, D-266
  - 2. Code rules, exemplars and static checks: D-28, D-29, D-30, D-31, D-32, D-33, D-34, D-35, D-36, D-37, D-113, D-114, D-115, D-116, D-117, D-213, D-351, D-362, D-393, D-394
  - 3. Testing discipline: D-73, D-74, D-75, D-76, D-77, D-78, D-79, D-81, D-82, D-83, D-84, D-85, D-87, D-88, D-89
  - 4. The gate, test tools and the local start: D-49, D-94, D-95, D-255, D-256, D-257, D-258, D-264, D-268, D-390, D-391, D-392, D-405, D-406
  - 5. The server: hosting, deployment, logs and failure reports: D-08, D-09, D-10, D-11, D-12, D-13, D-14, D-15, D-16, D-17, D-252, D-253, D-347, D-353, D-354, D-355, D-356
  - 6. Database backup and restore: D-228, D-230, D-231, D-232, D-233, D-234, D-235, D-236, D-238, D-360
  - 7. Account server: access, security and blocked accounts: D-86, D-101, D-102, D-103, D-104, D-106, D-107, D-108, D-109, D-110, D-111, D-112, D-137, D-138, D-139, D-160, D-202
  - 8. Signing in: the login card and credentials: D-96, D-97, D-98, D-99, D-100, D-259, D-260, D-261, D-262, D-278, D-381
  - 9. Account email and password reset: D-105, D-152, D-153, D-154, D-155, D-156, D-157, D-158, D-159, D-161, D-162, D-163, D-222, D-223, D-224, D-225, D-226, D-227, D-352
  - 10. Saving the game state and the previous save: D-203, D-204, D-205, D-206, D-207, D-208, D-209, D-210, D-211, D-212, D-386, D-399, D-400, D-401, D-402, D-403
  - 11. Browser view: screens, navigation and their code: D-265, D-267, D-269, D-270, D-280, D-281, D-282, D-285, D-286, D-323, D-395, D-407, D-408
  - 12. Look of the browser view: styleguide, controls, pictures and fonts: D-27, D-38, D-39, D-40, D-41, D-42, D-43, D-44, D-45, D-46, D-47, D-48, D-271, D-272, D-273, D-274, D-275, D-276, D-277, D-279, D-396
  - 13. Maps: their content, time and solving: D-21, D-22, D-24, D-55, D-71, D-129, D-130, D-131, D-132, D-133, D-134, D-135, D-136, D-149, D-214, D-215, D-388, D-397, D-398, D-404
  - 14. Team, body, death and resurrection: D-51, D-52, D-54, D-56, D-57, D-58, D-59, D-60, D-61, D-62, D-190, D-216, D-217, D-218, D-219, D-220, D-221, D-387
  - 15. Gathering, campfire and backpack: D-63, D-64, D-65, D-66, D-67, D-68, D-69, D-70, D-72, D-373
  - 16. Combat: D-140, D-141, D-142, D-143, D-144, D-145, D-146, D-147, D-148, D-150, D-151
  - 17. Character skills and nature energy: D-175, D-176, D-177, D-178, D-191, D-192, D-193, D-194, D-195, D-196, D-197, D-198, D-199, D-200, D-201, D-374, D-377, D-378, D-379
  - 18. Discovery and the Understanding: D-118, D-119, D-120, D-121, D-122, D-123, D-124, D-125, D-128, D-312, D-313
  - 19. How a program runs: rules, actions and conditions: D-20, D-23, D-25, D-26, D-90, D-91, D-92, D-93, D-126, D-127, D-375, D-376, D-380
  - 20. Programs: ownership, names and the copy: D-164, D-165, D-166, D-167, D-168, D-169, D-170, D-171, D-172, D-173, D-174, D-384
  - 21. Trip plan, chest and items: D-50, D-179, D-180, D-181, D-182, D-183, D-184, D-185, D-186, D-187, D-188, D-189, D-307
  - 22. Earning loop and time away: D-239, D-240, D-241, D-242, D-243, D-244, D-245, D-246, D-247, D-248, D-249, D-250, D-251, D-409
  - 23. Program editor: D-288, D-292, D-293, D-294, D-295, D-296, D-297, D-298, D-300, D-301, D-303, D-304, D-305
  - 24. Rule panel and the signs of a rule: D-289, D-290, D-291, D-299, D-302, D-306, D-308, D-309, D-310, D-350, D-363
  - 25. Screen Mapy and Siedziba: D-53, D-325, D-326, D-327, D-328, D-329, D-330, D-331, D-332, D-333, D-389
  - 26. Screen of a map run and the end-of-run window: D-19, D-283, D-284, D-287, D-311, D-324, D-334, D-335, D-336, D-337, D-346, D-349, D-368, D-369, D-370, D-371, D-385
  - 27. Chronicle: D-338, D-339, D-340, D-341, D-342, D-343, D-344, D-345, D-348, D-382, D-383
  - 28. Scene: D-314, D-315, D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-364, D-365, D-366, D-367, D-372
- Raport analizy, karta D3: the report of the analysis of slimming the decision logs, a note of the author's private notes, „D3. Podzielić dzienniki na tematy i wybierać po temacie”.
- W kolejce gry czekają dwa zadania, które zmieniają wpisy dziennika: „decyzje niezgodne z grą i sześć błędnych list niezmienników” i przywrócenie D-254, D-357, D-358 i D-359; każde scalone w trakcie tego cyklu zmienia dziennik, z którym porównuje skrypt z punktu 3.
- Rozmowa, w której zadanie wydzielono (lokalna, wygasa ok. 11.02.2027): a transcript file on the author's disk.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- Żadna decyzja gry nie rządzi układem jej dziennika: wybór decyzji części `product-foundation` i `agent-workflow` (45 wpisów) nie ma takiej. Zadanie realizuje w grze dwie decyzje the way, które obowiązują w niej po przesunięciu wersji (*To do* 1); żadnej nie zmienia.
- **WAY-18 — How is a product's decision log kept?** (the way, `bfb2e10`) Bez zmiany; daje dziennikowi sekcje i miejsce nowego wpisu (*To do* 2).
  > A log may be divided into topical sections, each a heading with one sentence of what it covers, its entries keeping their numbers; in a log so divided a new entry stands at the end of the section of its topic, or, where no section fits, in a new section at the end of the log, which the request that adds the entry names. A log without topical sections holds its entries in the order they were written, a new entry at its end.
- **WAY-150 — How do the-way skills choose which product foundation material to read?** (the way, `bfb2e10`) Bez zmiany; po podziale agenci gry wybierają decyzje po sekcjach.
  > In a decision log divided into topical sections, whoever selects picks from the list of sections, by each one's heading and sentence, the sections of the work's topics, whose decisions take the place of those found by *Scope* in the selection whose index it reads, and it runs through the questions alone of the decisions outside those sections whose *Scope* names a touched part and opens whole each whose question points to a bearing on the work.

## Settlements to record

Candidates: 4 shown, 0 accepted — 2026-11-15

none

## Out of scope

- Zmiana treści, numeru albo *Scope* któregokolwiek wpisu — także tam, gdzie przy podziale wyjdzie wpis nieaktualny albo źle opisany; taka uwaga idzie do osobnego zadania.
