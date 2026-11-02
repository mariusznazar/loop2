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
| `src/browser/view/app.ts` | copy | — |
| `src/browser/view/away-report.ts` | copy | — |
| `src/browser/view/body-row.ts` | copy | — |
| `src/browser/view/character-skills.ts` | copy | — |
| `src/browser/view/clock.ts` | copy | — |
| `src/browser/view/combat-line.ts` | copy | — |
| `src/browser/view/controls/button.ts` | copy | — |
| `src/browser/view/controls/number-field.ts` | copy | — |
| `src/browser/view/controls/react-button.tsx` | copy | — |
| `src/browser/view/controls/react-text-field.tsx` | copy | — |
| `src/browser/view/controls/select-list.ts` | copy | — |
| `src/browser/view/controls/text-field.ts` | copy | — |
| `src/browser/view/credits-section.tsx` | copy | — |
| `src/browser/view/credits.ts` | copy | — |
| `src/browser/view/email-confirmation.ts` | copy | — |
| `src/browser/view/email-status.ts` | copy | — |
| `src/browser/view/footer.ts` | copy | — |
| `src/browser/view/game-saver.ts` | do not copy | — |
| `src/browser/view/game-view.ts` | copy | — |
| `src/browser/view/headquarters.ts` | copy | — |
| `src/browser/view/password-reset.ts` | copy | — |
| `src/browser/view/program-editor.ts` | copy | — |
| `src/browser/view/program-panel.ts` | copy | — |
| `src/browser/view/status-row.ts` | copy | — |
| `src/browser/view/terrain-panel.ts` | copy | — |
| `src/browser/view/terrain-picture.ts` | copy | — |
| `src/browser/view/tile-list.ts` | copy | — |
| `src/browser/view/trip-editor.ts` | copy | — |
| `src/browser/view/trip-lines.ts` | copy | — |

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
do Reacta, zostaje przy postaci DOM. Test `tests/view/react-controls.test.mjs`
rysuje obie postaci dla każdego rodzaju i stanu, których używa ekran w Reactcie,
i porównuje znacznik, atrybuty i tekst, z atrybutem `value` pola poza
porównaniem; nowa postać dostaje w nim przypadek.

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

### Kontrolki w DOM i ich aktualizacja

`src/browser/view/status-row.ts` tworzy przyciski raz, a przy zmianie stanu
aktualizuje tekst istniejących elementów. Dzięki temu przycisk zachowuje fokus.
Obsługa kliknięć przekazuje działania do aplikacji przez `StatusRowControls`;
aplikacja wywołuje symulację. Taki podział jest przykładem dla edytowalnych
kontrolek ekranu, który zostaje w DOM. Każdy moduł nie musi mieć `update()`,
a elementy statyczne mogą być przebudowywane.

Wspólne kontrolki w `src/browser/view/controls/` budują ekrany; kontrolka, która
czeka na serwer, zmienia się w miejscu. W postaci DOM `setButtonWaiting`
z `button.ts` wyłącza istniejący przycisk i podmienia jego tekst na napis
oczekiwania, a wywołana z `null` przywraca tekst; pola formularza blokuje się
przez `input.disabled`, a zdanie odmowy albo braku połączenia pokazuje
`createFormWarning` z `text-field.ts`, a zdanie spokojne, które nie jest odmową,
`createFormNote` z tego samego pliku. Pole hasła to `createPasswordField`,
a przycisk, który wysyła formularz, dostaje `submit: true`. Postacie Reacta
to `ReactButton` (`waitingText`, `selected`, `submit`) oraz `ReactTextField`,
`ReactPasswordField`, `ReactFormWarning` i `ReactFormNote`. Wyłączony przycisk
traci fokus, więc ekran po odpowiedzi ustawia go na kontrolce, od której gracz
zaczął.

### Gra na stronie i odpowiedzi serwera

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
do ustawienia w nagłówku, metody zapisu (`saveNow`, `saveBeforeLogout`, `keep`)
i `dispose()`, które zatrzymuje zegar (`dispose()` z `clock.ts`) i zapisującego,
a element gry i wiersz zapisu zdejmuje ze strony, razem z ich obsługą zdarzeń;
moduł, który tworzy grę, wywołuje `dispose()`, zanim ją porzuci. Wynik zapisu
dociera do strony wywołaniami `onConflict`, `onOutdated` i `onSignedOut`.

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
- `src/browser/view/status-row.ts`
- `src/browser/kitchen-sink/`
- `tests/view/react-controls.test.mjs`
