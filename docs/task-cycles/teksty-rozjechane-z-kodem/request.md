**State: ready** — corrected for your answer on the server reads (option A); all 42 items are made, reviewed and tested, and the items below wait only for your yes.

## What you will see

The texts that the agents read at every task now say what the code does, in all 42 items, and the process behind them is moved to the latest version.

- **The process.** The pinned version of the way of working is moved to its latest commit (115 commits newer), as you asked at the start; the whole test run passed on that commit before any change was made.
- **Setup text.** The README and the package files require Node.js 24.15.0 or newer in line 24, because that is what the pinned npm and jsdom ask for; npm will warn on an older Node. The README's browser check says "with a footer", names the screen Przejście as the game does, and no longer mentions the tile panel that was removed. The build list is split into one point per matter and says once where the sprites come from.
- **The page of all states** now draws the icons on a tile the way the game does, from the game's own placement code, so the samples change when the game changes. The sample "Wyczerpane" no longer says that a stock never falls to zero.
- **The server** now refuses to start when the mail password file decodes to an empty password, also a file holding only a byte-order mark, as the decision on startup says. Before, such a file passed and the mistake showed at the first login to the mail service.
- **Guidelines.** The coding, testing and styleguide guidelines and the instructions for the browser view now agree with the code in the places the review found: where the mail sender's address comes from, the list of attempt releases, the status of two pure modules, the level of the document test, the React forms of the controls, a changed token value, and others.
- **The deploy skill** lets the agent read more on the server, only what you allowed: the number of the forced-command key lines (the number only), the mode and owner of the installed deploy script, and, after your answer, the version of four tools (`stat`, `grep`, `docker`, `free`).
- **The four facts about the test server's state** were read again by the agent on the day of this request, through the server tool and only with allowed commands, and each now carries its reading with the tool's version: the installed script is owned by root with mode 0755; exactly one key line carries the forced command; two containers of the old game run; the swap is zero.
- **Foundation entries.** About twenty decisions, one glossary entry and six environment facts were corrected or added: quotations with their place and read date, the wording of "restore" and "place on the list", the number of saves in a day, the rejected ways that nobody proposed, and others.

No screenshot is shown (see "For you to decide", 5).

### Underneath

Everything is text or small corrections of code, except two small code changes (the page's icon placement and the startup check) that came with a failing test first. No log line, no data of a player and no deployment is touched; the only thing run on your server was read-only commands from the list you allowed.

## For you to decide

1. **Choices of the cycle beyond the task's words.** (a) Two rejected ways in the decisions on the place of the explanation about the pause were dropped, not marked "unknown", because the order they rejected no longer exists on the screen and the sources keep no reason that survives; the record no longer shows you weighed them. Accept? (b) The rule that the two measuring commands print a message and not a log line was written into the existing decision on failures, not as a new decision next to the one on the operator's commands; a short pointer joins the two. Accept? (c) The reason why an action with no target in the rule panel gives way to the next one was worded from the earlier cycle's record and its review, because the line the task named holds only the choice. Accept? (d) The startup refusal covers only a password that decodes to nothing; a byte-order mark followed by characters is still accepted with the mark dropped. Accept? (e) The reading of the container list quotes two rows cut before the ports column, with the container ids and the quotes the host prints, and so shows the containers by their image names; the sentence of that fact still says "the old loop game". Accept? (f) The sentence about the forced-command key line stays as it was: it is wider than its reading only by the identity of the account the agent's command runs as, which no allowed read can show. Accept?
2. **Entries you did not see at the task.** One sentence changed beyond its row: an example in the decision on the release check now says that a build of the same commit takes the step from its cache (it follows from the corrected reason, since a new commit always changes the build argument). The source of one decision on the HTTP server now cites the frozen edition of the Node.js page instead of the moving one. The sentence of the swap fact now says only that the host reports zero total swap, no longer where the host reports it, because the reading by the allowed command cannot show that. Accept?
3. **A changed test.** The startup test that guards the rule on the mail password file gained two cases: a file with only a byte-order mark and one with a mark and a newline are refused; a case that a mark followed by text is accepted was added beside it. No other invariant, surface or violated mark changed.
4. **Findings left unfixed that you may feel.** A mail password file holding two byte-order marks still passes startup, as before; the decision allows it. Two entries (the decision on the time away and the text of its invariant) still call the state kept in the page's memory "saved", which two corrected decisions now call "unsaved". The testing guidelines' list of boundary checks does not name the startup refusal. One source label in the decision on the runtime still calls an unlabelled figure a total. The fact about outbound connections from the host still opens its source with "observed" and names no tool or version, and the skill's new version queries do not cover the tool it would need. Fix it in this request, or make a task of it? (Minor findings, 1-6; Findings outside the task's scope, 1-4.)
5. **No screenshot of the changed page.** The page of all states was looked at in a browser after the change and a screenshot was taken, but the product has settled no place for screenshots, so the request shows none. Merge without seeing the page?
6. **How much the reviews read.** The review of the whole change read 20 of the decisions of its selection whole and 12 only at the changed parts, ran through the titles of none of the rest, and read four guideline files at the changed parts and their surroundings, not whole; it said so in its report. The review of the correction checked the form, the consistency and the dependants of the four readings but could not re-run them on the server (the reviewer has no access to the server tool), so the outputs are the executor's own. Merge anyway?

## Cost

About 2 hours 24 minutes of working time, 160.5 million tokens (mostly cached input): 141.3 million on the larger model and 19.2 million on the smaller model that made the simple slices. Three review rounds had findings or were repeated (the first slice with the foundation entries, the whole change, and the correction for your answer), each with one fix and one review of the fix, except the correction, which passed at once. The table of stages is in the committed record: the record's table of stages (the link is added after the record is committed).

## How to merge

Merge with the merge that keeps the commits (as the history of this repository does), because the link to the record in this description survives only then. The foundation has waited for a review through 70 merges since the start of the history (no earlier review is tagged); the review is the skill that reviews the foundation, started in a session in this repository; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione dla Twojej odpowiedzi o odczytach na serwerze (wariant A); wszystkie 42 pozycje są zrobione, przejrzane i przetestowane, a poniższe pozycje czekają już tylko na Twoje „tak”.

### Co zobaczysz

Teksty, które agenci czytają przy każdym zadaniu, mówią teraz to, co robi kod, we wszystkich 42 pozycjach, a proces, na którym stoją, jest przesunięty na najnowszą wersję.

- **Proces.** Przypięta wersja sposobu pracy jest przesunięta na jej najnowszy commit (115 commitów nowszy), tak jak prosiłeś na początku; pełny przebieg testów przeszedł na tym commicie, zanim cokolwiek zmieniono.
- **Tekst uruchomienia.** README i pliki pakietu wymagają Node.js 24.15.0 lub nowszego w linii 24, bo tego żądają przypięte npm i jsdom; npm ostrzeże przy starszym Node. Sprawdzenie w przeglądarce w README mówi „ze stopką”, nazywa ekran Przejście tak jak gra i nie wspomina już o panelu terenu, który usunięto. Lista budowania jest podzielona na jeden punkt na sprawę i raz mówi, skąd są grafiki.
- **Strona wszystkich stanów** rysuje teraz ikony na kafelku tak jak gra, z jej własnego kodu rozmieszczenia, więc próbki zmieniają się razem z grą. Próbka „Wyczerpane” nie twierdzi już, że zapas nigdy nie spada do zera.
- **Serwer** odmawia teraz startu, gdy plik hasła poczty po dekodowaniu daje puste hasło, także plik z samym znacznikiem BOM, tak jak mówi decyzja o starcie. Wcześniej taki plik przechodził, a błąd wychodził dopiero przy pierwszym logowaniu do poczty.
- **Wytyczne.** Wytyczne kodu, testów i styleguide oraz instrukcje dla widoku przeglądarki zgadzają się teraz z kodem w miejscach, które wskazał przegląd: skąd pochodzi adres nadawcy poczty, lista zwolnień próby, status dwóch czystych modułów, poziom testu dokumentu, formy React kontrolek, zmiana wartości tokenu i inne.
- **Skill wdrożenia** pozwala agentowi odczytać na serwerze więcej, tylko to, na co pozwoliłeś: liczbę wierszy kluczy z wymuszonym poleceniem (sama liczba), tryb i właściciela zainstalowanego skryptu wdrożenia oraz, po Twojej odpowiedzi, wersję czterech narzędzi (`stat`, `grep`, `docker`, `free`).
- **Cztery fakty o stanie serwera testowego** agent odczytał ponownie w dniu tego żądania, przez narzędzie serwera i tylko dozwolonymi poleceniami; każdy niesie teraz swój odczyt z wersją narzędzia: zainstalowany skrypt należy do roota z trybem 0755; dokładnie jeden wiersz klucza niesie wymuszone polecenie; działają dwa kontenery starej gry; swap wynosi zero.
- **Wpisy fundamentu.** Poprawiono albo dodano około dwudziestu decyzji, jedno hasło słownika i sześć faktów środowiska: cytaty z miejscem i datą odczytu, brzmienie „restore” i „place on the list”, liczbę zapisów na dobę, odrzucone warianty, których nikt nie proponował, i inne.

Nie pokazuję zrzutu ekranu (zob. „Do rozstrzygnięcia”, 5).

#### Pod spodem

Wszystko to tekst albo drobne poprawki kodu, poza dwiema małymi zmianami kodu (rozmieszczenie ikon na stronie i kontrola startu), które przyszły z testem czerwonym na początku. Żaden wiersz logu, żadne dane gracza i żadne wdrożenie nie są ruszane; na Twoim serwerze uruchomiono tylko polecenia tylko do odczytu z listy, którą dopuściłeś.

### Do rozstrzygnięcia

1. **Wybory cyklu poza słowami zadania.** (a) Dwa odrzucone warianty w decyzjach o miejscu wyjaśnienia pauzy usunięto zamiast oznaczyć „unknown”, bo odrzucony porządek już nie istnieje na ekranie, a źródła nie trzymają powodu, który przetrwał; zapis nie pokazuje już, że je rozważyłeś. Przyjąć? (b) Regułę, że dwa polecenia pomiarowe wypisują komunikat, a nie wiersz logu, wpisano do istniejącej decyzji o awariach, a nie jako nową decyzję obok tej o poleceniach operatora; krótkie odesłanie łączy obie. Przyjąć? (c) Powód, dla którego czynność bez celu w panelu reguły ustępuje następnej, sformułowano z zapisu wcześniejszego cyklu i jego przeglądu, bo wiersz wskazany w zadaniu trzyma tylko wybór. Przyjąć? (d) Odmowa przy starcie dotyczy tylko hasła, które po dekodowaniu jest puste; znacznik BOM z dalszymi znakami jest nadal przyjmowany z odrzuconym znacznikiem. Przyjąć? (e) Odczyt listy kontenerów cytuje dwa wiersze obcięte przed kolumną portów, z identyfikatorami kontenerów i cudzysłowami, które wypisuje host, więc pokazuje kontenery po nazwach obrazów; zdanie tego faktu nadal mówi „stara gra loop”. Przyjąć? (f) Zdanie o wierszu klucza z wymuszonym poleceniem zostaje bez zmian: jest szersze od swojego odczytu tylko o tożsamość konta, na którym działa polecenie agenta, czego żaden dozwolony odczyt nie pokaże. Przyjąć?
2. **Wpisy, których nie widziałeś przy zadaniu.** Jedno zdanie zmieniono poza swoim wierszem: przykład w decyzji o sprawdzeniu wydania mówi teraz, że budowanie tego samego commita bierze krok z pamięci podręcznej (wynika to z poprawionego powodu, bo nowy commit zawsze zmienia argument budowania). Źródło jednej decyzji o serwerze HTTP cytuje teraz zamrożone wydanie strony Node.js zamiast ruchomego. Zdanie faktu o swapie mówi teraz tylko, że host zgłasza zerowy swap, bez wskazania, gdzie to zgłasza, bo odczyt dozwolonym poleceniem tego nie pokaże. Przyjąć?
3. **Zmieniony test.** Test startu, który pilnuje reguły o pliku hasła poczty, dostał dwa przypadki: plik z samym znacznikiem BOM i plik ze znacznikiem i nową linią są odrzucane; obok dodano przypadek, że znacznik z tekstem jest przyjmowany. Żaden inny niezmiennik, powierzchnia ani znacznik naruszenia się nie zmieniły.
4. **Nienaprawione uwagi, które możesz odczuć.** Plik hasła poczty z dwoma znacznikami BOM nadal przechodzi start, jak dotąd; decyzja na to pozwala. Dwa wpisy (decyzja o czasie nieobecności i tekst jej niezmiennika) nadal nazywają stan trzymany w pamięci strony „saved”, a dwie poprawione decyzje nazywają go teraz „unsaved”. Wytyczne testów w liście kontroli granic nie nazywają odmowy przy starcie. Jedna etykieta źródła w decyzji o środowisku uruchomieniowym nadal nazywa liczbę bez etykiety sumą. Fakt o połączeniach wychodzących z hosta nadal zaczyna źródło od „observed” i nie nazywa narzędzia ani wersji, a nowe zapytania o wersję nie obejmują narzędzia, którego by potrzebował. Naprawić w tym żądaniu, czy zrobić z tego zadanie? (Minor findings, 1-6; Findings outside the task's scope, 1-4.)
5. **Brak zrzutu zmienionej strony.** Stronę wszystkich stanów obejrzano w przeglądarce po zmianie i zrobiono zrzut, ale produkt nie ustalił miejsca na zrzuty ekranu, więc żądanie żadnego nie pokazuje. Scalić bez zobaczenia strony?
6. **Ile przeczytały przeglądy.** Przegląd całej zmiany przeczytał w całości 20 decyzji ze swojej selekcji, a 12 tylko w zmienionych miejscach, nie przebiegł tytułów reszty i cztery pliki wytycznych przeczytał w zmienionych miejscach z otoczeniem, nie w całości; powiedział to w raporcie. Przegląd poprawki sprawdził formę, spójność i zależne wpisy czterech odczytów, ale nie mógł ich powtórzyć na serwerze (recenzent nie ma dostępu do narzędzia serwera), więc wyniki poleceń są wynikami wykonawcy. Scalić mimo to?

### Koszt

Około 2 godzin 24 minut czasu pracy, 160,5 miliona tokenów (głównie wejście z pamięci podręcznej): 141,3 miliona na większym modelu i 19,2 miliona na mniejszym, który zrobił proste plastry. Trzy rundy przeglądu miały uwagi albo były powtórzone (pierwszy plaster z wpisami fundamentu, cała zmiana oraz poprawka dla Twojej odpowiedzi), każda z jedną poprawką i jednym przeglądem poprawki, poza poprawką, która przeszła od razu. Tabela etapów jest w zatwierdzonym rekordzie: the record's table of stages (the link is added after the record is committed).

### Jak scalić

Scal scaleniem zachowującym commity (jak historia tego repozytorium), bo link do rekordu w tym opisie przetrwa tylko wtedy. Fundament czeka na przegląd przez 70 scaleń od początku historii (żaden wcześniejszy przegląd nie jest oznaczony tagiem); przegląd to skill przeglądający fundament, uruchomiony w sesji w tym repozytorium; nic w tym żądaniu na niego nie czeka.

</details>

## Technical changes

The change is 46 commits on `main` at `2fe922c` (the head before the cycle's second record is `102b4f3`), and the two commit pairs that add and remove the record. By group:

- **Process pin** (`adbec4b`): the gitlink of `.the-way` moves from `294af7f` to `e3825a8`; the installer rewrote nothing else.
- **Foundation entries, 20 rows** (`6c31f59`..`3fcf546`, then fixes `7a879fa`, `c3c632a`, `4b78a4c`, `6c089cd`, `b60b582`, `8183881`): edits in place of D-01, D-02, D-04, D-05, D-48, D-54, D-56, D-67, D-101, D-111, D-147, D-156, D-183, D-185, D-207, D-213, D-237, D-252, D-269, D-312, D-313; the glossary entry `catch-up`; the fact `docker-build-cache-invalidation`; the new fact `browser-bare-import-resolution`.
- **Setup text** (`fe84d1e`, `1a79cc2`, fix `d1dbe4f`): `README.md`, `package.json` and the root entry of `package-lock.json` (one line each for the Node range).
- **Page of all states** (`e04ac0e`): `iconPlaces`, `TILE_SIZE` and `ICON_SQUARE` (1.4 × the tile size) are exported from `src/browser/view/terrain-picture.ts` and called by `drawSample` in `src/browser/kitchen-sink/kitchen-sink.ts`; the note of the "Wyczerpane" sample says what the game does; a case in `tests/view/terrain-picture.test.mjs` fixes the placement for two, four and five icons, seen failing first.
- **Startup check** (`60c799e`): `readSmtpPassword` in `src/server/configuration.ts` refuses a decoded password equal to the empty string; `tests/startup.test.mjs` has the new fixtures.
- **Comments and names in tests** (`75d9943`, `f96f56f`): "restore" in `tests/http.test.mjs` and `tests/sim/program-counts.test.mjs`; the docstring of `tests/invariants/test_loop2_container_sprites.py` names the case of `tests/view/scene-picture.test.mjs`.
- **Deploy skill** (`c2cfc04`, then `f33f110` for the correction): the list "Allowed" of `.claude/skills/loop2-deploy/SKILL.md` and its byte-identical copy under `.agents/` gains `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy`, the count of key lines (`grep -c`, count only), and `stat --version`, `grep --version`, `docker --version`, `free --version`, each alone.
- **The four host facts, item 22** (`102b4f3`): the *Source* of `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads` and `mikrus-host-swap` in `foundations/environment_facts.md` is a reading of 2026-11-10 with the tool's version (stat 8.32, grep 3.7, Docker 28.1.1, free from procps-ng 3.3.17), the host written as "the test server's host"; the sentence of `mikrus-host-swap` is narrowed.
- **Guidelines and browser instructions** (`af823e0`, `4e4ac09`, `b8abf53`, `0fba2b3`, fixes `efd26ba`, `eb43999`, `a5af9a7`, `f5c7601`): `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-mail-sending.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.
- **Fix for the Minor findings within the task**: part of the fix range `0fba2b3..f5c7601` (11 commits). It passed its review; nothing was reverted.

## Checks

- **Gate:** `npm test` on the corrected tree `102b4f3`, exit 0: `543 tests in 4 directories; every directory passed`, `0 errors` of `python -B .the-way/elements/common/foundation_check.py` (the third stage of the gate). It also passed on `f5c7601` before the correction. No check failed or was unrun. On the base (`2fe922c`) the first full run had exit 1 only because a fresh worktree lacked the ignored `.runs/quality-venv` (two tests in `tests/quality/test_quality_invariants.py`); with the venv built by the README they pass, and the foundation check on the base is exit 0. On the pin-move commit `adbec4b` the gate was exit 0, so no check fails there that passed on the base.
- **Own-work checks:** each slice reported one (`reports/slice-N-report.md`); the weakest points checked are in the record: the lockfile diff is one line; the new case of the terrain-picture test failed before the export and passed after; the byte-order-mark fixture failed before the check (exit 1, "Missing expected rejection") and passed after, and the reviewer ran the base source and the head in a scratch copy; the count command printed only the count on scratch files with fake keys; the 28 quotations of the corrected sources were re-fetched; the four host readings were made through the server tool with the allowed commands only (outputs in the report of the step), and the reviewer of the correction checked their form but could not re-run them.
- **User interface:** the page of all states was built (`npm run typecheck`, the kitchen-sink build invariant) and looked at once in a browser by the executor of the slice (a screenshot of the five-icon sample in its 2-2-1 layout and the corrected note, kept in an ignored folder, not shown); the product settles no place for screenshots.
- **Form check of this description:** `python -B .the-way/task-cycle/request_check.py docs/task-cycles/teksty-rozjechane-z-kodem/request.md --task docs/task-cycles/teksty-rozjechane-z-kodem/task.md`, exit 0 (last run on this edit). **Check of private paths on this description:** `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/teksty-rozjechane-z-kodem/request.md`, exit 0. **On the copy of the record** (`docs/task-cycles/teksty-rozjechane-z-kodem`, commit added after the record is committed): private paths `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/teksty-rozjechane-z-kodem`, image files `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/teksty-rozjechane-z-kodem` and remarks `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/teksty-rozjechane-z-kodem`: written after the copy is committed. **Remarks check on the original:** the same command on `docs/task-cycles/teksty-rozjechane-z-kodem`, exit 0 after the items were written into the record (51 items in all; it listed 47 on the first run and 4 after the correction). The cycle holds no listing wrong.

## Foundation entries

Marked `row <n>` where the entry is the one the task's row of *Settlements to record* settles, otherwise by the task's item (all were approved with the task; none is marked "the cycle's" by the writers).

- D-252 — `row 1`: what the two measuring commands print on failure is no log line of the log's form, so it keeps the error's text and gets no failure line of that form (the report of `measure-passwords` stays one JSON object, its code unchanged); a pointer joins it to D-354.
- D-111 — `row 2`: the mail password file must decode to a nonempty password, so an empty file, a file of only a byte-order mark and a trailing newline are all refused at startup.
- D-01, D-02, D-05 (item 21) — each page of *Based on* quotes a passage word for word with its place and read date 2026-11-10; D-02 cites the frozen edition of the Node.js HTTP page.
- `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads`, `mikrus-host-swap` (item 22) — each *Source* is a reading of 2026-11-10 with the tool's version; the sentence of the swap fact is narrowed to "The test server's host reports zero total swap."
- D-48 (item 24) — the *Origin* says the cycle chose the names of tokens other than roles (Decision 1 of its spec, at a commit).
- D-54 (item 25) — *Rejected* reads `unknown`; the *violates* example stays.
- D-54, D-56 (item 26) — "place on the list" means one thing: the order does not change, the position number shifts.
- D-56 (item 27) — the first character of a game gets 1, as the code gives it.
- D-67 (item 28) — the first *complies* example speaks of a tile missing two sticks.
- D-156 (item 30) — the rationale says the player's webmail page, not a "mail service".
- D-183 (item 31) — *Rejected* gives the way of question Q6 of the frozen task of the expedition plan, without the plan's task numbers.
- D-04, D-213 (item 32) — they name the state D-211 calls the unsaved game state by that name.
- D-101 (item 33) — "restore" in place of "resurrect".
- `docker-build-cache-invalidation` and D-237 (item 34) — the fact quotes "Build arguments do result in cache invalidation." and D-237 says the release check returns with a new commit through the build argument `LOOP2_COMMIT`.
- D-207 (item 35) — a tab left open for a day sends about 2880 saves at the 30-second rhythm.
- `catch-up` (glossary, item 36) — the computing of the game minutes that passed since the save time, after each load of a saved game state and after a sign-in with the unsaved game state kept in the page's memory.
- `browser-bare-import-resolution` (new fact, item 38) and D-269 — the browser resolves no bare import, named in D-269's *Based on*.
- D-313 (items 39, 40) — the last rejected variant is dropped; the rationale gives the reason an action with no target gives way to the next.
- D-147, D-185 (item 41) — the "above discovery" variants are dropped.
- D-312 (item 42) — "Its further cost" names the third way: the game's rule moved to a later group.
- Invariants: none written or changed; the case of `tests/startup.test.mjs` that carries `account-startup-configuration` gained fixtures; no surface and no *Violated* mark changed.

## Minor findings

Minor findings that no fix made, each with its reviewer's words (full text in the record's reports):

1. Fix review of the whole change, N1: "D-01 still says 'respondents to the runtime question' for the 11,141 figure" — `foundations/decisions.md`, *Based on* of D-01; the page does not label that figure.
2. Fix review of the whole change, N2: "the D-252 binding paragraph is now long" — `foundations/decisions.md`, D-252.
3. Fix review of the whole change, N3: an observation, not a defect.
4. Review of the whole change, 4 and 16, and of Slice 1, M4: the weighed "above discovery" ways of D-147 and D-185 were deleted, not reworded ("the record no longer shows the human weighed it"); D-237's example is wider than its row ("no change needed"). Left as the reviewers said; they stand in "For you to decide", 1a and 2.
5. Review of correction 1, Minor 1 and 2: the forced-command sentence is slightly wider than its reading (a trailing space and the account); the sentence of `mikrus-host-docker-workloads` names "the old loop game", but the quoted rows show only the image `loop:latest` — `foundations/environment_facts.md`.
6. Review of correction 1, Minor 3: the quoting of the `docker ps` rows is loose (rows cut before the ports column, nested quotes, container ids) — `foundations/environment_facts.md`, the *Source* of `mikrus-host-docker-workloads`.

## Findings outside the task's scope

1. Review of Slice 4 and of the whole change, 8: "the trust-boundary row for `src/server/` in `guidelines/testing.md` does not name the startup refusal of the mail password file" — the case that guards it carries the invariant marker, so the boundary is covered.
2. Review of Slice 4 and of the whole change, 9: "a file of two byte-order marks decodes to the single character U+FEFF and is accepted … D-111 allows it, because U+FEFF is a format character. Whether to refuse it is the human's decision." — `src/server/configuration.ts`, `readSmtpPassword`.
3. Review of the whole change, 17: "D-247 and the invariant `catch-up-minutes` still speak of 'a load of a saved game state' for the case of the state kept in the page's memory; item 32 names only D-04 and D-213."
4. Return step of correction 1: the fact `mikrus-tunnel-outbound-tcp` (`foundations/environment_facts.md`) still opens its *Source* with "observed:" and names no tool or version; the skill's new allowance does not cover `curl --version`, so bringing it to the `reading:` form would also need a further allowance.
5. Noted by reviewers, not graded: D-165 and others use "place on the list" for the list of programs; D-185 still holds "changes the accepted placement below the status"; no test pins the floor `24.15.0` of the Node range (a change to `^24.0.0` would pass every check).

## Course of the cycle

- **Task and sources:** independent task "agree the foundation, guidelines, README and the page of all states with the code" (42 items, 7 answered questions, 2 settlement rows), from the review remarks of 2026-11-06; sources read at `main` `2fe922c`.
- **Process pin:** moved from `294af7f` to `e3825a8` by the task branch's first commit `adbec4b` (at the user's instruction); the gate on that commit passed (`npm test` exit 0, `0 errors`), nothing failed there that passed on the base.
- **Spec:** none; no open design choice was found.
- **Route:** planned slices (six parts of the part map, code and tests, three guideline skills and five foundation element skills, and a read of the remote host); the foundation entries in two runs, the code and text in twelve slices. Correction 1: your answer A on the first request (2026-11-10); reset base `e9bca2f` (the removal of the first record); remote `main` unchanged, nothing to merge; the executors of Slice 7 and Slice 8 resumed, one review (`PASS 102b4f3`), the return step with no commit, the gate on the corrected tree.
- **Plan:** `.runs` plan with 20 foundation-entry rows and 12 slices (copied into the record).
- **Choices:** nine rows in the questions table of the record.
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds the record is added after that commit
