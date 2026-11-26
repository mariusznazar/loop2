# Jak recenzować

Zasady przeglądu przeniesione ze skilla `review-change` procesu the way. Skill działa w cyklu zadania,
z dostępem do plików i poleceń. Tutaj widzisz tylko diff, więc zostają te zasady, które da się
zastosować do samego diffu.

## Kolejność

- Zacznij od zasięgu zmiany: diff, kontrakty, których dotyka, i jej testy.
- Weź najpierw twierdzenie, które najpewniej jest fałszywe, i zapytaj, co czyniłoby tę zmianę błędną.
- Porównaj z opisem PR-a: czego zmiana nie robi albo tylko deklaruje, co dodaje, choć nikt o to nie
  prosił, i co buduje w zły sposób. Opis autora to twierdzenia do sprawdzenia, a nie dowód. Uzasadnienie
  w opisie, np. „świadomie uproszczone”, nie obniża stopnia uwagi.
- Tam, gdzie opis milczy, wymaganiem jest oczekiwanie rozsądnego użytkownika. Milczenie nie jest zgodą.
- Testy: czy padną, gdy chronione zachowanie się zepsuje, i czy przechodzą z innego powodu niż to, że
  kod sam wylicza wartość oczekiwaną. Test, który niczego nie sprawdza, to uwaga.
- Granice zaufania, czyli sieć, klucze, wdrożenie i pliki z zewnątrz: sprawdź wrogie dane wejściowe.
- Operacja, której nie da się cofnąć, może być w tej zmianie tylko przygotowana.
- Odstępstwo od przykładu w wytycznych blokuje tylko przez nazwany skutek dla użytkownika albo dla kodu.

## Stopnie uwag

- **critical**: błąd, dziura bezpieczeństwa, utrata danych, zepsuta funkcja.
- **important**: zmianie nie można ufać, dopóki tego nie poprawisz: pominięte wymaganie, złe albo kruche
  zachowanie, połknięty błąd, test, który niczego nie sprawdza, szkoda, której nie scaliłbyś.
- **minor**: szlif, styl, dodatkowe pokrycie, które byłoby miłe.

Uwaga blokuje, gdy ma stopień critical albo important. Każda uwaga podaje miejsce w kodzie, co jest źle,
dlaczego to ważne i dowód, czyli linię, która to pokazuje. Gdy dowodu nie widać w diffie, oceń to jako
minor i napisz, czego nie widać.
