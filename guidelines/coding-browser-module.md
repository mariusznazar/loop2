# Coding guidelines — browser-module

- **Discipline:** coding
- **Applies to:** browser-view

## When to read

Przed dodaniem lub zmianą modułu widoku w `src/browser/view/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/view/status-row.ts` | exemplar | D-36 |
| `src/browser/view/app.ts` | copy | — |
| `src/browser/view/clock.ts` | copy | — |
| `src/browser/view/credits.ts` | copy | — |
| `src/browser/view/footer.ts` | copy | — |
| `src/browser/view/headquarters.ts` | copy | — |
| `src/browser/view/program-editor.ts` | copy | — |
| `src/browser/view/terrain-panel.ts` | copy | — |
| `src/browser/view/terrain-picture.ts` | copy | — |
| `src/browser/view/tile-list.ts` | copy | — |

## Rules

### TypeScript i DOM

- **Decision:** D-03
- **Invariant:** browser-view-framework
- **Good:** Moduł TypeScript tworzy element przez API przeglądarki.
- **Bad:** Moduł widoku importuje dodatkowy framework UI.

Buduj widok w TypeScript przez DOM, bez dodatkowego frameworka UI w kodzie
lub zależnościach uruchomieniowych.

```good browser-view-framework src/browser/view/guideline-element.ts
export function createLabel(): HTMLElement {
  return document.createElement("span");
}
```

```bad browser-view-framework src/browser/view/guideline-element.ts
import "react";
export function createLabel(): HTMLElement {
  return document.createElement("span");
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

## Examples

### Kontrolki i ich aktualizacja

`src/browser/view/status-row.ts` tworzy przyciski raz, a przy zmianie stanu
aktualizuje tekst istniejących elementów. Dzięki temu przycisk zachowuje fokus.
Obsługa kliknięć przekazuje działania do aplikacji przez `StatusRowControls`;
aplikacja wywołuje symulację. Taki podział jest przykładem dla edytowalnych
kontrolek. Każdy moduł nie musi mieć `update()`, a elementy statyczne mogą być
przebudowywane.

Wspólne kontrolki w `src/browser/view/controls/` budują ekrany; kontrolka, która
czeka na serwer, zmienia się w miejscu. `setButtonWaiting` z `button.ts` wyłącza
istniejący przycisk i podmienia jego tekst na napis oczekiwania, a wywołana
z `null` przywraca tekst; pola formularza blokuje się przez `input.disabled`,
a zdanie odmowy albo braku połączenia pokazuje `createFormWarning` z
`text-field.ts`. Pole hasła to `createPasswordField`, a przycisk, który wysyła
formularz, dostaje `submit: true`. Wyłączony przycisk traci fokus, więc ekran
po odpowiedzi ustawia go na kontrolce, od której gracz zaczął.

### Gra na stronie i odpowiedzi serwera

`src/browser/view/app.ts` buduje grę dopiero wtedy, gdy serwer potwierdzi
konto, i usuwa ją dopiero wtedy, gdy potwierdzi wylogowanie (D-96, D-97).
`createGameView` z `game-view.ts` zwraca element gry i `dispose()`, które
zatrzymuje zegar (`dispose()` z `clock.ts`) i zdejmuje element ze strony,
a z nim jego obsługę zdarzeń; moduł, który tworzy grę, wywołuje `dispose()`,
zanim ją porzuci. Każde żądanie ekranu dostaje kolejny numer, a odpowiedź
działa tylko wtedy, gdy jej numer jest ostatni, więc spóźniona odpowiedź nie
buduje gry ani nie nadpisuje nowszego stanu. Brak sesji ekran rozpoznaje po
odmowie ze statusem 401 w wyniku klienta z `account-api.ts`, a każdą inną
porażkę pokazuje jako jedno ostrzeżenie; treści odpowiedzi nie czyta.

## Where in code

- `src/browser/view/`
- `src/browser/view/status-row.ts`
