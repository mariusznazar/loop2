<!-- Frozen copy. Original path: C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\stan_i_powod_przy_regule_loop2.md. Approved: Status ready for cycle, plan_mvp2_loop2.md item 11, definition fingerprint 9641f804 (approved 2026-11-03); frozen 2026-11-05. -->
---
title: "Stan i powód przy regule w ręcznym przejściu"
status: draft
created: 2026-11-03
updated: 2026-11-03
tags: [zadanie]
related: ["[[(P) Loop]]"]
---

# Stan i powód przy regule w ręcznym przejściu

Status: ready for cycle
Project relation: plan item: plan_mvp2_loop2.md — stan-i-powod-przy-regule

## Description

### Need

- Mariusz o programie w loop2, 2026-11-03: „nie widzę chyba w programie sygnalizacji kolorystycznej tego jaka reguła jest wykonywana, jaka będzie następna i które w danym momencie są spełnione - to była w loop jedna z wazniejszych dla mnie rzeczy dotyczących czytelności programu”.
- Definicja projektu, *Risks*: Mariusz wskazuje przyczynę tego, że mapy nie są dla niego grywalne: „nie wiem co się dzieje i dlaczego nie wykonują się te reguły, które wydawało mi się, że powinny się wykonać”, a odpowiedzią są pozycje „Stan i powód przy regule” i „Koniec przejścia z wyjaśnieniem”.
- Dziś wiersz reguły w przejściu ma tylko warunek, czynność, licznik i przyciski (`src/browser/view/program-editor.ts:867-925` przy 20d804b); nic nie mówi, która reguła wygra, która trwa, co jest spełnione ani dlaczego reguła nie rusza.
- Funkcja, która wybiera regułę, kończy na pierwszej regule, którą da się wykonać (`src/browser/sim/program.ts:267-284`), a reguły walki wybiera osobna `chooseCombatRule` (`src/browser/sim/program.ts:287-311`), więc dziś nic nie ocenia reguł poniżej wygrywającej.
- D-126 przyjmuje dziś: „a program rule that does not act stands in the program with no sign of why”.

### To do

1. W ręcznym przejściu i na jego ekranie po końcu, do „Restart” albo „Zakończ”, reguła kopii, która wygrywa teraz, stoi na tle `rule-winning`, a reguła, której czynność trwa, gdy to inna reguła, na tle `rule-running` (pytanie 1). Po końcu przejścia oba tła liczy się na zatrzymanej minucie: po śmierci z zimna albo głodu reguła czynności, która trwała w chwili śmierci, stoi na tle `rule-running`, a po śmierci w walce na tym tle nie stoi żadna (pytanie 5). Wiersz otwarty do edycji ma tło `highlight`: tło „wygra teraz” albo „trwa” na czas edycji znika z tego wiersza, a pasek zostaje (pytanie 7). Wiersz pod kursorem, który wygrywa teraz albo którego czynność trwa, zachowuje tło `rule-winning` albo `rule-running`; tło `highlight` pod kursorem stoi tylko na wierszach bez tła stanu (pytanie 8).
2. Przy każdej regule i grupie kopii, także poniżej wygrywającej, stoi pasek: zielony w `positive`, gdy warunek jest spełniony i reguła może ruszyć, a przy grupie, gdy może ruszyć któraś z jej reguł; bursztynowy w `warning`, gdy warunek jest spełniony, ale ruszyć nie może; ciemny, gdy warunek nie jest spełniony, w nowej roli rodzaju `other` o znaczeniu „warunek niespełniony”, z wartością #27272a jak w starym Loop i bez progu kontrastu. Pasek grupy ma te same kolory co pasek reguły. Pasek mówi o stanie i nie bierze koloru tekstu obok (pytania 2 i G).
3. Pasek reguły liczy też warunek jej grupy: w grupie z niespełnionym warunkiem, także w grupie z warunkiem spoza repertuaru postaci, każda reguła ma ciemny pasek i nie podaje powodu.
4. Reguła ze spełnionym warunkiem, której czynności nie da się wykonać, podaje w wierszu jeden powód w `warning` (D-39: „`warning` means caution, that something is not carried out”), w brzmieniu z tabeli pytania 4. Gdy powodów jest kilka, stoi jeden: najpierw walka, potem świat i plecak, na końcu energia natury. Nazwy rzeczy stoją małą literą, tak jak pisze je gra (`src/browser/sim/data/resources.ts:16-19`), bez kropki „·” przed nazwą.
5. Reguła spoza repertuaru postaci jest bursztynowa z powodem „gałąź niewykupiona”, gdy jej czynność należy do gałęzi, której postać nie kupiła, albo „jeszcze nieodkryte: {nazwa}”, gdy warunek, czynność albo cel nie są jeszcze odkryte, także przy niespełnionym własnym warunku, chyba że nie spełnia się warunek jej grupy (punkt 3) (pytanie 4). „gałąź niewykupiona” brzmi tak samo jak przy wyszarzonej komórce w panelu wyboru z zadania 5.
6. Tło, pasek i powód daje ta sama funkcja symulacji, która wybiera regułę: ocenia każdą regułę i grupę kopii, także poniżej wygrywającej i także reguły walki, a repertuar sprawdza przed warunkiem; to, którą regułę postać wykonuje, zostaje bez zmiany. W minutach napaści, od minuty napaści do rozstrzygnięcia tur, znaki pokazują to, co wybrałaby pierwsza tura w tej chwili: reguły walki ocenia ta sama funkcja, która wybiera regułę w turze, przy obecnym zdrowiu maga i wilka; reguła, którą tura by wybrała, stoi na tle `rule-winning`, żadna na tle `rule-running`, a zwykła reguła ze spełnionym warunkiem jest bursztynowa z powodem „trwa walka”. Poza walką reguła walki ze spełnionym warunkiem jest bursztynowa z powodem „tylko w walce” (pytanie 3).
7. Znaki stoją tylko przy kopii przejścia: nie przy programie zapisanym otwartym w trakcie przejścia (D-174), nie na ekranie Programy i nie przy pętli zarobkowej.
8. Plik tokenów `src/browser/tokens.css` dostaje role `rule-winning` z wartością #152a26 i `rule-running` z wartością #152a37 oraz rolę ciemnego paska z wartością #27272a, każdą ze źródłem w komentarzu, jak podaje pytanie 1 i pytanie 2. Test niezmiennika `design-token-contrast` sprawdza pary ról tekstu, `control-border` i `focus` z oboma nowymi tłami; pasek nie dokłada pary, bo `positive` i `warning` mają już próg 4,5:1 wobec pięciu teł, a rola ciemnego paska progu nie ma. Strona wszystkich stanów pokazuje obie role tła i rolę ciemnego paska (przewodnik stylu, „The kitchen-sink page”: „Nowa wspólna kontrolka, nowy stan albo nowa rola trafia na stronę w tej samej zmianie.”).
9. Przewodnik stylu `guidelines/styleguide-browser-view.md` dostaje przez `the-way-maintain-styleguide` oba tła wiersza reguły i rolę ciemnego paska w tabeli *Roles*, przy `positive` i `warning` to, że stoją też jako pasek stanu reguły, a w regułach *Every background with its text* i *Contrast of every pair*, które dziś znają tylko `page`, `panel` i `highlight`, pięć teł i rolę ciemnego paska bez progu.
10. Fundament dostaje wpisy, które zadanie pisze: „What state does a program rule show during a map run?” z wyjątkiem dla wiersza otwartego do edycji (pytanie 7), ze zdaniem o wierszu pod kursorem (pytanie 8) i z przykładem „tu nie leży mech” małą literą (pytanie 4), D-40, D-39 w całości, razem z tym, co zapisało zadanie 5, i z tym, że `positive` i `warning` stoją też jako pasek stanu reguły, który mówi o stanie reguły, nie jest ramką ani belką przy tekście w rozumieniu D-279 i nie bierze koloru tekstu obok (pytania 2 i G), znaczenie roli ciemnego paska w decyzji ról, którą wybierze cykl, i `design-token-contrast` w brzmieniu z definicji; oraz części D-42, które kod zadania czyni prawdziwymi — dwa tła wiersza i rola ciemnego paska bez progu — i część `rule-state-from-pick` o tle, pasku i powodzie. *Rationale* D-126 przestaje mówić „with no sign of why”; D-127 zostaje bez zmiany (pytanie 6). Część D-39 o pasku postępu nad głową maga urzeczywistnia zadanie 7, więc tego zdania to zadanie nie zapisuje; tak samo część D-40 o ikonie czynności nad głową maga, która stoi bez tekstu obok.

### Acceptance criteria

- Zmiana kopii w pauzie i na ekranie po końcu przejścia od razu zmienia tło, pasek i powód przy regułach (wpis o stanie reguły, *Rationale*: „a fix of the copy there shows at once whether a rule would start”).

### Questions to settle

- Pytanie A. Co stoi przy regułach poniżej wygrywającej?
  - Answer: oba tła, `rule-winning` i `rule-running`, oraz pasek warunku przy każdej regule i grupie, także pod wygrywającą; stan „nie sprawdzono” znika, bo to, że reguła nie została osiągnięta, widać po tym, że stoi pod zieloną. Znaki stoją tylko przy kopii w przejściu. Słowa pokazanej drogi: „A. Jak w Loop, z dodanym powodem. Oba tła, a pasek warunku przy każdej regule i grupie, także pod wygrywającą. Stan „nie sprawdzono” znika, bo to, że reguła nie została osiągnięta, widać po tym, że stoi pod zieloną.” oraz „Tak czy inaczej znaki stoją tylko przy kopii w przejściu, jak w Loop.”
  - Not chosen:
    - cztery stany jak w definicji, z tłami — „under the winning rule nothing shows what holds” (zapis orkiestratora w rozmowie zadania 4, tura 6)
    - pasek i słowo „nie sprawdzono” obok siebie — „two signs in one row, and a green bar beside „nie sprawdzono” reads as a contradiction” (tamże)
  - Source: Mariusz, 2026-11-03, „A i A”, odpowiedź na wiadomość o znakach przy regule, którą cytuje tura 9 rozmowy zadania 4 (`C:\Storage\repos\loop2\.runs\project-refinement\ekrany-i-menu.md`); zapis odpowiedzi w turze 6 tej rozmowy; zatwierdzona definicja, wpis „What state does a program rule show during a map run?”, odcisk 9641f804.
- Pytanie B. Które zadanie zapisuje do fundamentu D-39?
  - Answer: D-39 zapisuje zadanie 11, D-44 zadanie 5, a zadanie 24 wychodzi z obu wierszy planu.
  - Not chosen:
    - zostaje zadanie 24 — „Koszt dla gry żaden: proces i tak każe zadaniom 5 i 11 zapisać swoją część, a zadanie 24 zastanie wpisy gotowe. Słaby punkt: plan wskazuje zadanie, które nic tam nie zrobi, więc kto czyta wiersz, szuka zapisu w złym miejscu.”
  - Source: Mariusz, 2026-11-03, „A”, pytanie Q16 rozmowy zadania 4, tury 7 i 8; plan, *Projected entries*, wiersz D-39 („5, 11 | 11”).
- Pytanie C. Co pokazuje reguła spoza repertuaru postaci, gdy jej warunek nie jest spełniony?
  - Answer: zawsze bursztyn z powodem, także przy niespełnionym warunku: „A rule outside the character's repertoire shows amber with that reason whether or not its condition holds.” Koszt podany przy tej drodze: „bursztyn znaczy wtedy „spełniony, ale zablokowana” z jednym wyjątkiem, a funkcja wybierająca sprawdza repertuar przed warunkiem”. Grupy to nie dotyczy: grupa z warunkiem poza repertuarem ma ciemny pasek (D-127).
  - Not chosen:
    - jak każda reguła: ciemny pasek bez powodu, bursztyn dopiero przy spełnionym warunku — „reguła, która nigdy nie ruszy, wygląda jak czekająca na warunek, a to właśnie Twoje „nie wiem co się dzieje i dlaczego nie wykonują się te reguły”; trzeba też ustalić, co znaczy „spełniony” dla warunku poza repertuarem.”
  - Source: Mariusz, 2026-11-03, „zgodnie z rekomendacjami”, pytanie Q19 rozmowy zadania 4, tury 14 i 15.
- Pytanie D. Czy pasek reguły idzie też za warunkiem jej grupy?
  - Answer: tak: „The bar of a rule counts the condition of its rule group too, so every rule of a rule group whose condition does not hold shows dark.” Koszt podany przy tej drodze: „odejście od starego Loop; nie widać, które reguły ruszą, gdy grupa się spełni.”
  - Not chosen:
    - jak w starym Loop, tylko własny warunek — „zielony pasek przy regule, która teraz nie ruszy, a funkcja wybierająca podaje dwie różne odpowiedzi.”
  - Source: Mariusz, 2026-11-03, „zgodnie z rekomendacjami”, pytanie Q20 rozmowy zadania 4, tury 14 i 15.
- Pytanie E. Czy reguła w niespełnionej grupie podaje powód obok ciemnego paska?
  - Answer: bez powodu: „so every rule of such a rule group shows dark, with no reason”. Koszt podany przy tej drodze: „gracz nie dowie się z góry, że ta reguła zawiedzie, gdy grupa się spełni.”
  - Not chosen:
    - powód zostaje obok ciemnego paska — „odmowa przy regule, do której gra nie doszła, i ciemny pasek z bursztynowym w treści.”
  - Source: Mariusz, 2026-11-03, „A w obu”, pytanie Q22 rozmowy zadania 4, tury 18 i 19.
- Pytanie F. Czy tła, pasek i powód stoją też na ekranie po końcu przejścia?
  - Answer: tak, do „Restart” albo „Zakończ”, liczone na zatrzymanej minucie: „During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now…”. Koszt podany przy tej drodze: „„wygrywa teraz” mówi o regule, która już nie ruszy, a zadanie 11 musi liczyć znaki też po końcu.”
  - Not chosen:
    - znaki znikają z końcem przejścia — „po śmierci program milczy, a to jest chwila głównego ryzyka z definicji: „nie wiem co się dzieje i dlaczego nie wykonują się te reguły”.”
  - Source: Mariusz, 2026-11-03, „A w obu”, pytanie Q23 rozmowy zadania 4, tury 18 i 19.
- Pytanie G. Czy pasek przy regule jest ramką albo belką przy tekście w rozumieniu D-279?
  - Answer: nie; odczyt agenta, który Mariusz przyjął razem z definicją: „D-279 każe ramce albo belce przy tekście brać kolor tego tekstu; czytam to tak, że pasek przy regule mówi o stanie i nie jest taką belką.” Każda droga pytania 2 daje paskowi kolor inny niż kolor tekstu wiersza.
  - Source: tabela odczytów agenta w materiale do zatwierdzenia definicji (rozmowa zadania 4, tura 18) i zatwierdzenie przez Mariusza, 2026-11-03, „ok” (tura 21); plan, dziennik zmian, linia z 2026-11-03 o luce przy pasku wobec D-39, D-42, `design-token-contrast` i D-279.
- Pytanie 1. Jakie wartości mają role tła `rule-winning` i `rule-running` i skąd się biorą?
  - Answer: droga B: „Te same kolory na tle panelu, z kryciem obniżonym tylko tyle, żeby przeszły progi. Przy 15% zieleń daje 4,25 i 2,90, a błękit 4,35 i 2,96, więc nie przechodzą. Przy około 11% zieleni i 13% błękitu wychodzi #152a26 (4,59 i 3,13) i #152a37 (4,51 i 3,07).” Kolory to zieleń i błękit starego Loop (`bg-emerald-500/15`, `bg-sky-500/15`, czyli #00bc7d i #00a6f4 przy kryciu 15%), położone na tle `panel` (#18181b); progi to 4,5:1 najsłabszego tekstu, `text-label`, i 3:1 ramki kontrolki, `control-border` (D-42). Źródło wartości w pliku tokenów: kolor starego Loop na tle panelu, z kryciem obniżonym dla progu D-42, tak jak poprawiono `text-label`. Koszt podany przy tej drodze: „odcień nieco słabszy, mały zapas nad progiem”, a w rozmowie także „późniejsza zmiana panelu albo podpisu może wymagać nowej wartości”. Wyliczenie sprawdził niezależny krytyk i refiner zadania wzorem WCAG 2.2: każda rola tekstu poza `text-disabled` ma na obu tłach co najmniej 4,51:1, `control-border` i `focus` co najmniej 3,07:1; 11% to największe krycie zieleni, a 13% błękitu, przy którym podpis ma jeszcze 4,5:1.
  - Not chosen:
    - A. jak w Loop, na tle strony, #08241c i #08212e — „na panelu wiersz wyjdzie ciemniejszy od otoczenia, jak zielonkawa dziura”
    - C. podgląd wariantów na obrazku — „runda i praca agenta”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 2, C3 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-2.md`), zapis odpowiedzi w turze 28 rozmowy zadania 4; pytanie definicji i planu przypisane temu zadaniu (definicja, *Open questions*, wiersz 103; plan, *Open questions*, wiersz 140).
- Pytanie 2. Jaką rolę bierze każdy kolor paska i czy jego pary wchodzą do sprawdzania kontrastu?
  - Answer: droga A: „Zielony i bursztynowy pasek w kolorach „działa” i „uwaga”, a D-39 dopisuje, że te dwa kolory stoją też jako pasek stanu reguły i pasek postępu nad głową maga; oba muszą mieć co najmniej 3:1 wobec każdego tła wiersza. Ciemny pasek ma #27272a jak w Loop, w nowej roli „warunek niespełniony” bez progu kontrastu.” Koszt podany przy tej drodze: „na podświetlonym wierszu ciemny pasek wygląda jak brak paska, a nowa rola ma tę samą wartość co dwie inne”; zysk: „wygląd jak w Loop, a „ciemny” czyta się jako „nic się nie dzieje””. „Działa” i „uwaga” to role `positive` i `warning`. #27272a to dziś wartość `highlight`, `divider` i `tile-edge`; wobec `highlight` ciemny pasek ma 1,00:1, wobec `rule-winning` i `rule-running` 1,01:1, a na zwykłym wierszu, na tle `panel`, 1,19:1, gdy w starym Loop na tle strony miał 1,34:1, więc jest prawie niewidoczny na każdym wierszu. Próg 3:1 zieleni i bursztynu spełnia już próg 4,5:1, który projektowany `design-token-contrast` stawia `positive` i `warning` wobec pięciu teł (od 5,99:1 do 9,32:1). Pasek postępu nad głową maga ma tylko `positive`, jako wypełnienie na torze `highlight` w plakietce na tle `panel`, i tę część D-39 pisze zadanie 7 (plan, wiersz D-39 i dziennik zmian, 2026-11-03).
  - Wybór sprawdzony pytaniem przeciw niemu, bo pakiet 2 podał słaby punkt tylko dla podświetlonego wiersza: „Ciemny pasek przy regule jest prawie niewidoczny na każdym wierszu (sprawdzenie Twojego wyboru C4). Pokazałem Ci, że znika na podświetlonym wierszu. Na zwykłym wierszu ma kontrast 1,19:1, w starym Loop na czarnym tle 1,34:1, czyli też ledwo widoczny.” Mariusz wybór utrzymał, droga A: „Zostaje jak w Loop: ciemny pasek czyta się jak „nic się nie dzieje”, a widać tylko zielony i bursztynowy. Koszt: reguły z niespełnionym warunkiem wyglądają prawie jak bez paska.”
  - Not chosen:
    - B. jak A, ale ciemny pasek ma wartość widoczną wszędzie, z co najmniej 3:1 wobec każdego tła wiersza, a dobiera ją cykl testem — „wyraźny kolor przy każdej niespełnionej regule, czyli przy większości; odejście od Loop”
    - C. trzy nowe role, po jednej na kolor paska, dwie równe kolorom tekstu — „pary ról o równych wartościach, które przy zmianie jednej się rozjadą”
    - przy pytaniu przeciw wyborowi, G2 B. ciemny pasek widoczny: kolor z co najmniej 3:1 wobec każdego tła wiersza, dobrany przez cykl testem — „wyraźny szary pasek przy większości reguł, program bardziej pstrokaty, odejście od Loop”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 2, C4 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-2.md`), zapis odpowiedzi w turze 28 rozmowy zadania 4; pytanie przeciw wyborowi: Mariusz, 2026-11-03, „przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 3, G2 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-3.md`), zapis odpowiedzi w turze 35 rozmowy zadania 4; plan, dziennik zmian, linia z 2026-11-03 o luce przy pasku wobec D-39, D-42 i `design-token-contrast`.
- Pytanie 3. Co pokazują znaki w minutach napaści i jak brzmi powód przy regule walki poza walką i przy zwykłej regule w walce?
  - Answer: droga A w obu częściach. Znaki: „To, co wybrałaby pierwsza tura teraz: wygrywająca reguła walki na tle „wygra teraz”, żadna na „trwa”, zwykłe reguły ze spełnionym warunkiem bursztynowe.” Koszt: „dalsze tury mogą wybrać inną regułę”; zysk: „w pauzie widzisz od razu, czy dopisana reguła ruszy”. Brzmienie: „Jak w Loop: „tylko w walce” przy regule walki poza walką i „trwa walka” przy zwykłej regule w walce.” Koszt: „poza walką każda reguła walki ze spełnionym warunkiem świeci bursztynem”.
  - Not chosen:
    - znaki, B. żadna reguła na tle „wygra teraz” — „nie widać, czym mag zacznie walkę, a zatwierdzone zdanie dostaje wyjątek”
    - brzmienie, B. „czynność walki — tylko przy napaści” i „trwa walka — działają tylko reguły walki” — „dłuższy tekst w wąskiej kolumnie”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 2, C6 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-2.md`), zapis odpowiedzi w turze 28 rozmowy zadania 4; część o brzmieniu to pytanie definicji i planu przypisane temu zadaniu (definicja, *Open questions*, wiersz 104; plan, *Open questions*, wiersz 141).
- Pytanie 4. Jak brzmią powody, gdy czynności nie da się wykonać, i powód reguły spoza repertuaru?
  - Answer: droga A, tabela w całości. Gdy powodów jest kilka, stoi jeden: najpierw walka, potem świat i plecak, na końcu energia natury, jak w Loop; nazwy rzeczy małą literą.

    | Czynność | Kiedy nie da się jej wykonać | Powód |
    |---|---|---|
    | Eksploruj | kafelek już odkryty | „kafelek już odkryty” |
    | Wędruj | nie ma sąsiedniego kafelka | „nie ma dokąd iść” |
    | Idź — {rzecz} | gracz nie zna miejsca z tą rzeczą | „nie znasz miejsca, gdzie leży {rzecz}” |
    | Idź — {rzecz} | rzecz leży na kafelku postaci | „{rzecz} leży już tutaj” |
    | Idź — ognisko | nie ma żadnego ogniska | „nie ma ogniska” |
    | Idź — ognisko | postać stoi przy ognisku | „już przy ognisku” |
    | Zbierz — {rzecz}, Obchód — {rzecz} | rzeczy nie ma na kafelku | „tu nie leży {rzecz}” |
    | Zbierz, Obchód | plecak pełny | „plecak pełny” |
    | Wytwórz — ognisko, Zapal — patyk | kafelek nieodkryty | „kafelek nieodkryty” |
    | Wytwórz — ognisko | na kafelku stoi już ognisko | „tu już stoi ognisko” |
    | Zapal — ognisko | na kafelku nie ma ogniska | „tu nie stoi ognisko” |
    | Zapal — ognisko | ognisko płonie | „ognisko już płonie” |
    | Zasil — ognisko | na kafelku nie płonie ognisko | „tu nie płonie ognisko” |
    | Zasil — ognisko | w plecaku nie ma opału | „brak opału: patyk” |
    | Wytwórz — ognisko, Zapal — ognisko, Zapal — patyk, Zjedz — jagoda, Uderz — patyk | w plecaku brakuje rzeczy | „brakuje {ile} × {rzecz}”, na przykład „brakuje 4 × patyk” |
    | czar Płomyk: Zapal — ognisko, Zapal — patyk | za mało energii natury | „brak energii natury: {ma} z {trzeba}” |
    | reguła spoza repertuaru | czynność gałęzi, której postać nie kupiła | „gałąź niewykupiona”, to samo co przy wyszarzonej komórce w panelu wyboru |
    | reguła spoza repertuaru | warunek, czynność albo cel jeszcze nieodkryte | „jeszcze nieodkryte: {nazwa}” |

    Koszt podany przy tej drodze: „każda nowa czynność potrzebuje później własnego powodu”. Tabela obejmuje każdą odmowę `actionFeasible` (`src/browser/sim/program.ts:207-262` przy 20d804b); odmowy walki daje pytanie 3, a brak patyka przy „Uderz — patyk” w walce wiersz „brakuje”. Pakiet pokazał tę tabelę z krótszymi nazwami kolumn i czynności („Wytwórz, Zapal, Zjedz, Uderz”, „Płomyk: Zapal”); wiersze i powody są te same.
  - Not chosen:
    - B. cykl pisze powody sam, a Mariusz ocenia je przy scaleniu — „poprawki to runda uwag przed scaleniem, na którą czekają zadania 6 i 7”
    - C. tabela z poprawkami wybranych wierszy — bez kosztu w pakiecie; Mariusz żadnego wiersza nie poprawił
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 2, C7 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-2.md`), zapis odpowiedzi w turze 28 rozmowy zadania 4; wzór w starym Loop: `C:\Storage\repos\loop\src\components\probe\RulesPanel.tsx:111-150` i `C:\Storage\repos\loop\src\sim\policy.ts:100-121` przy cdc7c0d.
- Pytanie 5. Czy po końcu przejścia reguła, której czynność trwała w chwili końca, stoi na tle `rule-running`?
  - Answer: tak, jak pozostałe znaki, liczona na zatrzymanej minucie. Cytat: „During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now stands on the background `rule-winning`, the rule whose action is being carried out, where it is another rule, stands on the background `rule-running`” (zatwierdzony wpis o stanie reguły), a Mariusz wybrał drogę A w pytaniu „Czy tła, pasek i powód stoją też na ekranie po końcu przejścia?” (pytanie F), które pytało o oba tła. Fakt z kodu, osobno: po śmierci z potrzeb stan przejścia zachowuje czynność w toku (`src/browser/sim/run.ts:449-461` przy 20d804b, `...run` z polem `current`), a napaść ją zeruje (`src/browser/sim/run.ts:671` przy 20d804b, `current: null`), więc po śmierci w walce tła `rule-running` nie ma nikt.
  - Source: definicja_mvp2_loop2.md, odcisk 9641f804, wpis „What state does a program rule show during a map run?” (wiersz 271); rozmowa zadania 4, pytanie Q23, tury 18 i 19; pakiet rundy, część 2, A2, cytat nieskreślony: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami” (tura 28 rozmowy zadania 4).
- Pytanie 6. Czy zadanie zmienia uzasadnienie D-127?
  - Answer: nie, poprawia tylko D-126. Zasada Mariusza z planu: „wszystkie, każdy w zadaniu, którego zmiana go unieważnia”. Po zatwierdzonym wpisie o stanie reguły grupa z warunkiem spoza repertuaru ma ciemny pasek bez powodu („a rule group whose condition lies outside the repertoire counts as one whose condition does not hold”), więc zdanie D-127 „Accepted with it: a rule group that does not act stands in the program with no sign of why.” zostaje prawdziwe, a zdanie D-126 przestaje nim być.
  - Source: plan_mvp2_loop2.md, *Open questions*, wiersz 137 (human, 2026-11-01), i dziennik zmian, linia z 2026-11-03 „uwaga dla zadania 11” (krytyka rundy, uwaga 11); pakiet rundy, część 2, A4, nieskreślone: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami” (tura 28 rozmowy zadania 4).
- Pytanie 7. Jakie tło ma otwarty wiersz, gdy jest też regułą „wygra teraz” albo „trwa”?
  - Answer: droga A: „Jak w Loop: tło otwarcia wygrywa, a znak „wygra teraz” na czas edycji znika z tego wiersza; pasek zostaje.” Koszt podany przy tej drodze: „przy edytowanej regule nie widać tła stanu”. Wiersz otwarty do edycji ma tło `highlight` z zadania 5 (pakiet rundy, część 2, C9, wiersz f: „otwarty wiersz ma tło podświetlenia”).
  - Not chosen:
    - B. tło stanu zostaje, a otwarcie oznacza ramka — „nowy znak do ustalenia”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 2, C5 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-2.md`), zapis odpowiedzi w turze 28 rozmowy zadania 4; pytanie z niezależnej krytyki drugiej tury odpowiedzi, uwaga 5.
- Pytanie 8. Jakie tło ma wiersz pod kursorem, gdy jest regułą „wygra teraz” albo „trwa”?
  - Answer: droga A: „Pod kursorem tło stanu zostaje; podświetlenie widać tylko na wierszach bez stanu.” Koszt podany przy tej drodze: „najechanie na wygrywającą regułę nie zmienia jej wyglądu”. Wiersz pod kursorem stoi na tle `highlight` z zadania 5 („wiersz otwarty i wiersz pod kursorem stoją na tle `highlight`”, `edytor_programu_loop2.md`, *To do* 13); to zostaje prawdą dla wierszy bez tła stanu.
  - Not chosen:
    - B. podświetlenie wygrywa, jak przy otwartym wierszu — „kolory stanu migają, gdy przesuwasz myszą po programie, a w trakcie przejścia nie widać, która reguła wygrywa, jeśli kursor akurat na niej stoi”
  - Source: Mariusz, 2026-11-03, „przyjmuję zgodnie z rekomendacjami”, pakiet rundy, część 3, G3 (`C:\Storage\repos\loop2\.runs\project-refinement\round-4-7-package-3.md`), zapis odpowiedzi w turze 35 rozmowy zadania 4; pytanie z niezależnej krytyki trzeciej tury odpowiedzi, uwaga 7; plan, dziennik zmian, linia z 2026-11-03 o odpowiedzi G3 A przy wpisie o stanie reguły.

## Context

- Stary Loop, punkt wyjścia i minimum według definicji: tła i pasek w `C:\Storage\repos\loop\src\components\probe\RulesPanel.tsx:684-726` (reguła) i `:887-919` (grupa), powody w `:111-150`, kolejność powodów w `C:\Storage\repos\loop\src\sim\policy.ts:100-121`, przy commicie cdc7c0d.
- Stary Loop rysuje tło reguły wygrywającej jako `bg-emerald-500/15`, trwającej jako `bg-sky-500/15`, pasek reguły jako `border-emerald-500`, `border-amber-500` albo `border-zinc-800`, pasek grupy ciemniejszym `border-emerald-700` albo `border-amber-700`, a powód jako tekst `text-amber-500`.
- Panel programu stoi dziś na tle `panel` (`src/browser/styles.css:119-121` przy 20d804b); układ ekranu przejścia zmienia potem zadanie 6.
- Wiersz reguły daje zadanie 5, które idzie przed tym zadaniem; zadanie dokłada znaki do wiersza nowego edytora.
- W minutach napaści symulacja nie wybiera zwykłej czynności, a tury rozstrzyga naraz w minucie M+5 programem z tej chwili (`src/browser/sim/run.ts:599-678`, D-141).
- Plik tokenów przyjmuje wartość roli tylko jako `#rrggbb` (`tests/invariants/test_design_token_contrast.py`), a każda nowa wartość dostaje komentarz `Source:` (`design-token-sources`).
- Znaki liczy się ze stanu przejścia, więc stan gry nie zmienia kształtu i zadanie nie podbija wersji zapisu.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Wpisy obecne cytuje `foundations/` przy loop2 20d804b. Wpisy projektowane cytuje `definicja_mvp2_loop2.md` (odcisk 9641f804), sekcja *Projected foundation changes*. Przydziały pochodzą z sekcji *Projected entries* planu.

### Wpisy projektowane, które zadanie urzeczywistnia i pisze

- (new) — What state does a program rule show during a map run?: „During a manual map run and on its screen after its end, until „Restart” or „Zakończ”, the rule of the copy that wins now stands on the background `rule-winning`, the rule whose action is being carried out, where it is another rule, stands on the background `rule-running`, and a rule whose condition holds and whose action cannot be carried out names the reason, such as „tu nie leży Mech”. A bar at each program rule and rule group of the copy, below the winning rule too, is green when the condition holds and it can start, a rule group when one of its rules can, amber when the condition holds and it cannot start, and dark when the condition does not hold. A rule outside the character's repertoire shows amber with that reason whether or not its condition holds, unless the condition of its rule group does not hold: the bar of a rule counts that condition too, so every rule of such a rule group shows dark, with no reason, and a rule group whose condition lies outside the repertoire counts as one whose condition does not hold.” *Accepted with it*: „every action has to give a reason for refusing, the function that picks a rule has to judge the rules below the winner too, combat rules included, and to check the repertoire before the condition”. Odpowiedź na pytanie 7 daje temu zdaniu wyjątek dla wiersza otwartego do edycji, odpowiedź na pytanie 8 dokłada, że wiersz pod kursorem zachowuje tło stanu, a tabela pytania 4 pisze nazwę rzeczy w przykładzie małą literą („tu nie leży mech”); każdą z trzech zmian plan odnotował w dzienniku zmian 2026-11-03.
- D-40 — What do the neutral roles of the browser view mean? (realizują zadania 7 i 11, pisze zadanie 11): „In the browser view the background `page` means that here is the game, `panel` a block set apart, `highlight` that this row or track is marked or that this control is under the pointer, `rule-winning` that this program rule wins now, and `rule-running` that this program rule's action is being carried out; […] Each of the five stands as text on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text` is the text each of these backgrounds is written with.” Przykład zakładki w *Verification*, który dopisało zadanie 27, zostaje, bo pole czekające na zadanie zostaje takie, jak w fundamencie (dziennik planu, 2026-11-02). Część o ikonie czynności nad głową maga, która stoi w `text-strong` bez tekstu obok, dopisuje zadanie 7 do wpisu zapisanego przez to zadanie (plan, wiersz D-40 i dziennik zmian, 2026-11-03), więc tego zdania to zadanie nie zapisuje.
- D-39 — What do the signal colours of the browser view mean? (realizują zadania 5, 7 i 11, pisze zadanie 11): „Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel`, `highlight`, `rule-winning` and `rule-running`.” Przykład z *Verification* („the text of the button „Zakończ” in `danger` under the pointer”) czyni prawdziwym zadanie 5. Odpowiedź na pytanie 2 dopisuje, że `positive` i `warning` stoją też jako pasek stanu reguły; część o pasku postępu nad głową maga, w którym stoi tylko `positive`, urzeczywistnia zadanie 7 i ono dopisuje ją do wpisu zapisanego przez to zadanie (plan, dziennik zmian, 2026-11-03).
- design-token-contrast: „In `src/browser/tokens.css`, each of `text-strong`, `text`, `text-secondary`, `text-label`, `positive`, `warning`, `danger`, `discovery` and `player-change` has a contrast ratio of at least 4.5:1 against each of `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, `control-border` and `focus` have at least 3:1 against each of those five, `character` has at least 3:1 against `tile-revealed` and against `tile-hidden`, and `tile-revealed` has at least 3:1 against `tile-hidden`, each ratio computed from the values of those roles as WCAG 2.2 defines the contrast ratio.”

### Wpisy projektowane, które zadanie urzeczywistnia w części, a pisze inne zadanie

- D-42 — Which accessibility requirements does the browser view keep? (pisze zadanie 19): „Every role of the kind text but `text-disabled`, the signal colours included, has a contrast ratio of at least 4.5:1 on `page`, `panel`, `highlight`, `rule-winning` and `rule-running`, and `text-disabled` has no threshold. `control-border`, `focus` and `character` have a contrast ratio of at least 3:1 against the colours they touch, and so has `tile-revealed` against `tile-hidden`.” Zadanie zapisuje część o dwóch tłach i o roli ciemnego paska bez progu (pytanie 2); kryterium 2.3.1 zostaje zadaniu 19.
- rule-state-from-pick (pisze zadanie 14): „The background, the bar and the reason a program rule or rule group shows, and what „Teraz” and „Potem” name, come from the function of the simulation that picks the rule a character carries out.” Zadanie zapisuje część o tle, pasku i powodzie; „Teraz” i „Potem” daje zadanie 14.

### Obecne wpisy, które zadanie zmienia

- D-126 — What does the simulation do with a program rule outside the character's repertoire? (*Rationale*): „Accepted with it: a program rule that does not act stands in the program with no sign of why.”; odpowiedź z planu: „D-126 i D-127 w zadaniu 11”, a dla D-126 pytanie 6.

### Obecne wpisy, które zadanie stosuje bez zmiany

- D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire? (*Rationale*): „Accepted with it: a rule group that does not act stands in the program with no sign of why.”; zostaje prawdziwe (pytanie 6).
- D-43 — What counts in the browser view as a value written in place of a design token?: „a value written in place of a design token is a colour in any notation — hexadecimal, functional, a named colour or a system colour — in styles and in TypeScript”.
- D-62 — What does the screen show, and what can the player do, after a character's death?: „After a character's death the screen stays on the state of the game minute of death and time stands still for that map run”.
- D-132 — What does the screen show, and what can the player do, after a completion?: „After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run”.
- D-140 — How does combat go?: „Combat verbs can be carried out only in combat, and only they can be carried out in it.”
- D-141 — When do combat turns take effect?: „An encounter is scheduled for five game minutes after its attack minute M, with its turns resolved together in M+5 using the program as it stands then”.
- D-151 — Whose health do combat conditions compare?: „A side chooses its rule immediately before its action, with the creature using its ordered data pairs and the character using the ordered groups and repertoire of its program. Outside combat the own-health condition still reads the character’s health and the opponent-health condition is false”.
- D-173 — What can the player do with the copy after a map run ends?: „On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”.”
- D-174 — How does the player switch the character to another program during a map run?: „During a map run, picking a saved program on the program panel's list opens it for editing”.
- D-279 — What colour does a frame or a bar that sets a text apart take?: „A frame or a bar drawn at a text to set it apart […] takes the colour of that text and is part of it”; pasek stanu reguły takim paskiem nie jest (pytania G i 2).
- Niezmienniki, których zadanie dotyka bez zmiany: program-rule-pick, browser-view-token-values, design-token-sources.

## Settlements to record

Candidates: 9 shown, 2 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 3 | W minutach napaści znaki pokazują to, co wybrałaby pierwsza tura w tej chwili: reguła walki, którą tura by wybrała, stoi na tle „wygra teraz”, żadna na tle „trwa”, a zwykłe reguły ze spełnionym warunkiem są bursztynowe z powodem „trwa walka”; poza walką reguła walki ze spełnionym warunkiem jest bursztynowa z powodem „tylko w walce”. | decision | Pytanie 3 (C6, A w obu częściach) | co liczyć jako „wygrywa teraz” między minutą napaści a turami; zadanie 14 („Teraz”) i zadanie 20 (wilk) mogłyby liczyć to inaczej |
| 4 | Gdy reguła nie może ruszyć z kilku powodów, stoi jeden: najpierw walka, potem świat i plecak, na końcu energia natury; powody brzmią jak w tabeli pytania 4, z nazwami rzeczy małą literą. | decision | Pytanie 4 (C7, A) | kolejność i postać powodów; zadania, które dodają czynności, pisałyby powody w innej postaci albo kolejności |

## Out of scope

- „Teraz” i „Potem” daje zadanie 14.
- Licznik „Wykonano {n}×” i nagłówek „sprawdzane od góry” daje zadanie 5.
- Wyszarzenie z powodem w panelu wyboru daje zadanie 5.
- Układ ekranu przejścia w trzech obszarach daje zadanie 6.
