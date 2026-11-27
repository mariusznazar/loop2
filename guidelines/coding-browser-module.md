# Coding guidelines — browser-module

- **Discipline:** coding
- **Applies to:** browser-view

## When to read

Przed dodaniem lub zmianą modułu widoku w `src/browser/view/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File                                               | Status      | Decision |
| -------------------------------------------------- | ----------- | -------- |
| `src/browser/view/account-card.tsx`                | exemplar    | D-36     |
| `src/browser/view/account-rules.ts`                | copy        | —        |
| `src/browser/view/accounts-entry.ts`               | copy        | —        |
| `src/browser/view/accounts-screen.tsx`             | copy        | —        |
| `src/browser/view/app.ts`                          | copy        | —        |
| `src/browser/view/away-report.ts`                  | copy        | —        |
| `src/browser/view/body-row.ts`                     | copy        | —        |
| `src/browser/view/camp-picture.ts`                 | copy        | —        |
| `src/browser/view/camp.tsx`                        | copy        | —        |
| `src/browser/view/character-entry.ts`              | copy        | —        |
| `src/browser/view/character-screen.tsx`            | copy        | —        |
| `src/browser/view/character-skills.ts`             | copy        | —        |
| `src/browser/view/chronicle-entries.ts`            | copy        | —        |
| `src/browser/view/chronicle.ts`                    | copy        | —        |
| `src/browser/view/clock.ts`                        | copy        | —        |
| `src/browser/view/combat-line.ts`                  | copy        | —        |
| `src/browser/view/controls/react-button.tsx`       | copy        | —        |
| `src/browser/view/controls/react-number-field.tsx` | copy        | —        |
| `src/browser/view/controls/react-pick-cell.tsx`    | copy        | —        |
| `src/browser/view/controls/react-select-list.tsx`  | copy        | —        |
| `src/browser/view/controls/react-text-field.tsx`   | copy        | —        |
| `src/browser/view/counted-name.ts`                 | copy        | —        |
| `src/browser/view/credit-lines.ts`                 | copy        | —        |
| `src/browser/view/credits-section.tsx`             | copy        | —        |
| `src/browser/view/credits.ts`                      | copy        | —        |
| `src/browser/view/discovery-band-text.ts`          | copy        | —        |
| `src/browser/view/discovery-band.tsx`              | copy        | —        |
| `src/browser/view/discovery-rule.ts`               | copy        | —        |
| `src/browser/view/email-confirmation.ts`           | copy        | —        |
| `src/browser/view/email-status.ts`                 | copy        | —        |
| `src/browser/view/end-question.tsx`                | copy        | —        |
| `src/browser/view/end-window-lines.ts`             | copy        | —        |
| `src/browser/view/end-window.tsx`                  | copy        | —        |
| `src/browser/view/game-saver.ts`                   | copy        | —        |
| `src/browser/view/game-view.ts`                    | do not copy | —        |
| `src/browser/view/header-rows.tsx`                 | copy        | —        |
| `src/browser/view/headquarters-entry.ts`           | do not copy | —        |
| `src/browser/view/headquarters.tsx`                | copy        | —        |
| `src/browser/view/knowledge-entry.ts`              | copy        | —        |
| `src/browser/view/knowledge-lines.ts`              | copy        | —        |
| `src/browser/view/knowledge-screen.tsx`            | copy        | —        |
| `src/browser/view/last-resort.ts`                  | copy        | —        |
| `src/browser/view/map-lines.ts`                    | copy        | —        |
| `src/browser/view/maps-entry.ts`                   | copy        | —        |
| `src/browser/view/maps-screen.tsx`                 | copy        | —        |
| `src/browser/view/menu-bar.tsx`                    | copy        | —        |
| `src/browser/view/now-lines.ts`                    | copy        | —        |
| `src/browser/view/now-rows.tsx`                    | copy        | —        |
| `src/browser/view/page-sentences.tsx`              | copy        | —        |
| `src/browser/view/password-reset.ts`               | copy        | —        |
| `src/browser/view/previous-save-lines.ts`          | copy        | —        |
| `src/browser/view/program-editor.ts`               | copy        | —        |
| `src/browser/view/program-list.tsx`                | copy        | —        |
| `src/browser/view/program-panel-acts.ts`           | copy        | —        |
| `src/browser/view/program-panel.tsx`               | copy        | —        |
| `src/browser/view/programs-entry.ts`               | do not copy | —        |
| `src/browser/view/rule-list.tsx`                   | do not copy | —        |
| `src/browser/view/rule-panel.tsx`                  | copy        | —        |
| `src/browser/view/run-entry.ts`                    | copy        | —        |
| `src/browser/view/run-header.tsx`                  | copy        | —        |
| `src/browser/view/run-screen-reading.ts`           | copy        | —        |
| `src/browser/view/run-screen-state.ts`             | copy        | —        |
| `src/browser/view/run-screen.tsx`                  | copy        | —        |
| `src/browser/view/scene-picture.ts`                | copy        | —        |
| `src/browser/view/scene.tsx`                       | copy        | —        |
| `src/browser/view/screen-address.ts`               | copy        | —        |
| `src/browser/view/screen-registry.ts`              | copy        | —        |
| `src/browser/view/state-store.ts`                  | copy        | —        |
| `src/browser/view/status-row.ts`                   | copy        | —        |
| `src/browser/view/tabs-area.tsx`                   | copy        | —        |
| `src/browser/view/team-lines.ts`                   | copy        | —        |
| `src/browser/view/terrain-drawing.tsx`             | copy        | —        |
| `src/browser/view/terrain-picture.ts`              | copy        | —        |
| `src/browser/view/tile-list.ts`                    | copy        | —        |
| `src/browser/view/tile-table.tsx`                  | copy        | —        |
| `src/browser/view/trip-editor.ts`                  | copy        | —        |
| `src/browser/view/trip-lines.ts`                   | copy        | —        |
| `src/browser/view/trip-plan.tsx`                   | copy        | —        |
| `src/browser/view/waiting-screen.tsx`              | copy        | —        |
| `src/browser/view/world-area.tsx`                  | copy        | —        |

## Rules

### TypeScript i DOM

- **Decision:** D-03
- **Invariant:** browser-view-framework
- **Good:** Ekran jest komponentem Reacta w pliku `.tsx`.
- **Bad:** Moduł widoku importuje inny framework UI niż React.

Buduj widok w TypeScript z Reactem: ekran to komponent funkcyjny w pliku `.tsx`,
który rysuje ze stanu gry, a jedynym frameworkiem UI w kodzie i w zależnościach
uruchomieniowych jest React. Żaden ekran nie powstaje przez API DOM
przeglądarki; co strona buduje ręcznie, mówi reguła _Nowy ekran i moduły w DOM_
(D-265).

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

Poza plikami danych nie wpisuj identyfikatorów ani nazw map, zasobów, przedmiotów i archetypów.
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

### Wspólna kontrolka w jednej postaci

- **Decision:** D-265
- **Invariant:** none
- **Good:** Nowy atrybut przycisku zapisany raz, w komponencie Reacta, z przypadkiem w `tests/view/shared-controls.test.mjs`; panel w miejscu zdjętej karty bierze znacznik, klasę i rolę zdania ostrzeżenia ze stałej, którą czyta też komponent tego zdania.
- **Bad:** Wspólna kontrolka z drugą postacią zbudowaną przez API DOM; panel, który wpisuje znacznik, klasę albo rolę zdania ostrzeżenia własnym literałem; wygląd kontrolki ustawiany atrybutem `style` komponentu zamiast w `src/browser/styles.css`.

Wspólna kontrolka w `src/browser/view/controls/` ma jedną postać: komponent
Reacta w pliku z przedrostkiem `react-`. Wygląd stoi tylko w
`src/browser/styles.css`. Komponent jest napisany po reactowemu, z polami
kontrolowanymi i stanem w komponencie. Status `copy` przy pliku w tym katalogu
oznacza, że nowa kontrolka powstaje po jego wzorze, jako jeden komponent Reacta.

Panel, który staje w miejscu karty zdjętej przez React, jest zbudowany poza
Reactem (D-323), więc nie może użyć komponentu. Znacznik, klasę i rolę swojego
zdania ostrzeżenia czyta ze stałej `FORM_WARNING` z
`src/browser/view/controls/react-text-field.tsx`, tej samej, którą czyta
`ReactFormWarning`; żadnego z tych trzech nie wpisuje własnym literałem. Żaden
test nie porównuje drzewa elementów panelu z komponentem, więc przegląd zmiany
zdania ostrzeżenia czyta panel i komponent razem.

Test `tests/view/shared-controls.test.mjs` rysuje postać Reacta każdego
rodzaju i stanu kontrolki, których używa ekran, i sprawdza znacznik, klasy,
atrybuty i tekst oraz odpowiedź na kliknięcie, wpisaną wartość i wybór; nowy
stan kontrolki dostaje w nim przypadek w tej samej zmianie.

### Nowy ekran i moduły w DOM

- **Decision:** D-265 · D-407
- **Invariant:** none
- **Good:** Nowy ekran jest korzeniem Reacta i importuje czystą funkcję modułu ze statusem `do not copy`; strona i fabryki jej korzeni budują przez API DOM tylko miejsca, w których montują się korzenie, a panel w miejscu zdjętej karty buduje `createFailureCard`.
- **Bad:** Nowy ekran buduje elementy przez `document.createElement` na wzór modułu ze statusem `do not copy`.

Żaden ekran nie powstaje przez API DOM. Strona (`src/browser/view/app.ts`)
i fabryki jej korzeni budują przez nie tylko miejsca, w których montują się
korzenie Reacta — nagłówek i blok główny stawia fabryka miejsc strony,
`createPagePlaces` z `src/browser/view/page-places.ts`, którą woła `startApp`,
a host każdego korzenia jego fabryka — oraz panel, który staje w miejscu karty zdjętej przez React
(reguła _Wspólna kontrolka w jednej postaci_) i który buduje `createFailureCard`
z `src/browser/view/account-card.tsx`; wszystko, co ma pokazać, rysuje korzeń
Reacta, osobny dla każdego miejsca (D-407).

Nowy ekran nie powstaje na wzór pliku ze statusem `do not copy` w tabeli
_Files of this kind_. Nowy ekran powstaje po wzorze pliku ze statusem
`exemplar`. Plik dodany po ostatnim audycie tabeli nie ma w niej wiersza i też
nie jest wzorem. Status nie zakazuje importowania czystych funkcji tych plików,
bo takie funkcje niczego nie rysują.

### Strona wszystkich stanów z Reactem

- **Decision:** D-269
- **Invariant:** none
- **Good:** Kontrolka dodana do strony wszystkich stanów jako próbka swojej postaci Reacta, a strona zbudowana krokiem budowania skryptu, z liniami, które podają pliki, bez zmian.
- **Bad:** Próbka narysowana z drzewa elementów kontrolki zbudowanego ręcznie; strona składana zmianą linii skryptu, które podają pliki albo otwierają przeglądarkę; paczka albo wyjście kompilatora poza `dist/kitchen-sink/`.

Skrypt `scripts/kitchen-sink.mjs` składa stronę wszystkich stanów w swoim
kroku budowania, tak jak składa się kod przeglądarki gry: kompilator wypisuje
moduły strony, a esbuild łączy je w jeden plik, który strona ładuje. Moduł
importowany przez stronę, bezpośrednio albo przez inne moduły, może więc sięgać
do plików `.tsx` i do Reacta. Strona rysuje każdą wspólną kontrolkę w jej
postaci Reacta. Zmianę sposobu budowania strony robisz w kroku budowania
skryptu, a nie w jego liniach, które podają pliki.

## Examples

### Ekran w Reactcie: karta logowania

`src/browser/view/account-card.tsx` jest ekranem w Reactcie. Granicą między stroną
a ekranem jest `createAccountCard`: tworzy korzeń, rysuje synchronicznie
przez `flushSync` i zwraca element, `focus()` i `dispose()`. Strona wywołuje
ją z obsługi zdarzenia albo z kontynuacji odpowiedzi, nigdy z rysowania ani
z Efektu. Korzeń karty ma własną obsługę błędu, którego nic nie obsłużyło
(`onUncaughtError`): gdy React zdejmie kartę, na jej miejscu staje samo zdanie
o awarii poza Reactem, zbudowane przez `createFailureCard` ze stałej
`FORM_WARNING`, a strona dostaje błąd przez `onUncaught`; `fail()` stawia to
zdanie w działającej karcie, pod formularzem (D-323, D-262). Każdy formularz jest
komponentem, który trzyma wpisane wartości jako własny stan (`useField`), więc
zmiana stanu karty odmontowuje formularz razem z wpisanym tekstem i komunikatami.

Wspólną blokadę karty na czas oczekiwania na serwer trzyma własny Hook
`useCardLock`. Wyłączona kontrolka traci fokus, więc `focusAfterCommit` zapisuje
cel, a Efekt układu (`useLayoutEffect`) bez listy zależności przenosi na niego fokus
po każdym zatwierdzeniu zmiany. Formularz wysyła obsługa zdarzenia `onSubmit`,
nie Efekt.

### Ekran w Reactcie: Postać

`src/browser/view/character-screen.tsx` jest ekranem w Reactcie, który rysuje z bieżącego
stanu gry i z adresu. Numer postaci bierze z adresu `#/postac/{n}`: `readScreenAddress`
z `screen-address.ts` czyta adres, rejestr ekranów (`screen-registry.ts`) podaje ekran
z adresu wpisowi Postaci, a wpis sam numeru nie wybiera. Ekran żyje tylko wtedy, gdy gracz
jest na nim: wpis Postaci w `character-entry.ts` ma życie `while-shown` i klucz równy numerowi
postaci, więc rejestr buduje ekran przy wejściu, buduje go od nowa, gdy adres wskazuje inną
postać, i zdejmuje przy wyjściu. Ekran nie istnieje, gdy gracz jest na innym ekranie.

Granicą jest `createCharacterScreen({ onBuy, onStop, props })`. Zwraca `element` do
umieszczenia na stronie, `update(props)`, `focus()` i `dispose()`; pierwsze rysowanie jest
synchroniczne, więc ekran stoi w elemencie, zanim granica zwróci wynik. Rejestr woła
`update` przez wpis, z nowym stanem gry, gdy stan się zmienił (`drawResult` wpisu), oraz przy
każdym odczycie zegara (`drawReading` wpisu, wołane przez magazyn stanu po odczycie), z chwilą
odczytu w `nowMs`. Nigdy nie woła go z rysowania ani z Efektu.

Ekran nie wykonuje działań sam: kupno gałęzi i zatrzymanie pętli wychodzą przez `onBuy` i
`onStop`, a wpis zamienia je na działania magazynu stanu (`state-store.ts`): kupno przez
`actWithoutCatchUp`, który nie dolicza czasu, zatrzymanie przez `act`, który przed działaniem
czyta zegar. Przycisk „Kup” idzie za tym, kiedy
symulacja przyjmuje kupno (`purchaseOpen` z `skills.ts`): jest wyłączony tylko wtedy, gdy przejście
ręczne trwa, a przy postaci przejścia, które czeka albo się skończyło, ekran pisze, od kiedy kupiony
stopień działa. Funkcje układające tekst, `loopLine` z `team-lines.ts`
i `branchText` z `character-skills.ts`, są czystymi funkcjami; nic nie rysują, więc ekran
może je importować; import czystych funkcji dopuszcza D-265 niezależnie od statusu pliku.
Nowy ekran kopiuje ten wpis i dopisuje jeden wiersz w tabeli rejestru w `game-view.ts`.

### Pasek menu w Reactcie

`src/browser/view/menu-bar.tsx` jest paskiem menu w Reactcie, który stoi w nagłówku strony.
`createPagePlaces` z `page-places.ts`, wołana z `startApp` w `app.ts`, tworzy go
i wkłada jego element (`bar.element`) do nagłówka jako pierwszy; linia zapisu (`saveLine`) stoi w nagłówku pod nim. Granica ma ten sam kształt co
przy ekranie Postać: `createMenuBar({ client, onLogout, props })` zwraca `element`,
`update(props)` i `dispose()`. Strona daje pasku konto albo `null` (wtedy stoi sama nazwa
gry), ekran, na którym jest gracz, pozycję „Wróć do przejścia” i stan wylogowania.

Pasek nie zna gry ani zapisu. „Wyloguj” stoi w menu „Konto”: pasek tylko je zgłasza
przez `onLogout`, a `logOut` z `page-game-acts.ts` najpierw zapisuje grę, potem kończy sesję; pasek pokazuje
czekanie i zdanie, które strona mu daje. Zdarzenia dokumentu menu otwartego (Escape i
kliknięcie poza menu) są w Efekcie z listą zależności `[open]` i funkcją sprzątającą, jak
wymaga D-267. „Wyślij ponownie” pasek wysyła sam przez `client`.

### Kontrolki i ich aktualizacja

`src/browser/view/waiting-screen.tsx` jest ekranem oczekiwania w korzeniu Reacta,
który rysuje tylko on. `createWaitingScreen` zwraca element `session-check`
do umieszczenia na stronie, `update(waiting)`, `focusRetry()` i `dispose()`;
pierwsze rysowanie jest synchroniczne. `createPagePlaces` z `page-places.ts`, wołana z `startApp` w `app.ts`, tworzy
ekran raz, a `change` przy zmianie stanu strony woła `update` ze stanem `asking`, `refused`,
`retrying` albo `stopped`, zamiast budować ekran od nowa: tekst „Sprawdzanie
logowania…”, ostrzeżenie i przycisk „Spróbuj ponownie” stoją w komponencie na
stałych miejscach, więc przycisk w stanach `refused` i `retrying` jest tym
samym elementem. Przycisk czekający na serwer traci fokus, więc po każdej
odmowie strona woła `focusRetry()`, który przenosi fokus na przycisk, który już
stoi na stronie. Taki podział jest przykładem dla edytowalnych kontrolek
ekranu. Każdy moduł nie musi mieć `update()`, a elementy statyczne mogą być
przebudowywane.

Wspólne kontrolki w `src/browser/view/controls/` budują ekrany; kontrolka, która
czeka na serwer, zmienia się w miejscu. `ReactButton` z `waitingText` wyłącza
przycisk, podmienia jego tekst na napis oczekiwania i oznacza go jako zajęty,
a z `waitingText` równym `null` pokazuje swój tekst; z `disabled` zostaje
wyłączony z tekstem, który ma. Pola formularza blokuje `disabled` pola, zdanie
odmowy albo braku połączenia pokazuje `ReactFormWarning`, a zdanie spokojne,
które nie jest odmową, `ReactFormNote`, oba z `react-text-field.tsx`. Pole hasła
to `ReactPasswordField`, a przycisk, który wysyła formularz, dostaje `submit`.
Rodzaj przycisku ustawia `kind`: akcja poboczna, zakładka i główny wygląd poza
formularzem („Wejdź” w „Kto idzie”) to rodzaje `secondary`, `tab` i `main`,
a zwykły przycisk z tekstem w `positive` („Odbierz” w raporcie Siedziby) to
rodzaj `positive` (D-44). Przycisk wybrany w grupie ma `selected`. Wspólne
kontrolki w `src/browser/view/controls/` to `ReactButton`, `ReactTextField`,
`ReactPasswordField`, `ReactFormWarning`, `ReactFormNote`, `ReactSelectList`,
`ReactNumberField` i `ReactPickCell`. Wyłączony przycisk traci fokus, więc
ekran po odpowiedzi ustawia go na kontrolce, od której gracz zaczął.

### Gra na stronie i odpowiedzi serwera

Ten przykład dotyczy strony startowej, która ustawia miejsca i korzenie Reacta,
nie nowego ekranu (D-265, D-407).

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

To, co strona pokazuje, jest jedną wartością `PageState` (typ z `page-places.ts`) z danymi właściwymi dla
jej rodzaju: `checking` (ekran oczekiwania i jego stan `Waiting`), `card` (karta
logowania) albo `game` (gra z kontem, miejscem, zdaniami nad grą, stanem
wylogowania i stanem resetu). Wartość zmienia tylko funkcja `change`, którą daje `createPagePlaces`: zamyka
kartę albo grę, których następna wartość nie trzyma, i rysuje z niej miejsca
strony — nagłówek, blok główny, zdania nad grą i pasek menu. Wartości, które
mają przeżyć przejście między rodzajami — oczekujące zdanie potwierdzenia,
wiadomość rejestracji, to, czy gra zastępuje grę przegraną w konflikcie, sposób
wejścia do gry, stan zachowany po 401, numer ostatniego żądania, znacznik awarii
i fokus karty po odrzuconym odnośniku albo „Anuluj” — stoją osobno, w jednym
zapisie pamięci strony `PageMemory` (typ z `page-places.ts`). `startApp` tworzy
miejsca strony oraz ten zapis i podaje je jako parametr funkcjom strony: tym
z `app.ts`, które sprawdzają sesję, wczytują i budują grę i stawiają kartę,
i działaniom na stojącej grze z `page-game-acts.ts` — wylogowaniu, resetowi gry,
wstrzymywaniu wyników zapisującego i miejscu gry; co wołają z powrotem w
`app.ts` wylogowanie i reset gry, dostają przez ten sam parametr (`page.calls`),
a wstrzymywanie wyników — jako funkcję w osobnym argumencie. Strona buduje
przez API DOM tylko nagłówek i blok główny (w `createPagePlaces`), host każdego korzenia stawia fabryka
tego korzenia, a panel w miejscu zdjętej karty buduje `createFailureCard`
z `account-card.tsx`; każde miejsce, które pokazuje coś poza ekranami gry, ma
korzeń Reacta: pasek menu,
ekran oczekiwania (`waiting-screen.tsx`), zdania nad grą (`page-sentences.tsx`),
wiersz zapisu i wiersz awarii (`header-rows.tsx`) oraz karta logowania. Zdanie
potwierdzenia adresu i zdanie o zapisie, który się nie wczytał, rysuje
`PageSentence` z `page-sentences.tsx`, w korzeniu zdań nad grą albo w karcie
(D-407, D-286, D-96).

`createGameView` z `game-view.ts` składa magazyn stanu gry (`state-store.ts`), stan ekranu
Przejście (`run-screen-state.ts`) i rejestr ekranów (`screen-registry.ts`) i zwraca element gry,
wiersz zapisu (`saveLine`) do ustawienia w nagłówku pod paskiem menu, metody zapisu (`saveNow`,
`saveBeforeLogout`, `keep`), `halt()` i `dispose()`. Wiersz zapisu i metody zapisu pochodzą
z magazynu, który trzyma zegar i zapisującego; `dispose()` zatrzymuje w magazynie zegar
(`dispose()` z `clock.ts`) i zapisującego, zdejmuje ekrany w rejestrze, a element gry i wiersz
zapisu zdejmuje ze strony, razem z ich obsługą zdarzeń; moduł, który tworzy grę, wywołuje
`dispose()`, zanim ją porzuci. Wynik zapisu
dociera do strony wywołaniami `onConflict`, `onOutdated` i `onSignedOut`. „Wyloguj” stoi
w menu „Konto” na pasku menu w nagłówku (`menu-bar.tsx`); pasek tylko je zgłasza, a
`logOut` z `page-game-acts.ts` najpierw zapisuje grę przez `saveBeforeLogout`, dopiero potem kończy sesję.

Błąd, którego nie obsłużył żaden kod gry, trafia do `installLastResort` z `last-resort.ts`,
który `startApp` instaluje na oknie: zdarzenia `error` i `unhandledrejection` są
anulowane, w konsoli staje jeden wiersz `uncaught kind=… code=… place=…`, a przy
każdym wierszu, którego strona jeszcze nie napisała, moduł wywołuje opcjonalne
wywołanie zwrotne `onLine` z rodzajem, kodem i miejscem (`app.ts` podpina do niego
metodę klienta konta `reportBrowserFailure`, która wysyła te trzy słowa serwerowi;
jej wynik jest pomijany, a jej błąd nie staje się błędem obsługi, D-356), a `halt()`
gry sprawia, że magazyn stanu odrzuca każdy kolejny wynik symulacji i zegar staje,
więc zapis dalej wysyła ostatni cały stan, czytany bez odczytu zegara; po błędzie strona
nie buduje już gry, a logowanie kończy się na ekranie oczekiwania ze zdaniem (D-323, D-253).
Zdanie o awarii stoi w wierszu pod paskiem menu obok wiersza zapisu. Wiersz awarii
jest korzeniem Reacta, który nie rysuje nic innego: `createFailureRow` rysuje go
raz, przy starcie strony, w hoście ukrytym od początku, a `onUncaught` tylko
odkrywa host, bez renderu, więc błąd rysowania w innym korzeniu nie zdejmuje
zdania (D-323, D-407). Korzenie Reacta bez własnej obsługi przekazują błąd oknu
przez `reportError`.

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
- `src/browser/view/headquarters.tsx`
- `src/browser/kitchen-sink/`
- `tests/view/shared-controls.test.mjs`
