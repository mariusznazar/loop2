# Coding guidelines — browser-module

- **Discipline:** coding
- **Applies to:** browser-view

## When to read

Przed dodaniem lub zmianą modułu widoku w `src/browser/view/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/view/status-row.ts` | exemplar | D-36@39db0c31 |
| `src/browser/view/app.ts` | copy | — |
| `src/browser/view/clock.ts` | copy | — |
| `src/browser/view/credits.ts` | copy | — |
| `src/browser/view/footer.ts` | copy | — |
| `src/browser/view/program-editor.ts` | copy | — |
| `src/browser/view/send-panel.ts` | copy | — |
| `src/browser/view/terrain-panel.ts` | copy | — |
| `src/browser/view/terrain-picture.ts` | copy | — |
| `src/browser/view/tile-list.ts` | copy | — |

## Rules

### TypeScript i DOM

- **Decision:** D-03@fb5aa3b0
- **Invariant:** browser-view-framework@bf7d386f
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

- **Decision:** D-18@9cf9e4c8
- **Invariant:** content-identifiers@a88c3389
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

## Where in code

- `src/browser/view/`
- `src/browser/view/status-row.ts`
