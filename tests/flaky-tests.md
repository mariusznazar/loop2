# Testy padające losowo, których przyczyny nie ustalono

Rejestr testów loop2, które padły raz na kilka pełnych przebiegów testów, bez związku ze
zmianą kodu, i których przyczyny nie ustalono. Wpis to nazwa testu, co próbowano (z liczbami
uruchomień i warunkami) i na co patrzeć w przebiegu, który padnie. Wpis znika, gdy przyczyna
się wyjaśni. Wpisu szuka się po nazwie testu. Zasadę rejestru podaje `guidelines/testing.md`,
rozdział „Flaky tests”.

## Zasada wspólna

Przy porażce testu z tego rejestru zachowaj cały zapis padniętego przebiegu (log bramki albo
wyjście testu) i dopiero potem uruchamiaj go ponownie. Przy teście okna strażnika i przy teście
sygnału kopii jedyną wskazówką był ślad w zapisie jednego padniętego przebiegu. Ponowne
uruchomienie służy diagnozie, nigdy zielonej bramce.

## Skąd pochodzą liczby

Liczby i warunki prób pochodzą z poprzedniego cyklu (zadanie „luki w testach…”, PR
https://github.com/mariusznazar/loop2/pull/150). Jego raporty leżą w historii gita:
`git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/<plik>`, z plikami
`executor-18-report.md` (test transportu), `executor-19-report.md` (test okna strażnika) i
`executor-20-report.md` (test sygnału kopii). Każdy zaczyna się podsumowaniem, dalej są sekcje
„Cause” i „Every attempt”.

Warunki prób poprzedniego cyklu, każdy test w części z nich: każde uruchomienie w osobnym
procesie i policzone; sam; pod ok. 40 wirującymi procesami node (2 na procesor logiczny); pod
24 pętlami startującymi bez przerwy krótkie procesy (ponad 30 tysięcy startów); pod pętlami
uruchamiającymi całe pliki testów; pod obciążeniem dysku, gdzie test z niego korzysta. Żadne
obciążenie nie wywołało porażki.

## `tests/transport.test.mjs`, „transport refuses ambiguous proxy metadata before loading live sessions”

- **Porażka:** `HTTP deadline exceeded` po 7678 ms przy terminie 5000 ms, w pierwszym pełnym
  przebiegu w PR #88. Sam przypadek trwa 0,53–0,70 s.
- **Przyczyna:** nieustalona. Hipoteza, nie wynik: jedno żądanie zawisło na 5 s albo dłużej.
- **Co próbowano:** 150 z 150 osobnych uruchomień w pięciu warunkach, 105 z 105 kopii z
  pomiarami, pięć przebiegów całego etapu Node. Pod 80 wirującymi procesami przypadek trwał
  5,8–9,4 s, a najwolniejsze pojedyncze żądanie nie przekroczyło 0,9 s. Pięć warunków według
  raportu wykonawcy kroku 18, który przeczytano: sam; pod innymi testami Node w pętli; pod 40
  i pod 80 wirującymi procesami node; pod 20 procesami zapisującymi pliki i wiersze SQLite.
- **Na co patrzeć:** które żądanie przekroczyło termin. Metodę i ścieżkę podaje komunikat
  błędu pomocnika żądań: `HTTP deadline exceeded: <metoda> <ścieżka>`.

## `tests/deploy/test_loop2_watch.py`, `TheWindow.test_a_clock_that_stands_still_reads_no_window`

- **Porażka:** raz na niezmienionej bazie w PR #87. Zapis:
  `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, ok. linii 2509–2580.
  Atrapa `docker inspect` kontenera tunelu nie zostawiła wpisu, strażnik uznał to za „down”
  i wysłał wiadomość. Ten ślad cykl odtworzył, skracając limit Dockera do 0,01 s.
- **Przyczyna:** nieustalona. Hipoteza: Windows nie uruchomił procesu atrapy pod obciążeniem.
  W tym samym przebiegu bramki druga atrapa też milczała, przebieg był o ok. 45% wolniejszy od
  sąsiednich, a w innych logach projektu Windows nie uruchamiał procesów z kodem 0xC0000142.
- **Co próbowano:** 150 z 150 osobnych uruchomień w pięciu warunkach, 6 w przebiegach całego
  pliku pod najcięższym obciążeniem, 1000 startów atrapy samej i 400 pod pętlami startów, bez
  złego startu.
- **Na co patrzeć:** czy brakuje wpisu którejś atrapy, choć strażnik ją wywołał; czy inne
  atrapy tego przebiegu też milczą; jak długo trwał przebieg wobec sąsiednich.

## `tests/invariants/test_account_save_backup_failure_notice.py`, `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too [INT]`

- **Porażka:** `0 != 130`, raz na niezmienionej bazie w PR #87, w tym samym zapisie co porażka
  testu okna strażnika. Atrapa `docker` kopii nie zostawiła wpisu i nie wysłała sygnału, a jej
  etap odczytał status 0.
- **Przyczyna:** nieustalona. Wykluczone dowodami: zgubiony wpis przy dwóch jednoczesnych
  zapisach, zgubiony sygnał INT, Ctrl+C, inny `docker` w PATH, INT ignorowany na starcie
  skryptu kopii. Bash z Cygwina uruchomiony w tle (`&`) ignoruje INT i daje `0 != 130`, ale nie
  pasuje do porażki, w której brakowało też wpisu atrapy.
- **Co próbowano:** 90 z 90 osobnych uruchomień (30 sam, 30 pod 40 wirującymi procesami, 30 pod
  6 pętlami całych plików i 4 pętlami wysyłającymi sygnały) i 320 z 320 powtórzeń przebiegu INT
  w jednym procesie.
- **Na co patrzeć:** to samo co przy teście okna strażnika, i jeśli się da, wyjście standardowe
  i błędów etapu atrapy.

## `tests/account-api.test.mjs`, „reportBrowserFailure posts the three words as one JSON POST to the report path, with no keepalive, same-origin credentials and no redirect”

- **Porażka:** raz na `2 !== 1`, w sprawdzeniu liczby zarejestrowanych żądań (wtedy linia 1221),
  pod skrajnym, łączonym obciążeniem w uruchomieniach wykonawcy kroku 18 poprzedniego cyklu.
- **Przyczyna:** nieustalona. Test nie był badany.
- **Co próbowano:** nic.
- **Na co patrzeć:** który przypadek pada i czy obciążenie jest jedyną wspólną cechą.
