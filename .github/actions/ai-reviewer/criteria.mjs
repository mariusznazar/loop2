// The six review criteria. A score of 1 and a score of 10 are both described, so a score does not
// rest on the model's own taste. The texts are Polish because they reach the pull request comment.
export const CRITERIA = [
  {
    id: "correctness",
    label: "Poprawność",
    low: "zmiana nie robi tego, co obiecuje opis, albo psuje istniejące zachowanie",
    high: "zmiana robi dokładnie to, co obiecuje, razem z przypadkami brzegowymi",
  },
  {
    id: "conventions",
    label: "Zgodność z repozytorium",
    low: "zmiana ignoruje nazewnictwo i wzorce otaczającego kodu",
    high: "zmiana czyta się jak reszta repozytorium",
  },
  {
    id: "simplicity",
    label: "Prostota",
    low: "zbędne warstwy, kod martwy albo rozwiązanie szersze niż problem",
    high: "najprostsza forma, która rozwiązuje problem",
  },
  {
    id: "tests",
    label: "Testy i ryzyko",
    low: "ryzykowna zmiana bez testu albo test przepisujący wynik kodu jako oczekiwanie",
    high: "testy sprawdzają zachowanie z perspektywy gracza, a wartość oczekiwana pochodzi z decyzji",
  },
  {
    id: "documentation",
    label: "Ślad decyzji",
    low: "zmiana zachowania bez śladu w opisie PR-a i w dokumentach repozytorium",
    high: "opis PR-a i dokumenty mówią, co się zmieniło i dlaczego",
  },
  {
    id: "security",
    label: "Bezpieczeństwo",
    low: "sekret w kodzie, brak autoryzacji albo niezaufane dane użyte bez kontroli",
    high: "zmiana nie wnosi nowego ryzyka, a dane spoza systemu są sprawdzane",
  },
];
