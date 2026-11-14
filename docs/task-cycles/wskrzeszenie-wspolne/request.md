**State: ready** — one item waits for your answer before you merge: the account on the test server needs a check, because this merge raises the version of the saved game and the merge deploys it.

## What you will see

The whole account now has one resurrection, shared by all its characters, in place of one for each character. A new character no longer brings a resurrection of its own, so making a new character for one risky try no longer gets round the stake of death. A new game starts with the resurrection ready.

- When any character with some practice dies while the resurrection is ready, it is used up for the whole team. Until it is ready again, a death of any character takes all its practice and the bought ranks, as a death without a resurrection did before.
- The resurrection is ready again after eight real hours, as before, or at once when the account first solves a map it has not solved yet, once for each map. A ready resurrection stays ready.
- A character that has no practice yet (no practice in any skill, no bought rank and none gathered in the earning loop) loses nothing by dying except what it carried. Its death does not use up the team's resurrection, does not raise the generation number and does not stop its earning loop, whether the resurrection is ready or not. This is for the first death of a new game, which is nearly certain on the first map.
- Where two characters die while the player is away, the character higher on the list takes the shared resurrection, even if it died later in real time. In the open game the earlier death takes it.
- The texts change. At each character the line now reads „Wskrzeszenie drużyny gotowe”, or „Wskrzeszenie drużyny za … czasu realnego — śmierć zabierze wprawę i wykupione stopnie”. In the window at the end of a map run, after a death that used the resurrection, the line says the next resurrection is shared by the whole team and comes after 8 real hours or after the first solving of a new map. After the death of a character with no practice the window says „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.”. After a first solving that renewed a used-up resurrection it says „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.”.

The camp and the card of a map with the new line:

![Camp with „Wskrzeszenie drużyny gotowe”](https://github.com/mariusznazar/screenshots/blob/7f459bb98de2bc005baa5ae106990b8b0e343e87/loop2/wskrzeszenie-wspolne/siedziba-wskrzeszenie-druzyny.png?raw=true)

![Card of a map with the countdown line at 1280 px](https://github.com/mariusznazar/screenshots/blob/7f459bb98de2bc005baa5ae106990b8b0e343e87/loop2/wskrzeszenie-wspolne/kto-idzie-odliczanie.png?raw=true)

![Card of a map with the countdown line on a narrow screen](https://github.com/mariusznazar/screenshots/blob/7f459bb98de2bc005baa5ae106990b8b0e343e87/loop2/wskrzeszenie-wspolne/kto-idzie-odliczanie-waski-ekran.png?raw=true)

The window at the end of a map run, after the death of a new character and after a renewing solving:

![End window after the death of a character with no practice](https://github.com/mariusznazar/screenshots/blob/7f459bb98de2bc005baa5ae106990b8b0e343e87/loop2/wskrzeszenie-wspolne/okno-konca-smierc-bez-wprawy.png?raw=true)

![End window after a first solving that renewed the resurrection](https://github.com/mariusznazar/screenshots/blob/7f459bb98de2bc005baa5ae106990b8b0e343e87/loop2/wskrzeszenie-wspolne/okno-konca-odnowienie.png?raw=true)

### Underneath

The game state keeps one moment at which the team's resurrection is ready again, in place of one moment for each character, and its saved shape changes, so the version number of the saved game is raised from 6 to 7. The first solving of a map is settled at the browser's clock, beside the settling of a death, and the result is saved so that the window can still show it after a reload.

## For you to decide

### Needed from you

1. Before you merge, check that your account on the test server may pull programs from its previous save. The merge to the main branch starts the deployment, and the game discards every saved game of the old version: without that privilege, your account on the test server starts from nothing and loses its programs, as it did at the raises of the saved game's version to 4 and to 5. With the privilege, the old save is kept as the previous save and you pull the programs from it on the Programs screen. The task says you most likely have it from the session of 2026-11-14 that deployed the earlier pull request, but the cycle cannot read the server and has not checked. If it is missing, ask for it before you merge, or accept the loss. Done?

### Fix or let through

2. One thing was not seen in a running game: the line „Wskrzeszenie odnowione: …” after a real first solving. A first solving by hand takes about 480 game minutes, so the author put the end window in the state the game's own functions make for it and looked at that, and the tests show the text, its colour, its place below the deposit line and that it survives a reload. If the real line is laid out badly, you would see it at the first renewing solving, on the test server. Playing a first solving to its end costs a session of a few hours or a faster way to reach a solving; merging costs nothing today. I recommend letting it through, since the same window was seen with the line, and its wording and colour are checked by tests. Play it in this request, make a task of it, or let it through?

3. After the last review the branch took in one commit of the main branch that changes only the README (six lines about the epic of MVP2), and the full gate was not run again on the merged tree; the check of the foundation (`0 errors`) and the quality tests (5 passed) ran on it. A fault from a six-line text in the README is very unlikely and would show at the first run of the gate on the main branch; running the gate again costs about half an hour of the machine. I recommend letting it through. Run the gate again in this request, make a task of it, or let it through?

4. One old gap stands in the foundation, which this change neither made nor removed: the rule that no part of the game imports a file of another part stands on a fact that nobody has named yet (it has said "to be named" since 2026-11-08). It makes no difference to the game; it means that, if that rule is ever questioned, nobody can say what it rests on. Naming the fact costs you a few minutes and a small change to the foundation; leaving it costs nothing now. I recommend making a task of it, since it does not belong to this change. Name the fact in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The window shows „Wskrzeszenie odnowione …” only when a used-up resurrection was renewed, not at every first solving. For that, the game now records at a first solving whether it renewed the resurrection, and keeps the record in the saved game; the simpler way, a mark with no clock, could not tell a used-up resurrection from a ready one and would show the line at every first solving, which the task excludes. The price is one more function and one more saved key.

6. Where the loop of a character and a manual map run end in deaths in the same reading of the clock, the earlier death in real time takes the shared resurrection. The first version took it for the manual run; the author found that in review and fixed it. The foundation now says so in one more sentence of the decision about the earning-loop clock.

7. The foundation entries written beyond the task's text: the decision about the window at the end of a run now also holds the renewal line, and its question is widened to match; the decision about the time away has one clause corrected (a loop's catch-up now ends also at a death that takes the practice); the decision about saving a game state says why the first solving is settled at the clock; and the decision about the earning-loop clock says in which order one reading settles deaths. Each of them changes only what the new rule made untrue.

8. Several tests that guard the rules of the resurrection, of the time away, of the settling of a death exactly once and of the saved game's version were changed, because the rules they guard changed: they now count one resurrection for the team, a character with no practice, the new saved shape and the old version 6 refused as another version. Many other tests used a new character as "a character that dies and loses things" and now give it one practice, which is a choice of the tests, not a rule of the game.

## Cost

About 1 h 16 min of working time over 15 stages (the table of stages is in the record), 155.7 million tokens counted with the cached part (123.5 million with Sonnet 5.5 and 32.2 million with Opus 5.5; 345 thousand of them are output). One review of the whole change failed on one finding of weakened tests, which was fixed together with five Minor ones, and the fix passed its review; the return step was reviewed once. The full gate ran twice, on the base and on the change: 29 and 29 minutes.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then; the merge deploys the game to the test server at once.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — jedna rzecz czeka na Twoją odpowiedź przed scaleniem: konto na serwerze testowym wymaga sprawdzenia, bo to scalenie podnosi wersję zapisu gry, a scalenie wdraża.

## Co zobaczysz

Całe konto ma teraz jedno wskrzeszenie, wspólne dla wszystkich jego postaci, zamiast jednego na postać. Nowa postać nie przynosi własnego wskrzeszenia, więc założenie nowej postaci na jedną ryzykowną próbę nie omija już stawki śmierci. Nowa gra zaczyna z gotowym wskrzeszeniem.

- Gdy ginie którakolwiek postać z jakąś wprawą, a wskrzeszenie jest gotowe, zużywa się ono dla całej drużyny. Dopóki nie jest znów gotowe, śmierć każdej postaci zabiera całą jej wprawę i wykupione stopnie, jak dawniej śmierć bez wskrzeszenia.
- Wskrzeszenie jest znów gotowe po ośmiu godzinach czasu realnego, jak dotąd, albo od razu, gdy konto pierwszy raz rozwiąże mapę, której jeszcze nie rozwiązało, raz na mapę. Gotowe wskrzeszenie zostaje gotowe.
- Postać, która nie ma jeszcze wprawy (żadnej w żadnej umiejętności, żadnego wykupionego stopnia i nic zebranego w pętli zarobkowej), tracąc życie, traci tylko to, co niosła. Jej śmierć nie zużywa wskrzeszenia drużyny, nie podnosi numeru pokolenia i nie zatrzymuje jej pętli zarobkowej, niezależnie od tego, czy wskrzeszenie jest gotowe. Chodzi o pierwszą śmierć nowej gry, niemal pewną na pierwszej mapie.
- Gdy w czasie Twojej nieobecności giną dwie postacie, wspólne wskrzeszenie bierze postać wyżej na liście, nawet jeśli zginęła później w czasie realnym. W otwartej grze bierze je śmierć wcześniejsza.
- Zmieniają się napisy. Przy każdej postaci wiersz brzmi „Wskrzeszenie drużyny gotowe” albo „Wskrzeszenie drużyny za … czasu realnego — śmierć zabierze wprawę i wykupione stopnie”. W oknie końca przejścia, po śmierci, która zużyła wskrzeszenie, linia mówi, że następne jest wspólne dla całej drużyny i przychodzi po 8 godzinach czasu realnego albo po pierwszym rozwiązaniu nowej mapy. Po śmierci postaci bez wprawy okno mówi: „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.”. Po pierwszym rozwiązaniu, które odnowiło zużyte wskrzeszenie, okno mówi: „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.”.

Zrzuty ekranu stoją wyżej, w angielskiej części opisu.

### Pod spodem

Stan gry trzyma jedną chwilę, w której wskrzeszenie drużyny jest znów gotowe, zamiast jednej chwili na postać, a zapisany kształt się zmienia, więc numer wersji zapisu gry rośnie z 6 do 7. Pierwsze rozwiązanie mapy jest rozliczane według zegara przeglądarki, obok rozliczenia śmierci, a wynik jest zapisywany, żeby okno mogło go pokazać także po ponownym wczytaniu.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Zanim scalisz, sprawdź, czy Twoje konto na serwerze testowym może wciągnąć programy z poprzedniego zapisu. Scalenie do głównej gałęzi uruchamia wdrożenie, a gra odrzuca każdy zapis starej wersji: bez tego uprawnienia Twoje konto na serwerze testowym zaczyna od zera i traci programy, jak przy podbiciach wersji zapisu do 4 i do 5. Z uprawnieniem stary zapis zostaje jako poprzedni i programy wciągasz z niego na ekranie Programy. Zadanie podaje, że najpewniej je masz z sesji z 2026-11-14, która wdrażała wcześniejszy pull request, ale cykl nie czyta serwera i tego nie sprawdził. Jeśli go brakuje, poproś o nie przed scaleniem albo zaakceptuj utratę. Zrobione?

### Napraw albo przepuść

2. Jednej rzeczy nie widziano w działającej grze: linii „Wskrzeszenie odnowione: …” po prawdziwym pierwszym rozwiązaniu. Pierwsze rozwiązanie ręczne trwa około 480 minut gry, więc autor ustawił okno końca przejścia w stanie, który tworzą własne funkcje gry dla tego przypadku, i obejrzał ten stan, a testy pokazują tekst, jego kolor, miejsce pod linią wpłaty i to, że linia przeżywa ponowne wczytanie. Gdyby prawdziwa linia była źle ułożona, zobaczysz to przy pierwszym odnawiającym rozwiązaniu na serwerze testowym. Rozegranie pierwszego rozwiązania do końca kosztuje sesję trwającą kilka godzin albo szybszą drogę do rozwiązania; scalenie nic dziś nie kosztuje. Polecam przepuścić, bo to samo okno widziano z tą linią, a jej brzmienie i kolor sprawdzają testy. Rozegrać to w tym PR-ze, zrobić z tego zadanie czy przepuścić?

3. Po ostatnim przeglądzie gałąź wzięła jeden commit z głównej gałęzi, który zmienia tylko README (sześć linii o epiku MVP2), i pełnej bramki nie uruchomiono ponownie na scalonym drzewie; sprawdzenie fundamentu (`0 errors`) i testy jakości (5 przeszło) uruchomiono na nim. Usterka od sześciu linii tekstu w README jest bardzo mało prawdopodobna i wyszłaby przy pierwszym uruchomieniu bramki na głównej gałęzi; ponowne uruchomienie kosztuje około pół godziny pracy maszyny. Polecam przepuścić. Uruchomić bramkę jeszcze raz w tym PR-ze, zrobić z tego zadanie czy przepuścić?

4. W fundamencie stoi stara luka, której ta zmiana nie zrobiła ani nie usunęła: reguła, że żadna część gry nie importuje pliku innej części, opiera się na fakcie, którego nikt jeszcze nie nazwał (od 2026-11-08 stoi tam „do nazwania”). Nie ma to wpływu na grę; znaczy tyle, że gdyby tę regułę kiedyś podważono, nikt nie powie, na czym stoi. Nazwanie faktu kosztuje Cię kilka minut i małą zmianę fundamentu; zostawienie nic dziś nie kosztuje. Polecam zrobić z tego zadanie, bo nie należy do tej zmiany. Nazwać fakt w tym PR-ze, zrobić z tego zadanie czy przepuścić?

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; powiedz, która Ci nie odpowiada.

5. Okno pokazuje „Wskrzeszenie odnowione …” tylko wtedy, gdy odnowiono zużyte wskrzeszenie, a nie przy każdym pierwszym rozwiązaniu. Dlatego gra zapisuje przy pierwszym rozwiązaniu, czy odnowiła wskrzeszenie, i trzyma ten zapis w zapisie gry; prostsza droga, znacznik bez zegara, nie odróżniłaby zużytego wskrzeszenia od gotowego i pokazywałaby linię przy każdym pierwszym rozwiązaniu, czego zadanie wyklucza. Cena to jedna funkcja i jeden zapisany klucz więcej.

6. Gdy pętla postaci i ręczne przejście mapy kończą się śmiercią w tym samym odczycie zegara, wspólne wskrzeszenie bierze śmierć wcześniejsza w czasie realnym. Pierwsza wersja oddawała je przejściu ręcznemu; autor znalazł to w przeglądzie i poprawił. Fundament mówi to teraz jednym zdaniem więcej w decyzji o zegarze pętli zarobkowej.

7. Wpisy fundamentu napisane poza tekstem zadania: decyzja o oknie końca przejścia mieści teraz także linię odnowienia, a jej pytanie jest odpowiednio szersze; decyzja o czasie nieobecności ma poprawioną jedną klauzulę (doliczanie pętli kończy się teraz także na śmierci, która zabiera wprawę); decyzja o zapisie stanu gry mówi, dlaczego pierwsze rozwiązanie jest rozliczane według zegara; a decyzja o zegarze pętli zarobkowej mówi, w jakiej kolejności jeden odczyt rozlicza śmierci. Każda zmienia tylko to, co nowa reguła uczyniła nieprawdziwym.

8. Zmieniono kilka testów pilnujących reguł wskrzeszenia, czasu nieobecności, jednokrotnego rozliczenia śmierci i wersji zapisu gry, bo reguły, których pilnują, się zmieniły: liczą teraz jedno wskrzeszenie drużyny, postać bez wprawy, nowy zapisany kształt i starą wersję 6 odrzucaną jako inną wersję. Wiele innych testów używało nowej postaci jako „postaci, która ginie i coś traci”, a teraz daje jej jedną wprawę; to wybór testów, nie reguła gry.

## Koszt

Około 1 godz. 16 min czasu pracy w 15 etapach (tabela etapów jest w rekordzie), 155,7 mln tokenów razem z częścią z pamięci podręcznej (123,5 mln u Sonneta 5.5 i 32,2 mln u Opusa 5.5; z tego 345 tys. to wyjście). Jeden przegląd całej zmiany zakończył się odrzuceniem z powodu jednej uwagi o osłabionych testach, naprawionej razem z pięcioma drobnymi, a poprawka przeszła przegląd; krok powrotny przejrzano raz. Pełna bramka przeszła dwa razy, na bazie i na zmianie: 29 i 29 minut.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rekordu przeżywa tylko tak; scalenie od razu wdraża grę na serwer testowy.

</details>

## Technical changes

The change makes the one resurrection of the account and settles a death, a first solving and the catch-up by it. Six commits made the change, three fixed the review, one is the return step.

- Code (`94b465e9`): `Team.resurrectionReadyAtMs` in `src/browser/sim/types.ts` replaces the character's own moment; `teamAfterDeath` in `src/browser/sim/game.ts` is the one rule of a death for the manual run and the earning loop, with `hasNoPractice` in `src/browser/sim/skills.ts` and the death kind `noPractice`; `settleCompletion` in `src/browser/sim/game.ts` renews the used-up resurrection at the browser's reading and records `GameMapRun.completionSettlement`; `src/browser/sim/loop.ts` passes the practice gathered at the loop; `src/browser/sim/saved-game.ts` reads and writes the new shape and `SAVED_GAME_VERSION` is 7; `src/browser/view/team-lines.ts`, `src/browser/view/end-window-lines.ts`, `src/browser/view/end-window.tsx`, `src/browser/view/clock.ts` and the three screens that draw the line (`character-screen.tsx`, `headquarters.tsx`, `maps-screen.tsx`) carry the texts and the call of `settleCompletion`.
- Tests (`043960ff`, `e291e8d2`, `77dd1194`): 20 files under `tests/sim/` and `tests/view/` taken to the team's resurrection, plus new ones for a character with no practice, the renewal at a first solving, the order of characters in the catch-up, version 7 and the order inside one reading.
- Foundation (`37a76a26`, `b29af11b`): see *Foundation entries*.
- Order in one reading (`4f0781c3`, `77dd1194`): found by the author after the first commit; the earning loops' game minutes pass first, then the manual run's death and first completion are settled at the reading, so a loop death that was earlier in real time takes the resurrection.
- Fix after the review (`5e37eab6`, `d88b362f`, `49ca4387`): the fixtures of two view test files give the character one practice (the blocking finding); the tie in the clock test is broken by a millisecond; one assertion on a helper is dropped; one test carries the renewal invariant's marker; D-190's third sentence keeps the exception of a character with no practice.

## Checks

- The gate, `npm test` on the head of the branch at `b29af11b`, with `.runs/quality-venv` copied in from the main repository: exit 0, `584 tests in 4 directories; every directory passed`, Node 2427 pass and 0 fail; the foundation check inside it `0 errors`. Nothing failed or did not run in that one command. Once. After it, the main branch's README-only commit was merged in (`8164625d`): the gate was not run again (item 3); `foundation_check.py` gave `0 errors` and `python -B scripts/test.py tests/quality/test_quality_invariants.py` exited 0 on the merged tree.
- The base, `npm test` at `2a8645d4` in a separate checkout: exit 1, only `tests/quality` failed (`test_ruff_source_rules` and `test_shellcheck_source_rules`, `FileNotFoundError`) because the new checkout lacked `.runs/quality-venv`; with the venv copied in, `python -B scripts/test.py tests/quality/test_quality_invariants.py` exited 0 (5 tests). The base has no failing check of its own.
- Own-work check of the author: To do 4 and 6 in the catch-up (three tests; they failed under a mutation that removed the no-practice branch). Four mutations on `resurrection-renewal` were seen failing; `catch-up-state`, `save-version` and `death-settled-once` were not seen failing again (the reviewer's Stryker run on the changed ranges scored 95.06 %, 252 mutants; the survivors are equivalent or outside the change, but for one at `src/browser/sim/saved-game.ts:521`, see below).
- User-interface states: the camp, the card of a map with the countdown line at 1280 px and at 600 px, the end window after the death of a character with no practice, and the end window with the renewal line, seen in a running game by the route of `loop2-play` and kept in the place the product settles for screenshots (the public screenshots repository, commit `7f459bb98de2bc005baa5ae106990b8b0e343e87`); the end window with the renewal line was composed as the existing test composes it, not produced by a real clock-driven play (item 2).
- Form check of this description: written and checked after this commit; the checks of private paths and of the remarks, and the image check, on the copy of the record: filled in with the link to the record.

## Foundation entries

All marked `the cycle's`; the task's *Settlements to record* has no row and no entry is projected.

- D-190 (the account has one resurrection shared by its characters, renewed by time or by the first completion of each map; a death of a character with no practice uses none up, leaves the generation number and does not stop its earning loop).
- D-216 (the question widened to "Where does the player read what a character's death took and what a completion renewed?"; the used-up line now names the shared resurrection and its renewal; the line for a character with no practice and the renewal line are written here).
- D-217 and D-329 (the lines at the characters read „Wskrzeszenie drużyny …”).
- D-220 (a new character brings no resurrection of its own; a new game's is ready).
- D-240 (characters also meet at the resurrection; the earlier on the list takes it in the catch-up; the *Rejected* gains the first-in-time variant).
- D-242 (the sentence of the order inside one reading, and its *Verification*; corrected in the return step, b29af11b) and D-247 (a loop's catch-up ends also at a death that takes the practice).
- D-386 (the moment is the account's resurrection's; the function that settles a first completion refuses an unsafe moment and reads none where there is nothing to settle).
- Invariants: `resurrection-renewal` (the account's resurrection renews by the death's moment plus the span, by the first completion of each map, a death of a character with no practice leaves the moment, and a completion of a solved map renews nothing), `catch-up-state` (narrowed to a character whose chest and resurrection no other loop reaches; it now also derives from D-190).
- Glossary: `resurrection` (the account's, a death with no practice does not use it up) and `generation number` (grows only at a death that takes practice).
- Invariant tests altered (WAY-03), by identifier: `resurrection-renewal` (death, loop, catch-up, completion, clock, team-lines, character-screen, headquarters-screen and maps-screen tests); `catch-up-state` and `catch-up-death-moment` (catch-up tests, the relation test now runs one looping character); `death-settled-once` (death and loop tests); `save-version` (saved-game and previous-programs tests, the old document as version 6 refused). No surface of the part map and no *Violated* mark changed.

## Minor findings

Of the review of the return step (`reports/review-return-report.md`), none fixed, since a Minor finding of a review of that kind is not fixed:

- The new sentence of D-242 says "the earlier in real time", which says more than the code decides: the manual run's death is dated at the reading, so "settled at the earlier moment" is what holds (`foundations/decisions.md`, D-242, the sentence added at b29af11b).
- D-242's *Relations* omit D-190 and its *Rationale* does not give the reason for the order of one reading (`foundations/decisions.md`, D-242).
- The sentence names "death and first completion", but its examples and the test at `tests/view/clock.test.mjs:568` cover only the death (`foundations/decisions.md`, D-242).

The five Minor findings of the review of the whole change were fixed and their fix passed its review.

## Findings outside the task's scope

The reviewer of the whole change declined to judge these, naming them outside what it checked:

- A test gap at the trust boundary that predates the change: no test refuses a saved document whose character's number equals the next number the game would give (`src/browser/sim/saved-game.ts:521`, a mutant of `>=` to `>` survived).
- The unsafe moment `now + renewal span` that a death stores within eight hours of 2^53 is refused by the load; it is the base's behaviour and unreachable from a real clock (`src/browser/sim/game.ts`, `teamAfterDeath`).
- The table of trust-boundary tests in the testing guidelines names a previous-programs test by a title that no longer exists ("from 1 to 5"); stale before this change (`guidelines/testing.md:173`).
- In a reading after a long hidden tab, the manual run's death is settled at the reading even if it happened earlier in real time, so a loop death in between may take the resurrection first; this follows the decision on the loop clock and the task does not change it.

## Course of the cycle

- **Task and sources:** Independent task: one resurrection for the whole account, renewed also at the first solving of a map, with no Zarzewie, and the death of a character with no practice using none up; based on the scope of project 2 ("Kierunek" 3), the critique of the progression proposal, the balance simulator's finding 2.4, and the merged task on pulling programs from old saves. Base `2a8645d46c50b23437ad824d1e7969ee760d05f1` (main, after the merge of the pull request that tidied the decision log).
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved; the gate ran on it.
- **Spec:** none: no open design choice; the questions of the task were all answered by a source.
- **Route:** one author without a plan, on the class `same` as the orchestrator (Sonnet 5.5): one idea through a few modules of two parts, but a change of the saved shape at a trust boundary, which every review was told about; a fresh Opus reviewer for the whole change.
- **Plan:** none.
- **Choices:** 7 other choices of the author and orchestrator (shared moment on the team, the first-solving function, the saved key, the death kind, the foundation place of the renewal line, the order of one reading, the reading gaps of the author) — see the table of questions in the record.
- **Blocking findings left:** none.
- **Record:** the link to the record by the SHA of the commit that adds it: filled in after that commit.
