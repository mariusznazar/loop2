---
title: "loop2: szkielet progresji — tabela stopni, map z nową regułą i ścian drabiny oraz pojęcie ściany w słowniku gry"
status: draft
created: 2026-11-20
updated: 2026-11-20
tags: [zadanie]
related: "the project's note"
---

# loop2: szkielet progresji — tabela stopni, map z nową regułą i ścian drabiny oraz pojęcie ściany w słowniku gry

Status: ready for cycle
Project relation: plan item: plan_projektu_2_loop2.md — szkielet-progresji
Defect introduced by: none

## Description

### Need

- Pozycje 3–11 zakresu projektu (rana i opatrunek, kamień i tłuk, przedmioty jako egzemplarze, katalog przedmiotów, czary i mapy maga, mechanizm, ściany i stopnie drabiny) nie mają wspólnej podstawy: nigdzie nie stoi, w jakiej kolejności idą stopnie, mapy z nową regułą i ściany drabiny, o co pyta każda ściana, co na to odpowiada i skąd się to bierze.
- Bez tej podstawy każde z zadań 3, 4, 6, 9, 10, 11, 12, 13 i 14 planu ustalałoby to osobno przy własnym doprecyzowaniu, a ustalenia nie musiałyby do siebie pasować.
- Tabelę szkieletu układa i przyjmuje się w doprecyzowaniu tego zadania (pytanie 1), więc cykl dostaje już tylko wpis do słownika gry.
- Słownik gry loop2 nie ma pojęcia ściany, na którym stoją wpisy projektu o ścianach i zadania, które je budują (6, 9, 13, 14).
- Dwa pytania definicji projektu — co daje sama pętla i czy czekanie na wskrzeszenie zostaje — rozstrzygnęło doprecyzowanie tego zadania (pytania 2 i 4); zmianę gry, która z rozstrzygnięć wynika, niesie zadanie 24 planu.
- Zadanie służy celowi projektu — gra jedną postacią ma nie kończyć się po kilku dobach — bo drabina około trzydziestu map potrzebuje szkieletu, zanim powstaną jej mapy.

### To do

1. Wpisać do słownika gry (`foundations/glossary.md`) pojęcie `wall` w brzmieniu rzutowanym z definicji projektu, przytoczonym w „Decisions in play”: nowy wpis `## wall` na końcu pliku, po wpisie `## overlay`, z samym zdaniem definicji i wierszem `- **Not:** none`. Zdanie „Meaning (pl)” do pliku nie wchodzi — jest zdaniem znaczenia z definicji projektu, a wpis słownika pisze się po angielsku.

### Questions to settle

- Pytanie 1. Kto układa tabelę szkieletu progresji i kiedy Mariusz ją przyjmuje: w doprecyzowaniu tego zadania, przed cyklem, czy w cyklu, w prośbie o scalenie?
  - Answer: W doprecyzowaniu, przed cyklem. Agent doprecyzowania proponuje tabelę, Mariusz ją poprawia i przyjmuje razem z dokumentem zadania, a przyjętą tabelę zapisuje agent jako notatkę obok definicji projektu. Cykl tabeli nie układa ani nie zapisuje.
  - Not chosen:
    - W cyklu: agenci cyklu układają tabelę ze źródeł i pokazują ją w opisie prośby o scalenie, a Mariusz sam przepisuje ją do notatki — wybory o ścianach podejmują agenci bez Mariusza, poprawki idą jako uwagi do prośby i kolejne obiegi cyklu, dziewięć zadań, które czekają na tabelę, da się doprecyzować dopiero po scaleniu tej prośby, a przepisanie tabeli do notatek jest ręczne.
  - Source: human, 2026-11-20, „4 niech będzie a” (pytanie pokazane Mariuszowi jako 4)
- Pytanie 2. Czy pętla zarobkowa daje coś nowego rodzaju, co gracz zyskuje tylko w niej i co rozwija progresję w innej osi niż rozwiązywanie map, z własną ścianą w tej osi?
  - Answer: Nie w tym projekcie. Pętla daje to, co dziś — wprawę i przedmioty ponad jednorazową wypłatę pierwszego rozwiązania mapy — i nic nowego rodzaju; sprawa wraca przy następnym projekcie, razem z kolejnymi postaciami i synergiami. Nowy wpis do fundamentu z tej odpowiedzi nie powstaje, bo co płaci pętla, mówią już D-189 i D-239. Z odpowiedzią na pytanie 3 tylko swoja zostaje pętli wprawa.
  - Not chosen:
    - Tak: rzecz zdobywana tylko w pętli i ściana, która o nią pyta — nowa mechanika, której plan nie ma, wracająca do planu jako osobne zadanie; taka ściana jest z natury czekaniem, bo pętla idzie czasem realnym, więc musi stać poza drabiną map, a zakres projektu zapisał, że tam, gdzie czekanie daje dużo, „lepszy program przegrywa z czekaniem”.
  - Source: human, 2026-11-20, „3a” (pytanie pokazane Mariuszowi jako 3)
- Pytanie 3. Co kosztuje nieudana próba ściany gracza, który nie chce czekać — skąd bierze on drugi raz rzecz, o którą ściana pyta?
  - Answer: Zapas zdobywany grą. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki i wynosi przedmioty do skrzynki, a wprawy dalej nie płaci. Nieudana próba ściany kosztuje wniesiony zapas, a po następny gracz idzie sam na rozwiązaną mapę albo czeka na pętlę. Zmianę reguły niesie zadanie 24 planu.
  - Not chosen:
    - Rzecz zawsze na samej ścianie: to, o co ściana pyta, albo jego składniki da się zebrać i zrobić w jej własnym przejściu, a skrzynka tylko ułatwia — bez zmiany reguł gry, ale nieudana próba nie kosztuje wtedy nic poza pół minuty, więc ściana pada po kilku ponowieniach bez rzeczy, o którą pyta, a ściany starego Loopa oparte na „przynieś z innej mapy” trzeba ułożyć inaczej.
    - Czas, jak dziś: zapas ponad jednorazową wypłatę daje tylko pętla, a zasada o nieobecności dotyczy pierwszej próby, nie powtórek — po każdej porażce ze stratą zapasu gracz czeka godziny, a zastrzeżenie trzeba dopisać do zatwierdzonego wpisu definicji, czyli wrócić do definicji i ją ponownie zatwierdzić.
  - Source: human, 2026-11-20, „1a” (pytanie pokazane Mariuszowi jako 1)
- Pytanie 4. Czy czekanie na wskrzeszenie (osiem godzin realnych, D-190) zostaje, skoro nieobecność nie może być wymagana?
  - Answer: Wskrzeszenie zmienia kształt w dwóch etapach. W tym projekcie konto dostaje od początku gry wskrzeszenie o liczbie użyć i czasie odnowienia jednego użycia, zapisanych w danych gry; to liczby konta, nie przedmiot w plecaku ani w wyposażeniu postaci, a słowo „artefakt” jest sprawą nazwy i wyglądu. Ile użyć i jak długie odnowienie, ustala doprecyzowanie zadania 24 planu, które niesie zmianę. Drugi etap — przywracanie użycia wytwarzaniem — nie wchodzi do tego projektu. Plan stawia to pytanie przy zadaniu 24 (sekcja „Open questions”); ten dokument trzyma odpowiedź jako zapis, z którego zadanie 24 przepisuje ją razem ze źródłem i odrzuconymi wariantami.
  - Not chosen:
    - Zostaje bez zmian, osiem godzin realnych albo pierwsze rozwiązanie nowej mapy — po każdej śmierci na ścianie ostrożny gracz czeka do ośmiu godzin, a ocena programu na ziarnach zmniejsza liczbę porażek, ale nie czekanie po porażce.
    - Stawka tylko w pętli: śmierć w przejściu ręcznym zabiera to, co postać niosła, i nic więcej — zmienia D-190, które ten wariant odrzuciło („one event would be two different deaths, everything risky would be done by hand and the stake would vanish where it matters most”), oraz D-216 i D-217; ręczna próba ściany traci stawkę dorobku, a jedno zdarzenie, śmierć, ma dwa różne skutki.
    - Krótszy zegar: reguła zostaje, zmienia się jedna liczba w danych gry — czekanie zostaje, tylko krótsze, więc czas realny dalej jest ceną postępu.
    - Kształt Mariusza bez dalszej drogi przez wytwarzanie — jedna zmiana i koniec; zegar zostaje ceną na stałe.
    - Od razu pełny wytwarzany przedmiot — da się dopiero po zadaniach 5 i 10, a do tego czasu obowiązuje dzisiejsze osiem godzin.
    - Wskrzeszenie jako prawdziwy przedmiot z własnymi liczbami — czekałby na zadania 8 i 10.
  - Source: human, 2026-11-20: „2d, ale nie jestem pewny jak by miało być to wytwarzane - raczej nie będzie na to zasobów na tak początkowym etapie gry i może to być np. przedmiot z ograniczoną ilością użyć i czasem odnowienia, który dostajemy z odpowiednimi parametrami na początku gry; co myślisz?”; „1. nie sądzę, żeby później nastąpiło w ramach tego projektu; wskrzeszenie to bardzo potężny artefakt nie? nie może być craftowany na poczatku gry z piórek i jajek ale tak, dwa etapy, tylko drugi nie będzie robiony teraz”; „4 niech będzie a, chociaż mam wrażenie, że próbowałeś mnie przekonać do czegoś odwrotnego” (pytanie, czy wskrzeszenie jest w tym projekcie przedmiotem); przeniesienie pytania do zadania 24: plan_projektu_2_loop2.md, sekcja „Open questions”, sha256 14799cbd724ef545 (pierwsze 16 znaków), przyjęte przez Mariusza 2026-11-20: „ok dla wszystkich dotychczas”
- Pytanie 5. Gdzie zmieniają się reguły gry, które wynikają z odpowiedzi na pytania 3 i 4?
  - Answer: W osobnym zadaniu planu, dopisanym od razu i doprecyzowanym w tej samej rundzie: zadanie 24 `zapas-i-wskrzeszenie`. To zadanie nie zmienia kodu gry.
  - Not chosen:
    - W tym zadaniu — zadanie przygotowawcze zmienia wtedy dwie główne reguły gry: D-189, D-190, D-179, niezmiennik `solved-map-manual-run`, kilka decyzji o napisach, symulację i jej testy.
    - Do planu teraz, doprecyzowanie w następnej rundzie — mniej czytania teraz, ale zadania 6 i 9 (pierwsze ściany) nie ruszą cyklu, dopóki nowe zadanie nie przejdzie doprecyzowania.
  - Source: human, 2026-11-20: „5 może być i osobne zadanie, ale czy w takim razie nie trzeba go dodać do obecnej paczki już?”; „2. a”; przyjęcie wiersza zadania 24: „3a”
- Pytanie 6. Które zadanie zapisuje do fundamentu zasadę, że postęp nie wymaga nieobecności gracza (wpis „(new) — May the progression require the player's absence?”)?
  - Answer: Zadanie 24. Wpis wchodzi do fundamentu razem z regułą ręcznego przejścia, która go spełnia, a zadania 1 i 24 nie czekają na siebie. Zadanie 1 nie zapisuje tego wpisu ani go nie realizuje; w fundamencie zostaje mu samo pojęcie ściany.
  - Not chosen:
    - Zadanie 1 — zadanie 24, a za nim cały łańcuch map, czeka wtedy na przyjęcie tabeli szkieletu (koszt poprawiony przy przekazaniu zmian planu 2026-11-20: zadania z mapami czekają na zadanie 1 w obu wariantach, a różnica dotyczy zadań 24 i 2).
  - Source: human, 2026-11-20: „do pozostałych nie mam uwag”, a na odczytanie tego jako wariantu a: „3. dobrze zrozumiałeś”; poprawiony koszt wariantu b przyjęty razem ze zmianami planu: „ok dla wszystkich dotychczas”
- Pytanie 7. Czym w tabeli szkieletu jest Las — głębiej: mapą, która wnosi nową regułę do warunku rozwiązania (walkę), czy ścianą, która pyta o zapas ze skrzynki?
  - Answer: Mapą z nową regułą w warunku rozwiązania — trzecim rodzajem obok stopni i ścian. Wnosi walkę do warunku rozwiązania (pobite napaści wilka), a zapas ze skrzynki tylko poprawia wynik; jako ściany się go nie mierzy. Zatwierdzona definicja niesie takie mapy we wpisie o mapach (pytanie 12).
  - Not chosen:
    - Ścianą, która pyta o zapas ze skrzynki — bez zapasu miałaby przechodzić rzędu 20–30%, więc trzeba by ją dziś zmierzyć i być może zmienić jej liczby (D-388), czego żadne zadanie planu nie niesie; zapas to patyki i jagody, które gracz ma od pierwszej mapy, więc ściana nie pytałaby o nic nowego, wbrew hasłu „ściana” z definicji, co wymagałoby też zmiany tego hasła.
  - Source: human, 2026-11-20, „2. ok” na listę ustawień domyślnych pokazaną do weta, w której stało: „Las — głębiej i Zbocze to «mapy z nową regułą», nie ściany. Nowa reguła siedzi w ich warunku rozwiązania, a definicja dostaje o takich mapach jedno zdanie w tym samym przeglądzie.”; wariant odrzucony według zapisu prowadzącego projekt w rozmowie doprecyzowania, z kosztem z pytania tam pokazanego
- Pytanie 8. Która mapa jest ścianą zadania 9 i czym w tabeli jest Zbocze?
  - Answer: Ścianą zadania 9 jest jar. Zbocze jest mapą z nową regułą w warunku rozwiązania (liczba sztuk kamienia w plecaku w chwili domknięcia); zadanie 9 sprawdza je tylko pod tym, czy daje się rozwiązać, zaraz po zbudowaniu jego warunku, a w paśmie 20–30% mierzy sam jar bez tłuka.
  - Not chosen:
    - Jar i Zbocze: Zbocze jako ściana, która pyta o opatrunki wniesione, bo mchu na nim nie ma — drugi pomiar ściany w zadaniu 9 i być może zmiana liczb Zbocza, a Zbocze pytałoby o ten sam przedmiot co wataha, tylko na innej odnodze drabiny.
  - Source: human, 2026-11-20, „2. ok” na listę ustawień domyślnych pokazaną do weta, w której stało: „Ścianą zadania 9 jest jar. Zbocze sprawdzamy tylko pod kątem tego, czy da się je rozwiązać.”; wariant odrzucony według zapisu prowadzącego projekt w rozmowie doprecyzowania
- Pytanie 9. Czy Las — matecznik jest w tym projekcie ścianą drabiny zbudowaną i zmierzoną w zadaniu 14, miarą poza drabiną, czy rozstrzyga to doprecyzowanie zadania 3?
  - Answer: Rozstrzyga to doprecyzowanie zadania 3. Matecznik zostaje ścianą według pozycji 1 definicji i staje w katalogu map z liczbą od zadania 3; o co pyta, co na to odpowiada i czy w tym projekcie ma się dać go rozwiązać, ustala poprawka tabeli przy doprecyzowaniu zadania 3, którą Mariusz przyjmuje.
  - Not chosen:
    - Ścianą drabiny zbudowaną i zmierzoną w zadaniu 14 — zmiana planu teraz i więcej pracy w zadaniu 14; matecznik przestaje być celem na tygodnie i staje się jedną ze ścian.
    - Miarą poza drabiną, z liczbą w katalogu, ani stopniem, ani ścianą — wymaga zmiany brzmienia pozycji 1 definicji („nie tylko jako ściana”), czyli jej ponownego zatwierdzenia; matecznik może zostać nie do przejścia do końca projektu.
  - Source: human, 2026-11-20, „2. ok” na listę ustawień domyślnych pokazaną do weta, w której stało: „O mateczniku zdecydujemy przy zadaniu 3: czy da się go rozwiązać w tym projekcie i o co pyta.”; warianty odrzucone według zapisu prowadzącego projekt w rozmowie doprecyzowania
- Pytanie 10. Które mapy otwierają Pustkowie i Martwą strefę?
  - Answer: Ustala to doprecyzowanie zadania 13, przez poprawkę tabeli, którą Mariusz przyjmuje. Sugestia Mariusza na tę chwilę: Las otwiera Pustkowie, a jar Martwą strefę — „chyba, że coś po drodze sprawi, że bedzie lepiej inaczej”.
  - Not chosen:
    - Jak w starej grze: Las otwiera Pustkowie, a Pustkowie Martwą strefę — gracz, który poszedł odnogą maga, staje przed Martwą strefą, zanim jego odnoga dała tłuk i opatrunki.
    - Cała odnoga za jarem: jar otwiera Pustkowie, a Pustkowie Martwą strefę — znika wybór drogi po drugiej mapie, a Pustkowie pojawia się dopiero po kamieniu i tłuku.
  - Source: human, 2026-11-20: „1. d z sugestią b, chyba, że coś po drodze sprawi, że bedzie lepiej inaczej”
- Pytanie 11. Ile ścian wnosi zadanie 14 i co tabela mówi o nich przed zadaniem 11?
  - Answer: Orientacyjnie trzy ściany: jedna pyta o przedmiot z katalogu, jedna o czar, jedna o pomysł programu, który poprawia wynik i nie jest warunkiem rozwiązania. Liczba jest przypuszczeniem; o co dokładnie pytają, dopisuje poprawka tabeli przy doprecyzowaniu zadania 14.
  - Not chosen:
    - Wszystko do doprecyzowania zadania 14 — zadania 11 i 16, doprecyzowane wcześniej, nie wiedzą, ile miejsca w drabinie zostaje na stopnie ani czy któraś ściana zapyta o przedmiot z katalogu.
    - Pełne ściany teraz — kolejna runda pytań, a przedmioty trzeba by wymyślić przed zadaniem 11, które ma je ustalić; duże ryzyko przepisania wierszy.
  - Source: human, 2026-11-20, „2. ok” na listę ustawień domyślnych pokazaną do weta, w której stało: „Zadanie 14 wnosi orientacyjnie trzy ściany: o przedmiot, o czar i o pomysł programu.”; warianty odrzucone według zapisu prowadzącego projekt w rozmowie doprecyzowania
- Pytanie 12. Jeśli tabela ma mapy, które wnoszą nową regułę do warunku rozwiązania (pytania 7 i 8): czy zatwierdzone zdanie definicji „Only a wall asks for something new” zostaje i Mariusz przyjmuje jego odczytanie, czy definicja wraca do ponownego zatwierdzenia ze zdaniem o takich mapach?
  - Answer: Definicja wróciła do ponownego zatwierdzenia i wpis o mapach niesie zdanie o mapach z nową regułą: „A map may differ from the map that opens it by its numbers alone, and it gives the next stage of the progression. Only a wall asks for something new that improves the result; a map may also bring a new rule into its solving condition, which every player meets — combat, or a number of pieces of an item in the backpack — and such a map is neither a wall nor a map that differs by its numbers alone.” Wpis zapisuje zadanie 3.
  - Not chosen:
    - Zdanie zostaje, a Mariusz przyjmuje jego odczytanie, wpisane do dokumentu zadania i notatki z tabelą — nic do zatwierdzania, ale samo zatwierdzone zdanie weszłoby do fundamentu słowo w słowo i kto czyta tylko fundament, zobaczyłby „tylko ściany” bez odczytania.
  - Source: human, 2026-11-20, „2. ok” na listę ustawień domyślnych; zatwierdzenie zmienionej definicji: „zatwierdzam” (2026-11-20); definicja_projektu_2_loop2.md, sekcja „Projected foundation changes”, wpis „(new) — How may a map differ from the map that opens it?”, odcisk e69a87d6
- Pytanie 13. Skąd ma się brać wprawa, której wymaga przejście kolejnych map?
  - Answer: Wystarcza wprawa z pierwszych rozwiązań map. Każda kolejna mapa wymaga wprawy, przedmiotów i wyposażenia przygotowanego zawczasu, ale tej wprawy, którą dały wcześniejsze mapy; wprawa z pętli ułatwia, ale nie jest konieczna. Zatwierdzony wpis o nieobecności gracza zostaje, jak stoi w definicji; zapisuje go zadanie 24 (pytanie 6).
  - Not chosen:
    - Wprawę płaci też ręczne przejście rozwiązanej mapy — zmieniłoby odpowiedź na pytanie 3 i D-189, którego uzasadnienie odrzuciło płacenie za każde domknięcie.
    - Wymagana wprawa z pętli, a zasada tylko ogranicza czekanie — zmiana zatwierdzonego wpisu przez ponowne zatwierdzenie definicji i w małej skali to, co Mariusz nazwał „pomyłką ogromną”.
  - Source: human, 2026-11-20: o samej zasadzie „każdą mapę da się przejść tym, co dały wczesniejsze - ja bym powiedział, że to zależy / czy serio potrzebujemy na to zasady?”; „1. no właśnie wprawa powinna być wymagana do przechodzenia kolejnych map razem z lepszymi przedmiotami i przygotowanym za wczasu wyposarzeniem”; na pytanie z wariantami „1a”; koszty wariantów odrzuconych według zapisu prowadzącego projekt w rozmowie doprecyzowania
- Gdzie stoi tabela szkieletu progresji, skoro cykl zadania pisze tylko w repozytorium?
  - Answer: w notatce w vaulcie obok definicji; cykl zadania 1 wpisuje do fundamentu to, co wiąże agentów — zasadę o nieobecności, pojęcie ściany i rozstrzygnięcia dwóch pytań — i zmienia kod tam, gdzie rozstrzygnięcie zmienia grę (human, 2026-11-20); zmianę reguł gry, która wynika z tych rozstrzygnięć, niesie odtąd osobne zadanie 24 — „może być i osobne zadanie” oraz „2. a” na pytanie, czy wchodzi do tej rundy (human, 2026-11-20) — a zasadę o nieobecności zapisuje do fundamentu zadanie 24 (human, 2026-11-20), więc z tej listy cykl zadania 1 zapisuje już tylko pojęcie ściany: rozstrzygnięcie o wskrzeszeniu wchodzi do fundamentu zmianą D-190 w zadaniu 24, a rozstrzygnięcie o pętli nie dodaje wpisu, bo to, co płaci pętla, mówią już D-189 i D-239.
  - Source: plan_projektu_2_loop2.md, sekcja „Open questions”, sha256 14799cbd724ef545 (pierwsze 16 znaków); human, 2026-11-20
- Kto poprawia tabelę szkieletu progresji po pomiarach, skoro stoi w vaulcie, a cykle piszą tylko w repozytorium?
  - Answer: przy doprecyzowaniu każdego następnego zadania z mapami agent czyta pomiary wcześniejszych map i proponuje poprawkę tabeli, a Mariusz ją przyjmuje.
  - Source: plan_projektu_2_loop2.md, sekcja „Open questions”, sha256 14799cbd724ef545 (pierwsze 16 znaków); human, 2026-11-20

## Context

- Definicja projektu opisuje tabelę w pozycji 14 zakresu: „jedna tabela na cały projekt z kolejnymi stopniami i ścianami drabiny, tym, o co pyta każda ściana, przedmiotem albo umiejętnością, która na to odpowiada, i miejscem, skąd się ją bierze. Bez liczb i bez treści programów; poprawiana po pomiarach.”
- Plan dokłada do tabeli trzeci rodzaj map, który zatwierdził wpis o mapach: mapy z nową regułą w warunku rozwiązania (cel zadania 1 w planie).
- Przyjęta tabela stoi w notatce obok definicji projektu; tę notatkę agent zapisuje po przyjęciu tabeli razem z tym dokumentem (pytanie 1). Cykl tabeli nie czyta i nie zapisuje.
- Materiał do tabeli stoi w notatkach autora, na które powołuje się definicja: `zakres_projektu_2_loop2` (kierunek i paczki) oraz `progresja_loop2`, ustalenia 2.3 (mapy, umiejętności, przedmioty) i 2.4 (paczki i kolejność otwarć map w starej grze).
- Gra w commicie `ba67f045` ma trzy mapy: Skraj lasu, Las i Las — głębiej (`src/browser/sim/data/maps.ts`).
- Plan przypisuje temu zadaniu zapisanie jednego wpisu: pojęcia `wall`. Wpis o nieobecności gracza zapisuje i realizuje zadanie 24 (pytanie 6).
- Na to zadanie czekają w planie zadania 3, 4, 6, 9, 10, 11, 12, 13 i 14.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpis rzutowany z definicji projektu (`definicja_projektu_2_loop2.md`, zatwierdzona 2026-11-20, odcisk e69a87d6, sekcja „Projected foundation changes”), który plan przypisuje temu zadaniu do zapisania:

- `wall` (nagłówek w „Glossary”):

  > A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.
  >
  > - **Not:** none
  >
  > **Meaning (pl):** „Ściana” to mapa, która pyta o coś nowego i bez tego przechodzi rzadko.

Decyzja bieżąca fundamentu w części `product-foundation`, którą dotyka wpis tego zadania:

- D-362 — How does loop2 point to places outside the repository that its readers cannot reach?: „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.”

Wpisy rzutowane z tej samej sekcji definicji, na których stoi tabela szkieletu, a które zapisują inne zadania planu:

- „(new) — How may a map differ from the map that opens it?” (zapisuje zadanie 3): „A map may differ from the map that opens it by its numbers alone, and it gives the next stage of the progression. Only a wall asks for something new that improves the result; a map may also bring a new rule into its solving condition, which every player meets — combat, or a number of pieces of an item in the backpack — and such a map is neither a wall nor a map that differs by its numbers alone.”
- „(new) — How hard is a wall without the thing it asks for?” (zapisuje zadanie 6): „Without the thing it asks for, a wall is solved rarely, in the order of 20–30% of its map runs, and that thing makes it much easier. A wall never refuses to be entered or solved for the lack of that thing.” Z jego uzasadnienia: „The thing a wall asks for is an improvement of the result, not a condition.”
- „(new) — May the progression require the player's absence?” (zapisuje zadanie 24): „The progression never requires the player's absence: time away gives progress and additional things, and each next map can be solved with what the maps before it gave — practice, items, a better program — with no wait for an earning loop to gather more.”
- „D-136 — How is a map solved, and what opens the next one?” (zapisuje zadanie 9), zdanie wiążące: „The condition that solves a map stands in the map's data — a streak, a number of attacks beaten, a number of pieces of an item in the backpack at the completion, alone or together — and a map opens when the map its data names as its opener is solved.”
- „(new) — How does the game judge a program before an earning loop?” (zapisuje zadanie 2), zdanie: „Such a judging is no map run of the character: it takes nothing from the chest, pays nothing and settles no death.”

Decyzje bieżące fundamentu, o których mówią odpowiedzi na pytania 2–4 i 13; to zadanie żadnej z nich nie zmienia — zmianę D-189 i D-190 wynikającą z pytań 3 i 4, razem z D-179, D-214, D-215, D-216, D-217, D-251 i niezmiennikami `solved-map-manual-run` i `resurrection-renewal`, niesie zadanie 24:

- D-189 — What pays, and what takes from the chest?: „A manual map run that first solves its map pays practice and loot once per map for the player, whichever character completes it; a manual run of a solved map pays nothing; an earning-loop run pays loot only on completion; a run that ends in death pays neither loot nor practice. Earned loot reaches the chest on completion; practice earned during an earning loop is gathered there and added to the character skills when the player takes it with „Odbierz”, which adds all of it, the map run going on included, and leaves the backpack and the earning loop as they are, and when the earning loop stops, including practice from a run stopped before its completion without death. A manual map run of a map already solved takes nothing from the chest: it takes its equipment from nowhere, cut only by the character's carrying capacity and the map's cap, and the card of the map marks it, under „Wejdź” at the character in „Kto idzie”, as not predicting the earning loop when the chest lacks that equipment (D-251).”
- D-190 — What does a character's death take?, zdanie o wskrzeszeniu: „The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death of a character with practice with none ready stops its earning loop, and it is renewed after a span of real time set in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once for each map, a ready resurrection staying ready.”
- D-194 — When does a manual map run pay its practice to its character?: „A manual map run holds the practice it gathers separately by character skill and pays all of it once to the character making the run in the game minute of the completion that first solves its map, while a manual run of a solved map keeps its practice with the run. A run cut short by „Restart” or „Zakończ” before completion leaves the character’s practice and bought ranks as they were.”
- D-239 — How fast does the earning loop go?: „An earning loop goes only on a solved map, one game minute per real minute, and the speed control does not reach it, while a manual map run may be fast-forwarded. Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on. Solving a map unlocks its earning loop without certifying that the chosen program survives every seed.”

## Settlements to record

Candidates: 8 shown, 0 accepted — 2026-11-20

none

## Out of scope

- Liczby map, progi i treść programów: tabela ich nie niesie (definicja, pozycja 14 zakresu).
- Budowa map, przedmiotów, czarów i mechanizmu drabiny: robią to zadania 3–16 planu.
- Zmiana reguł gry wynikająca z odpowiedzi na pytania 3 i 4: niesie ją zadanie 24 planu.
- Poprawki tabeli po pomiarach: proponuje je agent przy doprecyzowaniu każdego następnego zadania z mapami.
