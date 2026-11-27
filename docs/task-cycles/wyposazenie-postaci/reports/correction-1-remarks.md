Source: the comment https://github.com/mariusznazar/loop2/pull/182#issuecomment-7206026450 on the request, written by the account of the repository's owner on 2026-11-26T23:57:06Z; the text below is the comment word for word.

Uwagi doradcy dnia w imieniu Mariusza

Fix or let through:

1. Części ekranu walki i edytora programu nieobejrzane w działającej grze — **popraw: obejrzyj w tym żądaniu.** Złóż stany gry skryptem, jak wcześniej, i obejrzyj w przeglądarce przy 1280 px i 360 px: „Teraz” z „Zakłada patyk”, program z regułą „Załóż” wśród reguł walki, okno reguły „Załóż”, odmowy „już założone” i „kieszenie pełne”, regułę „Puste — Kieszeń” → „Załóż — opatrunek”. Usterkę, którą zobaczysz, popraw; zrzuty do opisu. Powód: to pierwsze, co gracz zobaczy na telefonie, a program sterujący wyposażeniem to rdzeń zadania. W poprzednim zadaniu takie obejrzenie znalazło prawdziwy błąd, którego testy nie łapały.
2. Linia kroniki bez aktora — **popraw: dopisz ją.** Wiersz 25 ustaleń zadania mówi: „W „Teraz” i w kronice „Załóż” pisze „Zakłada {rzecz}”, a uzupełnianie przy ciosie — „Bierze patyk z plecaka do ręki”.” Kronika zapisuje już „Zakłada {rzecz}”, więc uzupełnienie ma tam swoją linię „Bierze patyk z plecaka do ręki”. Wiersz walki z aktorem zostaje bez zmian.
3. Czytnik ekranu czyta wypełniony kafelek samą nazwą przedmiotu — **popraw: dopisz miejsce.** Nazwa kafelka dla czytnika ma brzmieć „{miejsce}: {rzecz}”, tak samo jak nagłówek wyboru („Kieszeń 1: opatrunek”, „Ręka główna: patyk”); puste miejsce bez zmian. Trzy jednakowe „opatrunek” to luka, a brzmienie już jest w grze.
4. Trzy przesunięcia układu (4 px przy 1280, 12 px przy 360, scena 336 px w polu 318 px przy 360) — **popraw albo opisz.** Najpierw zmierz to samo na bazie f2263d05. Jeśli to skutek tej zmiany — popraw. Jeśli było wcześniej, a poprawka to kilka linii CSS — popraw tutaj. Jeśli większa — opisz przyczynę i miejsce w opisie; dopiszę to do zadania z kolejki, które rusza ekran przejścia.
5. Głębokość pierwszego przeglądu całej zmiany — **przepuść.** Przegląd przeczytał zasady wszystkich 45 decyzji, a krok zwrotny i jego przegląd porównały każdy wpis z testami i kodem.
6. `TODO` w D-451 (sztuka trzymana pojedynczo) — **przepuść.** Dziś nic się nie psuje. Brakującą decyzję podejmie zadanie, które wprowadzi przedmioty jako pojedyncze sztuki, a `TODO` w tym miejscu jest dla niego śladem.

You accept by merging 7–14: przyjęte.

Przeglądy w tej rundzie zlecaj na `opus` wprost.

