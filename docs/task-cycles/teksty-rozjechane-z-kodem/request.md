**State: ready** — corrected for your answers (the server reads, the choices of the cycle, the findings you may feel); all 42 items are made, reviewed and tested, and the items below wait only for your yes.

## What you will see

The texts that the agents read at every task now say what the code does, in all 42 items, and the process behind them is moved to the latest version.

- **The process.** The pinned version of the way of working is moved to its latest commit (115 commits newer), as you asked at the start; the whole test run passed on that commit before any change was made.
- **Setup text.** The README and the package files require Node.js 24.15.0 or newer in line 24, because that is what the pinned npm and jsdom ask for; npm will warn on an older Node. The README's browser check says "with a footer", names the screen Przejście as the game does, and no longer mentions the tile panel that was removed. The build list is split into one point per matter and says once where the sprites come from.
- **The page of all states** now draws the icons on a tile the way the game does, from the game's own placement code, so the samples change when the game changes. The sample "Wyczerpane" no longer says that a stock never falls to zero.
- **The server** now refuses to start when the mail password file decodes to nothing: an empty file, or a file holding only byte-order marks, one or several (after your answer, two marks are refused too). A mark followed by characters is still accepted with the mark dropped. Before, such a file passed and the mistake showed at the first login to the mail service.
- **Guidelines.** The coding, testing and styleguide guidelines and the instructions for the browser view now agree with the code in the places the review found: where the mail sender's address comes from, the list of attempt releases, the status of two pure modules, the level of the document test, the React forms of the controls, a changed token value, the startup refusal in the list of boundary checks, and others.
- **The deploy skill** lets the agent read more on the server, only what you allowed: the number of the forced-command key lines (the number only), the mode and owner of the installed deploy script, and the version of four tools (`stat`, `grep`, `docker`, `free`).
- **The four facts about the test server's state** were read again by the agent on the day of the first request, through the server tool and only with allowed commands, and each carries its reading with the tool's version: the installed script is owned by root with mode 0755; exactly one key line carries the forced command; two containers of the old game run; the swap is zero.
- **Foundation entries.** About twenty decisions, one glossary entry and six environment facts were corrected or added: quotations with their place and read date, the wording of "restore" and "place on the list", the number of saves in a day, the rejected ways that nobody proposed, the time-away rule that now names the state kept in the page's memory, the figure of the runtime survey that no longer claims a number of respondents, and others.

No screenshot is shown (see "For you to decide", 4).

### Underneath

Everything is text or small corrections of code, except two small code changes (the page's icon placement and the startup check) that came with a failing test first. No log line, no data of a player and no deployment is touched; the only thing run on your server was read-only commands from the list you allowed.

## For you to decide

1. **Choices of the cycle in your last correction.** (a) The startup refusal covers a password that is empty once every byte-order mark is taken out; a mark followed by characters stays accepted, and with two marks before the text the second mark stays in the password. The cycle took this as the smallest reading of "refuse a file of two marks"; refusing every file that starts with a mark was rejected, since the task asked only for a password that decodes to nothing. Accept? (b) The decision on the runtime survey now cites the first three rows of the chart by rank and no longer says how many people answered, because the page does not say it. Accept? (c) The testing guidelines now name the startup refusal in their row for the server's boundary and in the two lists beside it, one step beyond what the remark asked. Accept?
2. **A further allowance for the agent on your server.** The fact about outbound connections from the host still opens its source with "observed" and names no tool or version. To bring it to the form of a reading, the agent would need `curl --version` on your server, which the list you allowed does not hold, so the cycle did not change the fact. Allow that one version query, and a further correction does it (recommended: it prints only a version), or leave the fact as it is?
3. **A changed test.** The startup test that guards the rule on the mail password file now refuses a file of one, two or three byte-order marks and a file of a mark and a newline, and accepts a mark followed by text and two marks followed by text. No other invariant, surface or violated mark changed.
4. **No screenshot of the changed page.** The page of all states was looked at in a browser after the change and a screenshot was taken, but the product has settled no place for screenshots, so the request shows none. Merge without seeing the page?
5. **Findings still unfixed, all small.** Two entries (the one on the death of a character and an invariant on it) still say "a load of a saved game state" where the state kept in the page's memory is also loaded; the title of the startup test case still says "non-empty"; the time-away decision and the glossary entry word one thing differently; two decision sentences are long; and the rule on the password file rests on the Node decoder dropping a leading mark, which no environment fact states (the test runs the real decoder). Make a task of it? (Minor findings, 1-9; Findings outside the task's scope, 1-3.)
6. **How much the reviews read.** The review of the whole change read 20 of the decisions of its selection whole and 12 only at the changed parts, ran through the titles of none of the rest, and read four guideline files at the changed parts and their surroundings, not whole; it said so in its report. The review of the first correction could not re-run the four server readings (the reviewer has no access to the server tool), so those outputs are the executor's own. The review of the last correction ran the crafted password files itself. Merge anyway?

## Cost

About 2 hours 43 minutes of working time, 188.0 million tokens (mostly cached input): 165.7 million on the larger model and 22.3 million on the smaller model that made the simple slices. Review rounds with findings or repeated: the first slice with the foundation entries and the whole change (each with one fix and one review of the fix), and two corrections for your answers (each reviewed once and passed). The table of stages is in the committed record: the record's table of stages (the link is added after the record is committed).

## How to merge

Merge with the merge that keeps the commits (as the history of this repository does), because the link to the record in this description survives only then. The foundation has waited for a review through 70 merges since the start of the history (no earlier review is tagged); the review is the skill that reviews the foundation, started in a session in this repository; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione dla Twoich odpowiedzi (odczyty na serwerze, wybory cyklu, uwagi, które możesz odczuć); wszystkie 42 pozycje są zrobione, przejrzane i przetestowane, a poniższe pozycje czekają już tylko na Twoje „tak”.

### Co zobaczysz

Teksty, które agenci czytają przy każdym zadaniu, mówią teraz to, co robi kod, we wszystkich 42 pozycjach, a proces, na którym stoją, jest przesunięty na najnowszą wersję.

- **Proces.** Przypięta wersja sposobu pracy jest przesunięta na jej najnowszy commit (115 commitów nowszy), tak jak prosiłeś na początku; pełny przebieg testów przeszedł na tym commicie, zanim cokolwiek zmieniono.
- **Tekst uruchomienia.** README i pliki pakietu wymagają Node.js 24.15.0 lub nowszego w linii 24, bo tego żądają przypięte npm i jsdom; npm ostrzeże przy starszym Node. Sprawdzenie w przeglądarce w README mówi „ze stopką”, nazywa ekran Przejście tak jak gra i nie wspomina już o panelu terenu, który usunięto. Lista budowania jest podzielona na jeden punkt na sprawę i raz mówi, skąd są grafiki.
- **Strona wszystkich stanów** rysuje teraz ikony na kafelku tak jak gra, z jej własnego kodu rozmieszczenia, więc próbki zmieniają się razem z grą. Próbka „Wyczerpane” nie twierdzi już, że zapas nigdy nie spada do zera.
- **Serwer** odmawia teraz startu, gdy plik hasła poczty po dekodowaniu daje nic: pusty plik albo plik z samymi znacznikami BOM, jednym lub kilkoma (po Twojej odpowiedzi także dwa znaczniki są odrzucane). Znacznik BOM z dalszymi znakami jest nadal przyjmowany z odrzuconym znacznikiem. Wcześniej taki plik przechodził, a błąd wychodził dopiero przy pierwszym logowaniu do poczty.
- **Wytyczne.** Wytyczne kodu, testów i styleguide oraz instrukcje dla widoku przeglądarki zgadzają się teraz z kodem w miejscach, które wskazał przegląd: skąd pochodzi adres nadawcy poczty, lista zwolnień próby, status dwóch czystych modułów, poziom testu dokumentu, formy React kontrolek, zmiana wartości tokenu, odmowa przy starcie na liście kontroli granic i inne.
- **Skill wdrożenia** pozwala agentowi odczytać na serwerze więcej, tylko to, na co pozwoliłeś: liczbę wierszy kluczy z wymuszonym poleceniem (sama liczba), tryb i właściciela zainstalowanego skryptu wdrożenia oraz wersję czterech narzędzi (`stat`, `grep`, `docker`, `free`).
- **Cztery fakty o stanie serwera testowego** agent odczytał ponownie w dniu pierwszego żądania, przez narzędzie serwera i tylko dozwolonymi poleceniami; każdy niesie swój odczyt z wersją narzędzia: zainstalowany skrypt należy do roota z trybem 0755; dokładnie jeden wiersz klucza niesie wymuszone polecenie; działają dwa kontenery starej gry; swap wynosi zero.
- **Wpisy fundamentu.** Poprawiono albo dodano około dwudziestu decyzji, jedno hasło słownika i sześć faktów środowiska: cytaty z miejscem i datą odczytu, brzmienie „restore” i „place on the list”, liczbę zapisów na dobę, odrzucone warianty, których nikt nie proponował, regułę czasu nieobecności, która teraz nazywa stan trzymany w pamięci strony, liczbę z badania środowisk uruchomieniowych, która nie twierdzi już, ilu było respondentów, i inne.

Nie pokazuję zrzutu ekranu (zob. „Do rozstrzygnięcia”, 4).

#### Pod spodem

Wszystko to tekst albo drobne poprawki kodu, poza dwiema małymi zmianami kodu (rozmieszczenie ikon na stronie i kontrola startu), które przyszły z testem czerwonym na początku. Żaden wiersz logu, żadne dane gracza i żadne wdrożenie nie są ruszane; na Twoim serwerze uruchomiono tylko polecenia tylko do odczytu z listy, którą dopuściłeś.

### Do rozstrzygnięcia

1. **Wybory cyklu w ostatniej poprawce.** (a) Odmowa przy starcie obejmuje hasło, które po wyrzuceniu wszystkich znaczników BOM jest puste; znacznik z dalszymi znakami nadal przechodzi, a przy dwóch znacznikach przed tekstem drugi zostaje w haśle. Cykl wziął to jako najmniejsze czytanie „odrzuć plik z dwoma znacznikami”; odrzucanie każdego pliku zaczynającego się od znacznika odrzucono, bo zadanie prosiło tylko o hasło, które po dekodowaniu jest niczym. Przyjąć? (b) Decyzja o badaniu środowisk uruchomieniowych cytuje teraz trzy pierwsze wiersze wykresu według miejsca i nie mówi już, ilu ludzi odpowiedziało, bo strona tego nie podaje. Przyjąć? (c) Wytyczne testów nazywają teraz odmowę przy starcie w wierszu dla granicy serwera i w dwóch listach obok, o krok dalej, niż prosiła uwaga. Przyjąć?
2. **Dalsze zezwolenie dla agenta na Twoim serwerze.** Fakt o połączeniach wychodzących z hosta nadal zaczyna źródło od „observed” i nie nazywa narzędzia ani wersji. Żeby doprowadzić go do formy odczytu, agent potrzebowałby `curl --version` na Twoim serwerze, czego lista, którą dopuściłeś, nie zawiera, więc cykl faktu nie zmienił. Pozwolić na to jedno zapytanie o wersję i dokończy to kolejna poprawka (zalecane: wypisuje tylko wersję), czy zostawić fakt, jak jest?
3. **Zmieniony test.** Test startu, który pilnuje reguły o pliku hasła poczty, odrzuca teraz plik z jednym, dwoma lub trzema znacznikami BOM i plik ze znacznikiem i nową linią, a przyjmuje znacznik z tekstem i dwa znaczniki z tekstem. Żaden inny niezmiennik, powierzchnia ani znacznik naruszenia się nie zmieniły.
4. **Brak zrzutu zmienionej strony.** Stronę wszystkich stanów obejrzano w przeglądarce po zmianie i zrobiono zrzut, ale produkt nie ustalił miejsca na zrzuty ekranu, więc żądanie żadnego nie pokazuje. Scalić bez zobaczenia strony?
5. **Nienaprawione uwagi, wszystkie drobne.** Dwa wpisy (ten o śmierci postaci i niezmiennik o niej) nadal mówią „a load of a saved game state” tam, gdzie wczytuje się też stan trzymany w pamięci strony; tytuł przypadku testu startu nadal mówi „non-empty”; decyzja o czasie nieobecności i hasło słownika inaczej sformułowały jedną rzecz; dwa zdania decyzji są długie; a reguła o pliku hasła opiera się na tym, że dekoder Node odrzuca początkowy znacznik, czego nie opisuje żaden fakt środowiska (test uruchamia prawdziwy dekoder). Zrobić z tego zadanie? (Minor findings, 1-9; Findings outside the task's scope, 1-3.)
6. **Ile przeczytały przeglądy.** Przegląd całej zmiany przeczytał w całości 20 decyzji ze swojej selekcji, a 12 tylko w zmienionych miejscach, nie przebiegł tytułów reszty i cztery pliki wytycznych przeczytał w zmienionych miejscach z otoczeniem, nie w całości; powiedział to w raporcie. Przegląd pierwszej poprawki nie mógł powtórzyć czterech odczytów z serwera (recenzent nie ma dostępu do narzędzia serwera), więc te wyniki są wynikami wykonawcy. Przegląd ostatniej poprawki sam uruchomił spreparowane pliki hasła. Scalić mimo to?

### Koszt

Około 2 godzin 43 minut czasu pracy, 188,0 miliona tokenów (głównie wejście z pamięci podręcznej): 165,7 miliona na większym modelu i 22,3 miliona na mniejszym, który zrobił proste plastry. Rundy przeglądu z uwagami albo powtórzone: pierwszy plaster z wpisami fundamentu i cała zmiana (każda z jedną poprawką i jednym przeglądem poprawki) oraz dwie poprawki dla Twoich odpowiedzi (każda przejrzana raz i przeszła). Tabela etapów jest w zatwierdzonym rekordzie: the record's table of stages (the link is added after the record is committed).

### Jak scalić

Scal scaleniem zachowującym commity (jak historia tego repozytorium), bo link do rekordu w tym opisie przetrwa tylko wtedy. Fundament czeka na przegląd przez 70 scaleń od początku historii (żaden wcześniejszy przegląd nie jest oznaczony tagiem); przegląd to skill przeglądający fundament, uruchomiony w sesji w tym repozytorium; nic w tym żądaniu na niego nie czeka.

</details>

## Technical changes

The change is 51 commits on `main` at `2fe922c` (the head before the cycle's third record is `b4c2356`), and the commit pairs that add and remove the records. By group:

- **Process pin** (`adbec4b`): the gitlink of `.the-way` moves from `294af7f` to `e3825a8`; the installer rewrote nothing else.
- **Foundation entries, 20 rows** (`6c31f59`..`3fcf546`, then fixes `7a879fa`, `c3c632a`, `4b78a4c`, `6c089cd`, `b60b582`, `8183881`): edits in place of D-01, D-02, D-04, D-05, D-48, D-54, D-56, D-67, D-101, D-111, D-147, D-156, D-183, D-185, D-207, D-213, D-237, D-252, D-269, D-312, D-313; the glossary entry `catch-up`; the fact `docker-build-cache-invalidation`; the new fact `browser-bare-import-resolution`.
- **Setup text** (`fe84d1e`, `1a79cc2`, fix `d1dbe4f`): `README.md`, `package.json` and the root entry of `package-lock.json` (one line each for the Node range).
- **Page of all states** (`e04ac0e`): `iconPlaces`, `TILE_SIZE` and `ICON_SQUARE` (1.4 × the tile size) are exported from `src/browser/view/terrain-picture.ts` and called by `drawSample` in `src/browser/kitchen-sink/kitchen-sink.ts`; the note of the "Wyczerpane" sample says what the game does; a case in `tests/view/terrain-picture.test.mjs` fixes the placement for two, four and five icons, seen failing first.
- **Startup check** (`60c799e`, then `b4c2356` for the last correction): `readSmtpPassword` in `src/server/configuration.ts` refuses a decoded password that is empty once every U+FEFF is removed; `tests/startup.test.mjs` has the new fixtures (one, two and three marks, a mark and a newline refused; a mark and text, two marks and text accepted), each seen failing first.
- **Comments and names in tests** (`75d9943`, `f96f56f`): "restore" in `tests/http.test.mjs` and `tests/sim/program-counts.test.mjs`; the docstring of `tests/invariants/test_loop2_container_sprites.py` names the case of `tests/view/scene-picture.test.mjs`.
- **Deploy skill** (`c2cfc04`, then `f33f110` for the first correction): the list "Allowed" of `.claude/skills/loop2-deploy/SKILL.md` and its byte-identical copy under `.agents/` gains `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy`, the count of key lines (`grep -c`, count only), and `stat --version`, `grep --version`, `docker --version`, `free --version`, each alone.
- **The four host facts, item 22** (`102b4f3`): the *Source* of `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads` and `mikrus-host-swap` in `foundations/environment_facts.md` is a reading of 2026-11-10 with the tool's version (stat 8.32, grep 3.7, Docker 28.1.1, free from procps-ng 3.3.17), the host written as "the test server's host"; the sentence of `mikrus-host-swap` is narrowed.
- **Guidelines and browser instructions** (`af823e0`, `4e4ac09`, `b8abf53`, `0fba2b3`, fixes `efd26ba`, `eb43999`, `a5af9a7`, `f5c7601`; and `aee1ecd` for the last correction): `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-mail-sending.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.
- **Last correction, foundation** (`a6187ca`, `be420e7`, `e175b32`): D-111 says the server refuses a file of marks and nothing else (its *Rejected* gains two ways); D-247 says the catch-up runs after each load of a game state, the unsaved state included; D-01 cites three rows of the survey chart by rank and claims no number of respondents.
- **Fix for the Minor findings within the task**: part of the fix range `0fba2b3..f5c7601` (11 commits). It passed its review; nothing was reverted.

## Checks

- **Gate:** `npm test` on the tree of the last correction `b4c2356`, exit 0: `543 tests in 4 directories; every directory passed`, `0 errors` of `python -B .the-way/elements/common/foundation_check.py` (the third stage of the gate). It also passed on `f5c7601` and on `102b4f3` before the corrections. No check failed or was unrun. On the base (`2fe922c`) the first full run had exit 1 only because a fresh worktree lacked the ignored `.runs/quality-venv` (two tests in `tests/quality/test_quality_invariants.py`); with the venv built by the README they pass, and the foundation check on the base is exit 0. On the pin-move commit `adbec4b` the gate was exit 0, so no check fails there that passed on the base.
- **Own-work checks:** each slice reported one (`reports/slice-N-report.md`); the weakest points checked are in the record: the lockfile diff is one line; the new case of the terrain-picture test failed before the export and passed after; the startup fixtures failed before each of the two code changes (exit 1, "Missing expected rejection") and passed after, and the reviewers ran the base source and the head in a scratch copy on the crafted files (zero bytes, one to three marks, a mark and a newline, a mark and text, two marks and text, 1024 and 1025 bytes, invalid UTF-8; every refusal names the setting and carries no content); the count command printed only the count on scratch files with fake keys; the 28 quotations of the corrected sources were re-fetched; the four host readings were made through the server tool with the allowed commands only, and the reviewer of that correction checked their form but could not re-run them.
- **User interface:** the page of all states was built (`npm run typecheck`, the kitchen-sink build invariant) and looked at once in a browser by the executor of the slice (a screenshot of the five-icon sample in its 2-2-1 layout and the corrected note, kept in an ignored folder, not shown); the product settles no place for screenshots.
- **Form check of this description:** `python -B .the-way/task-cycle/request_check.py docs/task-cycles/teksty-rozjechane-z-kodem/request.md --task docs/task-cycles/teksty-rozjechane-z-kodem/task.md`, exit 0 (last run on this edit). **Check of private paths on this description:** `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/teksty-rozjechane-z-kodem/request.md`, exit 0. **On the copy of the record** (`docs/task-cycles/teksty-rozjechane-z-kodem`, commit added after the record is committed): private paths `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/teksty-rozjechane-z-kodem`, image files `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/teksty-rozjechane-z-kodem` and remarks `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/teksty-rozjechane-z-kodem`: written after the copy is committed. **Remarks check on the original:** the same command on `docs/task-cycles/teksty-rozjechane-z-kodem`, exit 0 after the items were written into the record (59 items in all; it listed 47 on the first run, 4 after the first correction and 8 after the second). The cycle holds no listing wrong.

## Foundation entries

Marked `row <n>` where the entry is the one the task's row of *Settlements to record* settles, otherwise by the task's item (all were approved with the task; none is marked "the cycle's" by the writers).

- D-252 — `row 1`: what the two measuring commands print on failure is no log line of the log's form, so it keeps the error's text and gets no failure line of that form (the report of `measure-passwords` stays one JSON object, its code unchanged); a pointer joins it to D-354.
- D-111 — `row 2`: the mail password file must decode to a password that is not empty once every byte-order mark is taken out, so an empty file, a file of marks and nothing else and a trailing newline are all refused at startup, and a mark followed by characters is accepted (the last correction extended the row from one mark to any number of marks).
- D-01, D-02, D-05 (item 21) — each page of *Based on* quotes a passage word for word with its place and read date 2026-11-10; D-02 cites the frozen edition of the Node.js HTTP page; D-01 cites three rows of the survey chart by rank and claims no number of respondents.
- `loop2-host-forced-command-entry`, `loop2-host-installed-command`, `mikrus-host-docker-workloads`, `mikrus-host-swap` (item 22) — each *Source* is a reading of 2026-11-10 with the tool's version; the sentence of the swap fact is narrowed to "The test server's host reports zero total swap."
- D-247 (the human's answer, correction 2) — the catch-up runs after each load of a game state, the unsaved game state kept in the page's memory (D-211) included.
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

1. Fix review of the whole change, N1: "D-01 still says 'respondents to the runtime question' for the 11,141 figure" — fixed by the last correction (D-01 no longer claims a number of respondents).
2. Fix review of the whole change, N2: "the D-252 binding paragraph is now long" — `foundations/decisions.md`, D-252.
3. Fix review of the whole change, N3: an observation, not a defect.
4. Review of the whole change, 4 and 16, and of Slice 1, M4: the weighed "above discovery" ways of D-147 and D-185 were deleted, not reworded ("the record no longer shows the human weighed it"); D-237's example is wider than its row ("no change needed"). Accepted by you as recommended.
5. Review of the first correction, Minor 1, 2 and 3: the forced-command sentence is slightly wider than its reading (a trailing space and the account); the docker sentence names "the old loop game" while the quoted rows show the image `loop:latest`; the quoting of the `docker ps` rows is loose — `foundations/environment_facts.md`. Accepted by you as recommended.
6. Review of the last correction, Minor 1: the title of the test case in `tests/startup.test.mjs` still says "non-empty".
7. Review of the last correction, Minor 2: D-247 and the glossary entry `catch-up` word the same thing differently.
8. Review of the last correction, Minor 3: the D-111 binding sentence is long — `foundations/decisions.md`.
9. Review of the last correction, Minor 4: D-339 and the invariant `death-settled-once` still say "a load of a saved game state", outside the remarks.

## Findings outside the task's scope

1. Return step of the first correction: the fact `mikrus-tunnel-outbound-tcp` (`foundations/environment_facts.md`) still opens its *Source* with "observed:" and names no tool or version; bringing it to the `reading:` form needs `curl --version`, a further allowance (see "For you to decide", 2).
2. Return step of the last correction: D-111's rationale rests on the Node `TextDecoder` dropping a leading byte-order mark, and no environment fact holds that; the earlier wording said the same, and the test runs the real decoder.
3. Noted by reviewers, not graded: D-165 and others use "place on the list" for the list of programs; D-185 still holds "changes the accepted placement below the status"; no test pins the floor `24.15.0` of the Node range (a change to `^24.0.0` would pass every check); the testing guidelines' row, the two-marks refusal and D-247 are done, the findings that named them are closed.

## Course of the cycle

- **Task and sources:** independent task "agree the foundation, guidelines, README and the page of all states with the code" (42 items, 7 answered questions, 2 settlement rows), from the review remarks of 2026-11-06; sources read at `main` `2fe922c`.
- **Process pin:** moved from `294af7f` to `e3825a8` by the task branch's first commit `adbec4b` (at the user's instruction); the gate on that commit passed (`npm test` exit 0, `0 errors`), nothing failed there that passed on the base.
- **Spec:** none; no open design choice was found.
- **Route:** planned slices (six parts of the part map, code and tests, three guideline skills and five foundation element skills, and a read of the remote host); the foundation entries in two runs, the code and text in twelve slices. Correction 1: your answer A on the first request (2026-11-10); reset base `e9bca2f`; the executors of Slice 7 and Slice 8 resumed, one review (`PASS 102b4f3`), the return step with no commit, the gate. Correction 2: your answers on the corrected request (items 1 and 2 accepted, item 4 fixed); reset base `fcc9db2`; a foundation writer, the executor of Slice 4 resumed, one review with the crafted files (`PASS b4c2356`), the return step with no commit, the gate. Remote `main` was unchanged at each, nothing to merge.
- **Plan:** `.runs` plan with 20 foundation-entry rows and 12 slices (copied into the record).
- **Choices:** ten rows in the questions table of the record.
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds the record is added after that commit
