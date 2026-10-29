# Styleguide guidelines — interfejs gry loop2 w przeglądarce

- **Discipline:** styleguide
- **Applies to:** browser-view

## When to read

Przed zmianą dowolnego pliku części `browser-view`; jej pliki wymienia
`foundations/part_map.md`. Styleguide przyjmuje szablon przypiętego the-way
bez odstępstw zgodnie z D-38.

## Roles

| Role | Kind | Meaning for the user | Text on it | Decision |
|---|---|---|---|---|
| `page` | background | Tu jest gra. | `text` | D-40 |
| `panel` | background | To osobny, wydzielony blok. | `text` | D-40 |
| `highlight` | background | Ten wiersz albo tor jest zaznaczony albo ta kontrolka jest pod kursorem. | `text` | D-40 |
| `divider` | other | Tu kończy się jedna sekcja, a zaczyna następna. | — | D-40 |
| `control-border` | other | To da się kliknąć albo wpisać. | — | D-40 |
| `selected` | other | To jest wybrane w swojej grupie. | — | D-40 |
| `text-strong` | text | Nazwa, nagłówek albo wartość, na którą patrzy się najpierw. | — | D-40 |
| `text` | text | Treść do przeczytania. | — | D-40 |
| `text-secondary` | text | Opis, wyjaśnienie albo dopisek. | — | D-40 |
| `text-label` | text | Nazwa pola albo sekcji, albo data. | — | D-40 |
| `text-disabled` | text | Tego teraz nie da się użyć. | — | D-40 |
| `positive` | text | To działa, jest w porządku albo jest teraz aktywne. | — | D-39 |
| `warning` | text | Uwaga: coś się nie wykona albo nie jest zapisane, także błędny wpis w polu. | — | D-39 |
| `danger` | text | Grozi utrata postaci, postępu albo danych. | — | D-39 |
| `discovery` | text | Odkryto coś nowego. | — | D-39 |
| `player-change` | text | To zrobił gracz. | — | D-39 |
| `character` | other | Tu jest postać i tu właśnie idzie; cel kroku odróżnia kształt — cienka linia przerywana zamiast grubej ciągłej — nigdy kolor. | — | D-41 |
| `tile-hidden` | other | Tego miejsca jeszcze nie znasz. | — | D-41 |
| `tile-revealed` | other | To miejsce znasz; ikony mówią, co tu leży. | — | D-41 |
| `tile-edge` | other | Granica między kafelkami, nieodsłoniętymi i odsłoniętymi. | — | D-41 |
| `link-highlight` | other | Ten kafelek i ten wiersz listy odsłoniętych kafelków to to samo miejsce. | — | D-41 |
| `depleted` | other | Tego, co tu było, już nie ma. | — | D-41 |
| `focus` | other | Tu jesteś, obsługując grę klawiaturą. | — | D-41 |

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
stoi na niej w tabeli Roles: element, któremu styl nadaje tło `page`, `panel`
albo `highlight`, dostaje kolor tekstu `text`, chyba że ma już inną rolę
tekstu. Element albo jego część z inną rolą tekstu zachowuje ją na każdym
z tych trzech teł, bo każda rola rodzaju `text` stoi na wszystkich trzech
(D-39, D-40): przycisk niszczący pod kursorem ma dalej tekst w `danger`,
a przycisk wybrany w grupie — w `text-strong`. Wartości każdej pary trzyma
w kodzie reguła Contrast of every pair. Przegląd zmiany tabeli Roles czyta
każde tło z jego tekstem.

### No value in place of a design token

- **Decision:** D-43 · D-46 · D-48
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
w regule `@media`, geometria rysunku siatki liczona w TypeScripcie, atrybuty
`width` i `height` obrazka, wymiar układu — szerokość albo wysokość z jej
minimum i maksimum, rozmiary kolumn siatki układu — ani treść pliku ikony
w `assets/icons/`. Kolor ikon stoi w samych plikach ikon; gdy zmienia się
wartość `text-strong`, zmień go w nich ręcznie.

Czcionki interfejsu to Geist i Geist Mono z plików produktu (D-46): tekst gry
idzie stosem Geist, kronika i zegar przejścia stosem Geist Mono.

Test niezmiennika przeszukuje tekst plików części. Wartości, której tekst pliku
nie pokazuje — koloru składanego w TypeScripcie z liczb i wpisywanego do stylu —
pilnuje przegląd zmiany (D-43).

### Visible focus

- **Decision:** D-42 · D-47
- **Invariant:** browser-view-focus-outline
- **Good:** Link stopki pokazuje obwódkę w roli `focus`, gdy dojdzie do niego klawiatura.
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
- **Good:** Nowa wartość `text-label` w pliku tokenów ma co najmniej 4,5:1 na `page`, `panel` i `highlight`.
- **Bad:** Jaśniejsza wartość `tile-hidden`, przy której `tile-revealed` ma wobec niej mniej niż 3:1.

Kontrast każdej pary liczy się z wartości pliku tokenów według definicji
współczynnika kontrastu z WCAG 2.2 (D-42):

- każda rola rodzaju `text` poza `text-disabled`, kolory sygnałowe także, ma
  co najmniej 4,5:1 na `page`, `panel` i `highlight`;
- `text-disabled` nie ma progu;
- `control-border` i `focus` mają co najmniej 3:1 na `page`, `panel`
  i `highlight`;
- `character` ma co najmniej 3:1 na `tile-revealed` i na `tile-hidden`;
- `tile-revealed` ma co najmniej 3:1 wobec `tile-hidden`.

Zmieniając wartość w pliku tokenów, sprawdź ją tym testem przed scaleniem.
Nowa rola albo nowa para wymaga zmiany decyzji ról, D-42 i niezmiennika razem
z jego testem.

### States of shared controls

- **Decision:** D-38 · D-44
- **Invariant:** none
- **Good:** Pole liczby z błędnym wpisem pokazuje ramkę i komunikat pod polem w `warning`; przycisk formularza czekającego na serwer jest wyłączony i pokazuje „Logowanie…”, a przycisk „Wyślij ponownie” czekający na serwer — „Wysyłanie…”.
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
  wysyłający formularz zmienia napis na „Logowanie…” albo „Zakładanie
  konta…” zależnie od formularza, a pola tego formularza są wyłączone, więc
  też mają tekst w `text-disabled`; przycisk „Wyślij ponownie” z nagłówka,
  który nie wysyła formularza, zmienia napis na „Wysyłanie…”. Nie ma ruchomego wskaźnika. Odmowa
  serwera i brak połączenia przy formularzu stoją jednym zdaniem pod
  formularzem w `warning` (rola `warning`: coś się nie wykona, D-39). Wyłączony przycisk traci fokus
  klawiatury, więc ekran po odpowiedzi przywraca go na kontrolce, od której
  gracz zaczął.

Pole hasła to pole tekstowe z ukrytym wpisem (przeglądarka maskuje znaki)
i ma te same stany co ono. Pole z widoczną etykietą stawia jej tekst nad polem
w `text-label`. Formularz stawia pod swoim przyciskiem jedno zdanie w `warning`, a przycisk,
który go wysyła, jest przyciskiem zatwierdzającym.

Kontrolki odstępujące od tej listy stanów:

- `src/browser/view/controls/button.ts` — przycisk, przycisk niszczący
  i przycisk wybrany w grupie: error nie dotyczy, bo przycisk nie ma
  niepoprawnej wartości; empty nie dotyczy, bo przycisk nie ma pozycji ani
  wpisu. Przycisk niszczący ma tekst w `danger`; są nim „Zakończ”, „Usuń”
  i „Restart” (D-44). Przycisk wybrany w grupie ma ramkę w `selected` i tekst
  w `text-strong` (D-40). Loading dotyczy tylko zwykłego przycisku, który
  czeka na odpowiedź serwera; przycisk niszczący i przycisk wybrany w grupie
  nie czekają na serwer.
- `src/browser/view/controls/select-list.ts` — lista wyboru: error nie
  dotyczy, bo lista podaje tylko poprawne pozycje; loading nie dotyczy, bo
  żaden formularz czekający na serwer jej nie ma.
- `src/browser/view/controls/number-field.ts` — pole liczby: loading nie
  dotyczy, bo żaden formularz czekający na serwer go nie ma.

Kontrolka, która odstępuje od listy stanów, stoi tu ze swoją ścieżką i powodem;
reguła nie powtarza listy kontrolek, którą trzyma kod. Przegląd porównuje stany
każdej zmienionej kontrolki z tą listą i ze stroną wszystkich stanów.

### A fault of one screen is fixed in its component

- **Decision:** D-38
- **Invariant:** none
- **Good:** Za ciasny wiersz stanu poprawiony w regułach tego wiersza innym stopniem skali odstępów.
- **Bad:** Wartość stopnia skali odstępów zmieniona w pliku tokenów, żeby zmieścił się wiersz stanu.

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

Źródło wartości ustalone z Mariuszem dla loop2 w zadaniu „Styleguide loop2”
(styleguide_loop2.md w vaulcie, Notes/Projects/(P) Loop/_zadania, pytania
Q9–Q11 i Q19):

- dla wartości wziętej z gry loop — działająca gra loop pod
  https://kantarion.bieda.it/, odczytana 2026-10-20 z wyrenderowanej strony,
  z elementem, z którego wartość wzięto;
- dla wartości zmienionej wobec loop — próg kontrastu z D-42, który ją
  wyznaczył;
- dla wartości, których loop nie pokazała — kafelek odsłonięty, podświetlenie
  powiązania, fokus, krycie ikon wyczerpanych — wybór Mariusza z podglądu
  wariantów terenu i fokusu;
- dla skali odstępów, grubości ramek i belek, stosów czcionek, wag czcionek
  i grubości linii siatki — ustalenie zadania;
- dla deskryptorów `@font-face` — wydanie github.com/vercel/geist-font,
  z którego pochodzą pliki czcionek (D-46), z jego tagiem i commitem.

Wartość i jej źródło bierz z tego, co ustalono z człowiekiem, nigdy z pamięci
ani z makiety; nowa albo zmieniona wartość dostaje wpis swojego źródła w tej
samej zmianie. Test sprawdza, że wpis jest, nie czy jest prawdziwy;
prawdziwość ocenia przegląd zmiany pliku tokenów.

### The kitchen-sink page

- **Decision:** D-38 · D-45
- **Invariant:** application-build-kitchen-sink
- **Good:** Strona zbudowana komendą `npm run kitchen-sink` i podawana tylko na komputerze dewelopera.
- **Bad:** Strona rysuje panel terenu ze stanu gry złożonego ręcznie.

Strona wszystkich stanów to `src/browser/kitchen-sink/index.html` — kod
produktu, nie część tekstu styleguide'u. Buduje ją i otwiera lokalnie osobna
komenda `npm run kitchen-sink`; nic, co pisze `npm run build`, a to trafia na
serwer testowy, jej nie zawiera (D-45). Strona pokazuje każdą wspólną kontrolkę
w każdym stanie albo z powodem, dla którego stan nie dotyczy, formularze
logowania i zakładania konta czekające na serwer i ze zdaniem odmowy pod nimi,
wiersz nagłówka z niepotwierdzonym adresem z przyciskiem „Wyślij ponownie”
czekającym na serwer („Wysyłanie…”) i ze zdaniem odmowy obok przycisku
(wszystko z wartościami zmyślonymi, bez stanu gry), każdą rolę
z tabeli Roles i próbki wyglądu kafelków w każdym stanie, narysowane rolami —
nigdy rysunek gry ze stanu gry (D-04, D-45). Nowa wspólna kontrolka, nowy stan
albo nowa rola trafia na stronę w tej samej zmianie.

Źródła strony stoją w `src/browser/kitchen-sink/`. Poza swoim modułem
wejściowym strona importuje tylko moduły, których używa gra; kod potrzebny
tylko jej zostaje w tym module, bo w `src/browser/view/` trafiłby do wyniku
`npm run build`.

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
