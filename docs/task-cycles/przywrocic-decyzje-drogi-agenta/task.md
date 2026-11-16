---
title: Przywrócić w loop2 jako decyzje produktu D-254, D-357, D-358 i D-359, wycofane 2026-11-14 do skilla loop2-play
status: draft
created: 2026-11-16
updated: 2026-11-16
tags: [zadanie]
related: "the note of the Loop project in the author's notes"
---

# Przywrócić w loop2 jako decyzje produktu D-254, D-357, D-358 i D-359, wycofane 2026-11-14 do skilla loop2-play

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- 2026-11-14 loop2 wycofał z dziennika decyzji D-254 (Playwright CLI jako droga agenta do gry, Playwright MCP tam, gdzie CLI zawodzi, ruch czytany ze strumienia klatek), D-357 (zrzuty ekranu cyklu w publicznym repozytorium `mariusznazar/screenshots`), D-358 (agent sam wypycha zrzut kontem `gh` właściciela) i D-359 (Playwright MCP tylko z sesji uruchomionej w worktree cyklu) jako „instrukcje dla agenta, nie decyzje produktu”, a ich reguły zostały tylko w skillu `loop2-play`.
- the way rozstrzygnęło 2026-11-15, że odpowiedź na sprawę drogi agenta do działającego produktu — logi, interfejs, dane deweloperskie, miejsce zrzutów — jest decyzją produktu, choć mówi agentowi, jak pracować, a skill produktu trzyma kroki obsługi i powołuje się na tę decyzję.
- Przypięte the way szuka drogi i miejsca zrzutów w fundamencie produktu: gdy fundament nie ustala miejsca zrzutów, autor zmiany ekranu ogląda zrzut sam, a prośba o scalenie nie pokazuje żadnego (WAY-316, akapit drugi). Bez tych decyzji cykl loop2, idąc dosłownie za the way, nie pokaże Mariuszowi zrzutu w opisie prośby, choć miejsce istnieje i skill je opisuje.
- Wycofanie zabrało też powody i odrzucone drogi tych wyborów (np. dlaczego Playwright, a nie Chrome DevTools MCP; dlaczego repozytorium publiczne, a nie prywatne), a skill dostał z nich po jednym zdaniu.

### To do

1. Wpisać do `foundations/decisions.md` cztery decyzje odpowiadające na pytania D-254, D-357, D-358 i D-359, każdą pod nowym, kolejnym wolnym numerem, z brzmieniem, polami, *Rationale* i *Rejected* takimi, jakie stały w dzienniku przed wycofaniem (`git show 1a56e519^:foundations/decisions.md`, wpisy `### D-254`, `### D-357`, `### D-358`, `### D-359`), z odwołaniami do D-254 i D-357 w *Relations* i treści zamienionymi na nowe numery.
2. W tabeli `## Withdrawn identifiers` dziennika decyzji, w wierszach D-254, D-357, D-358 i D-359: w kolumnie *Successors* wpisać nowe numery z punktu 1, a *Why* przepisać tak, by nie twierdziło, że to nie decyzja produktu ani że reguła stoi w skillu — np. „withdrawn when it was taken for an instruction to the agent; its question is answered again by <nowy numer>”.
3. Postawić cztery nowe decyzje w sekcji „The gate, test tools and the local start” dziennika decyzji, a do jej zdania opisującego „How the full gate runs its stages, Docker and the test tools, and what the local start gives an agent that checks the game.” dopisać miejsce zrzutów, które agent pokazuje człowiekowi (np. „and where the screenshots an agent shows the human lie”).
4. Wpisać do `foundations/environment_facts.md` fakty, na których te decyzje stały i które wycofano razem z nimi (`git show 1a56e519^:foundations/environment_facts.md`: `playwright-cli-token-use`, `playwright-cli-config-path`, `playwright-cli-context-options`, `playwright-screencast-frames`, `chrome-devtools-ignore-certificate-errors`, `screenshots-repository-visibility`, `playwright-mcp-persistent-profile`, `playwright-cli-workspace-directory`, `playwright-cli-sessions-per-workspace`), każdy pod nowym identyfikatorem, który — jak każe szablon faktów („The identifier names what the fact is about, never its value or the edition it cites”, `.the-way/elements/environment-facts/template.md`, „Where entries go”) — nazywa, czego fakt dotyczy, a nie to, że wrócił; źródła zamrożone w konkretnej wersji przechodzą z dawną datą odczytu, a `screenshots-repository-visibility`, czytane z żywego adresu API, dostaje nową datę tylko po ponownym odczycie; w *Based on* nowych decyzji te nowe identyfikatory, a w tabeli `## Withdrawn identifiers` pliku faktów w kolumnie *Successors* dziewięciu wierszy — nowe identyfikatory.
5. Przywrócić odwołania, które wycofanie usunęło: *Relations* D-347 dostaje z powrotem `derives from` nowego numeru D-254; zdanie *Rationale* D-264 otwierane „What the imitation does not prove stays with a person and an agent (D-88)” (około linii 1264) wraca do `(D-88, <nowy numer D-254>)`; komentarz na początku `tests/view/scene.test.mjs` „motion are read from a stream of frames in the browser (D-88)” wraca do `(<nowy numer D-254>, D-88)`.
6. W skillu `loop2-play`, w obu kopiach (`.claude/skills/loop2-play/SKILL.md`, `.agents/skills/loop2-play/SKILL.md`), usunąć zdania powodów dodane 2026-11-14 (commity `65d858b9` i `4398d136`) — fragment „a changed journey, real events and focus stay checked by a person (D-75, D-88), and a Playwright test kept in the repository would be the permanent test of them that those decisions defer” w akapicie otwieranym „This inspection adds to what a person checks”; akapit „Playwright CLI is the first way because its maker recommends it” w sekcji „Operate the game with Playwright CLI”; zdania od „The owner accepts a request by seeing the screen in its description” do „which every clone downloads.” i fragment „a hand-over to the human would put a step of the human into every cycle that shows a screen” w sekcji „Show a screenshot to the human” — a tam, gdzie skill podaje reguły nowych decyzji, powołać się na nie numerem: akapit otwierany „`npm run local` builds the game” i sekcja „Operate the game with Playwright CLI” (D-254), sekcja „Show a screenshot to the human” (D-357, D-358), sekcja „Where the CLI fails: Playwright MCP” (D-359).

### Questions to settle

- Czy droga agenta do działającego produktu i miejsce zrzutów ekranu muszą stać w fundamencie produktu, czy mogą stać w skillu produktu? (pytanie przeniesione z zadania the way o metodzie testowania w działającym produkcie, gdzie padła odpowiedź)
  - Answer: muszą stać w fundamencie produktu, a the way dopisuje zdanie, które to mówi: odpowiedź na sprawę drogi agenta do działającego produktu (logi, interfejs, dane deweloperskie, miejsce zrzutów) jest decyzją produktu, choć mówi agentowi, jak pracować; skill produktu może trzymać kroki obsługi i powołuje się na tę decyzję. loop2 przywraca D-254, D-357, D-358 i D-359 w osobnym zadaniu.
  - Not chosen:
    - mogą stać w skillu — krok technologii musiałby szukać ich także w skillach; zmiana WAY-121, WAY-165, WAY-316, WAY-319, `ui_check.md`, szablonu opisu PR-a, skilla recenzji, `running_product.md`, `research.md` i słownika, około dziesięciu plików więcej; wybory z kosztem (Playwright zamiast innej drogi, publiczne repozytorium na zrzuty) tracą uzasadnienie i odrzucone opcje, bo skill daje regule jedno zdanie powodu; przegląd fundamentu nie czyta skilli
    - muszą stać w fundamencie, a the way niczego nie dopisuje, tylko loop2 przywraca decyzje — następny produkt zastosuje pytanie 1 szablonu decyzji tak samo jak loop2 i znowu je wycofa
  - Source: zadanie the way o metodzie testowania w działającym produkcie (identyfikator `the-way-metoda-testowania-w-produkcie`), *Questions to settle*; doradca dnia w imieniu Mariusza, 2026-11-15: „1 c, 2 a, 3 a”
- Co ze zdaniami powodów, które 2026-11-14 przeniesiono z wycofanych decyzji do skilla `loop2-play` (commity `65d858b9` i `4398d136`), gdy decyzje wrócą z pełnymi *Rationale* i *Rejected*?
  - Answer: usunąć zdania dodane 2026-11-14; w skillu zostają kroki i powołania na nowe numery decyzji, powód stoi w jednym miejscu, zgodnie z regułą the way o skillu produktu, który cytuje decyzję.
  - Not chosen:
    - zostawić zdania i dopisać powołania — każda zmiana decyzji wymaga poprawki obu kopii skilla, a kopia bez poprawki po cichu mówi nieaktualny powód
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a […] Powód 1: powód w jednym miejscu, zgodnie z regułą the way o skillu produktu, który cytuje decyzję.”
- Czy w tym zadaniu przesunąć przypiętą wersję the way na commit, który ma już wyjątek w pytaniu 1 szablonu decyzji?
  - Answer: nie; przypięcie zostaje na `bfb2e109`, a do czasu jego przesunięcia rozbieżność z pytaniem 1 przypiętego szablonu decyzji opisuje zdanie w *Context*.
  - Not chosen:
    - przesunąć przypięcie w tym zadaniu — cykl i jego przegląd obejmują 94 pliki the way niezwiązane z zadaniem, a linia o zmianie „Gate record” wymaga przesunięcia za zadanie the way jeszcze w toku
    - osobne zadanie na przesunięcie, na które to czeka — przywrócenie się opóźnia, a do tego czasu cykle loop2 zmieniające ekran nie pokazują zrzutu w prośbie
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a. […] Powód 2: przesunięcie przypięcia o 94 pliki rozdęłoby cykl; zdanie w Kontekście dokumentu wystarczy do czasu przesunięcia.”
- Co z *Why* czterech wierszy tabeli wycofanych numerów, które mówią „it was an instruction to the agent, not a decision of the product; its rule […] stands in the skill `loop2-play`”, skoro decyzje wracają?
  - Answer: przepisać *Why* w czterech wierszach, tak by nie przeczyło przywróconym decyzjom.
  - Not chosen:
    - zostawić *Why* jako historię wycofania — plik mówi dwie sprzeczne rzeczy, a przegląd fundamentu, który czyta przypięty szablon, dostaje gotowy argument za ponownym wycofaniem
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „1 a. Powód 1: plik nie może przeczyć sam sobie, a zdanie o niedecyzji to gotowy argument dla przeglądu 13.12.”
- W której sekcji dziennika decyzji stoją decyzje o zrzutach (dawne D-357 i D-358), skoro zdanie sekcji „The gate, test tools and the local start” nie obejmuje miejsca zrzutów?
  - Answer: wszystkie cztery decyzje w tej sekcji, a jej zdanie dostaje dopisek o miejscu zrzutów, które agent pokazuje człowiekowi.
  - Not chosen:
    - zostawić wybór sekcji cyklowi — cykl wstawi zrzuty pod zdanie, które ich nie obejmuje, albo szuka innej sekcji, a w dzienniku nie ma sekcji o pracy agenta
  - Source: doradca dnia w imieniu Mariusza, 2026-11-16: „2 a. […] Powód 2: cała droga agenta do gry w jednej sekcji, wybór na ślepo zostawiony cyklowi to luka.”

## Context

- Wycofanie: commit `1a56e519` (2026-11-14), scalony prośbą https://github.com/mariusznazar/loop2/pull/99; tam też stoją pełne brzmienia czterech decyzji i dziewięciu faktów.
- Numer wycofany nigdy więcej nie nazywa decyzji, a identyfikator wycofany — faktu: „A withdrawn number stays withdrawn: it never names a decision again, and nothing refers to it.” (`.the-way/elements/decisions/template.md`, „Withdrawn numbers”, bfb2e109) i „A withdrawn identifier stays withdrawn: it never names an entry again.” (`.the-way/elements/common/rules.md`, „Withdrawn identifiers”, bfb2e109). Dlatego „przywrócić” znaczy: te same pytania i odpowiedzi pod nowymi numerami.
- Rozstrzygnięcie the way, na które zadanie czekało: zadanie the way o metodzie testowania w działającym produkcie, odpowiedź na pytanie „Czy droga agenta do działającego produktu i miejsce zrzutów ekranu muszą stać w fundamencie produktu, czy mogą stać w skillu produktu?” — „muszą stać w fundamencie produktu […] loop2 przywraca D-254, D-357, D-358 i D-359 w osobnym zadaniu” (Mariusz przez doradcę dnia, 2026-11-15, „1 c”); scalone w the way prośbą #145 (commit `604907c8`).
- Przypięta w loop2 wersja the way (`bfb2e109`) ma jeszcze pytanie 1 szablonu decyzji bez wyjątku: „1. "Is it an instruction for how an agent works?" — it goes to a skill or an instruction file.” (`.the-way/elements/decisions/template.md`, „Where it goes”, około linii 147). Wyjątek dla drogi agenta do działającego produktu stoi dopiero w the way od `604907c8`, 159 commitów za przypiętym.
- Do przesunięcia przypięcia agent, który przypiętym pytaniem 1 skieruje cztery nowe decyzje do skilla (cykl tego zadania, przegląd fundamentu), stoi wobec wyboru Mariusza zapisanego w tym dokumencie: to decyzje produktu, a skill trzyma kroki i powołuje się na nie.
- Ta sama przypięta wersja każe już szukać drogi i miejsca zrzutów w fundamencie produktu (WAY-121, WAY-316, WAY-319); sprzeczność leżała w the way, nie w loop2.
- Od wycofania skill `loop2-play` zmienił się tylko o zdania powodów (commity `65d858b9`, `4398d136`); reguły w skillu są dziś takie, jak w wycofanych decyzjach.
- D-361 (czytanie konfiguracji SSH roota jako liczby linii, skill `loop2-deploy`), wycofana tym samym commitem, nie dotyczy drogi agenta do działającego produktu i zostaje wycofana.
- `Defect introduced by: none`: wycofanie poszło za pytaniem 1 przypiętego szablonu decyzji, a powrót wynika z nowej reguły the way, nie z błędu prośby #99.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- **D-75** — „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually.” Przywracana decyzja drogi do gry dodaje się do tego sprawdzenia i żadnego nie zastępuje; zadanie D-75 nie zmienia.
- **D-88** — „Real browser events, focus and SVG rendering are checked manually after a change and are not automated; tests on a hand-made document model or on a ready-made document imitation prove only the logic they run, never real events, focus or rendering.” Jak przy D-75; zadanie D-88 nie zmienia.
- **D-264** — „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document.” Zadanie zmienia jej *Rationale*: zdanie „What the imitation does not prove stays with a person and an agent (D-88)” wraca do `(D-88, <nowy numer D-254>)` (*To do* 5); zdań wiążących nie zmienia.
- **D-347** — „An agent learns what went wrong in the game running in the browser from what a player reads, the screen and the chronicle, and from the browser's console, through the browser it operates, with no outside service.” Zadanie zmienia jej *Relations* z „derives from D-323 · derives from D-253” na takie, które obejmują `derives from <nowy numer D-254>` (*To do* 5); zdań wiążących nie zmienia.
- **D-362** — „No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.” Repozytorium `mariusznazar/screenshots`, które nazywa przywracana D-357, jest publiczne, więc reguła go nie wyklucza; zadanie D-362 nie zmienia.

## Settlements to record

Candidates: 9 shown, 4 accepted — 2026-11-16

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Agent obsługuje działającą grę w prawdziwej przeglądarce przez Playwright CLI, a przez Playwright MCP tam, gdzie CLI zawodzi, i czyta ruch ze strumienia klatek; to sprawdzenie dodaje się do sprawdzeń D-75 i D-88 i żadnego nie zastępuje — decyzja produktu w brzmieniu wycofanej D-254. | decision | pytanie „Czy droga agenta do działającego produktu i miejsce zrzutów ekranu muszą stać w fundamencie produktu…”; *To do* 1 | czy wpisać to do dziennika, czy — idąc za pytaniem 1 przypiętego szablonu decyzji — zostawić tylko w skillu |
| 2 | Zrzuty ekranu, które cykl pokazuje człowiekowi, leżą w publicznym repozytorium `mariusznazar/screenshots`, w katalogu `loop2/<cykl>` na gałęzi `loop2/<cykl>`, a opis prośby osadza je linkiem do pliku w konkretnym commicie z `?raw=true` — decyzja produktu w brzmieniu wycofanej D-357. | decision | jak w wierszu 1 | jw.; a za WAY-316 akapit drugi: czy prośba w ogóle pokazuje zrzut |
| 3 | Agent, który pokazuje zrzut, sam wypycha go do `mariusznazar/screenshots` kontem `gh` właściciela, bez kroku człowieka — decyzja produktu w brzmieniu wycofanej D-358. | decision | jak w wierszu 1 | jw. |
| 4 | Agent używa Playwright MCP tylko z sesji uruchomionej w worktree swojego cyklu — decyzja produktu w brzmieniu wycofanej D-359. | decision | jak w wierszu 1 | jw.; czy warunek WAY-319 o dwóch cyklach bez wspólnej przeglądarki ma w loop2 odpowiedź w fundamencie |

## Out of scope

- Przesunięcie przypiętej wersji the way (`.the-way`).
