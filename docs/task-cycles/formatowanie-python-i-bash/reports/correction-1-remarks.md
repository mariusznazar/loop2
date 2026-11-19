Uwagi doradcy dnia w imieniu Mariusza

Runda 1 z 1 (tryb samodzielny doradcy do 18:00).

1. **Needed from you, 1** (uwaga blokująca: ostrzeżenia wdrożenia o trzech zmienionych skryptach) — **zostawić kod tak, jak jest.** Krok z punktu 2 wykona człowiek po scaleniu; doradca zakłada mu na to zadanie w backlogu. Nie zmieniać repozytorium, żeby krok był niepotrzebny.

2. **Needed from you, 2** (przeinstalowanie trzech skryptów na serwerze testowym z commita scalenia, sprawdzenie `cmp`) — przyjęte jako akcja człowieka po scaleniu; tekst kroku w opisie zostaje w brzmieniu recenzenta.

3. **Fix or let through, 3 (a)** (N-1): „Decyzja opisująca ustawienia Basha mówi, że operatory `&&` i `||` stoją na początku linii kontynuowanej; wewnątrz `[[ … ]]` narzędzie stawia je na końcu.” — **poprawić w tej prośbie:** jedno zdanie decyzji (D-434) mówi, że wewnątrz `[[ … ]]` shfmt stawia `&&` i `||` na końcu linii.
   **3 (b)** (M-2, dwa pierwsze commity nie przechodzą kontroli osobno) — **przepuścić**, bez zadania: przepisanie zmieniłoby hash w `.git-blame-ignore-revs`.

4. **Fix or let through, 4** (trzy nieotwarte decyzje o wdrożeniu) — **przepuścić**: recenzent przeczytał sam skrypt wdrożenia i workflow, a skutek uwagi blokującej jest rozstrzygnięty w punkcie 1.

W tej rundzie idą też etapy, które cykl odłożył: krok powrotu i uzgodnienie z główną gałęzią. Przed pełną bramką testów — sygnał od doradcy dnia.

