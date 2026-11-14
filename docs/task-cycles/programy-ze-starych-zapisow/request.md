**State: blocked** — waits for your actions outside the repository: giving your account the privilege on the test server after the deployment, and a deployment decision

## What you will see

When the game loads a saved game of another version it still starts a new game, as before. What changes is that the server now keeps that replaced game as a "previous save", one per account, so your programs are no longer lost with it. The same happens with the game you reset.

An account that holds the new privilege sees two things in the game, both on the Programy screen:

- **„Wciągnij programy z poprzedniego zapisu”**, shown only when a previous save exists. It appends the programs of the previous save at the end of your list. A program whose name is taken gets a number ("Las (2)"). A program that today's game does not accept is skipped, and one sentence names the skipped ones. The game saves at once afterwards. You can press it at any time, also during a map run, and pressing it again appends copies again.
- **„Zacznij od zera”**, a destructive button with a confirmation. It moves your present game to the place of the previous save, replacing a previous save that was already there, and starts a new game. Afterwards the old programs can be pulled with the first button.

An account without the privilege sees neither button. The privilege is given and taken away by a command you run in the game's container on the server, as the command that blocks an account is; the deployment guide for the server describes it.

![The pull button at rest beside the other acts of the list of programs](https://github.com/mariusznazar/screenshots/blob/797ffbfa254bed0494ba163711258caf16f0f081/loop2/programy-ze-starych-zapisow/pull-rest.png?raw=true)
![The result sentence after a pull: appended programs and the skipped ones named](https://github.com/mariusznazar/screenshots/blob/797ffbfa254bed0494ba163711258caf16f0f081/loop2/programy-ze-starych-zapisow/pull-result.png?raw=true)
![The reset button at rest beside „Usuń”](https://github.com/mariusznazar/screenshots/blob/8421f0fbb89bbb291355554fa09a06819f887ac8/loop2/programy-ze-starych-zapisow/programy-reset-rest.png?raw=true)
![The confirmation of the reset](https://github.com/mariusznazar/screenshots/blob/8421f0fbb89bbb291355554fa09a06819f887ac8/loop2/programy-ze-starych-zapisow/programy-reset-confirm.png?raw=true)
![The reset button waiting for the server, with „Wyloguj” not pressable](https://github.com/mariusznazar/screenshots/blob/6a0117842da4ced77db7e0b8bbfcfb42ccecc1d7/loop2/programy-ze-starych-zapisow/slice-9-reset-waiting.png?raw=true)
![The new game after the reset, with the sentence above it](https://github.com/mariusznazar/screenshots/blob/6a0117842da4ced77db7e0b8bbfcfb42ccecc1d7/loop2/programy-ze-starych-zapisow/slice-9-after-reset.png?raw=true)
![The page that shows the shared controls: the waiting state of a destructive button](https://github.com/mariusznazar/screenshots/blob/ee360ac729dd535acc142b4961f2a41bcc3256b5/loop2/programy-ze-starych-zapisow/kitchen-sink-destructive-loading.png?raw=true)

### Underneath

The server stores one more saved game per account in the same database, and gives that table and a new privilege flag a new database version; the game reads only the programs of the previous save, one by one, through the same check an edited program passes.

## For you to decide

### Needed from you

1. Give your account the privilege on the test server, after the change is deployed: run the command that the deployment guide for the server describes, in the game's container, with your email address. Without it you see neither button, although the server already keeps your previous save from the first replaced game after the deployment. A game replaced before the deployment cannot be pulled: its save was already overwritten.
2. Deploying this change moves the test server's database to a new version, and from then on the code of the main branch before this change refuses that database and fails its health check; the same happens if you deploy this branch for a trial before merging, and then the main branch's deployments fail until this change is deployed. Only you can repair that on the server. Nothing needs doing now; this is the thing to know before you deploy, and a rollback to older code is not possible without restoring a backup.

### Fix or let through

3. Four small things were left unfixed by choice or because they lie outside the change. Nobody playing will feel them. (a) The sample page that shows every shared control in every state has one row where a destructive button's waiting state is shown by a different label than its other states, which looks inconsistent only there. (b) The sentence that names skipped programs has no length limit, so a previous save with thousands of unreadable programs would give one very long line (the document is at most 64 KiB, so it stays bounded). (c) A comment in the server code still says "six small routes" although one more joined. (d) The deployment guide has a "merge nothing else until this is merged" paragraph for the earlier database change but none for this one; its main text already states the same property for this change, so nothing it says is false. Fixing them now costs one more small round of correction and review; leaving them costs nothing today, and (d) matters only if you deploy a branch for a trial. I recommend letting (a) to (c) through and making a task of (d). Fix them in this request, make a task of some, or let them all through?
4. One rule in the foundation about which parts of the code may import each other rests on a fact that the foundation has not named since 8 November. This change did not touch it. Naming it needs you to give the fact and its source; leaving it costs nothing but the gap stays marked. I recommend making a task of it. Name it in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. A reset starts the saves' counting at the start again, as the rule that decides which save the server accepts says for an account with no save, and that rule is left unchanged. The price: a second open copy of the game whose last save happens to equal a number the new game has reached would be accepted over the new game, which loses the new game, never the previous save. A copy that last saw an older number gets the usual conflict, and then shows the sentence "saved in another browser, this save loaded" although there is none after a reset, which is imprecise but harmless. An older copy of the game (opened before a deployment) that saves after your reset would later replace the previous save; this is rare and affects your own account only. I did not change the rule because the task said it stays unchanged.
6. The reset sends no save of its own first: the programs are saved right after each edit, so the previous save holds them; the last moments not yet saved (a map run in progress) are not in it. I did not add a finishing save because the task does not ask for it and it would make a reset impossible when a save fails.
7. The reset button stands on the Programy screen beside the pull button, with a confirmation that says the present game goes to the place of the previous save, replaces one already there and starts from zero. The task left the place to the cycle; the screen of programs is where you meet the previous save, and the menu of the account would mix an act on the game with the account's own.
8. The pull reads the previous save strictly, one program at a time: a program is taken only if its record has exactly the expected fields, a name that is not empty after trimming, and passes the same check as a program from the editor. The name is the trimmed one; a name that is blank is named by its place on the list in the sentence of skipped programs. A name already ending in a number gets another ("Las (2) (2)"). The reader lives in its own file so that the existing rule about reading a saved game, which refuses more and never less, stays as it is.
9. The server keeps one previous save for every account, with or without the privilege, as you chose; two version bumps in a row, or a reset after a bump, replace the older previous save before it was pulled. The server answers an account without the privilege the same way whatever the previous save holds, so nobody learns that one exists.
10. The sentences the new server command prints are in English, as the sentences of the command that blocks an account are. It ends no session, and a page already open keeps the button until it reloads, but the server checks the privilege at every request.
11. Seven screenshots are now public in the screenshots repository, in the place the foundation prescribes for them. They show only a made-up account on a local copy of the game, and the repository may be cleared after a long time.
12. Foundation entries you did not see before: the limit of 64 KiB now covers the previous save too, so a player's rows may hold two documents; the session alone authorizes reading one's own previous save and the reset, each needing the privilege; the database moves to a new version with the flag and the table, the move of the replaced document happening in the same transaction as the save; the save of a higher version moves the stored one to the previous place; the list of programs gains the pull and a taken name gets a number; the commands that answer in a sentence and the lines a human appends to the log now include the new command; the destructive buttons now include the reset button and the list of waiting labels includes the pull's; the previous save, the privilege, the pull and the reset each have their own decision; the glossary gains "previous save" and "previous-save privilege"; the part map names the new command, the previous save and the new file the game reads a document from.
13. Two new invariants have tests: a stored saved game moves to the previous place only at a save of a higher version and at the reset, and the reset and the read of the previous save refuse an account without the privilege; the reader of a previous save reads only the version, the list of programs and their items, accepts programs only through the editor's check and throws for no value. Seven existing invariants were widened, such as the rule that the game loads nothing from a saved game of another version, which now has the exception of programs a privileged account pulls. No invariant is marked violated.
14. Three new log lines carry only the account's number: one when a reset moved a save, one when the privilege is granted and one when it is revoked.

## Cost

About 5 hours 53 minutes of working time across the cycle, of which about 2 hours 55 minutes were waiting for tools, with 347 million tokens (270 million on the same-class model, 77 million on the cheaper one) over 79 stages. Review rounds: the spec was reviewed twice, slices 1 and 6 each had one fix and a second review, slices 2 and 3 passed at once, the whole change had one fix for 16 small findings and a second review, and the two merges of the target branch each had one fix and a second review; one real defect was found by the gate and fixed. The table of stages is in the record.

## How to merge

Do not merge yet: the request waits for the actions above. When you do, merge with a merge commit that keeps the commits, since the link to the record survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: zablokowane** — czeka na Twoje działania poza repozytorium: nadanie Twojemu kontu uprawnienia na serwerze testowym po wdrożeniu i decyzję o wdrożeniu

## Co zobaczysz

Gdy gra wczytuje zapis innej wersji, nadal zaczyna nową grę, jak dotąd. Zmienia się to, że serwer odkłada teraz taki zastąpiony zapis jako „poprzedni zapis”, jeden na konto, więc Twoje programy nie przepadają razem z nim. To samo dzieje się z grą, którą zresetujesz.

Konto z nowym uprawnieniem widzi w grze dwie rzeczy, obie na ekranie Programy:

- **„Wciągnij programy z poprzedniego zapisu”**, widoczny tylko gdy poprzedni zapis istnieje. Dopisuje programy z poprzedniego zapisu na koniec listy. Program o zajętej nazwie dostaje numer („Las (2)”). Program, którego dzisiejsza gra nie przyjmuje, jest pomijany, a jedno zdanie podaje nazwy pominiętych. Potem gra od razu zapisuje. Przycisk działa w dowolnej chwili, także podczas przejścia mapy, a ponowne naciśnięcie znów dopisuje kopie.
- **„Zacznij od zera”**, przycisk niszczący z potwierdzeniem. Przenosi bieżącą grę na miejsce poprzedniego zapisu, zastępując poprzedni zapis, który już tam był, i zaczyna nową grę. Potem stare programy można wciągnąć pierwszym przyciskiem.

Konto bez uprawnienia nie widzi żadnego z nich. Uprawnienie nadaje i zdejmuje polecenie, które uruchamiasz w kontenerze gry na serwerze, tak jak polecenie blokujące konto; opisuje je instrukcja wdrożenia serwera.

(Zrzuty ekranu powyżej pokazują te same stany.)

### Pod spodem

Serwer przechowuje w tej samej bazie jeden dodatkowy zapis na konto i dostaje na tę tabelę i nowy znacznik uprawnienia nową wersję bazy; gra czyta z poprzedniego zapisu tylko programy, po jednym, tym samym sprawdzeniem, które przechodzi program z edytora.

## Do Twojej decyzji

### Potrzebne od Ciebie

1. Nadaj swojemu kontu uprawnienie na serwerze testowym po wdrożeniu zmiany: uruchom polecenie, które opisuje instrukcja wdrożenia serwera, w kontenerze gry, z Twoim adresem e-mail. Bez tego nie zobaczysz żadnego z przycisków, chociaż serwer od pierwszej zastąpionej gry po wdrożeniu już trzyma Twój poprzedni zapis. Gry zastąpionej przed wdrożeniem nie da się wciągnąć: jej zapis został już nadpisany.
2. Wdrożenie tej zmiany przenosi bazę serwera testowego na nową wersję i od tej chwili kod gałęzi głównej sprzed tej zmiany odrzuca tę bazę i nie przechodzi kontroli zdrowia; to samo stanie się, jeśli wdrożysz tę gałąź na próbę przed scaleniem, a wtedy wdrożenia gałęzi głównej nie przechodzą, dopóki nie wdrożysz tej zmiany. Naprawić to na serwerze możesz tylko Ty. Teraz nic nie trzeba robić; to rzecz do wiedzenia przed wdrożeniem, a powrót do starszego kodu nie jest możliwy bez odtworzenia kopii zapasowej.

### Poprawić czy przepuścić

3. Cztery drobiazgi zostały niepoprawione z wyboru albo dlatego, że leżą poza zmianą. Nikt grający ich nie odczuje. (a) Strona pokazująca wszystkie wspólne kontrolki w każdym stanie ma jeden wiersz, w którym stan oczekiwania przycisku niszczącego pokazuje inny napis niż jego pozostałe stany, co wygląda niespójnie tylko tam. (b) Zdanie podające nazwy pominiętych programów nie ma limitu długości, więc poprzedni zapis z tysiącami nieczytelnych programów dałby jedną bardzo długą linię (dokument ma najwyżej 64 KiB, więc jest ograniczona). (c) Komentarz w kodzie serwera nadal mówi o „sześciu małych trasach”, choć doszła jeszcze jedna. (d) Instrukcja wdrożenia ma akapit „nic innego nie scalaj, dopóki to nie zostanie scalone” dla wcześniejszej zmiany bazy, a dla tej nie; jej główny tekst już mówi to samo o tej zmianie, więc nic w niej nie jest fałszem. Poprawienie ich teraz kosztuje jeszcze jedną małą rundę poprawki i przeglądu; zostawienie nic dziś nie kosztuje, a (d) ma znaczenie tylko, gdy wdrożysz gałąź na próbę. Polecam przepuścić (a)–(c) i zrobić zadanie z (d). Poprawić w tej prośbie, zrobić z części zadanie, czy przepuścić wszystko?
4. Jedna reguła fundamentu o tym, które części kodu mogą importować nawzajem swoje pliki, opiera się na fakcie, którego fundament nie nazwał od 8 listopada. Ta zmiana jej nie dotknęła. Nazwanie go wymaga, żebyś podał fakt i jego źródło; zostawienie nic nie kosztuje, ale luka zostaje oznaczona. Polecam zrobić z tego zadanie. Nazwać w tej prośbie, zrobić zadanie, czy przepuścić?

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

5. Reset zaczyna liczenie zapisów od początku, tak jak mówi reguła, która rozstrzyga, jaki zapis serwer przyjmie, dla konta bez zapisu, i ta reguła zostaje bez zmian. Cena: druga otwarta kopia gry, której ostatni zapis akurat równa się numerowi, który nowa gra osiągnęła, zostałaby przyjęta nad nową grą, co gubi nową grę, nigdy poprzedni zapis. Kopia, która ostatnio widziała starszy numer, dostaje zwykły konflikt, a potem zdanie „zapisano w innej przeglądarce, wczytano ten zapis”, choć po resecie żadnego nie ma, co jest nieprecyzyjne, ale nieszkodliwe. Starsza kopia gry (otwarta przed wdrożeniem), która zapisze po Twoim resecie, później zastąpiłaby poprzedni zapis; to rzadkie i dotyczy tylko Twojego konta. Nie zmieniłem reguły, bo zadanie mówiło, że zostaje bez zmian.
6. Reset nie wysyła własnego zapisu wcześniej: programy są zapisywane zaraz po każdej edycji, więc poprzedni zapis je ma; ostatnie chwile jeszcze niezapisane (trwające przejście mapy) w nim nie są. Nie dodałem zapisu końcowego, bo zadanie o to nie prosi, a uniemożliwiłby reset przy nieudanym zapisie.
7. Przycisk resetu stoi na ekranie Programy obok przycisku wciągania, z potwierdzeniem, które mówi, że bieżąca gra idzie na miejsce poprzedniego zapisu, zastępuje już tam leżący i zaczyna od zera. Zadanie zostawiło miejsce cyklowi; ekran programów to miejsce, w którym spotykasz poprzedni zapis, a menu konta mieszałoby czynność na grze z czynnościami samego konta.
8. Wciąganie czyta poprzedni zapis ściśle, po jednym programie: program jest brany tylko, gdy jego zapis ma dokładnie oczekiwane pola, nazwę niepustą po przycięciu i przechodzi to samo sprawdzenie co program z edytora. Nazwa jest przycięta; pusta nazwa jest w zdaniu o pominiętych podana miejscem na liście. Nazwa kończąca się już numerem dostaje kolejny („Las (2) (2)”). Czytnik leży we własnym pliku, żeby istniejąca reguła o czytaniu zapisu gry, która odmawia więcej i nigdy mniej, została bez zmian.
9. Serwer trzyma jeden poprzedni zapis na każde konto, z uprawnieniem czy bez, jak wybrałeś; dwa podbicia wersji z rzędu albo reset po podbiciu zastępują starszy poprzedni zapis, zanim go wciągniesz. Serwer odpowiada kontu bez uprawnienia tak samo, cokolwiek poprzedni zapis zawiera, więc nikt się nie dowie, że istnieje.
10. Zdania, które drukuje nowe polecenie serwera, są po angielsku, jak zdania polecenia blokującego konto. Nie kończy żadnej sesji, a otwarta strona zachowuje przycisk do przeładowania, ale serwer sprawdza uprawnienie przy każdym żądaniu.
11. Siedem zrzutów ekranu jest teraz publicznych w repozytorium zrzutów, w miejscu, które wskazuje fundament. Pokazują tylko zmyślone konto na lokalnej kopii gry, a repozytorium może zostać wyczyszczone po długim czasie.
12. Wpisy fundamentu, których wcześniej nie widziałeś: limit 64 KiB obejmuje teraz także poprzedni zapis, więc wiersze gracza mogą trzymać dwa dokumenty; sama sesja uprawnia do odczytu własnego poprzedniego zapisu i do resetu, każde dla konta z uprawnieniem; baza przechodzi na nową wersję ze znacznikiem i tabelą, a przeniesienie zastąpionego dokumentu odbywa się w tej samej transakcji co zapis; zapis wyższej wersji przenosi przechowywany na miejsce poprzedniego; lista programów zyskuje wciąganie, a zajęta nazwa dostaje numer; polecenia odpowiadające zdaniem i linie dopisywane przez człowieka do logu obejmują nowe polecenie; przyciski niszczące obejmują przycisk resetu, a lista napisów oczekiwania obejmuje napis wciągania; poprzedni zapis, uprawnienie, wciąganie i reset mają każde własną decyzję; słownik zyskuje „poprzedni zapis” i „uprawnienie poprzedniego zapisu”; mapa części nazywa nowe polecenie, poprzedni zapis i nowy plik, z którego gra czyta dokument.
13. Dwa nowe niezmienniki mają testy: przechowywany zapis przechodzi na miejsce poprzedniego tylko przy zapisie wyższej wersji i przy resecie, a reset i odczyt poprzedniego zapisu odmawiają kontu bez uprawnienia; czytnik poprzedniego zapisu czyta tylko wersję, listę programów i ich elementy, przyjmuje programy tylko przez sprawdzenie edytora i nie wyrzuca wyjątku dla żadnej wartości. Siedem istniejących niezmienników rozszerzono, m.in. regułę, że gra nie wczytuje nic z zapisu innej wersji, która ma teraz wyjątek: programy, które konto z uprawnieniem wciąga. Żaden niezmiennik nie jest oznaczony jako naruszony.
14. Trzy nowe linie logu niosą tylko numer konta: jedna, gdy reset przeniósł zapis, jedna przy nadaniu uprawnienia i jedna przy jego zdjęciu.

## Koszt

Około 5 godzin 53 minut czasu pracy w cyklu, z czego około 2 godzin 55 minut to oczekiwanie na narzędzia, 347 milionów tokenów (270 milionów na modelu tej samej klasy, 77 milionów na tańszym) w 79 etapach. Rundy przeglądu: specyfikację przejrzano dwa razy, slice'y 1 i 6 miały po jednej poprawce i drugim przeglądzie, slice'y 2 i 3 przeszły od razu, cała zmiana miała jedną poprawkę 16 drobnych uwag i drugi przegląd, a oba merge'e gałęzi głównej po jednej poprawce i drugim przeglądzie; jedną realną usterkę znalazła bramka i została naprawiona. Tabela etapów jest w rekordzie.

## Jak scalić

Nie scalaj jeszcze: prośba czeka na powyższe działania. Gdy to zrobisz, scal commitem scalającym, który zachowuje commity, bo link do rekordu przeżywa tylko wtedy.

</details>

## Technical changes

The change was made in nine slices on top of foundation entries written first; the target branch was merged twice and its decisions renumbered once more at each merge (the four new decisions are now D-399 to D-402).

- Foundation entries (`809fbf6b`, renumbered by `f79ebc13` and `bfe7fe06`): four new decisions, ten changed, two new invariants, seven changed, two glossary terms, the part map (see *Foundation entries*).
- Slice 1, database (`896b7509`, fix `4e1decb2`): schema step 5 with the privilege flag and the table of previous saved game states; the move of the replaced document in the transaction of the save write; the reset write; the reader of the previous save; the privilege write; the tests that read the schema version as 4.
- Slice 2, routes (`41d80c2e`): `GET /api/previous-saved-game`, `POST /api/saved-game-reset`, and `previousSaveAllowed` in every account body; 403 `previous-save-forbidden` without the privilege; the business event `saved-game-reset`.
- Slice 3, operator command (`d946a58b`): `src/server/account-previous-save.ts`, run as `docker exec loop2 node dist/server/account-previous-save.js grant|revoke <email>`.
- Slice 4, deploy skill (`b3db0acf`): the section for the command, the two passages the new log lines made false, and the paragraphs that say what schema version 5 is, in both copies of the skill.
- Slice 5, browser client (`19ea8b1c`): the two requests and the new account field in `src/browser/account-api.ts`.
- Slice 6, reader and append (`6a9283c4`, fix `ea8de2c2`): `src/browser/sim/previous-programs.ts` and the append with numbering in `src/browser/sim/programs.ts`.
- Slices 7 to 9 (`72a395c7`, `8cac0a43`, `7adcc0bb`): the pull on the screen of programs, the reset control with its confirmation, the page's reset flow with the held outcomes of the old saver and the disabled „Wyloguj”.
- The fix of 16 small findings of the whole-change review (`7a7b318f`, `ec7973ef`, `0e43afdb`, `086a2644`, `5fe76674`): tests, guideline rows, a guard in the page's logout, the sentences of the reset in one file, the kitchen-sink page, the wording of two decisions.
- The return step (`cbd094a0`): two markers of an invariant on existing tests.
- Two merges of the target branch (`b1628f0a`, `413aae29`) and their fixes (`60e6a6bb`, `4d6e4b44`): the shared harness's `press` in a view test; the saved-game version of the target (6) in the reader's tests; the test of a new game's maps.
- The fix of the gate's one failure (`52ec5ab4`): a deployment test of the account answer.

## Checks

- The gate, `npm test` at `4d6e4b44` (the final tree): exit 0; the build, the Node tests (2389 pass, 0 fail), and the Python tests of four directories (562 tests: `tests/agent_workflow`, `tests/deploy`, `tests/invariants`, `tests/quality`), then the foundation check ("0 errors"). Log: the third run of the gate in the record.
- Gate runs of this cycle: on the base (before the change) exit 1 with two tests of `tests/quality` that could not run because the pinned linter and shell checker were not installed in the fresh worktree; after the README's step they passed (5 tests, exit 0) and the foundation check on the base printed 0 errors. On the first merged tree (`60e6a6bb`) exit 1: `tests/deploy/test_account_storage.py` expected the old account answer; fixed by `52ec5ab4`, the test then passed alone (exit 0) and the gate on `52ec5ab4` passed (exit 0). After the second merge the gate ran once more, on `4d6e4b44`, exit 0. No check failed and passed again without a code change.
- Own-work checks: each executor named the requirement most likely missed and broke the code on purpose to see its tests fail: slice 1 (two mutants), slice 6 (two mutants), slice 7 (six), slice 8 (four), slice 9 (nine, two equivalent mutants survived), the whole-change fix (each new test), the return step (the privilege guard). Reviewers ran mutants of their own: 15 on the database (4 survived, then fixed), 8 on the routes (all caught), 11 on the command (10 caught; the last, a missing `database.close()`, is an equivalent mutant as in the block command), 143 by StrykerJS on the reader (9 survived, two fixed by the slice's fix, the rest classified), and seven on the whole change (all caught).
- User-interface states: the executors of slices 7 to 9 ran the game locally with a made-up privileged account and looked at the rest, waiting, result and confirmation states, the pull, the reset, the reload after it, the failed answer; the reviewer of the whole change ran the three flows in a browser (no controls for an unprivileged account, both routes answering 403; the confirmation sending nothing; the reset, the new game on revision 0 and the old game as the previous save; the pull appending and saving at once; a crafted previous save; a revoked privilege answering 403 on both; a copy open across a reset getting the conflict). Not looked at in a browser: the hover and focus looks, the sign-out path of the reset, narrower windows.
- Foundation reading by the whole-change reviewer: of 389 selected decisions it read 71 whole and 318 by title, and it read all the guideline files of the touched parts whole; the reviews of the two merges and of the three fixes read only the changed parts and ran no product test by order (memory); the gate covers those runs.
- The form check of this description, the check of private paths on it and on the record's copy, the image check of the copy and the remarks check: see the record's *Request handoff*; the last runs are named there.
- The remarks check (`task-cycle/remarks_check.py`): first run exit 1 listing 76 items of the reports' *Searches not found or unclear*, all appended to the process remarks; the next run exit 0, "0 not in the process remarks".

## Foundation entries

Marked `row <n>` when written whole from a row of *Settlements to record*; `the cycle's` otherwise.

- D-399 (new, row 1): the server keeps for every account at most one previous save, written only by an accepted save of a higher version and by the reset, never read by the game's load.
- D-400 (new, row 2): the privilege is one flag on the account, granted and revoked by the operator's container command, read by the server at each request, answered with 403 on the two routes and carried as `previousSaveAllowed`.
- D-401 (new, rows 3 and 4): the pull button, shown to a privileged account with a previous save, fetches it again and appends its programs through a reader of its own that takes each program one by one through the editor's check and names the skipped ones.
- D-402 (new, row 5): „Zacznij od zera” behind a confirmation sends no save first, makes the server move the current save to the previous one and builds a new game with revision 0; D-209 stays as it is.
- D-206 (changed, row 1): the game still discards a saved game state of another version and starts anew, but the server keeps it as the previous save and an account with the privilege appends its programs one by one.
- D-167 and D-169 (changed, rows 3 and 4): the list of programs gains the pull button; a pulled program with a taken name takes „(n)”.
- D-104 (the cycle's): the 64 KiB limit covers the previous save too; the reset route takes the 16 KiB of the small routes.
- D-109 (the cycle's): the session alone authorizes reading its own previous save and the reset, each for an account with the privilege.
- D-112 (the cycle's): schema version 5 adds the privilege flag and the table of previous saves; the save, the reset and the privilege write read their conditions in their transaction.
- D-210 (the cycle's): an accepted save of a higher version moves the stored saved game state to the previous save in the same transaction.
- D-354 and D-355 (the cycle's): the new command is a service command whose sentence is no log line, and a human's run of it appends its JSON lines to the log file.
- D-252 and D-253 (the cycle's, found by the search of the foundation): the command lists name the new command beside the block and backup commands.
- D-44 (the cycle's): „Zacznij od zera” is a destructive button, and the pull's „Wciąganie…” is a waiting label.
- Invariants changed: `save-version`, `account-client-outcomes`, `account-session-authorization`, `account-mutation-request-guards`, `player-save-isolation`, `account-schema-lifecycle`, `account-database-schema`; new: `previous-save-slot` (test, account-server) and `previous-save-programs-reader` (test, simulation). The two markers the return step added cite `save-version` in two view tests. No *Violated* mark set or cleared; no surface other than the one in the part map.
- Glossary: "previous save", "previous-save privilege".
- Part map: the description of `account-server` names the privilege command and the previous save; the trust boundary of `simulation` gains `src/browser/sim/previous-programs.ts`.

## Minor findings

Not fixed:

1. (New in the review of the fix of the whole change) `src/browser/kitchen-sink/kitchen-sink.ts:234`: the destructive row shows "Zakończ" in four states and "Zacznij od zera" in the loading column; the reviewer says `["Zakończ", null]` would make the row consistent, no effect on a player.
2. (Review of the second merge's fix) the bound tests of the reader and the view test now write the numbers 6 and 7 out, so the next raise of the saved-game version moves them; the reviewer notes it is the file's rule of writing expected values out.
3. The slice reviews' Minor findings that the whole-change reviewer regraded and dropped: slice 2: the executor's report misdescribes a vanished account's answer (`src/server/app.ts:93-127` answers a JSON 500; no defect in the code) and the identifiers added to the header lists of the testing guidelines are acceptable; slice 3: removing `database.close()` fails no test, an equivalent mutant as in the block command; slice 6: survivors that are defence in depth for non-JSON values, and the spec's "non-empty text" for a skipped name against the decision's "not empty after trimming" (the code follows the decision).

## Findings outside the task's scope

1. `.claude/skills/loop2-deploy/references/setup_and_secrets.md:325-336` has a "merge nothing else to main" window for the schema-4 deployment and none for schema 5; `SKILL.md` states the property for 5, so no sentence is false (reviewer of the whole change; slice 4's question).
2. The sentence of the pull that names the skipped programs has no limit on the length of the list (the task says it names them; the document is at most 64 KiB).
3. `guidelines/coding-browser-module.md` has stale example paragraphs (reviewer of the whole change, second pass).
4. `src/server/account-routes.ts`, the comment above `accountBodyLimit` says "the six small routes"; it was already stale at the base and the reset makes it more so (return step, whole-change fix and its review).

No check whose file belongs to a part outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** an independent task: the pull of programs from the previous save for an account with a privilege, and the reset of the game from zero; it changes decision D-206; sources: the task document (settlements accepted 2026-11-13) and the foundation at the base `6f237fb8`, then at the merges `b1628f0a` and `413aae29`.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** written and reviewed twice (the first review failed on three findings; one revision; the second review passed): `docs/task-cycles/programy-ze-starych-zapisow/spec.md`, the open choice being the contract across the trust boundary, where the previous save moves, and what the browser shows.
- **Route:** planned slices, because the change crosses three parts, the foundation, the guidelines, the skill and about ten test files.
- **Plan:** nine slices after the foundation entries: database, routes, command, skill, client, reader and append, pull, reset control, page flow: `docs/task-cycles/programy-ze-starych-zapisow/plan.md`.
- **Choices:** 36 other choices of the cycle, in the questions table of the record (rows `Q`, `R`, `P`, `F`, `S`, `W`, `M` and the unread-material rows `A`).
- **Blocking findings left:** none.
- **Record:** the link follows after the record is committed.
