# Final whole-branch review at 26661cd

Assessed range: `44294da228ab8c27dfd1683f931f59f8d7f8d29d..26661cd6a934a797062d096d856feec4548caffb`.

Worktree: `C:/Storage/repos/loop2-first-foundation`. HEAD matched the requested hash. The tracked working tree was clean. No product file, index or commit was changed by this review.

**Verdict: With fixes — one Important finding.** The unchanged product passes all six focused tests, but the new package-boundary check rejects a valid configuration-inheritance refactor that leaves the package boundary and build unchanged.

## Critical findings

None.

## Important findings

### 1. Package-boundary check rejects inherited compiler options

**Severity:** Important / P2. **Thread:** new finding.

**Anchor:** `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:62` (also lines 63–64 and the unconditional caller at 167–169).

**Do wklejenia:** Test granicy pakietu wymaga `compilerOptions`, `rootDir` i `outDir` bezpośrednio w obu plikach konfiguracji, choć poprawne konfiguracje TypeScript mogą je dziedziczyć przez `extends`. Przeniesienie niezmienionej zawartości do dwóch plików bazowych zachowuje jeden pakiet, plik blokady i poprawny build, ale ten test kończy się `KeyError: 'compilerOptions'`. Odczytuj efektywną konfigurację TypeScript albo usuń zależność sprawdzenia granicy pakietu od bezpośredniego układu tych pól.

**Dlaczego to zgłaszam:** `resolved_config_paths` zbiera położenie konfiguracji, źródeł i wyników, aby rozpoznać dodatkowy pakiet budujący tę samą aplikację. Ta pomocnicza analiza uruchamia się bezwarunkowo, nawet gdy repozytorium nie ma żadnego dodatkowego pakietu. Parsowanie surowego JSON i indeksowanie `config["compilerOptions"]` utożsamia postać pliku z efektywną konfiguracją kompilatora. W efekcie zwykłe wydzielenie ustawień do plików bazowych blokuje bramkę niezmienników, mimo że chronione zdanie jest nadal prawdziwe. Taka kontrola oskarża poprawną zmianę i wymusza utrzymanie niewiążącego szczegółu organizacji konfiguracji.

Niezależny eksperyment w `support.TreeCopy`, bez edycji produktu: dla każdej strony skopiowałem wszystkie oryginalne bajty `tsconfig.<side>.json` do sąsiedniego `tsconfig.<side>.base.json`, a plik wejściowy zastąpiłem wyłącznie `{"extends": "./tsconfig.<side>.base.json"}`. Oba pliki bazowe są w tym samym katalogu, więc względne źródła i wyniki pozostają identyczne. `npm run build` zakończył się kodem 0. Następnie skierowałem test pakietu na tę kopię przez `support.ROOT` oraz tę samą listę plików produktu; błąd występuje przed analizą własności przez Git, więc brak indeksu Git kopii nie bierze udziału w wyniku. Wynik: jeden test, jeden error, zero assertion failures; stos kończy się dokładnie na linii 62 z `KeyError: 'compilerOptions'`. Kopia została posprzątana.

Poprawka powinna odczytywać efektywne ustawienia przy użyciu zainstalowanego TypeScript, z uwzględnieniem katalogu, względem którego deklarowano ścieżkę, albo oprzeć identyfikację pakietu na dowodzie niezależnym od rozmieszczenia pól konfiguracji. Samo `.get(..., {})` ukryje błąd, ale może pozbawić kontrolę informacji potrzebnych do wykrycia dodatkowego pakietu. Po zmianie należy potwierdzić poprawny wariant `extends` oraz zachować czerwony wynik dla rzeczywistego dodatkowego pakietu aplikacji. Pozostawienie stanu kosztuje fałszywą blokadę zwykłej refaktoryzacji; poprawka kosztuje dopracowanie pomocniczego odczytu konfiguracji i jego wąską weryfikację.

## Minor findings

None. No style-only changes requested.

## Reviewed scope and strengths

I read the entire eight-file product change, the frozen task and current spec, the applicable foundation, and relevant unchanged build/server/support code. Documentation and code were reviewed in separate passes. I checked part C of the historical proposal at `5928e7b`, including the exact runtime sentences and the original combined layout sentence. The current split preserves its two promises. The `.the-way` checkout and gitlink both name `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`; the installed Superpowers manifest names 6.4.1. The code-review playbook and requesting-code-review/subagent-driven-development instructions were read.

- D-04/2, D-05/2 and D-06/2 append the requested field changes and preserve the binding sentences and earlier entries. The product-foundation description and `npm ci` precondition match the task. The two runtime entries correctly have recovered rows and no invented derivation from D-05.
- All new tests have explicit part ownership and invariant citations. Reusing the existing compiled-probe tests for compiler layout provides executable evidence of both outputs and distinct environments; it avoids the removed extra compiler-layout check's direct-key requirement. The package check still has the distinct false-positive issue above.
- Static-root instrumentation patches Express before importing the application and checks canonical containment, allowing legitimate descendants of `dist/public` while rejecting sibling/ancestor roots regardless of mount prefix. Real HTTP checks additionally require exact built asset bytes from a foreign working directory and reject outside sentinels/traversal. The normal launcher path remains compatible with existing callers.
- The occupied-address check has a real successful startup control before and after the blocked launch, keeps a real socket bound during the negative case, accepts diagnostics mentioning the address, and rejects the readiness line itself. Cleanup is protected by socket context management and `finally`.

## Verification performed by this reviewer

Each focused command was `python -B -m unittest discover -s tests/invariants -p <filename> -v`:

| File | Result |
|---|---|
| `test_application_package_layout.py` | PASS, 1 test |
| `test_public_file_boundary.py` | PASS, 1 test |
| `test_account_server_occupied_address.py` | PASS, 1 test |
| `test_application_build_output.py` | PASS, 3 tests |

The four commands ran sequentially. The inherited-configuration counterexample independently built successfully and then produced the exact package-check error recorded above. `git diff --check` for the full assessed range produced no errors. `git status --short` was empty after the experiments. HTTP tests completed their cleanup; no further port-3000 work is running from this reviewer.

I also read the prior independent deliberate-break records: the occupied-address success-exit mutation and foreign-CWD static-root mutation, and the latest arbitrary `/leak` mount / valid public-subdirectory re-review. Those are prior reviewer evidence, not experiments executed again in this review. Their known bounded instrumentation limitations are not newly counted as defects here. I did not rerun the full invariant gate, npm ordinary suite, foundation guards, or every prior deliberate break; none is claimed as my pass.

## Handoff conditions and declined-to-judge items

- The three `Approved by` request-link placeholders are intentional pre-PR state. Replace only those values after creating the draft request and rerun the decision guard as already planned. They are not a new finding or a present guard pass.
- Independent check authorship and execution of historical searches cannot be established from a product diff; retain their cycle provenance and the recovered-entry gate records.
- Container deployment, account routes and TypeScript 7 are explicitly outside this task and have no changed implementation here.
- Automatic classification of every possible future build architecture, direct response-file APIs, internal symlink exposure and middleware registered only after app creation exceed these current structural/runtime probes. The current application does not introduce those paths. No claim of universal static-analysis coverage is made.
- Foundation guards and the existing dependency-graph unchecked condition remain the orchestrator's final gate responsibility. This review supplies no substitute pass for an unrun gate.

The foundation wording and intended runtime evidence are otherwise aligned with the task. Resolve the single package-test false positive before treating this range as approved for the final request handoff.
