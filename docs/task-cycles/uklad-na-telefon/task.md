---
title: "loop2: układ na telefon dla wszystkich ekranów gry"
status: draft
created: 2026-11-21
updated: 2026-11-21
tags: [zadanie]
related: "the project's folder note in the author's notes"
---

# loop2: układ na telefon dla wszystkich ekranów gry

Status: ready for cycle
Project relation: plan item: plan_projektu_2_loop2.md — uklad-na-telefon
Defect introduced by: none

## Description

### Need

- Mariusz chce grać w loop2 na telefonie: loop2 ma działać na telefonie, a „wąskie okno traktujemy jak telefon, nie jak wąski komputer” (definicja projektu 2, „Ustalenia z rozmowy”, akapit „Telefon”).
- Dziś gra jest projektowana od okna 1280 × 720 px w górę, a w węższym oknie wygląd poza kilkoma decyzjami nie jest określony i jego usterek się nie naprawia (D-396).
- Przykład takiej usterki: przy oknie 390 px napisy komórek wyboru czynności w edytorze programu („Wytwórz”, „Eksploruj”, „Obchód”, „Wytwórz — ognisko”, „Zapal — ognisko”) wychodzą poza ramkę, a na ekranie przejścia to samo przy 1074–1200 px; gotową naprawę z PR #168 cofnięto, bo D-396 nie pozwalał naprawiać wyglądu poniżej najmniejszego okna.
- Zadanie służy sygnałowi sukcesu projektu: Mariusz przechodzi na telefonie (Chrome, Android) całą pętlę gry samym dotykiem, bez przewijania w poziomie i bez napisów wychodzących poza ramki (definicja, „Success”).
- Zadania 12 i 17–21 planu czekają na to zadanie, żeby projektować swoje ekrany od razu w obu układach.

### To do

1. Gra ma dwa układy i jeden próg między nimi: okno, którego obszar strony ma 1280 px szerokości albo więcej, dostaje układ komputera, a każde węższe okno, także okno komputera, dostaje układ telefonu, projektowany pod telefon trzymany pionowo, z obszarem strony szerokim na 360 px. Dzisiejsze progi 720 px i 1074 px przestają wyznaczać osobny wygląd; między telefonem a 1280 px nie ma trzeciego układu.
2. W układzie telefonu przy obszarze strony szerokim na 360 px, w oknie wyższym niż szerokie, każdy ekran mieści się w szerokości okna bez przewijania w bok i bez napisu poza ramką: karta logowania ze wszystkimi formularzami („Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”, „Ustaw nowe hasło”), ekrany oczekiwania, pasek menu z menu „Konto”, Siedziba z pasem obrazka, Postać, Mapy z listą map i kartą mapy, Programy z listą programów i edytorem, Wiedza, ekran przejścia, okno końca przejścia i lista kont panelu właściciela. W układzie telefonu nic nie przewija się w bok, także wewnątrz ramek — tabela odkrytych kafelków i lista kont układają się tak, żeby zmieścić się w szerokości (pytanie 6).
3. W układzie telefonu wszystko, co gra oferuje, robi się dotykiem, w tym cała pętla z sygnału sukcesu: logowanie, pisanie i zmiana programu w edytorze, puszczenie przejścia i pętli, odczyt raportu z powrotu i odbiór wprawy, kupno gałęzi na ekranie postaci.
4. Napisy komórek siatki wyboru czynności mieszczą się w ramkach w układzie telefonu przy 360 px, a na ekranie przejścia także w oknie szerokim na 1100 px. Materiałem wyjściowym jest cofnięta naprawa, commit `8591aa82`.
5. W układzie telefonu scena przejścia stoi w największej całkowitej wielokrotności swojego obrazka 336 × 152 px, jaka mieści się w szerokości: przy 360 px w wielkości samego obrazka, a w szerszym oknie układu telefonu, które mieści 672 × 304 px, w tej wielkości; układ komputera zostaje przy 672 × 304 px (pytanie 1).
   - Gdy do całego obrazka brakuje kilku pikseli, boki sceny są lekko przycięte, a przycięcie nie chowa niczego, z czym gracz działa, takiego jak stwór albo przedmiot.
   - Drobne elementy sceny — ikona na płytce odkrycia, znaczek nad głową maga i podobne — zostają czytelne przy scenie w wielkości obrazka; jeśli zmniejszone razem ze sceną są nieczytelne, rysuje się je w wielkości niezależnej od skali sceny.
6. Grupy reguł mają w nagłówku strzałki „↑” i „↓”, tak jak reguły, w każdym układzie — jedna mechanika przesuwania; przeciąganie uchwytem myszą zostaje na komputerze (pytanie 2).
7. Dotknięcie kafelka rysunku mapy zaznacza jego wiersz w tabeli odkrytych kafelków, tak jak dziś najechanie kursorem, a dotknięcie innego miejsca zdejmuje zaznaczenie; najechanie kursorem na komputerze zostaje (pytanie 3).
8. Przycisk niszczący ma już w spoczynku tekst w `danger`, w każdym układzie, jednym stylem; pod kursorem dostaje dodatkowo tło `highlight`, jak każdy przycisk (pytanie 4).
9. W układzie telefonu każda kontrolka — przycisk, komórka wyboru, strzałka, pozycja menu — ma co najmniej najmniejszą wielkość celu dotyku, wziętą ze źródła, które cykl cytuje przy tej wartości (pytanie 7).
10. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` dostają zasady układu telefonu, tak żeby zadania 12 i 17–21 projektowały ekrany w obu układach według nich.
11. Skill `.claude/skills/loop2-play/SKILL.md` mówi, jak agent sprawdza układ telefonu: w Chromium, przy obszarze strony szerokim na 360 px, w oknie wyższym niż szerokie, z obsługą dotykiem.
12. Opis prośby o scalenie pokazuje zestawienie zrzutów każdego ekranu z punktu 2 przy 360 px, zrobionych w Chromium przy szerokości telefonu, w tym scenę przejścia z płytką odkrycia i znaczkiem nad głową maga, oraz zrzut ekranu przejścia z otwartą siatką wyboru czynności przy 1100 px, umieszczonych tak, jak dają D-418 i D-419 (pytania 1 i 5).

### Acceptance criteria

- W oknie 1280 × 720 px i szerszym każdy ekran wygląda i działa tak jak przed zmianą, poza tym, co zmieniają punkty 6, 7, 8 i 9.

### Questions to settle

- Pytanie 1: Jak scena przejścia, dziś jednej wielkości 672 × 304 px bez drugiej skali (D-349), mieści się na ekranie telefonu?
  - Answer: Na telefonie scena dostaje największą całkowitą skalę, która się mieści — przy 360 px wielkość samego obrazka, 336 × 152 — z lekkim przycięciem boków, a D-349 zmienia się na dwie wielkości. Warunek: drobne elementy sceny mają zostać czytelne przy tej wielkości, a jeśli zmniejszone razem ze sceną są nieczytelne, rysuje się je w wielkości niezależnej od skali sceny; przycięcie boków nie może chować niczego, z czym gracz działa; zrzuty sceny przy 360 px stoją w prośbie o scalenie.
  - Not chosen:
    - scena w 672 × 304 przycięta do szerokości ekranu wokół maga — widać mniej więcej połowę lasu, stwór z boku albo rzecz na brzegu może być poza kadrem, a kadr musiałby iść za magiem, czego gra nie ma
    - scena dopasowana dokładnie do szerokości, zmniejszona o ułamek — piksele nierówne, mag drga w ruchu; D-349 już raz to odrzucił
    - bez sceny na telefonie — znika główny obraz gry
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „1 a — największa całkowita skala, która się mieści (przy 360 px 1×), lekkie przycięcie boków dopuszczalne, D-349 zmienia się na dwie wielkości. Warunek: drobne elementy sceny (ikona na płytce odkrycia, znaczek nad głową maga i podobne) mają zostać czytelne przy 1× — jeśli zmniejszone razem ze sceną są nieczytelne, rysuj je w wielkości niezależnej od skali sceny. Przycięcie boków nie może chować niczego, z czym gracz działa (stwór, przedmiot). Zrzuty sceny przy 360 px w PR-ze.”
- Pytanie 2: Czym na telefonie zastąpić przeciąganie grup reguł, które dziś przesuwa się tylko uchwytem, myszą (D-288)?
  - Answer: Strzałkami przy grupach reguł, tak jak przy regułach, w każdym układzie — jedna mechanika; przeciąganie myszą zostaje na komputerze.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „2 strzałki przy grupach reguł, tak jak przy regułach, w każdym układzie (jedna mechanika); przeciąganie myszą zostaje na komputerze.”
- Pytanie 3: Czym na telefonie zastąpić najechanie kursorem na kafelek rysunku mapy, które wiąże kafelek z wierszem tabeli odkrytych kafelków i pokazuje go w linii pod rysunkiem (D-19, D-41, D-70, D-311)?
  - Answer: Dotknięcie kafelka rysunku mapy zaznacza jego wiersz w tabeli, a dotknięcie innego miejsca zdejmuje zaznaczenie; najechanie kursorem na komputerze zostaje.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „3 dotknięcie kafelka rysunku mapy zaznacza jego wiersz w tabeli (i odwrotnie zdejmuje przy dotknięciu innego miejsca); najechanie kursorem na komputerze zostaje.”
- Pytanie 4: Jak na telefonie wygląda przycisk niszczący, który dziś czerwienieje dopiero pod kursorem albo przy fokusie (D-44)?
  - Answer: Przycisk niszczący jest widocznie niszczący w spoczynku, w każdym układzie, jednym stylem, nie osobnym dla telefonu; kursor może go dalej wzmacniać.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „4 przycisk niszczący jest widocznie niszczący w spoczynku, w każdym układzie (jeden styl, nie osobny dla telefonu); kursor może go dalej wzmacniać.”; brzmienie punktu 8 („tekst w `danger` już w spoczynku […] pod kursorem dostaje dodatkowo tło `highlight`”), zaproponowane, bo gra ma jeden czerwony kolor, `danger`, którego znaczenie w D-39 pasuje do przycisku niszczącego — doradca dnia w imieniu Mariusza, 2026-11-21: „3 przyjmuję brzmienie punktu 8.”
- Pytanie 5: Kiedy Mariusz przechodzi pętlę gry na prawdziwym telefonie — przy prośbie o scalenie czy po scaleniu, na serwerze testowym?
  - Answer: Po scaleniu, na serwerze testowym; scalenie nie czeka na przejście na prawdziwym telefonie. Dowodem w prośbie o scalenie są zrzuty każdego ekranu przy 360 px z emulacji w Chrome, a usterki znalezione później na telefonie idą jako poprawka.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „5 po scaleniu, na serwerze testowym — scalenie nie czeka na przejście na prawdziwym telefonie. PR niesie zrzuty każdego ekranu przy 360 px (emulacja w Chrome) jako dowód; usterki znalezione później na telefonie idą jako poprawka.”

- Pytanie 6: Czy w układzie telefonu wolno przewijać w bok wewnątrz ramki, jak dziś tabela odkrytych kafelków, która szersza niż jej obszar przewija się w swojej ramce?
  - Answer: Nie — w układzie telefonu nic nie przewija się w bok, także w ramkach.
  - Not chosen:
    - przewijanie w bok wewnątrz ramki dozwolone, strona się nie przewija — zero pracy, ale gracz przesuwa palcem tabelę w bok, czyli dosłownie przewija w poziomie, czego zabrania sygnał sukcesu projektu
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „1 b — nic nie przewija się w bok na telefonie, także w ramkach.”
- Pytanie 7: Czy kontrolki w układzie telefonu mają najmniejszą wielkość celu dotyku?
  - Answer: Tak — minimum celu dotyku w układzie telefonu, wartość ze źródła z cytatem.
  - Not chosen:
    - bez minimum, jak dziś (przyciski około 25 px według arkusza, niezmierzone) — zero kosztu, ryzyko pomyłkowych stuknięć w małe przyciski stojące obok siebie
    - minimum 24 px z WCAG 2.5.8 — dzisiejsze przyciski już je spełniają, więc w praktyce nic się nie zmienia
  - Source: doradca dnia w imieniu Mariusza, 2026-11-21: „2 b — minimum celu dotyku w układzie telefonu, wartość ze źródła z cytatem.”

## Context

- Dzisiejsze progi szerokości w arkuszach stylów: `src/browser/styles.css` („@media (max-width: 720px)”, około linii 253), `src/browser/character-screen.css` („@media (max-width: 720px)”, około linii 27) i `src/browser/run-screen.css` („@media (min-width: 1074px)”, około linii 59, dwie kolumny ekranu przejścia).
- Scena ma dziś w arkuszu „max-width: 100%” (`src/browser/run-screen.css`, reguła `.scene`), więc w oknie węższym niż jej 672 px jest już dziś zmniejszana o ułamek, czego D-349 zabrania.
- Przy dzisiejszych odstępach strony (2 × 16 px, reguła `body` w `src/browser/styles.css`) i obszaru świata (2 × 16 px i ramka 2 × 1 px, reguła `.screen-area`) na scenę przy 360 px zostaje około 294 px, o 42 px mniej niż obrazek 336 px; mag stojący przy prawym brzegu kończy się na 319. kolumnie z 336 (`src/browser/sim/data/scene.ts`, `rightEdgeX`), więc równe przycięcie po 21 px z boku ucięłoby go, a warunek z pytania 1 wymaga zrobienia scenie miejsca w układzie telefonu.
- Przeciąganie reguł i grup stoi na przeciąganiu samej przeglądarki, w `src/browser/view/rule-drag.ts`; reguły mają poza uchwytem strzałki „↑” i „↓”, także między grupami (D-297), a grupy tylko uchwyt.
- Najechanie kursorem obsługują `src/browser/view/terrain-drawing.tsx` (`onPointerOver`) i `src/browser/view/tile-table.tsx` (`onPointerOver`).
- Wiersze „Teraz” i „Potem” otwierają regułę kliknięciem, więc działają stuknięciem.
- Komórka wyboru, której nie wolno wybrać, ma powód wypisany w sobie (`src/browser/view/controls/react-pick-cell.tsx`), nie w dymku pod kursorem.
- Rola `danger` znaczy według D-39, że „a character, progress or data may be lost”, czyli to, co robi przycisk niszczący.
- Naprawa siatki wyboru czynności: commit `8591aa82` na gałęzi `task/model-czynnosci-i-przedmiotow`, cofnięty commitem `626e029f`; usterkę wskazał przegląd poprawki 1 w [PR #168](https://github.com/mariusznazar/loop2/pull/168).
- Scalenie zmiany wdraża ją na serwer testowy (skill `loop2-deploy`), gdzie Mariusz przechodzi pętlę na telefonie po scaleniu (pytanie 5).
- Tabela odkrytych kafelków trzyma dziś liczby w jednej linii, a jej obszar przewija się w bok (`src/browser/run-screen.css`, reguła `.screen-area.run-tabs`, „overflow-x: auto”).
- D-42 trzyma cztery kryteria WCAG 2.2 „and no other requirement of WCAG”, więc minimum celu dotyku z punktu 9 jest wymogiem produktu, nie WCAG; wytyczne Apple i Material podają różne wartości, stąd wymóg cytatu źródła.
- Linia `Defect introduced by` mówi `none`, bo w chwili scalenia PR #168 okna 390 px i 1100 px leżały poniżej najmniejszego okna D-396, gdzie usterek się nie naprawiało; to nowa potrzeba, nie regresja.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-396 — In which browsers and from which window size does the game have to work? Zadanie realizuje i zapisuje do fundamentu nowe brzmienie z definicji projektu 2, „Projected foundation changes”, nagłówek „D-396 — In which browsers and from which window size does the game have to work?”:
  > The game works in the current releases of Chrome, Edge and Firefox on a computer and of Chrome on a phone with Android; Safari, on a computer or on a phone, is outside that set. A window whose page area — the area of the page inside the browser's window, not the resolution of the screen — is 1280 px wide or wider shows the computer layout, whose smallest window has a page area of 1280 × 720 px; a narrower window, of a phone or of a computer, shows the phone layout, made for a phone held upright with a page area 360 px wide.
  >
  > In the phone layout every screen fits the width of the window with no scroll to the side and no text over the border of its frame, and everything the game offers is done by touch.
  >
  > A fault of the phone layout is fixed where a window of its width that is taller than it is wide shows it; a fault in a window narrower than 360 px, or one seen only in a window wider than it is tall, such as a phone turned sideways, is not fixed, and a fault of the computer layout in a window lower than 720 px is not fixed where no decision defines how the game looks there.

  Weryfikacja, uzasadnienie i odrzucone warianty stoją pod tym nagłówkiem w definicji. Do tego brzmienia dochodzą z pytań 6 i 7 dwa zdania: w układzie telefonu nic nie przewija się w bok, także w ramkach, a kontrolki mają minimum celu dotyku z wartością ze źródła (wiersze 5 i 6 *Settlements to record*).
- D-280, D-282, D-311, D-370, D-389 — dzisiejsze D-396 wymienia je jako decyzje, które określają wygląd węższego albo niższego okna; nowe brzmienie D-396 ich nie wymienia, więc zadanie przepisuje je tak, żeby mówiły o układzie telefonu albo komputera (definicja, „Touched parts and decisions”, pozycja „Układ na telefon”). Zdania, które dziś mówią o węższym oknie:
  - D-280: „all of one content width under one menu bar: at most 1344 px, and the full width of a narrower window”; weryfikacja: „as wide as a window 1000 px wide”.
  - D-282: „Each column of a screen is an area of its own that a narrower layout can rearrange”; weryfikacja: „a narrower layout placing the world, the program and the area with the tabs „Kronika” and „Teren” of the screen of a map run one above the other in that order”.
  - D-311, uzasadnienie: „in a window narrower than 1074 px, below the smallest window of D-396, the screen falling to one column with the area with the tabs under the whole program”; i „the hover over a tile of the drawing links with its row only while the table is picked”, które dochodzi do dotknięcia z punktu 7.
  - D-370: „as wide as the content column of the screens (D-280) and as tall as its content up to a part of the height of the browser window”.
  - D-389: „a window narrower than the picture crops it at the sides around the campfire and never scales it down”; weryfikacja: „in a window 400 px wide the clearing cropped at the sides around the fire”.
- D-349 — What size is the scene on the screen of a map run? „The scene has one size, 672 × 304 px, twice the size of its picture, and the game keeps no second scale of it. Whatever the scene draws is drawn for this size alone.” Zmiana z pytania 1: scena ma dwie wielkości — w układzie telefonu największą całkowitą wielokrotność obrazka, która się mieści, przy 360 px sam obrazek 336 × 152 z lekko przyciętymi bokami, które nie chowają niczego, z czym gracz działa — a jej drobne elementy zostają czytelne w obu, w razie potrzeby rysowane w wielkości niezależnej od skali sceny.
- D-288 — How does the player write a program rule? „Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line, with no arrows in the header of a rule group.” Zmiana z pytania 2: grupy reguł mają strzałki w nagłówku, tak jak reguły, w każdym układzie, a przeciąganie uchwytem myszą zostaje na komputerze.
- D-295 i D-297 — upuszczenie reguły na zwiniętą grupę i strzałki reguły na brzegu grupy; bez zmiany.
- D-19 — How does the player interact with the drawing of the game map? „The drawing of the game map is a picture, not a control: its only interaction is hovering, which links a tile with its row in the list of revealed tiles, and the numbers of stock stand in that list and in the line under the drawing, which shows the hovered tile or else the character's tile, never on the drawing.” Zmiana z pytania 3: poza najechaniem kursorem dotknięcie kafelka zaznacza jego wiersz w tabeli, a dotknięcie innego miejsca zdejmuje zaznaczenie.
- D-41 i D-70 — znaczenie roli `link-highlight` („this tile and this row of the list of revealed tiles are the same place”) i ognisko na rysunku mapy; bez zmiany, dotknięcie używa tej samej roli.
- D-44 — Which controls do the screens of the browser view build on? „the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program”, „Zatrzymaj” and „Zacznij od zera” (D-402), and „Odrzuć” of the question „Zapisać, odrzucić, wrócić?” (D-173), are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`” Zmiana z pytania 4: przycisk niszczący ma już w spoczynku tekst w `danger`, w każdym układzie, jednym stylem, a pod kursorem dostaje dodatkowo tło `highlight`.
- D-42 — Which accessibility requirements does the browser view keep? Trzyma cztery kryteria WCAG 2.2 „and no other requirement of WCAG”; bez zmiany — minimum celu dotyku z pytania 7 jest wymogiem produktu w D-396, nie kryterium WCAG.
- D-166 — Where does the player see the player's programs and pick the one to edit? „The screen Programy holds on the left the list of the player's programs and on the right the program editor” — na telefonie dwie kolumny stają jedna nad drugą, jak daje D-282.
- D-417 — How does an agent operate the game as a player does? „An agent operates the running game in a real browser with Playwright CLI, and with Playwright MCP where the CLI fails” — punkt 11 dopisuje do skilla sprawdzanie układu telefonu, bez zmiany decyzji.
- D-418 i D-419 — gdzie leżą zrzuty, które cykl pokazuje człowiekowi, i kto je tam wkłada; punkt 12 korzysta z nich bez zmiany.

## Settlements to record

Candidates: 7 shown, 6 accepted — 2026-11-21

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | W układzie telefonu scena stoi w największej całkowitej skali, która się mieści — przy 360 px 1× — z lekko przyciętymi bokami, które nie chowają niczego, z czym gracz działa, a jej drobne elementy zostają czytelne, w razie potrzeby rysowane w wielkości niezależnej od skali sceny. | sentence of D-349 | pytanie 1 (wybór człowieka) | czy scena na telefonie jest zmniejszana o ułamek, przycinana wokół maga, czy ma drugą wielkość |
| 2 | Grupy reguł mają strzałki tak jak reguły, w każdym układzie, a przeciąganie myszą zostaje na komputerze. | sentence of D-288 | pytanie 2 | czy grupy na telefonie przesuwa się przeciąganiem dotykiem, strzałkami tylko na telefonie, czy strzałkami w obu układach |
| 3 | Dotknięcie kafelka rysunku mapy zaznacza jego wiersz w tabeli, dotknięcie innego miejsca zdejmuje zaznaczenie, a najechanie kursorem na komputerze zostaje. | sentence of D-19 | pytanie 3 | czy rysunek mapy na telefonie zostaje obrazkiem bez reakcji, a powiązanie z tabelą znika |
| 4 | Przycisk niszczący ma już w spoczynku tekst w `danger`, w każdym układzie, jednym stylem; pod kursorem dostaje dodatkowo tło `highlight`. | sentence of D-44 | pytanie 4 | czy przycisk niszczący zostaje neutralny w spoczynku, dostaje osobny wygląd tylko na telefonie albo kolor spoza tokenów |
| 5 | W układzie telefonu nic nie przewija się w bok, także w ramkach. | sentence of D-396 | pytanie 6 (wybór człowieka) | czy tabela odkrytych kafelków i lista kont mogą przewijać się w bok w swojej ramce |
| 6 | W układzie telefonu kontrolki mają minimum celu dotyku, z wartością ze źródła i cytatem. | sentence of D-396 | pytanie 7 (wybór człowieka) | czy przyciski na telefonie zostają w dzisiejszej wysokości około 25 px |

## Out of scope

- Wygląd kafelka postaci, pasków parametrów, okien edycji grupy i reguły, ekranu Wiedza i przejść między ekranami — robią go zadania 17–21 planu, od razu w obu układach.
