# Styleguide guidelines — interfejs gry loop2 w przeglądarce

- **Discipline:** styleguide
- **Applies to:** browser-view

## When to read

Przed zmianą dowolnego pliku części `browser-view`; jej pliki wymienia
`foundations/part_map.md`. Styleguide przyjmuje szablon przypiętego the-way
bez odstępstw zgodnie z D-38.

## Roles

| Role              | Kind       | Meaning for the user                                                                                                                                                                                                                                                                                                                                                         | Text on it | Decision |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `page`            | background | Tu jest gra.                                                                                                                                                                                                                                                                                                                                                                 | `text`     | D-40     |
| `panel`           | background | To osobny, wydzielony blok, także plakietka nad głową postaci, plakietka lecącej ikony zasobu i plakietka odkrycia w scenie.                                                                                                                                                                                                                                                 | `text`     | D-40     |
| `highlight`       | background | Ten wiersz albo tor, także tor paska nad głową postaci, tor paska wymagania warunku mapy w nagłówku i tor pasków sytości, zdrowia i energii natury w wierszu ciała, jest zaznaczony albo ta kontrolka jest pod kursorem; przycisk komórki wiersza ciała nie dostaje go pod kursorem, bo w tym kolorze stoi tor jego paska.                                                                                                                                                                                                                   | `text`     | D-40     |
| `rule-winning`    | background | Ta reguła programu wygrywa teraz.                                                                                                                                                                                                                                                                                                                                            | `text`     | D-40     |
| `rule-running`    | background | Czynność tej reguły programu trwa teraz.                                                                                                                                                                                                                                                                                                                                     | `text`     | D-40     |
| `divider`         | other      | Tu kończy się jedna sekcja, a zaczyna następna.                                                                                                                                                                                                                                                                                                                              | —          | D-40     |
| `control-border`  | other      | To da się kliknąć albo wpisać.                                                                                                                                                                                                                                                                                                                                               | —          | D-40     |
| `selected`        | other      | To jest wybrane w swojej grupie.                                                                                                                                                                                                                                                                                                                                             | —          | D-40     |
| `condition-unmet` | other      | Warunek tej reguły programu albo grupy reguł nie jest spełniony; jest to pasek stanu, bez progu kontrastu.                                                                                                                                                                                                                                                                   | —          | D-40     |
| `window-frame`    | other      | To jest okno, które leży nad ekranem pod nim: ramka okna reguły i okna grupy w edytorze programu, z co najmniej 3:1 wobec kolorów, których dotyka.                                                                                                                                                                                                                           | —          | D-40 · D-42 |
| `text-strong`     | text       | Nazwa, nagłówek albo wartość, na którą patrzy się najpierw; stoi też na ikonie czynności nad głową postaci, na ikonie zasobu lecącej do maga, na ikonie na każdej plakietce odkrycia w scenie i na ikonach rysunku mapy, choć obok nich nie ma tekstu; stoi też jako wypełnienie paska energii natury w wierszu ciała, choć wypełnienie nie jest tekstem, z co najmniej 3:1 wobec toru w `highlight` przy pełnym kryciu, i jako nazwa wartości w przycisku komórki wiersza ciała pod kursorem i wtedy, gdy jej objaśnienie stoi otwarte; stoi też jako jasny środek kreski temperatury teraz na skali temperatury w wierszu ciała, między jej ciemnymi bokami, choć nie jest tekstem.                                                                                                                                                                      | —          | D-40 · D-43 |
| `text`            | text       | Treść do przeczytania; stoi też jako wypełnienie paska wymagania warunku mapy w nagłówku, póki wymaganie nie jest spełnione, i jako wypełnienie paska wprawy drzewa na ekranie Postać, choć wypełnienie nie jest tekstem.                                                                                                                                                                                                              | —          | D-40     |
| `text-secondary`  | text       | Opis, wyjaśnienie albo dopisek, także dopisek pod temperaturą i pod sytością w wierszu ciała, poza „marznie” i „głoduje”.                                                                                                                                                                                                                                                    | —          | D-40     |
| `text-label`      | text       | Nazwa pola albo sekcji, albo data.                                                                                                                                                                                                                                                                                                                                           | —          | D-40     |
| `text-disabled`   | text       | Tego teraz nie da się użyć; stoi też jako tor paska wprawy drzewa na ekranie Postać, choć tor nie jest tekstem, z progiem 2:1 wobec `panel` (D-42).                                                                                                                                                                                                                                                                                                                                                  | —          | D-40     |
| `positive`        | text       | To działa, jest w porządku albo jest teraz aktywne; stoi też jako pasek stanu reguły programu, której warunek jest spełniony i która może ruszyć, jako wypełnienie paska postępu nad głową postaci oraz jako tekst przycisku „Odbierz”, który wypłaca czekającą wprawę, i jako belka po lewej wybranego wiersza katalogu map, którego karta stoi otwarta; spełnione wymaganie warunku mapy w nagłówku ma w tej roli nazwę, liczby i wypełnienie swojego paska; stoi też jako wypełnienie paska zdrowia w wierszu ciała, na torze w `highlight`, z co najmniej 3:1 wobec toru przy pełnym kryciu; stoi też jako ramka kafelka postaci w Siedzibie i kropka „●” przy jej imieniu, dopóki pętla tej postaci chodzi — ramka mówi o pętli, nie o tekście w kafelku. | —          | D-39     |
| `warning`         | text       | Uwaga: coś się nie wykona albo nie jest zapisane, także błędny wpis w polu i „żadna reguła nie pasuje — postać stanie” w wierszu „Potem”; stoi też jako pasek stanu reguły programu, której warunek jest spełniony, ale która nie może ruszyć.                                                                                                                               | —          | D-39     |
| `danger`          | text       | Grozi utrata postaci, postępu albo danych, także „marznie” i „głoduje” pod temperaturą i pod sytością w wierszu ciała i liczba wartości wiersza ciała poniżej jej progu, zdrowia poniżej 35 też; stoi też jako strefa przegrzania na skali temperatury w wierszu ciała, z co najmniej 3:1 wobec `panel`.                                                                                                                                                                                                                                                       | —          | D-39     |
| `discovery`       | text       | Odkryto coś nowego; stoi też jako ramka plakietki odkrycia w scenie.                                                                                                                                                                                                                                                                                                         | —          | D-39     |
| `player-change`   | text       | To zrobił gracz.                                                                                                                                                                                                                                                                                                                                                             | —          | D-39     |
| `character`       | other      | Tu jest postać i tu właśnie idzie; cel kroku odróżnia kształt — cienka linia przerywana zamiast grubej ciągłej — nigdy kolor.                                                                                                                                                                                                                                                | —          | D-41     |
| `tile-hidden`     | other      | Tego miejsca jeszcze nie znasz.                                                                                                                                                                                                                                                                                                                                              | —          | D-41     |
| `tile-revealed`   | other      | To miejsce znasz; ikony mówią, co tu leży.                                                                                                                                                                                                                                                                                                                                   | —          | D-41     |
| `tile-edge`       | other      | Granica między kafelkami, nieodsłoniętymi i odsłoniętymi.                                                                                                                                                                                                                                                                                                                    | —          | D-41     |
| `link-highlight`  | other      | Ten kafelek i ten wiersz listy odsłoniętych kafelków to to samo miejsce.                                                                                                                                                                                                                                                                                                     | —          | D-41     |
| `depleted`        | other      | Tego, co tu było, już nie ma.                                                                                                                                                                                                                                                                                                                                                | —          | D-41     |
| `focus`           | other      | Tu jesteś, obsługując grę klawiaturą.                                                                                                                                                                                                                                                                                                                                        | —          | D-41     |
| `satiety-fill`    | other      | Tyle sytości ma postać: wypełnienie paska sytości w wierszu ciała, na torze w `highlight`, z co najmniej 3:1 wobec toru przy pełnym kryciu; pomarańcz własny, bo `warning` nie stoi w żadnym pasku wiersza ciała.                                                                                                                                                            | —          | D-39     |
| `chill-zone`      | other      | Przy tej temperaturze ciało jest wychłodzone: strefa wychłodzenia na skali temperatury w wierszu ciała, z co najmniej 3:1 wobec `panel`; stoi też jako ramka przycisku komórki temperatury, dopóki nic postaci nie grzeje, a jej mapa jest zimniejsza od jej ciała — ramka mówi wtedy o tym, co działa na postać, nie o tekście w komórce.                                                                                   | —          | D-40 · D-39 |
| `safe-zone`       | other      | Przy tej temperaturze ciało jest bezpieczne: strefa bezpieczna na skali temperatury w wierszu ciała, neutralna szarość, z co najmniej 3:1 wobec `panel`.                                                                                                                                                                                                                     | —          | D-40     |
| `scale-marker`    | other      | Tu stoi wartość na swojej skali: ciemne boki kreski temperatury teraz na skali temperatury w wierszu ciała, z co najmniej 3:1 wobec każdej strefy; między nimi stoi jasny środek kreski w `text-strong`.                                                                                                                                                                                                                                  | —          | D-40     |
| `warming-frame`   | other      | Coś grzeje postać: bursztynowa ramka przycisku komórki temperatury w wierszu ciała, dopóki na polu postaci coś się pali, z co najmniej 3:1 wobec `panel`; ramka mówi o tym, co działa na postać, nie o tekście w komórce, i nie bierze jego koloru.                                                                                                                              | —          | D-39     |

Tabela nie trzyma wartości: wartości ról stoją w pliku tokenów, który wskazuje
Where in code.

## Rules

### Each role in its meaning

- **Decision:** D-39 · D-40 · D-41
- **Invariant:** none
- **Good:** Komunikat o błędnym wpisie pod polem liczby napisany w `warning`.
- **Bad:** Komunikat o błędnym wpisie w polu napisany w `danger`, bo wygląda groźniej.

Ekran używa każdej roli tylko w znaczeniu, które daje jej decyzja z tabeli
Roles. Nowe albo zmienione znaczenie roli to nowa albo zmieniona decyzja,
zatwierdzona przed kodem, który go używa; ta sama zmiana dostosowuje tabelę
Roles, a jej autor znajduje wiersze po identyfikatorze decyzji. Przegląd każdej
zmiany plików `browser-view` czyta użyte role wobec ich decyzji.

### Every background with its text

- **Decision:** D-38
- **Invariant:** none
- **Good:** Reguła panelu ustawia tło `var(--panel)` i kolor tekstu `var(--text)`.
- **Bad:** Element dostaje tło `var(--highlight)`, a żadna jego reguła nie ustawia mu koloru tekstu z roli.

Rolę rodzaju `background` zapisuj zawsze razem z rolą rodzaju `text`, która
stoi na niej w tabeli Roles: element, któremu styl nadaje tło `page`, `panel`,
`highlight`, `rule-winning` albo `rule-running`, dostaje kolor tekstu `text`,
chyba że ma już inną rolę tekstu. Element albo jego część z inną rolą tekstu
zachowuje ją na każdym z tych pięciu teł, bo każda rola rodzaju `text` stoi
na wszystkich pięciu (D-39, D-40): przycisk niszczący ma tekst w `danger` także
na `highlight` pod kursorem, a przycisk wybrany w grupie — w `text-strong`. Wartości każdej pary trzyma
w kodzie reguła Contrast of every pair. Przegląd zmiany tabeli Roles czyta
każde tło z jego tekstem. Tor paska postępu nad głową postaci (`highlight`)
nie ma tekstu i kod nie ustawia na nim żadnej roli tekstu. Tor paska wymagania
warunku mapy w nagłówku (`highlight`) też nie ma tekstu: jego wypełnienie
w `text` nie jest tekstem, a nazwa i liczby wymagania stoją obok paska (D-40,
D-133). Tor paska wprawy drzewa na ekranie Postać nie jest tłem: stoi
w `text-disabled`, a jego wypełnienie w `text`, i żadne z nich nie jest tekstem;
poziom, liczby i punkty drzewa stoją obok paska (D-40, D-199). Ta reguła nie mówi, czy któryś z tych torów potrzebuje
roli tekstu.

### No value in place of a design token

- **Decision:** D-43 · D-46 · D-48 · D-349 · D-389
- **Invariant:** browser-view-token-values
- **Good:** Odstęp w arkuszu stylów zapisany przez `var()` z tokenu skali odstępów.
- **Bad:** Moduł TypeScript wpisuje do stylu elementu kolor zapisany szesnastkowo.

Pliki części `browser-view` czytają kolory, długości i czcionki z tokenów
projektowych pliku `src/browser/tokens.css`, w stylach przez `var(--…)`. Każda
rola z tabeli Roles jest tam własnością `--<rola>`; każda inna wartość wyglądu —
stos czcionek, rozmiar tekstu, stopień skali odstępów, grubość ramki, belki
albo linii, wzór przerywania, krycie, waga czcionki — własnością nazwaną po
tym, do czego służy, nigdy po kolorze ani po samej liczbie (D-48).

W plikach części poza plikiem tokenów wartością wpisaną zamiast tokenu jest:

- kolor w dowolnym zapisie — szesnastkowy, funkcyjny, nazwa koloru albo kolor
  systemowy — w stylach i w TypeScripcie;
- w stylach: rozmiar albo odstęp w `px`, `rem` lub `em`, nazwa czcionki oraz
  zapisane bez jednostki grubość linii, wzór przerywania, krycie i waga
  czcionki — i żadna inna wartość bez jednostki.

Nie jest nią: `0`, procent, rozmiar w `fr`, `vw` albo `vh`, słowo kluczowe
(`transparent`, `currentColor`, `inherit`, `none`), próg szerokości ekranu
w regule `@media` (które progi wolno napisać, mówi reguła Two layouts and one
threshold between them), geometria rysunku siatki, sceny i obozu liczona w TypeScripcie,
klatki i położenia obrazków postaci i zasobów sceny oraz obozu, atrybuty
`width` i `height` obrazka, wymiar układu — szerokość albo wysokość z jej
minimum i maksimum, rozmiary kolumn siatki układu — ani treść pliku ikony
w `assets/icons/`. Ikona z `assets/icons/` jest rysowana jednym sposobem,
maską: obok tekstu bierze kolor tego tekstu, więc szarzeje razem z wyszarzoną
komórką i zmiana `text-strong` dochodzi do niej sama, a tam, gdzie obok niej nie
ma tekstu — nad głową postaci, na plakietce ikony lecącej do maga, na każdej plakietce odkrycia w scenie
i na rysunku mapy — stoi w `text-strong` (D-43).

Czcionki interfejsu to Geist i Geist Mono z plików produktu (D-46): tekst gry
idzie stosem Geist, kronika i zegar przejścia stosem Geist Mono.

Test niezmiennika przeszukuje tekst plików części. Wartości, której tekst pliku
nie pokazuje — koloru składanego w TypeScripcie z liczb i wpisywanego do stylu —
pilnuje przegląd zmiany (D-43).

Wyjątki ze sceny przepuszcza test `browser-view-token-values`, bo żaden z nich
nie jest kolorem, nazwą czcionki ani wartością w `px`, `rem` lub `em` spoza
wymiarów układu, a to test czyta: geometria i położenia obrazków stoją w TypeScripcie
(`src/browser/view/scene.tsx`, `src/browser/view/scene-picture.ts`) jako procenty
kadru; rozmiar ikony w plakietce jest wymiarem układu, który stoi w `src/browser/run-screen.css`,
w rozmiarze własnym, niezależnym od rozmiaru sceny, więc ten sam przy obu rozmiarach sceny (D-349). Geometria obozu w Siedzibie — rozmiary jego obrazków, odstępy i położenia —
stoi w TypeScripcie (`src/browser/view/camp.tsx`, `src/browser/view/camp-picture.ts`) jako liczby pikseli
obrazka razy rozmiar piksela obrazka, wpisane w style elementów, a jej liczby w danych gry, w
`src/browser/sim/data/scene.ts`; arkusz stylów obozu nie wpisuje żadnej długości obrazka (D-349, D-389).
Tak samo ludzik na ekranie Postać: rozmiar jego pola i położenie arkusza stoją w TypeScripcie
(`src/browser/view/character-figure.tsx`) jako liczby pikseli obrazka razy rozmiar piksela obrazka, a pole
w danych gry, w `src/browser/sim/data/scene.ts`; arkusz stylów ekranu nie wpisuje długości obrazka (D-445).
Ten przewodnik nie wymienia w liście wartości dwóch rzeczy, które scena
ma w tym samym pliku stylów: czasów ruchu sceny (klatek, dojścia maga, paska, lotu ikony, kurzu, powrotu odcienia i efektów odkrycia, śmierci i rozwiązania) oraz dwóch
filtrów szarości, pauzy i martwego maga z wygasłym ogniskiem. Ich wartości stoją w regułach
sceny w `src/browser/run-screen.css`, a źródła w komentarzach przy tych regułach; geometria szronu stoi w
TypeScripcie jako grubość w pikselach obrazu sceny i jako procenty kadru, a okresy jego zębów i
kryształków w regułach szronu. D-43 ich też
nie liczy; czy staną się tokenami, ten przewodnik nie rozstrzyga.

### Visible focus

- **Decision:** D-42 · D-47
- **Invariant:** browser-view-focus-outline
- **Good:** Link zwiniętej sekcji wzmianek pokazuje obwódkę w roli `focus`, gdy dojdzie do niego klawiatura.
- **Bad:** `outline: none` na wspólnym przycisku albo obwódka ustawiana z TypeScriptu.

Kontrolką jest każdy element, na który przeglądarka pozwala wejść klawiaturą,
linki też; kod niczego nie oznacza — ani klasą, ani atrybutem, ani
komponentem. Fokus każdej kontrolki rysuje jedna reguła `:focus-visible`
arkusza stylów gry, `src/browser/styles.css`: obwódka w roli `focus`, z grubością
i odsunięciem z pliku tokenów. Żaden inny styl ani kod części nie ustawia
`outline` ani własności `outline-*`, także z TypeScriptu i także po to, żeby
obwódkę wyłączyć. Jedyny wyjątek: arkusz strony wszystkich stanów powtarza tę
regułę z drugim selektorem, dla próbki stanu z fokusem.

Nowa kontrolka albo nowy link pokazuje fokus bez żadnego dodatku. Kontrolka,
która potrzebowałaby innej obwódki, wymaga zmiany D-47. Obwódkę wyłączoną
w nietypowy sposób łapie dopiero przegląd. Reguła trzyma kryterium WCAG 2.2
2.4.7 Focus Visible, jedno z czterech, które interfejs przyjmuje (D-42).

### Contrast of every pair

- **Decision:** D-39 · D-40 · D-41 · D-42
- **Invariant:** design-token-contrast
- **Good:** Nowa wartość `text-label` w pliku tokenów ma co najmniej 4,5:1 na `page`, `panel`, `highlight`, `rule-winning` i `rule-running`.
- **Bad:** Jaśniejsza wartość `tile-hidden`, przy której `tile-revealed` ma wobec niej mniej niż 3:1.

Kontrast każdej pary liczy się z wartości pliku tokenów według definicji
współczynnika kontrastu z WCAG 2.2 (D-42):

- każda rola rodzaju `text` poza `text-disabled`, kolory sygnałowe także, ma
  co najmniej 4,5:1 na `page`, `panel`, `highlight`, `rule-winning`
  i `rule-running`;
- wypełnienie paska postępu nad głową postaci, `positive` na torze w `highlight`,
  nie dokłada pary ani progu: reguła sceny wymaga dla niego co najmniej 3:1
  wobec toru (D-39), a `positive` ma już 4,5:1 na `highlight` z pierwszego
  punktu;
- ramka plakietki odkrycia w scenie, `discovery` na `panel`, nie dokłada pary
  ani progu: reguła sceny wymaga dla niej co najmniej 3:1 wobec `panel` (D-39,
  D-42), a `discovery` ma już 4,5:1 na `panel` z pierwszego punktu;
- zielona ramka kafelka postaci w pętli w Siedzibie, `positive`, nie dokłada pary
  ani progu: D-42 wymaga dla niej co najmniej 3:1 wobec barw, których dotyka —
  `panel` bloku, bo kafelek nie ma własnego tła, i `highlight` pod kursorem —
  a `positive` ma już 4,5:1 na obu z pierwszego punktu (D-39, D-42);
- `text-disabled` nie ma progu jako tekst; jako tor paska wprawy drzewa na
  ekranie Postać ma co najmniej 2:1 wobec `panel` — para osobna, próg własny
  produktu, nie kryterium WCAG, żeby tor nie zlał się z tłem bloku; tekstu
  w `text-disabled` ten próg nie dotyczy (D-42, D-40);
- `control-border`, `focus` i `window-frame`, ramka okna reguły i okna grupy, mają co
  najmniej 3:1 na tych samych pięciu tłach: okno stoi na `panel`, dotyka wiersza otwartego na
  `highlight` i wierszy na `rule-winning` i `rule-running` pod swoją dolną krawędzią, a w układzie
  komputera bokiem `page` za kolumną (D-42);
- `condition-unmet`, pasek reguły, której warunek nie jest spełniony, nie ma
  progu, a pasek w `positive` i w `warning` nie dokłada pary, bo te role
  mają już próg 4,5:1 na pięciu tłach;
- `character` ma co najmniej 3:1 na `tile-revealed` i na `tile-hidden`;
- `tile-revealed` ma co najmniej 3:1 wobec `tile-hidden`;
- wypełnienia pasków wiersza ciała — `positive` zdrowia, `satiety-fill` sytości
  i `text-strong` energii natury — mają co najmniej 3:1 wobec swojego toru
  w `highlight`, liczone przy pełnym kryciu (D-39, D-40, D-42); `positive`
  i `text-strong` mają już 4,5:1 na `highlight` z pierwszego punktu, a test
  sprawdza tę parę i tak, jak ją wymienia niezmiennik;
- strefy skali temperatury — `chill-zone`, `safe-zone` i `danger` — mają
  co najmniej 3:1 wobec `panel`, tła bloku, na którym stoją, i tak samo ramka
  przycisku komórki temperatury w obu barwach, `warming-frame` i `chill-zone`
  (D-39, D-40, D-42);
- `scale-marker`, ciemne boki kreski temperatury teraz, ma co najmniej 3:1
  wobec każdej z trzech stref (D-40, D-42); jasny środek kreski w `text-strong`
  styka się tylko z jej bokami i nie dokłada pary: od przerw między strefami,
  które pokazują `panel`, odróżnia go próg `text-strong` na `panel` z pierwszego
  punktu, a od ciemnych boków — to, że boki przy 3:1 wobec stref są ciemne;
- dwie strefy skali temperatury nie tworzą pary i nie mają progu wobec siebie,
  bo między nimi stoi wąska przerwa w kolorze `panel` (D-42);
- przygaszona faza pulsowania alarmu — wypełnienie paska wiersza ciała albo
  kreska razem ze swoją strefą schodzą do krycia z tokenu
  `--alarm-pulse-dim-opacity` i wracają do pełnego, płynnie i bez końca — jest
  wyjątkiem od progu 3:1: próg trzyma pełny kolor, a alarm niosą przez cały
  czas czerwona liczba i dopisek; pulsowanie, a także drganie i znikający
  napis ciosu w komórce zdrowia (D-450), ocenia się kryterium błysków WCAG 2.2
  2.3.1 (D-42).

Zmieniając wartość w pliku tokenów, sprawdź ją tym testem przed scaleniem.
Nowa rola albo nowa para wymaga zmiany decyzji ról, D-42 i niezmiennika razem
z jego testem.

### States of shared controls

- **Decision:** D-38 · D-44 · D-265 · D-173 · D-97 · D-222 · D-274 · D-275 · D-276 · D-279 · D-285 · D-288 · D-289 · D-291 · D-39 · D-40 · D-43 · D-47 · D-401 · D-402 · D-411 · D-323 · D-329 · D-439 · D-337 · D-450 · D-461
- **Invariant:** none
- **Good:** Pole liczby z błędnym wpisem pokazuje ramkę i komunikat pod polem w `warning`; główny przycisk formularza czekającego na serwer jest wyłączony i pokazuje „Logowanie…”, a przycisk „Wyślij ponownie” czekający na serwer — „Wysyłanie…”; przycisk „Oceń na 12 ziarnach” na czas liczenia oceny wyłączony i z napisem „Oceniam…”, choć na serwer nie czeka; zdanie po prośbie o odnośnik stoi pod formularzem w `text` z belką po lewej w kolorze tego zdania; kafelek pustego miejsca wyposażenia pokazuje bladą nazwę miejsca w `text-label`, a wybrany ma ramkę w `selected`.
- **Bad:** Lista wyboru bez pozycji, która na stronie wszystkich stanów nie ma ani próbki stanu pustego, ani powodu, że stan nie dotyczy.

Wspólne kontrolki stoją w `src/browser/view/controls/`, a ekrany budują z nich
swoje kontrolki (D-44). Każda wspólna kontrolka ma stany default, hover,
visible focus, disabled, error, empty i loading; każdy stoi na stronie
wszystkich stanów albo jest oznaczony jako niedotyczący, z powodem. Wygląd
stanów:

- default — kontrolka nie ma własnego tła, widać tło pod nią; tekst w `text`,
  ramka w `control-border`;
- hover — tło `highlight` (D-40), ramka i rola tekstu bez zmiany;
- visible focus — obwódka z reguły Visible focus;
- disabled — tekst w `text-disabled`;
- error — w polach przyjmujących wpis ramka i komunikat pod polem w `warning`;
- empty — w listach i polach: lista bez pozycji, puste pole z podpowiedzią
  w `text-label`;
- loading — dotyczy kontrolki, która czeka na odpowiedź serwera (D-44):
  przycisk jest wyłączony, a jego tekst stoi w `text-disabled`; przycisk
  wysyłający formularz zmienia napis na „Logowanie…”, „Zakładanie
  konta…”, „Wysyłanie…” (przycisk „Wyślij odnośnik” formularza „Nie pamiętam
  hasła”) albo „Ustawianie…” (przycisk „Ustaw hasło” formularza „Ustaw nowe
  hasło”) zależnie od formularza, a pola tego formularza są wyłączone, więc
  też mają tekst w `text-disabled`; przycisk „Wyślij ponownie” w menu „Konto”,
  który nie wysyła formularza, zmienia napis na „Wysyłanie…”, a przycisk
  „Wyloguj” w tym menu czekający na zapis i na koniec sesji — na
  „Wylogowywanie…” (D-97); menu stoi wtedy otwarte (D-285); przycisk „Wciągnij
  programy z poprzedniego zapisu” na ekranie Programy, czekający na odpowiedź
  serwera, zmienia napis na „Wciąganie…” (D-44, D-401), a przycisk niszczący
  „Zacznij od zera”, czekający na odpowiedź na reset, jest wyłączony i zachowuje
  napis (D-44, D-402); tak samo przycisk „Zablokuj” z listy kont, czekający na odpowiedź serwera (D-411).
  Dostaje go też przycisk oceny „Oceń na 12 ziarnach” przy postaci w „Kto idzie”,
  choć na serwer nie czeka: na czas liczenia oceny jest wyłączony, jego tekst
  stoi w `text-disabled`, a napis zmienia się na „Oceniam…” (D-329, D-439).
  Nie ma ruchomego wskaźnika. Odmowa
  serwera i brak połączenia przy formularzu stoją jednym zdaniem pod
  formularzem w `warning` (rola `warning`: coś się nie wykona, D-39). Wyłączony przycisk traci fokus
  klawiatury, więc ekran po odpowiedzi przywraca go na kontrolce, od której
  gracz zaczął. Odpowiedź na prośbę o odnośnik do zmiany hasła niczego nie
  odmawia, więc stoi w tym samym miejscu pod formularzem „Nie pamiętam hasła”
  jednym zdaniem w `text`, z belką po lewej w kolorze tego zdania
  (`currentColor`) o grubości `--bar-width`, bez własnego koloru — nie
  w `warning` i nigdy w `positive` (D-44, D-222, D-279).

Pole hasła to pole tekstowe z ukrytym wpisem (przeglądarka maskuje znaki)
i ma te same stany co ono. Pole z widoczną etykietą stawia jej tekst nad polem
w `text-label`. Formularz stawia pod swoim przyciskiem jedno zdanie w `warning` (formularz „Nie pamiętam hasła” po prośbie — zdanie w `text` z belką); po błędzie,
którego nie obsłużył żaden kod gry, karta logowania ma pod formularzem drugie
zdanie w `warning`, „Coś w grze się zepsuło — odśwież stronę.” (D-323). Przycisk,
który go wysyła, jest przyciskiem zatwierdzającym i ma główny wygląd (D-274).

Każda wspólna kontrolka ma jedną postać, komponent Reacta (D-265). Pole
tekstowe i pole hasła, w `src/browser/view/controls/react-text-field.tsx`, od
listy nie odstępują.

Kontrolki odstępujące od tej listy stanów:

- `src/browser/view/controls/react-button.tsx`
  — przycisk, przycisk niszczący
  i przycisk wybrany w grupie: error nie dotyczy, bo przycisk nie ma
  niepoprawnej wartości; empty nie dotyczy, bo przycisk nie ma pozycji ani
  wpisu. Przycisk niszczący ma już w spoczynku tekst w `danger`, w każdym układzie, jednym
  wyglądem; pod kursorem dostaje dodatkowo tło `highlight`, jak każdy przycisk, a tekst
  zostaje w `danger`, przy fokusie rysuje się obwódka z reguły Visible focus (D-44, D-39).
  Powód: gracz telefonu nie ma kursora, który dochodzi do przycisku przed dotknięciem,
  więc kolor, który pojawiałby się dopiero pod kursorem, nic by mu nie pokazał, i dlatego
  nie ma osobnego wyglądu tego przycisku w układzie telefonu. Są nim „Zakończ”, „Usuń”, „Usuń z regułami” (D-296), „Restart”, „Porzuć zmiany”,
  „Przełącz postać na ten program”, „Zatrzymaj”, „Zacznij od zera” (D-44, D-402) i „Zablokuj” na liście kont (D-411), oraz „Odrzuć” pytania
  „Zapisać, odrzucić, wrócić?” (D-173, D-44). Przycisk wybrany w grupie ma ramkę w `selected` i tekst
  w `text-strong` (D-40); ten wygląd zachowują przyciski tempa (D-276).
  Loading dotyczy zwykłego przycisku, który czeka na odpowiedź serwera,
  także w głównym wyglądzie, i przycisku niszczącego „Zacznij od zera”, który
  czeka na odpowiedź na reset: jest wtedy wyłączony i zachowuje napis (D-44,
  D-402); dotyczy też zwykłego przycisku oceny „Oceń na 12 ziarnach”, który
  na czas liczenia oceny jest wyłączony i czyta „Oceniam…”, choć na serwer nie
  czeka (D-329, D-439); przycisk wybrany w grupie nie czeka na serwer. Główny wygląd ma
  przycisk, który wysyła formularz, i „Wejdź” przy każdej postaci w sekcji
  „Kto idzie” karty mapy (D-274; reguła Main button, secondary action and
  tab): tekst w `text-strong`
  o wadze `--font-weight-emphasis` i ramka w kolorze tego tekstu
  (`currentColor`), bez wypełnienia, więc widać tło pod nim; pod kursorem tło
  `highlight`, ramka i tekst bez zmiany; czekając na serwer albo wyłączony
  (także „Wejdź” przy przejściu ręcznym, które czeka albo się skończyło, D-287)
  wygląda jak każdy wyłączony przycisk — tekst w `text-disabled` o wadze
  `--font-weight-body`, ramka w `control-border`.
- `src/browser/view/controls/react-button.tsx`
  — przycisk w `positive` (D-44, D-39), czyli zwykły przycisk z tekstem w `positive`,
  dziś „Odbierz” przy wierszu raportu z nieobecności (D-246): error i empty nie dotyczą, jak
  przycisku; loading nie dotyczy, bo na serwer czeka tylko przycisk, który wysyła formularz.
  Spoczynek: tekst w `positive`, ramka w `control-border`, bez wypełnienia; pod kursorem tło
  `highlight`, a ramka i tekst bez zmiany; wyłączony — tekst w `text-disabled`, jak każdy
  wyłączony przycisk. Fokus rysuje reguła Visible focus.
- `src/browser/view/controls/react-button.tsx`
  — przycisk przerywany (D-44), dziś zamknięte „+ postać” na końcu kafelków Siedziby: error
  i empty nie dotyczą, jak przycisku; loading nie dotyczy, bo na serwer czeka tylko przycisk,
  który wysyła formularz. Spoczynek: ramka w `control-border` przerywana — słowo kluczowe
  `dashed`, bez nowej wartości — tekst w `text` na środku pudełka, które daje mu ekran, bez
  wypełnienia; pod kursorem tło `highlight`, a ramka i tekst bez zmiany, nie jaśniejsza ramka
  i jaśniejszy napis jak w starym Loopie; wyłączony — tekst w `text-disabled`, jak każdy
  wyłączony przycisk. Fokus rysuje reguła Visible focus.
- `src/browser/view/controls/react-button.tsx`
  — akcja poboczna (D-275): error
  i empty nie dotyczą, jak przycisku; loading nie dotyczy, bo na serwer czeka
  tylko przycisk, który wysyła formularz, a akcja poboczna jest wtedy
  wyłączona. Spoczynek: podkreślony tekst w `text-secondary`, bez ramki i bez
  odstępów po bokach, więc zaczyna się równo z polami; pod kursorem tekst
  w `text`, a tło zostaje bez zmiany, bez `highlight`; wyłączona — tekst
  w `text-disabled`.
- `src/browser/view/controls/react-button.tsx`
  — zakładka, czyli przycisk wybrany
  w grupie narysowany jako zakładka (D-276): error i empty nie dotyczą, jak
  przycisku; loading nie dotyczy, bo na serwer czeka tylko przycisk, który
  wysyła formularz, a zakładka jest wtedy wyłączona, z linią wyboru. Zakładka
  nie ma ramki, a jej tekst stoi w rozmiarze `--font-size-body`; wybrana ma
  tekst w `text-strong` o wadze `--font-weight-emphasis` i linię u dołu
  w `selected` o grubości `--bar-width`, niewybrana — tekst w `text-label`;
  pod kursorem tło `highlight`; wyłączona, gdy formularz czeka na serwer —
  tekst w `text-disabled`, a linia wyboru zostaje. Pod całą grupą stoi cienka
  linia w `divider`, którą rysuje klasa `tabs` kontenera zakładek.
- `src/browser/view/controls/react-select-list.tsx`
  — lista wyboru: error nie
  dotyczy, bo lista podaje tylko poprawne pozycje; loading nie dotyczy, bo
  żaden formularz czekający na serwer jej nie ma.
- `src/browser/view/controls/react-number-field.tsx`
  — pole liczby: loading nie
  dotyczy, bo żaden formularz czekający na serwer go nie ma.
- `src/browser/view/controls/react-pick-cell.tsx`
  — komórka wyboru, czyli jedna
  pozycja wyboru w oknie reguły (D-288, D-44): default — ramka w
  `control-border`, tekst w `text`; hover — tło `highlight`; visible focus —
  obwódka z reguły Visible focus (D-47); wybrana wygląda jak przycisk wybrany
  w grupie, z ramką w `selected` i tekstem w `text-strong` (D-40);
  wyszarzona (stan disabled) ma ramkę przerywaną w `text-disabled` — słowo
  kluczowe `dashed`, bez nowej wartości — z nazwą też w `text-disabled` i z powodem w `text-secondary` (D-289), który łamie się tylko między słowami, a nazwa komórki także w słowie, gdy żaden odstęp nie pomaga;
  pod kursorem nie dostaje tła `highlight`; klawiatura dochodzi do wyszarzonej komórki, żeby przeczytać jej
  powód, a wybór jej niczego nie robi. Error nie dotyczy, bo komórka nie ma
  wpisu, który mógłby być błędny; empty nie dotyczy, bo komórka jest jedną
  pozycją, nie listą; loading nie dotyczy, bo żaden formularz czekający na
  serwer jej nie ma. Ikona czynności w komórce jest rysowana maską w kolorze
  tekstu obok (D-291, D-43), więc szarzeje razem z wyszarzoną komórką.
- `src/browser/view/controls/react-button.tsx`
  — przycisk komórki wiersza ciała, rodzaj `value-cell` (D-44, D-337, D-450): default — bez
  własnego tła, ramka w `control-border`, nazwa wartości w `text-label`, jej liczba w `text`,
  dopisek w `text-secondary`; ramka komórki temperatury ma kolor tego, co działa na postać (reguła
  The body row of a map run). Hover — nie tło `highlight`, jak u każdego innego przycisku, tylko
  nazwa wartości jaśnieje do `text-strong`, a tło i ramka zostają bez zmiany; tak samo wygląda
  komórka, której objaśnienie stoi otwarte (`aria-expanded`), więc komórka pod kursorem i komórka
  otwarta wyglądają tak samo, a którą otwarto, mówi objaśnienie pod wierszem. Visible focus —
  obwódka z reguły Visible focus. Disabled — cały tekst komórki w `text-disabled`, jak u każdego
  wyłączonego przycisku. Error nie dotyczy, bo komórka nie ma wpisu; empty nie dotyczy, bo komórka
  nie ma pozycji ani listy; loading nie dotyczy, bo komórka nie czeka na serwer, a kontrolka tego
  rodzaju nie ma tekstu oczekiwania. Powód odstępstwa od hover: tor paska komórki stoi w `highlight`,
  w tym samym kolorze co tło przycisku pod kursorem, więc to tło zlałoby pusty albo prawie pusty pasek
  z tłem komórki; nazwa jaśnieje zamiast tła, jak nazwa otwartej komórki w starym Loopie (D-40).
  Cel dotyku w układzie telefonu trzyma jak każdy przycisk. Komórka zdrowia, która nie jest
  przyciskiem, nie jest kontrolką i stanów nie ma.
- `src/browser/view/controls/react-button.tsx`
  — kafelek miejsca wyposażenia, rodzaj wspólnego przycisku (D-44, D-461): kwadrat, który
  zamiast tekstu niesie ikonę przedmiotu, jaki miejsce trzyma, albo bladą nazwę miejsca, gdy
  miejsce jest puste. Default — bez własnego tła, ramka w `control-border`, ikona rysowana maską
  w `text-strong`, bo obok niej nie ma tekstu (D-43). Hover — tło `highlight`, jak u każdego
  przycisku, ramka i rola treści bez zmiany; tor paska, który kazał komórce wiersza ciała
  odejść od tego, tu nie stoi. Visible focus — obwódka z reguły Visible focus. Wybrany w swojej
  grupie — ramka w `selected`, jak wybrana komórka wyboru, i `aria-pressed`, a treść w tej samej
  roli co niewybranego; wybrany jest najwyżej jeden kafelek grupy. Disabled — treść w
  `text-disabled`, ramka w `control-border`, jak u każdego wyłączonego przycisku. Empty —
  kafelek miejsca, które nic nie trzyma: pusta jest treść kafelka, nie lista, więc stan to
  blada nazwa miejsca w `text-label` zamiast ikony, jak puste pole z podpowiedzią w `text-label`.
  Error nie dotyczy, bo kafelek nie ma wpisu; loading nie dotyczy, bo kafelek nie czeka na
  serwer, a kontrolka tego rodzaju nie ma tekstu oczekiwania. Powód odstępstwa: wspólny
  przycisk ma sam tekst, a kafelek ma kształt kwadratu i treść, którą jest ikona albo nazwa,
  więc jego stany stoją tu osobno, a nie wynikają z postaci zwykłego przycisku. Cel dotyku
  w układzie telefonu trzyma jak każdy przycisk, kwadratem o obu bokach co najmniej
  `--touch-target-min`.

Kontrolka, która odstępuje od listy stanów, stoi tu ze swoją ścieżką i powodem;
reguła nie powtarza listy kontrolek, którą trzyma kod. Przegląd porównuje stany
każdej zmienionej kontrolki z tą listą i ze stroną wszystkich stanów.

### A fault of one screen is fixed in its component

- **Decision:** D-38
- **Invariant:** none
- **Good:** Za ciasny nagłówek ekranu przejścia poprawiony w regułach tego nagłówka innym stopniem skali odstępów.
- **Bad:** Wartość stopnia skali odstępów zmieniona w pliku tokenów, żeby zmieścił się nagłówek ekranu przejścia.

Token projektowy niesie znaczenie dla całego produktu. Zmiana znaczenia roli to
nowa albo zmieniona decyzja (D-39, D-40, D-41); zmiana wartości, która
zachowuje znaczenie, decyzją nie jest. Błąd jednego ekranu poprawiaj
w komponencie tego ekranu — w jego module albo w jego regułach arkusza stylów —
nigdy przez zmianę wartości globalnego tokenu ze względu na ten jeden ekran.
Przegląd zmiany pliku tokenów ocenia, czy zmienia ona znaczenie roli albo
zmienia wartość globalną dla jednego ekranu.

### A stylesheet of its own for each screen and each shared part

- **Decision:** D-421 · D-408 · D-28
- **Invariant:** none
- **Good:** Nowy ekran z plikiem `.css` leżącym wprost w `src/browser/` i z własnym `<link>` w `src/browser/index.html`; reguły części, której używają dwa ekrany, w pliku tej części, a nie w arkuszu jednego z nich.
- **Bad:** Reguły nowego ekranu dopisane na końcu `src/browser/styles.css` albo do arkusza innego ekranu; arkusz ekranu w podkatalogu `src/browser/`; strona wszystkich stanów z `<link>` do arkusza ekranu.

Każdy ekran i każda część, której używa kilka ekranów, ma własny arkusz: plik
`.css` leżący wprost w `src/browser/`, nie w podkatalogu, i własny znacznik
`<link>` w `src/browser/index.html`, po `/styles.css`. Nowy ekran dodaje oba
w tej samej zmianie, w której dodaje sam ekran (D-408); budowanie kopiuje plik
tak jak inne pliki tego rodzaju, więc nie dokładasz żadnego kroku budowania.
Plik zaczyna się komentarzem, który mówi, co zawiera, a wartości wyglądu czyta
z tokenów przez `var(--…)` (reguła No value in place of a design token).
Reguły ekranu piszesz w arkuszu tego ekranu, nigdy w `src/browser/styles.css`
ani w arkuszu innego ekranu; gdy tej samej reguły potrzebują dwa ekrany, część
wspólna dostaje własny plik, żaden ekran nie czyta arkusza drugiego. Arkusz
ekranu nie ustawia `outline` i nie powtarza reguły `:focus-visible` (reguła
Visible focus).

`src/browser/styles.css` trzyma to, co wspólne: reguły podstawowe, jedyną
regułę `:focus-visible`, pasek menu, wiersze zdań, wspólne kontrolki, wspólny
układ ekranów (miejsce ekranów, czyli `.app-main`, `.screen` i `.screen-area`,
oraz kolumny ekranów Programy, Mapy i Wiedza z ich `@media`) i reguły tego, co
strona wszystkich stanów rysuje poza kontrolkami. Trzyma też regułę, której
potrzebują elementy kilku ekranów, której nie da się podzielić bez zmiany jej
tekstu i która nie należy do żadnej części z własnym arkuszem — tak jak reguły
sekcji „Autorzy grafiki”, które nazywają kartę logowania i Siedzibę, należą do
`src/browser/credits.css`: regułę, której lista selektorów nazywa klasy więcej
niż jednego ekranu, i regułę zdania, które rysuje kilka ekranów. Dziś to, poza
wymienionymi kolumnami, zdanie `trip-warning` i animacja klatek obrazków sceny
i obozu z jej `@keyframes`. Taka reguła stoi
w całości w `src/browser/styles.css`, nie w pliku własnym, a komentarz przy niej
mówi, że stoi tam z tego powodu. Reguły jednego ekranu tam nie stoją; wygląd
wspólnej kontrolki stoi tylko tam (D-265). Strona
wszystkich stanów linkuje poza plikiem tokenów `src/browser/styles.css` i własny
arkusz, `src/browser/kitchen-sink/kitchen-sink.css`, i nic więcej: żadnego
arkusza ekranu.

### Every value with its source

- **Decision:** D-38
- **Invariant:** design-token-sources
- **Good:** Nowa wartość w pliku tokenów z komentarzem `Source:` po `;` w tej samej linii, wskazującym element strony gry loop, z którego ją odczytano.
- **Bad:** Wartość dopisana do pliku tokenów bez wpisu źródła albo ze źródłem podanym z pamięci.

Plik tokenów `src/browser/tokens.css` ma tylko jedną regułę `:root`
z własnościami i reguły `@font-face`. Każda deklaracja — własność albo
deskryptor `@font-face` — biegnie od swojej nazwy do `;`, który ją kończy,
przez tyle linii, ile da jej Prettier. Zaraz po tym `;`, w tej samej linii,
stoi komentarz zaczynający się od `Source:` z niepustą treścią. Reguła
`@font-face` ma tylko deskryptory `font-family`, `src` i `font-weight`.

Źródło wartości ustalone z Mariuszem dla loop2, z czterema rodzajami dołożonymi
później: grubością belki i linii zakładki (2026-11-02), wyglądem sceny
(2026-11-11), kolorami trzech chwil sceny (2026-11-12) oraz wartościami, których
wybór przyjęty tekst zadania zostawił agentowi (2026-11-26):

- dla wartości wziętej z gry loop — działająca gra loop pod
  https://kantarion.bieda.it/, odczytana 2026-10-20 z wyrenderowanej strony,
  a dla rozmiaru tytułu karty mapy (`--font-size-map-card-title`, D-327)
  2026-11-26, z elementem, z którego wartość wzięto;
- dla wartości zmienionej wobec loop — próg kontrastu z D-42, który ją
  wyznaczył;
- dla wartości, których loop nie pokazała — kafelek odsłonięty, podświetlenie
  powiązania, fokus, krycie ikon wyczerpanych — wybór Mariusza z podglądu
  wariantów terenu i fokusu;
- dla wartości, której loop nie pokazała, a którą Mariusz wybrał z podglądu
  wariantów poza terenem i fokusem — grubość `--bar-width` belki przy zdaniu
  pod formularzem i linii wybranej zakładki, z podglądu wariantów karty
  z 2026-11-02 — wybór Mariusza z tego podglądu z datą wyboru;
- dla wartości, których loop nie pokazała, a które Mariusz wybrał z podglądu wartości wyglądu
  sceny — chłodny i ciepły odcień światła sceny z ich kryciami oraz wypełnienie, obrys
  i kryształki szronu — wybór Mariusza z tego podglądu, wariant A odcieni i wariant FA szronu,
  z datą wyboru, 2026-11-11; tę samą datę niesie komentarz przy regule powrotu odcienia, której
  wartość nie jest tokenem;
- dla wartości, których żadne źródło nie ustala, a które zaproponowano na zrzutach sceny trzech chwil,
  gdy czas stoi, a Mariusz wybrał, przyjmując propozycję bez zmian — chłodna warstwa po śmierci
  z zimna z jej kryciem oraz dwa kolory drobinek światła — komentarz `Source:` niesie wybór Mariusza
  z datą, 2026-11-12, a przy kolorze drobinki podaje też piksel nazwanego obrazka paczki Pixel Crawler,
  z którego kolor odczytano;
- dla wartości, której wybór przyjęty tekst zadania albo uwaga człowieka do zadania
  przed prośbą o scalenie zostawia agentowi — dziś wypełnienie sytości, strefy
  wychłodzenia i bezpieczna oraz kreska skali temperatury w wierszu ciała, a także
  ramka okna reguły — komentarz `Source:` niesie wybór agenta
  („the agent's choice”) z zadaniem, które go zostawia, z datą wyboru i z progiem
  kontrastu z D-42, który wartość ogranicza, oraz miejsce, z którego wartość
  odczytano: kolor gry loop z jej wyrenderowanej strony albo z kodu wersji
  wdrożonej — gałęzi origin/test repozytorium loop, z commitem, plikiem
  i klasą — albo z palety, z której pochodzą kolory loop, z wersją i plikiem;
  z kodu wersji wdrożonej, z commitem, plikiem i klasą, pochodzi też wartość
  wiersza ciała, którą zadanie podaje samo — bursztyn ramki komórki
  temperatury i krycie przygaszonej fazy pulsowania alarmu;
- dla skali odstępów, grubości ramek i belek, stosów czcionek, wag czcionek
  i grubości linii siatki — wybór Mariusza z 2026-10-20;
- dla deskryptorów `@font-face` — wydanie github.com/vercel/geist-font,
  z którego pochodzą pliki czcionek (D-46), z jego tagiem i commitem.

Wartość i jej źródło bierz z tego, co ustalono z człowiekiem — także z wyboru,
który przyjęty tekst zadania zostawia agentowi, w granicach progu — nigdy
z pamięci ani z makiety; nowa albo zmieniona wartość dostaje wpis swojego źródła w tej
samej zmianie. Test sprawdza, że wpis jest, nie czy jest prawdziwy;
prawdziwość ocenia przegląd zmiany pliku tokenów.

### The kitchen-sink page

- **Decision:** D-38 · D-44 · D-45 · D-157 · D-269 · D-274 · D-276
- **Invariant:** application-build-kitchen-sink
- **Good:** Strona zbudowana komendą `npm run kitchen-sink` i podawana tylko na komputerze dewelopera.
- **Bad:** Strona składa ręcznie stan gry i rysuje z niego mapę gry albo trafia do wyniku `npm run build`.

Strona wszystkich stanów to `src/browser/kitchen-sink/index.html` — kod
produktu, nie część tekstu styleguide'u. Buduje ją i otwiera lokalnie osobna
komenda `npm run kitchen-sink`; nic, co pisze `npm run build`, a to trafia na
serwer testowy, jej nie zawiera (D-45). Strona pokazuje każdą wspólną kontrolkę
w jej postaci React (D-269), w każdym stanie albo z powodem, dla którego stan
nie dotyczy — przycisk także w głównym wyglądzie (D-274), jako zakładkę
wybraną i niewybraną (D-276), w `positive` (D-44, D-39), przerywany (D-44), przycisk niszczący
w spoczynku, pod kursorem, przy fokusie i wyłączony, gdy czeka na serwer
(D-44, D-402) — formularze
logowania i zakładania konta, „Nie pamiętam hasła” i „Ustaw nowe hasło”
czekające na serwer i ze zdaniem odmowy pod nimi oraz formularz „Nie pamiętam
hasła” ze zdaniem odpowiedzi na prośbę w `text` z belką (D-44),
część menu „Konto” dla niepotwierdzonego adresu (D-157) z przyciskiem „Wyślij
ponownie” czekającym na serwer („Wysyłanie…”) i ze zdaniem odmowy obok
przycisku, zbudowaną na stronie z postaci React wspólnych kontrolek (D-269)
(wszystko z wartościami zmyślonymi, bez stanu gry), każdą rolę
z tabeli Roles i próbki wyglądu kafelków w każdym stanie, narysowane rolami —
nigdy rysunek gry ze stanu gry (D-04, D-45). Nowa wspólna kontrolka, nowy stan
albo nowa rola trafia na stronę w tej samej zmianie.

Źródła strony stoją w `src/browser/kitchen-sink/`. Poza tym katalogiem strona
importuje tylko moduły, których używa gra; kod potrzebny tylko jej zostaje
w tym katalogu, w modułach obok jej modułu wejściowego, a nie w
`src/browser/view/`, gdzie trafiłby do wyniku `npm run build`.

### Two layouts and one threshold between them

- **Decision:** D-396 · D-280 · D-282 · D-421 · D-43 · D-349
- **Invariant:** none
- **Good:** Reguły układu telefonu ekranu Programy w bloku `@media (width < 1280px)` w arkuszu tego ekranu, z komentarzem „D-396”, po regułach układu komputera, które ten blok zmienia; ekran przejścia w układzie telefonu z trzema obszarami w jednej kolumnie — światem, programem i obszarem z zakładkami „Kronika” i „Teren” — w tej kolejności.
- **Bad:** `@media screen and (width < 1280px)`; `@media (max-width: 720px)` albo `@media (min-width: 1074px)` jako osobny wygląd; osobny układ dla okna węższego niż 1280 px, a szerszego niż telefon; reguła układu komputera przepisana tak, żeby pasowała do telefonu; obszar strony 360 px wpisany w arkusz; ekran z dwiema kolumnami obok siebie w układzie telefonu.

Gra ma dwa układy i jeden próg między nimi (D-396). Okno, którego obszar strony ma 1280 px
szerokości albo więcej, pokazuje układ komputera, a każde węższe okno, także okno komputera,
pokazuje układ telefonu, projektowany pod telefon trzymany pionowo, z obszarem strony szerokim
na 360 px. Obszar strony to obszar strony wewnątrz okna przeglądarki, który podają `innerWidth`
i `document.documentElement.clientWidth`; nie jest rozdzielczością ekranu. Wąskie okno komputera
jest telefonem, nie wąskim komputerem: nie ma trzeciego układu ani osobnego wyglądu dla okna
węższego niż 1280 px, a szerszego niż telefon, i progi 720 px oraz 1074 px nie wyznaczają
osobnego wyglądu.

Jak układ telefonu się zapisuje:

- Reguły układu telefonu stoją w blokach `@media (width < 1280px)`, w składni zakresu i z liczbą z
  D-396 zapisaną tak, jak stoi. Blok stoi w arkuszu, do którego należy element (reguła A stylesheet
  of its own for each screen and each shared part, D-421): w arkuszu ekranu albo części, a dla
  wspólnych kontrolek i wspólnego układu w `src/browser/styles.css`. Każdy blok ma komentarz, który
  nazywa D-396, i stoi po regułach układu komputera, które zmienia; reguł układu komputera blok
  nie dotyka.
- Blok nie ma typu nośnika: `@media (width < 1280px)`, nigdy `@media screen and (width < 1280px)`.
  Powód: jsdom, w którym działają testy, stosuje blok `@media` tylko wtedy, gdy jego lista zawiera
  słowo `screen`, więc blok ze słowem `screen` obowiązywałby w testach przy każdej szerokości.
- Próg 1280 px stoi w każdej regule `@media`, a jego źródłem jest komentarz D-396 przy niej i ta
  reguła. Nie ma na niego tokenu: CSS nie czyta własności niestandardowej w warunku `@media`,
  a D-43 próg zwalnia. Obszaru 360 px nie ma w żadnym arkuszu: stoi tylko w skillu `loop2-play`
  i w tej regule.
- Poza progiem 1280 px nie ma żadnego innego progu szerokości w regule `@media`, z jednym
  wyjątkiem: progiem, przy którym scena w układzie telefonu przechodzi na większy rozmiar (reguła
  The scene of a map run, D-349). Warunek `prefers-reduced-motion` nie jest progiem szerokości.
  Warunek `hover: none` też nie jest progiem szerokości ani osobnym układem: bloki
  `@media (width < 1280px) and (hover: none)`, każdy w arkuszu, do którego należy element,
  zdejmują tło `highlight` spod kursora tam, gdzie urządzenie nie ma kursora, który najeżdża —
  kontrolkom, których tło w spoczynku jest przezroczyste, i wierszom: wierszowi reguły i nagłówkowi
  grupy w edytorze programu, „Teraz” i „Potem”, wierszowi listy map i listy programów. Wiersz
  otwarty zostaje na `highlight`, a wiersz reguły, która wygrywa albo której czynność trwa, na
  `rule-winning` albo `rule-running`. Tak samo przycisk komórki wiersza ciała, który pod kursorem
  zamiast tła rozjaśnia nazwę, zostaje w takim bloku z nazwą w `text-label`, chyba że jego
  objaśnienie stoi otwarte. Powód: przeglądarka dotyku trzyma `:hover` na ostatnio
  dotkniętym elemencie, także na wierszu wokół dotkniętego przycisku, aż do następnego dotknięcia,
  więc tło zostałoby na dotkniętej kontrolce, także na przycisku niszczącym, na wierszu reguły
  udawałoby regułę wybraną, a jasna nazwa komórki zamkniętej dotknięciem udawałaby komórkę otwartą;
  mysz, także w wąskim oknie komputera, widzi tło i nazwę pod kursorem jak dotąd.
- Reguła układu telefonu nie jest sprawdzana testem, bo jsdom jej nie stosuje; sprawdza ją
  agent w przeglądarce (reguła A change is checked in both layouts). To granica testów, nie
  usterka: zielony test mówi o układzie komputera i o logice, nie o układzie telefonu.

Co układ telefonu robi z ekranem:

- Treść ma szerokość okna pomniejszoną o boczny odstęp strony, a najwyżej 1344 px, jak w układzie
  komputera (D-280); odstęp strony w układzie telefonu to 8 px z każdej strony, na którym stoi
  rachunek rozmiaru sceny (reguła The scene of a map run).
- Obszary ekranu stoją w jednej kolumnie, jeden pod drugim (D-282): ekran przejścia — świat,
  program i obszar z zakładkami „Kronika” i „Teren”, w tej kolejności (D-311); inny ekran, na
  przykład Mapy, Wiedza albo Postać — w kolejności, w jakiej obszary stoją w układzie komputera, od
  lewej do prawej. Ekran, którego obszary układ telefonu mógłby ułożyć tylko obok siebie, narusza
  D-282.
- Usterkę układu telefonu naprawia się tam, gdzie pokazuje ją okno szerokości telefonu, wyższe niż
  szerokie: przy obszarze strony 360 px, a gdy usterka stoi przy innej szerokości, jak napisy komórek
  wyboru przy 1100 px, przy tej szerokości. Usterki w oknie węższym niż 360 px albo widocznej tylko
  w oknie szerszym niż wysokie, jak telefon obrócony bokiem, nie naprawia się, a usterki układu
  komputera w oknie niższym niż 720 px też nie, gdy żadna decyzja nie mówi, jak gra wygląda tam
  (D-396).

Przegląd zmiany ekranu czyta, czy zmiana ma reguły obu układów, czy blok układu telefonu stoi tak,
jak tu napisano, i czy żadna reguła układu komputera nie została dotknięta bez powodu.

### Nothing scrolls to the side in the phone layout, and no text crosses its frame

- **Decision:** D-396 · D-280 · D-349 · D-389
- **Invariant:** none
- **Good:** Tabela odkrytych kafelków i lista kont ułożone tak, że mieszczą się w szerokości ramki przy obszarze strony 360 px: tekst zawija się w swojej kolumnie albo kolumny stają jedna pod drugą; napis komórki wyboru czynności łamie się w komórce; polana pasa obozu przycięta po bokach ramką pasa, która niczego nie przewija.
- **Bad:** Ramka, w której tabelę przeciąga się palcem w bok; napis wychodzący poza ramkę komórki albo przycisku; ekran szerszy od okna, który przewija stronę w bok; ramka z paskiem przewijania w poziomie, dodanym po to, żeby za szeroka treść się zmieściła.

W układzie telefonu każdy ekran mieści się w szerokości okna i nic nie przewija się w bok: ani
strona, ani ramka, w której stoi tabela, lista albo okno (D-396). Żaden napis nie wychodzi poza
ramkę, w której stoi. Powód: gracz, który przeciąga palcem tabelę w bok, przewija w bok, a gry
granej na telefonie od początku do końca bez przewijania w bok to wyklucza. Tabela albo lista,
która w układzie komputera ma kolumny obok siebie, w układzie telefonu układa się tak, żeby zmieścić
się w szerokości swojej ramki — zawija tekst albo przestawia kolumny — nie dostaje przewijania.
Tekst, który wpisał gracz, łamie się w swoim wierszu (reguła A name typed by the player breaks in
its row). Przycięcie obrazka ramką — boki sceny, boki polany pasa obozu — nie jest przewijaniem, o
ile niczego, z czym gracz działa, nie chowa (D-349, D-389).

Sprawdza to pomiar z `.claude/skills/loop2-play/SKILL.md`: przy obszarze strony 360 px strona się nie
przewija w bok, a listy `contentWiderThanItsBox` i `outsideTheWindow` są puste. Pozycja na liście
jest znakiem, nie wyrokiem: obrazek sceny albo przycięty element może się na niej pokazać, a to, czy
napis wychodzi poza ramkę, rozstrzyga zrzut. Przegląd zmiany czyta każdy zmieniony ekran w tym
pomiarze.

### Everything is done by touch, and every control holds the touch target

- **Decision:** D-396 · D-44 · D-19 · D-288 · D-306 · D-296 · D-43 · D-47
- **Invariant:** none
- **Good:** Strzałki „↑” i „↓” grupy reguł w jej nagłówku w układzie komputera i w jej oknie w układzie telefonu, uchwyt dla myszy obok; zaznaczenie wiersza tabeli odkrytych kafelków dotknięciem kafelka obok zaznaczenia najechaniem; przycisk niszczący w `danger` już w spoczynku; `min-height: var(--touch-target-min)` w bloku `@media (width < 1280px)` reguły wiersza listy, który jest odnośnikiem.
- **Bad:** Czynność, którą da się zrobić tylko przeciągnięciem myszą albo tylko po najechaniu kursorem; przycisk niższy albo węższy niż `--touch-target-min` w układzie telefonu; `min-height: 48px` wpisane zamiast tokenu; kontrolka bez swojego celu dotyku tylko dlatego, że jej reguła stoi w arkuszu ekranu, a nie we wspólnym.

W układzie telefonu wszystko, co gra oferuje, robi się dotykiem (D-396): logowanie, pisanie i
zmiana programu, puszczenie przejścia i pętli, odczyt raportu z powrotu, odbiór wprawy i kupno
gałęzi. Żadna czynność nie ma za jedyną drogę najechania kursorem ani przeciągania myszą.
Najechanie albo przeciągnięcie wolno zostawić w układzie komputera jako dodatek do drogi dotykiem:

- rysunek mapy: najechanie kursorem na kafelek zaznacza jego wiersz w tabeli odkrytych kafelków,
  a dotknięcie kafelka palcem zaznacza ten wiersz i trzyma zaznaczenie, aż dotknięcie gdzie indziej
  je zdejmie; kliknięcie myszą w kafelek niczego nie zmienia (D-19);
- reguły i grupy reguł: przesuwają się strzałkami „↑” i „↓” w każdym układzie — w układzie komputera
  stoją one w wierszu reguły i w nagłówku grupy, a w układzie telefonu w oknie reguły i w oknie grupy
  (reguła The window of a rule and of a rule group) — a uchwyt z linią „tu wyląduje” jest dla myszy
  komputera (D-288);
- kolor albo wygląd, który pojawia się dopiero pod kursorem, nie niesie żadnej wiedzy, bez której
  gracz telefonu nie może działać: to, co gracz ma wiedzieć przed dotknięciem, stoi w spoczynku, jak
  tekst przycisku niszczącego w `danger` (D-44).

Każda kontrolka układu telefonu — przycisk w każdym rodzaju, strzałka, „✕”, komórka wyboru, lista
wyboru, pole liczby i pole tekstowe, pozycja paska menu, odnośnik menu „Konto”, wiersz listy,
który jest odnośnikiem do ekranu — ma cel dotyku wysoki i szeroki na co najmniej `--touch-target-min`
(D-396). Kontrolką jest to, co reguła Visible focus nazywa kontrolką: każdy element, na który
klawiatura wchodzi, odnośniki też. Wartość tokenu `--touch-target-min` w pliku tokenów pochodzi ze
źródła zapisanego w fakcie środowiska `android-touch-target-size`: wskazówek Androida o dostępności,
w których dp czytamy jako piksel strony, czyli jednostkę, w której liczy się obszar strony. Źródło
zwalnia z minimum wejście precyzyjne, mysz i gładzik, więc minimum dotyczy układu telefonu, a reguły
układu komputera zostają takie, jakie są.

- Minimum czyta `var(--touch-target-min)` w `min-width` i `min-height`, nigdy liczby wpisanej do
  arkusza (reguła No value in place of a design token). Rośnie pole dotyku, nie tekst: tekst stoi
  w środku celu, a linia bieżącej pozycji paska zostaje przy tekście.
- Kontrolka, której reguła stoi w arkuszu ekranu albo części, trzyma minimum tak samo jak wspólna:
  ekran dokłada je w swoim bloku `@media (width < 1280px)`. Wspólne kontrolki i kontrolki,
  których reguły stoją w `src/browser/styles.css`, trzyma jeden blok tego pliku.
- Odnośnik wewnątrz toczącego się zdania zachowuje wielkość swojego tekstu, a odnośnik, który sam
  jest kontrolką — cały wiersz nawigacji, pozycja menu, odnośnik stojący osobno jako cel podobny do
  przycisku — trzyma minimum (D-396). To jedyny wyjątek od minimum: D-47 liczy każdy odnośnik jako
  kontrolkę, a cel wysoki na 48 px rozerwałby linię tekstu.
- Wiersz, który otwiera się dotknięciem, otwiera się dotknięciem w dowolnym miejscu poza
  swoimi przyciskami, a przyciski nie sięgają nad jego środek: dotknięcie środka wiersza
  reguły nie trafia w sąsiedni przycisk i nie zmienia programu (D-306, D-296; reguła
  Program editor). W układzie telefonu wiersz reguły nie ma przycisków, a nagłówek grupy ma tylko
  „▾”: strzałki i usuwanie stoją w oknie reguły i w oknie grupy, na jego dole, więc chybione
  dotknięcie obok wiersza niczego nie przesuwa ani nie usuwa (D-288).

Przegląd zmiany czyta każdą kontrolkę zmienionego ekranu wobec minimum, w pomiarze z
`.claude/skills/loop2-play/SKILL.md` (lista `controlsSmallerThan48`), i każdą czynność wobec
pytania, czy da się ją zrobić samym dotykiem.

### A change is checked in both layouts

- **Decision:** D-396
- **Invariant:** none
- **Good:** Zmiana ekranu Wiedza sprawdzona w Chromium przy obszarze strony 1280 × 720 px, bez dotyku, a potem przy 360 px w oknie wyższym niż szerokie, z dotykiem, z pomiarem, który nie zgłasza przewijania w bok, napisu poza ramką ani kontrolki mniejszej niż minimum; usterka widziana przy 1100 px sprawdzona przy 1100 px.
- **Bad:** Sprawdzenie przy rozdzielczości ekranu 1280 × 720 px; układ telefonu sprawdzany kliknięciem myszy; ekran zaprojektowany dla komputera, z układem telefonu dopisanym w osobnym zadaniu; reguła układu telefonu uznana za sprawdzoną, bo test jest zielony.

Ekran projektuje się od razu w obu układach: zmiana, która dodaje albo zmienia ekran, dostaje
reguły układu komputera i bloki układu telefonu w tej samej zmianie. Jak agent sprawdza zmianę,
mówi sekcja „Check the phone layout” skilla `.claude/skills/loop2-play/SKILL.md` (D-396):

- układ komputera w Chromium przy obszarze strony 1280 × 720 px, w sesji bez dotyku — nie przy
  rozdzielczości ekranu 1280 × 720 px, bo obszar strony jest wtedy mniejszy;
- układ telefonu w Chromium przy obszarze strony szerokim na 360 px, w oknie wyższym niż szerokie,
  z obsługą dotyku; czynność robi się dotknięciem (`tap`), nie kliknięciem myszy, bo reguła, która
  czeka na dotyk, kliknięcia myszy nie widzi; do tego pomiar tego, że nic nie przewija się w bok, że żaden napis nie przekracza
  swojej ramki i że żadna kontrolka nie jest mniejsza niż minimum celu dotyku;
- inny obszar strony, gdy usterkę widać przy nim, jak 1100 px, i powrót do 1280 × 720 px przez
  zamknięcie sesji i otwarcie zwykłej, bo samo `resize` zostawia dotyk sesji;
- Firefox i Edge sprawdza się ręcznie, w prawdziwej przeglądarce, w osobnej sesji (D-396), a
  Chrome na telefonie z Androidem — gdy ktoś na nim zagra; agent sprawdza układ telefonu w
  Chromium przy wielkości telefonu, więc usterka widoczna tylko na prawdziwym telefonie może
  przejść.

Zrzut, który dostaje człowiek, powstaje według sekcji „Show a screenshot to the human” tego
skilla. Test w jsdom nie sprawdza układu telefonu (reguła Two layouts and one threshold between
them), więc zielony test nie zastępuje tego sprawdzenia.

### Main button, secondary action and tab

- **Decision:** D-274 · D-275 · D-276 · D-277 · D-287 · D-311 · D-280 · D-281 · D-44 · D-39 · D-243 · D-329
- **Invariant:** none
- **Good:** „Wróć do logowania” pod formularzem „Nie pamiętam hasła” zrobione wspólną akcją poboczną, a „Wyloguj” w menu „Konto” — zwykłym wspólnym przyciskiem; „Wejdź” przy postaci w „Kto idzie” w głównym wyglądzie, a „Puść w pętlę” obok — zwykłym; „Odbierz” przy wierszu raportu w Siedzibie przyciskiem w `positive`, nie w głównym wyglądzie; „← Ala” na początku nagłówka ekranu przejścia jako odnośnik do `#/postac/1` w `text-strong`, bez podkreślenia, pod kursorem na `highlight`.
- **Bad:** „Usuń” reguły programu narysowane jako podkreślony tekst albo formularz z dwoma przyciskami w głównym wyglądzie; „← Ala” w nagłówku ekranu przejścia jako przycisk albo w ramce wspólnego przycisku.

Główny wygląd, akcja poboczna, zakładka, przycisk w `positive` i przycisk przerywany to
wyglądy wspólnego przycisku, każdy na swoim miejscu, które podaje ta reguła; ich stany podaje
reguła States of shared controls.

- Główny wygląd ma przycisk, który wysyła formularz, jeden na
  formularz (D-274). Wygląd bierze się z samego wysyłania formularza
  (`<ReactButton submit>`),
  więc ekran nie daje mu rodzaju ani klasy. „Wejdź” przy każdej postaci
  w sekcji „Kto idzie” karty mapy ma ten sam główny wygląd, choć formularza
  nie wysyła (D-274): ekran daje mu rodzaj `main` wspólnego przycisku
  (`<ReactButton kind="main">`, klasa `main`). Wyłączony „Wejdź” (D-287) traci główny wygląd i wygląda jak
  każdy wyłączony przycisk (reguła States of shared controls), a „Puść w
  pętlę” obok, także jako „Puść mimo to” po pierwszym kliknięciu (D-243), i „Oceń
  na 12 ziarnach” (D-329) zostają zwykłymi przyciskami. Działanie poza formularzem i poza
  „Wejdź” zostaje przy przycisku, który daje mu D-44.
- Przycisk w `positive` (`kind: "positive"`) to zwykły przycisk z tekstem w `positive`;
  jest nim tylko „Odbierz” przy wierszu raportu z nieobecności w Siedzibie, który wypłaca
  czekającą wprawę (D-44, D-39, D-246). Nie jest głównym wyglądem, bo nie wysyła formularza
  i nie jest „Wejdź” (D-274), a `positive` stoi na nim tylko jako tekst. Każde inne działanie
  zostaje przy przycisku, który daje mu D-44.
- Przycisk przerywany (`kind: "dashed"`) to zamknięte „+ postać”, które kończy kafelki
  sekcji „Drużyna” Siedziby i otwiera w swoim miejscu pole imienia (D-44; reguła The section
  „Drużyna” of Siedziba). Każde inne działanie zostaje przy przycisku, który daje mu D-44.
- Akcją poboczną (`kind: "secondary"`) jest tylko działanie, które otwiera
  albo opuszcza stan formularza i stoi pod tym formularzem — dziś „Nie
  pamiętam hasła”, „Wróć do logowania” i „Anuluj” karty logowania oraz „Anuluj” pod polem
  otwartego kafelka „+ postać” (D-275).
  Zostaje przyciskiem, bo zmienia stan ekranu i nie ma adresu, nigdy
  odnośnikiem. Każde inne działanie, choćby poboczne, zostaje przy
  przycisku, który daje mu D-44.
- Zakładka (`kind: "tab"`) to przycisk wybrany w grupie narysowany bez
  ramki — dziś przełącznik „Zaloguj się” i „Załóż konto” karty logowania
  (D-276) oraz dwa przyciski „Kronika” i „Teren” nad treścią obszaru pod światem
  na ekranie przejścia; otwarte okno reguły ich nie zastępuje (D-311). „Zakładka”
  znaczy w wytycznych wygląd: element, atrybut
  `aria-pressed` i klawiatura zostają jak przy przycisku wybranym w grupie —
  Tab przechodzi przez każdą, Enter albo Spacja przełącza — bez strzałek
  i bez ról zakładek (`role="tab"`). Grupa zaznacza wybraną zakładkę jak
  wybrany przycisk (`selected` przycisku `ReactButton`), a kontener
  zakładek dostaje klasę `tabs`. Przyciski tempa (D-130) zostają przy
  wyglądzie przycisku wybranego w grupie.
- Pasek menu znaczy pozycję, na której jest gracz, tak jak wybraną zakładkę:
  tekst w `text-strong` i ta sama linia w `selected` u dołu (D-277) — nigdy
  zielenią, tłem ani ramką. Wygląd pozycji paska, menu „Konto” i pozycji
  listy programów podaje reguła Menu bar, the menu „Konto” and the list of
  programs.
- „← {imię postaci}” na początku nagłówka ekranu przejścia (D-280, D-311) jest
  odnośnikiem do ekranu Postać tej postaci, nie przyciskiem: ma adres
  (D-281), jak pozycja paska menu, a przyciskami nagłówka zostają „Pauza”,
  tempa, „Restart” i „Zakończ”. Stoi w miejscu samego imienia i wygląda jak
  imię: w nagłówku drugiego stopnia, w `text-strong` (rola nazwy, D-40),
  w rozmiarze `--font-size-heading` i wadze `--font-weight-emphasis`, bez
  podkreślenia i bez ramki, strzałka w tym samym kolorze co imię; pod kursorem
  tło `highlight`, a rola tekstu zostaje; fokus rysuje reguła Visible focus
  bez dodatku (D-47). Imię wpisał gracz, więc łamie się w nagłówku (reguła A
  name typed by the player breaks in its row). W układzie telefonu odnośnik
  stoi sam jako kontrolka, więc trzyma cel dotyku `--touch-target-min` w bloku
  `@media (width < 1280px)` arkusza ekranu przejścia, z tekstem pośrodku
  wysokości celu, a na urządzeniu, które nie najeżdża, nie dostaje tła pod
  kursorem (D-396).

### A line at a text takes the colour of that text

- **Decision:** D-279 · D-39 · D-40
- **Invariant:** none
- **Good:** Ramka głównego przycisku w `currentColor` obok jego tekstu w `text-strong`; belka zdania po prośbie o odnośnik w kolorze tego zdania.
- **Bad:** Belka zdania po prośbie o odnośnik w `text-secondary` obok zdania w `text` albo ramka głównego przycisku w `selected`.

Ramka albo belka, którą ekran rysuje przy tekście, żeby go wyróżnić — ramka
głównego przycisku, belka zdania po prośbie o odnośnik, ramka pola z błędem
w kolorze jego komunikatu, linia upuszczenia reguły przy napisie „tu wyląduje”
w kolorze tego napisu — bierze kolor tego tekstu: w stylach
`currentColor` albo tę samą rolę co tekst. Jest częścią tekstu, więc nie
dostaje własnej roli i nie zmienia znaczenia roli tego tekstu (D-39, D-40).
Linia, która znaczy wybrane w swojej grupie — ramka przycisku wybranego
w grupie, linia wybranej zakładki i bieżącej pozycji paska menu oraz belka
wybranej pozycji listy programów — zostaje w `selected`; wyjątkiem jest belka
wybranego wiersza katalogu map, która stoi w `positive` (D-279, D-39, D-331). Pasek stanu reguły
programu i grupy reguł (reguła Program editor) nie jest taką ramką ani belką:
mówi o stanie reguły i nie bierze koloru tekstu obok (D-39). Przegląd zmiany
czyta kolor każdej takiej ramki i belki wobec tekstu, przy którym stoi.

### A name typed by the player breaks in its row

- **Decision:** none
- **Invariant:** none
- **Good:** Imię postaci z samych liter, dłuższe od kafelka postaci w Siedzibie, łamie się w tym kafelku i nie wychodzi poza niego; tak samo nazwa programu na liście Programy i adres konta w menu „Konto”.
- **Bad:** Długie imię bez spacji wypycha wiersz poza obszar ekranu albo jest ucięte, albo przewijane tylko dlatego, że nie ma w nim spacji.

Tekst, który wpisał gracz, taki jak imię postaci, nazwa albo adres konta, może
nie mieć spacji, więc wiersz, który go pokazuje, łamie go w swoim obrębie, a nie
przepuszcza poza siebie, nie ucina i nie przewija. Reguła dotyczy każdego
wiersza z takim tekstem, także nowego. Powód: wpis bez spacji nie ma gdzie się
złamać sam, więc bez tej reguły długie imię wypycha wiersz poza ekran.

Dotyczy to także zdania, które taką nazwę albo taki adres wymienia. Wyjątek:
lista wyboru (`select`) nie łamie nazwy, tylko ją ucina, bo natywne pole wyboru
nie łamie tekstu. Lista nie jest szersza od wiersza, w którym stoi, a wiersz
z listą nie jest szerszy od swojej kolumny: w kolumnie flex, która nie
rozciąga swoich elementów, wiersz dostaje `max-width: 100%`. Nazwa wybranej
pozycji, dłuższa od listy, kończy się wielokropkiem, a pełna nazwa stoi
w rozwiniętych opcjach.

### Focus does not fall to the page

- **Decision:** none
- **Invariant:** none
- **Good:** Po „Zatrzymaj” przy postaci w pętli fokus zostaje w kafelku tej postaci, na jej imieniu; „✕” okna reguły, które stoi pod nagłówkiem zwiniętej grupy, oddaje fokus nagłówkowi tej grupy.
- **Bad:** Element z fokusem znika, a fokus ląduje na stronie, więc gracz z klawiaturą zaczyna ekran od góry.

Gdy element, który trzyma fokus, znika z ekranu — zamknięta karta, zamknięty
panel, wiersz albo przycisk, który po kliknięciu znika — ekran oddaje fokus
elementowi, który stoi w jego miejscu albo najbliżej niego, nigdy stronie. Powód:
fokus na stronie każe graczowi klawiatury przechodzić ekran od początku.

### The menu bar stays in sight when the screen of a map run opens

- **Decision:** none
- **Invariant:** none
- **Good:** Po „Wejdź” na ekranie Mapy i po „Wróć do przejścia” na pasku menu ekran przejścia otwiera się z paskiem menu w polu widzenia, a fokus klawiatury stoi na tym ekranie.
- **Bad:** Fokus przeniesiony na ekran przejścia przewija stronę, tak że pasek menu wychodzi nad górną krawędź okna.

Gdy otwiera się ekran przejścia, pasek menu stoi w polu widzenia: przeniesienie
fokusu klawiatury na ten ekran nie przewija strony. Powód: strona przewinięta
przy wejściu chowa pasek menu nad krawędzią okna, a z nim drogę do innych
ekranów.

### Menu bar, the menu „Konto” and the list of programs

- **Decision:** D-280 · D-330 · D-331 · D-281 · D-277 · D-276 · D-275 · D-285 · D-157 · D-97 · D-208 · D-262 · D-44 · D-40 · D-39 · D-43 · D-47 · D-410 · D-411 · D-396
- **Invariant:** none
- **Good:** Pozycja „Programy” na ekranie Programy w `text-strong` z linią w `selected` u dołu, a „Wyloguj” w menu „Konto”, które po odpowiedzi serwera stoi otwarte ze zdaniem wyniku.
- **Bad:** Pozycja paska z ikoną, zaznaczona zielenią albo tłem; „Wróć do przejścia” zaznaczone na ekranie przejścia; menu „Konto” zamykające się samo po odpowiedzi serwera.

Pasek menu stoi u góry każdego ekranu zalogowanego gracza. Treść pod nim ma
najwyżej 1344 px szerokości, a tam, gdzie okno pomniejszone o boczny odstęp strony jest węższe,
tyle, w układzie komputera i w układzie telefonu (D-280, D-396);
szerokość z maksimum jest wymiarem układu, nie wartością wpisaną zamiast tokenu
(D-43).

Pasek:

- po lewej stoi nazwa gry w `text-strong` (rola nazwy, D-40); na ekranach
  oczekiwania (D-262) stoi sama, bez pozycji i bez menu „Konto” (D-280);
- pozycje to „Siedziba”, „Mapy”, „Programy”, „Wiedza” i, poza ekranem przejścia, „Wróć do
  przejścia · {mapa} · minuta {m}”, bez ikon (D-280); każda jest odnośnikiem do
  ekranu (D-281), nie przyciskiem — przeciwnie niż akcja poboczna, która adresu
  nie ma (D-275); „Mapy” to pierwsze z trzech kliknięć do pierwszego przejścia,
  a przy postaci w Siedzibie nie stoi przycisk prowadzący na ekran Mapy (D-330);
- pozycja jest narysowana jak zakładka (D-276, D-277), bez ramki: pozycja
  miejsca, w którym jest gracz, ma tekst w `text-strong` i linię u dołu
  w `selected` o grubości `--bar-width`, każda inna — tekst w `text-label`;
  pod kursorem tło `highlight`, a rola tekstu zostaje; fokus rysuje reguła
  Visible focus bez dodatku (D-47);
- na ekranie Postać pasek znaczy Siedzibę, na ekranie Mapy pod każdym jego
  adresem znaczy Mapy, na ekranie Wiedza znaczy Wiedzę jak każdą inną pozycję (D-277), a na
  ekranie przejścia nie znaczy żadnej pozycji (D-280);
- pozycje paska są te same dla gracza i dla konta z rolą właściciela (D-280,
  D-410); ekran listy kont (D-411) nie jest pozycją paska i na nim żadna
  pozycja nie jest zaznaczona (D-281);
- pasek nie ma pozycji nieaktywnych (D-280), więc stan disabled nie dotyczy
  pozycji; error, empty i loading też nie, bo pozycja nie ma wpisu, listy
  i nie czeka na serwer;
- ostrzeżenie o nieudanym zapisie stanu gry, także przed wylogowaniem, stoi
  w wierszu pod paskiem, nie w menu „Konto” (D-97, D-208).

Menu „Konto”:

- „Konto” jest wspólnym zwykłym przyciskiem (D-44): ani głównym wyglądem, ani
  akcją poboczną, ani zakładką; jego stany podaje reguła States of shared
  controls;
- otwarte menu stoi pod „Konto” jako blok na tle `panel` z tekstem w `text`
  (D-40) i trzyma adres konta oraz „Wyloguj”; dla niepotwierdzonego adresu
  także „Adres e-mail niepotwierdzony.” w `text-secondary` ze wspólnym
  przyciskiem „Wyślij ponownie”, obie rzeczy znikają po potwierdzeniu adresu
  (D-157);
- u konta z rolą właściciela (D-410) stoi w menu, po adresie i przed
  przyciskami, odnośnik „Panel właściciela” prowadzący do `#/konta` (D-281):
  zwykły odnośnik menu, nie pozycja paska; tekst w `text`, pod kursorem tło
  `highlight`, jak odnośnik na liście programów, a fokus rysuje reguła Visible
  focus. Gracz tego odnośnika nie ma;
- zdanie o wyniku wysyłania stoi w tym miejscu, w kolorach z D-157 (w
  `text-secondary` po wysłaniu, w `warning` przy odmowie i przy błędzie),
  w zamkniętym menu bez znaku na pasku (D-157);
- „Wyloguj” i „Wyślij ponownie” czekają na serwer jak każdy wspólny przycisk
  (reguła States of shared controls);
- menu otwiera się kliknięciem „Konto” i klawiaturą — Enter na „Konto” — a
  zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem „Konto”;
  po Escape i po drugim kliknięciu „Konto” fokus wraca na „Konto”, po kliknięciu
  obok zostaje tam, gdzie gracz kliknął, a gdy to miejsce fokusu nie przyjmuje,
  wraca na „Konto”, nie zostaje na zamkniętym, ukrytym elemencie menu; menu
  zostaje otwarte, gdy „Wyloguj” albo „Wyślij ponownie” czeka na serwer,
  i po odpowiedzi stoi otwarte, aż gracz je zamknie (D-285).

Lista programów na ekranie Programy: pozycja jest odnośnikiem do programu
(D-281); wybrana ma tekst w `text-strong` i belkę w `selected` o grubości
`--bar-width` po lewej, każda inna — tekst w `text`; pod kursorem tło
`highlight` (D-40, D-331). Przegląd zmiany czyta pozycje paska, menu i listy
wobec tej reguły i wobec strony wszystkich stanów.

### The screen Mapy

- **Decision:** D-325 · D-326 · D-327 · D-328 · D-329 · D-331 · D-332 · D-333 · D-439 · D-440 · D-441 · D-243 · D-133 · D-134 · D-149 · D-188 · D-217 · D-244 · D-274 · D-279 · D-287 · D-281 · D-27 · D-39 · D-40 · D-43 · D-44 · D-282 · D-396
- **Invariant:** none
- **Good:** Wiersz rozwiązanej mapy w katalogu: kółko wypełnione w `positive`, nazwa w `text`, pod nią fakty w `text-secondary`, z „⊘ wnosisz 0” w `warning`; wybrany wiersz wypełniony `highlight`, z tekstem w `text-strong` i belką w `positive` po lewej; trzy widoki jako przyciski w ramkach, wybrany z ramką w `selected`; w nagłówku karty Las — głębiej nazwa w `text-strong`, obok niej wilcza głowa maską w tym samym kolorze i obok nich „otwarta” w `text-secondary`, a po prawej „Wejdź — wybierz postać”; przy Mateczniku po pierwszej ocenie na końcu wiersza „niedźwiedź: 24 ze 120” w `text`; przed wyborem w obszarze karty „Wybierz mapę z listy.” w `text-secondary`; pod postacią wynik oceny z nagłówkiem w `text-strong`, wierszem śmierci w `danger` i wierszem bez rozstrzygnięcia w `warning`, a przy liście „Program:” „szczelny: 12 z 12” w `positive`.
- **Bad:** Kółko stanu rozwiązanej mapy w `text` albo „rozwiązana” po nazwie wiersza katalogu; wybrany wiersz z samą belką, bez wypełnienia, albo z belką w `selected`; zwijak przygaszony, gdy stoi wybrana mapa albo wpisany tekst; widoki jako podkreślone zakładki; „otwarta” w `positive`; liczba niedźwiedzia przy Mateczniku przed pierwszą oceną albo jako „0”; obszar karty przed wyborem pusty; pułap „wnosisz najwyżej {n}” w `text`, a nie w `warning`; sekcja „Kto idzie” bez nagłówka; „Wejdź” w zwykłym wyglądzie obok „Puść w pętlę” w tym samym wyglądzie; wiersz śmierci z oceny w `warning` albo wiersz bez rozstrzygnięcia w `danger`; „szczelny: 12 z 12” w `text`; zdanie „Na {k} z 12 ziaren program mapy nie rozwiązuje.” w `text-secondary`; „Oceń na 12 ziarnach” albo „Puść mimo to” w głównym wyglądzie.

Ekran Mapy (`#/mapy` i `#/mapy/{map}`, D-325, D-331) ma dwa obszary: w układzie
komputera po lewej katalog map, po prawej kartę wybranej mapy, a w układzie
telefonu karta stoi pod katalogiem (D-282, D-396).

Katalog (D-325) stoi w jednej kolumnie, od góry:

- Pole szukania z napisem „Szukaj mapy albo zasobu” i podpowiedzią „szukaj mapy
  albo zasobu”, na całą szerokość obszaru; w ramce pola, po lewej, stoi lupa —
  ikona z game-icons.net (D-27) rysowana maską w `text-label`, roli podpowiedzi
  obok niej — a tekst pola zaczyna się za nią. Szuka fragmentu nazwy mapy albo nazwy zasobu bez względu na
  wielkość liter, po obcięciu spacji na brzegach; polskich liter nie zrównuje,
  więc „ł” nie znajduje „l”. Gdy nic nie pasuje, stoi „Nic nie pasuje do
  „{zapytanie}”.” w `text-secondary`.
- Trzy widoki „Dokąd”, „Co daje” i „Postęp” jako wspólne przyciski wybrane w
  grupie (D-44, D-40), w ramkach, jak przyciski tempa, żeby od razu było widać, że
  to przyciski: wybrany ma ramkę w `selected` i tekst w `text-strong`; zakładkami
  nie są. Na starcie wybrana jest „Dokąd”. Pod nimi licznik w `text-secondary`: w „Dokąd”
  „{n} poznanych · {m} rozwiązanych”, w „Co daje” „{n} zasobów w zasięgu”, w
  „Postęp” „{m} rozwiązanych z {n} poznanych”; liczby mają polską odmianę, więc
  nowa gra czyta „1 poznana · 0 rozwiązanych”, a dalej „2 poznane · 1 rozwiązana”,
  „5 poznanych · 4 rozwiązane”, „0 rozwiązanych z 1 poznanej”, „1 rozwiązana z 2
  poznanych” (po „z” stoi dopełniacz, więc „z 1 poznanej”).
- Region ma linię `divider` nad nagłówkiem w `text-label` (nazwa sekcji, D-40).
  W „Dokąd” i „Postęp” nagłówek to nazwa regionu i „{m} z {n}”: m rozwiązanych
  spośród n wszystkich map regionu w danych gry, także jeszcze nieotwartych
  (D-325). W „Co daje” nagłówek to ikona zasobu, jego nazwa i z prawej liczba
  otwartych map, które go dają. Region, w którym nic nie jest otwarte, nie stoi
  wcale.
- „Dokąd”: w regionie najpierw otwarte, nierozwiązane mapy, a rozwiązane zwinięte
  pod jednym wierszem zwijaka — zwykły wspólny przycisk (D-44) „▸ {n} rozwiązane”,
  po rozwinięciu „▾”, z `aria-expanded`. Zwijak nie stoi, gdy region nie ma
  rozwiązanej mapy. Zwijak działa zawsze, także przy wybranej mapie i przy
  wpisanym tekście szukania (D-331). Bez szukania rozwiązane stoją zwinięte, aż
  gracz je rozwinie; przy szukaniu pasujące rozwiązane stoją rozwinięte, a zwijak
  zwija je i rozwija tak samo. Wybrana mapa, która stoi wśród zwiniętych
  rozwiązanych, stoi nad zwijakiem, żeby jej wiersz z belką był widać, a po
  rozwinięciu stoi na swoim miejscu wśród rozwiązanych, raz. Rozwinięcie, które
  gracz wybrał, zostaje, dopóki ekran stoi, osobno bez szukania i przy szukaniu.
- „Co daje”: grupy po zasobie, zaczynając od tego, który daje najmniej otwartych
  map; w grupie najpierw rozwiązane. Wiersz zasobu ma ten sam wygląd co wiersz
  mapy, a jego fakty to „≈ {n} z {kafelki} · po {zapas}” i „+1 co {min} min”,
  albo „nie wraca” w `warning`.
- „Postęp”: w regionie wiersze otwartych map, a za nimi po jednym pustym miejscu
  na każdą mapę, której gracz jeszcze nie otworzył. Puste miejsce to przerywana
  kreska w `text-disabled`, bez nazwy, o trzech długościach po kolei; przy
  szukaniu go nie ma.
- Wiersz mapy to odnośnik do `#/mapy/{map}` w dwóch liniach. W pierwszej stoi
  kółko stanu po lewej, nazwa mapy w `text` i po prawej ikony stworzeń, które na
  mapie napadają, w `text-secondary`. Kółko to „●” w `positive` przy mapie
  rozwiązanej i „○” w `text-secondary` przy otwartej; czytnik ekranu czyta je jako
  „Rozwiązana” albo „Otwarta” (D-134). W drugiej linii, pod nazwą, stoją fakty
  mapy w `text-secondary`, w tej kolejności: czas passy („12 h”, a gdy nie jest
  pełną liczbą godzin, w minutach), „{n} do pokonania”, „⊘ wnosisz {n}” i
  „wynosisz {n}” w `warning`, „bez ognia {n} min” oraz „krok {n} min” tylko tam,
  gdzie krok odstaje od kroku większości map (D-333). Każdy fakt jest osobnym
  elementem, który się nie łamie w środku; wąski wiersz łamie się między faktami.
  Wiersz wybranej mapy stoi wypełniony `highlight`, z tekstem w `text-strong`
  i belką w `positive` o grubości `--bar-width` po lewej, jak wybrany wiersz
  starej gry (D-331, D-39, D-40); wiersz pod kursorem ma tło `highlight`.
- Rekord niedźwiedzia (D-440) stoi na mapie, której dane nazywają to stworzenie
  do rekordu (Las — matecznik): po pierwszej ocenie na tej mapie jest ostatnim
  faktem wiersza, „niedźwiedź: {n} z {zdrowie}”, w roli `text`, z „ze” zamiast „z”
  przed liczbą, której pierwsze wypowiedziane słowo zaczyna się od „sze” albo „st”
  albo jest zerem („ze 120”, „ze 16”, ale „z 24”, „z 7”, „z 70”). Stoi w „Dokąd”
  i w „Postęp”, nie w „Co daje”, gdzie wiersz jest wierszem zasobu. Przed pierwszą
  oceną nie stoi wcale. Zapamiętuje go przeglądarka (D-441).
- W układzie telefonu wiersz mapy ma co najmniej `--touch-target-min` wysokości
  i jest celem dotyku (D-396), a wybrany wiersz zostaje wypełniony także na
  urządzeniu, które nie najeżdża.
- Widok, wpisany tekst i rozwinięte zwijaki żyją, dopóki ekran stoi: po wyjściu
  z ekranu katalog zaczyna od „Dokąd” i pustego pola.
- Karta mapy (D-327), jak karta starej gry. U góry nagłówek: nazwa mapy w
  `text-strong`, w rozmiarze i wadze tytułu karty mapy starej gry — rozmiar
  `--font-size-map-card-title`, odczytany z jej strony, i waga tekstu — obok niej znacznik stanu w rozmiarze
  podpisu — „rozwiązana” w `positive` (D-134) albo „otwarta” w `text-secondary` —
  a przy mapie otwieranej przez inną mapę po „ · ” „odsłania ją {mapa}” w
  `text-secondary`; znacznik, „ · ” i „odsłania ją {mapa}” przechodzą razem do
  linii pod nazwą, gdy obok niej się nie mieszczą, na przykład w wąskim
  nagłówku układu telefonu (D-327); obok nazwy i znacznika stoi ikona każdego stworzenia, które napada na mapie, rysowana maską w kolorze tekstu obok, czyli w `text-strong` nazwy, a mapa bez napastnika ikony nie ma (D-327, D-43); po prawej stronie nagłówka zwykły wspólny przycisk „Wejdź —
  wybierz postać” (D-44), który przenosi fokus na nagłówek „Kto idzie”, a
  przeglądarka pokazuje go na ekranie. Pod nagłówkiem jedno krótkie zdanie tego,
  czego mapa żąda, pisane ręcznie w danych mapy, jak w starej grze, w `text`
  („Osiem godzin bez jednej zmiany programu.”). Pod nim dwie
  kolumny: po lewej „Żąda” i „Teren”, po prawej „Czyha”, „Leży tu” i „Odbiera”;
  w układzie telefonu jedna pod drugą, lewa nad prawą. Każda część ma cienką
  linię `divider` nad nazwą, a nazwy części stoją w `text-label` (nazwy sekcji,
  D-40). „Żąda” i „Teren” to tabele: podpis w `text-secondary` w jednej kolumnie
  i wartość w `text` w następnej — „passa 8 h”, „do pokonania 2” z ikoną
  stworzenia, które napada, a pod tabelą „Żąda” zdanie warunku rozwiązania z
  danych mapy w `text-secondary` w rozmiarze szczegółu (D-133); „siatka 4 × 4”, „wejście stałe”, „krok 5 min”, „bez
  ognia 83 min — otoczenie 25 °C”, gdzie dopisek po wartości, także „— drożej niż
  zwykle” albo „— taniej niż zwykle” przy kroku innym niż zwykły, stoi w
  `text-secondary`. Wiersz „Leży tu” i „Czyha” ma ikonę w osobnej kolumnie, w
  pierwszej linii nazwę w `text`, a pod nią szczegół w `text-secondary` w
  rozmiarze szczegółu: „≈ 16 z 16 kafelków · po 12 · +1 co 30 min”, przy stworzeniu
  szansę, spokój i średni odstęp; „nie odnawia się” w `warning`; „wnosisz najwyżej
  {n}” i „wynosisz najwyżej {n}” w `warning`. Części, której mapa nie ma, nie
  rysuje się wcale.
  W „Czyha” mapy, której dane nazywają stworzenie do rekordu, pod wierszem szansy
  tego stworzenia stoi jego rekord „niedźwiedź: {n} z {zdrowie}”, pisany jak w
  wierszu katalogu („ze 120”, „z 24”), w roli `text`, jak nazwa stworzenia, i dopiero po pierwszej ocenie na tej mapie (D-440).
- Sekcja „Kto idzie” pod kartą (D-329): nagłówek w `text-label`, który bierze
  fokus od „Wejdź — wybierz postać” i poza tym nie stoi w kolejności klawiatury. Przy
  każdej postaci, z góry: imię jako odnośnik do jej ekranu Postać w
  `text-strong`; wiersz wskrzeszenia w `text-secondary`, a przy zerze użyć
  w `danger` (D-217); przy postaci w pętli zarobkowej wiersz
  pętli w `text` z „Zatrzymaj” (D-244); „Program:” w `text-label` z listą
  programów; „Wejdzie: …” i „Wejdzie: nic” w `text-secondary`; ostrzeżenie
  o przyciętym planie w `warning` (D-188); „Wejdź” w głównym wyglądzie (D-274);
  „Puść w pętlę” zwykłym przyciskiem, a obok „Pętla nic nie zarobi do
  skrzynki” w `warning`, gdy lista „Wynieś” jest pusta (D-326); zdanie
  o przejściu ręcznym, które czeka albo się skończyło, pod wyłączonymi
  przyciskami każdej postaci, w `text-secondary` (D-287); jego druga część,
  „Wróć do niego i je zakończ, żeby wysłać postać.”, jest odnośnikiem do ekranu
  tego przejścia (D-281), tego samego w każdym wierszu, w tej samej roli
  `text-secondary`.
- Ocena programu przy postaci (D-439, D-440, D-329, D-243): przycisk „Oceń na
  12 ziarnach” stoi obok „Wejdź” przy każdej postaci, na mapie rozwiązanej
  i nierozwiązanej, jako zwykły wspólny przycisk — nie w głównym wyglądzie — a na
  czas liczenia oceny jest wyłączony i czyta „Oceniam…” (reguła States of
  shared controls). Pod postacią stoi wynik oceny, dopóki stoi (D-329):
  - nagłówek „Ocena na 12 ziarnach: {n} z 12 rozwiązanych” w `text-strong`, bo
    to wartość, na którą patrzy się najpierw (D-40);
  - dwanaście wierszy „Ziarno {i}: …”, każdy w roli swojego wyniku: „rozwiązane”
    w `positive`; śmierć — „mag zamarzł w {m}. minucie”, „mag umarł z głodu
    w {m}. minucie” albo „mag zginął w walce w {m}. minucie” — w `danger`, bo
    w pętli taka śmierć grozi utratą postaci; „bez rozstrzygnięcia po {pułap}
    minutach” w `warning`, bo mapa nie zostanie rozwiązana (D-39). {pułap} to
    pułap minut z danych gry (D-439);
  - pod wierszami zdanie „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie
    płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.” w
    `text-secondary`, jako wyjaśnienie (D-40).
- Ocena zapamiętana obok listy „Program:” (D-440): „szczelny: 12 z 12” w
  `positive` przy wyniku dwanaście z dwunastu, a przy niższym wyniku „{n} z 12”
  w `text`. Gdy skrzynka ma mniej przedmiotu, niż ocena wzięła, wynik zostaje bez
  odznaki — „12 z 12” stoi wtedy w `text`, bo odznaka gaśnie — a obok niego stoi
  dopisek „oceniono z zapasem, którego dziś nie ma w skrzynce” w `warning`, jak
  inne ostrzeżenia karty, które mówią, że coś nie zadziała tak, jak wynik
  obiecuje, na przykład „Pętla nic nie zarobi do skrzynki” (D-39, D-326).
- Drugie kliknięcie „Puść w pętlę” (D-243): po pierwszym kliknięciu, gdy któreś
  ziarno nie jest rozwiązane, nad przyciskiem stoi „Na {k} z 12 ziaren program mapy
  nie rozwiązuje.” w `warning` (mapa nie zostanie rozwiązana, D-39), a przycisk
  czyta „Puść mimo to”; zostaje zwykłym wspólnym przyciskiem, jak „Puść w pętlę”.
  Gdy wszystkie dwanaście ziaren jest rozwiązane, „Puść w pętlę” rusza od razu
  i żadne takie zdanie nie stoi.
- Ocena, jej odznaka, dopisek o zapasie i zdanie przed drugim kliknięciem nie
  wnoszą nowej roli, wartości tokenu ani znaczenia roli: każda część stoi
  w znaczeniu z tabeli Roles, a przyciski oceny i „Puść w pętlę” — także jako
  „Puść mimo to” — to zwykłe wspólne przyciski (D-44).
- Drużyna bez postaci: „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”
  w `text-secondary`.

### The screen Wiedza

- **Decision:** D-416 · D-280 · D-281 · D-282 · D-291 · D-199 · D-200 · D-44 · D-39 · D-40 · D-43 · D-396
- **Invariant:** none
- **Good:** Nagłówek „Wiedza” w `text-strong` nad dwoma obszarami; „Czynności · 18” w `text-label` nad rzeczami w dwóch kolumnach w układzie komputera i przy 360 px, a w sześciu w oknie układu telefonu szerokim na 1100 px, każda z ikoną w kolorze nazwy; wiersz drzewa na całą szerokość obszaru, pod cienką linią w `divider`, ze zwijakiem „▸” na początku, nazwą „Eksploracja” w `text-strong` i „3 gałęzie” w `text-secondary` przy prawym brzegu; po rozwinięciu gałąź „Długi krok · 3 stopnie” z „1 · 1 · 2 pkt” w kolumnie po prawej, pod nią „Krótsze przejście między polami” w `text-secondary`, a pod opisem linia stopni: „bez gałęzi” nad „5 min”, „I · 1 pkt” nad „3 min”, „II · 1 pkt” nad „1 min” i „III · 2 pkt” nad „1 min”; „Zwiad · 1 stopień” z samym opisem i „3 pkt”.
- **Bad:** Przy drzewie albo gałęzi poziom, wprawa, punkty do wydania, kupiony stopień, „teraz → po kupnie” albo „Kup”; zdanie w obszarze, który nie ma jeszcze rzeczy; obszar „Umiejętności” przed pierwszym poznanym drzewem; nazwa rzeczy bez jej ikony; rzeczy Zrozumienia w jednej kolumnie; wiersz drzewa jako przycisk z ramką szeroki na swój napis albo rozwijany tylko zwijakiem; zwijak jako osobna kontrolka zamiast wspólnego przycisku; linia stopni schowana w układzie telefonu albo stopień przecięty między dwie linie; linia stopni przy „Zwiad”, „Obchód”, „Czysty płomień” albo „Ucisk”.

Ekran Wiedza (`#/wiedza`, D-416, D-281) ma nagłówek „Wiedza” i pod nim dwa obszary, każdy
osobny (D-282): po lewej Zrozumienie, po prawej drzewa umiejętności. Nagłówek jest w
`text-strong`, jak „Siedziba” na swoim ekranie (D-40); w układzie komputera obszary stoją obok
siebie jak na ekranie Mapy, a w układzie telefonu, w oknie węższym niż 1280 px, jeden pod
drugim, Zrozumienie nad drzewami umiejętności (D-396, reguła Two layouts and one threshold
between them).

- Obszar Zrozumienie: nagłówek „Zrozumienie” w `text-label` (nazwa sekcji, D-40) i obok niego
  licznik „{n} poznanych rzeczy” w `text-secondary`. Pod nimi grupy „Czynności · {n}”,
  „Przedmioty · {n}” i „Stworzenia · {n}” z nagłówkiem w `text-label`; w grupie każda rzecz to
  ikona z danych gry i nazwa w `text`, a ikona jest rysowana maską w kolorze nazwy obok niej,
  jak ikona czynności w edytorze programu (D-291, D-43). Grupa bez rzeczy nie stoi, a obszar bez
  żadnej rzeczy ma sam nagłówek i licznik, bez zdania.
- Rzeczy grupy stoją w kolumnach, w obu układach tyle, ile zmieści szerokość obszaru, i co
  najmniej dwie: najmniejsza szerokość kolumny to 12em, szerokość, w której ikona i nazwa
  „Wytwórz — ognisko” stoją w jednej linii, a gdzie pół obszaru bez odstępu między kolumnami jest
  węższe — to pół, więc najwęższy obszar też mieści dwie kolumny. Rzeczy idą wierszami, od lewej
  do prawej, więc najnowsza stoi na końcu, a dłuższa nazwa łamie się między słowami w swojej
  kolumnie i nie wychodzi poza nią. Szerokość kolumny to wymiar układu, którego D-43 nie liczy.
  Powód: lista ma rosnąć wszerz, nie w dół, bo projekt dokłada rzeczy do poznania, a wąskie okno
  komputera jest telefonem i dostaje tyle kolumn, ile zmieści (D-396).
- Obszar Umiejętności: nagłówek „Umiejętności” w `text-label` i licznik „{n} drzew” w
  `text-secondary`. Obszaru nie ma, póki gracz nie zna żadnego drzewa. Każde wejście na ekran
  zaczyna ze zwiniętymi drzewami.
- Wiersz drzewa stoi jak wiersz drzewa na ekranie Postać, bez poziomu, paska i punktów: na całą
  szerokość obszaru, oddzielony od sąsiednich cienką linią w `divider`; na początku zwijak —
  zwykły wspólny przycisk „▸”, po rozwinięciu „▾”, z nazwą drzewa jako nazwą dostępną, który mówi
  `aria-expanded` (D-44) — potem nazwa w `text-strong`, a przy prawym brzegu „{n} gałęzi”
  w `text-secondary`, w rozmiarze podpisu, jak liczniki obszarów. Kliknięcie w dowolne miejsce
  wiersza rozwija albo zwija drzewo, a klawiatura dochodzi do zwijaka, który robi to samo Enterem
  albo Spacją, jak każdy przycisk (D-416). Stany zwijaka podaje reguła States of shared controls:
  error, empty i loading go nie dotyczą, bo nie ma wpisu, listy i nie czeka na serwer. W układzie
  telefonu zwijak trzyma cel dotyku jak każdy przycisk, a wiersz rozwija się dotknięciem
  w dowolnym miejscu.
- Gałąź rozwiniętego drzewa stoi pod wierszem, wcięta: w pierwszej linii nazwa w `text-strong`
  i „· {n} stopni” w `text-label`, a ceny wszystkich stopni po kolei, „1 · 1 · 2 pkt”, w `text`
  w osobnej kolumnie po prawej, jak w starym Loopie; pod nazwą opis w `text-secondary`.
- Gałąź, której dane dają liczbę, ma pod opisem linię stopni (D-416), w obu układach: najpierw
  „bez gałęzi” nad wartością bez żadnego stopnia, potem każdy stopień po kolei, jego numer
  rzymski i „· {cena} pkt” nad wartością, którą daje — numer i „bez gałęzi” w `text-label`, cena
  w `text-secondary`, oba w rozmiarze podpisu, a wartość w `text`. Stopień jest jednym kawałkiem,
  który się nie łamie w środku; linia łamie się między stopniami, gdy obszar jest za wąski, i stoi
  wtedy w kilku rzędach stopni. Gałąź, której dane liczby nie dają, ma sam opis i ceny, bez linii
  stopni.
- Ekran nie pokazuje poziomu, wprawy, punktów do wydania, kupionych stopni ani „Kup” i niczego
  w grze nie zmienia (D-416); kupuje się na ekranie Postać (D-200). Linia stopni bierze liczby
  z tych samych danych gry co podgląd „teraz → po kupnie” ekranu Postać, ale nie ma słów „teraz”,
  „po kupnie” ani strzałki, bo nie mówi o żadnej postaci.
- Ekran mieści się przy obszarze strony 360 px bez przewijania w bok i bez napisu poza ramką,
  a jego reguł układu telefonu nie sprawdza test, tylko agent w przeglądarce (reguła A change is
  checked in both layouts).
- Ekran nie wnosi nowej roli, wartości tokenu ani znaczenia roli.

### The screen Postać

- **Decision:** D-445 · D-446 · D-447 · D-454 · D-461 · D-462 · D-199 · D-200 · D-217 · D-218 · D-244 · D-245 · D-287 · D-280 · D-282 · D-272 · D-288 · D-289 · D-291 · D-389 · D-39 · D-40 · D-43 · D-44 · D-396
- **Invariant:** none
- **Good:** Nad oboma blokami „← Siedziba” w `text-label`, bez podkreślenia, a pod kursorem na `highlight`; lewy blok z imieniem w `text-strong` u góry, pod nim „pokolenie 2”, znaczek maga i „Mag żywiołów” w `text-secondary`, pod nimi ramka z „W obozie” w `text`, a pod ramką sekcja „Wyposażenie” z nagłówkiem w `text-label`: ludzik dwa razy większy niż na pasie obozu, na płaskim tle bloku, pośrodku ośmiu kwadratowych kafelków — po lewej „Głowa”, „Tułów” i „Nogi”, po prawej „Ręka główna” i „Druga ręka”, pod nim trzy kieszenie — z samą ikoną patyka w `text-strong` na kafelku ręki głównej i z bladymi nazwami miejsc w `text-label` na pustych; po dotknięciu kafelka ręki jego ramka w `selected`, a pod kafelkami „Ręka główna: patyk” w `text-strong` i komórki wyboru, wśród nich „Zdejmij” bez ikony, a gdy skrzynka jest pełna, wyszarzone z powodem „skrzynka pełna” w `text-secondary`; przy postaci w pętli nad kafelkami „Postać jest w pętli. Zmiana działa od następnego przejścia.” w `text-secondary`; w prawym bloku wiersz drzewa „▸ Eksploracja · poziom 4 · pasek · 100 / 200 · 3 pkt” z paskiem o torze w `text-disabled` i wypełnieniu w `text`, „3 pkt” w `text-strong`, a zaraz po nazwie „+1 pkt czeka w pętli” w `text`.
- **Bad:** Pasek wprawy w `positive` albo jego tor w `highlight`, którego na `panel` prawie nie widać; „+1 pkt czeka w pętli” na zielono; ramka z nagłówkiem albo z przyciskiem innym niż „Zatrzymaj”; ludzik obok imienia u góry lewego bloku albo w wielkości ludzika z pasa obozu; ludzik na kawałku polany albo z tekstem na nim; nazwa przedmiotu albo liczba napisana na kafelku z ikoną; kafelek z ikoną, który czytnik ekranu czyta samą nazwą przedmiotu, bez miejsca; wybrany kafelek zaznaczony tłem `highlight` zamiast ramki w `selected`; blada nazwa miejsca w `text-disabled`, jakby miejsca nie dało się użyć; kafelek miejsca, do którego nic nie pasuje, ukryty do chwili, gdy gracz ma pasujący przedmiot; kafelek jako `<button>` ekranu z klasą własną albo kafelek niższy albo węższy niż `--touch-target-min` w układzie telefonu; „Zdejmij” z ikoną; wyszarzona komórka wyboru bez powodu; sekcja „Wyposażenie” w prawym bloku nad „Umiejętnościami”; ekran w jednej kolumnie w układzie komputera albo w dwóch kolumnach w układzie telefonu; drzewa rozwinięte i kafelek wybrany przy wejściu na ekran; zwijak drzewa jako osobna kontrolka zamiast wspólnego przycisku; „← Siedziba” w lewym bloku zamiast nad oboma, jako przycisk albo w układzie telefonu niższe niż `--touch-target-min`; zdanie o tym, od kiedy kupiony stopień działa, przy postaci, której przejście nie dotyczy, albo „Kup” wyłączone przy przejściu, które czeka w pauzie.

Ekran Postać (`#/postac/{n}`, D-281) ma dwa obszary, każdy osobny (D-282), i każdy stoi w bloku
`screen-area`, jak kolumny ekranów Siedziba, Mapy, Wiedza i Przejście: na tle `panel` z cienką ramką
w `divider`. Lewy obszar jest wąski, prawy szeroki — ta sama proporcja co kolumny ekranów Mapy i
Wiedza, jedna czwarta i trzy czwarte szerokości w układzie komputera — a w układzie telefonu, w oknie
węższym niż 1280 px, lewy stoi nad prawym (D-396), więc sekcja „Wyposażenie” lewego obszaru stoi
wtedy nad „Umiejętnościami” prawego.

- Na górze ekranu, nad oboma obszarami, w obu układach, stoi „← Siedziba”, odnośnik do Siedziby
  (D-280, D-281), jak w starym Loopie. Jest odnośnikiem, nie przyciskiem, bo ma adres, i stoi sam jako
  kontrolka: tekst w `text-label`, bez podkreślenia, jak pozycja paska menu, która nie znaczy miejsca
  gracza (reguła Menu bar, the menu „Konto” and the list of programs); pod kursorem tło `highlight`,
  a rola tekstu zostaje; fokus rysuje reguła Visible focus bez dodatku (D-47). W układzie telefonu
  trzyma cel dotyku `--touch-target-min` w bloku `@media (width < 1280px)` arkusza ekranu, z tekstem
  pośrodku wysokości celu, a na urządzeniu, które nie najeżdża, nie dostaje tła pod kursorem (reguły
  Everything is done by touch, and every control holds the touch target i Two layouts and one
  threshold between them). Pasek menu znaczy na tym ekranie Siedzibę, więc do Siedziby prowadzą
  dwie drogi, strzałka i pozycja paska (D-280).

- Lewy obszar, u góry (D-446): imię jako nagłówek ekranu w `text-strong`, łamane w swoim wierszu
  (reguła A name typed by the player breaks in its row); pod nim jeden wiersz z „pokolenie {n}” od
  drugiego pokolenia (D-218), znaczkiem archetypu i nazwą archetypu, wszystko w `text-secondary`,
  a znaczek rysowany maską w kolorze nazwy obok (D-43); pod nim wiersz wskrzeszenia w `text-secondary`,
  a przy zerze użyć w `danger` (D-217). Imię i oba wiersze stoją osobno od ludzika, który stoi niżej,
  w sekcji „Wyposażenie”.
- Pod nimi ramka tego, co postać robi (D-447): zawsze obecna, bez nagłówka, prostokąt obrysowany
  cienką linią w `divider` wewnątrz bloku. Pierwszy wiersz w `text` — „W obozie”, „Przejście: …” albo
  wiersz pętli z przyciskiem niszczącym „Zatrzymaj” (D-244, D-44); po zatrzymaniu pętli pod „W obozie”
  wiersz „Pętla zatrzymana …” w `text-secondary` (D-245). Innych przycisków w ramce nie ma.
- Pod ramką sekcja „Wyposażenie” (D-461): nagłówek „Wyposażenie” w `text-label`, jak „Umiejętności”
  w prawym obszarze, ale sekcja stoi zawsze, od utworzenia postaci, bo każda postać ma wyposażenie
  — „Umiejętności” stoją dopiero, gdy gracz zna drzewo (D-199). Między nagłówkiem a kafelkami stoi,
  w `text-secondary` jako wyjaśnienie (D-40), jedno z dwóch zdań, gdy zachodzi jego przypadek:
  - przy postaci w pętli zarobkowej „Postać jest w pętli. Zmiana działa od następnego przejścia.”;
    kafelki pokazują wtedy wyposażenie ustawione na jej następne przejście, a ekran nie dokłada
    drugiego rzędu z tym, co postać trzyma w trwającym przejściu (D-462);
  - przy postaci, której przejście ręczne stoi w grze niezakończone — idzie, czeka w pauzie albo
    skończyło się i czeka na „Restart” albo „Zakończ” — „Przejście na mapie {mapa} jest niezakończone.
    Wyposażenie zmienisz po jego zakończeniu.”, jak zdanie nad „Umiejętnościami” (D-287); kafelki tej
    postaci są wtedy wyłączone, a kafelki innych postaci zostają do wyboru.
- Ludzik postaci (D-445) stoi w sekcji pośrodku kafelków miejsc: ten sam obrazek i w tym samym takcie
  klatek co ta postać na pasie obozu Siedziby, ale dwa razy większy, nieruchomy pod ustawieniem
  ograniczenia ruchu, bez polany, wprost na płaskim tle bloku (D-272). Stoi tak samo, cokolwiek
  postać robi. Jest obrazkiem: bez tekstu na nim i nad nim, bez reakcji na kliknięcie i klawiaturę,
  ukryty przed czytnikami ekranu, jak pas obozu (D-389).
- Kafelki miejsc (D-461, D-454): osiem, każdy kwadratem, czyli o równej szerokości i wysokości — to
  wymiar układu, którego D-43 nie liczy. Po lewej stronie ludzika stoją „Głowa”, „Tułów” i „Nogi”,
  po prawej „Ręka główna” i „Druga ręka”, pod ludzikiem w rzędzie trzy kieszenie. Stoi każde miejsce,
  także to, do którego nic z danych gry jeszcze nie pasuje: jest wtedy puste (D-454).
  - Kafelek miejsca, które coś trzyma, pokazuje samą ikonę przedmiotu z danych gry, tę samą co przy
    rzeczy w obszarze Zrozumienie ekranu Wiedza, rysowaną maską w `text-strong`, bo obok niej nie
    ma tekstu (D-43, jak ikona nad głową maga); nazwy przedmiotu ani liczby na nim nie ma, a czytnik
    ekranu czyta miejsce i przedmiot razem, „{miejsce}: {rzecz}” („Ręka główna: patyk”), tak jak
    brzmi nagłówek wyboru, z kieszeniami po numerach („Kieszeń 1: opatrunek”), więc trzy opatrunki
    w trzech kieszeniach nie brzmią jednakowo.
  - Kafelek miejsca, które nic nie trzyma, pokazuje bladą nazwę miejsca w `text-label`: bladość daje
    rola, nie przezroczystość ani nowy kolor. Nie jest w `text-disabled`, bo `text-disabled` mówi,
    że tego nie da się teraz użyć, a puste miejsce da się wybrać.
  - Kafelek wybrany ma ramkę w `selected`, jak wybrana komórka wyboru (D-40), i `aria-pressed`;
    jego treść zostaje w swojej roli, więc wybrane puste miejsce dalej ma bladą nazwę. Wybrany jest
    najwyżej jeden z ośmiu. Kafelek wyłączony, przy niezakończonym przejściu ręcznym, ma treść
    w `text-disabled`.
- Wybór pod kafelkami (D-461): dotknięcie kafelka wybiera go i otwiera pod kafelkami wybór, dotknięcie
  innego kafelka przenosi wybór na niego, a drugie dotknięcie wybranego go zamyka; wybór przedmiotu
  albo „Zdejmij” też zamyka wybór. Każde wejście na ekran zaczyna bez wybranego kafelka, jak drzewa
  zaczynają zwinięte.
  - Nad komórkami stoi nagłówek „{miejsce}: {rzecz}”, a przy pustym miejscu „{miejsce}: nic”,
    z kieszeniami po numerach — „Kieszeń 1: opatrunek”, „Kieszeń 2: nic” — w `text-strong`, bo to
    nazwa, na którą patrzy się najpierw (D-40).
  - Komórki to komórki wyboru wspólnej kontrolki, te same, których używa wybór czynności w edytorze
    programu (reguła States of shared controls, D-288): jedna na każdy przedmiot ze skrzynki, który
    pasuje do miejsca, z ikoną przedmiotu rysowaną maską w kolorze nazwy obok (D-291, D-43), nazwą
    i liczbą sztuk, jakie ma skrzynka, obie w roli nazwy; a gdy miejsce coś trzyma, komórka „Zdejmij”
    bez ikony, bo ikonę ma każda czynność programu (D-291), a „Zdejmij” czynnością programu nie jest.
    Przedmiotu, którego nie ma w skrzynce, wybór nie pokazuje.
  - Komórka, której nie da się wybrać, jest wyszarzona z powodem w `text-secondary`, jak wyszarzona
    komórka wyboru w oknie reguły (D-289): „Zdejmij” z powodem „skrzynka pełna”.
  - Gdy do miejsca nic ze skrzynki nie pasuje, stoi jedno zdanie „W skrzynce nie ma nic, co tu
    pasuje.” w `text-secondary`, jak puste listy ekranu Mapy, a przy zajętym miejscu obok niego
    komórka „Zdejmij”.
- Kafelek jest wspólną kontrolką (D-44, D-461): rodzajem wspólnego przycisku z
  `src/browser/view/controls/react-button.tsx`, nigdy `<button>` ekranu z klasą własną; jego
  wygląd stoi we wspólnym arkuszu `src/browser/styles.css`, a stany pokazuje strona wszystkich stanów
  (reguła States of shared controls). Ekran daje mu tylko miejsce w układzie sekcji. W układzie
  telefonu kafelek i komórka wyboru trzymają cel dotyku `--touch-target-min` (reguła Everything is
  done by touch, and every control holds the touch target), a kafelek, który jest kwadratem, ma
  oba boki co najmniej tej wielkości; ludzik z kafelkami po obu jego stronach mieści się przy
  obszarze strony 360 px w szerokości sekcji i nic się nie przewija w bok (reguła Nothing scrolls to
  the side in the phone layout, and no text crosses its frame). Reguły układu telefonu sekcji sprawdza agent
  w przeglądarce, nie test (reguła Two layouts and one threshold between them).
- Prawy obszar: nagłówek „Umiejętności” w `text-label`; obszaru nie ma, póki gracz nie zna żadnego
  drzewa (D-199). Tylko przy postaci przejścia ręcznego, które stoi w grze niezakończone, pod
  nagłówkiem stoi w `text-secondary`, jako wyjaśnienie (D-40), zdanie D-287 o tym, od kiedy kupiony
  stopień działa (D-200). Przy innej postaci zdania nie ma: „Restart” jej nie dotyczy.
- Wiersz drzewa (D-199) w kolumnach, oddzielony od sąsiednich cienką linią w `divider`: zwijak —
  zwykły wspólny przycisk „▸”, po rozwinięciu „▾”, z nazwą drzewa jako nazwą dostępną, który mówi
  `aria-expanded` (D-44); nazwa w `text-strong`, zaraz po niej „+{n} pkt czeka w pętli” w `text`, nie
  w `positive` (D-39); „poziom {p}” w `text-secondary`; pasek wprawy o grubości podwojonej
  `--bar-width`, jak pasek nad głową maga; ciemniejszy tor i jasne wypełnienie, bez zieleni, jak
  pasek niespełnionego wymagania w nagłówku przejścia, ale tor w `text-disabled`, bo tor w
  `highlight` ledwo widać na `panel` bloku — z co najmniej 2:1 wobec `panel`, które pilnuje test
  kontrastu (D-42) — a wypełnienie w `text` (D-40); „{wprawa} / {próg}” albo „najwyższy” w `text-secondary`; „{k} pkt” w
  `text-strong`, tylko gdy są punkty. Kliknięcie w dowolne miejsce wiersza rozwija albo zwija drzewo,
  a klawiatura dochodzi do zwijaka, który robi to samo Enterem albo Spacją, jak każdy przycisk. Stany
  zwijaka podaje reguła States of shared controls: error, empty i loading go nie dotyczą, bo nie ma
  wpisu, listy i nie czeka na serwer. Każde wejście na ekran zaczyna ze zwiniętymi drzewami.
- Gałąź rozwiniętego drzewa: jej słowa w `text` i „Kup” jako zwykły wspólny przycisk, wyłączony, gdy
  brak punktów, gałąź jest pełna albo przejście ręczne trwa, ani nie czekając w pauzie, ani się nie
  skończywszy (D-199, D-200); przy przejściu, które czeka albo się skończyło, „Kup” działa (D-287).
- Ekran nie wnosi nowej roli, wartości tokenu ani znaczenia roli.

### Program editor

- **Decision:** D-288 · D-289 · D-290 · D-291 · D-292 · D-293 · D-296 · D-306 · D-350 · D-93 · D-57 · D-279 · D-39 · D-40 · D-43 · D-308 · D-309 · D-310 · D-396
- **Invariant:** none
- **Good:** Wiersz reguły z warunkiem w `text-secondary`, czynnością w `text-strong` i licznikiem „Wykonano 3×” w `text-label`; linia upuszczenia w kolorze napisu „tu wyląduje”; w nagłówku grupy reguł „↑” i „↓” w układzie komputera, a w układzie telefonu nagłówek z samym tekstem i „▾”, wiersz reguły z samym tekstem i cienka linia w `divider` między wierszami reguł; dotknięcie środka wiersza reguły albo nagłówka grupy, jego tekstu i jego wolnego pasa otwiera je; wiersz reguły, która wygrywa teraz, na `rule-winning` z paskiem w `positive` po lewej, a reguła, która nie może ruszyć, z paskiem w `warning` i powodem „tu nie leży mech” w `warning`.
- **Bad:** Czynność w wierszu w `text-secondary`, nowa barwa dla wiersza pod kursorem albo linia upuszczenia w `selected` obok napisu w `text-strong`; `highlight` pod kursorem na wierszu reguły, która wygrywa teraz; pasek stanu w kolorze tekstu obok; znaki stanu przy programie zapisanym; grupa, którą w układzie telefonu przesuwa wyłącznie przeciąganie uchwytem; „↑”, „↓” albo „Usuń” w wierszu reguły w układzie telefonu; przycisk wiersza albo nagłówka stojący pod jego środkiem, tak że dotknięcie środka przesuwa regułę zamiast ją otworzyć; powód wyszarzonej komórki przecięty w środku słowa.

Edytor programu stoi na ekranie Programy i na ekranie przejścia (D-288).
Wygląd jego części bierze się z ról tabeli Roles i z wartości pliku tokenów;
znaki stanu (D-308) mają własne role tła, `rule-winning` i `rule-running`,
oraz pasek stanu o grubości `--bar-width`, opisane niżej.

- Wiersz reguły: warunek w `text-secondary`, czynność w `text-strong`, numer
  (D-292), czas wykonania (D-293) i licznik „Wykonano {n}×” (D-93) w
  `text-label`; ikona czynności stoi przy czynności i jest rysowana maską w
  kolorze tekstu obok (D-291, D-43). Wiersz otwarty stoi na tle `highlight`,
  a wiersz pod kursorem też, o ile nie ma tła stanu, z tekstem w ich własnych
  rolach (reguła Every background with its text); w układzie telefonu na urządzeniu,
  które nie najeżdża, wiersz nieotwarty nie dostaje tła pod kursorem (reguła Two
  layouts and one threshold between them). Liczba z ułamkiem w zdaniu
  reguły stoi z przecinkiem dziesiętnym, jak temperatura w wierszu ciała
  (D-57): „Temperatura poniżej 36,5 °C”.
- Znaki stanu (D-308, D-309, D-310) stoją tylko przy kopii przejścia, w
  przejściu ręcznym i na ekranie po jego końcu, nigdy przy programie
  zapisanym, na ekranie Programy ani w pętli zarobkowej. Wiersz reguły, która
  wygrywa teraz, stoi na tle `rule-winning`, a reguły, której czynność trwa,
  gdy wygrywa inna, na tle `rule-running`; wiersz pod kursorem zachowuje
  takie tło, a wiersz otwarty stoi na `highlight` w jego miejsce. Przy
  każdym wierszu reguły i nagłówku grupy po lewej stoi pasek o grubości
  `--bar-width`: w `positive`, gdy warunek jest spełniony i reguła może
  ruszyć (grupa: któraś jej reguła), w `warning`, gdy warunek jest
  spełniony, ale ruszyć nie może, w `condition-unmet`, gdy warunek nie jest
  spełniony; pasek zostaje przy wierszu otwartym. Powód, jeden, stoi w
  wierszu przy czynności w `warning`.
- Nagłówek grupy reguł: nazwa w `text-strong`, warunek w `text-secondary`,
  liczba reguł i suma „Wykonano” w `text-label`. W układzie komputera w nagłówku
  każdej grupy stoją strzałki „↑” i „↓” oraz „✕”, które usuwa grupę, a w wierszu reguły
  „↑”, „↓” i „Usuń”; w układzie telefonu stoją one w oknie grupy i w oknie reguły
  (reguła The window of a rule and of a rule group), „✕” grupy jako „Usuń z regułami”
  (D-288, D-296). „↓” przesuwa grupę o jedno miejsce w dół, „↑” o jedno w górę, tak jak
  strzałki reguły, „↑” wyłączona na pierwszej grupie, a „↓” na ostatniej (D-288). Uchwyt
  grupy i uchwyt reguły zostają w obu układach; przeciąganie uchwytem jest dla myszy
  komputera, więc żadna czynność nie ma tylko przeciągania (reguła Everything is done by
  touch, and every control holds the touch target). Strzałki są wspólnymi przyciskami i
  trzymają minimum celu dotyku tak samo jak każdy przycisk.
- Wiersz reguły i nagłówek grupy otwiera dotknięcie albo kliknięcie w dowolnym
  miejscu poza ich przyciskami, także na uchwycie, bo przeciągnięcie uchwytem
  kliknięcia nie daje (D-306, D-296). Tekst wiersza — uchwyt, numer, warunek,
  czynność, powód, czas, licznik; w nagłówku uchwyt, numer, nazwa, warunek, liczba
  reguł, licznik — stoi w elemencie, który sam przyjmuje kliknięcie i nie zawiera
  przycisku, a przyciski stoją obok niego, strzałki „↑” i „↓” razem, przed
  pozostałymi (`rule-list-body`, `rule-list-arrows`, `rule-list-controls` w
  `src/browser/view/rule-list.tsx`); przerwa przed strzałkami, przerwa między dwoma
  przyciskami i odstęp między grupami przycisków to też takie elementy
  (`rule-list-gap`). Powód: Chromium oddaje dotknięcie, które ląduje
  o kilka pikseli od przycisku, temu przyciskowi, o ile pod palcem nie leży element,
  który przyjmuje kliknięcia i nie ma w sobie przycisku, a sam wiersz, w którym stoją
  przyciski, pomija; bez takiego elementu dotknięcie tekstu obok strzałek przesuwałoby
  regułę, a dotknięcie wolnego końca linii tekstu nad „Usuń” albo „✕” usuwałoby regułę
  albo grupę zamiast ją otworzyć.
- W układzie telefonu wiersz reguły to sam tekst, a nagłówek grupy to tekst i „▾”,
  które zwija grupę, na końcu jego linii; wiersze reguł rozdziela cienka linia
  w `divider` o grubości `--frame-width`, bo bez niej nie widać, gdzie kończy się jedna
  reguła, a zaczyna następna. Powód: przyciski w osobnej linii pod tekstem brały
  chybione dotknięcia — dotknięcie w marginesie na prawo od „Usuń” usuwało regułę,
  dotknięcie pod ostatnią regułą grupy przenosiło ją do następnej grupy — więc stoją
  w oknie, jak w starym Loopie. Żadne miejsce wiersza ani nagłówka poza przyciskiem
  nie jest gołym wierszem: tekst jest pudełkiem na całą linię, jego dopełnienie
  zastępuje dopełnienie wiersza, a w nagłówku przed „▾” stoi przerwa z `rule-list-gap`
  (w układzie komputera się jej nie rysuje); przerwa i „▾” sięgają na całą wysokość nagłówka,
  także dwu- i trzywierszowego, bo pas nad albo pod „▾” wyśrodkowanym w wyższym nagłówku byłby
  gołym nagłówkiem, a dotknięcie tam zwijałoby grupę (D-296). Wiersz i nagłówek trzymają cel
  `--touch-target-min`, a „▾” tak jak każdy przycisk.
- Okno reguły i okno grupy podaje reguła The window of a rule and of a rule group.
  Podpisy jego pól są w `text-label`; komórki jego wyboru podaje reguła States of shared
  controls. W układzie telefonu wybór każdego pola stoi w dwóch kolumnach, jak warunki
  (D-290), bo przy czterech komórka ma około 70 px, za mało na słowo „niewykupiona” w
  powodzie wyszarzonej komórki; strzałki klawiatury idą po kolumnach, które siatka
  rysuje, a nie po stałej liczbie (`drawnColumns` w `src/browser/view/rule-panel.tsx`).
- Linia upuszczenia — linia, która pokazuje, gdzie wyląduje przeciągana reguła
  albo grupa reguł — ma napis „tu wyląduje” w `text-strong`, a sama linia bierze
  kolor tego napisu (D-279, reguła A line at a text takes the colour of that
  text).

Przegląd zmiany edytora czyta role każdej jego części wobec tej reguły.

### The window of a rule and of a rule group

- **Decision:** D-288 · D-296 · D-306 · D-311 · D-350 · D-303 · D-302 · D-44 · D-370 · D-39 · D-40 · D-43 · D-47 · D-396
- **Invariant:** none
- **Good:** Dotknięcie wiersza „1.2” otwiera tuż pod nim okno „Reguła 1.2 w grupie „Ogień””, które leży na wierszach „1.3” i niżej, a wiersz „1.1” nad oknem i wiersze pod jego dolną krawędzią da się dotknąć; w układzie telefonu na dole okna, pod linią w `divider`, „↑” i „↓” z lewej i „Usuń” w `danger` z prawej, z dala od „✕” w nagłówku okna; Escape w polu liczby potwierdza wpisaną liczbę i zamyka okno, a fokus wraca na wiersz.
- **Bad:** Okno w ramce `divider`, które czyta się jak ciąg dalszy kolumny programu; cień okna, który przyciemnia wiersze pod jego dolną krawędzią poniżej progu ich tekstu; okno z przygaszoną zasłoną albo z `aria-modal`; Tab, który trafia w przycisk wiersza pod oknem; okno na środku ekranu albo nad światem; wiersze pod oknem zepchnięte w dół; okno, które wychodzi poza obszar programu na zakładki „Kronika” i „Teren”; „✕” jako przycisk, który usuwa grupę w jej oknie; strzałki albo „Usuń” w oknie w układzie komputera.

Okno reguły i okno grupy to `section.rule-panel` z `src/browser/view/rule-panel.tsx`; to, co
czyni z niego okno — nagłówek, zdanie grupy, dolny pasek i wyłączenie wierszy pod nim — stoi
w `src/browser/view/rule-window.tsx`, a jego wygląd w `src/browser/program-panel.css`.

Gdzie stoi i co przykrywa:

- Stoi tuż pod wierszem reguły albo nagłówkiem grupy, który je otworzył, a pod nagłówkiem
  zwiniętej grupy, gdy wiersza jego reguły nie widać (D-288, D-350). Miejsce okna w liście nie
  ma wysokości, więc lista pod nim się nie zmienia; okno ma wysokość swojej treści i leży na
  wierszach niżej, jako warstwa (`position: absolute`).
- Szerokość bierze z obszaru programu, najbliższego pudełka z pozycją: nad kolumną programu
  w układzie komputera, nad edytorem na ekranie Programy, na szerokość ekranu w układzie telefonu
  (D-288, D-311). Na ekranie przejścia świat zostaje widoczny, a przejście biegnie dalej.
- Wiersze nad oknem i pod jego dolną krawędzią widać i dotyka się ich jak bez okna: wiersz otwarty
  zostaje na `highlight` (D-308), a dotknięcie innego wiersza przenosi okno na tamtą regułę (D-306).
  Każdy wiersz, nagłówek, „+ reguła”, „+ dodaj grupę” i zdanie pustej grupy, które leżą pod oknem,
  dostaje na czas okna atrybut `inert`, więc nie sięga do nich ani Tab, ani mysz. Gdy okno sięga
  niżej niż koniec listy, lista rośnie do jego dolnej krawędzi (`min-height`, wymiar układu, którego
  D-43 nie liczy), więc okno nie leży na niczym poza listą.
- Okno nie ma zasłony ani `aria-modal` i nie zatrzymuje fokusu, jak okno końca przejścia (D-370),
  bo wiersze nad nim i pod nim zostają dostępne. Odchodzi od tamtego wzoru w jednym: jest warstwą
  nad częścią listy, którą D-370 odrzucił dla okna końca przejścia, bo klawiatura sięgałaby pod
  warstwę, a przyciski spadałyby pod dolną krawędź okna przeglądarki. Tu warstwa stoi pod wierszem,
  który ją otworzył, lista rośnie, żeby ją pomieścić, a wiersze pod nią są `inert`.
- Okno należy do obszaru programu: póki stoi okno końca przejścia, nie widać go razem z tym
  obszarem, a po zamknięciu okna końca przejścia stoi takie, jakie było. Gdy „Zakończ” albo
  „Otwarte: {mapa} →” stawia pytanie „Zapisać, odrzucić, wrócić?”, okno się zamyka, żeby pytanie
  było widać i żeby wzięło fokus (D-311).

Jak wygląda:

- Tło `panel`, tekst w `text`, ramka w `window-frame` o grubości `--frame-width` (D-40). Okno leży
  na kolumnie, która też stoi na `panel`, więc ramka w `divider`, prawie w kolorze tła, zlewała je
  z kolumną; jasna ramka mówi, że to warstwa nad listą, a pod nią leżą wiersze. Okno nie rzuca
  cienia, inaczej niż okno nad ekranem w starym Loopie: wiersze pod jego dolną krawędzią zostają
  dostępne, a cień przyciemniałby ich tekst poniżej progu D-42.
- Nagłówek w `text-strong`: „Grupa {n} „{nazwa grupy}”” albo „Reguła {n.m} w grupie „{nazwa grupy}””,
  z nazwą zapisaną w grupie, a przy nazwie pustej albo z samych spacji „Grupa {n}” i „Reguła {n.m}”.
  Nazwę wpisał gracz, więc łamie się w nagłówku (reguła A name typed by the player breaks in its
  row). Obok, na prawym końcu nagłówka, „✕” z etykietą „Zamknij okno”.
- Pod nagłówkiem okna kopii zdanie „Zmiana zeruje passę tego przejścia.” w `text-secondary`
  (D-302); okno grupy ma pod swoim warunkiem zdanie „Gdy warunek grupy nie jest spełniony, program
  pomija wszystkie jej reguły.” w `text-secondary`, jako wyjaśnienie (D-40).
- W układzie telefonu na dole okna stoi pasek oddzielony linią w `divider`: „↑” i „↓” z lewej,
  z prawej „Usuń” w oknie reguły i „Usuń z regułami” w oknie grupy, oba przyciskami niszczącymi
  (D-44, D-296), z dala od „✕” w nagłówku, które zamyka okno. „↑” i „↓” przesuwają regułę albo
  grupę jak strzałki wiersza i nagłówka, okno idzie za nią, a fokus zostaje na strzałce, albo
  przechodzi na drugą, gdy naciśnięta stała się wyłączona. Usunięcie działa od razu (D-303), zamyka
  okno i oddaje fokus wierszowi, który stoi na miejscu usuniętego, albo wierszowi przed nim, albo
  nagłówkowi grupy; po grupie — nagłówkowi grupy na jej miejscu, przed nią albo „+ dodaj grupę”.
  W układzie komputera paska nie ma: strzałki i usuwanie stoją w wierszu i w nagłówku.

Klawiatura i fokus:

- Korzeń okna ma `role="dialog"` i nazwę z nagłówka przez `aria-labelledby`. Escape czyta korzeń
  okna, nigdy dokument (D-370).
- Okno bierze fokus tak jak panel przed nim: na komórkę otwartego pola albo na pole liczby, nie na
  swój korzeń, bo gracz zaczyna pisać od razu (D-306) — drugie odejście od wzoru okna końca
  przejścia.
- „✕” i Escape zamykają okno i oddają fokus wierszowi reguły, a przy zwiniętej grupie nagłówkowi
  grupy (reguła Focus does not fall to the page). Zamknięcie potwierdza liczbę i nazwę grupy
  wpisane w pole, które ma fokus, tak jak wyjście z pola (D-306).

Reguły układu telefonu okna nie sprawdza test (reguła Two layouts and one threshold between them);
sprawdza je agent w przeglądarce przy obszarze strony 360 px (reguła A change is checked in both
layouts). Strona wszystkich stanów nie ma próbki okna; jego przyciski stoją tam w swoich stanach.

### The scene of a map run

- **Decision:** D-148 · D-271 · D-272 · D-291 · D-315 · D-316 · D-317 · D-319 · D-320 · D-321 · D-322 · D-349 · D-364 · D-365 · D-366 · D-367 · D-372 · D-373 · D-132 · D-39 · D-40 · D-42 · D-43 · D-396
- **Invariant:** none
- **Good:** Plakietka nad głową maga na `panel` z ikoną czynności w `text-strong`, bez tekstu obok, i pod nią paskiem postępu: wypełnienie w `positive` na torze w `highlight`; pauza szarzy całą scenę, a jej ruch stoi; wilk w walce stoi obok maga, a między nimi leży mały obłok kurzu; scena 672 × 304 px w układzie komputera i 336 × 152 px w układzie telefonu przy 360 px, z bokami lekko przyciętymi tylko tam, gdzie szerokości brakuje, a plakietka nad głową czytelna w obu rozmiarach.
- **Bad:** Scena rysowana w ułamku obrazu, na przykład półtora raza, albo w trzykrotności; scena 336 × 152 px w układzie komputera; przycięcie sceny, które chowa maga przy brzegu lasu albo stwora; plakietka nad głową zmniejszona razem ze sceną do rozmiaru trudnego do odczytania; efekt sceny zrobiony dla trzeciego rozmiaru; pasek postępu nad głową maga w `warning` albo w `text-strong`; ikona czynności narysowana wprost na drzewach; tekst, przycisk albo reakcja na kliknięcie na scenie; błysk, który rozjaśnia albo przyciemnia całą scenę na chwilę; plakietka nad głową pod warstwą odcienia; szron pod nią; las w pełnym złocie przy passie wymaganej, a nie dopiero po rozwiązaniu; efekt odkrycia, śmierci albo rozwiązania, który gra od nowa przy każdym ponownym narysowaniu sceny albo w pętli; chłodna warstwa po śmierci z głodu; ruch ognia, gdy gra efekt chwili; obłok szamotaniny, który zakrywa maga i wilka, albo błysk w nim; martwy wilk leżący w scenie do następnej napaści; bieg wilka dłuższy niż 300 ms.

Scena przebiegu mapy to obraz lasu z rekwizytami, ogniskiem, magiem i, w minutach starcia, stworzeniem, które napada: wilkiem albo niedźwiedziem. Stoi
w `src/browser/view/scene.tsx`, `src/browser/view/scene-memory.ts` i
`src/browser/view/scene-picture.ts`, a jej ruch i szarości w `src/browser/run-screen.css`; nazwy plików obrazków postaci,
stworzeń i zasobów leżą w danych gry, w `src/browser/sim/data/scene.ts`, nie w kodzie
widoku (D-316).
Scena jest obrazem: nie ma na niej tekstu ani przycisku, kod nie daje jej
reakcji na kliknięcie, a cały jej obszar nie błyska (D-272, D-321, D-317).

Scena ma dwa rozmiary, jedną i dwie wielokrotności swojego obrazu 336 × 152 px (D-349): w układzie
komputera 672 × 304 px, a w układzie telefonu większy z dwóch, który mieści się w miejscu sceny, gdy
w szerokości okna liczy się klasyczny pasek przewijania, więc 336 × 152 px przy obszarze strony
szerokim na 360 px. Nie ma skali ułamkowej ani większej
od dwukrotności: piksele obrazu zostają równe, a efekty sceny są robione dla dwóch rozmiarów. Gdy do całego
obrazka brakuje kilku pikseli szerokości, boki sceny są lekko przycięte, a przycięcie nie chowa niczego,
z czym gracz działa, takiego jak mag przy brzegu lasu, stwór albo przedmiot; przycięcie obrazka nie jest
przewijaniem w bok (reguła Nothing scrolls to the side in the phone layout, and no text crosses its frame).
Drugi rozmiar daje reguła w blokach układu telefonu: próg szerokości okna, przy którym mieści się 672 px,
liczony z odstępów układu telefonu i z szerokości klasycznego paska przewijania, którą warunek `@media`
liczy w szerokości okna, i zapisany z tą arytmetyką w komentarzu, jest jedynym progiem `@media`
poza progiem 1280 px (reguła Two layouts and one threshold between them); `width` i `height` tła zostają
672 × 304. Drobne elementy sceny, takie jak ikona na plakietce odkrycia i plakietka nad głową maga,
mają rozmiar własny, niezależny od skali sceny, żeby były czytelne w obu rozmiarach; zmniejszone razem
ze sceną byłyby trudne do odczytania.

Plakietka stoi nad głową maga na tle `panel` (D-320). Niesie ikonę bieżącej
czynności, tę samą co przy regule w wierszu edytora (D-291), w `text-strong`,
choć obok niej nie ma tekstu (D-40, D-43). Pod ikoną stoi pasek postępu tej
czynności: wypełnienie w `positive` na torze w `highlight`, z co najmniej 3:1
wobec tła, na którym stoi (D-39, D-40). Pasek ma grubość `--bar-width` podwojoną,
`calc(var(--bar-width) * 2)` w obu rozmiarach sceny, bo drobny element sceny ma rozmiar własny,
niezależny od jej skali (D-349).
Plakietki nie ma przy czekaniu, w walce,
po śmierci i po rozwiązaniu mapy (D-320, D-322).

Światło sceny ma odcień (D-315, D-316): warstwa `scene-tint` leży nad wszystkim, co scena rysuje —
lasem, rekwizytami, ogniskiem płonącym i wygasłym, magiem, wilkiem, kurzem i lecącą ikoną na jej
plakietce — i pod szronem, plakietkami odkrycia i plakietką nad głową maga, które zostają na własnych kolorach (D-320, D-322).
Plakietka lecącej ikony (D-365) leży więc pod odcieniem i przyjmuje jego barwę, a ikona na niej zostaje
jasna na ciemnej plakietce. Elementy leżą w tej kolejności od dołu: las, rekwizyty, ognisko, kurz, wilk, mag,
obłok szamotaniny, lot ikony, odcień, chłodna warstwa po śmierci z zimna, szron, drobinki światła po rozwiązaniu,
plakietki odkrycia, plakietka nad głową. Plakietka nad głową nie siedzi więc w elemencie maga,
który leży pod odcieniem: jej nośnik to osobny element o tym samym polu i tym samym chodzie co mag.
Warstwa miesza się ze sceną trybem `mix-blend-mode: color`, więc przenosi na scenę barwę i nasycenie,
a jasność obrazu zostawia; jej kolor to mieszanka chłodnego i ciepłego odcienia w `oklch` w proporcji
`t`, a jej krycie idzie liniowo z `t` od krycia chłodnego odcienia do krycia ciepłego. Oba odcienie
i oba krycia to tokeny `--scene-tint-*`, a `t` (`--tint`, od 0 do 1) przychodzi z TypeScriptu jako liczba
w stylu warstwy: żaden kolor nie jest składany z liczb w kodzie (D-43). Jak `t` idzie za passą, kiedy
stoi w pełnym złocie i jak wraca po utracie passy, mówi D-316; długość powrotu stoi w regule powrotu
w `src/browser/run-screen.css`. Utrata passy w toku przejścia daje warstwie nowy element, który startuje od
odcienia, jaki stał, a animacja CSS prowadzi `--tint` do nowej wartości; pod ustawieniem ograniczenia
ruchu odcień pokazuje od razu swój koniec. Powrót, który gracz przerwał wyjściem z ekranu przejścia
(przeglądarka anuluje wtedy animacje ukrytego ekranu), kończy się tak, jak kończy go koniec animacji:
warstwa stoi na odcieniu, do którego szła, i po powrocie na ekran nie gra od początku (D-316, D-317).
W pauzie gracza i przy odkryciu odcień stoi, a powrót po
utracie passy w tym czasie zaczyna się dopiero, gdy scena rusza dalej. Przy śmierci, rozwiązaniu, na
starcie przejścia, po „Restart” i po wczytaniu odcień stoi od razu tam, gdzie stawia go passa albo
rozwiązanie. Odcień i szron leżą w scenie, więc filtr pauzy szarzy je razem z nią, a po rozwiązaniu
scena stoi w pełnym złocie także pod oknem końca przejścia, które „✕” odsłania (D-132).

Płonące ognisko ma dwa stopnie płomienia (D-373): pełny płomień i, w ostatnich minutach palenia,
mniejszy — ten sam płomień na tych samych kamieniach, zmniejszony ręcznie z klatek pełnego w kolorach
paczki Pixel Crawler, w tylu samych klatkach i tym samym takcie. Plik mniejszego płomienia i próg
w minutach palenia stoją w danych sceny; wygasłe ognisko zostaje takie, jakie jest.

Na brzegach kadru leży szron (D-372), nad odcieniem, więc jego kolor nie zmienia się z passą, i pod
plakietką nad głową, nigdy na całym obszarze sceny. Jego grubość w pikselach obrazu sceny, liczba
całkowita, przychodzi z TypeScriptu i idzie za temperaturą ciała tak, jak mówi D-372, a ogrzanie przy
ogniu ją cofa; to piksele obrazu, nie ekranu, więc pełne 16 pikseli to na ekranie 32 px przy scenie
672 × 304 px i 16 px przy scenie 336 × 152 px, a szron stoi w tej samej części kadru w obu rozmiarach (D-372, D-349); przychodzi też wielkość jednego piksela obrazu sceny jako część szerokości i część
wysokości kadru. CSS buduje szron z kwadratów jednego piksela obrazu sceny na jego siatce (D-271),
z masek na czterech elementach: kolor obrysu, kolor wypełnienia i kolory kryształków to tokeny
`--scene-frost-*`. Kształt postrzępionego brzegu stoi w regułach szronu w `src/browser/run-screen.css`:
wzdłuż każdej krawędzi pas pełny nieco cieńszy od szronu, nad nim dwa rzędy zębów o różnych okresach,
na bokach w innych okresach; kryształki to pojedyncze piksele w dwóch kratach o różnych okresach, tylko
w wypełnieniu. Pełna grubość szronu stoi więc tylko na najgłębszych zębach. Obrys, jeden piksel obrazu
sceny, to piksel, który wypełnienie, cieńsze o jeden piksel, zostawia pod wewnętrznym brzegiem każdej
kolumny; przy pierwszym pikselu grubości, tuż po tym, jak ciało odejdzie od 37 °C, stoi
więc sam obrys, w jego ciemnym kolorze, a wypełnienie dochodzi z kolejnymi pikselami. Obrys odcina się
od śniegu, na którym szron leży, kontrastem co najmniej 3:1 (D-271). Test
`tests/view/scene-frost-contrast.test.mjs` pilnuje tokenu obrysu wobec próbek śniegu zmierzonych raz,
pod chłodnym odcieniem, pod pełnym złotem i pomiędzy; zmiana tokenów odcienia, która zmienia śnieg pod
szronem, wymaga nowego pomiaru. Szron nie ma ruchu, więc pod ustawieniem ograniczenia ruchu nie ma
czego wyłączać: każda jego zmiana pokazuje od razu swój koniec.

Ruch daje CSS, bez pętli rysowania: klatki maga i ognia zmieniają się w stałym
takcie, dojście maga na miejsce trwa zawsze tyle samo, niezależnie od tempa gry,
a pasek płynie między odczytami zegara (D-316, D-319, D-320); czasy stoją
w `src/browser/run-screen.css`. Zmiana celu w drodze skręca maga z miejsca, w którym jest.
Mag, który zbiera, schyla się w pętli w tym samym takcie klatek przez całe zbieranie,
od chwili, gdy stanie na miejscu czynności, zwrócony ku rekwizytowi, który zbiera, z danych
gry: ku prawej przy patykach i jagodach, ku lewej przy mchu; przy włóknie, które rekwizytu nie ma,
zwrócony tak, jak stoi (D-364); jego klatki schylenia leżą w osobnym arkuszu z obrazkiem pierwszej klatki, pełnym
schyleniem, na którym mag staje pod ustawieniem ograniczenia ruchu.

Koniec zbierania pokazuje efekt zwykłego zdarzenia, najwyżej 300 ms, bez tekstu (D-317).
Gdy do plecaka przybyła sztuka, z rekwizytu, a przy włóknie spod stóp maga, leci łukiem do jego
tułowia ikona zasobu z danych gry, ta sama co na rysunku mapy, na małej plakietce w tle `panel`,
jak plakietka nad głową; ikona jest maską w `text-strong`, jak ikona nad głową, choć obok niej nie ma tekstu (D-365, D-40, D-43). Gdy „Zbierz” chybi,
przy rekwizycie, a przy włóknie pod stopami maga, staje obłok kurzu z paczki Smoke & Fire
Animated Particle [16x16], przekolorowany na brązy sceny, które odróżniają się od gruntu, na
którym stoi (D-366, D-271). Lot i kurz biegną w CSS z `src/browser/run-screen.css`, każdy 300 ms, kurz
raz przez wszystkie swoje klatki; scena pamięta poprzedni odczyt stanu gry i zdarzenia wywołania,
żeby rozpoznać koniec zbierania i trafienie albo chybienie, i nie zaczyna efektu zaległego: tego, którego
kolej przychodzi przy zatrzymaniu, tego z odczytu, który niesie kilka końców zbierania, i tego z odczytu,
w którym skończyła się też czynność biorąca sztuki z plecaka. Efekt zaczęty stawia przy miejscu, w którym
mag stoi albo do którego idzie w poprzednim odczycie; kończy się i stoi razem ze sceną przy zatrzymaniu,
a nowy zajmuje jego miejsce (D-367). Efekt, którego animację przeglądarka anuluje, bo scena zniknęła —
gracz wyszedł z ekranu przejścia albo stanęło okno końca przejścia (D-370) — kończy się jak przy końcu
animacji i gdy scena wraca, nie gra od początku, bo zaległy efekt przepada (D-367, D-317).

Wilk (D-316, D-148, D-271) stoi w scenie przez minuty starcia, obok maga, tuż za jego sylwetką,
z odstępem z danych sceny: po prawej, a gdy mag stoi przy prawym brzegu i prawa strona wyszłaby poza
kadr, po lewej, odbity. Mag obraca się ku niemu i zostaje tak zwrócony po starciu. Wilk leży pod magiem,
a obłok szamotaniny nad nim, w tej samej kolejności warstw co wyżej. Jego arkusze — stanie, bieg, gryzienie
i śmierć — to klatki 64 × 32 z paczki LPC Wolf, przeniesione bez zmiany pikseli, z łapami w dolnym rzędzie
każdej klatki, więc bieg, gryzienie i śmierć nie podskakują przy zmianie animacji; patrzą w lewo,
a po lewej stronie maga i przy odbiegnięciu za prawy brzeg odbija je CSS, jak maga. Niedźwiedź z mapy
Las — matecznik stoi w scenie tak samo, w tym samym miejscu i w tej samej kolejności warstw co wilk, bo scena
bierze arkusze i położenie stworzenia z jego identyfikatora w danych, ale ma własne arkusze, klatki
64 × 64, a jego łapy nie stoją w dolnym rzędzie klatki, tylko kilka rzędów wyżej. Scena obniża więc jego
klatkę o `SCENE_FIGHT.sink`, liczbę rzędów z danych sceny, różną dla każdego stworzenia (wilk 0, niedźwiedź 4),
tak że łapy niedźwiedzia stoją na linii gruntu, jak wilka; bez tego unosiłyby się nad nią. Kłąb szamotaniny to ten
sam plik kurzu co chybienie, osiem klatek w pętli w takcie klatek sceny, między wilkiem a magiem; jest mały,
nie zakrywa żadnego z nich i nie błyska. Plik wilka i miejsce kłębu stoją w danych sceny, a czasy w regułach
sceny w `src/browser/run-screen.css`; kod widoku nie nazywa żadnego pliku stworzenia.

Bieg wilka z prawego brzegu kadru na jego miejsce to efekt zwykłego zdarzenia (D-317): trwa 300 ms przy
każdym tempie, pięć klatek biegu raz, i scena zaczyna go w odczycie, którego zdarzenia niosą napaść, tylko
tam, gdzie scena idzie; po wczytaniu, po powrocie na ekran i przy zatrzymaniu, także przy zatrzymaniu na
odkryciu przy pierwszej napaści (D-322), wilk stoi od razu obok maga, a szamotanina rusza po „Wznów”.
Szamotanina trwa tyle co starcie i efektem nie jest. Wynik starcia to efekt zwykłego zdarzenia w odczycie,
który niesie koniec starcia: pokonany wilk pada w czterech klatkach śmierci i leży, aż efekt się skończy,
a potem go nie ma; wilk, który odchodzi, odbiega w pięciu klatkach biegu za prawy brzeg kadru; po śmierci
maga w walce wilk stoi nieruchomo obok niego w klatce stania, a po rozwiązaniu mapy w trakcie starcia stoi
nieruchomo tam, gdzie stał. Zaległy efekt przepada i wilka po prostu nie ma; tak samo bieg wilka i wynik
starcia, których animację przeglądarka anuluje, bo scena zniknęła (wyjście z ekranu przejścia albo okno
końca przejścia, D-370), kończą się z anulowaną animacją i gdy scena wraca, nie grają od początku. Bieg wilka, szamotanina i jej
wynik nie rozjaśniają ani nie przyciemniają całego obszaru sceny (D-317, D-42): zmienia się najwyżej klatka
wilka i kłąb kurzu, część kadru dużo mniejsza od progu błysku.

W pauzie gracza cały ruch sceny, także ogień, mag, wilk, kłąb szamotaniny, lot ikony, kurz i powrót odcienia, stoi (D-322);
przy odkryciu, śmierci i ukończeniu stoi cały ruch poza efektem tej chwili (niżej). Pod systemowym ustawieniem ograniczenia ruchu
klatki nie chodzą, mag staje na miejscu od razu, a pasek skacze przy odczytach
(D-317, D-319, D-320); mag, który zbiera, stoi w jednej klatce schylenia, a ikona i kurz
pojawiają się nieruchomo na swoim miejscu, ikona tam, gdzie ląduje, najwyżej na 300 ms, i znikają
(D-317); wilk staje od razu obok maga w pierwszej klatce gryzienia, kłąb stoi w pierwszej klatce,
a wynik starcia to nieruchomy obraz na miejscu wilka, najwyżej na 300 ms: leżący wilk albo wilk w pierwszej
klatce biegu.

Trzy chwile, gdy czas stoi — odkrycie, śmierć i rozwiązanie mapy — mają w scenie każda swój efekt (D-322).
Efekt gra raz, w odczycie, który niesie tę chwilę, i nie ma limitu 300 ms zwykłego efektu; potem scena
stoi na jego ostatnim obrazie, aż chwila się skończy („Wznów”, „Restart” albo „Zakończ”), a „Wznów” w trakcie
efektu odkrycia ucina go. Ruszają się tylko elementy efektu; ogień i mag stoją jak przy każdym
zatrzymaniu, więc reguła zatrzymania wyłącza z wstrzymania animacji tylko elementy oznaczone jako część
efektu. Ostatni obraz to styl elementu bez animacji, a efekt jest animacją dodawaną do elementu, póki
na scenie stoi `data-moment-playing`: dlatego scena narysowana ponownie na tej samej chwili — po powrocie
na ekran, po odświeżeniu strony, po wczytaniu zapisu — i scena pod systemowym ustawieniem ograniczenia
ruchu pokazują od razu ostatni obraz, bez ruchu. Odczyt tego, że chwila właśnie nastała, bierze się ze
zdarzeń wywołania symulacji (D-04), nie ze stanu gry; ostatnia animacja efektu mówi scenie, że efekt
się skończył, a scena schowana w czasie efektu, której przeglądarka animacje anuluje, stoi na ostatnim
obrazie; anulowanie mówi scenie o końcu tak samo jak ostatnia animacja, jak przy efekcie zwykłego
zdarzenia i powrocie odcienia wyżej. Okno końca przejścia czeka na koniec efektu śmierci albo rozwiązania i otwiera się od razu
tam, gdzie scena pokazuje ostatni obraz od razu (D-311). Żaden efekt nie rozjaśnia ani nie przyciemnia
na chwilę całego obszaru sceny (D-317, D-42): efekty są małe albo, jak chłodna warstwa, mieszają się
trybem `color`, który zostawia jasność obrazu.

- Odkrycie: scena zostaje kolorowa, a ikona każdej odkrytej rzeczy, która ma ikonę w danych gry
  (czynności, zasoby, ognisko i stworzenia), wychodzi z lasu na plakietce na tle `panel` z ramką w
  `discovery` o grubości `--bar-width`, jak plakietka nad głową maga (D-320, D-39), i stoi w rzędzie
  nad polaną do „Wznów”; przy pierwszej napaści jest wśród nich głowa wilka, obok wilka, który stoi
  już przy magu. Ta sama ikona stoi raz, a rzecz bez ikony — warunek i drzewo umiejętności — jest
  nazwana tylko przez pas nad programem (D-122). Plakietki leżą nad odcieniem światła, więc ramka
  ma kolor roli. Miejsca wyjścia i ułożenie stoją w danych sceny, jako piksele obrazu sceny, a czasy
  w regułach sceny w `src/browser/run-screen.css`.
- Śmierć: mag upada w sześciu klatkach arkusza śmierci z danych sceny i leży na ostatniej, szary jak
  dotąd; upada w stronę środka kadru, więc leży w obrazie, a nie za jego brzegiem ani pod szronem.
  Po śmierci z zimna nad całą sceną leży chłodna, niebieska warstwa, nad odcieniem światła i pod
  szronem, jako stan sceny do „Restart” albo „Zakończ”; wchodzi razem z upadkiem i odróżnia się od
  chłodnego szarozielonego odcienia przy passie 0. Po śmierci z głodu i w walce warstwy nie ma.
- Rozwiązanie: mag stoi w kolorze, a nad polaną, w części kadru, unoszą się raz drobinki światła —
  kwadraty jednego piksela sceny na jej siatce, rosnące o całe piksele — i gasną; leżą nad odcieniem
  światła, żeby jego złoto nie zmieniało ich koloru, i odróżniają się od śniegu, nad którym się
  unoszą (D-271). Ostatni obraz nie ma drobinek: to scena w pełnym złocie odcienia.
- Przy śmierci albo rozwiązaniu w minucie gry odkrycia scena pokazuje tylko efekt końca, bez plakietek
  odkrycia; odkrycie nazywa okno końca przejścia.

Kolory chłodnej warstwy i drobinek są wartościami, których żadne źródło nie ustala; cykl je zaproponował,
a Mariusz wybrał je przy prośbie o scalenie, przyjmując propozycję (reguła Every value with its source).

Szarości mają wartości z kodu, nie z tokenu. Pauza szarzy całą scenę filtrem
`grayscale(1) brightness(0.5)` (D-322). Martwy mag i wygasłe ognisko mają jedną
wspólną szarość, `grayscale(1) brightness(0.55)` (D-316, D-322); obie wartości
stoją w regułach sceny w `src/browser/run-screen.css`, a źródła w ich komentarzach. Przy
zatrzymaniu na odkryciu scena zostaje kolorowa, a po ukończeniu mag stoi
w kolorze; po śmierci mag jest szary (D-322). Wygasłe ognisko to ten sam obrazek
bez koloru i bez ruchu, a stoi tylko wtedy, gdy stoi na kafelku postaci (D-316).
Lista wartości tego przewodnika ich nie nazywa (zob. „No value in place of a
design token”).

### The body row of a map run

- **Decision:** D-337 · D-450 · D-311 · D-178 · D-39 · D-40 · D-42 · D-44 · D-04 · D-396 · D-407 · D-317 · D-322 · D-57 · D-125 · D-455
- **Invariant:** none
- **Good:** Komórka sytości poniżej progu: „Sytość” po lewej i „14 %” po prawej w `danger`, pod nimi pasek w `satiety-fill` na torze w `highlight`, pulsujący w swoim kolorze, a pod paskiem „głoduje” w `danger`; komórka temperatury ze skalą w trzech strefach, z kreską o jasnym środku w `text-strong` i ciemnych bokach w `scale-marker` i z ramką w `warming-frame` przy ognisku; po kliknięciu „Sytość” jej objaśnienie stoi tuż pod czterema komórkami, nad plecakiem, a drugie kliknięcie je zamyka; „−21 · wilk” w komórce zdrowia, pod jej paskiem, po starciu z wilkiem przy tempie 4×; pod wierszem plecaka wiersz „Wyposażenie: patyk w ręku, 2 × opatrunek pod ręką”, tym samym tekstem i bez paska; przy obszarze strony 360 px cztery komórki w dwóch rzędach po dwie, bez przewijania w bok.
- **Bad:** Wypełnienie paska sytości zmieniające kolor na `danger` przy alarmie; pasek pod plecakiem; skala temperatury bez strefy przegrzania albo ze strefami, które się stykają bez przerwy; kreska cała ciemna, której w środku strefy nie odróżnić od przerwy; pulsująca albo przesuwająca się ramka komórki temperatury; pulsowanie, które staje w pauzie gracza; cios znaleziony porównaniem zdrowia z poprzednim odczytem; dwa objaśnienia otwarte naraz albo objaśnienie pod plecakiem; tło `highlight` pod kursorem na przycisku komórki; „Energia natury 0” w `danger`; wiersz wyposażenia nad wierszem plecaka, z paskiem albo z kieszeniami przed ręką; czas, odstęp albo kolor wiersza ciała wpisany w jego arkusz zamiast tokenu.

Wiersz ciała stoi w obszarze świata ekranu przejścia, pod „Teraz” i „Potem” (D-311): cztery
wartości ciała — temperatura, sytość, zdrowie i energia natury — każda w komórce, a pod nimi wiersz
plecaka, który jest samym tekstem i nie ma paska, a pod wierszem plecaka wiersz wyposażenia (D-311):
tym samym tekstem co wiersz plecaka, w tej samej roli i wielkości, bez paska, z ręką przed kieszeniami
— „Wyposażenie: patyk w ręku, 2 × opatrunek pod ręką”, „Wyposażenie: 2 × opatrunek pod ręką”,
„Wyposażenie: patyk w ręku” i, gdy postać nic nie trzyma, „Wyposażenie: nic”. Wyposażenie nie wchodzi
do wiersza plecaka (D-455). Komponent wiersza ciała z wierszem plecaka to
`src/browser/view/body-row-cells.tsx`, a wiersz wyposażenia rysuje `src/browser/view/world-area.tsx`
zaraz po nim, ze słowami z `src/browser/view/gear-lines.ts`;
liczby, skale, dopiski i słowa objaśnień składa `src/browser/view/body-row.ts`, znacznik ciosu
`src/browser/view/body-blow.ts`, wspólny wygląd komórki stoi w `src/browser/styles.css` (strona
wszystkich stanów czyta tylko ten arkusz, reguła A stylesheet of its own for each screen and each
shared part), a reguły wiersza i jego ruchu w `src/browser/run-screen.css`. Wiersz rysuje z odczytu
stanu gry i z danych gry, a cios ze zdarzeń wywołania symulacji (D-04); pokazuje wartości od minuty
zero, cokolwiek gracz odkrył, a na ekranie po końcu przejścia stan zatrzymanej minuty (D-125,
D-337). Role pasków, stref, kreski i ramki stoją w tabeli Roles i w pliku tokenów, a wiersz czyta je
przez `var(--…)`; nowe znaczenie roli to zmiana decyzji (reguła Each role in its meaning).

Komórka (D-337, D-178, D-57):

- u góry nazwa wartości po lewej w `text-label` i jej liczba po prawej w `text`, w jednej linii,
  pod nimi pasek albo skala, pod nimi dopisek w `text-secondary`, mniejszy od wartości, tam, gdzie
  D-337 go daje, czyli pod temperaturą i pod sytością; zdrowie i energia natury dopisku nie mają.
  D-40 nie nazywa ról spoczynku nazwy i liczby, więc ta reguła je nazywa; liczba zachowuje swoją
  jednostkę, temperatura stoi w dziesiątych z przecinkiem, a pozostałe w całych liczbach. Zasady
  tych słów — „marznie”, „głoduje”, „przy ogniu”, „nie stygnie”, minuty — stoją w D-337 i w
  `src/browser/view/body-row.ts`;
- trzy komórki, temperatury, sytości i energii natury, są przyciskami zbudowanymi z rodzaju
  `value-cell` wspólnego przycisku (D-44): nazwa, liczba, pasek i dopisek stoją w nim jako jego
  części, które stoją też w komórce zdrowia, a ekran daje im tylko to, co jego własne — kolor
  wypełnienia, skalę, alarm i ramkę — jako klasy, których wspólna kontrolka nie zna i którym nie
  nadaje wyglądu. Komórka zdrowia nie jest przyciskiem: nie ma ramki, ale trzyma jej miejsce
  przezroczystą ramką, żeby cztery komórki stały równo;
- cztery komórki stoją w dwóch parach, temperatura z sytością i zdrowie z energią natury. Komórka
  nie jest węższa niż jej części ułożone każda w jednej linii, z całą nazwą i liczbą obok siebie, więc
  żaden napis nie wychodzi poza jej ramkę, a para nie jest węższa niż jej dwie komórki. Gdzie obie
  pary nie mieszczą się obok siebie, druga schodzi pod pierwszą i wiersz stoi jako dwa rzędy po
  dwie komórki, a gdzie mieszczą się, cztery dzielą wiersz po równo. Żaden próg szerokości o tym nie
  decyduje, więc reguła stoi w arkuszu bez bloku `@media (width < 1280px)`, a cel dotyku
  trzech przycisków trzyma ten blok, który ma każdy `.button` w `src/browser/styles.css` (reguła
  Everything is done by touch, and every control holds the touch target, D-396).

Paski i skala (D-337, D-39, D-40, D-42):

- pasek ma grubość podwojonego `--bar-width`, jak pasek wprawy drzewa na ekranie Postać, na torze
  w `highlight`, bo w takim kolorze stoi tor paska wymagania mapy w nagłówku; długość wypełnienia
  to udział wartości w jej zakresie z danych gry — sytości od 0 do jej wartości startowej, zdrowia
  od 0 do zdrowia startowego, energii natury od 0 do jej maksimum — a długość toru jest wymiarem
  układu, którego D-43 nie liczy. Wypełnienie ma kolor wartości: zdrowie `positive`, sytość
  `satiety-fill`, energia natury `text-strong`, choć wypełnienie nie jest tekstem; kolor wypełnienia
  nigdy nie przechodzi w kolor alarmu;
- temperatura stoi na skali liniowej zamiast paska, o tej samej wysokości co pasek, a jej liczby —
  końce skali, początek strefy przegrzania i udziały stref — stoją w `src/browser/view/body-row.ts`
  (`temperatureZones`). Torem skali są trzy strefy, od zimnej: `chill-zone`, `safe-zone`
  i `danger`, każda tak szeroka, jaki jest jej udział w skali, rozdzielone przerwą o szerokości
  `--frame-width`, przez którą widać `panel`, tak że strefa styka się tylko z tłem i z kreską.
  Granica stref wychłodzenia i bezpiecznej to próg wychłodzenia z danych gry, więc kreska stoi
  w strefie wychłodzenia dokładnie wtedy, gdy temperatura jest w alarmie; strefa przegrzania jest
  liczbą rysunku, bo gra przegrzania nie ma. Kreska temperatury teraz ma wysokość skali, nie
  wychodzi poza skalę, a poniżej lewego końca skali stoi przy nim. Ma jasny środek w `text-strong`
  o szerokości `--bar-width` i po obu jego stronach ciemny bok w `scale-marker` o szerokości
  `--frame-width`. Przerwy między strefami pokazują ciemny `panel`, więc kreska cała ciemna
  wyglądałaby w środku strefy jak jeszcze jedna przerwa; jasny środek odróżnia ją od przerwy w
  środku strefy i przy jej brzegu, a stref dotykają tylko ciemne boki;
- długość wypełnienia i miejsce kreski zmieniają się płynnie, w czasie, który stoi w regule
  w `src/browser/run-screen.css`, a przy pierwszym rysowaniu wiersza i pod systemowym ustawieniem
  ograniczenia ruchu stają od razu.

Alarm (D-337, D-39, D-42):

- poniżej progu — temperatura poniżej progu wychłodzenia i sytość poniżej progu głodu, oba
  z danych gry, oraz zdrowie poniżej progu, który jest liczbą wyglądu i którego gra nie zna —
  liczba wartości stoi w `danger`, a pod temperaturą i pod sytością także „marznie” albo
  „głoduje” w `danger`. Energia natury nie alarmuje, na żadnym poziomie, zerem też. Ekran znaczy
  komórkę w alarmie klasami `alarm` i `note-danger`;
- wypełnienie paska w alarmie pulsuje w swoim kolorze, a na skali temperatury kreska razem ze
  strefą, w której stoi (`holds-marker`): krycie schodzi do `--alarm-pulse-dim-opacity` i wraca do
  pełnego, płynnie i bez końca, w czasie z reguły w `src/browser/run-screen.css`. Przygaszona faza
  jest wyjątkiem od progu 3:1, który reguła Contrast of every pair trzyma dla pełnego koloru;
  alarm niosą przez cały czas liczba i dopisek. Pod systemowym ustawieniem ograniczenia ruchu nic
  nie pulsuje. Pulsowanie trwa, gdy czas gry stoi — w pauzie gracza, w chwili odkrycia, śmierci
  i rozwiązania mapy i na ekranie po końcu przejścia — choć ruch sceny wtedy stoi (D-322); ocenia
  je kryterium błysków, jedno z czterech, które interfejs przyjmuje (D-42).

Ramka komórki temperatury (D-337, D-39):

- ramka przycisku komórki temperatury mówi, co działa na postać: w `warming-frame`, dopóki na polu
  postaci coś się pali, także gdy temperatura stoi już na swoim maksimum; w `chill-zone`, dopóki
  nic postaci nie grzeje, a mapa jest od jej ciała zimniejsza, jak liczy to krok ciała; zwykła
  w `control-border` tam, gdzie mapa nie chłodzi. Klasy `frame-warming` i `frame-cooling` znaczą
  ją w komórce. Ma grubość ramki przycisku, nie pulsuje i nie rusza się, zmienia się tylko wtedy,
  gdy zmienia się to, co działa na postać, więc ograniczenie ruchu jej nie dotyczy. Od obwódki
  fokusu, którą rysuje wyłącznie reguła Visible focus, odróżnia ją to, że obwódka jest grubsza
  i odsunięta od komórki. Nie jest ramką przy tekście w rozumieniu reguły A line at a text takes the colour of
  that text: nie bierze koloru tekstu w komórce. Na ekranie po końcu przejścia mówi o stanie
  zatrzymanej minuty, jak dopiski.

Objaśnienie po kliknięciu (D-450, D-407, D-04):

- kliknięcie komórki temperatury, sytości albo energii natury otwiera tuż pod czterema komórkami,
  nad plecakiem, akapit z objaśnieniem jej wartości, w `text-secondary` w rozmiarze szczegółu, jak
  dopiski; drugie kliknięcie tej komórki go zamyka, a kliknięcie innej przełącza na jej objaśnienie,
  więc otwarte jest najwyżej jedno. Akapit jest linią przepływu, więc plecak i to, co pod nim,
  schodzą o jego wysokość. Słowa — próg, to, co dzieje się poniżej niego, i tempo zmiany —
  składa `bodyExplanation` w `src/browser/view/body-row.ts` z liczb danych gry;
- które objaśnienie stoi otwarte, jest stanem komponentu wiersza i nie wchodzi do stanu gry ani do
  zapisu; przycisk mówi o tym przez `aria-expanded`. Komórka zdrowia nie jest przyciskiem
  i objaśnienia nie ma.

Znacznik ciosu (D-450, D-04, D-317):

- cios stworzenia wstrząsa komórką zdrowia i pokazuje gasnący napis „−{n} · {stworzenie}”, w
  `danger`, w samej komórce zdrowia, w jej prawym dolnym rogu, pod paskiem, gdzie komórka ma miejsce:
  w rzędzie czterech komórek bierze wysokość komórek z dopiskiem, a w układzie telefonu — przycisku
  obok, który trzyma cel dotyku. Napis stoi w tym miejscu nieruchomo i tylko gaśnie, płynnie, wolno
  na początku, więc da się go przeczytać przez większość jego czasu, a pasek i jego koniec zostają
  odsłonięte. Nie unosi się, jak napis starego Loopa: pod paskiem komórka ma miejsca tyle, ile
  zajmuje napis, więc unoszący się napis wszedłby na pasek i zasłonił jego koniec, a nad komórką
  stanąłby na wierszu „Potem” albo na ramce komórki obok. Napis nie przekracza ramki komórki, więc
  nie stoi na ramce innej komórki (D-396). Cios
  czyta wiersz ze zdarzeń wywołania symulacji, nigdy z porównania zdrowia z poprzednim odczytem, więc
  nie pokazuje go ani pierwsze rysowanie ekranu, ani przeładowanie, ani wczytanie zapisu. Jedno
  starcie daje jeden znacznik z sumą ciosów stworzenia, gdy ta suma to co najmniej 2, także gdy cios
  zabija, zanim otworzy się okno końca przejścia, a nowy cios zastępuje znacznik poprzedniego
  (`src/browser/view/body-blow.ts`);
- znacznik pokazuje się przy tempie 1×, 2× i 4×, a przy 8× i 16× nie, tak jak scena nie pokazuje
  wtedy napisów swoich efektów (D-317), i cios z szybkiego tempa przepada, nie czeka na zwolnienie.
  Pod ustawieniem ograniczenia ruchu komórka nie drga, a napis stoi w pełnym kolorze i znika na
  końcu swojego czasu, od razu. Gdy czas
  gry stoi, drganie i napis stoją tam, gdzie doszły, i ruszają dalej, gdy czas rusza; znacznik,
  który przychodzi, gdy czas stoi, stoi w pierwszej klatce. Ruch ocenia kryterium błysków (D-42).

Ruch wiersza:

- ruch daje sam CSS, w regułach wiersza w `src/browser/run-screen.css`, a TypeScript tylko znaczy
  wiersz i komórkę: `data-standing` niesie to, jak stoi czas gry, czytane z tego samego odczytu co
  ruch sceny (`src/browser/view/scene-picture.ts`), `data-blow` niesie parzystość numeru ciosu, która zaczyna drganie od nowa przy nowym ciosie, a klasy
  `alarm` i `holds-marker` niosą alarm. Wiersz nie czyta ustawienia ograniczenia ruchu w TypeScripcie
  — D-04 pozwala to widokowi tylko dla sceny — ale w regule `@media (prefers-reduced-motion: …)`;
  reguły ruchu sceny stoją pod `.scene`, więc żadna nie sięga wiersza;
- czasy ruchu wiersza — płynnej zmiany długości, pulsu, drgania i gaśnięcia napisu — stoją
  w regułach w `src/browser/run-screen.css`, a źródła w komentarzach przy nich; krycie
  przygaszonej fazy i odstępy ruchu są tokenami. Ten przewodnik nie wymienia ich w liście wartości
  i D-43 ich nie liczy, jak czasów ruchu sceny; czy staną się tokenami, ten przewodnik nie rozstrzyga.

Przycisk komórki w stanach wspólnych kontrolek stoi w regule States of shared controls, na liście
kontrolek odstępujących, z powodem, a jego próbki — w stanach wspólnej kontrolki, raz z paskiem, raz ze
skalą — na stronie wszystkich stanów (D-45). Układ telefonu przy
obszarze strony 360 px sprawdza pomiar ze skilla `.claude/skills/loop2-play/SKILL.md` na wierszu
z objaśnieniem otwartym i ze znacznikiem ciosu pokazanym (reguły Nothing scrolls to the side in the
phone layout, and no text crosses its frame i A change is checked in both layouts). Przegląd zmiany
wiersza czyta każdy jego kolor wobec tej reguły i tabeli Roles, a każdy ruch wobec kryterium błysków.

### The picture band of Siedziba

- **Decision:** D-389 · D-272 · D-271 · D-314 · D-315 · D-316 · D-317 · D-321 · D-349 · D-286 · D-280 · D-42 · D-43 · D-396
- **Invariant:** none
- **Good:** Pas obozu między wierszem ostrzeżeń a nagłówkiem „Siedziba”, z ogniskiem pośrodku, skrzynką i postaciami, które są w obozie, obok niego; w układzie telefonu polana przycięta po bokach wokół ogniska; pod ograniczeniem ruchu klatki stoją.
- **Bad:** Tekst, przycisk albo reakcja na kliknięcie na obozie; obóz zmniejszony w układzie telefonu; postać przejścia ręcznego albo pętli zarobkowej przy ognisku; postać ucięta w połowie brzegiem pasa; ognisko obozu wygaszone razem z ogniskiem ze stanu gry; błysk całego pasa.

Rysuj obóz jako obraz u góry ekranu Siedziba: pas na całą szerokość treści, w wysokości swojego obrazka w
dwukrotności pikseli, pod wierszem ostrzeżeń pod paskiem menu i nad nagłówkiem „Siedziba”, nad panelem
ekranu, nie w nim; zdanie strony stoi nad pasem (D-286). Tłem jest polana z obrazków paczki w pełnym świetle,
bez odcienia. Na niej stoją ognisko, które zawsze płonie i nie zależy od ogniska ze stanu gry, skrzynka jako
jeden nieruchomy obrazek i postacie w pozie bezczynności: tylko te, które są w obozie, w kolejności
założenia, tyle całych, ile mieści pas. W układzie telefonu (D-396), gdzie okno jest węższe od obrazka,
przycinaj polanę po bokach wokół ogniska i nie zmniejszaj jej; sekcja „Drużyna” pod pasem wymienia wszystkie postacie. Poruszaj ogień i postacie z CSS, w
stałym takcie klatek sceny, bez pętli rysowania, a pod ograniczeniem ruchu zostaw klatki w miejscu. Nie daj
obozowi tekstu, kontrolki ani reakcji na kliknięcie, ukryj go przed czytnikami ekranu i nie rób w nim błysku;
do postaci prowadzą kafelki w „Drużyna” (D-280). Nazwy plików i liczby bierz z danych gry, a rozmiary wpisuj
w style z TypeScriptu. Obóz nie wnosi nowej roli, wartości tokenu ani znaczenia roli.

### The section „Drużyna” of Siedziba

- **Decision:** D-282 · D-54 · D-51 · D-52 · D-218 · D-217 · D-244 · D-245 · D-246 · D-280 · D-446 · D-447 · D-287 · D-39 · D-40 · D-42 · D-43 · D-44 · D-275 · D-279 · D-396
- **Invariant:** none
- **Good:** Pod nagłówkiem „Drużyna” w `text-label` raz „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`, pod nim siatka kafelków jednej szerokości, pięć w rzędzie przy pełnej szerokości gry: kafelek z cienką ramką w `control-border` i bez własnego tła, w nim znaczek maga i „Ala” w `text-strong`, pod imieniem „Mag żywiołów” w `text-secondary` i „W obozie” w `text`; kafelek postaci w pętli w zielonej ramce, z zieloną kropką „●” na końcu wiersza imienia i z wierszem pętli z „Zatrzymaj”; siatkę kończy przerywane „+ postać”, a w układzie telefonu kafelki stoją po dwa w rzędzie.
- **Bad:** Kafelek z własnym tłem `page` albo z ramką w `divider`; imię jako jedyne pole kliknięcia kafelka; wiersz wskrzeszenia w każdym kafelku; raport z nieobecności w osobnej sekcji z tytułem; „Załóż” zawsze widoczne pod kafelkami; „+ postać” z pełną ramką albo z podkreślonym napisem; zielona ramka w kolorze tekstu obok; kafelek, który pod kursorem rozjaśnia ramkę zamiast tła; imię ucięte wielokropkiem.

Sekcja „Drużyna” Siedziby (D-282) stoi w bloku `screen-area` ekranu, pod wierszem raportu
z nieobecności, kiedy ten stoi, i nad sekcją „Skrzynka”. Pisze ją `src/browser/view/headquarters.tsx`,
kafelki `src/browser/view/team-cards.tsx`, a ich wygląd stoi w `src/browser/headquarters.css`.

- Pod nagłówkiem „Drużyna” w `text-label` stoi raz, dopóki drużyna ma postać, wiersz wskrzeszenia
  drużyny w `text-secondary`, a przy zerze użyć w `danger` (D-217); kafelek go nie ma. Drużyna bez
  postaci ma w tym miejscu „Drużyna nie ma jeszcze postaci.” w `text-secondary`, obok otwartego
  kafelka „+ postać” (D-51).
- Kafelki stoją w siatce, w kolejności założenia postaci (D-54), a „+ postać” po nich: w układzie
  komputera kafelki jednej stałej szerokości, tyle w rzędzie, ile się mieści, około pięciu przy
  pełnej szerokości gry, jak w starym Loopie; w układzie telefonu dwa w rzędzie (D-396). Kafelki
  jednego rzędu mają wysokość najwyższego. Szerokość kolumny jest wymiarem układu, którego D-43 nie
  liczy.
- Kafelek postaci to prostokąt z cienką ramką w `control-border`, bo da się go kliknąć, bez
  własnego tła, więc prześwituje `panel` bloku (D-40). Dopóki pętla postaci chodzi, ramka jest
  w `positive`, a na końcu wiersza imienia stoi kropka „●” w `positive`, ukryta przed czytnikiem
  ekranu, bo pętlę nazywa wiersz pętli (D-39); ta ramka mówi o pętli, nie bierze koloru tekstu obok
  (reguła A line at a text takes the colour of that text). Poza pętlą ramka jest zwykła, bez kropki.
- W kafelku, od góry: znaczek archetypu rysowany maską w kolorze imienia i imię w `text-strong`,
  w rozmiarze `--font-size-heading` (D-446, D-43), łamane w kafelku (reguła A name typed by the
  player breaks in its row); pod nimi „pokolenie {n} · ” od drugiego pokolenia i nazwa archetypu
  w `text-secondary`, w rozmiarze podpisu (D-218); pod nimi wiersz tego, co postać robi, ten sam co
  pierwszy wiersz ramki na ekranie Postać, w `text` i w rozmiarze szczegółu (D-447) — „W obozie”,
  „Przejście: …” albo wiersz pętli z przyciskiem niszczącym „Zatrzymaj” pod nim (D-244, D-44), a po
  zatrzymaniu pętli pod „W obozie” wiersz „Pętla zatrzymana …” w `text-secondary` (D-245).
- Wiersze raportu z nieobecności stoją w kafelku swojej postaci, na jego końcu, pod cienką linią
  w `divider`, bo tu kończy się jedna część kafelka, a zaczyna następna (D-40), bez imienia przed
  wierszem: pętla zatrzymana śmiercią w `danger`, pozostałe w `text`, z „Odbierz” w `positive` przy
  wierszu, w którym czeka wprawa (D-246, D-39).
- Nad „Drużyną”, dopóki raport stoi, jeden wiersz, który się zawija: zdanie liczące pętle w `danger`,
  gdy któraś stanęła, inaczej w `positive` — zwykły tekst w tej roli, jak „rozwiązana” na liście
  map — po nim „Skrzynka jest pełna.” w `warning`, gdy skrzynka jest pełna, i zwykły wspólny
  przycisk „Zamknij” (D-246, D-39, D-44).
- Cały kafelek prowadzi do ekranu Postać tej postaci: imię jest jedynym odnośnikiem kafelka,
  a arkusz rozciąga jego pole kliknięcia na cały kafelek, więc czytnik ekranu czyta odnośnik
  imieniem (D-280); pod kursorem nad tym polem kafelek dostaje tło `highlight`, a ramka i role
  tekstu zostają (D-40). „Zatrzymaj” i „Odbierz” stoją nad tym polem jako osobne przyciski
  i ekranu nie otwierają. Obwódkę fokusu rysuje reguła Visible focus na imieniu, nie na kafelku.
  W układzie telefonu imię trzyma własne pole dotyku `--touch-target-min`, a na urządzeniu, które
  nie najeżdża, kafelek nie dostaje tła pod kursorem (reguła Two layouts and one threshold between
  them).
- Zamknięte „+ postać” to przycisk przerywany wspólnej kontrolki (D-44; reguła Main button, secondary
  action and tab), na całe pole kafelka, co najmniej tak wysoki jak kafelek z jednym wierszem tego,
  co postać robi. Dotknięcie otwiera w tym samym miejscu kafelek z przerywaną ramką
  w `control-border`, którą rysuje arkusz Siedziby, bo pole i „Załóż” nie są tym przyciskiem: w nim
  znaczek i nazwa archetypu nowej postaci w `text-secondary`, pole „Imię nowej postaci”, zwykły
  przycisk „Załóż” i pod nimi akcja poboczna „Anuluj” (D-275); fokus przechodzi do pola. „Załóż”
  i Enter w polu zakładają postać z imienia (D-52), a „Anuluj” i Escape w polu zamykają kafelek bez
  zakładania i czyszczą pole; po każdym z nich fokus dostaje zamknięte „+ postać”, które staje
  w miejscu pola (reguła Focus does not fall to the page). Imię puste po obcięciu zostawia kafelek
  otwarty z „Wpisz imię postaci.” pod polem, w stanie błędu pola (D-52, D-44). Przy pustej drużynie
  kafelek stoi otwarty od razu, bez „Anuluj”, a Escape go nie zamyka (D-51). Otwarty kafelek
  i wpisany tekst trwają przy przerysowaniu i po wyjściu z Siedziby.
- Kafelki i ich kontrolki mieszczą się przy obszarze strony 360 px bez przewijania w bok i bez
  napisu poza ramką, a każda kontrolka trzyma cel dotyku (D-396); reguł układu telefonu nie
  sprawdza test, tylko agent w przeglądarce (reguła A change is checked in both layouts).
- Sekcja nie wnosi nowej roli ani wartości tokenu; zielona ramka i kropka to użycie `positive`, które
  podaje D-39 i tabela Roles.

### The chronicle of a map run

- **Decision:** D-343 · D-344 · D-311 · D-130 · D-39 · D-40 · D-46
- **Invariant:** none
- **Good:** Wpis „Zbierz — Patyk” w `text`, minuta „212” w `text-label` i odkrycie w `discovery`; pusta kronika w `text-secondary`.
- **Bad:** Minuta „Minuta 212” przy wpisie; wszystkie wpisy w jednym kolorze; filtry narysowane jako zakładki.

Obszar pod światem na ekranie przejścia, pod rysunkiem mapy i linią kafelka,
ma zakładki „Kronika” i „Teren”, a na starcie przejścia wybrana jest „Kronika”
(D-311). Kronika stoi tak:

- Rząd siedmiu przycisków filtra — „Wszystko”, „Odkrycia”, „Czynności”, „Walka”,
  „Moje zmiany”, „Passa”, „Świat” — ma wygląd przycisków tempa (D-130): przycisk
  wybrany w grupie, jeden naraz, „Wszystko” na starcie przejścia. Filtr nie jest
  zakładką (D-343), a jego tekst ma czcionkę wspólnego przycisku, nie Geist
  Mono.
- Lista stoi na tle `panel` i cała jest w Geist Mono (D-46), a najnowszy wpis
  stoi u góry.
- Minuta gry stoi sama, jako liczba, w kolumnie po lewej, w roli `text-label`;
  obok stoi tekst wpisu w roli jego rodzaju (D-343, D-344): odkrycie w
  `discovery`, zmiana gracza w `player-change`, utrata passy w `danger`,
  czynność i walka w `text`, śmierć i „Ognisko wygasło” w `text`, rozwiązanie
  mapy w `positive`.
- Pusta kronika i filtr bez wpisów mówią „Nic tu jeszcze nie ma.” w
  `text-secondary`, jak „Wybierz mapę z listy.” na ekranie Mapy (D-343, D-331).

Żadna z tych części nie dostaje nowej roli, barwy ani wartości; wartości stoją
w pliku tokenów, a kod kroniki w `src/browser/view/tabs-area.tsx`.

### The end-of-run window

- **Decision:** D-368 · D-311 · D-322 · D-173 · D-132 · D-122 · D-313 · D-185 · D-216 · D-188 · D-208 · D-323 · D-44 · D-45 · D-275 · D-276 · D-285 · D-370 · D-39 · D-40 · D-43 · D-46 · D-47 · D-279
- **Invariant:** none
- **Good:** Okno po śmierci z tytułem „Mag zamarzł” w `text-strong` na `panel`, nad nim pasek menu i wiersz ostrzeżeń, pod nim przyciski „Restart”, „Zakończ” i „Otwarte: …” stojące w polu widzenia, gdy sekcje się przewijają; Escape zamyka okno, a nagłówek ekranu ma wtedy „Koniec przejścia”.
- **Bad:** Okno przykrywające pasek menu; okno z zasłoną za sobą; przycisk zrobiony w oknie osobnym `<button>` albo z czcionką Geist Mono; pasek czasu w roli, której nie ma w tabeli Roles; Escape czytany na dokumencie.

Okno końca przejścia, `src/browser/view/end-window.tsx`, jest pierwszym oknem
nad ekranem gry. Otwiera się samo, gdy przejście ręczne kończy się śmiercią
postaci albo ukończeniem mapy — po efekcie tego końca w scenie, żeby go było widać, a od razu tam,
gdzie scena pokazuje ostatni obraz od razu (D-311, D-322) — i otwiera się znowu przy każdym wejściu na ekran
zakończonego przejścia (D-368). Jego treść i kolejność podaje D-368, jego
teksty — `src/browser/view/end-window-lines.ts`; ta reguła podaje, jak okno
wygląda, jak przykrywa ekran, jak się zamyka i jak bierze fokus. Reguły okna
stoją w `src/browser/run-screen.css` pod klasami `end-window`.

Jak przykrywa ekran:

- Póki okno stoi, ekran przejścia — jego nagłówek i trzy obszary pod nim — nie
  jest pokazany: elementy mają atrybut `hidden` i zostają w drzewie. Pasek menu
  z wierszem ostrzeżeń pod nim stoi nad oknem i działa, więc nieudany zapis
  (D-208) i awaria gry (D-323) są widoczne, a kliknięcie w pasek opuszcza
  ekran przejścia (D-311, D-368). Okno nie przykrywa paska menu.
- Okno nie ma zasłony ani tła za sobą. Stoi na tle `panel` z tekstem w `text` i ramką w `divider`
  (D-40), w kolumnie treści ekranu, tak szerokim jak ta kolumna w układzie komputera i w układzie
  telefonu (D-370, D-280), o takiej wysokości, że pod nim zostaje
  miejsce na pasek menu i wiersz ostrzeżeń.
- Najwyższą wysokość okna zadaje `max-height` w jednostce `vh`, a w układzie
  telefonu w `svh`, wysokości okna z widocznym paskiem adresu, bo okno otwiera
  się przy stronie przewiniętej do góry, gdy pasek adresu telefonu stoi: wymiar
  układu, którego D-43 nie liczy jako wartości wpisanej zamiast tokenu. Jej wartość
  stoi w regule `end-window` w `src/browser/run-screen.css`. Wyższa treść przewija
  się w oknie, nie wypycha go.
- Przewija się tylko część środkowa: nagłówek okna — napis „Koniec przejścia”,
  tytuł i „✕” — oraz rząd przycisków u dołu stoją w miejscu i są stale w polu
  widzenia (D-368).

Jak się zamyka i otwiera:

- „✕” i Escape zamykają okno i odsłaniają ekran; fokus idzie wtedy na
  „Koniec przejścia” w nagłówku ekranu. Escape czyta korzeń okna, nigdy
  dokument (D-370).
- „Koniec przejścia” w nagłówku ekranu otwiera okno znowu. Stoi przed „Restart”,
  póki okno jest zamknięte po końcu przejścia; gdy okno stoi, nagłówek jest
  ukryty razem z ekranem (D-311, D-368).
- „Restart” zaczyna przejście od nowa, „Zakończ” i „Otwarte: {mapa} →” kończą
  je i opuszczają ekran. Gdy kopia ma niezapisane zmiany, te dwa przyciski
  zamiast tego zamykają okno i stawiają pytanie „Zapisać, odrzucić, wrócić?”
  w panelu kopii; okno nie stoi, póki pytanie stoi, i po „Wróć” zostaje
  zamknięte, aż gracz otworzy je przyciskiem „Koniec przejścia” (D-173).
- „Dodaj regułę z tym” zamyka okno i otwiera okno reguły pod wierszem reguły
  (D-313).

Jak role, czcionka i wspólne kontrolki składają okno; żadna część nie dostaje
nowej roli ani wartości:

- Tytuł jest w `text-strong`, a po ukończeniu mapy w `positive` (D-132, D-39);
  napis „Koniec przejścia” nad nim i nazwy sekcji są w `text-label`, sekcje
  oddziela linia w `divider`. Treść sekcji jest w `text`, numer reguły w „Nie
  zadziałały ani razu” w `text-label`.
- Wiersz tego, co koniec dał albo kosztował, jest w `text-secondary`, a w
  `danger`, gdy wskrzeszenie nie miało żadnego użycia (D-185, D-216). Odkrycie stoi w
  `discovery` z belką w kolorze tego tekstu (D-279), jak pasek odkrycia, i ze
  wspólnymi przyciskami (D-122, D-313).
- „Ostatnie minuty” i akapit ostatniego starcia stoją czcionką Geist Mono jak
  kronika (D-46), minuta w `text-label`, a tekst wpisu w roli swojego rodzaju
  jak w kronice (reguła The chronicle of a map run). Reszta okna stoi czcionką
  tekstu gry.
- Najdłuższa passa stoi w klasach paska wymagania z nagłówka: tor w `highlight`,
  wypełnienie w `text`, a spełniona — nazwa, liczby i wypełnienie w `positive`
  (D-135, D-133, D-40).
- Pasek czasu „Na co poszedł czas” ma tor w `highlight` i kawałki wypełnione w
  `text`, rozdzielone odstępem o szerokości `--frame-width`; długość kawałka
  jest jego udziałem w minutach, a pod paskiem stoi legenda z nazwą i procentem,
  procent w `text-label`. Jego wysokość to stopień skali odstępów, `--space-s`,
  nie `--bar-width`. Kawałki mają jeden kolor, `text`, i odróżnia je kolejność,
  szczelina, długość i legenda pod paskiem w tej samej kolejności co kawałki;
  serii wypełnień ani koloru przy pozycji legendy nie ma.
- Wszystkie przyciski okna — „✕”, „Restart”, „Zakończ”, „Otwarte: …” i „Dodaj
  regułę z tym” — to wspólne przyciski `ReactButton` (D-44): okno nie tworzy
  własnego elementu `<button>`, nie ustawia ich czcionki i nie zmienia ich
  wyglądu. „Restart” i „Zakończ” są przyciskami niszczącymi, pozostałe zwykłymi;
  „Dodaj regułę z tym” jest wyłączony, gdy kopia nie ma grupy reguł, a w oknie
  nie ma akcji pobocznej ani zakładki (D-275, D-276). Ostrzeżenie o przyciętym
  planie wyprawy stoi obok „Restart” w `warning` (D-188).

Fokus:

- Korzeń okna to element `section` z `role="dialog"`, nazwany tytułem okna przez
  `aria-labelledby`, z `tabIndex` równym −1. Bierze fokus raz, gdy okno się
  pojawia, i nie bierze go więcej, póki stoi; kliknięcie w okno zostawia więc
  fokus w oknie i Escape działa.
- Część przewijana ma `tabIndex` równy 0: bez kontrolki w środku klawiatura nie
  ma inaczej jak ją przewinąć. Tab idzie po kolei: „✕”, część przewijana,
  kontrolki w niej, przyciski u dołu.
- Okno nie zatrzymuje fokusu w sobie i nie ma `aria-modal`; pasek menu nad nim
  zostaje osiągalny z klawiatury.
- Fokus każdego elementu okna, także korzenia po otwarciu, rysuje jedna reguła
  `:focus-visible` (reguła Visible focus, D-47); okno nie ustawia `outline`.

Strona wszystkich stanów nie ma próbki okna; jego przyciski stoją tam w swoich
stanach (D-45).

Otwarte dla człowieka:

- czy D-40 ma nazwać wypełnienie paska czasu w `text`, jak nazywa wypełnienie
  paska wymagania w nagłówku, i czy pasek ma mieć nazwaną grubość zamiast
  stopnia skali odstępów;
- użycia ról, które mieszczą się w słowach D-40, ale nie zostały zatwierdzone
  dla tych miejsc: tor paska czasu w `highlight` i ramka okna w `divider`.

### The list of accounts

- **Decision:** D-410 · D-411 · D-281 · D-44 · D-39 · D-40
- **Invariant:** none
- **Good:** Wiersz konta z rolą właściciela ma adres, stan, uprawnienie, rolę i trzy przyciski, bez „Zablokuj”; „Zablokuj” przy koncie gracza stoi w `danger` już w spoczynku, a pod kursorem dostaje dodatkowo tło `highlight`.
- **Bad:** Przycisk „Zablokuj” przy koncie z rolą właściciela; „Zablokuj” wykonane od pierwszego kliknięcia, bez potwierdzenia.

Ekran listy kont stoi pod `#/konta` i jest tylko dla konta z rolą właściciela
(D-281). Nie jest pozycją paska, więc żadna pozycja paska go nie znaczy; zamiast
tego nad listą stoi nagłówek „Panel właściciela” w `text-strong`, jak „Siedziba”
na swoim ekranie, także gdy lista się wczytuje albo jej nie udało się wczytać.
Pokazuje każde konto w jednym wierszu, posortowane po adresie (D-411):

- adres konta to nazwa wiersza, w `text-strong`, bo na niego patrzy się najpierw;
- stan blokady: konto zablokowane w `warning`, bo jego gra się nie wykona,
  konto odblokowane w `text`;
- uprawnienie do poprzedniego zapisu i rola (gracz albo właściciel) w `text`;
  jeśli wiersz podpisuje te wartości, podpisy stoją w `text-label`.

Wiersz nie pokazuje nic więcej o koncie niż te cztery rzeczy (D-411).

Przyciski każdego wiersza to wspólne przyciski (D-44) w stanach z reguły States
of shared controls:

- „Odblokuj”, „Nadaj uprawnienie do poprzedniego zapisu” i „Odbierz uprawnienie
  do poprzedniego zapisu” to zwykłe przyciski, w `text` na spoczynku; działają od
  razu, bez potwierdzenia; czekając na serwer, są wyłączone i zachowują napis,
  w `text-disabled`;
- „Zablokuj” to przycisk niszczący (D-411, D-44): w `danger` już w spoczynku,
  w każdym układzie, a pod kursorem dodatkowo na tle `highlight`; czekając na
  serwer, jest wyłączony i zachowuje napis. Przy koncie z rolą właściciela,
  także przy własnym, go nie ma.

Potwierdzenie „Zablokuj” stoi tak jak potwierdzenie „Zacznij od zera” (D-402):
pod wierszem, a w nim jedno zdanie o skutkach blokady w `warning` (sesje gracza
kończą się w każdej przeglądarce, odnośniki z maili przestają działać, a
odblokowanie tego nie przywraca), przycisk potwierdzający „Tak, zablokuj” jako
przycisk niszczący w tym samym wyglądzie co „Zablokuj”, i zwykły przycisk
„Wróć” (D-44), tak jak przy „Zacznij od zera”; potwierdzenie nie jest formularzem,
więc „Wróć” nie jest akcją poboczną (D-275). Zdanie i dwa przyciski stoją w jednym
rzędzie, który się zawija: w oknie szerokim przyciski stoją zaraz po zdaniu,
w wąskim, gdy zdanie nie zostawia im miejsca, pod nim; zdanie nie ma marginesu,
który spychałby przyciski na koniec szerokiego wiersza. Klik „Zablokuj”,
który otwiera potwierdzenie, nic nie wysyła. Przycisk „Tak, zablokuj” wysyła
blokadę. „Wróć” zamyka potwierdzenie i nic nie zmienia.

Lista bez kont stoi bez pozycji, z jednym zdaniem w `text-secondary`, jak puste
listy na ekranie Mapy (D-331). Odmowa serwera albo brak połączenia przy
wczytaniu listy stoi nad nią jednym zdaniem w `warning`, jak odmowa przy
formularzu (D-44). Każde z tych dwóch zdań to jedno zdanie, w podanej roli;
słowa pisze autor ekranu.

## Examples

### Mockups

Makieta — także zrzut ekranu gry loop pod https://kantarion.bieda.it/, od
której loop2 zaczyna wygląd — jest wzorcem, z którym porównuje się ekran, nie
jego specyfikacją. Znaczenia na ekranie biorą się ze styleguide'u, a wartości
z pliku tokenów. Kolor odczytany z makiety nie staje się przez to wartością
roli: wartość i jej źródło ustala się z człowiekiem.

### Plan of a user-interface change

Zmiana interfejsu idzie w kolejności: najpierw środowisko i biblioteka, potem
wartości w ich źródle, potem jeden ekran, potem jego stany. Dla loop2 ta
kolejność to: czcionki Geist w plikach produktu i ich kopiowanie przy
budowaniu; plik tokenów z wartościami i ich źródłami; arkusz stylów gry na
tokenach razem z siatką terenu; wspólne kontrolki w ich stanach i strona
wszystkich stanów. To przykład, nie reguła.

## Where in code

- `src/browser/tokens.css`
- `src/browser/view/controls/`
- `src/browser/kitchen-sink/index.html`
