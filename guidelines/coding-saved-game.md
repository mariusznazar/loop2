# Coding guidelines — saved-game

- **Discipline:** coding
- **Applies to:** simulation

## When to read

Przed dodaniem lub zmianą pliku w `src/browser/sim/`, który zamienia stan gry
na dokument zapisu albo dokument pobrany z serwera lub zachowany w pamięci
strony po zapisie, który nie zastał sesji, na stan gry lub odmowę.
Taki plik czytaj według tych wytycznych zamiast `guidelines/coding-simulation-module.md`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/sim/saved-game.ts` | exemplar | D-213 |

## Rules

### Izolacja symulacji

- **Decision:** D-04 · D-213
- **Invariant:** simulation-isolation
- **Good:** Wczytanie dostaje dokument jako argument i oddaje wynik, nie sięgając poza symulację.
- **Bad:** Wczytanie odczytuje czas systemowy albo importuje plik widoku.

Importuj wyłącznie pliki symulacji. Korzystaj z obiektów języka JavaScript,
bez strony, timerów, czasu systemowego i obiektów środowiska uruchomienia.
Wczytanie nie przyjmuje czasu, który minął od zapisu: żaden czas rzeczywisty
ani czas nieobecności nie wchodzi do wczytanego stanu gry.

```good simulation-isolation src/browser/sim/guideline-saved-time.ts
export function loadedMinute(document: { minute: number }): number {
  return document.minute;
}
```

```bad simulation-isolation src/browser/sim/guideline-saved-time.ts
export function loadedMinute(document: { minute: number }): number {
  return document.minute + Date.now();
}
```

### Niezmienione argumenty

- **Decision:** D-04 · D-213
- **Invariant:** simulation-inputs
- **Good:** Wczytanie i zapis tworzą wynik, który nie dzieli z argumentem żadnej wartości do późniejszej zmiany.
- **Bad:** Wczytanie zapisuje do przekazanego dokumentu albo oddaje jego wewnętrzny obiekt.

Nie zmieniaj przekazanego dokumentu ani stanu gry ani wartości osiągalnych
z nich. Wynik zapisu i wczytania buduj z nowych wartości, aby późniejsza zmiana
stanu nie zmieniła dokumentu, a zmiana dokumentu nie zmieniła stanu.

```good simulation-inputs src/browser/sim/guideline-saved-copy.ts
export function copyDocument(document: { items: number[] }): { items: number[] } {
  return { items: [...document.items] };
}
```

```bad simulation-inputs src/browser/sim/guideline-saved-copy.ts
export function copyDocument(document: { items: number[] }): { items: number[] } {
  document.items.sort();
  return document;
}
```

### Odmowa zamiast wyjątku

- **Decision:** D-213 · D-206
- **Invariant:** save-version
- **Good:** Spreparowany dokument bieżącej wersji dostaje odmowę z powodem `shape`, a dokument innej wersji powód `version`.
- **Bad:** Wczytanie rzuca wyjątek na nieoczekiwanym kształcie albo uzupełnia brakujący klucz, zamiast odmówić.

Funkcja wczytująca przyjmuje wartość `unknown` i oddaje stan gry albo odmowę
z jednym z powodów `version`, `archetype`, `shape`; nigdy nie rzuca. Kolejność
powodów: wartość bez całkowitej `version` to `shape`, inna wersja niż bieżąca to
`version`, postać o archetypie spoza danych to `archetype`, a wszystko, czego nie
dopuszczają typy stanu gry, listy zamknięte i dane, to `shape`. Czytaj dokument
ściśle: każdy klucz obecny i żaden obcy, tylko własne klucze, liczby o zakresie
swojego typu, identyfikatory z danych, odwołania, za którymi idzie symulacja,
i brak luk w listach. Brakujących kluczy nie uzupełniaj. Wolno odmówić
więcej, niewolno mniej. Przy błędzie nie zwracaj części stanu.

### Wersja podnoszona razem z kształtem

- **Decision:** D-206 · D-213
- **Invariant:** save-version
- **Good:** Zmiana `GameState` albo typu, do którego prowadzi, podnosi stałą wersji, a dokument zapisany w teście ma nową wersję i nowy kształt.
- **Bad:** Zmiana kształtu stanu gry zostawia wersję bez zmian albo przepisuje dokument w teście bez podniesienia wersji.

Wersja kształtu stoi w stałej `SAVED_GAME_VERSION` obok funkcji wczytującej
i zapisującej. Podnieś ją przy każdej zmianie kształtu: typu `GameState` albo
typu, do którego prowadzi, oraz przedmiotów z danych, które wylicza `Backpack`.
Test zapisanego dokumentu bieżącej wersji (`tests/sim/saved-game.test.mjs`)
wypełnia każdą gałąź opcjonalną, sprawdza, że dokument wczytuje się w opisany
stan gry, i że stała jest równa wersji zapisanej obok. Zmiana kształtu każe
ścisłemu wczytaniu odmówić temu dokumentowi, więc test czerwienieje. Dokument
w teście przepisz tylko razem z podniesieniem wersji; poprzednie dokumenty
zostają w teście i każdy jest odrzucany jako inna wersja. Przegląd sprawdza
tę parę. Test nie podnosi wersji sam: podniesienie jest decyzją autora zmiany.
Dokument w teście wolno przepisać bez podniesienia wersji tylko wtedy, gdy
żaden zapis stanu gry bieżącej wersji nie istnieje nigdzie, bo zmiana jeszcze
nie trafiła na żaden serwer; komentarz nad dokumentem w teście mówi o tym
wyjątku.

Wczytanie sprawdza też wobec danych: dopuszczalne tempa, szerokość i wysokość
planszy każdej mapy (liczbę pól), identyfikatory map, zasobów, przedmiotów,
stworzeń, rodzajów działań i warunków, umiejętności postaci i gałęzi ich
drzew, górną granicę energii natury, pojemność skrzyni, predyspozycje
archetypu postaci, liczbę cen każdej gałęzi (najwyższą rangę) oraz progi
wprawy, od których zależą punkty do wydania na rangi. Zmiana którejś
z tych rzeczy nie podnosi wersji sama, ale dokumenty bieżącej wersji, które
jej już nie spełniają, są odrzucane jako uszkodzone (powód `shape`, zdanie
„Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”), nie jako
inna wersja.

## Examples

### Ścisłe wczytanie

`src/browser/sim/saved-game.ts` czyta dokument przez małe funkcje, które
każdą wartość sprawdzają i zwracają nową: `fields` wymaga dokładnie podanych
własnych kluczy, `list` listy bez luk, `oneOf` klucza listy zamkniętej danych,
a `finite`, `integer` i `count` liczby o swoim zakresie. Program czyta sprawdzenie programów
z `programs.ts`. Każda odmowa przerywa czytanie wyjątkiem własnym tego pliku,
który łapie jedna funkcja eksportowana, `loadSavedGame`, i zamienia na
`{ ok: false, reason }`. Dokument z serwera ma obok `version` i `game` klucz
`revision`, którego stan gry nie zawiera; dokument zachowany w pamięci strony
go nie ma, a wczytanie przyjmuje oba.

### Plan wyprawy i skrzynia

Plan wyprawy programu (`tripPlan`, listy `take` i `bring`) czyta sprawdzenie
programów z `programs.ts`, to samo, przez które gra przyjmuje plan od gracza:
każda liczność jest bezpieczną liczbą całkowitą od 1 (D-181), więc gra nie
trzyma liczności, której wczytanie by odmówiło. Zamrożony plan wynoszenia
przebiegu (`bringPlan`) i to, co ukończenie włożyło do skrzyni (`deposited`),
czyta `tripList`: przedmiot z danych, każdy najwyżej raz na liście, liczność
bezpieczna od 1. `deposited` jest `null` dokładnie wtedy, gdy przebieg nie ma ukończenia,
a przy ukończeniu jego pozycje idą w kolejności `bringPlan`, każda najwyżej
w zaplanowanej liczności (D-179, D-189). Skrzynię czyta `chest`: sztuki według
przedmiotu, klucz z liczbą 0 dozwolony, razem nie więcej niż pojemność
skrzyni z danych.

### Umiejętności postaci i wprawa

Umiejętności postaci drużyny i postaci przebiegu czyta `characterSkills`:
tylko umiejętności z predyspozycji archetypu postaci (dla postaci przebiegu
archetyp jej postaci z drużyny), każda z wprawą od 0 i rangami gałęzi
własnego drzewa, ranga od 1 do liczby cen gałęzi, kupiona tylko w drzewie,
które zawiera Zrozumienie, i nie więcej wydanych punktów, niż dały osiągnięte
progi wprawy (D-191, D-200). Drzewa Zrozumienia i odkrycia (`trees`) są listą
umiejętności z danych, każda raz (D-195). Wprawę przebiegu i walki czyta
`practice`: klucz umiejętności z danych, wartość od 1, bo działanie dodaje
wprawę po jednej (D-193). Działanie `patrol` (Obchód) przechodzi przez
sprawdzenie programów jak każde działanie reguły i nie jest ruchem na sąsiednie
pole (D-197).

### Przebieg mapy po wczytaniu

Ręczny przebieg mapy, który trwał, wraca zatrzymany, w minucie gry, z tempem
i resztą czasu rzeczywistego dokumentu; zakończony wraca zakończony, z ekranem
po końcu (D-212), z tym, co ukończenie włożyło do skrzyni, i z wprawą przebiegu.
Przebieg pętli zarobkowej nie ma pauzy ani tempa i wraca trwający, bo dokument
z zakończonym przebiegiem pętli to `shape` (D-224). Wczytanie niczego nie posuwa
naprzód: chwilę zapisu bierze z dokumentu, a minuty nieobecności dolicza osobny
krok po wczytaniu (D-230).

## Where in code

- `src/browser/sim/`
- `src/browser/sim/saved-game.ts`
- `tests/sim/saved-game.test.mjs`
