mariusznazar 2026-10-05T18:00:02Z
**Poprawka po przeglądzie.** `main` przypina teraz the way `96c5248` (PR #4), z zmianami wyciągniętymi z odczytu tego przebiegu. Powtórz etapy:

1. Scal aktualny `main` do `task/app-skeleton`, razem z nowym przypięciem.
2. **Krok fundamentu i krok powrotu według WAY-126.** Przeczytaj wpisy zaprojektowane w definicji MVP (`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`, sekcja „Projected foundation changes”). Wnieś do `foundations/` te, które kod szkieletu czyni prawdziwymi teraz: w całości z zatwierdzeniem z bramki, a część wpisu jako propozycję. Dotyczy to co najmniej niezmienników `loop2-api-error-route/1` i `account-server-typecheck/1` oraz zatwierdzonych wyborów technologii w zakresie, który szkielet realizuje. Wycofaj propozycje `unmatched-api-response/1` i `application-type-check/1`: dublują wpisy zaprojektowane. Kod zmieniaj tylko tam, gdzie wymaga tego krok fundamentu.
3. Prefiks decyzji produktu: `D`, numeracja od `D-01`.
4. **Wybory autonomiczne:** podziel je testem „czy koszt pomyłki sięga poza ten PR”. Dotyczy to co najmniej portu 3000 i TypeScriptu 6.
5. **Zapis cyklu w nowej formie:** spec i plan z `docs/superpowers/` przenieś do zapisu cyklu, bez kopii tego, co trzyma git. Na końcu para commitów (dodanie i usunięcie `docs/task-cycles/`), a linki w opisie PR-a po SHA.
6. Zaktualizuj opis PR-a.

