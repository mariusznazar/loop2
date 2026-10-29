## Important findings

### R1 — False group and rule conditions are not protected in combat

- Scope: in scope; blocking.
- Responsible slice: **3**, commit `ba80da339059dc55ee206f75f22a9c745897efe0`; slice **7**, commit `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9`, did not add the promised invariant coverage that would close this gap.
- Anchor: [tests/sim/combat.test.mjs:154](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/combat.test.mjs#L154), also its rule-condition case at line 142; implementation branches [src/browser/sim/program.ts:270](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/src/browser/sim/program.ts#L270) and line 272.
- Thread: new review finding.

**Do wklejenia:** Oba nowe testy warunków walki sprawdzają warunek prawdziwy po pierwszym ciosie: zdrowie wynosi 93, a próg 94. Usunięcie sprawdzania warunku grupy albo warunku reguły nadal przechodzi cały zestaw symulacji. Dodaj niezależne przypadki fałszywej pierwszej grupy i fałszywej pierwszej reguły, z przejściem do późniejszej reguły oraz kontrolą, że właściwy warunek rzeczywiście może wybrać wcześniejszą.

**Dlaczego to zgłaszam:** To podstawowe znaczenie programu walki z To do 4, spec §1 i zmienionego niezmiennika `program-rule-pick`, a nie poszerzenie o inny rodzaj strategii. W obecnych testach zarówno „sprawdź warunek”, jak i „zawsze wykonaj pierwszą regułę” dają ten sam wynik. Stryker mutants **199** i **203** zastąpiły odpowiednio `!conditionHolds(group...)` i `!conditionHolds(rule...)` przez `false`; oba przeżyły. Taka regresja każe postaci wykonywać np. odskok z grupy dla niskiego zdrowia mimo niespełnionego warunku i ignorować zapisaną przez gracza kontrę. Przejście dotychczasowego Pythonowego testu wyboru reguły tego nie dowodzi: jego scenariusze pozostają zwykłymi minutami Lasu. Własna próba recenzenta używa zdrowia 93/progu 50 i zdrowia przeciwnika 24/progu 10, sprawdza późniejszą regułę oraz dwa niezależne przypadki przełączenia warunku; poprawny kod przechodzi. Należy zachować tę ochronę w testach produktu, wraz z adnotacją niezmiennika.

### R2 — The first wolf can be omitted from permanent Understanding without a test failing

- Scope: in scope; blocking.
- Responsible slices: **5**, commit `e7c9912d95c987254b13a9ec7c9fc3973c5f1243`, adds the permanent creature merge; **6**, commit `471597bbe8defb909ed0fff2baeb6de2baa70902`, owns the first/repeated attack integration tests.
- Anchor: [tests/sim/encounters.test.mjs:344](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L344); missing protection for [src/browser/sim/understanding.ts:297](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/src/browser/sim/understanding.ts#L297).
- Thread: new review finding.

**Do wklejenia:** Test pierwszego odkrycia wilka sprawdza chwilowy komunikat `discovery`, ale nie zapis wilka w `understanding.creatures`. Mutacja zerująca tę trwałą listę przechodzi wszystkie testy symulacji, przez co kolejne napaści mogłyby znów zatrzymywać grę jako nowe odkrycie. Sprawdź trwałą wiedzę po rzeczywistym odkryciu i użyj tego stanu do kolejnej napaści oraz zachowania wiedzy po restarcie lub zakończeniu.

**Dlaczego to zgłaszam:** Zadanie wymaga pierwszego odkrycia, wspólnej wiedzy i braku ponownej pauzy przy znanym wilku; spec §6 oraz D-118/D-119/D-143 dotyczą wiedzy zachowanej w grze, nie tylko treści jednego komunikatu. Mutant **403** zastępuje wynik `creatures: [...understanding.creatures, ...revealed.creatures]` przez `[]` i przeżywa. Testy odkrycia sprawdzają `state.discovery.creatures`, natomiast test znanej napaści zaczyna od niezależnie przygotowanej pełnej wiedzy. Nie łączą tych dwóch etapów. Wtedy gracz widzi poprawny pierwszy komunikat, ale wilk nie zostaje zapamiętany i następna napaść ponownie pauzuje. Własna próba recenzenta przechodzi na obecnym kodzie: sprawdza `understanding.creatures` po odkryciu, po `restart` i `end`, rozstrzyga pierwsze starcie, a po jawnie przygotowanej granicy karencji sprawdza drugą napaść bez `discovered` i bez pauzy. Nie trzeba zamrażać całego stanu gry ani rozszerzać testu na przyszłe stworzenia; trzeba zabezpieczyć nowy wymagany zapis i jego bezpośredni skutek.

### R3 — Slice 7 did not extend splitting and replay checks to combat

- Scope: in scope; blocking.
- Responsible slice: **7**, commit `b960201d82830ce72767fbd6f1b5f2bb9b2ac4a9`.
- Anchors: [tests/invariants/test_minute_span_split.py:86](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_minute_span_split.py#L86), [tests/invariants/test_map_run_repeatability.py:52](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/invariants/test_map_run_repeatability.py#L52), and [tests/sim/encounters.test.mjs:440](https://github.com/mariusznazar/loop2/blob/23daea55f5984d99bacfeadb6681b44eb6705fb1/tests/sim/encounters.test.mjs#L440).
- Thread: new review finding.

**Do wklejenia:** Wymagane porównania podziału czasu i powtarzalności nie obejmują nowej walki: istniejące scenariusze niezmienników nadal wysyłają postać wyłącznie do `forest`, a test restartu napaści porównuje ziarno i początek strumienia, bez odtworzenia przebiegu. Dodaj utrzymywane porównania pełnego stanu i kolejności zdarzeń dla napaści, odkrycia, M+5 oraz końców w walce, a także odtworzenie napaści i tur po restarcie na tym samym ziarnie. Samo ponowne uruchomienie starych zestawów nie wykonuje tego zakresu.

**Dlaczego to zgłaszam:** Spec §8 jawnie wymaga, aby stałe testy chroniły powtarzalność i dzielenie czasu na nowych przypadkach. Plan Slice 7 precyzuje porównanie pełnego stanu i kolejności zdarzeń do odkrycia i obu końców. Ta zmiana dodaje drugą fazę minuty, przerwanie aktualnej czynności, oddzielny strumień losowy i rozstrzygnięcie wielu wymian w M+5, więc kontrola ograniczona do starej mapy nie dotyka nowego miejsca ryzyka. Jedyną zmianą slice 7 jest udana próba niezmieniania wejść w `test_simulation_inputs.py`. Raport autora twierdzi, że `encounters.test.mjs` zawiera już „split advancement”, lecz żaden z jego 20 testów nie porównuje przebiegu w jednej porcji z równoważnymi porcjami czasu ani nie odtwarza ukończonej walki po restarcie. Porównanie `stepMinute` z jednym wywołaniem `advanceMinutes(..., 1)` sprawdza zgodność dwóch wejść do pojedynczej minuty, a nie ten niezmiennik. Własny scratch porównuje stan i zdarzenia przy porcjach `[10]`, dziesięciu porcjach `[1]` i `[2,3,5]` dla pierwszej/znanej napaści, śmierci, wcześniejszego domknięcia oraz domknięcia M+5; obecny kod przechodzi. Nadal brakuje utrzymywanej ochrony oraz właściwego odtworzenia przebiegu ze strumieniem napaści. Nie wymagam zmiany każdej ścieżki z planu: te przypadki mogą trafić do najmniejszego właściwego istniejącego zestawu, ale muszą rzeczywiście wykonać i porównać nowy przebieg.

