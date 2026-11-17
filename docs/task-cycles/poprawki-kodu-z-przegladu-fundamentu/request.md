**State: ready** — three items of "Fix or let through" ask for your answer; nothing blocks the merge.

## What you will see

Four small corrections that the review of the foundation found, made in code and in the foundation together.

- **A save that breaks before it is sent no longer freezes saving.** If the saving code itself fails before the request leaves, the player now sees the same sentence as for any failed save ("Nie udało się zapisać postępu. Gra spróbuje ponownie."), the game retries after 5, 10 and 20 seconds and then every 30 seconds, and the error still reaches the page's last-resort handling, which stops the game and writes the line. Before, saving stopped until the page was reloaded. At logout the player sees "Nie udało się zapisać postępu. Spróbuj wylogować się ponownie." and "Wyloguj" works again; before, the button stayed on "Wylogowywanie…" and ignored further clicks.
- **A character who dies in the very minute something is discovered is no longer left "paused".** The map run ends as it does at a completion: the end-of-run window opens and names the discovery. Nothing on screen changes today, because the screens already read death before the pause; the fix removes a trap for the next screen that reads the pause first.
- **"Siedziba" now means only the screen.** The place of a character who is in no manual map run and no earning loop is called "at the camp" (in Polish, "w obozie"). The code, the comments, the tests, the styleguide and the decision about the camp use that word; the screen's own name is untouched.
- **The two sparks' colours are named by role, not by colour.** The tokens and shades `ember` and `bronze` are now `bright` and `faint`. The colour values and their sources did not change, so no pixel changes.

### Underneath

The foundation now says in one sentence that after an unhandled error every decision about the game going on gives way to the handling of that error, and it records the new behaviour of a failed save in the two decisions about saving and logout.

## For you to decide

### Needed from you

none

### Fix or let through

1. One check the cycle could not do was never done: a real browser was never made to throw an error inside the saving code, so nobody saw the error travel from the saver to the page's last-resort handling. The tests stand in for the browser's "unhandled rejection" and show that exactly one such rejection with the right error is raised per failure. If the chain is broken in a real page, a player whose saving code fails would still get the sentence and the retries, but the game might not stop and the line might not be written; that would show only when that error happens in real play. Running it in a browser costs a session with a way to make the saving code throw and a round of review; letting it through costs nothing today and leaves that one link unseen. I recommend letting it through, since the tests hold both ends of the link and the browser's behaviour for an unhandled rejection is standard. Run it in this request, make a task of it, or let it through? (Checks, 4)
2. Four small findings were not fixed in this request. (a) The new glossary entry for "at the camp" lists as something it is not "the screen Siedziba", which the term never meant; no reader is misled, it only reads oddly. (b) The picture band at the top of the Siedziba screen is still called "the camp" in the decision about it and in the code comments, so "camp" now has two meanings next to each other (the band, and where a character stands); the glossary's rule about a word with two meanings may want the band's name changed, which is your decision. (c) The sentence of the decision on saving that lists what the tests check says a little less than they check (it leaves out that a retry sends the state of its own moment and that the sentence goes when a retry succeeds). (d) A comment in the saver's test file names helper functions that the table beneath it no longer uses. Whoever feels these is the person who reads the foundation or the test file later, not the player. Fixing all four in this request costs one correction round with a review of the fix; renaming the band is the only part with reach, because it touches the decision, comments and test names in several places; letting them through leaves the wording as it is and the two meanings of "camp" side by side. I recommend letting (a), (c) and (d) through and making a task of (b). Fix them in this request, make a task of (b), or let them through? (Minor findings, 1–4)
3. The review of the whole change opened 9 of the 76 decisions it listed in full, and said that five decisions that bear on the change were read only in part: the one on pause and pace, two on the scene and the end-of-run window, one on the order of reading the state and the one on the last-resort line. It opened whole every decision the change touches or goes against. A fresh reviewer reading those five would cost one more review; it is unlikely to find anything because none of them is changed by this task and the code was tested against what they say. I recommend letting it through. Have a fresh reviewer read them in this request, or let it through? (Checks, 5)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

4. When the saving code fails, the error is not rethrown at once but raised as an unhandled rejection a moment later. Rethrowing at once would leave the "Wyloguj" button stuck on "Wylogowywanie…", which this task fixes. The price: the page's last-resort handling receives the error as a rejected promise and not as an error event; the line it writes is the same.
5. The task's second settlement was a word, "at the camp", and the cycle first treated it as living only in the headquarters entry and the camp decision. The review judged that the settled word needs an entry of its own, and the cycle wrote one, so that "at the camp" (where a character stands) and the picture band of the camp are not mixed. The other way would have saved one glossary entry and left the two meanings of "camp" unmarked.
6. Foundation entries the cycle wrote without your having seen them at the task: the one sentence that after an error nobody handled every decision about the game going on gives way to the handling of that error (the task asked for it in "To do 3" but gave no settlement row; it comes from the task's words "po błędzie, którego nie obsłużył żaden kod gry, każda decyzja o grze, która idzie dalej, ustępuje obsłudze tego błędu"), the matching sentence in that decision's reasons and its examples, and a correction of the wording of one line of the decision on saving after the review, so that it says the retry after the first wait of five seconds is what the tests check.
7. Tests that hold a decision or an invariant changed: the test of the pace invariant gained three scenarios (a death in the minute of the first chill at pace 1, at pace 16, and a control that does not die), a new driver step that sets a character's health explicitly, and a rewritten description; a test of a discovery now holds the pause rule at a death; two new cases of the saving test hold the sentence and the retry of a save that breaks before it is sent, and of a save before logout. The foundation check lists no invariant for a corrected sentence. No invariant test was left stale.

## Cost

The cycle took 37 minutes of working time without the full gate, which took 14 minutes 15 seconds, with 64.4 million tokens: 45.5 million on Sonnet (the orchestrator and the author) and 18.9 million on Opus (the three reviews). There was one review of the whole change that failed, one fix and one review of the fix that passed, and one review of the return step that passed. The table of stages (`stages.md` in this directory) has each stage.

Two folders of a reviewer's checks stayed in the ignored working directory of the task (one holds its logs, one is empty); nothing waits for them, and they go when the task's directory goes.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then. Nothing in this request waits for a review of the foundation.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — trzy pozycje „Popraw albo przepuść” czekają na Twoją odpowiedź; nic nie blokuje scalenia.

## Co zobaczysz

Cztery drobne poprawki, które znalazł przegląd fundamentu, naniesione razem w kodzie i w fundamencie.

- **Zapis, który psuje się przed wysłaniem, nie zatrzymuje już zapisywania.** Gdy kod zapisu rzuci błąd, zanim żądanie wyjdzie, gracz widzi to samo zdanie co przy każdym nieudanym zapisie („Nie udało się zapisać postępu. Gra spróbuje ponownie."), gra ponawia po 5, 10 i 20 sekundach, a potem co 30 sekund, a sam błąd nadal trafia do obsługi ostatniej szansy strony, która zatrzymuje grę i zapisuje wiersz. Dotąd zapisywanie stawało do odświeżenia strony. Przy wylogowaniu gracz widzi „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie." i „Wyloguj" znów działa; dotąd przycisk wisiał na „Wylogowywanie…" i nie reagował.
- **Postać, która umiera w minucie odkrycia, nie stoi już „w pauzie".** Przejście kończy się tak jak przy ukończeniu: otwiera się okno końca przejścia i nazywa odkrycie. Dziś na ekranie nic się nie zmienia, bo ekrany czytają śmierć przed pauzą; poprawka usuwa pułapkę na następny ekran, który sprawdzi pauzę jako pierwszą.
- **„Siedziba" znaczy teraz tylko ekran.** Miejsce postaci, która nie jest w ręcznym przejściu ani w pętli zarobkowej, nazywa się „w obozie" (po angielsku „at the camp"). Kod, komentarze, testy, wytyczne widoku i decyzja o obozie używają tego słowa; nazwa samego ekranu została.
- **Dwa odcienie iskier mają nazwy od roli, nie od koloru.** Tokeny i odcienie `ember` i `bronze` to teraz `bright` i `faint`. Wartości kolorów i ich źródła się nie zmieniły, więc żaden piksel się nie zmienia.

### Pod spodem

Fundament mówi teraz jednym zdaniem, że po błędzie, którego nikt nie obsłużył, każda decyzja o grze, która idzie dalej, ustępuje obsłudze tego błędu, a nowe zachowanie nieudanego zapisu stoi w dwóch decyzjach: o zapisie i o wylogowaniu.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Jednej kontroli, której cykl nie mógł zrobić, nikt nie zrobił: żadna prawdziwa przeglądarka nie rzuciła błędu w kodzie zapisu, więc nikt nie widział, jak błąd przechodzi od zapisu do obsługi ostatniej szansy strony. Testy zastępują „nieobsłużone odrzucenie" przeglądarki i pokazują, że przy każdej porażce powstaje dokładnie jedno takie odrzucenie z właściwym błędem. Jeśli łańcuch pęka w prawdziwej stronie, gracz, któremu kod zapisu się zepsuje, nadal dostałby zdanie i ponowienia, ale gra mogłaby się nie zatrzymać i wiersz mógłby nie zostać zapisany; wyszłoby to dopiero przy takim błędzie w prawdziwej grze. Sprawdzenie w przeglądarce kosztuje sesję ze sposobem na wywołanie błędu w zapisie i rundę przeglądu; przepuszczenie nie kosztuje dziś nic i zostawia jedno ogniwo niewidziane. Polecam przepuścić, bo testy trzymają oba końce łącza, a zachowanie przeglądarki przy nieobsłużonym odrzuceniu jest standardowe. Zrobić to w tym requeście, zrobić z tego zadanie, czy przepuścić? (Checks, 4)
2. Cztery drobne uwagi nie zostały naprawione w tym requeście. (a) Nowe hasło słownika „w obozie" wymienia wśród tego, czym nie jest, „ekran Siedziba", czego to słowo nigdy nie znaczyło; nikt nie jest wprowadzony w błąd, czyta się to tylko dziwnie. (b) Pas z obrazem na górze ekranu Siedziba nadal nazywa się „obóz" w decyzji o nim i w komentarzach kodu, więc „obóz" ma teraz dwa znaczenia obok siebie (pas, i miejsce, w którym stoi postać); reguła słownika o słowie o dwóch znaczeniach może chcieć zmiany nazwy pasa, co jest Twoją decyzją. (c) Zdanie decyzji o zapisie, które wylicza, co sprawdzają testy, mówi trochę mniej, niż sprawdzają (pomija, że ponowienie wysyła stan z własnej chwili i że zdanie znika, gdy ponowienie się uda). (d) Komentarz w pliku testów zapisu nazywa funkcje pomocnicze, których tabela pod nim już nie używa. Odczuje to ten, kto później czyta fundament albo plik testów, nie gracz. Naprawa wszystkich czterech w tym requeście kosztuje rundę poprawki z przeglądem; tylko zmiana nazwy pasa ma zasięg, bo dotyka decyzji, komentarzy i nazw testów w kilku miejscach; przepuszczenie zostawia brzmienie jak jest i dwa znaczenia „obozu" obok siebie. Polecam przepuścić (a), (c) i (d), a z (b) zrobić zadanie. Naprawić wszystkie w tym requeście, zrobić zadanie z (b), czy przepuścić? (Minor findings, 1–4)
3. Przegląd całej zmiany otworzył w całości 9 ze 76 decyzji, które wypisał w całości, i napisał, że pięć decyzji dotyczących zmiany przeczytał tylko po części: o pauzie i tempie, dwie o scenie i oknie końca przejścia, jedną o kolejności odczytu stanu i jedną o wierszu ostatniej szansy. Otworzył w całości każdą decyzję, którą zmiana zmienia albo której przeczy. Nowy recenzent czytający te pięć kosztowałby jeszcze jeden przegląd; mało prawdopodobne, by coś znalazł, bo żadna z nich nie jest zmieniana tym zadaniem, a kod sprawdzono z tym, co mówią. Polecam przepuścić. Dać nowemu recenzentowi przeczytanie ich w tym requeście, czy przepuścić? (Checks, 5)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie pasuje, powiedz która.

4. Gdy kod zapisu rzuci błąd, nie jest on rzucany od razu, tylko chwilę później jako nieobsłużone odrzucenie. Rzucenie od razu zostawiłoby przycisk „Wyloguj" na „Wylogowywanie…", co to zadanie naprawia. Cena: obsługa ostatniej szansy strony dostaje błąd jako odrzuconą obietnicę, nie jako zdarzenie błędu; wiersz, który zapisuje, jest ten sam.
5. Drugim ustaleniem zadania było słowo „w obozie", a cykl najpierw uznał, że żyje ono tylko w haśle o siedzibie i w decyzji o obozie. Przegląd uznał, że ustalone słowo potrzebuje własnego hasła, więc cykl je napisał, żeby „w obozie" (miejsce postaci) i pas z obrazem obozu się nie mieszały. Druga droga oszczędziłaby jedno hasło słownika i zostawiła dwa znaczenia „obozu" bez oznaczenia.
6. Wpisy fundamentu, które cykl napisał, a których nie widziałeś przy zadaniu: jedno zdanie, że po błędzie, którego nikt nie obsłużył, każda decyzja o grze, która idzie dalej, ustępuje obsłudze tego błędu (zadanie prosiło o nie w punkcie 3, ale nie dało wiersza ustalenia; wynika ze słów zadania „po błędzie, którego nie obsłużył żaden kod gry, każda decyzja o grze, która idzie dalej, ustępuje obsłudze tego błędu"), zdanie w uzasadnieniu tej decyzji i jej przykłady oraz poprawka brzmienia jednej linii decyzji o zapisie po przeglądzie, żeby mówiła, że testy sprawdzają ponowienie po pierwszym oczekiwaniu pięciu sekund.
7. Zmienione testy, które trzymają decyzję albo niezmiennik: test niezmiennika tempa dostał trzy scenariusze (śmierć w minucie pierwszego wychłodzenia przy tempie 1, przy tempie 16 i próbę kontrolną bez śmierci), nowy krok sterownika, który jawnie ustawia zdrowie postaci, i przepisany opis; test odkrycia trzyma teraz regułę pauzy przy śmierci; dwa nowe przypadki testu zapisu trzymają zdanie i ponowienie zapisu, który psuje się przed wysłaniem, oraz zapisu przed wylogowaniem. Kontrola fundamentu nie wymienia żadnego niezmiennika dla poprawionego zdania. Żaden test niezmiennika nie został nieaktualny.

## Koszt

Cykl zajął 37 minut czasu pracy bez pełnej bramki, która trwała 14 minut 15 sekund, i 64,4 mln tokenów: 45,5 mln na Sonnet (orkiestrator i autor) i 18,9 mln na Opus (trzy przeglądy). Był jeden przegląd całej zmiany, który nie przeszedł, jedna poprawka i przegląd poprawki, który przeszedł, oraz jeden przegląd kroku powrotnego, który przeszedł. tabela etapów (`stages.md` w tym katalogu) podaje każdy etap.

Dwa foldery sprawdzeń recenzenta zostały w ignorowanym katalogu roboczym zadania (w jednym są jego logi, drugi jest pusty); nic na nie nie czeka, znikną razem z katalogiem zadania.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rejestru cyklu przeżywa tylko tak. Nic w tym requeście nie czeka na przegląd fundamentu.

</details>

## Technical changes

The change is five code and foundation commits, one fix and one return-step commit on top of `origin/main` at `e7b3d071`. Each item opens with what it concerns in plain words.

- **The pause at a death in a discovery minute.** The map run's flag of being paused is now set unless the map run ended, by death or completion, instead of unless it was completed (`paused: !mapRunEnded(run)`, `src/browser/sim/game.ts`, commit `ea35311f`). The function that writes the first cooling in `src/browser/sim/understanding.ts` is unchanged: its write before the check of death is the cause of the fault but the discovery of the death minute is meant to be held (D-122). Tests: a case in `tests/sim/discovery.test.mjs`, three scenarios and a `patch_body` driver step in `tests/invariants/test_player_map_run_pace.py`, which fail on the base and pass on the head.
- **A save that breaks before it is sent.** `sendNow` in `src/browser/view/game-saver.ts` (commit `b87424d0`) builds the request in a `try`; an exception, or a rejection of the client's promise, goes to `notSent`, which answers `answered` with a failure of no request (clears the in-flight flag, shows the sentence, plans the retry, finishes a waiting logout with `failed`) and then raises the error in a later microtask as an unhandled rejection, so that `src/browser/view/last-resort.ts` takes it (D-323). Two cases in `tests/view/game-saver.test.mjs`, each failing on the base.
- **The tokens of the sparks.** `ember` → `bright`, `bronze` → `faint`: `src/browser/tokens.css`, `src/browser/run-screen.css` (the rules now stand there, not in `styles.css`), the type `SceneSpeckShade` and its 24 data entries in `src/browser/sim/data/scene.ts` (the task counted 12; 12 of each shade stand in the data and all were renamed), and tests in `tests/view/scene-picture.test.mjs` and `tests/view/scene.test.mjs` (commit `881f1a4a`; the second test file was not listed by the task). Colour values and their `Source:` comments are unchanged.
- **The word "at the camp".** `inSiedziba` → `atCamp` in `src/browser/view/camp-picture.ts` and the comments of `camp-picture.ts`, `camp.tsx`, `headquarters.tsx`, `src/browser/sim/data/scene.ts`, the titles and comments of `tests/view/camp-picture.test.mjs` and `tests/view/scene-picture.test.mjs`, and two lines of `guidelines/styleguide-browser-view.md` (commit `79deca06`). Every use of "Siedziba" in the meaning of the screen stays; the author's list of what it left and why stands in its report.
- **Foundation entries** (commits `1d8caf17`, `e384f793`, `1d03bdec`): see *Foundation entries* below.
- **The fix after the review** (`e384f793`): the glossary entry `at the camp`, a shorter *Not* of `headquarters` that points to it, the description of the pace invariant's test and a comment of the saver test.
- **The return step** (`1d03bdec`): one line of the `tests:` clause of D-208, so that it claims only the first wait of the retry rhythm, which the new cases check.

## Checks

1. **The full gate**, run once on the head `1d03bdec` on the signal `start` of the adviser of the day, after the orchestrator said it was ready: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/poprawki-kodu-z-przegladu-fundamentu/gate_times.md -- npm.cmd test`, exit 0, 855.3 s, 0 other gate runs at the same time. Node tests 2593 passed, 0 failed, 0 skipped; Python tests 86 + 79 + 253 + 264 = 682 in four directories (`tests/agent_workflow`, `tests/quality`, `tests/deploy`, `tests/invariants`), all passed; foundation check `0 errors`; check of the instruction files `0 error, 144 warn, 7 info`. Nothing failed or did not run in the gate.
2. **The base:** no gate ran on the base `e7b3d071`: it is a merge commit whose tree equals the tree of its second parent. The list of checks failing before the change comes from the final gate of the earlier cycle (`docs/task-cycles/drobne-bledy-ekranow/cycle.md`, commit `63bcb122`, run 3 on `ccc647c4`): none failed (Node 2590 passed, Python 679 passed).
3. **Own-work check of the author:** the requirement most likely unmet was that the error still reaches the last-resort handling; the two saver cases hold that an unhandled rejection with that very error is raised once per failure, with Node's `unhandledRejection` standing in for the window's event; the chain through a real page was not checked.
4. **A real-browser check was not done** (item 1 of *For you to decide*): the chain from a saver error to `last-resort.ts` in a real page. No screenshot was taken because no rendered look changed (renamed tokens with the same values, a sentence that was a hang before, a flag the screens already read after death).
5. **Reading of the review of the whole change:** it read 9 of the 76 decisions its index listed in full and named five as bearing on the change and read in part (the decisions on pause and pace, on the scene and the end-of-run window after a death in a discovery minute, on the order of reading the state, and on the last-resort line); it opened whole every decision the change changes or goes against; the gap was not closed by a fresh reading (item 3 of *For you to decide*).
6. **Focused checks** (author, reviewers; commands and exit codes in `reports/author-report.md`, `reports/fix-1-report.md`, `reports/return-step-report.md`, `reports/review-whole-report.md`, `reports/review-fix-1-report.md`, `reports/review-return-step-report.md`): the three new groups of tests failing on the base and passing on the head (exit 1 then exit 0); eslint, prettier and ruff on the changed files, exit 0; a mutation run on `src/browser/sim/game.ts` lines 870–877, 13 of 13 mutants killed; `foundation_check.py` at the head, `0 errors`.
7. **Not run:** the prettier check of `foundations/decisions.md` and the styleguide, which fails on the base too and is not part of the gate.
8. **Working copies left:** `.runs/review-whole/` (the reviewer's decision index and check logs, kept as evidence) and `.runs/review-return-step/` (empty).
9. **Directories of earlier tasks kept:** none.
10. **Form check, check of private paths on the description, on the record's copy, the image check and the remarks check:** filled in after the record is committed.

## Foundation entries

- D-208, `row 1`: a save whose code throws before its request leaves, or whose client's promise is rejected, counts as a failed save for the line, the sentence and the retries, and the error goes on to D-323 (a new paragraph, a clause of `tests:`, a way in *Rejected*; its `tests:` clause was corrected in the return step).
- D-97, `row 1`: the same for the save before a logout: it counts as a save failed for want of a connection, logout does not happen, „Wyloguj" works again, the error goes on to D-323.
- D-323, `the cycle's`: after an error no code of the game handled, every decision about the game that goes on gives way to D-323 (one sentence, one sentence in its rationale, a pair in its verification, a phrase of `tests:`).
- D-389, `row 2`: the characters at the camp are those in neither a manual map run nor an earning loop; „Siedziba" names only the screen.
- Glossary `at the camp`, `row 2`: a character is at the camp when it is in no manual map run (going, paused or ended and waiting for „Restart" or „Zakończ") and in no earning loop; its *Not*: the screen Siedziba and the picture band at the top of that screen.
- Glossary `headquarters`, `row 2`: its *Not* names the place where a character stands, "at the camp".
- Sections of the decision log that the change opens: "Saving the game state and the previous save", "Screen Mapy and Siedziba", "Screen of a map run and the end-of-run window", "Discovery and the Understanding", "Scene" and "Look of the browser view: styleguide, controls, pictures and fonts" (D-48, D-122, D-208, D-97, D-389 and the neighbours the review of the change read).
- Invariant tests altered: `tests/invariants/test_player_map_run_pace.py` (invariant `player-map-run-pace`; three scenarios, a `patch_body` step, a rewritten description; the entry of the invariant is unchanged, as the task says). Tests that hold a sentence of a decision by a line `decision:`, added: D-122 in `tests/sim/discovery.test.mjs`; D-208, D-97 and D-323 in `tests/view/game-saver.test.mjs`. No *Violated* mark set or cleared; no surface altered.

## Minor findings

1. Of the review of the fix (`reports/review-fix-1-report.md`, N-1): "the first item of the new entry's *Not* ('the screen Siedziba — headquarters') lists a meaning that the words 'at the camp' never had. The old mix-up ran the other way: „Siedziba" was used for the place." Place: `foundations/glossary.md`, the entry `at the camp`.
2. Of the review of the return step (`reports/review-return-step-report.md`, M-1): "the clause says less than the tests check. It leaves out two things the first case checks: the retry sends the game state of its own moment (`:925-928`), and the sentence goes when the retry succeeds (`:929-930`)." Place: the `tests:` clause of D-208, `foundations/decisions.md`; the places are in `tests/view/game-saver.test.mjs`.
3. Of the review of the return step (M-2): "a stale comment in the test file. `tests/view/game-saver.test.mjs:857-859` says each way of breaking has `breaks(), mend()`, but the table's entries have `extra` or `client`. It comes from commit `b87424d0`."
4. A question of the review of the fix, which the reviewer left for the human: "the picture band is still called 'the camp' in the prose, in D-389 and `camp.tsx`. The new entry tells it apart from 'at the camp'. Whether the band's word should still be renamed under the-way's rule on a word with two meanings is for the human to decide." Place: D-389 and `src/browser/view/camp.tsx`.

## Findings outside the task's scope

- Of the review of the whole change, declined to judge, outside the task: the English word "headquarters" in the rationales and verifications of the decision log (`foundations/decisions.md`, four places: lines 135, 170, 3828 and 5535 of the base), readable as the screen; the task's census is of „Siedziba". The reviewer names no task for it.
- A save-code error that recurs at every retry raises an unhandled rejection every 30 seconds: what the decision on saving, as changed, asks for; the log line is written once. The reviewer judged it no defect of this change.
- None of the checks that failed in a cycle run and passed again is outside the task's parts.

## Course of the cycle

- **Task and sources:** an independent task, "four corrections of code and names from the review of the foundation" (accepted 2026-11-13, settlements 1 and 2 accepted that day); code read by the cycle at `origin/main` `e7b3d071`, not at the task's `fc00c406`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, unchanged.
- **Spec:** none; no open design choice (the settlements and the three answers of the task settle every choice).
- **Route:** one author without a plan, on the class of the orchestrator (Sonnet), because the change reaches four parts; reviewed once by the whole-change reviewer on Opus.
- **Plan:** none.
- **Choices:** 3 other choices of the cycle, in the questions table of the record (base on `origin/main`, route and class, stale line numbers carried to the author) and the two choices of items 4 and 5 above.
- **Blocking findings left:** none; the two blocking findings of the whole-change review (the missing glossary entry, the *Not* without its qualifier) were fixed in `e384f793` and passed the review of the fix.
- **Record:** this directory, committed by the commit that adds it
