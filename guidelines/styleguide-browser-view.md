# Styleguide guidelines — interfejs gry loop2 w przeglądarce

- **Discipline:** styleguide
- **Applies to:** browser-view

## When to read

Przed zmianą dowolnego pliku części `browser-view`; jej pliki wymienia
`foundations/part_map.md`. Styleguide przyjmuje szablon przypiętego the-way
bez odstępstw zgodnie z D-38.

## Roles

| Role              | Kind       | Meaning for the user                                                                                                                                                                                                                                                                                          | Text on it | Decision |
| ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `page`            | background | Tu jest gra.                                                                                                                                                                                                                                                                                                  | `text`     | D-40     |
| `panel`           | background | To osobny, wydzielony blok, także plakietka nad głową postaci i plakietka lecącej ikony zasobu.                                                                                                                                                                                                               | `text`     | D-40     |
| `highlight`       | background | Ten wiersz albo tor, także tor paska nad głową postaci i tor paska wymagania warunku mapy w nagłówku, jest zaznaczony albo ta kontrolka jest pod kursorem.                                                                                                                                                    | `text`     | D-40     |
| `rule-winning`    | background | Ta reguła programu wygrywa teraz.                                                                                                                                                                                                                                                                             | `text`     | D-40     |
| `rule-running`    | background | Czynność tej reguły programu trwa teraz.                                                                                                                                                                                                                                                                      | `text`     | D-40     |
| `divider`         | other      | Tu kończy się jedna sekcja, a zaczyna następna.                                                                                                                                                                                                                                                               | —          | D-40     |
| `control-border`  | other      | To da się kliknąć albo wpisać.                                                                                                                                                                                                                                                                                | —          | D-40     |
| `selected`        | other      | To jest wybrane w swojej grupie.                                                                                                                                                                                                                                                                              | —          | D-40     |
| `condition-unmet` | other      | Warunek tej reguły programu albo grupy reguł nie jest spełniony; jest to pasek stanu, bez progu kontrastu.                                                                                                                                                                                                    | —          | D-40     |
| `text-strong`     | text       | Nazwa, nagłówek albo wartość, na którą patrzy się najpierw; stoi też na ikonie czynności nad głową postaci, na ikonie zasobu lecącej do maga i na ikonach rysunku mapy, choć obok nich nie ma tekstu.                                                                                                         | —          | D-40     |
| `text`            | text       | Treść do przeczytania; stoi też jako wypełnienie paska wymagania warunku mapy w nagłówku, póki wymaganie nie jest spełnione, choć wypełnienie nie jest tekstem.                                                                                                                                               | —          | D-40     |
| `text-secondary`  | text       | Opis, wyjaśnienie albo dopisek, także dopisek pod temperaturą i pod sytością w wierszu ciała, poza „marznie” i „głoduje”.                                                                                                                                                                                     | —          | D-40     |
| `text-label`      | text       | Nazwa pola albo sekcji, albo data.                                                                                                                                                                                                                                                                            | —          | D-40     |
| `text-disabled`   | text       | Tego teraz nie da się użyć.                                                                                                                                                                                                                                                                                   | —          | D-40     |
| `positive`        | text       | To działa, jest w porządku albo jest teraz aktywne; stoi też jako pasek stanu reguły programu, której warunek jest spełniony i która może ruszyć, oraz jako wypełnienie paska postępu nad głową postaci; spełnione wymaganie warunku mapy w nagłówku ma w tej roli nazwę, liczby i wypełnienie swojego paska. | —          | D-39     |
| `warning`         | text       | Uwaga: coś się nie wykona albo nie jest zapisane, także błędny wpis w polu i „żadna reguła nie pasuje — postać stanie” w wierszu „Potem”; stoi też jako pasek stanu reguły programu, której warunek jest spełniony, ale która nie może ruszyć.                                                                | —          | D-39     |
| `danger`          | text       | Grozi utrata postaci, postępu albo danych, także „marznie” i „głoduje” pod temperaturą i pod sytością w wierszu ciała.                                                                                                                                                                                        | —          | D-39     |
| `discovery`       | text       | Odkryto coś nowego.                                                                                                                                                                                                                                                                                           | —          | D-39     |
| `player-change`   | text       | To zrobił gracz.                                                                                                                                                                                                                                                                                              | —          | D-39     |
| `character`       | other      | Tu jest postać i tu właśnie idzie; cel kroku odróżnia kształt — cienka linia przerywana zamiast grubej ciągłej — nigdy kolor.                                                                                                                                                                                 | —          | D-41     |
| `tile-hidden`     | other      | Tego miejsca jeszcze nie znasz.                                                                                                                                                                                                                                                                               | —          | D-41     |
| `tile-revealed`   | other      | To miejsce znasz; ikony mówią, co tu leży.                                                                                                                                                                                                                                                                    | —          | D-41     |
| `tile-edge`       | other      | Granica między kafelkami, nieodsłoniętymi i odsłoniętymi.                                                                                                                                                                                                                                                     | —          | D-41     |
| `link-highlight`  | other      | Ten kafelek i ten wiersz listy odsłoniętych kafelków to to samo miejsce.                                                                                                                                                                                                                                      | —          | D-41     |
| `depleted`        | other      | Tego, co tu było, już nie ma.                                                                                                                                                                                                                                                                                 | —          | D-41     |
| `focus`           | other      | Tu jesteś, obsługując grę klawiaturą.                                                                                                                                                                                                                                                                         | —          | D-41     |

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
na wszystkich pięciu (D-39, D-40): przycisk niszczący pod kursorem ma dalej
tekst w `danger`, a przycisk wybrany w grupie — w `text-strong`. Wartości każdej pary trzyma
w kodzie reguła Contrast of every pair. Przegląd zmiany tabeli Roles czyta
każde tło z jego tekstem. Tor paska postępu nad głową postaci (`highlight`)
nie ma tekstu i kod nie ustawia na nim żadnej roli tekstu. Tor paska wymagania
warunku mapy w nagłówku (`highlight`) też nie ma tekstu: jego wypełnienie
w `text` nie jest tekstem, a nazwa i liczby wymagania stoją obok paska (D-40,
D-133). Ta reguła nie mówi, czy któryś z tych torów potrzebuje roli tekstu.

### No value in place of a design token

- **Decision:** D-43 · D-46 · D-48 · D-349
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
w regule `@media`, geometria rysunku siatki i sceny liczona w TypeScripcie,
klatki i położenia obrazków postaci i zasobów sceny, atrybuty
`width` i `height` obrazka, wymiar układu — szerokość albo wysokość z jej
minimum i maksimum, rozmiary kolumn siatki układu — ani treść pliku ikony
w `assets/icons/`. Ikona z `assets/icons/` jest rysowana jednym sposobem,
maską: obok tekstu bierze kolor tego tekstu, więc szarzeje razem z wyszarzoną
komórką i zmiana `text-strong` dochodzi do niej sama, a tam, gdzie obok niej nie
ma tekstu — nad głową postaci, na plakietce ikony lecącej do maga i na rysunku mapy — stoi w `text-strong` (D-43).

Czcionki interfejsu to Geist i Geist Mono z plików produktu (D-46): tekst gry
idzie stosem Geist, kronika i zegar przejścia stosem Geist Mono.

Test niezmiennika przeszukuje tekst plików części. Wartości, której tekst pliku
nie pokazuje — koloru składanego w TypeScripcie z liczb i wpisywanego do stylu —
pilnuje przegląd zmiany (D-43).

Wyjątki ze sceny przepuszcza test `browser-view-token-values`, bo żaden z nich
nie jest kolorem, nazwą czcionki ani wartością w `px`, `rem` lub `em` spoza
wymiarów układu, a to test czyta: geometria i położenia obrazków stoją w TypeScripcie
(`src/browser/view/scene.tsx`, `src/browser/view/scene-picture.ts`) jako procenty
kadru; rozmiar ikony w plakietce jest wymiarem układu, który stoi w `src/browser/styles.css`,
przy jednym rozmiarze sceny (D-349). Ten przewodnik nie wymienia w liście wartości dwóch rzeczy, które scena
ma w tym samym pliku stylów: czasów ruchu sceny (klatek, dojścia maga, paska, lotu ikony, kurzu i powrotu odcienia) oraz dwóch
filtrów szarości, pauzy i martwego maga z wygasłym ogniskiem. Ich wartości stoją w regułach
sceny w `src/browser/styles.css`, a źródła w komentarzach przy tych regułach; geometria szronu stoi w
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
2.4.7 Focus Visible, jedno z trzech, które interfejs przyjmuje (D-42).

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
- `text-disabled` nie ma progu;
- `control-border` i `focus` mają co najmniej 3:1 na tych samych pięciu
  tłach;
- `condition-unmet`, pasek reguły, której warunek nie jest spełniony, nie ma
  progu, a pasek w `positive` i w `warning` nie dokłada pary, bo te role
  mają już próg 4,5:1 na pięciu tłach;
- `character` ma co najmniej 3:1 na `tile-revealed` i na `tile-hidden`;
- `tile-revealed` ma co najmniej 3:1 wobec `tile-hidden`.

Zmieniając wartość w pliku tokenów, sprawdź ją tym testem przed scaleniem.
Nowa rola albo nowa para wymaga zmiany decyzji ról, D-42 i niezmiennika razem
z jego testem.

### States of shared controls

- **Decision:** D-38 · D-44 · D-173 · D-97 · D-222 · D-274 · D-275 · D-276 · D-279 · D-285 · D-288 · D-289 · D-291 · D-39 · D-40 · D-43 · D-47
- **Invariant:** none
- **Good:** Pole liczby z błędnym wpisem pokazuje ramkę i komunikat pod polem w `warning`; główny przycisk formularza czekającego na serwer jest wyłączony i pokazuje „Logowanie…”, a przycisk „Wyślij ponownie” czekający na serwer — „Wysyłanie…”; zdanie po prośbie o odnośnik stoi pod formularzem w `text` z belką po lewej w kolorze tego zdania.
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
  „Wylogowywanie…” (D-97); menu stoi wtedy otwarte (D-285). Nie ma ruchomego wskaźnika. Odmowa
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
w `text-label`. Formularz stawia pod swoim przyciskiem jedno zdanie w `warning` (formularz „Nie pamiętam hasła” po prośbie — zdanie w `text` z belką), a przycisk,
który go wysyła, jest przyciskiem zatwierdzającym i ma główny wygląd (D-274).

Każda wspólna kontrolka ma postać DOM i postać React, która rysuje ten sam
element z tymi samymi klasami, więc odstępstwo od listy stanów dotyczy obu
postaci. Pole tekstowe i pole hasła, w React
`src/browser/view/controls/react-text-field.tsx`, od listy nie odstępują.

Kontrolki odstępujące od tej listy stanów, każda w obu postaciach:

- `src/browser/view/controls/button.ts` i `src/browser/view/controls/react-button.tsx`
  — przycisk, przycisk niszczący
  i przycisk wybrany w grupie: error nie dotyczy, bo przycisk nie ma
  niepoprawnej wartości; empty nie dotyczy, bo przycisk nie ma pozycji ani
  wpisu. Przycisk niszczący w spoczynku jest neutralny, z tekstem w `text`,
  a pod kursorem i przy fokusie ma tekst w `danger` (D-44, D-39), w obu
  postaciach przycisku; są nim „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”,
  „Przełącz postać na ten program” i „Zatrzymaj” (D-44) oraz „Odrzuć” pytania
  „Zapisać, odrzucić, wrócić?” (D-173, D-44). Przycisk wybrany w grupie ma ramkę w `selected` i tekst
  w `text-strong` (D-40); ten wygląd zachowują przyciski tempa (D-276).
  Loading dotyczy tylko zwykłego przycisku, który czeka na odpowiedź
  serwera, także w głównym wyglądzie; przycisk niszczący i przycisk wybrany
  w grupie nie czekają na serwer. Główny wygląd ma przycisk, który wysyła
  formularz, i „Wejdź” przy każdej postaci w sekcji „Kto idzie” karty mapy
  (D-274; reguła Main button, secondary action and tab): tekst w `text-strong`
  o wadze `--font-weight-emphasis` i ramka w kolorze tego tekstu
  (`currentColor`), bez wypełnienia, więc widać tło pod nim; pod kursorem tło
  `highlight`, ramka i tekst bez zmiany; czekając na serwer albo wyłączony
  (także „Wejdź” przy przejściu ręcznym, które czeka albo się skończyło, D-287)
  wygląda jak każdy wyłączony przycisk — tekst w `text-disabled` o wadze
  `--font-weight-body`, ramka w `control-border`.
- `src/browser/view/controls/button.ts` i `src/browser/view/controls/react-button.tsx`
  — akcja poboczna (D-275): error
  i empty nie dotyczą, jak przycisku; loading nie dotyczy, bo na serwer czeka
  tylko przycisk, który wysyła formularz, a akcja poboczna jest wtedy
  wyłączona. Spoczynek: podkreślony tekst w `text-secondary`, bez ramki i bez
  odstępów po bokach, więc zaczyna się równo z polami; pod kursorem tekst
  w `text`, a tło zostaje bez zmiany, bez `highlight`; wyłączona — tekst
  w `text-disabled`.
- `src/browser/view/controls/button.ts` i `src/browser/view/controls/react-button.tsx`
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
- `src/browser/view/controls/select-list.ts` i `src/browser/view/controls/react-select-list.tsx`
  — lista wyboru: error nie
  dotyczy, bo lista podaje tylko poprawne pozycje; loading nie dotyczy, bo
  żaden formularz czekający na serwer jej nie ma.
- `src/browser/view/controls/number-field.ts` i `src/browser/view/controls/react-number-field.tsx`
  — pole liczby: loading nie
  dotyczy, bo żaden formularz czekający na serwer go nie ma.
- `src/browser/view/controls/pick-cell.ts` i `src/browser/view/controls/react-pick-cell.tsx`
  — komórka wyboru, czyli jedna
  pozycja wyboru w panelu reguły (D-288, D-44): default — ramka w
  `control-border`, tekst w `text`; hover — tło `highlight`; visible focus —
  obwódka z reguły Visible focus (D-47); wybrana wygląda jak przycisk wybrany
  w grupie, z ramką w `selected` i tekstem w `text-strong` (D-40);
  wyszarzona (stan disabled) ma ramkę przerywaną — słowo kluczowe `dashed`,
  bez nowej wartości — nazwę w `text-disabled` i powód w `text-secondary`
  (D-289); klawiatura dochodzi do wyszarzonej komórki, żeby przeczytać jej
  powód, a wybór jej niczego nie robi. Error nie dotyczy, bo komórka nie ma
  wpisu, który mógłby być błędny; empty nie dotyczy, bo komórka jest jedną
  pozycją, nie listą; loading nie dotyczy, bo żaden formularz czekający na
  serwer jej nie ma. Ikona czynności w komórce jest rysowana maską w kolorze
  tekstu obok (D-291, D-43), więc szarzeje razem z wyszarzoną komórką.

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

Źródło wartości ustalone z Mariuszem dla loop2, z jednym rodzajem dołożonym
później:

- dla wartości wziętej z gry loop — działająca gra loop pod
  https://kantarion.bieda.it/, odczytana 2026-10-20 z wyrenderowanej strony,
  z elementem, z którego wartość wzięto;
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
- dla skali odstępów, grubości ramek i belek, stosów czcionek, wag czcionek
  i grubości linii siatki — wybór Mariusza z 2026-10-20;
- dla deskryptorów `@font-face` — wydanie github.com/vercel/geist-font,
  z którego pochodzą pliki czcionek (D-46), z jego tagiem i commitem.

Wartość i jej źródło bierz z tego, co ustalono z człowiekiem, nigdy z pamięci
ani z makiety; nowa albo zmieniona wartość dostaje wpis swojego źródła w tej
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
w jej postaci DOM (D-269), w każdym stanie albo z powodem, dla którego stan
nie dotyczy — przycisk także w głównym wyglądzie (D-274) i jako zakładkę
wybraną i niewybraną (D-276), przycisk niszczący w spoczynku, pod kursorem
i przy fokusie (D-44) — formularze
logowania i zakładania konta, „Nie pamiętam hasła” i „Ustaw nowe hasło”
czekające na serwer i ze zdaniem odmowy pod nimi oraz formularz „Nie pamiętam
hasła” ze zdaniem odpowiedzi na prośbę w `text` z belką (D-44),
część menu „Konto” dla niepotwierdzonego adresu (D-157) z przyciskiem „Wyślij
ponownie” czekającym na serwer („Wysyłanie…”) i ze zdaniem odmowy obok
przycisku, zbudowaną na stronie z postaci DOM wspólnych kontrolek (D-269)
(wszystko z wartościami zmyślonymi, bez stanu gry), każdą rolę
z tabeli Roles i próbki wyglądu kafelków w każdym stanie, narysowane rolami —
nigdy rysunek gry ze stanu gry (D-04, D-45). Nowa wspólna kontrolka, nowy stan
albo nowa rola trafia na stronę w tej samej zmianie.

Źródła strony stoją w `src/browser/kitchen-sink/`. Poza swoim modułem
wejściowym strona importuje tylko moduły, których używa gra; kod potrzebny
tylko jej zostaje w tym module, bo w `src/browser/view/` trafiłby do wyniku
`npm run build`.

### Main button, secondary action and tab

- **Decision:** D-274 · D-275 · D-276 · D-277 · D-287 · D-311
- **Invariant:** none
- **Good:** „Wróć do logowania” pod formularzem „Nie pamiętam hasła” zrobione wspólną akcją poboczną, a „Wyloguj” w menu „Konto” — zwykłym wspólnym przyciskiem; „Wejdź” przy postaci w „Kto idzie” w głównym wyglądzie, a „Puść w pętlę” obok — zwykłym.
- **Bad:** „Usuń” reguły programu narysowane jako podkreślony tekst albo formularz z dwoma przyciskami w głównym wyglądzie.

Główny wygląd, akcja poboczna i zakładka to wyglądy wspólnego przycisku,
każdy na swoim miejscu, które podaje ta reguła; ich stany podaje reguła
States of shared controls.

- Główny wygląd ma przycisk, który wysyła formularz, jeden na
  formularz (D-274). Wygląd bierze się z samego wysyłania formularza
  (`createButton(text, { submit: true })`, w React `<ReactButton submit>`),
  więc ekran nie daje mu rodzaju ani klasy. „Wejdź” przy każdej postaci
  w sekcji „Kto idzie” karty mapy ma ten sam główny wygląd, choć formularza
  nie wysyła (D-274): ekran daje mu rodzaj `main` wspólnego przycisku
  (`createButton(text, { kind: "main" })`, w React `<ReactButton kind="main">`,
  klasa `main`). Wyłączony „Wejdź” (D-287) traci główny wygląd i wygląda jak
  każdy wyłączony przycisk (reguła States of shared controls), a „Puść w
  pętlę” obok zostaje zwykłym przyciskiem. Działanie poza formularzem i poza
  „Wejdź” zostaje przy przycisku, który daje mu D-44.
- Akcją poboczną (`kind: "secondary"`) jest tylko działanie, które otwiera
  albo opuszcza stan formularza i stoi pod tym formularzem — dziś „Nie
  pamiętam hasła”, „Wróć do logowania” i „Anuluj” karty logowania (D-275).
  Zostaje przyciskiem, bo zmienia stan ekranu i nie ma adresu, nigdy
  odnośnikiem. Każde inne działanie, choćby poboczne, zostaje przy
  przycisku, który daje mu D-44.
- Zakładka (`kind: "tab"`) to przycisk wybrany w grupie narysowany bez
  ramki — dziś przełącznik „Zaloguj się” i „Załóż konto” karty logowania
  (D-276) oraz dwa przyciski „Kronika” i „Teren” nad treścią obszaru pod światem
  na ekranie przejścia; otwarty panel reguły ich nie zastępuje (D-311). „Zakładka”
  znaczy w wytycznych wygląd: element, atrybut
  `aria-pressed` i klawiatura zostają jak przy przycisku wybranym w grupie —
  Tab przechodzi przez każdą, Enter albo Spacja przełącza — bez strzałek
  i bez ról zakładek (`role="tab"`). Grupa zaznacza wybraną zakładkę jak
  wybrany przycisk (`setButtonSelected`, w React `selected`), a kontener
  zakładek dostaje klasę `tabs`. Przyciski tempa (D-130) zostają przy
  wyglądzie przycisku wybranego w grupie.
- Pasek menu znaczy pozycję, na której jest gracz, tak jak wybraną zakładkę:
  tekst w `text-strong` i ta sama linia w `selected` u dołu (D-277) — nigdy
  zielenią, tłem ani ramką. Wygląd pozycji paska, menu „Konto” i pozycji
  listy programów podaje reguła Menu bar, the menu „Konto” and the list of
  programs.

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
wybranej pozycji listy programów — zostaje w `selected`. Pasek stanu reguły
programu i grupy reguł (reguła Program editor) nie jest taką ramką ani belką:
mówi o stanie reguły i nie bierze koloru tekstu obok (D-39). Przegląd zmiany
czyta kolor każdej takiej ramki i belki wobec tekstu, przy którym stoi.

### Menu bar, the menu „Konto” and the list of programs

- **Decision:** D-280 · D-330 · D-331 · D-281 · D-277 · D-276 · D-275 · D-285 · D-157 · D-97 · D-208 · D-262 · D-44 · D-40 · D-39 · D-43 · D-47
- **Invariant:** none
- **Good:** Pozycja „Programy” na ekranie Programy w `text-strong` z linią w `selected` u dołu, a „Wyloguj” w menu „Konto”, które po odpowiedzi serwera stoi otwarte ze zdaniem wyniku.
- **Bad:** Pozycja paska z ikoną, zaznaczona zielenią albo tłem; „Wróć do przejścia” zaznaczone na ekranie przejścia; menu „Konto” zamykające się samo po odpowiedzi serwera.

Pasek menu stoi u góry każdego ekranu zalogowanego gracza. Treść pod nim ma
najwyżej 1344 px szerokości, a w węższym oknie całą szerokość okna (D-280);
szerokość z maksimum jest wymiarem układu, nie wartością wpisaną zamiast tokenu
(D-43).

Pasek:

- po lewej stoi nazwa gry w `text-strong` (rola nazwy, D-40); na ekranach
  oczekiwania (D-262) stoi sama, bez pozycji i bez menu „Konto” (D-280);
- pozycje to „Siedziba”, „Mapy”, „Programy” i, poza ekranem przejścia, „Wróć do
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
  adresem znaczy Mapy, a na ekranie przejścia nie znaczy żadnej pozycji (D-280);
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
- zdanie o wyniku wysyłania stoi w tym miejscu, w kolorach z D-157 (w
  `text-secondary` po wysłaniu, w `warning` przy odmowie i przy błędzie),
  w zamkniętym menu bez znaku na pasku (D-157);
- „Wyloguj” i „Wyślij ponownie” czekają na serwer jak każdy wspólny przycisk
  (reguła States of shared controls);
- menu otwiera się kliknięciem „Konto” i klawiaturą — Enter na „Konto” — a
  zamyka klawiszem Escape, kliknięciem obok i drugim kliknięciem „Konto”,
  fokus wraca wtedy na „Konto”; menu zostaje otwarte, gdy „Wyloguj” albo
  „Wyślij ponownie” czeka na serwer, i po odpowiedzi stoi otwarte, aż gracz je
  zamknie (D-285).

Lista programów na ekranie Programy: pozycja jest odnośnikiem do programu
(D-281); wybrana ma tekst w `text-strong` i belkę w `selected` o grubości
`--bar-width` po lewej, każda inna — tekst w `text`; pod kursorem tło
`highlight` (D-40, D-331). Przegląd zmiany czyta pozycje paska, menu i listy
wobec tej reguły i wobec strony wszystkich stanów.

### The screen Mapy

- **Decision:** D-325 · D-326 · D-327 · D-328 · D-329 · D-331 · D-134 · D-188 · D-217 · D-244 · D-251 · D-274 · D-287 · D-39 · D-40
- **Invariant:** none
- **Good:** Wiersz „Las” na liście z „rozwiązana” w `positive` po nazwie; wybrany wiersz z tekstem w `text-strong` i belką w `selected` po lewej; przed wyborem po prawej „Wybierz mapę z listy.” w `text-secondary`.
- **Bad:** Prawa część przed wyborem pusta; pułap „wnosisz najwyżej {n}” w `text`, a nie w `warning`; sekcja „Kto idzie” bez nagłówka; „Wejdź” w zwykłym wyglądzie obok „Puść w pętlę” w tym samym wyglądzie.

Ekran Mapy (`#/mapy` i `#/mapy/{map}`, D-325, D-331) ma dwa obszary: po lewej
listę otwartych map, po prawej kartę wybranej mapy.

- Lista: każdy wiersz to odnośnik do `#/mapy/{map}` z nazwą mapy w `text`; przy
  mapie rozwiązanej po nazwie stoi „rozwiązana” w `positive` (D-134). Wybrany
  wiersz ma tekst w `text-strong` i belkę w `selected` o grubości `--bar-width`
  po lewej, jak wybrany program na liście programów (D-331, D-40); niewybrany
  wygląda jak niewybrany program na tej liście; pod kursorem tło `highlight`.
  Przed wyborem mapy, pod `#/mapy`, po prawej stoi „Wybierz mapę z listy.” w
  `text-secondary` (D-331).
- Karta mapy (D-327): nagłówek z nazwą mapy w `text-strong`, a przy mapie
  rozwiązanej obok „rozwiązana” w `positive`; przy mapie otwieranej przez inną
  mapę „odsłania ją {mapa}” w `text-secondary`. Nazwy części — „Żąda”, „Teren”,
  „Leży tu”, „Czyha”, „Odbiera” — stoją w `text-label` (nazwy sekcji, D-40);
  ich treść w `text`; dopisek przy kroku innym niż zwykły, „— drożej niż
  zwykle” albo „— taniej niż zwykle”, w `text-secondary`; „nie odnawia się” w
  `warning`; „wnosisz najwyżej {n}” i „wynosisz najwyżej {n}” w `warning`.
  Części, której mapa nie ma, nie rysuje się wcale.
- Sekcja „Kto idzie” pod kartą (D-329): nagłówek w `text-label`. Przy
  każdej postaci, z góry: imię jako odnośnik do jej ekranu Postać w
  `text-strong`; wiersz wskrzeszenia w `text-secondary`, a gdy wskrzeszenie
  nie jest gotowe, w `danger` (D-217); przy postaci w pętli zarobkowej wiersz
  pętli w `text` z „Zatrzymaj” (D-244); „Program:” w `text-label` z listą
  programów; „Wejdzie: …” i „Wejdzie: nic” w `text-secondary`; ostrzeżenie
  o przyciętym planie w `warning` (D-188); „Wejdź” w głównym wyglądzie (D-274);
  pod nim „Próba weźmie zapas, …” w `warning` (D-251); „Puść w pętlę” zwykłym
  przyciskiem, a obok „Pętla nic nie zarobi do skrzynki” w `warning`, gdy
  lista „Wynieś” jest pusta (D-326); zdanie o przejściu ręcznym, które czeka
  albo się skończyło, pod wyłączonymi przyciskami każdej postaci, w
  `text-secondary` (D-287).
- Drużyna bez postaci: „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”
  w `text-secondary`.

### Program editor

- **Decision:** D-288 · D-289 · D-291 · D-292 · D-293 · D-93 · D-279 · D-39 · D-40 · D-43 · D-308 · D-309 · D-310
- **Invariant:** none
- **Good:** Wiersz reguły z warunkiem w `text-secondary`, czynnością w `text-strong` i licznikiem „Wykonano 3×” w `text-label`; linia upuszczenia w kolorze napisu „tu wyląduje”; wiersz reguły, która wygrywa teraz, na `rule-winning` z paskiem w `positive` po lewej, a reguła, która nie może ruszyć, z paskiem w `warning` i powodem „tu nie leży mech” w `warning`.
- **Bad:** Czynność w wierszu w `text-secondary`, nowa barwa dla wiersza pod kursorem albo linia upuszczenia w `selected` obok napisu w `text-strong`; `highlight` pod kursorem na wierszu reguły, która wygrywa teraz; pasek stanu w kolorze tekstu obok; znaki stanu przy programie zapisanym.

Edytor programu stoi na ekranie Programy i na ekranie przejścia (D-288).
Wygląd jego części bierze się z ról tabeli Roles i z wartości pliku tokenów;
znaki stanu (D-308) mają własne role tła, `rule-winning` i `rule-running`,
oraz pasek stanu o grubości `--bar-width`, opisane niżej.

- Wiersz reguły: warunek w `text-secondary`, czynność w `text-strong`, numer
  (D-292), czas wykonania (D-293) i licznik „Wykonano {n}×” (D-93) w
  `text-label`; ikona czynności stoi przy czynności i jest rysowana maską w
  kolorze tekstu obok (D-291, D-43). Wiersz otwarty stoi na tle `highlight`,
  a wiersz pod kursorem też, o ile nie ma tła stanu, z tekstem w ich własnych
  rolach (reguła Every background with its text).
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
  liczba reguł i suma „Wykonano” w `text-label`.
- Panel reguły stoi na tle `panel` z ramką w `divider`; podpisy jego pól są
  w `text-label`. Komórki jego wyboru podaje reguła States of shared controls.
- Linia upuszczenia — linia, która pokazuje, gdzie wyląduje przeciągana reguła
  albo grupa reguł — ma napis „tu wyląduje” w `text-strong`, a sama linia bierze
  kolor tego napisu (D-279, reguła A line at a text takes the colour of that
  text).

Przegląd zmiany edytora czyta role każdej jego części wobec tej reguły.

### The scene of a map run

- **Decision:** D-271 · D-272 · D-291 · D-315 · D-316 · D-317 · D-319 · D-320 · D-321 · D-322 · D-349 · D-364 · D-365 · D-366 · D-367 · D-372 · D-373 · D-132 · D-39 · D-40 · D-43
- **Invariant:** none
- **Good:** Plakietka nad głową maga na `panel` z ikoną czynności w `text-strong`, bez tekstu obok, i pod nią paskiem postępu: wypełnienie w `positive` na torze w `highlight`; pauza szarzy całą scenę, a jej ruch stoi.
- **Bad:** Pasek postępu nad głową maga w `warning` albo w `text-strong`; ikona czynności narysowana wprost na drzewach; tekst, przycisk albo reakcja na kliknięcie na scenie; błysk, który rozjaśnia albo przyciemnia całą scenę na chwilę; plakietka nad głową pod warstwą odcienia; szron pod nią; las w pełnym złocie przy passie wymaganej, a nie dopiero po rozwiązaniu.

Scena przebiegu mapy to obraz lasu z rekwizytami, ogniskiem i magiem. Stoi
w `src/browser/view/scene.tsx` i `src/browser/view/scene-picture.ts`, a jej
ruch i szarości w `src/browser/styles.css`; nazwy plików obrazków postaci
i zasobów leżą w danych gry, w `src/browser/sim/data/scene.ts`, nie w kodzie
widoku (D-316).
Scena jest obrazem: nie ma na niej tekstu ani przycisku, kod nie daje jej
reakcji na kliknięcie, a cały jej obszar nie błyska (D-272, D-321, D-317).

Plakietka stoi nad głową maga na tle `panel` (D-320). Niesie ikonę bieżącej
czynności, tę samą co przy regule w wierszu edytora (D-291), w `text-strong`,
choć obok niej nie ma tekstu (D-40, D-43). Pod ikoną stoi pasek postępu tej
czynności: wypełnienie w `positive` na torze w `highlight`, z co najmniej 3:1
wobec tła, na którym stoi (D-39, D-40). Pasek ma grubość `--bar-width` podwojoną,
`calc(var(--bar-width) * 2)`; cała scena jest rysowana w dwukrotności swojego obrazu (D-349).
Plakietki nie ma przy czekaniu, w walce,
po śmierci i po rozwiązaniu mapy (D-320, D-322).

Światło sceny ma odcień (D-315, D-316): warstwa `scene-tint` leży nad wszystkim, co scena rysuje —
lasem, rekwizytami, ogniskiem płonącym i wygasłym, magiem, wilkiem, kurzem i lecącą ikoną na jej
plakietce — i pod szronem oraz plakietką nad głową maga, które zostają na własnych kolorach (D-320).
Plakietka lecącej ikony (D-365) leży więc pod odcieniem i przyjmuje jego barwę, a ikona na niej zostaje
jasna na ciemnej plakietce. Elementy leżą w tej kolejności od dołu: las, rekwizyty, ognisko, kurz, mag,
lot ikony, odcień, szron, plakietka nad głową. Plakietka nad głową nie siedzi więc w elemencie maga,
który leży pod odcieniem: jej nośnik to osobny element o tym samym polu i tym samym chodzie co mag.
Warstwa miesza się ze sceną trybem `mix-blend-mode: color`, więc przenosi na scenę barwę i nasycenie,
a jasność obrazu zostawia; jej kolor to mieszanka chłodnego i ciepłego odcienia w `oklch` w proporcji
`t`, a jej krycie idzie liniowo z `t` od krycia chłodnego odcienia do krycia ciepłego. Oba odcienie
i oba krycia to tokeny `--scene-tint-*`, a `t` (`--tint`, od 0 do 1) przychodzi z TypeScriptu jako liczba
w stylu warstwy: żaden kolor nie jest składany z liczb w kodzie (D-43). Jak `t` idzie za passą, kiedy
stoi w pełnym złocie i jak wraca po utracie passy, mówi D-316; długość powrotu stoi w regule powrotu
w `src/browser/styles.css`. Utrata passy w toku przejścia daje warstwie nowy element, który startuje od
odcienia, jaki stał, a animacja CSS prowadzi `--tint` do nowej wartości; pod ustawieniem ograniczenia
ruchu odcień pokazuje od razu swój koniec. W pauzie gracza i przy odkryciu odcień stoi, a powrót po
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
ogniu ją cofa; przychodzi też wielkość jednego piksela obrazu sceny jako część szerokości i część
wysokości kadru. CSS buduje szron z kwadratów jednego piksela obrazu sceny na jego siatce (D-271),
z masek na czterech elementach: kolor obrysu, kolor wypełnienia i kolory kryształków to tokeny
`--scene-frost-*`. Kształt postrzępionego brzegu stoi w regułach szronu w `src/browser/styles.css`:
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
w `src/browser/styles.css`. Zmiana celu w drodze skręca maga z miejsca, w którym jest.
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
którym stoi (D-366, D-271). Lot i kurz biegną w CSS z `src/browser/styles.css`, każdy 300 ms, kurz
raz przez wszystkie swoje klatki; scena pamięta poprzedni odczyt stanu gry i zdarzenia wywołania,
żeby rozpoznać koniec zbierania i trafienie albo chybienie, i nie zaczyna efektu zaległego: tego, którego
kolej przychodzi przy zatrzymaniu, tego z odczytu, który niesie kilka końców zbierania, i tego z odczytu,
w którym skończyła się też czynność biorąca sztuki z plecaka. Efekt zaczęty stawia przy miejscu, w którym
mag stoi albo do którego idzie w poprzednim odczycie; kończy się i stoi razem ze sceną przy zatrzymaniu,
a nowy zajmuje jego miejsce (D-367).

Przy zatrzymaniu — pauzie, odkryciu, śmierci i ukończeniu — cały ruch sceny,
także ogień, mag, lot ikony, kurz i powrót odcienia, stoi (D-322). Pod systemowym ustawieniem ograniczenia ruchu
klatki nie chodzą, mag staje na miejscu od razu, a pasek skacze przy odczytach
(D-317, D-319, D-320); mag, który zbiera, stoi w jednej klatce schylenia, a ikona i kurz
pojawiają się nieruchomo na swoim miejscu, ikona tam, gdzie ląduje, najwyżej na 300 ms, i znikają
(D-317).

Szarości mają wartości z kodu, nie z tokenu. Pauza szarzy całą scenę filtrem
`grayscale(1) brightness(0.5)` (D-322). Martwy mag i wygasłe ognisko mają jedną
wspólną szarość, `grayscale(1) brightness(0.55)` (D-316, D-322); obie wartości
stoją w regułach sceny w `src/browser/styles.css`, a źródła w ich komentarzach. Przy
zatrzymaniu na odkryciu scena zostaje kolorowa, a po ukończeniu mag stoi
w kolorze; po śmierci mag jest szary (D-322). Wygasłe ognisko to ten sam obrazek
bez koloru i bez ruchu, a stoi tylko wtedy, gdy stoi na kafelku postaci (D-316).
Lista wartości tego przewodnika ich nie nazywa (zob. „No value in place of a
design token”).

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
w pliku tokenów, a kod kroniki w `src/browser/view/right-area.tsx`.

### The end-of-run window

- **Decision:** D-368 · D-311 · D-173 · D-132 · D-122 · D-313 · D-185 · D-216 · D-188 · D-208 · D-323 · D-44 · D-45 · D-275 · D-276 · D-285 · D-39 · D-40 · D-43 · D-46 · D-47 · D-279
- **Invariant:** none
- **Good:** Okno po śmierci z tytułem „Mag zamarzł” w `text-strong` na `panel`, nad nim pasek menu i wiersz ostrzeżeń, pod nim przyciski „Restart”, „Zakończ” i „Otwarte: …” stojące w polu widzenia, gdy sekcje się przewijają; Escape zamyka okno, a nagłówek ekranu ma wtedy „Koniec przejścia”.
- **Bad:** Okno przykrywające pasek menu; okno z zasłoną za sobą; przycisk zrobiony w oknie osobnym `<button>` albo z czcionką Geist Mono; pasek czasu w roli, której nie ma w tabeli Roles; Escape czytany na dokumencie.

Okno końca przejścia, `src/browser/view/end-window.tsx`, jest pierwszym oknem
nad ekranem gry. Otwiera się samo, gdy przejście ręczne kończy się śmiercią
postaci albo ukończeniem mapy, i otwiera się znowu przy każdym wejściu na ekran
zakończonego przejścia (D-368). Jego treść i kolejność podaje D-368, jego
teksty — `src/browser/view/end-window-lines.ts`; ta reguła podaje, jak okno
wygląda, jak przykrywa ekran, jak się zamyka i jak bierze fokus. Reguły okna
stoją w `src/browser/styles.css` pod klasami `end-window`.

Jak przykrywa ekran:

- Póki okno stoi, ekran przejścia — jego nagłówek i trzy obszary pod nim — nie
  jest pokazany: elementy mają atrybut `hidden` i zostają w drzewie. Pasek menu
  z wierszem ostrzeżeń pod nim stoi nad oknem i działa, więc nieudany zapis
  (D-208) i awaria gry (D-323) są widoczne, a kliknięcie w pasek opuszcza
  ekran przejścia (D-311, D-368). Okno nie przykrywa paska menu.
- Okno nie ma zasłony ani tła za sobą. Stoi na tle `panel` z tekstem w `text` i ramką w `divider`
  (D-40), w kolumnie treści ekranu, o takiej wysokości, że pod nim zostaje
  miejsce na pasek menu i wiersz ostrzeżeń.
- Najwyższą wysokość okna zadaje `max-height` w jednostce `vh`: wymiar układu,
  którego D-43 nie liczy jako wartości wpisanej zamiast tokenu. Jej wartość
  stoi w regule `end-window` w `src/browser/styles.css`. Wyższa treść przewija
  się w oknie, nie wypycha go.
- Przewija się tylko część środkowa: nagłówek okna — napis „Koniec przejścia”,
  tytuł i „✕” — oraz rząd przycisków u dołu stoją w miejscu i są stale w polu
  widzenia (D-368).

Jak się zamyka i otwiera:

- „✕” i Escape zamykają okno i odsłaniają ekran; fokus idzie wtedy na
  „Koniec przejścia” w nagłówku ekranu. Escape czyta korzeń okna, nigdy
  dokument (D-285).
- „Koniec przejścia” w nagłówku ekranu otwiera okno znowu. Stoi przed „Restart”,
  póki okno jest zamknięte po końcu przejścia; gdy okno stoi, nagłówek jest
  ukryty razem z ekranem (D-311, D-368).
- „Restart” zaczyna przejście od nowa, „Zakończ” i „Otwarte: {mapa} →” kończą
  je i opuszczają ekran. Gdy kopia ma niezapisane zmiany, te dwa przyciski
  zamiast tego zamykają okno i stawiają pytanie „Zapisać, odrzucić, wrócić?”
  w panelu kopii; okno nie stoi, póki pytanie stoi, i po „Wróć” zostaje
  zamknięte, aż gracz otworzy je przyciskiem „Koniec przejścia” (D-173).
- „Dodaj regułę z tym” zamyka okno i otwiera panel reguły pod wierszem reguły
  (D-313).

Jak role, czcionka i wspólne kontrolki składają okno; żadna część nie dostaje
nowej roli ani wartości:

- Tytuł jest w `text-strong`, a po ukończeniu mapy w `positive` (D-132, D-39);
  napis „Koniec przejścia” nad nim i nazwy sekcji są w `text-label`, sekcje
  oddziela linia w `divider`. Treść sekcji jest w `text`, numer reguły w „Nie
  zadziałały ani razu” w `text-label`.
- Wiersz tego, co koniec dał albo kosztował, jest w `text-secondary`, a w
  `danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216). Odkrycie stoi w
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
  jest jego udziałem w minutach, a obok stoi legenda z nazwą i procentem, procent
  w `text-label`. Jego wysokość to stopień skali odstępów, `--space-s`, nie `--bar-width`.
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

- kawałki paska czasu odróżnia tylko ich kolejność, odstęp i długość, bo plik
  tokenów nie ma serii wypełnień; nowa wartość wchodzi ze źródłem ustalonym
  z człowiekiem (reguła Every value with its source);
- czy D-40 ma nazwać wypełnienie paska czasu w `text`, jak nazywa wypełnienie
  paska wymagania w nagłówku, i czy pasek ma mieć nazwaną grubość zamiast
  stopnia skali odstępów;
- użycia ról, które mieszczą się w słowach D-40, ale nie zostały zatwierdzone
  dla tych miejsc: tor paska czasu w `highlight` i ramka okna w `divider`.

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
