# Coding guidelines — browser-module

- **Discipline:** coding
- **Applies to:** browser-view

## When to read

Przed dodaniem lub zmianą modułu widoku w `src/browser/view/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/view/account-card.tsx` | exemplar | D-36 |
| `src/browser/view/account-rules.ts` | copy | — |
| `src/browser/view/app.ts` | do not copy | — |
| `src/browser/view/away-report.ts` | do not copy | — |
| `src/browser/view/body-row.ts` | do not copy | — |
| `src/browser/view/character-screen.tsx` | copy | — |
| `src/browser/view/character-skills.ts` | do not copy | — |
| `src/browser/view/clock.ts` | copy | — |
| `src/browser/view/combat-line.ts` | do not copy | — |
| `src/browser/view/controls/button.ts` | copy | — |
| `src/browser/view/controls/number-field.ts` | copy | — |
| `src/browser/view/controls/pick-cell.ts` | copy | — |
| `src/browser/view/controls/react-button.tsx` | copy | — |
| `src/browser/view/controls/react-number-field.tsx` | copy | — |
| `src/browser/view/controls/react-pick-cell.tsx` | copy | — |
| `src/browser/view/controls/react-select-list.tsx` | copy | — |
| `src/browser/view/controls/react-text-field.tsx` | copy | — |
| `src/browser/view/controls/select-list.ts` | copy | — |
| `src/browser/view/controls/text-field.ts` | copy | — |
| `src/browser/view/credits-section.tsx` | copy | — |
| `src/browser/view/credits.ts` | copy | — |
| `src/browser/view/discovery-band.tsx` | copy | — |
| `src/browser/view/discovery-rule.ts` | copy | — |
| `src/browser/view/email-confirmation.ts` | do not copy | — |
| `src/browser/view/email-status.ts` | do not copy | — |
| `src/browser/view/footer.ts` | do not copy | — |
| `src/browser/view/game-saver.ts` | do not copy | — |
| `src/browser/view/game-view.ts` | do not copy | — |
| `src/browser/view/headquarters.ts` | do not copy | — |
| `src/browser/view/menu-bar.tsx` | copy | — |
| `src/browser/view/password-reset.ts` | copy | — |
| `src/browser/view/program-editor.ts` | do not copy | — |
| `src/browser/view/program-list.tsx` | copy | — |
| `src/browser/view/program-panel.tsx` | copy | — |
| `src/browser/view/rule-list.tsx` | copy | — |
| `src/browser/view/rule-panel.tsx` | copy | — |
| `src/browser/view/run-header.tsx` | copy | — |
| `src/browser/view/run-screen.tsx` | copy | — |
| `src/browser/view/scene-picture.ts` | copy | — |
| `src/browser/view/scene.tsx` | copy | — |
| `src/browser/view/screen-address.ts` | copy | — |
| `src/browser/view/status-row.ts` | do not copy | — |
| `src/browser/view/terrain-drawing.tsx` | copy | — |
| `src/browser/view/terrain-picture.ts` | copy | — |
| `src/browser/view/tile-list.ts` | do not copy | — |
| `src/browser/view/tile-table.tsx` | copy | — |
| `src/browser/view/trip-editor.ts` | do not copy | — |
| `src/browser/view/trip-lines.ts` | do not copy | — |
| `src/browser/view/trip-plan.tsx` | copy | — |
| `src/browser/view/world-area.tsx` | copy | — |

## Rules

### TypeScript i DOM

- **Decision:** D-03
- **Invariant:** browser-view-framework
- **Good:** Ekran jest komponentem Reacta w pliku `.tsx`.
- **Bad:** Moduł widoku importuje inny framework UI niż React.

Buduj widok w TypeScript z Reactem: ekran to komponent funkcyjny w pliku `.tsx`,
który rysuje ze stanu gry, a jedynym frameworkiem UI w kodzie i w zależnościach
uruchomieniowych jest React. Ekran, którego żadne zadanie nie przeniosło jeszcze
do Reacta, zostaje przy API DOM przeglądarki (D-265).

```good browser-view-framework src/browser/view/guideline-element.tsx
export function Label() {
  return <span />;
}
```

```bad browser-view-framework src/browser/view/guideline-element.tsx
import "preact";
export function Label() {
  return <span />;
}
```

### Nazwy treści z danych

- **Decision:** D-18
- **Invariant:** content-identifiers
- **Good:** Widok odczytuje nazwę zasobu z katalogu przez przekazany identyfikator.
- **Bad:** Widok wpisuje nazwę zasobu bezpośrednio w swoim kodzie.

Poza plikami danych nie wpisuj identyfikatorów ani nazw map, zasobów i archetypów.
Przekazuj identyfikatory z danych lub stanu i przez nie odczytuj katalog.

```good content-identifiers src/browser/view/guideline-name.ts
import { RESOURCES } from "../sim/data/resources.js";
import type { ResourceId } from "../sim/types.js";
export function resourceName(id: ResourceId): string {
  return RESOURCES[id].name;
}
```

```bad content-identifiers src/browser/view/guideline-name.ts
export function resourceName(): string {
  return "patyk";
}
```

### Hooki

- **Decision:** D-267
- **Invariant:** none
- **Good:** Hook wywołany na najwyższym poziomie komponentu, przed każdym wczesnym `return`.
- **Bad:** Hook wywołany w warunku, w pętli, w funkcji zagnieżdżonej albo w bloku `try`/`catch`/`finally`.

Hook wywołuj tylko na najwyższym poziomie komponentu funkcyjnego albo własnego
Hooka, przed każdym wczesnym `return`, nigdy w pętli, w warunku, w funkcji
zagnieżdżonej ani w bloku `try`/`catch`/`finally`. Żadne narzędzie tego nie
pilnuje: pilnuje przegląd zmiany, a zmieniona kolejność Hooków łamie przypadek
testu, który przechodzi tą ścieżką.

### Efekty

- **Decision:** D-267
- **Invariant:** none
- **Good:** Efekt łączący z układem poza Reactem zwraca funkcję sprzątającą i wymienia wszystkie wartości, które czyta.
- **Bad:** Efekt czyta prop, którego jego lista zależności nie wymienia, albo wysyła logowanie zamiast obsługi zdarzenia.

Każda wartość reaktywna, której używa kod Efektu, stoi na jego liście zależności.
Efekt łączący z układem poza Reactem zwraca funkcję sprzątającą, która się od
niego odłącza. Efekt służy do synchronizacji z takim układem, nigdy do
przekształcania danych na potrzeby rysowania ani do obsługi zdarzenia
użytkownika: to robi obsługa zdarzenia albo wartość liczona podczas rysowania.
Niepełnej listy zależności nie wykrywa żaden test, tylko przegląd; błąd tych
reguł, który przeszedł testy i przegląd, otwiera D-29 dla człowieka.

### Wspólna kontrolka w dwóch postaciach

- **Decision:** D-265
- **Invariant:** none
- **Good:** Nowy atrybut przycisku zapisany w obu postaciach w jednej zmianie; ekran w DOM, którego zmiana innego ekranu nie ruszyła, zostaje przy postaci DOM.
- **Bad:** Komponent Reacta opakowujący funkcję DOM; klasa ustawiana tylko przez postać Reacta; postać Reacta bez przypadku w teście porównującym obie.

Dopóki ostatni ekran w API DOM nie przejdzie do Reacta, wspólna kontrolka, której
używa ekran w Reactcie, ma w `src/browser/view/controls/` dwie postaci: komponent
Reacta w pliku z przedrostkiem `react-` (plik `.tsx` nie może dzielić nazwy
z plikiem `.ts` obok) i funkcję DOM. Obie rysują to samo drzewo elementów z tymi
samymi klasami i atrybutami; wygląd stoi tylko w `src/browser/styles.css`.
Komponent jest napisany po reactowemu, z polami kontrolowanymi i stanem
w komponencie, nie owija funkcji DOM. Ekran, którego żadne zadanie nie przeniosło
do Reacta, zostaje przy postaci DOM, a jego nową sekcję wolno zbudować w DOM
(reguła *Nowy ekran i moduły w DOM*). Test `tests/view/react-controls.test.mjs`
rysuje obie postaci dla każdego rodzaju i stanu, których używa ekran w Reactcie,
i porównuje znacznik, atrybuty i tekst, z atrybutem `value` pola poza
porównaniem; nowa postać dostaje w nim przypadek.

### Nowy ekran i moduły w DOM

- **Decision:** D-265
- **Invariant:** none
- **Good:** Nowy ekran w Reactcie importuje czystą funkcję modułu ze statusem `do not copy`; nowa sekcja ekranu, który jeszcze jest w DOM, powstaje w DOM.
- **Bad:** Nowy ekran buduje elementy przez `document.createElement` na wzór modułu ze statusem `do not copy`.

Nowy ekran nie powstaje na wzór pliku ze statusem `do not copy` w tabeli
*Files of this kind*: te pliki budują elementy przez API DOM i stoją w tabeli,
bo ekran, którego żadne zadanie nie przeniosło do Reacta, zostaje przy API DOM.
Nowy ekran powstaje po wzorze pliku ze statusem `exemplar`. Plik budujący
elementy przez API DOM, dodany po ostatnim audycie tabeli, nie ma w niej wiersza
i też nie jest wzorem. Status nie zakazuje importowania czystych funkcji tych
plików, bo takie funkcje niczego nie rysują. Reguła dotyczy tylko nowych
ekranów: nowa sekcja ekranu, który jeszcze jest w DOM, może powstać w DOM,
a w Reactcie przepisze ją zadanie tego ekranu. Status `copy` przy pliku
w `src/browser/view/controls/` oznacza, że nową kontrolkę pisze się w obu
postaciach według reguły wyżej.

### Strona wszystkich stanów bez Reacta

- **Decision:** D-269
- **Invariant:** none
- **Good:** Moduł importowany przez stronę wszystkich stanów sięga tylko do plików `.ts` bez Reacta.
- **Bad:** Moduł importowany przez stronę wszystkich stanów importuje plik `.tsx`.

Skrypt `scripts/kitchen-sink.mjs` nie składa paczki, więc moduł importowany przez
stronę wszystkich stanów, bezpośrednio albo przez inne moduły, nie sięga do pliku
`.tsx`. Formularze strony zostają w postaci DOM. Pierwsze zadanie, które potrzebuje
Reacta na tej stronie, zmienia krok budowania skryptu, a nie jego linie
podające pliki.

## Examples

### Ekran w Reactcie: karta logowania

`src/browser/view/account-card.tsx` jest ekranem w Reactcie. Granicą między stroną
w DOM a ekranem jest `createAccountCard`: tworzy korzeń, rysuje synchronicznie
przez `flushSync` i zwraca element, `focus()` i `dispose()`. Strona wywołuje
ją z obsługi zdarzenia albo z kontynuacji odpowiedzi, nigdy z rysowania ani
z Efektu. Każdy formularz jest komponentem, który trzyma wpisane wartości jako
własny stan (`useField`), więc zmiana stanu karty odmontowuje formularz razem
z wpisanym tekstem i komunikatami.

Wspólną blokadę karty na czas oczekiwania na serwer trzyma własny Hook
`useCardLock`. Wyłączona kontrolka traci fokus, więc `focusAfterCommit` zapisuje
cel, a Efekt układu (`useLayoutEffect`) bez listy zależności przenosi na niego fokus
po każdym zatwierdzeniu zmiany. Formularz wysyła obsługa zdarzenia `onSubmit`,
nie Efekt.

### Ekran w Reactcie: Postać

`src/browser/view/character-screen.tsx` jest ekranem w Reactcie, który rysuje z bieżącego
stanu gry i z adresu. Numer postaci bierze z adresu `#/postac/{n}`: `readScreenAddress`
z `screen-address.ts` czyta adres, a `game-view.ts` przekazuje numer do ekranu, sam go nie
wybiera. Ekran powstaje przy wejściu na Postać (`openCharacterScreen`) i jest zdejmowany
przy wyjściu (`closeCharacterScreen`), więc nie istnieje, gdy gracz jest na innym ekranie.

Granicą jest `createCharacterScreen({ onBuy, onStop, props })`. Zwraca `element` do
umieszczenia na stronie, `update(props)`, `focus()` i `dispose()`; pierwsze rysowanie jest
synchroniczne, więc ekran stoi w elemencie, zanim granica zwróci wynik. Strona woła
`update` z nowym stanem gry, gdy stan się zmienił (`renderScreens`), oraz przy każdym odczycie
zegara (wywołanie zwrotne `startClock` w `game-view.ts`), z chwilą odczytu w `nowMs`. Nigdy
nie woła go z rysowania ani z Efektu.

Ekran nie wykonuje działań sam: kupno gałęzi i zatrzymanie pętli wychodzą przez `onBuy` i
`onStop`, a `game-view.ts` zamienia je na wywołania symulacji. Gdy w stanie gry stoi
przejście na mapie (`run !== null`), przycisk „Kup” jest wyłączony, a ekran pisze, że
stopnie kupi się po jego zakończeniu. Funkcje układające tekst, `loopLine` z `headquarters.ts`
i `branchText` z `character-skills.ts`, są czystymi funkcjami modułów DOM; nic nie rysują,
więc ekran może je importować (D-265).

### Pasek menu w Reactcie

`src/browser/view/menu-bar.tsx` jest paskiem menu w Reactcie, który stoi w nagłówku strony.
`app.ts` tworzy go w `startApp` i wkłada jego element (`bar.element`) do nagłówka jako
pierwszy; linia zapisu (`saveLine`) stoi w nagłówku pod nim. Granica ma ten sam kształt co
przy ekranie Postać: `createMenuBar({ client, onLogout, props })` zwraca `element`,
`update(props)` i `dispose()`. Strona daje pasku konto albo `null` (wtedy stoi sama nazwa
gry), ekran, na którym jest gracz, pozycję „Wróć do przejścia” i stan wylogowania.

Pasek nie zna gry ani zapisu. „Wyloguj” stoi w menu „Konto”: pasek tylko je zgłasza
przez `onLogout`, a `app.ts` najpierw zapisuje grę, potem kończy sesję; pasek pokazuje
czekanie i zdanie, które strona mu daje. Zdarzenia dokumentu menu otwartego (Escape i
kliknięcie poza menu) są w Efekcie z listą zależności `[open]` i funkcją sprzątającą, jak
wymaga D-267. „Wyślij ponownie” pasek wysyła sam przez `client`.

### Kontrolki w DOM i ich aktualizacja

Ten akapit o `headquarters.ts` dotyczy utrzymania ekranu, który zostaje w DOM,
nie budowy nowego ekranu (D-265).

`src/browser/view/headquarters.ts` tworzy pole imienia nowej postaci i przycisk
„Załóż” raz, a przy zmianie stanu aktualizuje istniejące elementy: `update`
ustawia `disabled` przycisków „Wyślij” i „Puść w pętlę”, a `setLine` zapisuje
tekst i widoczność wiersza tylko tam, gdzie się zmieniły. Dzięki temu pole
i przycisk zachowują fokus. Listę postaci odbudowuje tylko wtedy, gdy zmieni się
drużyna, rozwiązane mapy albo numery i nazwy programów. Obsługa kliknięć
przekazuje działania do aplikacji przez `HeadquartersControls`; aplikacja
wywołuje symulację. Taki podział jest przykładem dla edytowalnych kontrolek
ekranu, który zostaje w DOM. Każdy moduł nie musi mieć `update()`, a elementy
statyczne mogą być przebudowywane.

Wspólne kontrolki w `src/browser/view/controls/` budują ekrany; kontrolka, która
czeka na serwer, zmienia się w miejscu. W postaci DOM `setButtonWaiting`
z `button.ts` wyłącza istniejący przycisk i podmienia jego tekst na napis
oczekiwania, a wywołana z `null` przywraca tekst; pola formularza blokuje się
przez `input.disabled`, a zdanie odmowy albo braku połączenia pokazuje
`createFormWarning` z `text-field.ts`, a zdanie spokojne, które nie jest odmową,
`createFormNote` z tego samego pliku. Pole hasła to `createPasswordField`,
a przycisk, który wysyła formularz, dostaje `submit: true`. Rodzaj przycisku
ustawia `kind` w obu postaciach, a akcja poboczna i zakładka to rodzaje `secondary`
i `tab`. Postacie Reacta to `ReactButton` (`kind`, `waitingText`, `selected`,
`submit`) oraz `ReactTextField`, `ReactPasswordField`, `ReactFormWarning`,
`ReactFormNote`, `ReactSelectList`, `ReactNumberField` i `ReactPickCell`.
Wyłączony przycisk traci fokus, więc ekran po odpowiedzi ustawia go na
kontrolce, od której gracz zaczął.

### Gra na stronie i odpowiedzi serwera

Ten przykład dotyczy ekranu gry, który zostaje w DOM, nie nowego ekranu (D-265).

`src/browser/view/app.ts` buduje grę dopiero wtedy, gdy serwer potwierdzi
konto, a potem odpowie o zapisanym stanie gry tego konta (D-96). Stan gry daje
funkcja symulacji `loadSavedGame` z `saved-game.ts`; strona nie składa go sama.
Gdy zapisu nie ma albo funkcja odmawia, strona buduje nową grę, a w drugim
przypadku ze zdaniem odmowy nad nią. Wyjątek z tej funkcji to błąd kodu, nie
odmowa: `startFrom` zapisuje wiersz w konsoli, strona nie buduje gry i pokazuje
„Nie udało się wczytać gry. Spróbuj ponownie.” z ponowieniem jak po nieudanym
żądaniu, a stan zachowany w pamięci strony zostaje do ponowienia (D-96, D-213).
Grę usuwa, gdy serwer potwierdzi
wylogowanie (D-97), gdy zapis dostanie 401 i gdy zapis przegra z zapisem z innej
przeglądarki; po 401 stan gry zostaje w pamięci strony dla tego samego konta
(D-211), a po konflikcie strona buduje grę od nowa z zapisu wczytanego z serwera
(D-209).

`createGameView` z `game-view.ts` zwraca element gry, wiersz zapisu (`saveLine`)
do ustawienia w nagłówku pod paskiem menu, metody zapisu (`saveNow`, `saveBeforeLogout`, `keep`)
i `dispose()`, które zatrzymuje zegar (`dispose()` z `clock.ts`) i zapisującego,
a element gry i wiersz zapisu zdejmuje ze strony, razem z ich obsługą zdarzeń;
moduł, który tworzy grę, wywołuje `dispose()`, zanim ją porzuci. Wynik zapisu
dociera do strony wywołaniami `onConflict`, `onOutdated` i `onSignedOut`. „Wyloguj” stoi
w menu „Konto” na pasku menu w nagłówku (`menu-bar.tsx`); pasek tylko je zgłasza, a
`app.ts` najpierw zapisuje grę przez `saveBeforeLogout`, dopiero potem kończy sesję.

Każde żądanie ekranu dostaje kolejny numer, a odpowiedź działa tylko wtedy, gdy
jej numer jest ostatni, więc spóźniona odpowiedź nie buduje gry ani nie
nadpisuje nowszego stanu. Brak sesji ekran rozpoznaje po odmowie ze statusem 401
w wyniku klienta z `account-api.ts`, przy żądaniu konta i przy żądaniu
zapisanego stanu gry; 401 na zapis rozpoznaje zapisujący i zgłasza je stronie
przez `onSignedOut`. Każdą inną porażkę któregoś z dwóch pierwszych żądań strona
pokazuje jako jedno ostrzeżenie z „Spróbuj ponownie”; treści odpowiedzi nie
czyta. Zapis ma własne zdania w wierszu zapisu: konflikt, stary kod gry i za
duży stan gry (D-209, D-210, D-208), a każda inna porażka to ostrzeżenie
o ponowieniu.

## Where in code

- `src/browser/view/`
- `src/browser/view/account-card.tsx`
- `src/browser/view/controls/`
- `src/browser/view/headquarters.ts`
- `src/browser/kitchen-sink/`
- `tests/view/react-controls.test.mjs`
