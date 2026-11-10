**State: blocked** — one of the 42 items (the four facts about the test server) waits for your decision on what the agent may read on that server; everything else is made, reviewed and tested.

## What you will see

The texts that the agents read at every task now say what the code does, in 41 of the 42 items, and the process behind them is moved to the latest version.

- **The process.** The pinned version of the way of working is moved to its latest commit (115 commits newer), as you asked at the start; the whole test run passed on that commit before any change was made.
- **Setup text.** The README and the package files require Node.js 24.15.0 or newer in line 24, because that is what the pinned npm and jsdom ask for; npm will warn on an older Node. The README's browser check says "with a footer", names the screen Przejście as the game does, and no longer mentions the tile panel that was removed. The build list is split into one point per matter and says once where the sprites come from.
- **The page of all states** now draws the icons on a tile the way the game does, from the game's own placement code, so the samples change when the game changes. The sample "Wyczerpane" no longer says that a stock never falls to zero.
- **The server** now refuses to start when the mail password file decodes to an empty password, also a file holding only a byte-order mark, as the decision on startup says. Before, such a file passed and the mistake showed at the first login to the mail service.
- **Guidelines.** The coding, testing and styleguide guidelines and the instructions for the browser view now agree with the code in the places the review found: where the mail sender's address comes from, the list of attempt releases, the status of two pure modules, the level of the document test, the React forms of the controls, a changed token value, and others.
- **The deploy skill** lets the agent read two more things on the server, only the ones you allowed: the number of the forced-command key lines (the number only) and the mode and owner of the installed deploy script.
- **Foundation entries.** About twenty decisions, one glossary entry and two environment facts were corrected or added: quotations with their place and read date, the wording of "restore" and "place on the list", the number of saves in a day, the rejected ways that nobody proposed, and others.
- **Not made:** the four facts about the state of the test server keep their old form (see "For you to decide", 1).

No screenshot is shown (see "For you to decide", 7).

### Underneath

Everything is text or small corrections of code, except two small code changes (the page's icon placement and the startup check) that came with a failing test first. No log line, no data of a player and no deployment is touched.

## For you to decide

1. **What the agent may read on the test server (this blocks the request).** The task asks that four facts about the server's state be re-read by the agent, each with "the tool and its version". The agent read all four through the server tool with the commands you allowed: the installed script is owned by root with mode 0755; exactly one key line carries the forced command; two containers of the old game run; the swap is zero. But none of the allowed commands prints a version, and a reading without a version does not fit the form the process asks for. Adding read-only version queries (`stat --version`, `grep --version`, `docker --version`, `free --version`) would widen what an agent may run on your server beyond the two commands you allowed, so the cycle did not do it. Options: (A) allow those four version queries in the deploy skill, and the cycle finishes the four facts (recommended: they print only a version and cost one more skill edit); (B) accept a reading without a version and record that as a decision; (C) leave the four facts as they are, with no check that they are still true. Two smaller points ride on your answer: the container list shows host port numbers, which the skill keeps out of the repository, so the agent would quote the rows up to the ports column; and the server tool returns quotes escaped, which the agent would write as plain characters. Which option?
2. **A slice was not made.** The part that re-reads the four facts was not made, for the reason above; the stages that depend on it (the review of the whole change, the return step and the gate) ran on everything else. Merge without it, or wait for your answer to 1?
3. **Choices of the cycle beyond the task's words.** (a) Two rejected ways in the decisions on the place of the explanation about the pause were dropped, not marked "unknown", because the order they rejected no longer exists on the screen and the sources keep no reason that survives; the record no longer shows you weighed them. Accept? (b) The rule that the two measuring commands print a message and not a log line was written into the existing decision on failures, not as a new decision next to the one on the operator's commands; a short pointer joins the two. Accept? (c) The reason why an action with no target in the rule panel gives way to the next one was worded from the earlier cycle's record and its review, because the line the task named holds only the choice. Accept? (d) The startup refusal covers only a password that decodes to nothing; a byte-order mark followed by characters is still accepted with the mark dropped. Accept?
4. **Entries you did not see at the task.** One sentence changed beyond its row: an example in the decision on the release check now says that a build of the same commit takes the step from its cache (it follows from the corrected reason, since a new commit always changes the build argument). The source of one decision on the HTTP server now cites the frozen edition of the Node.js page instead of the moving one. Accept?
5. **A changed test.** The startup test that guards the rule on the mail password file gained two cases: a file with only a byte-order mark and one with a mark and a newline are refused; a case that a mark followed by text is accepted was added beside it. No other invariant, surface or violated mark changed.
6. **Findings left unfixed that you may feel.** A mail password file holding two byte-order marks still passes startup, as before; the decision allows it. Two entries (the decision on the time away and the text of its invariant) still call the state kept in the page's memory "saved", which two corrected decisions now call "unsaved". The testing guidelines' list of boundary checks does not name the startup refusal. One source label in the decision on the runtime still calls an unlabelled figure a total. Fix it in this request, or make a task of it? (Minor findings, 1-3; Findings outside the task's scope, 1-3.)
7. **No screenshot of the changed page.** The page of all states was looked at in a browser after the change and a screenshot was taken, but the product has settled no place for screenshots, so the request shows none. Merge without seeing the page?
8. **How much the review of the whole change read.** It read 20 of the decisions of its selection whole and 12 only at the changed parts, ran through the titles of none of the rest, and read four guideline files at the changed parts and their surroundings, not whole; it said so in its report. A second reading, of the fix, was narrower still. Merge anyway?

## Cost

About 2 hours 10 minutes of working time, 135.9 million tokens (mostly cached input): 117.2 million on the larger model and 18.6 million on the smaller model that made the simple slices. Two review rounds had findings (the first slice with the foundation entries, and the whole change), each with one fix and one review of the fix. The table of stages is in the committed record (see Course of the cycle).

## How to merge

Do not merge yet: answer 1 and the other items first; after your answer a correction finishes the four facts. When you do merge, use the merge that keeps the commits (as the history of this repository does), because the link to the record in this description survives only then. The foundation has waited for a review through 70 merges since the start of the history (no earlier review is tagged); the review is the skill that reviews the foundation, started in a session in this repository; nothing in this request waits for it.

<details>
<summary>W Twoim języku</summary>

**Stan: zablokowane** — jedna z 42 pozycji (cztery fakty o serwerze testowym) czeka na Twoją decyzję, co agent może czytać na tym serwerze; reszta jest zrobiona, przejrzana i przetestowana.

### Co zobaczysz

Teksty, które agenci czytają przy każdym zadaniu, mówią teraz to, co robi kod, w 41 z 42 pozycji, a proces, na którym stoją, jest przesunięty na najnowszą wersję.

- **Proces.** Przypięta wersja sposobu pracy jest przesunięta na jej najnowszy commit (115 commitów nowszy), tak jak prosiłeś na początku; pełny przebieg testów przeszedł na tym commicie, zanim cokolwiek zmieniono.
- **Tekst uruchomienia.** README i pliki pakietu wymagają Node.js 24.15.0 lub nowszego w linii 24, bo tego żądają przypięte npm i jsdom; npm ostrzeże przy starszym Node. Sprawdzenie w przeglądarce w README mówi „ze stopką”, nazywa ekran Przejście tak jak gra i nie wspomina już o panelu terenu, który usunięto. Lista budowania jest podzielona na jeden punkt na sprawę i raz mówi, skąd są grafiki.
- **Strona wszystkich stanów** rysuje teraz ikony na kafelku tak jak gra, z jej własnego kodu rozmieszczenia, więc próbki zmieniają się razem z grą. Próbka „Wyczerpane” nie twierdzi już, że zapas nigdy nie spada do zera.
- **Serwer** odmawia teraz startu, gdy plik hasła poczty po dekodowaniu daje puste hasło, także plik z samym znacznikiem BOM, tak jak mówi decyzja o starcie. Wcześniej taki plik przechodził, a błąd wychodził dopiero przy pierwszym logowaniu do poczty.
- **Wytyczne.** Wytyczne kodu, testów i styleguide oraz instrukcje dla widoku przeglądarki zgadzają się teraz z kodem w miejscach, które wskazał przegląd: skąd pochodzi adres nadawcy poczty, lista zwolnień próby, status dwóch czystych modułów, poziom testu dokumentu, formy React kontrolek, zmiana wartości tokenu i inne.
- **Skill wdrożenia** pozwala agentowi odczytać na serwerze jeszcze dwie rzeczy, tylko te, na które pozwoliłeś: liczbę wierszy kluczy z wymuszonym poleceniem (sama liczba) oraz tryb i właściciela zainstalowanego skryptu wdrożenia.
- **Wpisy fundamentu.** Poprawiono albo dodano około dwudziestu decyzji, jedno hasło słownika i dwa fakty środowiska: cytaty z miejscem i datą odczytu, brzmienie „restore” i „place on the list”, liczbę zapisów na dobę, odrzucone warianty, których nikt nie proponował, i inne.
- **Nie zrobione:** cztery fakty o stanie serwera testowego zostają w starej formie (zob. „Do rozstrzygnięcia”, 1).

Nie pokazuję zrzutu ekranu (zob. „Do rozstrzygnięcia”, 7).

#### Pod spodem

Wszystko to tekst albo drobne poprawki kodu, poza dwiema małymi zmianami kodu (rozmieszczenie ikon na stronie i kontrola startu), które przyszły z testem czerwonym na początku. Żaden wiersz logu, żadne dane gracza i żadne wdrożenie nie są ruszane.

### Do rozstrzygnięcia

1. **Co agent może czytać na serwerze testowym (to blokuje żądanie).** Zadanie prosi, żeby agent odczytał ponownie cztery fakty o stanie serwera, każdy z „narzędziem i jego wersją”. Agent odczytał wszystkie cztery przez narzędzie serwera poleceniami, na które pozwoliłeś: zainstalowany skrypt należy do roota z trybem 0755; dokładnie jeden wiersz klucza niesie wymuszone polecenie; działają dwa kontenery starej gry; swap wynosi zero. Ale żadne dozwolone polecenie nie wypisuje wersji, a odczyt bez wersji nie pasuje do formy, której wymaga proces. Dopisanie zapytań o wersję tylko do odczytu (`stat --version`, `grep --version`, `docker --version`, `free --version`) poszerzyłoby to, co agent może uruchomić na Twoim serwerze, ponad dwa polecenia, na które pozwoliłeś, więc cykl tego nie zrobił. Warianty: (A) dopisać te cztery zapytania o wersję do skilla wdrożenia, a cykl dokończy cztery fakty (zalecane: wypisują tylko wersję i kosztują jedną edycję skilla więcej); (B) przyjąć odczyt bez wersji i zapisać to jako decyzję; (C) zostawić cztery fakty bez zmian, bez sprawdzenia, czy nadal są prawdziwe. Dwie mniejsze sprawy zależą od Twojej odpowiedzi: lista kontenerów pokazuje numery portów hosta, które skill trzyma poza repozytorium, więc agent zacytowałby wiersze do kolumny portów; a narzędzie serwera zwraca cudzysłowy zamienione na kody, które agent zapisałby zwykłymi znakami. Który wariant?
2. **Jeden plaster nie został zrobiony.** Część odczytująca cztery fakty nie została zrobiona z powodu wyżej; etapy zależne od niej (przegląd całej zmiany, krok powrotny i bramka) przeszły na reszcie. Scalić bez niej, czy czekać na Twoją odpowiedź na 1?
3. **Wybory cyklu poza słowami zadania.** (a) Dwa odrzucone warianty w decyzjach o miejscu wyjaśnienia pauzy usunięto zamiast oznaczyć „unknown”, bo odrzucony porządek już nie istnieje na ekranie, a źródła nie trzymają powodu, który przetrwał; zapis nie pokazuje już, że je rozważyłeś. Przyjąć? (b) Regułę, że dwa polecenia pomiarowe wypisują komunikat, a nie wiersz logu, wpisano do istniejącej decyzji o awariach, a nie jako nową decyzję obok tej o poleceniach operatora; krótkie odesłanie łączy obie. Przyjąć? (c) Powód, dla którego czynność bez celu w panelu reguły ustępuje następnej, sformułowano z zapisu wcześniejszego cyklu i jego przeglądu, bo wiersz wskazany w zadaniu trzyma tylko wybór. Przyjąć? (d) Odmowa przy starcie dotyczy tylko hasła, które po dekodowaniu jest puste; znacznik BOM z dalszymi znakami jest nadal przyjmowany z odrzuconym znacznikiem. Przyjąć?
4. **Wpisy, których nie widziałeś przy zadaniu.** Jedno zdanie zmieniono poza swoim wierszem: przykład w decyzji o sprawdzeniu wydania mówi teraz, że budowanie tego samego commita bierze krok z pamięci podręcznej (wynika to z poprawionego powodu, bo nowy commit zawsze zmienia argument budowania). Źródło jednej decyzji o serwerze HTTP cytuje teraz zamrożone wydanie strony Node.js zamiast ruchomego. Przyjąć?
5. **Zmieniony test.** Test startu, który pilnuje reguły o pliku hasła poczty, dostał dwa przypadki: plik z samym znacznikiem BOM i plik ze znacznikiem i nową linią są odrzucane; obok dodano przypadek, że znacznik z tekstem jest przyjmowany. Żaden inny niezmiennik, powierzchnia ani znacznik naruszenia się nie zmieniły.
6. **Nienaprawione uwagi, które możesz odczuć.** Plik hasła poczty z dwoma znacznikami BOM nadal przechodzi start, jak dotąd; decyzja na to pozwala. Dwa wpisy (decyzja o czasie nieobecności i tekst jej niezmiennika) nadal nazywają stan trzymany w pamięci strony „saved”, a dwie poprawione decyzje nazywają go teraz „unsaved”. Wytyczne testów w liście kontroli granic nie nazywają odmowy przy starcie. Jedna etykieta źródła w decyzji o środowisku uruchomieniowym nadal nazywa liczbę bez etykiety sumą. Naprawić w tym żądaniu, czy zrobić z tego zadanie? (Minor findings, 1-3; Findings outside the task's scope, 1-3.)
7. **Brak zrzutu zmienionej strony.** Stronę wszystkich stanów obejrzano w przeglądarce po zmianie i zrobiono zrzut, ale produkt nie ustalił miejsca na zrzuty ekranu, więc żądanie żadnego nie pokazuje. Scalić bez zobaczenia strony?
8. **Ile przeczytał przegląd całej zmiany.** Przeczytał w całości 20 decyzji ze swojej selekcji, a 12 tylko w zmienionych miejscach, nie przebiegł tytułów reszty i cztery pliki wytycznych przeczytał w zmienionych miejscach z otoczeniem, nie w całości; powiedział to w raporcie. Drugi odczyt, poprawki, był jeszcze węższy. Scalić mimo to?

### Koszt

Około 2 godzin 10 minut czasu pracy, 135,9 miliona tokenów (głównie wejście z pamięci podręcznej): 117,2 miliona na większym modelu i 18,6 miliona na mniejszym, który zrobił proste plastry. Dwie rundy przeglądu miały uwagi (pierwszy plaster z wpisami fundamentu oraz cała zmiana), każda z jedną poprawką i jednym przeglądem poprawki. Tabela etapów jest w zatwierdzonym rekordzie (zob. Course of the cycle).

### Jak scalić

Jeszcze nie scalaj: najpierw odpowiedz na 1 i pozostałe pozycje; po Twojej odpowiedzi poprawka dokończy cztery fakty. Gdy scalisz, użyj scalenia zachowującego commity (jak historia tego repozytorium), bo link do rekordu w tym opisie przetrwa tylko wtedy. Fundament czeka na przegląd przez 70 scaleń od początku historii (żaden wcześniejszy przegląd nie jest oznaczony tagiem); przegląd to skill przeglądający fundament, uruchomiony w sesji w tym repozytorium; nic w tym żądaniu na niego nie czeka.

</details>

## Technical changes

The change is 44 commits on `main` at `2fe922c` (the head before the cycle's record is `f5c7601`). By group:

- **Process pin** (`adbec4b`): the gitlink of `.the-way` moves from `294af7f` to `e3825a8`; the installer rewrote nothing else.
- **Foundation entries, 20 rows** (`6c31f59`..`3fcf546`, then fixes `7a879fa`, `c3c632a`, `4b78a4c`, `6c089cd`, `b60b582`, `8183881`): edits in place of D-01, D-02, D-04, D-05, D-48, D-54, D-56, D-67, D-101, D-111, D-147, D-156, D-183, D-185, D-207, D-213, D-237, D-252, D-269, D-312, D-313; the glossary entry `catch-up`; the fact `docker-build-cache-invalidation`; the new fact `browser-bare-import-resolution`.
- **Setup text** (`fe84d1e`, `1a79cc2`, fix `d1dbe4f`): `README.md`, `package.json` and the root entry of `package-lock.json` (one line each for the Node range).
- **Page of all states** (`e04ac0e`): `iconPlaces`, `TILE_SIZE` and `ICON_SQUARE` (1.4 × the tile size) are exported from `src/browser/view/terrain-picture.ts` and called by `drawSample` in `src/browser/kitchen-sink/kitchen-sink.ts`; the note of the "Wyczerpane" sample says what the game does; a case in `tests/view/terrain-picture.test.mjs` fixes the placement for two, four and five icons, seen failing first.
- **Startup check** (`60c799e`): `readSmtpPassword` in `src/server/configuration.ts` refuses a decoded password equal to the empty string; `tests/startup.test.mjs` has the new fixtures.
- **Comments and names in tests** (`75d9943`, `f96f56f`): "restore" in `tests/http.test.mjs` and `tests/sim/program-counts.test.mjs`; the docstring of `tests/invariants/test_loop2_container_sprites.py` names the case of `tests/view/scene-picture.test.mjs`.
- **Deploy skill** (`c2cfc04`): the list "Allowed" of `.claude/skills/loop2-deploy/SKILL.md` and its byte-identical copy under `.agents/` gains `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` and the count of key lines (`grep -c`, count only).
- **Guidelines and browser instructions** (`af823e0`, `4e4ac09`, `b8abf53`, `0fba2b3`, fixes `efd26ba`, `eb43999`, `a5af9a7`, `f5c7601`): `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-mail-sending.md`, `guidelines/coding-account-policy.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`.
- **Fix for the Minor findings within the task**: part of the fix range `0fba2b3..f5c7601` (11 commits). It passed its review; nothing was reverted.
- **Item 22 (not made):** the readings made on 2026-11-10 through the `mikrus` server tool, with the allowed commands only, are in `reports/slice-8-report.md` of the record, as four drafted readings, none committed: `stat` printed `755 root:root`; the count printed `1` (the tilde expanded); `docker ps` listed six containers, the old game and `foundryvtt` both `Up`; `free` printed `Swap: 0 0 0`.

## Checks

- **Gate:** `npm test` on `f5c7601`, exit 0: `543 tests in 4 directories; every directory passed`, `0 errors` of `python -B .the-way/elements/common/foundation_check.py` (the third stage of the gate). No check failed or was unrun. On the base (`2fe922c`) the first full run had exit 1 only because a fresh worktree lacked the ignored `.runs/quality-venv` (two tests in `tests/quality/test_quality_invariants.py`); with the venv built by the README they pass, and the foundation check on the base is exit 0. On the pin-move commit `adbec4b` the gate was exit 0, so no check fails there that passed on the base.
- **Own-work checks:** each slice reported one (`reports/slice-N-report.md`); the weakest points checked are in the record: the lockfile diff is one line; the new case of the terrain-picture test failed before the export and passed after; the byte-order-mark fixture failed before the check (exit 1, "Missing expected rejection") and passed after, and the reviewer ran the base source and the head in a scratch copy; the count command printed only the count on scratch files with fake keys; the 28 quotations of the corrected sources were re-fetched.
- **User interface:** the page of all states was built (`npm run typecheck`, the kitchen-sink build invariant) and looked at once in a browser by the executor of the slice (a screenshot of the five-icon sample in its 2-2-1 layout and the corrected note, kept in an ignored folder, not shown); the product settles no place for screenshots.
- **Form check of this description:** `python -B .the-way/task-cycle/request_check.py docs/task-cycles/teksty-rozjechane-z-kodem/request.md --task docs/task-cycles/teksty-rozjechane-z-kodem/task.md`: last run pending (run number filled in the next edit). **Check of private paths on this description:** pending. **On the copy of the record:** private paths, image files and remarks, each pending the commit of the copy. **Remarks check on the original:** `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/teksty-rozjechane-z-kodem`, exit 0, 23 reports, 47 items other than none, 0 not in the process remarks (it listed all 47 on its first run; they were then written into the record's process remarks word for word).

## Foundation entries

Marked `row <n>` where the entry is the one the task's row of *Settlements to record* settles, otherwise by the task's item (all were approved with the task; none is marked "the cycle's" by the writers).

- D-252 — `row 1`: what the two measuring commands print on failure is no log line of the log's form, so it keeps the error's text and gets no failure line of that form (the report of `measure-passwords` stays one JSON object, its code unchanged); a pointer joins it to D-354.
- D-111 — `row 2`: the mail password file must decode to a nonempty password, so an empty file, a file of only a byte-order mark and a trailing newline are all refused at startup.
- D-01, D-02, D-05 (item 21) — each page of *Based on* quotes a passage word for word with its place and read date 2026-11-10; D-02 cites the frozen edition of the Node.js HTTP page.
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
4. Review of the whole change, 4 and 16, and of Slice 1, M4: the weighed "above discovery" ways of D-147 and D-185 were deleted, not reworded ("the record no longer shows the human weighed it"); D-237's example is wider than its row ("no change needed"). Left as the reviewers said; they stand in "For you to decide", 3a and 4.

## Findings outside the task's scope

1. Review of Slice 4 and of the whole change, 8: "the trust-boundary row for `src/server/` in `guidelines/testing.md` does not name the startup refusal of the mail password file" — the case that guards it carries the invariant marker, so the boundary is covered.
2. Review of Slice 4 and of the whole change, 9: "a file of two byte-order marks decodes to the single character U+FEFF and is accepted … D-111 allows it, because U+FEFF is a format character. Whether to refuse it is the human's decision." — `src/server/configuration.ts`, `readSmtpPassword`.
3. Review of the whole change, 17: "D-247 and the invariant `catch-up-minutes` still speak of 'a load of a saved game state' for the case of the state kept in the page's memory; item 32 names only D-04 and D-213."
4. Noted by reviewers, not graded: D-165 and others use "place on the list" for the list of programs; D-185 still holds "changes the accepted placement below the status"; no test pins the floor `24.15.0` of the Node range (a change to `^24.0.0` would pass every check).

## Course of the cycle

- **Task and sources:** independent task "agree the foundation, guidelines, README and the page of all states with the code" (42 items, 7 answered questions, 2 settlement rows), from the review remarks of 2026-11-06; sources read at `main` `2fe922c`.
- **Process pin:** moved from `294af7f` to `e3825a8` by the task branch's first commit `adbec4b` (at the user's instruction); the gate on that commit passed (`npm test` exit 0, `0 errors`), nothing failed there that passed on the base.
- **Spec:** none; no open design choice was found.
- **Route:** planned slices (six parts of the part map, code and tests, three guideline skills and five foundation element skills, and a read of the remote host); the foundation entries in two runs, the code and text in twelve slices.
- **Plan:** `.runs` plan with 20 foundation-entry rows and 12 slices (copied into the record).
- **Choices:** eight rows in the questions table of the record.
- **Blocking findings left:** none.
- **Record:** the record is committed after this description is published; its link by the SHA of that commit is added in the next edit.
