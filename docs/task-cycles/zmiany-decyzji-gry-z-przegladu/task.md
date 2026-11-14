---
title: "loop2: zmiany decyzji o grze i ekranach z przeglądu fundamentu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the project note of the game's project in the author's private notes"
---

# loop2: zmiany decyzji o grze i ekranach z przeglądu fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przegląd fundamentu loop2 z 13.11.2026 znalazł wpisy o grze i ekranach, które mówią co innego niż gra robi, albo pomijają koszt, który gra ponosi.
- Agent, który porównuje zmianę z takim wpisem, „naprawia” poprawny kod albo projektuje pod nieprawdziwą regułę.
- Decyzje przy każdej propozycji zapadły w przeglądzie; propozycje z dowodami stoją w the data note of the foundation review of 2026-11-13, sekcja 1, pod numerami niżej.

### To do

1. F-1 — D-369: w *Accepted with it* nazwać, że każda nowa albo usunięta zwykła czynność zmienia kształt zapisu i podnosi jego wersję, co według D-206 odrzuca wszystkie starsze zapisy; dopisać czynności do komentarza przy `SAVED_GAME_VERSION` (`src/browser/sim/saved-game.ts:74-78`) i do reguły „Wersja podnoszona razem z kształtem” w `guidelines/coding-saved-game.md`, tę przez `the-way-maintain-coding-guidelines`.
2. F-8 — D-346 i D-383: dopisać, że wybór zakładki i filtra kroniki nie przeżywa przeładowania strony.
3. F-12 — niezmiennik `streak-program-change`: „of a map run that has not ended”, jak D-131; wyjątek reguły, którą gra sama dopisuje do kopii, nie wchodzi.
4. F-19 — D-120: przykład w *Verification* i zdanie *Rationale* dopasowane do danych — „Wytwórz — ognisko” tylko z predyspozycją „Wytwarzanie ogniska”; zwrot „the common campfire” wychodzi; *Rejected* dostaje ognisko otwarte dla każdego archetypu — zmienia dane, testy i krzywą praktyki z D-379, a przy jednym archetypie nic nie daje; do ponownego rozważenia przy projekcie drugiego archetypu.
5. F-20 — D-186: *Rationale* i *Rejected* mówią, że linia „Wyniesie” pojawia się po przełączeniu postaci na inny program, nie przy edycji planu; D-179: zdanie *Rationale* o osłonie mówi, że dotyczy symulacji i przełączenia, bo ekran nie daje edycji planu w trakcie przejścia (D-180); `trip-plan-progress` bez zmian.
6. F-22 — D-311: w *Accepted with it* koszt okna węższego niż 1074 px (kronika pod całym programem), z odesłaniem do nowej decyzji o najmniejszym oknie (punkt 9).
7. F-27 — D-367: wyjątek „…unless the map run is left or a new one starts”; wygładzić klauzulę *Rationale* „which is the place the mage stood or walked to” (uwaga loop2#77-2).
8. F-38 — słownik: hasło dla poprzedniej gry „loop” z *Not* „earning loop”; w decyzjach każde gołe „loop”/„the loop”/„loops”, które znaczy pętlę zarobkową, zmienić na „earning loop” (ok. 10 miejsc w ok. 8 decyzjach); „loop” jako poprzednia gra i „loop” w innym znaczeniu (pętla klatek animacji, „loop2”, „loopback”) zostają.
9. F-40 — nowa decyzja o przeglądarkach i najmniejszym oknie, z wiersza 1 *Settlements to record*.

### Questions to settle

- Co znaczy „okno 1280 × 720” w nowej decyzji (punkt 9)?
  - Answer: obszar strony w przeglądarce, 1280 × 720 px — tak liczą skill `loop2-play` (`.claude/skills/loop2-play/SKILL.md:240`) i komentarze `src/browser/styles.css`; gracz z ekranem 1280 × 720 ma mniejszy obszar strony i jest poniżej granicy.
  - Not chosen:
    - rozdzielczość ekranu 1280 × 720 — obszar strony ok. 1280 × 600, a dotychczasowe pomiary trzeba by liczyć od nowa
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a”
- Jak nowa decyzja (punkt 9) traktuje sprawdzanie w Firefox i Edge, skoro agent gra w grę przez Playwrighta w Chromium?
  - Answer: decyzja wymienia zbiór przeglądarek, a w *Accepted with it* mówi, że codzienne sprawdzenia agenta idą w Chromium, a Firefox i Edge sprawdza ręcznie zadanie sesji w prawdziwej przeglądarce; koszt: błąd widoczny tylko w Firefoksie może przejść między takimi sesjami.
  - Not chosen:
    - Firefox dodany do skilla grania w tym zadaniu — zakres rośnie, a nie wiadomo, czy Playwright z Firefoksem zainstaluje się na tym komputerze (WebKit się nie zainstalował)
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a (zadanie sesji w przeglądarce ma już krótkie przejście w Firefoksie — 4 b, 22:36)”
- Czy wytyczna `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”, dostaje czynności tak jak komentarz przy `SAVED_GAME_VERSION` (punkt 1)?
  - Answer: tak, w tym zadaniu, przez `the-way-maintain-coding-guidelines` — jedno zdanie.
  - Not chosen:
    - tylko komentarz — komentarz i wytyczna mówią co innego, a agent czyta wytyczną, zanim dotknie pliku zapisu
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”
- Gdzie zostaje „wspólne ognisko dla wszystkich archetypów — do rozważenia przy projekcie drugiego archetypu” (punkt 4)?
  - Answer: w *Rejected* D-120 — ognisko dla każdego archetypu zmienia dane, testy i krzywą praktyki z D-379, a przy jednym archetypie nic nie daje; do ponownego rozważenia przy drugim archetypie.
  - Not chosen:
    - notatka w projekcie (P) Loop poza repozytorium — agent projektujący drugi archetyp jej nie zobaczy
    - zostawić w *Out of scope* — uwaga ginie po scaleniu
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 a”

## Context

- Dane przeglądu: the data note of the foundation review of 2026-11-13 — dowody, cytaty i decyzje przy F-1, F-8, F-12, F-19, F-20, F-22, F-27, F-38, F-40; decyzje podjął doradca dnia z upoważnienia Mariusza, 2026-11-13.
- Przegląd czytał commit `1b0c8ad4`; na `main` z 2026-11-13 (`fc00c406`, po PR #88) dowody F-1, F-8, F-12, F-19, F-22, F-27 stoją dalej, a `SAVED_GAME_VERSION` wynosi już 5 (podbiło je zadanie 25).
- Pytanie F-1, czy jakiś test łapie nową czynność bez podbicia wersji, ma odpowiedź: łapie — dokument bieżącej wersji w `tests/sim/saved-game.test.mjs:617-634` wylicza `minutesByAction` dosłownie, a ścisłe wczytanie (`fields`) odrzuca dokument o innej liczbie kluczy, więc test „a document of the current version loads into the state it describes” czerwienieje; zmiana zostaje tekstowa.
- Klauzula do wygładzenia w D-367 (loop2#77-2): recenzent PR #77 nazwał ją „grammatical but loose. Wording only.”
- Zadanie z linii 70 backlogu (zmiana D-206, wciąganie programów ze starych zapisów) niesie wariant zapisu odporny na nową czynność.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-369**, *Accepted with it*: „the saved game state growing by the record and its version rising once for it, as the version rises once in the change that alters the shape of the game state, which discards a saved game state of the older version, the player's programs in it included (D-206).” — zmiana (F-1): zdanie mówi też, że każda nowa albo usunięta zwykła czynność zmienia kształt zapisu i podnosi wersję znowu, co odrzuca starsze zapisy w całości.
- **D-206**: „A saved game state carries the version number of its shape, and the game loads whole only a saved game state whose version is the game's current one. The game discards a saved game state of any other version in full, including the player's programs, and starts the player anew.” — bez zmian; to na nim stoi koszt z F-1.
- **D-346**: „The tab „Kronika” or „Teren” the player picks in the area under the world on the screen of a map run stays picked through the whole map run, through leaving its screen and coming back, and through „Restart”, and a rule panel opened or closed in the program leaves it as it was.” — zmiana (F-8): wybór nie przeżywa przeładowania strony.
- **D-383**: „The filter the player picks above the list of the chronicle stays picked through the whole map run, through leaving its screen and coming back, and through „Restart”, as the tab does (D-346); „Wszystko” stands picked again when the character is sent to the map (D-343).” — zmiana (F-8): jak D-346.
- **D-131**: „…sets the streak and the number of beaten attacks of the map run in progress to zero…” — bez zmian; wzór brzmienia dla `streak-program-change` (F-12).
- **D-120**, *Verification*: „complies: „Wytwórz — ognisko” open to every archetype, while making an archetype's own goods is open only to that archetype”; *Rationale*: „One verb, „Wytwórz”, makes both the common campfire and an archetype's goods, so only the pair of verb and target names the character skill the action belongs to…” — zmiana (F-19): przykład i zdanie dopasowane do danych (ognisko tylko z „Wytwarzaniem ogniska”), a *Rejected* dostaje ognisko otwarte dla każdego archetypu (pytanie o wspólne ognisko).
- **D-186**, *Rationale*: „Accepted with it: the line appears in the middle of a map run at the moment the plan is edited, and the view compares the bring list of the copy with the snapshot, one comparison more;” *Rejected*: „a line hidden for an empty snapshot — an item added during the first map run looks as though it could leave, the player does not see that it will not come out of that map run;” — zmiana (F-20): linia pojawia się po przełączeniu postaci na inny program.
- **D-179**, *Rationale*: „The frozen snapshot keeps an item added in the last minute from paying out at once, which would get round the streak, since editing the trip plan does not break it.” — zmiana (F-20): osłona dotyczy symulacji i przełączenia.
- **D-180**, *Rationale*: „Accepted with it: the plan of the copy is not changed during a map run” — bez zmian; podstawa F-20.
- **D-311**, *Rationale*: „The area with the tabs stands under the world, so its place does not depend on the length of the program and the player sees it beside the program.” oraz *Rejected*: „the tabs under the program in a joined column, as in loop in a narrower window — the place of the chronicle depends on the length of the program…” — zmiana (F-22): *Accepted with it* dostaje koszt okna węższego niż 1074 px.
- **D-282**, *Verification*: „…which a narrower layout can place one above the other in that order” — bez zmian; wiąże kolejność wąskiego układu (F-22).
- **D-367**: „…an effect already running finishes, standing still while the scene does, and an effect of a gathering that comes while another still runs takes its place…”; *Rationale*: „…the effect belongs to the mage that gathered, which is the place the mage stood or walked to at the previous reading.” — zmiana (F-27): wyjątek „unless the map run is left or a new one starts” i wygładzona klauzula.
- **Słownik, `earning loop`**: „An earning loop is a succession of map runs that one character makes on one map without the player starting each. — Not: none” — zmiana (F-38): nowe hasło dla poprzedniej gry „loop”; zmiana słowa w decyzjach ze skrótem pętli zarobkowej (wśród nich D-239, D-241, D-246, D-251, D-389 i te, które wymienia F-38).
- **Nowa decyzja (F-40)** o przeglądarkach i najmniejszym oknie — patrz *Settlements to record*.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gra działa w bieżących Chrome, Edge i Firefox na komputerze, Safari jest poza zbiorem, a najmniejsze obsługiwane okno to obszar strony 1280 × 720 px; codzienne sprawdzenia agenta idą w Chromium, Firefox i Edge sprawdza ręcznie sesja w prawdziwej przeglądarce. | decision | F-40 (a) w the data note of the foundation review of 2026-11-13, decyzja doradcy dnia 2026-11-13; pytania o okno i o Firefox/Edge wyżej (z *Not chosen*); wariant „bez wpisu” F-40 — każda uwaga o Safari i o wąskim oknie zostaje bez miary | czy uwaga o Safari albo o oknie 1000 px jest błędem do naprawy i jak mierzyć okno |
| 2 | „loop” w fundamencie to poprzednia gra, nie pętla zarobkowa („earning loop”). | glossary term | F-38 (a) w the data note of the foundation review of 2026-11-13, decyzja doradcy dnia 2026-11-13 | czy „the end of loop” w D-62 i podobne zwroty to koniec poprzedniej gry czy pętli |
| 3 | `streak-program-change` zeruje passę tylko w przejściu, które się nie skończyło; wyjątek reguły dopisanej przez grę nie teraz. | invariant | F-12 w the data note of the foundation review of 2026-11-13, decyzja doradcy dnia 2026-11-13 (tabela partią) | czy „naprawić” kod, który zostawia passę przejścia zakończonego śmiercią |

## Out of scope

- Wariant zapisu, który przeżywa nową czynność (brak klucza czytany jako 0) — należy do zadania o zmianie D-206 (linia 70).
- Wyjątek w `streak-program-change` dla reguły, którą gra sama dopisuje do kopii przy pierwszym wychłodzeniu.
- Zmiana `trip-plan-progress` i `withCopyProgram` (wariant b F-20).
- Zmiana kolejności wąskiego układu w D-282 i `styles.css` (wariant b F-22).
- Zachowanie wyboru kroniki przez przeładowanie w kodzie (wariant b F-8).
