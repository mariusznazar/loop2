# Coding guidelines — content-data

- **Discipline:** coding
- **Applies to:** simulation

## When to read

Przed dodaniem lub zmianą pliku danych treści gry w `src/browser/sim/data/`.
Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/sim/data/resources.ts` | exemplar | D-34@3c028ef9 |
| `src/browser/sim/data/actions.ts` | copy | — |
| `src/browser/sim/data/archetypes.ts` | copy | — |
| `src/browser/sim/data/balance.ts` | copy | — |
| `src/browser/sim/data/conditions.ts` | copy | — |
| `src/browser/sim/data/maps.ts` | copy | — |

## Rules

### Izolacja symulacji

- **Decision:** D-04@3b3dcdc2
- **Invariant:** simulation-isolation@1f3aec19
- **Good:** Dane są stałą, niezależną od zegara i środowiska uruchomienia.
- **Bad:** Dane odczytują czas systemowy podczas importu.

Importuj wyłącznie pliki symulacji. Nie odczytuj strony, timerów, czasu
systemowego ani obiektów dodawanych przez przeglądarkę lub Node.js.

```good simulation-isolation src/browser/sim/data/guideline-case.ts
export const initialCount = 0;
```

```bad simulation-isolation src/browser/sim/data/guideline-case.ts
export const initialCount = Date.now();
```

## Examples

### Typowany katalog

`src/browser/sim/data/resources.ts` pokazuje katalog sprawdzany przez `satisfies`
oraz typ identyfikatora wyprowadzony z kluczy przez `keyof typeof`.
Nazwę i ikonę widok odczytuje z danych przez otrzymany identyfikator.
To przykład przydatny dla katalogu; pozostałe dane mogą mieć inny kształt.

## Where in code

- `src/browser/sim/data/`
- `src/browser/sim/data/resources.ts`
