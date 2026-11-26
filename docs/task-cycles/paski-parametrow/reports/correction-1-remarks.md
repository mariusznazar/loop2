# Correction 1 — the human's remarks, word for word

Source: the comment https://github.com/mariusznazar/loop2/pull/179#issuecomment-7192381651 on the request, posted on 2026-11-26 12:43 UTC from the account of the repository's owner, as the day advisor's remarks on the human's behalf; it reached the cycle as the input `/the-way-implement-task <the comment's link>`.

---

Uwagi doradcy dnia w imieniu Mariusza

**Fix or let through**

1. Ciosy stworzenia nieoglądane w działającej grze — **popraw w tym PR-ze**: zagraj w przeglądarce mapę ze stworzeniami i przejdź kroki 1–4 z opisu przy prawdziwych ciosach (zwykłe tempo, 8× i 16×, drugi cios zastępujący pierwszy, cios w pauzie i wznowienie), także w oknie 360 px; „Restart” i rosnące paski przy okazji. Co wyjdzie źle — popraw. Wynik i zrzuty do opisu.
2. Zabijający cios pokazuje sumę ciosów (np. „−14 · wilk” przy 8,65 utraconego) — **przepuść**. Pokazanie pełnej siły ciosu, także ponad zostałe zdrowie, to zwykła konwencja liczb obrażeń w grach i dokładnie to, co ustala D-450.
3. Rysunek sceny przy 360 px szerszy niż jego pole — **sprawdź w tej samej rundzie**: obejrzyj okiem przy 360 px, czy rysunek jest ucięty. Gdy jest, a poprawka mieści się w kilku liniach CSS (`margin-inline` w `.scene-place`, `src/browser/run-screen.css`) — popraw tu. Gdy wymaga więcej — nie poprawiaj, opisz w PR-ze, co widać; dopiszę to do zadania z kolejki.
4. Przegląd całej zmiany czytał decyzje częściowo — **przepuść**: dziewięć edytowanych decyzji przeczytane po zdaniach wiążących i zmianach, dwie w całości, do tego kontrola fundamentu i testy cytujące wpisy; następne zadanie z kolejki rusza inny ekran.

**Minor findings**

- Review of the return step, M-1, M-2, M-3, M-4 — **popraw**: linia `decision:` D-311 przy teście paska pod każdą wartością (`tests/view/body-row-cells.test.mjs:253`), test koloru liczby energii przy 100, test, że otwarte objaśnienie spycha plecak w dół, usunięcie powtórzonej linii D-450 (`tests/view/body-row-explanation.test.mjs:88-89`). Bez tych testów reguła może się po cichu zepsuć przy zielonych testach.
- Review of the fix, N-1 (reguła styleguide'u powtarza decyzje) — **przepuść**: tak samo zbudowane są reguły innych ekranów, na które wskazało zadanie; gracz nic z tego nie widzi.

**You accept by merging** — punkty 5–10 przyjęte.

Przeglądy najmocniejszej klasy na modelu `opus` wprost.
