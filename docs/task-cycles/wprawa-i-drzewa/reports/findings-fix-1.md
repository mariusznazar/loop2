# Blocking findings for fix 1

Verbatim Important findings from review.md, reviewed head adc6e548095e56860964fc7f1e4df71d3a11db0f.

## Important

### R1. Tymczasowe ustalenia MVP zapisano jako bezwarunkowe decyzje

**Nowy wątek. Kotwica:** [foundations/decisions.md:1232](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L1232). Dalsze miejsca: [D-182:3226](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3226), [D-184:3256](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3256), [D-188:3316](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/foundations/decisions.md#L3316).

**Do wklejenia:** W przyjętych ustaleniach udźwig 15, brak gałęzi podnoszącej udźwig, brak gałęzi w edytorze poza przejściem, brak cofania zakupów i zapłata za każde domknięcie opisują to, co gra robi **dziś**; nowe decyzje pomijają to zastrzeżenie. Przywróć tę kwalifikację w D-64, D-182, D-184 i D-188 oraz zastosuj przyjętą w Q7 zasadę brzmienia nowych wpisów. Inaczej fundament mówi o trwałym wykluczeniu wariantów, które człowiek świadomie zostawił otwarte.

**Dlaczego to zgłaszam:** Fundament jest podstawą późniejszych zmian, więc istotna jest nie tylko zgodność z obecnym kodem, lecz także zakres przyjętej decyzji. [Zamrożone zadanie, Q7:71](../task.md#L71) przyjmuje zastrzeżenie „to są elementy na potrzeby mvp / docelowo się zmienią” i wymaga, aby wykluczenia opisywały to, czego gra dziś nie ma. Wiersze 4, 6, 9 i 12 tabeli [Settlements to record:171](../task.md#L171) zawierają tę kwalifikację wprost. Tymczasem D-64 mówi „Carrying capacity is 15 pieces, and the character skill trees have no branch that raises it.”, a D-188 „There is no purchase in the map-run view and no undo of a purchase.” D-182 utrwala każde domknięcie bez „currently”, choć zadanie 14 ma zmienić tę zasadę. To rozszerzenie przyjętego znaczenia, nie uwaga o stylistyce. D-184, a także nowe D-187 i D-189 wracają ponadto do wykluczającego „without”/„only”, przed którym Q7 ostrzega. Poprawka dotyczy nowych zapisów przez właściwy skill fundamentu; projektowane wpisy, które Q7 jawnie wyłącza z tej reguły, mają zachować uzgodnione brzmienie. Ocena Important wynika z utraty kwalifikacji przy zapisie źródła, zgodnie z regułą przeglądu WAY-263.

### R2. Test walki nie sprawdza dopisania jej wprawy do przejścia

**Nowy wątek. Kotwica:** [tests/sim/skills.test.mjs:430](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L430). Mechanizm: [src/browser/sim/skills.ts:128](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/skills.ts#L128) oraz [src/browser/sim/run.ts:611](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/run.ts#L611).

**Do wklejenia:** Test sprawdza wprawę zwróconą przez `resolveCombat`, ale nie sprawdza wprawy przejścia po odebraniu wyniku walki. Stryker pozostawił mutację 575, która w `sumPractice` odejmuje wynik walki zamiast go dodawać. Dodaj przypadek rozstrzygnięcia walki przez przejście z wcześniejszą wprawą i jawną oczekiwaną sumą.

**Dlaczego to zgłaszam:** Właśnie suma w przejściu trafia na ekran i przy domknięciu do postaci. Obecny test daje dowód, że walka policzyła np. dwa skuteczne ciosy, lecz nie dowodzi, że gracz je dostanie. Zmiana `+ right[id]!` na `- right[id]!` przechodzi cały zestaw mutacyjny 28 plików, a dodatkowa analiza typów nie zgłasza dla niej błędu. Przykładowo przejście z `smallItemGathering: 7, oneHandedCombat: 3`, po walce dającej dwa ciosy, powinno mieć odpowiednio 7 i 5; mutacja daje 7 i 1. Przypadek powinien przekroczyć rzeczywiste rozstrzygnięcie walki w minucie przejścia, sprawdzić obie umiejętności i zachowanie wejścia. To ochrona głównego nowego wymagania — sumowania skutecznych działań — a nie podnoszenie wyniku mutacji. Dowód: ID 575 w [raporcie Strykera](review-mutation.json) i [klasyfikacji](review-mutations.md).

### R3. Testy premii nie odróżniają działania własnej gałęzi od premii innych akcji

**Nowy wątek. Kotwica:** [tests/sim/skills.test.mjs:220](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/tests/sim/skills.test.mjs#L220). Mechanizm: [src/browser/sim/skills.ts:75](https://github.com/mariusznazar/loop2/blob/adc6e548095e56860964fc7f1e4df71d3a11db0f/src/browser/sim/skills.ts#L75).

**Do wklejenia:** Wszystkie przypadki skracania akcji ustawiają pojedynczą gałąź pasującą do badanej akcji, więc przechodzą także po całkowitym wyłączeniu filtrowania premii po akcji — mutacja 538. Sprawdź postać z co najmniej dwiema różnymi gałęziami skracającymi czas i potwierdź osobno czas ich akcji. Na przykład Szybki posiłek 1 oraz Długi krok 1 powinny dać jedzenie 4 minuty i krok 3 minuty.

**Dlaczego to zgłaszam:** W grze postać może legalnie kupić jednocześnie gałęzie wielu drzew. Nowy wspólny kalkulator sumuje efekty wszystkich gałęzi, a ich lista akcji jest tym, co powstrzymuje przenikanie premii. Mutacja 538 zastępuje całe sprawdzenie tej listy wartością `false`: w przykładzie obie akcje trwają po 2 minuty, ponieważ obie dostają sumę 1+2. Wszystkie testy mutacyjne nadal przechodzą, a kod nadal przechodzi analizę typów. Dodatkowy przypadek z różnymi premiami i liczbami wyprowadzonymi z zadania ochroni regułę, że każda gałąź zmienia wskazane działanie. Nie potrzeba testować każdej kombinacji zakupów. Dowód: ID 538 w [raporcie Strykera](review-mutation.json).

