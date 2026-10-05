mariusznazar
2026-10-05T20:06:44Z
**Decyzje do poprawki 2** — dotyczą propozycji z commita 5928e7b (proposal-pl.md).

- T1a: przyjmuję pięć części (browser-view, account-server, build-tools, agent-workflow, product-foundation) z przypisaniem 50 plików.
- T1b: przyjmuję szkic dozwolonych zależności, z otwartą wzajemną zależnością account-server ↔ build-tools.
- T1c: skala krytyczności i tryby awarii: `none` na razie; wracamy przy kontach i zapisie.
- T2: przyjmuję D-04/1 „The game is written in TypeScript and runs in the browser.”
- T3: przyjmuję D-05/1 z relacją `derives from D-02`.
- T4: przyjmuję wpis częściowy D-07/1 „The server computes nothing of the game.”
- T5: przyjmuję część niezmiennika loop2-one-serving-process/1 „One Express 5 process serves both the built game and `/api/` requests.” — napisz test, celowe złamanie i kod pod test.
- T6: teraz D-06 i application-build-output; application-build-layout, public-file-boundary i account-server-occupied-address później. T6.2: nie utrwalamy zwykłego 404 poza `/api/`.
- T7: przyjmuję założenia wpisane w testy niezmienników.
- T8: tak — osobne zadanie na próbę TypeScriptu 7.x (zakładam je sam, poza tym PR-em).
- T9: `program` bez zmiany nazwy.
- T10: przyjmuję poprawkę `invariant:` → `invariants:` w D-02.
- T11: tak — zgłoszę do the-way (poza tym PR-em).
- T12: późniejsze pełne wersje /2 wpisów częściowych niosą jako *Approved by* zapis bramki.

Po naniesieniu: powtórz etapy, których dotyczą te decyzje, i zaktualizuj opis PR.

