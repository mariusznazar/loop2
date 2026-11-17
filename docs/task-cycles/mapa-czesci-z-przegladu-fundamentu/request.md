**State: ready** — corrected for your answer to an item; nothing waits for your answer, and the rest only needs your merge.

## What you will see

The game does not change. This change corrects the project's map of which code belongs to which part and what each part may depend on, and it writes down, with tests, the rules for the two places where data from outside comes into the code: the address of the page in the browser, and the files that put the game on the test server.

- A new rule says that the part of the address after the hash opens only a screen the address list names, or the nearest one, and that the token of an emailed link goes unchanged into its own request, where the server judges it. Tests that already existed for the three files that read the address now carry the rule, and each was seen failing once when the rule was broken.
- A new rule says that the deployment workflow gives its script every outside value only as an environment variable, and that its connection to the server checks the server's key. Two tests that already existed now carry it; the same was done for them.
- The map now names the files that deploy the game as places where outside data comes in, so every later change to them is read for crafted input. The two Docker files and the compose file are checked by review of each change, not by a test, and the guidelines say what that review looks at.
- The skill that plays the game may now depend on the simulation, because it builds the game state from the simulation's functions; the reason is written into the map. The test that keeps imports inside the map cannot see this particular import, since the skill loads the simulation through a path built in code; so nothing but the map's words and review keeps this dependency in bounds.
- Three smaller corrections: the account server no longer lists the simulation among its dependencies, one attributes file moved to the build part, and one test helper moved to the deployment part.

### Underneath

While this was reviewed, the tests of the deployment workflow were made stricter. After your answer they now also read a script line whole, so an outside value written after a comment mark is refused, and a permanent case checks that. The guidelines row for that test now says plainly which crafted forms the test does not read.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. Two of the four deployment tests that the task named are not marked with the new rule: the one that counts the secrets and the one that checks the key is never printed. Both pass when the rule is broken (a secret written straight into the script leaves the first green), so marking them would claim a guard they do not give. They stay as they are, linked to no rule, as before. If you want them kept from removal, they need a rule of their own.
2. The two new rules are worded slightly differently from the task's rows. The deployment rule says "the script of its deployment step" and "on its command line", and no longer mentions batch mode, which the rows never settled. The address rule says the token goes "into the body of the request of its own link", where the row said "its own one request", because the page does send the token again after a lost connection or a refused password. Each rule still holds two clauses in one entry, as the rows ask, so a failed test shows one of two rules.
3. Two cases were added to the tables of existing address tests, one for each of two token files: a percent-encoded token must reach the request as it stands. Mutations that decoded the token survived every existing test, so the rule had no check for it. The host-key test and the outside-value test of the deployment workflow were rewritten to read the real server call and every script block, because the old versions passed on the crafted breaks that the review tried.
4. A permanent case was added that takes the real workflow, writes an outside value after a comment mark on a script line, and checks that the test refuses it; this is what you asked for as a mutation case. It carries the mark of the deployment rule. The last reviewer would drop the mark: with it, a red run of this case after an edit of the check could be read as the workflow breaking the rule when it does not. The repository already marks its control cases this way for two other rules, so the cycle kept it. (Minor findings, c-2)
5. As you decided, the guidelines row for the deployment workflow test says which smaller crafted forms its cases do not read, and a reviewer of a later change reads them by hand: a decoy line before the real server call, an option written behind another short flag, a script line that starts with the word the test looks for, a step written as an inline mapping, a quoted key, a YAML anchor and a reusable workflow. Two more forms are not in the list: a key written with a space before its colon and a value that writes the dollar sign as an escape. (Minor findings, c-1)
6. The deployment rule is written down as recovered from the workflow itself, since no decision says it. It rests on no recorded fact: the two facts about how the server connection reads its options are about another machine than the one that runs the workflow, so they are left with the backup script's decision.
7. Three decisions about the emailed links and the page address now say that the new address rule checks them, so the link between the decision and the rule runs both ways.
8. Fifteen existing or new tests now carry a rule's mark: twelve in the three address files and three in the deployment test; no rule is marked as broken, and the foundation check lists no corrected sentence. The map's lists of trust boundaries gained seven files.
9. This correction answered your answer to an item of this request (the one about unfixed findings), and the cycle judged that the foundation required what it changed: the test and the guidelines row had to do and say what they claim.

## Cost

About 1 hour 12 minutes of work by the orchestrator and the agents across both sessions of the cycle, plus two 13-minute full test runs, on 88.4 million tokens counted with cache reads (65.1 million on Sonnet 5.5, 23.3 million on Opus 5.5; 0.4 million of them output). Five reviews: the whole change, the first fix, the return step, the second fix and the correction; two of them failed on one serious finding each, and each failure got one fix and one review of that fix. The table of stages is in the record: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/stages.md

A copy of an agent's check stayed in the ignored working folder of the task: the author's scripts and result files; nothing waits for them, and they go when the task's folder goes. The paths stand in Checks.

## How to merge

Merge with a merge commit, not a squash or a rebase: the link to the record of this cycle points at a commit that only a merge keeps.

<details>
<summary>W twoim języku</summary>

**Stan: gotowe** — poprawione zgodnie z twoją odpowiedzią do pozycji; nic nie czeka na twoją odpowiedź, reszta wymaga tylko scalenia.

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

brak

### Akceptujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś ci nie odpowiada, powiedz którą.

1. Dwa z czterech testów wdrożenia, które nazwało zadanie, nie noszą znaku nowej reguły: ten, który liczy sekrety, i ten, który sprawdza, że klucz nigdy się nie drukuje. Oba przechodzą, gdy regułę złamano (sekret wpisany wprost do skryptu zostawia pierwszy zielony), więc oznaczenie ich twierdziłoby ochronę, której nie dają. Zostają jak były, niepowiązane z żadną regułą. Jeśli chcesz je chronić przed usunięciem, potrzebują własnej reguły.
2. Dwie nowe reguły są sformułowane nieco inaczej niż wiersze zadania. Reguła wdrożenia mówi „skrypt jego kroku wdrożenia” i „w wierszu poleceń”, a nie wspomina już o trybie wsadowym, którego wiersze nie rozstrzygały. Reguła adresu mówi, że token idzie „do treści żądania swojego linku”, gdzie wiersz mówił „swojego jednego żądania”, bo strona wysyła token ponownie po utraconym połączeniu i po odrzuconym haśle. Każda reguła nadal ma dwie klauzule w jednym wpisie, jak chcą wiersze, więc nieudany test pokazuje jedną z dwóch reguł.
3. Dodano dwa przypadki do tabel istniejących testów adresu, po jednym dla każdego z dwóch plików z tokenem: token zakodowany procentowo musi dojść do żądania bez zmian. Mutacje, które dekodowały token, przeżyły każdy istniejący test, więc reguła nie miała dla tego sprawdzenia. Test klucza serwera i test wartości z zewnątrz w workflow wdrożenia przepisano tak, by czytały prawdziwe wywołanie serwera i każdy blok skryptu, bo stare wersje przechodziły na spreparowanych złamaniach, które wypróbował przegląd.
4. Dodano stały przypadek, który bierze prawdziwy workflow, wpisuje wartość z zewnątrz po znaku komentarza w wierszu skryptu i sprawdza, że test ją odrzuca; to jest przypadek mutacyjny, o który prosiłeś. Niesie znak reguły wdrożenia. Ostatni recenzent zdjąłby ten znak: gdy po zmianie sprawdzenia ten przypadek zaświeci na czerwono, można by to odczytać jako złamanie reguły przez workflow, choć workflow jej nie łamie. Repozytorium oznacza tak już swoje przypadki kontrolne dla dwóch innych reguł, więc cykl znak zostawił. (Uwagi drobne, c-2)
5. Zgodnie z twoją decyzją wiersz wytycznych o teście workflow wdrożenia mówi, których drobniejszych spreparowanych postaci jego przypadki nie czytają, i recenzent późniejszej zmiany czyta je ręcznie: wabik przed prawdziwym wywołaniem serwera, opcja zapisana za inną krótką flagą, wiersz skryptu zaczynający się od słowa, którego test szuka, krok zapisany jako odwzorowanie w jednym wierszu, klucz w cudzysłowie, kotwica YAML i workflow wielokrotnego użytku. Dwóch postaci na liście nie ma: klucza z odstępem przed dwukropkiem i wartości, która zapisuje znak dolara jako ucieczkę. (Uwagi drobne, c-1)
6. Regułę wdrożenia zapisano jako odzyskaną z samego workflow, bo żadna decyzja jej nie mówi. Nie opiera się na żadnym zapisanym fakcie: dwa fakty o tym, jak połączenie z serwerem czyta opcje, dotyczą innej maszyny niż ta, która uruchamia workflow, więc zostają przy decyzji skryptu kopii zapasowej.
7. Trzy decyzje o linkach z poczty i adresie strony mówią teraz, że sprawdza je nowa reguła adresu, więc powiązanie decyzji z regułą biegnie w obie strony.
8. Piętnaście istniejących lub nowych testów niesie teraz znak reguły: dwanaście w trzech plikach adresu i trzy w teście wdrożenia; żadna reguła nie jest oznaczona jako złamana, a kontrola fundamentu nie wypisuje poprawionego zdania. Listy granic zaufania w mapie zyskały siedem plików.
9. Ta poprawka odpowiedziała na twoją odpowiedź do pozycji tej prośby (o nienaprawionych uwagach), a cykl uznał, że fundament wymagał tego, co zmieniła: test i wiersz wytycznych musiały robić i mówić to, co twierdzą.

## Koszt

Około 1 godziny 12 minut pracy orkiestratora i agentów w obu sesjach cyklu, plus dwa 13-minutowe pełne przebiegi testów, przy 88,4 mln tokenów liczonych z odczytami pamięci podręcznej (65,1 mln na Sonnet 5.5, 23,3 mln na Opus 5.5; z tego 0,4 mln wyjścia). Pięć przeglądów: całej zmiany, pierwszej poprawki, kroku powrotnego, drugiej poprawki i tej poprawki; dwa z nich padły na jednym poważnym ustaleniu, a każda porażka dostała jedną poprawkę i jeden przegląd tej poprawki. Tabela etapów jest w rekordzie: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/stages.md

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
- `0fb68aa6` — correction 1 for your remarks: the script check is a function, `script_expressions`, that reads script lines whole, so an outside value after a comment mark is refused; the permanent case `test_an_expression_after_a_comment_mark_in_a_script_is_refused` feeds it the real workflow with such a value; the row of `deploy.yml` in `guidelines/testing.md` names the forms its cases do not read and says what the host-key case takes (the first place in the file where `ssh` and a space stand, lines continued by a backslash joined, comments cut). The second return step found nothing to correct and made no commit.
- Item 3 of the task: `scripts/restore-trial.mjs` stays with no trust boundary; nothing was written for it.
- The gap of `cross-part-imports` the task asks to name: it reads `import()` only with a string literal, and `.claude/skills/loop2-play/compose-state.mjs` and its copy in `.agents/skills/loop2-play/` load the built simulation through `import()` of a path built in code, which the test lists under "Does NOT cover"; so no test enforces the new dependency.

## Checks

- Gate on the corrected tree: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/mapa-czesci-z-przegladu-fundamentu/gate_times.md -- npm.cmd test` on `0fb68aa6`, exit 0 (783.313 s, run 1 of 1 on this tree, started 03:58:39 UTC on the signal `start` of the adviser of the day): Node tests 2593 passed, 0 failed, 0 skipped; Python tests 86 + 79 + 254 + 264 = 683 in 4 directories, all passed; foundation check `0 errors`; check of the instruction files `0 error, 144 warn, 7 info`. Nothing failed or did not run in the gate. The gate of the first request head (`e117eccc`, exit 0, 790.753 s, 682 Python tests) is in the record.
- Failing on the base: none (the list is taken from `docs/task-cycles/wpisy-serwera-kopii-i-testow/cycle.md`, commit `d6230ddf`, the last copy of the merged branch; the base is a merge commit whose tree equals its second parent's, so no gate ran on the base).
- Foundation check without `--skip-test-citations` on the finished change: exit 0, `0 errors`, no `listed:` line.
- Own-work checks: the author mutated each marked test's guarded behaviour (26 mutations): each failed on the break and passed after the restore; fix 1, fix 2 and correction 1 each ran the crafted variants against the old and the new case (`reports/author-evidence/`, `reports/fix-1-evidence/`, `reports/fix-2-evidence/`, `reports/correction-1-evidence/`); the mutation case of correction 1 fails on the old logic that cuts comments first and passes on the new one.
- Ruff 0.17.1 from `.runs/quality-venv`: `ruff check tests/deploy/test_deploy_workflow.py` exit 0 after each change; `ruff format --check` exit 1 on lines this change did not write; the authors and reviewers had no Ruff before the orchestrator installed it.
- Not run by this cycle: the reviewers did not run `npm test`; no screenshot (no screen changed); no command on the real server; whether GitHub's own parser accepts the two forms of c-1 was not verified.
- CI: the result of the run on the last head is added after it finishes.
- Working copy left: `.runs/author/` holds the author's scripts and result files; copies are in `reports/`; nothing waits for it.
- Directories of earlier tasks kept: none.
- The checks on the copy of the record and on this description are added with the record's link.

## Foundation entries

- `page-address-fragment` (`row 1`): the fragment of the page's address opens only a screen that D-281 names or the nearest existing one, and the token of an emailed link in that fragment goes unchanged into the body of the request of its own link and nowhere else, the server being the one that judges it.
- `deploy-workflow-input` (`row 2`): the deployment workflow gives the script of its deployment step every value from outside the repository only as an environment variable, and the script's one SSH call sets strict host-key checking on its command line.
- Part map (task items 1 to 7): the *Trust boundary* of `browser-view` and of `deployment` gain the files of items 1 and 2; `agent-workflow` *Depends on* gains `simulation` with its reason; `account-server` loses `simulation`; `.gitattributes` moves to `build-tools`; `tests/invariants/account_container_support.py` moves to `deployment`.
- D-156, D-224 and D-281, *Verification* only (`the cycle's`): each now names `page-address-fragment`, the invariant derived from it.
- No topical section of the decision log was opened; no kept row; no *Violated* mark set or cleared; the table of trust boundaries in `guidelines/testing.md` gained five rows, and its *Decision* and *Invariant* lists gained D-10, D-13, D-224, D-237, D-281, `page-address-fragment` and `deploy-workflow-input`.
- Tests altered: 12 cases in `tests/view/screen-address.test.mjs`, `tests/view/email-confirmation.test.mjs` and `tests/view/password-reset.test.mjs` marked `invariant: page-address-fragment` (and two table rows added); `test_sha_reaches_the_script_only_through_env` and `test_ssh_is_strict_and_batch` in `tests/deploy/test_deploy_workflow.py` marked `invariant: deploy-workflow-input` and rewritten to read the real call and every script block (the first reading script lines whole); the case `test_an_expression_after_a_comment_mark_in_a_script_is_refused`, new, marked the same.

## Minor findings

The Minor findings that no fix made, each in the reviewer's words and with its place in the code. Those that a fix took in (M-1 to M-3, M-5 to M-7, m-1, n-1) are not listed. By your answer, M-4, m-2, m-3, n-3 and N-3 were let through; N-1, N-2, n-2 and n-4 are now named in the guidelines row as forms the cases do not read.

**From the review of the whole change (`reports/review-whole-report.md`):**

**M-4. Each new entry joins more than one rule in one sentence.** `foundations/invariants.md:1400` (the screen a fragment opens; the token going unchanged into its request) and `:1410` (values only through the step's environment; strict host-key checking; batch mode). The invariants template: "One entry states one invariant ... One invariant per entry lets the failure of its test, seen once, show that the test catches that rule (WAY-08)". The task mandates one invariant per row ("nowy niezmiennik"), so this defect is the task's; the marks already split one-to-one (screen-address tests vs. the two token files; the sha test vs. the ssh test), so a split into two entries each would cost only the entries.

**From the review of the fix of the whole change (`reports/review-fix-1-report.md`):**

**N-1. The case does not read an `-o` bundled behind another short flag, while the row says "w każdej postaci opcji, jaką `ssh` przyjmuje".** `tests/deploy/test_deploy_workflow.py:35-38`; `guidelines/testing.md:185`. `ssh` parses its flags with getopt, so `-4o "StrictHostKeyChecking no"` sets the option, but `ssh_options` takes only a word equal to `-o` or starting with `-o`. Break R7 — `ssh -i` changed to `ssh -4o "StrictHostKeyChecking no" -i` — passes the case and the whole file (0 / 0), and `ssh` would use `no`. The row lists three forms and calls them every form `ssh` takes. Two small repairs, either one: read a word matching `-[46AaCfGgKkMNnqsTtVvXxYy]*o` as `-o` too; or let the negative check refuse any `StrictHostKeyChecking` followed by a value other than `yes`, in `=` and space form, anywhere in the text. Short of that, the row could say "w trzech postaciach".

**N-2. The case reads the first `ssh ` it finds in the file, not necessarily the one call.** `tests/deploy/test_deploy_workflow.py:83`. Break R8 sets the real call to `-o "StrictHostKeyChecking no"` and adds an earlier line `echo ssh -o StrictHostKeyChecking=yes -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SSH_HOST" "$DEPLOY_SHA"`. It passes the case and all 16 tests (0 / 0), because `test_one_ssh_call` (unmarked) counts only lines holding `-i`. The row says "w jedynym wywołaniu `ssh`". A decoy has to be written on purpose, which no text test can fully stop. Taking the call as the line that holds `-i "$key_file"`, or asserting in the case that there is exactly one `ssh ` word, would close it.

**N-3. The invariant's marked case also fails on a property that is no rule of the invariant.** `tests/deploy/test_deploy_workflow.py:87`. R2 (`BatchMode=no` before `yes`) fails the case (1 / 1), though `deploy-workflow-input` no longer says anything of batch mode. A red run of this case can therefore be read as a break of the invariant when it is not. The orchestrator allowed this, and the row says it openly ("co nie jest regułą niezmiennika"), so I record it only: moving the `BatchMode` assertion to an unmarked case of its own would keep the mark's meaning exact.

**From the review of the return step (`reports/review-return-step-report.md`):**

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

**From the review of correction 1 (`reports/review-correction-1-report.md`):**

### Minor

**c-1 — Two more crafted spellings the cases do not read are missing from the row's list.**
Place: `guidelines/testing.md:185`, the sentence „Tych postaci przypadki nie czytają …”. A key written
with a space before its colon, `run : echo ${{ … }}` (U1), and a double-quoted value whose `$` is
written as the YAML escape `\u0024`, `run: "echo \u0024{{ github.event.head_commit.message }}"` (U2):
the sha case and all 17 cases pass on both (`probe3-out.txt`, U1, U2; `variant-U1.yml`,
`variant-U2.yml`). Both are YAML that a parser reads as the key `run` and as a value holding `${{`, and
both must be written on purpose, as the forms the row does list. The remark asks the row to say plainly
which crafted forms are not read; a closing clause would cover these and the rest of their kind, e.g.
„ani żadnej innej pisowni YAML, w której tekst pliku różni się od wartości, jaką czyta GitHub, jak
odstęp przed dwukropkiem klucza albo znak ucieczki w napisie w cudzysłowie”.

**c-2 — The mutation case should carry no `invariant:` mark.**
Place: `tests/deploy/test_deploy_workflow.py:136`. The sentence of `deploy-workflow-input`
(`foundations/invariants.md:1410`) is about the data — what the deployment workflow gives its script.
The invariants template of the pinned the-way says a test fed input made up for it is the method of a
sentence about the check it exercises, never of one about the data that check reads
(`.the-way/elements/invariants/template.md:55-57`, WAY-61). The mutation case feeds made-up input (the
workflow with an added expression) to check the check; its own control line reads the real file, but
that part only repeats the sha case. With the mark, a red mutation case after an edit of the checking
logic reads as the workflow breaking the invariant while the workflow still complies — the same
misreading N-3 named. Which way: drop the mark; the sha case stays the marked refusal test of the row,
which the rule of `### Trust boundaries` (`guidelines/testing.md:160-163`) asks for. The author's
precedent is real — `test_control_the_scan_flags_each_forbidden_form` of `icon-file-content` and
`test_control_a_tsx_source_below_a_nested_package_is_refused` of `application-package-layout` carry
their marks the same way, and the row of `assets/icons/` names the control case as its refusal test —
so the product already departs from the template there; that is why this is Minor and not a
departure this change alone makes. A sentence about the check (a second invariant) would be the other
lawful way, but it is a new entry the remarks did not ask for.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the task "the map of parts from the review of the foundation" (independent), approved with its settlements 2026-11-13; sources: the review of the foundation of 2026-11-13, findings F-15, F-16, F-33, F-34 and F-35, and the foundation at the base `ea638397`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved by the task.
- **Spec:** none; the task settles every entry, and the wording of an entry follows from its rows.
- **Route:** one author without a plan (`the-way-author`, class `same` as the orchestrator, Sonnet 5.5), because the change is a handful of foundation entries, one table and marker lines in four test files; reviews by Opus 5.5 agents that did not make the change.
- **Plan:** none.
- **Choices:** 15 choices of the cycle, with the evidence and the cost if wrong, in the questions table of the record.
- **Blocking findings left:** none; two blocking findings were fixed (the host-key test of the deploy workflow in the review of the whole change; the row about script blocks in the review of the return step), each by one fix and one review of it.
- **Correction 1:** your remarks of the comment on this request, `reports/correction-1-remarks.md` of the record; it was made on top of the request's head `6bc246ab`, with no reset, and `main` had not moved, so no merge was needed.
- **Record:** https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/mapa-czesci-z-przegladu-fundamentu/cycle.md
