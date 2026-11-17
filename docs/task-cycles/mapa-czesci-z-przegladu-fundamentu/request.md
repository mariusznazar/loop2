**State: ready** — two items wait for your answer, and the rest only needs your merge.

## What you will see

The game does not change. This change corrects the project's map of which code belongs to which part and what each part may depend on, and it writes down, with tests, the rules for the two places where data from outside comes into the code: the address of the page in the browser, and the files that put the game on the test server.

- A new rule says that the part of the address after the hash opens only a screen the address list names, or the nearest one, and that the token of an emailed link goes unchanged into its own request, where the server judges it. Tests that already existed for the three files that read the address now carry the rule, and each was seen failing once when the rule was broken.
- A new rule says that the deployment workflow gives its script every outside value only as an environment variable, and that its connection to the server checks the server's key. Two tests that already existed now carry it; the same was done for them.
- The map now names the files that deploy the game as places where outside data comes in, so every later change to them is read for crafted input. The two Docker files and the compose file are checked by review of each change, not by a test, and the guidelines say what that review looks at.
- The skill that plays the game may now depend on the simulation, because it builds the game state from the simulation's functions; the reason is written into the map. The test that keeps imports inside the map cannot see this particular import, since the skill loads the simulation through a path built in code; so nothing but the map's words and review keeps this dependency in bounds.
- Three smaller corrections: the account server no longer lists the simulation among its dependencies, one attributes file moved to the build part, and one test helper moved to the deployment part.

### Underneath

While this was reviewed, the tests of the deployment workflow were made stricter: a crafted workflow step that turns server-key checking off, or that writes an outside value into a script step in the common list form, now fails them, where before they passed.

## For you to decide

### Needed from you

none

### Fix or let through

1. The test that guards the deployment workflow can still be fooled in a few crafted ways, and the guidelines row for it says it cannot in one of them. The one that matters: an outside value written after a comment mark on a script line is not seen by the test, yet the workflow still fills it in. The last reviewer weighed it as close to serious. If it happens, a later change could put an outside value into the deploy script with a green test run, and the guidelines would tell the reviewer that case is covered; it would show only when someone reads that change by hand. The smaller ones need a line written on purpose to fool the test: a decoy line before the real server call, an option written behind another short flag, a script line that starts with the word the test looks for, a step written as an inline mapping. Ways: fix it now, which costs one more round of correction with its review, either by letting the test read script lines whole or by saying in the guidelines row what is not read; make a task of it, which leaves the row overstating until the task is done; or let it through, which accepts it for good. I recommend fixing the comment case now, because it makes one sentence of the guidelines false and the repair is a few lines, and making a task of the rest, since each needs a line written on purpose. Fix the comment case now and make a task of the rest, make a task of all of it, or let it through? (Minor findings: n-1, n-2, n-4, N-1 and N-2)
2. Some smaller findings stand: the second rule and the first each join more than one rule in one sentence, as the task asked; the guidelines row for the host-key test still says "call" where the test takes the first place the word appears; one decision still calls its list of examples "the part no test holds" though it now names a rule; three changed lines are longer than their neighbours; and the host-key test also fails on a property that is not part of the rule. Each only makes a later reader slower and none changes what a test refuses. Make a task of it, or let it through? (Minor findings: M-4, m-1, m-2, m-3, n-3 and N-3)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. Two of the four deployment tests that the task named are not marked with the new rule: the one that counts the secrets and the one that checks the key is never printed. Both pass when the rule is broken (a secret written straight into the script leaves the first green), so marking them would claim a guard they do not give. They stay as they are, linked to no rule, as before. If you want them kept from removal, they need a rule of their own.
4. The two new rules are worded slightly differently from the task's rows. The deployment rule says "the script of its deployment step" and "on its command line", and no longer mentions batch mode, which the rows never settled. The address rule says the token goes "into the body of the request of its own link", where the row said "its own one request", because the page does send the token again after a lost connection or a refused password. Each rule still holds two clauses in one entry, as the rows ask, so a failed test shows one of two rules.
5. Two cases were added to the tables of existing address tests, one for each of two token files: a percent-encoded token must reach the request as it stands. Mutations that decoded the token survived every existing test, so the rule had no check for it. The host-key test and the outside-value test of the deployment workflow were rewritten to read the real server call and every script block, because the old versions passed on the crafted breaks that the review tried.
6. The deployment rule is written down as recovered from the workflow itself, since no decision says it. It rests on no recorded fact: the two facts about how the server connection reads its options are about another machine than the one that runs the workflow, so they are left with the backup script's decision.
7. Three decisions about the emailed links and the page address now say that the new address rule checks them, so the link between the decision and the rule runs both ways.
8. Fourteen existing tests now carry a rule's mark: twelve in the three address files and two in the deployment test; no rule is marked as broken, and the foundation check lists no corrected sentence. The map's lists of trust boundaries gained seven files.

## Cost

About 48 minutes of work by the orchestrator and the agents, plus the 13-minute full test run, on 61.7 million tokens counted with cache reads (41.4 million on Sonnet 5.5, 20.4 million on Opus 5.5; 0.3 million of them output). Four reviews: the whole change, the first fix, the return step and the second fix; two of them failed on one serious finding each, and each failure got one fix and one review of that fix. The table of stages is in the record: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/stages.md

A copy of an agent's check stayed in the ignored working folder of the task: the author's scripts and result files; nothing waits for them, and they go when the task's folder goes. The paths stand in Checks.

## How to merge

Merge with a merge commit, not a squash or a rebase: the link to the record of this cycle points at a commit that only a merge keeps.

<details>
<summary>W twoim języku</summary>

**Stan: gotowe** — dwie pozycje czekają na twoją odpowiedź, reszta wymaga tylko scalenia.

## Co zobaczysz

Gra się nie zmienia. Zmiana poprawia mapę projektu, czyli który kod należy do której części i od czego część może zależeć, oraz zapisuje, z testami, reguły dla dwóch miejsc, w których dane z zewnątrz wchodzą do kodu: adresu strony w przeglądarce i plików, które wdrażają grę na serwer testowy.

- Nowa reguła mówi, że część adresu po haszu otwiera tylko ekran z listy adresów albo najbliższy, a token z linku z poczty idzie bez zmian do własnego żądania, gdzie ocenia go serwer. Testy, które już były dla trzech plików czytających adres, niosą teraz tę regułę i każdy został raz pokazany z porażką, gdy regułę złamano.
- Nowa reguła mówi, że workflow wdrożenia podaje skryptowi każdą wartość z zewnątrz tylko jako zmienną środowiska, a jego połączenie z serwerem sprawdza klucz serwera. Dwa testy, które już były, niosą ją teraz; z nimi zrobiono to samo.
- Mapa nazywa teraz pliki wdrożenia miejscami, w których wchodzą dane z zewnątrz, więc każda późniejsza zmiana w nich jest czytana pod kątem spreparowanego wejścia. Oba pliki Dockera i plik compose sprawdza przegląd każdej zmiany, nie test, a wytyczne mówią, na co ten przegląd patrzy.
- Skill do grania może teraz zależeć od symulacji, bo składa stan gry z jej funkcji; powód jest zapisany w mapie. Test pilnujący importów w granicach mapy nie widzi tego importu, bo skill ładuje symulację ścieżką liczoną w kodzie, więc tę zależność trzymają w ryzach tylko słowa mapy i przegląd.
- Trzy drobniejsze poprawki: serwer kont nie wymienia już symulacji wśród zależności, jeden plik atrybutów przeszedł do części budowania, a jeden pomocnik testów do części wdrożenia.

## Do rozstrzygnięcia

### Potrzebne od ciebie

brak

### Poprawić czy przepuścić

1. Test pilnujący workflow wdrożenia da się jeszcze oszukać na kilka spreparowanych sposobów, a wiersz wytycznych o nim w jednym z nich twierdzi, że się nie da. Ten, który się liczy: wartość z zewnątrz zapisana po znaku komentarza w wierszu skryptu nie jest widziana przez test, a workflow i tak ją podstawia. Ostatni recenzent ocenił to jako bliskie poważnemu. Jeśli do tego dojdzie, późniejsza zmiana mogłaby wpisać wartość z zewnątrz do skryptu wdrożenia przy zielonym teście, a wytyczne mówiłyby recenzentowi, że ten przypadek jest pokryty; wyszłoby to dopiero przy ręcznym czytaniu tej zmiany. Mniejsze wymagają wiersza napisanego umyślnie, żeby oszukać test: wabik przed prawdziwym wywołaniem serwera, opcja zapisana za inną krótką flagą, wiersz skryptu zaczynający się od słowa, którego test szuka, krok zapisany jako odwzorowanie w jednym wierszu. Drogi: poprawić teraz, co kosztuje jeszcze jedną rundę poprawek z przeglądem, albo przez czytanie przez test całych wierszy skryptu, albo przez dopisanie w wierszu wytycznych, czego się nie czyta; zrobić z tego zadanie, co zostawia wiersz przesadzony do czasu zadania; albo przepuścić, co przyjmuje to na stałe. Polecam poprawić teraz przypadek komentarza, bo robi nieprawdziwe jedno zdanie wytycznych, a naprawa to kilka linii, a z resztą zrobić zadanie, bo każdy przypadek wymaga wiersza pisanego umyślnie. Poprawić teraz przypadek komentarza i zrobić zadanie z resztą, zrobić zadanie z całości, czy przepuścić? (Uwagi drobne: n-1, n-2, n-4, N-1 i N-2)
2. Zostały drobniejsze uwagi: obie nowe reguły łączą w jednym zdaniu więcej niż jedną regułę, tak jak chciało zadanie; wiersz wytycznych o teście klucza serwera mówi jeszcze „wywołanie”, choć test bierze pierwsze miejsce, gdzie pada to słowo; jedna decyzja nazywa jeszcze listę przykładów „częścią, której nie trzyma żaden test”, choć wymienia już regułę; trzy zmienione wiersze są dłuższe od sąsiednich; a test klucza serwera pada też na własności, która nie jest częścią reguły. Każda tylko spowalnia późniejszego czytelnika i żadna nie zmienia tego, co test odrzuca. Zrobić z tego zadanie, czy przepuścić? (Uwagi drobne: M-4, m-1, m-2, m-3, n-3 i N-3)

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś ci nie odpowiada, powiedz którą.

3. Dwa z czterech testów wdrożenia, które nazwało zadanie, nie noszą znaku nowej reguły: ten, który liczy sekrety, i ten, który sprawdza, że klucz nigdy się nie drukuje. Oba przechodzą, gdy regułę złamano (sekret wpisany wprost do skryptu zostawia pierwszy zielony), więc oznaczenie ich twierdziłoby ochronę, której nie dają. Zostają jak były, niepowiązane z żadną regułą. Jeśli chcesz je chronić przed usunięciem, potrzebują własnej reguły.
4. Dwie nowe reguły są sformułowane nieco inaczej niż wiersze zadania. Reguła wdrożenia mówi „skrypt jego kroku wdrożenia” i „w wierszu poleceń”, a nie wspomina już o trybie wsadowym, którego wiersze nie rozstrzygały. Reguła adresu mówi, że token idzie „do treści żądania swojego linku”, gdzie wiersz mówił „swojego jednego żądania”, bo strona wysyła token ponownie po utraconym połączeniu i po odrzuconym haśle. Każda reguła nadal ma dwie klauzule w jednym wpisie, jak chcą wiersze, więc nieudany test pokazuje jedną z dwóch reguł.
5. Dodano dwa przypadki do tabel istniejących testów adresu, po jednym dla każdego z dwóch plików z tokenem: token zakodowany procentowo musi dojść do żądania bez zmian. Mutacje, które dekodowały token, przeżyły każdy istniejący test, więc reguła nie miała dla tego sprawdzenia. Test klucza serwera i test wartości z zewnątrz w workflow wdrożenia przepisano tak, by czytały prawdziwe wywołanie serwera i każdy blok skryptu, bo stare wersje przechodziły na spreparowanych złamaniach, które wypróbował przegląd.
6. Regułę wdrożenia zapisano jako odzyskaną z samego workflow, bo żadna decyzja jej nie mówi. Nie opiera się na żadnym zapisanym fakcie: dwa fakty o tym, jak połączenie z serwerem czyta opcje, dotyczą innej maszyny niż ta, która uruchamia workflow, więc zostają przy decyzji skryptu kopii zapasowej.
7. Trzy decyzje o linkach z poczty i adresie strony mówią teraz, że sprawdza je nowa reguła adresu, więc powiązanie decyzji z regułą biegnie w obie strony.
8. Czternaście istniejących testów niesie teraz znak reguły: dwanaście w trzech plikach adresu i dwa w teście wdrożenia; żadna reguła nie jest oznaczona jako złamana, a kontrola fundamentu nie wypisuje poprawionego zdania. Listy granic zaufania w mapie zyskały siedem plików.

## Koszt

Około 48 minut pracy orkiestratora i agentów, plus 13-minutowy pełny przebieg testów, przy 61,7 mln tokenów liczonych z odczytami pamięci podręcznej (41,4 mln na Sonnet 5.5, 20,4 mln na Opus 5.5; z tego 0,3 mln wyjścia). Cztery przeglądy: całej zmiany, pierwszej poprawki, kroku powrotnego i drugiej poprawki; dwa z nich padły na jednym poważnym ustaleniu, a każda porażka dostała jedną poprawkę i jeden przegląd tej poprawki. Tabela etapów jest w rekordzie: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/stages.md

Kopia sprawdzenia agenta została w ignorowanym folderze roboczym zadania: skrypty i pliki wyników autora; nic na nie nie czeka i znikną razem z folderem zadania. Ścieżki stoją w Sprawdzeniach.

## Jak scalić

Scal commitem scalającym, nie squashem ani rebase: link do rekordu tego cyklu wskazuje commit, który zachowa tylko scalenie.

</details>

## Technical changes

- `b237e0ba` — the part map: `agent-workflow` may depend on `simulation`, with the reason in its sentence; `account-server` no longer lists `simulation`; `.gitattributes` moved from `deployment` to `build-tools`; `tests/invariants/account_container_support.py` moved from `build-tools` to `deployment`.
- `bbe59c96` — the invariant `page-address-fragment`; `src/browser/view/screen-address.ts`, `email-confirmation.ts` and `password-reset.ts` in the *Trust boundary* of `browser-view`; three rows of the table of trust boundaries in `guidelines/testing.md`; the mark `invariant: page-address-fragment` on 12 tests of `tests/view/` and two added rows of test tables for a percent-encoded token.
- `dc51a43c`, `abd32bab` — the invariant `deploy-workflow-input`; `compose.yaml`, `.github/workflows/deploy.yml`, `Dockerfile` and `deploy/cloudflared.Dockerfile` in the *Trust boundary* of `deployment`; two rows of the table (one for `deploy.yml`, one review-only row for the compose file and the two Docker files); the mark on two cases of `tests/deploy/test_deploy_workflow.py`.
- `fbaf2cac`, `d5932fc5` — fix 1: the host-key case reads the options of the one `ssh` call and takes the first value of each in the three forms `ssh` accepts; the wording of both invariants and the rows brought to what the tests check.
- `404f7d00` — the return step: the *Verification* of D-156, D-224 and D-281 names `page-address-fragment`; the row of `deploy.yml` reworded to what its cases read.
- `e117eccc` — fix 2: the outside-value case finds an expression in the script of any step, written with `run:` as the first key, as a later key, on one line or continued; the row says what it reads.
- Item 3 of the task: `scripts/restore-trial.mjs` stays with no trust boundary; nothing was written for it.
- The gap of `cross-part-imports` the task asks to name: it reads `import()` only with a string literal, and `.claude/skills/loop2-play/compose-state.mjs` and its copy in `.agents/skills/loop2-play/` load the built simulation through `import()` of a path built in code, which the test lists under "Does NOT cover"; so no test enforces the new dependency.

## Checks

- Gate: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/gate_times.md -- npm.cmd test` on `e117eccc`, exit 0 (790.753 s, run 1 of 1, started 03:19:56 UTC on the signal `start` of the adviser of the day): Node tests 2593 passed, 0 failed, 0 skipped; Python tests 86 + 79 + 253 + 264 = 682 in 4 directories, all passed; foundation check `0 errors`; check of the instruction files `0 error, 144 warn, 7 info`. Nothing failed or did not run in the gate.
- Failing on the base: none (the list is taken from `docs/task-cycles/wpisy-serwera-kopii-i-testow/cycle.md`, commit `d6230ddf`, the last copy of the merged branch; the base is a merge commit whose tree equals its second parent's, so no gate ran on the base).
- Foundation check without `--skip-test-citations` on the finished change: exit 0, `0 errors`, no `listed:` line.
- Own-work checks: the author mutated each marked test's guarded behaviour (26 mutations): each failed on the break and passed after the restore; fix 1 and fix 2 each ran the crafted variants the review named against the old and the new case (`reports/author-evidence/`, `reports/fix-1-evidence/`, `reports/fix-2-evidence/`).
- Ruff 0.17.1: `ruff check tests/deploy/test_deploy_workflow.py` exit 0; `ruff format --check` exit 1 on lines this change did not write; the authors and reviewers had no Ruff, the orchestrator ran it afterwards.
- Not run by this cycle: the reviewers did not run `npm test`; no screenshot (no screen changed); no command on the real server.
- CI: the result of the run on the last head is added after it finishes.
- Working copy left: `.runs/author/` holds the author's scripts and result files (`mutate.py`, `mutate_fix.py` and the `results*.json` files and `view_summary.txt`; copies are in `reports/`); nothing waits for it.
- Directories of earlier tasks kept: none.
- The checks on the copy of the record and on this description are added with the record's link.

## Foundation entries

- `page-address-fragment` (`row 1`): the fragment of the page's address opens only a screen that D-281 names or the nearest existing one, and the token of an emailed link in that fragment goes unchanged into the body of the request of its own link and nowhere else, the server being the one that judges it.
- `deploy-workflow-input` (`row 2`): the deployment workflow gives the script of its deployment step every value from outside the repository only as an environment variable, and the script's one SSH call sets strict host-key checking on its command line.
- Part map (task items 1 to 7): the *Trust boundary* of `browser-view` and of `deployment` gain the files of items 1 and 2; `agent-workflow` *Depends on* gains `simulation` with its reason; `account-server` loses `simulation`; `.gitattributes` moves to `build-tools`; `tests/invariants/account_container_support.py` moves to `deployment`.
- D-156, D-224 and D-281, *Verification* only (`the cycle's`): each now names `page-address-fragment`, the invariant derived from it.
- No topical section of the decision log was opened; no kept row; no *Violated* mark set or cleared; the table of trust boundaries in `guidelines/testing.md` gained five rows, and its *Decision* and *Invariant* lists gained D-10, D-13, D-224, D-237, D-281, `page-address-fragment` and `deploy-workflow-input`.
- Tests altered: 12 cases in `tests/view/screen-address.test.mjs`, `tests/view/email-confirmation.test.mjs` and `tests/view/password-reset.test.mjs` marked `invariant: page-address-fragment` (and two table rows added); `test_sha_reaches_the_script_only_through_env` and `test_ssh_is_strict_and_batch` in `tests/deploy/test_deploy_workflow.py` marked `invariant: deploy-workflow-input` and rewritten to read the real call and every script block.

## Minor findings

The Minor findings that no fix made, each in the reviewer's words and with its place in the code. The Minor findings of the review of the whole change that its fix took in (M-1 to M-3, M-5 to M-7) are not listed.

**From the review of the whole change (`reports/review-whole-report.md`, kept after its fix):**

**M-4. Each new entry joins more than one rule in one sentence.** `foundations/invariants.md:1400` (the screen a fragment opens; the token going unchanged into its request) and `:1410` (values only through the step's environment; strict host-key checking; batch mode). The invariants template: "One entry states one invariant ... One invariant per entry lets the failure of its test, seen once, show that the test catches that rule (WAY-08)". The task mandates one invariant per row ("nowy niezmiennik"), so this defect is the task's; the marks already split one-to-one (screen-address tests vs. the two token files; the sha test vs. the ssh test), so a split into two entries each would cost only the entries.

**From the review of the fix of the whole change (`reports/review-fix-1-report.md`):**

**N-1. The case does not read an `-o` bundled behind another short flag, while the row says "w każdej postaci opcji, jaką `ssh` przyjmuje".** `tests/deploy/test_deploy_workflow.py:35-38`; `guidelines/testing.md:185`. `ssh` parses its flags with getopt, so `-4o "StrictHostKeyChecking no"` sets the option, but `ssh_options` takes only a word equal to `-o` or starting with `-o`. Break R7 — `ssh -i` changed to `ssh -4o "StrictHostKeyChecking no" -i` — passes the case and the whole file (0 / 0), and `ssh` would use `no`. The row lists three forms and calls them every form `ssh` takes. Two small repairs, either one: read a word matching `-[46AaCfGgKkMNnqsTtVvXxYy]*o` as `-o` too; or let the negative check refuse any `StrictHostKeyChecking` followed by a value other than `yes`, in `=` and space form, anywhere in the text. Short of that, the row could say "w trzech postaciach".

**N-2. The case reads the first `ssh ` it finds in the file, not necessarily the one call.** `tests/deploy/test_deploy_workflow.py:83`. Break R8 sets the real call to `-o "StrictHostKeyChecking no"` and adds an earlier line `echo ssh -o StrictHostKeyChecking=yes -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SSH_HOST" "$DEPLOY_SHA"`. It passes the case and all 16 tests (0 / 0), because `test_one_ssh_call` (unmarked) counts only lines holding `-i`. The row says "w jedynym wywołaniu `ssh`". A decoy has to be written on purpose, which no text test can fully stop. Taking the call as the line that holds `-i "$key_file"`, or asserting in the case that there is exactly one `ssh ` word, would close it.

**N-3. The invariant's marked case also fails on a property that is no rule of the invariant.** `tests/deploy/test_deploy_workflow.py:87`. R2 (`BatchMode=no` before `yes`) fails the case (1 / 1), though `deploy-workflow-input` no longer says anything of batch mode. A red run of this case can therefore be read as a break of the invariant when it is not. The orchestrator allowed this, and the row says it openly ("co nie jest regułą niezmiennika"), so I record it only: moving the `BatchMode` assertion to an unmarked case of its own would keep the mark's meaning exact.

**From the review of the return step (`reports/review-return-step-report.md`):**

**m-1 — The `ssh` clause still names a „call” and a „line” where the case reads the first text `ssh ` of the joined file, and `test_one_ssh_call` does not make that text the call.**
Place: `guidelines/testing.md:185`, „pierwsza wartość `StrictHostKeyChecking` w pierwszym wierszu pliku
z wywołaniem `ssh`, którego jedyność pilnuje `test_one_ssh_call`, to `yes`”; test at
`tests/deploy/test_deploy_workflow.py:83` and `:155-157`.

What is wrong: (a) the case takes the first match of `(?<![\w./-])ssh\s` in the text whose `\`
continuations are joined (`code()`, :22-23), whether it is a call or not; a line `: ssh -o
StrictHostKeyChecking=yes -o BatchMode=yes` placed before a call that sets `-o "StrictHostKeyChecking
no"` first passes the case and `test_one_ssh_call` (`probe-out.txt`, line 4; control without the
decoy fails, line 5). The return-step report says the row "now says" the first line holding `ssh`; the
row says the first line *with a call of* `ssh`. (b) `test_one_ssh_call` counts physical lines that hold
`ssh ` and `-i`, so it keeps one keyed call, not one `ssh ` text; naming it as the guard of uniqueness
suggests it closes the decoy, which it does not. (c) „pierwszy wiersz pliku” read literally is
`deploy.yml:44`, which holds none of the options; the case reads lines 44-47 joined. This is N-2's gap
restated in the row; the decoy must be written on purpose, so Minor, as N-2 was. A wording that holds:
„w pierwszym miejscu pliku, gdzie stoi słowo `ssh` ze spacją, razem z wierszami dołączonymi przez `\`”.

**m-2 — D-224's pair is still introduced as „the part no test holds” now that its *Verification* names an invariant.**
Place: `foundations/decisions.md:3434-3435`. The template's form after an `invariants:` clause is „An
agent compares a change with the part no invariant and no test holds:”
(`.the-way/elements/decisions/template.md:37-38`); D-156 at :3229 has it. The content agrees with the
code — the pair (a token of 32 bytes from a cryptographic source, its digest the only stored form) is
held by neither the invariant nor a test — so it is Minor by WAY-364; no reader is misled into a
wrong check.

**m-3 — The three changed *Verification* lines are no longer wrapped as the lines around them.**
Place: `foundations/decisions.md:3220`, `:3431`, `:4378`. Each first line now runs to about 120-130
characters while the entry wraps near 100. Polish only.

**From the review of the fix of the return step (`reports/review-fix-2-report.md`):**

**n-1 — The row's new sentence says no line deeper than `run:` holds `${{ … }}`; the case does not read what follows ` #` on a line, and GitHub substitutes expressions there.** *(Flagged: by its effect I would weigh this near Important; I grade it Minor because its cause, `code_lines`, lies outside the fix diff and the row before the fix overstated in the same way, which I missed in the review of the return step — fix.md makes such an issue a Minor note.)*
Place: `guidelines/testing.md:185`, „w wierszach wciętych głębiej niż ten klucz … nie ma żadnego
wyrażenia `${{ … }}`”; cause `tests/deploy/test_deploy_workflow.py:16-19` (`code_lines` drops
`(^|\s)#.*$` from every line, script lines included). In a block scalar `#` is text, and GitHub
evaluates `${{ … }}` anywhere in the value of `run:`, shell comments included. Variants: C7, the
deployment script holding `echo "Deploying #${{ github.event.head_commit.message }}"`, and C8, a
commented-out line `# was ${{ github.event.head_commit.message }}`: the case and all 16 cases **pass**,
before the fix and after it (`old-case-out.txt`, `probe2-out.txt`). A commented-out line with an
expression is a common way to disable a step line; a commit message with a newline then breaks out
of the comment. Repair: read the script lines unstripped (strip comments only outside `run:` values),
or say in the row that text after ` #` is not read.

**n-2 — The widened key pattern also matches a script line that starts with `run:`, which resets the indent and ends the reading early (a regression of the fix, crafted only).**
Place: `tests/deploy/test_deploy_workflow.py:112-114`. Inside a script, a line `run: note` at the
script's indent (for example in a heredoc) is taken as a new key; the next line at the same indent
ends the block, so later script lines go unread. Variant C9 (heredoc with a `run: note` line, then
`echo ${{ github.event.head_commit.message }}`): the new case **passes**, the old case **failed**
(`old-case-out.txt`). Needs a line written to fit; Minor. Repair: match a key `run:` only while not
inside a script, or only at an indent not deeper than the current script's.

**n-3 — The case now also reads `defaults: run:` as a script and fails on an honest expression there.**
Place: `tests/deploy/test_deploy_workflow.py:112`. Variant H4, a job-level
`defaults: run: working-directory: ${{ github.workspace }}`: the case **fails** (it passed before).
This fails closed — no protection is lost — but an honest change would meet a red test, and the row
calls what it reads „skrypt kroku”. Minor.

**n-4 — A `run` written as a flow mapping or a quoted key is not read; the row says „w wartości klucza `run:`”.**
Variants C10 (`- { name: Echo, run: 'echo ${{ … }}' }`) and C11 (`"run": echo ${{ … }}`): the case
passes. Both forms are rare and written on purpose; Minor. The row could add them to what it does not
read.

The `ssh` clause of the row is unchanged by the fix; m-1 of the review of the return step stays on the
request's list, as do m-2 and m-3.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task "the map of parts from the review of the foundation" (independent), approved with its settlements 2026-11-13; sources: the review of the foundation of 2026-11-13, findings F-15, F-16, F-33, F-34 and F-35, and the foundation at the base `ea638397`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved by the task.
- **Spec:** none; the task settles every entry, and the wording of an entry follows from its rows.
- **Route:** one author without a plan (`the-way-author`, class `same` as the orchestrator, Sonnet 5.5), because the change is a handful of foundation entries, one table and marker lines in four test files; reviews by Opus 5.5 agents that did not make the change.
- **Plan:** none.
- **Choices:** 14 choices of the cycle, with the evidence and the cost if wrong, in the questions table of the record.
- **Blocking findings left:** none; two blocking findings were fixed (the host-key test of the deploy workflow in the review of the whole change; the row about script blocks in the review of the return step), each by one fix and one review of it.
- **Record:** https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/cycle.md
