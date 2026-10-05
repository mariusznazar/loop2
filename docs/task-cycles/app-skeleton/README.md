# Szkielet aplikacji — zapis cyklu

Kod jest gotowy do przeglądu na gałęzi `task/app-skeleton`; nie został scalony. Ocena obejmuje kod od `3342d43` do `de3ceb3`. Dokumenty poniżej zapisano dopiero po niezależnych ocenach, więc nie były argumentem dla oceniających.

- [Zadanie i zatwierdzony zakres](task.md).
- [Projekt rozwiązania](../../superpowers/specs/2026-10-05-app-skeleton-design.md) oraz [plan wdrożenia](../../superpowers/plans/2026-10-05-app-skeleton.md).
- [Przebieg, pytania, odpowiedzi i wyniki](cycle.md), [decyzje wykonawcze oraz koszt pomyłki](reports/autonomous-choices.md).
- [Pełny raport wdrożenia i poprawki](reports/sdd/task-1-report.md), [przegląd zadania](reports/task-review.md), [przegląd całej gałęzi](reports/final-code-review.md), [sprawdzenie poprawki](reports/fix-review.md).
- [Końcowe testy](reports/final-verification.md), [weryfikacja przeglądarki](reports/browser.md), [wynik pomiaru](browser.json), [zrzut strony](browser.png).
- [Pełne propozycje fundamentu po polsku](return/human-review-pl.md) i [ich status oraz osobny patch](return/README.md). To propozycje, nie wiążące wpisy.
- [Niezależna krytyka propozycji](reports/foundation-critique.md), [ocena zastosowania](reports/panel-application.md), [ocena spójności](reports/panel-consistency.md), rozstrzygnięcia [A→B](reports/panel-settlement-ab.md) i [B→A](reports/panel-settlement-ba.md).
- [Dokładny materiał oceniany przez panel](assessment/manifest.json) i [pierwotnie oceniany patch](assessment/UNAPPROVED-foundation.patch) zachowują oryginalne bajty; poprawka dwóch wzorców plików jest w bieżącej propozycji `return/`.

Testy aplikacji przechodzą. Fundament pozostaje pusty, a kontrola przypisań plików nie przechodzi — brak wpisów nie oznacza zaliczenia. Proponowane reguły mają niewykonane metody kontroli; porównanie zależności nie ma jeszcze zadeklarowanej komendy. Nie testowano wdrożenia, kontenera, innych systemów operacyjnych ani innych silników przeglądarki.

Do decyzji człowieka pozostają nowe wpisy, prefiks decyzji, ocena skutków awarii i ich dotkliwości oraz dwa dodatkowe kandydaty: trwałe wymaganie dostarczania strony i jawnego błędu zajętego adresu. Pełne brzmienie, alternatywy i koszty są w materiale po polsku. Zgoda dwóch ocen nie zastępuje zatwierdzenia człowieka.

Snapshot filenames: historical `decisions.md`, `invariants.md`, `part_map.md` are published as `decisions-proposal.md`, `invariants-proposal.md`, `part-map-proposal.md` in both proposal folders. Their bytes are unchanged. The assessment manifest and verbatim reports retain original input names and hashes; the new names prevent archived proposals being mistaken for additional binding foundation files. Patch targets remain the real foundation paths.
