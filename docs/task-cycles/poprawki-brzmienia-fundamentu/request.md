**State: ready** — nothing blocks the merge; the two items under "Fix or let through" wait for your answer, and the rest only needs your merge.

## What you will see

The game does not change: nothing a player sees or does is different. This request fixes wording that the review of the foundation of 13 November found misleading, where a careful reader (a person or an agent) would take a sentence literally and come away with a wrong picture. About fifty decisions, eleven rules the product must keep, six glossary words, three parts of the map of parts and thirteen facts about the world outside the repository are reworded or re-copied from their sources, among them one new glossary word, "reading". Two guideline files, the readme, the page for reviewers (it now names the second branch rule of the repository, which needs a green check before a merge and which an administrator, so also an agent working on that account, can bypass with an explicit merge) and the comments of about thirty tests and code files follow. The band with the picture at the top of the headquarters screen is now called "the picture band" everywhere in English text, so that "camp" means only the place where a character is. One test gained a check: the readme's list of which pack each sprite comes from must agree with the test's own table.

### Underneath

Where a decision's sentence changed, the quotations of that sentence that tests hold were moved to the new wording; every foundation entry was written through its element's skill, and the foundation check, the check of the instruction files and all tests pass on the final tree.

## For you to decide

### Needed from you

none

### Fix or let through

1. The reviewers left findings that no fix made; none changes how the game behaves, and I judged that you or an agent working with the foundation may feel these. (Minor findings; Findings outside the task's scope, 1 to 4.)
   - **a.** Two wordings are the task's own, which you accepted, and a reviewer questioned them: the "not this" line of the new glossary word "reading" contains the word itself, which the glossary template forbids, and the word also keeps its everyday senses in other entries; and one relation line of the decision about how the browser view is built says "narrowed by" a later decision, which is not one of the two relation words the template allows (the later decision should say it narrows the earlier one).
   - **b.** Two copies of an agent skill about the pictures of the scene still call the picture band "the camp", so an agent reading that skill meets both meanings of the word. The two copies must be kept equal, which this request did not do.
   - **c.** The new readme check cuts the readme text at fixed opening phrases, so rewording that readme sentence makes the test fail; it never lets a wrong pack pass.
   - **d.** A decision about the effects of a map's scene says an effect lasts "less than three seconds"; the plaques that announce discoveries run 600 ms plus 150 ms for each further discovery, so a run with more than sixteen discoveries at once would pass that figure. Nobody measured the largest discovery the game data can give.
   - **e.** The word "deployment" still names the memory limit of the container in a skill reference of the deployment skill (two copies) and in one test title; the foundation now says "container's memory limit".
   - **f.** One comment of the simulation code still says "defeated-attack count", where the foundation now says "count of beaten attacks".
   - **g.** One test line that quotes the backup decision covers only its first part, and one line of the picture-pack decision is longer than its neighbours.
   - **Ways:** fix them here (a round of correction with its review, about the time of the last one); make one task of b and e, which are copies of skill files outside the foundation, and let the rest through; or let all through. If you leave a or d, a reader may meet the double meaning or the three-second figure; if you leave b, an agent meets "camp" twice.
   - **Recommendation:** make one task of b and e together, let the rest through, since a is your own wording and c, d, f and g do not change behaviour.
   - **Question:** fix all in this request, make a task of b and e and let the rest through, or let all through?
2. The reviewer of the whole change opened 8 of the 53 decisions it judged in full; of the other 45 it read the changed passages and their binding sentences, but not the unchanged one-line "why" and "rejected" paragraphs, and it did not write the index of its whole selection, which would have been the whole decision log. Of the outside sources of the re-copied facts, it did not fetch three (the pack's terms, the mail library and the Node.js documentation); the author's agent had fetched all of them. A wrong word in an unread paragraph, or a wrong quotation from those three sources, would reach the main branch without a second reader. Reading what stayed unread costs another review round (about the twelve minutes the first one took, on the strongest model) and its tokens; letting it through costs nothing today. I recommend letting it through, since each changed passage was read and the three facts were checked by the author's own search. Read it in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. Beyond what the task lists, the cycle chose how to make some changes, and another way would show in what the foundation says. I took the wider way for the picture band: beside the decision the task names, the other decisions, the readme, the headings and the comments that call the band "the camp" now say "the picture band"; I did it because the task's own reason is that the word should mean one thing, and the narrow way would leave it meaning two. Four decisions had a second sentence that the new wording left contradicting the first (the verification lines of the end-of-run screen and of the transfer line, the "complies" line of the backup decision, the verification pair and a shortened sentence in two decisions about tests); I made them agree. Where the task gave a change without words, I wrote them: how the saving decision names the previous-save privilege, the decimal comma in the sentence about numbers with tenths, the order in which a program's refusals are listed, the prefix of the session cookie, the "per account" parenthesis after the message limit. Where the task's quoted wording no longer stood, or was already made, I did not force it: for example the task's change to one decision about the log's rotation did not apply because that sentence had been replaced; two withdrawn entries, a decision and a fact, got their change in their successors. (Foundation entries; Technical changes.)
4. The return step found three sentences that the re-copied fact about the Pixel Crawler pack made untrue, since the pack's terms ask for a credit when a project has a saxophone solo; it reworded the decision about the sprite credits, the readme and a test comment to say so. The game has no saxophone solo, so what the credits show does not change. (Foundation entries, "the cycle's".)
5. Changed invariant tests and sentences. The foundation check lists three reworded rules whose citing tests were left as they were: the rule that the session cookie's name starts with a fixed prefix, the rule about the count of beaten attacks in a trip plan's progress, and the rule about what a run knows of the loop; I read their tests, and they still hold. One reworded rule (the sprite credits) gained a check in its existing test, which compares the readme's list of packs with the test's table, and no marker line of any test was added or changed. About thirty tests quote decision sentences by a marker line; where a sentence changed, the quotation follows it, and two tests gained such a line (one for the decimal comma, one for effects cut by leaving the screen). (Foundation entries.)

## Cost

The cycle's working time was about 1 hour 58 minutes (the orchestrator's turns joined with those of 22 agents), of which 22 minutes were waiting for tools; the two runs of the full tests took 12.5 minutes each. The agents used about 154 million tokens (mostly cached input): about 81 million on the same-class model, 47 million on the strongest allowed model, which ran the planner and the review of the whole change, and 26 million on the cheaper model, which made seven of the seventeen slices. The review of the whole change failed once and passed after one fix; the review of the return step failed once and passed after one fix. The table of stages stands in the committed record, linked under Course of the cycle.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — nic nie blokuje scalenia; dwie pozycje w „Napraw albo przepuść” czekają na Twoją odpowiedź, reszta wymaga tylko scalenia.

## Co zobaczysz

Gra się nie zmienia: nic, co widzi albo robi gracz, nie jest inne. Ta zmiana poprawia brzmienie, które przegląd fundamentu z 13 listopada uznał za mylące — tam, gdzie uważny czytelnik (człowiek albo agent) wziąłby zdanie dosłownie i wyniósł zły obraz. Około pięćdziesięciu decyzji, jedenaście reguł, które produkt musi trzymać, sześć słów słownika, trzy części mapy części i trzynaście faktów o świecie poza repozytorium dostało nowe brzmienie albo cytaty przepisane na nowo ze źródeł; wśród nich jedno nowe słowo słownika, „reading”. Idą za tym dwa pliki wytycznych, readme, strona dla recenzentów (mówi teraz o drugiej regule gałęzi repozytorium, która wymaga zielonego sprawdzenia przed scaleniem i którą administrator, więc także agent pracujący na tym koncie, może obejść jawnym scaleniem) oraz komentarze około trzydziestu testów i plików kodu. Pas z obrazem u góry ekranu Siedziba nazywa się teraz w angielskim tekście „the picture band”, żeby „camp” znaczyło tylko miejsce, w którym jest postać. Jeden test dostał sprawdzenie: lista paczek sprite'ów w readme musi się zgadzać z tabelą w teście.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

brak

### Napraw albo przepuść

1. Recenzenci zostawili uwagi, których żadna poprawka nie wprowadziła; żadna nie zmienia zachowania gry, a oceniam, że Ty albo agent pracujący z fundamentem możecie je odczuć. (Uwagi drobne; uwagi poza zakresem zadania, 1 do 4.)
   - **a.** Dwa brzmienia pochodzą z zadania, które zaakceptowałeś, a recenzent je zakwestionował: linia „nie to” nowego słowa „reading” zawiera samo słowo, czego szablon słownika zabrania, a słowo zachowuje też zwykłe znaczenia w innych wpisach; oraz jedna linia relacji decyzji o budowie widoku mówi „narrowed by” o późniejszej decyzji, a to nie jest żadne z dwóch słów relacji dozwolonych przez szablon (późniejsza decyzja powinna mówić, że zawęża wcześniejszą).
   - **b.** Dwie kopie skilla agenta o obrazach sceny nadal nazywają pas z obrazem „obozem” (camp), więc agent czytający ten skill spotyka oba znaczenia słowa. Obie kopie trzeba trzymać równe, czego ta zmiana nie zrobiła.
   - **c.** Nowe sprawdzenie readme tnie tekst po stałych początkach zdań, więc przeredagowanie tego zdania readme wywali test; zły podział na paczki nigdy go nie przejdzie.
   - **d.** Decyzja o efektach sceny mapy mówi, że efekt trwa „krócej niż trzy sekundy”; tabliczki ogłaszające odkrycia biegną 600 ms plus 150 ms za każde kolejne odkrycie, więc przebieg z więcej niż szesnastoma odkryciami naraz przekroczy tę liczbę. Nikt nie zmierzył największego odkrycia, jakie mogą dać dane gry.
   - **e.** Słowo „deployment” nadal nazywa limit pamięci kontenera w odnośniku skilla wdrożeń (dwie kopie) i w jednym tytule testu; fundament mówi teraz „container's memory limit”.
   - **f.** Jeden komentarz kodu symulacji nadal mówi „defeated-attack count”, a fundament mówi teraz „count of beaten attacks”.
   - **g.** Jedna linia testu cytująca decyzję o kopii zapasowej obejmuje tylko jej pierwszą część, a jedna linia decyzji o paczkach obrazków jest dłuższa niż sąsiednie.
   - **Drogi:** poprawić tu (runda korekty z recenzją, mniej więcej tyle co ostatnia); zrobić jedno zadanie z b i e, które są kopiami plików skilli poza fundamentem, a resztę przepuścić; albo przepuścić wszystko. Jeśli zostawisz a lub d, czytelnik może trafić na podwójne znaczenie albo liczbę trzech sekund; jeśli zostawisz b, agent spotka „camp” dwa razy.
   - **Rekomendacja:** zrobić jedno zadanie z b i e, resztę przepuścić, bo a to Twoje brzmienie, a c, d, f i g nie zmieniają zachowania.
   - **Pytanie:** poprawić wszystko w tej zmianie, zrobić zadanie z b i e i przepuścić resztę, czy przepuścić wszystko?
2. Recenzent całości otworzył w całości 8 z 53 decyzji, które oceniał; z pozostałych 45 przeczytał zmienione fragmenty i zdania wiążące, ale nie niezmienione jednowierszowe akapity „dlaczego” i „odrzucone”, i nie napisał indeksu całego swojego wyboru, który byłby całym dziennikiem decyzji. Z zewnętrznych źródeł przepisanych faktów nie pobrał trzech (warunki paczki, biblioteka poczty i dokumentacja Node.js); agent autora pobrał wszystkie. Błędne słowo w nieprzeczytanym akapicie albo błędny cytat z tych trzech źródeł trafiłby na główną gałąź bez drugiego czytelnika. Przeczytanie tego, co zostało, kosztuje kolejną rundę przeglądu (około dwunastu minut, które zajął pierwszy, na najmocniejszym modelu) i jej tokeny; przepuszczenie nic dziś nie kosztuje. Rekomenduję przepuścić, bo każdy zmieniony fragment został przeczytany, a trzy fakty sprawdziło własne wyszukiwanie autora. Przeczytać to w tej zmianie, zrobić zadanie, czy przepuścić?

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Poza tym, co wylicza zadanie, cykl wybrał, jak wykonać niektóre zmiany, a inna droga byłaby widoczna w tym, co mówi fundament. Dla pasa z obrazem wybrałem drogę szerszą: obok decyzji, którą wskazuje zadanie, inne decyzje, readme, nagłówki i komentarze, które nazywają pas „obozem”, mówią teraz „the picture band”; zrobiłem to, bo powód zadania to jedno znaczenie słowa, a wąska droga zostawiłaby dwa. Cztery decyzje miały drugie zdanie, któremu nowe brzmienie przeczyło (linie weryfikacji ekranu końca przejścia i linii przekazania do skrzynki, linia „complies” decyzji o kopii zapasowej, para weryfikacji i skrócone zdanie w dwóch decyzjach o testach); wyrównałem je. Tam, gdzie zadanie podało zmianę bez słów, napisałem je: jak decyzja o zapisie nazywa uprawnienie do poprzedniego zapisu, przecinek dziesiętny w zdaniu o liczbach z dziesiątymi, kolejność wymieniania odmów programu, prefiks ciasteczka sesji, nawias „na konto” po limicie wiadomości. Gdy cytowane brzmienie zadania już nie stało albo było zrobione, nie wymuszałem: na przykład zmiana zadania dla jednej decyzji o rotacji logu nie obowiązywała, bo to zdanie zastąpiono; dwa wycofane wpisy, decyzja i fakt, dostały zmianę w swoich następcach. (Wpisy fundamentu; Zmiany techniczne.)
4. Krok powrotu znalazł trzy zdania, które przepisany fakt o paczce Pixel Crawler uczynił nieprawdziwymi, bo warunki paczki żądają wzmianki, gdy projekt ma solo na saksofonie; przeredagował decyzję o zasługach sprite'ów, readme i komentarz testu. Gra nie ma solo na saksofonie, więc to, co pokazują zasługi, się nie zmienia. (Wpisy fundamentu, „the cycle's”.)
5. Zmienione testy reguł i zdania reguł. Sprawdzenie fundamentu wymienia trzy przeredagowane reguły, których testy cytujące zostały bez zmian: regułę, że nazwa ciasteczka sesji zaczyna się stałym prefiksem, regułę o liczbie pokonanych napaści w postępie planu wyprawy i regułę o tym, co wie przebieg pętli; przeczytałem ich testy i nadal je trzymają. Jedna przeredagowana reguła (zasługi sprite'ów) dostała sprawdzenie w swoim istniejącym teście, które porównuje listę paczek w readme z tabelą testu; nie dodano ani nie zmieniono żadnej linii znacznika w żadnym teście. Około trzydziestu testów cytuje zdania decyzji linią znacznika; gdzie zdanie się zmieniło, cytat idzie za nim, a dwa testy dostały taką linię (jedna dla przecinka dziesiętnego, jedna dla efektów przerwanych wyjściem z ekranu). (Wpisy fundamentu.)

## Koszt

Czas pracy cyklu to około 1 godziny 58 minut (tury orkiestratora złączone z turami 22 agentów), z czego 22 minuty to czekanie na narzędzia; dwa biegi pełnych testów trwały po 12,5 minuty. Agenci zużyli około 154 milionów tokenów (głównie z pamięci podręcznej): około 81 milionów na modelu tej samej klasy, 47 milionów na najmocniejszym dozwolonym modelu, który prowadził planistę i recenzję całości, i 26 milionów na modelu tańszym, który wykonał siedem z siedemnastu kroków. Recenzja całości oblała raz i przeszła po jednej poprawce; recenzja kroku powrotu oblała raz i przeszła po jednej poprawce. Tabela etapów stoi w zatwierdzonym zapisie, podlinkowanym w „Course of the cycle”.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu cyklu przetrwa tylko wtedy.

</details>

## Technical changes

The change is 21 commits on the base `f66ae6eb` (the head of `main` at the start), by group:

- **Glossary, map of parts, environment facts** (`ce9cac00`, `d60ad606`): the new term `reading` and four reworded terms; the build tools, deployment and simulation entries of the map; the citations of eleven environment facts re-copied from their pages (the Node.js line 24, the readme-quoted note on the mode of file secrets, the default network that a compose down removes, the Pixel Crawler saxophone-solo exception, the fields npm leaves out of a lock file, the Playwright CLI lookup and key, and the places of the OWASP and Cloudflare Tunnel passages).
- **Rules the product must keep** (`173c4f3f`, `192e9096`, `c753bc5e`): eight invariants reworded (the account for the message limit, the single-use clause, "currently", the terrain drawing, the cookie prefix, beaten attacks, the container image, the container's memory limit), the comments of the password measurement, and the links between the rules and the decisions that name them.
- **Decisions by topic** (`36d4292e`, `2c17721d`, `4cd6fe84`, `1ea338ea`, `64f2061e`, `307cc1d4`, `578d13d2`, `2a2f1607`, `ee68e190`, `f173b651`): the server, deployment and backup; testing and the guidelines for it; the game, programs and the chronicle; the run screen and the end window; the scene; the shared controls and the browser view framework; saving the game; the screens and the login card; the picture band. Each followed by the quotations of the changed sentences that tests hold.
- **Comments, names and one check** (`7bdce4fa`, `c37e2d4e`, `bcc35f33`): docstrings of simulation tests, the picture band in `camp.tsx` and three view tests, one comment of `program-panel.css`, the styleguide and the page for reviewers.
- **The fix of the whole-change review** (`d09512b4`): the readme check in `tests/view/icons.test.mjs`, the picture band in the readme, the comments of seven source files and a styleguide heading, and Minor fixes (a citation of D-322, the exception in D-355, D-218's verification, the compose-down sentence, two docstrings).
- **The return step** (`949f14db`, `4e82fc27`): the saxophone-solo wording in D-271, the readme and a test comment.

## Checks

- **The full tests, run 2, the one that counts:** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/poprawki-brzmienia-fundamentu/gate_times.md -- npm.cmd test` on `4e82fc27`, exit 0, 757.068 s: Node 2600 passed, 0 failed, 0 skipped; Python 86 + 80 + 254 + 271 = 691 in four directories, all OK; foundation check `0 errors` with three `listed:` lines (named under item 5); check of the instruction files `0 error, 144 warn, 7 info`.
- **Run 1 failed:** the same command on the same tree, exit 1, 749.001 s. The tests `test_ruff_source_rules` and `test_shellcheck_source_rules` of `tests/quality` failed with `FileNotFoundError`, because the worktree had no `.runs/quality-venv` (the environment the readme requires); the gate stops at the first error, so the foundation check and the check of the instruction files did not run in it. After the environment was installed (ruff 0.17.1, ShellCheck 0.11.0), run 2 passed: those two tests failed in 1 cycle run and passed in 1. The failure was in the environment, not in a test.
- **Base:** no gate was run on the base `f66ae6eb`; it is a merge commit whose tree equals that of its second parent, so the list of failing checks (none) was taken from the final gate of the merged cycle: `docs/task-cycles/luki-w-testach-z-przegladu/cycle.md` as added in `28ab60c9`.
- **Own-work checks:** each slice's executor reported one; the executors ran focused tests (all passed) and the foundation check after each entry; the executor of slice 6 ran ruff from the main checkout's environment, since the worktree had none; ruff was otherwise not run by the slices, and run 2 of the gate covers it.
- **Reviews:** whole change `FAIL bcc35f33` (2 blocking, 9 Minor, 2 outside the scope), fix `d09512b4`, fix review `PASS d09512b4`; return step `FAIL 949f14db` (1 blocking, 1 Minor), fix `4e82fc27`, fix review `PASS 4e82fc27`.
- **Not independently read by the reviewers:** the pack's terms (Google Drive), the mail library's source and the Node.js documentation behind three facts; the author's agent read them.
- **Form check, check of private paths on this description, remarks check, check of private paths and of image files on the record's copy:** FILLED_LATER
- **Working copies left:** none. One executor wrote two check outputs to the system's temporary directory by mistake and removed them.

## Foundation entries

From the task's To do unless marked `the cycle's`. Decisions (53): D-03 (the exception for a screen left in the browser's own interfaces), D-04 (links to the rule on the minute span, the save sentence and the previous-save privilege; the privilege wording is `the cycle's`), D-17, D-28, D-44 (the seven kinds of the shared button), D-46, D-49, D-54, D-57 (the decimal comma, `the cycle's` wording), D-70, D-83 (the Python branch of the test gate; the verification pair is `the cycle's`), D-84, D-85, D-103, D-104, D-105, D-111, D-119, D-161, D-170, D-185 (verification `the cycle's`), D-189, D-207, D-218, D-220, D-231 ("complies" line `the cycle's`), D-232, D-236, D-253, D-255, D-262, D-271 (the pack-credit wording is `the cycle's`), D-272, D-278, D-280, D-310, D-311 (verification `the cycle's`), D-316, D-317, D-322, D-342, D-347, D-355 (the file and its owner), D-356, D-363, D-367, D-368, D-373, D-380, D-384, D-389 (the picture band), D-419 (for the withdrawn D-358), D-421 (the picture band). Invariants (11): `account-server-runtime`, `account-server-occupied-address`, `terrain-drawing-numbers`, `player-argon2-deployment-check`, `player-opaque-session-cookie`, `account-message-limits`, `trip-plan-progress`, `password-reset-verified-email`, `loop-run-knowledge`, `loop2-container-sprites` (the picture band), `sprite-credits` (the readme names each file's pack). Glossary (6): new `reading` (one pass of the browser view that reads the clock, passes the time elapsed to the simulation and draws the screen), and `test server`, `at the camp`, `Understanding`, `combat turn`, `chronicle`. Map of parts (3): `simulation`, `build-tools`, `deployment`. Environment facts (13): the citations of `cloudflare-tunnel-transport`, `compose-file-secret-permissions`, `password-hash-work-factor`, `node-sqlite-database`, `nodemailer-require-tls`, `express-session-end-of-request`, `node-uncaught-default-print`, `node-assert-failure-inspect`, `npm-lock-peer-dependencies`, `pixel-crawler-terms`, `docker-compose-down-volumes`, `docker-volume-prune-scope` and `playwright-cli-session-separation` (for the withdrawn `playwright-cli-sessions-per-workspace`). No section of the decision log was opened and no row of *Settlements to record* exists. Tests whose `decision:` quotation was moved to follow a reworded sentence: those of D-17, D-44, D-46, D-103, D-170, D-185, D-207, D-218, D-232, D-262, D-271, D-280, D-311 and D-389, in `tests/view/`, `tests/http.test.mjs` and `tests/invariants/`; new lines: D-57 in `tests/view/program-editor.test.mjs`, D-367 in `tests/view/scene.test.mjs`. The line `decision: D-112` at a helper of `tests/invariants/account_container_support.py` became a plain comment. The invariants the foundation check lists for a corrected sentence with its test left as it was: `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`.

## Minor findings

From the review of the whole change, the Minor findings that no fix made (the reviewer's words, abridged; the places are in `reports/review-whole-report.md` of the record):

1. The "not this" line of the glossary word `reading` holds the term itself, against the glossary template (`foundations/glossary.md`, entry `reading`); the wording is the task's. Left on purpose.
2. The new word `reading` gives a product meaning to a word that other entries use in its everyday sense (D-04, D-03, D-356, D-347); a question for the human. Left on purpose.
4. D-03's relation line `narrowed by D-265` is not in the closed list of relations, and the relation belongs in D-265 (`foundations/decisions.md:50`); the wording is the task's. Left on purpose.
5. The `decision: D-232` line of `tests/invariants/test_account_save_backup_encrypted.py` quotes the whole new sentence, though the test covers only its first part; the second quotation the reviewer proposed is refused by the foundation check, so only the first stands. Fixed in part.

(Minor findings 3 and 6 to 9 were fixed in `d09512b4`.)

From the review of the fix: the two copies of `.claude/skills/loop2-scene-art/SKILL.md:9` and `.agents/skills/loop2-scene-art/SKILL.md:9` call the picture band "the camp"; the readme check splits the readme text on fixed phrases (`tests/view/icons.test.mjs`). From the review of the return step: a 142-character line at `foundations/decisions.md` in D-271 (the line of the reworded clause).

## Findings outside the task's scope

1. `src/browser/sim/game.ts:369`: the comment says "defeated-attack count" (the reviewer of the whole change; Minor).
2. `foundations/glossary.md`, entry `at the camp`: its "not this" carrier `campDrawing` holds a form of the term; it stood before this change (the reviewer of the whole change; Minor).
3. From the return step: `setup_and_secrets.md` (both copies of the deployment skill) and `tests/password-measurement.test.mjs:382` say "the deployment's memory limit".
4. From the return step: D-322's "less than three seconds" against the discovery plaques (no cap found for more than sixteen discoveries).

## Course of the cycle

- **Task and sources:** an independent task: one collection of wording fixes of the foundation, the guidelines and test comments from the review of the foundation of 13 November, with later additions of the adviser of the day (To do 7.13 to 7.15); the review's base was `fc00c406` and this request's base is `f66ae6eb`, 614 commits later, so line numbers of the task were not used and each wording was found by its quotation.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved by the task.
- **Spec:** none; the task left no open design choice, since every wording is given and accepted.
- **Route:** planned slices: seventeen, made one after another; the change was too large for one agent.
- **Plan:** `plan.md` in the record: 17 slices, of which 5 to 15 and 12's file count exceed the size script's limit because the script counts the whole decision log whole; I accepted the verdicts since each executor read decisions by line range.
- **Choices:** 14 other choices of the cycle; see the questions table of the record.
- **Blocking findings left:** none.
- **Record:** pending — the link by the SHA of the commit that adds the record is written when the record is committed.
