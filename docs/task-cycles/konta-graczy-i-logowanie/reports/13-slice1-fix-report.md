# Slice 1 — poprawki po przeglądzie

**Status:** done  
**Baza przeglądu:** `c24fbffd031c5f0dee7922c813800b3f1c1d8288`  
**Zachowana poprawka fundamentu, uwaga 4:** `d39dd8870d36803bd17fbe64819634bf7e3ec61c`  
**Commit poprawek kodu, uwagi 1–3:** `7ef74576ead2668803396403110efe9616e31b51` (`test: :test_tube: cover native password admission`)  
**Branch:** `task/konta-graczy-i-logowanie`; bez push/reset/rebase. Drzewo śledzonych plików po commicie jest czyste.

## Zmiany

| Plik | Dodane | Usunięte |
|---|---:|---:|
| `package-lock.json` | 107 | 1 |
| `package.json` | 3 | 1 |
| `src/server/passwords.ts` | 1 | 1 |
| `tests/passwords.test.mjs` | 39 | 30 |
| **Razem** | **150** | **33** |

Test integracyjny kompiluje moduł przez zwykły build uruchamiany w `npm test`, a potem w ograniczonym do 30 sekund procesie potomnym wykonuje rzeczywiste operacje Argon2. Bezpośrednio korzysta z `hashPassword` i `verifyPassword`: najpierw zajmuje dwa miejsca mieszanką hash/verify i sprawdza natychmiastową odmowę obu API, potem osobno sprawdza limit dwóch hashy i dwóch weryfikacji. Po błędzie rzeczywistego `verifyPassword` z niepoprawnym hashem uruchamia jednocześnie hash i verify, a następnie potwierdza odmowę trzeciej operacji. To wykazuje odzyskanie obu miejsc. Pomocnik `withPasswordCapacity` jest teraz wewnętrzny; test nie korzysta z testowej fasady.

## Uwagi przeglądu

1. **Wspólna bramka prawdziwych API:** poprawione. Test obejmuje wspólne zajęcie dwóch miejsc przez hash i verify oraz przeciążenie obu funkcji. Osobne mutacje pominięcia bramki w każdej funkcji zostały wykryte przez `npm test`.
2. **Pełne odzyskanie po błędzie API:** poprawione testem błędnego zakodowanego hasha i przyjęciem dwóch równoległych operacji po jego odrzuceniu. Mutacja przesuwająca zwolnienie miejsca za udany `await` została wykryta.
3. **Brak biblioteki sesji i typów:** dodano przypięte zależności `express-session@1.19.0` oraz deweloperskie `@types/express-session@1.19.0`. `npm ls --depth=0 express-session @types/express-session` potwierdziło obie zainstalowane wersje (exit 0). Wpis `express-session-store-contract` w `foundations/environment_facts.md` już opisywał kontrakt wersji 1.19.0: przechowywanie danych po stronie serwera oraz wymagane callbacki Store. Porównałem wpis z przypiętym źródłem i zainstalowanym pakietem; nie wymagał zmiany. Typy są dla tej samej wersji biblioteki i używają istniejącego `@types/express@5.0.6`.

**Uwaga 4 pozostaje poprawiona w d39dd887:** niezmiennik trwałości zachowuje pełne zdanie o bazie kont i zapisanych stanach gry oraz jawny dług. Specyfikacja Foundation entries i F20h potwierdzają, że Slice 9 dostarcza tylko dowód kont/sesji; nie odczyści to obowiązku zachowania zapisów gry. Nie implementowałem zapisów.

Nie zmieniałem fundamentu ani wytycznych. Zachowane są niezmiennik `password-operation-gate` i wytyczne haszowania, po polsku: hashowanie i weryfikacja korzystają ze wspólnego limitu; zajęta bramka odmawia od razu, a każde miejsce zwalnia się dopiero po zakończeniu pracy natywnej. Nie zmieniałem żadnego wpisu D ani wytycznej testów.

## Kontrole

Wszystkie testy uruchomiłem wyłącznie przez istniejący lokalny weryfikator Linux, który klonuje wskazany bundle, wykonuje `npm ci`, po czym uruchamia `npm test`. Nie uruchamiałem `node --test`, `unittest` ani pojedynczych testów bezpośrednio.

Każda mutacja powstała w osobnym klonie od dokładnego commita `7ef74576ead2668803396403110efe9616e31b51`; runner odłączał się od podanego SHA i działał w nowym, należącym do tej próby kontenerze. Polecenie dla każdej próby miało tę postać:

```powershell
docker run --name <owned-runner> --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh <mutation-sha> 7012abcfb55b4ba2b2836b574a2275eb1551df28
```

| Izolowana mutacja | SHA źródła runnera | Wynik |
|---|---|---|
| `hashPassword` omija wspólną bramkę i wywołuje Argon2 bezpośrednio | `66f72f4159ba5d7b68e686e61e1dea5d7899a0e0` | Runner exit 1; 344/345 testów Node przeszło. Nowy test oblał się na brakującej odmowie `PasswordCapacityError`. Log: `docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-mutation-hash.log`. |
| `verifyPassword` omija wspólną bramkę i wywołuje Argon2 bezpośrednio | `fc22d2d140ffdccca538ba6682f6469041f89e8e` | Runner exit 1; 344/345 testów Node przeszło. Nowy test oblał się na brakującej odmowie `PasswordCapacityError`. Log: `docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-mutation-verify.log`. |
| Zwolnienie miejsca następuje dopiero po udanym `await`, więc błąd API pozostawia zajęte miejsce | `2cc972f90dc77a457a9f1cea14875c6a40a22879` | Runner exit 1; nowy test oblał się, gdy drugie z dwóch operacji po błędzie dostało `PasswordCapacityError`. Log: `docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-mutation-leak.log`. |

Po każdej próbie klon pochodził niezależnie z commita końcowego; przywróciłem kopie źródła do dokładnego commita końcowego, a ich bieżący checkout jest czysty i odłączony od mutacji. Bundle produktu przywróciłem do gałęzi zadania i SHA końcowego. Usunąłem utworzone przeze mnie kontenery runnerów.

Końcowy pełny przebieg na zatwierdzonym HEAD użył:

```powershell
docker run --name loop2-task15-s1-final --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh 7ef74576ead2668803396403110efe9616e31b51 7012abcfb55b4ba2b2836b574a2275eb1551df28
```

- Polecenie weryfikatora: exit 0; obejmowało `npm ci` i `npm test`.
- `npm test`: exit 0; 345 testów Node zaliczonych, 275 testów Python zaliczonych. Trzy testy Windows-only zostały pominięte na Linuxie i nie liczę ich jako zaliczonych.
- Kontrola fundamentu uruchomiona przez bramkę: `0 errors`.
- `npm ls --depth=0 express-session @types/express-session`: exit 0; obie wersje 1.19.0.
- `python scripts/audit_dependencies.py`: exit 0; porównawczy audyt lockfile nie znalazł nowych ostrzeżeń npm o poziomie low lub wyższym względem punktu odgałęzienia.
- `git diff --check d39dd8870d36803bd17fbe64819634bf7e3ec61c..7ef74576ead2668803396403110efe9616e31b51`: exit 0.

Pełny log końcowego przebiegu: `docs/task-cycles/konta-graczy-i-logowanie/reports/slice1-final-gate.log`.

## Własna kontrola i granice

Najsłabszym wymogiem tego fragmentu było wykazanie, że ograniczenie obejmuje faktyczne natywne hash i verify oraz że po rzeczywistym błędzie odzyskuje oba miejsca. Trzy odrębne mutacje oblały się na nowym teście, a pełny gate na niezmienionym commicie przeszedł. Wywołania przeciążeniowe następują w tym samym synchronicznym przebiegu JavaScript, zanim proces potomny odda sterowanie; nie ma testowego opóźnienia ani zastąpienia Argon2.

Nie uruchamiałem pomiaru w docelowym obrazie/na hoście Mikrus ani publicznej ścieżki przeglądarki. Wynik lokalny potwierdza limit na prawdziwym pakiecie w lokalnym środowisku Linux, nie akceptację kosztu profilu w docelowym obrazie. Trzy testy zależne od Windows pozostały pominięte. Nie wdrażałem aplikacji ani nie zmieniałem serwera. Raport kończy się przed ponownym przeglądem.
