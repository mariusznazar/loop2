# Coding guidelines — simulation-module

- **Discipline:** coding
- **Applies to:** simulation

## When to read

Przed dodaniem lub zmianą modułu symulacji w `src/browser/sim/`, poza danymi
treści gry. Czytaj również ogólne wytyczne kodowania.

## Files of this kind

| File | Status | Decision |
|---|---|---|
| `src/browser/sim/game.ts` | exemplar | D-35 |
| `src/browser/sim/hex.ts` | copy | — |
| `src/browser/sim/layout.ts` | copy | — |
| `src/browser/sim/program.ts` | copy | — |
| `src/browser/sim/random.ts` | copy | — |
| `src/browser/sim/run.ts` | copy | — |
| `src/browser/sim/types.ts` | copy | — |

## Rules

### Izolacja symulacji

- **Decision:** D-04
- **Invariant:** simulation-isolation
- **Good:** Upływ czasu trafia do obliczenia jako argument.
- **Bad:** Obliczenie odczytuje czas systemowy.

Importuj wyłącznie pliki symulacji. Korzystaj z obiektów języka JavaScript,
bez strony, timerów, czasu systemowego i obiektów środowiska uruchomienia.

```good simulation-isolation src/browser/sim/guideline-time.ts
export function elapsed(start: number, now: number): number {
  return now - start;
}
```

```bad simulation-isolation src/browser/sim/guideline-time.ts
export function elapsed(start: number): number {
  return Date.now() - start;
}
```

### Niezmienione argumenty

- **Decision:** D-04
- **Invariant:** simulation-inputs
- **Good:** Eksportowana funkcja tworzy wynik bez zapisywania do argumentu.
- **Bad:** Eksportowana funkcja dodaje pole do przekazanego obiektu.

Twórz nowy stan zamiast zmieniać przekazany stan lub osiągalne z niego wartości.

```good simulation-inputs src/browser/sim/guideline-copy.ts
export function copyValue(value: object): object {
  return { ...value, guidelineChanged: true };
}
```

```bad simulation-inputs src/browser/sim/guideline-copy.ts
export function copyValue(value: object): object {
  Object.assign(value, { guidelineChanged: true });
  return value;
}
```

## Examples

### Stan i zdarzenia

`src/browser/sim/game.ts` przyjmuje jawny stan oraz dane operacji. Zwraca stan
i zdarzenia przez `GameResult`; `passRealTime` przyjmuje liczbę milisekund,
a `advanceMinutes` liczbę minut gry. Widok przekazuje wybory gracza do tych
funkcji. Pomocnik obliczający mniejszy wynik może zwracać własny odpowiedni typ;
nie musi opakowywać go w `GameResult`.

## Where in code

- `src/browser/sim/`
- `src/browser/sim/game.ts`
