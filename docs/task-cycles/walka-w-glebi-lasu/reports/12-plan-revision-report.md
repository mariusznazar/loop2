# Korekta planu przed wykonaniem

Status: **done with concerns**. Obie korekty z `reports/11-plan-corrections.md` są naniesione. Ten raport zastępuje ustalenia o podziale i wielkości z pierwotnego `reports/10-plan-report.md`, którego treść została zachowana. Pozostałe ustalenia, zasięg lektury i ograniczenie bazowej bramki pozostają aktualne. Nie rozpocząłem kodu, fundamentu ani bramki.

## Wynik

- Plan zawiera osiem kolejnych zakresów kodu lub testów. Każdy ma rzeczywistą zmianę przeznaczoną do niepustego zakresu commitów; nie dodano sztucznego pliku produktu.
- Dawny pomiar z zakresu 9 znajduje się w Checks zakresu 7. Przeniesiono całe wymagania pomiaru i potrzebne Read: ziarna 1–20, rzeczywisty seed run, minuty od zera, ciało i pusty plecak, jawna wiedza i otwarta mapa, pierwsza grupa z patykiem/kopnięciem, dokładne 17 reguł bazowego ACCEPTANCE_PROGRAM w drugiej grupie, limit 5000, wznowienie po odkryciach bez edycji, pełny program oraz wyniki wszystkich ziaren. Zachowano trzy ścieżki measurement.mjs, measurement-20-seeds.md i measurement-20-seeds.json.
- Dawny dowód z zakresu 10 znajduje się w Checks zakresu 8. Przeniesiono całe wymagania i Read: otwieranie mapy, pierwsza napaść, pauza/edycja/wznowienie, pięć minut i przebieg, oba momenty domknięcia, śmierć, pozostanie zapisu, restart/end, fokus, brak celu przerwanego kroku i wilka na rysunku. Zachowano browser-proof.md, browser-proof.mjs i wszystkie osiem nazw zrzutów. Przeglądarka pozostaje lokalna, z przechwyceniem testowej odpowiedzi konta.
- Te ignorowane artefakty są dowodami Checks, nie pozycjami Change ani osobnymi zakresami. Plan wprost wyklucza ich commitowanie.
- Zakres 6 ma Model: same z uzasadnieniem: przechodzi przez simulation, browser-view i build-tools oraz integruje kontrakty stanu, minuty i odkrycia. Pozostałe zakresy zachowują cheaper; wszystkie Risk: none.
- Foundation entries, Coverage, Depends on oraz Choices odpowiadają nowemu podziałowi. Zakres 7 obejmuje teraz również zależności F14 i F17. Nie usunięto wymagania zadania ani specu.

## Artefakty i sprawdzenie

Aktualny plan: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/plan.md`.

Aktualny pomiar: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/plan-size.md`.

Ten raport: `C:/Storage/repos/loop2-wt/walka-w-glebi-lasu/.runs/task-cycles/walka-w-glebi-lasu/reports/12-plan-revision-report.md`.

Z katalogu worktree wykonano:

| Komenda | Exit | Wynik |
|---|---|---|
| `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/walka-w-glebi-lasu/plan.md` | 0 | 8/8 fits; stdout zapisany jako UTF-8 w plan-size.md. |
| `python -` — jednorazowa kontrola struktury planu i SHA-256 raportu | 0 | Osiem nagłówków, brak dawnych zakresów, brak .runs w Change, zgodne modele i Risk, komplet zachowanych ścieżek dowodów, pierwotny raport niezmieniony. |

Zakres 7: 10 plików Change, 127 657 szacowanych tokenów. Zakres 8: 10 plików Change, 124 564 szacowane tokeny. Pozostałe wielkości nie zmieniły się. Nie było potrzeby dalszego podziału implementacji.

SHA-256 zachowanego raportu `reports/10-plan-report.md`: `e6cdc568478b6763489fec797c62feedd1eab4fa1b78d6424d7edc395a1828b5`.

## Co pozostaje przed wykonaniem

Zgodnie z handoffem orkiestrator uzupełni Read aktualnymi pełnymi wpisami fundamentu i ponowi pomiar przed rozpoczęciem produktu. Powiązana instrukcja Playwright MCP spoza repo nadal musi zostać przekazana autorowi zakresu 8. W tej korekcie nie pojawiło się nowe pytanie projektowe ani dodatkowy zasięg produktu. Kontrole produktu, pomiar ziaren, przeglądarka i analiza mutacyjna pozostają niewykonane; bazowy błąd opisany w pierwotnym raporcie nie jest naprawiany przez ten plan.
